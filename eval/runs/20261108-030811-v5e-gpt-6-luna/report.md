# Gitilizer eval: v5e-gpt-6-luna

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5e.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030811

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.577 ± 0.052 |
| spearman | 0.701 ± 0.059 |
| pairwise_acc | 0.788 ± 0.026 |
| ndcg | 0.967 ± 0.004 |
| ndcg@5 | 0.882 ± 0.000 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.482 ± 0.737 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.744 ± 0.025 | 0.991 ± 0.001 | 0.800 ± 0.000 | 1.583 ± 0.191 |
| B | 20 | 0.330 ± 0.115 | 0.825 ± 0.021 | 0.600 ± 0.000 | 4.667 ± 0.808 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Investigate whether Dart's Android HttpClient honors the eMudhra mitigations and respond with the findings, then track any needed fix. |
| 2 | 2.0 (2) | +0.0 | 0.80 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo’s review comment and update the PR to ensure the generated CHANGELOG.md is preserved on the next generate. |
| 3 | 3.3 (3–4) | +0.3 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm’s Pub/Sub release-polish PR and leave feedback or approve it. |
| 4 | 3.7 (3–4) | -0.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the first-time contributor’s PR #382 in google-cloud-dart. |
| 5 | 7.3 (6–8) | +2.3 | 0.62 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel’s proposed enum representation with a decision or specific design feedback so they can proceed with the implementation. |
| 6 | 9.0 (9) | +3.0 | 0.58 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an async `Client.close` as a breaking change, then update the issue with a concrete proposal or plan. |
| 7 | 7.0 (7) | +0.0 | 0.60 | 3/3 | dart-lang/http#1981 | B | Continue the implementation you said you started, and clarify the proposed API with a skeleton or working change. |
| 8 | 11.7 (11–12) | +3.7 | 0.56 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo with your recommendation on whether to pursue incremental JSON parsing, then decide whether to implement the remaining streaming error handling. |
| 9 | 13.7 (13–14) | +4.7 | 0.54 | 3/3 | dart-lang/sdk#59846 | B | Investigate the `dart:io` header-name parser and determine or implement a fix for accepting invalid characters. |
| 10 | 11.0 (10–12) | +1.0 | 0.57 | 3/3 | googleapis/google-cloud-dart#361 | A | Decide whether to support Compute's LRO helpers by switching to Discovery or by adding convenience extensions, then reply to kevmoo with your direction. |
| 11 | 15.3 (14–16) | +4.3 | 0.26 | 0/3 | dart-lang/sdk#31275 | A | No immediate action; the Dart SDK team should take over the abandoned fix, and you can revisit if someone asks you directly. |
| 12 | 17.0 (15–19) | +5.0 | 0.21 | 0/3 | dart-lang/native#3752 | B | Continue work on PR #3763; this issue is covered by that open PR. |
| 13 | 20.7 (13–26) | +7.7 | 0.27 | 1/3 | googleapis/google-cloud-dart#366 | B | Decide whether to handle dependency-version updates manually or through librarian automation, then update the package constraints and changelogs once the required google_cloud_rpc version is published. |
| 14 | 19.0 (17–20) | +5.0 | 0.18 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team review; this is a shared team request, not a personal request to you. |
| 15 | 16.0 (15–17) | +1.0 | 0.22 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382; this issue is covered by that open PR. |
| 16 | 26.0 (25–27) | +10.0 ⚠️ | 0.10 | 1/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 8.0 (6–10) | -9.0 ⚠️ | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the remaining ServiceClient retry/RequestOptions and non-JSON error handling changes, or update the issue with a concrete plan if you are not taking it on. |
| 18 | 28.7 (28–29) | +10.7 ⚠️ | 0.08 | 0/3 | dart-lang/http#2031 | A | Wait for the lower stacked PR #2014 to be reviewed before reviewing this release PR. |
| 19 | 9.0 (6–11) | -10.0 ⚠️ | 0.60 | 3/3 | googleapis/google-cloud-dart#345 | A | Address the outstanding review comments and merge conflicts, then update the draft PR. |
| 20 | 27.0 (22–30) | +7.0 | 0.09 | 0/3 | dart-lang/core#1007 | B | Wait for the contributor to sign the CLA; the team review request is not addressed to you personally. |
| 21 | 22.3 (21–24) | +1.3 | 0.14 | 0/3 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn’s review feedback; this is only a shared team review request, not a request to you personally. |
| 22 | 21.3 (18–24) | -0.7 | 0.15 | 0/3 | dart-lang/tools#2710 | B | Wait for the unreviewed base PR #2563 to be reviewed before reviewing this stacked PR. |
| 23 | 27.0 (26–28) | +4.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there is still no response after about a week. |
| 24 | 22.0 (15–28) | -2.0 | 0.19 | 1/3 | googleapis/google-cloud-dart#373 | B | Wait for Nate or Sigurd to review and respond to your question; follow up if there is no response after about a week. |
| 25 | 31.3 (31–32) | +6.3 | 0.08 | 0/3 | dart-lang/http#579 | B | Wait for the breaking-release plan to unblock this PR; no immediate review action is yours. |
| 26 | 18.7 (18–19) | -7.3 | 0.19 | 0/3 | dart-lang/http#1932 | B | Work on PR #2034, which covers this issue; no separate action is needed on the issue. |
| 27 | 25.3 (21–30) | -1.7 | 0.12 | 0/3 | flutter/devtools#8223 | B | Wait for the DevTools team or reporter to identify a concrete next step; no action has been requested from you. |
| 28 | 34.0 (33–35) | +6.0 | 0.03 | 0/3 | dart-lang/http#1837 | A | Wait for a community contributor to take up the WinHTTP implementation; no follow-up is needed from you. |
| 29 | 35.7 (35–36) | +6.7 | 0.02 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or maintainer to merge it; you already approved it. |
| 30 | 34.7 (34–36) | +4.7 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action for you now; the issue is outside your stated http2 scope, and the reporter should confirm whether it can be closed. |
| 31 | 19.7 (18–21) | -11.3 ⚠️ | 0.17 | 0/3 | dart-lang/tools#2715 | B | Wait for the specifically requested reviewer, davidmorgan, to review the PR. |
| 32 | 28.3 (23–35) | -3.7 | 0.08 | 0/3 | dart-lang/http#2026 | A | Wait for the requested review from mosuem; this http2 PR is outside your stated scope. |
| 33 | 29.7 (25–33) | -3.3 | 0.08 | 0/3 | dart-lang/native#3653 | A | No action is needed; the issue is assigned to liamappelbe and the implementation path remains unresolved. |
| 34 | 32.3 (32–33) | -1.7 | 0.04 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested client details and reproduction; then reassess the issue and your open PR. |
| 35 | 22.3 (13–30) | -12.7 ⚠️ | 0.25 | 1/3 | dart-lang/http#1841 | B | Wait for PR #2002 to be reviewed or merged; no issue-level action is needed now. |
| 36 | 5.0 (5) | -31.0 ⚠️ | 0.71 | 3/3 | dart-lang/sdk#38148 | B | Investigate the reproducible failure reported on October 1 and reply to filiph with a way to help or a concrete debugging plan. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.94
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security concern in the SDK area you own, and new activity three days ago specifically raises potential exposure to compromised CA intermediates; security issues you own with new activity score at the top regardless of age or P3 label. The latest reply points to a related issue, but does not establish that this concern is resolved, so you should verify the behavior rather than leave the issue's security status unknown.
- **Next action:** Investigate whether Dart's Android HttpClient honors the eMudhra mitigations and respond with the findings, then track any needed fix.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.84
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR, and kevmoo raised an unanswered review question 21 hours ago that identifies a likely regression and asks how to address it. Your response or code change is the immediate next step, so the PR is blocking the collaborator’s review; its recent activity keeps it near the top of the scale.
- **Next action:** Reply to kevmoo’s review comment and update the PR to ensure the generated CHANGELOG.md is preserved on the next generate.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from a usual collaborator in google-cloud-dart, a repository you are responsible for, so you are the default reviewer and the next step is yours. It was opened five days ago, placing it near the upper end of the review-priority range; the bot’s review does not count as a human review.
- **Next action:** Review sigurdm’s Pub/Sub release-polish PR and leave feedback or approve it.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open, unreviewed PR in a repository you are responsible for, so you are the default reviewer; the bot review does not count. It is recent (3 days old), and the fix addresses incorrect REST error-code handling that prevents ABORTED errors from being retried. The author is a first-time contributor, so it ranks below a collaborator’s PR but still deserves timely review.
- **Next action:** Review the first-time contributor’s PR #382 in google-cloud-dart.

