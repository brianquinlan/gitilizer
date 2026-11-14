# Gitilizer eval: v5c-gpt-6-luna

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5c.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030636

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.570 ± 0.048 |
| spearman | 0.717 ± 0.064 |
| pairwise_acc | 0.785 ± 0.024 |
| ndcg | 0.973 ± 0.008 |
| ndcg@5 | 0.967 ± 0.050 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.867 ± 0.115 |
| top10_overlap | 0.767 ± 0.058 |
| mean_abs_displacement | 5.352 ± 0.651 |

**1 item scoring(s) failed** — see results.json.

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.744 ± 0.042 | 0.994 ± 0.002 | 1.000 ± 0.000 | 1.458 ± 0.191 |
| B | 20 | 0.361 ± 0.116 | 0.898 ± 0.037 | 0.600 ± 0.000 | 4.533 ± 0.862 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 3/3 | dart-lang/sdk#48056 | A | Investigate whether Dart HttpClient on Android honors the eMudhra mitigations, and respond with the findings or file a focused security issue. |
| 2 | 2.0 (2) | +0.0 | 0.84 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo’s review question and update the PR to ensure the generated CHANGELOG.md is preserved on the next generate. |
| 3 | 4.3 (4–5) | +1.3 | 0.71 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm’s Pub/Sub release-polish PR, focusing on the attribution header and packaging changes. |
| 4 | 3.0 (3) | -1.0 | 0.73 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the first-time contributor’s PR in google-cloud-dart. |
| 5 | 6.7 (5–9) | +1.7 | 0.59 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply with feedback on the proposed nullable number/string representation and decide whether to proceed with the breaking API change. |
| 6 | 8.3 (6–11) | +2.3 | 0.57 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an async, breaking `Client.close` change and document the intended direction on the issue. |
| 7 | 7.3 (5–10) | +0.3 | 0.57 | 3/3 | dart-lang/http#1981 | B | Continue the implementation you started, then share a draft or update on the issue. |
| 8 | 8.3 (7–10) | +0.3 | 0.58 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether incremental JSON-array parsing is worth pursuing, then reply to kevmoo with the direction or a concrete follow-up. |
| 9 | 14.3 (13–16) | +5.3 | 0.47 | 3/3 | dart-lang/sdk#59846 | B | Investigate and fix the HTTP header-name validation in dart:io, or unassign yourself if you will not take it on. |
| 10 | 12.7 (12–14) | +2.7 | 0.51 | 2/3 | googleapis/google-cloud-dart#361 | A | Follow up with kevmoo on whether to pursue Discovery despite the larger API surface, or instead add polling convenience extensions to the existing proto-generated API. |
| 11 | 23.7 (21–29) | +12.7 ⚠️ | 0.12 | 0/3 | dart-lang/sdk#31275 | A | Wait for an SDK owner to take over or land the abandoned fix; no action has been requested from you. |
| 12 | 18.0 (16–20) | +6.0 | 0.22 | 0/3 | dart-lang/native#3752 | B | Continue the fix in PR #3763; the issue itself is covered by that open PR. |
| 13 | 13.0 (11–15) | +0.0 | 0.47 | 2/3 | googleapis/google-cloud-dart#366 | B | Decide whether to address dependency-version bumps manually or through librarian automation, then update the issue with the plan. |
| 14 | 20.0 (19–22) | +6.0 | 0.16 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team review; no personal review was requested. |
| 15 | 17.7 (17–19) | +2.7 | 0.21 | 0/3 | googleapis/google-cloud-dart#381 | A | Review and merge PR #382; this issue is covered by that open PR. |
| 16 | 24.0 (22–27) | +8.0 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 9.3 (7–11) | -7.7 | 0.57 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement or scope the remaining ServiceClient retry/RequestOptions and non-JSON error handling work in this assigned issue. |
| 18 | 26.7 (24–29) | +8.7 | 0.09 | 0/3 | dart-lang/http#2031 | A | Wait for the stacked prerequisite PRs to be reviewed and merged before reviewing this release-preparation PR. |
| 19 | 11.7 (9–14) | -7.3 | 0.56 | 3/3 | googleapis/google-cloud-dart#345 | A | Revise the draft to address the bot’s compile-time, test, and documentation feedback, then resolve the merge conflict and request review. |
| 20 | 28.0 (25–32) | +8.0 | 0.08 | 0/3 | dart-lang/core#1007 | B | Wait for the contributor to complete the CLA requirement; review the PR once it is unblocked. |
| 21 | 24.3 (22–26) | +3.3 | 0.11 | 0/3 | dart-lang/tools#2544 | B | Wait for Jonas to address lrhn’s review feedback; the PR is only requested from your shared dart-ecosystem-team, not you personally. |
| 22 | 21.7 (20–24) | -0.3 | 0.12 | 0/3 | dart-lang/tools#2710 | B | Wait for the stacked base PR #2563 to be reviewed; this PR is currently blocked behind it. |
| 23 | 25.0 (23–28) | +2.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there is no response after about a week. |
| 24 | 19.0 (15–25) | -5.0 | 0.24 | 2/3 | googleapis/google-cloud-dart#373 | B | Follow up with Natebosch for the pending review, or arrange another reviewer if Sigurdm’s review covers the remaining changes. |
| 25 | 27.3 (26–30) | +2.3 | 0.10 | 0/3 | dart-lang/http#579 | B | Wait for the breaking-release plan to be revisited; no action is needed on this PR while it remains labeled next-breaking-release. |
| 26 | 16.3 (4–36) | -9.7 ⚠️ | 0.10 | 2/2 | dart-lang/http#1932 | B | Review and merge your open fix PR #2034; then close this issue once the fix is confirmed. |
| 27 | 17.3 (16–18) | -9.7 ⚠️ | 0.23 | 0/3 | flutter/devtools#8223 | B | Wait for the DevTools maintainers or contributor to advance the feature; no direct action has been requested from you. |
| 28 | 33.7 (32–35) | +5.7 | 0.03 | 0/3 | dart-lang/http#1837 | A | Wait for a community contributor to take up the contributions-welcome issue; no follow-up is currently needed. |
| 29 | 35.7 (35–36) | +6.7 | 0.02 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or maintainer to merge it. |
| 30 | 34.0 (33–35) | +4.0 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action for now; the reporter or maintainer should confirm whether the slowdown is in http2 before this issue is closed. |
| 31 | 24.3 (20–30) | -6.7 | 0.11 | 0/3 | dart-lang/tools#2715 | B | Wait for the specifically requested reviewer, davidmorgan, to review the PR; the team request is not directed to you personally. |
| 32 | 31.0 (29–33) | -1.0 | 0.04 | 0/3 | dart-lang/http#2026 | A | Wait for the requested reviewer, mosuem, to review the PR. |
| 33 | 31.0 (30–32) | -2.0 | 0.06 | 0/3 | dart-lang/native#3653 | A | Wait for liamappelbe or the team to decide whether to pursue the trampoline or autorelease-pool approach. |
| 34 | 32.7 (31–34) | -1.3 | 0.04 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested details; the linked PR is also marked needs-info. |
| 35 | 23.7 (15–28) | -11.3 ⚠️ | 0.21 | 1/3 | dart-lang/http#1841 | B | Review PR #2002, which implements the proposed Retry-After support and covers this issue. |
| 36 | 9.0 (6–13) | -27.0 ⚠️ | 0.59 | 3/3 | dart-lang/sdk#38148 | B | Investigate the reproducible failure reported on Oct 1 and reply to filiph with a debugging or reproduction plan. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 2/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is assigned to you and now has fresh activity raising a potential security exposure involving compromised intermediate CA keys; the latest comment points to a related issue but does not establish that this one is resolved. Security concerns in code you own require prompt verification, even with the P3 label and the issue's age.
- **Next action:** Investigate whether Dart HttpClient on Android honors the eMudhra mitigations, and respond with the findings or file a focused security issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR in a repository where a close collaborator has left an unresolved review comment 21 hours ago, so the next step is yours and someone is waiting on your response. The comment identifies a concrete behavior that could undo the fix, making it more urgent than routine review work. The team review request is not the blocker now; respond to kevmoo and address the issue.
- **Next action:** Reply to kevmoo’s review question and update the PR to ensure the generated CHANGELOG.md is preserved on the next generate.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in a repository you are responsible for, so you are the default reviewer; no human has reviewed it yet (the only review is from a bot). The author is a close collaborator and the PR is recent, making this a timely review in the 0.65–0.8 range. The bot’s review discusses code in other files and does not count as a human review or create feedback for you to address.
- **Next action:** Review sigurdm’s Pub/Sub release-polish PR, focusing on the attribution header and packaging changes.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.73
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This repository is one you’re responsible for, so you are the default reviewer even though no one requested you personally. The PR is only three days old and has not received a human review; the bot review does not count. It is not a collaborator’s PR, so it falls below collaborator reviews waiting on you, but it is timely and actionable.
- **Next action:** Review the first-time contributor’s PR in google-cloud-dart.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.62
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your own issue in a repository you work in, and the contributor has just posted a concrete design proposal that needs your review. Your last comment invited a design or preliminary PR, so responding now keeps the agreed approach moving. It is six months old, so it is below the range for fresh planned work, but the new proposal is recent and makes the next step yours.
- **Next action:** Reply with feedback on the proposed nullable number/string representation and decide whether to proceed with the breaking API change.

