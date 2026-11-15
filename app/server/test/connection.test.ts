// Connecting GitHub with the Gitilizer app (design: GitHub connection; PRD SET-42 to SET-47, WEL-6).
import { generateKeyPairSync } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { CATALOGUE } from "@gitilizer/shared";
import { buildApp } from "../src/app.ts";
import { connectionDetails, connectionMethod, getGitHubToken, saveAppConnection } from "../src/connection.ts";
import type { Ctx, GitHubAppConfig } from "../src/context.ts";
import { loadConfig } from "../src/main.ts";
import { classify } from "../src/github/octokit.ts";
import { GitHubProblem } from "../src/github/types.ts";
import { shownNotifications } from "../src/notify.ts";
import { reportGitHubProblem, scan } from "../src/scanner.ts";
import { Scheduler } from "../src/scheduler.ts";
import { addUser, makeCtx } from "./helpers.ts";

const APP: GitHubAppConfig = { clientId: "Iv1.app", clientSecret: "app-secret", slug: "gitilizer", appId: null, privateKey: null };

/** GitHub's side of the app: the token endpoint with refresh tokens that work once, and what is installed. */
class FakeGitHubApp {
  n = 0;
  refreshes = 0;
  calls: { url: string; auth: string | null; body: URLSearchParams | null }[] = [];
  valid = new Set<string>(); // refresh tokens that still work
  access = new Set<string>(); // access tokens that still work
  installations: any[] = [];
  requests: any[] = [];
  revoked = false;
  slowMs = 0;

  private issue() {
    this.n++;
    const t = { access_token: `ghu_${this.n}`, expires_in: 28800, refresh_token: `ghr_${this.n}`, refresh_token_expires_in: 15897600, token_type: "bearer" };
    this.access.clear(); // renewing ends the access token before it
    this.access.add(t.access_token);
    this.valid.add(t.refresh_token);
    return t;
  }

  http: typeof fetch = async (input, init) => {
    const url = String(input);
    const auth = new Headers(init?.headers).get("authorization");
    const body = init?.body instanceof URLSearchParams ? init.body : null;
    this.calls.push({ url, auth, body });
    const json = (status: number, data: unknown) => new Response(status === 204 ? null : JSON.stringify(data), { status });
    const bearer = auth?.replace(/^Bearer /, "") ?? "";
    if (url === "https://github.com/login/oauth/access_token") {
      if (this.slowMs) await new Promise((r) => setTimeout(r, this.slowMs));
      if (body?.get("client_secret") !== APP.clientSecret) return json(200, { error: "incorrect_client_credentials" });
      if (body.get("grant_type") === "refresh_token") {
        this.refreshes++;
        const used = body.get("refresh_token")!;
        if (this.revoked || !this.valid.delete(used)) return json(200, { error: "bad_refresh_token" });
        return json(200, this.issue());
      }
      return body.get("code") === "good-code" && body.get("code_verifier") ? json(200, this.issue()) : json(200, { error: "bad_verification_code" });
    }
    if (url === "https://api.github.com/app/installation-requests?per_page=100") return json(200, this.requests);
    if (url.startsWith("https://api.github.com/applications/")) { this.revoked = true; return json(204, null); }
    if (!this.access.has(bearer)) return json(401, { message: "Bad credentials" });
    if (url === "https://api.github.com/user") return json(200, { login: "octo", id: 42 });
    if (url === "https://api.github.com/user/installations?per_page=100") return json(200, { installations: this.installations });
    const repos = /installations\/(\d+)\/repositories/.exec(url);
    if (repos) return json(200, { total_count: 3 });
    return json(404, { message: "Not Found" });
  };
}

