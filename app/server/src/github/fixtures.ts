// Fake GitHub backed by eval/fixtures (design: Testing, "fixture mode").
// Search qualifiers are evaluated against the snapshots, so discovery,
// diffing and removal behave as they would against GitHub. Dev endpoints can
// "touch" or close an item to exercise live updates, and Sync now touches a
// few listed items at random so their ranks change.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { GitHubProblem, itemKey, limitSnapshot, type AccountInfo, type GitHubApi, type ItemState, type RepoInfo, type SearchHit, type SearchOptions } from "./types.ts";

type Entry = { snap: Record<string, any>; closed: boolean; merged: boolean };

/** The fixture account's teams, as in eval/ground_truth.yaml (`review_teams`): `review-requested:` counts them (SET-54). */
export const FIXTURE_TEAMS = ["dart-lang/dart-ecosystem-team", "googleapis/cloud-sdk-dart-team"];

export class FixtureStore {
  entries = new Map<string, Entry>();

  /** Logins that exist on the fake GitHub: everyone who appears in a fixture. */
  logins = new Set<string>();

  /** The fixture account's teams, and every team the fake GitHub knows: those, and every team a fixture asks for review. */
  teams = new Set(FIXTURE_TEAMS);
  knownTeams = new Set(FIXTURE_TEAMS);

  constructor(dir: string, public login: string) {
    for (const f of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
      const snap = limitSnapshot(JSON.parse(readFileSync(join(dir, f), "utf8")));
      const { owner, repo, number } = snap.ref;
      const key = itemKey(`${owner}/${repo}`, number);
      this.entries.set(key, { snap, closed: snap.issue.state !== "open", merged: false });
      for (const t of snap.pull?.requested_teams ?? []) this.knownTeams.add(`${owner}/${t.slug}`.toLowerCase());
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

  /**
   * Touches `count` items picked at random from `keys` (open fixtures only), so that a sync ranks them again. The
   * fake model's score comes from the item's text, so each gets a new, effectively random, rank. Used by Sync now
   * in fixture mode, to show live updates; a few at a time play one by one rather than together (LIVE-8, LIVE-9).
   */
  scramble(keys: string[], count = 3, random: () => number = Math.random): string[] {
    const open = [...new Set(keys)].filter((k) => this.entries.has(k) && !this.entries.get(k)!.closed);
    const picked: string[] = [];
    while (picked.length < count && open.length) picked.push(...open.splice(Math.floor(random() * open.length), 1));
    for (const key of picked) this.touch(key);
    return picked;
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

const requestedTeams = (snap: Record<string, any>) =>
  (snap.pull?.requested_teams ?? []).map((t: any) => `${snap.ref.owner}/${t.slug}`.toLowerCase());

/**
 * Evaluates the qualifiers the scanner uses (design: Scanner, step 2). A group in parentheses, "(a OR b)", matches
 * when any of its terms does, as with advanced search. Several `repo:` filters mean any of them, as on GitHub, but
 * under advanced search all of them (design D-27).
 */
function matches(snap: Record<string, any>, q: string, store: FixtureStore, advanced = false): boolean {
  const full = `${snap.ref.owner}/${snap.ref.repo}`.toLowerCase();
  for (const g of q.matchAll(/\(([^()]*)\)/g)) {
    if (!g[1].split(/\s+OR\s+/).some((t) => matches(snap, t.trim(), store, true))) return false;
  }
  const repos: string[] = [];
  for (const term of q.replace(/\([^()]*\)/g, " ").split(/\s+/).filter(Boolean)) {
    const c = term.indexOf(":");
    const k = c < 0 ? term : term.slice(0, c);
    const v = (c < 0 ? "" : term.slice(c + 1)).toLowerCase();
    switch (k) {
      case "is":
        if (v === "open" && snap.issue.state !== "open") return false;
        if ((v === "pull-request" || v === "pr") && !snap.issue.pull_request) return false;
        if (v === "issue" && snap.issue.pull_request) return false;
        break;
      case "team-review-requested": if (!requestedTeams(snap).includes(v)) return false; break;
      case "review-requested":
        if (!(snap.pull?.requested_reviewers ?? []).some((u: any) => u.login.toLowerCase() === v)
          && !(v === store.login.toLowerCase() && requestedTeams(snap).some((t: string) => store.teams.has(t)))) return false;
        break;
      case "archived": if (v === "false" && snap.repo?.archived) return false; break;
      case "assignee": if (!(snap.issue.assignees ?? []).some((a: any) => a.login.toLowerCase() === v)) return false; break;
      case "author": if ((snap.issue.user?.login ?? "").toLowerCase() !== v) return false; break;
      case "commenter": if (!commenters(snap).includes(v)) return false; break;
      case "mentions": if (!texts(snap).some((t) => new RegExp(`@${v}\\b`, "i").test(t))) return false; break;
      case "user-review-requested":
        if (!(snap.pull?.requested_reviewers ?? []).some((u: any) => u.login.toLowerCase() === v)) return false; break;
      // Several repo: qualifiers mean any of them, as on GitHub (design D-13).
      case "repo": repos.push(v); break;
      case "-repo": if (full === v) return false; break;
      case "-user": case "-org": if (full.split("/")[0] === v) return false; break;
      case "updated":
        if (v.startsWith(">=") && Date.parse(snap.issue.updated_at) < Date.parse(term.slice(c + 3))) return false; break;
      default: break;
    }
  }
  return repos.length === 0 || (advanced ? repos.every((r) => r === full) : repos.includes(full));
}

/** A stable numeric ID for a fixture account or repository, standing in for GitHub's. */
export function fixtureId(name: string): number {
  let h = 2166136261;
  for (const c of name.toLowerCase()) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0) % 1_000_000_000;
}

export class FixtureGitHub implements GitHubApi {
  constructor(private store: FixtureStore) {}

  async viewer() { return { login: this.store.login, id: null, avatarUrl: null, tokenExpiresAt: null, tokenType: "fine-grained" as const }; }

  async search(q: string, limit: number, opts: SearchOptions = {}) {
    // GitHub refuses a team it doesn't know (SET-52), and parentheses without advanced search (design D-27).
    for (const m of q.matchAll(/team-review-requested:([^\s()]+)/g)) {
      if (!this.store.knownTeams.has(m[1].toLowerCase())) {
        throw new GitHubProblem("invalid_team", `"${m[1]}" is not a valid team name.`, { status: 422, team: m[1] });
      }
    }
    if (!opts.advanced && q.includes("(")) throw new GitHubProblem("unexpected", "Validation Failed", { status: 422 });
    const hits = [...this.store.entries.values()]
      .filter((e) => matches(e.snap, q, this.store, opts.advanced))
      .map(hit)
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));
    return { hits: hits.slice(0, Math.min(limit, 1000)), total: hits.length };
  }

  async reviewRequests(repo: string, number: number) {
    const e = this.store.entries.get(itemKey(repo, number));
    if (!e) throw new GitHubProblem("not_found", "Not Found", { status: 404 });
    return {
      teams: (e.snap.pull?.requested_teams ?? []).map((t: any) => String(t.slug)),
      people: (e.snap.pull?.requested_reviewers ?? []).map((u: any) => String(u.login)),
    };
  }

  async searchesLeft() { return 30; }

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
    const name = `${e.snap.ref.owner}/${e.snap.ref.repo}`;
    const owner = String(e.snap.ref.owner);
    return {
      access: e.snap.repo?.archived ? "archived" : "ok", fullName: name, id: fixtureId(name),
      ownerAvatarUrl: `https://github.com/${owner}.png?size=64`, ownerType: "Organization",
    };
  }

