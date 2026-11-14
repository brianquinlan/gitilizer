# Gitilizer eval: v5a-gpt-6-luna

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5a.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030114

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.579 ± 0.030 |
| spearman | 0.692 ± 0.035 |
| pairwise_acc | 0.789 ± 0.015 |
| ndcg | 0.964 ± 0.002 |
| ndcg@5 | 0.877 ± 0.008 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.222 ± 0.056 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.733 ± 0.067 | 0.993 ± 0.003 | 0.800 ± 0.000 | 1.542 ± 0.191 |
| B | 20 | 0.439 ± 0.016 | 0.815 ± 0.014 | 0.600 ± 0.000 | 4.200 ± 0.265 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Assess whether Dart/Flutter Android TLS is affected by the eMudhra compromise, and respond with findings or route this to the security team. |
| 2 | 2.0 (2) | +0.0 | 0.84 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo’s review comment and update the PR to address the CHANGELOG.md cleanup issue. |
| 3 | 3.0 (3) | +0.0 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm’s Pub/Sub release-polish PR and leave feedback or approve it. |
| 4 | 4.3 (4–5) | +0.3 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the PR and approve it or request changes. |
| 5 | 7.0 (6–8) | +2.0 | 0.62 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel with feedback on the proposed ProtoEnum representation and clarify the design you want before they proceed with a PR. |
| 6 | 9.0 (9) | +3.0 | 0.58 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an async `Client.close` as a breaking change and, if so, outline the intended semantics for a 2.0 release. |
| 7 | 7.7 (7–8) | +0.7 | 0.58 | 3/3 | dart-lang/http#1981 | B | Continue your implementation of the trust-evaluation hook in CupertinoClient. |
| 8 | 12.0 (12) | +4.0 | 0.56 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether incremental JSON-array framing is warranted, then reply to kevmoo with the scope or implement the mid-stream error handling. |
| 9 | 14.0 (14) | +5.0 | 0.54 | 3/3 | dart-lang/sdk#59846 | B | Investigate the HTTP header parser and fix it to reject characters outside RFC 9110’s tchar set, adding regression tests. |
| 10 | 10.7 (10–11) | +0.7 | 0.56 | 3/3 | googleapis/google-cloud-dart#361 | A | Decide whether to pursue Discovery despite the larger API surface or ask kevmoo to explore an operations convenience-extension approach. |
| 11 | 28.0 (15–35) | +17.0 ⚠️ | 0.11 | 0/3 | dart-lang/sdk#31275 | A | Wait for the Dart SDK library owner to take over and implement the abandoned fix; this issue is outside your stated areas of responsibility. |
| 12 | 17.0 (17) | +5.0 | 0.21 | 0/3 | dart-lang/native#3752 | B | Review and advance your open PR #3763, which already covers this issue. |
| 13 | 17.3 (15–19) | +4.3 | 0.23 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the `google_cloud_rpc` release/version bump; then update the storage and Pub/Sub dependency constraints and changelogs before publishing. |
| 14 | 19.3 (19–20) | +5.3 | 0.18 | 0/3 | dart-lang/tools#2719 | B | Wait for a member of the dart-ecosystem-team to review the PR. |
| 15 | 15.7 (15–16) | +0.7 | 0.23 | 0/3 | googleapis/google-cloud-dart#381 | A | Wait for PR #382 to be reviewed and merged; evaluate the issue against that fix afterward. |
| 16 | 22.7 (22–23) | +6.7 | 0.11 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 7.7 (6–10) | -9.3 ⚠️ | 0.61 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the remaining ServiceClient retry/RequestOptions support and robust handling of non-JSON error responses. |
| 18 | 28.0 (27–30) | +10.0 ⚠️ | 0.08 | 0/3 | dart-lang/http#2031 | A | Wait for the stacked lower PRs to be reviewed and merged before reviewing this release PR. |
| 19 | 13.0 (13) | -6.0 | 0.55 | 3/3 | googleapis/google-cloud-dart#345 | A | Update the PR for the unresolved review feedback, resolve the merge conflict, and decide whether to return it to ready for review or close it. |
| 20 | 20.0 (18–21) | +0.0 | 0.16 | 0/3 | dart-lang/core#1007 | B | Wait for the dart-ecosystem-team review; this team request is not assigned to you personally. |
| 21 | 22.7 (20–28) | +1.7 | 0.14 | 0/3 | dart-lang/tools#2544 | B | Wait for the author to address lrhn’s review feedback; review again once there are new commits or replies. |
| 22 | 24.0 (22–26) | +2.0 | 0.11 | 0/3 | dart-lang/tools#2710 | B | Wait for the lower stacked PR #2563 to be reviewed; this PR is blocked until then. |
| 23 | 24.3 (23–26) | +1.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there is no response after about a week. |
| 24 | 15.3 (10–25) | -8.7 | 0.41 | 3/3 | googleapis/google-cloud-dart#373 | B | Follow up with Nate or Sigurdm for the outstanding review, then address any feedback and update the PR. |
| 25 | 26.7 (24–30) | +1.7 | 0.09 | 0/3 | dart-lang/http#579 | B | Wait for a planned breaking-release decision or for someone to ask you to review or coordinate this PR again. |
| 26 | 13.3 (6–18) | -12.7 ⚠️ | 0.36 | 1/3 | dart-lang/http#1932 | B | Review and merge PR #2034; this issue is covered by that open PR. |
| 27 | 32.0 (31–33) | +5.0 | 0.04 | 0/3 | flutter/devtools#8223 | B | No action is needed from you now; the recent discussion is directed to bkonyi, and the issue is in a repository you do not own. |
| 28 | 32.7 (31–34) | +4.7 | 0.04 | 0/3 | dart-lang/http#1837 | A | Wait for a community contributor to take up the contributions-welcome issue. |
| 29 | 34.0 (30–36) | +5.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Wait for the PR author or maintainer to merge it; you have already approved it. |
| 30 | 35.0 (34–36) | +5.0 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action for you now; the http2 maintainer or issue author should confirm the root cause and close the issue if appropriate. |
| 31 | 22.7 (21–25) | -8.3 | 0.11 | 0/3 | dart-lang/tools#2715 | B | Wait for the specifically requested reviewer, davidmorgan; the team request is shared and does not require your review. |
| 32 | 32.7 (31–35) | +0.7 | 0.03 | 0/3 | dart-lang/http#2026 | A | Wait for the requested collaborator, mosuem, to review the PR; you are not responsible for the http2 area. |
| 33 | 31.0 (28–33) | -2.0 | 0.05 | 0/3 | dart-lang/native#3653 | A | Wait for the issue assignee/team to decide whether to pursue trampoline changes or rely on autorelease pools. |
| 34 | 28.7 (28–29) | -5.3 | 0.08 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested client details and reproduction; the linked fix PR is also marked needs-info. |
| 35 | 27.0 (25–29) | -8.0 | 0.09 | 0/3 | dart-lang/http#1841 | B | Wait for PR #2002 to be reviewed or merged; the issue is covered by that open PR. |
| 36 | 4.7 (4–5) | -31.3 ⚠️ | 0.69 | 3/3 | dart-lang/sdk#38148 | B | Respond to filiph with a debugging direction or reproduce the failure and investigate the recursive-delete implementation. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 2/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.94
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is now a security concern involving potentially compromised intermediate CA keys, and the recent reporter explicitly asked whether Dart honors Android's mitigations. You are the issue's author and assignee, and the latest activity is new; the reference to a related fix does not resolve this issue or eliminate the need to verify the impact.
- **Next action:** Assess whether Dart/Flutter Android TLS is affected by the eMudhra compromise, and respond with findings or route this to the security team.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.84
- **Ground truth:** Review feedback needs addressed.
- **Model:** Kevmoo left a recent, unresolved review comment on your PR, so the next step is yours and the PR is currently blocked. The comment identifies a concrete behavior that could undo the fix on the next generate, and resolving it will unblock review. This is important work, though not a security issue or a direct request that blocks an external contributor, so it falls below the highest priority tier.
- **Next action:** Reply to kevmoo’s review comment and update the PR to address the CHANGELOG.md cleanup issue.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.74
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in google-cloud-dart, a repository you are responsible for, and it has no human review; bot feedback does not count, so reviewing it is on you. The author is a usual collaborator and the PR is recent, which raises its priority. The review feedback shown concerns a separate earlier PR and does not indicate this PR is blocked.
- **Next action:** Review sigurdm’s Pub/Sub release-polish PR and leave feedback or approve it.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open PR in a repository you are responsible for, so you are the default reviewer; the bot review does not count. It is fresh, and the change affects retry behavior with focused tests. The author is a first-time contributor, so it ranks below a comparable PR from a usual collaborator.
- **Next action:** Review the PR and approve it or request changes.

