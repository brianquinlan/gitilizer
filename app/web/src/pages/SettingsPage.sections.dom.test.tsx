// @vitest-environment jsdom
// Settings in sections, in a browser DOM (PRD SET-57 to SET-60, NAV-3, NAV-8, NAV-9, SET-26): each section at its own
// address with the others hidden, links to a control opening its section (also from another section, for an old
// anchor and for a control that isn't showing), unknown addresses, one draft kept across sections, the save bar and
// the marks in the left column, "Discard changes", "Save changes" staying, "Save and re-rank" going to the list,
// leaving with unsaved changes, a missing key found from another section, and Settings opened during setup.
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Me, SettingsResponse } from "@gitilizer/shared";

const status = { set: true, chip: "connected" as const, expiresAt: null };
const ME: Me = {
  user: { id: "u1", name: "Maya Chen", email: "maya@example.com", avatarUrl: null, provider: "github", githubLogin: "mayachen" },
  screen: "app",
  credentials: { github_pat: { ...status, set: false, chip: "not_set" }, gemini_key: status, anthropic_key: { ...status, set: false, chip: "not_set" }, openai_key: { ...status, set: false, chip: "not_set" } },
  github: { method: "app", login: "mayachen", avatarUrl: null, chip: "connected", app: true, installUrl: null },
  rankingAgent: "gemini", rankingChosen: true, firstSyncDone: true,
  sync: { running: false, lastSyncedAt: null, progress: null },
};
const SETTINGS: SettingsResponse = {
  additionalRepos: [{ fullName: "northstar/api", prioritizationPrompt: "Security issues only", access: "ok", tokenType: null, ownerAvatarUrl: null, ownerType: "Organization" }],
  teams: [], excludedRepos: [], collaborators: [{ login: "jordanlee", status: "ok", avatarUrl: null }],
  customPrompt: null, defaultPrompt: "Rank what needs me first.",
  sortPrioritized: { key: "priority", dir: "desc" }, sortIcebox: { key: "modified", dir: "desc" }, keyboardShortcuts: true,
  rankingAgent: "gemini", rankingChosen: true, rankedBy: { gemini: 12 },
} as unknown as SettingsResponse;

const puts: unknown[] = [];
/** The account Settings sees, and the one refreshMe() reads after a save. */
const account: { me: Me; after: Me } = { me: ME, after: ME };
vi.mock("../store.tsx", () => ({ useStore: () => ({ me: account.me, refreshMe: async () => account.after, shortcuts: true, setShortcuts: () => {} }) }));
vi.mock("../api.ts", () => ({
  api: {
    get: async () => structuredClone(SETTINGS),
    put: async (_url: string, body: unknown) => { puts.push(body); return { ok: true }; },
    post: () => new Promise(() => {}),
    del: () => new Promise(() => {}),
  },
  ApiError: class extends Error {},
}));
// The GitHub card has its own tests; here it stands in without its token field, a control that isn't showing.
vi.mock("../components/GitHubConnection.tsx", async (actual) => ({
  ...(await actual<typeof import("../components/GitHubConnection.tsx")>()),
  GitHubCard: () => <div className="panel">GitHub card</div>,
  useGitHubConnection: () => null,
  useConnectResult: () => null,
}));

const { SettingsPage } = await import("./SettingsPage.tsx");
const { navigate, useRoute } = await import("../router.tsx");

/** As App does: Settings only on its own addresses. */
function Harness() {
  const { path } = useRoute();
  return path.startsWith("/settings") ? <SettingsPage /> : <div id="list">The list</div>;
}

let root: Root;
let host: HTMLDivElement;
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
Element.prototype.scrollIntoView = () => {};
window.scrollTo = (() => {}) as typeof window.scrollTo;

const settle = () => act(async () => { await new Promise((r) => setTimeout(r, 80)); });
const go = async (to: string) => { await act(async () => { navigate(to); }); await settle(); };
const where = () => location.pathname + location.hash;
const shown = () => [...host.querySelectorAll<HTMLElement>("[data-section]")].filter((s) => !s.hidden).map((s) => s.dataset.section);
const link = (name: string) => [...host.querySelectorAll<HTMLAnchorElement>(".side-nav a")].find((a) => a.textContent!.trim().startsWith(name))!;
const button = (name: string) => [...host.querySelectorAll<HTMLButtonElement>("button")].find((b) => b.textContent === name)!;
const click = async (el: HTMLElement) => { await act(async () => { el.click(); }); await settle(); };
const type = async (el: HTMLTextAreaElement, value: string) => act(async () => {
  Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
});
const prompt = () => host.querySelector<HTMLTextAreaElement>("#ranking-prompt")!;

const mount = async () => {
  history.replaceState(null, "", "/settings");
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  await act(async () => root.render(<Harness />));
  await settle();
};
/** Mounts Settings again, for a different account. */
const remount = async (me: Me, after: Me = me) => {
  act(() => root.unmount()); host.remove();
  account.me = me; account.after = after;
  await mount();
};

beforeEach(async () => {
  puts.length = 0;
  account.me = ME; account.after = ME;
  await mount();
});
afterEach(() => { act(() => root.unmount()); host.remove(); vi.restoreAllMocks(); });

