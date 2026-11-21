// Row indicators and the timing of row animations (PRD LIVE-11..18, LIVE-22). Pure functions, so they can be unit
// tested without React or timers. Times are on the visible clock (visibleClock.ts), which stops while the tab is
// hidden, so an indicator never runs out while the developer is away.

/** Rows move, expand and collapse over this long (LIVE-11..16); the queue plays one change per step (LIVE-8). */
export const MOVE_MS = 700;
/** With reduced motion, rows change in place with this cross-fade instead (LIVE-22). */
export const REDUCED_MS = 150;
/** The indicator and highlight stay at full strength for this long after the change is applied (LIVE-18). */
export const HOLD_MS = 10_000;
/** Then they fade out over this long (LIVE-18). */
export const FADE_MS = 2500;
/** How long an indicator is kept after its change is applied: the hold, then the fade. */
export const INDICATOR_MS = HOLD_MS + FADE_MS;

/**
 * A row indicator: "↑5", "↓3" or "New" (LIVE-18). `seq` is new for every change, so a row that changes again
 * restarts its hold; `at` is when the change was applied, on the visible clock, so a row that comes into view
 * part-way through (the developer changed page, search or filter) picks up where it would be.
 */
export type Indicator = { text: string; seq: number; at: number };
export type Indicators = Record<string, Indicator>;

/** Adds the indicators of one applied step. `seq` is the last sequence number used; returns the next state and
 *  the new last sequence number. A row's new indicator replaces its old one. */
export function addIndicators(prev: Indicators, texts: Record<string, string>, seq: number, now: number) {
  const next = { ...prev };
  for (const [key, text] of Object.entries(texts)) next[key] = { text, seq: ++seq, at: now };
  return { next, seq };
}

/** Removes the indicators that have finished fading. Returns `prev` itself when none have. */
export function expireIndicators(prev: Indicators, now: number): Indicators {
  const done = Object.keys(prev).filter((k) => now - prev[k].at >= INDICATOR_MS);
  if (!done.length) return prev;
  const next = { ...prev };
  for (const k of done) delete next[k];
  return next;
}

/** When the fade of `ind` starts, relative to `now`. Negative once the fade has begun, which the Web Animations
 *  API takes as "start part-way through". */
export function fadeDelay(ind: Indicator, now: number): number {
  return HOLD_MS - (now - ind.at);
}
