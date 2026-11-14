# Gitilizer eval: v5g-gemini-low-r2

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5g.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031631

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.716 ± 0.007 |
| spearman | 0.835 ± 0.006 |
| pairwise_acc | 0.858 ± 0.004 |
| ndcg | 0.986 ± 0.001 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.767 ± 0.058 |
| mean_abs_displacement | 3.759 ± 0.085 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.894 ± 0.035 | 0.999 ± 0.001 | 1.000 ± 0.000 | 0.708 ± 0.191 |
| B | 20 | 0.582 ± 0.026 | 0.965 ± 0.004 | 0.600 ± 0.000 | 3.200 ± 0.100 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.91 | 3/3 | dart-lang/sdk#48056 | A | Assess whether Android certificate revocation and blocklists apply to this issue and verify if recent mitigations (#64644) resolve the security concern. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on bump.go regarding CHANGELOG.md preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.76 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR adding client attribution headers and pre-release polish to google_cloud_pubsub. |
| 4 | 5.0 (5) | +1.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR fixing RPC error code handling in google_cloud_rpc. |
| 5 | 4.0 (4) | -1.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#252 | B | Review and provide feedback on Yusufihsangorgel's proposed enum representation design. |
| 6 | 7.7 (7–8) | +1.7 | 0.56 | 3/3 | dart-lang/http#2027 | B | Draft a proposal or PR to make Client.close return a Future as part of the planned 2.0 release. |
| 7 | 6.0 (6) | -1.0 | 0.61 | 3/3 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in CupertinoClient. |
| 8 | 9.7 (9–11) | +1.7 | 0.54 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide on an implementation plan or draft a fix for mid-stream error detection and incremental streaming in ServiceClient._makeStreamingRequest. |
| 9 | 12.0 (12) | +3.0 | 0.50 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the HTTP header name parsing bug in dart:io or unassign myself. |
| 10 | 13.7 (13–14) | +3.7 | 0.41 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.36 | 0/3 | dart-lang/sdk#31275 | A | None; this is an unassigned SDK issue where I was only CC'd years ago with no recent activity. |
| 12 | 18.3 (17–19) | +6.3 | 0.22 | 0/3 | dart-lang/native#3752 | B | Follow up on open PR #3763 instead of this issue. |
| 13 | 10.0 (9–11) | -3.0 | 0.54 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to handle package dependency bumps manually or through automation, and submit the PR updating pubspec constraints. |
| 14 | 17.3 (16–18) | +3.3 | 0.20 | 0/3 | dart-lang/tools#2719 | B | Wait for another dart-ecosystem-team member responsible for tools to review this automated update. |
| 15 | 16.3 (16–17) | +1.3 | 0.23 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting on this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/3 | dart-lang/http#2034 | B | Waiting for goderbauer to review the pull request. |
| 17 | 7.3 (7–8) | -9.7 ⚠️ | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient and handle HTML responses in ServiceException. |
| 18 | 25.3 (25–26) | +7.3 | 0.08 | 0/3 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 20.0 (20) | +1.0 | 0.20 | 3/3 | googleapis/google-cloud-dart#345 | A | Resume work on this draft PR or decide whether to close/abandon it. |
| 20 | 21.0 (21) | +1.0 | 0.15 | 0/3 | dart-lang/core#1007 | B | Wait for contributor to sign the CLA and for someone on the team to pick up the review. |
| 21 | 27.0 (25–30) | +6.0 | 0.08 | 0/3 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn's review comments. |
| 22 | 24.0 (24) | +2.0 | 0.09 | 0/3 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged first, and for an explicit review request. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the pull request. |
| 24 | 13.3 (13–14) | -10.7 ⚠️ | 0.39 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to confirm if the PR is good to merge or if natebosch still needs to review. |
| 25 | 27.0 (27) | +2.0 | 0.08 | 0/3 | dart-lang/http#579 | B | None; this PR is blocked waiting for a future major breaking release. |
| 26 | 18.0 (17–19) | -8.0 | 0.22 | 0/3 | dart-lang/http#1932 | B | Work on and drive the linked PR #2034 rather than this issue. |
| 27 | 28.7 (28–29) | +1.7 | 0.05 | 0/3 | flutter/devtools#8223 | B | None; this is an informational CC in a repository I do not maintain. |
| 28 | 29.7 (26–32) | +1.7 | 0.06 | 0/3 | dart-lang/http#1837 | A | Wait for community contributions or further interest. |
| 29 | 33.0 (32–34) | +4.0 | 0.01 | 0/3 | dart-lang/http#2033 | A | Waiting on mosuem to merge. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | None; this issue is outside my stated scope and requires no action from me. |
| 31 | 29.3 (28–32) | -1.7 | 0.04 | 0/3 | dart-lang/tools#2715 | B | Wait for requested reviewer davidmorgan to review this PR. |
| 32 | 33.3 (33–34) | +1.3 | 0.00 | 0/3 | dart-lang/http#2026 | A | Waiting for mosuem to review this http2 PR. |
| 33 | 31.3 (29–35) | -1.7 | 0.03 | 0/3 | dart-lang/native#3653 | A | None; waiting on liamappelbe and VM/native team to decide on the architecture. |
| 34 | 30.7 (30–31) | -3.3 | 0.05 | 0/3 | dart-lang/http#1972 | B | Waiting for reporter response to clarifying questions. |
| 35 | 34.7 (34–35) | -0.3 | 0.00 | 0/3 | dart-lang/http#1841 | B | None; an open PR covers this issue and nothing has happened since my thumbs-down. |
| 36 | 10.3 (10–11) | -25.7 ⚠️ | 0.55 | 3/3 | dart-lang/sdk#38148 | B | Follow up with filiph regarding local reproduction steps or unassign myself. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an open security-sensitive issue assigned to me regarding certificate validation and trusted root CAs on Android. A critical security comment was posted 3 days ago raising an active intermediate CA compromise (eMudhra) and asking whether Dart improperly trusts revoked/blocked certificates. Security comes first, and assigned security issues with fresh activity demand immediate attention regardless of repo ownership or P3 label.
- **Next action:** Assess whether Android certificate revocation and blocklists apply to this issue and verify if recent mitigations (#64644) resolve the security concern.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own active PR that fixes an issue in google-cloud-dart release tooling. My close collaborator kevmoo reviewed it less than a day ago with a concrete technical question blocking progress. I need to answer his feedback and adjust the code to keep the PR moving forward.
- **Next action:** Reply to kevmoo's review comment on bump.go regarding CHANGELOG.md preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.76
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I am directly responsible for, authored by my frequent collaborator sigurdm. As default reviewer for this repository, the next step is mine. It has been open for 5 days without a human review, so it should be prioritized promptly.
- **Next action:** Review sigurdm's PR adding client attribution headers and pre-release polish to google_cloud_pubsub.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in a repository I am responsible for (googleapis/google-cloud-dart), making me the default reviewer. It fixes a bug where retry logic fails over REST due to mismapped error codes. Since it comes from an outside contributor rather than a close collaborator, it sits comfortably in the review range at 0.7.
- **Next action:** Review this PR fixing RPC error code handling in google_cloud_rpc.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.73
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I authored in my repository googleapis/google-cloud-dart. A contributor has done the research requested and proposed an API design to handle unknown integer enum values. They are waiting on my feedback before proceeding with code changes.
- **Next action:** Review and provide feedback on Yusufihsangorgel's proposed enum representation design.

### 6. dart-lang/http#2027 → predicted 8, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is an issue I filed myself 9 days ago outlining planned architectural work in a core repository I maintain (dart-lang/http). Since it represents fresh planned work (under two weeks old) without external blockers, it falls squarely in my 0.5–0.65 range. It is ready for me to investigate further or start prototyping.
- **Next action:** Draft a proposal or PR to make Client.close return a Future as part of the planned 2.0 release.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly stated just 5 hours ago that I have started working on it. As active planned work in a repository I own, the next steps are mine. It sits squarely in the 0.5–0.65 range as fresh self-assigned work.
- **Next action:** Work on implementing the server trust evaluation hook in CupertinoClient.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, filed by a close collaborator (kevmoo). kevmoo replied to my question clarifying his thoughts, though noting it's not urgent. Because it represents a clear bug/gap in RPC streaming handling waiting for action in my repository, it falls in my planned work range (0.5–0.65), dialed slightly lower within that bracket due to its low urgency and inactivity over the last 17 days.
- **Next action:** Decide on an implementation plan or draft a fix for mid-stream error detection and incremental streaming in ServiceClient._makeStreamingRequest.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is an issue assigned to me in dart-lang/sdk regarding HTTP header validation in dart:io. Assigned issues that I should either fix or unassign belong in the 0.5–0.65 range. Because it has had no activity for nearly two years (22 months), it falls to the bottom of that range.
- **Next action:** Decide whether to fix the HTTP header name parsing bug in dart:io or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in my repository filed by a collaborator (kevmoo). I asked the last question 16 days ago weighing the tradeoffs between switching to discovery vs adding convenience extensions, so the next step is on kevmoo to reply.
- **Next action:** Wait for kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was informational-CC'd by parlough and kevmoo over two years ago as the owner of the library, but I am not assigned and this is not in my primary assigned repos. With no recent activity (last update was a label change 20 months ago), it sits at the bottom of the old/CC'd but important issue range.
- **Next action:** None; this is an unassigned SDK issue where I was only CC'd years ago with no recent activity.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** I filed this issue and assigned myself, but I already have an open PR (#3763) covering and fixing it. When an issue has an open PR, the PR is the proper place to act, putting this issue into the 0.15–0.35 range. There is nothing to do directly on the issue itself.
- **Next action:** Follow up on open PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.52
- **Ground truth:** 
- **Model:** This issue was filed by collaborator Sigurdm in a repository I maintain, outlining necessary pubspec constraint updates before releasing packages. I commented 17 days ago considering how to handle this, so the ball is in my court as planned maintenance work. Because it is an unassigned maintenance task with no activity in over two weeks, it sits in the lower part of the planned work range.
- **Next action:** Decide whether to handle package dependency bumps manually or through automation, and submit the PR updating pubspec constraints.

### 14. dart-lang/tools#2719 → predicted 16, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated dependency update in dart-lang/tools, a repository I am not responsible for. The review request is directed broadly to dart-ecosystem-team rather than to me personally, so other maintainers can handle it.
- **Next action:** Wait for another dart-ecosystem-team member responsible for tools to review this automated update.

### 15. googleapis/google-cloud-dart#381 → predicted 17, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is filed in a repository I am responsible for, but it already has an open PR (#382) submitted by the author to address it. Under our duplicate rules, when an issue is covered by a PR, the action is on the PR and the issue drops to the 0.15–0.35 range. I should review PR #382 rather than taking separate action here.
- **Next action:** Review PR #382 instead of acting on this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in a repository I maintain, fixing an open issue assigned to me. I requested a review from goderbauer only 2 days ago, so there is nothing for me to do until they respond or enough time passes to warrant a follow-up.
- **Next action:** Waiting for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an assigned issue in a repository I maintain, originally filed by a close collaborator (kevmoo). I scoped the work 10 days ago by splitting off the AIP-4222/155 parts to another issue and providing API design examples. It represents active, planned work for me to implement.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient and handle HTML responses in ServiceException.

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although I am explicitly requested as a reviewer by a close collaborator, this release PR is stacked on other unmerged PRs (including #2014 which still needs review). Furthermore, my stated repo scope explicitly notes 'not responsible for http2', making this very low priority until the underlying PRs land.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR that I converted to draft 45 days ago, and it has had no activity since. According to the guidance, personal drafts to finish or abandon belong in the 0.15–0.35 range. Given its age and dirty merge state, it sits at the lower end of that range.
- **Next action:** Resume work on this draft PR or decide whether to close/abandon it.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a PR in dart-lang/core, which is not one of my primary responsible repositories. I was only requested as part of the dart-ecosystem-team, not personally, and the contributor is currently blocked on signing the CLA. Team review requests in repositories I do not own fall into the 0.15–0.35 range.
- **Next action:** Wait for contributor to sign the CLA and for someone on the team to pick up the review.

### 21. dart-lang/tools#2544 → predicted 26, priority 0.08
- **Ground truth:** 
- **Model:** This is in dart-lang/tools, a repository I am not responsible for, and my only involvement is via a team review request (dart-ecosystem-team). Even though it addresses a security issue, lrhn specifically requested a review and has already engaged with detailed technical comments. The PR is currently waiting on author jonasfj to respond to that feedback.
- **Next action:** Wait for jonasfj to address lrhn's review comments.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on draft PR #2563 in dart-lang/tools, a repository I do not own or maintain. Furthermore, only the general dart-ecosystem-team was requested rather than me personally. Stacked PRs whose underlying PRs are not yet reviewed fall into the 0.05–0.15 range.
- **Next action:** Wait for base PR #2563 to be reviewed and merged first, and for an explicit review request.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, which was opened and assigned to reviewer liamappelbe only 2 days ago. Because I am waiting on a recently requested reviewer and nothing is actionable for me yet, it falls into the 0.05–0.15 range.
- **Next action:** Wait for liamappelbe to review the pull request.

### 24. googleapis/google-cloud-dart#373 → predicted 13, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I maintain, and Sigurd has already approved the Pub/Sub changes. I commented 4 days ago asking Sigurd whether he reviewed the rest of the PR or if we still need Nate's review. The next step is waiting on Sigurd's response before merging or waiting on Nate.
- **Next action:** Wait for sigurdm to confirm if the PR is good to merge or if natebosch still needs to review.

### 25. dart-lang/http#579 → predicted 27, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is explicitly marked with the 'next-breaking-release' label. I already commented stating that landing this requires coordination with a major version bump that is not currently planned. It is shelved indefinitely and blocked by release planning, placing it in the 0.05–0.15 range.
- **Next action:** None; this PR is blocked waiting for a future major breaking release.

### 26. dart-lang/http#1932 → predicted 18, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is an active open PR (#2034, 'fix(cronet): avoid cronet namespace duplication') created by me that addresses this bug. Per the guidelines, issues with an open PR covering them belong in the 0.15–0.35 range because action should be taken on the PR itself rather than the issue thread. The recent user comments are merely status pings and do not require separate action on the issue.
- **Next action:** Work on and drive the linked PR #2034 rather than this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, a repository I am not responsible for. I was only mentioned as an informational CC over two years ago by bkonyi regarding HTTP profiling considerations. There is no action requested of me, and the issue is being handled by the DevTools team.
- **Next action:** None; this is an informational CC in a repository I do not maintain.

### 28. dart-lang/http#1837 → predicted 32, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old feature request marked 'contributions-welcome' and 'P3'. I explicitly stated that the team would not be taking this on and left it open for community contributions. With no activity since my response 12 months ago, there is nothing for me to do.
- **Next action:** Wait for community contributions or further interest.

### 29. dart-lang/http#2033 → predicted 33, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this pull request two days ago. There has been no subsequent activity or new commits since my approval. It is ready for the author to merge.
- **Next action:** Waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is labeled 'package:http2' under dart-lang/http, which I have explicitly noted I am not responsible for. Additionally, I am not assigned or mentioned, and there is no direct request for my attention.
- **Next action:** None; this issue is outside my stated scope and requires no action from me.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in `dart-lang/tools`, which is not a repository I am responsible for. While opened by a collaborator (kevmoo), I am only included via a team review request (`dart-ecosystem-team`), and a specific reviewer (`davidmorgan`) was directly requested. Per the guidelines, team review requests in repos I don't own when a specific individual reviewer is named should be scored near 0.
- **Next action:** Wait for requested reviewer davidmorgan to review this PR.

### 32. dart-lang/http#2026 → predicted 34, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR touches the http2 package under dart-lang/http, which is explicitly outside my stated scope ('not responsible for http2'). Furthermore, the author specifically requested a review from mosuem, so there is nothing for me to do.
- **Next action:** Waiting for mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 30, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in `dart-lang/native`, a repository I do not own or maintain. The issue is assigned to and actively discussed by `liamappelbe` and `mraleph`, with no pending questions or action items directed to me. Furthermore, there has been no activity on this thread for over a month.
- **Next action:** None; waiting on liamappelbe and VM/native team to decide on the architecture.

### 34. dart-lang/http#1972 → predicted 31, priority 0.05
- **Ground truth:** 
- **Model:** I recently commented asking clarifying questions and marked the issue with 'needs-info'. Additionally, there is an open PR (#1974) addressing this issue, so any further action will happen there once details are resolved. Until the reporter provides the requested information, there is nothing for me to do.
- **Next action:** Waiting for reporter response to clarifying questions.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** I gave this item a thumbs-down on 2026-10-05, and there has been no new activity on this issue since then. Furthermore, an open PR (#2002) is addressing the feature, so any review work belongs on the PR rather than this issue. Per the guidelines, items with no significant activity after a thumbs-down score 0.0.
- **Next action:** None; an open PR covers this issue and nothing has happened since my thumbs-down.

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I gave this item a thumbs-down on 2026-08-01, but filiph commented recently (24 days ago) offering a local reproduction on macOS arm64. Because I am assigned to this P2 issue in the SDK, this new diagnostic offer reactivates my responsibility to investigate or coordinate next steps.
- **Next action:** Follow up with filiph regarding local reproduction steps or unassign myself.
