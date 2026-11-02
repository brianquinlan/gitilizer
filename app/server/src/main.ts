// Starts the API server, the internal worker API and the scheduler (one process in the prototype).
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { CheckResult } from "@gitilizer/shared";
import { CredentialCipher } from "./crypto.ts";
import { openDb } from "./db.ts";
import { loadAllowlist } from "./allowlist.ts";
import { buildApp, buildInternalApp } from "./app.ts";
import { Hub, type Config, type Ctx } from "./context.ts";
import { FixtureGitHub, FixtureStore } from "./github/fixtures.ts";
import { OctokitGitHub } from "./github/octokit.ts";
import { localUserId, seedLocalCredentials } from "./local.ts";
import { log } from "./log.ts";
import { Scheduler } from "./scheduler.ts";
import { RankingWorker } from "./worker.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const env = process.env;
const num = (v: string | undefined, d: number) => (v ? Number(v) : d);
/** `--fixtures`: serve eval/fixtures as GitHub and accept any Gemini key (design: Testing). */
const FIXTURES_FLAG = process.argv.includes("--fixtures");
/** `--local`: local mode (contributor/LOCAL_DEVELOPMENT.md). */
const LOCAL_FLAG = process.argv.includes("--local") || env.LOCAL_MODE === "1";

/** RANK-13: the primary model, then the backups. GITILIZER_MODEL replaces only the primary model. */
const DEFAULT_MODELS = ["gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
function rankingModels(): string[] {
  if (env.GITILIZER_MODELS) return env.GITILIZER_MODELS.split(",").map((s) => s.trim()).filter(Boolean);
  const primary = env.GITILIZER_MODEL?.trim();
  return primary ? [primary, ...DEFAULT_MODELS.filter((m) => m !== primary)] : DEFAULT_MODELS;
}

export function loadConfig(): Config {
  return {
    port: num(env.PORT, 8787),
    internalPort: num(env.INTERNAL_PORT, 8788),
    workerToken: env.WORKER_TOKEN ?? "dev-worker-token",
    githubMode: FIXTURES_FLAG || env.GITHUB_MODE === "fixtures" ? "fixtures" : "real",
    geminiMode: FIXTURES_FLAG || env.GEMINI_MODE === "fake" ? "fake" : "real",
    models: rankingModels(),
    defaultPrompt: readFileSync(join(ROOT, "prompts", "v4.md"), "utf8"),
    shortLivedSeconds: num(env.SHORT_LIVED_SECONDS, 15 * 60),
    staleAfterSeconds: num(env.STALE_AFTER_SECONDS, 3 * 3600),
    intervals: {
      visible: num(env.SCAN_VISIBLE_SECONDS, 5 * 60),
      open: num(env.SCAN_OPEN_SECONDS, 30 * 60),
      background: num(env.SCAN_BACKGROUND_SECONDS, 2 * 3600),
    },
    inactiveDays: num(env.INACTIVE_DAYS, 7),
    maxItems: num(env.MAX_ITEMS, 1000),
    fullScanSeconds: num(env.FULL_SCAN_SECONDS, 3600),
    perDeveloperConcurrency: num(env.PER_DEVELOPER_CONCURRENCY, 4),
    schedulerTickMs: num(env.SCHEDULER_TICK_MS, 5000),
    localMode: LOCAL_FLAG,
    autoScan: env.AUTO_SCAN ? env.AUTO_SCAN !== "off" : true,
    allowlist: loadAllowlist(env),
  };
}

/** GET /v1beta/models/{model}: checks the key and access to the model without using request quota (SET-28). */
async function validateGeminiReal(key: string, model: string): Promise<CheckResult> {
  let res: Response;
  try {
    res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}`, {
      headers: { "x-goog-api-key": key }, signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return { ok: false, code: "unreachable" };
  }
  if (res.ok) return { ok: true, code: "ok" };
  const body = await res.text().catch(() => "");
  if (/leaked/i.test(body)) return { ok: false, code: "leaked" };
  if (res.status === 400 || res.status === 401 || /API_KEY_INVALID/.test(body)) return { ok: false, code: "not_accepted" };
  if (res.status === 403) return { ok: false, code: "permission_denied" };
  if (res.status >= 500) return { ok: false, code: "unreachable" };
  log.warn("credentials", "Gemini key check failed", { status: res.status, body: body.slice(0, 300) });
  return { ok: false, code: "error" };
}

/** Fixture mode accepts any key except ones that say what should go wrong. */
async function validateGeminiFake(key: string): Promise<CheckResult> {
  if (/leak/i.test(key)) return { ok: false, code: "leaked" };
  if (/bad|invalid/i.test(key)) return { ok: false, code: "not_accepted" };
  return { ok: true, code: "ok" };
}

async function main() {
  const config = loadConfig();
  const db = await openDb(env.DATABASE_URL, env.PGLITE_DIR ?? join(ROOT, "app", "server", ".data"));
  const cipher = new CredentialCipher(env.CREDENTIAL_KEY ?? Buffer.alloc(32, 7).toString("base64"));
  if (!env.CREDENTIAL_KEY) log.warn("startup", "CREDENTIAL_KEY not set: using an insecure development key");
  if (config.allowlist && config.localMode) log.warn("startup", "SIGN_IN_ALLOWLIST is ignored in local mode");
  else if (config.allowlist) log.info("startup", `Sign-in limited to SIGN_IN_ALLOWLIST (${config.allowlist.size} ${config.allowlist.size === 1 ? "entry" : "entries"})`);

  let fixtures: FixtureStore | null = null;
  if (config.githubMode === "fixtures") {
    fixtures = new FixtureStore(
      env.FIXTURES_DIR ?? join(ROOT, "eval", "fixtures"),
      env.FIXTURE_LOGIN ?? "brianquinlan",
    );
    log.info("startup", `GitHub fixture mode: ${fixtures.entries.size} items as @${fixtures.login}`);
  }

  const hub = new Hub();
  const ctx: Ctx = {
    db, cipher, hub, config,
    github: (pat) => (fixtures ? new FixtureGitHub(fixtures) : new OctokitGitHub(pat)),
    validateGemini: config.geminiMode === "fake" ? validateGeminiFake : validateGeminiReal,
    requestScan: () => {},
  };
  const scheduler = new Scheduler(ctx);
  ctx.requestScan = (userId, trigger) => scheduler.trigger(userId, trigger);

  const app = buildApp(ctx, scheduler, fixtures);
  const internal = buildInternalApp(ctx);
  await app.listen({ port: config.port, host: env.HOST ?? "127.0.0.1" });
  await internal.listen({ port: config.internalPort, host: "127.0.0.1" });
  scheduler.start();
  if (config.localMode) {
    const userId = await localUserId(ctx);
    const { seeded, setupCompleted } = await seedLocalCredentials(ctx, userId, {
      github_pat: env.LOCAL_GITHUB_TOKEN, gemini_key: env.LOCAL_GEMINI_API_KEY,
    });
    if (seeded.length) log.info("startup", `Local mode: saved the ${seeded.map((k) => (k === "github_pat" ? "GitHub token" : "Gemini API key")).join(" and ")} for the local developer`);
    // SET-5: completing setup starts the first sync.
    if (setupCompleted) scheduler.trigger(userId, "credentials");
    log.info("startup", `Local mode: signed in automatically as the local developer${config.autoScan ? "" : "; automatic scans are off"}`);
  }
  // The ranking worker runs in the same process (design: Ranking worker). WORKER=off leaves it out.
  const worker = env.WORKER === "off" ? null : new RankingWorker(ctx);
  worker?.start();
  log.info("startup", `Gitilizer API on :${config.port}, metrics on :${config.internalPort}${worker ? ", ranking worker running" : ""}`);

  const stop = async () => { scheduler.stop(); await worker?.stop(); await app.close(); await internal.close(); await db.close(); process.exit(0); };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((e) => {
    log.error("startup", e instanceof Error ? e.message : String(e));
    process.exit(1);
  });
}
