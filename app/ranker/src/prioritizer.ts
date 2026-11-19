// The Gitilizer prioritization agent.
//
// Strategies
//   pointwise (default)  One Gemini call per item (PRD RANK-18). Each item gets an
//                        absolute priority in [0, 1]; the ordering is the sort by
//                        priority, ties broken by most recent activity. This is
//                        what the app needs: when one issue changes, only that
//                        issue is re-scored.
//   listwise             One call that sees every item and returns a full
//                        ordering. A comparison point for the eval; doesn't
//                        scale to hundreds of issues.
//   recency              No model. Most recently updated first. A floor that any
//                        real strategy must beat.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { UserSettings, buildContext, parseTime } from "./context.ts";
import { pyRound, strip } from "./py.ts";
import { iso, rewind } from "./rewind.ts";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
export const DEFAULT_MODEL = "gemini-3.8-flash";
export const DEFAULT_PROMPT_PATH = join(ROOT, "prompts", "v4.md");
export const defaultPrompt = () => readFileSync(DEFAULT_PROMPT_PATH, "utf8");

// ---------------------------------------------------------------------------
// Next steps (PRD RANK-23)
// ---------------------------------------------------------------------------

/**
 * Whose move it is on an item, in the words the agent is told (PRD RANK-23).
 * The first four are on the developer. The order is the one that settles an
 * item that fits more than one (NEXT_STEP_PRECEDENCE), not this one.
 */
export const NEXT_STEPS = {
  review: "A PR is waiting for my review or re-review. I am a requested reviewer, or the default reviewer for the repository, or the author has updated the PR since my last review.",
  respond: "Someone is waiting on me. A question or request addressed to me is unanswered, or my own PR has review feedback I haven't addressed.",
  todo: "It is mine to move forward and nobody is waiting on a reply from me. This covers work I am assigned, said I would do, or recently filed in an area I own. It includes checking whether something is fixed, deciding what to do, finishing or closing my draft, and pinging a reviewer who has been silent for about a week.",
  backlog: "It is mine, but nothing is pressing. It is an old or stale item in an area I own, with no recent activity and nobody waiting, that I could triage or close when grooming.",
  waiting: "I am involved and it is someone else's move. I asked a question, requested changes or requested a review, and haven't had an answer yet.",
  elsewhere: "The thing to act on is a different item. This is an issue with an open PR that fixes it, or a PR stacked on lower PRs that need review first. Name that item in the next action.",
  not_yours: "There is nothing for me to do, now or later. It is outside my stated scope, owned or driven by someone else, a team review request in a repository I'm not responsible for, a mention with nothing asked of me, or a PR I already approved.",
} as const;
export type NextStep = keyof typeof NEXT_STEPS;
export const NEXT_STEP_KEYS = Object.keys(NEXT_STEPS) as [NextStep, ...NextStep[]];
/** If more than one next step applies, the first of these (PRD RANK-23). */
export const NEXT_STEP_PRECEDENCE: NextStep[] = ["not_yours", "elsewhere", "review", "respond", "waiting", "todo", "backlog"];
const ON_ME: ReadonlySet<NextStep> = new Set(["review", "respond", "todo", "backlog"]);
/** Whether a next step is on the developer (the first four, PRD RANK-23). */
export const isOnMe = (step: NextStep) => ON_ME.has(step);

const precedence = NEXT_STEP_PRECEDENCE.map((k) => `\`${k}\``).join(", ");
/** The question basic ranking's model answers for the next step, with NEXT_STEPS as its options (RANK-21). */
export const NEXT_STEP_QUESTION = `Following the instructions above, whose move is it on this item? If more than one applies, choose the first of: ${precedence}.`;
const NEXT_STEP_LIST = `\`next_step\` says whose move it is on this item. It is one of:

${NEXT_STEP_KEYS.map((k) => `- \`${k}\`: ${NEXT_STEPS[k]}`).join("\n")}

