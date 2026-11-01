// Real GitHub access with Octokit. All errors are converted to GitHubProblem.
import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";
import { GitHubProblem, itemKey, limitSnapshot, type GitHubApi, type ItemState, type SearchHit } from "./types.ts";

const GitilizerOctokit = Octokit.plugin(paginateRest, retry, throttling);
const FULL_MEDIA = "application/vnd.github.full+json";
const MAX_STACK_DEPTH = 6;

const GQL_LINKS = `
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
}`;

const REF_PATTERNS = [
  /https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/(?:issues|pull)\/(\d+)/g,
  /(?<![\w/])([\w.-]+)\/([\w.-]+)#(\d+)\b/g,
  /(?<![\w/&])#(\d+)\b/g,
];

/** Converts an Octokit RequestError into a GitHubProblem (PRD catalogue "Detected when"). */
export function classify(e: any, expiresAt?: string | null): GitHubProblem {
  if (e instanceof GitHubProblem) return e;
  const status: number | undefined = e?.status;
  const headers: Record<string, string> = e?.response?.headers ?? {};
  const message: string = e?.response?.data?.message ?? e?.message ?? String(e);
  const lower = message.toLowerCase();
  if (status === undefined) return new GitHubProblem("unavailable", message);
  if (status === 401) {
    const expired = expiresAt && Date.parse(expiresAt) <= Date.now();
    return new GitHubProblem(expired ? "expired" : "invalid", message, { status });
  }
  if ((status === 403 || status === 429) && (headers["x-ratelimit-remaining"] === "0" || lower.includes("rate limit"))) {
    const reset = headers["x-ratelimit-reset"];
    const resetAt = reset ? new Date(Number(reset) * 1000).toISOString() : undefined;
    return new GitHubProblem("rate_limited", message, { status, resetAt });
  }
  if (status === 403 && lower.includes("forbids access via a personal access token")) {
    const org = /`([^`]+)` organization/.exec(message)?.[1] ?? "";
    const tokenType = lower.includes("(classic)") ? "classic" : "fine-grained";
    return new GitHubProblem("org_blocks_token", message, { status, org, tokenType });
  }
  if (status === 403 && headers["x-github-sso"]) return new GitHubProblem("sso", message, { status });
  if (status === 403 && lower.includes("resource not accessible by personal access token")) {
    return new GitHubProblem("permission", message, { status });
  }
  if (status === 403 && lower.includes("bad credentials")) return new GitHubProblem("invalid", message, { status });
  if (status === 404 || status === 410) return new GitHubProblem("not_found", message, { status });
  if (status >= 500) return new GitHubProblem("unavailable", message, { status });
  return new GitHubProblem("unexpected", message, { status });
}

function hitFrom(raw: any): SearchHit {
  const m = /repos\/([^/]+\/[^/]+)$/.exec(raw.repository_url);
  const repo = m ? m[1] : "";
  return {
    key: itemKey(repo, raw.number),
    repo,
    number: raw.number,
    kind: raw.pull_request ? "pr" : "issue",
    title: raw.title,
    htmlUrl: raw.html_url,
    state: raw.state,
    updatedAt: raw.updated_at,
  };
}

function parseExpiry(h: string | undefined): string | null {
  if (!h) return null;
  // e.g. "2026-11-30 10:00:00 UTC" or "2026-11-30 10:00:00 -0800"
  const t = Date.parse(h.replace(" UTC", "Z").replace(/ ([+-]\d{4})$/, "$1").replace(" ", "T"));
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}

export class OctokitGitHub implements GitHubApi {
  private o: InstanceType<typeof GitilizerOctokit>;
  private expiresAt: string | null = null;

  constructor(token: string) {
    this.o = new GitilizerOctokit({
      auth: token,
      userAgent: "gitilizer",
      throttle: {
        // Primary limit: don't wait inside a scan; surface it so the scheduler can back off.
        onRateLimit: () => false,
        onSecondaryRateLimit: (_after: number, _opts: unknown, _o: unknown, retryCount: number) => retryCount < 2,
      },
      retry: { doNotRetry: [400, 401, 403, 404, 410, 422, 451] },
    });
  }

  private async req(route: string, params: Record<string, unknown> = {}): Promise<any> {
    try {
      const r = await this.o.request(route, { ...params, headers: { accept: FULL_MEDIA, "x-github-api-version": "2022-11-28" } });
      const exp = parseExpiry((r.headers as any)["github-authentication-token-expiration"]);
      if (exp) this.expiresAt = exp;
      return r;
    } catch (e) {
      throw classify(e, this.expiresAt);
    }
  }

  private async pages(route: string, params: Record<string, unknown> = {}): Promise<any[]> {
    try {
      return await this.o.paginate(route as any, { per_page: 100, ...params, headers: { accept: FULL_MEDIA } } as any);
    } catch (e) {
      throw classify(e, this.expiresAt);
    }
  }

  async viewer() {
    const r = await this.req("GET /user");
    return { login: r.data.login as string, tokenExpiresAt: this.expiresAt };
  }

  async teams() {
    try {
      const teams = await this.pages("GET /user/teams");
      return teams.map((t: any) => `${t.organization.login}/${t.slug}`);
    } catch (e) {
      if (e instanceof GitHubProblem && (e.code === "permission" || e.code === "not_found")) return [];
      throw e;
    }
  }

  async search(q: string, limit: number) {
    const hits: SearchHit[] = [];
    let total = 0;
    for (let page = 1; hits.length < limit && page <= 10; page++) {
      const r = await this.req("GET /search/issues", { q, per_page: 100, page });
      total = r.data.total_count;
      const items = r.data.items as any[];
      hits.push(...items.map(hitFrom));
      if (items.length < 100) break;
    }
    return { hits: hits.slice(0, limit), total };
  }

  async item(repo: string, number: number): Promise<ItemState> {
    const r = await this.req(`GET /repos/${repo}/issues/${number}`);
    const raw = r.data;
    let merged = false;
    if (raw.pull_request) merged = Boolean(raw.pull_request.merged_at);
    return { ...hitFrom(raw), merged };
  }

  async repoAccess(fullName: string) {
    try {
      await this.req(`GET /repos/${fullName}`);
      return "ok" as const;
    } catch (e) {
      if (e instanceof GitHubProblem && e.code === "not_found") return "not_found" as const;
      throw e;
    }
  }

  async userExists(login: string) {
    try {
      await this.req(`GET /users/${login}`);
      return true;
    } catch (e) {
      if (e instanceof GitHubProblem && e.code === "not_found") return false;
      throw e;
    }
  }

  /** TypeScript port of gitilizer/snapshot.py (schema_version 2). */
  async snapshot(repo: string, number: number) {
    const [owner, name] = repo.split("/");
    const base = `/repos/${repo}/issues/${number}`;
    const warnings: string[] = [];
    const repoObj = (await this.req(`GET /repos/${repo}`)).data;
    const snap: Record<string, any> = {
      schema_version: 2,
      ref: { owner, repo: name, number },
      fetched_at: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
      repo: repoObj,
      issue: (await this.req(`GET ${base}`)).data,
      comments: await this.pages(`GET ${base}/comments`),
      timeline: await this.pages(`GET ${base}/timeline`),
    };
    if (snap.issue.pull_request) {
      const pb = `/repos/${repo}/pulls/${number}`;
      snap.pull = (await this.req(`GET ${pb}`)).data;
      snap.reviews = await this.pages(`GET ${pb}/reviews`);
      snap.review_comments = await this.pages(`GET ${pb}/comments`);
      snap.commits = await this.pages(`GET ${pb}/commits`);
      snap.files = await this.pages(`GET ${pb}/files`);
      try {
        snap.stack = await this.stack(repo, snap.pull, repoObj.default_branch, warnings);
      } catch (e) {
        warnings.push(`stack lookup failed: ${(e as Error).message}`);
      }
    }
    try {
      snap.graphql = await this.o.graphql(GQL_LINKS, { owner, repo: name, number });
    } catch (e) {
      warnings.push(`GraphQL link lookup failed: ${(e as Error).message}`);
    }
    snap.related = await this.related(repo, number, snap);
    snap.fetch_warnings = warnings;
    snap.requests = [];
    return limitSnapshot(snap);
  }

  private async stack(repo: string, pull: any, defaultBranch: string, warnings: string[]) {
    const below: any[] = [];
    let cur = pull;
    const seen = new Set<number>([pull.number]);
    const owner = repo.split("/")[0];
    for (let i = 0; i < MAX_STACK_DEPTH; i++) {
      const baseRef = cur.base.ref;
      if (baseRef === defaultBranch || cur.base.repo.full_name !== repo) break;
      const cands = (await this.pages(`GET /repos/${repo}/pulls`, { head: `${owner}:${baseRef}`, state: "all" }))
        .filter((c: any) => !seen.has(c.number));
      if (!cands.length) { below.push({ base_ref: baseRef, pull: null, reviews: [] }); break; }
      if (cands.length > 1) warnings.push(`${cands.length} PRs have head ${baseRef}; using #${cands[0].number}`);
      const n = cands[0].number;
      seen.add(n);
      const parent = (await this.req(`GET /repos/${repo}/pulls/${n}`)).data;
      const reviews = await this.pages(`GET /repos/${repo}/pulls/${n}/reviews`);
      below.push({ base_ref: baseRef, pull: parent, reviews });
      cur = parent;
    }
    // Only same-repository branches can have PRs stacked on them (fixes the snapshot.py fork bug).
    const above = pull.head?.repo?.full_name === repo
      ? (await this.pages(`GET /repos/${repo}/pulls`, { base: pull.head.ref, state: "all" })).filter((p: any) => !seen.has(p.number))
      : [];
    return { default_branch: defaultBranch, below, above };
  }

  private async related(repo: string, number: number, snap: Record<string, any>) {
    const [owner, name] = repo.split("/");
    const refs: string[] = [];
    const texts: (string | undefined)[] = [snap.issue.body, ...snap.comments.map((c: any) => c.body)];
    for (const c of snap.review_comments ?? []) texts.push(c.body);
    for (const r of snap.reviews ?? []) texts.push(r.body);
    for (const c of snap.commits ?? []) texts.push(c.commit?.message);
    for (const t of texts) {
      if (!t) continue;
      for (const m of t.matchAll(REF_PATTERNS[0])) refs.push(`${m[1]}/${m[2]}#${m[3]}`);
      for (const m of t.matchAll(REF_PATTERNS[1])) refs.push(`${m[1]}/${m[2]}#${m[3]}`);
      for (const m of t.matchAll(REF_PATTERNS[2])) refs.push(`${owner}/${name}#${m[1]}`);
    }
    for (const ev of snap.timeline) {
      const src = ev.source?.issue;
      const m = src && /repos\/([^/]+)\/([^/]+)\//.exec(src.url ?? "");
      if (ev.event === "cross-referenced" && m) refs.push(`${m[1]}/${m[2]}#${src.number}`);
    }
    const node = snap.graphql?.repository?.issueOrPullRequest ?? {};
    for (const k of ["closedByPullRequestsReferences", "closingIssuesReferences"]) {
      for (const n of node[k]?.nodes ?? []) refs.push(`${n.repository.nameWithOwner}#${n.number}`);
    }
    const related: Record<string, any> = {};
    const self = `${repo}#${number}`;
    for (const r of refs) {
      if (r === self || r in related) continue;
      const [rr, n] = r.split("#");
      try {
        const issue = (await this.req(`GET /repos/${rr}/issues/${n}`)).data;
        const entry: any = { issue };
        if (issue.pull_request) entry.pull = (await this.req(`GET /repos/${rr}/pulls/${n}`)).data;
        related[r] = entry;
      } catch (e) {
        if (e instanceof GitHubProblem && (e.code === "not_found" || e.code === "permission" || e.code === "sso")) {
          related[r] = { error: { status: e.details.status, message: e.message } };
        } else {
          throw e;
        }
      }
    }
    return related;
  }
}
