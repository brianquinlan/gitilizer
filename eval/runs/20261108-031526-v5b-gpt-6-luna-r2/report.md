# Gitilizer eval: v5b-gpt-6-luna-r2

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5b.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031526

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.545 ± 0.042 |
| spearman | 0.686 ± 0.045 |
| pairwise_acc | 0.772 ± 0.021 |
| ndcg | 0.967 ± 0.011 |
| ndcg@5 | 0.918 ± 0.036 |
| top3_overlap | 0.778 ± 0.192 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.767 ± 0.058 |
| mean_abs_displacement | 5.630 ± 0.479 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.683 ± 0.060 | 0.990 ± 0.003 | 0.867 ± 0.115 | 1.792 ± 0.260 |
| B | 20 | 0.372 ± 0.024 | 0.859 ± 0.049 | 0.600 ± 0.000 | 4.400 ± 0.200 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 3/3 | dart-lang/sdk#48056 | A | Investigate whether Dart HttpClient on Android honors the eMudhra compromise mitigations and update the issue with the security impact or a remediation plan. |
| 2 | 2.0 (2) | +0.0 | 0.86 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo’s review comment and update the PR to ensure the generated CHANGELOG.md survives the next `librarian generate`. |
| 3 | 3.7 (3–4) | +0.7 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm’s open Pub/Sub release-polish PR, including the bot’s reported async-stream cancellation and error-handling concerns. |
| 4 | 4.0 (3–5) | +0.0 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the first-time contributor’s PR in google-cloud-dart. |
| 5 | 8.3 (6–10) | +3.3 | 0.59 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel’s proposed representation with design feedback and agree on the next step before implementation. |
| 6 | 8.3 (7–10) | +2.3 | 0.58 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an async `Client.close` as a breaking change and document the intended semantics in this issue. |
| 7 | 8.0 (7–9) | +1.0 | 0.58 | 3/3 | dart-lang/http#1981 | B | Continue the implementation you said you started, and evaluate the proposed trust-evaluation API in a skeleton PR. |
| 8 | 11.0 (9–12) | +3.0 | 0.57 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether incremental non-SSE JSON parsing is in scope, then either implement the streaming/error handling or ask kevmoo to clarify the expected server behavior. |
| 9 | 13.7 (13–14) | +4.7 | 0.49 | 3/3 | dart-lang/sdk#59846 | B | Investigate the HTTP header parser and fix or unassign the issue if it is outside your scope. |
| 10 | 10.7 (7–14) | +0.7 | 0.58 | 3/3 | googleapis/google-cloud-dart#361 | A | Decide whether to pursue Discovery despite its larger API surface, or ask kevmoo to evaluate adding polling convenience extensions to the existing protobuf output. |
| 11 | 29.3 (25–32) | +18.3 ⚠️ | 0.08 | 0/3 | dart-lang/sdk#31275 | A | No immediate action; this is a stale issue in dart-lang/sdk, a repository outside your stated responsibility, and no one has asked you to take it on. |
| 12 | 17.3 (16–19) | +5.3 | 0.23 | 0/3 | dart-lang/native#3752 | B | Wait for PR #3763 to be reviewed or merged; follow up on that PR if needed. |
| 13 | 12.0 (11–13) | -1.0 | 0.56 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide and implement the dependency-version update for google_cloud_storage and google_cloud_pubsub, including changelog entries before publishing. |
| 14 | 19.7 (19–20) | +5.7 | 0.17 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team review; this is a shared team request, not a personal review request. |
| 15 | 17.0 (16–18) | +2.0 | 0.23 | 0/3 | googleapis/google-cloud-dart#381 | A | Wait for PR #382, which is already proposed to fix this issue. |
| 16 | 26.0 (25–27) | +10.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 7.3 (5–11) | -9.7 ⚠️ | 0.60 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the remaining ServiceClient retry/RequestOptions and non-JSON error handling work, coordinating generated-client changes as needed. |
| 18 | 25.3 (23–30) | +7.3 | 0.11 | 0/3 | dart-lang/http#2031 | A | Wait for the lower stacked PRs (#2010, #2014, and #2009) to be reviewed or merged before reviewing this release PR. |
| 19 | 12.3 (8–16) | -6.7 | 0.50 | 3/3 | googleapis/google-cloud-dart#345 | A | Address the outstanding review comments and resolve the PR’s dirty merge state, or abandon the draft if DNS support is no longer planned. |
| 20 | 29.3 (21–34) | +9.3 ⚠️ | 0.06 | 0/3 | dart-lang/core#1007 | B | Wait for the contributor to complete the CLA requirement; then the PR can be reviewed. |
| 21 | 14.0 (3–21) | -7.0 | 0.37 | 1/3 | dart-lang/tools#2544 | B | Wait for the dart-ecosystem-team or the PR author to address the review feedback; no personal review was requested. |
| 22 | 26.7 (22–29) | +4.7 | 0.09 | 0/3 | dart-lang/tools#2710 | B | Wait for the stacked base PR #2563 to be reviewed and unblocked; the team review request is not assigned to you personally. |
| 23 | 27.0 (26–28) | +4.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there has been no response after about a week. |
| 24 | 23.7 (23–24) | -0.3 | 0.12 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for Sigurdm or Nate Bosch to respond to your review-scope question; follow up after about a week if needed. |
| 25 | 26.7 (25–28) | +1.7 | 0.11 | 0/3 | dart-lang/http#579 | B | Wait for the breaking-release plan to change; the latest question is directed at the maintainers, not specifically at you. |
| 26 | 15.7 (15–17) | -10.3 ⚠️ | 0.26 | 0/3 | dart-lang/http#1932 | B | Wait for your open fix PR #2034 to be reviewed or merged, then verify whether it resolves this issue. |
| 27 | 17.3 (15–19) | -9.7 ⚠️ | 0.26 | 0/3 | flutter/devtools#8223 | B | Wait for the DevTools team or reporter to advance the feature; no action is currently requested from you. |
| 28 | 34.7 (33–36) | +6.7 | 0.03 | 0/3 | dart-lang/http#1837 | A | No action is needed unless the reporter or another contributor replies with new information. |
| 29 | 34.7 (32–36) | +5.7 | 0.01 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or a maintainer to merge it; you have already approved it. |
| 30 | 33.3 (31–35) | +3.3 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action for now; the issue is waiting for someone with relevant http2 expertise to confirm the root cause and close or update it. |
| 31 | 21.0 (20–22) | -10.0 ⚠️ | 0.14 | 0/3 | dart-lang/tools#2715 | B | Wait for the specifically requested reviewer, davidmorgan, to review the PR. |
| 32 | 25.3 (22–28) | -6.7 | 0.10 | 0/3 | dart-lang/http#2026 | A | Wait for the requested reviewer, mosuem, to review the PR; you are not responsible for http2. |
| 33 | 28.7 (24–32) | -4.3 | 0.08 | 0/3 | dart-lang/native#3653 | A | Wait for liamappelbe or the repository maintainers to decide whether to pursue the trampoline/autorelease-pool approach; no change is currently requested from you. |
| 34 | 34.0 (33–35) | +0.0 | 0.02 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested client and reproduction details; the linked PR is also marked needs-info. |
| 35 | 30.0 (29–31) | -5.0 | 0.08 | 0/3 | dart-lang/http#1841 | B | Wait for PR #2002 to be reviewed or merged; the issue is also marked for a future breaking release. |
| 36 | 7.0 (5–10) | -29.0 ⚠️ | 0.63 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph with a request for a minimal reproducer and investigate the macOS recursive-delete failure. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 2/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security concern in the Dart SDK code you own, with new activity three days ago connecting the Android trust behavior to compromised CA keys. The referenced issue about distrusting those intermediates was recently closed, but that does not resolve whether this Android path honors the mitigations; verifying the exposure and closing the loop is your responsibility. The security impact keeps this at the top of the scale despite the old issue and P3 label.
- **Next action:** Investigate whether Dart HttpClient on Android honors the eMudhra compromise mitigations and update the issue with the security impact or a remediation plan.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.86
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your open PR, and kevmoo left an unanswered review question 21 hours ago that identifies a functional issue; you are currently blocking the PR from moving forward. Addressing the feedback is more urgent than waiting on the requested team review, and the recent activity makes this a fresh, high-priority commitment.
- **Next action:** Reply to kevmoo’s review comment and update the PR to ensure the generated CHANGELOG.md survives the next `librarian generate`.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in a repository you’re responsible for, so you are the default reviewer even though no review was explicitly requested. The collaborator’s PR has had no human review, and the bot surfaced potentially serious behavior issues; reviewing it is a concrete next step you can take now. The activity is recent, putting it toward the upper end of the review range.
- **Next action:** Review sigurdm’s open Pub/Sub release-polish PR, including the bot’s reported async-stream cancellation and error-handling concerns.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open PR in a repository you are responsible for, and no human has reviewed it yet; you are the default reviewer even without a named request. The change has a concrete retry-behavior fix and includes tests, while the only review so far was from a bot. It was opened three days ago, so it is still fresh, though it is not a security issue or a collaborator’s PR.
- **Next action:** Review the first-time contributor’s PR in google-cloud-dart.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.61
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your recently filed issue in a repository you work in, so it remains fresh planned work despite being six months old; the new design proposal four days ago makes the next step yours. The proposed nullable number/string representation is a concrete decision to review, and the active contributor is waiting for agreement before investing in implementation. It is useful work but not an urgent blocker or security issue.
- **Next action:** Reply to Yusufihsangorgel’s proposed representation with design feedback and agree on the next step before implementation.

