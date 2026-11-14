# Gitilizer eval: v5g-claude-haiku-r2-r2-r2-r2

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5g.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031431

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.594 ± 0.028 |
| spearman | 0.742 ± 0.020 |
| pairwise_acc | 0.797 ± 0.014 |
| ndcg | 0.978 ± 0.003 |
| ndcg@5 | 0.999 ± 0.001 |
| top3_overlap | 0.778 ± 0.192 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 5.167 ± 0.338 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.744 ± 0.025 | 0.994 ± 0.001 | 0.867 ± 0.115 | 1.500 ± 0.125 |
| B | 20 | 0.456 ± 0.044 | 0.934 ± 0.020 | 0.600 ± 0.000 | 3.800 ± 0.300 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 3/3 | dart-lang/sdk#48056 | A | Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist (see dart-lang/sdk#64644, now closed as completed) and reply to the security question, then close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo's unresolved question on bump.go about CHANGELOG.md being deleted by the next generate, then push the fix (append CHANGELOG.md to lib.Keep in Bump or auto-preserve it in LanguageDart clean) and add a test. |
| 3 | 4.0 (3–5) | +1.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (sigurdm's pubsub release polish, a collaborator PR in my repo), since no reviewer has picked it up yet and I'm the default reviewer here. |
| 4 | 4.7 (4–5) | +0.7 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 from first-time contributor quaaantumdev, since it's in a repository I'm responsible for and no human has reviewed it yet. |
| 5 | 3.3 (3–4) | -1.7 | 0.72 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 4-day-old design proposal (nullable number and string on ProtoEnum, with toJson and toQueryValue), approving the approach or raising concerns so they can start the preliminary PR. |
| 6 | 9.3 (9–10) | +3.3 | 0.55 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue the Client.close design (async close vs. tracking outstanding requests) as part of a planned 2.0 breaking release, and sketch the proposed approach. |
| 7 | 7.7 (7–9) | +0.7 | 0.60 | 3/3 | dart-lang/http#1981 | B | Proceed with the implementation I announced 5h ago, since I'm the one driving it; no one else is blocking, so next step is to start the cupertino_http trust-hook work. |
| 8 | 11.3 (11–12) | +3.3 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Answer kevmoo's question by checking whether Google APIs actually send incremental JSON arrays for application/json streaming, then decide whether to pursue the fix. |
| 9 | 11.0 (10–12) | +2.0 | 0.55 | 3/3 | dart-lang/sdk#59846 | B | Triage this bug: check the dart:io HTTP header name validation against RFC 9110 tchar rules and decide whether to fix it, since I'm the assignee. |
| 10 | 8.0 (6–12) | -2.0 | 0.58 | 2/3 | googleapis/google-cloud-dart#361 | A | Reply to kevmoo's question on whether to switch compute_v1 to discovery or add convenience extensions to the protobuf version, since he is waiting on my decision. |
| 11 | 23.0 (19–25) | +12.0 ⚠️ | 0.18 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed from me now; this is an old, unassigned dart:io bug where the owner question is open and no one is waiting on my reply. |
| 12 | 16.3 (16–17) | +4.3 | 0.28 | 3/3 | dart-lang/native#3752 | B | Finish and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue. |
| 13 | 18.3 (17–19) | +5.3 | 0.23 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump and librarian automation decision; nothing for me to do until then. |
| 14 | 14.3 (13–17) | +0.3 | 0.27 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools (team review request via dart-ecosystem-team), checking CI and that the revision change is clean. |
| 15 | 15.0 (14–16) | +0.0 | 0.28 | 3/3 | googleapis/google-cloud-dart#381 | A | Review linked PR #382 from quaaantumdev, which fixes this issue by using the google.rpc.Code from JSON errors in Status.code. |
| 16 | 27.0 (27) | +11.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; ping them again if there is still no response after about a week (around 2026-10-30). |
| 17 | 7.7 (7–8) | -9.3 ⚠️ | 0.61 | 3/3 | googleapis/google-cloud-dart#359 | B | Start implementing the ServiceException JSON-decode hardening and ServiceClient RetryRunner/RequestOptions wiring, since this issue is assigned to me and the scope is now narrowed to items I can do. |
| 18 | 13.7 (13–14) | -4.3 | 0.30 | 3/3 | dart-lang/http#2031 | A | Review the release-prep PR #2031 (or wait until its stacked PRs #2010, #2014, #2009 land), since it is explicitly requested from me and nothing has been reviewed yet. |
| 19 | 22.0 (21–23) | +3.0 | 0.20 | 0/3 | googleapis/google-cloud-dart#345 | A | Nothing needed now; this is my own draft with unresolved bot feedback, so finish it or abandon it when I have time. |
| 20 | 19.0 (18–21) | -1.0 | 0.20 | 0/3 | dart-lang/core#1007 | B | Wait for the contributor to sign the CLA and for dart-ecosystem-team to review; nothing for me to do yet. |
| 21 | 27.0 (18–32) | +6.0 | 0.14 | 1/3 | dart-lang/tools#2544 | B | Wait for lrhn to finish reviewing and re-approve; no action is needed from me. |
| 22 | 23.0 (22–24) | +1.0 | 0.13 | 0/3 | dart-lang/tools#2710 | B | Nothing for me now; wait for a review from a dart-ecosystem-team member, and check whether stacked PR #2563 gets reviewed first. |
| 23 | 28.0 (28) | +5.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them if there is still no response after about a week (around 2026-10-30). |
| 24 | 25.3 (23–29) | +1.3 | 0.12 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether the non-Pub/Sub parts look good, or for natebosch's review; the PR is approved by sigurdm and blocked on natebosch's review. |
| 25 | 30.0 (29–31) | +5.0 | 0.09 | 0/3 | dart-lang/http#579 | B | Nothing for me now; the PR is blocked on a future semver-major release that I said I lack bandwidth to coordinate, so it waits until that plan exists. |
| 26 | 16.7 (15–20) | -9.3 ⚠️ | 0.28 | 3/3 | dart-lang/http#1932 | B | Check PR #2034 (my fix, 'avoid cronet namespace duplication') and reply to igordanilovski with its status, since the issue itself has nothing left to do beyond that PR. |
| 27 | 33.7 (33–34) | +6.7 | 0.04 | 0/3 | flutter/devtools#8223 | B | Nothing for me to do; this is a feature request in flutter/devtools that I'm only CC'd on, blocked on dart:io network profiling work owned by others. |
| 28 | 33.3 (33–34) | +5.3 | 0.05 | 0/3 | dart-lang/http#1837 | A | Nothing to do; the issue is contributions-welcome and I already replied that the Dart team is unlikely to take it on. |
| 29 | 36.0 (36) | +7.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing for me; I already approved and the PR is clean and waiting on mosuem to merge. |
| 30 | 35.0 (35) | +5.0 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action needed from me; the issue is in an http2 package I'm not responsible for, and the open question about root cause is for the maintainers to answer. |
| 31 | 29.7 (26–32) | -1.3 | 0.08 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan or the dart-ecosystem-team to review kevmoo's PR #2715; nothing is needed from me. |
| 32 | 27.3 (26–30) | -4.7 | 0.09 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem (or another http2 owner) to review PR #2026; I am not responsible for http2 and no one has asked me to review it. |
| 33 | 23.3 (21–25) | -9.7 ⚠️ | 0.16 | 0/3 | dart-lang/native#3653 | A | Nothing for me to do now; liamappelbe is assigned and the issue is blocked on the decision about whether the autorelease-pool approach is worth pursuing instead. |
| 34 | 30.3 (29–32) | -3.7 | 0.09 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter (Keetz) to answer my questions about the client and server behavior; PR #1974 is also open and should be reviewed separately. |
| 35 | 20.7 (20–22) | -14.3 ⚠️ | 0.20 | 0/3 | dart-lang/http#1841 | B | Wait for agam1092005's PR #2002 to be reviewed; nothing for me to do on this issue itself yet. |
| 36 | 8.0 (6–10) | -28.0 ⚠️ | 0.62 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's 24d-old comment offering a concrete reproduction path, and begin investigating the intermittent Directory.deleteSync recursive failure on macOS since I'm assigned. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 2/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue I authored and am assigned to, with new activity 3 days ago that asks a direct security question about trust and revocation for compromised intermediate CAs. Per the security rules it must score at the top of the scale even though a related fix (#64644, closed 2d ago) appears to have landed. Confirming the state and replying is my job, and the issue cannot be left in an unknown state.
- **Next action:** Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist (see dart-lang/sdk#64644, now closed as completed) and reply to the security question, then close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR, and kevmoo's inline review raised a concrete bug: the next librarian generate would delete the CHANGELOG.md that bump creates for newly onboarded libraries. The thread is unresolved and the PR is blocked, so I'm holding up the fix that resolves google-cloud-dart#358. Kevmoo is a usual collaborator and the feedback arrived 21 hours ago, so it's fresh and directed at me. The team review request on cloud-sdk-librarian-team is shared and not what's blocking this.
- **Next action:** Answer kevmoo's unresolved question on bump.go about CHANGELOG.md being deleted by the next generate, then push the fix (append CHANGELOG.md to lib.Keep in Bump or auto-preserve it in LanguageDart clean) and add a test.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a collaborator's PR in google-cloud-dart, a repo I'm responsible for, with review still required and no human reviewer assigned. Under the rules I'm the default reviewer, so it sits in the 0.65–0.8 review-waiting range, with collaborator PRs ranked first. It's five days old and not blocking anyone, and it's a bit behind the stacked streaming-pull work, so I place it near the lower end of the range rather than the top.
- **Next action:** Review PR #376 (sigurdm's pubsub release polish, a collaborator PR in my repo), since no reviewer has picked it up yet and I'm the default reviewer here.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a non-security PR in google-cloud-dart, a repository I'm responsible for, and no human reviewer has looked at it, so I'm the default reviewer and it's on me. It is fresh (3 days old) and fixes a real bug where ABORTED errors over REST are never retried, tied to linked issue #381. It is not from a regular collaborator, and it changes behavior for JSON errors, so it warrants careful review rather than a rubber stamp. The only bot feedback so far is a non-substantive Gemini comment.
- **Next action:** Review PR #382 from first-time contributor quaaantumdev, since it's in a repository I'm responsible for and no human has reviewed it yet.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own issue in a repository I maintain, and a contributor is waiting on my reply to a design proposal I asked for before any code is written. Their proposal of nullable number and string members follows the direction I suggested, so my response is the only thing blocking the next step. It's fresh (4 days) and directed at me, which places it in the 0.65–0.8 band. It's below security or blocking-review items, and the work itself is large, so this is a reply rather than urgent coding.
- **Next action:** Reply to Yusufihsangorgel's 4-day-old design proposal (nullable number and string on ProtoEnum, with toJson and toQueryValue), approving the approach or raising concerns so they can start the preliminary PR.

### 6. dart-lang/http#2027 → predicted 9, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue filed 9 days ago in a repository I work in, so it counts as fresh planned work in the 0.5–0.65 range. Nobody else is blocking it and the next step (choosing a design) is mine. It sits at the lower end of that range because it is a design discussion without a concrete deadline and has seen no replies since I opened it.
- **Next action:** Decide whether to pursue the Client.close design (async close vs. tracking outstanding requests) as part of a planned 2.0 breaking release, and sketch the proposed approach.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I self-assigned and said I'd started work 5 hours ago, so this is a commitment I'm actively carrying, matching the own-planned-work range. It's a non-security feature request for a repo I own in a niche area (cupertino_http), with no open PR and no outside party waiting on me. Freshness is high because I touched it today, but nothing new is directed at me, so it stays mid-range rather than near the top.
- **Next action:** Proceed with the implementation I announced 5h ago, since I'm the one driving it; no one else is blocking, so next step is to start the cupertino_http trust-hook work.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.50
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a non-security issue in a repository I'm responsible for, filed by a close collaborator, and kevmoo is waiting on my answer to his last comment, which I haven't replied to yet. The issue has no labels or assignees and kevmoo explicitly says it isn't urgent, so I'd place it in the planned-work range rather than higher. The SSE error-frame half of the issue is a real correctness gap, but it is not a security problem, so it doesn't change the score.
- **Next action:** Answer kevmoo's question by checking whether Google APIs actually send incremental JSON arrays for application/json streaming, then decide whether to pursue the fix.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm the assignee on a triaged, type-bug issue in dart-lang/sdk, a repository I don't list as mine, and nothing has happened in about 22 months, so it sinks in its range. Nobody is waiting on me for a reply, but as assignee I should either fix it or unassign it. The bug is real (invalid header name characters including NUL can cause proxy issues), which keeps it above the low end of the range.
- **Next action:** Triage this bug: check the dart:io HTTP header name validation against RFC 9110 tchar rules and decide whether to fix it, since I'm the assignee.

### 10. googleapis/google-cloud-dart#361 → predicted 6, priority 0.70
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** kevmoo, a close collaborator and member of this repo, is waiting on my answer to a direct design question I asked and then left unanswered by my own reasoning; the issue is in a repo I'm responsible for. It is not a security item and I am not blocked by anyone else, so it sits in the 0.65-0.8 band for a collaborator waiting on my reply. Activity is 16 days old, so freshness pulls it toward the lower end of that band.
- **Next action:** Reply to kevmoo's question on whether to switch compute_v1 to discovery or add convenience extensions to the protobuf version, since he is waiting on my decision.

### 11. dart-lang/sdk#31275 → predicted 25, priority 0.12
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a 9-year-old SDK issue in a repository I don't own, where I'm only CC'd twice, with no activity directed at me since 2024. The fix would need an owner, and the original CL is abandoned, so the next step isn't mine to take today. Kevmoo, a usual collaborator, wants it taken up, which keeps it slightly above pure backlog, but it is still a crash in a library outside my scope, so it stays low.
- **Next action:** Nothing needed from me now; this is an old, unassigned dart:io bug where the owner question is open and no one is waiting on my reply.

### 12. dart-lang/native#3752 → predicted 17, priority 0.25
- **Ground truth:** 
- **Model:** This is my own issue, assigned to me and filed 6 days ago in a repository I own, so it counts as planned work. However, there is an open PR (#3763) by me that already covers it, so the issue itself is covered and should rank well below that PR. The issue is not a security issue, and nothing outside my own work is blocking it.
- **Next action:** Finish and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This is a non-security issue I authored a comment on 17 days ago, and I am the one who last moved it while deciding on an approach. The actual work (bumping the generated google_cloud_rpc version and pinning it in storage and pubsub pubspecs) is blocked on that version bump, so no next step is mine today. It is in a repository I work in and a collaborator filed it, so it stays visible, but it sinks because nothing has happened in over two weeks.
- **Next action:** Wait for the generated google_cloud_rpc version bump and librarian automation decision; nothing for me to do until then.

### 14. dart-lang/tools#2719 → predicted 13, priority 0.30
- **Ground truth:** 
- **Model:** This is a bot-generated routine dependency bump with no human activity, and the only review request is to a team I belong to in a repository I don't personally own, which the rules put in the low range. Nothing is blocking anyone else and it is not security-related, but it is fresh and within my team's shared queue. Mergeable state is blocked, so it may need CI attention before anyone can merge.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools (team review request via dart-ecosystem-team), checking CI and that the revision change is clean.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is covered by open PR #382, so the issue itself has nothing separate to act on and should rank well below the PR. The PR is from an external contributor (not a collaborator) in a repo I'm responsible for, and nobody has reviewed it yet, which makes reviewing it the real next step. The bug is meaningful since ABORTED retries are silently broken over REST, but it isn't security-related, and the item is only 3 days old with no reviews or replies yet. Since this is an issue covered by a PR, I'm scoring it low, with the PR being the thing to act on.
- **Next action:** Review linked PR #382 from quaaantumdev, which fixes this issue by using the google.rpc.Code from JSON errors in Status.code.

### 16. dart-lang/http#2034 → predicted 27, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR and I explicitly requested a review from goderbauer only 2 days ago, so nothing is blocked on me yet. The PR fixes issue #1932, which is a bug, so there is some value in getting it merged, but it is not urgent. Per the guidelines, PRs waiting on a recently asked reviewer sit around 0.1 until a week has passed.
- **Next action:** Wait for goderbauer to review PR #2034; ping them again if there is still no response after about a week (around 2026-10-30).

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue I'm assigned to in a repository I own, filed by a close collaborator (kevmoo) with a clear next step for me, which places it in the 0.5–0.65 planned-work range. I already did the research and commented 10d ago, and the scope was narrowed on 2026-10-15, so there is no one else I'm waiting on. The FormatException bypass of retries is a real bug, which keeps it near the upper part of the range, but it is not fresh enough to rise above ordinary planned work.
- **Next action:** Start implementing the ServiceException JSON-decode hardening and ServiceClient RetryRunner/RequestOptions wiring, since this issue is assigned to me and the scope is now narrowed to items I can do.

### 18. dart-lang/http#2031 → predicted 14, priority 0.30
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I am a requested reviewer, but this is in dart-lang/http where I noted I'm not responsible for http2, so it sits in the lower range. The PR is stacked on three open PRs, and #2014 still has no review, so merging is blocked until those land. It's a 2-line version/changelog bump with the base just force-pushed, so it's low leverage now but still a real ask from a close collaborator.
- **Next action:** Review the release-prep PR #2031 (or wait until its stacked PRs #2010, #2014, #2009 land), since it is explicitly requested from me and nothing has been reviewed yet.

### 19. googleapis/google-cloud-dart#345 → predicted 22, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I am responsible for, so it falls in the 0.15–0.35 range for drafts I should finish or abandon. It has been dormant for 45 days, and I converted it to draft myself, so nothing is waiting on a reviewer. The only feedback is from a bot with five unresolved threads and a dirty merge state, so it sits at the lower-middle of the range.
- **Next action:** Nothing needed now; this is my own draft with unresolved bot feedback, so finish it or abandon it when I have time.

### 20. dart-lang/core#1007 → predicted 18, priority 0.20
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in dart-lang/core, a repository I don't own, so it sits in the low team-review range. The CLA check is failing, which blocks review, and the contributor is a first-time contributor, so the PR is not yet ready for anyone to act on. Nothing is directed at me personally, and the only activity was the original review request 15 days ago.
- **Next action:** Wait for the contributor to sign the CLA and for dart-ecosystem-team to review; nothing for me to do yet.

### 21. dart-lang/tools#2544 → predicted 32, priority 0.05
- **Ground truth:** 
- **Model:** This is a security PR, but it is in dart-lang/tools, which I don't own, and it reached me only through a team review request. Specific reviewer lrhn was also asked directly and is already driving the review with changes still pending on the author's side. The security exception only applies to PRs waiting on my review in my repositories, so this scores like any other team request already covered by a named reviewer. I can't act on it now, so it sits near zero.
- **Next action:** Wait for lrhn to finish reviewing and re-approve; no action is needed from me.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.12
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, a repository I don't own, so it sits in the 0.1–0.25 team-request band, and I'm not personally named. The PR is stacked on draft PR #2563, which has no requested reviewers and hasn't been reviewed by a human, so it is blocked on lower work. Freshness is low since the last human activity was 2 days ago, though the author is a close collaborator.
- **Next action:** Nothing for me now; wait for a review from a dart-ecosystem-team member, and check whether stacked PR #2563 gets reviewed first.

### 23. dart-lang/native#3763 → predicted 28, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, which I opened and sent to liamappelbe for review only 2 days ago, so the next step belongs to the reviewer. Review is still required with no feedback yet, and there is no unanswered feedback on my side. The PR is blocked on review, so it sits in the 0.05–0.15 range for PRs waiting on a recently asked reviewer. It is linked to two of my own issues, which are covered by this PR and so carry no separate action.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them if there is still no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 24, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR. Last human activity was my own comment asking sigurdm to look at the non-Pub/Sub parts, so the ball is in his court, and natebosch (the assignee and requested reviewer) has not yet reviewed it. Sigurdm already approved, and my pinging on day 4 is not yet the one-week threshold for a follow-up ping. Two unresolved review threads and a 'behind' merge state are minor housekeeping, not blockers I need to act on today.
- **Next action:** Wait for sigurdm to answer whether the non-Pub/Sub parts look good, or for natebosch's review; the PR is approved by sigurdm and blocked on natebosch's review.

### 25. dart-lang/http#579 → predicted 30, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This is a breaking change explicitly labeled next-breaking-release, which I already decided should wait for a 2.0 release. The last human activity is a 14-month-old question from retendo, which doesn't unblock the work. The only new-ish pressure is a user asking for a workaround, which is a reply rather than a blocking request, so the item sits in the 0.05–0.15 band for future-release-blocked PRs.
- **Next action:** Nothing for me now; the PR is blocked on a future semver-major release that I said I lack bandwidth to coordinate, so it waits until that plan exists.

### 26. dart-lang/http#1932 → predicted 15, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is assigned to me, but open PR #2034 by me is linked as the fix, so the PR is the real item and the issue sits below it. igordanilovski's 4-day-old 'any updates?' is a status request, not new work, and the underlying work depends on the PR and an upstream Chromium/Play Services dependency. The item is still worth some attention because it's a broken build for users and I'm the assignee, so I put it in the low-middle range.
- **Next action:** Check PR #2034 (my fix, 'avoid cronet namespace duplication') and reply to igordanilovski with its status, since the issue itself has nothing left to do beyond that PR.

### 27. flutter/devtools#8223 → predicted 34, priority 0.04
- **Ground truth:** 
- **Model:** I'm only mentioned as an informational CC by bkonyi in a repository I'm not responsible for, and the request is a feature blocked by high cost and missing dart:io profiling support. The latest activity (srawlins removing the cost:high label) is a label change with no request directed at me. Nothing is asked of me, so it sits at the bottom of the scale.
- **Next action:** Nothing for me to do; this is a feature request in flutter/devtools that I'm only CC'd on, blocked on dart:io network profiling work owned by others.

### 28. dart-lang/http#1837 → predicted 33, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old, low-priority enhancement request labeled P3 and contributions-welcome, and I already responded and declined to take it on. Nothing has happened in about a year, and the only related item is an external Flutter issue that is not directed at me. It sits at the bottom of the backlog range.
- **Next action:** Nothing to do; the issue is contributions-welcome and I already replied that the Dart team is unlikely to take it on.

### 29. dart-lang/http#2033 → predicted 36, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR two days ago and nothing has happened since, with mergeable_state clean and no unresolved threads. The author is a close collaborator, so the remaining step is their merge, not mine. It is infrastructure work in a repository I am responsible for, but it is already done as far as I am concerned.
- **Next action:** Nothing for me; I already approved and the PR is clean and waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is a six-year-old performance enhancement issue in dart-lang/http's http2 subpackage, which my notes say I am not responsible for. I only watch the repo, have no mentions, and the last comment from lubritto (8 months ago) asks whether it should be closed, which is a maintainer triage question rather than something directed at me. The real work is blocked on investigation in the SDK socket issue (dart-lang/sdk#48210), so there's nothing for me to do now.
- **Next action:** No action needed from me; the issue is in an http2 package I'm not responsible for, and the open question about root cause is for the maintainers to answer.

### 31. dart-lang/tools#2715 → predicted 31, priority 0.08
- **Ground truth:** 
- **Model:** This is a PR by a close collaborator whose review was requested only via the dart-ecosystem-team, a team I belong to, in dart-lang/tools, a repository I am not responsible for. The team review request is shared, and davidmorgan is also named personally, so the review is not on me. Kevmoo is the one waiting, and the last activity was a push two days ago with no new request for me.
- **Next action:** Wait for davidmorgan or the dart-ecosystem-team to review kevmoo's PR #2715; nothing is needed from me.

### 32. dart-lang/http#2026 → predicted 26, priority 0.10
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is a fix for a crash in http2, a package I explicitly noted I am not responsible for, and I am only a watcher with no review request naming me. The author pinged mosuem, a collaborator who owns this area, so the next step is theirs, and the CLA blocker is now resolved. The PR is a legitimate fix for issue #2021, so it's worth a glance, but it is not mine to act on now.
- **Next action:** Wait for mosuem (or another http2 owner) to review PR #2026; I am not responsible for http2 and no one has asked me to review it.

### 33. dart-lang/native#3653 → predicted 21, priority 0.20
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The landed PR was found not to work, and the last substantive comment from liamappelbe (34d ago) leans toward wrapping objc_msgSend calls in autorelease pools rather than the complex trampoline change. My last comment was 37d ago and is already answered, so nothing is directed at me with a clear step. The issue is in dart-lang/native where I'm a commenter, and related issue #3652 is closed, so it stays a low-visibility item without a concrete action for me.
- **Next action:** Nothing for me to do now; liamappelbe is assigned and the issue is blocked on the decision about whether the autorelease-pool approach is worth pursuing instead.

### 34. dart-lang/http#1972 → predicted 29, priority 0.10
- **Ground truth:** 
- **Model:** I asked the reporter two questions and labeled the issue needs-info 8 days ago, and they have not replied, so the next step is theirs. A linked PR #1974 by a contributor already covers the fix, which pushes this issue lower. The issue is in package:http, which I work on, and I'm assignee, but there is nothing I can do until the reporter responds.
- **Next action:** Wait for the reporter (Keetz) to answer my questions about the client and server behavior; PR #1974 is also open and should be reviewed separately.

### 35. dart-lang/http#1841 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** This issue is labeled next-breaking-release, which blocks it until a future breaking release, and a PR (#2002) by agam1092005 already covers it, so the issue sits below its PR. I'm mentioned by name and the contributor asked for direction, but the real work is with the PR author and the breaking-release plan. Last activity was 23-25 days ago, and I'm only a commenter in a repo I work on with a note that I'm not responsible for http2, not this area. Since I'm the reviewer of the linked PR in my repo, the PR itself is the item to check, not this one.
- **Next action:** Wait for agam1092005's PR #2002 to be reviewed; nothing for me to do on this issue itself yet.

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm the assignee on this P2 issue and filiph (a long-time Dart team member) reproduced it locally and asked how to help, which is an unanswered request I can act on. However, the issue is old, my last activity was labeling 3.8 years ago, and the most recent event (a commit referencing it 4 days ago) may indicate a fix is in progress, so the work is planned rather than urgent. The thumbs-down was set before filiph's comment, which is new activity, so the item is judged again on its merits.
- **Next action:** Reply to filiph's 24d-old comment offering a concrete reproduction path, and begin investigating the intermittent Directory.deleteSync recursive failure on macOS since I'm assigned.
