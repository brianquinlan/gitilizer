# Gitilizer eval: v5b-gpt-6-luna

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5b.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030422

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.611 ± 0.017 |
| spearman | 0.755 ± 0.025 |
| pairwise_acc | 0.805 ± 0.009 |
| ndcg | 0.978 ± 0.006 |
| ndcg@5 | 0.954 ± 0.063 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.767 ± 0.058 |
| mean_abs_displacement | 5.000 ± 0.255 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.783 ± 0.044 | 0.995 ± 0.002 | 0.867 ± 0.115 | 1.417 ± 0.191 |
| B | 20 | 0.400 ± 0.028 | 0.909 ± 0.065 | 0.600 ± 0.000 | 4.233 ± 0.115 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.92 | 3/3 | dart-lang/sdk#48056 | A | Assess whether Dart's Android trust-store behavior bypasses the eMudhra mitigations, and update this issue or coordinate a security fix/verification. |
| 2 | 2.0 (2) | +0.0 | 0.81 | 3/3 | googleapis/librarian#7808 | A | Resolve kevmoo’s review comment by deciding how to preserve CHANGELOG.md, then update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review the PR, focusing on the attribution header and package-release changes. |
| 4 | 4.7 (4–6) | +0.7 | 0.67 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 in googleapis/google-cloud-dart and leave feedback or approve it. |
| 5 | 6.3 (4–8) | +1.3 | 0.61 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel with feedback on the proposed nullable number/string representation and clarify the design you want before implementation proceeds. |
| 6 | 7.3 (7–8) | +1.3 | 0.58 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an asynchronous `Client.close` as a planned breaking change, and record the intended direction on the issue. |
| 7 | 5.3 (5–6) | -1.7 | 0.61 | 3/3 | dart-lang/http#1981 | B | Continue implementing the trust-evaluation hook in CupertinoClient and update the issue when you have a concrete design or PR. |
| 8 | 12.0 (9–15) | +4.0 | 0.52 | 2/3 | googleapis/google-cloud-dart#360 | A | Decide whether to pursue incremental JSON framing and, if so, implement the streaming/error handling changes or assign the work. |
| 9 | 13.0 (12–14) | +4.0 | 0.56 | 3/3 | dart-lang/sdk#59846 | B | Investigate the assigned dart:io parser bug and implement or coordinate a fix for invalid HTTP header-name characters. |
| 10 | 10.7 (10–11) | +0.7 | 0.57 | 3/3 | googleapis/google-cloud-dart#361 | A | Follow up with kevmoo on whether the LRO convenience benefits justify the larger, less navigable Discovery API, then choose the approach. |
| 11 | 15.7 (15–16) | +4.7 | 0.27 | 0/3 | dart-lang/sdk#31275 | A | No action is currently waiting on you; leave this stale SDK issue for its maintainers or an assignee to pick up. |
| 12 | 18.3 (18–19) | +6.3 | 0.24 | 0/3 | dart-lang/native#3752 | B | Wait for your open PR #3763 to be reviewed or merged; the issue itself is covered by that PR. |
| 13 | 13.3 (13–14) | +0.3 | 0.51 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to handle the dependency-version update manually or through librarian automation, then update the package constraints and changelogs when the new google_cloud_rpc release is available. |
| 14 | 21.7 (20–23) | +7.7 | 0.17 | 0/3 | dart-lang/tools#2719 | B | Wait for another reviewer from dart-ecosystem-team to review the PR. |
| 15 | 17.7 (17–19) | +2.7 | 0.24 | 0/3 | googleapis/google-cloud-dart#381 | A | Wait for PR #382 to be reviewed and merged; track that PR rather than this issue. |
| 16 | 28.0 (27–29) | +12.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 7.7 (6–9) | -9.3 ⚠️ | 0.59 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement or scope the remaining ServiceClient retry/RequestOptions and non-JSON error-handling changes in this assigned issue. |
| 18 | 26.0 (25–27) | +8.0 | 0.12 | 0/3 | dart-lang/http#2031 | A | Wait for the stacked PRs #2010, #2014, and #2009 to be reviewed or merged before reviewing this release-preparation PR. |
| 19 | 12.7 (11–15) | -6.3 | 0.47 | 3/3 | googleapis/google-cloud-dart#345 | A | Fix the outstanding review findings and resolve the merge conflict, then update or close the draft PR. |
| 20 | 25.3 (23–27) | +5.3 | 0.14 | 0/3 | dart-lang/core#1007 | B | Wait for the contributor to sign the CLA and for an individual reviewer to take up the PR; the team request is not a personal review request. |
| 21 | 23.7 (21–26) | +2.7 | 0.17 | 0/3 | dart-lang/tools#2544 | B | Wait for the author to address lrhn’s review feedback; the team review request is not a personal request to you. |
| 22 | 23.0 (22–25) | +1.0 | 0.16 | 0/3 | dart-lang/tools#2710 | B | Wait for the stacked base PR #2563 to be reviewed and for a personal review request; the current request is only to dart-ecosystem-team. |
| 23 | 29.0 (28–30) | +6.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there is no response after about a week. |
| 24 | 13.3 (10–16) | -10.7 ⚠️ | 0.44 | 3/3 | googleapis/google-cloud-dart#373 | B | Follow up with Nate Bosch for the requested review, or ask whether he can approve merging based on Sigurdm’s review. |
| 25 | 29.0 (28–30) | +4.0 | 0.11 | 0/3 | dart-lang/http#579 | B | Leave this PR parked until a breaking-release plan is underway; the latest question is not directed to you and the next-breaking-release label blocks progress. |
| 26 | 18.3 (17–20) | -7.7 | 0.24 | 1/3 | dart-lang/http#1932 | B | Review and advance your open fix in PR #2034, then update the issue with its status. |
| 27 | 22.3 (19–25) | -4.7 | 0.17 | 0/3 | flutter/devtools#8223 | B | No action is currently requested of you; wait for someone to ask you directly or for this work to become part of a repository you own. |
| 28 | 35.3 (35–36) | +7.3 | 0.02 | 0/3 | dart-lang/http#1837 | A | Wait for a community contributor to pursue the contributions-welcome enhancement; no follow-up is needed from you. |
| 29 | 35.3 (34–36) | +6.3 | 0.01 | 0/3 | dart-lang/http#2033 | A | Wait for the author or repository maintainers to merge the approved PR. |
| 30 | 33.3 (31–35) | +3.3 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action for now; the issue is in the http2 area you’re not responsible for, and the latest question is awaiting a response from the reporter or maintainers. |
| 31 | 20.7 (20–21) | -10.3 ⚠️ | 0.18 | 0/3 | dart-lang/tools#2715 | B | Wait for the requested individual reviewer, davidmorgan; the team request is shared and does not require your review. |
| 32 | 29.3 (24–32) | -2.7 | 0.06 | 0/3 | dart-lang/http#2026 | A | Wait for @mosuem to review; http2 is outside your stated responsibility and the contributor asked them specifically. |
| 33 | 29.7 (24–33) | -3.3 | 0.08 | 0/3 | dart-lang/native#3653 | A | Wait for liamappelbe, the assignee, to decide whether to pursue the trampoline or autorelease-pool approach. |
| 34 | 33.3 (33–34) | -0.7 | 0.03 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested details; the issue is marked needs-info, and PR #1974 is also waiting on information. |
| 35 | 30.7 (30–31) | -4.3 | 0.09 | 0/3 | dart-lang/http#1841 | B | Wait for PR #2002 to be reviewed or merged; do not work this issue separately. |
| 36 | 8.0 (5–10) | -28.0 ⚠️ | 0.61 | 3/3 | dart-lang/sdk#38148 | B | Follow up on filiph’s reproducible report and investigate the recursive-delete failure on macOS. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security-sensitive concern about potentially accepting certificates tied to compromised intermediate CA keys, and you created and are assigned to the issue. The new report from three days ago directly raises possible exposure; the related mitigation issue being closed does not establish that this Dart behavior is safe, so verify the impact rather than leaving it unresolved.
- **Next action:** Assess whether Dart's Android trust-store behavior bypasses the eMudhra mitigations, and update this issue or coordinate a security fix/verification.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.88
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR, and kevmoo left unresolved review feedback 21 hours ago, so the next step is yours and the PR is blocked pending your response. The comment identifies a concrete issue in the bump/generate workflow. kevmoo is a usual collaborator, making this fresh feedback especially worth addressing promptly.
- **Next action:** Resolve kevmoo’s review comment by deciding how to preserve CHANGELOG.md, then update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in a repository you are responsible for, so you are the default reviewer, and no human review has happened. It is a recent PR from your usual collaborator, making a timely review worthwhile. The bot review does not count as a human review.
- **Next action:** Review the PR, focusing on the attribution header and package-release changes.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.71
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open PR in a repository you are responsible for, and no human has reviewed it, so you are the default reviewer even though you were not explicitly requested. It is a recent submission from a first-time contributor; the bot review does not count as a human review. The change addresses REST retry behavior and includes tests, making timely review worthwhile.
- **Next action:** Review PR #382 in googleapis/google-cloud-dart and leave feedback or approve it.

