# Gitilizer eval: v5f-gpt-6-luna

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5f.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030933

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.594 ± 0.018 |
| spearman | 0.717 ± 0.034 |
| pairwise_acc | 0.797 ± 0.009 |
| ndcg | 0.969 ± 0.006 |
| ndcg@5 | 0.917 ± 0.006 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.167 ± 0.147 |

**1 item scoring(s) failed** — see results.json.

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.783 ± 0.033 | 0.994 ± 0.002 | 0.867 ± 0.115 | 1.333 ± 0.072 |
| B | 20 | 0.403 ± 0.032 | 0.853 ± 0.015 | 0.600 ± 0.000 | 4.333 ± 0.252 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Assess whether Dart’s Android trust handling leaves applications exposed to the reported compromised intermediates, and coordinate a security response or fix if needed. |
| 2 | 2.0 (2) | +0.0 | 0.84 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo’s review comment and update the PR to preserve the generated CHANGELOG.md across `librarian generate`. |
| 3 | 3.7 (3–5) | +0.7 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm’s PR and approve or request changes. |
| 4 | 3.7 (3–4) | -0.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the first-time contributor’s PR in google-cloud-dart. |
| 5 | 6.7 (6–8) | +1.7 | 0.61 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel with feedback on the proposed ProtoEnum representation and clarify the next design step before implementation. |
| 6 | 8.3 (8–9) | +2.3 | 0.59 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an async, breaking `Client.close` change and record the proposed direction or next steps. |
| 7 | 7.3 (6–9) | +0.3 | 0.59 | 3/3 | dart-lang/http#1981 | B | Continue the implementation you said you started, then update the issue with the proposed API or a draft PR. |
| 8 | 12.3 (11–13) | +4.3 | 0.56 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether to pursue incremental JSON parsing and follow up with kevmoo on the expected server behavior or desired scope. |
| 9 | 15.3 (15–16) | +6.3 | 0.52 | 3/3 | dart-lang/sdk#59846 | B | Investigate the dart:io header parser and fix it to reject characters outside RFC 9110’s header-name set. |
| 10 | 11.7 (10–14) | +1.7 | 0.57 | 3/3 | googleapis/google-cloud-dart#361 | A | Reply to kevmoo with your decision on discovery versus adding polling extensions, then take the agreed implementation path. |
| 11 | 22.3 (16–34) | +11.3 ⚠️ | 0.25 | 0/3 | dart-lang/sdk#31275 | A | Wait for the Dart SDK owner to take over and implement the abandoned fix; no action has been requested from you directly. |
| 12 | 18.0 (17–19) | +6.0 | 0.24 | 0/3 | dart-lang/native#3752 | B | Continue work on the linked PR #3763; this issue is already covered by it. |
| 13 | 12.7 (12–14) | -0.3 | 0.56 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to handle dependency-version updates manually or through librarian automation, then update the issue with the plan and make the needed package changes once the google_cloud_rpc release is available. |
| 14 | 19.3 (19–20) | +5.3 | 0.19 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team to review the PR. |
| 15 | 17.0 (16–18) | +2.0 | 0.26 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which is the proposed fix; this issue itself needs no separate action while that PR is open. |
| 16 | 24.3 (24–25) | +8.3 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 9.7 (9–10) | -7.3 | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the remaining ServiceClient retry/RequestOptions support and harden non-JSON HTTP error handling. |
| 18 | 25.3 (22–29) | +7.3 | 0.10 | 0/3 | dart-lang/http#2031 | A | Wait for the stacked PRs—especially #2014—to be reviewed before reviewing this release-preparation PR. |
| 19 | 13.0 (12–14) | -6.0 | 0.56 | 3/3 | googleapis/google-cloud-dart#345 | A | Address the review findings and resolve the merge conflict, then update the PR from draft. |
| 20 | 21.0 (20–22) | +1.0 | 0.18 | 0/3 | dart-lang/core#1007 | B | Wait for the dart-ecosystem-team review; the PR is not personally assigned to you. |
| 21 | 30.7 (30–31) | +9.7 ⚠️ | 0.07 | 0/3 | dart-lang/tools#2544 | B | Wait for the author to address lrhn’s review feedback; this was only requested via the dart-ecosystem-team, not personally. |
| 22 | 24.0 (21–28) | +2.0 | 0.11 | 0/3 | dart-lang/tools#2710 | B | Wait for the stacked base PR #2563 to be reviewed and unblocked; the team review request is not directed to you personally. |
| 23 | 23.3 (22–25) | +0.3 | 0.11 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there is no response after about a week. |
| 24 | 20.0 (11–26) | -4.0 | 0.26 | 1/3 | googleapis/google-cloud-dart#373 | B | Review the updated PR yourself, especially the non-Pub/Sub changes, and resolve the two outstanding review threads before deciding whether to merge. |
| 25 | 26.7 (26–27) | +1.7 | 0.10 | 0/3 | dart-lang/http#579 | B | Wait for the breaking-release plan; revisit only when the `next-breaking-release` block is lifted or someone asks you directly to review. |
| 26 | 4.7 (4–5) | -21.3 ⚠️ | 0.72 | 3/3 | dart-lang/http#1932 | B | Review and merge your open fix PR #2034, then update the issue with its status. |
| 27 | 28.3 (24–33) | +1.3 | 0.08 | 0/3 | flutter/devtools#8223 | B | Wait for the DevTools maintainers or the reporter to advance the feature request; no action has been asked of you. |
| 28 | 32.0 (29–35) | +4.0 | 0.05 | 0/3 | dart-lang/http#1837 | A | No action is needed now; wait for a community contributor to pick up the issue. |
| 29 | 35.3 (35–36) | +6.3 | 0.01 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or maintainer to merge it. |
| 30 | 34.3 (33–36) | +4.3 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action for you now; the issue is in the http2 area you marked out of scope, and the reporter’s latest question has no response yet. |
| 31 | 19.7 (18–21) | -11.3 ⚠️ | 0.19 | 0/3 | dart-lang/tools#2715 | B | Wait for the specifically requested reviewer, davidmorgan, or for a direct request to review you. |
| 32 | 29.7 (27–34) | -2.3 | 0.06 | 0/3 | dart-lang/http#2026 | A | Wait for the requested reviewer, mosuem, to review the PR. |
| 33 | 33.0 (30–36) | +0.0 | -0.29 | 0/2 | dart-lang/native#3653 | A | No action is needed now; the issue's assignee is weighing options, and the proposed optimization is considered likely not worth pursuing. |
| 34 | 30.0 (26–32) | -4.0 | 0.07 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested client and reproduction details; the linked PR also needs information. |
| 35 | 30.0 (29–31) | -5.0 | 0.07 | 0/3 | dart-lang/http#1841 | B | Wait for PR #2002 to be reviewed or merged; review that PR rather than acting on this covered issue. |
| 36 | 9.7 (7–15) | -26.3 ⚠️ | 0.60 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph with a focused request for a minimal reproducer and investigate the current recursive-delete implementation. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.94
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an issue in code you own, you are assigned to it, and the new report explicitly raises a potential security impact involving compromised CA keys. The latest activity is only three days old; the pointer to a related issue does not resolve whether this Android trust path is affected, so confirming impact and the issue’s status is your next step. Security concerns in your owned code warrant top priority regardless of the P3 label or the issue’s age.
- **Next action:** Assess whether Dart’s Android trust handling leaves applications exposed to the reported compromised intermediates, and coordinate a security response or fix if needed.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.84
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR, and kevmoo raised a new unresolved review question 21 hours ago; the PR is blocked pending your response or change. It is a recent, concrete blocker for a usual collaborator, so it belongs near the top of the scale for work that is blocking someone. The team review request itself is not a personal request, but the new inline feedback makes the next step yours.
- **Next action:** Reply to kevmoo’s review comment and update the PR to preserve the generated CHANGELOG.md across `librarian generate`.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.73
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** You are responsible for google-cloud-dart and are the default reviewer; no human has reviewed this PR yet. It is a recent PR from a usual collaborator, so it merits prompt attention. The bot’s feedback is about subscription.dart, which is not changed in this PR.
- **Next action:** Review sigurdm’s PR and approve or request changes.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open, non-draft PR in a repository you are responsible for, and no human has reviewed it; as the default reviewer, the next step is yours. The bot review does not count, and the PR is recent, so it sits high in the review range, though it is not currently blocking someone who asked you directly.
- **Next action:** Review the first-time contributor’s PR in google-cloud-dart.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.62
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your own issue in a repository you work in, and it has fresh, substantive design input from the contributor four days ago that needs your response. The contributor is waiting for your direction on the approach; your earlier comments specifically asked for a design before substantial implementation. It is not blocking someone’s immediate work yet, so it falls in the planned-work range rather than the urgent blocking range.
- **Next action:** Reply to Yusufihsangorgel with feedback on the proposed ProtoEnum representation and clarify the next design step before implementation.

