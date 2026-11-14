# Gitilizer eval: v5g-claude-haiku

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5g.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031305

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.613 ± 0.033 |
| spearman | 0.747 ± 0.015 |
| pairwise_acc | 0.806 ± 0.017 |
| ndcg | 0.978 ± 0.001 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.055 ± 0.389 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.772 ± 0.058 | 0.995 ± 0.002 | 0.800 ± 0.000 | 1.417 ± 0.382 |
| B | 20 | 0.456 ± 0.016 | 0.923 ± 0.021 | 0.533 ± 0.115 | 3.967 ± 0.058 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist mitigations (see dart-lang/sdk#64644, now closed as completed) and reply to the security question, then close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.87 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's inline review question on bump.go about whether Bump should add CHANGELOG.md to lib.Keep or clean should auto-preserve it, then push the fix. |
| 3 | 3.3 (3–4) | +0.3 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 myself (sigurdm's pre-release polish, default reviewer for this repo), starting with the client attribution header change in client.dart and the version check test. |
| 4 | 3.7 (3–4) | -0.3 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 in google-cloud-dart, since no human has reviewed it yet and it fixes the ABORTED retry bug in #381. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's 2026-10-21 design sketch (nullable number and string on ProtoEnum, with toJson and toQueryValue) and reply with approval or changes so they can start the PR. |
| 6 | 11.0 (10–12) | +5.0 | 0.53 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue the Client.close design (track outstanding requests or make close async for a 2.0), since this is my own fresh planned work in dart-lang/http. |
| 7 | 7.7 (7–8) | +0.7 | 0.60 | 3/3 | dart-lang/http#1981 | B | Carry out the work I announced: design and implement the serverTrustEvaluator hook in CupertinoClient, or check whether umair9430 is preparing the skeleton PR I asked for. |
| 8 | 11.7 (11–13) | +3.7 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo's question about whether servers send incremental JSON, or check the Google API behavior, then decide whether to pursue the SSE error-frame fix now. |
| 9 | 12.3 (12–13) | +3.3 | 0.50 | 3/3 | dart-lang/sdk#59846 | B | Triage whether to fix the dart:io HTTP header-name validation to match RFC 9110 tchar rules, since I'm assigned and it has been untouched for 22 months. |
| 10 | 6.0 (6) | -4.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#361 | A | Reply to kevmoo's question on whether to switch compute_v1 to discovery or add convenience extensions to the proto-based service operations, since the decision is now waiting on me. |
| 11 | 19.3 (14–26) | +8.3 | 0.24 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed from me now; this is a dart-lang/sdk bug I'm only CC'd on, with no open PR and no request directed at me. |
| 12 | 16.3 (15–18) | +4.3 | 0.27 | 3/3 | dart-lang/native#3752 | B | Finish and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue. |
| 13 | 18.3 (17–19) | +5.3 | 0.23 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump and librarian automation decision before adding the pubspec constraints. |
| 14 | 17.3 (17–18) | +3.3 | 0.22 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since the dart-ecosystem-team review request is shared and no one has reviewed it yet. |
| 15 | 13.0 (9–15) | -2.0 | 0.38 | 3/3 | googleapis/google-cloud-dart#381 | A | Review linked PR #382 (fix for Status.code in fromHttpResponse) and then close this issue when the PR merges. |
| 16 | 27.7 (27–29) | +11.7 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; ping them if there is still no response by around 2026-10-30. |
| 17 | 9.3 (8–10) | -7.7 | 0.60 | 3/3 | googleapis/google-cloud-dart#359 | B | Decide whether to start the ServiceClient/RequestOptions implementation now, since the HTML-502 FormatException fix is a concrete, self-contained first step. |
| 18 | 15.3 (13–19) | -2.7 | 0.27 | 3/3 | dart-lang/http#2031 | A | Review the release-prep PR #2031 once its stacked PRs (#2010, #2014, #2009) are reviewed, since I'm the requested reviewer but it sits on unreviewed lower PRs. |
| 19 | 18.7 (16–20) | -0.3 | 0.22 | 0/3 | googleapis/google-cloud-dart#345 | A | Nothing needed now; this is my own draft that I should either finish (fix the 5 unresolved Gemini threads and merge conflicts) or abandon. |
| 20 | 22.7 (22–23) | +2.7 | 0.14 | 0/3 | dart-lang/core#1007 | B | Wait for the author to sign the CLA; the PR cannot be reviewed until the CLA check passes. |
| 21 | 21.0 (21) | +0.0 | 0.20 | 3/3 | dart-lang/tools#2544 | B | Review the PR as a dart-ecosystem-team member, checking lrhn's open threads and whether the 6 unresolved review threads are addressed by jonasfj's latest commits. |
| 22 | 25.7 (23–29) | +3.7 | 0.11 | 0/3 | dart-lang/tools#2710 | B | Wait for a dart-ecosystem-team member to review PR #2710; it is stacked on draft #2563, so review of the lower PR comes first. |
| 23 | 28.7 (28–30) | +5.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them if there is still no response after about a week (around 2026-10-30). |
| 24 | 26.0 (24–30) | +2.0 | 0.12 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for natebosch's review (or sigurdm's answer on the non-Pub/Sub parts) before merging; nothing for me to do right now except possibly resolve the 2 open threads and rebase since the branch is behind. |
| 25 | 31.0 (31) | +6.0 | 0.10 | 0/3 | dart-lang/http#579 | B | Nothing for me now; this is blocked on a future semver-major release, so the only open question is a workaround answer for retendo, which I can defer. |
| 26 | 13.0 (9–16) | -13.0 ⚠️ | 0.39 | 3/3 | dart-lang/http#1932 | B | Review and merge the open PR dart-lang/http#2034 that fixes the cronet namespace duplication, then reply to igordanilovski and close this issue once verified. |
| 27 | 34.3 (34–35) | +7.3 | 0.04 | 0/3 | flutter/devtools#8223 | B | Nothing for me to do; the request is a feature in flutter/devtools that I'm only CC'd on, and it is blocked on dart:io network profiling work owned by others. |
| 28 | 33.3 (33–34) | +5.3 | 0.05 | 0/3 | dart-lang/http#1837 | A | Nothing to do; the issue is contributions-welcome and I already replied that the Dart team is unlikely to take it on. |
| 29 | 36.0 (36) | +7.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing for me; I already approved and the PR is clean, so it is waiting on mosuem to merge. |
| 30 | 34.3 (33–35) | +4.3 | 0.04 | 0/3 | dart-lang/http#1365 | A | No action needed from me; leave it open as a low-priority backlog item, since I only watch dart-lang/http and am not responsible for http2. |
| 31 | 25.3 (22–28) | -5.7 | 0.12 | 0/3 | dart-lang/tools#2715 | B | Nothing for me now; waiting on davidmorgan or dart-ecosystem-team to review kevmoo's PR, and I am only a member of the team that was asked. |
| 32 | 26.0 (25–27) | -6.0 | 0.10 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem (or another http2 maintainer) to review PR #2026; I am not the reviewer for http2 and nothing is asked of me. |
| 33 | 25.7 (22–30) | -7.3 | 0.12 | 0/3 | dart-lang/native#3653 | A | Nothing for me to do; liamappelbe is assigned and has decided not to pursue the trampoline approach, so the issue is effectively parked. |
| 34 | 32.0 (32) | -2.0 | 0.05 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter (Keetz) to answer the two questions about client type and server behavior, which are blocking any further progress. |
| 35 | 24.3 (20–29) | -10.7 ⚠️ | 0.14 | 0/3 | dart-lang/http#1841 | B | Nothing needed now; the fix is in open PR #2002 by agam1092005, so wait for that PR to be reviewed and tracked by the next-breaking-release label. |
| 36 | 7.7 (7–9) | -28.3 ⚠️ | 0.61 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's 24d-old comment offering a concrete repro path and start investigating the intermittent recursive delete failure in the VM's directory deletion code. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/native#3653** (truth #33) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue I authored and am assigned, and it has fresh activity three days ago raising whether the compromised eMudhra intermediate CAs are still trusted, which the policy says must rank at the top of the scale. The linked issue #64644 was closed as completed two days ago, so verifying the fix and responding to the reporter's questions is concrete work for me. Leaving a security issue in an unknown state is not acceptable.
- **Next action:** Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist mitigations (see dart-lang/sdk#64644, now closed as completed) and reply to the security question, then close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR with an unanswered review question from a close collaborator (kevmoo) that identifies a real bug: generate would delete the newly created CHANGELOG.md. The PR is also blocking the fix for google-cloud-dart#358, so my response unblocks a stuck release. Activity is fresh (21h), and the PR sits in the blocking-my-own-PR band with an unresolved thread.
- **Next action:** Reply to kevmoo's inline review question on bump.go about whether Bump should add CHANGELOG.md to lib.Keep or clean should auto-preserve it, then push the fix.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This PR is in google-cloud-dart, a repository I'm responsible for, and it has no human review yet with review_decision REVIEW_REQUIRED, so as default reviewer the next step is mine. The author is a close collaborator (sigurdm), which places it at the top of the review-waiting range. It is only 5 days old and has no security content, so it sits at the upper-middle of the 0.65-0.8 band rather than higher.
- **Next action:** Review PR #376 myself (sigurdm's pre-release polish, default reviewer for this repo), starting with the client attribution header change in client.dart and the version check test.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open PR in a repository I'm responsible for, and no human reviewer has looked at it; the only review is from a bot, which doesn't count. I'm the default reviewer for my repositories, so the review is mine to do now. The author is a first-time contributor, so it sits below collaborator PRs, but the change fixes a real bug where ABORTED errors over REST are never retried and is only three days old. The change also alters status.code for JSON errors, so I should check the downstream effects, including the google_cloud_storage test the description mentions.
- **Next action:** Review PR #382 in google-cloud-dart, since no human has reviewed it yet and it fixes the ABORTED retry bug in #381.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own issue in a repository I maintain, and the contributor's latest comment is a concrete design proposal waiting on my answer. I asked for a design before code, so they are blocked until I respond. It is 4 days old, which is fresh, but the change is a breaking API change, so the reply needs care. It is not a security issue and not a collaborator's PR, so it sits in the 0.65–0.8 range rather than above.
- **Next action:** Review Yusufihsangorgel's 2026-10-21 design sketch (nullable number and string on ProtoEnum, with toJson and toQueryValue) and reply with approval or changes so they can start the PR.

### 6. dart-lang/http#2027 → predicted 12, priority 0.50
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue filed 9 days ago in dart-lang/http, a repository I work in, with no one else waiting on it, so it counts as fresh planned work in the 0.5-0.65 range. Nothing has happened since I opened it and there is no reply or external blocker, so it sits at the lower end of that range. The repo note says I'm not responsible for http2, but this issue concerns the core Client API, so it is in scope.
- **Next action:** Decide whether to pursue the Client.close design (track outstanding requests or make close async for a 2.0), since this is my own fresh planned work in dart-lang/http.

### 7. dart-lang/http#1981 → predicted 8, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself and said I've started working on this 5 hours ago, so it is my own committed work and nothing is blocking me on anyone else. The request is a non-security feature in a repository I own, so it sits in the planned-work range, and it is fresh from today. It isn't higher because the API design is still unsettled and I had said I couldn't promise to accept a PR.
- **Next action:** Carry out the work I announced: design and implement the serverTrustEvaluator hook in CupertinoClient, or check whether umair9430 is preparing the skeleton PR I asked for.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a non-security issue in a repository I am responsible for, filed by a close collaborator (kevmoo) with a concrete proposed fix. kevmoo's last comment was 17 days ago and asked nothing directly of me beyond discussion, and I already replied once, so the next step is mine but not urgent. The SSE error-frame silently yielding empty messages is a real correctness hole, which keeps it in the planned-work range rather than lower.
- **Next action:** Reply to kevmoo's question about whether servers send incremental JSON, or check the Google API behavior, then decide whether to pursue the SSE error-frame fix now.

### 9. dart-lang/sdk#59846 → predicted 13, priority 0.45
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am the assignee, so this is work I should either fix or unassign, which places it in the 0.5-0.65 range, but it is stale (nothing human-side since January 2025) and the repository is not one I own, so it sits at the low end. The issue is a genuine protocol-conformance bug affecting dart:io, with a plausible proxy-interop impact, but it is not a security report. I have not commented or acted on it myself, so there is no reply pending.
- **Next action:** Triage whether to fix the dart:io HTTP header-name validation to match RFC 9110 tchar rules, since I'm assigned and it has been untouched for 22 months.

### 10. googleapis/google-cloud-dart#361 → predicted 6, priority 0.70
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** kevmoo is a close collaborator in a repository I'm responsible for and asked for a decision. My last comment (16d ago) posed a question back to him and he hasn't replied since, so the next move is mine to make. The issue is a non-security feature/design question with no urgent deadline, so it sits in the 0.65–0.8 range for collaborator follow-up but toward its lower end.
- **Next action:** Reply to kevmoo's question on whether to switch compute_v1 to discovery or add convenience extensions to the proto-based service operations, since the decision is now waiting on me.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** The issue is a real crash bug in dart:io HttpClient affecting production, and it has been CC'd to me twice (once by kevmoo, a close collaborator). However, the next step is blocked on an SDK owner taking up the abandoned CL, and I'm not responsible for dart-lang/sdk. Nothing has happened in roughly 20 months, so it sits at the low end of the CC range.
- **Next action:** Nothing needed from me now; this is a dart-lang/sdk bug I'm only CC'd on, with no open PR and no request directed at me.

### 12. dart-lang/native#3752 → predicted 16, priority 0.30
- **Ground truth:** 
- **Model:** This is my own issue, assigned to me and filed 6 days ago in a repository I maintain, so it is planned work. However, a linked open PR (#3763, authored by me and updated 2 days ago) already covers the fix, so the issue itself has nothing left to do beyond that PR. The issue sits in the low range because the real action belongs to the PR, and it sinks below that PR.
- **Next action:** Finish and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 17, priority 0.30
- **Ground truth:** 
- **Model:** This is a non-security tracking issue in my repository with no new human activity since my own comment 17 days ago. The remaining work is blocked on a version bump that hasn't happened yet, and I'm the one who last moved it while deciding on a general fix. It stays visible because the pubspec constraints are a real release risk for google_cloud_storage and google_cloud_pubsub, but I have nothing concrete to do right now.
- **Next action:** Wait for the generated google_cloud_rpc version bump and librarian automation decision before adding the pubspec constraints.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, a repository I don't own, so it falls in the 0.1–0.25 band. It was opened only 19 hours ago with no human activity, so it is fresh but not personally addressed to me. The PR is an automated routine dependency bump, and mergeable_state is blocked, which makes it low urgency for me.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since the dart-ecosystem-team review request is shared and no one has reviewed it yet.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue is covered by open PR #382, so per the duplicate rule the PR is the thing to act on and the issue ranks well below it. The issue itself has no new human activity beyond the reporter opening it three days ago, and I'm only a watcher of this repo, not the author or assignee. The bug is a real retry-correctness problem in a package I'm responsible for, so it stays visible in the low-middle range rather than near zero.
- **Next action:** Review linked PR #382 (fix for Status.code in fromHttpResponse) and then close this issue when the PR merges.

### 16. dart-lang/http#2034 → predicted 27, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR, and I requested a review from goderbauer only 2 days ago, so the next step belongs to the reviewer. The PR is in a repository I work in and fixes issue #1932, which is useful, but nothing is needed from me until about a week of silence has passed. Since the linked issue is covered by this PR, it should also sit low on my list.
- **Next action:** Wait for goderbauer to review PR #2034; ping them if there is still no response by around 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 10, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an assigned issue in a repository I own, with a clear next step that is mine: wrap the JSON decode in ServiceException.fromHttpResponse and extend ServiceClient with retry. I was the last human to act (commented 10 days ago with retry examples and scoped out the AIP-4222 part), so nothing is waiting on anyone else. It sits in the planned-work range, not urgent, and the related dependency PRs are already merged so the path is open.
- **Next action:** Decide whether to start the ServiceClient/RequestOptions implementation now, since the HTML-502 FormatException fix is a concrete, self-contained first step.

### 18. dart-lang/http#2031 → predicted 19, priority 0.20
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I am a requested reviewer, but this PR is stacked on #2014, which still has no review and is waiting on me, and #2010 and #2009 are approved but not yet merged. Since the lower PRs need to land first, this one is blocked, so it's low priority for now. It is in dart-lang/http, a repo I watch, but in http2 which I'm explicitly not responsible for. It is a small version bump, so it can be handled quickly once the stack clears.
- **Next action:** Review the release-prep PR #2031 once its stacked PRs (#2010, #2014, #2009) are reviewed, since I'm the requested reviewer but it sits on unreviewed lower PRs.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I am responsible for, untouched for 45 days, and I converted it to draft myself. It is dirty (merge conflicts) with unresolved review threads, but there is no reviewer waiting on me, so it falls in the own-drafts range of 0.15–0.35. Its staleness sinks it toward the lower end of that range.
- **Next action:** Nothing needed now; this is my own draft that I should either finish (fix the 5 unresolved Gemini threads and merge conflicts) or abandon.

### 20. dart-lang/core#1007 → predicted 23, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request to dart-ecosystem-team in dart-lang/core, a repository I don't own, so it sits in the low team-review range. The CLA check is failing and mergeable_state is blocked, so nothing can be reviewed yet and the next move belongs to the first-time contributor. The fix does address a real bug (issue #537) in a widely used package, which keeps it slightly above zero, but there is no action for me today.
- **Next action:** Wait for the author to sign the CLA; the PR cannot be reviewed until the CLA check passes.

### 21. dart-lang/tools#2544 → predicted 21, priority 0.20
- **Ground truth:** 
- **Model:** This is a security-related PR, but it is in dart-lang/tools, a repository I'm not responsible for, and the review is only requested via a team I belong to, which the rubric puts at 0.1-0.25. Reviewer lrhn is already actively reviewing and the author pushed commits on Aug 21 but has not responded to lrhn's Aug 26 comments, so the next step is not clearly mine. Since the rules say security PRs needing me rank at the top, but this one is not mine personally, I place it at the top of the team-review band.
- **Next action:** Review the PR as a dart-ecosystem-team member, checking lrhn's open threads and whether the 6 unresolved review threads are addressed by jonasfj's latest commits.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.12
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, which I do not own, and I am not named personally, so it sits in the low team-request range. The PR is stacked on draft #2563 and is blocked, so nothing can merge yet. The author is a close collaborator and the last activity was two days ago, but I have no concrete step to take right now.
- **Next action:** Wait for a dart-ecosystem-team member to review PR #2710; it is stacked on draft #2563, so review of the lower PR comes first.

### 23. dart-lang/native#3763 → predicted 28, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, and I requested review from liamappelbe only 2 days ago, so nothing is due from me yet. No reviewer has responded and the PR is blocked on review, so it sits in the 0.05–0.15 range for PRs waiting on a recently asked reviewer. It is in a repository I own and it fixes two open issues, which keeps it near the top of that range rather than at the bottom.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them if there is still no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 24, priority 0.15
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, approved by sigurdm, but I already pinged him 4 days ago and the review requested of natebosch is pending, so I'm waiting on reviewers rather than blocked by unanswered feedback. The branch is behind main and has 2 unresolved threads, which I could tidy up, but these don't block anyone. It is in a repository I own, so it stays out of the bottom range, yet nothing is directly waiting on me.
- **Next action:** Wait for natebosch's review (or sigurdm's answer on the non-Pub/Sub parts) before merging; nothing for me to do right now except possibly resolve the 2 open threads and rebase since the branch is behind.

### 25. dart-lang/http#579 → predicted 31, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR is explicitly labeled next-breaking-release and I already said I lack bandwidth to coordinate a major release, so the next step is not mine today. I am a requested reviewer, but the blocker is a plan rather than missing review, which pins it in the 0.05–0.15 band. The latest comment from retendo is a question to me about a workaround, which is mildly fresh but not blocking anyone, so it stays low rather than rising.
- **Next action:** Nothing for me now; this is blocked on a future semver-major release, so the only open question is a workaround answer for retendo, which I can defer.

### 26. dart-lang/http#1932 → predicted 9, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I am the assignee and the linked PR #2034 (authored by me) is the concrete fix, so the real work is landing it. The latest human activity is a 4-day-old 'any updates?' ping from igordanilovski, which is a status request that I can answer now. Because a PR already covers this issue, it sits somewhat below the PR itself, but as an assigned issue in a repo I work in with fresh activity it still merits the mid-high range.
- **Next action:** Review and merge the open PR dart-lang/http#2034 that fixes the cronet namespace duplication, then reply to igordanilovski and close this issue once verified.

### 27. flutter/devtools#8223 → predicted 35, priority 0.04
- **Ground truth:** 
- **Model:** I was only informationally CC'd by bkonyi in a 2024 comment, and the repository is not one I'm responsible for. The latest activity is a label change by srawlins removing 'cost: high', which doesn't ask anything of me. The feature depends on dart:io network profiling work that isn't mine to drive, so it sits at the bottom of the range.
- **Next action:** Nothing for me to do; the request is a feature in flutter/devtools that I'm only CC'd on, and it is blocked on dart:io network profiling work owned by others.

### 28. dart-lang/http#1837 → predicted 34, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** I answered the feature request 12 months ago and labeled it P3 and contributions-welcome, so the next step belongs to a community member. Nothing has happened since, and the work is outside the scope I'm responsible for. The related flutter issue is not a request to me either.
- **Next action:** Nothing to do; the issue is contributions-welcome and I already replied that the Dart team is unlikely to take it on.

### 29. dart-lang/http#2033 → predicted 36, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR two days ago and nothing has happened since, with mergeable_state clean and no unresolved threads. The PR is a CI infrastructure change from a close collaborator in a repository I'm responsible for, but my review is done and the remaining step (merge) belongs to the author. Per the scale, approved and quiet items sit at or near 0.
- **Next action:** Nothing for me; I already approved and the PR is clean, so it is waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 33, priority 0.05
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is a six-year-old performance enhancement issue in http2, a subpackage I explicitly noted I am not responsible for. The last human comment from lubritto asks whether it should be closed, which is a triage question for maintainers, not a request to me. Nothing is directed at me and I have no involvement beyond watching the repo, so it sits at the bottom of the range.
- **Next action:** No action needed from me; leave it open as a low-priority backlog item, since I only watch dart-lang/http and am not responsible for http2.

### 31. dart-lang/tools#2715 → predicted 22, priority 0.15
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, a repository I am not responsible for, so it sits in the 0.1–0.25 band. The author is a close collaborator and the PR is fresh, but davidmorgan is also named as a reviewer, which pushes it toward the low end. It is not a security item and no one has asked me anything directly.
- **Next action:** Nothing for me now; waiting on davidmorgan or dart-ecosystem-team to review kevmoo's PR, and I am only a member of the team that was asked.

### 32. dart-lang/http#2026 → predicted 26, priority 0.10
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in http2, which the user explicitly said they are not responsible for, and only watches the repo. The author asked mosuem, not me, for a review, and no review request names me or my team. The PR is fresh and fixes a real crash, but the next step belongs to mosuem, so it sits in the low range for a stale-but-visible item I am not driving.
- **Next action:** Wait for mosuem (or another http2 maintainer) to review PR #2026; I am not the reviewer for http2 and nothing is asked of me.

### 33. dart-lang/native#3653 → predicted 30, priority 0.10
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe and the last human activity was liamappelbe's comment 34 days ago, which leaned toward abandoning the trampoline approach in favour of wrapping calls in autorelease pools. My only involvement is as a commenter and a mention ('Thanks for the tip'), with no direct request to me. The related PR #3664 is merged and the related issue #3652 is closed, so there is no open work or question waiting on me.
- **Next action:** Nothing for me to do; liamappelbe is assigned and has decided not to pursue the trampoline approach, so the issue is effectively parked.

### 34. dart-lang/http#1972 → predicted 32, priority 0.05
- **Ground truth:** 
- **Model:** I asked the reporter for information and labeled the issue needs-info 8 days ago, and they have not replied, so the next step is theirs. A PR (#1974) already targets this issue, and it is also labeled needs-info, so the issue sits behind that PR. The reporter is not a collaborator and the issue is not security-related. Nothing is asked of me until they respond.
- **Next action:** Wait for the reporter (Keetz) to answer the two questions about client type and server behavior, which are blocking any further progress.

### 35. dart-lang/http#1841 → predicted 29, priority 0.10
- **Ground truth:** 
- **Model:** An open PR (#2002) covers this issue, so the issue itself has nothing left for me to do and the PR is the thing to track. The issue is labeled next-breaking-release, which is a plan-based block, and the user has thumbs-downed it since 2026-10-05 with no significant new request directed at me after that. agam1092005's comment is an offer to work on it and mentions me, but it asks for nothing that needs an answer from me right now. Ranked low with the PR as the real item.
- **Next action:** Nothing needed now; the fix is in open PR #2002 by agam1092005, so wait for that PR to be reviewed and tracked by the next-breaking-release label.

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.62
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm the assignee and this is a non-security issue with new human information (filiph reproduced it locally on Dart 3.13.5) that I need to verify, so it sits in the 0.65–0.8 band, but it's a real bug in a widely used API that I own, so I'd place it at the lower end of the planned-work range. A recent commit referencing it (4d ago) may have touched the area, which makes verification worthwhile. My thumbs-down was from August, and filiph's October comment is after it, so the item is not zeroed out. Priority is set around 0.62 since filiph's reproduction is new and actionable, but I have no sign it's blocked.
- **Next action:** Reply to filiph's 24d-old comment offering a concrete repro path and start investigating the intermittent recursive delete failure in the VM's directory deletion code.
