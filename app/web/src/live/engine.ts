// Pure state machine for live updates (design: Live updates; PRD LIVE-1..22).
// `latest` is the server's state; `shown` is what is on screen. Server events
// queue changes; the controller (useLive.ts) applies them when holding rules allow.
import {
  compareByPriority, type ItemRow, type ListEvent, type RemovalReason, type Sort,
} from "@gitilizer/shared";

export const PAGE_SIZE = 25;
export const BATCH_THRESHOLD = 5; // LIVE-9: more than 5 waiting play together

export type Row = ItemRow & { leaving?: string };
/** `bulk`: part of a bulk re-rank, applied in one step without indicators (LIVE-24). */
export type Change = { key: string; row: ItemRow | null; reason?: RemovalReason; bulk?: boolean };
export type Live = { shown: Record<string, Row>; latest: Record<string, ItemRow>; queue: Change[]; version: number };
export type View = "prioritized" | "icebox";

export const LEAVE_LABEL: Record<RemovalReason, string> = {
  closed: "Closed",
  merged: "Merged",
  iceboxed: "Moved to Icebox",
  restored: "Restored",
  no_longer_matches: "No longer yours",
  excluded: "Excluded", // SET-37
  over_limit: "", // LIVE-26: no label
};

/** An Icebox item the Icebox check sent back to the list (ICE-6, ICE-9). */
export const RETURNED_LABEL = "Back in your list";

export function init(items: ItemRow[], version: number): Live {
  const m: Record<string, ItemRow> = {};
  for (const i of items) m[i.key] = i;
  return { shown: { ...m }, latest: m, queue: [], version };
}

/** Takes a server event: updates `latest` and queues the changes, newest change per item wins. */
export function receive(s: Live, e: ListEvent): Live {
  if (e.version <= s.version) return s;
  const latest = { ...s.latest };
  const queue = [...s.queue];
  const put = (c: Change) => {
    const i = queue.findIndex((q) => q.key === c.key);
    if (i >= 0) queue[i] = c; else queue.push(c);
  };
  for (const r of e.upserts) {
    // Nothing new (e.g. the server echoing the developer's own action, which own() already applied).
    const known = s.latest[r.key];
    latest[r.key] = r;
    if (known && JSON.stringify(known) === JSON.stringify(r)) continue;
    put({ key: r.key, row: r, bulk: e.bulk || undefined });
  }
  for (const r of e.removals) { delete latest[r.key]; put({ key: r.key, row: null, reason: r.reason, bulk: e.bulk || undefined }); }
  return { ...s, latest, queue: queue.filter((c) => !sameAsShown(s, c)), version: e.version };
}

function sameAsShown(s: Live, c: Change): boolean {
  const cur = s.shown[c.key];
  if (!c.row) return !cur;
  return Boolean(cur) && !cur.leaving && JSON.stringify({ ...cur, leaving: undefined }) === JSON.stringify({ ...c.row, leaving: undefined });
}

/** The developer's own action applies at once and is never held (LIVE-7). */
export function own(s: Live, key: string, row: ItemRow | null, leaveLabel?: string): Live {
  const latest = { ...s.latest };
  const shown = { ...s.shown };
  if (row) latest[key] = row; else delete latest[key];
  if (leaveLabel && shown[key]) shown[key] = { ...shown[key], leaving: leaveLabel };
  else if (row) shown[key] = row;
  else delete shown[key];
  return { ...s, latest, shown, queue: s.queue.filter((c) => c.key !== key) };
}

/**
 * Rows in a view, before sorting: active items that have been ranked, or that
 * are shown with "–" (failed, or waiting for quota; LIST-30), or iceboxed
 * items. Leaving rows stay until they collapse.
 */
export function rowsFor(shown: Record<string, Row>, view: View): Row[] {
  const out: Row[] = [];
  for (const r of Object.values(shown)) {
    if (view === "prioritized" && r.status === "active" && (r.score !== null || r.rankFailed || r.waitingForQuota)) out.push(r);
    else if (view === "icebox" && r.status === "iceboxed") out.push(r);
    else if (r.leaving && ((view === "prioritized" && r.status === "active") || (view === "icebox" && r.status === "iceboxed"))) out.push(r);
  }
  return out;
}

/** Rank = position by priority among active, ranked items (RANK-3), independent of the table's sort. */
export function ranks(shown: Record<string, Row>): Record<string, number> {
  // Items shown with "–" have no rank (LIST-30).
  const rows = rowsFor(shown, "prioritized").filter((r) => !r.leaving && r.score !== null && !r.rankFailed).sort(compareByPriority);
  const out: Record<string, number> = {};
  rows.forEach((r, i) => { out[r.key] = i + 1; });
  return out;
}

