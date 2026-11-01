// Minimal history-API router for the routes in PRD Q-6 (assumed).
import { useEffect, useState, type AnchorHTMLAttributes } from "react";

export function navigate(to: string, replace = false) {
  if (replace) history.replaceState(null, "", to); else history.pushState(null, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  const hash = to.split("#")[1];
  if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 50);
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
