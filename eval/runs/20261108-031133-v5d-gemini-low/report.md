# Gitilizer eval: v5d-gemini-low

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5d.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031133

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.740 ± 0.018 |
| spearman | 0.901 ± 0.012 |
| pairwise_acc | 0.870 ± 0.009 |
| ndcg | 0.988 ± 0.001 |
| ndcg@5 | 0.967 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.426 ± 0.279 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.839 ± 0.025 | 0.985 ± 0.001 | 1.000 ± 0.000 | 1.083 ± 0.191 |
| B | 20 | 0.684 ± 0.028 | 0.984 ± 0.002 | 0.600 ± 0.000 | 2.367 ± 0.351 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 6.0 (6) | +5.0 | 0.55 | 3/3 | dart-lang/sdk#48056 | A | Review whether Dart's Android SecurityContext handles certificate revocations/blocklists or reassign the issue to the VM team. |
| 2 | 1.0 (1) | -1.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment regarding handling of CHANGELOG.md during generate/clean. |
| 3 | 2.0 (2) | -1.0 | 0.76 | 3/3 | googleapis/google-cloud-dart#376 | A | Review this PR from collaborator sigurdm for Pub/Sub client attribution and pre-release polish. |
| 4 | 3.0 (3) | -1.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR on google_cloud_rpc error handling. |
| 5 | 4.0 (4) | -1.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's proposed enum representation design. |
| 6 | 7.0 (7) | +1.0 | 0.55 | 3/3 | dart-lang/http#2027 | B | Decide on next steps or implement the proposed `Client.close` design changes. |
| 7 | 5.0 (5) | -2.0 | 0.60 | 3/3 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook feature in cupertino_http. |
| 8 | 9.3 (9–10) | +1.3 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo or decide whether to prioritize implementing streaming error handling and non-SSE parsing. |
| 9 | 11.0 (11) | +2.0 | 0.50 | 3/3 | dart-lang/sdk#59846 | B | Investigate and fix the header validation bug in dart:io or reassign/unassign if not working on it. |
| 10 | 12.7 (12–13) | +2.7 | 0.39 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions. |
| 11 | 13.7 (13–14) | +2.7 | 0.36 | 3/3 | dart-lang/sdk#31275 | A | Investigate taking over the abandoned CL for the dart:io HttpClient unhandled exception bug. |
| 12 | 17.7 (17–18) | +5.7 | 0.23 | 0/3 | dart-lang/native#3752 | B | Follow progress on PR #3763 which covers this issue. |
| 13 | 9.7 (9–10) | -3.3 | 0.53 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide on the automation approach or update the package pubspecs manually. |
| 14 | 15.7 (14–18) | +1.7 | 0.23 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL revision update PR if other team members don't pick it up. |
| 15 | 15.3 (15–16) | +0.3 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review open PR #382 which addresses this issue. |
| 16 | 20.7 (20–21) | +4.7 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review the pull request. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.55 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions changes in ServiceClient or draft the PR. |
| 18 | 26.7 (25–29) | +8.7 | 0.05 | 0/3 | dart-lang/http#2031 | A | Wait for upstream stacked PR #2014 to be reviewed and merged first, and note http2 is outside scope. |
| 19 | 19.7 (19–20) | +0.7 | 0.20 | 3/3 | googleapis/google-cloud-dart#345 | A | Resume work on this draft PR to finish it or close it. |
| 20 | 18.3 (17–19) | -1.7 | 0.20 | 0/3 | dart-lang/core#1007 | B | Wait for author to sign the Google CLA. |
| 21 | 28.7 (27–32) | +7.7 | 0.05 | 0/3 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn's review comments. |
| 22 | 22.7 (22–23) | +0.7 | 0.10 | 0/3 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 21.7 (21–22) | -1.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the pull request. |
| 24 | 15.7 (12–23) | -8.3 | 0.32 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to confirm if he reviewed the full PR or wait for natebosch's review |
| 25 | 24.0 (24) | -1.0 | 0.08 | 0/3 | dart-lang/http#579 | B | None; this PR is deferred to a future major breaking release cycle. |
| 26 | 16.3 (16–17) | -9.7 ⚠️ | 0.25 | 0/3 | dart-lang/http#1932 | B | Track progress on PR #2034 which provides the fix for this issue. |
| 27 | 32.3 (29–34) | +5.3 | 0.03 | 0/3 | flutter/devtools#8223 | B | None; this is an issue in flutter/devtools where I was only CC'd over two years ago. |
| 28 | 28.0 (28) | +0.0 | 0.05 | 0/3 | dart-lang/http#1837 | A | None; waiting for community contribution. |
| 29 | 33.0 (31–35) | +4.0 | 0.03 | 0/3 | dart-lang/http#2033 | A | Wait for mosuem to merge the approved pull request. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | None; this issue falls under package:http2 which is outside my scope of responsibility. |
| 31 | 26.3 (25–29) | -4.7 | 0.05 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the PR. |
| 32 | 33.7 (32–35) | +1.7 | 0.02 | 0/3 | dart-lang/http#2026 | A | Wait for @mosuem to review this http2 pull request. |
| 33 | 31.3 (30–33) | -1.7 | 0.04 | 0/3 | dart-lang/native#3653 | A | None; liamappelbe is assigned and discussing potential next steps with mraleph. |
| 34 | 31.3 (30–33) | -2.7 | 0.04 | 0/3 | dart-lang/http#1972 | B | Wait for reporter response to clarifying questions. |
| 35 | 26.3 (26–27) | -8.7 | 0.05 | 0/3 | dart-lang/http#1841 | B | Review open PR #2002 addressing this issue instead. |
| 36 | 32.3 (30–35) | -3.7 | 0.03 | 0/3 | dart-lang/sdk#38148 | B | None; ignore due to thumbs-down with no direct mention or security concern. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 3/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/http#1841** (truth #35) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **googleapis/google-cloud-dart#373** (truth #24) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **googleapis/google-cloud-dart#373** (truth #24) in 2/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/tools#2715** (truth #31) in 2/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **googleapis/google-cloud-dart#373** (truth #24) in 2/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1932** (truth #26) in 1/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/native#3653** (truth #33) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 6, priority 0.55
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an issue assigned to me in dart-lang/sdk regarding Android SecurityContext certificate handling. A security concern about compromised intermediate CA keys was raised 3 days ago, though another issue (dart-lang/sdk#64644) was already handled by mraleph to distrust those keys. As an assigned issue on an area I worked on that needs triage or resolution/unassignment, it falls in the 0.50–0.65 range.
- **Next action:** Review whether Dart's Android SecurityContext handles certificate revocations/blocklists or reassign the issue to the VM team.

### 2. googleapis/librarian#7808 → predicted 1, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my open PR addressing an issue in googleapis/google-cloud-dart. Close collaborator kevmoo left substantive review feedback 21 hours ago with a direct question on how to handle CHANGELOG preservation, which is currently blocking progress on the PR.
- **Next action:** Reply to kevmoo's review comment regarding handling of CHANGELOG.md during generate/clean.

### 3. googleapis/google-cloud-dart#376 → predicted 2, priority 0.77
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart (a repository I am responsible for) authored by a close collaborator (sigurdm). It has been open for 5 days without a human review, making me the default reviewer.
- **Next action:** Review this PR from collaborator sigurdm for Pub/Sub client attribution and pre-release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in a repository I am responsible for (googleapis/google-cloud-dart). As the maintainer and default reviewer, reviewing incoming PRs falls in the 0.65-0.8 range. It was opened 3 days ago by an external contributor and fixes a bug with REST error retry logic.
- **Next action:** Review this PR on google_cloud_rpc error handling.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** A contributor is working on this issue in my repository (google-cloud-dart) and has posted a concrete design sketch following my earlier suggestion. They are waiting on my feedback before implementing the breaking API change and code generator updates.
- **Next action:** Reply to Yusufihsangorgel's proposed enum representation design.

### 6. dart-lang/http#2027 → predicted 7, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is an issue I filed 9 days ago in my repository (dart-lang/http) regarding planned architecture/API work for Client.close semantics. It falls in the 0.5–0.65 range ('issues I filed in the last two weeks in areas I work in, even with no replies'). Since it is fresh and represents active thinking for my upcoming roadmap, it scores around 0.55.
- **Next action:** Decide on next steps or implement the proposed `Client.close` design changes.

### 7. dart-lang/http#1981 → predicted 5, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned this issue to yourself and explicitly stated just 5 hours ago that you started working on it. This represents active planned work on a repository you maintain. It falls directly in the 0.5–0.65 range for items you have taken on to implement.
- **Next action:** Work on implementing the server trust evaluation hook feature in cupertino_http.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an open issue in a repository I maintain, filed by my close collaborator kevmoo. kevmoo answered my question 17 days ago noting that while it isn't urgent, it represents a known functional gap in streaming request error handling. As a collaborator's issue in my repo without an immediate blocker or PR, it falls into my planned work range.
- **Next action:** Reply to kevmoo or decide whether to prioritize implementing streaming error handling and non-SSE parsing.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is an issue assigned to me in dart-lang/sdk (library-io), which falls into the 0.5–0.65 range ('issues assigned to me that I should fix or unassign'). However, it has been inactive for nearly 22 months with no recent updates or mentions, placing it at the very bottom of that range.
- **Next action:** Investigate and fix the header validation bug in dart:io or reassign/unassign if not working on it.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked collaborator kevmoo a direct question 16 days ago about API surface tradeoffs and whether convenience extensions might be preferable to switching formats. The ball is in his court to respond, so there is no immediate action for me right now.
- **Next action:** Wait for kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.36
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an important bug in `dart:io` causing uncaught crash exceptions, and collaborator kevmoo explicitly CC'd me asking for it to be picked up. However, it is in `dart-lang/sdk` (not my primary repository), there is an existing abandoned CL rather than active blocking work, and the last mention was well over two years ago with no recent updates. Per the guidelines, old important issues where I was explicitly CC'd fall into the 0.35–0.50 range, towards the bottom due to age.
- **Next action:** Investigate taking over the abandoned CL for the dart:io HttpClient unhandled exception bug.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** You authored and are assigned to this issue filed 6 days ago, but you have already opened PR #3763 to address it. Issues with an open PR covering them belong in the 0.15–0.35 range (scored 0.2–0.3 below the PR itself). No direct action is needed on this issue issue tracker item.
- **Next action:** Follow progress on PR #3763 which covers this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.52
- **Ground truth:** 
- **Model:** This is an issue filed by close collaborator sigurdm in googleapis/google-cloud-dart detailing required pubspec bumps. My last comment 17 days ago noted that I am considering the broader fix (e.g. librarian automation), leaving the next decision on me as part of planned work in my repository.
- **Next action:** Decide on the automation approach or update the package pubspecs manually.

### 14. dart-lang/tools#2719 → predicted 14, priority 0.25
- **Ground truth:** 
- **Model:** This is a team review request to `dart-ecosystem-team` in `dart-lang/tools`, a repository I do not directly own or maintain. It is not specifically assigned to me and was generated by a bot. Team review requests in repos I am not responsible for fall into the 0.15–0.35 range.
- **Next action:** Review the automated BoringSSL revision update PR if other team members don't pick it up.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in googleapis/google-cloud-dart has an active open PR (#382) covering the fix. Per the scoring guidelines, issues with an open PR should be ranked 0.2–0.3 below the PR (placing it in the 0.15–0.35 range). Attention should be directed to reviewing PR #382 instead of this issue.
- **Next action:** Review open PR #382 which addresses this issue.

### 16. dart-lang/http#2034 → predicted 20, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own pull request created 2 days ago in dart-lang/http. I requested a review from goderbauer and there has been no feedback yet. It falls into the 0.05-0.15 range for PRs waiting on a reviewer requested within the last week.
- **Next action:** Wait for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in my repository (googleapis/google-cloud-dart) filed by a close collaborator (kevmoo). I scoped down the issue 10 days ago and assigned it to myself, making it planned work on my plate. Since no one is blocked awaiting an immediate answer today, it sits squarely in the 0.5–0.65 planned work range.
- **Next action:** Implement the RetryRunner and RequestOptions changes in ServiceClient or draft the PR.

### 18. dart-lang/http#2031 → predicted 29, priority 0.04
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This is a release prep PR for http2, which is explicitly noted as outside my stated scope ('not responsible for http2'). Additionally, it is stacked on open PR #2014 which is still unreviewed. Consequently, there is no action for me here.
- **Next action:** Wait for upstream stacked PR #2014 to be reviewed and merged first, and note http2 is outside scope.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR that has been idle for 45 days. The scale puts 'my drafts to finish or abandon' in the 0.15–0.35 range. Because it is stale and in a dirty/conflict state with only bot comments, it sits at the lower end of that range.
- **Next action:** Resume work on this draft PR to finish it or close it.

### 20. dart-lang/core#1007 → predicted 17, priority 0.20
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a PR to dart-lang/core requested via the dart-ecosystem-team rather than addressed to me directly, in a repo outside my primary responsibilities. Furthermore, the PR is currently blocked because the author has not signed the Google CLA. Therefore, there is no immediate action for me today.
- **Next action:** Wait for author to sign the Google CLA.

### 21. dart-lang/tools#2544 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This is a PR in dart-lang/tools where review was requested from the broad team dart-ecosystem-team, but another reviewer (lrhn) has already taken up active review and left extensive comments. The author jonasfj has not yet addressed the outstanding feedback from two months ago, so no action is required from me.
- **Next action:** Wait for jonasfj to address lrhn's review comments.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on unreviewed draft PR #2563, and it is in dart-lang/tools where review is requested only via the broad team dart-ecosystem-team. Per the scoring guidelines, PRs stacked on unreviewed PRs or team review requests outside primary repos score low (0.05-0.15).
- **Next action:** Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 21, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** I opened this pull request 2 days ago and requested a review from liamappelbe. It is currently waiting on the reviewer and has been open for less than a week, so there is no action for me right now (falls into the 0.05-0.15 scale range). Both related issues are tracked by this pending PR as well.
- **Next action:** Wait for liamappelbe to review the pull request.

### 24. googleapis/google-cloud-dart#373 → predicted 23, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in googleapis/google-cloud-dart. I asked sigurdm 4 days ago whether his approval covered the non-PubSub parts to spare natebosch the review, and I am currently waiting on a response. Since it has been waiting on reviewer feedback for under a week and the next action belongs to them, it ranks in the 0.05-0.15 range.
- **Next action:** Wait for sigurdm to confirm if he reviewed the full PR or wait for natebosch's review

### 25. dart-lang/http#579 → predicted 24, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This pull request introduces breaking API changes and is explicitly labeled 'next-breaking-release'. I previously reviewed the situation and stated that landing this must be coordinated with a semver-major release for which bandwidth is currently lacking. Per the guidelines, items blocked by a label/plan like 'next-breaking-release' fall into the 0.05–0.15 priority tier with no immediate action required.
- **Next action:** None; this PR is deferred to a future major breaking release cycle.

### 26. dart-lang/http#1932 → predicted 16, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by an open PR (#2034) authored by me 2 days ago. Per the guidelines, issues with an active PR covering them are scored in the 0.15-0.35 range (roughly 0.2-0.3 below the PR itself), even if users have recently asked for status updates.
- **Next action:** Track progress on PR #2034 which provides the fix for this issue.

### 27. flutter/devtools#8223 → predicted 34, priority 0.02
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, which is not one of my owned repositories. I was mentioned purely as an informational CC over two years ago by bkonyi regarding potential HTTP profiling implications. There is no direct question or action item for me.
- **Next action:** None; this is an issue in flutter/devtools where I was only CC'd over two years ago.

### 28. dart-lang/http#1837 → predicted 28, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded a year ago clarifying that the team will not build this and marked it as a community contribution. It is labeled P3 and contributions-welcome with no subsequent activity. There is nothing further for you to do.
- **Next action:** None; waiting for community contribution.

### 29. dart-lang/http#2033 → predicted 33, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this pull request two days ago. There have been no new commits or comments since my approval, so there is nothing for me to do. It falls into the 0.0–0.05 range for approved PRs with nothing since.
- **Next action:** Wait for mosuem to merge the approved pull request.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is explicitly labeled 'package:http2', which my profile notes I am not responsible for. Additionally, I am not assigned, mentioned, or involved in any way, and the issue has been inactive for months.
- **Next action:** None; this issue falls under package:http2 which is outside my scope of responsibility.

### 31. dart-lang/tools#2715 → predicted 25, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not one of my core maintained repositories. Although my team was requested, an individual reviewer (davidmorgan) was specifically requested as well. Following the scale for team review requests where another person is named, this requires no action from me.
- **Next action:** Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This pull request is in package:http2, which is explicitly outside my stated scope ('not responsible for http2'). Additionally, the author specifically directed the review request to @mosuem, so there is nothing for me to do.
- **Next action:** Wait for @mosuem to review this http2 pull request.

### 33. dart-lang/native#3653 → predicted 30, priority 0.04
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, outside my primary maintained repositories, and is assigned to and handled by liamappelbe. The latest discussion is between mraleph and liamappelbe with nothing directed at me or requiring my action.
- **Next action:** None; liamappelbe is assigned and discussing potential next steps with mraleph.

### 34. dart-lang/http#1972 → predicted 31, priority 0.04
- **Ground truth:** 
- **Model:** You asked clarifying questions and added the 'needs-info' label 8 days ago, with no response from the reporter yet. Furthermore, there is an open PR (#1974) covering this issue. Per the guidelines, 'needs-info' issues with no reply from the reporter fall in the 0.0–0.05 range.
- **Next action:** Wait for reporter response to clarifying questions.

### 35. dart-lang/http#1841 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** This issue is covered by an open pull request (PR #2002) submitted by agam1092005. Furthermore, I placed a thumbs-down on this item on 2026-10-05 with no new activity directed at me since, and the issue carries the 'next-breaking-release' label. Any required review or attention should take place on PR #2002 instead of here.
- **Next action:** Review open PR #2002 addressing this issue instead.

### 36. dart-lang/sdk#38148 → predicted 35, priority 0.02
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You marked this issue with a thumbs-down on 2026-08-01. While filiph commented recently offering reproduction help, you were not @-mentioned and this is in dart-lang/sdk rather than one of your primary repositories. Under the thumbs-down rule with nothing specifically directed at you since, this rates at the bottom of the scale.
- **Next action:** None; ignore due to thumbs-down with no direct mention or security concern.
