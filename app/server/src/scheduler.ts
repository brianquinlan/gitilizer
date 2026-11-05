// Scan scheduling from presence (design: Scheduler; PRD SCAN-5, SCAN-6, RANK-9, PRIV-5).
//
// Several processes can run this. Presence and scan requests live in the database, so an API process that
// receives a presence report or a Sync now hands the scan to whichever scanner claims it. The periodic pass
// (due scans, notifications, quotas, clean-up) runs in one process at a time, the holder of the `scheduler`
// lease; every scanner process claims requested scans, up to its own limit.
import { randomUUID } from "node:crypto";
import { log } from "./log.ts";
import type { Ctx } from "./context.ts";
import { queueFullRerank, reapLeases, refreshQuotas } from "./jobs.ts";
import { clear, promote, raise } from "./notify.ts";
import { type PgListener, SCAN_CHANNEL, notify } from "./pubsub.ts";
import { FULL_TRIGGERS, reapScans, scan } from "./scanner.ts";

/** A tab that hasn't reported for this long is closed. The web app reports every minute. */
const PRESENCE_TTL_SECONDS = 90;
/** The periodic pass's lease. A stopped holder's lease runs out, and another process takes over. */
const LEASE_SECONDS = 30;
/** A Sync now that arrives during another process's incremental scan waits this long, then tries again. */
const RETRY_FULL_SECONDS = 10;

/** "visible", "open" or "away" for the developer `$1` (or the outer query's `u.id`), from tabs seen in the last 90 s. */
const PRESENCE_STATE = (who: string) => `(
  select case when bool_or(p.visible) then 'visible' when count(*) > 0 then 'open' else 'away' end
  from presence p where p.user_id = ${who} and p.at > now() - make_interval(secs => ${PRESENCE_TTL_SECONDS}))`;

export type SchedulerOptions = {
  /** Scans this process runs at once (design: Scale, ~200 per scanner process). */
  maxScans?: number;
};

export class Scheduler {
  /** Identifies this process as a lease holder. */
  readonly id = randomUUID();
  private running = new Set<string>();
  private timer: NodeJS.Timeout | null = null;
  private lastAgeingPass = 0;
  private claiming = false;
  private stopped = false;
  private claimAgain = false;
  private wakeOthers: ((userId: string) => Promise<void>) | null = null;
  private readonly maxScans: number;

  constructor(private ctx: Ctx, opts: SchedulerOptions = {}) {
    this.maxScans = opts.maxScans ?? 200;
  }

  /**
   * Production: requests made here wake the scanner processes through NOTIFY, and this process (if it scans)
   * wakes when another asks.
   */
  useNotify(listener: PgListener) {
    this.wakeOthers = (userId) => notify(this.ctx, SCAN_CHANNEL, userId);
    if (this.ctx.config.scheduler) listener.on(SCAN_CHANNEL, () => this.kick());
  }

  /** Records a tab's presence. Returns true if this made the developer visible. */
  async report(userId: string, tabId: string, visible: boolean): Promise<boolean> {
    const db = this.ctx.db;
    const before = await this.state(userId);
    await db.query(
      `insert into presence (user_id, tab_id, visible, at) values ($1, $2, $3, now())
       on conflict (user_id, tab_id) do update set visible = excluded.visible, at = excluded.at`,
      [userId, tabId, visible],
    );
    await db.query(`update users set last_seen_at = now() where id = $1`, [userId]);
    await db.query(`insert into user_activity (user_id, day) values ($1, current_date) on conflict do nothing`, [userId]);
    const after = visible ? "visible" : await this.state(userId);
    if (before !== "visible" && after === "visible" && this.ctx.config.autoScan) await this.maybeScanOnVisible(userId);
    return after === "visible";
  }

  async state(userId: string): Promise<"visible" | "open" | "away"> {
    const r = await this.ctx.db.one(`select ${PRESENCE_STATE("$1")} as state`, [userId]);
    return r?.state ?? "away";
  }

  /** SCAN-6: becoming visible starts a scan if the last one finished more than 5 minutes ago. */
  private async maybeScanOnVisible(userId: string) {
    const last = await this.lastFinished(userId);
    if (!last || Date.now() - last > this.ctx.config.intervals.visible * 1000) this.trigger(userId, "visible");
  }

