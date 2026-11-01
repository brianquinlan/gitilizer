// HTTP routes (design: HTTP API). Browser routes on the public port; worker
// routes on a separate internal port.
import cookie from "@fastify/cookie";
import Fastify, { type FastifyInstance, type FastifyRequest } from "fastify";
import { randomBytes, randomUUID } from "node:crypto";
import { z } from "zod";
import {
  CSRF_HEADER, CredentialKind, DEFAULT_SORT_ICEBOX, DEFAULT_SORT_PRIORITIZED, Settings, Sort,
  type Me, type SettingsResponse,
} from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import { checkValue, credentialStatus, getCredential, saveCredential, validateCredential } from "./credentials.ts";
import type { FixtureStore } from "./github/fixtures.ts";
import { claimJobs, completeJob, failJob, queueFullRerank, queueRankJobs } from "./jobs.ts";
import { currentVersion, listRows, publish } from "./list.ts";
import { clear, clearForCredential, raise, shownNotifications } from "./notify.ts";
import type { Scheduler } from "./scheduler.ts";

const SESSION_COOKIE = "gitilizer_session";
const SESSION_DAYS = 30; // PRD Q-11, assumed

declare module "fastify" {
  interface FastifyRequest { userId?: string }
}

async function bad(reply: any, status: number, message: string) {
  return reply.code(status).send({ error: message });
}

