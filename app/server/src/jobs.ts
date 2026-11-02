// The ranking job queue and the worker's side of it (design: Ranking worker).
import { randomUUID } from "node:crypto";
import type { NotificationCode } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import { getCredential } from "./credentials.ts";
import { publish } from "./list.ts";
import { clear, raise } from "./notify.ts";

export type JobKind = "rank" | "icebox_check";
export type JobReason = "new" | "changed" | "linked" | "restore" | "rerank" | "ageing";

/**
 * Queue order when quota is short (design: "Spending quota well", RANK-17):
 * Icebox checks, then new and changed items, then linked items, then bulk re-ranks.
 */
const PRIORITY: Record<JobReason | "icebox_check", number> = {
  icebox_check: 0, new: 1, changed: 1, restore: 1, linked: 2, rerank: 3, ageing: 3,
};

export type QueuedJob = { key: string; reason: JobReason; kind?: JobKind };

/**
 * Queues jobs. One open job per developer, item and kind: repeated changes
 * coalesce, and a more urgent job takes over a queued bulk one, which takes it
 * out of its batch so GitHub activity still publishes normally (LIVE-24).
 */
export async function queueRankJobs(ctx: Ctx, userId: string, jobs: QueuedJob[], batchId: string | null = null): Promise<number> {
  let n = 0;
  for (const j of jobs) {
    const kind = j.kind ?? "rank";
    const priority = kind === "icebox_check" ? PRIORITY.icebox_check : PRIORITY[j.reason];
    const r = await ctx.db.query(
      `insert into rank_jobs (user_id, item_key, kind, reason, priority, batch_id) values ($1, $2, $3, $4, $5, $6)
       on conflict (user_id, item_key, kind) where state in ('queued', 'leased') do update set
         reason = case when excluded.priority < rank_jobs.priority then excluded.reason else rank_jobs.reason end,
         batch_id = case when excluded.priority < rank_jobs.priority then excluded.batch_id else rank_jobs.batch_id end,
         priority = least(rank_jobs.priority, excluded.priority)
       returning id`,
      [userId, j.key, kind, j.reason, priority, batchId],
    );
    n += r.length;
  }
  return n;
}

/** The developer's open first-sync batch, created on first use (LIVE-24). */
export async function firstSyncBatch(ctx: Ctx, userId: string): Promise<string | null> {
  const u = await ctx.db.one(`select first_sync_done from users where id = $1`, [userId]);
  if (!u || u.first_sync_done) return null;
  const open = await ctx.db.one(`select id from rank_batches where user_id = $1 and reason = 'first_sync' and finished_at is null`, [userId]);
  if (open) return open.id;
  const id = randomUUID();
  await ctx.db.query(`insert into rank_batches (id, user_id, reason) values ($1, $2, 'first_sync')`, [id, userId]);
  return id;
}

/**
 * Re-ranks every active and iceboxed item as one bulk batch: "Save and re-rank"
 * (SET-15) or the daily re-rank (RANK-9). The new order is published once,
 * when the batch has finished (LIVE-24).
 */
export async function queueFullRerank(ctx: Ctx, userId: string, reason: "rerank" | "ageing", onlyOlderThanHours?: number): Promise<number> {
  const keys = await ctx.db.query(
    `select item_key from user_items where user_id = $1 and status = 'active'
       ${onlyOlderThanHours ? `and (ranked_at is null or ranked_at < now() - make_interval(hours => ${Math.floor(onlyOlderThanHours)}))` : ""}`,
    [userId],
  );
  if (!keys.length) return 0;
  const id = randomUUID();
  await ctx.db.query(`insert into rank_batches (id, user_id, reason) values ($1, $2, $3)`, [id, userId, reason]);
  const n = await queueRankJobs(ctx, userId, keys.map((k) => ({ key: k.item_key, reason })), id);
  await finishBatchIfDone(ctx, id);
  return n;
}

async function finishBatchIfDone(ctx: Ctx, batchId: string | null) {
  if (!batchId) return;
  // A first-sync batch can run dry while its scan is still downloading, so only
  // markFirstSyncIfDone, after a successful scan, closes it.
  const b = await ctx.db.one(
    `update rank_batches set finished_at = now()
     where id = $1 and finished_at is null and reason <> 'first_sync'
       and not exists (select 1 from rank_jobs where batch_id = $1 and state in ('queued', 'leased'))
     returning user_id, reason`,
    [batchId],
  );
  if (!b) return;
  const keys = await ctx.db.query(`select distinct item_key from rank_jobs where batch_id = $1`, [batchId]);
  await publish(ctx, b.user_id, keys.map((k) => k.item_key), [], true);
}

