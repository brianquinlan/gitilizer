// Claude, OpenAI and basic ranking clients (PRD RANK-19, RANK-21, SET-28): requests, parsing and error codes, against a fake fetch.
import { describe, expect, it } from "vitest";
import {
  agentForModel, checkAgentKey, ClaudeLLM, classifyClaude, classifyDecision, classifyOpenAI, createLLM, DecisionLLM, defaultPrompt, GENERIC_BANDS, OpenAILLM,
  ProviderHttpError, scaleBands, strictSchema, ASSESSMENT, ICEBOX_DECISION, RANKING,
} from "../src/index.ts";

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
    const llm = new ClaudeLLM({ model: "claude-sonnet-5-5", apiKey: "sk-ant-x", fetch: f });
    const r = await llm.generate("system", "user", ASSESSMENT);
    expect(r.result).toEqual(assessment);
    expect(r.usage).toEqual({ prompt_tokens: 4900, output_tokens: 120, thinking_tokens: 0 });
    const body = JSON.parse(String(calls[0].init.body));
    expect(calls[0].url).toBe("https://api.anthropic.com/v1/messages");
    expect((calls[0].init.headers as any)["x-api-key"]).toBe("sk-ant-x");
    expect(body).toMatchObject({ model: "claude-sonnet-5-5", system: "system", messages: [{ role: "user", content: "user" }] });
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
    const r = await new OpenAILLM({ model: "gpt-6.1-sol", apiKey: "sk-proj-x", fetch: f }).generate("system", "user", ASSESSMENT);
    expect(r.result).toEqual(assessment);
    expect(r.usage).toEqual({ prompt_tokens: 4800, output_tokens: 60, thinking_tokens: 0 });
    const body = JSON.parse(String(calls[0].init.body));
    expect(calls[0].url).toBe("https://api.openai.com/v1/responses");
    expect(body).toMatchObject({ model: "gpt-6.1-sol", instructions: "system", input: "user", reasoning: { effort: "low" }, store: false });
    expect(body.text.format).toMatchObject({ type: "json_schema", name: "ItemAssessment", strict: true });
  });

  it("reads the last message that parses when a garbled draft comes first", async () => {
    const { f } = fakeFetch([json({
      status: "completed",
      output: [
        { type: "message", content: [{ type: "output_text", text: '{"actionable":true,"next_action":"Review. JSON.' }] },
        { type: "message", content: [{ type: "output_text", text: JSON.stringify(assessment) }] },
      ],
      usage: {},
    })]);
    expect((await new OpenAILLM({ model: "m", apiKey: "k", fetch: f }).generate("s", "u", ASSESSMENT)).result).toEqual(assessment);
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
    expect(e(400, { code: "invalid_prompt", message: "Invalid prompt: your prompt was flagged as potentially violating our usage policy." }).code).toBe("blocked");
  });

  it("treats a network failure as unavailable", () => {
    expect(classifyOpenAI(Object.assign(new TypeError("fetch failed"))).code).toBe("unavailable");
  });
});

describe("agents", () => {
  it("picks the agent from a model's name", () => {
    expect(agentForModel("claude-sonnet-5-5")).toBe("claude");
    expect(agentForModel("gpt-6.1-sol")).toBe("openai");
    expect(agentForModel("gemini-3.8-flash")).toBe("gemini");
    expect(agentForModel("gemini-decision-1")).toBe("basic");
  });

  it("checks a key by looking up the model, without using tokens", async () => {
    const ok = fakeFetch([json({ id: "claude-sonnet-5-5" })]);
    expect((await checkAgentKey("claude", "k", "claude-sonnet-5-5", ok.f)).result).toBe("ok");
    expect(ok.calls[0].url).toBe("https://api.anthropic.com/v1/models/claude-sonnet-5-5");
    const results = [];
    for (const [status, body] of [[401, {}], [404, {}], [429, { error: { code: "insufficient_quota" } }], [503, {}]] as const) {
      results.push((await checkAgentKey("openai", "k", "gpt-6.1-sol", fakeFetch([json(body, status)]).f)).result);
    }
    expect(results).toEqual(["not_accepted", "permission_denied", "no_credits", "unreachable"]);
    expect((await checkAgentKey("openai", "k", "m", fakeFetch([new TypeError("fetch failed")]).f)).result).toBe("unreachable");
  });
});

