// Search and the type filter on the list (PRD LIST-34 to LIST-41, KEY-1, KEY-3), as static markup.
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SORT_ICEBOX, DEFAULT_SORT_PRIORITIZED, type ItemRow } from "@gitilizer/shared";
import { init, type Live, type View } from "../live/engine.ts";

// The store, the router and the live list need a browser; the page only needs their values.
const page = vi.hoisted(() => ({ search: "", shortcuts: true as boolean | null, firstSyncDone: true, live: null as unknown }));
vi.mock("../store.tsx", () => ({
  useStore: () => ({
    me: { firstSyncDone: page.firstSyncDone, rankingAgent: "gemini" },
    sorts: { prioritized: DEFAULT_SORT_PRIORITIZED, icebox: DEFAULT_SORT_ICEBOX },
    setSort: () => {}, sync: { running: false, lastFinishedAt: null, progress: null }, shortcuts: page.shortcuts,
  }),
}));
vi.mock("../router.tsx", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => createElement("a", { href: to }, children),
  navigate: () => {},
  useRoute: () => ({ path: "/", query: new URLSearchParams(page.search), hash: "" }),
}));
vi.mock("../live/useLive.ts", () => ({
  useLive: () => ({
    live: page.live, indicators: {}, collapsing: new Set(), announcement: "", step: 0, tableProps: {},
    holdForPopup: () => {}, moveToIcebox: () => {}, restore: () => {},
  }),
}));
vi.stubGlobal("window", { matchMedia: () => ({ matches: false }) });

import { ListPage } from "./ListPage.tsx";