### 6. dart-lang/http#2027 → predicted 8, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is your own issue, filed nine days ago in an area you work in, with no external dependency or blocker; it counts as fresh planned work. The proposal affects an important public API, but there is no new activity or urgent request, so it belongs in the middle of the planned-work range.
- **Next action:** Decide whether to pursue an async `Client.close` as a breaking change and document the intended semantics in this issue.

### 7. dart-lang/http#1981 → predicted 7, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is assigned to you in a repository you follow, and your recent comment says you have started working on it, so there is a clear next step on your side. The issue is a non-security feature request from a non-collaborator, which keeps it in the planned-work range rather than making it urgent. Your activity five hours ago makes it fresh, but it is not a newly filed issue.
- **Next action:** Continue the implementation you said you started, and evaluate the proposed trust-evaluation API in a skeleton PR.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.58
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is in a repository you own, filed by a close collaborator, and the next step is yours; kevmoo has answered your question, so there is no blocker. The issue is recent enough to count as planned work, but kevmoo explicitly says it is not urgent and the incremental-JSON requirement remains uncertain, keeping it in the lower part of the 0.5–0.65 range.
- **Next action:** Decide whether incremental non-SSE JSON parsing is in scope, then either implement the streaming/error handling or ask kevmoo to clarify the expected server behavior.

