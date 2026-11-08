// Shared test setup: a fixture GitHub, in-memory Postgres and a Hub that records events.
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ListEvent, Notification, SyncEvent } from "@gitilizer/shared";
import { Hub, type Config, type Ctx } from "../src/context.ts";
import { CredentialCipher } from "../src/crypto.ts";
import { openDb } from "../src/db.ts";
import { FixtureGitHub, FixtureStore } from "../src/github/fixtures.ts";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
export const FIXTURES = join(ROOT, "eval", "fixtures");
export const MODELS = ["gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];

export function testConfig(over: Partial<Config> = {}): Config {
  return {
    port: 0, internalPort: 0, workerToken: "t", githubMode: "fixtures", geminiMode: "fake", models: MODELS,
    agentModels: { claude: "claude-haiku-5-5", openai: "gpt-6-luna" },
    defaultPrompt: "default prompt", shortLivedSeconds: 0, staleAfterSeconds: 3600,
    intervals: { visible: 300, open: 1800, background: 7200 }, inactiveDays: 7, maxItems: 1000, fullScanSeconds: 3600,
    perDeveloperConcurrency: 4, schedulerTickMs: 1000, localMode: false, autoScan: true, allowlist: null,
    publicUrl: "http://localhost:8787", oauth: { google: null, github: null }, devSignIn: true, secure: false,
    scheduler: true, webDir: null,
    ...over,
  };
}

/** A Hub that also keeps every event it sends. */
export class RecordingHub extends Hub {
  lists: ListEvent[] = [];
  notes: Notification[][] = [];
  syncs: SyncEvent[] = [];
  list(userId: string, e: ListEvent) { this.lists.push(e); super.list(userId, e); }
  notifications(userId: string, l: Notification[]) { this.notes.push(l); super.notifications(userId, l); }
  sync(userId: string, e: SyncEvent) { this.syncs.push(e); super.sync(userId, e); }
}

export async function makeCtx(over: Partial<Config> = {}) {
  const store = new FixtureStore(FIXTURES, "brianquinlan");
  const hub = new RecordingHub();
  const ctx: Ctx = {
    db: await openDb(undefined, undefined), hub, config: testConfig(over),
    cipher: new CredentialCipher(Buffer.alloc(32, 1).toString("base64")),
    github: () => new FixtureGitHub(store),
    validateKey: async (_kind, key) => (/bad/.test(key) ? { ok: false, code: "not_accepted" } : { ok: true, code: "ok" }),
    requestScan: () => {},
  };
  return { ctx, store, hub };
}

/** A developer who has completed setup, with both credentials. */
export async function addUser(ctx: Ctx, userId = "u1") {
  await ctx.db.query(`insert into users (id, provider, provider_user_id, name, email, setup_completed_at) values ($1, 'dev', $1, 'B', 'b@example.com', now())`, [userId]);
  await ctx.db.query(`insert into settings (user_id) values ($1)`, [userId]);
  for (const kind of ["github_pat", "gemini_key"] as const) {
    const { ciphertext, nonce } = ctx.cipher.encrypt(userId, "secret-value-123");
    await ctx.db.query(`insert into credentials (user_id, kind, ciphertext, nonce) values ($1, $2, $3, $4)`, [userId, kind, ciphertext, nonce]);
  }
}
