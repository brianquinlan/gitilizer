// Evaluate a prioritization strategy against the hand-ranked ground truth.
//
//   npm run evaluate                                     # Gemini, pointwise, 3 trials
//   npm run evaluate -- --strategy recency               # no-LLM baseline
//   npm run evaluate -- --prompt prompts/v2.md --label v2 --trials 5
//   npm run evaluate -- --thinking high --model gemini-3.8-flash
//
// Each run writes eval/runs/<timestamp>-<label>/ containing:
//   report.md     human-readable report (metrics, per-item table, worst inversions)
//   results.json  everything, machine-readable
//   contexts/     the exact text the model saw for each item
// and appends a one-line summary to eval/runs/index.tsv so runs can be compared.
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { UserSettings } from "./context.ts";
import { IssueRef } from "./github.ts";
import type { GroundTruth } from "./groundTruth.ts";
import { allMetrics, discordantPairs, type Metrics } from "./metrics.ts";
import { Item, prioritize, type LLM, type Scored, type Strategy } from "./prioritizer.ts";
import { fixed } from "./py.ts";
import { fmean, meanSd } from "./stats.ts";

export type LoadedItems = { truth: string[]; items: Item[]; why: Record<string, string>; subset: Record<string, string>; missing: string[] };

export function loadItems(doc: GroundTruth, fixtures: string): LoadedItems {
  const out: LoadedItems = { truth: [], items: [], why: {}, subset: {}, missing: [] };
  for (const entry of doc.items) {
    const ref = IssueRef.parse(entry.url);
    const path = join(fixtures, `${ref.key}.json`);
    if (!existsSync(path)) { out.missing.push(String(ref)); continue; }
    const rid = String(ref);
    out.truth.push(rid);
    out.why[rid] = (entry.why ?? "").trim();
    if (entry.set) out.subset[rid] = String(entry.set);
    out.items.push(new Item(rid, JSON.parse(readFileSync(path, "utf8")), entry.thumbs_down_at ?? null, entry.as_of ?? null));
  }
  return out;
}

/** Mean and sd of each metric restricted to each provenance subset (order within the subset). */
export function subsetMetrics(truth: string[], trials: Scored[][], subset: Record<string, string>): Record<string, Record<string, [number, number]>> {
  const out: Record<string, Record<string, [number, number]>> = {};
  for (const name of [...new Set(Object.values(subset))].sort()) {
    const ids = truth.filter((x) => subset[x] === name);
    if (ids.length < 3) continue;
    const per = trials.map((t) => allMetrics(ids, t.filter((s) => subset[s.id] === name).map((s) => s.id)));
    out[name] = { ...Object.fromEntries(Object.keys(per[0]).map((k) => [k, meanSd(per.map((m) => m[k]))])), n: [ids.length, 0.0] };
  }
  return out;
}

const signed = (x: number, n: number) => (x >= 0 || Object.is(x, 0) ? "+" : "") + fixed(x, n);

export type RunConfig = {
  label: string; strategy: Strategy; model: string | null; thinking: string | null; prompt: string | null;
  signals: boolean; trials: number; now: string | null; started_at: string; snapshots_fetched_at: string[];
  elapsed_s?: number; usage?: Record<string, number>;
};

