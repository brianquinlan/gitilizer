# Gitilizer eval: v5d-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5d.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033318

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.711 ± 0.011 |
| spearman | 0.827 ± 0.005 |
| pairwise_acc | 0.856 ± 0.006 |
| ndcg | 0.982 ± 0.000 |
| ndcg@5 | 0.995 ± 0.002 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.482 ± 0.085 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.878 ± 0.025 | 0.998 ± 0.001 | 1.000 ± 0.000 | 0.917 ± 0.191 |
| B | 20 | 0.579 ± 0.028 | 0.950 ± 0.003 | 0.600 ± 0.000 | 3.133 ± 0.115 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 3/3 | dart-lang/sdk#48056 | A | Read the eMudhra security comment, check whether dart:io on Android honors the platform blocklist, and reply or link the issue to the closed #64644 CA-distrust fix. |
| 2 | 2.7 (2–3) | +0.7 | 0.88 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo's inline question about CHANGELOG.md being deleted by the next `librarian generate`, then push a fix (add it to `lib.Keep` or have Dart clean preserve it). |
| 3 | 4.3 (4–5) | +1.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub release-polish PR (client attribution header, changelog, pubspec, .pubignore) in google-cloud-dart. |
| 4 | 4.7 (4–5) | +0.7 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR from an outside contributor and confirm that using the google.rpc.Code in Status.code for JSON errors is the intended behavior for google_cloud_rpc. |
| 5 | 2.3 (2–3) | -2.7 | 0.85 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's design sketch: confirm or adjust the nullable number/string approach and unknown-name handling so they can start a preliminary PR. |
| 6 | 8.0 (8) | +2.0 | 0.55 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue the async `Client.close` / http 2.0 design, and write up a concrete proposal or plan. |
| 7 | 7.0 (7) | +0.0 | 0.55 | 3/3 | dart-lang/http#1981 | B | Finish the skeleton for the CupertinoClient server trust evaluator hook and share it as a draft PR for discussion. |
| 8 | 9.3 (9–10) | +1.3 | 0.53 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether to take this on: reply to kevmoo, then either implement the mid-stream SSE error handling (part 2) or leave part 1 unscheduled until we know servers send incremental JSON. |
| 9 | 13.0 (11–14) | +4.0 | 0.37 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix header-name validation in dart:io's HTTP parser or unassign myself from this issue. |
| 10 | 14.3 (11–20) | +4.3 | 0.31 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my question on whether to switch to discovery or add convenience extensions to the proto-based operations. |
| 11 | 11.7 (11–12) | +0.7 | 0.41 | 3/3 | dart-lang/sdk#31275 | A | Decide whether to take over the abandoned dart:io CL (144346) to fix this crash, or explicitly triage/hand it off to the dart:io owners. |
| 12 | 15.7 (15–16) | +3.7 | 0.27 | 2/3 | dart-lang/native#3752 | B | Drive PR dart-lang/native#3763 to completion (it closes this issue); nothing further to do on the issue itself. |
| 13 | 17.0 (13–21) | +4.0 | 0.21 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump; revisit my open question on a general fix via librarian automation. |
| 14 | 18.7 (18–20) | +4.7 | 0.19 | 0/3 | dart-lang/tools#2719 | B | Nothing for me personally; this is a bot PR with a team review request for dart-ecosystem-team in dart-lang/tools, which isn't a repo I'm responsible for. |
| 15 | 15.3 (15–16) | +0.3 | 0.27 | 3/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which fixes this; the issue itself needs nothing beyond that. |
| 16 | 21.7 (21–22) | +5.7 | 0.11 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping him if there is no response after about a week. |
| 17 | 6.0 (6) | -11.0 ⚠️ | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the ServiceClient retry/RequestOptions changes and the FormatException fix in ServiceException.fromHttpResponse, or unassign if not planned. |
| 18 | 26.7 (25–29) | +8.7 | 0.06 | 0/3 | dart-lang/http#2031 | A | Nothing to do; this release-prep PR is stacked on unreviewed PR #2014 (which I'm asked to review), and http2 is outside my responsibility. |
| 19 | 17.3 (17–18) | -1.7 | 0.22 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft (rebase onto main, fix the Gemini review comments, mark ready) or abandon it. |
| 20 | 19.7 (19–21) | -0.3 | 0.15 | 0/3 | dart-lang/core#1007 | B | Wait for the author to sign the CLA, then review if the team request is still unclaimed. |
| 21 | 25.3 (19–29) | +4.3 | 0.09 | 0/3 | dart-lang/tools#2544 | B | Nothing for me to do: jonasfj needs to address lrhn's review comments; the review request went to dart-ecosystem-team, and lrhn is already reviewing. |
| 22 | 22.0 (20–23) | +0.0 | 0.11 | 3/3 | dart-lang/tools#2710 | B | Optionally review mosuem's sigstore provenance PR, though it is stacked on draft #2563 and the team request is shared, so it can wait. |
| 23 | 23.0 (22–24) | +0.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping them if no response after about a week. |
| 24 | 24.3 (24–25) | +0.3 | 0.10 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether he reviewed the non-PubSub parts, and for natebosch's review; nothing for me to do until then. |
| 25 | 26.0 (25–27) | +1.0 | 0.08 | 0/3 | dart-lang/http#579 | B | Nothing to do now; blocked on the next-breaking-release plan, so wait for the semver-major release to be scheduled. |
| 26 | 13.3 (13–14) | -12.7 ⚠️ | 0.29 | 0/3 | dart-lang/http#1932 | B | Nothing to do on the issue itself; my fix PR dart-lang/http#2034 is the thing to move forward. |
| 27 | 27.0 (26–28) | +0.0 | 0.06 | 0/3 | flutter/devtools#8223 | B | Nothing needed; optionally weigh in only if the DevTools team asks about dart:io/http websocket profiling. |
| 28 | 28.3 (27–30) | +0.3 | 0.05 | 0/3 | dart-lang/http#1837 | A | Nothing to do; I already replied that this is a community contribution and labeled it P3. Wait for a community contributor. |
| 29 | 33.3 (32–35) | +4.3 | 0.03 | 0/3 | dart-lang/http#2033 | A | Nothing to do; I approved and the author (mosuem) can merge. |
| 30 | 36.0 (36) | +6.0 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do; http2 is outside my responsibility, so leave it to the http2 owners. |
| 31 | 31.3 (31–32) | +0.3 | 0.03 | 0/3 | dart-lang/tools#2715 | B | Nothing required; davidmorgan is the named reviewer, so wait for them unless asked. |
| 32 | 30.3 (30–31) | -1.7 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing to do: http2 is outside my responsibility, and the contributor asked mosuem to review. |
| 33 | 34.0 (33–35) | +1.0 | 0.03 | 0/3 | dart-lang/native#3653 | A | Nothing to do now; liamappelbe is assigned and driving, and is leaning toward wrapping objc_msgSend in autorelease pools instead. |
| 34 | 32.7 (29–35) | -1.3 | 0.03 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions (client type, server behavior); the open PR #1974 is also in flight and could be glanced at only if it gets a review request. |
| 35 | 33.0 (32–34) | -2.0 | 0.03 | 0/3 | dart-lang/http#1841 | B | Nothing for now; the linked PR #2002 covers this issue, and the issue is labeled next-breaking-release. Review the PR instead. |
| 36 | 9.7 (9–10) | -26.3 ⚠️ | 0.52 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph with repro guidance (or ask for a minimal repro), then fix the bug or unassign yourself. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue that I filed and am assigned to, and it has new activity in the last 3 days: a report that compromised eMudhra intermediate CAs could still be trusted by Dart on Android. The activity is on my issue, so it belongs near the top of the scale, and its P3 label and age do not lower it. The related issue #64644 is closed and assigned to mraleph, but the question about Android's revocation and blocklist handling is still unanswered here.
- **Next action:** Read the eMudhra security comment, check whether dart:io on Android honors the platform blocklist, and reply or link the issue to the closed #64644 CA-distrust fix.

