"""Build the data for the ranking UI from a ground-truth file.

    python -m gitilizer.ranking_sheet eval/ground_truth.yaml --out eval/ranking.json

For each item it writes what a person needs to rank it, as of its snapshot (or
`as_of`) time: header facts, the description, and the whole conversation in
time order (comments, reviews, inline review comments, label / assignment /
review-request events, commits, cross-references). It writes plain text only, no
HTML.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import yaml

from .context import UserSettings, build_events, compute_signals, fmt_age, parse_time, render_related
from .github import IssueRef
from .rewind import iso, rewind

BODY_LIMIT = 12_000
EVENT_LIMIT = 6_000


def _clean(text: str | None, limit: int) -> str:
    t = re.sub(r"<!--.*?-->", "", text or "", flags=re.S).strip()
    return t if len(t) <= limit else t[:limit].rstrip() + f"\n…[{len(t) - limit} more characters]"


def item_view(entry: dict, fixtures: Path, user: UserSettings) -> dict:
    ref = IssueRef.parse(entry["url"])
    snap = json.loads((fixtures / f"{ref.key}.json").read_text(encoding="utf-8"))
    if entry.get("as_of"):
        snap = rewind(snap, entry["as_of"])
    now = parse_time(snap["fetched_at"])
    sig = compute_signals(snap, user, now)
    issue, pull = snap["issue"], snap.get("pull") or {}
    timeline = [
        {
            "who": e.actor or "?",
            "bot": bool(e.actor) and bool(re.search(r"\[bot\]$|-bot$|^github-actions|^dependabot|^gemini-code-assist|^google-cla", e.actor or "")),
            "at": e.at.strftime("%Y-%m-%d %H:%M"),
            "ago": fmt_age(e.at, now),
            "what": e.kind + (f" {e.detail}" if e.detail else ""),
            "text": _clean(e.body, EVENT_LIMIT),
        }
        for e in build_events(snap)
    ]
    return {
        "id": str(ref),
        "url": entry["url"],
        "title": issue["title"],
        "kind": "PR" if issue.get("pull_request") else "Issue",
        "state": ("draft " if pull.get("draft") else "") + issue["state"],
        "author": (issue.get("user") or {}).get("login"),
        "labels": [l["name"] for l in issue.get("labels") or []],
        "assignees": [a["login"] for a in issue.get("assignees") or []],
        "requested": [u["login"] for u in pull.get("requested_reviewers") or []]
        + [t["slug"] + " (team)" for t in pull.get("requested_teams") or []],
        "repo_desc": (snap.get("repo") or {}).get("description"),
        "created": fmt_age(parse_time(issue["created_at"]), now),
        "updated": fmt_age(parse_time(issue["updated_at"]), now),
        "snapshot": snap["fetched_at"],
        "as_of": iso(entry.get("as_of")),
        "thumbs_down_at": iso(entry.get("thumbs_down_at")),
        "roles": [r for r in sig["my_roles"] if r != "none"],
        "last": sig["last_human_activity"],
        "stacked_on": sig.get("stacked_on"),
        "related": [r[2:] for r in render_related(snap, now)],
        "body": _clean(issue.get("body"), BODY_LIMIT),
        "timeline": timeline,
        "note": (entry.get("why") or "").strip(),
        "prd_note": (entry.get("prd_why") or "").strip(),
        "set": entry.get("set"),
    }


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("truth")
    ap.add_argument("--fixtures", default="eval/fixtures")
    ap.add_argument("--out", required=True)
    args = ap.parse_args(argv)
    doc = yaml.safe_load(Path(args.truth).read_text(encoding="utf-8"))
    user = UserSettings.from_dict(doc["user"])
    items = [item_view(e, Path(args.fixtures), user) for e in doc["items"]]
    out = {"user": doc["user"]["github_login"], "items": items}
    Path(args.out).write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
    print(f"wrote {args.out}: {len(items)} items, {Path(args.out).stat().st_size // 1024} KiB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
