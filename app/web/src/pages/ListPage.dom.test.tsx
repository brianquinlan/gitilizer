// @vitest-environment jsdom
// The rank reasoning popup in a browser DOM (PRD LIST-24, LIST-42, LIVE-27): the next step chip opens and closes it,
// Escape and a click outside close it, Escape returns focus to the chip, and live updates hold while it is open.
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SORT_ICEBOX, DEFAULT_SORT_PRIORITIZED, type ItemRow } from "@gitilizer/shared";
import { init, type Live } from "../live/engine.ts";

const page = vi.hoisted(() => ({ live: null as unknown, hold: (_open: boolean) => {}, indicators: {} as Record<string, { text: string; seq: number; at: number }>, step: 0 }));
vi.mock("../store.tsx", () => ({
  useStore: () => ({
    me: { firstSyncDone: true, rankingAgent: "gemini" },
    sorts: { prioritized: DEFAULT_SORT_PRIORITIZED, icebox: DEFAULT_SORT_ICEBOX },
    setSort: () => {}, sync: { running: false, lastFinishedAt: null, progress: null }, shortcuts: true, notifications: [],
  }),
}));
vi.mock("../router.tsx", async () => {
  const { createElement } = await import("react");
  return {
    Link: ({ to, children }: { to: string; children: unknown }) => createElement("a", { href: to }, children as never),
    navigate: () => {},
    useRoute: () => ({ path: "/", query: new URLSearchParams(""), hash: "" }),
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
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener: () => {}, removeEventListener: () => {} })) as never;
  hold.mockClear();
  page.indicators = {};
  page.step = 0;
  page.hold = hold;
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
    expect(popup()?.textContent).toBe("Next actionCheck the hotfix.Why rank #1?Because.northstar/api · Issue #1842");
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

  it("show the change, and fade it and the highlight over 2.5 s with ease-in once the row is in place", () => {
    show(1, 1);
    expect(host.querySelector(".indicator")?.textContent).toBe("↑2");
    const { highlight, text } = fades();
    expect(highlight).toEqual([expect.objectContaining({ duration: 2500, delay: 700, easing: "ease-in" })]);
    expect(text).toEqual([expect.objectContaining({ duration: 2500, delay: 700, easing: "ease-in" })]);
  });

  it("with reduced motion, still fade, starting after the 150 ms cross-fade", () => {
    window.matchMedia = ((q: string) => ({ matches: true, media: q, addEventListener: () => {}, removeEventListener: () => {} })) as never;
    show(1, 1);
    expect(host.querySelector(".table")?.classList.contains("reduced")).toBe(true);
    const { highlight, text } = fades();
    expect(highlight.map((t) => t.delay)).toEqual([150]);
    expect(text.map((t) => t.delay)).toEqual([150]);
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

  it("pick up part-way through on a row that comes into view later", () => {
    show(1, 0, NOW - 1000); // changed 1 s ago, on another page; no step plays here
    expect(fades().highlight.map((t) => t.delay)).toEqual([-300]);
    expect(fades().text.map((t) => t.delay)).toEqual([-300]);
  });
});
