# Gitilizer eval: v1-signals

strategy `pointwise` · model `gemini-3.8-flash` · thinking `default` · prompt `/sessions/rcw-01mxfmwn41bgpzexd5rgrswd/mnt/gitilizer2/prompts/v1.md` · signals `True` · 3 trial(s) · 13 items · 20261025-172652

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.444 ± 0.053 |
| spearman | 0.668 ± 0.037 |
| pairwise_acc | 0.722 ± 0.027 |
| ndcg | 0.943 ± 0.009 |
| ndcg@5 | 0.856 ± 0.031 |
| top3_overlap | 0.444 ± 0.192 |
| top5_overlap | 0.667 ± 0.115 |
| mean_abs_displacement | 2.513 ± 0.320 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | next action (last trial) |
|---:|---|---:|---:|---|---|---|
| 1 | 6.7 (6–7) | +5.7 ⚠️ | 0.22 | 0/3 | dart-lang/sdk#48056 | No immediate action required; the recent inquiry regarding the compromised CAs was addressed in #64644. |
| 2 | 1.0 (1) | -1.0 | 0.85 | 3/3 | googleapis/librarian#7808 | Respond to kevmoo's question regarding whether `Bump` should update `lib.Keep` or if cleaning should auto-preserve `CHANGELOG.md`. |
| 3 | 4.0 (3–5) | +1.0 | 0.32 | 0/3 | googleapis/google-cloud-dart#376 | Wait for the author to resolve bot feedback or request a review. |
| 4 | 3.7 (2–5) | -0.3 | 0.38 | 1/3 | googleapis/google-cloud-dart#382 | Wait for the PR to be assigned to a reviewer. |
| 5 | 6.7 (5–8) | +1.7 | 0.23 | 0/3 | googleapis/google-cloud-dart#361 | Wait for kevmoo to reply to my question regarding discovery vs. convenience extensions. |
| 6 | 5.7 (3–8) | -0.3 | 0.27 | 0/3 | dart-lang/sdk#31275 | Decide whether to adopt the abandoned CL to fix uncatchable HttpClient exceptions. |
| 7 | 2.3 (2–3) | -4.7 ⚠️ | 0.38 | 0/3 | googleapis/google-cloud-dart#381 | Wait for maintainer triage or review the linked pull request #382. |
| 8 | 11.0 (11) | +3.0 | 0.05 | 0/3 | dart-lang/http#1837 | Waiting for community contribution or further interest from the community. |
| 9 | 6.3 (4–9) | -2.7 | 0.18 | 2/3 | dart-lang/http#2031 | Review the release PR or reassign it given your lack of responsibility for http2. |
| 10 | 13.0 (13) | +3.0 | 0.00 | 0/3 | dart-lang/http#1365 | None; leave for http2 maintainers to review and triage. |
| 11 | 12.0 (12) | +1.0 | 0.00 | 0/3 | dart-lang/http#2026 | None (waiting on @mosuem to review). |
| 12 | 10.0 (10) | -2.0 | 0.08 | 0/3 | dart-lang/native#3653 | Wait for the assignee (liamappelbe) or VM team to decide whether to pursue native trampoline changes or close the issue. |
| 13 | 8.7 (8–9) | -4.3 ⚠️ | 0.15 | 0/3 | dart-lang/http#2033 | Wait for @mosuem to merge the approved pull request. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/http#2031** (truth #9) in 2/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **googleapis/google-cloud-dart#381** (truth #7) in 3/3 trial(s)
- **dart-lang/http#1837** (truth #8) placed below **dart-lang/http#2033** (truth #13) in 3/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/sdk#31275** (truth #6) in 2/3 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/http#2031** (truth #9) in 1/3 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **googleapis/google-cloud-dart#381** (truth #7) in 3/3 trial(s)
- **dart-lang/http#1837** (truth #8) placed below **dart-lang/native#3653** (truth #12) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #5) placed below **dart-lang/http#2031** (truth #9) in 2/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **googleapis/google-cloud-dart#361** (truth #5) in 1/3 trial(s)
- **dart-lang/http#2031** (truth #9) placed below **dart-lang/http#2033** (truth #13) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 7, priority 0.20
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an older P3 issue in the Dart SDK concerning how Android's disabled root certs are handled in dart:io. Recent comments raised a security question about intermediate CA compromises, but you were not directly mentioned and another team member already pointed to the fix in #64644. Because this remains a low-priority backlog item with no direct action pending from you, it has low priority.
- **Next action:** No immediate action required; the recent inquiry regarding the compromised CAs was addressed in #64644.

