# Gitilizer eval: v1-nosignals

strategy `pointwise` · model `gemini-3.8-flash` · thinking `default` · prompt `/home/claude/gitilizer2/prompts/v1.md` · signals `False` · 3 trial(s) · 13 items · 20261025-103418

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.410 ± 0.051 |
| spearman | 0.628 ± 0.037 |
| pairwise_acc | 0.705 ± 0.026 |
| ndcg | 0.942 ± 0.007 |
| ndcg@5 | 0.832 ± 0.028 |
| top3_overlap | 0.556 ± 0.192 |
| top5_overlap | 0.600 ± 0.200 |
| mean_abs_displacement | 2.667 ± 0.177 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | next action (last trial) |
|---:|---|---:|---:|---|---|---|
| 1 | 7.7 (7–8) | +6.7 ⚠️ | 0.22 | 0/3 | dart-lang/sdk#48056 | None required; the recent inquiry regarding the eMudhra CA compromise was already addressed via issue #64644. |
| 2 | 1.0 (1) | -1.0 | 0.81 | 3/3 | googleapis/librarian#7808 | Respond to kevmoo's review comment regarding handling CHANGELOG.md preservation during generation. |
| 3 | 3.3 (2–5) | +0.3 | 0.35 | 0/3 | googleapis/google-cloud-dart#376 | Wait for sigurdm to assign reviewers or request review. |
| 4 | 4.7 (2–7) | +0.7 | 0.37 | 1/3 | googleapis/google-cloud-dart#382 | Review the pull request and verify the error status code mapping for REST exceptions. |
| 5 | 5.3 (4–6) | +0.3 | 0.27 | 0/3 | googleapis/google-cloud-dart#361 | Wait for kevmoo to respond to the question about switching to discovery vs. adding convenience extensions. |
| 6 | 6.3 (4–8) | +0.3 | 0.28 | 0/3 | dart-lang/sdk#31275 | Decide whether to resurrect the abandoned Gerrit CL to fix uncatchable exceptions in dart:io HttpClient. |
| 7 | 4.0 (2–6) | -3.0 | 0.30 | 0/3 | googleapis/google-cloud-dart#381 | Review the linked pull request #382 to address this bug. |
| 8 | 11.0 (11) | +3.0 | 0.05 | 0/3 | dart-lang/http#1837 | Waiting for community contribution or further discussion from external contributors. |
| 9 | 3.7 (3–5) | -5.3 ⚠️ | 0.27 | 3/3 | dart-lang/http#2031 | Review the release PR or ask mosuem to reassign it, as you are not responsible for http2. |
| 10 | 13.0 (13) | +3.0 | 0.00 | 0/3 | dart-lang/http#1365 | None; no action required from you. |
| 11 | 12.0 (12) | +1.0 | 0.00 | 0/3 | dart-lang/http#2026 | Wait for mosuem to review the PR. |
| 12 | 9.7 (9–10) | -2.3 | 0.12 | 0/3 | dart-lang/native#3653 | Wait on liamappelbe or the native team to decide whether to implement this or close the issue. |
| 13 | 9.3 (9–10) | -3.7 ⚠️ | 0.10 | 0/3 | dart-lang/http#2033 | Wait for @mosuem to merge the pull request. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/http#2031** (truth #9) in 3/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **googleapis/google-cloud-dart#381** (truth #7) in 3/3 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/http#2031** (truth #9) in 1/3 trial(s)
- **dart-lang/http#1837** (truth #8) placed below **dart-lang/http#2033** (truth #13) in 3/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/sdk#31275** (truth #6) in 2/3 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/http#2031** (truth #9) in 2/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **googleapis/google-cloud-dart#361** (truth #5) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #5) placed below **dart-lang/http#2031** (truth #9) in 3/3 trial(s)
- **dart-lang/http#1837** (truth #8) placed below **dart-lang/native#3653** (truth #12) in 3/3 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **googleapis/google-cloud-dart#381** (truth #7) in 2/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 8, priority 0.20
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a P3 issue in dart-lang/sdk where you were not directly mentioned. Although recent comments raised security concerns regarding certificate revocation, another team member already linked to the resolved issue (#64644) that addressed the specific compromise. Because no direct input or urgent action is requested of you, this remains a low-priority backlog item.
- **Next action:** None required; the recent inquiry regarding the eMudhra CA compromise was already addressed via issue #64644.

### 2. googleapis/librarian#7808 → predicted 1, priority 0.82
- **Ground truth:** My PR, review feedback needs addressed.
- **Model:** You are the author of this PR, which fixes a release issue in googleapis/google-cloud-dart. Your collaborator kevmoo reviewed it and raised an architectural question about how CHANGELOG.md should be preserved, so your input or code change is needed to move forward.
- **Next action:** Respond to kevmoo's review comment regarding handling CHANGELOG.md preservation during generation.

### 3. googleapis/google-cloud-dart#376 → predicted 5, priority 0.25
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This PR is in a repository you maintain and was authored by your close collaborator sigurdm. However, you are not assigned or requested for review, so no immediate action is required on your part.
- **Next action:** Wait for sigurdm to assign reviewers or request review.

### 4. googleapis/google-cloud-dart#382 → predicted 2, priority 0.65
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This PR addresses a bug in googleapis/google-cloud-dart where REST RPC errors are not properly retried due to missing google.rpc.Code mapping. As a maintainer of this repository, you need to review this community contribution, which has been waiting for review for three days. The PR is well-documented and includes tests, making it ready for a thorough review.
- **Next action:** Review the pull request and verify the error status code mapping for REST exceptions.

### 5. googleapis/google-cloud-dart#361 → predicted 6, priority 0.25
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** You were the last person to comment on this issue, asking kevmoo for his input on whether switching to the discovery format is preferable over convenience extensions given the much larger API surface. The issue is on your repository and involves a close collaborator, but it is currently blocked awaiting kevmoo's reply. No action is needed from you at this time.
- **Next action:** Wait for kevmoo to respond to the question about switching to discovery vs. adding convenience extensions.

### 6. dart-lang/sdk#31275 → predicted 7, priority 0.25
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** You were CC'd as the owner of the library by parlough and kevmoo, but CC mentions are informational and do not strictly require a direct response. While it represents a real bug in dart:io with a previously verified patch, the issue is dormant with no recent activity in over 20 months.
- **Next action:** Decide whether to resurrect the abandoned Gerrit CL to fix uncatchable exceptions in dart:io HttpClient.

### 7. googleapis/google-cloud-dart#381 → predicted 4, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** You are not mentioned or assigned on this issue, meaning it does not require direct action on the issue tracker itself. While it is a legitimate bug in a repository you maintain, the contributor has already submitted PR #382, making the PR the appropriate place for your review and action.
- **Next action:** Review the linked pull request #382 to address this bug.

### 8. dart-lang/http#1837 → predicted 11, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You were the last person to comment on this issue, stating that the Dart team is not likely to take on this feature and suggesting the community implement it. It is marked as 'contributions-welcome' and 'P3', and has been dormant for a year. There is nothing required from you at this time.
- **Next action:** Waiting for community contribution or further discussion from external contributors.

### 9. dart-lang/http#2031 → predicted 3, priority 0.25
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** You were directly requested for review by collaborator mosuem on this release PR. However, your profile explicitly notes that you are not responsible for http2, which significantly reduces its priority. Because you are the sole requested reviewer and the PR has been waiting for three days, you should either do a quick review of the version bump or ask to reassign it.
- **Next action:** Review the release PR or ask mosuem to reassign it, as you are not responsible for http2.

### 10. dart-lang/http#1365 → predicted 13, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. Indicated that I am not responsible for package:http2.
- **Model:** You explicitly noted that you are not responsible for http2 issues in dart-lang/http. Furthermore, you are neither assigned nor mentioned in this issue, making it completely non-actionable for you.
- **Next action:** None; no action required from you.

### 11. dart-lang/http#2026 → predicted 12, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** You are not responsible for http2 in dart-lang/http. Additionally, you are not assigned or requested for review, and the author specifically pinged mosuem for review.
- **Next action:** Wait for mosuem to review the PR.

### 12. dart-lang/native#3653 → predicted 9, priority 0.15
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to liamappelbe and is not in one of your primary repositories. You provided technical input earlier in the thread, and the latest consensus from the team is that the change may not be worth the complexity. There is no action required from you.
- **Next action:** Wait on liamappelbe or the native team to decide whether to implement this or close the issue.

### 13. dart-lang/http#2033 → predicted 10, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You have already reviewed and approved this PR, making you the last person to act. There are no pending action items for you, and the author or repo maintainer can now merge it.
- **Next action:** Wait for @mosuem to merge the pull request.