### 5. googleapis/google-cloud-dart#252 → predicted 8, priority 0.62
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is a recently active issue you filed in a repository you work in, and the contributor is waiting on your guidance about the design, making the next step yours. Your last reply was 10 days ago and the proposal arrived 4 days ago, so it is fresh planned work, but it is below urgent blocking work because the issue is P2 and the proposed implementation is still being discussed.
- **Next action:** Reply to Yusufihsangorgel’s proposed enum representation with a decision or specific design feedback so they can proceed with the implementation.

### 6. dart-lang/http#2027 → predicted 9, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is your own issue in a repository you work in, filed within the last two weeks, so it qualifies as fresh planned work even without replies. There is no blocker or open PR; the next step is yours. Its recent age and potentially broad API impact warrant a moderate priority, but it is not an urgent security or blocking issue.
- **Next action:** Decide whether to pursue an async `Client.close` as a breaking change, then update the issue with a concrete proposal or plan.

### 7. dart-lang/http#1981 → predicted 7, priority 0.62
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned the issue to yourself and said five hours ago that you had started working on it, so this is your active planned work in a repository you work in. The recent update makes it fresh, but it is not a direct blocker or a security report, so it belongs in the planned-work range rather than the higher review or security ranges.
- **Next action:** Continue the implementation you said you started, and clarify the proposed API with a skeleton or working change.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.58
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is in a repository you own, filed by a close collaborator, and has a clear decision and implementation path. kevmoo answered your question 17 days ago, so the next step is yours; the reply explicitly says it is not urgent, and the activity is now more than a week old, keeping this below urgent reviews or blocking work.
- **Next action:** Reply to kevmoo with your recommendation on whether to pursue incremental JSON parsing, then decide whether to implement the remaining streaming error handling.

