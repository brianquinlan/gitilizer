# Gitilizer eval: v5c-gemini-low

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5c.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030635

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.726 ± 0.013 |
| spearman | 0.847 ± 0.016 |
| pairwise_acc | 0.863 ± 0.006 |
| ndcg | 0.987 ± 0.002 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.500 ± 0.242 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.029 | 0.998 ± 0.001 | 1.000 ± 0.000 | 0.792 ± 0.144 |
| B | 20 | 0.604 ± 0.022 | 0.969 ± 0.007 | 0.600 ± 0.000 | 2.967 ± 0.208 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 3/3 | dart-lang/sdk#48056 | A | Assess the eMudhra compromise impact on Dart TLS on Android and verify whether dart-lang/sdk#64644 addresses it or if further action is required. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's question on whether Bump should append CHANGELOG.md to lib.Keep or handle it in clean. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR adding client attribution headers and release polish for Pub/Sub. |
| 4 | 4.7 (4–5) | +0.7 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR on google_cloud_rpc error handling. |
| 5 | 4.3 (4–5) | -0.7 | 0.71 | 3/3 | googleapis/google-cloud-dart#252 | B | Review and respond to Yusufihsangorgel's proposed enum representation design. |
| 6 | 7.3 (7–8) | +1.3 | 0.57 | 3/3 | dart-lang/http#2027 | B | Decide on the API design change for `Client.close` and prepare a proposal or PR. |
| 7 | 6.0 (6) | -1.0 | 0.61 | 3/3 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook for CupertinoClient. |
| 8 | 9.7 (9–10) | +1.7 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo or decide whether to prioritize implementing incremental streaming and SSE error handling. |
| 9 | 12.0 (12) | +3.0 | 0.50 | 3/3 | dart-lang/sdk#59846 | B | Investigate and fix the header name character validation in dart:io, or unassign if not working on it. |
| 10 | 13.0 (13) | +3.0 | 0.39 | 0/3 | googleapis/google-cloud-dart#361 | A | Waiting on response from kevmoo regarding API surface tradeoffs vs adding convenience extensions. |
| 11 | 14.3 (14–15) | +3.3 | 0.36 | 0/3 | dart-lang/sdk#31275 | A | None; awaiting someone on the VM/core team to adopt or resurrect the abandoned CL. |
| 12 | 18.3 (18–19) | +6.3 | 0.20 | 0/3 | dart-lang/native#3752 | B | Follow up on PR #3763 instead of this issue. |
| 13 | 10.0 (9–11) | -3.0 | 0.53 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide on the automation approach or update the dependency constraints in pubspec.yaml directly. |
| 14 | 16.3 (16–17) | +2.3 | 0.20 | 0/3 | dart-lang/tools#2719 | B | Wait for another dart-ecosystem-team member to review this automated dependency update. |
| 15 | 15.3 (15–16) | +0.3 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review open PR #382 which addresses this issue. |
| 16 | 21.7 (21–22) | +5.7 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review the pull request. |
| 17 | 7.7 (7–8) | -9.3 ⚠️ | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement RetryRunner wiring and RequestOptions in ServiceClient. |
| 18 | 26.3 (26–27) | +8.3 | 0.08 | 0/3 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 19.3 (19–20) | +0.3 | 0.20 | 3/3 | googleapis/google-cloud-dart#345 | A | Resume work to finish or abandon this draft PR. |
| 20 | 21.7 (20–24) | +1.7 | 0.13 | 0/3 | dart-lang/core#1007 | B | Waiting on author to sign the Contributor License Agreement (CLA) and on package maintainers to review. |
| 21 | 25.0 (25) | +4.0 | 0.10 | 0/3 | dart-lang/tools#2544 | B | Waiting on jonasfj to address lrhn's detailed review comments. |
| 22 | 23.7 (23–24) | +1.7 | 0.10 | 0/3 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR. |
| 23 | 22.7 (22–23) | -0.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 18.3 (14–21) | -5.7 | 0.20 | 0/3 | googleapis/google-cloud-dart#373 | B | Waiting on sigurdm to confirm if the non-PubSub parts are approved to merge or if natebosch review is still needed. |
| 25 | 26.7 (26–27) | +1.7 | 0.09 | 0/3 | dart-lang/http#579 | B | None; this PR is blocked by the next breaking release and lacks an active plan for a 2.0 release. |
| 26 | 17.3 (17–18) | -8.7 | 0.20 | 0/3 | dart-lang/http#1932 | B | Follow up on PR #2034 instead of this issue. |
| 27 | 29.0 (29) | +2.0 | 0.05 | 0/3 | flutter/devtools#8223 | B | None; waiting on the DevTools team or contributors to drive this feature request. |
| 28 | 31.7 (31–32) | +3.7 | 0.05 | 0/3 | dart-lang/http#1837 | A | None; waiting for community contributions or further developments. |
| 29 | 33.7 (33–34) | +4.7 | 0.00 | 0/3 | dart-lang/http#2033 | A | Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | None; this issue belongs to package:http2 which is explicitly outside my scope. |
| 31 | 28.0 (28) | -3.0 | 0.05 | 0/3 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review. |
| 32 | 32.7 (32–33) | +0.7 | 0.00 | 0/3 | dart-lang/http#2026 | A | Waiting on mosuem to review the PR. |
| 33 | 31.7 (30–35) | -1.3 | 0.03 | 0/3 | dart-lang/native#3653 | A | Wait for liamappelbe or the dart-lang/native team to decide whether to pursue changes to VM trampolines or close the issue. |
| 34 | 30.7 (30–31) | -3.3 | 0.05 | 0/3 | dart-lang/http#1972 | B | Waiting on reporter response to reproduction questions (labeled needs-info). |
| 35 | 34.7 (34–35) | -0.3 | 0.00 | 0/3 | dart-lang/http#1841 | B | Wait for or review PR #2002 instead of acting on this issue. |
| 36 | 10.3 (9–11) | -25.7 ⚠️ | 0.52 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's comment with guidance on reproducing and debugging, or unassign myself. |

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

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** Security comes first: this is an issue I created and am assigned regarding TLS root and intermediate CA trust validation on Android. A fresh comment 3 days ago highlights an active security incident (compromised CA intermediate keys) and questions Dart's revocation/blocklist handling. Even if related fixes exist, reviewing and verifying security concerns in code I own takes top priority.
- **Next action:** Assess the eMudhra compromise impact on Dart TLS on Android and verify whether dart-lang/sdk#64644 addresses it or if further action is required.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own pull request fixing an issue in the Dart client tooling. A close collaborator (kevmoo) left actionable review feedback and a design question 21 hours ago that currently blocks merging. I need to respond and update the PR so my own work does not stall.
- **Next action:** Reply to kevmoo's question on whether Bump should append CHANGELOG.md to lib.Keep or handle it in clean.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I am responsible for, authored by my frequent collaborator sigurdm. As the default reviewer for this repository, the next action is on me to review the changes. Since it is relatively fresh (5 days old) and prepares the package for pre-release, it falls squarely in the 0.65–0.8 range.
- **Next action:** Review sigurdm's PR adding client attribution headers and release polish for Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in a repository I am responsible for (googleapis/google-cloud-dart), making me the default reviewer. It was opened 3 days ago by an outside contributor and addresses a concrete bug where REST RPC errors failed to retry properly. It falls in the 0.65–0.8 range for reviews waiting on me in my repositories.
- **Next action:** Review this PR on google_cloud_rpc error handling.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue in a repository I am responsible for (googleapis/google-cloud-dart) that I originally authored. A contributor asked for feedback on an architectural proposal 4 days ago, specifically responding to my request that they share a design before writing lots of code. The ball is in my court to unblock their progress.
- **Next action:** Review and respond to Yusufihsangorgel's proposed enum representation design.

