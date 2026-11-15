// The ranking job queue and the worker's side of it (design: Ranking worker).
import { randomUUID } from "node:crypto";
import type { NotificationCode, RankingChoice, SyncEvent } from "@gitilizer/shared";
import { AGENT_KIND_SQL, agentInUse, jobFits, keyKindFor } from "./agents.ts";
import type { Ctx } from "./context.ts";
import { getCredential } from "./credentials.ts";
import { publish } from "./list.ts";
import { log } from "./log.ts";
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
  if (reason === "rerank") {
    // "Save and re-rank" is a sync (LIST-16) and the daily re-rank isn't, so it takes over the jobs
    // of a daily re-rank that is still running; that batch publishes what it has finished.
    const moved = await ctx.db.query(
      `update rank_jobs j set batch_id = $2, reason = 'rerank' from rank_batches b
       where b.id = j.batch_id and b.reason = 'ageing' and j.user_id = $1 and j.state in ('queued', 'leased')
       returning b.id as old`,
      [userId, id],
    );
    for (const old of new Set(moved.map((m) => m.old as string))) await finishBatchIfDone(ctx, old);
  }
  const n = await queueRankJobs(ctx, userId, keys.map((k) => ({ key: k.item_key, reason })), id);
  await finishBatchIfDone(ctx, id);
  return n;
}

/**
 * Takes the developer's queued bulk re-rank jobs out of the queue and closes
 * their batches, which publish what they finished. Items not reached keep
 * their scores until a later daily re-rank (RANK-13, RANK-21).
 */
