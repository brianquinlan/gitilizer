# Gitilizer eval: v5g-gpt-6-luna

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5g.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031305

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.639 ± 0.011 |
| spearman | 0.746 ± 0.026 |
| pairwise_acc | 0.820 ± 0.006 |
| ndcg | 0.966 ± 0.014 |
| ndcg@5 | 0.908 ± 0.081 |
| top3_overlap | 0.778 ± 0.192 |
| top5_overlap | 0.867 ± 0.115 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 4.759 ± 0.225 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.822 ± 0.025 | 0.995 ± 0.001 | 0.867 ± 0.115 | 1.208 ± 0.144 |
| B | 20 | 0.446 ± 0.026 | 0.882 ± 0.060 | 0.467 ± 0.115 | 4.133 ± 0.252 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Investigate whether Dart's Android HttpClient honors Android's mitigations for the compromised eMudhra intermediates, then reply with findings and ensure the issue is tracked or resolved. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Address kevmoo’s review comment by deciding how to preserve the CHANGELOG.md, then update the PR and reply. |
| 3 | 3.7 (3–4) | +0.7 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review Sigurd’s Pub/Sub pre-release PR, focusing on the attribution/version changes and whether the bot’s reported stream issues are relevant to this diff. |
| 4 | 4.7 (3–6) | +0.7 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the first-time contributor’s PR and decide whether the JSON error-code change is correct. |
| 5 | 5.0 (4–6) | +0.0 | 0.64 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel with feedback on the proposed ProtoEnum representation and clarify the next design decision before they implement it. |
| 6 | 9.0 (8–10) | +3.0 | 0.58 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an asynchronous, breaking `Client.close` API and outline the intended semantics for a 2.0 release. |
| 7 | 8.3 (7–10) | +1.3 | 0.58 | 3/3 | dart-lang/http#1981 | B | Continue the implementation you said you started, and update the issue with your proposed API or a draft PR. |
| 8 | 12.7 (11–14) | +4.7 | 0.51 | 2/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo with your recommendation on whether incremental non-SSE JSON handling is worth pursuing, then decide whether to take on the issue. |
| 9 | 13.7 (13–14) | +4.7 | 0.52 | 3/3 | dart-lang/sdk#59846 | B | Assess the HTTP header parsing bug and decide whether to fix it or keep the issue assigned to you. |
| 10 | 12.0 (10–15) | +2.0 | 0.52 | 2/3 | googleapis/google-cloud-dart#361 | A | Follow up with kevmoo on whether to pursue Discovery despite its larger API surface, or implement idiomatic LRO helpers over the existing protobuf-generated API. |
| 11 | 16.0 (16) | +5.0 | 0.28 | 0/3 | dart-lang/sdk#31275 | A | Wait for an owner of dart:io in dart-lang/sdk to take over the abandoned fix; you were only CC’d and no action has been requested from you. |
| 12 | 17.7 (17–18) | +5.7 | 0.23 | 0/3 | dart-lang/native#3752 | B | Wait for your open PR #3763 to be reviewed or merged; track progress on the PR rather than this issue. |
| 13 | 13.0 (12–15) | +0.0 | 0.51 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to address the dependency-version updates manually or through librarian automation, then update the issue or implement the chosen approach. |
| 14 | 19.3 (19–20) | +5.3 | 0.18 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team review; this is a team request, not a personal request to you. |
| 15 | 17.3 (17–18) | +2.3 | 0.24 | 0/3 | googleapis/google-cloud-dart#381 | A | Review and merge the linked fix in PR #382; the issue itself is covered by that open PR. |
| 16 | 25.0 (23–26) | +9.0 ⚠️ | 0.11 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 8.0 (7–9) | -9.0 ⚠️ | 0.59 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the remaining ServiceClient retry/RequestOptions and non-JSON error handling changes, or refine the issue into a scoped implementation plan. |
| 18 | 24.0 (23–25) | +6.0 | 0.12 | 0/3 | dart-lang/http#2031 | A | Wait for the lower stacked PRs to be reviewed and merged before reviewing this release-preparation PR. |
| 19 | 13.3 (12–15) | -5.7 | 0.50 | 3/3 | googleapis/google-cloud-dart#345 | A | Address the outstanding review comments and resolve the dirty merge state, then decide whether to keep developing or close this draft PR. |
| 20 | 22.3 (21–24) | +2.3 | 0.16 | 0/3 | dart-lang/core#1007 | B | Wait for the repository maintainers or the dart-ecosystem-team to review the PR. |
| 21 | 22.0 (21–23) | +1.0 | 0.16 | 0/3 | dart-lang/tools#2544 | B | Wait for the dart-ecosystem-team review to be addressed; this PR is not assigned to you personally. |
| 22 | 22.3 (21–24) | +0.3 | 0.14 | 0/3 | dart-lang/tools#2710 | B | Wait for the lower stacked PR #2563 to be reviewed and advanced; this PR is also only requested from the dart-ecosystem-team, not you personally. |
| 23 | 27.7 (27–29) | +4.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there is no response after about a week. |
| 24 | 25.3 (25–26) | +1.3 | 0.12 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for Sigurd Meldgaard to answer whether the non-Pub/Sub changes have been reviewed; follow up if needed after a reasonable interval. |
| 25 | 28.0 (28) | +3.0 | 0.11 | 0/3 | dart-lang/http#579 | B | Wait for a breaking-release plan or a concrete request to take this forward; the PR is explicitly labeled for a future breaking release. |
| 26 | 7.3 (6–9) | -18.7 ⚠️ | 0.58 | 3/3 | dart-lang/http#1932 | B | Review and merge your open fix PR #2034, then update this issue with the resolution. |
| 27 | 31.7 (30–34) | +4.7 | 0.04 | 0/3 | flutter/devtools#8223 | B | No action is requested of you; wait for the DevTools team to decide whether to pursue the feature. |
| 28 | 33.0 (32–35) | +5.0 | 0.06 | 0/3 | dart-lang/http#1837 | A | Wait for a community contributor to pick up this contributions-welcome enhancement; no follow-up is needed now. |
| 29 | 34.0 (32–35) | +5.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or maintainer to merge it; you have already approved it. |
| 30 | 35.3 (34–36) | +5.3 | 0.02 | 0/3 | dart-lang/http#1365 | A | No action is needed now; the issue is in the http2 area you said you are not responsible for, and the latest question is awaiting a response from the issue participants. |
| 31 | 19.7 (19–20) | -11.3 ⚠️ | 0.19 | 0/3 | dart-lang/tools#2715 | B | Wait for the specifically requested reviewer, davidmorgan, to review the PR. |
| 32 | 31.0 (29–33) | -1.0 | 0.05 | 0/3 | dart-lang/http#2026 | A | Wait for the repository’s responsible reviewer to review the PR; you are not responsible for the http2 area. |
| 33 | 32.0 (30–33) | -1.0 | 0.05 | 0/3 | dart-lang/native#3653 | A | Wait for the issue assignee or maintainers to decide whether to pursue the more complex trampoline or autorelease-pool approach. |
| 34 | 33.7 (31–36) | -0.3 | 0.04 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested details; the linked PR is also marked needs-info. |
| 35 | 28.7 (27–30) | -6.3 | 0.09 | 0/3 | dart-lang/http#1841 | B | Wait for PR #2002 to be reviewed or merged; review it only if you are personally asked or it becomes your responsibility. |
| 36 | 6.3 (3–11) | -29.7 ⚠️ | 0.68 | 3/3 | dart-lang/sdk#38148 | B | Investigate the reproducible macOS failure and reply to filiph with a concrete way to help or a debugging plan. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is now a security concern in the Dart SDK area you own, and the new report of a CA-key compromise is only three days old. The latest comment points to a related mitigation issue, but does not establish that this issue is resolved; as assignee and author, you should verify the impact rather than assume the existing issue covers it. The security guidance puts owned security issues with new activity at 0.9 or higher regardless of age or P3 label.
- **Next action:** Investigate whether Dart's Android HttpClient honors Android's mitigations for the compromised eMudhra intermediates, then reply with findings and ensure the issue is tracked or resolved.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.84
- **Ground truth:** Review feedback needs addressed.
- **Model:** Your PR has an unresolved review comment from kevmoo 21 hours ago, and the PR is blocked pending your response. The comment identifies a potential correctness issue: a later `librarian generate` may delete the newly created CHANGELOG.md. This is fresh feedback on your own PR that you can act on now.
- **Next action:** Address kevmoo’s review comment by deciding how to preserve the CHANGELOG.md, then update the PR and reply.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a non-draft PR in googleapis/google-cloud-dart, a repository you’re responsible for, so you’re the default reviewer even without an explicit request. Sigurd is a close collaborator, and the PR is fresh with review required; the bot’s comments do not replace a human review. The changes are pre-release polish, with no security concern indicated, so this fits the range for reviews waiting on you.
- **Next action:** Review Sigurd’s Pub/Sub pre-release PR, focusing on the attribution/version changes and whether the bot’s reported stream issues are relevant to this diff.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.69
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This PR is in a repository you are responsible for, and no human has reviewed it; as the default reviewer, the next step is yours even though no review was explicitly requested. It is recent and addresses a concrete retryability bug with focused tests, so it sits toward the upper end of the review range, but below collaborator PRs and blocking requests.
- **Next action:** Review the first-time contributor’s PR and decide whether the JSON error-code change is correct.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.58
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your issue in a repository you work in, and the contributor has provided a fresh design proposal that needs your input to move forward. Your last reply invited a preliminary design, so reviewing this proposal is now the concrete next step. It is six months old, which tempers its priority, but the proposal arrived four days ago and directly advances the discussion.
- **Next action:** Reply to Yusufihsangorgel with feedback on the proposed ProtoEnum representation and clarify the next design decision before they implement it.

