// Basic ranking (PRD RANK-21): a Gemini decision model, called through the
// Decisions API with Gitilizer's own key. A decision model answers questions
// with probabilities and writes no text, so an assessment has a score and a
// next step, and no next action or reasoning (RANK-2, RANK-21, RANK-23).
// Plain fetch, like Claude and OpenAI (design: The ranking agent).
import { Classified, classifyGemini, InvalidOutput } from "./gemini.ts";
import { classifyCommon, httpError, ProviderHttpError, withRetries, type ProviderOptions } from "./http.ts";
import { NEXT_STEP_QUESTION, NEXT_STEPS, type LLM, type NextStep, type OutputSchema, type Usage } from "./prioritizer.ts";

export const DECISIONS_API = "https://generativelanguage.googleapis.com/v1beta/decisions";
export const DEFAULT_BASIC_MODEL = "gemini-decision-1";

/** One range of a prompt's scale: scores from `low` to `high` and what earns them. */
export type Band = { low: number; high: number; text: string };

/** Used when the prompt has no scale to read, as a custom prompt may not (SET-24). */
export const GENERIC_BANDS: Band[] = [
  { low: 0.0, high: 0.2, text: "Nothing for me to do, or it can be ignored." },
  { low: 0.2, high: 0.4, text: "Low priority: it can wait, or it is waiting on someone else." },
  { low: 0.4, high: 0.6, text: "Medium priority: I should get to it, but nothing is blocked on me today." },
  { low: 0.6, high: 0.8, text: "High priority: someone is waiting on me, or it is my planned work." },
  { low: 0.8, high: 1.0, text: "Urgent: among the most important things on my plate right now." },
];

const BAND_LINE = /^\s*[-*]\s*(\d(?:\.\d+)?)\s*(?:–|—|-|to)\s*(\d(?:\.\d+)?)\s*:\s*(.*)$/;

/**
 * The score ranges a ranking prompt defines, lowest first: list items such as
 * "- 0.65–0.8: Reviews waiting on me…", with their wrapped lines, as the
 * "Scale" section of prompts/v4.md has. The decision model picks one of these
 * instead of writing a number. A prompt with fewer than two gets GENERIC_BANDS.
 */
export function scaleBands(prompt: string): Band[] {
  const bands: Band[] = [];
  let open: Band | null = null;
  for (const line of prompt.split("\n")) {
    const m = BAND_LINE.exec(line);
    if (m) {
      const low = Number(m[1]), high = Number(m[2]);
      open = low < high && high <= 1 ? { low, high, text: m[3].trim() } : null;
      if (open) bands.push(open);
    } else if (open && /^\s+\S/.test(line)) {
      open.text += ` ${line.trim()}`; // a wrapped line of the same list item
    } else {
      open = null;
    }
  }
  if (bands.length < 2) return GENERIC_BANDS;
  return bands.sort((a, b) => a.low - b.low).map((b) => ({ ...b, text: b.text.replace(/\s*\(see above\)/g, "") }));
}

/** Maps a Decisions API failure to a worker error code (design: Ranking worker, "Basic ranking"). */
export function classifyDecision(e: unknown): Classified {
  const common = classifyCommon(e);
  if (common) return common;
  if (!(e instanceof ProviderHttpError)) return classifyGemini(e);
  // A spending cap is a 429 that waiting a minute won't fix (RANK-22).
  if (e.status === 429 && /spend|budget|billing|monthly/i.test(e.body)) return new Classified("credits_exhausted", e.message);
  const c = classifyGemini({ status: e.status, message: e.body });
  if (c.code === "rate_limited" && e.retryAfterSeconds !== null) c.retryAfter = e.retryAfterSeconds;
  return c;
}

const PRIORITY_QUESTION = "Following the instructions above, how much does this GitHub item deserve my attention right now? Pick the band from the Scale section.";
const PRIORITY_QUESTION_GENERIC = "Following the instructions above, how much does this GitHub item deserve my attention right now?";
const BRING_BACK_QUESTION = "Following the instructions above, should this change bring the item back to my prioritized list?";

