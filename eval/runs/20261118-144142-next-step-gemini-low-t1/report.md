# Gitilizer eval: next-step-gemini-low-t1

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-144142

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.648 ± 0.000 |
| spearman | 0.755 ± 0.000 |
| pairwise_acc | 0.824 ± 0.000 |
| ndcg | 0.976 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 4.611 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.421 ± 0.000 | 0.913 ± 0.000 | 0.600 ± 0.000 | 4.200 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | [todo] Investigate whether Dart on Android properly blocks revoked certificates and evaluate the impact of the eMudhra compromise. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | [respond] Reply to kevmoo's question regarding CHANGELOG handling in librarian generate and update the code accordingly. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | [review] Review sigurdm's PR adding client attribution headers and pre-release polish to google_cloud_pubsub. |
| 4 | 4.0 (4) | +0.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#382 | A | [review] Review the PR fixing error status codes in google_cloud_rpc. |
| 5 | 5.0 (5) | +0.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#252 | B | [respond] Review Yusufihsangorgel's proposed enum design sketch and confirm if they should proceed with a PR. |
| 6 | 9.0 (9) | +3.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | [todo] Design and propose the async Client.close change or prepare an implementation for package:http 2.0. |
| 7 | 7.0 (7) | +0.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | [todo] Implement the server trust evaluation hook in CupertinoClient as promised. |
| 8 | 10.0 (10) | +2.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | [todo] Decide whether to implement mid-stream error detection and incremental streaming in google_cloud_rpc or leave it as a backlog item. |
| 9 | 12.0 (12) | +3.0 | 0.50 | 1/1 | dart-lang/sdk#59846 | B | [todo] Investigate HTTP header name validation in dart:io and either fix it or unassign myself. |
| 10 | 14.0 (14) | +4.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | [waiting] Waiting on kevmoo to reply regarding whether to switch to discovery or add convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.38 | 1/1 | dart-lang/sdk#31275 | A | [backlog] Consider taking over and reviving the abandoned CL to fix uncatchable exceptions in dart:io HttpClient. |
| 12 | 18.0 (18) | +6.0 | 0.25 | 0/1 | dart-lang/native#3752 | B | [elsewhere] Act on PR dart-lang/native#3763 instead of this issue. |
| 13 | 11.0 (11) | -2.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#366 | B | [todo] Decide on the fix approach and update the dependency constraints in the pubspecs. |
| 14 | 21.0 (21) | +7.0 | 0.15 | 0/1 | dart-lang/tools#2719 | B | [not_yours] None, as this automated update was requested from the team in a repo I do not maintain. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | [elsewhere] Review PR googleapis/google-cloud-dart#382 which addresses this issue. |
| 16 | 23.0 (23) | +7.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | [waiting] Wait for goderbauer to review the PR. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.58 | 1/1 | googleapis/google-cloud-dart#359 | B | [todo] Implement RetryRunner and RequestOptions wiring in ServiceClient for google_cloud_rpc. |
| 18 | 26.0 (26) | +8.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | [elsewhere] Review PR #2014 first, which is lower in the stack. |
| 19 | 20.0 (20) | +1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | [todo] Resume work on this draft PR to add initial DNS support or close it if abandoned. |
| 20 | 22.0 (22) | +2.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | [not_yours] None, as dart-lang/core is not a repository I am responsible for and this is a general team review request. |
| 21 | 30.0 (30) | +9.0 ⚠️ | 0.05 | 0/1 | dart-lang/tools#2544 | B | [not_yours] None; lrhn is actively reviewing this PR from jonasfj in dart-lang/tools. |
| 22 | 25.0 (25) | +3.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | [elsewhere] Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 24.0 (24) | +1.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | [waiting] Wait for liamappelbe to review this PR. |
| 24 | 13.0 (13) | -11.0 ⚠️ | 0.45 | 0/1 | googleapis/google-cloud-dart#373 | B | [waiting] Wait for sigurdm to reply on whether he reviewed the non-PubSub parts and if the PR is good to merge. |
| 25 | 27.0 (27) | +2.0 | 0.08 | 1/1 | dart-lang/http#579 | B | [backlog] Wait for a coordinated major breaking release of package:http before revisiting this feature. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | [elsewhere] Act on PR #2034 instead, which addresses this issue. |
| 27 | 29.0 (29) | +2.0 | 0.05 | 0/1 | flutter/devtools#8223 | B | [not_yours] None, as this is an informational CC in flutter/devtools with no action requested of me. |
| 28 | 32.0 (32) | +4.0 | 0.05 | 1/1 | dart-lang/http#1837 | A | [backlog] Leave in backlog for community contributions or triage during grooming. |
| 29 | 34.0 (34) | +5.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | [not_yours] None; PR is already approved by me and waiting on mosuem to merge. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | [not_yours] None, as this issue concerns package:http2 which is outside my scope. |
| 31 | 28.0 (28) | -3.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | [not_yours] None, as davidmorgan was specifically requested to review this PR in a repository outside my responsibility. |
| 32 | 33.0 (33) | +1.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | [not_yours] None; this is in package:http2 and is explicitly addressed to mosuem. |
| 33 | 35.0 (35) | +2.0 | 0.00 | 0/1 | dart-lang/native#3653 | A | [not_yours] None; liamappelbe owns this issue in dart-lang/native and is deciding whether to pursue VM/trampoline changes. |
| 34 | 31.0 (31) | -3.0 | 0.05 | 0/1 | dart-lang/http#1972 | B | [elsewhere] Track PR #1974 which addresses this issue. |
| 35 | 19.0 (19) | -16.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1841 | B | [elsewhere] Review open PR dart-lang/http#2002 which implements this change. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.65 | 1/1 | dart-lang/sdk#38148 | B | [respond] Reply to filiph offering guidance on reproducing or investigating the recursive delete failure, or unassign myself. |

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
- **Model:** This is an assigned security issue concerning certificate trust and revocation on Android, specifically regarding compromised CA intermediate keys. Recent activity brings urgent attention to whether Dart applications are vulnerable to impersonation attacks despite OS-level revocations. Per the security instructions, security issues assigned to me with new activity take top priority (0.9+) regardless of the P3 label or age.
- **Next action:** [todo] Investigate whether Dart on Android properly blocks revoked certificates and evaluate the impact of the eMudhra compromise.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and my regular collaborator kevmoo has left an unanswered review comment with a technical question blocking progress. Leaving feedback unanswered stalls my own work, placing this squarely in the 0.8–0.9 range.
- **Next action:** [respond] Reply to kevmoo's question regarding CHANGELOG handling in librarian generate and update the code accordingly.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for, authored by a close collaborator (sigurdm). As the default reviewer for this repo, reviewing collaborator PRs is on me and takes precedence over non-collaborator work. It has been open for 5 days without any human review yet.
- **Next action:** [review] Review sigurdm's PR adding client attribution headers and pre-release polish to google_cloud_pubsub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an incoming PR in googleapis/google-cloud-dart, a repository I am responsible for. Since no human has reviewed it yet, I am the default reviewer. The author is a first-time contributor fixing an RPC error retry issue, placing it squarely in my core review responsibilities (0.65-0.8 range).
- **Next action:** [review] Review the PR fixing error status codes in google_cloud_rpc.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I authored in a repository I maintain (google-cloud-dart). A contributor took my suggestion to draft a preliminary design before writing code, and they are now waiting on my feedback to move forward. Replying keeps an active contributor unblocked.
- **Next action:** [respond] Review Yusufihsangorgel's proposed enum design sketch and confirm if they should proceed with a PR.

