// Storing, reading and checking the developer's credentials (PRD SET-1..6, SET-28..30, PRIV-1).
import { log } from "./log.ts";
import { credentialErrorCodes, type CheckResult, type CredentialKind, type CredentialStatus } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import { GitHubProblem } from "./github/types.ts";

export async function getCredential(ctx: Ctx, userId: string, kind: CredentialKind): Promise<string | null> {
  const r = await ctx.db.one(`select ciphertext, nonce from credentials where user_id = $1 and kind = $2`, [userId, kind]);
  return r ? ctx.cipher.decrypt(userId, r.ciphertext, r.nonce) : null;
}

/** The card's status chip (SET-30): derived from the saved credential and the shown notifications. */
export async function credentialStatus(ctx: Ctx, userId: string, kind: CredentialKind): Promise<CredentialStatus> {
  const r = await ctx.db.one(`select expires_at from credentials where user_id = $1 and kind = $2`, [userId, kind]);
  if (!r) return { set: false, chip: "not_set", expiresAt: null };
  const active = await ctx.db.query(`select code from notifications where user_id = $1 and shown`, [userId]);
  const codes = new Set(active.map((a) => a.code as string));
  const failing = credentialErrorCodes(kind).some((c) => codes.has(c));
  const chip = failing ? "not_working" : kind === "github_pat" && codes.has("github_expiring") ? "expires_soon" : "connected";
  return { set: true, chip, expiresAt: r.expires_at ? new Date(r.expires_at).toISOString() : null };
}

/** Saves a credential without checking it (SET-29). */
export async function saveCredential(ctx: Ctx, userId: string, kind: CredentialKind, value: string, db = ctx.db) {
  const { ciphertext, nonce } = ctx.cipher.encrypt(userId, value);
  await db.query(
    `insert into credentials (user_id, kind, ciphertext, nonce) values ($1, $2, $3, $4)
     on conflict (user_id, kind) do update set ciphertext = $3, nonce = $4, expires_at = null,
       token_login = null, token_type = null, updated_at = now()`,
    [userId, kind, ciphertext, nonce],
  );
  if (kind === "gemini_key") {
    // Quotas belong to the key's Google Cloud project (design: Data model, gemini_quota).
    await db.query(`update users set ranking_paused_until = null, ranking_paused_code = null where id = $1`, [userId]);
    await db.query(`delete from gemini_quota where user_id = $1`, [userId]);
    await db.query(`update rank_jobs set not_before = now() where user_id = $1 and state = 'queued'`, [userId]);
  }
}

/** Checks a typed value without saving it (SET-2, SET-28). */
export async function checkValue(ctx: Ctx, kind: CredentialKind, value: string): Promise<CheckResult> {
  if (kind === "gemini_key") return ctx.validateGemini(value, ctx.config.models[0]);
  try {
    const gh = ctx.github(value);
    const v = await gh.viewer();
    // One search shows a missing permission through X-Accepted-GitHub-Permissions (design: HTTP API).
    await gh.search(`is:open involves:${v.login}`, 1);
    return { ok: true, code: "ok", login: v.login };
  } catch (e) {
    if (!(e instanceof GitHubProblem)) return { ok: false, code: "error" };
    switch (e.code) {
      case "invalid": return { ok: false, code: "not_accepted" };
      case "expired": return { ok: false, code: "expired" };
      case "permission": return { ok: false, code: "permission", permission: e.details.permission };
      case "unavailable": return { ok: false, code: "unreachable" };
      default:
        log.warn("credentials", "GitHub token check failed", { code: e.code, message: e.message.slice(0, 300) });
        return { ok: false, code: "error" };
    }
  }
}