describe("scaleBands", () => {
  it("reads the eight ranges of the default prompt, lowest first, with wrapped lines joined", () => {
    const bands = scaleBands(defaultPrompt());
    expect(bands.map((b) => [b.low, b.high])).toEqual([[0, 0.05], [0.05, 0.15], [0.15, 0.35], [0.35, 0.5], [0.5, 0.65], [0.65, 0.8], [0.8, 0.9], [0.9, 1]]);
    expect(bands[7].text).toBe("Security issues or security PRs that need me.");
    expect(bands[6].text).toBe("I'm blocking someone right now: my own PR with unanswered review feedback, a direct question to me that blocks someone else's work.");
    expect(bands[0].text).toMatch(/^Nothing for me to do: .*outside my stated scope\.$/);
  });

  it("falls back to generic levels for a prompt without a scale", () => {
    expect(scaleBands("Rank security first.\n\n- 1-10: not a range of scores")).toBe(GENERIC_BANDS);
    expect(scaleBands("## Scale\n- 0.5-1.0: Mine\n- 0.0 to 0.5: Not mine\nMore text")).toEqual([
      { low: 0, high: 0.5, text: "Not mine" }, { low: 0.5, high: 1, text: "Mine" },
    ]);
  });
});

describe("DecisionLLM", () => {
  const system = "Rank my items.\n\n## Scale\n- 0.5–1.0: Needs me\n- 0.0–0.5: Doesn't need me\n";
  const answer = (probabilities: Record<string, number>, actionable = 0.9) =>
    json({ answers: { priority: { score: 1, probabilities }, actionable: { noul: actionable } }, usage: { total_input_tokens: 5100 } });

  it("asks one question per answer and turns the probabilities into a score", async () => {
    const { f, calls } = fakeFetch([answer({ "0": 0.2, "1": 0.8 })]);
    const llm = createLLM("basic", { model: "gemini-decision-1", apiKey: "g-key", fetch: f });
    expect(llm).toBeInstanceOf(DecisionLLM);
    const r = await llm.generate(system, "the item", ASSESSMENT);
    expect(r.result.priority).toBeCloseTo(0.2 * 0.25 + 0.8 * 0.75);
    expect(r.result).toMatchObject({ actionable: true, next_action: "", reasoning: "" });
    expect(r.usage).toEqual({ prompt_tokens: 5100, output_tokens: 0, thinking_tokens: 0 });
    expect(calls[0].url).toBe("https://generativelanguage.googleapis.com/v1beta/decisions");
    expect((calls[0].init.headers as Record<string, string>)["x-goog-api-key"]).toBe("g-key");
    const body = JSON.parse(String(calls[0].init.body));
    expect(body.model).toBe("gemini-decision-1");
    expect(body.input).toEqual([{ type: "text", text: `${system}\n\n` }, { type: "text", text: "the item" }]);
    expect(body.questions.priority).toMatchObject({ type: "score", criteria: ["Doesn't need me", "Needs me"] });
    expect(body.questions.actionable.type).toBe("noul");
  });

  it("answers the Icebox check with a yes or no and no reason", async () => {
    const { f, calls } = fakeFetch([json({ answers: { bring_back: { noul: 0.3 } }, usage: { total_input_tokens: 900 } })]);
    const r = await new DecisionLLM({ apiKey: "k", fetch: f }).generate("icebox prompt", "changes", ICEBOX_DECISION);
    expect(r.result).toEqual({ bring_back: false, reason: "" });
    expect(Object.keys(JSON.parse(String(calls[0].init.body)).questions)).toEqual(["bring_back"]);
  });

  it("rejects answers it can't read, and schemas it can't answer", async () => {
    const bad = fakeFetch([answer({ "7": 1 }), answer({ "7": 1 }), answer({ "7": 1 })]);
    await expect(new DecisionLLM({ apiKey: "k", fetch: bad.f }).generate(system, "u", ASSESSMENT)).rejects.toMatchObject({ code: "invalid_output" });
    expect(bad.calls.length).toBe(3); // malformed output is retried twice
    await expect(new DecisionLLM({ apiKey: "k", fetch: fakeFetch([]).f }).generate(system, "u", RANKING)).rejects.toThrow(/one item at a time/);
  });

  it("classifies quota and spending refusals, which pause basic ranking (RANK-22)", () => {
    const err = (status: number, body: unknown, retryAfter: number | null = null) => new ProviderHttpError("Gemini", status, JSON.stringify(body), retryAfter);
    const quota = (quotaId: string) => ({ error: { code: 429, status: "RESOURCE_EXHAUSTED", message: "Quota exceeded", details: [{ violations: [{ quotaId }] }] } });
    expect(classifyDecision(err(429, quota("CreateDecisionRequestsPerDayPerProjectPerModel"))).code).toBe("daily_quota");
    expect(classifyDecision(err(429, quota("CreateDecisionRequestsPerMinutePerProjectPerModel"), 7))).toMatchObject({ code: "rate_limited", retryAfter: 7 });
    expect(classifyDecision(err(429, { error: { message: "The project has exceeded its monthly spending cap." } })).code).toBe("credits_exhausted");
    expect(classifyDecision(err(403, { error: { message: "Billing is disabled for this project." } })).code).toBe("billing_required");
    expect(classifyDecision(err(400, { error: { message: "API key not valid. Please pass a valid API key." } })).code).toBe("key_invalid");
    expect(classifyDecision(err(503, {})).code).toBe("unavailable");
  });
});
