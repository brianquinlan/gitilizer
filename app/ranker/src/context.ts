// Turn a raw GitHub snapshot into the text the prioritization agent reads.
//
// Two things happen here:
//
// 1. Deterministic *signals* are computed from the raw data (who acted last,
//    my roles on the item, my latest review and whether commits landed after
//    it, PR-stack status, ...). These are facts, not judgements, and they save
//    the model from having to reconstruct them from a long event log.
// 2. The full chronological activity log is rendered compactly, with long
//    threads trimmed in the middle so the context stays bounded.
//
// Everything is computed "as of" `now`, normally the snapshot's `fetched_at`,
// so an evaluation is reproducible regardless of when it is run.
//
// This is a port of the Python ranker's context.py. Its output is identical,
// character for character (test/golden.test.ts), so measurements made with the
// Python version still hold.
import {
  WORD_BOUNDARY, cpLen, cpSlice, fixed, float, parseTime, pyRound, pyRoundInt, reEscape, repr, rstrip, splitlines,
  str, strftimeMinutes, strip, type Time,
} from "./py.ts";

export const BODY_LIMIT = 4000;
export const EVENT_BODY_LIMIT = 1500;
export const TRIMMED_BODY_LIMIT = 200;
export const KEEP_HEAD_EVENTS = 4;
export const KEEP_TAIL_EVENTS = 25;
export const MAX_CONTEXT_CHARS = 60_000;

type Json = any; // GitHub API responses, as stored in snapshots

/** Timeline events that carry no prioritization signal. */
const NOISE_EVENTS = new Set([
  "subscribed", "unsubscribed", "head_ref_force_pushed", "head_ref_deleted", "head_ref_restored",
  "base_ref_changed", "automatic_base_change_succeeded", "automatic_base_change_failed",
  "added_to_project", "moved_columns_in_project", "removed_from_project", "converted_note_to_issue",
  "comment_deleted", "deployed", "deployment_environment_changed", "pinned", "unpinned",
  "auto_merge_enabled", "auto_merge_disabled", "auto_squash_enabled", "auto_rebase_enabled",
  "user_blocked", "connected", "disconnected", "transferred", "marked_as_duplicate",
]);

const CC_RE = new RegExp(`${WORD_BOUNDARY}(cc|fyi|/cc|cc:)${WORD_BOUNDARY}`, "iu");
const BOT_RE = /(\[bot\]$|-bot$|^bot-|^dependabot|^github-actions|^copybara|^google-cla|^gemini-code-assist)/i;

/** An additional repository and the developer's note about it (PRD SET-9). */
export type RepoInterest = { repo: string; filter?: string };

export class UserSettings {
  constructor(
    public githubLogin: string,
    public interestedRepos: RepoInterest[] = [],
    public collaborators: string[] = [],
    /** Teams whose review requests count as requests to me (the eval set still has these). */
    public reviewTeams: string[] = [],
  ) {}

  /**
   * Accepts the eval set's YAML (`interested_repos` with `filter`) and the
   * server's form (`additional_repos` with `prioritization_prompt`).
   */
  static fromDict(d: Json): UserSettings {
    const repos: RepoInterest[] = "additional_repos" in d
      ? (d.additional_repos ?? []).map((r: Json) => (r.prioritization_prompt ? { repo: r.repo, filter: r.prioritization_prompt } : { repo: r.repo }))
      : (d.interested_repos ?? []).map((r: Json) => (typeof r === "string" ? { repo: r } : r));
    return new UserSettings(d.github_login, repos, [...(d.collaborators ?? [])], [...(d.review_teams ?? [])]);
  }

  isMyTeam(org: string, slug: string): boolean {
    return this.reviewTeams.some((t) => [`${org}/${slug}`.toLowerCase(), slug.toLowerCase()].includes(t.toLowerCase()));
  }

  repoInterest(fullRepo: string): RepoInterest | null {
    return this.interestedRepos.find((r) => r.repo.toLowerCase() === fullRepo.toLowerCase()) ?? null;
  }
}

export { parseTime };

