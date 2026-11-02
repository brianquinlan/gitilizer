"""Ranking worker: claims jobs from the Gitilizer API and scores them with the agent.

See docs/design.md, "Ranking worker". The worker holds no state and no database
connection. Each claimed job carries everything needed to score one item: the
snapshot, the developer's settings, the prompt, the Gemini key and the model.

Usage:
    python -m gitilizer.worker                      # real Gemini calls
    python -m gitilizer.worker --fake-llm           # deterministic scores, no network (fixture mode)

Environment:
    GITILIZER_API   internal API base URL (default http://127.0.0.1:8788)
    WORKER_TOKEN    bearer token for the internal API (default dev-worker-token)
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from typing import Any

import requests

from pathlib import Path

from pydantic import BaseModel, Field

from .context import UserSettings, build_context, build_events, is_bot, parse_time
from .prioritizer import DEFAULT_PROMPT, GeminiLLM, Item, ItemAssessment, system_instruction

ICEBOX_PROMPT = Path(__file__).resolve().parent.parent / "prompts" / "icebox_check_v1.md"
#: Ranking uses the lowest thinking level the models allow (PRD RANK-11).
THINKING_LEVEL = "low"


class IceboxDecision(BaseModel):
    bring_back: bool = Field(description="True if the change should bring the item back to the prioritized list.")
    reason: str = Field(description="One short sentence explaining the decision.")


# --------------------------------------------------------------------------- #
# Error classification (design: Ranking worker, "Error codes")
# --------------------------------------------------------------------------- #

KEY_LEVEL = {"key_invalid", "key_leaked", "permission_denied", "credits_exhausted", "billing_required",
             "daily_quota", "model_not_found"}


class Classified(Exception):
    def __init__(self, code: str, message: str, retry_after: float | None = None):
        super().__init__(message)
        self.code = code
        self.retry_after = retry_after


def _retry_after(text: str) -> float | None:
    m = re.search(r'retryDelay["\']?\s*[:=]\s*["\']?(\d+(?:\.\d+)?)s', text)
    return float(m.group(1)) if m else None


def classify_gemini(e: BaseException) -> Classified:
    """Maps a google-genai exception (or anything else) to a worker error code."""
    if isinstance(e, Classified):
        return e
    code = getattr(e, "code", None)
    text = f"{getattr(e, 'status', '')} {getattr(e, 'message', '')} {e}"
    low = text.lower()
    if isinstance(code, int):
        if code == 401 or (code == 400 and ("api_key_invalid" in low or "api key not valid" in low)):
            return Classified("key_invalid", text)
        if code == 402:
            return Classified("credits_exhausted", text)
        if code == 403 and "leaked" in low:
            return Classified("key_leaked", text)
        if code in (400, 403) and any(w in low for w in ("billing", "unpaid", "payment", "free tier")):
            return Classified("billing_required", text)
        if code == 403:
            return Classified("permission_denied", text)
        if code == 404:
            return Classified("model_not_found", text)
        if code == 429:
            if "perday" in low.replace(" ", "") or "per day" in low or "daily" in low:
                return Classified("daily_quota", text, _retry_after(text))
            return Classified("rate_limited", text, _retry_after(text) or 30)
        if code in (408, 500, 502, 503, 504):
            return Classified("unavailable", text, 30)
    if isinstance(e, ValueError):  # includes pydantic ValidationError: output didn't match the schema
        if any(w in low for w in ("safety", "recitation", "blocked", "prohibited")):
            return Classified("blocked", text)
        return Classified("invalid_output", text)
    if isinstance(e, (requests.ConnectionError, TimeoutError)):
        return Classified("unavailable", text, 30)
    return Classified("unknown", text)


# --------------------------------------------------------------------------- #
# Fake model for fixture mode
# --------------------------------------------------------------------------- #

_UNIMPORTANT = ("labeled", "unlabeled", "milestoned", "demilestoned", "renamed")


class FakeLLM:
    """Deterministic answers without a network call. A changed item gets a new score.

    The Icebox check keeps an item only when every new event is a bot's or a label or
    milestone edit, as the real prompt asks. FAKE_LLM_ERROR=<code> makes every call
    fail with that code, to exercise error handling.
    """

    def generate(self, system: str, user: str, schema):
        forced = os.environ.get("FAKE_LLM_ERROR")
        if forced:
            raise Classified(forced, f"forced by FAKE_LLM_ERROR={forced}", 60)
        if schema is IceboxDecision:
            events = [line for line in user.splitlines() if line.startswith("[")]
            keep = bool(events) and all(
                "[bot]" in line.split("] ", 1)[-1].split(" ", 1)[0]
                or any(f" {k}" in line for k in _UNIMPORTANT)
                for line in events
            )
            return IceboxDecision(bring_back=not keep, reason="Fake model: " + ("only unimportant changes" if keep else "a person changed it")), {}
        h = int(hashlib.sha256(user.encode()).hexdigest()[:8], 16)
        priority = round((h % 1000) / 1000, 3)
        return schema(actionable=priority > 0.5, next_action="(fake) Look at this.",
                      priority=priority, reasoning="Fake model: score derived from the item's content."), {}


# --------------------------------------------------------------------------- #
# Worker loop
# --------------------------------------------------------------------------- #

def score(job: dict[str, Any], llm_factory) -> ItemAssessment:
    """Scores one item (PRD RANK-18)."""
    user = UserSettings.from_dict(job["user"])
    item = Item(job["itemKey"], job["snapshot"])
    guidance = job.get("prompt") or DEFAULT_PROMPT.read_text(encoding="utf-8")
    # Score as of now, not as of the snapshot, so ageing works (PRD RANK-9).
    now = dt.datetime.now(dt.timezone.utc).replace(microsecond=0)
    system = system_instruction(guidance, user, "pointwise")
    context = build_context(item.snap, user, now=now)
    msg = f"current_time: {now.isoformat().replace('+00:00', 'Z')}\n\n{context}"
    result, _usage = llm_factory(job).generate(system, msg, ItemAssessment)
    return result


def icebox_message(job: dict[str, Any], now: dt.datetime) -> str:
    """What the Icebox check sees: the item and only the events since it was iceboxed (design: Ranking worker)."""
    snap = job["snapshot"]
    issue = snap["issue"]
    me = job["user"]["github_login"]
    since = parse_time(job.get("iceboxedAt")) or now
    kind = "pull request" if issue.get("pull_request") else "issue"
    lines = [
        f"current_time: {now.isoformat().replace('+00:00', 'Z')}",
        f"me: {me}",
        f"item: {kind} {job['itemKey']} {issue.get('title')!r} (state: {issue.get('state')})",
        f"iceboxed_at: {since.isoformat().replace('+00:00', 'Z')}",
        "",
        "Changes since it was iceboxed (oldest first; (ME) marks the developer):",
    ]
    events = [e for e in build_events(snap) if e.at > since]
    for e in events:
        line = e.render(now, 1500, me)
        if is_bot(e.actor) and "[bot]" not in (e.actor or ""):
            line = line.replace(f"] {e.actor} ", f"] {e.actor}[bot] ", 1)
        lines.append(line)
    if not events:
        lines.append("(no individual events found; the item's updated_at changed)")
    return "\n".join(lines)


def icebox_check(job: dict[str, Any], llm_factory) -> IceboxDecision:
    """Asks whether a change should bring an iceboxed item back (PRD ICE-6, ICE-12)."""
    now = dt.datetime.now(dt.timezone.utc).replace(microsecond=0)
    system = ICEBOX_PROMPT.read_text(encoding="utf-8")
    result, _usage = llm_factory(job).generate(system, icebox_message(job, now), IceboxDecision)
    return result


class Worker:
    def __init__(self, api: str, token: str, fake: bool, concurrency: int):
        self.api = api.rstrip("/")
        self.s = requests.Session()
        self.s.headers["Authorization"] = f"Bearer {token}"
        self.fake = fake
        self.pool = ThreadPoolExecutor(max_workers=concurrency)

    def llm(self, job: dict[str, Any]):
        if self.fake:
            return FakeLLM()
        # Few retries: the job's lease is 120 s, and the server re-queues transient failures.
        return GeminiLLM(model=job["model"], api_key=job["geminiKey"], thinking_level=THINKING_LEVEL, max_retries=2)

    def post(self, path: str, body: dict) -> requests.Response:
        return self.s.post(f"{self.api}{path}", json=body, timeout=30)

    def run_job(self, job: dict[str, Any]) -> str:
        try:
            if job.get("kind") == "icebox_check":
                d = icebox_check(job, self.llm)
                self.post(f"/internal/rank-jobs/{job['id']}/result", {"bring_back": bool(d.bring_back), "reason": d.reason})
                return f"{job['itemKey']} icebox -> {'back' if d.bring_back else 'stay'}"
            a = score(job, self.llm)
            self.post(f"/internal/rank-jobs/{job['id']}/result", {
                "priority": max(0.0, min(1.0, float(a.priority))),
                "actionable": bool(a.actionable),
                "next_action": a.next_action,
                "reasoning": a.reasoning,
            })
            return f"{job['itemKey']} -> {a.priority:.3f}"
        except Exception as e:  # noqa: BLE001 - every failure is reported to the server
            c = classify_gemini(e)
            self.post(f"/internal/rank-jobs/{job['id']}/error",
                      {"code": c.code, "message": str(c)[:500], "retryAfterSeconds": c.retry_after})
            return f"{job['itemKey']} !! {c.code}"

    def once(self) -> int:
        r = self.post("/internal/rank-jobs/claim", {"max": 8, "leaseSeconds": 120})
        r.raise_for_status()
        jobs = r.json()["jobs"]
        for line in self.pool.map(self.run_job, jobs):
            print(line, flush=True)
        return len(jobs)

    def forever(self, idle_sleep: float) -> None:
        while True:
            try:
                if self.once() == 0:
                    time.sleep(idle_sleep)
            except requests.RequestException as e:
                print(f"API unavailable: {e}", file=sys.stderr, flush=True)
                time.sleep(5)


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--api", default=os.environ.get("GITILIZER_API", "http://127.0.0.1:8788"))
    ap.add_argument("--fake-llm", action="store_true")
    ap.add_argument("--concurrency", type=int, default=4)
    ap.add_argument("--once", action="store_true", help="claim one batch and exit")
    ap.add_argument("--idle-sleep", type=float, default=1.0)
    args = ap.parse_args(argv)
    w = Worker(args.api, os.environ.get("WORKER_TOKEN", "dev-worker-token"), args.fake_llm, args.concurrency)
    if args.once:
        print(f"{w.once()} jobs")
        return 0
    w.forever(args.idle_sleep)
    return 0


if __name__ == "__main__":
    sys.exit(main())
