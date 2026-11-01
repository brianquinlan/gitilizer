// The ranking job queue and the worker's side of it (design: Ranking worker).
import type { Ctx } from "./context.ts";
import { getCredential } from "./credentials.ts";
import { publish } from "./list.ts";
import { clear, raise } from "./notify.ts";

export async function queueRankJobs(ctx: Ctx, userId: string, jobs: { key: string; reason: string }[]): Promise<number> {
  let n = 0;
  for (const j of jobs) {
    // One queued job per developer and item: repeated changes coalesce.
    const r = await ctx.db.query(
      `insert into rank_jobs (user_id, item_key, reason) values ($1, $2, $3) on conflict do nothing returning id`,
      [userId, j.key, j.reason],
    );
    n += r.length;
  }
  return n;
}

/** Re-rank every active and iceboxed item, e.g. after settings change (PRD SET-15). */
export async function queueFullRerank(ctx: Ctx, userId: string, reason: string): Promise<number> {
  const keys = await ctx.db.query(`select item_key from user_items where user_id = $1 and status in ('active', 'iceboxed')`, [userId]);
  return queueRankJobs(ctx, userId, keys.map((k) => ({ key: k.item_key, reason })));
}

export type ClaimedJob = {
  id: number;
  itemKey: string;
  reason: string;
  snapshot: Record<string, unknown>;
  user: { github_login: string; interested_repos: { repo: string; filter?: string }[]; collaborators: string[]; review_teams: string[] };
  prompt: string | null;
  geminiKey: string;
  model: string;
  thumbsDownAt: string | null;
};

export async function claimJobs(ctx: Ctx, max: number, leaseSeconds: number): Promise<ClaimedJob[]> {
  const db = ctx.db;
  const rows = await db.query(
    `update rank_jobs set state = 'leased', attempts = attempts + 1, lease_expires_at = now() + make_interval(secs => $2)
     where id in (
       select j.id from rank_jobs j join users u on u.id = j.user_id
       where j.state = 'queued' and j.not_before <= now()
         and (u.ranking_paused_until is null or u.ranking_paused_until <= now())
         and exists (select 1 from credentials c where c.user_id = j.user_id and c.kind = 'gemini_key')
       order by j.created_at
       limit $1
       for update skip locked)
     returning id, user_id, item_key, reason`,
    [max, leaseSeconds],
  );
  const out: ClaimedJob[] = [];
  for (const r of rows) {
    const u = await db.one(`select github_login from users where id = $1`, [r.user_id]);
    const s = await db.one(`select custom_prompt, review_teams from settings where user_id = $1`, [r.user_id]);
    const repos = await db.query(`select full_name, filter from interested_repos where user_id = $1 order by position, full_name`, [r.user_id]);
    const collabs = await db.query(`select login from collaborators where user_id = $1 order by login`, [r.user_id]);
    const item = await db.one(`select snapshot from items where key = $1`, [r.item_key]);
    const ui = await db.one(`select status, iceboxed_at from user_items where user_id = $1 and item_key = $2`, [r.user_id, r.item_key]);
    const key = await getCredential(ctx, r.user_id, "gemini_key");
    if (!item?.snapshot || !key || !u?.github_login) {
      await db.query(`update rank_jobs set state = 'failed', error_code = 'missing_input', finished_at = now() where id = $1`, [r.id]);
      continue;
    }
    out.push({
      id: Number(r.id),
      itemKey: r.item_key,
      reason: r.reason,
      snapshot: item.snapshot,
      user: {
        github_login: u.github_login,
        interested_repos: repos.map((x) => (x.filter ? { repo: x.full_name, filter: x.filter } : { repo: x.full_name })),
        collaborators: collabs.map((x) => x.login),
        review_teams: s?.review_teams ?? [],
      },
      prompt: s?.custom_prompt ?? null,
      geminiKey: key,
      model: ctx.config.model,
      // The Icebox reuses the agent's thumbs-down support (PRD Q-35, assumed).
      thumbsDownAt: ui?.status === "iceboxed" && ui.iceboxed_at ? new Date(ui.iceboxed_at).toISOString() : null,
    });
  }
  return out;
}

/** Login of whoever acted last on the item, from the snapshot timeline. */
export function lastActor(snap: any): string | null {
  const events = [...(snap?.timeline ?? [])].filter((e) => e.event !== "subscribed" && e.event !== "mentioned");
  const last = events[events.length - 1];
  return last?.actor?.login ?? last?.user?.login ?? null;
}

export async function completeJob(
  ctx: Ctx,
  jobId: number,
  r: { priority: number; actionable: boolean; next_action: string; reasoning: string },
) {
  const db = ctx.db;
  const job = await db.one(`select user_id, item_key, reason from rank_jobs where id = $1 and state = 'leased'`, [jobId]);
  if (!job) return false;
  const userId = job.user_id as string;
  const item = await db.one(`select updated_at, snapshot from items where key = $1`, [job.item_key]);
  await db.query(
    `update user_items set score = $3, actionable = $4, next_action = $5, reasoning = $6, ranked_at = now(),
       ranked_updated_at = $7, rank_failed = false where user_id = $1 and item_key = $2`,
    [userId, job.item_key, r.priority, r.actionable, r.next_action, r.reasoning, item?.updated_at],
  );
  // Iceboxed items come back when something important happened (ICE-6, Q-35 assumed).
  const ui = await db.one(`select status from user_items where user_id = $1 and item_key = $2`, [userId, job.item_key]);
  if (ui?.status === "iceboxed" && job.reason === "changed") {
    const me = (await db.one(`select github_login from users where id = $1`, [userId]))?.github_login;
    if (r.priority > 0.1 && lastActor(item?.snapshot) !== me) {
      await db.query(`update user_items set status = 'active', iceboxed_at = null where user_id = $1 and item_key = $2`, [userId, job.item_key]);
    }
  }
  await db.query(`update rank_jobs set state = 'done', finished_at = now() where id = $1`, [jobId]);
  await db.query(`update users set ever_ranked = true where id = $1`, [userId]);
  await clear(ctx, userId, ["gemini_rate_limited", "gemini_unavailable", "gemini_daily_quota", "gemini_credits", "gemini_billing", "prompt_failing"]);
  await publish(ctx, userId, [job.item_key]);
  const { markFirstSyncIfDone } = await import("./scanner.ts");
  await markFirstSyncIfDone(ctx, userId);
  return true;
}