async function setup(over: Partial<GitHubAppConfig> | null = {}) {
  const gh = new FakeGitHubApp();
  const { ctx, hub } = await makeCtx({ githubMode: "real", githubApp: over === null ? null : { ...APP, ...over } });
  ctx.http = gh.http;
  const app = buildApp(ctx, new Scheduler(ctx), null);
  let cookies: Record<string, string> = {};
  const call = async (method: string, url: string, payload?: unknown) => {
    const r = await app.inject({
      method: method as any, url, payload: payload as any,
      headers: { "x-gitilizer": "1", cookie: Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join("; ") },
    });
    for (const c of [r.headers["set-cookie"] ?? []].flat()) {
      const [k, v] = String(c).split(";")[0].split("=");
      if (v) cookies[k] = v; else delete cookies[k];
    }
    return r;
  };
  const signIn = async (name = "Maya") => {
    cookies = {};
    await call("POST", "/api/auth/dev", { name, email: `${name.toLowerCase()}@example.com` });
    return (await call("GET", "/api/me")).json().user.id as string;
  };
  /** Goes to GitHub and back, as the browser would. Returns where the callback sent the developer. */
  const connect = async (next: string, answer: Record<string, string> = { code: "good-code" }) => {
    const start = await call("GET", `/api/connect/github/start?next=${encodeURIComponent(next)}`);
    expect(start.statusCode).toBe(302);
    const to = new URL(String(start.headers.location));
    const q = new URLSearchParams({ state: to.searchParams.get("state")!, ...answer });
    return { to, back: await call("GET", `/api/connect/github/callback?${q}`) };
  };
  const kinds = async () => (await ctx.db.query(`select kind from credentials order by kind`)).map((r) => r.kind);
  return { gh, ctx, hub, app, call, signIn, connect, kinds, cookies: () => cookies, setCookies: (c: Record<string, string>) => { cookies = c; } };
}

const expireAccess = (ctx: Ctx) => ctx.db.query(`update credentials set expires_at = now() - interval '1 minute' where kind = 'github_app'`);

