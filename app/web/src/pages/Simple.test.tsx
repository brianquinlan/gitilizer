// The sign-in page (PRD AUTH-4), as static markup.
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

// ListPage's chip comes with the router and the store, which need a browser.
vi.mock("../router.tsx", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => createElement("a", { href: to }, children),
  navigate: () => {},
  useRoute: () => ({ path: "/", query: new URLSearchParams() }),
}));
vi.mock("../store.tsx", () => ({ useStore: () => ({}) }));
vi.stubGlobal("location", { search: "", pathname: "/sign-in" });
vi.stubGlobal("history", { replaceState: () => {} });

import { SignInPage } from "./Simple.tsx";

const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/\s+/g, " ");

describe("the sign-in page (AUTH-4)", () => {
  const html = renderToStaticMarkup(<SignInPage />);

  it("shows each preview row's next step, as the Prioritized list does (LIST-42)", () => {
    const metas = [...html.matchAll(/<span class="issue-meta">(.*?)<\/span><\/span><\/span>/g)].map((m) => m[1]);
    expect(metas).toHaveLength(10);
    expect(metas[0]).toMatch(/^<span class="next-step todo">To do<\/span> Issue #1842 · Assigned to you$/);
    // All seven next steps appear.
    for (const step of ["review", "respond", "todo", "backlog", "waiting", "elsewhere", "not-yours"]) {
      expect(html).toContain(`class="next-step ${step}"`);
    }
  });

  it("explains setup as it is now: GitHub in one click, then an optional Gemini key", () => {
    expect(text(html)).toContain(
      "Sign in first. Connect your tools next. You'll connect GitHub in one click, so that Gitilizer can read your issues and PRs (it can't change anything on GitHub). Then add a free Gemini API key for the best ranking, or skip it for now.",
    );
    expect(text(html)).not.toContain("personal access token");
  });
});
