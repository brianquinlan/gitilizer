"""Turn a raw GitHub snapshot into the text the prioritization agent reads.

Two things happen here:

1. Deterministic *signals* are computed from the raw data (who acted last, my
   roles on the item, my latest review and whether commits landed after it,
   PR-stack status, ...). These are facts, not judgements, and they save the
   model from having to reconstruct them from a long event log.
2. The full chronological activity log is rendered compactly, with long
   threads trimmed in the middle so the context stays bounded.

Everything is computed "as of" `now`, normally the snapshot's `fetched_at`, so
an evaluation is reproducible regardless of when it is run.
"""

from __future__ import annotations

import datetime as dt
import re
from dataclasses import dataclass, field
from typing import Any

BODY_LIMIT = 4000
EVENT_BODY_LIMIT = 1500
TRIMMED_BODY_LIMIT = 200
KEEP_HEAD_EVENTS = 4
KEEP_TAIL_EVENTS = 25
MAX_CONTEXT_CHARS = 60_000

# Timeline events that carry no prioritization signal.
_NOISE_EVENTS = {
    "subscribed", "unsubscribed", "head_ref_force_pushed", "head_ref_deleted", "head_ref_restored",
    "base_ref_changed", "automatic_base_change_succeeded", "automatic_base_change_failed",
    "added_to_project", "moved_columns_in_project", "removed_from_project", "converted_note_to_issue",
    "comment_deleted", "deployed", "deployment_environment_changed", "pinned", "unpinned",
    "auto_merge_enabled", "auto_merge_disabled", "auto_squash_enabled", "auto_rebase_enabled",
    "user_blocked", "connected", "disconnected", "transferred", "marked_as_duplicate",
}

_CC_RE = re.compile(r"\b(cc|fyi|/cc|cc:)\b", re.IGNORECASE)
_BOT_RE = re.compile(r"(\[bot\]$|-bot$|^bot-|^dependabot|^github-actions|^copybara|^google-cla|^gemini-code-assist)", re.IGNORECASE)


@dataclass
class UserSettings:
    github_login: str
    interested_repos: list[dict] = field(default_factory=list)  # [{repo, filter?}]
    collaborators: list[str] = field(default_factory=list)
    # Teams whose review requests count as requests to me, e.g. "dart-lang/dart-ecosystem-team".
    review_teams: list[str] = field(default_factory=list)

    @classmethod
    def from_dict(cls, d: dict) -> "UserSettings":
        return cls(
            github_login=d["github_login"],
            interested_repos=[r if isinstance(r, dict) else {"repo": r} for r in d.get("interested_repos") or []],
            collaborators=list(d.get("collaborators") or []),
            review_teams=list(d.get("review_teams") or []),
        )

    def is_my_team(self, org: str, slug: str) -> bool:
        return any(t.lower() in (f"{org}/{slug}".lower(), slug.lower()) for t in self.review_teams)

    def repo_interest(self, full_repo: str) -> dict | None:
        for r in self.interested_repos:
            if r["repo"].lower() == full_repo.lower():
                return r
        return None


def parse_time(s: str | None) -> dt.datetime | None:
    if not s:
        return None
    return dt.datetime.fromisoformat(s.replace("Z", "+00:00"))


def fmt_age(t: dt.datetime | None, now: dt.datetime) -> str:
    if t is None:
        return "unknown"
    days = (now - t).total_seconds() / 86400
    if days < 1:
        return f"{max(0, round(days * 24))}h ago"
    if days < 60:
        return f"{round(days)}d ago"
    if days < 730:
        return f"{round(days / 30.4)}mo ago"
    return f"{days / 365.25:.1f}y ago"


def _login(u: Any) -> str | None:
    if isinstance(u, dict):
        return u.get("login")
    return u


def is_bot(login: str | None) -> bool:
    return bool(login) and bool(_BOT_RE.search(login))


def _trim(text: str | None, limit: int) -> str:
    text = (text or "").strip()
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL).strip()
    if len(text) <= limit:
        return text
    return text[:limit].rstrip() + f" …[{len(text) - limit} more chars]"


