"""Synthetic GitHub snapshots shaped like real API responses, for offline tests."""

from __future__ import annotations


def user(login, assoc="MEMBER"):
    return {"login": login, "type": "User"}


def make_snapshot(owner="dart-lang", repo="http", number=1, *, pr=False, author="alice", assignees=(),
                  requested=(), comments=(), reviews=(), commits=(), labels=(), body="Body",
                  created="2026-01-01T00:00:00Z", updated="2026-10-20T00:00:00Z",
                  fetched="2026-10-25T16:00:00Z", base_ref="main", stack=None, related=None):
    html = f"https://github.com/{owner}/{repo}/{'pull' if pr else 'issues'}/{number}"
    issue = {
        "number": number, "html_url": html, "title": f"Title {number}", "state": "open",
        "user": user(author), "author_association": "MEMBER", "body": body,
        "labels": [{"name": l} for l in labels], "assignees": [user(a) for a in assignees],
        "created_at": created, "updated_at": updated, "comments": len(comments),
        "reactions": {"total_count": 2, "+1": 2, "-1": 0},
    }
    if pr:
        issue["pull_request"] = {"url": "...", "merged_at": None}
    timeline = []
    for c in comments:
        timeline.append({"event": "commented", "actor": user(c["by"]), "user": user(c["by"]),
                         "created_at": c["at"], "body": c["body"]})
    for r in reviews:
        timeline.append({"event": "reviewed", "user": user(r["by"]), "state": r["state"].lower(),
                         "submitted_at": r["at"], "body": r.get("body", "")})
    for c in commits:
        timeline.append({"event": "committed", "sha": c["sha"], "message": c.get("msg", "fix"),
                         "author": {"name": author, "date": c["at"]}, "committer": {"name": author, "date": c["at"]}})
    timeline.append({"event": "subscribed", "actor": user("bob"), "created_at": created})
    snap = {
        "schema_version": 1,
        "ref": {"owner": owner, "repo": repo, "number": number},
        "fetched_at": fetched,
        "repo": {"full_name": f"{owner}/{repo}", "description": "A repo", "stargazers_count": 1000,
                 "open_issues_count": 100, "archived": False, "default_branch": "main"},
        "issue": issue,
        "comments": [{"user": user(c["by"]), "created_at": c["at"], "body": c["body"]} for c in comments],
        "timeline": timeline,
        "related": related or {},
        "fetch_warnings": [],
    }
    if pr:
        snap["pull"] = {
            "number": number, "draft": False, "merged_at": None, "mergeable_state": "clean",
            "additions": 10, "deletions": 2, "changed_files": 1,
            "requested_reviewers": [user(r) for r in requested],
            "head": {"label": f"{author}:feature", "ref": "feature"}, "base": {"ref": base_ref},
        }
        snap["reviews"] = [{"user": user(r["by"]), "state": r["state"], "submitted_at": r["at"],
                            "body": r.get("body", "")} for r in reviews]
        snap["review_comments"] = []
        snap["commits"] = [{"sha": c["sha"], "commit": {"committer": {"date": c["at"]}}} for c in commits]
        snap["files"] = [{"filename": "lib/a.dart", "additions": 10, "deletions": 2}]
        snap["graphql"] = {"repository": {"issueOrPullRequest": {"reviewDecision": "REVIEW_REQUIRED",
                                                                 "reviewThreads": {"nodes": []}}}}
        snap["stack"] = stack or {"default_branch": "main", "below": [], "above": []}
    return snap
