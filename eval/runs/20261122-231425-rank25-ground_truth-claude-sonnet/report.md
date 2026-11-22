# Gitilizer eval: rank25-ground_truth-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk6smifvq1n8sesn8rb/evalwork/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261122-231425

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.650 ± 0.021 |
| spearman | 0.783 ± 0.021 |
| pairwise_acc | 0.825 ± 0.010 |
| ndcg | 0.983 ± 0.003 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 4.389 ± 0.255 |

## Next steps (mean ± sd across trials)

Against the next step the eval set records for 36 items (PRD RANK-24). "Same side" counts a next step on the other side of "on me" as wrong, and any other as right.

| metric | value |
|---|---|
| exact | 0.815 ± 0.016 |
| same side | 0.917 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.844 ± 0.025 | 0.997 ± 0.001 | 1.000 ± 0.000 | 1.083 ± 0.144 |
| B | 20 | 0.463 ± 0.063 | 0.954 ± 0.009 | 0.467 ± 0.115 | 4.067 ± 0.404 |

## Per item

| truth | predicted (mean, range) | Δ | priority | next step (expected) | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | todo | dart-lang/sdk#48056 | A | Check whether dart:io on Android honors Android's blocklist or revocation for the compromised eMudhra intermediates (see sdk#64644). Reply to acn-masatadakurihara, then close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.84 | respond | googleapis/librarian#7808 | A | Answer kevmoo's inline question on bump.go about CHANGELOG.md being deleted by the next `librarian generate`: decide whether Bump appends it to lib.Keep or Dart clean auto-preserves it, then push the change. |
| 3 | 3.0 (3) | +0.0 | 0.72 | review | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub pre-release polish PR (attribution header, CHANGELOG, pubspec, .pubignore) — no human has reviewed it yet. |
| 4 | 4.7 (4–5) | +0.7 | 0.69 | review | googleapis/google-cloud-dart#382 | A | Review PR #382 (first-time contributor) and check that using the google.rpc.Code in Status.code for JSON errors doesn't break other consumers. |
| 5 | 4.3 (4–5) | -0.7 | 0.70 | respond | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's design sketch (nullable number/string on ProtoEnum): approve it or request changes, and clarify how unknown-name decoding should be handled before they write a PR. |
| 6 | 13.3 (11–15) | +7.3 | 0.33 | backlog (todo) ⚠️ | dart-lang/http#2027 | B | Decide whether to pursue a 2.0 breaking change making Client.close return a Future, or fix it by tracking outstanding requests; then write up a plan. |
| 7 | 6.0 (6) | -1.0 | 0.55 | todo | dart-lang/http#1981 | B | Continue the skeleton implementation of a server trust evaluator hook in CupertinoClient and post a draft PR for discussion. |
| 8 | 8.0 (8) | +0.0 | 0.52 | todo | googleapis/google-cloud-dart#360 | A | Decide whether to fix the SSE mid-stream error handling first and whether incremental JSON framing is worth doing, then reply to kevmoo and start or assign the work. |
| 9 | 11.0 (10–12) | +2.0 | 0.45 | todo 2/3, backlog 1/3 (backlog) ⚠️ | dart-lang/sdk#59846 | B | Decide whether to fix dart:io's header-name validation against the RFC 9110 tchar set, or unassign myself. |
| 10 | 11.7 (11–12) | +1.7 | 0.40 | waiting | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my question on whether to switch Compute to discovery or add convenience extensions on the service operations; follow up if there is still no reply. |
| 11 | 18.3 (16–20) | +7.3 | 0.23 | backlog (not_yours) ⚠️ | dart-lang/sdk#31275 | A | Triage when grooming: decide whether to take over the abandoned CL 144346 for dart:io HttpClient unsolicited-response crash, or close/assign it. |
| 12 | 17.0 (17) | +5.0 | 0.22 | elsewhere | dart-lang/native#3752 | B | Work on PR dart-lang/native#3763, which closes this issue; nothing to do on the issue itself. |
| 13 | 9.0 (9) | -4.0 | 0.50 | todo | googleapis/google-cloud-dart#366 | B | Decide how to enforce the google_cloud_rpc version bump (e.g. librarian automation), then require the new version in google_cloud_storage and google_cloud_pubsub before release. |
| 14 | 20.3 (20–21) | +6.3 | 0.12 | not_yours | dart-lang/tools#2719 | B | Nothing to do personally; the dart-ecosystem-team review request is shared with the team, so leave it unless someone asks me directly. |
| 15 | 14.0 (13–15) | -1.0 | 0.28 | elsewhere | googleapis/google-cloud-dart#381 | A | Review PR googleapis/google-cloud-dart#382, which fixes this issue; nothing to do on the issue itself. |
| 16 | 21.7 (21–22) | +5.7 | 0.10 | waiting | dart-lang/http#2034 | B | Wait for goderbauer to review; ping them if there is no response by about 2026-10-30. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.55 | todo (elsewhere) ⚠️ | googleapis/google-cloud-dart#359 | B | Decide on the retry/RequestOptions design and implement it, starting with the FormatException fix in ServiceException.fromHttpResponse, or unassign myself. |
| 18 | 29.0 (26–31) | +11.0 ⚠️ | 0.05 | not_yours (elsewhere) ⚠️ | dart-lang/http#2031 | A | Nothing to do: http2 is outside my scope, and this PR is stacked on #2014, which still needs my review first. |
| 19 | 16.7 (16–18) | -2.3 | 0.24 | todo | googleapis/google-cloud-dart#345 | A | Decide whether to finish this DNS draft (address the bot's 5 unresolved comments, resolve merge conflicts, mark ready for review) or close it. |
| 20 | 25.7 (25–27) | +5.7 | 0.09 | not_yours | dart-lang/core#1007 | B | Nothing to do; the review request went to the dart-ecosystem-team, not to me, and the author still needs to sign the CLA. |
| 21 | 26.0 (18–31) | +5.0 | 0.10 | not_yours | dart-lang/tools#2544 | B | Nothing for me to do: the PR is in dart-lang/tools, which I am not responsible for. Jonas is addressing lrhn's review, and the team review request is shared. |
| 22 | 23.7 (23–24) | +1.7 | 0.10 | elsewhere (not_yours) ⚠️ | dart-lang/tools#2710 | B | Review the lower PR in the stack first: dart-lang/tools#2563 ('[sigstore] Add package:sigstore for Sigstore bundle verification'); come back to #2710 after that. |
| 23 | 22.7 (22–23) | -0.3 | 0.10 | waiting | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping them if there's no response by around 2026-10-30. |
| 24 | 25.0 (24–26) | +1.0 | 0.10 | waiting | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether he reviewed the non-PubSub parts, or for natebosch to review; ping again if still silent around Oct 28. |
| 25 | 27.0 (26–28) | +2.0 | 0.08 | not_yours (backlog) ⚠️ | dart-lang/http#579 | B | Nothing to do now; the PR is blocked until a breaking-release (http 2.0) is planned, and I already said I lack bandwidth for that. |
| 26 | 14.0 (13–15) | -12.0 ⚠️ | 0.29 | elsewhere | dart-lang/http#1932 | B | Act on PR dart-lang/http#2034 (avoid cronet namespace duplication), which is linked as fixing this issue; no separate action on this issue. |
| 27 | 31.3 (30–32) | +4.3 | 0.03 | not_yours | flutter/devtools#8223 | B | Nothing to do; I was only CC'd on a DevTools feature request in a repository I'm not responsible for. |
| 28 | 28.0 (27–29) | +0.0 | 0.06 | backlog | dart-lang/http#1837 | A | Nothing pending; leave as a contributions-welcome enhancement and close or groom later if no community interest appears. |
| 29 | 34.7 (34–35) | +5.7 | 0.01 | not_yours | dart-lang/http#2033 | A | Nothing to do; I already approved and the PR is waiting on mosuem to merge. |
| 30 | 34.3 (34–35) | +4.3 | 0.02 | not_yours | dart-lang/http#1365 | A | Nothing to do; this is about the http2 package, which I'm not responsible for in dart-lang/http. |
| 31 | 26.0 (21–29) | -5.0 | 0.07 | not_yours | dart-lang/tools#2715 | B | Nothing needed from me; davidmorgan is the named reviewer on this dart-lang/tools PR, and the team request is shared. |
| 32 | 31.0 (30–32) | -1.0 | 0.03 | not_yours | dart-lang/http#2026 | A | Nothing for me; this is http2 code, outside my responsibility, and the contributor asked mosuem to review. |
| 33 | 33.0 (33) | +0.0 | 0.03 | not_yours | dart-lang/native#3653 | A | Nothing to do; liamappelbe owns this issue in dart-lang/native, and he is leaning toward wrapping each objc_msgSend call in an autorelease pool instead. |
| 34 | 18.7 (18–19) | -15.3 ⚠️ | 0.20 | elsewhere | dart-lang/http#1972 | B | Act on PR dart-lang/http#1974 (fix for #1972, open and updated today) instead of this issue; note I asked the reporter for info and they haven't replied. |
| 35 | 36.0 (36) | +1.0 | 0.00 | elsewhere | dart-lang/http#1841 | B | Review PR dart-lang/http#2002 (adds retryDelay callback to RetryClient), which covers this issue; nothing to do on the issue itself. |
| 36 | 11.0 (10–13) | -25.0 ⚠️ | 0.47 | respond | dart-lang/sdk#38148 | B | Reply to filiph's offer to help and ask for a repro for the intermittent Directory.deleteSync failure, then decide whether to fix it or unassign myself. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1972** (truth #34) in 2/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1972** (truth #34) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue (CA and TLS trust) that I created and am assigned. It has new activity: a report about the eMudhra intermediate CA compromise, plus a related issue, #64644, closed 2 days ago. Security items with new activity belong at the top of the scale. I need to confirm whether Dart is exposed and leave a clear status, however old the issue is or however low its P3 label.
- **Next action:** Check whether dart:io on Android honors Android's blocklist or revocation for the compromised eMudhra intermediates (see sdk#64644). Reply to acn-masatadakurihara, then close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unanswered inline review comment 21h ago, so I'm blocking it. It fixes google-cloud-dart#358, a release-tagging bug for new packages, and the PR is blocked on review. The librarian repo isn't listed as one I own, but the unanswered feedback on my own PR keeps it high.
- **Next action:** Answer kevmoo's inline question on bump.go about CHANGELOG.md being deleted by the next `librarian generate`: decide whether Bump appends it to lib.Keep or Dart clean auto-preserves it, then push the change.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR from a close collaborator (sigurdm) in googleapis/google-cloud-dart, a repo I'm responsible for, and only a bot has reviewed it so I'm the default reviewer. It's a small, pre-release change that likely gates the pubsub 0.1.0 publish, and it has sat unreviewed for 5 days. It's not security-related and is a bit behind main, so it fits the reviews-waiting range rather than the blocking range.
- **Next action:** Review sigurdm's pubsub pre-release polish PR (attribution header, CHANGELOG, pubspec, .pubignore) — no human has reviewed it yet.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, where I am the default reviewer; only a bot has commented. It changes error semantics in a core package so ABORTED can be retried over REST. The author is a first-time contributor rather than a collaborator, so it sits mid-range among reviews, and it is 3 days old. It is a correctness fix rather than a security issue, and the linked issue #381 defers to this PR.
- **Next action:** Review PR #382 (first-time contributor) and check that using the google.rpc.Code in Status.code for JSON errors doesn't break other consumers.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug in googleapis/google-cloud-dart, a repo I'm responsible for, and a contributor posted a concrete design proposal 4 days ago that is waiting on my feedback. They asked for agreement on the approach before writing code, so my reply unblocks them. It's a non-security bug with an active contributor, so it fits the 0.65-0.8 band for a contributor waiting on my reply.
- **Next action:** Reply to Yusufihsangorgel's design sketch (nullable number/string on ProtoEnum): approve it or request changes, and clarify how unknown-name decoding should be handled before they write a PR.

