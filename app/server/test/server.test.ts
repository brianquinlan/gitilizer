import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { parseLogin, parseRepo, type SettingsUpdate } from "@gitilizer/shared";
import { Allowlist, loadAllowlist, type SignInIdentity } from "../src/allowlist.ts";
import { buildApp, settingsErrors } from "../src/app.ts";
import type { Ctx } from "../src/context.ts";
import type { FixtureStore } from "../src/github/fixtures.ts";
import { classify, partialResultOrgIds } from "../src/github/octokit.ts";
import { limitSnapshot } from "../src/github/types.ts";
import { claimJobs, completeJob, failJob, nextPacificMidnight, queueFullRerank, refreshQuotas } from "../src/jobs.ts";
import { listRows } from "../src/list.ts";
import { shownNotifications } from "../src/notify.ts";
import { discoveryQueries, scan } from "../src/scanner.ts";
import { Scheduler } from "../src/scheduler.ts";
import { RankingWorker } from "../src/worker.ts";
import { addUser, FIXTURES, makeCtx, MODELS, type RecordingHub } from "./helpers.ts";

describe("GitHub error classification (PRD catalogue)", () => {
  const err = (status: number, message: string, headers: Record<string, string> = {}) => ({ status, response: { headers, data: { message } } });
  it("tells an expired token from an invalid one", () => {
    expect(classify(err(401, "Bad credentials"), "2020-01-01T00:00:00Z").code).toBe("expired");
    expect(classify(err(401, "Bad credentials"), null).code).toBe("invalid");
  });
  it("detects rate limits, org token policies, SSO, permissions and outages", () => {
    const rl = classify(err(403, "API rate limit exceeded", { "x-ratelimit-remaining": "0", "x-ratelimit-reset": "1800000000" }));
    expect(rl.code).toBe("rate_limited");
    expect(rl.details.resetAt).toBe("2027-01-15T08:00:00.000Z");
    const org = classify(err(403, "The `dart-lang` organization forbids access via a personal access token (classic). Please use a GitHub App, OAuth App, or a personal access token with fine-grained permissions."));
    expect(org.code).toBe("org_blocks_token");
    expect(org.details).toMatchObject({ org: "dart-lang", tokenType: "classic" });
    const sso = classify(err(403, "Resource protected by organization SAML enforcement.", { "x-github-sso": "required; url=https://github.com/orgs/acme/sso?authorization_request=x" }));
    expect(sso).toMatchObject({ code: "sso", details: { org: "acme" } });
    const perm = classify(err(403, "Resource not accessible by personal access token", { "x-accepted-github-permissions": "pull_requests=read" }));
    expect(perm).toMatchObject({ code: "permission", details: { permission: "Pull requests" } });
    expect(classify(err(502, "Bad gateway")).code).toBe("unavailable");
    expect(partialResultOrgIds("partial-results; organizations=21955855,20582480")).toEqual(["21955855", "20582480"]);
    expect(partialResultOrgIds("required; url=https://github.com/orgs/acme/sso")).toEqual([]);
    expect(classify(new Error("ECONNRESET")).code).toBe("unavailable");
  });
});

describe("snapshot limits", () => {
  it("drops unrelated 'stacked above' PRs for a PR from a fork (the 20 MB snapshot bug)", () => {
    const raw = JSON.parse(readFileSync(join(FIXTURES, "dart-lang__http__579.json"), "utf8"));
    expect(raw.stack.above.length).toBeGreaterThan(100);
    const limited = limitSnapshot(raw);
    expect(limited.stack.above).toEqual([]);
    expect(JSON.stringify(limited).length).toBeLessThan(1_000_000);
    expect(limited.fetch_warnings.join(" ")).toMatch(/unrelated PRs/);
  });
  it("trims very long arrays and says so", () => {
    const snap = { timeline: Array.from({ length: 400 }, (_, i) => ({ i })), fetch_warnings: [] };
    const out = limitSnapshot(snap);
    expect(out.timeline).toHaveLength(300);
    expect(out.timeline[0].i).toBe(0);
    expect(out.timeline[299].i).toBe(399);
  });
});

