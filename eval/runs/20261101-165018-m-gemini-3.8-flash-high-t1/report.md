# Gitilizer eval: m-gemini-3.8-flash-high-t1

strategy `pointwise` · model `gemini-3.8-flash` · thinking `high` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-165018

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.806 ± 0.000 |
| spearman | 0.935 ± 0.000 |
| pairwise_acc | 0.903 ± 0.000 |
| ndcg | 0.994 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 2.556 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.750 ± 0.000 |
| B | 20 | 0.726 ± 0.000 | 0.979 ± 0.000 | 0.600 ± 0.000 | 1.900 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.92 | 1/1 | dart-lang/sdk#48056 | A | Investigate the inquiry regarding the eMudhra compromise and determine if Android certificate revocation/blocklists are honored or if this issue can be closed. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR for Pub/Sub pre-release polish. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR on handling google.rpc.Code in JSON errors. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's design proposal for enum representation and reply with feedback. |
| 6 | 11.0 (11) | +5.0 | 0.50 | 1/1 | dart-lang/http#2027 | B | Decide on the API design for `Client.close` and draft a proposal or PR for the next breaking release. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Implement the server trust evaluation hook in CupertinoClient and submit a PR. |
| 8 | 8.0 (8) | +0.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | Implement or plan the fix for mid-stream error handling and incremental JSON parsing in ServiceClient._makeStreamingRequest. |
| 9 | 10.0 (10) | +1.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | Investigate and fix the header parser validation or unassign myself from the issue. |
| 10 | 12.0 (12) | +2.0 | 0.38 | 0/1 | googleapis/google-cloud-dart#361 | A | Wait for @kevmoo to reply regarding discovery vs convenience extensions, or ping him to follow up. |
| 11 | 13.0 (13) | +2.0 | 0.37 | 0/1 | dart-lang/sdk#31275 | A | Waiting for Dart SDK maintainers to adopt and land the abandoned Gerrit CL. |
| 12 | 17.0 (17) | +5.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Work on the fix in PR #3763 instead. |
| 13 | 9.0 (9) | -4.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on the automation approach or manually bump the `google_cloud_rpc` dependency in `google_cloud_storage` and `google_cloud_pubsub`. |
| 14 | 15.0 (15) | +1.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Wait for another dart-ecosystem-team member or tools maintainer to review this PR. |
| 15 | 14.0 (14) | -1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead, which provides the fix for this issue. |
| 16 | 20.0 (20) | +4.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for goderbauer to review the PR. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.60 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient and harden ServiceException against HTML error responses. |
| 18 | 23.0 (23) | +5.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | Wait for earlier PRs in the stack, such as #2014, to be reviewed and landed first. |
| 19 | 18.0 (18) | -1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Decide whether to resolve merge conflicts and finish this draft PR or close it. |
| 20 | 19.0 (19) | -1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Wait for the contributor to sign the CLA and for someone on dart-ecosystem-team to review. |
| 21 | 29.0 (29) | +8.0 | 0.03 | 0/1 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn's review feedback. |
| 22 | 22.0 (22) | +0.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and completed first. |
| 23 | 21.0 (21) | -2.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the pull request. |
| 24 | 24.0 (24) | +0.0 | 0.10 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for @sigurdm to confirm if the PR is good to merge or if @natebosch still needs to review. |
| 25 | 25.0 (25) | +0.0 | 0.10 | 0/1 | dart-lang/http#579 | B | Wait for planning of the next major breaking release of package:http. |
| 26 | 16.0 (16) | -10.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1932 | B | Follow up on open PR #2034, which addresses this namespace duplication issue. |
| 27 | 30.0 (30) | +3.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | None; wait for the DevTools team to prioritize or drive WebSocket profiling support. |
| 28 | 26.0 (26) | -2.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | Nothing to do; waiting for community contributions. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue is outside my stated scope. |
| 31 | 27.0 (27) | -4.0 | 0.04 | 0/1 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the pull request. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on mosuem to review the PR. |
| 33 | 28.0 (28) | -5.0 | 0.03 | 0/1 | dart-lang/native#3653 | A | None for me; waiting on liamappelbe or the native team to decide whether to pursue this or close the issue. |
| 34 | 31.0 (31) | -3.0 | 0.02 | 0/1 | dart-lang/http#1972 | B | Waiting on reporter to provide reproduction details. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | Nothing to do on this issue; follow up on PR #2002 instead. |
| 36 | 34.0 (34) | -2.0 | 0.00 | 0/1 | dart-lang/sdk#38148 | B | None, as I previously marked this issue as not important and nothing directed at me has happened since. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/native#3653** (truth #33) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/tools#2715** (truth #31) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#366** (truth #13) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue regarding TLS trust and disabled Root CAs on Android that you authored and are assigned to. Recent activity brings up an active security incident (the eMudhra intermediate CA compromise) and asks whether Android certificate revocation and blocklists are respected by Dart, linking to a recent related fix in #64644. Security issues in your purview with new activity take top priority (0.9+) regardless of age or priority labels, requiring your verification.
- **Next action:** Investigate the inquiry regarding the eMudhra compromise and determine if Android certificate revocation/blocklists are honored or if this issue can be closed.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my PR, which fixes a publishing and tagging issue in google-cloud-dart, and kevmoo has left review feedback with a concrete question on how to handle CHANGELOG preservation. I need to answer his question and update the implementation so review and landing can proceed without stalling my own work.
- **Next action:** Reply to kevmoo's review comment on CHANGELOG preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** As a maintainer of googleapis/google-cloud-dart, I am the default reviewer for PRs in this repository. This PR was opened five days ago by my close collaborator sigurdm and has only received automated bot comments so far. Reviewing collaborator PRs in my own repositories is a high priority so their work does not stall.
- **Next action:** Review sigurdm's PR for Pub/Sub pre-release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** As the maintainer for googleapis/google-cloud-dart, I am the default reviewer for PRs in this repository. This pull request fixes error status parsing so retryable errors like ABORTED work correctly over REST, and only a bot has commented so far. Because the author is an outside contributor rather than a close collaborator, it sits in the middle of the review queue.
- **Next action:** Review this PR on handling google.rpc.Code in JSON errors.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This issue is in a repository you are responsible for, and you specifically asked the contributor to share a preliminary design before writing code. They shared their design proposal four days ago and are now blocked waiting on your feedback to move forward with implementation.
- **Next action:** Review Yusufihsangorgel's design proposal for enum representation and reply with feedback.

