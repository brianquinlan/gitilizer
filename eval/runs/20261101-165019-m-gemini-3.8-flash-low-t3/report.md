# Gitilizer eval: m-gemini-3.8-flash-low-t3

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-165019

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.686 ± 0.000 |
| spearman | 0.795 ± 0.000 |
| pairwise_acc | 0.843 ± 0.000 |
| ndcg | 0.978 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.889 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.867 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 0.875 ± 0.000 |
| B | 20 | 0.505 ± 0.000 | 0.917 ± 0.000 | 0.600 ± 0.000 | 3.500 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Review the security concern regarding Android certificate revocation and determine if dart:io requires further fixes. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR for client attribution header and pre-release polish |
| 4 | 5.0 (5) | +1.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR on google_cloud_rpc from a first-time contributor. |
| 5 | 4.0 (4) | -1.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's proposed API design for enum number/string support and reply with feedback. |
| 6 | 10.0 (10) | +4.0 | 0.52 | 1/1 | dart-lang/http#2027 | B | Decide on the design proposal for Client.close semantics or begin drafting the implementation/PR. |
| 7 | 7.0 (7) | +0.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in CupertinoClient. |
| 8 | 11.0 (11) | +3.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#360 | A | Decide on an implementation plan or prepare a PR to address mid-stream error handling and JSON streaming in _makeStreamingRequest. |
| 9 | 9.0 (9) | +0.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | Investigate HTTP header parsing in dart:io to enforce RFC 9110 tchar validation, or reassign if not handling. |
| 10 | 13.0 (13) | +3.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to respond regarding discovery format API size vs convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | None; keep in mind for future dart:io maintenance since kevmoo noted interest years ago. |
| 12 | 18.0 (18) | +6.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Follow up on PR #3763 instead of this issue. |
| 13 | 12.0 (12) | -1.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide whether to fix the dependency constraints manually or via automation, and update the pubspecs. |
| 14 | 20.0 (20) | +6.0 | 0.15 | 0/1 | dart-lang/tools#2719 | B | Wait for a package owner or team member to review this automated dependency update. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Waiting for goderbauer to review the PR. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient and handle non-JSON error responses in google_cloud_rpc. |
| 18 | 27.0 (27) | +9.0 ⚠️ | 0.05 | 0/1 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 19.0 (19) | +0.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Resume work to finish or abandon this draft PR for DNS support. |
| 20 | 21.0 (21) | +1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Waiting on author to sign the Google CLA before review. |
| 21 | 30.0 (30) | +9.0 ⚠️ | 0.05 | 0/1 | dart-lang/tools#2544 | B | Waiting on jonasfj to address review comments from lrhn. |
| 22 | 24.0 (24) | +2.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 14.0 (14) | -10.0 ⚠️ | 0.35 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to reply regarding whether the PR is ready to merge or needs Nate's review. |
| 25 | 25.0 (25) | +0.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Leave PR parked until a breaking 2.0 release is planned. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1932 | B | Follow up on open PR #2034 which addresses this issue. |
| 27 | 28.0 (28) | +1.0 | 0.05 | 0/1 | flutter/devtools#8223 | B | None; this is an informational CC in a repository I do not maintain, with questions directed to others. |
| 28 | 31.0 (31) | +3.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | None; waiting for community interest or contributions. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue belongs to package:http2 which is outside my scope of responsibility. |
| 31 | 26.0 (26) | -5.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the PR. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on mosuem to review the PR. |
| 33 | 29.0 (29) | -4.0 | 0.05 | 0/1 | dart-lang/native#3653 | A | None; liamappelbe is assigned and driving this issue in dart-lang/native. |
| 34 | 35.0 (35) | +1.0 | 0.00 | 0/1 | dart-lang/http#1972 | B | Waiting on reporter Keetz to respond to request for reproduction info. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | Track progress on PR #2002 instead of this issue. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.65 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph's offer to provide a local reproduction or investigate the issue as the assignee. |

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
- **Model:** This is an assigned security issue concerning certificate trust and revocation on Android, where recent activity highlights a major intermediate CA private key compromise. According to the guidance, security issues assigned to me with new activity must be treated with top urgency (0.9+), regardless of age or priority labels. I need to verify our exposure and ensure the necessary revocations or mitigations are in place.
- **Next action:** Review the security concern regarding Android certificate revocation and determine if dart:io requires further fixes.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own pull request fixing a package publishing bug, and my collaborator kevmoo left a concrete review question less than a day ago that is blocking progress. Reviewer feedback on my own PR takes high priority to keep work moving forward.
- **Next action:** Reply to kevmoo's review comment on CHANGELOG preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for where I serve as the default reviewer. It was authored by my close collaborator sigurdm 5 days ago and is ready for human review. PR reviews for collaborators in my own repos fall directly in the 0.65-0.8 range.
- **Next action:** Review sigurdm's PR for client attribution header and pre-release polish

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for where I serve as default reviewer. The bot comment does not count as a human review. Because the author is a first-time contributor rather than a close collaborator, it falls slightly below collaborator PRs in the 0.65-0.8 range.
- **Next action:** Review this PR on google_cloud_rpc from a first-time contributor.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue in googleapis/google-cloud-dart, a repository I am responsible for. A contributor followed up on my request to share a preliminary design proposal before writing code, so they are currently waiting on my review/reply to proceed. This rates in the 0.65-0.8 range as an active contributor waiting on my guidance in my own repository.
- **Next action:** Review Yusufihsangorgel's proposed API design for enum number/string support and reply with feedback.

