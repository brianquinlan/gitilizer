// Prioritized list and Icebox (PRD "Prioritized list", "Live updates", "Icebox").
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  choiceName, DEFAULT_SORT_ICEBOX, NEXT_STEP_LABEL, DEFAULT_SORT_PRIORITIZED, FIRST_DIRECTION, nextStepLabel, reasonLabel, teamOnly,
  scanBlocker, type NextStep, type ScanBlocker, type Sort, type SortColumn, type SyncEvent,
} from "@gitilizer/shared";
import { api, ApiError } from "../api.ts";
import { BoxIcon, CheckIcon, ChevronDown, ChevronLeft, ChevronRight, DownToLineIcon, ExternalIcon, IssueIcon, PrIcon, RefreshIcon, SearchIcon, SortIcon, XIcon } from "../icons.tsx";
import { clampPage, PAGE_SIZE, pageCount, ranks, rowsFor, sortRows, type Row, type View } from "../live/engine.ts";
import { ALL_STEPS, countText, isFiltering, listUrl, matches, NO_FILTER, normalizeSteps, NOT_ON_YOU, ON_YOU, parseFilter, stepsParam, words, type Filter, type TypeFilter } from "../live/filter.ts";
import { fadeDelay, FADE_MS, MOVE_MS, REDUCED_MS, type Indicators } from "../live/indicators.ts";
import { visibleNow } from "../live/visibleClock.ts";
import { useLive } from "../live/useLive.ts";
import { useSyncProgress } from "../live/useSyncProgress.ts";
import { Link, navigate, useRoute } from "../router.tsx";
import { useShortcut, useShortcutsOn } from "../shortcuts.ts";
import { useStore } from "../store.tsx";
import { fullDate, relativeTime, useNow } from "../time.ts";