### 6. dart-lang/http#2027 → predicted 11, priority 0.40
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this design issue in dart-lang/http, which I'm responsible for (it isn't about http2). It's now 9 days old with no new activity and nobody is waiting on me. It's my own planned work, but it's a design discussion with a potential breaking change, so it isn't pressing and is sinking as it ages.
- **Next action:** Decide whether to pursue a 2.0 breaking change making Client.close return a Future, or fix it by tracking outstanding requests; then write up a plan.

### 7. dart-lang/http#1981 → predicted 6, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself this issue in dart-lang/http (cupertino_http, not http2) and said just 5h ago that I've started working on it, so it is my own fresh planned work and nobody is waiting on me. It is not a security bug report but a feature request for certificate pinning support. Once a draft PR is opened, the PR will become the item to act on and this issue should drop.
- **Next action:** Continue the skeleton implementation of a server trust evaluator hook in CupertinoClient and post a draft PR for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 8, priority 0.50
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator's (kevmoo) issue in a repo I'm responsible for, with a clear next step for me. The silent swallowing of mid-stream SSE errors is a real correctness bug in generated clients. He says it isn't urgent and the last reply answered my question, so it sits at the low end of the 0.5–0.65 band. No PR covers it yet, since #339 is a different pubsub change.
- **Next action:** Decide whether to fix the SSE mid-stream error handling first and whether incremental JSON framing is worth doing, then reply to kevmoo and start or assign the work.

