// Applies queued live updates under the PRD's holding rules (LIVE-4..10, LIVE-27, LIVE-28), keeps keyboard focus on
// rows that move (LIVE-29), and catches up on changes the tab missed (LIVE-30).
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ItemRow, ListResponse } from "@gitilizer/shared";
import { api } from "../api.ts";
import { useStore } from "../store.tsx";
import { apply, catchUp, finalize, init, nextBatch, own, receive, type Change, type Live, type View } from "./engine.ts";
import { held, initHolds, setApplying, trackActivity } from "./holds.ts";
import { addIndicators, expireIndicators, MOVE_MS, type Indicators } from "./indicators.ts";
import { visibleNow } from "./visibleClock.ts";

const STEP_MS = MOVE_MS; // "Each animation takes about 0.7 seconds" (LIVE-11..16)
const LABEL_MS = 600; // how long a leave label shows before the row collapses

export function useLive(view: View) {
  const { onList, onReconnect } = useStore();
  const [live, setLive] = useState<Live | null>(null);
  const ref = useRef<Live | null>(null);
  const viewRef = useRef(view);
  viewRef.current = view;
  const holds = useRef(initHolds());
  const busyUntil = useRef(0);
  const [indicators, setIndicators] = useState<Indicators>({});
  const indicatorsRef = useRef<Indicators>({});
  const indicatorSeq = useRef(0);
  const [collapsing, setCollapsing] = useState<Set<string>>(new Set());
  const [announcement, setAnnouncement] = useState("");
  /** Increments each time server changes are applied, so the table knows to animate. */
  const [step, setStep] = useState(0);
  /** The table's row group, where the pointer, focus and activity hold updates. */
  const [table, setTable] = useState<HTMLElement | null>(null);
  const tableRef = useRef<HTMLElement | null>(null);
  tableRef.current = table;

  const commit = useCallback((s: Live) => { ref.current = s; setLive(s); }, []);

  // Catching up (LIVE-30). At most one request at a time; `wanted` asks for another when it ends, because a gap or
  // reconnect seen meanwhile may need a newer list than the one on its way.
  const fetching = useRef(false);
  const wanted = useRef<"no" | "yes" | "force">("no");
  /** The newest version seen in an event before the list had loaded, or while catching up. */
  const seen = useRef(0);
  const sync = useCallback(async (force: boolean) => {
    if (fetching.current) { if (wanted.current !== "force") wanted.current = force ? "force" : "yes"; return; }
    fetching.current = true;
    try {
      const known = ref.current?.version;
      const r = await api.get<ListResponse>(known === undefined || force ? "/api/list" : `/api/list?known=${known}`);
      if (!ref.current) { commit(init(r.items, r.version)); reportListReady(); }
      else if (!r.unchanged) commit(catchUp(ref.current, r.items, r.version, force));
    } catch {
      // The next event, reconnect or tick tries again.
    } finally {
      fetching.current = false;
      const again = wanted.current;
      wanted.current = "no";
      if (again !== "no" || (ref.current && seen.current > ref.current.version)) void sync(again === "force");
    }
  }, [commit]);

  useEffect(() => { void sync(false); }, [sync]);
  useEffect(() => onList((e) => {
    const s = ref.current;
    if (e.resync) { void sync(true); return; }
    // Versions go up by one per event, so a jump means events were lost on the way: catch up instead (LIVE-30).
    // Before the list has loaded, or while a catch-up is on its way, the event is noted; the list read covers it,
    // or another is read when it ends.
    if (!s || fetching.current || e.version > s.version + 1) {
      seen.current = Math.max(seen.current, e.version);
      if (!fetching.current) void sync(false);
      return;
    }
    commit(receive(s, e));
  }), [onList, sync, commit]);
  useEffect(() => onReconnect(() => { void sync(false); }), [onReconnect, sync]);

  // What the developer does in the table keeps the pointer and focus holding updates (LIVE-28).
  useEffect(() => (table ? trackActivity(table, () => { holds.current.lastActivity = Date.now(); }) : undefined), [table]);

  const leave = useCallback((keys: string[]) => {
    setTimeout(() => setCollapsing((c) => new Set([...c, ...keys])), LABEL_MS);
    setTimeout(() => {
      if (ref.current) commit(finalize(ref.current, keys));
      setCollapsing((c) => { const n = new Set(c); keys.forEach((k) => n.delete(k)); return n; });
    }, LABEL_MS + STEP_MS);
  }, [commit]);

  useEffect(() => {
    const t = setInterval(() => {
      // Indicators run out on the visible clock, so not while the tab is hidden (LIVE-18).
      const expired = expireIndicators(indicatorsRef.current, visibleNow());
      if (expired !== indicatorsRef.current) { indicatorsRef.current = expired; setIndicators(expired); }
      const s = ref.current;
      if (!s || !s.queue.length) return;
      const now = Date.now();
      if (now < busyUntil.current || document.visibilityState !== "visible") return; // LIVE-6 (hidden tab)
      // Read from the document, not from focus events, so focus on a row that has gone can't hold updates (LIVE-5).
      const focusInside = Boolean(tableRef.current?.contains(document.activeElement));
      let batch: Change[];
      if (viewRef.current === "icebox") {
        // LIVE-6 holds list updates while the Icebox is shown; items leaving the Icebox animate at once (ICE-9).
        batch = s.queue.filter((c) => s.shown[c.key]?.status === "iceboxed" || c.row?.status === "iceboxed");
        if (!batch.length) return;
      } else {
        if (held(holds.current, focusInside, now)) return; // LIVE-4, LIVE-5, LIVE-27, LIVE-28
        batch = nextBatch(s); // LIVE-8, LIVE-9
      }
      setApplying(true); // until the step is drawn: React keeps focus on a row it moves (LIVE-29)
      const r = apply(s, batch);
      commit(r.state);
      setStep((n) => n + 1);
      busyUntil.current = now + STEP_MS;
      if (Object.keys(r.indicators).length) {
        const { next, seq } = addIndicators(indicatorsRef.current, r.indicators, indicatorSeq.current, visibleNow());
        indicatorSeq.current = seq;
        indicatorsRef.current = next;
        setIndicators(next);
      }
      if (r.leaving.length) leave(r.leaving);
      // One announcement per group of updates; none for a bulk re-rank's silent reorder.
      if (r.changed) setAnnouncement(`${r.changed} ${r.changed === 1 ? "issue or PR" : "issues and PRs"} changed rank`); // LIVE-21
    }, 100);
    return () => clearInterval(t);
  }, [commit, leave]);

  // LIVE-29: React moves a row's element to move the row, which takes focus off it, and puts focus back as it draws
  // the step, before this runs. A row that left the page isn't followed: its element is gone.
  useLayoutEffect(() => { setApplying(false); }, [step]);
  useEffect(() => () => setApplying(false), []);

  /** Table event handlers and ref (LIVE-4, LIVE-5, LIVE-10, LIVE-28). */
  const tableProps = {
    ref: setTable,
    onPointerEnter: () => { holds.current.pointerInside = true; },
    onPointerLeave: () => { holds.current.pointerInside = false; holds.current.pointerLeftAt = Date.now(); },
  };

  /** Holds updates while the rank reasoning popup is open, and for 1 s after it closes (LIVE-27). */
  const holdForPopup = useCallback((open: boolean) => {
    const h = holds.current;
    if (h.popupOpen && !open) h.popupClosedAt = Date.now();
    h.popupOpen = open;
  }, []);

  /** The developer's own actions apply immediately (LIVE-7). */
  const moveToIcebox = useCallback(async (row: ItemRow) => {
    if (!ref.current) return;
    commit(own(ref.current, row.key, { ...row, status: "iceboxed", iceboxedAt: new Date().toISOString() }, "Moved to Icebox"));
    leave([row.key]);
    await api.post("/api/items/icebox", { key: row.key });
  }, [commit, leave]);

  const restore = useCallback(async (row: ItemRow) => {
    if (!ref.current) return;
    commit(own(ref.current, row.key, { ...row, status: "active", iceboxedAt: null }, "Restored"));
    leave([row.key]);
    await api.post("/api/items/restore", { key: row.key });
  }, [commit, leave]);

  return { live, indicators, collapsing, announcement, step, tableProps, holdForPopup, moveToIcebox, restore, pending: live?.queue.length ?? 0 };
}

let reported = false;
/** Time from navigation start to a usable list, once per page load (METRIC-3, NFR-7). */
function reportListReady() {
  if (reported) return;
  reported = true;
  requestAnimationFrame(() => {
    api.post("/api/telemetry", { events: [{ name: "list_ready_ms", value: Math.round(performance.now()), page: location.pathname }] }).catch(() => {});
  });
}
