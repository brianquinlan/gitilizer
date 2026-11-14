# Gitilizer eval: v5g-gpt-6-luna-r2-r2-r2-r2

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5g.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031430

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.577 ± 0.019 |
| spearman | 0.710 ± 0.025 |
| pairwise_acc | 0.788 ± 0.010 |
| ndcg | 0.968 ± 0.008 |
| ndcg@5 | 0.957 ± 0.038 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.867 ± 0.115 |
| top10_overlap | 0.667 ± 0.058 |
| mean_abs_displacement | 5.593 ± 0.115 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.783 ± 0.060 | 0.994 ± 0.002 | 0.867 ± 0.115 | 1.333 ± 0.315 |
| B | 20 | 0.382 ± 0.060 | 0.879 ± 0.056 | 0.467 ± 0.115 | 4.600 ± 0.500 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Assess whether Dart's Android TLS handling bypasses Android's eMudhra mitigations, then respond with findings or file/coordinate a focused security issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Decide how to preserve the newly created CHANGELOG.md, reply to kevmoo, and update the PR if needed. |
| 3 | 3.3 (3–4) | +0.3 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review Sigurd's Pub/Sub pre-release PR, focusing on the client attribution header, package metadata, and tests. |
| 4 | 4.0 (3–5) | +0.0 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 and approve or leave any requested changes. |
| 5 | 6.7 (5–8) | +1.7 | 0.60 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel’s proposed representation with design feedback and agree on the compatibility/unknown-name behavior before implementation proceeds. |
| 6 | 10.0 (8–12) | +4.0 | 0.57 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue the breaking async `Client.close` change and, if so, outline it as planned work for the next major release. |
| 7 | 7.3 (6–9) | +0.3 | 0.58 | 3/3 | dart-lang/http#1981 | B | Continue implementing the trust-evaluation hook in CupertinoClient and clarify the API design in a draft PR. |
| 8 | 14.7 (13–17) | +6.7 | 0.48 | 2/3 | googleapis/google-cloud-dart#360 | A | Clarify whether incremental JSON delivery is a requirement and decide whether to take on the streaming/error-handling changes. |
| 9 | 15.3 (15–16) | +6.3 | 0.53 | 3/3 | dart-lang/sdk#59846 | B | Investigate the parser behavior and implement or coordinate a fix for invalid HTTP header-name characters. |
| 10 | 13.7 (12–16) | +3.7 | 0.52 | 2/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to respond to your question about whether discovery is preferable to adding convenience extensions. |
| 11 | 21.7 (18–24) | +10.7 ⚠️ | 0.18 | 0/3 | dart-lang/sdk#31275 | A | Wait for the Dart SDK owner or another contributor to take over the abandoned fix; you have not been asked to act directly. |
| 12 | 18.7 (18–20) | +6.7 | 0.24 | 0/3 | dart-lang/native#3752 | B | Wait for your open PR #3763 to address this issue; focus review and merge work on that PR instead. |
| 13 | 11.0 (10–13) | -2.0 | 0.57 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to fix dependency-version updates through librarian automation, then update the issue with the approach or next steps. |
| 14 | 20.0 (19–21) | +6.0 | 0.18 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team review; this is a team request, not a personal request to you. |
| 15 | 18.3 (17–19) | +3.3 | 0.23 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which covers this issue; take no separate action on the issue. |
| 16 | 25.7 (25–26) | +9.7 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 9.7 (9–11) | -7.3 | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the assigned ServiceClient retry/request-options and non-JSON error handling changes, excluding AIP-4222/AIP-155 work tracked in issue #80. |
| 18 | 25.7 (24–28) | +7.7 | 0.11 | 0/3 | dart-lang/http#2031 | A | Wait for the stacked PRs below this release PR to be reviewed and merged; then review this PR if it is still needed. |
| 19 | 15.3 (14–17) | -3.7 | 0.47 | 3/3 | googleapis/google-cloud-dart#345 | A | Resume the draft, address the outstanding review comments, and resolve the merge conflict before requesting review. |
| 20 | 21.7 (21–22) | +1.7 | 0.17 | 0/3 | dart-lang/core#1007 | B | Wait for the dart-ecosystem-team review; no individual review was requested from you. |
| 21 | 13.0 (4–30) | -8.0 | 0.51 | 2/3 | dart-lang/tools#2544 | B | Review the updated PR and leave feedback or approval, focusing on lrhn’s unresolved security-validation and test comments. |
| 22 | 24.3 (21–28) | +2.3 | 0.13 | 0/3 | dart-lang/tools#2710 | B | Wait for the stacked base PR #2563 to progress; this team review request is not assigned to you personally. |
| 23 | 26.7 (26–27) | +3.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR; follow up if there is still no response after about a week. |
| 24 | 14.0 (12–16) | -10.0 ⚠️ | 0.51 | 3/3 | googleapis/google-cloud-dart#373 | B | Follow up with Sigurdm about whether he reviewed the non-Pub/Sub changes, and address any remaining review feedback before merging. |
| 25 | 26.7 (25–28) | +1.7 | 0.11 | 0/3 | dart-lang/http#579 | B | Leave this PR parked until a coordinated breaking release is planned; the reporter’s workaround question does not change that blocker. |
| 26 | 7.0 (6–8) | -19.0 ⚠️ | 0.62 | 3/3 | dart-lang/http#1932 | B | Review and merge your open fix PR #2034, then update the issue with its status. |
| 27 | 30.7 (30–32) | +3.7 | 0.05 | 0/3 | flutter/devtools#8223 | B | Wait for the DevTools maintainers or the contributor to advance the feature; no action is requested from you. |
| 28 | 32.3 (31–34) | +4.3 | 0.05 | 0/3 | dart-lang/http#1837 | A | Wait for a community contributor to take up the contributions-welcome issue; no follow-up is needed from you. |
| 29 | 35.3 (35–36) | +6.3 | 0.02 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or maintainer to merge it; your review is already approved. |
| 30 | 35.0 (34–36) | +5.0 | 0.02 | 0/3 | dart-lang/http#1365 | A | Leave this alone; the issue is in http2, an area you noted you are not responsible for. |
| 31 | 21.7 (20–23) | -9.3 ⚠️ | 0.16 | 0/3 | dart-lang/tools#2715 | B | Wait for the explicitly requested reviewer, davidmorgan, or the dart-ecosystem-team to review. |
| 32 | 31.3 (29–34) | -0.7 | 0.05 | 0/3 | dart-lang/http#2026 | A | Wait for the HTTP repository maintainers to review; you are not responsible for the http2 area. |
| 33 | 28.7 (23–32) | -4.3 | 0.08 | 0/3 | dart-lang/native#3653 | A | No action needed now; the proposed optimization was judged not worth pursuing, so wait unless the issue is reopened with a concrete request. |
| 34 | 33.0 (33) | -1.0 | 0.03 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested client and reproduction details; the linked PR is also marked needs-info. |
| 35 | 31.3 (29–36) | -3.7 | 0.05 | 0/3 | dart-lang/http#1841 | B | Wait for the open PR #2002 to be reviewed or merged; the issue itself is covered by that PR. |
| 36 | 9.3 (6–11) | -26.7 ⚠️ | 0.61 | 3/3 | dart-lang/sdk#38148 | B | Reproduce the failure in current Dart and reply to filiph with a concrete investigation or debugging request. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.94
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is now a security concern involving potentially compromised intermediate CA keys, and you are the issue author and assignee in an area you work in. The recent report raises a concrete question about whether Dart/Flutter Android clients bypass platform blocklists; the link to a related fix does not establish that this issue is resolved, so verify the impact and close the loop promptly.
- **Next action:** Assess whether Dart's Android TLS handling bypasses Android's eMudhra mitigations, then respond with findings or file/coordinate a focused security issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.84
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR, and kevmoo raised an unanswered question that may affect whether the generated changelog survives the next run. The feedback is recent and gives you a concrete next step; resolving it will unblock review. The earlier bot feedback was already addressed.
- **Next action:** Decide how to preserve the newly created CHANGELOG.md, reply to kevmoo, and update the PR if needed.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in googleapis/google-cloud-dart, a repository you are responsible for, so you are its default reviewer even though you were not explicitly requested. It is from a close collaborator and has no human review yet; the recent bot review does not count as a review from a person. The PR was opened five days ago, so the review is fresh and actionable.
- **Next action:** Review Sigurd's Pub/Sub pre-release PR, focusing on the client attribution header, package metadata, and tests.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open, unreviewed PR in a repository you are responsible for, so you are the default reviewer despite not being explicitly requested. It is a fresh contribution with a concrete behavioral fix and tests; the only review so far is an automated bot review. The PR is not marked as security-related, so it belongs in the review-waiting-on-you range.
- **Next action:** Review PR #382 and approve or leave any requested changes.

