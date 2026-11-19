// Build the data for the next-step labelling page (eval/labeler.html) from the
// eval files: the ranked ground truth and the labels-only set (PRD RANK-24).
//
// Each item is shown as on the ranking page (itemView), with the next step the
// file has for it as a draft, and, behind a closed section, what the agents said
// in the runs given.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { UserSettings } from "./context.ts";
import { IssueRef } from "./github.ts";
import type { GroundTruth } from "./groundTruth.ts";
import { isOnMe, NEXT_STEP_KEYS, NEXT_STEP_PRECEDENCE, NEXT_STEPS, type NextStep } from "./prioritizer.ts";
import { itemView } from "./rankingSheet.ts";

/** The chip texts, as the web app shows them (app/shared NEXT_STEP_LABEL). */
const LABEL: Record<NextStep, string> = {
  review: "Review", respond: "Respond", todo: "To do", backlog: "Backlog", waiting: "Waiting", elsewhere: "Elsewhere", not_yours: "Not yours",
};
const tone = (k: NextStep) => (k === "backlog" ? "later" : isOnMe(k) ? "now" : "off");

/** Who a run's model is, in a word. */
export function agentName(model: string | null | undefined): string {
  if (!model) return "?";
  if (model.startsWith("gemini-decision")) return "Basic";
  if (model.startsWith("gemini-")) return model.includes("lite") ? "Gemini lite" : "Gemini";
  if (model.startsWith("claude-")) return "Claude";
  if (model.startsWith("gpt-") || /^o\d/.test(model)) return "OpenAI";
  return model;
}

type Answer = { who: string; step: NextStep | null; text: string };

/** Each item's answer in each run directory: the most common next step over its trials and the last next action. */
export function agentAnswers(runDirs: string[]): Map<string, Answer[]> {
  const byWho = new Map<string, Map<string, { steps: string[]; text: string }>>();
  for (const dir of runDirs) {
    const path = join(dir, "results.json");
    if (!existsSync(path)) throw new Error(`no results.json in ${dir}`);
    const res = JSON.parse(readFileSync(path, "utf8"));
    const who = agentName(res.config?.model);
    const m = byWho.get(who) ?? new Map();
    byWho.set(who, m);
    for (const trial of res.trials ?? []) {
      for (const s of trial) {
        const e = m.get(s.id) ?? { steps: [], text: "" };
        if (s.next_step) e.steps.push(s.next_step);
        if (s.next_action) e.text = s.next_action;
        m.set(s.id, e);
      }
    }
  }
  const out = new Map<string, Answer[]>();
  for (const [who, m] of byWho) {
    for (const [id, e] of m) {
      const counts = new Map<string, number>();
      for (const s of e.steps) counts.set(s, (counts.get(s) ?? 0) + 1);
      const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
      const list = out.get(id) ?? [];
      list.push({ who, step: top && Object.hasOwn(NEXT_STEPS, top) ? (top as NextStep) : null, text: e.text });
      out.set(id, list);
    }
  }
  return out;
}

/** What the agent is told about the developer, in a line, for the page's banner. */
function settingsNote(doc: GroundTruth): string {
  const u = UserSettings.fromDict(doc.user);
  const repos = u.interestedRepos.map((r) => (r.filter ? `${r.repo} (“${r.filter}”)` : r.repo));
  const parts = [];
  if (repos.length) parts.push(`additional repositories: ${repos.join(", ")}`);
  if (u.collaborators.length) parts.push(`collaborators: ${u.collaborators.join(", ")}`);
  return parts.join("; ");
}

/** The page's data. Files later in the list don't repeat an item an earlier one has. */
export function labelSheet(docs: { doc: GroundTruth }[], fixtures: string, answers = new Map<string, Answer[]>()) {
  const seen = new Set<string>();
  const items: any[] = [];
  let me = "";
  for (const { doc } of docs) {
    const user = UserSettings.fromDict(doc.user);
    me ||= user.githubLogin;
    const source = doc.labels_only ? "production" : "eval";
    const note = doc.labels_only ? settingsNote(doc) : "";
    for (const entry of doc.items) {
      const id = String(IssueRef.parse(entry.url));
      if (seen.has(id)) continue;
      seen.add(id);
      const v = itemView(entry, fixtures, user) as any;
      const draft = entry.next_step && Object.hasOwn(NEXT_STEPS, entry.next_step) ? entry.next_step : null;
      items.push({ ...v, source, draft, why: (entry.why || "").trim(), settings_note: note, agents: answers.get(id) ?? [] });
    }
  }
  return {
    user: me,
    steps: NEXT_STEP_KEYS.map((k) => ({ key: k, label: LABEL[k], tone: tone(k), meaning: NEXT_STEPS[k] })),
    precedence: NEXT_STEP_PRECEDENCE,
    items,
  };
}

/**
 * Sets `next_step` on the items of one eval file from the labelling page's
 * output, keeping the file's comments and layout: an existing `next_step` line
 * is replaced, and a new one goes after the item's `set` line, or its `url`.
 * Returns the new text, how many items changed, and the labelled items the file
 * doesn't have.
 */
export function setNextSteps(fileText: string, labelsText: string): { text: string; changed: number; unknown: Set<string> } {
  const labels = parseLabels(labelsText);
  const unknown = new Set(labels.keys());
  const lines = fileText.split("\n");
  const out: string[] = [];
  let changed = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = /^(\s*)- url: (\S+)\s*$/.exec(lines[i]);
    if (!m) { out.push(lines[i]); continue; }
    const id = String(IssueRef.parse(m[2]));
    const step = labels.get(id);
    // The item's block: its url line and the more-indented lines after it.
    let end = i + 1;
    const indent = m[1].length + 2;
    while (end < lines.length && (lines[end].trim() === "" || lines[end].search(/\S/) >= indent) && !/^\s*- url: /.test(lines[end]) && !/^\s*#/.test(lines[end])) end++;
    const block = lines.slice(i, end);
    if (step) {
      unknown.delete(id);
      const pad = " ".repeat(indent);
      const at = block.findIndex((l) => l.startsWith(`${pad}next_step:`));
      const line = `${pad}next_step: ${step}`;
      if (at >= 0) { if (block[at] !== line) { block[at] = line; changed++; } }
      else {
        const after = block.findIndex((l) => l.startsWith(`${pad}set:`));
        block.splice((after >= 0 ? after : 0) + 1, 0, line);
        changed++;
      }
    }
    out.push(...block);
    i = end - 1;
  }
  return { text: out.join("\n"), changed, unknown };
}

/** The labels as item id → next step, from the page's YAML or its saved JSON document. */
export function parseLabels(text: string): Map<string, NextStep> {
  const out = new Map<string, NextStep>();
  const add = (ref: string, step: unknown) => {
    if (typeof step !== "string" || !Object.hasOwn(NEXT_STEPS, step)) throw new Error(`unknown next step for ${ref}: ${JSON.stringify(step)}`);
    out.set(String(IssueRef.parse(ref)), step as NextStep);
  };
  const t = text.trim();
  if (t.startsWith("{")) {
    const d = JSON.parse(t);
    for (const [id, step] of Object.entries(d.labels ?? d)) add(id, step);
    return out;
  }
  let url: string | null = null;
  for (const line of t.split("\n")) {
    const u = /^\s*- url: (\S+)/.exec(line);
    if (u) { url = u[1]; continue; }
    const s = /^\s*next_step: (\S+)/.exec(line);
    if (s && url) { add(url, s[1]); url = null; }
  }
  return out;
}
