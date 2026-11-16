# Gitilizer eval: decision-no-scale

strategy `pointwise` · model `gemini-decision-1` · thinking `default` · prompt `/sessions/rcw-01fmhwk87vbhayxd9d68tnmf/work/prompts/v4-no-scale.md` · signals `True` · 3 trial(s) · 36 items · 20261115-221550

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.559 ± 0.000 |
| spearman | 0.718 ± 0.000 |
| pairwise_acc | 0.779 ± 0.000 |
| ndcg | 0.975 ± 0.000 |
| ndcg@5 | 0.988 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 5.778 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.850 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 0.875 ± 0.000 |
| B | 20 | 0.305 ± 0.000 | 0.921 ± 0.000 | 0.600 ± 0.000 | 4.900 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.82 | 3/3 | dart-lang/sdk#48056 | A |  |
| 2 | 2.0 (2) | +0.0 | 0.71 | 3/3 | googleapis/librarian#7808 | A |  |
| 3 | 4.0 (4) | +1.0 | 0.64 | 3/3 | googleapis/google-cloud-dart#376 | A |  |
| 4 | 5.0 (5) | +1.0 | 0.58 | 3/3 | googleapis/google-cloud-dart#382 | A |  |
| 5 | 7.0 (7) | +2.0 | 0.57 | 3/3 | googleapis/google-cloud-dart#252 | B |  |
| 6 | 9.0 (9) | +3.0 | 0.49 | 0/3 | dart-lang/http#2027 | B |  |
| 7 | 3.0 (3) | -4.0 | 0.65 | 3/3 | dart-lang/http#1981 | B |  |
| 8 | 11.0 (11) | +3.0 | 0.45 | 0/3 | googleapis/google-cloud-dart#360 | A |  |
| 9 | 12.0 (12) | +3.0 | 0.45 | 0/3 | dart-lang/sdk#59846 | B |  |
| 10 | 13.0 (13) | +3.0 | 0.45 | 0/3 | googleapis/google-cloud-dart#361 | A |  |
| 11 | 15.0 (15) | +4.0 | 0.43 | 0/3 | dart-lang/sdk#31275 | A |  |
| 12 | 21.0 (21) | +9.0 ⚠️ | 0.37 | 0/3 | dart-lang/native#3752 | B |  |
| 13 | 10.0 (10) | -3.0 | 0.48 | 3/3 | googleapis/google-cloud-dart#366 | B |  |
| 14 | 25.0 (25) | +11.0 ⚠️ | 0.34 | 0/3 | dart-lang/tools#2719 | B |  |
| 15 | 22.0 (22) | +7.0 | 0.36 | 0/3 | googleapis/google-cloud-dart#381 | A |  |
| 16 | 29.0 (29) | +13.0 ⚠️ | 0.33 | 0/3 | dart-lang/http#2034 | B |  |
| 17 | 6.0 (6) | -11.0 ⚠️ | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B |  |
| 18 | 26.0 (26) | +8.0 | 0.34 | 0/3 | dart-lang/http#2031 | A |  |
| 19 | 20.0 (20) | +1.0 | 0.39 | 0/3 | googleapis/google-cloud-dart#345 | A |  |
| 20 | 28.0 (28) | +8.0 | 0.33 | 0/3 | dart-lang/core#1007 | B |  |
| 21 | 23.0 (23) | +2.0 | 0.36 | 0/3 | dart-lang/tools#2544 | B |  |
| 22 | 14.0 (14) | -8.0 | 0.43 | 0/3 | dart-lang/tools#2710 | B |  |
| 23 | 24.0 (24) | +1.0 | 0.34 | 0/3 | dart-lang/native#3763 | A |  |
| 24 | 18.0 (18) | -6.0 | 0.42 | 0/3 | googleapis/google-cloud-dart#373 | B |  |
| 25 | 17.0 (17) | -8.0 | 0.42 | 0/3 | dart-lang/http#579 | B |  |
| 26 | 19.0 (19) | -7.0 | 0.40 | 0/3 | dart-lang/http#1932 | B |  |
| 27 | 32.0 (32) | +5.0 | 0.29 | 0/3 | flutter/devtools#8223 | B |  |
| 28 | 33.0 (33) | +5.0 | 0.23 | 0/3 | dart-lang/http#1837 | A |  |
| 29 | 36.0 (36) | +7.0 | 0.20 | 0/3 | dart-lang/http#2033 | A |  |
| 30 | 34.0 (34) | +4.0 | 0.22 | 0/3 | dart-lang/http#1365 | A |  |
| 31 | 16.0 (16) | -15.0 ⚠️ | 0.42 | 0/3 | dart-lang/tools#2715 | B |  |
| 32 | 35.0 (35) | +3.0 | 0.22 | 0/3 | dart-lang/http#2026 | A |  |
| 33 | 31.0 (31) | -2.0 | 0.30 | 0/3 | dart-lang/native#3653 | A |  |
| 34 | 30.0 (30) | -4.0 | 0.32 | 0/3 | dart-lang/http#1972 | B |  |
| 35 | 27.0 (27) | -8.0 | 0.34 | 0/3 | dart-lang/http#1841 | B |  |
| 36 | 8.0 (8) | -28.0 ⚠️ | 0.49 | 3/3 | dart-lang/sdk#38148 | B |  |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.82
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.71
- **Ground truth:** Review feedback needs addressed.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.64
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.58
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.