### 5. googleapis/google-cloud-dart#252 → predicted 8, priority 0.61
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your recently filed issue in a repository you work in, so it remains fresh planned work despite being six months old. The collaborator’s latest proposal is four days old and needs your direction on the design; your last comment was ten days ago, so this is new activity rather than something already handled. It fits the 0.5–0.65 range for your own planned work, but the implementation is being driven by a contributor and the immediate leverage is to settle the design.
- **Next action:** Reply to Yusufihsangorgel’s proposed representation with design feedback and agree on the compatibility/unknown-name behavior before implementation proceeds.

### 6. dart-lang/http#2027 → predicted 10, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is your own issue, filed nine days ago in a repository you work in, with no external blocker or new activity; it qualifies as fresh planned work. The next step is yours, though the issue is exploratory and concerns a breaking API change, so it sits in the middle of the planned-work range rather than near the top.
- **Next action:** Decide whether to pursue the breaking async `Client.close` change and, if so, outline it as planned work for the next major release.

### 7. dart-lang/http#1981 → predicted 9, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You said five hours ago that you had started working on this and assigned the issue to yourself, so this is your active commitment. Although the issue is in dart-lang/http, your note excludes only http2, and this request concerns CupertinoClient; the recent update makes it fresh planned work. It is a feature request rather than a security issue, so it sits in the planned-work range rather than the highest-priority bands.
- **Next action:** Continue implementing the trust-evaluation hook in CupertinoClient and clarify the API design in a draft PR.

