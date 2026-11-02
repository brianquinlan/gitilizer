// Synthetic GitHub snapshots shaped like real API responses, for offline tests.
const user = (login: string) => ({ login, type: "User" });

type Opts = {
  owner?: string; repo?: string; number?: number; pr?: boolean; author?: string; assignees?: string[]; requested?: string[];
  comments?: { by: string; at: string; body: string }[]; reviews?: { by: string; state: string; at: string; body?: string }[];
  commits?: { sha: string; at: string; msg?: string }[]; labels?: string[]; body?: string; created?: string; updated?: string;
  fetched?: string; baseRef?: string; stack?: any; related?: any;
};

export function makeSnapshot(o: Opts = {}): any {
  const { owner = "dart-lang", repo = "http", number = 1, pr = false, author = "alice", assignees = [], requested = [],
    comments = [], reviews = [], commits = [], labels = [], body = "Body", created = "2026-01-01T00:00:00Z",
    updated = "2026-10-20T00:00:00Z", fetched = "2026-10-25T16:00:00Z", baseRef = "main", stack, related } = o;
  const issue: any = {
    number, html_url: `https://github.com/${owner}/${repo}/${pr ? "pull" : "issues"}/${number}`, title: `Title ${number}`, state: "open",
    user: user(author), author_association: "MEMBER", body, labels: labels.map((name) => ({ name })), assignees: assignees.map(user),
    created_at: created, updated_at: updated, comments: comments.length, reactions: { total_count: 2, "+1": 2, "-1": 0 },
  };
  if (pr) issue.pull_request = { url: "...", merged_at: null };
  const timeline: any[] = [];
  for (const c of comments) timeline.push({ event: "commented", actor: user(c.by), user: user(c.by), created_at: c.at, body: c.body });
  for (const r of reviews) timeline.push({ event: "reviewed", user: user(r.by), state: r.state.toLowerCase(), submitted_at: r.at, body: r.body ?? "" });
  for (const c of commits) timeline.push({ event: "committed", sha: c.sha, message: c.msg ?? "fix", author: { name: author, date: c.at }, committer: { name: author, date: c.at } });
  timeline.push({ event: "subscribed", actor: user("bob"), created_at: created });
  const snap: any = {
    schema_version: 1, ref: { owner, repo, number }, fetched_at: fetched,
    repo: { full_name: `${owner}/${repo}`, description: "A repo", stargazers_count: 1000, open_issues_count: 100, archived: false, default_branch: "main" },
    issue, comments: comments.map((c) => ({ user: user(c.by), created_at: c.at, body: c.body })), timeline, related: related ?? {}, fetch_warnings: [],
  };
  if (pr) {
    snap.pull = {
      number, draft: false, merged_at: null, mergeable_state: "clean", additions: 10, deletions: 2, changed_files: 1,
      requested_reviewers: requested.map(user), head: { label: `${author}:feature`, ref: "feature" }, base: { ref: baseRef },
    };
    snap.reviews = reviews.map((r) => ({ user: user(r.by), state: r.state, submitted_at: r.at, body: r.body ?? "" }));
    snap.review_comments = [];
    snap.commits = commits.map((c) => ({ sha: c.sha, commit: { committer: { date: c.at } } }));
    snap.files = [{ filename: "lib/a.dart", additions: 10, deletions: 2 }];
    snap.graphql = { repository: { issueOrPullRequest: { reviewDecision: "REVIEW_REQUIRED", reviewThreads: { nodes: [] } } } };
    snap.stack = stack ?? { default_branch: "main", below: [], above: [] };
  }
  return snap;
}
