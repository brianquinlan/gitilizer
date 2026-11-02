// The agent, the eval harness and the snapshot downloader, on synthetic data.
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { stringify } from "yaml";
import { describe, expect, it } from "vitest";
import { iceboxCheck, iceboxMessage, scoreItem } from "../src/agent.ts";
import { UserSettings, buildContext, computeSignals, parseTime } from "../src/context.ts";
import { evaluate } from "../src/evaluate.ts";
import { Classified, FakeLLM, InvalidOutput, classifyGemini } from "../src/gemini.ts";
import { IssueRef } from "../src/github.ts";
import { loadGroundTruth } from "../src/groundTruth.ts";
import { allMetrics, discordantPairs, kendallTau, ndcg, spearmanRho, topKOverlap } from "../src/metrics.ts";
import { DEFAULT_PROMPT_PATH, ICEBOX_DECISION, Item, ROOT, prioritize, type LLM, type OutputSchema } from "../src/prioritizer.ts";
import { pyRound, repr } from "../src/py.ts";
import { rewind } from "../src/rewind.ts";
import { Snapshotter, extractRefs } from "../src/snapshot.ts";
import { makeSnapshot } from "./fakes.ts";

const ME = new UserSettings("brianquinlan", [{ repo: "dart-lang/http", filter: "not responsible for http2" }], ["natebosch"]);
const at = (s: string) => parseTime(s)!;

describe("metrics", () => {
  it("identity and reverse", () => {
    const t = [..."abcdef"];
    expect(kendallTau(t, t)).toBe(1.0);
    expect(kendallTau(t, [...t].reverse())).toBe(-1.0);
    expect(spearmanRho(t, [...t].reverse())).toBeCloseTo(-1.0);
    expect(ndcg(t, t)).toBeCloseTo(1.0);
    expect(ndcg(t, [...t].reverse())).toBeLessThan(0.8);
    expect(topKOverlap(t, [...t].reverse(), 3)).toBe(0);
  });
  it("a single swap", () => {
    const t = [..."abcd"], p = [..."bacd"];
    expect(kendallTau(t, p)).toBeCloseTo(4 / 6);
    expect(discordantPairs(t, p)).toEqual([["a", "b"]]);
    const m = allMetrics(t, p);
    expect(m.top3_overlap).toBe(1.0);
    expect(m.mean_abs_displacement).toBe(0.5);
  });
  it("rejects mismatched ids", () => expect(() => kendallTau(["a", "b"], ["a", "c"])).toThrow());
});

describe("Python compatibility helpers", () => {
  it("round half to even, like Python", () => {
    expect(pyRound(0.25, 1)).toBe(0.2);
    expect(pyRound(0.35, 1)).toBe(0.3); // 0.35 is slightly below .35 in binary
    expect(pyRound(2.5, 0)).toBe(2);
  });
  it("repr", () => {
    expect(repr(["a", "it's", null, true])).toBe(`['a', "it's", None, True]`);
    expect(repr({ k: 'x"y\n' })).toBe(`{'k': 'x"y\\n'}`);
  });
});

describe("references", () => {
  it("parses issue references", () => {
    const r = IssueRef.parse("https://github.com/dart-lang/http/pull/2031");
    expect([r.owner, r.repo, r.number, r.key]).toEqual(["dart-lang", "http", 2031, "dart-lang__http__2031"]);
    expect(IssueRef.parse("googleapis/google-cloud-dart#382").equals(new IssueRef("googleapis", "google-cloud-dart", 382))).toBe(true);
    expect(() => IssueRef.parse("not a ref")).toThrow();
  });
  it("extracts references from text", () => {
    const me = new IssueRef("dart-lang", "sdk", 48056);
    const refs = extractRefs("Fixed by #64644, see also dart-lang/http#12 and https://github.com/googleapis/librarian/pull/7808. Color &#123;", me).map(String);
    expect(refs).toContain("dart-lang/sdk#64644");
    expect(refs).toContain("dart-lang/http#12");
    expect(refs).toContain("googleapis/librarian#7808");
    expect(refs).not.toContain("dart-lang/sdk#123");
  });
});