  private async lastFinished(userId: string): Promise<number | null> {
    const r = await this.ctx.db.one(`select max(finished_at) as t from scans where user_id = $1`, [userId]);
    return r?.t ? Date.parse(r.t) : null;
  }

  /**
   * Asks for a scan. A request while one is waiting or running joins it (SCAN-4); a request that needs a
   * full scan (Sync now, Settings) replaces a waiting scheduled one, and runs again after a running
   * incremental scan, so Sync now always sees "No longer yours" removals (design: Scheduler).
   */
  trigger(userId: string, trigger: string) {
    this.request(userId, trigger).catch((e) => log.error("scheduler", "couldn't request a scan", { user: userId, error: String(e?.stack ?? e) }));
  }

  private async request(userId: string, trigger: string, delaySeconds = 0) {
    await this.ctx.db.query(
      `insert into scan_requests (user_id, trigger, not_before) values ($1, $2, now() + make_interval(secs => $3))
       on conflict (user_id) do update set
         trigger = case when excluded.trigger = any($4::text[]) then excluded.trigger else scan_requests.trigger end,
         not_before = least(scan_requests.not_before, excluded.not_before)`,
      [userId, trigger, delaySeconds, [...FULL_TRIGGERS]],
    );
    if (delaySeconds > 0) return;
    if (this.ctx.config.scheduler) this.kick();
    else await this.wakeOthers?.(userId);
  }

  /** Claims waiting requests soon. Calls while a claim runs make it look again when it finishes. */
  kick() {
    if (this.stopped) return;
    if (this.claiming) { this.claimAgain = true; return; }
    this.claiming = true;
    this.claim()
      .catch((e) => log.error("scheduler", "claiming scans failed", { error: String(e?.stack ?? e) }))
      .finally(() => {
        this.claiming = false;
        if (this.claimAgain) { this.claimAgain = false; this.kick(); }
      });
  }

  /** Takes waiting requests, up to this process's spare capacity, and starts their scans. */
  private async claim() {
    const room = this.maxScans - this.running.size;
    if (room <= 0) return;
    const rows = await this.ctx.db.query(
      `delete from scan_requests where user_id in (
         select user_id from scan_requests where not_before <= now()
         order by not_before for update skip locked limit $1)
       returning user_id, trigger`,
      [room],
    );
    for (const r of rows) this.run(r.user_id, r.trigger);
  }

  private run(userId: string, trigger: string) {
    if (this.running.has(userId)) {
      // A scan for this developer is running here: join it, and follow an incremental one with a full one.
      if (FULL_TRIGGERS.has(trigger)) void this.retryFullAfterIncremental(userId, trigger, true);
      return;
    }
    this.running.add(userId);
    scan(this.ctx, userId, trigger)
      .then(async (r) => {
        // Skipped because another process is scanning this developer: a full scan waits for it to finish.
        if (r.outcome === "skipped" && FULL_TRIGGERS.has(trigger)) await this.retryFullAfterIncremental(userId, trigger);
      })
      .catch((e) => log.error("scan", "scan crashed", { user: userId, error: String(e?.stack ?? e) }))
      .finally(() => {
        this.running.delete(userId);
        this.kick();
      });
  }

  /** `startingHere`: a scan is starting in this process, and may not have recorded its kind yet. */
  private async retryFullAfterIncremental(userId: string, trigger: string, startingHere = false) {
    const open = await this.ctx.db.one(`select kind from scans where user_id = $1 and finished_at is null`, [userId]);
    if (open ? open.kind !== "full" : startingHere) await this.request(userId, trigger, RETRY_FULL_SECONDS);
  }

  start() {
    const tick = () => this.tick().catch((e) => log.error("scheduler", "tick failed", { error: String(e?.stack ?? e) })).finally(() => {
      if (this.timer) this.timer = setTimeout(tick, this.ctx.config.schedulerTickMs);
    });
    this.timer = setTimeout(tick, 500);
  }

  /**
   * Stops claiming scans and gives up the lease, so another process takes over at once. Scans already
   * running are cut off when the process exits; the next periodic pass closes them (reapScans).
   */
  async stop() {
    this.stopped = true;
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    await this.ctx.db.query(`delete from leases where name = 'scheduler' and holder = $1`, [this.id]).catch(() => {});
  }