### 2. googleapis/librarian#7808 → predicted 1, priority 0.85
- **Ground truth:** My PR, review feedback needs addressed.
- **Model:** You authored this PR to fix an issue affecting google-cloud-dart release tagging. Collaborator kevmoo reviewed it and raised an important question about CHANGELOG.md preservation during generation that requires your decision and code adjustment to move forward.
- **Next action:** Respond to kevmoo's question regarding whether `Bump` should update `lib.Keep` or if cleaning should auto-preserve `CHANGELOG.md`.

### 3. googleapis/google-cloud-dart#376 → predicted 5, priority 0.25
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This PR is in a repository you are responsible for (googleapis/google-cloud-dart), but you are not assigned, requested for review, or mentioned. The PR has pending review requirements and automated checks, so no action is currently required from you.
- **Next action:** Wait for the author to resolve bot feedback or request a review.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.25
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** You are neither assigned to this PR nor have you previously reviewed it, so it is not currently actionable under your review criteria. Although it is a bug fix on a repository you maintain, it comes from a first-time contributor and has not requested your review. Its priority remains low until it is assigned to you or directly requests your attention.
- **Next action:** Wait for the PR to be assigned to a reviewer.

### 5. googleapis/google-cloud-dart#361 → predicted 8, priority 0.20
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I was the last person to respond, raising concerns about the bloated API surface of the discovery-generated code and asking for kevmoo's opinion on alternatives. There is no immediate action for me until kevmoo responds to the architectural tradeoff question.
- **Next action:** Wait for kevmoo to reply to my question regarding discovery vs. convenience extensions.

### 6. dart-lang/sdk#31275 → predicted 3, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** You were informational CC'd by collaborators (parlough and kevmoo) as the owner of the library, but no direct response was required. While this is a real crashing bug in dart:io with a previously prototyped fix, there has been no substantial activity in over two years. Because you were not directly asked to act and the issue is dormant, it remains lower priority until actively scheduled.
- **Next action:** Decide whether to adopt the abandoned CL to fix uncatchable HttpClient exceptions.

### 7. googleapis/google-cloud-dart#381 → predicted 2, priority 0.40
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a detailed bug report in googleapis/google-cloud-dart identifying an issue with retry handling over REST, accompanied by PR #382. You are not assigned or mentioned, so there is no immediate action required on this issue itself, but the associated PR warrants review as part of repository maintenance.
- **Next action:** Wait for maintainer triage or review the linked pull request #382.

### 8. dart-lang/http#1837 → predicted 11, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You were the last person to comment on this issue a year ago, stating that the Dart team is unlikely to take this on. The issue has been labeled 'contributions-welcome' and 'P3', and there is no pending action for you.
- **Next action:** Waiting for community contribution or further interest from the community.

### 9. dart-lang/http#2031 → predicted 6, priority 0.20
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** You are a requested reviewer on this release preparation PR. However, you are explicitly not responsible for `http2`, and this PR sits atop an unmerged stack with pending earlier PRs, making it low priority for you.
- **Next action:** Review the release PR or reassign it given your lack of responsibility for http2.

### 10. dart-lang/http#1365 → predicted 13, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. Indicated that I am not responsible for package:http2.
- **Model:** You have explicitly noted that you are not responsible for http2 issues in dart-lang/http. Additionally, you are not assigned or mentioned, and the issue has seen no direct action required from you.
- **Next action:** None; leave for http2 maintainers to review and triage.

### 11. dart-lang/http#2026 → predicted 12, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** You are not responsible for http2 issues or PRs in this repository. Additionally, you are not assigned or requested for review, and the author explicitly asked @mosuem for a review.
- **Next action:** None (waiting on @mosuem to review).

### 12. dart-lang/native#3653 → predicted 10, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to liamappelbe in a repository outside your primary focus areas. You participated in earlier technical discussions, but the latest consensus among the VM/interop team is that implementing this optimization requires complex VM changes and is likely not worth the effort. There are no pending questions or actions required from you.
- **Next action:** Wait for the assignee (liamappelbe) or VM team to decide whether to pursue native trampoline changes or close the issue.

### 13. dart-lang/http#2033 → predicted 9, priority 0.15
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You already reviewed and approved this pull request two days ago. There have been no new commits, comments, or requests since your review, so no further action is needed on your part.
- **Next action:** Wait for @mosuem to merge the approved pull request.
