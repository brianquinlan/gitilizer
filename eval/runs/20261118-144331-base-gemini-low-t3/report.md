# Gitilizer eval: base-gemini-low-t3

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-144331

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.708 ± 0.000 |
| spearman | 0.838 ± 0.000 |
| pairwise_acc | 0.854 ± 0.000 |
| ndcg | 0.988 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.778 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.867 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 0.875 ± 0.000 |
| B | 20 | 0.579 ± 0.000 | 0.974 ± 0.000 | 0.600 ± 0.000 | 3.200 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Assess the security concern regarding Android certificate revocation / blocklists and determine if action is needed beyond issue #64644. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG.md preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.78 | 1/1 | googleapis/google-cloud-dart#376 | A | Review Sigurd's PR on Pub/Sub client attribution headers and release polish. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR fixing RPC error code handling in google_cloud_rpc. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel with feedback on their proposed enum design representation. |
| 6 | 7.0 (7) | +1.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | Decide on proposed API changes or implement the `Client.close` update. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in cupertino_http. |
| 8 | 11.0 (11) | +3.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#360 | A | Decide on an implementation plan or draft a fix for the mid-stream error handling and streaming behavior. |
| 9 | 10.0 (10) | +1.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | Investigate the header validation in dart:io and fix the parser or reassign the issue. |
| 10 | 14.0 (14) | +4.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | None; issue is in dart-lang/sdk with no recent activity or direct assignments. |
| 12 | 18.0 (18) | +6.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Follow PR #3763 which implements the fix for this issue. |
| 13 | 9.0 (9) | -4.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on the automation approach or prepare a PR bumping the required dependency versions in pubspec.yaml. |
| 14 | 20.0 (20) | +6.0 | 0.15 | 0/1 | dart-lang/tools#2719 | B | Wait for another member of dart-ecosystem-team to review this automated dependency update. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review the linked PR #382 instead of acting on this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for goderbauer to review the PR. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient or unassign myself. |
| 18 | 25.0 (25) | +7.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | Wait for lower stacked PRs (such as #2014) to be reviewed and merged first. |
| 19 | 19.0 (19) | +0.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Resume work to finish and undraft this PR, or close it if abandoned. |
| 20 | 21.0 (21) | +1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Wait for author to sign the Google CLA or other team members to pick up the review. |
| 21 | 29.0 (29) | +8.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn's review feedback. |
| 22 | 24.0 (24) | +2.0 | 0.08 | 0/1 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged before reviewing this PR. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 13.0 (13) | -11.0 ⚠️ | 0.40 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to confirm if the PR is good to merge or if natebosch needs to review it. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Wait for planning of the next major breaking release (package:http 2.0). |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | Work on and land PR #2034 which fixes this issue. |
| 27 | 31.0 (31) | +4.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | None; this is an informational CC in flutter/devtools with no action requested of me. |
| 28 | 30.0 (30) | +2.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | Waiting for community contribution or external updates. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue concerns package:http2 which is outside my area of responsibility. |
| 31 | 27.0 (27) | -4.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review the PR. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on mosuem to review the PR. |
| 33 | 28.0 (28) | -5.0 | 0.05 | 0/1 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide whether to pursue changes to the VM/FFIgen or close the issue. |
| 34 | 35.0 (35) | +1.0 | 0.00 | 0/1 | dart-lang/http#1972 | B | Waiting for the reporter to provide reproduction details. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | Review the linked PR #2002 instead of acting on this issue. |
| 36 | 12.0 (12) | -24.0 ⚠️ | 0.52 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph offering debugging guidance or take repro steps to investigate. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#345** (truth #19) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/core#1007** (truth #20) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security-related issue created by and assigned to me in the Dart SDK concerning TLS trust and disabled CA certificates. A comment 3 days ago flagged critical security implications regarding the recent eMudhra intermediate CA key compromises and Android blocklist enforcement. Per instructions, security issues assigned to me with recent activity outrank everything else.
- **Next action:** Assess the security concern regarding Android certificate revocation / blocklists and determine if action is needed beyond issue #64644.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my open PR addressing an issue in googleapis/google-cloud-dart (#358). My collaborator kevmoo reviewed it and raised an architectural question/blocking issue about CHANGELOG deletion, waiting on my response before it can move forward.
- **Next action:** Reply to kevmoo's review comment on CHANGELOG.md preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.78
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in a repository you are directly responsible for (google-cloud-dart), authored by your close collaborator sigurdm. It has been waiting for review for 5 days with only bot comments. Collaborator PRs in your own repositories are high priority.
- **Next action:** Review Sigurd's PR on Pub/Sub client attribution headers and release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am directly responsible for. As the default reviewer, it is on me to review external contributions that fix legitimate bugs. Since the author is a first-time contributor rather than a close collaborator, it falls into the standard review range (around 0.70).
- **Next action:** Review this PR fixing RPC error code handling in google_cloud_rpc.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** A contributor is working on an issue in a repository I own (`googleapis/google-cloud-dart`) and has followed up with a design sketch as I requested. They are waiting on my feedback before proceeding with code changes. Responding promptly avoids blocking an active external contributor.
- **Next action:** Reply to Yusufihsangorgel with feedback on their proposed enum design representation.

### 6. dart-lang/http#2027 → predicted 7, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this architectural issue in a repository you own regarding `Client.close` semantics. It represents planned work for an upcoming release that is still relatively fresh (filed ~9 days ago) and not waiting on anyone else. As it ages without progress it will drop, but currently falls in the planned work band.
- **Next action:** Decide on proposed API changes or implement the `Client.close` update.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue to yourself and commented 5 hours ago that you've started working on it. This represents your own active, planned work in a repository you maintain. It falls into the planned work range (0.5–0.65).
- **Next action:** Work on implementing the server trust evaluation hook in cupertino_http.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in googleapis/google-cloud-dart (a repository I am responsible for) filed by my close collaborator kevmoo. Kevmoo replied to my question clarifying his perspective, leaving the ball in my court, though he noted it is not urgent. Because it represents a clear architectural gap in generated streaming RPCs that I can act on, it sits in my planned work range.
- **Next action:** Decide on an implementation plan or draft a fix for the mid-stream error handling and streaming behavior.

### 9. dart-lang/sdk#59846 → predicted 10, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue in dart:io was assigned to me 22 months ago and has sat dormant since triage. Accepting invalid characters such as NUL in HTTP headers can lead to request smuggling or proxy desync vulnerabilities, though no active exploit or recent activity has been reported. As an assigned issue on my plate with no progress, I should either plan to fix it or reassign it.
- **Next action:** Investigate the header validation in dart:io and fix the parser or reassign the issue.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue filed by my close collaborator kevmoo in a repository I maintain (google-cloud-dart). I left a question 16 days ago questioning whether switching to discovery is the right tradeoff due to API surface bloat, and we are waiting on kevmoo to reply before deciding how to proceed.
- **Next action:** Waiting on kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an issue in dart-lang/sdk where I was CC'd over two years ago as the owner of dart:io / HTTP libraries, including an explicit ping from collaborator kevmoo. However, it has been inactive for nearly two years and I am neither assigned nor responsible for managing sdk repo issues directly. Given the impact (crashing uncatchable exception) and collaborator CC, it sits at the bottom of the 'important issues where I was only CC'd' tier.
- **Next action:** None; issue is in dart-lang/sdk with no recent activity or direct assignments.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** I filed this issue and assigned it to myself, but I also already opened PR #3763 to fix it. Because there is an open PR addressing this bug, actions should be taken on the PR rather than the issue. As instructed, issues covered by an active PR are kept in the low 0.15-0.35 priority range.
- **Next action:** Follow PR #3763 which implements the fix for this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.55
- **Ground truth:** 
- **Model:** This is an issue in a repository I am responsible for, filed by a close collaborator (sigurdm) tracking necessary dependency bumps before releases. I was the last to comment over two weeks ago noting I was considering general automation, but the release blocker remains unaddressed. It is planned work in my domain that warrants follow-up.
- **Next action:** Decide on the automation approach or prepare a PR bumping the required dependency versions in pubspec.yaml.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.15
- **Ground truth:** 
- **Model:** This is an automated PR in dart-lang/tools, which is not one of my primary repositories. Review was requested from the dart-ecosystem-team rather than me personally. Since I am not specifically assigned or driving this repository, it represents a low-priority shared team request.
- **Next action:** Wait for another member of dart-ecosystem-team to review this automated dependency update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository I maintain (googleapis/google-cloud-dart) and reports a valid retry bug, but it already has an open pull request (#382) submitted to fix it. Per guidelines, when an open PR covers an issue, the PR is the primary item to review and act on, so the issue itself should be deprioritized into the 0.15–0.35 range.
- **Next action:** Review the linked PR #382 instead of acting on this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your own PR in dart-lang/http, and you requested a review from goderbauer only two days ago. Since it has been less than a week without a response, there is nothing for you to do right now. It will warrant a ping if there is still no activity after about a week.
- **Next action:** Wait for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue in my repository filed by a close collaborator (kevmoo) that I assigned to myself. I previously researched design options and scoped out irrelevant requirements, making it my planned work ready for implementation. It sits squarely in the 0.5–0.65 range for assigned planned work awaiting execution.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient or unassign myself.

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR prepares the release for `package:http2`, an area of `dart-lang/http` you have explicitly noted you are not responsible for. Additionally, it is at the top of a stack where lower PRs (like #2014) are still unreviewed/unmerged. Even though a collaborator directly requested your review, stacked release PRs should wait until the underlying PRs land.
- **Next action:** Wait for lower stacked PRs (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding DNS support to google-cloud-dart, but it has been stale for 45 days. It has merge conflicts and bot review comments to address before requesting review. Per the guidance, stale drafts that need to be finished or abandoned belong in the 0.15–0.35 priority range.
- **Next action:** Resume work to finish and undraft this PR, or close it if abandoned.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a PR in dart-lang/core, which is not one of my primary assigned repositories. The review request is directed to the broad dart-ecosystem-team rather than me personally, and the PR is currently blocked on the author signing the CLA.
- **Next action:** Wait for author to sign the Google CLA or other team members to pick up the review.

### 21. dart-lang/tools#2544 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** Although this addresses a security vulnerability (UNC path injection), it is in dart-lang/tools, a repository I am not responsible for. I was only requested as part of the generic dart-ecosystem-team review, and lrhn is already actively driving the review. Furthermore, the PR is waiting on the author (jonasfj) to respond to lrhn's detailed comments from two months ago.
- **Next action:** Wait for jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft and unreviewed. In addition, this is in dart-lang/tools where you are not a default owner, and the review request is to the dart-ecosystem-team rather than you individually. As per guidelines, stacked PRs waiting on lower PRs are low priority.
- **Next action:** Wait for base PR #2563 to be reviewed and merged before reviewing this PR.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request in dart-lang/native, which I opened and requested review on 2 days ago. Since less than a week has passed since requesting review from liamappelbe, there is no action for me right now.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 13, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I am responsible for. Sigurd approved the PubSub portions, but I asked him 4 days ago whether he can sign off on the full PR to relieve Nate. We are currently waiting on Sigurd's reply before merging.
- **Next action:** Wait for sigurdm to confirm if the PR is good to merge or if natebosch needs to review it.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is explicitly tagged 'next-breaking-release'. I previously stated that landing this requires coordination with a major version bump which is deferred due to bandwidth, so there is no immediate action required right now.
- **Next action:** Wait for planning of the next major breaking release (package:http 2.0).

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is an active open PR (#2034) authored by me that directly fixes this bug. According to the guidance, when an issue has an open PR addressing it, the action belongs on the PR rather than the issue itself, so the issue should be kept in the low priority range (0.15–0.35).
- **Next action:** Work on and land PR #2034 which fixes this issue.

### 27. flutter/devtools#8223 → predicted 31, priority 0.02
- **Ground truth:** 
- **Model:** This is an issue in flutter/devtools, a repository I am not responsible for. I was only mentioned as an informational CC over two years ago regarding HTTP profiling considerations, and subsequent questions are directed at bkonyi. There is nothing for me to do here.
- **Next action:** None; this is an informational CC in flutter/devtools with no action requested of me.

### 28. dart-lang/http#1837 → predicted 30, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old P3 feature request where I already explicitly noted that the team is unlikely to take it on. It is marked 'contributions-welcome' with no new activity since my comment. Per guidelines, old low-priority backlog and contributions-welcome issues with nothing waiting on me score around 0.05.
- **Next action:** Waiting for community contribution or external updates.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this pull request two days ago, and there have been no new commits or activity since. It is waiting on the author (mosuem) to land it, so there is nothing further for me to do.
- **Next action:** Waiting on mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, this is an old enhancement issue with no mention or request directed to me. It requires no attention from me.
- **Next action:** None; this issue concerns package:http2 which is outside my area of responsibility.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. Although it is authored by a collaborator (kevmoo), it specifically requested davidmorgan for review alongside a team review request. Because another reviewer is explicitly named and I am not directly assigned, this is near 0 for me.
- **Next action:** Waiting on davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This pull request is exclusively for package:http2, an area of dart-lang/http that I am explicitly not responsible for. Additionally, the author has explicitly asked mosuem for a review, so there is no action needed from me.
- **Next action:** Waiting on mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 28, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to liamappelbe. I participated in technical discussions over a month ago, but the conversation is currently between liamappelbe and mraleph with liam concluding it may not be worth the effort. There is no question or action waiting on me.
- **Next action:** Waiting on liamappelbe to decide whether to pursue changes to the VM/FFIgen or close the issue.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** I asked the reporter questions to clarify the issue and labeled it 'needs-info' 8 days ago, with no response since. Furthermore, there is an open PR (#1974) addressing the bug. Because it is awaiting reporter information and there is already an open PR, there is nothing for me to do on this issue right now.
- **Next action:** Waiting for the reporter to provide reproduction details.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05, and no new direct activity addressed to you has occurred on this issue since then. Furthermore, an open PR (#2002) is actively addressing this issue, so any action should take place on the PR rather than here.
- **Next action:** Review the linked PR #2002 instead of acting on this issue.

### 36. dart-lang/sdk#38148 → predicted 12, priority 0.52
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am assigned to this P2 issue in dart-lang/sdk, and after I marked it with a thumbs-down in August 2026, a community member recently commented stating they have a reliable reproduction on macOS and asked how they can help. Because there is new, actionable activity on an issue assigned to me, it resets the thumbs-down. I should respond to coordinate on the repro or unassign myself if I cannot work on it.
- **Next action:** Reply to filiph offering debugging guidance or take repro steps to investigate.
