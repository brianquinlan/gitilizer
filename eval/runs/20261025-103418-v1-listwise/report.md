# Gitilizer eval: v1-listwise

strategy `listwise` · model `gemini-3.8-flash` · thinking `default` · prompt `/home/claude/gitilizer2/prompts/v1.md` · signals `True` · 3 trial(s) · 13 items · 20261025-103418

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.427 ± 0.030 |
| spearman | 0.603 ± 0.047 |
| pairwise_acc | 0.714 ± 0.015 |
| ndcg | 0.958 ± 0.006 |
| ndcg@5 | 0.926 ± 0.006 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 2.769 ± 0.154 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | next action (last trial) |
|---:|---|---:|---:|---|---|---|
| 1 | 4.3 (4–5) | +3.3 ⚠️ | 0.67 | 3/3 | dart-lang/sdk#48056 | Investigate and answer the security-related inquiry regarding certificate revocation and blocklists on Android. |
| 2 | 1.0 (1) | -1.0 | 0.91 | 3/3 | googleapis/librarian#7808 | Respond to kevmoo's review comment and update the PR logic for CHANGELOG handling. |
| 3 | 2.0 (2) | -1.0 | 0.85 | 3/3 | googleapis/google-cloud-dart#376 | Review and approve sigurdm's PR. |
| 4 | 3.0 (3) | -1.0 | 0.78 | 3/3 | googleapis/google-cloud-dart#382 | Review the PR and verify error mapping behavior against REST and gRPC specs. |
| 5 | 7.3 (6–8) | +2.3 | 0.30 | 0/3 | googleapis/google-cloud-dart#361 | Wait for kevmoo to respond regarding API surface tradeoffs. |
| 6 | 11.3 (11–12) | +5.3 ⚠️ | 0.07 | 0/3 | dart-lang/sdk#31275 | None; backlog bug awaiting VM team investigation. |
| 7 | 7.3 (7–8) | +0.3 | 0.28 | 0/3 | googleapis/google-cloud-dart#381 | Review and merge PR #382 to close this issue. |
| 8 | 11.7 (11–12) | +3.7 ⚠️ | 0.06 | 0/3 | dart-lang/http#1837 | None; awaiting external community contributions. |
| 9 | 4.7 (4–5) | -4.3 ⚠️ | 0.60 | 3/3 | dart-lang/http#2031 | Review the release PR or confirm with mosuem. |
| 10 | 13.0 (13) | +3.0 | 0.02 | 0/3 | dart-lang/http#1365 | None. |
| 11 | 9.3 (9–10) | -1.7 | 0.16 | 0/3 | dart-lang/http#2026 | Wait for mosuem to review this http2 PR. |
| 12 | 9.7 (9–10) | -2.3 | 0.14 | 0/3 | dart-lang/native#3653 | None; wait for liamappelbe to decide whether to pursue changes in the Dart VM. |
| 13 | 6.3 (6–7) | -6.7 ⚠️ | 0.35 | 0/3 | dart-lang/http#2033 | Wait for mosuem to merge the approved PR. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#361** (truth #5) placed below **dart-lang/http#2033** (truth #13) in 2/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/http#2031** (truth #9) in 1/3 trial(s)
- **dart-lang/sdk#31275** (truth #6) placed below **dart-lang/http#2033** (truth #13) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #6) placed below **dart-lang/native#3653** (truth #12) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #7) placed below **dart-lang/http#2033** (truth #13) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #6) placed below **dart-lang/http#2026** (truth #11) in 3/3 trial(s)
- **dart-lang/http#1837** (truth #8) placed below **dart-lang/http#2033** (truth #13) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #5) placed below **dart-lang/http#2031** (truth #9) in 3/3 trial(s)
- **dart-lang/http#1837** (truth #8) placed below **dart-lang/native#3653** (truth #12) in 3/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **googleapis/google-cloud-dart#382** (truth #4) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 5, priority 0.62
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** I am the author and assignee of this issue concerning Android CA certificates in the Dart SDK. A user recently posted asking about the security impact and handling of compromised intermediate CAs on Android, which merits clarification and triage.
- **Next action:** Investigate and answer the security-related inquiry regarding certificate revocation and blocklists on Android.

### 2. googleapis/librarian#7808 → predicted 1, priority 0.90
- **Ground truth:** My PR, review feedback needs addressed.
- **Model:** This is my PR in librarian which fixes an important blocker for tagging releases in google-cloud-dart. Collaborator kevmoo left a review comment 19 hours ago with a specific question on how to handle CHANGELOG.md during bump/clean.
- **Next action:** Respond to kevmoo's review comment and update the PR logic for CHANGELOG handling.

### 3. googleapis/google-cloud-dart#376 → predicted 2, priority 0.85
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in google-cloud-dart by frequent collaborator sigurdm adding client attribution and pre-release polish to the pubsub package. It is awaiting human review before pubsub can be published.
- **Next action:** Review and approve sigurdm's PR.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.78
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an incoming PR in google-cloud-dart fixing a significant bug where JSON error codes are mapped to HTTP status codes instead of google.rpc.Code, breaking retry logic. It requires review to unblock the contributor.
- **Next action:** Review the PR and verify error mapping behavior against REST and gRPC specs.

### 5. googleapis/google-cloud-dart#361 → predicted 8, priority 0.25
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I was the last actor on this issue, responding to kevmoo's proposal with concerns about the enlarged API surface of discovery-based compute. Waiting for collaborator input.
- **Next action:** Wait for kevmoo to respond regarding API surface tradeoffs.

### 6. dart-lang/sdk#31275 → predicted 11, priority 0.08
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a long-standing bug in dart:io with no recent activity in over 20 months. Mentions of me from years ago were informational CCs.
- **Next action:** None; backlog bug awaiting VM team investigation.

### 7. googleapis/google-cloud-dart#381 → predicted 7, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in google-cloud-dart details a bug in google_cloud_rpc error code mapping. Action is already being taken on PR #382, which fixes this issue.
- **Next action:** Review and merge PR #382 to close this issue.

### 8. dart-lang/http#1837 → predicted 12, priority 0.04
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** I was the last respondent on this issue a year ago, stating the Dart team will not implement this feature and labeling it for community contributions.
- **Next action:** None; awaiting external community contributions.

### 9. dart-lang/http#2031 → predicted 4, priority 0.70
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I am explicitly requested for review by mosuem on this PR preparing the release of package:http2 3.2.0. Even though I am generally not responsible for http2, I reviewed the preceding PRs in the stack and a review request on a release PR is actionable.
- **Next action:** Review the release PR or confirm with mosuem.

### 10. dart-lang/http#1365 → predicted 13, priority 0.01
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. Indicated that I am not responsible for package:http2.
- **Model:** This is a dormant issue from 2020 on package:http2, an area I am not responsible for.
- **Next action:** None.

### 11. dart-lang/http#2026 → predicted 9, priority 0.20
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR touches package:http2, which I am not responsible for, and the contributor specifically requested review from mosuem.
- **Next action:** Wait for mosuem to review this http2 PR.

### 12. dart-lang/native#3653 → predicted 10, priority 0.15
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue in dart-lang/native is assigned to liamappelbe. Discussion between liamappelbe and mraleph concluded that the optimization is likely not worth the complex low-level FFI work required.
- **Next action:** None; wait for liamappelbe to decide whether to pursue changes in the Dart VM.

### 13. dart-lang/http#2033 → predicted 6, priority 0.35
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I reviewed and approved this PR 2 days ago. The ball is in the author's court to merge it when ready.
- **Next action:** Wait for mosuem to merge the approved PR.
