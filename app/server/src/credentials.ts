// Storing, reading and validating the developer's credentials (PRD SET-1..6, PRIV-1).
import type { CredentialKind, CredentialStatus } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import { GitHubProblem } from "./github/types.ts";

export async function getCredential(ctx: Ctx, userId: string, kind: CredentialKind): Promise<string | null> {
  const r = await ctx.db.one(`select ciphertext, nonce from credentials where user_id = $1 and kind = $2`, [userId, kind]);
  return r ? ctx.cipher.decrypt(userId, r.ciphertext, r.nonce) : null;
}

export async function credentialStatus(ctx: Ctx, userId: string, kind: CredentialKind): Promise<CredentialStatus> {
  const r = await ctx.db.one(
    `select validated_at, validation_ok, validation_detail, expires_at from credentials where user_id = $1 and kind = $2`,
    [userId, kind],
  );
  if (!r) return { set: false, status: "missing", validatedAt: null, detail: null, expiresAt: null };
  return {
    set: true,
    status: r.validation_ok === null ? "unchecked" : r.validation_ok ? "connected" : "invalid",
    validatedAt: r.validated_at ? new Date(r.validated_at).toISOString() : null,
    detail: r.validation_detail,
    expiresAt: r.expires_at ? new Date(r.expires_at).toISOString() : null,
  };
}

export async function saveCredential(ctx: Ctx, userId: string, kind: CredentialKind, value: string) {
  const { ciphertext, nonce } = ctx.cipher.encrypt(userId, value);
  await ctx.db.query(
    `insert into credentials (user_id, kind, ciphertext, nonce) values ($1, $2, $3, $4)
     on conflict (user_id, kind) do update set ciphertext = $3, nonce = $4, expires_at = null,
       validated_at = null, validation_ok = null, validation_detail = null, updated_at = now()`,
    [userId, kind, ciphertext, nonce],
  );
  if (kind === "gemini_key") {
    await ctx.db.query(`update users set ranking_paused_until = null, ranking_paused_code = null where id = $1`, [userId]);
  }
}

/** Checks a saved credential and records the result (SET-2). */
export async function validateCredential(ctx: Ctx, userId: string, kind: CredentialKind): Promise<CredentialStatus> {
  const value = await getCredential(ctx, userId, kind);
  if (!value) return credentialStatus(ctx, userId, kind);
  let ok = false;
  let detail = "";
  let expiresAt: string | null = null;
  if (kind === "github_pat") {
    try {
      const v = await ctx.github(value).viewer();
      ok = true;
      expiresAt = v.tokenExpiresAt;
      detail = `Signed in to GitHub as @${v.login}`;
      await ctx.db.query(`update users set github_login = $2 where id = $1`, [userId, v.login]);
    } catch (e) {
      detail = e instanceof GitHubProblem ? describeGitHubProblem(e) : String(e);
    }
  } else {
    const r = await ctx.validateGemini(value, ctx.config.model);
    ok = r.ok;
    detail = r.detail;
  }
  await ctx.db.query(
    `update credentials set validated_at = now(), validation_ok = $3, validation_detail = $4, expires_at = $5
     where user_id = $1 and kind = $2`,
    [userId, kind, ok, detail, expiresAt],
  );
  return credentialStatus(ctx, userId, kind);
}

/** Checks a value without saving it (the Settings "Validate" button before "Save changes"). */
export async function checkValue(ctx: Ctx, kind: CredentialKind, value: string): Promise<{ ok: boolean; detail: string }> {
  if (kind === "github_pat") {
    try {
      const v = await ctx.github(value).viewer();
      return { ok: true, detail: `Signed in to GitHub as @${v.login}` };
    } catch (e) {
      return { ok: false, detail: e instanceof GitHubProblem ? describeGitHubProblem(e) : String(e) };
    }
  }
  const r = await ctx.validateGemini(value, ctx.config.model);
  return { ok: r.ok, detail: r.detail };
}

export function describeGitHubProblem(e: GitHubProblem): string {
  switch (e.code) {
    case "expired": return "This token has expired";
    case "invalid": return "GitHub didn't accept this token";
    case "rate_limited": return "GitHub's rate limit has been reached; try again later";
    case "unavailable": return "GitHub isn't responding; try again later";
    default: return e.message;
  }
}