### 9. dart-lang/sdk#59846 → predicted 14, priority 0.53
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue, and no other owner or blocking condition is indicated, so there is a concrete next step for you. The reported RFC violation could affect interoperability with proxies, but the issue has had no activity for about 22 months, which lowers its priority within the actionable range.
- **Next action:** Investigate the `dart:io` header-name parser and determine or implement a fix for accepting invalid characters.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.57
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator's issue in a repository you own, and your latest comment raises a design choice that needs your decision; kevmoo is waiting on your response. The discussion is 16 days old, so it is less urgent than a fresh blocker, but the decision is still actionable and directly affects your project. The issue's proposed implementation is not yet agreed, so clarify the preferred approach before taking on implementation work.
- **Next action:** Decide whether to support Compute's LRO helpers by switching to Discovery or by adding convenience extensions, then reply to kevmoo with your direction.

### 11. dart-lang/sdk#31275 → predicted 16, priority 0.22
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** You were only informally CC'd on this old issue, and there has been no activity directed at you since 2024; the latest issue activity is also 20 months old. It is in dart-lang/sdk, which is outside your stated repositories, and no one has asked you to take ownership or act. The collaborator’s interest makes it worth keeping above unrelated dormant mentions, but it is not actionable for you now.
- **Next action:** No immediate action; the Dart SDK team should take over the abandoned fix, and you can revisit if someone asks you directly.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** You filed and assigned this issue less than a week ago, so it would otherwise be fresh planned work. However, open PR #3763 already addresses it, making the PR—not the issue—the item to act on; the issue itself should stay low priority. There is no separate security concern.
- **Next action:** Continue work on PR #3763; this issue is covered by that open PR.

### 13. googleapis/google-cloud-dart#366 → predicted 13, priority 0.56
- **Ground truth:** 
- **Model:** This is in a repository you are responsible for, was filed by a close collaborator, and has a clear maintenance action. Your last comment raised an unresolved approach question 17 days ago, so the issue remains yours to advance, though it is no longer fresh enough for the top of the planned-work range. The related PRs are merged, but the required published version is still a prerequisite for making the dependency updates.
- **Next action:** Decide whether to handle dependency-version updates manually or through librarian automation, then update the package constraints and changelogs once the required google_cloud_rpc version is published.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.17
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository you have not identified as one you own, and the review was requested to a team you belong to rather than to you personally. No human has reviewed it yet, but the team request means it is waiting on someone else. It is fresh, so it remains visible within the low-priority range for team review requests outside your repositories.
- **Next action:** Wait for the dart-ecosystem-team review; this is a shared team request, not a personal request to you.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.22
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The linked open PR directly addresses the reported bug, so the PR—not this issue—is the actionable item. The issue is recent and describes a meaningful retry correctness problem, but its next step is governed by the PR; keep it below the PR in the low duplicate range.
- **Next action:** Review PR #382; this issue is covered by that open PR.

