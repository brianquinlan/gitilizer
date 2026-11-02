// Fake GitHub backed by eval/fixtures (design: Testing, "fixture mode").
// Search qualifiers are evaluated against the snapshots, so discovery,
// diffing and removal behave as they would against GitHub. Dev endpoints can
// "touch" or close an item to exercise live updates.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { GitHubProblem, itemKey, limitSnapshot, type GitHubApi, type ItemState, type RepoInfo, type SearchHit } from "./types.ts";

type Entry = { snap: Record<string, any>; closed: boolean; merged: boolean };

export class FixtureStore {
  entries = new Map<string, Entry>();

  /** Logins that exist on the fake GitHub: everyone who appears in a fixture. */
  logins = new Set<string>();

  constructor(dir: string, public login: string) {
    for (const f of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
      const snap = limitSnapshot(JSON.parse(readFileSync(join(dir, f), "utf8")));
      const { owner, repo, number } = snap.ref;
      const key = itemKey(`${owner}/${repo}`, number);
      this.entries.set(key, { snap, closed: snap.issue.state !== "open", merged: false });
      for (const u of [snap.issue.user, ...(snap.issue.assignees ?? []), ...(snap.comments ?? []).map((c: any) => c.user), ...(snap.reviews ?? []).map((r: any) => r.user)]) {
        if (u?.login) this.logins.add(u.login.toLowerCase());
      }
    }
    this.logins.add(login.toLowerCase());
  }

  /** Simulate new activity on GitHub: bump updated_at and add a comment. */
  touch(key: string, by = "octocat", body = "New activity (simulated)."): void {
    const e = this.entries.get(key);
    if (!e) throw new Error(`no fixture ${key}`);
    // GitHub timestamps have one-second precision; always move forward so each touch is a change.
    const t = Math.max(Date.now(), Date.parse(e.snap.issue.updated_at) + 1000);
    const now = new Date(t).toISOString().replace(/\.\d+Z$/, "Z");
    const issue = { ...e.snap.issue, updated_at: now, comments: (e.snap.issue.comments ?? 0) + 1 };
    const comment = { user: { login: by, type: "User" }, created_at: now, updated_at: now, body, author_association: "NONE" };
    e.snap = {
      ...e.snap,
      fetched_at: now,
      issue,
      comments: [...e.snap.comments, comment],
      timeline: [...e.snap.timeline, { event: "commented", actor: comment.user, user: comment.user, created_at: now, body }],
    };
  }

  close(key: string, merged = false): void {
    const e = this.entries.get(key);
    if (!e) throw new Error(`no fixture ${key}`);
    e.closed = true;
    e.merged = merged;
    e.snap = { ...e.snap, issue: { ...e.snap.issue, state: "closed", updated_at: new Date().toISOString() } };
  }
}

function hit(e: Entry): SearchHit {
  const { owner, repo, number } = e.snap.ref;
  const full = `${owner}/${repo}`;
  return {
    key: itemKey(full, number),
    repo: full,
    number,
    kind: e.snap.issue.pull_request ? "pr" : "issue",
    title: e.snap.issue.title,
    htmlUrl: e.snap.issue.html_url,
    state: e.closed ? "closed" : "open",
    updatedAt: e.snap.issue.updated_at,
    merged: e.merged,
  };
}

function texts(snap: Record<string, any>): string[] {
  const out = [snap.issue.body ?? ""];
  for (const c of snap.comments ?? []) out.push(c.body ?? "");
  for (const c of snap.review_comments ?? []) out.push(c.body ?? "");
  for (const r of snap.reviews ?? []) out.push(r.body ?? "");
  return out;
}

function commenters(snap: Record<string, any>): string[] {
  return [...(snap.comments ?? []), ...(snap.review_comments ?? []), ...(snap.reviews ?? [])]
    .map((c: any) => (c.user?.login ?? "").toLowerCase());
}

/** Evaluates the qualifiers the scanner uses (design: Scanner, step 2). */
function matches(snap: Record<string, any>, q: string): boolean {
  const full = `${snap.ref.owner}/${snap.ref.repo}`.toLowerCase();
  for (const term of q.split(/\s+/)) {
    const c = term.indexOf(":");
    const k = c < 0 ? term : term.slice(0, c);
    const v = (c < 0 ? "" : term.slice(c + 1)).toLowerCase();
    switch (k) {
      case "is": if (v === "open" && snap.issue.state !== "open") return false; break;
      case "archived": if (v === "false" && snap.repo?.archived) return false; break;
      case "assignee": if (!(snap.issue.assignees ?? []).some((a: any) => a.login.toLowerCase() === v)) return false; break;
      case "author": if ((snap.issue.user?.login ?? "").toLowerCase() !== v) return false; break;
      case "commenter": if (!commenters(snap).includes(v)) return false; break;
      case "mentions": if (!texts(snap).some((t) => new RegExp(`@${v}\\b`, "i").test(t))) return false; break;
      case "user-review-requested":
        if (!(snap.pull?.requested_reviewers ?? []).some((u: any) => u.login.toLowerCase() === v)) return false; break;
      case "repo": if (full !== v) return false; break;
      case "updated":
        if (v.startsWith(">=") && Date.parse(snap.issue.updated_at) < Date.parse(term.slice(c + 3))) return false; break;
      default: break;
    }
  }
  return true;
}

export class FixtureGitHub implements GitHubApi {
  constructor(private store: FixtureStore) {}

  async viewer() { return { login: this.store.login, tokenExpiresAt: null, tokenType: "fine-grained" as const }; }

  async search(q: string, limit: number) {
    const hits = [...this.store.entries.values()]
      .filter((e) => matches(e.snap, q))
      .map(hit)
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));
    return { hits: hits.slice(0, Math.min(limit, 1000)), total: hits.length };
  }

  async item(repo: string, number: number): Promise<ItemState> {
    const e = this.store.entries.get(itemKey(repo, number));
    if (!e) throw new GitHubProblem("not_found", "Not Found", { status: 404 });
    return { ...hit(e), merged: e.merged };
  }

  async snapshot(repo: string, number: number) {
    const e = this.store.entries.get(itemKey(repo, number));
    if (!e) throw new GitHubProblem("not_found", "Not Found", { status: 404 });
    return e.snap;
  }

  async repo(fullName: string): Promise<RepoInfo> {
    const e = [...this.store.entries.values()].find((e) => `${e.snap.ref.owner}/${e.snap.ref.repo}`.toLowerCase() === fullName.toLowerCase());
    if (!e) return { access: "not_found" };
    return { access: e.snap.repo?.archived ? "archived" : "ok", fullName: `${e.snap.ref.owner}/${e.snap.ref.repo}` };
  }

  async user(login: string) {
    return this.store.logins.has(login.toLowerCase())
      ? { exists: true as const, avatarUrl: `https://github.com/${login}.png?size=64` }
      : { exists: false as const };
  }
}
