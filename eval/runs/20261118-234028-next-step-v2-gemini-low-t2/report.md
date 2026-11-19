# Gitilizer eval: next-step-v2-gemini-low-t2

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/work/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-234028

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.641 ± 0.000 |
| spearman | 0.756 ± 0.000 |
| pairwise_acc | 0.821 ± 0.000 |
| ndcg | 0.975 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.611 ± 0.000 |

## Next steps (mean ± sd across trials)

Against the next step the eval set records for 36 items (PRD RANK-24). "Same side" counts a next step on the other side of "on me" as wrong, and any other as right.

| metric | value |
|---|---|
| exact | 0.833 ± 0.000 |
| same side | 0.917 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.410 ± 0.000 | 0.911 ± 0.000 | 0.400 ± 0.000 | 4.300 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | next step (expected) | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | todo | dart-lang/sdk#48056 | A | Investigate whether Dart on Android honors OS certificate blocklists/revocations following the eMudhra CA compromise and respond or take action. |
| 2 | 2.0 (2) | +0.0 | 0.82 | respond | googleapis/librarian#7808 | A | Reply to kevmoo's question regarding CHANGELOG.md cleanup and update the PR if needed. |
| 3 | 3.0 (3) | +0.0 | 0.75 | review | googleapis/google-cloud-dart#376 | A | Review Sigurd's PR adding client attribution headers and pre-release polish to Pub/Sub. |
| 4 | 4.0 (4) | +0.0 | 0.70 | review | googleapis/google-cloud-dart#382 | A | Review this PR fixing RPC error code handling in REST calls. |
| 5 | 5.0 (5) | +0.0 | 0.70 | respond | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's proposed enum design snippet so they can proceed with the implementation. |
| 6 | 10.0 (10) | +4.0 | 0.52 | todo | dart-lang/http#2027 | B | Decide on the API design for Client.close and plan implementation or discussion for a breaking 2.0 release. |
| 7 | 7.0 (7) | +0.0 | 0.60 | todo | dart-lang/http#1981 | B | Implement the server trust evaluation hook in cupertino_http and put up a PR. |
| 8 | 11.0 (11) | +3.0 | 0.52 | todo | googleapis/google-cloud-dart#360 | A | Decide whether to implement mid-stream error detection and incremental streaming in ServiceClient._makeStreamingRequest. |
| 9 | 12.0 (12) | +3.0 | 0.52 | todo | dart-lang/sdk#59846 | B | Investigate HTTP header parser character validation in dart:io and either plan a fix or reassign. |
| 10 | 13.0 (13) | +3.0 | 0.45 | waiting | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to reply to my question about switching to discovery vs adding convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.40 | backlog (not_yours) ⚠️ | dart-lang/sdk#31275 | A | Investigate taking over the abandoned CL for dart:io HttpClient unsolicited response crashes when time permits. |
| 12 | 18.0 (18) | +6.0 | 0.20 | elsewhere | dart-lang/native#3752 | B | Act on PR dart-lang/native#3763 which fixes this issue. |
| 13 | 9.0 (9) | -4.0 | 0.55 | todo | googleapis/google-cloud-dart#366 | B | Decide whether to update the pubspecs manually or handle this through tooling/automation, and bump the dependency versions. |
| 14 | 21.0 (21) | +7.0 | 0.15 | not_yours | dart-lang/tools#2719 | B | None; this is a team review request in a repository I do not maintain. |
| 15 | 16.0 (16) | +1.0 | 0.30 | elsewhere | googleapis/google-cloud-dart#381 | A | Review PR #382, which provides the fix for this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | waiting | dart-lang/http#2034 | B | Waiting on goderbauer to review the pull request. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.55 | todo (elsewhere) ⚠️ | googleapis/google-cloud-dart#359 | B | Implement RetryRunner and RequestOptions wiring in ServiceClient for google_cloud_rpc. |
| 18 | 25.0 (25) | +7.0 | 0.10 | elsewhere | dart-lang/http#2031 | A | Review the lower PRs in the stack first, specifically PR #2014. |
| 19 | 20.0 (20) | +1.0 | 0.20 | todo | googleapis/google-cloud-dart#345 | A | Resume work to finish this draft PR or decide to close it. |
| 20 | 26.0 (26) | +6.0 | 0.10 | not_yours | dart-lang/core#1007 | B | None, as this is a team review request in a repository I do not manage and the CLA is not yet signed. |
| 21 | 31.0 (31) | +10.0 ⚠️ | 0.05 | not_yours | dart-lang/tools#2544 | B | None, as lrhn is actively reviewing this PR and it is only requested of my team. |
| 22 | 24.0 (24) | +2.0 | 0.10 | elsewhere (not_yours) ⚠️ | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | waiting | dart-lang/native#3763 | A | Waiting on liamappelbe to review the PR. |
| 24 | 14.0 (14) | -10.0 ⚠️ | 0.40 | waiting | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to confirm if the PR is good to merge without natebosch's review. |
| 25 | 28.0 (28) | +3.0 | 0.08 | backlog | dart-lang/http#579 | B | Keep in backlog until planning the next breaking major release for package:http. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.25 | elsewhere | dart-lang/http#1932 | B | Focus on PR #2034 which addresses this issue. |
| 27 | 30.0 (30) | +3.0 | 0.05 | not_yours | flutter/devtools#8223 | B | None; this issue belongs to Flutter DevTools and I was only CC'd for informational context. |
| 28 | 27.0 (27) | -1.0 | 0.08 | backlog | dart-lang/http#1837 | A | Leave in backlog for community contributions or triage during grooming. |
| 29 | 34.0 (34) | +5.0 | 0.00 | not_yours | dart-lang/http#2033 | A | Waiting on @mosuem to land the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | not_yours | dart-lang/http#1365 | A | None; this issue concerns package:http2 which is explicitly out of scope for me. |
| 31 | 29.0 (29) | -2.0 | 0.05 | not_yours | dart-lang/tools#2715 | B | None; davidmorgan is directly assigned to review this PR in dart-lang/tools. |
| 32 | 33.0 (33) | +1.0 | 0.00 | not_yours | dart-lang/http#2026 | A | None; waiting on mosuem to review this http2 PR. |
| 33 | 35.0 (35) | +2.0 | 0.00 | not_yours | dart-lang/native#3653 | A | None; liamappelbe is driving this issue in dart-lang/native. |
| 34 | 32.0 (32) | -2.0 | 0.05 | elsewhere (waiting) ⚠️ | dart-lang/http#1972 | B | Act on PR #1974 instead, while waiting for the reporter to reply with more info. |
| 35 | 19.0 (19) | -16.0 ⚠️ | 0.20 | elsewhere (not_yours) ⚠️ | dart-lang/http#1841 | B | Act on PR #2002 instead, which implements a fix for this issue. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.68 | respond (not_yours) ⚠️ | dart-lang/sdk#38148 | B | Reply to filiph's offer to provide a reproduction or debug info for this issue assigned to me. |

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
- **Model:** Security issues involving TLS certificate trust take top priority, especially when I created the issue and am assigned to it. Recent activity directly links this issue to an active security incident involving compromised intermediate CA keys, which requires immediate verification and follow-up. Even though it is labeled P3, security issues outrank all other work regardless of label or age.
- **Next action:** Investigate whether Dart on Android honors OS certificate blocklists/revocations following the eMudhra CA compromise and respond or take action.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.82
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own pull request, and my collaborator kevmoo left an unanswered review comment with a concrete technical question 21 hours ago. Not responding stalls my own PR from making progress and getting merged. Handling feedback on my own PRs is a top priority.
- **Next action:** Reply to kevmoo's question regarding CHANGELOG.md cleanup and update the PR if needed.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from a close collaborator (sigurdm) in googleapis/google-cloud-dart, a repository I am directly responsible for. As the default reviewer, PR reviews for collaborators in my own repos fall in the 0.65–0.8 range. It has been open for 5 days without any human reviews.
- **Next action:** Review Sigurd's PR adding client attribution headers and pre-release polish to Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for. As the default reviewer, it is on me to review it. Since the author is an external contributor rather than a close collaborator, it falls cleanly in the middle of the review range at 0.7.
- **Next action:** Review this PR fixing RPC error code handling in REST calls.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I filed in googleapis/google-cloud-dart, a repository I am responsible for. An outside contributor specifically followed my instructions to draft a preliminary design before writing code, and is now waiting on my feedback to proceed. Responding keeps the contributor unblocked.
- **Next action:** Reply to Yusufihsangorgel's proposed enum design snippet so they can proceed with the implementation.

