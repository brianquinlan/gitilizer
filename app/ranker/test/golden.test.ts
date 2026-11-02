// The TypeScript ranker produces exactly the text the Python ranker did for the
// eval set (test/golden.json holds hashes of the Python output), so evaluation
// results measured before the port still compare with results measured after it.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { UserSettings, buildContext } from "../src/context.ts";
import { IssueRef } from "../src/github.ts";
import { loadGroundTruth } from "../src/groundTruth.ts";
import { Item, ROOT, prioritize, systemInstruction, type LLM } from "../src/prioritizer.ts";
import { itemView } from "../src/rankingSheet.ts";

const golden = JSON.parse(readFileSync(join(import.meta.dirname, "golden.json"), "utf8"));
const h = (s: string) => createHash("sha256").update(s, "utf8").digest("hex").slice(0, 16);
const doc = loadGroundTruth(join(ROOT, "eval", "ground_truth.yaml"));
const user = UserSettings.fromDict(doc.user);
const fixture = (name: string) => JSON.parse(readFileSync(join(ROOT, "eval", "fixtures", `${name}.json`), "utf8"));

/** Python's json.dumps(x, sort_keys=True, ensure_ascii=False, separators=(",", ":")). */
function sortedJson(x: unknown): string {
  if (Array.isArray(x)) return `[${x.map(sortedJson).join(",")}]`;
  if (x && typeof x === "object") return `{${Object.keys(x).sort().map((k) => `${JSON.stringify(k)}:${sortedJson((x as any)[k])}`).join(",")}}`;
  return JSON.stringify(x);
}

describe("the TypeScript ranker matches the Python one", () => {
  it("builds the same context for every fixture", () => {
    const names = readdirSync(join(ROOT, "eval", "fixtures")).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, "")).sort();
    expect(Object.fromEntries(names.map((n) => [n, h(buildContext(fixture(n), user))]))).toEqual(golden.contexts);
  });

  it("builds the same system prompts", () => {
    const got: Record<string, string> = {};
    for (const v of ["v1", "v2", "v3", "v4"]) {
      const g = readFileSync(join(ROOT, "prompts", `${v}.md`), "utf8");
      got[v] = h(systemInstruction(g, user, "pointwise"));
      got[`${v}-listwise`] = h(systemInstruction(g, user, "listwise"));
    }
    expect(got).toEqual(golden.system);
  });

  it("sends the same requests in an eval run, including rewound and thumbs-down items", async () => {
    const items = doc.items.map((e) => {
      const ref = IssueRef.parse(e.url);
      return new Item(String(ref), fixture(ref.key), e.thumbs_down_at ?? null, e.as_of ?? null);
    });
    const contexts: Record<string, string> = {};
    const msgs: string[] = [];
    const spy: LLM = { async generate(_s, msg) { msgs.push(msg); return { result: { actionable: true, next_action: "", priority: 0.5, reasoning: "" } as any, usage: {} }; } };
    await prioritize(items, user, { llm: spy, guidance: readFileSync(join(ROOT, "prompts", "v4.md"), "utf8"), workers: 1, onContext: (k, v) => { contexts[k] = h(v); } });
    expect(contexts).toEqual(golden.eval);
    expect(msgs.map(h).sort()).toEqual(golden.messages);
    const rec = await prioritize(items, user, { strategy: "recency" });
    expect(rec.map((s) => [s.id, s.priority])).toEqual(golden.recency);
  });

  it("builds the same ranking-page data", () => {
    const sheet = doc.items.map((e) => itemView(e, join(ROOT, "eval", "fixtures"), user));
    expect(h(sortedJson(JSON.parse(JSON.stringify(sheet))))).toBe(golden.sheet);
  });
});
