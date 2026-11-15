# Gitilizer eval: decisions-api-v5

strategy `pointwise` · model `gemini-decision-1` · thinking `default` · prompt `/sessions/rcw-01fmhwk87vbhayxd9d68tnmf/work/prompts/v5.md` · signals `True` · 1 trial(s) · 36 items · 20261115-173920

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.575 ± 0.000 |
| spearman | 0.747 ± 0.000 |
| pairwise_acc | 0.787 ± 0.000 |
| ndcg | 0.984 ± 0.000 |
| ndcg@5 | 0.998 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 5.722 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.817 ± 0.000 | 0.996 ± 0.000 | 0.800 ± 0.000 | 1.125 ± 0.000 |
| B | 20 | 0.379 ± 0.000 | 0.961 ± 0.000 | 0.600 ± 0.000 | 4.500 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.89 | 1/1 | dart-lang/sdk#48056 | A |  |
| 2 | 2.0 (2) | +0.0 | 0.82 | 1/1 | googleapis/librarian#7808 | A |  |
| 3 | 4.0 (4) | +1.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#376 | A |  |
| 4 | 5.0 (5) | +1.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A |  |
| 5 | 3.0 (3) | -2.0 | 0.71 | 1/1 | googleapis/google-cloud-dart#252 | B |  |
| 6 | 11.0 (11) | +5.0 | 0.49 | 1/1 | dart-lang/http#2027 | B |  |
| 7 | 7.0 (7) | +0.0 | 0.57 | 1/1 | dart-lang/http#1981 | B |  |
| 8 | 10.0 (10) | +2.0 | 0.51 | 0/1 | googleapis/google-cloud-dart#360 | A |  |
| 9 | 12.0 (12) | +3.0 | 0.47 | 0/1 | dart-lang/sdk#59846 | B |  |
| 10 | 6.0 (6) | -4.0 | 0.63 | 0/1 | googleapis/google-cloud-dart#361 | A |  |
| 11 | 14.0 (14) | +3.0 | 0.39 | 0/1 | dart-lang/sdk#31275 | A |  |
| 12 | 17.0 (17) | +5.0 | 0.31 | 0/1 | dart-lang/native#3752 | B |  |
| 13 | 9.0 (9) | -4.0 | 0.51 | 1/1 | googleapis/google-cloud-dart#366 | B |  |
| 14 | 20.0 (20) | +6.0 | 0.27 | 0/1 | dart-lang/tools#2719 | B |  |
| 15 | 19.0 (19) | +4.0 | 0.30 | 0/1 | googleapis/google-cloud-dart#381 | A |  |
| 16 | 31.0 (31) | +15.0 ⚠️ | 0.13 | 0/1 | dart-lang/http#2034 | B |  |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.57 | 1/1 | googleapis/google-cloud-dart#359 | B |  |
| 18 | 30.0 (30) | +12.0 ⚠️ | 0.14 | 0/1 | dart-lang/http#2031 | A |  |
| 19 | 21.0 (21) | +2.0 | 0.27 | 0/1 | googleapis/google-cloud-dart#345 | A |  |
| 20 | 27.0 (27) | +7.0 | 0.25 | 0/1 | dart-lang/core#1007 | B |  |
| 21 | 16.0 (16) | -5.0 | 0.33 | 0/1 | dart-lang/tools#2544 | B |  |
| 22 | 26.0 (26) | +4.0 | 0.26 | 0/1 | dart-lang/tools#2710 | B |  |
| 23 | 32.0 (32) | +9.0 ⚠️ | 0.13 | 0/1 | dart-lang/native#3763 | A |  |
| 24 | 15.0 (15) | -9.0 ⚠️ | 0.34 | 0/1 | googleapis/google-cloud-dart#373 | B |  |
| 25 | 28.0 (28) | +3.0 | 0.21 | 0/1 | dart-lang/http#579 | B |  |
| 26 | 18.0 (18) | -8.0 | 0.31 | 0/1 | dart-lang/http#1932 | B |  |
| 27 | 29.0 (29) | +2.0 | 0.19 | 0/1 | flutter/devtools#8223 | B |  |
| 28 | 33.0 (33) | +5.0 | 0.11 | 0/1 | dart-lang/http#1837 | A |  |
| 29 | 36.0 (36) | +7.0 | 0.05 | 0/1 | dart-lang/http#2033 | A |  |
| 30 | 35.0 (35) | +5.0 | 0.06 | 0/1 | dart-lang/http#1365 | A |  |
| 31 | 23.0 (23) | -8.0 | 0.26 | 0/1 | dart-lang/tools#2715 | B |  |
| 32 | 34.0 (34) | +2.0 | 0.09 | 0/1 | dart-lang/http#2026 | A |  |
| 33 | 22.0 (22) | -11.0 ⚠️ | 0.26 | 0/1 | dart-lang/native#3653 | A |  |
| 34 | 25.0 (25) | -9.0 ⚠️ | 0.26 | 0/1 | dart-lang/http#1972 | B |  |
| 35 | 24.0 (24) | -11.0 ⚠️ | 0.26 | 0/1 | dart-lang/http#1841 | B |  |
| 36 | 13.0 (13) | -23.0 ⚠️ | 0.44 | 1/1 | dart-lang/sdk#38148 | B |  |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1841** (truth #35) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1972** (truth #34) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/native#3653** (truth #33) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1841** (truth #35) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.89
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** band=6.51 p(actionable)=0.94