### 5. googleapis/google-cloud-dart#252 → predicted 7, priority 0.57
- **Ground truth:** Conversation waiting for a reply to make progress.

### 6. dart-lang/http#2027 → predicted 9, priority 0.49
- **Ground truth:** Recent bug filed by file in an area in which I work.

### 7. dart-lang/http#1981 → predicted 3, priority 0.65
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.45
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.45
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.45
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.43
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.

### 12. dart-lang/native#3752 → predicted 21, priority 0.37
- **Ground truth:** 

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.48
- **Ground truth:** 

### 14. dart-lang/tools#2719 → predicted 25, priority 0.34
- **Ground truth:** 

### 15. googleapis/google-cloud-dart#381 → predicted 22, priority 0.36
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.

### 16. dart-lang/http#2034 → predicted 29, priority 0.33
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.

### 17. googleapis/google-cloud-dart#359 → predicted 6, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.

### 18. dart-lang/http#2031 → predicted 26, priority 0.34
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.39
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.

### 20. dart-lang/core#1007 → predicted 28, priority 0.33
- **Ground truth:** Team review requested for a repository that I don't monitor

### 21. dart-lang/tools#2544 → predicted 23, priority 0.36
- **Ground truth:** 

### 22. dart-lang/tools#2710 → predicted 14, priority 0.43
- **Ground truth:** 

### 23. dart-lang/native#3763 → predicted 24, priority 0.34
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.

### 24. googleapis/google-cloud-dart#373 → predicted 18, priority 0.42
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.

### 25. dart-lang/http#579 → predicted 17, priority 0.42
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.

### 26. dart-lang/http#1932 → predicted 19, priority 0.40
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.

### 27. flutter/devtools#8223 → predicted 32, priority 0.29
- **Ground truth:** 

### 28. dart-lang/http#1837 → predicted 33, priority 0.23
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.

### 29. dart-lang/http#2033 → predicted 36, priority 0.20
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.

### 30. dart-lang/http#1365 → predicted 34, priority 0.22
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.

### 31. dart-lang/tools#2715 → predicted 16, priority 0.42
- **Ground truth:** 

### 32. dart-lang/http#2026 → predicted 35, priority 0.22
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.

### 33. dart-lang/native#3653 → predicted 31, priority 0.30
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.

### 34. dart-lang/http#1972 → predicted 30, priority 0.32
- **Ground truth:** 

### 35. dart-lang/http#1841 → predicted 27, priority 0.34
- **Ground truth:** 

### 36. dart-lang/sdk#38148 → predicted 8, priority 0.49
- **Ground truth:** Thumbs down with no reply afterwards.
