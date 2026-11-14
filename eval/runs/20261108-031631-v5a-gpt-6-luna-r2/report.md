# Gitilizer eval: v5a-gpt-6-luna-r2

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5a.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031631

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.573 ± 0.008 |
| spearman | 0.701 ± 0.017 |
| pairwise_acc | 0.786 ± 0.004 |
| ndcg | 0.962 ± 0.006 |
| ndcg@5 | 0.860 ± 0.049 |
| top3_overlap | 0.778 ± 0.192 |
| top5_overlap | 0.733 ± 0.115 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.352 ± 0.116 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.717 ± 0.067 | 0.993 ± 0.003 | 0.800 ± 0.000 | 1.583 ± 0.382 |
| B | 20 | 0.439 ± 0.043 | 0.836 ± 0.022 | 0.600 ± 0.000 | 4.300 ± 0.361 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Assess whether Dart/HttpClient on Android is affected by the reported eMudhra compromise and reply with findings or route the security concern to the appropriate owner. |
| 2 | 2.0 (2) | +0.0 | 0.84 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo’s review comment and update the PR to preserve the generated CHANGELOG.md across the next `librarian generate`. |
| 3 | 3.7 (3–4) | +0.7 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm’s PR, focusing on the client-attribution header and release-polish changes, and leave feedback or approve. |
| 4 | 4.7 (3–6) | +0.7 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the first-time contributor’s PR in googleapis/google-cloud-dart and provide feedback or approval. |
| 5 | 6.3 (6–7) | +1.3 | 0.62 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel with a decision on the proposed enum representation and clarify the design direction before they proceed. |
| 6 | 9.0 (9) | +3.0 | 0.58 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an async `Client.close` for the next breaking release, then document the intended semantics or propose a concrete change. |
| 7 | 7.7 (7–8) | +0.7 | 0.59 | 3/3 | dart-lang/http#1981 | B | Continue the implementation you said you started, and assess the API/design against the proposed trust-evaluation hook. |
| 8 | 12.0 (11–13) | +4.0 | 0.57 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether to take on the streaming JSON buffering change and error-frame handling, or ask kevmoo to clarify the expected server behavior. |
| 9 | 14.3 (14–15) | +5.3 | 0.53 | 3/3 | dart-lang/sdk#59846 | B | Investigate the HTTP header parser behavior and determine or implement a fix for invalid header-name characters. |
| 10 | 10.0 (8–11) | +0.0 | 0.58 | 3/3 | googleapis/google-cloud-dart#361 | A | Decide whether to pursue Discovery despite its larger API surface, and reply to kevmoo with your preferred approach or ask for a concrete comparison. |
| 11 | 28.0 (20–33) | +17.0 ⚠️ | 0.08 | 0/3 | dart-lang/sdk#31275 | A | Wait for someone responsible for dart-lang/sdk to take ownership of the abandoned fix; you were only CC’d and no direct request was made. |
| 12 | 17.7 (17–18) | +5.7 | 0.20 | 0/3 | dart-lang/native#3752 | B | Review and merge your open PR #3763, which already addresses this issue. |
| 13 | 16.7 (15–19) | +3.7 | 0.25 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the `google_cloud_rpc` version bump and the release/automation approach to be decided; then update the storage and Pub/Sub constraints and changelogs before publishing. |
| 14 | 19.3 (18–21) | +5.3 | 0.18 | 0/3 | dart-lang/tools#2719 | B | Wait for a member of the dart-ecosystem-team to review the PR. |
| 15 | 16.7 (16–17) | +1.7 | 0.21 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which covers this issue; the issue itself needs no separate action. |
| 16 | 23.3 (23–24) | +7.3 | 0.11 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 10.0 (10) | -7.0 | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the remaining ServiceClient retry/RequestOptions and non-JSON error handling changes, coordinating generated-client changes as needed. |
| 18 | 25.3 (23–27) | +7.3 | 0.11 | 0/3 | dart-lang/http#2031 | A | Wait for the lower stacked PRs to be reviewed and merged before reviewing this release-preparation PR. |
| 19 | 13.3 (13–14) | -5.7 | 0.55 | 3/3 | googleapis/google-cloud-dart#345 | A | Resolve the outstanding review comments, fix the merge conflict, and decide whether to continue this draft PR or close it. |
| 20 | 20.0 (19–21) | +0.0 | 0.17 | 0/3 | dart-lang/core#1007 | B | Wait for the contributor to complete the CLA requirement; review once the PR is unblocked. |
| 21 | 18.7 (5–29) | -2.3 | 0.31 | 1/3 | dart-lang/tools#2544 | B | Wait for the PR author to address lrhn’s review feedback; no personal review was requested, only the shared dart-ecosystem-team. |
| 22 | 23.7 (22–25) | +1.7 | 0.11 | 0/3 | dart-lang/tools#2710 | B | Wait for the lower stacked PR #2563 to be reviewed, then review this PR if it remains open. |
| 23 | 25.0 (24–26) | +2.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR; follow up if there has been no response after about a week. |
| 24 | 15.0 (7–26) | -9.0 ⚠️ | 0.42 | 2/3 | googleapis/google-cloud-dart#373 | B | Resolve the two outstanding review threads and update the PR; then wait for Nate to review or merge it. |
| 25 | 29.0 (28–30) | +4.0 | 0.09 | 0/3 | dart-lang/http#579 | B | Wait for the maintainers to decide whether this will be bundled into a future major release; the PR is explicitly labeled for a breaking release. |
| 26 | 11.3 (3–16) | -14.7 ⚠️ | 0.43 | 1/3 | dart-lang/http#1932 | B | Review and merge your open fix PR #2034, then update this issue with the resolution. |
| 27 | 28.3 (25–30) | +1.3 | 0.08 | 0/3 | flutter/devtools#8223 | B | Wait for the DevTools maintainers or the GSoC contributor to drive the design; no action is requested of you. |
| 28 | 35.3 (34–36) | +7.3 | 0.02 | 0/3 | dart-lang/http#1837 | A | Wait for the reporter or a community contributor to pursue the WinHTTP implementation. |
| 29 | 35.3 (35–36) | +6.3 | 0.02 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or maintainer to merge it; you have already approved it. |
| 30 | 28.7 (20–33) | -1.3 | 0.08 | 0/3 | dart-lang/http#1365 | A | Leave this issue for now; the reporter or maintainers should confirm whether the http2 package is responsible before it is closed. |
| 31 | 24.0 (21–29) | -7.0 | 0.11 | 0/3 | dart-lang/tools#2715 | B | Wait for the specifically requested reviewer, davidmorgan, to review; the team request is not a personal request to you. |
| 32 | 34.3 (34–35) | +2.3 | 0.02 | 0/3 | dart-lang/http#2026 | A | Wait for the requested reviewer, mosuem, to review the PR. |
| 33 | 30.3 (28–32) | -2.7 | 0.05 | 0/3 | dart-lang/native#3653 | A | Wait for the issue assignee to decide whether to pursue a trampoline or autorelease-pool approach. |
| 34 | 31.7 (31–32) | -2.3 | 0.04 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested details; the linked PR is also marked needs-info. |
| 35 | 27.3 (27–28) | -7.7 | 0.09 | 0/3 | dart-lang/http#1841 | B | Wait for PR #2002 to be reviewed; assess the issue again if the PR changes or someone asks you to act. |
| 36 | 7.0 (4–12) | -29.0 ⚠️ | 0.66 | 3/3 | dart-lang/sdk#38148 | B | Reproduce the reported failure on current macOS and coordinate with filiph on a minimal reproducer or investigation. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 2/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security-related issue in code you own, and it has new activity from three days ago raising a concrete concern about compromised intermediate CA keys. The issue is assigned to you, and the recent comment linking a related mitigation does not establish whether Dart is protected; verifying the impact and updating the reporter is important even if a fix may already exist.
- **Next action:** Assess whether Dart/HttpClient on Android is affected by the reported eMudhra compromise and reply with findings or route the security concern to the appropriate owner.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.84
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your open PR, and kevmoo left a new unresolved review question 21 hours ago that needs your response; the PR is blocked until you address it. The recent, substantive feedback makes this a high-priority item where your action can unblock review. The team review request is not the main driver—the new comment from your collaborator is.
- **Next action:** Reply to kevmoo’s review comment and update the PR to preserve the generated CHANGELOG.md across the next `librarian generate`.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in google-cloud-dart, a repository you are responsible for, and no human has reviewed it; the bot review does not satisfy the default-review expectation. The author is a usual collaborator, so a fresh review request from this collaborator is among your higher-priority actionable items. It was opened five days ago and has had no activity directed at you, so it is important but not an immediate blocker.
- **Next action:** Review sigurdm’s PR, focusing on the client-attribution header and release-polish changes, and leave feedback or approve.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.66
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open, unreviewed PR in a repository you are responsible for, so you are the default reviewer; the bot review does not count. It is recent and has a concrete correctness fix with tests, though it is not a security issue or from a usual collaborator.
- **Next action:** Review the first-time contributor’s PR in googleapis/google-cloud-dart and provide feedback or approval.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.62
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your own issue in a repository you work in, so it is fresh planned work despite being originally filed six months ago: new discussion changed what needs to happen, and the latest proposal arrived four days ago. The contributor is waiting for your design feedback, making the next step yours rather than implementation work you can defer. It is a non-security P2 bug, so it belongs in the planned-work range rather than the urgent review or security ranges.
- **Next action:** Reply to Yusufihsangorgel with a decision on the proposed enum representation and clarify the design direction before they proceed.

