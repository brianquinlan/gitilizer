# Gitilizer eval: m-gemini-3.8-flash-t1

strategy `pointwise` · model `gemini-3.8-flash` · thinking `default` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-164429

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.803 ± 0.000 |
| spearman | 0.933 ± 0.000 |
| pairwise_acc | 0.902 ± 0.000 |
| ndcg | 0.994 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.900 ± 0.000 |
| mean_abs_displacement | 2.611 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.705 ± 0.000 | 0.980 ± 0.000 | 0.800 ± 0.000 | 2.100 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Investigate whether Dart on Android honors OS certificate revocations/blocklists in light of the eMudhra CA compromise and respond to the security inquiry. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment regarding CHANGELOG.md preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review this pull request for Sigurd. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR for handling JSON error codes in google_cloud_rpc. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusuf's proposed enum design sketch and reply with feedback so they can proceed with the implementation. |
| 6 | 8.0 (8) | +2.0 | 0.52 | 1/1 | dart-lang/http#2027 | B | Decide on the API design for Client.close and draft a proposal or PR for the next breaking release. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in CupertinoClient as promised. |
| 8 | 10.0 (10) | +2.0 | 0.50 | 1/1 | googleapis/google-cloud-dart#360 | A | Fix mid-stream error handling in _makeStreamingRequest and determine whether to support incremental JSON streaming. |
| 9 | 9.0 (9) | +0.0 | 0.52 | 1/1 | dart-lang/sdk#59846 | B | Investigate fixing header name validation in dart:io or unassign myself. |
| 10 | 12.0 (12) | +2.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to reply to my question about switching to discovery versus adding convenience extensions. |
| 11 | 13.0 (13) | +2.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | Waiting on SDK team or a contributor to pick up and land the abandoned CL. |
| 12 | 17.0 (17) | +5.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Follow up on PR #3763 which addresses this issue. |
| 13 | 11.0 (11) | -2.0 | 0.50 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide whether to handle this via tooling automation or submit PRs bumping the `google_cloud_rpc` dependency in `google_cloud_storage` and `google_cloud_pubsub`. |
| 14 | 15.0 (15) | +1.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Waiting on a member of the dart-ecosystem team to review this automated dependency update. |
| 15 | 16.0 (16) | +1.0 | 0.20 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382, which provides the fix for this issue. |
| 16 | 21.0 (21) | +5.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Waiting for goderbauer to review the PR. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner wiring, RequestOptions, and FormatException handling in google_cloud_rpc. |
| 18 | 24.0 (24) | +6.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 18.0 (18) | -1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Decide whether to rebase and finish this draft PR or close it. |
| 20 | 19.0 (19) | -1.0 | 0.18 | 0/1 | dart-lang/core#1007 | B | Waiting on the author to sign the Google CLA and a team member to review. |
| 21 | 28.0 (28) | +7.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | Waiting on jonasfj to address lrhn's review feedback. |
| 22 | 23.0 (23) | +1.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 22.0 (22) | -1.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 20.0 (20) | -4.0 | 0.12 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for @sigurdm to confirm if the non-PubSub parts look good to merge or for @natebosch to review. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Wait for planning/scheduling of the next major breaking release of package:http. |
| 26 | 14.0 (14) | -12.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | Work on the fix in PR #2034 instead of this issue. |
| 27 | 29.0 (29) | +2.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | None; waiting on the DevTools team or bkonyi to respond to community inquiries. |
| 28 | 25.0 (25) | -3.0 | 0.08 | 0/1 | dart-lang/http#1837 | A | Waiting on a community contribution. |
| 29 | 31.0 (31) | +2.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on @mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue is outside my stated scope. |
| 31 | 27.0 (27) | -4.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the PR. |
| 32 | 30.0 (30) | -2.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on @mosuem to review this http2 PR. |
| 33 | 34.0 (34) | +1.0 | 0.00 | 0/1 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide whether to pursue changes in the VM or close the issue. |
| 34 | 35.0 (35) | +1.0 | 0.00 | 0/1 | dart-lang/http#1972 | B | Waiting for the reporter to provide details and respond to my questions. |
| 35 | 33.0 (33) | -2.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | None; track progress on linked PR #2002 instead. |
| 36 | 32.0 (32) | -4.0 | 0.00 | 0/1 | dart-lang/sdk#38148 | B | None; this issue was previously deprioritized and nothing directed at me has occurred since. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/tools#2715** (truth #31) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **googleapis/google-cloud-dart#373** (truth #24) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue regarding TLS trust and disabled CA certificates on Android that I created and am assigned to. New activity 3 days ago flagged an active intermediate CA key compromise (and a related fix in #64644), requiring my verification of the security impact and a response. Per security guidelines, my own security issues with new activity take top priority (0.9+).
- **Next action:** Investigate whether Dart on Android honors OS certificate revocations/blocklists in light of the eMudhra CA compromise and respond to the security inquiry.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR and your close collaborator kevmoo left an inline review question about edge cases with CHANGELOG.md deletion that requires your response. Unanswered review feedback on your own PR stalls the work and needs prompt attention.
- **Next action:** Reply to kevmoo's review comment regarding CHANGELOG.md preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request by a close collaborator in a repository I am responsible for. As the default reviewer, I am blocking this pre-release polish work from landing, and it has been waiting for review for five days.
- **Next action:** Review this pull request for Sigurd.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** As a maintainer of googleapis/google-cloud-dart, I am the default reviewer for pull requests in this repository. This PR fixes an issue with error code handling over REST and has been waiting without a human review for three days. While it comes from a first-time contributor rather than a close collaborator, it is ready for review and waiting on me.
- **Next action:** Review this PR for handling JSON error codes in google_cloud_rpc.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** You asked the contributor to share a design before writing code, and they posted a concrete API sketch four days ago. In a repository you own, a contributor is currently waiting on your feedback to move forward.
- **Next action:** Review Yusuf's proposed enum design sketch and reply with feedback so they can proceed with the implementation.

