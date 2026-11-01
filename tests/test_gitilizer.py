import json
import sys
from pathlib import Path

import pytest
import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent))

from fakes import make_snapshot  # noqa: E402
from gitilizer import evaluate, prioritizer  # noqa: E402
from gitilizer.context import UserSettings, build_context, compute_signals, parse_time  # noqa: E402
from gitilizer.github import IssueRef  # noqa: E402
from gitilizer.metrics import (all_metrics, discordant_pairs, kendall_tau, ndcg, spearman_rho,  # noqa: E402
                               top_k_overlap)
from gitilizer.prioritizer import Item, ItemAssessment, Ranking, RankedItem, prioritize  # noqa: E402
from gitilizer.snapshot import extract_refs  # noqa: E402

ME = UserSettings("brianquinlan", [{"repo": "dart-lang/http", "filter": "not responsible for http2"}], ["natebosch"])


# ---------------------------------------------------------------- metrics

def test_metrics_identity_and_reverse():
    t = list("abcdef")
    assert kendall_tau(t, t) == 1.0
    assert kendall_tau(t, t[::-1]) == -1.0
    assert spearman_rho(t, t[::-1]) == pytest.approx(-1.0)
    assert ndcg(t, t) == pytest.approx(1.0)
    assert ndcg(t, t[::-1]) < 0.8
    assert top_k_overlap(t, t[::-1], 3) == 0


def test_metrics_single_swap():
    t = list("abcd")
    p = list("bacd")
    assert kendall_tau(t, p) == pytest.approx(4 / 6)  # 5 concordant, 1 discordant
    assert discordant_pairs(t, p) == [("a", "b")]
    m = all_metrics(t, p)
    assert m["top3_overlap"] == 1.0
    assert m["mean_abs_displacement"] == 0.5


def test_metrics_mismatched_ids():
    with pytest.raises(ValueError):
        kendall_tau(["a", "b"], ["a", "c"])


# ---------------------------------------------------------------- refs

def test_issue_ref_parse():
    r = IssueRef.parse("https://github.com/dart-lang/http/pull/2031")
    assert (r.owner, r.repo, r.number, r.key) == ("dart-lang", "http", 2031, "dart-lang__http__2031")
    assert IssueRef.parse("googleapis/google-cloud-dart#382") == IssueRef("googleapis", "google-cloud-dart", 382)
    with pytest.raises(ValueError):
        IssueRef.parse("not a ref")


def test_extract_refs():
    me = IssueRef("dart-lang", "sdk", 48056)
    text = "Fixed by #64644, see also dart-lang/http#12 and https://github.com/googleapis/librarian/pull/7808. Color &#123;"
    refs = set(extract_refs(text, me))
    assert IssueRef("dart-lang", "sdk", 64644) in refs
    assert IssueRef("dart-lang", "http", 12) in refs
    assert IssueRef("googleapis", "librarian", 7808) in refs
    assert IssueRef("dart-lang", "sdk", 123) not in refs


# ---------------------------------------------------------------- context / signals

def approved_pr():
    return make_snapshot(
        number=2033, pr=True, author="natebosch", requested=[],
        reviews=[{"by": "brianquinlan", "state": "APPROVED", "at": "2026-10-21T00:00:00Z", "body": "LGTM"}],
        commits=[{"sha": "abc1234", "at": "2026-10-20T00:00:00Z"}],
    )


def test_signals_approved_pr():
    s = compute_signals(approved_pr(), ME, parse_time("2026-10-25T16:00:00Z"))
    assert s["type"] == "pull_request"
    assert "reviewer" in s["my_roles"] and "watches_repo" in s["my_roles"]
    assert s["my_latest_review"]["state"] == "APPROVED"
    assert s["my_latest_review"]["commits_pushed_after"] == 0
    assert s["last_human_actor_is_me"] is True
    assert s["author_is_collaborator"] is True
    assert s["repo_interest_filter"] == "not responsible for http2"


