# Gitilizer eval: recency-16items

strategy `recency` · model `-` · thinking `default` · prompt `-` · signals `True` · 1 trial(s) · 16 items · 20261025-105941

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | -0.050 ± 0.000 |
| spearman | -0.044 ± 0.000 |
| pairwise_acc | 0.475 ± 0.000 |
| ndcg | 0.846 ± 0.000 |
| ndcg@5 | 0.506 ± 0.000 |
| top3_overlap | 0.333 ± 0.000 |
| top5_overlap | 0.200 ± 0.000 |
| mean_abs_displacement | 5.500 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | next action (last trial) |
|---:|---|---:|---:|---|---|---|
| 1 | 8.0 (8) | +7.0 ⚠️ | 0.53 | - | dart-lang/sdk#48056 |  |
| 2 | 1.0 (1) | -1.0 | 1.00 | - | googleapis/librarian#7808 |  |
| 3 | 9.0 (9) | +6.0 ⚠️ | 0.47 | - | googleapis/google-cloud-dart#376 |  |
| 4 | 6.0 (6) | +2.0 | 0.67 | - | googleapis/google-cloud-dart#382 |  |
| 5 | 11.0 (11) | +6.0 ⚠️ | 0.33 | - | googleapis/google-cloud-dart#360 |  |
| 6 | 10.0 (10) | +4.0 ⚠️ | 0.40 | - | googleapis/google-cloud-dart#361 |  |
| 7 | 16.0 (16) | +9.0 ⚠️ | 0.00 | - | dart-lang/sdk#31275 |  |
| 8 | 7.0 (7) | -1.0 | 0.60 | - | googleapis/google-cloud-dart#381 |  |
| 9 | 15.0 (15) | +6.0 ⚠️ | 0.07 | - | dart-lang/http#1837 |  |
| 10 | 5.0 (5) | -5.0 ⚠️ | 0.73 | - | dart-lang/http#2031 |  |
| 11 | 14.0 (14) | +3.0 | 0.13 | - | dart-lang/http#1365 |  |
| 12 | 13.0 (13) | +1.0 | 0.20 | - | googleapis/google-cloud-dart#345 |  |
| 13 | 2.0 (2) | -11.0 ⚠️ | 0.93 | - | dart-lang/http#2026 |  |
| 14 | 12.0 (12) | -2.0 | 0.27 | - | dart-lang/native#3653 |  |
| 15 | 4.0 (4) | -11.0 ⚠️ | 0.80 | - | dart-lang/native#3763 |  |
| 16 | 3.0 (3) | -13.0 ⚠️ | 0.87 | - | dart-lang/http#2033 |  |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/http#2033** (truth #16) in 1/1 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/native#3763** (truth #15) in 1/1 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/http#2033** (truth #16) in 1/1 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/http#2026** (truth #13) in 1/1 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/native#3763** (truth #15) in 1/1 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/http#2033** (truth #16) in 1/1 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/native#3763** (truth #15) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #5) placed below **dart-lang/http#2033** (truth #16) in 1/1 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/http#2026** (truth #13) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #5) placed below **dart-lang/native#3763** (truth #15) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 8, priority 0.53
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.

### 2. googleapis/librarian#7808 → predicted 1, priority 1.00
- **Ground truth:** My PR, review feedback needs addressed.

### 3. googleapis/google-cloud-dart#376 → predicted 9, priority 0.47
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.

### 4. googleapis/google-cloud-dart#382 → predicted 6, priority 0.67
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.

### 5. googleapis/google-cloud-dart#360 → predicted 11, priority 0.33
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.

### 6. googleapis/google-cloud-dart#361 → predicted 10, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.

### 7. dart-lang/sdk#31275 → predicted 16, priority 0.00
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.

### 8. googleapis/google-cloud-dart#381 → predicted 7, priority 0.60
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.

### 9. dart-lang/http#1837 → predicted 15, priority 0.07
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.

### 10. dart-lang/http#2031 → predicted 5, priority 0.73
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.

### 11. dart-lang/http#1365 → predicted 14, priority 0.13
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.

### 12. googleapis/google-cloud-dart#345 → predicted 13, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.

### 13. dart-lang/http#2026 → predicted 2, priority 0.93
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.

### 14. dart-lang/native#3653 → predicted 12, priority 0.27
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.

### 15. dart-lang/native#3763 → predicted 4, priority 0.80
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.

### 16. dart-lang/http#2033 → predicted 3, priority 0.87
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