const approvedPr = () => makeSnapshot({
  number: 2033, pr: true, author: "natebosch",
  reviews: [{ by: "brianquinlan", state: "APPROVED", at: "2026-10-21T00:00:00Z", body: "LGTM" }],
  commits: [{ sha: "abc1234", at: "2026-10-20T00:00:00Z" }],
});

describe("context and signals", () => {
  it("an approved PR", () => {
    const s: any = computeSignals(approvedPr(), ME, at("2026-10-25T16:00:00Z"));
    expect(s.type).toBe("pull_request");
    expect(s.my_roles).toEqual(expect.arrayContaining(["reviewer", "watches_repo"]));
    expect(s.my_latest_review.state).toBe("APPROVED");
    expect(s.my_latest_review.commits_pushed_after).toBe(0);
    expect(s.last_human_actor_is_me).toBe(true);
    expect(s.author_is_collaborator).toBe(true);
    expect(s.repo_interest_filter).toBe("not responsible for http2");
  });
  it("commits after my review, and a cc mention", () => {
    const snap = makeSnapshot({
      number: 5, pr: true, author: "stranger",
      comments: [{ by: "alice", at: "2026-10-22T00:00:00Z", body: "Looks fine.\ncc @brianquinlan" }],
      reviews: [{ by: "brianquinlan", state: "CHANGES_REQUESTED", at: "2026-10-10T00:00:00Z" }],
      commits: [{ sha: "a".repeat(40), at: "2026-10-01T00:00:00Z" }, { sha: "b".repeat(40), at: "2026-10-15T00:00:00Z" }],
    });
    const s: any = computeSignals(snap, ME, at("2026-10-25T16:00:00Z"));
    expect(s.my_latest_review.commits_pushed_after).toBe(1);
    expect(s.mentions_of_me[0].informational_cc).toBe(true);
    expect(s.last_human_actor_is_me).toBe(false);
  });
  it("a stack", () => {
    const snap = makeSnapshot({ number: 2031, pr: true, baseRef: "stack-1", stack: {
      default_branch: "main", above: [],
      below: [{ base_ref: "stack-1", pull: { number: 2030, title: "Part 1", state: "open", merged_at: null, user: { login: "mosuem" }, requested_reviewers: [] }, reviews: [] }],
    } });
    const s: any = computeSignals(snap, ME, at("2026-10-25T16:00:00Z"));
    expect(s.stacked_on[0].pr).toBe("#2030");
    expect(s.stacked_on[0].reviews).toBe("none");
  });
  it("trims long threads and bodies", () => {
    const many = Array.from({ length: 60 }, (_, i) => ({ by: `u${i}`, at: `2026-0${1 + Math.floor(i / 30)}-${String(1 + (i % 28)).padStart(2, "0")}T00:00:00Z`, body: "x".repeat(3000) }));
    const snap = makeSnapshot({ number: 7, comments: many, body: "y".repeat(10000), labels: ["type-bug"] });
    const text = buildContext(snap, ME);
    expect(text).toContain("ISSUE dart-lang/http#7");
    expect(text).toContain("Derived signals");
    expect(text).toContain("older events condensed");
    expect(text).toContain("more chars]");
    expect(text).not.toContain("subscribed");
    expect(text.length).toBeLessThanOrEqual(62_000);
    expect(buildContext(snap, ME, null, false)).not.toContain("Derived signals");
  });
  it("marks my own activity", () => expect(buildContext(approvedPr(), ME)).toContain("brianquinlan (ME) reviewed [APPROVED]"));
});

