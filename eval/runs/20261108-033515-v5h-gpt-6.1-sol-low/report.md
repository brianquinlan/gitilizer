# Gitilizer eval: v5h-gpt-6.1-sol-low

strategy `pointwise` · model `gpt-6.1-sol` · thinking `low` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5h.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033515

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.687 ± 0.002 |
| spearman | 0.820 ± 0.000 |
| pairwise_acc | 0.843 ± 0.001 |
| ndcg | 0.974 ± 0.001 |
| ndcg@5 | 0.946 ± 0.001 |
| top3_overlap | 0.333 ± 0.000 |
| top5_overlap | 0.600 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 4.000 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.540 ± 0.006 | 0.943 ± 0.002 | 0.600 ± 0.000 | 3.267 ± 0.058 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.98 | 3/3 | dart-lang/sdk#48056 | A | Verify whether the fix tracked in #64644 covers Android trust bypasses and compromised intermediates, then document remaining exposure and remediation here. |
| 2 | 4.0 (4) | +2.0 | 0.86 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo’s changelog-preservation question and update the implementation and tests accordingly. |
| 3 | 6.0 (6) | +3.0 | 0.74 | 3/3 | googleapis/google-cloud-dart#376 | A | Review Sigurd's Pub/Sub release-polish PR, checking attribution metadata, version tests, and packaging changes. |
| 4 | 7.0 (7) | +3.0 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the error-code mapping and compatibility implications, then approve or request changes. |
| 5 | 5.0 (5) | +0.0 | 0.77 | 3/3 | googleapis/google-cloud-dart#252 | B | Review the proposed enum representation and give the contributor clear approval or requested changes. |
| 6 | 10.0 (10) | +4.0 | 0.57 | 3/3 | dart-lang/http#2027 | B | Verify current native callback behavior and propose concrete semantics for closing clients with active requests. |
| 7 | 2.7 (2–3) | -4.3 | 0.92 | 3/3 | dart-lang/http#1981 | B | Continue implementing the CupertinoClient server-trust evaluation hook you started today. |
| 8 | 12.0 (12) | +4.0 | 0.55 | 3/3 | googleapis/google-cloud-dart#360 | A | Triage the streaming fixes: prioritize error-frame handling and confirm whether supported endpoints send incremental JSON. |
| 9 | 2.3 (2–3) | -6.7 | 0.93 | 3/3 | dart-lang/sdk#59846 | B | Verify current header-name validation and address acceptance of invalid characters, assessing request-smuggling risks with upstream proxies. |
| 10 | 13.0 (13) | +3.0 | 0.37 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to weigh in on discovery generation versus convenience extensions. |
| 11 | 14.0 (14) | +3.0 | 0.35 | 0/3 | dart-lang/sdk#31275 | A | Leave this for the SDK dart:io maintainers to triage and take over the abandoned fix. |
| 12 | 17.0 (17) | +5.0 | 0.22 | 0/3 | dart-lang/native#3752 | B | Track the fix through PR #3763 rather than taking separate action on this issue. |
| 13 | 11.0 (11) | -2.0 | 0.57 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide how to enforce the dependency minimums, checking the RPC release version before updating both packages and their changelogs. |
| 14 | 19.0 (19) | +5.0 | 0.18 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team to review this automated update. |
| 15 | 15.0 (15) | +0.0 | 0.29 | 0/3 | googleapis/google-cloud-dart#381 | A | Review the linked fix in PR #382 rather than act separately on this issue. |
| 16 | 23.3 (23–24) | +7.3 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer’s review; follow up if there is no response after about a week. |
| 17 | 9.0 (9) | -8.0 | 0.60 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the remaining ServiceClient retry and RequestOptions support, starting with non-JSON error handling and tests. |
| 18 | 20.3 (20–21) | +2.3 | 0.12 | 0/3 | dart-lang/http#2031 | A | Wait for the lower PRs, especially unreviewed #2014, before reviewing this release PR. |
| 19 | 18.0 (18) | -1.0 | 0.19 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to resume this draft, fixing conflicts and validating the bot feedback, or close it. |
| 20 | 21.3 (21–22) | +1.3 | 0.12 | 0/3 | dart-lang/core#1007 | B | Wait for the contributor to resolve the CLA check and for a repository maintainer to review. |
| 21 | 31.0 (31) | +10.0 ⚠️ | 0.02 | 0/3 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn’s review feedback and for lrhn to continue the review. |
| 22 | 23.3 (20–25) | +1.3 | 0.11 | 0/3 | dart-lang/tools#2710 | B | Wait for the underlying PR #2563 to be reviewed and ready before considering this stacked PR. |
| 23 | 24.3 (24–25) | +1.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe’s review; follow up if there is no response after roughly a week. |
| 24 | 22.3 (22–23) | -1.7 | 0.11 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to confirm review coverage beyond Pub/Sub or for natebosch to review. |
| 25 | 27.0 (27) | +2.0 | 0.06 | 0/3 | dart-lang/http#579 | B | Wait until a coordinated major release is planned before revisiting this API change. |
| 26 | 16.0 (16) | -10.0 ⚠️ | 0.22 | 0/3 | dart-lang/http#1932 | B | Track the fix in PR #2034 rather than taking separate action on this issue. |
| 27 | 28.7 (28–29) | +1.7 | 0.02 | 0/3 | flutter/devtools#8223 | B | Leave this with the DevTools maintainers; no action has been requested from you. |
| 28 | 26.0 (26) | -2.0 | 0.06 | 0/3 | dart-lang/http#1837 | A | Wait for a community contributor to propose a WinHTTP implementation. |
| 29 | 35.0 (35) | +6.0 | 0.00 | 0/3 | dart-lang/http#2033 | A | Wait for the author to merge; no further review is needed. |
| 30 | 34.0 (34) | +4.0 | 0.01 | 0/3 | dart-lang/http#1365 | A | Leave root-cause verification and closure to the http2 maintainers. |
| 31 | 28.3 (28–29) | -2.7 | 0.02 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan to review; no personal review request needs your attention. |
| 32 | 33.0 (33) | +1.0 | 0.01 | 0/3 | dart-lang/http#2026 | A | Leave review to mosuem or the http2 maintainers. |
| 33 | 30.0 (30) | -3.0 | 0.02 | 0/3 | dart-lang/native#3653 | A | Wait for liamappelbe to decide whether to pursue the VM/FFI changes. |
| 34 | 32.0 (32) | -2.0 | 0.02 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to identify the client and provide a reproducible scenario; track any fix through PR #1974. |
| 35 | 36.0 (36) | +1.0 | 0.00 | 0/3 | dart-lang/http#1841 | B | Leave this issue deprioritized; any implementation review belongs on PR #2002. |
| 36 | 8.0 (8) | -28.0 ⚠️ | 0.69 | 3/3 | dart-lang/sdk#38148 | B | Ask filiph for a minimal reproduction and filesystem details to investigate the current macOS deletion failure. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#359** (truth #17) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.98
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** You authored and are assigned this security issue, and new activity three days ago raises potential HTTPS impersonation exposure involving compromised CA keys. The related issue is closed, but that does not establish that Android's disabled-certificate and blocklist handling is fixed. Confirming coverage and resolving any remaining security gap is yours to drive; the issue's age and P3 label do not reduce its urgency.
- **Next action:** Verify whether the fix tracked in #64644 covers Android trust bypasses and compromised intermediates, then document remaining exposure and remediation here.

