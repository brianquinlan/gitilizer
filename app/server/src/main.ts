// Starts the API server, the operator endpoints, the scheduler and scanner, and the ranking worker.
// One process runs all of them unless SCHEDULER=off or WORKER=off leaves a part to another service
// (design: Hosting on Google Cloud).
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { CheckResult } from "@gitilizer/shared";
import { CredentialCipher } from "./crypto.ts";
import { openDb } from "./db.ts";
import { loadAllowlist } from "./allowlist.ts";
import { buildApp, buildInternalApp } from "./app.ts";
import { Hub, type Config, type Ctx, type OAuthClient } from "./context.ts";
import { FixtureGitHub, FixtureStore } from "./github/fixtures.ts";
import { OctokitGitHub } from "./github/octokit.ts";
import { localUserId, seedLocalCredentials } from "./local.ts";
import { reapScans } from "./scanner.ts";
import { log } from "./log.ts";
import { PgListener, PgRelay } from "./pubsub.ts";
import { Scheduler } from "./scheduler.ts";
import { RankingWorker } from "./worker.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const env = process.env;
const num = (v: string | undefined, d: number) => (v ? Number(v) : d);
// `--fixtures` serves eval/fixtures as GitHub and accepts any Gemini key (design: Testing).
// `--local` is local mode (contributor/LOCAL_DEVELOPMENT.md).
// `--dev-sign-in` offers the development sign-in form without OAuth apps (`npm run dev:server`); never deployed.