If more than one applies, choose the first of: ${precedence}.`;

// ---------------------------------------------------------------------------
// Output schemas
// ---------------------------------------------------------------------------

export const ItemAssessment = z.object({
  next_step: z.enum(NEXT_STEP_KEYS),
  next_action: z.string(),
  priority: z.number(),
  reasoning: z.string(),
});
export type ItemAssessment = z.infer<typeof ItemAssessment>;

export const RankedItem = ItemAssessment.extend({ id: z.string() });
export const Ranking = z.object({ items: z.array(RankedItem) });
export type Ranking = z.infer<typeof Ranking>;

/** What the Icebox check returns (PRD ICE-6). */
export const IceboxDecision = z.object({ bring_back: z.boolean(), reason: z.string() });
export type IceboxDecision = z.infer<typeof IceboxDecision>;

/** A schema the model is asked to fill in: a zod validator plus the JSON schema sent to Gemini. */
export type OutputSchema<T> = { name: string; zod: z.ZodType<T>; json: Record<string, unknown> };

const assessmentProps = {
  next_step: { type: "string", enum: NEXT_STEP_KEYS, description: "Whose move it is on this item: the one next step that applies, as the Output section defines them." },
  next_action: { type: "string", description: "One short sentence: what I should do next, or who/what we are waiting on." },
  priority: { type: "number", description: "Priority from 0.0 (ignore) to 1.0 (most urgent thing on my plate)." },
  reasoning: { type: "string", description: "2-4 sentences explaining the priority." },
};
const assessmentRequired = ["next_step", "next_action", "priority", "reasoning"];

export const ASSESSMENT: OutputSchema<ItemAssessment> = {
  name: "ItemAssessment", zod: ItemAssessment,
  json: { type: "object", properties: assessmentProps, required: assessmentRequired },
};
export const RANKING: OutputSchema<Ranking> = {
  name: "Ranking", zod: Ranking,
  json: {
    type: "object",
    properties: {
      items: {
        type: "array", description: "Every item, most important first.",
        items: {
          type: "object",
          properties: { ...assessmentProps, id: { type: "string", description: "The item id exactly as given, e.g. dart-lang/http#2031." } },
          required: [...assessmentRequired, "id"],
        },
      },
    },
    required: ["items"],
  },
};
export const ICEBOX_DECISION: OutputSchema<IceboxDecision> = {
  name: "IceboxDecision", zod: IceboxDecision,
  json: {
    type: "object",
    properties: {
      bring_back: { type: "boolean", description: "True if the change should bring the item back to the prioritized list." },
      reason: { type: "string", description: "One short sentence explaining the decision." },
    },
    required: ["bring_back", "reason"],
  },
};

export type Usage = { prompt_tokens?: number | null; output_tokens?: number | null; thinking_tokens?: number | null };

export interface LLM {
  generate<T>(system: string, user: string, schema: OutputSchema<T>): Promise<{ result: T; usage: Usage }>;
}

// ---------------------------------------------------------------------------
// Items and results
// ---------------------------------------------------------------------------

export type Scored = {
  id: string;
  priority: number;
  next_step: NextStep | null;
  next_action: string;
  reasoning: string;
  last_activity: string | null;
  usage: Usage;
  error: string | null;
};

const scored = (id: string, priority: number, x: Partial<Scored> = {}): Scored => ({
  id, priority, next_step: null, next_action: "", reasoning: "", last_activity: null, usage: {}, error: null, ...x,
});

/** An item to prioritize: a snapshot plus optional per-item state from the eval set. */
export class Item {
  snap: any;
  thumbsDownAt: string | null;
  /** Evaluate the item as it was at this time (see rewind.ts). */
  asOf: string | null;

  constructor(public id: string, snap: any, thumbsDownAt: string | Date | null = null, asOf: string | Date | null = null) {
    this.asOf = iso(asOf);
    this.thumbsDownAt = iso(thumbsDownAt);
    this.snap = this.asOf ? rewind(snap, this.asOf) : snap;
  }

  get updatedAt(): string { return this.snap.issue.updated_at; }
}

// ---------------------------------------------------------------------------
// Prompt assembly
// ---------------------------------------------------------------------------

export function aboutMe(user: UserSettings): string {
  const lines = ["## About me", `- My GitHub login: ${user.githubLogin}`];
  if (user.interestedRepos.length) {
    lines.push("- Repositories I am responsible for / interested in:");
    for (const r of user.interestedRepos) lines.push(`  - ${r.repo}` + (r.filter ? ` — my note: "${r.filter}"` : ""));
  }
  if (user.collaborators.length) lines.push(`- My usual collaborators: ${user.collaborators.join(", ")}`);
  if (user.reviewTeams.length) {
    lines.push("- GitHub teams I belong to (a review request to one of these teams is shared with the " +
      `rest of the team, not addressed to me personally): ${user.reviewTeams.join(", ")}`);
  }
  return lines.join("\n");
}

export const POINTWISE_OUTPUT = `## Output
You will be shown one GitHub issue or PR at a time, as it looked at \`current_time\`.
Activity marked "(ME)" was done by me. Return a JSON object with \`next_step\`,
\`next_action\`, \`priority\` (0.0-1.0) and \`reasoning\`. Priorities from separate
calls are sorted together into one list, so use the whole scale consistently.

${NEXT_STEP_LIST}`;

export const LISTWISE_OUTPUT = `## Output
You will be shown several GitHub issues and PRs, as they looked at \`current_time\`.
Activity marked "(ME)" was done by me. Return every item, ordered from most to
least important, each with \`id\` (exactly as given), \`next_step\`, \`next_action\`,
\`priority\` (0.0-1.0, non-increasing down the list) and \`reasoning\`.

${NEXT_STEP_LIST}`;

export type Strategy = "pointwise" | "listwise" | "recency";

export function systemInstruction(guidance: string, user: UserSettings, strategy: Strategy): string {
  const out = strategy === "pointwise" ? POINTWISE_OUTPUT : LISTWISE_OUTPUT;
  return `${strip(guidance)}\n\n${aboutMe(user)}\n\n${out}`;
}