### 6. dart-lang/http#2027 → predicted 8, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You filed this issue in a repository you work in nine days ago, with no blocker or outside response; it is fresh planned work. The concrete next step is yours: resolve the API direction and plan the breaking change, though this is not an immediate blocker for someone else.
- **Next action:** Decide whether to pursue an async, breaking `Client.close` change and record the proposed direction or next steps.

### 7. dart-lang/http#1981 → predicted 7, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You are assigned and your recent comment says you have started working on this, making the next step yours rather than waiting on the reporter. This is a fresh commitment in a repository you work in, so it falls in the 0.5–0.65 range. The request is a feature rather than a security issue, and no one is currently blocked on a response, so it does not warrant a higher priority.
- **Next action:** Continue the implementation you said you started, then update the issue with the proposed API or a draft PR.

### 8. googleapis/google-cloud-dart#360 → predicted 13, priority 0.56
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is in a repository you work in, filed by a close collaborator, and the discussion is waiting on your judgment about the proposed incremental JSON work. kevmoo replied to your question 17 days ago and said it is not urgent, so it is actionable but not blocking anyone; its age and stated urgency keep it near the lower end of the planned/collaborator-work range.
- **Next action:** Decide whether to pursue incremental JSON parsing and follow up with kevmoo on the expected server behavior or desired scope.

