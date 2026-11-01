# Gitilizer eval: m-gemini-3.8-flash-t2

strategy `pointwise` · model `gemini-3.8-flash` · thinking `default` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-164508

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.781 ± 0.000 |
| spearman | 0.927 ± 0.000 |
| pairwise_acc | 0.890 ± 0.000 |
| ndcg | 0.994 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 2.889 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.850 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 1.000 ± 0.000 |
| B | 20 | 0.747 ± 0.000 | 0.987 ± 0.000 | 0.600 ± 0.000 | 1.900 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.92 | 1/1 | dart-lang/sdk#48056 | A | Investigate whether Dart on Android properly honors certificate revocations/blocklists in light of the recent CA compromise and respond to the security inquiry. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review the PR for Sigurd to unblock the pubsub pre-release polish. |
| 4 | 5.0 (5) | +1.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#382 | A | Review the pull request. |
| 5 | 4.0 (4) | -1.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusuf's proposed enum representation sketch and reply with feedback. |
| 6 | 7.0 (7) | +1.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | Decide on the design for async Client.close and implement or draft the proposed changes. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in CupertinoClient and prepare a PR. |
| 8 | 11.0 (11) | +3.0 | 0.40 | 1/1 | googleapis/google-cloud-dart#360 | A | Decide on the fix for mid-stream error handling and incremental JSON parsing in _makeStreamingRequest. |
| 9 | 10.0 (10) | +1.0 | 0.50 | 1/1 | dart-lang/sdk#59846 | B | Investigate tightening the dart:io HTTP header parser validation, or unassign yourself if you are not working on it. |
| 10 | 12.0 (12) | +2.0 | 0.38 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting on @kevmoo to reply regarding switching to discovery vs. adding convenience extensions. |
| 11 | 19.0 (19) | +8.0 | 0.20 | 0/1 | dart-lang/sdk#31275 | A | None; revive or adopt the abandoned CL if prioritizing dart:io HttpClient fixes. |
| 12 | 17.0 (17) | +5.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Track or progress PR #3763, which implements the fix for this issue. |
| 13 | 9.0 (9) | -4.0 | 0.50 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide whether to bump the dependencies manually in pubspec.yaml or address this via librarian automation. |
| 14 | 13.0 (13) | -1.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Waiting for a member of dart-ecosystem-team to review this automated update. |
| 15 | 14.0 (14) | -1.0 | 0.20 | 0/1 | googleapis/google-cloud-dart#381 | A | Review linked PR #382 instead of acting directly on this issue. |
| 16 | 20.0 (20) | +4.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Waiting for goderbauer to review the PR. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient within google_cloud_rpc. |
| 18 | 25.0 (25) | +7.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 18.0 (18) | -1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Resume work to resolve merge conflicts and prepare the PR for review, or close it if no longer needed. |
| 20 | 15.0 (15) | -5.0 | 0.20 | 0/1 | dart-lang/core#1007 | B | Waiting on the author to sign the CLA and for someone on the dart-ecosystem team to pick up the review. |
| 21 | 27.0 (27) | +6.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | Waiting on @jonasfj to address @lrhn's review comments. |
| 22 | 22.0 (22) | +0.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and landed first. |
| 23 | 21.0 (21) | -2.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 23.0 (23) | -1.0 | 0.10 | 0/1 | googleapis/google-cloud-dart#373 | B | Waiting on @sigurdm to confirm if the PR is good to merge without @natebosch's review. |
| 25 | 24.0 (24) | -1.0 | 0.10 | 0/1 | dart-lang/http#579 | B | Wait for a future breaking release (package:http 2.0) to coordinate and land this breaking API change. |
| 26 | 16.0 (16) | -10.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1932 | B | Progress PR #2034, which is currently open to resolve this namespace duplication bug. |
| 27 | 30.0 (30) | +3.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | None; waiting on the DevTools team and bkonyi to decide on WebSocket profiling support. |
| 28 | 29.0 (29) | +1.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | Waiting for community contribution. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None, as I am not responsible for package:http2. |
| 31 | 26.0 (26) | -5.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on mosuem to review. |
| 33 | 31.0 (31) | -2.0 | 0.02 | 0/1 | dart-lang/native#3653 | A | None. Waiting on liamappelbe to decide on next steps or close the issue. |
| 34 | 28.0 (28) | -6.0 | 0.05 | 0/1 | dart-lang/http#1972 | B | Waiting on reporter to provide reproduction details. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | None; focus on linked PR #2002 instead if reviewing. |
| 36 | 34.0 (34) | -2.0 | 0.00 | 0/1 | dart-lang/sdk#38148 | B | None; no direct action needed unless I am explicitly re-engaged. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/tools#2715** (truth #31) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/core#1007** (truth #20) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **googleapis/google-cloud-dart#345** (truth #19) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/core#1007** (truth #20) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an open security issue regarding TLS trust and certificate handling that I created and am assigned to. A commenter recently raised urgent security questions regarding the October 2026 eMudhra intermediate CA compromise and whether Dart's certificate loading on Android leaves users vulnerable to revoked or disabled certificates. Because security issues assigned to me with new activity take top priority, this requires immediate investigation and clarification.
- **Next action:** Investigate whether Dart on Android properly honors certificate revocations/blocklists in light of the recent CA compromise and respond to the security inquiry.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR and your close collaborator kevmoo left substantive review feedback and an architecture question 21 hours ago that you haven't answered. Unanswered review feedback on your own PRs should not stall and is in the 0.8–0.9 range.
- **Next action:** Reply to kevmoo's review comment on CHANGELOG preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR by my close collaborator Sigurd in a repository I am responsible for. As the default reviewer, it is waiting on me for an initial review (bot reviews do not count), and it has been waiting for five days.
- **Next action:** Review the PR for Sigurd to unblock the pubsub pre-release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** As a maintainer of googleapis/google-cloud-dart, I am the default reviewer for incoming pull requests. This PR fixes an issue where REST errors lose their RPC status code and fail retry logic. It has been waiting for a human review for three days since submission by an outside contributor.
- **Next action:** Review the pull request.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** You asked the contributor to share a design before writing code, and they have posted a concrete API sketch in a repository you maintain. They are currently blocked waiting on your review and feedback to move forward.
- **Next action:** Review Yusuf's proposed enum representation sketch and reply with feedback.