### 5. googleapis/google-cloud-dart#252 → predicted 7, priority 0.58
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your issue in a repository you work in, and the recent proposal is new information that calls for your review. The collaborator is waiting for your direction on the approach, so a timely response can unblock progress. It is six months old, which keeps it below the highest urgency, but the proposal arrived four days ago and merits attention now.
- **Next action:** Reply to Yusufihsangorgel with feedback on the proposed nullable number/string representation and clarify the design you want before implementation proceeds.

### 6. dart-lang/http#2027 → predicted 8, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You filed this issue in a repository you work in only 9 days ago, so it qualifies as fresh planned work even though there has been no further activity. There is no blocker or open PR; the next decision is yours. The proposed API change could affect users and may involve a 2.0 release, but this is not a security issue or an immediate request from someone else.
- **Next action:** Decide whether to pursue an asynchronous `Client.close` as a planned breaking change, and record the intended direction on the issue.

### 7. dart-lang/http#1981 → predicted 5, priority 0.62
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned the issue to yourself and said five hours ago that you’ve started working on it, so the next step is yours. The recent activity makes this fresh planned work, though the issue is 54 days old and this is a feature request rather than a high-impact bug.
- **Next action:** Continue implementing the trust-evaluation hook in CupertinoClient and update the issue when you have a concrete design or PR.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.57
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator’s issue in a repository you work in, with a concrete next step available to you. Your question was answered 17 days ago, and the answer clarifies the motivation but says the issue is not urgent. The follow-up is now stale enough to keep it in the planned-work range rather than treating it as a fresh blocking request.
- **Next action:** Decide whether to pursue incremental JSON framing and, if so, implement the streaming/error handling changes or assign the work.