  /** Takes or renews the periodic pass's lease. */
  private async lead(): Promise<boolean> {
    const r = await this.ctx.db.one(
      `insert into leases (name, holder, expires_at) values ('scheduler', $1, now() + make_interval(secs => $2))
       on conflict (name) do update set holder = excluded.holder, expires_at = excluded.expires_at
       where leases.holder = excluded.holder or leases.expires_at < now()
       returning holder`,
      [this.id, LEASE_SECONDS],
    );
    return Boolean(r);
  }

  async tick() {
    if (await this.lead()) await this.periodic();
    // Every scanner claims requests on each tick too, in case a NOTIFY was missed.
    this.kick();
  }

  /** The periodic pass: one process at a time. */
  private async periodic() {
    const { db, config } = this.ctx;
    await reapLeases(this.ctx);
    await reapScans(this.ctx);
    await promote(this.ctx);
    await refreshQuotas(this.ctx);
    await db.query(`delete from presence where at < now() - make_interval(secs => $1)`, [PRESENCE_TTL_SECONDS * 2]);
    await db.query(`delete from relay_events where created_at < now() - interval '10 minutes'`);
    await db.query(`delete from oauth_states where created_at < now() - interval '1 hour'`);
    // With automatic scans off (local mode), only Sync now and saving Settings scan.
    if (!config.autoScan) return;
    const users = await db.query(
      `select u.id, u.last_seen_at, u.first_sync_done, ${PRESENCE_STATE("u.id")} as presence,
              (select max(finished_at) from scans s where s.user_id = u.id) as last_finished,
              (select max(finished_at) from scans s where s.user_id = u.id and s.outcome = 'ok') as last_ok
       from users u where exists (select 1 from credentials c where c.user_id = u.id and c.kind = 'github_pat')`,
    );
    for (const u of users) {
      const state = u.presence as "visible" | "open" | "away";
      const interval = config.intervals[state === "visible" ? "visible" : state === "open" ? "open" : "background"];
      const inactive = Date.now() - Date.parse(u.last_seen_at) > config.inactiveDays * 86_400_000;
      const last = u.last_finished ? Date.parse(u.last_finished) : 0;
      if (!inactive && Date.now() - last >= interval * 1000) this.trigger(u.id, `schedule:${state}`);
      // "Your issues and PRs haven't updated since {time}" (PRD catalogue: 3 hours).
      const lastOk = u.last_ok ? Date.parse(u.last_ok) : null;
      if (u.first_sync_done && lastOk && Date.now() - lastOk > config.staleAfterSeconds * 1000) {
        await raise(this.ctx, u.id, "stale", { since: new Date(lastOk).toISOString() });
      } else if (lastOk) {
        await clear(this.ctx, u.id, ["stale"]);
      }
    }
    // Hourly: re-rank, as one bulk batch per developer, items not ranked in the last 24 hours (RANK-9, LIVE-24),
    // and delete item data no developer has had for 30 days (PRIV-5).
    if (Date.now() - this.lastAgeingPass > 3_600_000) {
      this.lastAgeingPass = Date.now();
      const due = await db.query(
        `select distinct ui.user_id from user_items ui join users u on u.id = ui.user_id
         where ui.status = 'active' and ui.ranked_at < now() - interval '24 hours'
           and u.last_seen_at > now() - make_interval(days => $1)
           and not exists (select 1 from rank_batches b where b.user_id = ui.user_id and b.reason = 'ageing' and b.finished_at is null)`,
        [config.inactiveDays],
      );
      for (const r of due) await queueFullRerank(this.ctx, r.user_id, "ageing", 24);
      await deleteOldItems(this.ctx);
    }
  }
}

/** PRIV-5: an item's data, and each developer's record of it, go 30 days after no developer has it. */
export async function deleteOldItems(ctx: Ctx) {
  await ctx.db.query(`delete from user_items where status = 'gone' and gone_at < now() - interval '30 days'`);
  await ctx.db.query(`delete from items i where not exists (select 1 from user_items ui where ui.item_key = i.key) and coalesce(i.snapshot_updated_at, i.updated_at) < now() - interval '1 day'`);
  await ctx.db.query(`delete from rank_jobs where state in ('done', 'failed') and finished_at < now() - interval '30 days'`);
  await ctx.db.query(`delete from rank_batches where finished_at < now() - interval '30 days'`);
  // METRIC-1 needs past days and months, not years (design: Data model).
  await ctx.db.query(`delete from user_activity where day < current_date - interval '13 months'`);
}