### 6. dart-lang/http#2027 → predicted 10, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this architectural issue in a repository you own (dart-lang/http) to address core semantics and potential breaking changes for Client.close. As your own planned work that is still relatively fresh (filed 9 days ago) with nobody else waiting, it serves as an active task for you to move forward. It fits within the 0.5-0.65 range for recently filed items in areas you own.
- **Next action:** Decide on the API design for Client.close and plan implementation or discussion for a breaking 2.0 release.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented 5 hours ago that I have started working on it. As active planned work in a repository I own, it sits squarely on my plate to move forward. It is not an urgent security vulnerability or blocking external review, placing it in the solid 0.5-0.65 planned work range.
- **Next action:** Implement the server trust evaluation hook in cupertino_http and put up a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, filed by my close collaborator kevmoo. I asked for clarification on his concerns and he answered 17 days ago, noting that while it is a gap, it is not urgent. Since the ball is back in my court to address or plan this improvement, it sits in my planned work backlog.
- **Next action:** Decide whether to implement mid-stream error detection and incremental streaming in ServiceClient._makeStreamingRequest.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.52
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned to you in dart:io, covering potential HTTP request smuggling or proxy desync risks due to accepting invalid characters like NUL in header names. Although it has potential security implications, it has been completely dormant for 22 months with no new activity. As an assigned issue in your backlog that you should either fix or reassign, it belongs in the planned work range.
- **Next action:** Investigate HTTP header parser character validation in dart:io and either plan a fix or reassign.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.45
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in a repository I maintain, opened by a close collaborator (kevmoo). I replied with a concrete design question and counter-proposal about API surface tradeoffs 16 days ago and am waiting on his response before taking any action. Since it is waiting on a collaborator in my own repository, it belongs in the moderate waiting tier.
- **Next action:** Wait for kevmoo to reply to my question about switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was CC'd by collaborator kevmoo and noted as the library owner for this uncatchable crash bug in dart:io. However, there has been no direct ask or activity directed at me for over two years, and the repository is dart-lang/sdk where I am not explicitly assigned or requested for review. It represents an old, important issue where I was CC'd and could be picked up during backlog triage.
- **Next action:** Investigate taking over the abandoned CL for dart:io HttpClient unsolicited response crashes when time permits.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** You opened this issue and assigned it to yourself, but you have already created a fixing PR (dart-lang/native#3763). Because an active PR exists, attention should be directed to the PR rather than the issue itself. Per instructions, issues covered by an open PR are scored low (0.15-0.35).
- **Next action:** Act on PR dart-lang/native#3763 which fixes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.55
- **Ground truth:** 
- **Model:** This issue is in a repository I maintain, filed by a close collaborator (sigurdm). I was the last commenter noting that I was considering an approach to fix it. Because nobody is waiting on a reply from me but the work to update or automate these pubspec constraints remains my responsibility to drive forward, it sits squarely in my planned todo queue.
- **Next action:** Decide whether to update the pubspecs manually or handle this through tooling/automation, and bump the dependency versions.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.15
- **Ground truth:** 
- **Model:** This automated PR in dart-lang/tools requests a review from dart-ecosystem-team, not me directly. dart-lang/tools is not one of the repositories I am responsible for maintaining. Since it is a team request in a non-owned repository, it ranks low priority and can be handled by other team members.
- **Next action:** None; this is a team review request in a repository I do not maintain.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository I am responsible for, but it already has an open linked pull request (#382) that implements the proposed fix. As per guidelines, when an issue has an open PR, action should be taken directly on the PR rather than the issue. Consequently, the priority is kept in the lower 0.15–0.35 range.
- **Next action:** Review PR #382, which provides the fix for this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** You authored this PR in dart-lang/http and requested a review from goderbauer two days ago. Since it has only been two days, no ping or follow-up action is needed yet. It stays at a low priority until a review is submitted or roughly a week has passed.
- **Next action:** Waiting on goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue in a repository I own (google-cloud-dart) filed by a close collaborator (kevmoo), which I assigned to myself and actively scoped 10 days ago. It represents planned work currently on my plate without anyone else actively blocking or waiting on an immediate reply. It falls squarely in the planned work priority band (0.50–0.65).
- **Next action:** Implement RetryRunner and RequestOptions wiring in ServiceClient for google_cloud_rpc.

### 18. dart-lang/http#2031 → predicted 25, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release PR is stacked on multiple unmerged PRs, including PR #2014 which still requires review. Additionally, I am explicitly not responsible for the http2 package in dart-lang/http, so stacked release prep here is very low priority until the underlying PRs land.
- **Next action:** Review the lower PRs in the stack first, specifically PR #2014.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding initial DNS support in googleapis/google-cloud-dart. It has been idle for 45 days with merge conflicts and no human reviewers requested. Per the guidelines, my own drafts that need finishing or abandoning fall in the 0.15–0.35 priority range.
- **Next action:** Resume work to finish this draft PR or decide to close it.

### 20. dart-lang/core#1007 → predicted 26, priority 0.10
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This pull request is in dart-lang/core, which is not one of my primary repositories. The review request is directed to the dart-ecosystem-team rather than me personally, and the contributor has not yet signed the CLA. Team review requests in repos I don't own carry low priority.
- **Next action:** None, as this is a team review request in a repository I do not manage and the CLA is not yet signed.

### 21. dart-lang/tools#2544 → predicted 31, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for, and was only requested via the dart-ecosystem-team. Furthermore, lrhn is actively driving the code review and has requested multiple changes that the author has not addressed. While it is a security-related mitigation, it is not in my code and another reviewer is actively handling it.
- **Next action:** None, as lrhn is actively reviewing this PR and it is only requested of my team.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on PR #2563, which is still an open draft and has not yet been reviewed. Furthermore, dart-lang/tools is not one of my core repositories, and the review request is to the team rather than to me personally. Lower PRs in the stack must be handled first before this PR can be reviewed.
- **Next action:** Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, and I requested a review from liamappelbe only 2 days ago. There is nothing for me to do until a review is submitted or roughly a week passes without a response. It stays in the low priority range while waiting.
- **Next action:** Waiting on liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in a repository I own. Sigurd approved the Pub/Sub portion, and four days ago I asked him if he reviewed the non-PubSub parts and feels it is good to merge without waiting on Nate. Because I am waiting on a recent question to a close collaborator, this sits in the waiting state until he replies or roughly a week passes.
- **Next action:** Wait for sigurdm to confirm if the PR is good to merge without natebosch's review.

### 25. dart-lang/http#579 → predicted 28, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is explicitly labeled 'next-breaking-release'. I previously noted that landing this needs to be coordinated with a major version bump when bandwidth permits, and there is no active request waiting on me right now.
- **Next action:** Keep in backlog until planning the next breaking major release for package:http.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is an active open PR (#2034, authored by me) that fixes this issue. Per guidance, when an issue has an open PR covering it, action should be focused on the PR and the issue ranked well below it in the 0.15-0.35 range.
- **Next action:** Focus on PR #2034 which addresses this issue.

### 27. flutter/devtools#8223 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, a repository I am not responsible for. I was only CC'd over two years ago for informational visibility regarding HTTP profiling. There is nothing asked of me or required from me to move this forward.
- **Next action:** None; this issue belongs to Flutter DevTools and I was only CC'd for informational context.

### 28. dart-lang/http#1837 → predicted 27, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded to this feature request a year ago indicating the Dart team will not take it on, and marked it 'contributions-welcome' and 'P3'. There has been no subsequent activity and nobody is waiting on you. As an old, low-priority backlog issue open for outside contributions, it requires no current action.
- **Next action:** Leave in backlog for community contributions or triage during grooming.

### 29. dart-lang/http#2033 → predicted 34, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already approved this PR and no new commits or comments have been made since. It is ready for the author to merge, so there is nothing further required of me.
- **Next action:** Waiting on @mosuem to land the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** You have an explicit note for dart-lang/http stating that you are 'not responsible for http2'. This issue is labeled 'package:http2' and pertains to http2 performance. Because it is outside your stated scope and no one has requested your input directly, it requires no attention from you.
- **Next action:** None; this issue concerns package:http2 which is explicitly out of scope for me.

### 31. dart-lang/tools#2715 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This pull request is in dart-lang/tools, which is not one of my primary repositories. Although I belong to the requested dart-ecosystem-team, a specific individual (davidmorgan) has been explicitly requested to review it. Therefore, there is no action needed from me.
- **Next action:** None; davidmorgan is directly assigned to review this PR in dart-lang/tools.

### 32. dart-lang/http#2026 → predicted 33, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This pull request is in the `http2` package of `dart-lang/http`, which is explicitly outside of my scope ('not responsible for http2'). The author specifically requested a review from mosuem, so there is nothing for me to do.
- **Next action:** None; waiting on mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 35, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and actively discussed by liamappelbe and mraleph. I previously shared experimental context, but nobody has asked me for follow-up and there is no action for me here.
- **Next action:** None; liamappelbe is driving this issue in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 32, priority 0.05
- **Ground truth:** 
- **Model:** This issue has an active linked PR (#1974) addressing it, meaning any direct work belongs on the PR rather than the issue. Furthermore, you asked clarifying questions 8 days ago and labeled it 'needs-info', with no response from the reporter yet. Consequently, this issue requires no immediate action from you.
- **Next action:** Act on PR #1974 instead, while waiting for the reporter to reply with more info.

### 35. dart-lang/http#1841 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This issue is covered by open PR dart-lang/http#2002, which implements the suggested retryDelay callback. Under the rules, issues with open PRs addressing them should be ranked well below their PR in the low range (0.15–0.35). Furthermore, I thumbs-downed this item on 2026-10-05 and no significant action directed at me has occurred on the issue itself since.
- **Next action:** Act on PR #2002 instead, which implements a fix for this issue.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.68
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You marked this issue thumbs-down in August 2026, but significant activity has occurred since: filiph commented confirming reproduction on macOS arm64 and asking how to help. Because you are assigned to this issue in dart-lang/sdk and a contributor is offering repro steps to help resolve it, it requires your response. A related commit was also linked recently by copybara.
- **Next action:** Reply to filiph's offer to provide a reproduction or debug info for this issue assigned to me.