### 6. dart-lang/http#2027 → predicted 8, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You opened this issue in a repository you work in just 9 days ago, so it is fresh planned work and there is no external dependency or blocker. The issue proposes a consequential API change, but no one has asked you to act and it is not a security or urgent production problem, so it sits in the middle of the fresh-planned-work range.
- **Next action:** Decide whether to pursue an async, breaking `Client.close` change and document the intended direction on the issue.

### 7. dart-lang/http#1981 → predicted 7, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is an issue in a repository you work in, it is assigned to you, and your comment 5 hours ago says you have started working on it. That makes it fresh planned work in the 0.5–0.65 range; the feature is useful but not an urgent security issue.
- **Next action:** Continue the implementation you started, then share a draft or update on the issue.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.57
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a fresh issue in a repository you work in, filed by a close collaborator, and your question received a reply 17 days ago; the discussion is now waiting on your judgment. The author explicitly says it is not urgent, so it is a moderate planned-work decision rather than an urgent fix. No PR covers this issue.
- **Next action:** Decide whether incremental JSON-array parsing is worth pursuing, then reply to kevmoo with the direction or a concrete follow-up.

### 9. dart-lang/sdk#59846 → predicted 16, priority 0.43
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this RFC-compliance bug in widely used SDK code, so it is yours to address or hand off. However, there has been no activity for about 22 months and no recent request or update to act on, which puts it near the bottom of the actionable assigned-work range.
- **Next action:** Investigate and fix the HTTP header-name validation in dart:io, or unassign yourself if you will not take it on.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.56
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is in a repository you work in, and kevmoo is a close collaborator who clarified the problem; your latest comment raised a design tradeoff that needs resolution. The next step is yours to advance the decision, but the discussion is 16 days old and no newer activity makes it urgent. It is fresh enough to merit attention, though less than an immediate blocker or a recently filed commitment.
- **Next action:** Follow up with kevmoo on whether to pursue Discovery despite the larger API surface, or instead add polling convenience extensions to the existing proto-generated API.

