# Gitilizer eval: next-step-gemini-low-t3

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-144235

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.657 ± 0.000 |
| spearman | 0.758 ± 0.000 |
| pairwise_acc | 0.829 ± 0.000 |
| ndcg | 0.976 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 4.444 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.410 ± 0.000 | 0.915 ± 0.000 | 0.600 ± 0.000 | 4.200 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | [todo] Check the security implications of Android certificate revocation/distrust in light of the eMudhra compromise and issue #64644, and update or close this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | [respond] Reply to kevmoo's comment on bump.go regarding CHANGELOG.md cleanup. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | [review] Review sigurdm's PR adding client attribution headers and release polish for Pub/Sub. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | [review] Review this PR for handling google.rpc.Code in ServiceException |
| 5 | 5.0 (5) | +0.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#252 | B | [respond] Reply to Yusufihsangorgel's design proposal for the ProtoEnum representation |
| 6 | 8.0 (8) | +2.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | [todo] Decide on the API design for Client.close and propose or implement the changes for a potential 2.0 release. |
| 7 | 7.0 (7) | +0.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | [todo] Implement the server trust evaluation hook in cupertino_http as promised. |
| 8 | 10.0 (10) | +2.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | [todo] Decide whether to implement incremental JSON streaming and mid-stream error handling or prioritize error handling first. |
| 9 | 12.0 (12) | +3.0 | 0.50 | 1/1 | dart-lang/sdk#59846 | B | [todo] Investigate HTTP header name validation in dart:io and either fix it or unassign myself. |
| 10 | 14.0 (14) | +4.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | [waiting] Waiting on kevmoo to reply regarding switching to discovery vs. adding convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.40 | 1/1 | dart-lang/sdk#31275 | A | [backlog] Investigate taking over the abandoned Gerrit CL (144346) to handle uncatchable 408 responses in dart:io HttpClient. |
| 12 | 18.0 (18) | +6.0 | 0.25 | 0/1 | dart-lang/native#3752 | B | [elsewhere] Work on open PR dart-lang/native#3763 which fixes this issue. |
| 13 | 11.0 (11) | -2.0 | 0.50 | 1/1 | googleapis/google-cloud-dart#366 | B | [todo] Bump the required `google_cloud_rpc` version in storage and pubsub pubspecs, or decide on the librarian automation approach. |
| 14 | 21.0 (21) | +7.0 | 0.15 | 0/1 | dart-lang/tools#2719 | B | [not_yours] None; this is an automated bot PR with a team review request in a repository I do not manage. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | [elsewhere] Review PR #382 which addresses this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | [waiting] Waiting on goderbauer to review this PR. |
| 17 | 9.0 (9) | -8.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | [todo] Implement the RetryRunner and RequestOptions wiring in ServiceClient and harden ServiceException parsing. |
| 18 | 25.0 (25) | +7.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | [elsewhere] Review lower PR dart-lang/http#2014 before reviewing this release preparation PR. |
| 19 | 20.0 (20) | +1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | [todo] Finish developing the DNS client support or close this stale draft PR. |
| 20 | 28.0 (28) | +8.0 | 0.05 | 0/1 | dart-lang/core#1007 | B | [not_yours] None, as this is a team review request in a repository I do not manage and is blocked on the contributor signing the CLA. |
| 21 | 30.0 (30) | +9.0 ⚠️ | 0.05 | 0/1 | dart-lang/tools#2544 | B | [not_yours] None; jonasfj and lrhn are actively handling this PR in dart-lang/tools. |
| 22 | 24.0 (24) | +2.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | [elsewhere] Review draft PR dart-lang/tools#2563 first, as this PR is stacked on it. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | [waiting] Wait for liamappelbe to review the PR. |
| 24 | 13.0 (13) | -11.0 ⚠️ | 0.40 | 0/1 | googleapis/google-cloud-dart#373 | B | [waiting] Waiting on sigurdm's reply regarding whether the PR is ready to merge without natebosch's review. |
| 25 | 26.0 (26) | +1.0 | 0.10 | 1/1 | dart-lang/http#579 | B | [backlog] Keep on hold until planning and work for the next breaking major release of package:http begins. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | [elsewhere] Focus on PR dart-lang/http#2034 which fixes this issue. |
| 27 | 29.0 (29) | +2.0 | 0.05 | 0/1 | flutter/devtools#8223 | B | [not_yours] None; this is an informational mention in flutter/devtools with no action requested of me. |
| 28 | 31.0 (31) | +3.0 | 0.05 | 1/1 | dart-lang/http#1837 | A | [backlog] None; keep in the backlog for community contributions. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | [not_yours] None; approved and waiting on mosuem to merge. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | [not_yours] None, as this issue concerns package:http2 which is explicitly out of scope. |
| 31 | 27.0 (27) | -4.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | [not_yours] None; davidmorgan is directly requested to review this PR. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | [not_yours] None; this is in http2, which is outside my scope, and the author specifically pinged mosuem. |
| 33 | 34.0 (34) | +1.0 | 0.00 | 0/1 | dart-lang/native#3653 | A | [not_yours] None; liamappelbe is driving this investigation in dart-lang/native. |
| 34 | 35.0 (35) | +1.0 | 0.00 | 0/1 | dart-lang/http#1972 | B | [elsewhere] Act on PR #1974 instead of this issue. |
| 35 | 19.0 (19) | -16.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1841 | B | [elsewhere] Review open PR dart-lang/http#2002 which addresses this issue. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.65 | 1/1 | dart-lang/sdk#38148 | B | [respond] Reply to filiph offering guidance on reproducing or investigating the Directory.deleteSync issue. |

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
- **Model:** This is an open security-related issue created by and assigned to me regarding Dart trusting disabled/untrusted root CAs on Android. A user recently commented raising acute security concerns regarding a real-world compromised CA incident (eMudhra), pointing out that Dart's bypass of Android's distrust mechanism could expose users. Per guidelines, security issues that are mine with recent activity or incidents outrank everything else and must be verified immediately.
- **Next action:** [todo] Check the security implications of Android certificate revocation/distrust in light of the eMudhra compromise and issue #64644, and update or close this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo (a close collaborator) has reviewed it and asked an architectural question that blocks progress. Not letting my own work stall and unblocking reviewers puts this firmly in the high-priority 0.8-0.9 range.
- **Next action:** [respond] Reply to kevmoo's comment on bump.go regarding CHANGELOG.md cleanup.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in googleapis/google-cloud-dart, a repository I am responsible for, authored by my close collaborator sigurdm. It has not received any human review yet, making me the default reviewer. As a collaborator PR ready for review in an owned repo, it sits squarely in the 0.65-0.8 range.
- **Next action:** [review] Review sigurdm's PR adding client attribution headers and release polish for Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for where I serve as default reviewer. The PR addresses a substantive bug where RPC retry logic fails over REST due to status code mapping. Because it is from a first-time contributor rather than a close collaborator, it ranks in the standard review tier (0.65-0.8).
- **Next action:** [review] Review this PR for handling google.rpc.Code in ServiceException

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** You asked the contributor to share a design proposal before writing code so you could agree on an approach. They have posted their proposed Dart API design 4 days ago and are waiting for your feedback to proceed. Because this is an active contributor on an issue you own in your repository, keeping them unblocked is a high priority.
- **Next action:** [respond] Reply to Yusufihsangorgel's design proposal for the ProtoEnum representation

