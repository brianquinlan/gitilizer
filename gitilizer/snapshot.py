"""Download a complete, frozen snapshot of GitHub issues/PRs.

A snapshot stores GitHub API responses verbatim, never trimmed or summarized,
for an item: repository, issue, all comments, the full timeline, and for PRs
the pull, reviews, inline review comments, commits and files. It also includes
everything needed to judge the item in context: every issue/PR it references
or that references it (full issue object, plus full pull object for PRs), the
PRs that close it or that it closes (GraphQL), and the PRs below and above it
in a PR stack (full pull objects with their reviews). Bodies are requested
with the `full+json` media type, so each has `body`, `body_text` and
`body_html`. `requests` records every API call made.

Snapshots are what the prioritizer reads, so an evaluation run against the
same snapshots always sees the same state of the world, no matter what has
happened on GitHub since.

Usage:
    python -m gitilizer.snapshot eval/ground_truth.yaml --out eval/fixtures
    python -m gitilizer.snapshot https://github.com/dart-lang/http/pull/2031 --out eval/fixtures
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
from pathlib import Path
from typing import Any

import yaml

from .env import load_dotenv
from .github import GitHub, GitHubError, IssueRef

SCHEMA_VERSION = 2
FULL_MEDIA = "application/vnd.github.full+json"
MAX_STACK_DEPTH = 6

_REF_PATTERNS = [
    re.compile(r"https://github\.com/([\w.-]+)/([\w.-]+)/(?:issues|pull)/(\d+)"),
    re.compile(r"(?<![\w/])([\w.-]+)/([\w.-]+)#(\d+)\b"),
    re.compile(r"(?<![\w/&])#(\d+)\b"),
]

_GQL_LINKS = """
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
"""


def now_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def extract_refs(text: str | None, default: IssueRef) -> list[IssueRef]:
    if not text:
        return []
    out: list[IssueRef] = []
    for m in _REF_PATTERNS[0].finditer(text):
        out.append(IssueRef(m.group(1), m.group(2), int(m.group(3))))
    for m in _REF_PATTERNS[1].finditer(text):
        out.append(IssueRef(m.group(1), m.group(2), int(m.group(3))))
    for m in _REF_PATTERNS[2].finditer(text):
        out.append(IssueRef(default.owner, default.repo, int(m.group(1))))
    return out


def issue_kind(raw: dict) -> str:
    return "PR" if raw.get("pull_request") else "issue"


class Snapshotter:
    def __init__(self, gh: GitHub):
        self.gh = gh
        self._repo_cache: dict[str, dict] = {}
        self.warnings: list[str] = []

    def _warn(self, msg: str) -> None:
        self.warnings.append(msg)
        print(f"  warning: {msg}", file=sys.stderr)

    def repo(self, full: str) -> dict:
        if full not in self._repo_cache:
            self._repo_cache[full] = self.gh.get(f"/repos/{full}")
        return self._repo_cache[full]

    def _pr_bundle(self, ref: IssueRef) -> dict:
        base = f"/repos/{ref.full_repo}/pulls/{ref.number}"
        return {
            "pull": self.gh.get(base),
            "reviews": self.gh.paginate(base + "/reviews"),
            "review_comments": self.gh.paginate(base + "/comments"),
            "commits": self.gh.paginate(base + "/commits"),
            "files": self.gh.paginate(base + "/files"),
        }

    def _stack(self, ref: IssueRef, pull: dict, default_branch: str) -> dict:
        """PRs this PR is stacked on (below) and PRs stacked on it (above), as full pull objects."""
        below: list[dict] = []
        cur = pull
        seen = {pull["number"]}
        for _ in range(MAX_STACK_DEPTH):
            base_ref = cur["base"]["ref"]
            if base_ref == default_branch or cur["base"]["repo"]["full_name"] != ref.full_repo:
                break
            cands = self.gh.paginate(f"/repos/{ref.full_repo}/pulls", head=f"{ref.owner}:{base_ref}", state="all")
            cands = [c for c in cands if c["number"] not in seen]
            if not cands:
                below.append({"base_ref": base_ref, "pull": None, "reviews": []})
                break
            if len(cands) > 1:
                self._warn(f"{len(cands)} PRs have head {base_ref!r}; using #{cands[0]['number']}")
            n = cands[0]["number"]
            seen.add(n)
            parent = self.gh.get(f"/repos/{ref.full_repo}/pulls/{n}")
            reviews = self.gh.paginate(f"/repos/{ref.full_repo}/pulls/{n}/reviews")
            below.append({"base_ref": base_ref, "pull": parent, "reviews": reviews})
            cur = parent
        # Only a branch in this repository can have PRs stacked on it. For a PR from a fork, a
        # `base=<head branch>` query would list every PR that targets the same branch name
        # (often `master`), which is how dart-lang/http#579 became a 20 MB snapshot.
        head_repo = ((pull.get("head") or {}).get("repo") or {}).get("full_name")
        above = (self.gh.paginate(f"/repos/{ref.full_repo}/pulls", base=pull["head"]["ref"], state="all")
                 if head_repo == ref.full_repo else [])
        return {
            "default_branch": default_branch,
            "below": below,
            "above": [p for p in above if p["number"] not in seen],
        }

    def snapshot(self, ref: IssueRef) -> dict:
        print(f"Fetching {ref} ...", file=sys.stderr)
        self.warnings = []
        self.gh.log = []
        base = f"/repos/{ref.full_repo}/issues/{ref.number}"
        repo = self.repo(ref.full_repo)
        snap: dict[str, Any] = {
            "schema_version": SCHEMA_VERSION,
            "ref": {"owner": ref.owner, "repo": ref.repo, "number": ref.number},
            "fetched_at": now_iso(),
            "repo": repo,
            "issue": self.gh.get(base),
            "comments": self.gh.paginate(base + "/comments"),
            "timeline": self.gh.paginate(base + "/timeline"),
        }
        is_pr = bool(snap["issue"].get("pull_request"))
        if is_pr:
            snap.update(self._pr_bundle(ref))
            try:
                snap["stack"] = self._stack(ref, snap["pull"], repo["default_branch"])
            except GitHubError as e:
                self._warn(f"stack lookup failed: {e}")
        try:
            snap["graphql"] = self.gh.graphql(_GQL_LINKS, owner=ref.owner, repo=ref.repo, number=ref.number)
            node = snap["graphql"]["repository"]["issueOrPullRequest"] or {}
            for k in ("closedByPullRequestsReferences", "closingIssuesReferences", "reviewThreads"):
                if (node.get(k) or {}).get("pageInfo", {}).get("hasNextPage"):
                    self._warn(f"GraphQL {k} has more than 100 entries; only the first 100 were captured")
        except GitHubError as e:
            self._warn(f"GraphQL link lookup failed: {e}")
        snap["related"] = self._related(ref, snap)
        snap["fetch_warnings"] = list(self.warnings)
        snap["requests"] = list(self.gh.log)
        return snap

    def _related(self, ref: IssueRef, snap: dict) -> dict[str, dict]:
        """Full issue (and, for PRs, pull) objects for every referenced/referencing item."""
        refs: list[IssueRef] = []
        texts = [snap["issue"].get("body")] + [c.get("body") for c in snap["comments"]]
        texts += [c.get("body") for c in snap.get("review_comments", [])]
        texts += [r.get("body") for r in snap.get("reviews", [])]
        if snap.get("pull"):
            texts += [(c.get("commit") or {}).get("message") for c in snap.get("commits", [])]
        for t in texts:
            refs.extend(extract_refs(t, ref))
        for ev in snap["timeline"]:
            src = (ev.get("source") or {}).get("issue")
            if ev.get("event") == "cross-referenced" and src:
                m = re.match(r"https://api\.github\.com/repos/([^/]+)/([^/]+)/", src.get("url", ""))
                if m:
                    refs.append(IssueRef(m.group(1), m.group(2), src["number"]))
        node = ((snap.get("graphql") or {}).get("repository") or {}).get("issueOrPullRequest") or {}
        for key in ("closedByPullRequestsReferences", "closingIssuesReferences"):
            for n in (node.get(key) or {}).get("nodes", []):
                o, r = n["repository"]["nameWithOwner"].split("/")
                refs.append(IssueRef(o, r, n["number"]))

        related: dict[str, dict] = {}
        for r in refs:
            key = str(r)
            if r == ref or key in related:
                continue
            try:
                issue = self.gh.get(f"/repos/{r.full_repo}/issues/{r.number}")
                entry: dict[str, Any] = {"issue": issue}
                if issue.get("pull_request"):
                    entry["pull"] = self.gh.get(f"/repos/{r.full_repo}/pulls/{r.number}")
                related[key] = entry
            except GitHubError as e:
                related[key] = {"error": {"status": e.status, "message": str(e)}}
        return related


def load_ground_truth(path: str | Path) -> dict:
    return yaml.safe_load(Path(path).read_text(encoding="utf-8"))


def main(argv: list[str] | None = None) -> int:
    load_dotenv()
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("sources", nargs="+", help="ground_truth.yaml files and/or issue URLs")
    ap.add_argument("--out", default="eval/fixtures")
    ap.add_argument("--force", action="store_true", help="re-download items that already have a snapshot")
    args = ap.parse_args(argv)

    refs: list[IssueRef] = []
    for s in args.sources:
        if s.endswith((".yaml", ".yml")):
            refs += [IssueRef.parse(i["url"]) for i in load_ground_truth(s)["items"]]
        else:
            refs.append(IssueRef.parse(s))

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    gh = GitHub(accept=FULL_MEDIA)
    snapper = Snapshotter(gh)
    failures = 0
    for ref in refs:
        path = out / f"{ref.key}.json"
        if path.exists() and not args.force:
            print(f"Skipping {ref} (snapshot exists; use --force to refresh)", file=sys.stderr)
            continue
        try:
            snap = snapper.snapshot(ref)
        except GitHubError as e:
            print(f"  FAILED {ref}: {e}", file=sys.stderr)
            failures += 1
            continue
        path.write_text(json.dumps(snap, indent=1, ensure_ascii=False), encoding="utf-8")
        print(
            f"  saved {path} ({len(snap['comments'])} comments, {len(snap['timeline'])} timeline events, "
            f"{len(snap['related'])} related, {len(snap['requests'])} requests)",
            file=sys.stderr,
        )
    try:
        rl = gh.rate_limit()["resources"]["core"]
        print(f"GitHub core rate limit remaining: {rl['remaining']}/{rl['limit']}", file=sys.stderr)
    except GitHubError:
        pass
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