### 6. dart-lang/http#2027 → predicted 9, priority 0.57
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is your own issue in a repository you work in, filed nine days ago, so it is fresh planned work and nothing is waiting on someone else. The issue proposes a consequential API change, but there is no new activity or evidence that it is urgent; prioritize it as a moderate commitment rather than a review or blocker.
- **Next action:** Decide whether to pursue an asynchronous, breaking `Client.close` API and outline the intended semantics for a 2.0 release.

### 7. dart-lang/http#1981 → predicted 10, priority 0.56
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You explicitly said five hours ago that you started working on this, so it is your current commitment and the next step is yours. It is in dart-lang/http, but your note excludes http2 rather than this CupertinoClient work; the issue is a feature request with no stated urgency. The recent commitment places it in the planned-work range, toward the lower-middle rather than near the top.
- **Next action:** Continue the implementation you said you started, and update the issue with your proposed API or a draft PR.

### 8. googleapis/google-cloud-dart#360 → predicted 13, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator’s issue in a repository you own, and the implementation decision is a clear next step for you; kevmoo has answered your question, so the thread is no longer waiting on them. The reply is 17 days old, which makes it less fresh, and kevmoo explicitly says the issue is not urgent. The issue is still actionable, but the scope and value of incremental JSON streaming need your judgment before implementation.
- **Next action:** Reply to kevmoo with your recommendation on whether incremental non-SSE JSON handling is worth pursuing, then decide whether to take on the issue.

