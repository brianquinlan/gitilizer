# Gitilizer eval: v5b-claude-haiku

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5b.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030115

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.608 ± 0.023 |
| spearman | 0.752 ± 0.017 |
| pairwise_acc | 0.804 ± 0.012 |
| ndcg | 0.978 ± 0.002 |
| ndcg@5 | 0.999 ± 0.001 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.148 ± 0.486 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.794 ± 0.025 | 0.996 ± 0.001 | 0.933 ± 0.115 | 1.292 ± 0.144 |
| B | 20 | 0.421 ± 0.048 | 0.928 ± 0.024 | 0.600 ± 0.000 | 4.200 ± 0.529 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Verify that the closed fix in #64644 covers Android's /system/etc/security/cacerts path, then reply to acn-masatadakurihara's revocation question and decide whether this issue can close. |
| 2 | 2.0 (2) | +0.0 | 0.87 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo's inline question on bump.go about whether Bump should add CHANGELOG.md to lib.Keep or clean should auto-preserve it, then push a fix and re-request review. |
| 3 | 4.0 (4) | +1.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (sigurdm's pubsub release polish), starting with the gemini-flagged StateError and hang risks in the streaming pull code it builds on. |
| 4 | 3.7 (3–5) | -0.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 (fix for JSON error status.code mapping) in google-cloud-dart, since I'm the default reviewer for this repo and no human has reviewed it yet. |
| 5 | 4.3 (3–5) | -0.7 | 0.71 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string members) to approve or adjust it so he can start the PR. |
| 6 | 10.3 (10–11) | +4.3 | 0.55 | 1/3 | dart-lang/http#2027 | B | Nothing needed now; wait for maintainer discussion on whether to make Client.close async in a future 2.0 release. |
| 7 | 7.0 (6–8) | +0.0 | 0.60 | 3/3 | dart-lang/http#1981 | B | Proceed with the implementation I just said I started on: design the serverTrustEvaluator hook in CupertinoClient and prototype the URLSessionDelegate challenge handling. |
| 8 | 10.3 (9–11) | +2.3 | 0.57 | 3/3 | googleapis/google-cloud-dart#360 | A | Answer kevmoo's open question by checking whether Google servers actually send incremental JSON arrays, then decide whether to pursue the SSE error-frame fix or the JSON splitter. |
| 9 | 12.3 (12–13) | +3.3 | 0.48 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io HTTP header-name validation (restrict to RFC 9110 tchar) or reassign, since I'm the assignee on a stale, triaged bug. |
| 10 | 10.3 (6–13) | +0.3 | 0.48 | 1/3 | googleapis/google-cloud-dart#361 | A | Reply to kevmoo's question on whether to switch compute_v1 to discovery or add convenience extensions to the protobuf version, since he is waiting on that decision before the work can proceed. |
| 11 | 21.7 (18–24) | +10.7 ⚠️ | 0.19 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed from me now; this is a 9-year-old bug in dart-lang/sdk with no open PR and no direct request to me, so only consider taking ownership of the library if the team asks. |
| 12 | 10.7 (7–17) | -1.3 | 0.48 | 3/3 | dart-lang/native#3752 | B | Finish and merge the linked fix PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue. |
| 13 | 19.3 (17–21) | +6.3 | 0.23 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump and librarian automation decision, then add the version constraint to the storage and pubsub pubspecs. |
| 14 | 19.3 (19–20) | +5.3 | 0.20 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since it was requested from dart-ecosystem-team and has no reviewer yet. |
| 15 | 16.0 (14–19) | +1.0 | 0.28 | 3/3 | googleapis/google-cloud-dart#381 | A | Review and merge the linked fix PR #382 (or leave a review on it), since the issue itself is covered by that PR. |
| 16 | 26.7 (26–28) | +10.7 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer's review of PR #2034; ping them again if there is no response by about 2026-10-30. |
| 17 | 9.0 (8–10) | -8.0 | 0.59 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the FormatException fallback in ServiceException.fromHttpResponse and wire RetryRunner into ServiceClient._makeRequest, or unassign myself if I won't get to it. |
| 18 | 17.3 (13–25) | -0.7 | 0.24 | 3/3 | dart-lang/http#2031 | A | Review PR #2031 (release prep for http2 3.2.0), keeping in mind it is stacked on unmerged PRs #2010, #2014 and #2009, so the lower PRs need review first. |
| 19 | 17.3 (16–18) | -1.7 | 0.27 | 1/3 | googleapis/google-cloud-dart#345 | A | Nothing needed now; when ready, fix the Gemini-flagged null-safety and example issues and then mark the draft ready for review, or abandon it if no longer wanted. |
| 20 | 25.7 (23–28) | +5.7 | 0.11 | 0/3 | dart-lang/core#1007 | B | Waiting on the author to sign the Google CLA; the dart-ecosystem-team review request is not personal to me and the repo is not one I own. |
| 21 | 20.0 (17–22) | -1.0 | 0.23 | 3/3 | dart-lang/tools#2544 | B | Review the latest changes from jonasfj (lrhn's requests since Aug 26 have been addressed or are pending) and check whether lrhn's last review is approved; as a team-requested reviewer in a repo I'm not responsible for, I should consider only if I am acting as reviewer for dart-ecosystem-team. |
| 22 | 23.7 (22–25) | +1.7 | 0.14 | 0/3 | dart-lang/tools#2710 | B | Wait for a reviewer from dart-ecosystem-team to pick up this PR; it is stacked on draft #2563, so nothing to do until the lower PR is reviewed. |
| 23 | 27.7 (27–29) | +4.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them again if there is no response after about a week (around 2026-10-30). |
| 24 | 16.3 (14–20) | -7.7 | 0.25 | 3/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm's answer on whether the non-Pub/Sub parts are fine; meanwhile resolve the 2 open review threads and merge-update the branch (mergeable_state is behind). |
| 25 | 30.0 (30) | +5.0 | 0.10 | 0/3 | dart-lang/http#579 | B | Wait for a planned semver-major release of package:http to coordinate landing this breaking change; no action needed from me now. |
| 26 | 15.7 (15–16) | -10.3 ⚠️ | 0.28 | 3/3 | dart-lang/http#1932 | B | Reply to igordanilovski with a status update pointing to open PR #2034, which is my fix for the namespace duplication, and push that PR toward merge. |
| 27 | 33.0 (32–34) | +6.0 | 0.04 | 0/3 | flutter/devtools#8223 | B | Nothing for me to do; this is a feature request in flutter/devtools owned by the DevTools team, and I was only CC'd by bkonyi on a 2024 comment about the work involved. |
| 28 | 33.7 (33–34) | +5.7 | 0.05 | 0/3 | dart-lang/http#1837 | A | No action needed; the Dart team has declined and it is open for community contributions. |
| 29 | 35.7 (35–36) | +6.7 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing for me; I already approved and the PR is clean and waiting on mosuem to merge. |
| 30 | 35.3 (35–36) | +5.3 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action needed from me; this is an old enhancement issue in http2, a package I am not responsible for, and it is waiting on investigation by the owners. |
| 31 | 24.0 (23–25) | -7.0 | 0.12 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan (requested directly) or dart-ecosystem-team to review PR #2715; nothing for me to do unless a team member asks. |
| 32 | 29.7 (27–31) | -2.3 | 0.09 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem (or another http2 reviewer) to review PR #2026; nothing is required from me yet. |
| 33 | 29.7 (29–31) | -3.3 | 0.09 | 0/3 | dart-lang/native#3653 | A | Nothing for me now; the work is parked while liamappelbe decides whether the deeper FFI change is worth doing. |
| 34 | 32.3 (32–33) | -1.7 | 0.06 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter (Keetz) to answer my questions about the client and server behavior; the linked PR #1974 is open and also labeled needs-info. |
| 35 | 23.7 (21–28) | -11.3 ⚠️ | 0.17 | 0/3 | dart-lang/http#1841 | B | Wait for agam1092005's PR #2002 to be reviewed; the issue is covered by an open PR and blocked by the next-breaking-release label. |
| 36 | 7.3 (6–9) | -28.7 ⚠️ | 0.65 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph with a debugging approach or pick up the reproduction myself, since filiph asked how to help hunt the bug and I am the assignee. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue I authored and am assigned, and it got new activity 3 days ago: a question about whether Dart honors the eMudhra intermediate CA revocations. The related #64644 that distrusts the eight compromised intermediates is closed as completed, and julemand101 pointed to it, so the fix probably landed. Security issues in my area still need confirmation and an answer, so the item stays at the top of the scale. The underlying disabled-certificate bug is still open, so I should not close this issue without checking that.
- **Next action:** Verify that the closed fix in #64644 covers Android's /system/etc/security/cacerts path, then reply to acn-masatadakurihara's revocation question and decide whether this issue can close.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.90
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR with an unanswered question and an unresolved review thread from a close collaborator (kevmoo) who identified a real bug where the next generate deletes the newly created CHANGELOG.md. Since I'm blocking the fix and a collaborator is waiting on my reply, it belongs at the top of the 0.8–0.9 range. The PR also fixes a real release-tagging bug (google-cloud-dart#358), which adds urgency.
- **Next action:** Answer kevmoo's inline question on bump.go about whether Bump should add CHANGELOG.md to lib.Keep or clean should auto-preserve it, then push a fix and re-request review.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in a repository I'm responsible for, authored by a close collaborator, so it is my review to do and nobody else has reviewed it (the bot doesn't count). The PR is only 5 days old and sits on a stack of recent streaming-pull work whose review feedback flags possible hangs. The PR is behind main, so it may need a merge first, but it isn't blocked on anyone else.
- **Next action:** Review PR #376 (sigurdm's pubsub release polish), starting with the gemini-flagged StateError and hang risks in the streaming pull code it builds on.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a non-security PR in a repository I'm responsible for, from a first-time contributor, with no human review yet, so it falls on me as default reviewer. It changes retry behavior for REST ABORTED errors and is linked to issue #381, which makes it moderately important. It is 3 days old and the bot review contained no actionable feedback, so it sits in the lower-middle of the review range rather than at the top.
- **Next action:** Review PR #382 (fix for JSON error status.code mapping) in google-cloud-dart, since I'm the default reviewer for this repo and no human has reviewed it yet.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug issue in a repository I maintain, and a contributor is waiting on my reply to a concrete design proposal posted 4 days ago. I asked for a design before code, so the next step is mine and not blocked by anyone else. It is a p2 bug rather than a security issue, so it sits in the contributor-waiting-on-me band, not the top band.
- **Next action:** Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string members) to approve or adjust it so he can start the PR.

