// Google and GitHub sign-in (design: Sign-in and sessions; PRD AUTH-1 to AUTH-15).
//
//   GET /api/auth/{google|github}/start?next=/path   redirects to the provider
//   GET /api/auth/{google|github}/callback           finishes, then redirects to `next`,
//                                                    or to /sign-in?error={category}&provider=...
//
// Both use the authorization code flow with PKCE and a `state` value. The state, the PKCE verifier and
// (for Google) the nonce are kept in `oauth_states` for 10 minutes, and the state is also put in a cookie,
// so a callback only completes in the browser that started it. The provider's tokens are used once, to read
// the profile, and then dropped: Gitilizer keeps no Google or GitHub sign-in token (AUTH-5, PRIV-1).
import { createHash, randomBytes } from "node:crypto";
import type { FastifyInstance, FastifyReply } from "fastify";
import type { Ctx, OAuthClient } from "./context.ts";
import { log } from "./log.ts";
import { completeSignIn, type SignInProfile } from "./signin.ts";

export type Provider = "google" | "github";
export const PROVIDERS: Provider[] = ["google", "github"];
/** The categories the sign-in page shows (AUTH-10 to AUTH-14). */
export type SignInFailure = "cancelled" | "provider_unavailable" | "expired" | "not_allowed" | "gitilizer_error";

const STATE_SECONDS = 600;
const PROVIDER_TIMEOUT_MS = 10_000;

const GOOGLE = {
  authorize: "https://accounts.google.com/o/oauth2/v2/auth",
  token: "https://oauth2.googleapis.com/token",
  issuers: ["https://accounts.google.com", "accounts.google.com"],
};
const GITHUB = {
  authorize: "https://github.com/login/oauth/authorize",
  token: "https://github.com/login/oauth/access_token",
  api: "https://api.github.com",
};

/** A failure sorted into the category the sign-in page shows. `detail` goes to the log, never to the page. */
export class SignInError extends Error {
  constructor(public category: SignInFailure, public detail: Record<string, unknown> = {}) { super(category); }
}

const b64url = (b: Buffer) => b.toString("base64url");
export const pkceChallenge = (verifier: string) => b64url(createHash("sha256").update(verifier).digest());

/** Where to go after signing in: a path on this site, never another site (`//evil.example` or `/\evil`). */
export function safeNext(next: unknown): string {
  return typeof next === "string" && /^\/(?![/\\])/.test(next) && next.length <= 2000 ? next : "/";
}

export function redirectUri(ctx: Ctx, provider: Provider): string {
  return `${ctx.config.publicUrl}/api/auth/${provider}/callback`;
}

export function authorizeUrl(ctx: Ctx, provider: Provider, client: OAuthClient, state: string, verifier: string, nonce: string): string {
  const q = new URLSearchParams({
    client_id: client.clientId,
    redirect_uri: redirectUri(ctx, provider),
    response_type: "code",
    state,
    code_challenge: pkceChallenge(verifier),
    code_challenge_method: "S256",
  });
  if (provider === "google") {
    q.set("scope", "openid email profile");
    q.set("nonce", nonce);
    q.set("prompt", "select_account"); // Google shows its account chooser (design: Sign-in and sessions)
    return `${GOOGLE.authorize}?${q}`;
  }
  q.set("scope", "user:email"); // only to read a private primary email; no repository scopes (AUTH-5)
  q.set("allow_signup", "true");
  return `${GITHUB.authorize}?${q}`;
}

/** The provider's `error` parameter on the callback, sorted (AUTH-11, AUTH-12). */
export function categorizeProviderError(error: string): SignInFailure {
  if (error === "access_denied") return "cancelled";
  if (error === "server_error" || error === "temporarily_unavailable") return "provider_unavailable";
  return "gitilizer_error";
}

/** A request to the provider: unreachable, timed out or 5xx is the provider being unavailable. */
async function call(ctx: Ctx, step: string, url: string, init: RequestInit): Promise<{ status: number; body: any }> {
  const http = ctx.http ?? fetch;
  let res: Response;
  try {
    res = await http(url, { ...init, signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS) });
  } catch (e) {
    throw new SignInError("provider_unavailable", { step, error: String(e) });
  }
  const text = await res.text().catch(() => "");
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { raw: text.slice(0, 300) }; }
  if (res.status >= 500) throw new SignInError("provider_unavailable", { step, status: res.status });
  return { status: res.status, body };
}

