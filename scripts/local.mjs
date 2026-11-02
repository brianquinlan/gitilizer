#!/usr/bin/env node
// Runs Gitilizer on this machine with one command (docs/local-development.md):
// the API, the ranking worker and the web app, with data kept in .local/.
//
//   npm run local                 real GitHub and Gemini, credentials from .env
//   npm run local -- --fixtures   eval/fixtures as GitHub and a fake model; no network
//   npm run local -- --scheduler  also scan on a schedule, as in production
//   npm run local -- --reset      start again with an empty database
import { spawn, spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import net from "node:net";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(ROOT, "package.json"));
const args = new Set(process.argv.slice(2));
const fixtures = args.has("--fixtures");
const scheduler = args.has("--scheduler");
const API_PORT = 8787;
const WEB_PORT = 5173;

for (const a of args) {
  if (!["--fixtures", "--scheduler", "--reset"].includes(a)) {
    console.error(`Unknown option ${a}. Options: --fixtures, --scheduler, --reset`);
    process.exit(2);
  }
}

// --- .env (only the values local mode needs) ---------------------------------
function readDotEnv(path) {
  const out = {};
  if (!existsSync(path)) return out;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m || line.trimStart().startsWith("#")) continue;
    out[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
  }
  return out;
}
const dotenv = readDotEnv(join(ROOT, ".env"));

// --- Data folder and a stable credential key ------------------------------------
const dataDir = join(ROOT, ".local", fixtures ? "fixtures" : "real");
if (args.has("--reset") && existsSync(dataDir)) {
  rmSync(dataDir, { recursive: true, force: true });
  console.log(`Removed ${dataDir}`);
}
mkdirSync(dataDir, { recursive: true });
const keyFile = join(dataDir, "credential-key");
if (!existsSync(keyFile)) writeFileSync(keyFile, randomBytes(32).toString("base64") + "\n", { mode: 0o600 });
const credentialKey = process.env.CREDENTIAL_KEY ?? readFileSync(keyFile, "utf8").trim();

// --- Python for the worker -----------------------------------------------------
function findPython() {
  if (process.env.PYTHON) return process.env.PYTHON;
  const candidates = process.platform === "win32"
    ? [join(ROOT, ".venv", "Scripts", "python.exe"), "python"]
    : [join(ROOT, ".venv", "bin", "python"), "python3"];
  return candidates.find((c) => !c.includes("/") && !c.includes("\\") ? true : existsSync(c));
}
const python = findPython();

// --- Check the setup before starting anything (docs/local-development.md, step 2) ---
const SETUP = "See \"Set up the repository\" in docs/local-development.md.";
function resolveOrExit(resolveIt) {
  try {
    return resolveIt();
  } catch {
    console.error(`Gitilizer's Node packages aren't installed in this folder. Run this first:\n\n    npm install\n\n${SETUP}`);
    process.exit(1);
  }
}
const tsxCli = resolveOrExit(() => require.resolve("tsx/cli"));
const viteCli = resolveOrExit(() => join(dirname(require.resolve("vite/package.json")), "bin", "vite.js"));

const pyCheck = spawnSync(python, ["-c", "import google.genai, requests, yaml"], { cwd: ROOT, encoding: "utf8" });
if (pyCheck.error || pyCheck.status !== 0) {
  const venvSteps = process.platform === "win32"
    ? "    py -m venv .venv\n    .venv\\Scripts\\Activate.ps1\n    pip install -r requirements.txt"
    : "    python3 -m venv .venv\n    source .venv/bin/activate\n    pip install -r requirements.txt";
  console.error(`The ranking worker needs Python with Gitilizer's packages, and ${python} ${pyCheck.error ? "couldn't be run" : "doesn't have them"}. Run this first:\n\n${venvSteps}\n\n${SETUP}`);
  process.exit(1);
}

// --- Child processes -------------------------------------------------------------
const children = [];
let stopping = false;
function stopAll(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const c of children) if (c.exitCode === null) c.kill();
  setTimeout(() => process.exit(code), 500);
}
process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));

