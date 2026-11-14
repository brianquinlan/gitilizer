# Gitilizer eval: v5h-gpt-6-luna

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5h.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031837

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.615 ± 0.070 |
| spearman | 0.721 ± 0.064 |
| pairwise_acc | 0.807 ± 0.035 |
| ndcg | 0.960 ± 0.015 |
| ndcg@5 | 0.880 ± 0.013 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 4.889 ± 0.801 |

**1 item scoring(s) failed** — see results.json.

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.750 ± 0.088 | 0.993 ± 0.006 | 0.867 ± 0.115 | 1.333 ± 0.591 |
| B | 20 | 0.449 ± 0.054 | 0.862 ± 0.043 | 0.533 ± 0.115 | 4.067 ± 0.473 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Investigate whether Dart's Android TLS path honors Android's current revocations and blocklists, then respond to the new security concern with findings or a mitigation plan. |
| 2 | 2.3 (2–3) | +0.3 | 0.84 | 3/3 | googleapis/librarian#7808 | A | Resolve kevmoo’s review comment about preserving the generated CHANGELOG.md, then update the PR and reply. |
| 3 | 3.7 (3–5) | +0.7 | 0.71 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm’s Pub/Sub pre-release polish PR in googleapis/google-cloud-dart. |
| 4 | 5.0 (4–6) | +1.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 and decide whether to approve or request changes. |
| 5 | 5.7 (4–7) | +0.7 | 0.64 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel’s proposed representation with design guidance and clarify the remaining unknown-name behavior before implementation proceeds. |
| 6 | 9.3 (9–10) | +3.3 | 0.57 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue asynchronous `Client.close` semantics and outline the intended breaking-change path. |
| 7 | 7.7 (7–9) | +0.7 | 0.59 | 3/3 | dart-lang/http#1981 | B | Continue implementing the trust-evaluation hook in dart-lang/http#1981 and assess the API design. |
| 8 | 12.7 (10–16) | +4.7 | 0.51 | 2/3 | googleapis/google-cloud-dart#360 | A | Decide whether incremental JSON-array parsing is needed and reply to kevmoo with the direction or a concrete follow-up. |
| 9 | 13.7 (13–15) | +4.7 | 0.52 | 3/3 | dart-lang/sdk#59846 | B | Investigate the HTTP header parser behavior and decide how to fix or prioritize the validation bug. |
| 10 | 13.0 (11–15) | +3.0 | 0.50 | 2/3 | googleapis/google-cloud-dart#361 | A | Decide whether to pursue Discovery despite the larger API surface, or ask kevmoo to explore idiomatic polling helpers for the existing proto-generated API. |
| 11 | 23.0 (12–31) | +12.0 ⚠️ | 0.24 | 1/3 | dart-lang/sdk#31275 | A | No action is currently directed to you; wait for a direct request or new activity. |
| 12 | 17.0 (17) | +5.0 | 0.24 | 0/3 | dart-lang/native#3752 | B | Wait for your open PR #3763 to be reviewed or merged; the issue itself is covered by that PR. |
| 13 | 12.3 (11–14) | -0.7 | 0.46 | 2/3 | googleapis/google-cloud-dart#366 | B | Wait for the release/version bump plan to be settled, then update the storage and Pub/Sub dependency constraints and changelogs as appropriate. |
| 14 | 18.7 (18–19) | +4.7 | 0.18 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team review; no individual review was requested from you. |
| 15 | 17.3 (16–18) | +2.3 | 0.22 | 0/3 | googleapis/google-cloud-dart#381 | A | Wait for PR #382 to be reviewed and merged; track that PR rather than acting on this issue. |
| 16 | 26.0 (25–27) | +10.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 9.0 (8–11) | -8.0 | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the remaining ServiceClient retry/RequestOptions support and harden ServiceException handling for non-JSON gateway responses. |
| 18 | 22.7 (22–24) | +4.7 | 0.15 | 0/3 | dart-lang/http#2031 | A | Wait for the lower stacked PRs to be reviewed and merged before reviewing this release-preparation PR. |
| 19 | 14.3 (14–15) | -4.7 | 0.41 | 3/3 | googleapis/google-cloud-dart#345 | A | Fix the outstanding review findings and merge conflicts, then move the DNS support PR out of draft when it is ready for review. |
| 20 | 21.3 (20–23) | +1.3 | 0.18 | 0/3 | dart-lang/core#1007 | B | Wait for a personal review request or take no action; the repository team request is shared, not assigned to you individually. |
| 21 | 15.7 (2–24) | -5.3 | 0.43 | 1/3 | dart-lang/tools#2544 | B | Wait for the author to address lrhn’s review feedback; the team review request is not assigned to you personally. |
| 22 | 22.0 (21–23) | +0.0 | 0.16 | 0/3 | dart-lang/tools#2710 | B | Wait for the lower stacked PR #2563 to be reviewed before reviewing this PR. |
| 23 | 27.0 (26–28) | +4.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for Liam Appelbe to review; follow up if there is no response after about a week. |
| 24 | 25.7 (25–27) | +1.7 | 0.11 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for Sigurdm to respond to your question about whether the non-Pub/Sub changes have been reviewed; follow up if needed. |
| 25 | 28.3 (28–29) | +3.3 | 0.08 | 0/3 | dart-lang/http#579 | B | Wait for the breaking-release plan or a maintainer to take this forward; revisit only when that plan changes. |
| 26 | 11.3 (8–16) | -14.7 ⚠️ | 0.47 | 2/3 | dart-lang/http#1932 | B | Review and advance your open PR #2034, which addresses this issue, then close the issue if the fix resolves it. |
| 27 | 29.0 (24–32) | +2.0 | 0.06 | 0/3 | flutter/devtools#8223 | B | No action is requested of you; wait for someone to ask you directly or for work to be assigned in a repository you own. |
| 28 | 33.3 (30–35) | +5.3 | 0.03 | 0/3 | dart-lang/http#1837 | A | No action is needed unless the reporter or another contributor replies with new information. |
| 29 | 33.0 (33) | +4.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or maintainer to merge it; you have already approved it. |
| 30 | 34.0 (32–36) | +4.0 | 0.02 | 0/3 | dart-lang/http#1365 | A | No action for you; the issue is about http2, an area you are not responsible for, and the latest question has not been directed to you. |
| 31 | 19.7 (19–20) | -11.3 ⚠️ | 0.18 | 0/3 | dart-lang/tools#2715 | B | Wait for the specifically requested reviewer, davidmorgan, to review; no action is needed from you as a team reviewer. |
| 32 | 27.7 (23–30) | -4.3 | 0.07 | 0/3 | dart-lang/http#2026 | A | Wait for the requested review from mosuem; you are not responsible for the http2 area of dart-lang/http. |
| 33 | 31.3 (29–36) | -1.7 | -0.30 | 0/2 | dart-lang/native#3653 | A | Classified: OpenAI 400: {
  "error": {
    "message": "Invalid prompt: your prompt was flagged as potentially violating our usage policy. Please try again with a different prompt: https://platform.openai.com/docs/guides/reasoning#advice-on-prompting",
    "type": "invalid_request_error",
    "param": null,
    "code": "inv |
| 34 | 33.7 (32–35) | -0.3 | 0.02 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested client and reproduction details; the linked PR is also marked needs-info. |
| 35 | 33.7 (31–36) | -1.3 | 0.02 | 0/3 | dart-lang/http#1841 | B | Wait for PR #2002 to be reviewed or merged; the issue is also marked for a future breaking release. |
| 36 | 5.0 (4–6) | -31.0 ⚠️ | 0.69 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph with a concrete reproduction/debugging request and investigate the recent reproducible failure. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.94
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue in a repository you own, and you are the assignee and original author. The recent report raises a potentially active risk involving compromised CA keys, so the age and P3 label do not reduce its urgency; the latest reply only points to a related issue and does not resolve whether Dart is protected. Verify the exposure and ensure the issue is tracked or closed only once the security status is clear.
- **Next action:** Investigate whether Dart's Android TLS path honors Android's current revocations and blocklists, then respond to the new security concern with findings or a mitigation plan.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.84
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your open PR, and kevmoo left a recent, unresolved review comment asking for a design decision. The next step is yours; resolving the comment will unblock review and keep the PR moving.
- **Next action:** Resolve kevmoo’s review comment about preserving the generated CHANGELOG.md, then update the PR and reply.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.73
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open, non-draft PR in a repository you’re responsible for, so you are the default reviewer even though no review was explicitly requested. It is recent and authored by a usual collaborator; the only review so far is from a bot, which does not substitute for your review. Review the changes and checks before the package moves toward release.
- **Next action:** Review sigurdm’s Pub/Sub pre-release polish PR in googleapis/google-cloud-dart.

### 4. googleapis/google-cloud-dart#382 → predicted 6, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open, unreviewed PR in google-cloud-dart, a repository you are responsible for, so you are the default reviewer even though no review was explicitly requested. It is a recent contribution from a first-time contributor, and the only review so far is from a bot; review it while the change is fresh.
- **Next action:** Review PR #382 and decide whether to approve or request changes.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your issue in a repository you own, and the contributor has posted a new design proposal four days ago that needs your review. Your recent comments invited a preliminary design before extensive implementation, so reviewing it now is the next step and can unblock their work. The item is actionable and fresh, but it is not a direct question explicitly blocking a release or a security concern.
- **Next action:** Reply to Yusufihsangorgel’s proposed representation with design guidance and clarify the remaining unknown-name behavior before implementation proceeds.

### 6. dart-lang/http#2027 → predicted 9, priority 0.57
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is your own issue, filed 9 days ago in an area you work in, with no one else currently blocking progress; it qualifies as fresh planned work. The discussion affects a widely used HTTP package and frames a potentially significant API decision, but there is no new activity that raises its urgency. Your note says you are not responsible for `http2`, but this issue concerns general `Client.close` semantics, not that excluded area.
- **Next action:** Decide whether to pursue asynchronous `Client.close` semantics and outline the intended breaking-change path.

### 7. dart-lang/http#1981 → predicted 7, priority 0.59
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned yourself and explicitly said you have started working on this, so this is your planned work rather than something waiting on the reporter. The issue is in a repository you follow, but your note says you are not responsible for http2; this certificate-trust request is not identified as http2, and the recent commitment makes it actionable. It is 54 days old, so it is not in the fresh-issue range, but your update five hours ago signals current work; the feature is useful but not an acute security report.
- **Next action:** Continue implementing the trust-evaluation hook in dart-lang/http#1981 and assess the API design.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is in a repository you’re interested in, and kevmoo is a close collaborator; the thread leaves an unresolved design decision that you raised, so a response can move it forward. The collaborator explicitly says it is not urgent, and there has been no activity for 17 days, keeping it near the lower end of the range for actionable collaborator issues.
- **Next action:** Decide whether incremental JSON-array parsing is needed and reply to kevmoo with the direction or a concrete follow-up.

### 9. dart-lang/sdk#59846 → predicted 13, priority 0.52
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this open bug in `dart:io`, an area within your stated interests, so the next step is yours rather than waiting on someone else. The issue reports acceptance of invalid header-name characters that can cause proxy interoperability problems, but it has been dormant for about 22 months with no new information directed at you. That makes it a stale assigned task in the 0.5–0.65 range, toward the lower end.
- **Next action:** Investigate the HTTP header parser behavior and decide how to fix or prioritize the validation bug.

### 10. googleapis/google-cloud-dart#361 → predicted 11, priority 0.56
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator's issue in a repository you own, and it needs your product/technical judgment on the proposed direction. Your last comment raised the tradeoff, but there has been no reply for 16 days, so the thread is somewhat stale; the next useful step is still yours rather than waiting on a reviewer or a blocked PR.
- **Next action:** Decide whether to pursue Discovery despite the larger API surface, or ask kevmoo to explore idiomatic polling helpers for the existing proto-generated API.

### 11. dart-lang/sdk#31275 → predicted 26, priority 0.12
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a stale, unresolved SDK issue in a repository you are not listed as responsible for, and the last activity was 20 months ago. The mentions from parlough and kevmoo were informational CCs, not requests, so there is no immediate work for you despite the collaborator's interest and the reported production impact.
- **Next action:** No action is currently directed to you; wait for a direct request or new activity.

### 12. dart-lang/native#3752 → predicted 17, priority 0.22
- **Ground truth:** 
- **Model:** The linked open PR you authored covers this issue, so the next actionable work is on the PR rather than the issue. The issue is recent and assigned to you, but duplicate guidance keeps it in the low range while its fix is under review.
- **Next action:** Wait for your open PR #3763 to be reviewed or merged; the issue itself is covered by that PR.

### 13. googleapis/google-cloud-dart#366 → predicted 14, priority 0.28
- **Ground truth:** 
- **Model:** This is a collaborator’s issue in a repository you care about, but your last comment says you were deciding on a general fix, and there has been no new activity since then. The required google_cloud_rpc release/version bump is a prerequisite, so the concrete package updates are not ready to do yet. Keep it below work that is actionable now.
- **Next action:** Wait for the release/version bump plan to be settled, then update the storage and Pub/Sub dependency constraints and changelogs as appropriate.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.18
- **Ground truth:** 
- **Model:** This PR is in a repository you are not responsible for, and the review request is to a team you belong to rather than to you personally. It is recent, but the team request does not make it your next step; the PR can proceed through the shared review queue.
- **Next action:** Wait for the dart-ecosystem-team review; no individual review was requested from you.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.22
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The linked open PR directly fixes this issue, so the actionable work is on the PR and this issue should remain low priority. You have not been asked to act, and this is a recent report from a non-collaborator in a repository you watch rather than own.
- **Next action:** Wait for PR #382 to be reviewed and merged; track that PR rather than acting on this issue.

### 16. dart-lang/http#2034 → predicted 27, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR, but you requested a review from goderbauer only two days ago, so the next step is theirs rather than yours. The PR fixes an issue in an area you work in, but the recent review request puts it in the low-priority waiting-on-reviewer range.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is assigned to you in a repository you own, and the collaborator’s issue has concrete implementation work. Your latest comment narrowed the scope but did not hand off the remaining work; the issue is still a fresh planned commitment, though its last activity was your own comment 10 days ago. The deleted AIP-4222/AIP-155 scope is tracked separately, so focus on the retry and response-parsing changes here.
- **Next action:** Implement the remaining ServiceClient retry/RequestOptions support and harden ServiceException handling for non-JSON gateway responses.

### 18. dart-lang/http#2031 → predicted 22, priority 0.16
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were personally requested to review this small PR in a repository you follow, you noted that you are not responsible for its http2 area. More importantly, it is stacked on three open PRs, including one with no review yet, so those need to proceed first. The request is only a few days old; there is no action for you until the stack is unblocked.
- **Next action:** Wait for the lower stacked PRs to be reviewed and merged before reviewing this release-preparation PR.

### 19. googleapis/google-cloud-dart#345 → predicted 15, priority 0.28
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your PR, and it has unresolved review threads plus a dirty merge state, so there is work you can do without waiting. However, you explicitly converted it to draft and there has been no activity for about 45 days; it is a stale draft rather than an active blocker, keeping it in the low-priority range.
- **Next action:** Fix the outstanding review findings and merge conflicts, then move the DNS support PR out of draft when it is ready for review.

### 20. dart-lang/core#1007 → predicted 20, priority 0.18
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request to dart-ecosystem-team, not a personal request, and dart-lang/core is not listed among the repositories you own. The PR also has a blocked mergeable state and the CLA check is awaiting the contributor, so there is no immediate step for you. It was opened 15 days ago and has had no recent activity directed at you.
- **Next action:** Wait for a personal review request or take no action; the repository team request is shared, not assigned to you individually.

### 21. dart-lang/tools#2544 → predicted 21, priority 0.18
- **Ground truth:** 
- **Model:** This is a security-mitigation PR, but it is in dart-lang/tools, outside the repositories you’re responsible for, and the review was requested only from dart-ecosystem-team. The latest activity is lrhn’s review comments from two months ago, so the PR is currently waiting on the author rather than you; the security context does not make this a personal review task.
- **Next action:** Wait for the author to address lrhn’s review feedback; the team review request is not assigned to you personally.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.14
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still an open draft and has not received a human review, so the lower PR must move first. The only review request is to the dart-ecosystem-team, not personally to you, and dart-lang/tools is outside the repositories you are responsible for. The recent updates do not change that blocker.
- **Next action:** Wait for the lower stacked PR #2563 to be reviewed before reviewing this PR.

### 23. dart-lang/native#3763 → predicted 28, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** You opened this PR two days ago and requested Liam’s review, with no reviewer activity since. The next step is with the reviewer, so there is nothing useful for you to do yet; the request is still recent. Although the PR fixes issues assigned to you, those issues are covered by this open PR and do not need separate action right now.
- **Next action:** Wait for Liam Appelbe to review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 25, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR, but you requested a review and asked Sigurdm a question four days ago, so the next step is with the reviewer rather than you. The PR is approved and there has been no reply to your latest question; it has not yet been a week, so a follow-up is not due. Reassess after the reviewer responds or about a week of silence.
- **Next action:** Wait for Sigurdm to respond to your question about whether the non-Pub/Sub changes have been reviewed; follow up if needed.

### 25. dart-lang/http#579 → predicted 29, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The `next-breaking-release` label blocks action now, and the proposed API change was previously deferred until a coordinated major release. Although you are personally requested as reviewer, that request is old and the PR has been inactive for 14 months; the recent workaround question does not remove the release blocker. You also said you lack bandwidth to coordinate a major release.
- **Next action:** Wait for the breaking-release plan or a maintainer to take this forward; revisit only when that plan changes.

### 26. dart-lang/http#1932 → predicted 10, priority 0.56
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You are assigned to this issue in dart-lang/http, an area you work in, so it remains your responsibility; the recent update also shows users are still asking for resolution. However, open PR #2034 already covers the issue, so the PR is the actionable item and this issue itself should rank lower than that PR rather than be treated as separate implementation work.
- **Next action:** Review and advance your open PR #2034, which addresses this issue, then close the issue if the fix resolves it.

### 27. flutter/devtools#8223 → predicted 24, priority 0.12
- **Ground truth:** 
- **Model:** You are only mentioned in an informational CC from 2024, and the recent activity is a label change rather than a request to you. This is a feature request in flutter/devtools, a repository you are not responsible for, and its high-cost label and age make it low-priority backlog for you.
- **Next action:** No action is requested of you; wait for someone to ask you directly or for work to be assigned in a repository you own.

### 28. dart-lang/http#1837 → predicted 35, priority 0.02
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already replied that this is unlikely to be taken on by the Dart team and pointed to a community-led path. The issue is a year old, has no new activity since your reply, and is marked contributions-welcome; it is in a repository you follow but are not responsible for this area.
- **Next action:** No action is needed unless the reporter or another contributor replies with new information.

### 29. dart-lang/http#2033 → predicted 33, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** This PR is in a repository you are not responsible for, and you approved it two days ago with no subsequent activity. There are no unresolved review threads or changes to recheck, so there is nothing for you to do now.
- **Next action:** Wait for the PR author or maintainer to merge it; you have already approved it.

### 30. dart-lang/http#1365 → predicted 34, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** Your only role is watching the repository, and your scope explicitly excludes http2. The thread is also stale, with no mention or request for you, so the recent question from another commenter does not create work for you.
- **Next action:** No action for you; the issue is about http2, an area you are not responsible for, and the latest question has not been directed to you.

### 31. dart-lang/tools#2715 → predicted 19, priority 0.18
- **Ground truth:** 
- **Model:** You are requested only through the dart-ecosystem-team, not personally, and this is a repository you are not responsible for. The author also requested davidmorgan specifically, so this is a shared team review request rather than a task assigned to you. It is recent and from a usual collaborator, but those factors do not make it actionable under the review-request rules.
- **Next action:** Wait for the specifically requested reviewer, davidmorgan, to review; no action is needed from you as a team reviewer.

### 32. dart-lang/http#2026 → predicted 30, priority 0.06
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in the http2 area you explicitly said you are not responsible for, and its author asked mosuem—not you—to review it. The recent activity is directed at mosuem, so there is no action for you right now.
- **Next action:** Wait for the requested review from mosuem; you are not responsible for the http2 area of dart-lang/http.

### 33. dart-lang/native#3653 → predicted 36, priority -1.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Error:** Classified: OpenAI 400: {
  "error": {
    "message": "Invalid prompt: your prompt was flagged as potentially violating our usage policy. Please try again with a different prompt: https://platform.openai.com/docs/guides/reasoning#advice-on-prompting",
    "type": "invalid_request_error",
    "param": null,
    "code": "inv

### 34. dart-lang/http#1972 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** The issue is explicitly blocked by the needs-info label, and you have already asked the reporter for details with no reply. The linked open PR is itself waiting for information, so the issue has no independent next step for you; its recent update does not unblock it.
- **Next action:** Wait for the reporter to provide the requested client and reproduction details; the linked PR is also marked needs-info.

### 35. dart-lang/http#1841 → predicted 31, priority 0.04
- **Ground truth:** 
- **Model:** This issue is explicitly deferred to a future breaking release, and an open PR (#2002) now addresses it. The recent @mention was an informational request from the contributor, who says they want to work on the issue; it does not ask you to act. The mention and activity are after your thumbs-down, but the release-blocking label and covering PR leave no useful next step for you on the issue.
- **Next action:** Wait for PR #2002 to be reviewed or merged; the issue is also marked for a future breaking release.

### 36. dart-lang/sdk#38148 → predicted 5, priority 0.70
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this old, still-open SDK issue, and the recent report from filiph confirms it on the current stable SDK and offers help; that is new information to verify and a useful opportunity to move the investigation forward. The latest human activity is 24 days old, so it is not as urgent as a fresh blocker, but this is a recurring filesystem failure in widely used SDK code. The thumbs-down predates the new report, so the report merits reassessing the issue.
- **Next action:** Reply to filiph with a concrete reproduction/debugging request and investigate the recent reproducible failure.