describe("discovery (LIST-1)", () => {
  it("builds one search per inclusion reason, personal review requests only", () => {
    const qs = discoveryQueries("maya", ["org/repo"]);
    expect(qs.map((q) => q.reason)).toEqual(["review_requested", "assigned", "mentioned", "created", "commented", "additional_repo"]);
    expect(qs.map((q) => q.q.split(" ").pop())).toEqual(["user-review-requested:maya", "assignee:maya", "mentions:maya", "author:maya", "commenter:maya", "repo:org/repo"]);
    expect(qs.every((q) => q.q.startsWith("is:open archived:false"))).toBe(true);
    expect(qs.some((q) => /team/.test(q.q))).toBe(false);
  });
  it("reads everything updated since the last scan in an incremental scan", () => {
    const qs = discoveryQueries("maya", [], "2026-11-01T10:00:00Z");
    expect(qs.every((q) => q.q.startsWith("archived:false updated:>=2026-11-01T10:00:00Z"))).toBe(true);
  });
});

describe("settings rules (SET-7, SET-25, SET-27)", () => {
  it("accepts owner/name and GitHub URLs", () => {
    expect(parseRepo("northstar/web")).toBe("northstar/web");
    expect(parseRepo(" https://github.com/dart-lang/http/issues/12 ")).toBe("dart-lang/http");
    expect(parseRepo("github.com/dart-lang/http.git")).toBe("dart-lang/http");
    expect(parseRepo("dart-lang")).toBeNull();
    expect(parseRepo("https://gitlab.com/a/b")).toBeNull();
  });
  it("strips a leading @ from usernames", () => {
    expect(parseLogin("@jordanlee")).toBe("jordanlee");
    expect(parseLogin("not a user")).toBeNull();
  });
  it("reports problems next to their fields", () => {
    const s: SettingsUpdate = {
      additionalRepos: [{ fullName: "a/b", prioritizationPrompt: "" }, { fullName: "A/B", prioritizationPrompt: "x".repeat(501) }],
      collaborators: ["kevmoo", "@KevMoo"], customPrompt: "y".repeat(20_001), rerank: false,
    };
    expect(settingsErrors(s)).toEqual([
      { field: "repo-A-B", message: "A/B is already in your list." },
      { field: "repo-A-B", message: "A prioritization prompt can be at most 500 characters. This one has 501." },
      { field: "add-collaborator", message: "KevMoo is already a collaborator." },
      { field: "ranking-prompt", message: "A prompt can be at most 20,000 characters. This one has 20,001." },
    ]);
  });
});

describe("quota resets", () => {
  it("are at midnight Pacific time", () => {
    // 2026-11-02 08:00 UTC is midnight in Los Angeles (PST, UTC-8).
    expect(nextPacificMidnight(new Date("2026-11-01T20:30:00Z")).toISOString()).toBe("2026-11-02T08:00:00.000Z");
    expect(nextPacificMidnight(new Date("2026-07-01T06:59:00Z")).toISOString()).toBe("2026-07-01T07:00:00.000Z");
  });
});

// --- Integration: scan → rank → change → close, with fixture GitHub and in-memory Postgres ---

