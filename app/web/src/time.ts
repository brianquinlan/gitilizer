import { useEffect, useState } from "react";

/** Short relative times, as in Figma (PRD Q-24, assumed thresholds). */
export function relativeTime(iso: string | null | undefined, now = Date.now()): string {
  if (!iso) return "";
  const s = Math.max(0, (now - Date.parse(iso)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 30 * 86400) return `${Math.floor(s / 86400)}d ago`;
  const date = new Date(iso);
  if (date.getFullYear() >= new Date(now).getFullYear()) {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }
  // Whole years elapsed; an earlier calendar year less than a year ago is "last year".
  const years = Math.floor(s / (365.25 * 86400));
  return years >= 1 ? `${years}y ago` : "last year";
}

/** Exact date and time, shown when hovering over a relative time (LIST-22, issue #7). */
export function fullDate(iso: string | null | undefined): string | undefined {
  if (!iso) return undefined;
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

/** Re-renders the caller every `ms` milliseconds. */
export function useNow(ms: number): number {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), ms); return () => clearInterval(t); }, [ms]);
  return now;
}