### 6. dart-lang/http#2027 → predicted 8, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in dart-lang/http, a repository you are responsible for, laying out design considerations for Client.close semantics. Because you authored it recently and it represents your own planned architectural work without waiting on external feedback, it acts as an active commitment. It falls naturally into the 0.50-0.65 range for fresh personal planned work.
- **Next action:** [todo] Decide on the API design for Client.close and propose or implement the changes for a potential 2.0 release.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented 5 hours ago that I have started working on it. This represents my own active, planned work in a repository I maintain, which puts it squarely in the 0.5-0.65 range. While it relates to TLS trust evaluation, it is a planned feature request rather than an active security vulnerability or bug needing urgent triage.
- **Next action:** [todo] Implement the server trust evaluation hook in cupertino_http as promised.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in googleapis/google-cloud-dart (a repository I am responsible for) filed by a close collaborator (kevmoo). Kevmoo answered my question regarding urgency and memory concerns, leaving the next step on me to design or implement the fix. Although kevmoo noted it is not urgent, issues from close collaborators in my repositories with a clear next step rate as planned work around 0.5–0.65.
- **Next action:** [todo] Decide whether to implement incremental JSON streaming and mid-stream error handling or prioritize error handling first.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned to me in dart-lang/sdk regarding HTTP parsing in dart:io. Permitting invalid characters (such as NUL and control characters) in HTTP headers can cause request smuggling or proxy desync issues, though it has been dormant for 22 months without active exploit reports. As an assigned issue on my plate with no blockers, I should either fix it or reassign it.
- **Next action:** [todo] Investigate HTTP header name validation in dart:io and either fix it or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue filed by close collaborator kevmoo in googleapis/google-cloud-dart, a repository I am responsible for. I asked a substantive architectural question 16 days ago about the API surface tradeoffs and am waiting on his response before taking any action. Since the ball is in his court, it rates in the moderate-low waiting range.
- **Next action:** [waiting] Waiting on kevmoo to reply regarding switching to discovery vs. adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an important crash/uncatchable exception bug in dart:io HttpClient where I was CC'd as library owner, and collaborator @kevmoo also flagged it. However, it is an old issue in dart-lang/sdk with no recent activity or direct questions waiting on me right now. It belongs in the backlog of important issues I was CC'd on.
- **Next action:** [backlog] Investigate taking over the abandoned Gerrit CL (144346) to handle uncatchable 408 responses in dart:io HttpClient.

