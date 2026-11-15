// Connecting GitHub with the Gitilizer app (design: GitHub connection; PRD SET-43).
//
//   GET /api/connect/github/start?next=/path   redirects to GitHub's authorization page for the app
//   GET /api/connect/github/callback           saves the connection, then redirects to `next`,
//                                              or to `next` with ?connect={cancelled|failed}
//   GET /api/github/connection                 what the GitHub card shows
//
// The same flow as sign-in (auth.ts): the authorization code flow with PKCE and a `state` kept in
// `oauth_states` and in a cookie. Unlike sign-in, it needs a session, the state belongs to the account that
// started it, and the tokens are kept, encrypted, because they are what the scanner reads GitHub with.
import { randomBytes } from "node:crypto";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { ConnectFailure } from "@gitilizer/shared";
import { pkceChallenge, safeNext } from "./auth.ts";
import { FIXTURE_APP_TOKEN, appAvailable, connectionDetails, saveAppConnection, tokensFrom } from "./connection.ts";
import type { Ctx } from "./context.ts";
import { log } from "./log.ts";

const STATE_SECONDS = 600;
const TIMEOUT_MS = 10_000;
const PROVIDER = "github_app";
const COOKIE = "gitilizer_connect";
const AUTHORIZE = "https://github.com/login/oauth/authorize";
const TOKEN = "https://github.com/login/oauth/access_token";
const USER = "https://api.github.com/user";

const b64url = (b: Buffer) => b.toString("base64url");

export const connectRedirectUri = (ctx: Ctx) => `${ctx.config.publicUrl}/api/connect/github/callback`;

/** `next` with ?connect=…, ahead of any #fragment, so the page can say what happened (SET-43). */
export function withResult(next: string, result: ConnectFailure): string {
  const [rest, hash] = next.split("#", 2);
  return `${rest}${rest.includes("?") ? "&" : "?"}connect=${result}${hash !== undefined ? `#${hash}` : ""}`;
}

type Helpers = {
  cookieName(base: string): string;
  cookieOptions(maxAgeSeconds?: number): Record<string, unknown>;
  uid(req: FastifyRequest): string;
  /** After the connection is saved: clear its notifications, complete setup if that was all it lacked, and sync. */
  connected(userId: string): Promise<void>;
};

export function registerConnect(app: FastifyInstance, ctx: Ctx, h: Helpers) {
  const db = ctx.db;
  const cookie = h.cookieName(COOKIE);

  app.get("/api/github/connection", async (req) => connectionDetails(ctx, h.uid(req)));

  app.get("/api/connect/github/start", async (req, reply) => {
    const userId = h.uid(req);
    const next = safeNext((req.query as any)?.next);
    if (!appAvailable(ctx)) return reply.code(404).send({ error: "The Gitilizer app isn't configured" });
    if (ctx.config.githubMode === "fixtures") {
      // Fixture mode's stand-in: connect as the fixtures' account, without GitHub.
      const v = await ctx.github(FIXTURE_APP_TOKEN).viewer();
      await saveAppConnection(ctx, userId, { accessToken: FIXTURE_APP_TOKEN, expiresIn: null, refreshToken: null, refreshExpiresIn: null }, { login: v.login, id: v.id });
      await h.connected(userId);
      return reply.redirect(next, 302);
    }
    const client = ctx.config.githubApp!;
    const state = b64url(randomBytes(32));
    const verifier = b64url(randomBytes(48));
    await db.query(
      `insert into oauth_states (state, provider, verifier, nonce, next, user_id) values ($1, $2, $3, '', $4, $5)`,
      [state, PROVIDER, verifier, next, userId],
    );
    reply.setCookie(cookie, state, h.cookieOptions(STATE_SECONDS));
    const q = new URLSearchParams({
      client_id: client.clientId, redirect_uri: connectRedirectUri(ctx), state,
      code_challenge: pkceChallenge(verifier), code_challenge_method: "S256",
    });
    return reply.redirect(`${AUTHORIZE}?${q}`, 302);
  });

  app.get("/api/connect/github/callback", async (req, reply) => {
    const userId = h.uid(req);
    const q = (req.query ?? {}) as Record<string, string | undefined>;
    const client = ctx.config.githubApp;
    // The state must be one we issued, to this account and this browser, in the last 10 minutes. It is used once.
    const row = q.state
      ? await db.one(
          `delete from oauth_states where state = $1 and provider = $2
           returning verifier, next, user_id, created_at > now() - make_interval(secs => $3) as fresh`,
          [q.state, PROVIDER, STATE_SECONDS],
        )
      : undefined;
    const next = safeNext(row?.user_id === userId ? row?.next : "/settings#connections");
    const failed = (result: ConnectFailure, detail: Record<string, unknown>) => {
      log[result === "cancelled" ? "info" : "warn"]("connect", "GitHub wasn't connected", { user: userId, result, ...detail });
      reply.clearCookie(cookie, h.cookieOptions());
      return reply.redirect(withResult(next, result), 302);
    };
    if (!client) return failed("failed", { problem: "not configured" });
    // GitHub's own words go to the log only, as for sign-in (AUTH-14).
    if (q.error) return failed(q.error === "access_denied" ? "cancelled" : "failed", { error: q.error, description: q.error_description });
    const browserState = req.cookies[cookie];
    if (!q.code || !row || !row.fresh || row.user_id !== userId || !browserState || browserState !== q.state) {
      return failed("failed", { problem: !q.code ? "no code" : !row ? "unknown state" : !row.fresh ? "old state" : row.user_id !== userId ? "another account's state" : "cookie missing or different" });
    }

    const http = ctx.http ?? fetch;
    try {
      const res = await http(TOKEN, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" },
        body: new URLSearchParams({
          code: q.code, code_verifier: row.verifier, client_id: client.clientId, client_secret: client.clientSecret, redirect_uri: connectRedirectUri(ctx),
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      const body: any = await res.json().catch(() => null);
      const tokens = res.status === 200 ? tokensFrom(body) : null;
      if (!tokens) return failed("failed", { step: "token", status: res.status, error: body?.error, description: body?.error_description });
      const user = await http(USER, {
        headers: { authorization: `Bearer ${tokens.accessToken}`, accept: "application/vnd.github+json", "user-agent": "gitilizer", "x-github-api-version": "2022-11-28" },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      const u: any = await user.json().catch(() => null);
      if (user.status !== 200 || !u?.login) return failed("failed", { step: "user", status: user.status });
      await saveAppConnection(ctx, userId, tokens, { login: String(u.login), id: Number(u.id) || null });
    } catch (e) {
      return failed("failed", { error: String((e as Error)?.message ?? e) });
    }
    await h.connected(userId);
    reply.clearCookie(cookie, h.cookieOptions());
    log.info("connect", "GitHub connected with the app", { user: userId });
    return reply.redirect(next, 302);
  });
}