### 6. dart-lang/http#2027 → predicted 11, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own recently filed issue in dart-lang/http, a repo I'm responsible for, so it counts as fresh planned work (within two weeks) rather than a dormant thread. However, it is a design discussion with no concrete next step for me yet, and it depends on a possible breaking 2.0 release, so it is not something I can act on today. Placing it in the planned-work range but leaning lower because nothing is blocked on me and no one else has responded.
- **Next action:** Nothing needed now; wait for maintainer discussion on whether to make Client.close async in a future 2.0 release.

### 7. dart-lang/http#1981 → predicted 8, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is an issue I assigned to myself and said I'm working on, in a repository I maintain, so it counts as my own planned work in the 0.5–0.65 range. The activity is fresh (I committed to it 5 hours ago), and the author is waiting on a skeleton PR from me. It is a feature request rather than a bug, and nobody else is blocking it, so it sits in the middle of the range rather than near the top.
- **Next action:** Proceed with the implementation I just said I started on: design the serverTrustEvaluator hook in CupertinoClient and prototype the URLSessionDelegate challenge handling.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.60
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a non-security issue in a repository I am responsible for, filed by a close collaborator (kevmoo) with a concrete proposed fix. My last comment asked a question and kevmoo answered it, so the ball is back in my court to investigate. kevmoo explicitly says it is not urgent and I have no new deadline, so it sits in the planned-work range rather than higher. The mid-stream SSE error-swallowing part is a real correctness bug and deserves attention, which keeps it above the low end.
- **Next action:** Answer kevmoo's open question by checking whether Google servers actually send incremental JSON arrays, then decide whether to pursue the SSE error-frame fix or the JSON splitter.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am the assignee and the issue is triaged, so it is my planned work to either fix or unassign, which places it in the 0.5-0.65 band. It is a real interoperability and proxy-smuggling-adjacent bug in dart:io, but it has been dormant for about 22 months with no activity from me, so it sits at the lower end of that band. It is not in a repository I'm explicitly responsible for, and I am not CC'd or asked anything new.
- **Next action:** Decide whether to fix the dart:io HTTP header-name validation (restrict to RFC 9110 tchar) or reassign, since I'm the assignee on a stale, triaged bug.

