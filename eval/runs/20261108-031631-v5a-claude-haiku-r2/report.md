# Gitilizer eval: v5a-claude-haiku-r2

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5a.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031631

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.524 ± 0.026 |
| spearman | 0.660 ± 0.035 |
| pairwise_acc | 0.762 ± 0.013 |
| ndcg | 0.971 ± 0.002 |
| ndcg@5 | 0.980 ± 0.016 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.867 ± 0.115 |
| top10_overlap | 0.767 ± 0.058 |
| mean_abs_displacement | 5.889 ± 0.420 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.783 ± 0.067 | 0.994 ± 0.003 | 0.867 ± 0.115 | 1.417 ± 0.382 |
| B | 20 | 0.270 ± 0.105 | 0.897 ± 0.002 | 0.533 ± 0.115 | 4.767 ± 0.586 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Check whether the closed fix in dart-lang/sdk#64644 (distrusting eight compromised intermediate CA keys) covers the eMudhra intermediates on Android, then reply to acn-masatadakurihara with the answer to the revocation and blocklist questions and close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo's question on bump.go about preserving the new CHANGELOG.md (append it to lib.Keep in Bump, or auto-preserve it in LanguageDart clean), push the fix, and resolve the open review thread. |
| 3 | 3.3 (3–4) | +0.3 | 0.74 | 3/3 | googleapis/google-cloud-dart#376 | A | Review googleapis/google-cloud-dart#376, the pubsub attribution header and pre-release polish PR from sigurdm, since no human has reviewed it yet. |
| 4 | 5.0 (4–6) | +1.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 (fixes issue #381, where ABORTED over REST is never retried) and leave a human review. |
| 5 | 4.3 (3–6) | -0.7 | 0.71 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string, with the breaking API change) to approve or adjust the approach before he writes more code. |
| 6 | 28.7 (27–30) | +22.7 ⚠️ | 0.10 | 0/3 | dart-lang/http#2027 | B | Nothing to do yet; this is a design discussion waiting on other maintainers' feedback on the close semantics and a possible 2.0 breaking release. |
| 7 | 8.0 (7–9) | +1.0 | 0.60 | 3/3 | dart-lang/http#1981 | B | Continue the CupertinoClient server-trust hook implementation I just started, and check whether the contributor has posted a skeleton PR to review. |
| 8 | 10.7 (9–12) | +2.7 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Triage this issue: decide whether to take on the mid-stream SSE error-frame fix now, and if so assign it to myself and check how it interacts with the merged SSE allowlist work in librarian#5533. |
| 9 | 10.3 (10–11) | +1.3 | 0.55 | 3/3 | dart-lang/sdk#59846 | B | Triage this long-dormant dart:io header-name validation bug: confirm the RFC 9110 tchar fix is still needed in the VM and either schedule the fix or unassign myself. |
| 10 | 7.7 (5–11) | -2.3 | 0.63 | 3/3 | googleapis/google-cloud-dart#361 | A | Reply to kevmoo's question on whether to switch compute_v1 to discovery or add convenience extensions, since he is waiting on a decision. |
| 11 | 17.7 (15–21) | +6.7 | 0.22 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed from me now; this is a dormant, unowned SDK bug that only needs an owner if someone decides to take up the abandoned CL. |
| 12 | 15.0 (14–16) | +3.0 | 0.27 | 3/3 | dart-lang/native#3752 | B | Review and merge the open PR #3763 that already implements scheduleInRunLoop:forMode: for this issue, then close the issue. |
| 13 | 22.7 (20–24) | +9.7 ⚠️ | 0.12 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump and librarian automation decision; nothing to do on this issue until then. |
| 14 | 12.0 (5–18) | -2.0 | 0.40 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools, which is waiting on dart-ecosystem-team review and is blocked on mergeable state. |
| 15 | 16.0 (14–17) | +1.0 | 0.22 | 2/3 | googleapis/google-cloud-dart#381 | A | Review PR #382 (the linked fix from quaaantumdev), since it resolves this issue and is the thing to act on. |
| 16 | 25.0 (22–27) | +9.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; ping them again if there is no response by around 2026-10-30. |
| 17 | 9.0 (8–10) | -8.0 | 0.60 | 3/3 | googleapis/google-cloud-dart#359 | B | Start implementing the ServiceException JSON-decode hardening and the ServiceClient RetryRunner/RequestOptions wiring (proposed solution item 1), since I'm assigned and the issue is my planned work. |
| 18 | 25.3 (19–29) | +7.3 | 0.11 | 1/3 | dart-lang/http#2031 | A | Review release-prep PR #2031 once its stacked PRs #2010, #2014 and #2009 are reviewed and merged, since it is blocked until then. |
| 19 | 16.3 (15–18) | -2.7 | 0.23 | 0/3 | googleapis/google-cloud-dart#345 | A | Nothing needed now; it's my own draft, so either finish the DNS work (fix the bot's unresolved threads and the dirty merge state) or close it out when I next plan dns work. |
| 20 | 23.3 (22–25) | +3.3 | 0.11 | 0/3 | dart-lang/core#1007 | B | Wait for the CLA to be signed by the contributor, then a dart-ecosystem-team member reviews the PR. |
| 21 | 16.7 (13–19) | -4.3 | 0.23 | 3/3 | dart-lang/tools#2544 | B | Review the PR and check whether lrhn's latest review comments are addressed; the PR is awaiting my review since it was requested via my team. |
| 22 | 21.3 (20–24) | -0.7 | 0.13 | 0/3 | dart-lang/tools#2710 | B | Nothing for me yet: this is a stacked draft-based PR waiting on its parent PR #2563 and on team review, so wait for the stack to be reviewed. |
| 23 | 26.0 (23–28) | +3.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them if there is no response by about 2026-10-30. |
| 24 | 20.3 (12–26) | -3.7 | 0.21 | 1/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether the non-Pub/Sub parts look good, or for natebosch to review; nothing else is mine to do yet. |
| 25 | 31.3 (31–32) | +6.3 | 0.09 | 0/3 | dart-lang/http#579 | B | Nothing to do now: this is blocked until a semver-major release, so it waits on that planning decision (and retendo's 14-month-old workaround question can be answered then). |
| 26 | 13.0 (12–14) | -13.0 ⚠️ | 0.30 | 3/3 | dart-lang/http#1932 | B | Review and merge PR #2034 (fix cronet namespace duplication), which I authored and which closes this issue, then reply to igordanilovski with the status. |
| 27 | 33.0 (32–34) | +6.0 | 0.05 | 0/3 | flutter/devtools#8223 | B | No action for me; wait for the DevTools team to decide on the high-cost WebSocket feature, since I'm only CC'd and not in that repository's scope. |
| 28 | 33.3 (33–34) | +5.3 | 0.06 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a contributions-welcome P3 enhancement I already answered 12 months ago, and it is not blocked on me. |
| 29 | 35.3 (35–36) | +6.3 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing for me; I approved it and it is clean and waiting on mosuem to merge. |
| 30 | 35.7 (35–36) | +5.7 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing for me to do; the open question from lubritto is about whether the root cause is in http2, and this is outside my stated scope (not responsible for http2). |
| 31 | 25.0 (21–32) | -6.0 | 0.10 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan or the dart-ecosystem-team to review PR #2715; nothing is needed from me now. |
| 32 | 22.0 (16–31) | -10.0 ⚠️ | 0.14 | 2/3 | dart-lang/http#2026 | A | Review PR #2026 (or ask mosuem to review it, since they were pinged), noting that I'm not responsible for http2 and it's a first-time contributor's fix to a crash. |
| 33 | 31.0 (29–34) | -2.0 | 0.08 | 0/3 | dart-lang/native#3653 | A | Nothing for me to do now; the issue is assigned to liamappelbe and the team is leaning toward wrapping objc_msgSend calls in autorelease pools instead. |
| 34 | 27.0 (25–30) | -7.0 | 0.11 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer the two questions (which client, and whether the server really sends Content-Length without a body) before doing anything else. |
| 35 | 24.7 (21–28) | -10.3 ⚠️ | 0.12 | 0/3 | dart-lang/http#1841 | B | Nothing for me now; wait for agam1092005's PR #2002 to be reviewed, since it covers this issue and is blocked on the next breaking release label for the default behavior. |
| 36 | 7.0 (6–8) | -29.0 ⚠️ | 0.63 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's 24d-old question about helping hunt the bug and start investigating the reproducible deleteSync failure, since it's assigned to me and filiph has a local repro. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/http#1841** (truth #35) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/http#1972** (truth #34) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/http#2026** (truth #32) in 2/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/tools#2715** (truth #31) in 2/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a certificate trust problem in a security-related thread, and I am both the author and assignee, so it falls in the top security band. New activity 3 days ago from an external reporter asks directly whether Dart honors Android revocation and blocklist mitigations for the compromised eMudhra intermediates. The related issue #64644 was closed 2 days ago, so the likely fix is already in place, but confirming that and answering the questions is my job rather than something to leave in an unknown state.
- **Next action:** Check whether the closed fix in dart-lang/sdk#64644 (distrusting eight compromised intermediate CA keys) covers the eMudhra intermediates on Android, then reply to acn-masatadakurihara with the answer to the revocation and blocklist questions and close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR, and kevmoo left an unresolved review question 21h ago that identifies a real bug: the next librarian generate would delete the CHANGELOG.md that bump creates for newly onboarded libraries. The PR is blocked on my reply and fix, so it sits in the 0.8–0.9 band. Nobody else needs to act first, and the item is fresh and in a repository I'm responsible for.
- **Next action:** Answer kevmoo's question on bump.go about preserving the new CHANGELOG.md (append it to lib.Keep in Bump, or auto-preserve it in LanguageDart clean), push the fix, and resolve the open review thread.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in a repository I am responsible for, from a close collaborator, and nobody has reviewed it (the gemini bot doesn't count), so the review is mine to do. It was opened 5 days ago and is framed as pre-release polish, which gives it some time pressure. It sits in the upper part of the review band rather than the top because the bot's concerns mainly target the already-merged #292 rather than this diff.
- **Next action:** Review googleapis/google-cloud-dart#376, the pubsub attribution header and pre-release polish PR from sigurdm, since no human has reviewed it yet.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a PR in google-cloud-dart, a repository I am responsible for, and no human has reviewed it yet; the gemini bot's comment doesn't count. It fixes a real retry bug in widely used error handling, and it is only 3 days old, so it is fresh. It is not from a regular collaborator and it isn't security-related, so it sits in the middle of the review range rather than at the top.
- **Next action:** Review PR #382 (fixes issue #381, where ABORTED over REST is never retried) and leave a human review.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my repo and I'm the one the contributor is waiting on, since I asked for an agreed design before a large change. His design sketch arrived 4 days ago and is the last human activity, so the ball is in my court. It isn't blocking someone right now and the issue is a p2 bug, so it sits in the contributor-waiting-on-my-reply band rather than the top.
- **Next action:** Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string, with the breaking API change) to approve or adjust the approach before he writes more code.