### 11. dart-lang/sdk#31275 → predicted 21, priority 0.15
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old issue in dart-lang/sdk, which is outside the repositories you own, and the proposed fix was tested but abandoned. You were only CC'd informationally, with the most recent such mention 2.5 years ago; no one has asked you to take a specific action. The reported production impact is notable, but the thread is dormant and the next step is for an SDK maintainer to drive the fix.
- **Next action:** Wait for an SDK owner to take over or land the abandoned fix; no action has been requested from you.

### 12. dart-lang/native#3752 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** You filed and assigned yourself this issue less than two weeks ago, so it would otherwise be fresh planned work. However, open PR #3763 already addresses it, making the PR—not the issue—the item to act on; the issue should rank below that PR.
- **Next action:** Continue the fix in PR #3763; the issue itself is covered by that open PR.

### 13. googleapis/google-cloud-dart#366 → predicted 13, priority 0.55
- **Ground truth:** 
- **Model:** This is in a repository you work in, was filed by close collaborator sigurdm, and describes concrete release requirements for Storage and Pub/Sub. Your last comment raised an unresolved design question about the general fix, so the next step is yours; however, activity is 17 days old and the immediate PRs mentioned are already merged, keeping this below urgent or blocking work.
- **Next action:** Decide whether to address dependency-version bumps manually or through librarian automation, then update the issue with the plan.

### 14. dart-lang/tools#2719 → predicted 22, priority 0.12
- **Ground truth:** 
- **Model:** This PR is in a repository you do not list as responsible for, and the review request is to a team you belong to rather than to you personally. It is fresh, but there is no human activity or direct request making it yours to act on now.
- **Next action:** Wait for the dart-ecosystem-team review; no personal review was requested.

