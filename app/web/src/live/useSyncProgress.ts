// Runs the LIST-33 progress text (syncProgress.ts) against the store's sync state.
import type { SyncEvent } from "@gitilizer/shared";
import { useEffect, useState } from "react";
import { initProgress, receiveSync, step, type ProgressView } from "./syncProgress.ts";

export function useSyncProgress(sync: SyncEvent, agent: string): string | null {
  const [view, setView] = useState<ProgressView>(() => {
    const now = Date.now();
    return step(receiveSync(initProgress(), sync, now), now, agent).view;
  });
  useEffect(() => {
    setView((v) => {
      const now = Date.now();
      return step(receiveSync(v, sync, now), now, agent).view;
    });
  }, [sync, agent]);
  useEffect(() => {
    const { next } = step(view, Date.now(), agent);
    if (next === null) return;
    const t = setTimeout(() => setView((v) => step(v, Date.now(), agent).view), Math.max(0, next - Date.now()));
    return () => clearTimeout(t);
  }, [view, agent]);
  return view.text;
}