### 10. googleapis/google-cloud-dart#361 → predicted 6, priority 0.70
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in a repository I am responsible for, filed by a close collaborator (kevmoo), and kevmoo is directly asking for my view. My last comment (16d ago) posed a question back to him, and he has not yet answered it, so the decision is effectively waiting on me to weigh in with a recommendation. It is not urgent or security-related, and the actual implementation is blocked on that design choice, so it sits in the mid-high range rather than the top.
- **Next action:** Reply to kevmoo's question on whether to switch compute_v1 to discovery or add convenience extensions to the protobuf version, since he is waiting on that decision before the work can proceed.

### 11. dart-lang/sdk#31275 → predicted 23, priority 0.15
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I am only CC'd (informational) by parlough and kevmoo, and the item is in dart-lang/sdk, a repository I'm not responsible for. The bug is real and crashes production servers, so it is more than trivial, but the fix is blocked on someone taking ownership and no one has asked me to do the work. The last human activity was a label change 20 months ago, so it is dormant.
- **Next action:** Nothing needed from me now; this is a 9-year-old bug in dart-lang/sdk with no open PR and no direct request to me, so only consider taking ownership of the library if the team asks.

### 12. dart-lang/native#3752 → predicted 17, priority 0.25
- **Ground truth:** 
- **Model:** This is my own issue, filed 6 days ago in a repository I own, and I'm assigned to it. However, a PR (#3763) that closes it is already open and was updated 2 days ago, so per the duplicate rule the PR is the item to act on and this issue sits roughly 0.2–0.3 below it. There is no new external activity, so freshness does not raise it further.
- **Next action:** Finish and merge the linked fix PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** This is my own repository and a collaborator-authored issue with a checklist, but the next steps are blocked on a new google_cloud_rpc release that hasn't been published yet. My last comment (17 days ago) is me deciding on a general fix, and nothing has happened since. Since the work is blocked and the issue is 17 days quiet, it sits in the low range but stays visible because it concerns a real release-blocking dependency gap.
- **Next action:** Wait for the generated google_cloud_rpc version bump and librarian automation decision, then add the version constraint to the storage and pubsub pubspecs.