### 2. googleapis/librarian#7808 → predicted 4, priority 0.86
- **Ground truth:** Review feedback needs addressed.
- **Model:** Your PR has unanswered review feedback from kevmoo just 21 hours ago, so the next step is yours rather than the requested review team’s. The feedback identifies a concrete bug where subsequent generation deletes the newly created changelog. Addressing it unblocks review of a fix for first-release package tagging.
- **Next action:** Answer kevmoo’s changelog-preservation question and update the implementation and tests accordingly.

### 3. googleapis/google-cloud-dart#376 → predicted 6, priority 0.74
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed collaborator PR in a repository you own, so you are the default human reviewer even without an explicit request. It was opened five days ago and is ready for review against main; the related prerequisite PRs are already merged. Only bots have reviewed it, and being behind main does not itself block your review.
- **Next action:** Review Sigurd's Pub/Sub release-polish PR, checking attribution metadata, version tests, and packaging changes.

### 4. googleapis/google-cloud-dart#382 → predicted 7, priority 0.71
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This PR is awaiting its first human review in a repository you are responsible for, so you are the default reviewer despite no explicit request. It fixes incorrect REST error classification that prevents ABORTED errors from being retried, with regression tests included. The activity is recent and there is no stated blocker, though a first-time contributor's review ranks below comparable collaborator requests.
- **Next action:** Review the error-code mapping and compatibility implications, then approve or request changes.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.77
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** The contributor supplied the design sketch you requested four days ago and is waiting for your feedback before implementing it. This is fresh, actionable work in your repository, with no covering PR or external blocker shown. Resolving the representation and serialization approach now will prevent wasted implementation effort.
- **Next action:** Review the proposed enum representation and give the contributor clear approval or requested changes.

