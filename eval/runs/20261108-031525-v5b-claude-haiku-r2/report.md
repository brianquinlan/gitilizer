# Gitilizer eval: v5b-claude-haiku-r2

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5b.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031525

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.610 ± 0.019 |
| spearman | 0.751 ± 0.007 |
| pairwise_acc | 0.805 ± 0.010 |
| ndcg | 0.978 ± 0.004 |
| ndcg@5 | 0.995 ± 0.006 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.933 ± 0.115 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.111 ± 0.096 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.800 ± 0.017 | 0.996 ± 0.001 | 1.000 ± 0.000 | 1.292 ± 0.144 |
| B | 20 | 0.400 ± 0.042 | 0.928 ± 0.019 | 0.600 ± 0.000 | 4.333 ± 0.252 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist (per issue #64644, which is closed and assigned to mraleph) and reply to the security question, then close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.87 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review question on bump.go about whether Bump should append CHANGELOG.md to lib.Keep or LanguageDart clean should preserve it, then push the fix and re-request review. |
| 3 | 4.7 (4–5) | +1.7 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (sigurdm's pub/sub release polish, a collaborator's PR in my repo) and check gemini's high-priority ACK StateError feedback on the related streaming-pull code. |
| 4 | 3.0 (3) | -1.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 (fix for JSON error status.code in google_cloud_rpc), since I'm the default reviewer for this repo and nobody human has reviewed it yet. |
| 5 | 5.0 (4–7) | +0.0 | 0.68 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string on ProtoEnum) to approve it or request changes, since they are waiting on me before writing a PR. |
| 6 | 10.3 (9–11) | +4.3 | 0.52 | 0/3 | dart-lang/http#2027 | B | No action needed yet; this is a design discussion I filed myself, waiting on a decision about whether to pursue a 2.0 breaking change to Client.close. |
| 7 | 7.7 (6–9) | +0.7 | 0.58 | 3/3 | dart-lang/http#1981 | B | Proceed with the implementation I said I started on 5h ago, since the feature is wanted in principle and no PR from the contributor has arrived yet. |
| 8 | 8.3 (5–10) | +0.3 | 0.57 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo's question about whether servers send incremental JSON, or check the Google API behavior, then decide whether to pursue the SSE error-frame fix now. |
| 9 | 11.7 (11–12) | +2.7 | 0.47 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header-name validation (check the tchar rule in the VM HTTP parser) or unassign myself, since I'm the assignee of this long-dormant bug. |
| 10 | 14.0 (13–15) | +4.0 | 0.37 | 0/3 | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to answer my 16-day-old question on whether to switch Compute to the discovery spec or add convenience extensions to the service operations. |
| 11 | 16.7 (12–25) | +5.7 | 0.31 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed now; this is a 9-year-old unassigned SDK bug where I'm only CC'd, and the next step (someone taking over the abandoned CL) belongs to the SDK team. |
| 12 | 11.0 (7–18) | -1.0 | 0.48 | 3/3 | dart-lang/native#3752 | B | Finish and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue. |
| 13 | 18.7 (15–21) | +5.7 | 0.23 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump (and the librarian automation decision I was weighing) before editing the storage and pubsub pubspecs. |
| 14 | 18.0 (16–20) | +4.0 | 0.23 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since it was requested from dart-ecosystem-team and nobody has reviewed it yet. |
| 15 | 15.3 (13–19) | +0.3 | 0.31 | 3/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which already fixes this issue, and confirm the google.rpc.Code mapping, since the issue itself is covered by the PR. |
| 16 | 27.3 (27–28) | +11.3 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer's review of PR #2034; if there's no response by about 2026-10-30, send a gentle ping. |
| 17 | 7.7 (6–9) | -9.3 ⚠️ | 0.63 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the remaining scope: fix the FormatException bypass in ServiceException.fromHttpResponse and wire RetryRunner/RequestOptions into ServiceClient._makeRequest. |
| 18 | 21.0 (17–25) | +3.0 | 0.22 | 3/3 | dart-lang/http#2031 | A | Review the release-prep PR #2031 for brianquinlan, but only after the stacked PRs #2010, #2014 and #2009 are reviewed and merged first, since this PR's base is unreviewed work. |
| 19 | 17.3 (16–19) | -1.7 | 0.28 | 2/3 | googleapis/google-cloud-dart#345 | A | Nothing needed now; I'd finish the DNS draft (fix the gemini-flagged nullable and documentation issues, resolve threads, rebase the dirty branch) or abandon it. |
| 20 | 24.3 (23–26) | +4.3 | 0.14 | 0/3 | dart-lang/core#1007 | B | Wait for the author to sign the CLA and for a dart-ecosystem-team member to review; nothing for me to do yet. |
| 21 | 21.0 (19–22) | +0.0 | 0.22 | 3/3 | dart-lang/tools#2544 | B | Review lrhn's latest review feedback (helper function, tests for tricky cases) and reply or push fixes, then get it re-reviewed since the review requests were to lrhn; as a team-review item I should review it myself only if I'm the one picking it up. |
| 22 | 23.7 (23–24) | +1.7 | 0.13 | 0/3 | dart-lang/tools#2710 | B | Wait for a dart-ecosystem-team member to review this PR; it is stacked on draft PR #2563 and the team review request is not addressed to me personally. |
| 23 | 28.3 (28–29) | +5.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them if there is still no response after about a week (around 2026-10-30). |
| 24 | 20.0 (14–30) | -4.0 | 0.26 | 2/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm's answer on whether the non-PubSub parts are fine, and be ready to merge if he confirms and natebosch can be released from review; nothing else is needed from me right now. |
| 25 | 31.0 (30–32) | +6.0 | 0.09 | 0/3 | dart-lang/http#579 | B | Nothing to do now: this PR is parked under the next-breaking-release label until a semver-major release is planned, and retendo's 14-month-old question about a workaround doesn't change that. |
| 26 | 17.3 (15–20) | -8.7 | 0.25 | 1/3 | dart-lang/http#1932 | B | Reply to igordanilovski with a status update, pointing to open PR dart-lang/http#2034 and its current state, and close this issue once that PR merges. |
| 27 | 33.0 (32–34) | +6.0 | 0.05 | 0/3 | flutter/devtools#8223 | B | Nothing for me to do; this is a feature request in flutter/devtools that I was only cc'd on, and it is blocked on dart:io network profiling work owned by others. |
| 28 | 32.3 (30–34) | +4.3 | 0.06 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a contributions-welcome P3 enhancement I already declined to take on, with no new activity in 12 months. |
| 29 | 36.0 (36) | +7.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing for me; I already approved and the PR is clean and waiting on the author to merge. |
| 30 | 35.0 (35) | +5.0 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action needed from me; this is an http2 issue outside my scope, and the open question is whether it should be closed, which belongs to the package maintainers. |
| 31 | 25.3 (23–27) | -5.7 | 0.12 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan (or the dart-ecosystem-team) to review PR #2715; nothing for me to do unless the team review request is mine to pick up. |
| 32 | 30.3 (26–34) | -1.7 | 0.07 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem (or another http2 owner) to review PR #2026; I am not responsible for http2 and no review has been requested of me. |
| 33 | 28.7 (25–32) | -4.3 | 0.10 | 0/3 | dart-lang/native#3653 | A | Nothing for me now; the work is parked while liamappelbe decides whether the deeper FFI change is worth doing. |
| 34 | 31.0 (29–33) | -3.0 | 0.08 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter (Keetz) to answer the client and scenario questions; PR #1974 is open and should be reviewed separately. |
| 35 | 20.3 (18–22) | -14.7 ⚠️ | 0.23 | 1/3 | dart-lang/http#1841 | B | Wait for agam1092005's PR #2002 to be reviewed; the issue is covered by an open PR and blocked on the next-breaking-release label. |
| 36 | 7.7 (6–10) | -28.3 ⚠️ | 0.61 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's 24d-old question about helping hunt the bug, and attempt a local reproduction to narrow down the cause of the intermittent recursive delete failure. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is my issue, I'm assignee and author, and it has fresh security-relevant activity: a report that compromised eMudhra intermediate CAs may be trusted by Dart on Android. Per the security rules, any new activity on a security issue I own scores at the top of the scale, and confirming the state and closing it is my job. The linked #64644 appears to address the distrust, but I still need to confirm the Android behavior and answer the open questions.
- **Next action:** Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist (per issue #64644, which is closed and assigned to mraleph) and reply to the security question, then close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.90
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR with an unanswered review question from a close collaborator (kevmoo) that identifies a real bug: the next generate would delete the newly created CHANGELOG.md. The PR is blocked on my reply and fix, so it sits in the 0.8–0.9 range for blocking work. Activity is fresh (21h ago), and the linked issue is in a repository I own, so I place it near the top of that range.
- **Next action:** Reply to kevmoo's review question on bump.go about whether Bump should append CHANGELOG.md to lib.Keep or LanguageDart clean should preserve it, then push the fix and re-request review.

### 3. googleapis/google-cloud-dart#376 → predicted 5, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a collaborator's PR in google-cloud-dart, a repo I'm responsible for, and nobody has reviewed it yet, so I'm the default reviewer. Review is required and it is fresh (5 days). Its scope is smaller than it looks, since the bulk of the diff is already covered by PR #292 and the bot's high-priority finding concerns earlier streaming code. It is held down slightly by the fact that it's behind main and related work is still in flight.
- **Next action:** Review PR #376 (sigurdm's pub/sub release polish, a collaborator's PR in my repo) and check gemini's high-priority ACK StateError feedback on the related streaming-pull code.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a non-security PR in googleapis/google-cloud-dart, a repository I'm responsible for, and no human has reviewed it, so the review is on me. The author is a first-time contributor, which puts it below collaborator PRs but still in the reviews-waiting-on-me range. It fixes a real retry bug (ABORTED never retried over REST) with linked issue #381 and tests, and it is fresh at 3 days old. The change does alter status.code semantics for JSON errors, so careful review is worth the time.
- **Next action:** Review PR #382 (fix for JSON error status.code in google_cloud_rpc), since I'm the default reviewer for this repo and nobody human has reviewed it yet.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug issue in a repository I maintain, and the contributor's design proposal from 4 days ago is a direct response to my request that we agree on an approach before any code is written. The next step is mine and nothing else blocks it, so it sits in the contributor-waiting-on-my-reply range. It is not a security issue and the design is still open, so I place it near the upper-middle of that range rather than the top.
- **Next action:** Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string on ProtoEnum) to approve it or request changes, since they are waiting on me before writing a PR.

