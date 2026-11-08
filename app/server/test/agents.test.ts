// Ranking agents (PRD SET-38 to SET-41, WEL-5, RANK-19, RANK-20, NOTIF-23): choosing one, ranking with it,
// pausing when its key or credits stop working, and switching.
import type { FastifyInstance } from "fastify";
import { beforeAll, describe, expect, it } from "vitest";
import { buildApp } from "../src/app.ts";
import type { Ctx } from "../src/context.ts";
import { claimJobs, completeJob, failJob, syncState } from "../src/jobs.ts";
import { listRows } from "../src/list.ts";
import { raise, shownNotifications } from "../src/notify.ts";
import { scan } from "../src/scanner.ts";
import { Scheduler } from "../src/scheduler.ts";
import { addUser, makeCtx } from "./helpers.ts";

const save = (ctx: Ctx, userId: string, kind: string) => {
  const { ciphertext, nonce } = ctx.cipher.encrypt(userId, `${kind}-secret-123`);
  return ctx.db.query(`insert into credentials (user_id, kind, ciphertext, nonce) values ($1, $2, $3, $4)`, [userId, kind, ciphertext, nonce]);
};

describe("ranking with Claude or OpenAI (RANK-19, RANK-20)", () => {
  let ctx: Ctx;
  const userId = "c1";
  const codes = async () => (await shownNotifications(ctx, userId)).map((n) => n.code).sort();

  beforeAll(async () => {
    ({ ctx } = await makeCtx());
    await addUser(ctx, userId);
    await save(ctx, userId, "anthropic_key");
    await ctx.db.query(`update users set ranking_agent = 'claude' where id = $1`, [userId]);
    await scan(ctx, userId, "test");
  });

  it("claims jobs with the agent's key and model, and records who scored the item (RANK-16)", async () => {
    const [job] = await claimJobs(ctx, 1, 60);
    expect(job).toMatchObject({ agent: "claude", model: "claude-haiku-5-5", apiKey: "anthropic_key-secret-123" });
    await completeJob(ctx, job.id, { priority: 0.7, actionable: true, next_action: "x", reasoning: "y" });
    const row = await ctx.db.one(`select ranked_agent, ranked_model from user_items where user_id = $1 and item_key = $2`, [userId, job.itemKey]);
    expect(row).toEqual({ ranked_agent: "claude", ranked_model: "claude-haiku-5-5" });
  });

  it("pauses when credits run out: items wait with \"–\", the sync ends, and ranking tries again in 15 minutes (RANK-20, LIST-30, LIST-32)", async () => {
    const [job] = await claimJobs(ctx, 1, 60);
    await failJob(ctx, job.id, { code: "credits_exhausted", message: "Your credit balance is too low" });
    expect(await codes()).toEqual(["claude_credits"]);
    expect(await claimJobs(ctx, 5, 60)).toHaveLength(0);
    const waiting = (await listRows(ctx.db, userId)).filter((r) => r.waiting);
    expect(waiting.length).toBeGreaterThan(0);
    expect(waiting.every((r) => r.score === null)).toBe(true);
    expect((await syncState(ctx, userId)).running).toBe(false);
    const u = await ctx.db.one(`select extract(epoch from ranking_paused_until - now()) as s, ranking_paused_code from users where id = $1`, [userId]);
    expect(Number(u.s)).toBeGreaterThan(14 * 60);
    expect(Number(u.s)).toBeLessThanOrEqual(15 * 60);
    expect(u.ranking_paused_code).toBe("credits_exhausted");
    // After the pause, a request that succeeds clears the error.
    await ctx.db.query(`update users set ranking_paused_until = now() - interval '1 second' where id = $1`, [userId]);
    const [next] = await claimJobs(ctx, 1, 60);
    await completeJob(ctx, next.id, { priority: 0.5, actionable: true, next_action: "x", reasoning: "y" });
    expect(await codes()).toEqual([]);
  });

  it("raises Claude's own notifications for short-lived and unexpected failures", async () => {
    const [job] = await claimJobs(ctx, 1, 60);
    await failJob(ctx, job.id, { code: "rate_limited", message: "429", retryAfterSeconds: 5 });
    expect(await codes()).toEqual(["claude_rate_limited"]);
  });

  it("uses OpenAI's model and notifications for an OpenAI developer", async () => {
    const other = "o1";
    await addUser(ctx, other);
    await save(ctx, other, "openai_key");
    await ctx.db.query(`update users set ranking_agent = 'openai' where id = $1`, [other]);
    await scan(ctx, other, "test");
    const jobs = (await claimJobs(ctx, 20, 60)).filter((j) => j.agent === "openai");
    expect(jobs[0]).toMatchObject({ model: "gpt-6-luna", apiKey: "openai_key-secret-123" });
    await failJob(ctx, jobs[0].id, { code: "key_invalid", message: "Incorrect API key provided" });
    expect((await shownNotifications(ctx, other)).map((n) => n.code)).toEqual(["openai_invalid"]);
    const u = await ctx.db.one(`select ranking_paused_until = 'infinity'::timestamptz as forever from users where id = $1`, [other]);
    expect(u.forever).toBe(true); // a bad key waits for a new one
  });

  it("doesn't pause the new agent for a job that ran with the previous one (SET-40)", async () => {
    // The previous test claimed some of this developer's jobs too; one of them finishes after the switch.
    const job = await ctx.db.one(`select id from rank_jobs where user_id = $1 and state = 'leased' and agent = 'claude' limit 1`, [userId]);
    await ctx.db.query(`update users set ranking_agent = 'gemini' where id = $1`, [userId]);
    await failJob(ctx, job.id, { code: "key_invalid", message: "401" });
    const u = await ctx.db.one(`select ranking_paused_until is null or ranking_paused_until <= now() as running from users where id = $1`, [userId]);
    expect(u.running).toBe(true);
    expect((await codes()).filter((c) => c.endsWith("_invalid"))).toEqual([]);
    expect(await ctx.db.one(`select state from rank_jobs where id = $1`, [job.id])).toEqual({ state: "queued" });
  });
});