const item = (number: number, kind: "pr" | "issue", repo: string, title: string, score: number, extra: Partial<ItemRow> = {}): ItemRow => ({
  key: `${repo}#${number}`, repo, number, kind, title, htmlUrl: "", updatedAt: "2026-11-15T00:00:00Z", reasons: ["assigned"], mentionHandle: null,
  status: "active", iceboxedAt: null, score, rankFailed: false, waiting: false, ...extra,
});
const ITEMS = [
  item(1842, "issue", "northstar/api", "Connection pool exhausted after database failover", 0.95),
  item(731, "pr", "northstar/api", "Retry failed webhooks with exponential backoff", 0.9),
  item(416, "issue", "northstar/cli", "Token refresh fails in headless environments", 0.85),
  item(729, "pr", "northstar/api", "Prevent duplicate events on reconnect", 0.8),
  item(962, "issue", "northstar/web", "Session cookie expires during active use", 0.75),
  item(955, "pr", "northstar/web", "Add keyboard navigation to command menu", 0.7),
];
const list = (items: ItemRow[]): Live => init(items, 1);
const render = (search: string, live: Live | null, view: View = "prioritized") => {
  page.search = search;
  page.live = live;
  return renderToStaticMarkup(<ListPage view={view} />);
};
const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const ranksShown = (html: string) => [...html.matchAll(/class="rank[^"]*">(\d+)</g)].map((m) => Number(m[1]));
const titles = (html: string) => [...html.matchAll(/class="issue-title"[^>]*>([^<]+)</g)].map((m) => m[1]);
const PLACEHOLDER = 'placeholder="Search title, repo or #number"';

describe("search and the type filter on the list", () => {
  beforeEach(() => { page.shortcuts = true; page.firstSyncDone = true; });

  it("shows the strip above the column headings, with the whole list and its count (LIST-34)", () => {
    const html = render("", list(ITEMS));
    expect(html.indexOf(PLACEHOLDER)).toBeGreaterThan(-1);
    expect(html.indexOf(PLACEHOLDER)).toBeLessThan(html.indexOf('role="table"'));
    expect(html).toMatch(/<button type="button" aria-pressed="true">All<\/button>/);
    expect(html).toMatch(/<button type="button" aria-pressed="false">PRs<\/button>/);
    expect(html).toMatch(/<button type="button" aria-pressed="false">Issues<\/button>/);
    expect(ranksShown(html)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(text(html)).toContain("6 issues and PRs");
    expect(html).not.toContain("Clear search");
  });

  it("keeps the strip while loading, during the first sync and when the list is empty (LIST-34)", () => {
    expect(render("", null)).toContain(PLACEHOLDER);
    expect(render("", list([]))).toContain(PLACEHOLDER);
    page.firstSyncDone = false;
    expect(render("", list([]))).toContain(PLACEHOLDER);
  });

  it("narrows the list and keeps each item's rank in the whole list (LIST-35 to LIST-38)", () => {
    const html = render("type=pr&q=api", list(ITEMS));
    expect(titles(html)).toEqual(["Retry failed webhooks with exponential backoff", "Prevent duplicate events on reconnect"]);
    expect(ranksShown(html)).toEqual([2, 4]);
    expect(text(html)).toContain("2 of 6 issues and PRs");
    expect(html).toMatch(/aria-pressed="true">PRs</);
    expect(html).toContain('value="api"');
    expect(html).toContain('aria-label="Clear search"');
  });

  it("filters by type alone, and searches the number with or without #", () => {
    expect(ranksShown(render("type=issue", list(ITEMS)))).toEqual([1, 3, 5]);
    expect(ranksShown(render("q=%23955", list(ITEMS)))).toEqual([6]);
    expect(ranksShown(render("q=955", list(ITEMS)))).toEqual([6]);
    expect(text(render("q=955", list(ITEMS)))).toContain("1 of 6 issues and PRs");
  });

  it("says when nothing matches, and offers to clear the filters (LIST-39)", () => {
    const html = render("type=issue&q=kubernetes", list(ITEMS));
    const t = text(html);
    expect(t).toContain("No matching issues or PRs");
    expect(html).toMatch(/<button type="button" class="btn">Clear filters<\/button>/);
    expect(t).toContain("0 of 6 issues and PRs");
    expect(t).not.toContain("No issues or PRs to show");
    // LIST-12: the pagination row is still there, with one page and both buttons disabled.
    expect(html).toMatch(/<button disabled="">.*?Previous<\/button>/);
    expect(html).toMatch(/<button class="page" aria-current="page">1<\/button>/);
    expect(html).toMatch(/<button disabled="">Next/);
  });

  it("shows the empty state, not \"No matching\", when there are no items at all (LIST-14, LIST-39)", () => {
    const t = text(render("type=pr&q=api", list([])));
    expect(t).toContain("No issues or PRs to show");
    expect(t).not.toContain("No matching issues or PRs");
  });

  it("stays in the first-sync state while nothing ranked so far matches (LIST-15, LIST-39)", () => {
    page.firstSyncDone = false;
    const waiting = text(render("type=pr&q=kubernetes", list(ITEMS)));
    expect(waiting).toContain("Scanning your issues and PRs…");
    expect(waiting).not.toContain("No matching issues or PRs");
    // The first item that matches replaces the skeleton rows.
    expect(titles(render("type=pr&q=api", list(ITEMS)))).toHaveLength(2);
  });

  it("works the same in the Icebox, which has no ranks (ICE-7, ICE-8)", () => {
    const iced = ITEMS.map((i) => ({ ...i, status: "iceboxed" as const, iceboxedAt: "2026-11-14T00:00:00Z" }));
    const html = render("type=pr&q=api", list(iced), "icebox");
    expect(titles(html)).toEqual(["Prevent duplicate events on reconnect", "Retry failed webhooks with exponential backoff"]); // PRs by number (ICE-4)
    expect(ranksShown(html)).toEqual([]);
    expect(text(html)).toContain("2 of 6 issues and PRs");
    expect(text(render("q=kubernetes", list(iced), "icebox"))).toContain("No matching issues or PRs");
    expect(text(render("q=kubernetes", list([]), "icebox"))).toContain("No issues or PRs in the Icebox");
  });

  it("hints at the \"/\" shortcut in the empty field only while shortcuts are on (KEY-1, KEY-3)", () => {
    const on = render("", list(ITEMS));
    expect(on).toContain('<kbd class="keycap" aria-hidden="true">/</kbd>');
    expect(on).toContain('aria-keyshortcuts="/"');
    expect(render("q=api", list(ITEMS))).not.toContain("<kbd"); // the clear button takes its place
    for (const off of [false, null]) { // turned off, or not known yet
      page.shortcuts = off;
      const html = render("", list(ITEMS));
      expect(html).not.toContain("<kbd");
      expect(html).not.toContain("aria-keyshortcuts");
      expect(html).toContain(PLACEHOLDER);
    }
  });
});
