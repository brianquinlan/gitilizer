# Gitilizer eval: v5-gpt-6-luna-r2-r2-r2-r2

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031430

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.579 ± 0.007 |
| spearman | 0.700 ± 0.019 |
| pairwise_acc | 0.789 ± 0.003 |
| ndcg | 0.962 ± 0.009 |
| ndcg@5 | 0.899 ± 0.019 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 5.759 ± 0.170 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.772 ± 0.054 | 0.994 ± 0.003 | 0.867 ± 0.115 | 1.417 ± 0.439 |
| B | 20 | 0.351 ± 0.030 | 0.848 ± 0.024 | 0.467 ± 0.115 | 5.100 ± 0.100 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Investigate whether Android’s eMudhra mitigations apply to Dart’s Android trust path, then reply with findings and track any required fix. |
| 2 | 2.3 (2–3) | +0.3 | 0.84 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo’s review question and update the PR to preserve the newly created CHANGELOG.md across generation. |
| 3 | 3.3 (3–4) | +0.3 | 0.74 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm’s Pub/Sub pre-release polish PR and decide whether to approve or request changes. |
| 4 | 4.3 (4–5) | +0.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the first-time contributor’s PR and decide whether the JSON error status-code change is correct. |
| 5 | 7.0 (6–9) | +2.0 | 0.60 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel with a decision on the proposed enum representation and clarify the intended handling of unknown names. |
| 6 | 10.0 (9–11) | +4.0 | 0.58 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an async `Client.close` API change and document the proposed direction or next steps on the issue. |
| 7 | 8.7 (6–12) | +1.7 | 0.59 | 3/3 | dart-lang/http#1981 | B | Continue your implementation of the trust-evaluation hook in dart-lang/http. |
| 8 | 11.7 (9–13) | +3.7 | 0.57 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether incremental JSON-array framing is worth pursuing, then reply to kevmoo with your direction or a concrete follow-up. |
| 9 | 14.3 (13–16) | +5.3 | 0.53 | 3/3 | dart-lang/sdk#59846 | B | Investigate the HTTP header parser and decide whether to implement RFC 9110 character validation. |
| 10 | 11.0 (10–12) | +1.0 | 0.58 | 3/3 | googleapis/google-cloud-dart#361 | A | Reply to kevmoo with your preferred direction—Discovery migration versus adding polling extensions—and, if needed, propose a focused prototype to compare API size and usability. |
| 11 | 16.0 (15–17) | +5.0 | 0.37 | 0/3 | dart-lang/sdk#31275 | A | No action is currently assigned to you; the SDK team or a maintainer should take over the abandoned fix. |
| 12 | 18.7 (18–20) | +6.7 | 0.21 | 0/3 | dart-lang/native#3752 | B | Continue work on PR #3763; this issue is covered by that open fix. |
| 13 | 17.0 (15–20) | +4.0 | 0.34 | 1/3 | googleapis/google-cloud-dart#366 | B | Wait for the `google_cloud_rpc` version bump and the release/automation decision; then update the dependent package constraints and changelogs before publishing. |
| 14 | 21.3 (21–22) | +7.3 | 0.17 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team to review the PR; no individual review was requested from you. |
| 15 | 18.3 (17–19) | +3.3 | 0.21 | 0/3 | googleapis/google-cloud-dart#381 | A | Wait for PR #382 to be reviewed and merged; assess the issue once that fix is resolved. |
| 16 | 24.7 (23–26) | +8.7 | 0.11 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.61 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the assigned ServiceClient retry/RequestOptions support and harden HTML error-response parsing, leaving AIP-4222/AIP-155 work to issue #80. |
| 18 | 25.7 (24–29) | +7.7 | 0.11 | 0/3 | dart-lang/http#2031 | A | Wait for the lower stacked PRs to be reviewed and merged before reviewing this release PR. |
| 19 | 11.0 (10–12) | -8.0 | 0.58 | 3/3 | googleapis/google-cloud-dart#345 | A | Address the outstanding review comments and resolve the PR’s merge conflicts, then update or close the draft. |
| 20 | 28.0 (25–30) | +8.0 | 0.09 | 0/3 | dart-lang/core#1007 | B | Wait for the contributor to complete the CLA; the team review request is not addressed to you personally. |
| 21 | 17.7 (2–27) | -3.3 | 0.39 | 1/3 | dart-lang/tools#2544 | B | Review the updated security PR and respond to lrhn’s outstanding feedback, including the helper validation and edge-case tests. |
| 22 | 27.3 (23–32) | +5.3 | 0.11 | 0/3 | dart-lang/tools#2710 | B | Wait for the unreviewed base PR #2563 to be reviewed; this stacked PR cannot be reviewed effectively yet. |
| 23 | 27.0 (26–28) | +4.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there is no response after about a week. |
| 24 | 18.3 (14–26) | -5.7 | 0.29 | 2/3 | googleapis/google-cloud-dart#373 | B | Follow up with Natebosch for the requested review, or ask whether you can merge without it. |
| 25 | 28.7 (28–30) | +3.7 | 0.10 | 0/3 | dart-lang/http#579 | B | Wait for a breaking-release plan; the PR is explicitly labeled `next-breaking-release` and the contributor has not replied to the recent workaround question. |
| 26 | 14.0 (5–19) | -12.0 ⚠️ | 0.39 | 1/3 | dart-lang/http#1932 | B | Review and merge PR #2034, which is the open fix for this issue; no separate action is needed on the issue meanwhile. |
| 27 | 22.7 (17–30) | -4.3 | 0.17 | 0/3 | flutter/devtools#8223 | B | Wait for the DevTools maintainers or contributor to advance the feature request; no action is assigned to you. |
| 28 | 34.3 (31–36) | +6.3 | 0.04 | 0/3 | dart-lang/http#1837 | A | No action is needed now; the issue is marked contributions-welcome and you already directed the reporter toward a community implementation. |
| 29 | 35.3 (35–36) | +6.3 | 0.02 | 0/3 | dart-lang/http#2033 | A | Wait for the PR to be merged; you have already approved it and nothing has changed since. |
| 30 | 27.3 (14–34) | -2.7 | 0.21 | 1/3 | dart-lang/http#1365 | A | No action is needed now; the issue is outside your stated http2 scope and is awaiting confirmation from the reporter before it can be closed. |
| 31 | 21.3 (20–22) | -9.7 ⚠️ | 0.17 | 0/3 | dart-lang/tools#2715 | B | Wait for the specifically requested reviewer, davidmorgan, to review the PR. |
| 32 | 32.7 (31–35) | +0.7 | 0.04 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem to review the PR; revisit if it remains unreviewed after about a week. |
| 33 | 32.0 (31–33) | -1.0 | 0.04 | 0/3 | dart-lang/native#3653 | A | Wait for liamappelbe or the maintainers to decide whether to pursue the more complex trampoline approach. |
| 34 | 33.3 (33–34) | -0.7 | 0.03 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested client and reproduction details; the linked PR is also marked needs-info. |
| 35 | 25.7 (23–29) | -9.3 ⚠️ | 0.11 | 0/3 | dart-lang/http#1841 | B | Wait for the open PR #2002 to be reviewed or merged; review it only if you are personally asked or it becomes your responsibility. |
| 36 | 7.0 (5–8) | -29.0 ⚠️ | 0.63 | 3/3 | dart-lang/sdk#38148 | B | Investigate the reproducible macOS deletion failure and reply to Filiph with a concrete debugging path or fix plan. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.94
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security-related issue in the Dart SDK area you own, and it is assigned to you; a new report explicitly raises potential exposure after a recent CA compromise. The latest activity is only three days old, and even though another commenter linked a related mitigation issue, you still need to confirm whether this issue is resolved or requires action. Security concerns in your owned code outrank ordinary work.
- **Next action:** Investigate whether Android’s eMudhra mitigations apply to Dart’s Android trust path, then reply with findings and track any required fix.