### 6. dart-lang/http#2027 → predicted 11, priority 0.45
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue in dart-lang/http, a repo I work in, filed 9 days ago, so it sits in the fresh planned-work range. However, it is a design exploration with no next step for me today, and nothing has happened since I opened it, so it sinks within the range. It is not a security issue and has no new activity or external input to act on.
- **Next action:** No action needed yet; this is a design discussion I filed myself, waiting on a decision about whether to pursue a 2.0 breaking change to Client.close.

### 7. dart-lang/http#1981 → predicted 9, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is an issue I assigned to myself and said I'm working on, which places it in the 0.5-0.65 planned-work range. It is not blocked by anyone else, and I actively commented 5 hours ago, so it is fresh. It sits at the lower end because it is a feature request in dart-lang/http rather than a security or review item, and the contributor has not yet produced a PR that would require my review.
- **Next action:** Proceed with the implementation I said I started on 5h ago, since the feature is wanted in principle and no PR from the contributor has arrived yet.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a non-security issue filed by a close collaborator in my repository, and kevmoo's last comment is a soft question that I haven't answered, so there is a clear next step for me. However, kevmoo explicitly says it isn't urgent and the question of whether servers send incremental JSON is open. The mid-stream SSE error-swallowing part is a real correctness bug that could be taken on as planned work, which keeps it in the planned-work range rather than higher.
- **Next action:** Reply to kevmoo's question about whether servers send incremental JSON, or check the Google API behavior, then decide whether to pursue the SSE error-frame fix now.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.45
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm the assignee, so this is an assigned issue I should either fix or unassign, which the scale puts at 0.5–0.65. However, it is 22 months old with no activity since triage, the author is not a collaborator, and I am not responsible for the dart:io/VM area, so it sits at the lower end. It is a real header-parsing conformance bug with possible proxy interoperability impact, which keeps it above zero.
- **Next action:** Decide whether to fix the dart:io header-name validation (check the tchar rule in the VM HTTP parser) or unassign myself, since I'm the assignee of this long-dormant bug.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.35
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a design question I asked a close collaborator in my own repository, and it has gone unanswered for about two weeks. The next step belongs to kevmoo, so it sits in the 0.35-0.5 range for questions I'm waiting on, at the low end because the thread has gone quiet. A gentle nudge may be worthwhile later, but there is no work for me to do until a decision is made.
- **Next action:** Waiting on kevmoo to answer my 16-day-old question on whether to switch Compute to the discovery spec or add convenience extensions to the service operations.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I'm only informally CC'd by parlough and kevmoo, and the work is blocked because the original owner left and the CL was abandoned. The bug is serious (it crashes production servers) and kevmoo, a close collaborator, is hitting it, so it sits in the CC range rather than near zero. It is not in a repository I own, though, and there's no pending action from me, so it stays mid-low.
- **Next action:** Nothing needed now; this is a 9-year-old unassigned SDK bug where I'm only CC'd, and the next step (someone taking over the abandoned CL) belongs to the SDK team.

