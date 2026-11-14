# Gitilizer eval: v5d-gpt-6-luna

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5d.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031133

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.534 ± 0.045 |
| spearman | 0.669 ± 0.049 |
| pairwise_acc | 0.767 ± 0.022 |
| ndcg | 0.954 ± 0.017 |
| ndcg@5 | 0.853 ± 0.106 |
| top3_overlap | 0.556 ± 0.192 |
| top5_overlap | 0.733 ± 0.115 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 5.759 ± 0.446 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.783 ± 0.044 | 0.990 ± 0.011 | 0.933 ± 0.115 | 1.292 ± 0.191 |
| B | 20 | 0.270 ± 0.053 | 0.823 ± 0.023 | 0.533 ± 0.115 | 4.867 ± 0.404 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 5.0 (1–13) | +4.0 | 0.81 | 3/3 | dart-lang/sdk#48056 | A | Clarify whether the recent eMudhra concern needs investigation here, and respond or route it to the relevant security issue. |
| 2 | 1.7 (1–2) | -0.3 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo’s review comment and update the PR to preserve the new CHANGELOG.md across subsequent generates. |
| 3 | 5.0 (4–6) | +2.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review the PR and leave feedback or approve it. |
| 4 | 2.7 (2–3) | -1.3 | 0.74 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 and provide feedback or approval. |
| 5 | 7.0 (4–10) | +2.0 | 0.66 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel’s proposed enum representation with any design concerns and agree on the next step before implementation. |
| 6 | 8.7 (8–9) | +2.7 | 0.58 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an async `Client.close` as a breaking change and add the issue to the appropriate 2.0 planning discussion. |
| 7 | 7.3 (6–8) | +0.3 | 0.61 | 3/3 | dart-lang/http#1981 | B | Continue implementing the trust-evaluation hook, then share a skeleton PR for discussion. |
| 8 | 11.7 (11–13) | +3.7 | 0.54 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo to clarify whether incremental JSON support is needed, then decide whether to take on the buffering change. |
| 9 | 13.3 (12–15) | +4.3 | 0.54 | 3/3 | dart-lang/sdk#59846 | B | Review the parser bug and either implement a fix or unassign yourself if it is no longer in your scope. |
| 10 | 13.7 (7–18) | +3.7 | 0.43 | 3/3 | googleapis/google-cloud-dart#361 | A | Reply to kevmoo with your decision on Discovery versus convenience extensions, or ask for a measured API-size comparison before choosing. |
| 11 | 15.0 (14–16) | +4.0 | 0.42 | 0/3 | dart-lang/sdk#31275 | A | No immediate action is assigned to you; wait for a maintainer to take ownership of the fix. |
| 12 | 21.3 (19–23) | +9.3 ⚠️ | 0.22 | 0/3 | dart-lang/native#3752 | B | Continue work on PR #3763, which addresses this issue. |
| 13 | 12.3 (11–14) | -0.7 | 0.55 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to handle the dependency-version requirement manually or propose a librarian automation fix, then update the issue with the plan. |
| 14 | 29.3 (28–31) | +15.3 ⚠️ | 0.05 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team review; no individual action is requested of you. |
| 15 | 19.7 (19–20) | +4.7 | 0.23 | 0/3 | googleapis/google-cloud-dart#381 | A | No action is needed on this issue; PR #382 is already open to address it. |
| 16 | 25.3 (23–27) | +9.3 ⚠️ | 0.11 | 3/3 | dart-lang/http#2034 | B | Wait for goderbauer to review the PR; follow up if the review is delayed. |
| 17 | 9.0 (7–10) | -8.0 | 0.59 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement or explicitly unassign the retry and RequestOptions work for ServiceClient, including handling non-JSON error responses. |
| 18 | 24.0 (23–25) | +6.0 | 0.12 | 3/3 | dart-lang/http#2031 | A | Review mosuem’s release-preparation PR, once the stacked prerequisite PRs are ready to merge. |
| 19 | 21.7 (20–24) | +2.7 | 0.19 | 3/3 | googleapis/google-cloud-dart#345 | A | Fix the outstanding review issues and merge conflicts, then decide whether to mark the PR ready or abandon it. |
| 20 | 22.0 (17–28) | +2.0 | 0.19 | 2/3 | dart-lang/core#1007 | B | Review the PR as a member of the requested dart-ecosystem-team, after checking whether the CLA requirement is cleared. |
| 21 | 20.7 (19–22) | -0.3 | 0.23 | 3/3 | dart-lang/tools#2544 | B | Review the PR and respond to lrhn’s outstanding feedback, especially the requested helper and edge-case tests. |
| 22 | 15.7 (12–18) | -6.3 | 0.37 | 3/3 | dart-lang/tools#2710 | B | Review mosuem’s PR, prioritizing the provenance parsing and policy API and checking the bot’s suggestions were handled correctly. |
| 23 | 23.7 (22–25) | +0.7 | 0.11 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR; follow up if the review is delayed. |
| 24 | 27.0 (26–28) | +3.0 | 0.10 | 2/3 | googleapis/google-cloud-dart#373 | B | Wait for Sigurdm to answer whether he reviewed the non-Pub/Sub changes, then follow up with Natebosch if review is still needed. |
| 25 | 15.3 (14–17) | -9.7 ⚠️ | 0.41 | 3/3 | dart-lang/http#579 | B | Reply to retendo with the current workaround or clarify that this breaking API change is still deferred until a coordinated major release. |
| 26 | 4.7 (4–5) | -21.3 ⚠️ | 0.73 | 3/3 | dart-lang/http#1932 | B | Review and merge your open fix PR #2034, which is linked to this issue. |
| 27 | 31.0 (29–34) | +4.0 | 0.03 | 0/3 | flutter/devtools#8223 | B | No action for you is indicated; wait for a direct question or assignment in a repository you own. |
| 28 | 35.7 (35–36) | +7.7 | 0.02 | 0/3 | dart-lang/http#1837 | A | No action needed; the issue is a contributions-welcome request and you already explained that community members should pursue it. |
| 29 | 33.0 (31–36) | +4.0 | 0.03 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or a maintainer to merge it. |
| 30 | 34.7 (34–35) | +4.7 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action for you; the issue is outside your stated http2 scope and is awaiting the reporter or maintainer to confirm whether it can be closed. |
| 31 | 19.7 (16–25) | -11.3 ⚠️ | 0.23 | 2/3 | dart-lang/tools#2715 | B | Review kevmoo’s PR when you can; it is a team review request, with davidmorgan also requested. |
| 32 | 28.7 (27–30) | -3.3 | 0.05 | 0/3 | dart-lang/http#2026 | A | Wait for the requested reviewer, mosuem, to review this PR. |
| 33 | 31.3 (30–32) | -1.7 | 0.03 | 0/3 | dart-lang/native#3653 | A | Wait for the issue owner or project maintainers to decide whether to pursue this; no response is currently needed from you. |
| 34 | 33.3 (33–34) | -0.7 | 0.03 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested client and reproduction details. |
| 35 | 30.0 (26–33) | -5.0 | 0.06 | 1/3 | dart-lang/http#1841 | B | Review agam1092005’s linked PR #2002 and respond there if its approach needs changes; the issue itself is covered by that PR. |
| 36 | 6.0 (3–9) | -30.0 ⚠️ | 0.68 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph with a concrete way to help reproduce or investigate, and follow up on the assigned SDK bug. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/http#1932** (truth #26) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 13, priority 0.56
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is your assigned issue, and it has new security-related information and a direct question about Dart's Android trust behavior, so it merits attention despite the old P3 status. The latest response points to a separate issue, and the report is not clearly an actionable vulnerability finding for you yet; first verify whether the concern is covered there and whether follow-up is needed.
- **Next action:** Clarify whether the recent eMudhra concern needs investigation here, and respond or route it to the relevant security issue.

