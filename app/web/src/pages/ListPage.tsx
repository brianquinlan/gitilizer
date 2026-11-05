// Prioritized list and Icebox (PRD "Prioritized list", "Live updates", "Icebox").
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_SORT_ICEBOX, DEFAULT_SORT_PRIORITIZED, FIRST_DIRECTION, reasonLabel, type Sort, type SortColumn, type SyncEvent,
} from "@gitilizer/shared";
import { api, ApiError } from "../api.ts";
import { BoxIcon, ChevronLeft, ChevronRight, DownToLineIcon, InfoIcon, IssueIcon, PrIcon, RefreshIcon, SortIcon, XIcon } from "../icons.tsx";
import { clampPage, PAGE_SIZE, pageCount, ranks, rowsFor, sortRows, type Row, type View } from "../live/engine.ts";
import { useLive } from "../live/useLive.ts";
import { useSyncProgress } from "../live/useSyncProgress.ts";
import { Link, navigate, useRoute } from "../router.tsx";
import { useStore } from "../store.tsx";
import { fullDate, relativeTime, useNow } from "../time.ts";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ListPage({ view }: { view: View }) {
  const { me, sorts, setSort, sync } = useStore();
  const { live, indicators, collapsing, announcement, step, tableProps, holdForPopup, moveToIcebox, restore } = useLive(view);
  const { query } = useRoute();
  const sort = (view === "prioritized" ? sorts?.prioritized : sorts?.icebox) ?? (view === "prioritized" ? DEFAULT_SORT_PRIORITIZED : DEFAULT_SORT_ICEBOX);
  useNow(60_000); // LIST-5: relative times update every minute

  const rank = useMemo(() => (live ? ranks(live.shown) : {}), [live]);
  const all = useMemo(() => (live ? sortRows(rowsFor(live.shown, view), sort) : []), [live, view, sort]);
  const settled = all.filter((r) => !r.leaving).length;
  const requested = Number(query.get("page") ?? "1") || 1;
  const page = clampPage(requested, settled);

  // LIVE-2: if the page no longer exists, go to the last page that does, without a notice.
  useEffect(() => {
    if (live && requested !== page) navigate(page === 1 ? location.pathname : `${location.pathname}?page=${page}`, true);
  }, [live, requested, page]);

  // Page boundaries count settled rows; a row showing its leave label stays where it was (LIVE-15).
  const start = (page - 1) * PAGE_SIZE;
  const visible: Row[] = [];
  let i = 0;
  for (const r of all) {
    if (i >= start && i < start + PAGE_SIZE) visible.push(r);
    if (!r.leaving) i++;
  }

  const chooseSort = (column: SortColumn) => {
    const dir = sort.column === column ? (sort.dir === "asc" ? "desc" : "asc") : FIRST_DIRECTION[column];
    setSort(view, { column, dir });
    navigate(location.pathname); // LIST-26: sorting returns to page 1
  };

  const firstSyncRunning = view === "prioritized" && !me?.firstSyncDone;

  return (
    <>
      <div className="controls">
        <h1>All issues and PRs</h1>
        <span className="hint">{view === "prioritized" ? "One relative order. No priority buckets." : "Issues and PRs you placed in the Icebox."}</span>
        <nav className="toggle" aria-label="View">
          <Link to="/" aria-current={view === "prioritized" ? "page" : undefined}><DownToLineIcon /> Prioritized</Link>
          <Link to="/icebox" aria-current={view === "icebox" ? "page" : undefined}><BoxIcon /> Icebox</Link>
        </nav>
        <span className="spacer" />
        <SyncButton sync={sync} />
      </div>

      <div className={`table ${view === "icebox" ? "icebox" : ""} ${reducedMotion() ? "reduced" : ""}`} role="table" aria-label={view === "prioritized" ? "Prioritized issues" : "Icebox"}>
        <div className="tr thead" role="row">
          {view === "prioritized" && <SortHeader label="Priority" column="priority" sort={sort} onSort={chooseSort} />}
          <SortHeader label="Issue" column="type" sort={sort} onSort={chooseSort} />
          <SortHeader label="Repository" column="repo" sort={sort} onSort={chooseSort} />
          <SortHeader label="Modified" column="modified" sort={sort} onSort={chooseSort} />
          <span role="columnheader" style={{ textAlign: "right", paddingRight: 46 }}>Actions</span>
        </div>
        <div {...tableProps} role="rowgroup">
          {!live ? (firstSyncRunning ? <FirstSync /> : <Skeleton view={view} />) :
            visible.length === 0 && firstSyncRunning ? <FirstSync /> :
            visible.length === 0 ? <Empty view={view} /> :
            <Rows rows={visible} rank={rank} view={view} indicators={indicators} collapsing={collapsing} step={step}
                  onIcebox={moveToIcebox} onRestore={restore} onPopup={holdForPopup} />}
        </div>
        <Pager page={page} total={live ? settled : null} />
      </div>
      <div className="sr-only" aria-live="polite">{announcement}</div>
    </>
  );
}

