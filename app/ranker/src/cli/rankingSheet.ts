// npm run ranking-sheet -- eval/ground_truth.yaml --out eval/ranking.json [--html eval/ranker.html]
// Writes the ranking page's data and, with --html, rebuilds the page from eval/ranker_template.html.
import { readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { UserSettings } from "../context.ts";
import { fromCwd } from "../env.ts";
import { loadGroundTruth } from "../groundTruth.ts";
import { ROOT } from "../prioritizer.ts";
import { itemView } from "../rankingSheet.ts";

const { values: a, positionals } = parseArgs({
  allowPositionals: true,
  options: { fixtures: { type: "string", default: "eval/fixtures" }, out: { type: "string" }, html: { type: "string" } },
});
if (!positionals[0] || !a.out) {
  console.error("usage: npm run ranking-sheet -- eval/ground_truth.yaml --out eval/ranking.json [--html eval/ranker.html]");
  process.exit(2);
}
const doc = loadGroundTruth(fromCwd(positionals[0]));
const out = fromCwd(a.out);
const user = UserSettings.fromDict(doc.user);
const json = JSON.stringify({ user: doc.user.github_login, items: doc.items.map((e) => itemView(e, fromCwd(a.fixtures!), user)) });
writeFileSync(out, json, "utf8");
console.log(`wrote ${out}: ${doc.items.length} items, ${Math.floor(statSync(out).size / 1024)} KiB`);
if (a.html) {
  const template = readFileSync(join(ROOT, "eval", "ranker_template.html"), "utf8");
  writeFileSync(fromCwd(a.html), template.replace("__DATA__", () => json.replaceAll("</", "<\\/")), "utf8");
  console.log(`wrote ${a.html}`);
}