def test_signals_commits_after_review_and_cc_mention():
    snap = make_snapshot(
        number=5, pr=True, author="stranger",
        comments=[{"by": "alice", "at": "2026-10-22T00:00:00Z", "body": "Looks fine.\ncc @brianquinlan"}],
        reviews=[{"by": "brianquinlan", "state": "CHANGES_REQUESTED", "at": "2026-10-10T00:00:00Z"}],
        commits=[{"sha": "a" * 40, "at": "2026-10-01T00:00:00Z"}, {"sha": "b" * 40, "at": "2026-10-15T00:00:00Z"}],
    )
    s = compute_signals(snap, ME, parse_time("2026-10-25T16:00:00Z"))
    assert s["my_latest_review"]["commits_pushed_after"] == 1
    assert s["mentions_of_me"][0]["informational_cc"] is True
    assert s["last_human_actor_is_me"] is False


def test_stack_signal():
    snap = make_snapshot(number=2031, pr=True, base_ref="stack-1", stack={
        "default_branch": "main",
        "below": [{"base_ref": "stack-1", "pull": {"number": 2030, "title": "Part 1", "state": "open", "merged_at": None,
                                                    "user": {"login": "mosuem"}, "requested_reviewers": []},
                   "reviews": []}],
        "above": [],
    })
    s = compute_signals(snap, ME, parse_time("2026-10-25T16:00:00Z"))
    assert s["stacked_on"][0]["pr"] == "#2030"
    assert s["stacked_on"][0]["reviews"] == "none"


def test_build_context_contents_and_trimming():
    many = [{"by": f"u{i}", "at": f"2026-0{1 + i // 30}-{1 + i % 28:02d}T00:00:00Z", "body": "x" * 3000} for i in range(60)]
    snap = make_snapshot(number=7, comments=many, body="y" * 10000, labels=["type-bug"])
    text = build_context(snap, ME)
    assert "ISSUE dart-lang/http#7" in text
    assert "Derived signals" in text
    assert "older events condensed" in text
    assert "more chars]" in text
    assert "subscribed" not in text  # noise filtered
    assert len(text) <= 62_000
    assert "Derived signals" not in build_context(snap, ME, include_signals=False)


def test_me_marker():
    text = build_context(approved_pr(), ME)
    assert "brianquinlan (ME) reviewed [APPROVED]" in text


# ---------------------------------------------------------------- prioritizer

class FakeLLM:
    """Scores by a lookup on the item number appearing in the context."""

    def __init__(self, prios):
        self.prios = prios
        self.calls = []

    def generate(self, system, user, schema):
        self.calls.append((system, user, schema))
        if schema is ItemAssessment:
            for num, p in self.prios.items():
                if f"#{num}:" in user:
                    return ItemAssessment(actionable=p > 0.5, next_action="do it", priority=p, reasoning="r"), {
                        "prompt_tokens": 10, "output_tokens": 5, "thinking_tokens": 0}
            raise AssertionError("unknown item")
        ids = [line.split("id: ")[1].split(" ")[0] for line in user.splitlines() if line.startswith("======== id: ")]
        ordered = sorted(ids, key=lambda i: -self.prios[int(i.split("#")[1])])
        return Ranking(items=[RankedItem(id=i, actionable=True, next_action="", priority=0.5, reasoning="")
                              for i in ordered[:-1]]), {}


def items3():
    return [
        Item("dart-lang/http#1", make_snapshot(number=1, updated="2026-10-01T00:00:00Z")),
        Item("dart-lang/http#2", make_snapshot(number=2, updated="2026-10-24T00:00:00Z")),
        Item("dart-lang/http#3", make_snapshot(number=3, updated="2026-10-10T00:00:00Z")),
    ]


def test_pointwise_orders_by_priority_and_includes_user_settings():
    llm = FakeLLM({1: 0.9, 2: 0.1, 3: 0.5})
    out = prioritize(items3(), ME, llm=llm, guidance="GUIDANCE")
    assert [s.id for s in out] == ["dart-lang/http#1", "dart-lang/http#3", "dart-lang/http#2"]
    system = llm.calls[0][0]
    assert system.startswith("GUIDANCE")
    assert "brianquinlan" in system and "not responsible for http2" in system and "natebosch" in system
    assert "current_time: 2026-10-25T16:00:00Z" in llm.calls[0][1]


