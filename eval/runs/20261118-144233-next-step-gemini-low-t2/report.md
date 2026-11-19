# Gitilizer eval: next-step-gemini-low-t2

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-144233

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.635 ± 0.000 |
| spearman | 0.758 ± 0.000 |
| pairwise_acc | 0.818 ± 0.000 |
| ndcg | 0.977 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.611 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.750 ± 0.000 |
| B | 20 | 0.432 ± 0.000 | 0.916 ± 0.000 | 0.600 ± 0.000 | 4.100 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | [todo] Check the security impact of the recent CA compromise on Android and determine if #64644 addresses this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | [respond] Reply to kevmoo's question regarding CHANGELOG.md handling in librarian clean/bump. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | [review] Review Sigurd's PR adding client attribution headers and pre-release polish to Pub/Sub |
| 4 | 5.0 (5) | +1.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | [review] Review this PR for handling google.rpc.Code in ServiceException. |
| 5 | 4.0 (4) | -1.0 | 0.72 | 1/1 | googleapis/google-cloud-dart#252 | B | [respond] Review Yusufihsangorgel's proposed enum design snippet and provide feedback so they can proceed. |
| 6 | 8.0 (8) | +2.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | [todo] Design and propose the updated `Client.close` semantics or draft an implementation for package:http 2.0. |
| 7 | 7.0 (7) | +0.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | [todo] Implement the server trust evaluation hook in cupertino_http as promised. |
| 8 | 11.0 (11) | +3.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#360 | A | [todo] Decide whether to implement incremental JSON parsing and mid-stream error detection for RPC streaming. |
| 9 | 12.0 (12) | +3.0 | 0.50 | 1/1 | dart-lang/sdk#59846 | B | [todo] Investigate HTTP header name validation in dart:io and either fix it or unassign myself. |
| 10 | 13.0 (13) | +3.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | [waiting] Waiting on kevmoo to respond to my question regarding switching to discovery versus adding convenience extensions. |
| 11 | 14.0 (14) | +3.0 | 0.40 | 1/1 | dart-lang/sdk#31275 | A | [backlog] Triage and consider adopting the abandoned CL for dart:io's HttpClient unsolicited response crash. |
| 12 | 18.0 (18) | +6.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | [elsewhere] Act on PR dart-lang/native#3763 instead, which addresses this issue. |
| 13 | 10.0 (10) | -3.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | [todo] Bump the required `google_cloud_rpc` version in storage and pubsub or decide on a librarian automation approach. |
| 14 | 21.0 (21) | +7.0 | 0.15 | 0/1 | dart-lang/tools#2719 | B | [not_yours] None; someone else on dart-ecosystem-team can review this automated BoringSSL update. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | [elsewhere] Review PR googleapis/google-cloud-dart#382 instead of acting on this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | [waiting] Waiting on goderbauer to review this PR. |
| 17 | 9.0 (9) | -8.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | [todo] Implement RetryRunner and RequestOptions wiring in ServiceClient and handle FormatException on HTML error responses. |
| 18 | 25.0 (25) | +7.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | [elsewhere] Review lower PR #2014 first before reviewing this release preparation PR. |
| 19 | 20.0 (20) | +1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | [todo] Resume work on this draft PR to add Cloud DNS support or close it if no longer needed. |
| 20 | 28.0 (28) | +8.0 | 0.05 | 0/1 | dart-lang/core#1007 | B | [not_yours] None, as this is a team review request in a repository I do not manage and is blocked on CLA. |
| 21 | 31.0 (31) | +10.0 ⚠️ | 0.05 | 0/1 | dart-lang/tools#2544 | B | [not_yours] None; lrhn is already reviewing this PR in dart-lang/tools. |
| 22 | 24.0 (24) | +2.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | [elsewhere] Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | [waiting] Wait for liamappelbe to review the PR. |
| 24 | 15.0 (15) | -9.0 ⚠️ | 0.38 | 0/1 | googleapis/google-cloud-dart#373 | B | [waiting] Waiting on sigurdm to confirm if the non-PubSub parts look good to merge without natebosch. |
| 25 | 27.0 (27) | +2.0 | 0.08 | 0/1 | dart-lang/http#579 | B | [waiting] Wait for planning or scheduling of the next major breaking release of package:http before revisiting this PR. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | [elsewhere] Focus on PR #2034, which is open to fix this issue. |
| 27 | 29.0 (29) | +2.0 | 0.05 | 0/1 | flutter/devtools#8223 | B | [not_yours] None; this issue in flutter/devtools is informational and not waiting on me. |
| 28 | 26.0 (26) | -2.0 | 0.08 | 1/1 | dart-lang/http#1837 | A | [backlog] Leave in backlog for community contribution or revisit during triage. |
| 29 | 35.0 (35) | +6.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | [not_yours] None; PR is already approved and waiting on mosuem to merge. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | [not_yours] None, as this issue concerns package:http2 which is outside your stated scope. |
| 31 | 33.0 (33) | +2.0 | 0.04 | 0/1 | dart-lang/tools#2715 | B | [not_yours] None, as this is a team review request in a repository I do not manage and another reviewer is assigned. |
| 32 | 34.0 (34) | +2.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | [not_yours] None; this PR is in package:http2 and waiting on review from mosuem. |
| 33 | 30.0 (30) | -3.0 | 0.05 | 0/1 | dart-lang/native#3653 | A | [not_yours] None; liamappelbe is driving this ffigen issue in dart-lang/native. |
| 34 | 32.0 (32) | -2.0 | 0.05 | 0/1 | dart-lang/http#1972 | B | [elsewhere] Follow up on PR #1974, which addresses this issue. |
| 35 | 19.0 (19) | -16.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1841 | B | [elsewhere] Review open PR dart-lang/http#2002 which addresses this issue. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.65 | 1/1 | dart-lang/sdk#38148 | B | [respond] Reply to filiph offering guidance on how they can share a reproduction or investigate the Directory.deleteSync failure. |

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
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1841** (truth #35) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an issue I filed and am assigned to regarding certificate trust and verification on Android. A user recently flagged critical security implications involving an active CA compromise, and related fix #64644 landed 2 days ago. Per the instructions, security issues assigned to me with fresh activity outrank other work and require immediate verification.
- **Next action:** [todo] Check the security impact of the recent CA compromise on Android and determine if #64644 addresses this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and a close collaborator (kevmoo) left actionable review feedback with an open question. I should not let my own PR stall, especially when an unanswered question is blocking progress towards landing a fix for google-cloud-dart#358.
- **Next action:** [respond] Reply to kevmoo's question regarding CHANGELOG.md handling in librarian clean/bump.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from my close collaborator sigurdm in googleapis/google-cloud-dart, a repository I am responsible for. Since I am the default reviewer here and no human has reviewed it yet, it is waiting on me. It falls squarely into the 0.65-0.8 collaborator review range.
- **Next action:** [review] Review Sigurd's PR adding client attribution headers and pre-release polish to Pub/Sub

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from an outside contributor in googleapis/google-cloud-dart, a repository I am responsible for. Since bots do not count as human reviewers, I am the default reviewer. It fixes a real bug affecting REST retry logic and is ready for review.
- **Next action:** [review] Review this PR for handling google.rpc.Code in ServiceException.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for. I advised the contributor to share a design before writing extensive code, and they have now posted a concrete API sketch that is waiting on my review and feedback to move forward.
- **Next action:** [respond] Review Yusufihsangorgel's proposed enum design snippet and provide feedback so they can proceed.

### 6. dart-lang/http#2027 → predicted 8, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in `dart-lang/http`, a core repository you are responsible for, outlining architectural improvements for `Client.close`. Nobody else is waiting to act on this, so it represents your own planned work. Because it is fresh (filed 9 days ago) and targets potential 2.0 breaking changes, it belongs in the middle tier of planned tasks.
- **Next action:** [todo] Design and propose the updated `Client.close` semantics or draft an implementation for package:http 2.0.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented just a few hours ago stating that I have started working on it. This represents active planned work in a repository I own. It sits comfortably in the 0.5-0.65 range as a fresh commitment.
- **Next action:** [todo] Implement the server trust evaluation hook in cupertino_http as promised.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in a repository I am responsible for (google-cloud-dart) and was filed by a close collaborator (kevmoo). Kevmoo replied to my question clarifying his perspective and noting that while it isn't urgent, it represents an unhandled gap in streaming requests. Because there is a clear next step for me to plan or implement the solution, it sits in my planned work backlog.
- **Next action:** [todo] Decide whether to implement incremental JSON parsing and mid-stream error detection for RPC streaming.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue in dart-lang/sdk regarding HTTP header parsing security/RFC-compliance concerns (including NUL byte handling affecting proxies). There has been no activity for nearly two years and no new information was reported, but assigned issues should either be fixed or unassigned. Because it has been sitting dormant in the backlog without active requests, it falls into the moderate priority range for assigned work.
- **Next action:** [todo] Investigate HTTP header name validation in dart:io and either fix it or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is in googleapis/google-cloud-dart, a repository I am responsible for, filed by a close collaborator (kevmoo). I asked a direct question about architectural trade-offs 16 days ago, and we are currently waiting on his reply before deciding how to proceed.
- **Next action:** [waiting] Waiting on kevmoo to respond to my question regarding switching to discovery versus adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an important uncatchable crash bug in widely used core library code (dart:io), and close collaborator kevmoo specifically CC'd me expressing interest in a fix. However, dart-lang/sdk is not one of my primary tracked repositories and there has been no recent activity or direct question requiring urgent intervention. It represents backlog work I could pick up from the abandoned CL when grooming.
- **Next action:** [backlog] Triage and consider adopting the abandoned CL for dart:io's HttpClient unsolicited response crash.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** You opened this issue and assigned it to yourself, but you have already opened PR #3763 to fix it. When an open PR covers an issue, action shifts entirely to the PR, leaving nothing to do on the issue itself. Consequently, this issue is kept in the low priority range (0.15–0.35).
- **Next action:** [elsewhere] Act on PR dart-lang/native#3763 instead, which addresses this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.55
- **Ground truth:** 
- **Model:** This issue is in a repository I am responsible for (google-cloud-dart) and was filed by a close collaborator (sigurdm). I last commented over two weeks ago noting I'm considering whether to fix it manually or via librarian automation, so the ball is in my court to resolve it or implement the pubspec updates before next release. Since it has been sitting idle for 17 days without urgency, it sits firmly in planned work / moderate priority.
- **Next action:** [todo] Bump the required `google_cloud_rpc` version in storage and pubsub or decide on a librarian automation approach.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.15
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not one of my primary repositories. The review request is directed to the broad dart-ecosystem-team rather than me personally. Because it is an automated routine dependency bump in a repository I do not directly manage, it is low priority for me.
- **Next action:** [not_yours] None; someone else on dart-ecosystem-team can review this automated BoringSSL update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository I am responsible for, but the author has opened PR #382 to address it. Under our policy to avoid duplicates, the PR is the primary item to review, which keeps this issue in the low 0.15-0.35 priority range. My concrete action should be reviewing PR #382 instead.
- **Next action:** [elsewhere] Review PR googleapis/google-cloud-dart#382 instead of acting on this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my PR in dart-lang/http fixing an issue with cronet. I requested a review from goderbauer only two days ago, so there is nothing for me to do until they respond or enough time passes to follow up.
- **Next action:** [waiting] Waiting on goderbauer to review this PR.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I maintain, originally filed by collaborator kevmoo. I recently scoped out the requirements and removed the duplicate AIP work. The remaining implementation is clearly defined and waiting on me to write the code.
- **Next action:** [todo] Implement RetryRunner and RequestOptions wiring in ServiceClient and handle FormatException on HTML error responses.

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is stacked on multiple lower PRs in the stack, including #2014 which is still open and unreviewed. Furthermore, I have noted that I am not responsible for http2 in dart-lang/http, although mosuem is a collaborator and requested my review personally. Because the underlying PRs need to be reviewed and landed first, this release PR is low priority.
- **Next action:** [elsewhere] Review lower PR #2014 first before reviewing this release preparation PR.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding DNS support in googleapis/google-cloud-dart, which I converted to draft 45 days ago. There are no human reviewers waiting on me, but as a draft PR I created, I should eventually finish or abandon it. Stale drafts fall into the lower priority band of 0.15-0.35.
- **Next action:** [todo] Resume work on this draft PR to add Cloud DNS support or close it if no longer needed.

### 20. dart-lang/core#1007 → predicted 28, priority 0.05
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not a repository I am responsible for managing. The review request is only to the general dart-ecosystem-team rather than to me personally, and the PR is currently blocked on the contributor signing the CLA. There is no action required from me.
- **Next action:** [not_yours] None, as this is a team review request in a repository I do not manage and is blocked on CLA.

### 21. dart-lang/tools#2544 → predicted 31, priority 0.05
- **Ground truth:** 
- **Model:** This is a PR in dart-lang/tools, a repository I am not responsible for, requested via the dart-ecosystem team rather than directly to me. A specific reviewer (lrhn) is actively engaged and requested for review, and the PR is currently waiting on the author (jonasfj) to address lrhn's comments. Even though it addresses a security issue, it is not in my scope and someone else is driving it.
- **Next action:** [not_yours] None; lrhn is already reviewing this PR in dart-lang/tools.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on PR #2563, which is currently a draft and unreviewed. In addition, I am only requested via a team review request (`dart-ecosystem-team`) on a repository I do not directly own (`dart-lang/tools`). The base PR must be reviewed first before this stacked PR needs attention.
- **Next action:** [elsewhere] Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, and I requested a review from liamappelbe only 2 days ago. Since roughly a week has not passed, there is no need to ping yet. It is waiting on their review, so priority is low.
- **Next action:** [waiting] Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 15, priority 0.38
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in a repository I maintain, currently approved by collaborator sigurdm. I asked sigurdm 4 days ago whether his approval covers the entire PR so natebosch doesn't need to review. I am waiting on his answer before merging.
- **Next action:** [waiting] Waiting on sigurdm to confirm if the non-PubSub parts look good to merge without natebosch.

### 25. dart-lang/http#579 → predicted 27, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is explicitly labeled 'next-breaking-release'. I previously stated that landing this requires coordinating a major release and that I lack the bandwidth, effectively deferring it indefinitely until major version work begins.
- **Next action:** [waiting] Wait for planning or scheduling of the next major breaking release of package:http before revisiting this PR.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by open PR #2034, which I recently updated to fix the cronet namespace duplication bug. When an issue has an open PR addressing it, the concrete action belongs on the PR rather than the issue thread itself. Per guidance, issues with an active PR fixing them should be ranked well below the PR in the 0.15-0.35 range.
- **Next action:** [elsewhere] Focus on PR #2034, which is open to fix this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** I was only CC'd over two years ago by bkonyi as an FYI regarding HTTP profiling in dart:io. The flutter/devtools repository is not one I am responsible for, and no questions or tasks are directed at me. There is nothing for me to act on.
- **Next action:** [not_yours] None; this issue in flutter/devtools is informational and not waiting on me.

### 28. dart-lang/http#1837 → predicted 26, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded to this feature request a year ago indicating the Dart team is not planning to implement it and marked it as contributions welcome / P3. There has been no activity since, and no one is waiting on your response. This sits quietly in the backlog as an old, low-priority feature request.
- **Next action:** [backlog] Leave in backlog for community contribution or revisit during triage.

### 29. dart-lang/http#2033 → predicted 35, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I reviewed and approved this PR two days ago, and there have been no new commits or comments since. It is completely done from my perspective and waiting on the author to merge.
- **Next action:** [not_yours] None; PR is already approved and waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** You explicitly noted that you are not responsible for http2 in dart-lang/http. Additionally, this is an old enhancement/performance issue where you have never been mentioned or involved. There is nothing for you to do.
- **Next action:** [not_yours] None, as this issue concerns package:http2 which is outside your stated scope.

### 31. dart-lang/tools#2715 → predicted 33, priority 0.04
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. I was only requested via the generic dart-ecosystem-team, and davidmorgan was specifically requested as an individual reviewer. Therefore, this item requires no action from me.
- **Next action:** [not_yours] None, as this is a team review request in a repository I do not manage and another reviewer is assigned.

### 32. dart-lang/http#2026 → predicted 34, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, the author has explicitly addressed and pinged mosuem to review this PR. There is no action required from me.
- **Next action:** [not_yours] None; this PR is in package:http2 and waiting on review from mosuem.

### 33. dart-lang/native#3653 → predicted 30, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, which is not a repository I am responsible for. It is assigned to and actively driven by liamappelbe, with input from the VM team. I participated previously to share experiment findings, but there is no question or action waiting on me.
- **Next action:** [not_yours] None; liamappelbe is driving this ffigen issue in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 32, priority 0.05
- **Ground truth:** 
- **Model:** This issue is covered by open pull request #1974. Furthermore, I asked the reporter for clarifying information and applied the 'needs-info' label, and they haven't replied yet. There is nothing to do on this issue directly.
- **Next action:** [elsewhere] Follow up on PR #1974, which addresses this issue.

### 35. dart-lang/http#1841 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This issue is covered by an open pull request (#2002) that attempts to resolve it. Per guidelines, open issues with an active PR fixing them should be ranked well below the PR itself (in the 0.15-0.35 range), shifting action to the PR. Additionally, this item was marked with a thumbs down on 2026-10-05 and nothing new has occurred directly on the issue since.
- **Next action:** [elsewhere] Review open PR dart-lang/http#2002 which addresses this issue.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.65
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although I marked this item thumbs down in August 2026, filiph commented recently with a consistent local reproduction asking how to help hunt it down. Since I am assigned to this issue in dart-lang/sdk and a contributor is offering active help on an intermittent bug, it deserves my attention to unblock them.
- **Next action:** [respond] Reply to filiph offering guidance on how they can share a reproduction or investigate the Directory.deleteSync failure.
