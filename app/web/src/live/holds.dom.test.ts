// @vitest-environment jsdom
// When live updates wait (PRD LIVE-4, LIVE-5, LIVE-27, LIVE-28), and what counts as doing something in the table.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { held, HOLD_AFTER_MS, IDLE_MS, initHolds, setApplying, trackActivity, type Holds } from "./holds.ts";

const T = 1_000_000;
const holds = (over: Partial<Holds>): Holds => ({ ...initHolds(), ...over });

describe("held (LIVE-4, LIVE-5, LIVE-27, LIVE-28)", () => {
  it("doesn't hold with the pointer outside and focus elsewhere", () => {
    expect(held(holds({}), false, T)).toBe(false);
    expect(held(holds({ lastActivity: T - 10 }), false, T)).toBe(false);
  });

  it("holds while the pointer is over the table and for 1 s after it leaves, while the developer is active", () => {
    expect(held(holds({ pointerInside: true, lastActivity: T - 1000 }), false, T)).toBe(true);
    expect(held(holds({ pointerLeftAt: T - 500, lastActivity: T - 600 }), false, T)).toBe(true);
    expect(held(holds({ pointerLeftAt: T - HOLD_AFTER_MS, lastActivity: T - HOLD_AFTER_MS }), false, T)).toBe(false);
  });

  it("holds while focus is in the table, while the developer is active", () => {
    expect(held(holds({ lastActivity: T - 5000 }), true, T)).toBe(true);
  });

  it("lets updates play 30 s after the developer last did something, though the pointer or focus is still there", () => {
    expect(held(holds({ pointerInside: true, lastActivity: T - IDLE_MS + 1 }), false, T)).toBe(true);
    expect(held(holds({ pointerInside: true, lastActivity: T - IDLE_MS }), false, T)).toBe(false);
    expect(held(holds({ lastActivity: T - IDLE_MS }), true, T)).toBe(false);
    expect(held(holds({ pointerInside: true }), true, T)).toBe(false); // nothing done in the table at all
    expect(IDLE_MS).toBe(30_000);
  });

  it("holds while the rank reasoning popup is open, however long, and for 1 s after it closes", () => {
    expect(held(holds({ popupOpen: true }), false, T)).toBe(true);
    expect(held(holds({ popupOpen: true, pointerInside: true, lastActivity: T - 10 * IDLE_MS }), true, T)).toBe(true);
    expect(held(holds({ popupClosedAt: T - 999 }), false, T)).toBe(true);
    expect(held(holds({ popupClosedAt: T - 1000 }), false, T)).toBe(false);
  });
});

describe("trackActivity (LIVE-28)", () => {
  let table: HTMLDivElement;
  let link: HTMLAnchorElement;
  let other: HTMLButtonElement;
  let stop: () => void;
  const activity = vi.fn();

  beforeEach(() => {
    document.body.innerHTML = `<div id="table"><a id="title" href="#">Title</a></div><button id="other">Other</button>`;
    table = document.getElementById("table") as HTMLDivElement;
    link = document.getElementById("title") as HTMLAnchorElement;
    other = document.getElementById("other") as HTMLButtonElement;
    activity.mockClear();
    stop = trackActivity(table, activity);
  });
  afterEach(() => stop());

  const pointer = (type: string, x: number, y: number) => link.dispatchEvent(new MouseEvent(type, { bubbles: true, screenX: x, screenY: y }));

  it("counts moving the pointer, pressing a button or key, scrolling, and moving focus in", () => {
    pointer("pointermove", 10, 10);
    pointer("pointerdown", 10, 10);
    link.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Tab" }));
    link.dispatchEvent(new WheelEvent("wheel", { bubbles: true, deltaY: 40 }));
    link.focus();
    expect(activity).toHaveBeenCalledTimes(5);
  });

  it("doesn't count a pointer event at the same place, as when rows slide under a still pointer", () => {
    pointer("pointermove", 10, 10);
    pointer("pointermove", 10, 10);
    pointer("pointermove", 11, 10);
    expect(activity).toHaveBeenCalledTimes(2);
  });

  it("doesn't count anything outside the table", () => {
    other.dispatchEvent(new MouseEvent("pointermove", { bubbles: true, screenX: 1, screenY: 1 }));
    other.focus();
    expect(activity).not.toHaveBeenCalled();
  });

  it("doesn't count the browser putting focus back on the clicked title when the developer comes back", () => {
    link.focus();
    activity.mockClear();
    window.dispatchEvent(new Event("blur")); // off to GitHub in another tab
    link.blur();
    link.focus(); // back: the browser restores focus
    expect(activity).not.toHaveBeenCalled();
    link.blur();
    link.focus(); // the developer moving focus there again does count
    expect(activity).toHaveBeenCalledTimes(1);
  });

  it("doesn't count focus put back on a moved row while a step is drawn (LIVE-29)", () => {
    setApplying(true);
    link.focus();
    setApplying(false);
    expect(activity).not.toHaveBeenCalled();
    link.blur();
    link.focus();
    expect(activity).toHaveBeenCalledTimes(1);
  });
});
