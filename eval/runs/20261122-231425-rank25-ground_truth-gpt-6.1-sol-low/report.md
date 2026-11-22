# Gitilizer eval: rank25-ground_truth-gpt-6.1-sol-low

strategy `pointwise` · model `gpt-6.1-sol` · thinking `low` · prompt `/sessions/rcw-01fmhwk6smifvq1n8sesn8rb/evalwork/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261122-231425

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.630 ± 0.021 |
| spearman | 0.778 ± 0.021 |
| pairwise_acc | 0.815 ± 0.010 |
| ndcg | 0.970 ± 0.002 |
| ndcg@5 | 0.946 ± 0.001 |
| top3_overlap | 0.333 ± 0.000 |
| top5_overlap | 0.600 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.648 ± 0.251 |

## Next steps (mean ± sd across trials)

Against the next step the eval set records for 36 items (PRD RANK-24). "Same side" counts a next step on the other side of "on me" as wrong, and any other as right.

| metric | value |
|---|---|
| exact | 0.917 ± 0.000 |
| same side | 0.944 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.828 ± 0.048 | 0.997 ± 0.002 | 1.000 ± 0.000 | 1.083 ± 0.289 |
| B | 20 | 0.484 ± 0.028 | 0.941 ± 0.002 | 0.600 ± 0.000 | 3.500 ± 0.173 |

## Per item

| truth | predicted (mean, range) | Δ | priority | next step (expected) | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.98 | todo | dart-lang/sdk#48056 | A | Verify Android certificate distrust behavior and whether #64644 addresses the reported exposure, then document remaining risks and remediation. |
| 2 | 4.0 (4) | +2.0 | 0.86 | respond | googleapis/librarian#7808 | A | Answer kevmoo’s changelog-preservation question and update the PR with a fix and regression test. |
| 3 | 6.0 (6) | +3.0 | 0.76 | review | googleapis/google-cloud-dart#376 | A | Review sigurdm's attribution-header and release-polish changes in PR #376. |
| 4 | 7.7 (7–8) | +3.7 | 0.71 | review | googleapis/google-cloud-dart#382 | A | Review PR #382 for RPC code mapping correctness, retry behavior, and compatibility. |
| 5 | 5.0 (5) | +0.0 | 0.78 | respond | googleapis/google-cloud-dart#252 | B | Review the proposed nullable enum representation and give the contributor direction before implementation. |
| 6 | 11.0 (11) | +5.0 | 0.56 | todo | dart-lang/http#2027 | B | Investigate current native callback behavior and propose safe Client.close semantics for active requests. |
| 7 | 2.7 (2–3) | -4.3 | 0.92 | todo | dart-lang/http#1981 | B | Continue implementing the CupertinoClient server-trust evaluation hook with safe TLS verification semantics. |
| 8 | 12.0 (12) | +4.0 | 0.53 | todo | googleapis/google-cloud-dart#360 | A | Triage the streaming gaps: prioritize explicit mid-stream error handling and determine whether incremental JSON decoding is needed. |
| 9 | 2.3 (2–3) | -6.7 | 0.93 | todo (backlog) ⚠️ | dart-lang/sdk#59846 | B | Verify whether dart:io still accepts invalid header-name characters and arrange a security fix if it does. |
| 10 | 13.0 (13) | +3.0 | 0.37 | waiting | googleapis/google-cloud-dart#361 | A | Wait for kevmoo’s recommendation on switching to discovery versus adding convenience extensions. |
| 11 | 22.7 (14–27) | +11.7 ⚠️ | 0.15 | not_yours | dart-lang/sdk#31275 | A | No action required; this remains with the SDK dart:io maintainers. |
| 12 | 17.3 (17–18) | +5.3 | 0.20 | elsewhere | dart-lang/native#3752 | B | Track and advance the fix in PR dart-lang/native#3763 rather than acting on this issue separately. |
| 13 | 10.0 (10) | -3.0 | 0.59 | todo | googleapis/google-cloud-dart#366 | B | Decide how to enforce the RPC minimum version and update the storage and Pub/Sub constraints and changelogs before publishing. |
| 14 | 18.3 (18–19) | +4.3 | 0.15 | not_yours | dart-lang/tools#2719 | B | Leave this update for the dart-ecosystem-team reviewers; no personal action is requested. |
| 15 | 14.3 (14–15) | -0.7 | 0.29 | elsewhere | googleapis/google-cloud-dart#381 | A | Review PR #382, which fixes this issue. |
| 16 | 21.3 (21–22) | +5.3 | 0.10 | waiting | dart-lang/http#2034 | B | Wait for goderbauer’s review; follow up if there is no response after about a week. |
| 17 | 9.0 (9) | -8.0 | 0.61 | todo (elsewhere) ⚠️ | googleapis/google-cloud-dart#359 | B | Implement the assigned retry and RequestOptions changes, starting with robust handling of non-JSON gateway errors. |
| 18 | 23.3 (23–24) | +5.3 | 0.10 | elsewhere | dart-lang/http#2031 | A | Review prerequisite PR #2014 before reviewing this release PR. |
| 19 | 15.3 (15–16) | -3.7 | 0.23 | todo | googleapis/google-cloud-dart#345 | A | Decide whether to finish or close this draft; if continuing, validate the bot findings and resolve merge conflicts. |
| 20 | 19.3 (19–20) | -0.7 | 0.15 | not_yours | dart-lang/core#1007 | B | Leave review to the dart-ecosystem-team maintainers; the contributor also needs to resolve the CLA check. |
| 21 | 31.7 (31–32) | +10.7 ⚠️ | 0.02 | not_yours | dart-lang/tools#2544 | B | Leave the author and lrhn to resolve the outstanding security review feedback. |
| 22 | 27.3 (26–28) | +5.3 | 0.03 | not_yours | dart-lang/tools#2710 | B | Leave review to the tools maintainers; prerequisite PR #2563 needs review first. |
| 23 | 22.3 (22–23) | -0.7 | 0.10 | waiting | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there is no response after about a week. |
| 24 | 20.3 (20–21) | -3.7 | 0.12 | waiting | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to confirm whether his review covered the non-PubSub changes and this is ready to merge. |
| 25 | 25.0 (24–26) | +0.0 | 0.09 | waiting (backlog) ⚠️ | dart-lang/http#579 | B | Wait for a coordinated major release before revisiting this breaking upload-progress API. |
| 26 | 16.3 (16–17) | -9.7 ⚠️ | 0.22 | elsewhere | dart-lang/http#1932 | B | Move the fix forward in PR #2034; track resolution there rather than separately on this issue. |
| 27 | 29.7 (29–30) | +2.7 | 0.02 | not_yours | flutter/devtools#8223 | B | No action needed; the DevTools maintainers and bkonyi are driving this request. |
| 28 | 26.0 (25–27) | -2.0 | 0.06 | backlog | dart-lang/http#1837 | A | Leave this for community contributions and revisit only during backlog triage or if someone volunteers. |
| 29 | 34.0 (34) | +5.0 | 0.00 | not_yours | dart-lang/http#2033 | A | No action needed; mosuem can merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | not_yours | dart-lang/http#1365 | A | Leave this for the http2 maintainers to assess and close if appropriate. |
| 31 | 28.7 (28–29) | -2.3 | 0.02 | not_yours | dart-lang/tools#2715 | B | Leave the review to davidmorgan, who is explicitly requested. |
| 32 | 33.0 (33) | +1.0 | 0.00 | not_yours | dart-lang/http#2026 | A | Leave review to mosuem or another http2 maintainer. |
| 33 | 30.7 (30–31) | -2.3 | 0.02 | not_yours | dart-lang/native#3653 | A | Leave further investigation and triage to assignee liamappelbe. |
| 34 | 27.0 (24–32) | -7.0 | 0.07 | elsewhere | dart-lang/http#1972 | B | Track PR #1974; wait for the reporter to provide the requested client and reproduction details. |
| 35 | 35.0 (35) | +0.0 | 0.00 | elsewhere | dart-lang/http#1841 | B | Track the proposed fix in PR #2002 rather than acting on this issue. |
| 36 | 7.3 (7–8) | -28.7 ⚠️ | 0.72 | respond | dart-lang/sdk#38148 | B | Ask filiph for a minimal reproduction and check whether commit 2752d56 addresses the failure. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1972** (truth #34) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.98
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** You authored and are assigned this security issue, and recent activity raises potential HTTPS impersonation involving reportedly compromised CA keys. The related issue #64644 is closed, but its resolution does not establish that Android-disabled certificates or platform blocklists are honored. Confirming the actual protection and identifying any remaining gap is urgent despite this issue’s age and P3 label.
- **Next action:** Verify Android certificate distrust behavior and whether #64644 addresses the reported exposure, then document remaining risks and remediation.

### 2. googleapis/librarian#7808 → predicted 4, priority 0.86
- **Ground truth:** Review feedback needs addressed.
- **Model:** Your own PR has unanswered review feedback from kevmoo, so the next move is yours rather than the requested review team’s. The feedback identifies a concrete risk that a subsequent generate deletes the newly created changelog. Addressing it unblocks the fix for first-release tagging in google-cloud-dart.
- **Next action:** Answer kevmoo’s changelog-preservation question and update the PR with a fix and regression test.

### 3. googleapis/google-cloud-dart#376 → predicted 6, priority 0.76
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from a usual collaborator in a repository you own, so you are the default human reviewer. It prepares Pub/Sub for release and has been waiting five days. The related prerequisite PRs are merged and its base is main, so it is not blocked on lower reviews; the bot review does not replace yours.
- **Next action:** Review sigurdm's attribution-header and release-polish changes in PR #376.

### 4. googleapis/google-cloud-dart#382 → predicted 8, priority 0.71
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in a repository you own, so you are the default human reviewer; the bot review does not count. It fixes incorrect REST error classification that prevents ABORTED errors from being retried, with focused tests provided. The contributor has been waiting three days, though this ranks below collaborator reviews and urgent requests directly blocking someone.
- **Next action:** Review PR #382 for RPC code mapping correctness, retry behavior, and compatibility.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.79
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** The contributor supplied the design sketch you requested and is waiting for agreement before writing the implementation. This is your issue in a repository you own, so responding will unblock concrete work on enum parsing and unknown-value preservation. The recent activity makes it actionable despite the issue's age.
- **Next action:** Review the proposed nullable enum representation and give the contributor direction before implementation.

### 6. dart-lang/http#2027 → predicted 11, priority 0.56
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in an area you own, and nothing is waiting on anyone else, so it is active planned work. The lifecycle contract affects timeout cleanup and potentially VM stability across client implementations, but there is no unanswered request or review blocking another contributor.
- **Next action:** Investigate current native callback behavior and propose safe Client.close semantics for active requests.

### 7. dart-lang/http#1981 → predicted 3, priority 0.91
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This concerns TLS trust and certificate pinning in code you own, so it falls under security work. You assigned it to yourself and explicitly said you had started working on it five hours ago, superseding your earlier request for a contributor's skeleton PR. The next move is yours, with no outstanding dependency on the reporter.
- **Next action:** Continue implementing the CupertinoClient server-trust evaluation hook with safe TLS verification semantics.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.53
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** Kevmoo answered your question, so this is no longer waiting on him; there is a concrete triage step in a repository you own. Silently swallowing streaming errors is a correctness problem, but he explicitly says this is not urgent and incremental JSON support still needs justification. The related merged PRs do not clearly resolve either acceptance criterion.
- **Next action:** Triage the streaming gaps: prioritize explicit mid-stream error handling and determine whether incremental JSON decoding is needed.

### 9. dart-lang/sdk#59846 → predicted 2, priority 0.93
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is assigned to you and concerns HTTP parser discrepancies involving NUL and whitespace, which can enable request-smuggling or proxy interpretation vulnerabilities. Its age does not reduce the security priority, and no fix or covering PR is shown. Confirming the current behavior and resolving the unknown security state is your next action.
- **Next action:** Verify whether dart:io still accepts invalid header-name characters and arrange a security fix if it does.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.36
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** You asked a concrete design question in your repository, and kevmoo has not answered it yet. This is a collaborator’s actionable feature proposal, but manual polling already works and there is no immediate correctness or security risk. Keep it visible for follow-up, below work you can move forward now.
- **Next action:** Wait for kevmoo’s recommendation on switching to discovery versus adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 27, priority 0.04
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a longstanding production-crash bug, but it is in the SDK rather than a repository you own, and your mentions were informational CCs rather than requests to act. There has been no substantive update since April 2024, and you have made no commitment to take it on.
- **Next action:** No action required; this remains with the SDK dart:io maintainers.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** This is your assigned bug and can stall all NSURLSession requests in a process, so the underlying fix matters. However, your open PR #3763 already covers it; attention belongs on that PR, with no separate action needed on this issue.
- **Next action:** Track and advance the fix in PR dart-lang/native#3763 rather than acting on this issue separately.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.59
- **Ground truth:** 
- **Model:** This is a collaborator-filed issue in a repository you own, with concrete dependency changes needed to prevent broken published packages. Your last comment left the broader automation approach undecided, so the next move remains yours rather than waiting on anyone else. It warrants planned-work priority, though it is not security-related and no one is explicitly blocked on a reply.
- **Next action:** Decide how to enforce the RPC minimum version and update the storage and Pub/Sub constraints and changelogs before publishing.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.15
- **Ground truth:** 
- **Model:** This is a team-only review request in a repository you do not own, with no note that you take this team's reviews. The BoringSSL update does not identify a vulnerability or security fix, so its cryptographic dependency alone does not warrant security urgency.
- **Next action:** Leave this update for the dart-ecosystem-team reviewers; no personal action is requested.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a concrete correctness bug in a repository you own: REST errors lose their RPC codes, preventing appropriate retries. However, open PR #382 already covers the fix, so your attention should go to reviewing that PR rather than acting separately on this issue.
- **Next action:** Review PR #382, which fixes this issue.

### 16. dart-lang/http#2034 → predicted 21, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** You requested review two days ago, and there is no feedback or unanswered question for you to address. This PR fixes a Cronet build failure, but its next step is with the reviewer, so it does not need your attention yet.
- **Next action:** Wait for goderbauer’s review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.61
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is assigned to you in a repository you own, was filed by a close collaborator, and has a clear implementation path with no outstanding dependency or open fixing PR. The transport changes affect more than 20 generated clients, making this meaningful reliability work. Nobody is awaiting a direct reply, so it ranks below active reviews and blocking questions.
- **Next action:** Implement the assigned retry and RequestOptions changes, starting with robust handling of non-JSON gateway errors.

### 18. dart-lang/http#2031 → predicted 23, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Mosuem requested your review personally, so this is relevant despite your usual http2 scope exclusion. However, it is stacked on #2014, which still needs your review; the other listed prerequisites already have your approval. Defer the release review until the lower PR is reviewed.
- **Next action:** Review prerequisite PR #2014 before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 15, priority 0.23
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft in a repository you own, but it has been idle for 45 days and nobody is waiting on you. The outstanding feedback is bot-only, so it does not warrant the urgency of unanswered human review feedback. Finishing or abandoning it is useful cleanup, below active reviews and collaborator requests.
- **Next action:** Decide whether to finish or close this draft; if continuing, validate the bot findings and resolve merge conflicts.

### 20. dart-lang/core#1007 → predicted 19, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team-only review request in dart-lang/core, which is not a repository you own, and you have not committed to taking this team's reviews. No one has addressed you personally, and the outstanding CLA check further limits immediate progress.
- **Next action:** Leave review to the dart-ecosystem-team maintainers; the contributor also needs to resolve the CLA check.

### 21. dart-lang/tools#2544 → predicted 31, priority 0.01
- **Ground truth:** 
- **Model:** This is a security fix, but dart-lang/tools is not a repository you own, and the request is to your team rather than to you personally. lrhn is already actively responsible for the review, with outstanding feedback for the author; the security exception explicitly does not make this your work.
- **Next action:** Leave the author and lrhn to resolve the outstanding security review feedback.

### 22. dart-lang/tools#2710 → predicted 26, priority 0.04
- **Ground truth:** 
- **Model:** Only your team was requested, with no note that you take its reviews, and dart-lang/tools is not a repository you own. Although this is security-related work by a usual collaborator, it is not a review assigned to you and is also stacked on the unreviewed draft #2563.
- **Next action:** Leave review to the tools maintainers; prerequisite PR #2563 needs review first.

### 23. dart-lang/native#3763 → predicted 22, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** You requested review only two days ago, and there is no unanswered feedback or other action for you. The PR addresses deadlocks and concurrent-upload performance, but it is currently the reviewer's move.
- **Next action:** Wait for liamappelbe to review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 20, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** You explicitly asked sigurdm four days ago whether his approval covered the full PR, so the next move is his. The earlier bot feedback has been answered, and there is no outstanding human feedback for you to address. Although natebosch's original review request is older, your more recent request offers an alternative path to approval; allow roughly a week before following up.
- **Next action:** Wait for sigurdm to confirm whether his review covered the non-PubSub changes and this is ready to merge.

### 25. dart-lang/http#579 → predicted 24, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** Although you are a requested reviewer, you explicitly deferred this change until a coordinated semver-major release, and the next-breaking-release label still applies. The latest comment asks generally about a workaround rather than directly assigning you new work or removing that blocker. This is a stale, non-security feature PR with little immediate leverage for your review time.
- **Next action:** Wait for a coordinated major release before revisiting this breaking upload-progress API.

### 26. dart-lang/http#1932 → predicted 16, priority 0.22
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This assigned build regression has recent reports and affects cronet_http users, but your open PR #2034 already covers the fix. Attention belongs on that PR, so this issue stays low priority despite the recent request for updates.
- **Next action:** Move the fix forward in PR #2034; track resolution there rather than separately on this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.02
- **Ground truth:** 
- **Model:** This is outside your responsible repositories, and your only involvement was an informational CC more than two years ago. The subsequent design question is addressed to bkonyi, not you, and the recent label change creates no new action for you.
- **Next action:** No action needed; the DevTools maintainers and bkonyi are driving this request.

### 28. dart-lang/http#1837 → predicted 25, priority 0.06
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already explained that the Dart team is unlikely to implement this and outlined a community contribution path. This is a year-old P3 enhancement with no new activity, unanswered questions, or commitments from you, so it deserves little attention now.
- **Next action:** Leave this for community contributions and revisit only during backlog triage or if someone volunteers.

### 29. dart-lang/http#2033 → predicted 34, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You already approved this PR, and there have been no new commits or author activity since your review. Your review work is complete, so it does not need your attention.
- **Next action:** No action needed; mosuem can merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is specifically about http2, which you explicitly exclude from your responsibilities. The latest question is not addressed to you, and you have no prior involvement or commitment requiring action.
- **Next action:** Leave this for the http2 maintainers to assess and close if appropriate.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.02
- **Ground truth:** 
- **Model:** This repository is outside your responsibility, and the only request involving you is to a team without a note committing you to its reviews. A specific reviewer is already named, so despite kevmoo being a usual collaborator, there is no action waiting on you.
- **Next action:** Leave the review to davidmorgan, who is explicitly requested.

### 32. dart-lang/http#2026 → predicted 33, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR exclusively changes http2, which you explicitly do not own. The author asked mosuem for review, not you, and you have no prior involvement or personal review request.
- **Next action:** Leave review to mosuem or another http2 maintainer.

### 33. dart-lang/native#3653 → predicted 30, priority 0.02
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This is assigned to someone else in a repository you do not own, and no unanswered question or request is directed at you. Your participation was advisory, and the latest discussion leaves the implementation trade-off with the assignee. The reopened issue has no new action for you.
- **Next action:** Leave further investigation and triage to assignee liamappelbe.

### 34. dart-lang/http#1972 → predicted 32, priority 0.01
- **Ground truth:** 
- **Model:** PR #1974 covers this issue, so any actionable fix belongs there rather than on this issue. Your clarification questions remain unanswered and the issue is labeled needs-info, leaving nothing for you to do here now.
- **Next action:** Track PR #1974; wait for the reporter to provide the requested client and reproduction details.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You marked this unimportant on October 5, after the contributor's proposal and mention, and nothing significant directed at you has happened on this issue since. Open PR #2002 covers the work, so any review or implementation discussion belongs there.
- **Next action:** Track the proposed fix in PR #2002 rather than acting on this issue.

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.72
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned, and a reporter now has a locally reproducible failure on a current SDK and is offering to help investigate. This is actionable new information after your thumbs-down, so the earlier dismissal no longer applies. Responding could turn a longstanding intermittent filesystem bug into a diagnosable case; the referenced commit is also worth checking without assuming it fixes the issue.
- **Next action:** Ask filiph for a minimal reproduction and check whether commit 2752d56 addresses the failure.
