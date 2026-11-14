# Gitilizer eval: v5f-claude-haiku

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5f.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030934

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.492 ± 0.098 |
| spearman | 0.590 ± 0.108 |
| pairwise_acc | 0.746 ± 0.049 |
| ndcg | 0.953 ± 0.014 |
| ndcg@5 | 0.877 ± 0.012 |
| top3_overlap | 0.778 ± 0.192 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 6.408 ± 0.994 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.728 ± 0.126 | 0.981 ± 0.020 | 0.867 ± 0.115 | 1.667 ± 0.641 |
| B | 20 | 0.246 ± 0.122 | 0.867 ± 0.043 | 0.467 ± 0.115 | 5.033 ± 0.493 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 3/3 | dart-lang/sdk#48056 | A | Verify whether the eMudhra CA distrust fix in dart-lang/sdk#64644 covers Android's /system/etc/security/cacerts path, then reply to acn-masatadakurihara with the answer to their revocation/blocklist questions. |
| 2 | 2.0 (2) | +0.0 | 0.82 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo's question on bump.go about whether Bump should append CHANGELOG.md to lib.Keep or whether clean should auto-preserve it, then push a fix and re-request review. |
| 3 | 4.0 (3–5) | +1.0 | 0.71 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (sigurdm's pubsub release polish, which is not yet reviewed by anyone human) in google-cloud-dart; I'm the default reviewer for this repo. |
| 4 | 5.7 (4–8) | +1.7 | 0.67 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 from first-time contributor quaaantumdev, which fixes issue #381 in google_cloud_rpc, a package in a repository I'm responsible for. |
| 5 | 5.0 (3–6) | +0.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's design proposal from 4 days ago (nullable number and string members on ProtoEnum) and reply with approval or changes before any code is written. |
| 6 | 19.7 (10–25) | +13.7 ⚠️ | 0.25 | 0/3 | dart-lang/http#2027 | B | Wait for a decision on the 2.0 breaking change; nothing for me to do until maintainers weigh in or a PR is proposed. |
| 7 | 8.0 (7–9) | +1.0 | 0.60 | 3/3 | dart-lang/http#1981 | B | Work on the CupertinoClient server-trust hook I said I'm implementing, starting with the skeleton API design before the rest of the work. |
| 8 | 11.0 (10–12) | +3.0 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Add detection for mid-stream error objects in _makeStreamingRequest so both SSE data frames and JSON array elements throw ServiceException, and leave the incremental JSON parsing question open until we know whether servers stream it. |
| 9 | 13.0 (11–14) | +4.0 | 0.47 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to take this dart:io header-name validation fix (tchar-only check) or unassign it, since I'm the assignee and it's been untouched for 22 months. |
| 10 | 9.0 (6–14) | -1.0 | 0.55 | 3/3 | googleapis/google-cloud-dart#361 | A | Reply to kevmoo's question on issue #361 with a decision: switch to discovery (matching other languages) versus adding convenience extensions to the protobuf-generated operation services, since he is waiting on that choice. |
| 11 | 17.3 (15–21) | +6.3 | 0.33 | 0/3 | dart-lang/sdk#31275 | A | Nothing is needed from me now; this is a dormant SDK bug where only informational CCs ask for an owner, so the only real step is assigning an owner if I choose to take it on. |
| 12 | 16.7 (15–18) | +4.7 | 0.32 | 3/3 | dart-lang/native#3752 | B | Review and merge the open fix PR #3763 that implements scheduleInRunLoop:forMode: support, then close this issue. |
| 13 | 24.3 (20–31) | +11.3 ⚠️ | 0.15 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump and the librarian automation decision; nothing for me to do right now. |
| 14 | 18.3 (17–19) | +4.3 | 0.23 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since the team review request reaches me as a dart-ecosystem-team member. |
| 15 | 13.0 (11–16) | -2.0 | 0.42 | 3/3 | googleapis/google-cloud-dart#381 | A | Review PR #382 (the linked fix from quaaantumdev), since it closes this issue and nobody has reviewed it yet. |
| 16 | 26.7 (25–28) | +10.7 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; ping them again if there is no response by about 2026-10-30. |
| 17 | 9.3 (9–10) | -7.7 | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Fix the FormatException bug in ServiceException.fromHttpResponse (exceptions.dart:60) so gateway 502/503/504 HTML responses reach RetryRunner, then start wiring RetryRunner and RequestOptions into ServiceClient. |
| 18 | 25.0 (22–30) | +7.0 | 0.11 | 0/3 | dart-lang/http#2031 | A | Wait for the stacked PRs #2010, #2014 and #2009 to be reviewed and merged, then review this release-prep PR. |
| 19 | 18.0 (17–19) | -1.0 | 0.28 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish or abandon this draft DNS PR: fix the five unresolved Gemini review threads and the merge conflict, or close it. |
| 20 | 23.3 (23–24) | +3.3 | 0.12 | 0/3 | dart-lang/core#1007 | B | Nothing for me now; the PR is blocked on the contributor signing the CLA, and it is a team review request in a repo I don't own. |
| 21 | 20.3 (20–21) | -0.7 | 0.23 | 3/3 | dart-lang/tools#2544 | B | Review jonasfj's updated PR (last push and lrhn's feedback were on Aug 26; I'm a team reviewer via dart-ecosystem-team), checking the new hasSimpleFilePath helper and tests for the tricky UNC cases. |
| 22 | 26.7 (22–31) | +4.7 | 0.10 | 0/3 | dart-lang/tools#2710 | B | Nothing for me now; wait for the team review requested via dart-ecosystem-team, since it is stacked on the draft PR #2563 and is not mine to act on. |
| 23 | 27.7 (26–29) | +4.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them if there is still no response by around 2026-10-30. |
| 24 | 25.7 (24–28) | +1.7 | 0.11 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether the non-PubSub parts look good, or for natebosch's review; ping again around 2026-10-28 if still silent. |
| 25 | 31.0 (29–32) | +6.0 | 0.09 | 0/3 | dart-lang/http#579 | B | Nothing to do now: this is blocked until a semver-major release (package:http 2.0) lands the onSendProgress change, so it waits on that plan. |
| 26 | 15.7 (13–18) | -10.3 ⚠️ | 0.35 | 3/3 | dart-lang/http#1932 | B | Review and merge the open fix PR dart-lang/http#2034 (avoid cronet namespace duplication), then reply to igordanilovski with a status update. |
| 27 | 34.7 (34–36) | +7.7 | 0.03 | 0/3 | flutter/devtools#8223 | B | Nothing for me to do; this is a flutter/devtools feature request outside my repositories, with only an old informational CC from bkonyi and no request to me. |
| 28 | 32.7 (32–33) | +4.7 | 0.06 | 0/3 | dart-lang/http#1837 | A | Nothing needed from me; the item is a contributions-welcome enhancement the Dart team has declined to take on, and it is waiting on a community contributor. |
| 29 | 35.3 (35–36) | +6.3 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing for me; PR is approved and clean, waiting on mosuem to merge. |
| 30 | 35.0 (34–36) | +5.0 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action needed from me; it's a stale, old enhancement issue in http2 (a package I'm not responsible for), and the open question about root cause is for the maintainers to answer. |
| 31 | 13.3 (4–21) | -17.7 ⚠️ | 0.40 | 3/3 | dart-lang/tools#2715 | B | Review PR #2715 (kevmoo's string_scanner follow-up) since it was requested from dart-ecosystem-team, which I belong to, and the PR is in a repository I work in. |
| 32 | 16.0 (3–33) | -16.0 ⚠️ | 0.41 | 2/3 | dart-lang/http#2026 | A | Review PR #2026 (or ask a maintainer such as mosuem to), since shoaib-akhtar pinged @mosuem directly and the PR has no reviewers yet. |
| 33 | 28.7 (26–30) | -4.3 | 0.10 | 0/3 | dart-lang/native#3653 | A | Nothing for me to do now; liamappelbe is deciding whether to pursue the bigger VM-level change or just wrap objc_msgSend calls in autorelease pools. |
| 34 | 28.0 (26–31) | -6.0 | 0.11 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter (Keetz) to answer my questions about the client and server behaviour; PR #1974 is open and already covers the fix. |
| 35 | 18.3 (13–29) | -16.7 ⚠️ | 0.32 | 2/3 | dart-lang/http#1841 | B | Review agam1092005's proposed retryDelay callback in PR #2002 (or reply to their offer on the issue) to decide the API approach, since I asked for alternatives and they have proposed one. |
| 36 | 6.7 (5–8) | -29.3 ⚠️ | 0.67 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's 24d-old comment with a concrete repro and a hunting plan, since he is offering to help and I'm the assignee, and check whether commit 2752d56 (referenced 4d ago) fixes it. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/http#2026** (truth #32) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/http#2026** (truth #32) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/tools#2715** (truth #31) in 1/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/http#2026** (truth #32) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue that I created and am assigned, and it has new activity from three days ago: an external user asks whether dart:io on Android honors the eMudhra intermediate CA compromise mitigations. Security items on my own issues rank at the top of the scale even if a fix has probably landed, so confirming the state and answering is my job. Julemand101 points to the closed #64644, which was updated two days ago, so the check is quick and concrete. The item stays open until that is confirmed.
- **Next action:** Verify whether the eMudhra CA distrust fix in dart-lang/sdk#64644 covers Android's /system/etc/security/cacerts path, then reply to acn-masatadakurihara with the answer to their revocation/blocklist questions.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.80
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR with an unanswered question and unresolved review thread from a close collaborator (kevmoo), who has identified a real bug where the next generate would delete the new CHANGELOG.md. The question blocks the PR from merging and blocks the fix for google-cloud-dart#358. Nothing else is needed from anyone before I can respond, so it sits in the 0.8 range, the top of the blocking-someone-now band.
- **Next action:** Answer kevmoo's question on bump.go about whether Bump should append CHANGELOG.md to lib.Keep or whether clean should auto-preserve it, then push a fix and re-request review.