/** RANK-13: the primary model, then the backups. GITILIZER_MODEL replaces only the primary model. */
const DEFAULT_MODELS = ["gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
function rankingModels(): string[] {
  if (env.GITILIZER_MODELS) return env.GITILIZER_MODELS.split(",").map((s) => s.trim()).filter(Boolean);
  const primary = env.GITILIZER_MODEL?.trim();
  return primary ? [primary, ...DEFAULT_MODELS.filter((m) => m !== primary)] : DEFAULT_MODELS;
}

/** The deployed environments (contributor/DEPLOYMENT.md). Unset means a computer: local mode, fixtures, tests. */
const ENVIRONMENTS = ["development", "production"];

function oauthClient(id: string | undefined, secret: string | undefined): OAuthClient | null {
  return id?.trim() && secret?.trim() ? { clientId: id.trim(), clientSecret: secret.trim() } : null;
}

export function loadConfig(e: Record<string, string | undefined> = env, argv: string[] = process.argv): Config {
  const fixtures = argv.includes("--fixtures");
  const local = argv.includes("--local") || e.LOCAL_MODE === "1";
  const port = num(e.PORT, 8787);
  const githubMode = fixtures || e.GITHUB_MODE === "fixtures" ? "fixtures" : "real";
  const geminiMode = fixtures || e.GEMINI_MODE === "fake" ? "fake" : "real";
  const deployed = Boolean(e.GITILIZER_ENV);
  const webDir = e.WEB_DIR ?? join(ROOT, "app", "web", "dist");
  const config: Config = {
    port,
    internalPort: num(e.INTERNAL_PORT, 8788),
    workerToken: e.WORKER_TOKEN ?? "dev-worker-token",
    githubMode,
    geminiMode,
    models: rankingModels(),
    defaultPrompt: readFileSync(join(ROOT, "prompts", "v4.md"), "utf8"),
    shortLivedSeconds: num(e.SHORT_LIVED_SECONDS, 15 * 60),
    staleAfterSeconds: num(e.STALE_AFTER_SECONDS, 3 * 3600),
    intervals: {
      visible: num(e.SCAN_VISIBLE_SECONDS, 5 * 60),
      open: num(e.SCAN_OPEN_SECONDS, 30 * 60),
      background: num(e.SCAN_BACKGROUND_SECONDS, 2 * 3600),
    },
    inactiveDays: num(e.INACTIVE_DAYS, 7),
    maxItems: num(e.MAX_ITEMS, 1000),
    fullScanSeconds: num(e.FULL_SCAN_SECONDS, 3600),
    perDeveloperConcurrency: num(e.PER_DEVELOPER_CONCURRENCY, 4),
    schedulerTickMs: num(e.SCHEDULER_TICK_MS, 5000),
    localMode: local,
    autoScan: e.AUTO_SCAN ? e.AUTO_SCAN !== "off" : true,
    allowlist: loadAllowlist(e),
    publicUrl: (e.PUBLIC_URL ?? `http://localhost:${local ? 5173 : port}`).replace(/\/+$/, ""),
    oauth: {
      google: oauthClient(e.GOOGLE_CLIENT_ID, e.GOOGLE_CLIENT_SECRET),
      github: oauthClient(e.GITHUB_CLIENT_ID, e.GITHUB_CLIENT_SECRET),
    },
    // The stub signs anyone in as anyone, so it exists only on a developer's own computer.
    devSignIn: !deployed && (local || githubMode === "fixtures" || argv.includes("--dev-sign-in") || e.DEV_SIGN_IN === "1"),
    secure: deployed,
    scheduler: e.SCHEDULER !== "off",
    webDir: existsSync(join(webDir, "index.html")) ? webDir : null,
  };
  const problems = deployedConfigProblems(config, e);
  if (problems.length) {
    throw new Error(`GITILIZER_ENV=${e.GITILIZER_ENV} can't start: ${problems.join(" ")} (contributor/DEPLOYMENT.md)`);
  }
  return config;
}

/**
 * What a deployed environment is missing. A deployed server never falls back to PGlite, the built-in
 * credential key, the sign-in stub or fixtures: a lost setting stops the new revision from starting,
 * and Cloud Run keeps serving the previous one.
 */
export function deployedConfigProblems(config: Config, e: Record<string, string | undefined>): string[] {
  const name = e.GITILIZER_ENV;
  if (!name) return [];
  const problems: string[] = [];
  if (!ENVIRONMENTS.includes(name)) problems.push(`GITILIZER_ENV must be ${ENVIRONMENTS.join(" or ")}.`);
  if (!e.DATABASE_URL) problems.push("DATABASE_URL is missing.");
  if (!e.CREDENTIAL_KEY) problems.push("CREDENTIAL_KEY is missing.");
  if (!e.WORKER_TOKEN || e.WORKER_TOKEN === "dev-worker-token") problems.push("WORKER_TOKEN is missing.");
  if (!e.PUBLIC_URL || !/^https:\/\/[^/]+$/.test(config.publicUrl)) problems.push("PUBLIC_URL must be the environment's https:// address, such as https://gitilizer.com.");
  if (!config.oauth.google) problems.push("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are missing.");
  if (!config.oauth.github) problems.push("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are missing.");
  if (config.localMode) problems.push("LOCAL_MODE can't be on.");
  if (config.githubMode === "fixtures" || config.geminiMode === "fake") problems.push("Fixture mode and the fake model can't be on.");
  if (e.DEV_SIGN_IN === "1") problems.push("DEV_SIGN_IN can't be on.");
  if (e.NODE_ENV !== "production") problems.push("NODE_ENV must be production.");
  return problems;
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
  const db = await openDb(env.DATABASE_URL, env.PGLITE_DIR ?? join(ROOT, "app", "server", ".data"), num(env.DATABASE_POOL_MAX, 20));
  const cipher = new CredentialCipher(env.CREDENTIAL_KEY ?? Buffer.alloc(32, 7).toString("base64"));
  if (!env.CREDENTIAL_KEY) log.warn("startup", "CREDENTIAL_KEY not set: using an insecure development key");
  if (config.allowlist && config.localMode) log.warn("startup", "SIGN_IN_ALLOWLIST is ignored in local mode");
  else if (config.allowlist) log.info("startup", `Sign-in limited to SIGN_IN_ALLOWLIST (${config.allowlist.size} ${config.allowlist.size === 1 ? "entry" : "entries"})`);
  if (config.devSignIn) log.warn("startup", "Development sign-in is on: anyone who can reach this server can sign in as anyone");

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

  // With Postgres, several processes share the work: events and scan requests travel through LISTEN/NOTIFY.
  let listener: PgListener | null = null;
  if (env.DATABASE_URL) {
    listener = new PgListener(env.DATABASE_URL);
    const relay = new PgRelay(ctx, listener);
    hub.relay = relay;
    scheduler.useNotify(listener);
    await listener.start();
  }

  const app = buildApp(ctx, scheduler, fixtures);
  const internal = buildInternalApp(ctx);
  await app.listen({ port: config.port, host: env.HOST ?? "127.0.0.1" });
  await internal.listen({ port: config.internalPort, host: "127.0.0.1" });
  // Local mode is the only scanner, so any scan still open was cut off when it last stopped.
  if (config.localMode) await reapScans(ctx, true);
  if (config.scheduler) scheduler.start();
  if (config.localMode) {
    const userId = await localUserId(ctx);
    const { seeded, setupCompleted } = await seedLocalCredentials(ctx, userId, {
      github_pat: env.LOCAL_GITHUB_TOKEN, gemini_key: env.LOCAL_GEMINI_API_KEY,
    });
    if (seeded.length) log.info("startup", `Local mode: saved the ${seeded.map((k) => (k === "github_pat" ? "GitHub token" : "Gemini API key")).join(" and ")} for the local developer`);
    const u = await db.one(
      `select setup_completed_at, exists (select 1 from scans where user_id = $1 and outcome = 'ok') as scanned from users where id = $1`,
      [userId],
    );
    // SET-5: completing setup starts the first sync.
    if (setupCompleted) scheduler.trigger(userId, "credentials");
    // Automatic scans are off, so a first sync cut off last time would otherwise never finish.
    else if (u?.setup_completed_at && !u.scanned) {
      log.info("startup", "Local mode: the first sync didn't finish last time; starting it again");
      scheduler.trigger(userId, "credentials");
    }
    log.info("startup", `Local mode: signed in automatically as the local developer${config.autoScan ? "" : "; automatic scans are off"}`);
  }
  // The ranking worker runs in the same process (design: Ranking worker). WORKER=off leaves it out.
  const worker = env.WORKER === "off" ? null : new RankingWorker(ctx);
  worker?.start();
  const parts = [config.scheduler ? "scheduler and scanner" : null, worker ? "ranking worker" : null].filter(Boolean);
  log.info("startup", `Gitilizer API on :${config.port}, metrics on :${config.internalPort}${parts.length ? `, ${parts.join(" and ")} running` : ""}${config.webDir ? ", serving the web app" : ""}`, {
    environment: env.GITILIZER_ENV ?? (config.localMode ? "local" : "unset"),
  });

  let stopping = false;
  const stop = async () => {
    if (stopping) return;
    stopping = true;
    // Cloud Run allows 10 seconds after SIGTERM. Open event streams end first, so closing the server doesn't
    // wait for them; the browsers reconnect to another instance.
    hub.closeAll();
    await scheduler.stop();
    await worker?.stop();
    await app.close();
    await internal.close();
    await listener?.stop();
    await db.close();
    process.exit(0);
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((e) => {
    log.error("startup", e instanceof Error ? e.message : String(e));
    process.exit(1);
  });
}
