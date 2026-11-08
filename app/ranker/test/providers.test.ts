// Claude and OpenAI clients (PRD RANK-19, SET-28): requests, parsing and error codes, against a fake fetch.
import { describe, expect, it } from "vitest";
import { agentForModel, checkAgentKey, ClaudeLLM, classifyClaude, classifyOpenAI, OpenAILLM, ProviderHttpError, strictSchema, ASSESSMENT, ICEBOX_DECISION } from "../src/index.ts";

type Call = { url: string; init: RequestInit };
function fakeFetch(responses: (Response | Error)[]) {
  const calls: Call[] = [];
  const f = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    const r = responses.shift();
    if (!r) throw new Error("no more responses");
    if (r instanceof Error) throw r;
    return r;
  }) as unknown as typeof fetch;
  return { f, calls };
}
const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } });
const assessment = { actionable: true, next_action: "Review it.", priority: 0.8, reasoning: "Asked for your review." };

describe("strictSchema", () => {
  it("requires every property and forbids others, at every level", () => {
    const s = strictSchema({ type: "object", properties: { a: { type: "object", properties: { b: { type: "string" } } } }, required: [] }) as any;
    expect(s.required).toEqual(["a"]);
    expect(s.additionalProperties).toBe(false);
    expect(s.properties.a).toMatchObject({ required: ["b"], additionalProperties: false });
  });
});

describe("ClaudeLLM", () => {
  it("asks for structured output and reads the answer and usage", async () => {
    const { f, calls } = fakeFetch([json({
      content: [{ type: "text", text: JSON.stringify(assessment) }], stop_reason: "end_turn",
      usage: { input_tokens: 4900, output_tokens: 120, output_tokens_details: { thinking_tokens: 0 } },
    })]);
    const llm = new ClaudeLLM({ model: "claude-haiku-5-5", apiKey: "sk-ant-x", fetch: f });
    const r = await llm.generate("system", "user", ASSESSMENT);
    expect(r.result).toEqual(assessment);
    expect(r.usage).toEqual({ prompt_tokens: 4900, output_tokens: 120, thinking_tokens: 0 });
    const body = JSON.parse(String(calls[0].init.body));
    expect(calls[0].url).toBe("https://api.anthropic.com/v1/messages");
    expect((calls[0].init.headers as any)["x-api-key"]).toBe("sk-ant-x");
    expect(body).toMatchObject({ model: "claude-haiku-5-5", system: "system", messages: [{ role: "user", content: "user" }] });
    expect(body.output_config.format.schema.additionalProperties).toBe(false);
    expect(body.thinking).toBeUndefined();
  });

  it("retries malformed output twice, then reports invalid_output", async () => {
    const bad = () => json({ content: [{ type: "text", text: "{not json" }], stop_reason: "end_turn", usage: {} });
    const { f, calls } = fakeFetch([bad(), bad(), bad()]);
    await expect(new ClaudeLLM({ model: "m", apiKey: "k", fetch: f }).generate("s", "u", ICEBOX_DECISION)).rejects.toMatchObject({ code: "invalid_output" });
    expect(calls).toHaveLength(3);
  });

  it("reports a refusal as blocked", async () => {
    const { f } = fakeFetch([json({ content: [], stop_reason: "refusal", usage: {} })]);
    await expect(new ClaudeLLM({ model: "m", apiKey: "k", fetch: f }).generate("s", "u", ASSESSMENT)).rejects.toMatchObject({ code: "blocked" });
  });

  it("classifies errors as in the catalogue", () => {
    const e = (status: number, error: object, retryAfter: number | null = null) =>
      classifyClaude(new ProviderHttpError("Claude", status, JSON.stringify({ type: "error", error }), retryAfter));
    expect(e(401, { type: "authentication_error" }).code).toBe("key_invalid");
    expect(e(403, { type: "permission_error" }).code).toBe("permission_denied");
    expect(e(402, { type: "billing_error" }).code).toBe("credits_exhausted");
    expect(e(400, { type: "invalid_request_error", message: "Your credit balance is too low to access the Anthropic API." }).code).toBe("credits_exhausted");
    expect(e(400, { type: "invalid_request_error", message: "messages: field required" }).code).toBe("unknown");
    expect(e(404, { type: "not_found_error" }).code).toBe("model_not_found");
    expect(e(429, { type: "rate_limit_error", message: "Monthly spend limit reached" }).code).toBe("credits_exhausted");
    const rl = e(429, { type: "rate_limit_error" }, 12);
    expect([rl.code, rl.retryAfter]).toEqual(["rate_limited", 12]);
    expect(e(529, { type: "overloaded_error" }).code).toBe("unavailable");
  });

  it("gives up at once on a key error and doesn't wait out a long rate limit", async () => {
    const { f, calls } = fakeFetch([json({ error: { type: "authentication_error" } }, 401)]);
    await expect(new ClaudeLLM({ model: "m", apiKey: "k", fetch: f }).generate("s", "u", ASSESSMENT)).rejects.toMatchObject({ code: "key_invalid" });
    expect(calls).toHaveLength(1);
    const slow = fakeFetch([json({ error: { type: "rate_limit_error" } }, 429, { "retry-after": "120" })]);
    await expect(new ClaudeLLM({ model: "m", apiKey: "k", fetch: slow.f }).generate("s", "u", ASSESSMENT)).rejects.toMatchObject({ code: "rate_limited", retryAfter: 120 });
  });
});