### 12. dart-lang/native#3752 → predicted 7, priority 0.60
- **Ground truth:** 
- **Model:** This is my own issue filed six days ago in the objective_c package that I own, and I'm assigned to it, so it is planned work I should carry through. The fix is already in open PR #3763, which I authored and which was updated two days ago, so the remaining step is mine to drive to completion rather than waiting on anyone. Since the issue is not security-related and has no new external activity, it sits in the 0.5–0.65 band for my own planned work, but the linked PR covers it, which pushes it toward the lower end of that range.
- **Next action:** Finish and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** This is my repo and a real release-blocking follow-up, but the checklist is explicitly gated on a google_cloud_rpc version bump that hasn't happened yet, so there is no concrete step for me today. My last comment (17 days ago) left an open design question about librarian automation that I still need to resolve, which is light planned work. The item is in a repo I own with a collaborator author, so it sits above dormant backlog but well below anything I can finish now.
- **Next action:** Wait for the generated google_cloud_rpc version bump (and the librarian automation decision I was weighing) before editing the storage and pubsub pubspecs.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, a repository I don't own, so the guidance puts it at 0.1–0.25 and it is not a personal request to me. No one has reviewed it and it's fresh, and it's a routine automated revision bump rather than a security item. Since the dart-ecosystem-team is one I belong to, it's shared work I could pick up but isn't mine by default.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since it was requested from dart-ecosystem-team and nobody has reviewed it yet.