const probability = (x: unknown, what: string): number => {
  if (typeof x !== "number" || !Number.isFinite(x) || x < 0 || x > 1) throw new InvalidOutput(`the decision model's ${what} isn't a probability: ${JSON.stringify(x)}`);
  return x;
};

export class DecisionLLM implements LLM {
  model: string;
  private apiKey: string;
  private maxRetries: number;
  private timeoutMs: number | null;
  private f: typeof fetch;

  constructor(opts: Partial<ProviderOptions> = {}) {
    this.model = opts.model ?? DEFAULT_BASIC_MODEL;
    this.apiKey = opts.apiKey ?? process.env.BASIC_RANKING_API_KEY ?? process.env.GEMINI_API_KEY ?? "";
    this.maxRetries = opts.maxRetries ?? 6;
    this.timeoutMs = opts.timeoutMs ?? null;
    this.f = opts.fetch ?? fetch;
  }

  async generate<T>(system: string, user: string, schema: OutputSchema<T>): Promise<{ result: T; usage: Usage }> {
    let questions: Record<string, unknown>;
    let bands: Band[] = [];
    if (schema.name === "ItemAssessment") {
      bands = scaleBands(system);
      questions = {
        priority: { type: "score", instructions: bands === GENERIC_BANDS ? PRIORITY_QUESTION_GENERIC : PRIORITY_QUESTION, criteria: bands.map((b) => b.text) },
        // A choice question: the model picks one of the named options, here the seven next steps in RANK-23.
        next_step: { type: "choice", instructions: NEXT_STEP_QUESTION, criteria: NEXT_STEPS },
      };
    } else if (schema.name === "IceboxDecision") {
      questions = { bring_back: { type: "noul", instructions: BRING_BACK_QUESTION } };
    } else {
      throw new InvalidOutput(`the decision model scores one item at a time, not ${schema.name}`);
    }
    const body = JSON.stringify({ model: this.model, input: [{ type: "text", text: `${system}\n\n` }, { type: "text", text: user }], questions });
    return withRetries({ provider: "Gemini", maxRetries: this.maxRetries, timeoutMs: this.timeoutMs, classify: classifyDecision }, async (signal) => {
      const res = await this.f(DECISIONS_API, {
        method: "POST",
        headers: { "x-goog-api-key": this.apiKey, "content-type": "application/json" },
        body,
        signal,
      });
      if (!res.ok) throw await httpError("Gemini", res);
      const d = JSON.parse(await res.text());
      const answers = d?.answers ?? {};
      let result: unknown;
      if (schema.name === "ItemAssessment") {
        // The score is the middle of each range, weighted by how likely the model thinks the range is.
        const probabilities = answers.priority?.probabilities;
        if (!probabilities || typeof probabilities !== "object") throw new InvalidOutput("the decision model gave no probabilities for the score");
        let priority = 0, total = 0;
        for (const [k, p] of Object.entries(probabilities)) {
          const band = bands[Number(k)];
          if (!band) throw new InvalidOutput(`the decision model chose a range that wasn't offered: ${k}`);
          const weight = probability(p, "score");
          priority += weight * (band.low + band.high) / 2;
          total += weight;
        }
        if (total <= 0) throw new InvalidOutput("the decision model's probabilities for the score add up to nothing");
        const step = answers.next_step?.choice;
        if (typeof step !== "string" || !Object.hasOwn(NEXT_STEPS, step)) throw new InvalidOutput(`the decision model chose a next step that wasn't offered: ${JSON.stringify(step)}`);
        result = { next_step: step as NextStep, next_action: "", priority: priority / total, reasoning: "" };
      } else {
        result = { bring_back: probability(answers.bring_back?.noul, "answer") >= 0.5, reason: "" };
      }
      const parsed = schema.zod.safeParse(result);
      if (!parsed.success) throw new InvalidOutput(`output didn't match ${schema.name}: ${parsed.error.message.slice(0, 300)}`);
      return { result: parsed.data, usage: { prompt_tokens: d?.usage?.total_input_tokens ?? null, output_tokens: 0, thinking_tokens: 0 } };
    });
  }
}
