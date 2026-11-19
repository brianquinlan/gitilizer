# Gitilizer eval: next-step-v2-gemini-low-t3

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/work/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-234030

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.692 ± 0.000 |
| spearman | 0.796 ± 0.000 |
| pairwise_acc | 0.846 ± 0.000 |
| ndcg | 0.978 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.944 ± 0.000 |

## Next steps (mean ± sd across trials)

Against the next step the eval set records for 36 items (PRD RANK-24). "Same side" counts a next step on the other side of "on me" as wrong, and any other as right.

| metric | value |
|---|---|
| exact | 0.806 ± 0.000 |
| same side | 0.889 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.495 ± 0.000 | 0.919 ± 0.000 | 0.600 ± 0.000 | 3.500 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | next step (expected) | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | todo | dart-lang/sdk#48056 | A | Check the security implications raised regarding revoked/compromised intermediate CAs and verify whether #64644 addresses it. |
| 2 | 2.0 (2) | +0.0 | 0.85 | respond | googleapis/librarian#7808 | A | Reply to kevmoo's question regarding CHANGELOG.md cleanup and update the PR if needed. |
| 3 | 3.0 (3) | +0.0 | 0.75 | review | googleapis/google-cloud-dart#376 | A | Review Sigurd's PR adding client attribution headers and release polish for Pub/Sub. |
| 4 | 4.0 (4) | +0.0 | 0.70 | review | googleapis/google-cloud-dart#382 | A | Review this PR fixing google.rpc.Code handling in google_cloud_rpc |
| 5 | 5.0 (5) | +0.0 | 0.70 | respond | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's proposed design sketch for ProtoEnum with feedback so they can proceed. |
| 6 | 8.0 (8) | +2.0 | 0.55 | todo | dart-lang/http#2027 | B | Design or propose the new API semantics for Client.close or begin an implementation plan for 2.0. |
| 7 | 7.0 (7) | +0.0 | 0.60 | todo | dart-lang/http#1981 | B | Implement the server trust evaluation hook in cupertino_http and submit a PR. |
| 8 | 10.0 (10) | +2.0 | 0.55 | todo | googleapis/google-cloud-dart#360 | A | Decide whether to implement mid-stream error handling and investigate incremental JSON streaming in google_cloud_rpc. |
| 9 | 12.0 (12) | +3.0 | 0.55 | todo | dart-lang/sdk#59846 | B | Fix the HTTP header name character validation in dart:io or reassign the issue. |
| 10 | 14.0 (14) | +4.0 | 0.40 | waiting | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to respond to my question regarding switching to discovery vs. adding convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.40 | backlog (not_yours) ⚠️ | dart-lang/sdk#31275 | A | Investigate resurrecting CL 144346 to handle unsolicited responses on unclosed connections in dart:io HttpClient. |
| 12 | 18.0 (18) | +6.0 | 0.20 | elsewhere | dart-lang/native#3752 | B | Follow up on PR dart-lang/native#3763 which fixes this issue. |
| 13 | 11.0 (11) | -2.0 | 0.55 | todo | googleapis/google-cloud-dart#366 | B | Decide on the version requirement approach or update the dependency constraints in google_cloud_storage and google_cloud_pubsub. |
| 14 | 20.0 (20) | +6.0 | 0.15 | not_yours | dart-lang/tools#2719 | B | None; this is an automated PR in dart-lang/tools requested to a team rather than me personally. |
| 15 | 16.0 (16) | +1.0 | 0.25 | elsewhere | googleapis/google-cloud-dart#381 | A | Review PR googleapis/google-cloud-dart#382 instead of acting on this issue. |
| 16 | 21.0 (21) | +5.0 | 0.10 | waiting | dart-lang/http#2034 | B | Waiting on goderbauer to review this PR. |
| 17 | 9.0 (9) | -8.0 | 0.55 | todo (elsewhere) ⚠️ | googleapis/google-cloud-dart#359 | B | Implement RetryRunner and RequestOptions wiring in ServiceClient for google_cloud_rpc. |
| 18 | 24.0 (24) | +6.0 | 0.10 | elsewhere | dart-lang/http#2031 | A | Review the lower PRs in the stack first, specifically PR #2014. |
| 19 | 19.0 (19) | +0.0 | 0.20 | todo | googleapis/google-cloud-dart#345 | A | Resume work on this draft PR to add initial DNS support or close it if no longer needed. |
| 20 | 28.0 (28) | +8.0 | 0.05 | not_yours | dart-lang/core#1007 | B | None; wait for the author to sign the CLA and for a maintainer of dart-lang/core to review. |
| 21 | 30.0 (30) | +9.0 ⚠️ | 0.05 | not_yours | dart-lang/tools#2544 | B | None; lrhn is reviewing this security PR in dart-lang/tools and jonasfj needs to respond. |
| 22 | 23.0 (23) | +1.0 | 0.10 | elsewhere (not_yours) ⚠️ | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 22.0 (22) | -1.0 | 0.10 | waiting | dart-lang/native#3763 | A | Waiting on review from liamappelbe. |
| 24 | 13.0 (13) | -11.0 ⚠️ | 0.40 | waiting | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to reply regarding whether the PR is good to merge without natebosch's review. |
| 25 | 26.0 (26) | +1.0 | 0.08 | waiting (backlog) ⚠️ | dart-lang/http#579 | B | Deferred until the next major breaking release of package:http. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.25 | elsewhere | dart-lang/http#1932 | B | Follow up on PR dart-lang/http#2034 which fixes this issue. |
| 27 | 29.0 (29) | +2.0 | 0.05 | not_yours | flutter/devtools#8223 | B | None; this issue belongs to the Flutter DevTools team and was only an informational CC. |
| 28 | 25.0 (25) | -3.0 | 0.08 | backlog | dart-lang/http#1837 | A | Leave in backlog for community contributions or triage during grooming. |
| 29 | 32.0 (32) | +3.0 | 0.00 | not_yours | dart-lang/http#2033 | A | None; PR is already approved and waiting on the author to merge. |
| 30 | 36.0 (36) | +6.0 | 0.00 | not_yours | dart-lang/http#1365 | A | None, as I am not responsible for package:http2. |
| 31 | 27.0 (27) | -4.0 | 0.05 | not_yours | dart-lang/tools#2715 | B | None; davidmorgan is directly requested to review this PR in a repository outside your primary scope. |
| 32 | 31.0 (31) | -1.0 | 0.00 | not_yours | dart-lang/http#2026 | A | None; this is in http2, which is outside my scope, and the author specifically asked mosuem to review. |
| 33 | 34.0 (34) | +1.0 | 0.00 | not_yours | dart-lang/native#3653 | A | None; liamappelbe is driving this ffigen issue in dart-lang/native. |
| 34 | 35.0 (35) | +1.0 | 0.00 | elsewhere (waiting) ⚠️ | dart-lang/http#1972 | B | Act on PR #1974 instead of this issue. |
| 35 | 33.0 (33) | -2.0 | 0.00 | elsewhere (not_yours) ⚠️ | dart-lang/http#1841 | B | Review open PR dart-lang/http#2002 which implements this enhancement. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.70 | respond (not_yours) ⚠️ | dart-lang/sdk#38148 | B | Reply to filiph's offer to help reproduce and hunt down the bug, or unassign myself. |

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
- **Model:** This is an issue I created and am assigned to regarding certificate trust and verification on Android. A critical security incident involving compromised intermediate CA keys was raised 3 days ago. Security issues I own with new activity require top priority attention to verify the state and determine whether Dart applications are vulnerable.
- **Next action:** Check the security implications raised regarding revoked/compromised intermediate CAs and verify whether #64644 addresses it.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR, and my collaborator kevmoo left substantive review feedback and an unanswered question 21 hours ago. Answering his question and addressing the concern is necessary to keep my own PR moving forward. Since I am blocking progress on my own PR, it warrants high priority (0.8-0.9).
- **Next action:** Reply to kevmoo's question regarding CHANGELOG.md cleanup and update the PR if needed.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This PR is in a repository I am responsible for (google-cloud-dart) and was submitted by my close collaborator sigurdm. No human review has been conducted yet (bots don't count), making me the default reviewer. As an unreviewed collaborator PR that has been open for 5 days, it deserves high attention.
- **Next action:** Review Sigurd's PR adding client attribution headers and release polish for Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I am responsible for where I serve as the default reviewer. The author is a first-time contributor fixing an issue with error handling and retry logic over REST. Since it is waiting for initial review, it falls squarely in my 0.65-0.8 review queue.
- **Next action:** Review this PR fixing google.rpc.Code handling in google_cloud_rpc

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This issue is in a repository I maintain (googleapis/google-cloud-dart) and an external contributor followed my request to post a preliminary design before writing code. They posted their design 4 days ago and are waiting on my feedback to proceed with implementation. This falls in the 0.65-0.8 range as a contributor waiting on my reply to move forward.
- **Next action:** Reply to Yusufihsangorgel's proposed design sketch for ProtoEnum with feedback so they can proceed.