### 6. dart-lang/http#2027 → predicted 7, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I recently filed this issue in a repository I maintain to address undefined behavior and lifecycle semantics for Client.close. As planned work I filed myself that is still relatively fresh, it represents my own commitment to follow up on. It sits squarely in the planned work priority tier.
- **Next action:** Decide on the design for async Client.close and implement or draft the proposed changes.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned this issue to yourself and commented just a few hours ago stating that you have started working on it. In a repository you maintain, issues you have committed to actively working on fall squarely under your planned work.
- **Next action:** Work on implementing the server trust evaluation hook in CupertinoClient and prepare a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.40
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, and was filed by my collaborator kevmoo. Kevmoo replied to my question over two weeks ago, noting that addressing non-SSE buffering is not urgent, though mid-stream error handling remains an open defect. Because the author noted it is not urgent, it ranks below active collaborator requests but remains on my radar to resolve or implement.
- **Next action:** Decide on the fix for mid-stream error handling and incremental JSON parsing in _makeStreamingRequest.

### 9. dart-lang/sdk#59846 → predicted 10, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue regarding invalid characters accepted in HTTP header names, which has potential proxy/smuggling implications. However, there has been no new activity or discussion for nearly two years. As an assigned issue on your backlog, you should either schedule the fix or unassign yourself.
- **Next action:** Investigate tightening the dart:io HTTP header parser validation, or unassign yourself if you are not working on it.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in a repository I maintain, filed by my close collaborator kevmoo. I asked a clarifying question 16 days ago about whether discovery is truly preferred given its large API surface compared to adding convenience extensions to protobuf operations. Nothing is required from me until kevmoo responds.
- **Next action:** Waiting on @kevmoo to reply regarding switching to discovery vs. adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 19, priority 0.20
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** You were CC'd by kevmoo and parlough over two years ago as the owner of dart:io http libraries, but you are not assigned and dart-lang/sdk is not one of your primary repositories. The issue has been dormant for nearly two years since a minor relabeling. While it is an important uncatchable crash in widely used core library code, there is no immediate action waiting on you right now.
- **Next action:** None; revive or adopt the abandoned CL if prioritizing dart:io HttpClient fixes.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** You filed this issue and subsequently opened PR #3763 to address it. Because there is already an active pull request implementing the fix, there is no separate action required on this issue itself.
- **Next action:** Track or progress PR #3763, which implements the fix for this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.50
- **Ground truth:** 
- **Model:** This is an issue filed by close collaborator sigurdm in a repository you maintain, tracking version bumps needed before releases. You commented over two weeks ago noting you were deciding how to handle this, so the ball is in your court to either make the updates or automate the process.
- **Next action:** Decide whether to bump the dependencies manually in pubspec.yaml or address this via librarian automation.

