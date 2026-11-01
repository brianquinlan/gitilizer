# Gitilizer eval: v1-full

strategy `pointwise` · model `gemini-3.8-flash` · thinking `default` · prompt `prompts/v1.md` · signals `True` · 3 trial(s) · 13 items · 20261025-105328

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.462 ± 0.117 |
| spearman | 0.678 ± 0.102 |
| pairwise_acc | 0.731 ± 0.059 |
| ndcg | 0.950 ± 0.016 |
| ndcg@5 | 0.865 ± 0.074 |
| top3_overlap | 0.444 ± 0.192 |
| top5_overlap | 0.600 ± 0.200 |
| mean_abs_displacement | 2.615 ± 0.407 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | next action (last trial) |
|---:|---|---:|---:|---|---|---|
| 1 | 6.0 (5–8) | +5.0 ⚠️ | 0.25 | 0/3 | dart-lang/sdk#48056 | None required; the recent inquiry about compromised intermediate CAs was addressed by another contributor linking to issue #64644. |
| 2 | 1.0 (1) | -1.0 | 0.84 | 3/3 | googleapis/librarian#7808 | Respond to kevmoo's review comment regarding handling of CHANGELOG.md deletion during clean/generate. |
| 3 | 4.7 (2–6) | +1.7 | 0.42 | 1/3 | googleapis/google-cloud-dart#376 | Wait for sigurdm to request a review or assign you to the pull request. |
| 4 | 2.3 (2–3) | -1.7 | 0.65 | 3/3 | googleapis/google-cloud-dart#382 | Review this pull request or assign a reviewer. |
| 5 | 6.7 (6–7) | +1.7 | 0.26 | 0/3 | googleapis/google-cloud-dart#361 | Wait for kevmoo to respond regarding whether to switch to discovery or add convenience extensions. |
| 6 | 7.0 (5–8) | +1.0 | 0.28 | 0/3 | dart-lang/sdk#31275 | Decide whether to adopt and revive the abandoned CL 144346 to resolve unhandled HTTP client exceptions. |
| 7 | 3.7 (3–4) | -3.3 ⚠️ | 0.37 | 0/3 | googleapis/google-cloud-dart#381 | Review the linked pull request #382 fixing this bug. |
| 8 | 11.3 (11–12) | +3.3 ⚠️ | 0.05 | 0/3 | dart-lang/http#1837 | Wait for a community member to contribute a WinHTTP implementation or provide updates. |
| 9 | 4.7 (3–7) | -4.3 ⚠️ | 0.35 | 3/3 | dart-lang/http#2031 | Review the release PR once earlier PRs in the stack are resolved. |
| 10 | 13.0 (13) | +3.0 | 0.00 | 0/3 | dart-lang/http#1365 | No action needed; you are not responsible for package:http2. |
| 11 | 11.7 (11–12) | +0.7 | 0.02 | 0/3 | dart-lang/http#2026 | Wait for @mosuem to review the pull request. |
| 12 | 10.0 (10) | -2.0 | 0.07 | 0/3 | dart-lang/native#3653 | None needed; waiting on liamappelbe to decide whether to close the issue or pursue alternative approaches. |
| 13 | 9.0 (9) | -4.0 ⚠️ | 0.15 | 0/3 | dart-lang/http#2033 | Waiting for mosuem to merge the pull request. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/http#2031** (truth #9) in 2/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **googleapis/google-cloud-dart#381** (truth #7) in 3/3 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/http#2031** (truth #9) in 2/3 trial(s)
- **dart-lang/http#1837** (truth #8) placed below **dart-lang/http#2033** (truth #13) in 3/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/sdk#31275** (truth #6) in 1/3 trial(s)
- **dart-lang/http#1837** (truth #8) placed below **dart-lang/native#3653** (truth #12) in 3/3 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **googleapis/google-cloud-dart#381** (truth #7) in 2/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #5) placed below **dart-lang/http#2031** (truth #9) in 2/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **googleapis/google-cloud-dart#361** (truth #5) in 1/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **googleapis/google-cloud-dart#382** (truth #4) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 8, priority 0.20
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an older P3 Dart SDK issue assigned to you regarding Android SecurityContext handling of disabled system certs. While there was recent activity concerning a CA compromise, another issue (#64644) handled that specific incident and you were not directly mentioned or requested to act.
- **Next action:** None required; the recent inquiry about compromised intermediate CAs was addressed by another contributor linking to issue #64644.

### 2. googleapis/librarian#7808 → predicted 1, priority 0.82
- **Ground truth:** My PR, review feedback needs addressed.
- **Model:** You authored this PR to resolve an issue affecting google-cloud-dart releases. Your collaborator kevmoo reviewed it and raised an important question regarding how CHANGELOG.md preservation should be handled. The PR is blocked pending your response and any corresponding code updates.
- **Next action:** Respond to kevmoo's review comment regarding handling of CHANGELOG.md deletion during clean/generate.

### 3. googleapis/google-cloud-dart#376 → predicted 6, priority 0.30
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** You are not assigned or requested as a reviewer on this PR, making it currently non-actionable per your review workflow. It is relevant and important as it contains pre-release polish for Pub/Sub by your collaborator sigurdm in a repository you maintain. However, until a review is requested or you are assigned, it remains a lower priority.
- **Next action:** Wait for sigurdm to request a review or assign you to the pull request.

### 4. googleapis/google-cloud-dart#382 → predicted 2, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an incoming community pull request on a repository you maintain (googleapis/google-cloud-dart), fixing an error code mapping bug that prevents REST retries. It has been open for three days with clean tests and no assigned reviewer, so it needs your review.
- **Next action:** Review this pull request or assign a reviewer.

### 5. googleapis/google-cloud-dart#361 → predicted 7, priority 0.25
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** You were the last person to comment, raising valid concerns about the enlarged API surface when generating from discovery format versus adding convenience extensions. The ball is in kevmoo's court to respond to your question before any further action can be taken.
- **Next action:** Wait for kevmoo to respond regarding whether to switch to discovery or add convenience extensions.

### 6. dart-lang/sdk#31275 → predicted 5, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** You were CC'd as the owner of the library by parlough and your collaborator kevmoo, who noted hitting this bug. However, both mentions were informational CCs over two years ago with no recent activity or explicit blocking questions. The issue is dormant, but remains a valid P2 bug with an abandoned fix available if you choose to prioritize it.
- **Next action:** Decide whether to adopt and revive the abandoned CL 144346 to resolve unhandled HTTP client exceptions.

### 7. googleapis/google-cloud-dart#381 → predicted 3, priority 0.45
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a detailed and legitimate bug report in google_cloud_rpc where ABORTED errors fail to be retried over REST. However, the author already opened PR #382 to fix it, so review and discussion should be focused on that PR rather than this issue directly.
- **Next action:** Review the linked pull request #382 fixing this bug.

### 8. dart-lang/http#1837 → predicted 11, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You were the last person to comment, clarifying that the Dart team is unlikely to implement this feature and marking it as a P3 with contributions welcome. The issue has been dormant for a year without any response or follow-up, so no action is required from you.
- **Next action:** Wait for a community member to contribute a WinHTTP implementation or provide updates.

### 9. dart-lang/http#2031 → predicted 4, priority 0.35
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Your collaborator mosuem has requested your review on this release PR for package:http2. However, you are not responsible for http2, and this PR sits atop a stack with unmerged dependencies (#2014 is still awaiting review), keeping its priority modest.
- **Next action:** Review the release PR once earlier PRs in the stack are resolved.

### 10. dart-lang/http#1365 → predicted 13, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. Indicated that I am not responsible for package:http2.
- **Model:** You have explicitly noted that you are not responsible for http2 issues in dart-lang/http. Additionally, you are not assigned or mentioned, and there has been no direct request for your input.
- **Next action:** No action needed; you are not responsible for package:http2.

### 11. dart-lang/http#2026 → predicted 12, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This pull request specifically targets `package:http2`, for which you are explicitly not responsible. Furthermore, the author addressed and pinged @mosuem directly for review, so there is no action needed from you.
- **Next action:** Wait for @mosuem to review the pull request.

### 12. dart-lang/native#3653 → predicted 10, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** You were previously involved in the discussion, but the issue is assigned to liamappelbe in dart-lang/native, which is not one of your primary repositories. The technical discussion concluded over a month ago with doubts about whether pursuing this optimization is worth the effort, and there is no pending request or question for you.
- **Next action:** None needed; waiting on liamappelbe to decide whether to close the issue or pursue alternative approaches.

### 13. dart-lang/http#2033 → predicted 9, priority 0.15
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this pull request from mosuem. No new commits or comments have been added since my review, so no further action is needed on my end. Waiting for the author to merge.
- **Next action:** Waiting for mosuem to merge the pull request.
