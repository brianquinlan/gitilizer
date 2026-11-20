// Row indicators and the timing of row animations (PRD LIVE-11..18, LIVE-22). Pure functions, so they can be unit
// tested without React or timers.

/** Rows move, expand and collapse over this long (LIVE-11..16); the queue plays one change per step (LIVE-8). */
export const MOVE_MS = 700;
/** With reduced motion, rows change in place with this cross-fade instead (LIVE-22). */
export const REDUCED_MS = 150;
/** Once the row is in place, the indicator and highlight fade out over this long (LIVE-18). */
export const FADE_MS = 2500;
/** How long an indicator is kept after its change is applied: the move, then the fade. */
export const INDICATOR_MS = MOVE_MS + FADE_MS;

/**
 * A row indicator: "↑5", "↓3" or "New" (LIVE-18). `seq` is new for every change, so a row that changes again
 * restarts its fade; `at` is when the change was applied, so a row that comes into view part-way through its fade
 * (the developer changed page, search or filter) picks it up where it would be rather than starting again.
 */
export type Indicator = { text: string; seq: number; at: number };
export type Indicators = Record<string, Indicator>;

/** Adds the indicators of one applied step. `seq` is the last sequence number used; returns the next state, the
 *  indicators added (to pass to `clearIndicators` after `INDICATOR_MS`) and the new last sequence number. */
export function addIndicators(prev: Indicators, texts: Record<string, string>, seq: number, now: number) {
  const added: Indicators = {};
  for (const [key, text] of Object.entries(texts)) added[key] = { text, seq: ++seq, at: now };
  return { next: { ...prev, ...added }, added, seq };
}

/** Removes the given indicators, except those a later change to the same row has replaced. */
export function clearIndicators(prev: Indicators, added: Indicators): Indicators {
  const next = { ...prev };
  for (const [key, ind] of Object.entries(added)) if (next[key]?.seq === ind.seq) delete next[key];
  return next;
}

/** When the fade of `ind` starts, relative to `now`: after the move, or the reduced-motion cross-fade (LIVE-22).
 *  Negative once the fade has begun, which the Web Animations API takes as "start part-way through". */
export function fadeDelay(ind: Indicator, now: number, reduced: boolean): number {
  return (reduced ? REDUCED_MS : MOVE_MS) - (now - ind.at);
}