### 2. googleapis/librarian#7808 → predicted 3, priority 0.84
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR, and kevmoo left an unresolved review question 21 hours ago that you need to address; the PR is blocked pending review. The recent collaborator feedback is fresh and points to a concrete behavior that could undermine the fix, so it deserves high attention, though it is below the most urgent blocking cases.
- **Next action:** Reply to kevmoo’s review question and update the PR to preserve the newly created CHANGELOG.md across generation.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.74
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in google-cloud-dart, a repository you’re responsible for, so you are the default reviewer despite no explicit review request. It is from usual collaborator sigurdm, and no human has reviewed it yet; the bot review does not count. The PR is recent, so review it now, with collaborator PRs ahead of less urgent reviews.
- **Next action:** Review sigurdm’s Pub/Sub pre-release polish PR and decide whether to approve or request changes.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open, non-draft PR in a repository you’re responsible for, and no human has reviewed it; the bot review does not count. It is recent and addresses a concrete retry-behavior bug with tests, so it merits timely review, though it is not a security issue and the repository is relatively small.
- **Next action:** Review the first-time contributor’s PR and decide whether the JSON error status-code change is correct.

### 5. googleapis/google-cloud-dart#252 → predicted 9, priority 0.58
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your own issue in a repository you work in, and the recent design proposal gives you a concrete decision to make. It is older than the two-week window for fresh self-filed planned work, so it does not get the higher planned-work score, but the discussion is active and your response can unblock the contributor. The next step is yours rather than waiting on someone else.
- **Next action:** Reply to Yusufihsangorgel with a decision on the proposed enum representation and clarify the intended handling of unknown names.

