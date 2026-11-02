// A scan for one developer (design: Scanner; PRD SCAN-1..4, LIST-1, LIST-19).
import { log } from "./log.ts";
import { EXPIRY_WARNING_DAYS, type NotificationCode, type Reason, type RemovalReason } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import { getCredential } from "./credentials.ts";
import { GitHubProblem, type GitHubApi, type SearchHit } from "./github/types.ts";
import { firstSyncBatch, pushSync, queueRankJobs, updateUnranked, type QueuedJob } from "./jobs.ts";
import { publish } from "./list.ts";
import { clear, raise } from "./notify.ts";

type Found = { hit: SearchHit; reasons: Set<Reason>; handle: string | null };
export type DiscoveryQuery = { reason: Reason; q: string; handle?: string; repo?: string };

/**
 * The searches that make up discovery, with the reason each contributes
 * (LIST-1). A full scan reads open items; an incremental scan reads everything
 * updated since `since`, open or not, so closed and merged items show up too.
 */
export function discoveryQueries(login: string, repos: string[], since: string | null = null): DiscoveryQuery[] {
  const base = since ? `archived:false updated:>=${since}` : "is:open archived:false";
  return [
    { reason: "review_requested", q: `${base} user-review-requested:${login}` },
    { reason: "assigned", q: `${base} assignee:${login}` },
    { reason: "mentioned", q: `${base} mentions:${login}`, handle: `@${login}` },
    { reason: "created", q: `${base} author:${login}` },
    { reason: "commented", q: `${base} commenter:${login}` },
    ...repos.map((r) => ({ reason: "additional_repo" as Reason, q: `${base} repo:${r}`, repo: r })),
  ];
}

/** Cleared by a successful scan. */
const SCAN_CLEARS: NotificationCode[] = [
  "github_missing", "github_expired", "github_invalid", "github_rate_limited", "github_unavailable", "github_unexpected",
  "scan_failed", "stale",
];
/** Started by the developer: always a full scan (design: Scheduler). */
export const FULL_TRIGGERS = new Set(["manual", "settings", "credentials"]);

export type ScanResult = { outcome: "ok" | "skipped" | "error"; kind?: "full" | "incremental"; errorCode?: string; queued?: number };

export async function scan(
  ctx: Ctx, userId: string, trigger: string, opts: { full?: boolean } = {}, onStart?: (kind: "full" | "incremental") => void,
): Promise<ScanResult> {
  const db = ctx.db;
  const u = await db.one(`select setup_completed_at, last_full_scan_at from users where id = $1`, [userId]);
  if (!u) return { outcome: "skipped" };
  const lastOk = await db.one(`select max(started_at) as t from scans where user_id = $1 and outcome = 'ok'`, [userId]);
  const full = opts.full ?? (FULL_TRIGGERS.has(trigger) || !u.last_full_scan_at || !lastOk?.t
    || Date.now() - Date.parse(u.last_full_scan_at) > ctx.config.fullScanSeconds * 1000);
  const kind = full ? "full" : "incremental";
  onStart?.(kind);
  let scanId: number;
  try {
    const r = await db.one(`insert into scans (user_id, trigger, kind) values ($1, $2, $3) returning id`, [userId, trigger, kind]);
    scanId = Number(r.id);
  } catch {
    return { outcome: "skipped" }; // a scan is already running (SCAN-4)
  }
  await pushSync(ctx, userId);
  const started = Date.now();
  const finish = async (outcome: string, errorCode: string | null, queued?: number) => {
    await db.query(`update scans set finished_at = now(), outcome = $2, error_code = $3 where id = $1`, [scanId, outcome, errorCode]);
    // One line per scan: its duration and outcome feed the scan metrics (NFR-6).
    log[outcome === "error" ? "warn" : "info"]("scan", "scan finished", { user: userId, trigger, kind, outcome, errorCode, queued, ms: Date.now() - started });
    if (outcome === "ok" && full) await db.query(`update users set last_full_scan_at = now() where id = $1`, [userId]);
    await pushSync(ctx, userId);
  };

  const pat = await getCredential(ctx, userId, "github_pat");
  if (!pat) {
    if (u.setup_completed_at) await raise(ctx, userId, "github_missing"); // NOTIF-16
    await finish("skipped", "no_token");
    return { outcome: "skipped" };
  }
  const gh = ctx.github(pat);
  try {
    // Incremental scans overlap the last one by 2 minutes (design: Scanner, step 2).
    const since = full ? null : new Date(Date.parse(lastOk.t) - 120_000).toISOString().replace(/\.\d+Z$/, "Z");
    const queued = await scanWith(ctx, gh, userId, since);
    await clear(ctx, userId, SCAN_CLEARS);
    await finish("ok", null, queued);
    await markFirstSyncIfDone(ctx, userId);
    return { outcome: "ok", kind, queued };
  } catch (e) {
    if (e instanceof GitHubProblem) {
      await reportGitHubProblem(ctx, userId, e);
      await finish("error", e.code);
      return { outcome: "error", kind, errorCode: e.code };
    }
    // The backend's own failure, not GitHub's (catalogue: "Gitilizer couldn't finish scanning").
    log.error("scan", "scan failed", { user: userId, error: String((e as Error)?.stack ?? e) });
    await raise(ctx, userId, "scan_failed");
    await finish("error", "internal");
    return { outcome: "error", kind, errorCode: "internal" };
  }
}

