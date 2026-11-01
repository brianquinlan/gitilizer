# Gemini model comparison (2026-11-01)

Pointwise strategy, default prompt (`prompts/v4.md`), all 36 items in `eval/ground_truth.yaml`, three single-trial runs per configuration
(two for `gemini-4-argon` at high thinking). Average input is about 4,900 tokens per item (5,200 for `gemini-4-argon`).
Costs use Google's paid-tier prices read on 2026-11-01 (ai.google.dev/gemini-api/docs/pricing); thinking tokens are billed as output.
"Default" thinking means no `--thinking` flag.

| Model | Thinking | Trials | Kendall tau (mean ± sd) | Tau, held-out set B | Top-3 overlap | Mean rank error | Output + thinking tokens / item | Cost / item | Cost for 2,000 items | Price notes |
|---|---|---|---|---|---|---|---|---|---|---|
| `gemini-3.8-flash` | high | 3 | 0.813 ± 0.011 | 0.726 | 1.00 | 2.48 | 1627 | $0.0097 | $19.49 | doubles to $1.50 / $7.50 on 2027-01-01 |
| `gemini-3.7-flash` | high | 3 | 0.802 ± 0.004 | 0.709 | 1.00 | 2.67 | 1614 | – | – | price not listed |
| `gemini-3.7-flash` | default | 3 | 0.793 ± 0.009 | 0.702 | 1.00 | 2.72 | 607 | – | – | price not listed |
| `gemini-3.8-flash` | default | 3 | 0.768 ± 0.043 | 0.681 | 1.00 | 2.96 | 628 | $0.0060 | $12.00 | doubles to $1.50 / $7.50 on 2027-01-01 |
| `gemini-3.1-pro-preview` | default | 3 | 0.727 ± 0.019 | 0.579 | 0.89 | 3.41 | 691 | $0.0180 | $36.03 | no free tier |
| `gemini-4-argon` | high | 2 | 0.714 ± 0.005 | 0.547 | 1.00 | 3.44 | 805 | $0.0184 | $36.75 | doubles to $4.00 / $20.00 on 2026-12-01; no free tier |
| `gemini-4-argon` | default | 3 | 0.713 ± 0.008 | 0.544 | 1.00 | 3.56 | 152 | $0.0118 | $23.69 | doubles to $4.00 / $20.00 on 2026-12-01; no free tier |
| `gemini-3.8-flash` | low | 3 | 0.688 ± 0.010 | 0.502 | 1.00 | 3.89 | 120 | $0.0041 | $8.19 | doubles to $1.50 / $7.50 on 2027-01-01 |
| `gemini-3.5-flash` | default | 3 | 0.662 ± 0.021 | 0.519 | 0.67 | 4.28 | 752 | – | – | price not listed |
| `gemini-3.6-flash` | default | 3 | 0.658 ± 0.027 | 0.484 | 0.67 | 4.28 | 725 | $0.0064 | $12.73 | doubles on 2027-01-01 |
| `gemini-3.5-flash-lite` | default | 3 | 0.584 ± 0.022 | 0.418 | 0.78 | 4.80 | 108 | $0.0017 | $3.46 |  |
| `gemini-2.5-flash` | default | 3 | 0.545 ± 0.029 | 0.361 | 0.67 | 5.80 | 1353 | $0.0048 | $9.68 |  |
| `gemini-3.1-flash-lite` | default | 3 | 0.399 ± 0.038 | 0.161 | 0.56 | 7.65 | 114 | $0.0014 | $2.77 |  |

Caveats: one ranker, 36 items, and `prompts/v4.md` was written and tuned against `gemini-3.8-flash`, which favours it.
Differences of a few hundredths of tau are within run-to-run variation. Per-run reports are in `eval/runs/2026110*-m-*/`.
