// HTTP routes (design: HTTP API). Browser routes on the public port; worker
// routes on a separate internal port.
import { log } from "./log.ts";
import cookie from "@fastify/cookie";
import Fastify, { type FastifyInstance, type FastifyRequest } from "fastify";
import { randomBytes, randomUUID } from "node:crypto";
import { z } from "zod";
import {
  CSRF_HEADER, CredentialKind, DEFAULT_SORT_ICEBOX, DEFAULT_SORT_PRIORITIZED, MAX_COLLABORATORS, MAX_PROMPT_LENGTH,
  MAX_REPO_PROMPT_LENGTH, MAX_REPOS, MESSAGES, SettingsUpdate, Sort, parseLogin, parseRepo, repoControlId,
  type FieldError, type Me, type SettingsResponse,
} from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import { checkValue, credentialStatus, getCredential, saveCredential } from "./credentials.ts";
import type { FixtureStore } from "./github/fixtures.ts";
import { pushSync, queueFullRerank, queueRankJobs, syncState } from "./jobs.ts";
import { currentVersion, listRows, publish } from "./list.ts";
import { clear, clearForCredential, markSeen, raise, shownNotifications } from "./notify.ts";
import { localUserId } from "./local.ts";
import type { Scheduler } from "./scheduler.ts";

const SESSION_COOKIE = "gitilizer_session";
const SESSION_DAYS = 30; // AUTH-8

declare module "fastify" {
  interface FastifyRequest { userId?: string }
}

async function bad(reply: any, status: number, message: string) {
  return reply.code(status).send({ error: message });
}

