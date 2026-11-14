# Prompt variants v5a–v5h (2026-11-07)

Follow-up to [prompt-v5-2026-11-07.md](prompt-v5-2026-11-07.md). Seven
variants of `prompts/v5.md`, each evaluated pointwise on the 36 ground-truth
items with 3 trials per run, on claude-haiku-5-5, gpt-6-luna and
gemini-3.8-flash (low thinking). Runs are in `eval/runs/20261108-03*`; a
`-r2` suffix marks a repeat run of the same prompt and model.

## Variants

| Prompt | Change from v5 | Words |
|---|---|---:|
| v5a | Adds "Read the derived signals first": how to use `last_human_actor_is_me`, `my_last_activity`, `my_roles`, `informational_cc` and `days_since_update` | 1,997 |
| v5b | Moves "Scale" up, right after "Two tests" | 1,887 |
| v5c | Adds seven invented worked examples before "Scale" | 2,074 |
| v5d | Rewritten from scratch, condensed: steps, scale, tie-breakers | 596 |
| v5e | Test 2 gives numeric freshness bands (last 7 days: top third of the range; 1–4 weeks: middle; 1–6 months: bottom third) | 1,905 |
| v5f | Adds a silent six-step checklist and a calibration note (a third or fewer above 0.5) | 2,000 |
| v5g | v5b plus v5a's signals section | 1,997 |
| v5h | v5g, with the "I moved last" signal rule narrowed so that my own fresh issues stay mine | 2,021 |

## Results

Kendall tau, the harness's figure, averaged over runs (one or two runs of 3
trials). Sets A and B are within-set tau. "No #38148" recomputes tau without
`dart-lang/sdk#38148` (see below); it uses a separate script, so compare it only
within its own column.

| Model | Prompt | Runs | Tau | Set A | Set B | No #38148 |
|---|---|---:|---:|---:|---:|---:|
| claude-haiku-5-5 | v4 | 1 | 0.387 | 0.750 | 0.042 | 0.463 |
| | v5 | 2 | 0.579 | 0.789 | 0.365 | 0.662 |
| | v5a | 2 | 0.526 | 0.767 | 0.296 | 0.606 |
| | **v5b** | 2 | **0.609** | 0.797 | 0.411 | **0.691** |
| | v5c | 1 | 0.502 | 0.722 | 0.256 | 0.588 |
| | v5d | 1 | 0.383 | 0.817 | 0.105 | 0.441 |
| | v5e | 1 | 0.549 | 0.794 | 0.298 | 0.625 |
| | v5f | 1 | 0.492 | 0.728 | 0.246 | 0.563 |
| | v5g | 2 | 0.603 | 0.758 | 0.456 | 0.686 |
| | v5h | 1 | 0.569 | 0.772 | 0.358 | 0.645 |
| gpt-6-luna | v4 | 1 | 0.479 | 0.778 | 0.179 | 0.542 |
| | v5 | 2 | 0.587 | 0.756 | 0.382 | 0.661 |
| | v5a | 2 | 0.576 | 0.725 | 0.439 | 0.670 |
| | v5b | 2 | 0.578 | 0.733 | 0.386 | 0.657 |
| | v5c | 1 | 0.570 | 0.744 | 0.361 | 0.641 |
| | v5d | 1 | 0.534 | 0.783 | 0.270 | 0.608 |
| | v5e | 1 | 0.577 | 0.744 | 0.330 | 0.659 |
| | v5f | 1 | 0.594 | 0.783 | 0.403 | 0.659 |
| | v5g | 2 | 0.608 | 0.803 | 0.414 | 0.681 |
| | **v5h** | 1 | **0.615** | 0.750 | 0.449 | **0.711** |
| gemini-3.8-flash (low) | v4 | 1 | 0.713 | 0.883 | 0.565 | 0.811 |
| | v5 | 2 | 0.712 | 0.867 | 0.581 | 0.796 |
| | **v5a** | 2 | **0.770** | 0.869 | 0.675 | 0.792 |
| | v5b | 1 | 0.713 | 0.894 | 0.572 | 0.793 |
| | v5c | 1 | 0.726 | 0.883 | 0.604 | 0.811 |
| | v5d | 2 | 0.737 | 0.836 | 0.675 | 0.741 |
| | v5e | 1 | 0.716 | 0.867 | 0.582 | 0.807 |
| | v5f | 1 | 0.717 | 0.883 | 0.575 | 0.805 |
| | v5g | 2 | 0.714 | 0.883 | 0.581 | 0.793 |
| | v5h | 1 | 0.707 | 0.894 | 0.558 | 0.795 |

## What it shows

- **Noise is about ±0.03, and up to ±0.06 for gpt-6-luna.** Repeat runs of
  the same prompt differed by up to 0.06 (v5g on gpt-6-luna: 0.639 and
  0.577). Differences smaller than that between single runs aren't
  meaningful.
- **Claude: v5b (scale first) is a small, repeatable gain.** 0.608 and 0.610
  in two runs, against 0.583 and 0.576 for v5. Most of it comes from
  `dart-lang/http#2027` (my own recent issue), which moves from rank 16 to 10.
- **gpt-6-luna: nothing clearly beats v5.** v5g and v5h are the best means,
  but within the noise.
- **Gemini: v5a's gain is one item.** v5a scores 0.764 and 0.776, but almost
  all of the gain is `dart-lang/sdk#38148` (truth rank 36), which drops from
  rank 10 to 24. Without that item v5a and v5 are the same (0.792 and 0.796).
  That item's ground truth looks inconsistent (its `picked_for` says there was
  new activity after the thumbs-down, yet it is ranked last), so this gain may
  not be real. v5d's gain is the same item.
- **Worked examples (v5c), a checklist (v5f) and numeric freshness bands (v5e)
  didn't help any model,** and hurt Claude.
- **The condensed prompt (v5d) hurt Claude and gpt-6-luna badly** (set B 0.105
  and 0.270): the cheaper models need the longer explanations.
- **v5a's signal rule hurt Claude**: "if I moved last, it's waiting on someone
  else" pushed my own recent issue `dart-lang/http#2027` from rank 16 to 27.
  v5h narrows the rule, but it didn't recover overall.

## Caveats

As in the v5 note: v5 was written after looking at set B failures, set B has
20 items, and one person ranked all 36. Each variant was run once or twice, so
the order among the top variants for each model isn't settled.

## Recommendation

Keep v5 as the starting point. If a single prompt is wanted for all three
agents, v5b is the safest change: it helps Claude, and is neutral for Gemini
and gpt-6-luna within the noise. Before acting on the Gemini v5a result,
recheck the ground truth for `dart-lang/sdk#38148`. More evaluation items
would do more for prompt work now than more variants.
