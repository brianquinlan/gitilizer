// Calling Claude through the Messages API with structured JSON output (PRD
// RANK-19; design: The ranking agent). Plain fetch, no SDK: the request is one
// POST, and owning it keeps error classification and timeouts the same for
// every agent.
import { Classified, InvalidOutput } from "./gemini.ts";
import { classifyCommon, httpError, ProviderHttpError, strictSchema, withRetries, type ProviderOptions } from "./http.ts";
import type { LLM, OutputSchema, Usage } from "./prioritizer.ts";

export const CLAUDE_API = "https://api.anthropic.com/v1";
const VERSION = "2023-06-01";
/** Enough for the longest answer the schemas allow; an answer cut off here is invalid output. */
const MAX_TOKENS = 4096;

/** Maps a Claude failure to a worker error code (design: Ranking worker, "Error codes"; PRD catalogue). */
export function classifyClaude(e: unknown): Classified {
  const common = classifyCommon(e);
  if (common) return common;
  if (!(e instanceof ProviderHttpError)) return new Classified("unknown", String(e));
  const { status, body } = e;
  const text = e.message;
  const billing = /credit balance|spend limit|spending limit|usage limit|billing/i.test(body);
  if (status === 401) return new Classified("key_invalid", text);
  if (status === 402) return new Classified("credits_exhausted", text);
  if (status === 400 && billing) return new Classified("credits_exhausted", text);
  if (status === 403) return new Classified("permission_denied", text);
  if (status === 404) return new Classified("model_not_found", text);
  // A monthly spend cap is a 429 with no retry-after, and retrying won't help until the cap lifts.
  if (status === 429 && e.retryAfterSeconds === null && billing) return new Classified("credits_exhausted", text);
  if (status === 429) return new Classified("rate_limited", text, e.retryAfterSeconds ?? 30);
  if ([408, 500, 502, 503, 504, 529].includes(status)) return new Classified("unavailable", text, 30);
  return new Classified("unknown", text);
}

export class ClaudeLLM implements LLM {
  model: string;
  private apiKey: string;
  private maxRetries: number;
  private timeoutMs: number | null;
  private f: typeof fetch;

  constructor(opts: ProviderOptions) {
    this.model = opts.model;
    this.apiKey = opts.apiKey ?? process.env.ANTHROPIC_API_KEY ?? "";
    this.maxRetries = opts.maxRetries ?? 6;
    this.timeoutMs = opts.timeoutMs ?? null;
    this.f = opts.fetch ?? fetch;
    // Ranking runs without extended thinking, which is off unless asked for (RANK-19).
    if (opts.thinkingLevel && opts.thinkingLevel !== "none") throw new Error("Claude ranks without thinking; leave the thinking level unset");
  }

  async generate<T>(system: string, user: string, schema: OutputSchema<T>): Promise<{ result: T; usage: Usage }> {
    const body = JSON.stringify({
      model: this.model,
      max_tokens: MAX_TOKENS,
      system,
      messages: [{ role: "user", content: user }],
      output_config: { format: { type: "json_schema", schema: strictSchema(schema.json) } },
    });
    return withRetries({ provider: "Claude", maxRetries: this.maxRetries, timeoutMs: this.timeoutMs, classify: classifyClaude }, async (signal) => {
      const res = await this.f(`${CLAUDE_API}/messages`, {
        method: "POST",
        headers: { "x-api-key": this.apiKey, "anthropic-version": VERSION, "content-type": "application/json" },
        body,
        signal,
      });
      if (!res.ok) throw await httpError("Claude", res);
      const data = await res.json() as any;
      if (data.stop_reason === "refusal") throw new Classified("blocked", "Claude refused to answer");
      if (data.stop_reason === "max_tokens") throw new InvalidOutput(`output for ${schema.name} was cut off`);
      const text = (data.content ?? []).filter((c: any) => c.type === "text").map((c: any) => c.text).join("");
      const parsed = schema.zod.safeParse(JSON.parse(text));
      if (!parsed.success) throw new InvalidOutput(`output didn't match ${schema.name}: ${parsed.error.message.slice(0, 300)}`);
      const u = data.usage ?? {};
      return {
        result: parsed.data,
        usage: { prompt_tokens: u.input_tokens ?? null, output_tokens: u.output_tokens ?? null, thinking_tokens: u.output_tokens_details?.thinking_tokens ?? null },
      };
    });
  }
}