export function writeReport(runDir: string, cfg: RunConfig, truth: string[], why: Record<string, string>, trials: Scored[][],
  trialMetrics: Metrics[], subset: Record<string, string>): string {
  const n = truth.length;
  const lines = [`# Gitilizer eval: ${cfg.label}`, ""];
  lines.push(
    `strategy \`${cfg.strategy}\` · model \`${cfg.model || "-"}\` · thinking \`${cfg.thinking || "default"}\` · ` +
    `prompt \`${cfg.prompt || "-"}\` · signals \`${cfg.signals ? "True" : "False"}\` · ${trials.length} trial(s) · ` +
    `${n} items · ${cfg.started_at}`,
  );
  lines.push("", "## Metrics (mean ± sd across trials)", "", "| metric | value |", "|---|---|");
  for (const k of Object.keys(trialMetrics[0])) {
    const [m, sd] = meanSd(trialMetrics.map((t) => t[k]));
    lines.push(`| ${k} | ${fixed(m, 3)} ± ${fixed(sd, 3)} |`);
  }
  const errors = trials.flat().filter((s) => s.error).length;
  if (errors) lines.push(`\n**${errors} item scoring(s) failed** — see results.json.`);

  const ranks = new Map(truth.map((x) => [x, [] as number[]]));
  const prios = new Map(truth.map((x) => [x, [] as number[]]));
  const act = new Map(truth.map((x) => [x, [] as boolean[]]));
  for (const t of trials) {
    t.forEach((s, pos) => {
      ranks.get(s.id)!.push(pos + 1);
      prios.get(s.id)!.push(s.priority);
      if (s.actionable !== null && s.actionable !== undefined) act.get(s.id)!.push(Boolean(s.actionable));
    });
  }
  const last = new Map(trials[trials.length - 1].map((s) => [s.id, s]));
  const subs = subsetMetrics(truth, trials, subset);
  if (Object.keys(subs).length) {
    const keys = ["kendall_tau", "ndcg", "top5_overlap", "mean_abs_displacement"];
    lines.push("", "## By set (order within each set only)", "", `| set | n | ${keys.join(" | ")} |`, `|---|---:|${"---:|".repeat(keys.length)}`);
    for (const [name, m] of Object.entries(subs)) {
      lines.push(`| ${name} | ${Math.trunc(m.n[0])} | ${keys.map((k) => `${fixed(m[k][0], 3)} ± ${fixed(m[k][1], 3)}`).join(" | ")} |`);
    }
  }
  lines.push("", "## Per item", "",
    "| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |",
    "|---:|---|---:|---:|---|---|---|---|");
  truth.forEach((x, i) => {
    const r = ranks.get(x)!;
    const mr = fmean(r);
    const delta = mr - (i + 1);
    const lo = Math.min(...r), hi = Math.max(...r);
    const rng = lo !== hi ? `${lo}–${hi}` : `${r[0]}`;
    const a = act.get(x)!;
    const aS = a.length ? `${a.filter(Boolean).length}/${a.length}` : "-";
    const flag = Math.abs(delta) >= Math.max(3, n / 4) ? " ⚠️" : "";
    const na = (last.get(x)!.next_action || last.get(x)!.error || "").replaceAll("|", "\\|");
    lines.push(`| ${i + 1} | ${fixed(mr, 1)} (${rng}) | ${signed(delta, 1)}${flag} | ${fixed(fmean(prios.get(x)!), 2)} | ${aS} | ${x} | ${subset[x] ?? ""} | ${na} |`);
  });

  const inv = new Map<string, number>();
  for (const t of trials) {
    for (const [a, b] of discordantPairs(truth, t.map((s) => s.id))) inv.set(`${a}\u0000${b}`, (inv.get(`${a}\u0000${b}`) ?? 0) + 1);
  }
  const tr = new Map(truth.map((x, i) => [x, i]));
  const worst = [...inv.entries()].map(([k, c]) => [k.split("\u0000") as [string, string], c] as const)
    .sort((x, y) => (tr.get(y[0][1])! - tr.get(y[0][0])!) - (tr.get(x[0][1])! - tr.get(x[0][0])!) || y[1] - x[1])
    .slice(0, 10);
  if (worst.length) {
    lines.push("", "## Largest inversions", "", "Pairs the model ordered the wrong way round, biggest ground-truth gap first.", "");
    for (const [[a, b], c] of worst) {
      lines.push(`- **${a}** (truth #${tr.get(a)! + 1}) placed below **${b}** (truth #${tr.get(b)! + 1}) in ${c}/${trials.length} trial(s)`);
    }
  }

  lines.push("", "## Reasoning (last trial) vs. ground truth", "");
  truth.forEach((x, i) => {
    const s = last.get(x)!;
    const r = ranks.get(x)!;
    lines.push(`### ${i + 1}. ${x} → predicted ${r[r.length - 1]}, priority ${fixed(s.priority, 2)}`);
    lines.push(`- **Ground truth:** ${why[x]}`);
    if (s.error) lines.push(`- **Error:** ${s.error}`);
    else {
      if (s.reasoning) lines.push(`- **Model:** ${s.reasoning}`);
      if (s.next_action) lines.push(`- **Next action:** ${s.next_action}`);
    }
    lines.push("");
  });
  const text = lines.join("\n");
  writeFileSync(join(runDir, "report.md"), text, "utf8");
  return text;
}

export type EvaluateOptions = {
  doc: GroundTruth; fixtures: string; strategy: Strategy; llm: LLM | null; model: string | null; thinking: string | null;
  promptPath: string; signals: boolean; trials: number; now: string | null; label?: string | null; workers: number; out: string;
  log?: (msg: string) => void;
};

