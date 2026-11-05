// Reconstruct how a snapshot looked at an earlier time ("as of").
//
// Snapshots always store the complete, current GitHub responses. To evaluate
// an item in a state it was in earlier (e.g. while it had a `needs-info`
// label), `rewind(snap, asOf)` returns a copy that drops everything that
// happened after `asOf` and rolls back the fields the timeline lets us
// reconstruct:
//
// - comments, timeline events, reviews, inline review comments, commits
// - issue state / closed_at / state_reason (from closed / reopened events)
// - labels, assignees, title (from labeled / unlabeled, assigned / unassigned, renamed)
// - PR requested reviewers, draft status, merged state
// - related issues and stacked PRs: dropped if created later; reopened/unmerged
//   if closed/merged later
// - review threads: comments after `asOf` dropped
//
// GitHub has no history for these, so they are cleared or left as-is and listed
// in `rewind_limitations`: issue/comment body edits, reactions, PR
// mergeable_state, changed-file list and line counts, and whether a review
// thread was resolved at the time.

type Json = any;

export const LIMITATIONS = [
  "issue and comment bodies are shown as currently edited",
  "reactions removed (no timestamps)",
  "PR mergeable_state, changed files and line counts are current values",
  "review-thread resolution status unknown",
];

/** Milliseconds for an ISO timestamp or a Date (YAML may give one), or null. */
function t(s: string | Date | null | undefined): number | null {
  if (!s) return null;
  if (s instanceof Date) return s.getTime();
  const ms = Date.parse(/[zZ]|[+-]\d\d:?\d\d$/.test(s) ? s : `${s}Z`);
  return Number.isNaN(ms) ? null : ms;
}

const isoMs = (ms: number) => new Date(Math.floor(ms / 1000) * 1000).toISOString().replace(".000Z", "Z");

/** Normalise a timestamp (YAML may give a Date) to '...Z' ISO 8601. */
export function iso(value: string | Date | null | undefined): string | null {
  const ms = t(value);
  return ms === null ? null : isoMs(ms);
}

export function eventTime(ev: Json): number | null {
  for (const k of ["created_at", "submitted_at"]) if (ev[k]) return t(ev[k]);
  for (const k of ["committer", "author"]) if (ev[k] && typeof ev[k] === "object" && ev[k].date) return t(ev[k].date);
  return null;
}

const login = (u: Json) => (u && typeof u === "object" ? u.login : u);

/** Roll back state/merge fields of an issue or pull object (no timeline). */
function rewindIssueLike(obj: Json, T: number): Json {
  const o = { ...obj };
  const c = t(o.closed_at);
  if (c !== null && c > T) {
    o.state = "open";
    o.closed_at = null;
    if ("state_reason" in o) o.state_reason = null;
  }
  const m = t(o.merged_at);
  if (m !== null && m > T) { o.merged_at = null; o.merged = false; o.merged_by = null; }
  if (o.pull_request && typeof o.pull_request === "object") {
    const pm = t(o.pull_request.merged_at);
    if (pm !== null && pm > T) o.pull_request = { ...o.pull_request, merged_at: null };
  }
  return o;
}

const byTime = (a: Json, b: Json) => eventTime(a)! - eventTime(b)!;
const byTimeDesc = (a: Json, b: Json) => eventTime(b)! - eventTime(a)!;