describe("scan and rank cycle", () => {
  let ctx: Ctx;
  let store: FixtureStore;
  let hub: RecordingHub;
  const userId = "u1";
  const rank = (j: { id: number }, priority = 0.5) => completeJob(ctx, j.id, { priority, actionable: true, next_action: "x", reasoning: "y" });
  const rankAll = async (score = (k: string) => (k.length % 10) / 10) => {
    for (;;) {
      const jobs = await claimJobs(ctx, 50, 60);
      if (!jobs.length) return;
      for (const j of jobs) {
        if (j.kind === "icebox_check") await completeJob(ctx, j.id, { bring_back: false, reason: "test" });
        else await rank(j, score(j.itemKey));
      }
    }
  };
  const status = async (key: string) => (await ctx.db.one(`select status, gone_reason from user_items where item_key = $1`, [key]));
  const codes = async () => (await shownNotifications(ctx, userId)).map((n) => n.code);

  beforeAll(async () => {
    ({ ctx, store, hub } = await makeCtx());
    await addUser(ctx, userId);
    await ctx.db.query(`insert into additional_repos (user_id, full_name, prioritization_prompt) values ($1, 'dart-lang/http', 'not responsible for http2')`, [userId]);
  });

  it("finds items with their reasons and hides them until ranked", async () => {
    const r = await scan(ctx, userId, "test");
    expect(r).toMatchObject({ outcome: "ok", kind: "full" });
    const rows = await listRows(ctx.db, userId);
    expect(rows.length).toBe(27);
    expect(rows.every((x) => x.score === null)).toBe(true);
    expect(rows.find((x) => x.key === "dart-lang/http#2026")!.reasons).toContain("additional_repo");
    expect(rows.find((x) => x.reasons.includes("mentioned"))!.mentionHandle).toBe("@brianquinlan");
    expect(rows.find((x) => x.key === "googleapis/google-cloud-dart#360")!.reasons).toEqual(["commented"]);
    expect((await ctx.db.one(`select access from additional_repos`)).access).toBe("ok");
  });

  it("sends the worker one item with everything it needs, at most 4 at a time per developer (RANK-11)", async () => {
    const jobs = await claimJobs(ctx, 50, 60);
    expect(jobs).toHaveLength(4);
    const [job] = jobs;
    expect(job).toMatchObject({ kind: "rank", model: MODELS[0], geminiKey: "secret-value-123" });
    expect(job.user).toEqual({ github_login: "brianquinlan", additional_repos: [{ repo: "dart-lang/http", prioritization_prompt: "not responsible for http2" }], collaborators: [] });
    expect(job.snapshot).toHaveProperty("issue");
    expect(await claimJobs(ctx, 50, 60)).toHaveLength(0);
    for (const j of jobs) await rank(j);
  });

  it("fills in the first sync without indicators, then marks it done (LIST-15, LIVE-24)", async () => {
    hub.lists.length = 0;
    await rankAll();
    expect(hub.lists.length).toBeGreaterThan(5);
    expect(hub.lists.every((e) => e.bulk)).toBe(true);
    const rows = await listRows(ctx.db, userId);
    expect(rows.every((x) => x.score !== null)).toBe(true);
    expect(await ctx.db.one(`select first_sync_done from users where id = $1`, [userId])).toEqual({ first_sync_done: true });
    expect((await ctx.db.one(`select ranked_model from user_items limit 1`)).ranked_model).toBe(MODELS[0]);
  });

  it("re-ranks changed and linked items, and removes closed and merged ones in an incremental scan (RANK-10, SCAN-2)", async () => {
    hub.lists.length = 0;
    store.touch("dart-lang/http#1932"); // links to dart-lang/http#2034, which is about to be merged
    store.touch("dart-lang/native#3752"); // links to dart-lang/native#3763
    store.close("dart-lang/http#2034", true);
    store.close("dart-lang/http#1981");
    const r = await scan(ctx, userId, "test");
    expect(r.kind).toBe("incremental");
    const jobs = await claimJobs(ctx, 50, 60);
    expect(jobs.map((j) => [j.itemKey, j.reason]).sort()).toEqual([
      ["dart-lang/http#1932", "changed"], ["dart-lang/native#3752", "changed"], ["dart-lang/native#3763", "linked"],
    ]);
    for (const j of jobs) await rank(j, 0.9);
    expect(await status("dart-lang/http#2034")).toEqual({ status: "gone", gone_reason: "merged" });
    expect(await status("dart-lang/http#1981")).toEqual({ status: "gone", gone_reason: "closed" });
    expect(hub.lists.some((e) => e.removals.some((x) => x.key === "dart-lang/http#2034" && x.reason === "merged"))).toBe(true);
    expect(hub.lists.filter((e) => e.upserts.length).every((e) => !e.bulk)).toBe(true);
  });

  it("asks the Icebox check about a changed iceboxed item, and brings it back on yes (ICE-6)", async () => {
    const key = "dart-lang/sdk#38148";
    await ctx.db.query(`update user_items set status = 'iceboxed', iceboxed_at = now() where item_key = $1`, [key]);
    store.touch(key, "dependabot[bot]", "Bumped a dependency.");
    await scan(ctx, userId, "test");
    let [job] = await claimJobs(ctx, 5, 60);
    expect(job).toMatchObject({ kind: "icebox_check", itemKey: key });
    expect(job.iceboxedAt).not.toBeNull();
    await completeJob(ctx, job.id, { bring_back: false, reason: "a bot's comment" });
    expect((await status(key)).status).toBe("iceboxed");
    await scan(ctx, userId, "test");
    expect(await claimJobs(ctx, 5, 60)).toHaveLength(0); // the same change isn't checked twice
    store.touch(key, "kevmoo", "This is a critical security issue.");
    await scan(ctx, userId, "test");
    [job] = await claimJobs(ctx, 5, 60);
    await completeJob(ctx, job.id, { bring_back: true, reason: "important" });
    expect((await status(key)).status).toBe("active");
    [job] = await claimJobs(ctx, 5, 60);
    expect(job).toMatchObject({ kind: "rank", itemKey: key, reason: "changed" });
    await rank(job);
  });

  it("removes an Icebox item that is no longer eligible (ICE-11)", async () => {
    const key = "dart-lang/sdk#48056";
    await ctx.db.query(`update user_items set status = 'iceboxed', iceboxed_at = now() where item_key = $1`, [key]);
    store.close(key);
    await scan(ctx, userId, "test");
    expect(await status(key)).toEqual({ status: "gone", gone_reason: "closed" });
  });

  it("keeps only the 1,000 most recently updated items (LIST-19, LIVE-26)", async () => {
    const active = (await listRows(ctx.db, userId)).filter((r) => r.status === "active");
    ctx.config.maxItems = active.length - 2;
    await scan(ctx, userId, "manual");
    ctx.config.maxItems = 1000;
    const over = await ctx.db.query(`select item_key from user_items where gone_reason = 'over_limit'`);
    expect(over).toHaveLength(2);
    const oldest = [...active].sort((a, b) => (a.updatedAt < b.updatedAt ? -1 : 1)).slice(0, 2).map((r) => r.key).sort();
    expect(over.map((r) => r.item_key).sort()).toEqual(oldest);
    await scan(ctx, userId, "manual"); // room again: they come back as new items
    await rankAll();
    expect(await ctx.db.query(`select 1 from user_items where gone_reason = 'over_limit' and status = 'gone'`)).toHaveLength(0);
  });

  it("publishes a bulk re-rank once, when it has finished (LIVE-24)", async () => {
    hub.lists.length = 0;
    const n = await queueFullRerank(ctx, userId, "rerank");
    expect(n).toBeGreaterThan(20);
    for (let i = 0; i < 3; i++) for (const j of await claimJobs(ctx, 50, 60)) await rank(j, 0.3);
    expect(hub.lists).toHaveLength(0);
    await rankAll(() => 0.3);
    expect(hub.lists).toHaveLength(1);
    expect(hub.lists[0]).toMatchObject({ bulk: true });
    expect(hub.lists[0].upserts.length).toBe(n);
  });

  it("falls back to the backup models as daily quotas run out, then pauses (RANK-13 to RANK-15)", async () => {
    store.touch("dart-lang/native#3752");
    store.touch("dart-lang/native#3763");
    store.touch("dart-lang/http#2026");
    await scan(ctx, userId, "test");
    let [job] = await claimJobs(ctx, 1, 60);
    expect(job.model).toBe(MODELS[0]);
    await failJob(ctx, job.id, { code: "daily_quota", message: "GenerateRequestsPerDayPerProjectPerModel-FreeTier" });
    expect(await codes()).toEqual(["gemini_backup_model"]);
    const note = (await shownNotifications(ctx, userId))[0];
    expect(note.params).toMatchObject({ primaryModel: MODELS[0], model: MODELS[1] });
    [job] = await claimJobs(ctx, 1, 60);
    expect(job.model).toBe(MODELS[1]);
    await rank(job);
    expect(await codes()).toEqual(["gemini_backup_model"]); // still on the backup
    [job] = await claimJobs(ctx, 1, 60);
    await failJob(ctx, job.id, { code: "daily_quota", message: "per day" });
    [job] = await claimJobs(ctx, 1, 60);
    expect(job.model).toBe(MODELS[2]);
    await failJob(ctx, job.id, { code: "daily_quota", message: "per day" });
    expect(await codes()).toEqual(["gemini_daily_quota"]);
    expect(await claimJobs(ctx, 5, 60)).toHaveLength(0);
    const waiting = (await listRows(ctx.db, userId)).filter((r) => r.waitingForQuota);
    expect(waiting.length).toBe(2);
    // Midnight Pacific: every quota resets and the primary model comes back.
    await ctx.db.query(`update gemini_quota set exhausted_until = now() - interval '1 second'`);
    await ctx.db.query(`update users set ranking_paused_until = now() - interval '1 second'`);
    await refreshQuotas(ctx);
    expect(await codes()).toEqual([]);
    expect((await listRows(ctx.db, userId)).filter((r) => r.waitingForQuota)).toHaveLength(0);
    [job] = await claimJobs(ctx, 1, 60);
    expect(job.model).toBe(MODELS[0]);
    await rankAll();
  });

  it("pauses ranking on a key problem and shows one notification instead of failing every item", async () => {
    store.touch("dart-lang/native#3752");
    store.touch("dart-lang/http#2026");
    await scan(ctx, userId, "test");
    const jobs = await claimJobs(ctx, 5, 60);
    expect(jobs.length).toBeGreaterThanOrEqual(2);
    await failJob(ctx, jobs[0].id, { code: "key_invalid", message: "API key not valid" });
    expect(await claimJobs(ctx, 5, 60)).toHaveLength(0); // paused
    expect(await codes()).toEqual(["gemini_invalid"]);
    expect((await ctx.db.one(`select state from rank_jobs where id = $1`, [jobs[0].id])).state).toBe("queued");
    for (const j of jobs.slice(1)) await rank(j);
  });

  it("marks an item as failed after repeated item-level failures and warns about it (LIST-30)", async () => {
    await ctx.db.query(`update users set ranking_paused_until = null, ranking_paused_code = null`);
    await ctx.db.query(`delete from notifications`);
    let failed = false;
    for (let i = 0; i < 5 && !failed; i++) {
      await ctx.db.query(`update rank_jobs set not_before = now() where state = 'queued'`);
      const jobs = await claimJobs(ctx, 1, 60);
      if (!jobs.length) break;
      await failJob(ctx, jobs[0].id, { code: "invalid_output", message: "bad json" });
      failed = Boolean(await ctx.db.one(`select 1 from user_items where rank_failed`));
    }
    expect(failed).toBe(true);
    const n = (await shownNotifications(ctx, userId)).find((x) => x.code === "items_unranked");
    expect(n?.params).toEqual({ n: "1" });
  });
});