### 8. googleapis/google-cloud-dart#360 → predicted 14, priority 0.54
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a recent issue from a close collaborator in a repository you work in, with a concrete design decision and implementation path for you. Kevmoo replied to your question 17 days ago, so the thread has new information to assess; the issue is explicitly not urgent, keeping it in the lower part of the planned-work range.
- **Next action:** Clarify whether incremental JSON delivery is a requirement and decide whether to take on the streaming/error-handling changes.

### 9. dart-lang/sdk#59846 → predicted 15, priority 0.53
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned this issue, so the next step is yours; no PR or external blocker is indicated. It concerns HTTP parsing and potential proxy interoperability/security risks, but it has had no activity for about 22 months and is outside the repositories you specifically listed as responsible, keeping it near the lower end of the assigned-work range.
- **Next action:** Investigate the parser behavior and implement or coordinate a fix for invalid HTTP header-name characters.

### 10. googleapis/google-cloud-dart#361 → predicted 16, priority 0.42
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator’s issue in a repository you work in, but the concrete decision is currently waiting on kevmoo: you asked which implementation approach is preferable, and no response has arrived. Your comment is 16 days old, so it is worth keeping visible for a follow-up, but the next step is not yours until you get that input.
- **Next action:** Wait for kevmoo to respond to your question about whether discovery is preferable to adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 23, priority 0.14
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a long-dormant issue in dart-lang/sdk, which is outside your stated repository responsibilities. The mentions of you are informational CCs asking who owns the library, not direct requests, and the latest activity was 20 months ago. A proposed fix was tested but abandoned, so the issue remains low-priority peripheral work rather than an actionable commitment for you.
- **Next action:** Wait for the Dart SDK owner or another contributor to take over the abandoned fix; you have not been asked to act directly.

### 12. dart-lang/native#3752 → predicted 18, priority 0.26
- **Ground truth:** 
- **Model:** This is a fresh issue you filed and assigned to yourself, which would normally be planned work. However, open PR #3763 already covers it, so the PR—not the issue—is the actionable item, and duplicate issues stay in the low range. You last acted when assigning it, with no newer activity on the issue.
- **Next action:** Wait for your open PR #3763 to address this issue; focus review and merge work on that PR instead.

### 13. googleapis/google-cloud-dart#366 → predicted 13, priority 0.55
- **Ground truth:** 
- **Model:** This is in a repository you work in, was filed by collaborator sigurdm, and your comment opened a question about the general fix that remains unresolved. The issue is not blocked by a label or an open PR covering it, so the next step is yours; however, your last activity was 17 days ago and there has been no new activity since, keeping it in the planned-work range rather than elevating it as a fresh request.
- **Next action:** Decide whether to fix dependency-version updates through librarian automation, then update the issue with the approach or next steps.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.18
- **Ground truth:** 
- **Model:** This is a fresh PR, but it is in dart-lang/tools, outside the repositories you are responsible for, and the review was requested only from a team you belong to. Team review requests in repositories you do not own are low priority; no individual reviewer or other action is directed at you.
- **Next action:** Wait for the dart-ecosystem-team review; this is a team request, not a personal request to you.

