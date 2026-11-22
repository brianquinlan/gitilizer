// @vitest-environment jsdom
// The Teams section, in a browser DOM (PRD SET-51 to SET-54): adding a team checks it, "Not found" with its hover
// text, a team's prompt edited in place like a repository's, and "Find my teams" with its suggestions and messages.
import { act, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FindTeamsResponse, Team } from "@gitilizer/shared";

const responses: { check: (name: string) => Team; find: () => FindTeamsResponse } = {
  check: (name) => ({ name, prioritizationPrompt: "", status: "ok", avatarUrl: "https://avatars/org.png" }),
  find: () => ({ status: "ok", teams: [] }),
};
vi.mock("../store.tsx", () => ({ useStore: () => ({}) }));
vi.mock("../router.tsx", () => ({ focusTarget: () => false, navigate: () => {}, setNavigationGuard: () => {} }));
vi.mock("../api.ts", () => ({
  api: {
    post: async (url: string, body?: { name: string }) => (url === "/api/teams/check" ? responses.check(body!.name) : responses.find()),
    get: () => new Promise(() => {}), put: () => new Promise(() => {}),
  },
  ApiError: class extends Error {},
}));

const { TeamList } = await import("./SettingsPage.tsx");

const ECO = "dart-lang/dart-ecosystem-team";
const SAVED: Team[] = [{ name: ECO, prioritizationPrompt: "I have a small level of responsibility for this team.", status: "ok", avatarUrl: "https://avatars/dart.png" }];

let root: Root;
let host: HTMLDivElement;
let state: { teams: Team[]; errors: Record<string, string> };
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function Harness() {
  const [teams, setTeams] = useState<Team[]>(SAVED);
  const [errors, setErrors] = useState<Record<string, string>>({});
  state = { teams, errors };
  const setError = (f: string, m: string | null) =>
    setErrors((e) => { const n = { ...e }; if (m) n[f] = m; else delete n[f]; return n; });
  return <TeamList teams={teams} saved={SAVED} errors={errors} setError={setError} onChange={setTeams} />;
}

const $ = <T extends Element>(sel: string) => host.querySelector<T>(sel);
const click = async (el: Element) => { await act(async () => { (el as HTMLElement).click(); }); };
const typeInput = (el: HTMLInputElement, value: string) => act(() => {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
});
const buttonNamed = (text: string) => [...host.querySelectorAll("button")].find((b) => b.textContent?.includes(text))!;

beforeEach(() => {
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root.render(<Harness />));
});
afterEach(() => { act(() => root.unmount()); host.remove(); });

describe("Teams (SET-51 to SET-53)", () => {
  it("shows each team with its prompt, edited in place like a repository's", () => {
    const row = $<HTMLElement>("#team-dart-lang-dart-ecosystem-team")!;
    expect(row.querySelector(".mono")!.textContent).toBe(ECO);
    expect(row.querySelector("button.prompt-text")!.textContent).toBe(`Edit the prioritization prompt for ${ECO}: I have a small level of responsibility for this team.`);
    expect(row.querySelector(".access")).toBeNull(); // nothing more once GitHub knows the team (SET-52)
  });

  it("adds a team as typed, with @ or as a URL, and checks it", async () => {
    typeInput($<HTMLInputElement>("#add-team")!, "@googleapis/cloud-sdk-dart-team");
    await click(buttonNamed("Add team"));
    expect(state.teams.map((t) => [t.name, t.status])).toEqual([[ECO, "ok"], ["googleapis/cloud-sdk-dart-team", "ok"]]);
    expect($("#team-googleapis-cloud-sdk-dart-team .add-prompt")!.textContent).toContain("Add prioritization prompt");
  });

  it("shows \"Not found\" with its hover text for a team GitHub refuses", async () => {
    responses.check = (name) => ({ name, prioritizationPrompt: "", status: "not_found", avatarUrl: null });
    typeInput($<HTMLInputElement>("#add-team")!, "northstar/web-reviewrs");
    await click(buttonNamed("Add team"));
    const bad = $<HTMLElement>("#team-northstar-web-reviewrs .access.bad")!;
    expect(bad.textContent).toContain("Not found");
    expect(bad.title).toBe("GitHub says there's no team northstar/web-reviewrs, or your GitHub connection can't see it. If the name is misspelled, remove it and add it again.");
  });

  it("refuses a malformed or repeated team (SET-27)", async () => {
    typeInput($<HTMLInputElement>("#add-team")!, "dart-lang");
    await click(buttonNamed("Add team"));
    expect(state.errors["add-team"]).toBe("Enter a team as org/team, or paste its GitHub URL.");
    typeInput($<HTMLInputElement>("#add-team")!, "https://github.com/orgs/dart-lang/teams/dart-ecosystem-team");
    await click(buttonNamed("Add team"));
    expect(state.errors["add-team"]).toBe(`${ECO} is already in your teams.`);
    expect(state.teams).toHaveLength(1);
  });
});

describe("Find my teams (SET-54)", () => {
  it("lists the teams found that aren't on the page, and Add moves one into the list", async () => {
    responses.find = () => ({ status: "ok", teams: [
      { name: ECO, prs: 23, avatarUrl: null },
      { name: "googleapis/cloud-sdk-dart-team", prs: 2, avatarUrl: null },
    ] });
    await click(buttonNamed("Find my teams"));
    const rows = [...host.querySelectorAll(".suggestion")];
    expect(rows.map((r) => r.querySelector(".mono")!.textContent)).toEqual(["googleapis/cloud-sdk-dart-team"]);
    expect(rows[0].querySelector(".count")!.textContent).toBe("2 open PRs");
    await click(rows[0].querySelector("button")!);
    expect(state.teams.map((t) => [t.name, t.status])).toEqual([[ECO, "ok"], ["googleapis/cloud-sdk-dart-team", "ok"]]);
    expect(host.querySelectorAll(".suggestion")).toHaveLength(0);
    expect($(".find-message")).toBeNull();
  });

  it("says nothing was found when every team it finds is on the page already", async () => {
    responses.find = () => ({ status: "ok", teams: [{ name: ECO, prs: 23, avatarUrl: null }] });
    await click(buttonNamed("Find my teams"));
    expect($(".find-message")!.textContent).toBe("No teams found. A team shows up here when it's asked to review an open PR.");
  });

  it("says when nothing was found, or when GitHub is busy or can't be reached", async () => {
    for (const [r, text] of [
      [{ status: "ok", teams: [] }, "No teams found. A team shows up here when it's asked to review an open PR."],
      [{ status: "busy" }, "GitHub is busy with your scan. Try again in a minute."],
      [{ status: "unreachable" }, "Couldn't reach GitHub. Try again."],
    ] as [FindTeamsResponse, string][]) {
      responses.find = () => r;
      await click(buttonNamed("Find my teams"));
      expect($(".find-message")!.textContent).toBe(text);
    }
  });
});
