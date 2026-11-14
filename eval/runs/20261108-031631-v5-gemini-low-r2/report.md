# Gitilizer eval: v5-gemini-low-r2

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031631

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.708 ± 0.017 |
| spearman | 0.826 ± 0.013 |
| pairwise_acc | 0.854 ± 0.008 |
| ndcg | 0.985 ± 0.002 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.778 ± 0.255 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.867 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 0.875 ± 0.000 |
| B | 20 | 0.575 ± 0.030 | 0.965 ± 0.004 | 0.600 ± 0.000 | 3.100 ± 0.265 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 3/3 | dart-lang/sdk#48056 | A | Evaluate the security impact of disabled/compromised CAs on Android and determine if #64644 addresses the concerns raised or if further action is needed. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment regarding CHANGELOG handling in librarian generate. |
| 3 | 3.0 (3) | +0.0 | 0.76 | 3/3 | googleapis/google-cloud-dart#376 | A | Review this PR from collaborator sigurdm in google-cloud-dart. |
| 4 | 5.0 (5) | +1.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR for handling google.rpc.Code in ServiceException. |
| 5 | 4.0 (4) | -1.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#252 | B | Review and reply to Yusufihsangorgel's proposed API design for ProtoEnum representation. |
| 6 | 7.3 (7–8) | +1.3 | 0.57 | 3/3 | dart-lang/http#2027 | B | Design and implement the proposed changes to Client.close semantics or draft an API proposal for the 2.0 release. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 3/3 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in CupertinoClient as promised. |
| 8 | 9.7 (9–10) | +1.7 | 0.53 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide on an approach for handling mid-stream SSE errors and non-SSE streaming in google_cloud_rpc, or implement the fix. |
| 9 | 12.0 (12) | +3.0 | 0.50 | 3/3 | dart-lang/sdk#59846 | B | Investigate the RFC 9110 compliance violation in dart:io header parsing and either implement a fix or reassign the issue. |
| 10 | 13.3 (13–14) | +3.3 | 0.39 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to respond to my question regarding switching to discovery versus adding convenience extensions. |
| 11 | 14.7 (14–15) | +3.7 | 0.35 | 0/3 | dart-lang/sdk#31275 | A | None; wait for someone to revive or pick up the abandoned Gerrit CL to fix this dart:io issue. |
| 12 | 17.3 (16–19) | +5.3 | 0.23 | 0/3 | dart-lang/native#3752 | B | Follow up on open PR #3763 instead of this issue. |
| 13 | 11.0 (11) | -2.0 | 0.52 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide on the automation approach or update the dependency constraints in pubspec.yaml for storage and pubsub. |
| 14 | 18.3 (17–19) | +4.3 | 0.18 | 0/3 | dart-lang/tools#2719 | B | Wait for another member of dart-ecosystem-team to review this automated dependency update. |
| 15 | 15.7 (15–16) | +0.7 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review open PR #382 which addresses this issue instead of acting on the issue itself. |
| 16 | 21.3 (20–22) | +5.3 | 0.10 | 0/3 | dart-lang/http#2034 | B | Waiting for goderbauer to review the pull request. |
| 17 | 7.7 (7–8) | -9.3 ⚠️ | 0.57 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement RetryRunner and RequestOptions wiring in ServiceClient and harden ServiceException parsing against HTML responses. |
| 18 | 26.3 (25–27) | +8.3 | 0.06 | 0/3 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (specifically #2014) to be reviewed and merged. |
| 19 | 19.3 (18–20) | +0.3 | 0.17 | 3/3 | googleapis/google-cloud-dart#345 | A | Resume work on this draft PR to finish it or decide whether to abandon it. |
| 20 | 21.7 (21–23) | +1.7 | 0.13 | 0/3 | dart-lang/core#1007 | B | Waiting for the author to sign the CLA and for a primary maintainer to review. |
| 21 | 30.0 (30) | +9.0 ⚠️ | 0.05 | 0/3 | dart-lang/tools#2544 | B | Wait for jonasfj to address review comments from lrhn. |
| 22 | 23.3 (22–24) | +1.3 | 0.09 | 0/3 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR. |
| 23 | 22.3 (21–23) | -0.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 17.0 (13–24) | -7.0 | 0.28 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to reply regarding whether the PR is good to merge without natebosch. |
| 25 | 25.3 (25–26) | +0.3 | 0.08 | 0/3 | dart-lang/http#579 | B | Wait for a planned major breaking release of package:http before moving forward. |
| 26 | 17.7 (17–18) | -8.3 | 0.20 | 0/3 | dart-lang/http#1932 | B | Follow up on open PR #2034 which addresses this issue. |
| 27 | 28.0 (28) | +1.0 | 0.05 | 0/3 | flutter/devtools#8223 | B | None; this is an issue in flutter/devtools where I was only CC'd over two years ago. |
| 28 | 32.0 (32) | +4.0 | 0.05 | 0/3 | dart-lang/http#1837 | A | Waiting for community contribution as indicated by the contributions-welcome label. |
| 29 | 34.0 (34) | +5.0 | 0.00 | 0/3 | dart-lang/http#2033 | A | Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | None; this issue belongs to package:http2 which is outside my scope of responsibility. |
| 31 | 26.3 (26–27) | -4.7 | 0.05 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the PR. |
| 32 | 33.0 (33) | +1.0 | 0.00 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem to review the PR. |
| 33 | 29.0 (29) | -4.0 | 0.05 | 0/3 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide next steps or close the issue. |
| 34 | 31.0 (31) | -3.0 | 0.05 | 0/3 | dart-lang/http#1972 | B | Waiting for the reporter to provide reproduction details in response to my questions. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/3 | dart-lang/http#1841 | B | Wait for or review the linked pull request dart-lang/http#2002 instead of acting on this issue. |
| 36 | 9.3 (9–10) | -26.7 ⚠️ | 0.55 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's offer to provide reproduction details or unassign myself if I'm not actively working on this. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an assigned security issue regarding certificate trust and handling on Android, which has received urgent new activity 3 days ago concerning compromised intermediate CAs. Security issues in code I own or am assigned take precedence over all other tasks regardless of age or P3 labeling. I must review the recent activity and related fix (#64644) to confirm whether our handling is secure or requires action.
- **Next action:** Evaluate the security impact of disabled/compromised CAs on Android and determine if #64644 addresses the concerns raised or if further action is needed.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my open PR addressing an issue in googleapis/google-cloud-dart. My collaborator kevmoo left substantive review feedback 21 hours ago that is waiting on my reply/action before the PR can proceed. Since my own work is stalling on feedback, it warrants high priority.
- **Next action:** Reply to kevmoo's review comment regarding CHANGELOG handling in librarian generate.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.77
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR opened 5 days ago by my close collaborator sigurdm in a repository I am responsible for (googleapis/google-cloud-dart). As the default reviewer for this repo, reviewing PRs from collaborators takes priority over standard backlog and unassigned items. No human has reviewed it yet, so the ball is in my court.
- **Next action:** Review this PR from collaborator sigurdm in google-cloud-dart.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I am responsible for. As the default reviewer for this repo, reviewing incoming contributions is on me. The author is a first-time contributor and the PR is 3 days old, putting it comfortably in the 0.65–0.8 range.
- **Next action:** Review this PR for handling google.rpc.Code in ServiceException.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue in googleapis/google-cloud-dart, a repository I am responsible for. A contributor followed my suggestion to share an API design before writing code, and they have presented a concrete proposal 4 days ago. They are waiting on my feedback to proceed with the implementation.
- **Next action:** Review and reply to Yusufihsangorgel's proposed API design for ProtoEnum representation.

### 6. dart-lang/http#2027 → predicted 7, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is an issue I filed myself 9 days ago in a core repository I am responsible for (dart-lang/http). Since it was created within the last two weeks and nothing is blocking it or waiting on anyone else, it represents fresh planned work. It falls comfortably in the 0.5–0.65 range as a fresh commitment.
- **Next action:** Design and implement the proposed changes to Client.close semantics or draft an API proposal for the 2.0 release.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented 5 hours ago that I have started working on it. This represents fresh, active planned work on a repository I maintain, placing it squarely in the 0.5–0.65 range.
- **Next action:** Work on implementing the server trust evaluation hook in CupertinoClient as promised.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I maintain (google-cloud-dart) filed by a close collaborator (kevmoo). kevmoo replied to my question clarifying his thoughts, leaving the ball in my court to decide whether to implement the fix. Since kevmoo noted it is not urgent and there hasn't been activity in over two weeks, it sits in the planned work range.
- **Next action:** Decide on an approach for handling mid-stream SSE errors and non-SSE streaming in google_cloud_rpc, or implement the fix.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is a bug assigned to me in dart-lang/sdk regarding HTTP header validation (accepting NUL and invalid characters) in dart:io. Assigned issues that I should either fix or unassign fall in the 0.5–0.65 range. Because it is dormant with no activity in nearly two years (22 months), it sits at the bottom of that range.
- **Next action:** Investigate the RFC 9110 compliance violation in dart:io header parsing and either implement a fix or reassign the issue.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in a repository I own (googleapis/google-cloud-dart) and involves my close collaborator kevmoo. My last comment asked a direct question weighing architectural alternatives (proto with extensions vs discovery), so the ball is currently in kevmoo's court to reply. Since I am waiting on an answer in my own repo and it has been quiet for two weeks, it falls in the 0.35–0.5 range.
- **Next action:** Wait for kevmoo to respond to my question regarding switching to discovery versus adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an important bug in dart:io causing uncaught crashes, and collaborator kevmoo CC'd me over two years ago mentioning that I own the library. However, dart-lang/sdk is not one of my primary assigned repos, there is no direct actionable question or review requested of me today, and the issue has been completely dormant for over 20 months. Because it represents an important issue where I was explicitly CC'd as library owner, it stays at the lower boundary of the 0.35-0.5 informational CC range.
- **Next action:** None; wait for someone to revive or pick up the abandoned Gerrit CL to fix this dart:io issue.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** You authored and are assigned to this issue, but you have already opened PR #3763 to address it. Under the rule to avoid duplicates, when an open PR covers an issue, the action is on the PR rather than the issue itself. This issue is kept in the 0.15–0.35 range.
- **Next action:** Follow up on open PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.52
- **Ground truth:** 
- **Model:** This issue is in a repository I maintain (google-cloud-dart) and was filed by a close collaborator (sigurdm). I was the last to comment 17 days ago indicating I was considering how to address this systematically, so the next step remains on me. Because it represents planned dependency maintenance work rather than an urgent bug, and has been quiet for a couple of weeks, it sits in the middle planned-work range.
- **Next action:** Decide on the automation approach or update the dependency constraints in pubspec.yaml for storage and pubsub.

### 14. dart-lang/tools#2719 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated pull request in dart-lang/tools, a repository I am not directly responsible for. The review request is directed generically to the dart-ecosystem-team rather than me personally. As such, it sits in the low-priority team review request tier (0.15–0.35).
- **Next action:** Wait for another member of dart-ecosystem-team to review this automated dependency update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is covered by an open pull request (#382) created by the author to fix the bug. Per guidelines, when an open PR covers an issue, the action belongs on the PR and the issue itself ranks in the 0.15–0.35 range. I am responsible for googleapis/google-cloud-dart, but my attention should be directed to reviewing PR #382.
- **Next action:** Review open PR #382 which addresses this issue instead of acting on the issue itself.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your own pull request where you requested a review from goderbauer only 2 days ago. Since less than a week has passed and there is no new feedback or blocker on your side, there is nothing for you to do right now. It belongs in the 0.05–0.15 range for PRs waiting on a recently asked reviewer.
- **Next action:** Waiting for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I own (googleapis/google-cloud-dart), filed by a key collaborator (kevmoo). I recently scoped the work down and gathered design examples 10 days ago, making it active planned work on my plate. It is ready for implementation without blocking dependencies.
- **Next action:** Implement RetryRunner and RequestOptions wiring in ServiceClient and harden ServiceException parsing against HTML responses.

### 18. dart-lang/http#2031 → predicted 27, priority 0.05
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is stacked on multiple earlier PRs, one of which (#2014) is still unreviewed. Furthermore, it belongs to package:http2, for which I have noted I am not responsible. Therefore, reviewing this release PR is neither urgent nor actionable right now.
- **Next action:** Wait for lower PRs in the stack (specifically #2014) to be reviewed and merged.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.16
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in googleapis/google-cloud-dart, which falls into the 0.15–0.35 range for my own drafts to finish or abandon. Having converted it to draft 45 days ago with no subsequent activity and merge conflicts (dirty state), it has aged significantly and sits near the bottom of that range.
- **Next action:** Resume work on this draft PR to finish it or decide whether to abandon it.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, a repository I am not directly responsible for, and the review request is to the entire dart-ecosystem-team rather than to me personally. Furthermore, the author is a first-time contributor who has not yet signed the Google CLA. Team review requests in repositories outside my core responsibility sit in the 0.15-0.25 range, dipping lower here due to the CLA blocker.
- **Next action:** Waiting for the author to sign the CLA and for a primary maintainer to review.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** Although this addresses a security issue (UNC path injection), it is in dart-lang/tools, a repository I am not responsible for. Additionally, only my team was requested, another reviewer (lrhn) is already actively reviewing it, and it is currently waiting on the author (jonasfj) to respond to feedback from two months ago.
- **Next action:** Wait for jonasfj to address review comments from lrhn.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on PR #2563, which is still a draft and unreviewed, meaning the lower PR must be handled first. Additionally, this is in dart-lang/tools (which is not one of your owned repositories) and the review was requested only to the team dart-ecosystem-team rather than to you individually.
- **Next action:** Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, where I requested a review from liamappelbe only 2 days ago. Since it is waiting on a recently requested reviewer, there is nothing for me to do until they respond or about a week passes.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.35
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own open PR in googleapis/google-cloud-dart. sigurdm has approved the PR, but I asked him 4 days ago whether he reviewed the non-PubSub parts and if we can merge without natebosch. Since I am waiting on his answer before proceeding, there is no action for me right now.
- **Next action:** Wait for sigurdm to reply regarding whether the PR is good to merge without natebosch.

### 25. dart-lang/http#579 → predicted 25, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR carries the 'next-breaking-release' label and is explicitly blocked until a future semver-major release. You stated two years ago that this must be coordinated with a major release and that you did not have bandwidth to work on it, and there has been no actionable activity since.
- **Next action:** Wait for a planned major breaking release of package:http before moving forward.

### 26. dart-lang/http#1932 → predicted 18, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by an active pull request (PR #2034) that I recently worked on to fix the namespace duplication. According to the instructions, when an open PR covers an issue, the PR is the primary item to act on, and the issue itself should be ranked significantly lower (in the 0.15–0.35 range). Recent comments are just community members asking for updates, which does not create new direct work on the issue itself.
- **Next action:** Follow up on open PR #2034 which addresses this issue.

### 27. flutter/devtools#8223 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, a repository I am not responsible for. I was casually CC'd by bkonyi over two years ago regarding profiling implications, and no action or response was requested from me. Recent activity consists only of triaging and a GSoC question directed to someone else.
- **Next action:** None; this is an issue in flutter/devtools where I was only CC'd over two years ago.

### 28. dart-lang/http#1837 → predicted 32, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You previously responded explaining that the Dart team is unlikely to build this feature and labeled it P3 and contributions-welcome. There has been no activity for a year. With no action required from you, it belongs in the low-priority backlog.
- **Next action:** Waiting for community contribution as indicated by the contributions-welcome label.

### 29. dart-lang/http#2033 → predicted 34, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I reviewed and approved this PR 2 days ago, and there have been no new commits or comments since. As stated in the guidelines, an approved PR with nothing happening since is done as far as I am concerned and scores at or near 0.
- **Next action:** Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is labeled 'package:http2' within dart-lang/http, and my repository notes explicitly state that I am not responsible for http2. Furthermore, I am not assigned or mentioned, and there has been no recent activity requiring my attention. Therefore, it requires no action from me and scores 0.0.
- **Next action:** None; this issue belongs to package:http2 which is outside my scope of responsibility.

### 31. dart-lang/tools#2715 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. While authored by my collaborator kevmoo, the review request was directed to the dart-ecosystem-team along with an explicit individual reviewer (davidmorgan). Because an individual reviewer is assigned in a non-owned repository, my personal involvement is not required.
- **Next action:** Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 33, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for the http2 package in dart-lang/http. Additionally, the author has directly addressed mosuem for review, meaning there is no action required from me.
- **Next action:** Wait for mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 29, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and actively driven by liamappelbe. I previously contributed experimental context, but there is no question or action waiting on me, and the discussion has concluded that the feature may not even be worth pursuing.
- **Next action:** Waiting on liamappelbe to decide next steps or close the issue.

### 34. dart-lang/http#1972 → predicted 31, priority 0.05
- **Ground truth:** 
- **Model:** I asked the reporter for information and applied the 'needs-info' label 8 days ago, and there has been no reply yet. Furthermore, there is an open PR (#1974) covering this issue. There is nothing for me to do on this issue until the reporter responds.
- **Next action:** Waiting for the reporter to provide reproduction details in response to my questions.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You gave this issue a thumbs-down on 2026-10-05, and no new activity directed at you has occurred since then. Additionally, an open pull request (#2002) already addresses this enhancement and holds the actual work. As a result, this issue requires no action from you right now.
- **Next action:** Wait for or review the linked pull request dart-lang/http#2002 instead of acting on this issue.

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am assigned to this issue in dart-lang/sdk, and after I thumbs-downed it in August, a contributor recently commented reporting they can reliably reproduce the issue on macOS and asked how to help hunt it down. Assigned issues that have new useful information require me to either investigate, guide the contributor, or unassign myself. Because this is an old assigned issue with fresh actionable input from after the thumbs-down, it sits in the 0.5–0.65 range.
- **Next action:** Reply to filiph's offer to provide reproduction details or unassign myself if I'm not actively working on this.