### 15. googleapis/google-cloud-dart#381 → predicted 19, priority 0.24
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue is in a repository you own, but an open PR explicitly fixes it, so the PR is the item to act on and this issue should remain low priority. The issue is recent, but there is no direct request to you or new activity requiring separate verification here.
- **Next action:** Review PR #382, which covers this issue; take no separate action on the issue.

### 16. dart-lang/http#2034 → predicted 26, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR, but you requested review from goderbauer two days ago and no review activity has followed. The next step is with the reviewer, so it belongs in the low range for PRs waiting on a recently asked reviewer. The linked issue is covered by this PR and does not add a separate action here.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 11, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is a clear next step on an issue in a repository you own, and you are assigned; it is also filed by collaborator kevmoo. Your latest update narrowed the scope, but no one else is blocking progress. It is 10 days since your last activity, so it remains planned work but is less fresh than a recent commitment.
- **Next action:** Implement the assigned ServiceClient retry/request-options and non-JSON error handling changes, excluding AIP-4222/AIP-155 work tracked in issue #80.

### 18. dart-lang/http#2031 → predicted 24, priority 0.12
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** You are explicitly requested to review, but this PR is stacked on other open PRs, including #2014, which is still awaiting review, so it is blocked for now. You are not responsible for the http2 area, and the recent activity does not change that dependency. Once the lower PRs are ready, the review request can be revisited.
- **Next action:** Wait for the stacked PRs below this release PR to be reviewed and merged; then review this PR if it is still needed.

### 19. googleapis/google-cloud-dart#345 → predicted 17, priority 0.30
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft PR in a repository you work in, but it has been quiet for 45 days and no reviewer is currently waiting on you. The review comments identify concrete fixes, and the PR is marked dirty, so it is worth finishing but sits below fresh commitments and active reviews.
- **Next action:** Resume the draft, address the outstanding review comments, and resolve the merge conflict before requesting review.

### 20. dart-lang/core#1007 → predicted 21, priority 0.18
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in a repository you are not listed as responsible for, so it is not a personal request to act. The PR has no review activity and its last human activity was the original team request 15 days ago; its age does not make it actionable for you. The CLA check also appears to be awaiting the contributor.
- **Next action:** Wait for the dart-ecosystem-team review; no individual review was requested from you.

### 21. dart-lang/tools#2544 → predicted 5, priority 0.71
- **Ground truth:** 
- **Model:** This is a security-mitigation PR in a Dart tools repository, but your role is only a shared team review request, not a personal request or a repository you own; so it does not qualify for the top security-review range. Still, the team review remains required, six threads are unresolved, and the latest substantive reviewer feedback is yours to consider; the PR has been quiet for two months, which lowers its freshness. Since it is not blocked by an unreviewed stacked PR or another explicit dependency, a review is a useful next step.
- **Next action:** Review the updated PR and leave feedback or approval, focusing on lrhn’s unresolved security-validation and test comments.

### 22. dart-lang/tools#2710 → predicted 28, priority 0.08
- **Ground truth:** 
- **Model:** This PR is requested from the dart-ecosystem-team, not from you individually, and dart-lang/tools is not listed as a repository you own. It is also stacked on the still-draft #2563, so review of this PR is blocked until the base PR progresses. The recent activity is from the author and bot, not a new request to you.
- **Next action:** Wait for the stacked base PR #2563 to progress; this team review request is not assigned to you personally.

### 23. dart-lang/native#3763 → predicted 27, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, and you requested a review from liamappelbe two days ago, so the next step is theirs rather than yours. The request is still recent, so there is no need to ping yet; the linked issues are covered by this PR and do not create a separate action.
- **Next action:** Wait for liamappelbe to review the PR; follow up if there is still no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 12, priority 0.56
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your open PR in a repository you own, and its related issue is assigned to you; your latest comment asks Sigurdm for confirmation, so that response is currently pending. The PR has an approval and your review request to Nate is still outstanding, but you have unresolved review threads and the branch is behind, leaving you useful follow-up work. Recent activity is yours, so it does not make the waiting review response new; keep this in the planned-work range rather than treating it as feedback currently blocking someone.
- **Next action:** Follow up with Sigurdm about whether he reviewed the non-Pub/Sub changes, and address any remaining review feedback before merging.

### 25. dart-lang/http#579 → predicted 25, priority 0.12
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The `next-breaking-release` label blocks this PR, and you last said you lack bandwidth to coordinate the necessary major release. The PR has been inactive for 14 months; the recent question is not directed at you and does not unblock the planned-release constraint. Keep it in the low range for a PR waiting on a future breaking release.
- **Next action:** Leave this PR parked until a coordinated breaking release is planned; the reporter’s workaround question does not change that blocker.

