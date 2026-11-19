// npm run label-sheet -- eval/ground_truth.yaml eval/next_steps.yaml --html eval/labeler.html [--runs eval/runs/<run> …]
// Builds the next-step labelling page from eval/labeler_template.html (PRD RANK-24). Each --runs directory adds
// what that run's agent said for each item, shown only on request.
import { readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { fromCwd } from "../env.ts";
import { loadGroundTruth } from "../groundTruth.ts";
import { agentAnswers, labelSheet } from "../labelSheet.ts";
import { ROOT } from "../prioritizer.ts";

const { values: a, positionals } = parseArgs({
  allowPositionals: true,
  options: { fixtures: { type: "string", default: "eval/fixtures" }, html: { type: "string" }, runs: { type: "string", multiple: true, default: [] } },
});
if (!positionals.length || !a.html) {
  console.error("usage: npm run label-sheet -- eval/ground_truth.yaml [eval/next_steps.yaml] --html eval/labeler.html [--runs eval/runs/<run> …]");
  process.exit(2);
}
const docs = positionals.map((p) => ({ doc: loadGroundTruth(fromCwd(p)) }));
const data = labelSheet(docs, fromCwd(a.fixtures!), agentAnswers(a.runs!.map((r) => fromCwd(r))));
const json = JSON.stringify(data);
const template = readFileSync(join(ROOT, "eval", "labeler_template.html"), "utf8");
const out = fromCwd(a.html);
writeFileSync(out, template.replace("__DATA__", () => json.replaceAll("</", "<\\/")), "utf8");
console.log(`wrote ${a.html}: ${data.items.length} items, ${Math.floor(statSync(out).size / 1024)} KiB`);