### 6. dart-lang/http#2027 → predicted 10, priority 0.57
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is your own planned work, filed nine days ago in a repository you maintain, with no dependency or unanswered request blocking progress. Client shutdown semantics affect a core API and request cleanup, but there is no new feedback or immediate blocker for another contributor. A possible breaking release is discussed, not established as a prerequisite for investigating and designing the change.
- **Next action:** Verify current native callback behavior and propose concrete semantics for closing clients with active requests.

### 7. dart-lang/http#1981 → predicted 3, priority 0.91
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is security-sensitive TLS trust and certificate-pinning work in code you own, and the issue is assigned to you. Your latest comment explicitly commits to implementation, superseding the earlier request for a contributor’s skeleton PR. There is no current dependency on someone else, and today’s activity makes this active security work.
- **Next action:** Continue implementing the CupertinoClient server-trust evaluation hook you started today.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator's issue in a repository you own, and kevmoo has answered your question, so it is no longer waiting on the reporter. There is a concrete next step to scope the fixes, with no open PR covering them. The reply is 17 days old and explicitly nonurgent, placing it toward the lower end of actionable planned work.
- **Next action:** Triage the streaming fixes: prioritize error-frame handling and confirm whether supported endpoints send incremental JSON.

### 9. dart-lang/sdk#59846 → predicted 2, priority 0.93
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned this unresolved parser issue, and no covering PR or external blocker is shown. Accepting NUL and whitespace in HTTP header names can create parsing discrepancies with proxies and potential request-smuggling exposure, making this security-relevant rather than merely an interoperability bug. Its age does not reduce the need to verify and resolve that risk.
- **Next action:** Verify current header-name validation and address acceptance of invalid characters, assessing request-smuggling risks with upstream proxies.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** Your latest comment asks kevmoo to resolve the design tradeoff, and there has been no reply, so the next step is theirs. This remains worth tracking because it involves a close collaborator in your repository, but the unanswered question is now 16 days old and manual polling already works.
- **Next action:** Wait for kevmoo to weigh in on discovery generation versus convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an important production-crash bug, and you were explicitly CC'd, including by kevmoo. However, the SDK is not a repository you own, the mentions were informational, and no recent activity asks you to act. It belongs at the bottom of the old-but-important CC range rather than among your actionable work.
- **Next action:** Leave this for the SDK dart:io maintainers to triage and take over the abandoned fix.

### 12. dart-lang/native#3752 → predicted 17, priority 0.22
- **Ground truth:** 
- **Model:** Your open PR #3763 already covers this issue, so the actionable work belongs on that PR despite your ownership and the recent filing. The bug can stall all NSURLSession requests in a process, but there is no new information here requiring separate verification or a reply.
- **Next action:** Track the fix through PR #3763 rather than taking separate action on this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.57
- **Ground truth:** 
- **Model:** This is a collaborator's issue in a repository you own, and your last comment leaves the dependency-management decision with you rather than asking someone else for input. No open PR covers the remaining work; the linked PRs are already merged. Incorrect minimum versions can break consumers despite passing workspace CI, but the 17-day silence and prerequisite RPC release check keep this below fresh reviews and blocking requests.
- **Next action:** Decide how to enforce the dependency minimums, checking the RPC release version before updating both packages and their changelogs.

