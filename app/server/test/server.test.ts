import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { parseLogin, parseRepo, type SettingsUpdate } from "@gitilizer/shared";
import { Allowlist, loadAllowlist, type SignInIdentity } from "../src/allowlist.ts";
import { buildApp, settingsErrors } from "../src/app.ts";
import { pgText } from "../src/db.ts";
import type { Ctx } from "../src/context.ts";
import { FixtureGitHub, type FixtureStore } from "../src/github/fixtures.ts";
import { classify, OctokitGitHub, partialResultOrgIds } from "../src/github/octokit.ts";
import { limitSnapshot } from "../src/github/types.ts";
import { claimJobs, completeJob, failJob, nextPacificMidnight, pushSync, queueFullRerank, reapLeases, refreshQuotas, SYNC_PUSH_MS, syncState } from "../src/jobs.ts";
import { listRows } from "../src/list.ts";
import { shownNotifications } from "../src/notify.ts";
import { discoveryQueries, reapScans, scan } from "../src/scanner.ts";
import { Scheduler } from "../src/scheduler.ts";
import { GEMINI_TIMEOUT_MS, RankingWorker } from "../src/worker.ts";
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
    expect(perm).toMatchObject({ code: "permission", details: { permission: "PRs" } });
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

describe("expired ranking leases (GitHub issue #3)", () => {
  it("re-queues a job whose lease expired, fails it after 3, and logs a warning each time", async () => {
    const { ctx } = await makeCtx();
    await addUser(ctx, "u1");
    await scan(ctx, "u1", "test");
    const written: string[] = [];
    const spy = vi.spyOn(process.stderr, "write").mockImplementation((s) => { written.push(String(s)); return true; });
    try {
      let id: number | null = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        const [job] = await claimJobs(ctx, 1, 60);
        id ??= job.id;
        expect(job.id).toBe(id);
        await ctx.db.query(`update rank_jobs set lease_expires_at = now() - interval '1 second' where id = $1`, [id]);
        await reapLeases(ctx);
      }
      const j = await ctx.db.one(`select state, error_code, item_key from rank_jobs where id = $1`, [id]);
      expect(j).toMatchObject({ state: "failed", error_code: "lease_expired" });
      expect((await ctx.db.one(`select rank_failed from user_items where item_key = $1`, [j.item_key])).rank_failed).toBe(true);
      expect((await shownNotifications(ctx, "u1")).map((n) => n.code)).toContain("items_unranked");
      const warnings = written.filter((l) => l.includes("ranking lease expired"));
      expect(warnings).toHaveLength(3);
      expect(warnings[2]).toContain("failed=true");
    } finally {
      spy.mockRestore();
    }
  });
});

