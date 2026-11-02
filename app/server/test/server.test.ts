import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { CredentialCipher } from "../src/crypto.ts";
import { openDb } from "../src/db.ts";
import { Hub, type Config, type Ctx } from "../src/context.ts";
import { FixtureGitHub, FixtureStore } from "../src/github/fixtures.ts";
import { classify } from "../src/github/octokit.ts";
import { limitSnapshot } from "../src/github/types.ts";
import { claimJobs, completeJob, failJob } from "../src/jobs.ts";
import { listRows } from "../src/list.ts";
import { shownNotifications } from "../src/notify.ts";
import { discoveryQueries, scan } from "../src/scanner.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const FIXTURES = join(ROOT, "eval", "fixtures");

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
    expect(classify(err(403, "Resource protected by organization SAML enforcement.", { "x-github-sso": "required; url=https://x" })).code).toBe("sso");
    expect(classify(err(403, "Resource not accessible by personal access token")).code).toBe("permission");
    expect(classify(err(502, "Bad gateway")).code).toBe("unavailable");
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

describe("discovery", () => {
  it("builds one search per inclusion reason", () => {
    const qs = discoveryQueries("maya", ["org/team"], ["org/repo"]);
    expect(qs.map((q) => q.reason)).toEqual(["assigned", "created", "mentioned", "review_requested", "review_requested", "mentioned", "interested_repo"]);
    expect(qs.every((q) => q.q.startsWith("is:open archived:false"))).toBe(true);
    expect(qs.find((q) => q.q.includes("team:org/team"))?.handle).toBe("@org/team");
  });
});

// --- Integration: scan → rank → change → close, with fixture GitHub and in-memory Postgres ---

const config: Config = {
  port: 0, internalPort: 0, workerToken: "t", githubMode: "fixtures", geminiMode: "fake", model: "m",
  defaultPrompt: "default", shortLivedSeconds: 0, staleAfterSeconds: 3600,
  intervals: { visible: 300, open: 1800, background: 7200 }, inactiveDays: 14, maxItems: 2000, manualSyncMinSeconds: 0, schedulerTickMs: 1000,
  localMode: false, autoScan: true,
};