### 6. dart-lang/http#2027 → predicted 11, priority 0.50
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I recently filed this issue in a repository I maintain to explore tightening `Client.close` semantics, possibly for a 2.0 release. It represents my own planned work and is not waiting on anyone else. As it is still relatively fresh, it sits in my planned work backlog.
- **Next action:** Decide on the API design for `Client.close` and draft a proposal or PR for the next breaking release.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned this feature request to yourself and commented 5 hours ago that you have started working on it. Because this represents an active personal commitment and planned work in a repository you maintain, it should stay visible on your plate while fresh.
- **Next action:** Implement the server trust evaluation hook in CupertinoClient and submit a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 8, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in a repository I am responsible for and was filed by a close collaborator (kevmoo). Kevmoo answered my question regarding server behavior and clarified the gap, leaving the ball in my court. Even though kevmoo noted it is not urgent, collaborator issues with clear next steps in my own repositories rank as planned work.
- **Next action:** Implement or plan the fix for mid-stream error handling and incremental JSON parsing in ServiceClient._makeStreamingRequest.

### 9. dart-lang/sdk#59846 → predicted 10, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am assigned to this bug regarding invalid character parsing in HTTP headers in dart:io. Because I am assigned, it is on me to either investigate and implement a fix or unassign myself so the Dart team knows it is unowned. Given that there has been no activity on this issue for nearly two years, it falls into the backlog of assigned issues to resolve or triage rather than urgent work.
- **Next action:** Investigate and fix the header parser validation or unassign myself from the issue.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue in a repository I maintain was opened by a close collaborator (@kevmoo). I responded 16 days ago with questions about the trade-offs of discovery's larger API surface versus proto convenience extensions, so we are currently waiting on his feedback.
- **Next action:** Wait for @kevmoo to reply regarding discovery vs convenience extensions, or ping him to follow up.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.37
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a serious bug in dart:io's HttpClient that causes uncatchable exceptions and production crashes, and collaborator kevmoo CC'd you because he was hitting it. However, it is in dart-lang/sdk rather than your primary repositories, and you were only CC'd over two years ago with no direct commitment or assignment. As an old but important issue where you were merely CC'd, it deserves a moderate-low score on your radar.
- **Next action:** Waiting for Dart SDK maintainers to adopt and land the abandoned Gerrit CL.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** I opened PR #3763 to fix this bug, so progress is actively tracked and handled on that pull request. Per the guidelines, issues with an open PR addressing them require no action on the issue itself. Its priority is kept low while the PR is in flight.
- **Next action:** Work on the fix in PR #3763 instead.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.55
- **Ground truth:** 
- **Model:** This issue is in a repository I maintain, filed by a close collaborator (sigurdm), with clear tasks required before new package releases can be published. I left a comment saying I was deciding how to resolve this, so the next action is on me to follow through.
- **Next action:** Decide on the automation approach or manually bump the `google_cloud_rpc` dependency in `google_cloud_storage` and `google_cloud_pubsub`.