### 9. dart-lang/sdk#59846 → predicted 16, priority 0.52
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this parser bug, so the next step is yours and there is no stated blocker. The issue is stale, with no activity since January 2025, which keeps it near the bottom of the assigned-work range; the potential proxy interoperability impact makes it worth addressing, but it is not presented as a security vulnerability.
- **Next action:** Investigate the dart:io header parser and fix it to reject characters outside RFC 9110’s header-name set.

### 10. googleapis/google-cloud-dart#361 → predicted 10, priority 0.58
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is in a repository you own and was raised by collaborator kevmoo; the discussion surfaced a decision you need to make about the API tradeoff. Your last comment was 16 days ago and kevmoo's response preceded it, so there is no newer reply waiting on you, but the issue remains a fresh-enough planned decision rather than blocked work. The next useful step is to settle the approach and communicate it; it merits the middle of the 0.5–0.65 range.
- **Next action:** Reply to kevmoo with your decision on discovery versus adding polling extensions, then take the agreed implementation path.

### 11. dart-lang/sdk#31275 → predicted 17, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old issue in dart-lang/sdk, outside the repositories you are responsible for, and the proposed fix was abandoned. You were only CC'd, most recently by kevmoo in 2024, with no activity in the last 20 months; that makes it a stale mention rather than work you can act on now.
- **Next action:** Wait for the Dart SDK owner to take over and implement the abandoned fix; no action has been requested from you directly.

### 12. dart-lang/native#3752 → predicted 19, priority 0.22
- **Ground truth:** 
- **Model:** The open PR you created covers this issue, so the PR—not the issue—is the actionable item. The issue was filed recently and assigned to you, but it has no new activity requiring separate verification; keep it below the PR.
- **Next action:** Continue work on the linked PR #3763; this issue is already covered by it.

### 13. googleapis/google-cloud-dart#366 → predicted 14, priority 0.55
- **Ground truth:** 
- **Model:** This is a collaborator’s issue in a repository you work in, and your last comment raised an unresolved design question about the fix. The issue says the dependency bump depends on a new google_cloud_rpc release, but the thread records no release or reply since your comment 17 days ago. You can still decide and communicate the automation approach now; the actual version constraints must wait for the release.
- **Next action:** Decide whether to handle dependency-version updates manually or through librarian automation, then update the issue with the plan and make the needed package changes once the google_cloud_rpc release is available.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, outside the repositories you own, and the review request is to a team you belong to rather than to you personally. It was opened less than a day ago, and no human has acted yet, so there is no reason to follow up now.
- **Next action:** Wait for the dart-ecosystem-team to review the PR.

### 15. googleapis/google-cloud-dart#381 → predicted 18, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The open PR explicitly covers this issue, so the PR is the item to act on and the issue should remain lower priority. The report is recent and concerns retry behavior, but it was filed by a non-collaborator and no direct action was requested on the issue.
- **Next action:** Review PR #382, which is the proposed fix; this issue itself needs no separate action while that PR is open.

