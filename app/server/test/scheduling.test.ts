// Keeping lists current (PRD SCAN-5 to SCAN-7, LIST-47, METRIC-6, LIVE-30): when scans are due after a failure or a
// rate limit, the time of the last sync, how stale lists are in each state, each token's own search pacing, and the
// cheap answer to "has my list changed?".
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildApp } from "../src/app.ts";
import type { Ctx } from "../src/context.ts";
import { GitHubProblem, type GitHubApi } from "../src/github/types.ts";
import { SEARCH_WAIT_SECONDS, throttleFor } from "../src/github/octokit.ts";
import { syncState } from "../src/jobs.ts";
import { publish } from "../src/list.ts";
import { raise } from "../src/notify.ts";
import { scan } from "../src/scanner.ts";
import {
  PRESENCE_TTL_SECONDS, RETRY_FIRST_SECONDS, Scheduler, retryDelaySeconds, scanDue, stalenessFigures, type ScanHistory, type StalenessRow,
} from "../src/scheduler.ts";
import { addUser, makeCtx } from "./helpers.ts";

const MIN = 60_000;
const NOW = Date.parse("2026-11-26T18:00:00Z");
const history = (h: Partial<ScanHistory>): ScanHistory => ({ lastOk: null, failures: 0, lastFailed: null, retryAt: null, ...h });

describe("when a scheduled scan is due (SCAN-5, SCAN-7)", () => {
  it("waits 1 minute after a failure, doubling with each failure in a row, up to the interval", () => {
    expect([1, 2, 3, 4, 5].map((n) => retryDelaySeconds(n, 300))).toEqual([60, 120, 240, 300, 300]);
    expect([1, 7, 8, 9, 50].map((n) => retryDelaySeconds(n, 7200))).toEqual([60, 3840, 7200, 7200, 7200]);
    expect(RETRY_FIRST_SECONDS).toBe(60);
  });

  it("counts the interval from the last scan that succeeded, not the last one that finished", () => {
    // Visible (5 minutes). Before, a scan that failed 30 s ago put the next one off for another 5 minutes.
    expect(scanDue(history({ lastOk: NOW - 10 * MIN, failures: 1, lastFailed: NOW - 2 * MIN }), 300, NOW)).toBe(true);
    expect(scanDue(history({ lastOk: NOW - 10 * MIN, failures: 1, lastFailed: NOW - 30_000 }), 300, NOW)).toBe(false);
    // Closed (2 hours): a scan that a release cut off is tried again within minutes, not 2 hours.
    expect(scanDue(history({ lastOk: NOW - 125 * MIN, failures: 1, lastFailed: NOW - 61_000 }), 7200, NOW)).toBe(true);
    expect(scanDue(history({ lastOk: NOW - 125 * MIN, failures: 3, lastFailed: NOW - 3 * MIN }), 7200, NOW)).toBe(false);
    expect(scanDue(history({ lastOk: NOW - 125 * MIN, failures: 3, lastFailed: NOW - 4 * MIN }), 7200, NOW)).toBe(true);
    // A successful scan within the interval: nothing is due, whatever failed since.
    expect(scanDue(history({ lastOk: NOW - 3 * MIN, failures: 1, lastFailed: NOW - 2 * MIN }), 300, NOW)).toBe(false);
    expect(scanDue(history({ lastOk: NOW - 6 * MIN }), 300, NOW)).toBe(true);
    // Never scanned: due at once, and backing off like any other after failures.
    expect(scanDue(history({}), 300, NOW)).toBe(true);
    expect(scanDue(history({ failures: 2, lastFailed: NOW - MIN }), 300, NOW)).toBe(false);
  });

  it("starts nothing before a rate limit GitHub told us about has ended", () => {
    expect(scanDue(history({ lastOk: NOW - 60 * MIN, failures: 1, lastFailed: NOW - 5 * MIN, retryAt: NOW + 20 * MIN }), 300, NOW)).toBe(false);
    expect(scanDue(history({ lastOk: NOW - 60 * MIN, failures: 1, lastFailed: NOW - 5 * MIN, retryAt: NOW - 1000 }), 300, NOW)).toBe(true);
  });
});

/** A developer with the app visible in a tab, whose scans the test writes directly, and a scheduler that records its triggers. */
async function scheduled() {
  const { ctx, hub } = await makeCtx();
  await addUser(ctx, "u1");
  await ctx.db.query(`update users set first_sync_done = true where id = 'u1'`);
  const scheduler = new Scheduler(ctx);
  const triggers: string[] = [];
  scheduler.trigger = (userId: string, trigger: string) => { triggers.push(`${userId}:${trigger}`); };
  return { ctx, hub, scheduler, triggers };
}

