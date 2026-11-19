# Gitilizer eval: next-step-smoke

strategy `pointwise` · model `gemini-decision-1` · thinking `default` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-143659

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.546 ± 0.000 |
| spearman | 0.702 ± 0.000 |
| pairwise_acc | 0.773 ± 0.000 |
| ndcg | 0.978 ± 0.000 |
| ndcg@5 | 0.999 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 6.111 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.800 ± 0.000 | 0.994 ± 0.000 | 0.800 ± 0.000 | 1.250 ± 0.000 |
| B | 20 | 0.305 ± 0.000 | 0.940 ± 0.000 | 0.400 ± 0.000 | 4.800 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.86 | 1/1 | dart-lang/sdk#48056 | A | [todo] p=0.58 |
| 2 | 2.0 (2) | +0.0 | 0.82 | 1/1 | googleapis/librarian#7808 | A | [respond] p=0.97 |
| 3 | 4.0 (4) | +1.0 | 0.69 | 1/1 | googleapis/google-cloud-dart#376 | A | [review] p=0.92 |
| 4 | 3.0 (3) | -1.0 | 0.71 | 1/1 | googleapis/google-cloud-dart#382 | A | [review] p=0.99 |
| 5 | 5.0 (5) | +0.0 | 0.69 | 1/1 | googleapis/google-cloud-dart#252 | B | [respond] p=0.61 |
| 6 | 13.0 (13) | +7.0 | 0.47 | 1/1 | dart-lang/http#2027 | B | [todo] p=0.66 |
| 7 | 7.0 (7) | +0.0 | 0.59 | 1/1 | dart-lang/http#1981 | B | [todo] p=0.88 |
| 8 | 11.0 (11) | +3.0 | 0.51 | 0/1 | googleapis/google-cloud-dart#360 | A | [waiting] p=0.31 |
| 9 | 12.0 (12) | +3.0 | 0.50 | 1/1 | dart-lang/sdk#59846 | B | [backlog] p=0.52 |
| 10 | 8.0 (8) | -2.0 | 0.58 | 0/1 | googleapis/google-cloud-dart#361 | A | [waiting] p=0.86 |
| 11 | 14.0 (14) | +3.0 | 0.37 | 0/1 | dart-lang/sdk#31275 | A | [not_yours] p=0.67 |
| 12 | 20.0 (20) | +8.0 | 0.29 | 0/1 | dart-lang/native#3752 | B | [elsewhere] p=0.90 |
| 13 | 9.0 (9) | -4.0 | 0.54 | 1/1 | googleapis/google-cloud-dart#366 | B | [todo] p=0.50 |
| 14 | 18.0 (18) | +4.0 | 0.29 | 0/1 | dart-lang/tools#2719 | B | [not_yours] p=0.81 |
| 15 | 19.0 (19) | +4.0 | 0.29 | 0/1 | googleapis/google-cloud-dart#381 | A | [elsewhere] p=0.86 |
| 16 | 31.0 (31) | +15.0 ⚠️ | 0.15 | 0/1 | dart-lang/http#2034 | B | [waiting] p=0.97 |
| 17 | 6.0 (6) | -11.0 ⚠️ | 0.60 | 1/1 | googleapis/google-cloud-dart#359 | B | [todo] p=0.89 |
| 18 | 30.0 (30) | +12.0 ⚠️ | 0.17 | 0/1 | dart-lang/http#2031 | A | [elsewhere] p=0.82 |
| 19 | 25.0 (25) | +6.0 | 0.26 | 1/1 | googleapis/google-cloud-dart#345 | A | [todo] p=0.60 |
| 20 | 28.0 (28) | +8.0 | 0.24 | 0/1 | dart-lang/core#1007 | B | [not_yours] p=0.73 |
| 21 | 15.0 (15) | -6.0 | 0.35 | 0/1 | dart-lang/tools#2544 | B | [not_yours] p=0.71 |
| 22 | 27.0 (27) | +5.0 | 0.25 | 0/1 | dart-lang/tools#2710 | B | [elsewhere] p=0.67 |
| 23 | 32.0 (32) | +9.0 ⚠️ | 0.14 | 0/1 | dart-lang/native#3763 | A | [waiting] p=0.94 |
| 24 | 16.0 (16) | -8.0 | 0.33 | 0/1 | googleapis/google-cloud-dart#373 | B | [waiting] p=0.82 |
| 25 | 26.0 (26) | +1.0 | 0.26 | 1/1 | dart-lang/http#579 | B | [respond] p=0.34 |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.31 | 0/1 | dart-lang/http#1932 | B | [elsewhere] p=0.81 |
| 27 | 29.0 (29) | +2.0 | 0.19 | 0/1 | flutter/devtools#8223 | B | [not_yours] p=0.96 |
| 28 | 33.0 (33) | +5.0 | 0.12 | 0/1 | dart-lang/http#1837 | A | [not_yours] p=0.65 |
| 29 | 35.0 (35) | +6.0 | 0.07 | 0/1 | dart-lang/http#2033 | A | [not_yours] p=0.99 |
| 30 | 36.0 (36) | +6.0 | 0.06 | 0/1 | dart-lang/http#1365 | A | [not_yours] p=0.98 |
| 31 | 21.0 (21) | -10.0 ⚠️ | 0.28 | 0/1 | dart-lang/tools#2715 | B | [not_yours] p=0.71 |
| 32 | 34.0 (34) | +2.0 | 0.10 | 0/1 | dart-lang/http#2026 | A | [not_yours] p=0.96 |
| 33 | 22.0 (22) | -11.0 ⚠️ | 0.28 | 0/1 | dart-lang/native#3653 | A | [not_yours] p=0.60 |
| 34 | 24.0 (24) | -10.0 ⚠️ | 0.27 | 0/1 | dart-lang/http#1972 | B | [elsewhere] p=0.69 |
| 35 | 23.0 (23) | -12.0 ⚠️ | 0.27 | 0/1 | dart-lang/http#1841 | B | [elsewhere] p=0.79 |
| 36 | 10.0 (10) | -26.0 ⚠️ | 0.53 | 1/1 | dart-lang/sdk#38148 | B | [todo] p=0.45 |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1841** (truth #35) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1972** (truth #34) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.86
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Next action:** [todo] p=0.58

