import { describe, expect, it } from "vitest";
import type { SyncEvent, SyncProgress } from "@gitilizer/shared";
import { initProgress, progressText, receiveSync, step, type ProgressView } from "./syncProgress.ts";

const ev = (progress: SyncProgress | null, running = progress !== null): SyncEvent => ({ running, lastFinishedAt: null, progress });
const finding = (found: number | null) => ev({ phase: "finding", found });
const ranking = (left: number, waiting = false) => ev({ phase: "ranking", left, waiting });

/** Feeds events at the given times, running any due steps in between, as the hook does. */
function run(events: [number, SyncEvent][], until: number) {
  let v: ProgressView = initProgress();
  const shown: [number, string | null][] = [];
  const record = (t: number) => { if (!shown.length || shown[shown.length - 1][1] !== v.text) shown.push([t, v.text]); };
  let i = 0;
  let next: number | null = null;
  for (let t = 0; t <= until; t += 100) {
    while (i < events.length && events[i][0] <= t) { v = receiveSync(v, events[i][1], t); ({ view: v, next } = step(v, t)); record(t); i++; }
    if (next !== null && t >= next) { ({ view: v, next } = step(v, t)); record(t); }
  }
  return shown;
}

describe("sync progress text (LIST-33)", () => {
  it("words each phase, and shows nothing when nothing is left", () => {
    expect(progressText({ phase: "finding", found: null }, false)).toBe("Finding issues and PRs…");
    expect(progressText({ phase: "finding", found: 120 }, false)).toBe("Finding issues and PRs… 120 so far");
    expect(progressText({ phase: "ranking", left: 212, waiting: false }, false)).toBe("212 left to rank");
    expect(progressText({ phase: "ranking", left: 48, waiting: true }, true)).toBe("48 left to rank · waiting for Gemini");
    expect(progressText({ phase: "ranking", left: 0, waiting: false }, false)).toBeNull();
    expect(progressText(null, false)).toBeNull();
  });

  it("shows the first text at once, then changes at most every 2 s with the latest count", () => {
    const shown = run([[0, finding(null)], [300, finding(40)], [600, finding(90)], [2500, ranking(90)], [2700, ranking(89)], [3000, ranking(88)]], 8000);
    expect(shown).toEqual([
      [0, "Finding issues and PRs…"],
      [2000, "Finding issues and PRs… 90 so far"],
      [4000, "88 left to rank"],
    ]);
  });

  it("clears at once when the sync finishes, even inside the 2 s window", () => {
    const shown = run([[0, ranking(3)], [500, ranking(1)], [900, ev(null, false)]], 4000);
    expect(shown).toEqual([[0, "3 left to rank"], [900, null]]);
  });

  it("adds 'waiting for Gemini' only after 5 s, and drops it when the count changes", () => {
    const shown = run([[0, ranking(48)], [1000, ranking(48, true)], [9000, ranking(47, true)]], 16000);
    expect(shown).toEqual([
      [0, "48 left to rank"],
      [6000, "48 left to rank · waiting for Gemini"],
      [9000, "47 left to rank"],
      [14000, "47 left to rank · waiting for Gemini"],
    ]);
  });

  it("doesn't flash the suffix for a short wait", () => {
    const shown = run([[0, ranking(10)], [1000, ranking(10, true)], [3000, ranking(10, false)]], 9000);
    expect(shown).toEqual([[0, "10 left to rank"]]);
  });

  it("shows nothing when the remaining items wait for quota (the server sends no progress)", () => {
    expect(run([[0, ev(null, false)]], 3000)).toEqual([[0, null]]);
  });

  it("returns the same view when nothing changes, so React doesn't re-render", () => {
    const v = step(receiveSync(initProgress(), ranking(5), 0), 0).view;
    expect(step(v, 100).view).toBe(v);
  });
});
