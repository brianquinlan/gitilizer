// The list as static markup: search and the type filter (PRD LIST-34 to LIST-41, KEY-1, KEY-3), next steps and the chip that opens the rank reasoning popup (LIST-42, LIST-24),
// and Sync now while GitHub can't be read (LIST-43).
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SORT_ICEBOX, DEFAULT_SORT_PRIORITIZED, type ItemRow } from "@gitilizer/shared";
import { init, type Live, type View } from "../live/engine.ts";

// The store, the router and the live list need a browser; the page only needs their values.
const page = vi.hoisted(() => ({
  search: "", shortcuts: true as boolean | null, firstSyncDone: true, live: null as unknown,
  notifications: [] as { code: string }[], running: false,
}));
vi.mock("../store.tsx", () => ({
  useStore: () => ({
    me: { firstSyncDone: page.firstSyncDone, rankingAgent: "gemini" },
    sorts: { prioritized: DEFAULT_SORT_PRIORITIZED, icebox: DEFAULT_SORT_ICEBOX },
    setSort: () => {}, sync: { running: page.running, lastFinishedAt: null, progress: null }, shortcuts: page.shortcuts,
    notifications: page.notifications,
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

import { ListPage, RankWhy } from "./ListPage.tsx";

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

describe("next steps on the list (LIST-42, LIST-24)", () => {
  beforeEach(() => { page.shortcuts = true; page.firstSyncDone = true; });
  const steps = [
    item(1842, "issue", "northstar/api", "Connection pool exhausted after database failover", 0.95, { nextStep: "todo", nextAction: "Check the hotfix." }),
    item(731, "pr", "northstar/api", "Retry failed webhooks with exponential backoff", 0.9, { nextStep: "backlog" }),
    item(416, "issue", "northstar/cli", "Token refresh fails in headless environments", 0.85, { nextStep: "not_yours" }),
    item(729, "pr", "northstar/api", "Prevent duplicate events on reconnect", 0.8), // ranked before next steps existed
  ];
  const metas = (html: string) => [...html.matchAll(/<span class="issue-meta">(.*?)<\/span><\/span><\/span>/g)].map((m) => m[1]);

  it("starts the line under the title with the next step's chip, before the type and number", () => {
    const m = metas(render("", list(steps)));
    expect(m).toHaveLength(4);
    expect(m[0]).toMatch(/^<span class="next-step todo">To do<\/span> <span class="num">Issue #1842<\/span> /);
    expect(m[1]).toMatch(/^<span class="next-step backlog">Backlog<\/span> <span class="num">PR #731<\/span> /);
    // Read in order, the parts are separate words ("To do Issue #1842 Assigned to you").
    expect(text(m[0]).trim()).toBe("To do Issue #1842 Assigned to you");
    expect(m[2]).toMatch(/^<span class="next-step not-yours">Not yours<\/span>/);
    expect(m[3]).toMatch(/^<span class="num">PR #729<\/span>/); // no next step, no chip
    // The inclusion reason is the part that is cut off, with its full text on hover.
    expect(m[0]).toContain('<span class="reason" title="Assigned to you">Assigned to you');
  });

  it("doesn't show next steps in the Icebox (ICE-3)", () => {
    const iced = steps.map((i) => ({ ...i, status: "iceboxed" as const, iceboxedAt: "2026-11-14T00:00:00Z" }));
    expect(render("", list(iced), "icebox")).not.toContain("next-step");
  });

  it("makes the chip a button that opens the popup when the item has reasoning, and leaves the rank plain", () => {
    const why = [{ ...steps[0], reasoning: "Because." }, { ...steps[1], reasoning: "Because." }, steps[2], { ...steps[3], reasoning: "Because." }];
    const html = render("", list(why));
    const m = metas(html);
    expect(m[0]).toMatch(/^<span class="next-step-cell"><button type="button" class="next-step todo" aria-expanded="false" aria-haspopup="dialog" aria-label="To do, why rank #1\?">To do<svg /);
    expect(m[1]).toContain('aria-label="Backlog, why rank #2?"');
    expect(m[2]).toMatch(/^<span class="next-step not-yours">Not yours<\/span>/); // no reasoning (basic ranking): a label
    expect(m[3]).toMatch(/^<span class="num">PR #729<\/span>/); // reasoning but no next step yet: no chip, no popup
    expect(html).not.toContain("rank-btn");
    expect(html).toMatch(/<span role="cell" class="rank">1<\/span>/);
    // Closed until the chip is clicked.
    expect(html).not.toContain("rank-why");
  });

  it("leads the popup with the next action, tinted like the chip, then the reasoning and a link to the item", () => {
    const row = { ...steps[0], reasoning: "Because.", htmlUrl: "https://github.com/northstar/api/issues/1842" };
    const html = renderToStaticMarkup(<RankWhy row={row} rank={1} />);
    expect(text(html).trim()).toBe("Next action Check the hotfix. Why rank #1? Because. northstar/api · Issue #1842");
    expect(html).toContain('<div class="rank-why-next todo"><span class="rank-why-label">Next action</span><p>Check the hotfix.</p></div>');
    expect(html).toContain('<a href="https://github.com/northstar/api/issues/1842" target="_blank" rel="noreferrer">Issue #1842<svg');
    expect(html).toContain('aria-label="Why rank #1?"');
    expect(html).not.toContain("rank-why-close");
    const notYours = renderToStaticMarkup(<RankWhy row={{ ...steps[2], reasoning: "Because.", nextAction: "Nothing to do." }} rank={3} />);
    expect(notYours).toContain('class="rank-why-next not-yours"');
    // No next action: no panel.
    expect(renderToStaticMarkup(<RankWhy row={{ ...steps[1], reasoning: "Because." }} rank={2} />)).not.toContain("rank-why-next");
  });
});

describe("Sync now while GitHub can't be read (LIST-43)", () => {
  beforeEach(() => { page.notifications = []; page.running = false; });
  const controls = () => {
    const html = render("", list(ITEMS));
    return html.slice(html.indexOf('class="controls"'), html.indexOf('class="table'));
  };

  it("is enabled, with no note, while GitHub can be read", () => {
    page.notifications = [{ code: "github_rate_limited" }, { code: "stale" }];
    const html = controls();
    expect(html).not.toContain("sync-note");
    expect(html).toMatch(/<button class="btn sync "[^>]*aria-busy="false">/);
    expect(html).not.toMatch(/<button[^>]*disabled/);
  });

  it("is disabled, with a link to reconnect named as its description, when the connection has ended", () => {
    page.notifications = [{ code: "stale" }, { code: "github_connection_ended" }];
    const html = controls();
    expect(html).toContain('<span id="sync-note" class="sync-progress"><a href="/settings#github-connect">Reconnect GitHub</a> to sync</span>');
    expect(html).toMatch(/<button class="btn sync "[^>]*disabled=""[^>]*aria-describedby="sync-note">/);
  });

  it("says how to fix each error that stops every scan", () => {
    const note = (code: string) => { page.notifications = [{ code }]; return text(controls().match(/<span id="sync-note".*?<\/span>/)![0]).trim(); };
    expect(note("github_missing")).toBe("Connect GitHub to sync");
    expect(note("github_expired")).toBe("Replace your token to sync");
    expect(note("github_invalid")).toBe("Replace your token to sync");
    expect(controls()).toContain('href="/settings#github-pat"');
    // Errors that leave some items readable don't disable it.
    page.notifications = [{ code: "github_permission_missing" }];
    expect(controls()).not.toContain("sync-note");
  });

  it("doesn't turn the icon or show progress for a scan that fails at once", () => {
    page.running = true;
    expect(controls()).toContain('class="btn sync syncing"');
    page.notifications = [{ code: "github_connection_ended" }];
    const html = controls();
    expect(html).not.toContain("syncing");
    expect(html).not.toContain("spin");
    expect(html).not.toContain("sync-progress\">Finding");
  });
});
