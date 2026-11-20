// Row indicators and their timing (PRD LIVE-18, LIVE-22).
import { describe, expect, it } from "vitest";
import { addIndicators, clearIndicators, fadeDelay, FADE_MS, INDICATOR_MS, MOVE_MS, REDUCED_MS } from "./indicators.ts";

describe("timing", () => {
  it("rows move in 0.7 s and indicators fade over 2.5 s after that, so they're kept for 3.2 s", () => {
    expect([MOVE_MS, REDUCED_MS, FADE_MS, INDICATOR_MS]).toEqual([700, 150, 2500, 3200]);
  });

  it("the fade starts once the row is in place, or part-way through for a row that comes into view later", () => {
    const ind = { text: "↑2", seq: 1, at: 10_000 };
    expect(fadeDelay(ind, 10_000, false)).toBe(700);
    expect(fadeDelay(ind, 10_000, true)).toBe(150);
    expect(fadeDelay(ind, 11_000, false)).toBe(-300);
  });
});

describe("adding and clearing", () => {
  it("numbers each indicator and stamps it with the time", () => {
    const r = addIndicators({}, { a: "↑2", b: "New" }, 4, 1000);
    expect(r.next).toEqual({ a: { text: "↑2", seq: 5, at: 1000 }, b: { text: "New", seq: 6, at: 1000 } });
    expect(r.added).toEqual(r.next);
    expect(r.seq).toBe(6);
  });

  it("clears an indicator when its time is up", () => {
    const first = addIndicators({ c: { text: "↓1", seq: 1, at: 0 } }, { a: "↑2" }, 1, 1000);
    expect(clearIndicators(first.next, first.added)).toEqual({ c: { text: "↓1", seq: 1, at: 0 } });
  });

  it("keeps a row's newer indicator when the earlier change's time is up", () => {
    const first = addIndicators({}, { a: "↑2" }, 0, 1000);
    const second = addIndicators(first.next, { a: "↑1" }, first.seq, 2000);
    expect(clearIndicators(second.next, first.added)).toEqual({ a: { text: "↑1", seq: 2, at: 2000 } });
    expect(clearIndicators(clearIndicators(second.next, first.added), second.added)).toEqual({});
  });
});