/** Scores by a lookup on the item number in the context. */
class Lookup implements LLM {
  calls: [string, string, OutputSchema<any>][] = [];
  constructor(public prios: Record<number, number>) {}
  async generate<T>(system: string, user: string, schema: OutputSchema<T>) {
    this.calls.push([system, user, schema]);
    if (schema.name === "ItemAssessment") {
      for (const [num, p] of Object.entries(this.prios)) {
        if (user.includes(`#${num}:`)) return { result: { actionable: p > 0.5, next_action: "do it", priority: p, reasoning: "r" } as T, usage: { prompt_tokens: 10, output_tokens: 5, thinking_tokens: 0 } };
      }
      throw new Error("unknown item");
    }
    const ids = user.split("\n").filter((l) => l.startsWith("======== id: ")).map((l) => l.split("id: ")[1].split(" ")[0]);
    const ordered = [...ids].sort((a, b) => this.prios[Number(b.split("#")[1])] - this.prios[Number(a.split("#")[1])]);
    return { result: { items: ordered.slice(0, -1).map((id) => ({ id, actionable: true, next_action: "", priority: 0.5, reasoning: "" })) } as T, usage: {} };
  }
}

const items3 = () => [
  new Item("dart-lang/http#1", makeSnapshot({ number: 1, updated: "2026-10-01T00:00:00Z" })),
  new Item("dart-lang/http#2", makeSnapshot({ number: 2, updated: "2026-10-24T00:00:00Z" })),
  new Item("dart-lang/http#3", makeSnapshot({ number: 3, updated: "2026-10-10T00:00:00Z" })),
];

describe("prioritize", () => {
  it("orders pointwise scores and includes the developer's settings", async () => {
    const llm = new Lookup({ 1: 0.9, 2: 0.1, 3: 0.5 });
    const out = await prioritize(items3(), ME, { llm, guidance: "GUIDANCE" });
    expect(out.map((s) => s.id)).toEqual(["dart-lang/http#1", "dart-lang/http#3", "dart-lang/http#2"]);
    const system = llm.calls[0][0];
    expect(system.startsWith("GUIDANCE")).toBe(true);
    for (const s of ["brianquinlan", "not responsible for http2", "natebosch"]) expect(system).toContain(s);
    expect(llm.calls[0][1]).toContain("current_time: 2026-10-25T16:00:00Z");
  });
  it("breaks ties by recency and keeps going after an error", async () => {
    const llm = new Lookup({ 1: 0.5, 2: 0.5, 3: 0.5 });
    const boom: LLM = { generate: (s, u, sc) => (u.includes("#3:") ? Promise.reject(new Error("quota")) : llm.generate(s, u, sc)) };
    const out = await prioritize(items3(), ME, { llm: boom, guidance: "g" });
    expect(out.map((s) => s.id)).toEqual(["dart-lang/http#2", "dart-lang/http#1", "dart-lang/http#3"]);
    expect(out[2].error).toContain("quota");
  });
  it("listwise appends what the model omitted", async () => {
    const out = await prioritize(items3(), ME, { strategy: "listwise", llm: new Lookup({ 1: 0.9, 2: 0.1, 3: 0.5 }), guidance: "g" });
    expect(out.map((s) => s.id)).toEqual(["dart-lang/http#1", "dart-lang/http#3", "dart-lang/http#2"]);
    expect(out[2].error).toBe("omitted by model");
  });
  it("recency", async () => {
    expect((await prioritize(items3(), ME, { strategy: "recency" })).map((s) => s.id)).toEqual(["dart-lang/http#2", "dart-lang/http#3", "dart-lang/http#1"]);
  });
  it("defaults to prompt v4", () => {
    expect(DEFAULT_PROMPT_PATH.endsWith("v4.md")).toBe(true);
    const text = readFileSync(DEFAULT_PROMPT_PATH, "utf8");
    expect(text).toContain("Security comes first");
    expect(text).toContain("## Review requests");
  });
  it("evaluates an as-of item at its own time", async () => {
    const llm = new Lookup({ 1: 0.5, 2: 0.4, 1972: 0.9 });
    const items = [...items3().slice(0, 2), new Item("dart-lang/http#1972", needsInfoIssue(), null, "2026-08-30T00:00:00Z")];
    const out = await prioritize(items, ME, { llm, guidance: "g" });
    expect(out[0].id).toBe("dart-lang/http#1972");
    const firstLines = llm.calls.map(([, u]) => [u.split("\n")[2], u.split("\n")[0]]);
    expect(firstLines.some(([k, v]) => k.includes("#1972") && v === "current_time: 2026-08-30T00:00:00Z")).toBe(true);
    expect(firstLines.some(([k, v]) => k.includes("#1:") && v === "current_time: 2026-10-25T16:00:00Z")).toBe(true);
  });
  it("normalises YAML dates", () => {
    const item = new Item("dart-lang/http#1972", needsInfoIssue(), new Date(Date.UTC(2026, 7, 1)), new Date(Date.UTC(2026, 7, 30)));
    expect([item.asOf, item.thumbsDownAt]).toEqual(["2026-08-30T00:00:00Z", "2026-08-01T00:00:00Z"]);
    expect(item.snap.issue.state).toBe("open");
  });
});