  async repoById(id: number): Promise<RepoInfo> {
    const e = [...this.store.entries.values()].find((e) => fixtureId(`${e.snap.ref.owner}/${e.snap.ref.repo}`) === id);
    return e ? this.repo(`${e.snap.ref.owner}/${e.snap.ref.repo}`) : { access: "not_found" };
  }

  /** Fixture accounts: everyone who appears in the fixtures, and every repository owner (an organization). */
  async account(ref: { login: string } | { id: number }): Promise<AccountInfo> {
    const owners = new Set([...this.store.entries.values()].map((e) => String(e.snap.ref.owner)));
    const people = [...this.store.logins];
    const all = [...[...owners].map((o) => ({ login: o, type: "Organization" as const })),
      ...people.filter((p) => ![...owners].some((o) => o.toLowerCase() === p)).map((p) => ({ login: p, type: "User" as const }))];
    const a = all.find((x) => ("id" in ref ? fixtureId(x.login) === ref.id : x.login.toLowerCase() === ref.login.toLowerCase()));
    if (!a) return { exists: false };
    return { exists: true, id: fixtureId(a.login), login: a.login, type: a.type, avatarUrl: `https://github.com/${a.login}.png?size=64` };
  }

  /** Everyone in the fixtures, and every repository owner: GET /users/{login} answers for organizations too. */
  async user(login: string) {
    const owner = [...this.store.entries.values()].some((e) => String(e.snap.ref.owner).toLowerCase() === login.toLowerCase());
    return this.store.logins.has(login.toLowerCase()) || owner
      ? { exists: true as const, avatarUrl: `https://github.com/${login}.png?size=64` }
      : { exists: false as const };
  }
}