### 2. googleapis/librarian#7808 → predicted 3, priority 0.88
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my PR, and kevmoo, a close collaborator, left review feedback 21h ago that I haven't answered. The unresolved thread points to a real bug: the next generate would delete the new CHANGELOG.md. It blocks the fix for google-cloud-dart#358, so it ranks in the 'I'm blocking someone' range. Because the feedback is very recent, it sits near the top of that range.
- **Next action:** Answer kevmoo's inline question about CHANGELOG.md being deleted by the next `librarian generate`, then push a fix (add it to `lib.Keep` or have Dart clean preserve it).

### 3. googleapis/google-cloud-dart#376 → predicted 5, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This PR is in googleapis/google-cloud-dart, one of my repositories, and nobody human has reviewed it in 5 days. The author is a close collaborator (sigurdm), and I'm the default reviewer. The only review so far is from a bot, which doesn't count. It's also a small pre-release PR (+190/-30), so reviewing it unblocks the pubsub release. Nothing is directed at me personally and it's behind main, so it sits mid-range rather than higher.
- **Next action:** Review sigurdm's pubsub release-polish PR (client attribution header, changelog, pubspec, .pubignore) in google-cloud-dart.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, one of my repositories, and I'm a default reviewer even though I'm not listed. The only review so far is from a bot, which doesn't count. It's not from a collaborator, so it sits mid-range rather than at the top, and it changes the behavior of status.code, which affects retry logic for REST users. It's also 3 days old and the branch is behind main.
- **Next action:** Review this PR from an outside contributor and confirm that using the google.rpc.Code in Status.code for JSON errors is the intended behavior for google_cloud_rpc.

