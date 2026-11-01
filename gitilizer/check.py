"""Check that the GitHub token and Gemini key work, and that the model exists.

    python -m gitilizer.check
"""

from __future__ import annotations

import os
import sys

from .env import load_dotenv
from .prioritizer import DEFAULT_MODEL


def main() -> int:
    load_dotenv()
    ok = True

    from .github import GitHub, GitHubError
    gh = GitHub()
    if not gh.token:
        print("GitHub: no GITHUB_TOKEN in .env (unauthenticated: 60 requests/hour, not enough)")
        ok = False
    try:
        login = gh.viewer_login()
        core = gh.rate_limit()["resources"]["core"]
        print(f"GitHub: OK, authenticated as {login}, {core['remaining']}/{core['limit']} requests left")
    except GitHubError as e:
        print(f"GitHub: FAILED — {e}")
        ok = False

    model = os.environ.get("GITILIZER_MODEL") or DEFAULT_MODEL
    if not os.environ.get("GEMINI_API_KEY"):
        print("Gemini: no GEMINI_API_KEY in .env")
        return 1
    try:
        from google import genai
        client = genai.Client()
        names = [m.name.removeprefix("models/") for m in client.models.list()]
        gemini = sorted(n for n in names if n.startswith("gemini"))
        if model in names:
            print(f"Gemini: OK, model {model!r} is available")
        else:
            print(f"Gemini: key works, but model {model!r} not found. Gemini models available:")
            for n in gemini:
                print(f"  {n}")
            print("Set GITILIZER_MODEL in .env or pass --model.")
            ok = False
        r = client.models.generate_content(model=model if model in names else gemini[-1], contents="Reply with: ok")
        print(f"Gemini: test call returned {r.text.strip()!r}")
    except Exception as e:  # noqa: BLE001
        print(f"Gemini: FAILED — {type(e).__name__}: {e}")
        ok = False
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
