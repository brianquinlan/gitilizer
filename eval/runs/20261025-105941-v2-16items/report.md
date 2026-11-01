# Gitilizer eval: v2-16items

strategy `pointwise` · model `gemini-3.8-flash` · thinking `default` · prompt `prompts/v2.md` · signals `True` · 3 trial(s) · 16 items · 20261025-105941

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.633 ± 0.029 |
| spearman | 0.797 ± 0.031 |
| pairwise_acc | 0.817 ± 0.014 |
| ndcg | 0.974 ± 0.004 |
| ndcg@5 | 0.971 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 2.208 ± 0.072 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | next action (last trial) |
|---:|---|---:|---:|---|---|---|
| 1 | 4.0 (4) | +3.0 | 0.55 | 3/3 | dart-lang/sdk#48056 | Reply to the recent comment to clarify whether Android certificate revocation and blocklists are honored, noting the fix in #64644. |
| 2 | 1.0 (1) | -1.0 | 0.88 | 3/3 | googleapis/librarian#7808 | Respond to kevmoo's review question about preserving CHANGELOG.md and update the PR. |
| 3 | 2.0 (2) | -1.0 | 0.79 | 3/3 | googleapis/google-cloud-dart#376 | Review the pull request for sigurdm. |
| 4 | 3.0 (3) | -1.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | Review this pull request. |
| 5 | 7.3 (6–8) | +2.3 | 0.37 | 2/3 | googleapis/google-cloud-dart#360 | Waiting on someone to prioritize or implement this non-urgent streaming improvement. |
| 6 | 5.0 (5) | -1.0 | 0.42 | 0/3 | googleapis/google-cloud-dart#361 | Waiting for kevmoo to reply regarding switching to discovery vs. adding convenience extensions. |
| 7 | 9.0 (9) | +2.0 | 0.30 | 1/3 | dart-lang/sdk#31275 | None immediately; decide whether to pick up the abandoned CL to fix uncatchable HttpExceptions in dart:io. |
| 8 | 7.0 (7) | -1.0 | 0.36 | 0/3 | googleapis/google-cloud-dart#381 | Review linked PR #382 rather than acting directly on this issue. |
| 9 | 11.7 (11–12) | +2.7 | 0.10 | 0/3 | dart-lang/http#1837 | Waiting on community interest or contributions. |
| 10 | 11.3 (11–12) | +1.3 | 0.10 | 0/3 | dart-lang/http#2031 | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged. |
| 11 | 16.0 (16) | +5.0 ⚠️ | 0.00 | 0/3 | dart-lang/http#1365 | No action needed as I am not responsible for package:http2. |
| 12 | 10.0 (10) | -2.0 | 0.19 | 3/3 | googleapis/google-cloud-dart#345 | Resume work to resolve merge conflicts and bot comments, or close the draft PR. |
| 13 | 14.3 (14–15) | +1.3 | 0.00 | 0/3 | dart-lang/http#2026 | Waiting on mosuem to review. |
| 14 | 13.0 (13) | -1.0 | 0.03 | 0/3 | dart-lang/native#3653 | Waiting on liamappelbe to decide whether to pursue changes to the VM/trampolines or close the issue. |
| 15 | 6.7 (6–8) | -8.3 ⚠️ | 0.35 | 0/3 | dart-lang/native#3763 | Waiting on a code review from liamappelbe. |
| 16 | 14.7 (14–15) | -1.3 | 0.01 | 0/3 | dart-lang/http#2033 | Waiting on mosuem to merge the PR. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#360** (truth #5) placed below **dart-lang/native#3763** (truth #15) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #7) placed below **dart-lang/native#3763** (truth #15) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #8) placed below **dart-lang/native#3763** (truth #15) in 2/3 trial(s)
- **dart-lang/http#1837** (truth #9) placed below **dart-lang/native#3763** (truth #15) in 3/3 trial(s)
- **dart-lang/http#2031** (truth #10) placed below **dart-lang/native#3763** (truth #15) in 3/3 trial(s)
- **dart-lang/http#1365** (truth #11) placed below **dart-lang/http#2033** (truth #16) in 3/3 trial(s)
- **dart-lang/http#1365** (truth #11) placed below **dart-lang/native#3763** (truth #15) in 3/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **googleapis/google-cloud-dart#382** (truth #4) in 3/3 trial(s)
- **dart-lang/http#1837** (truth #9) placed below **googleapis/google-cloud-dart#345** (truth #12) in 3/3 trial(s)
- **dart-lang/http#1365** (truth #11) placed below **dart-lang/native#3653** (truth #14) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 4, priority 0.55
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** You authored and are assigned to this issue regarding Android root certificates in dart:io. A user recently asked questions regarding security implications and certificate revocation following an intermediate CA compromise, which was partially addressed in #64644. While dart-lang/sdk is not one of your primary designated repositories, this is assigned to you and involves a security query on an active thread.
- **Next action:** Reply to the recent comment to clarify whether Android certificate revocation and blocklists are honored, noting the fix in #64644.