/** Raises the notification for a GitHub failure (PRD catalogue). */
export async function reportGitHubProblem(ctx: Ctx, userId: string, p: GitHubProblem) {
  const org = p.details.org ?? "";
  switch (p.code) {
    case "expired": return raise(ctx, userId, "github_expired");
    case "invalid": return raise(ctx, userId, "github_invalid");
    case "rate_limited": return raise(ctx, userId, "github_rate_limited", p.details.resetAt ? { resetAt: p.details.resetAt } : {});
    case "unavailable": return raise(ctx, userId, "github_unavailable");
    case "org_blocks_token": return raise(ctx, userId, "github_org_blocks_token", { org, tokenType: p.details.tokenType ?? "" }, org);
    case "sso": return raise(ctx, userId, "github_sso_required", { org }, org);
    case "permission": {
      const permission = p.details.permission ?? "issues";
      return raise(ctx, userId, "github_permission_missing", { permission }, permission);
    }
    default:
      log.warn("scan", "unexpected GitHub response", { user: userId, status: p.details.status, message: p.message.slice(0, 300) });
      return raise(ctx, userId, "github_unexpected");
  }
}

/** Problems that affect only part of the list; the scan carries on (catalogue). */
const PARTIAL = new Set(["permission", "sso", "org_blocks_token"]);