function decodeJwtPayload(jwt: string): any {
  const parts = jwt.split(".");
  if (parts.length !== 3) throw new SignInError("gitilizer_error", { step: "id_token", problem: "not a JWT" });
  try {
    return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  } catch {
    throw new SignInError("gitilizer_error", { step: "id_token", problem: "unreadable payload" });
  }
}

/**
 * Exchanges Google's code and reads the ID token. The token comes straight from Google's token endpoint over
 * TLS, so OpenID Connect allows checking its issuer, audience, expiry and nonce without its signature (Core 1.0,
 * 3.1.3.7).
 */
export async function googleProfile(ctx: Ctx, client: OAuthClient, code: string, verifier: string, nonce: string): Promise<SignInProfile> {
  const { status, body } = await call(ctx, "google token", GOOGLE.token, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" },
    body: new URLSearchParams({
      grant_type: "authorization_code", code, code_verifier: verifier,
      client_id: client.clientId, client_secret: client.clientSecret, redirect_uri: redirectUri(ctx, "google"),
    }),
  });
  if (status !== 200 || !body?.id_token) {
    // invalid_grant: the code was used already or has expired.
    throw new SignInError(body?.error === "invalid_grant" ? "expired" : "gitilizer_error", { step: "google token", status, error: body?.error, description: body?.error_description });
  }
  const t = decodeJwtPayload(body.id_token);
  const aud = Array.isArray(t.aud) ? t.aud : [t.aud];
  const problem = !GOOGLE.issuers.includes(t.iss) ? "issuer"
    : !aud.includes(client.clientId) ? "audience"
    : !(typeof t.exp === "number" && t.exp * 1000 > Date.now() - 60_000) ? "expired"
    : t.nonce !== nonce ? "nonce"
    : !t.sub ? "subject"
    : !t.email ? "email" : null;
  if (problem) throw new SignInError("gitilizer_error", { step: "id_token", problem });
  return {
    provider: "google",
    providerUserId: String(t.sub),
    email: String(t.email),
    emailVerified: t.email_verified === true || t.email_verified === "true",
    name: String(t.name ?? t.email),
    avatarUrl: t.picture ?? null,
    login: null,
  };
}

/** Exchanges GitHub's code, reads the user (and their primary email if it is private), then drops the token. */
export async function githubProfile(ctx: Ctx, client: OAuthClient, code: string, verifier: string): Promise<SignInProfile> {
  const { status, body } = await call(ctx, "github token", GITHUB.token, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" },
    body: new URLSearchParams({
      code, code_verifier: verifier, client_id: client.clientId, client_secret: client.clientSecret, redirect_uri: redirectUri(ctx, "github"),
    }),
  });
  if (status !== 200 || !body?.access_token) {
    // GitHub answers 200 with an error; bad_verification_code means the code was used or expired (10 minutes).
    throw new SignInError(body?.error === "bad_verification_code" ? "expired" : "gitilizer_error", { step: "github token", status, error: body?.error, description: body?.error_description });
  }
  const headers = { authorization: `Bearer ${body.access_token}`, accept: "application/vnd.github+json", "user-agent": "gitilizer", "x-github-api-version": "2022-11-28" };
  const user = await call(ctx, "github user", `${GITHUB.api}/user`, { headers });
  if (user.status !== 200 || !user.body?.id || !user.body?.login) {
    throw new SignInError("gitilizer_error", { step: "github user", status: user.status, message: user.body?.message });
  }
  let email: string | null = user.body.email ?? null;
  if (!email) {
    const emails = await call(ctx, "github emails", `${GITHUB.api}/user/emails`, { headers });
    const primary = Array.isArray(emails.body) ? emails.body.find((e: any) => e.primary && e.verified) : null;
    email = primary?.email ?? null;
  }
  const id = String(user.body.id);
  const login = String(user.body.login);
  return {
    provider: "github",
    providerUserId: id,
    // The account always has one: GitHub's no-reply address when the developer hides theirs.
    email: email ?? `${id}+${login}@users.noreply.github.com`,
    emailVerified: Boolean(email),
    name: String(user.body.name || login),
    avatarUrl: user.body.avatar_url ?? null,
    login,
  };
}