### 16. dart-lang/http#2034 → predicted 25, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR, and you requested review from a specific reviewer just two days ago, so the next step is theirs rather than yours. It is recent, but that only places it near the top of the low-priority range for PRs awaiting a reviewer you recently asked.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 10, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is assigned to you in a repository you own, with a clear implementation step and no indication that work is blocked; your recent comment narrowed the scope rather than handing it off. Your activity 10 days ago makes it fresh planned work, though the issue itself is not a high-impact security or urgent production incident.
- **Next action:** Implement the remaining ServiceClient retry/RequestOptions and non-JSON error handling changes, or update the issue with a concrete plan if you are not taking it on.

### 18. dart-lang/http#2031 → predicted 28, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were personally requested to review this PR in a repository you follow, you noted that you are not responsible for the http2 area. More importantly, this PR is stacked on #2014, which has not been reviewed yet, so the lower PR must be addressed first; the recent request does not make this actionable now.
- **Next action:** Wait for the lower stacked PR #2014 to be reviewed before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 6, priority 0.66
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your PR in a repository you own, and the bot review left unresolved feedback that you have not addressed. The PR is stale, so freshness lowers its urgency, but your work is the next step and the substantial generated DNS support makes it worth resuming.
- **Next action:** Address the outstanding review comments and merge conflicts, then update the draft PR.

### 20. dart-lang/core#1007 → predicted 29, priority 0.08
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is outside the repositories you are responsible for, and the review request is to a team you belong to rather than to you individually. The CLA check is also blocking review, so there is no useful review action for you now.
- **Next action:** Wait for the contributor to sign the CLA; the team review request is not addressed to you personally.

### 21. dart-lang/tools#2544 → predicted 24, priority 0.12
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is outside the repositories you’re responsible for, and the review request went to the dart-ecosystem-team rather than to you individually. The author has not responded to lrhn’s latest review comments from two months ago, so there is no useful action for you right now. The UNC-path vulnerability makes the change important, but security urgency does not make this team request yours to act on.
- **Next action:** Wait for jonasfj to address lrhn’s review feedback; this is only a shared team review request, not a request to you personally.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.15
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still open and in draft, so the base needs attention first. Although the author is a close collaborator and the PR is recent, the review request is to the shared dart-ecosystem-team rather than personally to you, and you are not responsible for dart-lang/tools. The bot review and the author's replies do not make this your next step.
- **Next action:** Wait for the unreviewed base PR #2563 to be reviewed before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 26, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, and you requested a specific reviewer two days ago, so the next step is currently theirs. The review request is recent, placing it near the bottom of the range for PRs awaiting a reviewer; reassess and ping after roughly a week of silence.
- **Next action:** Wait for liamappelbe to review; follow up if there is still no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 23, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** You requested review from Nate and asked Sigurd whether the non-Pub/Sub changes looked good, most recently four days ago, so the next step is currently with them. Although this is your PR in a repository you own, your recent review request/comment means you should wait rather than act now. Reassess after roughly a week of silence and ping the reviewers if needed.
- **Next action:** Wait for Nate or Sigurd to review and respond to your question; follow up if there is no response after about a week.

### 25. dart-lang/http#579 → predicted 31, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The `next-breaking-release` label blocks this change, and you previously said it must be coordinated with a major release; that remains the gating issue. The reviewer request and your last discussion are over a year old, and the recent question from another commenter does not change the release blocker. The PR is also stacked below open PRs, so it is not ready to advance independently.
- **Next action:** Wait for the breaking-release plan to unblock this PR; no immediate review action is yours.