### 14. dart-lang/tools#2719 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This is a team review request in a repository I don't own, so it falls in the 0.1–0.25 band. It was opened 19 hours ago with no human activity and no named reviewer, so it is not urgent. It is a routine automated dependency bump, so it is low-stakes beyond the normal team review.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since it was requested from dart-ecosystem-team and has no reviewer yet.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue is covered by open PR #382 from the reporter, so per the duplicate rule the PR is the thing to act on and the issue ranks well below it. I'm only watching this repo, not assigned, and no one has asked me anything. The bug is real and retry-relevant, but it is a non-security issue with no direct action on me yet, so it sits in the 0.15–0.35 band for items with a covering PR.
- **Next action:** Review and merge the linked fix PR #382 (or leave a review on it), since the issue itself is covered by that PR.

### 16. dart-lang/http#2034 → predicted 26, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR, and I requested a review from goderbauer only 2 days ago, so there is nothing for me to do until about a week has passed. Review is required and no feedback has come in yet. It fixes the linked bug #1932, which is assigned to me, so it is worth tracking, but it sits in the low range while waiting on a reviewer.
- **Next action:** Wait for goderbauer's review of PR #2034; ping them again if there is no response by about 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 10, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I own, filed by a close collaborator (kevmoo), and its main blocker, PR #352, is merged, so the next step is mine. The FormatException bug on HTML 502/503/504 responses means retries are silently bypassed, which makes the fix worth doing. It sits in the planned-work range rather than higher because I narrowed its scope myself 10 days ago and nothing new has come in since. The AIP-4222/155 parts have been split off to issue #80, which leaves a narrower but still concrete task.
- **Next action:** Implement the FormatException fallback in ServiceException.fromHttpResponse and wire RetryRunner into ServiceClient._makeRequest, or unassign myself if I won't get to it.

### 18. dart-lang/http#2031 → predicted 13, priority 0.30
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I am a requested reviewer in dart-lang/http, a repo I watch, and mosuem is a close collaborator, so this would normally sit in the 0.65-0.8 review band. However, the PR is stacked on #2014, which has no review and is still waiting on me, and the base was just force-pushed, so reviewing this now is premature. It is a release-prep chore with no urgency, so I'll place it low and revisit once the lower PRs are merged.
- **Next action:** Review PR #2031 (release prep for http2 3.2.0), keeping in mind it is stacked on unmerged PRs #2010, #2014 and #2009, so the lower PRs need review first.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I work in, which the rubric places in the 0.15–0.35 range for drafts I should finish or abandon. It has been dormant for 45 days with the last human action being my own conversion to draft, so it sinks to the bottom of its range. There are five unresolved review threads and a dirty merge state, but no one is waiting on me, so nothing is blocking anyone right now.
- **Next action:** Nothing needed now; when ready, fix the Gemini-flagged null-safety and example issues and then mark the draft ready for review, or abandon it if no longer wanted.

