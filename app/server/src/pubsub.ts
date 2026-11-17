// Messages between server processes through Postgres LISTEN/NOTIFY (design: Hosting on Google Cloud).
//
// Production can run several processes: API instances holding the browsers' event streams, and scheduler
// and worker instances doing the scans and ranking. A change made in one process must reach a browser
// connected to another, and a scan asked for in an API process must start in a scanner. Both travel here.
// With PGlite there is only ever one process, so none of this runs.
import pg from "pg";
import type { Ctx, Relay, RelayMessage } from "./context.ts";
import { currentVersion } from "./list.ts";
import { log } from "./log.ts";
import { shownNotifications } from "./notify.ts";
import { syncState } from "./jobs.ts";

/** Live-update events for developers' open tabs. */
export const EVENTS_CHANNEL = "gitilizer_events";
/** "A scan was asked for": wakes the scanners. */
export const SCAN_CHANNEL = "gitilizer_scan";
/** NOTIFY payloads must be under 8,000 bytes; larger events go through `relay_events`. */
const MAX_INLINE_BYTES = 7_500;

type Handler = (payload: string) => void | Promise<void>;

/** The LISTEN connection is checked this often (design: Findings, F28). */
const CHECK_EVERY_MS = 30_000;
/** A check, or a connection attempt, that Postgres hasn't answered after this long has failed. */
const CHECK_TIMEOUT_MS = 10_000;

export type ListenerOptions = { checkEveryMs?: number; checkTimeoutMs?: number };

/** `p`, or an error if it hasn't settled after `ms`. */
function within<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`no answer from Postgres in ${ms} ms`)), ms);
    p.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}

/** Closes a connection that may no longer answer: asks politely, then closes the socket without waiting. */
function drop(client: pg.Client) {
  client.end().catch(() => {});
  (client as any).connection?.stream?.destroy();
}

/**
 * One connection that LISTENs, reconnecting if it drops. Notifications are handled one at a time,
 * in the order Postgres delivers them, so a developer's list events stay in version order.
 *
 * A connection can end without the socket closing: through Cloud SQL's connector, Postgres has dropped the
 * session while this end stayed open. A connection that only waits never finds out, so every 30 seconds it
 * runs a query, and one that fails or isn't answered in 10 seconds counts as a lost connection.
 */
export class PgListener {
  private client: pg.Client | null = null;
  private handlers = new Map<string, Handler>();
  private reconnectHandlers: (() => void | Promise<void>)[] = [];
  private chain: Promise<void> = Promise.resolve();
  private stopped = false;
  private retryMs = 1000;
  private checkTimer: NodeJS.Timeout | null = null;
  private readonly checkEveryMs: number;
  private readonly checkTimeoutMs: number;

  constructor(private url: string, opts: ListenerOptions = {}) {
    this.checkEveryMs = opts.checkEveryMs ?? CHECK_EVERY_MS;
    this.checkTimeoutMs = opts.checkTimeoutMs ?? CHECK_TIMEOUT_MS;
  }

  on(channel: string, fn: Handler) { this.handlers.set(channel, fn); }
  /** Called after the connection comes back: anything sent while it was down was missed. */
  onReconnect(fn: () => void | Promise<void>) { this.reconnectHandlers.push(fn); }

  async start() { await this.connect(false); }

  private async connect(reconnecting: boolean) {
    const client = new pg.Client({ connectionString: this.url, connectionTimeoutMillis: this.checkTimeoutMs });
    client.on("notification", (n) => {
      const fn = this.handlers.get(n.channel);
      if (!fn) return;
      this.chain = this.chain.then(() => fn(n.payload ?? "")).catch((e) => log.warn("pubsub", "handling a notification failed", { channel: n.channel, error: String(e) }));
    });
    const lost = (e?: unknown) => {
      if (this.client !== client) return;
      this.client = null;
      this.stopChecking();
      drop(client);
      if (this.stopped) return;
      log.warn("pubsub", "lost the LISTEN connection; reconnecting", { error: String(e ?? "ended") });
      this.retry();
    };
    client.on("error", lost);
    client.on("end", () => lost());
    try {
      await client.connect();
      for (const channel of this.handlers.keys()) await within(client.query(`listen ${channel}`), this.checkTimeoutMs);
    } catch (e) {
      drop(client); // not `this.client` yet, so `lost` ignores it
      throw e;
    }
    if (this.stopped) { drop(client); return; }
    this.client = client;
    this.retryMs = 1000;
    this.checkLater(client, lost);
    if (reconnecting) {
      log.info("pubsub", "LISTEN connection restored");
      for (const fn of this.reconnectHandlers) this.chain = this.chain.then(() => fn()).catch(() => {});
    }
  }