### 26. dart-lang/http#1932 → predicted 7, priority 0.67
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** The issue is assigned to you in a repository you work in, and it has fresh activity asking for an update. More importantly, your open PR #2034 appears to address the issue, so the issue itself is not the main work item; act on the PR and avoid duplicating that work here. The recent question makes a brief status update useful, but the PR is the direct next step.
- **Next action:** Review and merge your open fix PR #2034, then update the issue with its status.

### 27. flutter/devtools#8223 → predicted 30, priority 0.04
- **Ground truth:** 
- **Model:** This is a low-priority enhancement in a repository you do not own, and your only involvement is an informational CC from 2024. The recent label change does not ask you to do anything, and the question from the GSOC contributor was directed to someone else. There is no new activity directed at you that calls for a response.
- **Next action:** Wait for the DevTools maintainers or the contributor to advance the feature; no action is requested from you.

### 28. dart-lang/http#1837 → predicted 31, priority 0.04
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old enhancement in dart-lang/http, an area where you are not responsible, and it is explicitly marked contributions-welcome. You already explained that it is community work, and nothing has changed since your comment or labeling nearly a year ago.
- **Next action:** Wait for a community contributor to take up the contributions-welcome issue; no follow-up is needed from you.

### 29. dart-lang/http#2033 → predicted 35, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You approved the PR two days ago, and there have been no commits or author activity since. Nothing is waiting on you, and this is a repository where you are not responsible for all reviews by default. The PR is approved and quiet, so it belongs near the bottom of the scale.
- **Next action:** Wait for the PR author or maintainer to merge it; your review is already approved.

### 30. dart-lang/http#1365 → predicted 36, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** You have no direct request or assigned role here, and your scope note explicitly excludes http2 in dart-lang/http. The latest comment asks the issue participants to confirm the cause, not you; the thread has also been quiet for eight months.
- **Next action:** Leave this alone; the issue is in http2, an area you noted you are not responsible for.

### 31. dart-lang/tools#2715 → predicted 22, priority 0.17
- **Ground truth:** 
- **Model:** This is a team review request in a repository you are not responsible for, and a specific reviewer was also requested, so it is not currently yours to review. The request is only two days old; the bot review does not change that. The PR is from a close collaborator, but team requests in other repositories remain low priority.
- **Next action:** Wait for the explicitly requested reviewer, davidmorgan, or the dart-ecosystem-team to review.

### 32. dart-lang/http#2026 → predicted 34, priority 0.02
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR changes only http2, which is explicitly outside your responsibility in dart-lang/http, and you were not personally asked to review it. The author asked mosuem, a collaborator, and the recent activity does not create work for you.
- **Next action:** Wait for the HTTP repository maintainers to review; you are not responsible for the http2 area.

### 33. dart-lang/native#3653 → predicted 32, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, outside the repositories you own, and you were only thanked for an earlier tip rather than asked to act. The discussion ended with the assignee concluding that the required trampoline changes are likely not worth the effort; the related PR is already merged, and there has been no new activity for 34 days. Nothing currently depends on you.
- **Next action:** No action needed now; the proposed optimization was judged not worth pursuing, so wait unless the issue is reopened with a concrete request.

### 34. dart-lang/http#1972 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** The issue is labeled needs-info, and you have already asked the reporter for details; your last activity was 8 days ago, with no reply since. Although you are assigned, the next step depends on the reporter. An open PR covers the issue, and it too is waiting on information, so there is nothing useful to do on the issue itself right now.
- **Next action:** Wait for the reporter to provide the requested client and reproduction details; the linked PR is also marked needs-info.

### 35. dart-lang/http#1841 → predicted 29, priority 0.08
- **Ground truth:** 
- **Model:** PR #2002 is explicitly linked as closing this issue and remains open, so the next step is on the PR rather than this issue. The issue is also labeled for the next breaking release, and it received a thumbs-down after the latest issue activity, with no significant newer activity directed at you.
- **Next action:** Wait for the open PR #2002 to be reviewed or merged; the issue itself is covered by that PR.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.68
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this Dart SDK issue, and a new, reproducible report from 24 days ago is information you should verify; the reporter also explicitly asks how to help. The issue is old, but this recent activity postdates your thumbs-down and makes it actionable again. It is a non-security P2, so it sits below urgent blockers and reviews.
- **Next action:** Reproduce the failure in current Dart and reply to filiph with a concrete investigation or debugging request.
