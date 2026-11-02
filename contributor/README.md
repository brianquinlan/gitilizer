# Working on Gitilizer

This folder is for people building Gitilizer. If you want to *use* Gitilizer, read the [user guide](../docs/user-guide.md) instead.

| Document | What's in it |
|---|---|
| [PRD.md](PRD.md) | What Gitilizer must do: every requirement, with an ID such as `LIST-4`, and the product owner's open questions. |
| [DESIGN.md](DESIGN.md) | How it is built: architecture, data model, API, ranking, hosting, logging, deployment, and the design's open questions. |
| [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md) | Running the whole application on your own computer with one command. |

Open questions in both documents are marked **TODO:**, so searching for that finds everything waiting for an answer.

## Where the code is

Everything is TypeScript, in npm workspaces:

| Folder | What it is |
|---|---|
| `app/web` | The React web app. |
| `app/server` | The API, scheduler, scanner and ranking worker. |
| `app/ranker` | The ranking agent (turns a GitHub snapshot into a prompt and asks Gemini for a score) and the evaluation harness. |
| `app/shared` | Types and schemas shared by the server and the web app. |
| `prompts/` | The ranking prompts (`v4.md` is the default) and the Icebox check's prompt. |
| `eval/` | The hand-ranked eval set, its frozen GitHub snapshots (`fixtures/`) and past evaluation runs (`runs/`). |
| `scripts/local.mjs` | `npm run local`. |
| `docs/` | The user documentation, linked from the app's footer. |

```powershell
npm install          # once, and after pulling changes
npm run local:fixtures
npm test
npm run typecheck
```

## The ranking agent and its evaluation

The agent scores each issue or PR on its own (one Gemini call per item) from a 0.0–1.0 priority, so a change to one item re-scores only that item. [DESIGN.md](DESIGN.md#the-ranking-agent) explains how it works. Before changing the default prompt or model, measure the change against the hand-ranked list (PRD `RANK-7`).

`.env` (ignored by Git) holds the credentials the tools use:

```
GEMINI_API_KEY=...
GITHUB_TOKEN=...      # a classic token with no scopes is enough for public repositories
# GITILIZER_MODEL=gemini-3.8-flash   (optional)
```

`npm run check` checks that both work and that the model exists.

### Run an evaluation

```powershell
npm run evaluate -- --strategy recency     # no model: most recently updated first, the floor to beat
npm run evaluate                           # Gemini, pointwise, default prompt (v4), 3 trials
npm run evaluate -- --strategy listwise    # one call ranks all items
npm run evaluate -- --thinking low --trials 5
npm run evaluate -- --prompt prompts/v1.md --label v1
npm run evaluate -- --no-signals           # ablation: raw context only
```

Each run writes `eval/runs/<timestamp>-<label>/`:

- `report.md`: the metrics (mean ± sd over trials), a per-item table (true rank against predicted rank and range, priority, actionable votes, next action), the largest inversions, and the model's reasoning next to the ranker's "why" for every item;
- `results.json`: everything, machine-readable;
- `contexts/`: the exact text the model saw, including the system prompt.

`eval/runs/index.tsv` gets one line per run, so prompts and models can be compared side by side.

| Metric | Meaning |
|---|---|
| `kendall_tau` | Pairwise agreement, −1…+1. With 36 items one adjacent swap costs 0.003. |
| `pairwise_acc` | (tau + 1) / 2: the share of pairs ordered correctly. |
| `spearman` | Rank correlation. |
| `ndcg`, `ndcg@5` | Top-weighted: mistakes near the top cost more. |
| `top3/5/10_overlap` | The share of the true top k that the model put in its top k. |
| `mean_abs_displacement` | The average number of places each item is off. |

### The eval set

`eval/ground_truth.yaml` is one ranked list of 36 issues and PRs (first = rank 1), ranked by hand with `eval/ranker.html`. Each item has a `set`: `A` for the PRD's original 16, `B` for 20 added later to cover more cases. The report scores the whole list and each set on its own; prompts v1–v3 were written before set B existed, so its numbers are a held-out check.

Entries can also have:

- `as_of`: evaluate the item as it was at that time. The snapshot stays complete, and `app/ranker/src/rewind.ts` replays its history up to `as_of` (state, labels, assignees, requested reviewers, comments, reviews, commits, related items).
- `thumbs_down_at`: the developer pressed thumbs-down at that time (from before the Icebox check replaced it; kept so the ground truth still measures the same thing).

To add items: append them to `ground_truth.yaml`, download their snapshots, and rebuild the ranking page:

```powershell
npm run snapshot -- eval/ground_truth.yaml                 # writes eval/fixtures/<owner>__<repo>__<n>.json; --force refreshes
npm run ranking-sheet -- eval/ground_truth.yaml --out eval/ranking.json --html eval/ranker.html
```

A snapshot stores the GitHub responses verbatim: the repository, the issue, every comment and the full timeline, and for PRs the pull, reviews, inline comments, commits and files, plus everything it links to and the PRs stacked above and below it. Evaluations read only these files, so every run sees the same state.

### History

The agent and the harness were written in Python first and ported to TypeScript on 2026-11-02. The port produces exactly the same prompts (`app/ranker/test/golden.test.ts` checks this), so the runs in `eval/runs/` from before the port still compare with new ones.