// ---------------------------------------------------------------- eval end to end

function setupEval(dir: string, extra = false) {
  const fixtures = join(dir, "fixtures");
  mkdirSync(fixtures);
  const truth: any = { user: { github_login: "brianquinlan", interested_repos: [{ repo: "dart-lang/http" }] }, items: [] };
  for (const [n, upd] of [[1, "2026-10-01"], [2, "2026-10-24"], [3, "2026-10-10"]] as const) {
    writeFileSync(join(fixtures, `dart-lang__http__${n}.json`), JSON.stringify(makeSnapshot({ number: n, updated: `${upd}T00:00:00Z` })));
    truth.items.push({ url: `https://github.com/dart-lang/http/issues/${n}`, why: `reason ${n}`, ...(extra ? { set: "A" } : {}) });
  }
  if (extra) {
    writeFileSync(join(fixtures, "dart-lang__http__4.json"), JSON.stringify(makeSnapshot({ number: 4, updated: "2026-10-02T00:00:00Z" })));
    truth.items.push({ url: "https://github.com/dart-lang/http/issues/4", set: "B", why: "" });
  }
  writeFileSync(join(dir, "truth.yaml"), stringify(truth));
  return { doc: loadGroundTruth(join(dir, "truth.yaml")), fixtures, out: join(dir, "runs") };
}
const evalOpts = { model: "m", thinking: null, promptPath: DEFAULT_PROMPT_PATH, signals: true, now: null, workers: 2, log: () => {} };

describe("evaluate", () => {
  it("runs the recency baseline end to end", async () => {
    const dir = mkdtempSync(join(tmpdir(), "eval-"));
    const s = setupEval(dir);
    const { runDir } = await evaluate({ ...s, ...evalOpts, strategy: "recency", llm: null, trials: 3 });
    const report = readFileSync(join(runDir, "report.md"), "utf8");
    expect(report).toContain("kendall_tau");
    expect(report).toContain("reason 1");
    expect(readFileSync(join(s.out, "index.tsv"), "utf8").split("\n").length - 1).toBe(2);
  });
  it("runs pointwise end to end and saves the contexts", async () => {
    const dir = mkdtempSync(join(tmpdir(), "eval-"));
    const s = setupEval(dir);
    const { runDir } = await evaluate({ ...s, ...evalOpts, strategy: "pointwise", llm: new Lookup({ 1: 0.9, 2: 0.5, 3: 0.1 }), trials: 2, label: "t" });
    const res = JSON.parse(readFileSync(join(runDir, "results.json"), "utf8"));
    expect(res.metrics[0].kendall_tau).toBe(1.0);
    expect(res.trials).toHaveLength(2);
    expect(readdirSync(join(runDir, "contexts")).sort()).toEqual(["_system.txt", "dart-lang__http__1.txt", "dart-lang__http__2.txt", "dart-lang__http__3.txt"]);
  });
  it("reports each set of the eval", async () => {
    const dir = mkdtempSync(join(tmpdir(), "eval-"));
    const s = setupEval(dir, true);
    const { runDir } = await evaluate({ ...s, ...evalOpts, strategy: "recency", llm: null, trials: 1 });
    const res = JSON.parse(readFileSync(join(runDir, "results.json"), "utf8"));
    expect(res.item_sets["dart-lang/http#4"]).toBe("B");
    expect(Object.keys(res.subsets)).toEqual(["A"]); // B has fewer than 3 items
    expect(readFileSync(join(runDir, "report.md"), "utf8")).toContain("## By set");
  });
  it("the ground truth file is complete", () => {
    const doc = loadGroundTruth(join(ROOT, "eval", "ground_truth.yaml"));
    expect(doc.ranked).toBe(true);
    expect(new Set(doc.items.map((i) => i.set))).toEqual(new Set(["A", "B"]));
    expect(doc.items).toHaveLength(36);
    expect(new Set(doc.items.map((i) => String(IssueRef.parse(i.url)))).size).toBe(36);
  });
});