describe("the worker's Gemini timeout", () => {
  it("is well inside the 120 s lease, so a slow answer is retried instead of failing the item", () => {
    expect(GEMINI_TIMEOUT_MS).toBeLessThanOrEqual(90_000);
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

describe("Warm Welcome's Save (WEL-4, POST /api/setup)", () => {
  let ctx: Ctx;
  let app: ReturnType<typeof buildApp>;
  let cookie = "";
  const call = (method: string, url: string, payload?: unknown) =>
    app.inject({ method: method as any, url, headers: { "x-gitilizer": "1", cookie }, payload: payload as any });
  const saved = async () => (await ctx.db.query(`select kind from credentials order by kind`)).map((r) => r.kind);

  beforeAll(async () => {
    ({ ctx } = await makeCtx());
    app = buildApp(ctx, new Scheduler(ctx), null);
    const r = await app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload: { name: "Sam", email: "sam@example.com" } });
    cookie = String(r.headers["set-cookie"]).split(";")[0];
  });

  it("needs both credentials", async () => {
    expect((await call("POST", "/api/setup", { credentials: { github_pat: "ghp_x", gemini_key: "  " } })).statusCode).toBe(422);
    expect(await saved()).toEqual([]);
  });

  it("saves nothing when one credential fails, and says which (Q-82)", async () => {
    const r = await call("POST", "/api/setup", { credentials: { github_pat: "ghp_x", gemini_key: "bad-key" } });
    expect(r.statusCode).toBe(200);
    expect(r.json()).toEqual({
      ok: false,
      results: { github_pat: { ok: true, code: "ok", login: "brianquinlan" }, gemini_key: { ok: false, code: "not_accepted" } },
    });
    expect(await saved()).toEqual([]);
    expect((await call("GET", "/api/me")).json().screen).toBe("welcome");
  });

  it("checks a value saved from Settings no more, and completes setup when both pass (NAV-8)", async () => {
    const check = vi.spyOn(ctx, "validateGemini");
    await call("PUT", "/api/settings", { additionalRepos: [], collaborators: [], customPrompt: null, rerank: false, credentials: { gemini_key: "AIza-saved" } });
    expect((await call("GET", "/api/me")).json().screen).toBe("welcome");
    const r = await call("POST", "/api/setup", { credentials: { github_pat: " ghp_x " } });
    expect(r.json()).toEqual({ ok: true, results: { github_pat: { ok: true, code: "ok", login: "brianquinlan" } } });
    expect(check).not.toHaveBeenCalled();
    expect(await saved()).toEqual(["gemini_key", "github_pat"]);
    const me = (await call("GET", "/api/me")).json();
    expect(me.screen).toBe("app");
    expect(me.credentials.github_pat).toMatchObject({ set: true, chip: "connected" });
  });

  it("is refused once setup is complete (NAV-2)", async () => {
    expect((await call("POST", "/api/setup", { credentials: { github_pat: "ghp_y", gemini_key: "AIza-y" } })).statusCode).toBe(409);
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

// --- Interrupted scans ---

describe("interrupted scans", () => {
  it("closes a scan whose process stopped, so the next scan can run (SCAN-4)", async () => {
    const { ctx } = await makeCtx();
    await addUser(ctx);
    const open = (age: string) => ctx.db.query(
      `insert into scans (user_id, trigger, kind, started_at) values ('u1', 'credentials', 'full', now() - $1::interval)`, [age],
    );
    await open("10 minutes");
    // A scan already open blocks a new one.
    expect((await scan(ctx, "u1", "manual")).outcome).toBe("skipped");
    expect(await reapScans(ctx)).toBe(1);
    expect(await ctx.db.one(`select outcome, error_code from scans order by id limit 1`)).toEqual({ outcome: "error", error_code: "interrupted" });
    expect((await scan(ctx, "u1", "manual")).outcome).toBe("ok");

    // A scan that is still alive is left alone, except at a local-mode start, where none can be.
    await open("30 seconds");
    expect(await reapScans(ctx)).toBe(0);
    expect(await reapScans(ctx, true)).toBe(1);
  });
});

describe("GitHub client (F24, F25)", () => {
  /** A client whose requests are answered by `answer` instead of GitHub; returns the routes and queries asked for. */
  const fake = (answer: (route: string, params: any) => any) => {
    const gh = new OctokitGitHub("ghp_test");
    const asked: string[] = [];
    (gh as any).req = async (route: string, params: any = {}) => {
      asked.push(params.q ? `${route} ${params.q}` : route);
      return { data: await answer(route, params), headers: {} };
    };
    return { gh, asked };
  };
  const raw = (n: number, updated: string, pr: boolean) => ({
    number: n, repository_url: "https://api.github.com/repos/o/r", title: `#${n}`, html_url: `https://github.com/o/r/issues/${n}`,
    state: "open", updated_at: updated, ...(pr ? { pull_request: { merged_at: null } } : {}),
  });

  it("searches issues and PRs separately and merges them newest first, because GitHub needs the kind", async () => {
    const { gh, asked } = fake((_route, p) => {
      const items = / is:issue$/.test(p.q)
        ? [raw(1, "2026-11-02T10:00:00Z", false), raw(2, "2026-11-01T10:00:00Z", false)]
        : [raw(3, "2026-11-02T12:00:00Z", true), raw(4, "2026-10-30T10:00:00Z", true)];
      return { total_count: items.length, items };
    });
    const r = await gh.search("is:open assignee:me", 3);
    expect(asked).toEqual(["GET /search/issues is:open assignee:me is:issue", "GET /search/issues is:open assignee:me is:pull-request"]);
    expect(r.hits.map((h) => h.number)).toEqual([3, 1, 2]);
    expect(r.total).toBe(4);
    expect(r.ssoOrgs).toBeUndefined();

    asked.length = 0;
    await gh.search("is:open is:pr assignee:me", 3);
    expect(asked).toEqual(["GET /search/issues is:open is:pr assignee:me"]);
  });

  it("looks up each repository once, and doesn't remember a failed lookup", async () => {
    let fail = true;
    const { gh, asked } = fake((route) => {
      if (route === "GET /repos/x/broken" && fail) throw new Error("down");
      return { full_name: route.slice(11) };
    });
    const repo = (name: string) => (gh as any).repoData(name);
    await Promise.all([repo("o/r"), repo("o/r"), repo("O/R")]);
    expect(asked).toEqual(["GET /repos/o/r"]);
    await expect(repo("x/broken")).rejects.toThrow("down");
    fail = false;
    await repo("x/broken");
    expect(asked.filter((a) => a === "GET /repos/x/broken")).toHaveLength(2);
  });

  it("queues each item for ranking while the scan is still downloading, and keeps the first sync open until it ends (LIST-15, LIST-32)", async () => {
    const { ctx, store } = await makeCtx();
    await addUser(ctx, "q1");
    const gh = new FixtureGitHub(store);
    const queuedAt: number[] = [];
    const batchClosed: boolean[] = [];
    const rankQueued = async () => {
      for (const j of await claimJobs(ctx, 50, 60)) await completeJob(ctx, j.id, { priority: 0.5, actionable: true, next_action: "x", reasoning: "y" });
    };
    const firstSync = async () => ctx.db.one(
      `select b.finished_at, u.first_sync_done from rank_batches b join users u on u.id = b.user_id where b.user_id = 'q1' and b.reason = 'first_sync'`,
    );
    const real = gh.snapshot.bind(gh);
    gh.snapshot = async (repo, number) => {
      queuedAt.push((await ctx.db.one(`select count(*)::int as n from rank_jobs where user_id = 'q1'`)).n);
      // Rank everything queued so far, as the worker would while the scan runs.
      await rankQueued();
      batchClosed.push((await firstSync()).finished_at !== null);
      return real(repo, number);
    };
    ctx.github = () => gh;
    await scan(ctx, "q1", "test");
    expect(queuedAt.length).toBeGreaterThan(5);
    expect(queuedAt).toEqual(queuedAt.map((_, i) => i));
    // The ranker kept up with the downloads, but the first sync stays open until the scan has finished.
    expect(batchClosed.every((closed) => !closed)).toBe(true);
    expect(await firstSync()).toMatchObject({ finished_at: null, first_sync_done: false });
    await rankQueued();
    expect(await firstSync()).toMatchObject({ first_sync_done: true });
    expect((await firstSync()).finished_at).not.toBeNull();
  });
});

describe("storing GitHub content", () => {
  it("replaces characters Postgres can't store instead of failing the scan", async () => {
    expect(pgText("a\u0000b")).toBe("a\uFFFDb");
    expect(pgText("lone \ud800 and \udc00")).toBe("lone \uFFFD and \uFFFD");
    expect(pgText("pair \ud83d\ude00 kept")).toBe("pair \ud83d\ude00 kept");

    const { ctx, store } = await makeCtx();
    await addUser(ctx, "n1");
    const gh = new FixtureGitHub(store);
    const real = gh.snapshot.bind(gh);
    gh.snapshot = async (repo, number) => {
      const snap = await real(repo, number);
      return { ...snap, issue: { ...snap.issue, body: "before\u0000after \ud800" } };
    };
    ctx.github = () => gh;
    expect(await scan(ctx, "n1", "test")).toMatchObject({ outcome: "ok" });
    const row = await ctx.db.one(`select snapshot->'issue'->>'body' as body from items limit 1`);
    expect(row.body).toBe("before\uFFFDafter \uFFFD");
  });
});

describe("sync progress (LIST-33)", () => {
  const items = async (ctx: Ctx, u: string) => (await ctx.db.one(`select count(*)::int as n from user_items where user_id = $1`, [u])).n;
  const rankAll = async (ctx: Ctx) => {
    for (;;) {
      const jobs = await claimJobs(ctx, 50, 60);
      if (!jobs.length) return;
      for (const j of jobs) await completeJob(ctx, j.id, { priority: 0.5, actionable: true, next_action: "x", reasoning: "y" });
    }
  };

  it("counts what a full scan has found, then counts down what is left to rank", async () => {
    const { ctx, store } = await makeCtx();
    await addUser(ctx, "p1");
    const gh = new FixtureGitHub(store);
    const whileFinding: unknown[] = [];
    const whileDownloading: unknown[] = [];
    const search = gh.search.bind(gh);
    gh.search = async (q, limit) => { whileFinding.push((await syncState(ctx, "p1")).progress); return search(q, limit); };
    const snapshot = gh.snapshot.bind(gh);
    let n = 0;
    gh.snapshot = async (repo, number) => {
      whileDownloading.push((await syncState(ctx, "p1")).progress);
      // Rank some of what is queued, as the worker would while the scan runs.
      if (n++ % 3 === 2) await rankAll(ctx);
      return snapshot(repo, number);
    };
    ctx.github = () => gh;
    await scan(ctx, "p1", "test");
    const total = await items(ctx, "p1");

    expect(whileFinding[0]).toEqual({ phase: "finding", found: null });
    const counts = whileFinding.slice(1).map((p: any) => p.found);
    expect(counts.length).toBeGreaterThan(3);
    expect(counts).toEqual([...counts].sort((a, b) => a - b)); // only goes up
    expect((await ctx.db.one(`select found from scans where user_id = 'p1'`)).found).toBe(total);

    // Every item is counted once, before and after its download: the count only falls as items are ranked.
    const ranked = async () => (await ctx.db.one(`select count(*)::int as n from user_items where user_id = 'p1' and score is not null`)).n;
    expect(whileDownloading[0]).toEqual({ phase: "ranking", left: total, waiting: false });
    const lefts = whileDownloading.map((p: any) => p.left);
    expect(lefts).toEqual([...lefts].sort((a, b) => b - a));
    expect(await syncState(ctx, "p1")).toMatchObject({ running: true, progress: { phase: "ranking", left: total - (await ranked()) } });

    await rankAll(ctx);
    expect(await syncState(ctx, "p1")).toMatchObject({ running: false, progress: null });
  });

  it("says ranking is waiting only when every open job is held back by a delay", async () => {
    const { ctx } = await makeCtx();
    await addUser(ctx, "p2");
    await scan(ctx, "p2", "test");
    const total = await items(ctx, "p2");
    const [job] = await claimJobs(ctx, 1, 60);
    await failJob(ctx, job.id, { code: "rate_limited", message: "429", retryAfterSeconds: 60 });
    expect((await syncState(ctx, "p2")).progress).toMatchObject({ waiting: false }); // others can still run
    await ctx.db.query(`update rank_jobs set not_before = now() + interval '1 minute' where user_id = 'p2' and state = 'queued'`);
    expect((await syncState(ctx, "p2")).progress).toMatchObject({ phase: "ranking", left: total, waiting: true });
    // Out of quota for every model: the sync is finished, and nothing is left to rank (LIST-32).
    await ctx.db.query(`update users set ranking_paused_until = now() + interval '1 hour', ranking_paused_code = 'daily_quota' where id = 'p2'`);
    expect(await syncState(ctx, "p2")).toMatchObject({ running: false, progress: null });
  });

  it("counts 'Save and re-rank' as a sync but not the daily re-rank, which it takes over (LIST-16, RANK-9)", async () => {
    const { ctx, hub } = await makeCtx();
    await addUser(ctx, "p3");
    await scan(ctx, "p3", "test");
    await rankAll(ctx);
    const total = await items(ctx, "p3");
    expect(await queueFullRerank(ctx, "p3", "ageing")).toBe(total);
    for (const j of await claimJobs(ctx, 2, 60)) await completeJob(ctx, j.id, { priority: 0.1, actionable: true, next_action: "x", reasoning: "y" });
    expect(await syncState(ctx, "p3")).toMatchObject({ running: false, progress: null });

    hub.lists.length = 0;
    await queueFullRerank(ctx, "p3", "rerank");
    // The two the daily re-rank finished are published now; the rest belong to "Save and re-rank".
    expect(hub.lists).toHaveLength(1);
    expect(hub.lists[0]).toMatchObject({ bulk: true });
    expect(hub.lists[0].upserts).toHaveLength(2);
    expect(await syncState(ctx, "p3")).toMatchObject({ running: true, progress: { phase: "ranking", left: total, waiting: false } });
    await rankAll(ctx);
    expect(await syncState(ctx, "p3")).toMatchObject({ running: false });
    expect(hub.lists.at(-1)!.upserts).toHaveLength(total);
  });

  it("sends at most one sync event every 2 s, the latest at the end of the window, unless told to send now", async () => {
    const { ctx, hub } = await makeCtx();
    await addUser(ctx, "p4");
    hub.syncs.length = 0;
    await pushSync(ctx, "p4");
    await pushSync(ctx, "p4");
    await pushSync(ctx, "p4");
    expect(hub.syncs).toHaveLength(1);
    await new Promise((r) => setTimeout(r, SYNC_PUSH_MS + 300));
    expect(hub.syncs).toHaveLength(2);
    await pushSync(ctx, "p4", { now: true });
    expect(hub.syncs).toHaveLength(3);
  });
});