/** Gemini failure codes reported by the worker (design: Ranking worker, "Error codes"). */
const KEY_LEVEL: Record<string, Parameters<typeof raise>[2] | null> = {
  key_invalid: "gemini_invalid",
  key_leaked: "gemini_leaked",
  credits_exhausted: "gemini_credits",
  billing_required: "gemini_billing",
  daily_quota: "gemini_daily_quota",
  permission_denied: null, // not in the PRD catalogue yet (Q-19)
  model_not_found: null, // not in the PRD catalogue yet (Q-19)
};
const TRANSIENT: Record<string, Parameters<typeof raise>[2]> = {
  rate_limited: "gemini_rate_limited",
  unavailable: "gemini_unavailable",
};

export async function failJob(ctx: Ctx, jobId: number, e: { code: string; message: string; retryAfterSeconds?: number | null }) {
  const db = ctx.db;
  const job = await db.one(`select user_id, item_key, attempts from rank_jobs where id = $1 and state = 'leased'`, [jobId]);
  if (!job) return false;
  const userId = job.user_id as string;

  if (e.code in KEY_LEVEL) {
    // Pause this developer's ranking instead of failing every item (design: Ranking worker).
    const until = e.code === "daily_quota"
      ? `now() + make_interval(secs => ${Math.max(60, e.retryAfterSeconds ?? 3600)})`
      : `'infinity'::timestamptz`;
    await db.query(`update users set ranking_paused_until = ${until}, ranking_paused_code = $2 where id = $1`, [userId, e.code]);
    await db.query(`update rank_jobs set state = 'queued', attempts = attempts - 1, lease_expires_at = null where id = $1`, [jobId]);
    const code = KEY_LEVEL[e.code];
    if (code) {
      const params: Record<string, string> = {};
      if (code === "gemini_daily_quota") params.time = new Date(Date.now() + (e.retryAfterSeconds ?? 3600) * 1000).toISOString();
      await raise(ctx, userId, code, params);
    } else {
      console.warn(`[rank ${userId}] ${e.code}: ${e.message} (no notification in the PRD catalogue)`);
    }
    return true;
  }
  if (e.code in TRANSIENT) {
    await db.query(
      `update rank_jobs set state = 'queued', attempts = attempts - 1, lease_expires_at = null,
         not_before = now() + make_interval(secs => $2) where id = $1`,
      [jobId, Math.max(5, e.retryAfterSeconds ?? 60)],
    );
    await raise(ctx, userId, TRANSIENT[e.code]);
    return true;
  }
  // Item-level failure (blocked, invalid output, unknown): retry, then give up (Q-28).
  if (job.attempts < 3) {
    await db.query(`update rank_jobs set state = 'queued', lease_expires_at = null, not_before = now() + interval '10 seconds' where id = $1`, [jobId]);
    return true;
  }
  await db.query(`update rank_jobs set state = 'failed', error_code = $2, finished_at = now() where id = $1`, [jobId, e.code]);
  await db.query(`update user_items set rank_failed = true where user_id = $1 and item_key = $2`, [userId, job.item_key]);
  await publish(ctx, userId, [job.item_key]);
  await checkPromptFailing(ctx, userId);
  const { markFirstSyncIfDone } = await import("./scanner.ts");
  await markFirstSyncIfDone(ctx, userId);
  return true;
}

/** "Your ranking prompt isn't working": a custom prompt and most recent jobs failing (PRD catalogue). */
async function checkPromptFailing(ctx: Ctx, userId: string) {
  const s = await ctx.db.one(`select custom_prompt from settings where user_id = $1`, [userId]);
  if (!s?.custom_prompt) return;
  const recent = await ctx.db.query(
    `select state from rank_jobs where user_id = $1 and state in ('done', 'failed') order by finished_at desc limit 20`, [userId],
  );
  const failed = recent.filter((r) => r.state === "failed").length;
  if (recent.length >= 4 && failed / recent.length > 0.5) await raise(ctx, userId, "prompt_failing");
}

/** Returns expired leases to the queue; after 3 attempts the item is marked as failed. */
export async function reapLeases(ctx: Ctx) {
  const expired = await ctx.db.query(
    `update rank_jobs set state = case when attempts >= 3 then 'failed' else 'queued' end,
       error_code = case when attempts >= 3 then 'lease_expired' else error_code end,
       finished_at = case when attempts >= 3 then now() else null end, lease_expires_at = null
     where state = 'leased' and lease_expires_at < now() returning user_id, item_key, state`,
  );
  for (const r of expired.filter((r) => r.state === "failed")) {
    await ctx.db.query(`update user_items set rank_failed = true where user_id = $1 and item_key = $2`, [r.user_id, r.item_key]);
    await publish(ctx, r.user_id, [r.item_key]);
  }
}