/** "3h ago", "12d ago", "4mo ago", "1.2y ago". */
export function fmtAge(t: Time | null, now: Time): string {
  if (t === null) return "unknown";
  const days = (now.ms - t.ms) / 1000 / 86400;
  if (days < 1) return `${Math.max(0, pyRoundInt(days * 24))}h ago`;
  if (days < 60) return `${pyRoundInt(days)}d ago`;
  if (days < 730) return `${pyRoundInt(days / 30.4)}mo ago`;
  return `${fixed(days / 365.25, 1)}y ago`;
}

const login = (u: Json): string | null => (u && typeof u === "object" ? u.login ?? null : u ?? null);

export function isBot(name: string | null | undefined): boolean {
  return Boolean(name) && BOT_RE.test(name!);
}

function trim(text: string | null | undefined, limit: number): string {
  let t = strip(text ?? "");
  t = strip(t.replace(/<!--[\s\S]*?-->/g, ""));
  const n = cpLen(t);
  if (n <= limit) return t;
  return `${rstrip(cpSlice(t, 0, limit))} …[${n - limit} more chars]`;
}

export class Event {
  constructor(
    public at: Time,
    public actor: string | null,
    public kind: string,
    public body = "",
    public detail = "",
  ) {}

  render(now: Time, bodyLimit: number, me: string): string {
    let who = this.actor || "?";
    if (who.toLowerCase() === me.toLowerCase()) who += " (ME)";
    let head = `[${strftimeMinutes(this.at)}Z, ${fmtAge(this.at, now)}] ${who} ${this.kind}`;
    if (this.detail) head += ` ${this.detail}`;
    if (this.body) {
      const body = trim(this.body, bodyLimit);
      if (body) head += `:\n    ${body.replaceAll("\n", "\n    ")}`;
    }
    return head;
  }
}

/** Merge timeline, inline review comments, and commits into one chronological log. */
export function buildEvents(snap: Json): Event[] {
  const issue = snap.issue;
  const opened = issue.pull_request ? "opened this PR" : "opened this issue";
  const events: (Omit<Event, "at" | "render"> & { at: Time | null })[] = [
    { at: parseTime(issue.created_at), actor: login(issue.user), kind: opened, body: "", detail: "" },
  ];
  const add = (at: Time | null, actor: string | null, kind: string, body = "", detail = "") => events.push({ at, actor, kind, body, detail });
  for (const ev of snap.timeline ?? []) {
    const kind: string | undefined = ev.event;
    if (kind === undefined || kind === null || NOISE_EVENTS.has(kind)) continue;
    if (kind === "commented") {
      add(parseTime(ev.created_at), login(ev.actor || ev.user), "commented", ev.body || "");
    } else if (kind === "reviewed") {
      const t = parseTime(ev.submitted_at);
      if (t === null) continue;
      add(t, login(ev.user), `reviewed [${(ev.state || "").toUpperCase()}]`, ev.body || "");
    } else if (kind === "committed") {
      const t = parseTime((ev.committer || {}).date || (ev.author || {}).date);
      if (t === null) continue;
      const author = (ev.author || {}).name ?? null;
      const msg = ev.message ? (splitlines(ev.message || "")[0] ?? "") : "";
      add(t, author, "pushed commit", "", `${cpSlice(ev.sha || "", 0, 7)} ${repr(msg)}`);
    } else if (kind === "cross-referenced") {
      const src = (ev.source || {}).issue || {};
      const m = /^https:\/\/github\.com\/([^/]+\/[^/]+)\//.exec(src.html_url ?? "");
      const where = m ? `${m[1]}#${str(src.number)}` : `#${str(src.number)}`;
      const kindS = src.pull_request ? "PR" : "issue";
      add(parseTime(ev.created_at), login(ev.actor), "referenced this from", "",
        `${kindS} ${where} ${repr(src.title)} (state: ${str(src.state)})`);
    } else if (kind === "labeled" || kind === "unlabeled") {
      add(parseTime(ev.created_at), login(ev.actor), kind, "", repr((ev.label || {}).name));
    } else if (kind === "assigned" || kind === "unassigned") {
      add(parseTime(ev.created_at), login(ev.actor), kind, "", login(ev.assignee) || "");
    } else if (kind === "review_requested" || kind === "review_request_removed") {
      const target = login(ev.requested_reviewer) || (ev.requested_team || {}).slug;
      add(parseTime(ev.created_at), login(ev.actor), kind, "", target || "");
    } else if (kind === "mentioned") {
      // GitHub emits one per mentioned user; the comment itself is already in the log.
      continue;
    } else if (kind === "renamed") {
      const r = ev.rename || {};
      add(parseTime(ev.created_at), login(ev.actor), "renamed", "", `${repr(r.from)} -> ${repr(r.to)}`);
    } else if (kind === "milestoned" || kind === "demilestoned") {
      add(parseTime(ev.created_at), login(ev.actor), kind, "", repr((ev.milestone || {}).title));
    } else if (kind === "referenced") {
      add(parseTime(ev.created_at), login(ev.actor), "referenced this in commit", "", cpSlice(ev.commit_id || "", 0, 7));
    } else {
      const t = parseTime(ev.created_at || ev.submitted_at);
      if (t === null) continue;
      add(t, login(ev.actor || ev.user), kind.replaceAll("_", " "));
    }
  }
  // Inline review comments are not in the issue timeline.
  for (const c of snap.review_comments ?? []) {
    const reply = c.in_reply_to_id ? " (reply)" : "";
    add(parseTime(c.created_at), login(c.user), `left inline review comment${reply}`, c.body || "", `on ${str(c.path)}`);
  }
  return events
    .filter((e) => e.at !== null)
    .map((e) => new Event(e.at!, e.actor, e.kind, e.body, e.detail))
    .sort((a, b) => a.at.ms - b.at.ms); // stable, like Python's sort
}