### 14. dart-lang/tools#2719 → predicted 15, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision bump in dart-lang/tools, a repository I am not responsible for. The review request is addressed to the dart-ecosystem-team rather than me personally. Because no specific individual has been assigned yet, it sits in the team backlog at low priority for me.
- **Next action:** Wait for another dart-ecosystem-team member or tools maintainer to review this PR.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in googleapis/google-cloud-dart details a retry bug caused by incorrect status code mapping, but the author has already submitted PR #382 to fix it. Because there is an open PR covering the bug, the PR is the actual item to act on rather than this issue. Following guidelines for duplicate issues with open PRs, this is kept in the 0.15–0.35 range.
- **Next action:** Review PR #382 instead, which provides the fix for this issue.

### 16. dart-lang/http#2034 → predicted 20, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** I opened this PR two days ago to resolve an issue in cronet_http and requested a review from goderbauer. Since the review request is recent and less than a week old, there is nothing for me to do yet.
- **Next action:** Wait for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue filed by a close collaborator (kevmoo) in a repository I am responsible for. I assigned it to myself and recently scoped the remaining requirements down, making the implementation my planned work to carry forward.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient and harden ServiceException against HTML error responses.

### 18. dart-lang/http#2031 → predicted 23, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem requested my review, this PR is stacked on top of lower PRs that are still unreviewed (such as #2014). Additionally, this is in package:http2, an area I am not normally responsible for. The earlier PRs in the chain need to be reviewed and merged before this release preparation PR can be acted on.
- **Next action:** Wait for earlier PRs in the stack, such as #2014, to be reviewed and landed first.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding DNS support to google-cloud-dart, but it has been untouched for 45 days and has become dirty with merge conflicts. No one else is waiting on it, but it remains on my plate to either finish or abandon. Per the guidelines, stale drafts fall into the 0.15–0.35 range.
- **Next action:** Decide whether to resolve merge conflicts and finish this draft PR or close it.

### 20. dart-lang/core#1007 → predicted 19, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request to dart-ecosystem-team in a repository I am not directly responsible for (dart-lang/core). Furthermore, the author has not signed the CLA yet, so there is nothing for me to do.
- **Next action:** Wait for the contributor to sign the CLA and for someone on dart-ecosystem-team to review.

### 21. dart-lang/tools#2544 → predicted 29, priority 0.03
- **Ground truth:** 
- **Model:** Although this PR addresses a security issue (UNC path injection), it is in a repository I am not responsible for (dart-lang/tools). My only connection is through a team review request to dart-ecosystem-team, and lrhn was explicitly requested and is already actively reviewing it. The PR is currently stalled waiting on the author to respond to lrhn's comments.
- **Next action:** Wait for jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft and has not yet been reviewed. Stacked PRs should not be reviewed until the underlying PRs are ready. Furthermore, this is in dart-lang/tools (which I do not directly maintain) and the review request is to the dart-ecosystem team rather than to me personally.
- **Next action:** Wait for base PR #2563 to be reviewed and completed first.