// ---------------------------------------------------------------------------
// Models and quota (RANK-13 to RANK-16)
// ---------------------------------------------------------------------------

/** Next midnight Pacific time, when Google resets daily quotas. */
export function nextPacificMidnight(now = new Date()): Date {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(now).map((p) => [p.type, p.value]));
  const sinceMidnight = (Number(parts.hour) * 3600 + Number(parts.minute) * 60 + Number(parts.second)) * 1000;
  return new Date(now.getTime() - now.getMilliseconds() + 86_400_000 - sinceMidnight);
}

type ModelState = { model: string | null; exhausted: Map<string, Date> };

/** The first model whose daily quota isn't used up, or null when all are (RANK-13). */
export async function modelFor(ctx: Ctx, userId: string): Promise<ModelState> {
  const rows = await ctx.db.query(`select model, exhausted_until from gemini_quota where user_id = $1 and exhausted_until > now()`, [userId]);
  const exhausted = new Map(rows.map((r) => [r.model as string, new Date(r.exhausted_until)]));
  return { model: ctx.config.models.find((m) => !exhausted.has(m)) ?? null, exhausted };
}

/** Raises or clears the backup-model warning and the all-models error to match the quota rows. */
async function syncQuotaNotifications(ctx: Ctx, userId: string): Promise<ModelState> {
  const st = await modelFor(ctx, userId);
  const [primary] = ctx.config.models;
  if (st.model === null) {
    const resetAt = new Date(Math.min(...[...st.exhausted.values()].map((d) => d.getTime())));
    await ctx.db.query(
      `update users set ranking_paused_until = $2, ranking_paused_code = 'daily_quota' where id = $1`, [userId, resetAt.toISOString()],
    );
    await clear(ctx, userId, ["gemini_backup_model"]);
    await raise(ctx, userId, "gemini_daily_quota", { resetAt: resetAt.toISOString() });
    await publishQueued(ctx, userId); // shown at the end with "–" (LIST-30)
  } else {
    const paused = await ctx.db.query(
      `update users set ranking_paused_until = null, ranking_paused_code = null where id = $1 and ranking_paused_code = 'daily_quota' returning id`, [userId],
    );
    await clear(ctx, userId, ["gemini_daily_quota"]);
    if (paused.length) await publishQueued(ctx, userId);
    if (st.model !== primary) {
      await raise(ctx, userId, "gemini_backup_model", {
        primaryModel: primary, model: st.model, resetAt: st.exhausted.get(primary)!.toISOString(),
      });
    } else {
      await clear(ctx, userId, ["gemini_backup_model"]);
    }
  }
  return st;
}

async function publishQueued(ctx: Ctx, userId: string) {
  const keys = await ctx.db.query(`select item_key from rank_jobs where user_id = $1 and kind = 'rank' and state = 'queued'`, [userId]);
  await publish(ctx, userId, keys.map((k) => k.item_key));
}

/** Called by the scheduler: quotas that have reset bring the primary model back (RANK-13). */
export async function refreshQuotas(ctx: Ctx) {
  const users = await ctx.db.query(
    `select distinct user_id from gemini_quota where exhausted_until <= now()
     union select id from users where ranking_paused_code = 'daily_quota' and ranking_paused_until <= now()`,
  );
  await ctx.db.query(`delete from gemini_quota where exhausted_until <= now()`);
  for (const u of users) {
    await syncQuotaNotifications(ctx, u.user_id);
    await pushSync(ctx, u.user_id);
  }
}

// ---------------------------------------------------------------------------
// Claiming
// ---------------------------------------------------------------------------

export type ClaimedJob = {
  id: number;
  kind: JobKind;
  itemKey: string;
  reason: string;
  snapshot: Record<string, unknown>;
  user: { github_login: string; additional_repos: { repo: string; prioritization_prompt: string }[]; collaborators: string[] };
  prompt: string | null;
  geminiKey: string;
  model: string;
  /** For an Icebox check: when the developer moved the item to the Icebox (ICE-6). */
  iceboxedAt: string | null;
};