### 15. googleapis/google-cloud-dart#381 → predicted 19, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue has an open PR (#382) that fixes it, so the PR is the thing to act on and the issue itself should rank well below it. I'm only a watcher of google-cloud-dart and nobody has asked me anything or mentioned me. The issue is fresh (3 days old) and the bug is real and affects retry behavior, which keeps it above the floor, but there is no direct action on the issue for me beyond what the PR review will cover.
- **Next action:** Review PR #382, which already fixes this issue, and confirm the google.rpc.Code mapping, since the issue itself is covered by the PR.

### 16. dart-lang/http#2034 → predicted 27, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR, and I requested review from goderbauer only 2 days ago, so there is nothing for me to do until roughly a week of silence. It also covers issue dart-lang/http#1932, which I'm assigned, so the issue itself needs no separate work. The PR is blocked on the reviewer, not on me, so it stays near the low end of the scale.
- **Next action:** Wait for goderbauer's review of PR #2034; if there's no response by about 2026-10-30, send a gentle ping.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in my own repository, filed by a close collaborator (kevmoo), with a clear next step that is mine to do. I already engaged it 10 days ago and trimmed scope, so it is my planned work rather than something waiting on anyone. It sits in the 0.5-0.65 band for assigned collaborator issues, and the gateway FormatException bug is a real reliability problem, so it sits near the upper end.
- **Next action:** Implement the remaining scope: fix the FormatException bypass in ServiceException.fromHttpResponse and wire RetryRunner/RequestOptions into ServiceClient._makeRequest.

### 18. dart-lang/http#2031 → predicted 25, priority 0.15
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I was explicitly requested as reviewer and this is a collaborator's PR in a repo I'm responsible for, but it is stacked on #2014, which has no reviews and is waiting on me, so it cannot usefully be merged yet. Its own diff is a trivial version bump and changelog edit. Since the lower PRs need review first, this sits in the stacked-PR low range, and I'll revisit it once #2014 moves.
- **Next action:** Review the release-prep PR #2031 for brianquinlan, but only after the stacked PRs #2010, #2014 and #2009 are reviewed and merged first, since this PR's base is unreviewed work.

### 19. googleapis/google-cloud-dart#345 → predicted 17, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I work in, so it falls in the 0.15–0.35 range for drafts I should finish or abandon. It has been untouched for 45 days, with my own convert-to-draft as the last activity, so it sinks to the bottom of that range. The branch is dirty with 5 unresolved threads, so it's not ready and nothing is waiting on anyone else.
- **Next action:** Nothing needed now; I'd finish the DNS draft (fix the gemini-flagged nullable and documentation issues, resolve threads, rebase the dirty branch) or abandon it.