function SortHeader({ label, column, sort, onSort }: { label: string; column: SortColumn; sort: Sort; onSort: (c: SortColumn) => void }) {
  const active = sort.column === column;
  return (
    <span role="columnheader">
      <button className="th" aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : undefined} onClick={() => onSort(column)}>
        {label} <SortIcon dir={active ? sort.dir : null} />
      </button>
    </span>
  );
}

function Rows(props: {
  rows: Row[]; rank: Record<string, number>; view: View; indicators: Record<string, string>; collapsing: Set<string>; step: number;
  onIcebox: (r: Row) => void; onRestore: (r: Row) => void; onPopup: (open: boolean) => void;
}) {
  const { rows, rank, view, indicators, collapsing, step, onPopup } = props;
  const els = useRef(new Map<string, HTMLDivElement>());
  const tops = useRef(new Map<string, number>());
  const lastStep = useRef(step);
  // POC: the rank reasoning popup (Figma "Issue inbox · Rank reasoning"). Opens on click; closes on ×, Escape or a click elsewhere.
  const [why, setWhy] = useState<string | null>(null);
  const rankBtns = useRef(new Map<string, HTMLButtonElement>());
  // × and Escape return focus to the row's rank button, as for the notification popover (LIST-24, NFR-2, NOTIF-20).
  // A click elsewhere leaves focus where that click puts it.
  const closeWhy = () => {
    if (why) rankBtns.current.get(why)?.focus();
    setWhy(null);
  };
  useEffect(() => {
    if (!why) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      rankBtns.current.get(why)?.focus();
      setWhy(null);
    };
    const onDown = (e: MouseEvent) => { if (!(e.target as Element).closest?.(".rank-cell-open")) setWhy(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [why]);

  // Live updates hold while the popup is showing, so rows don't shift mid-read (LIVE-27).
  // If its row is no longer on screen (paged away, left the list), the popup is closed rather than left holding.
  const whyShown = why !== null && rows.some((r) => r.key === why && r.reasoning && !r.leaving && rank[r.key] !== undefined);
  useEffect(() => { if (why !== null && !whyShown) setWhy(null); }, [why, whyShown]);
  useEffect(() => { onPopup(whyShown); }, [whyShown, onPopup]);
  useEffect(() => () => onPopup(false), [onPopup]);

  // FLIP: rows that moved slide to their new place; rows that arrived expand (LIVE-11, LIVE-14, LIVE-16).
  useLayoutEffect(() => {
    const animate = step !== lastStep.current;
    lastStep.current = step;
    const reduced = reducedMotion();
    for (const [key, el] of els.current) {
      const top = el.offsetTop;
      const prev = tops.current.get(key);
      if (animate) {
        if (reduced) el.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 150 }); // LIVE-22
        else if (prev === undefined) el.animate([{ opacity: 0, transform: "scaleY(.6)" }, { opacity: 1, transform: "none" }], { duration: 400, easing: "ease-out" });
        else if (prev !== top) el.animate([{ transform: `translateY(${prev - top}px)` }, { transform: "none" }], { duration: 400, easing: "ease-in-out" });
      }
    }
    tops.current = new Map([...els.current].map(([k, el]) => [k, el.offsetTop]));
  });

  return (
    <>
      {rows.map((r) => {
        const n = rank[r.key];
        return (
          <div key={r.key} role="row"
               ref={(el) => { if (el) els.current.set(r.key, el); else els.current.delete(r.key); }}
               className={`tr ${indicators[r.key] ? "highlight" : ""} ${r.leaving ? "leaving" : ""} ${collapsing.has(r.key) ? "collapse" : ""} ${n === 1 && view === "prioritized" ? "top" : ""}`}>
            {view === "prioritized" && (
              <span role="cell" className={`rank ${why === r.key ? "rank-cell-open" : ""}`}>
                {/* Ranks are never zero-padded; unranked items show "–" (Columns, LIST-30). */}
                {r.leaving ? "" : n === undefined ? "–" : r.reasoning
                  ? <button type="button" className="rank-btn" aria-expanded={why === r.key} aria-label={`Why rank ${n}?`}
                            ref={(el) => { if (el) rankBtns.current.set(r.key, el); else rankBtns.current.delete(r.key); }}
                            onClick={() => setWhy(why === r.key ? null : r.key)}>{n}</button>
                  : n}
                {indicators[r.key] && <span className="indicator">{indicators[r.key]}</span>}
                {why === r.key && r.reasoning && !r.leaving && (
                  <div className="rank-why" role="dialog" aria-label={`Why rank ${n}?`}>
                    <div className="rank-why-body">
                      <div className="rank-why-head">
                        <span className="rank-why-title"><InfoIcon /> Why rank #{n}?</span>
                        <button type="button" className="rank-why-close" aria-label="Close" onClick={closeWhy}><XIcon size={14} /></button>
                      </div>
                      <p>{r.reasoning}</p>
                    </div>
                    <div className="rank-why-foot">{r.repo} · {r.kind === "pr" ? "PR" : "Issue"} #{r.number}</div>
                  </div>
                )}
              </span>
            )}
            <span role="cell" className="issue">
              <span className={`kind ${r.kind}`} aria-label={r.kind === "pr" ? "PR" : "Issue"}>{r.kind === "pr" ? <PrIcon /> : <IssueIcon />}</span>
              <span className="issue-text">
                <a className="issue-title" href={r.htmlUrl} target="_blank" rel="noreferrer" title={r.title}>{r.title}</a>
                <span className="issue-meta">
                  <span className="num">{r.kind === "pr" ? "PR" : "Issue"} #{r.number}</span>
                  <span className="dot" />
                  {view === "icebox"
                    ? <span>Moved to Icebox by you · <span title={fullDate(r.iceboxedAt)}>{relativeTime(r.iceboxedAt)}</span></span>
                    : <span>{reasonLabel(r)}</span>}
                </span>
              </span>
            </span>
            {/* LIST-23: a long repository name is cut off at the start; the mark keeps punctuation in place. */}
            <span role="cell" className="mono repo" title={r.repo}>{r.repo}{"\u200e"}</span>
            <span role="cell" className="mono" title={fullDate(r.updatedAt)}>{relativeTime(r.updatedAt)}</span>
            <span role="cell" className="td-actions">
              {r.leaving ? <span className="chip">{r.leaving}</span> : view === "prioritized"
                ? <button className="btn" onClick={() => props.onIcebox(r)}><BoxIcon /> Move to icebox</button>
                : <button className="btn" onClick={() => props.onRestore(r)} style={{ minWidth: 144, justifyContent: "center" }}><DownToLineIcon /> Restore</button>}
            </span>
          </div>
        );
      })}
    </>
  );
}