describe("Sections (SET-57)", () => {
  it("opens /settings at Connections, with only that section showing and its link current", () => {
    expect(where()).toBe("/settings/connections");
    expect(shown()).toEqual(["connections"]);
    expect(link("Connections").getAttribute("aria-current")).toBe("page");
    expect(host.querySelector(".save-footer")!.textContent).toContain("No unsaved changes.");
  });

  it("shows a section at its own address from the left column", async () => {
    await click(link("Teams and collaborators"));
    expect(where()).toBe("/settings/teams-and-collaborators");
    expect(shown()).toEqual(["teams-and-collaborators"]);
    expect(link("Connections").getAttribute("aria-current")).toBeNull();
  });

  it("changes an address that isn't a section to Connections (NAV-3)", async () => {
    await go("/settings/prompt");
    expect(where()).toBe("/settings/connections");
  });

  it("has Account with no save bar or footer", async () => {
    await click(link("Account"));
    expect(shown()).toEqual(["account"]);
    expect(host.querySelector(".save-footer, .save-bar")).toBeNull();
  });
});

describe("Links to a control (SET-58)", () => {
  it("opens the control's section and focuses it, also from another section", async () => {
    await click(link("Repositories"));
    await go("/settings#add-collaborator");
    expect(where()).toBe("/settings/teams-and-collaborators#add-collaborator");
    expect(document.activeElement?.id).toBe("add-collaborator");
  });

  it("opens the section that now holds an old section anchor", async () => {
    await go("/settings#excluded-repositories");
    expect(where()).toBe("/settings/repositories#excluded-repositories");
    expect(shown()).toEqual(["repositories"]);
  });

  it("finds the section of a control that isn't showing from its id", async () => {
    await click(link("Ranking prompt"));
    await go("/settings#github-pat");
    expect(shown()).toEqual(["connections"]);
  });
});

describe("Unsaved changes (SET-59, SET-60, NAV-9)", () => {
  it("keeps the draft across sections, without asking, and marks the section", async () => {
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    await click(link("Ranking prompt"));
    await type(prompt(), "Only security issues.");
    await click(link("Repositories"));
    expect(confirm).not.toHaveBeenCalled();
    expect(where()).toBe("/settings/repositories");
    expect(link("Ranking prompt").textContent).toContain("(unsaved changes)");
    expect(link("Repositories").textContent).not.toContain("(unsaved changes)");
    const bar = host.querySelector(".save-bar")!;
    expect(bar.textContent).toContain("Unsaved changes in Ranking prompt");
    await click(link("Ranking prompt"));
    expect(prompt().value).toBe("Only security issues.");
  });

  it("drops every change with Discard changes, and stays", async () => {
    await click(link("Ranking prompt"));
    await type(prompt(), "Only security issues.");
    await click(button("Discard changes"));
    expect(where()).toBe("/settings/ranking-prompt");
    expect(prompt().value).toBe("Rank what needs me first.");
    expect(host.querySelector(".save-bar")).toBeNull();
  });

  it("asks before leaving Settings, and stays when told to (SET-26)", async () => {
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    await click(link("Ranking prompt"));
    await type(prompt(), "Only security issues.");
    await go("/");
    expect(confirm).toHaveBeenCalledOnce();
    expect(where()).toBe("/settings/ranking-prompt");
  });
});

describe("Saving (NAV-8, SET-14)", () => {
  it("stays on the section after Save changes, with Changes saved", async () => {
    await click(link("Ranking prompt"));
    await type(prompt(), "Only security issues.");
    await click(button("Save changes"));
    expect(puts).toHaveLength(1);
    expect(puts[0]).toMatchObject({ customPrompt: "Only security issues.", rerank: false });
    expect(where()).toBe("/settings/ranking-prompt");
    expect(host.querySelector(".save-footer")!.textContent).toContain("Changes saved");
  });

  it("goes to the list after Save and re-rank", async () => {
    await click(link("Ranking prompt"));
    await type(prompt(), "Only security issues.");
    await click(button("Save and re-rank"));
    expect(puts[0]).toMatchObject({ rerank: true });
    expect(where()).toBe("/");
    expect(host.querySelector("#list")).not.toBeNull();
  });

  it("re-ranks everything with nothing changed (SET-15)", async () => {
    await click(button("Re-rank everything"));
    expect(puts[0]).toMatchObject({ rerank: true });
    expect(where()).toBe("/");
  });
});

describe("Problems found when saving (SET-27, SET-59)", () => {
  it("opens Connections at the key's field when the chosen agent has no key, whichever section saved", async () => {
    await remount({ ...ME, credentials: { ...ME.credentials, gemini_key: { ...status, set: false, chip: "not_set" } } });
    await click(link("Ranking prompt"));
    await type(prompt(), "Only security issues.");
    await click(button("Save changes"));
    expect(puts).toHaveLength(0);
    expect(where()).toBe("/settings/connections#gemini-key");
    expect(document.activeElement?.id).toBe("gemini-key");
    expect(link("Connections").textContent).toContain("(has a problem)");
    expect(host.querySelector(".save-bar")!.textContent).toContain("Fix the problems marked in red before saving.");
  });
});

describe("During setup (NAV-8, NAV-9)", () => {
  const welcome: Me = { ...ME, screen: "welcome" };

  it("links back to setup", async () => {
    await remount(welcome);
    expect(host.querySelector(".back-link")!.textContent!.trim()).toBe("Back to setup");
  });

  it("goes to the list after the save that completes setup", async () => {
    await remount(welcome, ME);
    await click(link("Ranking prompt"));
    await type(prompt(), "Only security issues.");
    await click(button("Save changes"));
    expect(where()).toBe("/");
  });

  it("stays on Settings after a save that doesn't complete setup", async () => {
    await remount(welcome);
    await click(link("Ranking prompt"));
    await type(prompt(), "Only security issues.");
    await click(button("Save changes"));
    expect(where()).toBe("/settings/ranking-prompt");
    expect(host.querySelector(".save-footer")!.textContent).toContain("Changes saved");
  });
});