@dataclass
class Event:
    at: dt.datetime
    actor: str | None
    kind: str
    body: str = ""
    detail: str = ""

    def render(self, now: dt.datetime, body_limit: int, me: str) -> str:
        who = self.actor or "?"
        if who.lower() == me.lower():
            who += " (ME)"
        head = f"[{self.at.strftime('%Y-%m-%d %H:%M')}Z, {fmt_age(self.at, now)}] {who} {self.kind}"
        if self.detail:
            head += f" {self.detail}"
        if self.body:
            body = _trim(self.body, body_limit)
            if body:
                head += ":\n    " + body.replace("\n", "\n    ")
        return head


def build_events(snap: dict) -> list[Event]:
    """Merge timeline, inline review comments, and commits into one chronological log."""
    issue = snap["issue"]
    opened = "opened this PR" if issue.get("pull_request") else "opened this issue"
    events: list[Event] = [Event(parse_time(issue["created_at"]), _login(issue.get("user")), opened)]
    for ev in snap.get("timeline", []):
        kind = ev.get("event")
        if kind in _NOISE_EVENTS or kind is None:
            continue
        if kind == "commented":
            t, actor = parse_time(ev.get("created_at")), _login(ev.get("actor") or ev.get("user"))
            events.append(Event(t, actor, "commented", ev.get("body") or ""))
        elif kind == "reviewed":
            t = parse_time(ev.get("submitted_at"))
            if t is None:
                continue
            state = (ev.get("state") or "").upper()
            events.append(Event(t, _login(ev.get("user")), f"reviewed [{state}]", ev.get("body") or ""))
        elif kind == "committed":
            t = parse_time(((ev.get("committer") or {}).get("date")) or ((ev.get("author") or {}).get("date")))
            if t is None:
                continue
            author = (ev.get("author") or {}).get("name")
            msg = (ev.get("message") or "").splitlines()[0] if ev.get("message") else ""
            events.append(Event(t, author, "pushed commit", detail=f"{(ev.get('sha') or '')[:7]} {msg!r}"))
        elif kind == "cross-referenced":
            src = (ev.get("source") or {}).get("issue") or {}
            m = re.match(r"https://github\.com/([^/]+/[^/]+)/", src.get("html_url", ""))
            where = f"{m.group(1)}#{src.get('number')}" if m else f"#{src.get('number')}"
            kind_s = "PR" if src.get("pull_request") else "issue"
            events.append(
                Event(
                    parse_time(ev.get("created_at")), _login(ev.get("actor")), "referenced this from",
                    detail=f"{kind_s} {where} {src.get('title')!r} (state: {src.get('state')})",
                )
            )
        elif kind in ("labeled", "unlabeled"):
            events.append(Event(parse_time(ev.get("created_at")), _login(ev.get("actor")), kind,
                                detail=repr((ev.get("label") or {}).get("name"))))
        elif kind in ("assigned", "unassigned"):
            events.append(Event(parse_time(ev.get("created_at")), _login(ev.get("actor")), kind,
                                detail=_login(ev.get("assignee")) or ""))
        elif kind in ("review_requested", "review_request_removed"):
            target = _login(ev.get("requested_reviewer")) or (ev.get("requested_team") or {}).get("slug")
            events.append(Event(parse_time(ev.get("created_at")), _login(ev.get("actor")), kind, detail=target or ""))
        elif kind in ("mentioned",):
            # GitHub emits one per mentioned user; the comment itself is already in the log.
            continue
        elif kind in ("renamed",):
            r = ev.get("rename") or {}
            events.append(Event(parse_time(ev.get("created_at")), _login(ev.get("actor")), "renamed",
                                detail=f"{r.get('from')!r} -> {r.get('to')!r}"))
        elif kind in ("milestoned", "demilestoned"):
            events.append(Event(parse_time(ev.get("created_at")), _login(ev.get("actor")), kind,
                                detail=repr((ev.get("milestone") or {}).get("title"))))
        elif kind == "referenced":
            sha = (ev.get("commit_id") or "")[:7]
            events.append(Event(parse_time(ev.get("created_at")), _login(ev.get("actor")),
                                "referenced this in commit", detail=sha))
        else:
            t = parse_time(ev.get("created_at") or ev.get("submitted_at"))
            if t is None:
                continue
            events.append(Event(t, _login(ev.get("actor") or ev.get("user")), kind.replace("_", " ")))

    # Inline review comments are not in the issue timeline.
    for c in snap.get("review_comments", []):
        reply = " (reply)" if c.get("in_reply_to_id") else ""
        events.append(
            Event(parse_time(c.get("created_at")), _login(c.get("user")), f"left inline review comment{reply}",
                  c.get("body") or "", detail=f"on {c.get('path')}")
        )
    events = [e for e in events if e.at is not None]
    events.sort(key=lambda e: e.at)
    return events