### 6. dart-lang/http#2027 → predicted 8, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this architectural issue in a repository you own (dart-lang/http) regarding core Client lifecycle semantics. It represents planned work you initiated, and nobody else is currently blocking or waiting on it. Since it is relatively fresh (filed 9 days ago) and in an area you maintain, it scores in the planned work range.
- **Next action:** Design or propose the new API semantics for Client.close or begin an implementation plan for 2.0.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue to yourself and commented just a few hours ago stating that you have started working on it. This represents your active planned work in a repository you own. As a self-assigned active task with nobody waiting on an immediate reply, it sits firmly in the planned work band.
- **Next action:** Implement the server trust evaluation hook in cupertino_http and submit a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I am responsible for (googleapis/google-cloud-dart), filed by a close collaborator (kevmoo). kevmoo answered my question 17 days ago indicating it's not urgent but still an identified gap/hole. Since the ball is back in my court to decide on or implement the fix, it fits as planned work for my repo.
- **Next action:** Decide whether to implement mid-stream error handling and investigate incremental JSON streaming in google_cloud_rpc.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this bug in dart:io regarding improper HTTP header validation, which has potential security implications (e.g., request smuggling or proxy desync) due to accepting control characters like NUL. However, it has been inactive for nearly two years without direct escalation. As an assigned issue on your plate, you should either schedule the fix or unassign yourself.
- **Next action:** Fix the HTTP header name character validation in dart:io or reassign the issue.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in a repository I own (`google-cloud-dart`) filed by a close collaborator (`kevmoo`). I asked a direct question about whether switching to discovery or adding convenience extensions is preferable, and I am waiting for his reply. Since it is waiting on someone else in my repository, it stays visible in the moderate tier.
- **Next action:** Wait for kevmoo to respond to my question regarding switching to discovery vs. adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an important crash bug in dart:io HttpClient where collaborator kevmoo and parlough CC'd me as the library owner. However, I am not directly assigned, no direct questions or urgent commitments were made, and the thread has been dormant for over a year and a half. It sits as backlog work for when grooming dart:io issues.
- **Next action:** Investigate resurrecting CL 144346 to handle unsolicited responses on unclosed connections in dart:io HttpClient.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** You opened this issue and assigned yourself, but you have already authored PR #3763 to fix it. Because there is an open PR addressing the issue, action should be taken on the PR rather than the issue itself. Consequently, this issue's priority drops to the low range.
- **Next action:** Follow up on PR dart-lang/native#3763 which fixes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.55
- **Ground truth:** 
- **Model:** This issue was filed by collaborator sigurdm in a repository I maintain, outlining clear release tasks. In my last comment 17 days ago, I noted I am thinking about how to fix this automation, so the ball is in my court to resolve or implement the dependency bumps. It represents my own planned maintenance work, placing it in the moderate 0.5-0.65 range.
- **Next action:** Decide on the version requirement approach or update the dependency constraints in google_cloud_storage and google_cloud_pubsub.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.15
- **Ground truth:** 
- **Model:** This is a bot PR in dart-lang/tools, which is not a repository I am responsible for. The review was requested from the team (dart-ecosystem-team) rather than me personally. Per policy, team review requests in repositories I do not own are low priority (0.1-0.25).
- **Next action:** None; this is an automated PR in dart-lang/tools requested to a team rather than me personally.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository I maintain, but it has an associated open PR (#382) created by the author to fix the problem. Per policy, when an issue has an open PR addressing it, the PR is the primary item to review and act upon. Consequently, the priority of the issue itself is kept low (0.15-0.35 range).
- **Next action:** Review PR googleapis/google-cloud-dart#382 instead of acting on this issue.

### 16. dart-lang/http#2034 → predicted 21, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your own PR in dart-lang/http fixing a build issue in cronet_http. You requested a review from goderbauer only 2 days ago, so there is nothing to do until roughly a week has passed without a response. As a result, it sits in the low waiting priority range.
- **Next action:** Waiting on goderbauer to review this PR.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue filed by collaborator kevmoo in googleapis/google-cloud-dart, a repository I am responsible for. I assigned it to myself, researched retry patterns across languages, and trimmed its scope. It is planned work for me to implement.
- **Next action:** Implement RetryRunner and RequestOptions wiring in ServiceClient for google_cloud_rpc.

### 18. dart-lang/http#2031 → predicted 24, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release PR is stacked on top of several lower PRs in the stack, including PR #2014 which is still open and unreviewed. Furthermore, I have a specific note stating I am not responsible for package:http2. Even though I was personally requested as a reviewer by a collaborator, this PR cannot be reviewed or merged until the underlying stack is resolved.
- **Next action:** Review the lower PRs in the stack first, specifically PR #2014.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding DNS support to googleapis/google-cloud-dart, which I converted to draft 45 days ago. There are no human reviewers waiting or blocked, only automated comments from a bot. As an aging draft of my own work that I should either finish or abandon, it sits in the 0.15–0.35 range.
- **Next action:** Resume work on this draft PR to add initial DNS support or close it if no longer needed.

### 20. dart-lang/core#1007 → predicted 28, priority 0.05
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my primary repositories. The review request is only to the dart-ecosystem-team rather than me personally, and the PR is currently blocked on a CLA signature from a first-time contributor.
- **Next action:** None; wait for the author to sign the CLA and for a maintainer of dart-lang/core to review.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** This is a security-related PR in dart-lang/tools, which is not a repository I am responsible for. I was only requested via team review (dart-ecosystem-team), and lrhn is actively driving the review with detailed comments awaiting jonasfj's response. According to instructions, a security PR in a repository I'm not responsible for where someone else is reviewing it is not mine.
- **Next action:** None; lrhn is reviewing this security PR in dart-lang/tools and jonasfj needs to respond.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still an open draft and has not been reviewed yet. In addition, `dart-lang/tools` is not one of my primary repositories, and the review request is via team `dart-ecosystem-team` rather than direct. Lower PRs must be reviewed first before looking at this stacked PR.
- **Next action:** Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 22, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request in dart-lang/native, where I requested a review from liamappelbe 2 days ago. Since it has only been a couple of days, there is no action needed from me until about a week passes or feedback is provided.
- **Next action:** Waiting on review from liamappelbe.

### 24. googleapis/google-cloud-dart#373 → predicted 13, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in googleapis/google-cloud-dart, which has already received approval from sigurdm for the PubSub parts. Four days ago, I asked sigurdm if the rest of the PR is good to merge to relieve natebosch's review load. I am waiting on his response before merging.
- **Next action:** Wait for sigurdm to reply regarding whether the PR is good to merge without natebosch's review.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is labeled 'next-breaking-release'. I previously indicated that landing this must be coordinated with a semver-major release which is not currently underway. Per guidelines, PRs waiting for a future breaking release are low priority (0.05–0.15).
- **Next action:** Deferred until the next major breaking release of package:http.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by open PR #2034 ('fix(cronet): avoid cronet namespace duplication') which I opened recently. When an issue has an open PR addressing it, action belongs on the PR rather than the issue. Consequently, this issue is kept in the lower priority range.
- **Next action:** Follow up on PR dart-lang/http#2034 which fixes this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, a repository I am not responsible for, and was only brought to my attention via an informational CC over two years ago. No direct question or action item has ever been directed at me. There is nothing for me to do here.
- **Next action:** None; this issue belongs to the Flutter DevTools team and was only an informational CC.

### 28. dart-lang/http#1837 → predicted 25, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already responded stating the Dart team is unlikely to implement this feature and marked it as open for community contributions. There has been no activity for a full year and nobody is waiting on you. This is an old, low-priority feature request sitting in your repository's backlog.
- **Next action:** Leave in backlog for community contributions or triage during grooming.

### 29. dart-lang/http#2033 → predicted 32, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this PR two days ago. No new commits or comments have been added since my approval. It is ready for mosuem to merge and requires no further action from me.
- **Next action:** None; PR is already approved and waiting on the author to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is explicitly labeled 'package:http2' and concerns http2 performance. My notes state that I am not responsible for http2 in dart-lang/http. Therefore, this is out of scope and requires no action from me.
- **Next action:** None, as I am not responsible for package:http2.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This pull request is in dart-lang/tools, a repository you are not directly responsible for. While you are part of the requested dart-ecosystem-team, davidmorgan was explicitly requested as an individual reviewer, meaning it is not personally waiting on you. Consequently, it requires no action from you.
- **Next action:** None; davidmorgan is directly requested to review this PR in a repository outside your primary scope.

### 32. dart-lang/http#2026 → predicted 31, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Furthermore, the contributor has specifically directed this review request to @mosuem. There is no action required from me.
- **Next action:** None; this is in http2, which is outside my scope, and the author specifically asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 34, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and actively investigated by liamappelbe. I previously provided some input, but no one is waiting on me or asking for my action. Therefore, it requires no attention from me.
- **Next action:** None; liamappelbe is driving this ffigen issue in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** This issue is covered by open PR #1974, so work belongs on the PR rather than the issue. Furthermore, you asked questions and applied the 'needs-info' label, and the reporter has not replied yet. Issues with an active 'needs-info' label or with a PR addressing them are scored at or near 0.
- **Next action:** Act on PR #1974 instead of this issue.

### 35. dart-lang/http#1841 → predicted 33, priority 0.00
- **Ground truth:** 
- **Model:** This issue is addressed by open PR #2002. Furthermore, I marked this issue with a thumbs-down on 2026-10-05 and no significant direct activity has occurred since then, so the issue itself requires no attention.
- **Next action:** Review open PR dart-lang/http#2002 which implements this enhancement.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.70
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although you marked this issue with a thumbs-down in August 2026, filiph posted a new reproducible report and directly asked how to help investigate on October 1st. You are assigned to this issue in dart-lang/sdk, so you should either follow up on the new reproduction details or reassign it. Because there is fresh, actionable user activity on an assigned bug since your thumbs-down, it demands attention.
- **Next action:** Reply to filiph's offer to help reproduce and hunt down the bug, or unassign myself.