### 2. googleapis/librarian#7808 → predicted 1, priority 0.88
- **Ground truth:** My PR, review feedback needs addressed.
- **Model:** This is your PR, and your collaborator kevmoo left an inline question 19 hours ago that is blocking progress. Replying to review feedback on your own PRs takes top priority so your work doesn't stall, especially since this fixes an issue in your google-cloud-dart repository.
- **Next action:** Respond to kevmoo's review question about preserving CHANGELOG.md and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 2, priority 0.80
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from your close collaborator sigurdm in a repository you are responsible for (googleapis/google-cloud-dart). It has been waiting for human review for 5 days, making you the default reviewer to unblock it.
- **Next action:** Review the pull request for sigurdm.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository you maintain. While the author is a first-time contributor rather than a close collaborator, you are the default reviewer and the PR addresses a concrete bug with retryable status codes. It needs your initial review to unblock the contributor.
- **Next action:** Review this pull request.

### 5. googleapis/google-cloud-dart#360 → predicted 8, priority 0.35
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a legitimate design issue regarding streaming response handling in googleapis/google-cloud-dart opened by your collaborator kevmoo. You previously asked for clarification and kevmoo replied noting it is not urgent. Since no immediate action is requested and nobody is blocked, it can remain in the backlog for when streaming improvements are scheduled.
- **Next action:** Waiting on someone to prioritize or implement this non-urgent streaming improvement.

### 6. googleapis/google-cloud-dart#361 → predicted 5, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in a repository I maintain, opened by a close collaborator (kevmoo). I asked a direct design question 16 days ago regarding the trade-offs of switching to discovery format, and am currently waiting on their response before proceeding.
- **Next action:** Waiting for kevmoo to reply regarding switching to discovery vs. adding convenience extensions.

### 7. dart-lang/sdk#31275 → predicted 9, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an important bug in dart:io where uncatchable exceptions crash processes, and collaborator kevmoo CC'd you hoping you could take it up. However, the thread has been dormant for over two years with no active discussion or direct blocker waiting on you right now.
- **Next action:** None immediately; decide whether to pick up the abandoned CL to fix uncatchable HttpExceptions in dart:io.

### 8. googleapis/google-cloud-dart#381 → predicted 7, priority 0.35
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue reports a legitimate bug in googleapis/google-cloud-dart, but the author has already submitted PR #382 to fix it. Per guidelines, open issues with addressing PRs are ranked roughly 0.2–0.3 below their PR, as reviewing the PR is the primary action.
- **Next action:** Review linked PR #382 rather than acting directly on this issue.

### 9. dart-lang/http#1837 → predicted 12, priority 0.10
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded to this feature request a year ago noting the Dart team will not take it on and labeled it contributions-welcome/P3. There has been no activity since, so no action is required on your part.
- **Next action:** Waiting on community interest or contributions.

### 10. dart-lang/http#2031 → predicted 11, priority 0.15
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although my collaborator mosuem requested my review, this release PR is stacked on unmerged PRs that must be reviewed and landed first. Furthermore, I am not normally responsible for http2 in dart-lang/http, so reviewing this preparatory release PR should wait until the underlying changes are completed.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged.

### 11. dart-lang/http#1365 → predicted 16, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is filed against `package:http2`, which is explicitly outside of my scope of responsibility in dart-lang/http. I have not been assigned, mentioned, or asked to intervene, so it requires no attention from me.
- **Next action:** No action needed as I am not responsible for package:http2.

### 12. googleapis/google-cloud-dart#345 → predicted 10, priority 0.18
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft PR introducing DNS support in google-cloud-dart, but it has been dormant for 45 days with merge conflicts. Only a bot has commented, and you converted it to draft shortly after opening it. While it is on you to finish or close it, nobody is currently blocked by it.
- **Next action:** Resume work to resolve merge conflicts and bot comments, or close the draft PR.

### 13. dart-lang/http#2026 → predicted 14, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR affects package:http2, which is explicitly outside my area of responsibility in dart-lang/http. The author has specifically requested a review from mosuem, so there is nothing for me to do.
- **Next action:** Waiting on mosuem to review.

### 14. dart-lang/native#3653 → predicted 13, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, which is outside your primary areas of responsibility, and is assigned to and driven by liamappelbe. You previously shared context from your experiments, but there are no outstanding questions or actions requested of you, and discussion has been dormant for over a month.
- **Next action:** Waiting on liamappelbe to decide whether to pursue changes to the VM/trampolines or close the issue.

### 15. dart-lang/native#3763 → predicted 6, priority 0.35
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** You authored this pull request to resolve a performance issue affecting cupertino_http and requested a review from liamappelbe two days ago. There is no feedback or action required on your end until the review is submitted.
- **Next action:** Waiting on a code review from liamappelbe.

### 16. dart-lang/http#2033 → predicted 15, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already approved this pull request and there has been no subsequent activity or new commits. There is nothing further for me to do; it is ready for mosuem to merge.
- **Next action:** Waiting on mosuem to merge the PR.
