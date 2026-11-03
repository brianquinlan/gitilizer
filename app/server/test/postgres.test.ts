// Several server processes sharing one Postgres (design: Hosting on Google Cloud): live updates reach a tab
// whichever process it is connected to, and a Sync now asked for in an API process starts in a scanner.
//
// Needs a real Postgres, so it runs only when TEST_DATABASE_URL is set (CI sets it). The URL's user must be
// able to create databases: each run makes its own and drops it afterwards.
//   TEST_DATABASE_URL=postgresql://postgres@127.0.0.1:5432/postgres npm test -w app/server
import { randomBytes } from "node:crypto";
import pg from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { ListEvent } from "@gitilizer/shared";
import { Hub, type Ctx } from "../src/context.ts";
import { CredentialCipher } from "../src/crypto.ts";
import { openDb } from "../src/db.ts";
import { FixtureGitHub, FixtureStore } from "../src/github/fixtures.ts";
import { publish } from "../src/list.ts";
import { PgListener, PgRelay } from "../src/pubsub.ts";
import { Scheduler } from "../src/scheduler.ts";
import { FIXTURES, addUser, testConfig } from "./helpers.ts";

const BASE = process.env.TEST_DATABASE_URL;
const NAME = `gitilizer_test_${randomBytes(4).toString("hex")}`;
const url = () => { const u = new URL(BASE!); u.pathname = `/${NAME}`; return u.toString(); };

type Proc = { ctx: Ctx; scheduler: Scheduler; listener: PgListener; relay: PgRelay; stop(): Promise<void> };

/** One server process: its own pool, Hub, LISTEN connection and scheduler. */
async function proc(role: { scheduler: boolean; autoScan?: boolean }): Promise<Proc> {
  const store = new FixtureStore(FIXTURES, "brianquinlan");
  const ctx: Ctx = {
    db: await openDb(url(), undefined, 5), hub: new Hub(), config: testConfig({ scheduler: role.scheduler, autoScan: role.autoScan ?? false }),
    cipher: new CredentialCipher(Buffer.alloc(32, 1).toString("base64")),
    github: () => new FixtureGitHub(store),
    validateGemini: async () => ({ ok: true, code: "ok" }),
    requestScan: () => {},
  };
  const listener = new PgListener(url());
  const relay = new PgRelay(ctx, listener);
  ctx.hub.relay = relay;
  const scheduler = new Scheduler(ctx);
  scheduler.useNotify(listener);
  await listener.start();
  return { ctx, scheduler, listener, relay, stop: async () => { await scheduler.stop(); await listener.stop(); await ctx.db.close(); } };
}

/** A stand-in for a browser's event stream: records what it is sent. */
function tab(hub: Hub, userId: string) {
  const got: { event: string; data: any }[] = [];
  const reply = { raw: { write: (chunk: string) => {
    const event = /event: (\w+)/.exec(chunk)?.[1];
    const data = /data: (.*)/.exec(chunk)?.[1];
    if (event && data) got.push({ event, data: JSON.parse(data) });
    return true;
  }, end: () => {} } } as any;
  hub.subscribe(userId, reply);
  return got;
}

const until = async (check: () => boolean | Promise<boolean>, ms = 10_000) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (await check()) return true;
    await new Promise((r) => setTimeout(r, 25));
  }
  return false;
};

