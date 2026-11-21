// A clock that stops while the tab is hidden, for row indicators (LIVE-18): their hold and fade only count time the
// developer could have seen the list.
let hiddenTotal = 0;
let hiddenSince: number | null = null;

if (typeof document !== "undefined") {
  if (document.hidden) hiddenSince = Date.now();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hiddenSince ??= Date.now();
    else if (hiddenSince !== null) { hiddenTotal += Date.now() - hiddenSince; hiddenSince = null; }
  });
}

/** Milliseconds, like `Date.now()`, less the time the tab has been hidden. */
export function visibleNow(): number {
  const now = Date.now();
  return now - hiddenTotal - (hiddenSince === null ? 0 : now - hiddenSince);
}