### 3. googleapis/google-cloud-dart#376 → predicted 5, priority 0.70
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in a repository I'm responsible for, from a close collaborator (sigurdm), with REVIEW_REQUIRED and no human reviewer yet, so it is waiting on me as the default reviewer. Its only review is a gemini bot comment, which doesn't count. The bot did flag high-priority concerns about streaming-pull ACK error handling, but those belong to PR #292 and related work, so I should check they're addressed before merging. The PR is only 5 days old, so it's fresh and deserves a place in the upper-middle range rather than the top.
- **Next action:** Review PR #376 (sigurdm's pubsub release polish, which is not yet reviewed by anyone human) in google-cloud-dart; I'm the default reviewer for this repo.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open PR in googleapis/google-cloud-dart, a repository I'm responsible for, and nobody human has reviewed it yet, so as default reviewer the review is mine. It's fresh (3 days old) and fixes a real retry bug that affects ABORTED over REST, which is a meaningful correctness issue. The author is a first-time contributor rather than a close collaborator, so it sits in the 0.65–0.8 review band but below collaborator PRs; the bot review doesn't count as human review.
- **Next action:** Review PR #382 from first-time contributor quaaantumdev, which fixes issue #381 in google_cloud_rpc, a package in a repository I'm responsible for.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** I filed this issue in a repository I own, and a contributor has done the design work I asked for, so they are now waiting on my review. The 4-day-old design comment is fresh and blocks the next step. It is not an 0.8+ item because nothing is broken for anyone right now and it is a p2 bug, not a blocker. It sits in the 0.65-0.8 band near the top of the reply-needed range.
- **Next action:** Review Yusufihsangorgel's design proposal from 4 days ago (nullable number and string members on ProtoEnum) and reply with approval or changes before any code is written.