### 14. dart-lang/tools#2719 → predicted 19, priority 0.18
- **Ground truth:** 
- **Model:** The review request is to your team, not you personally, and dart-lang/tools is outside your stated repository responsibilities. This is fresh but routine dependency maintenance, with no identified vulnerability or direct request that warrants your attention.
- **Next action:** Wait for the dart-ecosystem-team to review this automated update.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** Open PR #382 already covers this bug, so the actionable work belongs on the PR rather than this issue. The report is recent and identifies a concrete retry correctness problem in a repository you maintain, but there is no separate request or verification task for you here.
- **Next action:** Review the linked fix in PR #382 rather than act separately on this issue.

### 16. dart-lang/http#2034 → predicted 23, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** You requested review two days ago, and there is no unanswered feedback or subsequent activity requiring your action. Although this fixes a Cronet build failure in your repository, the next step belongs to the reviewer.
- **Next action:** Wait for goderbauer’s review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.59
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is assigned work in a repository you own, with a clear implementation path and no open PR or external blocker. Your last comment narrowed the scope rather than handing the work to someone else. The shared transport affects more than 20 generated clients, giving it meaningful leverage, but there is no fresh request or review feedback requiring an immediate response.
- **Next action:** Implement the remaining ServiceClient retry and RequestOptions support, starting with non-JSON error handling and tests.

### 18. dart-lang/http#2031 → predicted 20, priority 0.12
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem requested your review personally, this release PR is stacked on lower PRs that are not all reviewed. Review effort belongs on #2014 first, not this release wrapper. The recent request keeps it visible, but the dependency blocks action on this item.
- **Next action:** Wait for the lower PRs, especially unreviewed #2014, before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.19
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own unfinished draft, with no reviewer or contributor waiting on you. The bot feedback predates your decision to convert it to draft, so it is not new unanswered feedback that warrants escalation. With 45 days of inactivity and merge conflicts, it merits a low-priority finish-or-abandon decision.
- **Next action:** Decide whether to resume this draft, fixing conflicts and validating the bot feedback, or close it.

### 20. dart-lang/core#1007 → predicted 21, priority 0.12
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** The review request targets your team, not you personally, in a repository you do not own. The contributor also needs to resolve the reported CLA blocker. There has been no new human activity for 15 days, so this warrants little attention despite the more recent update timestamp.
- **Next action:** Wait for the contributor to resolve the CLA check and for a repository maintainer to review.

### 21. dart-lang/tools#2544 → predicted 31, priority 0.02
- **Ground truth:** 
- **Model:** This mitigates credential exposure, but it is in a repository you do not own and your only involvement is a team review request. lrhn is already reviewing it, with unresolved feedback awaiting the author, so the security exception explicitly does not make this your responsibility. There has been no activity for two months and no personal request for you to act.
- **Next action:** Wait for jonasfj to address lrhn’s review feedback and for lrhn to continue the review.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on an unreviewed draft, so the underlying work needs attention first. The review request is only to your team in a repository you do not own, with no personal request for you. Although the changes concern security verification and come from a usual collaborator, they do not establish a security issue requiring your intervention.
- **Next action:** Wait for the underlying PR #2563 to be reviewed and ready before considering this stacked PR.

### 23. dart-lang/native#3763 → predicted 24, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** You requested review two days ago, and there is no unanswered feedback or subsequent human activity requiring your action. Although this fixes a deadlock and concurrent-upload performance problems, the next step belongs to the reviewer, so it remains low priority for your attention.
- **Next action:** Wait for liamappelbe’s review; follow up if there is no response after roughly a week.

### 24. googleapis/google-cloud-dart#373 → predicted 22, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** You explicitly asked sigurdm four days ago whether the non-Pub/Sub changes are ready to merge, and he has not replied. His earlier approval predates that question, and the remaining bot threads do not represent new unanswered feedback. This is your PR waiting on recently requested review confirmation, so it deserves little attention until roughly a week has passed.
- **Next action:** Wait for sigurdm to confirm review coverage beyond Pub/Sub or for natebosch to review.

