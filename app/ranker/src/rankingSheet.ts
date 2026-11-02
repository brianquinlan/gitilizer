// Build the data for the eval's ranking page (eval/ranker.html) from a ground-truth file.
//
// For each item it writes what a person needs to rank it, as of its snapshot
// (or `as_of`) time: header facts, the description, and the whole conversation
// in time order. It writes plain text only, no HTML.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { UserSettings, buildEvents, computeSignals, fmtAge, parseTime, renderRelated } from "./context.ts";
import { IssueRef } from "./github.ts";
import type { TruthEntry } from "./groundTruth.ts";
import { cpLen, cpSlice, rstrip, strftimeMinutes, strip } from "./py.ts";
import { iso, rewind } from "./rewind.ts";

const BODY_LIMIT = 12_000;
const EVENT_LIMIT = 6_000;

function clean(text: string | null | undefined, limit: number): string {
  const t = strip((text ?? "").replace(/<!--[\s\S]*?-->/g, ""));
  const n = cpLen(t);
  return n <= limit ? t : `${rstrip(cpSlice(t, 0, limit))}\n…[${n - limit} more characters]`;
}

export function itemView(entry: TruthEntry, fixtures: string, user: UserSettings) {
  const ref = IssueRef.parse(entry.url);
  let snap = JSON.parse(readFileSync(join(fixtures, `${ref.key}.json`), "utf8"));
  if (entry.as_of) snap = rewind(snap, iso(entry.as_of)!);
  const now = parseTime(snap.fetched_at)!;
  const sig = computeSignals(snap, user, now) as any;
  const issue = snap.issue;
  const pull = snap.pull || {};
  return {
    id: String(ref),
    url: entry.url,
    title: issue.title,
    kind: issue.pull_request ? "PR" : "Issue",
    state: (pull.draft ? "draft " : "") + issue.state,
    author: (issue.user || {}).login ?? null,
    labels: (issue.labels || []).map((l: any) => l.name),
    assignees: (issue.assignees || []).map((a: any) => a.login),
    requested: [...(pull.requested_reviewers || []).map((u: any) => u.login), ...(pull.requested_teams || []).map((t: any) => `${t.slug} (team)`)],
    repo_desc: (snap.repo || {}).description ?? null,
    created: fmtAge(parseTime(issue.created_at), now),
    updated: fmtAge(parseTime(issue.updated_at), now),
    snapshot: snap.fetched_at,
    as_of: iso(entry.as_of),
    thumbs_down_at: iso(entry.thumbs_down_at),
    roles: (sig.my_roles as string[]).filter((r) => r !== "none"),
    last: sig.last_human_activity,
    stacked_on: sig.stacked_on ?? null,
    related: renderRelated(snap, now).map((r) => r.slice(2)),
    body: clean(issue.body, BODY_LIMIT),
    timeline: buildEvents(snap).map((e) => ({
      who: e.actor || "?",
      bot: Boolean(e.actor) && /\[bot\]$|-bot$|^github-actions|^dependabot|^gemini-code-assist|^google-cla/.test(e.actor || ""),
      at: strftimeMinutes(e.at),
      ago: fmtAge(e.at, now),
      what: e.kind + (e.detail ? ` ${e.detail}` : ""),
      text: clean(e.body, EVENT_LIMIT),
    })),
    note: (entry.why ?? "").trim(),
    prd_note: (entry.prd_why ?? "").trim(),
    set: entry.set ?? null,
  };
}