### 5. googleapis/google-cloud-dart#252 → predicted 8, priority 0.58
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your issue in a repository you own, and it is fresh planned work: the contributor posted a concrete design proposal four days ago after your earlier request to align on the approach. Their proposal creates a clear next step for you to review and respond, even though they appear to be driving implementation. The recent activity puts it toward the upper part of the 0.5–0.65 range.
- **Next action:** Reply to Yusufihsangorgel with feedback on the proposed ProtoEnum representation and clarify the design you want before they proceed with a PR.

### 6. dart-lang/http#2027 → predicted 9, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You opened this issue nine days ago in a repository you work in, and there is no activity or external dependency blocking the next step. It is fresh planned work, but it is a design decision rather than an urgent fix, so it sits in the 0.5–0.65 range.
- **Next action:** Decide whether to pursue an async `Client.close` as a breaking change and, if so, outline the intended semantics for a 2.0 release.

### 7. dart-lang/http#1981 → predicted 7, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned yourself and said 5 hours ago that you had started working on it, so this is your active planned work in a repository you work in. The recent activity makes it fresh, though the request is a feature rather than an urgent defect. The reporter's offer to contribute a skeleton PR is not the current next step after you said you began implementation.
- **Next action:** Continue your implementation of the trust-evaluation hook in CupertinoClient.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is in a repository you own, filed by a close collaborator, and there is a concrete design decision and potential implementation for you. Your question was answered 17 days ago, so the thread is no longer waiting on kevmoo; however, the issue is explicitly not urgent and there has been no newer activity. Treat it as planned work, but toward the lower end of that range given its age and modest impact.
- **Next action:** Decide whether incremental JSON-array framing is warranted, then reply to kevmoo with the scope or implement the mid-stream error handling.