### 6. dart-lang/http#2027 → predicted 8, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in dart-lang/http outlining planned architectural improvements to `Client.close`. As your own recently planned work in a repository you own, it represents an active commitment ready for you to drive forward. It sits comfortably in the planned work range (0.5–0.65).
- **Next action:** Decide on the API design for Client.close and draft a proposal or PR for the next breaking release.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned this issue to yourself and commented just a few hours ago that you have started working on it. As active planned work that you recently committed to in a repository you maintain, it belongs in your current working queue.
- **Next action:** Work on implementing the server trust evaluation hook in CupertinoClient as promised.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.50
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in a repository I maintain and was filed by a close collaborator (kevmoo). He answered my question regarding server behavior and noted that while addressing the error handling and streaming behavior isn't urgent, it remains an unresolved gap in google_cloud_rpc.
- **Next action:** Fix mid-stream error handling in _makeStreamingRequest and determine whether to support incremental JSON streaming.

### 9. dart-lang/sdk#59846 → predicted 9, priority 0.52
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am assigned to this bug regarding RFC 9110 compliance and potential HTTP header injection issues in dart:io. However, it has been dormant for nearly two years without recent activity. Since it remains assigned to me, I should either fix it or unassign myself.
- **Next action:** Investigate fixing header name validation in dart:io or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in my repository where I asked a direct design question to my collaborator kevmoo 16 days ago regarding the trade-offs of switching Compute to discovery format. The ball is currently in kevmoo's court to decide on the approach before any work begins.
- **Next action:** Waiting on kevmoo to reply to my question about switching to discovery versus adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a longstanding P2 crash bug in dart:io causing uncatchable exceptions in HttpClient, and collaborator kevmoo CC'd me on it in the past. However, I am only CC'd, have no direct action assigned, and the thread has been dormant for over a year and a half.
- **Next action:** Waiting on SDK team or a contributor to pick up and land the abandoned CL.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** You filed this issue and already opened PR #3763 to implement the fix. Because there is an open PR covering this issue, attention should be directed to the PR instead of the issue itself.
- **Next action:** Follow up on PR #3763 which addresses this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.50
- **Ground truth:** 
- **Model:** This is an issue in a repository you are responsible for, filed by your collaborator sigurdm regarding release prerequirements. You commented 17 days ago that you were deciding how to address this systematically, so the next move remains on you to either automate or implement the pubspec updates.
- **Next action:** Decide whether to handle this via tooling automation or submit PRs bumping the `google_cloud_rpc` dependency in `google_cloud_storage` and `google_cloud_pubsub`.

### 14. dart-lang/tools#2719 → predicted 15, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated bump in dart-lang/tools, a repository I am not directly responsible for. Review was requested from the dart-ecosystem-team rather than me personally, making it a low priority item for my queue.
- **Next action:** Waiting on a member of the dart-ecosystem team to review this automated dependency update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue describes a bug in googleapis/google-cloud-dart, a repository you maintain. However, the author has already submitted PR #382 to fix it, so your review should take place on the PR rather than this issue.
- **Next action:** Review PR #382, which provides the fix for this issue.

### 16. dart-lang/http#2034 → predicted 21, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** I opened this PR and requested review from goderbauer two days ago. Since roughly a week has not passed yet, there is no action needed from me until they respond or follow-up is warranted.
- **Next action:** Waiting for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I maintain, originally filed by a close collaborator. I recently scoped out the requirements and split off unrelated work, so the remaining task is planned work for me to implement.
- **Next action:** Implement the RetryRunner wiring, RequestOptions, and FormatException handling in google_cloud_rpc.

