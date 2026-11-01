# Gitilizer eval: m-gemini-3.7-flash-high-t2

strategy `pointwise` · model `gemini-3.7-flash` · thinking `high` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-165313

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.800 ± 0.000 |
| spearman | 0.935 ± 0.000 |
| pairwise_acc | 0.900 ± 0.000 |
| ndcg | 0.994 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 2.667 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.750 ± 0.000 |
| B | 20 | 0.705 ± 0.000 | 0.979 ± 0.000 | 0.600 ± 0.000 | 2.100 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.92 | 1/1 | dart-lang/sdk#48056 | A | Verify how Dart handles disabled and revoked Android CAs in light of the recent eMudhra incident, and respond to the security inquiry. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Respond to kevmoo's review comment regarding CHANGELOG.md handling and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR adding Pub/Sub client attribution headers and pre-release polish. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR fixing RPC status codes for REST errors. |
| 5 | 5.0 (5) | +0.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's design proposal for the ProtoEnum representation changes. |
| 6 | 11.0 (11) | +5.0 | 0.52 | 1/1 | dart-lang/http#2027 | B | Decide whether to make `Client.close` asynchronous for a 2.0 release and prepare a proposal or PR. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Implement the server trust evaluation hook in CupertinoClient and open a PR. |
| 8 | 8.0 (8) | +0.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | Implement mid-stream error handling and evaluate incremental JSON parsing for _makeStreamingRequest. |
| 9 | 10.0 (10) | +1.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | Fix the HTTP header parser validation in dart:io, or unassign myself if I am not working on it. |
| 10 | 12.0 (12) | +2.0 | 0.38 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting on @kevmoo to reply regarding whether switching to discovery is preferable over adding convenience extensions. |
| 11 | 13.0 (13) | +2.0 | 0.37 | 1/1 | dart-lang/sdk#31275 | A | Decide whether to adopt abandoned Gerrit CL 144346 to fix uncatchable HttpExceptions in dart:io. |
| 12 | 17.0 (17) | +5.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Follow up on the fix in PR #3763. |
| 13 | 9.0 (9) | -4.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on an approach and update the `google_cloud_rpc` dependency constraints in `google_cloud_storage` and `google_cloud_pubsub`. |
| 14 | 15.0 (15) | +1.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Wait for a maintainer of dart-lang/tools or another dart-ecosystem-team member to review. |
| 15 | 14.0 (14) | -1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting on this issue directly. |
| 16 | 20.0 (20) | +4.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for @goderbauer to review the PR. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.58 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring and FormatException fix in package:google_cloud_rpc, or unassign myself. |
| 18 | 25.0 (25) | +7.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | Wait for earlier PRs in the stack to be reviewed and landed before reviewing this release preparation. |
| 19 | 18.0 (18) | -1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Resolve merge conflicts and address bot feedback to finish the PR, or close it if abandoned. |
| 20 | 19.0 (19) | -1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Waiting on author to sign the CLA before dart-ecosystem-team reviews. |
| 21 | 28.0 (28) | +7.0 | 0.03 | 0/1 | dart-lang/tools#2544 | B | None; waiting on jonasfj to address lrhn's review feedback. |
| 22 | 24.0 (24) | +2.0 | 0.08 | 0/1 | dart-lang/tools#2710 | B | Wait for the base PR (#2563) to be reviewed and merged first. |
| 23 | 21.0 (21) | -2.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Waiting on review from liamappelbe. |
| 24 | 22.0 (22) | -2.0 | 0.10 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for @sigurdm to reply on whether the PR is good to merge without @natebosch's review. |
| 25 | 23.0 (23) | -2.0 | 0.10 | 0/1 | dart-lang/http#579 | B | Waiting for a future major breaking release of package:http to coordinate landing breaking API changes. |
| 26 | 16.0 (16) | -10.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1932 | B | Follow up on PR #2034, which addresses this issue. |
| 27 | 29.0 (29) | +2.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | No action needed; Flutter DevTools team and bkonyi are handling this feature request. |
| 28 | 26.0 (26) | -2.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | Waiting for a community contribution to implement WinHTTP support. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None, as I am not responsible for http2 issues in dart-lang/http. |
| 31 | 27.0 (27) | -4.0 | 0.03 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review the PR. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on @mosuem to review this http2 PR. |
| 33 | 30.0 (30) | -3.0 | 0.02 | 0/1 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide whether to pursue or close the issue. |
| 34 | 31.0 (31) | -3.0 | 0.02 | 0/1 | dart-lang/http#1972 | B | Waiting on the reporter to provide reproduction details and answer questions. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | None; any review or discussion should take place on PR #2002. |
| 36 | 34.0 (34) | -2.0 | 0.00 | 0/1 | dart-lang/sdk#38148 | B | None; this issue was marked as not important and nothing directed at me has happened since. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/tools#2715** (truth #31) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#366** (truth #13) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#579** (truth #25) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a TLS trust security issue that I created and am assigned to. A commenter recently raised urgent security concerns regarding the compromised eMudhra intermediate CAs and asked whether Android revocation/blocklists are honored. Even with a related fix (#64644) recently landing, verifying certificate trust behavior and addressing security questions on an assigned issue demands immediate attention.
- **Next action:** Verify how Dart handles disabled and revoked Android CAs in light of the recent eMudhra incident, and respond to the security inquiry.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR fixing a package release issue for google-cloud-dart. Your collaborator kevmoo reviewed it and raised a specific question about whether Bump should append to lib.Keep or LanguageDart should auto-preserve CHANGELOG.md. You need to answer his feedback and adjust the implementation to keep your PR moving.
- **Next action:** Respond to kevmoo's review comment regarding CHANGELOG.md handling and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open pull request from my collaborator sigurdm in googleapis/google-cloud-dart, a repository I am responsible for. No human review has taken place yet, making me the default reviewer. It has been waiting for five days, so reviewing it is on me to unblock the Pub/Sub package release.
- **Next action:** Review sigurdm's PR adding Pub/Sub client attribution headers and pre-release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I maintain, making me the default reviewer (the automated bot review does not count). It provides a concrete bug fix for REST error retry handling. Because it comes from an external contributor rather than a close collaborator, it falls in the lower half of the review priority bracket.
- **Next action:** Review this PR fixing RPC status codes for REST errors.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** In a repository I am responsible for, an outside contributor has submitted a design sketch for enum handling in response to my request to align before writing code. They are waiting on my feedback to move forward with the implementation.
- **Next action:** Reply to Yusufihsangorgel's design proposal for the ProtoEnum representation changes.