### 2. googleapis/librarian#7808 → predicted 1, priority 0.86
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR in a repository you do not own, so it does not receive the highest repository-priority band, but a close collaborator has left fresh review feedback and the PR is blocked pending review. The comment identifies a concrete behavior issue and asks you to choose a fix; responding and addressing it is your next action.
- **Next action:** Reply to kevmoo’s review comment and update the PR to preserve the new CHANGELOG.md across subsequent generates.

### 3. googleapis/google-cloud-dart#376 → predicted 6, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in a repository you are responsible for, with no human review recorded; as the default reviewer, it merits attention. It was opened five days ago by close collaborator sigurdm, and the only review is from a bot, so the review remains outstanding. The PR is marked behind, but that does not remove the need for your review.
- **Next action:** Review the PR and leave feedback or approve it.

### 4. googleapis/google-cloud-dart#382 → predicted 2, priority 0.74
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open, unreviewed PR in a repository you are responsible for, so you are effectively the default reviewer. It was opened three days ago by a first-time contributor; the only review is from a bot, which does not count. The change affects REST error-code handling and retry behavior, making timely human review useful.
- **Next action:** Review PR #382 and provide feedback or approval.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your issue in a repository you own, and it has fresh design discussion from four days ago that needs your review to help the contributor proceed. Yusufihsangorgel is driving the implementation and has proposed a specific breaking representation, so the immediate next action is yours to assess the design, not to implement the fix. The recent activity and direct relevance put it in the 0.65–0.8 range.
- **Next action:** Reply to Yusufihsangorgel’s proposed enum representation with any design concerns and agree on the next step before implementation.

