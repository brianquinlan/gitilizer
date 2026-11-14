# Gitilizer eval: v4-claude-haiku

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261108-024149

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.387 ± 0.022 |
| spearman | 0.488 ± 0.035 |
| pairwise_acc | 0.694 ± 0.011 |
| ndcg | 0.949 ± 0.014 |
| ndcg@5 | 0.935 ± 0.112 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 0.867 ± 0.231 |
| top10_overlap | 0.567 ± 0.058 |
| mean_abs_displacement | 8.019 ± 0.316 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.750 ± 0.029 | 0.990 ± 0.006 | 0.867 ± 0.115 | 1.625 ± 0.125 |
| B | 20 | 0.042 ± 0.073 | 0.845 ± 0.076 | 0.200 ± 0.000 | 6.500 ± 0.265 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Check whether the closed fix in #64644 covers the Android cacerts trust path and the eMudhra intermediates, answer acn-masatadakurihara's questions, then close this issue if it is resolved. |
| 2 | 2.0 (2) | +0.0 | 0.83 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's inline question on bump.go about whether Bump should add CHANGELOG.md to lib.Keep or clean should auto-preserve it, then push the fix. |
| 3 | 3.0 (3) | +0.0 | 0.76 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (no human review yet), starting with the version-header change in client.dart and the new version_test.dart, and check the gemini-code-assist feedback about unhandled StateErrors in the streaming ACK path. |
| 4 | 5.0 (4–7) | +1.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 from first-time contributor quaaantumdev (fixes issue #381) since no human has reviewed it yet. |
| 5 | 6.0 (5–8) | +1.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string on ProtoEnum, unknown integers kept) to approve or change the approach before they write code. |
| 6 | 20.0 (18–23) | +14.0 ⚠️ | 0.30 | 0/3 | dart-lang/http#2027 | B | Wait for design feedback from maintainers or decide on a 2.0 breaking-change plan for Client.close; nothing is blocking on me right now. |
| 7 | 10.3 (10–11) | +3.3 | 0.55 | 3/3 | dart-lang/http#1981 | B | Continue the server trust evaluation hook work for CupertinoClient, since I've said I'm working on it and have assigned it to myself. |
| 8 | 14.0 (12–16) | +6.0 | 0.50 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo's question with a view on whether Google servers send incremental JSON arrays, then decide whether to take the SSE error-frame fix (which is clearly a bug) on its own. |
| 9 | 19.3 (18–20) | +10.3 ⚠️ | 0.35 | 3/3 | dart-lang/sdk#59846 | B | Triage this dart:io header-name validation bug: confirm the RFC 9110 tchar check is missing in the VM HTTP parser and either fix it or unassign yourself. |
| 10 | 16.3 (15–19) | +6.3 | 0.38 | 1/3 | googleapis/google-cloud-dart#361 | A | Follow up with kevmoo on my open question: switch compute_v1 to discovery, or add convenience extensions to the protobuf service operations? |
| 11 | 21.3 (19–25) | +10.3 ⚠️ | 0.32 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed now; this is an old unowned dart:io bug where I was only CC'd, so at most consider whether to take ownership of the library. |
| 12 | 19.0 (17–22) | +7.0 | 0.30 | 3/3 | dart-lang/native#3752 | B | Review and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue once it lands. |
| 13 | 11.0 (8–15) | -2.0 | 0.58 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether the pubspec version-constraint fix should be handled generically through librarian automation, then unblock the google_cloud_storage and google_cloud_pubsub release steps. |
| 14 | 16.3 (6–26) | +2.3 | 0.39 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR dart-lang/tools#2719 (it is blocked on review; check the dart-ecosystem-team review request). |
| 15 | 23.3 (21–26) | +8.3 | 0.23 | 3/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which already fixes this issue, and then the issue can be closed when it merges. |
| 16 | 30.3 (30–31) | +14.3 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; nothing to do until roughly a week has passed since the 2026-10-23 review request. |
| 17 | 8.3 (7–9) | -8.7 | 0.60 | 3/3 | googleapis/google-cloud-dart#359 | B | Start implementing the ServiceException FormatException hardening and the RetryRunner/RequestOptions wiring in ServiceClient, since this issue is assigned to me and I already committed to it. |
| 18 | 16.3 (12–21) | -1.7 | 0.38 | 3/3 | dart-lang/http#2031 | A | Review PR #2031 (http2 3.2.0 release prep), but first review the stacked PRs #2010, #2014 and #2009 it depends on, since this PR is blocked until they land. |
| 19 | 24.7 (24–25) | +5.7 | 0.25 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish or abandon this draft: address the 5 unresolved Gemini review threads (nullable managedZones, Policies_UpdateRequest params) and fix the merge conflicts, or close it. |
| 20 | 26.7 (26–27) | +6.7 | 0.18 | 0/3 | dart-lang/core#1007 | B | Waiting on the contributor to sign the CLA before the PR can be reviewed by dart-ecosystem-team. |
| 21 | 32.7 (32–33) | +11.7 ⚠️ | 0.06 | 0/3 | dart-lang/tools#2544 | B | Nothing for me; the PR is waiting on jonasfj to address lrhn's latest review comments, and lrhn is the named reviewer. |
| 22 | 20.7 (13–27) | -1.3 | 0.32 | 0/3 | dart-lang/tools#2710 | B | Wait for a dart-ecosystem-team member to review PR #2710; it is stacked on draft #2563, so review of #2563 may need to come first. |
| 23 | 31.3 (31–32) | +8.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them again if there is still no response by around 2026-10-30. |
| 24 | 23.7 (23–24) | -0.3 | 0.25 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether the non-PubSub parts are good to merge, or for natebosch to finish his review; I may need to follow up if there is still no reply after about a week. |
| 25 | 14.7 (14–16) | -10.3 ⚠️ | 0.51 | 3/3 | dart-lang/http#579 | B | Reply to retendo's question about a workaround and decide whether this breaking change goes into the next major release or the PR should be closed. |
| 26 | 6.3 (5–8) | -19.7 ⚠️ | 0.67 | 3/3 | dart-lang/http#1932 | B | Review and merge the linked fix PR dart-lang/http#2034 (avoid cronet namespace duplication), then reply to igordanilovski with a status update. |
| 27 | 30.0 (22–36) | +3.0 | 0.12 | 0/3 | flutter/devtools#8223 | B | No action needed from me; this is a flutter/devtools enhancement outside my repositories, where I was only cc'd on a feasibility comment, and it is waiting on the DevTools team. |
| 28 | 33.7 (33–34) | +5.7 | 0.05 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a community contributions-welcome enhancement I already declined to take on, with no new activity since October 2025. |
| 29 | 35.0 (34–36) | +6.0 | 0.03 | 0/3 | dart-lang/http#2033 | A | Nothing for me; I approved it 2d ago and mosuem (collaborator) needs to merge it. |
| 30 | 35.3 (35–36) | +5.3 | 0.03 | 0/3 | dart-lang/http#1365 | A | Nothing for me to do; the open question (is the root cause in http2?) is for the maintainers, and the issue is in http2, which I'm not responsible for. |
| 31 | 9.0 (4–12) | -22.0 ⚠️ | 0.60 | 3/3 | dart-lang/tools#2715 | B | Review PR #2715 (string_scanner bounds validation and eager lastSpan test) from kevmoo, a close collaborator, since it is requested via the dart-ecosystem-team I belong to. |
| 32 | 20.7 (11–30) | -11.3 ⚠️ | 0.30 | 2/3 | dart-lang/http#2026 | A | Review PR #2026 (or ask mosuem to look at the stream_handler overlap with #2013, since shoaib pinged them directly), since it is a first-time contributor's fix for a real assertion crash that is blocked on review. |
| 33 | 28.0 (28) | -5.0 | 0.12 | 0/3 | dart-lang/native#3653 | A | No action needed from me; liamappelbe is deciding whether the deeper trampoline/VM change is worth doing, and the related fix (#3652) is closed. |
| 34 | 29.0 (29) | -5.0 | 0.12 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions about the client used and the server behavior; PR #1974 is open and should be reviewed separately. |
| 35 | 14.3 (13–17) | -20.7 ⚠️ | 0.52 | 3/3 | dart-lang/http#1841 | B | Review PR #2002 (agam1092005's retryDelay callback) since it implements the non-breaking approach I was asked about, and reply to agam1092005 on the design. |
| 36 | 7.3 (6–9) | -28.7 ⚠️ | 0.65 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's 24-day-old offer to help, pointing to the reproduction steps and suggesting where to look (the recursive delete loop in the VM's io implementation), since I'm the assignee and this is untriaged-in-practice work. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/http#1841** (truth #35) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/tools#2715** (truth #31) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/http#1841** (truth #35) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue I created and am assigned, and it has new activity: a 3-day-old report that compromised eMudhra intermediate CAs may still be trusted by dart:io on Android, which is directly about trust decisions this issue covers. Julemand101 points to #64644, which mraleph closed as completed 2 days ago, so a related fix has likely landed, but confirming that and closing or responding is my job. Security items outrank everything else, so this sits at the top of the list.
- **Next action:** Check whether the closed fix in #64644 covers the Android cacerts trust path and the eMudhra intermediates, answer acn-masatadakurihara's questions, then close this issue if it is resolved.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR with an unresolved review thread from a close collaborator (kevmoo) asking a direct question that blocks correctness: the next generate would delete the newly created CHANGELOG.md. Since it is my PR and I have not replied, it sits in the 0.8–0.9 band. It is not security-related and it fixes a real release-skipping bug, so it stays just below the top of the scale.
- **Next action:** Reply to kevmoo's inline question on bump.go about whether Bump should add CHANGELOG.md to lib.Keep or clean should auto-preserve it, then push the fix.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a non-security PR in google-cloud-dart, a repository I am responsible for, and it has been open for 5 days with no human reviewer. Bot reviews don't count, so I am the default reviewer and the next step is mine. It comes from a close collaborator (sigurdm), which places it at the top of the review band, though it is not blocking anyone urgently. The gemini comments describe possible hangs in the streaming ACK path, so they deserve a look during review.
- **Next action:** Review PR #376 (no human review yet), starting with the version-header change in client.dart and the new version_test.dart, and check the gemini-code-assist feedback about unhandled StateErrors in the streaming ACK path.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** I'm a watcher of googleapis/google-cloud-dart, which I'm responsible for, and no human reviewer has looked at this PR, so it is my job as default reviewer. It fixes a real retry bug (ABORTED never retried over REST) in a shared library with tests, making it a valuable review. It's from a first-time contributor rather than a collaborator, and the only prior review is a bot comment with no substance, so it sits in the review-waiting band but below collaborator PRs.
- **Next action:** Review PR #382 from first-time contributor quaaantumdev (fixes issue #381) since no human has reviewed it yet.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** I filed this bug in my own repository, and a contributor is blocked on my answer to their design proposal, posted four days ago. I had asked for a design before a large implementation, so this reply is the gating step. It is not security or a direct blocker for someone else's work, so it sits in the contributor-waiting-on-my-reply band rather than the top.
- **Next action:** Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string on ProtoEnum, unknown integers kept) to approve or change the approach before they write code.

