# Gitilizer eval: m-gemini-3.5-flash-t3

strategy `pointwise` · model `gemini-3.5-flash` · thinking `default` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-164734

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.663 ± 0.000 |
| spearman | 0.790 ± 0.000 |
| pairwise_acc | 0.832 ± 0.000 |
| ndcg | 0.972 ± 0.000 |
| ndcg@5 | 0.966 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.389 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.750 ± 0.000 |
| B | 20 | 0.495 ± 0.000 | 0.928 ± 0.000 | 0.600 ± 0.000 | 3.600 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.90 | 1/1 | dart-lang/sdk#48056 | A | Review the recent comments regarding Android certificate revocation and trust handling, and update or address the security concerns. |
| 2 | 3.0 (3) | +1.0 | 0.82 | 1/1 | googleapis/librarian#7808 | A | Respond to kevmoo's review feedback regarding CHANGELOG.md handling and update the PR. |
| 3 | 4.0 (4) | +1.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review PR #376 from collaborator sigurdm. |
| 4 | 6.0 (6) | +2.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this pull request in googleapis/google-cloud-dart. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review and reply to Yusufihsangorgel's proposed API design for enum integer parsing. |
| 6 | 11.0 (11) | +5.0 | 0.50 | 1/1 | dart-lang/http#2027 | B | Decide on the API design for Client.close in package:http 2.0 and begin implementing or refining the proposal. |
| 7 | 8.0 (8) | +1.0 | 0.55 | 1/1 | dart-lang/http#1981 | B | Implement the server trust evaluation callback for CupertinoClient as planned. |
| 8 | 12.0 (12) | +4.0 | 0.50 | 1/1 | googleapis/google-cloud-dart#360 | A | Decide on prioritizing or implementing the fixes for streaming RPC request handling. |
| 9 | 2.0 (2) | -7.0 | 0.90 | 1/1 | dart-lang/sdk#59846 | B | Investigate and fix the `dart:io` HTTP header parser to reject invalid header name characters per RFC 9110, or reassign the issue. |
| 10 | 14.0 (14) | +4.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting for kevmoo to respond to my question about whether to switch to discovery or add convenience extensions. |
| 11 | 16.0 (16) | +5.0 | 0.25 | 0/1 | dart-lang/sdk#31275 | A | Waiting on Dart SDK maintainers to take over the abandoned HttpClient patch. |
| 12 | 19.0 (19) | +7.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Wait for PR #3763 to be reviewed and merged. |
| 13 | 10.0 (10) | -3.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on the release dependency fix and update the google_cloud_rpc dependency requirements in pubspec files. |
| 14 | 17.0 (17) | +3.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Waiting for another member of dart-ecosystem-team to review this pull request. |
| 15 | 18.0 (18) | +3.0 | 0.20 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382, which addresses this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Waiting for goderbauer to review the PR. |
| 17 | 9.0 (9) | -8.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in google_cloud_rpc. |
| 18 | 25.0 (25) | +7.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | Review the lower PR (#2014) in the stack first before reviewing this release PR. |
| 19 | 20.0 (20) | +1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Decide whether to finish or abandon this draft PR. |
| 20 | 21.0 (21) | +1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Wait for a maintainer of dart-lang/core or for the author to complete the CLA check. |
| 21 | 29.0 (29) | +8.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | Waiting on jonasfj to address lrhn's review comments. |
| 22 | 24.0 (24) | +2.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | Waiting for lower PR #2563 in the stack to be reviewed and merged first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Waiting for liamappelbe to review the PR. |
| 24 | 13.0 (13) | -11.0 ⚠️ | 0.40 | 0/1 | googleapis/google-cloud-dart#373 | B | Waiting for @sigurdm to reply to my question about merging before waiting on @natebosch. |
| 25 | 27.0 (27) | +2.0 | 0.10 | 0/1 | dart-lang/http#579 | B | Waiting for a future breaking release of package:http. |
| 26 | 15.0 (15) | -11.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | Wait for PR #2034 to be reviewed and merged. |
| 27 | 31.0 (31) | +4.0 | 0.03 | 0/1 | flutter/devtools#8223 | B | Nothing for me to do; this feature request in flutter/devtools is being tracked by the DevTools team. |
| 28 | 26.0 (26) | -2.0 | 0.10 | 0/1 | dart-lang/http#1837 | A | Waiting for community contributions or further interest. |
| 29 | 34.0 (34) | +5.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | Nothing to do; I am not responsible for the http2 package. |
| 31 | 28.0 (28) | -3.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review. |
| 32 | 33.0 (33) | +1.0 | 0.02 | 0/1 | dart-lang/http#2026 | A | Waiting on mosuem to review the PR. |
| 33 | 32.0 (32) | -1.0 | 0.03 | 0/1 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide whether to pursue this optimization or close the issue. |
| 34 | 30.0 (30) | -4.0 | 0.05 | 0/1 | dart-lang/http#1972 | B | Waiting on the reporter to provide the requested information. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | No action needed on this issue; track progress on PR #2002 instead. |
| 36 | 7.0 (7) | -29.0 ⚠️ | 0.58 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph with instructions on how to help debug the reproduction, or unassign yourself if you are no longer tracking this. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.90
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue created by and assigned to me regarding TLS certificate trust handling on Android (where disabled CAs are trusted). There is recent activity raising security questions about certificate revocation and pointing to a related CA compromise fix, making this a top priority security item to evaluate.
- **Next action:** Review the recent comments regarding Android certificate revocation and trust handling, and update or address the security concerns.

### 2. googleapis/librarian#7808 → predicted 3, priority 0.82
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR and your collaborator kevmoo left inline review feedback and a question 21 hours ago regarding CHANGELOG.md retention. Because there are unanswered reviewer comments on your own pull request, you are currently blocking progress on your work.
- **Next action:** Respond to kevmoo's review feedback regarding CHANGELOG.md handling and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for. It was opened 5 days ago by a primary collaborator (sigurdm) and needs human review before it can be merged.
- **Next action:** Review PR #376 from collaborator sigurdm.

### 4. googleapis/google-cloud-dart#382 → predicted 6, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** I am responsible for the googleapis/google-cloud-dart repository and this PR has not yet been reviewed by a human (bot reviews do not count). As the default reviewer for my repository, reviewing this contribution from a first-time contributor is a concrete action waiting on me.
- **Next action:** Review this pull request in googleapis/google-cloud-dart.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** A contributor has posted a proposed API design sketch for handling enum integer parsing as requested, and is waiting on my feedback to move forward. Since I am responsible for this repository and blocking an external contributor, providing timely feedback is high priority.
- **Next action:** Review and reply to Yusufihsangorgel's proposed API design for enum integer parsing.

### 6. dart-lang/http#2027 → predicted 11, priority 0.50
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is an issue you recently filed yourself in a repository you manage (dart-lang/http) regarding API design improvements for Client.close. As your own planned work in an area you own, it is actionable and maintained as a commitment, though its priority naturally sinks as it ages past a week.
- **Next action:** Decide on the API design for Client.close in package:http 2.0 and begin implementing or refining the proposal.

### 7. dart-lang/http#1981 → predicted 8, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue to yourself in a repository you maintain and explicitly stated you started working on it. This falls under your own active/planned work.
- **Next action:** Implement the server trust evaluation callback for CupertinoClient as planned.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.50
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue filed by a close collaborator (kevmoo) in a repository I am responsible for (google-cloud-dart). kevmoo answered my question regarding server-streaming JSON responses, so the ball is back in my court to either implement the streaming/error handling fix or triage the issue.
- **Next action:** Decide on prioritizing or implementing the fixes for streaming RPC request handling.

### 9. dart-lang/sdk#59846 → predicted 2, priority 0.90
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue describes a security-sensitive HTTP header parsing bug (accepting NUL bytes and control characters in header names, which enables HTTP request smuggling or header injection vulnerabilities) and is assigned to me. Security issues assigned to me take top priority regardless of their age.
- **Next action:** Investigate and fix the `dart:io` HTTP header parser to reject invalid header name characters per RFC 9110, or reassign the issue.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked my collaborator kevmoo whether switching to discovery or adding convenience extensions to service operations would be a better approach, and I am waiting for his reply. Since this issue is in a repository I maintain and involves a key collaborator, keeping track of it is important, but there is no immediate action required from me until he responds.
- **Next action:** Waiting for kevmoo to respond to my question about whether to switch to discovery or add convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 16, priority 0.25
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was CC'd on this issue in dart-lang/sdk over two years ago regarding an unhandled exception in HttpClient. Since I am not a maintainer of dart-lang/sdk and there has been no recent activity directed at me, no action is required on my part.
- **Next action:** Waiting on Dart SDK maintainers to take over the abandoned HttpClient patch.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This issue is covered by open PR #3763 ('[objective_c] support scheduleInRunLoop:forMode:'), which I created to resolve it. Because the fix is being actively tracked and worked on in the PR, no direct action is required on the issue itself.
- **Next action:** Wait for PR #3763 to be reviewed and merged.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.55
- **Ground truth:** 
- **Model:** This issue is in a repository I am responsible for (google-cloud-dart) and was filed by close collaborator @sigurdm. I commented 17 days ago about evaluating a general fix for package release dependencies, but have not followed up yet. Since there is no open PR covering this work, the action remains on me to decide on the approach and execute the dependency updates.
- **Next action:** Decide on the release dependency fix and update the google_cloud_rpc dependency requirements in pubspec files.

### 14. dart-lang/tools#2719 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated pull request updating the BoringSSL revision in dart-lang/tools. Because this repository is outside your primary area of responsibility and the review request is to the dart-ecosystem-team rather than you personally, this is a low-priority team review request.
- **Next action:** Waiting for another member of dart-ecosystem-team to review this pull request.

### 15. googleapis/google-cloud-dart#381 → predicted 18, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in googleapis/google-cloud-dart has an open PR (#382) addressing it. Because the PR is the primary item to review and act on, this issue itself requires no direct action and is ranked in the low range.
- **Next action:** Review PR #382, which addresses this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my PR in dart-lang/http where I requested a review from goderbauer two days ago. Since I recently requested review and haven't received feedback yet, there is no action for me to take until roughly a week has passed.
- **Next action:** Waiting for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I am responsible for, originally filed by collaborator kevmoo. I updated the scope and posted research notes 10 days ago, so the next step is to execute the planned design changes in google_cloud_rpc.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in google_cloud_rpc.

### 18. dart-lang/http#2031 → predicted 25, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is stacked on PR #2014, which is currently unreviewed and must be addressed first. Additionally, while collaborator mosuem specifically requested your review, you are not responsible for the http2 package in dart-lang/http.
- **Next action:** Review the lower PR (#2014) in the stack first before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR created 45 days ago in a repository I am responsible for. It is currently in a dirty state with unresolved bot comments, so I should either finish the implementation or close/abandon it.
- **Next action:** Decide whether to finish or abandon this draft PR.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR was submitted to dart-lang/core with a review request sent to the dart-ecosystem-team. Because I am not personally responsible for this repository and it is a team review request rather than a direct request, it is low priority for me. Additionally, the author has not yet completed the CLA requirement.
- **Next action:** Wait for a maintainer of dart-lang/core or for the author to complete the CLA check.

### 21. dart-lang/tools#2544 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This is a team review request to dart-ecosystem-team in a repository I am not responsible for (dart-lang/tools). Although it touches on a security issue, lrhn was directly requested as a reviewer and is actively reviewing it. Since another reviewer is handling it in a non-owned repository, no action is required from me.
- **Next action:** Waiting on jonasfj to address lrhn's review comments.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR was submitted in dart-lang/tools, a repository I am not responsible for, and was requested via team review rather than directly to me. Additionally, it is stacked on unmerged PR #2563, which must be reviewed and landed before this PR is ready for review.
- **Next action:** Waiting for lower PR #2563 in the stack to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my open PR where I requested a review from liamappelbe 2 days ago. Since it has only been a couple of days, there is nothing for me to do until they review it or a week passes.
- **Next action:** Waiting for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 13, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repository I am responsible for. Sigurd approved the Pub/Sub changes, and 4 days ago I asked him if he reviewed the remaining non-Pub/Sub parts so we can merge without waiting for Nate Bosch. I am waiting for his reply.
- **Next action:** Waiting for @sigurdm to reply to my question about merging before waiting on @natebosch.

### 25. dart-lang/http#579 → predicted 27, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces a breaking API change to package:http to support upload progress callbacks, and is labeled `next-breaking-release`. I previously noted that landing this needs to be coordinated with a major version bump, so nothing needs to be done until a breaking release cycle begins.
- **Next action:** Waiting for a future breaking release of package:http.

### 26. dart-lang/http#1932 → predicted 15, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I have already opened PR #2034 to address this build failure in cronet_http. Since the PR is actively covering this bug, no separate action is required on the issue itself right now.
- **Next action:** Wait for PR #2034 to be reviewed and merged.

### 27. flutter/devtools#8223 → predicted 31, priority 0.03
- **Ground truth:** 
- **Model:** I was only CC'd on a comment over two years ago in a repository I am not responsible for (flutter/devtools). There are no direct questions or pending requests for me to act on.
- **Next action:** Nothing for me to do; this feature request in flutter/devtools is being tracked by the DevTools team.

### 28. dart-lang/http#1837 → predicted 26, priority 0.10
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old low-priority feature request where I previously indicated the Dart team won't be implementing it and labeled it 'contributions-welcome'. There has been no activity since my response a year ago, so there is nothing for me to do.
- **Next action:** Waiting for community contributions or further interest.

### 29. dart-lang/http#2033 → predicted 34, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I reviewed and approved this PR 2 days ago. No new activity or commits have occurred since my approval, so there is nothing further for me to do.
- **Next action:** Waiting on mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is for package:http2 within the dart-lang/http repository, which is an area I have explicitly noted I am not responsible for. Additionally, I am not tagged or assigned, so no action is required from me.
- **Next action:** Nothing to do; I am not responsible for the http2 package.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. While my team (dart-ecosystem-team) was requested, davidmorgan was named as an individual reviewer, so no review is expected from me.
- **Next action:** Waiting on davidmorgan to review.

### 32. dart-lang/http#2026 → predicted 33, priority 0.02
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in the `http2` package, which is an area I explicitly noted I am not responsible for. Additionally, the author has pinged mosuem directly for a review, so there is no action needed from me.
- **Next action:** Waiting on mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 32, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to and driven by liamappelbe in a repository I am not directly responsible for (dart-lang/native). There is no action required from me right now.
- **Next action:** Waiting on liamappelbe to decide whether to pursue this optimization or close the issue.

### 34. dart-lang/http#1972 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** I requested reproduction details from the reporter and added the `needs-info` label 8 days ago, with no response yet. Furthermore, there is an open PR (#1974) attempting to fix this issue, making the PR the primary locus of activity.
- **Next action:** Waiting on the reporter to provide the requested information.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** This issue was marked thumbs-down on October 5, 2026, and no new activity directed at you has occurred since. Additionally, there is an open PR (#2002) addressing this feature, so work and reviews should take place on the PR rather than this issue.
- **Next action:** No action needed on this issue; track progress on PR #2002 instead.

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.58
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this issue. Although you previously marked it with thumbs-down in August 2026, filiph commented in October with a reliable local reproduction and asked how they can help debug it, which requires a response or unassignment.
- **Next action:** Reply to filiph with instructions on how to help debug the reproduction, or unassign yourself if you are no longer tracking this.