### 6. dart-lang/http#2027 → predicted 25, priority 0.12
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue filed 9 days ago in a repository I work in, but it's a design discussion about a breaking change to Client.close that is blocked on a future 2.0 release decision rather than an immediate task. Nobody has replied and there is no concrete next step I can take today. Because it is a fresh self-filed item it sits above the stale backlog, but it is not a commitment I can act on now.
- **Next action:** Wait for a decision on the 2.0 breaking change; nothing for me to do until maintainers weigh in or a PR is proposed.

### 7. dart-lang/http#1981 → predicted 9, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and commented 5h ago that I've started it, so it is my own committed planned work in a repository I maintain, which places it in the 0.5–0.65 band. The issue has no open PR and nothing is waiting on anyone else, so the next step is mine. It is a non-security feature request, so it sits at the lower-middle of that band rather than higher.
- **Next action:** Work on the CupertinoClient server-trust hook I said I'm implementing, starting with the skeleton API design before the rest of the work.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.50
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is in a repository I'm responsible for and was filed by a close collaborator, and the error-frame fix has a clear next step that I can take without waiting on anyone. It is not security-related, so it stays in the planned-work band rather than the top. Kevmoo has said the incremental JSON part is not urgent and I've already asked my question, which was answered, so nothing is blocked on anyone else. Activity is 17 days old, so it sits at the lower-middle of the range.
- **Next action:** Add detection for mid-stream error objects in _makeStreamingRequest so both SSE data frames and JSON array elements throw ServiceException, and leave the incremental JSON parsing question open until we know whether servers stream it.

