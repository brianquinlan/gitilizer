// Shared server context, configuration and small helpers.
import type { FastifyReply } from "fastify";
import type { CheckResult, ListEvent, Notification, SyncEvent } from "@gitilizer/shared";
import type { Allowlist } from "./allowlist.ts";
import type { CredentialCipher } from "./crypto.ts";
import type { Db } from "./db.ts";
import type { GitHubApi } from "./github/types.ts";

export type Config = {
  port: number;
  internalPort: number;
  /** Bearer token for the operator endpoints on the internal port (/internal/metrics). */
  workerToken: string;
  githubMode: "real" | "fixtures";
  geminiMode: "real" | "fake";
  /** Gemini models in fallback order (PRD RANK-13); the first is the primary model. */
  models: string[];
  defaultPrompt: string;
  /** Short-lived notifications wait this long before showing (PRD NOTIF-21: 15 min). */
  shortLivedSeconds: number;
  staleAfterSeconds: number;
  /** Scan intervals (PRD SCAN-5), in seconds. */
  intervals: { visible: number; open: number; background: number };
  /** Background scans only for developers seen within this many days (SCAN-5: 7). */
  inactiveDays: number;
  /** The Prioritized list's limit (LIST-19: 1,000). */
  maxItems: number;
  /** A scan is full when the last full scan is older than this (design: Scheduler, D-5). */
  fullScanSeconds: number;
  /** At most this many Gemini requests at once for one developer (RANK-11). */
  perDeveloperConcurrency: number;
  schedulerTickMs: number;
  /** Local mode: one developer, signed in automatically (contributor/LOCAL_DEVELOPMENT.md). */
  localMode: boolean;
  /** Scan on a schedule (SCAN-5, SCAN-6) and run the daily re-rank. Off in local mode unless asked for. */
  autoScan: boolean;
  /** Who may sign in (the development environment); null lets everyone in (PRD NFR-12). */
  allowlist: Allowlist | null;
  /** Where browsers reach this environment, such as https://gitilizer.com. OAuth redirect URLs are built from it. */
  publicUrl: string;
  /** Google and GitHub sign-in apps (design: Sign-in and sessions). null when a provider isn't configured. */
  oauth: { google: OAuthClient | null; github: OAuthClient | null };
  /** The development sign-in stub, POST /api/auth/dev: local mode, fixture mode and tests only, never deployed. */
  devSignIn: boolean;
  /** The deployed environments: HTTPS-only `__Host-` cookies, HSTS. Set by GITILIZER_ENV. */
  secure: boolean;
  /** This process runs the scheduler and the scanner. SCHEDULER=off leaves them to another service (design: Hosting). */
  scheduler: boolean;
  /** The built web app (app/web/dist) to serve, or null to serve only the API. */
  webDir: string | null;
};

export type OAuthClient = { clientId: string; clientSecret: string };

type Subscriber = { reply: FastifyReply; userId: string };

/** One event for one developer's open tabs, as it travels between processes. */
export type RelayMessage =
  | { u: string; t: "list"; e: ListEvent }
  | { u: string; t: "notifications"; l: Notification[] }
  | { u: string; t: "sync"; e: SyncEvent };

/** Carries events to every server process, so a tab gets them whichever process it is connected to. */
export interface Relay { send(m: RelayMessage): void }

/** How long a developer's replay buffer outlives their last open tab. */
const BUFFER_KEEP_MS = 10 * 60_000;

/**
 * Fan-out of server-sent events to this process's open tabs, with a short replay buffer (design: Live updates).
 * With a relay (Postgres in production), `list`, `notifications` and `sync` send the event to every process,
 * and each process's relay hands it back through `deliver`; without one (PGlite: one process), they deliver here.
 */
export class Hub {
  relay: Relay | null = null;
  private subs = new Set<Subscriber>();
  private buffers = new Map<string, ListEvent[]>();
  private dropTimers = new Map<string, NodeJS.Timeout>();