### 6. dart-lang/http#2027 → predicted 9, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You filed this issue in an area you work in less than two weeks ago, so it qualifies as planned work. There has been no activity since you opened it, and no one is waiting on you, keeping it in the lower part of the planned-work range.
- **Next action:** Decide whether to pursue an async `Client.close` as a breaking change and add the issue to the appropriate 2.0 planning discussion.

### 7. dart-lang/http#1981 → predicted 8, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is an issue in a repository you’re interested in, and you recently assigned it to yourself and said you’ve started working on it. The clear next step is yours, making it planned work in the 0.5–0.65 range; there is no new activity from the reporter or another person asking for an immediate response.
- **Next action:** Continue implementing the trust-evaluation hook, then share a skeleton PR for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.58
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator's issue in a repository you own, and your question received a reply with a clear opportunity to decide the scope. It is not urgent, and there has been no activity for 17 days, so it sits in the planned-work range rather than requiring immediate attention.
- **Next action:** Reply to kevmoo to clarify whether incremental JSON support is needed, then decide whether to take on the buffering change.

### 9. dart-lang/sdk#59846 → predicted 15, priority 0.53
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are explicitly assigned to this Dart SDK bug, so it merits attention even though it is outside your listed repositories of responsibility. The issue has had no human activity for about 22 months and no new information or direct question, which keeps it near the low end of the assigned-work range.
- **Next action:** Review the parser bug and either implement a fix or unassign yourself if it is no longer in your scope.

### 10. googleapis/google-cloud-dart#361 → predicted 7, priority 0.68
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator's issue in a repository you own, and kevmoo answered your question; the discussion now needs your response to decide the implementation direction. The issue is not recent enough for the highest bands, and there is no explicit indication that anyone is blocked, but the unresolved design choice is a clear next action for you.
- **Next action:** Reply to kevmoo with your decision on Discovery versus convenience extensions, or ask for a measured API-size comparison before choosing.

### 11. dart-lang/sdk#31275 → predicted 16, priority 0.43
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old, unresolved production-impacting bug, and you were explicitly CC'd by collaborators, which merits some attention. However, the latest activity is 20 months old, the proposed patch was tested years ago, and nobody is currently waiting on a reply or action from you. You are not responsible for dart-lang/sdk, so this falls in the low-priority range for an old CC'd issue.
- **Next action:** No immediate action is assigned to you; wait for a maintainer to take ownership of the fix.

### 12. dart-lang/native#3752 → predicted 23, priority 0.20
- **Ground truth:** 
- **Model:** You filed and assigned this issue within the last two weeks, which would normally make it planned work. However, the linked open PR #3763 covers it, so the issue should rank below that PR. No activity on the issue itself since you opened it.
- **Next action:** Continue work on PR #3763, which addresses this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 14, priority 0.55
- **Ground truth:** 
- **Model:** This is a collaborator's issue in a repository you care about, and your last comment raised a design question that you can resolve. There has been no activity since your comment 17 days ago, and the issue does not indicate that anyone is blocked, so it is a moderate planned follow-up rather than urgent work.
- **Next action:** Decide whether to handle the dependency-version requirement manually or propose a librarian automation fix, then update the issue with the plan.

### 14. dart-lang/tools#2719 → predicted 29, priority 0.08
- **Ground truth:** 
- **Model:** This is a fresh PR in a repository outside your stated areas of responsibility, and the review request is to a team you belong to rather than to you personally. No collaborator review or direct request is shown, so it is a shared team queue item rather than an individual task.
- **Next action:** Wait for the dart-ecosystem-team review; no individual action is requested of you.

### 15. googleapis/google-cloud-dart#381 → predicted 19, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue is covered by an open PR from its author, and you have not been mentioned, assigned, or asked to review it. Your interest in the repository does not make this stranger-authored issue yours to act on; track the PR instead.
- **Next action:** No action is needed on this issue; PR #382 is already open to address it.

