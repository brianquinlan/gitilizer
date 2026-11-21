// What the deployed environments need (contributor/DEPLOYMENT.md): the startup checks, Google and GitHub
// sign-in, the web app served by the server, and several processes sharing the scheduler's work.
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { buildApp } from "../src/app.ts";
import { authorizeUrl, pkceChallenge, safeNext } from "../src/auth.ts";
import type { Ctx } from "../src/context.ts";
import { Allowlist } from "../src/allowlist.ts";
import { loadConfig } from "../src/main.ts";
import { Scheduler } from "../src/scheduler.ts";
import { escapeHtml, privacyPage } from "../src/site.ts";
import { addUser, makeCtx, ROOT } from "./helpers.ts";

const DEPLOYED = {
  GITILIZER_ENV: "production", NODE_ENV: "production", DATABASE_URL: "postgresql://u:p@/db?host=/cloudsql/x",
  CREDENTIAL_KEY: Buffer.alloc(32, 9).toString("base64"), WORKER_TOKEN: "w".repeat(32), PUBLIC_URL: "https://gitilizer.com",
  GOOGLE_CLIENT_ID: "g-id", GOOGLE_CLIENT_SECRET: "g-secret", GITHUB_CLIENT_ID: "h-id", GITHUB_CLIENT_SECRET: "h-secret",
  BASIC_RANKING_API_KEY: "AIza-gitilizers-own",
};

describe("startup checks for the deployed environments", () => {
  it("starts with everything set, with no sign-in stub and secure cookies", () => {
    const c = loadConfig(DEPLOYED, ["node", "main.ts"]);
    expect(c).toMatchObject({ devSignIn: false, secure: true, publicUrl: "https://gitilizer.com", localMode: false, scheduler: true });
    expect(c.oauth.google).toEqual({ clientId: "g-id", clientSecret: "g-secret" });
    expect(c.basic).toEqual({ key: "AIza-gitilizers-own", model: "gemini-decision-1" });
    expect(c.models).toEqual(["gemini-3.8-flash", "gemini-3.5-flash-lite"]); // RANK-13: basic ranking comes after these
  });

  it("ranks for basic ranking with the key in .env on a developer's computer, but never when deployed (RANK-21)", () => {
    expect(loadConfig({ GEMINI_API_KEY: "AIza-mine" }, ["node", "main.ts"]).basic.key).toBe("AIza-mine");
    expect(loadConfig({ GEMINI_API_KEY: "AIza-mine", BASIC_RANKING_API_KEY: "AIza-basic" }, ["node", "main.ts"]).basic.key).toBe("AIza-basic");
    expect(() => loadConfig({ ...DEPLOYED, BASIC_RANKING_API_KEY: undefined, GEMINI_API_KEY: "AIza-mine" }, ["node", "main.ts"])).toThrow(/BASIC_RANKING_API_KEY is missing/);
  });

  it("refuses to start rather than fall back to PGlite, the built-in key, the stub or fixtures", () => {
    const without = (k: keyof typeof DEPLOYED) => () => loadConfig({ ...DEPLOYED, [k]: undefined }, ["node", "main.ts"]);
    expect(without("DATABASE_URL")).toThrow(/DATABASE_URL is missing/);
    expect(without("CREDENTIAL_KEY")).toThrow(/CREDENTIAL_KEY is missing/);
    expect(without("WORKER_TOKEN")).toThrow(/WORKER_TOKEN is missing/);
    expect(without("PUBLIC_URL")).toThrow(/PUBLIC_URL/);
    expect(without("GITHUB_CLIENT_SECRET")).toThrow(/GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET/);
    expect(without("NODE_ENV")).toThrow(/NODE_ENV must be production/);
    expect(() => loadConfig({ ...DEPLOYED, PUBLIC_URL: "http://gitilizer.com" }, ["node", "main.ts"])).toThrow(/PUBLIC_URL/);
    expect(() => loadConfig({ ...DEPLOYED, GITILIZER_ENV: "staging" }, ["node", "main.ts"])).toThrow(/must be development or production/);
    expect(() => loadConfig({ ...DEPLOYED, LOCAL_MODE: "1" }, ["node", "main.ts"])).toThrow(/LOCAL_MODE/);
    expect(() => loadConfig(DEPLOYED, ["node", "main.ts", "--fixtures"])).toThrow(/Fixture mode/);
    expect(() => loadConfig({ ...DEPLOYED, DEV_SIGN_IN: "1" }, ["node", "main.ts"])).toThrow(/DEV_SIGN_IN/);
    // Development also needs its allowlist (PRD Q-80).
    expect(() => loadConfig({ ...DEPLOYED, GITILIZER_ENV: "development" }, ["node", "main.ts"])).toThrow(/SIGN_IN_ALLOWLIST/);
    expect(loadConfig({ ...DEPLOYED, GITILIZER_ENV: "development", SIGN_IN_ALLOWLIST: "github-id:1" }, ["node", "main.ts"]).allowlist?.size).toBe(1);
  });

  it("keeps the sign-in stub on a developer's computer only", () => {
    expect(loadConfig({}, ["node", "main.ts", "--local"]).devSignIn).toBe(true);
    expect(loadConfig({}, ["node", "main.ts", "--fixtures"]).devSignIn).toBe(true);
    expect(loadConfig({}, ["node", "main.ts"]).devSignIn).toBe(false);
    expect(loadConfig({}, ["node", "main.ts", "--dev-sign-in"]).devSignIn).toBe(true);
    expect(() => loadConfig(DEPLOYED, ["node", "main.ts", "--dev-sign-in"])).not.toThrow();
    expect(loadConfig(DEPLOYED, ["node", "main.ts", "--dev-sign-in"]).devSignIn).toBe(false);
    expect(loadConfig({ SCHEDULER: "off" }, ["node", "main.ts"]).scheduler).toBe(false);
  });
});

