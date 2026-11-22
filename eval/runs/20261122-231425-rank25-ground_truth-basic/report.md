# Gitilizer eval: rank25-ground_truth-basic

strategy `pointwise` · model `gemini-decision-1` · thinking `default` · prompt `/sessions/rcw-01fmhwk6smifvq1n8sesn8rb/evalwork/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261122-231425

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.540 ± 0.000 |
| spearman | 0.701 ± 0.000 |
| pairwise_acc | 0.770 ± 0.000 |
| ndcg | 0.979 ± 0.000 |
| ndcg@5 | 0.999 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 5.889 ± 0.000 |

## Next steps (mean ± sd across trials)

Against the next step the eval set records for 36 items (PRD RANK-24). "Same side" counts a next step on the other side of "on me" as wrong, and any other as right.

| metric | value |
|---|---|
| exact | 0.833 ± 0.000 |
| same side | 0.944 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.800 ± 0.000 | 0.995 ± 0.000 | 0.800 ± 0.000 | 1.250 ± 0.000 |
| B | 20 | 0.263 ± 0.000 | 0.931 ± 0.000 | 0.400 ± 0.000 | 4.800 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | next step (expected) | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.89 | todo | dart-lang/sdk#48056 | A |  |
| 2 | 2.0 (2) | +0.0 | 0.81 | respond | googleapis/librarian#7808 | A |  |
| 3 | 4.0 (4) | +1.0 | 0.70 | review | googleapis/google-cloud-dart#376 | A |  |
| 4 | 3.0 (3) | -1.0 | 0.71 | review | googleapis/google-cloud-dart#382 | A |  |
| 5 | 5.0 (5) | +0.0 | 0.67 | respond | googleapis/google-cloud-dart#252 | B |  |
| 6 | 13.0 (13) | +7.0 | 0.46 | todo | dart-lang/http#2027 | B |  |
| 7 | 8.0 (8) | +1.0 | 0.59 | todo | dart-lang/http#1981 | B |  |
| 8 | 9.0 (9) | +1.0 | 0.53 | todo | googleapis/google-cloud-dart#360 | A |  |
| 9 | 12.0 (12) | +3.0 | 0.49 | backlog | dart-lang/sdk#59846 | B |  |
| 10 | 6.0 (6) | -4.0 | 0.62 | waiting | googleapis/google-cloud-dart#361 | A |  |
| 11 | 14.0 (14) | +3.0 | 0.37 | not_yours | dart-lang/sdk#31275 | A |  |
| 12 | 16.0 (16) | +4.0 | 0.30 | elsewhere | dart-lang/native#3752 | B |  |
| 13 | 11.0 (11) | -2.0 | 0.50 | todo | googleapis/google-cloud-dart#366 | B |  |
| 14 | 23.0 (23) | +9.0 ⚠️ | 0.26 | not_yours | dart-lang/tools#2719 | B |  |
| 15 | 21.0 (21) | +6.0 | 0.27 | elsewhere | googleapis/google-cloud-dart#381 | A |  |
| 16 | 30.0 (30) | +14.0 ⚠️ | 0.16 | waiting | dart-lang/http#2034 | B |  |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.60 | todo (elsewhere) ⚠️ | googleapis/google-cloud-dart#359 | B |  |
| 18 | 31.0 (31) | +13.0 ⚠️ | 0.15 | elsewhere | dart-lang/http#2031 | A |  |
| 19 | 20.0 (20) | +1.0 | 0.27 | todo | googleapis/google-cloud-dart#345 | A |  |
| 20 | 27.0 (27) | +7.0 | 0.25 | not_yours | dart-lang/core#1007 | B |  |
| 21 | 18.0 (18) | -3.0 | 0.29 | not_yours | dart-lang/tools#2544 | B |  |
| 22 | 28.0 (28) | +6.0 | 0.24 | elsewhere (not_yours) ⚠️ | dart-lang/tools#2710 | B |  |
| 23 | 32.0 (32) | +9.0 ⚠️ | 0.15 | waiting | dart-lang/native#3763 | A |  |
| 24 | 19.0 (19) | -5.0 | 0.27 | waiting | googleapis/google-cloud-dart#373 | B |  |
| 25 | 25.0 (25) | +0.0 | 0.25 | respond (backlog) ⚠️ | dart-lang/http#579 | B |  |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.29 | elsewhere | dart-lang/http#1932 | B |  |
| 27 | 29.0 (29) | +2.0 | 0.17 | not_yours | flutter/devtools#8223 | B |  |
| 28 | 33.0 (33) | +5.0 | 0.11 | not_yours (backlog) ⚠️ | dart-lang/http#1837 | A |  |
| 29 | 36.0 (36) | +7.0 | 0.06 | not_yours | dart-lang/http#2033 | A |  |
| 30 | 34.0 (34) | +4.0 | 0.06 | not_yours | dart-lang/http#1365 | A |  |
| 31 | 15.0 (15) | -16.0 ⚠️ | 0.34 | not_yours | dart-lang/tools#2715 | B |  |
| 32 | 35.0 (35) | +3.0 | 0.06 | not_yours | dart-lang/http#2026 | A |  |
| 33 | 26.0 (26) | -7.0 | 0.25 | elsewhere (not_yours) ⚠️ | dart-lang/native#3653 | A |  |
| 34 | 24.0 (24) | -10.0 ⚠️ | 0.25 | elsewhere | dart-lang/http#1972 | B |  |
| 35 | 22.0 (22) | -13.0 ⚠️ | 0.26 | elsewhere | dart-lang/http#1841 | B |  |
| 36 | 10.0 (10) | -26.0 ⚠️ | 0.52 | todo (respond) ⚠️ | dart-lang/sdk#38148 | B |  |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1841** (truth #35) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/tools#2715** (truth #31) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.89
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.81
- **Ground truth:** Review feedback needs addressed.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.70
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.71
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.67
- **Ground truth:** Conversation waiting for a reply to make progress.

### 6. dart-lang/http#2027 → predicted 13, priority 0.46
- **Ground truth:** Recent bug filed by file in an area in which I work.

### 7. dart-lang/http#1981 → predicted 8, priority 0.59
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.53
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.49
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.

### 10. googleapis/google-cloud-dart#361 → predicted 6, priority 0.62
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.37
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.

### 12. dart-lang/native#3752 → predicted 16, priority 0.30
- **Ground truth:** 

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.50
- **Ground truth:** 

### 14. dart-lang/tools#2719 → predicted 23, priority 0.26
- **Ground truth:** 

### 15. googleapis/google-cloud-dart#381 → predicted 21, priority 0.27
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.

### 16. dart-lang/http#2034 → predicted 30, priority 0.16
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.

### 18. dart-lang/http#2031 → predicted 31, priority 0.15
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.27
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.

### 20. dart-lang/core#1007 → predicted 27, priority 0.25
- **Ground truth:** Team review requested for a repository that I don't monitor

### 21. dart-lang/tools#2544 → predicted 18, priority 0.29
- **Ground truth:** 

### 22. dart-lang/tools#2710 → predicted 28, priority 0.24
- **Ground truth:** 

### 23. dart-lang/native#3763 → predicted 32, priority 0.15
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.

### 24. googleapis/google-cloud-dart#373 → predicted 19, priority 0.27
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.

### 25. dart-lang/http#579 → predicted 25, priority 0.25
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.

### 26. dart-lang/http#1932 → predicted 17, priority 0.29
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.

### 27. flutter/devtools#8223 → predicted 29, priority 0.17
- **Ground truth:** 

### 28. dart-lang/http#1837 → predicted 33, priority 0.11
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.

### 29. dart-lang/http#2033 → predicted 36, priority 0.06
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.

### 30. dart-lang/http#1365 → predicted 34, priority 0.06
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.

### 31. dart-lang/tools#2715 → predicted 15, priority 0.34
- **Ground truth:** 

### 32. dart-lang/http#2026 → predicted 35, priority 0.06
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.

### 33. dart-lang/native#3653 → predicted 26, priority 0.25
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.

### 34. dart-lang/http#1972 → predicted 24, priority 0.25
- **Ground truth:** 

### 35. dart-lang/http#1841 → predicted 22, priority 0.26
- **Ground truth:** 

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.52
- **Ground truth:** Thumbs down with no reply afterwards.
