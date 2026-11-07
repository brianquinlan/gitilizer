// Which release does the background work (design: Deployment, D-14).
//
// After a release, Cloud Run can keep the previous revision's instance running for many minutes,
// with its scheduler and ranking worker still claiming work from the shared database. The release
// that started most recently is the one that should do it, so every other process stands down: it
// stops claiming scans and ranking jobs, but keeps serving any request that still reaches it and
// finishes the work it already has.
import { randomUUID } from "node:crypto";
import type { Db } from "./db.ts";
import { log } from "./log.ts";

/** A process that hasn't recorded a heartbeat for this long has stopped. */
const ALIVE_SECONDS = 60;
const HEARTBEAT_MS = 15_000;

export class ReleaseGate {
  readonly id = randomUUID();
  private current = true;
  private checkedAt = 0;
  private timer: NodeJS.Timeout | null = null;

  /**
   * `release` identifies the code: the commit the image was built from. Without one (local mode,
   * tests, an image built outside Cloud Build) the process always does its work.
   * `cacheMs`: how long an answer is reused, so claiming work doesn't query the database each time.
   */
  constructor(private db: Db, readonly release: string | null, private cacheMs = 5_000) {}

  async start() {
    if (!this.release) return;
    // A release's first start never changes, so an old release whose instance Cloud Run restarts
    // doesn't take the work back from a newer one.
    await this.db.query(`insert into releases (release) values ($1) on conflict do nothing`, [this.release]);
    await this.db.query(`insert into processes (id, release) values ($1, $2)`, [this.id, this.release]);
    this.timer = setInterval(() => {
      this.db.query(`update processes set heartbeat_at = now() where id = $1`, [this.id]).catch(() => {});
      this.db.query(`delete from processes where heartbeat_at < now() - interval '1 day'`).catch(() => {});
    }, HEARTBEAT_MS);
    this.timer.unref?.();
  }

  async stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    if (this.release) await this.db.query(`delete from processes where id = $1`, [this.id]).catch(() => {});
  }

  /** Whether this process's release is the newest one still running, so it should do background work. */
  async isCurrent(): Promise<boolean> {
    if (!this.release) return true;
    if (Date.now() - this.checkedAt < this.cacheMs) return this.current;
    let newest: string | undefined;
    try {
      const r = await this.db.one(
        `select r.release from releases r
         where exists (select 1 from processes p where p.release = r.release and p.heartbeat_at > now() - make_interval(secs => $1))
         order by r.first_started_at desc limit 1`,
        [ALIVE_SECONDS],
      );
      newest = r?.release;
    } catch {
      return this.current; // keep the last answer if the database can't be reached
    }
    const current = !newest || newest === this.release;
    if (current !== this.current) {
      if (current) log.info("release", "doing background work again: no newer release is running", { release: this.release });
      else log.warn("release", "standing down: a newer release is running, so this process stops claiming scans and ranking jobs", { release: this.release, newer: newest });
    }
    this.current = current;
    this.checkedAt = Date.now();
    return current;
  }
}
