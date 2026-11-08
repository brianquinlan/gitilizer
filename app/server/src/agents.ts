// The developer's ranking agent (PRD SET-38 to SET-40, RANK-20, NOTIF-23).
import { AGENT_INFO, agentNotificationCodes, RankingAgent, type AgentKeyKind } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import type { Db } from "./db.ts";
import { publish } from "./list.ts";
import { clear } from "./notify.ts";

/** The agent that ranks the developer's list. */
export async function agentInUse(db: Db, userId: string): Promise<RankingAgent> {
  const r = await db.one(`select ranking_agent from users where id = $1`, [userId]);
  const parsed = RankingAgent.safeParse(r?.ranking_agent);
  return parsed.success ? parsed.data : "gemini";
}

export const keyKindFor = (agent: RankingAgent): AgentKeyKind => AGENT_INFO[agent].kind;

/** SQL for the credential kind of `users.ranking_agent` (alias `u`). */
export const AGENT_KIND_SQL = `case u.ranking_agent when 'claude' then 'anthropic_key' when 'openai' then 'openai_key' else 'gemini_key' end`;

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
 * (NOTIF-23). Returns false if it was already in use.
 */
export async function switchAgent(ctx: Ctx, userId: string, agent: RankingAgent): Promise<boolean> {
  const previous = await agentInUse(ctx.db, userId);
  if (previous === agent) return false;
  await ctx.db.query(`update users set ranking_agent = $2 where id = $1`, [userId, agent]);
  await resumeRanking(ctx, userId);
  await clear(ctx, userId, agentNotificationCodes(previous));
  return true;
}

/** Items in the Prioritized list scored by each agent (SET-40's {n}). */
export async function rankedBy(db: Db, userId: string): Promise<Record<RankingAgent, number>> {
  const rows = await db.query(
    `select coalesce(ranked_agent, 'gemini') as agent, count(*)::int as n from user_items
     where user_id = $1 and status = 'active' and score is not null and not rank_failed group by 1`,
    [userId],
  );
  const out: Record<RankingAgent, number> = { gemini: 0, claude: 0, openai: 0 };
  for (const r of rows) if (r.agent in out) out[r.agent as RankingAgent] += r.n;
  return out;
}