// --- HTTP API ---

describe("HTTP API", () => {
  let ctx: Ctx;
  let app: ReturnType<typeof buildApp>;
  let cookie = "";
  const H = () => ({ "x-gitilizer": "1", cookie });
  const call = (method: string, url: string, payload?: unknown) => app.inject({ method: method as any, url, headers: H(), payload: payload as any });

  beforeAll(async () => {
    ({ ctx } = await makeCtx());
    const scheduler = new Scheduler(ctx);
    app = buildApp(ctx, scheduler, null);
    const r = await app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload: { name: "Maya", email: "maya@example.com" } });
    cookie = String(r.headers["set-cookie"]).split(";")[0];
  });

  it("saves settings and credentials without validating, then completes setup (SET-14, SET-29, NAV-8)", async () => {
    const r = await call("PUT", "/api/settings", {
      additionalRepos: [{ fullName: "https://github.com/dart-lang/http", prioritizationPrompt: "Security issues only" }],
      collaborators: ["@kevmoo", "nobody-xyz"], customPrompt: null, rerank: false,
      credentials: { github_pat: "ghp_whatever-123", gemini_key: "AIza-whatever" },
    });
    expect(r.statusCode).toBe(200);
    const me = (await call("GET", "/api/me")).json();
    expect(me.screen).toBe("app");
    expect(me.credentials.github_pat).toMatchObject({ set: true, chip: "connected" });
    // The save starts a scan, which checks the new repository and collaborators (SET-8, SET-19).
    let s;
    for (let i = 0; i < 50; i++) {
      s = (await call("GET", "/api/settings")).json();
      if (s.additionalRepos[0].access !== "checking" && s.collaborators.every((c: any) => c.status !== "unknown")) break;
      await new Promise((r) => setTimeout(r, 50));
    }
    expect(s.additionalRepos).toEqual([{ fullName: "dart-lang/http", prioritizationPrompt: "Security issues only", access: "ok", tokenType: null }]);
    expect(s.collaborators).toEqual([
      { login: "kevmoo", status: "ok", avatarUrl: "https://github.com/kevmoo.png?size=64" },
      { login: "nobody-xyz", status: "not_found", avatarUrl: null },
    ]);
  });

  it("refuses a save with problems and says which field (SET-27)", async () => {
    const r = await call("PUT", "/api/settings", { additionalRepos: [{ fullName: "nope", prioritizationPrompt: "" }], collaborators: [], customPrompt: null, rerank: false });
    expect(r.statusCode).toBe(422);
    expect(r.json().errors).toEqual([{ field: "add-repository", message: "Enter a repository as owner/name or paste its GitHub URL." }]);
  });

  it("checks a typed credential without saving it (SET-2, SET-28)", async () => {
    expect((await call("POST", "/api/credentials/gemini_key/check", { value: "bad-key" })).json()).toEqual({ ok: false, code: "not_accepted" });
    expect((await call("POST", "/api/credentials/github_pat/check", { value: "ghp_x" })).json()).toEqual({ ok: true, code: "ok", login: "brianquinlan" });
    expect((await call("POST", "/api/credentials/github_pat/validate", {})).statusCode).toBe(404);
  });

  it("never refuses Sync now (LIST-28)", async () => {
    expect((await call("POST", "/api/sync")).statusCode).toBe(202);
    expect((await call("POST", "/api/sync")).statusCode).toBe(202);
  });

  it("marks notifications as seen when the popover opens (NOTIF-17)", async () => {
    const me = (await call("GET", "/api/me")).json();
    await ctx.db.query(`insert into notifications (user_id, code, shown) values ($1, 'gemini_invalid', true)`, [me.user.id]);
    expect((await call("GET", "/api/notifications")).json()[0].seen).toBe(false);
    expect((await call("GET", "/api/me")).json().credentials.gemini_key.chip).toBe("not_working");
    await call("POST", "/api/notifications/seen", {});
    expect((await call("GET", "/api/notifications")).json()[0].seen).toBe(true);
  });

  it("deletes the account only with confirm: true, and remembers its ID (SET-17, PRIV-4)", async () => {
    const me = (await call("GET", "/api/me")).json();
    expect((await call("DELETE", "/api/account", { confirm: "delete" })).statusCode).toBe(400);
    expect((await call("DELETE", "/api/account", { confirm: true })).statusCode).toBe(200);
    expect(await ctx.db.query(`select id from deleted_users`)).toEqual([{ id: me.user.id }]);
    expect(await ctx.db.query(`select 1 from users where id = $1`, [me.user.id])).toHaveLength(0);
    expect((await call("GET", "/api/me")).statusCode).toBe(401);
  });
});