def test_pointwise_tie_break_by_recency_and_errors():
    class Boom(FakeLLM):
        def generate(self, system, user, schema):
            if "#3:" in user:
                raise RuntimeError("quota")
            return super().generate(system, user, schema)

    out = prioritize(items3(), ME, llm=Boom({1: 0.5, 2: 0.5, 3: 0.5}), guidance="g")
    assert [s.id for s in out] == ["dart-lang/http#2", "dart-lang/http#1", "dart-lang/http#3"]
    assert out[-1].error and "quota" in out[-1].error


def test_listwise_appends_omitted():
    out = prioritize(items3(), ME, strategy="listwise", llm=FakeLLM({1: 0.9, 2: 0.1, 3: 0.5}), guidance="g")
    assert [s.id for s in out] == ["dart-lang/http#1", "dart-lang/http#3", "dart-lang/http#2"]
    assert out[-1].error == "omitted by model"


def test_recency():
    out = prioritize(items3(), ME, strategy="recency")
    assert [s.id for s in out] == ["dart-lang/http#2", "dart-lang/http#3", "dart-lang/http#1"]


def test_default_prompt_is_v4():
    assert prioritizer.DEFAULT_PROMPT.name == "v4.md"
    text = prioritizer.DEFAULT_PROMPT.read_text(encoding="utf-8")
    assert "Security comes first" in text and "## Review requests" in text


# ---------------------------------------------------------------- end to end

def _setup_eval(tmp_path):
    fixtures = tmp_path / "fixtures"
    fixtures.mkdir()
    truth = {"user": {"github_login": "brianquinlan", "interested_repos": [{"repo": "dart-lang/http"}]},
             "items": []}
    for n, upd in [(1, "2026-10-01"), (2, "2026-10-24"), (3, "2026-10-10")]:
        snap = make_snapshot(number=n, updated=f"{upd}T00:00:00Z")
        (fixtures / f"dart-lang__http__{n}.json").write_text(json.dumps(snap))
        truth["items"].append({"url": f"https://github.com/dart-lang/http/issues/{n}", "why": f"reason {n}"})
    (tmp_path / "truth.yaml").write_text(yaml.safe_dump(truth))
    return ["--truth", str(tmp_path / "truth.yaml"), "--fixtures", str(fixtures), "--out", str(tmp_path / "runs")]


def test_evaluate_end_to_end_recency(tmp_path, capsys):
    assert evaluate.main(_setup_eval(tmp_path) + ["--strategy", "recency"]) == 0
    runs = [p for p in (tmp_path / "runs").iterdir() if p.is_dir()]
    report = (runs[0] / "report.md").read_text(encoding="utf-8")
    assert "kendall_tau" in report and "reason 1" in report
    assert (tmp_path / "runs" / "index.tsv").read_text().count("\n") == 2


def test_evaluate_end_to_end_pointwise(tmp_path, monkeypatch):
    monkeypatch.setenv("GEMINI_API_KEY", "x")
    monkeypatch.setattr(evaluate, "GeminiLLM", lambda **kw: FakeLLM({1: 0.9, 2: 0.5, 3: 0.1}))
    assert evaluate.main(_setup_eval(tmp_path) + ["--trials", "2", "--label", "t"]) == 0
    run = next(p for p in (tmp_path / "runs").iterdir() if p.is_dir())
    res = json.loads((run / "results.json").read_text())
    assert res["metrics"][0]["kendall_tau"] == 1.0
    assert len(res["trials"]) == 2
    assert (run / "contexts" / "_system.txt").exists()
    assert (run / "contexts" / "dart-lang__http__1.txt").exists()


def test_ground_truth_file_parses():
    doc = yaml.safe_load((Path(__file__).resolve().parent.parent / "eval" / "ground_truth.yaml").read_text())
    assert doc["ranked"] is True
    assert {i["set"] for i in doc["items"]} == {"A", "B"}
    assert len(doc["items"]) == 36
    refs = [IssueRef.parse(i["url"]) for i in doc["items"]]
    assert len(set(refs)) == 36


# ---------------------------------------------------------------- snapshot downloader