### 15. googleapis/google-cloud-dart#381 → predicted 19, priority 0.22
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The open PR directly addresses the reported bug, so the work belongs on the PR rather than this issue. No new activity requires you to act on the issue itself; keep it low and prioritize the PR instead.
- **Next action:** Review and merge PR #382; this issue is covered by that open PR.

### 16. dart-lang/http#2034 → predicted 27, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR, and you requested a specific reviewer only two days ago, so the next step is currently theirs rather than yours. The review request is recent and there has been no subsequent activity; wait roughly a week before pinging.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 11, priority 0.56
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is your assigned issue in a repository you own, and the main remaining work is not blocked on anyone else. Your recent comment narrowed the scope, but it did not resolve the transport and HTML error-response gaps, so this remains fresh planned work. It is an important shared-library improvement, though there is no new request or immediate blocker warranting a higher priority.
- **Next action:** Implement or scope the remaining ServiceClient retry/RequestOptions and non-JSON error handling work in this assigned issue.

### 18. dart-lang/http#2031 → predicted 29, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were personally requested to review this PR, it is stacked on other open PRs that must land first; one prerequisite still has no review, and another also awaits your review. The stack blocks useful review of this small release-only change, and you noted that you are not responsible for the http2 area. The request is only three days old, but there is nothing actionable on this PR until the lower stack advances.
- **Next action:** Wait for the stacked prerequisite PRs to be reviewed and merged before reviewing this release-preparation PR.

### 19. googleapis/google-cloud-dart#345 → predicted 14, priority 0.55
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft PR in a repository you’re responsible for, and the review surfaced concrete issues that remain unaddressed. That makes it actionable planned work, but it is not currently blocking anyone and the last activity was 45 days ago, so it sits in the lower part of the 0.5–0.65 range.
- **Next action:** Revise the draft to address the bot’s compile-time, test, and documentation feedback, then resolve the merge conflict and request review.

### 20. dart-lang/core#1007 → predicted 25, priority 0.12
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a shared dart-ecosystem-team review request, not a personal request, and dart-lang/core is not a repository you are responsible for. The first-time contributor’s CLA check is currently blocking the PR, so there is no useful review action for you yet.
- **Next action:** Wait for the contributor to complete the CLA requirement; review the PR once it is unblocked.

### 21. dart-lang/tools#2544 → predicted 26, priority 0.12
- **Ground truth:** 
- **Model:** This is a security-related PR, but it is in dart-lang/tools, a repository you are not responsible for, and the review request is to a team you belong to rather than to you. The author is actively driving it, and the latest review feedback was two months ago with no subsequent response, so there is no current action for you; the security importance does not make a shared team request your review.
- **Next action:** Wait for Jonas to address lrhn’s review feedback; the PR is only requested from your shared dart-ecosystem-team, not you personally.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.12
- **Ground truth:** 
- **Model:** Although you belong to the requested review team and the author is a collaborator, this is a shared team request, not a personal review request, and the PR is stacked on draft PR #2563, which has not been reviewed. The stack blocker means there is no useful review action now; revisit after the base PR is ready and reviewed.
- **Next action:** Wait for the stacked base PR #2563 to be reviewed; this PR is currently blocked behind it.

### 23. dart-lang/native#3763 → predicted 28, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, but you requested review from liamappelbe just two days ago, so the next step is theirs rather than yours. It is not your repository by the stated ownership list, and there is no review feedback or other new activity requiring action from you. Reassess and ping the reviewer after roughly a week of silence.
- **Next action:** Wait for liamappelbe to review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 17, priority 0.30
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR in a repository you own, but you requested review and asked Sigurdm four days ago whether he had reviewed the non-Pub/Sub parts; the next step is currently with the reviewers. Since less than a week has passed, wait rather than pinging again now. Sigurdm’s approval covers the Pub/Sub portion, but the review decision is approved and the PR is behind, so clarify whether the remaining work needs review before taking further action.
- **Next action:** Follow up with Natebosch for the pending review, or arrange another reviewer if Sigurdm’s review covers the remaining changes.

### 25. dart-lang/http#579 → predicted 30, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR is explicitly blocked for a future breaking release, which keeps it in the low-priority range even though you are personally requested as reviewer. The recent status question is from 14 months ago and does not change that blocker; the PR has also been inactive for a long time.
- **Next action:** Wait for the breaking-release plan to be revisited; no action is needed on this PR while it remains labeled next-breaking-release.

