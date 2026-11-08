// npm run check: checks that the GitHub token and Gemini key in .env work, and that the model exists.
// ANTHROPIC_API_KEY and OPENAI_API_KEY, when set, are checked against the models Claude and OpenAI rank with.
import { GoogleGenAI } from "@google/genai";
import { checkAgentKey, DEFAULT_AGENT_MODELS } from "../agents.ts";
import { loadDotenv } from "../env.ts";
import { listModels } from "../gemini.ts";
import { GitHub, GitHubError } from "../github.ts";
import { DEFAULT_MODEL } from "../prioritizer.ts";

loadDotenv();
let ok = true;
const gh = new GitHub();
if (!gh.token) {
  console.log("GitHub: no GITHUB_TOKEN in .env (unauthenticated: 60 requests/hour, not enough)");
  ok = false;
}
try {
  const login = (await gh.get("/user")).login;
  const core = (await gh.rateLimit()).resources.core;
  console.log(`GitHub: OK, authenticated as ${login}, ${core.remaining}/${core.limit} requests left`);
} catch (e) {
  if (!(e instanceof GitHubError)) throw e;
  console.log(`GitHub: FAILED — ${e.message}`);
  ok = false;
}
const model = process.env.GITILIZER_MODEL || DEFAULT_MODEL;
if (!process.env.GEMINI_API_KEY) {
  console.log("Gemini: no GEMINI_API_KEY in .env");
  process.exit(1);
}
try {
  const names = await listModels();
  const gemini = names.filter((n) => n.startsWith("gemini")).sort();
  if (names.includes(model)) console.log(`Gemini: OK, model '${model}' is available`);
  else {
    console.log(`Gemini: key works, but model '${model}' not found. Gemini models available:`);
    for (const n of gemini) console.log(`  ${n}`);
    console.log("Set GITILIZER_MODEL in .env or pass --model.");
    ok = false;
  }
  const r = await new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }).models.generateContent({
    model: names.includes(model) ? model : gemini[gemini.length - 1], contents: "Reply with: ok",
  });
  console.log(`Gemini: test call returned '${(r.text ?? "").trim()}'`);
} catch (e) {
  console.log(`Gemini: FAILED — ${(e as Error).name}: ${(e as Error).message}`);
  ok = false;
}
for (const [agent, name, envVar] of [["claude", "Claude", "ANTHROPIC_API_KEY"], ["openai", "OpenAI", "OPENAI_API_KEY"]] as const) {
  const key = process.env[envVar];
  if (!key) continue;
  const model = DEFAULT_AGENT_MODELS[agent];
  const r = await checkAgentKey(agent, key, model);
  console.log(r.result === "ok" ? `${name}: OK, model '${model}' is available` : `${name}: FAILED — ${r.result}${r.status ? ` (HTTP ${r.status})` : ""}`);
  if (r.result !== "ok") ok = false;
}
process.exit(ok ? 0 : 1);
