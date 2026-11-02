// Download a complete, frozen snapshot of GitHub issues and PRs for the eval.
//
// A snapshot stores GitHub API responses verbatim, never trimmed or summarized:
// the repository, the issue, all comments, the full timeline, and for PRs the
// pull, reviews, inline review comments, commits and files. It also includes
// everything needed to judge the item in context: every issue or PR it
// references or that references it (full issue object, plus full pull object
// for PRs), the PRs that close it or that it closes (GraphQL), and the PRs below
// and above it in a PR stack (full pull objects with their reviews). Bodies are
// requested with the `full+json` media type, so each has `body`, `body_text` and
// `body_html`. `requests` records every API call made.
//
// Snapshots are what the prioritizer reads, so an evaluation run against the
// same snapshots always sees the same state of the world.
import { GitHub, GitHubError, IssueRef } from "./github.ts";

export const SCHEMA_VERSION = 2;
export const FULL_MEDIA = "application/vnd.github.full+json";
const MAX_STACK_DEPTH = 6;

const REF_PATTERNS = [
  /https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/(?:issues|pull)\/(\d+)/g,
  /(?<![\w/])([\w.-]+)\/([\w.-]+)#(\d+)\b/g,
  /(?<![\w/&])#(\d+)\b/g,
];

export const GQL_LINKS = `
query($owner: String!, $repo: String!, $number: Int!) {
  repository(owner: $owner, name: $repo) {
    issueOrPullRequest(number: $number) {
      __typename
      ... on Issue {
        closedByPullRequestsReferences(first: 100, includeClosedPrs: true) {
          pageInfo { hasNextPage }
          nodes { number state title url isDraft author { login } repository { nameWithOwner } updatedAt }
        }
      }
      ... on PullRequest {
        reviewDecision
        closingIssuesReferences(first: 100) {
          pageInfo { hasNextPage }
          nodes { number state title url author { login } repository { nameWithOwner } updatedAt }
        }
        reviewThreads(first: 100) {
          pageInfo { hasNextPage }
          nodes { id isResolved isOutdated isCollapsed path line resolvedBy { login }
                  comments(first: 100) { totalCount nodes { databaseId author { login } createdAt body } } }
        }
      }
    }
  }
}
`;

export const nowIso = () => new Date().toISOString().replace(/\.\d+Z$/, "Z");

export function extractRefs(text: string | null | undefined, def: IssueRef): IssueRef[] {
  if (!text) return [];
  const out: IssueRef[] = [];
  for (const m of text.matchAll(REF_PATTERNS[0])) out.push(new IssueRef(m[1], m[2], Number(m[3])));
  for (const m of text.matchAll(REF_PATTERNS[1])) out.push(new IssueRef(m[1], m[2], Number(m[3])));
  for (const m of text.matchAll(REF_PATTERNS[2])) out.push(new IssueRef(def.owner, def.repo, Number(m[1])));
  return out;
}

export class Snapshotter {
  private repoCache = new Map<string, any>();
  warnings: string[] = [];

  constructor(private gh: GitHub, private log: (msg: string) => void = (m) => process.stderr.write(`${m}\n`)) {}

  private warn(msg: string) {
    this.warnings.push(msg);
    this.log(`  warning: ${msg}`);
  }

  async repo(full: string) {
    if (!this.repoCache.has(full)) this.repoCache.set(full, await this.gh.get(`/repos/${full}`));
    return this.repoCache.get(full);
  }

  private async prBundle(ref: IssueRef) {
    const base = `/repos/${ref.fullRepo}/pulls/${ref.number}`;
    return {
      pull: await this.gh.get(base),
      reviews: await this.gh.paginate(`${base}/reviews`),
      review_comments: await this.gh.paginate(`${base}/comments`),
      commits: await this.gh.paginate(`${base}/commits`),
      files: await this.gh.paginate(`${base}/files`),
    };
  }