### 6. dart-lang/http#2027 → predicted 11, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in a repository you own (`dart-lang/http`) to explore tightening `Client.close` semantics. Because it is your own planned work and no one else is currently driving it or waiting on info, progress is up to you. As it has been open for over a week without updates, it sits in the planned work priority tier.
- **Next action:** Decide whether to make `Client.close` asynchronous for a 2.0 release and prepare a proposal or PR.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this feature request to yourself in dart-lang/http and commented that you have started working on it. This falls into your own planned work and active commitments in a repository you maintain. Keep making progress on the implementation.
- **Next action:** Implement the server trust evaluation hook in CupertinoClient and open a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 8, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in a repository I maintain (google-cloud-dart) and was filed by a close collaborator (kevmoo). kevmoo answered my question about JSON buffering, leaving the next step on me to fix the mid-stream error swallowing bug and address streaming request handling. Even though kevmoo noted this is not urgent, collaborator issues with clear acceptance criteria in my own repositories take priority over items waiting on others.
- **Next action:** Implement mid-stream error handling and evaluate incremental JSON parsing for _makeStreamingRequest.

### 9. dart-lang/sdk#59846 → predicted 10, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am assigned to this issue regarding invalid characters being accepted by dart:io's HTTP header parser. Although it has had no new activity in 22 months, it is an assigned issue in core networking code that I should either address or unassign myself from. It sits in the planned work / backlog tier rather than higher urgency since there is no fresh activity or blocker.
- **Next action:** Fix the HTTP header parser validation in dart:io, or unassign myself if I am not working on it.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in a repository I maintain and was filed by a close collaborator. I asked a substantive design question 16 days ago regarding the trade-offs in API surface size between discovery and proto formats, and we are waiting on his feedback before moving forward. Because it is an unanswered question in my own repository, it stays visible but is not immediately actionable.
- **Next action:** Waiting on @kevmoo to reply regarding whether switching to discovery is preferable over adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.37
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a serious production bug in widely used code (`dart:io` HttpClient) where uncatchable exceptions can crash servers. Close collaborator kevmoo and parlough specifically CC'd me to adopt an abandoned CL fixing this issue. However, because I was only CC'd and the thread has been dormant for over 20 months, it belongs at the lower end of the range for old but important CC'd issues.
- **Next action:** Decide whether to adopt abandoned Gerrit CL 144346 to fix uncatchable HttpExceptions in dart:io.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** I filed and assigned this issue to myself, but I already opened PR #3763 to address it. Because there is an active PR implementing the fix, all work should focus on the PR rather than the issue itself. Consequently, this issue requires no direct action right now and stays in the low priority range.
- **Next action:** Follow up on the fix in PR #3763.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.55
- **Ground truth:** 
- **Model:** This issue in a repository I maintain was opened by close collaborator sigurdm to track required dependency version bumps before upcoming package releases. I commented 17 days ago considering whether to automate this, but no PR has been created yet. The ball is in my court to either implement the pubspec updates manually or automate them.
- **Next action:** Decide on an approach and update the `google_cloud_rpc` dependency constraints in `google_cloud_storage` and `google_cloud_pubsub`.

