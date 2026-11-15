// Basic ranking (PRD RANK-21, RANK-22, SET-15, SET-38 to SET-40, METRIC-5): ranking with Gitilizer's own
// key for a developer with none, pausing when Google refuses that key, and choosing it in Settings.
import type { FastifyInstance } from "fastify";
import { beforeAll, describe, expect, it } from "vitest";
import { CATALOGUE } from "@gitilizer/shared";
import { buildApp, buildInternalApp } from "../src/app.ts";
import type { Ctx } from "../src/context.ts";
import { claimJobs, completeJob, failJob, queueFullRerank, refreshQuotas, syncState } from "../src/jobs.ts";
import { listRows } from "../src/list.ts";
import { shownNotifications } from "../src/notify.ts";
import { scan } from "../src/scanner.ts";
import { Scheduler } from "../src/scheduler.ts";
import { RankingWorker } from "../src/worker.ts";
import { addUser, makeCtx, type RecordingHub } from "./helpers.ts";
import type { FixtureStore } from "../src/github/fixtures.ts";

/** A developer on basic ranking: GitHub connected, no key of their own. */
async function addBasicUser(ctx: Ctx, userId: string) {
  await addUser(ctx, userId);
  await ctx.db.query(`delete from credentials where user_id = $1 and kind = 'gemini_key'`, [userId]);
  await ctx.db.query(`update users set ranking_agent = 'basic' where id = $1`, [userId]);
}
const scored = { priority: 0.7, actionable: true, next_action: "", reasoning: "" };
const pausedText = (params: Record<string, string>) => CATALOGUE.basic_paused.body(params, Date.now()).map((x) => x.text).join("");

