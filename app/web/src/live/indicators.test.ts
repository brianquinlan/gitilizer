// Row indicators and their timing (PRD LIVE-18, LIVE-22).
import { describe, expect, it } from "vitest";
import { addIndicators, expireIndicators, fadeDelay, FADE_MS, HOLD_MS, INDICATOR_MS, MOVE_MS, REDUCED_MS } from "./indicators.ts";

describe("timing", () => {
  it("rows move in 0.7 s; indicators hold for 10 s and then fade over 2.5 s", () => {
    expect([MOVE_MS, REDUCED_MS, HOLD_MS, FADE_MS, INDICATOR_MS]).toEqual([700, 150, 10_000, 2500, 12_500]);
  });

  it("the fade starts after the hold, or part-way through for a row that comes into view later", () => {
    const ind = { text: "↑2", seq: 1, at: 10_000 };
    expect(fadeDelay(ind, 10_000)).toBe(10_000);
    expect(fadeDelay(ind, 21_000)).toBe(-1000);
  });
});

describe("adding and expiring", () => {
  it("numbers each indicator and stamps it with the time", () => {
    const r = addIndicators({}, { a: "↑2", b: "New" }, 4, 1000);
    expect(r.next).toEqual({ a: { text: "↑2", seq: 5, at: 1000 }, b: { text: "New", seq: 6, at: 1000 } });
    expect(r.seq).toBe(6);
  });

  it("a new change to a row replaces its indicator and restarts its time", () => {
    const first = addIndicators({}, { a: "↑2" }, 0, 1000);
    const second = addIndicators(first.next, { a: "↑1" }, first.seq, 5000);
    expect(second.next).toEqual({ a: { text: "↑1", seq: 2, at: 5000 } });
    expect(expireIndicators(second.next, 1000 + INDICATOR_MS)).toEqual(second.next);
    expect(expireIndicators(second.next, 5000 + INDICATOR_MS)).toEqual({});
  });

  it("removes only indicators that have finished fading, and keeps the same object when none have", () => {
    const { next } = addIndicators({ c: { text: "↓1", seq: 1, at: 0 } }, { a: "↑2" }, 1, 1000);
    expect(expireIndicators(next, INDICATOR_MS)).toEqual({ a: { text: "↑2", seq: 2, at: 1000 } });
    expect(expireIndicators(next, INDICATOR_MS - 1)).toBe(next);
  });
});