class FakeGH:
    """Serves canned API responses and records which paths were requested."""

    def __init__(self):
        self.log = []
        self.s = make_snapshot(owner="dart-lang", repo="http", number=2031, pr=True, base_ref="stack-1",
                               body="Part of #2030; see dart-lang/sdk#1")
        self.repo = {**self.s["repo"], "some_extra_field": 123}

    head_repo = "dart-lang/http"

    def _pull(self, n, base, head):
        return {"number": n, "title": f"P{n}", "html_url": "u", "state": "open", "user": {"login": "mosuem"},
                "base": {"ref": base, "repo": {"full_name": "dart-lang/http"}}, "head": {"ref": head, "label": head, "repo": {"full_name": self.head_repo}},
                "updated_at": "2026-10-01T00:00:00Z", "merged_at": None, "requested_reviewers": [],
                "full_only_field": True}

    def get(self, path, **p):
        self.log.append(path)
        if path == "/repos/dart-lang/http":
            return self.repo
        if path == "/repos/dart-lang/http/issues/2031":
            return self.s["issue"]
        if path == "/repos/dart-lang/http/pulls/2031":
            return {**self.s["pull"], **self._pull(2031, "stack-1", "stack-2")}
        if path == "/repos/dart-lang/http/pulls/2030":
            return self._pull(2030, "main", "stack-1")
        if path == "/repos/dart-lang/sdk/issues/1":
            return {"number": 1, "title": "rel", "state": "closed", "state_reason": "completed",
                    "body": "x" * 5000, "updated_at": "2026-10-01T00:00:00Z", "user": {"login": "z"}}
        if path == "/repos/dart-lang/http/issues/2030":
            return {"number": 2030, "title": "P2030", "state": "open", "pull_request": {"merged_at": None},
                    "updated_at": "2026-10-01T00:00:00Z", "user": {"login": "mosuem"}}
        raise KeyError(path)

    def paginate(self, path, **p):
        self.log.append(path)
        if path == "/repos/dart-lang/http/pulls":
            if p.get("head") == "dart-lang:stack-1":
                return [{"number": 2030}]
            return [{**self._pull(2040, "stack-2", "stack-3")}] if p.get("base") == "stack-2" else []
        if path.endswith("/issues/2031/comments"):
            return self.s["comments"]
        if path.endswith("/timeline"):
            return self.s["timeline"]
        if path.endswith("/reviews"):
            return [{"user": {"login": "brianquinlan"}, "state": "APPROVED", "submitted_at": "2026-10-02T00:00:00Z",
                     "body": "", "commit_id": "abc", "html_url": "r"}] if "2030" in path else []
        if path.endswith("/comments"):
            return []
        if path.endswith("/commits"):
            return self.s["commits"]
        if path.endswith("/files"):
            return self.s["files"]
        raise KeyError(path)

    def graphql(self, q, **v):
        return self.s["graphql"]


def test_snapshot_keeps_full_responses():
    from gitilizer.snapshot import Snapshotter
    gh = FakeGH()
    snap = Snapshotter(gh).snapshot(IssueRef("dart-lang", "http", 2031))
    assert snap["schema_version"] == 2
    assert snap["repo"]["some_extra_field"] == 123             # repo not trimmed
    rel = snap["related"]["dart-lang/sdk#1"]
    assert len(rel["issue"]["body"]) == 5000                   # related bodies not truncated
    assert snap["related"]["dart-lang/http#2030"]["pull"]["full_only_field"]  # PRs get the pull object too
    below = snap["stack"]["below"][0]
    assert below["pull"]["full_only_field"]                    # stacked PR fetched in full
    assert below["reviews"][0]["html_url"] == "r"              # reviews not slimmed
    assert snap["stack"]["above"][0]["number"] == 2040
    assert "/repos/dart-lang/http/pulls/2030" in snap["requests"]  # every request recorded
    s = compute_signals(snap, ME, parse_time(snap["fetched_at"]))
    assert s["stacked_on"][0]["reviews"] == ["brianquinlan:APPROVED"]
    assert "stacked_below" in s
    text = build_context(snap, ME)
    assert "issue dart-lang/sdk#1 'rel': closed (completed)" in text


# ---------------------------------------------------------------- rewind (as-of)