### 6. dart-lang/http#2027 → predicted 9, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is your own issue, filed nine days ago in a repository you work in, with no one else blocking the next step; it qualifies as fresh planned work. There is no new activity, so its priority is moderate rather than elevated for a response or review. The proposed API change could affect widely used package behavior, but the immediate work is to settle the direction and scope.
- **Next action:** Decide whether to pursue an async `Client.close` for the next breaking release, then document the intended semantics or propose a concrete change.

### 7. dart-lang/http#1981 → predicted 8, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is assigned to you in dart-lang/http, an area you work in, and your recent comment says you have started working on it, making it your planned work. Your own activity was only five hours ago, so it is fresh; the reporter's offer to contribute does not currently block your next step.
- **Next action:** Continue the implementation you said you started, and assess the API/design against the proposed trust-evaluation hook.

### 8. googleapis/google-cloud-dart#360 → predicted 13, priority 0.56
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is in a repository you own, was filed by a close collaborator, and the issue describes concrete work you could take on. Your question received a reply 17 days ago, so the discussion is no longer fresh, and kevmoo says it is not urgent. Still, no PR or blocker is present, so it remains actionable planned work rather than something waiting on someone else.
- **Next action:** Decide whether to take on the streaming JSON buffering change and error-frame handling, or ask kevmoo to clarify the expected server behavior.

