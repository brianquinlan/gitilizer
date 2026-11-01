"""Reconstruct how a snapshot looked at an earlier time ("as of").

Snapshots always store the complete, current GitHub responses. To evaluate an
item in a state it was in earlier (e.g. while it had a `needs-info` label),
`rewind(snap, as_of)` returns a copy that drops everything that happened after
`as_of` and rolls back the fields the timeline lets us reconstruct:

- comments, timeline events, reviews, inline review comments, commits
- issue state / closed_at / state_reason (from closed / reopened events)
- labels, assignees, title (from labeled / unlabeled, assigned / unassigned, renamed)
- PR requested reviewers, draft status, merged state
- related issues and stacked PRs: dropped if created later; reopened/unmerged
  if closed/merged later
- review threads: comments after `as_of` dropped

GitHub has no history for these, so they are cleared or left as-is and listed
in `rewind_limitations`: issue/comment body edits, reactions, PR
mergeable_state, changed-file list and line counts, and whether a review thread
was resolved at the time.
"""

from __future__ import annotations

import copy
import datetime as dt
from typing import Any

LIMITATIONS = [
    "issue and comment bodies are shown as currently edited",
    "reactions removed (no timestamps)",
    "PR mergeable_state, changed files and line counts are current values",
    "review-thread resolution status unknown",
]


def _t(s: "str | dt.datetime | None") -> dt.datetime | None:
    if not s:
        return None
    if isinstance(s, dt.datetime):
        return s if s.tzinfo else s.replace(tzinfo=dt.timezone.utc)
    return dt.datetime.fromisoformat(s.replace("Z", "+00:00"))


def iso(value: "str | dt.datetime | None") -> str | None:
    """Normalise a timestamp (YAML may give a datetime) to '...Z' ISO 8601."""
    t = _t(value)
    return _iso(t) if t else None


