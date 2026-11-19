# Gitilizer eval: next-step-v2-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/work/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261118-234033

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.620 ± 0.032 |
| spearman | 0.759 ± 0.032 |
| pairwise_acc | 0.810 ± 0.016 |
| ndcg | 0.980 ± 0.006 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.767 ± 0.058 |
| mean_abs_displacement | 4.648 ± 0.357 |

## Next steps (mean ± sd across trials)

Against the next step the eval set records for 36 items (PRD RANK-24). "Same side" counts a next step on the other side of "on me" as wrong, and any other as right.

| metric | value |
|---|---|
| exact | 0.759 ± 0.016 |
| same side | 0.861 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.778 ± 0.025 | 0.995 ± 0.001 | 1.000 ± 0.000 | 1.250 ± 0.125 |
| B | 20 | 0.470 ± 0.044 | 0.940 ± 0.028 | 0.533 ± 0.115 | 3.767 ± 0.306 |

## Per item

| truth | predicted (mean, range) | Δ | priority | next step (expected) | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | todo | dart-lang/sdk#48056 | A | Review the new eMudhra CA-compromise questions on this issue, check whether dart:io on Android honors the platform blocklist and what #64644 changed, reply, and close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | respond | googleapis/librarian#7808 | A | Answer kevmoo's inline question on bump.go about CHANGELOG.md being deleted by the next generate (append to lib.Keep vs. auto-preserve in Dart clean) and update the PR accordingly. |
| 3 | 3.0 (3) | +0.0 | 0.73 | review | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub release-polish PR (client attribution header, CHANGELOG, pubspec, .pubignore); it has had no human review for 5 days. |
| 4 | 4.3 (4–5) | +0.3 | 0.69 | review | googleapis/google-cloud-dart#382 | A | Review PR #382 (first-time contributor) in google-cloud-dart; check the Status.code behavior change for JSON errors and its impact on retry logic and Storage. |
| 5 | 4.7 (4–5) | -0.3 | 0.70 | respond | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 4d-old design proposal (nullable number/string ProtoEnum): confirm the approach or flag concerns, and tell them to go ahead with a preliminary PR. |
| 6 | 12.0 (12) | +6.0 | 0.40 | backlog 2/3, todo 1/3 (todo) ⚠️ | dart-lang/http#2027 | B | Decide whether to tighten Client.close semantics (track outstanding requests vs. make close async in a 2.0 release) and write up the plan or a PR. |
| 7 | 7.3 (6–9) | +0.3 | 0.54 | todo | dart-lang/http#1981 | B | Finish the prototype for a server trust evaluator hook in CupertinoClient that you said you started, and share it as a skeleton PR for discussion. |
| 8 | 9.3 (8–10) | +1.3 | 0.52 | todo | googleapis/google-cloud-dart#360 | A | Decide how to handle the mid-stream SSE error frames (issue 2, silently yielding empty messages) and whether to defer incremental JSON framing, then reply to kevmoo or file a fix. |
| 9 | 8.3 (6–11) | -0.7 | 0.55 | todo | dart-lang/sdk#59846 | B | Decide whether to fix dart:io's header-name validation to match the RFC 9110 tchar rule (reject NUL, whitespace and other invalid bytes), or unassign myself. |
| 10 | 13.0 (13) | +3.0 | 0.40 | waiting | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my question on whether to switch Compute to discovery or add convenience extensions to the proto-based service operations; follow up if he stays quiet. |
| 11 | 15.7 (14–18) | +4.7 | 0.27 | backlog (not_yours) ⚠️ | dart-lang/sdk#31275 | A | Triage when grooming: decide whether to take over the abandoned CL 144346 for the dart:io HttpClient unsolicited-response crash, or leave it for the team. |
| 12 | 17.3 (16–18) | +5.3 | 0.22 | elsewhere | dart-lang/native#3752 | B | Work on PR dart-lang/native#3763 (support scheduleInRunLoop:forMode:), which closes this issue. |
| 13 | 10.3 (9–11) | -2.7 | 0.50 | todo | googleapis/google-cloud-dart#366 | B | Decide how to handle the google_cloud_rpc version bump (e.g. librarian automation), then require the new version in google_cloud_storage and google_cloud_pubsub pubspecs. |
| 14 | 20.3 (19–22) | +6.3 | 0.11 | not_yours | dart-lang/tools#2719 | B | Nothing to do; this is a team review request in dart-lang/tools, which I'm not responsible for, so leave it to the rest of dart-ecosystem-team. |
| 15 | 16.0 (15–17) | +1.0 | 0.23 | elsewhere | googleapis/google-cloud-dart#381 | A | Act on PR googleapis/google-cloud-dart#382, which fixes this issue; review it there rather than on the issue. |
| 16 | 21.7 (20–23) | +5.7 | 0.10 | waiting | dart-lang/http#2034 | B | Wait for goderbauer to review; ping them around 2026-10-30 if there is still no response. |
| 17 | 7.3 (7–8) | -9.7 ⚠️ | 0.55 | todo (elsewhere) ⚠️ | googleapis/google-cloud-dart#359 | B | Implement the ServiceClient RetryRunner/RequestOptions wiring and harden ServiceException.fromHttpResponse against non-JSON error bodies. |
| 18 | 31.3 (31–32) | +13.3 ⚠️ | 0.03 | not_yours (elsewhere) ⚠️ | dart-lang/http#2031 | A | Nothing to do: this is an http2 release-prep PR, which is outside my scope, and it is stacked on #2014, which is still unreviewed. |
| 19 | 16.7 (16–17) | -2.3 | 0.25 | todo | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft DNS PR (rebase over conflicts, address the bot's 5 unresolved comments, mark ready for review) or close it. |
| 20 | 24.0 (21–26) | +4.0 | 0.10 | not_yours | dart-lang/core#1007 | B | Nothing for me now: the PR is a team review request in dart-lang/core, which is outside my stated repos, and the author hasn't signed the CLA. |
| 21 | 31.7 (29–33) | +10.7 ⚠️ | 0.03 | not_yours | dart-lang/tools#2544 | B | Nothing for me to do: this is a team review request in dart-lang/tools, which I don't own, and lrhn is already reviewing; jonasfj needs to address lrhn's feedback. |
| 22 | 23.7 (22–25) | +1.7 | 0.10 | elsewhere (not_yours) ⚠️ | dart-lang/tools#2710 | B | Review the lower stacked PR dart-lang/tools#2563 (sigstore bundle verification, still draft) first; this PR builds on it. |
| 23 | 22.7 (21–24) | -0.3 | 0.10 | waiting | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping them if there's no response by about 2026-10-30. |
| 24 | 22.3 (19–25) | -1.7 | 0.11 | waiting | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether he reviewed the non-PubSub parts and for natebosch's review; ping again around Oct 28 if still silent. |
| 25 | 27.0 (27) | +2.0 | 0.08 | not_yours (backlog) ⚠️ | dart-lang/http#579 | B | Nothing to do now; the PR is blocked until a breaking release, so leave it until a semver-major release is planned. |
| 26 | 14.3 (14–15) | -11.7 ⚠️ | 0.28 | elsewhere | dart-lang/http#1932 | B | Act on PR dart-lang/http#2034 (fix(cronet): avoid cronet namespace duplication), which closes this issue; no separate action needed here. |
| 27 | 32.3 (32–33) | +5.3 | 0.03 | not_yours | flutter/devtools#8223 | B | Nothing to do; I was only CC'd on a DevTools feature request in a repository I'm not responsible for. |
| 28 | 28.0 (28) | +0.0 | 0.05 | backlog | dart-lang/http#1837 | A | Nothing pending; leave as a contributions-welcome P3 and revisit only if a community member picks it up. |
| 29 | 35.0 (35) | +6.0 | 0.00 | not_yours | dart-lang/http#2033 | A | Nothing to do; I already approved and the PR is waiting on mosuem to merge. |
| 30 | 34.0 (34) | +4.0 | 0.02 | not_yours | dart-lang/http#1365 | A | Nothing to do: the issue is in the package:http2 area, which I am not responsible for. |
| 31 | 30.3 (30–31) | -0.7 | 0.03 | not_yours | dart-lang/tools#2715 | B | Nothing to do: the review request went to the dart-ecosystem-team and to davidmorgan, who is reviewing it personally. |
| 32 | 29.3 (29–30) | -2.7 | 0.03 | not_yours | dart-lang/http#2026 | A | Nothing for me; http2 is outside my scope and the contributor asked mosuem to review. |
| 33 | 24.0 (20–26) | -9.0 ⚠️ | 0.10 | backlog (not_yours) ⚠️ | dart-lang/native#3653 | A | Nothing is asked of me; liamappelbe is assigned and leaning toward wrapping objc_msgSend in an autorelease pool instead. Skim occasionally and close or comment if the approach is dropped. |
| 34 | 21.3 (19–24) | -12.7 ⚠️ | 0.12 | elsewhere (waiting) ⚠️ | dart-lang/http#1972 | B | Work on PR dart-lang/http#1974, which claims to fix this issue, instead of this issue; the reporter has not yet answered my needs-info questions. |
| 35 | 36.0 (36) | +1.0 | 0.00 | not_yours | dart-lang/http#1841 | B | Nothing to do on this issue; any action belongs on PR dart-lang/http#2002, which is open and covers it, and I already marked this item not important. |
| 36 | 8.3 (6–10) | -27.7 ⚠️ | 0.55 | respond (not_yours) ⚠️ | dart-lang/sdk#38148 | B | Check what commit 2752d56 changed for this issue, then reply to filiph with whether it fixes the bug or how he can help narrow it down. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a certificate/TLS trust security issue that I created and am assigned to, and it has new activity: a report tying it to the October 2026 eMudhra intermediate CA compromise, with direct questions about whether Dart honors Android's blocklists. Security issues I own with any new activity rank at the top, regardless of age or the P3 label. Related issue #64644 was closed 2d ago, but I still need to confirm the state here and not leave it unknown.
- **Next action:** Review the new eMudhra CA-compromise questions on this issue, check whether dart:io on Android honors the platform blocklist and what #64644 changed, reply, and close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unanswered inline review question 21h ago, so it is blocked on me. It fixes a real release problem (new Dart packages skipped by librarian tag), and the review thread points to a likely bug in the approach. This is not a security issue, so it ranks in the 'blocking someone' band, not the top.
- **Next action:** Answer kevmoo's inline question on bump.go about CHANGELOG.md being deleted by the next generate (append to lib.Keep vs. auto-preserve in Dart clean) and update the PR accordingly.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.74
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR from a close collaborator (sigurdm) in googleapis/google-cloud-dart, a repo I'm responsible for, and no human has reviewed it yet (only the gemini bot), so I'm the default reviewer. It is a pre-release polish change that may gate the pubsub 0.1.0 release, and it is 5 days old and now behind main. It is not security-related, so it sits in the standard collaborator-review band.
- **Next action:** Review sigurdm's pubsub release-polish PR (client attribution header, CHANGELOG, pubspec, .pubignore); it has had no human review for 5 days.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in a repository I am responsible for, so I am the default reviewer; only a bot has commented. The author is a first-time contributor rather than a collaborator, which keeps it from the top of the range. It fixes a real retry bug (ABORTED never retried over REST) but changes the behavior of status.code, so it deserves careful review. It also supersedes issue #381, which ranks lower. It is not a security issue.
- **Next action:** Review PR #382 (first-time contributor) in google-cloud-dart; check the Status.code behavior change for JSON errors and its impact on retry logic and Storage.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own issue in a repository I own, and a contributor posted a concrete design proposal 4 days ago that is waiting on my feedback to move forward. It is not a security issue and not a direct blocker like unanswered PR feedback, so it sits in the 0.65-0.8 band for a contributor waiting on my reply. There is no open PR yet, so the issue itself is the thing to act on.
- **Next action:** Reply to Yusufihsangorgel's 4d-old design proposal (nullable number/string ProtoEnum): confirm the approach or flag concerns, and tell them to go ahead with a preliminary PR.

### 6. dart-lang/http#2027 → predicted 12, priority 0.40
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this 9 days ago in dart-lang/http, a repo I'm responsible for, and nobody is waiting on anyone else, so it's my own planned work. It's not about http2, so the scope note doesn't apply. It affects a core API in a widely used package, but it's a design question with no new activity and no one blocked, and it's aging, so it sits at the lower end of planned work.
- **Next action:** Decide whether to tighten Client.close semantics (track outstanding requests vs. make close async in a 2.0 release) and write up the plan or a PR.

### 7. dart-lang/http#1981 → predicted 7, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I'm assigned and said 5h ago that I've started working on this, so it's my own active planned work in a repo I'm responsible for (cupertino_http is not http2). Nobody is waiting on a reply from me and there's no open PR yet. The feature is security-adjacent (certificate pinning), but it's a feature request rather than a vulnerability, so it sits in the planned-work range rather than the security range.
- **Next action:** Finish the prototype for a server trust evaluator hook in CupertinoClient that you said you started, and share it as a skeleton PR for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.50
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator's (kevmoo) issue in a repo I'm responsible for, with a clear next step for me and no open PR covering it. Kevmoo answered my question 17 days ago and said it isn't urgent. The mid-stream error handling is a real correctness hole, because errors are silently swallowed. That puts it at the low end of the collaborator-issue band, below anything blocking someone.
- **Next action:** Decide how to handle the mid-stream SSE error frames (issue 2, silently yielding empty messages) and whether to defer incremental JSON framing, then reply to kevmoo or file a fix.

### 9. dart-lang/sdk#59846 → predicted 6, priority 0.60
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** The issue is assigned to me and I've never acted on it. Accepting NUL and \x0b in header names can cause proxy-parsing discrepancies, so it carries some security flavor. But it is a parser-strictness bug with no new activity in about 22 months and no one waiting on me, so it sits in the assigned-issue range rather than the top security tier.
- **Next action:** Decide whether to fix dart:io's header-name validation to match the RFC 9110 tchar rule (reject NUL, whitespace and other invalid bytes), or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator's issue in a repo I own. I asked kevmoo a direct design question 16 days ago and he hasn't answered, so the next move is his. It is not security-related and not urgent because manual polling already works. A design question to a close collaborator in my own repository is worth keeping visible for a possible follow-up, so it ranks above stale items but below anything I can act on now.
- **Next action:** Wait for kevmoo to answer my question on whether to switch Compute to discovery or add convenience extensions to the proto-based service operations; follow up if he stays quiet.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old but real bug (uncatchable exception crashing servers) in dart:io, which I'm cc'd on as library owner, and kevmoo, a collaborator, said he wants it fixed. It isn't a security issue, nothing has happened in 20 months, and nobody is waiting on me, though, so it stays in the low backlog range, a bit above a plain cc because of the impact and the collaborator interest. The dart-lang/sdk repo isn't one I'm formally responsible for.
- **Next action:** Triage when grooming: decide whether to take over the abandoned CL 144346 for the dart:io HttpClient unsolicited-response crash, or leave it for the team.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is my own issue in a repo I'm responsible for, but an open PR (#3763) that I authored already covers it, so the PR is the thing to act on. The issue itself has no new activity since I filed it. Ranked well below the PR and kept in the low range per the duplicate rule.
- **Next action:** Work on PR dart-lang/native#3763 (support scheduleInRunLoop:forMode:), which closes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.50
- **Ground truth:** 
- **Model:** This is an issue from a close collaborator (sigurdm) in a repo I'm responsible for, with a clear next step for me: I already commented that I'm deciding how to fix it generally. It is not security-related and nobody is waiting on a reply, but it blocks publishing google_cloud_storage 0.6.5 and google_cloud_pubsub. No new activity in 17 days, so it sits at the lower end of planned work.
- **Next action:** Decide how to handle the google_cloud_rpc version bump (e.g. librarian automation), then require the new version in google_cloud_storage and google_cloud_pubsub pubspecs.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.12
- **Ground truth:** 
- **Model:** This is a bot-authored BoringSSL revision bump in dart-lang/tools, outside my responsible repositories (only dart-lang/http). The review request is addressed to the dart-ecosystem-team, not to me personally. It is a small, routine automated change and is not a security issue, so it gets the low team-review-request score.
- **Next action:** Nothing to do; this is a team review request in dart-lang/tools, which I'm not responsible for, so leave it to the rest of dart-ecosystem-team.

### 15. googleapis/google-cloud-dart#381 → predicted 17, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue has an open PR (#382) that closes it, so the PR is the item to act on and this issue should rank well below it. The bug is real (ABORTED never retried over REST) in a repo I own, but it is not a security issue. Nothing remains to do on the issue itself.
- **Next action:** Act on PR googleapis/google-cloud-dart#382, which fixes this issue; review it there rather than on the issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http (cronet_http, not http2), and I requested goderbauer's review 2d ago with no response yet. Nothing to do until about a week has passed, then a ping is warranted. The linked issue #1932 is covered by this PR, so there is nothing to act on there.
- **Next action:** Wait for goderbauer to review; ping them around 2026-10-30 if there is still no response.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is assigned to me in a repository I'm responsible for, was filed by a close collaborator (kevmoo), and has a clear next step for me. The related retry-sharing PRs (#352, #353) have already merged, so the work is unblocked, and I last updated the scope 10d ago, so nobody is waiting on me. It's my own planned work with moderate freshness, and the HTML 502/503/504 bug is a real reliability gap but not a security issue.
- **Next action:** Implement the ServiceClient RetryRunner/RequestOptions wiring and harden ServiceException.fromHttpResponse against non-JSON error bodies.

### 18. dart-lang/http#2031 → predicted 31, priority 0.03
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** My note says I'm not responsible for http2, and although I'm named as a requested reviewer, the PR is stacked on #2014, which hasn't been reviewed. It is a tiny version and changelog bump that can't land before the lower PRs. Nothing is pressing here.
- **Next action:** Nothing to do: this is an http2 release-prep PR, which is outside my scope, and it is stacked on #2014, which is still unreviewed.

### 19. googleapis/google-cloud-dart#345 → predicted 16, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft in a repo I'm responsible for. It has been dormant for 45 days, has merge conflicts (dirty), and has 5 unresolved bot review threads. No human is waiting on it and it isn't security-related, so it sits in the 'finish or abandon' drafts range and shouldn't outrank actionable reviews.
- **Next action:** Decide whether to finish this draft DNS PR (rebase over conflicts, address the bot's 5 unresolved comments, mark ready for review) or close it.

### 20. dart-lang/core#1007 → predicted 21, priority 0.12
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core is not one of my listed repositories, and the only review request went to the dart-ecosystem-team, not to me personally. The author is a first-time contributor and the CLA check failed, so the PR is blocked until that's resolved. It does fix an issue filed by my collaborator sigurdm, which keeps it slightly above zero, but it is still only a low-priority team review request.
- **Next action:** Nothing for me now: the PR is a team review request in dart-lang/core, which is outside my stated repos, and the author hasn't signed the CLA.

### 21. dart-lang/tools#2544 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** This is a security PR (UNC path injection), but it's in dart-lang/tools, not a repository I'm responsible for. The review request went only to my team (dart-ecosystem-team), and lrhn was named personally and is actively reviewing. Per the security rules, that is not mine and is scored like a team review request with a specific reviewer present, which is near 0. It has also been quiet for about 60 days, with 6 unresolved threads waiting on the author.
- **Next action:** Nothing for me to do: this is a team review request in dart-lang/tools, which I don't own, and lrhn is already reviewing; jonasfj needs to address lrhn's feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft with no human review, so the lower PR needs attention first. The review request here is only via the dart-ecosystem-team, not me personally, though dart-lang/tools is outside my listed repositories. It's a collaborator's PR, so keep it visible but low.
- **Next action:** Review the lower stacked PR dart-lang/tools#2563 (sigstore bundle verification, still draft) first; this PR builds on it.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested a review from liamappelbe 2 days ago. They haven't responded yet, and there is no unanswered feedback for me to address. It's too early for a ping, so this stays low until about a week has passed.
- **Next action:** Wait for liamappelbe to review; ping them if there's no response by about 2026-10-30.

### 24. googleapis/google-cloud-dart#373 → predicted 25, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I own. It is approved by sigurdm, and I asked him 4 days ago whether he covered the non-PubSub parts. natebosch is also a requested reviewer and hasn't responded. Under the rules, nothing is needed until about a week of silence has passed, so it scores low. The branch is behind main and 2 review threads are unresolved, but neither is urgent right now.
- **Next action:** Wait for sigurdm to answer whether he reviewed the non-PubSub parts and for natebosch's review; ping again around Oct 28 if still silent.

### 25. dart-lang/http#579 → predicted 27, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** I'm a requested reviewer in a repository I'm responsible for, but this breaking-API PR is explicitly waiting for a future breaking release, which I said I don't have bandwidth for. The latest activity is a 14-month-old comment from a bystander asking about a workaround, with nothing directed at me. The 'stacked_below' list is only noise and doesn't make the PR stacked, so it falls in the low range for PRs waiting on a breaking release.
- **Next action:** Nothing to do now; the PR is blocked until a breaking release, so leave it until a semver-major release is planned.

### 26. dart-lang/http#1932 → predicted 15, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned, and users are asking for updates, but an open PR from me (#2034) already covers this issue, so the PR is the thing to act on. Per the duplicate rule, the issue ranks below its PR and stays in the low range. It's a build break affecting cronet_http users, so it sits at the upper end of that range.
- **Next action:** Act on PR dart-lang/http#2034 (fix(cronet): avoid cronet namespace duplication), which closes this issue; no separate action needed here.

### 27. flutter/devtools#8223 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** flutter/devtools is outside my responsible repositories, and my only involvement is an informational cc from bkonyi in 2024. Nothing is asked of me, and the recent activity is just a label change. It is a feature request with no security angle.
- **Next action:** Nothing to do; I was only CC'd on a DevTools feature request in a repository I'm not responsible for.

### 28. dart-lang/http#1837 → predicted 28, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old feature request in dart-lang/http that I already answered, saying the Dart team is unlikely to take it on and that the community can contribute. It is labeled contributions-welcome and P3 and has had no activity for about a year. Nobody is waiting on me, so it is low-priority backlog.
- **Next action:** Nothing pending; leave as a contributions-welcome P3 and revisit only if a community member picks it up.

### 29. dart-lang/http#2033 → predicted 35, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2 days ago and nothing has happened since: no new commits, no author activity, and no unresolved threads. The review decision is APPROVED and the PR is mergeable and clean. As far as I am concerned it is done.
- **Next action:** Nothing to do; I already approved and the PR is waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 34, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is labeled package:http2, and my note says I'm not responsible for http2. I was never mentioned and nothing is asked of me. It is old, with only a stale question from an outside commenter, so it is near 0.
- **Next action:** Nothing to do: the issue is in the package:http2 area, which I am not responsible for.

### 31. dart-lang/tools#2715 → predicted 30, priority 0.03
- **Ground truth:** 
- **Model:** dart-lang/tools is not a repository I am responsible for. The review request reached me only through the dart-ecosystem-team, and davidmorgan is also named as a specific reviewer. That puts it near 0. It is not a security issue, and nothing has been asked of me personally.
- **Next action:** Nothing to do: the review request went to the dart-ecosystem-team and to davidmorgan, who is reviewing it personally.

### 32. dart-lang/http#2026 → predicted 29, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR touches pkgs/http2, and I noted that I'm not responsible for http2. No review was requested from me and I was not mentioned. The author pinged mosuem for review, so this is someone else's move.
- **Next action:** Nothing for me; http2 is outside my scope and the contributor asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 26, priority 0.10
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe (not me), and he is driving it. My earlier input is already in the thread, nothing in the last 34 days is addressed to me, and the issue was reopened after the landed PR turned out to do nothing. It is in dart-lang/native, which is not one of my listed repositories, so it stays low priority.
- **Next action:** Nothing is asked of me; liamappelbe is assigned and leaning toward wrapping objc_msgSend in an autorelease pool instead. Skim occasionally and close or comment if the approach is dropped.

### 34. dart-lang/http#1972 → predicted 19, priority 0.15
- **Ground truth:** 
- **Model:** The issue is assigned to me in a repository I am responsible for, but I asked the reporter for information and have had no reply. An open PR (#1974) claims to fix it, so the PR is the item to act on and this issue ranks well below it. It is not a security issue, and there has been no new reporter activity, so it stays in the low range.
- **Next action:** Work on PR dart-lang/http#1974, which claims to fix this issue, instead of this issue; the reporter has not yet answered my needs-info questions.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** I thumbs-downed this on 2026-10-05, and nothing directed at me has happened since. The only later activity is commits from agam1092005 on 10-02, before the thumbs-down. An open PR (#2002) also covers the issue, so the PR is the thing to act on.
- **Next action:** Nothing to do on this issue; any action belongs on PR dart-lang/http#2002, which is open and covers it, and I already marked this item not important.

### 36. dart-lang/sdk#38148 → predicted 9, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm assigned this P2 bug. After my thumbs-down, filiph reported a reproducible failure on current stable and asked how to help, and a commit referencing the issue landed 4 days ago. That is new activity directed at the assignee, so the thumbs-down no longer settles it. It's not a security issue, and dart-lang/sdk is outside my listed repositories, so it ranks as assigned work to fix or unassign, not an urgent review.
- **Next action:** Check what commit 2752d56 changed for this issue, then reply to filiph with whether it fixes the bug or how he can help narrow it down.