describe("Connect GitHub (SET-43)", () => {
  it("sends the developer to GitHub's authorization page for the app, with PKCE and a state", async () => {
    const t = await setup();
    await t.signIn();
    const { to } = await t.connect("/settings#connections");
    expect(`${to.origin}${to.pathname}`).toBe("https://github.com/login/oauth/authorize");
    expect(to.searchParams.get("client_id")).toBe(APP.clientId);
    expect(to.searchParams.get("redirect_uri")).toBe("http://localhost:8787/api/connect/github/callback");
    expect(to.searchParams.get("code_challenge_method")).toBe("S256");
    expect(to.searchParams.get("code_challenge")).toBeTruthy();
    // No scope: what the app may read is set on the app itself (SET-44).
    expect(to.searchParams.has("scope")).toBe(false);
  });

  it("needs a session, and an app to connect with", async () => {
    const t = await setup();
    expect((await t.call("GET", "/api/connect/github/start")).statusCode).toBe(401);
    const none = await setup(null);
    await none.signIn();
    expect((await none.call("GET", "/api/connect/github/start")).statusCode).toBe(404);
    expect((await none.call("GET", "/api/me")).json().github).toMatchObject({ app: false, method: null, installUrl: null });
  });

  it("saves the connection when GitHub returns, deletes a saved token, and goes back where it started (SET-42, Q-88)", async () => {
    const t = await setup();
    const userId = await t.signIn();
    await t.call("PUT", "/api/settings", { additionalRepos: [], collaborators: [], customPrompt: null, rerank: false, credentials: { github_pat: "ghp_old", gemini_key: "AIza-x" } });
    expect(await t.kinds()).toEqual(["gemini_key", "github_pat"]);
    expect((await t.call("GET", "/api/me")).json().github).toMatchObject({ method: "pat", app: true, installUrl: "https://github.com/apps/gitilizer/installations/new" });

    const { back } = await t.connect("/settings#connections");
    expect(back.statusCode).toBe(302);
    expect(back.headers.location).toBe("/settings#connections");
    expect(await t.kinds()).toEqual(["gemini_key", "github_app"]);
    const me = (await t.call("GET", "/api/me")).json();
    // The connection is to the account that approved, whichever account signed in (AUTH-5).
    expect(me.github).toMatchObject({ method: "app", chip: "connected", avatarUrl: "https://avatars.githubusercontent.com/u/42?s=64" });
    expect(me.credentials.github_pat.set).toBe(false);
    // Stored encrypted, the refresh token too (PRIV-1).
    const row = await t.ctx.db.one(`select ciphertext, refresh_ciphertext, expires_at, refresh_expires_at, account_id from credentials where kind = 'github_app'`);
    expect(Number(row.account_id)).toBe(42);
    expect(Buffer.from(row.ciphertext).toString()).not.toContain("ghu_");
    expect(Buffer.from(row.refresh_ciphertext).toString()).not.toContain("ghr_");
    expect(new Date(row.refresh_expires_at).getTime()).toBeGreaterThan(Date.now() + 150 * 86400_000);
    expect(await getGitHubToken(t.ctx, userId)).toEqual({ token: "ghu_1", method: "app" });
  });

  it("completes nothing on Warm Welcome by itself: Save still needs the agent's key, but no token (WEL-4)", async () => {
    const t = await setup();
    await t.signIn();
    const { back } = await t.connect("/");
    expect(back.headers.location).toBe("/");
    expect((await t.call("GET", "/api/me")).json()).toMatchObject({ screen: "welcome", github: { method: "app" } });
    expect((await t.call("POST", "/api/setup", { credentials: {} })).statusCode).toBe(422);
    const r = await t.call("POST", "/api/setup", { credentials: { gemini_key: "AIza-x" }, rankingAgent: "gemini" });
    expect(r.json()).toEqual({ ok: true, results: { gemini_key: { ok: true, code: "ok" } } });
    expect((await t.call("GET", "/api/me")).json().screen).toBe("app");
    expect(await t.kinds()).toEqual(["gemini_key", "github_app"]);
  });

  it("returns with ?connect=cancelled when the developer cancels on GitHub, and nothing changes", async () => {
    const t = await setup();
    await t.signIn();
    const { back } = await t.connect("/settings#connections", { error: "access_denied" });
    expect(back.headers.location).toBe("/settings?connect=cancelled#connections");
    expect(await t.kinds()).toEqual([]);
  });

  it("returns with ?connect=failed for a refused code, a state that isn't this browser's, or one used twice", async () => {
    const t = await setup();
    await t.signIn();
    expect((await t.connect("/", { code: "bad-code" })).back.headers.location).toBe("/?connect=failed");

    // A state the browser doesn't hold a cookie for.
    const start = await t.call("GET", "/api/connect/github/start?next=/settings");
    const state = new URL(String(start.headers.location)).searchParams.get("state")!;
    const mine = t.cookies();
    t.setCookies(Object.fromEntries(Object.entries(mine).filter(([k]) => !k.includes("connect"))));
    expect((await t.call("GET", `/api/connect/github/callback?state=${state}&code=good-code`)).headers.location).toBe("/settings?connect=failed");
    // It was used up by that attempt.
    t.setCookies(mine);
    expect((await t.call("GET", `/api/connect/github/callback?state=${state}&code=good-code`)).headers.location).toMatch(/connect=failed/);
    expect(await t.kinds()).toEqual([]);
  });

  it("refuses a state that another account started", async () => {
    const t = await setup();
    await t.signIn("Maya");
    const start = await t.call("GET", "/api/connect/github/start?next=/settings");
    const state = new URL(String(start.headers.location)).searchParams.get("state")!;
    const connectCookie = Object.entries(t.cookies()).find(([k]) => k.includes("connect"))!;
    await t.signIn("Sam");
    t.setCookies({ ...t.cookies(), [connectCookie[0]]: connectCookie[1] });
    const back = await t.call("GET", `/api/connect/github/callback?state=${state}&code=good-code`);
    expect(back.headers.location).toMatch(/connect=failed/);
    expect(await t.kinds()).toEqual([]);
  });

  it("is replaced, and deleted, when a token is saved (SET-42)", async () => {
    const t = await setup();
    await t.signIn();
    await t.connect("/settings");
    await t.call("PUT", "/api/settings", { additionalRepos: [], collaborators: [], customPrompt: null, rerank: false, credentials: { github_pat: "ghp_new", gemini_key: "AIza-x" } });
    expect(await t.kinds()).toEqual(["gemini_key", "github_pat"]);
    expect((await t.call("GET", "/api/me")).json().github.method).toBe("pat");
  });

  it("clears the notifications about the GitHub connection (NOTIF-13)", async () => {
    const t = await setup();
    const userId = await t.signIn();
    await t.call("POST", "/api/setup", { credentials: { github_pat: "ghp_x", gemini_key: "AIza-x" } });
    const { raise } = await import("../src/notify.ts");
    await raise(t.ctx, userId, "github_expired");
    expect((await t.call("GET", "/api/me")).json().github.chip).toBe("not_working");
    await t.connect("/settings");
    expect((await shownNotifications(t.ctx, userId)).map((n) => n.code)).not.toContain("github_expired");
    expect((await t.call("GET", "/api/me")).json().github.chip).toBe("connected");
  });

  it("has a stand-in with fixtures, so the interface can be tried without GitHub", async () => {
    const { ctx } = await makeCtx();
    const app = buildApp(ctx, new Scheduler(ctx), null);
    const r = await app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload: { name: "Ana", email: "ana@example.com" } });
    const headers = { "x-gitilizer": "1", cookie: String(r.headers["set-cookie"]).split(";")[0] };
    const back = await app.inject({ method: "GET", url: "/api/connect/github/start?next=/", headers });
    expect(back.headers.location).toBe("/");
    expect((await app.inject({ method: "GET", url: "/api/me", headers })).json().github).toMatchObject({ method: "app", login: "brianquinlan", app: true });
    const card = (await app.inject({ method: "GET", url: "/api/github/connection", headers })).json();
    expect(card.installations).toEqual([{ account: "brianquinlan", accountType: "User", avatarUrl: null, selection: "all", repoCount: null, missing: [] }]);
  });
});