// ---------------------------------------------------------------- snapshot downloader

class FakeGH {
  log: string[] = [];
  s = makeSnapshot({ owner: "dart-lang", repo: "http", number: 2031, pr: true, baseRef: "stack-1", body: "Part of #2030; see dart-lang/sdk#1" });
  repo = { ...this.s.repo, some_extra_field: 123 };
  headRepo = "dart-lang/http";
  pull(n: number, base: string, head: string) {
    return { number: n, title: `P${n}`, html_url: "u", state: "open", user: { login: "mosuem" }, base: { ref: base, repo: { full_name: "dart-lang/http" } },
      head: { ref: head, label: head, repo: { full_name: this.headRepo } }, updated_at: "2026-10-01T00:00:00Z", merged_at: null, requested_reviewers: [], full_only_field: true };
  }
  async get(path: string) {
    this.log.push(path);
    if (path === "/repos/dart-lang/http") return this.repo;
    if (path === "/repos/dart-lang/http/issues/2031") return this.s.issue;
    if (path === "/repos/dart-lang/http/pulls/2031") return { ...this.s.pull, ...this.pull(2031, "stack-1", "stack-2") };
    if (path === "/repos/dart-lang/http/pulls/2030") return this.pull(2030, "main", "stack-1");
    if (path === "/repos/dart-lang/sdk/issues/1") return { number: 1, title: "rel", state: "closed", state_reason: "completed", body: "x".repeat(5000), updated_at: "2026-10-01T00:00:00Z", user: { login: "z" } };
    if (path === "/repos/dart-lang/http/issues/2030") return { number: 2030, title: "P2030", state: "open", pull_request: { merged_at: null }, updated_at: "2026-10-01T00:00:00Z", user: { login: "mosuem" } };
    throw new Error(path);
  }
  async paginate(path: string, p: Record<string, string> = {}) {
    this.log.push(path);
    if (path === "/repos/dart-lang/http/pulls") {
      if (p.head === "dart-lang:stack-1") return [{ number: 2030 }];
      return p.base === "stack-2" ? [this.pull(2040, "stack-2", "stack-3")] : [];
    }
    if (path.endsWith("/issues/2031/comments")) return this.s.comments;
    if (path.endsWith("/timeline")) return this.s.timeline;
    if (path.endsWith("/reviews")) return path.includes("2030") ? [{ user: { login: "brianquinlan" }, state: "APPROVED", submitted_at: "2026-10-02T00:00:00Z", body: "", commit_id: "abc", html_url: "r" }] : [];
    if (path.endsWith("/comments")) return [];
    if (path.endsWith("/commits")) return this.s.commits;
    if (path.endsWith("/files")) return this.s.files;
    throw new Error(path);
  }
  async graphql() { return this.s.graphql; }
}