### 9. dart-lang/sdk#59846 → predicted 14, priority 0.52
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned this issue, and there is no indication that it is blocked or being handled by someone else, so the next step is yours. It is a long-stale bug, which lowers its urgency; the possible interoperability risk and your assignment keep it above ordinary backlog, but this repository is not among the areas you listed as responsible for.
- **Next action:** Investigate the HTTP header parser and fix it to reject characters outside RFC 9110’s tchar set, adding regression tests.

### 10. googleapis/google-cloud-dart#361 → predicted 11, priority 0.56
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a recent issue in a repository you work in, filed by a close collaborator, with a concrete design decision needed from you; your last comment raises that tradeoff, and nothing indicates the discussion is blocked on someone else. Your action is to resolve the direction rather than implement the proposal immediately. Activity is 16 days old, so it remains planned collaborative work but is not especially fresh or urgent.
- **Next action:** Decide whether to pursue Discovery despite the larger API surface or ask kevmoo to explore an operations convenience-extension approach.

### 11. dart-lang/sdk#31275 → predicted 34, priority 0.03
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** You are only informationally CC'd, have never acted on the issue, and are not responsible for dart-lang/sdk. The issue is also stale, with no activity for 20 months; the collaborator's older CC does not make the next step yours.
- **Next action:** Wait for the Dart SDK library owner to take over and implement the abandoned fix; this issue is outside your stated areas of responsibility.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** The issue is assigned to you and was filed recently, but the linked open PR by you already addresses it, so the PR is the work item rather than this duplicate issue. The PR was updated 2 days ago; there is no separate action needed on the issue itself.
- **Next action:** Review and advance your open PR #3763, which already covers this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** The issue describes follow-up changes that depend on a new `google_cloud_rpc` version, and that prerequisite is not shown as complete. You commented last, asking how to handle the general fix, so the thread appears to be waiting on a decision or upstream release rather than an immediate task for you. This is in a repository you care about and from a collaborator, but no new activity has occurred since your comment 17 days ago.
- **Next action:** Wait for the `google_cloud_rpc` release/version bump; then update the storage and Pub/Sub dependency constraints and changelogs before publishing.

