// Shared server context, configuration and small helpers.
import type { FastifyReply } from "fastify";
import type { ListEvent, Notification, SyncEvent } from "@gitilizer/shared";
import type { CredentialCipher } from "./crypto.ts";
import type { Db } from "./db.ts";
import type { GitHubApi } from "./github/types.ts";

export type Config = {
  port: number;
  internalPort: number;
  workerToken: string;
  githubMode: "real" | "fixtures";
  geminiMode: "real" | "fake";
  model: string;
  defaultPrompt: string;
  /** Short-lived notifications wait this long before showing (PRD Q-17: 15 min). */
  shortLivedSeconds: number;
  staleAfterSeconds: number;
  /** Scan intervals (PRD SCAN-5), in seconds. */
  intervals: { visible: number; open: number; background: number };
  inactiveDays: number;
  maxItems: number;
  manualSyncMinSeconds: number;
  schedulerTickMs: number;
  /** Local mode: one developer, signed in automatically (docs/local-development.md). */
  localMode: boolean;
  /** Scan on a schedule (SCAN-5, SCAN-6) and run the daily re-rank. Off in local mode unless asked for. */
  autoScan: boolean;
};

type Subscriber = { reply: FastifyReply; userId: string };

/** In-memory fan-out of server-sent events with a short replay buffer (design: Live updates). */
export class Hub {
  private subs = new Set<Subscriber>();
  private buffers = new Map<string, ListEvent[]>();

  subscribe(userId: string, reply: FastifyReply): () => void {
    const s = { reply, userId };
    this.subs.add(s);
    return () => this.subs.delete(s);
  }

  /** Replays list events after `afterVersion`, or returns false if the buffer doesn't reach back that far. */
  replay(userId: string, afterVersion: number, send: (e: ListEvent) => void): boolean {
    const buf = this.buffers.get(userId) ?? [];
    const missing = buf.filter((e) => e.version > afterVersion);
    if (missing.length && missing[0].version !== afterVersion + 1) return false;
    if (!missing.length && buf.length && buf[buf.length - 1].version < afterVersion) return false;
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
    const buf = this.buffers.get(userId) ?? [];
    buf.push(e);
    if (buf.length > 200) buf.shift();
    this.buffers.set(userId, buf);
    this.send(userId, "list", e, e.version);
  }

  notifications(userId: string, list: Notification[]) { this.send(userId, "notifications", list); }
  sync(userId: string, e: SyncEvent) { this.send(userId, "sync", e); }
  connected(userId: string): number { return [...this.subs].filter((s) => s.userId === userId).length; }
}

export type Ctx = {
  db: Db;
  cipher: CredentialCipher;
  hub: Hub;
  config: Config;
  /** GitHub client for a PAT (or the fixture store in fixture mode). */
  github(pat: string): GitHubApi;
  validateGemini(key: string, model: string): Promise<{ ok: boolean; detail: string; code?: string }>;
  /** Called by routes to ask the scheduler for a scan now. */
  requestScan(userId: string, trigger: string): void;
};

export const nowIso = () => new Date().toISOString();

export function minutesAgo(iso: string | null | undefined): number {
  return iso ? (Date.now() - Date.parse(iso)) / 60000 : Infinity;
}