### 16. dart-lang/http#2034 → predicted 27, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR in a repository you follow, and you requested review only two days ago. It is currently waiting on the reviewer you asked, so it falls in the low-priority range for a PR awaiting review during the first week. There has been no reviewer feedback or other new activity requiring action from you.
- **Next action:** Wait for goderbauer to review the PR; follow up if the review is delayed.

### 17. googleapis/google-cloud-dart#359 → predicted 10, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is a collaborator’s issue in a repository you own, and it is assigned to you with a clear implementation step. Your comments from 10 days ago were clarification, not completion, so the assigned work remains actionable; however, there has been no new activity directed at you since then, keeping it in the planned-work range rather than the urgent range.
- **Next action:** Implement or explicitly unassign the retry and RequestOptions work for ServiceClient, including handling non-JSON error responses.

### 18. dart-lang/http#2031 → predicted 25, priority 0.12
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** You are explicitly requested as reviewer, but http2 is outside your stated responsibility and this PR is stacked on other open PRs, so it is not ready for useful review or merge now. The PR itself has had no activity since its creation beyond a force-push three days ago, and no one is waiting on a direct reply from you; this is a low-priority review request.
- **Next action:** Review mosuem’s release-preparation PR, once the stacked prerequisite PRs are ready to merge.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.24
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your draft PR in a repository you own, but it has had no activity for about 45 days and no one is waiting on your response. The bot feedback is old and bot activity does not count as new activity; the PR’s draft status and dirty merge state make it low-priority work to resume rather than an urgent review task.
- **Next action:** Fix the outstanding review issues and merge conflicts, then decide whether to mark the PR ready or abandon it.

### 20. dart-lang/core#1007 → predicted 21, priority 0.23
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in a repository you are not responsible for, so it falls in the low-priority team-review range rather than being a personal review assignment. The PR is still awaiting review, but the only reported activity is from 15 days ago and its CLA check may block progress; no recent activity is directed at you personally.
- **Next action:** Review the PR as a member of the requested dart-ecosystem-team, after checking whether the CLA requirement is cleared.

### 21. dart-lang/tools#2544 → predicted 22, priority 0.23
- **Ground truth:** 
- **Model:** This is a team review request in a repository outside your stated areas of responsibility, so it falls in the low-priority shared-team-review range. The PR addresses a security concern, but it is not a security PR in a repository you own, and no security exception elevates it. The latest collaborator feedback is two months old, so there is no recent activity raising urgency.
- **Next action:** Review the PR and respond to lrhn’s outstanding feedback, especially the requested helper and edge-case tests.

### 22. dart-lang/tools#2710 → predicted 12, priority 0.57
- **Ground truth:** 
- **Model:** This is a recent PR from a close collaborator in a repository where you’re a member of the requested dart-ecosystem-team, so you can review it; no human has reviewed it yet. The PR is stacked on an unreviewed draft PR, which limits how immediately actionable it is, and the team request is shared rather than directed only to you. Its security-adjacent provenance work merits attention, but this is not itself identified as a security issue.
- **Next action:** Review mosuem’s PR, prioritizing the provenance parsing and policy API and checking the bot’s suggestions were handled correctly.

### 23. dart-lang/native#3763 → predicted 24, priority 0.12
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR in a repository outside your stated areas of responsibility, and you requested a reviewer only two days ago. There is no review feedback or other new activity requiring your response; it is currently waiting on the reviewer.
- **Next action:** Wait for liamappelbe to review the PR; follow up if the review is delayed.

### 24. googleapis/google-cloud-dart#373 → predicted 28, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR, but you requested review from Natebosch and asked Sigurdm a question only four days ago; the next step is currently with them, so there is no useful immediate action for you. It has an approval from Sigurdm and unresolved review threads, but no new activity since your last comment. Score it low as a PR waiting on reviewers you asked within the last week.
- **Next action:** Wait for Sigurdm to answer whether he reviewed the non-Pub/Sub changes, then follow up with Natebosch if review is still needed.

### 25. dart-lang/http#579 → predicted 17, priority 0.42
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** Retendo asked a direct question about a workaround, but the question is 14 months old and the PR has had no newer activity. The PR is in a repository you are interested in, but it is labeled for a future breaking release, and you previously said you lack bandwidth to coordinate that release. A brief reply is useful; reviewing or advancing the PR itself is not an immediate next step.
- **Next action:** Reply to retendo with the current workaround or clarify that this breaking API change is still deferred until a coordinated major release.