function run(name, command, argv, options = {}) {
  const child = spawn(command, argv, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"], ...options });
  const prefix = `[${name}]`.padEnd(9);
  const pipe = (stream, out) => {
    let buf = "";
    stream.on("data", (d) => {
      buf += d.toString();
      const lines = buf.split(/\r?\n/);
      buf = lines.pop();
      for (const l of lines) out.write(`${prefix}${l}\n`);
    });
  };
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  child.on("error", (e) => {
    console.error(`${prefix}couldn't start ${command}: ${e.message}`);
    stopAll(1);
  });
  child.on("exit", (code, signal) => {
    if (!stopping) {
      console.error(`${prefix}stopped (${signal ?? `exit code ${code}`}); stopping everything`);
      stopAll(code || 1);
    }
  });
  children.push(child);
  return child;
}

// Vite listens on "localhost", which is ::1 (IPv6) on Windows and 127.0.0.1 elsewhere, so check both.
const HOSTS = ["127.0.0.1", "::1"];

function listening(port, host) {
  return new Promise((ok) => {
    const s = net.connect(port, host);
    s.once("connect", () => { s.end(); ok(true); });
    s.once("error", () => { s.destroy(); ok(false); });
  });
}

async function anyListening(port) {
  return (await Promise.all(HOSTS.map((h) => listening(port, h)))).some(Boolean);
}

async function waitForPort(port, timeoutMs = 60_000) {
  const start = Date.now();
  while (!(await anyListening(port))) {
    if (stopping) return;
    if (Date.now() - start > timeoutMs) throw new Error(`nothing listening on port ${port} after ${timeoutMs / 1000} s`);
    await new Promise((r) => setTimeout(r, 300));
  }
}

async function portFree(port) {
  return !(await anyListening(port));
}

// --- Start ---------------------------------------------------------------------------
for (const port of [API_PORT, API_PORT + 1, WEB_PORT]) {
  if (!(await portFree(port))) {
    console.error(`Port ${port} is already in use. Is Gitilizer already running in another terminal?`);
    process.exit(1);
  }
}


const serverEnv = {
  ...process.env,
  LOCAL_MODE: "1",
  PGLITE_DIR: join(dataDir, "db"),
  CREDENTIAL_KEY: credentialKey,
  AUTO_SCAN: scheduler ? "on" : "off",
  GITILIZER_MODEL: process.env.GITILIZER_MODEL ?? dotenv.GITILIZER_MODEL ?? "",
  GITILIZER_MODELS: process.env.GITILIZER_MODELS ?? dotenv.GITILIZER_MODELS ?? "",
};
if (!serverEnv.GITILIZER_MODEL) delete serverEnv.GITILIZER_MODEL;
if (!serverEnv.GITILIZER_MODELS) delete serverEnv.GITILIZER_MODELS;
if (fixtures) {
  // Fixture GitHub and the fake model accept any value, so the account needs no real credentials.
  serverEnv.LOCAL_GITHUB_TOKEN = "fixture-github-token";
  serverEnv.LOCAL_GEMINI_API_KEY = "fixture-gemini-key";
} else {
  serverEnv.LOCAL_GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? dotenv.GITHUB_TOKEN ?? "";
  serverEnv.LOCAL_GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? dotenv.GEMINI_API_KEY ?? "";
}

console.log(`Gitilizer local mode (${fixtures ? "fixtures: no GitHub or Gemini calls" : "real GitHub and Gemini"})`);
console.log(`Data: ${dataDir}`);
if (!fixtures && (!serverEnv.LOCAL_GITHUB_TOKEN || !serverEnv.LOCAL_GEMINI_API_KEY)) {
  console.log("GITHUB_TOKEN or GEMINI_API_KEY isn't in .env. Enter what's missing in Settings when the app opens.");
}

run("api", process.execPath, [tsxCli, join("app", "server", "src", "main.ts"), ...(fixtures ? ["--fixtures"] : []), "--local"], { env: serverEnv });
await waitForPort(API_PORT).catch((e) => { console.error(`[api]    ${e.message}`); stopAll(1); });
await waitForPort(API_PORT + 1).catch((e) => { console.error(`[api]    ${e.message}`); stopAll(1); });
if (stopping) await new Promise(() => {});

run("worker", python, ["-m", "gitilizer.worker", ...(fixtures ? ["--fake-llm"] : [])], {
  env: { ...process.env, GITILIZER_API: `http://127.0.0.1:${API_PORT + 1}`, PYTHONUNBUFFERED: "1" },
});
run("web", process.execPath, [viteCli, "--port", String(WEB_PORT), "--strictPort"], { cwd: join(ROOT, "app", "web") });
await waitForPort(WEB_PORT).catch((e) => { console.error(`[web]    ${e.message}`); stopAll(1); });
if (!stopping) console.log(`\nReady: open http://localhost:${WEB_PORT}  (Ctrl+C stops everything)\n`);