describe("choosing and switching agents in Settings and Warm Welcome (SET-38 to SET-40, WEL-5)", () => {
  let ctx: Ctx;
  let app: FastifyInstance;
  let cookie = "";
  let userId = "";
  const call = (method: string, url: string, payload?: unknown) =>
    app.inject({ method: method as any, url, headers: { "x-gitilizer": "1", cookie }, payload: payload as any });
  const page = { additionalRepos: [], excludedRepos: [], collaborators: [], customPrompt: null, rerank: false };

  beforeAll(async () => {
    ({ ctx } = await makeCtx());
    app = buildApp(ctx, new Scheduler(ctx), null);
    const r = await app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload: { name: "Ana", email: "ana@example.com" } });
    cookie = String(r.headers["set-cookie"]).split(";")[0];
    userId = (await call("GET", "/api/me")).json().user.id;
  });

  it("completes setup with Claude and its key, ignoring a value typed for another agent (WEL-4, WEL-5)", async () => {
    expect((await call("POST", "/api/setup", { credentials: { github_pat: "ghp_x", gemini_key: "AIza-x" }, rankingAgent: "claude" })).statusCode).toBe(422);
    const r = await call("POST", "/api/setup", { credentials: { github_pat: "ghp_x", anthropic_key: "sk-ant-x", gemini_key: "bad-ignored" }, rankingAgent: "claude" });
    expect(r.json()).toEqual({ ok: true, results: { github_pat: { ok: true, code: "ok", login: "brianquinlan" }, anthropic_key: { ok: true, code: "ok" } } });
    const me = (await call("GET", "/api/me")).json();
    expect(me).toMatchObject({ screen: "app", rankingAgent: "claude" });
    expect(me.credentials.anthropic_key).toMatchObject({ set: true, chip: "connected" });
    expect(me.credentials.gemini_key).toMatchObject({ set: false, chip: "not_set" });
  });

  it("checks a Claude or OpenAI key with the agent's own check (SET-28)", async () => {
    const seen: string[] = [];
    const real = ctx.validateKey;
    ctx.validateKey = async (kind, key) => { seen.push(kind); return real(kind, key); };
    expect((await call("POST", "/api/credentials/openai_key/check", { value: "sk-proj-x" })).json()).toEqual({ ok: true, code: "ok" });
    expect((await call("POST", "/api/credentials/anthropic_key/check", { value: "bad" })).json()).toEqual({ ok: false, code: "not_accepted" });
    expect(seen).toEqual(["openai_key", "anthropic_key"]);
    ctx.validateKey = real;
  });

  it("refuses an agent with no key, saved or typed, next to its field (SET-27)", async () => {
    const r = await call("PUT", "/api/settings", { ...page, rankingAgent: "openai" });
    expect(r.statusCode).toBe(422);
    expect(r.json().errors).toEqual([{ field: "openai-key", message: "Add an OpenAI API key, or choose an agent you've already set up." }]);
    expect((await call("GET", "/api/me")).json().rankingAgent).toBe("claude");
  });

  it("counts the items each agent scored, for the switch dialog (SET-40)", async () => {
    await ctx.db.query(`insert into items (key, kind, title, html_url, state, updated_at) values ('a/b#1', 'issue', 't', 'u', 'open', now()), ('a/b#2', 'issue', 't', 'u', 'open', now())`);
    await ctx.db.query(
      `insert into user_items (user_id, item_key, reasons, score, ranked_agent) values ($1, 'a/b#1', '{assigned}', 0.5, 'claude'), ($1, 'a/b#2', '{assigned}', null, null)`,
      [userId],
    );
    expect((await call("GET", "/api/settings")).json()).toMatchObject({ rankingAgent: "claude", rankedBy: { gemini: 0, claude: 1, openai: 0 } });
  });

  it("switches with a typed key: ends the old agent's pause, clears its notifications and keeps its key (SET-39, SET-40, NOTIF-23)", async () => {
    await ctx.db.query(`update users set ranking_paused_until = 'infinity', ranking_paused_code = 'key_invalid' where id = $1`, [userId]);
    await raise(ctx, userId, "claude_invalid");
    const r = await call("PUT", "/api/settings", { ...page, rankingAgent: "openai", credentials: { openai_key: "sk-proj-typed" } });
    expect(r.statusCode).toBe(200);
    expect((await call("GET", "/api/me")).json()).toMatchObject({ rankingAgent: "openai", credentials: { anthropic_key: { set: true } } });
    expect((await shownNotifications(ctx, userId)).map((n) => n.code)).not.toContain("claude_invalid");
    expect(await ctx.db.one(`select ranking_paused_until from users where id = $1`, [userId])).toEqual({ ranking_paused_until: null });
  });

  it("switches back to an agent whose key is saved without typing it, then removes the other agent's key (SET-39)", async () => {
    // OpenAI is still in use when this page is saved, so its key stays.
    expect((await call("PUT", "/api/settings", { ...page, rankingAgent: "claude", removeCredentials: ["openai_key"] })).statusCode).toBe(200);
    let me = (await call("GET", "/api/me")).json();
    expect(me.rankingAgent).toBe("claude");
    expect(me.credentials.openai_key.set).toBe(true);
    expect((await call("PUT", "/api/settings", { ...page, removeCredentials: ["openai_key"] })).statusCode).toBe(200);
    me = (await call("GET", "/api/me")).json();
    expect(me.credentials.openai_key.set).toBe(false);
  });

  it("never removes the key of the agent in use (SET-39)", async () => {
    expect((await call("PUT", "/api/settings", { ...page, removeCredentials: ["anthropic_key"] })).statusCode).toBe(200);
    expect((await call("GET", "/api/me")).json().credentials.anthropic_key.set).toBe(true);
  });

  it("shows items as ranked by whichever agent scored them, and none as waiting while ranking runs (LIST-30)", async () => {
    const rows = await listRows(ctx.db, userId);
    expect(rows.every((r) => !r.waiting)).toBe(true);
  });
});