def _needs_info_issue():
    snap = make_snapshot(number=1972, author="keetz", created="2026-08-11T00:00:00Z", updated="2026-09-03T00:00:00Z",
                         fetched="2026-10-25T16:00:00Z", labels=["type-bug"],
                         comments=[{"by": "brianquinlan", "at": "2026-08-22T10:00:00Z", "body": "What client are you using?"},
                                   {"by": "keetz", "at": "2026-09-03T09:00:00Z", "body": "Found it, my bug."}])
    snap["timeline"] += [
        {"event": "assigned", "actor": {"login": "brianquinlan"}, "assignee": {"login": "brianquinlan"},
         "created_at": "2026-08-21T00:00:00Z"},
        {"event": "labeled", "actor": {"login": "brianquinlan"}, "label": {"name": "needs-info"},
         "created_at": "2026-08-22T10:01:00Z"},
        {"event": "closed", "actor": {"login": "keetz"}, "created_at": "2026-09-03T09:01:00Z"},
    ]
    snap["issue"].update(state="closed", closed_at="2026-09-03T09:01:00Z", state_reason="completed",
                         assignees=[{"login": "brianquinlan"}],
                         labels=[{"name": "type-bug"}, {"name": "needs-info"}])
    snap["related"] = {"dart-lang/http#1974": {"issue": {"number": 1974, "title": "fix", "state": "closed",
                                                         "created_at": "2026-08-25T00:00:00Z",
                                                         "closed_at": "2026-09-02T00:00:00Z",
                                                         "updated_at": "2026-09-02T00:00:00Z",
                                                         "user": {"login": "x"}, "pull_request": {"merged_at": None}}},
                       "dart-lang/http#9999": {"issue": {"number": 9999, "title": "later", "state": "open",
                                                         "created_at": "2026-10-01T00:00:00Z",
                                                         "updated_at": "2026-10-01T00:00:00Z", "user": {"login": "y"}}}}
    return snap


def test_rewind_issue_state_labels_comments_related():
    from gitilizer.rewind import rewind
    full = _needs_info_issue()
    s = rewind(full, "2026-08-30T00:00:00Z")
    assert s["issue"]["state"] == "open" and s["issue"]["closed_at"] is None
    assert {l["name"] for l in s["issue"]["labels"]} == {"type-bug", "needs-info"}
    assert [c["body"] for c in s["comments"]] == ["What client are you using?"]
    assert s["issue"]["comments"] == 1
    assert s["issue"]["updated_at"] == "2026-08-22T10:01:00Z"
    assert s["fetched_at"] == "2026-08-30T00:00:00Z" and s["as_of"] == s["fetched_at"]
    assert s["related"]["dart-lang/http#1974"]["issue"]["state"] == "open"   # closed later
    assert "dart-lang/http#9999" not in s["related"]                         # didn't exist yet
    assert "reactions" not in s["issue"]
    assert full["issue"]["state"] == "closed"                                 # original untouched
    # before the label was applied
    s2 = rewind(full, "2026-08-21T12:00:00Z")
    assert {l["name"] for l in s2["issue"]["labels"]} == {"type-bug"}
    assert [a["login"] for a in s2["issue"]["assignees"]] == ["brianquinlan"]
    s3 = rewind(full, "2026-08-15T00:00:00Z")
    assert s3["issue"]["assignees"] == []
    with pytest.raises(ValueError):
        rewind(full, "2026-08-01T00:00:00Z")   # before creation
    text = build_context(s, ME)
    assert "needs-info" in text and "Found it" not in text and "reconstructed as of 2026-08-30" in text
    sig = compute_signals(s, ME, parse_time(s["fetched_at"]))
    assert sig["last_human_actor_is_me"] is True


