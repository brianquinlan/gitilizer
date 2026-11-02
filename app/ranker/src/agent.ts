// What the ranking worker asks the model for one job (design: Ranking worker).
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { UserSettings, buildContext, buildEvents, isBot, parseTime } from "./context.ts";
import { ASSESSMENT, ICEBOX_DECISION, ROOT, defaultPrompt, pointwiseMessage, systemInstruction, type IceboxDecision, type ItemAssessment, type LLM } from "./prioritizer.ts";
import { isoZ, repr } from "./py.ts";

export const ICEBOX_PROMPT_PATH = join(ROOT, "prompts", "icebox_check_v1.md");

/** The developer's settings as the server sends them (additional repositories with prioritization prompts). */
export type AgentUser = { github_login: string; additional_repos: { repo: string; prioritization_prompt: string }[]; collaborators: string[] };

export type ScoreInput = {
  itemKey: string;
  snapshot: any;
  user: AgentUser;
  /** The developer's custom prompt, or null for the default (SET-24). */
  prompt: string | null;
};

/** Scores one item as of now, so scores that depend on age stay current (RANK-9, RANK-18). */
export async function scoreItem(job: ScoreInput, llm: LLM, now = Date.now()): Promise<ItemAssessment> {
  const user = UserSettings.fromDict(job.user);
  const nowS = isoZ(now);
  const system = systemInstruction(job.prompt || defaultPrompt(), user, "pointwise");
  const context = buildContext(job.snapshot, user, parseTime(nowS));
  const { result } = await llm.generate(system, pointwiseMessage(nowS, context), ASSESSMENT);
  return { ...result, priority: Math.max(0, Math.min(1, Number(result.priority))) };
}

/** What the Icebox check sees: the item and only the events since it was iceboxed. */
export function iceboxMessage(job: ScoreInput & { iceboxedAt: string | null }, now = Date.now()): string {
  const snap = job.snapshot;
  const issue = snap.issue;
  const me = job.user.github_login;
  const nowT = parseTime(isoZ(now))!;
  const since = parseTime(job.iceboxedAt) ?? nowT;
  const kind = issue.pull_request ? "pull request" : "issue";
  const lines = [
    `current_time: ${isoZ(now)}`,
    `me: ${me}`,
    `item: ${kind} ${job.itemKey} ${repr(issue.title)} (state: ${issue.state})`,
    `iceboxed_at: ${isoZ(since.ms)}`,
    "",
    "Changes since it was iceboxed (oldest first; (ME) marks the developer):",
  ];
  const events = buildEvents(snap).filter((e) => e.at.ms > since.ms);
  for (const e of events) {
    let line = e.render(nowT, 1500, me);
    // Mark bots the way GitHub Apps are named, so the model can tell them from people.
    if (isBot(e.actor) && !(e.actor ?? "").includes("[bot]")) line = line.replace(`] ${e.actor} `, `] ${e.actor}[bot] `);
    lines.push(line);
  }
  if (!events.length) lines.push("(no individual events found; the item's updated_at changed)");
  return lines.join("\n");
}

/** Asks whether a change should bring an iceboxed item back (ICE-6, ICE-12). */
export async function iceboxCheck(job: ScoreInput & { iceboxedAt: string | null }, llm: LLM, now = Date.now()): Promise<IceboxDecision> {
  const system = readFileSync(ICEBOX_PROMPT_PATH, "utf8");
  const { result } = await llm.generate(system, iceboxMessage(job, now), ICEBOX_DECISION);
  return result;
}