### 5. googleapis/google-cloud-dart#252 → predicted 2, priority 0.92
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own issue in a repo I'm responsible for, and Yusufihsangorgel posted a new design proposal 4 days ago that I haven't answered, so there is new activity after my last comment. Under the scale, my issue with new activity belongs in the 0.9+ range even though it is p2. The contributor is waiting on my approval of the approach before writing code, so a quick reply unblocks them.
- **Next action:** Reply to Yusufihsangorgel's design sketch: confirm or adjust the nullable number/string approach and unknown-name handling so they can start a preliminary PR.

### 6. dart-lang/http#2027 → predicted 8, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this 9 days ago in dart-lang/http, a repository I'm responsible for, and it's in an area I work in (Client API semantics). It has no replies, but it's my own planned work, so it falls in the 0.5-0.65 range. It's not about http2, so the repo note doesn't exclude it. It sits mid-range because nothing is blocked on me and there's no new activity.
- **Next action:** Decide whether to pursue the async `Client.close` / http 2.0 design, and write up a concrete proposal or plan.

### 7. dart-lang/http#1981 → predicted 7, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself 5h ago and said "I've started working on this", so this is planned work in dart-lang/http, which I'm responsible for (cupertino_http is not http2). No one else is waiting on me, since the reporter has nothing new outstanding and the last move was mine. That puts it in the 0.5-0.65 planned-work range: it's my to-do, but it isn't blocking anyone or urgent, and the author is a stranger rather than a collaborator.
- **Next action:** Finish the skeleton for the CupertinoClient server trust evaluator hook and share it as a draft PR for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** kevmoo is a close collaborator and this is in my repo, and he answered my question 17 days ago with a clear next step (part 2, throwing a ServiceException on mid-stream error frames, is a real correctness bug). He said it's not urgent, and it has no assignee or open PR. It's planned-work territory (0.5–0.65), at the lower-middle of the range because the last activity is 17 days old and the part 1 benefit is unproven.
- **Next action:** Decide whether to take this on: reply to kevmoo, then either implement the mid-stream SSE error handling (part 2) or leave part 1 unscheduled until we know servers send incremental JSON.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue has been assigned to me since January 2025 with no activity since, and I've never commented. It sits in dart-lang/sdk, which isn't one of my listed repos, and it is a parsing correctness bug that could affect proxies, so it is arguably security-adjacent. The next step is mine: fix it or unassign. Nothing is new or directed at me, so it lands at the bottom of the 0.5–0.65 range for assigned issues.
- **Next action:** Decide whether to fix header-name validation in dart:io's HTTP parser or unassign myself from this issue.