async function scanWith(ctx: Ctx, gh: GitHubApi, userId: string, since: string | null): Promise<number> {
  const db = ctx.db;
  const full = since === null;
  const viewer = await gh.viewer();
  await db.query(`update users set github_login = $2 where id = $1`, [userId, viewer.login]);
  await db.query(
    `update credentials set token_login = $3, token_type = $4, expires_at = coalesce($5, expires_at) where user_id = $1 and kind = $2`,
    [userId, "github_pat", viewer.login, viewer.tokenType, viewer.tokenExpiresAt],
  );
  if (viewer.tokenExpiresAt) {
    const days = Math.ceil((Date.parse(viewer.tokenExpiresAt) - Date.now()) / 86_400_000);
    if (days <= EXPIRY_WARNING_DAYS) await raise(ctx, userId, "github_expiring", { days: String(Math.max(days, 0)) });
    else await clear(ctx, userId, ["github_expiring"]);
  }
  await db.query(`insert into settings (user_id) values ($1) on conflict do nothing`, [userId]);
  await checkCollaborators(ctx, gh, userId);
  const repos = await checkRepos(ctx, gh, userId);

  // 1. Discover.
  const found = new Map<string, Found>();
  const partial = new Set<string>();
  for (const q of discoveryQueries(viewer.login, repos, since)) {
    let hits: SearchHit[];
    try {
      let ssoOrgs: string[] | undefined;
      ({ hits, ssoOrgs } = await gh.search(q.q, ctx.config.maxItems));
      // Results from organizations the token isn't authorized for are left out (D-7).
      for (const org of ssoOrgs ?? []) {
        partial.add("sso");
        await raise(ctx, userId, "github_sso_required", { org }, org);
      }
    } catch (e) {
      if (!(e instanceof GitHubProblem)) throw e;
      if (q.repo && (e.code === "not_found" || e.details.status === 422)) {
        await db.query(`update additional_repos set access = 'not_found' where user_id = $1 and full_name = $2`, [userId, q.repo]);
        await raise(ctx, userId, "repo_inaccessible", { repo: q.repo }, q.repo);
        continue;
      }
      if (PARTIAL.has(e.code)) { partial.add(e.code); await reportGitHubProblem(ctx, userId, e); continue; }
      throw e;
    }
    for (const h of hits) {
      const f = found.get(h.key) ?? { hit: h, reasons: new Set<Reason>(), handle: null };
      if (h.state === "open") f.reasons.add(q.reason);
      if (q.reason === "mentioned" && q.handle && !f.handle) f.handle = q.handle;
      found.set(h.key, f);
    }
  }
  if (full && !partial.size) await clear(ctx, userId, ["github_permission_missing", "github_sso_required", "github_org_blocks_token"]);

  // 2. What the developer has now.
  const existing = new Map<string, any>();
  for (const r of await db.query(
    `select ui.item_key, ui.status, ui.ranked_updated_at, ui.reasons, ui.mention_handle, i.snapshot_updated_at, i.title, i.updated_at
     from user_items ui join items i on i.key = ui.item_key where ui.user_id = $1`, [userId],
  )) existing.set(r.item_key, r);

  // 3. Closed and merged items seen by an incremental scan leave at once (SCAN-2).
  const removals: { key: string; reason: RemovalReason }[] = [];
  const gone = async (key: string, reason: RemovalReason) => {
    await db.query(
      `update user_items set status = 'gone', gone_reason = $3, gone_at = now(), iceboxed_at = null where user_id = $1 and item_key = $2`,
      [userId, key, reason],
    );
    await db.query(`update rank_jobs set state = 'failed', error_code = 'gone', finished_at = now() where user_id = $1 and item_key = $2 and state = 'queued'`, [userId, key]);
    removals.push({ key, reason });
  };
  for (const [key, f] of found) {
    if (f.hit.state === "open") continue;
    found.delete(key);
    const prev = existing.get(key);
    if (prev && prev.status !== "gone") await gone(key, f.hit.kind === "pr" && f.hit.merged ? "merged" : "closed");
  }

  // 4. The 1,000-item limit (LIST-19): open, non-iceboxed items, newest first. Icebox items don't count.
  type Cand = { key: string; updatedAt: string; f?: Found };
  const cands = new Map<string, Cand>();
  if (!full) {
    for (const [key, prev] of existing) {
      if (prev.status === "active" && !removals.some((r) => r.key === key)) cands.set(key, { key, updatedAt: new Date(prev.updated_at).toISOString() });
    }
  }
  for (const [key, f] of found) {
    if (existing.get(key)?.status === "iceboxed") continue;
    cands.set(key, { key, updatedAt: f.hit.updatedAt, f });
  }
  const ordered = [...cands.values()].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : a.key < b.key ? -1 : 1));
  const kept = new Set(ordered.slice(0, ctx.config.maxItems).map((c) => c.key));
  for (const c of ordered.slice(ctx.config.maxItems)) {
    if (existing.get(c.key)?.status === "active") await gone(c.key, "over_limit"); // LIVE-26
  }

  // 5. Store what was found; queue ranking and Icebox checks.
  const batchId = await firstSyncBatch(ctx, userId);
  const upserts: string[] = [];
  const toRank: QueuedJob[] = [];
  const changed: { key: string; snap: any }[] = [];
  for (const [key, f] of found) {
    const prev = existing.get(key);
    const iceboxed = prev?.status === "iceboxed";
    if (!iceboxed && !kept.has(key)) continue;
    const h = f.hit;
    const reasons = REASONS_IN_ORDER.filter((r) => f.reasons.has(r));
    await db.query(
      `insert into items (key, kind, title, html_url, state, updated_at) values ($1, $2, $3, $4, $5, $6)
       on conflict (key) do update set kind = $2, title = $3, html_url = $4, state = $5, updated_at = $6`,
      [h.key, h.kind, h.title, h.htmlUrl, h.state, h.updatedAt],
    );
    const isChange = !prev || prev.status === "gone" || !prev.ranked_updated_at || Date.parse(prev.ranked_updated_at) < Date.parse(h.updatedAt);
    const needsSnapshot = !prev || !prev.snapshot_updated_at || Date.parse(prev.snapshot_updated_at) < Date.parse(h.updatedAt);
    if (needsSnapshot) {
      try {
        const snap = await gh.snapshot(h.repo, h.number);
        await db.query(
          `update items set snapshot = $2, snapshot_updated_at = $3, draft = $4 where key = $1`,
          [h.key, JSON.stringify(snap), snap.issue?.updated_at ?? h.updatedAt, Boolean(snap.pull?.draft)],
        );
        if (isChange) changed.push({ key, snap });
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
      toRank.push({ key, reason: "new" });
      continue;
    }
    const back = prev.status === "gone";
    const reasonsChanged = String([...prev.reasons].sort()) !== String([...reasons].sort()) || prev.mention_handle !== f.handle;
    if (reasonsChanged || back || prev.title !== h.title || new Date(prev.updated_at).getTime() !== Date.parse(h.updatedAt)) {
      await db.query(
        `update user_items set reasons = $3, mention_handle = $4, status = case when status = 'gone' then 'active' else status end,
           gone_reason = null, gone_at = null where user_id = $1 and item_key = $2`,
        [userId, h.key, reasons, f.handle],
      );
      if (!back) upserts.push(h.key);
    }
    if (!isChange) continue;
    // An iceboxed item that changed gets the Icebox check, not a ranking (ICE-6).
    toRank.push(iceboxed ? { key, reason: "changed", kind: "icebox_check" } : { key, reason: back ? "new" : "changed" });
  }

  // 6. Items a full scan didn't find: closed, merged or no longer the developer's (SCAN-2, ICE-11).
  if (full) {
    for (const [key, prev] of existing) {
      if (prev.status === "gone" || found.has(key) || removals.some((r) => r.key === key)) continue;
      const [repo, num] = key.split("#");
      let reason: RemovalReason = "no_longer_matches";
      try {
        const st = await gh.item(repo, Number(num));
        if (st.state === "closed") reason = st.kind === "pr" && st.merged ? "merged" : "closed";
      } catch (e) {
        if (!(e instanceof GitHubProblem && e.code === "not_found")) throw e;
      }
      await gone(key, reason);
    }
  }

  // 7. Linked items (RANK-10): rank again the items in the list that a changed item links to.
  const queuedKeys = new Set(toRank.map((j) => j.key));
  const active = new Set([...existing].filter(([, p]) => p.status === "active").map(([k]) => k));
  for (const { key, snap } of changed) {
    for (const linked of linkedKeys(snap)) {
      if (linked === key || queuedKeys.has(linked) || !active.has(linked) || removals.some((r) => r.key === linked)) continue;
      queuedKeys.add(linked);
      toRank.push({ key: linked, reason: "linked" });
    }
  }

  await publish(ctx, userId, upserts, removals);
  if (removals.length) await updateUnranked(ctx, userId);
  // New items during the first sync belong to its batch (LIVE-24).
  const firstSync = toRank.filter((j) => j.reason === "new" && j.kind !== "icebox_check");
  const rest = toRank.filter((j) => !(j.reason === "new" && j.kind !== "icebox_check"));
  return (await queueRankJobs(ctx, userId, firstSync, batchId)) + (await queueRankJobs(ctx, userId, rest));
}