const byNumber = (a: Row, b: Row) => a.number - b.number || (a.repo < b.repo ? -1 : 1);

export function sortRows(rows: Row[], sort: Sort): Row[] {
  const dir = sort.dir === "asc" ? 1 : -1;
  const cmp: (a: Row, b: Row) => number = {
    // A leaving row keeps its score, so it stays in place until it collapses.
    priority: (a: Row, b: Row) => compareByPriority(a, b) * dir,
    // LIST-7: "Issue" sorts by type; ascending puts PRs first. LIST-8: ties by number.
    type: (a: Row, b: Row) => (a.kind === b.kind ? 0 : a.kind === "pr" ? -1 : 1) * dir || byNumber(a, b),
    repo: (a: Row, b: Row) => (a.repo.toLowerCase() < b.repo.toLowerCase() ? -1 : a.repo.toLowerCase() > b.repo.toLowerCase() ? 1 : 0) * dir || byNumber(a, b),
    modified: (a: Row, b: Row) => (a.updatedAt < b.updatedAt ? -1 : a.updatedAt > b.updatedAt ? 1 : 0) * dir || byNumber(a, b),
  }[sort.column];
  return [...rows].sort(cmp);
}

export function pageCount(n: number): number {
  return Math.max(1, Math.ceil(n / PAGE_SIZE));
}

/** LIVE-2: stay on the page unless it no longer exists. */
export function clampPage(page: number, n: number): number {
  return Math.min(Math.max(1, page), pageCount(n));
}

/** LIVE-8, LIVE-9; a bulk re-rank always plays as one step with whatever else is waiting (LIVE-24). */
export function nextBatch(s: Live): Change[] {
  return s.queue.length > BATCH_THRESHOLD || s.queue.some((c) => c.bulk) ? s.queue : s.queue.slice(0, 1);
}

export type Applied = {
  state: Live;
  /** Row indicators to show for 3 s (LIVE-18): "↑5", "↓3" or "New". */
  indicators: Record<string, string>;
  /** Keys that started their leave label; finalize() removes them after the label has shown. */
  leaving: string[];
  /** Number of items whose rank changed or that arrived, for one screen-reader announcement (LIVE-21). */
  changed: number;
};

export function apply(s: Live, batch: Change[]): Applied {
  const before = ranks(s.shown);
  const shown = { ...s.shown };
  const leaving: string[] = [];
  for (const c of batch) {
    const cur = shown[c.key];
    if (!c.row) {
      if (!cur) continue;
      const label = LEAVE_LABEL[c.reason ?? "no_longer_matches"];
      // LIVE-26: an item pushed past the 1,000-item limit goes without a label.
      if (!label) { delete shown[c.key]; continue; }
      shown[c.key] = { ...cur, leaving: label };
      leaving.push(c.key);
      continue;
    }
    if (cur?.leaving) continue; // finalize() will pick up the latest row when the leave label ends
    if (cur && cur.status === "iceboxed" && c.row.status === "active") {
      // The Icebox check sent it back: it leaves the Icebox with the leave animation (ICE-9).
      shown[c.key] = { ...cur, leaving: RETURNED_LABEL };
      leaving.push(c.key);
      continue;
    }
    shown[c.key] = c.row;
  }
  const after = ranks(shown);
  const indicators: Record<string, string> = {};
  let changed = 0;
  for (const c of batch) {
    if (!c.row || c.bulk) continue; // no indicators for bulk re-ranks (LIVE-24)
    const a = after[c.key];
    const b = before[c.key];
    if (a === undefined) continue;
    if (b === undefined) { indicators[c.key] = "New"; changed++; }
    else if (a < b) { indicators[c.key] = `↑${b - a}`; changed++; }
    else if (a > b) { indicators[c.key] = `↓${a - b}`; changed++; }
  }
  const keys = new Set(batch.map((c) => c.key));
  return { state: { ...s, shown, queue: s.queue.filter((c) => !keys.has(c.key)) }, indicators, leaving, changed: changed + leaving.length };
}

export function finalize(s: Live, keys: string[]): Live {
  const shown = { ...s.shown };
  for (const k of keys) {
    const r = shown[k];
    if (!r?.leaving) continue;
    const latest = s.latest[k];
    if (latest) shown[k] = latest; else delete shown[k];
  }
  return { ...s, shown };
}
