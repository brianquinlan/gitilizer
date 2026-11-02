// npm run snapshot -- eval/ground_truth.yaml [more.yaml | issue URLs…] [--out eval/fixtures] [--force]
// Downloads a frozen snapshot of each item for the eval (see ../snapshot.ts).
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { fromCwd, loadDotenv } from "../env.ts";
import { GitHub, GitHubError, IssueRef } from "../github.ts";
import { loadGroundTruth } from "../groundTruth.ts";
import { FULL_MEDIA, Snapshotter } from "../snapshot.ts";

loadDotenv();
const { values: a, positionals } = parseArgs({
  allowPositionals: true,
  options: { out: { type: "string", default: "eval/fixtures" }, force: { type: "boolean", default: false } },
});
if (!positionals.length) {
  console.error("usage: npm run snapshot -- eval/ground_truth.yaml | <issue URL> … [--out eval/fixtures] [--force]");
  process.exit(2);
}
const refs: IssueRef[] = [];
for (const s of positionals) {
  if (/\.ya?ml$/.test(s)) refs.push(...loadGroundTruth(fromCwd(s)).items.map((i) => IssueRef.parse(i.url)));
  else refs.push(IssueRef.parse(s));
}
const outDir = fromCwd(a.out!);
mkdirSync(outDir, { recursive: true });
const gh = new GitHub(undefined, FULL_MEDIA);
const snapper = new Snapshotter(gh);
let failures = 0;
for (const ref of refs) {
  const path = join(outDir, `${ref.key}.json`);
  if (existsSync(path) && !a.force) {
    console.error(`Skipping ${ref} (snapshot exists; use --force to refresh)`);
    continue;
  }
  try {
    const snap = await snapper.snapshot(ref);
    writeFileSync(path, JSON.stringify(snap, null, 1), "utf8");
    console.error(`  saved ${path} (${snap.comments.length} comments, ${snap.timeline.length} timeline events, ` +
      `${Object.keys(snap.related).length} related, ${snap.requests.length} requests)`);
  } catch (e) {
    if (!(e instanceof GitHubError)) throw e;
    console.error(`  FAILED ${ref}: ${e.message}`);
    failures++;
  }
}
try {
  const rl = (await gh.rateLimit()).resources.core;
  console.error(`GitHub core rate limit remaining: ${rl.remaining}/${rl.limit}`);
} catch { /* not important */ }
process.exit(failures ? 1 : 0);
