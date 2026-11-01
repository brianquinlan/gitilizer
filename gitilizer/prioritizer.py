"""The Gitilizer prioritization agent.

Strategies
----------
pointwise (default)
    One Gemini call per item. Each item gets an absolute priority in [0, 1];
    the total ordering is the sort by priority (ties broken by most recent
    activity). This is what the app needs: when one issue changes, only that
    issue is re-scored.
listwise
    One Gemini call that sees every item and returns a full ordering. Useful as
    a comparison point for the eval; doesn't scale to hundreds of issues.
recency
    No model. Most recently updated first. A floor that any real strategy must
    beat.
"""

from __future__ import annotations

import datetime as dt
import json
import os
import time
from concurrent.futures import ThreadPoolExecutor
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any, Callable, Protocol

from pydantic import BaseModel, Field

from .context import UserSettings, build_context, parse_time

DEFAULT_MODEL = "gemini-3.8-flash"
DEFAULT_PROMPT = Path(__file__).resolve().parent.parent / "prompts" / "v4.md"


# --------------------------------------------------------------------------- #
# Output schemas
# --------------------------------------------------------------------------- #

class ItemAssessment(BaseModel):
    actionable: bool = Field(description="Whether there is something I (the user) can usefully do on this item right now.")
    next_action: str = Field(description="One short sentence: what I should do next, or who/what we are waiting on.")
    priority: float = Field(description="Priority from 0.0 (ignore) to 1.0 (most urgent thing on my plate).")
    reasoning: str = Field(description="2-4 sentences explaining the priority.")


class RankedItem(ItemAssessment):
    id: str = Field(description="The item id exactly as given, e.g. dart-lang/http#2031.")


class Ranking(BaseModel):
    items: list[RankedItem] = Field(description="Every item, most important first.")


@dataclass
class Scored:
    id: str
    priority: float
    actionable: bool | None = None
    next_action: str = ""
    reasoning: str = ""
    last_activity: str | None = None
    usage: dict = field(default_factory=dict)
    error: str | None = None


@dataclass
class Item:
    """An item to prioritize: a snapshot plus optional per-user state."""
    id: str
    snap: dict
    thumbs_down_at: str | None = None
    # Evaluate the item as it was at this time (see gitilizer.rewind).
    as_of: str | None = None

    def __post_init__(self):
        from .rewind import iso, rewind
        self.as_of = iso(self.as_of)
        self.thumbs_down_at = iso(self.thumbs_down_at)
        if self.as_of:
            self.snap = rewind(self.snap, self.as_of)

    @property
    def updated_at(self) -> str:
        return self.snap["issue"]["updated_at"]


# --------------------------------------------------------------------------- #
# Prompt assembly
# --------------------------------------------------------------------------- #

def about_me(user: UserSettings) -> str:
    lines = ["## About me", f"- My GitHub login: {user.github_login}"]
    if user.interested_repos:
        lines.append("- Repositories I am responsible for / interested in:")
        for r in user.interested_repos:
            lines.append(f"  - {r['repo']}" + (f" — my note: \"{r['filter']}\"" if r.get("filter") else ""))
    if user.collaborators:
        lines.append(f"- My usual collaborators: {', '.join(user.collaborators)}")
    if user.review_teams:
        lines.append(f"- GitHub teams I belong to (a review request to one of these teams is shared with the "
                     f"rest of the team, not addressed to me personally): {', '.join(user.review_teams)}")
    return "\n".join(lines)


POINTWISE_OUTPUT = """## Output
You will be shown one GitHub issue or PR at a time, as it looked at `current_time`.
Activity marked "(ME)" was done by me. Return a JSON object with `actionable`,
`next_action`, `priority` (0.0-1.0) and `reasoning`. Priorities from separate
calls are sorted together into one list, so use the whole scale consistently."""

LISTWISE_OUTPUT = """## Output
You will be shown several GitHub issues and PRs, as they looked at `current_time`.
Activity marked "(ME)" was done by me. Return every item, ordered from most to
least important, each with `id` (exactly as given), `actionable`, `next_action`,
`priority` (0.0-1.0, non-increasing down the list) and `reasoning`."""


def system_instruction(guidance: str, user: UserSettings, strategy: str) -> str:
    out = POINTWISE_OUTPUT if strategy == "pointwise" else LISTWISE_OUTPUT
    return f"{guidance.strip()}\n\n{about_me(user)}\n\n{out}"


# --------------------------------------------------------------------------- #
# Model client
# --------------------------------------------------------------------------- #

class LLM(Protocol):
    def generate(self, system: str, user: str, schema: type[BaseModel]) -> tuple[BaseModel, dict]: ...