describe.skipIf(!BASE)("several processes on one Postgres", () => {
  let api: Proc;
  let scanner: Proc;

  beforeAll(async () => {
    const admin = new pg.Client({ connectionString: BASE });
    await admin.connect();
    await admin.query(`create database ${NAME}`);
    await admin.end();
    // Both start at once, as two revisions do during a deployment: the schema upgrade mustn't collide.
    [api, scanner] = await Promise.all([proc({ scheduler: false }), proc({ scheduler: true })]);
    await addUser(api.ctx, "u1");
    await addUser(api.ctx, "u2");
  }, 30_000);

  afterAll(async () => {
    await api?.stop();
    await scanner?.stop();
    const admin = new pg.Client({ connectionString: BASE });
    await admin.connect();
    await admin.query(`drop database if exists ${NAME} with (force)`);
    await admin.end();
  });

  it("delivers a change made in one process to a tab connected to another (LIVE-23)", async () => {
    const got = tab(api.ctx.hub, "u1");
    const other = tab(api.ctx.hub, "u2");
    scanner.ctx.hub.notifications("u1", []);
    scanner.ctx.hub.list("u1", { version: 7, bulk: false, upserts: [], removals: [{ key: "o/r#1", reason: "closed" }] });
    expect(await until(() => got.length === 2)).toBe(true);
    expect(got.map((g) => g.event)).toEqual(["notifications", "list"]);
    expect(got[1].data.version).toBe(7);
    expect(other).toEqual([]); // only the developer's own tabs
  });

  it("carries an event too large for NOTIFY through the database, in order", async () => {
    const got = tab(api.ctx.hub, "u2");
    const big: ListEvent = {
      version: 1, bulk: true, removals: [],
      upserts: Array.from({ length: 60 }, (_, i) => ({
        key: `o/r#${i}`, repo: "o/r", number: i, kind: "issue", title: "x".repeat(200), htmlUrl: "https://github.com/o/r/issues/1",
        updatedAt: new Date().toISOString(), reasons: ["assigned"], mentionHandle: null, status: "active", iceboxedAt: null,
        score: 0.5, rankFailed: false, waitingForQuota: false,
      })),
    };
    scanner.ctx.hub.list("u2", big);
    scanner.ctx.hub.list("u2", { version: 2, bulk: false, upserts: [], removals: [] });
    expect(await until(() => got.length === 2)).toBe(true);
    expect(got.map((g) => [g.data.version, g.data.upserts.length])).toEqual([[1, 60], [2, 0]]);
    expect(await scanner.ctx.db.one(`select count(*)::int as n from relay_events`)).toEqual({ n: 1 });
  });

  it("publishes list changes through the relay", async () => {
    const got = tab(api.ctx.hub, "u1");
    await scanner.ctx.db.query(`insert into items (key, kind, title, html_url, state, updated_at) values ('o/r#9', 'issue', 'T', 'https://github.com/o/r/issues/9', 'open', now())`);
    await scanner.ctx.db.query(`insert into user_items (user_id, item_key, reasons) values ('u1', 'o/r#9', '{assigned}')`);
    const v = await publish(scanner.ctx, "u1", ["o/r#9"]);
    expect(await until(() => got.some((g) => g.event === "list" && g.data.version === v))).toBe(true);
    expect(got.find((g) => g.data.version === v)!.data.upserts[0].key).toBe("o/r#9");
  });

  it("starts a Sync now asked for in an API process in a scanner process, without waiting for a tick (SCAN-4)", async () => {
    api.scheduler.trigger("u2", "manual");
    expect(await until(async () => Boolean(await api.ctx.db.one(`select 1 from scans where user_id = 'u2' and trigger = 'manual' and outcome = 'ok'`)))).toBe(true);
  });

  it("reconnects a dropped LISTEN connection, and tells open tabs to reload what they may have missed", async () => {
    const got = tab(api.ctx.hub, "u1");
    // Cloud SQL restarting, for example: every LISTEN connection is cut.
    await scanner.ctx.db.query(`select pg_terminate_backend(pid) from pg_stat_activity where datname = $1 and query like 'listen%'`, [NAME]);
    expect(await until(() => got.some((g) => g.event === "list" && g.data.resync === true))).toBe(true);
    scanner.ctx.hub.list("u1", { version: 99, bulk: false, upserts: [], removals: [] });
    expect(await until(() => got.some((g) => g.data?.version === 99))).toBe(true);
  });

  it("lets one process at a time run the periodic pass", async () => {
    const other = await proc({ scheduler: true });
    try {
      await scanner.scheduler.tick();
      await other.scheduler.tick();
      expect(await api.ctx.db.one(`select holder from leases where name = 'scheduler'`)).toEqual({ holder: scanner.scheduler.id });
    } finally {
      await other.stop();
    }
  });
});