function prState(p: Json): string {
  if (p.merged_at || (p.pull_request || {}).merged_at) return "merged";
  return (p.draft ? "draft " : "") + (p.state || "?");
}

/** Python's max(xs, key=k): the first of the largest. */
function maxBy<T>(xs: T[], key: (x: T) => string | number): T {
  let best = xs[0];
  for (const x of xs.slice(1)) if (key(x) > key(best)) best = x;
  return best;
}

export function computeSignals(snap: Json, user: UserSettings, now: Time): Record<string, unknown> {
  const me = user.githubLogin.toLowerCase();
  const issue = snap.issue;
  const isPr = Boolean(issue.pull_request);
  const pull = snap.pull || {};
  const author: string = login(issue.user) || "";
  const assignees: string[] = (issue.assignees || []).map((a: Json) => a.login);
  const requested: string[] = (pull.requested_reviewers || []).map((u: Json) => u.login);

  const texts: [string | null, string][] = [[author, issue.body || ""]];
  for (const c of snap.comments ?? []) texts.push([login(c.user), c.body || ""]);
  for (const c of snap.review_comments ?? []) texts.push([login(c.user), c.body || ""]);
  for (const r of snap.reviews ?? []) texts.push([login(r.user), r.body || ""]);
  const mentionRe = new RegExp(`@${reEscape(user.githubLogin)}${WORD_BOUNDARY}`, "giu");
  const mentionsOfMe: Record<string, unknown>[] = [];
  for (const [who, body] of texts) {
    for (const m of body.matchAll(mentionRe)) {
      const start = m.index!;
      const end = start + m[0].length;
      const lineStart = body.lastIndexOf("\n", start - 1) + 1;
      const nl = body.indexOf("\n", end);
      const line = body.slice(lineStart, nl !== -1 ? nl : body.length);
      mentionsOfMe.push({ by: who, informational_cc: CC_RE.test(line), line: cpSlice(strip(line), 0, 200) });
    }
  }

  const events = buildEvents(snap);
  const human = events.filter((e) => e.actor && !isBot(e.actor) && e.kind !== "pushed commit");
  const last = human.length ? human[human.length - 1] : null;
  const mine = events.filter((e) => (e.actor || "").toLowerCase() === me);
  const myLast = mine.length ? mine[mine.length - 1] : null;

  const roles: string[] = [];
  if (author.toLowerCase() === me) roles.push("author");
  if (assignees.some((a) => a.toLowerCase() === me)) roles.push("assignee");
  if (requested.some((r) => r.toLowerCase() === me)) roles.push("requested_reviewer");
  const myTeams = (pull.requested_teams || []).filter((t: Json) => user.isMyTeam(snap.ref.owner, t.slug)).map((t: Json) => t.slug);
  if (myTeams.length) roles.push(`requested_reviewer_via_team(${myTeams.join(", ")})`);
  if ((snap.comments ?? []).some((c: Json) => (login(c.user) || "").toLowerCase() === me)) roles.push("commenter");
  // (replies on my own PR show up as reviews; don't count those)
  if (author.toLowerCase() !== me && (snap.reviews ?? []).some((r: Json) => (login(r.user) || "").toLowerCase() === me)) roles.push("reviewer");
  if (mentionsOfMe.length) roles.push("mentioned");
  const interest = user.repoInterest(`${snap.ref.owner}/${snap.ref.repo}`);
  if (interest) roles.push("watches_repo");

  const sig: Record<string, unknown> = {
    type: isPr ? "pull_request" : "issue",
    my_roles: roles.length ? roles : ["none"],
    repo_interest_filter: interest?.filter ?? null,
    author_is_collaborator: user.collaborators.some((c) => c.toLowerCase() === author.toLowerCase()),
    last_human_activity: last ? `${str(last.actor)} ${last.kind} ${fmtAge(last.at, now)}` : null,
    last_human_actor_is_me: Boolean(last && (last.actor || "").toLowerCase() === me),
    my_last_activity: myLast ? `${myLast.kind} ${fmtAge(myLast.at, now)}` : "never",
    mentions_of_me: mentionsOfMe.slice(-5),
    days_since_update: float(pyRound((now.ms - parseTime(issue.updated_at)!.ms) / 1000 / 86400, 1)),
    days_since_created: float(pyRound((now.ms - parseTime(issue.created_at)!.ms) / 1000 / 86400, 1)),
  };

  if (isPr) {
    const reviews: Json[] = (snap.reviews ?? []).filter((r: Json) => r.submitted_at);
    const commits: Json[] = snap.commits ?? [];
    const commitTime = (c: Json) => parseTime(((c.commit || {}).committer || {}).date);
    const commitTimes = commits.map(commitTime).filter((t): t is Time => t !== null);
    const lastCommitAt = commitTimes.length ? maxBy(commitTimes, (t) => t.ms) : null;
    const myReviews = reviews.filter((r) => (login(r.user) || "").toLowerCase() === me);
    if (myReviews.length) {
      const mr = maxBy(myReviews, (r) => r.submitted_at);
      const mrAt = parseTime(mr.submitted_at)!;
      sig.my_latest_review = {
        state: mr.state,
        at: fmtAge(mrAt, now),
        commits_pushed_after: commits.filter((c) => { const t = commitTime(c); return t !== null && t.ms > mrAt.ms; }).length,
        author_activity_after: events.some((e) => e.at.ms > mrAt.ms && (e.actor || "").toLowerCase() === author.toLowerCase()),
      };
    }
    const others: Record<string, string> = {};
    for (const r of [...reviews].sort((a, b) => (a.submitted_at < b.submitted_at ? -1 : a.submitted_at > b.submitted_at ? 1 : 0))) {
      const who: string = login(r.user) || "?";
      if ([me, author.toLowerCase()].includes(who.toLowerCase()) || (r.state === "COMMENTED" && who in others)) continue;
      others[who] = `${r.state} ${fmtAge(parseTime(r.submitted_at), now)}`;
    }
    sig.other_reviews = others;
    const gql = ((snap.graphql || {}).repository || {}).issueOrPullRequest || {};
    sig.review_decision = gql.reviewDecision ?? null;
    const threads: Json[] = (gql.reviewThreads || {}).nodes || [];
    sig.unresolved_review_threads = threads.filter((t) => !t.isResolved).length;
    sig.draft = Boolean(pull.draft);
    sig.merged = Boolean(pull.merged_at);
    sig.mergeable_state = pull.mergeable_state ?? null;
    sig.size = `+${str(pull.additions)}/-${str(pull.deletions)} in ${str(pull.changed_files)} files`;
    sig.last_commit = lastCommitAt ? fmtAge(lastCommitAt, now) : null;
    const stack = snap.stack || {};
    const below: Json[] = (stack.below ?? []).filter((b: Json) => b.pull);
    if (below.length) {
      sig.stacked_on = below.map((b) => {
        const reviewSet = [...new Set((b.reviews ?? []).map((r: Json) => `${str(login(r.user))}:${str(r.state)}`))].sort() as string[];
        return {
          pr: `#${str(b.pull.number)}`,
          title: b.pull.title,
          author: login(b.pull.user),
          state: prState(b.pull),
          reviews: reviewSet.length ? reviewSet : "none",
          requested_reviewers: (b.pull.requested_reviewers || []).map(login),
        };
      });
    } else if ((stack.below ?? []).length) {
      sig.stacked_on = `branch ${repr(stack.below[0].base_ref)} (no PR found)`;
    }
    if ((stack.above ?? []).length) {
      sig.stacked_below = stack.above.map((p: Json) => `#${str(p.number)} ${repr(p.title)} (${prState(p)})`);
    }
  }
  return sig;
}