async function addScan(ctx: Ctx, outcome: string, minutesAgo: number, extra: { errorCode?: string; retryInMinutes?: number; tookMinutes?: number } = {}) {
  await ctx.db.query(
    `insert into scans (user_id, trigger, kind, started_at, finished_at, outcome, error_code, retry_at)
     values ('u1', 'schedule:visible', 'incremental', now() - make_interval(secs => $1), now() - make_interval(secs => $2), $3, $4,
             case when $5::float8 is null then null else now() + make_interval(secs => $5::float8) end)`,
    [(minutesAgo + (extra.tookMinutes ?? 0)) * 60, minutesAgo * 60, outcome, extra.errorCode ?? null, extra.retryInMinutes === undefined ? null : extra.retryInMinutes * 60],
  );
}

describe("the scheduler after a failed scan (SCAN-6, SCAN-7)", () => {
  it("tries a scan that failed again after a minute, instead of after the state's whole interval", async () => {
    const { ctx, scheduler, triggers } = await scheduled();
    await ctx.db.query(`insert into presence (user_id, tab_id, visible) values ('u1', 'tab', false)`); // open, hidden: 30 minutes
    await addScan(ctx, "ok", 40);
    await addScan(ctx, "error", 0.5, { errorCode: "interrupted" }); // cut off by a release
    await scheduler.tick();
    expect(triggers).toEqual([]);
    await ctx.db.query(`update scans set finished_at = now() - interval '61 seconds' where outcome = 'error'`);
    await scheduler.tick();
    expect(triggers).toEqual(["u1:schedule:open"]);
  });

  it("waits for the end of a rate limit, even when the tab becomes visible", async () => {
    const { ctx, scheduler, triggers } = await scheduled();
    await addScan(ctx, "ok", 40);
    await addScan(ctx, "error", 5, { errorCode: "rate_limited", retryInMinutes: 20 });
    await scheduler.report("u1", "tab", true);
    await scheduler.tick();
    expect(triggers).toEqual([]);
    await ctx.db.query(`update scans set retry_at = now() - interval '1 second' where outcome = 'error'`);
    await scheduler.report("u1", "tab", false);
    await scheduler.report("u1", "tab", true);
    expect(triggers).toEqual(["u1:visible"]);
  });

  it("scans at once on becoming visible when the last successful scan is old, even while a retry is waiting (SCAN-6)", async () => {
    const { ctx, scheduler, triggers } = await scheduled();
    await addScan(ctx, "ok", 40);
    await addScan(ctx, "error", 0.2, { errorCode: "unavailable" });
    await scheduler.report("u1", "tab", true);
    expect(triggers).toEqual(["u1:visible"]);
  });

  it("doesn't scan on becoming visible when the last successful scan is recent, whatever failed since", async () => {
    const { ctx, scheduler, triggers } = await scheduled();
    await addScan(ctx, "ok", 3);
    await addScan(ctx, "error", 1, { errorCode: "unavailable" });
    await scheduler.report("u1", "tab", true);
    expect(triggers).toEqual([]);
  });

  it("doesn't scan on becoming visible before GitHub is connected (Warm Welcome)", async () => {
    const { ctx, scheduler, triggers } = await scheduled();
    await ctx.db.query(`delete from credentials where user_id = 'u1' and kind = 'github_pat'`);
    await scheduler.report("u1", "tab", true);
    expect(triggers).toEqual([]);
  });

  it("records when GitHub's rate limit ends on the scan that hit it", async () => {
    const { ctx } = await makeCtx();
    await addUser(ctx, "u1");
    const resetAt = new Date(Date.now() + 15 * MIN).toISOString();
    const limited = { viewer: async () => { throw new GitHubProblem("rate_limited", "API rate limit exceeded", { status: 403, resetAt }); } };
    ctx.github = () => limited as unknown as GitHubApi;
    expect(await scan(ctx, "u1", "schedule:visible")).toMatchObject({ outcome: "error", errorCode: "rate_limited" });
    const row = await ctx.db.one(`select retry_at from scans where user_id = 'u1'`);
    expect(new Date(row.retry_at).toISOString()).toBe(resetAt);
  });

  it("allows a late presence report from a hidden tab before calling the developer away", async () => {
    const { ctx, scheduler } = await scheduled();
    expect(PRESENCE_TTL_SECONDS).toBe(150);
    await scheduler.report("u1", "tab", false);
    await ctx.db.query(`update presence set at = now() - interval '2 minutes'`); // a report 60 s late
    expect(await scheduler.state("u1")).toBe("open");
    await ctx.db.query(`update presence set at = now() - interval '3 minutes'`);
    expect(await scheduler.state("u1")).toBe("away");
  });
});

describe("the time of the last sync (LIST-47)", () => {
  it("is when the last successful scan started, not when it finished, and a failed scan doesn't change it", async () => {
    const { ctx } = await scheduled();
    expect((await syncState(ctx, "u1")).lastSyncedAt).toBeNull();
    await addScan(ctx, "ok", 10, { tookMinutes: 2 });
    const started = await ctx.db.one(`select started_at from scans where outcome = 'ok'`);
    await addScan(ctx, "error", 1, { errorCode: "unavailable" });
    expect((await syncState(ctx, "u1")).lastSyncedAt).toBe(new Date(started.started_at).toISOString());
  });
});

