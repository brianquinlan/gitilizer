// Starts the API server, the internal worker API and the scheduler (one process in the prototype).
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CredentialCipher } from "./crypto.ts";
import { openDb } from "./db.ts";
import { buildApp, buildInternalApp } from "./app.ts";
import { Hub, type Config, type Ctx } from "./context.ts";
import { FixtureGitHub, FixtureStore } from "./github/fixtures.ts";
import { OctokitGitHub } from "./github/octokit.ts";
import { Scheduler } from "./scheduler.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const env = process.env;
const num = (v: string | undefined, d: number) => (v ? Number(v) : d);
/** `--fixtures`: serve eval/fixtures as GitHub and accept any Gemini key (design: Testing). */
const FIXTURES_FLAG = process.argv.includes("--fixtures");

export function loadConfig(): Config {
  return {
    port: num(env.PORT, 8787),
    internalPort: num(env.INTERNAL_PORT, 8788),
    workerToken: env.WORKER_TOKEN ?? "dev-worker-token",
    githubMode: FIXTURES_FLAG || env.GITHUB_MODE === "fixtures" ? "fixtures" : "real",
    geminiMode: FIXTURES_FLAG || env.GEMINI_MODE === "fake" ? "fake" : "real",
    model: env.GITILIZER_MODEL ?? "gemini-3.8-flash",
    defaultPrompt: readFileSync(join(ROOT, "prompts", "v4.md"), "utf8"),
    shortLivedSeconds: num(env.SHORT_LIVED_SECONDS, 15 * 60),
    staleAfterSeconds: num(env.STALE_AFTER_SECONDS, 3 * 3600),
    intervals: {
      visible: num(env.SCAN_VISIBLE_SECONDS, 5 * 60),
      open: num(env.SCAN_OPEN_SECONDS, 30 * 60),
      background: num(env.SCAN_BACKGROUND_SECONDS, 2 * 3600),
    },
    inactiveDays: num(env.INACTIVE_DAYS, 14),
    maxItems: num(env.MAX_ITEMS, 2000),
    manualSyncMinSeconds: num(env.MANUAL_SYNC_MIN_SECONDS, 30),
    schedulerTickMs: num(env.SCHEDULER_TICK_MS, 5000),
  };
}

async function validateGeminiReal(key: string, model: string) {
  const { GoogleGenAI } = await import("@google/genai");
  try {
    const ai = new GoogleGenAI({ apiKey: key });
    await ai.models.get({ model });
    return { ok: true, detail: `${model} available` };
  } catch (e: any) {
    const status = e?.status ?? e?.code;
    const msg = String(e?.message ?? e);
    if (/leaked/i.test(msg)) return { ok: false, detail: "Google has disabled this key because it was reported as leaked", code: "key_leaked" };
    if (status === 400 || status === 401 || /API_KEY_INVALID/.test(msg)) return { ok: false, detail: "Google didn't accept this key", code: "key_invalid" };
    if (status === 404) return { ok: false, detail: `${model} isn't available to this key`, code: "model_not_found" };
    if (status === 403) return { ok: false, detail: "This key can't use the Gemini API", code: "permission_denied" };
    return { ok: false, detail: `Couldn't check the key: ${msg.slice(0, 200)}` };
  }
}

async function main() {
  const config = loadConfig();
  const db = await openDb(env.DATABASE_URL, env.PGLITE_DIR ?? join(ROOT, "app", "server", ".data"));
  const cipher = new CredentialCipher(env.CREDENTIAL_KEY ?? Buffer.alloc(32, 7).toString("base64"));
  if (!env.CREDENTIAL_KEY) console.warn("CREDENTIAL_KEY not set: using an insecure development key");

  let fixtures: FixtureStore | null = null;
  if (config.githubMode === "fixtures") {
    fixtures = new FixtureStore(
      env.FIXTURES_DIR ?? join(ROOT, "eval", "fixtures"),
      env.FIXTURE_LOGIN ?? "brianquinlan",
      (env.FIXTURE_TEAMS ?? "dart-lang/dart-ecosystem-team,googleapis/cloud-sdk-dart-team").split(",").filter(Boolean),
    );
    console.log(`GitHub fixture mode: ${fixtures.entries.size} items as @${fixtures.login}`);
  }

  const hub = new Hub();
  const ctx: Ctx = {
    db, cipher, hub, config,
    github: (pat) => (fixtures ? new FixtureGitHub(fixtures) : new OctokitGitHub(pat)),
    validateGemini: config.geminiMode === "fake"
      ? async (key) => (/bad|invalid/i.test(key) ? { ok: false, detail: "Google didn't accept this key" } : { ok: true, detail: `${config.model} available (fake)` })
      : validateGeminiReal,
    requestScan: () => {},
  };
  const scheduler = new Scheduler(ctx);
  ctx.requestScan = (userId, trigger) => scheduler.trigger(userId, trigger);

  const app = buildApp(ctx, scheduler, fixtures);
  const internal = buildInternalApp(ctx);
  await app.listen({ port: config.port, host: env.HOST ?? "127.0.0.1" });
  await internal.listen({ port: config.internalPort, host: "127.0.0.1" });
  scheduler.start();
  console.log(`Gitilizer API on :${config.port}, worker API on :${config.internalPort}`);

  const stop = async () => { scheduler.stop(); await app.close(); await internal.close(); await db.close(); process.exit(0); };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main();