### 18. dart-lang/http#2031 → predicted 24, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem directly requested your review, this PR prepares the 3.2.0 release and is stacked on PRs that have not yet been merged (including #2014, which still needs review). Additionally, package:http2 is outside your stated area of responsibility. Review the lower PRs in the stack first before acting on this release preparation.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft PR adding DNS support in a repository you maintain, but it has been untouched for 45 days and now has merge conflicts. Because it is an uncompleted draft rather than an active blocker, it sits in the lower priority band until you choose to resume work or abandon it.
- **Next action:** Decide whether to rebase and finish this draft PR or close it.

### 20. dart-lang/core#1007 → predicted 19, priority 0.18
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my primary repositories. The review request is directed broadly to the dart-ecosystem-team rather than me personally, and the contributor has not yet signed the CLA.
- **Next action:** Waiting on the author to sign the Google CLA and a team member to review.

### 21. dart-lang/tools#2544 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This security PR is in a repository I do not maintain, and the review request was directed to the dart-ecosystem-team rather than me directly. lrhn is already actively reviewing it, and the PR is currently blocked waiting on the author to address feedback from two months ago.
- **Next action:** Waiting on jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still an open draft and must be reviewed first. In addition, this is in dart-lang/tools (which I do not directly maintain) and was requested via a team review rather than directly to me.
- **Next action:** Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 22, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native. I requested a review from liamappelbe two days ago and there has been no response yet, so there is nothing for me to do until more time has passed.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 20, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR in a repository you maintain. You asked Sigurd 4 days ago if his approval covers the entire PR so Nate doesn't need to review it, and he has not replied yet. Since fewer than 7 days have passed since your ping, this is waiting on someone else.
- **Next action:** Wait for @sigurdm to confirm if the non-PubSub parts look good to merge or for @natebosch to review.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces a breaking API change and has been explicitly labeled 'next-breaking-release'. I previously noted that landing this needs coordination with a semver major release which is not currently underway, placing it in low-priority backlog.
- **Next action:** Wait for planning/scheduling of the next major breaking release of package:http.

### 26. dart-lang/http#1932 → predicted 14, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You have already opened PR #2034 to address this namespace duplication issue. Per the guidelines, when an issue has an open PR addressing it, the PR is the item to act on while the issue itself stays in the low range.
- **Next action:** Work on the fix in PR #2034 instead of this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.02
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, a repository I am not responsible for. I was only CC'd over two years ago for informational purposes regarding HTTP profiling, and no action has been requested of me.
- **Next action:** None; waiting on the DevTools team or bkonyi to respond to community inquiries.

### 28. dart-lang/http#1837 → predicted 25, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded a year ago clarifying that the Dart team will not build this and marked it as a low-priority issue welcoming community contributions. There has been no activity since, so there is nothing for you to do right now.
- **Next action:** Waiting on a community contribution.

### 29. dart-lang/http#2033 → predicted 31, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this PR, and there have been no new commits or comments since. It is ready to be merged by the author.
- **Next action:** Waiting on @mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue pertains to package:http2, which is explicitly noted as outside my area of responsibility in dart-lang/http. Furthermore, I have never participated in this thread and have not been asked to act.
- **Next action:** None; this issue is outside my stated scope.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. While it was authored by a collaborator and requested my team (dart-ecosystem-team), davidmorgan was explicitly requested as an individual reviewer, meaning no action is required from me.
- **Next action:** Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 30, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** You have noted that you are not responsible for http2 in the dart-lang/http repository. The PR author has specifically directed their review request to @mosuem, and you are not assigned or mentioned.
- **Next action:** Waiting on @mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 34, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and driven by liamappelbe. I previously contributed experimental findings, but there is no direct question or action required of me.
- **Next action:** Waiting on liamappelbe to decide whether to pursue changes in the VM or close the issue.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** I asked the reporter for more information and added the 'needs-info' label eight days ago, with no response yet. Additionally, there is a separate open PR (#1974) addressing this issue, so there is nothing to do on this issue itself.
- **Next action:** Waiting for the reporter to provide details and respond to my questions.

### 35. dart-lang/http#1841 → predicted 33, priority 0.00
- **Ground truth:** 
- **Model:** I gave this item a thumbs-down on 2026-10-05, and no new activity directed at me has occurred on the issue since. Furthermore, an open pull request (PR #2002) is actively addressing this feature, so any review action belongs on the PR rather than this issue.
- **Next action:** None; track progress on linked PR #2002 instead.

### 36. dart-lang/sdk#38148 → predicted 32, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I marked this issue as not important to me in August 2026. While another user recently commented offering to help reproduce it and a commit referenced the issue, nothing was directed at me personally (no mentions or review requests), so it remains scored at 0.0.
- **Next action:** None; this issue was previously deprioritized and nothing directed at me has occurred since.