### 9. dart-lang/sdk#59846 → predicted 13, priority 0.56
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned, and the issue describes a standards violation that can cause interoperability problems, so the next step is yours rather than blocked on another person. It is in an area you work in, but the report and all activity are about 22 months old, which lowers its freshness and priority within the assigned-work range.
- **Next action:** Investigate the assigned dart:io parser bug and implement or coordinate a fix for invalid HTTP header-name characters.

### 10. googleapis/google-cloud-dart#361 → predicted 11, priority 0.56
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator’s issue in a repository you own, and the concrete architectural tradeoff is now yours to resolve. Your question was answered 16 days ago, but there has been no further activity since, so freshness is limited; still, deciding between Discovery and convenience extensions is a clear next step. It is your actionable planned work, but not an urgent blocker.
- **Next action:** Follow up with kevmoo on whether the LRO convenience benefits justify the larger, less navigable Discovery API, then choose the approach.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** You were CC'd by collaborators, but this is in dart-lang/sdk, outside the repositories you said you own, and no direct task or question was assigned to you. The latest mention was in April 2024 and there has been no activity for 20 months, so it sits near the bottom of the range for old, important CCs.
- **Next action:** No action is currently waiting on you; leave this stale SDK issue for its maintainers or an assignee to pick up.

### 12. dart-lang/native#3752 → predicted 18, priority 0.25
- **Ground truth:** 
- **Model:** The issue is assigned to you and was filed within the last two weeks, but its linked open PR already covers the fix, so the PR—not the issue—is the actionable item. Keep the duplicate in the low range; the PR’s recent update does not create separate work on this issue.
- **Next action:** Wait for your open PR #3763 to be reviewed or merged; the issue itself is covered by that PR.

### 13. googleapis/google-cloud-dart#366 → predicted 14, priority 0.42
- **Ground truth:** 
- **Model:** This is in a repository you work in and was filed by collaborator sigurdm, but the immediate release prerequisite is still pending, so the issue is not fully actionable yet. Your comment 17 days ago raised the unresolved approach; there has been no newer activity, so it sits in the waiting/older range rather than ranking as fresh planned work.
- **Next action:** Decide whether to handle the dependency-version update manually or through librarian automation, then update the package constraints and changelogs when the new google_cloud_rpc release is available.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.18
- **Ground truth:** 
- **Model:** This is a team review request, not a personal request, and dart-lang/tools is not a repository you are responsible for. The PR was opened less than a day ago and is blocked, so there is no useful action for you to take now.
- **Next action:** Wait for another reviewer from dart-ecosystem-team to review the PR.