### 6. dart-lang/http#2027 → predicted 27, priority 0.10
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue filed 9 days ago in dart-lang/http, which I work in, so it is design work I raised, but nothing has been asked of me and nobody has replied. The proposed change is breaking and tied to a future 2.0 release, which is a plan-level block rather than an action I can take today. It is not fresh planned work in the sense of a concrete task, so it sits in the low range.
- **Next action:** Nothing to do yet; this is a design discussion waiting on other maintainers' feedback on the close semantics and a possible 2.0 breaking release.

### 7. dart-lang/http#1981 → predicted 9, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and said I've started working on it five hours ago, so it is my own committed work. It is not in the top tier because there is no new request directed at me and no open PR yet. Freshness is high, and the item sits in the lower part of the planned-work range.
- **Next action:** Continue the CupertinoClient server-trust hook implementation I just started, and check whether the contributor has posted a skeleton PR to review.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.45
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a non-security bug in google-cloud-dart, a repository I am responsible for, filed by a close collaborator (kevmoo) with concrete acceptance criteria, so it is my call rather than someone else's. kevmoo answered my question 17 days ago and explicitly said it is not urgent, and nothing has happened since, so it is stale and sits in the middle of the range. The mid-stream error handling is a real correctness gap, but the incremental JSON part depends on whether servers send incremental JSON, which is still unknown.
- **Next action:** Triage this issue: decide whether to take on the mid-stream SSE error-frame fix now, and if so assign it to myself and check how it interacts with the merged SSE allowlist work in librarian#5533.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am the assignee on a triaged bug in dart-lang/sdk, but nothing has happened for about 22 months and I have never acted on it. The bug is real and affects interoperability with proxies, and the issue is in a repository I work in, so it belongs in the assigned-issue range, where I should either fix it or unassign. It is not security-flagged, so it does not reach the top of the scale.
- **Next action:** Triage this long-dormant dart:io header-name validation bug: confirm the RFC 9110 tchar fix is still needed in the VM and either schedule the fix or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 7, priority 0.70
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** kevmoo is a close collaborator in a repository I am responsible for, and he has not replied to my 16-day-old question about discovery versus convenience extensions. The last human move was mine, so the ball is in my court to decide the direction. This is non-security issue work with a clear next step, but it is not blocking anyone urgently, so it sits in the upper-middle range rather than the top.
- **Next action:** Reply to kevmoo's question on whether to switch compute_v1 to discovery or add convenience extensions, since he is waiting on a decision.