### 9. dart-lang/sdk#59846 → predicted 10, priority 0.45
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** The issue is assigned to me and has had no activity for 22 months. dart-lang/sdk isn't a repository I'm responsible for, but dart:io is widely used. Accepting NUL and whitespace in header names can cause proxy and request-smuggling problems, so it is security-adjacent and shouldn't be dropped just because it is old. With no new activity and no one waiting on me, it ranks as an assigned issue to fix or unassign, not as urgent security work.
- **Next action:** Decide whether to fix dart:io's header-name validation against the RFC 9110 tchar set, or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator's issue in a repo I own. I asked kevmoo a design question 16 days ago and he hasn't replied, so it's his move. It isn't security-related and no PR covers it yet, so it sits in the range for recent questions I'm waiting on in my own repo, though I may need to follow up soon.
- **Next action:** Wait for kevmoo to answer my question on whether to switch Compute to discovery or add convenience extensions on the service operations; follow up if there is still no reply.

### 11. dart-lang/sdk#31275 → predicted 20, priority 0.20
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was only CC'd (twice, including by collaborator kevmoo) on a 9-year-old bug in dart:io, which I'm said to own as the library's owner, and there is no activity in 20 months. It's a real crash bug in widely used code with a known patch idea, so it's above pure noise, but nothing is pressing and no one is waiting on me. It is not in my listed repositories, so it stays in the low backlog range.
- **Next action:** Triage when grooming: decide whether to take over the abandoned CL 144346 for dart:io HttpClient unsolicited-response crash, or close/assign it.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** The issue has an open PR (#3763, mine, updated 2d ago) that fixes it, so the PR is the thing to act on. There has been no new activity on the issue since I filed it. It is a real bug that blocks other NSURLSession requests, but it is not a security problem, so it stays low in the range for issues covered by a PR.
- **Next action:** Work on PR dart-lang/native#3763, which closes this issue; nothing to do on the issue itself.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.50
- **Ground truth:** 
- **Model:** This is in a repo I'm responsible for, filed by a close collaborator (sigurdm), and I said I was deciding how to fix it, so it's mine to move forward. It blocks publishing google_cloud_storage 0.6.5 and google_cloud_pubsub, but nobody is waiting on a reply and there's been no activity in 17 days. It is not a security issue and has no linked open PR, so it sits in the middle of the planned-work range.
- **Next action:** Decide how to enforce the google_cloud_rpc version bump (e.g. librarian automation), then require the new version in google_cloud_storage and google_cloud_pubsub before release.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.12
- **Ground truth:** 
- **Model:** This is a bot-authored BoringSSL revision bump in dart-lang/tools, a repository I'm not responsible for. The only review request is to dart-ecosystem-team, which I belong to but have no note for, and nobody has asked me personally. It's a routine automated update with a small diff and no sign of a security problem, so it gets low priority.
- **Next action:** Nothing to do personally; the dart-ecosystem-team review request is shared with the team, so leave it unless someone asks me directly.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a bug in google_cloud_rpc, a repository I'm responsible for. ABORTED errors are never retried over REST, so the issue is real. It has an open PR (#382) that closes it, so the PR is the thing to act on and the issue ranks below it. Nothing is security-related.
- **Next action:** Review PR googleapis/google-cloud-dart#382, which fixes this issue; nothing to do on the issue itself.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http (cronet, not http2, so in scope), and I requested review from goderbauer 2 days ago with no response yet. Nothing to do until about a week has passed. It fixes issue #1932, so the PR is the item to act on, but it is quiet and waiting on the reviewer.
- **Next action:** Wait for goderbauer to review; ping them if there is no response by about 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned this issue, which kevmoo (a close collaborator) filed in a repo I own, and I've already started on it by gathering retry examples and trimming the scope. No one is waiting on a reply from me and there is no open PR yet, so it's my planned work. The FormatException bug on 502/503/504 responses is a concrete, fixable reliability problem across all generated clients. It has been quiet for 10 days, so it sits in the middle of the planned-work range.
- **Next action:** Decide on the retry/RequestOptions design and implement it, starting with the FormatException fix in ServiceException.fromHttpResponse, or unassign myself.

### 18. dart-lang/http#2031 → predicted 31, priority 0.03
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** The PR is in dart-lang/http, where I am not responsible for http2, though I am a named reviewer. It is also stacked on #2014, which is unreviewed and also requests my review, so this release-prep PR is blocked until the lower PRs land. It is a tiny version and changelog bump with no urgency.
- **Next action:** Nothing to do: http2 is outside my scope, and this PR is stacked on #2014, which still needs my review first.

### 19. googleapis/google-cloud-dart#345 → predicted 16, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft in a repository I'm responsible for, so I should either finish it or abandon it. It has been quiet for 45 days, has merge conflicts (dirty), and 5 unresolved bot review threads. Nobody is waiting on me and it is not security-related, so it sits in the low 'finish or abandon' range.
- **Next action:** Decide whether to finish this DNS draft (address the bot's 5 unresolved comments, resolve merge conflicts, mark ready for review) or close it.

### 20. dart-lang/core#1007 → predicted 25, priority 0.10
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core is not a repository I'm responsible for. The review request went to a team I belong to, with no note from me, so it isn't addressed to me personally. The author is a first-time contributor and the CLA check failed, so the PR can't move forward yet.
- **Next action:** Nothing to do; the review request went to the dart-ecosystem-team, not to me, and the author still needs to sign the CLA.

### 21. dart-lang/tools#2544 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is a security PR (UNC path injection) in dart-lang/tools, which is not one of my repositories. The review request goes to dart-ecosystem-team, not to me personally, and lrhn is already reviewing it with 6 unresolved threads. By the security rules, a security PR in a repo I'm not responsible for with another reviewer active scores like any other team review request. It is low, though not zero, because of the security topic and because package_config is widely used.
- **Next action:** Nothing for me to do: the PR is in dart-lang/tools, which I am not responsible for. Jonas is addressing lrhn's review, and the team review request is shared.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still an unreviewed draft, so the lower PR needs review first. The only review request is to dart-ecosystem-team, which is not addressed to me personally, and I have no activity here. It is a collaborator's PR in a repository I'm not responsible for, so it's low priority until the base lands.
- **Next action:** Review the lower PR in the stack first: dart-lang/tools#2563 ('[sigstore] Add package:sigstore for Sigstore bundle verification'); come back to #2710 after that.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested review from liamappelbe 2d ago, with no response yet. There's nothing for me to do until about a week has passed. It fixes two open issues (#3750 and #3752), which adds a little importance, but the issues rank below this PR.
- **Next action:** Wait for liamappelbe to review; ping them if there's no response by around 2026-10-30.

### 24. googleapis/google-cloud-dart#373 → predicted 26, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I own. It is approved by sigurdm, and I asked him 4 days ago whether it can merge without natebosch reviewing it, so nothing is waiting on me. The branch is behind main and 2 threads are unresolved, but I recently asked for the review so it stays low until about a week has passed.
- **Next action:** Wait for sigurdm to answer whether he reviewed the non-PubSub parts, or for natebosch to review; ping again if still silent around Oct 28.

### 25. dart-lang/http#579 → predicted 27, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** I am a requested reviewer in a repo I own, but the PR is labeled next-breaking-release and I stated in 2024 that it must wait for a semver-major release. It has been dormant for over a year, with only a user asking about workarounds. That puts it in the low range for PRs waiting on a future breaking release.
- **Next action:** Nothing to do now; the PR is blocked until a breaking-release (http 2.0) is planned, and I already said I lack bandwidth for that.

### 26. dart-lang/http#1932 → predicted 15, priority 0.28
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned and users keep asking for updates, but an open PR of mine (dart-lang/http#2034, updated 2d ago) already covers this issue, so the PR is the item to act on. The issue is in cronet_http, which is in a repo I own and is not the http2 area. Per the duplicate rule it ranks below the PR, in the low range.
- **Next action:** Act on PR dart-lang/http#2034 (avoid cronet namespace duplication), which is linked as fixing this issue; no separate action on this issue.

### 27. flutter/devtools#8223 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** flutter/devtools is outside my listed repositories. I was only informationally CC'd by bkonyi two years ago and nothing has been asked of me since. The recent activity was a label change, and it is an ordinary feature request, not a security issue.
- **Next action:** Nothing to do; I was only CC'd on a DevTools feature request in a repository I'm not responsible for.

### 28. dart-lang/http#1837 → predicted 28, priority 0.06
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old P3 enhancement marked contributions-welcome in dart-lang/http, a repo I'm responsible for. I already replied that the Dart team won't take it on and invited community work, and there has been no activity for about a year. Nothing is waiting on me, so it's low-priority backlog.
- **Next action:** Nothing pending; leave as a contributions-welcome enhancement and close or groom later if no community interest appears.

### 29. dart-lang/http#2033 → predicted 35, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2 days ago and there has been no activity since, with no new commits or comments. The PR is clean and mergeable, so it is done as far as I am concerned.
- **Next action:** Nothing to do; I already approved and the PR is waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 34, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is labeled package:http2, and my note says I'm not responsible for http2. I was never mentioned or asked to act. It is old, and the latest comment is only a general question about closing it.
- **Next action:** Nothing to do; this is about the http2 package, which I'm not responsible for in dart-lang/http.

### 31. dart-lang/tools#2715 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** dart-lang/tools is not one of my responsible repositories. The review request went to dart-ecosystem-team, which I belong to but have no note for, and davidmorgan is also named personally as the reviewer. That makes it near 0 under the team-request rule, though kevmoo is a collaborator and it is fresh, so I'm giving it a small non-zero score.
- **Next action:** Nothing needed from me; davidmorgan is the named reviewer on this dart-lang/tools PR, and the team request is shared.

### 32. dart-lang/http#2026 → predicted 30, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR is in dart-lang/http, but my note says I'm not responsible for http2, and this one touches only pkgs/http2. The author addressed mosuem for review, and I wasn't mentioned or asked to review. It isn't a security issue, so there's nothing for me to act on.
- **Next action:** Nothing for me; this is http2 code, outside my responsibility, and the contributor asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 33, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** dart-lang/native is not a repository I am responsible for, and liamappelbe is assigned and driving the discussion. My last comment was 37 days ago, and the later comments are from mkustermann and mraleph, with nothing asked of me. The thread has been quiet for 34 days and the related autorelease issue is closed.
- **Next action:** Nothing to do; liamappelbe owns this issue in dart-lang/native, and he is leaning toward wrapping each objc_msgSend call in an autorelease pool instead.

### 34. dart-lang/http#1972 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** An open PR (#1974) claims to fix this issue, so the PR is the item to act on and the issue ranks below it. The issue also has a needs-info label with no reply from the reporter after I asked questions 8 days ago. Nothing else for me to do on the issue itself until the PR is reviewed or the reporter answers.
- **Next action:** Act on PR dart-lang/http#1974 (fix for #1972, open and updated today) instead of this issue; note I asked the reporter for info and they haven't replied.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** The issue has an open PR (#2002) that fixes it, so the PR is the item to act on. I also marked this issue thumbs-down on 2026-10-05, and since then there has been no new activity directed at me. Score it 0.0.
- **Next action:** Review PR dart-lang/http#2002 (adds retryDelay callback to RetryClient), which covers this issue; nothing to do on the issue itself.

### 36. dart-lang/sdk#38148 → predicted 13, priority 0.40
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I thumbed this down on 2026-08-01, but filiph has since commented with a local repro and offered to help. That is new activity on an issue assigned to me, so it should be judged again. Someone is waiting on my reply, but it is an old intermittent bug in dart-lang/sdk, which isn't one of my listed repositories, so it sits below my active work.
- **Next action:** Reply to filiph's offer to help and ask for a repro for the intermittent Directory.deleteSync failure, then decide whether to fix it or unassign myself.