describe("snapshots", () => {
  it("keep full responses", async () => {
    const gh = new FakeGH();
    const snap = await new Snapshotter(gh as any, () => {}).snapshot(new IssueRef("dart-lang", "http", 2031));
    expect(snap.schema_version).toBe(2);
    expect(snap.repo.some_extra_field).toBe(123);
    expect(snap.related["dart-lang/sdk#1"].issue.body).toHaveLength(5000);
    expect(snap.related["dart-lang/http#2030"].pull.full_only_field).toBe(true);
    const below = snap.stack.below[0];
    expect(below.pull.full_only_field).toBe(true);
    expect(below.reviews[0].html_url).toBe("r");
    expect(snap.stack.above[0].number).toBe(2040);
    expect(snap.requests).toContain("/repos/dart-lang/http/pulls/2030");
    const s: any = computeSignals(snap, ME, at(snap.fetched_at));
    expect(s.stacked_on[0].reviews).toEqual(["brianquinlan:APPROVED"]);
    expect(s).toHaveProperty("stacked_below");
    expect(buildContext(snap, ME)).toContain("issue dart-lang/sdk#1 'rel': closed (completed)");
  });
  it("skip 'stacked above' for a PR from a fork", async () => {
    const gh = new FakeGH();
    gh.headRepo = "someone/http";
    const snap = await new Snapshotter(gh as any, () => {}).snapshot(new IssueRef("dart-lang", "http", 2031));
    expect(snap.stack.above).toEqual([]);
  });
});

// ---------------------------------------------------------------- rewind

function needsInfoIssue() {
  const snap = makeSnapshot({
    number: 1972, author: "keetz", created: "2026-08-11T00:00:00Z", updated: "2026-09-03T00:00:00Z", fetched: "2026-10-25T16:00:00Z", labels: ["type-bug"],
    comments: [{ by: "brianquinlan", at: "2026-08-22T10:00:00Z", body: "What client are you using?" }, { by: "keetz", at: "2026-09-03T09:00:00Z", body: "Found it, my bug." }],
  });
  snap.timeline.push(
    { event: "assigned", actor: { login: "brianquinlan" }, assignee: { login: "brianquinlan" }, created_at: "2026-08-21T00:00:00Z" },
    { event: "labeled", actor: { login: "brianquinlan" }, label: { name: "needs-info" }, created_at: "2026-08-22T10:01:00Z" },
    { event: "closed", actor: { login: "keetz" }, created_at: "2026-09-03T09:01:00Z" },
  );
  Object.assign(snap.issue, { state: "closed", closed_at: "2026-09-03T09:01:00Z", state_reason: "completed", assignees: [{ login: "brianquinlan" }], labels: [{ name: "type-bug" }, { name: "needs-info" }] });
  snap.related = {
    "dart-lang/http#1974": { issue: { number: 1974, title: "fix", state: "closed", created_at: "2026-08-25T00:00:00Z", closed_at: "2026-09-02T00:00:00Z", updated_at: "2026-09-02T00:00:00Z", user: { login: "x" }, pull_request: { merged_at: null } } },
    "dart-lang/http#9999": { issue: { number: 9999, title: "later", state: "open", created_at: "2026-10-01T00:00:00Z", updated_at: "2026-10-01T00:00:00Z", user: { login: "y" } } },
  };
  return snap;
}