### 11. dart-lang/sdk#31275 → predicted 21, priority 0.12
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is in dart-lang/sdk, which I'm not listed as responsible for, and I'm only mentioned as an informational CC from 2024 and 2020-era threads. The real work (the abandoned CL from a former Dart team member) is blocked and nobody has asked me a direct question since. kevmoo, a usual collaborator, did say he wants it taken up, which keeps it slightly above zero as an ownership question for me, but it is not an actionable item today.
- **Next action:** Nothing needed from me now; this is a dormant, unowned SDK bug that only needs an owner if someone decides to take up the abandoned CL.

### 12. dart-lang/native#3752 → predicted 14, priority 0.30
- **Ground truth:** 
- **Model:** I authored this issue in a repository I work in and it is assigned to me, but PR #3763 by me already closes it, so the issue itself has nothing left to do beyond the PR. Duplicate rule places issues covered by an open PR at 0.15-0.35, and the PR was updated 2 days ago with no sign it is waiting on anyone else. The issue is a real bug affecting cupertino_http users, so it sits at the upper part of that range rather than the bottom.
- **Next action:** Review and merge the open PR #3763 that already implements scheduleInRunLoop:forMode: for this issue, then close the issue.

### 13. googleapis/google-cloud-dart#366 → predicted 20, priority 0.12
- **Ground truth:** 
- **Model:** I am the last human to act, having commented 17 days ago that I was deciding on a general fix via librarian automation, so the next step is unresolved and sits with me only as a design decision. The concrete pubspec and CHANGELOG work is blocked on a future google_cloud_rpc release that hasn't been published yet. Freshness is moderate and the item is in my repository, but nothing new has been directed at me since my comment.
- **Next action:** Wait for the generated google_cloud_rpc version bump and librarian automation decision; nothing to do on this issue until then.

