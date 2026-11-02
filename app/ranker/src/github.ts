// A thin GitHub REST/GraphQL client for the snapshot downloader and the setup
// check. (The app itself uses Octokit, in app/server.)

const API = "https://api.github.com";
const ISSUE_URL_RE = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/(issues|pull)\/(\d+)/;

export class GitHubError extends Error {
  constructor(public status: number, message: string, public url: string) {
    super(`GitHub ${status} for ${url}: ${message}`);
  }
}

export class IssueRef {
  constructor(public owner: string, public repo: string, public number: number) {}
  get fullRepo() { return `${this.owner}/${this.repo}`; }
  /** Filesystem-safe identifier, e.g. dart-lang__http__2031. */
  get key() { return `${this.owner}__${this.repo}__${this.number}`; }
  toString() { return `${this.owner}/${this.repo}#${this.number}`; }
  equals(o: IssueRef) { return this.owner === o.owner && this.repo === o.repo && this.number === o.number; }

  static parse(urlOrRef: string): IssueRef {
    const s = urlOrRef.trim();
    let m = ISSUE_URL_RE.exec(s);
    if (m) return new IssueRef(m[1], m[2], Number(m[4]));
    m = /^([^/\s]+)\/([^#\s]+)#(\d+)$/.exec(s);
    if (m) return new IssueRef(m[1], m[2], Number(m[3]));
    throw new Error(`Not a GitHub issue/PR reference: '${urlOrRef}'`);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class GitHub {
  token: string | null;
  /** Every request made: {method, url, status}. Reset by callers as needed. */
  log: { method: string; url: string; status: number }[] = [];

  constructor(token?: string | null, private accept = "application/vnd.github+json", private fetchImpl: typeof fetch = fetch) {
    this.token = token !== undefined ? token : process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
  }

  private async request(method: string, url: string, body?: unknown, params?: Record<string, string | number>): Promise<Response> {
    let u = url.startsWith("http") ? url : API + url;
    if (params) {
      const q = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)]));
      u += (u.includes("?") ? "&" : "?") + q;
    }
    let r: Response | undefined;
    for (let attempt = 0; attempt < 5; attempt++) {
      r = await this.fetchImpl(u, {
        method,
        headers: {
          accept: this.accept, "x-github-api-version": "2022-11-28", "user-agent": "gitilizer",
          ...(this.token ? { authorization: `Bearer ${this.token}` } : {}),
          ...(body !== undefined ? { "content-type": "application/json" } : {}),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(60_000),
      });
      this.log.push({ method, url: r.url || u, status: r.status });
      const text = [403, 429].includes(r.status) ? (await r.clone().text()).toLowerCase() : "";
      if ([502, 503, 504].includes(r.status) || ([403, 429].includes(r.status) && (text.includes("rate limit") || text.includes("secondary")))) {
        const reset = r.headers.get("retry-after") ?? r.headers.get("x-ratelimit-reset");
        let wait = 2 ** attempt;
        if (reset && /^\d+$/.test(reset)) {
          const v = Number(reset);
          wait = Math.max(1, Math.min(120, v > 1e9 ? v - Math.floor(Date.now() / 1000) : v));
        }
        await sleep(wait * 1000);
        continue;
      }
      if (r.status >= 400) {
        const raw = await r.text();
        let msg = raw;
        try { msg = JSON.parse(raw).message ?? raw; } catch { /* not JSON */ }
        throw new GitHubError(r.status, String(msg).slice(0, 500), u);
      }
      return r;
    }
    throw new GitHubError(r!.status, "retries exhausted", u);
  }

  async get(path: string, params?: Record<string, string | number>): Promise<any> {
    return (await this.request("GET", path, undefined, params)).json();
  }

  async paginate(path: string, params: Record<string, string | number> = {}): Promise<any[]> {
    const out: any[] = [];
    let url: string | null = path;
    let first = true;
    while (url) {
      const r = await this.request("GET", url, undefined, first ? { per_page: 100, ...params } : undefined);
      first = false;
      const data = await r.json();
      out.push(...(Array.isArray(data) ? data : data.items ?? []));
      url = /<([^>]+)>;\s*rel="next"/.exec(r.headers.get("link") ?? "")?.[1] ?? null;
    }
    return out;
  }

  async graphql(query: string, variables: Record<string, unknown>): Promise<any> {
    const data = await (await this.request("POST", `${API}/graphql`, { query, variables })).json();
    if (data.errors) throw new GitHubError(200, JSON.stringify(data.errors).slice(0, 500), "graphql");
    return data.data;
  }

  async viewerLogin(): Promise<string | null> {
    try { return (await this.get("/user")).login ?? null; } catch (e) { if (e instanceof GitHubError) return null; throw e; }
  }

  rateLimit() { return this.get("/rate_limit"); }
}