### 6. dart-lang/http#2027 → predicted 10, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is your own issue filed nine days ago in a repository you work in, with no blocker or request for input, so it qualifies as fresh planned work. The issue raises a potentially broad breaking API decision, but has no new activity and the next step is still yours; it merits moderate priority rather than review-level urgency.
- **Next action:** Decide whether to pursue an async `Client.close` API change and document the proposed direction or next steps on the issue.

### 7. dart-lang/http#1981 → predicted 6, priority 0.62
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is in a repository you work in, is assigned to you, and your recent comment says you have started working on it, making it an active commitment. The request concerns TLS trust evaluation, but it is a feature request rather than a reported security vulnerability, so the security priority override does not apply. Recent activity supports keeping it toward the top of the planned-work range.
- **Next action:** Continue your implementation of the trust-evaluation hook in dart-lang/http.

### 8. googleapis/google-cloud-dart#360 → predicted 13, priority 0.56
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator’s issue in a repository you care about, and kevmoo’s recent reply leaves your question unresolved while clarifying the potential benefit. There is no assignment or explicit commitment, but your next step can unblock deciding whether to implement the proposed behavior. The author says it is not urgent, so this is moderate rather than high priority.
- **Next action:** Decide whether incremental JSON-array framing is worth pursuing, then reply to kevmoo with your direction or a concrete follow-up.

### 9. dart-lang/sdk#59846 → predicted 14, priority 0.52
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned this issue in the Dart SDK, so the next step is yours even though the report is old and has had no recent activity. Invalid header names can create interoperability risks, but this is not identified as a security issue and there is no fresh information raising its urgency.
- **Next action:** Investigate the HTTP header parser and decide whether to implement RFC 9110 character validation.

### 10. googleapis/google-cloud-dart#361 → predicted 11, priority 0.58
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator’s issue in a repository you work in, and your latest question has been answered; the decision about the approach is now yours to make. The thread has been quiet for 16 days, so it is not urgent, but resolving the design choice would unblock the next step. The existing generated operations are usable, making this planned work rather than a high-impact breakage.
- **Next action:** Reply to kevmoo with your preferred direction—Discovery migration versus adding polling extensions—and, if needed, propose a focused prototype to compare API size and usability.

### 11. dart-lang/sdk#31275 → predicted 16, priority 0.26
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a stale issue in dart-lang/sdk, a repository you are not listed as responsible for, and there is no direct request for you to implement or review a fix. You were only CC'd, including by close collaborator kevmoo, but that activity is now 20 months old. The underlying production-impacting bug matters, so it remains above an ordinary dormant mention, but there is no fresh action for you.
- **Next action:** No action is currently assigned to you; the SDK team or a maintainer should take over the abandoned fix.

### 12. dart-lang/native#3752 → predicted 18, priority 0.22
- **Ground truth:** 
- **Model:** You created and assigned this issue six days ago, which would make it fresh planned work. However, open PR #3763 directly addresses the problem, so the issue itself is a duplicate to track rather than act on. Focus your attention on the PR instead.
- **Next action:** Continue work on PR #3763; this issue is covered by that open fix.

### 13. googleapis/google-cloud-dart#366 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** The issue explicitly depends on a future `google_cloud_rpc` version, so there is no immediate fix to make until that prerequisite exists. You commented 17 days ago that you were considering the general automation approach, but there has been no newer activity, and the related Pub/Sub change has already merged. Keep this below work that is unblocked and actionable.
- **Next action:** Wait for the `google_cloud_rpc` version bump and the release/automation decision; then update the dependent package constraints and changelogs before publishing.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.18
- **Ground truth:** 
- **Model:** This is a recent team review request, not a personal request, and dart-lang/tools is not one of your stated repositories of responsibility. As a member of that team, you could review it, but the shared request does not make the next step yours; the PR is also blocked pending review.
- **Next action:** Wait for the dart-ecosystem-team to review the PR; no individual review was requested from you.