### 9. dart-lang/sdk#59846 → predicted 14, priority 0.37
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned, so there is a possible next step for you, and accepting invalid header-name characters can cause proxy interoperability or security problems. However, this is an old issue in dart-lang/sdk, a repository you have not identified as one you own, and there has been no activity for about 22 months. That makes it a low-priority assignment rather than urgent work.
- **Next action:** Investigate the HTTP header parser and fix or unassign the issue if it is outside your scope.

### 10. googleapis/google-cloud-dart#361 → predicted 11, priority 0.57
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a recent issue from a close collaborator in a repository you work in, and the discussion identifies a concrete design decision for you to resolve. Your last comment raised the tradeoff, but kevmoo has not replied since, so you can still decide or follow up rather than wait on new information. It is planned work of moderate importance, not an urgent blocker.
- **Next action:** Decide whether to pursue Discovery despite its larger API surface, or ask kevmoo to evaluate adding polling convenience extensions to the existing protobuf output.

### 11. dart-lang/sdk#31275 → predicted 25, priority 0.12
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a serious production bug, but your mentions were informational CCs asking about library ownership, not direct requests to fix or review it. The last activity was 20 months ago, and the abandoned patch was owned by someone else. Since the SDK is outside your stated repository scope, there is no current step for you to take.
- **Next action:** No immediate action; this is a stale issue in dart-lang/sdk, a repository outside your stated responsibility, and no one has asked you to take it on.

### 12. dart-lang/native#3752 → predicted 16, priority 0.25
- **Ground truth:** 
- **Model:** The open PR #3763 directly addresses this issue, so the PR—not the issue—is the item to act on. The issue is only six days old, but no new activity requires a separate check; keep it in the low duplicate range below the PR.
- **Next action:** Wait for PR #3763 to be reviewed or merged; follow up on that PR if needed.

### 13. googleapis/google-cloud-dart#366 → predicted 12, priority 0.55
- **Ground truth:** 
- **Model:** This is a collaborator's issue in a repository you work in, and the listed dependency updates are clear work for you; no open PR covers it. Your comment 17 days ago says you are considering the general fix, so it remains an actionable commitment, though there has been no newer activity and it is not urgent.
- **Next action:** Decide and implement the dependency-version update for google_cloud_storage and google_cloud_pubsub, including changelog entries before publishing.