### 9. dart-lang/sdk#59846 → predicted 14, priority 0.40
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm the assignee, so the issue is technically mine to fix or unassign, but nothing has happened in about 22 months and it sits in the SDK repo where I'm only a commenter, not a responsible owner. It is a real RFC-conformance bug with interoperability and possible proxy-smuggling implications, which keeps it above the backlog floor. Since it has no fresh activity and no one is waiting on me, it belongs in the lower-middle range.
- **Next action:** Decide whether to take this dart:io header-name validation fix (tchar-only check) or unassign it, since I'm the assignee and it's been untouched for 22 months.

### 10. googleapis/google-cloud-dart#361 → predicted 7, priority 0.62
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator's issue in a repository I'm responsible for, with a clear next step for me: I asked a design question and kevmoo's last reply (the one I'm answering) is still unanswered on the decision. However, I already replied 16 days ago and the thread is more of an open design discussion than a blocker, and the work itself is planned rather than urgent. That places it in the my-own-planned-work band, sitting around the middle-upper range given the collaborator involvement.
- **Next action:** Reply to kevmoo's question on issue #361 with a decision: switch to discovery (matching other languages) versus adding convenience extensions to the protobuf-generated operation services, since he is waiting on that choice.

### 11. dart-lang/sdk#31275 → predicted 21, priority 0.20
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I'm only informally CC'd by parlough and kevmoo, both asking for an owner rather than a specific action from me. The dart:io HttpClient bug is old, has no open fix, and sits in an SDK repo where I'm just a commenter. It is a real crash bug in widely used code, so it stays above zero, but it is untouched for about 20 months and has no pending question for me.
- **Next action:** Nothing is needed from me now; this is a dormant SDK bug where only informational CCs ask for an owner, so the only real step is assigning an owner if I choose to take it on.

### 12. dart-lang/native#3752 → predicted 17, priority 0.30
- **Ground truth:** 
- **Model:** I authored this issue six days ago and assigned it to myself, and PR #3763 (updated 2d ago, my own) already covers it, so per the duplicate rule the issue ranks well below its PR. The fix PR is my own work, so the real next step is finishing that PR rather than acting on this issue directly. Nothing new has come from others on the issue itself, so it sits in the 0.15-0.35 band for issues covered by a PR.
- **Next action:** Review and merge the open fix PR #3763 that implements scheduleInRunLoop:forMode: support, then close this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 31, priority 0.10
- **Ground truth:** 
- **Model:** This is a checklist issue for publishing google_cloud_storage 0.6.5 and google_cloud_pubsub, and its next steps depend on a version bump that hasn't happened yet. My last action was a comment 17 days ago, which was an open question about approach rather than a commitment to finish something. Nothing new has been directed at me since, and the blocking work is a release that isn't ready. It is in a repository I'm responsible for, so it stays above zero, but it sits in the low range.
- **Next action:** Wait for the generated google_cloud_rpc version bump and the librarian automation decision; nothing for me to do right now.