def test_rewind_pr_requested_reviewers_and_reviews():
    from gitilizer.rewind import rewind
    snap = make_snapshot(number=50, pr=True, author="kevmoo", created="2026-10-01T00:00:00Z",
                         reviews=[{"by": "brianquinlan", "state": "APPROVED", "at": "2026-10-10T00:00:00Z"}],
                         commits=[{"sha": "a" * 40, "at": "2026-10-01T00:00:00Z"},
                                  {"sha": "b" * 40, "at": "2026-10-12T00:00:00Z"}])
    snap["timeline"] += [
        {"event": "review_requested", "actor": {"login": "kevmoo"}, "requested_reviewer": {"login": "brianquinlan"},
         "created_at": "2026-10-02T00:00:00Z"},
        {"event": "review_requested", "actor": {"login": "kevmoo"}, "requested_team": {"slug": "dart-ecosystem-team"},
         "created_at": "2026-10-02T00:00:00Z"},
    ]
    snap["pull"]["requested_reviewers"] = []
    snap["pull"]["requested_teams"] = [{"slug": "dart-ecosystem-team"}]
    s = rewind(snap, "2026-10-05T00:00:00Z")
    assert [u["login"] for u in s["pull"]["requested_reviewers"]] == ["brianquinlan"]
    assert s["reviews"] == [] and len(s["commits"]) == 1
    s2 = rewind(snap, "2026-10-11T00:00:00Z")
    assert s2["pull"]["requested_reviewers"] == []          # cleared by the review
    assert [r["state"] for r in s2["reviews"]] == ["APPROVED"]
    me = UserSettings("brianquinlan", review_teams=["dart-lang/dart-ecosystem-team"])
    sig = compute_signals(s, me, parse_time(s["fetched_at"]))
    assert "requested_reviewer" in sig["my_roles"]
    assert any(r.startswith("requested_reviewer_via_team") for r in sig["my_roles"])


def test_item_as_of_sets_per_item_time():
    llm = FakeLLM({1: 0.5, 2: 0.4, 1972: 0.9})
    items = items3()[:2] + [Item("dart-lang/http#1972", _needs_info_issue(), as_of="2026-08-30T00:00:00Z")]
    out = prioritize(items, ME, llm=llm, guidance="g")
    assert out[0].id == "dart-lang/http#1972"
    msgs = {u.split("\n")[2]: u.split("\n")[0] for _, u, _ in llm.calls}
    assert any("#1972" in k and v == "current_time: 2026-08-30T00:00:00Z" for k, v in msgs.items())
    assert any("#1:" in k and v == "current_time: 2026-10-25T16:00:00Z" for k, v in msgs.items())


def test_search_adds_required_kind():
    from gitilizer.github import GitHub
    calls = []
    gh = GitHub(token="x")
    gh.get = lambda path, **p: calls.append(p["q"]) or {"items": []}
    list(gh.search_issues("involves:me is:open"))
    assert calls == ["involves:me is:open is:issue", "involves:me is:open is:pull-request"]


def test_yaml_datetimes_are_normalised():
    import datetime as dt
    item = Item("dart-lang/http#1972", _needs_info_issue(),
                thumbs_down_at=dt.datetime(2026, 8, 1, tzinfo=dt.timezone.utc),
                as_of=dt.datetime(2026, 8, 30, tzinfo=dt.timezone.utc))
    assert item.as_of == "2026-08-30T00:00:00Z" and item.thumbs_down_at == "2026-08-01T00:00:00Z"
    assert item.snap["issue"]["state"] == "open"


def test_evaluate_reports_subsets(tmp_path, monkeypatch):
    args = _setup_eval(tmp_path)
    truth_path = Path(args[1])
    doc = yaml.safe_load(truth_path.read_text())
    for i, it in enumerate(doc["items"]):
        it["set"] = "A"
    doc["items"].append({"url": "https://github.com/dart-lang/http/issues/4", "set": "B", "why": ""})
    snap = make_snapshot(number=4, updated="2026-10-02T00:00:00Z")
    (Path(args[3]) / "dart-lang__http__4.json").write_text(json.dumps(snap))
    truth_path.write_text(yaml.safe_dump(doc))
    evaluate.SUBSET.clear()
    assert evaluate.main(args + ["--strategy", "recency"]) == 0
    run = next(p for p in (tmp_path / "runs").iterdir() if p.is_dir())
    res = json.loads((run / "results.json").read_text())
    assert res["item_sets"]["dart-lang/http#4"] == "B"
    assert "A" in res["subsets"] and "B" not in res["subsets"]   # B has < 3 items
    assert "## By set" in (run / "report.md").read_text()


def test_snapshot_skips_stacked_above_for_a_fork():
    """A PR from a fork can't have PRs stacked on its branch; don't list every PR targeting that name."""
    from gitilizer.snapshot import Snapshotter
    gh = FakeGH()
    gh.head_repo = "someone/http"
    snap = Snapshotter(gh).snapshot(IssueRef("dart-lang", "http", 2031))
    assert snap["stack"]["above"] == []

