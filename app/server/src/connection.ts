// The developer's GitHub connection (design: GitHub connection; PRD SET-42 to SET-47): the Gitilizer app or a
// personal access token, one at a time. This file stores the app's connection, hands the scanner a token that
// works, renewing the app's when it is about to expire, and reads where the app is installed.
import { createSign } from "node:crypto";
import { APP_PERMISSION_LABEL, AppPermission, type GitHubConnection, type GitHubInstallation, type GitHubMethod, type NotificationCode } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import type { Db } from "./db.ts";
import { GitHubProblem } from "./github/types.ts";
import { log } from "./log.ts";
import { clear, raise } from "./notify.ts";

/** The credentials row that holds the app's connection. Not a CredentialKind: the developer never types it. */
const APP_KIND = "github_app";
const TOKEN_URL = "https://github.com/login/oauth/access_token";
const API = "https://api.github.com";
const TIMEOUT_MS = 10_000;
/** Renew a token that expires within this long, so a scan that starts now can finish with it. */
const RENEW_BEFORE_MS = 5 * 60_000;
/** The token fixture mode's stand-in for the app connects with. It never expires. */
export const FIXTURE_APP_TOKEN = "fixture-app-token";

/** Whether this environment offers the Gitilizer app. Fixture mode has a stand-in, so the interface can be tried. */
export const appAvailable = (ctx: Ctx) => ctx.config.githubMode === "fixtures" || Boolean(ctx.config.githubApp);

/** What GitHub's token endpoint answers for the app: an 8-hour access token and a 6-month refresh token. */
export type AppTokens = { accessToken: string; expiresIn: number | null; refreshToken: string | null; refreshExpiresIn: number | null };

export function tokensFrom(body: any): AppTokens | null {
  if (!body || typeof body.access_token !== "string" || !body.access_token) return null;
  return {
    accessToken: body.access_token,
    expiresIn: Number(body.expires_in) || null,
    refreshToken: typeof body.refresh_token === "string" && body.refresh_token ? body.refresh_token : null,
    refreshExpiresIn: Number(body.refresh_token_expires_in) || null,
  };
}

const headers = (token: string) => ({
  authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "user-agent": "gitilizer", "x-github-api-version": "2022-11-28",
});