describe("rewind", () => {
  it("rolls back state, labels, comments and related items", () => {
    const full = needsInfoIssue();
    const s = rewind(full, "2026-08-30T00:00:00Z");
    expect([s.issue.state, s.issue.closed_at]).toEqual(["open", null]);
    expect(new Set(s.issue.labels.map((l: any) => l.name))).toEqual(new Set(["type-bug", "needs-info"]));
    expect(s.comments.map((c: any) => c.body)).toEqual(["What client are you using?"]);
    expect(s.issue.comments).toBe(1);
    expect(s.issue.updated_at).toBe("2026-08-22T10:01:00Z");
    expect([s.fetched_at, s.as_of]).toEqual(["2026-08-30T00:00:00Z", "2026-08-30T00:00:00Z"]);
    expect(s.related["dart-lang/http#1974"].issue.state).toBe("open");
    expect(s.related).not.toHaveProperty("dart-lang/http#9999");
    expect(s.issue).not.toHaveProperty("reactions");
    expect(full.issue.state).toBe("closed");
    expect(rewind(full, "2026-08-21T12:00:00Z").issue.labels.map((l: any) => l.name)).toEqual(["type-bug"]);
    expect(rewind(full, "2026-08-21T12:00:00Z").issue.assignees.map((a: any) => a.login)).toEqual(["brianquinlan"]);
    expect(rewind(full, "2026-08-15T00:00:00Z").issue.assignees).toEqual([]);
    expect(() => rewind(full, "2026-08-01T00:00:00Z")).toThrow();
    const text = buildContext(s, ME);
    expect(text).toContain("needs-info");
    expect(text).not.toContain("Found it");
    expect(text).toContain("reconstructed as of 2026-08-30");
    expect((computeSignals(s, ME, at(s.fetched_at)) as any).last_human_actor_is_me).toBe(true);
  });
  it("replays requested reviewers and drops later reviews", () => {
    const snap = makeSnapshot({
      number: 50, pr: true, author: "kevmoo", created: "2026-10-01T00:00:00Z",
      reviews: [{ by: "brianquinlan", state: "APPROVED", at: "2026-10-10T00:00:00Z" }],
      commits: [{ sha: "a".repeat(40), at: "2026-10-01T00:00:00Z" }, { sha: "b".repeat(40), at: "2026-10-12T00:00:00Z" }],
    });
    snap.timeline.push(
      { event: "review_requested", actor: { login: "kevmoo" }, requested_reviewer: { login: "brianquinlan" }, created_at: "2026-10-02T00:00:00Z" },
      { event: "review_requested", actor: { login: "kevmoo" }, requested_team: { slug: "dart-ecosystem-team" }, created_at: "2026-10-02T00:00:00Z" },
    );
    snap.pull.requested_reviewers = [];
    snap.pull.requested_teams = [{ slug: "dart-ecosystem-team" }];
    const s = rewind(snap, "2026-10-05T00:00:00Z");
    expect(s.pull.requested_reviewers.map((u: any) => u.login)).toEqual(["brianquinlan"]);
    expect(s.reviews).toEqual([]);
    expect(s.commits).toHaveLength(1);
    const s2 = rewind(snap, "2026-10-11T00:00:00Z");
    expect(s2.pull.requested_reviewers).toEqual([]);
    expect(s2.reviews.map((r: any) => r.state)).toEqual(["APPROVED"]);
    const me = new UserSettings("brianquinlan", [], [], ["dart-lang/dart-ecosystem-team"]);
    const roles = (computeSignals(s, me, at(s.fetched_at)) as any).my_roles as string[];
    expect(roles).toContain("requested_reviewer");
    expect(roles.some((r) => r.startsWith("requested_reviewer_via_team"))).toBe(true);
  });
});

// ---------------------------------------------------------------- the worker's calls

class FakeApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

describe("Gemini errors", () => {
  it.each([
    [400, "API key not valid. Please pass a valid API key. [reason: API_KEY_INVALID]", "key_invalid"],
    [401, "Request had invalid authentication credentials.", "key_invalid"],
    [402, "Prepay credits depleted.", "credits_exhausted"],
    [403, "Your API key was reported as leaked. Please use another API key.", "key_leaked"],
    [400, "Gemini API free tier is not available in your country. Please enable billing.", "billing_required"],
    [403, "Method doesn't allow unregistered callers.", "permission_denied"],
    [404, "models/gemini-x is not found for API version v1beta", "model_not_found"],
    [429, "Quota exceeded for metric generate_content_free_tier_requests, quotaId: GenerateRequestsPerDayPerProjectPerModel-FreeTier", "daily_quota"],
    [429, "Quota exceeded per minute. retryDelay: '27s'", "rate_limited"],
    [503, "The model is overloaded. Please try again later.", "unavailable"],
    [504, "Deadline exceeded", "unavailable"],
  ])("%i %s → %s", (status, message, code) => {
    expect(classifyGemini(new FakeApiError(status, message)).code).toBe(code);
  });
  it("carries the retry delay of a rate limit", () => expect(classifyGemini(new FakeApiError(429, "slow down retryDelay: '27s'")).retryAfter).toBe(27));
  it("treats bad output as an item-level failure", () => {
    expect(classifyGemini(new SyntaxError("Unexpected token")).code).toBe("invalid_output");
    expect(classifyGemini(new InvalidOutput("finish_reason SAFETY")).code).toBe("blocked");
  });
});

