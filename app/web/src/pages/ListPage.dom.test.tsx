// @vitest-environment jsdom
// The rank reasoning popup in a browser DOM (PRD LIST-24, LIST-42, LIVE-27): the next step chip opens and closes it,
// Escape and a click outside close it, Escape returns focus to the chip, and live updates hold while it is open.
// The next step menu (LIST-44) and "Show only" in the popup (LIST-46).
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SORT_ICEBOX, DEFAULT_SORT_PRIORITIZED, type ItemRow } from "@gitilizer/shared";
import { init, type Live } from "../live/engine.ts";

const page = vi.hoisted(() => ({
  live: null as unknown, hold: (_open: boolean) => {}, indicators: {} as Record<string, { text: string; seq: number; at: number }>, step: 0,
  query: "", nav: (_to: string, _replace?: boolean) => {},
}));
vi.mock("../store.tsx", () => ({
  useStore: () => ({
    me: { firstSyncDone: true, rankingAgent: "gemini" },
    sorts: { prioritized: DEFAULT_SORT_PRIORITIZED, icebox: DEFAULT_SORT_ICEBOX },
    setSort: () => {}, sync: { running: false, lastSyncedAt: null, progress: null }, shortcuts: true, notifications: [],
  }),
}));
vi.mock("../router.tsx", async () => {
  const { createElement } = await import("react");
  return {
    Link: ({ to, children }: { to: string; children: unknown }) => createElement("a", { href: to }, children as never),
    navigate: (to: string, replace?: boolean) => page.nav(to, replace),
    useRoute: () => ({ path: "/", query: new URLSearchParams(page.query), hash: "" }),
  };
});
vi.mock("../live/useLive.ts", () => ({
  useLive: () => ({
    live: page.live, indicators: page.indicators, collapsing: new Set(), announcement: "", step: page.step, tableProps: {},
    holdForPopup: page.hold, moveToIcebox: () => {}, restore: () => {},
  }),
}));

const { ListPage } = await import("./ListPage.tsx");

const item = (number: number, extra: Partial<ItemRow>): ItemRow => ({
  key: `northstar/api#${number}`, repo: "northstar/api", number, kind: "issue", title: `Item ${number}`,
  htmlUrl: `https://github.com/northstar/api/issues/${number}`, updatedAt: "2026-11-15T00:00:00Z", reasons: ["assigned"],
  mentionHandle: null, status: "active", iceboxedAt: null, score: 1 - number / 10000, rankFailed: false, waiting: false, ...extra,
});

let root: Root;
let host: HTMLDivElement;
const hold = vi.fn();
const nav = vi.fn();
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener: () => {}, removeEventListener: () => {} })) as never;
  hold.mockClear();
  page.indicators = {};
  page.step = 0;
  page.hold = hold;
  page.query = "";
  page.nav = nav;
  nav.mockClear();
  page.live = init([
    item(1842, { nextStep: "todo", nextAction: "Check the hotfix.", reasoning: "Because." }),
    item(1843, { nextStep: "review", nextAction: "Review it.", reasoning: "Also because." }),
    item(1844, { nextStep: "waiting" }), // basic ranking: no reasoning
  ], 1) as Live;
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root.render(<ListPage view="prioritized" />));
});
afterEach(() => { act(() => root.unmount()); host.remove(); });

const chips = () => [...host.querySelectorAll<HTMLButtonElement>("button.next-step")];
const popup = () => host.querySelector(".rank-why");
const click = (el: Element) => act(() => { el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true })); (el as HTMLElement).click(); });
const lastHold = () => hold.mock.calls.at(-1)?.[0];