const REASONS_IN_ORDER: Reason[] = ["review_requested", "assigned", "mentioned", "created", "commented", "additional_repo"];

/** Issues and PRs a snapshot links to: related items, closing references and the PR stack. */
export function linkedKeys(snap: any): string[] {
  const out = new Set<string>(Object.keys(snap?.related ?? {}));
  const repo = snap?.ref ? `${snap.ref.owner}/${snap.ref.repo}` : "";
  for (const b of snap?.stack?.below ?? []) if (b.pull?.number) out.add(`${repo}#${b.pull.number}`);
  for (const a of snap?.stack?.above ?? []) if (a?.number) out.add(`${repo}#${a.number}`);
  return [...out];
}

/** Collaborators whose profile is unknown or more than a day old (SET-19). */
async function checkCollaborators(ctx: Ctx, gh: GitHubApi, userId: string) {
  const rows = await ctx.db.query(
    `select login from collaborators where user_id = $1 and (checked_at is null or checked_at < now() - interval '1 day' or status = 'unknown')`, [userId],
  );
  for (const r of rows) await lookUpCollaborator(ctx, gh, userId, r.login);
}

export async function lookUpCollaborator(ctx: Ctx, gh: GitHubApi, userId: string, login: string) {
  let status = "unknown";
  let avatar: string | null = null;
  try {
    const u = await gh.user(login);
    status = u.exists ? "ok" : "not_found";
    avatar = u.exists ? u.avatarUrl : null;
  } catch (e) {
    if (e instanceof GitHubProblem && (e.code === "invalid" || e.code === "expired" || e.code === "rate_limited")) throw e;
  }
  await ctx.db.query(
    `update collaborators set status = $3, avatar_url = coalesce($4, avatar_url), checked_at = now() where user_id = $1 and login = $2`,
    [userId, login, status, avatar],
  );
}