### 2. googleapis/librarian#7808 → predicted 2, priority 0.82
- **Ground truth:** Review feedback needs addressed.
- **Model:** band=5.77 p(actionable)=0.95

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.70
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** band=4.87 p(actionable)=0.91

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** band=4.85 p(actionable)=0.88

### 5. googleapis/google-cloud-dart#252 → predicted 3, priority 0.71
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** band=4.92 p(actionable)=0.69

### 6. dart-lang/http#2027 → predicted 11, priority 0.49
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** band=3.43 p(actionable)=0.69

### 7. dart-lang/http#1981 → predicted 7, priority 0.57
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** band=4.04 p(actionable)=0.75

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.51
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** band=3.59 p(actionable)=0.48

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.47
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** band=3.28 p(actionable)=0.46

### 10. googleapis/google-cloud-dart#361 → predicted 6, priority 0.63
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** band=4.42 p(actionable)=0.13

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.39
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** band=2.76 p(actionable)=0.29

### 12. dart-lang/native#3752 → predicted 17, priority 0.31
- **Ground truth:** 
- **Model:** band=2.37 p(actionable)=0.16

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.51
- **Ground truth:** 
- **Model:** band=3.62 p(actionable)=0.58

### 14. dart-lang/tools#2719 → predicted 20, priority 0.27
- **Ground truth:** 
- **Model:** band=2.12 p(actionable)=0.10

### 15. googleapis/google-cloud-dart#381 → predicted 19, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** band=2.27 p(actionable)=0.06

### 16. dart-lang/http#2034 → predicted 31, priority 0.13
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** band=1.19 p(actionable)=0.01

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.57
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** band=4.00 p(actionable)=0.63

### 18. dart-lang/http#2031 → predicted 30, priority 0.14
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** band=1.15 p(actionable)=0.03

### 19. googleapis/google-cloud-dart#345 → predicted 21, priority 0.27
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** band=2.08 p(actionable)=0.14

### 20. dart-lang/core#1007 → predicted 27, priority 0.25
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** band=1.96 p(actionable)=0.03

### 21. dart-lang/tools#2544 → predicted 16, priority 0.33
- **Ground truth:** 
- **Model:** band=2.50 p(actionable)=0.10

### 22. dart-lang/tools#2710 → predicted 26, priority 0.26
- **Ground truth:** 
- **Model:** band=2.03 p(actionable)=0.09

### 23. dart-lang/native#3763 → predicted 32, priority 0.13
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** band=1.20 p(actionable)=0.03

### 24. googleapis/google-cloud-dart#373 → predicted 15, priority 0.34
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** band=2.49 p(actionable)=0.17

### 25. dart-lang/http#579 → predicted 28, priority 0.21
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** band=1.67 p(actionable)=0.18

### 26. dart-lang/http#1932 → predicted 18, priority 0.31
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** band=2.32 p(actionable)=0.16

### 27. flutter/devtools#8223 → predicted 29, priority 0.19
- **Ground truth:** 
- **Model:** band=1.31 p(actionable)=0.04

### 28. dart-lang/http#1837 → predicted 33, priority 0.11
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** band=0.98 p(actionable)=0.01

### 29. dart-lang/http#2033 → predicted 36, priority 0.05
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** band=0.23 p(actionable)=0.02

### 30. dart-lang/http#1365 → predicted 35, priority 0.06
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** band=0.35 p(actionable)=0.01

### 31. dart-lang/tools#2715 → predicted 23, priority 0.26
- **Ground truth:** 
- **Model:** band=2.05 p(actionable)=0.08

### 32. dart-lang/http#2026 → predicted 34, priority 0.09
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** band=0.56 p(actionable)=0.01

### 33. dart-lang/native#3653 → predicted 22, priority 0.26
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** band=1.99 p(actionable)=0.10

### 34. dart-lang/http#1972 → predicted 25, priority 0.26
- **Ground truth:** 
- **Model:** band=1.96 p(actionable)=0.08

### 35. dart-lang/http#1841 → predicted 24, priority 0.26
- **Ground truth:** 
- **Model:** band=2.02 p(actionable)=0.07

### 36. dart-lang/sdk#38148 → predicted 13, priority 0.44
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** band=3.08 p(actionable)=0.57