### 15. googleapis/google-cloud-dart#381 → predicted 19, priority 0.23
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The open PR #382 explicitly fixes this issue, so the concrete work is on the PR, not the issue. The report is recent and concerns retry behavior, but this repository has relatively limited usage and the issue itself does not need a separate action while the fix is under review.
- **Next action:** Wait for PR #382 to be reviewed and merged; track that PR rather than this issue.

### 16. dart-lang/http#2034 → predicted 29, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR, but you requested review from goderbauer only two days ago, so the next step is theirs rather than yours. The PR addresses a recent Cronet build failure, but it is not a security issue and does not outweigh the current wait-for-review state.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 6, priority 0.61
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is a clear next step in a repository you own, and you are assigned; it is planned work rather than something blocked on another person. Your comment 10 days ago narrowed the scope, so it remains fresh, though it is not a new question or urgent production incident. The issue is moderately important shared infrastructure for generated REST clients, warranting the upper half of the planned-work range.
- **Next action:** Implement or scope the remaining ServiceClient retry/RequestOptions and non-JSON error-handling changes in this assigned issue.

### 18. dart-lang/http#2031 → predicted 27, priority 0.12
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were personally asked to review this PR in a repository you follow, you noted that you are not responsible for http2, and the PR is blocked by its stack. The lower PRs need to move first; #2014 also has a review request to you, so this release PR is not the next actionable item.
- **Next action:** Wait for the stacked PRs #2010, #2014, and #2009 to be reviewed or merged before reviewing this release-preparation PR.

### 19. googleapis/google-cloud-dart#345 → predicted 12, priority 0.56
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own work in a repository you’re responsible for, and it still has unresolved review threads and a dirty merge state, so it needs your attention rather than waiting on someone else. It has been dormant for 45 days, which lowers its priority within the planned-work range; the PR is also a draft, so it is not currently blocking anyone.
- **Next action:** Fix the outstanding review findings and resolve the merge conflict, then update or close the draft PR.

### 20. dart-lang/core#1007 → predicted 23, priority 0.18
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in a repository you are not responsible for, so it does not require action from you personally. The PR is also blocked by the contributor’s outstanding CLA, and there has been no new activity directed at you. The issue it fixes is linked, but the PR is the actionable item for its owners and reviewers.
- **Next action:** Wait for the contributor to sign the CLA and for an individual reviewer to take up the PR; the team request is not a personal review request.

### 21. dart-lang/tools#2544 → predicted 26, priority 0.17
- **Ground truth:** 
- **Model:** This is a security-related PR, but it is in dart-lang/tools, a repository you are not responsible for, and the review was requested from the shared dart-ecosystem-team rather than you personally. The author has not updated the PR since lrhn left detailed review feedback two months ago, so there is no new action directed at you; the security importance does not make this team request personally actionable.
- **Next action:** Wait for the author to address lrhn’s review feedback; the team review request is not a personal request to you.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.18
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, where you are not identified as responsible, and the review request is to a team you belong to rather than to you personally. It is also stacked on #2563, which is still an unreviewed draft, so review of this PR is blocked for now. Recent author activity does not make the next step yours.
- **Next action:** Wait for the stacked base PR #2563 to be reviewed and for a personal review request; the current request is only to dart-ecosystem-team.

### 23. dart-lang/native#3763 → predicted 30, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, but you requested a specific reviewer only two days ago, so the next step is currently theirs. The request is fresh, but there is no new feedback or other activity requiring action from you; under the waiting-on-reviewer rule, keep it low for now.
- **Next action:** Wait for liamappelbe to review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 16, priority 0.28
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** You requested reviews from Nate and Sigurdm, and Sigurdm has approved; your recent question to Sigurdm about the non-Pub/Sub changes is still unanswered, so the immediate blocker is a response/review from others rather than more code work. Your comment was only four days ago, so there is not yet a need to ping again. Keep this low while it waits, but above a quiet PR because the review request is recent and the change is substantial.
- **Next action:** Follow up with Nate Bosch for the requested review, or ask whether he can approve merging based on Sigurdm’s review.

### 25. dart-lang/http#579 → predicted 28, priority 0.12
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR is explicitly labeled for a future breaking release, so there is no useful action for you now despite being a requested reviewer. Your last response said you lack bandwidth to coordinate a major release, and the label reinforces that blocker. The recent question asks for a workaround, but it is not addressed to you; the thread has otherwise been quiet for 14 months.
- **Next action:** Leave this PR parked until a breaking-release plan is underway; the latest question is not directed to you and the next-breaking-release label blocks progress.