### 26. dart-lang/http#1932 → predicted 9, priority 0.57
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You are assigned to this issue, but the open PR #2034 already covers the fix, so the PR—not this issue—is the work to act on. The recent request for an update does not make the issue independently actionable. Keep this below the PR, with some visibility because of the recent comment and the issue’s impact on Cronet builds.
- **Next action:** Review and merge your open fix PR #2034; then close this issue once the fix is confirmed.

### 27. flutter/devtools#8223 → predicted 18, priority 0.25
- **Ground truth:** 
- **Model:** This is a feature request in a repository you do not list as responsible for, and the only mention of you was an informational CC from 2024. The recent activity is an unrelated label change, so it does not create a new task for you; the high-cost label and age further reduce its urgency.
- **Next action:** Wait for the DevTools maintainers or contributor to advance the feature; no direct action has been requested from you.

### 28. dart-lang/http#1837 → predicted 32, priority 0.04
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a low-priority enhancement in dart-lang/http, where you are not responsible for the repository, and it is labeled contributions-welcome. You already explained that the Dart team is unlikely to implement it; nothing new has happened since your comment a year ago, and no one has asked you to act.
- **Next action:** Wait for a community contributor to take up the contributions-welcome issue; no follow-up is currently needed.

### 29. dart-lang/http#2033 → predicted 36, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You approved this PR two days ago, and there has been no author activity or new commits since. Your review is complete; there is nothing for you to do unless new changes or questions appear.
- **Next action:** Wait for the PR author or maintainer to merge it.

### 30. dart-lang/http#1365 → predicted 35, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is in the http2 area, which you explicitly noted is outside your responsibility, and you have not been mentioned or asked to act. The latest comment is eight months old and asks for confirmation, but the issue is stale and the thread itself suggests the reported cause may lie elsewhere.
- **Next action:** No action for now; the reporter or maintainer should confirm whether the slowdown is in http2 before this issue is closed.

### 31. dart-lang/tools#2715 → predicted 23, priority 0.12
- **Ground truth:** 
- **Model:** This PR is in a repository you do not list as responsible for, and your only request is via the shared dart-ecosystem-team. A specific reviewer was also requested, so the review is not yours to take by default. The request is only two days old; no follow-up is due yet.
- **Next action:** Wait for the specifically requested reviewer, davidmorgan, to review the PR; the team request is not directed to you personally.

### 32. dart-lang/http#2026 → predicted 33, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in the http2 area, which you noted is outside your responsibility, and the author has asked mosuem—not you—to review it. Recent activity is directed to that reviewer, so there is no action for you now.
- **Next action:** Wait for the requested reviewer, mosuem, to review the PR.

### 33. dart-lang/native#3653 → predicted 31, priority 0.08
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, and the latest discussion is the assignee weighing implementation options rather than asking you to act. The related PR has already been merged, and there has been no newer activity directed at you since your comments, so there is no current action for you.
- **Next action:** Wait for liamappelbe or the team to decide whether to pursue the trampoline or autorelease-pool approach.

### 34. dart-lang/http#1972 → predicted 34, priority 0.03
- **Ground truth:** 
- **Model:** This issue is explicitly blocked by the needs-info label, and you already asked the reporter for details without a reply. The linked open PR also covers the issue and is waiting on information, so there is no useful issue-level action for you now.
- **Next action:** Wait for the reporter to provide the requested details; the linked PR is also marked needs-info.

### 35. dart-lang/http#1841 → predicted 15, priority 0.46
- **Ground truth:** 
- **Model:** The issue is marked for a future breaking release, and an open PR now covers it, so the issue itself is not the place to do the work. The PR was updated recently and the contributor asked to work on the issue, but the PR is the actionable item. The post-thumbs-down activity does not change that, and this issue is outside your stated responsibility for dart-lang/http2 only insofar as that exclusion does not apply here; still, the duplicate-coverage rule keeps this issue in the low range.
- **Next action:** Review PR #2002, which implements the proposed Retry-After support and covers this issue.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.62
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this issue, and a recent report confirms the bug on the current SDK and offers help, so the next step is yours. This is not a security issue, and the issue is outside your listed repositories of responsibility; its age and the Aug 1 thumbs-down also limit its priority, but the post-thumbs-down reproducible report makes it worth reassessing.
- **Next action:** Investigate the reproducible failure reported on Oct 1 and reply to filiph with a debugging or reproduction plan.
