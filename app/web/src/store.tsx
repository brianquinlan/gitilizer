// The signed-in developer's state: account, notifications, sync state and the
// event stream (design: Web app). The list itself lives in useLive.
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { ListEvent, Me, Notification, SettingsResponse, Sort, SyncEvent } from "@gitilizer/shared";
import { api, ApiError } from "./api.ts";

type Listener = (e: ListEvent) => void;

type Store = {
  me: Me | null;
  signedOut: boolean;
  notifications: Notification[];
  sync: SyncEvent;
  sorts: { prioritized: Sort; icebox: Sort } | null;
  refreshMe: () => Promise<void>;
  setSort: (view: "prioritized" | "icebox", s: Sort) => void;
  onList: (l: Listener) => () => void;
  connected: boolean;
};

const Ctx = createContext<Store | null>(null);
export const useStore = () => useContext(Ctx)!;

const TAB_ID = Math.random().toString(36).slice(2);
const DISCONNECTED_GRACE_MS = 30_000;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [signedOut, setSignedOut] = useState(false);
  const [serverNotes, setServerNotes] = useState<Notification[]>([]);
  const [cannotConnect, setCannotConnect] = useState<string | null>(null);
  const [sync, setSync] = useState<SyncEvent>({ running: false, lastFinishedAt: null, progress: null });
  const [sorts, setSorts] = useState<Store["sorts"]>(null);
  const [connected, setConnected] = useState(true);
  const listeners = useRef(new Set<Listener>());

  const refreshMe = useCallback(async () => {
    try {
      const m = await api.get<Me>("/api/me");
      setMe(m);
      setSync(m.sync);
      setSignedOut(false);
    } catch (e) {
      // Taken off the development site's allowlist: show why on the sign-in page (AUTH-10).
      if (e instanceof ApiError && e.status === 401 && e.message === "not_allowed") location.replace("/sign-in?error=not_allowed");
      else if (e instanceof ApiError && e.status === 401) setSignedOut(true);
      else throw e;
    }
  }, []);

  useEffect(() => { refreshMe().catch(() => setCannotConnect(new Date().toISOString())); }, [refreshMe]);

  const userId = me?.user.id;
  useEffect(() => {
    if (!userId) return;
    api.get<SettingsResponse>("/api/settings").then((s) => setSorts({ prioritized: s.sortPrioritized, icebox: s.sortIcebox }));

    // Presence (design: Scheduler).
    const report = () => api.post("/api/presence", { tabId: TAB_ID, visible: document.visibilityState === "visible" }).catch(() => {});
    report();
    const t = setInterval(report, 60_000);
    document.addEventListener("visibilitychange", report);

    // Server-sent events (design: Live updates).
    const es = new EventSource("/api/events");
    let downSince: number | null = null;
    let check: ReturnType<typeof setTimeout> | null = null;
    es.addEventListener("list", (m) => { const e = JSON.parse((m as MessageEvent).data) as ListEvent; listeners.current.forEach((l) => l(e)); });
    es.addEventListener("notifications", (m) => setServerNotes(JSON.parse((m as MessageEvent).data)));
    es.addEventListener("sync", (m) => { setSync(JSON.parse((m as MessageEvent).data)); refreshMe().catch(() => {}); });
    es.onopen = () => { downSince = null; setConnected(true); setCannotConnect(null); };
    es.onerror = () => {
      setConnected(false);
      if (downSince === null) downSince = Date.now();
      if (check) return;
      // NOTIF-12: the web app raises "Can't connect to Gitilizer" itself.
      check = setTimeout(async () => {
        check = null;
        if (downSince === null) return;
        try { await api.get("/api/me"); } catch { setCannotConnect(new Date(downSince).toISOString()); }
      }, DISCONNECTED_GRACE_MS);
    };
    return () => { clearInterval(t); document.removeEventListener("visibilitychange", report); es.close(); if (check) clearTimeout(check); };
  }, [userId, refreshMe]);

  const setSort = useCallback((view: "prioritized" | "icebox", s: Sort) => {
    setSorts((cur) => (cur ? { ...cur, [view]: s } : cur));
    api.put("/api/sort", { view, sort: s }).catch(() => {});
  }, []);

  const onList = useCallback((l: Listener) => { listeners.current.add(l); return () => { listeners.current.delete(l); }; }, []);

  const notifications = cannotConnect
    ? [...serverNotes, { code: "cannot_connect" as const, subject: "", params: {}, firstDetectedAt: cannotConnect, seen: false }]
    : serverNotes;

  return (
    <Ctx.Provider value={{ me, signedOut, notifications, sync, sorts, refreshMe, setSort, onList, connected }}>
      {children}
    </Ctx.Provider>
  );
}