### 6. dart-lang/http#2027 → predicted 23, priority 0.30
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own design issue in a repository I am responsible for, filed 9 days ago with no replies since. It is a planned-work item that has gone quiet, so it is not urgent. It is not a security problem or a blocker, and it has no clear next step that someone is waiting on me to take.
- **Next action:** Wait for design feedback from maintainers or decide on a 2.0 breaking-change plan for Client.close; nothing is blocking on me right now.

### 7. dart-lang/http#1981 → predicted 10, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is an issue I'm assigned to and said I started working on five hours ago, so it is my own committed work and should stay visible. It is a feature request in a repository I'm responsible for rather than a security fix or blocking item, so it sits in the planned-work band. The reporter has not contributed a skeleton PR yet, so there is no PR to review and nothing waiting on anyone else.
- **Next action:** Continue the server trust evaluation hook work for CupertinoClient, since I've said I'm working on it and have assigned it to myself.

### 8. googleapis/google-cloud-dart#360 → predicted 14, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I own, filed by a usual collaborator, and kevmoo's last comment is a question I haven't answered after 17 days, so there is a clear next step for me. kevmoo explicitly says it isn't urgent, and the JSON buffering part is a performance concern rather than a correctness bug. The mid-stream SSE error-swallowing part is a real correctness issue, but it is not security-related, so it does not warrant the top of the scale.
- **Next action:** Reply to kevmoo's question with a view on whether Google servers send incremental JSON arrays, then decide whether to take the SSE error-frame fix (which is clearly a bug) on its own.

