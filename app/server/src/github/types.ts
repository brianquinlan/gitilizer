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
};

export type ItemState = SearchHit & { merged: boolean };

export interface GitHubApi {
  /** The PAT's user and, if GitHub sent one, the token's expiry time. */
  viewer(): Promise<{ login: string; tokenExpiresAt: string | null }>;
  /** Teams the PAT's user belongs to, as "org/slug". Empty if the token can't read them. */
  teams(): Promise<string[]>;
  /** Open items matching a GitHub issue-search query, up to `limit`. */
  search(q: string, limit: number): Promise<{ hits: SearchHit[]; total: number }>;
  /** Current state of one item (used to tell closed from merged from no-longer-matching). */
  item(repo: string, number: number): Promise<ItemState>;
  /** A snapshot in the eval/fixtures format (schema_version 2). */
  snapshot(repo: string, number: number): Promise<Record<string, any>>;
  repoAccess(fullName: string): Promise<"ok" | "not_found">;
  userExists(login: string): Promise<boolean>;
}

/** A classified GitHub failure (PRD notification catalogue). */
export type GitHubProblemCode =
  | "expired" | "invalid" | "org_blocks_token" | "rate_limited" | "unavailable"
  | "permission" | "sso" | "not_found" | "unexpected";

export class GitHubProblem extends Error {
  constructor(
    public code: GitHubProblemCode,
    message: string,
    public details: { org?: string; tokenType?: string; resetAt?: string; status?: number } = {},
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