describe("the app's token renews itself (SET-46)", () => {
  let t: Awaited<ReturnType<typeof setup>>;
  let userId: string;
  beforeEach(async () => {
    t = await setup();
    userId = await t.signIn();
    await t.connect("/settings");
  });

  it("uses the stored token while it is current, and renews it shortly before it expires", async () => {
    expect((await getGitHubToken(t.ctx, userId))?.token).toBe("ghu_1");
    expect(t.gh.refreshes).toBe(0);
    await expireAccess(t.ctx);
    expect((await getGitHubToken(t.ctx, userId))?.token).toBe("ghu_2");
    expect((await getGitHubToken(t.ctx, userId))?.token).toBe("ghu_2");
    expect(t.gh.refreshes).toBe(1);
    // The refresh token rotated with it: the next renewal uses the new one.
    await expireAccess(t.ctx);
    expect((await getGitHubToken(t.ctx, userId))?.token).toBe("ghu_3");
  });

  it("renews once when several callers need it at the same time", async () => {
    await expireAccess(t.ctx);
    t.gh.slowMs = 20;
    const all = await Promise.all(Array.from({ length: 5 }, () => getGitHubToken(t.ctx, userId)));
    expect(new Set(all.map((c) => c?.token))).toEqual(new Set(["ghu_2"]));
    expect(t.gh.refreshes).toBe(1);
  });

  it("renews a token GitHub refused, unless another process already has", async () => {
    // Another process renewed: the stored token is no longer the refused one, so it is taken as it is.
    await expireAccess(t.ctx);
    await getGitHubToken(t.ctx, userId);
    expect(await getGitHubToken(t.ctx, userId, { stale: "ghu_1" })).toEqual({ token: "ghu_2", method: "app" });
    expect(t.gh.refreshes).toBe(1);
    // The stored token itself was refused: renew, whatever its expiry says.
    expect(await getGitHubToken(t.ctx, userId, { stale: "ghu_2" })).toEqual({ token: "ghu_3", method: "app" });
    expect(t.gh.refreshes).toBe(2);
  });

  it("ends when GitHub won't renew it: scanning pauses with the error, and reconnecting clears it", async () => {
    await t.call("POST", "/api/setup", { credentials: { gemini_key: "AIza-x" } });
    t.gh.revoked = true;
    await expireAccess(t.ctx);
    await expect(getGitHubToken(t.ctx, userId)).rejects.toMatchObject({ code: "connection_ended" });
    // Later scans don't ask GitHub again.
    const asked = t.gh.refreshes;
    expect(await scan(t.ctx, userId, "manual")).toMatchObject({ outcome: "error", errorCode: "connection_ended" });
    expect(t.gh.refreshes).toBe(asked);
    const notes = await shownNotifications(t.ctx, userId);
    expect(notes.map((n) => n.code)).toEqual(["github_connection_ended"]);
    expect(CATALOGUE[notes[0].code].heading(notes[0].params)).toBe("Your GitHub connection has ended");
    expect((await t.call("GET", "/api/me")).json().github).toMatchObject({ method: "app", chip: "not_working" });
    expect((await t.call("GET", "/api/github/connection")).json()).toMatchObject({ method: "app", ended: true, installations: [] });

    t.gh.revoked = false;
    await t.connect("/settings#connections");
    expect(await shownNotifications(t.ctx, userId)).toEqual([]);
    expect((await t.call("GET", "/api/me")).json().github.chip).toBe("connected");
  });

  it("says GitHub is unavailable, not that the connection ended, when GitHub can't be reached to renew", async () => {
    await expireAccess(t.ctx);
    t.ctx.http = async () => new Response("oops", { status: 502 });
    await expect(getGitHubToken(t.ctx, userId)).rejects.toMatchObject({ code: "unavailable" });
    t.ctx.http = t.gh.http;
    expect((await getGitHubToken(t.ctx, userId))?.token).toBe("ghu_2");
  });

  it("shows no expiry warning for the app's token (NOTIF-22)", async () => {
    await t.call("POST", "/api/setup", { credentials: { gemini_key: "AIza-x" } });
    expect(await scan(t.ctx, userId, "manual")).toMatchObject({ outcome: "ok" });
    expect((await shownNotifications(t.ctx, userId)).map((n) => n.code)).not.toContain("github_expiring");
    // The scan leaves the app's own expiry alone: it is when to renew, not something to warn about.
    expect((await t.ctx.db.one(`select expires_at > now() + interval '7 hours' as later from credentials where kind = 'github_app'`)).later).toBe(true);
  });

  it("asks GitHub to revoke the authorization when the account is deleted (PRIV-3)", async () => {
    await t.call("DELETE", "/api/account", { confirm: true });
    expect(t.gh.revoked).toBe(true);
    const revoke = t.gh.calls.find((c) => c.url.includes("/applications/"))!;
    expect(revoke.url).toBe(`https://api.github.com/applications/${APP.clientId}/grant`);
    expect(revoke.auth).toMatch(/^Basic /);
  });
});