### 20. dart-lang/core#1007 → predicted 26, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in dart-lang/core, a repository I am not responsible for, so it rates in the low team-review range. The PR is blocked by an unsigned CLA, which the author has not addressed, and the review request is shared with the whole team rather than addressed to me. Nothing is asked of me personally, so the priority stays low.
- **Next action:** Wait for the author to sign the CLA and for a dart-ecosystem-team member to review; nothing for me to do yet.

### 21. dart-lang/tools#2544 → predicted 22, priority 0.20
- **Ground truth:** 
- **Model:** This is a security-motivated PR but it is not my own, and the review was requested via dart-ecosystem-team in dart-lang/tools, a repository I am not responsible for. Lrhn's review is the active thread and the author is driving the work, so the next step is theirs rather than mine. Team review requests in repositories I don't own sit in the 0.1-0.25 range, and the security angle does not lift it into the security range because the item is not mine and someone else is reviewing it.
- **Next action:** Review lrhn's latest review feedback (helper function, tests for tricky cases) and reply or push fixes, then get it re-reviewed since the review requests were to lrhn; as a team-review item I should review it myself only if I'm the one picking it up.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.15
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, a repository I am not responsible for, so it falls in the low team-request range. The PR is also stacked on the unreviewed draft #2563, which blocks review further. The author is a close collaborator, but nothing is asked of me personally and the activity is from two days ago and only bot or author-side.
- **Next action:** Wait for a dart-ecosystem-team member to review this PR; it is stacked on draft PR #2563 and the team review request is not addressed to me personally.

### 23. dart-lang/native#3763 → predicted 28, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR with a review requested from liamappelbe two days ago and no reviewer activity yet, so the next step belongs to the reviewer. It is also blocked (mergeable_state blocked, review required) until review happens. It fixes two of my own issues, which are the main reason it matters, but nothing is actionable from my side until a week of silence passes.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them if there is still no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 16, priority 0.25
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, and the review is already approved by sigurdm. My last comment asked a direct question to sigurdm four days ago, and I'm waiting on his answer, so the real blocker is outside my hands. The PR is behind main and has 2 unresolved threads, and the review request still lists natebosch, who I've already talked to and agreed to skip, so the PR needs cleanup to merge. Under the scale, a PR I'm waiting on a reviewer for sits at 0.05–0.15, but the review was approved and there are open threads and a stale reviewer request I should clean up, so I'm placing it a little higher.
- **Next action:** Wait for sigurdm's answer on whether the non-PubSub parts are fine, and be ready to merge if he confirms and natebosch can be released from review; nothing else is needed from me right now.

### 25. dart-lang/http#579 → predicted 31, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR is blocked by a deliberate plan to land it only in a future breaking release, which I already said in 2024 I lack bandwidth to coordinate. Review is formally requested from me, but the real work can't proceed without that release, so the item sits in the 0.05–0.15 band. The most recent activity is a question from retendo about a workaround, which is directed at the blocked work rather than something I can act on today. The PR is also not fresh, last updated 14 months ago, and it's in a repository I own.
- **Next action:** Nothing to do now: this PR is parked under the next-breaking-release label until a semver-major release is planned, and retendo's 14-month-old question about a workaround doesn't change that.

### 26. dart-lang/http#1932 → predicted 15, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by my open PR #2034, which closes it, so the real work is on the PR rather than the issue. The issue is assigned to me and igordanilovski asked for an update 4 days ago, so a short status reply is a small task that is mine to do. The underlying fix depends on an upstream Chromium/Play Services dependency issue I've already reopened, so it sits in the low range rather than higher.
- **Next action:** Reply to igordanilovski with a status update, pointing to open PR dart-lang/http#2034 and its current state, and close this issue once that PR merges.

### 27. flutter/devtools#8223 → predicted 32, priority 0.05
- **Ground truth:** 
- **Model:** I was only mentioned as an informational cc by bkonyi in a 2024 comment, and the real work (dart:io network profiling and HTTP profiling changes) belongs to the DevTools and Dart runtime teams, not to me. The recent activity is just a label removal by srawlins and a GSOC question directed at bkonyi, neither of which asks me for anything. It is not in a repository I'm responsible for and is a feature request with high cost, so it sits at the bottom of the range.
- **Next action:** Nothing for me to do; this is a feature request in flutter/devtools that I was only cc'd on, and it is blocked on dart:io network profiling work owned by others.

### 28. dart-lang/http#1837 → predicted 30, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** The issue is a feature request for a WinHTTP client, labeled contributions-welcome and P3, and I already replied that the Dart team is unlikely to take it on. Nothing has happened since October 2025, and the author is outside the collaborator group. It is low-priority backlog that waits on a community contributor, so it sits in the low range.
- **Next action:** Nothing to do; this is a contributions-welcome P3 enhancement I already declined to take on, with no new activity in 12 months.