export function buildApp(ctx: Ctx, scheduler: Scheduler, fixtures: FixtureStore | null): FastifyInstance {
  const app = Fastify({
    logger: { level: process.env.LOG_LEVEL ?? "warn", redact: ["req.headers.authorization", "req.headers.cookie"] },
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
    if (!s) return bad(reply, 401, "not signed in");
    req.userId = s.user_id;
    // Sessions are extended while in use.
    await db.query(`update sessions set expires_at = now() + interval '${SESSION_DAYS} days' where id = $1`, [sid]);
  });
  const uid = (req: FastifyRequest) => req.userId as string;

  // --- Sign-in (prototype stub; real OAuth replaces it) ----------------------
  app.post("/api/auth/dev", async (req, reply) => {
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
    const sid = randomBytes(32).toString("base64url");
    await db.query(`insert into sessions (id, user_id, expires_at) values ($1, $2, now() + interval '${SESSION_DAYS} days')`, [sid, user.id]);
    reply.setCookie(SESSION_COOKIE, sid, { path: "/", httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: SESSION_DAYS * 86400 });
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
    const last = await db.one(`select max(finished_at) as t from scans where user_id = $1 and outcome = 'ok'`, [u.id]);
    const running = await db.one(`select 1 from scans where user_id = $1 and finished_at is null`, [u.id]);
    return {
      user: { id: u.id, name: u.name, email: u.email, avatarUrl: u.avatar_url, provider: u.provider, githubLogin: u.github_login },
      // NAV-1, Q-8 (decided): Warm Welcome until both credentials have been entered once.
      screen: u.setup_completed_at ? "app" : "welcome",
      credentials: { github_pat: github, gemini_key: gemini },
      firstSyncDone: u.first_sync_done,
      sync: { running: Boolean(running), lastFinishedAt: last?.t ? new Date(last.t).toISOString() : null },
    };
  });

  app.delete("/api/account", async (req, reply) => {
    z.object({ confirm: z.literal("delete") }).parse(req.body);
    await db.query(`delete from users where id = $1`, [uid(req)]); // cascades to everything the user owns (PRIV-3)
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
    // Q-34 (assumed): keep the last score unless the item changed since it was ranked.
    const item = await db.one(`select updated_at from items where key = $1`, [key]);
    if (!r[0].ranked_updated_at || Date.parse(item.updated_at) > Date.parse(r[0].ranked_updated_at)) {
      await queueRankJobs(ctx, uid(req), [{ key, reason: "restore" }]);
    }
    return { version: await publish(ctx, uid(req), [key]) };
  });

  // --- Sync and presence -----------------------------------------------------
  app.post("/api/sync", async (req, reply) => {
    const u = await db.one(`select last_manual_sync_at from users where id = $1`, [uid(req)]);
    const since = u.last_manual_sync_at ? (Date.now() - Date.parse(u.last_manual_sync_at)) / 1000 : Infinity;
    if (since < ctx.config.manualSyncMinSeconds) return bad(reply, 429, "Sync was started moments ago");
    await db.query(`update users set last_manual_sync_at = now() where id = $1`, [uid(req)]);
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
      if (!ok) send("list", { version: await currentVersion(db, userId), upserts: [], removals: [], resync: true });
    }
    send("notifications", await shownNotifications(ctx, userId));
    const unsubscribe = ctx.hub.subscribe(userId, reply);
    const keepalive = setInterval(() => reply.raw.write(": keepalive\n\n"), 25_000);
    req.raw.on("close", () => { clearInterval(keepalive); unsubscribe(); });
  });

  app.get("/api/notifications", async (req) => shownNotifications(ctx, uid(req)));

  // --- Settings --------------------------------------------------------------
  app.get("/api/settings", async (req): Promise<SettingsResponse> => {
    const userId = uid(req);
    const s = (await db.one(`select * from settings where user_id = $1`, [userId])) ?? {};
    const repos = await db.query(`select full_name, filter, access from interested_repos where user_id = $1 order by position, full_name`, [userId]);
    const collabs = await db.query(`select login, exists_on_github from collaborators where user_id = $1 order by login`, [userId]);
    const count = await db.one(`select count(*)::int as n from user_items where user_id = $1 and status in ('active', 'iceboxed')`, [userId]);
    return {
      repos: repos.map((r) => ({ fullName: r.full_name, filter: r.filter, access: r.access })),
      collaborators: collabs.map((c) => ({ login: c.login, exists: c.exists_on_github })),
      customPrompt: s.custom_prompt ?? null,
      sortPrioritized: s.sort_prioritized ?? DEFAULT_SORT_PRIORITIZED,
      sortIcebox: s.sort_icebox ?? DEFAULT_SORT_ICEBOX,
      defaultPrompt: ctx.config.defaultPrompt,
      activeItemCount: count?.n ?? 0,
    };
  });

  app.put("/api/settings", async (req, reply) => {
    const userId = uid(req);
    const parsed = Settings.safeParse(req.body);
    if (!parsed.success) return bad(reply, 400, parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
    const next = parsed.data;
    const prev = await db.one(`select custom_prompt from settings where user_id = $1`, [userId]);
    const prevRepos = await db.query(`select full_name, filter from interested_repos where user_id = $1`, [userId]);
    const prevCollabs = await db.query(`select login from collaborators where user_id = $1`, [userId]);
    const prompt = next.customPrompt?.trim() && next.customPrompt.trim() !== ctx.config.defaultPrompt.trim() ? next.customPrompt : null;

    const repoSig = (rs: { name: string; filter: string }[]) => JSON.stringify(rs.map((r) => [r.name.toLowerCase(), r.filter]).sort());
    const reposChanged = repoSig(prevRepos.map((r) => ({ name: r.full_name, filter: r.filter }))) !== repoSig(next.repos.map((r) => ({ name: r.fullName, filter: r.filter })));
    const collabsChanged = JSON.stringify(prevCollabs.map((c) => c.login.toLowerCase()).sort()) !== JSON.stringify(next.collaborators.map((c) => c.login.toLowerCase()).sort());
    const promptChanged = (prev?.custom_prompt ?? null) !== prompt;

    await db.tx(async (t) => {
      await t.query(
        `insert into settings (user_id, custom_prompt, sort_prioritized, sort_icebox) values ($1, $2, $3, $4)
         on conflict (user_id) do update set custom_prompt = $2, sort_prioritized = $3, sort_icebox = $4`,
        [userId, prompt, JSON.stringify(next.sortPrioritized), JSON.stringify(next.sortIcebox)],
      );
      if (reposChanged) {
        await t.query(`delete from interested_repos where user_id = $1`, [userId]);
        for (const [i, r] of next.repos.entries()) {
          await t.query(`insert into interested_repos (user_id, full_name, filter, position) values ($1, $2, $3, $4) on conflict do nothing`, [userId, r.fullName, r.filter, i]);
        }
      }
      if (collabsChanged) {
        await t.query(`delete from collaborators where user_id = $1`, [userId]);
        for (const c of next.collaborators) {
          await t.query(`insert into collaborators (user_id, login) values ($1, $2) on conflict do nothing`, [userId, c.login]);
        }
      }
    });

    // Check repository access and collaborator existence in the background (SET-8, SET-10).
    const pat = await getCredential(ctx, userId, "github_pat");
    if (pat && (reposChanged || collabsChanged)) {
      void (async () => {
        const gh = ctx.github(pat);
        for (const r of next.repos) {
          try {
            const access = await gh.repoAccess(r.fullName);
            await db.query(`update interested_repos set access = $3 where user_id = $1 and full_name = $2`, [userId, r.fullName, access]);
          } catch { /* reported by the next scan */ }
        }
        for (const c of next.collaborators) {
          try {
            const exists = await gh.userExists(c.login);
            await db.query(`update collaborators set exists_on_github = $3 where user_id = $1 and login = $2`, [userId, c.login, exists]);
          } catch { /* ignore */ }
        }
      })();
    }
    // SET-15: a full re-rank when anything the agent reads changes.
    let queued = 0;
    if (promptChanged || reposChanged || collabsChanged) {
      if (promptChanged) await clear(ctx, userId, ["prompt_failing"]);
      queued = await queueFullRerank(ctx, userId, "settings");
      if (reposChanged) scheduler.trigger(userId, "settings");
    }
    return { ok: true, rerankQueued: queued };
  });

  app.put("/api/sort", async (req) => {
    const { view, sort } = z.object({ view: z.enum(["prioritized", "icebox"]), sort: Sort }).parse(req.body);
    const col = view === "prioritized" ? "sort_prioritized" : "sort_icebox";
    await db.query(`update settings set ${col} = $2 where user_id = $1`, [uid(req), JSON.stringify(sort)]);
    return { ok: true };
  });

  // --- Credentials -----------------------------------------------------------
  app.put("/api/credentials/:kind", async (req, reply) => {
    const userId = uid(req);
    const kind = CredentialKind.parse((req.params as any).kind);
    const { value } = z.object({ value: z.string().trim().min(10).max(500) }).parse(req.body);
    await saveCredential(ctx, userId, kind, value);
    await clearForCredential(ctx, userId, kind); // NOTIF-13
    const status = await validateCredential(ctx, userId, kind);
    // SET-5: start a sync once both credentials are in place; that also completes setup (Q-8).
    const other = await credentialStatus(ctx, userId, kind === "github_pat" ? "gemini_key" : "github_pat");
    if (other.set) {
      await db.query(`update users set setup_completed_at = now() where id = $1 and setup_completed_at is null`, [userId]);
      scheduler.trigger(userId, "credentials");
    }
    if (kind === "gemini_key") {
      // Ranking paused by a key problem resumes with the new key.
      await db.query(`update rank_jobs set not_before = now() where user_id = $1 and state = 'queued'`, [userId]);
    }
    return reply.send(status);
  });

  app.post("/api/credentials/:kind/check", async (req) => {
    const kind = CredentialKind.parse((req.params as any).kind);
    const { value } = z.object({ value: z.string().trim().min(10).max(500) }).parse(req.body);
    return checkValue(ctx, kind, value);
  });

  app.post("/api/credentials/:kind/validate", async (req) => {
    const kind = CredentialKind.parse((req.params as any).kind);
    return validateCredential(ctx, uid(req), kind);
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
      const { code, params } = z.object({ code: z.string(), params: z.record(z.string(), z.string()).optional() }).parse(req.body);
      await raise(ctx, uid(req), code as any, params ?? {});
      return { ok: true };
    });
  }

  app.setErrorHandler((err, _req, reply) => {
    if (err instanceof z.ZodError) return reply.code(400).send({ error: err.issues.map((i) => i.message).join("; ") });
    console.error(err);
    return reply.code(500).send({ error: "internal error" });
  });
  return app;
}

