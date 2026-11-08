// The ranking agents a developer can choose (PRD SET-38, RANK-19): which
// client to call for each, and checking a Claude or OpenAI key (SET-28).
import { ClaudeLLM, CLAUDE_API, classifyClaude } from "./anthropic.ts";
import { classifyGemini, GeminiLLM, type Classified } from "./gemini.ts";
import type { ProviderOptions } from "./http.ts";
import { classifyOpenAI, OPENAI_API, OpenAILLM } from "./openai.ts";
import type { LLM } from "./prioritizer.ts";

export const AGENTS = ["gemini", "claude", "openai"] as const;
export type Agent = (typeof AGENTS)[number];

/** The model each agent ranks with (RANK-19). Gemini's models, with their backups, are in the server's config (RANK-13). */
export const DEFAULT_AGENT_MODELS: Record<Exclude<Agent, "gemini">, string> = {
  claude: "claude-haiku-5-5",
  openai: "gpt-6-luna",
};

/** The agent a model name belongs to, for the evaluation CLI. */
export function agentForModel(model: string): Agent {
  if (/^claude-/.test(model)) return "claude";
  if (/^(gpt-|o\d)/.test(model)) return "openai";
  return "gemini";
}

/** The client for one agent and model. */
export function createLLM(agent: Agent, opts: ProviderOptions): LLM {
  if (agent === "claude") return new ClaudeLLM(opts);
  if (agent === "openai") return new OpenAILLM(opts);
  return new GeminiLLM({ model: opts.model, apiKey: opts.apiKey, thinkingLevel: opts.thinkingLevel, maxRetries: opts.maxRetries, timeoutMs: opts.timeoutMs });
}

/** Maps any failure from an agent's client to a worker error code. */
export function classifyFor(agent: Agent, e: unknown): Classified {
  if (agent === "claude") return classifyClaude(e);
  if (agent === "openai") return classifyOpenAI(e);
  return classifyGemini(e);
}

/** What checking a key found (SET-28). */
export type KeyCheck = "ok" | "not_accepted" | "permission_denied" | "no_credits" | "unreachable" | "error";

/**
 * Checks a Claude or OpenAI key by looking up the model Gitilizer ranks with,
 * which uses no tokens (SET-28). A key whose account has no credits passes,
 * unless the provider says so in its answer.
 */
export async function checkAgentKey(agent: "claude" | "openai", key: string, model: string, f: typeof fetch = fetch): Promise<{ result: KeyCheck; status?: number; body?: string }> {
  const url = agent === "claude" ? `${CLAUDE_API}/models/${encodeURIComponent(model)}` : `${OPENAI_API}/models/${encodeURIComponent(model)}`;
  const headers: Record<string, string> = agent === "claude"
    ? { "x-api-key": key, "anthropic-version": "2023-06-01" }
    : { authorization: `Bearer ${key}` };
  let res: Response;
  try {
    res = await f(url, { headers, signal: AbortSignal.timeout(10_000) });
  } catch {
    return { result: "unreachable" };
  }
  if (res.ok) return { result: "ok" };
  const body = await res.text().catch(() => "");
  const status = res.status;
  if (status === 401) return { result: "not_accepted", status };
  if (status === 402 || /credit balance|insufficient_quota|credit_balance_exhausted|spend_limit|billing/i.test(body)) return { result: "no_credits", status };
  if (status === 403 || status === 404) return { result: "permission_denied", status };
  if (status >= 500) return { result: "unreachable", status };
  return { result: "error", status, body: body.slice(0, 300) };
}