describe("ranking with basic ranking (RANK-21)", () => {
  let ctx: Ctx;
  let store: FixtureStore;
  const userId = "b1";
  const codes = async (id = userId) => (await shownNotifications(ctx, id)).map((n) => n.code).sort();

  beforeAll(async () => {
    ({ ctx, store } = await makeCtx());
    await addBasicUser(ctx, userId);
    await scan(ctx, userId, "test");
  });

  it("claims jobs with Gitilizer's own key and the decision model, and stores a score with no reasoning (RANK-2, RANK-16)", async () => {
    const [job] = await claimJobs(ctx, 1, 60);
    expect(job).toMatchObject({ choice: "basic", agent: "basic", model: "gemini-decision-1", apiKey: "basic-key-1234567890" });
    await completeJob(ctx, job.id, scored);
    const row = await ctx.db.one(`select score, ranked_agent, ranked_model, reasoning, next_action from user_items where user_id = $1 and item_key = $2`, [userId, job.itemKey]);
    expect(row).toEqual({ score: 0.7, ranked_agent: "basic", ranked_model: "gemini-decision-1", reasoning: "", next_action: "" });
    // No reasoning, so the rank isn't clickable (LIST-24).
    expect((await listRows(ctx.db, userId)).find((r) => r.key === job.itemKey)).toMatchObject({ score: 0.7, reasoning: null });
  });

  it("waits out a per-minute limit on Gitilizer's key without pausing or telling the developer (RANK-22)", async () => {
    const [job] = await claimJobs(ctx, 1, 60);
    await failJob(ctx, job.id, { code: "rate_limited", message: "per minute", retryAfterSeconds: 20 });
    expect(await codes()).toEqual([]);
    expect(await ctx.db.one(`select ranking_paused_until from users where id = $1`, [userId])).toEqual({ ranking_paused_until: null });
    const row = await ctx.db.one(`select state, extract(epoch from not_before - now()) as wait from rank_jobs where id = $1`, [job.id]);
    expect(row.state).toBe("queued");
    expect(Number(row.wait)).toBeGreaterThan(15);
    await ctx.db.query(`update rank_jobs set not_before = now() where id = $1`, [job.id]);
  });

  it("pauses for everyone when Google refuses the key for its daily quota, and tries again in 15 minutes (RANK-22)", async () => {
    await addBasicUser(ctx, "b2");
    await scan(ctx, "b2", "test");
    const [job] = await claimJobs(ctx, 1, 60);
    await failJob(ctx, job.id, { code: "daily_quota", message: "CreateDecisionRequestsPerDayPerProjectPerModel" });
    // The developer whose job was refused is told at once; the other when their next job would have asked.
    const owner = job.reason && (await ctx.db.one(`select user_id from rank_jobs where id = $1`, [job.id])).user_id as string;
    const other = owner === userId ? "b2" : userId;
    expect(await codes(owner)).toEqual(["basic_paused"]);
    expect(await claimJobs(ctx, 8, 60)).toHaveLength(0);
    expect(await codes(other)).toEqual(["basic_paused"]);
    const note = (await shownNotifications(ctx, owner))[0];
    expect(CATALOGUE.basic_paused.severity).toBe("warning");
    expect(CATALOGUE.basic_paused.heading(note.params)).toBe("Basic ranking is paused");
    expect(pausedText(note.params)).toMatch(
      /^Gitilizer's own ranking quota is used up, so new and changed issues and PRs aren't being ranked\. Ranking resumes automatically when the quota resets at .*, in about .*\. To rank without waiting, add your own API key in Settings\.$/,
    );
    // Items wait with "–", and the sync doesn't keep turning (LIST-30, LIST-32).
    const waiting = (await listRows(ctx.db, owner)).filter((r) => r.waiting);
    expect(waiting.length).toBeGreaterThan(0);
    expect((await syncState(ctx, owner)).running).toBe(false);
    const u = await ctx.db.one(`select extract(epoch from ranking_paused_until - now()) as s, ranking_paused_code from users where id = $1`, [owner]);
    expect(Number(u.s)).toBeGreaterThan(14 * 60);
    expect(Number(u.s)).toBeLessThanOrEqual(15 * 60);
    expect(u.ranking_paused_code).toBe("basic_paused");
  });

  it("resumes for everyone when a request succeeds, and the warning clears (RANK-22)", async () => {
    // 15 minutes later Gitilizer asks again.
    await ctx.db.query(`update basic_pause set paused_until = now() - interval '1 second'`);
    await ctx.db.query(`update users set ranking_paused_until = now() - interval '1 second' where id = $1`, [userId]);
    const [job] = await claimJobs(ctx, 1, 60);
    expect(job.agent).toBe("basic");
    await completeJob(ctx, job.id, scored);
    expect(await codes()).toEqual([]);
    expect(await ctx.db.query(`select 1 from basic_pause`)).toHaveLength(0);
    expect(await ctx.db.query(`select id from users where ranking_paused_code = 'basic_paused'`)).toHaveLength(0); // b2 doesn't wait out its pause
    for (;;) {
      const jobs = await claimJobs(ctx, 50, 60);
      if (!jobs.length) break;
      for (const j of jobs) await completeJob(ctx, j.id, scored);
    }
    expect(await codes("b2")).toEqual([]);
    expect((await listRows(ctx.db, "b2")).filter((r) => r.waiting)).toHaveLength(0);
  });

  it("doesn't say when ranking resumes if the limit is a spending limit, and clears once nothing is waiting (RANK-22)", async () => {
    store.touch("dart-lang/native#3752");
    await scan(ctx, userId, "test");
    const [job] = await claimJobs(ctx, 1, 60);
    await failJob(ctx, job.id, { code: "credits_exhausted", message: "The project has exceeded its monthly spending cap." });
    const note = (await shownNotifications(ctx, userId))[0];
    expect(note.params).toEqual({});
    expect(pausedText(note.params)).toContain("Ranking resumes automatically when more quota is available. To rank without waiting");
    // The item closes on GitHub while it waits: no item is waiting for basic ranking any more.
    await ctx.db.query(`delete from rank_jobs where user_id = $1 and state = 'queued'`, [userId]);
    await refreshQuotas(ctx);
    expect(await codes()).toEqual([]);
    expect(await ctx.db.one(`select ranking_paused_until from users where id = $1`, [userId])).toEqual({ ranking_paused_until: null });
    await ctx.db.query(`delete from basic_pause`);
  });

  it("stays paused, and logs an error for the owner, when no key is configured", async () => {
    const t = await makeCtx({ geminiMode: "real", basic: { key: null, model: "gemini-decision-1" } });
    await addBasicUser(t.ctx, "n1");
    await scan(t.ctx, "n1", "test");
    expect(await claimJobs(t.ctx, 5, 60)).toHaveLength(0);
    expect((await shownNotifications(t.ctx, "n1")).map((n) => n.code)).toEqual(["basic_paused"]);
  });

  it("has no daily re-rank, which a developer with a ranking agent gets (RANK-9)", async () => {
    await addUser(ctx, "g1");
    await scan(ctx, "g1", "test");
    for (const id of [userId, "g1"]) await ctx.db.query(`update user_items set score = 0.5, ranked_at = now() - interval '25 hours' where user_id = $1`, [id]);
    await ctx.db.query(`delete from rank_jobs`);
    const scheduler = new Scheduler(ctx);
    await (scheduler as any).periodic();
    const batches = await ctx.db.query(`select user_id from rank_batches where reason = 'ageing'`);
    expect(batches.map((b) => b.user_id)).toEqual(["g1"]);
    // Nor while every model of a Gemini key is out of quota: basic ranking never ranks everything again (RANK-17).
    await ctx.db.query(`delete from rank_jobs`);
    await ctx.db.query(`delete from rank_batches`);
    for (const model of ctx.config.models) await ctx.db.query(`insert into gemini_quota (user_id, model, exhausted_until) values ('g1', $1, now() + interval '1 hour')`, [model]);
    (scheduler as any).lastAgeingPass = 0;
    await (scheduler as any).periodic();
    expect(await ctx.db.query(`select 1 from rank_batches where reason = 'ageing'`)).toHaveLength(0);
  });

  it("counts the items ranked each day by choice, agent and model (METRIC-5)", async () => {
    const t = await makeCtx();
    await addBasicUser(t.ctx, "v1"); // basic ranking
    await addUser(t.ctx, "v2"); // a Gemini key out of quota: basic ranking steps in for its new items
    for (const model of t.ctx.config.models) await t.ctx.db.query(`insert into gemini_quota (user_id, model, exhausted_until) values ('v2', $1, now() + interval '1 hour')`, [model]);
    await addUser(t.ctx, "v3"); // a Gemini key with quota
    for (const id of ["v1", "v2", "v3"]) await scan(t.ctx, id, "test");
    const worker = new RankingWorker(t.ctx);
    for (const job of await claimJobs(t.ctx, 12, 60)) await worker.run(job); // 4 for each developer (RANK-11)
    await worker.flushVolume();
    const rows = await t.ctx.db.query(`select choice, agent, model, items from ranking_volume where day = current_date order by choice, agent`);
    expect(rows).toEqual([
      { choice: "basic", agent: "basic", model: "gemini-decision-1", items: 4 },
      { choice: "gemini", agent: "basic", model: "gemini-decision-1", items: 4 },
      { choice: "gemini", agent: "gemini", model: "gemini-3.8-flash", items: 4 },
    ]);
    // A second flush adds to the day's rows.
    for (const job of await claimJobs(t.ctx, 12, 60)) await worker.run(job);
    await worker.flushVolume();
    expect((await t.ctx.db.one(`select sum(items)::int as n from ranking_volume`)).n).toBe(24);
    // The owner reads the last 30 days from the operator endpoint.
    const metrics = await buildInternalApp(t.ctx).inject({ method: "GET", url: "/internal/metrics", headers: { authorization: "Bearer t" } });
    expect(metrics.json().ranking).toHaveLength(3);
    expect(metrics.json().ranking[0]).toMatchObject({ choice: "basic", agent: "basic", model: "gemini-decision-1", items: 8 });
    expect(metrics.json().ranking[0].day).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("choosing basic ranking in Settings (SET-15, SET-38 to SET-40)", () => {
  let ctx: Ctx;
  let store: FixtureStore;
  let hub: RecordingHub;
  let app: FastifyInstance;
  let cookie = "";
  let userId = "";
  const call = (method: string, url: string, payload?: unknown) =>
    app.inject({ method: method as any, url, headers: { "x-gitilizer": "1", cookie }, payload: payload as any });
  const page = { additionalRepos: [], excludedRepos: [], collaborators: [], customPrompt: null, rerank: false };

  beforeAll(async () => {
    ({ ctx, store, hub } = await makeCtx());
    app = buildApp(ctx, new Scheduler(ctx), null);
    const r = await app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload: { name: "Ana", email: "ana@example.com" } });
    cookie = String(r.headers["set-cookie"]).split(";")[0];
    userId = (await call("GET", "/api/me")).json().user.id;
  });

  it("completes setup with a token and no key (\"Advanced setup\", NAV-5)", async () => {
    expect((await call("PUT", "/api/settings", { ...page, credentials: { github_pat: "ghp_x" } })).statusCode).toBe(422); // Gemini, with no key (SET-27)
    expect((await call("PUT", "/api/settings", { ...page, rankingAgent: "basic", credentials: { github_pat: "ghp_x" } })).statusCode).toBe(200);
    expect((await call("GET", "/api/me")).json()).toMatchObject({ screen: "app", rankingAgent: "basic", rankingChosen: true });
    expect((await call("GET", "/api/settings")).json()).toMatchObject({ rankingAgent: "basic", rankedBy: { basic: 0 } });
  });

  it("ignores \"Save and re-rank\", which basic ranking doesn't have (SET-15)", async () => {
    await scan(ctx, userId, "test");
    for (;;) {
      const jobs = await claimJobs(ctx, 50, 60);
      if (!jobs.length) break;
      for (const j of jobs) await completeJob(ctx, j.id, scored);
    }
    expect((await call("PUT", "/api/settings", { ...page, rerank: true })).statusCode).toBe(200);
    expect(await ctx.db.query(`select 1 from rank_batches where reason = 'rerank'`)).toHaveLength(0);
  });

  it("switches to an agent with a typed key, and back without one: a re-rank in progress stops (SET-40)", async () => {
    expect((await call("PUT", "/api/settings", { ...page, rankingAgent: "gemini", credentials: { gemini_key: "AIza-typed" }, rerank: true })).statusCode).toBe(200);
    expect((await call("GET", "/api/me")).json().rankingAgent).toBe("gemini");
    const queued = async () => (await ctx.db.query(`select 1 from rank_jobs where user_id = $1 and state = 'queued' and reason = 'rerank'`, [userId])).length;
    expect(await queued()).toBeGreaterThan(20);
    expect((await call("PUT", "/api/settings", { ...page, rankingAgent: "basic" })).statusCode).toBe(200);
    expect((await call("GET", "/api/me")).json()).toMatchObject({ rankingAgent: "basic", credentials: { gemini_key: { set: true } } });
    expect(await queued()).toBe(0);
    expect(await ctx.db.query(`select 1 from rank_batches where user_id = $1 and finished_at is null and reason = 'rerank'`, [userId])).toHaveLength(0);
  });

  it("lets every saved key be removed, because no agent is in use (SET-39)", async () => {
    expect((await call("PUT", "/api/settings", { ...page, removeCredentials: ["gemini_key"] })).statusCode).toBe(200);
    expect((await call("GET", "/api/me")).json().credentials.gemini_key.set).toBe(false);
  });

  it("clears \"Basic ranking is paused\" at once when a Gemini developer saves a new key, and the waiting item loses its \"–\" (NOTIF-13)", async () => {
    // A Gemini key out of quota, with basic ranking paused too (RANK-22).
    expect((await call("PUT", "/api/settings", { ...page, rankingAgent: "gemini", credentials: { gemini_key: "AIza-free-tier" } })).statusCode).toBe(200);
    for (const model of ctx.config.models) await ctx.db.query(`insert into gemini_quota (user_id, model, exhausted_until) values ($1, $2, now() + interval '1 hour')`, [userId, model]);
    store.touch("dart-lang/native#3752");
    await scan(ctx, userId, "test");
    const [job] = await claimJobs(ctx, 1, 60);
    expect(job).toMatchObject({ choice: "gemini", agent: "basic" });
    await failJob(ctx, job.id, { code: "daily_quota", message: "CreateDecisionRequestsPerDay" });
    const codes = async () => (await shownNotifications(ctx, userId)).map((n) => n.code);
    expect(await codes()).toEqual(["basic_paused"]);
    expect((await listRows(ctx.db, userId)).filter((r) => r.waiting).map((r) => r.key)).toContain(job.itemKey);

    // A key with billing turned on: its own quota, so nothing waits for basic ranking any more.
    hub.lists.length = 0;
    expect((await call("PUT", "/api/settings", { ...page, credentials: { gemini_key: "AIza-paid" } })).statusCode).toBe(200);
    expect(await codes()).toEqual([]);
    expect(await ctx.db.one(`select ranking_paused_until from users where id = $1`, [userId])).toEqual({ ranking_paused_until: null });
    const told = hub.lists.flatMap((e) => e.upserts).find((r) => r.key === job.itemKey);
    expect(told).toMatchObject({ waiting: false });
    const [next] = await claimJobs(ctx, 1, 60);
    expect(next).toMatchObject({ agent: "gemini", model: ctx.config.models[0], apiKey: "AIza-paid" });
  });
});
