// Finishing a sign-in: the allowlist check, then finding or creating the account
// (design: Sign-in and sessions). The OAuth callbacks and the prototype's stub both end here.
import { randomUUID } from "node:crypto";
import type { SignInIdentity } from "./allowlist.ts";
import type { Ctx } from "./context.ts";
import { log } from "./log.ts";

export type SignInProfile = SignInIdentity & { name: string; avatarUrl?: string | null };

/**
 * Returns the account's ID, or null when the allowlist refuses the sign-in. A refused
 * sign-in creates nothing: no account, no settings, no session.
 */
export async function completeSignIn(ctx: Ctx, p: SignInProfile): Promise<string | null> {
  if (ctx.config.allowlist && !ctx.config.allowlist.allows(p)) {
    // Not the email or username: people appear in the logs only by account ID (design: Logging).
    log.info("auth", "sign-in refused: not on the allowlist", { provider: p.provider });
    return null;
  }
  const db = ctx.db;
  const existing = await db.one(`select id from users where provider = $1 and provider_user_id = $2`, [p.provider, p.providerUserId]);
  if (existing) {
    // The profile can change at the provider, so it is refreshed at every sign-in.
    await db.query(
      `update users set name = $2, email = $3, avatar_url = coalesce($4, avatar_url), sign_in_login = $5 where id = $1`,
      [existing.id, p.name, p.email, p.avatarUrl ?? null, p.login],
    );
    return existing.id;
  }
  const id = randomUUID();
  await db.query(
    `insert into users (id, provider, provider_user_id, name, email, avatar_url, sign_in_login) values ($1, $2, $3, $4, $5, $6, $7)`,
    [id, p.provider, p.providerUserId, p.name, p.email, p.avatarUrl ?? null, p.login],
  );
  await db.query(`insert into settings (user_id) values ($1)`, [id]);
  return id;
}

/** Whether an existing account may still use its sessions, after the allowlist changed. */
export function accountAllowed(ctx: Ctx, u: { provider: string; provider_user_id: string; email: string; sign_in_login: string | null }): boolean {
  if (!ctx.config.allowlist || ctx.config.localMode) return true;
  // The email was verified when the account signed in, or the sign-in would have been refused.
  return ctx.config.allowlist.allows({
    provider: u.provider, providerUserId: u.provider_user_id, email: u.email, emailVerified: true, login: u.sign_in_login,
  });
}