### 20. dart-lang/core#1007 → predicted 28, priority 0.10
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request to dart-ecosystem-team in dart-lang/core, a repository I am not responsible for, so it falls in the 0.1–0.25 band and is not addressed to me personally. The PR is also blocked by the unsigned CLA, which the first-time contributor must resolve before anyone can review it. Nothing from me is needed now, so I place it at the low end of that band.
- **Next action:** Waiting on the author to sign the Google CLA; the dart-ecosystem-team review request is not personal to me and the repo is not one I own.

### 21. dart-lang/tools#2544 → predicted 22, priority 0.20
- **Ground truth:** 
- **Model:** This is a security-related PR, but the review is requested only via the dart-ecosystem-team, which is a shared team review in a repository I am not responsible for, so it falls in the team-review range (0.1-0.25). lrhn has already been reviewing extensively and is the active reviewer, so my involvement is not clearly needed. The PR is security-related, but since security outranks other items only when it is mine or in my repositories, it does not get the top score here.
- **Next action:** Review the latest changes from jonasfj (lrhn's requests since Aug 26 have been addressed or are pending) and check whether lrhn's last review is approved; as a team-requested reviewer in a repo I'm not responsible for, I should consider only if I am acting as reviewer for dart-ecosystem-team.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.12
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, a repository I am not responsible for, and the team is shared rather than addressed to me personally, so it is not mine to act on. The PR is also stacked on draft PR #2563, which must be reviewed first. The author is a close collaborator and the change is sizeable, but it is only two days old and there is no unanswered feedback for me.
- **Next action:** Wait for a reviewer from dart-ecosystem-team to pick up this PR; it is stacked on draft #2563, so nothing to do until the lower PR is reviewed.

### 23. dart-lang/native#3763 → predicted 27, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, and I requested review from liamappelbe only 2 days ago, so nothing is due from me yet. The PR is not in a repository I am only commenting on, and it fixes two open issues I filed, so it matters, but the next step belongs to the reviewer. Review is required and the merge is blocked pending that review, so I should follow up only after roughly a week of silence.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them again if there is no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 15, priority 0.25
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, which is approved by sigurdm, so the main blocker is a question I asked him 4 days ago and a short wait is reasonable. Two unresolved review threads and a branch that is behind main are things I can clean up myself now. The ask to natebosch is a review request to someone I've already pinged, so nothing is on him yet. Since my last comment was only 4 days ago, this sits in the low-medium range rather than the 0.8+ band for unanswered reviewer feedback.
- **Next action:** Wait for sigurdm's answer on whether the non-Pub/Sub parts are fine; meanwhile resolve the 2 open review threads and merge-update the branch (mergeable_state is behind).

### 25. dart-lang/http#579 → predicted 30, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR is a breaking API change that I have explicitly deferred to a future major release, which puts it in the 'blocked by a future breaking release' bucket (0.05-0.15). The only recent comment is a user question from retendo about a workaround, which doesn't unblock the real work. Freshness is poor, with the last human activity 14 months ago and my last activity 2 years ago. The PR is in my repository, but it is not something I can move forward today.
- **Next action:** Wait for a planned semver-major release of package:http to coordinate landing this breaking change; no action needed from me now.

### 26. dart-lang/http#1932 → predicted 16, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is assigned to me, but open PR #2034 (mine, updated 2 days ago) already covers the fix, so the PR is the real work item and the issue sits well below it. Igordanilovski's 4-day-old status request is the only new signal, and a short reply that points to the PR is the useful step. Because the issue is still fully covered by the PR, it stays in the low range rather than the planned-work range.
- **Next action:** Reply to igordanilovski with a status update pointing to open PR #2034, which is my fix for the namespace duplication, and push that PR toward merge.

### 27. flutter/devtools#8223 → predicted 34, priority 0.03
- **Ground truth:** 
- **Model:** I'm not responsible for flutter/devtools, and my only mention is an informational cc from bkonyi two years ago. The most recent activity is a label change by srawlins and a GSOC question directed at bkonyi, neither of which needs me. The item is blocked on high-cost network profiling work in dart:io and the HTTP profiling design, so there is no next step for me.
- **Next action:** Nothing for me to do; this is a feature request in flutter/devtools owned by the DevTools team, and I was only CC'd by bkonyi on a 2024 comment about the work involved.

### 28. dart-lang/http#1837 → predicted 33, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a contributions-welcome enhancement I already triaged as P3 and declined to take on, with no new activity in over a year. Nothing is waiting on me, and the related flutter issue is a separate engine-owned item. It sits in the bottom range for old low-priority backlog.
- **Next action:** No action needed; the Dart team has declined and it is open for community contributions.

### 29. dart-lang/http#2033 → predicted 36, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2 days ago with no author activity since, and mergeable_state is clean. Review is complete from my side, so the remaining step (merge) belongs to the author or a maintainer. This is a CI infrastructure change from a close collaborator, not security-related, so it sits at the bottom of the range.
- **Next action:** Nothing for me; I already approved and the PR is clean and waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is about http2 performance, which the user's notes say they are not responsible for, so it falls outside my scope. The last human question from lubritto (8 months ago) asks whether it should be closed, but nothing directed at me has happened and the real root cause appears to be in the socket layer tracked in sdk#48210. Freshness is poor and the item has no blocking request for me.
- **Next action:** No action needed from me; this is an old enhancement issue in http2, a package I am not responsible for, and it is waiting on investigation by the owners.

### 31. dart-lang/tools#2715 → predicted 24, priority 0.12
- **Ground truth:** 
- **Model:** This is kevmoo's PR in dart-lang/tools, a repository I'm not responsible for, and I'm only reached via a team review request to dart-ecosystem-team, which rates low. davidmorgan is named personally as a reviewer and is the one expected to act, so the next step is theirs. The PR is recent (2 days) with no review feedback yet, so it is not stale, but it has no unanswered items for me.
- **Next action:** Wait for davidmorgan (requested directly) or dart-ecosystem-team to review PR #2715; nothing for me to do unless a team member asks.

### 32. dart-lang/http#2026 → predicted 31, priority 0.08
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is a first-time contributor's PR in dart-lang/http, a repo I only watch, and I am explicitly not responsible for http2. The author asked mosuem, a collaborator who is not a review request on the PR, and the review_decision is REVIEW_REQUIRED with no requested reviewers, so the review is waiting on someone else. The PR does touch an issue I may care about, but I have no personal request or stake in it, so it sits near the bottom of the list.
- **Next action:** Wait for mosuem (or another http2 reviewer) to review PR #2026; nothing is required from me yet.

### 33. dart-lang/native#3653 → predicted 29, priority 0.10
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The original PR was merged but reportedly does nothing, and liamappelbe's last comment says the fix is a much bigger change and may not be worth it, so the issue is effectively blocked on a design decision by someone else. It is in my own repository, but I have no concrete step to take, and the last human activity was 34 days ago with me not being asked anything directly. The issue is closely related to my own sibling issue #3652, which is already closed, so there is no open item here that needs my action.
- **Next action:** Nothing for me now; the work is parked while liamappelbe decides whether the deeper FFI change is worth doing.

### 34. dart-lang/http#1972 → predicted 32, priority 0.05
- **Ground truth:** 
- **Model:** I labeled this needs-info and asked the reporter two specific questions 8 days ago, and there has been no reply, so the next step is theirs. There is an open PR #1974 that addresses this issue, which means the issue itself has nothing left for me, and that PR is itself waiting on information. The reporter is not a collaborator and the issue is not security-related, so it stays near the bottom of the range.
- **Next action:** Wait for the reporter (Keetz) to answer my questions about the client and server behavior; the linked PR #1974 is open and also labeled needs-info.

### 35. dart-lang/http#1841 → predicted 21, priority 0.20
- **Ground truth:** 
- **Model:** An open PR (#2002) by agam1092005 already covers this issue, so the issue itself has nothing left for me to do and should rank well below the PR. The issue is also labeled next-breaking-release, and I am only a commenter in the http repository with a note that I am not responsible for http2. I had marked it not important on 2026-10-05, and the only later activity is a commit reference, so it sits low in the 0.15–0.35 band for issues covered by a PR.
- **Next action:** Wait for agam1092005's PR #2002 to be reviewed; the issue is covered by an open PR and blocked by the next-breaking-release label.

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.66
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am the assignee on this P2 issue in dart-lang/sdk, which is outside the repositories I own, but it is assigned to me and I was thumbed-down at an earlier time that is now superseded by new activity. filiph's 24-day-old comment is a reproduction with a direct offer to help, which is information I need to act on. The copybara commit referencing it four days ago suggests a related change may have landed, so verifying whether the bug is fixed is real work for me.
- **Next action:** Reply to filiph with a debugging approach or pick up the reproduction myself, since filiph asked how to help hunt the bug and I am the assignee.