/** A request to GitHub outside a scan. Unreachable, timed out or 5xx is GitHub being unavailable. */
async function call(ctx: Ctx, url: string, init: RequestInit): Promise<{ status: number; body: any }> {
  const http = ctx.http ?? fetch;
  let res: Response;
  try {
    res = await http(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (e) {
    throw new GitHubProblem("unavailable", String(e));
  }
  const text = await res.text().catch(() => "");
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { raw: text.slice(0, 300) }; }
  if (res.status >= 500) throw new GitHubProblem("unavailable", `GitHub answered ${res.status}`, { status: res.status });
  return { status: res.status, body };
}

/** The connection in use: the app's when there is one, otherwise a saved token (SET-42). */
export async function connectionMethod(db: Db, userId: string): Promise<GitHubMethod | null> {
  const rows = await db.query(`select kind from credentials where user_id = $1 and kind in ('github_pat', $2)`, [userId, APP_KIND]);
  return rows.some((r) => r.kind === APP_KIND) ? "app" : rows.length ? "pat" : null;
}

function writeTokens(ctx: Ctx, userId: string, t: AppTokens) {
  const access = ctx.cipher.encrypt(userId, t.accessToken);
  const refresh = t.refreshToken ? ctx.cipher.encrypt(userId, t.refreshToken) : null;
  return {
    params: [access.ciphertext, access.nonce, t.expiresIn, refresh?.ciphertext ?? null, refresh?.nonce ?? null, t.refreshExpiresIn],
    // $n placeholders for the six values above, starting at `from`.
    sql: (from: number) => ({
      ciphertext: `$${from}`, nonce: `$${from + 1}`,
      expires: `case when $${from + 2}::int is null then null else now() + make_interval(secs => $${from + 2}::int) end`,
      refreshCiphertext: `$${from + 3}`, refreshNonce: `$${from + 4}`,
      refreshExpires: `case when $${from + 5}::int is null then null else now() + make_interval(secs => $${from + 5}::int) end`,
    }),
  };
}

/**
 * Saves the app's connection and deletes a saved token: a developer has one connection, and the one that is
 * replaced isn't kept (SET-42, Q-88).
 */
export async function saveAppConnection(ctx: Ctx, userId: string, tokens: AppTokens, account: { login: string; id: number | null }) {
  const w = writeTokens(ctx, userId, tokens);
  const c = w.sql(3);
  await ctx.db.tx(async (t) => {
    await t.query(`delete from credentials where user_id = $1 and kind = 'github_pat'`, [userId]);
    await t.query(
      `insert into credentials (user_id, kind, ciphertext, nonce, expires_at, refresh_ciphertext, refresh_nonce, refresh_expires_at, token_login, token_type, account_id)
       values ($1, $2, ${c.ciphertext}, ${c.nonce}, ${c.expires}, ${c.refreshCiphertext}, ${c.refreshNonce}, ${c.refreshExpires}, $9, 'app', $10)
       on conflict (user_id, kind) do update set ciphertext = excluded.ciphertext, nonce = excluded.nonce, expires_at = excluded.expires_at,
         refresh_ciphertext = excluded.refresh_ciphertext, refresh_nonce = excluded.refresh_nonce, refresh_expires_at = excluded.refresh_expires_at,
         token_login = excluded.token_login, token_type = 'app', account_id = excluded.account_id, updated_at = now()`,
      [userId, APP_KIND, ...w.params, account.login, account.id],
    );
    await t.query(`update users set github_login = $2 where id = $1`, [userId, account.login]);
  });
}

/** Saving a token replaces the app's connection (SET-42). What GitHub issued is deleted, not kept. */
export async function removeAppConnection(db: Db, userId: string) {
  await db.query(`delete from credentials where user_id = $1 and kind = $2`, [userId, APP_KIND]);
}

const ended = (why: string) => new GitHubProblem("connection_ended", why);

/** One renewal at a time for a developer in this process; the row lock covers the other processes. */
const renewing = new Map<string, Promise<string>>();

/**
 * Renews the app's token. GitHub's refresh tokens work once, and using one ends the old access token, so two
 * renewals at the same time would break each other: the row is locked, and a caller that waited for the lock
 * takes the token the other one just stored. `stale` is a token GitHub refused: it is renewed whatever its
 * expiry says, unless it has been replaced already.
 */
async function renew(ctx: Ctx, userId: string, stale: string | null): Promise<string> {
  const app = ctx.config.githubApp;
  type Outcome = { token: string } | { ended: string };
  const outcome = await ctx.db.tx(async (t): Promise<Outcome> => {
    const r = await t.one(
      `select ciphertext, nonce, refresh_ciphertext, refresh_nonce,
              expires_at is null or expires_at > now() + make_interval(secs => $3) as fresh,
              refresh_expires_at is not null and refresh_expires_at <= now() as lapsed
       from credentials where user_id = $1 and kind = $2 for update`,
      [userId, APP_KIND, RENEW_BEFORE_MS / 1000],
    );
    if (!r) return { ended: "no connection" };
    const current = ctx.cipher.decrypt(userId, r.ciphertext, r.nonce);
    if (stale ? current !== stale : r.fresh) return { token: current };
    if (!app || !r.refresh_ciphertext || r.lapsed) return { ended: r.lapsed ? "the refresh token has expired" : "nothing to renew with" };
    const { status, body } = await call(ctx, TOKEN_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" },
      body: new URLSearchParams({
        client_id: app.clientId, client_secret: app.clientSecret, grant_type: "refresh_token",
        refresh_token: ctx.cipher.decrypt(userId, r.refresh_ciphertext, r.refresh_nonce),
      }),
    });
    const tokens = status === 200 ? tokensFrom(body) : null;
    // GitHub answers 200 with an error when the refresh token was used, revoked or has expired.
    if (!tokens) return { ended: String(body?.error ?? `status ${status}`) };
    const w = writeTokens(ctx, userId, tokens);
    const c = w.sql(3);
    await t.query(
      `update credentials set ciphertext = ${c.ciphertext}, nonce = ${c.nonce}, expires_at = ${c.expires},
         refresh_ciphertext = ${c.refreshCiphertext}, refresh_nonce = ${c.refreshNonce}, refresh_expires_at = ${c.refreshExpires}, updated_at = now()
       where user_id = $1 and kind = $2`,
      [userId, APP_KIND, ...w.params],
    );
    return { token: tokens.accessToken };
  });
  if ("token" in outcome) return outcome.token;
  // Nothing more to renew with, so later scans say so without asking GitHub again.
  await ctx.db.query(`update credentials set refresh_ciphertext = null, refresh_nonce = null, expires_at = now() where user_id = $1 and kind = $2`, [userId, APP_KIND]);
  log.info("github", "the app's connection has ended", { user: userId, reason: outcome.ended });
  throw ended(outcome.ended);
}

/**
 * A token to read GitHub with, and which connection it belongs to; null when nothing is connected. For the
 * app it is renewed first if it is about to expire. Throws GitHubProblem `connection_ended` when the app's
 * connection can't be renewed, and `unavailable` when GitHub can't be reached to renew it.
 */