### 6. dart-lang/http#2027 → predicted 9, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue yourself in dart-lang/http, a repository you are responsible for. It represents your own planned architectural improvement regarding Client.close semantics for a potential 2.0 release. Because nobody else is waiting on you and it is fresh planned work, it sits in the mid-priority tier.
- **Next action:** [todo] Design and propose the async Client.close change or prepare an implementation for package:http 2.0.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself to this issue and commented just hours ago that I've started working on it. This is active, planned work in a repository I maintain. Because I explicitly committed to taking it on, it falls in the 0.5-0.65 range.
- **Next action:** [todo] Implement the server trust evaluation hook in CupertinoClient as promised.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in googleapis/google-cloud-dart (a repository I own) filed by a close collaborator (kevmoo). kevmoo answered my question over two weeks ago, noting that it is not urgent but represents a functional hole in error handling and streaming. Because there is a clear next step for me to move this forward or plan the implementation, it lands in the planned work range.
- **Next action:** [todo] Decide whether to implement mid-stream error detection and incremental streaming in google_cloud_rpc or leave it as a backlog item.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue in dart-lang/sdk regarding HTTP header parser non-compliance, which poses potential HTTP request smuggling or proxy desync security risks. However, it has been dormant for nearly two years with no recent activity or new updates to verify. Because you are assigned and it relates to core HTTP parsing, it remains your planned work to fix or reassign, landing in the 0.5 range.
- **Next action:** [todo] Investigate HTTP header name validation in dart:io and either fix it or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in googleapis/google-cloud-dart filed by a close collaborator (kevmoo). I replied with questions and architectural trade-offs about whether switching to discovery or adding convenience extensions is preferable, and I am currently waiting on his response. Because it is an active discussion with a close collaborator in my own repository, it sits in the moderate waiting range.
- **Next action:** [waiting] Waiting on kevmoo to reply regarding whether to switch to discovery or add convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.38
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was CC'd by collaborator kevmoo and parlough noting that I own/maintain dart:io, regarding a longstanding bug where HttpClient throws an uncatchable exception. While an important crash bug affecting users and a collaborator, dart-lang/sdk is not one of my primary tracked repositories, I am not assigned, and there has been no recent activity in over 20 months. It belongs in the backlog of issues where I was CC'd on important code.
- **Next action:** [backlog] Consider taking over and reviving the abandoned CL to fix uncatchable exceptions in dart:io HttpClient.

