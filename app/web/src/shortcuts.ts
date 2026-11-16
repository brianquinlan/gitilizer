// Keyboard shortcuts (PRD KEY-1 to KEY-3). Every shortcut goes through
// useShortcut, so the "Keyboard shortcuts" switch in Settings covers all of
// them, including any added later.
import { useEffect, useRef } from "react";
import { useStore } from "./store.tsx";

type KeyLike = Pick<KeyboardEvent, "key" | "ctrlKey" | "metaKey" | "altKey" | "defaultPrevented" | "isComposing" | "target">;
type DocLike = Pick<Document, "querySelector">;

/** Dialogs, popups and menus are only in the page while they are open. */
const OPEN_OVERLAY = '[role="dialog"], [role="menu"]';

/**
 * KEY-2: a shortcut must not take a key meant for something else. It doesn't
 * act with Ctrl, Alt or Command held, while focus is in a control that takes
 * typing, or while a dialog, popup or menu is open.
 */
export function shortcutBlocked(e: KeyLike, doc: DocLike = document): boolean {
  if (e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented || e.isComposing) return true;
  const t = e.target as { tagName?: string; isContentEditable?: boolean } | null;
  if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName ?? ""))) return true;
  return doc.querySelector(OPEN_OVERLAY) !== null;
}

/** Whether shortcuts are on (SET-50). Off until the account's setting is known, so one that is turned off never acts. */
export function useShortcutsOn(): boolean {
  return useStore().shortcuts === true;
}

/** Calls `run` when `key` is pressed anywhere on the screen, if shortcuts are on and `KEY-2` allows it. */
export function useShortcut(key: string, run: () => void) {
  const on = useShortcutsOn();
  const latest = useRef(run);
  latest.current = run;
  useEffect(() => {
    if (!on) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== key || shortcutBlocked(e)) return;
      e.preventDefault();
      latest.current();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [on, key]);
}