describe("scanning with the app's token", () => {
  it("renews and tries once more when GitHub refuses the token mid-scan", async () => {
    const t = await setup();
    const userId = await t.signIn();
    await t.connect("/");
    await t.call("POST", "/api/setup", { credentials: { gemini_key: "AIza-x" } });
    const fixtures = t.ctx.github;
    const used: string[] = [];
    t.ctx.github = (token) => {
      used.push(token);
      const real = fixtures(token);
      if (token !== "ghu_1") return real;
      return new Proxy(real, { get: (o, k) => (k === "viewer" ? async () => { throw new GitHubProblem("invalid", "Bad credentials", { status: 401 }); } : (o as any)[k]) });
    };
    expect(await scan(t.ctx, userId, "manual")).toMatchObject({ outcome: "ok" });
    expect(used.slice(0, 2)).toEqual(["ghu_1", "ghu_2"]);
    expect(await shownNotifications(t.ctx, userId)).toEqual([]);
  });

  it("reports a token GitHub keeps refusing as the connection having ended, not as a bad token", async () => {
    const t = await setup();
    const userId = await t.signIn();
    await t.connect("/");
    await t.call("POST", "/api/setup", { credentials: { gemini_key: "AIza-x" } });
    const fixtures = t.ctx.github;
    t.ctx.github = (token) => new Proxy(fixtures(token), { get: (o, k) => (k === "viewer" ? async () => { throw new GitHubProblem("invalid", "Bad credentials", { status: 401 }); } : (o as any)[k]) });
    expect(await scan(t.ctx, userId, "manual")).toMatchObject({ outcome: "error" });
    expect((await shownNotifications(t.ctx, userId)).map((n) => n.code)).toEqual(["github_connection_ended"]);
  });

  it("raises none of the token's messages for a missing permission or single sign-on (SET-47, SET-49)", async () => {
    const { ctx } = await makeCtx();
    await addUser(ctx);
    for (const code of ["permission", "sso", "org_blocks_token"] as const) {
      await reportGitHubProblem(ctx, "u1", new GitHubProblem(code, "x", { org: "acme" }), "app");
    }
    expect(await shownNotifications(ctx, "u1")).toEqual([]);
    await reportGitHubProblem(ctx, "u1", new GitHubProblem("sso", "x", { org: "acme" }), "pat");
    expect((await shownNotifications(ctx, "u1")).map((n) => n.code)).toEqual(["github_sso_required"]);
  });

  it("treats 'Resource not accessible by integration' as a missing permission", () => {
    const p = classify({ status: 403, response: { headers: {}, data: { message: "Resource not accessible by integration" } } });
    expect(p.code).toBe("permission");
  });
});