### 9. dart-lang/sdk#59846 → predicted 14, priority 0.52
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned, so this is a concrete next step for you in a core networking area, and no PR or external blocker is reported. However, the issue has been dormant for nearly 22 months with no new activity directed at you, so it sits near the lower end of the range for assigned work.
- **Next action:** Assess the HTTP header parsing bug and decide whether to fix it or keep the issue assigned to you.

### 10. googleapis/google-cloud-dart#361 → predicted 11, priority 0.56
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a recent issue from your close collaborator in a repository you work in, and it presents a clear design decision for you to help resolve. The latest activity is your comment from 16 days ago, so kevmoo is currently waiting on your response; the issue is still fresh planned work, but the broader implementation is not yet agreed upon. Resolve the approach before starting the proposed changes.
- **Next action:** Follow up with kevmoo on whether to pursue Discovery despite its larger API surface, or implement idiomatic LRO helpers over the existing protobuf-generated API.

### 11. dart-lang/sdk#31275 → predicted 16, priority 0.28
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a longstanding production-impacting bug, and a close collaborator recently said they are affected, but their CC to you was informational rather than a direct request. You are not listed as responsible for dart-lang/sdk, and there has been no activity for 20 months; the issue is waiting on an owner to pick up the abandoned change rather than on you.
- **Next action:** Wait for an owner of dart:io in dart-lang/sdk to take over the abandoned fix; you were only CC’d and no action has been requested from you.

### 12. dart-lang/native#3752 → predicted 18, priority 0.23
- **Ground truth:** 
- **Model:** Your open PR #3763 covers this issue, so the PR is the item to act on and this issue should rank well below it. The issue is newly filed and assigned to you, but there has been no new activity since you filed it; the linked PR is the relevant follow-up.
- **Next action:** Wait for your open PR #3763 to be reviewed or merged; track progress on the PR rather than this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 12, priority 0.56
- **Ground truth:** 
- **Model:** This is a collaborator’s issue in a repository you work in, and your comment raised an unresolved decision that is still yours to make. The issue is not blocked on another person, and the dependency constraints need updating before the affected packages are released. Your last activity was 17 days ago, so it remains planned work but is no longer especially fresh.
- **Next action:** Decide whether to address the dependency-version updates manually or through librarian automation, then update the issue or implement the chosen approach.