### 14. dart-lang/tools#2719 → predicted 19, priority 0.18
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository you do not list as one you are responsible for, and the review request is to a team you belong to rather than to you personally. It was opened less than a day ago, but freshness does not make a shared team request individually actionable.
- **Next action:** Wait for the dart-ecosystem-team review; this is a shared team request, not a personal review request.

### 15. googleapis/google-cloud-dart#381 → predicted 17, priority 0.24
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The open PR #382 directly covers the issue, so the PR—not this issue—is the actionable item. No one has asked you to review or respond, and you have no stated ownership action on the issue itself. Keep it low in the duplicate-covered range.
- **Next action:** Wait for PR #382, which is already proposed to fix this issue.

### 16. dart-lang/http#2034 → predicted 26, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** You own this PR, but you requested review from goderbauer only two days ago, so the next step is theirs. It is not blocked by an unaddressed review or feedback from you. The related issue is assigned to you, but this PR covers it, so focus on the PR rather than duplicate work on the issue.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 5, priority 0.62
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is assigned to you in a repository you own, and the collaborator’s issue has clear implementation steps. Your recent comment narrowed the scope, so the next step is still yours; this is fresh planned work, though it has been quiet for 10 days and is not a security issue.
- **Next action:** Implement the remaining ServiceClient retry/RequestOptions and non-JSON error handling work, coordinating generated-client changes as needed.

