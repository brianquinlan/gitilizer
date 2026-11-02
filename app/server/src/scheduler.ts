// Scan scheduling from presence (design: Scheduler; PRD SCAN-5, SCAN-6, Q-47, Q-48).
import { STALE_AFTER_HOURS } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import { queueRankJobs, reapLeases } from "./jobs.ts";
import { clear, promote, raise } from "./notify.ts";
import { scan } from "./scanner.ts";

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

  trigger(userId: string, trigger: string) {
    if (this.running.has(userId)) return; // joins the running scan (SCAN-4)
    this.running.add(userId);
    scan(this.ctx, userId, trigger)
      .catch((e) => console.error(`[scan ${userId}]`, e))
      .finally(() => this.running.delete(userId));
  }

  start() {
    const tick = () => this.tick().catch((e) => console.error("[scheduler]", e)).finally(() => {
      this.timer = setTimeout(tick, this.ctx.config.schedulerTickMs);
    });
    this.timer = setTimeout(tick, 500);
  }

  stop() { if (this.timer) clearTimeout(this.timer); }

  async tick() {
    const { db, config } = this.ctx;
    await reapLeases(this.ctx);
    await promote(this.ctx);
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
      // "Your issues haven't updated since {time}" (PRD catalogue; Q-17 threshold).
      const lastOk = u.last_ok ? Date.parse(u.last_ok) : null;
      if (u.first_sync_done && lastOk && Date.now() - lastOk > config.staleAfterSeconds * 1000) {
        await raise(this.ctx, u.id, "stale", {
          time: new Date(lastOk).toISOString(),
          duration: `${Math.round(config.staleAfterSeconds / 3600) || STALE_AFTER_HOURS} hours`,
        });
      } else if (lastOk) {
        await clear(this.ctx, u.id, ["stale"]);
      }
    }
    // Daily ageing pass (PRD Q-48, assumed): re-rank items not ranked in 24 hours.
    if (Date.now() - this.lastAgeingPass > 3_600_000) {
      this.lastAgeingPass = Date.now();
      const stale = await db.query(
        `select user_id, item_key from user_items where status in ('active', 'iceboxed') and ranked_at < now() - interval '24 hours'`,
      );
      const byUser = new Map<string, { key: string; reason: string }[]>();
      for (const r of stale) byUser.set(r.user_id, [...(byUser.get(r.user_id) ?? []), { key: r.item_key, reason: "ageing" }]);
      for (const [userId, jobs] of byUser) await queueRankJobs(this.ctx, userId, jobs);
    }
  }
}