/** Runs the evaluation and writes the run's files. Returns the run directory and the mean metrics. */
export async function evaluate(o: EvaluateOptions): Promise<{ runDir: string; agg: Record<string, [number, number]> }> {
  const log = o.log ?? ((m: string) => process.stderr.write(`${m}\n`));
  if (o.doc.ranked === false) throw new Error("the ground truth is not ranked yet (ranked: false): its order is not a ground truth.");
  const user = UserSettings.fromDict(o.doc.user);
  const loaded = loadItems(o.doc, o.fixtures);
  if (loaded.missing.length) {
    throw new Error(`Missing snapshots for: ${loaded.missing.join(", ")}\nRun: npm run snapshot -- eval/ground_truth.yaml --out ${o.fixtures}`);
  }
  const { truth, items, why, subset } = loaded;
  const trialsN = o.strategy === "recency" ? 1 : o.trials;
  const stem = basename(o.promptPath, extname(o.promptPath));
  const label = o.label || (o.strategy === "recency" ? o.strategy : `${o.strategy}-${stem}`);
  const d = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  const started = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
  const runDir = join(o.out, `${started}-${label}`);
  mkdirSync(join(runDir, "contexts"), { recursive: true });
  const cfg: RunConfig = {
    label, strategy: o.strategy, model: o.strategy === "recency" ? null : o.model, thinking: o.thinking,
    prompt: o.strategy === "recency" ? null : o.promptPath, signals: o.signals, trials: trialsN, now: o.now,
    started_at: started, snapshots_fetched_at: [...new Set(items.map((i) => i.snap.fetched_at as string))].sort(),
  };
  const guidance = o.strategy !== "recency" ? readFileSync(o.promptPath, "utf8") : null;
  const saveCtx = (key: string, text: string) => {
    const name = key === "__system__" ? "_system" : key.replaceAll("/", "__").replaceAll("#", "__");
    writeFileSync(join(runDir, "contexts", `${name}.txt`), text, "utf8");
  };

  const trials: Scored[][] = [];
  const trialMetrics: Metrics[] = [];
  const t0 = Date.now();
  for (let k = 0; k < trialsN; k++) {
    log(`trial ${k + 1}/${trialsN} ...`);
    const scored = await prioritize(items, user, {
      strategy: o.strategy, llm: o.llm, guidance, includeSignals: o.signals, now: o.now, workers: o.workers,
      onContext: k === 0 ? saveCtx : undefined,
    });
    const m = allMetrics(truth, scored.map((s) => s.id));
    trials.push(scored);
    trialMetrics.push(m);
    log(`  kendall_tau=${signed(m.kendall_tau, 3)} ndcg=${fixed(m.ndcg, 3)} top3=${fixed(m.top3_overlap, 2)}`);
  }
  cfg.elapsed_s = Math.round((Date.now() - t0) / 100) / 10;
  const usage: Record<string, number> = { prompt_tokens: 0, output_tokens: 0, thinking_tokens: 0 };
  for (const s of trials.flat()) for (const key of Object.keys(usage)) usage[key] += (s.usage as any)?.[key] ?? 0;
  cfg.usage = usage;

  const subs = subsetMetrics(truth, trials, subset);
  writeFileSync(join(runDir, "results.json"), JSON.stringify({
    config: cfg, truth, why, trials, metrics: trialMetrics,
    subsets: Object.fromEntries(Object.entries(subs).map(([k, v]) => [k, Object.fromEntries(Object.entries(v).map(([m, x]) => [m, x[0]]))])),
    item_sets: subset,
  }, null, 1), "utf8");
  writeReport(runDir, cfg, truth, why, trials, trialMetrics, subset);

  const index = join(o.out, "index.tsv");
  const agg = Object.fromEntries(Object.keys(trialMetrics[0]).map((k) => [k, meanSd(trialMetrics.map((t) => t[k]))])) as Record<string, [number, number]>;
  if (!existsSync(index)) writeFileSync(index, "run\tstrategy\tmodel\tthinking\tprompt\tsignals\ttrials\ttau\ttau_sd\tndcg\ttop3\tmad\n", "utf8");
  appendFileSync(index, [
    basename(runDir), o.strategy, cfg.model || "-", o.thinking || "-", guidance ? stem : "-", cfg.signals ? "True" : "False", trialsN,
    fixed(agg.kendall_tau[0], 3), fixed(agg.kendall_tau[1], 3), fixed(agg.ndcg[0], 3), fixed(agg.top3_overlap[0], 2),
    fixed(agg.mean_abs_displacement[0], 2),
  ].join("\t") + "\n", "utf8");
  return { runDir, agg };
}
