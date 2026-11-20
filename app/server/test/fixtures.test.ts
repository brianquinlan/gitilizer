// Fixture mode's Sync now: a few listed items get new activity at random, so live updates can be seen.
import { describe, expect, it } from "vitest";
import { FixtureStore } from "../src/github/fixtures.ts";
import { FIXTURES } from "./helpers.ts";

describe("FixtureStore.scramble", () => {
  it("touches a few distinct open items from the list, chosen at random", () => {
    const store = new FixtureStore(FIXTURES, "brianquinlan");
    const keys = [...store.entries.keys()];
    const closed = keys[0];
    store.close(closed);
    const before = new Map(keys.map((k) => [k, store.entries.get(k)!.snap.issue.updated_at]));
    const picked = store.scramble([closed, "nobody/nothing#1", ...keys.slice(1, 6), keys[1]], 3, () => 0);
    expect(picked).toEqual(keys.slice(1, 4));
    for (const k of picked) expect(store.entries.get(k)!.snap.issue.updated_at > before.get(k)!).toBe(true);
    for (const k of keys.slice(4)) expect(store.entries.get(k)!.snap.issue.updated_at).toBe(before.get(k));
  });

  it("touches fewer when the list is short", () => {
    const store = new FixtureStore(FIXTURES, "brianquinlan");
    const [only] = store.entries.keys();
    expect(store.scramble([only])).toEqual([only]);
    expect(store.scramble([])).toEqual([]);
  });
});
