# Gitilizer eval: next-step-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261118-144142

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.613 ± 0.024 |
| spearman | 0.755 ± 0.026 |
| pairwise_acc | 0.806 ± 0.012 |
| ndcg | 0.978 ± 0.005 |
| ndcg@5 | 0.999 ± 0.001 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.870 ± 0.379 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.822 ± 0.010 | 0.997 ± 0.000 | 1.000 ± 0.000 | 1.125 ± 0.000 |
| B | 20 | 0.425 ± 0.043 | 0.939 ± 0.019 | 0.400 ± 0.000 | 4.167 ± 0.153 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | [todo] Read the eMudhra compromise report and dart-lang/sdk#64644, then determine whether Android's disabled-cert and blocklist handling leaves Dart trusting the compromised intermediates, reply to acn-masatadakurihara, and close or fix this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | [respond] Answer kevmoo's inline question on bump.go about CHANGELOG.md being deleted by the next generate, and either add it to lib.Keep or have Dart clean preserve it. |
| 3 | 3.3 (3–4) | +0.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | [review] Review sigurdm's PR #376 (pubsub client attribution header and pre-release polish) in google-cloud-dart; no human review yet and it is behind main. |
| 4 | 4.3 (4–5) | +0.3 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | [review] Review PR #382 (fixes #381) in google-cloud-dart: check that Status.code now uses the google.rpc.Code for JSON errors, and the behavior change for existing callers. |
| 5 | 4.3 (3–5) | -0.7 | 0.71 | 3/3 | googleapis/google-cloud-dart#252 | B | [respond] Reply to Yusufihsangorgel's 4d-old design sketch (nullable number and string on ProtoEnum): approve it or request changes, and say whether to proceed with a preliminary PR. |
| 6 | 12.7 (12–13) | +6.7 | 0.42 | 3/3 | dart-lang/http#2027 | B | [backlog] Decide whether to make Client.close async in a 2.0 release or tighten its semantics, and write up a plan or close the issue. |
| 7 | 7.0 (6–8) | +0.0 | 0.55 | 3/3 | dart-lang/http#1981 | B | [todo] Continue the work I started on a server trust evaluation hook for CupertinoClient and post a draft PR or design update on the issue. |
| 8 | 9.7 (9–10) | +1.7 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | [todo] Decide whether to fix both parts: at minimum handle mid-stream SSE error frames by throwing ServiceException, and verify whether servers actually stream incremental JSON before building an incremental array decoder. |
| 9 | 12.3 (11–14) | +3.3 | 0.48 | 3/3 | dart-lang/sdk#59846 | B | [todo] Decide whether to fix dart:io's HTTP header-name validation to the RFC 9110 tchar set (rejecting NUL, \x0b and other invalid bytes), or unassign yourself. |
| 10 | 13.7 (13–14) | +3.7 | 0.40 | 0/3 | googleapis/google-cloud-dart#361 | A | [waiting] Wait for kevmoo to answer my question on discovery vs. adding convenience extensions to the proto-based Compute client; ping him if it stays quiet. |
| 11 | 17.7 (16–20) | +6.7 | 0.27 | 3/3 | dart-lang/sdk#31275 | A | [backlog] Decide whether to pick up the abandoned CL 144346 to fix the uncatchable HttpException in dart:io, or leave it for grooming. |
| 12 | 18.3 (18–19) | +6.3 | 0.22 | 0/3 | dart-lang/native#3752 | B | [elsewhere] Work on PR dart-lang/native#3763 (support scheduleInRunLoop:forMode:), which closes this issue. |
| 13 | 9.7 (8–11) | -3.3 | 0.53 | 3/3 | googleapis/google-cloud-dart#366 | B | [todo] Decide how to handle the rpc version requirement (librarian automation vs. manual), then bump google_cloud_rpc and require it in storage and pubsub pubspecs before release. |
| 14 | 21.7 (21–22) | +7.7 | 0.10 | 0/3 | dart-lang/tools#2719 | B | [not_yours] Nothing to do; this is a bot BoringSSL bump with a team review request in a repo I don't own, so leave it to the rest of dart-ecosystem-team. |
| 15 | 16.3 (15–17) | +1.3 | 0.27 | 0/3 | googleapis/google-cloud-dart#381 | A | [elsewhere] Review the fix PR googleapis/google-cloud-dart#382 instead of acting on this issue. |
| 16 | 22.7 (22–23) | +6.7 | 0.10 | 0/3 | dart-lang/http#2034 | B | [waiting] Wait for goderbauer to review; ping them if there's still no response about a week after the 2026-10-23 review request. |
| 17 | 8.0 (7–9) | -9.0 ⚠️ | 0.54 | 3/3 | googleapis/google-cloud-dart#359 | B | [todo] Design and implement RetryRunner/RequestOptions wiring in ServiceClient and harden ServiceException.fromHttpResponse against non-JSON bodies. |
| 18 | 30.3 (29–31) | +12.3 ⚠️ | 0.03 | 0/3 | dart-lang/http#2031 | A | [not_yours] Nothing to do: http2 is outside my scope, and this release-prep PR is stacked on #2014, which is still unreviewed. |
| 19 | 17.7 (16–19) | -1.3 | 0.26 | 3/3 | googleapis/google-cloud-dart#345 | A | [todo] Decide whether to finish this draft DNS PR (address Gemini's 5 review comments, resolve merge conflicts) or close it. |
| 20 | 7.0 (6–9) | -13.0 ⚠️ | 0.59 | 3/3 | dart-lang/core#1007 | B | [review] Review the isWithin trailing-dot fix in dart-lang/core#1007, after checking whether the contributor has signed the CLA, since it is blocked until then. |
| 21 | 31.0 (28–33) | +10.0 ⚠️ | 0.03 | 0/3 | dart-lang/tools#2544 | B | [not_yours] Nothing to do: this is a team review request in a repo I don't own, and lrhn is already reviewing it. |
| 22 | 24.7 (24–25) | +2.7 | 0.10 | 0/3 | dart-lang/tools#2710 | B | [elsewhere] Review the base PR dart-lang/tools#2563 (sigstore bundle verification) first; this PR is stacked on it and can wait. |
| 23 | 23.7 (23–24) | +0.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | [waiting] Wait for liamappelbe to review; ping them if there's still no response around 2026-10-30. |
| 24 | 22.3 (21–25) | -1.7 | 0.11 | 0/3 | googleapis/google-cloud-dart#373 | B | [waiting] Wait for sigurdm to answer whether he reviewed the non-PubSub parts and can merge; natebosch is still the requested reviewer. Ping again around Oct 28 if there's no reply. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/3 | dart-lang/http#579 | B | [not_yours] Nothing to do now; leave it until a semver-major release of package:http is planned. |
| 26 | 15.3 (15–16) | -10.7 ⚠️ | 0.30 | 0/3 | dart-lang/http#1932 | B | [elsewhere] Act on my open PR dart-lang/http#2034 (avoid cronet namespace duplication), which closes this issue; reply to the latest 'any updates?' by pointing to the PR. |
| 27 | 31.3 (30–32) | +4.3 | 0.03 | 0/3 | flutter/devtools#8223 | B | [not_yours] Nothing to do; this is a flutter/devtools feature request where I was only CC'd, outside my responsible repositories. |
| 28 | 27.0 (27) | -1.0 | 0.06 | 3/3 | dart-lang/http#1837 | A | [backlog] Nothing pending; I already replied that this is a community contribution. Leave it open as contributions-welcome or close when grooming. |
| 29 | 34.7 (34–35) | +5.7 | 0.01 | 0/3 | dart-lang/http#2033 | A | [not_yours] Nothing to do; I already approved and mosuem can merge. |
| 30 | 34.3 (34–35) | +4.3 | 0.02 | 0/3 | dart-lang/http#1365 | A | [not_yours] Nothing to do: http2 is outside my scope, and no one has asked me to act. |
| 31 | 29.3 (28–30) | -1.7 | 0.03 | 0/3 | dart-lang/tools#2715 | B | [not_yours] Nothing to do; davidmorgan is the named reviewer and the team request is shared. |
| 32 | 30.3 (29–33) | -1.7 | 0.03 | 0/3 | dart-lang/http#2026 | A | [not_yours] Nothing for me; the PR touches http2, which I'm not responsible for, and the contributor asked mosuem to review it. |
| 33 | 30.7 (28–33) | -2.3 | 0.03 | 0/3 | dart-lang/native#3653 | A | [not_yours] Nothing for me to do; liamappelbe owns this issue and is driving the autorelease-pool approach, and my input was already given. |
| 34 | 19.7 (19–20) | -14.3 ⚠️ | 0.17 | 0/3 | dart-lang/http#1972 | B | [elsewhere] Review the open PR dart-lang/http#1974 (fix for #1972) instead of acting on this issue; the issue is also waiting on the reporter for info. |
| 35 | 36.0 (36) | +1.0 | 0.00 | 0/3 | dart-lang/http#1841 | B | [not_yours] Nothing to do on the issue; I marked it not important, and the work is now in PR dart-lang/http#2002. |
| 36 | 10.0 (7–12) | -26.0 ⚠️ | 0.54 | 3/3 | dart-lang/sdk#38148 | B | [respond] Reply to filiph's offer to help, ask for a repro, and check whether the 2026-10-21 commit that referenced this issue affects it. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1972** (truth #34) in 1/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue I created and am assigned to, about CA trust on Android, and it has new activity: a question about the compromised eMudhra intermediate CAs. It is in dart-lang/sdk, which is not in my repo list, but I own the issue. A related issue (#64644) was just closed, so I need to check whether the problem is resolved and not leave a trust problem in an unknown state. The P3 label and the issue's age don't lower its priority.
- **Next action:** [todo] Read the eMudhra compromise report and dart-lang/sdk#64644, then determine whether Android's disabled-cert and blocklist handling leaves Dart trusting the compromised intermediates, reply to acn-masatadakurihara, and close or fix this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo (a close collaborator) left an unanswered inline review question 21h ago, with one unresolved thread. Blocking a collaborator's review on my own work falls in the 0.8-0.9 band. It isn't a security issue, so it stays below that tier.
- **Next action:** [respond] Answer kevmoo's inline question on bump.go about CHANGELOG.md being deleted by the next generate, and either add it to lib.Keep or have Dart clean preserve it.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in a repository I'm responsible for, authored by a close collaborator (sigurdm), and no human has reviewed it in 5 days (only gemini-code-assist). I'm the default reviewer, so it's on me. It's a small, pre-release change, so it sits in the reviews-waiting range rather than higher.
- **Next action:** [review] Review sigurdm's PR #376 (pubsub client attribution header and pre-release polish) in google-cloud-dart; no human review yet and it is behind main.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a PR in a repository I am responsible for, and no human has reviewed it yet (the Gemini bot doesn't count), so I am the default reviewer. The author is a first-time contributor, not a collaborator, so it ranks below collaborators' PRs. It changes error semantics in a widely used RPC package and fixes a real retry bug, which makes it worth prompt attention. It is not a security issue and nobody is blocked on feedback from me beyond the review itself.
- **Next action:** [review] Review PR #382 (fixes #381) in google-cloud-dart: check that Status.code now uses the google.rpc.Code for JSON errors, and the behavior change for existing callers.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my issue in a repo I own, and a contributor posted a concrete design proposal 4 days ago that I haven't answered. They are waiting on my feedback to move forward, and I explicitly asked to agree on the approach before they write code. It is a non-security bug (p2), so it sits in the middle of the 'contributor waiting on my reply' band rather than at the top.
- **Next action:** [respond] Reply to Yusufihsangorgel's 4d-old design sketch (nullable number and string on ProtoEnum): approve it or request changes, and say whether to proceed with a preliminary PR.