### 9. dart-lang/sdk#59846 → predicted 18, priority 0.45
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm the assignee of a real, triaged bug in dart:io that affects interoperability with proxies, so it's my job to fix or hand off. However, it's in the SDK where I'm only a commenter, it's been dormant for about 22 months, and it isn't security-labeled, so it sits in the middle-low range rather than near the top. Nothing new has happened since triage.
- **Next action:** Triage this dart:io header-name validation bug: confirm the RFC 9110 tchar check is missing in the VM HTTP parser and either fix it or unassign yourself.

### 10. googleapis/google-cloud-dart#361 → predicted 19, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** kevmoo is a close collaborator in a repository I own, and I asked a design question 16 days ago that has no reply. The question is still open, so I may need to follow up or make the call myself. It is not urgent, and the ticket is in the 'recent unanswered question' band rather than blocking anyone. Its related PR (#345) is a draft, so nothing else is waiting on this decision right now.
- **Next action:** Follow up with kevmoo on my open question: switch compute_v1 to discovery, or add convenience extensions to the protobuf service operations?

### 11. dart-lang/sdk#31275 → predicted 20, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I'm only informationally CC'd on a 9-year-old SDK bug in a repository I don't own, with no new activity directed at me since 2024. kevmoo's request that I take it up is a soft signal from a close collaborator, and the bug caused a production crash, which keeps it above the baseline backlog. Since nothing is asked of me directly, it sits in the 0.35-0.5 band for old but important CC'd issues.
- **Next action:** Nothing needed now; this is an old unowned dart:io bug where I was only CC'd, so at most consider whether to take ownership of the library.