class GeminiLLM:
    def __init__(self, model: str = DEFAULT_MODEL, api_key: str | None = None, thinking_level: str | None = None,
                 max_retries: int = 6):
        from google import genai  # imported lazily so tests don't need it

        self._genai = genai
        self.client = genai.Client(api_key=api_key or os.environ.get("GEMINI_API_KEY"))
        self.model = model
        self.thinking_level = thinking_level
        self.max_retries = max_retries

    def generate(self, system: str, user: str, schema: type[BaseModel]) -> tuple[BaseModel, dict]:
        from google.genai import errors, types

        cfg: dict[str, Any] = dict(
            system_instruction=system,
            response_mime_type="application/json",
            response_schema=schema,
        )
        if self.thinking_level:
            cfg["thinking_config"] = types.ThinkingConfig(thinking_level=self.thinking_level.upper())
        config = types.GenerateContentConfig(**cfg)
        delay = 2.0
        for attempt in range(self.max_retries):
            try:
                resp = self.client.models.generate_content(model=self.model, contents=user, config=config)
                parsed = resp.parsed
                if parsed is None:
                    parsed = schema.model_validate_json(resp.text)
                u = resp.usage_metadata
                usage = {
                    "prompt_tokens": getattr(u, "prompt_token_count", None),
                    "output_tokens": getattr(u, "candidates_token_count", None),
                    "thinking_tokens": getattr(u, "thoughts_token_count", None),
                }
                return parsed, usage
            except errors.APIError as e:
                if e.code in (429, 500, 502, 503, 504) and attempt < self.max_retries - 1:
                    time.sleep(delay)
                    delay = min(delay * 2, 60)
                    continue
                raise
            except ValueError:
                # malformed JSON; retry once or twice
                if attempt < 2:
                    continue
                raise
        raise RuntimeError("unreachable")


def check_model(model: str, api_key: str | None = None) -> list[str]:
    """Return available model names that look like `model` (for setup checks)."""
    from google import genai

    client = genai.Client(api_key=api_key or os.environ.get("GEMINI_API_KEY"))
    names = [m.name.removeprefix("models/") for m in client.models.list()]
    return names


# --------------------------------------------------------------------------- #
# Strategies
# --------------------------------------------------------------------------- #

def _current_time(items: list[Item], override: str | None) -> str:
    if override:
        return override
    # Evaluate as of the latest snapshot time so every item shares one "now".
    live = [i.snap["fetched_at"] for i in items if not i.as_of]
    return max(live) if live else max(i.as_of for i in items)


def prioritize(
    items: list[Item],
    user: UserSettings,
    strategy: str = "pointwise",
    llm: LLM | None = None,
    guidance: str | None = None,
    include_signals: bool = True,
    now: str | None = None,
    workers: int = 6,
    on_context: Callable[[str, str], None] | None = None,
) -> list[Scored]:
    """Score items and return them in priority order (rank 1 first)."""
    now_s = _current_time(items, now)
    now_dt = parse_time(now_s)

    if strategy == "recency":
        scored = [Scored(i.id, 0.0, last_activity=i.updated_at) for i in items]
        scored.sort(key=lambda s: s.last_activity, reverse=True)
        n = len(scored)
        for k, s in enumerate(scored):
            s.priority = round(1 - k / max(1, n - 1), 3)
        return scored

    if llm is None:
        raise ValueError("an LLM is required for strategy " + strategy)
    guidance = guidance if guidance is not None else DEFAULT_PROMPT.read_text(encoding="utf-8")
    system = system_instruction(guidance, user, strategy)

    def item_now(i: Item) -> str:
        return i.as_of or now_s

    contexts = {
        i.id: build_context(i.snap, user, now=parse_time(item_now(i)), include_signals=include_signals,
                            thumbs_down_at=i.thumbs_down_at)
        for i in items
    }
    if on_context:
        on_context("__system__", system)
        for k, v in contexts.items():
            on_context(k, v)

    if strategy == "pointwise":
        def one(item: Item) -> Scored:
            msg = f"current_time: {item_now(item)}\n\n{contexts[item.id]}"
            try:
                a, usage = llm.generate(system, msg, ItemAssessment)
            except Exception as e:  # keep the run going; report the failure
                return Scored(item.id, -1.0, error=f"{type(e).__name__}: {e}", last_activity=item.updated_at)
            return Scored(item.id, float(a.priority), a.actionable, a.next_action, a.reasoning,
                          last_activity=item.updated_at, usage=usage)

        with ThreadPoolExecutor(max_workers=workers) as pool:
            scored = list(pool.map(one, items))

    elif strategy == "listwise":
        parts = [f"current_time: {now_s}\n\nThere are {len(items)} items. Their ids are: "
                 + ", ".join(i.id for i in items)]
        for i in items:
            when = f" (evaluate as if current_time were {i.as_of})" if i.as_of else ""
            parts.append(f"\n\n======== id: {i.id}{when} ========\n{contexts[i.id]}")
        r, usage = llm.generate(system, "".join(parts), Ranking)
        by_id = {i.id: i for i in items}
        scored, seen = [], set()
        n = len(items)
        for pos, ri in enumerate(r.items):
            if ri.id not in by_id or ri.id in seen:
                continue
            seen.add(ri.id)
            # Position defines the order; keep the model's priority for display.
            scored.append(Scored(ri.id, float(ri.priority), ri.actionable, ri.next_action, ri.reasoning,
                                 last_activity=by_id[ri.id].updated_at))
        for i in items:
            if i.id not in seen:
                scored.append(Scored(i.id, -1.0, error="omitted by model", last_activity=i.updated_at))
        if scored:
            scored[0].usage = usage
        return scored  # already in model order
    else:
        raise ValueError(f"unknown strategy {strategy!r}")

    scored.sort(key=lambda s: (s.priority, s.last_activity or ""), reverse=True)
    return scored


def scored_to_dict(s: Scored) -> dict:
    return asdict(s)