export async function claimJobs(ctx: Ctx, max: number, leaseSeconds: number): Promise<ClaimedJob[]> {
  const db = ctx.db;
  // At most perDeveloperConcurrency leased jobs per developer (RANK-11), taken in
  // queue order (design: "Spending quota well").
  const candidates = await db.query(
    `select id from (
       select j.id, j.priority, i.updated_at,
              row_number() over (partition by j.user_id order by j.priority, i.updated_at desc, j.id) as n,
              (select count(*) from rank_jobs l where l.user_id = j.user_id and l.state = 'leased') as leased
       from rank_jobs j join users u on u.id = j.user_id left join items i on i.key = j.item_key
       where j.state = 'queued' and j.not_before <= now()
         and (u.ranking_paused_until is null or u.ranking_paused_until <= now())
         and exists (select 1 from credentials c where c.user_id = j.user_id and c.kind = 'gemini_key')
     ) c
     where n + leased <= $2
     order by priority, updated_at desc nulls last, id
     limit $1`,
    [max, ctx.config.perDeveloperConcurrency],
  );
  const out: ClaimedJob[] = [];
  for (const c of candidates) {
    const r = await db.one(
      `update rank_jobs j set state = 'leased', attempts = attempts + 1, lease_expires_at = now() + make_interval(secs => $2),
         item_updated_at = (select updated_at from items where key = j.item_key)
       where id = $1 and state = 'queued' returning id, user_id, item_key, kind, reason`,
      [c.id, leaseSeconds],
    );
    if (!r) continue; // claimed by someone else
    const { model } = await modelFor(ctx, r.user_id);
    const u = await db.one(`select github_login from users where id = $1`, [r.user_id]);
    const s = await db.one(`select custom_prompt from settings where user_id = $1`, [r.user_id]);
    const repos = await db.query(`select full_name, prioritization_prompt from additional_repos where user_id = $1 order by position, full_name`, [r.user_id]);
    const collabs = await db.query(`select login from collaborators where user_id = $1 order by position, login`, [r.user_id]);
    const item = await db.one(`select snapshot from items where key = $1`, [r.item_key]);
    const ui = await db.one(`select status, iceboxed_at from user_items where user_id = $1 and item_key = $2`, [r.user_id, r.item_key]);
    const key = await getCredential(ctx, r.user_id, "gemini_key");
    if (!model) {
      // Every model is exhausted; leave it queued for when the quota resets.
      await db.query(`update rank_jobs set state = 'queued', attempts = attempts - 1, lease_expires_at = null where id = $1`, [r.id]);
      await syncQuotaNotifications(ctx, r.user_id);
      continue;
    }
    if (!item?.snapshot || !key || !u?.github_login || (r.kind === "icebox_check" && ui?.status !== "iceboxed")) {
      await db.query(`update rank_jobs set state = 'failed', error_code = 'missing_input', finished_at = now() where id = $1`, [r.id]);
      continue;
    }
    await db.query(`update rank_jobs set model = $2 where id = $1`, [r.id, model]);
    out.push({
      id: Number(r.id),
      kind: r.kind,
      itemKey: r.item_key,
      reason: r.reason,
      snapshot: item.snapshot,
      user: {
        github_login: u.github_login,
        additional_repos: repos.map((x) => ({ repo: x.full_name, prioritization_prompt: x.prioritization_prompt })),
        collaborators: collabs.map((x) => x.login),
      },
      prompt: s?.custom_prompt ?? null,
      geminiKey: key,
      model,
      iceboxedAt: ui?.iceboxed_at ? new Date(ui.iceboxed_at).toISOString() : null,
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------

export type RankResult = { priority: number; actionable: boolean; next_action: string; reasoning: string };
export type IceboxResult = { bring_back: boolean; reason: string };

const GEMINI_OK_CLEARS: NotificationCode[] = [
  "gemini_rate_limited", "gemini_unavailable", "gemini_credits", "gemini_billing", "gemini_permission_denied",
  "gemini_model_unavailable", "gemini_unexpected", "prompt_failing",
];

export async function completeJob(ctx: Ctx, jobId: number, r: RankResult | IceboxResult) {
  const db = ctx.db;
  const job = await db.one(
    `select user_id, item_key, kind, reason, batch_id, model, item_updated_at from rank_jobs where id = $1 and state = 'leased'`, [jobId],
  );
  if (!job) return false;
  const userId = job.user_id as string;
  await db.query(`update rank_jobs set state = 'done', finished_at = now() where id = $1`, [jobId]);
  await clear(ctx, userId, GEMINI_OK_CLEARS);

  if (job.kind === "icebox_check") {
    await iceboxDecision(ctx, userId, job.item_key, (r as IceboxResult).bring_back, job.item_updated_at);
  } else {
    const a = r as RankResult;
    await db.query(
      `update user_items set score = $3, actionable = $4, next_action = $5, reasoning = $6, ranked_at = now(),
         ranked_updated_at = $7, ranked_model = $8, rank_failed = false, rank_error = null where user_id = $1 and item_key = $2`,
      [userId, job.item_key, a.priority, a.actionable, a.next_action, a.reasoning, job.item_updated_at, job.model],
    );
    await db.query(`update users set ever_ranked = true where id = $1`, [userId]);
    const batch = job.batch_id ? await db.one(`select reason from rank_batches where id = $1`, [job.batch_id]) : null;
    // A bulk re-rank publishes once at the end; the first sync fills in as items are ranked, without indicators (LIVE-24, LIST-15).
    if (!batch) await publish(ctx, userId, [job.item_key]);
    else if (batch.reason === "first_sync") await publish(ctx, userId, [job.item_key], [], true);
    if (job.model === ctx.config.models[0]) await syncQuotaNotifications(ctx, userId);
  }
  await afterJob(ctx, userId, job.batch_id);
  return true;
}

/** The Icebox check's answer (ICE-6, ICE-12). Bringing an item back ranks it again. */
async function iceboxDecision(ctx: Ctx, userId: string, key: string, bringBack: boolean, itemUpdatedAt: string | null) {
  if (bringBack) {
    const moved = await ctx.db.query(
      `update user_items set status = 'active', iceboxed_at = null where user_id = $1 and item_key = $2 and status = 'iceboxed' returning item_key`,
      [userId, key],
    );
    if (moved.length) {
      await queueRankJobs(ctx, userId, [{ key, reason: "changed" }]);
      await publish(ctx, userId, [key]); // leaves the Icebox view with the leave animation (ICE-9)
    }
  } else {
    await ctx.db.query(`update user_items set ranked_updated_at = $3 where user_id = $1 and item_key = $2`, [userId, key, itemUpdatedAt]);
  }
}

async function afterJob(ctx: Ctx, userId: string, batchId: string | null) {
  await finishBatchIfDone(ctx, batchId);
  await updateUnranked(ctx, userId);
  const { markFirstSyncIfDone } = await import("./scanner.ts");
  await markFirstSyncIfDone(ctx, userId);
  await pushSync(ctx, userId);
}

/** "Gitilizer couldn't rank {n} issues" (LIST-30): raised, updated or cleared to match the failed items. */
export async function updateUnranked(ctx: Ctx, userId: string) {
  const r = await ctx.db.one(`select count(*)::int as n from user_items where user_id = $1 and status = 'active' and rank_failed`, [userId]);
  if (r.n > 0) await raise(ctx, userId, "items_unranked", { n: String(r.n) });
  else await clear(ctx, userId, ["items_unranked"]);
}

/**
 * Whether a sync is in progress for the Sync now button (LIST-17, LIST-32): a
 * scan is running, or new and changed items are still being ranked. Bulk
 * re-ranks and items waiting for quota don't count.
 */
export async function syncState(ctx: Ctx, userId: string): Promise<{ running: boolean; lastFinishedAt: string | null }> {
  const r = await ctx.db.one(
    `select exists (select 1 from scans where user_id = $1 and finished_at is null) as scanning,
            exists (select 1 from rank_jobs j left join rank_batches b on b.id = j.batch_id
                    where j.user_id = $1 and j.state in ('queued', 'leased') and (b.reason is null or b.reason = 'first_sync')
                      and not (u.ranking_paused_until is not null and u.ranking_paused_until > now())) as ranking,
            (select max(finished_at) from scans where user_id = $1 and outcome = 'ok') as last
     from users u where u.id = $1`,
    [userId],
  );
  return { running: Boolean(r?.scanning || r?.ranking), lastFinishedAt: r?.last ? new Date(r.last).toISOString() : null };
}

export async function pushSync(ctx: Ctx, userId: string) {
  ctx.hub.sync(userId, await syncState(ctx, userId));
}

// ---------------------------------------------------------------------------
// Failures
// ---------------------------------------------------------------------------

/**
 * Key-level Gemini failures pause the developer's queue instead of failing
 * every item (design: Ranking worker, "Error codes").
 */
const KEY_LEVEL: Record<string, NotificationCode> = {
  key_invalid: "gemini_invalid",
  key_leaked: "gemini_leaked",
  permission_denied: "gemini_permission_denied",
  credits_exhausted: "gemini_credits",
  billing_required: "gemini_billing",
  model_not_found: "gemini_model_unavailable",
};
const TRANSIENT: Record<string, NotificationCode> = {
  rate_limited: "gemini_rate_limited", // per-minute limits: wait and retry, never switch model (RANK-14)
  unavailable: "gemini_unavailable",
};
const MAX_ATTEMPTS = 3;

export async function failJob(ctx: Ctx, jobId: number, e: { code: string; message: string; retryAfterSeconds?: number | null }) {
  const db = ctx.db;
  const job = await db.one(
    `select user_id, item_key, kind, attempts, batch_id, model from rank_jobs where id = $1 and state = 'leased'`, [jobId],
  );
  if (!job) return false;
  const userId = job.user_id as string;
  const requeue = (delaySeconds = 0) => db.query(
    `update rank_jobs set state = 'queued', attempts = attempts - 1, lease_expires_at = null, model = null,
       not_before = now() + make_interval(secs => $2) where id = $1`,
    [jobId, delaySeconds],
  );

  if (e.code === "daily_quota") {
    // Per model: the next claim gets the next model (RANK-13).
    const until = job.model ? nextPacificMidnight() : new Date(Date.now() + 3600_000);
    await db.query(
      `insert into gemini_quota (user_id, model, exhausted_until) values ($1, $2, $3)
       on conflict (user_id, model) do update set exhausted_until = greatest(gemini_quota.exhausted_until, excluded.exhausted_until)`,
      [userId, job.model ?? ctx.config.models[0], until.toISOString()],
    );
    await requeue();
    await syncQuotaNotifications(ctx, userId);
    await pushSync(ctx, userId);
    return true;
  }
  if (e.code in KEY_LEVEL) {
    const pauseUntil = e.code === "model_not_found" ? `now() + interval '1 hour'` : `'infinity'::timestamptz`;
    await db.query(`update users set ranking_paused_until = ${pauseUntil}, ranking_paused_code = $2 where id = $1`, [userId, e.code]);
    await requeue();
    await raise(ctx, userId, KEY_LEVEL[e.code]);
    await pushSync(ctx, userId);
    return true;
  }
  if (e.code in TRANSIENT) {
    await requeue(Math.max(5, e.retryAfterSeconds ?? 60));
    await raise(ctx, userId, TRANSIENT[e.code]);
    return true;
  }
  // Item-level failure (blocked, invalid output, unknown): retry, then give up (RANK-6).
  if (job.attempts < MAX_ATTEMPTS) {
    await db.query(`update rank_jobs set state = 'queued', lease_expires_at = null, not_before = now() + interval '10 seconds' where id = $1`, [jobId]);
    return true;
  }
  await db.query(`update rank_jobs set state = 'failed', error_code = $2, finished_at = now() where id = $1`, [jobId, e.code]);
  if (e.code === "unknown") await raise(ctx, userId, "gemini_unexpected");
  await giveUp(ctx, userId, job.item_key, job.kind, e.code);
  await checkPromptFailing(ctx, userId);
  await afterJob(ctx, userId, job.batch_id);
  return true;
}

/** After the last retry: a ranking job shows "–" (LIST-30); an Icebox check brings the item back (ICE-12). */
async function giveUp(ctx: Ctx, userId: string, key: string, kind: JobKind, code: string) {
  if (kind === "icebox_check") return iceboxDecision(ctx, userId, key, true, null);
  await ctx.db.query(`update user_items set rank_failed = true, rank_error = $3 where user_id = $1 and item_key = $2`, [userId, key, code]);
  await publish(ctx, userId, [key]);
}

/** "Your ranking prompt isn't working": a custom prompt and most recent jobs failing (PRD catalogue). */
async function checkPromptFailing(ctx: Ctx, userId: string) {
  const s = await ctx.db.one(`select custom_prompt from settings where user_id = $1`, [userId]);
  if (!s?.custom_prompt) return;
  const recent = await ctx.db.query(
    `select state from rank_jobs where user_id = $1 and kind = 'rank' and state in ('done', 'failed') order by finished_at desc limit 20`, [userId],
  );
  const failed = recent.filter((r) => r.state === "failed").length;
  if (recent.length >= 4 && failed / recent.length > 0.5) await raise(ctx, userId, "prompt_failing");
}

/** Returns expired leases to the queue; after 3 attempts the job fails as above. */
export async function reapLeases(ctx: Ctx) {
  const expired = await ctx.db.query(
    `update rank_jobs set state = case when attempts >= ${MAX_ATTEMPTS} then 'failed' else 'queued' end,
       error_code = case when attempts >= ${MAX_ATTEMPTS} then 'lease_expired' else error_code end,
       finished_at = case when attempts >= ${MAX_ATTEMPTS} then now() else null end, lease_expires_at = null
     where state = 'leased' and lease_expires_at < now() returning user_id, item_key, kind, state, batch_id`,
  );
  for (const r of expired.filter((r) => r.state === "failed")) {
    await giveUp(ctx, r.user_id, r.item_key, r.kind, "lease_expired");
    await afterJob(ctx, r.user_id, r.batch_id);
  }
}