### 10. googleapis/google-cloud-dart#361 → predicted 20, priority 0.12
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** My last comment (16d ago) asked kevmoo a design question in a repo I'm responsible for, and he hasn't replied, so the next move is his. It's a non-urgent, non-breaking ergonomics improvement with a working manual-polling workaround. Silence of over two weeks plus a related open feature request (#28) keeps it low in the 0.05-0.15 range, not a security issue.
- **Next action:** Wait for kevmoo to answer my question on whether to switch to discovery or add convenience extensions to the proto-based operations.

### 11. dart-lang/sdk#31275 → predicted 12, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old but important bug: an uncatchable exception in dart:io HttpClient crashes servers, and I was explicitly CC'd twice (including by collaborator kevmoo) as the library owner. It is in dart-lang/sdk, not one of my listed repositories, and there is no recent activity directed at me (last human activity was a label change 20 months ago), and nothing is blocked on me right now. That places it in the old-but-important CC'd range, not higher.
- **Next action:** Decide whether to take over the abandoned dart:io CL (144346) to fix this crash, or explicitly triage/hand it off to the dart:io owners.

### 12. dart-lang/native#3752 → predicted 16, priority 0.27
- **Ground truth:** 
- **Model:** I filed and am assigned to this issue, but an open PR of mine (#3763) already covers it, so the real work and attention belong on the PR. Issues with a covering PR rank 0.2-0.3 below the PR. There has been no activity from anyone else since I filed it 6 days ago.
- **Next action:** Drive PR dart-lang/native#3763 to completion (it closes this issue); nothing further to do on the issue itself.

### 13. googleapis/google-cloud-dart#366 → predicted 13, priority 0.30
- **Ground truth:** 
- **Model:** The issue is from a collaborator (sigurdm) in my repository, but the tasks are blocked on the google_cloud_rpc version bump, so there's nothing concrete for me to do today. My last comment 17 days ago was about finding a general fix through librarian automation, and nobody has replied since. It stays in the middle-low range because it blocks releases of google_cloud_storage and pubsub, but it has no recent activity directed at me.
- **Next action:** Wait for the generated google_cloud_rpc version bump; revisit my open question on a general fix via librarian automation.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** The PR is an automated BoringSSL bump from a bot, and the review request goes to the shared dart-ecosystem-team rather than me personally. dart-lang/tools is not one of my listed repositories (only dart-lang/http is). There is no human activity, no mention of me and no unresolved threads, so it sits at the low end of the team-review-request range.
- **Next action:** Nothing for me personally; this is a bot PR with a team review request for dart-ecosystem-team in dart-lang/tools, which isn't a repo I'm responsible for.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.27
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is an external contributor's issue in my repository (google-cloud-dart), and it is a real bug that affects retry behavior. However, PR #382 already covers it, so the issue ranks 0.2-0.3 below the PR, and the next step is to review that PR. The reporter is not a collaborator, and nothing is directed at me: no mentions and no assignment.
- **Next action:** Review PR #382, which fixes this; the issue itself needs nothing beyond that.

### 16. dart-lang/http#2034 → predicted 21, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http, and I requested a review from goderbauer only 2 days ago, so the next move is the reviewer's. It fixes an issue assigned to me (#1932, a build break), which keeps it at the top of the 0.05-0.15 range. Nothing is unresolved and there is no new activity directed at me.
- **Next action:** Wait for goderbauer to review; ping him if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 6, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned to this collaborator-filed (kevmoo) issue in a repo I'm responsible for, and the next step is mine: I've already researched retry examples and trimmed scope. The blocking PRs (#352, #353) are merged, so there is a clear path forward. There's no new activity directed at me in the last 10 days, so it sits mid-range as planned work rather than urgent.
- **Next action:** Implement the ServiceClient retry/RequestOptions changes and the FormatException fix in ServiceException.fromHttpResponse, or unassign if not planned.

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This is a release-prep PR for package:http2, which I've noted I'm not responsible for. It's also stacked on PRs, including #2014, that are still unreviewed, so it can't move until those do. A review request with no activity directed at me puts it in the stacked/waiting range, low on the scale.
- **Next action:** Nothing to do; this release-prep PR is stacked on unreviewed PR #2014 (which I'm asked to review), and http2 is outside my responsibility.

### 19. googleapis/google-cloud-dart#345 → predicted 17, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repo I'm responsible for. It has been silent for 45 days, with merge conflicts (mergeable_state dirty) and 5 unresolved bot review threads. Nobody else is waiting on it. Drafts to finish or abandon fall in the 0.15–0.35 range, and the long silence puts it in the lower half. Only bot activity has come in, and bots don't count as activity directed at me.
- **Next action:** Decide whether to finish this draft (rebase onto main, fix the Gemini review comments, mark ready) or abandon it.

### 20. dart-lang/core#1007 → predicted 19, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request to dart-ecosystem-team in dart-lang/core, which is not a repository I'm responsible for, so it isn't addressed to me personally. The author is a first-time contributor and the CLA check failed, so review can't proceed yet. It fixes a real bug filed by sigurdm, but there has been no activity since the CLA bot comment 15 days ago, so it sits at the bottom of the team-request range.
- **Next action:** Wait for the author to sign the CLA, then review if the team request is still unclaimed.

### 21. dart-lang/tools#2544 → predicted 28, priority 0.04
- **Ground truth:** 
- **Model:** This is a security-related PR, but it is in dart-lang/tools, which is not one of my repositories, so the security exception for a PR waiting on my review in my repositories does not apply. The review request went to dart-ecosystem-team, not to me personally, and lrhn is already reviewing. The ball is in the author's court (6 unresolved threads, no update for 2 months), and I have no activity or mentions here.
- **Next action:** Nothing for me to do: jonasfj needs to address lrhn's review comments; the review request went to dart-ecosystem-team, and lrhn is already reviewing.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still an unreviewed draft, and the stack rule puts it at 0.05–0.15. The only review request is to dart-ecosystem-team, which is shared and not addressed to me personally. dart-lang/tools is also not one of my listed repositories. Only a bot has reviewed it, and mosuem has already handled that feedback, so nothing is waiting on me right now.
- **Next action:** Optionally review mosuem's sigstore provenance PR, though it is stacked on draft #2563 and the team request is shared, so it can wait.

### 23. dart-lang/native#3763 → predicted 22, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, and I requested review from liamappelbe 2 days ago. Nothing has happened since apart from a codecov bot comment, which doesn't count as activity directed at me. Nothing is blocking on me, so it belongs in the 'my PR waiting on a reviewer asked within the last week' range.
- **Next action:** Wait for liamappelbe to review; ping them if no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 24, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, but it is approved by sigurdm and waiting on the reviewers I asked. My last comment, a question to sigurdm, was 4 days ago, under a week of silence, and natebosch is the requested reviewer. The only things left on my side are minor (the branch is behind main, and there are 2 unresolved threads), and neither blocks the wait, so it sits in the low band for PRs waiting on reviewers I asked in the last week.
- **Next action:** Wait for sigurdm to answer whether he reviewed the non-PubSub parts, and for natebosch's review; nothing for me to do until then.

### 25. dart-lang/http#579 → predicted 27, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** I'm a requested reviewer on this PR in dart-lang/http, but it carries the 'next-breaking-release' label and I said in 2024 I lack the bandwidth to coordinate that release. The only later activity is a 14-month-old question from a stranger, and my own last reply came before it. Items blocked on a breaking-release plan belong in the 0.05–0.15 range, and the age and silence put it in the lower half of that range.
- **Next action:** Nothing to do now; blocked on the next-breaking-release plan, so wait for the semver-major release to be scheduled.

### 26. dart-lang/http#1932 → predicted 14, priority 0.28
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** The issue is assigned to me in my repo and is a real build break, but an open PR of mine (#2034) already covers it, so the issue ranks well below the PR. The newest comment is just a status request, which doesn't change the next step. It sits near the top of the 'issue with covering PR' range because of the broad impact and my assignment.
- **Next action:** Nothing to do on the issue itself; my fix PR dart-lang/http#2034 is the thing to move forward.

### 27. flutter/devtools#8223 → predicted 26, priority 0.08
- **Ground truth:** 
- **Model:** I was only CC'd informationally by bkonyi two years ago in flutter/devtools, a repository I'm not responsible for. The issue is a high-effort feature request with no question directed at me, and the recent activity (a GSoC question to bkonyi and a label change by srawlins) is not aimed at me. It's old, low-priority backlog in another team's repo, so it sits at the low end.
- **Next action:** Nothing needed; optionally weigh in only if the DevTools team asks about dart:io/http websocket profiling.

### 28. dart-lang/http#1837 → predicted 30, priority 0.04
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a contributions-welcome enhancement request from a non-collaborator, with no new activity in about a year. My own comment and P3 label are the last events, so nothing new is directed at me. It's old low-priority backlog with nothing for me to do.
- **Next action:** Nothing to do; I already replied that this is a community contribution and labeled it P3. Wait for a community contributor.

### 29. dart-lang/http#2033 → predicted 33, priority 0.03
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already approved this PR 2d ago, with no new commits or author activity since. The PR is clean and mergeable, so merging is up to mosuem. Per the scale, approved PRs with nothing since fall in the 0.0-0.05 range.
- **Next action:** Nothing to do; I approved and the author (mosuem) can merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is an http2 performance issue in dart-lang/http, and my note says I'm not responsible for http2. I have no activity on it and I'm not mentioned. The last comment, 8 months ago, asks whether to close it but isn't directed at me, so there's nothing for me to do.
- **Next action:** Nothing to do; http2 is outside my responsibility, so leave it to the http2 owners.

### 31. dart-lang/tools#2715 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** The review request went to dart-ecosystem-team, which is shared, and kevmoo also named davidmorgan personally as the reviewer. dart-lang/tools is not one of my listed repositories, and I have not been mentioned or asked anything directly. Only a bot has reviewed so far, so there is nothing for me to do.
- **Next action:** Nothing required; davidmorgan is the named reviewer, so wait for them unless asked.

### 32. dart-lang/http#2026 → predicted 31, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR touches pkgs/http2 in dart-lang/http, and my note says I'm not responsible for http2. The author asked mosuem for review, not me, and I have no mentions or prior activity here. Nothing is directed at me, so it belongs at the bottom of the scale.
- **Next action:** Nothing to do: http2 is outside my responsibility, and the contributor asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 35, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to and driven by liamappelbe, and the linked PR #3664 is merged. My last comment was 37 days ago, and the only mention of me is a thanks for a tip, so nothing is asked of me. Later discussion is between mkustermann, mraleph and liamappelbe, with no new activity directed at me.
- **Next action:** Nothing to do now; liamappelbe is assigned and driving, and is leaning toward wrapping objc_msgSend in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 29, priority 0.04
- **Ground truth:** 
- **Model:** I asked the reporter for info and labeled it needs-info 8 days ago, and there has been no reply from Keetz, so nothing is new for me to act on. A linked open PR (#1974) already covers the issue, which would push the issue lower than the PR anyway. Nothing is directed at me since my last comment, so this sits at the bottom of the scale.
- **Next action:** Wait for Keetz to answer my questions (client type, server behavior); the open PR #1974 is also in flight and could be glanced at only if it gets a review request.

### 35. dart-lang/http#1841 → predicted 34, priority 0.03
- **Ground truth:** 
- **Model:** I gave this a thumbs-down on 2026-10-05, and nothing significant directed at me has happened since; the latest activity (commits on 10-02) predates it. An open PR (#2002) covers the issue, and the next-breaking-release label blocks it, so the issue itself has no action for me. Any real work belongs on the PR.
- **Next action:** Nothing for now; the linked PR #2002 covers this issue, and the issue is labeled next-breaking-release. Review the PR instead.

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.50
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You are the assignee on an intermittent, long-lived Directory.deleteSync bug, and filiph reported a local repro on current Dart 3.13.5 and offered to help. That comment came after your thumbs-down and is the only real new activity, but it isn't an @-mention and the issue is in dart-lang/sdk rather than a repo you own. So it sits at the 'fix or unassign' level of the scale. The 2019 history is old and the copybara commit reference is bot activity, so neither raises the score.
- **Next action:** Reply to filiph with repro guidance (or ask for a minimal repro), then fix the bug or unassign yourself.
