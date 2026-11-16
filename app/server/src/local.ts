// Local mode (contributor/LOCAL_DEVELOPMENT.md): one developer on their own machine.
// The account is created once and signed in automatically, and its credentials
// can be filled in from .env, so a fresh database needs no clicks to get going.
import { connectionMethod } from "./connection.ts";
import { randomUUID } from "node:crypto";
import type { CredentialKind } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import { RankingAgent } from "@gitilizer/shared";
import { completeSetupIfReady, keyKindFor, rankingChosen } from "./agents.ts";
import { credentialStatus, saveCredential } from "./credentials.ts";

export const LOCAL_PROVIDER = "local";
const LOCAL_SUBJECT = "local";

/** Returns the local developer's user ID, creating the account on first use. */
export async function localUserId(ctx: Ctx): Promise<string> {
  const found = await ctx.db.one(`select id from users where provider = $1 and provider_user_id = $2`, [LOCAL_PROVIDER, LOCAL_SUBJECT]);
  if (found) return found.id;
  const id = randomUUID();
  await ctx.db.query(
    `insert into users (id, provider, provider_user_id, name, email) values ($1, $2, $3, $4, $5)
     on conflict (provider, provider_user_id) do nothing`,
    [id, LOCAL_PROVIDER, LOCAL_SUBJECT, process.env.LOCAL_NAME ?? "Local developer", process.env.LOCAL_EMAIL ?? "developer@localhost"],
  );
  const user = await ctx.db.one(`select id from users where provider = $1 and provider_user_id = $2`, [LOCAL_PROVIDER, LOCAL_SUBJECT]);
  await ctx.db.query(`insert into settings (user_id) values ($1) on conflict do nothing`, [user.id]);
  return user.id;
}

export type Seeds = Partial<Record<CredentialKind, string | undefined>>;

/**
 * Saves any credential the local developer doesn't have yet from `seeds`
 * (normally GITHUB_TOKEN, GEMINI_API_KEY, ANTHROPIC_API_KEY and OPENAI_API_KEY
 * from .env). A credential that is already saved is never replaced: after the
 * first run, Settings is the place to change it. A key for a ranking agent
 * chooses how items are ranked; with none, Warm Welcome offers basic ranking
 * (WEL-4). Returns true if the account has the GitHub token and a ranking
 * agent's key afterwards and setup was completed by this call, so the caller
 * can start the first sync.
 */
export async function seedLocalCredentials(ctx: Ctx, userId: string, seeds: Seeds): Promise<{ seeded: CredentialKind[]; setupCompleted: boolean }> {
  const seeded: CredentialKind[] = [];
  for (const kind of ["github_pat", "gemini_key", "anthropic_key", "openai_key"] as const) {
    const value = seeds[kind]?.trim();
    if (!value || value.length < 10) continue;
    if ((await credentialStatus(ctx, userId, kind)).set) continue;
    if (kind === "github_pat" && (await connectionMethod(ctx.db, userId)) !== null) continue; // GitHub is connected already
    await saveCredential(ctx, userId, kind, value); // not validated, as in Settings (SET-29)
    seeded.push(kind);
  }
  // Before the ranking is chosen, rank with the first agent that has a key, so .env with only ANTHROPIC_API_KEY works too.
  const u = await ctx.db.one(`select ranking_chosen_at from users where id = $1`, [userId]);
  let setupCompleted = false;
  if (!u?.ranking_chosen_at) {
    for (const agent of RankingAgent.options) {
      if (!(await credentialStatus(ctx, userId, keyKindFor(agent))).set) continue;
      await ctx.db.query(`update users set ranking_agent = $2 where id = $1`, [userId, agent]);
      setupCompleted = await rankingChosen(ctx.db, userId);
      break;
    }
  } else {
    setupCompleted = await completeSetupIfReady(ctx.db, userId);
  }
  return { seeded, setupCompleted };
}