### 12. dart-lang/native#3752 → predicted 18, priority 0.25
- **Ground truth:** 
- **Model:** You opened this issue and filed PR #3763 to address it. Under the duplicate/linked PR rules, the open PR is the concrete item to drive forward, so this issue should be ranked well below it in the 0.15-0.35 range.
- **Next action:** [elsewhere] Act on PR dart-lang/native#3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.52
- **Ground truth:** 
- **Model:** This is an open issue in a repository I maintain, filed by a close collaborator (sigurdm) with clear checklist items. My last comment indicated I was deciding how to handle this, leaving the next step on me to resolve or implement the dependency bumps. It is non-urgent maintenance work that has been quiet for over two weeks, so it belongs in the moderate planned work range.
- **Next action:** [todo] Decide on the fix approach and update the dependency constraints in the pubspecs.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.15
- **Ground truth:** 
- **Model:** This is an automated dependency update in `dart-lang/tools`, which is not a repository I am responsible for. The review request is directed broadly to `dart-lang/dart-ecosystem-team` rather than to me personally. As a team review request in an unowned repository, it stays at a low priority for another team member to handle.
- **Next action:** [not_yours] None, as this automated update was requested from the team in a repo I do not maintain.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in a repository I own describes a bug in google_cloud_rpc, but the author has already submitted a fix in PR #382. When an issue has an open PR, action should focus on the PR rather than the issue. As instructed, the issue priority is reduced to the 0.15-0.35 range.
- **Next action:** [elsewhere] Review PR googleapis/google-cloud-dart#382 which addresses this issue.

### 16. dart-lang/http#2034 → predicted 23, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own pull request in dart-lang/http, which I created 2 days ago and requested a review from goderbauer. Because only 2 days have passed since the review request, it is simply waiting on the reviewer and there is nothing for me to do yet. If roughly a week passes without a response, I will follow up.
- **Next action:** [waiting] Wait for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in googleapis/google-cloud-dart, opened by close collaborator kevmoo. I have already investigated the design patterns and scoped the work, making it my own active commitment to implement. It is not an emergency security issue or blocking review, placing it solidly in the planned work range.
- **Next action:** [todo] Implement RetryRunner and RequestOptions wiring in ServiceClient for google_cloud_rpc.

### 18. dart-lang/http#2031 → predicted 26, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is stacked on PR #2014, which has not yet been reviewed and is directly waiting on me. Additionally, this is for package:http2, an area I explicitly noted I am not responsible for, although I was directly requested for review by a collaborator. The lower PRs in the stack must be reviewed and resolved before this release prep PR can be considered.
- **Next action:** [elsewhere] Review PR #2014 first, which is lower in the stack.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding Google Cloud DNS support in googleapis/google-cloud-dart, which is currently dirty and has sat untouched for 45 days. The guidelines specify that my own drafts needing completion or abandonment fall in the 0.15–0.35 range. Since no one is blocked or waiting on it, it remains low priority.
- **Next action:** [todo] Resume work on this draft PR to add initial DNS support or close it if abandoned.

### 20. dart-lang/core#1007 → predicted 22, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my primary repositories. The review request is directed to the dart-ecosystem-team rather than me personally, and the PR is also blocked on the CLA check. As a result, this does not require my attention.
- **Next action:** [not_yours] None, as dart-lang/core is not a repository I am responsible for and this is a general team review request.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** This PR addresses a security mitigation in dart-lang/tools, but it is not in a repository I am responsible for and I am not personally requested. The team review request was addressed to dart-ecosystem-team, and lrhn is actively driving the code review with comprehensive feedback. Although it is a security-related fix, it is handled by others outside my direct ownership.
- **Next action:** [not_yours] None; lrhn is actively reviewing this PR from jonasfj in dart-lang/tools.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on PR #2563, which is still a draft and unreviewed. Stacked PRs should not be reviewed until the underlying PRs land or are reviewed. Furthermore, this is in dart-lang/tools, where I was only requested via team review rather than directly.
- **Next action:** [elsewhere] Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 24, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, where I requested a review from liamappelbe 2 days ago. Since it has only been a couple of days, it is waiting on their review and there is nothing for me to do until about a week has passed.
- **Next action:** [waiting] Wait for liamappelbe to review this PR.

