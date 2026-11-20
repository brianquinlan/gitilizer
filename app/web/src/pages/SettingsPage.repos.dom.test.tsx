// @vitest-environment jsdom
// Editing an additional repository's prioritization prompt in place, in a browser DOM (PRD SET-7, SET-9, SET-27):
// the text opens a field, clicking away keeps the text without outer spaces, Escape puts it back, an empty prompt
// shows "Add prioritization prompt", a prompt over 500 characters keeps the field open with an error, "Edited"
// follows the text as it is typed, and the add form has no prompt field.
import { act, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AdditionalRepo } from "@gitilizer/shared";

vi.mock("../store.tsx", () => ({ useStore: () => ({}) }));
vi.mock("../router.tsx", () => ({ focusTarget: () => false, navigate: () => {}, setNavigationGuard: () => {} }));
vi.mock("../api.ts", () => ({
  api: { post: () => new Promise(() => {}), get: () => new Promise(() => {}), put: () => new Promise(() => {}) },
  ApiError: class extends Error {},
}));

const { RepoList } = await import("./SettingsPage.tsx");

const repo = (fullName: string, prioritizationPrompt: string): AdditionalRepo => ({
  fullName, prioritizationPrompt, access: "ok", tokenType: null, ownerAvatarUrl: null, ownerType: "Organization",
});
const SAVED = [repo("northstar/api", "Security issues only"), repo("northstar/cli", "")];

let root: Root;
let host: HTMLDivElement;
let state: { repos: AdditionalRepo[]; errors: Record<string, string> };
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function Harness() {
  const [repos, setRepos] = useState<AdditionalRepo[]>(SAVED);
  const [errors, setErrors] = useState<Record<string, string>>({});
  state = { repos, errors };
  const setError = (f: string, m: string | null) =>
    setErrors((e) => { const n = { ...e }; if (m) n[f] = m; else delete n[f]; return n; });
  return <RepoList repos={repos} saved={SAVED} excluded={[]} errors={errors} setError={setError} app onChange={setRepos} />;
}

const $ = <T extends Element>(sel: string) => host.querySelector<T>(sel);
const row = (name: string) => host.querySelector<HTMLElement>(`#repo-${name.replace("/", "-")}`)!;
const prompt = (name: string) => state.repos.find((r) => r.fullName === name)!.prioritizationPrompt;
const click = (el: Element) => act(() => { (el as HTMLElement).click(); });
const type = (el: HTMLTextAreaElement, value: string) => act(() => {
  Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
});
const key = (el: Element, k: string) => act(() => { el.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true })); });
const blur = (el: HTMLElement) => act(() => { el.blur(); });
const field = (name: string) => row(name).querySelector<HTMLTextAreaElement>("textarea");

beforeEach(() => {
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root.render(<Harness />));
});
afterEach(() => { act(() => root.unmount()); host.remove(); });

describe("A repository's prioritization prompt (SET-9)", () => {
  it("opens as a field holding the prompt, with its count, and keeps the text without outer spaces when left", () => {
    const button = row("northstar/api").querySelector<HTMLButtonElement>("button.prompt-text")!;
    expect(button.textContent).toBe("Edit the prioritization prompt for northstar/api: Security issues only");
    click(button);
    const f = field("northstar/api")!;
    expect(f.value).toBe("Security issues only");
    expect(document.activeElement).toBe(f);
    expect(row("northstar/api").querySelector("label")!.textContent).toBe("Prioritization prompt");
    expect(row("northstar/api").querySelector(".count")!.textContent).toBe("20 / 500 characters");
    type(f, "  Security issues\nand outages  ");
    expect(prompt("northstar/api")).toBe("  Security issues\nand outages  "); // live, for "Edited" and SET-26
    blur(f);
    expect(field("northstar/api")).toBeNull();
    expect(prompt("northstar/api")).toBe("Security issues\nand outages");
  });

  it("puts back the text from when it opened on Escape, and returns focus to the prompt", () => {
    click(row("northstar/api").querySelector("button.prompt-text")!);
    type(field("northstar/api")!, "Something else");
    key(field("northstar/api")!, "Escape");
    expect(field("northstar/api")).toBeNull();
    expect(prompt("northstar/api")).toBe("Security issues only");
    expect(document.activeElement).toBe(row("northstar/api").querySelector("button.prompt-text"));
  });

  it("shows \"Add prioritization prompt\" without a prompt, and again once the field is emptied", () => {
    const add = row("northstar/cli").querySelector<HTMLButtonElement>("button.add-prompt")!;
    expect(add.textContent).toBe(" Add prioritization prompt for northstar/cli");
    click(add);
    expect(field("northstar/cli")!.value).toBe("");
    blur(field("northstar/cli")!);
    expect(row("northstar/cli").querySelector("button.add-prompt")).not.toBeNull();

    click(row("northstar/api").querySelector("button.prompt-text")!);
    type(field("northstar/api")!, "   ");
    blur(field("northstar/api")!);
    expect(prompt("northstar/api")).toBe("");
    expect(row("northstar/api").querySelector("button.add-prompt")).not.toBeNull();
  });

  it("stays open over 500 characters, with an error that blocks saving (SET-27)", () => {
    click(row("northstar/api").querySelector("button.prompt-text")!);
    type(field("northstar/api")!, "x".repeat(530));
    const message = "A prioritization prompt can be at most 500 characters. This one has 530.";
    expect(state.errors["repo-northstar-api-prompt"]).toBe(message);
    expect(row("northstar/api").querySelector(".field-error")!.textContent).toBe(message);
    expect(row("northstar/api").querySelector(".count")!.textContent).toBe("530 / 500 characters");
    expect(field("northstar/api")!.getAttribute("aria-invalid")).toBe("true");
    blur(field("northstar/api")!);
    expect(field("northstar/api")).not.toBeNull();
    type(field("northstar/api")!, "x".repeat(500));
    expect(state.errors["repo-northstar-api-prompt"]).toBeUndefined();
    key(field("northstar/api")!, "Escape");
    expect(prompt("northstar/api")).toBe("Security issues only");
  });

  it("marks the row \"Edited\" as the text is typed, until it matches the saved prompt again", () => {
    const edited = () => row("northstar/api").querySelector(".edited")?.textContent ?? null;
    expect(edited()).toBeNull();
    click(row("northstar/api").querySelector("button.prompt-text")!);
    type(field("northstar/api")!, "Security issues only!");
    expect(edited()).toBe("Edited");
    type(field("northstar/api")!, "x".repeat(530));
    expect(edited()).toBe("Edited");
    type(field("northstar/api")!, " Security issues only ");
    expect(edited()).toBeNull();
  });

  it("doesn't mark a repository added since the last save, and the add form has no prompt field (SET-7)", () => {
    expect($("#add-repository-prompt")).toBeNull();
    const input = $<HTMLInputElement>("#add-repository")!;
    act(() => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, "northstar/web");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    click([...host.querySelectorAll("button")].find((b) => b.textContent === " Add repository")!);
    expect(prompt("northstar/web")).toBe("");
    click(row("northstar/web").querySelector("button.add-prompt")!);
    type(field("northstar/web")!, "Docs only");
    blur(field("northstar/web")!);
    expect(row("northstar/web").querySelector(".edited")).toBeNull();
    expect(prompt("northstar/web")).toBe("Docs only");
  });
});