export function renderRelated(snap: Json, now: Time): string[] {
  const gql = ((snap.graphql || {}).repository || {}).issueOrPullRequest || {};
  const closers = new Set<string>();
  for (const k of ["closedByPullRequestsReferences", "closingIssuesReferences"]) {
    for (const n of (gql[k] || {}).nodes ?? []) closers.add(`${n.repository.nameWithOwner}#${n.number}`);
  }
  const lines: string[] = [];
  for (const [key, entry] of Object.entries<Json>(snap.related || {})) {
    if ("error" in entry) continue;
    const r = entry.issue;
    const pull = entry.pull || {};
    const hasPull = Object.keys(pull).length > 0;
    const kind = r.pull_request ? "PR" : "issue";
    let state = hasPull ? prState(pull) : (r.state || "?");
    if (r.state_reason && !hasPull) state += ` (${str(r.state_reason)})`;
    const link = closers.has(key) ? " [linked: closes/closed-by]" : "";
    const assignees = (r.assignees || []).map(login);
    lines.push(
      `- ${kind} ${key}${link} ${repr(r.title)}: ${state}, by ${str(login(r.user))}, ` +
      `updated ${fmtAge(parseTime(r.updated_at), now)}` +
      (assignees.length ? `, assignees ${repr(assignees)}` : "") +
      ((r.labels || []).length ? `, labels ${repr(r.labels.map((l: Json) => l.name))}` : ""),
    );
  }
  return lines;
}