/** Endpoints for the ranking worker, on the internal port (design: Ranking worker). */
export function buildInternalApp(ctx: Ctx): FastifyInstance {
  const app = Fastify({ logger: false, bodyLimit: 50 * 1024 * 1024 });
  app.addHook("preHandler", async (req, reply) => {
    if (req.headers.authorization !== `Bearer ${ctx.config.workerToken}`) return reply.code(401).send({ error: "bad token" });
  });
  // Product metrics (PRD METRIC-1): users, users who finished setup, and daily/weekly/monthly actives.
  app.get("/internal/metrics", async () => {
    const r = await ctx.db.one(`
      select (select count(*) from users)::int as users,
             (select count(*) from users where setup_completed_at is not null)::int as setup_completed,
             (select count(distinct user_id) from user_activity where day = current_date)::int as daily_active,
             (select count(distinct user_id) from user_activity where day > current_date - 7)::int as weekly_active,
             (select count(distinct user_id) from user_activity where day > current_date - 30)::int as monthly_active`);
    return r;
  });

  app.post("/internal/rank-jobs/claim", async (req) => {
    const { max, leaseSeconds } = z.object({ max: z.number().int().min(1).max(50).default(8), leaseSeconds: z.number().int().min(10).max(900).default(120) }).parse(req.body ?? {});
    return { jobs: await claimJobs(ctx, max, leaseSeconds) };
  });
  app.post("/internal/rank-jobs/:id/result", async (req, reply) => {
    const r = z.object({ priority: z.number().min(0).max(1), actionable: z.boolean(), next_action: z.string(), reasoning: z.string() }).parse(req.body);
    const ok = await completeJob(ctx, Number((req.params as any).id), r);
    return ok ? { ok } : reply.code(409).send({ error: "job not leased" });
  });
  app.post("/internal/rank-jobs/:id/error", async (req, reply) => {
    const e = z.object({ code: z.string(), message: z.string(), retryAfterSeconds: z.number().nullable().optional() }).parse(req.body);
    const ok = await failJob(ctx, Number((req.params as any).id), e);
    return ok ? { ok } : reply.code(409).send({ error: "job not leased" });
  });
  return app;
}
