# Gitilizer eval: m-gemini-3.7-flash-high-t3

strategy `pointwise` · model `gemini-3.7-flash` · thinking `high` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-165313

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.806 ± 0.000 |
| spearman | 0.933 ± 0.000 |
| pairwise_acc | 0.903 ± 0.000 |
| ndcg | 0.994 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 2.667 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.750 ± 0.000 |
| B | 20 | 0.705 ± 0.000 | 0.978 ± 0.000 | 0.600 ± 0.000 | 2.100 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.92 | 1/1 | dart-lang/sdk#48056 | A | Verify Dart's handling of disabled and revoked Android CA certificates following the eMudhra incident and reply or update the issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review the PR for sigurdm. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review the PR to fix google.rpc.Code extraction for JSON errors in google_cloud_rpc. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review and reply to Yusufihsangorgel's proposed enum API design so they can proceed. |
| 6 | 9.0 (9) | +3.0 | 0.53 | 1/1 | dart-lang/http#2027 | B | Investigate making `Client.close` asynchronous or prepare a proposal for a 2.0 release. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook for CupertinoClient. |
| 8 | 10.0 (10) | +2.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#360 | A | Implement the mid-stream error handling fix for `_makeStreamingRequest` in google_cloud_rpc. |
| 9 | 11.0 (11) | +2.0 | 0.50 | 1/1 | dart-lang/sdk#59846 | B | Investigate the invalid header name character handling in dart:io to either fix it or unassign myself. |
| 10 | 12.0 (12) | +2.0 | 0.38 | 0/1 | googleapis/google-cloud-dart#361 | A | Wait for @kevmoo to reply regarding whether to switch Compute Engine to discovery or add convenience extensions. |
| 11 | 13.0 (13) | +2.0 | 0.38 | 0/1 | dart-lang/sdk#31275 | A | Waiting on a Dart SDK or dart:io maintainer to adopt and land the abandoned CL. |
| 12 | 17.0 (17) | +5.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Follow progress on PR #3763, which implements the fix for this issue. |
| 13 | 8.0 (8) | -5.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on an automation approach or submit a PR updating the `google_cloud_rpc` version constraints in storage and pubsub. |
| 14 | 16.0 (16) | +2.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Waiting for another dart-ecosystem-team member to review this PR. |
| 15 | 14.0 (14) | -1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review linked PR #382 instead. |
| 16 | 20.0 (20) | +4.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for @goderbauer to review the pull request. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.60 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner wiring, FormatException handling, and RequestOptions in ServiceClient. |
| 18 | 23.0 (23) | +5.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | Wait for the lower PRs in the stack (such as #2014) to be reviewed and merged before reviewing this release PR. |
| 19 | 18.0 (18) | -1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Decide whether to resolve the merge conflicts and finish this draft, or close it. |
| 20 | 19.0 (19) | -1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Waiting on the author to sign the CLA. |
| 21 | 29.0 (29) | +8.0 | 0.03 | 0/1 | dart-lang/tools#2544 | B | Waiting on jonasfj to address lrhn's review comments. |
| 22 | 22.0 (22) | +0.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | Wait for the base PR (#2563) to be reviewed and merged first. |
| 23 | 21.0 (21) | -2.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the pull request. |
| 24 | 24.0 (24) | +0.0 | 0.10 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for @sigurdm to confirm whether the PR can be merged without waiting for @natebosch's review. |
| 25 | 25.0 (25) | +0.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Wait for planning of the next major breaking release of package:http before revisiting this API change. |
| 26 | 15.0 (15) | -11.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | Follow up on and land PR #2034 to resolve this issue. |
| 27 | 30.0 (30) | +3.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | No action needed; this is a DevTools feature request where I was only CC'd for context. |
| 28 | 26.0 (26) | -2.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | Waiting for community contribution. |
| 29 | 32.0 (32) | +3.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; I am not responsible for package:http2. |
| 31 | 27.0 (27) | -4.0 | 0.03 | 0/1 | dart-lang/tools#2715 | B | Waiting for davidmorgan to review. |
| 32 | 31.0 (31) | -1.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on mosuem to review. |
| 33 | 28.0 (28) | -5.0 | 0.03 | 0/1 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide whether to pursue this change or close the issue. |
| 34 | 35.0 (35) | +1.0 | 0.00 | 0/1 | dart-lang/http#1972 | B | Waiting on the reporter to answer clarifying questions about reproduction. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | No action needed; track progress on the linked PR #2002 instead. |
| 36 | 33.0 (33) | -3.0 | 0.00 | 0/1 | dart-lang/sdk#38148 | B | No action needed; this issue was marked as not important and no subsequent activity has been directed at you. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/native#3653** (truth #33) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/tools#2715** (truth #31) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#366** (truth #13) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue regarding TLS root certificate trust that I opened and am assigned to. A recent comment highlighted the security implications of the eMudhra CA compromise and questioned whether disabled or revoked certificates are still accepted on Android. Per my guidelines, any security issue assigned to or filed by me with new activity requires top priority verification, regardless of age or its P3 label.
- **Next action:** Verify Dart's handling of disabled and revoked Android CA certificates following the eMudhra incident and reply or update the issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR, fixing an issue in google-cloud-dart that you filed. Your collaborator kevmoo left a substantive review question 21 hours ago that is blocking progress, so the next step is on you.
- **Next action:** Reply to kevmoo's review comment on CHANGELOG preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This PR was authored by my close collaborator Sigurd in googleapis/google-cloud-dart, a repository I am responsible for. Because no human has reviewed it yet (bots do not count), I am the default reviewer and it has been waiting for review for 5 days. Collaborator PRs waiting on my review in my repositories take high priority.
- **Next action:** Review the PR for sigurdm.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** As a maintainer of googleapis/google-cloud-dart, I am the default reviewer for PRs in this repository. This PR from an external contributor has been waiting for a human review for three days. While collaborator PRs take precedence, unreviewed PRs in my repositories fall squarely into my review responsibilities.
- **Next action:** Review the PR to fix google.rpc.Code extraction for JSON errors in google_cloud_rpc.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** You asked the contributor to share a design proposal before writing code, and they posted a concrete API sketch 4 days ago. Because this is an issue you filed in a repository you maintain, your feedback is needed to unblock them from implementing the fix.
- **Next action:** Review and reply to Yusufihsangorgel's proposed enum API design so they can proceed.

### 6. dart-lang/http#2027 → predicted 9, priority 0.53
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in a repository you maintain to explore tightening `Client.close` semantics. Because this is your own planned work and is not waiting on anyone else, it should be treated as a commitment while relatively fresh. At 9 days old without outside discussion, it sits squarely in your planned work priority band.
- **Next action:** Investigate making `Client.close` asynchronous or prepare a proposal for a 2.0 release.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue to yourself in dart-lang/http and commented five hours ago that you have started working on it. Although it touches TLS trust evaluation, it is a feature request rather than an active security vulnerability or incident. As fresh planned work that you have committed to driving, it belongs in your active work queue.
- **Next action:** Work on implementing the server trust evaluation hook for CupertinoClient.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository you maintain, and was opened by your close collaborator kevmoo. You asked for clarification and kevmoo responded, putting the ball back in your court to address the streaming defects (especially silent error handling). Even though kevmoo mentioned it is not urgent, collaborator issues in your repository with a clear path forward fall into your planned work tier.
- **Next action:** Implement the mid-stream error handling fix for `_makeStreamingRequest` in google_cloud_rpc.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I was assigned to this dart:io issue regarding RFC 9110 compliance and proxy interoperability for invalid HTTP header characters. Although it has been inactive for nearly two years, it is assigned to me in core HTTP code that I work with. As an assigned issue, I should either investigate and resolve it or unassign myself so someone else can pick it up.
- **Next action:** Investigate the invalid header name character handling in dart:io to either fix it or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in a repository I am responsible for, filed by a close collaborator. I responded 16 days ago questioning whether switching to discovery is preferable over adding convenience extensions given the API surface size, and I am waiting on kevmoo's response before proceeding. Because the ball is currently in his court, it is not immediately actionable for me, but it stays moderately prioritized as an active discussion in my repo.
- **Next action:** Wait for @kevmoo to reply regarding whether to switch Compute Engine to discovery or add convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.38
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a severe bug in widely used core library code (dart:io HttpClient) causing uncatchable exceptions and process crashes, which collaborator kevmoo also ran into. However, I am not assigned to the issue, dart-lang/sdk is not one of my owned repositories, and I was only CC'd more than two years ago. Because there is no direct request for me to act and the thread has been dormant, it belongs in the bracket for old but important issues where I was CC'd.
- **Next action:** Waiting on a Dart SDK or dart:io maintainer to adopt and land the abandoned CL.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** I filed and am assigned to this issue, but I already have an open PR (#3763) addressing it. Per guidelines, issues covered by an active PR are not directly actionable and should be ranked low.
- **Next action:** Follow progress on PR #3763, which implements the fix for this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 8, priority 0.55
- **Ground truth:** 
- **Model:** This issue was filed by your collaborator sigurdm in a repository you maintain to ensure version dependencies are bumped before releasing storage and pubsub packages. You left a note 17 days ago considering whether to address this via automation, but have not followed up since. As the ball is in your court to either fix the constraints manually or resolve the automation strategy, this is planned work in your owned repo.
- **Next action:** Decide on an automation approach or submit a PR updating the `google_cloud_rpc` version constraints in storage and pubsub.

### 14. dart-lang/tools#2719 → predicted 16, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated pull request updating BoringSSL in dart-lang/tools, a repository I am not responsible for. The review request is to dart-ecosystem-team rather than to me personally, so it is not my responsibility to review. Because no specific reviewer is currently assigned or actively reviewing, it remains a low-priority team item waiting on another team member.
- **Next action:** Waiting for another dart-ecosystem-team member to review this PR.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue reports a bug in googleapis/google-cloud-dart that is already addressed by open PR #382. When an open PR exists to resolve an issue, attention should focus on reviewing the PR rather than acting on the issue itself. Consequently, this issue is kept at a low priority.
- **Next action:** Review linked PR #382 instead.

### 16. dart-lang/http#2034 → predicted 20, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my PR and I requested a review from @goderbauer two days ago. Since it has only been a couple of days, it is waiting on them and there is no action needed from me yet.
- **Next action:** Wait for @goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I maintain, originally filed by close collaborator kevmoo. I investigated retry designs and scoped down the work 10 days ago, making this active planned work on my plate to implement.
- **Next action:** Implement the RetryRunner wiring, FormatException handling, and RequestOptions in ServiceClient.

### 18. dart-lang/http#2031 → predicted 23, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem explicitly requested my review, this PR is stacked on changes that are still open and awaiting review (including #2014). Additionally, this is in package:http2, which is outside my primary area of responsibility in dart-lang/http. The earlier PRs in the stack must land before this release preparation can be reviewed and merged.
- **Next action:** Wait for the lower PRs in the stack (such as #2014) to be reviewed and merged before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in googleapis/google-cloud-dart that has been dormant for 45 days and has accumulated merge conflicts. As my own draft that is neither ready for review nor actively worked on, it sits in the 0.15–0.35 range until I decide to resume implementation or abandon it.
- **Next action:** Decide whether to resolve the merge conflicts and finish this draft, or close it.

### 20. dart-lang/core#1007 → predicted 19, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of your primary repositories, and the review was requested from the team rather than you personally. Furthermore, the PR is currently blocked until the author signs the Google CLA.
- **Next action:** Waiting on the author to sign the CLA.

### 21. dart-lang/tools#2544 → predicted 29, priority 0.03
- **Ground truth:** 
- **Model:** Although this PR mitigates a security issue, it is in dart-lang/tools, which is not a repository I am responsible for. I was only notified through a team review request to dart-ecosystem-team, and lrhn was directly requested and is already actively handling the review. The PR is currently blocked on jonasfj responding to lrhn's feedback, so there is nothing for me to do.
- **Next action:** Waiting on jonasfj to address lrhn's review comments.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is currently a draft and has not yet been reviewed. In addition, this is in dart-lang/tools (a repository you are not directly responsible for) and was requested via a team review request to dart-ecosystem-team rather than addressed to you personally. There is no immediate action required until the underlying PR lands.
- **Next action:** Wait for the base PR (#2563) to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 21, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request, and I requested a review from liamappelbe two days ago. Since it has only been a couple of days, there is nothing for me to do right now until the reviewer responds.
- **Next action:** Wait for liamappelbe to review the pull request.

### 24. googleapis/google-cloud-dart#373 → predicted 24, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR in googleapis/google-cloud-dart, which @sigurdm previously approved for the Pub/Sub changes. Four days ago, you pinged @sigurdm to ask whether the PR is good to merge without waiting for @natebosch. Because less than a week has passed since asking, there is nothing for you to do right now while waiting for a response.
- **Next action:** Wait for @sigurdm to confirm whether the PR can be merged without waiting for @natebosch's review.

### 25. dart-lang/http#579 → predicted 25, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes to support request progress tracking and is explicitly labeled 'next-breaking-release'. As previously established, this work is deferred until a major semver bump is coordinated for package:http. The only recent activity was an external community question 14 months ago, so no immediate action is needed.
- **Next action:** Wait for planning of the next major breaking release of package:http before revisiting this API change.

### 26. dart-lang/http#1932 → predicted 15, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by an active pull request (PR #2034) that I recently opened. Per guidelines, when an issue has an open PR addressing it, action is focused on the PR rather than the issue itself, keeping the issue in the 0.15–0.35 range.
- **Next action:** Follow up on and land PR #2034 to resolve this issue.

### 27. flutter/devtools#8223 → predicted 30, priority 0.02
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, a repository I do not maintain. I was only CC'd for informational context over two years ago regarding HTTP profiling, and no action has ever been requested of me. It is handled by the DevTools team.
- **Next action:** No action needed; this is a DevTools feature request where I was only CC'd for context.

### 28. dart-lang/http#1837 → predicted 26, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded a year ago clarifying that the Dart team does not plan to implement this and suggested a community-driven approach. The issue is marked 'contributions-welcome' and 'P3' with no subsequent activity. There is nothing for you to do right now.
- **Next action:** Waiting for community contribution.

### 29. dart-lang/http#2033 → predicted 32, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this PR two days ago, and there has been no activity since. The ball is in mosuem's court to merge it when ready. There is nothing for me to do.
- **Next action:** Waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is specifically about package:http2, an area of dart-lang/http that I am explicitly not responsible for. Additionally, I am not assigned or mentioned, and no action has been requested of me.
- **Next action:** None; I am not responsible for package:http2.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.03
- **Ground truth:** 
- **Model:** This pull request is in dart-lang/tools, a repository I am not responsible for. Although kevmoo is a collaborator, the PR requested my team rather than me personally, and davidmorgan is explicitly assigned as an individual reviewer. As a result, no action is needed from me unless specifically requested.
- **Next action:** Waiting for davidmorgan to review.

### 32. dart-lang/http#2026 → predicted 31, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This pull request is in pkgs/http2, an area of dart-lang/http that I am explicitly not responsible for. Furthermore, the author specifically asked mosuem for a review, so there is nothing for me to do.
- **Next action:** Waiting on mosuem to review.

### 33. dart-lang/native#3653 → predicted 28, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, which is outside the repositories I maintain, and it is assigned to and driven by liamappelbe. I previously contributed background context to the discussion, but there is no pending request or action for me.
- **Next action:** Waiting on liamappelbe to decide whether to pursue this change or close the issue.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** I asked the reporter for reproduction details and labeled this issue 'needs-info' eight days ago, and they have not replied yet. Additionally, there is an open PR (#1974) linked to this issue, which makes the issue itself non-actionable. Until the requested information is provided, this requires no attention.
- **Next action:** Waiting on the reporter to answer clarifying questions about reproduction.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on October 5, 2026, and nothing new has happened on it since. Furthermore, an open PR (#2002) exists to implement this enhancement, making any action on the issue redundant.
- **Next action:** No action needed; track progress on the linked PR #2002 instead.

### 36. dart-lang/sdk#38148 → predicted 33, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You marked this issue as not important with a thumbs down on 2026-08-01. While filiph commented asking how to help and a bot referenced a commit, neither was directed at you personally. Because this is not in a repository you own, is not a security issue, and has had no direct requests for your involvement since your thumbs down, it receives a 0.0.
- **Next action:** No action needed; this issue was marked as not important and no subsequent activity has been directed at you.