### 16. dart-lang/http#2034 → predicted 25, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR, and you explicitly requested a reviewer two days ago; the next step is theirs, not yours. There is no review feedback to address, so it belongs in the low range for a recently requested review. The linked issue is assigned to you, but this PR already covers it.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is assigned to you in a repository you own, and your comment indicates the AIP-4222/AIP-155 scope has been removed, leaving concrete work you can take forward. It was filed by collaborator kevmoo and is still relatively fresh, though your last activity was 10 days ago and no one is currently waiting on a reply. Treat it as assigned planned work rather than an immediate blocker.
- **Next action:** Implement the remaining ServiceClient retry/RequestOptions support and harden non-JSON HTTP error handling.

### 18. dart-lang/http#2031 → predicted 29, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were personally requested to review this PR and the author is a close collaborator, this is in the http2 area you said you are not responsible for, and it is stacked on unreviewed PR #2014. The lower PRs must be reviewed first; nothing new has happened since the PR was opened three days ago.
- **Next action:** Wait for the stacked PRs—especially #2014—to be reviewed before reviewing this release-preparation PR.

### 19. googleapis/google-cloud-dart#345 → predicted 12, priority 0.57
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own PR in a repository you work in, and it has unresolved review threads plus a dirty mergeable state, so the next step is yours. The feedback and your last activity are 45 days old, which lowers its urgency, but the PR remains unfinished and contains concrete reported issues.
- **Next action:** Address the review findings and resolve the merge conflict, then update the PR from draft.

### 20. dart-lang/core#1007 → predicted 22, priority 0.18
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in a repository you are not responsible for, so it is not a request for you personally. The request is 15 days old and no review activity is shown, but it remains a shared team responsibility rather than an action on you. The CLA check also needs the contributor to resolve it before review can proceed.
- **Next action:** Wait for the dart-ecosystem-team review; the PR is not personally assigned to you.

### 21. dart-lang/tools#2544 → predicted 31, priority 0.08
- **Ground truth:** 
- **Model:** This is a security-related PR, but you are not responsible for dart-lang/tools and were requested only as part of a shared team; the PR is not yours. The latest activity was lrhn’s review feedback two months ago, and the author has not pushed changes since, so the next action is on the author rather than you.
- **Next action:** Wait for the author to address lrhn’s review feedback; this was only requested via the dart-ecosystem-team, not personally.

### 22. dart-lang/tools#2710 → predicted 28, priority 0.08
- **Ground truth:** 
- **Model:** This is a team-level review request in a repository you do not own, so it does not make you the reviewer. More importantly, this PR is stacked on #2563, which is still an open draft, so the base PR must move first. Recent activity addressed bot feedback but did not change what you should do now.
- **Next action:** Wait for the stacked base PR #2563 to be reviewed and unblocked; the team review request is not directed to you personally.

### 23. dart-lang/native#3763 → predicted 23, priority 0.12
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, but you requested review from liamappelbe only two days ago and there has been no reviewer activity. The next step is currently theirs; it is too soon to ping, so this belongs in the low range for a PR awaiting a recently requested reviewer. The linked issues are covered by this PR and do not create a separate action right now.
- **Next action:** Wait for liamappelbe to review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 11, priority 0.57
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR in a repository you work in, and its related assigned issue is fresh planned work. You requested Sigurd's opinion four days ago and are waiting on a response, but the PR also has two unresolved threads and is marked approved; with Nate still requested as reviewer, don't treat it as blocking anyone or immediately ready to merge. A focused self-review is a useful next step while awaiting their input.
- **Next action:** Review the updated PR yourself, especially the non-Pub/Sub changes, and resolve the two outstanding review threads before deciding whether to merge.

### 25. dart-lang/http#579 → predicted 27, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR is explicitly labeled `next-breaking-release`, so it is blocked rather than actionable now; the latest question is from 14 months ago and does not change that. It is also in `dart-lang/http`, an area you are not responsible for, and the relevant direction was already discussed before your last reply. The old personal review request does not override the release block.
- **Next action:** Wait for the breaking-release plan; revisit only when the `next-breaking-release` block is lifted or someone asks you directly to review.