/**
 * Checks each additional repository (SET-8) and returns the ones to search.
 * GitHub follows renames, so a renamed repository is stored under its new name.
 */
export async function checkRepos(ctx: Ctx, gh: GitHubApi, userId: string, only?: string): Promise<string[]> {
  const db = ctx.db;
  const rows = await db.query(
    `select full_name from additional_repos where user_id = $1 ${only ? "and full_name = $2" : ""} order by position`,
    only ? [userId, only] : [userId],
  );
  const searchable: string[] = [];
  for (const r of rows) {
    let name = r.full_name as string;
    let info;
    try {
      info = await gh.repo(name);
    } catch (e) {
      // GitHub couldn't be reached: keep the last known state (SET-8).
      if (e instanceof GitHubProblem && (e.code === "unavailable" || e.code === "unexpected")) {
        const prev = await db.one(`select access from additional_repos where user_id = $1 and full_name = $2`, [userId, name]);
        if (prev?.access === "ok") searchable.push(name);
        continue;
      }
      throw e;
    }
    if ((info.access === "ok" || info.access === "archived") && info.fullName !== name) {
      const clash = await db.one(`select 1 from additional_repos where user_id = $1 and full_name = $2`, [userId, info.fullName]);
      if (clash) await db.query(`delete from additional_repos where user_id = $1 and full_name = $2`, [userId, name]);
      else await db.query(`update additional_repos set full_name = $3 where user_id = $1 and full_name = $2`, [userId, name, info.fullName]);
      await clear(ctx, userId, ["repo_inaccessible"], name);
      name = info.fullName;
    }
    const tokenType = info.access === "token_type_blocked" ? info.tokenType : null;
    await db.query(
      `update additional_repos set access = $3, token_type = $4, checked_at = now() where user_id = $1 and full_name = $2`,
      [userId, name, info.access, tokenType],
    );
    if (info.access === "ok") {
      searchable.push(name);
      await clear(ctx, userId, ["repo_inaccessible"], name);
    } else if (info.access === "not_found") {
      await raise(ctx, userId, "repo_inaccessible", { repo: name }, name);
    } else if (info.access === "sso_required") {
      await raise(ctx, userId, "github_sso_required", { org: info.org }, info.org);
    } else if (info.access === "token_type_blocked") {
      await raise(ctx, userId, "github_org_blocks_token", { org: info.org, tokenType: info.tokenType }, info.org);
    }
  }
  return searchable;
}

/**
 * "First sync finished" (LIST-32): a scan finished and every item it queued
 * has been ranked or has failed. Also finishes the first-sync batch.
 */
export async function markFirstSyncIfDone(ctx: Ctx, userId: string) {
  const r = await ctx.db.one(
    `select (select count(*) from scans where user_id = $1 and outcome = 'ok')::int as scans,
            (select count(*) from rank_jobs j join rank_batches b on b.id = j.batch_id
             where j.user_id = $1 and b.reason = 'first_sync' and j.state in ('queued', 'leased'))::int as pending`,
    [userId],
  );
  if (r.scans > 0 && r.pending === 0) {
    const done = await ctx.db.query(`update users set first_sync_done = true where id = $1 and not first_sync_done returning id`, [userId]);
    await ctx.db.query(`update rank_batches set finished_at = now() where user_id = $1 and reason = 'first_sync' and finished_at is null`, [userId]);
    if (done.length) await pushSync(ctx, userId);
  }
}
