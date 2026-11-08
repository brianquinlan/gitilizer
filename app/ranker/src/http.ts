// Shared plumbing for the ranking agents called over plain HTTPS (Claude and
// OpenAI): errors that keep the status, headers and body for classification,
// strict JSON schemas, and a retry loop with a deadline, as GeminiLLM has
// (design: Ranking worker, "Timeouts").
import { Classified, InvalidOutput } from "./gemini.ts";

export type ProviderName = "Claude" | "OpenAI";

/** A non-2xx answer from a provider. */
export class ProviderHttpError extends Error {
  constructor(public provider: ProviderName, public status: number, public body: string, public retryAfterSeconds: number | null) {
    super(`${provider} ${status}: ${body.slice(0, 300)}`);
    this.name = "ProviderHttpError";
  }
  /** The `error` object of a JSON body, if there is one. */
  get error(): { type?: string; code?: string; message?: string } {
    try {
      const e = JSON.parse(this.body)?.error;
      return e && typeof e === "object" ? e : {};
    } catch {
      return {};
    }
  }
}

/** Seconds from a `retry-after` header: a number of seconds or an HTTP date. */
export function retryAfterHeader(value: string | null): number | null {
  if (!value) return null;
  const n = Number(value);
  if (Number.isFinite(n)) return Math.max(0, n);
  const t = Date.parse(value);
  return Number.isFinite(t) ? Math.max(0, Math.round((t - Date.now()) / 1000)) : null;
}

export async function httpError(provider: ProviderName, res: Response): Promise<ProviderHttpError> {
  const body = await res.text().catch(() => "");
  return new ProviderHttpError(provider, res.status, body, retryAfterHeader(res.headers.get("retry-after")));
}

/**
 * A copy of a JSON schema that structured output modes accept: every object
 * lists all its properties as required and allows no others.
 */
export function strictSchema(schema: Record<string, unknown>): Record<string, unknown> {
  const walk = (s: unknown): unknown => {
    if (Array.isArray(s)) return s.map(walk);
    if (!s || typeof s !== "object") return s;
    const o: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(s)) o[k] = k === "properties" ? Object.fromEntries(Object.entries(v as object).map(([p, ps]) => [p, walk(ps)])) : walk(v);
    if (o.type === "object" && o.properties) {
      o.required = Object.keys(o.properties as object);
      o.additionalProperties = false;
    }
    return o;
  };
  return walk(schema) as Record<string, unknown>;
}

/** Errors any provider can produce that aren't an HTTP status: malformed output and network failures. */
export function classifyCommon(e: unknown): Classified | null {
  if (e instanceof Classified) return e;
  const text = `${(e as any)?.message ?? ""} ${String(e)}`;
  if (e instanceof InvalidOutput || e instanceof SyntaxError) {
    if (/refus|safety|blocked/i.test(text)) return new Classified("blocked", text);
    return new Classified("invalid_output", text);
  }
  if ((e as any)?.name === "TypeError" && /fetch failed/i.test(text)) return new Classified("unavailable", text, 30);
  if (/ECONNRESET|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|socket hang up/i.test(text)) return new Classified("unavailable", text, 30);
  return null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type RetryPolicy = {
  provider: ProviderName;
  maxRetries: number;
  /** The longest one generate() may take, retries included; null for no limit. */
  timeoutMs: number | null;
  classify: (e: unknown) => Classified;
};

/**
 * Runs `attempt` until it succeeds or fails for good. Rate limits and outages
 * are retried with backoff while the deadline allows; malformed output is
 * retried twice. Every failure is thrown as a Classified error, so the server
 * knows what to do with it.
 */
export async function withRetries<T>(policy: RetryPolicy, attempt: (signal: AbortSignal | undefined) => Promise<T>): Promise<T> {
  const deadline = policy.timeoutMs ? Date.now() + policy.timeoutMs : Infinity;
  const timedOut = () => new Classified("unavailable", `${policy.provider} didn't answer within ${Math.round(policy.timeoutMs! / 1000)} s`, 30);
  let delay = 2000;
  let malformed = 0;
  for (let n = 0; ; n++) {
    const left = deadline - Date.now();
    if (left <= 0) throw timedOut();
    const signal = Number.isFinite(left) ? AbortSignal.timeout(left) : undefined;
    try {
      return await attempt(signal);
    } catch (e) {
      if (signal?.aborted) throw timedOut();
      const c = policy.classify(e);
      if ((c.code === "rate_limited" || c.code === "unavailable") && n < policy.maxRetries - 1) {
        const wait = Math.max(delay, (c.retryAfter ?? 0) * 1000);
        // A long wait, or one that doesn't fit before the deadline, goes back to the server's queue instead.
        if (wait > 60_000 || deadline - Date.now() <= wait) throw c;
        await sleep(wait);
        delay = Math.min(delay * 2, 60_000);
        continue;
      }
      if (c.code === "invalid_output" && malformed < 2) { malformed++; continue; }
      throw c;
    }
  }
}

export type ProviderOptions = {
  model: string;
  apiKey?: string;
  /** Thinking or reasoning level; null for the provider's lowest (RANK-11, RANK-19). */
  thinkingLevel?: string | null;
  maxRetries?: number;
  timeoutMs?: number | null;
  /** Replaced in tests. */
  fetch?: typeof fetch;
};