// --- The ranking worker, in-process (design: Ranking worker) ---

describe("ranking worker", () => {
  it("ranks a first sync with the fake model, and turns a Gemini failure into a paused queue", async () => {
    const { ctx, store } = await makeCtx();
    await addUser(ctx, "w1");
    await scan(ctx, "w1", "test");
    const worker = new RankingWorker(ctx, { idleMs: 20 });
    worker.start();
    for (let i = 0; i < 100; i++) {
      if ((await ctx.db.one(`select first_sync_done from users where id = 'w1'`)).first_sync_done) break;
      await new Promise((r) => setTimeout(r, 50));
    }
    await worker.stop();
    const rows = await listRows(ctx.db, "w1");
    expect(rows.every((r) => r.score !== null)).toBe(true);
    expect((await ctx.db.one(`select ranked_model from user_items limit 1`)).ranked_model).toBe(MODELS[0]);

    store.touch("dart-lang/native#3752");
    await scan(ctx, "w1", "test");
    const failing = new RankingWorker(ctx, { llm: () => ({ generate: () => Promise.reject(Object.assign(new Error("API key not valid [reason: API_KEY_INVALID]"), { status: 400 })) }) });
    const [job] = await claimJobs(ctx, 1, 60);
    await failing.run(job);
    expect((await shownNotifications(ctx, "w1")).map((n) => n.code)).toEqual(["gemini_invalid"]);
    expect(await claimJobs(ctx, 5, 60)).toHaveLength(0); // paused until the key changes
  });
});