describe("the next step chip and the rank reasoning popup (LIST-24, LIST-42)", () => {
  it("only chips with reasoning are buttons", () => {
    expect(chips()).toHaveLength(2);
    expect(host.querySelectorAll("span.next-step")).toHaveLength(1);
  });

  it("opens and closes from the chip, says whether it is open, and holds updates meanwhile (LIVE-27)", () => {
    const [chip] = chips();
    expect(chip.getAttribute("aria-expanded")).toBe("false");
    click(chip);
    expect(chip.getAttribute("aria-expanded")).toBe("true");
    expect(popup()?.textContent).toBe("Next actionCheck the hotfix.Why rank #1?Because.northstar/api · Issue #1842Show only To do");
    expect(popup()?.querySelector("a")?.getAttribute("href")).toBe("https://github.com/northstar/api/issues/1842");
    expect(lastHold()).toBe(true);
    click(chip);
    expect(popup()).toBeNull();
    expect(chip.getAttribute("aria-expanded")).toBe("false");
    expect(lastHold()).toBe(false);
  });

  it("shows one popup at a time", () => {
    const [a, b] = chips();
    click(a);
    click(b);
    expect(host.querySelectorAll(".rank-why")).toHaveLength(1);
    expect(popup()?.textContent).toContain("Why rank #2?");
    expect(a.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes on Escape and returns focus to the chip", () => {
    const [chip] = chips();
    click(chip);
    act(() => (popup()!.querySelector("a") as HTMLElement).focus());
    act(() => { document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })); });
    expect(popup()).toBeNull();
    expect(document.activeElement).toBe(chip);
  });

  it("closes when its link to GitHub is followed, so it can't hold updates out of sight (LIVE-27)", () => {
    const [chip] = chips();
    click(chip);
    const a = popup()!.querySelector("a")!;
    a.addEventListener("click", (e) => e.preventDefault()); // jsdom would navigate
    act(() => a.click());
    expect(popup()).toBeNull();
    expect(lastHold()).toBe(false);
    click(chip);
    act(() => { popup()!.querySelector("a")!.dispatchEvent(new MouseEvent("auxclick", { bubbles: true, button: 1 })); }); // middle click
    expect(popup()).toBeNull();
  });

  it("closes when the tab is hidden (LIVE-27)", () => {
    const [chip] = chips();
    click(chip);
    // No time passes while hidden, so the visible clock (visibleClock.ts) is the same for the tests after this one.
    const now = vi.spyOn(Date, "now").mockReturnValue(Date.now());
    const hidden = vi.spyOn(Document.prototype, "hidden", "get").mockReturnValue(true);
    act(() => { document.dispatchEvent(new Event("visibilitychange")); });
    hidden.mockRestore();
    act(() => { document.dispatchEvent(new Event("visibilitychange")); });
    now.mockRestore();
    expect(popup()).toBeNull();
    expect(lastHold()).toBe(false);
  });

  it("stays open for a click inside it and closes for a click elsewhere", () => {
    const [chip] = chips();
    click(chip);
    act(() => { popup()!.querySelector("p")!.dispatchEvent(new MouseEvent("mousedown", { bubbles: true })); });
    expect(popup()).not.toBeNull();
    act(() => { document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true })); });
    expect(popup()).toBeNull();
    expect(lastHold()).toBe(false);
  });
});

describe("row indicators (LIVE-18, LIVE-22)", () => {
  const NOW = 50_000;
  const KEY = "northstar/api#1843";
  let animate: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    vi.spyOn(Date, "now").mockReturnValue(NOW);
    animate = vi.fn();
    Element.prototype.animate = animate as never;
  });
  afterEach(() => { vi.restoreAllMocks(); });

  const show = (seq: number, step: number, at = NOW) => {
    page.indicators = { [KEY]: { text: "↑2", seq, at } };
    page.step = step;
    act(() => root.render(<ListPage view="prioritized" />));
  };
  /** The fades started so far: the row's highlight and the indicator text. */
  const fades = () => ({
    highlight: animate.mock.calls.filter(([frames]) => frames[0].backgroundColor !== undefined).map(([, t]) => t),
    text: animate.mock.calls.filter(([frames]) => frames.length === 2 && frames[1].opacity === 0).map(([, t]) => t),
  });

  it("show the change at full strength for 10 s, then fade it and the highlight over 2.5 s with ease-in", () => {
    show(1, 1);
    expect(host.querySelector(".indicator")?.textContent).toBe("↑2");
    const { highlight, text } = fades();
    expect(highlight).toEqual([expect.objectContaining({ duration: 2500, delay: 10_000, easing: "ease-in" })]);
    expect(text).toEqual([expect.objectContaining({ duration: 2500, delay: 10_000, easing: "ease-in" })]);
  });

  it("with reduced motion, still hold and fade", () => {
    window.matchMedia = ((q: string) => ({ matches: true, media: q, addEventListener: () => {}, removeEventListener: () => {} })) as never;
    show(1, 1);
    expect(host.querySelector(".table")?.classList.contains("reduced")).toBe(true);
    const { highlight, text } = fades();
    expect(highlight.map((t) => t.delay)).toEqual([10_000]);
    expect(text.map((t) => t.delay)).toEqual([10_000]);
  });

  it("restart for a new change to the row, but not for another row's update", () => {
    show(1, 1);
    show(2, 2);
    expect(fades().highlight).toHaveLength(2);
    expect(fades().text).toHaveLength(2);
    show(2, 3);
    expect(fades().highlight).toHaveLength(2);
    expect(fades().text).toHaveLength(2);
  });

  it("pause while the tab is hidden", () => {
    const anim = { pause: vi.fn(), play: vi.fn(), cancel: vi.fn(), playState: "running" };
    animate.mockReturnValue(anim);
    show(1, 1);
    const setHidden = (hidden: boolean) => {
      Object.defineProperty(document, "hidden", { value: hidden, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    };
    setHidden(true);
    expect(anim.pause).toHaveBeenCalledTimes(2); // the highlight and the indicator
    setHidden(false);
    expect(anim.play).toHaveBeenCalledTimes(2);
    delete (document as { hidden?: boolean }).hidden;
  });

  it("pick up part-way through on a row that comes into view later", () => {
    show(1, 0, NOW - 1000); // changed 1 s ago, on another page; no step plays here
    expect(fades().highlight.map((t) => t.delay)).toEqual([9_000]);
    expect(fades().text.map((t) => t.delay)).toEqual([9_000]);
  });
});

