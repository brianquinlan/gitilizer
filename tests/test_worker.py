"""Tests for the ranking worker (design: Ranking worker)."""

import json
from pathlib import Path

import pytest

from gitilizer.prioritizer import ItemAssessment
from gitilizer.worker import Classified, FakeLLM, classify_gemini, score

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
        "id": 1, "itemKey": "x", "snapshot": snap, "prompt": None, "geminiKey": "k", "model": "m", "thumbsDownAt": None,
        "user": {"github_login": "brianquinlan", "interested_repos": [{"repo": "dart-lang/http", "filter": "not responsible for http2"}],
                 "collaborators": ["kevmoo"], "review_teams": []},
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
    assert "not responsible for http2" in seen["system"]  # the repository filter reaches the agent
    assert seen["user"].startswith("current_time: 20")


def test_icebox_time_reaches_the_agent_as_thumbs_down():
    seen = {}

    class Spy:
        def generate(self, system, user, schema):
            seen["user"] = user
            return schema(actionable=False, next_action="n", priority=0.0, reasoning="r"), {}

    score(job_for("dart-lang__http__2031.json", thumbsDownAt="2026-10-30T00:00:00Z"), lambda job: Spy())
    assert "thumbs_down_at: 2026-10-30" in seen["user"]


def test_fake_llm_is_deterministic_and_can_be_forced_to_fail(monkeypatch):
    a1 = FakeLLM().generate("s", "same input", ItemAssessment)[0]
    a2 = FakeLLM().generate("s", "same input", ItemAssessment)[0]
    assert a1.priority == a2.priority
    monkeypatch.setenv("FAKE_LLM_ERROR", "daily_quota")
    with pytest.raises(Classified) as e:
        FakeLLM().generate("s", "u", ItemAssessment)
    assert e.value.code == "daily_quota"