### 26. dart-lang/http#1932 → predicted 5, priority 0.72
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You own this issue, and a recent comment asks for an update; your open PR #2034 appears to address it, so the PR is the work to act on rather than the duplicate issue. The PR was updated two days ago, making this fresh, actionable work in a repository you maintain, though the issue itself is not a security matter or a direct blocker.
- **Next action:** Review and merge your open fix PR #2034, then update the issue with its status.

### 27. flutter/devtools#8223 → predicted 24, priority 0.12
- **Ground truth:** 
- **Model:** This is a feature request in a repository you are not responsible for, and your only involvement is an informational CC from 2024. The recent comment is directed to another contributor, and the latest activity only removed a label; there is no new request for you to act. The issue is old, high-cost, and not actionable on your part.
- **Next action:** Wait for the DevTools maintainers or the reporter to advance the feature request; no action has been asked of you.

### 28. dart-lang/http#1837 → predicted 32, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a contributions-welcome enhancement in dart-lang/http, but you said the Dart team is unlikely to take it on and pointed toward a community implementation. The issue has had no activity for about a year since your reply and P3 labeling, and there is no new request or work directed at you.
- **Next action:** No action is needed now; wait for a community contributor to pick up the issue.

### 29. dart-lang/http#2033 → predicted 35, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You approved the PR two days ago, and there have been no commits or author activity since. There are no unresolved review threads, so nothing remains for you to do unless new activity arrives.
- **Next action:** Wait for the PR author or maintainer to merge it.

### 30. dart-lang/http#1365 → predicted 36, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is a stale performance report in dart-lang/http2, which you are not responsible for, and nobody has asked you to act. The latest comment asks whether the issue should be closed, but it is directed to the issue participants, not you. The old discussion suggests the cause may be outside the http2 package, but there is no new information requiring your involvement.
- **Next action:** No action for you now; the issue is in the http2 area you marked out of scope, and the reporter’s latest question has no response yet.

### 31. dart-lang/tools#2715 → predicted 21, priority 0.20
- **Ground truth:** 
- **Model:** The PR is in dart-lang/tools, where you have no stated responsibility, and the team review request is shared rather than directed personally to you. A specific reviewer, davidmorgan, was also requested, so this is not yours to pick up now; the request is only two days old. The recent collaborator-authored PR is relevant, but it does not make the next action yours.
- **Next action:** Wait for the specifically requested reviewer, davidmorgan, or for a direct request to review you.

### 32. dart-lang/http#2026 → predicted 34, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR changes the http2 area of dart-lang/http, which you explicitly noted is outside your responsibility. The contributor asked mosuem for a review yesterday, and no review or direct request to you is recorded; the recent activity does not make this your action.
- **Next action:** Wait for the requested reviewer, mosuem, to review the PR.

### 33. dart-lang/native#3653 → predicted 33, priority 0.04
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The last activity was the assignee's comment 34 days ago, concluding that a safer autorelease-pool approach may be preferable. You are only mentioned for past input, and nothing new has been directed at you since your comments. The issue is assigned to someone else in a repository outside your stated scope.
- **Next action:** No action is needed now; the issue's assignee is weighing options, and the proposed optimization is considered likely not worth pursuing.

### 34. dart-lang/http#1972 → predicted 26, priority 0.10
- **Ground truth:** 
- **Model:** The issue is labeled needs-info, and your last action was to ask the reporter for details eight days ago; there has been no reply. Although you are assigned, the concrete next step belongs to the reporter. The open PR is likewise labeled needs-info, so it does not make this issue actionable now.
- **Next action:** Wait for the reporter to provide the requested client and reproduction details; the linked PR also needs information.

### 35. dart-lang/http#1841 → predicted 30, priority 0.08
- **Ground truth:** 
- **Model:** PR #2002 is open and covers this issue, so the PR is the item to act on, not the issue itself. The issue is also labeled for a future breaking release, and the recent activity came before your October 5 thumbs-down; nothing since changes your next step.
- **Next action:** Wait for PR #2002 to be reviewed or merged; review that PR rather than acting on this covered issue.

### 36. dart-lang/sdk#38148 → predicted 15, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this issue, and the recent report confirms the bug still reproduces on a current Dart SDK and offers help, giving you a concrete follow-up despite the issue's age. However, the issue is in dart-lang/sdk, outside the repositories you listed as responsible, and the thumbs-down predates the new report; the significant post-thumbs-down reproduction makes it worth reassessing, but not a top-tier commitment.
- **Next action:** Reply to filiph with a focused request for a minimal reproducer and investigate the current recursive-delete implementation.