### 6. dart-lang/http#2027 → predicted 10, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in dart-lang/http, a repository you are responsible for, laying out a design question around Client.close semantics. It represents your own planned work that is not waiting on anyone else. Because it was filed 9 days ago and has seen no external replies, it sits squarely in the 0.5–0.65 range as fresh planned work.
- **Next action:** Decide on the design proposal for Client.close semantics or begin drafting the implementation/PR.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue to yourself and explicitly stated 5 hours ago that you have started working on it. This falls directly into the 'own planned work / things I said I'm working on' tier (0.5–0.65). It is in dart-lang/http (which you maintain) and represents an active commitment.
- **Next action:** Work on implementing the server trust evaluation hook in CupertinoClient.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, and was filed by a close collaborator (kevmoo). Kevmoo answered my question regarding urgency, clarifying that while it is not an emergency, it is a known design hole in streaming RPC error handling. Because there is a clear next step for me to address or schedule this work, it sits in the moderate priority range for planned/collaborator backlog.
- **Next action:** Decide on an implementation plan or prepare a PR to address mid-stream error handling and JSON streaming in _makeStreamingRequest.

### 9. dart-lang/sdk#59846 → predicted 9, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue in dart-lang/sdk regarding HTTP header character parsing in dart:io. Invalid characters like NUL in headers can present HTTP request smuggling or proxy desync security risks, though it is currently treated as an assigned backlog bug with no recent activity in nearly two years. As an assigned issue that represents your planned work, you should investigate and fix it or unassign yourself.
- **Next action:** Investigate HTTP header parsing in dart:io to enforce RFC 9110 tchar validation, or reassign if not handling.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, filed by collaborator kevmoo. I asked a substantive question comparing discovery format trade-offs to convenience extensions 16 days ago, and we are waiting on kevmoo's reply before deciding how to proceed.
- **Next action:** Waiting on kevmoo to respond regarding discovery format API size vs convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an issue in dart-lang/sdk where I was CC'd by parlough and my collaborator kevmoo as the owner of the library. However, it is an old issue in a repository not listed as my direct responsibility, with no recent direct requests or activity for over 1.5 years. It represents an important bug in widely used core library code, but without any active crisis or new development, it remains a low-to-moderate priority backlog item.
- **Next action:** None; keep in mind for future dart:io maintenance since kevmoo noted interest years ago.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** You opened this issue and assigned it to yourself, but you have already opened PR #3763 to address it. Issues with active open PRs should be ranked well below their corresponding PRs in the 0.15–0.35 range. Action should be taken on PR #3763 rather than this issue.
- **Next action:** Follow up on PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 12, priority 0.52
- **Ground truth:** 
- **Model:** This is an issue in a repository I am responsible for (googleapis/google-cloud-dart) filed by a close collaborator (sigurdm). I was the last to comment, noting that I was considering how to address this issue generally. Since it is planned work in my repo where I took ownership of the decision, it sits in my planned work backlog.
- **Next action:** Decide whether to fix the dependency constraints manually or via automation, and update the pubspecs.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.15
- **Ground truth:** 
- **Model:** This is an automated PR updating BoringSSL in dart-lang/tools, which is not one of my primary repositories. The review request is directed to the dart-ecosystem-team rather than to me personally. As a team review request in a repo I do not own, it is low priority.
- **Next action:** Wait for a package owner or team member to review this automated dependency update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository I maintain (googleapis/google-cloud-dart) and reports a significant functional bug with retry logic. However, the author opened PR #382 to fix it, so review effort should be focused directly on the PR rather than the issue. Per instructions, issues with active PRs covering them are ranked well below their PR in the 0.15–0.35 range.
- **Next action:** Review PR #382 instead of this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR in dart-lang/http and you requested a review from goderbauer two days ago. Since less than a week has passed, there is nothing for you to do right now except wait for their response.
- **Next action:** Waiting for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in my repository (googleapis/google-cloud-dart) filed by a close collaborator (kevmoo). I recently self-assigned it, researched cross-language retry examples, and narrowed its scope. It represents my own active planned work, placing it squarely in the 0.5–0.65 range.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient and handle non-JSON error responses in google_cloud_rpc.

