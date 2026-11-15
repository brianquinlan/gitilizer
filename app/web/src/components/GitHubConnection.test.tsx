// The Settings GitHub card's states (PRD SET-46, SET-47), as static markup.
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { GitHubConnection, Me } from "@gitilizer/shared";
import { GitHubCard } from "./GitHubConnection.tsx";

const status = (set: boolean) => ({ set, chip: set ? "connected" : "not_set", expiresAt: null }) as const;
const me = (github: Partial<Me["github"]>, pat = false) => ({
  credentials: { github_pat: status(pat), gemini_key: status(true), anthropic_key: status(false), openai_key: status(false) },
  github: { method: null, login: null, avatarUrl: null, chip: "not_set", app: true, installUrl: "https://github.com/apps/gitilizer/installations/new", ...github },
}) as unknown as Me;
const details = (over: Partial<GitHubConnection>): GitHubConnection => ({
  method: "app", login: "octo", avatarUrl: null, app: true, ended: false, installUrl: null, installations: [], pending: [], ...over,
});
const render = (m: Me, d: GitHubConnection | null = null, result: "cancelled" | "failed" | null = null) =>
  renderToStaticMarkup(<GitHubCard me={m} details={d} result={result} value="" onChange={() => {}} docs="https://docs.example/tokens" />);
const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/\s+/g, " ");

describe("the GitHub card", () => {
  it("offers the connection when nothing is connected, with the token as the alternative", () => {
    const html = render(me({}));
    expect(text(html)).toContain("Not set");
    expect(html).toContain('id="github-connect"');
    expect(html).toContain('href="/api/connect/github/start?next=%2Fsettings%23connections"');
    expect(text(html)).toContain("Read-only access to your issues and pull requests. Gitilizer can't change anything on GitHub.");
    expect(text(html)).toContain("Or use a personal access token");
    expect(html).not.toContain("<input");
  });

  it("shows the account and what Gitilizer can read when the app is connected", () => {
    const html = render(me({ method: "app", login: "octo", chip: "needs_attention" }), details({
      installations: [
        { account: "octo", accountType: "User", avatarUrl: null, selection: "all", repoCount: null, missing: [] },
        { account: "acme", accountType: "Organization", avatarUrl: null, selection: "selected", repoCount: 3, missing: [] },
        { account: "bigco", accountType: "Organization", avatarUrl: null, selection: "all", repoCount: null, missing: ["pull_requests"] },
      ],
      pending: [{ account: "waiting-co", avatarUrl: null }],
    }));
    const t = text(html);
    expect(t).toContain("Needs attention");
    expect(t).toContain("@octo");
    expect(t).toContain("Connected with the Gitilizer app · Read-only");
    expect(t).toContain("What Gitilizer can read");
    expect(t).toContain("Every public repository, in any account");
    expect(t).toContain("Private repositories: all");
    expect(t).toContain("Private repositories: 3 selected");
    expect(t).toContain("Pull requests aren't shared, so its private PRs are missing");
    expect(t).toContain("Review on GitHub");
    expect(t).toContain("Private repositories: waiting for an owner to approve");
    expect(t).toContain("Add or change private repositories");
    expect(t).toContain("Use a personal access token instead");
    expect(t).toContain("Reconnect");
    expect(html).not.toContain("<input");
  });

  it("says the connection has ended, and offers to reconnect", () => {
    const t = text(render(me({ method: "app", login: "octo", chip: "not_working" })));
    expect(t).toContain("Not working");
    expect(t).toContain("Your GitHub connection has ended");
    expect(t).toContain("Reconnect GitHub");
    expect(t).not.toContain("What Gitilizer can read");
  });

  it("keeps the token field for a token in use, and offers the connection under it", () => {
    const html = render(me({ method: "pat", login: "octo", chip: "connected" }, true), null, "cancelled");
    const t = text(html);
    expect(html).toContain("<input");
    expect(t).toContain("No token to create or renew: connect with one click instead.");
    expect(t).toContain("Connect GitHub");
    expect(t).toContain("GitHub wasn't connected.");
  });

  it("has only the token field where the Gitilizer app isn't set up", () => {
    const html = render(me({ app: false, installUrl: null }));
    expect(html).toContain("<input");
    expect(html).not.toContain("github-connect");
    expect(text(html)).not.toContain("Connect GitHub");
  });
});
