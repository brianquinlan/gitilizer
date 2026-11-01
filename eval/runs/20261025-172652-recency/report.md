# Gitilizer eval: recency

strategy `recency` · model `-` · thinking `default` · prompt `-` · signals `True` · 1 trial(s) · 13 items · 20261025-172652

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.000 ± 0.000 |
| spearman | 0.022 ± 0.000 |
| pairwise_acc | 0.500 ± 0.000 |
| ndcg | 0.859 ± 0.000 |
| ndcg@5 | 0.603 ± 0.000 |
| top3_overlap | 0.333 ± 0.000 |
| top5_overlap | 0.400 ± 0.000 |
| mean_abs_displacement | 4.308 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | next action (last trial) |
|---:|---|---:|---:|---|---|---|
| 1 | 7.0 (7) | +6.0 ⚠️ | 0.50 | - | dart-lang/sdk#48056 |  |
| 2 | 1.0 (1) | -1.0 | 1.00 | - | googleapis/librarian#7808 |  |
| 3 | 8.0 (8) | +5.0 ⚠️ | 0.42 | - | googleapis/google-cloud-dart#376 |  |
| 4 | 5.0 (5) | +1.0 | 0.67 | - | googleapis/google-cloud-dart#382 |  |
| 5 | 9.0 (9) | +4.0 ⚠️ | 0.33 | - | googleapis/google-cloud-dart#361 |  |
| 6 | 13.0 (13) | +7.0 ⚠️ | 0.00 | - | dart-lang/sdk#31275 |  |
| 7 | 6.0 (6) | -1.0 | 0.58 | - | googleapis/google-cloud-dart#381 |  |
| 8 | 12.0 (12) | +4.0 ⚠️ | 0.08 | - | dart-lang/http#1837 |  |
| 9 | 4.0 (4) | -5.0 ⚠️ | 0.75 | - | dart-lang/http#2031 |  |
| 10 | 11.0 (11) | +1.0 | 0.17 | - | dart-lang/http#1365 |  |
| 11 | 2.0 (2) | -9.0 ⚠️ | 0.92 | - | dart-lang/http#2026 |  |
| 12 | 10.0 (10) | -2.0 | 0.25 | - | dart-lang/native#3653 |  |
| 13 | 3.0 (3) | -10.0 ⚠️ | 0.83 | - | dart-lang/http#2033 |  |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/http#2033** (truth #13) in 1/1 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/http#2026** (truth #11) in 1/1 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/http#2033** (truth #13) in 1/1 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/http#2033** (truth #13) in 1/1 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/http#2031** (truth #9) in 1/1 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/http#2026** (truth #11) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #5) placed below **dart-lang/http#2033** (truth #13) in 1/1 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/http#2026** (truth #11) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #6) placed below **dart-lang/http#2033** (truth #13) in 1/1 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **googleapis/google-cloud-dart#381** (truth #7) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 7, priority 0.50
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.

### 2. googleapis/librarian#7808 → predicted 1, priority 1.00
- **Ground truth:** My PR, review feedback needs addressed.

### 3. googleapis/google-cloud-dart#376 → predicted 8, priority 0.42
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.67
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.

### 5. googleapis/google-cloud-dart#361 → predicted 9, priority 0.33
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.

### 6. dart-lang/sdk#31275 → predicted 13, priority 0.00
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.

### 7. googleapis/google-cloud-dart#381 → predicted 6, priority 0.58
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.

### 8. dart-lang/http#1837 → predicted 12, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.

### 9. dart-lang/http#2031 → predicted 4, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.

### 10. dart-lang/http#1365 → predicted 11, priority 0.17
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. Indicated that I am not responsible for package:http2.

### 11. dart-lang/http#2026 → predicted 2, priority 0.92
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.

### 12. dart-lang/native#3653 → predicted 10, priority 0.25
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.

### 13. dart-lang/http#2033 → predicted 3, priority 0.83
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
