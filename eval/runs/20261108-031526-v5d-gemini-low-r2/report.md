# Gitilizer eval: v5d-gemini-low-r2

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5d.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031526

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.733 ± 0.006 |
| spearman | 0.900 ± 0.000 |
| pairwise_acc | 0.867 ± 0.003 |
| ndcg | 0.988 ± 0.001 |
| ndcg@5 | 0.967 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.500 ± 0.056 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.833 ± 0.000 | 0.985 ± 0.000 | 1.000 ± 0.000 | 1.125 ± 0.000 |
| B | 20 | 0.667 ± 0.032 | 0.983 ± 0.001 | 0.600 ± 0.000 | 2.467 ± 0.058 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 6.0 (6) | +5.0 | 0.55 | 3/3 | dart-lang/sdk#48056 | A | Review the security concern raised regarding intermediate CA revocation on Android and determine if a follow-up SDK fix or reply is needed, or unassign. |
| 2 | 1.0 (1) | -1.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG preservation during generate and adjust the implementation if needed. |
| 3 | 2.0 (2) | -1.0 | 0.76 | 3/3 | googleapis/google-cloud-dart#376 | A | Review Sigurd's PR adding client attribution headers and pre-release polish to Pub/Sub. |
| 4 | 3.7 (3–4) | -0.3 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR on google_cloud_rpc error code mapping. |
| 5 | 3.3 (3–4) | -1.7 | 0.72 | 3/3 | googleapis/google-cloud-dart#252 | B | Review and reply to Yusufihsangorgel's proposed API design sketch for ProtoEnum. |
| 6 | 7.0 (7) | +1.0 | 0.55 | 3/3 | dart-lang/http#2027 | B | Decide on the API design for Client.close and draft a proposal or PR for discussion. |
| 7 | 5.0 (5) | -2.0 | 0.58 | 3/3 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in cupertino_http. |
| 8 | 9.3 (9–10) | +1.3 | 0.53 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo regarding non-SSE streaming handling or implement the error frame fix in google_cloud_rpc. |
| 9 | 11.0 (11) | +2.0 | 0.50 | 3/3 | dart-lang/sdk#59846 | B | Investigate and fix the header name character validation in dart:io, or unassign myself. |
| 10 | 12.3 (12–13) | +2.3 | 0.40 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to respond to my question about Discovery versus convenience extensions. |
| 11 | 13.3 (13–14) | +2.3 | 0.35 | 0/3 | dart-lang/sdk#31275 | A | Wait for an active assignee or revisit when prioritizing dart:io HttpClient fixes. |
| 12 | 17.0 (16–18) | +5.0 | 0.23 | 0/3 | dart-lang/native#3752 | B | Wait for progress on PR #3763 which addresses this issue. |
| 13 | 9.7 (9–10) | -3.3 | 0.53 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide on the automation approach or update the dependency constraints in pubspec.yaml manually. |
| 14 | 17.0 (16–18) | +3.0 | 0.20 | 0/3 | dart-lang/tools#2719 | B | Wait for a primary maintainer of dart-lang/tools to review this automated PR. |
| 15 | 14.3 (14–15) | -0.7 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review the linked PR #382 instead of this issue. |
| 16 | 21.0 (21) | +5.0 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review the pull request. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.55 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient or draft the PR. |
| 18 | 25.3 (24–26) | +7.3 | 0.06 | 0/3 | dart-lang/http#2031 | A | Wait for upstream stacked PR #2014 to be reviewed and merged first. |
| 19 | 19.3 (19–20) | +0.3 | 0.20 | 3/3 | googleapis/google-cloud-dart#345 | A | Resume work to finish or abandon this draft PR. |
| 20 | 18.0 (17–19) | -2.0 | 0.20 | 0/3 | dart-lang/core#1007 | B | Wait for author to sign the CLA, or for another dart-ecosystem-team member to pick up the review. |
| 21 | 31.3 (28–33) | +10.3 ⚠️ | 0.04 | 0/3 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn's review feedback. |
| 22 | 23.0 (23) | +1.0 | 0.10 | 0/3 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and landed before reviewing this stacked PR. |
| 23 | 22.0 (22) | -1.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 17.3 (12–20) | -6.7 | 0.21 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for @sigurdm to reply regarding whether the PR is ready to merge or if @natebosch must review. |
| 25 | 24.3 (24–25) | -0.7 | 0.08 | 0/3 | dart-lang/http#579 | B | None; this PR is blocked on a next breaking major release which is not currently planned. |
| 26 | 15.3 (15–16) | -10.7 ⚠️ | 0.25 | 0/3 | dart-lang/http#1932 | B | Track progress on PR #2034, which addresses this issue. |
| 27 | 29.7 (29–30) | +2.7 | 0.04 | 0/3 | flutter/devtools#8223 | B | None; flutter/devtools team or bkonyi to respond to community inquiries. |
| 28 | 28.3 (28–29) | +0.3 | 0.05 | 0/3 | dart-lang/http#1837 | A | None; waiting for community contribution if someone decides to build it. |
| 29 | 35.0 (35) | +6.0 | 0.00 | 0/3 | dart-lang/http#2033 | A | Wait for mosuem to merge the pull request. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | None; this issue falls outside my scope of responsibility. |
| 31 | 26.3 (25–29) | -4.7 | 0.05 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the PR. |
| 32 | 34.0 (34) | +2.0 | 0.01 | 0/3 | dart-lang/http#2026 | A | Wait for @mosuem to review this http2 PR. |
| 33 | 31.7 (31–32) | -1.3 | 0.04 | 0/3 | dart-lang/native#3653 | A | None; issue is owned and being investigated by liamappelbe and mraleph. |
| 34 | 30.0 (27–32) | -4.0 | 0.04 | 0/3 | dart-lang/http#1972 | B | Wait for reporter to provide reproduction details or clarify their scenario. |
| 35 | 26.7 (26–27) | -8.3 | 0.05 | 0/3 | dart-lang/http#1841 | B | Track or review PR #2002 which implements this issue. |
| 36 | 31.3 (30–33) | -4.7 | 0.04 | 0/3 | dart-lang/sdk#38148 | B | Unassign myself or investigate filiph's reproduction when working on sdk backlog |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 3/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/http#1841** (truth #35) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **googleapis/google-cloud-dart#373** (truth #24) in 1/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/tools#2715** (truth #31) in 2/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/http#1972** (truth #34) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **googleapis/google-cloud-dart#373** (truth #24) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1932** (truth #26) in 3/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/native#3653** (truth #33) in 2/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **googleapis/google-cloud-dart#373** (truth #24) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 6, priority 0.55
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an issue assigned to me in the Dart SDK concerning TLS certificate handling. A commenter recently raised a security question regarding compromised intermediate CAs, though another contributor pointed to issue #64644 which already addressed the specific distrust list. As the assignee, I should review whether any further action or clarification is needed on this issue or if I should unassign/update it.
- **Next action:** Review the security concern raised regarding intermediate CA revocation on Android and determine if a follow-up SDK fix or reply is needed, or unassign.