### 26. dart-lang/http#1932 → predicted 5, priority 0.72
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You are assigned to this bug in a repository you care about, and the recent request for an update reinforces that the issue remains active. The concrete next step is on your open PR #2034, not a direct reply on the issue; the PR has only been open two days, so this is important but not yet blocking-level urgency.
- **Next action:** Review and merge your open fix PR #2034, which is linked to this issue.

### 27. flutter/devtools#8223 → predicted 34, priority 0.02
- **Ground truth:** 
- **Model:** You were CC'd on an informational comment in flutter/devtools, a repository outside your stated areas of responsibility, and no one has asked you to act. The recent update was an unlabeled event by someone else, not new activity directed at you.
- **Next action:** No action for you is indicated; wait for a direct question or assignment in a repository you own.

### 28. dart-lang/http#1837 → predicted 36, priority 0.02
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old, low-priority enhancement in a repository you are not responsible for, with no activity since your reply a year ago. You already gave the reporter direction, and nothing is waiting on you.
- **Next action:** No action needed; the issue is a contributions-welcome request and you already explained that community members should pursue it.

### 29. dart-lang/http#2033 → predicted 31, priority 0.03
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You approved this PR two days ago, and there has been no activity since your review or any new commits. It is clean and has no unresolved review threads, so there is nothing for you to do now.
- **Next action:** Wait for the PR author or a maintainer to merge it.

### 30. dart-lang/http#1365 → predicted 35, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is a long-standing issue in dart-lang/http2, which you explicitly said you are not responsible for. The latest question is directed generally, not to you, and there has been no activity from you or new information requiring verification. The likely next step belongs to the reporter or a package maintainer.
- **Next action:** No action for you; the issue is outside your stated http2 scope and is awaiting the reporter or maintainer to confirm whether it can be closed.

### 31. dart-lang/tools#2715 → predicted 18, priority 0.30
- **Ground truth:** 
- **Model:** This is a recent PR from a close collaborator, but it is in dart-lang/tools, outside the repositories you own or list as interests. The review request is to the shared dart-ecosystem-team and davidmorgan is named individually, so it is not directed to you personally; the bot review does not change that. A team review request in another repository is low priority, though the PR’s recent activity and collaborator author place it toward the upper end of that range.
- **Next action:** Review kevmoo’s PR when you can; it is a team review request, with davidmorgan also requested.

### 32. dart-lang/http#2026 → predicted 30, priority 0.04
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in dart-lang/http, where you are not responsible for http2, and the author explicitly asked mosuem—not you—for review. The recent update and passing tests do not create an action for you; the PR is blocked pending review by someone else.
- **Next action:** Wait for the requested reviewer, mosuem, to review this PR.

### 33. dart-lang/native#3653 → predicted 32, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to Liam, and the latest discussion is about his implementation options rather than a question or request for you. Your earlier input predates the latest activity, and no new action has been directed at you. It is outside the repositories you identified as responsible for, so it does not currently merit attention.
- **Next action:** Wait for the issue owner or project maintainers to decide whether to pursue this; no response is currently needed from you.

### 34. dart-lang/http#1972 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** The issue is labeled needs-info, and your last comment asked the reporter for details; no reply has arrived. Although it is assigned to you in a repository you work in, there is no useful action until the reporter responds, so it falls in the no-action range.
- **Next action:** Wait for the reporter to provide the requested client and reproduction details.

### 35. dart-lang/http#1841 → predicted 26, priority 0.12
- **Ground truth:** 
- **Model:** The new activity is a proposed implementation and open PR, so there is no immediate issue-level work unless you choose to review the PR. The issue is marked for the next breaking release and you gave it a thumbs-down on October 5, after the activity shown here, with no subsequent activity directed at you. Its priority stays very low while the linked PR is open.
- **Next action:** Review agam1092005’s linked PR #2002 and respond there if its approach needs changes; the issue itself is covered by that PR.

### 36. dart-lang/sdk#38148 → predicted 3, priority 0.73
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** This is assigned to you in the Dart SDK, and the recent report confirms the bug still reproduces on a current stable release, so it merits attention despite the old issue and thumbs-down. Filiph directly asks how to help; a response could unblock investigation. The latest commit reference is from a bot, so it does not count as human progress.
- **Next action:** Reply to filiph with a concrete way to help reproduce or investigate, and follow up on the assigned SDK bug.