describe("what Gitilizer can read (SET-45, SET-47)", () => {
  const ORG = { id: 7, account: { login: "acme", type: "Organization", avatar_url: "https://a/acme" }, repository_selection: "selected", permissions: { issues: "read", metadata: "read" } };
  const SELF = { id: 5, account: { login: "octo", type: "User", avatar_url: "https://a/octo" }, repository_selection: "all", permissions: { issues: "read", pull_requests: "read", metadata: "read" } };

  it("lists the accounts where the app is installed, and warns about a permission one hasn't approved", async () => {
    const t = await setup();
    const userId = await t.signIn();
    await t.connect("/settings");
    t.gh.installations = [SELF, ORG];
    const card = (await t.call("GET", "/api/github/connection")).json();
    expect(card).toMatchObject({ method: "app", login: "octo", ended: false, app: true, installUrl: "https://github.com/apps/gitilizer/installations/new", pending: [] });
    expect(card.installations).toEqual([
      { account: "acme", accountType: "Organization", avatarUrl: "https://a/acme", selection: "selected", repoCount: 3, missing: ["pull_requests"] },
      { account: "octo", accountType: "User", avatarUrl: "https://a/octo", selection: "all", repoCount: null, missing: [] },
    ]);
    const notes = await shownNotifications(t.ctx, userId);
    expect(notes.map((n) => [n.code, CATALOGUE[n.code].severity, CATALOGUE[n.code].heading(n.params)]))
      .toEqual([["github_app_permission", "warning", "Gitilizer can't read pull requests in acme"]]);
    expect((await t.call("GET", "/api/me")).json().github.chip).toBe("needs_attention");

    // Approved on GitHub: the warning goes when Settings is opened again.
    t.gh.installations = [SELF, { ...ORG, permissions: { ...ORG.permissions, pull_requests: "read" } }];
    await t.call("GET", "/api/github/connection");
    expect(await shownNotifications(t.ctx, userId)).toEqual([]);
    expect((await t.call("GET", "/api/me")).json().github.chip).toBe("connected");
  });

  it("shows the account without the list when GitHub can't be reached", async () => {
    const t = await setup();
    await t.signIn();
    await t.connect("/settings");
    t.ctx.http = async () => { throw new Error("ECONNRESET"); };
    expect((await t.call("GET", "/api/github/connection")).json()).toMatchObject({ method: "app", login: "octo", ended: false, installations: [] });
  });

  it("shows organizations waiting for an owner's approval, when the app's ID and private key are set (Q-89)", async () => {
    const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    const t = await setup({ appId: "12345", privateKey: privateKey.export({ type: "pkcs8", format: "pem" }) as string });
    await t.signIn();
    await t.connect("/settings");
    t.gh.installations = [SELF];
    t.gh.requests = [
      { account: { login: "bigco", avatar_url: "https://a/bigco" }, requester: { login: "octo", id: 42 } },
      { account: { login: "elsewhere" }, requester: { login: "someone-else", id: 9 } },
      { account: { login: "octo" }, requester: { login: "octo", id: 42 } }, // installed since
    ];
    const card = (await t.call("GET", "/api/github/connection")).json();
    expect(card.pending).toEqual([{ account: "bigco", avatarUrl: "https://a/bigco" }]);
    // Asked as the app itself: a signed JWT, not the developer's token.
    const asked = t.gh.calls.find((c) => c.url.includes("/app/installation-requests"))!;
    expect(asked.auth!.split(".")).toHaveLength(3);
    expect(JSON.parse(Buffer.from(asked.auth!.replace("Bearer ", "").split(".")[1], "base64url").toString()).iss).toBe("12345");

    // Without them there are none to show, and GitHub isn't asked.
    const plain = await setup();
    await plain.signIn();
    await plain.connect("/settings");
    plain.gh.requests = t.gh.requests;
    expect((await plain.call("GET", "/api/github/connection")).json().pending).toEqual([]);
    expect(plain.gh.calls.some((c) => c.url.includes("/app/installation-requests"))).toBe(false);
  }, 20_000); // two databases and an RSA key: slow on a busy CI runner

  it("answers for a token, or for nothing connected, without asking GitHub", async () => {
    const t = await setup();
    const userId = await t.signIn();
    expect((await t.call("GET", "/api/github/connection")).json()).toMatchObject({ method: null, app: true, installations: [] });
    await addUser(t.ctx, "other");
    expect(await connectionDetails(t.ctx, "other")).toMatchObject({ method: "pat", ended: false });
    expect(await connectionMethod(t.ctx.db, userId)).toBeNull();
    expect(t.gh.calls).toEqual([]);
  });
});

