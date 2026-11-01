# Gitilizer eval: m-gemini-3.8-flash-high-t2

strategy `pointwise` · model `gemini-3.8-flash` · thinking `high` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-165018

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.825 ± 0.000 |
| spearman | 0.945 ± 0.000 |
| pairwise_acc | 0.913 ± 0.000 |
| ndcg | 0.995 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.900 ± 0.000 |
| mean_abs_displacement | 2.333 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.750 ± 0.000 |
| B | 20 | 0.726 ± 0.000 | 0.982 ± 0.000 | 0.800 ± 0.000 | 1.900 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 1/1 | dart-lang/sdk#48056 | A | Evaluate the security question regarding compromised CA keys and Android certificate revocation, and decide if this issue can be closed or requires further fixes. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment regarding CHANGELOG preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.76 | 1/1 | googleapis/google-cloud-dart#376 | A | Review the PR for sigurdm. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR on google_cloud_rpc error handling. |
| 5 | 5.0 (5) | +0.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's proposed enum design sketch and confirm whether they should proceed with implementation. |
| 6 | 8.0 (8) | +2.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | Draft a proposal or PR to update `Client.close` semantics and explore making it asynchronous. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Implement the server trust evaluation hook for CupertinoClient as planned. |
| 8 | 10.0 (10) | +2.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#360 | A | Decide on the approach for mid-stream error handling and JSON streaming, and implement the fix in google_cloud_rpc. |
| 9 | 9.0 (9) | +0.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | Investigate and fix the dart:io HTTP header name validation, or unassign myself. |
| 10 | 12.0 (12) | +2.0 | 0.38 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting on @kevmoo to reply to my question regarding switching to discovery versus adding convenience extensions. |
| 11 | 13.0 (13) | +2.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | Waiting on SDK maintainers to revive the abandoned CL or assign an owner to fix the issue. |
| 12 | 17.0 (17) | +5.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Focus on the fixing PR (#3763) instead of this issue. |
| 13 | 11.0 (11) | -2.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#366 | B | Update the google_cloud_rpc dependency constraint in the storage and pubsub packages, or decide on an automated release workflow. |
| 14 | 14.0 (14) | +0.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Waiting on another member of dart-ecosystem-team or a tools maintainer to review. |
| 15 | 15.0 (15) | +0.0 | 0.20 | 0/1 | googleapis/google-cloud-dart#381 | A | Review the fix submitted in PR #382. |
| 16 | 20.0 (20) | +4.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Waiting for goderbauer to review the PR. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.58 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient and handle non-JSON error responses. |
| 18 | 22.0 (22) | +4.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | Waiting for lower PRs in the stack (specifically #2014) to be reviewed first. |
| 19 | 18.0 (18) | -1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Resolve merge conflicts and finish the PR to request review, or close it if abandoned. |
| 20 | 19.0 (19) | -1.0 | 0.18 | 0/1 | dart-lang/core#1007 | B | Wait for the author to sign the CLA and for a dart-ecosystem team member to review. |
| 21 | 28.0 (28) | +7.0 | 0.03 | 0/1 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn's review feedback. |
| 22 | 24.0 (24) | +2.0 | 0.08 | 0/1 | dart-lang/tools#2710 | B | Wait for the base PR #2563 to be reviewed and landed before reviewing this stacked PR. |
| 23 | 21.0 (21) | -2.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Waiting for liamappelbe to review the pull request. |
| 24 | 23.0 (23) | -1.0 | 0.10 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for @sigurdm to confirm if the PR is safe to merge without waiting for @natebosch. |
| 25 | 25.0 (25) | +0.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Wait for planning and coordination of a future major breaking release (package:http 2.0). |
| 26 | 16.0 (16) | -10.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1932 | B | Follow up on and land PR #2034 to resolve this issue. |
| 27 | 29.0 (29) | +2.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | None; nothing is required of me on this Flutter DevTools feature request. |
| 28 | 26.0 (26) | -2.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | Waiting for a community contribution or PR implementing WinHTTP support. |
| 29 | 32.0 (32) | +3.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue concerns package:http2 which is outside my area of responsibility. |
| 31 | 27.0 (27) | -4.0 | 0.03 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review. |
| 32 | 31.0 (31) | -1.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | None; waiting for @mosuem to review this PR. |
| 33 | 30.0 (30) | -3.0 | 0.02 | 0/1 | dart-lang/native#3653 | A | None for me; waiting on liamappelbe to decide whether to pursue or close this issue. |
| 34 | 35.0 (35) | +1.0 | 0.00 | 0/1 | dart-lang/http#1972 | B | Waiting on @Keetz to reply to my clarifying questions. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | None; focus on PR #2002 instead if reviewing the implementation. |
| 36 | 33.0 (33) | -3.0 | 0.00 | 0/1 | dart-lang/sdk#38148 | B | No action needed; this issue was marked as not important to me and no subsequent activity has been directed at me. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/tools#2715** (truth #31) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **googleapis/google-cloud-dart#345** (truth #19) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/http#1837** (truth #28) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue involving TLS trust and disabled/revoked CA certificates on Android that I created and am assigned to. Recent activity flagged a major intermediate CA compromise and linked to a related fix landing in dart:io (#64644). As an open security issue with new activity and potential vulnerability exposure, reviewing and confirming the resolution status is top priority.
- **Next action:** Evaluate the security question regarding compromised CA keys and Android certificate revocation, and decide if this issue can be closed or requires further fixes.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own pull request, which fixes an issue in googleapis/google-cloud-dart. My collaborator kevmoo left a substantive review question 21 hours ago about handling CHANGELOG.md preservation during generation. I need to answer his question and update the implementation to avoid stalling my own work.
- **Next action:** Reply to kevmoo's review comment regarding CHANGELOG preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.76
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This PR is in googleapis/google-cloud-dart, a repository you are responsible for, and was filed 5 days ago by a close collaborator (sigurdm). Since no human has reviewed it yet, you are the default reviewer and this is waiting on you.
- **Next action:** Review the PR for sigurdm.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** As the maintainer of googleapis/google-cloud-dart, I am the default reviewer for incoming PRs, and this PR from an outside contributor has not yet received a human review. It addresses a real retry issue with REST RPC errors and is ready for review.
- **Next action:** Review this PR on google_cloud_rpc error handling.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** In a repository you maintain, an outside contributor responded to your request to share a design proposal before writing code. They are currently waiting on your feedback on their proposed enum representation to move forward. Replying keeps an active contributor unblocked.
- **Next action:** Review Yusufihsangorgel's proposed enum design sketch and confirm whether they should proceed with implementation.

### 6. dart-lang/http#2027 → predicted 8, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in a repository you maintain to explore tightening `Client.close` semantics for an upcoming release. Because this represents your own planned work and is not waiting on anyone else, it is on you to drive forward.
- **Next action:** Draft a proposal or PR to update `Client.close` semantics and explore making it asynchronous.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned yourself to this issue and announced just five hours ago that you have started working on it. As an active commitment in a repository you own, this represents your current planned work.
- **Next action:** Implement the server trust evaluation hook for CupertinoClient as planned.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in google-cloud-dart, a repository I am responsible for, filed by my close collaborator kevmoo. Kevmoo answered my question about JSON buffering, leaving the ball in my court to address the mid-stream error swallowing and streaming logic. Even though kevmoo noted it is not urgent, collaborator issues in my own repositories with a clear next step rate above items waiting on others.
- **Next action:** Decide on the approach for mid-stream error handling and JSON streaming, and implement the fix in google_cloud_rpc.

### 9. dart-lang/sdk#59846 → predicted 9, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am assigned to this issue regarding invalid character handling in dart:io's HTTP header parser. Although it has been dormant for nearly two years without new activity, accepting control characters like NUL can cause proxy desynchronization issues. As an assigned task on my plate, I need to either address the bug or unassign myself.
- **Next action:** Investigate and fix the dart:io HTTP header name validation, or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in a repository I maintain, opened by a close collaborator (kevmoo). I left the last comment 16 days ago raising concerns about API size and asking whether convenience extensions might be preferable to switching formats. Because the ball is currently in kevmoo's court to discuss the design direction, it is not immediately actionable for me.
- **Next action:** Waiting on @kevmoo to reply to my question regarding switching to discovery versus adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a longstanding P2 bug in dart:io HttpClient causing uncatchable exceptions that can crash production servers. Although close collaborator kevmoo encountered it and CC'd you, you were only informational CC'd over two years ago and dart-lang/sdk is not one of your directly maintained repositories. With the issue dormant for 20 months and the original Gerrit CL abandoned, there is no immediate action required from you right now.
- **Next action:** Waiting on SDK maintainers to revive the abandoned CL or assign an owner to fix the issue.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** I filed this issue and already opened PR #3763 to implement the fix. Because there is an open PR actively addressing this bug, there is nothing further to do on the issue itself.
- **Next action:** Focus on the fixing PR (#3763) instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.52
- **Ground truth:** 
- **Model:** This issue was filed by a close collaborator in a repository I am responsible for, outlining explicit tasks before upcoming releases. I commented over two weeks ago considering automated tooling but have not followed up, leaving the concrete work on my plate.
- **Next action:** Update the google_cloud_rpc dependency constraint in the storage and pubsub packages, or decide on an automated release workflow.

### 14. dart-lang/tools#2719 → predicted 14, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision bump in dart-lang/tools, which is not a repository I am responsible for. The review request is directed to the dart-ecosystem-team rather than me personally, making it low priority for my personal attention.
- **Next action:** Waiting on another member of dart-ecosystem-team or a tools maintainer to review.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue reports a bug with error code handling in google_cloud_rpc, but the author has already submitted PR #382 to fix it. Because there is an open PR addressing the problem, action should be taken there rather than on the issue itself. Consequently, this issue is deprioritized into the 0.15–0.35 range.
- **Next action:** Review the fix submitted in PR #382.

### 16. dart-lang/http#2034 → predicted 20, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my PR in dart-lang/http and I requested a review from goderbauer two days ago. Because less than a week has passed, no follow-up is needed yet and the PR is waiting on the reviewer.
- **Next action:** Waiting for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an assigned issue in a repository I own, filed by a close collaborator (kevmoo). Having scoped out the requirements and examined cross-language examples, the next step is for me to implement the feature and open a PR.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient and handle non-JSON error responses.

### 18. dart-lang/http#2031 → predicted 22, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem explicitly requested your review on this release preparation PR, it is stacked on other PRs that are not yet reviewed (such as #2014). Stacked PRs should wait until the underlying changes are reviewed and landed. Additionally, this is in the http2 package, which is outside your primary area of responsibility.
- **Next action:** Waiting for lower PRs in the stack (specifically #2014) to be reviewed first.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding DNS support in googleapis/google-cloud-dart, but it has been untouched for 45 days and now has merge conflicts. It is not blocking anyone else and no reviewers are waiting on it. I need to decide whether to revive and finish it or close it.
- **Next action:** Resolve merge conflicts and finish the PR to request review, or close it if abandoned.

### 20. dart-lang/core#1007 → predicted 19, priority 0.18
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request to dart-ecosystem-team on a repository I am not responsible for (dart-lang/core). Additionally, the contributor has not yet signed the Google CLA. There is no direct action required from me right now.
- **Next action:** Wait for the author to sign the CLA and for a dart-ecosystem team member to review.

### 21. dart-lang/tools#2544 → predicted 28, priority 0.03
- **Ground truth:** 
- **Model:** This is a security-related PR in dart-lang/tools, a repository I am not responsible for. Although my team was requested, lrhn is specifically assigned and actively reviewing it. The PR is currently waiting on the author (jonasfj) to address lrhn's detailed review feedback from two months ago, so there is nothing for me to do.
- **Next action:** Wait for jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on PR #2563, which is still an unreviewed draft PR. Furthermore, this is in dart-lang/tools (which I do not maintain) and I was only requested via team review for dart-ecosystem-team rather than directly. The base PR needs to be reviewed and landed first before this one is ready for review.
- **Next action:** Wait for the base PR #2563 to be reviewed and landed before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 21, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your pull request, and you requested a review from liamappelbe two days ago. Since only a couple of days have passed, there is no need to ping yet. It is currently waiting on their review.
- **Next action:** Waiting for liamappelbe to review the pull request.

### 24. googleapis/google-cloud-dart#373 → predicted 23, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in google-cloud-dart, which is already approved by Sigurd for the PubSub changes. Four days ago I asked Sigurd if his review covered the rest of the PR so we don't have to wait on Nate Bosch. Since fewer than seven days have passed without a response, no ping or action is needed from me right now.
- **Next action:** Wait for @sigurdm to confirm if the PR is safe to merge without waiting for @natebosch.

### 25. dart-lang/http#579 → predicted 25, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This pull request introduces breaking API changes to add send progress callbacks and is explicitly labeled 'next-breaking-release'. I previously confirmed that landing this is deferred until a coordinated semver major release, which is not currently planned. Because the PR is intentionally shelved waiting for a future breaking release, no immediate review or action is required.
- **Next action:** Wait for planning and coordination of a future major breaking release (package:http 2.0).

### 26. dart-lang/http#1932 → predicted 16, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by open PR #2034, which I recently created to fix the Cronet namespace duplication. Because an active PR already exists to address the problem, work should be tracked there rather than on this issue.
- **Next action:** Follow up on and land PR #2034 to resolve this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.02
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, a repository I am not responsible for. I was only CC'd over two years ago for informational context regarding HTTP profiling, with no direct questions or actions asked of me. The DevTools team and external contributors are driving this discussion.
- **Next action:** None; nothing is required of me on this Flutter DevTools feature request.

### 28. dart-lang/http#1837 → predicted 26, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old feature request triaged as P3 with 'contributions-welcome', where you noted that the team is unlikely to take it on. There has been no new activity in a year, and nothing is currently waiting on you.
- **Next action:** Waiting for a community contribution or PR implementing WinHTTP support.

### 29. dart-lang/http#2033 → predicted 32, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I reviewed and approved this PR two days ago, and there have been no new commits or comments since. As far as I am concerned this is done, and it is now waiting on mosuem to merge it.
- **Next action:** Waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 within the dart-lang/http repository. Furthermore, I have never been assigned or @mentioned on this thread. Therefore, it requires no attention from me.
- **Next action:** None; this issue concerns package:http2 which is outside my area of responsibility.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.03
- **Ground truth:** 
- **Model:** This PR in dart-lang/tools is not in a repository I maintain, and my only tie is via a team review request. Because an individual reviewer (davidmorgan) is specifically requested, it does not need my attention.
- **Next action:** Waiting on davidmorgan to review.

### 32. dart-lang/http#2026 → predicted 31, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This pull request exclusively touches `package:http2`, which is explicitly outside my stated scope of responsibility for `dart-lang/http`. The author has also specifically asked @mosuem to review it, so there is no action needed from me.
- **Next action:** None; waiting for @mosuem to review this PR.

### 33. dart-lang/native#3653 → predicted 30, priority 0.02
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, which is not a repository I am responsible for. It is assigned to liamappelbe, who noted in the last comment over a month ago that the optimization likely isn't worth pursuing. No one has asked me for input or action, so there is nothing for me to do.
- **Next action:** None for me; waiting on liamappelbe to decide whether to pursue or close this issue.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** I asked the reporter for clarification and added the 'needs-info' label eight days ago, with no response yet. Additionally, an open PR (#1974) already exists to address this issue, which is where any review activity should happen. There is nothing for me to do on this issue until the reporter responds.
- **Next action:** Waiting on @Keetz to reply to my clarifying questions.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05, and nothing new has happened on it since. Additionally, there is an open PR (#2002) addressing this request, meaning any required review or discussion belongs on the PR rather than this issue.
- **Next action:** None; focus on PR #2002 instead if reviewing the implementation.

### 36. dart-lang/sdk#38148 → predicted 33, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I marked this issue with a thumbs-down on 2026-08-01, indicating it is not important to me. While filiph commented reporting a local reproduction and copybara referenced a commit, neither event was directed at me and I was not @mentioned. Because dart-lang/sdk is outside my core repositories and nothing requiring my attention has occurred since my thumbs-down, this scores 0.0.
- **Next action:** No action needed; this issue was marked as not important to me and no subsequent activity has been directed at me.