export async function getGitHubToken(ctx: Ctx, userId: string, opts: { stale?: string } = {}): Promise<{ token: string; method: GitHubMethod } | null> {
  const rows = await ctx.db.query(
    `select kind, ciphertext, nonce, expires_at is null or expires_at > now() + make_interval(secs => $3) as fresh
     from credentials where user_id = $1 and kind in ('github_pat', $2)`,
    [userId, APP_KIND, RENEW_BEFORE_MS / 1000],
  );
  const app = rows.find((r) => r.kind === APP_KIND);
  if (!app) {
    const pat = rows.find((r) => r.kind === "github_pat");
    return pat ? { token: ctx.cipher.decrypt(userId, pat.ciphertext, pat.nonce), method: "pat" } : null;
  }
  const current = ctx.cipher.decrypt(userId, app.ciphertext, app.nonce);
  if (app.fresh && current !== opts.stale) return { token: current, method: "app" };
  let p = renewing.get(userId);
  if (!p) {
    p = renew(ctx, userId, opts.stale ?? null).finally(() => renewing.delete(userId));
    renewing.set(userId, p);
  }
  return { token: await p, method: "app" };
}

// --- Where the app is installed (SET-45, SET-47) ------------------------------------------------------------

type Pending = GitHubConnection["pending"][number];

/** The accounts where the app is installed that this developer can see, with what each has approved. */
export async function listInstallations(ctx: Ctx, token: string, login: string): Promise<GitHubInstallation[]> {
  if (ctx.config.githubMode === "fixtures") {
    return [{ account: login, accountType: "User", avatarUrl: null, selection: "all", repoCount: null, missing: [] }];
  }
  const { status, body } = await call(ctx, `${API}/user/installations?per_page=100`, { headers: headers(token) });
  if (status === 401) throw new GitHubProblem("invalid", "GitHub refused the app's token", { status });
  if (status !== 200 || !Array.isArray(body?.installations)) throw new GitHubProblem("unexpected", `installations: status ${status}`, { status });
  const out: GitHubInstallation[] = [];
  for (const i of body.installations as any[]) {
    const selection = i.repository_selection === "selected" ? "selected" : "all";
    let repoCount: number | null = null;
    if (selection === "selected") {
      // Only the count is needed; a failure here leaves it out (the row then says "selected").
      const r = await call(ctx, `${API}/user/installations/${i.id}/repositories?per_page=1`, { headers: headers(token) }).catch(() => null);
      if (r?.status === 200 && typeof r.body?.total_count === "number") repoCount = r.body.total_count;
    }
    out.push({
      account: String(i.account?.login ?? ""), accountType: i.account?.type === "Organization" ? "Organization" : "User",
      avatarUrl: i.account?.avatar_url ?? null, selection, repoCount,
      missing: AppPermission.options.filter((p) => !i.permissions?.[p]),
    });
  }
  return out.filter((i) => i.account).sort((a, b) => a.account.toLowerCase().localeCompare(b.account.toLowerCase()));
}

const b64url = (v: string | Buffer) => Buffer.from(v).toString("base64url");

/** A short-lived token that says "I am the Gitilizer app", signed with the app's private key. */
export function appJwt(appId: string, privateKey: string, now = Date.now()): string {
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const iat = Math.floor(now / 1000) - 60; // a minute back, for clocks that disagree
  const body = b64url(JSON.stringify({ iat, exp: iat + 9 * 60, iss: appId }));
  const sig = createSign("RSA-SHA256").update(`${head}.${body}`).sign(privateKey);
  return `${head}.${body}.${b64url(sig)}`;
}

/**
 * Organizations where this developer asked for the app and an owner hasn't approved it yet (Q-89). GitHub
 * tells only the app itself, not the developer's token, so this needs the app's ID and private key; without
 * them, or when GitHub can't say, there are none to show.
 */
export async function pendingRequests(ctx: Ctx, account: { login: string; id: number | null }): Promise<Pending[]> {
  const app = ctx.config.githubApp;
  if (!app?.appId || !app.privateKey || ctx.config.githubMode === "fixtures") return [];
  try {
    const { status, body } = await call(ctx, `${API}/app/installation-requests?per_page=100`, { headers: headers(appJwt(app.appId, app.privateKey)) });
    if (status !== 200 || !Array.isArray(body)) {
      log.warn("github", "installation requests couldn't be read", { status });
      return [];
    }
    const mine = (r: any) => (account.id !== null && Number(r.requester?.id) === account.id)
      || String(r.requester?.login ?? "").toLowerCase() === account.login.toLowerCase();
    return (body as any[]).filter(mine).map((r) => ({ account: String(r.account?.login ?? ""), avatarUrl: r.account?.avatar_url ?? null })).filter((p) => p.account);
  } catch (e) {
    log.warn("github", "installation requests couldn't be read", { error: String(e) });
    return [];
  }
}

