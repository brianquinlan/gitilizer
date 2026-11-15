// The developer's ranking agent, or basic ranking (PRD SET-38 to SET-40, RANK-20, RANK-21, NOTIF-23).
import { AGENT_INFO, agentNotificationCodes, RankingChoice, type AgentKeyKind, type RankingAgent } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import type { Db } from "./db.ts";
import { dropBulkJobs } from "./jobs.ts";
import { publish } from "./list.ts";
import { clear } from "./notify.ts";

/** What ranks the developer's list: one of the agents, or basic ranking. */
export async function agentInUse(db: Db, userId: string): Promise<RankingChoice> {
  const r = await db.one(`select ranking_agent from users where id = $1`, [userId]);
  const parsed = RankingChoice.safeParse(r?.ranking_agent);
  return parsed.success ? parsed.data : "gemini";
}

export const keyKindFor = (agent: RankingAgent): AgentKeyKind => AGENT_INFO[agent].kind;
/** The key a choice ranks with; basic ranking uses Gitilizer's own, so the developer has none for it. */
export const keyKindOf = (choice: RankingChoice): AgentKeyKind | null => (choice === "basic" ? null : AGENT_INFO[choice].kind);

/** SQL for the credential kind of `users.ranking_agent` (alias `u`); null for basic ranking. */
export const AGENT_KIND_SQL = `case u.ranking_agent when 'claude' then 'anthropic_key' when 'openai' then 'openai_key' when 'basic' then null else 'gemini_key' end`;

/**
 * Whether a job run by `agent` belongs to the developer's current choice. Basic
 * ranking also runs for a Gemini key whose daily quota is used up (RANK-13).
 */
export const jobFits = (choice: RankingChoice, agent: RankingChoice): boolean => agent === choice || (agent === "basic" && choice === "gemini");

/**
 * Records that the developer has chosen how their items are ranked, and
 * completes setup if GitHub is connected too (PRD "Which screen is shown").
 * Returns true if this call completed setup.
 */
export async function rankingChosen(db: Db, userId: string): Promise<boolean> {
  await db.query(`update users set ranking_chosen_at = now() where id = $1 and ranking_chosen_at is null`, [userId]);
  return completeSetupIfReady(db, userId);
}

/** Setup is complete once GitHub is connected and the ranking is chosen; it is recorded once (NAV-2). */
export async function completeSetupIfReady(db: Db, userId: string): Promise<boolean> {
  const r = await db.query(
    `update users u set setup_completed_at = now()
     where u.id = $1 and u.setup_completed_at is null and u.ranking_chosen_at is not null
       and exists (select 1 from credentials c where c.user_id = u.id and c.kind in ('github_pat', 'github_app'))
     returning id`,
    [userId],
  );
  return r.length > 0;
}

/**
 * Lifts a pause on the developer's ranking (RANK-20) and lets queued jobs run
 * now: their key was replaced, or they switched agents.
 */
export async function resumeRanking(ctx: Ctx, userId: string, db: Db = ctx.db) {
  const was = await db.query(
    `update users set ranking_paused_until = null, ranking_paused_code = null
     where id = $1 and ranking_paused_until > now() returning id`, [userId],
  );
  await db.query(`update rank_jobs set not_before = now() where user_id = $1 and state = 'queued'`, [userId]);
  // Waiting items no longer show "–" (LIST-30). Inside a transaction the change isn't visible yet; the save publishes later.
  if (was.length && db === ctx.db) {
    const keys = await db.query(`select item_key from rank_jobs where user_id = $1 and kind = 'rank' and state = 'queued'`, [userId]);
    await publish(ctx, userId, keys.map((k) => k.item_key));
  }
}

/**
 * Makes `agent` the one in use (SET-40): items waiting on the previous agent
 * are ranked with the new one, and the previous agent's notifications go
 * (NOTIF-23). Basic ranking is switched to and from the same way (RANK-21).
 * Returns false if it was already in use.
 */
export async function switchAgent(ctx: Ctx, userId: string, agent: RankingChoice): Promise<boolean> {
  const previous = await agentInUse(ctx.db, userId);
  if (previous === agent) return false;
  await ctx.db.query(`update users set ranking_agent = $2 where id = $1`, [userId, agent]);
  // Basic ranking never ranks everything again (RANK-21): a re-rank the previous agent was part-way through stops here.
  if (agent === "basic") await dropBulkJobs(ctx, userId);
  await resumeRanking(ctx, userId);
  await clear(ctx, userId, agentNotificationCodes(previous));
  return true;
}

/** Items in the Prioritized list scored by each agent and by basic ranking (SET-40's {n}). */
export async function rankedBy(db: Db, userId: string): Promise<Record<RankingChoice, number>> {
  const rows = await db.query(
    `select coalesce(ranked_agent, 'gemini') as agent, count(*)::int as n from user_items
     where user_id = $1 and status = 'active' and score is not null and not rank_failed group by 1`,
    [userId],
  );
  const out: Record<RankingChoice, number> = { gemini: 0, claude: 0, openai: 0, basic: 0 };
  for (const r of rows) if (r.agent in out) out[r.agent as RankingChoice] += r.n;
  return out;
}