### 23. dart-lang/native#3763 → predicted 21, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** You authored this PR in dart-lang/native and requested a review from liamappelbe two days ago. It has not been long enough to justify a follow-up ping, so it is currently waiting on the reviewer.
- **Next action:** Wait for liamappelbe to review the pull request.

### 24. googleapis/google-cloud-dart#373 → predicted 24, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in google-cloud-dart, which has already received an approval on the Pub/Sub portion. Four days ago I asked @sigurdm whether the entire PR is good to merge to save @natebosch time. Because fewer than seven days have passed since my ping, it is waiting on his response before any follow-up is needed.
- **Next action:** Wait for @sigurdm to confirm if the PR is good to merge or if @natebosch still needs to review.

### 25. dart-lang/http#579 → predicted 25, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This pull request introduces breaking changes to the Client API and is explicitly labeled 'next-breaking-release'. I previously confirmed that landing this needs to wait until a major semver release is coordinated. Per instructions, PRs deferred for a future breaking release are low priority and require no immediate action.
- **Next action:** Wait for planning of the next major breaking release of package:http.

### 26. dart-lang/http#1932 → predicted 16, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by an open PR (#2034) that I recently updated. Following the instructions, when an issue has an active PR addressing it, the PR is the focus of work and the issue itself drops into the 0.15–0.35 range.
- **Next action:** Follow up on open PR #2034, which addresses this namespace duplication issue.

### 27. flutter/devtools#8223 → predicted 30, priority 0.02
- **Ground truth:** 
- **Model:** You were only informational-CC'd on this feature request over two years ago in a repository you do not maintain. There is no question or request directed at you, so no action is required.
- **Next action:** None; wait for the DevTools team to prioritize or drive WebSocket profiling support.

### 28. dart-lang/http#1837 → predicted 26, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** I responded a year ago clarifying that the Dart team will not take this on and left it open for community contributions with a P3 label. There has been no subsequent activity and nothing is waiting on me.
- **Next action:** Nothing to do; waiting for community contributions.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I reviewed and approved this PR two days ago, and there has been no new activity since. There is nothing left for me to do here; it is ready for mosuem to merge.
- **Next action:** Waiting on mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue pertains specifically to package:http2, which is an area in dart-lang/http that I am explicitly not responsible for. I have never been involved in this thread and have not been asked to act. Consequently, it requires no attention from me.
- **Next action:** None; this issue is outside my stated scope.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.04
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. Although it is authored by my collaborator kevmoo and requested my team (dart-ecosystem-team), davidmorgan is specifically named as an individual reviewer. Therefore, no action is needed from me.
- **Next action:** Wait for davidmorgan to review the pull request.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I am not responsible for the http2 package in dart-lang/http. Additionally, the author specifically requested a review from mosuem, so this does not require my attention.
- **Next action:** Waiting on mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 28, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and driven by liamappelbe. Although I previously shared technical context in the thread, there is no pending question or action directed at me. It has been dormant for over a month and remains in the native team's hands.
- **Next action:** None for me; waiting on liamappelbe or the native team to decide whether to pursue this or close the issue.

### 34. dart-lang/http#1972 → predicted 31, priority 0.02
- **Ground truth:** 
- **Model:** I asked the reporter for clarifying details and applied the 'needs-info' label eight days ago, and they have not replied yet. Furthermore, an open PR (#1974) exists to address this issue, making this issue inactive for me. With 'needs-info' pending and nothing to do here, priority is near zero.
- **Next action:** Waiting on reporter to provide reproduction details.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** I marked this issue with a thumbs-down on October 5, 2026, and nothing has happened on it since. Furthermore, an open pull request (PR #2002) exists to implement the feature, so any necessary action belongs on the PR rather than this issue.
- **Next action:** Nothing to do on this issue; follow up on PR #2002 instead.

### 36. dart-lang/sdk#38148 → predicted 34, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I marked this issue as not important on 2026-08-01. Although there has been subsequent activity, including filiph reporting reproduction and a bot commit reference, neither was directed at me personally and dart-lang/sdk is outside my core responsibilities. Per the thumbs-down guidance, because nothing significant directed at me has occurred since, it receives a score of 0.0.
- **Next action:** None, as I previously marked this issue as not important and nothing directed at me has happened since.