### 18. dart-lang/http#2031 → predicted 23, priority 0.12
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were personally requested to review this PR in a repository you follow, you noted that you are not responsible for its http2 area. More importantly, it is stacked on several open PRs, so those need to move first; the review request is recent, and no follow-up is due yet.
- **Next action:** Wait for the lower stacked PRs (#2010, #2014, and #2009) to be reviewed or merged before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 13, priority 0.55
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft in a repository you work in, and it has unanswered review feedback, so it is still yours to move forward. However, the review and your last activity are 45 days old, and the PR is explicitly in draft with no recent activity, which lowers its urgency. The substantial change makes a decision to finish or abandon it more useful than leaving it stalled.
- **Next action:** Address the outstanding review comments and resolve the PR’s dirty merge state, or abandon the draft if DNS support is no longer planned.

### 20. dart-lang/core#1007 → predicted 34, priority 0.02
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is in dart-lang/core, which is outside the repositories you are responsible for, and the request is to the dart-ecosystem-team rather than to you personally. The PR is also blocked by the contributor's outstanding CLA requirement, so there is no useful action for you now.
- **Next action:** Wait for the contributor to complete the CLA requirement; then the PR can be reviewed.

### 21. dart-lang/tools#2544 → predicted 21, priority 0.18
- **Ground truth:** 
- **Model:** This is a security-related change, but the PR is in a repository you are not responsible for and the only review request is to a team you belong to, not to you personally. The named reviewer has left substantial feedback, and there has been no activity for about two months, so there is no clear action for you now; the security nature does not make an unassigned team request yours.
- **Next action:** Wait for the dart-ecosystem-team or the PR author to address the review feedback; no personal review was requested.

### 22. dart-lang/tools#2710 → predicted 29, priority 0.08
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is outside your stated responsibility, and the request is to the dart-ecosystem-team rather than to you directly. It is also stacked on #2563, which remains a draft and has not been reviewed by a human, so this PR is blocked regardless. Recent activity does not change who needs to act next.
- **Next action:** Wait for the stacked base PR #2563 to be reviewed and unblocked; the team review request is not assigned to you personally.

### 23. dart-lang/native#3763 → predicted 27, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, but you requested a review from liamappelbe only two days ago, so the next step is theirs rather than yours. The PR addresses a performance issue and is fresh, but your recent review request means it belongs in the low-priority waiting range for now.
- **Next action:** Wait for liamappelbe to review; follow up if there has been no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 24, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** You asked Sigurdm four days ago whether the non-Pub/Sub changes were reviewed, and Nate is also the assigned reviewer; the next step is currently theirs, not yours. The PR has recent activity and your question may unblock a decision, but you only recently requested review, so it remains low priority while awaiting a response.
- **Next action:** Wait for Sigurdm or Nate Bosch to respond to your review-scope question; follow up after about a week if needed.

### 25. dart-lang/http#579 → predicted 28, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The `next-breaking-release` label blocks this PR, and your last reply said you lack bandwidth to coordinate a major release. The recent workaround question does not make you the next owner, and the PR has been inactive for 14 months. Although you are personally requested as a reviewer, the release block and stale activity keep this low priority.
- **Next action:** Wait for the breaking-release plan to change; the latest question is directed at the maintainers, not specifically at you.

### 26. dart-lang/http#1932 → predicted 15, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** Open PR #2034 already covers the Cronet namespace duplication, so the PR—not this issue—is the actionable item. The recent status request does not change that; keep this issue in the low range until the PR lands, then verify the fix.
- **Next action:** Wait for your open fix PR #2034 to be reviewed or merged, then verify whether it resolves this issue.

### 27. flutter/devtools#8223 → predicted 18, priority 0.22
- **Ground truth:** 
- **Model:** You were only CC'd on this issue in a repository you are not listed as responsible for, and the mention was informational and over two years ago. The recent label change does not ask you to act, and the feature is marked high-cost; there is no direct question or assignment for you.
- **Next action:** Wait for the DevTools team or reporter to advance the feature; no action is currently requested from you.

### 28. dart-lang/http#1837 → predicted 33, priority 0.03
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already replied that this is not work the Dart team is likely to take on and pointed to a community implementation path. The issue has had no activity for about a year since your response, and it is marked contributions-welcome in a repository where you are not responsible for this area.
- **Next action:** No action is needed unless the reporter or another contributor replies with new information.

### 29. dart-lang/http#2033 → predicted 36, priority 0.01
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** This PR is in dart-lang/http, where you are not responsible for the repository, and you have already approved it with no activity since. There are no unresolved review threads or changes requiring your follow-up, so there is nothing for you to do now.
- **Next action:** Wait for the PR author or a maintainer to merge it; you have already approved it.

### 30. dart-lang/http#1365 → predicted 31, priority 0.04
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is in the http2 area of dart-lang/http, which you noted you are not responsible for, and you have not been personally asked to act. The latest question is directed generally and has been unanswered for eight months; the original reporter's follow-up suggests their own slowdown was caused by how data was sent, not the http2 package. There is no fresh activity requiring your attention.
- **Next action:** No action for now; the issue is waiting for someone with relevant http2 expertise to confirm the root cause and close or update it.

### 31. dart-lang/tools#2715 → predicted 20, priority 0.18
- **Ground truth:** 
- **Model:** This is a team review request in a repository you do not own, and a specific reviewer was also requested, so it is not waiting on you personally. The request is only two days old; the bot review does not change that. The work is in a string_scanner package and is unrelated to your stated repositories.
- **Next action:** Wait for the specifically requested reviewer, davidmorgan, to review the PR.

### 32. dart-lang/http#2026 → predicted 22, priority 0.12
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in dart-lang/http's http2 area, which you explicitly said you are not responsible for, and its author requested review from mosuem rather than you. The recent update and the fix for a real bug do not change that the next step is someone else's; the PR is therefore low priority for you.
- **Next action:** Wait for the requested reviewer, mosuem, to review the PR; you are not responsible for http2.

### 33. dart-lang/native#3653 → predicted 32, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to liamappelbe, and the latest update says the proposed fix may not be worth pursuing; it does not ask you to take action. The related PR has already been merged, and the discussion has been inactive for over a month. Your earlier comments are not a new request for work.
- **Next action:** Wait for liamappelbe or the repository maintainers to decide whether to pursue the trampoline/autorelease-pool approach; no change is currently requested from you.

### 34. dart-lang/http#1972 → predicted 35, priority 0.02
- **Ground truth:** 
- **Model:** The issue is labeled needs-info, and your request for information has not been answered, so there is no useful work to do on it right now. An open PR covers the issue and is also waiting for information, making the issue itself a duplicate to track below the PR. The recent activity was your own request and label, not new information from the reporter.
- **Next action:** Wait for the reporter to provide the requested client and reproduction details; the linked PR is also marked needs-info.

### 35. dart-lang/http#1841 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** The open PR #2002 covers this issue, so the PR—not the issue—is where work should happen. The issue is blocked by the next-breaking-release label, and you marked it thumbs-down on Oct 5; the later PR activity does not request action from you on this issue. Nothing here currently calls for you to act.
- **Next action:** Wait for PR #2002 to be reviewed or merged; the issue is also marked for a future breaking release.

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.58
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this Dart SDK issue, and the recent report from filiph confirms it still reproduces on the current SDK and offers help, so there is a concrete follow-up you can take. The issue is old and was marked thumbs-down before this new report, but that recent, relevant information postdates the thumbs-down and makes it worth revisiting. It is not a security issue or a direct blocker, so it stays in the planned-work range.
- **Next action:** Reply to filiph with a request for a minimal reproducer and investigate the macOS recursive-delete failure.