### 15. googleapis/google-cloud-dart#381 → predicted 17, priority 0.22
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The open PR #382 directly covers this issue, so the PR—not the issue—is the item to act on. The issue is only three days old, but no new activity asks you to verify or respond, and its fix is already in progress elsewhere.
- **Next action:** Wait for PR #382 to be reviewed and merged; assess the issue once that fix is resolved.

### 16. dart-lang/http#2034 → predicted 26, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR, but you requested a named reviewer only two days ago and there has been no review activity since. The next step is currently theirs, so this belongs in the low range for a PR awaiting a recently requested review. The linked issue is assigned to you, but this PR covers it, so the PR is the item to track.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.61
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue in a repository you own, assigned to you, with clear implementation work and no external blocker. Your recent comment narrowed its scope, so the next step is to proceed with the remaining transport and error-handling changes. It is a fresh planned commitment, though less urgent than a waiting review or a blocking request.
- **Next action:** Implement the assigned ServiceClient retry/RequestOptions support and harden HTML error-response parsing, leaving AIP-4222/AIP-155 work to issue #80.

### 18. dart-lang/http#2031 → predicted 24, priority 0.12
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were personally requested to review this PR, it is stacked on PR #2014, which has not been reviewed, so the stack is blocked upstream. The repository note also says you are not responsible for http2; the recent request does not override the stack dependency.
- **Next action:** Wait for the lower stacked PRs to be reviewed and merged before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 12, priority 0.58
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft PR in a repository you work in, with no reviewer currently holding up the next step. The review bot identified concrete example and test problems, and the PR is marked dirty; those remain for you to address. Although this was your planned work, it has been inactive for 45 days, so it is below fresh commitments and reviews awaiting you.
- **Next action:** Address the outstanding review comments and resolve the PR’s merge conflicts, then update or close the draft.

### 20. dart-lang/core#1007 → predicted 29, priority 0.08
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in a repository you are not listed as responsible for, so it is not yours to review by default. The CLA check also says the PR cannot be looked at until the first-time contributor signs the agreement, and there has been no activity resolving that blocker.
- **Next action:** Wait for the contributor to complete the CLA; the team review request is not addressed to you personally.

### 21. dart-lang/tools#2544 → predicted 2, priority 0.94
- **Ground truth:** 
- **Model:** This is a security-mitigation PR, and it is in the package_config area of a Dart tooling repository; the stated UNC path issue can expose users to SMB credential theft. The PR has not been reviewed by you, and lrhn’s latest review left concrete changes and tests to address, so the team review request is actionable despite being two months old. Security work stays at the top of the scale.
- **Next action:** Review the updated security PR and respond to lrhn’s outstanding feedback, including the helper validation and edge-case tests.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.16
- **Ground truth:** 
- **Model:** Although the author is a close collaborator and the PR is recent, it is only requested from the dart-ecosystem-team, not from you personally, and this repository is not one you are responsible for. More importantly, it is stacked on draft PR #2563, which has not received a human review, so the lower PR needs attention first.
- **Next action:** Wait for the unreviewed base PR #2563 to be reviewed; this stacked PR cannot be reviewed effectively yet.

### 23. dart-lang/native#3763 → predicted 27, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your own PR, and you requested a review from liamappelbe only two days ago, so the next step is with the reviewer rather than you. The request is recent and there has been no newer activity requiring action; keep it low until roughly a week of silence has passed.
- **Next action:** Wait for liamappelbe to review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 15, priority 0.28
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** You asked Sigurdm four days ago whether the PR was ready to merge and whether the non-Pub/Sub changes had been reviewed; there is no reply shown. Natebosch is also the requested reviewer, and your recent comment indicates you are waiting on review rather than needing to make a code change now. The PR has Sigurdm's approval, but your recent unanswered follow-up makes a modest follow-up worthwhile.
- **Next action:** Follow up with Natebosch for the requested review, or ask whether you can merge without it.

### 25. dart-lang/http#579 → predicted 28, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR is blocked by the `next-breaking-release` label, and you last said you lacked bandwidth to coordinate a major release. The recent question is directed at the author, not you, so there is no new action for you. Although you are personally requested as reviewer, the release-plan block and 14 months of inactivity keep it in the blocked range.
- **Next action:** Wait for a breaking-release plan; the PR is explicitly labeled `next-breaking-release` and the contributor has not replied to the recent workaround question.

