// Applies queued live updates under the PRD's holding rules (LIVE-4..10).
import { useCallback, useEffect, useRef, useState } from "react";
import type { ItemRow, ListResponse } from "@gitilizer/shared";
import { api } from "../api.ts";
import { useStore } from "../store.tsx";
import { apply, finalize, init, nextBatch, own, receive, type Change, type Live, type View } from "./engine.ts";

const HOLD_AFTER_MS = 1000; // LIVE-4, LIVE-5
const STEP_MS = 400; // "Each animation takes about 0.4 seconds"
const LABEL_MS = 600; // how long a leave label shows before the row collapses
const INDICATOR_MS = 3000; // LIVE-18

export function useLive(view: View) {
  const { onList } = useStore();
  const [live, setLive] = useState<Live | null>(null);
  const ref = useRef<Live | null>(null);
  const viewRef = useRef(view);
  viewRef.current = view;
  const holds = useRef({ pointerInside: false, pointerLeftAt: 0, focusInside: false, tappedAt: 0 });
  const busyUntil = useRef(0);
  const [indicators, setIndicators] = useState<Record<string, string>>({});
  const [collapsing, setCollapsing] = useState<Set<string>>(new Set());
  const [announcement, setAnnouncement] = useState("");
  /** Increments each time server changes are applied, so the table knows to animate. */
  const [step, setStep] = useState(0);

  const commit = useCallback((s: Live) => { ref.current = s; setLive(s); }, []);

  const load = useCallback(async () => {
    const r = await api.get<ListResponse>("/api/list");
    commit(init(r.items, r.version));
  }, [commit]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => onList((e) => {
    if (e.resync) { void load(); return; }
    if (ref.current) commit(receive(ref.current, e));
  }), [onList, load, commit]);

  const leave = useCallback((keys: string[]) => {
    setTimeout(() => setCollapsing((c) => new Set([...c, ...keys])), LABEL_MS);
    setTimeout(() => {
      if (ref.current) commit(finalize(ref.current, keys));
      setCollapsing((c) => { const n = new Set(c); keys.forEach((k) => n.delete(k)); return n; });
    }, LABEL_MS + STEP_MS);
  }, [commit]);

  useEffect(() => {
    const t = setInterval(() => {
      const s = ref.current;
      if (!s || !s.queue.length) return;
      const now = Date.now();
      const h = holds.current;
      if (now < busyUntil.current || document.visibilityState !== "visible") return; // LIVE-6 (hidden tab)
      let batch: Change[];
      if (viewRef.current === "icebox") {
        // LIVE-6 holds list updates while the Icebox is shown; changes to the Icebox itself apply (Q-33, assumed).
        batch = s.queue.filter((c) => s.shown[c.key]?.status === "iceboxed" || c.row?.status === "iceboxed");
        if (!batch.length) return;
      } else {
        if (h.pointerInside || now - h.pointerLeftAt < HOLD_AFTER_MS) return; // LIVE-4
        if (h.focusInside || now - h.tappedAt < HOLD_AFTER_MS) return; // LIVE-5
        batch = nextBatch(s); // LIVE-8, LIVE-9
      }
      const r = apply(s, batch);
      commit(r.state);
      setStep((n) => n + 1);
      busyUntil.current = now + STEP_MS;
      const keys = Object.keys(r.indicators);
      if (keys.length) {
        setIndicators((p) => ({ ...p, ...r.indicators }));
        setTimeout(() => setIndicators((p) => { const n = { ...p }; keys.forEach((k) => delete n[k]); return n; }), INDICATOR_MS);
      }
      if (r.leaving.length) leave(r.leaving);
      if (r.changed) setAnnouncement(`${r.changed} ${r.changed === 1 ? "issue" : "issues"} changed priority`); // LIVE-21
    }, 100);
    return () => clearInterval(t);
  }, [commit, leave]);

  /** Table event handlers that hold updates (LIVE-4, LIVE-5, LIVE-10). */
  const tableProps = {
    onPointerEnter: () => { holds.current.pointerInside = true; },
    onPointerLeave: () => { holds.current.pointerInside = false; holds.current.pointerLeftAt = Date.now(); },
    onFocus: () => { holds.current.focusInside = true; },
    onBlur: (e: React.FocusEvent) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) holds.current.focusInside = false; },
    onTouchStart: () => { holds.current.tappedAt = Date.now(); },
  };

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

  return { live, indicators, collapsing, announcement, step, tableProps, moveToIcebox, restore, pending: live?.queue.length ?? 0 };
}