### 24. googleapis/google-cloud-dart#373 → predicted 13, priority 0.45
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in google-cloud-dart, which is already approved by sigurdm. 4 days ago I asked him if he reviewed the full PR so we could bypass natebosch's review and merge. I am currently waiting on his response before merging.
- **Next action:** [waiting] Wait for sigurdm to reply on whether he reviewed the non-PubSub parts and if the PR is good to merge.

### 25. dart-lang/http#579 → predicted 27, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is explicitly tagged 'next-breaking-release'. I previously confirmed that this needs to be coordinated with a major version bump when bandwidth permits, so no review or active work is needed right now.
- **Next action:** [backlog] Wait for a coordinated major breaking release of package:http before revisiting this feature.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is an open PR (#2034) authored by you that addresses and closes this issue. As per the instructions to avoid duplicate tracking, the PR is the primary item to act on, keeping this issue in the low range (0.15-0.35). There is no independent action needed directly on this issue right now.
- **Next action:** [elsewhere] Act on PR #2034 instead, which addresses this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** I was only mentioned as an informational CC over two years ago in a repository I do not manage (flutter/devtools). The recent comments and triage are directed at others, with nothing requested of me. There is no active work or blocking action for me here.
- **Next action:** [not_yours] None, as this is an informational CC in flutter/devtools with no action requested of me.

### 28. dart-lang/http#1837 → predicted 32, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already responded to this feature request a year ago indicating the Dart team is not planning to implement it and marked it as P3 with 'contributions-welcome'. There has been no activity since, and no action is required from you at this time. It sits in the low-priority backlog.
- **Next action:** [backlog] Leave in backlog for community contributions or triage during grooming.

### 29. dart-lang/http#2033 → predicted 34, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already approved this PR and no further commits or comments have been added since. As per the instructions, once approved and quiet, there is nothing left for me to do.
- **Next action:** [not_yours] None; PR is already approved by me and waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, I am not assigned or mentioned, and have never participated in this thread.
- **Next action:** [not_yours] None, as this issue concerns package:http2 which is outside my scope.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This pull request is in dart-lang/tools, a repository I am not responsible for. Although it was submitted by a collaborator (kevmoo), davidmorgan was explicitly requested as the individual reviewer, while my team (dart-ecosystem-team) was only group-requested. As such, there is no direct expectation or leverage for me to act.
- **Next action:** [not_yours] None, as davidmorgan was specifically requested to review this PR in a repository outside my responsibility.

### 32. dart-lang/http#2026 → predicted 33, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, the author has specifically directed the review request to mosuem, so there is nothing for me to do.
- **Next action:** [not_yours] None; this is in package:http2 and is explicitly addressed to mosuem.

### 33. dart-lang/native#3653 → predicted 35, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and actively handled by liamappelbe. I previously chimed in with context over a month ago, but no action is requested from me, and the discussion is ongoing between the VM and interop team members.
- **Next action:** [not_yours] None; liamappelbe owns this issue in dart-lang/native and is deciding whether to pursue VM/trampoline changes.

### 34. dart-lang/http#1972 → predicted 31, priority 0.05
- **Ground truth:** 
- **Model:** There is an open pull request (PR #1974) linked to fix this issue, making the PR the primary item to track. Furthermore, this issue is labeled 'needs-info' and is waiting on a reply from the reporter to my questions from 8 days ago. Consequently, there is no action needed on this issue directly.
- **Next action:** [elsewhere] Track PR #1974 which addresses this issue.

### 35. dart-lang/http#1841 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** There is an open pull request (PR #2002) addressing this enhancement. When an open PR exists for an issue, the PR is the primary item to act on, ranking the issue down. Additionally, thumbs_down_at was set on 2026-10-05, and no direct activity addressed to me has occurred on this issue since.
- **Next action:** [elsewhere] Review open PR dart-lang/http#2002 which implements this change.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.65
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although I previously marked this issue with a thumbs-down, a new comment arrived after that timestamp from filiph with a local reproduction asking how to help. Because I am assigned to this issue in dart-lang/sdk, I should respond to coordinate debugging or decide whether to unassign myself.
- **Next action:** [respond] Reply to filiph offering guidance on reproducing or investigating the recursive delete failure, or unassign myself.
