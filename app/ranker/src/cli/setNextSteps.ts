// npm run set-next-steps -- <labels> eval/ground_truth.yaml [eval/next_steps.yaml]
// Writes next steps from the labelling page into the eval files (PRD RANK-24). <labels> is the page's
// "Copy as YAML" (next_steps: [{url, next_step}]) or its saved document as JSON ({labels: {id: step}}).
import { readFileSync, writeFileSync } from "node:fs";
import { fromCwd } from "../env.ts";
import { setNextSteps } from "../labelSheet.ts";

const [labelsPath, ...files] = process.argv.slice(2);
if (!labelsPath || !files.length) {
  console.error("usage: npm run set-next-steps -- <labels.yaml|labels.json> eval/ground_truth.yaml [eval/next_steps.yaml]");
  process.exit(2);
}
const labels = readFileSync(fromCwd(labelsPath), "utf8");
let left = null as Set<string> | null;
for (const f of files) {
  const { text, changed, unknown } = setNextSteps(readFileSync(fromCwd(f), "utf8"), labels);
  writeFileSync(fromCwd(f), text, "utf8");
  console.log(`${f}: ${changed} next step(s) set`);
  left = left ? new Set([...left].filter((x) => unknown.has(x))) : unknown;
}
if (left?.size) console.log(`not in any file: ${[...left].join(", ")}`);
