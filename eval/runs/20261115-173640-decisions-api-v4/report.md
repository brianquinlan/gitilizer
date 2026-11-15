# Gitilizer eval: decisions-api-v4

strategy `pointwise` · model `gemini-decision-1` · thinking `default` · prompt `/sessions/rcw-01fmhwk87vbhayxd9d68tnmf/work/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261115-173640

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.546 ± 0.000 |
| spearman | 0.708 ± 0.000 |
| pairwise_acc | 0.773 ± 0.000 |
| ndcg | 0.980 ± 0.000 |
| ndcg@5 | 0.999 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 6.056 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.783 ± 0.000 | 0.994 ± 0.000 | 0.800 ± 0.000 | 1.250 ± 0.000 |
| B | 20 | 0.305 ± 0.000 | 0.948 ± 0.000 | 0.400 ± 0.000 | 4.900 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.88 | 3/3 | dart-lang/sdk#48056 | A |  |
| 2 | 2.0 (2) | +0.0 | 0.79 | 3/3 | googleapis/librarian#7808 | A |  |
| 3 | 5.0 (5) | +2.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#376 | A |  |
| 4 | 3.0 (3) | -1.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A |  |
| 5 | 4.0 (4) | -1.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#252 | B |  |
| 6 | 13.0 (13) | +7.0 | 0.47 | 3/3 | dart-lang/http#2027 | B |  |
| 7 | 7.0 (7) | +0.0 | 0.59 | 3/3 | dart-lang/http#1981 | B |  |
| 8 | 9.0 (9) | +1.0 | 0.52 | 0/3 | googleapis/google-cloud-dart#360 | A |  |
| 9 | 12.0 (12) | +3.0 | 0.48 | 0/3 | dart-lang/sdk#59846 | B |  |
| 10 | 6.0 (6) | -4.0 | 0.61 | 0/3 | googleapis/google-cloud-dart#361 | A |  |
| 11 | 14.0 (14) | +3.0 | 0.39 | 0/3 | dart-lang/sdk#31275 | A |  |
| 12 | 17.0 (17) | +5.0 | 0.31 | 0/3 | dart-lang/native#3752 | B |  |
| 13 | 10.0 (10) | -3.0 | 0.52 | 3/3 | googleapis/google-cloud-dart#366 | B |  |
| 14 | 22.0 (22) | +8.0 | 0.27 | 0/3 | dart-lang/tools#2719 | B |  |
| 15 | 19.0 (19) | +4.0 | 0.28 | 0/3 | googleapis/google-cloud-dart#381 | A |  |
| 16 | 30.0 (30) | +14.0 ⚠️ | 0.16 | 0/3 | dart-lang/http#2034 | B |  |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B |  |
| 18 | 31.0 (31) | +13.0 ⚠️ | 0.14 | 0/3 | dart-lang/http#2031 | A |  |
| 19 | 25.0 (25) | +6.0 | 0.25 | 0/3 | googleapis/google-cloud-dart#345 | A |  |
| 20 | 28.0 (28) | +8.0 | 0.24 | 0/3 | dart-lang/core#1007 | B |  |
| 21 | 15.0 (15) | -6.0 | 0.38 | 0/3 | dart-lang/tools#2544 | B |  |
| 22 | 24.0 (24) | +2.0 | 0.26 | 0/3 | dart-lang/tools#2710 | B |  |
| 23 | 32.0 (32) | +9.0 ⚠️ | 0.14 | 0/3 | dart-lang/native#3763 | A |  |
| 24 | 27.0 (27) | +3.0 | 0.25 | 0/3 | googleapis/google-cloud-dart#373 | B |  |
| 25 | 20.0 (20) | -5.0 | 0.28 | 0/3 | dart-lang/http#579 | B |  |
| 26 | 16.0 (16) | -10.0 ⚠️ | 0.31 | 0/3 | dart-lang/http#1932 | B |  |
| 27 | 29.0 (29) | +2.0 | 0.21 | 0/3 | flutter/devtools#8223 | B |  |
| 28 | 33.0 (33) | +5.0 | 0.11 | 0/3 | dart-lang/http#1837 | A |  |
| 29 | 36.0 (36) | +7.0 | 0.06 | 0/3 | dart-lang/http#2033 | A |  |
| 30 | 35.0 (35) | +5.0 | 0.06 | 0/3 | dart-lang/http#1365 | A |  |
| 31 | 18.0 (18) | -13.0 ⚠️ | 0.29 | 0/3 | dart-lang/tools#2715 | B |  |
| 32 | 34.0 (34) | +2.0 | 0.09 | 0/3 | dart-lang/http#2026 | A |  |
| 33 | 23.0 (23) | -10.0 ⚠️ | 0.26 | 0/3 | dart-lang/native#3653 | A |  |
| 34 | 26.0 (26) | -8.0 | 0.25 | 0/3 | dart-lang/http#1972 | B |  |
| 35 | 21.0 (21) | -14.0 ⚠️ | 0.27 | 0/3 | dart-lang/http#1841 | B |  |
| 36 | 11.0 (11) | -25.0 ⚠️ | 0.50 | 3/3 | dart-lang/sdk#38148 | B |  |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1841** (truth #35) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1841** (truth #35) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1972** (truth #34) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.88
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** band=6.39 p(actionable)=0.93

### 2. googleapis/librarian#7808 → predicted 2, priority 0.79
- **Ground truth:** Review feedback needs addressed.
- **Model:** band=5.57 p(actionable)=0.94

### 3. googleapis/google-cloud-dart#376 → predicted 5, priority 0.69
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** band=4.77 p(actionable)=0.88

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** band=4.89 p(actionable)=0.84

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.69
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** band=4.82 p(actionable)=0.83

### 6. dart-lang/http#2027 → predicted 13, priority 0.47
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** band=3.36 p(actionable)=0.54

### 7. dart-lang/http#1981 → predicted 7, priority 0.59
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** band=4.11 p(actionable)=0.67

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** band=3.68 p(actionable)=0.49

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.48
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** band=3.36 p(actionable)=0.46

### 10. googleapis/google-cloud-dart#361 → predicted 6, priority 0.61
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** band=4.29 p(actionable)=0.23

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.39
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** band=2.77 p(actionable)=0.27

### 12. dart-lang/native#3752 → predicted 17, priority 0.31
- **Ground truth:** 
- **Model:** band=2.32 p(actionable)=0.11

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.52
- **Ground truth:** 
- **Model:** band=3.66 p(actionable)=0.57

### 14. dart-lang/tools#2719 → predicted 22, priority 0.27
- **Ground truth:** 
- **Model:** band=2.08 p(actionable)=0.11

### 15. googleapis/google-cloud-dart#381 → predicted 19, priority 0.28
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** band=2.16 p(actionable)=0.10

### 16. dart-lang/http#2034 → predicted 30, priority 0.16
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** band=1.38 p(actionable)=0.01

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** band=4.03 p(actionable)=0.60

### 18. dart-lang/http#2031 → predicted 31, priority 0.14
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** band=1.14 p(actionable)=0.07

### 19. googleapis/google-cloud-dart#345 → predicted 25, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** band=2.01 p(actionable)=0.10

### 20. dart-lang/core#1007 → predicted 28, priority 0.24
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** band=1.88 p(actionable)=0.07

### 21. dart-lang/tools#2544 → predicted 15, priority 0.38
- **Ground truth:** 
- **Model:** band=2.87 p(actionable)=0.15

### 22. dart-lang/tools#2710 → predicted 24, priority 0.26
- **Ground truth:** 
- **Model:** band=2.02 p(actionable)=0.12

### 23. dart-lang/native#3763 → predicted 32, priority 0.14
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** band=1.21 p(actionable)=0.01

### 24. googleapis/google-cloud-dart#373 → predicted 27, priority 0.25
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** band=1.92 p(actionable)=0.07

### 25. dart-lang/http#579 → predicted 20, priority 0.28
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** band=2.11 p(actionable)=0.31

### 26. dart-lang/http#1932 → predicted 16, priority 0.31
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** band=2.35 p(actionable)=0.23

### 27. flutter/devtools#8223 → predicted 29, priority 0.21
- **Ground truth:** 
- **Model:** band=1.46 p(actionable)=0.06

### 28. dart-lang/http#1837 → predicted 33, priority 0.11
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** band=1.01 p(actionable)=0.01

### 29. dart-lang/http#2033 → predicted 36, priority 0.06
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** band=0.29 p(actionable)=0.02

### 30. dart-lang/http#1365 → predicted 35, priority 0.06
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** band=0.34 p(actionable)=0.01

### 31. dart-lang/tools#2715 → predicted 18, priority 0.29
- **Ground truth:** 
- **Model:** band=2.19 p(actionable)=0.09

### 32. dart-lang/http#2026 → predicted 34, priority 0.09
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** band=0.56 p(actionable)=0.01

### 33. dart-lang/native#3653 → predicted 23, priority 0.26
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** band=1.98 p(actionable)=0.07

### 34. dart-lang/http#1972 → predicted 26, priority 0.25
- **Ground truth:** 
- **Model:** band=1.92 p(actionable)=0.07

### 35. dart-lang/http#1841 → predicted 21, priority 0.27
- **Ground truth:** 
- **Model:** band=2.09 p(actionable)=0.14

### 36. dart-lang/sdk#38148 → predicted 11, priority 0.50
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** band=3.56 p(actionable)=0.65