### 14. dart-lang/tools#2719 → predicted 13, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision bump in dart-lang/tools, a repository I am not directly responsible for. The review request is directed to the dart-ecosystem-team rather than to me personally, so it does not require my immediate attention.
- **Next action:** Waiting for a member of dart-ecosystem-team to review this automated update.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue describes a valid bug in google_cloud_rpc in a repository I maintain, but the author has already submitted PR #382 to fix it. Because there is an open PR addressing the issue, work should happen on the PR rather than here. Per guideline, issues covered by an open PR are kept in the low range (0.15–0.35).
- **Next action:** Review linked PR #382 instead of acting directly on this issue.

### 16. dart-lang/http#2034 → predicted 20, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** You authored this PR and requested a review from goderbauer two days ago. Since less than a week has passed, there is no action needed from you until they provide feedback.
- **Next action:** Waiting for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue filed by your close collaborator kevmoo in a repository you maintain, and you assigned it to yourself. You recently scoped the task by breaking out AIP-4222/AIP-155 into another issue, leaving the retry and request options implementation as your planned work.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient within google_cloud_rpc.

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem directly requested my review, this release preparation PR is at the top of a stack that includes PR #2014, which has not yet been reviewed. In addition, I am not typically responsible for package:http2. The lower PRs in the stack need to be addressed before this release PR can be reviewed and landed.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding DNS support in a repository I maintain, but it has been inactive for 45 days and has merge conflicts. It falls in the low-priority range of stale drafts that I should eventually either finish or abandon.
- **Next action:** Resume work to resolve merge conflicts and prepare the PR for review, or close it if no longer needed.

### 20. dart-lang/core#1007 → predicted 15, priority 0.20
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not a repository I am responsible for. The review was requested from the dart-ecosystem-team rather than me personally, and the PR is currently blocked on a CLA signature.
- **Next action:** Waiting on the author to sign the CLA and for someone on the dart-ecosystem team to pick up the review.

### 21. dart-lang/tools#2544 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** Although this addresses a security issue, it is in a repository I am not responsible for and was routed via a team review request. Another reviewer (@lrhn) was explicitly requested and is already actively driving the review, which is currently stalled waiting for updates from the author. Per instructions, team review requests in repos I don't own where someone else is already reviewing are scored near zero.
- **Next action:** Waiting on @jonasfj to address @lrhn's review comments.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on PR #2563, which is still an open draft, so review on this PR is blocked until the underlying PR is resolved. Furthermore, review was requested from the team rather than me directly in a repository I do not own.
- **Next action:** Wait for base PR #2563 to be reviewed and landed first.

