// The ranking worker (design: Ranking worker). It claims jobs from the queue,
// asks the developer's ranking agent with their own key, or basic ranking with
// Gitilizer's (PRD RANK-21), and stores the answer.
// It runs in every API process; the queue is in Postgres, so several processes
// share the work without coordinating.
import { FakeLLM, classifyFor, createLLM, iceboxCheck, scoreItem, type LLM } from "@gitilizer/ranker";
import type { Ctx } from "./context.ts";
import { completeJob, failJob, reapLeases, type ClaimedJob } from "./jobs.ts";
import { log } from "./log.ts";

/** Gemini ranks with the lowest thinking level its models allow (PRD RANK-11); Claude without thinking and OpenAI at its own lowest effort (RANK-19). */
export const THINKING_LEVEL = "low";
const LEASE_SECONDS = 120;
/**
 * The most a job may wait for the ranking agent, retries included: well inside the lease,
 * so a slow answer comes back as `unavailable` and is retried later, instead
 * of the lease expiring and the item failing (GitHub issue #3).
 */
export const AGENT_TIMEOUT_MS = (LEASE_SECONDS - 30) * 1000;

export type WorkerOptions = {
  /** Jobs in flight at once, across all developers. Each developer is limited to 4 by the claim (RANK-11). */
  concurrency?: number;
  idleMs?: number;
  /** Makes the model client for a job. Defaults to the job's agent, or the fake model in fixture mode. */
  llm?: (job: ClaimedJob) => LLM;
};

export class RankingWorker {
  private running = false;
  private inFlight = 0;
  private timer: NodeJS.Timeout | null = null;
  private wake: (() => void) | null = null;
  private readonly concurrency: number;
  private readonly idleMs: number;
  private readonly llm: (job: ClaimedJob) => LLM;
  /** Counts for the once-a-minute summary line (design: Logging). */
  private stats = { done: 0, failed: {} as Record<string, number>, ms: [] as number[] };
  /** Items ranked since the last summary, keyed by the JSON of [choice, agent, model] (METRIC-5). */
  private volume = new Map<string, number>();
  private summaryTimer: NodeJS.Timeout | null = null;

  constructor(private ctx: Ctx, opts: WorkerOptions = {}) {
    this.concurrency = opts.concurrency ?? 16;
    this.idleMs = opts.idleMs ?? 1000;
    const fake = new FakeLLM();
    this.llm = opts.llm ?? (ctx.config.geminiMode === "fake"
      ? () => fake
      // Few retries: the lease is 120 s, and the server re-queues short-lived failures.
      : (job) => createLLM(job.agent, {
        model: job.model, apiKey: job.apiKey, thinkingLevel: job.agent === "gemini" ? THINKING_LEVEL : null, maxRetries: 2, timeoutMs: AGENT_TIMEOUT_MS,
      }));
  }

  start() {
    this.running = true;
    this.summaryTimer = setInterval(() => { this.summarize(); void this.flushVolume(); }, 60_000);
    void this.loop();
  }

  async stop() {
    this.running = false;
    if (this.summaryTimer) clearInterval(this.summaryTimer);
    this.wake?.();
    while (this.inFlight > 0) await new Promise((r) => setTimeout(r, 50));
    this.summarize();
    await this.flushVolume();
  }

  /** Claims and runs jobs until there are none, then waits a moment. */
  private async loop() {
    while (this.running) {
      let claimed: ClaimedJob[] = [];
      try {
        const room = this.concurrency - this.inFlight;
        // An older release stands down: jobs it has keep running, but it claims no more (design: Deployment, D-14).
        if (room > 0 && (await (this.ctx.isCurrentRelease?.() ?? true))) {
          await reapLeases(this.ctx);
          claimed = await this.claim(room);
        }
      } catch (e) {
        log.error("worker", "claiming jobs failed", { error: String(e) });
      }
      for (const job of claimed) {
        this.inFlight++;
        void this.run(job).finally(() => { this.inFlight--; this.wake?.(); });
      }
      if (!claimed.length) await new Promise<void>((r) => { this.wake = r; this.timer = setTimeout(r, this.idleMs); });
      if (this.timer) clearTimeout(this.timer);
    }
  }