// --- Sign-in ---

type Answer = { status?: number; body?: unknown; throws?: boolean };

/** A stand-in for Google's and GitHub's servers. Records each request's URL and form. */
function providers(answers: Record<string, Answer | ((form: URLSearchParams) => Answer)>) {
  const asked: { url: string; form: URLSearchParams; auth: string | null }[] = [];
  const http = (async (url: string, init: RequestInit = {}) => {
    const form = new URLSearchParams(typeof init.body === "string" ? init.body : init.body instanceof URLSearchParams ? init.body.toString() : "");
    asked.push({ url, form, auth: (init.headers as Record<string, string> | undefined)?.authorization ?? null });
    const a0 = answers[url];
    if (!a0) throw new Error(`unexpected request to ${url}`);
    const a = typeof a0 === "function" ? a0(form) : a0;
    if (a.throws) throw new TypeError("fetch failed");
    return new Response(JSON.stringify(a.body ?? {}), { status: a.status ?? 200, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
  return { http, asked };
}

const jwt = (payload: object) => `e30.${Buffer.from(JSON.stringify(payload)).toString("base64url")}.sig`;

async function signInApp(over: Parameters<typeof makeCtx>[0] = {}) {
  const { ctx } = await makeCtx({
    devSignIn: false, publicUrl: "https://gitilizer.test",
    oauth: { google: { clientId: "g-id", clientSecret: "g-secret" }, github: { clientId: "h-id", clientSecret: "h-secret" } },
    ...over,
  });
  const app = buildApp(ctx, new Scheduler(ctx), null);
  return { ctx, app };
}

/**
 * Where a failed sign-in went: the home page, with the notice's cookie (AUTH-10). "category.provider", or what went
 * wrong instead.
 */
function noticeOf(r: { headers: Record<string, unknown> }): string {
  if (r.headers.location !== "/") return `went to ${String(r.headers.location)}`;
  const m = String(r.headers["set-cookie"]).match(/gitilizer_signin_notice=([^;]+)/);
  return m ? m[1] : "no notice";
}

/** A built web app with index.html and one hashed asset. */
function webDir(): string {
  const dir = mkdtempSync(join(tmpdir(), "gitilizer-web-"));
  mkdirSync(join(dir, "assets"));
  writeFileSync(join(dir, "index.html"), "<!doctype html><div id=root></div>");
  writeFileSync(join(dir, "assets", "index-abc123.js"), "console.log(1)");
  return dir;
}

/** A session for u1 (addUser), as the cookie a browser would send. */
async function sessionCookie(ctx: Ctx, secure: boolean): Promise<string> {
  await addUser(ctx);
  await ctx.db.query(`insert into sessions (id, user_id, expires_at) values ('sid-1', 'u1', now() + interval '1 day')`);
  return `${secure ? "__Host-" : ""}gitilizer_session=sid-1`;
}

/** Starts a sign-in; returns the state, the cookie that carries it, and the provider URL's parameters. */
async function start(app: Awaited<ReturnType<typeof signInApp>>["app"], provider: "google" | "github", next = "/settings") {
  const r = await app.inject({ method: "GET", url: `/api/auth/${provider}/start?next=${encodeURIComponent(next)}` });
  expect(r.statusCode).toBe(302);
  const to = new URL(String(r.headers.location));
  const cookie = String(r.headers["set-cookie"]).split(";")[0];
  return { to, state: to.searchParams.get("state")!, cookie };
}

const callback = (app: any, provider: string, query: string, cookie: string) =>
  app.inject({ method: "GET", url: `/api/auth/${provider}/callback?${query}`, headers: { cookie } });

describe("Google sign-in", () => {
  let ctx: Ctx;
  afterEach(() => { ctx = undefined as any; });

  it("sends the browser to Google with PKCE, a state and a nonce, and only the openid email profile scopes", async () => {
    const { app } = await signInApp();
    const { to } = await start(app, "google");
    expect(`${to.origin}${to.pathname}`).toBe("https://accounts.google.com/o/oauth2/v2/auth");
    expect(Object.fromEntries(to.searchParams)).toMatchObject({
      client_id: "g-id", redirect_uri: "https://gitilizer.test/api/auth/google/callback", response_type: "code",
      scope: "openid email profile", code_challenge_method: "S256", prompt: "select_account",
    });
    expect(to.searchParams.get("nonce")).toBeTruthy();
    await app.close();
  });

  it("signs in, creates the account from the ID token, and returns to where the developer was", async () => {
    const s = await signInApp();
    ctx = s.ctx;
    const { to, state, cookie } = await start(s.app, "google", "/icebox");
    const { http, asked } = providers({
      "https://oauth2.googleapis.com/token": (form) => ({
        body: { id_token: jwt({ iss: "https://accounts.google.com", aud: "g-id", exp: Date.now() / 1000 + 600, nonce: to.searchParams.get("nonce"), sub: "1234", email: "maya@example.com", email_verified: true, name: "Maya", picture: "https://lh3.googleusercontent.com/a/x" }),
          // The verifier we send matches the challenge Google was given.
          ok: pkceChallenge(form.get("code_verifier")!) === to.searchParams.get("code_challenge") },
      }),
    });
    ctx.http = http;
    const r = await callback(s.app, "google", `code=abc&state=${state}`, cookie);
    expect(r.statusCode).toBe(302);
    expect(r.headers.location).toBe("/icebox");
    expect(pkceChallenge(asked[0].form.get("code_verifier")!)).toBe(to.searchParams.get("code_challenge"));
    expect(asked[0].form.get("client_secret")).toBe("g-secret");
    expect(await ctx.db.one(`select provider, provider_user_id, email, name, avatar_url from users`)).toEqual({
      provider: "google", provider_user_id: "1234", email: "maya@example.com", name: "Maya", avatar_url: "https://lh3.googleusercontent.com/a/x",
    });
    const session = String(r.headers["set-cookie"]).match(/gitilizer_session=[^;]+/)![0];
    expect((await s.app.inject({ method: "GET", url: "/api/me", headers: { cookie: session } })).statusCode).toBe(200);
    // The state is used once.
    expect(noticeOf(await callback(s.app, "google", `code=abc&state=${state}`, cookie))).toBe("expired.google");
    await s.app.close();
  });

  it("sorts every failure into the sign-in page's categories (AUTH-10 to AUTH-14)", async () => {
    const s = await signInApp({ allowlist: Allowlist.parse("google:maya@example.com") });
    ctx = s.ctx;
    const where = (r: any) => r.headers.location;
    const token = (claims: object) => ({ body: { id_token: jwt({ iss: "accounts.google.com", aud: "g-id", exp: Date.now() / 1000 + 600, sub: "9", email: "sam@example.com", email_verified: true, ...claims }) } });

    let a = await start(s.app, "google");
    expect(noticeOf(await callback(s.app, "google", `error=access_denied&state=${a.state}`, a.cookie))).toBe("cancelled.google");
    a = await start(s.app, "google");
    expect(noticeOf(await callback(s.app, "google", `error=temporarily_unavailable&state=${a.state}`, a.cookie))).toBe("provider_unavailable.google");
    a = await start(s.app, "google");
    expect(noticeOf(await callback(s.app, "google", `error=invalid_scope&state=${a.state}`, a.cookie))).toBe("gitilizer_error.google");

    // No cookie (blocked cookies), an unknown state, or an old one: "expired".
    a = await start(s.app, "google");
    expect(noticeOf(await callback(s.app, "google", `code=c&state=${a.state}`, ""))).toBe("expired.google");
    expect(noticeOf(await callback(s.app, "google", `code=c&state=nope`, a.cookie))).toBe("expired.google");
    a = await start(s.app, "google");
    await ctx.db.query(`update oauth_states set created_at = now() - interval '11 minutes'`);
    expect(noticeOf(await callback(s.app, "google", `code=c&state=${a.state}`, a.cookie))).toBe("expired.google");

    // Google down, or timing out.
    ctx.http = providers({ "https://oauth2.googleapis.com/token": { status: 503 } }).http;
    a = await start(s.app, "google");
    expect(noticeOf(await callback(s.app, "google", `code=c&state=${a.state}`, a.cookie))).toBe("provider_unavailable.google");
    ctx.http = providers({ "https://oauth2.googleapis.com/token": { throws: true } }).http;
    a = await start(s.app, "google");
    expect(noticeOf(await callback(s.app, "google", `code=c&state=${a.state}`, a.cookie))).toBe("provider_unavailable.google");

    // A token for someone else's app, or with the wrong nonce, is our error, and signs no one in.
    a = await start(s.app, "google");
    ctx.http = providers({ "https://oauth2.googleapis.com/token": token({ aud: "other", nonce: a.to.searchParams.get("nonce") }) }).http;
    expect(noticeOf(await callback(s.app, "google", `code=c&state=${a.state}`, a.cookie))).toBe("gitilizer_error.google");
    a = await start(s.app, "google");
    ctx.http = providers({ "https://oauth2.googleapis.com/token": token({ nonce: "wrong" }) }).http;
    expect(noticeOf(await callback(s.app, "google", `code=c&state=${a.state}`, a.cookie))).toBe("gitilizer_error.google");

    // Not on the development allowlist.
    a = await start(s.app, "google");
    ctx.http = providers({ "https://oauth2.googleapis.com/token": token({ nonce: a.to.searchParams.get("nonce") }) }).http;
    expect(noticeOf(await callback(s.app, "google", `code=c&state=${a.state}`, a.cookie))).toBe("not_allowed.google");
    expect(await ctx.db.one(`select count(*)::int as n from users`)).toEqual({ n: 0 });
    await s.app.close();
  });

  it("goes back only to a page on this site", () => {
    expect(safeNext("/settings#connections")).toBe("/settings#connections");
    expect(safeNext("//evil.example")).toBe("/");
    expect(safeNext("/\\evil.example")).toBe("/");
    expect(safeNext("https://evil.example")).toBe("/");
    expect(safeNext(undefined)).toBe("/");
  });
});

describe("GitHub sign-in", () => {
  it("asks only for user:email, reads a private primary email, and keys the account by GitHub's numeric ID", async () => {
    const s = await signInApp({ allowlist: Allowlist.parse("github-id:583231") });
    const { to, state, cookie } = await start(s.app, "github", "/");
    expect(`${to.origin}${to.pathname}`).toBe("https://github.com/login/oauth/authorize");
    expect(to.searchParams.get("scope")).toBe("user:email");
    expect(to.searchParams.get("code_challenge_method")).toBe("S256");
    const { http, asked } = providers({
      "https://github.com/login/oauth/access_token": { body: { access_token: "gho_x", token_type: "bearer" } },
      "https://api.github.com/user": { body: { id: 583231, login: "octocat", name: null, email: null, avatar_url: "https://avatars.githubusercontent.com/u/583231" } },
      "https://api.github.com/user/emails": { body: [{ email: "old@example.com", primary: false, verified: true }, { email: "octo@example.com", primary: true, verified: true }] },
    });
    s.ctx.http = http;
    const r = await callback(s.app, "github", `code=abc&state=${state}`, cookie);
    expect(r.headers.location).toBe("/");
    expect(asked[1].auth).toBe("Bearer gho_x");
    expect(await s.ctx.db.one(`select provider, provider_user_id, email, name, sign_in_login from users`)).toEqual({
      provider: "github", provider_user_id: "583231", email: "octo@example.com", name: "octocat", sign_in_login: "octocat",
    });
    await s.app.close();
  });

  it("treats a used or expired code as expired", async () => {
    const s = await signInApp();
    const { state, cookie } = await start(s.app, "github");
    s.ctx.http = providers({ "https://github.com/login/oauth/access_token": { body: { error: "bad_verification_code" } } }).http;
    expect(noticeOf(await callback(s.app, "github", `code=abc&state=${state}`, cookie))).toBe("expired.github");
    await s.app.close();
  });
});

describe("the development stub and cookies in a deployed environment", () => {
  it("has no stub and uses a __Host- cookie", async () => {
    const { app } = await signInApp({ secure: true });
    expect((await app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload: { name: "X", email: "x@example.com" } })).statusCode).toBe(404);
    const r = await app.inject({ method: "GET", url: "/api/auth/google/start" });
    expect(String(r.headers["set-cookie"])).toMatch(/^__Host-gitilizer_oauth=.*; Path=\/; HttpOnly; Secure; SameSite=Lax/);
    expect(r.headers["strict-transport-security"]).toBe("max-age=31536000; includeSubDomains");
    await app.close();
  });

  it("builds the provider URL from PUBLIC_URL", async () => {
    const { ctx } = await makeCtx({ publicUrl: "https://dev.gitilizer.com" });
    const url = new URL(authorizeUrl(ctx, "github", { clientId: "id", clientSecret: "s" }, "st", "v", "n"));
    expect(url.searchParams.get("redirect_uri")).toBe("https://dev.gitilizer.com/api/auth/github/callback");
  });
});

// --- The web app and the health check ---

describe("serving the web app", () => {
  it("serves the built app, sends app routes to index.html, and keeps API 404s as JSON", async () => {
    const dir = webDir();
    const { ctx } = await makeCtx({ webDir: dir, secure: true });
    const app = buildApp(ctx, new Scheduler(ctx), null);
    const cookie = await sessionCookie(ctx, true);
    const route = await app.inject({ method: "GET", url: "/settings?x=1", headers: { cookie } });
    expect(route.statusCode).toBe(200);
    expect(route.body).toContain("<div id=root>");
    expect(route.headers["cache-control"]).toBe("private, no-cache");
    expect(route.headers.vary).toBe("Cookie");
    expect(route.headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    const asset = await app.inject({ method: "GET", url: "/assets/index-abc123.js" });
    expect(asset.headers["cache-control"]).toBe("public, max-age=31536000, immutable");
    expect((await app.inject({ method: "GET", url: "/assets/missing.js" })).statusCode).toBe(404);
    const api = await app.inject({ method: "GET", url: "/api/nope", headers: { cookie: "" } });
    expect(api.statusCode).toBe(401); // unknown API routes still need a session before anything else
    await app.close();
  });

  it("still sends /docs to the user guide, without a session (FOOT-3)", async () => {
    const { ctx } = await makeCtx();
    const app = buildApp(ctx, new Scheduler(ctx), null);
    expect((await app.inject({ method: "GET", url: "/docs" })).headers.location)
      .toBe("https://github.com/brianquinlan/gitilizer/blob/main/docs/user-guide.md");
    await app.close();
  });

  it("answers the health check without a session", async () => {
    const { ctx } = await makeCtx();
    const app = buildApp(ctx, new Scheduler(ctx), null);
    const r = await app.inject({ method: "GET", url: "/api/health" });
    expect(r.statusCode).toBe(200);
    expect(r.json()).toEqual({ ok: true });
    expect(r.headers["cache-control"]).toBe("no-store");
    await app.close();
  });
});

// --- The home page and the privacy policy (PRD "Home page", PRIV-6; design: Public pages) ---

/** Every address a page makes the browser load: stylesheets, scripts, images and icons. */
const loads = (html: string) =>
  [...html.matchAll(/<(?:link|script|img)\b[^>]*?(?:href|src)="([^"]+)"/g)].map((m) => m[1]);

describe("the home page and the privacy policy", () => {
  it("shows the home page at / to a visitor who isn't signed in, as finished HTML (HOME-1, HOME-2, HOME-4)", async () => {
    const { ctx, app } = await signInApp({ webDir: webDir(), secure: true });
    const r = await app.inject({ method: "GET", url: "/" });
    expect(r.statusCode).toBe(200);
    expect(r.headers["content-type"]).toBe("text/html; charset=utf-8");
    expect(r.body).toContain("<title>Gitilizer: your GitHub issues and PRs, prioritized</title>");
    expect(r.body).toContain("Less triage.<br>More shipping.");
    expect(r.body).toContain("How it works");
    expect(r.body).toContain("What Gitilizer uses, and why");
    expect(r.body).toContain('<a href="/docs/privacy">Read the privacy policy →</a>');
    expect(r.body).not.toContain("<div id=root>");
    expect(r.body).not.toMatch(/<script/);
    // The preview's ten rows, each with its next step chip.
    expect(r.body.match(/class="next-step /g)).toHaveLength(10);
    // No cache may give one visitor's `/` to another (design: Public pages).
    expect(r.headers["cache-control"]).toBe("private, no-cache");
    expect(r.headers.vary).toBe("Cookie");
    expect(r.headers["content-security-policy"]).toContain("font-src 'self'");
    expect((await app.inject({ method: "HEAD", url: "/" })).statusCode).toBe(200);
    expect((await app.inject({ method: "GET", url: "/?utm_source=x" })).body).toContain("How it works");
    void ctx;
    await app.close();
  });

  it("starts signing in straight from the home page's buttons, back to / (HOME-3)", async () => {
    const { app } = await signInApp();
    const body = (await app.inject({ method: "GET", url: "/" })).body;
    expect(body).toContain('<a class="btn provider" href="/api/auth/google/start?next=%2F">');
    expect(body).toContain('<a class="btn provider dark" href="/api/auth/github/start?next=%2F">');
    const start = await app.inject({ method: "GET", url: "/api/auth/google/start?next=%2F" });
    expect(start.statusCode).toBe(302);
    await app.close();
  });

  it("disables a provider that isn't set up, or links to the development sign-in (HOME-3)", async () => {
    const off = await signInApp({ oauth: { google: { clientId: "g", clientSecret: "s" }, github: null } });
    const body = (await off.app.inject({ method: "GET", url: "/" })).body;
    expect(body).toContain('<span class="btn provider dark" aria-disabled="true">');
    await off.app.close();
    const dev = await signInApp({ oauth: { google: null, github: null }, devSignIn: true });
    const devBody = (await dev.app.inject({ method: "GET", url: "/" })).body;
    expect(devBody).toContain('<a class="btn provider" href="/?dev=google">');
    expect(devBody).toContain('<a class="btn provider dark" href="/?dev=github">');
    await dev.app.close();
  });

  it("gives a signed-in developer the web app at /, and local mode always (HOME-1)", async () => {
    const { ctx, app } = await signInApp({ webDir: webDir(), secure: true });
    const cookie = await sessionCookie(ctx, true);
    const r = await app.inject({ method: "GET", url: "/", headers: { cookie } });
    expect(r.body).toContain("<div id=root>");
    expect(r.headers["cache-control"]).toBe("private, no-cache");
    expect(r.headers.vary).toBe("Cookie");
    // An expired or unknown session is not signed in.
    expect((await app.inject({ method: "GET", url: "/", headers: { cookie: "__Host-gitilizer_session=nope" } })).body).toContain("How it works");
    await app.close();
    const local = await signInApp({ webDir: webDir(), localMode: true });
    expect((await local.app.inject({ method: "GET", url: "/" })).body).toContain("<div id=root>");
    await local.app.close();
  });

  it("shows the home page to an account taken off the development allowlist (HOME-1, NFR-12)", async () => {
    const { ctx, app } = await signInApp({ webDir: webDir(), allowlist: Allowlist.parse("google:someone@example.com") });
    const cookie = await sessionCookie(ctx, false);
    expect((await app.inject({ method: "GET", url: "/", headers: { cookie } })).body).toContain("How it works");
    await app.close();
  });

  it("shows the privacy policy at /docs/privacy, the same for everyone, without a redirect (PRIV-6, HOME-4)", async () => {
    const { ctx, app } = await signInApp({ secure: true });
    const r = await app.inject({ method: "GET", url: "/docs/privacy" });
    expect(r.statusCode).toBe(200);
    expect(r.headers["content-type"]).toBe("text/html; charset=utf-8");
    expect(r.headers["cache-control"]).toBe("no-cache");
    expect(r.body).toContain("<title>Privacy policy · Gitilizer</title>");
    expect(r.body).toContain("<h1>Gitilizer privacy policy</h1>");
    expect(r.body).toContain("<p>Last updated: November 20, 2026</p>");
    const cookie = await sessionCookie(ctx, true);
    expect((await app.inject({ method: "GET", url: "/docs/privacy", headers: { cookie } })).body).toBe(r.body);
    await app.close();
  });

  it("makes both pages load only gitilizer.com's own files, fonts included (HOME-7)", async () => {
    const { app } = await signInApp({ secure: true });
    for (const url of ["/", "/docs/privacy"]) {
      const r = await app.inject({ method: "GET", url });
      const files = loads(r.body);
      expect(files).toEqual(expect.arrayContaining(["/fonts/fonts.css", "/site.css", "/favicon.svg"]));
      for (const f of files) expect(f, `${url} loads ${f}`).toMatch(/^\/[^/]/);
      expect(r.headers["content-security-policy"]).not.toMatch(/googleapis|gstatic/);
    }
    await app.close();
  });

  it("renders the real privacy policy, which names its operator and Google's Limited Use terms (PRIV-6)", async () => {
    const markdown = readFileSync(join(ROOT, "docs", "privacy-policy.md"), "utf8");
    const html = privacyPage(markdown);
    expect(html).toContain("Brian Quinlan");
    expect(html).toContain('<a href="mailto:brian@sweetapp.com">brian@sweetapp.com</a>');
    expect(html).toContain("Limited Use requirements");
    expect(html).toMatch(/<h1>Gitilizer privacy policy<\/h1>\s*<p>Last updated: /);
    expect(html).not.toMatch(/fonts\.googleapis|Google Fonts/);
  });

  it("sends a signed-out visitor at another address to the home page, and back after signing in (NAV-10, HOME-3)", async () => {
    const { ctx, app } = await signInApp({ webDir: webDir() });
    const r = await app.inject({ method: "GET", url: "/icebox?page=2" });
    expect(r.statusCode).toBe(302);
    expect(r.headers.location).toBe("/?next=%2Ficebox%3Fpage%3D2");
    expect(r.headers["cache-control"]).toBe("private, no-cache");
    const home = (await app.inject({ method: "GET", url: "/?next=%2Ficebox%3Fpage%3D2" })).body;
    expect(home).toContain('href="/api/auth/google/start?next=%2Ficebox%3Fpage%3D2"');
    expect(home).toContain('href="/api/auth/github/start?next=%2Ficebox%3Fpage%3D2"');
    // Only addresses on this site are remembered.
    expect((await app.inject({ method: "GET", url: "/?next=%2F%2Fevil.example" })).body).toContain('href="/api/auth/google/start?next=%2F"');
    // Signed in by now (another tab): straight there.
    const cookie = await sessionCookie(ctx, false);
    const back = await app.inject({ method: "GET", url: "/?next=%2Ficebox", headers: { cookie } });
    expect(back.statusCode).toBe(302);
    expect(back.headers.location).toBe("/icebox");
    await app.close();
  });

  it("sends the old sign-in page's address to the home page (AUTH-4, NAV-3)", async () => {
    const { app } = await signInApp();
    expect((await app.inject({ method: "GET", url: "/sign-in" })).headers.location).toBe("/");
    expect((await app.inject({ method: "GET", url: "/sign-in?next=%2Fsettings" })).headers.location).toBe("/?next=%2Fsettings");
    await app.close();
  });

  it("shows a failed sign-in's notice once, grey when cancelled and red otherwise (AUTH-10, AUTH-13, AUTH-15)", async () => {
    const { app } = await signInApp();
    const get = (cookie: string) => app.inject({ method: "GET", url: "/", headers: { cookie } });
    const cancelled = await get("gitilizer_signin_notice=cancelled.google");
    expect(cancelled.body).toContain('<div class="notice" role="alert">Sign-in was cancelled. Choose an option below to try again.</div>');
    // The cookie is cleared, so a reload shows the plain page.
    expect(String(cancelled.headers["set-cookie"])).toMatch(/^gitilizer_signin_notice=; Max-Age=0/);
    const unavailable = await get("gitilizer_signin_notice=provider_unavailable.github");
    expect(unavailable.body).toContain('<div class="notice error" role="alert">GitHub isn&#39;t responding right now. Try again in a few minutes.</div>');
    expect((await get("gitilizer_signin_notice=whatever")).body).toContain("Something went wrong on our side.");
    expect((await get("")).body).not.toContain('class="notice');
    await app.close();
  });

  it("tells a developer taken off the allowlist why, on the home page (AUTH-10, NFR-12)", async () => {
    const { ctx, app } = await signInApp({ allowlist: Allowlist.parse("google:someone@example.com") });
    const cookie = await sessionCookie(ctx, false);
    const r = await app.inject({ method: "GET", url: "/api/me", headers: { cookie } });
    expect(r.statusCode).toBe(401);
    expect(String(r.headers["set-cookie"])).toContain("gitilizer_signin_notice=not_allowed;");
    await app.close();
  });

  it("signs in with the development form on the home page, on a developer's computer only (HOME-3)", async () => {
    const { ctx, app } = await signInApp({ oauth: { google: null, github: null }, devSignIn: true, webDir: webDir() });
    const page = (await app.inject({ method: "GET", url: "/?dev=github&next=%2Fsettings" })).body;
    expect(page).toContain('<form class="dev-form" method="post" action="/api/auth/dev/form">');
    expect(page).toContain('name="login"');
    expect(page).toContain('<input type="hidden" name="next" value="/settings">');
    // An ordinary form post: no CSRF header, a redirect like a provider's callback.
    const r = await app.inject({
      method: "POST", url: "/api/auth/dev/form", headers: { "content-type": "application/x-www-form-urlencoded" },
      payload: "provider=github&name=Maya&email=maya%40example.com&login=maya&next=%2Fsettings",
    });
    expect(r.statusCode).toBe(302);
    expect(r.headers.location).toBe("/settings");
    const cookie = String(r.headers["set-cookie"]).split(";")[0];
    expect((await app.inject({ method: "GET", url: "/settings", headers: { cookie } })).body).toContain("<div id=root>");
    const u = await ctx.db.one(`select provider, sign_in_login from users where email = 'maya@example.com'`);
    expect(u).toMatchObject({ provider: "github", sign_in_login: "maya" });
    await app.close();
    // Not on a deployed server: no form, and no route for it.
    const deployed = await signInApp({ secure: true });
    expect((await deployed.app.inject({ method: "GET", url: "/?dev=google" })).body).not.toContain("dev-form");
    const post = await deployed.app.inject({
      method: "POST", url: "/api/auth/dev/form", headers: { "content-type": "application/x-www-form-urlencoded" }, payload: "provider=google",
    });
    expect(post.statusCode).toBe(403);
    await deployed.app.close();
  });

  it("refuses the development form for an account the allowlist leaves out, with the notice (AUTH-10)", async () => {
    const { app } = await signInApp({ oauth: { google: null, github: null }, devSignIn: true, allowlist: Allowlist.parse("google:someone@example.com") });
    const r = await app.inject({
      method: "POST", url: "/api/auth/dev/form", headers: { "content-type": "application/x-www-form-urlencoded" },
      payload: "provider=google&name=Kim&email=kim%40example.com&next=%2F",
    });
    expect(r.headers.location).toBe("/");
    expect(String(r.headers["set-cookie"])).toContain("gitilizer_signin_notice=not_allowed.google");
    await app.close();
  });

  it("escapes what it puts into HTML", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  });
});

// --- Several processes (design: Hosting on Google Cloud) ---

const until = async (check: () => Promise<boolean>, ms = 5000) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (await check()) return true;
    await new Promise((r) => setTimeout(r, 25));
  }
  return false;
};

describe("sharing the scheduler's work", () => {
  it("keeps presence in the database, so any process sees it (SCAN-5)", async () => {
    const { ctx } = await makeCtx({ autoScan: false });
    await addUser(ctx);
    const a = new Scheduler(ctx);
    const b = new Scheduler(ctx);
    expect(await b.state("u1")).toBe("away");
    await a.report("u1", "tab-1", false);
    expect(await b.state("u1")).toBe("open");
    await a.report("u1", "tab-2", true);
    expect(await b.state("u1")).toBe("visible");
    await a.report("u1", "tab-2", false);
    expect(await b.state("u1")).toBe("open");
    await ctx.db.query(`update presence set at = now() - interval '2 minutes'`);
    expect(await b.state("u1")).toBe("away");
  });

  it("hands Sync now from an API-only process to a scanner process (SCAN-4)", async () => {
    const { ctx } = await makeCtx();
    await addUser(ctx);
    const api = new Scheduler({ ...ctx, config: { ...ctx.config, scheduler: false } });
    const scanner = new Scheduler(ctx);
    api.trigger("u1", "manual");
    expect(await until(async () => Boolean(await ctx.db.one(`select 1 from scan_requests`)))).toBe(true);
    expect(await ctx.db.one(`select count(*)::int as n from scans`)).toEqual({ n: 0 }); // the API process doesn't scan
    await scanner.tick();
    expect(await until(async () => Boolean(await ctx.db.one(`select 1 from scans where outcome = 'ok' and trigger = 'manual'`)))).toBe(true);
    expect(await ctx.db.one(`select count(*)::int as n from scan_requests`)).toEqual({ n: 0 });
  });

  it("follows a full scan that started before Settings were saved with another, but lets Sync now join it (SET-37, SCAN-4)", async () => {
    const { ctx } = await makeCtx();
    await addUser(ctx);
    const scanner = new Scheduler(ctx);
    // A full scan is already running (in another process, say), started before the save.
    await ctx.db.query(`insert into scans (user_id, trigger, kind) values ('u1', 'schedule:visible', 'full')`);
    scanner.trigger("u1", "manual");
    await new Promise((r) => setTimeout(r, 500));
    expect(await ctx.db.one(`select count(*)::int as n from scan_requests`)).toEqual({ n: 0 }); // joined
    scanner.trigger("u1", "settings");
    expect(await until(async () => Boolean(await ctx.db.one(
      `select 1 from scan_requests where trigger = 'settings' and not_before > now() + interval '5 seconds'`,
    )))).toBe(true);
  });

  it("keeps a full-scan request over a scheduled one, and only one per developer", async () => {
    const { ctx } = await makeCtx();
    await addUser(ctx);
    const api = new Scheduler({ ...ctx, config: { ...ctx.config, scheduler: false } });
    api.trigger("u1", "schedule:open");
    await until(async () => Boolean(await ctx.db.one(`select 1 from scan_requests`)));
    api.trigger("u1", "settings");
    await until(async () => (await ctx.db.one(`select trigger from scan_requests`))?.trigger === "settings");
    api.trigger("u1", "visible");
    await new Promise((r) => setTimeout(r, 100));
    expect(await ctx.db.query(`select trigger from scan_requests`)).toEqual([{ trigger: "settings" }]);
  });

  it("runs the periodic pass in one process at a time, and hands it over when that process stops", async () => {
    const { ctx } = await makeCtx({ autoScan: false });
    const a = new Scheduler(ctx);
    const b = new Scheduler(ctx);
    await a.tick();
    await b.tick();
    expect(await ctx.db.one(`select holder from leases where name = 'scheduler'`)).toEqual({ holder: a.id });
    await a.stop();
    await b.tick();
    expect(await ctx.db.one(`select holder from leases where name = 'scheduler'`)).toEqual({ holder: b.id });
  });
});