type Helpers = {
  /** Starts a session for the account and sets its cookie. */
  startSession(reply: FastifyReply, userId: string): Promise<string>;
  cookieName(base: string): string;
  cookieOptions(maxAgeSeconds?: number): Record<string, unknown>;
};

const OAUTH_COOKIE = "gitilizer_oauth";

/** Registers /api/auth/config and, for each configured provider, its start and callback routes. */
export function registerSignIn(app: FastifyInstance, ctx: Ctx, h: Helpers) {
  const db = ctx.db;
  const cookie = h.cookieName(OAUTH_COOKIE);

  // What the sign-in page offers. Public: it is read before anyone has signed in.
  app.get("/api/auth/config", async () => ({
    providers: { google: Boolean(ctx.config.oauth.google), github: Boolean(ctx.config.oauth.github) },
    devSignIn: ctx.config.devSignIn,
  }));

  for (const provider of PROVIDERS) {
    const failed = (reply: FastifyReply, category: SignInFailure) => {
      reply.clearCookie(cookie, h.cookieOptions());
      return reply.redirect(`/sign-in?error=${category}&provider=${provider}`, 302);
    };

    app.get(`/api/auth/${provider}/start`, async (req, reply) => {
      const client = ctx.config.oauth[provider];
      if (!client) return reply.code(404).send({ error: `${provider} sign-in isn't configured` });
      const state = b64url(randomBytes(32));
      const verifier = b64url(randomBytes(48));
      const nonce = b64url(randomBytes(24));
      const next = safeNext((req.query as any)?.next);
      await db.query(
        `insert into oauth_states (state, provider, verifier, nonce, next) values ($1, $2, $3, $4, $5)`,
        [state, provider, verifier, nonce, next],
      );
      reply.setCookie(cookie, state, h.cookieOptions(STATE_SECONDS));
      return reply.redirect(authorizeUrl(ctx, provider, client, state, verifier, nonce), 302);
    });

    app.get(`/api/auth/${provider}/callback`, async (req, reply) => {
      const q = (req.query ?? {}) as Record<string, string | undefined>;
      const client = ctx.config.oauth[provider];
      if (!client) return failed(reply, "gitilizer_error");

      if (q.error) {
        const category = categorizeProviderError(q.error);
        // The provider's own words go to the log only (AUTH-14).
        log[category === "cancelled" ? "info" : "warn"]("auth", "sign-in failed at the provider", {
          provider, category, error: q.error, description: q.error_description, uri: q.error_uri,
        });
        if (q.state) await db.query(`delete from oauth_states where state = $1`, [q.state]);
        return failed(reply, category);
      }

      // The state must be one we issued, to this browser, in the last 10 minutes, for this provider. It is used once.
      const row = q.state
        ? await db.one(
            `delete from oauth_states where state = $1 returning provider, verifier, nonce, next, created_at > now() - make_interval(secs => $2) as fresh`,
            [q.state, STATE_SECONDS],
          )
        : undefined;
      const browserState = req.cookies[cookie];
      if (!q.code || !row || !row.fresh || row.provider !== provider || !browserState || browserState !== q.state) {
        log.info("auth", "sign-in expired", {
          provider, problem: !q.code ? "no code" : !row ? "unknown state" : !row.fresh ? "old state" : row.provider !== provider ? "other provider" : "cookie missing or different",
        });
        return failed(reply, "expired");
      }

      let profile: SignInProfile;
      try {
        profile = provider === "google"
          ? await googleProfile(ctx, client, q.code, row.verifier, row.nonce)
          : await githubProfile(ctx, client, q.code, row.verifier);
      } catch (e) {
        const err = e instanceof SignInError ? e : new SignInError("gitilizer_error", { error: String((e as Error)?.stack ?? e) });
        log.warn("auth", "sign-in failed", { provider, category: err.category, ...err.detail });
        return failed(reply, err.category);
      }

      let userId: string | null;
      try {
        userId = await completeSignIn(ctx, profile);
      } catch (e) {
        log.error("auth", "sign-in failed", { provider, category: "gitilizer_error", error: String((e as Error)?.stack ?? e) });
        return failed(reply, "gitilizer_error");
      }
      if (!userId) return failed(reply, "not_allowed");
      await h.startSession(reply, userId);
      reply.clearCookie(cookie, h.cookieOptions());
      log.info("auth", "signed in", { provider, user: userId });
      return reply.redirect(safeNext(row.next), 302);
    });
  }
}