def compute_signals(snap: dict, user: UserSettings, now: dt.datetime) -> dict[str, Any]:
    me = user.github_login.lower()
    issue = snap["issue"]
    is_pr = bool(issue.get("pull_request"))
    pull = snap.get("pull") or {}
    author = _login(issue.get("user")) or ""
    assignees = [a["login"] for a in issue.get("assignees") or []]
    requested = [u["login"] for u in pull.get("requested_reviewers") or []]

    texts: list[tuple[str | None, str]] = [(author, issue.get("body") or "")]
    texts += [(_login(c.get("user")), c.get("body") or "") for c in snap.get("comments", [])]
    texts += [(_login(c.get("user")), c.get("body") or "") for c in snap.get("review_comments", [])]
    texts += [(_login(r.get("user")), r.get("body") or "") for r in snap.get("reviews", [])]
    mention_re = re.compile(rf"@{re.escape(user.github_login)}\b", re.IGNORECASE)
    mentions_of_me = []
    for who, body in texts:
        for m in mention_re.finditer(body):
            line_start = body.rfind("\n", 0, m.start()) + 1
            line = body[line_start: body.find("\n", m.end()) if body.find("\n", m.end()) != -1 else len(body)]
            mentions_of_me.append({"by": who, "informational_cc": bool(_CC_RE.search(line)), "line": line.strip()[:200]})

    events = build_events(snap)
    human = [e for e in events if e.actor and not is_bot(e.actor) and e.kind != "pushed commit"]
    last = human[-1] if human else None
    mine = [e for e in events if (e.actor or "").lower() == me]
    my_last = mine[-1] if mine else None

    roles = []
    if author.lower() == me:
        roles.append("author")
    if me in (a.lower() for a in assignees):
        roles.append("assignee")
    if me in (r.lower() for r in requested):
        roles.append("requested_reviewer")
    my_teams = [t["slug"] for t in pull.get("requested_teams") or [] if user.is_my_team(snap["ref"]["owner"], t["slug"])]
    if my_teams:
        roles.append(f"requested_reviewer_via_team({', '.join(my_teams)})")
    if any((_login(c.get("user")) or "").lower() == me for c in snap.get("comments", [])):
        roles.append("commenter")
    if author.lower() != me and any((_login(r.get("user")) or "").lower() == me for r in snap.get("reviews", [])):
        roles.append("reviewer")  # (replies on my own PR show up as reviews; don't count those)
    if mentions_of_me:
        roles.append("mentioned")
    interest = user.repo_interest(f"{snap['ref']['owner']}/{snap['ref']['repo']}")
    if interest:
        roles.append("watches_repo")

    sig: dict[str, Any] = {
        "type": "pull_request" if is_pr else "issue",
        "my_roles": roles or ["none"],
        "repo_interest_filter": (interest or {}).get("filter"),
        "author_is_collaborator": author.lower() in (c.lower() for c in user.collaborators),
        "last_human_activity": f"{last.actor} {last.kind} {fmt_age(last.at, now)}" if last else None,
        "last_human_actor_is_me": bool(last and (last.actor or "").lower() == me),
        "my_last_activity": f"{my_last.kind} {fmt_age(my_last.at, now)}" if my_last else "never",
        "mentions_of_me": mentions_of_me[-5:],
        "days_since_update": round((now - parse_time(issue["updated_at"])).total_seconds() / 86400, 1),
        "days_since_created": round((now - parse_time(issue["created_at"])).total_seconds() / 86400, 1),
    }

    if is_pr:
        reviews = [r for r in snap.get("reviews", []) if r.get("submitted_at")]
        commits = snap.get("commits", [])
        last_commit_at = max(
            (parse_time(((c.get("commit") or {}).get("committer") or {}).get("date")) for c in commits),
            default=None,
        )
        my_reviews = [r for r in reviews if (_login(r.get("user")) or "").lower() == me]
        if my_reviews:
            mr = max(my_reviews, key=lambda r: r["submitted_at"])
            mr_at = parse_time(mr["submitted_at"])
            sig["my_latest_review"] = {
                "state": mr["state"],
                "at": fmt_age(mr_at, now),
                "commits_pushed_after": sum(
                    1 for c in commits
                    if (t := parse_time(((c.get("commit") or {}).get("committer") or {}).get("date"))) and t > mr_at
                ),
                "author_activity_after": any(
                    e.at > mr_at and (e.actor or "").lower() == author.lower() for e in events
                ),
            }
        others = {}
        for r in sorted(reviews, key=lambda r: r["submitted_at"]):
            who = _login(r.get("user")) or "?"
            if who.lower() in (me, author.lower()) or r["state"] == "COMMENTED" and who in others:
                continue
            others[who] = f"{r['state']} {fmt_age(parse_time(r['submitted_at']), now)}"
        sig["other_reviews"] = others
        gql = ((snap.get("graphql") or {}).get("repository") or {}).get("issueOrPullRequest") or {}
        sig["review_decision"] = gql.get("reviewDecision")
        threads = (gql.get("reviewThreads") or {}).get("nodes") or []
        sig["unresolved_review_threads"] = sum(1 for t in threads if not t.get("isResolved"))
        sig["draft"] = bool(pull.get("draft"))
        sig["merged"] = bool(pull.get("merged_at"))
        sig["mergeable_state"] = pull.get("mergeable_state")
        sig["size"] = f"+{pull.get('additions')}/-{pull.get('deletions')} in {pull.get('changed_files')} files"
        sig["last_commit"] = fmt_age(last_commit_at, now) if last_commit_at else None
        stack = snap.get("stack") or {}
        below = [b for b in stack.get("below", []) if b.get("pull")]
        if below:
            sig["stacked_on"] = [
                {
                    "pr": f"#{b['pull']['number']}",
                    "title": b["pull"]["title"],
                    "author": _login(b["pull"].get("user")),
                    "state": _pr_state(b["pull"]),
                    "reviews": sorted({f"{_login(r.get('user'))}:{r.get('state')}" for r in b.get("reviews", [])})
                    or "none",
                    "requested_reviewers": [_login(u) for u in b["pull"].get("requested_reviewers") or []],
                }
                for b in below
            ]
        elif stack.get("below"):
            sig["stacked_on"] = f"branch {stack['below'][0]['base_ref']!r} (no PR found)"
        if stack.get("above"):
            sig["stacked_below"] = [f"#{p['number']} {p['title']!r} ({_pr_state(p)})" for p in stack["above"]]
    return sig