### 14. dart-lang/tools#2719 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This is a bot-authored PR in dart-lang/tools, a repository I don't own, and the review was requested only of dart-ecosystem-team, which makes it a shared team review request. Per the rules that puts it in the 0.1–0.25 band, and nobody else is named or already reviewing. It is a routine dependency bump with no human activity, so it is low urgency but not zero.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since the team review request reaches me as a dart-ecosystem-team member.

### 15. googleapis/google-cloud-dart#381 → predicted 11, priority 0.50
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** I watch this repo but am not directly involved, and the issue itself has no owner or new activity beyond the opener's filing three days ago. The real work is the linked PR #382, which is an unreviewed fix in google_cloud_rpc, a package in a repo I am responsible for, so I am the default reviewer. The issue is covered by that PR, so it sits in the lower-middle range, and the PR review is a reasonable next step with moderate urgency since the bug affects retry correctness for REST clients.
- **Next action:** Review PR #382 (the linked fix from quaaantumdev), since it closes this issue and nobody has reviewed it yet.

### 16. dart-lang/http#2034 → predicted 28, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR and I requested a review from goderbauer only 2 days ago, so nothing is due from me until roughly a week passes. The review request is personal, not via a team, and the PR is not blocked by a label or stacking. It is linked to issue #1932, which I am assigned, so the issue should be closed when this merges, but that is covered by the PR rather than a separate action now.
- **Next action:** Wait for goderbauer to review PR #2034; ping them again if there is no response by about 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 10, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I'm responsible for, filed by a close collaborator (kevmoo), with a clear next step. Its blockers (PRs #352 and #353) are merged, so the work is unblocked. The bug fix is small and concrete, but the item has been quiet since my own comment 10 days ago, so it stays in the planned-work range rather than rising above it. I also removed the AIP-4222/AIP-155 scope, which now sits in issue #80.
- **Next action:** Fix the FormatException bug in ServiceException.fromHttpResponse (exceptions.dart:60) so gateway 502/503/504 HTML responses reach RetryRunner, then start wiring RetryRunner and RequestOptions into ServiceClient.

### 18. dart-lang/http#2031 → predicted 30, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is stacked on three open PRs, and #2014 has no review yet, so the lower PRs need attention first. I am a requested reviewer, but a stacked PR is blocked until its base chain is reviewed. The author is a close collaborator and the PR is fresh, so it sits above dormant items but well below anything I can act on now.
- **Next action:** Wait for the stacked PRs #2010, #2014 and #2009 to be reviewed and merged, then review this release-prep PR.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft, so it falls in the 0.15-0.35 range for drafts I should finish or abandon. It has been dormant for 45 days with no human activity since I converted it to draft, and it is dirty with 5 unresolved threads. Nothing is waiting on anyone else, so the only action is my own decision, which keeps it low but above the bottom of the scale.
- **Next action:** Decide whether to finish or abandon this draft DNS PR: fix the five unresolved Gemini review threads and the merge conflict, or close it.

### 20. dart-lang/core#1007 → predicted 23, priority 0.12
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** The review request went to dart-ecosystem-team, which I belong to, but dart-lang/core is not a repository I'm responsible for, so this is a low-priority team request. The CLA check failed and mergeable_state is blocked, so no review can proceed until the first-time contributor signs. The PR is the fix for issue #537, so it is worth keeping visible, but there is no action I can take yet.
- **Next action:** Nothing for me now; the PR is blocked on the contributor signing the CLA, and it is a team review request in a repo I don't own.

### 21. dart-lang/tools#2544 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** This is a security-related PR, but it is in dart-lang/tools, a repository I am not responsible for, and I was only requested via a team I belong to, which the rules place at 0.1-0.25. lrhn is already actively reviewing and has left detailed feedback, so my review is not blocking the work. Since the next step is a team-level review rather than something personally assigned to me, I rate it at the low end of the team review range, though the security nature keeps it from being near zero.
- **Next action:** Review jonasfj's updated PR (last push and lrhn's feedback were on Aug 26; I'm a team reviewer via dart-ecosystem-team), checking the new hasSimpleFilePath helper and tests for the tricky UNC cases.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.15
- **Ground truth:** 
- **Model:** This is a team review request to dart-ecosystem-team in dart-lang/tools, a repository I am not responsible for, so it sits in the 0.1–0.25 band. The PR is also stacked on draft #2563, which is itself unreviewed, so it is blocked on lower PRs. The author mosuem is a close collaborator and the PR is only two days old, so it is fresh, but no one has asked me personally to act.
- **Next action:** Nothing for me now; wait for the team review requested via dart-ecosystem-team, since it is stacked on the draft PR #2563 and is not mine to act on.