### 14. dart-lang/tools#2719 → predicted 5, priority 0.70
- **Ground truth:** 
- **Model:** This is a review request to a team I belong to, in dart-lang/tools, which I am not personally responsible for, so per the team-review rule it should sit at 0.1-0.25. However, the scope note says dart-lang/tools is outside my stated responsibilities but this is a boring automated update to a package that may affect builds, and nothing else has touched it in 19 hours. Given the mergeable_state is blocked and it is only fresh, I'll place it at the low end of the team-review band with a modest bump for being an unreviewed fresh PR in a Dart ecosystem repo.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools, which is waiting on dart-ecosystem-team review and is blocked on mergeable state.

### 15. googleapis/google-cloud-dart#381 → predicted 17, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is covered by open PR #382, so per the duplicates rule the PR is the actionable item and the issue ranks well below it. I only watch googleapis/google-cloud-dart and have no assignment or direct mention, and the author is an outside contributor with no collaborator history. The issue is 3 days old with only bot activity after creation, so it sits in the 0.15–0.35 range for items with a covering PR.
- **Next action:** Review PR #382 (the linked fix from quaaantumdev), since it resolves this issue and is the thing to act on.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR, and I asked goderbauer to review it only 2 days ago, so nothing is due from me yet. It fixes issue #1932, which is assigned to me, so it is worth tracking, but the issue is covered by this open PR and the next step belongs to the reviewer. The PR is not in a repository I'm primarily responsible for in this context, and the item is brand new, so it sits in the 0.05-0.15 band for a PR waiting on a recently requested reviewer.
- **Next action:** Wait for goderbauer to review PR #2034; ping them again if there is no response by around 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 10, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm the assignee and the issue is in a repository I own, filed by a close collaborator with a clear next step for me, so it sits in the planned-work range. My last comment (10 days ago) was a scope change and nothing is waiting on anyone else, so the next step is mine. It is not in the 0.65–0.8 band because no new activity is directed at me and the work is planned rather than urgent. The related AIP-4222/AIP-155 scope was moved to issue #80, so only the retry and transport work remains here.
- **Next action:** Start implementing the ServiceException JSON-decode hardening and the ServiceClient RetryRunner/RequestOptions wiring (proposed solution item 1), since I'm assigned and the issue is my planned work.