const subjectOf = (account: string, p: AppPermission) => `${account}:${p}`;

/**
 * Keeps the "Gitilizer can't read {permission} in {account}" warnings in step with what the accounts have
 * approved: one for each missing permission, and none that no longer applies (SET-47).
 */
export async function syncPermissionWarnings(ctx: Ctx, userId: string, installations: GitHubInstallation[]) {
  const code: NotificationCode = "github_app_permission";
  const wanted = new Map<string, { permission: string; account: string }>();
  for (const i of installations) for (const p of i.missing) wanted.set(subjectOf(i.account, p), { permission: APP_PERMISSION_LABEL[p].name, account: i.account });
  const have = await ctx.db.query(`select subject from notifications where user_id = $1 and code = $2`, [userId, code]);
  for (const h of have) if (!wanted.has(h.subject)) await clear(ctx, userId, [code], h.subject);
  for (const [subject, params] of wanted) await raise(ctx, userId, code, params, subject);
}

/** What the GitHub card shows (GET /api/github/connection). Reads GitHub, so the card is current (SET-45). */
export async function connectionDetails(ctx: Ctx, userId: string): Promise<GitHubConnection> {
  const app = ctx.config.githubApp;
  const base: GitHubConnection = {
    method: await connectionMethod(ctx.db, userId), login: null, avatarUrl: null, app: appAvailable(ctx), ended: false,
    installUrl: app ? `https://github.com/apps/${app.slug}/installations/new` : null, installations: [], pending: [],
  };
  const row = await ctx.db.one(
    `select c.kind, c.token_login, c.account_id, u.github_login from users u
     left join credentials c on c.user_id = u.id and c.kind in ('github_pat', $2) where u.id = $1
     order by (c.kind = $2) desc nulls last limit 1`,
    [userId, APP_KIND],
  );
  base.login = row?.token_login ?? row?.github_login ?? null;
  if (base.method !== "app") return base;
  base.avatarUrl = row?.account_id ? `https://avatars.githubusercontent.com/u/${row.account_id}?s=64` : null;
  const endedNow = async () => Boolean(await ctx.db.one(`select 1 as x from notifications where user_id = $1 and code = 'github_connection_ended'`, [userId]));
  if (await endedNow()) return { ...base, ended: true };
  try {
    const t = await getGitHubToken(ctx, userId);
    if (!t) return base;
    const login = base.login ?? "";
    let installations: GitHubInstallation[];
    try {
      installations = await listInstallations(ctx, t.token, login);
    } catch (e) {
      if (!(e instanceof GitHubProblem) || e.code !== "invalid") throw e;
      // GitHub refused a token that looked current: renew it once and ask again.
      installations = await listInstallations(ctx, (await getGitHubToken(ctx, userId, { stale: t.token }))!.token, login);
    }
    await syncPermissionWarnings(ctx, userId, installations);
    const installed = new Set(installations.map((i) => i.account.toLowerCase()));
    const pending = (await pendingRequests(ctx, { login, id: row?.account_id ? Number(row.account_id) : null })).filter((p) => !installed.has(p.account.toLowerCase()));
    return { ...base, installations, pending };
  } catch (e) {
    if (e instanceof GitHubProblem && (e.code === "connection_ended" || e.code === "invalid")) {
      await raise(ctx, userId, "github_connection_ended");
      return { ...base, ended: true };
    }
    // GitHub can't be reached just now: the card shows the account without the list.
    log.warn("github", "the connection's installations couldn't be read", { user: userId, error: String((e as Error)?.message ?? e) });
    return base;
  }
}

/**
 * Asks GitHub to revoke the developer's authorization of the app, when an account is deleted (PRIV-3). The
 * app's installations stay: they belong to their accounts and may serve other developers. Best effort.
 */
export async function revokeAuthorization(ctx: Ctx, userId: string) {
  const app = ctx.config.githubApp;
  if (!app || (await connectionMethod(ctx.db, userId)) !== "app") return;
  try {
    const t = await getGitHubToken(ctx, userId);
    if (!t) return;
    const { status } = await call(ctx, `${API}/applications/${app.clientId}/grant`, {
      method: "DELETE",
      headers: {
        authorization: `Basic ${Buffer.from(`${app.clientId}:${app.clientSecret}`).toString("base64")}`,
        accept: "application/vnd.github+json", "content-type": "application/json", "user-agent": "gitilizer", "x-github-api-version": "2022-11-28",
      },
      body: JSON.stringify({ access_token: t.token }),
    });
    if (status !== 204) log.warn("github", "the app's authorization couldn't be revoked", { user: userId, status });
  } catch (e) {
    log.warn("github", "the app's authorization couldn't be revoked", { user: userId, error: String((e as Error)?.message ?? e) });
  }
}