### 6. dart-lang/http#2027 → predicted 7, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue 9 days ago in dart-lang/http, a repository you are responsible for (and not under http2). Issues you filed within the last two weeks in your own areas represent fresh planned work and commitments (0.5–0.65). Since no one else is waiting or blocking it, you can take action on drafting the API change or soliciting feedback.
- **Next action:** Decide on the API design change for `Client.close` and prepare a proposal or PR.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented 5 hours ago that I have started working on it. As active, fresh planned work that I took ownership of in my repository, it falls squarely in the 0.5–0.65 range.
- **Next action:** Work on implementing the server trust evaluation hook for CupertinoClient.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an open issue in googleapis/google-cloud-dart, a repository I am responsible for, filed by a close collaborator (kevmoo). kevmoo answered my question 17 days ago, acknowledging that it is not urgent but pointing out a concrete edge-case/hole in streaming RPC handling. Because the ball is back in my court but the issue is acknowledged as non-urgent and has been quiet for over two weeks, it sits in the lower portion of my planned work.
- **Next action:** Reply to kevmoo or decide whether to prioritize implementing incremental streaming and SSE error handling.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue in dart-lang/sdk regarding HTTP header parser validation. It is an assigned bug on you with no other owner, but it has been completely dormant for 22 months with no new activity. Following the guidelines for assigned issues that need action or unassignment, it belongs in the 0.5 range.
- **Next action:** Investigate and fix the header name character validation in dart:io, or unassign if not working on it.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in a repository I maintain and was filed by a close collaborator (kevmoo). However, I asked an architectural question in my last comment 16 days ago weighing discovery generation vs convenience extensions, and kevmoo has not yet responded. Because the next step is waiting on their answer, this sits in the 0.35–0.5 range.
- **Next action:** Waiting on response from kevmoo regarding API surface tradeoffs vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.38
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was CC'd over two years ago as the owner of the library, and collaborator kevmoo expressed interest in seeing it fixed. However, I am not assigned, dart-lang/sdk is not one of my primary maintained repos, and there has been no directed or fresh activity in well over a year. As an older but significant bug where I was CC'd, it stays at the lower end of the CC range.
- **Next action:** None; awaiting someone on the VM/core team to adopt or resurrect the abandoned CL.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** I opened PR #3763 two days ago to resolve this issue, so any ongoing work belongs on the PR. Per the guidance to avoid duplicate tracking, issues covered by an active open PR are kept in the low range (0.15–0.35) and ranked below the PR itself. There is nothing to act on directly on this issue right now.
- **Next action:** Follow up on PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.55
- **Ground truth:** 
- **Model:** This is an open maintenance task filed by a close collaborator in a repository I am responsible for. I was the last to comment, noting that I am considering how to address the problem systematically, so the next step is on me. Because it represents planned work that has sat without updates for over two weeks, it belongs in the moderate planned-work range.
- **Next action:** Decide on the automation approach or update the dependency constraints in pubspec.yaml directly.

