import { describe, expect, it } from "vitest";
import type { ItemRow } from "@gitilizer/shared";
import { DEFAULT_SORT_PRIORITIZED } from "@gitilizer/shared";
import { apply, clampPage, finalize, init, nextBatch, own, PAGE_SIZE, ranks, receive, rowsFor, sortRows } from "./engine.ts";

const row = (n: number, score: number | null, extra: Partial<ItemRow> = {}): ItemRow => ({
  key: `o/r#${n}`, repo: "o/r", number: n, kind: n % 2 ? "issue" : "pr", title: `Item ${n}`, htmlUrl: "",
  updatedAt: `2026-10-${String(10 + (n % 20)).padStart(2, "0")}T00:00:00Z`, reasons: ["assigned"], mentionHandle: null,
  status: "active", iceboxedAt: null, score, rankFailed: false, waitingForQuota: false, ...extra,
});

const ordered = (s: ReturnType<typeof init>) =>
  sortRows(rowsFor(s.shown, "prioritized"), DEFAULT_SORT_PRIORITIZED).map((r) => r.number);

describe("live update engine", () => {
  it("queues server changes and leaves the screen alone until applied", () => {
    let s = init([row(1, 0.9), row(2, 0.5), row(3, 0.1)], 1);
    s = receive(s, { version: 2, bulk: false, upserts: [row(3, 0.95)], removals: [] });
    expect(ordered(s)).toEqual([1, 2, 3]);
    expect(s.queue).toHaveLength(1);
    const r = apply(s, nextBatch(s));
    expect(ordered(r.state)).toEqual([3, 1, 2]);
    expect(r.indicators).toEqual({ "o/r#3": "↑2" }); // only the moved item gets an indicator (LIVE-18)
  });

  it("marks new items 'New' and hides unranked ones (LIST-30)", () => {
    let s = init([row(1, 0.9)], 1);
    s = receive(s, { version: 2, bulk: false, upserts: [row(5, null)], removals: [] });
    let r = apply(s, nextBatch(s));
    expect(ordered(r.state)).toEqual([1]);
    s = receive(r.state, { version: 3, bulk: false, upserts: [row(5, 0.95)], removals: [] });
    r = apply(s, nextBatch(s));
    expect(ordered(r.state)).toEqual([5, 1]);
    expect(r.indicators["o/r#5"]).toBe("New");
  });

  it("coalesces several changes to one item into one queued change", () => {
    let s = init([row(1, 0.9), row(2, 0.5)], 1);
    s = receive(s, { version: 2, bulk: false, upserts: [row(2, 0.6)], removals: [] });
    s = receive(s, { version: 3, bulk: false, upserts: [row(2, 0.95)], removals: [] });
    expect(s.queue).toHaveLength(1);
  });

  it("applies more than 5 waiting changes together (LIVE-9)", () => {
    let s = init(Array.from({ length: 10 }, (_, i) => row(i + 1, 0.5 - i * 0.01)), 1);
    s = receive(s, { version: 2, bulk: false, upserts: [1, 2, 3, 4, 5, 6].map((n) => row(n, 0.01 * n)), removals: [] });
    expect(nextBatch(s)).toHaveLength(6);
    s = receive(init([row(1, 0.9)], 1), { version: 2, bulk: false, upserts: [row(1, 0.8), row(2, 0.7)], removals: [] });
    expect(nextBatch(s)).toHaveLength(1);
  });

  it("shows a leave label, then removes the row and pulls the next item up (LIVE-3, LIVE-15)", () => {
    let s = init(Array.from({ length: 30 }, (_, i) => row(i + 1, 1 - i * 0.01)), 1);
    s = receive(s, { version: 2, bulk: false, upserts: [], removals: [{ key: "o/r#3", reason: "closed" }] });
    const r = apply(s, nextBatch(s));
    expect(r.state.shown["o/r#3"].leaving).toBe("Closed");
    expect(r.leaving).toEqual(["o/r#3"]);
    const done = finalize(r.state, r.leaving);
    const page1 = ordered(done).slice(0, PAGE_SIZE);
    expect(page1).toHaveLength(PAGE_SIZE);
    expect(page1).not.toContain(3);
    expect(page1[PAGE_SIZE - 1]).toBe(26); // the next item entered page 1
  });

  it("keeps the page unless it no longer exists (LIVE-2)", () => {
    expect(clampPage(2, 30)).toBe(2);
    expect(clampPage(2, 25)).toBe(1);
    expect(clampPage(3, 0)).toBe(1);
  });

  it("applies the developer's own action immediately and drops queued changes for it (LIVE-7)", () => {
    let s = init([row(1, 0.9), row(2, 0.5)], 1);
    s = receive(s, { version: 2, bulk: false, upserts: [row(2, 0.95)], removals: [] });
    s = own(s, "o/r#2", { ...row(2, 0.5), status: "iceboxed", iceboxedAt: "2026-10-31T00:00:00Z" }, "Moved to Icebox");
    expect(s.queue).toHaveLength(0);
    expect(s.shown["o/r#2"].leaving).toBe("Moved to Icebox");
    s = finalize(s, ["o/r#2"]);
    expect(rowsFor(s.shown, "icebox").map((r) => r.number)).toEqual([2]);
    expect(ordered(s)).toEqual([1]);
  });

  it("sorts by type with PRs first, ties by number (LIST-7, LIST-8)", () => {
    const s = init([row(3, 0.1), row(2, 0.2), row(1, 0.3), row(4, 0.4)], 1);
    const sorted = sortRows(rowsFor(s.shown, "prioritized"), { column: "type", dir: "asc" });
    expect(sorted.map((r) => r.number)).toEqual([2, 4, 1, 3]);
  });

  it("keeps a leaving row in its place until it collapses", () => {
    let s = init([row(1, 0.9), row(2, 0.5), row(3, 0.1)], 1);
    s = receive(s, { version: 2, bulk: false, upserts: [], removals: [{ key: "o/r#2", reason: "merged" }] });
    const r = apply(s, nextBatch(s));
    expect(ordered(r.state)).toEqual([1, 2, 3]);
    expect(ranks(r.state.shown)).toEqual({ "o/r#1": 1, "o/r#3": 2 }); // rank numbers already updated (LIVE-17)
  });

  it("ignores events older than what it has", () => {
    const s = init([row(1, 0.9)], 5);
    expect(receive(s, { version: 4, bulk: false, upserts: [row(1, 0.1)], removals: [] })).toBe(s);
  });

  it("applies a bulk re-rank in one step without indicators (LIVE-24)", () => {
    let s = init([row(1, 0.9), row(2, 0.5), row(3, 0.1)], 1);
    s = receive(s, { version: 2, bulk: true, upserts: [row(3, 0.95), row(1, 0.2)], removals: [] });
    expect(nextBatch(s)).toHaveLength(2);
    const r = apply(s, nextBatch(s));
    expect(ordered(r.state)).toEqual([3, 2, 1]);
    expect(r.indicators).toEqual({});
  });

  it("drops an item pushed past the 1,000-item limit without a label (LIVE-26)", () => {
    let s = init([row(1, 0.9), row(2, 0.5)], 1);
    s = receive(s, { version: 2, bulk: false, upserts: [], removals: [{ key: "o/r#2", reason: "over_limit" }] });
    const r = apply(s, nextBatch(s));
    expect(r.leaving).toEqual([]);
    expect(ordered(r.state)).toEqual([1]);
  });

  it("shows items waiting for quota and failed items after ranked ones, newest first (LIST-30)", () => {
    const s = init([row(1, 0.1), row(2, null, { waitingForQuota: true, updatedAt: "2026-10-01T00:00:00Z" }),
      row(3, null, { rankFailed: true, updatedAt: "2026-10-05T00:00:00Z" }), row(4, null)], 1);
    expect(ordered(s)).toEqual([1, 3, 2]);
  });

  it("lets an item the Icebox check sent back leave the Icebox with a label (ICE-9)", () => {
    let s = init([row(1, 0.4, { status: "iceboxed", iceboxedAt: "2026-10-01T00:00:00Z" })], 1);
    s = receive(s, { version: 2, bulk: false, upserts: [row(1, 0.4)], removals: [] });
    const r = apply(s, nextBatch(s));
    expect(r.state.shown["o/r#1"].leaving).toBe("Back in your list");
    expect(rowsFor(finalize(r.state, r.leaving).shown, "prioritized").map((x) => x.number)).toEqual([1]);
  });
});
