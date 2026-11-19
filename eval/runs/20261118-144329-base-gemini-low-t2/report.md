# Gitilizer eval: base-gemini-low-t2

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-144329

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.702 ± 0.000 |
| spearman | 0.822 ± 0.000 |
| pairwise_acc | 0.851 ± 0.000 |
| ndcg | 0.985 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 3.833 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.867 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 0.875 ± 0.000 |
| B | 20 | 0.558 ± 0.000 | 0.969 ± 0.000 | 0.600 ± 0.000 | 3.300 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Assess the security concern regarding certificate revocation/blocklists on Android and update or resolve the issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on bump.go and address the CHANGELOG handling. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR adding client attribution and pre-release polish. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR fixing RPC error code handling over REST. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's proposed enum design snippet and reply with feedback. |
| 6 | 7.0 (7) | +1.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | Work on design or implementation for tightening Client.close semantics, or solicit feedback from collaborators. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Implement the server trust evaluation hook for CupertinoClient as committed. |
| 8 | 12.0 (12) | +4.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#360 | A | Plan a fix or investigate streaming JSON and error frame handling in _makeStreamingRequest. |
| 9 | 11.0 (11) | +2.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | Investigate HTTP header parsing in dart:io and fix invalid character handling, or unassign if not working on it. |
| 10 | 14.0 (14) | +4.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | None; issue is an old informational CC in dart-lang/sdk with no recent activity. |
| 12 | 18.0 (18) | +6.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Follow up on PR #3763 which fixes this issue. |
| 13 | 9.0 (9) | -4.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on the automation approach or update the dependency constraints in pubspec.yaml for storage and pubsub. |
| 14 | 20.0 (20) | +6.0 | 0.18 | 0/1 | dart-lang/tools#2719 | B | Wait for another dart-ecosystem-team member to review this automated BoringSSL update. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting directly on this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for goderbauer to review the pull request. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient and update code generation |
| 18 | 25.0 (25) | +7.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | Wait for lower stacked PRs to be reviewed and merged before reviewing this release PR. |
| 19 | 19.0 (19) | +0.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Resume work to fix conflicts and address comments, or close the draft PR. |
| 20 | 21.0 (21) | +1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Wait for author to sign the CLA and for a maintainer of dart-lang/core to review. |
| 21 | 31.0 (31) | +10.0 ⚠️ | 0.04 | 0/1 | dart-lang/tools#2544 | B | Waiting on jonasfj to address lrhn's review comments. |
| 22 | 24.0 (24) | +2.0 | 0.08 | 0/1 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and landed before reviewing this stacked PR. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 13.0 (13) | -11.0 ⚠️ | 0.40 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to confirm if the PR is good to merge or if natebosch needs to review. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Leave PR parked until a major semver breaking release of package:http is planned. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | Act on open fix PR #2034 instead of this issue. |
| 27 | 28.0 (28) | +1.0 | 0.05 | 0/1 | flutter/devtools#8223 | B | None; waiting on the DevTools team or bkonyi to respond. |
| 28 | 30.0 (30) | +2.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | Waiting for community contribution or external updates. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue is outside my area of responsibility. |
| 31 | 27.0 (27) | -4.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the PR. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on mosuem to review the PR. |
| 33 | 29.0 (29) | -4.0 | 0.05 | 0/1 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide next steps or close the issue. |
| 34 | 35.0 (35) | +1.0 | 0.00 | 0/1 | dart-lang/http#1972 | B | Waiting for reporter to provide reproduction details in response to my questions. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | Review the linked PR #2002 instead of acting on this issue. |
| 36 | 10.0 (10) | -26.0 ⚠️ | 0.55 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph offering steps to gather reproduction details or investigate the issue. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#345** (truth #19) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue assigned to me in Dart SDK where disabled or untrusted CAs on Android continue to be trusted. A serious security incident (compromised intermediate CAs) was recently brought up here, asking whether Dart's lack of platform trust evaluation leaves Android users vulnerable to impersonation attacks. Per policy, security issues assigned to me with fresh activity require immediate attention regardless of P3 label or age.
- **Next action:** Assess the security concern regarding certificate revocation/blocklists on Android and update or resolve the issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your own open PR fixing an issue in google-cloud-dart tooling. Your collaborator kevmoo reviewed it less than a day ago and raised an unresolved question blocking progress. You need to answer his feedback so this PR can move forward.
- **Next action:** Reply to kevmoo's review comment on bump.go and address the CHANGELOG handling.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for, authored by my close collaborator sigurdm. As the default reviewer, it is on me to review it. Since bots don't count and no human review has taken place yet, this belongs in the high collaborator review range (0.65-0.8).
- **Next action:** Review sigurdm's PR adding client attribution and pre-release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for where I serve as the default reviewer. It addresses a real bug affecting RPC status codes and retry logic. Since it is from a first-time contributor and ready for human review, it belongs in the 0.65-0.8 review range.
- **Next action:** Review this PR fixing RPC error code handling over REST.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue in a repository I own (google-cloud-dart) that I originally filed. A contributor has done the research and posted a concrete design proposal asking to confirm the approach before coding, waiting on my response. Replying promptly keeps an active outside contributor unblocked on a non-trivial improvement.
- **Next action:** Review Yusufihsangorgel's proposed enum design snippet and reply with feedback.

