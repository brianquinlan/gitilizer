# Gitilizer eval: rank25-ground_truth-gemini-low

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk6smifvq1n8sesn8rb/evalwork/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261122-231425

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.666 ± 0.022 |
| spearman | 0.784 ± 0.023 |
| pairwise_acc | 0.833 ± 0.011 |
| ndcg | 0.980 ± 0.003 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.389 ± 0.147 |

## Next steps (mean ± sd across trials)

Against the next step the eval set records for 36 items (PRD RANK-24). "Same side" counts a next step on the other side of "on me" as wrong, and any other as right.

| metric | value |
|---|---|
| exact | 0.861 ± 0.000 |
| same side | 0.917 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.463 ± 0.042 | 0.937 ± 0.019 | 0.467 ± 0.115 | 3.967 ± 0.058 |

## Per item

| truth | predicted (mean, range) | Δ | priority | next step (expected) | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | respond (todo) ⚠️ | dart-lang/sdk#48056 | A | Evaluate the reported eMudhra CA compromise impact on Android certificate revocation in dart:io and reply. |
| 2 | 2.0 (2) | +0.0 | 0.84 | respond | googleapis/librarian#7808 | A | Reply to kevmoo's question regarding CHANGELOG.md retention and update the PR if needed. |
| 3 | 3.0 (3) | +0.0 | 0.75 | review | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR adding client attribution headers and pre-release polish. |
| 4 | 4.0 (4) | +0.0 | 0.70 | review | googleapis/google-cloud-dart#382 | A | Review this PR fixing RPC status code handling for REST errors |
| 5 | 5.0 (5) | +0.0 | 0.68 | respond | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's proposed design sketch for the ProtoEnum representation. |
| 6 | 9.3 (8–10) | +3.3 | 0.53 | todo | dart-lang/http#2027 | B | Decide on the API design for Client.close and plan implementation or discussion with collaborators. |
| 7 | 6.3 (6–7) | -0.7 | 0.60 | todo | dart-lang/http#1981 | B | Work on adding the server trust evaluation hook for CupertinoClient as planned. |
| 8 | 11.0 (11) | +3.0 | 0.52 | todo | googleapis/google-cloud-dart#360 | A | Decide on next steps for handling mid-stream errors and incremental JSON streaming in google_cloud_rpc. |
| 9 | 12.0 (12) | +3.0 | 0.47 | backlog | dart-lang/sdk#59846 | B | Fix invalid character validation in dart:io HTTP header parser or reassign if not working on it. |
| 10 | 13.7 (13–14) | +3.7 | 0.40 | waiting | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to reply regarding whether to switch to discovery or add convenience extensions. |
| 11 | 14.7 (14–15) | +3.7 | 0.40 | backlog (not_yours) ⚠️ | dart-lang/sdk#31275 | A | Investigate resurrecting the abandoned CL to fix the uncatchable HttpException in dart:io HttpClient. |
| 12 | 18.7 (18–19) | +6.7 | 0.22 | elsewhere | dart-lang/native#3752 | B | Follow up on PR dart-lang/native#3763 which fixes this issue. |
| 13 | 9.0 (8–10) | -4.0 | 0.55 | todo | googleapis/google-cloud-dart#366 | B | Decide on the fix approach and update the package dependencies in google_cloud_storage and google_cloud_pubsub. |
| 14 | 18.0 (17–19) | +4.0 | 0.20 | not_yours | dart-lang/tools#2719 | B | None; team review request in a repository I am not responsible for. |
| 15 | 16.0 (16) | +1.0 | 0.25 | elsewhere | googleapis/google-cloud-dart#381 | A | Review PR #382 which addresses this issue. |
| 16 | 22.0 (21–23) | +6.0 | 0.10 | waiting | dart-lang/http#2034 | B | Waiting on review from goderbauer. |
| 17 | 8.0 (7–9) | -9.0 ⚠️ | 0.55 | todo (elsewhere) ⚠️ | googleapis/google-cloud-dart#359 | B | Implement RetryRunner wiring and RequestOptions in ServiceClient. |
| 18 | 25.0 (24–26) | +7.0 | 0.09 | elsewhere | dart-lang/http#2031 | A | Review #2014 first before reviewing this release PR. |
| 19 | 20.7 (20–21) | +1.7 | 0.20 | todo | googleapis/google-cloud-dart#345 | A | Resume work on this draft PR or decide to close it. |
| 20 | 25.3 (20–29) | +5.3 | 0.10 | not_yours | dart-lang/core#1007 | B | None, as dart-lang/core is not in my repositories and dart-ecosystem-team has no review note. |
| 21 | 29.7 (28–31) | +8.7 | 0.05 | not_yours | dart-lang/tools#2544 | B | None; this security PR is in dart-lang/tools where lrhn is actively conducting the review for jonasfj. |
| 22 | 24.0 (23–25) | +2.0 | 0.10 | elsewhere (not_yours) ⚠️ | dart-lang/tools#2710 | B | Wait for the base PR #2563 to be reviewed and merged first. |
| 23 | 23.0 (22–24) | +0.0 | 0.10 | waiting | dart-lang/native#3763 | A | Waiting on liamappelbe to review the pull request. |
| 24 | 13.7 (13–15) | -10.3 ⚠️ | 0.39 | waiting | googleapis/google-cloud-dart#373 | B | Waiting on sigurdm's reply on whether he reviewed the full PR and if it's safe to merge without natebosch. |
| 25 | 28.3 (27–30) | +3.3 | 0.07 | waiting (backlog) ⚠️ | dart-lang/http#579 | B | Wait for a coordinated major semver release before reviewing or landing this breaking change. |
| 26 | 17.3 (17–18) | -8.7 | 0.23 | elsewhere | dart-lang/http#1932 | B | Follow up on PR dart-lang/http#2034 which resolves this issue. |
| 27 | 30.7 (30–31) | +3.7 | 0.03 | not_yours | flutter/devtools#8223 | B | None; this is an issue in flutter/devtools where I was only CC'd for informational context. |
| 28 | 26.0 (25–27) | -2.0 | 0.08 | backlog | dart-lang/http#1837 | A | Leave in backlog for community contributions unless someone volunteers to implement WinHTTP support. |
| 29 | 33.3 (33–34) | +4.3 | 0.00 | not_yours | dart-lang/http#2033 | A | Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | not_yours | dart-lang/http#1365 | A | None, as I am not responsible for package:http2. |
| 31 | 27.7 (26–29) | -3.3 | 0.05 | not_yours | dart-lang/tools#2715 | B | None, as davidmorgan is explicitly requested and I am not responsible for dart-lang/tools. |
| 32 | 32.3 (32–33) | +0.3 | 0.00 | not_yours | dart-lang/http#2026 | A | None; http2 is outside my scope and the PR is specifically directed to mosuem. |
| 33 | 35.0 (35) | +2.0 | 0.00 | not_yours | dart-lang/native#3653 | A | None; liamappelbe owns this issue and is discussing potential VM/FFI approaches with mraleph. |
| 34 | 27.7 (22–32) | -6.3 | 0.10 | elsewhere | dart-lang/http#1972 | B | Look at PR #1974 instead, though both are currently waiting on info. |
| 35 | 29.3 (20–34) | -5.7 | 0.07 | elsewhere | dart-lang/http#1841 | B | Act on PR #2002 instead, which implements this enhancement. |
| 36 | 7.3 (6–9) | -28.7 ⚠️ | 0.61 | respond | dart-lang/sdk#38148 | B | Reply to filiph's offer to help reproduce the macOS Directory.deleteSync failure and either investigate or unassign myself. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an issue I created and am assigned regarding CA certificate trust handling in dart:io, which directly impacts security. New activity 3 days ago highlights an active security incident involving compromised intermediate CA keys and questions whether Dart on Android honors OS certificate revocations. Security issues I own with new activity take top priority, regardless of the issue's age or P3 label.
- **Next action:** Evaluate the reported eMudhra CA compromise impact on Android certificate revocation in dart:io and reply.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.82
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and my collaborator kevmoo left an inline question/review comment pointing out a potential bug with CHANGELOG.md being cleaned. My own work is stalled until I answer and address his feedback. Because I am blocking progress on my own PR, this requires high priority.
- **Next action:** Reply to kevmoo's question regarding CHANGELOG.md retention and update the PR if needed.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I am responsible for, authored by my close collaborator sigurdm. As the default reviewer for this repository, reviewing PRs from collaborators before release is a high priority (0.65-0.8 range). Only bot reviews have been posted so far, so human review is waiting on me.
- **Next action:** Review sigurdm's PR adding client attribution headers and pre-release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** I am responsible for googleapis/google-cloud-dart, making me the default reviewer for PRs in this repository. This PR fixes an issue where retryable errors were not being retried over REST, and nobody has reviewed it yet (bots don't count). Since the author is a first-time contributor rather than a close collaborator, it falls in the standard review priority range of 0.65-0.75.
- **Next action:** Review this PR fixing RPC status code handling for REST errors

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I originally filed in a repository I maintain, and an external contributor is actively preparing a solution. They followed my advice to propose a preliminary design before writing code, so they are waiting on my feedback to proceed. Responding keeps an active contributor moving forward on a notable architecture change.
- **Next action:** Reply to Yusufihsangorgel's proposed design sketch for the ProtoEnum representation.

