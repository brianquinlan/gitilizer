// @vitest-environment jsdom
// The live list in a browser DOM, with the real useLive (PRD LIVE-4, LIVE-5, LIVE-28 to LIVE-30): how long the pointer
// and focus hold updates, focus staying on a row that moves, and catching up on changes the tab missed.
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SORT_ICEBOX, DEFAULT_SORT_PRIORITIZED, type ItemRow, type ListEvent } from "@gitilizer/shared";

const h = vi.hoisted(() => ({
  list: null as null | ((e: unknown) => void),
  reconnect: null as null | (() => void),
  server: { version: 1, items: [] as unknown[] },
  gets: [] as string[],
}));
vi.mock("../store.tsx", () => ({
  useStore: () => ({
    me: { firstSyncDone: true, rankingAgent: "gemini" },
    sorts: { prioritized: DEFAULT_SORT_PRIORITIZED, icebox: DEFAULT_SORT_ICEBOX },
    setSort: () => {}, sync: { running: false, lastSyncedAt: null, progress: null }, shortcuts: true, notifications: [],
    onList: (l: (e: unknown) => void) => { h.list = l; return () => { h.list = null; }; },
    onReconnect: (l: () => void) => { h.reconnect = l; return () => { h.reconnect = null; }; },
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
vi.mock("../api.ts", () => ({
  ApiError: class extends Error {},
  api: {
    get: async (url: string) => {
      h.gets.push(url);
      const known = new URL(url, "http://x").searchParams.get("known");
      return known !== null && Number(known) === h.server.version
        ? { version: h.server.version, items: [], unchanged: true }
        : { version: h.server.version, items: h.server.items };
    },
    post: async () => ({}), put: async () => ({}),
  },
}));

const { ListPage } = await import("../pages/ListPage.tsx");

const item = (number: number, score = 1 - number / 100): ItemRow => ({
  key: `northstar/api#${number}`, repo: "northstar/api", number, kind: "issue", title: `Item ${number}`,
  htmlUrl: `https://github.com/northstar/api/issues/${number}`, updatedAt: "2026-11-15T00:00:00Z", reasons: ["assigned"],
  mentionHandle: null, status: "active", iceboxedAt: null, score, rankFailed: false, waiting: false,
});

let root: Root;
let host: HTMLDivElement;
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(async () => {
  vi.useFakeTimers();
  window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener: () => {}, removeEventListener: () => {} })) as never;
  (Element.prototype as { animate?: unknown }).animate ??= () => ({ pause() {}, play() {}, cancel() {}, playState: "finished" });
  h.server = { version: 1, items: [item(1), item(2), item(3)] };
  h.gets = [];
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  await act(async () => { root.render(<ListPage view="prioritized" />); });
  await wait(200);
});
afterEach(() => { act(() => root.unmount()); host.remove(); vi.useRealTimers(); });

async function wait(ms: number) { await act(async () => { await vi.advanceTimersByTimeAsync(ms); }); }
const titles = () => [...host.querySelectorAll<HTMLAnchorElement>("a.issue-title")].map((a) => a.textContent);
const link = (n: number) => [...host.querySelectorAll<HTMLAnchorElement>("a.issue-title")].find((a) => a.textContent === `Item ${n}`)!;
const rowGroup = () => host.querySelector<HTMLElement>('[role="rowgroup"]')!;
const push = (e: Partial<ListEvent> & { version: number }) => act(() => h.list!({ bulk: false, upserts: [], removals: [], ...e }));
/** Item 3 is ranked again, to the top. */
const moveThreeUp = (version = 2) => push({ version, upserts: [item(3, 0.999)] });
const pointer = (type: string, el: Element, x = 5) => act(() => { el.dispatchEvent(new MouseEvent(type, { bubbles: true, screenX: x, screenY: 5 })); });

describe("how long the pointer and focus hold updates (LIVE-28)", () => {
  it("lets updates play 30 s after a click left focus on a title, without the developer clicking elsewhere", async () => {
    act(() => link(1).focus());
    moveThreeUp();
    await wait(29_000);
    expect(titles()).toEqual(["Item 1", "Item 2", "Item 3"]);
    await wait(2000);
    expect(titles()).toEqual(["Item 3", "Item 1", "Item 2"]);
  });

  it("holds them again for 30 s from anything the developer does in the table", async () => {
    act(() => link(1).focus());
    moveThreeUp();
    await wait(20_000);
    pointer("pointermove", rowGroup(), 40);
    await wait(25_000);
    expect(titles()).toEqual(["Item 1", "Item 2", "Item 3"]);
    await wait(6000);
    expect(titles()).toEqual(["Item 3", "Item 1", "Item 2"]);
  });

  it("lets them play under a pointer resting on the table", async () => {
    pointer("pointerover", link(2));
    pointer("pointermove", link(2));
    moveThreeUp();
    await wait(5000);
    expect(titles()).toEqual(["Item 1", "Item 2", "Item 3"]);
    await wait(26_000);
    expect(titles()).toEqual(["Item 3", "Item 1", "Item 2"]);
  });

  it("catches up at once when the developer comes back from GitHub after 30 s, though the browser puts focus back on the title", async () => {
    act(() => link(1).focus());
    act(() => { window.dispatchEvent(new Event("blur")); link(1).blur(); });
    moveThreeUp();
    await wait(31_000);
    expect(titles()).toEqual(["Item 3", "Item 1", "Item 2"]); // played while the developer was away
    push({ version: 3, upserts: [item(2, 0.9999)] });
    act(() => link(1).focus()); // back: focus returns to the title
    await wait(1000);
    expect(titles()).toEqual(["Item 2", "Item 3", "Item 1"]);
  });
});

describe("focus on a row that moves (LIVE-29)", () => {
  // Browsers take focus off an element that is moved in the DOM (taken out and put back); jsdom doesn't, so the
  // tests do it for it.
  beforeEach(() => {
    for (const method of ["insertBefore", "appendChild"] as const) {
      const real = Node.prototype[method] as (...a: unknown[]) => Node;
      vi.spyOn(Node.prototype, method).mockImplementation(function (this: Node, ...args: unknown[]) {
        const node = args[0] as Node;
        const active = document.activeElement;
        if (node.isConnected && active instanceof HTMLElement && node.contains(active)) active.blur();
        return real.apply(this, args);
      } as never);
    }
  });
  afterEach(() => { vi.restoreAllMocks(); });

  it("stays on the control that had it, in a row that the update moves in the DOM", async () => {
    // Item 3 going to the top moves the rows of items 1 and 2 in the DOM, which takes focus off a moved element.
    act(() => link(1).focus());
    moveThreeUp();
    await wait(31_000);
    expect(titles()).toEqual(["Item 3", "Item 1", "Item 2"]);
    expect(document.activeElement).toBe(link(1));
  });

  it("doesn't hold the next update another 30 s because focus was put back", async () => {
    act(() => link(1).focus());
    moveThreeUp();
    await wait(31_000);
    expect(titles()).toEqual(["Item 3", "Item 1", "Item 2"]);
    push({ version: 3, upserts: [item(2, 0.9999)] }); // moves the rows of items 3 and 1
    await wait(1500);
    expect(titles()).toEqual(["Item 2", "Item 3", "Item 1"]);
    expect(document.activeElement).toBe(link(1));
  });

  it("doesn't follow a row off the page", async () => {
    act(() => link(2).focus());
    push({ version: 2, removals: [{ key: "northstar/api#2", reason: "over_limit" }] });
    await wait(31_000);
    expect(titles()).toEqual(["Item 1", "Item 3"]);
    expect(host.contains(document.activeElement)).toBe(false);
  });
});

describe("catching up on missed changes (LIVE-30)", () => {
  it("reads the list when the versions jump, and applies what it missed in one step without indicators", async () => {
    h.server = { version: 4, items: [item(1, 0.1), item(2), item(4)] };
    push({ version: 4, upserts: [item(4)] }); // versions 2 and 3 were lost
    await wait(1000);
    expect(h.gets.at(-1)).toBe("/api/list?known=1");
    expect(titles()).toEqual(["Item 2", "Item 4", "Item 1"]);
    expect(host.querySelector(".indicator")).toBeNull();
    moveThreeUp(5); // gone from the list it read, so it comes back as new
    await wait(1000);
    expect(titles()).toEqual(["Item 3", "Item 2", "Item 4", "Item 1"]);
  });

  it("asks on reconnecting, and changes nothing when nothing was missed", async () => {
    act(() => h.reconnect!());
    await wait(500);
    expect(h.gets.at(-1)).toBe("/api/list?known=1");
    expect(titles()).toEqual(["Item 1", "Item 2", "Item 3"]);
    h.server = { version: 2, items: [item(1), item(2)] };
    act(() => h.reconnect!());
    await wait(1000);
    expect(titles()).toEqual(["Item 1", "Item 2"]);
  });

  it("waits like any other update while the pointer is busy on the table", async () => {
    h.server = { version: 2, items: [item(3, 0.999), item(1), item(2)] };
    pointer("pointerover", link(1));
    pointer("pointermove", link(1), 7);
    act(() => h.reconnect!());
    await wait(10_000);
    expect(titles()).toEqual(["Item 1", "Item 2", "Item 3"]);
    await wait(21_000);
    expect(titles()).toEqual(["Item 3", "Item 1", "Item 2"]);
  });

  it("reads the whole list when the server says events were lost", async () => {
    h.server = { version: 1, items: [item(2), item(1)] };
    push({ version: 1, resync: true });
    await wait(1000);
    expect(h.gets.at(-1)).toBe("/api/list");
    expect(titles()).toEqual(["Item 1", "Item 2"]);
  });
});