### 26. dart-lang/http#1932 → predicted 19, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** The issue is assigned to you and has a recent request for an update, but open PR #2034 already covers it, so the PR—not this issue—is the item to act on. The latest comment is fresh, but it does not make the duplicate issue actionable; keep it in the low range until the PR is resolved.
- **Next action:** Review and merge PR #2034, which is the open fix for this issue; no separate action is needed on the issue meanwhile.

### 27. flutter/devtools#8223 → predicted 30, priority 0.08
- **Ground truth:** 
- **Model:** This is an old feature request in a repository you do not own, with no assignment or direct request to you. Your only mention was an informational CC from 2024, and the recent activity merely removed a label; it does not create a new task for you. The feature is also marked high-cost, so it remains low-priority backlog.
- **Next action:** Wait for the DevTools maintainers or contributor to advance the feature request; no action is assigned to you.

### 28. dart-lang/http#1837 → predicted 36, priority 0.02
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a non-security enhancement in dart-lang/http, where you are not responsible for the repository, and it has had no activity since your reply a year ago. The contributions-welcome label and your prior response indicate the next step is with the community, not you.
- **Next action:** No action is needed now; the issue is marked contributions-welcome and you already directed the reporter toward a community implementation.

### 29. dart-lang/http#2033 → predicted 35, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** This PR is in a repository you follow, and the author is a usual collaborator, but you approved it two days ago with no subsequent activity. There is nothing for you to do unless new activity or a request arrives.
- **Next action:** Wait for the PR to be merged; you have already approved it and nothing has changed since.

### 30. dart-lang/http#1365 → predicted 34, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** You explicitly noted that you are not responsible for http2, and nobody has asked you directly to act. The issue is stale, and its latest question asks whether the reporter can confirm the root cause rather than assigning work to you. The reporter’s earlier update also suggested the cause was in their adapter, not the package.
- **Next action:** No action is needed now; the issue is outside your stated http2 scope and is awaiting confirmation from the reporter before it can be closed.

### 31. dart-lang/tools#2715 → predicted 22, priority 0.18
- **Ground truth:** 
- **Model:** This is a team review request in a repository you do not own, and a specific reviewer was also requested, so it is not yours to review. The collaborator's PR is recent, but its next step is with the named reviewer; the bot review does not count as a human review.
- **Next action:** Wait for the specifically requested reviewer, davidmorgan, to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in the http2 area, which you explicitly said you are not responsible for, and the contributor directly asked mosuem—not you—to review it. It is therefore outside your scope with no action requested of you, despite the recent update.
- **Next action:** Wait for mosuem to review the PR; revisit if it remains unreviewed after about a week.

### 33. dart-lang/native#3653 → predicted 31, priority 0.04
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to liamappelbe, who is driving it, and the latest comment says the change may not be worth pursuing; there is no direct request for you to act. The related PR has already been merged, but the discussion identifies that it does not implement the required protocol. Your earlier comments predate the latest activity, so there is no fresh action for you.
- **Next action:** Wait for liamappelbe or the maintainers to decide whether to pursue the more complex trampoline approach.

### 34. dart-lang/http#1972 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** This issue is explicitly labeled needs-info after you asked the reporter for details, and there has been no reply. The open PR covering the issue is itself waiting on information, so there is no useful next step for you now; the issue belongs near the bottom of the scale.
- **Next action:** Wait for the reporter to provide the requested client and reproduction details; the linked PR is also marked needs-info.

### 35. dart-lang/http#1841 → predicted 25, priority 0.12
- **Ground truth:** 
- **Model:** The issue is labeled for a future breaking release, and PR #2002 already covers the request, so the PR—not this issue—is where work should happen. The recent proposal and commit references were activity from before your October 5 thumbs-down and do not reset it; there has been no significant activity since. Nothing currently calls for action from you on the issue.
- **Next action:** Wait for the open PR #2002 to be reviewed or merged; review it only if you are personally asked or it becomes your responsibility.

### 36. dart-lang/sdk#38148 → predicted 8, priority 0.61
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this issue, and Filiph’s recent confirmation on Dart 3.13.5 provides new information to check; they also directly ask how they can help. Although the issue is old, the new report came after your thumbs-down, so it merits action. It is a non-security bug, so it ranks below urgent security work and active blockers.
- **Next action:** Investigate the reproducible macOS deletion failure and reply to Filiph with a concrete debugging path or fix plan.