const SEARCH_ID = "list-search";
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ListPage({ view }: { view: View }) {
  const { me, sorts, setSort, sync, notifications } = useStore();
  const { live, indicators, collapsing, announcement, step, tableProps, holdForPopup, moveToIcebox, restore } = useLive(view);
  const { query } = useRoute();
  const sort = (view === "prioritized" ? sorts?.prioritized : sorts?.icebox) ?? (view === "prioritized" ? DEFAULT_SORT_PRIORITIZED : DEFAULT_SORT_ICEBOX);
  useNow(60_000); // LIST-5: relative times update every minute

  // LIST-40: the search and the type filter live in the URL, with the page.
  const queryString = query.toString();
  // ICE-8: the Icebox shows no next steps (ICE-3), so it ignores a next step filter in its URL.
  const filter = useMemo(() => {
    const f = parseFilter(new URLSearchParams(queryString));
    return view === "icebox" ? { ...f, steps: [] } : f;
  }, [queryString, view]);
  const filtering = isFiltering(filter);

  // LIST-37: ranks come from the whole list, so searching and filtering never change them.
  const rank = useMemo(() => (live ? ranks(live.shown) : {}), [live]);
  const all = useMemo(() => (live ? sortRows(rowsFor(live.shown, view), sort) : []), [live, view, sort]);
  const matching = useMemo(() => (filtering ? all.filter((r) => matches(r, filter)) : all), [all, filter, filtering]);
  const total = all.filter((r) => !r.leaving).length;
  // LIST-44: the next step menu counts the items the search and the type filter leave, whatever next steps are chosen.
  const stepCounts = useMemo(() => {
    const counts = Object.fromEntries(ALL_STEPS.map((s) => [s, 0])) as Record<NextStep, number>;
    const others = { q: filter.q, type: filter.type };
    for (const r of all) if (!r.leaving && r.nextStep && matches(r, others)) counts[r.nextStep]++;
    return counts;
  }, [all, filter.q, filter.type]);
  const settled = matching.filter((r) => !r.leaving).length;
  const requested = Number(query.get("page") ?? "1") || 1;
  const page = clampPage(requested, settled);
  const path = view === "prioritized" ? "/" : "/icebox";

  // LIVE-2: if the page no longer exists, go to the last page that does, without a notice.
  useEffect(() => {
    if (live && requested !== page) navigate(listUrl(path, filter, page), true);
  }, [live, requested, page, path, filter]);

  // Page boundaries count settled rows; a row showing its leave label stays where it was (LIVE-15).
  const start = (page - 1) * PAGE_SIZE;
  const visible: Row[] = [];
  let i = 0;
  for (const r of matching) {
    if (i >= start && i < start + PAGE_SIZE) visible.push(r);
    if (!r.leaving) i++;
  }

  const chooseSort = (column: SortColumn) => {
    const dir = sort.column === column ? (sort.dir === "asc" ? "desc" : "asc") : FIRST_DIRECTION[column];
    setSort(view, { column, dir });
    navigate(listUrl(path, filter)); // LIST-26: sorting returns to page 1; LIST-40: it keeps the search and filter
  };

  // LIST-39: "Clear filters" adds a history entry (LIST-40); its button goes with the state, so focus moves to the search field.
  const clearFilters = () => {
    navigate(listUrl(path, NO_FILTER));
    document.getElementById(SEARCH_ID)?.focus();
  };

  // LIST-40: choosing next steps, in the menu or with "Show only" in the popup (LIST-46), adds a history entry.
  const chooseSteps = (steps: NextStep[]) => navigate(listUrl(path, { ...filter, steps }));

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
        <SyncButton sync={sync} agent={me ? choiceName(me.rankingAgent) : "Gemini"} blocker={scanBlocker(notifications)} />
      </div>

      <div className={`table ${view === "icebox" ? "icebox" : ""} ${reducedMotion() ? "reduced" : ""}`}>
        {/* LIST-34: in every state of the table, and outside the row group, so it doesn't hold live updates (LIST-41). */}
        <Filters path={path} filter={filter} stepCounts={view === "prioritized" ? stepCounts : null} onSteps={chooseSteps} />
        {/* The table itself is the headings and the rows; the strip and the pager are controls beside it. */}
        <div role="table" aria-label={view === "prioritized" ? "Prioritized issues" : "Icebox"}>
          <div className="tr thead" role="row">
            {view === "prioritized" && <SortHeader label="Priority" column="priority" sort={sort} onSort={chooseSort} />}
            <SortHeader label="Issue" column="type" sort={sort} onSort={chooseSort} />
            <SortHeader label="Repository" column="repo" sort={sort} onSort={chooseSort} />
            <SortHeader label="Modified" column="modified" sort={sort} onSort={chooseSort} />
            <span role="columnheader" style={{ textAlign: "right", paddingRight: 46 }}>Actions</span>
          </div>
          <div {...tableProps} role="rowgroup">
            {/* LIST-39: the first-sync state comes first, then the empty state, then "No matching issues or PRs". */}
            {!live ? (firstSyncRunning ? <FirstSync /> : <Skeleton view={view} />) :
              visible.length === 0 && firstSyncRunning ? <FirstSync /> :
              visible.length === 0 && (all.length === 0 || !filtering) ? <Empty view={view} /> :
              visible.length === 0 ? <NoMatches onClear={clearFilters} /> :
              <Rows rows={visible} rank={rank} view={view} indicators={indicators} collapsing={collapsing} step={step}
                    onIcebox={moveToIcebox} onRestore={restore} onPopup={holdForPopup}
                    stepFilter={filter.steps ?? []}
                    onOnlyStep={(only) => { chooseSteps([only]); document.getElementById(STEP_MENU_ID)?.focus(); }} />}
          </div>
        </div>
        <Pager page={page} matching={live ? settled : null} total={total} filtering={filtering} href={(p) => listUrl(path, filter, p)} />
      </div>
      <div className="sr-only" aria-live="polite">{announcement}</div>
    </>
  );
}