describe("how stale lists are (METRIC-6)", () => {
  const row = (state: StalenessRow["state"], minutesAgo: number | null, over: Partial<StalenessRow> = {}): StalenessRow => ({
    state, lastOkStarted: minutesAgo === null ? null : NOW - minutesAgo * MIN, firstSyncDone: true, blocked: false, inactive: false, ...over,
  });

  it("gives the median and the greatest age for each state, leaving out lists no scan can bring up to date", () => {
    const f = stalenessFigures([
      row("visible", 2), row("visible", 4), row("visible", 9), row("visible", 3),
      row("visible", 500, { blocked: true }), // GitHub can't be read at all (LIST-43)
      row("visible", 500, { firstSyncDone: false }),
      row("open", 20),
      row("away", 90), row("away", 1000, { inactive: true }), row("away", null),
    ], NOW);
    expect(f.visible).toEqual({ developers: 4, medianSeconds: 210, maxSeconds: 540 });
    expect(f.open).toEqual({ developers: 1, medianSeconds: 1200, maxSeconds: 1200 });
    expect(f.away).toEqual({ developers: 1, medianSeconds: 5400, maxSeconds: 5400 });
    expect(stalenessFigures([], NOW).open).toEqual({ developers: 0 });
  });

  afterEach(() => { vi.restoreAllMocks(); });

  it("logs one line a minute for each state, with no developer in it", async () => {
    const { ctx, scheduler } = await scheduled();
    await addScan(ctx, "ok", 7);
    await scheduler.report("u1", "tab", true);
    await addUser(ctx, "u2");
    await ctx.db.query(`update users set first_sync_done = true where id = 'u2'`);
    await raise(ctx, "u2", "github_connection_ended"); // left out
    const lines: string[] = [];
    vi.spyOn(process.stdout, "write").mockImplementation((s) => { lines.push(String(s)); return true; });
    await scheduler.tick();
    await scheduler.tick(); // within the minute: no more lines
    const staleness = lines.filter((l) => l.includes("list staleness"));
    expect(staleness).toHaveLength(3);
    const visible = staleness.find((l) => l.includes("state=visible"))!;
    expect(visible).toMatch(/developers=1 medianSeconds=4\d\d maxSeconds=4\d\d/);
    expect(staleness.find((l) => l.includes("state=away"))).toMatch(/developers=0$/m);
    expect(staleness.join("")).not.toMatch(/u1|u2/);
  });
});

describe("each token's own search pacing (design: Scanner, \"Search budget\")", () => {
  it("keys the plugin's limiters by token, without putting the token in the key", () => {
    const a = throttleFor("ghp_aaaaaaaaaaaaaaaaaaaa");
    expect(a.id).toBe(throttleFor("ghp_aaaaaaaaaaaaaaaaaaaa").id);
    expect(a.id).not.toBe(throttleFor("ghp_bbbbbbbbbbbbbbbbbbbb").id);
    expect(a.id).not.toContain("aaaa");
  });

  it("waits once for the search limit to reset, and ends the scan for any other rate limit", () => {
    const { onRateLimit } = throttleFor("t");
    const search = { method: "GET", url: "https://api.github.com/search/issues?q=x" };
    expect(onRateLimit(40, search, null, 0)).toBe(true);
    expect(onRateLimit(40, search, null, 1)).toBe(false);
    expect(onRateLimit(SEARCH_WAIT_SECONDS + 1, search, null, 0)).toBe(false);
    expect(onRateLimit(40, { method: "GET", url: "https://api.github.com/repos/o/r/issues/1" }, null, 0)).toBe(false);
  });
});

describe("GET /api/list?known= (LIVE-30)", () => {
  it("answers unchanged when the tab already has the latest version, and the whole list otherwise", async () => {
    const { ctx } = await makeCtx();
    const app = buildApp(ctx, new Scheduler(ctx), null);
    const r = await app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload: { name: "Maya", email: "maya@example.com" } });
    const cookie = String(r.headers["set-cookie"]).split(";")[0];
    const get = async (url: string) => (await app.inject({ method: "GET", url, headers: { cookie } })).json();
    const userId = (await get("/api/me")).user.id as string;
    await scan(ctx, userId, "manual");
    await publish(ctx, userId, [], [{ key: "x/y#1", reason: "closed" }]);
    const full = await get("/api/list");
    expect(full.version).toBeGreaterThan(0);
    expect(await get(`/api/list?known=${full.version}`)).toEqual({ version: full.version, items: [], unchanged: true });
    const older = await get(`/api/list?known=${full.version - 1}`);
    expect(older.unchanged).toBeUndefined();
    expect(older.items).toEqual(full.items);
    await app.close();
  });
});
