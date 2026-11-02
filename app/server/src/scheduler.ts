// Scan scheduling from presence (design: Scheduler; PRD SCAN-5, SCAN-6, RANK-9, PRIV-5).
import { log } from "./log.ts";
import type { Ctx } from "./context.ts";
import { queueFullRerank, reapLeases, refreshQuotas } from "./jobs.ts";
import { clear, promote, raise } from "./notify.ts";
import { FULL_TRIGGERS, reapScans, scan } from "./scanner.ts";

const PRESENCE_TTL_MS = 90_000;

type Tab = { visible: boolean; at: number };

export class Scheduler {
  private presence = new Map<string, Map<string, Tab>>();
  private running = new Set<string>();
  private timer: NodeJS.Timeout | null = null;
  private lastAgeingPass = 0;

  constructor(private ctx: Ctx) {}

  /** Records a tab's presence. Returns true if this made the developer visible. */
  report(userId: string, tabId: string, visible: boolean): boolean {
    const before = this.state(userId);
    const tabs = this.presence.get(userId) ?? new Map<string, Tab>();
    tabs.set(tabId, { visible, at: Date.now() });
    this.presence.set(userId, tabs);
    void this.ctx.db.query(`update users set last_seen_at = now() where id = $1`, [userId]);
    void this.ctx.db.query(`insert into user_activity (user_id, day) values ($1, current_date) on conflict do nothing`, [userId]);
    const after = this.state(userId);
    if (before !== "visible" && after === "visible" && this.ctx.config.autoScan) void this.maybeScanOnVisible(userId);
    return after === "visible";
  }

  state(userId: string): "visible" | "open" | "away" {
    const tabs = [...(this.presence.get(userId)?.values() ?? [])].filter((t) => Date.now() - t.at < PRESENCE_TTL_MS);
    if (tabs.some((t) => t.visible)) return "visible";
    return tabs.length ? "open" : "away";
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

  /** Developers who asked for a full scan (Sync now, Settings) while an incremental one was running. */
  private wantsFull = new Set<string>();
  private runningKind = new Map<string, "full" | "incremental" | undefined>();

  trigger(userId: string, trigger: string) {
    if (this.running.has(userId)) {
      // Joins the running scan (SCAN-4). If that scan is incremental, a full one follows straight
      // after, so Sync now always sees "No longer yours" removals (design: Scheduler).
      if (FULL_TRIGGERS.has(trigger) && this.runningKind.get(userId) !== "full") this.wantsFull.add(userId);
      return;
    }
    this.running.add(userId);
    this.runningKind.set(userId, undefined);
    scan(this.ctx, userId, trigger, {}, (kind) => this.runningKind.set(userId, kind))
      .catch((e) => log.error("scan", "scan crashed", { user: userId, error: String(e?.stack ?? e) }))
      .finally(() => {
        this.running.delete(userId);
        this.runningKind.delete(userId);
        if (this.wantsFull.delete(userId)) this.trigger(userId, "manual");
      });
  }

  start() {
    const tick = () => this.tick().catch((e) => log.error("scheduler", "tick failed", { error: String(e?.stack ?? e) })).finally(() => {
      this.timer = setTimeout(tick, this.ctx.config.schedulerTickMs);
    });
    this.timer = setTimeout(tick, 500);
  }

  stop() { if (this.timer) clearTimeout(this.timer); }

  async tick() {
    const { db, config } = this.ctx;
    await reapLeases(this.ctx);
    await reapScans(this.ctx);
    await promote(this.ctx);
    await refreshQuotas(this.ctx);
    // With automatic scans off (local mode), only Sync now and saving Settings scan.
    if (!config.autoScan) return;
    // Prototype: one query over all developers with a token. Production: next_scan_at + SKIP LOCKED (design: Scheduler).
    const users = await db.query(
      `select u.id, u.last_seen_at, u.first_sync_done,
              (select max(finished_at) from scans s where s.user_id = u.id) as last_finished,
              (select max(finished_at) from scans s where s.user_id = u.id and s.outcome = 'ok') as last_ok
       from users u where exists (select 1 from credentials c where c.user_id = u.id and c.kind = 'github_pat')`,
    );
    for (const u of users) {
      const state = this.state(u.id);
      const interval = config.intervals[state === "visible" ? "visible" : state === "open" ? "open" : "background"];
      const inactive = Date.now() - Date.parse(u.last_seen_at) > config.inactiveDays * 86_400_000;
      const last = u.last_finished ? Date.parse(u.last_finished) : 0;
      if (!inactive && Date.now() - last >= interval * 1000) this.trigger(u.id, `schedule:${state}`);
      // "Your issues haven't updated since {time}" (PRD catalogue: 3 hours).
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