### 29. dart-lang/http#2033 → predicted 36, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR two days ago, mergeable_state is clean, and there are no unresolved threads or new author activity after my review. The author is a close collaborator, but the remaining step (merge) is theirs, so it is effectively done from my side. The change is CI infrastructure, not security, so it sits near the bottom of the scale.
- **Next action:** Nothing for me; I already approved and the PR is clean and waiting on the author to merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is a six-year-old enhancement issue in http2, a sub-package I explicitly noted I am not responsible for, and I am only watching the repo. The last activity is a maintainer-style question from 8 months ago with no reply from me required, and the real root cause points to the SDK socket issue dart-lang/sdk#48210 rather than anything I own. Nothing is directed at me, so it sits at the bottom of the list.
- **Next action:** No action needed from me; this is an http2 issue outside my scope, and the open question is whether it should be closed, which belongs to the package maintainers.

### 31. dart-lang/tools#2715 → predicted 23, priority 0.15
- **Ground truth:** 
- **Model:** This is a kevmoo PR in dart-lang/tools, a repo I'm not listed as responsible for, and the review was requested of davidmorgan personally plus the dart-ecosystem-team, which is a team I belong to, so the team request is shared rather than addressed to me. Since the author is a collaborator and the PR is quite recent (2 days), it's low priority with no action required from me. Only the bot has reviewed it, and the blocked mergeable state is also waiting on review.
- **Next action:** Wait for davidmorgan (or the dart-ecosystem-team) to review PR #2715; nothing for me to do unless the team review request is mine to pick up.

### 32. dart-lang/http#2026 → predicted 34, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is a first-time contributor's PR in dart-lang/http, a repo I only watch, and the explicit note says I am not responsible for http2. The author pinged mosuem, a usual collaborator who owns this code, not me, and review_decision is REVIEW_REQUIRED with no requested reviewers. Nothing is asked of me, so it sits near zero.
- **Next action:** Wait for mosuem (or another http2 owner) to review PR #2026; I am not responsible for http2 and no review has been requested of me.

### 33. dart-lang/native#3653 → predicted 29, priority 0.10
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe and the PR #3664 that closed it was judged ineffective, so the next step is a design decision by the assignee, not mine. My last activity was an experiment comment 37 days ago, and the latest comment from liamappelbe on 34 days ago argues it isn't worth the effort. Nothing is directed at me now, and the dart-lang/native repo is one I work in, so it sits in the low range rather than zero.
- **Next action:** Nothing for me now; the work is parked while liamappelbe decides whether the deeper FFI change is worth doing.

### 34. dart-lang/http#1972 → predicted 33, priority 0.05
- **Ground truth:** 
- **Model:** I labeled this needs-info 8 days ago after asking the reporter which client they use and whether the server sends a Content-Length without a body, and there has been no reply since. The issue is an ordinary non-security bug in package:http, which I am responsible for, but nothing is waiting on me until the reporter answers. A linked PR #1974 already attempts a fix, so the real next step there is review, not this issue.
- **Next action:** Wait for the reporter (Keetz) to answer the client and scenario questions; PR #1974 is open and should be reviewed separately.

### 35. dart-lang/http#1841 → predicted 21, priority 0.20
- **Ground truth:** 
- **Model:** This issue is labeled next-breaking-release, which blocks it until a future major version, and an open PR (#2002) by agam1092005 already covers it. The only recent activity is a contributor offering a non-breaking design, so the next step is not mine. I was previously a commenter in a repo I work in, and I had a thumbs-down on 2026-10-05 with nothing significant directed at me since, so this sits in the low-but-visible range.
- **Next action:** Wait for agam1092005's PR #2002 to be reviewed; the issue is covered by an open PR and blocked on the next-breaking-release label.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.62
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am the assignee on a P2 bug in dart-lang/sdk, a repository I work in, and the issue has a reproducible report from filiph who is asking how to help. The copybara commit 4 days ago referencing this issue suggests a related change landed, so verifying whether it is fixed is also my task. Freshness is moderate since the last human activity was 24 days ago, and the thumbs-down on Aug 1 predates the new comment from filiph on Oct 1, so it counts as new activity directed at the issue.
- **Next action:** Reply to filiph's 24d-old question about helping hunt the bug, and attempt a local reproduction to narrow down the cause of the intermittent recursive delete failure.