### 14. dart-lang/tools#2719 → predicted 19, priority 0.18
- **Ground truth:** 
- **Model:** This is a team review request, not a personal request, and dart-lang/tools is not one of your stated responsible repositories. The PR is recent, but no action is currently assigned to you; the shared team request falls in the low-priority range.
- **Next action:** Wait for a member of the dart-ecosystem-team to review the PR.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.24
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** Open PR #382 directly addresses this issue, so the PR—not the issue—is the actionable item. You have no direct request or assigned work here, and the issue was opened only three days ago by a non-collaborator. Keep it in the low duplicate-covered range until the PR is resolved.
- **Next action:** Wait for PR #382 to be reviewed and merged; evaluate the issue against that fix afterward.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** You requested review from goderbauer two days ago, and there has been no review activity since. This PR is therefore waiting on someone else; it is too soon to ping again. The linked issue is covered by this PR, so the PR—not the issue—is the item to track.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 6, priority 0.62
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is assigned to you in a repository you own, and the collaborator’s issue has clear implementation work. You last commented 10 days ago, but that comment only narrowed scope; no newer activity indicates the work is blocked, so it remains your planned work. The issue is not in the freshest two-week window from your assignment, keeping it below higher-priority active reviews or urgent follow-ups.
- **Next action:** Implement the remaining ServiceClient retry/RequestOptions support and robust handling of non-JSON error responses.

### 18. dart-lang/http#2031 → predicted 27, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is explicitly stacked on other PRs that need review first, so it is blocked even though you were personally requested to review it. The repository note also says you are not responsible for http2. Its recent activity does not change the dependency on the lower PRs.
- **Next action:** Wait for the stacked lower PRs to be reviewed and merged before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 13, priority 0.55
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your PR in a repository you work in, and it still has unresolved review threads; the review feedback identifies concrete fixes. It has been a draft and inactive for 45 days, so it is no longer fresh planned work, but you remain responsible for addressing the outstanding feedback or abandoning it.
- **Next action:** Update the PR for the unresolved review feedback, resolve the merge conflict, and decide whether to return it to ready for review or close it.

### 20. dart-lang/core#1007 → predicted 21, priority 0.14
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in a repository you do not list as responsible for, so the next step is not yours. The PR is a first-time contributor’s and has no reviews yet, but that does not make a shared team request individually actionable. The request is 15 days old, so it is not a fresh item for you.
- **Next action:** Wait for the dart-ecosystem-team review; this team request is not assigned to you personally.

### 21. dart-lang/tools#2544 → predicted 20, priority 0.18
- **Ground truth:** 
- **Model:** This is a security-related PR, but it is in dart-lang/tools, which is outside the repositories you own, and the review request is to a team you belong to rather than to you personally. lrhn is already reviewing and left unresolved feedback two months ago, so the next step is with the author, not you. The security impact makes it worth keeping visible, but the team-review and ownership rules keep it low priority.
- **Next action:** Wait for the author to address lrhn’s review feedback; review again once there are new commits or replies.

### 22. dart-lang/tools#2710 → predicted 26, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft and has not received a human review, so the lower PR needs attention first. The only review request is to the dart-ecosystem-team, not to you personally, and the recent activity was the author addressing bot feedback rather than requesting your action.
- **Next action:** Wait for the lower stacked PR #2563 to be reviewed; this PR is blocked until then.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, but you requested a specific reviewer only two days ago and there has been no human activity since. The next step currently belongs to the reviewer; it is too soon to ping them again. The PR addresses performance issues, but that does not change the low priority while review is pending.
- **Next action:** Wait for liamappelbe to review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 10, priority 0.56
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your recent PR in a repository you work in, and the related issue is assigned to you, so it represents planned work. However, you requested review four days ago and your latest comment asks whether it is ready to merge; the immediate next step is currently with Nate or Sigurdm, so it should stay below work that is unambiguously yours to do now. The approval from Sigurdm does not resolve the two outstanding threads or Nate's requested review.
- **Next action:** Follow up with Nate or Sigurdm for the outstanding review, then address any feedback and update the PR.

### 25. dart-lang/http#579 → predicted 24, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The `next-breaking-release` label blocks this PR, and you previously said you lack bandwidth to coordinate a major release. The only newer comment is a question asking for a workaround, but the PR remains blocked by the release plan; its long inactivity keeps it near the bottom of the blocked range.
- **Next action:** Wait for a planned breaking-release decision or for someone to ask you to review or coordinate this PR again.

### 26. dart-lang/http#1932 → predicted 16, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** The linked open PR by you is specifically intended to fix this issue, so the issue itself is a duplicate tracking item rather than the next place to act. The recent request for an update does not change that; focus on the PR. The issue is assigned to you, but the fix should be handled and assessed there.
- **Next action:** Review and merge PR #2034; this issue is covered by that open PR.

