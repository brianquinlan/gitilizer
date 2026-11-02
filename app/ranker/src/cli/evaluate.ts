// npm run evaluate -- [--strategy pointwise|listwise|recency] [--model M] [--thinking low|…]
//   [--prompt prompts/v4.md] [--no-signals] [--trials 3] [--now ISO] [--label L] [--workers 6]
import { join } from "node:path";
import { parseArgs } from "node:util";
import { fromCwd, loadDotenv } from "../env.ts";
import { evaluate } from "../evaluate.ts";
import { GeminiLLM } from "../gemini.ts";
import { loadGroundTruth } from "../groundTruth.ts";
import { DEFAULT_MODEL, DEFAULT_PROMPT_PATH, ROOT, type Strategy } from "../prioritizer.ts";
import { fixed } from "../py.ts";

loadDotenv();
const { values: a } = parseArgs({
  options: {
    truth: { type: "string", default: join(ROOT, "eval", "ground_truth.yaml") },
    fixtures: { type: "string", default: join(ROOT, "eval", "fixtures") },
    strategy: { type: "string", default: "pointwise" },
    model: { type: "string" },
    thinking: { type: "string" },
    prompt: { type: "string", default: DEFAULT_PROMPT_PATH },
    "no-signals": { type: "boolean", default: false },
    trials: { type: "string", default: "3" },
    now: { type: "string" },
    label: { type: "string" },
    workers: { type: "string", default: "6" },
    out: { type: "string", default: join(ROOT, "eval", "runs") },
  },
});
const strategy = a.strategy as Strategy;
if (!["pointwise", "listwise", "recency"].includes(strategy)) throw new Error(`unknown strategy ${strategy}`);
if (a.thinking && !["minimal", "low", "medium", "high"].includes(a.thinking)) throw new Error(`unknown thinking level ${a.thinking}`);
const model = a.model || process.env.GITILIZER_MODEL || DEFAULT_MODEL;
if (strategy !== "recency" && !process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set (put it in .env)");
  process.exit(1);
}
try {
  const { runDir, agg } = await evaluate({
    doc: loadGroundTruth(fromCwd(a.truth!)), fixtures: fromCwd(a.fixtures!), strategy,
    llm: strategy === "recency" ? null : new GeminiLLM({ model, thinkingLevel: a.thinking ?? null }),
    model, thinking: a.thinking ?? null, promptPath: fromCwd(a.prompt!), signals: !a["no-signals"], trials: Number(a.trials),
    now: a.now ?? null, label: a.label ?? null, workers: Number(a.workers), out: fromCwd(a.out!),
  });
  const tau = agg.kendall_tau[0];
  console.log(`\nKendall tau ${tau >= 0 ? "+" : ""}${fixed(tau, 3)} ± ${fixed(agg.kendall_tau[1], 3)} | NDCG ${fixed(agg.ndcg[0], 3)} | ` +
    `top-3 overlap ${fixed(agg.top3_overlap[0], 2)} | mean |Δrank| ${fixed(agg.mean_abs_displacement[0], 2)}`);
  console.log(`Report: ${join(runDir, "report.md")}`);
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
