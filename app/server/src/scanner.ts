// A scan for one developer (design: Scanner; PRD SCAN-1..4, LIST-1).
import { EXPIRY_WARNING_DAYS, type Reason, type RemovalReason } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import { getCredential } from "./credentials.ts";
import { GitHubProblem, type GitHubApi, type SearchHit } from "./github/types.ts";
import { publish } from "./list.ts";
import { clear, raise } from "./notify.ts";
import { queueRankJobs } from "./jobs.ts";

type Found = { hit: SearchHit; reasons: Set<Reason>; handle: string | null };

/** The searches that make up discovery, with the reason each one contributes. */
export function discoveryQueries(login: string, teams: string[], repos: string[]): { reason: Reason; q: string; handle?: string; repo?: string }[] {
  const base = "is:open archived:false";
  return [
    { reason: "assigned", q: `${base} assignee:${login}` },
    { reason: "created", q: `${base} author:${login}` },
    { reason: "mentioned", q: `${base} mentions:${login}`, handle: `@${login}` },
    { reason: "review_requested", q: `${base} review-requested:${login}` },
    ...teams.map((t) => ({ reason: "review_requested" as Reason, q: `${base} team-review-requested:${t}` })),
    ...teams.map((t) => ({ reason: "mentioned" as Reason, q: `${base} team:${t}`, handle: `@${t}` })),
    ...repos.map((r) => ({ reason: "interested_repo" as Reason, q: `${base} repo:${r}`, repo: r })),
  ];
}

const GITHUB_SCAN_CODES = ["github_missing", "github_expired", "github_invalid", "github_rate_limited", "github_unavailable", "stale"] as const;

export type ScanResult = { outcome: "ok" | "skipped" | "error"; errorCode?: string; queued?: number };

export async function scan(ctx: Ctx, userId: string, trigger: string): Promise<ScanResult> {
  const db = ctx.db;
  let scanId: number;
  try {
    const r = await db.one(`insert into scans (user_id, trigger) values ($1, $2) returning id`, [userId, trigger]);
    scanId = Number(r.id);
  } catch {
    return { outcome: "skipped" }; // a scan is already running (SCAN-4)
  }
  ctx.hub.sync(userId, { running: true, lastFinishedAt: null });
  const finish = async (outcome: string, errorCode: string | null) => {
    await db.query(`update scans set finished_at = now(), outcome = $2, error_code = $3 where id = $1`, [scanId, outcome, errorCode]);
    const last = await db.one(`select max(finished_at) as t from scans where user_id = $1 and outcome = 'ok'`, [userId]);
    ctx.hub.sync(userId, { running: false, lastFinishedAt: last?.t ? new Date(last.t).toISOString() : null });
  };

  const pat = await getCredential(ctx, userId, "github_pat");
  const user = await db.one(`select setup_completed_at from users where id = $1`, [userId]);
  if (!pat) {
    if (user?.setup_completed_at) await raise(ctx, userId, "github_missing"); // Q-8/Q-18: after setup, problems are notifications
    await finish("skipped", "no_token");
    return { outcome: "skipped" };
  }
  const gh = ctx.github(pat);
  try {
    const queued = await scanWith(ctx, gh, userId);
    await clear(ctx, userId, [...GITHUB_SCAN_CODES]);
    await finish("ok", null);
    await markFirstSyncIfDone(ctx, userId);
    return { outcome: "ok", queued };
  } catch (e) {
    const p = e instanceof GitHubProblem ? e : new GitHubProblem("unexpected", String(e));
    await reportGitHubProblem(ctx, userId, p);
    await finish("error", p.code);
    return { outcome: "error", errorCode: p.code };
  }
}