### 12. dart-lang/native#3752 → predicted 22, priority 0.30
- **Ground truth:** 
- **Model:** This is my own issue, filed 6 days ago, and it has an open PR (#3763) that addresses it, which I authored and updated 2 days ago. Per the duplicate rule, the PR is the thing to act on, so this issue ranks well below it. The issue itself has nothing waiting on anyone else, so the remaining work is just landing the PR and closing the issue.
- **Next action:** Review and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue once it lands.

### 13. googleapis/google-cloud-dart#366 → predicted 15, priority 0.55
- **Ground truth:** 
- **Model:** This is my own repository and a collaborator-authored issue with a clear remaining step that depends on a decision I already began working through. The release blockers for google_cloud_storage 0.6.5 and google_cloud_pubsub make it more than a passive watch item. It is not urgent security or a direct question waiting on me, so it sits in the planned-work band rather than the top of the list.
- **Next action:** Decide whether the pubspec version-constraint fix should be handled generically through librarian automation, then unblock the google_cloud_storage and google_cloud_pubsub release steps.

### 14. dart-lang/tools#2719 → predicted 6, priority 0.68
- **Ground truth:** 
- **Model:** This is a routine automated dependency bump in dart-lang/tools, which is not one of my repositories, but it was requested of the dart-ecosystem-team I belong to. Per the rules, a team review request in a repo I don't own is normally low (0.1-0.25), but the dart-ecosystem-team is shared and no other named reviewer exists, so it is still waiting on someone from my team. Since the PR is a BoringSSL revision bump (crypto library, so security-adjacent), I rate it above a plain team request, though it is not a confirmed security fix.
- **Next action:** Review the automated BoringSSL bump PR dart-lang/tools#2719 (it is blocked on review; check the dart-ecosystem-team review request).

### 15. googleapis/google-cloud-dart#381 → predicted 26, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is covered by open PR #382 from the reporter, so per the duplicate rule the PR is the item to act on and the issue ranks well below it. I watch the repo but am not assigned, and the author is a non-collaborator with no activity since opening three days ago. The bug is real and affects retry behavior, but the issue itself has nothing new for me to do beyond following the PR.
- **Next action:** Review PR #382, which already fixes this issue, and then the issue can be closed when it merges.

### 16. dart-lang/http#2034 → predicted 30, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR and I recently requested a review from goderbauer, who has not responded yet, so there is nothing for me to act on. The linked issue #1932 is covered by this PR, so it should stay low as well. I'll ping goderbauer if there is still no response after about a week, which would raise this to around 0.3.
- **Next action:** Wait for goderbauer to review PR #2034; nothing to do until roughly a week has passed since the 2026-10-23 review request.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is assigned to me, filed by a collaborator (kevmoo) in a repository I'm responsible for, and I already commented with research and narrowed its scope, so it is my planned work. It is not blocking anyone right now and nothing new is waiting on a reply, so it sits in the 0.5-0.65 band for my own planned work. The FormatException bypass of retries on 502/503/504 is a real reliability bug, which keeps it above the midpoint.
- **Next action:** Start implementing the ServiceException FormatException hardening and the RetryRunner/RequestOptions wiring in ServiceClient, since this issue is assigned to me and I already committed to it.

### 18. dart-lang/http#2031 → predicted 21, priority 0.30
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I am a requested reviewer, but this is a tiny version/changelog bump whose base branch is a stack of open PRs, and #2014 still needs my review first. The lower stacked PRs are the real work, so this one is low priority for now. It is not in a repository I am responsible for (I noted I'm not responsible for http2), though a direct review request to me personally still counts.
- **Next action:** Review PR #2031 (http2 3.2.0 release prep), but first review the stacked PRs #2010, #2014 and #2009 it depends on, since this PR is blocked until they land.

### 19. googleapis/google-cloud-dart#345 → predicted 25, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I own, untouched for 45 days, with no reviewer waiting on me and no new human activity. Per the rubric, my own drafts I should finish or abandon sit in the 0.15–0.35 band. It is not blocking anyone, but the mergeable state is dirty and there are unresolved review threads, so it is a reasonable candidate for a finish-or-abandon decision.
- **Next action:** Decide whether to finish or abandon this draft: address the 5 unresolved Gemini review threads (nullable managedZones, Policies_UpdateRequest params) and fix the merge conflicts, or close it.

### 20. dart-lang/core#1007 → predicted 27, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in dart-lang/core, a repository I'm not responsible for, so it sits in the low 0.1–0.25 band. The PR is also blocked by an unsigned CLA, so nothing can happen on it yet. The linked issue #537 is covered by this PR, so it's a duplicate-avoidance case. It is a reasonable fix from a first-time contributor, but it doesn't need my attention now.
- **Next action:** Waiting on the contributor to sign the CLA before the PR can be reviewed by dart-ecosystem-team.

### 21. dart-lang/tools#2544 → predicted 32, priority 0.05
- **Ground truth:** 
- **Model:** This is a security fix, but it is in dart-lang/tools, a repository I am not responsible for. The team review request for dart-ecosystem-team is shared, and lrhn is already reviewing it by name, so the rules put it near 0. The latest open feedback from lrhn is on the author's side. I am not the reviewer here, so I have nothing to act on.
- **Next action:** Nothing for me; the PR is waiting on jonasfj to address lrhn's latest review comments, and lrhn is the named reviewer.

### 22. dart-lang/tools#2710 → predicted 13, priority 0.55
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, which I am not clearly responsible for (my repo notes list only googleapis/google-cloud-dart and dart-lang/http), so it sits in the low team-request band, but the dart-ecosystem-team is one I belong to. The PR is by a close collaborator (mosuem) and has been waiting only 2 days with no human review. It is stacked on draft PR #2563, which lowers its urgency, and the review decision is still REVIEW_REQUIRED.
- **Next action:** Wait for a dart-ecosystem-team member to review PR #2710; it is stacked on draft #2563, so review of #2563 may need to come first.

### 23. dart-lang/native#3763 → predicted 31, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR with a review requested two days ago from liamappelbe, who has not responded yet, so nothing is required from me until roughly a week passes. The PR fixes two open issues I filed, so it matters, but the next step is theirs. The PR is also blocked on review, so there is no action I can take right now.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them again if there is still no response by around 2026-10-30.

### 24. googleapis/google-cloud-dart#373 → predicted 24, priority 0.25
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR and sigurdm has already approved it, so the only open item is my own question to sigurdm about the non-PubSub changes, asked 4 days ago. Two unresolved review threads remain, but I have not been told they are blocking, and the PR is behind main, which I may need to update. Since I asked a collaborator directly and recently, it sits in the waiting range, but it is still a PR I own, so it stays above near-zero.
- **Next action:** Wait for sigurdm to answer whether the non-PubSub parts are good to merge, or for natebosch to finish his review; I may need to follow up if there is still no reply after about a week.

### 25. dart-lang/http#579 → predicted 16, priority 0.55
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This is a first-time contributor PR in a repo I'm responsible for, with a review requested of me personally, and a new comment from retendo asking a direct question 14 months after my last reply. The PR is blocked on a semver-major decision I previously said I lacked bandwidth for, so the real next step is a decision rather than a code review. It is not security-related and the thread is stale, so it stays in the middle range rather than the top.
- **Next action:** Reply to retendo's question about a workaround and decide whether this breaking change goes into the next major release or the PR should be closed.

### 26. dart-lang/http#1932 → predicted 8, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I am the assignee and the linked PR #2034 is my own fix that closes this issue, so the remaining work is mine to finish. A user asked for an update four days ago and I have not answered. The bug breaks builds for users of cronet_http in a repo I am responsible for, but it is a build issue rather than security, and the fix is already in progress.
- **Next action:** Review and merge the linked fix PR dart-lang/http#2034 (avoid cronet namespace duplication), then reply to igordanilovski with a status update.

### 27. flutter/devtools#8223 → predicted 36, priority 0.02
- **Ground truth:** 
- **Model:** I was only cc'd by bkonyi in 2024 on a feasibility question, with no direct request to act. The repository is flutter/devtools, which is outside my responsibilities and not in my interest list. The most recent activity is srawlins removing the 'cost: high' label, and a GSOC contributor asked a design question that the maintainers have not answered. Nothing is asked of me, so this sits near zero.
- **Next action:** No action needed from me; this is a flutter/devtools enhancement outside my repositories, where I was only cc'd on a feasibility comment, and it is waiting on the DevTools team.

### 28. dart-lang/http#1837 → predicted 33, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** The issue is a low-priority feature request (P3) in dart-lang/http, a repo I'm not responsible for for http2 but do watch. I already replied that the Dart team is unlikely to take it and suggested a community route via package:win32. There has been no activity for about a year, and nothing is asked of me. It is only loosely related to the open flutter/flutter#26359, which is not something I need to act on.
- **Next action:** Nothing to do; this is a community contributions-welcome enhancement I already declined to take on, with no new activity since October 2025.

### 29. dart-lang/http#2033 → predicted 34, priority 0.03
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already approved this PR two days ago and no new activity has occurred since, with the PR clean and mergeable. The only remaining step is for the author, a close collaborator, to merge it. It is a CI infrastructure change, so it carries little urgency for me.
- **Next action:** Nothing for me; I approved it 2d ago and mosuem (collaborator) needs to merge it.

### 30. dart-lang/http#1365 → predicted 35, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is a 6-year-old performance enhancement issue in the http2 subpackage, which my notes say I am not responsible for. The last human comment is an unanswered question from lubritto about whether to close it, but I'm only a watcher with no mentions or assignments. A related SDK socket issue exists and the reporter's own follow-up suggests the bottleneck is elsewhere, so there is no action for me.
- **Next action:** Nothing for me to do; the open question (is the root cause in http2?) is for the maintainers, and the issue is in http2, which I'm not responsible for.

### 31. dart-lang/tools#2715 → predicted 12, priority 0.55
- **Ground truth:** 
- **Model:** This is a PR from a close collaborator in dart-lang/tools, which is a repository I'm not listed as responsible for, and the review request reaches me only through a team I belong to. Team review requests in repositories I don't own rate low, but the PR is a follow-up to a review of mine that touched my own feedback areas and is a collaborator's work with no reviewer yet. The PR is blocked on mergeable state and has no human reviewer, so it's worth a look but not urgent.
- **Next action:** Review PR #2715 (string_scanner bounds validation and eager lastSpan test) from kevmoo, a close collaborator, since it is requested via the dart-ecosystem-team I belong to.

### 32. dart-lang/http#2026 → predicted 11, priority 0.55
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is a fix for a real crash in dart-lang/http2 that is linked to open issue #2021, and it's a first-time contributor who has now signed the CLA and asked a specific reviewer for a look. However, I'm only a watcher of http2 and nobody has requested me personally, and the author explicitly pinged mosuem, so my action is mainly to review or coordinate. Review is needed in a repo I don't own, so it sits in the middle range rather than high.
- **Next action:** Review PR #2026 (or ask mosuem to look at the stream_handler overlap with #2013, since shoaib pinged them directly), since it is a first-time contributor's fix for a real assertion crash that is blocked on review.

### 33. dart-lang/native#3653 → predicted 28, priority 0.12
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is driving it, and the last comment (Sept 22) is his own open-ended analysis rather than a question to me. My only mention is a thanks for a tip, which asks nothing of me. It is a broader ObjC performance/memory topic in dart-lang/native that is not my area of responsibility, so it stays low, though it is still open and I have some history on it.
- **Next action:** No action needed from me; liamappelbe is deciding whether the deeper trampoline/VM change is worth doing, and the related fix (#3652) is closed.

### 34. dart-lang/http#1972 → predicted 29, priority 0.12
- **Ground truth:** 
- **Model:** I asked the reporter for information (client type and server scenario) and labeled it needs-info 8 days ago, with no reply since, so nothing is currently on me for this issue. The reporter is a stranger with no repository association. A linked PR #1974 from a contributor was opened just now, and that PR is the item that needs my review, so it should be ranked above this issue. The issue stays visible at low priority because I'm the assignee and may need to close it once the fix is verified.
- **Next action:** Wait for Keetz to answer my questions about the client used and the server behavior; PR #1974 is open and should be reviewed separately.

### 35. dart-lang/http#1841 → predicted 17, priority 0.45
- **Ground truth:** 
- **Model:** I'm mentioned directly and a contributor asked for a design answer, so I'm being asked to respond, but this is a non-security enhancement in a repo where I'm only a commenter and I'm not responsible for http2. A linked open PR now covers the issue, which pushes the issue itself below the PR. The thumbs-down on 2026-10-05 is older than the new 2026-09-30 comment mentioning me, so I'm judging it on its merits again. The PR is more actionable than the issue, and the design question is still open.
- **Next action:** Review PR #2002 (agam1092005's retryDelay callback) since it implements the non-breaking approach I was asked about, and reply to agam1092005 on the design.

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.65
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** This is an issue assigned to me, not a security item, and it has new human activity: filiph reproduced it on a current SDK and asked how to help, which is a direct request I should answer. It is an intermittent data-path bug in core I/O that is marked P2, so it is important but not blocking anyone. The copybara commit 4 days ago may be related, so I should check whether it fixed this before going further, which keeps it in the 0.65 band rather than higher.
- **Next action:** Reply to filiph's 24-day-old offer to help, pointing to the reproduction steps and suggesting where to look (the recursive delete loop in the VM's io implementation), since I'm the assignee and this is untriaged-in-practice work.
