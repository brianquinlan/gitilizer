// When live updates wait (PRD LIVE-4, LIVE-5, LIVE-27, LIVE-28): the rule as a pure function, and the activity
// in the table that keeps the pointer and keyboard focus holding updates.

/** Updates wait until the pointer has been outside the table this long (LIVE-4), and after the popup closes (LIVE-27). */
export const HOLD_AFTER_MS = 1000;
/** The pointer and focus hold updates for at most this long after the developer last did something in the table (LIVE-28). */
export const IDLE_MS = 30_000;

export type Holds = {
  pointerInside: boolean;
  /** When the pointer last left the table. */
  pointerLeftAt: number;
  popupOpen: boolean;
  popupClosedAt: number;
  /** When the developer last did something in the table (`trackActivity`). */
  lastActivity: number;
};

export function initHolds(): Holds {
  return { pointerInside: false, pointerLeftAt: -Infinity, popupOpen: false, popupClosedAt: -Infinity, lastActivity: -Infinity };
}

/**
 * Whether the Prioritized list's updates wait at time `now`. `focusInside`: keyboard focus is in the table.
 * - The rank reasoning popup holds them while it is open and for 1 s after, however long it is open (LIVE-27).
 * - The pointer holds them while it is over the table and for 1 s after it leaves (LIVE-4), and focus while it is in
 *   the table (LIVE-5), but neither for more than 30 s after the developer last did something there (LIVE-28).
 */
export function held(h: Holds, focusInside: boolean, now: number): boolean {
  if (h.popupOpen || now - h.popupClosedAt < HOLD_AFTER_MS) return true;
  const pointer = h.pointerInside || now - h.pointerLeftAt < HOLD_AFTER_MS;
  if (!pointer && !focusInside) return false;
  return now - h.lastActivity < IDLE_MS;
}

/** True from when a step of updates is applied until React has drawn it (`setApplying`). */
let applying = false;

/**
 * Brackets a step of updates. Moving a row's element takes keyboard focus off it, and React puts focus back as it
 * draws the step (LIVE-29); that isn't the developer doing something, or every step would hold the next for 30 s.
 */
export function setApplying(on: boolean) { applying = on; }

/**
 * Calls `onActivity` whenever the developer does something in `table` (LIVE-28): moves the pointer over it, presses a
 * mouse button or a key in it, scrolls with the pointer over it, or moves focus into it or within it. Returns a
 * function that stops listening. Three things that look like activity aren't:
 * - a pointer event at the same screen position as the last, which browsers send when the content under a still
 *   pointer moves (rows sliding, for example);
 * - the browser putting focus back where it was when the developer returns to the tab or window: after clicking a
 *   title and coming back from GitHub, the list must catch up, not wait another 30 s;
 * - focus put back on a moved row while a step is drawn (`setApplying`).
 */
export function trackActivity(table: HTMLElement, onActivity: () => void): () => void {
  let lastX: number | null = null;
  let lastY: number | null = null;
  /** The element that had focus when the developer left the tab or window; focus returning to it isn't activity. */
  let restoring: Element | null = null;

  const move = (e: Event) => {
    const p = e as MouseEvent;
    if (p.screenX === lastX && p.screenY === lastY) return;
    lastX = p.screenX;
    lastY = p.screenY;
    onActivity();
  };
  const act = () => { restoring = null; onActivity(); };
  const focusIn = (e: Event) => {
    if (applying) return;
    if (restoring && e.target === restoring) { restoring = null; return; }
    restoring = null;
    onActivity();
  };
  const away = () => { restoring = document.activeElement; };
  const onVisibility = () => { if (document.hidden) away(); };

  table.addEventListener("pointermove", move);
  table.addEventListener("pointerdown", act);
  table.addEventListener("keydown", act);
  table.addEventListener("wheel", act, { passive: true });
  table.addEventListener("focusin", focusIn);
  window.addEventListener("blur", away);
  document.addEventListener("visibilitychange", onVisibility);
  return () => {
    table.removeEventListener("pointermove", move);
    table.removeEventListener("pointerdown", act);
    table.removeEventListener("keydown", act);
    table.removeEventListener("wheel", act);
    table.removeEventListener("focusin", focusIn);
    window.removeEventListener("blur", away);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}