def _iso(t: dt.datetime) -> str:
    return t.astimezone(dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def event_time(ev: dict) -> dt.datetime | None:
    for k in ("created_at", "submitted_at"):
        if ev.get(k):
            return _t(ev[k])
    for k in ("committer", "author"):
        if isinstance(ev.get(k), dict) and ev[k].get("date"):
            return _t(ev[k]["date"])
    return None


def _login(u: Any) -> str | None:
    return u.get("login") if isinstance(u, dict) else u


def _rewind_issue_like(obj: dict, T: dt.datetime) -> dict:
    """Roll back state/merge fields of an issue or pull object (no timeline)."""
    o = dict(obj)
    if (c := _t(o.get("closed_at"))) and c > T:
        o["state"], o["closed_at"] = "open", None
        if "state_reason" in o:
            o["state_reason"] = None
    if (m := _t(o.get("merged_at"))) and m > T:
        o["merged_at"], o["merged"], o["merged_by"] = None, False, None
    if isinstance(o.get("pull_request"), dict) and (m := _t(o["pull_request"].get("merged_at"))) and m > T:
        o["pull_request"] = {**o["pull_request"], "merged_at": None}
    return o


def rewind(snap: dict, as_of: str) -> dict:
    T = _t(as_of)
    if T is None:
        raise ValueError("as_of is required")
    created = _t(snap["issue"]["created_at"])
    if created and created > T:
        raise ValueError(f"{snap['ref']} was created at {snap['issue']['created_at']}, after as_of {as_of}")

    s = copy.deepcopy(snap)
    timeline = snap.get("timeline", [])
    before = [e for e in timeline if (t := event_time(e)) is None or t <= T]
    after = [e for e in timeline if (t := event_time(e)) is not None and t > T]
    s["timeline"] = [e for e in before if event_time(e) is not None]

    # ---- issue object
    issue = s["issue"]
    labels = {l["name"]: l for l in issue.get("labels") or []}
    assignees = {a["login"]: a for a in issue.get("assignees") or []}
    title = issue.get("title")
    for e in sorted(after, key=event_time, reverse=True):
        k = e.get("event")
        if k == "labeled":
            labels.pop((e.get("label") or {}).get("name"), None)
        elif k == "unlabeled":
            lab = e.get("label") or {}
            labels[lab.get("name")] = {"name": lab.get("name"), "color": lab.get("color")}
        elif k == "assigned":
            assignees.pop(_login(e.get("assignee")), None)
        elif k == "unassigned":
            a = e.get("assignee") or {}
            assignees[a.get("login")] = a
        elif k == "renamed":
            title = (e.get("rename") or {}).get("from", title)
    issue["labels"] = list(labels.values())
    issue["assignees"] = list(assignees.values())
    issue["assignee"] = issue["assignees"][0] if issue["assignees"] else None
    issue["title"] = title

    # state from the last close/reopen event at or before T
    state_events = [e for e in before if e.get("event") in ("closed", "reopened", "merged")]
    if state_events:
        last = max(state_events, key=event_time)
        closed = last.get("event") in ("closed", "merged")
        issue["state"] = "closed" if closed else "open"
        issue["closed_at"] = last.get("created_at") if closed else None
        if not closed:
            issue["state_reason"] = "reopened"
    else:
        issue["state"], issue["closed_at"] = "open", None
        issue["state_reason"] = None
    issue = _rewind_issue_like(issue, T) if issue["state"] == "open" else issue
    issue.pop("reactions", None)

    s["comments"] = [c for c in snap.get("comments", []) if _t(c.get("created_at")) <= T]
    issue["comments"] = len(s["comments"])
    times = [created] + [event_time(e) for e in s["timeline"]]
    times += [_t(c.get("created_at")) for c in s["comments"]]
    issue["updated_at"] = _iso(max(t for t in times if t))
    s["issue"] = issue

    # ---- pull request bundle
    if s.get("pull"):
        pull = _rewind_issue_like(s["pull"], T)
        pull["state"] = issue["state"]
        # Requested reviewers: replay forward up to T. Every request has an event,
        # and GitHub clears a user's request when they submit a review.
        reviewers: dict[str, dict] = {}
        teams: dict[str, dict] = {}
        for e in sorted((e for e in before if event_time(e)), key=event_time):
            k = e.get("event")
            who = e.get("requested_reviewer")
            team = e.get("requested_team")
            if k == "review_requested":
                if who:
                    reviewers[_login(who)] = who
                if team:
                    teams[team.get("slug")] = team
            elif k == "review_request_removed":
                if who:
                    reviewers.pop(_login(who), None)
                if team:
                    teams.pop(team.get("slug"), None)
            elif k == "reviewed":
                reviewers.pop(_login(e.get("user")), None)
        draft = pull.get("draft")
        for e in sorted(after, key=event_time, reverse=True):
            k = e.get("event")
            if k == "convert_to_draft":
                draft = False
            elif k == "ready_for_review":
                draft = True
        pull["requested_reviewers"] = list(reviewers.values())
        pull["requested_teams"] = list(teams.values())
        pull["draft"] = draft
        pull["mergeable_state"] = None
        pull["updated_at"] = issue["updated_at"]
        s["pull"] = pull
        s["reviews"] = [r for r in snap.get("reviews", []) if (t := _t(r.get("submitted_at"))) and t <= T]
        s["review_comments"] = [c for c in snap.get("review_comments", []) if _t(c.get("created_at")) <= T]
        s["commits"] = [
            c for c in snap.get("commits", [])
            if (t := _t(((c.get("commit") or {}).get("committer") or {}).get("date"))) is None or t <= T
        ]

        stack = s.get("stack")
        if stack:
            stack["below"] = [
                {**b, "pull": _rewind_issue_like(b["pull"], T),
                 "reviews": [r for r in b.get("reviews", []) if (t := _t(r.get("submitted_at"))) and t <= T]}
                if b.get("pull") and _t(b["pull"].get("created_at")) <= T else b
                for b in stack.get("below", [])
                if not b.get("pull") or _t(b["pull"].get("created_at")) <= T
            ]
            stack["above"] = [_rewind_issue_like(p, T) for p in stack.get("above", [])
                              if _t(p.get("created_at")) <= T]

    # ---- GraphQL extras
    node = ((s.get("graphql") or {}).get("repository") or {}).get("issueOrPullRequest")
    if node:
        if "reviewDecision" in node:
            node["reviewDecision"] = None
        threads = (node.get("reviewThreads") or {}).get("nodes")
        if threads is not None:
            kept = []
            for th in threads:
                cs = [c for c in (th.get("comments") or {}).get("nodes", []) if _t(c.get("createdAt")) <= T]
                if cs:
                    kept.append({**th, "isResolved": None, "comments": {**th["comments"], "nodes": cs}})
            node["reviewThreads"]["nodes"] = kept

    # ---- related items
    related = {}
    for key, entry in (s.get("related") or {}).items():
        if "error" in entry:
            related[key] = entry
            continue
        if _t(entry["issue"].get("created_at")) and _t(entry["issue"]["created_at"]) > T:
            continue
        e2 = {"issue": _rewind_issue_like(entry["issue"], T)}
        if entry.get("pull"):
            e2["pull"] = _rewind_issue_like(entry["pull"], T)
        related[key] = e2
    s["related"] = related

    s["fetched_at"] = _iso(T)
    s["as_of"] = _iso(T)
    s["rewind_limitations"] = list(LIMITATIONS)
    return s