### 14. dart-lang/tools#2719 → predicted 19, priority 0.18
- **Ground truth:** 
- **Model:** This PR is in a repository you are not identified as responsible for, and the review was requested from a team you belong to rather than from you personally. Team requests in other repositories are low priority; its recent creation and required review do not make it yours to act on.
- **Next action:** Wait for the dart-ecosystem-team review; this is a team request, not a personal request to you.

### 15. googleapis/google-cloud-dart#381 → predicted 17, priority 0.23
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The open PR directly addresses this issue, so the actionable work belongs on the PR rather than the issue. You have no direct request or other role here, and the issue is only a few days old; keep it low on the list while the PR is pending.
- **Next action:** Review and merge the linked fix in PR #382; the issue itself is covered by that open PR.

### 16. dart-lang/http#2034 → predicted 23, priority 0.12
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR, and you requested review from goderbauer only two days ago, so the next step is theirs rather than yours. The PR addresses an assigned issue, but that issue is covered by this open PR. Reassess after roughly a week of silence and ping the reviewer if needed.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is assigned to you in a repository you own, and it describes concrete transport changes you can implement; no blocker or competing owner is indicated. Your recent comment narrowed the scope, but there has been no activity since, so it remains fresh planned work rather than an urgent review or response. The related PRs are merged and do not cover these remaining changes.
- **Next action:** Implement the remaining ServiceClient retry/RequestOptions and non-JSON error handling changes, or refine the issue into a scoped implementation plan.

### 18. dart-lang/http#2031 → predicted 25, priority 0.12
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were personally requested to review this PR in a repository you follow, you noted that you are not responsible for its http2 area. It is also stacked on three open PRs, including #2014, which has no review yet; the lower PRs must be handled first. The stack changed only three days ago, so keep it visible but low until those blockers clear.
- **Next action:** Wait for the lower stacked PRs to be reviewed and merged before reviewing this release-preparation PR.

### 19. googleapis/google-cloud-dart#345 → predicted 15, priority 0.42
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your PR in a repository you own, and the bot identified concrete issues that remain unanswered; the PR is still draft with unresolved review threads and a dirty merge state. However, your last action was to convert it to draft 45 days ago, with no newer activity, so it is stale and does not warrant the higher urgency of fresh blocking feedback.
- **Next action:** Address the outstanding review comments and resolve the dirty merge state, then decide whether to keep developing or close this draft PR.

### 20. dart-lang/core#1007 → predicted 21, priority 0.18
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request, not a personal request, and dart-lang/core is not a repository you are responsible for. The PR is also blocked by the contributor’s pending CLA, so there is no useful action for you now. The issue it fixes does not change that; the latest activity is only three days old, keeping it visible but in the low-priority range.
- **Next action:** Wait for the repository maintainers or the dart-ecosystem-team to review the PR.

### 21. dart-lang/tools#2544 → predicted 22, priority 0.18
- **Ground truth:** 
- **Model:** This is a team review request in a repository you are not responsible for, so it does not require your review personally. The security subject does not override that ownership rule, and the latest activity was two months ago from another reviewer with feedback still unresolved. The author needs to respond to that feedback before the PR can move forward.
- **Next action:** Wait for the dart-ecosystem-team review to be addressed; this PR is not assigned to you personally.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.12
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft and has not had a human review, so this PR cannot usefully be reviewed yet. Your only review involvement is via the shared dart-ecosystem-team request in a repository you do not own, which is not a personal request. Although the PR is recent and from a collaborator, the blocking stack and shared review request keep it in the low range.
- **Next action:** Wait for the lower stacked PR #2563 to be reviewed and advanced; this PR is also only requested from the dart-ecosystem-team, not you personally.

### 23. dart-lang/native#3763 → predicted 29, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, and you requested review from liamappelbe two days ago, so the next step is currently with the reviewer. It is fresh and addresses significant issues, but your recent review request means it belongs in the low-priority range until roughly a week of silence passes.
- **Next action:** Wait for liamappelbe to review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 26, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR, but you requested review from Nate and asked Sigurd four days ago whether the non-Pub/Sub parts were ready to merge. The PR has an approval from Sigurd, but your latest comment indicates you are waiting for his confirmation; there is no new activity since then that calls for you to act immediately. Keep it low while awaiting the response.
- **Next action:** Wait for Sigurd Meldgaard to answer whether the non-Pub/Sub changes have been reviewed; follow up if needed after a reasonable interval.

### 25. dart-lang/http#579 → predicted 28, priority 0.12
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The `next-breaking-release` label blocks action now, and this old PR has had no substantive activity for 14 months; the recent status question does not remove that constraint. Although you were personally asked to review it, the release-plan blocker takes precedence, so it remains low priority.
- **Next action:** Wait for a breaking-release plan or a concrete request to take this forward; the PR is explicitly labeled for a future breaking release.