### 25. dart-lang/http#579 → predicted 27, priority 0.06
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR is explicitly blocked by next-breaking-release, and you already said landing it requires coordination with a major release. The personal review request does not override that blocker, and the latest workaround question does not unblock the work. With no activity for 14 months, it sits near the bottom of the blocked-release range.
- **Next action:** Wait until a coordinated major release is planned before revisiting this API change.

### 26. dart-lang/http#1932 → predicted 16, priority 0.22
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** Your open PR #2034 already covers this build failure, so any implementation or review follow-up belongs on that PR. The recent status request does not create separate work on the issue, despite your assignment and the impact on Cronet users.
- **Next action:** Track the fix in PR #2034 rather than taking separate action on this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.02
- **Ground truth:** 
- **Model:** You were only informationally CC'd over two years ago in a repository you do not own. The later design question is addressed to bkonyi, and the recent label removal creates no work for you.
- **Next action:** Leave this with the DevTools maintainers; no action has been requested from you.

### 28. dart-lang/http#1837 → predicted 26, priority 0.06
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already explained that the Dart team is unlikely to implement this and directed it toward community contributions. There have been no updates or requests for you in nearly a year, so this is stale, low-priority backlog rather than work requiring your attention.
- **Next action:** Wait for a community contributor to propose a WinHTTP implementation.

### 29. dart-lang/http#2033 → predicted 35, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You approved this PR two days ago, and there have been no commits or author activity since. There are no unresolved review threads, so your part is complete despite the PR remaining open.
- **Next action:** Wait for the author to merge; no further review is needed.

### 30. dart-lang/http#1365 → predicted 34, priority 0.01
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is explicitly outside your scope because you are not responsible for http2. The latest question was eight months ago and was not directed at you; you have no assignment, mention, or prior commitment requiring action.
- **Next action:** Leave root-cause verification and closure to the http2 maintainers.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.03
- **Ground truth:** 
- **Model:** You were requested only through a team in a repository you do not own, and davidmorgan is explicitly named as a reviewer. Although this is a recent PR from a usual collaborator, the review is not yours to drive and there is no direct request for you.
- **Next action:** Wait for davidmorgan to review; no personal review request needs your attention.

### 32. dart-lang/http#2026 → predicted 33, priority 0.01
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is entirely in http2, which you explicitly do not own, and no one has requested your involvement. The contributor’s recent review request is directed to mosuem, so the fresh activity creates no action for you.
- **Next action:** Leave review to mosuem or the http2 maintainers.

### 33. dart-lang/native#3653 → predicted 30, priority 0.02
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to someone else in a repository you do not own, and nobody has asked you to act. Your technical input is already recorded; subsequent discussion identifies limitations in the merged fix but leaves the implementation decision with its owner. The thread has been quiet for over a month.
- **Next action:** Wait for liamappelbe to decide whether to pursue the VM/FFI changes.

### 34. dart-lang/http#1972 → predicted 32, priority 0.02
- **Ground truth:** 
- **Model:** You requested clarification and marked this needs-info eight days ago, and the reporter has not replied. Although you are assigned, there is nothing useful to do on the issue until that information arrives. An open PR also covers the issue, so any actionable implementation work belongs there rather than here.
- **Next action:** Wait for the reporter to identify the client and provide a reproducible scenario; track any fix through PR #1974.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** Nothing significant directed at you has happened since your October 5 thumbs-down; the contributor's mention and proposal predate it. An open PR already covers the issue, and the issue remains labeled next-breaking-release, so there is no separate action for you here.
- **Next action:** Leave this issue deprioritized; any implementation review belongs on PR #2002.

### 36. dart-lang/sdk#38148 → predicted 8, priority 0.69
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are assigned, and the reporter has supplied new evidence that the bug persists on a current SDK, with a locally reproducible case and an offer to help. This meaningful activity occurred after your thumbs-down, so the issue warrants renewed attention. Your response can move the investigation forward, although the report is now 24 days old rather than fresh this week.
- **Next action:** Ask filiph for a minimal reproduction and filesystem details to investigate the current macOS deletion failure.
