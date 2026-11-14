# Gitilizer eval: v5-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033026

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.686 ± 0.031 |
| spearman | 0.809 ± 0.027 |
| pairwise_acc | 0.843 ± 0.016 |
| ndcg | 0.978 ± 0.005 |
| ndcg@5 | 0.980 ± 0.017 |
| top3_overlap | 0.778 ± 0.192 |
| top5_overlap | 0.867 ± 0.115 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 4.037 ± 0.370 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.856 ± 0.010 | 0.998 ± 0.000 | 1.000 ± 0.000 | 0.958 ± 0.072 |
| B | 20 | 0.551 ± 0.060 | 0.944 ± 0.017 | 0.733 ± 0.115 | 3.267 ± 0.379 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 3/3 | dart-lang/sdk#48056 | A | Check whether the eMudhra distrust change in #64644 covers Android and answer acn-masatadakurihara's questions, then close or retarget this issue. |
| 2 | 2.7 (2–3) | +0.7 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's inline question about CHANGELOG.md being deleted by the next `librarian generate`, then either add it to `lib.Keep` in Bump or make Dart clean preserve it, and push the fix. |
| 3 | 3.7 (3–4) | +0.7 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub release-polish PR (header, CHANGELOG, pubspec, .pubignore) and address the license header warnings. |
| 4 | 5.0 (5) | +1.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the PR: confirm the google.rpc.Code mapping in fromHttpResponse and that the behavior change to status.code for JSON errors is acceptable. |
| 5 | 5.3 (4–6) | +0.3 | 0.70 | 3/3 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's proposed ProtoEnum design (nullable number and string) and reply with approval or changes so they can start a preliminary PR. |
| 6 | 9.0 (8–10) | +3.0 | 0.55 | 3/3 | dart-lang/http#2027 | B | Decide on the Client.close design (track outstanding requests vs. async close in a 2.0 release) and write up a concrete proposal or start a prototype PR. |
| 7 | 8.0 (7–9) | +1.0 | 0.56 | 3/3 | dart-lang/http#1981 | B | Continue the prototype for a server trust evaluation hook in CupertinoClient and open a skeleton PR for discussion. |
| 8 | 11.0 (11) | +3.0 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo, then fix the mid-stream SSE error handling (throw ServiceException on error frames) and decide whether incremental JSON array decoding is worth doing. |
| 9 | 3.3 (2–6) | -5.7 | 0.80 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header-name validation (reject non-tchar characters per RFC 9110) or unassign myself, and consider whether the NUL/whitespace acceptance is a request-smuggling risk. |
| 10 | 12.0 (12) | +2.0 | 0.40 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to reply to my 16-day-old question on whether to switch Compute to discovery or add convenience extensions to the proto-based service operations. |
| 11 | 13.0 (13) | +2.0 | 0.40 | 3/3 | dart-lang/sdk#31275 | A | Decide whether to take over the abandoned dart:io fix (CL 144346) for the unsolicited-response crash, or leave it for outside contributors. |
| 12 | 15.7 (14–18) | +3.7 | 0.23 | 0/3 | dart-lang/native#3752 | B | Nothing to do on the issue itself; work happens in PR dart-lang/native#3763, which is open and covers it. |
| 13 | 16.3 (14–18) | +3.3 | 0.23 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait until the google_cloud_rpc version is bumped and the fix approach (e.g. librarian automation) is decided; nothing to do on this issue yet. |
| 14 | 19.0 (19) | +5.0 | 0.11 | 0/3 | dart-lang/tools#2719 | B | Nothing required from me; a teammate on dart-ecosystem-team can review this routine BoringSSL bump. |
| 15 | 16.0 (16) | +1.0 | 0.20 | 0/3 | googleapis/google-cloud-dart#381 | A | Nothing to do on the issue itself; review PR #382, which fixes it. |
| 16 | 20.0 (20) | +4.0 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping again if no response after about a week. |
| 17 | 9.0 (8–10) | -8.0 | 0.56 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the ServiceException.fromHttpResponse FormatException fix and add RetryRunner/RequestOptions to ServiceClient, since I'm assigned and the scope is now settled. |
| 18 | 26.7 (26–27) | +8.7 | 0.07 | 0/3 | dart-lang/http#2031 | A | Wait until the lower stacked PRs (#2014 still unreviewed) are reviewed and merged; this release-prep PR can follow. |
| 19 | 16.0 (15–18) | -3.0 | 0.21 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft DNS PR (resolve the bot's 5 review threads, fix merge conflicts) or close it. |
| 20 | 22.0 (22) | +2.0 | 0.10 | 0/3 | dart-lang/core#1007 | B | Nothing to do now; the author needs to sign the CLA, and the review request went to the shared dart-ecosystem-team, not to me personally. |
| 21 | 30.3 (24–34) | +9.3 ⚠️ | 0.05 | 0/3 | dart-lang/tools#2544 | B | Nothing to do: the review request went only to dart-ecosystem-team, in a repo I'm not responsible for, and lrhn is already reviewing. Wait for jonasfj to address lrhn's feedback. |
| 22 | 25.0 (24–26) | +3.0 | 0.08 | 0/3 | dart-lang/tools#2710 | B | Wait for the base PR dart-lang/tools#2563 to be reviewed; this stacked PR only has a team review request, not one naming me. |
| 23 | 21.0 (21) | -2.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping again if no response after about a week (around 2026-10-30). |
| 24 | 23.0 (23) | -1.0 | 0.10 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether he reviewed the non-PubSub parts, or for natebosch to review; ping again after about a week of silence. |
| 25 | 26.0 (25–27) | +1.0 | 0.08 | 0/3 | dart-lang/http#579 | B | Nothing to do now; this is blocked until a breaking-release plan exists, so leave it until a package:http major release is planned. |
| 26 | 16.0 (14–17) | -10.0 ⚠️ | 0.22 | 0/3 | dart-lang/http#1932 | B | Nothing on the issue itself; get PR #2034 reviewed and merged, which closes this issue. |
| 27 | 31.0 (28–33) | +4.0 | 0.04 | 0/3 | flutter/devtools#8223 | B | Nothing to do; I was only CC'd on a flutter/devtools feature request that the DevTools team owns. |
| 28 | 29.7 (29–30) | +1.7 | 0.04 | 0/3 | dart-lang/http#1837 | A | Nothing to do; I already replied that this is a contributions-welcome item, so wait for a community contributor. |
| 29 | 34.3 (34–35) | +5.3 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing to do; I already approved and the author (mosuem) can merge. |
| 30 | 35.3 (35–36) | +5.3 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do; this is in the http2 area, which I'm not responsible for, and nothing is asked of me. |
| 31 | 31.7 (31–32) | +0.7 | 0.03 | 0/3 | dart-lang/tools#2715 | B | Nothing to do; davidmorgan is the named reviewer and the team request is shared. Wait for them to review. |
| 32 | 30.7 (30–31) | -1.3 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing for me to do; this is http2 code I'm not responsible for, and the contributor asked mosuem to review. |
| 33 | 28.3 (28–29) | -4.7 | 0.04 | 0/3 | dart-lang/native#3653 | A | Nothing to do; liamappelbe owns this and is leaning toward wrapping objc_msgSend calls in autorelease pools instead. |
| 34 | 26.0 (24–29) | -8.0 | 0.07 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions; meanwhile PR #1974 exists, so review that rather than the issue. |
| 35 | 35.0 (33–36) | +0.0 | 0.01 | 0/3 | dart-lang/http#1841 | B | Nothing to do on the issue; the open PR #2002 covers it, so review the PR there instead. |
| 36 | 8.0 (7–10) | -28.0 ⚠️ | 0.58 | 3/3 | dart-lang/sdk#38148 | B | Check commit 2752d56 that referenced this issue 4d ago to see if it fixes it, then reply to filiph with next steps or ask for a repro. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue (TLS/CA trust) that I created and am assigned to. It has fresh activity: a report 3d ago about the compromised eMudhra intermediate CAs and a related fix, #64644, which closed 2d ago. Confirming whether Android is covered and answering the open questions is my job, and age, P3 and the lack of a direct @-mention don't lower it.
- **Next action:** Check whether the eMudhra distrust change in #64644 covers Android and answer acn-masatadakurihara's questions, then close or retarget this issue.

### 2. googleapis/librarian#7808 → predicted 3, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unanswered review question 21h ago, with one unresolved thread. That puts it in the 'blocking someone' range. It also fixes a real release bug, since new Dart packages are skipped by `librarian tag`. It is not a security issue, so it stays below 0.9.
- **Next action:** Reply to kevmoo's inline question about CHANGELOG.md being deleted by the next `librarian generate`, then either add it to `lib.Keep` in Bump or make Dart clean preserve it, and push the fix.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in googleapis/google-cloud-dart, a repo I'm responsible for. It comes from a close collaborator, sigurdm, and no human has reviewed it yet (the Gemini bot doesn't count), so I'm the default reviewer. It was opened 5 days ago and is small and pre-release, so it's worth reviewing soon. It isn't a security item and nothing is blocking me, which puts it in the review range rather than higher.
- **Next action:** Review sigurdm's pubsub release-polish PR (header, CHANGELOG, pubspec, .pubignore) and address the license header warnings.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I'm responsible for, so I'm the default reviewer; the only review so far is from a bot, which doesn't count. The author is a first-time contributor rather than a close collaborator, so it sits in the middle of the review range. It's fresh (3d ago) and changes the retry behavior of REST errors, which makes it worth a careful look. It is not a security issue, and the linked issue #381 is covered by this PR.
- **Next action:** Review the PR: confirm the google.rpc.Code mapping in fromHttpResponse and that the behavior change to status.code for JSON errors is acceptable.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug in a repo I'm responsible for. A contributor posted a concrete design sketch 4 days ago, after my last comment 10 days ago, and is waiting on my feedback before writing code. No PR covers it yet, so the next step is mine. It isn't a security issue and it's a p2 bug, so it ranks as a contributor waiting on my reply rather than anything more urgent.
- **Next action:** Review Yusufihsangorgel's proposed ProtoEnum design (nullable number and string) and reply with approval or changes so they can start a preliminary PR.

### 6. dart-lang/http#2027 → predicted 8, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue, filed 9d ago in dart-lang/http (which I'm responsible for, outside the http2 area). It is design work I own and nothing is waiting on anyone else, so it counts as fresh planned work. There is no new activity and no other reply yet, and it has no PR, so it sits mid-range rather than higher.
- **Next action:** Decide on the Client.close design (track outstanding requests vs. async close in a 2.0 release) and write up a concrete proposal or start a prototype PR.

### 7. dart-lang/http#1981 → predicted 7, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I'm assigned and said 5h ago that I've started working on this, so it's a fresh commitment I haven't finished. Nobody else has acted since, so the next step is mine. It's a feature request in cupertino_http (not http2) and not a vulnerability, so it's planned work, not an urgent security item, and the reporter is a stranger.
- **Next action:** Continue the prototype for a server trust evaluation hook in CupertinoClient and open a skeleton PR for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** kevmoo is a close collaborator and filed this in a repo I'm responsible for. He answered my question 17d ago, so the next step is mine. Bug 2, where mid-stream error frames are silently decoded as empty messages, is a real correctness hole with a clear fix, and no PR covers it. He said it isn't urgent and nothing has happened in over two weeks, so it sits in the lower half of the planned-work range.
- **Next action:** Reply to kevmoo, then fix the mid-stream SSE error handling (throw ServiceException on error frames) and decide whether incremental JSON array decoding is worth doing.

### 9. dart-lang/sdk#59846 → predicted 2, priority 0.90
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm assigned this issue, and it describes dart:io accepting NUL and whitespace in header names, which can cause problems with upstream proxies (a request-smuggling-style security concern). Security issues I own aren't pulled down by age or lack of mentions, but there has been no new activity in 22 months, so it doesn't reach the very top. No open PR covers it, and the next step is mine.
- **Next action:** Decide whether to fix the dart:io header-name validation (reject non-tchar characters per RFC 9110) or unassign myself, and consider whether the NUL/whitespace acceptance is a request-smuggling risk.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked kevmoo, a close collaborator, a design question in a repo I'm responsible for, and he hasn't answered in 16 days. That puts it among recent questions I'm waiting on (0.35-0.5), and since the question has sat unanswered a while, a follow-up may be needed soon. It isn't security-related, and the discovery switch would be a large, uncertain change, so I'm placing it near the lower-middle of that range.
- **Next action:** Wait for kevmoo to reply to my 16-day-old question on whether to switch Compute to discovery or add convenience extensions to the proto-based service operations.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old but important bug: an uncatchable exception in dart:io HttpClient crashes servers in production. I was CC'd twice, once by collaborator kevmoo, and I'm named as the library owner. It isn't a security issue and nothing has happened in 20 months apart from relabeling. There's also a known patch that could be revived. So it sits in the old-but-important CC range, toward the lower end because it's dormant and dart:io lives in the SDK repo, not one I'm responsible for.
- **Next action:** Decide whether to take over the abandoned dart:io fix (CL 144346) for the unsolicited-response crash, or leave it for outside contributors.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** An open PR (#3763, mine, updated 2d ago) closes this issue, so the PR is the thing to act on and the issue is a duplicate of that work. There is no new activity on the issue since I filed and assigned it myself. It is a real bug affecting cupertino_http, but importance doesn't lift it above its PR, so it stays in the low 'covered by a PR' range.
- **Next action:** Nothing to do on the issue itself; work happens in PR dart-lang/native#3763, which is open and covers it.

### 13. googleapis/google-cloud-dart#366 → predicted 14, priority 0.30
- **Ground truth:** 
- **Model:** The issue is in a repo I own and was filed by a close collaborator (sigurdm), but the checklist is blocked until the generated google_cloud_rpc version is bumped. My last comment 17d ago said I'm still deciding on a general approach, and there has been no activity since. It's not a security issue and nothing new is directed at me, so it sits in the lower-middle range as a visible but non-urgent item.
- **Next action:** Wait until the google_cloud_rpc version is bumped and the fix approach (e.g. librarian automation) is decided; nothing to do on this issue yet.

### 14. dart-lang/tools#2719 → predicted 19, priority 0.10
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision bump from a bot in dart-lang/tools, which I'm not responsible for. The review was requested from the dart-ecosystem-team, not from me personally, so it is a low-priority team request. It is a routine update with no sign of a security fix, and no one has asked me anything.
- **Next action:** Nothing required from me; a teammate on dart-ecosystem-team can review this routine BoringSSL bump.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a real bug in google_cloud_rpc, a repo I'm responsible for. Over REST, ABORTED errors are never retried. It isn't a security issue. Open PR #382 already covers it and hasn't been reviewed, so the PR is the item to act on and the issue ranks well below it. The reporter is a non-collaborator and there's been no activity in 3 days.
- **Next action:** Nothing to do on the issue itself; review PR #382, which fixes it.

### 16. dart-lang/http#2034 → predicted 20, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http (cronet_http, not http2), and I requested a review from goderbauer 2 days ago with no response yet. Nothing is waiting on me until roughly a week passes. The linked issue #1932 is covered by this PR, so the PR is the item to track, and it stays low until the reviewer responds or a week of silence makes a ping worthwhile.
- **Next action:** Wait for goderbauer to review; ping again if no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned this issue from collaborator kevmoo in a repo I own, and I already trimmed its scope 10d ago, so the next step is mine and nothing is blocking it. No open PR covers it (#352 and #353 are merged), and nobody else has replied since my last comment. It's planned work with a clear next step but no fresh external activity, so it sits in the middle of the 0.5–0.65 range. It is not a security issue, though the HTML 502/503/504 bug bypassing retries is a real reliability concern.
- **Next action:** Implement the ServiceException.fromHttpResponse FormatException fix and add RetryRunner/RequestOptions to ServiceClient, since I'm assigned and the scope is now settled.

### 18. dart-lang/http#2031 → predicted 26, priority 0.07
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is in http2, which I'm not responsible for, and it's stacked on other PRs. #2014 hasn't been reviewed yet, so the lower PRs need attention first. Although I'm personally requested as a reviewer, the stacked-PR block applies, and it's a tiny release-prep change with nothing to do until the base lands.
- **Next action:** Wait until the lower stacked PRs (#2014 still unreviewed) are reviewed and merged; this release-prep PR can follow.

### 19. googleapis/google-cloud-dart#345 → predicted 15, priority 0.22
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repo I'm responsible for, so finishing or abandoning it is on me. It has been dormant for 45 days with merge conflicts and unresolved bot-only feedback, and nobody is waiting on me. That puts it at the low end of the 0.15-0.35 range for drafts I should finish or abandon.
- **Next action:** Decide whether to finish this draft DNS PR (resolve the bot's 5 review threads, fix merge conflicts) or close it.

### 20. dart-lang/core#1007 → predicted 22, priority 0.10
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core is not a repository I'm responsible for (only dart-lang/http is listed), and the only review request is to a team I belong to, so it is low priority. The author is a first-time contributor whose CLA check failed, so the PR is effectively blocked. The linked issue is from sigurdm, which raises it slightly, but nothing has happened in 3 days and nothing is directed at me.
- **Next action:** Nothing to do now; the author needs to sign the CLA, and the review request went to the shared dart-ecosystem-team, not to me personally.

### 21. dart-lang/tools#2544 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** This is a security-related PR (UNC path injection), but it is not mine. It sits in dart-lang/tools, which isn't a repository I'm responsible for. The review was requested only from a team I belong to, and lrhn is already actively reviewing it, so the security-PR urgency doesn't apply to me. There has been no activity for about two months, and nothing is asked of me personally.
- **Next action:** Nothing to do: the review request went only to dart-ecosystem-team, in a repo I'm not responsible for, and lrhn is already reviewing. Wait for jonasfj to address lrhn's feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft with no human review, so the lower PR needs review first. The review request went only to dart-ecosystem-team, not to me personally. Mosuem is a close collaborator and the PR is fresh, which keeps it at the upper end of the low range.
- **Next action:** Wait for the base PR dart-lang/tools#2563 to be reviewed; this stacked PR only has a team review request, not one naming me.

### 23. dart-lang/native#3763 → predicted 21, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, and I requested review from liamappelbe 2d ago with no response yet. There is no unanswered feedback, so nothing is actionable until about a week has passed. The linked issues #3750 and #3752 are covered by this PR, so they rank below it.
- **Next action:** Wait for liamappelbe to review; ping again if no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 23, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR. sigurdm approved it 6d ago, and I asked him 4d ago whether he reviewed the non-PubSub parts, so I'm waiting on that answer. natebosch is also a requested reviewer and hasn't responded. The PR is behind main, but there is nothing pressing for me to do until someone replies, and it's under a week since my last ping, so it belongs in the low waiting-on-reviewer range.
- **Next action:** Wait for sigurdm to answer whether he reviewed the non-PubSub parts, or for natebosch to review; ping again after about a week of silence.

### 25. dart-lang/http#579 → predicted 27, priority 0.07
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR is labeled next-breaking-release and I said in 2024 that it has to land with a semver major release I don't have bandwidth for. The latest comment (14 months ago) is only a user asking for a workaround, which doesn't unblock anything. It is also 5 years old with no recent activity, so it sits at the bottom of the blocked range.
- **Next action:** Nothing to do now; this is blocked until a breaking-release plan exists, so leave it until a package:http major release is planned.

### 26. dart-lang/http#1932 → predicted 17, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** An open PR (#2034, mine, updated 2d ago) already covers this issue, so the PR is the thing to act on and the status-update request on the issue doesn't change that. The issue is a build break affecting users, which keeps it at the top of the duplicate range. It is still well below its PR, because there is nothing left to do on the issue itself.
- **Next action:** Nothing on the issue itself; get PR #2034 reviewed and merged, which closes this issue.

### 27. flutter/devtools#8223 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, which is not a repository I'm responsible for. My only involvement is an informational CC from bkonyi two years ago, and no one has asked me anything since. The recent activity is just a label change by srawlins, and the GSoC question was addressed to bkonyi. It is not a security issue, so it sits near the bottom.
- **Next action:** Nothing to do; I was only CC'd on a flutter/devtools feature request that the DevTools team owns.

### 28. dart-lang/http#1837 → predicted 30, priority 0.04
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old feature request labeled contributions-welcome and P3. I already replied that the Dart team is unlikely to take it on, and nothing has happened since. It isn't a security issue, and there is no new activity directed at me, so it sits at the bottom of the low-priority backlog.
- **Next action:** Nothing to do; I already replied that this is a contributions-welcome item, so wait for a community contributor.

### 29. dart-lang/http#2033 → predicted 34, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2d ago and nothing has happened since: no new commits, no author replies, and no unresolved threads. CI is clean and the PR is mergeable, so the remaining step is the author's. This is done as far as I am concerned.
- **Next action:** Nothing to do; I already approved and the author (mosuem) can merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is labeled package:http2, which my note says I'm not responsible for. I'm only watching the repo, have never been mentioned, and the last comment (8 months ago) was a general question to nobody in particular. The thread is old, so it sits near the bottom of the scale.
- **Next action:** Nothing to do; this is in the http2 area, which I'm not responsible for, and nothing is asked of me.

### 31. dart-lang/tools#2715 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** dart-lang/tools is not a repository I'm responsible for, and my only role is a shared review request via dart-ecosystem-team. A specific person, davidmorgan, is also named as reviewer, which pushes this near zero even though the author is kevmoo, a collaborator. The change is a small follow-up bug fix, not a security matter.
- **Next action:** Nothing to do; davidmorgan is the named reviewer and the team request is shared. Wait for them to review.

### 32. dart-lang/http#2026 → predicted 31, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR touches pkgs/http2, and my note says I'm not responsible for http2. The contributor's review request on the PR was addressed to mosuem, not me, and nobody has asked me to act. It's a first-time contributor PR with no security angle, so it stays near the bottom.
- **Next action:** Nothing for me to do; this is http2 code I'm not responsible for, and the contributor asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 29, priority 0.04
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is driving it, and the next step is theirs. dart-lang/native is not a repository I'm responsible for. My last comment was 37d ago, and nothing since is directed at me; the latest discussion (34d ago) is between liamappelbe and mraleph. The related issue #3652 is closed, so this is quiet and near the bottom.
- **Next action:** Nothing to do; liamappelbe owns this and is leaning toward wrapping objc_msgSend calls in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 25, priority 0.08
- **Ground truth:** 
- **Model:** I asked the reporter for info and added needs-info 8d ago, and there's been no reply, so the issue is blocked on them. An open PR (#1974) also covers it, so the PR is the thing to act on and this issue should rank well below it. It's in a repo I'm responsible for (http, not http2), but nothing is waiting on me here.
- **Next action:** Wait for Keetz to answer my questions; meanwhile PR #1974 exists, so review that rather than the issue.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** I thumbs-downed this on 2026-10-05, and nothing directed at me has happened since. The only later activity is PR #2002 from agam1092005, which covers the issue and is the item to act on. The issue is also labeled next-breaking-release, so it is blocked on a plan.
- **Next action:** Nothing to do on the issue; the open PR #2002 covers it, so review the PR there instead.

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I thumbed this down in August, but filiph has since reported a local repro on current stable and offered to help. A commit also referenced the issue 4 days ago, so a fix may have landed. I'm the assignee, so I should either work on it, hand off a repro request, or close it. dart-lang/sdk isn't a repo I'm responsible for and it's an old P2 bug, so it stays in the planned-work range rather than higher.
- **Next action:** Check commit 2752d56 that referenced this issue 4d ago to see if it fixes it, then reply to filiph with next steps or ask for a repro.