### 14. dart-lang/tools#2719 → predicted 16, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated bot PR in dart-lang/tools, a repository I am not directly responsible for. The review request is directed to the broad dart-ecosystem-team rather than me individually. Although it touches BoringSSL, it is an automated bump and does not present an urgent security incident directed at me.
- **Next action:** Wait for another dart-ecosystem-team member to review this automated dependency update.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository I maintain, but it already has an open linked PR (#382) submitted by the reporter. Per the rules, when an issue has an open PR covering it, the PR is the primary item to act on, and the issue stays in the 0.15–0.35 range.
- **Next action:** Review open PR #382 which addresses this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in a repository I maintain, but I requested a review from goderbauer only two days ago. There is no feedback or action needed from me until the reviewer responds. As it has been less than a week of waiting, it remains low priority.
- **Next action:** Wait for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I maintain (google-cloud-dart), filed by close collaborator kevmoo. I actively scoped and engaged with it 10 days ago by researching API patterns and paring down its scope. Because it represents my own committed/planned active work without blockers, it belongs firmly in the 0.5-0.65 range.
- **Next action:** Implement RetryRunner wiring and RequestOptions in ServiceClient.

### 18. dart-lang/http#2031 → predicted 27, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release PR is stacked on several other PRs, including #2014 which is still open and unreviewed. Furthermore, it belongs to package:http2, which I noted I am not responsible for. Reviewing this before the prerequisite PRs land would be premature.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in googleapis/google-cloud-dart which I converted to draft 45 days ago. There are no human reviewers waiting, but as an old abandoned draft PR of mine, it sits in the 0.15–0.35 range ('my own drafts I should finish or abandon'). Because it has been inactive for a month and a half, it settles near the lower end of that bracket.
- **Next action:** Resume work to finish or abandon this draft PR.

### 20. dart-lang/core#1007 → predicted 20, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, a repository I am not directly responsible for, and was requested only via the dart-ecosystem-team rather than to me personally. Furthermore, the author is a first-time contributor who has not yet signed the CLA, blocking review. There is no immediate action required from me.
- **Next action:** Waiting on author to sign the Contributor License Agreement (CLA) and on package maintainers to review.

### 21. dart-lang/tools#2544 → predicted 25, priority 0.10
- **Ground truth:** 
- **Model:** Although this addresses a security vulnerability (UNC path injection), it is in dart-lang/tools, a repository I am not responsible for, and my only connection is via a team review request. Furthermore, a specific reviewer (lrhn) has already actively engaged and left thorough comments which the author (jonasfj) has not responded to for two months. There is no action required from me right now.
- **Next action:** Waiting on jonasfj to address lrhn's detailed review comments.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft open PR and has not been reviewed or landed yet. Furthermore, dart-lang/tools is not a repository I am personally responsible for, and the review was only requested from the team (dart-ecosystem-team) rather than me personally. Per the guidelines, stacked PRs waiting on lower PRs belong in the low priority range (0.05-0.15).
- **Next action:** Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in a repository outside my primary ownership, and I requested a review from liamappelbe only 2 days ago. There has been no reviewer feedback yet, so there is nothing for me to do until they respond or enough time passes to warrant a ping.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 21, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I manage, but the ball is currently in sigurdm's court. I asked him 4 days ago whether he reviewed the non-PubSub parts and if it's safe to merge without waiting on natebosch. Since it has only been 4 days since asking, there is nothing for me to do until he replies or about a week passes to justify a ping.
- **Next action:** Waiting on sigurdm to confirm if the non-PubSub parts are approved to merge or if natebosch review is still needed.

### 25. dart-lang/http#579 → predicted 26, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This pull request is explicitly labeled 'next-breaking-release', which according to policy puts it in the 0.05-0.15 range. You already noted two years ago that you do not have the bandwidth to coordinate a major release for this breaking change. The only subsequent activity was a question from an external user 14 months ago, which does not unblock or require action.
- **Next action:** None; this PR is blocked by the next breaking release and lacks an active plan for a 2.0 release.

### 26. dart-lang/http#1932 → predicted 17, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is already an open pull request (dart-lang/http#2034) authored by me that addresses this issue. As per the guidelines, when an issue has an open PR covering it, the PR is the item to act on, keeping the issue in the low range (0.1–0.35). Recent user questions on the issue do not change the fact that the work is tracked on the PR.
- **Next action:** Follow up on PR #2034 instead of this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, a repository I am not responsible for. I was only CC'd over two years ago by bkonyi regarding potential HTTP profiling implications. There is no direct question or action item for me, making it very low priority.
- **Next action:** None; waiting on the DevTools team or contributors to drive this feature request.

### 28. dart-lang/http#1837 → predicted 32, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old enhancement request marked as 'contributions-welcome' and 'P3'. I previously responded a year ago clarifying that the Dart team is not planning to implement this, and there has been no new activity since. There is no action required from me right now.
- **Next action:** None; waiting for community contributions or further developments.

### 29. dart-lang/http#2033 → predicted 34, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2 days ago and no new commits or comments have been added since. There is no further action required from me. As specified in the instructions, an approved PR with nothing happening since is scored at or near 0.
- **Next action:** Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** My scope notes for dart-lang/http explicitly specify that I am not responsible for http2. This issue is labelled 'package:http2', I am not assigned or mentioned, and it has been dormant for 8 months. As it is outside my stated scope with no request for my involvement, it receives zero priority.
- **Next action:** None; this issue belongs to package:http2 which is explicitly outside my scope.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. While authored by a close collaborator (kevmoo), my only connection is via the dart-ecosystem-team review request, and a specific reviewer (davidmorgan) is explicitly assigned to review it. Per policy, team review requests in repos I don't own where another reviewer is named fall near 0.
- **Next action:** Waiting on davidmorgan to review.

### 32. dart-lang/http#2026 → predicted 33, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, the author has directly requested review from mosuem, so there is no action for me.
- **Next action:** Waiting on mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 30, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to liamappelbe. I previously participated in the discussion, but the latest discussion is between VM and native interop engineers about internal trampoline mechanics, with liamappelbe concluding it is likely not worth doing. There is no action requested of me and the conversation has been quiet for over a month.
- **Next action:** Wait for liamappelbe or the dart-lang/native team to decide whether to pursue changes to VM trampolines or close the issue.

### 34. dart-lang/http#1972 → predicted 31, priority 0.05
- **Ground truth:** 
- **Model:** I asked the reporter for clarifying information and labeled the issue 'needs-info' 8 days ago, with no response yet. Additionally, there is an open PR (#1974) covering this bug. Until the reporter provides more information or the PR is reviewed, there is no action for me here.
- **Next action:** Waiting on reporter response to reproduction questions (labeled needs-info).

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05, and no new direct activity has occurred since then. Additionally, there is an open PR (#2002) addressing this issue, so any relevant work or review belongs on the PR rather than here. Therefore, this issue requires no action and scores 0.0.
- **Next action:** Wait for or review PR #2002 instead of acting on this issue.

### 36. dart-lang/sdk#38148 → predicted 11, priority 0.50
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You thumbs-downed this issue on 2026-08-01, but filiph commented on 2026-10-01 offering a fresh, local reproduction on modern Dart versions. Because you are assigned to this issue in dart-lang/sdk, someone has offered concrete reproduction info that requires a response or triaging. However, dart-lang/sdk is outside your core responsibilities and the activity is over three weeks old, placing it at the assigned/work-to-do threshold around 0.5.
- **Next action:** Reply to filiph's comment with guidance on reproducing and debugging, or unassign myself.