### 6. dart-lang/http#2027 → predicted 10, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in dart-lang/http, a repository you are responsible for, regarding a key API design choice. It represents your own planned work and thinking on Client.close semantics. Since it is still relatively fresh (about 9 days old) and has no external blockers, it sits moderately on your to-do list.
- **Next action:** Decide on the API design for Client.close and plan implementation or discussion with collaborators.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself to this issue and commented 5 hours ago stating that I have started working on it. This is active, planned work in a repository I maintain, making it mine to drive forward.
- **Next action:** Work on adding the server trust evaluation hook for CupertinoClient as planned.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in a repository I am responsible for (googleapis/google-cloud-dart) and was filed by a close collaborator (kevmoo). Kevmoo responded to my question indicating that while it is not urgent, it is an identified hole in streaming error and response handling. Because there is no PR open and no one else is currently driving it, it belongs in my planned work backlog.
- **Next action:** Decide on next steps for handling mid-stream errors and incremental JSON streaming in google_cloud_rpc.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.45
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue in dart-lang/sdk regarding HTTP header parsing in dart:io, which relates to your networking expertise. However, it has been dormant for almost two years (22 months) without recent activity or comments. While HTTP header validation can touch on proxy interoperability or request smuggling concerns, it has languished in the backlog and should be addressed or reassigned.
- **Next action:** Fix invalid character validation in dart:io HTTP header parser or reassign if not working on it.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in google-cloud-dart filed by close collaborator kevmoo. I asked an architectural question 16 days ago about API surface tradeoffs and alternative solutions, and he has not yet replied. It is currently waiting on his response, but remains on my radar since it is in my repository.
- **Next action:** Waiting on kevmoo to reply regarding whether to switch to discovery or add convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an issue in dart-lang/sdk where I was CC'd as the owner of dart:io, and my collaborator kevmoo also pinged me wanting it resolved. However, there has been no direct demand or recent activity (the last comment was over two years ago), so it sits as an important but non-pressing backlog item.
- **Next action:** Investigate resurrecting the abandoned CL to fix the uncatchable HttpException in dart:io HttpClient.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** You opened this issue and already have an open PR (dart-lang/native#3763) that fixes it. Because an active PR exists, there is no work directly needed on the issue itself. Per instructions, issues covered by an open PR should be ranked low in the 0.15–0.35 range.
- **Next action:** Follow up on PR dart-lang/native#3763 which fixes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 8, priority 0.55
- **Ground truth:** 
- **Model:** This issue is in a repository I am responsible for (googleapis/google-cloud-dart) and was filed by a close collaborator (sigurdm). I left the last comment indicating I was considering how to address this generally, making the next move mine to resolve or implement the dependency update. Since there hasn't been activity in 17 days, it fits into my planned work/assigned backlog for this repository.
- **Next action:** Decide on the fix approach and update the package dependencies in google_cloud_storage and google_cloud_pubsub.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not a repository I am responsible for. The review request is to the dart-ecosystem-team without any specific note indicating I take reviews for this team or repository. As an automated dependency update with only a team request, it is low priority for me.
- **Next action:** None; team review request in a repository I am not responsible for.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is covered by an active pull request (#382) created by the same author to fix the problem. Following the deduplication guidelines, the action belongs on the PR rather than the issue. As an issue with an open PR in a repository I own, it stays in the low 0.15–0.35 priority range.
- **Next action:** Review PR #382 which addresses this issue.

### 16. dart-lang/http#2034 → predicted 21, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR in dart-lang/http, which you requested a review on 2 days ago from goderbauer. Since roughly a week has not passed, there is no need to ping yet. It remains low priority while waiting on initial reviewer feedback.
- **Next action:** Waiting on review from goderbauer.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue filed by collaborator kevmoo in a repository I own. I assigned myself to it and scoped out the work 10 days ago, making it an active planned work item for me to implement.
- **Next action:** Implement RetryRunner wiring and RequestOptions in ServiceClient.

### 18. dart-lang/http#2031 → predicted 24, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release PR is stacked on earlier PRs in the stack, including #2014 which is still open and unreviewed. In addition, I have noted that I am not responsible for package:http2 in dart-lang/http, so lower PRs take precedence even when personally requested by a collaborator.
- **Next action:** Review #2014 first before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding DNS support to google-cloud-dart, converted to draft 45 days ago and currently in conflict (dirty mergeable state). No human reviewers are waiting on it, and it only has automated feedback. As an aging personal draft, it belongs in the low priority range to finish or abandon when convenient.
- **Next action:** Resume work on this draft PR or decide to close it.

### 20. dart-lang/core#1007 → predicted 27, priority 0.05
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not a repository I am responsible for. The review request is only to the general dart-ecosystem-team without any special review note indicating I own its reviews. Furthermore, the author is a first-time contributor whose CLA check is failing, so there is nothing for me to act on.
- **Next action:** None, as dart-lang/core is not in my repositories and dart-ecosystem-team has no review note.

### 21. dart-lang/tools#2544 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** Although this addresses a security issue (UNC path injection), it is located in dart-lang/tools, a repository I am not responsible for. Review was requested from the broad dart-ecosystem-team with no specific note for me, and lrhn is actively driving the review and waiting on jonasfj to address feedback. There is nothing required of me here.
- **Next action:** None; this security PR is in dart-lang/tools where lrhn is actively conducting the review for jonasfj.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on PR #2563, which is still a draft and has not been reviewed yet. Stacked PRs waiting on lower unreviewed PRs are low priority until the base PR lands or receives review. Additionally, the review request is to the team dart-ecosystem-team rather than to me directly.
- **Next action:** Wait for the base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 22, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, which I opened and requested a review from liamappelbe 2 days ago. Since less than a week has passed without a response, there is no need to ping yet. Per guidelines, my PRs recently sent for review sit around 0.1.
- **Next action:** Waiting on liamappelbe to review the pull request.

### 24. googleapis/google-cloud-dart#373 → predicted 13, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repository I am responsible for. I recently asked collaborator @sigurdm if he reviewed the non-PubSub parts so we can merge without waiting on natebosch. Since I am waiting on his answer from 4 days ago, this sits in the waiting range for close collaborators in my repository.
- **Next action:** Waiting on sigurdm's reply on whether he reviewed the full PR and if it's safe to merge without natebosch.

### 25. dart-lang/http#579 → predicted 30, priority 0.05
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is explicitly tagged 'next-breaking-release'. I explicitly noted two years ago that this cannot land until an semver major release and that I lack the bandwidth to coordinate that now, placing it cleanly in the category of PRs waiting for a future breaking release (0.05–0.15).
- **Next action:** Wait for a coordinated major semver release before reviewing or landing this breaking change.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is an active open PR (#2034) authored by me that fixes this issue, so the PR is the primary place to act. Because duplicate issues with open PRs should be ranked below the PR and kept in the 0.15-0.35 range, this issue itself requires no direct action right now.
- **Next action:** Follow up on PR dart-lang/http#2034 which resolves this issue.

### 27. flutter/devtools#8223 → predicted 31, priority 0.02
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, a repository I am not responsible for. I was only mentioned as an informational CC over two years ago by bkonyi regarding HTTP profiling, with no questions or tasks directed at me. There is nothing for me to do here.
- **Next action:** None; this is an issue in flutter/devtools where I was only CC'd for informational context.

### 28. dart-lang/http#1837 → predicted 25, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old low-priority enhancement request labeled 'contributions-welcome' and 'P3' where you explicitly indicated the team is unlikely to take it on. There has been no activity for a year and nobody is waiting on you. It remains in the repository backlog for future community contributions.
- **Next action:** Leave in backlog for community contributions unless someone volunteers to implement WinHTTP support.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already approved this PR two days ago, and there have been no new commits or comments since. It is completely done from my perspective and is waiting on the author to merge.
- **Next action:** Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is explicitly labeled 'package:http2' and concerns http2 performance. My notes state that I am not responsible for http2 in dart-lang/http, and nobody has asked me to take action.
- **Next action:** None, as I am not responsible for package:http2.

### 31. dart-lang/tools#2715 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for, and my team (dart-ecosystem-team) was requested without any special note indicating I handle reviews for it. Furthermore, davidmorgan is explicitly named as an individual reviewer. Therefore, this does not require my attention.
- **Next action:** None, as davidmorgan is explicitly requested and I am not responsible for dart-lang/tools.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** My profile explicitly notes that I am not responsible for http2 in dart-lang/http. Additionally, the author has explicitly reached out to mosuem for review, meaning there is nothing for me to do.
- **Next action:** None; http2 is outside my scope and the PR is specifically directed to mosuem.

### 33. dart-lang/native#3653 → predicted 35, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and actively driven by liamappelbe. I previously participated as a commenter with some experimental findings, but no questions or actions are directed at me. There is nothing for me to do here.
- **Next action:** None; liamappelbe owns this issue and is discussing potential VM/FFI approaches with mraleph.

### 34. dart-lang/http#1972 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** There is an open pull request (PR #1974) linked to fix this issue. Furthermore, this issue is labeled 'needs-info' and is waiting on a reply from the reporter to questions asked 8 days ago. Therefore, action should happen on PR #1974 rather than here, and the issue itself requires no current work.
- **Next action:** Look at PR #1974 instead, though both are currently waiting on info.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** There is an open pull request (#2002) addressing this enhancement, meaning any action belongs on the PR rather than this issue. Furthermore, this item was marked with a thumbs-down on 2026-10-05 and nothing new directed to me has occurred since. Consequently, the priority is reduced to 0.0.
- **Next action:** Act on PR #2002 instead, which implements this enhancement.

### 36. dart-lang/sdk#38148 → predicted 9, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am assigned to this P2 issue in the Dart SDK, and filiph offered a reproducible case and assistance on macOS after my thumbs-down timestamp. Because new, actionable information arrived on an issue assigned to me, it warrants re-evaluation and a response rather than remaining dormant. However, dart-lang/sdk is not one of my core repositories, keeping it in the moderate 0.5-0.65 range.
- **Next action:** Reply to filiph's offer to help reproduce the macOS Directory.deleteSync failure and either investigate or unassign myself.
