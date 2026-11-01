"""Thin GitHub REST/GraphQL client used by the snapshot downloader and the app."""

from __future__ import annotations

import os
import re
import time
from dataclasses import dataclass
from typing import Any, Iterator

import requests

API = "https://api.github.com"

_ISSUE_URL_RE = re.compile(r"https://github\.com/([^/]+)/([^/]+)/(issues|pull)/(\d+)")


class GitHubError(RuntimeError):
    def __init__(self, status: int, message: str, url: str):
        super().__init__(f"GitHub {status} for {url}: {message}")
        self.status = status
        self.url = url


@dataclass(frozen=True)
class IssueRef:
    owner: str
    repo: str
    number: int

    @property
    def full_repo(self) -> str:
        return f"{self.owner}/{self.repo}"

    @property
    def key(self) -> str:
        """Filesystem-safe identifier, e.g. dart-lang__http__2031."""
        return f"{self.owner}__{self.repo}__{self.number}"

    def __str__(self) -> str:
        return f"{self.owner}/{self.repo}#{self.number}"

    @classmethod
    def parse(cls, url_or_ref: str) -> "IssueRef":
        m = _ISSUE_URL_RE.match(url_or_ref.strip())
        if m:
            return cls(m.group(1), m.group(2), int(m.group(4)))
        m = re.fullmatch(r"([^/\s]+)/([^#\s]+)#(\d+)", url_or_ref.strip())
        if m:
            return cls(m.group(1), m.group(2), int(m.group(3)))
        raise ValueError(f"Not a GitHub issue/PR reference: {url_or_ref!r}")


class GitHub:
    def __init__(self, token: str | None = None, session: requests.Session | None = None,
                 accept: str = "application/vnd.github+json"):
        self.token = token if token is not None else (os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN"))
        self.s = session or requests.Session()
        self.s.headers.update(
            {
                "Accept": accept,
                "X-GitHub-Api-Version": "2022-11-28",
                "User-Agent": "gitilizer",
            }
        )
        if self.token:
            self.s.headers["Authorization"] = f"Bearer {self.token}"
        # Every request made: {method, url, status}. Reset by callers as needed.
        self.log: list[dict] = []

    # -- low level -----------------------------------------------------------

    def _request(self, method: str, url: str, **kw) -> requests.Response:
        if not url.startswith("http"):
            url = API + url
        for attempt in range(5):
            r = self.s.request(method, url, timeout=60, **kw)
            self.log.append({"method": method, "url": r.url, "status": r.status_code})
            if r.status_code in (502, 503, 504) or (
                r.status_code in (403, 429) and ("rate limit" in r.text.lower() or "secondary" in r.text.lower())
            ):
                reset = r.headers.get("Retry-After") or r.headers.get("X-RateLimit-Reset")
                wait = 2**attempt
                if reset and reset.isdigit():
                    v = int(reset)
                    wait = max(1, min(120, v - int(time.time()) if v > 10**9 else v))
                time.sleep(wait)
                continue
            if r.status_code >= 400:
                try:
                    msg = r.json().get("message", r.text)
                except ValueError:
                    msg = r.text
                raise GitHubError(r.status_code, msg[:500], url)
            return r
        raise GitHubError(r.status_code, "retries exhausted", url)

    def get(self, path: str, **params) -> Any:
        return self._request("GET", path, params=params or None).json()

    def paginate(self, path: str, **params) -> list[Any]:
        params.setdefault("per_page", 100)
        out: list[Any] = []
        url: str | None = path
        first = True
        while url:
            r = self._request("GET", url, params=params if first else None)
            first = False
            data = r.json()
            if isinstance(data, list):
                out.extend(data)
            else:  # e.g. search API
                out.extend(data.get("items", []))
            url = r.links.get("next", {}).get("url")
        return out

    def graphql(self, query: str, **variables) -> Any:
        r = self._request("POST", API + "/graphql", json={"query": query, "variables": variables})
        data = r.json()
        if data.get("errors"):
            raise GitHubError(200, str(data["errors"])[:500], "graphql")
        return data["data"]

    # -- higher level --------------------------------------------------------

    def viewer_login(self) -> str | None:
        try:
            return self.get("/user").get("login")
        except GitHubError:
            return None

    def rate_limit(self) -> dict:
        return self.get("/rate_limit")

    def search_issues(self, q: str, limit: int = 1000) -> Iterator[dict]:
        """GitHub issue search (used by the app to build the candidate list).

        GitHub requires every query to say `is:issue` or `is:pull-request`; if
        the query says neither, both are searched.
        """
        if not any(k in q for k in ("is:issue", "is:pull-request", "is:pr", "type:issue", "type:pr")):
            seen = 0
            for kind in ("is:issue", "is:pull-request"):
                for it in self.search_issues(f"{q} {kind}", limit=limit - seen):
                    yield it
                    seen += 1
            return
        page = 1
        seen = 0
        while seen < limit:
            data = self.get("/search/issues", q=q, per_page=100, page=page)
            items = data.get("items", [])
            if not items:
                return
            for it in items:
                yield it
                seen += 1
            if len(items) < 100:
                return
            page += 1
