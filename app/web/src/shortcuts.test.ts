import { describe, expect, it, vi } from "vitest";

// The hook reads the switch from the store; the rule below needs neither.
vi.mock("./store.tsx", () => ({ useStore: () => ({ shortcuts: true }) }));

import { shortcutBlocked } from "./shortcuts.ts";

const key = (over: object = {}) => ({
  key: "/", ctrlKey: false, metaKey: false, altKey: false, defaultPrevented: false, isComposing: false,
  target: { tagName: "BODY", isContentEditable: false }, ...over,
}) as unknown as KeyboardEvent;
const page = (open: boolean) => ({ querySelector: () => (open ? {} : null) }) as unknown as Document;

describe("keyboard shortcuts (KEY-2)", () => {
  it("act from anywhere that doesn't take typing", () => {
    expect(shortcutBlocked(key(), page(false))).toBe(false);
    expect(shortcutBlocked(key({ target: { tagName: "BUTTON" } }), page(false))).toBe(false);
    expect(shortcutBlocked(key({ target: { tagName: "A" } }), page(false))).toBe(false);
    expect(shortcutBlocked(key({ shiftKey: true }), page(false))).toBe(false); // "/" needs Shift on some keyboards
  });

  it("leave the key alone while focus is in a control that takes typing", () => {
    for (const tagName of ["INPUT", "TEXTAREA", "SELECT"]) expect(shortcutBlocked(key({ target: { tagName } }), page(false))).toBe(true);
    expect(shortcutBlocked(key({ target: { tagName: "DIV", isContentEditable: true } }), page(false))).toBe(true);
  });

  it("leave the key alone with Ctrl, Alt or Command held, or once something else has used it", () => {
    for (const held of ["ctrlKey", "altKey", "metaKey"]) expect(shortcutBlocked(key({ [held]: true }), page(false))).toBe(true);
    expect(shortcutBlocked(key({ defaultPrevented: true }), page(false))).toBe(true);
    expect(shortcutBlocked(key({ isComposing: true }), page(false))).toBe(true);
  });

  it("don't act while a dialog, popup or menu is open", () => {
    const asked: string[] = [];
    const doc = { querySelector: (s: string) => { asked.push(s); return {}; } } as unknown as Document;
    expect(shortcutBlocked(key(), doc)).toBe(true);
    expect(asked).toEqual(['[role="dialog"], [role="menu"]']); // the rank popup, the notification popover, the account menu
  });
});