### 12. dart-lang/native#3752 → predicted 18, priority 0.25
- **Ground truth:** 
- **Model:** You created this issue and subsequently opened PR #3763 to address it. Under the guideline to avoid duplicate tracking when an issue has an open PR, work on the PR itself instead of the issue. Consequently, the priority is lowered to the 0.15–0.35 range.
- **Next action:** [elsewhere] Work on open PR dart-lang/native#3763 which fixes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.50
- **Ground truth:** 
- **Model:** This issue is in a repository I maintain and was filed by a close collaborator (sigurdm) tracking release dependency bumps. I commented 17 days ago considering whether to solve this via librarian automation versus manual bumps, so the next move is on me to drive. Since it is non-blocking planned work without urgent incoming activity, it sits in the middle of the priority range.
- **Next action:** [todo] Bump the required `google_cloud_rpc` version in storage and pubsub pubspecs, or decide on the librarian automation approach.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.15
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision bump in `dart-lang/tools`, a repository I am not directly responsible for. The review request is directed to the `dart-ecosystem-team` rather than to me personally. As such, it is not on my plate unless someone specifically asks for my input.
- **Next action:** [not_yours] None; this is an automated bot PR with a team review request in a repository I do not manage.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in googleapis/google-cloud-dart points out a real retry-logic bug, but it already has an open companion PR (#382) submitted by the same author to resolve it. Per instructions, issues with active PRs should not be acted on directly and are scored well below their PR (typically 0.15–0.35). Reviewing PR #382 is the actual next action.
- **Next action:** [elsewhere] Review PR #382 which addresses this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own pull request fixing a bug in cronet_http. I requested a review from goderbauer only 2 days ago, so it is waiting on them and there is nothing for me to do until a week has passed.
- **Next action:** [waiting] Waiting on goderbauer to review this PR.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue in a repository I maintain, filed by a key collaborator (kevmoo), which I explicitly assigned to myself. I scoped out the requirements and gathered examples recently, so it represents active planned work on my plate. Since no one is blocked waiting on an immediate reply, it sits comfortably in the planned work range (0.50-0.65).
- **Next action:** [todo] Implement the RetryRunner and RequestOptions wiring in ServiceClient and harden ServiceException parsing.

### 18. dart-lang/http#2031 → predicted 25, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is stacked on PR #2014, which is still unreviewed and awaiting my review. Furthermore, I have an explicit note stating I am not responsible for package:http2. The lower PR in the stack needs to be reviewed and landed first before this release bump can proceed.
- **Next action:** [elsewhere] Review lower PR dart-lang/http#2014 before reviewing this release preparation PR.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in googleapis/google-cloud-dart, created and converted to draft 45 days ago with no subsequent activity. Only a bot has commented, so nobody is waiting on me. Per guidance, my own draft PRs that need to be finished or abandoned fall into the 0.15-0.35 range.
- **Next action:** [todo] Finish developing the DNS client support or close this stale draft PR.

### 20. dart-lang/core#1007 → predicted 28, priority 0.05
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This pull request is in dart-lang/core, which is not one of my primary repositories. The review request is only to dart-ecosystem-team rather than to me directly, and the author has not yet signed the Google CLA. There is no action for me here.
- **Next action:** [not_yours] None, as this is a team review request in a repository I do not manage and is blocked on the contributor signing the CLA.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** This is a PR in dart-lang/tools, a repository I am not responsible for, where a team review request was made to dart-ecosystem-team. Although it addresses a security concern (UNC path injection), lrhn is specifically requested and already actively reviewing it, with the PR currently waiting on the author (jonasfj) to respond to lrhn's comments.
- **Next action:** [not_yours] None; jonasfj and lrhn are actively handling this PR in dart-lang/tools.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still in draft state and unreviewed. Furthermore, this is in dart-lang/tools (which is not one of my core assigned repos) with only a generic team review request to dart-ecosystem-team. The base PR must be resolved before this can be reviewed.
- **Next action:** [elsewhere] Review draft PR dart-lang/tools#2563 first, as this PR is stacked on it.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request in dart-lang/native, which I recently opened and requested review from liamappelbe 2 days ago. Since it has only been a couple of days, there is nothing for me to do until a reviewer responds or roughly a week of silence passes.
- **Next action:** [waiting] Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 13, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I am responsible for. Sigurd already approved the Pub/Sub portion, and I asked him 4 days ago whether he reviewed the rest or if we still need Nate's review. Since I asked a direct question to a collaborator recently, it is currently waiting on his response.
- **Next action:** [waiting] Waiting on sigurdm's reply regarding whether the PR is ready to merge without natebosch's review.

### 25. dart-lang/http#579 → predicted 26, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is explicitly tagged with 'next-breaking-release'. As noted in previous comments, it cannot land until a major version bump is coordinated, making it a low-priority backlog item until that milestone is actively scheduled.
- **Next action:** [backlog] Keep on hold until planning and work for the next breaking major release of package:http begins.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is an active PR (#2034) open by me that directly addresses and closes this bug. Per the guidelines, when an issue has an open PR fixing it, the PR is the primary item to act on, keeping the issue in the 0.15-0.35 range. The recent comments from users asking for updates don't require separate action here while the PR is in flight.
- **Next action:** [elsewhere] Focus on PR dart-lang/http#2034 which fixes this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, a repository I am not responsible for. I was only CC'd over two years ago for informational context regarding HTTP profiling in Dart. There is no question or request directed to me, so there is nothing for me to do.
- **Next action:** [not_yours] None; this is an informational mention in flutter/devtools with no action requested of me.

### 28. dart-lang/http#1837 → predicted 31, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You previously responded explaining that the Dart team is not planning to implement this and tagged it as contributions-welcome / P3. It has been dormant for a year with no further activity or contributions. It remains in the low-priority backlog with nothing actionable required from you.
- **Next action:** [backlog] None; keep in the backlog for community contributions.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this PR two days ago, and there have been no new commits or comments since. It is completely done as far as I am concerned and waiting on the author to merge.
- **Next action:** [not_yours] None; approved and waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** You have explicitly stated in your notes that you are not responsible for http2 in dart-lang/http. Additionally, you are not assigned, mentioned, or asked to act here. This is outside your stated scope and requires no attention.
- **Next action:** [not_yours] None, as this issue concerns package:http2 which is explicitly out of scope.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. While my collaborator kevmoo authored it, my team dart-ecosystem-team was requested alongside a specific individual reviewer (davidmorgan). Because a specific reviewer is assigned in a repo I do not own, there is no action for me.
- **Next action:** [not_yours] None; davidmorgan is directly requested to review this PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, the author has directly addressed mosuem for review. There is no action for me here.
- **Next action:** [not_yours] None; this is in http2, which is outside my scope, and the author specifically pinged mosuem.

### 33. dart-lang/native#3653 → predicted 34, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and actively discussed by liamappelbe, mkustermann, and mraleph. I previously shared an experimental observation, but nobody has asked me for follow-up or assigned anything to me. There is no action required from me.
- **Next action:** [not_yours] None; liamappelbe is driving this investigation in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** This issue has an open PR (dart-lang/http#1974) attempting to fix it, so any action belongs there rather than on the issue itself. Furthermore, the issue has a 'needs-info' label where I asked clarifying questions 8 days ago and received no response. Items waiting on reporter info with open PRs warrant a 0.0 score.
- **Next action:** [elsewhere] Act on PR #1974 instead of this issue.

### 35. dart-lang/http#1841 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This issue is covered by an open pull request (PR #2002) that implements the proposed change. Action should take place on the PR rather than the issue itself. Furthermore, I previously marked this issue with a thumbs-down, confirming there is no direct work needed on the issue thread.
- **Next action:** [elsewhere] Review open PR dart-lang/http#2002 which addresses this issue.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.65
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You previously assigned this issue to yourself in dart-lang/sdk. Although you marked it with a thumbs-down earlier in the year, filiph posted a fresh comment asking how to help reproduce and hunt down the bug, requiring a response from you to move it forward.
- **Next action:** [respond] Reply to filiph offering guidance on reproducing or investigating the Directory.deleteSync issue.