### 14. dart-lang/tools#2719 → predicted 15, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision update in dart-lang/tools, which is not a repository I maintain. The review request is directed broadly to dart-ecosystem-team rather than to me personally, so this is waiting on the package maintainers or other team members to handle.
- **Next action:** Wait for a maintainer of dart-lang/tools or another dart-ecosystem-team member to review.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in googleapis/google-cloud-dart is addressed by an open pull request (#382). Because the fix is already implemented in PR #382 and waiting for my review, there is nothing to do on the issue itself. Per the duplicate guidance, the issue is ranked well below the PR in the 0.15–0.35 range.
- **Next action:** Review PR #382 instead of acting on this issue directly.

### 16. dart-lang/http#2034 → predicted 20, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR fixing a Cronet namespace duplication issue in dart-lang/http. You requested a review from goderbauer two days ago, so it is waiting on their review before you can take any further action.
- **Next action:** Wait for @goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue filed by collaborator kevmoo in a repository I maintain, and I assigned it to myself to work on. I recently researched retry patterns and scoped the work down, so the next step is implementing the planned transport and exception handling changes in google_cloud_rpc.
- **Next action:** Implement the RetryRunner and RequestOptions wiring and FormatException fix in package:google_cloud_rpc, or unassign myself.

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem requested my review, this PR is at the top of a stack with earlier PRs (such as #2014) that have not yet been reviewed or merged. In addition, this change is in package:http2, which is an area I am not directly responsible for. Reviewing the prerequisite PRs should happen before this release preparation can proceed.
- **Next action:** Wait for earlier PRs in the stack to be reviewed and landed before reviewing this release preparation.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding initial DNS support in a repository I maintain, but it has been stale for 45 days and has accumulated merge conflicts. Only an automated bot has reviewed it, so no one else is blocked waiting on me. It falls into the category of stale draft PRs that I need to either resume or abandon.
- **Next action:** Resolve merge conflicts and address bot feedback to finish the PR, or close it if abandoned.

### 20. dart-lang/core#1007 → predicted 19, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a PR in dart-lang/core, a repository I am not directly responsible for, and the review was requested from dart-ecosystem-team rather than me personally. Additionally, the PR is currently blocked waiting on the first-time contributor to sign the CLA.
- **Next action:** Waiting on author to sign the CLA before dart-ecosystem-team reviews.

### 21. dart-lang/tools#2544 → predicted 28, priority 0.03
- **Ground truth:** 
- **Model:** This is a security-related PR in a repository I do not maintain (dart-lang/tools), requested only via the dart-ecosystem-team. Another reviewer (lrhn) has already stepped in and left thorough comments, which the author has not yet addressed. Because it is outside my repositories and already being handled by someone else, no action is needed from me.
- **Next action:** None; waiting on jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on PR #2563, which is still a draft and has not been reviewed yet. Additionally, the review request was sent to the dart-ecosystem-team rather than to you personally, and dart-lang/tools is not a repository you maintain. No action is required from you at this time.
- **Next action:** Wait for the base PR (#2563) to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 21, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** I opened this pull request and requested a review from liamappelbe two days ago. Since only a few days have passed, there is no action needed from me until they respond with feedback. Per guidelines, my own PRs waiting on a recently requested review sit in the ~0.1 range.
- **Next action:** Waiting on review from liamappelbe.

### 24. googleapis/google-cloud-dart#373 → predicted 22, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in google-cloud-dart. @sigurdm approved the Pub/Sub changes, and I pinged him 4 days ago to ask if he can sign off on the rest of the PR to spare @natebosch. Because it has been under a week since my question, it is waiting on his response and does not need immediate action.
- **Next action:** Wait for @sigurdm to reply on whether the PR is good to merge without @natebosch's review.

### 25. dart-lang/http#579 → predicted 23, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces a breaking API change and is explicitly labeled 'next-breaking-release'. I previously noted that review and landing are deferred until we are ready to coordinate a major semver release. There is no immediate action required until work begins on the next breaking version of package:http.
- **Next action:** Waiting for a future major breaking release of package:http to coordinate landing breaking API changes.

### 26. dart-lang/http#1932 → predicted 16, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I already opened PR #2034 to resolve this Cronet namespace collision issue. Because an active PR is addressing the problem, any further work belongs on that PR rather than this issue thread. Consequently, this issue is kept at a low priority.
- **Next action:** Follow up on PR #2034, which addresses this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.02
- **Ground truth:** 
- **Model:** I was only mentioned as an informational CC over two years ago in a repository I do not maintain. There is no question or action directed at me, and DevTools/profiling owners are driving the discussion.
- **Next action:** No action needed; Flutter DevTools team and bkonyi are handling this feature request.

### 28. dart-lang/http#1837 → predicted 26, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded a year ago stating that the Dart team is unlikely to take this on and labeled it as contributions-welcome and P3. There has been no activity since, so this remains dormant backlog waiting on an outside contributor.
- **Next action:** Waiting for a community contribution to implement WinHTTP support.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I reviewed and approved this PR two days ago, and there has been no new activity since. The ball is entirely in mosuem's court to land it.
- **Next action:** Waiting on mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is specifically labeled 'package:http2' within dart-lang/http, which is explicitly outside my area of responsibility. Furthermore, I have never been pinged or involved in the discussion, so there is nothing for me to do.
- **Next action:** None, as I am not responsible for http2 issues in dart-lang/http.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.03
- **Ground truth:** 
- **Model:** This pull request is in dart-lang/tools, a repository I am not responsible for. Although it was filed by a collaborator and requested my team, davidmorgan was explicitly requested as an individual reviewer, so there is nothing for me to do.
- **Next action:** Waiting on davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This pull request is in package:http2, which is an area of dart-lang/http I explicitly do not cover. The author has directly requested a review from mosuem, so there is no action needed from me.
- **Next action:** Waiting on @mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 30, priority 0.02
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to liamappelbe. I previously chimed in with context, but no questions or actions are directed at me, and the thread has been dormant for over a month.
- **Next action:** Waiting on liamappelbe to decide whether to pursue or close the issue.

### 34. dart-lang/http#1972 → predicted 31, priority 0.02
- **Ground truth:** 
- **Model:** I asked for clarification and reproduction steps 8 days ago and labeled the issue 'needs-info', with no response yet from the reporter. Furthermore, there is an open PR (#1974) addressing this bug, meaning any potential action would occur on the PR rather than this issue. Per guidance, issues waiting on information from the reporter should remain scored near zero until they respond.
- **Next action:** Waiting on the reporter to provide reproduction details and answer questions.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You gave this issue a thumbs-down on 2026-10-05 and no new activity has occurred on it since. Furthermore, an open PR (#2002) addresses this issue, so any required review belongs on the PR rather than here.
- **Next action:** None; any review or discussion should take place on PR #2002.

### 36. dart-lang/sdk#38148 → predicted 34, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I marked this issue as not important in August 2026. While another contributor commented and a commit referenced this issue recently, neither was directed at me, nor was I mentioned or asked to act. Since dart-lang/sdk is not one of my primary repositories and no significant actions have targeted me since the thumbs-down, this remains scored at 0.0.
- **Next action:** None; this issue was marked as not important and nothing directed at me has happened since.