### 18. dart-lang/http#2031 → predicted 19, priority 0.12
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR requests my review personally, but it is stacked on three open PRs, and #2014 has not been reviewed yet, so the lower PRs need review first. The repository is dart-lang/http, where I am not responsible for http2, though the review request names me directly. The author is a close collaborator and the PR was updated only recently, so it sits in the stacked-PR band near the bottom of the actionable range.
- **Next action:** Review release-prep PR #2031 once its stacked PRs #2010, #2014 and #2009 are reviewed and merged, since it is blocked until then.

### 19. googleapis/google-cloud-dart#345 → predicted 15, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I'm responsible for, last touched 45 days ago when I converted it to draft, with no reviews requested and no new human activity since. It has 5 unresolved bot review threads and a dirty merge state, so it's stale rather than blocked on anyone. Per the scale, my own drafts I should finish or abandon sit in the 0.15–0.35 range, and the age pushes it to the lower part of that range.
- **Next action:** Nothing needed now; it's my own draft, so either finish the DNS work (fix the bot's unresolved threads and the dirty merge state) or close it out when I next plan dns work.

### 20. dart-lang/core#1007 → predicted 25, priority 0.10
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, a repository I'm not responsible for, and the review request went to a team I belong to rather than to me personally, so it falls in the low team-review range. The CLA check failed and mergeable_state is blocked, so the review can't proceed until the first-time contributor signs the CLA. Nothing is asked of me directly, and the PR is only 15 days old with a 3-day-old update.
- **Next action:** Wait for the CLA to be signed by the contributor, then a dart-ecosystem-team member reviews the PR.