export async function dropBulkJobs(ctx: Ctx, userId: string) {
  const dropped = await ctx.db.query(
    `delete from rank_jobs where user_id = $1 and state = 'queued' and kind = 'rank' and reason in ('rerank', 'ageing') returning batch_id`, [userId],
  );
  for (const id of new Set(dropped.map((d) => d.batch_id as string | null))) await finishBatchIfDone(ctx, id);
  if (dropped.length) await pushSync(ctx, userId);
  return dropped.length;
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

/** The earliest time one of the developer's own models has quota again. */
const earliestReset = (st: ModelState): Date => new Date(Math.min(...[...st.exhausted.values()].map((d) => d.getTime())));

/**
 * Raises or clears the backup-model warning to match the quota rows (RANK-13).
 * With every model used up, basic ranking is the step in use and the warning
 * says so, unless basic ranking is paused too, whose warning replaces it (RANK-22).
 */
async function syncQuotaNotifications(ctx: Ctx, userId: string): Promise<ModelState> {
  const st = await modelFor(ctx, userId);
  const [primary] = ctx.config.models;
  if (st.model === null) {
    const held = await ctx.db.one(
      `select 1 as held from users where id = $1 and ranking_paused_code = 'basic_paused' and ranking_paused_until > now()`, [userId],
    );
    if (!held) {
      await raise(ctx, userId, "gemini_backup_model", {
        primaryModel: primary, model: "basic ranking", basic: "true", resetAt: earliestReset(st).toISOString(),
      });
    }
  } else {
    // One of the developer's own models has quota again, so nothing of theirs waits for basic ranking.
    const paused = await ctx.db.query(
      `update users set ranking_paused_until = null, ranking_paused_code = null where id = $1 and ranking_paused_code = 'basic_paused' returning id`, [userId],
    );
    await clear(ctx, userId, ["basic_paused"]);
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

/**
 * Called by the scheduler: quotas that have reset bring the primary model
 * back (RANK-13), and "Basic ranking is paused" goes for a developer who has
 * no item waiting any more (RANK-22).
 */
export async function refreshQuotas(ctx: Ctx) {
  const users = await ctx.db.query(
    `select distinct q.user_id from gemini_quota q join users u on u.id = q.user_id
     where q.exhausted_until <= now() and u.ranking_agent = 'gemini'`,
  );
  await ctx.db.query(`delete from gemini_quota where exhausted_until <= now()`);
  for (const u of users) {
    await syncQuotaNotifications(ctx, u.user_id);
    await pushSync(ctx, u.user_id);
  }
  await ctx.db.query(`delete from basic_pause where paused_until <= now()`);
  const idle = await ctx.db.query(
    `select n.user_id from notifications n where n.code = 'basic_paused'
       and not exists (select 1 from rank_jobs j where j.user_id = n.user_id and j.state in ('queued', 'leased'))`,
  );
  for (const u of idle) {
    await clear(ctx, u.user_id, ["basic_paused"]);
    await ctx.db.query(`update users set ranking_paused_until = null, ranking_paused_code = null where id = $1 and ranking_paused_code = 'basic_paused'`, [u.user_id]);
  }
}

// ---------------------------------------------------------------------------
// Basic ranking's pause (RANK-22)
// ---------------------------------------------------------------------------

/** How long basic ranking waits before asking Google again. */
const BASIC_RETRY_SECONDS = 15 * 60;

type BasicPause = { until: Date; resetAt: Date | null };

/** The pause in force, if Google has refused Gitilizer's own key in the last 15 minutes. */
async function basicPause(ctx: Ctx): Promise<BasicPause | null> {
  const r = await ctx.db.one(`select paused_until, reset_at from basic_pause where id = 1 and paused_until > now()`);
  return r ? { until: new Date(r.paused_until), resetAt: r.reset_at ? new Date(r.reset_at) : null } : null;
}

/** Pauses basic ranking for everyone. `resetAt` is when a daily quota resets; a spending limit has no known end. */
async function pauseBasic(ctx: Ctx, resetAt: Date | null): Promise<BasicPause> {
  const until = new Date(Date.now() + BASIC_RETRY_SECONDS * 1000);
  await ctx.db.query(
    `insert into basic_pause (id, paused_until, reset_at) values (1, $1, $2)
     on conflict (id) do update set paused_until = excluded.paused_until, reset_at = excluded.reset_at`,
    [until.toISOString(), resetAt ? resetAt.toISOString() : null],
  );
  return { until, resetAt };
}

/**
 * Holds one developer's queue while basic ranking is paused, and tells them
 * (RANK-22). Their items wait with "–" (LIST-30), as for any pause. A
 * developer with a Gemini key waits only until their own quota resets, and
 * for them the warning replaces the backup-model one.
 */
async function holdForBasic(ctx: Ctx, userId: string, choice: RankingChoice, pause: BasicPause) {
  let until = pause.until;
  const params: Record<string, string> = {};
  if (pause.resetAt) params.resetAt = pause.resetAt.toISOString();
  if (choice === "gemini") {
    const st = await modelFor(ctx, userId);
    if (st.exhausted.size) {
      const own = earliestReset(st);
      if (own < until) until = own;
      params.resetAt = own.toISOString();
    }
    params.ownQuota = "true";
    await clear(ctx, userId, ["gemini_backup_model"]);
  }
  await ctx.db.query(`update users set ranking_paused_until = $2, ranking_paused_code = 'basic_paused' where id = $1`, [userId, until.toISOString()]);
  await raise(ctx, userId, "basic_paused", params);
  await publishQueued(ctx, userId);
  await pushSync(ctx, userId);
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
  /** How the developer's items are ranked: their ranking agent, or basic ranking (SET-38). */
  choice: RankingChoice;
  /**
   * What runs this job, its key and the model to use (RANK-13, RANK-19). It is the developer's choice, except
   * that basic ranking steps in for a Gemini key whose daily quota is used up; then the key is Gitilizer's own (RANK-21).
   */
  agent: RankingChoice;
  apiKey: string;
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
         and (u.ranking_agent = 'basic' or exists (select 1 from credentials c where c.user_id = j.user_id and c.kind = ${AGENT_KIND_SQL}))
     ) c
     where n + leased <= $2
     order by priority, updated_at desc nulls last, id
     limit $1`,
    [max, ctx.config.perDeveloperConcurrency],
  );
  const out: ClaimedJob[] = [];
  let pause: BasicPause | null | undefined; // read once, when the first job needs basic ranking
  const requeue = (id: unknown) => db.query(`update rank_jobs set state = 'queued', attempts = attempts - 1, lease_expires_at = null where id = $1`, [id]);
  for (const c of candidates) {
    const r = await db.one(
      `update rank_jobs j set state = 'leased', attempts = attempts + 1, lease_expires_at = now() + make_interval(secs => $2),
         item_updated_at = (select updated_at from items where key = j.item_key)
       where id = $1 and state = 'queued' returning id, user_id, item_key, kind, reason`,
      [c.id, leaseSeconds],
    );
    if (!r) continue; // claimed by someone else
    const choice = await agentInUse(db, r.user_id);
    let agent = choice;
    // Gemini falls back to its backup model as daily quotas run out, and then to basic ranking for new and
    // changed items (RANK-13); Claude and OpenAI have one model each (RANK-19).
    let model: string | null = choice === "basic" ? ctx.config.basic.model : choice === "gemini" ? (await modelFor(ctx, r.user_id)).model : ctx.config.agentModels[choice];
    if (!model) {
      if (r.kind === "rank" && (r.reason === "rerank" || r.reason === "ageing")) {
        // A full re-rank uses only the developer's own models (RANK-17): what it didn't reach keeps its score.
        await requeue(r.id);
        await dropBulkJobs(ctx, r.user_id);
        continue;
      }
      agent = "basic";
      model = ctx.config.basic.model;
    }
    if (agent === "basic") {
      if (pause === undefined) pause = await basicPause(ctx);
      // No key is a fault of the deployment: basic ranking waits, as when Google refuses the key.
      if (!pause && !ctx.config.basic.key && ctx.config.geminiMode !== "fake") {
        log.error("worker", "basic ranking can't use its key", { code: "missing", message: "BASIC_RANKING_API_KEY isn't set" });
        pause = await pauseBasic(ctx, null);
      }
      if (pause) {
        await requeue(r.id);
        await holdForBasic(ctx, r.user_id, choice, pause);
        continue;
      }
    }
    const u = await db.one(`select github_login from users where id = $1`, [r.user_id]);
    const s = await db.one(`select custom_prompt from settings where user_id = $1`, [r.user_id]);
    const repos = await db.query(`select full_name, prioritization_prompt from additional_repos where user_id = $1 order by position, full_name`, [r.user_id]);
    const collabs = await db.query(`select login from collaborators where user_id = $1 order by position, login`, [r.user_id]);
    const item = await db.one(`select snapshot from items where key = $1`, [r.item_key]);
    const ui = await db.one(`select status, iceboxed_at from user_items where user_id = $1 and item_key = $2`, [r.user_id, r.item_key]);
    const key = agent === "basic" ? ctx.config.basic.key ?? "fake" : await getCredential(ctx, r.user_id, keyKindFor(agent));
    if (!item?.snapshot || !key || !u?.github_login || (r.kind === "icebox_check" && ui?.status !== "iceboxed")) {
      await db.query(`update rank_jobs set state = 'failed', error_code = 'missing_input', finished_at = now() where id = $1`, [r.id]);
      continue;
    }
    await db.query(`update rank_jobs set model = $2, agent = $3 where id = $1`, [r.id, model, agent]);
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
      choice,
      agent,
      apiKey: key,
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

/** What a successful request shows has cleared (PRD catalogue, "Clears when"). */
const OK_CLEARS: Record<RankingChoice, NotificationCode[]> = {
  gemini: [
    "gemini_rate_limited", "gemini_unavailable", "gemini_credits", "gemini_billing", "gemini_permission_denied",
    "gemini_model_unavailable", "gemini_unexpected", "prompt_failing", "basic_paused",
  ],
  claude: [
    "claude_rate_limited", "claude_unavailable", "claude_credits", "claude_permission_denied",
    "claude_model_unavailable", "claude_unexpected", "prompt_failing",
  ],
  openai: [
    "openai_rate_limited", "openai_unavailable", "openai_credits", "openai_permission_denied",
    "openai_model_unavailable", "openai_unexpected", "prompt_failing",
  ],
  // Google accepted Gitilizer's own key, so basic ranking isn't paused (RANK-22).
  basic: ["basic_paused", "prompt_failing"],
};

const jobAgent = (a: string | null): RankingChoice => (a === "claude" || a === "openai" || a === "basic" ? a : "gemini");

export async function completeJob(ctx: Ctx, jobId: number, r: RankResult | IceboxResult) {
  const db = ctx.db;
  const job = await db.one(
    `select user_id, item_key, kind, reason, batch_id, model, agent, item_updated_at from rank_jobs where id = $1 and state = 'leased'`, [jobId],
  );
  if (!job) return false;
  const userId = job.user_id as string;
  const agent = jobAgent(job.agent);
  await db.query(`update rank_jobs set state = 'done', finished_at = now() where id = $1`, [jobId]);
  const choice = await agentInUse(db, userId);
  if (jobFits(choice, agent)) await clear(ctx, userId, OK_CLEARS[agent]);
  if (agent === "basic") {
    // Basic ranking works again: nobody waits out the rest of a pause.
    const resumed = await db.query(`delete from basic_pause where id = 1 returning id`);
    if (resumed.length) {
      const held = await db.query(
        `update users set ranking_paused_until = null, ranking_paused_code = null where ranking_paused_code = 'basic_paused' returning id`,
      );
      for (const h of held) { await publishQueued(ctx, h.id); await pushSync(ctx, h.id); }
    }
    // For a Gemini key, the backup-model warning comes back in place of "Basic ranking is paused".
    if (choice === "gemini" && !(await db.one(`select 1 as on from notifications where user_id = $1 and code = 'gemini_backup_model'`, [userId]))) {
      await syncQuotaNotifications(ctx, userId);
    }
  }

  if (job.kind === "icebox_check") {
    await iceboxDecision(ctx, userId, job.item_key, (r as IceboxResult).bring_back, job.item_updated_at);
  } else {
    const a = r as RankResult;
    await db.query(
      `update user_items set score = $3, actionable = $4, next_action = $5, reasoning = $6, ranked_at = now(),
         ranked_updated_at = $7, ranked_model = $8, ranked_agent = $9, rank_failed = false, rank_error = null where user_id = $1 and item_key = $2`,
      [userId, job.item_key, a.priority, a.actionable, a.next_action, a.reasoning, job.item_updated_at, job.model, agent],
    );
    await db.query(`update users set ever_ranked = true where id = $1`, [userId]);
    const batch = job.batch_id ? await db.one(`select reason from rank_batches where id = $1`, [job.batch_id]) : null;
    // A bulk re-rank publishes once at the end; the first sync fills in as items are ranked, without indicators (LIVE-24, LIST-15).
    if (!batch) await publish(ctx, userId, [job.item_key]);
    else if (batch.reason === "first_sync") await publish(ctx, userId, [job.item_key], [], true);
    if (agent === "gemini" && job.model === ctx.config.models[0]) await syncQuotaNotifications(ctx, userId);
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

/** "Gitilizer couldn't rank {n} issues and PRs" (LIST-30): raised, updated or cleared to match the failed items. */
export async function updateUnranked(ctx: Ctx, userId: string) {
  const r = await ctx.db.one(`select count(*)::int as n from user_items where user_id = $1 and status = 'active' and rank_failed`, [userId]);
  if (r.n > 0) await raise(ctx, userId, "items_unranked", { n: String(r.n) });
  else await clear(ctx, userId, ["items_unranked"]);
}

/**
 * The sync state for Sync now and the progress text next to it (LIST-17,
 * LIST-28, LIST-32, LIST-33). A sync is in progress while a scan is running,
 * or while jobs that belong to a sync are open: jobs without a batch (GitHub
 * activity), the first sync's and "Save and re-rank"'s. The daily re-rank
 * (`ageing`, RANK-9) isn't a sync, and nothing counts while the developer's
 * queue is paused (a key error, or every model's daily quota used up).
 */
export async function syncState(ctx: Ctx, userId: string): Promise<SyncEvent> {
  const r = await ctx.db.one(
    `with s as (select kind, found, to_queue from scans where user_id = $1 and finished_at is null),
          j as (select j.state, j.not_before from rank_jobs j left join rank_batches b on b.id = j.batch_id
                where j.user_id = $1 and j.state in ('queued', 'leased') and (b.reason is null or b.reason in ('first_sync', 'rerank')))
     select (select count(*) from s)::int as scanning,
            (select kind from s) as kind, (select found from s) as found, (select to_queue from s) as to_queue,
            (select count(*) from j)::int as open,
            (select count(*) from j where state = 'leased')::int as leased,
            (select min(not_before) > now() from j where state = 'queued') as delayed,
            (u.ranking_paused_until is not null and u.ranking_paused_until > now()) as paused,
            (select max(finished_at) from scans where user_id = $1 and outcome = 'ok') as last
     from users u where u.id = $1`,
    [userId],
  );
  const lastFinishedAt = r?.last ? new Date(r.last).toISOString() : null;
  const scanning = Boolean(r?.scanning);
  const open = r && !r.paused ? Number(r.open) : 0;
  if (!scanning && !open) return { running: false, lastFinishedAt, progress: null };
  if (scanning && r.kind === "full" && r.to_queue === null) {
    return { running: true, lastFinishedAt, progress: { phase: "finding", found: r.found === null ? null : Number(r.found) } };
  }
  // Items waiting for quota aren't left to rank (LIST-33): they wait until midnight Pacific time.
  const left = r.paused ? 0 : Number(r.to_queue ?? 0) + open;
  const waiting = open > 0 && Number(r.leased) === 0 && r.delayed === true;
  return { running: true, lastFinishedAt, progress: { phase: "ranking", left, waiting } };
}

/** Sync events for one developer are sent at most this often by each process (design: Live updates). */
export const SYNC_PUSH_MS = 2000;
const pushes = new WeakMap<Ctx, Map<string, { last: number; timer: NodeJS.Timeout | null }>>();

/**
 * Sends the developer's sync state to their tabs: at once if none was sent in
 * the last 2 s, otherwise once at the end of that window, with the state at
 * that moment. `now` skips the limit, for a scan starting or finishing.
 */
export async function pushSync(ctx: Ctx, userId: string, opts: { now?: boolean } = {}) {
  let byUser = pushes.get(ctx);
  if (!byUser) pushes.set(ctx, (byUser = new Map()));
  const p = byUser.get(userId) ?? { last: 0, timer: null };
  byUser.set(userId, p);
  const wait = p.last + SYNC_PUSH_MS - Date.now();
  if (opts.now || wait <= 0) {
    if (p.timer) clearTimeout(p.timer);
    p.timer = null;
    p.last = Date.now();
    ctx.hub.sync(userId, await syncState(ctx, userId));
    return;
  }
  if (p.timer) return; // already due at the end of the window
  p.timer = setTimeout(() => {
    p.timer = null;
    p.last = Date.now();
    syncState(ctx, userId).then((e) => ctx.hub.sync(userId, e)).catch(() => {});
  }, wait);
  p.timer.unref?.();
  // Forget developers who haven't had an event for a while, so the map stays small.
  if (byUser.size > 1000) {
    for (const [u, q] of byUser) if (!q.timer && Date.now() - q.last > SYNC_PUSH_MS) byUser.delete(u);
  }
}

// ---------------------------------------------------------------------------
// Failures
// ---------------------------------------------------------------------------

/**
 * Key-level failures pause the developer's ranking instead of failing every
 * item (RANK-20; design: Ranking worker, "Error codes"). Each agent has its
 * own notifications; Gemini's leaked key and billing have no counterpart.
 */
const KEY_LEVEL: Record<Exclude<RankingChoice, "basic">, Record<string, NotificationCode>> = {
  gemini: {
    key_invalid: "gemini_invalid",
    key_leaked: "gemini_leaked",
    permission_denied: "gemini_permission_denied",
    credits_exhausted: "gemini_credits",
    billing_required: "gemini_billing",
    model_not_found: "gemini_model_unavailable",
  },
  claude: {
    key_invalid: "claude_invalid",
    key_leaked: "claude_invalid",
    permission_denied: "claude_permission_denied",
    credits_exhausted: "claude_credits",
    billing_required: "claude_credits",
    model_not_found: "claude_model_unavailable",
  },
  openai: {
    key_invalid: "openai_invalid",
    key_leaked: "openai_invalid",
    permission_denied: "openai_permission_denied",
    credits_exhausted: "openai_credits",
    billing_required: "openai_credits",
    model_not_found: "openai_model_unavailable",
  },
};
/** Per-minute limits and outages: wait and retry, never switch model (RANK-14). */
const TRANSIENT: Record<Exclude<RankingChoice, "basic">, Record<string, NotificationCode>> = {
  gemini: { rate_limited: "gemini_rate_limited", unavailable: "gemini_unavailable" },
  claude: { rate_limited: "claude_rate_limited", unavailable: "claude_unavailable" },
  openai: { rate_limited: "openai_rate_limited", unavailable: "openai_unavailable" },
};
const UNEXPECTED: Record<Exclude<RankingChoice, "basic">, NotificationCode> = { gemini: "gemini_unexpected", claude: "claude_unexpected", openai: "openai_unexpected" };
/**
 * What pauses basic ranking (RANK-22): Google refusing Gitilizer's own key for a
 * daily quota or a spending limit. A key Google no longer accepts pauses it too,
 * and is logged as an error, because only the owner can fix it.
 */
const BASIC_PAUSES = new Set(["daily_quota", "credits_exhausted", "billing_required", "key_invalid", "key_leaked", "permission_denied", "model_not_found"]);
const BASIC_LIMITS = new Set(["daily_quota", "credits_exhausted", "billing_required"]);
/**
 * How long a key-level failure pauses ranking. Credits and billing can be fixed
 * outside Gitilizer, so ranking tries again every 15 minutes and the error clears
 * when a request succeeds (RANK-20); a bad key waits for a new one.
 */
const PAUSE: Record<string, string> = {
  credits_exhausted: `now() + interval '15 minutes'`,
  billing_required: `now() + interval '15 minutes'`,
  model_not_found: `now() + interval '1 hour'`,
};
const MAX_ATTEMPTS = 3;

export async function failJob(ctx: Ctx, jobId: number, e: { code: string; message: string; retryAfterSeconds?: number | null }) {
  const db = ctx.db;
  const job = await db.one(
    `select user_id, item_key, kind, attempts, batch_id, model, agent from rank_jobs where id = $1 and state = 'leased'`, [jobId],
  );
  if (!job) return false;
  const userId = job.user_id as string;
  const agent = jobAgent(job.agent);
  const requeue = (delaySeconds = 0) => db.query(
    `update rank_jobs set state = 'queued', attempts = attempts - 1, lease_expires_at = null, model = null,
       not_before = now() + make_interval(secs => $2) where id = $1`,
    [jobId, delaySeconds],
  );

  // A job that ran with the previous agent says nothing about the one now in use (SET-40): run it again.
  const choice = await agentInUse(db, userId);
  if (!jobFits(choice, agent)) {
    await requeue();
    await pushSync(ctx, userId);
    return true;
  }
  if (agent === "basic") {
    if (BASIC_PAUSES.has(e.code)) {
      // The owner's to fix, and alerted on (infra/monitoring/policy-basic-key.json).
      if (!BASIC_LIMITS.has(e.code)) log.error("worker", "basic ranking can't use its key", { code: e.code, message: e.message });
      const pause = await pauseBasic(ctx, e.code === "daily_quota" ? nextPacificMidnight() : null);
      await requeue();
      await holdForBasic(ctx, userId, choice, pause);
      return true;
    }
    if (e.code === "rate_limited" || e.code === "unavailable") {
      // Per-minute limits and outages on Gitilizer's own key: wait and retry, with nothing for the developer to do (RANK-22).
      await requeue(Math.max(5, e.retryAfterSeconds ?? 60));
      await pushSync(ctx, userId);
      return true;
    }
  } else if (e.code === "daily_quota" && agent === "gemini") {
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
  const code = e.code === "daily_quota" ? "rate_limited" : e.code; // only Gemini has daily quotas per model
  if (agent !== "basic" && code in KEY_LEVEL[agent]) {
    const pauseUntil = PAUSE[code] ?? `'infinity'::timestamptz`;
    await db.query(`update users set ranking_paused_until = ${pauseUntil}, ranking_paused_code = $2 where id = $1`, [userId, code]);
    await requeue();
    await raise(ctx, userId, KEY_LEVEL[agent][code]);
    await publishQueued(ctx, userId); // waiting items are shown with "–" (LIST-30)
    await pushSync(ctx, userId);
    return true;
  }
  if (agent !== "basic" && code in TRANSIENT[agent]) {
    await requeue(Math.max(5, e.retryAfterSeconds ?? 60));
    await raise(ctx, userId, TRANSIENT[agent][code]);
    await pushSync(ctx, userId); // may be "waiting for {agent}" now (LIST-33)
    return true;
  }
  // Item-level failure (blocked, invalid output, unknown): retry, then give up (RANK-6).
  if (job.attempts < MAX_ATTEMPTS) {
    await db.query(`update rank_jobs set state = 'queued', lease_expires_at = null, not_before = now() + interval '10 seconds' where id = $1`, [jobId]);
    await pushSync(ctx, userId);
    return true;
  }
  await db.query(`update rank_jobs set state = 'failed', error_code = $2, finished_at = now() where id = $1`, [jobId, e.code]);
  if (e.code === "unknown" && agent !== "basic") await raise(ctx, userId, UNEXPECTED[agent]);
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
     where state = 'leased' and lease_expires_at < now() returning user_id, item_key, kind, state, batch_id, attempts`,
  );
  // A lease only expires if a worker stopped or a job ran far longer than it should,
  // and the last one leaves the item unranked, so each one needs a look.
  for (const r of expired) {
    log.warn("worker", "ranking lease expired", { user: r.user_id, item: r.item_key, kind: r.kind, attempts: r.attempts, failed: r.state === "failed" });
  }
  for (const r of expired.filter((r) => r.state === "failed")) {
    await giveUp(ctx, r.user_id, r.item_key, r.kind, "lease_expired");
    await afterJob(ctx, r.user_id, r.batch_id);
  }
}

