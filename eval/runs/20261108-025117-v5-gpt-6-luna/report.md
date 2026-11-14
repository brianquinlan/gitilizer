# Gitilizer eval: v5-gpt-6-luna

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5.md` · signals `True` · 3 trial(s) · 36 items · 20261108-025117

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.596 ± 0.055 |
| spearman | 0.733 ± 0.062 |
| pairwise_acc | 0.798 ± 0.027 |
| ndcg | 0.970 ± 0.009 |
| ndcg@5 | 0.915 ± 0.037 |
| top3_overlap | 0.778 ± 0.192 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.185 ± 0.472 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.739 ± 0.059 | 0.992 ± 0.003 | 0.867 ± 0.115 | 1.583 ± 0.315 |
| B | 20 | 0.414 ± 0.040 | 0.856 ± 0.046 | 0.533 ± 0.115 | 4.333 ± 0.252 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Assess whether Dart's Android TLS trust path is affected by the eMudhra mitigations, then reply with findings or route the security concern to the appropriate investigation. |
| 2 | 2.0 (2) | +0.0 | 0.79 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo’s review question and update the PR to ensure the generated CHANGELOG.md is preserved on the next `librarian generate`. |
| 3 | 4.0 (3–5) | +1.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review Sigurdm’s Pub/Sub pre-release PR and leave feedback or approve it. |
| 4 | 3.3 (3–4) | -0.7 | 0.72 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the first-time contributor’s PR and either approve it or leave feedback. |
| 5 | 9.0 (7–12) | +4.0 | 0.57 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel’s proposed enum representation with a decision or concrete design feedback, including how unknown names should be handled. |
| 6 | 8.0 (7–9) | +2.0 | 0.58 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue async `Client.close` as a breaking change and outline the API/compatibility plan for a 2.0 release. |
| 7 | 7.0 (6–9) | +0.0 | 0.58 | 3/3 | dart-lang/http#1981 | B | Continue the implementation you said you started, and clarify or update the issue once you have a concrete API direction. |
| 8 | 11.7 (8–15) | +3.7 | 0.49 | 2/3 | googleapis/google-cloud-dart#360 | A | Wait for Kevmoo to provide evidence that servers incrementally send JSON, or for another concrete reason to prioritize this issue. |
| 9 | 13.7 (12–15) | +4.7 | 0.54 | 3/3 | dart-lang/sdk#59846 | B | Investigate the HTTP header parser and determine or implement a fix for rejecting invalid header-name characters. |
| 10 | 12.7 (10–15) | +2.7 | 0.50 | 2/3 | googleapis/google-cloud-dart#361 | A | Reply to kevmoo with your decision on whether to pursue Discovery generation or add polling convenience extensions, then take the chosen implementation step. |
| 11 | 20.3 (14–31) | +9.3 ⚠️ | 0.25 | 0/3 | dart-lang/sdk#31275 | A | No action is currently assigned to you; wait for a Dart SDK owner to take over the abandoned fix or ask you directly. |
| 12 | 18.7 (18–19) | +6.7 | 0.22 | 0/3 | dart-lang/native#3752 | B | Wait for PR #3763, which already covers this issue, to be reviewed or merged. |
| 13 | 12.7 (11–14) | -0.3 | 0.56 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to address this with librarian automation or handle the dependency bumps manually, then update the issue with the plan. |
| 14 | 20.0 (19–21) | +6.0 | 0.18 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team review; no individual review was requested from you. |
| 15 | 17.3 (17–18) | +2.3 | 0.23 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which covers this issue; no separate action is needed on the issue. |
| 16 | 24.7 (24–25) | +8.7 | 0.11 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 7.0 (5–10) | -10.0 ⚠️ | 0.61 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the assigned ServiceClient retry/RequestOptions and non-JSON error handling changes, keeping AIP-4222/AIP-155 work out of scope per your comment. |
| 18 | 26.0 (24–28) | +8.0 | 0.11 | 0/3 | dart-lang/http#2031 | A | Wait for the lower stacked PRs to be reviewed and merged before reviewing this release-preparation PR. |
| 19 | 10.3 (9–11) | -8.7 | 0.57 | 3/3 | googleapis/google-cloud-dart#345 | A | Resolve the outstanding review comments and rebase or otherwise fix the dirty state, then take the PR out of draft when it is ready. |
| 20 | 23.0 (21–26) | +3.0 | 0.15 | 0/3 | dart-lang/core#1007 | B | Wait for the contributor to complete the CLA requirement; the review request is to the shared dart-ecosystem-team, not to you personally. |
| 21 | 25.0 (23–29) | +4.0 | 0.12 | 0/3 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn’s review feedback; review the PR if it is later explicitly requested or becomes your responsibility. |
| 22 | 22.0 (21–23) | +0.0 | 0.15 | 0/3 | dart-lang/tools#2710 | B | Wait for the unreviewed base PR #2563 to be reviewed, then review this stacked PR if needed. |
| 23 | 24.7 (22–27) | +1.7 | 0.11 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there is no response after about a week. |
| 24 | 14.0 (10–16) | -10.0 ⚠️ | 0.38 | 3/3 | googleapis/google-cloud-dart#373 | B | Follow up with Sigurdm or Natebosch for the requested review, and address any feedback before merging. |
| 25 | 29.0 (28–30) | +4.0 | 0.09 | 0/3 | dart-lang/http#579 | B | Wait for the project to schedule a breaking release; the PR is explicitly labeled for that release, and the recent workaround question does not unblock it. |
| 26 | 13.0 (4–18) | -13.0 ⚠️ | 0.41 | 1/3 | dart-lang/http#1932 | B | Review and merge your open fix in PR #2034; this issue is covered by that PR. |
| 27 | 29.3 (27–31) | +2.3 | 0.06 | 0/3 | flutter/devtools#8223 | B | No action is currently requested of you; wait for someone to ask for input or a concrete next step. |
| 28 | 33.7 (32–35) | +5.7 | 0.04 | 0/3 | dart-lang/http#1837 | A | Wait for a community contributor to take up the contributions-welcome issue; no follow-up is needed from you now. |
| 29 | 36.0 (36) | +7.0 | 0.01 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or maintainer to merge it. |
| 30 | 34.0 (33–35) | +4.0 | 0.03 | 0/3 | dart-lang/http#1365 | A | Leave this issue alone; it is in the http2 area you are not responsible for, and the reporter or maintainers should confirm whether it can be closed. |
| 31 | 23.3 (20–30) | -7.7 | 0.14 | 0/3 | dart-lang/tools#2715 | B | Wait for David Morgan or the dart-ecosystem-team to review; reconsider after about a week if there is no response. |
| 32 | 28.3 (24–35) | -3.7 | 0.07 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem to review the PR; you are not responsible for the http2 area of dart-lang/http. |
| 33 | 31.3 (29–33) | -1.7 | 0.03 | 0/3 | dart-lang/native#3653 | A | No action needed now; the discussion concluded that this approach is likely not worth pursuing, and the related implementation PR is merged. |
| 34 | 33.0 (32–34) | -1.0 | 0.03 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested details; the linked PR is also marked needs-info. |
| 35 | 28.7 (27–31) | -6.3 | 0.08 | 0/3 | dart-lang/http#1841 | B | Wait for PR #2002 to be reviewed or merged; review it only if it becomes your responsibility or you are personally asked. |
| 36 | 8.3 (5–13) | -27.7 ⚠️ | 0.62 | 3/3 | dart-lang/sdk#38148 | B | Investigate the reproducible macOS failure and reply to filiph with a concrete debugging or reproduction request. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.94
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security-related issue in a repository you own and are assigned to, and new activity from three days ago raises a possible exposure involving compromised intermediate CA keys. The recent pointer to a related mitigation issue does not establish that Dart/Flutter is protected; verifying the impact and closing the loop is your responsibility despite the issue's old age and P3 label.
- **Next action:** Assess whether Dart's Android TLS trust path is affected by the eMudhra mitigations, then reply with findings or route the security concern to the appropriate investigation.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.83
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR, and kevmoo left a new unresolved review comment 21 hours ago that needs your response; the PR is currently blocked, so your next action is to address the feedback rather than wait on the team review request. The recent collaborator feedback makes this a high-priority blocker, though it is not a direct question blocking another person's work, so it sits below the very top of the scale.
- **Next action:** Reply to kevmoo’s review question and update the PR to ensure the generated CHANGELOG.md is preserved on the next `librarian generate`.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in google-cloud-dart, a repository you are responsible for, and no human has reviewed it; the bot review does not count, so the review is yours to do. It is from a usual collaborator and was opened five days ago, making it a fresh, high-leverage review, though it is not blocking anyone via direct feedback to you or a security issue.
- **Next action:** Review Sigurdm’s Pub/Sub pre-release PR and leave feedback or approve it.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open PR in a repository you’re responsible for, with no human review yet; bot review does not count, so you are the default reviewer. It is recent and addresses a concrete REST retry/error-code bug with tests, so it merits prompt attention, though it is not described as a security issue.
- **Next action:** Review the first-time contributor’s PR and either approve it or leave feedback.

### 5. googleapis/google-cloud-dart#252 → predicted 7, priority 0.58
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your recently filed issue in a repository you work in, so it remains planned work even though it is now older than two weeks. The contributor has proposed a concrete design four days ago, and your response is the next step before they proceed; it is not blocked on a new update from you. The bug is meaningful for ProtoJSON compatibility, but the repository is experimental and the issue is P2, so it sits in the middle of the planned-work range.
- **Next action:** Reply to Yusufihsangorgel’s proposed enum representation with a decision or concrete design feedback, including how unknown names should be handled.

### 6. dart-lang/http#2027 → predicted 8, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is your own issue, filed nine days ago in a repository you work in, with no blocker or outside input; it qualifies as fresh planned work. It is a significant API design question affecting package users, but it is not a security or urgent production issue, so it sits in the middle of the planned-work range.
- **Next action:** Decide whether to pursue async `Client.close` as a breaking change and outline the API/compatibility plan for a 2.0 release.

### 7. dart-lang/http#1981 → predicted 9, priority 0.57
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is in dart-lang/http, where you have an assignee role, and your recent comment explicitly says you have started working on it. That makes it fresh planned work in an area you work in, even though the issue is 54 days old and the reporter has not provided a skeleton PR. The feature is useful but not presented as a high-impact urgent problem, so it sits in the middle of the planned-work range.
- **Next action:** Continue the implementation you said you started, and clarify or update the issue once you have a concrete API direction.

### 8. googleapis/google-cloud-dart#360 → predicted 15, priority 0.31
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator’s issue in a repository you care about, but the immediate question you asked was answered: Kevmoo says it is not urgent and does not know whether servers send incremental JSON. No clear implementation commitment or direct request for you to act is outstanding. The last activity was 17 days ago, so it remains a low-priority follow-up rather than active work.
- **Next action:** Wait for Kevmoo to provide evidence that servers incrementally send JSON, or for another concrete reason to prioritize this issue.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned this bug in the Dart SDK, and there is no indication that it is blocked or covered by an open PR, so the next step is yours. The reported permissive parsing can cause proxy interoperability or security issues, but this is not identified as a security issue and the thread has been dormant for about 22 months, so it is a lower-priority assigned task rather than urgent work.
- **Next action:** Investigate the HTTP header parser and determine or implement a fix for rejecting invalid header-name characters.

### 10. googleapis/google-cloud-dart#361 → predicted 10, priority 0.57
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in a repository you own, opened by a close collaborator, and your question about the approach received a direct answer. The next step is yours: decide between the proposed Discovery switch and a smaller convenience-extension approach; the thread has been quiet for 16 days, so it is not an immediate blocker but remains fresh enough to act on.
- **Next action:** Reply to kevmoo with your decision on whether to pursue Discovery generation or add polling convenience extensions, then take the chosen implementation step.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.43
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a stale issue in dart-lang/sdk, which is outside your listed repository responsibilities, and you were only informally CC'd rather than asked to implement or review it. The old mentions—including kevmoo's 2024 CC—do not create a current action, though the collaborator's report of ongoing impact makes it more notable than an ordinary dormant issue.
- **Next action:** No action is currently assigned to you; wait for a Dart SDK owner to take over the abandoned fix or ask you directly.

### 12. dart-lang/native#3752 → predicted 19, priority 0.25
- **Ground truth:** 
- **Model:** Open PR #3763 is linked to close this issue, so the PR is now the actionable item and this issue should remain well below it. You created and assigned the issue less than a week ago, but the linked PR supersedes that planned work.
- **Next action:** Wait for PR #3763, which already covers this issue, to be reviewed or merged.

### 13. googleapis/google-cloud-dart#366 → predicted 13, priority 0.54
- **Ground truth:** 
- **Model:** This is an issue in a repository you’re responsible for, filed by a close collaborator, and your comment raised an unresolved decision about how to fix it. The issue is not especially fresh—your comment was 17 days ago—so it sits near the lower end of the range for actionable planned work. The referenced PRs are merged, and there is no open PR covering the remaining dependency/version updates.
- **Next action:** Decide whether to address this with librarian automation or handle the dependency bumps manually, then update the issue with the plan.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.18
- **Ground truth:** 
- **Model:** This PR only requests review from a team you belong to, in a repository you are not listed as responsible for, so it is not a personal request. It is a fresh, small automated dependency update, but the team request is shared and there is no human activity indicating you need to act.
- **Next action:** Wait for the dart-ecosystem-team review; no individual review was requested from you.

### 15. googleapis/google-cloud-dart#381 → predicted 17, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a recent, concrete bug report in a repository you care about, but the linked open PR already proposes a fix, so the PR is the item to act on. The issue itself should remain well below that PR; the report is not security-related and does not ask you directly to do anything.
- **Next action:** Review PR #382, which covers this issue; no separate action is needed on the issue.

### 16. dart-lang/http#2034 → predicted 25, priority 0.12
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR in a repository you work in, but you requested review just two days ago, so the next step is currently the reviewer's. The underlying fix matters because it addresses a reported build break, but that does not change the low priority while you are waiting on a recent review request.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 6, priority 0.62
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is your assigned issue in a repository you own, filed by close collaborator kevmoo, and the core implementation remains open with no dependency blocking you. Your recent comment narrowed the scope but did not report completion; as planned work it merits the upper part of the 0.5–0.65 range. The latest activity was yours 10 days ago, so there is no newer request raising it into the range for someone waiting on your reply.
- **Next action:** Implement the assigned ServiceClient retry/RequestOptions and non-JSON error handling changes, keeping AIP-4222/AIP-155 work out of scope per your comment.

### 18. dart-lang/http#2031 → predicted 28, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were personally requested to review this PR, it is stacked on other open PRs, including #2014, which has not been reviewed; the lower PRs need attention first. You also noted that you are not responsible for the http2 area, so this is not otherwise your default-review work. The stack changed three days ago, but that does not remove the blocker.
- **Next action:** Wait for the lower stacked PRs to be reviewed and merged before reviewing this release-preparation PR.

### 19. googleapis/google-cloud-dart#345 → predicted 11, priority 0.55
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your PR in a repository you own, and the bot surfaced concrete unresolved issues; there is no human reviewer you are waiting on. Although it has been dormant for 45 days and is still a draft, it remains planned work in your area, so it merits a moderate priority rather than a fresh or blocking-PR score.
- **Next action:** Resolve the outstanding review comments and rebase or otherwise fix the dirty state, then take the PR out of draft when it is ready.

### 20. dart-lang/core#1007 → predicted 26, priority 0.12
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in a repository you are not responsible for, so it is not an individual action item. The CLA check also says the contributor must act before the PR can be reviewed. Although the PR has a recent update, there is no new activity directed at you.
- **Next action:** Wait for the contributor to complete the CLA requirement; the review request is to the shared dart-ecosystem-team, not to you personally.

### 21. dart-lang/tools#2544 → predicted 23, priority 0.17
- **Ground truth:** 
- **Model:** This is a security-related PR, but it is in dart-lang/tools, a repository you are not responsible for, and the review request is only to your shared dart-ecosystem-team—not to you personally. lrhn has already reviewed it and left substantial feedback, with no subsequent author activity for two months, so the next step is on the author rather than you. The security significance does not make this team review request yours to act on.
- **Next action:** Wait for jonasfj to address lrhn’s review feedback; review the PR if it is later explicitly requested or becomes your responsibility.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.18
- **Ground truth:** 
- **Model:** This is a team review request in a repository you do not own, so it is not a personal request to you. It is also stacked on draft PR #2563, which has not yet been reviewed; that lower PR needs attention first. The recent updates do not change your next step.
- **Next action:** Wait for the unreviewed base PR #2563 to be reviewed, then review this stacked PR if needed.

### 23. dart-lang/native#3763 → predicted 27, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, but you personally requested a review from liamappelbe only two days ago, so the next step is currently theirs. The request is recent and there is no new activity requiring you to respond; wait before following up. The PR addresses your assigned issues, but those issues are covered by this open PR rather than being separate work to do now.
- **Next action:** Wait for liamappelbe to review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 16, priority 0.28
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR in a repository you own, but you requested review from Natebosch and asked Sigurdm a review question four days ago; the next step is waiting on them, not more implementation from you. The approval from Sigurdm was six days ago and does not cover the later changes, while your recent comment is a fresh request for review. Since less than a week has passed since the request, keep it low rather than treating it as an immediate ping.
- **Next action:** Follow up with Sigurdm or Natebosch for the requested review, and address any feedback before merging.

### 25. dart-lang/http#579 → predicted 29, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR is explicitly blocked by the `next-breaking-release` label, so there is no useful review action for you now despite the personal review request. The last activity was 14 months ago and the author’s last update predates your comment that you lack bandwidth; the recent question asks about a workaround rather than creating an actionable step for you. Keep it in the low blocked range.
- **Next action:** Wait for the project to schedule a breaking release; the PR is explicitly labeled for that release, and the recent workaround question does not unblock it.

### 26. dart-lang/http#1932 → predicted 18, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** The issue is assigned to you, but an open PR you authored specifically fixes the Cronet namespace duplication, so the PR—not this issue—is the actionable item. The reporter's recent update does not change that dependency; keep the issue lower priority while the fix is handled in the PR.
- **Next action:** Review and merge your open fix in PR #2034; this issue is covered by that PR.

### 27. flutter/devtools#8223 → predicted 30, priority 0.08
- **Ground truth:** 
- **Model:** You were only CC'd in 2024, and no one has asked you directly to act since; the recent label change does not change that. This is a feature request in a repository outside the areas you own, with no assignment or open PR noted, so it remains low priority despite the recent activity.
- **Next action:** No action is currently requested of you; wait for someone to ask for input or a concrete next step.

### 28. dart-lang/http#1837 → predicted 32, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already explained that this is unlikely to be taken on by the Dart team and pointed to a community implementation path. The issue is old, marked contributions-welcome and P3, and has had no activity since your response; it is not in an area you own that calls for action.
- **Next action:** Wait for a community contributor to take up the contributions-welcome issue; no follow-up is needed from you now.

### 29. dart-lang/http#2033 → predicted 36, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You approved this PR 2 days ago, and there has been no activity since your review. It is clean and has no unresolved review threads, so there is nothing more for you to do unless new changes or questions appear.
- **Next action:** Wait for the PR author or maintainer to merge it.

### 30. dart-lang/http#1365 → predicted 35, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** Your repository note explicitly says you are not responsible for http2, and no one has asked you to act. The latest question is directed to the issue maintainers, not you; despite being relatively recent, it does not change your next step.
- **Next action:** Leave this issue alone; it is in the http2 area you are not responsible for, and the reporter or maintainers should confirm whether it can be closed.

### 31. dart-lang/tools#2715 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** This PR is in a repository you do not own, and the review request to dart-ecosystem-team is shared rather than personal; David Morgan is also specifically requested. The request is only two days old, so there is no follow-up to make yet. Its collaborator author and recent activity keep it visible, but the next step belongs to the reviewers.
- **Next action:** Wait for David Morgan or the dart-ecosystem-team to review; reconsider after about a week if there is no response.

### 32. dart-lang/http#2026 → predicted 24, priority 0.12
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in the http2 area you explicitly said you are not responsible for, and its author asked mosuem—not you—to review it. Recent activity is directed to mosuem, so there is no action for you now despite the PR needing review. The issue it fixes is covered by this open PR and should be ranked below it.
- **Next action:** Wait for mosuem to review the PR; you are not responsible for the http2 area of dart-lang/http.

### 33. dart-lang/native#3653 → predicted 33, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This is in dart-lang/native, which is outside your stated areas of responsibility, and no one has asked you to take action. Your last comment was 37 days ago; the more recent discussion and conclusion are from the repository members. The related PR is already merged, so this issue is effectively owned by its maintainers.
- **Next action:** No action needed now; the discussion concluded that this approach is likely not worth pursuing, and the related implementation PR is merged.

### 34. dart-lang/http#1972 → predicted 34, priority 0.03
- **Ground truth:** 
- **Model:** You asked the reporter for information and labeled the issue needs-info, with no reply since, so there is nothing useful to do on the issue now. The linked open PR covers the issue and is also awaiting information. Although you are assigned, the needs-info block takes precedence.
- **Next action:** Wait for the reporter to provide the requested details; the linked PR is also marked needs-info.

### 35. dart-lang/http#1841 → predicted 31, priority 0.08
- **Ground truth:** 
- **Model:** The issue is explicitly deferred to a future breaking release, and an open PR now covers it, so the issue itself is not the work to act on. The recent activity and direct mention are before your 2026-10-05 thumbs-down, so they do not renew its priority. The next action is with the PR author/reviewers, not you.
- **Next action:** Wait for PR #2002 to be reviewed or merged; review it only if it becomes your responsibility or you are personally asked.

### 36. dart-lang/sdk#38148 → predicted 5, priority 0.69
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this issue, and a recent report confirms the bug still reproduces on current Dart with an offer to help; checking and responding is a clear next step for you. The issue is in Dart SDK code, but it is an ordinary P2 bug rather than a security issue, so it belongs in the assigned-issue range rather than at the very top.
- **Next action:** Investigate the reproducible macOS failure and reply to filiph with a concrete debugging or reproduction request.