  private async claim(max: number) {
    const { claimJobs } = await import("./jobs.ts");
    return claimJobs(this.ctx, max, LEASE_SECONDS);
  }

  /** Runs one job. Every failure is classified and reported, never thrown. */
  async run(job: ClaimedJob): Promise<void> {
    const started = Date.now();
    try {
      const llm = this.llm(job);
      if (job.kind === "icebox_check") {
        const d = await iceboxCheck(job, llm);
        await completeJob(this.ctx, job.id, { bring_back: d.bring_back, reason: d.reason });
        this.record(started);
        log.debug("worker", "icebox check", { item: job.itemKey, bringBack: d.bring_back, ms: Date.now() - started });
      } else {
        const scored = await scoreItem(job, llm);
        // Basic ranking stores a score and whether the item is actionable, and no text (RANK-2), whatever the model sent.
        const a = job.agent === "basic" ? { ...scored, next_action: "", reasoning: "" } : scored;
        await completeJob(this.ctx, job.id, a);
        this.record(started);
        const series = JSON.stringify([job.choice, job.agent, job.model]);
        this.volume.set(series, (this.volume.get(series) ?? 0) + 1);
        log.debug("worker", "ranked", { item: job.itemKey, model: job.model, priority: a.priority, ms: Date.now() - started });
      }
    } catch (e) {
      const c = classifyFor(job.agent, e);
      this.stats.failed[c.code] = (this.stats.failed[c.code] ?? 0) + 1;
      // Expected, short-lived failures are counted in the summary; the rest need a look.
      const expected = ["rate_limited", "unavailable", "daily_quota"].includes(c.code);
      // The stack says where an unclassified failure came from, which the message alone often doesn't.
      const stack = ["internal", "unknown"].includes(c.code) && e instanceof Error ? e.stack?.slice(0, 2000) : undefined;
      log[expected ? "debug" : "warn"]("worker", "job failed", { item: job.itemKey, agent: job.agent, model: job.model, code: c.code, message: c.message.slice(0, 300), stack });
      try {
        await failJob(this.ctx, job.id, { code: c.code, message: c.message.slice(0, 500), retryAfterSeconds: c.retryAfter });
      } catch (dbError) {
        // The database is unreachable, for example a dropped connection. Leave the
        // job leased: reapLeases puts it back in the queue when the lease expires.
        log.error("worker", "couldn't record a failed job", { item: job.itemKey, error: String(dbError) });
      }
    }
  }

  private record(started: number) {
    this.stats.done++;
    this.stats.ms.push(Date.now() - started);
  }

  /** One line a minute instead of one per item: jobs done and failed, and how long they took (NFR-6, NFR-11). */
  private summarize() {
    const { done, failed, ms } = this.stats;
    if (!done && !Object.keys(failed).length) return;
    const sorted = [...ms].sort((a, b) => a - b);
    const pct = (p: number) => (sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))] : null);
    log.info("worker", "ranking summary", { done, failed, p50Ms: pct(50), p95Ms: pct(95) });
    this.stats = { done: 0, failed: {}, ms: [] };
  }

  /**
   * How much ranking each way of ranking did (METRIC-5): added to today's rows
   * in `ranking_volume`, and logged as one line per series for the dashboard's
   * charts. `choice` is the developer's; `agent` and `model` are what scored
   * the items, so a Gemini key's fallback to basic ranking shows as its own series.
   */
  async flushVolume() {
    const volume = this.volume;
    this.volume = new Map();
    for (const [series, items] of volume) {
      const [choice, agent, model] = JSON.parse(series) as [string, string, string];
      log.info("worker", "ranking volume", { choice, agent, model, items });
      try {
        await this.ctx.db.query(
          `insert into ranking_volume (day, choice, agent, model, items) values (current_date, $1, $2, $3, $4)
           on conflict (day, choice, agent, model) do update set items = ranking_volume.items + excluded.items`,
          [choice, agent, model, items],
        );
      } catch (e) {
        log.error("worker", "couldn't record ranking volume", { error: String(e) });
      }
    }
  }
}
