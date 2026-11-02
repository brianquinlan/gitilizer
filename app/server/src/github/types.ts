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

/** What GET /repos/{repo} says about an additional repository (PRD SET-8). */
export type RepoInfo =
  | { access: "ok" | "archived"; fullName: string }
  | { access: "not_found" }
  | { access: "sso_required"; org: string }
  | { access: "token_type_blocked"; org: string; tokenType: "classic" | "fine-grained" };

export interface GitHubApi {
  /** The PAT's user, the token's expiry time if GitHub sent one, and the kind of token. */
  viewer(): Promise<{ login: string; tokenExpiresAt: string | null; tokenType: "classic" | "fine-grained" }>;
  /**
   * Items matching a GitHub issue-search query, newest `updated_at` first,
   * up to `limit` (at most 1,000, the most GitHub returns; SCAN-1).
   */
  search(q: string, limit: number): Promise<{ hits: SearchHit[]; total: number }>;
  /** Current state of one item (used to tell closed from merged from no-longer-matching). */
  item(repo: string, number: number): Promise<ItemState>;
  /** A snapshot in the eval/fixtures format (schema_version 2). */
  snapshot(repo: string, number: number): Promise<Record<string, any>>;
  /** Access to an additional repository, following renames. */
  repo(fullName: string): Promise<RepoInfo>;
  /** A collaborator's profile (SET-19). Throws GitHubProblem if GitHub can't be reached. */
  user(login: string): Promise<{ exists: true; avatarUrl: string } | { exists: false }>;
}

/** A classified GitHub failure (PRD notification catalogue). */
export type GitHubProblemCode =
  | "expired" | "invalid" | "org_blocks_token" | "rate_limited" | "unavailable"
  | "permission" | "sso" | "not_found" | "unexpected";

export class GitHubProblem extends Error {
  constructor(
    public code: GitHubProblemCode,
    message: string,
    public details: { org?: string; tokenType?: string; resetAt?: string; status?: number; permission?: string } = {},
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