const job = (extra: Record<string, unknown> = {}) => ({
  itemKey: "dart-lang/http#2031", prompt: null, iceboxedAt: null as string | null,
  snapshot: JSON.parse(readFileSync(join(ROOT, "eval", "fixtures", "dart-lang__http__2031.json"), "utf8")),
  user: { github_login: "brianquinlan", additional_repos: [{ repo: "dart-lang/http", prioritization_prompt: "not responsible for http2" }], collaborators: ["kevmoo"] },
  ...extra,
});
const withComment = (j: any, login: string, body: string, when = "2099-01-01T00:00:00Z") =>
  ({ ...j, snapshot: { ...j.snapshot, timeline: [...j.snapshot.timeline, { event: "commented", actor: { login }, created_at: when, body }] } });

describe("the worker's calls", () => {
  it("scores one item with the real agent code, as of now", async () => {
    const seen: string[] = [];
    const spy: LLM = { async generate(system, user) { seen.push(system, user); return { result: { actionable: true, next_action: "n", priority: 1.4, reasoning: "r" } as any, usage: {} }; } };
    const a = await scoreItem(job(), spy, Date.parse("2026-11-02T10:00:00Z"));
    expect(a.priority).toBe(1); // clamped
    expect(seen[0]).toContain("not responsible for http2");
    expect(seen[1].startsWith("current_time: 2026-11-02T10:00:00Z")).toBe(true);
  });
  it("shows the Icebox check only what changed since the item was iceboxed", async () => {
    const seen: string[] = [];
    const spy: LLM = { async generate(system, user, schema) { seen.push(system, user); expect(schema).toBe(ICEBOX_DECISION); return { result: { bring_back: true, reason: "r" } as any, usage: {} }; } };
    const j = withComment(job({ iceboxedAt: "2098-12-31T00:00:00Z" }), "kevmoo", "Can you take another look?");
    expect((await iceboxCheck(j, spy)).bring_back).toBe(true);
    expect(seen[0]).toContain("Lean strongly toward bringing it back");
    const events = seen[1].split("\n").filter((l) => l.startsWith("["));
    expect(events).toHaveLength(1);
    expect(events[0]).toContain("kevmoo commented");
  });
  it("the fake model keeps only unimportant changes in the Icebox", async () => {
    const base = job({ iceboxedAt: "2098-12-31T00:00:00Z" });
    const fake = new FakeLLM();
    expect((await iceboxCheck(withComment(base, "dependabot[bot]", "Bumped"), fake)).bring_back).toBe(false);
    expect((await iceboxCheck(withComment(base, "brianquinlan", "This is a critical security issue, I'll work on it right away"), fake)).bring_back).toBe(true);
    expect(iceboxMessage(withComment(base, "github-actions", "CI passed"))).toContain("github-actions[bot] commented");
  });
  it("the fake model is deterministic and can be made to fail", async () => {
    const fake = new FakeLLM();
    const a = await scoreItem(job(), fake, 0);
    expect((await scoreItem(job(), fake, 0)).priority).toBe(a.priority);
    process.env.FAKE_LLM_ERROR = "daily_quota";
    try {
      await expect(scoreItem(job(), fake)).rejects.toMatchObject({ code: "daily_quota" });
      expect(classifyGemini(new Classified("daily_quota", "x")).code).toBe("daily_quota");
    } finally {
      delete process.env.FAKE_LLM_ERROR;
    }
  });
});
