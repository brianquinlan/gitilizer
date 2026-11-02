// Local mode (docs/local-development.md): one developer on their own machine.
// The account is created once and signed in automatically, and its credentials
// can be filled in from .env, so a fresh database needs no clicks to get going.
import { randomUUID } from "node:crypto";
import type { CredentialKind } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
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
 * (normally GITHUB_TOKEN and GEMINI_API_KEY from .env). A credential that is
 * already saved is never replaced: after the first run, Settings is the place
 * to change it. Returns true if the account has both credentials afterwards
 * and setup was completed by this call, so the caller can start the first sync.
 */
export async function seedLocalCredentials(ctx: Ctx, userId: string, seeds: Seeds): Promise<{ seeded: CredentialKind[]; setupCompleted: boolean }> {
  const seeded: CredentialKind[] = [];
  for (const kind of ["github_pat", "gemini_key"] as const) {
    const value = seeds[kind]?.trim();
    if (!value || value.length < 10) continue;
    if ((await credentialStatus(ctx, userId, kind)).set) continue;
    await saveCredential(ctx, userId, kind, value); // not validated, as in Settings (SET-29)
    seeded.push(kind);
  }
  const both = (await credentialStatus(ctx, userId, "github_pat")).set && (await credentialStatus(ctx, userId, "gemini_key")).set;
  let setupCompleted = false;
  if (both) {
    const r = await ctx.db.query(
      `update users set setup_completed_at = now() where id = $1 and setup_completed_at is null returning id`,
      [userId],
    );
    setupCompleted = r.length > 0;
  }
  return { seeded, setupCompleted };
}
