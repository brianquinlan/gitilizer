// The ranking worker (design: Ranking worker). It claims jobs from the queue,
// asks Gemini with the developer's own key, and stores the answer. It runs in
// every API process; the queue is in Postgres, so several processes share the
// work without coordinating.
import { FakeLLM, GeminiLLM, classifyGemini, iceboxCheck, scoreItem, type LLM } from "@gitilizer/ranker";
import type { Ctx } from "./context.ts";
import { completeJob, failJob, reapLeases, type ClaimedJob } from "./jobs.ts";
import { log } from "./log.ts";

/** Ranking uses the lowest thinking level the models allow (PRD RANK-11). */
export const THINKING_LEVEL = "low";
const LEASE_SECONDS = 120;
/**
 * The most a job may wait for Gemini, retries included: well inside the lease,
 * so a slow answer comes back as `unavailable` and is retried later, instead
 * of the lease expiring and the item failing (GitHub issue #3).
 */
export const GEMINI_TIMEOUT_MS = (LEASE_SECONDS - 30) * 1000;

export type WorkerOptions = {
  /** Jobs in flight at once, across all developers. Each developer is limited to 4 by the claim (RANK-11). */
  concurrency?: number;
  idleMs?: number;
  /** Makes the model client for a job. Defaults to Gemini, or the fake model in fixture mode. */
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
  private summaryTimer: NodeJS.Timeout | null = null;

  constructor(private ctx: Ctx, opts: WorkerOptions = {}) {
    this.concurrency = opts.concurrency ?? 16;
    this.idleMs = opts.idleMs ?? 1000;
    const fake = new FakeLLM();
    this.llm = opts.llm ?? (ctx.config.geminiMode === "fake"
      ? () => fake
      // Few retries: the lease is 120 s, and the server re-queues short-lived failures.
      : (job) => new GeminiLLM({ model: job.model, apiKey: job.geminiKey, thinkingLevel: THINKING_LEVEL, maxRetries: 2, timeoutMs: GEMINI_TIMEOUT_MS }));
  }

  start() {
    this.running = true;
    this.summaryTimer = setInterval(() => this.summarize(), 60_000);
    void this.loop();
  }

  async stop() {
    this.running = false;
    if (this.summaryTimer) clearInterval(this.summaryTimer);
    this.summarize();
    this.wake?.();
    while (this.inFlight > 0) await new Promise((r) => setTimeout(r, 50));
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
        const a = await scoreItem(job, llm);
        await completeJob(this.ctx, job.id, a);
        this.record(started);
        log.debug("worker", "ranked", { item: job.itemKey, model: job.model, priority: a.priority, ms: Date.now() - started });
      }
    } catch (e) {
      const c = classifyGemini(e);
      this.stats.failed[c.code] = (this.stats.failed[c.code] ?? 0) + 1;
      // Expected, short-lived failures are counted in the summary; the rest need a look.
      const expected = ["rate_limited", "unavailable", "daily_quota"].includes(c.code);
      log[expected ? "debug" : "warn"]("worker", "job failed", { item: job.itemKey, model: job.model, code: c.code, message: c.message.slice(0, 300) });
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
}