### 27. flutter/devtools#8223 → predicted 31, priority 0.03
- **Ground truth:** 
- **Model:** You were only CC'd on an old comment, not asked to act, and the recent question is addressed to bkonyi rather than you. The issue is in a repository outside your stated responsibility, with no assignment or personal request; the recent label change does not change who needs to act.
- **Next action:** No action is needed from you now; the recent discussion is directed to bkonyi, and the issue is in a repository you do not own.

### 28. dart-lang/http#1837 → predicted 33, priority 0.03
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already replied that this is unlikely to be taken on by the Dart team and pointed to a community implementation path. The issue is a year old with no activity since your comment, and it is marked contributions-welcome; there is no request or new information requiring action from you.
- **Next action:** Wait for a community contributor to take up the contributions-welcome issue.

### 29. dart-lang/http#2033 → predicted 30, priority 0.03
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** This is in dart-lang/http, which is within your stated interest, and the author is a collaborator, but you approved the PR two days ago with no subsequent activity. There are no unresolved threads or new commits requiring follow-up, so there is nothing for you to do now.
- **Next action:** Wait for the PR author or maintainer to merge it; you have already approved it.

### 30. dart-lang/http#1365 → predicted 36, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is in dart-lang/http2, an area you explicitly noted you are not responsible for, and you have not been mentioned or asked to act. The latest question is 8 months old and asks for confirmation from the people involved; the discussion itself suggests the slowdown was caused by adapter code rather than the http2 package. Wait for someone responsible for http2 to resolve it.
- **Next action:** No action for you now; the http2 maintainer or issue author should confirm the root cause and close the issue if appropriate.

### 31. dart-lang/tools#2715 → predicted 25, priority 0.08
- **Ground truth:** 
- **Model:** You are only requested through dart-ecosystem-team, and this repository is not one you are responsible for. A specific reviewer, davidmorgan, was also requested, so this is not a personal review request. The request is only two days old, so there is no follow-up action for you now.
- **Next action:** Wait for the specifically requested reviewer, davidmorgan; the team request is shared and does not require your review.

### 32. dart-lang/http#2026 → predicted 35, priority 0.02
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is in dart-lang/http's http2 area, which you explicitly said you are not responsible for, and you have not been personally asked to review. The author asked mosuem, and the PR is blocked pending review, so there is no useful action for you now despite the recent update.
- **Next action:** Wait for the requested collaborator, mosuem, to review the PR; you are not responsible for the http2 area.

### 33. dart-lang/native#3653 → predicted 32, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, and the latest discussion from them concludes that this approach may not be worth pursuing; no request or question is directed to you. Your earlier technical comments predate that conclusion, so there is no fresh action for you now. The linked PR is already merged, but the remaining design decision belongs to the assignee and maintainers.
- **Next action:** Wait for the issue assignee/team to decide whether to pursue trampoline changes or rely on autorelease pools.

### 34. dart-lang/http#1972 → predicted 28, priority 0.08
- **Ground truth:** 
- **Model:** The issue is labeled needs-info, and you asked the reporter questions 8 days ago without a reply, so there is no useful step to take on the issue now. An open PR covers it, but that PR is also waiting on information. Your assignment does not override these blockers.
- **Next action:** Wait for the reporter to provide the requested client details and reproduction; the linked fix PR is also marked needs-info.

### 35. dart-lang/http#1841 → predicted 29, priority 0.07
- **Ground truth:** 
- **Model:** The open PR directly addresses this issue, so the PR—not the issue—is where any action belongs. The issue is also labeled for a future breaking release, and you are not responsible for the http2 area; the recent mention and commits do not make the issue independently actionable. The thumbs-down predates the latest activity, but nothing here overrides the duplicate and release-blocker status.
- **Next action:** Wait for PR #2002 to be reviewed or merged; the issue is covered by that open PR.

### 36. dart-lang/sdk#38148 → predicted 5, priority 0.68
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned to this SDK issue, and the recent reproducible report from a user asks how they can help, giving you new information to investigate and respond to. The issue is not in one of your listed responsible repositories, so this is below work in your owned areas; however, it remains actionable rather than waiting on someone else.
- **Next action:** Respond to filiph with a debugging direction or reproduce the failure and investigate the recursive-delete implementation.