  subscribe(userId: string, reply: FastifyReply): () => void {
    const s = { reply, userId };
    this.subs.add(s);
    const t = this.dropTimers.get(userId);
    if (t) { clearTimeout(t); this.dropTimers.delete(userId); }
    return () => {
      this.subs.delete(s);
      if (this.connected(userId) === 0 && this.buffers.has(userId)) {
        const timer = setTimeout(() => { this.buffers.delete(userId); this.dropTimers.delete(userId); }, BUFFER_KEEP_MS);
        timer.unref?.();
        this.dropTimers.set(userId, timer);
      }
    };
  }

  /** Replays list events after `afterVersion`, or returns false if the buffer doesn't reach back that far. */
  replay(userId: string, afterVersion: number, send: (e: ListEvent) => void): boolean {
    const buf = this.buffers.get(userId) ?? [];
    const missing = buf.filter((e) => e.version > afterVersion);
    if (missing.length && missing[0].version !== afterVersion + 1) return false;
    if (!missing.length && buf.length && buf[buf.length - 1].version < afterVersion) return false;
    if (!missing.length && !buf.length) return false;
    missing.forEach(send);
    return true;
  }

  private send(userId: string, event: string, data: unknown, id?: number) {
    for (const s of this.subs) {
      if (s.userId !== userId) continue;
      s.reply.raw.write(`${id !== undefined ? `id: ${id}\n` : ""}event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    }
  }

  list(userId: string, e: ListEvent) {
    if (this.relay) this.relay.send({ u: userId, t: "list", e });
    else this.deliver({ u: userId, t: "list", e });
  }
  notifications(userId: string, l: Notification[]) {
    if (this.relay) this.relay.send({ u: userId, t: "notifications", l });
    else this.deliver({ u: userId, t: "notifications", l });
  }
  sync(userId: string, e: SyncEvent) {
    if (this.relay) this.relay.send({ u: userId, t: "sync", e });
    else this.deliver({ u: userId, t: "sync", e });
  }

  /** Sends an event to this process's tabs. List events are kept for replay only while the developer has tabs here. */
  deliver(m: RelayMessage) {
    if (m.t === "list") {
      if (!this.relay || this.connected(m.u) > 0 || this.buffers.has(m.u)) {
        const buf = this.buffers.get(m.u) ?? [];
        buf.push(m.e);
        if (buf.length > 200) buf.shift();
        this.buffers.set(m.u, buf);
      }
      this.send(m.u, "list", m.e, m.e.version);
    } else if (m.t === "notifications") this.send(m.u, "notifications", m.l);
    else this.send(m.u, "sync", m.e);
  }

  connected(userId: string): number { return [...this.subs].filter((s) => s.userId === userId).length; }
  /** Developers with a tab open on this process. */
  users(): string[] { return [...new Set([...this.subs].map((s) => s.userId))]; }

  /** Ends every stream, so a stopping process doesn't wait for tabs; the browsers reconnect elsewhere. */
  closeAll() {
    for (const s of this.subs) s.reply.raw.end();
    this.subs.clear();
  }
}

export type Ctx = {
  db: Db;
  cipher: CredentialCipher;
  hub: Hub;
  config: Config;
  /** GitHub client for a PAT (or the fixture store in fixture mode). */
  github(pat: string): GitHubApi;
  /** Checks a Gemini API key without using request quota (SET-28). */
  validateGemini(key: string, model: string): Promise<CheckResult>;
  /** Called by routes to ask the scheduler for a scan now. */
  requestScan(userId: string, trigger: string): void;
  /**
   * Whether this process's release should do background work: false once a newer release is running
   * (design: Deployment, D-14). Absent means always.
   */
  isCurrentRelease?: () => Promise<boolean>;
  /** HTTP client for the sign-in providers; tests replace it. */
  http?: typeof fetch;
};

export const nowIso = () => new Date().toISOString();

export function minutesAgo(iso: string | null | undefined): number {
  return iso ? (Date.now() - Date.parse(iso)) / 60000 : Infinity;
}