// --- Sign-in allowlist (PRD NFR-12, Q-80; contributor/DEPLOYMENT.md) ---

describe("sign-in allowlist", () => {
  const who = (over: Partial<SignInIdentity>): SignInIdentity => ({
    provider: "google", providerUserId: "1", email: "x@example.com", emailVerified: true, login: null, ...over,
  });

  it("reads entries separated by spaces, commas or new lines, and refuses malformed ones", () => {
    const list = Allowlist.parse("google:Maya@Example.com, github:@OctoCat\n github-id:583231");
    expect([...list.emails]).toEqual(["maya@example.com"]);
    expect([...list.logins]).toEqual(["octocat"]);
    expect([...list.githubIds]).toEqual(["583231"]);
    expect(() => Allowlist.parse("google:maya@example.com maya@example.com github-id:abc")).toThrow(
      /"maya@example\.com", "github-id:abc"/,
    );
    expect(() => Allowlist.parse("github:-bad-")).toThrow(/github:-bad-/);
  });

  it("is required in the development environment and optional elsewhere", () => {
    expect(() => loadAllowlist({ GITILIZER_ENV: "development" })).toThrow(/needs SIGN_IN_ALLOWLIST/);
    expect(() => loadAllowlist({ GITILIZER_ENV: "development", SIGN_IN_ALLOWLIST: "  " })).toThrow(/needs SIGN_IN_ALLOWLIST/);
    expect(loadAllowlist({ GITILIZER_ENV: "development", SIGN_IN_ALLOWLIST: "github:octocat" })?.size).toBe(1);
    expect(loadAllowlist({ GITILIZER_ENV: "production" })).toBeNull();
    expect(loadAllowlist({})).toBeNull();
  });

  it("matches Google by verified email and GitHub by username or ID", () => {
    const list = Allowlist.parse("google:maya@example.com github:octocat github-id:42");
    expect(list.allows(who({ email: "MAYA@example.com" }))).toBe(true);
    expect(list.allows(who({ email: "maya@example.com", emailVerified: false }))).toBe(false);
    expect(list.allows(who({ email: "sam@example.com" }))).toBe(false);
    expect(list.allows(who({ provider: "github", providerUserId: "7", login: "OctoCat" }))).toBe(true);
    expect(list.allows(who({ provider: "github", providerUserId: "42", login: "renamed" }))).toBe(true);
    expect(list.allows(who({ provider: "github", providerUserId: "7", login: "someone" }))).toBe(false);
    // A GitHub account's email never matches a google: entry.
    expect(list.allows(who({ provider: "github", providerUserId: "7", email: "maya@example.com", login: "someone" }))).toBe(false);
  });

  it("refuses sign-in without creating an account, and ends the sessions of removed accounts", async () => {
    const { ctx } = await makeCtx({ allowlist: Allowlist.parse("google:maya@example.com github:octocat") });
    const app = buildApp(ctx, new Scheduler(ctx), null);
    const signIn = (payload: object) => app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload });
    const users = async () => (await ctx.db.one(`select count(*)::int as n from users`)).n;

    const maya = await signIn({ name: "Maya", email: "maya@example.com" });
    expect(maya.statusCode).toBe(200);
    const octo = await signIn({ provider: "github", name: "Octo", email: "octo@example.com", login: "OctoCat" });
    expect(octo.statusCode).toBe(200);
    expect(await ctx.db.one(`select sign_in_login from users where provider = 'github'`)).toEqual({ sign_in_login: "OctoCat" });
    expect(await users()).toBe(2);

    const sam = await signIn({ name: "Sam", email: "sam@example.com" });
    expect(sam.statusCode).toBe(403);
    expect(sam.json()).toEqual({ error: "not_allowed" });
    expect(sam.headers["set-cookie"]).toBeUndefined();
    expect(await users()).toBe(2);

    // Removing Maya from the list (a new revision in Cloud Run) ends her sessions at her next request.
    const cookie = String(maya.headers["set-cookie"]).split(";")[0];
    const me = () => app.inject({ method: "GET", url: "/api/me", headers: { cookie } });
    expect((await me()).statusCode).toBe(200);
    ctx.config.allowlist = Allowlist.parse("github:octocat");
    const after = await me();
    expect(after.statusCode).toBe(401);
    expect(after.json()).toEqual({ error: "not_allowed" });
    expect(await ctx.db.one(`select count(*)::int as n from sessions s join users u on u.id = s.user_id where u.email = 'maya@example.com'`)).toEqual({ n: 0 });
    expect((await signIn({ name: "Maya", email: "maya@example.com" })).statusCode).toBe(403);
    // Her account and settings stay, so adding her back restores everything.
    expect(await users()).toBe(2);
    await app.close();
  });
});
