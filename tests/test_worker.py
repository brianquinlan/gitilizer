"""Tests for the ranking worker (design: Ranking worker)."""

import json
from pathlib import Path

import pytest

from gitilizer.prioritizer import ItemAssessment
from gitilizer.worker import Classified, FakeLLM, IceboxDecision, Worker, classify_gemini, icebox_check, score

FIXTURES = Path(__file__).resolve().parent.parent / "eval" / "fixtures"


class FakeApiError(Exception):
    """Shaped like google.genai.errors.APIError: .code, .status, .message."""

    def __init__(self, code, status, message):
        super().__init__(message)
        self.code, self.status, self.message = code, status, message


@pytest.mark.parametrize("code,status,message,expected", [
    (400, "INVALID_ARGUMENT", "API key not valid. Please pass a valid API key. [reason: API_KEY_INVALID]", "key_invalid"),
    (401, "UNAUTHENTICATED", "Request had invalid authentication credentials.", "key_invalid"),
    (402, "PAYMENT_REQUIRED", "Prepay credits depleted.", "credits_exhausted"),
    (403, "PERMISSION_DENIED", "Your API key was reported as leaked. Please use another API key.", "key_leaked"),
    (400, "FAILED_PRECONDITION", "Gemini API free tier is not available in your country. Please enable billing.", "billing_required"),
    (403, "PERMISSION_DENIED", "Method doesn't allow unregistered callers.", "permission_denied"),
    (404, "NOT_FOUND", "models/gemini-x is not found for API version v1beta", "model_not_found"),
    (429, "RESOURCE_EXHAUSTED", "Quota exceeded for metric generate_content_free_tier_requests, quotaId: GenerateRequestsPerDayPerProjectPerModel-FreeTier", "daily_quota"),
    (429, "RESOURCE_EXHAUSTED", "Quota exceeded per minute. retryDelay: '27s'", "rate_limited"),
    (503, "UNAVAILABLE", "The model is overloaded. Please try again later.", "unavailable"),
    (504, "DEADLINE_EXCEEDED", "Deadline exceeded", "unavailable"),
])
def test_classifies_gemini_errors(code, status, message, expected):
    assert classify_gemini(FakeApiError(code, status, message)).code == expected


def test_rate_limit_carries_retry_delay():
    c = classify_gemini(FakeApiError(429, "RESOURCE_EXHAUSTED", "slow down retryDelay: '27s'"))
    assert c.retry_after == 27


def test_bad_output_is_an_item_level_failure():
    assert classify_gemini(ValueError("Expecting value: line 1 column 1")).code == "invalid_output"
    assert classify_gemini(ValueError("finish_reason SAFETY")).code == "blocked"


def job_for(name: str, **extra):
    snap = json.loads((FIXTURES / name).read_text(encoding="utf-8"))
    job = {
        "id": 1, "kind": "rank", "itemKey": "x", "snapshot": snap, "prompt": None, "geminiKey": "k", "model": "m", "iceboxedAt": None,
        "user": {"github_login": "brianquinlan",
                 "additional_repos": [{"repo": "dart-lang/http", "prioritization_prompt": "not responsible for http2"}],
                 "collaborators": ["kevmoo"]},
    }
    job.update(extra)
    return job


def test_score_runs_the_real_agent_code_on_a_snapshot():
    seen = {}

    class Spy:
        def generate(self, system, user, schema):
            seen["system"], seen["user"] = system, user
            return schema(actionable=True, next_action="n", priority=0.7, reasoning="r"), {}

    a = score(job_for("dart-lang__http__2031.json"), lambda job: Spy())
    assert isinstance(a, ItemAssessment) and a.priority == 0.7
    assert "not responsible for http2" in seen["system"]  # the prioritization prompt reaches the agent
    assert seen["user"].startswith("current_time: 20")


def with_comment(job, login, body, at="2099-01-01T00:00:00Z"):
    snap = dict(job["snapshot"])
    snap["timeline"] = [*snap["timeline"], {"event": "commented", "actor": {"login": login}, "created_at": at, "body": body}]
    return {**job, "snapshot": snap}


def test_icebox_check_sees_only_changes_since_the_item_was_iceboxed():
    seen = {}

    class Spy:
        def generate(self, system, user, schema):
            seen["system"], seen["user"], seen["schema"] = system, user, schema
            return IceboxDecision(bring_back=True, reason="r"), {}

    job = with_comment(job_for("dart-lang__http__2031.json", kind="icebox_check", iceboxedAt="2098-12-31T00:00:00Z"),
                       "kevmoo", "Can you take another look?")
    d = icebox_check(job, lambda j: Spy())
    assert d.bring_back and seen["schema"] is IceboxDecision
    assert "Lean strongly toward bringing it back" in seen["system"]
    events = [line for line in seen["user"].splitlines() if line.startswith("[")]
    assert len(events) == 1 and "kevmoo commented" in events[0]


def test_fake_icebox_check_keeps_only_unimportant_changes():
    base = job_for("dart-lang__http__2031.json", kind="icebox_check", iceboxedAt="2098-12-31T00:00:00Z")
    fake = lambda j: FakeLLM()  # noqa: E731
    assert icebox_check(with_comment(base, "dependabot[bot]", "Bumped"), fake).bring_back is False
    assert icebox_check(with_comment(base, "brianquinlan", "This is a critical security issue, I'll work on it right away"), fake).bring_back is True


def test_worker_reports_icebox_answers_and_uses_low_thinking(monkeypatch):
    posted = []
    w = Worker("http://api", "t", fake=True, concurrency=1)
    monkeypatch.setattr(w, "post", lambda path, body: posted.append((path, body)))
    w.run_job(with_comment(job_for("dart-lang__http__2031.json", kind="icebox_check", iceboxedAt="2098-12-31T00:00:00Z"), "kevmoo", "hi"))
    assert posted == [("/internal/rank-jobs/1/result", {"bring_back": True, "reason": "Fake model: a person changed it"})]
    from gitilizer import worker
    assert worker.THINKING_LEVEL == "low"


def test_fake_llm_is_deterministic_and_can_be_forced_to_fail(monkeypatch):
    a1 = FakeLLM().generate("s", "same input", ItemAssessment)[0]
    a2 = FakeLLM().generate("s", "same input", ItemAssessment)[0]
    assert a1.priority == a2.priority
    monkeypatch.setenv("FAKE_LLM_ERROR", "daily_quota")
    with pytest.raises(Classified) as e:
        FakeLLM().generate("s", "u", ItemAssessment)
    assert e.value.code == "daily_quota"