export function buildApp(ctx: Ctx, scheduler: Scheduler, fixtures: FixtureStore | null): FastifyInstance {
  const app = Fastify({
    // Cloud Run logs every request, so Fastify only reports its own problems (design: Logging).
    logger: { level: "warn", redact: ["req.headers.authorization", "req.headers.cookie"] },
  });
  app.register(cookie);
  const db = ctx.db;

  // --- Sessions and CSRF (design: Security) ---------------------------------
  app.addHook("preHandler", async (req, reply) => {
    if (!req.url.startsWith("/api/")) return;
    if (req.method !== "GET" && req.headers[CSRF_HEADER] !== "1") return bad(reply, 403, "missing CSRF header");
    if (req.url.startsWith("/api/auth/dev")) return;
    const sid = req.cookies[SESSION_COOKIE];
    const s = sid ? await db.one(`select user_id from sessions where id = $1 and expires_at > now()`, [sid]) : undefined;
    if (!s && ctx.config.localMode && !req.url.startsWith("/api/auth/logout")) {
      // Local mode: there is only one developer, so sign them in without asking.
      req.userId = await startSession(reply, await localUserId(ctx));
      return;
    }
    if (!s) return bad(reply, 401, "not signed in");
    req.userId = s.user_id;
    // Sliding 30-day sessions, extended at most once a day (AUTH-8, design: Sign-in and sessions).
    await db.query(
      `update sessions set expires_at = now() + interval '${SESSION_DAYS} days' where id = $1 and expires_at < now() + interval '${SESSION_DAYS - 1} days'`,
      [sid],
    );
  });
  const uid = (req: FastifyRequest) => req.userId as string;

  async function startSession(reply: any, userId: string): Promise<string> {
    const sid = randomBytes(32).toString("base64url");
    await db.query(`insert into sessions (id, user_id, expires_at) values ($1, $2, now() + interval '${SESSION_DAYS} days')`, [sid, userId]);
    reply.setCookie(SESSION_COOKIE, sid, { path: "/", httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: SESSION_DAYS * 86400 });
    return userId;
  }

  // --- Sign-in (prototype stub; real OAuth replaces it) ----------------------
  app.post("/api/auth/dev", async (req, reply) => {
    if (ctx.config.localMode) {
      // Local mode: any sign-in is the local developer.
      await startSession(reply, await localUserId(ctx));
      return { ok: true };
    }
    const body = z.object({ name: z.string().min(1), email: z.string().email() }).parse(req.body);
    let user = await db.one(`select id from users where provider = 'dev' and provider_user_id = $1`, [body.email]);
    if (!user) {
      user = { id: randomUUID() };
      await db.query(
        `insert into users (id, provider, provider_user_id, name, email) values ($1, 'dev', $2, $3, $2)`,
        [user.id, body.email, body.name],
      );
      await db.query(`insert into settings (user_id) values ($1)`, [user.id]);
    }
    await startSession(reply, user.id);
    return { ok: true };
  });

  app.post("/api/auth/logout", async (req, reply) => {
    await db.query(`delete from sessions where id = $1`, [req.cookies[SESSION_COOKIE]]);
    reply.clearCookie(SESSION_COOKIE, { path: "/" });
    return { ok: true };
  });

  // --- Account ---------------------------------------------------------------
  app.get("/api/me", async (req): Promise<Me> => {
    const u = await db.one(`select * from users where id = $1`, [uid(req)]);
    const github = await credentialStatus(ctx, u.id, "github_pat");
    const gemini = await credentialStatus(ctx, u.id, "gemini_key");
    return {
      user: { id: u.id, name: u.name, email: u.email, avatarUrl: u.avatar_url, provider: u.provider, githubLogin: u.github_login },
      // NAV-1, NAV-2: Warm Welcome until both credentials have been entered once.
      screen: u.setup_completed_at ? "app" : "welcome",
      credentials: { github_pat: github, gemini_key: gemini },
      firstSyncDone: u.first_sync_done,
      sync: await syncState(ctx, u.id),
    };
  });

  app.delete("/api/account", async (req, reply) => {
    // Sent after the confirmation dialog (SET-17); the body stops a stray request from deleting an account.
    z.object({ confirm: z.literal(true) }).parse(req.body);
    await db.tx(async (t) => {
      // Kept so a restored backup can delete the account again (PRIV-4).
      await t.query(`insert into deleted_users (id) values ($1) on conflict do nothing`, [uid(req)]);
      await t.query(`delete from users where id = $1`, [uid(req)]); // cascades to everything the user owns (PRIV-3)
    });
    reply.clearCookie(SESSION_COOKIE, { path: "/" });
    return { ok: true };
  });

  // --- List ----------------------------------------------------------------
  app.get("/api/list", async (req) => ({ version: await currentVersion(db, uid(req)), items: await listRows(db, uid(req)) }));

  const itemParam = z.object({ key: z.string() });
  app.post("/api/items/icebox", async (req, reply) => {
    const { key } = itemParam.parse(req.body);
    const r = await db.query(
      `update user_items set status = 'iceboxed', iceboxed_at = now() where user_id = $1 and item_key = $2 and status = 'active' returning 1`,
      [uid(req), key],
    );
    if (!r.length) return bad(reply, 404, "no such active item");
    return { version: await publish(ctx, uid(req), [key]) };
  });

  app.post("/api/items/restore", async (req, reply) => {
    const { key } = itemParam.parse(req.body);
    const r = await db.query(
      `update user_items set status = 'active', iceboxed_at = null where user_id = $1 and item_key = $2 and status = 'iceboxed'
       returning ranked_updated_at`,
      [uid(req), key],
    );
    if (!r.length) return bad(reply, 404, "no such iceboxed item");
    // ICE-10: keep the last score unless the item changed since it was ranked.
    const item = await db.one(`select updated_at from items where key = $1`, [key]);
    if (!r[0].ranked_updated_at || Date.parse(item.updated_at) > Date.parse(r[0].ranked_updated_at)) {
      await queueRankJobs(ctx, uid(req), [{ key, reason: "restore" }]);
    }
    return { version: await publish(ctx, uid(req), [key]) };
  });

  // --- Sync and presence -----------------------------------------------------
  // LIST-28: never refused; a request while a sync runs joins it (SCAN-4).
  app.post("/api/sync", async (req, reply) => {
    scheduler.trigger(uid(req), "manual");
    return reply.code(202).send({ ok: true });
  });

  app.post("/api/presence", async (req) => {
    const { tabId, visible } = z.object({ tabId: z.string().max(64), visible: z.boolean() }).parse(req.body);
    scheduler.report(uid(req), tabId, visible);
    return { ok: true };
  });

  // --- Server-sent events (design: Live updates) -----------------------------
  app.get("/api/events", async (req, reply) => {
    const userId = uid(req);
    reply.hijack();
    reply.raw.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache", connection: "keep-alive", "x-accel-buffering": "no" });
    reply.raw.write("retry: 3000\n\n");
    const lastId = Number(req.headers["last-event-id"] ?? (req.query as any).after ?? NaN);
    const send = (event: string, data: unknown, id?: number) =>
      reply.raw.write(`${id !== undefined ? `id: ${id}\n` : ""}event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    if (!Number.isNaN(lastId)) {
      const ok = ctx.hub.replay(userId, lastId, (e) => send("list", e, e.version));
      if (!ok) send("list", { version: await currentVersion(db, userId), bulk: false, upserts: [], removals: [], resync: true });
    }
    send("notifications", await shownNotifications(ctx, userId));
    send("sync", await syncState(ctx, userId));
    const unsubscribe = ctx.hub.subscribe(userId, reply);
    const keepalive = setInterval(() => reply.raw.write(": keepalive\n\n"), 25_000);
    req.raw.on("close", () => { clearInterval(keepalive); unsubscribe(); });
  });

  app.get("/api/notifications", async (req) => shownNotifications(ctx, uid(req)));
  // The popover was opened: the bell stops swinging on every device (NOTIF-17).
  app.post("/api/notifications/seen", async (req) => {
    await markSeen(ctx, uid(req));
    return { ok: true };
  });

  // Browser timings for METRIC-3. Small bodies only, rate-limited per developer, written to the log.
  const telemetryCounts = new Map<string, { minute: number; n: number }>();
  app.post("/api/telemetry", { bodyLimit: 4096 }, async (req, reply) => {
    const body = z.object({
      events: z.array(z.object({ name: z.string().regex(/^[a-z_]{1,40}$/), value: z.number().finite(), page: z.string().max(40).optional() })).max(20),
    }).parse(req.body);
    const minute = Math.floor(Date.now() / 60_000);
    const c = telemetryCounts.get(uid(req));
    const n = c && c.minute === minute ? c.n + 1 : 1;
    telemetryCounts.set(uid(req), { minute, n });
    if (n > 30) return reply.code(429).send({ error: "too many telemetry reports" });
    // A log-based metric turns these lines into a distribution (design: Monitoring).
    for (const e of body.events) log.info("telemetry", e.name, { value: e.value, page: e.page });
    return reply.code(204).send();
  });

  // --- Settings --------------------------------------------------------------
  app.get("/api/settings", async (req): Promise<SettingsResponse> => {
    const userId = uid(req);
    const s = (await db.one(`select * from settings where user_id = $1`, [userId])) ?? {};
    const repos = await db.query(
      `select full_name, prioritization_prompt, access, token_type from additional_repos where user_id = $1 order by position, full_name`, [userId],
    );
    const collabs = await db.query(`select login, status, avatar_url from collaborators where user_id = $1 order by position, login`, [userId]);
    return {
      additionalRepos: repos.map((r) => ({ fullName: r.full_name, prioritizationPrompt: r.prioritization_prompt, access: r.access, tokenType: r.token_type })),
      collaborators: collabs.map((c) => ({ login: c.login, status: c.status, avatarUrl: c.avatar_url })),
      customPrompt: s.custom_prompt ?? null,
      sortPrioritized: s.sort_prioritized ?? DEFAULT_SORT_PRIORITIZED,
      sortIcebox: s.sort_icebox ?? DEFAULT_SORT_ICEBOX,
      defaultPrompt: ctx.config.defaultPrompt,
    };
  });

  // "Save changes" and "Save and re-rank" (SET-14, SET-15). Credentials are saved without being validated (SET-29).
  app.put("/api/settings", async (req, reply) => {
    const userId = uid(req);
    const next = SettingsUpdate.parse(req.body);
    const errors = settingsErrors(next);
    if (errors.length) return reply.code(422).send({ errors });

    const repos = next.additionalRepos.map((r) => ({ name: parseRepo(r.fullName)!, prompt: r.prioritizationPrompt.trim() }));
    const logins = next.collaborators.map((l) => parseLogin(l)!);
    const trimmed = next.customPrompt?.trim() ?? "";
    const prompt = trimmed && trimmed !== ctx.config.defaultPrompt.trim() ? next.customPrompt : null;
    const prev = await db.one(`select custom_prompt from settings where user_id = $1`, [userId]);
    const prevRepos = (await db.query(`select full_name from additional_repos where user_id = $1`, [userId])).map((r) => r.full_name as string);
    const creds = Object.entries(next.credentials ?? {}).filter(([, v]) => v && v.trim()) as [CredentialKind, string][];

    await db.tx(async (t) => {
      await t.query(
        `insert into settings (user_id, custom_prompt) values ($1, $2) on conflict (user_id) do update set custom_prompt = $2`,
        [userId, prompt],
      );
      // Rows that stay keep their access state and profile (SET-8, SET-19); new ones start unchecked.
      const keep = new Set(repos.map((r) => r.name.toLowerCase()));
      for (const name of prevRepos) if (!keep.has(name.toLowerCase())) await t.query(`delete from additional_repos where user_id = $1 and full_name = $2`, [userId, name]);
      for (const [i, r] of repos.entries()) {
        await t.query(
          `insert into additional_repos (user_id, full_name, prioritization_prompt, position) values ($1, $2, $3, $4)
           on conflict (user_id, full_name) do update set position = $4, prioritization_prompt = $3`,
          [userId, prevRepos.find((p) => p.toLowerCase() === r.name.toLowerCase()) ?? r.name, r.prompt, i],
        );
      }
      const keepLogins = new Set(logins.map((l) => l.toLowerCase()));
      const prevLogins = (await t.query(`select login from collaborators where user_id = $1`, [userId])).map((r) => r.login as string);
      for (const l of prevLogins) if (!keepLogins.has(l.toLowerCase())) await t.query(`delete from collaborators where user_id = $1 and login = $2`, [userId, l]);
      for (const [i, l] of logins.entries()) {
        const existing = prevLogins.find((p) => p.toLowerCase() === l.toLowerCase()) ?? l;
        await t.query(
          `insert into collaborators (user_id, login, position) values ($1, $2, $3) on conflict (user_id, login) do update set position = $3`,
          [userId, existing, i],
        );
      }
      for (const [kind, value] of creds) await saveCredential(ctx, userId, kind, value.trim(), t);
    });

    for (const name of prevRepos) {
      if (!repos.some((r) => r.name.toLowerCase() === name.toLowerCase())) await clear(ctx, userId, ["repo_inaccessible"], name);
    }
    for (const [kind] of creds) await clearForCredential(ctx, userId, kind); // NOTIF-13, SET-5
    if ((prev?.custom_prompt ?? null) !== prompt) await clear(ctx, userId, ["prompt_failing"]);
    // The save that enters the second credential completes setup (NAV-8).
    const both = (await credentialStatus(ctx, userId, "github_pat")).set && (await credentialStatus(ctx, userId, "gemini_key")).set;
    if (both) await db.query(`update users set setup_completed_at = now() where id = $1 and setup_completed_at is null`, [userId]);
    if (next.rerank) await queueFullRerank(ctx, userId, "rerank"); // SET-15, LIVE-24
    scheduler.trigger(userId, "settings"); // SCAN-5: saving settings starts a sync
    await pushSync(ctx, userId);
    return { ok: true };
  });

  app.put("/api/sort", async (req) => {
    const { view, sort } = z.object({ view: z.enum(["prioritized", "icebox"]), sort: Sort }).parse(req.body);
    const col = view === "prioritized" ? "sort_prioritized" : "sort_icebox";
    await db.query(`update settings set ${col} = $2 where user_id = $1`, [uid(req), JSON.stringify(sort)]);
    return { ok: true };
  });

  // --- Credentials -----------------------------------------------------------
  // Validate checks the typed value without saving it (SET-2, SET-28). Saved credentials can't be checked again (SET-21).
  app.post("/api/credentials/:kind/check", async (req) => {
    const kind = CredentialKind.parse((req.params as any).kind);
    const { value } = z.object({ value: z.string().trim().min(1).max(500) }).parse(req.body);
    return checkValue(ctx, kind, value);
  });

  // --- Immediate feedback in Settings (SET-8, SET-19) -------------------------
  // Look up a repository or collaborator as soon as it is added, before saving. Nothing is stored.
  app.post("/api/repos/check", async (req) => {
    const { fullName } = z.object({ fullName: z.string().max(200) }).parse(req.body);
    const name = parseRepo(fullName);
    const pat = await getCredential(ctx, uid(req), "github_pat");
    if (!name || !pat) return { access: "checking", fullName: name ?? fullName, tokenType: null };
    try {
      const info = await ctx.github(pat).repo(name);
      return {
        access: info.access,
        fullName: "fullName" in info ? info.fullName : name,
        tokenType: info.access === "token_type_blocked" ? info.tokenType : null,
      };
    } catch {
      return { access: "checking", fullName: name, tokenType: null }; // checked again by the next scan
    }
  });
  app.post("/api/collaborators/check", async (req) => {
    const { login } = z.object({ login: z.string().max(60) }).parse(req.body);
    const name = parseLogin(login);
    const pat = await getCredential(ctx, uid(req), "github_pat");
    if (!name || !pat) return { login: name ?? login, status: "unknown", avatarUrl: null };
    try {
      const u = await ctx.github(pat).user(name);
      return u.exists ? { login: name, status: "ok", avatarUrl: u.avatarUrl } : { login: name, status: "not_found", avatarUrl: null };
    } catch {
      return { login: name, status: "unknown", avatarUrl: null }; // a generic avatar, without an error (SET-19)
    }
  });

  // --- Fixture mode helpers (design: Testing) --------------------------------
  if (fixtures) {
    app.post("/api/dev/fixtures/touch", async (req) => {
      const { key, by } = z.object({ key: z.string(), by: z.string().optional() }).parse(req.body);
      fixtures.touch(key, by);
      scheduler.trigger(uid(req), "dev");
      return { ok: true };
    });
    app.post("/api/dev/fixtures/close", async (req) => {
      const { key, merged } = z.object({ key: z.string(), merged: z.boolean().optional() }).parse(req.body);
      fixtures.close(key, merged);
      scheduler.trigger(uid(req), "dev");
      return { ok: true };
    });
    app.post("/api/dev/notify", async (req) => {
      const { code, params, subject } = z.object({
        code: z.string(), params: z.record(z.string(), z.string()).optional(), subject: z.string().optional(),
      }).parse(req.body);
      await raise(ctx, uid(req), code as any, params ?? {}, subject ?? "");
      return { ok: true };
    });
  }

  app.setErrorHandler((err, _req, reply) => {
    if (err instanceof z.ZodError) return reply.code(400).send({ error: err.issues.map((i) => i.message).join("; ") });
    // Fastify's own client errors (a malformed body, for example) keep their status.
    const status = (err as { statusCode?: number }).statusCode;
    if (status && status >= 400 && status < 500) return reply.code(status).send({ error: (err as Error).message });
    log.error("api", "unhandled error", { url: _req.url, error: String((err as Error)?.stack ?? err) });
    return reply.code(500).send({ error: "internal error" });
  });
  return app;
}

/** Operator endpoints, on a port that isn't exposed to the internet (design: Security). */
export function buildInternalApp(ctx: Ctx): FastifyInstance {
  const app = Fastify({ logger: false });
  app.addHook("preHandler", async (req, reply) => {
    if (req.headers.authorization !== `Bearer ${ctx.config.workerToken}`) return reply.code(401).send({ error: "bad token" });
  });
  // Product metrics (PRD METRIC-1): users, users who finished setup, daily/weekly/monthly actives, deleted accounts.
  app.get("/internal/metrics", async () => {
    return ctx.db.one(`
      select (select count(*) from users)::int as users,
             (select count(*) from users where setup_completed_at is not null)::int as setup_completed,
             (select count(distinct user_id) from user_activity where day = current_date)::int as daily_active,
             (select count(distinct user_id) from user_activity where day > current_date - 7)::int as weekly_active,
             (select count(distinct user_id) from user_activity where day > current_date - 30)::int as monthly_active,
             (select count(*) from deleted_users)::int as deleted_accounts,
             (select count(*) from deleted_users where deleted_at > now() - interval '30 days')::int as deleted_last_30_days`);
  });
  return app;
}

/** The rules in SET-7, SET-9, SET-24, SET-25 and SET-27, checked again on the server. */
export function settingsErrors(s: SettingsUpdate): FieldError[] {
  const errors: FieldError[] = [];
  const seen = new Set<string>();
  if (s.additionalRepos.length > MAX_REPOS) errors.push({ field: "add-repository", message: MESSAGES.repoLimit });
  for (const r of s.additionalRepos) {
    const name = parseRepo(r.fullName);
    if (!name) { errors.push({ field: "add-repository", message: MESSAGES.repoFormat }); continue; }
    if (seen.has(name.toLowerCase())) errors.push({ field: repoControlId(name), message: MESSAGES.repoDuplicate(name) });
    seen.add(name.toLowerCase());
    if (r.prioritizationPrompt.length > MAX_REPO_PROMPT_LENGTH) errors.push({ field: repoControlId(name), message: MESSAGES.repoPromptLength(r.prioritizationPrompt.length) });
  }
  const logins = new Set<string>();
  if (s.collaborators.length > MAX_COLLABORATORS) errors.push({ field: "add-collaborator", message: MESSAGES.loginLimit });
  for (const l of s.collaborators) {
    const login = parseLogin(l);
    if (!login) { errors.push({ field: "add-collaborator", message: MESSAGES.loginFormat }); continue; }
    if (logins.has(login.toLowerCase())) errors.push({ field: "add-collaborator", message: MESSAGES.loginDuplicate(login) });
    logins.add(login.toLowerCase());
  }
  if (s.customPrompt !== null && s.customPrompt.length > MAX_PROMPT_LENGTH) errors.push({ field: "ranking-prompt", message: MESSAGES.promptLength(s.customPrompt.length) });
  if (s.customPrompt !== null && !s.customPrompt.trim()) errors.push({ field: "ranking-prompt", message: MESSAGES.promptEmpty });
  return errors;
}