### 23. dart-lang/native#3763 → predicted 29, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested review from liamappelbe only 2 days ago, so nothing is due from me yet. The PR is in dart-lang/native, a repository I work in, and it fixes two of my own open issues, so it is important, but the next step belongs to the reviewer. Per the rules for PRs awaiting a recently requested reviewer, it scores around 0.1 until roughly a week has passed.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them if there is still no response by around 2026-10-30.

### 24. googleapis/google-cloud-dart#373 → predicted 24, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, approved by sigurdm, with natebosch as requested reviewer who has not reviewed yet. I asked sigurdm a direct question only 4 days ago, so nothing is due from me until about a week passes. The PR is also behind main and has 2 unresolved threads, but those are minor and don't block the next step, which is waiting on a reply.
- **Next action:** Wait for sigurdm to answer whether the non-PubSub parts look good, or for natebosch's review; ping again around 2026-10-28 if still silent.

### 25. dart-lang/http#579 → predicted 32, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR carries the next-breaking-release label and my last substantive comment says I lack bandwidth to coordinate a major version, so the next step is not mine today. retendo asked a workaround question 14 months ago, but that does not unblock the work, which the label and plan hold back. It is a first-time contributor's PR in a repo I'm responsible for, but it is stale and blocked, so it sits in the low backlog range.
- **Next action:** Nothing to do now: this is blocked until a semver-major release (package:http 2.0) lands the onSendProgress change, so it waits on that plan.

### 26. dart-lang/http#1932 → predicted 16, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by open PR #2034, which I authored, so the real work is that PR and the issue should rank below it. Someone asked for an update 4 days ago, which is a light nudge that I should answer. The bug is not security-related and affects a niche build option, though it also hits default builds per other commenters. The PR is mine and fresh, so I should move it forward and give a status reply.
- **Next action:** Review and merge the open fix PR dart-lang/http#2034 (avoid cronet namespace duplication), then reply to igordanilovski with a status update.

### 27. flutter/devtools#8223 → predicted 36, priority 0.02
- **Ground truth:** 
- **Model:** I'm only mentioned as an informational CC on a 2-year-old enhancement request in flutter/devtools, a repository I'm not responsible for. The work is high cost and blocked on dart:io network profiling, and the latest activity is srawlins removing a cost label, which doesn't involve me. Nothing is directed at me, so it belongs at the bottom of the scale.
- **Next action:** Nothing for me to do; this is a flutter/devtools feature request outside my repositories, with only an old informational CC from bkonyi and no request to me.

### 28. dart-lang/http#1837 → predicted 33, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a 12-month-old P3 enhancement request that I already responded to and labeled, with no activity since. The issue is marked contributions-welcome and nobody is assigned, so the next step belongs to an outside contributor. I'm only a commenter in dart-lang/http, which is a repo I watch rather than own, and the related flutter issue is owned by another team. Freshness is nil, so it sits at the bottom of the backlog range.
- **Next action:** Nothing needed from me; the item is a contributions-welcome enhancement the Dart team has declined to take on, and it is waiting on a community contributor.

### 29. dart-lang/http#2033 → predicted 35, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already approved this PR 2d ago and nothing has happened since: no new commits, no replies, and mergeable state is clean. The remaining step (merge) belongs to the author, a close collaborator. Approved and quiet items score at or near 0.
- **Next action:** Nothing for me; PR is approved and clean, waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 34, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is in http2, which my note says I'm not responsible for, and I'm only a watcher with no mentions or assignments. The last human comment (lubritto, 8 months ago) asks whether the root cause is in http2 and whether to close, which is a maintainer triage question rather than something directed at me. Nothing has happened in months, the author is not a collaborator, and the underlying work sits in the Dart socket layer (sdk#48210) rather than with me.
- **Next action:** No action needed from me; it's a stale, old enhancement issue in http2 (a package I'm not responsible for), and the open question about root cause is for the maintainers to answer.

