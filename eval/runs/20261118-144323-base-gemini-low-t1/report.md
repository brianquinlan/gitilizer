# Gitilizer eval: base-gemini-low-t1

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-144323

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.711 ± 0.000 |
| spearman | 0.820 ± 0.000 |
| pairwise_acc | 0.856 ± 0.000 |
| ndcg | 0.981 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.722 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.867 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 0.875 ± 0.000 |
| B | 20 | 0.590 ± 0.000 | 0.945 ± 0.000 | 0.600 ± 0.000 | 3.200 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Evaluate the security impact of the recent eMudhra intermediate CA compromise on Android and verify whether dart:io enforces Android's revocation/blocklist mechanisms. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment regarding CHANGELOG.md preservation and update the PR if needed. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR for client attribution header and pre-release polish. |
| 4 | 5.0 (5) | +1.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR for handling google.rpc.Code in ServiceException. |
| 5 | 4.0 (4) | -1.0 | 0.72 | 1/1 | googleapis/google-cloud-dart#252 | B | Review and reply to Yusufihsangorgel's proposed API design sketch for enum parsing. |
| 6 | 10.0 (10) | +4.0 | 0.52 | 1/1 | dart-lang/http#2027 | B | Work on deciding the API changes and implementation plan for `Client.close`. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in CupertinoClient. |
| 8 | 11.0 (11) | +3.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#360 | A | Decide whether to implement incremental JSON streaming and error handling in google_cloud_rpc or leave it as a backlog enhancement. |
| 9 | 9.0 (9) | +0.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | Investigate invalid header character parsing in dart:io and fix the parser or unassign myself. |
| 10 | 13.0 (13) | +3.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | None; old unassigned dart:io SDK bug where I was only CC'd years ago. |
| 12 | 17.0 (17) | +5.0 | 0.25 | 0/1 | dart-lang/native#3752 | B | Follow up on PR #3763 instead of this issue. |
| 13 | 12.0 (12) | -1.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide whether to address package version requirements via automation or open a PR to update the pubspec constraints manually. |
| 14 | 18.0 (18) | +4.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Waiting for a member of dart-ecosystem-team responsible for package:boring to review this automated PR. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting on this issue directly. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for goderbauer to review the PR. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient as outlined in the issue. |
| 18 | 26.0 (26) | +8.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | Wait for underlying stacked PRs (including #2014) to be reviewed and merged first. |
| 19 | 20.0 (20) | +1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Resume work to finish or close this draft PR. |
| 20 | 21.0 (21) | +1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Waiting on author to sign the Google CLA before review. |
| 21 | 24.0 (24) | +3.0 | 0.10 | 0/1 | dart-lang/tools#2544 | B | Waiting on jonasfj to address lrhn's review feedback. |
| 22 | 25.0 (25) | +3.0 | 0.08 | 0/1 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 14.0 (14) | -10.0 ⚠️ | 0.38 | 0/1 | googleapis/google-cloud-dart#373 | B | Waiting on sigurdm's reply on whether the PR is good to merge without natebosch's review. |
| 25 | 27.0 (27) | +2.0 | 0.08 | 0/1 | dart-lang/http#579 | B | None; this breaking PR is shelved until a major release is planned. |
| 26 | 19.0 (19) | -7.0 | 0.20 | 0/1 | dart-lang/http#1932 | B | Act on open fix PR #2034 instead of this issue. |
| 27 | 29.0 (29) | +2.0 | 0.05 | 0/1 | flutter/devtools#8223 | B | None; this is an informational CC in a repository I do not maintain. |
| 28 | 32.0 (32) | +4.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | Wait for community contributions or further activity. |
| 29 | 34.0 (34) | +5.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue belongs to package:http2 which is outside my scope. |
| 31 | 28.0 (28) | -3.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review the PR. |
| 32 | 33.0 (33) | +1.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on mosuem to review the PR. |
| 33 | 30.0 (30) | -3.0 | 0.05 | 0/1 | dart-lang/native#3653 | A | None; issue is owned and being investigated by liamappelbe and VM team members. |
| 34 | 31.0 (31) | -3.0 | 0.05 | 0/1 | dart-lang/http#1972 | B | Waiting on reporter response to clarifying questions. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | Wait for or review open PR #2002 instead of acting on this issue. |
| 36 | 7.0 (7) | -29.0 ⚠️ | 0.60 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph's offer to help investigate and either provide reproduction/debugging instructions or unassign myself. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an assigned security issue concerning certificate trust and revocation on Android, specifically regarding Dart trusting disabled or untrusted CAs. A community member just raised fresh, active concerns 3 days ago tied to a real-world compromised intermediate CA incident (eMudhra). Per instructions, security issues assigned to me with new activity take top priority (0.9+) regardless of age or P3 labeling.
- **Next action:** Evaluate the security impact of the recent eMudhra intermediate CA compromise on Android and verify whether dart:io enforces Android's revocation/blocklist mechanisms.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and a close collaborator (kevmoo) has left a technical review question that blocks progression. Don't let my own PRs stall when there is active feedback waiting on me.
- **Next action:** Reply to kevmoo's review comment regarding CHANGELOG.md preservation and update the PR if needed.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR by my frequent collaborator sigurdm in googleapis/google-cloud-dart, a repository I am responsible for. As the default reviewer with no human review yet (only bots), reviewing this PR is on me. Collaborator PRs waiting for my review fall in the 0.65–0.8 range.
- **Next action:** Review sigurdm's PR for client attribution header and pre-release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for. As the default reviewer, PR reviews fall to me. The contributor is a first-time contributor rather than a collaborator, but the PR is well-scoped with tests and waiting on a human review.
- **Next action:** Review this PR for handling google.rpc.Code in ServiceException.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue in googleapis/google-cloud-dart, a repository I am responsible for. An external contributor responded to my request for a design proposal with a concrete API sketch 4 days ago. They are waiting on my feedback before proceeding with code changes.
- **Next action:** Review and reply to Yusufihsangorgel's proposed API design sketch for enum parsing.

### 6. dart-lang/http#2027 → predicted 10, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this architectural issue in a repository you own, representing your own planned work for `package:http`. It has not received comments or PRs yet, but at 9 days old it remains fresh planned work for you to drive or discuss with teammates. As your own active commitment in an owned repo, it sits right in the planned work range.
- **Next action:** Work on deciding the API changes and implementation plan for `Client.close`.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented just a few hours ago that I have started working on it. As my own active planned work in a repository I maintain, it belongs squarely in the 0.5–0.65 range. While it relates to TLS trust and certificate pinning, it is an enhancement/feature request rather than an urgent security vulnerability or active exploit.
- **Next action:** Work on implementing the server trust evaluation hook in CupertinoClient.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, filed by my close collaborator kevmoo. Kevmoo replied to my question clarifying his perspective and noting it is not urgent, leaving the ball in my court to decide on or implement the fix. Because there is a clear next step for me in my repo without it being an active emergency, it sits moderately on my planned work list.
- **Next action:** Decide whether to implement incremental JSON streaming and error handling in google_cloud_rpc or leave it as a backlog enhancement.

### 9. dart-lang/sdk#59846 → predicted 9, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned to me in dart:io, covering an RFC compliance / potential HTTP request smuggling issue with upstream proxies. However, it has been inactive for almost two years without recent updates or questions. Because it is assigned work in an area relevant to my HTTP domain, I should investigate and resolve it or reassign it, putting it in the planned work range.
- **Next action:** Investigate invalid header character parsing in dart:io and fix the parser or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in a repository I maintain (google-cloud-dart) filed by my close collaborator kevmoo. In the last comment 16 days ago, I asked kevmoo for his opinion on whether switching to discovery or adding convenience extensions is preferable. The ball is in kevmoo's court to respond, so it is ranked in the moderate range for unanswered questions to collaborators.
- **Next action:** Waiting on kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an issue in dart-lang/sdk regarding an uncatchable exception in dart:io's HttpClient, which is an important crash bug. Although collaborator kevmoo and parlough CC'd me as the library owner, I am not assigned, there is no direct actionable request or pending question waiting on me right now, and the thread has been quiet for over a year and a half. It rates as an old but important issue where I was CC'd.
- **Next action:** None; old unassigned dart:io SDK bug where I was only CC'd years ago.

### 12. dart-lang/native#3752 → predicted 17, priority 0.25
- **Ground truth:** 
- **Model:** You opened this issue and assigned it to yourself, but you have already created PR #3763 to address it. Because there is an active PR implementing the fix, all relevant action shifts to that PR rather than this issue. Consequently, the priority is lowered into the 0.15-0.35 range.
- **Next action:** Follow up on PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 12, priority 0.52
- **Ground truth:** 
- **Model:** This issue is in a repository I am responsible for, filed by a close collaborator (sigurdm). I was the last to comment over two weeks ago, noting I was considering how to solve this generally, leaving the ball in my court. While not an emergency or security bug, it is ongoing maintenance work waiting on my direction.
- **Next action:** Decide whether to address package version requirements via automation or open a PR to update the pubspec constraints manually.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated dependency update in `dart-lang/tools`, which is not a repository you own or maintain. You are only notified via a team review request to `dart-ecosystem-team`. Because this is not directly assigned to you and someone else on the team can handle it, it is low priority.
- **Next action:** Waiting for a member of dart-ecosystem-team responsible for package:boring to review this automated PR.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in googleapis/google-cloud-dart reports a legitimate bug with error code handling, but the author has already submitted PR #382 to fix it. Per the duplicate handling guidance, when an issue is covered by an open PR, the PR is the primary item to review and act on. Consequently, the priority of this issue is kept low in favor of reviewing the PR.
- **Next action:** Review PR #382 instead of acting on this issue directly.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http, fixing a bug in cronet_http. I requested a review from goderbauer only two days ago, so it is currently waiting on their response. There is nothing for me to do until a week has passed without activity.
- **Next action:** Wait for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I maintain, originally filed by a close collaborator (kevmoo). I self-assigned it and recently clarified the scope by splitting out related work into #80. It represents active planned work on my plate (scale 0.5–0.65).
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient as outlined in the issue.

### 18. dart-lang/http#2031 → predicted 26, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR prepares the release for package:http2, an area of dart-lang/http that I am explicitly not responsible for. Additionally, it is stacked on other PRs in the stack that have not yet landed or been fully reviewed (such as #2014). Even though mosuem requested my review, stacked PRs waiting on earlier ones have very low priority.
- **Next action:** Wait for underlying stacked PRs (including #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I maintain, converted to draft 45 days ago with no activity since. The scale suggests scoring 'my own drafts I should finish or abandon' in the 0.15–0.35 range. It has merge conflicts and bot comments, but nobody is waiting on it.
- **Next action:** Resume work to finish or close this draft PR.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my directly owned repositories, and review was requested via the dart-ecosystem-team rather than me personally. Furthermore, the author has not yet signed the CLA, making it blocked on contributor action before any review can proceed.
- **Next action:** Waiting on author to sign the Google CLA before review.

### 21. dart-lang/tools#2544 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** Although this addresses a security vulnerability (UNC path injection), it is in dart-lang/tools, a repository I am not responsible for. I was only requested via the generic team handle, and lrhn is actively handling the review. The PR is currently waiting on the author to address lrhn's detailed review comments.
- **Next action:** Waiting on jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on PR #2563, which is currently a draft and unreviewed. Furthermore, it is in dart-lang/tools (which is not one of my primary repositories) and only requested a team review from dart-ecosystem-team rather than me directly. Stacked PRs waiting on lower PRs are low priority until the base work is reviewed.
- **Next action:** Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request in dart-lang/native, which I recently opened and requested review from liamappelbe 2 days ago. Since it has only been a few days and no feedback has arrived yet, there is nothing for me to do until the reviewer responds or roughly a week passes.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.38
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I am responsible for. Sigurdm already approved the Pub/Sub changes, and I recently asked him whether the entire PR is good to merge to relieve natebosch's review load. I am currently waiting for his response before merging.
- **Next action:** Waiting on sigurdm's reply on whether the PR is good to merge without natebosch's review.

### 25. dart-lang/http#579 → predicted 27, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is labeled 'next-breaking-release'. I explicitly stated two years ago that landing it must be coordinated with a major version bump when bandwidth permits, and it has remained dormant aside from an outside user question 14 months ago.
- **Next action:** None; this breaking PR is shelved until a major release is planned.

### 26. dart-lang/http#1932 → predicted 19, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by open PR #2034 ('fix(cronet): avoid cronet namespace duplication') which you authored and updated 2 days ago. Per guidelines, when an issue has an open PR that addresses it, action belongs on the PR and the issue itself should be deprioritized into the 0.15–0.35 range.
- **Next action:** Act on open fix PR #2034 instead of this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** I was only mentioned as an informational CC over two years ago regarding potential HTTP profiling implications. This issue is in flutter/devtools, which is outside my direct ownership, and there is no direct question or action item directed at me.
- **Next action:** None; this is an informational CC in a repository I do not maintain.

### 28. dart-lang/http#1837 → predicted 32, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old low-priority enhancement request labeled 'contributions-welcome' that you responded to a year ago, stating that the team will not actively take it on. There has been no subsequent activity or response. Nothing is waiting on you right now.
- **Next action:** Wait for community contributions or further activity.

### 29. dart-lang/http#2033 → predicted 34, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this PR two days ago, and there have been no new commits or comments since. It is waiting on the author to land it, so there is nothing further for me to do.
- **Next action:** Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is explicitly labeled 'package:http2', and my repository notes specifically state that I am not responsible for http2 in dart-lang/http. Furthermore, nobody has mentioned or requested anything from me directly. It should be scored at 0.0.
- **Next action:** None; this issue belongs to package:http2 which is outside my scope.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not directly responsible for. While authored by my frequent collaborator kevmoo, a team review was requested alongside a specific individual reviewer (davidmorgan). Because a specific reviewer was directly requested, team review requests in non-owned repositories are near 0.
- **Next action:** Waiting on davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 33, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, the author has directly addressed and tagged mosuem for review, so there is nothing for me to do.
- **Next action:** Waiting on mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 30, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to liamappelbe. I previously participated as an informational commenter, but the latest discussion is between liamappelbe and mraleph regarding deep VM runtime details. There is no pending question or action required of me.
- **Next action:** None; issue is owned and being investigated by liamappelbe and VM team members.

### 34. dart-lang/http#1972 → predicted 31, priority 0.05
- **Ground truth:** 
- **Model:** You asked clarifying questions 8 days ago and labeled the issue 'needs-info', with no response yet from the reporter. Additionally, there is an open PR (#1974) attempting to address this issue, making the issue itself low priority until information is provided.
- **Next action:** Waiting on reporter response to clarifying questions.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05, and no new direct activity or mention has occurred on it since. Furthermore, an open PR (#2002) was created to address this issue, making the PR the appropriate place for review. Following the thumbs-down and duplicate/PR guidelines, this issue requires no action and scores 0.0.
- **Next action:** Wait for or review open PR #2002 instead of acting on this issue.

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.60
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although I gave this a thumbs down in August 2026, a colleague (filiph) commented afterwards stating he can reliably reproduce the bug locally and offered to assist. Because I am assigned to this P2 issue in dart:io, I should either engage with filiph to gather diagnostics or unassign myself if I am not going to work on it.
- **Next action:** Reply to filiph's offer to help investigate and either provide reproduction/debugging instructions or unassign myself.