### 23. dart-lang/native#3763 → predicted 21, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR in dart-lang/native and you requested a review from liamappelbe two days ago. It has only been a couple of days, so there is nothing to do until the reviewer responds or roughly a week passes without activity.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 23, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in google-cloud-dart. I asked @sigurdm four days ago whether his approval covers the entire PR so we can avoid blocking on @natebosch, and I am waiting for his reply before merging.
- **Next action:** Waiting on @sigurdm to confirm if the PR is good to merge without @natebosch's review.

### 25. dart-lang/http#579 → predicted 24, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking changes to the core client API and has been explicitly labeled `next-breaking-release`. I already clarified that landing this needs to be coordinated with a major version bump when bandwidth permits, so no review or merge action is needed right now.
- **Next action:** Wait for a future breaking release (package:http 2.0) to coordinate and land this breaking API change.

### 26. dart-lang/http#1932 → predicted 16, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is already an open pull request (PR #2034) that fixes this issue. Per guidance, when an issue is covered by an active PR, attention should be focused on the PR rather than the issue itself, keeping this issue in the low priority range.
- **Next action:** Progress PR #2034, which is currently open to resolve this namespace duplication bug.

### 27. flutter/devtools#8223 → predicted 30, priority 0.02
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, a repository I am not responsible for. I was only CC'd over two years ago as an FYI regarding HTTP profiling, with no direct action or question requested of me. Recent activity is unrelated maintenance and questions directed at other maintainers.
- **Next action:** None; waiting on the DevTools team and bkonyi to decide on WebSocket profiling support.

### 28. dart-lang/http#1837 → predicted 29, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded a year ago clarifying that the team will not be implementing this feature and marked it as open to community contributions. There has been no activity since, leaving nothing for you to do right now.
- **Next action:** Waiting for community contribution.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this PR two days ago, and there has been no new activity or commit since. As far as I am concerned this is done, and it is on the author to merge.
- **Next action:** Waiting on mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue concerns package:http2, which is explicitly noted as outside my area of responsibility in dart-lang/http. Furthermore, I have never participated in this thread and have not been asked to act. It requires no attention from me.
- **Next action:** None, as I am not responsible for package:http2.

### 31. dart-lang/tools#2715 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for, and my team was requested alongside an explicit individual reviewer (davidmorgan). Because a specific reviewer is already assigned and I was not directly requested, this does not require my attention.
- **Next action:** Waiting on davidmorgan to review.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This pull request is in package:http2, which is explicitly outside your area of responsibility for dart-lang/http. Additionally, the author has directly asked mosuem for a review, so there is nothing for you to do.
- **Next action:** Waiting on mosuem to review.

### 33. dart-lang/native#3653 → predicted 31, priority 0.02
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to liamappelbe. I participated in technical discussions over a month ago, but no questions or actions are directed at me.
- **Next action:** None. Waiting on liamappelbe to decide on next steps or close the issue.

### 34. dart-lang/http#1972 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** I asked the reporter clarifying questions and marked the issue as needing info 8 days ago, with no response yet. Additionally, there is an open PR (#1974) attempting to fix this, so any necessary action belongs on the PR rather than this issue.
- **Next action:** Waiting on reporter to provide reproduction details.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05 and no new activity directed at you has occurred since. Furthermore, an open PR (#2002) addresses this issue, making the PR rather than the issue the proper place for any review or action.
- **Next action:** None; focus on linked PR #2002 instead if reviewing.

### 36. dart-lang/sdk#38148 → predicted 34, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I marked this issue as not important to me in August 2026. While filiph commented recently offering help with a local reproduction, nothing has been directly addressed to me (@-mentioned or requested of me) since my thumbs-down, so it stays at 0.0.
- **Next action:** None; no direct action needed unless I am explicitly re-engaged.