describe("scan and rank cycle", () => {
  let ctx: Ctx;
  let store: FixtureStore;
  const userId = "u1";
  const rankAll = async (score = (k: string) => (k.length % 10) / 10) => {
    for (;;) {
      const jobs = await claimJobs(ctx, 50, 60);
      if (!jobs.length) return;
      for (const j of jobs) await completeJob(ctx, j.id, { priority: score(j.itemKey), actionable: true, next_action: "x", reasoning: "y" });
    }
  };

  beforeAll(async () => {
    const db = await openDb(undefined, undefined);
    store = new FixtureStore(FIXTURES, "brianquinlan", ["dart-lang/dart-ecosystem-team"]);
    ctx = {
      db, hub: new Hub(), config, cipher: new CredentialCipher(Buffer.alloc(32, 1).toString("base64")),
      github: () => new FixtureGitHub(store), validateGemini: async () => ({ ok: true, detail: "ok" }), requestScan: () => {},
    };
    await db.query(`insert into users (id, provider, provider_user_id, name, email, setup_completed_at) values ($1, 'dev', 'e', 'B', 'e', now())`, [userId]);
    await db.query(`insert into settings (user_id) values ($1)`, [userId]);
    await db.query(`insert into interested_repos (user_id, full_name, filter) values ($1, 'dart-lang/http', 'not responsible for http2')`, [userId]);
    for (const kind of ["github_pat", "gemini_key"] as const) {
      const { ciphertext, nonce } = ctx.cipher.encrypt(userId, "secret-value-123");
      await db.query(`insert into credentials (user_id, kind, ciphertext, nonce) values ($1, $2, $3, $4)`, [userId, kind, ciphertext, nonce]);
    }
  });

  it("finds items with their reasons and hides them until ranked", async () => {
    const r = await scan(ctx, userId, "test");
    expect(r.outcome).toBe("ok");
    const rows = await listRows(ctx.db, userId);
    expect(rows.length).toBeGreaterThan(20);
    expect(rows.every((x) => x.score === null)).toBe(true);
    const http = rows.find((x) => x.key === "dart-lang/http#2026")!;
    expect(http.reasons).toContain("interested_repo");
    const mention = rows.find((x) => x.reasons.includes("mentioned"))!;
    expect(mention.mentionHandle).toBe("@brianquinlan");
  });

  it("sends the worker everything it needs, including the repository filter", async () => {
    const [job] = await claimJobs(ctx, 1, 60);
    expect(job.user.github_login).toBe("brianquinlan");
    expect(job.user.interested_repos).toEqual([{ repo: "dart-lang/http", filter: "not responsible for http2" }]);
    expect(job.snapshot).toHaveProperty("issue");
    expect(job.geminiKey).toBe("secret-value-123");
    await completeJob(ctx, job.id, { priority: 0.5, actionable: true, next_action: "x", reasoning: "y" });
    await rankAll();
    const rows = await listRows(ctx.db, userId);
    expect(rows.every((x) => x.score !== null)).toBe(true);
    const u = await ctx.db.one(`select first_sync_done, ever_ranked from users where id = $1`, [userId]);
    expect(u).toMatchObject({ first_sync_done: true, ever_ranked: true });
  });

  it("re-ranks only changed items, and removes closed and merged ones with the right reason", async () => {
    store.touch("dart-lang/sdk#48056");
    store.close("dart-lang/http#2034", true);
    store.close("dart-lang/http#1981");
    await scan(ctx, userId, "test");
    const jobs = await claimJobs(ctx, 50, 60);
    expect(jobs.map((j) => j.itemKey)).toEqual(["dart-lang/sdk#48056"]);
    await completeJob(ctx, jobs[0].id, { priority: 0.99, actionable: true, next_action: "x", reasoning: "y" });
    const gone = await ctx.db.query(`select item_key, gone_reason from user_items where status = 'gone' order by item_key`);
    expect(gone).toEqual([
      { item_key: "dart-lang/http#1981", gone_reason: "closed" },
      { item_key: "dart-lang/http#2034", gone_reason: "merged" },
    ]);
  });

  it("returns an iceboxed item only when the change matters and wasn't the developer's (Q-35)", async () => {
    const key = "dart-lang/sdk#38148";
    await ctx.db.query(`update user_items set status = 'iceboxed', iceboxed_at = now() where item_key = $1`, [key]);
    store.touch(key, "brianquinlan"); // my own comment
    await scan(ctx, userId, "test");
    let [job] = await claimJobs(ctx, 5, 60);
    expect(job.thumbsDownAt).not.toBeNull();
    await completeJob(ctx, job.id, { priority: 0.8, actionable: true, next_action: "x", reasoning: "y" });
    expect((await ctx.db.one(`select status from user_items where item_key = $1`, [key])).status).toBe("iceboxed");
    store.touch(key, "kevmoo");
    await scan(ctx, userId, "test");
    [job] = await claimJobs(ctx, 5, 60);
    await completeJob(ctx, job.id, { priority: 0.8, actionable: true, next_action: "x", reasoning: "y" });
    expect((await ctx.db.one(`select status from user_items where item_key = $1`, [key])).status).toBe("active");
  });

  it("pauses ranking on a key problem and shows one notification instead of failing every item", async () => {
    store.touch("dart-lang/sdk#48056");
    store.touch("dart-lang/sdk#59846");
    await scan(ctx, userId, "test");
    const jobs = await claimJobs(ctx, 5, 60);
    expect(jobs).toHaveLength(2);
    await failJob(ctx, jobs[0].id, { code: "key_invalid", message: "API key not valid" });
    expect(await claimJobs(ctx, 5, 60)).toHaveLength(0); // paused
    const notes = await shownNotifications(ctx, userId);
    expect(notes.map((n) => n.code)).toEqual(["gemini_invalid"]);
    expect((await ctx.db.one(`select state from rank_jobs where id = $1`, [jobs[0].id])).state).toBe("queued");
  });

  it("marks an item as failed after repeated item-level failures (Q-28)", async () => {
    await ctx.db.query(`update users set ranking_paused_until = null`);
    let failed = false;
    for (let i = 0; i < 5 && !failed; i++) {
      await ctx.db.query(`update rank_jobs set not_before = now() where state = 'queued'`);
      const jobs = await claimJobs(ctx, 1, 60);
      if (!jobs.length) break;
      await failJob(ctx, jobs[0].id, { code: "invalid_output", message: "bad json" });
      failed = Boolean(await ctx.db.one(`select 1 from user_items where rank_failed`));
    }
    expect(failed).toBe(true);
  });
});