describe("the app's settings", () => {
  it("are optional: without them only a token can be used", () => {
    expect(loadConfig({}, ["node", "main.ts"]).githubApp).toBeNull();
    expect(loadConfig({ GITHUB_APP_CLIENT_ID: "Iv1.x", GITHUB_APP_CLIENT_SECRET: "s" }, ["node", "main.ts"]).githubApp).toBeNull(); // no slug
    expect(loadConfig({ GITHUB_APP_CLIENT_ID: "Iv1.x", GITHUB_APP_CLIENT_SECRET: "s", GITHUB_APP_SLUG: "gitilizer-dev" }, ["node", "main.ts"]).githubApp)
      .toEqual({ clientId: "Iv1.x", clientSecret: "s", slug: "gitilizer-dev", appId: null, privateKey: null });
    // The app's public link, as GitHub shows it, stands for its URL name.
    for (const link of ["https://github.com/apps/gitilizer-dev", "https://github.com/apps/gitilizer-dev/", " gitilizer-dev "]) {
      expect(loadConfig({ GITHUB_APP_CLIENT_ID: "Iv1.x", GITHUB_APP_CLIENT_SECRET: "s", GITHUB_APP_SLUG: link }, ["node", "main.ts"]).githubApp?.slug)
        .toBe("gitilizer-dev");
    }
    const withKey = loadConfig({
      GITHUB_APP_CLIENT_ID: "Iv1.x", GITHUB_APP_CLIENT_SECRET: "s", GITHUB_APP_SLUG: "gitilizer", GITHUB_APP_ID: "99",
      GITHUB_APP_PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\\nabc\\n-----END PRIVATE KEY-----",
    }, ["node", "main.ts"]).githubApp;
    expect(withKey).toMatchObject({ appId: "99", privateKey: "-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----" });
  });
});

describe("a saved app connection", () => {
  it("is the one in use even if a token row is somehow there too", async () => {
    const { ctx } = await makeCtx();
    await addUser(ctx);
    await ctx.db.query(`delete from credentials where kind = 'github_pat'`);
    await saveAppConnection(ctx, "u1", { accessToken: "ghu_a", expiresIn: 28800, refreshToken: "ghr_a", refreshExpiresIn: 100 }, { login: "octo", id: 1 });
    const { ciphertext, nonce } = ctx.cipher.encrypt("u1", "ghp_stray");
    await ctx.db.query(`insert into credentials (user_id, kind, ciphertext, nonce) values ('u1', 'github_pat', $1, $2)`, [ciphertext, nonce]);
    expect(await getGitHubToken(ctx, "u1")).toEqual({ token: "ghu_a", method: "app" });
  });
});