describe("the next step menu (LIST-44)", () => {
  const button = () => host.querySelector<HTMLButtonElement>("#next-step-menu")!;
  const menu = () => host.querySelector('[role="menu"]');
  const items = () => [...host.querySelectorAll<HTMLButtonElement>('[role="menuitemcheckbox"]')];
  const choice = (name: string) => items().find((b) => b.textContent!.replace(/\d+$/, "") === name)!;
  const key = (k: string) => act(() => { (document.activeElement as HTMLElement).dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true })); });
  const rerender = (query: string) => { page.query = query; act(() => root.render(<ListPage view="prioritized" />)); };

  it("opens from its button with the groups, each next step and counts, and focuses the first choice", () => {
    expect(menu()).toBeNull();
    click(button());
    expect(button().getAttribute("aria-expanded")).toBe("true");
    expect(items().map((b) => b.textContent)).toEqual([
      "On you2", "Review1", "Respond0", "To do1", "Backlog0", "Not on you1", "Waiting1", "Elsewhere0", "Not yours0",
    ]);
    expect(items().every((b) => b.getAttribute("aria-checked") === "false")).toBe(true);
    expect(menu()!.textContent).toContain("Team review counts as Review");
    expect(document.activeElement).toBe(items()[0]);
  });

  it("chooses a group or a next step with a history entry, and stays open (LIST-40)", () => {
    click(button());
    click(choice("On you"));
    expect(nav).toHaveBeenLastCalledWith("/?step=on_you", undefined);
    click(choice("Waiting"));
    expect(nav).toHaveBeenLastCalledWith("/?step=waiting", undefined);
    expect(menu()).not.toBeNull();
  });

  it("ticks what the URL chooses, a group partly, and adds to it or clears it", () => {
    rerender("step=review");
    click(button());
    expect(choice("On you").getAttribute("aria-checked")).toBe("mixed");
    expect(choice("Review").getAttribute("aria-checked")).toBe("true");
    expect(choice("Not on you").getAttribute("aria-checked")).toBe("false");
    click(choice("On you")); // some chosen: choose the rest
    expect(nav).toHaveBeenLastCalledWith("/?step=on_you", undefined);
    click(choice("Review")); // the only one chosen: unticking it shows every item
    expect(nav).toHaveBeenLastCalledWith("/", undefined);
    rerender("step=on_you,waiting");
    expect(choice("On you").getAttribute("aria-checked")).toBe("true");
    click(choice("On you")); // all chosen: clear them
    expect(nav).toHaveBeenLastCalledWith("/?step=waiting", undefined);
  });

  it("moves between choices with the arrow keys, Home and End", () => {
    click(button());
    key("ArrowDown");
    expect(document.activeElement).toBe(items()[1]);
    key("End");
    expect(document.activeElement).toBe(items()[8]);
    key("ArrowDown"); // wraps
    expect(document.activeElement).toBe(items()[0]);
    key("ArrowUp");
    expect(document.activeElement).toBe(items()[8]);
    key("Home");
    expect(document.activeElement).toBe(items()[0]);
  });

  it("closes on Escape, returning focus to its button, and for a click elsewhere", () => {
    click(button());
    key("Escape");
    expect(menu()).toBeNull();
    expect(document.activeElement).toBe(button());
    expect(button().getAttribute("aria-expanded")).toBe("false");
    click(button());
    act(() => { menu()!.dispatchEvent(new MouseEvent("mousedown", { bubbles: true })); });
    expect(menu()).not.toBeNull();
    act(() => { document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true })); });
    expect(menu()).toBeNull();
  });

  it("closes when focus moves out of it, as with Tab", () => {
    click(button());
    act(() => host.querySelector<HTMLInputElement>("#list-search")!.focus());
    expect(menu()).toBeNull();
  });
});

describe("\"Show only\" in the rank reasoning popup (LIST-46)", () => {
  const only = () => [...(popup()?.querySelectorAll("button") ?? [])].find((b) => b.textContent!.startsWith("Show only"));

  it("filters to the item's next step, closes the popup and moves focus to the menu's button", () => {
    click(chips()[0]);
    expect(only()!.textContent).toBe("Show only To do");
    click(only()!);
    expect(nav).toHaveBeenLastCalledWith("/?step=todo", undefined);
    expect(popup()).toBeNull();
    expect(document.activeElement).toBe(host.querySelector("#next-step-menu"));
  });

  it("isn't offered while the list already shows only that next step", () => {
    page.query = "step=todo";
    act(() => root.render(<ListPage view="prioritized" />));
    click(chips()[0]);
    expect(popup()).not.toBeNull();
    expect(only()).toBeUndefined();
    act(() => { document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true })); });
    page.query = "step=todo,review";
    act(() => root.render(<ListPage view="prioritized" />));
    click(chips()[0]);
    expect(only()!.textContent).toBe("Show only To do");
  });
});
