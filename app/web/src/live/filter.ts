// Search, the type filter and the next step filter above the list (PRD LIST-34
// to LIST-41, LIST-44, LIST-45). The URL holds them all, so this module turns a
// query string into a filter and back.
import type { ItemRow, NextStep } from "@gitilizer/shared";

/** The next steps in menu order, and the two groups (PRD LIST-42, LIST-44). */
export const ALL_STEPS: NextStep[] = ["review", "respond", "todo", "backlog", "waiting", "elsewhere", "not_yours"];
export const ON_YOU: NextStep[] = ["review", "respond", "todo", "backlog"];
export const NOT_ON_YOU: NextStep[] = ["waiting", "elsewhere", "not_yours"];

/** The chosen next steps in menu order, without repeats. */
export function normalizeSteps(steps: readonly NextStep[]): NextStep[] {
  return ALL_STEPS.filter((s) => steps.includes(s));
}

/** Whether a next step filter leaves anything out: some next steps chosen, but not all of them. */
export function filtersSteps(steps: readonly NextStep[] = []): boolean {
  return steps.length > 0 && steps.length < ALL_STEPS.length;
}

/** The `step` parameter: "on_you", "not_on_you", or next steps separated by commas. Unknown names are ignored. */
export function parseSteps(value: string | null): NextStep[] {
  if (!value) return [];
  const out: NextStep[] = [];
  for (const part of value.split(",")) {
    if (part === "on_you") out.push(...ON_YOU);
    else if (part === "not_on_you") out.push(...NOT_ON_YOU);
    else if ((ALL_STEPS as string[]).includes(part)) out.push(part as NextStep);
  }
  return normalizeSteps(out);
}

/** The `step` parameter for chosen next steps, or null for none. A whole group is written by its name. */
export function stepsParam(steps: readonly NextStep[] = []): string | null {
  const s = normalizeSteps(steps);
  if (!s.length) return null;
  const part = (group: NextStep[], name: string) => (group.every((x) => s.includes(x)) ? [name] : group.filter((x) => s.includes(x)));
  return [...part(ON_YOU, "on_you"), ...part(NOT_ON_YOU, "not_on_you")].join(",");
}

export type TypeFilter = "all" | "pr" | "issue";
/** `q` is the search text without the spaces at its ends (LIST-40). */
export type Filter = { q: string; type: TypeFilter; /** Chosen next steps; none means every item. */ steps?: NextStep[] };

export const NO_FILTER: Filter = { q: "", type: "all", steps: [] };

/** Reads `q`, `type` and `step` from the URL; anything else in `type` means "All" (LIST-40). */
export function parseFilter(query: URLSearchParams): Filter {
  const type = query.get("type");
  return { q: (query.get("q") ?? "").trim(), type: type === "pr" || type === "issue" ? type : "all", steps: parseSteps(query.get("step")) };
}

/** The words of a search. A field that holds only spaces has none, so no search is in use (LIST-35). */
export function words(q: string): string[] {
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

/** Whether a search, a type filter or a next step filter is in use (LIST-38). */
export function isFiltering(f: Filter): boolean {
  return f.type !== "all" || words(f.q).length > 0 || filtersSteps(f.steps);
}

/**
 * LIST-35, LIST-36: every word typed is somewhere in the title, the repository
 * or the number, with or without "#"; the item is of the chosen type; and,
 * LIST-45, its next step is one of those chosen.
 * The inclusion reason and the agent's reasoning aren't searched.
 */
export function matches(row: Pick<ItemRow, "title" | "repo" | "number" | "kind"> & { nextStep?: NextStep | null }, f: Filter): boolean {
  if (f.type !== "all" && row.kind !== f.type) return false;
  // An item without a next step yet (not ranked) matches no next step filter.
  if (filtersSteps(f.steps) && !(row.nextStep && f.steps!.includes(row.nextStep))) return false;
  const ws = words(f.q);
  if (!ws.length) return true;
  const hay = `${row.title}\n${row.repo}\n#${row.number}`.toLowerCase();
  return ws.every((w) => hay.includes(w));
}

/**
 * The list's URL for a filter and a page: `/?type=pr&step=on_you&q=api&page=2`.
 * `type` is left out for "All", `step` when no next step is chosen, `q` when no
 * search is in use and `page` on page 1
 * (LIST-40, NAV-3).
 */
export function listUrl(path: string, f: Filter, page = 1): string {
  const p = new URLSearchParams();
  if (f.type !== "all") p.set("type", f.type);
  const step = stepsParam(f.steps);
  if (step) p.set("step", step);
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
