// Minimal history-API router for the routes in PRD NAV-3.
import { useEffect, useState, type AnchorHTMLAttributes } from "react";

let guard: (() => boolean) | null = null;
let current = location.pathname + location.search + location.hash;

/**
 * While set, leaving the page asks first (SET-26): `check` returns true to
 * allow the navigation. Covers links, navigate() and the Back button.
 */
export function setNavigationGuard(check: (() => boolean) | null) { guard = check; }

window.addEventListener("popstate", (e) => {
  if ((e as any).gitilizer) return;
  const next = location.pathname + location.search + location.hash;
  if (guard && next.split("#")[0] !== current.split("#")[0] && !guard()) {
    history.pushState(null, "", current); // stay
    e.stopImmediatePropagation();
    return;
  }
  current = next;
});

export function navigate(to: string, replace = false) {
  if (guard && to.split("#")[0] !== location.pathname + location.search && !guard()) return;
  if (replace) history.replaceState(null, "", to); else history.pushState(null, "", to);
  current = location.pathname + location.search + location.hash;
  const ev = new PopStateEvent("popstate");
  (ev as any).gitilizer = true;
  window.dispatchEvent(ev);
  const hash = to.split("#")[1];
  if (hash) setTimeout(() => focusTarget(hash), 50);
}

/**
 * Scrolls to the Settings control (or section) with this id and puts keyboard
 * focus on it (NOTIF-9, LIST-14). Returns false if it isn't on the page yet.
 */
export function focusTarget(id: string): boolean {
  const el = document.getElementById(decodeURIComponent(id));
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const focusable = el.matches("input, textarea, button, select, a, [tabindex]") ? el : el.querySelector<HTMLElement>("input, textarea, button, select, a, [tabindex]");
  (focusable ?? el).focus({ preventScroll: true });
  return true;
}

export function useRoute() {
  const [loc, setLoc] = useState({ path: location.pathname, search: location.search, hash: location.hash });
  useEffect(() => {
    const on = () => setLoc({ path: location.pathname, search: location.search, hash: location.hash });
    window.addEventListener("popstate", on);
    return () => window.removeEventListener("popstate", on);
  }, []);
  return { path: loc.path, query: new URLSearchParams(loc.search), hash: loc.hash };
}

export function Link({ to, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={to} {...rest} onClick={(e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      rest.onClick?.(e);
      navigate(to);
    }} />
  );
}
