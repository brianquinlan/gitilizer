// The text next to Sync now (PRD LIST-33): pure functions of the `sync` events
// and the time, so the throttling and the "waiting" delay can be unit-tested.
import type { SyncEvent, SyncProgress } from "@gitilizer/shared";

/** The text changes at most this often, so it doesn't flicker. */
export const PROGRESS_MIN_MS = 2000;
/** "· waiting for {agent}" appears only after this long without progress. */
export const WAITING_AFTER_MS = 5000;

export type ProgressView = {
  /** What is on screen; null for no text. */
  text: string | null;
  /** When `text` last changed. */
  shownAt: number;
  /** The newest event. */
  latest: SyncEvent | null;
  /** Since when the server has said `waiting` with the same `left`; null when it isn't waiting. */
  waitingSince: number | null;
  waitingLeft: number | null;
};

export function initProgress(): ProgressView {
  return { text: null, shownAt: -Infinity, latest: null, waitingSince: null, waitingLeft: null };
}

/** `agent` is the name of the developer's ranking agent, such as "Gemini" (SET-38). */
export function progressText(p: SyncProgress | null, waitingShown: boolean, agent = "Gemini"): string | null {
  if (!p) return null;
  if (p.phase === "finding") return p.found === null ? "Finding issues and PRs…" : `Finding issues and PRs… ${p.found} so far`;
  if (p.left <= 0) return null;
  return `${p.left} left to rank${waitingShown ? ` · waiting for ${agent}` : ""}`;
}

/** Takes in a `sync` event. Call `step` afterwards to update the text. */
export function receiveSync(v: ProgressView, e: SyncEvent, now: number): ProgressView {
  const p = e.running ? e.progress : null;
  let { waitingSince, waitingLeft } = v;
  if (p?.phase === "ranking" && p.waiting) {
    // The suffix goes as soon as the count changes, and may come back 5 s later.
    if (waitingSince === null || waitingLeft !== p.left) { waitingSince = now; waitingLeft = p.left; }
  } else {
    waitingSince = null;
    waitingLeft = null;
  }
  return { ...v, latest: e, waitingSince, waitingLeft };
}

/**
 * Brings the text up to date at time `now`. The first text shows at once, and
 * the text disappears at once when the sync finishes; any other change waits
 * until 2 s after the last one. Returns the view (the same object if nothing
 * changed) and when to call again, or null if nothing is due.
 */
export function step(v: ProgressView, now: number, agent = "Gemini"): { view: ProgressView; next: number | null } {
  const running = Boolean(v.latest?.running);
  const waitingDue = v.waitingSince === null ? null : v.waitingSince + WAITING_AFTER_MS;
  const want = progressText(running ? v.latest!.progress : null, waitingDue !== null && now >= waitingDue, agent);
  let view = v;
  let next: number | null = null;
  if (want !== v.text) {
    const allowedAt = v.text === null || !running ? now : v.shownAt + PROGRESS_MIN_MS;
    if (now >= allowedAt) view = { ...v, text: want, shownAt: now };
    else next = allowedAt;
  }
  if (waitingDue !== null && now < waitingDue) next = next === null ? waitingDue : Math.min(next, waitingDue);
  return { view, next };
}