### 26. dart-lang/http#1932 → predicted 19, priority 0.18
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** The open PR #2034, authored by you, directly fixes this issue, so the PR is the item to act on rather than the duplicate issue. The latest comment asking for an update does not change that; the issue itself is assigned to you but is covered by the PR. Recent activity keeps it visible, but it should rank well below the PR.
- **Next action:** Work on PR #2034, which covers this issue; no separate action is needed on the issue.

### 27. flutter/devtools#8223 → predicted 21, priority 0.17
- **Ground truth:** 
- **Model:** You were only CC'd on an informational comment from 2024, and the recent activity merely removed a label; it does not create new work for you. This is a feature request in a repository you have not identified as responsible for, with no direct request or assignment. Keep it low despite the recent update.
- **Next action:** Wait for the DevTools team or reporter to identify a concrete next step; no action has been requested from you.

### 28. dart-lang/http#1837 → predicted 35, priority 0.02
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already explained that this is unlikely to be Dart-team work and pointed to a community implementation path. The issue is marked contributions-welcome, has no new activity since your comment, and is a low-priority enhancement in a repository you are not responsible for.
- **Next action:** Wait for a community contributor to take up the WinHTTP implementation; no follow-up is needed from you.

### 29. dart-lang/http#2033 → predicted 36, priority 0.01
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You approved this collaborator’s PR two days ago, and there has been no activity since. There are no unresolved review threads, so there is nothing left for you to do unless new activity arrives.
- **Next action:** Wait for the PR author or maintainer to merge it; you already approved it.

### 30. dart-lang/http#1365 → predicted 34, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** You explicitly noted that you are not responsible for http2, and nobody has asked you to act. The latest comment asks the reporter to confirm the root cause; it does not create work for you. The thread is also stale, and the reported performance problem was later attributed to an adapter implementation rather than the http2 package.
- **Next action:** No action for you now; the issue is outside your stated http2 scope, and the reporter should confirm whether it can be closed.

### 31. dart-lang/tools#2715 → predicted 18, priority 0.18
- **Ground truth:** 
- **Model:** This is a recent PR from your usual collaborator, but the repository is outside your stated responsibility and your only request is through the shared dart-ecosystem-team. A specific reviewer, davidmorgan, was also requested, so this is not a personal review request; the bot review does not change that. The PR is only two days old and there is no action for you to take now.
- **Next action:** Wait for the specifically requested reviewer, davidmorgan, to review the PR.

### 32. dart-lang/http#2026 → predicted 27, priority 0.08
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** You noted that you are not responsible for http2, and the contributor specifically asked mosuem to review the PR. No review was requested from you personally, and there is no other action for you to take. The recent update does not change that.
- **Next action:** Wait for the requested review from mosuem; this http2 PR is outside your stated scope.

### 33. dart-lang/native#3653 → predicted 33, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This is in dart-lang/native, outside your stated responsibility, and is assigned to its author. Your comments are old, with no new request for you to act. The latest discussion is a design decision for the maintainer, and the related PR has already merged.
- **Next action:** No action is needed; the issue is assigned to liamappelbe and the implementation path remains unresolved.

### 34. dart-lang/http#1972 → predicted 32, priority 0.05
- **Ground truth:** 
- **Model:** The issue is labeled needs-info, and you already asked the reporter for details; there has been no reply. Although you are assigned, the next step depends on the reporter. An open PR also covers the issue, so the issue itself should remain low priority.
- **Next action:** Wait for the reporter to provide the requested client details and reproduction; then reassess the issue and your open PR.

### 35. dart-lang/http#1841 → predicted 30, priority 0.08
- **Ground truth:** 
- **Model:** The issue is explicitly deferred to a future breaking release, and an open PR now covers it. The recent mention and commits predate your October 5 thumbs-down, so they do not make it newly actionable for you; the PR is the item to track instead.
- **Next action:** Wait for PR #2002 to be reviewed or merged; no issue-level action is needed now.

### 36. dart-lang/sdk#38148 → predicted 5, priority 0.72
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this P2 issue in the Dart SDK, and the latest report provides new, reproducible evidence and asks how to help, so the next step is yours. The report is recent and the bug affects filesystem deletion in widely used SDK code, placing it in the range for assigned issues needing verification or action. The August thumbs-down predates this significant new report, so it does not suppress the priority.
- **Next action:** Investigate the reproducible failure reported on October 1 and reply to filiph with a way to help or a concrete debugging plan.