### 21. dart-lang/tools#2544 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is a security-related PR, but it is in dart-lang/tools, a repository I'm not responsible for, and the review request came only via the dart-ecosystem-team. Per the rules, a team review request in a repo I don't own rates 0.1-0.25, and lrhn is already actively reviewing it, which makes it near 0 for me. Freshness is low since the last human activity was 2 months ago, although lrhn's review on Aug 26 still shows open threads. Security issues never get pulled down, but the security rule covers only security PRs in my repos or those where I'm the reviewer, and this one is being driven by lrhn.
- **Next action:** Review the PR and check whether lrhn's latest review comments are addressed; the PR is awaiting my review since it was requested via my team.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** The PR is stacked on draft PR #2563, which has not been reviewed, so the stack must be reviewed first. Review was requested only via dart-ecosystem-team, a team I belong to, and I'm not personally named, so it is shared rather than mine to action. The PR was opened 2 days ago with no human activity since beyond the author's own reference commits, so it is fresh but not waiting on me. It is a collaborator's infra PR in a repository I'm responsible for, which keeps it above the floor, but the blocking stack keeps it low.
- **Next action:** Nothing for me yet: this is a stacked draft-based PR waiting on its parent PR #2563 and on team review, so wait for the stack to be reviewed.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested review from liamappelbe 2 days ago, so nothing is due from me yet. The PR is in dart-lang/native, a repository I work in, and it fixes two open issues I filed, so it matters, but the next step belongs to the reviewer. Per the rule for PRs waiting on a recently asked reviewer, it sits around 0.1 until about a week has passed, then a ping would be worth about 0.3.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them if there is no response by about 2026-10-30.

### 24. googleapis/google-cloud-dart#373 → predicted 26, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** The PR is approved by sigurdm and my last activity was a question to him four days ago, which is a recent request I'm waiting on rather than work I owe. The PR is also behind main and has two unresolved threads, but those are minor and the requested reviewer natebosch is a teammate with a heavy queue, so it doesn't block anyone right now. It is my own PR in a repo I work in, so it stays visible, but sits low until a reply or a week of silence.
- **Next action:** Wait for sigurdm to answer whether the non-Pub/Sub parts look good, or for natebosch to review; nothing else is mine to do yet.