### 9. dart-lang/sdk#59846 → predicted 15, priority 0.52
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned this bug in Dart SDK’s HTTP I/O code, so the next step is yours. The issue has had no activity for about 22 months, which lowers its priority within the assigned-work range; its protocol-compliance and proxy-interoperability impact keep it from being negligible.
- **Next action:** Investigate the HTTP header parser behavior and determine or implement a fix for invalid header-name characters.

### 10. googleapis/google-cloud-dart#361 → predicted 11, priority 0.58
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a recent issue in a repository you work in, filed by close collaborator kevmoo, and it has a clear design decision for you to make. Your latest comment raised the tradeoff, and kevmoo’s response clarifies the benefit but does not resolve your concern; the next step is yours to steer the implementation. Activity is 16 days old, so it is still planned work but less fresh than a newly active discussion.
- **Next action:** Decide whether to pursue Discovery despite its larger API surface, and reply to kevmoo with your preferred approach or ask for a concrete comparison.

### 11. dart-lang/sdk#31275 → predicted 20, priority 0.16
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** The issue describes a production-impacting HttpClient bug and a collaborator has expressed interest, but dart-lang/sdk is not among your repositories of responsibility and you were mentioned only informationally. The last activity was 20 months ago, so there is no fresh request or change that makes this yours to act on. The proposed fix was tested but remains abandoned, leaving the next step with an SDK owner.
- **Next action:** Wait for someone responsible for dart-lang/sdk to take ownership of the abandoned fix; you were only CC’d and no direct request was made.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** This is your recently filed and assigned issue, but the linked open PR covers it, so the PR is the item to act on rather than the issue. No new activity on the issue itself has changed what you should do; keep it below the PR.
- **Next action:** Review and merge your open PR #3763, which already addresses this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 19, priority 0.18
- **Ground truth:** 
- **Model:** This is in a repository you work in and was filed by a close collaborator, but the stated fixes depend on a future `google_cloud_rpc` version bump, so you cannot complete them yet. You last commented 17 days ago asking about the general fix, and there has been no newer activity; for now it is blocked rather than fresh actionable work.
- **Next action:** Wait for the `google_cloud_rpc` version bump and the release/automation approach to be decided; then update the storage and Pub/Sub constraints and changelogs before publishing.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.18
- **Ground truth:** 
- **Model:** This is a review request to a team you belong to, not a personal request, and you are not responsible for dart-lang/tools. The PR was opened less than a day ago and has no human activity; the next step is with the team, so no action is needed from you now.
- **Next action:** Wait for a member of the dart-ecosystem-team to review the PR.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.22
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue is in a repository you watch, but you were not asked to act and have no ownership or direct involvement indicated. An open PR explicitly fixes it, so the PR is the work item and this issue should remain below it. The report is recent, but that does not make the duplicate issue actionable.
- **Next action:** Review PR #382, which covers this issue; the issue itself needs no separate action.