def _pr_state(p: dict) -> str:
    if p.get("merged_at") or (p.get("pull_request") or {}).get("merged_at"):
        return "merged"
    return ("draft " if p.get("draft") else "") + (p.get("state") or "?")


def render_related(snap: dict, now: dt.datetime) -> list[str]:
    gql = ((snap.get("graphql") or {}).get("repository") or {}).get("issueOrPullRequest") or {}
    closers = {
        f"{n['repository']['nameWithOwner']}#{n['number']}"
        for k in ("closedByPullRequestsReferences", "closingIssuesReferences")
        for n in (gql.get(k) or {}).get("nodes", [])
    }
    lines = []
    for key, entry in (snap.get("related") or {}).items():
        if "error" in entry:
            continue
        r = entry["issue"]
        pull = entry.get("pull") or {}
        kind = "PR" if r.get("pull_request") else "issue"
        state = _pr_state(pull) if pull else (r.get("state") or "?")
        if r.get("state_reason") and not pull:
            state += f" ({r['state_reason']})"
        link = " [linked: closes/closed-by]" if key in closers else ""
        assignees = [_login(a) for a in r.get("assignees") or []]
        lines.append(
            f"- {kind} {key}{link} {r.get('title')!r}: {state}, by {_login(r.get('user'))}, "
            f"updated {fmt_age(parse_time(r.get('updated_at')), now)}"
            + (f", assignees {assignees}" if assignees else "")
            + (f", labels {[l['name'] for l in r.get('labels') or []]}" if r.get("labels") else "")
        )
    return lines