### 6. dart-lang/http#2027 → predicted 13, priority 0.40
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this design issue in dart-lang/http, a repo I own, 9 days ago, and it has had no activity since. It is not security-related and nobody is waiting on me. It is my own planned work, but it is a breaking-change design question with no urgency, so it ranks as lower-priority planned work and will sink as it ages.
- **Next action:** [backlog] Decide whether to make Client.close async in a 2.0 release or tighten its semantics, and write up a plan or close the issue.

### 7. dart-lang/http#1981 → predicted 7, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself 5h ago and said I've started working on this, so it is my own planned work in dart-lang/http, a repo I'm responsible for. It is not in the http2 area. Nobody is waiting on me, but the work is fresh and I committed to it. The feature is security-related (certificate pinning) but is a feature request, not a vulnerability, so it sits in the planned-work range rather than the top.
- **Next action:** [todo] Continue the work I started on a server trust evaluation hook for CupertinoClient and post a draft PR or design update on the issue.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I'm responsible for, filed by close collaborator kevmoo, with a clear next step for me. He answered my question 17 days ago and said it isn't urgent, but that still ranks it above items waiting on others. Part 2 (error frames silently decoded as empty messages) is a real correctness bug, so it deserves attention, though it isn't a security issue and nobody is blocked.
- **Next action:** [todo] Decide whether to fix both parts: at minimum handle mid-stream SSE error frames by throwing ServiceException, and verify whether servers actually stream incremental JSON before building an incremental array decoder.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** The issue is assigned to me and has had no activity since the January 2025 triage. Lenient header parsing that lets NUL or whitespace through can cause proxy desync problems, so it is security-adjacent and shouldn't be allowed to sit forever. There is no new activity, no one is waiting on me, and the repository is not one I'm responsible for, so it stays in the planned-work range rather than the top security tier.
- **Next action:** [todo] Decide whether to fix dart:io's HTTP header-name validation to the RFC 9110 tchar set (rejecting NUL, \x0b and other invalid bytes), or unassign yourself.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator's (kevmoo) issue in a repository I own, and my last comment on Oct 9 asked a design question that he hasn't answered in 16 days. It is not security-related, and no PR covers it yet. It is a recent-ish unanswered question to a close collaborator in my own repo, so it sits in the 0.35-0.5 band, and I may need to follow up.
- **Next action:** [waiting] Wait for kevmoo to answer my question on discovery vs. adding convenience extensions to the proto-based Compute client; ping him if it stays quiet.