export async function reportGitHubProblem(ctx: Ctx, userId: string, p: GitHubProblem) {
  switch (p.code) {
    case "expired": return raise(ctx, userId, "github_expired");
    case "invalid": return raise(ctx, userId, "github_invalid");
    case "rate_limited":
      return raise(ctx, userId, "github_rate_limited", { time: p.details.resetAt ?? "" });
    case "unavailable": return raise(ctx, userId, "github_unavailable");
    case "org_blocks_token":
      return raise(ctx, userId, "github_org_blocks_token", { org: p.details.org ?? "", tokenType: p.details.tokenType ?? "" }, p.details.org ?? "");
    default:
      // Not in the PRD's catalogue yet (Q-19): "GitHub sent an unexpected response". Logged for now.
      console.warn(`[scan ${userId}] unhandled GitHub problem ${p.code}: ${p.message}`);
  }
}

async function scanWith(ctx: Ctx, gh: GitHubApi, userId: string): Promise<number> {
  const db = ctx.db;
  const viewer = await gh.viewer();
  await db.query(`update users set github_login = $2 where id = $1`, [userId, viewer.login]);
  if (viewer.tokenExpiresAt) {
    await db.query(`update credentials set expires_at = $3 where user_id = $1 and kind = $2`, [userId, "github_pat", viewer.tokenExpiresAt]);
    const days = Math.ceil((Date.parse(viewer.tokenExpiresAt) - Date.now()) / 86_400_000);
    if (days <= EXPIRY_WARNING_DAYS) await raise(ctx, userId, "github_expiring", { days: String(Math.max(days, 0)) });
    else await clear(ctx, userId, ["github_expiring"]);
  }

  // Review teams, refreshed daily (PRD Q-43, assumed).
  let settings = await db.one(`select review_teams, review_teams_fetched_at from settings where user_id = $1`, [userId]);
  if (!settings) {
    await db.query(`insert into settings (user_id) values ($1) on conflict do nothing`, [userId]);
    settings = { review_teams: [], review_teams_fetched_at: null };
  }
  let teams: string[] = settings.review_teams ?? [];
  if (!settings.review_teams_fetched_at || Date.now() - Date.parse(settings.review_teams_fetched_at) > 86_400_000) {
    teams = await gh.teams();
    await db.query(`update settings set review_teams = $2, review_teams_fetched_at = now() where user_id = $1`, [userId, teams]);
  }
  const repos = (await db.query(`select full_name from interested_repos where user_id = $1`, [userId])).map((r) => r.full_name as string);

  // 1. Discover.
  const found = new Map<string, Found>();
  for (const q of discoveryQueries(viewer.login, teams, repos)) {
    let hits: SearchHit[];
    try {
      ({ hits } = await gh.search(q.q, ctx.config.maxItems));
      if (q.repo) await db.query(`update interested_repos set access = 'ok' where user_id = $1 and full_name = $2`, [userId, q.repo]);
    } catch (e) {
      // An inaccessible interested repository shouldn't stop the scan (PRD Q-19 "can't access {repo}").
      if (q.repo && e instanceof GitHubProblem && (e.code === "not_found" || e.code === "unexpected")) {
        await db.query(`update interested_repos set access = 'not_found' where user_id = $1 and full_name = $2`, [userId, q.repo]);
        continue;
      }
      throw e;
    }
    for (const h of hits) {
      const f = found.get(h.key) ?? { hit: h, reasons: new Set<Reason>(), handle: null };
      f.reasons.add(q.reason);
      if (q.reason === "mentioned" && q.handle && !f.handle) f.handle = q.handle;
      found.set(h.key, f);
    }
  }
  // Keep the most recently updated items within the limit (PRD Q-27, assumed).
  const kept = [...found.values()].sort((a, b) => (a.hit.updatedAt < b.hit.updatedAt ? 1 : -1)).slice(0, ctx.config.maxItems);

  // 2. Diff against what we have.
  const existing = new Map<string, any>();
  for (const r of await db.query(
    `select ui.item_key, ui.status, ui.ranked_updated_at, ui.reasons, ui.mention_handle, i.snapshot_updated_at, i.title
     from user_items ui join items i on i.key = ui.item_key where ui.user_id = $1`, [userId],
  )) existing.set(r.item_key, r);

  const upserts: string[] = [];
  const toRank: { key: string; reason: string }[] = [];
  for (const f of kept) {
    const h = f.hit;
    const prev = existing.get(h.key);
    const reasons = [...f.reasons];
    const needsSnapshot = !prev || !prev.snapshot_updated_at || Date.parse(prev.snapshot_updated_at) < Date.parse(h.updatedAt);
    await db.query(
      `insert into items (key, kind, title, html_url, state, updated_at) values ($1, $2, $3, $4, $5, $6)
       on conflict (key) do update set kind = $2, title = $3, html_url = $4, state = $5, updated_at = $6`,
      [h.key, h.kind, h.title, h.htmlUrl, h.state, h.updatedAt],
    );
    if (needsSnapshot) {
      try {
        const snap = await gh.snapshot(h.repo, h.number);
        await db.query(`update items set snapshot = $2, snapshot_updated_at = $3 where key = $1`, [h.key, JSON.stringify(snap), snap.issue?.updated_at ?? h.updatedAt]);
      } catch (e) {
        if (e instanceof GitHubProblem && e.code === "not_found") continue; // deleted or made private since the search
        throw e;
      }
    }
    if (!prev) {
      await db.query(
        `insert into user_items (user_id, item_key, reasons, mention_handle, status) values ($1, $2, $3, $4, 'active')`,
        [userId, h.key, reasons, f.handle],
      );
      toRank.push({ key: h.key, reason: "new" });
      continue;
    }
    const reasonsChanged = String([...prev.reasons].sort()) !== String([...reasons].sort()) || prev.mention_handle !== f.handle;
    const back = prev.status === "gone";
    if (reasonsChanged || back || prev.title !== h.title) {
      await db.query(
        `update user_items set reasons = $3, mention_handle = $4, status = case when status = 'gone' then 'active' else status end,
           gone_reason = null where user_id = $1 and item_key = $2`,
        [userId, h.key, reasons, f.handle],
      );
      upserts.push(h.key);
    }
    if (back || !prev.ranked_updated_at || Date.parse(prev.ranked_updated_at) < Date.parse(h.updatedAt)) {
      toRank.push({ key: h.key, reason: back ? "new" : "changed" });
    }
  }

  // 3. Items that no longer match: closed, merged or no longer the developer's (SCAN-2).
  const keptKeys = new Set(kept.map((f) => f.hit.key));
  const removals: { key: string; reason: RemovalReason }[] = [];
  for (const [key, prev] of existing) {
    if (keptKeys.has(key) || prev.status === "gone") continue;
    const [repo, num] = key.split("#");
    let reason: RemovalReason = "no_longer_matches";
    try {
      const st = await gh.item(repo, Number(num));
      if (st.state === "closed") reason = st.kind === "pr" && st.merged ? "merged" : "closed";
    } catch (e) {
      if (!(e instanceof GitHubProblem && e.code === "not_found")) throw e;
    }
    await db.query(`update user_items set status = 'gone', gone_reason = $3, iceboxed_at = null where user_id = $1 and item_key = $2`, [userId, key, reason]);
    removals.push({ key, reason });
  }

  await publish(ctx, userId, upserts, removals);
  return queueRankJobs(ctx, userId, toRank);
}

/** "First sync done" = a scan finished and every queued item has been ranked or has failed (PRD Q-29, assumed). */
export async function markFirstSyncIfDone(ctx: Ctx, userId: string) {
  const r = await ctx.db.one(
    `select (select count(*) from scans where user_id = $1 and outcome = 'ok')::int as scans,
            (select count(*) from rank_jobs where user_id = $1 and state in ('queued', 'leased'))::int as pending`,
    [userId],
  );
  if (r.scans > 0 && r.pending === 0) {
    await ctx.db.query(`update users set first_sync_done = true where id = $1 and not first_sync_done`, [userId]);
  }
}