### 6. dart-lang/http#2027 → predicted 7, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue yourself in dart-lang/http outlining planned architectural work around Client.close semantics. Because you own this area and created the issue within the past 10 days with no blockers waiting on others, it represents your own planned work. As it ages without external activity, it will gradually decrease in priority.
- **Next action:** Work on design or implementation for tightening Client.close semantics, or solicit feedback from collaborators.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue to yourself and publicly stated you started working on it. As active planned work in a repository you maintain, it represents a concrete commitment on your plate.
- **Next action:** Implement the server trust evaluation hook for CupertinoClient as committed.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, and was filed by my close collaborator kevmoo. He replied to my question clarifying his thoughts and confirming this is a hole we should address, though not urgent. Since the ball is back in my court to decide on or implement the fix, it represents planned work in my repo.
- **Next action:** Plan a fix or investigate streaming JSON and error frame handling in _makeStreamingRequest.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue in dart-lang/sdk regarding HTTP header parsing bugs (including accepting NUL and control characters). While accepting invalid characters has security and request-smuggling implications, there has been no new activity in 22 months. As an assigned issue on your plate, you should either schedule the fix or unassign yourself.
- **Next action:** Investigate HTTP header parsing in dart:io and fix invalid character handling, or unassign if not working on it.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue filed by my close collaborator kevmoo in a repository I am responsible for (googleapis/google-cloud-dart). I left the last comment asking a question about API design tradeoffs 16 days ago, so the ball is currently in kevmoo's court to respond before further action can be taken.
- **Next action:** Waiting on kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was CC'd by parlough and my collaborator kevmoo over two years ago as the owner of the library, regarding an uncatchable exception in dart:io. However, this is in dart-lang/sdk (not one of my directly managed repositories like dart-lang/http), no direct action was assigned or committed by me, and the thread has been dormant for over a year and a half. As an old but important issue where I was only CC'd, it sits in the lower-priority informational tier.
- **Next action:** None; issue is an old informational CC in dart-lang/sdk with no recent activity.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** I filed and am assigned to this issue, but I have already authored an open PR (dart-lang/native#3763) addressing it. Per instructions, when an open PR covers an issue, action shifts to the PR and the issue's priority drops to the 0.15–0.35 range.
- **Next action:** Follow up on PR #3763 which fixes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.55
- **Ground truth:** 
- **Model:** This issue is in a repository I maintain, filed by my close collaborator Sigurd, detailing release prereqs before publishing storage and pubsub packages. My last comment indicated I was considering general automation solutions, meaning the ball is in my court to either implement the mechanical fix or decide on the tooling approach. It is not an urgent blocker or security issue, placing it squarely in the planned work range.
- **Next action:** Decide on the automation approach or update the dependency constraints in pubspec.yaml for storage and pubsub.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.18
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not primarily responsible for, and the review request is to the shared dart-ecosystem-team rather than me directly. While BoringSSL updates are related to crypto/security dependencies, automated dependency rolls without a specific vulnerability callout or personal assignment are low priority for me. Someone else on the team can review and merge it.
- **Next action:** Wait for another dart-ecosystem-team member to review this automated BoringSSL update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for. However, there is an open PR (#382) covering this fix, so the review should happen on the PR itself rather than on this issue. Following instructions for duplicate issue/PR pairs, the issue priority is reduced to the 0.15-0.35 range.
- **Next action:** Review PR #382 instead of acting directly on this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your own pull request in dart-lang/http, where you requested a review from goderbauer only two days ago. Since it hasn't been roughly a week yet, there is no need to ping or take further action right now. It sits low on your priority list while waiting for the reviewer.
- **Next action:** Wait for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I own (googleapis/google-cloud-dart) filed by a close collaborator (kevmoo). I recently scoped the issue and researched retry patterns in other SDKs, making this active planned work for me to implement.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient and update code generation

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release PR is stacked on other unreviewed PRs in the stack (such as #2014). Additionally, http2 is noted as an area I am not responsible for, although I am directly requested by collaborator mosuem. Until the underlying PRs land, there is nothing actionable to do here.
- **Next action:** Wait for lower stacked PRs to be reviewed and merged before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in googleapis/google-cloud-dart that has been dormant for 45 days and has merge conflicts. Because it is an uncompleted draft of my own, it falls in the 0.15-0.35 range for stale drafts I should either finish or abandon. Nobody else is waiting on it.
- **Next action:** Resume work to fix conflicts and address comments, or close the draft PR.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a PR in dart-lang/core, which is not one of my primary repositories. The review request is directed broadly to dart-ecosystem-team rather than me personally, and the contributor has not yet signed the CLA. Therefore, it requires no direct action from me right now.
- **Next action:** Wait for author to sign the CLA and for a maintainer of dart-lang/core to review.

### 21. dart-lang/tools#2544 → predicted 31, priority 0.04
- **Ground truth:** 
- **Model:** Although this addresses a security vulnerability (UNC path injection), it is in dart-lang/tools, a repository I am not responsible for, and was only assigned to my team rather than to me individually. Furthermore, lrhn is actively reviewing it and left detailed feedback 2 months ago that the author (jonasfj) has not yet addressed. There is nothing for me to do.
- **Next action:** Waiting on jonasfj to address lrhn's review comments.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still in draft state and unreviewed. Furthermore, it is in dart-lang/tools where you are not specifically assigned or personally requested (only via the team dart-ecosystem-team). Stacked PRs whose base branches are not yet reviewed should wait.
- **Next action:** Wait for base PR #2563 to be reviewed and landed before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request in dart-lang/native, which I recently opened and requested review from liamappelbe 2 days ago. Since it is waiting on reviewer feedback and less than a week has passed, there is nothing for me to do right now.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 13, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in googleapis/google-cloud-dart, which has already received an approval from collaborator sigurdm. I recently asked sigurdm whether he looked at the non-PubSub parts and if we can merge without natebosch's review, so I am currently waiting on his response. Because it's an active PR of mine in my own repository waiting on a response from a close collaborator from 4 days ago, it remains moderately visible.
- **Next action:** Wait for sigurdm to confirm if the PR is good to merge or if natebosch needs to review.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is labeled 'next-breaking-release'. I explicitly stated two years ago that landing this must be coordinated with a major version bump when bandwidth permits, and there is no active work or request requiring immediate action on it now.
- **Next action:** Leave PR parked until a major semver breaking release of package:http is planned.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is already an open PR (#2034) authored by me addressing this exact namespace duplication bug. Following the instructions to avoid duplicate effort, issues with open fixing PRs should be ranked low (0.15–0.35) and action taken directly on the PR. Users are pinging for updates, but the next concrete action is progressing the PR.
- **Next action:** Act on open fix PR #2034 instead of this issue.

### 27. flutter/devtools#8223 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This is an issue in flutter/devtools, a repository I am not responsible for. I was only mentioned over two years ago as an informational CC by bkonyi regarding HTTP profiling considerations. There is no direct request or action required of me.
- **Next action:** None; waiting on the DevTools team or bkonyi to respond.

### 28. dart-lang/http#1837 → predicted 30, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old P3 enhancement request where I explicitly stated the Dart team will not take it on and marked it as open to community contributions. There has been no subsequent activity or response since my comment. It sits in the low-priority backlog with nothing actionable for me.
- **Next action:** Waiting for community contribution or external updates.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already approved this PR and there has been no new activity or commits since. The next step is on the author (mosuem) to land it, so there is nothing for me to do.
- **Next action:** Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is filed against http2, which is explicitly noted as outside my area of responsibility in dart-lang/http ('not responsible for http2'). I am neither assigned nor mentioned, and there is nothing for me to do.
- **Next action:** None; this issue is outside my area of responsibility.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not one of my primary responsible repositories. Although authored by my collaborator kevmoo, davidmorgan was explicitly requested as an individual reviewer alongside the dart-ecosystem-team. Team review requests in repos I do not own where another specific person is requested are very low priority.
- **Next action:** Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for the `http2` package in `dart-lang/http`. Furthermore, the author specifically requested a review from mosuem, so this PR is entirely out of my scope and does not require my attention.
- **Next action:** Waiting on mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 29, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and it is assigned to and driven by liamappelbe. Although I contributed to earlier technical discussion, the conversation is currently between liamappelbe and mraleph regarding compiler/VM intricacies, with no pending questions or action required from me.
- **Next action:** Waiting on liamappelbe to decide next steps or close the issue.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** I asked questions to clarify the issue and marked it with 'needs-info'. The reporter has not replied yet. Furthermore, an external PR (#1974) has been opened to address this issue, meaning any active review work should happen on the PR rather than this issue.
- **Next action:** Waiting for reporter to provide reproduction details in response to my questions.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05, and no new direct activity or mentions targeting you have occurred since. Additionally, there is an open PR (#2002) addressing this issue, so any attention belongs on the PR rather than the issue itself.
- **Next action:** Review the linked PR #2002 instead of acting on this issue.

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am assigned to this issue in the Dart SDK, and filiph recently reported a reliable local reproduction on macOS arm64 asking how to help hunt it down. Although I marked this thumbs-down previously, filiph's actionable new information occurred afterward. As an assigned issue that now has a reproduction lead, I should either follow up with filiph or unassign myself.
- **Next action:** Reply to filiph offering steps to gather reproduction details or investigate the issue.