describe("OpenAILLM", () => {
  it("asks for a strict JSON schema with no reasoning, and stores nothing", async () => {
    const { f, calls } = fakeFetch([json({
      status: "completed",
      output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(assessment) }] }],
      usage: { input_tokens: 4800, output_tokens: 60, output_tokens_details: { reasoning_tokens: 0 } },
    })]);
    const r = await new OpenAILLM({ model: "gpt-6-luna", apiKey: "sk-proj-x", fetch: f }).generate("system", "user", ASSESSMENT);
    expect(r.result).toEqual(assessment);
    expect(r.usage).toEqual({ prompt_tokens: 4800, output_tokens: 60, thinking_tokens: 0 });
    const body = JSON.parse(String(calls[0].init.body));
    expect(calls[0].url).toBe("https://api.openai.com/v1/responses");
    expect(body).toMatchObject({ model: "gpt-6-luna", instructions: "system", input: "user", reasoning: { effort: "none" }, store: false });
    expect(body.text.format).toMatchObject({ type: "json_schema", name: "ItemAssessment", strict: true });
  });

  it("reports a refusal as blocked and an incomplete answer as invalid output", async () => {
    const refusal = fakeFetch([json({ status: "completed", output: [{ type: "message", content: [{ type: "refusal", refusal: "no" }] }] })]);
    await expect(new OpenAILLM({ model: "m", apiKey: "k", fetch: refusal.f }).generate("s", "u", ASSESSMENT)).rejects.toMatchObject({ code: "blocked" });
    const cut = () => json({ status: "incomplete", incomplete_details: { reason: "max_output_tokens" }, output: [] });
    const incomplete = fakeFetch([cut(), cut(), cut()]);
    await expect(new OpenAILLM({ model: "m", apiKey: "k", fetch: incomplete.f }).generate("s", "u", ASSESSMENT)).rejects.toMatchObject({ code: "invalid_output" });
  });

  it("classifies errors as in the catalogue", () => {
    const e = (status: number, error: object, retryAfter: number | null = null) =>
      classifyOpenAI(new ProviderHttpError("OpenAI", status, JSON.stringify({ error }), retryAfter));
    expect(e(401, { message: "Incorrect API key provided" }).code).toBe("key_invalid");
    expect(e(403, { message: "Country, region, or territory not supported" }).code).toBe("permission_denied");
    expect(e(404, { code: "model_not_found" }).code).toBe("model_not_found");
    expect(e(429, { type: "insufficient_quota", code: "insufficient_quota" }).code).toBe("credits_exhausted");
    expect(e(429, { code: "project_spend_limit_exceeded" }).code).toBe("credits_exhausted");
    expect(e(429, { message: "Rate limit reached for requests" }, 7)).toMatchObject({ code: "rate_limited", retryAfter: 7 });
    expect(e(503, { code: "server_is_overloaded" }).code).toBe("unavailable");
  });

  it("treats a network failure as unavailable", () => {
    expect(classifyOpenAI(Object.assign(new TypeError("fetch failed"))).code).toBe("unavailable");
  });
});

describe("agents", () => {
  it("picks the agent from a model's name", () => {
    expect(agentForModel("claude-haiku-5-5")).toBe("claude");
    expect(agentForModel("gpt-6-luna")).toBe("openai");
    expect(agentForModel("gemini-3.8-flash")).toBe("gemini");
  });

  it("checks a key by looking up the model, without using tokens", async () => {
    const ok = fakeFetch([json({ id: "claude-haiku-5-5" })]);
    expect((await checkAgentKey("claude", "k", "claude-haiku-5-5", ok.f)).result).toBe("ok");
    expect(ok.calls[0].url).toBe("https://api.anthropic.com/v1/models/claude-haiku-5-5");
    const results = [];
    for (const [status, body] of [[401, {}], [404, {}], [429, { error: { code: "insufficient_quota" } }], [503, {}]] as const) {
      results.push((await checkAgentKey("openai", "k", "gpt-6-luna", fakeFetch([json(body, status)]).f)).result);
    }
    expect(results).toEqual(["not_accepted", "permission_denied", "no_credits", "unreachable"]);
    expect((await checkAgentKey("openai", "k", "m", fakeFetch([new TypeError("fetch failed")]).f)).result).toBe("unreachable");
  });
});