### 11. dart-lang/sdk#31275 → predicted 17, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old but real bug in widely used dart:io code (a server-crashing uncatchable exception). I was only CC'd, and the CC came as a request to own it, with kevmoo (a collaborator) adding a plea. It lives in dart-lang/sdk, which isn't one of my listed repositories, and there has been no activity for about 20 months, so nothing is pressing. It's not a security issue, so it ranks above ordinary CC noise but stays in the low range.
- **Next action:** [backlog] Decide whether to pick up the abandoned CL 144346 to fix the uncatchable HttpException in dart:io, or leave it for grooming.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** The issue has an open PR by me (#3763) that closes it, so the PR is the thing to act on and the issue itself has nothing left to do. It is a real bug affecting cupertino_http streamed requests, but there is no new activity on the issue. Per the duplicate rule it ranks well below its PR, in the low range.
- **Next action:** [elsewhere] Work on PR dart-lang/native#3763 (support scheduleInRunLoop:forMode:), which closes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.55
- **Ground truth:** 
- **Model:** Issue is in my repo, filed by close collaborator sigurdm, and I said I'm deciding how to fix it, so it's my commitment with a clear next step. It blocks correct releases of google_cloud_storage and pubsub, but no one is actively waiting and there's been no activity in 17 days. No open PR covers it, and it isn't a security issue.
- **Next action:** [todo] Decide how to handle the rpc version requirement (librarian automation vs. manual), then bump google_cloud_rpc and require it in storage and pubsub pubspecs before release.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.10
- **Ground truth:** 
- **Model:** The review request went to the dart-ecosystem-team rather than to me personally, and dart-lang/tools is not one of my repositories. It is a small automated revision bump with passing health checks, not a flagged security issue, and nothing has been asked of me. That puts it in the low team-review-request range.
- **Next action:** [not_yours] Nothing to do; this is a bot BoringSSL bump with a team review request in a repo I don't own, so leave it to the rest of dart-ecosystem-team.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue has an open PR (#382) that closes it, so the PR is the item to act on and this one ranks below it. The retry bug in google_cloud_rpc is real, but it is a correctness bug and not a security issue. It sits in a repo I own, so it stays at the top of the low range.
- **Next action:** [elsewhere] Review the fix PR googleapis/google-cloud-dart#382 instead of acting on this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http (cronet_http, not http2). I requested review from goderbauer 2 days ago and there has been no response, so nothing is actionable yet. It fixes issue #1932, which stays low until this lands. Re-ping becomes worthwhile after about a week of silence.
- **Next action:** [waiting] Wait for goderbauer to review; ping them if there's still no response about a week after the 2026-10-23 review request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned this issue from a close collaborator (kevmoo) in a repo I own, and the next step is clearly mine with nobody waiting on a reply. No open PR covers it yet (the retry-extraction PRs are merged). The FormatException bug on 502/503/504 responses is a real reliability gap, but it isn't a security issue and there's been no activity in 10 days, so it sits in the planned-work range.
- **Next action:** [todo] Design and implement RetryRunner/RequestOptions wiring in ServiceClient and harden ServiceException.fromHttpResponse against non-JSON bodies.

### 18. dart-lang/http#2031 → predicted 31, priority 0.03
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** My note says I'm not responsible for http2, so this item is near 0 unless I'm personally asked. I am named as a reviewer, but the PR is stacked on #2010, #2014 and #2009. #2014 has no review yet, so the lower PRs need review first. The release-prep change is tiny (+2/-2) and can't merge until the stack lands.
- **Next action:** [not_yours] Nothing to do: http2 is outside my scope, and this release-prep PR is stacked on #2014, which is still unreviewed.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.27
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft in a repo I own, untouched for 45 days. It has a dirty merge state and 5 unresolved bot review threads. No one is waiting on me, so it only needs finishing or abandoning. That puts it in the draft range, not urgent.
- **Next action:** [todo] Decide whether to finish this draft DNS PR (address Gemini's 5 review comments, resolve merge conflicts) or close it.

### 20. dart-lang/core#1007 → predicted 6, priority 0.60
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core is not on my list of responsible repositories, but the package:path PR fixes sigurdm's issue #537 (sigurdm is a usual collaborator), and the only review request went to the team, not to me personally. Nobody has reviewed it in 15 days. It's a small, low-risk change from a first-time contributor, but the CLA check failed, which blocks merging and makes it less urgent. It is a normal-priority review rather than an urgent one.
- **Next action:** [review] Review the isWithin trailing-dot fix in dart-lang/core#1007, after checking whether the contributor has signed the CLA, since it is blocked until then.

### 21. dart-lang/tools#2544 → predicted 28, priority 0.04
- **Ground truth:** 
- **Model:** This is a security PR, but it is in dart-lang/tools, which I'm not responsible for (only dart-lang/http). The review request went to dart-ecosystem-team rather than to me personally, and lrhn is named as a reviewer and has left detailed feedback, so it is near 0. Nothing has been asked of me.
- **Next action:** [not_yours] Nothing to do: this is a team review request in a repo I don't own, and lrhn is already reviewing it.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This is a PR from a close collaborator (mosuem) in a repo I'm responsible for, but it's stacked on #2563, which is still a draft and hasn't had human review. The lower PR needs review first, so this one is low priority for now. The team review request is shared and not addressed to me personally.
- **Next action:** [elsewhere] Review the base PR dart-lang/tools#2563 (sigstore bundle verification) first; this PR is stacked on it and can wait.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, and I requested review from liamappelbe 2 days ago. They haven't responded and there's no feedback for me to address. Nothing to do until about a week has passed, then a ping would be appropriate.
- **Next action:** [waiting] Wait for liamappelbe to review; ping them if there's still no response around 2026-10-30.

### 24. googleapis/google-cloud-dart#373 → predicted 25, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR. Sigurdm approved it, and on Oct 21 I asked him whether the rest is good to merge. He hasn't replied in 4 days, so it's too early to nudge. natebosch is still a requested reviewer. The branch is behind main, so a merge may be needed later, but nothing blocks me right now.
- **Next action:** [waiting] Wait for sigurdm to answer whether he reviewed the non-PubSub parts and can merge; natebosch is still the requested reviewer. Ping again around Oct 28 if there's no reply.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** I'm a requested reviewer in dart-lang/http, but the PR is a breaking change labeled 'next-breaking-release' and I said it must wait for a major release, so it is blocked. It has been dormant for over a year, with only a stray question from a third party since my last comment. That puts it in the low band for PRs waiting on a future breaking release.
- **Next action:** [not_yours] Nothing to do now; leave it until a semver-major release of package:http is planned.

### 26. dart-lang/http#1932 → predicted 16, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** The issue is assigned to me in a repo I own, and users are asking for updates, but an open PR of mine (#2034) already covers the fix. Per the duplicate rule, the PR is the thing to act on, so this issue ranks well below it and stays in the low range. It is a build-breaking bug with several users affected, so it sits near the top of that range.
- **Next action:** [elsewhere] Act on my open PR dart-lang/http#2034 (avoid cronet namespace duplication), which closes this issue; reply to the latest 'any updates?' by pointing to the PR.

### 27. flutter/devtools#8223 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** flutter/devtools is not one of my repositories, and I was only cc'd informationally by bkonyi over two years ago. Nobody has asked me to act, and the recent activity is just label housekeeping. This is a non-security feature request with no direct ask.
- **Next action:** [not_yours] Nothing to do; this is a flutter/devtools feature request where I was only CC'd, outside my responsible repositories.

### 28. dart-lang/http#1837 → predicted 27, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old P3 feature request labeled contributions-welcome, and I already answered that the Dart team won't take it on. Nothing has happened in nearly a year and nobody is waiting on me. It is in a repo I'm responsible for, so it stays as low-priority backlog rather than not_yours.
- **Next action:** [backlog] Nothing pending; I already replied that this is a community contribution. Leave it open as contributions-welcome or close when grooming.

### 29. dart-lang/http#2033 → predicted 35, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2d ago and there has been no activity or new commits since. It is done as far as I am concerned, and the review decision is APPROVED with a clean merge state.
- **Next action:** [not_yours] Nothing to do; I already approved and mosuem can merge.

### 30. dart-lang/http#1365 → predicted 34, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue concerns the package:http2 area of dart-lang/http, which I noted I am not responsible for. I wasn't mentioned or asked anything, and the latest comment is only a general question about closing the issue. The thread is also old and the performance cause appears to lie elsewhere.
- **Next action:** [not_yours] Nothing to do: http2 is outside my scope, and no one has asked me to act.

### 31. dart-lang/tools#2715 → predicted 30, priority 0.03
- **Ground truth:** 
- **Model:** dart-lang/tools is not a repository I'm responsible for. My only link is the dart-ecosystem-team review request, and kevmoo also asked davidmorgan personally, so that person is the one expected to review. The change is a bounds-validation fix, not a security issue.
- **Next action:** [not_yours] Nothing to do; davidmorgan is the named reviewer and the team request is shared.

### 32. dart-lang/http#2026 → predicted 29, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** My note says I'm not responsible for http2, and this PR only changes pkgs/http2. Nobody has asked me to act, since the author pinged mosuem for the review and I'm not a requested reviewer. Because it's a first-time contributor's PR in an area outside my scope, it stays near 0.
- **Next action:** [not_yours] Nothing for me; the PR touches http2, which I'm not responsible for, and the contributor asked mosuem to review it.

### 33. dart-lang/native#3653 → predicted 33, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is driving it, and the last comment concludes the approach probably isn't worth pursuing. The only mention of me was a thank-you, and nothing is asked of me. The related issue #3652 that I filed is already closed, and there has been no activity for about 34 days.
- **Next action:** [not_yours] Nothing for me to do; liamappelbe owns this issue and is driving the autorelease-pool approach, and my input was already given.

### 34. dart-lang/http#1972 → predicted 20, priority 0.15
- **Ground truth:** 
- **Model:** There is an open PR (#1974) linked to close this issue, so the PR is the thing to act on and the issue ranks well below it. The issue also has needs-info and I asked the reporter questions with no reply yet. It is a non-security bug in a repo I own, so it stays slightly above zero.
- **Next action:** [elsewhere] Review the open PR dart-lang/http#1974 (fix for #1972) instead of acting on this issue; the issue is also waiting on the reporter for info.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** I thumbed this down on 2026-10-05. Since then, nothing has been directed at me; the only later activity is the open PR #2002, which covers the issue. The issue is also an old enhancement with a next-breaking-release label.
- **Next action:** [not_yours] Nothing to do on the issue; I marked it not important, and the work is now in PR dart-lang/http#2002.

### 36. dart-lang/sdk#38148 → predicted 12, priority 0.50
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I thumbed this down on 2026-08-01, but filiph then reported a local repro and offered help, and a commit referenced the issue. Both came after the thumbs-down, so I judge it on its merits. I'm assigned, filiph is waiting on a reply, and the bug can affect a lot of users, but it's old, intermittent, and not security-related. That puts it around the middle of the range.
- **Next action:** [respond] Reply to filiph's offer to help, ask for a repro, and check whether the 2026-10-21 commit that referenced this issue affects it.