/** `current_time: …` and the item's context: one pointwise request (RANK-18). */
export const pointwiseMessage = (now: string, context: string) => `current_time: ${now}\n\n${context}`;

// ---------------------------------------------------------------------------
// Strategies
// ---------------------------------------------------------------------------

function currentTime(items: Item[], override: string | null | undefined): string {
  if (override) return override;
  // Evaluate as of the latest snapshot time so every item shares one "now".
  const live = items.filter((i) => !i.asOf).map((i) => i.snap.fetched_at as string);
  return live.length ? live.reduce((a, b) => (b > a ? b : a)) : items.map((i) => i.asOf!).reduce((a, b) => (b > a ? b : a));
}

async function pool<T, R>(xs: T[], workers: number, fn: (x: T) => Promise<R>): Promise<R[]> {
  const out = new Array<R>(xs.length);
  let next = 0;
  const run = async () => { while (next < xs.length) { const i = next++; out[i] = await fn(xs[i]); } };
  await Promise.all(Array.from({ length: Math.max(1, Math.min(workers, xs.length)) }, run));
  return out;
}

export type PrioritizeOptions = {
  strategy?: Strategy;
  llm?: LLM | null;
  guidance?: string | null;
  includeSignals?: boolean;
  now?: string | null;
  workers?: number;
  onContext?: (key: string, text: string) => void;
};

/** Score items and return them in priority order (rank 1 first). */
export async function prioritize(items: Item[], user: UserSettings, opts: PrioritizeOptions = {}): Promise<Scored[]> {
  const strategy = opts.strategy ?? "pointwise";
  const nowS = currentTime(items, opts.now);

  if (strategy === "recency") {
    const out = items.map((i) => scored(i.id, 0.0, { last_activity: i.updatedAt }));
    out.sort((a, b) => (a.last_activity! < b.last_activity! ? 1 : a.last_activity! > b.last_activity! ? -1 : 0));
    const n = out.length;
    out.forEach((s, k) => { s.priority = pyRound(1 - k / Math.max(1, n - 1), 3); });
    return out;
  }
  const llm = opts.llm;
  if (!llm) throw new Error(`an LLM is required for strategy ${strategy}`);
  const guidance = opts.guidance ?? defaultPrompt();
  const system = systemInstruction(guidance, user, strategy);
  const itemNow = (i: Item) => i.asOf ?? nowS;
  const contexts = new Map(items.map((i) => [
    i.id, buildContext(i.snap, user, parseTime(itemNow(i)), opts.includeSignals ?? true, i.thumbsDownAt),
  ]));
  if (opts.onContext) {
    opts.onContext("__system__", system);
    for (const [k, v] of contexts) opts.onContext(k, v);
  }

  if (strategy === "pointwise") {
    const out = await pool(items, opts.workers ?? 6, async (item) => {
      try {
        const { result: a, usage } = await llm.generate(system, pointwiseMessage(itemNow(item), contexts.get(item.id)!), ASSESSMENT);
        return scored(item.id, Number(a.priority), {
          next_step: a.next_step, next_action: a.next_action, reasoning: a.reasoning, last_activity: item.updatedAt, usage,
        });
      } catch (e) { // keep the run going; report the failure
        return scored(item.id, -1.0, { error: `${(e as Error).name}: ${(e as Error).message}`, last_activity: item.updatedAt });
      }
    });
    // Highest priority first; ties by most recent activity (RANK-4).
    out.sort((a, b) => b.priority - a.priority || ((b.last_activity ?? "") < (a.last_activity ?? "") ? -1 : (b.last_activity ?? "") > (a.last_activity ?? "") ? 1 : 0));
    return out;
  }

  // listwise
  const parts = [`current_time: ${nowS}\n\nThere are ${items.length} items. Their ids are: ${items.map((i) => i.id).join(", ")}`];
  for (const i of items) {
    const when = i.asOf ? ` (evaluate as if current_time were ${i.asOf})` : "";
    parts.push(`\n\n======== id: ${i.id}${when} ========\n${contexts.get(i.id)}`);
  }
  const { result: r, usage } = await llm.generate(system, parts.join(""), RANKING);
  const byId = new Map(items.map((i) => [i.id, i]));
  const out: Scored[] = [];
  const seen = new Set<string>();
  for (const ri of r.items) {
    if (!byId.has(ri.id) || seen.has(ri.id)) continue;
    seen.add(ri.id);
    // Position defines the order; keep the model's priority for display.
    out.push(scored(ri.id, Number(ri.priority), {
      next_step: ri.next_step, next_action: ri.next_action, reasoning: ri.reasoning, last_activity: byId.get(ri.id)!.updatedAt,
    }));
  }
  for (const i of items) if (!seen.has(i.id)) out.push(scored(i.id, -1.0, { error: "omitted by model", last_activity: i.updatedAt }));
  if (out.length) out[0].usage = usage;
  return out;
}
