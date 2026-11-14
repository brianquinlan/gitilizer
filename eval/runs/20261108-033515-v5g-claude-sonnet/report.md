# Gitilizer eval: v5g-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5g.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033515

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.620 ± 0.027 |
| spearman | 0.761 ± 0.012 |
| pairwise_acc | 0.810 ± 0.014 |
| ndcg | 0.976 ± 0.001 |
| ndcg@5 | 0.934 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.767 ± 0.058 |
| mean_abs_displacement | 4.981 ± 0.251 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.789 ± 0.035 | 0.994 ± 0.003 | 0.933 ± 0.115 | 1.417 ± 0.191 |
| B | 20 | 0.488 ± 0.050 | 0.947 ± 0.007 | 0.600 ± 0.000 | 3.967 ± 0.379 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Check whether the fix from dart-lang/sdk#64644 covers the eMudhra compromise on Android, reply to the questions from acn-masatadakurihara, and close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's inline review comment about CHANGELOG.md being deleted by the next generate, and either add "CHANGELOG.md" to lib.Keep in Bump or make the Dart clean step preserve it, then push the update. |
| 3 | 12.0 (10–14) | +9.0 ⚠️ | 0.42 | 0/3 | googleapis/google-cloud-dart#376 | A | Nothing to do now; sigurdm's PR hasn't requested my review and I only watch the repo, so wait until I'm asked or it's ready. |
| 4 | 3.0 (3) | -1.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR from a first-time contributor in google-cloud-dart (it changes Status.code for JSON errors), and ask them to rebase since the branch is behind main. |
| 5 | 4.0 (4) | -1.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's design sketch: confirm or adjust the nullable number/string ProtoEnum approach and tell them to go ahead with a preliminary PR. |
| 6 | 7.7 (7–9) | +1.7 | 0.54 | 3/3 | dart-lang/http#2027 | B | Decide on the Client.close design (tracked outstanding requests vs. async close in a 2.0 release) and write up a concrete plan or draft PR. |
| 7 | 6.3 (6–7) | -0.7 | 0.55 | 3/3 | dart-lang/http#1981 | B | Continue the prototype of the server trust evaluator hook in CupertinoClient, since I said I've started on it and assigned myself. |
| 8 | 8.7 (8–9) | +0.7 | 0.55 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo: decide whether to fix the mid-stream SSE error handling now (a clear bug) and defer or drop the incremental JSON framing until we know servers send it incrementally. |
| 9 | 11.0 (10–12) | +2.0 | 0.51 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header-name validation (reject non-tchar characters per RFC 9110) or unassign myself. |
| 10 | 12.7 (12–13) | +2.7 | 0.40 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my question on discovery vs. convenience extensions for Compute LRO polling. |
| 11 | 13.7 (13–14) | +2.7 | 0.36 | 3/3 | dart-lang/sdk#31275 | A | Decide whether to take over the abandoned CL 144346 (or write a similar fix) for the unsolicited-response crash, or triage it to the right owner. |
| 12 | 18.7 (18–19) | +6.7 | 0.22 | 0/3 | dart-lang/native#3752 | B | Nothing to do on the issue itself; drive PR dart-lang/native#3763, which closes it. |
| 13 | 15.0 (15) | +2.0 | 0.30 | 0/3 | googleapis/google-cloud-dart#366 | B | Nothing to do now; I last commented 17d ago about a general fix via librarian automation, and the work is gated on the google_cloud_rpc version bump and release. |
| 14 | 21.7 (21–22) | +7.7 | 0.13 | 0/3 | dart-lang/tools#2719 | B | Nothing for me personally; another dart-ecosystem-team member can review this automated BoringSSL bump. |
| 15 | 16.7 (16–18) | +1.7 | 0.23 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which already covers this issue, rather than acting on the issue itself. |
| 16 | 23.0 (22–24) | +7.0 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping again if no response after about a week (around 2026-10-30). |
| 17 | 7.3 (6–8) | -9.7 ⚠️ | 0.56 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the ServiceException.fromHttpResponse FormatException fix, then add RetryRunner and RequestOptions support to ServiceClient, or unassign if I won't get to it. |
| 18 | 26.7 (26–27) | +8.7 | 0.09 | 0/3 | dart-lang/http#2031 | A | Wait for the lower stacked PRs (#2014 needs my review; #2010 and #2009 are approved) to land before reviewing this release prep. |
| 19 | 18.0 (17–19) | -1.0 | 0.21 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft DNS PR (fix the bot's 5 review comments, resolve merge conflicts, mark ready) or close it. |
| 20 | 5.0 (5) | -15.0 ⚠️ | 0.63 | 3/3 | dart-lang/core#1007 | B | Review this first-time contributor's PR in dart-lang/core (path package), after checking whether the CLA has been signed. |
| 21 | 23.3 (20–30) | +2.3 | 0.15 | 0/3 | dart-lang/tools#2544 | B | Nothing to do: the review request went to dart-ecosystem-team, and lrhn is already reviewing, with the author jonasfj needing to address his feedback. |
| 22 | 25.0 (24–26) | +3.0 | 0.10 | 0/3 | dart-lang/tools#2710 | B | Wait for the lower stacked PR #2563 to be reviewed and landed; this PR is stacked on it and the review request went only to dart-ecosystem-team. |
| 23 | 24.0 (23–25) | +1.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping again if no response after about a week. |
| 24 | 26.7 (25–28) | +2.7 | 0.10 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether he reviewed the non-PubSub parts, or for natebosch to review; ping again if still quiet after about a week. |
| 25 | 29.0 (29) | +4.0 | 0.07 | 0/3 | dart-lang/http#579 | B | Nothing to do now; this is blocked on a future breaking-release (semver major) plan, so wait until that is scheduled. |
| 26 | 16.7 (16–17) | -9.3 ⚠️ | 0.25 | 0/3 | dart-lang/http#1932 | B | Nothing to do on the issue itself; my PR dart-lang/http#2034 covers it, so move the fix forward there (and optionally reply to the status question once it lands). |
| 27 | 32.3 (32–33) | +5.3 | 0.03 | 0/3 | flutter/devtools#8223 | B | Nothing to do; this is a DevTools feature request in a repo I'm not responsible for, where I was only CC'd and the question is addressed to bkonyi. |
| 28 | 34.0 (34) | +6.0 | 0.03 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a contributions-welcome feature request where I already replied and no one has responded in a year. |
| 29 | 35.0 (35) | +6.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing to do; I already approved and the PR is waiting for mosuem to merge. |
| 30 | 36.0 (36) | +6.0 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do: this is in the http2 package, which I'm not responsible for, and I'm not directly asked. |
| 31 | 30.3 (28–32) | -0.7 | 0.05 | 0/3 | dart-lang/tools#2715 | B | Nothing to do: davidmorgan is named personally as reviewer and the team request is shared; wait for their review. |
| 32 | 30.7 (30–31) | -1.3 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing to do: this is http2 code, which I'm not responsible for, and the contributor asked mosuem to review. |
| 33 | 27.0 (23–30) | -6.0 | 0.08 | 0/3 | dart-lang/native#3653 | A | Nothing to do; liamappelbe owns this and is leaning toward closing it in favor of wrapping objc_msgSend calls in autorelease pools. |
| 34 | 20.7 (20–21) | -13.3 ⚠️ | 0.17 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to answer my questions; the open PR #1972 fix (#1974) is also in flight, so review that PR instead. |
| 35 | 30.7 (26–33) | -4.3 | 0.05 | 0/3 | dart-lang/http#1841 | B | Nothing on the issue itself; the linked PR #2002 is the item to review if anything. |
| 36 | 10.7 (10–11) | -25.3 ⚠️ | 0.50 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's offer to help, ask for a repro, then investigate or unassign. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1972** (truth #34) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue (TLS/CA trust) that I filed and am assigned to, and it has new activity in the last 3 days: a report on the eMudhra intermediate CA compromise and a pointer to the related issue #64644, which was just closed as completed. Security issues with new activity score at the top of the scale regardless of age or the P3 label. My job is to confirm whether the Android trust handling is covered by that fix and not leave the issue in an unknown state.
- **Next action:** Check whether the fix from dart-lang/sdk#64644 covers the eMudhra compromise on Android, reply to the questions from acn-masatadakurihara, and close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unanswered inline review comment 21h ago that raises a real design concern. The PR is blocked on review, so I'm blocking it until I respond. It also fixes google-cloud-dart#358, so first releases of new packages stay untagged until it lands.
- **Next action:** Reply to kevmoo's inline review comment about CHANGELOG.md being deleted by the next generate, and either add "CHANGELOG.md" to lib.Keep in Bump or make the Dart clean step preserve it, then push the update.

### 3. googleapis/google-cloud-dart#376 → predicted 10, priority 0.50
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in google-cloud-dart, a repo I'm responsible for, from a close collaborator (sigurdm), and no human has reviewed it yet (only the bot). That makes me the default reviewer, so there is a clear next step: review it. It's 5 days old and fairly small (+190/-30), but it is pre-release polish with no explicit request to me, so it sits in the lower-middle of the reviews-waiting range.
- **Next action:** Nothing to do now; sigurdm's PR hasn't requested my review and I only watch the repo, so wait until I'm asked or it's ready.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** google-cloud-dart is a repo I'm responsible for, so I'm the default reviewer, and nobody human has reviewed this PR yet (the Gemini bot doesn't count). It is fresh (3 days old) and fixes a real bug where ABORTED errors are never retried over REST. It is a behavior change to shared error handling, so it needs careful review. The author is a first-time contributor rather than a collaborator, which keeps it in the lower part of the review range, and the linked issue #381 sits below this PR.
- **Next action:** Review this PR from a first-time contributor in google-cloud-dart (it changes Status.code for JSON errors), and ask them to rebase since the branch is behind main.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug in a repo I'm responsible for, and a contributor posted a concrete design proposal 4d ago, after my last comment 10d ago. They are waiting on my reply to move forward, which puts it in the 0.65–0.8 range for a contributor waiting on me. It isn't a security issue and isn't blocking anyone urgently, so it sits mid-range.
- **Next action:** Reply to Yusufihsangorgel's design sketch: confirm or adjust the nullable number/string ProtoEnum approach and tell them to go ahead with a preliminary PR.

### 6. dart-lang/http#2027 → predicted 9, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this 9 days ago in dart-lang/http, a repository I'm responsible for, so it counts as fresh planned work. No one else has replied and nothing blocks me, so the next step is mine. It's a design decision that may become a breaking change, so it sits at the low end of the planned-work range rather than higher.
- **Next action:** Decide on the Client.close design (tracked outstanding requests vs. async close in a 2.0 release) and write up a concrete plan or draft PR.

### 7. dart-lang/http#1981 → predicted 7, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself 5h ago and said I've started working on this, so it is a fresh commitment in dart-lang/http, which I am responsible for (cupertino_http is not the http2 area). The next step is mine and nobody else is blocking it. It is not a security vulnerability report, only a feature request related to certificate pinning, and it has no reviewer or collaborator waiting, so it sits mid-range among my planned work.
- **Next action:** Continue the prototype of the server trust evaluator hook in CupertinoClient, since I said I've started on it and assigned myself.

### 8. googleapis/google-cloud-dart#360 → predicted 8, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator's issue in a repo I'm responsible for, with a clear next step for me. kevmoo answered my question 17d ago, so the ball is in my court. He says it isn't urgent, and the issue has had no activity since. That keeps it in the lower half of the 0.5–0.65 range. The mid-stream error handling bug is a real correctness problem, because errors are silently turned into empty messages. That keeps it from sinking further.
- **Next action:** Reply to kevmoo: decide whether to fix the mid-stream SSE error handling now (a clear bug) and defer or drop the incremental JSON framing until we know servers send it incrementally.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm assigned this issue, and nothing has happened since I was assigned 22 months ago, so the next step is mine: fix it or unassign. The bug is a spec violation that could cause proxy-related problems (NUL and \x0b in header names), so it is not trivial. But it is not a clear-cut vulnerability, there is no new activity and it is not in a repo I own, so it sits at the bottom of the assigned-work range.
- **Next action:** Decide whether to fix the dart:io header-name validation (reject non-tchar characters per RFC 9110) or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked kevmoo a design question 16d ago (discovery switch vs. convenience extensions) and he hasn't replied, so the next step is his. It's a collaborator's issue in my own repo with a real design decision, so it stays visible in the 'recent question I'm waiting on' range. It isn't security, and the 16 days of quiet put it in the lower half of that range.
- **Next action:** Wait for kevmoo to answer my question on discovery vs. convenience extensions for Compute LRO polling.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an important crash bug in widely used dart:io code: an uncatchable exception can take down servers. I was only CC'd, by parlough and by kevmoo (a collaborator), and nobody has asked me for anything specific. Nothing has happened in 20 months, so it sits at the bottom of the old-but-important CC range. It is not a security issue, and dart-lang/sdk isn't a repo I own, so it ranks below items I need to act on.
- **Next action:** Decide whether to take over the abandoned CL 144346 (or write a similar fix) for the unsolicited-response crash, or triage it to the right owner.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** Open PR #3763 (mine, updated 2d ago) is linked as closing this issue, so the PR is the thing to act on and the issue is a duplicate of that work. The issue was filed 6d ago, I'm assigned, and nothing new has been added since. Its range is 0.1–0.35, and a fresh issue in an area I work in puts it near the upper-middle of that range.
- **Next action:** Nothing to do on the issue itself; drive PR dart-lang/native#3763, which closes it.

### 13. googleapis/google-cloud-dart#366 → predicted 15, priority 0.30
- **Ground truth:** 
- **Model:** The checklist is blocked until the generated google_cloud_rpc version is bumped and released, and my last comment (17d ago) was about deciding on a general automation approach rather than a concrete step. This is a collaborator's (sigurdm) issue in my repo, but there is no new activity directed at me and no clear step I can take today. It stays visible in the upper-middle of the not-actionable range as a release-blocking reminder, since google_cloud_storage and google_cloud_pubsub must not be published without the bump.
- **Next action:** Nothing to do now; I last commented 17d ago about a general fix via librarian automation, and the work is gated on the google_cloud_rpc version bump and release.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.14
- **Ground truth:** 
- **Model:** This is a bot-authored BoringSSL revision bump in dart-lang/tools, a repository I'm not responsible for. The only review request went to the dart-ecosystem-team, not to me personally. It is fresh (19h) and small (+6/-2), but nothing in it is flagged as a security fix or asks anything of me, so it belongs in the low team-review range.
- **Next action:** Nothing for me personally; another dart-ecosystem-team member can review this automated BoringSSL bump.

### 15. googleapis/google-cloud-dart#381 → predicted 18, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** An open PR (#382) by the same author closes this issue, so the PR is the thing to act on and the issue ranks well below it. It is in googleapis/google-cloud-dart, which I'm responsible for, and it is fresh (3d), but it's a correctness bug in retry logic rather than a security issue. No extra action is needed on the issue beyond reviewing the PR.
- **Next action:** Review PR #382, which already covers this issue, rather than acting on the issue itself.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http (cronet_http, not http2), and I requested a review from goderbauer 2d ago with no response yet. Nothing is waiting on me and there is no unanswered feedback, so the next step belongs to the reviewer. The linked issue #1932 is covered by this PR, so it should rank below it, and this PR stays in the low 'waiting on a recently asked reviewer' range.
- **Next action:** Wait for goderbauer to review; ping again if no response after about a week (around 2026-10-30).

### 17. googleapis/google-cloud-dart#359 → predicted 6, priority 0.57
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned this issue, filed by a close collaborator (kevmoo) in a repo I'm responsible for, and the next step is clearly mine. The retry dependencies (#352, #353, #346) have all merged, so nothing blocks me, and no open PR covers it. It's not very fresh: my last comment was 10d ago and nobody has replied. That keeps it in the middle of the planned-work range rather than the top. The HTML 502/503/504 bug is a concrete, small first step.
- **Next action:** Implement the ServiceException.fromHttpResponse FormatException fix, then add RetryRunner and RequestOptions support to ServiceClient, or unassign if I won't get to it.

### 18. dart-lang/http#2031 → predicted 27, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is stacked on other PRs, and one of them (#2014) still hasn't been reviewed, so it is blocked for now. Its changes are a tiny version and changelog bump, and it is in the http2 area where I'm not responsible, though I was named as reviewer. The lower PRs take priority, so this one stays low.
- **Next action:** Wait for the lower stacked PRs (#2014 needs my review; #2010 and #2009 are approved) to land before reviewing this release prep.

### 19. googleapis/google-cloud-dart#345 → predicted 17, priority 0.22
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft in a repository I'm responsible for, so it is mine to finish or abandon, and the next step is mine with no one else blocking it. It has been idle for 45 days, with 5 unresolved bot review threads and a dirty merge state. Because it is a stale draft and the only reviewer was a bot, it belongs in the low 'finish or abandon' range.
- **Next action:** Decide whether to finish this draft DNS PR (fix the bot's 5 review comments, resolve merge conflicts, mark ready) or close it.

### 20. dart-lang/core#1007 → predicted 5, priority 0.62
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core is a repository I'm responsible for, and nobody has reviewed this PR yet; bots don't count. That makes me the default reviewer even though the request only went to my team. It fixes a real bug (#537, filed by my collaborator sigurdm) with a small +33 change. It's from a first-time contributor, so it ranks below collaborators' PRs. The CLA check failed and no human has replied in 15 days, so it sits in the middle of the reviews range.
- **Next action:** Review this first-time contributor's PR in dart-lang/core (path package), after checking whether the CLA has been signed.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.04
- **Ground truth:** 
- **Model:** This is a security PR in dart-lang/tools, which I'm not listed as responsible for. My only involvement is a team review request, and lrhn is actively reviewing it by name. The author has six unresolved review threads to address, and nothing has happened in 60 days. Under the security rules, a security PR in a repo I don't own where someone else is reviewing it is scored like any other team review request, which puts it near the bottom of the scale.
- **Next action:** Nothing to do: the review request went to dart-ecosystem-team, and lrhn is already reviewing, with the author jonasfj needing to address his feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still an unreviewed draft, so the lower PR needs review first. The review request went to dart-ecosystem-team, not to me personally, and the author's only other review so far is from a bot. Mosuem is a close collaborator and the PR is fresh, so it sits at the top of the low range rather than at the bottom.
- **Next action:** Wait for the lower stacked PR #2563 to be reviewed and landed; this PR is stacked on it and the review request went only to dart-ecosystem-team.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, and I requested a review from liamappelbe 2d ago, with no response yet. There is no unanswered feedback and no unresolved threads, so nothing is blocking on me. It is fresh and fixes real performance and deadlock issues, but per the rules it stays low until about a week passes without a reply.
- **Next action:** Wait for liamappelbe to review; ping again if no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 25, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, approved by sigurdm (who only looked at the PubSub parts) with natebosch still requested as reviewer. On 4d ago I asked sigurdm directly whether he reviewed the rest and nobody has answered, so I moved last and the next step belongs to someone else. The PR is behind main and has 2 unresolved threads, but a recent reviewer ping means little to do until about a week passes.
- **Next action:** Wait for sigurdm to answer whether he reviewed the non-PubSub parts, or for natebosch to review; ping again if still quiet after about a week.

### 25. dart-lang/http#579 → predicted 29, priority 0.07
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR carries the 'next-breaking-release' label and I said in 2024 that it must be coordinated with a semver major release I don't have bandwidth for. The latest comment, a user asking for a workaround 14 months ago, doesn't change that the real work is blocked. The PR is old and quiet, so it sits at the bottom of the 0.05–0.15 blocked range.
- **Next action:** Nothing to do now; this is blocked on a future breaking-release (semver major) plan, so wait until that is scheduled.

### 26. dart-lang/http#1932 → predicted 16, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** An open PR by me (#2034, updated 2d ago) is linked as closing this issue, so the PR is the thing to act on and the issue is a duplicate-of-work. The latest comment is just a status request, which doesn't change that the real work is happening in the PR. The issue is fresh and important (a build break affecting cronet_http users), so it sits at the upper end of the low range.
- **Next action:** Nothing to do on the issue itself; my PR dart-lang/http#2034 covers it, so move the fix forward there (and optionally reply to the status question once it lands).

### 27. flutter/devtools#8223 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** flutter/devtools is not one of my repositories, and I was only informationally CC'd in a 2024 comment from bkonyi. The recent activity is a label change by srawlins, and the GSoC question is directed at bkonyi, not me. There is nothing for me to act on.
- **Next action:** Nothing to do; this is a DevTools feature request in a repo I'm not responsible for, where I was only CC'd and the question is addressed to bkonyi.

### 28. dart-lang/http#1837 → predicted 34, priority 0.03
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old, low-priority (P3) feature request labeled contributions-welcome, and I was the last to act: I explained that the Dart team won't take it on. Nothing has happened in about a year, and no one has asked me anything. It sits at the bottom of the scale.
- **Next action:** Nothing to do; this is a contributions-welcome feature request where I already replied and no one has responded in a year.

### 29. dart-lang/http#2033 → predicted 35, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2d ago and there has been no activity since: no new commits, no replies. It is a clean, approved infra change from a collaborator in a repo I own, and merging is up to the author. There is nothing left for me to do.
- **Next action:** Nothing to do; I already approved and the PR is waiting for mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is labeled package:http2, and my note says I'm not responsible for http2. I'm only watching the repo, was never mentioned, and have no prior activity. The last comment is an 8-month-old general question to nobody in particular, so it doesn't change anything for me.
- **Next action:** Nothing to do: this is in the http2 package, which I'm not responsible for, and I'm not directly asked.

### 31. dart-lang/tools#2715 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** The repo dart-lang/tools isn't one I'm responsible for (only dart-lang/http is). My only involvement is a team review request via dart-ecosystem-team, and davidmorgan is also named personally as a reviewer, which pushes this near zero. Author kevmoo is a collaborator and it's fresh (2d), but nothing is asked of me personally.
- **Next action:** Nothing to do: davidmorgan is named personally as reviewer and the team request is shared; wait for their review.

### 32. dart-lang/http#2026 → predicted 31, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR changes pkgs/http2, and my note says I'm not responsible for http2. I'm only watching the repo, with no mention or review request, and the contributor asked mosuem to review it. Nothing is directed at me, so it is near 0 despite the recent activity.
- **Next action:** Nothing to do: this is http2 code, which I'm not responsible for, and the contributor asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 28, priority 0.08
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is driving it, and my last comment was 37d ago. The PR that closed it turned out to do nothing, and liamappelbe's latest comment (34d ago) concludes the approach probably isn't worth the effort. The related autorelease pool issues are closed, and I'm only a commenter here, so there's no action for me and the item has been quiet for over a month.
- **Next action:** Nothing to do; liamappelbe owns this and is leaning toward closing it in favor of wrapping objc_msgSend calls in autorelease pools.

### 34. dart-lang/http#1972 → predicted 20, priority 0.15
- **Ground truth:** 
- **Model:** I asked the reporter for information and added needs-info 8d ago, with no reply, so the issue is waiting on them. An open PR (#1974) is linked and updated recently, so that PR is the thing to act on and the issue should rank well below it. It is in the http repo, and the IOClient code is not http2, so it is in scope, but there is nothing for me to do on the issue itself right now.
- **Next action:** Wait for the reporter to answer my questions; the open PR #1972 fix (#1974) is also in flight, so review that PR instead.

### 35. dart-lang/http#1841 → predicted 26, priority 0.10
- **Ground truth:** 
- **Model:** An open PR (#2002) already covers this issue, so the PR is the thing to act on and the issue ranks well below it. I thumbed this down on 2026-10-05, and the only activity since then is the PR's updates, nothing new addressed to me on the issue. It is also labeled next-breaking-release, which blocks it, so it stays in the low range.
- **Next action:** Nothing on the issue itself; the linked PR #2002 is the item to review if anything.

### 36. dart-lang/sdk#38148 → predicted 11, priority 0.50
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm assigned to this issue and filiph reported 24d ago that it still reproduces on 3.13.5 and offered to help. That comment came after my 2026-08-01 thumbs-down, so the item counts as new. It is a real intermittent bug in widely used dart:io, but it is old and has had no reply from me, so it sits at the top of the assigned-issue range and not higher. A copybara commit referenced it 4d ago, which may be a related fix worth checking.
- **Next action:** Reply to filiph's offer to help, ask for a repro, then investigate or unassign.