  /** PRs this PR is stacked on (below) and PRs stacked on it (above), as full pull objects. */
  private async stack(ref: IssueRef, pull: any, defaultBranch: string) {
    const below: any[] = [];
    let cur = pull;
    const seen = new Set<number>([pull.number]);
    for (let i = 0; i < MAX_STACK_DEPTH; i++) {
      const baseRef = cur.base.ref;
      if (baseRef === defaultBranch || cur.base.repo.full_name !== ref.fullRepo) break;
      const cands = (await this.gh.paginate(`/repos/${ref.fullRepo}/pulls`, { head: `${ref.owner}:${baseRef}`, state: "all" }))
        .filter((c) => !seen.has(c.number));
      if (!cands.length) { below.push({ base_ref: baseRef, pull: null, reviews: [] }); break; }
      if (cands.length > 1) this.warn(`${cands.length} PRs have head '${baseRef}'; using #${cands[0].number}`);
      const n = cands[0].number;
      seen.add(n);
      const parent = await this.gh.get(`/repos/${ref.fullRepo}/pulls/${n}`);
      const reviews = await this.gh.paginate(`/repos/${ref.fullRepo}/pulls/${n}/reviews`);
      below.push({ base_ref: baseRef, pull: parent, reviews });
      cur = parent;
    }
    // Only a branch in this repository can have PRs stacked on it. For a PR from a fork, a
    // `base=<head branch>` query would list every PR that targets the same branch name
    // (often `master`), which is how dart-lang/http#579 became a 20 MB snapshot.
    const headRepo = pull.head?.repo?.full_name;
    const above = headRepo === ref.fullRepo
      ? await this.gh.paginate(`/repos/${ref.fullRepo}/pulls`, { base: pull.head.ref, state: "all" })
      : [];
    return { default_branch: defaultBranch, below, above: above.filter((p) => !seen.has(p.number)) };
  }

  async snapshot(ref: IssueRef): Promise<any> {
    this.log(`Fetching ${ref} ...`);
    this.warnings = [];
    this.gh.log = [];
    const base = `/repos/${ref.fullRepo}/issues/${ref.number}`;
    const repo = await this.repo(ref.fullRepo);
    const snap: any = {
      schema_version: SCHEMA_VERSION,
      ref: { owner: ref.owner, repo: ref.repo, number: ref.number },
      fetched_at: nowIso(),
      repo,
      issue: await this.gh.get(base),
      comments: await this.gh.paginate(`${base}/comments`),
      timeline: await this.gh.paginate(`${base}/timeline`),
    };
    if (snap.issue.pull_request) {
      Object.assign(snap, await this.prBundle(ref));
      try {
        snap.stack = await this.stack(ref, snap.pull, repo.default_branch);
      } catch (e) {
        if (!(e instanceof GitHubError)) throw e;
        this.warn(`stack lookup failed: ${e.message}`);
      }
    }
    try {
      snap.graphql = await this.gh.graphql(GQL_LINKS, { owner: ref.owner, repo: ref.repo, number: ref.number });
      const node = snap.graphql.repository.issueOrPullRequest ?? {};
      for (const k of ["closedByPullRequestsReferences", "closingIssuesReferences", "reviewThreads"]) {
        if (node[k]?.pageInfo?.hasNextPage) this.warn(`GraphQL ${k} has more than 100 entries; only the first 100 were captured`);
      }
    } catch (e) {
      if (!(e instanceof GitHubError)) throw e;
      this.warn(`GraphQL link lookup failed: ${e.message}`);
    }
    snap.related = await this.related(ref, snap);
    snap.fetch_warnings = [...this.warnings];
    snap.requests = [...this.gh.log];
    return snap;
  }

  /** Full issue (and, for PRs, pull) objects for every referenced or referencing item. */
  private async related(ref: IssueRef, snap: any): Promise<Record<string, any>> {
    const refs: IssueRef[] = [];
    const texts: (string | null | undefined)[] = [snap.issue.body, ...snap.comments.map((c: any) => c.body)];
    for (const c of snap.review_comments ?? []) texts.push(c.body);
    for (const r of snap.reviews ?? []) texts.push(r.body);
    if (snap.pull) for (const c of snap.commits ?? []) texts.push(c.commit?.message);
    for (const t of texts) refs.push(...extractRefs(t, ref));
    for (const ev of snap.timeline) {
      const src = ev.source?.issue;
      if (ev.event === "cross-referenced" && src) {
        const m = /^https:\/\/api\.github\.com\/repos\/([^/]+)\/([^/]+)\//.exec(src.url ?? "");
        if (m) refs.push(new IssueRef(m[1], m[2], src.number));
      }
    }
    const node = snap.graphql?.repository?.issueOrPullRequest ?? {};
    for (const key of ["closedByPullRequestsReferences", "closingIssuesReferences"]) {
      for (const n of node[key]?.nodes ?? []) {
        const [o, r] = n.repository.nameWithOwner.split("/");
        refs.push(new IssueRef(o, r, n.number));
      }
    }
    const related: Record<string, any> = {};
    for (const r of refs) {
      const key = String(r);
      if (r.equals(ref) || key in related) continue;
      try {
        const issue = await this.gh.get(`/repos/${r.fullRepo}/issues/${r.number}`);
        const entry: any = { issue };
        if (issue.pull_request) entry.pull = await this.gh.get(`/repos/${r.fullRepo}/pulls/${r.number}`);
        related[key] = entry;
      } catch (e) {
        if (!(e instanceof GitHubError)) throw e;
        related[key] = { error: { status: e.status, message: e.message } };
      }
    }
    return related;
  }
}