/**
 * Disabled while any sync runs, however it started, with the icon turning (LIST-17, LIST-28),
 * and how far the sync has got to its left (LIST-33).
 */
function SyncButton({ sync }: { sync: SyncEvent }) {
  const running = sync.running;
  const progress = useSyncProgress(sync);
  const [error, setError] = useState<string | null>(null);
  const start = async () => {
    setError(null);
    try { await api.post("/api/sync"); } catch (e) { setError(e instanceof ApiError ? e.message : "Couldn't start a sync"); }
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      {error && <span className="hint">{error}</span>}
      {/* Not a live region: it would be read out every 2 seconds. The button points at it instead. */}
      {progress && <span id="sync-progress" className="sync-progress">{progress}</span>}
      <button className={`btn sync ${running ? "syncing" : ""}`} onClick={start} disabled={running} aria-busy={running}
              aria-describedby={progress ? "sync-progress" : undefined}>
        <RefreshIcon className={running ? "spin" : ""} /> Sync now
      </button>
    </span>
  );
}

/** LIST-12: first, last, current ±1, with "…" for gaps. */
export function pageButtons(page: number, count: number): (number | "…")[] {
  const keep = new Set([1, count, page - 1, page, page + 1].filter((p) => p >= 1 && p <= count));
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const p of [...keep].sort((a, b) => a - b)) {
    if (p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

function Pager({ page, total }: { page: number; total: number | null }) {
  const count = pageCount(total ?? 0);
  const go = (p: number) => navigate(p === 1 ? location.pathname : `${location.pathname}?page=${p}`);
  return (
    <div className="pager">
      {/* LIST-27: "{N} issues and PRs" in every state; a placeholder while loading, as in Figma. */}
      {total === null ? <span className="count skeleton"><span className="bar" style={{ width: 82 }} /></span>
        : <span className="count">{total.toLocaleString("en-US")} {total === 1 ? "issue or PR" : "issues and PRs"}</span>}
      <button onClick={() => go(page - 1)} disabled={page <= 1}><ChevronLeft /> Previous</button>
      {pageButtons(page, count).map((p, i) => p === "…"
        ? <span key={`gap${i}`} className="hint">…</span>
        : <button key={p} className="page" aria-current={p === page ? "page" : undefined} onClick={() => go(p)}>{p}</button>)}
      <button onClick={() => go(page + 1)} disabled={page >= count}>Next <ChevronRight /></button>
    </div>
  );
}

function Empty({ view }: { view: View }) {
  return view === "prioritized" ? (
    <div className="empty">
      <strong>No issues or PRs to show 🎉</strong>
      {/* LIST-14: "settings" opens Additional repositories with focus on "Add repository". */}
      <p>You can choose more repositories in the <Link to="/settings#add-repository">settings</Link>.</p>
    </div>
  ) : (
    <div className="empty"><strong>No issues or PRs in the Icebox</strong></div>
  );
}

/** First-sync state (LIST-15, Figma "Issue inbox · Loading"): three pulsing skeleton rows and a message. */
function FirstSync() {
  return (
    <>
      <Skeleton view="prioritized" />
      <div className="scanning" role="status">Scanning your issues and PRs…</div>
    </>
  );
}

/**
 * Skeleton rows as in Figma "Shared / Skeleton rows"; they pulse unless reduced motion is on.
 * The Icebox has no Priority column (ICE-2), so its rows leave out the rank cell to match its 4-column grid.
 */
function Skeleton({ view }: { view: View }) {
  const widths = [[62, 30], [53, 27], [69, 33]];
  return (
    <>
      {widths.map(([title, meta], i) => (
        <div className="tr skeleton" key={i} aria-hidden="true">
          {view === "prioritized" && <span><span className="bar" style={{ width: 17 }} /></span>}
          <span className="sk-issue">
            <span className="bar dot" />
            <span className="sk-lines">
              <span className="bar" style={{ width: `${title}%`, height: 11 }} />
              <span className="bar" style={{ width: `${meta}%`, height: 7 }} />
            </span>
          </span>
          <span><span className="bar" style={{ width: [92, 105, 92][i] }} /></span>
          <span><span className="bar" style={{ width: 43 }} /></span>
          <span className="sk-action"><span className="bar block" /></span>
        </div>
      ))}
    </>
  );
}