export function rewind(snap: Json, asOf: string): Json {
  const T = t(asOf);
  if (T === null) throw new Error("as_of is required");
  const created = t(snap.issue.created_at);
  if (created !== null && created > T) {
    throw new Error(`${JSON.stringify(snap.ref)} was created at ${snap.issue.created_at}, after as_of ${asOf}`);
  }

  const s: Json = structuredClone(snap);
  const timeline: Json[] = snap.timeline ?? [];
  const before = timeline.filter((e) => { const x = eventTime(e); return x === null || x <= T; });
  const after = timeline.filter((e) => { const x = eventTime(e); return x !== null && x > T; });
  s.timeline = structuredClone(before.filter((e) => eventTime(e) !== null));

  // ---- issue object
  const issue = s.issue;
  const labels = new Map<string, Json>((issue.labels ?? []).map((l: Json) => [l.name, l]));
  const assignees = new Map<string, Json>((issue.assignees ?? []).map((a: Json) => [a.login, a]));
  let title = issue.title;
  // Python's sort(reverse=True) keeps equal items in their original order.
  for (const e of [...after].sort(byTimeDesc)) {
    const k = e.event;
    if (k === "labeled") labels.delete((e.label || {}).name);
    else if (k === "unlabeled") {
      const lab = e.label || {};
      labels.set(lab.name, { name: lab.name ?? null, color: lab.color ?? null });
    } else if (k === "assigned") assignees.delete(login(e.assignee));
    else if (k === "unassigned") {
      const a = e.assignee || {};
      assignees.set(a.login, a);
    } else if (k === "renamed") {
      const r = e.rename || {};
      title = "from" in r ? r.from : title;
    }
  }
  issue.labels = [...labels.values()];
  issue.assignees = [...assignees.values()];
  issue.assignee = issue.assignees.length ? issue.assignees[0] : null;
  issue.title = title;

  // state from the last close/reopen event at or before T
  const stateEvents = before.filter((e) => ["closed", "reopened", "merged"].includes(e.event));
  let iss = issue;
  if (stateEvents.length) {
    let last = stateEvents[0];
    for (const e of stateEvents.slice(1)) if ((eventTime(e) ?? -Infinity) > (eventTime(last) ?? -Infinity)) last = e;
    const closed = ["closed", "merged"].includes(last.event);
    iss.state = closed ? "closed" : "open";
    iss.closed_at = closed ? (last.created_at ?? null) : null;
    if (!closed) iss.state_reason = "reopened";
  } else {
    iss.state = "open";
    iss.closed_at = null;
    iss.state_reason = null;
  }
  if (iss.state === "open") iss = rewindIssueLike(iss, T);
  delete iss.reactions;

  s.comments = structuredClone((snap.comments ?? []).filter((c: Json) => t(c.created_at)! <= T));
  iss.comments = s.comments.length;
  const times = [created, ...s.timeline.map(eventTime), ...s.comments.map((c: Json) => t(c.created_at))].filter((x) => x);
  iss.updated_at = isoMs(Math.max(...(times as number[])));
  s.issue = iss;

  // ---- PR bundle
  if (s.pull) {
    const pull = rewindIssueLike(s.pull, T);
    pull.state = iss.state;
    // Requested reviewers: replay forward up to T. Every request has an event,
    // and GitHub clears a user's request when they submit a review.
    const reviewers = new Map<string, Json>();
    const teams = new Map<string, Json>();
    for (const e of before.filter((e) => eventTime(e)).sort(byTime)) {
      const k = e.event;
      const who = e.requested_reviewer;
      const team = e.requested_team;
      if (k === "review_requested") {
        if (who) reviewers.set(login(who), who);
        if (team) teams.set(team.slug, team);
      } else if (k === "review_request_removed") {
        if (who) reviewers.delete(login(who));
        if (team) teams.delete(team.slug);
      } else if (k === "reviewed") {
        reviewers.delete(login(e.user));
      }
    }
    let draft = pull.draft;
    for (const e of [...after].sort(byTimeDesc)) {
      if (e.event === "convert_to_draft") draft = false;
      else if (e.event === "ready_for_review") draft = true;
    }
    pull.requested_reviewers = structuredClone([...reviewers.values()]);
    pull.requested_teams = structuredClone([...teams.values()]);
    pull.draft = draft ?? null;
    pull.mergeable_state = null;
    pull.updated_at = iss.updated_at;
    s.pull = pull;
    s.reviews = structuredClone((snap.reviews ?? []).filter((r: Json) => { const x = t(r.submitted_at); return x !== null && x <= T; }));
    s.review_comments = structuredClone((snap.review_comments ?? []).filter((c: Json) => t(c.created_at)! <= T));
    s.commits = structuredClone((snap.commits ?? []).filter((c: Json) => {
      const x = t(((c.commit || {}).committer || {}).date);
      return x === null || x <= T;
    }));

    const stack = s.stack;
    if (stack) {
      stack.below = (stack.below ?? [])
        .filter((b: Json) => !b.pull || t(b.pull.created_at)! <= T)
        .map((b: Json) => (b.pull && t(b.pull.created_at)! <= T
          ? { ...b, pull: rewindIssueLike(b.pull, T), reviews: (b.reviews ?? []).filter((r: Json) => { const x = t(r.submitted_at); return x !== null && x <= T; }) }
          : b));
      stack.above = (stack.above ?? []).filter((p: Json) => t(p.created_at)! <= T).map((p: Json) => rewindIssueLike(p, T));
    }
  }

  // ---- GraphQL extras
  const node = ((s.graphql || {}).repository || {}).issueOrPullRequest;
  if (node) {
    if ("reviewDecision" in node) node.reviewDecision = null;
    const threads = (node.reviewThreads || {}).nodes;
    if (threads !== undefined && threads !== null) {
      const kept: Json[] = [];
      for (const th of threads) {
        const cs = ((th.comments || {}).nodes ?? []).filter((c: Json) => t(c.createdAt)! <= T);
        if (cs.length) kept.push({ ...th, isResolved: null, comments: { ...th.comments, nodes: cs } });
      }
      node.reviewThreads.nodes = kept;
    }
  }

  // ---- related items
  const related: Record<string, Json> = {};
  for (const [key, entry] of Object.entries<Json>(s.related || {})) {
    if ("error" in entry) { related[key] = entry; continue; }
    const c = t(entry.issue.created_at);
    if (c !== null && c > T) continue;
    const e2: Json = { issue: rewindIssueLike(entry.issue, T) };
    if (entry.pull) e2.pull = rewindIssueLike(entry.pull, T);
    related[key] = e2;
  }
  s.related = related;

  s.fetched_at = isoMs(T);
  s.as_of = isoMs(T);
  s.rewind_limitations = [...LIMITATIONS];
  return s;
}