export function buildContext(
  snap: Json, user: UserSettings, now?: Time | null, includeSignals = true, thumbsDownAt: string | null = null,
): string {
  now = now ?? parseTime(snap.fetched_at)!;
  const issue = snap.issue;
  const ref = snap.ref;
  const full = `${ref.owner}/${ref.repo}`;
  const isPr = Boolean(issue.pull_request);
  const pull = snap.pull || {};
  const repo = snap.repo || {};
  const me = user.githubLogin;

  const out: string[] = [];
  out.push(`# ${isPr ? "PULL REQUEST" : "ISSUE"} ${full}#${str(ref.number)}: ${str(issue.title)}`);
  out.push(`url: ${str(issue.html_url)}`);
  out.push(`state: ${str(issue.state)}` + (pull.draft ? " (draft)" : ""));
  out.push(`author: ${str(login(issue.user))} (association with repo: ${str(issue.author_association)})`);
  out.push(`created: ${str(issue.created_at)} (${fmtAge(parseTime(issue.created_at), now)})`);
  out.push(`last updated: ${str(issue.updated_at)} (${fmtAge(parseTime(issue.updated_at), now)})`);
  out.push(`labels: ${repr((issue.labels || []).map((l: Json) => l.name))}`);
  out.push(`assignees: ${repr((issue.assignees || []).map((a: Json) => a.login))}`);
  if (issue.milestone) out.push(`milestone: ${str(issue.milestone.title)}`);
  if (isPr) {
    out.push(`requested reviewers: ${repr((pull.requested_reviewers || []).map((u: Json) => u.login))}`);
    if ((pull.requested_teams || []).length) out.push(`requested teams: ${repr(pull.requested_teams.map((t: Json) => t.slug))}`);
    out.push(`branch: ${str((pull.head ?? {}).label)} -> ${str((pull.base ?? {}).ref)}`);
  }
  const reactions = Object.fromEntries(
    Object.entries<Json>(issue.reactions || {}).filter(([k, v]) => typeof v === "number" && Number.isInteger(v) && v && k !== "total_count"),
  );
  if (Object.keys(reactions).length) out.push(`reactions: ${repr(reactions)}`);
  out.push(
    `repository: ${full} — ${repo.description || ""} ` +
    `(stars: ${str(repo.stargazers_count)}, open issues: ${str(repo.open_issues_count)}, archived: ${str(repo.archived)})`,
  );
  if (thumbsDownAt) out.push(`thumbs_down_at: ${thumbsDownAt}`);
  if (snap.as_of) out.push(`(state reconstructed as of ${snap.as_of}; caveats: ${(snap.rewind_limitations ?? []).join("; ")})`);

  if (includeSignals) {
    out.push("\n## Derived signals (computed from the data below)");
    for (const [k, v] of Object.entries(computeSignals(snap, user, now))) out.push(`- ${k}: ${str(v)}`);
  }

  if (isPr && (snap.files ?? []).length) {
    const files: Json[] = snap.files;
    const shown = files.slice(0, 15).map((f) => `${str(f.filename)} (+${str(f.additions)}/-${str(f.deletions)})`).join(", ");
    const more = files.length > 15 ? ` … and ${files.length - 15} more` : "";
    out.push(`\n## Changed files (${files.length})\n${shown}${more}`);
  }

  const related = renderRelated(snap, now);
  if (related.length) {
    out.push("\n## Related issues and PRs");
    out.push(...related);
  }

  out.push("\n## Description");
  out.push(trim(issue.body, BODY_LIMIT) || "(empty)");

  const events = buildEvents(snap);
  out.push(`\n## Activity (${events.length} events, oldest first)`);
  if (events.length > KEEP_HEAD_EVENTS + KEEP_TAIL_EVENTS) {
    const head = events.slice(0, KEEP_HEAD_EVENTS);
    const mid = events.slice(KEEP_HEAD_EVENTS, -KEEP_TAIL_EVENTS);
    const tail = events.slice(-KEEP_TAIL_EVENTS);
    out.push(...head.map((e) => e.render(now!, EVENT_BODY_LIMIT, me)));
    out.push(`… ${mid.length} older events condensed …`);
    out.push(...mid.filter((e) => e.body || (e.actor && e.actor.toLowerCase() === me.toLowerCase())).map((e) => e.render(now!, TRIMMED_BODY_LIMIT, me)));
    out.push(...tail.map((e) => e.render(now!, EVENT_BODY_LIMIT, me)));
  } else {
    out.push(...events.map((e) => e.render(now!, EVENT_BODY_LIMIT, me)));
  }

  let text = out.join("\n");
  const n = cpLen(text);
  if (n > MAX_CONTEXT_CHARS) {
    const cut = n - MAX_CONTEXT_CHARS;
    text = `${cpSlice(text, 0, Math.floor(MAX_CONTEXT_CHARS / 3))}\n… [${cut} chars of activity omitted] …\n${cpSlice(text, -Math.floor((2 * MAX_CONTEXT_CHARS) / 3))}`;
  }
  return text;
}
