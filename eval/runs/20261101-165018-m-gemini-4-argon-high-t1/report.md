# Gitilizer eval: m-gemini-4-argon-high-t1

strategy `pointwise` · model `gemini-4-argon` · thinking `high` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-165018

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.711 ± 0.000 |
| spearman | 0.819 ± 0.000 |
| pairwise_acc | 0.856 ± 0.000 |
| ndcg | 0.979 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.444 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.750 ± 0.000 |
| B | 20 | 0.547 ± 0.000 | 0.920 ± 0.000 | 0.600 ± 0.000 | 3.100 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Respond to the security questions about Android certificate revocation/blocklists and the eMudhra CA compromise, and verify how the fix in #64644 applies here. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Respond to kevmoo's review comment and update the PR so newly created `CHANGELOG.md` files are preserved by `librarian generate`. |
| 3 | 3.0 (3) | +0.0 | 0.76 | 1/1 | googleapis/google-cloud-dart#376 | A | Review this PR from collaborator sigurdm. |
| 4 | 5.0 (5) | +1.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR from a first-time contributor fixing Status.code mapping for JSON RPC errors. |
| 5 | 4.0 (4) | -1.0 | 0.72 | 1/1 | googleapis/google-cloud-dart#252 | B | Review and give feedback on Yusufihsangorgel's proposed design sketch for ProtoEnum so they can proceed with implementation. |
| 6 | 10.0 (10) | +4.0 | 0.58 | 1/1 | dart-lang/http#2027 | B | Decide on the design for `Client.close` (tracking active requests vs. making `close` async) and implement the fix. |
| 7 | 7.0 (7) | +0.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Continue implementing the server trust evaluation hook in CupertinoClient and open a PR. |
| 8 | 12.0 (12) | +4.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | Follow up on kevmoo's reply (including how the merged SSE allowlist in librarian#5533 affects item 1) and implement mid-stream error handling in `_makeStreamingRequest()`. |
| 9 | 9.0 (9) | +0.0 | 0.60 | 1/1 | dart-lang/sdk#59846 | B | Fix the dart:io HTTP header parser to reject invalid RFC 9110 header name characters, or unassign the issue if it belongs to someone else. |
| 10 | 13.0 (13) | +3.0 | 0.42 | 0/1 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to reply to my question about switching to discovery versus adding convenience extensions, or follow up with him. |
| 11 | 14.0 (14) | +3.0 | 0.40 | 1/1 | dart-lang/sdk#31275 | A | Consider reviving the abandoned CL (144346) to fix the uncatchable HttpClient exception in dart:io. |
| 12 | 18.0 (18) | +6.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Act on the linked open PR dart-lang/native#3763 rather than this issue. |
| 13 | 11.0 (11) | -2.0 | 0.58 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on a general approach (such as Librarian automation) or manually update the `google_cloud_rpc` version constraints in `google_cloud_storage` and `google_cloud_pubsub`. |
| 14 | 16.0 (16) | +2.0 | 0.20 | 1/1 | dart-lang/tools#2719 | B | Optionally review this automated BoringSSL revision bump, or leave it for another member of dart-ecosystem-team. |
| 15 | 15.0 (15) | +0.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review the linked pull request #382 that fixes this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for goderbauer to review the PR. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.60 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the ServiceException hardening, RequestOptions, and RetryRunner integration in ServiceClient and the generator templates. |
| 18 | 25.0 (25) | +7.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | Review the unreviewed lower PR in the stack (#2014) before reviewing this release PR. |
| 19 | 19.0 (19) | +0.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Finish this draft PR (resolve merge conflicts and bot feedback) or close it if no longer needed. |
| 20 | 20.0 (20) | +0.0 | 0.18 | 1/1 | dart-lang/core#1007 | B | Optionally review the PR as a member of dart-ecosystem-team once the CLA is signed. |
| 21 | 29.0 (29) | +8.0 | 0.03 | 0/1 | dart-lang/tools#2544 | B | No action needed; lrhn is already reviewing this PR and it is waiting on jonasfj to address the review comments. |
| 22 | 24.0 (24) | +2.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | Wait for the base PR (#2563) to come out of draft and be reviewed first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 21.0 (21) | -3.0 | 0.12 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for @sigurdm or @natebosch to respond about reviewing the non-Pub/Sub parts of the PR, or follow up once a week has passed. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Wait until a future breaking major release of package:http is planned before revisiting this PR. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1932 | B | Follow through on PR #2034, which will close this issue when merged. |
| 27 | 30.0 (30) | +3.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | None; this is a feature request in another team's repository with no action requested from me. |
| 28 | 27.0 (27) | -1.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | None; waiting for a community contributor if someone wants to take this on. |
| 29 | 34.0 (34) | +5.0 | 0.01 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | Nothing for me to do; this issue is for package:http2, which is outside my scope. |
| 31 | 28.0 (28) | -3.0 | 0.03 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review the PR. |
| 32 | 33.0 (33) | +1.0 | 0.01 | 0/1 | dart-lang/http#2026 | A | None; waiting on @mosuem to review this package:http2 PR. |
| 33 | 31.0 (31) | -2.0 | 0.02 | 0/1 | dart-lang/native#3653 | A | None; this issue is owned by liamappelbe in a repository I am not responsible for. |
| 34 | 32.0 (32) | -2.0 | 0.02 | 0/1 | dart-lang/http#1972 | B | Wait for the reporter to reply to my questions with reproduction details. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | None; this issue was marked thumbs-down after the latest activity, and work is tracked on PR #2002. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.62 | 1/1 | dart-lang/sdk#38148 | B | Check the recent commit referencing this issue, reply to filiph's offer to help reproduce it, or unassign yourself if you are no longer owning dart:io issues in the SDK. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a TLS certificate trust security issue that I both authored and am assigned to. A user recently raised urgent questions regarding the October 2026 eMudhra intermediate CA compromise and whether dart:io on Android enforces platform certificate revocation and blocklists. Even though #64644 was recently closed, I need to verify the status and respond to the security inquiry on my issue.
- **Next action:** Respond to the security questions about Android certificate revocation/blocklists and the eMudhra CA compromise, and verify how the fix in #64644 applies here.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own pull request fixing a release tagging issue for `googleapis/google-cloud-dart`, and close collaborator `kevmoo` left an unanswered review comment 21 hours ago identifying a bug where `CHANGELOG.md` will be deleted on the next `librarian generate`. The ball is in my court to answer his question and update the PR so my work can move forward.
- **Next action:** Respond to kevmoo's review comment and update the PR so newly created `CHANGELOG.md` files are preserved by `librarian generate`.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.76
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in googleapis/google-cloud-dart, a repository I am responsible for, authored by close collaborator sigurdm. The earlier PRs in the stack (#292 and #339) have already been merged, and no human has reviewed this PR yet (only a bot commented 5 days ago). As the default reviewer for this repository, it is waiting on my review so the pre-release pubsub polish can land.
- **Next action:** Review this PR from collaborator sigurdm.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I am responsible for, where only a bot has commented so far. As the default reviewer for this repository, it is on me to review it. Because it is from an external contributor rather than a close collaborator, it sits in the lower half of the 0.65-0.8 review range.
- **Next action:** Review this PR from a first-time contributor fixing Status.code mapping for JSON RPC errors.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I filed in a repository I am responsible for (googleapis/google-cloud-dart). I asked the contributor to share a preliminary design before writing code, and they posted a design sketch 4 days ago. I am currently blocking them from moving forward until I confirm the approach.
- **Next action:** Review and give feedback on Yusufihsangorgel's proposed design sketch for ProtoEnum so they can proceed with implementation.

### 6. dart-lang/http#2027 → predicted 10, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I recently filed this issue myself (9 days ago) in a core part of `dart-lang/http` that I am responsible for, and nothing is waiting on anyone else. As fresh planned work in an area I own, it belongs in the 0.5–0.65 range below active reviews and blocking questions.
- **Next action:** Decide on the design for `Client.close` (tracking active requests vs. making `close` async) and implement the fix.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is a feature request in a repository I own (`dart-lang/http`) that I assigned to myself and explicitly stated I started working on 5 hours ago. Because it is active work I committed to doing and is not waiting on anyone else, it sits solidly in the planned-work band, below urgent reviews or security vulnerabilities.
- **Next action:** Continue implementing the server trust evaluation hook in CupertinoClient and open a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an open issue in `googleapis/google-cloud-dart` (a repository I am responsible for) filed by close collaborator `kevmoo`. He answered my question 17 days ago, and I also recently merged `googleapis/librarian#5533` (SSE allowlist), so the ball is in my court to update the issue and fix at least the mid-stream SSE error handling bug. Even though `kevmoo` noted it isn't urgent, an actionable collaborator issue in my repo ranks above items waiting on others.
- **Next action:** Follow up on kevmoo's reply (including how the merged SSE allowlist in librarian#5533 affects item 1) and implement mid-stream error handling in `_makeStreamingRequest()`.

### 9. dart-lang/sdk#59846 → predicted 9, priority 0.60
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned to me with no pending questions or external blockers, so the next step is on me to either implement the fix or unassign myself. Although it has been untouched for 22 months and is not in one of my primary repositories, accepting NUL and control characters in dart:io HTTP header names can cause serious interoperability or proxy issues in widely used code, placing it squarely in the band for assigned work I need to address.
- **Next action:** Fix the dart:io HTTP header parser to reject invalid RFC 9110 header name characters, or unassign the issue if it belongs to someone else.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.42
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in a repository I am responsible for (googleapis/google-cloud-dart) and was filed by a close collaborator (kevmoo). However, I asked a design question 16 days ago about the API surface trade-offs of switching to discovery, and it is currently waiting on his response before we decide how to proceed.
- **Next action:** Wait for kevmoo to reply to my question about switching to discovery versus adding convenience extensions, or follow up with him.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a P2 crash bug (uncatchable exception) in widely used `dart:io` `HttpClient` code, where I was CC'd as library owner and by collaborator `kevmoo`, and a tested fix already exists in an abandoned CL. However, the issue is very old and has had no substantive activity in over two years, placing it in the range for old but important issues where I was CC'd.
- **Next action:** Consider reviving the abandoned CL (144346) to fix the uncatchable HttpClient exception in dart:io.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** I filed and assigned myself this issue 6 days ago, and I already have an open PR (dart-lang/native#3763) that fixes and closes it. Because an open PR covers this issue, any remaining work or follow-up belongs on the PR itself rather than here.
- **Next action:** Act on the linked open PR dart-lang/native#3763 rather than this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.58
- **Ground truth:** 
- **Model:** This issue was filed by a close collaborator (`sigurdm`) in a repository I am responsible for (`googleapis/google-cloud-dart`). I was the last person to comment 17 days ago, stating that I was deciding how to fix this in general, so the ball is in my court and nothing is waiting on anyone else. It sits in the 0.5–0.65 range as planned work on my plate that I should follow through on before the next package releases.
- **Next action:** Decide on a general approach (such as Librarian automation) or manually update the `google_cloud_rpc` version constraints in `google_cloud_storage` and `google_cloud_pubsub`.

### 14. dart-lang/tools#2719 → predicted 16, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated PR in dart-lang/tools, which is not one of the repositories I am responsible for. A review was requested from the dart-ecosystem-team rather than from me personally, making it a low-priority shared team request. Since no one else has reviewed or been assigned to it yet, I could pick it up if I have spare time, so it sits in the 0.15-0.25 range.
- **Next action:** Optionally review this automated BoringSSL revision bump, or leave it for another member of dart-ecosystem-team.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a well-documented bug report in googleapis/google-cloud-dart, a repository I am responsible for. However, the author has already opened PR #382 to fix it, so all action should happen on the PR rather than on this issue. Accordingly, this issue is ranked in the low range well below the PR itself.
- **Next action:** Review the linked pull request #382 that fixes this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR where I requested a review from goderbauer 2 days ago and they have not responded yet. Since less than a week has passed, there is no action for me to take right now other than waiting for the review.
- **Next action:** Wait for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an open issue in my repository filed by a close collaborator (kevmoo) that I assigned to myself and recently scoped down. There is no blocking dependency or open PR covering it, making it my own planned implementation work with a clear next step.
- **Next action:** Implement the ServiceException hardening, RequestOptions, and RetryRunner integration in ServiceClient and the generator templates.

### 18. dart-lang/http#2031 → predicted 25, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although @mosuem requested my review personally, this release-prep PR is at the top of a stack where a lower PR (#2014) has not been reviewed yet. The lower PRs in the stack need to be reviewed and landed first, making this low priority for now.
- **Next action:** Review the unreviewed lower PR in the stack (#2014) before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in `googleapis/google-cloud-dart` that has been untouched for 45 days and now has merge conflicts. Nobody is waiting on it, so it is low priority, but it is on me to either finish it up or close it.
- **Next action:** Finish this draft PR (resolve merge conflicts and bot feedback) or close it if no longer needed.

### 20. dart-lang/core#1007 → predicted 20, priority 0.18
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR in dart-lang/core has a team review request for dart-ecosystem-team with no individual reviewer assigned yet. Because I am not responsible for dart-lang/core and the request is only to my team from an external contributor (who may also still need to sign the CLA), it is low priority for me personally.
- **Next action:** Optionally review the PR as a member of dart-ecosystem-team once the CLA is signed.

### 21. dart-lang/tools#2544 → predicted 29, priority 0.03
- **Ground truth:** 
- **Model:** Although this is a security-related PR, it is in dart-lang/tools (a repository I am not responsible for), I was only included via a team review request to dart-ecosystem-team, and lrhn is already actively reviewing it. Furthermore, the PR is currently waiting on the author (jonasfj) to address lrhn's review feedback.
- **Next action:** No action needed; lrhn is already reviewing this PR and it is waiting on jonasfj to address the review comments.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is in a repository I am not responsible for (dart-lang/tools) with only a team review request to dart-ecosystem-team rather than a personal review request. Additionally, it is stacked on #2563, which is still an unreviewed draft, so the lower PR needs to be completed and reviewed before this one.
- **Next action:** Wait for the base PR (#2563) to come out of draft and be reviewed first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested a review from liamappelbe two days ago. Since no feedback has been left yet and less than a week has passed, it is waiting on the reviewer with no immediate action needed from me.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 21, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR and you pinged @sigurdm 4 days ago to ask if he reviewed the non-Pub/Sub changes so it can be merged without waiting on @natebosch. Since less than a week has passed with no reply, it is currently waiting on your reviewers with nothing for you to do right now.
- **Next action:** Wait for @sigurdm or @natebosch to respond about reviewing the non-Pub/Sub parts of the PR, or follow up once a week has passed.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** Although I am listed as a requested reviewer, this PR introduces a breaking API change and is explicitly labeled `next-breaking-release`. I already commented that landing this requires coordinating a semver major release which I do not have bandwidth for right now, and there has been no substantive activity for over a year.
- **Next action:** Wait until a future breaking major release of package:http is planned before revisiting this PR.

### 26. dart-lang/http#1932 → predicted 17, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an assigned bug in `cronet_http` within a repository I maintain, and users have recently asked for updates. However, I already have an open PR (dart-lang/http#2034, updated 2 days ago) that fixes this issue. Because the PR is the item to act on, there is nothing left to do on the issue itself.
- **Next action:** Follow through on PR #2034, which will close this issue when merged.

### 27. flutter/devtools#8223 → predicted 30, priority 0.02
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, which is not a repository I am responsible for. I was only CC'd for awareness over two years ago, and no questions or actions have been directed at me. The recent update was merely a label change by another team member.
- **Next action:** None; this is a feature request in another team's repository with no action requested from me.

### 28. dart-lang/http#1837 → predicted 27, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a P3 enhancement request in dart-lang/http marked 'contributions-welcome'. I already triaged it 12 months ago explaining that the Dart team does not plan to work on it, and there has been no activity since.
- **Next action:** None; waiting for a community contributor if someone wants to take this on.

### 29. dart-lang/http#2033 → predicted 34, priority 0.01
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already approved this PR 2 days ago and there have been no new commits or comments since then. As mosuem is a member of the repository, they can merge it when ready, leaving nothing for me to do.
- **Next action:** Waiting on mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is labeled 'package:http2' in dart-lang/http, and my notes specify that I am not responsible for http2. Additionally, I have never been involved in or mentioned on this thread, and it has been inactive for 8 months.
- **Next action:** Nothing for me to do; this issue is for package:http2, which is outside my scope.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.03
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not one of the repositories I am responsible for. Although my team (dart-ecosystem-team) is requested for review, davidmorgan is specifically named as an individual reviewer, so this is on him rather than me.
- **Next action:** Waiting on davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 33, priority 0.01
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** Although this PR is in dart-lang/http, it only modifies package:http2, which is explicitly outside my scope ('not responsible for http2'). Furthermore, I have not been mentioned or asked to review it, and the author specifically pinged @mosuem to take a look.
- **Next action:** None; waiting on @mosuem to review this package:http2 PR.

### 33. dart-lang/native#3653 → predicted 31, priority 0.02
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native (not one of my repositories) and is assigned to and driven by liamappelbe. I was only thanked in the original description and shared some past experiment notes over a month ago, with no questions or actions directed at me since. Furthermore, the underlying autorelease pool issue I originally filed (#3652) is already closed.
- **Next action:** None; this issue is owned by liamappelbe in a repository I am not responsible for.

### 34. dart-lang/http#1972 → predicted 32, priority 0.02
- **Ground truth:** 
- **Model:** I asked the reporter for more information 8 days ago and added the 'needs-info' label, and they have not replied yet. In addition, there is an open PR (#1974) linked to this issue, so any current activity would happen there rather than on this issue.
- **Next action:** Wait for the reporter to reply to my questions with reproduction details.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You gave this issue a thumbs-down on 2026-10-05, and no new activity has occurred on the issue since 2026-10-02. Additionally, there is already an open pull request (dart-lang/http#2002) covering this enhancement, so any action would happen on the PR rather than this issue.
- **Next action:** None; this issue was marked thumbs-down after the latest activity, and work is tracked on PR #2002.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.62
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although you previously gave this issue a thumbs-down, there has been significant new activity since then: a contributor (filiph) reported a local reproduction and asked how to help, and a commit referenced the issue four days ago. Because you are still the sole assignee, you should either check the commit and respond to filiph or unassign yourself so the VM team can take over. It ranks slightly below core work in your primary repositories because dart-lang/sdk is outside your current main repos.
- **Next action:** Check the recent commit referencing this issue, reply to filiph's offer to help reproduce it, or unassign yourself if you are no longer owning dart:io issues in the SDK.
