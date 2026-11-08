// Local mode (contributor/LOCAL_DEVELOPMENT.md): automatic sign-in, credentials from .env, no scheduled scans.
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildApp } from "../src/app.ts";
import { Hub, type Config, type Ctx } from "../src/context.ts";
import { CredentialCipher } from "../src/crypto.ts";
import { openDb } from "../src/db.ts";
import { FixtureGitHub, FixtureStore } from "../src/github/fixtures.ts";
import { localUserId, seedLocalCredentials } from "../src/local.ts";
import { Scheduler } from "../src/scheduler.ts";
import { testConfig } from "./helpers.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

function config(localMode: boolean, autoScan = true): Config {
  return testConfig({ localMode, autoScan });
}

async function makeCtx(localMode: boolean, autoScan = true): Promise<{ ctx: Ctx; scheduler: Scheduler; triggers: string[] }> {
  const store = new FixtureStore(join(ROOT, "eval", "fixtures"), "brianquinlan");
  const ctx: Ctx = {
    db: await openDb(undefined, undefined), hub: new Hub(), config: config(localMode, autoScan),
    cipher: new CredentialCipher(Buffer.alloc(32, 3).toString("base64")),
    github: () => new FixtureGitHub(store),
    validateKey: async (_kind, key) => (/bad/.test(key) ? { ok: false, code: "not_accepted" } : { ok: true, code: "ok" }),
    requestScan: () => {},
  };
  const scheduler = new Scheduler(ctx);
  const triggers: string[] = [];
  scheduler.trigger = (userId: string, trigger: string) => { triggers.push(`${userId}:${trigger}`); };
  return { ctx, scheduler, triggers };
}

describe("local mode", () => {
  it("signs the local developer in automatically, always as the same account", async () => {
    const { ctx, scheduler } = await makeCtx(true);
    const app = buildApp(ctx, scheduler, null);
    const first = await app.inject({ method: "GET", url: "/api/me" });
    expect(first.statusCode).toBe(200);
    expect(first.json().user.provider).toBe("local");
    expect(first.headers["set-cookie"]).toBeTruthy();
    const second = await app.inject({ method: "GET", url: "/api/me" });
    expect(second.json().user.id).toBe(first.json().user.id);
    // Any sign-in from the sign-in page is the local developer too.
    const dev = await app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload: {} });
    expect(dev.statusCode).toBe(200);
    expect(await ctx.db.query(`select id from users`)).toHaveLength(1);
    await app.close();
  });

  it("still requires sign-in outside local mode", async () => {
    const { ctx, scheduler } = await makeCtx(false);
    const app = buildApp(ctx, scheduler, null);
    expect((await app.inject({ method: "GET", url: "/api/me" })).statusCode).toBe(401);
    await app.close();
  });

  it("saves missing credentials from .env once, completes setup, and never overwrites", async () => {
    const { ctx } = await makeCtx(true);
    const userId = await localUserId(ctx);
    const r1 = await seedLocalCredentials(ctx, userId, { github_pat: "ghp_from_dotenv_1", gemini_key: undefined });
    expect(r1).toEqual({ seeded: ["github_pat"], setupCompleted: false });
    const r2 = await seedLocalCredentials(ctx, userId, { github_pat: "ghp_different_value", gemini_key: "gemini-from-dotenv" });
    expect(r2).toEqual({ seeded: ["gemini_key"], setupCompleted: true });
    const r3 = await seedLocalCredentials(ctx, userId, { github_pat: "ghp_other", gemini_key: "gemini-other" });
    expect(r3).toEqual({ seeded: [], setupCompleted: false });
    const row = await ctx.db.one(`select ciphertext, nonce from credentials where user_id = $1 and kind = 'github_pat'`, [userId]);
    expect(ctx.cipher.decrypt(userId, row.ciphertext, row.nonce)).toBe("ghp_from_dotenv_1");
    const u = await ctx.db.one(`select setup_completed_at, github_login from users where id = $1`, [userId]);
    expect(u.setup_completed_at).not.toBeNull();
    expect(u.github_login).toBeNull(); // saved without being validated (SET-29); the first scan fills it in
  });

  it("doesn't scan on a schedule when automatic scans are off", async () => {
    const { ctx, scheduler, triggers } = await makeCtx(true, false);
    const userId = await localUserId(ctx);
    await seedLocalCredentials(ctx, userId, { github_pat: "ghp_from_dotenv_1", gemini_key: "gemini-from-dotenv" });
    scheduler.report(userId, "tab", true);
    await scheduler.tick();
    expect(triggers).toEqual([]);
  });

  it("scans on a schedule when automatic scans are on", async () => {
    const { ctx, scheduler, triggers } = await makeCtx(true, true);
    const userId = await localUserId(ctx);
    await seedLocalCredentials(ctx, userId, { github_pat: "ghp_from_dotenv_1", gemini_key: "gemini-from-dotenv" });
    await scheduler.tick();
    expect(triggers.length).toBeGreaterThan(0);
  });
});