const TYPES: [TypeFilter, string][] = [["all", "All"], ["pr", "PRs"], ["issue", "Issues"]];

/**
 * The strip above the column headings: search and the type filter (LIST-34 to
 * LIST-36). The URL is the source of truth (LIST-40); the field keeps what was
 * typed, spaces included, and follows the URL when that changes some other
 * way, such as Back or "Clear filters".
 */
function Filters({ path, filter, stepCounts, onSteps }: {
  path: string; filter: Filter;
  /** Counts for the next step menu (LIST-44), or null for no menu: the Icebox doesn't show next steps (ICE-3, ICE-8). */
  stepCounts: Record<NextStep, number> | null; onSteps: (steps: NextStep[]) => void;
}) {
  const shortcutsOn = useShortcutsOn();
  const input = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(filter.q);
  useEffect(() => { setText((t) => (t.trim() === filter.q ? t : filter.q)); }, [filter.q]);
  const empty = words(text).length === 0; // LIST-35: only spaces counts as empty

  // Typing and the clear button replace the history entry; choosing a type adds one (LIST-40).
  const search = (value: string) => {
    setText(value);
    if (value.trim() !== filter.q) navigate(listUrl(path, { ...filter, q: value }), true);
  };
  const choose = (t: TypeFilter) => { if (t !== filter.type) navigate(listUrl(path, { ...filter, type: t })); };

  // KEY-1: "/" moves focus to the field and selects its text. Esc in the empty field undoes that (LIST-35).
  const cameFrom = useRef<HTMLElement | null>(null);
  useShortcut("/", () => {
    const active = document.activeElement;
    cameFrom.current = active instanceof HTMLElement && active !== document.body ? active : null;
    input.current?.focus();
    input.current?.select();
  });
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Escape") return;
    if (!empty) { e.preventDefault(); search(""); return; }
    if (text) setText("");
    const back = cameFrom.current;
    cameFrom.current = null;
    if (back?.isConnected) back.focus(); else e.currentTarget.blur();
  };

  return (
    <div className="filters" role="search" aria-label="Issues and PRs">
      <div className="search">
        <SearchIcon />
        <input ref={input} id={SEARCH_ID} type="text" value={text} placeholder="Search title, repo or #number" aria-label="Search issues and PRs"
               aria-keyshortcuts={shortcutsOn ? "/" : undefined} autoComplete="off" spellCheck={false}
               onChange={(e) => search(e.target.value)} onKeyDown={onKeyDown} onBlur={() => { cameFrom.current = null; }} />
        {!empty
          ? <button type="button" className="search-clear" aria-label="Clear search" onClick={() => { search(""); input.current?.focus(); }}><XIcon size={14} /></button>
          : shortcutsOn && <kbd className="keycap" aria-hidden="true">/</kbd> /* KEY-1; hidden with shortcuts off (KEY-3) */}
      </div>
      <div className="type-filter" role="group" aria-label="Type">
        {TYPES.map(([value, label]) => (
          <button key={value} type="button" aria-pressed={filter.type === value} onClick={() => choose(value)}>{label}</button>
        ))}
      </div>
      {stepCounts && <NextStepMenu steps={filter.steps ?? []} counts={stepCounts} onChange={onSteps} />}
    </div>
  );
}

const STEP_MENU_ID = "next-step-menu";
const STEP_GROUPS: [string, NextStep[]][] = [["On you", ON_YOU], ["Not on you", NOT_ON_YOU]];

/** LIST-44: what the menu button says is chosen: "All", "On you", "Not on you", one next step, or "{n} next steps". */
export function stepsSummary(steps: readonly NextStep[]): string {
  const s = normalizeSteps(steps);
  const p = stepsParam(s);
  if (!p || s.length === ALL_STEPS.length) return "All";
  if (p === "on_you") return "On you";
  if (p === "not_on_you") return "Not on you";
  return s.length === 1 ? NEXT_STEP_LABEL[s[0]] : `${s.length} next steps`;
}

