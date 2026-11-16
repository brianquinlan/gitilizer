// Search and the type filter above the list (PRD LIST-34 to LIST-41). The URL
// holds both, so this module turns a query string into a filter and back.
import type { ItemRow } from "@gitilizer/shared";

export type TypeFilter = "all" | "pr" | "issue";
/** `q` is the search text without the spaces at its ends (LIST-40). */
export type Filter = { q: string; type: TypeFilter };

export const NO_FILTER: Filter = { q: "", type: "all" };

/** Reads `q` and `type` from the URL; anything else in `type` means "All" (LIST-40). */
export function parseFilter(query: URLSearchParams): Filter {
  const type = query.get("type");
  return { q: (query.get("q") ?? "").trim(), type: type === "pr" || type === "issue" ? type : "all" };
}

/** The words of a search. A field that holds only spaces has none, so no search is in use (LIST-35). */
export function words(q: string): string[] {
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

/** Whether a search or a type filter is in use (LIST-38). */
export function isFiltering(f: Filter): boolean {
  return f.type !== "all" || words(f.q).length > 0;
}

/**
 * LIST-35, LIST-36: every word typed is somewhere in the title, the repository
 * or the number, with or without "#"; and the item is of the chosen type.
 * The inclusion reason and the agent's reasoning aren't searched.
 */
export function matches(row: Pick<ItemRow, "title" | "repo" | "number" | "kind">, f: Filter): boolean {
  if (f.type !== "all" && row.kind !== f.type) return false;
  const ws = words(f.q);
  if (!ws.length) return true;
  const hay = `${row.title}\n${row.repo}\n#${row.number}`.toLowerCase();
  return ws.every((w) => hay.includes(w));
}

/**
 * The list's URL for a filter and a page: `/?type=pr&q=api&page=2`. `type` is
 * left out for "All", `q` when no search is in use and `page` on page 1
 * (LIST-40, NAV-3).
 */
export function listUrl(path: string, f: Filter, page = 1): string {
  const p = new URLSearchParams();
  if (f.type !== "all") p.set("type", f.type);
  if (words(f.q).length) p.set("q", f.q.trim());
  if (page > 1) p.set("page", String(page));
  const s = p.toString();
  return s ? `${path}?${s}` : path;
}

/** LIST-27, LIST-38: "{N} issues and PRs", or "{n} of {N} issues and PRs" while a search or filter is in use. */
export function countText(matching: number, total: number, filtering: boolean): string {
  const noun = total === 1 ? "issue or PR" : "issues and PRs";
  const n = (v: number) => v.toLocaleString("en-US");
  return filtering ? `${n(matching)} of ${n(total)} ${noun}` : `${n(total)} ${noun}`;
}
