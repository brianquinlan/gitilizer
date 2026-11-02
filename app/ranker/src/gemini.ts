// Calling Gemini, classifying its failures, and a fake model for tests and
// fixture mode (design: Ranking worker).
import { createHash } from "node:crypto";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { DEFAULT_MODEL, ICEBOX_DECISION, type LLM, type OutputSchema, type Usage } from "./prioritizer.ts";

/** A Gemini failure sorted into the codes the server understands (design: Ranking worker, "Error codes"). */
export class Classified extends Error {
  constructor(public code: string, message: string, public retryAfter: number | null = null) {
    super(message);
    this.name = "Classified";
  }
}

/** The output didn't match the schema: an item-level failure. */
export class InvalidOutput extends Error {
  constructor(message: string) { super(message); this.name = "InvalidOutput"; }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function retryAfter(text: string): number | null {
  const m = /retryDelay["']?\s*[:=]\s*["']?(\d+(?:\.\d+)?)s/.exec(text);
  return m ? Number(m[1]) : null;
}

/** Maps a @google/genai error (or anything else) to a worker error code. */
export function classifyGemini(e: unknown): Classified {
  if (e instanceof Classified) return e;
  const err = e as any;
  const code: number | undefined = typeof err?.status === "number" ? err.status : typeof err?.code === "number" ? err.code : undefined;
  const text = `${err?.status ?? ""} ${err?.message ?? ""} ${String(e)}`;
  const low = text.toLowerCase();
  if (code !== undefined) {
    if (code === 401 || (code === 400 && (low.includes("api_key_invalid") || low.includes("api key not valid")))) return new Classified("key_invalid", text);
    if (code === 402) return new Classified("credits_exhausted", text);
    if (code === 403 && low.includes("leaked")) return new Classified("key_leaked", text);
    if ((code === 400 || code === 403) && ["billing", "unpaid", "payment", "free tier"].some((w) => low.includes(w))) return new Classified("billing_required", text);
    if (code === 403) return new Classified("permission_denied", text);
    if (code === 404) return new Classified("model_not_found", text);
    if (code === 429) {
      // Per-day quotas switch to the next model (RANK-13); per-minute limits wait (RANK-14).
      if (low.replaceAll(" ", "").includes("perday") || low.includes("per day") || low.includes("daily")) return new Classified("daily_quota", text, retryAfter(text));
      return new Classified("rate_limited", text, retryAfter(text) ?? 30);
    }
    if ([408, 500, 502, 503, 504].includes(code)) return new Classified("unavailable", text, 30);
  }
  if (e instanceof InvalidOutput || e instanceof SyntaxError) {
    if (["safety", "recitation", "blocked", "prohibited"].some((w) => low.includes(w))) return new Classified("blocked", text);
    return new Classified("invalid_output", text);
  }
  if (err?.name === "TypeError" && /fetch failed/i.test(text)) return new Classified("unavailable", text, 30);
  if (/ECONNRESET|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|socket hang up/i.test(text)) return new Classified("unavailable", text, 30);
  return new Classified("unknown", text);
}

export type GeminiOptions = { model?: string; apiKey?: string; thinkingLevel?: string | null; maxRetries?: number };

export class GeminiLLM implements LLM {
  private ai: GoogleGenAI;
  model: string;
  private thinkingLevel: string | null;
  private maxRetries: number;

  constructor(opts: GeminiOptions = {}) {
    this.ai = new GoogleGenAI({ apiKey: opts.apiKey ?? process.env.GEMINI_API_KEY });
    this.model = opts.model ?? DEFAULT_MODEL;
    this.thinkingLevel = opts.thinkingLevel ?? null;
    this.maxRetries = opts.maxRetries ?? 6;
  }

  async generate<T>(system: string, user: string, schema: OutputSchema<T>): Promise<{ result: T; usage: Usage }> {
    const config: Record<string, unknown> = {
      systemInstruction: system,
      responseMimeType: "application/json",
      responseJsonSchema: schema.json,
    };
    if (this.thinkingLevel) config.thinkingConfig = { thinkingLevel: this.thinkingLevel.toUpperCase() as ThinkingLevel };
    let delay = 2000;
    for (let attempt = 0; ; attempt++) {
      try {
        const resp = await this.ai.models.generateContent({ model: this.model, contents: user, config });
        const parsed = schema.zod.safeParse(JSON.parse(resp.text ?? ""));
        if (!parsed.success) {
          const reason = resp.candidates?.[0]?.finishReason ?? "";
          throw new InvalidOutput(`output didn't match ${schema.name} (${reason}): ${parsed.error.message.slice(0, 300)}`);
        }
        const u = resp.usageMetadata;
        return {
          result: parsed.data,
          usage: { prompt_tokens: u?.promptTokenCount ?? null, output_tokens: u?.candidatesTokenCount ?? null, thinking_tokens: u?.thoughtsTokenCount ?? null },
        };
      } catch (e) {
        const status = (e as any)?.status;
        if ([429, 500, 502, 503, 504].includes(status) && attempt < this.maxRetries - 1) {
          // A per-day quota won't come back in a few seconds; let the caller switch models.
          if (status === 429 && classifyGemini(e).code === "daily_quota") throw e;
          await sleep(delay);
          delay = Math.min(delay * 2, 60_000);
          continue;
        }
        if ((e instanceof InvalidOutput || e instanceof SyntaxError) && attempt < 2) continue; // malformed JSON: retry once or twice
        throw e;
      }
    }
  }
}

/** Lists the models a key can use (the setup check). */
export async function listModels(apiKey?: string): Promise<string[]> {
  const ai = new GoogleGenAI({ apiKey: apiKey ?? process.env.GEMINI_API_KEY });
  const names: string[] = [];
  for await (const m of await ai.models.list()) if (m.name) names.push(m.name.replace(/^models\//, ""));
  return names;
}

const UNIMPORTANT = ["labeled", "unlabeled", "milestoned", "demilestoned", "renamed"];

/**
 * Deterministic answers without a network call, for tests and fixture mode. A
 * changed item gets a new score. The Icebox check keeps an item only when every
 * new event is a bot's or a label or milestone edit, as the real prompt asks.
 * FAKE_LLM_ERROR=<code> makes every call fail with that code.
 */
export class FakeLLM implements LLM {
  async generate<T>(_system: string, user: string, schema: OutputSchema<T>): Promise<{ result: T; usage: Usage }> {
    const forced = process.env.FAKE_LLM_ERROR;
    if (forced) throw new Classified(forced, `forced by FAKE_LLM_ERROR=${forced}`, 60);
    if (schema === (ICEBOX_DECISION as unknown)) {
      const events = user.split("\n").filter((l) => l.startsWith("["));
      const keep = events.length > 0 && events.every((line) => {
        const actor = (line.split("] ").slice(1).join("] ").split(" ")[0]) ?? "";
        return actor.includes("[bot]") || UNIMPORTANT.some((k) => line.includes(` ${k}`));
      });
      const result = { bring_back: !keep, reason: `Fake model: ${keep ? "only unimportant changes" : "a person changed it"}` };
      return { result: result as T, usage: {} };
    }
    const h = parseInt(createHash("sha256").update(user).digest("hex").slice(0, 8), 16);
    const priority = Math.round(h % 1000) / 1000;
    const result = { actionable: priority > 0.5, next_action: "(fake) Look at this.", priority, reasoning: "Fake model: score derived from the item's content." };
    return { result: result as T, usage: {} };
  }
}