def build_context(snap: dict, user: UserSettings, now: dt.datetime | None = None,
                  include_signals: bool = True, thumbs_down_at: str | None = None) -> str:
    now = now or parse_time(snap["fetched_at"])
    issue = snap["issue"]
    ref = snap["ref"]
    full = f"{ref['owner']}/{ref['repo']}"
    is_pr = bool(issue.get("pull_request"))
    pull = snap.get("pull") or {}
    repo = snap.get("repo") or {}
    me = user.github_login

    out: list[str] = []
    out.append(f"# {'PULL REQUEST' if is_pr else 'ISSUE'} {full}#{ref['number']}: {issue['title']}")
    out.append(f"url: {issue['html_url']}")
    out.append(f"state: {issue['state']}" + (" (draft)" if pull.get("draft") else ""))
    out.append(f"author: {_login(issue.get('user'))} (association with repo: {issue.get('author_association')})")
    out.append(f"created: {issue['created_at']} ({fmt_age(parse_time(issue['created_at']), now)})")
    out.append(f"last updated: {issue['updated_at']} ({fmt_age(parse_time(issue['updated_at']), now)})")
    out.append(f"labels: {[l['name'] for l in issue.get('labels') or []]}")
    out.append(f"assignees: {[a['login'] for a in issue.get('assignees') or []]}")
    if issue.get("milestone"):
        out.append(f"milestone: {issue['milestone'].get('title')}")
    if is_pr:
        out.append(f"requested reviewers: {[u['login'] for u in pull.get('requested_reviewers') or []]}")
        if pull.get("requested_teams"):
            out.append(f"requested teams: {[t['slug'] for t in pull['requested_teams']]}")
        out.append(f"branch: {pull.get('head', {}).get('label')} -> {pull.get('base', {}).get('ref')}")
    reactions = {k: v for k, v in (issue.get("reactions") or {}).items() if isinstance(v, int) and v and k != "total_count"}
    if reactions:
        out.append(f"reactions: {reactions}")
    out.append(
        f"repository: {full} — {repo.get('description') or ''} "
        f"(stars: {repo.get('stargazers_count')}, open issues: {repo.get('open_issues_count')}, archived: {repo.get('archived')})"
    )
    if thumbs_down_at:
        out.append(f"thumbs_down_at: {thumbs_down_at}")
    if snap.get("as_of"):
        out.append(f"(state reconstructed as of {snap['as_of']}; caveats: {'; '.join(snap.get('rewind_limitations', []))})")

    if include_signals:
        out.append("\n## Derived signals (computed from the data below)")
        for k, v in compute_signals(snap, user, now).items():
            out.append(f"- {k}: {v}")

    if is_pr and snap.get("files"):
        files = snap["files"]
        shown = ", ".join(f"{f['filename']} (+{f['additions']}/-{f['deletions']})" for f in files[:15])
        more = f" … and {len(files) - 15} more" if len(files) > 15 else ""
        out.append(f"\n## Changed files ({len(files)})\n{shown}{more}")

    related = render_related(snap, now)
    if related:
        out.append("\n## Related issues and PRs")
        out.extend(related)

    out.append("\n## Description")
    out.append(_trim(issue.get("body"), BODY_LIMIT) or "(empty)")

    events = build_events(snap)
    out.append(f"\n## Activity ({len(events)} events, oldest first)")
    if len(events) > KEEP_HEAD_EVENTS + KEEP_TAIL_EVENTS:
        head, mid, tail = events[:KEEP_HEAD_EVENTS], events[KEEP_HEAD_EVENTS:-KEEP_TAIL_EVENTS], events[-KEEP_TAIL_EVENTS:]
        out += [e.render(now, EVENT_BODY_LIMIT, me) for e in head]
        out.append(f"… {len(mid)} older events condensed …")
        out += [e.render(now, TRIMMED_BODY_LIMIT, me) for e in mid if e.body or e.actor and e.actor.lower() == me.lower()]
        out += [e.render(now, EVENT_BODY_LIMIT, me) for e in tail]
    else:
        out += [e.render(now, EVENT_BODY_LIMIT, me) for e in events]

    text = "\n".join(out)
    if len(text) > MAX_CONTEXT_CHARS:
        cut = len(text) - MAX_CONTEXT_CHARS
        text = text[:MAX_CONTEXT_CHARS // 3] + f"\n… [{cut} chars of activity omitted] …\n" + text[-(2 * MAX_CONTEXT_CHARS // 3):]
    return text