### 2. googleapis/librarian#7808 → predicted 1, priority 0.86
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my PR, and collaborator kevmoo left substantive review feedback 21 hours ago pointing out an issue where generated files are cleaned. Since I have unanswered review feedback on my own PR, I am blocking progress (0.8–0.9 range).
- **Next action:** Reply to kevmoo's review comment on CHANGELOG preservation during generate and adjust the implementation if needed.

### 3. googleapis/google-cloud-dart#376 → predicted 2, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from a close collaborator (sigurdm) in my repository (googleapis/google-cloud-dart). As the default reviewer on this repo, review is required to get pubsub 0.1.0 pre-release ready. It sits solidly in the 0.65-0.8 collaborator unreviewed PR range.
- **Next action:** Review Sigurd's PR adding client attribution headers and pre-release polish to Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for. Since I am the default maintainer/reviewer for this repository and no human has reviewed it yet, it falls into the 0.65–0.8 range. It was opened 3 days ago by an external contributor, placing it comfortably around 0.70.
- **Next action:** Review this PR on google_cloud_rpc error code mapping.

### 5. googleapis/google-cloud-dart#252 → predicted 3, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue in my repository where an external contributor followed my request to provide a preliminary design before writing code. They shared an API sketch 4 days ago and are waiting on my feedback to proceed with implementation. This falls in the 0.65-0.8 range for active discussions where someone is waiting on my reply to move forward.
- **Next action:** Review and reply to Yusufihsangorgel's proposed API design sketch for ProtoEnum.

### 6. dart-lang/http#2027 → predicted 7, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is an issue I filed 9 days ago (within the last two weeks) in a primary repository I am responsible for (dart-lang/http). It outlines architectural work and design decisions regarding Client.close semantics. As my own recently planned work with no outside replies yet, it falls squarely into the 0.5-0.65 range.
- **Next action:** Decide on the API design for Client.close and draft a proposal or PR for discussion.