### 26. dart-lang/http#1932 → predicted 17, priority 0.28
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** Your open PR #2034 covers this issue, so the issue itself is not the main item to act on; focus on the PR. The reporter’s update request was recent, but it doesn’t change that dependency. Keep this issue well below the PR while it remains open.
- **Next action:** Review and advance your open fix in PR #2034, then update the issue with its status.

### 27. flutter/devtools#8223 → predicted 25, priority 0.17
- **Ground truth:** 
- **Model:** You were only CC'd in 2024 on an exploratory feature request in flutter/devtools, a repository you are not responsible for, and there is no direct request to you. The recent label change does not create work for you, so this stays low despite the issue’s recent activity.
- **Next action:** No action is currently requested of you; wait for someone to ask you directly or for this work to become part of a repository you own.

### 28. dart-lang/http#1837 → predicted 35, priority 0.03
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already clarified that this is unlikely to be work for the Dart team and suggested a community-led route. The issue is a year old, has no new activity since your reply, and is labeled contributions-welcome; there is no current task for you, especially since you are not responsible for this area of dart-lang/http.
- **Next action:** Wait for a community contributor to pursue the contributions-welcome enhancement; no follow-up is needed from you.

### 29. dart-lang/http#2033 → predicted 36, priority 0.01
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You approved this PR two days ago, and there have been no commits or author activity since. It is clean with no unresolved review threads, so there is nothing more for you to do unless new activity requires attention.
- **Next action:** Wait for the author or repository maintainers to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 34, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue concerns the http2 package, which is outside your stated responsibility in dart-lang/http. The recent question asks whether the root cause was confirmed, but it is not directed at you and does not create work in your area. The thread has otherwise been quiet for eight months.
- **Next action:** No action for now; the issue is in the http2 area you’re not responsible for, and the latest question is awaiting a response from the reporter or maintainers.

### 31. dart-lang/tools#2715 → predicted 21, priority 0.18
- **Ground truth:** 
- **Model:** This is outside the repositories you are responsible for, and your only request is via the dart-ecosystem-team, not a personal review request. davidmorgan was also explicitly requested, so the PR is not waiting on you. It is recent and from a collaborator, but those factors do not make the next action yours.
- **Next action:** Wait for the requested individual reviewer, davidmorgan; the team request is shared and does not require your review.

### 32. dart-lang/http#2026 → predicted 32, priority 0.04
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR changes the http2 area of dart-lang/http, which you said you are not responsible for, and the author has directly asked @mosuem to review it. There is no review request to you, so the next step is not yours. Recent activity does not change that ownership or review assignment.
- **Next action:** Wait for @mosuem to review; http2 is outside your stated responsibility and the contributor asked them specifically.

### 33. dart-lang/native#3653 → predicted 24, priority 0.18
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is weighing whether the change is worth pursuing; no action is requested from you. The linked implementation PR is merged, and your last substantive comment predates the later technical findings, so there is no new work for you to do.
- **Next action:** Wait for liamappelbe, the assignee, to decide whether to pursue the trampoline or autorelease-pool approach.

### 34. dart-lang/http#1972 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** The issue is assigned to you, but your question is unanswered and the needs-info label blocks further investigation. The linked PR is open and likewise marked needs-info, so there is no useful step to take on the issue until the reporter responds. Your last activity was 8 days ago and there has been no new reporter information.
- **Next action:** Wait for the reporter to provide the requested details; the issue is marked needs-info, and PR #1974 is also waiting on information.

### 35. dart-lang/http#1841 → predicted 31, priority 0.10
- **Ground truth:** 
- **Model:** The open PR #2002 covers this issue, so any work should happen on the PR rather than here. The issue is also labeled for a future breaking release. The recent mention and activity predate your thumbs-down, so they do not raise its priority.
- **Next action:** Wait for PR #2002 to be reviewed or merged; do not work this issue separately.

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.57
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** This is assigned to you, and the recent report provides new information—a current SDK version reproduces the failure—so verifying it and advancing the investigation is yours to do. The issue is old and the recent activity is 24 days ago, so it merits a moderate score rather than the higher range for a fresh blocker. The thumbs-down predates the report, but this new evidence is significant and warrants reassessing the item.
- **Next action:** Follow up on filiph’s reproducible report and investigate the recursive-delete failure on macOS.