  /** Checks `client` after the usual wait, and again after each check it passes. */
  private checkLater(client: pg.Client, lost: (e?: unknown) => void) {
    this.checkTimer = setTimeout(() => {
      within(client.query("select 1"), this.checkTimeoutMs).then(
        () => { if (this.client === client) this.checkLater(client, lost); },
        (e) => lost(e),
      );
    }, this.checkEveryMs);
    this.checkTimer.unref?.();
  }

  private stopChecking() {
    if (this.checkTimer) clearTimeout(this.checkTimer);
    this.checkTimer = null;
  }

  private retry() {
    const t = setTimeout(() => {
      if (this.stopped) return;
      this.connect(true).catch((e) => {
        log.warn("pubsub", "reconnecting failed", { error: String(e) });
        this.retryMs = Math.min(this.retryMs * 2, 30_000);
        this.retry();
      });
    }, this.retryMs);
    t.unref?.();
  }

  async stop() {
    this.stopped = true;
    this.stopChecking();
    const c = this.client;
    this.client = null;
    if (!c) return;
    // A connection that no longer answers would never finish closing, and would hold up the process's exit.
    await within(c.end(), 2000).catch(() => {});
    (c as any).connection?.stream?.destroy();
  }
}

/** Sends a notification on a pool connection. */
export async function notify(ctx: Ctx, channel: string, payload: string) {
  await ctx.db.query(`select pg_notify($1, $2)`, [channel, payload]);
}

/**
 * Carries the Hub's events to every process. Each process LISTENs, and hands events for developers with a
 * tab open on it to its own Hub. Sends from one process go out one at a time, in order.
 */
export class PgRelay implements Relay {
  private sending: Promise<void> = Promise.resolve();

  constructor(private ctx: Ctx, listener: PgListener) {
    listener.on(EVENTS_CHANNEL, (payload) => this.receive(payload));
    // Events sent while the connection was down are lost, so every open tab starts again from the database.
    listener.onReconnect(() => this.resyncAll());
  }

  send(m: RelayMessage) {
    this.sending = this.sending.then(async () => {
      const json = JSON.stringify(m);
      if (Buffer.byteLength(json) <= MAX_INLINE_BYTES) {
        await notify(this.ctx, EVENTS_CHANNEL, json);
        return;
      }
      const r = await this.ctx.db.one(`insert into relay_events (payload) values ($1) returning id`, [json]);
      await notify(this.ctx, EVENTS_CHANNEL, JSON.stringify({ u: m.u, ref: Number(r.id) }));
    }).catch((e) => log.warn("pubsub", "sending a live update failed", { user: m.u, error: String(e) }));
  }

  /** Resolves when everything sent so far has gone out (tests). */
  flushed(): Promise<void> { return this.sending; }

  private async receive(payload: string) {
    const head = JSON.parse(payload) as { u: string; ref?: number };
    const hub = this.ctx.hub;
    if (hub.connected(head.u) === 0) return; // no tab here, and a reconnecting tab resyncs if it needs to
    let m = head as unknown as RelayMessage;
    if (head.ref !== undefined) {
      const r = await this.ctx.db.one(`select payload from relay_events where id = $1`, [head.ref]);
      if (!r) return;
      m = JSON.parse(r.payload);
    }
    hub.deliver(m);
  }

  private async resyncAll() {
    for (const userId of this.ctx.hub.users()) {
      const version = await currentVersion(this.ctx.db, userId);
      this.ctx.hub.deliver({ u: userId, t: "list", e: { version, bulk: false, upserts: [], removals: [], resync: true } });
      this.ctx.hub.deliver({ u: userId, t: "notifications", l: await shownNotifications(this.ctx, userId) });
      this.ctx.hub.deliver({ u: userId, t: "sync", e: await syncState(this.ctx, userId) });
    }
  }
}
