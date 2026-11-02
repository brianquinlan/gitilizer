# Gitilizer — prioritization agent + eval

Requirements are in [docs/PRD.md](docs/PRD.md) and the design in [docs/design.md](docs/design.md).

## Running the app prototype

The web app and API are TypeScript (`app/`); the ranking worker is Python (`gitilizer/worker.py`).
Once Node 22+ and a Python virtual environment are set up, one command runs everything on your computer:

```powershell
npm run local:fixtures     # saved test data as GitHub and a fake model: no network, no quota
npm run local              # your real issues and PRs, with the credentials in .env
```

Then open http://localhost:5173. You're signed in automatically, and Sync now and Save and re-rank refresh the
list. [docs/local-development.md](docs/local-development.md) has the setup steps, options and troubleshooting.
Tests: `npm test` and `python -m pytest`.

## Prioritization agent and eval

The rest of this file covers step one of Gitilizer (see the PRD): an agent that ranks a developer's GitHub
issues and PRs with Gemini, and a harness that scores its ranking against the
hand-ranked list in the PRD.

## Setup (Windows PowerShell)

```powershell
cd C:\Users\brian\gitilizer2
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

`.env` (gitignored) needs two values:

```
GEMINI_API_KEY=...
GITHUB_TOKEN=...      # a classic PAT with no scopes is enough for public repos
# GITILIZER_MODEL=gemini-3.8-flash   (optional override)
```

Check that both work and the model ID exists:

```powershell
python -m gitilizer.check
```

## 1. Freeze the eval issues

```powershell
python -m gitilizer.snapshot eval/ground_truth.yaml
```

This writes one JSON file per item to `eval/fixtures/`. Each file stores the
GitHub responses verbatim, with nothing trimmed. That covers the repository,
the issue, all comments and the full timeline, plus for PRs the pull object,
reviews, inline review comments, commits and changed files. It also has GraphQL
review threads and closing references, the full pull objects (and reviews) of
the PRs below and above it in a stack, and the full issue object (plus pull
object for PRs) of every issue/PR it references or is referenced from. Bodies
come back as `body`, `body_text` and `body_html` (`full+json` media type).
`requests` lists every API call made. Evals read only these files, so
every run sees the same state. Use `--force` to refresh, and pass issue URLs
instead of the YAML to snapshot extra items.

## 2. Run the eval

```powershell
python -m gitilizer.evaluate --strategy recency     # no-LLM floor, instant
python -m gitilizer.evaluate                        # Gemini, pointwise, default prompt (v4), 3 trials
python -m gitilizer.evaluate --strategy listwise    # one call ranks all items
python -m gitilizer.evaluate --thinking high --trials 5
python -m gitilizer.evaluate --prompt prompts/v1.md --label v1   # your original prompt
python -m gitilizer.evaluate --no-signals           # ablation: raw context only
```

Each run writes `eval/runs/<timestamp>-<label>/`:

- `report.md` has the metrics (mean ± sd over trials), a per-item table (truth
  rank vs. predicted rank and range, priority, actionable votes, next action),
  the largest inversions, and the model's reasoning next to your "why" for
  every item.
- `results.json` has everything in machine-readable form.
- `contexts/` holds the exact text the model saw, including the system prompt.

`eval/runs/index.tsv` gets one line per run, so prompt and model variants can be
compared side by side.

### The eval set

`eval/ground_truth.yaml` is one ranked list of 36 issues and PRs (first = rank 1).
Brian ranked it with the eval ranker (`eval/ranker.html`). Each item has a `set`:
`A` for the PRD's original 16, `B` for the 20 added later to cover more cases
(review requests direct and via a team, security PRs, a build break and its fix,
needs-info, thumbs-downs, commitments, mentions in other repos). The report
scores the whole list and also each set on its own. Prompts v1–v3 were written
before set B existed, so its numbers are a held-out check.

To add items: append them to `ground_truth.yaml`, run
`python -m gitilizer.snapshot eval/ground_truth.yaml`, then
`python -m gitilizer.ranking_sheet eval/ground_truth.yaml --out eval/ranking.json`
and rebuild the ranker page from `eval/ranker_template.html`.

Ground-truth entries can carry two extra fields:

- `thumbs_down_at`: the user pressed thumbs-down at that time.
- `as_of`: evaluate the item as it was at that time. The snapshot stays
  complete, and `gitilizer/rewind.py` replays its history up to `as_of` (state,
  labels, assignees, requested reviewers, comments, reviews, commits, related
  items). That item's "current time" is then `as_of`. Use it for states that no
  longer exist, e.g. an issue that had `needs-info` and has since been closed.

### Metrics

| metric | meaning |
|---|---|
| kendall_tau | pairwise agreement, −1…+1. With 36 items one adjacent swap costs 0.003 |
| pairwise_acc | (tau+1)/2: share of pairs ordered correctly |
| spearman | rank correlation |
| ndcg, ndcg@5 | top-weighted. Mistakes near the top cost more |
| top3/5/10_overlap | share of the true top-k that the model put in its top-k |
| mean_abs_displacement | average number of places each item is off |

## How the agent works

`gitilizer/context.py` turns a snapshot into text. First come the header facts.
Then **derived signals**: my roles (author, assignee, requested reviewer,
mentioned, watches repo), who acted last, my latest review and whether commits
landed after it, unresolved review threads, PR-stack status, and @-mentions of
me with CC/FYI detection. Then related issues/PRs, the description, and a
chronological activity log with "(ME)" markers. Long threads are trimmed in the
middle. "Now" is the snapshot time, so "3 days ago" is the same on every run.

`gitilizer/prioritizer.py` builds the system instruction from a guidance
prompt (`prompts/v1.md` is your previous Gitilizer prompt, verbatim. v2 adds
ownership, duplicate and stacking rules plus a calibrated scale. v3 puts
security first. v4, the default, adds rules for review requests (team vs.
personal, my repos vs. others), PRs waiting on a reviewer I just asked,
needs-info, and my own recently filed issues), an
"About me" block (login, interested repos with their natural-language
filters, collaborators), and a fixed output contract. Gemini returns structured
JSON: `actionable`, `next_action`, `priority` (0–1) and `reasoning`.
Pointwise mode scores each item independently and sorts, with ties broken by
recency. That's what the app needs for incremental re-prioritization.

## Tests

```powershell
python -m pytest
```