### 7. dart-lang/http#1981 → predicted 5, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned this issue to yourself and explicitly stated 5 hours ago that you started working on it. This represents active planned work in your repository (dart-lang/http), falling squarely in the 0.5–0.65 range. Because this is fresh, actively chosen work on your plate, it sits comfortably near the top of that tier.
- **Next action:** Work on implementing the server trust evaluation hook in cupertino_http.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an open issue filed by a close collaborator (kevmoo) in a repository I maintain (google-cloud-dart). Kevmoo answered my question 17 days ago noting it's not urgent, but it represents clear work/holes in streaming RPC handling. Because the ball is back in my court on my repository without urgency, it falls in the 0.50–0.65 planned work range.
- **Next action:** Reply to kevmoo regarding non-SSE streaming handling or implement the error frame fix in google_cloud_rpc.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned to me in the SDK (specifically library-io HTTP parsing) and needs to be addressed or unassigned. However, it has been inactive for nearly two years without urgent escalation or recent activity. As planned work / assigned backlog, it sits at the lower end of the assigned issues band (0.50).
- **Next action:** Investigate and fix the header name character validation in dart:io, or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked kevmoo a question 16 days ago weighing Discovery against convenience extensions, and the conversation is waiting on his input. Since this is in my repository with a close collaborator but the ball is in his court, it falls into the 0.35-0.5 range for unanswered questions.
- **Next action:** Wait for kevmoo to respond to my question about Discovery versus convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old but important crashing bug in `dart:io` where I was explicitly CC'd by collaborator kevmoo and parlough. However, it is in `dart-lang/sdk` rather than my primary repositories, has had no new discussion in over two years, and there is no immediate action blocking anyone on me today. As an old important issue with an explicit CC, it sits at the bottom of the 0.35–0.50 range.
- **Next action:** Wait for an active assignee or revisit when prioritizing dart:io HttpClient fixes.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** I filed this issue and assigned myself, but there is already an open PR (PR #3763) authored by me that covers it. Under the guidelines, issues with an open PR that covers them score 0.15–0.35 (specifically 0.2–0.3 below the PR). There is no separate action required on this issue itself right now.
- **Next action:** Wait for progress on PR #3763 which addresses this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.52
- **Ground truth:** 
- **Model:** This is an open tracking issue filed by collaborator sigurdm in a repository I maintain (googleapis/google-cloud-dart). I last commented over two weeks ago noting I was considering how to address this via tooling/automation, making it part of my planned work backlog without immediate blocking pressure.
- **Next action:** Decide on the automation approach or update the dependency constraints in pubspec.yaml manually.

### 14. dart-lang/tools#2719 → predicted 16, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated bot PR in dart-lang/tools, which is not one of my primary repositories. The review request is to the broad dart-ecosystem-team rather than to me individually. Team review requests in repositories I do not directly maintain fall in the 0.15-0.35 range.
- **Next action:** Wait for a primary maintainer of dart-lang/tools to review this automated PR.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in a repository I maintain has an open linked PR (#382) submitted at the same time to resolve it. Per the scoring guidelines, issues with an open PR covering them should be ranked 0.2-0.3 below the PR (placing it in the 0.15-0.35 range). Attention should be directed to reviewing PR #382 directly.
- **Next action:** Review the linked PR #382 instead of this issue.

### 16. dart-lang/http#2034 → predicted 21, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my PR in dart-lang/http, created 2 days ago, which is currently waiting on requested reviewer goderbauer. Because the review request was sent within the last week, no action is needed from me right now. It falls into the 0.05-0.15 range for PRs waiting on a reviewer requested recently.
- **Next action:** Wait for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in my repository (google-cloud-dart) filed by collaborator kevmoo. I investigated and narrowed the scope 10 days ago, making it part of my planned work backlog (0.50–0.65 range).
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient or draft the PR.

### 18. dart-lang/http#2031 → predicted 24, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release PR is stacked on top of unmerged PRs (including #2014 which still needs review). In addition, I have explicitly noted that I am not responsible for package:http2 in dart-lang/http, lowering its relevance even further.
- **Next action:** Wait for upstream stacked PR #2014 to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding DNS support in googleapis/google-cloud-dart, which has been idle for 45 days. Per the scale guidelines, draft PRs of mine to finish or abandon fall in the 0.15–0.35 range. Given the lack of recent urgency and the dirty mergeable state, it sits at a low priority within that bracket.
- **Next action:** Resume work to finish or abandon this draft PR.

### 20. dart-lang/core#1007 → predicted 17, priority 0.20
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a PR in dart-lang/core requested via the dart-ecosystem-team rather than to me directly, in a repo I am not primarily responsible for. Furthermore, the PR is currently blocked on the author signing the Google CLA. Under the scale for team review requests in other repos, this scores low (0.15-0.35).
- **Next action:** Wait for author to sign the CLA, or for another dart-ecosystem-team member to pick up the review.

### 21. dart-lang/tools#2544 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools (not one of my repositories) and I was only notified via a team review request to dart-ecosystem-team. Furthermore, lrhn is already actively reviewing it, and the ball is currently in the author's court to respond to lrhn's detailed review comments from two months ago. There is no action required from me.
- **Next action:** Wait for jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still an unreviewed draft PR. Furthermore, the repository is dart-lang/tools (not one of your primary repositories) and the review request is to the team dart-ecosystem-team rather than you individually. As per guidelines, PRs stacked on unreviewed PRs fall into the 0.05-0.15 priority range.
- **Next action:** Wait for base PR #2563 to be reviewed and landed before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 22, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my open PR in dart-lang/native, which I submitted and requested review from liamappelbe only 2 days ago. Under the scoring criteria, my PRs waiting on a reviewer requested within the last week fall into the 0.05-0.15 range. There is nothing for me to do right now.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 20, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my open PR in googleapis/google-cloud-dart. Sigurdm already approved the Pub/Sub portion, and 4 days ago I asked him if the entire PR is good to merge without waiting for natebosch. The ball is in Sigurdm's (or Nate's) court, falling into the 0.05-0.15 range for PRs waiting on reviewers within the past week.
- **Next action:** Wait for @sigurdm to reply regarding whether the PR is ready to merge or if @natebosch must review.

### 25. dart-lang/http#579 → predicted 25, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces a breaking API change and has the 'next-breaking-release' label. I explicitly stated that landing this must be coordinated with a major release and that I don't have the bandwidth for it. Per the rubric, items blocked by a label/plan like 'next-breaking-release' fall into the 0.05-0.15 range.
- **Next action:** None; this PR is blocked on a next breaking major release which is not currently planned.

### 26. dart-lang/http#1932 → predicted 15, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by open PR #2034 created by me to fix the cronet namespace collision. Per the scoring guidelines, issues with an open PR covering them are ranked 0.2–0.3 below the PR itself (in the 0.15–0.35 range), even if community members are asking for status updates.
- **Next action:** Track progress on PR #2034, which addresses this issue.

### 27. flutter/devtools#8223 → predicted 30, priority 0.04
- **Ground truth:** 
- **Model:** This is an issue in flutter/devtools, which is outside my direct repositories and scope. I was only mentioned as an informational CC over two years ago by bkonyi regarding potential HTTP profiling implications. There is nothing requested of me, so no action is needed.
- **Next action:** None; flutter/devtools team or bkonyi to respond to community inquiries.

### 28. dart-lang/http#1837 → predicted 28, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded a year ago clarifying that the Dart team won't take this on, marked it P3, and it is tagged contributions-welcome. There has been no subsequent activity or response. Nothing is required from you.
- **Next action:** None; waiting for community contribution if someone decides to build it.

### 29. dart-lang/http#2033 → predicted 35, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this PR 2 days ago, and there has been no new activity since. The next step is on the author (mosuem) to land it. According to the scale, PRs I approved with nothing since score 0.0-0.05.
- **Next action:** Wait for mosuem to merge the pull request.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is labeled 'package:http2' and concerns `http2`, which is explicitly outside my stated scope ('not responsible for http2'). Additionally, there has been no direct request or mention of me, and the issue is an old general discussion. It falls under the 0.0–0.05 range for areas outside my stated scope.
- **Next action:** None; this issue falls outside my scope of responsibility.

### 31. dart-lang/tools#2715 → predicted 29, priority 0.04
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not one of my primary repositories. While author kevmoo is a collaborator, he specifically requested a review from davidmorgan alongside the general dart-ecosystem-team request. Per the guidelines, team review requests where another specific person is named or reviewing score 0.0-0.05.
- **Next action:** Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 34, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I explicitly note that I am not responsible for http2 in dart-lang/http. Additionally, the author has directly requested a review from @mosuem, who recently worked in this exact area of the code. There is nothing for me to do here.
- **Next action:** Wait for @mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 32, priority 0.04
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, outside my primary repositories, and is assigned to and actively discussed by liamappelbe and mraleph. My previous comment shared experimental findings over a month ago, and no action or response is required from me.
- **Next action:** None; issue is owned and being investigated by liamappelbe and mraleph.

### 34. dart-lang/http#1972 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** I asked questions to clarify the issue and labeled it 'needs-info' 8 days ago, and the reporter has not replied. According to the scoring guidelines, an issue in 'needs-info' status with no reply from the reporter requires nothing from me and falls into the 0.0-0.05 range.
- **Next action:** Wait for reporter to provide reproduction details or clarify their scenario.

### 35. dart-lang/http#1841 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** This issue is covered by an open pull request (PR #2002) and is also marked with 'next-breaking-release'. Furthermore, there has been a thumbs down applied on 2026-10-05 with no subsequent activity directed at me. Any active review work should take place directly on PR #2002.
- **Next action:** Track or review PR #2002 which implements this issue.

### 36. dart-lang/sdk#38148 → predicted 31, priority 0.04
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I gave this item a thumbs down on 2026-08-01. While filiph commented 24 days ago offering reproduction help, the comment was general and not directed at me specifically. Under the rules, thumbs-down items without significant activity directed at me score 0.0–0.05.
- **Next action:** Unassign myself or investigate filiph's reproduction when working on sdk backlog