### 16. dart-lang/http#2034 → predicted 23, priority 0.12
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR, and you requested a specific reviewer only two days ago, so the next step is theirs rather than yours. The PR is fresh, but it has had no review activity since your request; it belongs in the low range for a PR awaiting a recently requested reviewer.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 10, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is assigned to you in a repository you own, and the collaborator’s issue has a clear implementation path. Your last comment was 10 days ago and nothing new is waiting on someone else, so this remains your planned work, though it is not within the two-week fresh-work window. The AIP-4222/AIP-155 scope was removed; focus on the remaining transport and exception-handling work.
- **Next action:** Implement the remaining ServiceClient retry/RequestOptions and non-JSON error handling changes, coordinating generated-client changes as needed.

### 18. dart-lang/http#2031 → predicted 27, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were personally requested to review this PR, it is stacked on PR #2014, which has not yet been reviewed, so the lower PR needs attention first. You also noted that you are not responsible for the http2 area; the recent request does not override the stack dependency.
- **Next action:** Wait for the lower stacked PRs to be reviewed and merged before reviewing this release-preparation PR.

### 19. googleapis/google-cloud-dart#345 → predicted 14, priority 0.55
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your PR in a repository you work in, and the unresolved feedback and dirty merge state leave concrete work on your side. It is a draft and has been untouched for 45 days, so it is less urgent than fresh commitments, but the open review findings should be addressed before it can move forward.
- **Next action:** Resolve the outstanding review comments, fix the merge conflict, and decide whether to continue this draft PR or close it.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request, not a personal request, and you are not responsible for dart-lang/core, so it is low priority. The PR is also blocked by the outstanding CLA check, leaving no useful review action right now.
- **Next action:** Wait for the contributor to complete the CLA requirement; review once the PR is unblocked.

### 21. dart-lang/tools#2544 → predicted 29, priority 0.08
- **Ground truth:** 
- **Model:** This is a security-mitigation PR, but it is in dart-lang/tools, where you are not responsible, and the review request was to a team you belong to rather than to you personally. The latest activity is lrhn’s review feedback from two months ago, so the author is the next person who needs to act; the PR is not currently waiting on you.
- **Next action:** Wait for the PR author to address lrhn’s review feedback; no personal review was requested, only the shared dart-ecosystem-team.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.12
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft and has not had a human review; the lower PR needs attention first. The request is to the dart-ecosystem-team rather than to you personally, and dart-lang/tools is not among the repositories you own, so it is not an individual review request. The recent bot feedback has already been addressed by the author, and there is no new work for you now.
- **Next action:** Wait for the lower stacked PR #2563 to be reviewed, then review this PR if it remains open.

### 23. dart-lang/native#3763 → predicted 26, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, and you requested a review from a named reviewer two days ago. The next step is currently theirs, so there is little for you to do until they respond or roughly a week passes. The PR is recent, but that freshness does not make it actionable while you are waiting on the reviewer.
- **Next action:** Wait for liamappelbe to review the PR; follow up if there has been no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 7, priority 0.60
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your own recent PR in a repository you work in, and its related issue #359 is assigned to you, so it remains planned work. Sigurd has approved and you asked him four days ago to assess the non-Pub/Sub changes, while Nate is the assigned reviewer; that request makes review partly pending, but the unresolved threads and mergeable state being behind leave useful work on your side. Recent activity keeps it visible, though the large PR and outstanding review dependency put it below urgent feedback that is blocking someone.
- **Next action:** Resolve the two outstanding review threads and update the PR; then wait for Nate to review or merge it.

### 25. dart-lang/http#579 → predicted 30, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The `next-breaking-release` label blocks progress, and the PR has been dormant for 14 months; a recent question from another commenter does not make the next step yours. You previously said you lacked bandwidth to coordinate a major release, so this remains low-priority blocked work rather than a review you should take on now.
- **Next action:** Wait for the maintainers to decide whether this will be bundled into a future major release; the PR is explicitly labeled for a breaking release.