### 18. dart-lang/http#2031 → predicted 27, priority 0.05
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release preparation PR is at the top of a stack where lower PRs (notably #2014) still require review before this can land. Furthermore, my profile specifically notes that I am not responsible for http2 in dart-lang/http.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in googleapis/google-cloud-dart, created and converted to draft 45 days ago with merge conflicts. Per the guidelines, own drafts that should be finished or abandoned fall into the 0.15–0.35 range. Because it is stale and in draft, it is low priority compared to active reviews or blocking work.
- **Next action:** Resume work to finish or abandon this draft PR for DNS support.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my directly managed repositories, and the review request is to the team rather than me personally. Additionally, the author has not signed the Google CLA yet, blocking any review or merge. As a team review request in an outside repo that is currently blocked on contributor setup, it warrants low priority.
- **Next action:** Waiting on author to sign the Google CLA before review.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** This is a security-related PR in dart-lang/tools, a repository I am not responsible for, where I am only included via a team review request. Furthermore, lrhn was specifically requested and actively reviewing it, and it is currently waiting on the author (jonasfj) to address lrhn's comments from two months ago. As a security PR where someone else is actively reviewing in a repo I don't own, this does not require my attention.
- **Next action:** Waiting on jonasfj to address review comments from lrhn.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools (not one of my primary assigned repos) and only requested a review from the dart-ecosystem-team rather than me directly. Furthermore, it is stacked on PR #2563, which is still an unreviewed draft, meaning this PR should not be reviewed until the foundation lands.
- **Next action:** Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, which I opened and requested a review on from liamappelbe 2 days ago. Since it has only been a couple of days, it is comfortably waiting on reviewer feedback.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.35
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I am responsible for. I asked collaborator sigurdm 4 days ago whether his approval covers the whole PR or if Nate Bosch still needs to review it. Since I am waiting on his answer before merging, it is currently waiting on someone else, but remains moderately visible as it is close to landing.
- **Next action:** Wait for sigurdm to reply regarding whether the PR is ready to merge or needs Nate's review.

### 25. dart-lang/http#579 → predicted 25, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR carries the 'next-breaking-release' label and introduces breaking API changes that require a major semver bump. I explicitly stated that landing this must be coordinated with a major release and that I lack the bandwidth to drive that right now. Per the guidelines, PRs waiting for a future breaking release are low priority (around 0.05–0.15).
- **Next action:** Leave PR parked until a breaking 2.0 release is planned.

### 26. dart-lang/http#1932 → predicted 17, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by an open PR (#2034) authored by me to fix the cronet namespace duplication. Per the instructions, issues that have an active PR fixing them should be ranked well below the PR in the 0.15-0.35 range since all action is on the PR.
- **Next action:** Follow up on open PR #2034 which addresses this issue.

### 27. flutter/devtools#8223 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, which is not a repository I am responsible for. I was only mentioned over two years ago as an informational CC by bkonyi regarding HTTP profiling considerations, and subsequent questions have been addressed to him. There is no action for me to take here.
- **Next action:** None; this is an informational CC in a repository I do not maintain, with questions directed to others.

### 28. dart-lang/http#1837 → predicted 31, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded a year ago clarifying that the Dart team will not take this on and marked it as contributions-welcome and P3. There has been no activity since your response. This is dormant backlog with no pending action for you.
- **Next action:** None; waiting for community interest or contributions.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this PR, and there has been no new activity since. It is ready for the author to merge, so there is nothing left for me to do.
- **Next action:** Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, this is an old enhancement/performance issue with no direct mention or request for my involvement. It requires no action from me.
- **Next action:** None; this issue belongs to package:http2 which is outside my scope of responsibility.

### 31. dart-lang/tools#2715 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. Although it was filed by a collaborator (kevmoo), it requested a team review and specifically requested davidmorgan as an individual reviewer. Because a specific individual reviewer is assigned outside my repositories, there is nothing for me to do.
- **Next action:** Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I explicitly noted that I am not responsible for `http2` in `dart-lang/http`. Furthermore, the author directly pinged `mosuem` for review, so this is entirely out of my scope and waiting on someone else.
- **Next action:** Waiting on mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 29, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and actively investigated by liamappelbe. I previously contributed experimental context, but there is no question or request directed at me to act on.
- **Next action:** None; liamappelbe is assigned and driving this issue in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You asked clarifying questions and added the 'needs-info' label 8 days ago, and the reporter has not responded yet. Furthermore, there is an open PR (#1974) addressing this issue, so any eventual action will belong on that PR instead of this issue. According to guidelines, issues with 'needs-info' and no reply score at or near 0.0.
- **Next action:** Waiting on reporter Keetz to respond to request for reproduction info.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05, and no direct activity directed at you has occurred on this thread since then. Furthermore, an open pull request (PR #2002) has already been created to address this issue, making the PR the appropriate place to direct any attention.
- **Next action:** Track progress on PR #2002 instead of this issue.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.65
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although you marked this issue with a thumbs-down in August 2026, a significant update occurred on October 1st: filiph reported being able to reproduce the bug locally and asked how to help hunt it down. As the assignee on this P2 issue in dart:io, following up on a reliable reproduction is actionable and high-leverage.
- **Next action:** Reply to filiph's offer to provide a local reproduction or investigate the issue as the assignee.
