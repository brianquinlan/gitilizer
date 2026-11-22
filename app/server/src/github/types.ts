// The GitHub operations the scanner needs, and the problems it can report.
// Two implementations: OctokitGitHub (real) and FixtureGitHub (eval/fixtures).

export type SearchHit = {
  key: string; // owner/repo#123
  repo: string;
  number: number;
  kind: "issue" | "pr";
  title: string;
  htmlUrl: string;
  state: "open" | "closed";
  updatedAt: string;
  /** For a closed PR: whether it was merged (search results carry pull_request.merged_at). */
  merged?: boolean;
};

export type ItemState = SearchHit & { merged: boolean };

/**
 * What GET /repos/{repo} says about an additional or excluded repository
 * (PRD SET-8, SET-36), with its owner's avatar and kind of account, which the
 * row shows as GitHub does.
 */
export type RepoInfo =
  | { access: "ok" | "archived"; fullName: string; id: number; ownerAvatarUrl: string; ownerType: "Organization" | "User" }
  | { access: "not_found" }
  | { access: "sso_required"; org: string }
  | { access: "token_type_blocked"; org: string; tokenType: "classic" | "fine-grained" };

export interface GitHubApi {
  /** The PAT's user, the token's expiry time if GitHub sent one, and the kind of token. */
  viewer(): Promise<{ login: string; id: number | null; avatarUrl: string | null; tokenExpiresAt: string | null; tokenType: "classic" | "fine-grained" | "app" }>;
  /**
   * Items matching a GitHub issue-search query, newest `updated_at` first,
   * up to `limit` (at most 1,000, the most GitHub returns; SCAN-1). `ssoOrgs`
   * names organizations whose results GitHub left out because the token isn't
   * authorized for their single sign-on (X-GitHub-SSO: partial-results).
   */
  search(q: string, limit: number, opts?: SearchOptions): Promise<{ hits: SearchHit[]; total: number; ssoOrgs?: string[] }>;
  /** The teams and people a PR asks for review: teams as their slugs (SET-54). */
  reviewRequests(repo: string, number: number): Promise<{ teams: string[]; people: string[] }>;
  /** Searches left in the current minute (GET /rate_limit, which doesn't count against it). */
  searchesLeft(): Promise<number>;
  /** Current state of one item (used to tell closed from merged from no-longer-matching). */
  item(repo: string, number: number): Promise<ItemState>;
  /** A snapshot in the eval/fixtures format (schema_version 2). */
  snapshot(repo: string, number: number): Promise<Record<string, any>>;
  /** Access to an additional repository, following renames. */
  repo(fullName: string): Promise<RepoInfo>;
  /** A collaborator's profile (SET-19). Throws GitHubProblem if GitHub can't be reached. */
  user(login: string): Promise<{ exists: true; avatarUrl: string } | { exists: false }>;
  /**
   * An account by login or by numeric ID (excluded owners, SET-36). By ID it
   * returns the current login after a rename; by login it doesn't follow one.
   */
  account(ref: { login: string } | { id: number }): Promise<AccountInfo>;
  /** A repository by numeric ID, with its current name (excluded repositories, SET-36). */
  repoById(id: number): Promise<RepoInfo>;
}

/**
 * `advanced`: GitHub's advanced issue search (`advanced_search=true`), which
 * OR and parentheses need. Under it a space between two `repo:` filters means
 * both, not either (design D-27).
 */
export type SearchOptions = { advanced?: boolean };

/** A GitHub account, for an excluded owner (SET-36). */
export type AccountInfo =
  | { exists: true; id: number; login: string; type: "Organization" | "User"; avatarUrl: string }
  | { exists: false };

/** A classified GitHub failure (PRD notification catalogue). */
export type GitHubProblemCode =
  | "expired" | "invalid" | "org_blocks_token" | "rate_limited" | "unavailable"
  | "permission" | "sso" | "not_found" | "unexpected"
  /** The Gitilizer app's connection can't be renewed: access was removed, or it lapsed (PRD SET-46). */
  | "connection_ended"
  /** A search named a team GitHub doesn't know, or one the connection can't see: 422 "… is not a valid team name" (SET-52). */
  | "invalid_team";

export class GitHubProblem extends Error {
  constructor(
    public code: GitHubProblemCode,
    message: string,
    public details: { org?: string; tokenType?: string; resetAt?: string; status?: number; permission?: string; team?: string } = {},
  ) {
    super(message);
  }
}

/** Ensures an item key like "owner/repo#12". */
export function itemKey(repo: string, number: number): string {
  return `${repo}#${number}`;
}

/**
 * Size limits for snapshots (design: Scanner, step 4). Also fixes the
 * snapshot.py bug where a PR from a fork's `master` lists every PR in the
 * repository that targets `master` as "stacked above" it.
 */
export function limitSnapshot(snap: Record<string, any>, head = 50, tail = 250): Record<string, any> {
  const out = { ...snap };
  const warnings: string[] = [...(snap.fetch_warnings ?? [])];
  for (const k of ["timeline", "comments", "files", "commits", "review_comments"]) {
    const arr = out[k];
    if (Array.isArray(arr) && arr.length > head + tail) {
      out[k] = [...arr.slice(0, head), ...arr.slice(arr.length - tail)];
      warnings.push(`${k} trimmed from ${arr.length} to ${head + tail} entries`);
    }
  }
  const pull = out.pull;
  if (out.stack && pull) {
    const sameRepo = pull.head?.repo?.full_name && pull.head.repo.full_name === pull.base?.repo?.full_name;
    if (!sameRepo && out.stack.above?.length) {
      warnings.push(`dropped ${out.stack.above.length} unrelated PRs from stack.above (head branch is in a fork)`);
      out.stack = { ...out.stack, above: [] };
    }
  }
  out.fetch_warnings = warnings;
  return out;
}