### 26. dart-lang/http#1932 → predicted 3, priority 0.76
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You own this issue, and the recent report asking for an update makes the status worth checking. The linked open PR #2034 is your proposed fix, so the concrete next step is to move that PR forward rather than work the issue separately. This is an important build-breaking bug, but the issue itself should rank below the PR covering it.
- **Next action:** Review and merge your open fix PR #2034, then update this issue with the resolution.

### 27. flutter/devtools#8223 → predicted 25, priority 0.12
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, outside your stated areas of responsibility, and you were only informationally CC'd on an old comment. The recent label change was not directed at you, and the newer design question was addressed to bkonyi, not you. Despite the recent update and reactions, this remains peripheral backlog work for you.
- **Next action:** Wait for the DevTools maintainers or the GSoC contributor to drive the design; no action is requested of you.

### 28. dart-lang/http#1837 → predicted 34, priority 0.03
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old contributions-welcome enhancement in dart-lang/http, which you are not responsible for, and nobody has asked you to take it on. You already replied that it is unlikely to be Dart team work and suggested a community path; there has been no activity since your reply, so there is nothing for you to do now.
- **Next action:** Wait for the reporter or a community contributor to pursue the WinHTTP implementation.

### 29. dart-lang/http#2033 → predicted 36, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** This PR is in dart-lang/http, an area you are responsible for, and you were personally asked to review, but you approved it two days ago with no subsequent author activity. There are no unresolved threads or new changes for you to address, so it is waiting on someone else and needs no action now.
- **Next action:** Wait for the PR author or maintainer to merge it; you have already approved it.

### 30. dart-lang/http#1365 → predicted 33, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is in the http2 area, which you noted is outside your responsibility, and nobody has asked you to act. The latest comment is a question to the reporter/maintainers, not to you; the issue has also been dormant for eight months. The historical performance concern and reactions do not make this actionable for you.
- **Next action:** Leave this issue for now; the reporter or maintainers should confirm whether the http2 package is responsible before it is closed.

### 31. dart-lang/tools#2715 → predicted 22, priority 0.12
- **Ground truth:** 
- **Model:** This PR is in a repository you are not responsible for, and you were requested only through the shared dart-ecosystem-team review; davidmorgan was also personally requested. The PR is only two days old, so there is no reason to follow up yet. The author is a collaborator, but that does not make this review yours to do.
- **Next action:** Wait for the specifically requested reviewer, davidmorgan, to review; the team request is not a personal request to you.

### 32. dart-lang/http#2026 → predicted 35, priority 0.02
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR changes the http2 package, which you explicitly noted is outside your responsibility, and the author has directly asked mosuem—not you—for review. The recent update is directed to that reviewer, so there is no action for you now.
- **Next action:** Wait for the requested reviewer, mosuem, to review the PR.

### 33. dart-lang/native#3653 → predicted 31, priority 0.04
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This is in dart-lang/native, outside the repositories you own, and you are only a commenter/mention; the direct thanks was from 39 days ago and there is no current request for you. The proposed change is also technically unsettled, with the assignee concluding 34 days ago that a broader approach may not be worth it. No action is currently yours.
- **Next action:** Wait for the issue assignee to decide whether to pursue a trampoline or autorelease-pool approach.

### 34. dart-lang/http#1972 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** The issue is labeled needs-info, and you last asked the reporter for clarification 8 days ago with no reply, so there is nothing useful to do until they respond. The open PR covers this issue and is itself waiting for information, making the issue a duplicate to monitor rather than act on.
- **Next action:** Wait for the reporter to provide the requested details; the linked PR is also marked needs-info.

### 35. dart-lang/http#1841 → predicted 28, priority 0.08
- **Ground truth:** 
- **Model:** This issue is explicitly deferred to a future breaking release, so there is no work to do on it now. PR #2002 is open and covers the requested change, and the author has taken it forward; the issue itself is therefore a duplicate to track below the PR. The mention and related commits are from before your October 5 thumbs-down, so they do not renew its priority.
- **Next action:** Wait for PR #2002 to be reviewed; assess the issue again if the PR changes or someone asks you to act.

### 36. dart-lang/sdk#38148 → predicted 12, priority 0.58
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this SDK issue, and a fresh report from a user confirms it still reproduces on the current stable SDK and asks how to help. That new information makes checking the issue your next step, despite the long period of inactivity and your thumbs-down predating the report. It is a P2 non-security bug, so it merits attention but ranks below urgent reviews or blocking work.
- **Next action:** Reproduce the reported failure on current macOS and coordinate with filiph on a minimal reproducer or investigation.