### 2. googleapis/librarian#7808 → predicted 2, priority 0.82
- **Ground truth:** Review feedback needs addressed.
- **Next action:** [respond] p=0.97

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.69
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Next action:** [review] p=0.92

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.71
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Next action:** [review] p=0.99

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.69
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Next action:** [respond] p=0.61

### 6. dart-lang/http#2027 → predicted 13, priority 0.47
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Next action:** [todo] p=0.66

### 7. dart-lang/http#1981 → predicted 7, priority 0.59
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Next action:** [todo] p=0.88

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.51
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Next action:** [waiting] p=0.31

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Next action:** [backlog] p=0.52

### 10. googleapis/google-cloud-dart#361 → predicted 8, priority 0.58
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Next action:** [waiting] p=0.86

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.37
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Next action:** [not_yours] p=0.67

### 12. dart-lang/native#3752 → predicted 20, priority 0.29
- **Ground truth:** 
- **Next action:** [elsewhere] p=0.90

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.54
- **Ground truth:** 
- **Next action:** [todo] p=0.50

### 14. dart-lang/tools#2719 → predicted 18, priority 0.29
- **Ground truth:** 
- **Next action:** [not_yours] p=0.81

### 15. googleapis/google-cloud-dart#381 → predicted 19, priority 0.29
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Next action:** [elsewhere] p=0.86

### 16. dart-lang/http#2034 → predicted 31, priority 0.15
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Next action:** [waiting] p=0.97

### 17. googleapis/google-cloud-dart#359 → predicted 6, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Next action:** [todo] p=0.89

### 18. dart-lang/http#2031 → predicted 30, priority 0.17
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Next action:** [elsewhere] p=0.82

### 19. googleapis/google-cloud-dart#345 → predicted 25, priority 0.26
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Next action:** [todo] p=0.60

### 20. dart-lang/core#1007 → predicted 28, priority 0.24
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Next action:** [not_yours] p=0.73

### 21. dart-lang/tools#2544 → predicted 15, priority 0.35
- **Ground truth:** 
- **Next action:** [not_yours] p=0.71

### 22. dart-lang/tools#2710 → predicted 27, priority 0.25
- **Ground truth:** 
- **Next action:** [elsewhere] p=0.67

### 23. dart-lang/native#3763 → predicted 32, priority 0.14
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Next action:** [waiting] p=0.94

### 24. googleapis/google-cloud-dart#373 → predicted 16, priority 0.33
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Next action:** [waiting] p=0.82

### 25. dart-lang/http#579 → predicted 26, priority 0.26
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Next action:** [respond] p=0.34

### 26. dart-lang/http#1932 → predicted 17, priority 0.31
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Next action:** [elsewhere] p=0.81

### 27. flutter/devtools#8223 → predicted 29, priority 0.19
- **Ground truth:** 
- **Next action:** [not_yours] p=0.96

### 28. dart-lang/http#1837 → predicted 33, priority 0.12
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Next action:** [not_yours] p=0.65

### 29. dart-lang/http#2033 → predicted 35, priority 0.07
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Next action:** [not_yours] p=0.99

### 30. dart-lang/http#1365 → predicted 36, priority 0.06
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Next action:** [not_yours] p=0.98

### 31. dart-lang/tools#2715 → predicted 21, priority 0.28
- **Ground truth:** 
- **Next action:** [not_yours] p=0.71

### 32. dart-lang/http#2026 → predicted 34, priority 0.10
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Next action:** [not_yours] p=0.96

### 33. dart-lang/native#3653 → predicted 22, priority 0.28
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Next action:** [not_yours] p=0.60

### 34. dart-lang/http#1972 → predicted 24, priority 0.27
- **Ground truth:** 
- **Next action:** [elsewhere] p=0.69

### 35. dart-lang/http#1841 → predicted 23, priority 0.27
- **Ground truth:** 
- **Next action:** [elsewhere] p=0.79

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.53
- **Ground truth:** Thumbs down with no reply afterwards.
- **Next action:** [todo] p=0.45
