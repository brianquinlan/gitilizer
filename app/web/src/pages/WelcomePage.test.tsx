// Warm Welcome's two steps (PRD WEL-2 to WEL-6), as static markup.
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Me } from "@gitilizer/shared";

// The store and the router need a browser; the page only needs the account and a link.
const store = vi.hoisted(() => ({ me: null as unknown }));
vi.mock("../store.tsx", () => ({ useStore: () => ({ me: store.me, refreshMe: async () => {} }) }));
vi.mock("../router.tsx", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => createElement("a", { href: to }, children),
  navigate: () => {},
}));
vi.stubGlobal("location", { search: "" });

import { WelcomePage } from "./WelcomePage.tsx";

const status = (set: boolean) => ({ set, chip: set ? "connected" : "not_set", expiresAt: null }) as const;
const me = (github: Partial<Me["github"]>, geminiKey = false) => ({
  credentials: { github_pat: status(false), gemini_key: status(geminiKey), anthropic_key: status(false), openai_key: status(false) },
  github: { method: null, login: null, avatarUrl: null, chip: "not_set", app: true, installUrl: "https://github.com/apps/gitilizer/installations/new", ...github },
  rankingAgent: "gemini", rankingChosen: false,
}) as unknown as Me;
const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/\s+/g, " ");
const render = (m: Me) => { store.me = m; return renderToStaticMarkup(<WelcomePage />); };

describe("Warm Welcome", () => {
  beforeEach(() => { store.me = null; });

  it("step 1 connects GitHub, and offers Advanced setup for everything else (WEL-2, WEL-6)", () => {
    const html = render(me({}));
    const t = text(html);
    expect(t).toContain("Welcome to your prioritized inbox");
    expect(t).toContain("Connect GitHub to get started. Add a free Gemini API key for the best ranking, or skip it for now.");
    expect(html).toContain('href="/api/connect/github/start?next=%2F"');
    expect(t).toContain("What Gitilizer can read");
    expect(t).toContain("Read-only access to your issues and pull requests. Gitilizer can't change anything on GitHub.");
    expect(t).toContain("Using Claude, OpenAI or a personal access token?");
    expect(html).toContain('<a href="/settings#connections">Advanced setup</a>');
    // No key field, no token field and no button yet.
    expect(html).not.toContain("<input");
    expect(html).not.toContain("<button");
  });

  it("step 2 shows the connection and the optional Gemini key, with one button for basic ranking (WEL-3, WEL-4)", () => {
    const html = render(me({ method: "app", login: "octo" }));
    const t = text(html);
    expect(t).toContain("Connected as @octo");
    expect(t).toContain("Public repositories Included");
    expect(html).toContain('href="https://github.com/apps/gitilizer/installations/new"');
    expect(t).toContain("Gemini API key Recommended Free tier available Get an API key");
    expect(html).toContain('placeholder="Paste your key, or leave blank"');
    expect(t).toContain("Without a key you get basic ranking: good for your top items, less precise below them, with no explanation for each rank. Compare");
    expect(html).toContain("user-guide.md#basic-ranking");
    expect(t).toContain("Continue with basic ranking You can add a key anytime in Settings.");
    // What step 1 had is gone: the link, the note and the Advanced setup line.
    expect(t).not.toContain("What Gitilizer can read");
    expect(t).not.toContain("Read-only access");
    expect(t).not.toContain("Advanced setup");
    expect(html).not.toContain('id="github-connect"');
  });

  it("offers \"Save and start\", without the note, when a key is already saved (WEL-4)", () => {
    const t = text(render(me({ method: "app", login: "octo" }, true)));
    expect(t).toContain("Save and start");
    expect(t).not.toContain("Continue with basic ranking");
    expect(t).not.toContain("You can add a key anytime in Settings.");
  });

  it("is on step 2 for a token saved in Settings, with no link to add private repositories", () => {
    // The server names the app's install page whenever it has an app, whichever way GitHub is connected.
    const html = render(me({ method: "pat", login: null }));
    const t = text(html);
    expect(t).toContain("Connected with a personal access token");
    expect(t).toContain("Public repositories Included");
    expect(t).not.toContain("Private repositories");
    expect(html).not.toContain("installations/new");
  });

  it("points a server without the Gitilizer app to Advanced setup", () => {
    const html = render(me({ app: false }));
    expect(html).not.toContain('id="github-connect"');
    expect(text(html)).toContain("Add a personal access token in Advanced setup.");
  });
});