### 31. dart-lang/tools#2715 → predicted 15, priority 0.30
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, a repository I'm not responsible for, so under the rules it sits in the 0.1–0.25 band. The author is a close collaborator and kevmoo pushed a new commit two days ago, which keeps it from sinking further. Since davidmorgan was also requested personally, the team request is not the only reviewer, so I'm placing it at the top of that band rather than lower.
- **Next action:** Review PR #2715 (kevmoo's string_scanner follow-up) since it was requested from dart-ecosystem-team, which I belong to, and the PR is in a repository I work in.

### 32. dart-lang/http#2026 → predicted 3, priority 0.70
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is a fix for a real crash (assertion failure in Connection._terminate) on an issue I'm not directly on, in a package I'm not responsible for, and the author is a first-time contributor who now has a signed CLA. The author explicitly asked a maintainer to look, and the PR currently has REVIEW_REQUIRED with no reviewers, so it is unreviewed and waiting on someone. Since I only watch the repo and I'm not responsible for http2, I'd place it in the lower-middle range rather than as my own action.
- **Next action:** Review PR #2026 (or ask a maintainer such as mosuem to), since shoaib-akhtar pinged @mosuem directly and the PR has no reviewers yet.

### 33. dart-lang/native#3653 → predicted 26, priority 0.12
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who last commented 34 days ago and is leaning toward a different approach, so the next step is theirs rather than mine. The PR that was supposed to address it was merged but reverted in effect, and my earlier experiment already covered the key findings. I am only a commenter here, so there is no concrete action for me beyond maybe weighing in on the design choice later.
- **Next action:** Nothing for me to do now; liamappelbe is deciding whether to pursue the bigger VM-level change or just wrap objc_msgSend calls in autorelease pools.

### 34. dart-lang/http#1972 → predicted 27, priority 0.12
- **Ground truth:** 
- **Model:** I asked the reporter for information 8 days ago and labeled it needs-info, so the next step belongs to them. PR #1974 already addresses this issue, so the issue itself sits well below the PR. The reporter is a non-collaborator and the work is blocked on their answer, so this stays in the low range.
- **Next action:** Wait for the reporter (Keetz) to answer my questions about the client and server behaviour; PR #1974 is open and already covers the fix.

### 35. dart-lang/http#1841 → predicted 13, priority 0.42
- **Ground truth:** 
- **Model:** The issue is labeled next-breaking-release and I had asked for alternatives, and a contributor (agam1092005) has now proposed a non-breaking design that is already implemented in open PR #2002, so the real work is on that PR rather than the issue. My thumbs-down was on 2026-10-05, and the only substantive new activity since then is agam1092005's comment and commit references, which are directed at me by name, so it is partly re-engaging. I'm mentioned and the repo is one I watch but I don't own http2, so this sits in the lower-middle of the range where a contributor is waiting on my decision.
- **Next action:** Review agam1092005's proposed retryDelay callback in PR #2002 (or reply to their offer on the issue) to decide the API approach, since I asked for alternatives and they have proposed one.

### 36. dart-lang/sdk#38148 → predicted 8, priority 0.62
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm the assignee on a P2 non-security bug in the SDK where I'm only a commenter-level stakeholder, and filiph asked a direct question that I haven't answered, which is within my role as assignee. A commit referencing this issue 4 days ago may have resolved it, so verifying is real work for me. The thumbs-down from August is superseded by filiph's October comment, which is a new reproducible report directed at the assignee. Priority sits in the 0.5-0.65 band for assigned issues, not higher, since there is no security or blocking deadline.
- **Next action:** Reply to filiph's 24d-old comment with a concrete repro and a hunting plan, since he is offering to help and I'm the assignee, and check whether commit 2752d56 (referenced 4d ago) fixes it.