/**
 * The next step menu in the strip (LIST-44, Q-108). Each group has a checkbox that chooses or
 * clears its next steps, with the next steps under it. None ticked shows every item; there is no "All" or "Clear",
 * since unticking the groups gets back there in two clicks at most. The menu stays open while
 * choosing; Esc, a click elsewhere or focus leaving it closes it.
 */
function NextStepMenu({ steps, counts, onChange }: { steps: NextStep[]; counts: Record<NextStep, number>; onChange: (s: NextStep[]) => void }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    wrap.current?.querySelector<HTMLElement>('[role="menuitemcheckbox"]')?.focus();
    const onDown = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); setOpen(false); button.current?.focus(); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const onMenuKey = (e: React.KeyboardEvent) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const items = [...(wrap.current?.querySelectorAll<HTMLButtonElement>(".step-menu button:not(:disabled)") ?? [])];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const n = items.length;
    items[e.key === "Home" ? 0 : e.key === "End" ? n - 1 : (i + (e.key === "ArrowDown" ? 1 : -1) + n) % n]?.focus();
  };
  const has = (s: NextStep) => steps.includes(s);
  const toggleGroup = (group: NextStep[]) => onChange(group.every(has) ? steps.filter((s) => !group.includes(s)) : [...steps, ...group.filter((s) => !has(s))]);
  const toggle = (s: NextStep) => onChange(has(s) ? steps.filter((x) => x !== s) : [...steps, s]);
  const summary = stepsSummary(steps);
  const box = (state: boolean | "mixed") => (
    <span className={`step-box${state ? " on" : ""}`} aria-hidden="true">
      {state === "mixed" ? <span className="step-dash" /> : state && <CheckIcon size={11} />}
    </span>
  );
  return (
    // Focus moving out of the menu (Tab) closes it. A click elsewhere is the mousedown handler's.
    <div className="step-filter" ref={wrap}
         onBlur={(e) => { if (open && e.relatedTarget && !wrap.current?.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <button ref={button} id={STEP_MENU_ID} type="button" className={`step-filter-btn${summary !== "All" ? " active" : ""}`}
              aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        Next step: <b>{summary}</b><ChevronDown size={14} />
      </button>
      {open && (
        <div className="step-menu" role="menu" aria-label="Next step" onKeyDown={onMenuKey}>
          {STEP_GROUPS.map(([name, group], gi) => {
            const chosen = group.filter(has).length;
            const state = chosen === group.length ? true : chosen ? "mixed" as const : false;
            return (
              <div key={name} role="group" aria-label={name}>
                {gi > 0 && <div className="step-menu-sep" role="separator" />}
                <button type="button" role="menuitemcheckbox" aria-checked={state === "mixed" ? "mixed" : state} className="step-item group" onClick={() => toggleGroup(group)}>
                  {box(state)}{name}<span className="step-count">{group.reduce((n, s) => n + counts[s], 0)}</span>
                </button>
                {group.map((s) => (
                  <button key={s} type="button" role="menuitemcheckbox" aria-checked={has(s)} className="step-item" onClick={() => toggle(s)}>
                    {box(has(s))}<span className={`next-step ${s.replace("_", "-")}`}>{NEXT_STEP_LABEL[s]}</span><span className="step-count">{counts[s]}</span>
                  </button>
                ))}
              </div>
            );
          })}
          <div className="step-menu-sep" role="separator" />
          <div className="step-menu-foot">Team review counts as Review</div>
        </div>
      )}
    </div>
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
  rows: Row[]; rank: Record<string, number>; view: View; indicators: Indicators; collapsing: Set<string>; step: number;
  onIcebox: (r: Row) => void; onRestore: (r: Row) => void; onPopup: (open: boolean) => void;
  /** "Show only {next step}" in the rank reasoning popup (LIST-46), left out when the list shows only that next step already. */
  onOnlyStep: (step: NextStep) => void; stepFilter: NextStep[];
}) {
  const { rows, rank, view, indicators, collapsing, step, onPopup } = props;
  const els = useRef(new Map<string, HTMLDivElement>());
  const tops = useRef(new Map<string, number>());
  const lastStep = useRef(step);
  // The fade each row and indicator element is running, by indicator. A remounted element (after changing page,
  // search or filter) starts again, part-way through; a new change to the row replaces it (LIVE-18).
  const fades = useRef(new Map<Element, { seq: number; anim: Animation | undefined }>());
  // The hold and fade only count time the tab is visible, like the indicators themselves (visibleClock.ts).
  useEffect(() => {
    const onVisibility = () => {
      for (const { anim } of fades.current.values()) {
        if (!anim || anim.playState === "finished") continue;
        if (document.hidden) anim.pause(); else anim.play();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  // The rank reasoning popup (Figma "Issue inbox · Rank reasoning"), opened by the row's next step chip (LIST-24, LIST-42).
  // A second click on the chip, Escape or a click elsewhere closes it.
  const [why, setWhy] = useState<string | null>(null);
  const chipBtns = useRef(new Map<string, HTMLButtonElement>());
  useEffect(() => {
    if (!why) return;
    // Escape returns focus to the chip, as for the notification popover (LIST-24, NFR-2, NOTIF-20).
    // A click elsewhere leaves focus where that click puts it; a click on the chip keeps it there.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      chipBtns.current.get(why)?.focus();
      setWhy(null);
    };
    const onDown = (e: MouseEvent) => { if (!(e.target as Element).closest?.(".next-step-cell.open")) setWhy(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [why]);

  // Live updates hold while the popup is showing, so rows don't shift mid-read (LIVE-27).
  // If its row is no longer on screen (paged away, left the list), the popup is closed rather than left holding.
  const hasWhy = (r: Row) => view === "prioritized" && !!r.nextStep && !!r.reasoning && !r.leaving && rank[r.key] !== undefined;
  const whyShown = why !== null && rows.some((r) => r.key === why && hasWhy(r));
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
        if (reduced) el.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: REDUCED_MS }); // LIVE-22
        else if (prev === undefined) el.animate([{ opacity: 0, transform: "scaleY(.6)" }, { opacity: 1, transform: "none" }], { duration: MOVE_MS, easing: "ease-out" });
        else if (prev !== top) el.animate([{ transform: `translateY(${prev - top}px)` }, { transform: "none" }], { duration: MOVE_MS, easing: "ease-in-out" });
      }
      // LIVE-18, LIVE-22: the indicator and the row's highlight stay at full strength for 10 s, then fade out over
      // 2.5 s, slowly at first (ease-in). Reduced motion keeps them: nothing moves.
      const ind = indicators[key];
      if (ind) {
        const timing = { duration: FADE_MS, delay: fadeDelay(ind, visibleNow()), easing: "ease-in" };
        const fade = (target: Element, frames: Keyframe[], fill: FillMode) => {
          const old = fades.current.get(target);
          if (old?.seq === ind.seq) return;
          old?.anim?.cancel();
          const anim = target.animate(frames, { ...timing, fill });
          if (anim && document.hidden) anim.pause();
          fades.current.set(target, { seq: ind.seq, anim });
        };
        fade(el, [{ backgroundColor: getComputedStyle(el).getPropertyValue("--highlight"), offset: 0 }], "backwards");
        const text = el.querySelector(".indicator");
        if (text) fade(text, [{ opacity: 1 }, { opacity: 0 }], "both");
      }
    }
    for (const target of fades.current.keys()) if (!target.isConnected) fades.current.delete(target);
    tops.current = new Map([...els.current].map(([k, el]) => [k, el.offsetTop]));
  });

  return (
    <>
      {rows.map((r) => {
        const n = rank[r.key];
        return (
          <div key={r.key} role="row"
               ref={(el) => { if (el) els.current.set(r.key, el); else els.current.delete(r.key); }}
               className={`tr ${r.leaving ? "leaving" : ""} ${collapsing.has(r.key) ? "collapse" : ""}`}>
            {view === "prioritized" && (
              <span role="cell" className="rank">
                {/* Ranks are never zero-padded; unranked items show "–" (Columns, LIST-30). Not clickable: the chip opens the popup (LIST-24). */}
                {r.leaving ? "" : n === undefined ? "–" : n}
                {/* Keyed by the change, so a second change to the row restarts the fade (LIVE-18). */}
                {indicators[r.key] && <span key={indicators[r.key].seq} className="indicator">{indicators[r.key].text}</span>}
              </span>
            )}
            <span role="cell" className="issue">
              <span className={`kind ${r.kind}`} aria-label={r.kind === "pr" ? "PR" : "Issue"}>{r.kind === "pr" ? <PrIcon /> : <IssueIcon />}</span>
              <span className="issue-text">
                <a className="issue-title" href={r.htmlUrl} target="_blank" rel="noreferrer" title={r.title}>{r.title}</a>
                <span className="issue-meta">
                  {/* LIST-42: the next step leads the line; the Icebox doesn't show it (ICE-3). */}
                  {/* The spaces keep the parts apart when the line is copied or read out; flex ignores them. */}
                  {view === "prioritized" && r.nextStep && <>{hasWhy(r)
                    ? <span className={`next-step-cell${why === r.key ? " open" : ""}`}>
                        <NextStepChip step={r.nextStep} team={teamOnly(r)} rank={n} open={why === r.key} onToggle={() => setWhy(why === r.key ? null : r.key)}
                                      buttonRef={(el) => { if (el) chipBtns.current.set(r.key, el); else chipBtns.current.delete(r.key); }} />
                        {why === r.key && <RankWhy row={r} rank={n}
                          onOnly={props.stepFilter.length === 1 && props.stepFilter[0] === r.nextStep ? undefined : () => { setWhy(null); props.onOnlyStep(r.nextStep!); }} />}
                      </span>
                    : <NextStepChip step={r.nextStep} team={teamOnly(r)} />}{" "}</>}
                  <span className="num">{r.kind === "pr" ? "PR" : "Issue"} #{r.number}</span>{" "}
                  <span className="dot" />{" "}
                  {view === "icebox"
                    ? <span className="reason">Moved to Icebox by you · <span title={fullDate(r.iceboxedAt)}>{relativeTime(r.iceboxedAt)}</span></span>
                    // LIST-42: only the inclusion reason is cut off when the line doesn't fit.
                    : <span className="reason" title={reasonLabel(r)}>{reasonLabel(r)}</span>}
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
 * The item's next step as a chip (LIST-42). Its text says which it is, so nothing depends on its color.
 * With `onToggle`, a button that opens the rank reasoning popup (LIST-24): a caret, and `aria-expanded` while it is open.
 * Without, a label: basic ranking, or no stored reasoning.
 */
export function NextStepChip({ step, team = false, rank, open = false, onToggle, buttonRef }: {
  step: NextStep; rank?: number; open?: boolean; onToggle?: () => void; buttonRef?: (el: HTMLButtonElement | null) => void;
  /** On the developer only through one of their teams: "Team review" and so on, in the same colors (LIST-42). */
  team?: boolean;
}) {
  const className = `next-step ${step.replace("_", "-")}`;
  const label = nextStepLabel(step, team);
  if (!onToggle) return <span className={className}>{label}</span>;
  return (
    <button type="button" className={className} aria-expanded={open} aria-haspopup="dialog"
            aria-label={`${label}, why rank #${rank}?`} ref={buttonRef} onClick={onToggle}>
      {label}<ChevronDown size={11} />
    </button>
  );
}

/**
 * The rank reasoning popup (LIST-24): the agent's next action in a panel tinted like the chip,
 * "Why rank #{n}?" and the reasoning, then the repository and a link to the item on GitHub.
 */
export function RankWhy({ row: r, rank: n, onOnly }: { row: Row; rank: number; onOnly?: () => void }) {
  const kind = r.kind === "pr" ? "PR" : "Issue";
  return (
    <div className="rank-why" role="dialog" aria-label={`Why rank #${n}?`}>
      <div className="rank-why-body">
        {r.nextAction && (
          <div className={`rank-why-next ${r.nextStep ? r.nextStep.replace("_", "-") : ""}`}>
            <span className="rank-why-label">Next action</span>
            <p>{r.nextAction}</p>
          </div>
        )}
        <span className="rank-why-sub">Why rank #{n}?</span>
        <p>{r.reasoning}</p>
      </div>
      <div className="rank-why-foot">
        <span>
          {r.repo} ·{" "}
          <a href={r.htmlUrl} target="_blank" rel="noreferrer">{kind} #{r.number}<ExternalIcon size={11} /></a>
        </span>
        {/* LIST-46: filter the list to this item's next step. */}
        {onOnly && r.nextStep && <button type="button" className="btn small rank-why-only" onClick={onOnly}>Show only {NEXT_STEP_LABEL[r.nextStep]}</button>}
      </div>
    </div>
  );
}

/**
 * Disabled while any sync runs, however it started, with the icon turning (LIST-17, LIST-28),
 * and how far the sync has got to its left (LIST-33). While GitHub can't be read at all, disabled
 * with a link to the fix in place of the progress, and a scan that fails at once doesn't flash (LIST-43).
 */
function SyncButton({ sync, agent, blocker }: { sync: SyncEvent; agent: string; blocker: ScanBlocker | null }) {
  const running = sync.running && !blocker;
  const progress = useSyncProgress(sync, agent);
  const [error, setError] = useState<string | null>(null);
  const start = async () => {
    setError(null);
    try { await api.post("/api/sync"); } catch (e) { setError(e instanceof ApiError ? e.message : "Couldn't start a sync"); }
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      {error && !blocker && <span className="hint">{error}</span>}
      {/* Not a live region: it would be read out every 2 seconds. The button points at it instead. */}
      {blocker
        ? <span id="sync-note" className="sync-progress"><Link to={`/settings#${blocker.settings}`}>{blocker.link}</Link>{blocker.rest}</span>
        : progress && <span id="sync-progress" className="sync-progress">{progress}</span>}
      <button className={`btn sync ${running ? "syncing" : ""}`} onClick={start} disabled={running || blocker !== null} aria-busy={running}
              aria-describedby={blocker ? "sync-note" : progress ? "sync-progress" : undefined}>
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

/**
 * `matching` is the number of rows the pages are made of, null while loading; `total` is the number without the
 * search and filter. With no rows there is still one page, so "Previous" and "Next" are both disabled (LIST-12).
 */
function Pager({ page, matching, total, filtering, href }: { page: number; matching: number | null; total: number; filtering: boolean; href: (page: number) => string }) {
  const count = pageCount(matching ?? 0);
  const go = (p: number) => navigate(href(p)); // LIST-40: changing pages keeps the search and filter
  return (
    <div className="pager">
      {/* LIST-27, LIST-38: "{N} issues and PRs", or "{n} of {N}" while filtering; a placeholder while loading, as in Figma. */}
      {matching === null ? <span className="count skeleton"><span className="bar" style={{ width: 82 }} /></span>
        : <span className="count">{countText(matching, total, filtering)}</span>}
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

/** LIST-39: the developer has items, but none match the search and type filter. */
function NoMatches({ onClear }: { onClear: () => void }) {
  return (
    <div className="empty">
      <strong>No matching issues or PRs</strong>
      <button type="button" className="btn" onClick={onClear}>Clear filters</button>
    </div>
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