### 25. dart-lang/http#579 → predicted 31, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR is labeled next-breaking-release and I already said I lacked bandwidth to coordinate a major release for it, so the next step isn't mine today. Although review was requested from me personally, the blocker is explicit and the latest activity is an old, unanswered question from a first-time contributor's thread. Freshness is very low (436 days since update), so it sits at the bottom of the low range rather than being an active review.
- **Next action:** Nothing to do now: this is blocked until a semver-major release, so it waits on that planning decision (and retendo's 14-month-old workaround question can be answered then).

### 26. dart-lang/http#1932 → predicted 13, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an assigned issue with a linked open PR that covers it, so the PR is the real action item and the issue ranks below it per the duplicate rule. The PR was updated 2d ago and is my own, so it is probably waiting on review or merge rather than on me, but the issue is in my repository and igordanilovski just asked for an update, which warrants a prompt reply. Ranked in the 0.15–0.35 band for items with a covering PR.
- **Next action:** Review and merge PR #2034 (fix cronet namespace duplication), which I authored and which closes this issue, then reply to igordanilovski with the status.

### 27. flutter/devtools#8223 → predicted 33, priority 0.05
- **Ground truth:** 
- **Model:** I am only mentioned as an informational CC by bkonyi in a 2024 thread, and the repository is outside the repos I am responsible for. The last activity was srawlins removing the 'cost: high' label four days ago, which is a status change rather than a request for me. The real work sits with the DevTools team and not with me, so this belongs in the bottom range.
- **Next action:** No action for me; wait for the DevTools team to decide on the high-cost WebSocket feature, since I'm only CC'd and not in that repository's scope.

### 28. dart-lang/http#1837 → predicted 34, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** The issue is a feature request in dart-lang/http, a repo I'm only a commenter/watcher on, and I already replied saying the Dart team is unlikely to take it on. Nothing has happened since October 2025, so it's stale backlog with contributions welcome. It is only related to an old flutter issue that doesn't need me.
- **Next action:** Nothing to do; this is a contributions-welcome P3 enhancement I already answered 12 months ago, and it is not blocked on me.

### 29. dart-lang/http#2033 → predicted 36, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already approved this PR two days ago, there are no unresolved threads, no new commits or replies since my review, and it is mergeable. The remaining step is the author or a maintainer merging it, so it is effectively done from my side. It is in a repo I work in and from a close collaborator, but approved-and-quiet items sit at the bottom of the scale.
- **Next action:** Nothing for me; I approved it and it is clean and waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is an old, stale performance issue in http2, which I've explicitly noted I'm not responsible for. I only watch the repo, have never engaged, and no one has mentioned me. The last comment is a mild question about closing the issue, which is a maintainer triage matter rather than something I need to act on. The root cause appears to lie in the socket layer (linked sdk#48210), which is owned elsewhere.
- **Next action:** Nothing for me to do; the open question from lubritto is about whether the root cause is in http2, and this is outside my stated scope (not responsible for http2).

### 31. dart-lang/tools#2715 → predicted 32, priority 0.05
- **Ground truth:** 
- **Model:** This is kevmoo's PR requesting review from davidmorgan directly, and I was only requested via the dart-ecosystem-team team review, which is shared across the team and not addressed to me personally in a repo I'm not responsible for. It is in dart-lang/tools, where my role is only a team reviewer, and davidmorgan is also named, so the team request is near zero. The PR was opened and updated two days ago and the only other review is an informational bot comment, so there is nothing for me to act on yet.
- **Next action:** Wait for davidmorgan or the dart-ecosystem-team to review PR #2715; nothing is needed from me now.

### 32. dart-lang/http#2026 → predicted 16, priority 0.20
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in http2, a subpackage the user explicitly said they are not responsible for, and no review has been requested of them personally. The author pinged mosuem, a close collaborator, not me, so the review belongs to mosuem. Its only tie to me is that I'm a watcher, so it sits in the team-review-equivalent low range, with a bit of uplift because it is a real crash fix in a repo I follow.
- **Next action:** Review PR #2026 (or ask mosuem to review it, since they were pinged), noting that I'm not responsible for http2 and it's a first-time contributor's fix to a crash.

### 33. dart-lang/native#3653 → predicted 29, priority 0.10
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to and actively driven by liamappelbe, and the last substantive comment (34d ago) was his own decision that the approach is probably not worth the effort. I was only mentioned in passing (a thank-you for a tip) and my last comment was 37d ago, so nothing is directed at me. The related merged PR was found not to work, so the issue is effectively parked with no clear next step for me.
- **Next action:** Nothing for me to do now; the issue is assigned to liamappelbe and the team is leaning toward wrapping objc_msgSend calls in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 30, priority 0.10
- **Ground truth:** 
- **Model:** I asked the reporter for information and labeled it needs-info 8 days ago, and they have not replied, so the next step is theirs. The issue is assigned to me, but it is blocked on their answer, and an open PR #1974 already attempts a fix and is itself waiting on needs-info. The reporter is a stranger in a repository I work in, and nothing new has happened since my last comment, so it sits in the low range.
- **Next action:** Wait for Keetz to answer the two questions (which client, and whether the server really sends Content-Length without a body) before doing anything else.

### 35. dart-lang/http#1841 → predicted 28, priority 0.10
- **Ground truth:** 
- **Model:** I am only a commenter and not responsible for this area, and the issue is labeled next-breaking-release. A linked open PR (#2002) by agam1092005 already covers the issue, so the issue itself has nothing left for me to do. The thumbs-down was set after my last comment, and the only newer activity is a PR-linked comment that asks nothing of me directly beyond a mention, so it stays low.
- **Next action:** Nothing for me now; wait for agam1092005's PR #2002 to be reviewed, since it covers this issue and is blocked on the next breaking release label for the default behavior.

### 36. dart-lang/sdk#38148 → predicted 8, priority 0.62
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** This is an issue assigned to me in dart-lang/sdk, which is not a repository I own but where I'm the assignee, so it counts as assigned work I should either fix or unassign. Filiph now has a local reproduction and asked how to help, which is a direct open question that I haven't answered. A copybara commit referencing the issue four days ago suggests someone may already have touched it, so I should check that commit before investing time. Thumbs-down was set in August, but filiph's October comment is newer and changes what I should do, so it doesn't suppress the score.
- **Next action:** Reply to filiph's 24d-old question about helping hunt the bug and start investigating the reproducible deleteSync failure, since it's assigned to me and filiph has a local repro.