### 26. dart-lang/http#1932 → predicted 7, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You are assigned to this issue in a repository you work in, and the recent follow-up confirms the problem remains relevant. However, open PR #2034 already covers the issue, so the issue itself is not the main work item; your next step is on the PR. The recent comment raises its freshness, but the issue should remain below the PR.
- **Next action:** Review and merge your open fix PR #2034, then update this issue with the resolution.

### 27. flutter/devtools#8223 → predicted 31, priority 0.06
- **Ground truth:** 
- **Model:** This is an enhancement in flutter/devtools, a repository you are not responsible for, and your only involvement is an old informational CC. The recent activity changed a label but did not direct a request to you or create work for you. The issue is also marked as high cost, so it remains low-priority backlog.
- **Next action:** No action is requested of you; wait for the DevTools team to decide whether to pursue the feature.

### 28. dart-lang/http#1837 → predicted 32, priority 0.06
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a low-priority enhancement in dart-lang/http, an area you are not responsible for, and the issue is marked contributions-welcome. You already replied with a suggested community approach, and nothing has changed since your activity about a year ago.
- **Next action:** Wait for a community contributor to pick up this contributions-welcome enhancement; no follow-up is needed now.

### 29. dart-lang/http#2033 → predicted 35, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** This PR is in dart-lang/http, where you are not responsible for the repository, and your review is already approved with no subsequent author activity. There is nothing for you to do unless the author makes changes or asks for further input.
- **Next action:** Wait for the PR author or maintainer to merge it; you have already approved it.

### 30. dart-lang/http#1365 → predicted 34, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** You have no direct request or prior involvement, and your scope note excludes http2 in dart-lang/http. The issue is stale, and its latest comment asks others to confirm the diagnosis rather than asking you to investigate or respond.
- **Next action:** No action is needed now; the issue is in the http2 area you said you are not responsible for, and the latest question is awaiting a response from the issue participants.

### 31. dart-lang/tools#2715 → predicted 20, priority 0.18
- **Ground truth:** 
- **Model:** This is a review request to the shared dart-ecosystem-team, not a personal request to you, and dart-lang/tools is not a repository you are responsible for. A specific reviewer is also named, so the team request is peripheral. The PR is recent, but its activity does not make the next step yours.
- **Next action:** Wait for the specifically requested reviewer, davidmorgan, to review the PR.

### 32. dart-lang/http#2026 → predicted 33, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** Although this PR is awaiting review and has fresh activity, your repository note explicitly excludes http2, so you are not its default reviewer and nobody has asked you personally to review it. The author has asked mosuem, and the work is in someone else’s area, leaving no useful next step for you.
- **Next action:** Wait for the repository’s responsible reviewer to review the PR; you are not responsible for the http2 area.

### 33. dart-lang/native#3653 → predicted 30, priority 0.08
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This is in dart-lang/native, a repository you are not listed as responsible for, and the issue is assigned to its author. You offered useful technical input, but no one has asked you for further work; the latest activity is over a month old. The related PR has already merged, and the remaining decision and implementation are with the maintainers.
- **Next action:** Wait for the issue assignee or maintainers to decide whether to pursue the more complex trampoline or autorelease-pool approach.

### 34. dart-lang/http#1972 → predicted 36, priority 0.02
- **Ground truth:** 
- **Model:** This issue is labeled needs-info, and your last activity was the request for information, so the next step belongs to the reporter. The open PR covers the issue and is likewise waiting for information. Although you are assigned, there is no useful action until someone responds.
- **Next action:** Wait for the reporter to provide the requested details; the linked PR is also marked needs-info.

### 35. dart-lang/http#1841 → predicted 27, priority 0.12
- **Ground truth:** 
- **Model:** The issue is marked for a future breaking release, and the open PR #2002 already covers it, so the issue itself is not the next work item. You were mentioned with a request to work on it, but that activity predates your thumbs-down and the PR is now the relevant place to act. The issue remains low priority until the PR changes state or you receive a new request.
- **Next action:** Wait for PR #2002 to be reviewed or merged; review it only if you are personally asked or it becomes your responsibility.

### 36. dart-lang/sdk#38148 → predicted 3, priority 0.73
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** This is assigned to you, and the recent report confirms the bug persists in a current SDK and offers help, so you have a clear next step to investigate and respond. The issue is old and there is no direct mention, which tempers freshness, but the new reproducible evidence materially changes what to do. The thumbs-down predates the report, so this post-thumbs-down activity warrants reassessing it.
- **Next action:** Investigate the reproducible macOS failure and reply to filiph with a concrete way to help or a debugging plan.
