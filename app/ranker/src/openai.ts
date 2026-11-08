// Calling OpenAI through the Responses API with structured JSON output (PRD
// RANK-19; design: The ranking agent). Plain fetch, as for Claude.
import { Classified, InvalidOutput } from "./gemini.ts";
import { classifyCommon, httpError, ProviderHttpError, strictSchema, withRetries, type ProviderOptions } from "./http.ts";
import type { LLM, OutputSchema, Usage } from "./prioritizer.ts";

export const OPENAI_API = "https://api.openai.com/v1";
const MAX_OUTPUT_TOKENS = 4096;
/** Codes in a 429 that mean credits or a spend limit, not a rate limit. */
const CREDIT_CODES = /insufficient_quota|credit_balance_exhausted|spend_limit_exceeded|usage_limit_exceeded/;

/** Maps an OpenAI failure to a worker error code (design: Ranking worker, "Error codes"; PRD catalogue). */
export function classifyOpenAI(e: unknown): Classified {
  const common = classifyCommon(e);
  if (common) return common;
  if (!(e instanceof ProviderHttpError)) return new Classified("unknown", String(e));
  const { status } = e;
  const { code = "", type = "" } = e.error;
  const text = e.message;
  if (status === 401) return new Classified("key_invalid", text);
  if (status === 403) return new Classified("permission_denied", text);
  if (status === 404 || code === "model_not_found") return new Classified("model_not_found", text);
  if (status === 429 && (CREDIT_CODES.test(code) || CREDIT_CODES.test(type))) return new Classified("credits_exhausted", text);
  if (status === 429) return new Classified("rate_limited", text, e.retryAfterSeconds ?? 30);
  if ([408, 500, 502, 503, 504].includes(status)) return new Classified("unavailable", text, 30);
  return new Classified("unknown", text);
}

export class OpenAILLM implements LLM {
  model: string;
  private apiKey: string;
  private effort: string;
  private maxRetries: number;
  private timeoutMs: number | null;
  private f: typeof fetch;

  constructor(opts: ProviderOptions) {
    this.model = opts.model;
    this.apiKey = opts.apiKey ?? process.env.OPENAI_API_KEY ?? "";
    // "none" is the lowest reasoning effort the current models allow (RANK-19).
    this.effort = opts.thinkingLevel ?? "none";
    this.maxRetries = opts.maxRetries ?? 6;
    this.timeoutMs = opts.timeoutMs ?? null;
    this.f = opts.fetch ?? fetch;
  }

  async generate<T>(system: string, user: string, schema: OutputSchema<T>): Promise<{ result: T; usage: Usage }> {
    const body = JSON.stringify({
      model: this.model,
      instructions: system,
      input: user,
      reasoning: { effort: this.effort },
      text: { format: { type: "json_schema", name: schema.name, schema: strictSchema(schema.json), strict: true } },
      max_output_tokens: MAX_OUTPUT_TOKENS,
      // OpenAI keeps nothing for later retrieval (PRD PRIV-2).
      store: false,
    });
    return withRetries({ provider: "OpenAI", maxRetries: this.maxRetries, timeoutMs: this.timeoutMs, classify: classifyOpenAI }, async (signal) => {
      const res = await this.f(`${OPENAI_API}/responses`, {
        method: "POST",
        headers: { authorization: `Bearer ${this.apiKey}`, "content-type": "application/json" },
        body,
        signal,
      });
      if (!res.ok) throw await httpError("OpenAI", res);
      const data = await res.json() as any;
      const content = (data.output ?? []).filter((o: any) => o.type === "message").flatMap((o: any) => o.content ?? []);
      if (content.some((c: any) => c.type === "refusal")) throw new Classified("blocked", "OpenAI refused to answer");
      if (data.status === "incomplete") throw new InvalidOutput(`output for ${schema.name} was cut off (${data.incomplete_details?.reason ?? "incomplete"})`);
      const text = content.filter((c: any) => c.type === "output_text").map((c: any) => c.text).join("");
      const parsed = schema.zod.safeParse(JSON.parse(text));
      if (!parsed.success) throw new InvalidOutput(`output didn't match ${schema.name}: ${parsed.error.message.slice(0, 300)}`);
      const u = data.usage ?? {};
      return {
        result: parsed.data,
        usage: { prompt_tokens: u.input_tokens ?? null, output_tokens: u.output_tokens ?? null, thinking_tokens: u.output_tokens_details?.reasoning_tokens ?? null },
      };
    });
  }
}
