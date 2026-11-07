// Only the newest release running does background work (design: Deployment, D-14).
import { describe, expect, it } from "vitest";
import { ReleaseGate } from "../src/release.ts";
import { scan } from "../src/scanner.ts";
import { Scheduler } from "../src/scheduler.ts";
import { RankingWorker } from "../src/worker.ts";
import { addUser, makeCtx } from "./helpers.ts";

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("which release does background work", () => {
  it("is the release started most recently, among those still running", async () => {
    const { ctx } = await makeCtx();
    const old = new ReleaseGate(ctx.db, "aaa111", 0);
    await old.start();
    expect(await old.isCurrent()).toBe(true);
    await pause(10);
    const next = new ReleaseGate(ctx.db, "bbb222", 0);
    await next.start();
    expect(await old.isCurrent()).toBe(false); // the previous revision lingering after a release
    expect(await next.isCurrent()).toBe(true);

    // Cloud Run restarting the old revision's instance doesn't hand the work back.
    const restarted = new ReleaseGate(ctx.db, "aaa111", 0);
    await restarted.start();
    expect(await restarted.isCurrent()).toBe(false);

    // Once the newer release has stopped (or stopped sending heartbeats), the older one resumes.
    await ctx.db.query(`update processes set heartbeat_at = now() - interval '2 minutes' where release = 'bbb222'`);
    expect(await old.isCurrent()).toBe(true);
    await next.stop();
    expect(await ctx.db.query(`select release from processes order by release`)).toEqual([{ release: "aaa111" }, { release: "aaa111" }]);
    await old.stop();
    await restarted.stop();
  });

  it("always includes a process that doesn't know its release, and records nothing for it", async () => {
    const { ctx } = await makeCtx();
    const local = new ReleaseGate(ctx.db, null, 0);
    await local.start();
    await new ReleaseGate(ctx.db, "bbb222", 0).start();
    expect(await local.isCurrent()).toBe(true);
    expect(await ctx.db.query(`select release from processes`)).toEqual([{ release: "bbb222" }]);
  });

  it("keeps two processes of the same release working, as when production is split", async () => {
    const { ctx } = await makeCtx();
    const api = new ReleaseGate(ctx.db, "bbb222", 0);
    const worker = new ReleaseGate(ctx.db, "bbb222", 0);
    await api.start();
    await worker.start();
    expect([await api.isCurrent(), await worker.isCurrent()]).toEqual([true, true]);
  });
});

describe("a process whose release isn't current", () => {
  it("claims no scans and gives up the periodic pass", async () => {
    const { ctx } = await makeCtx({ autoScan: false }); // only the scan asked for below
    await addUser(ctx);
    let current = true;
    ctx.isCurrentRelease = async () => current;
    const s = new Scheduler(ctx);
    await s.tick();
    expect(await ctx.db.one(`select holder from leases where name = 'scheduler'`)).toEqual({ holder: s.id });
    current = false;
    await s.tick();
    expect(await ctx.db.one(`select holder from leases where name = 'scheduler'`)).toBeUndefined();
    s.trigger("u1", "manual");
    await pause(300);
    expect(await ctx.db.one(`select count(*)::int as n from scans`)).toEqual({ n: 0 });
    expect(await ctx.db.query(`select trigger from scan_requests`)).toEqual([{ trigger: "manual" }]); // left for the current release
    await s.stop();
  });

  it("claims no ranking jobs", async () => {
    const { ctx } = await makeCtx();
    await addUser(ctx, "w1");
    await scan(ctx, "w1", "test");
    const queued = async () => (await ctx.db.one(`select count(*)::int as n from rank_jobs where state = 'queued'`)).n;
    const before = await queued();
    expect(before).toBeGreaterThan(0);
    ctx.isCurrentRelease = async () => false;
    const worker = new RankingWorker(ctx, { idleMs: 20 });
    worker.start();
    await pause(300);
    await worker.stop();
    expect(await queued()).toBe(before);
  });
});
