# Gitilizer eval: base-claude

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261118-144332

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.612 ± 0.020 |
| spearman | 0.771 ± 0.030 |
| pairwise_acc | 0.806 ± 0.010 |
| ndcg | 0.978 ± 0.005 |
| ndcg@5 | 0.999 ± 0.001 |
| top3_overlap | 0.778 ± 0.192 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.667 ± 0.058 |
| mean_abs_displacement | 4.944 ± 0.289 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.833 ± 0.000 | 0.997 ± 0.000 | 1.000 ± 0.000 | 1.125 ± 0.000 |
| B | 20 | 0.411 ± 0.048 | 0.933 ± 0.016 | 0.333 ± 0.115 | 4.200 ± 0.346 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Answer the eMudhra question: check whether dart:io on Android honors the platform blocklist/revocation, coordinate with the closed #64644 fix, then reply and close or follow up. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's inline question about CHANGELOG.md being deleted by `librarian generate`, and decide whether Bump should append CHANGELOG.md to lib.Keep or Dart clean should auto-preserve it. |
| 3 | 3.7 (3–4) | +0.7 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub release-polish PR (client attribution header, CHANGELOG, pubspec, .pubignore); it is behind main, so ask for a rebase if needed. |
| 4 | 5.0 (5) | +1.0 | 0.68 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR from a first-time contributor, then update the branch (it is behind main) and merge or request changes. |
| 5 | 3.3 (3–4) | -1.7 | 0.71 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's latest design sketch: approve or adjust the nullable number/string ProtoEnum approach and say whether to proceed with a preliminary PR. |
| 6 | 12.0 (11–13) | +6.0 | 0.47 | 3/3 | dart-lang/http#2027 | B | Decide on a direction for Client.close (track active requests vs. async close in a 2.0 release) and post a concrete proposal or start a prototype PR. |
| 7 | 10.7 (10–11) | +3.7 | 0.51 | 3/3 | dart-lang/http#1981 | B | Continue the skeleton implementation of the server trust evaluator hook in CupertinoClient, and post a draft PR for discussion. |
| 8 | 8.3 (8–9) | +0.3 | 0.55 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo's answer and decide whether to fix the mid-stream SSE error handling (a real bug) or scope the incremental JSON part down or out. |
| 9 | 12.0 (10–14) | +3.0 | 0.52 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header-name validation (reject non-tchar characters) or unassign myself. |
| 10 | 13.3 (13–14) | +3.3 | 0.44 | 3/3 | googleapis/google-cloud-dart#361 | A | Check whether kevmoo has replied to my 16-day-old question (discovery vs. convenience extensions for Compute LROs) and, if not, follow up with him to decide the approach. |
| 11 | 19.7 (19–20) | +8.7 | 0.20 | 0/3 | dart-lang/sdk#31275 | A | Nothing urgent; optionally triage later whether to take over the abandoned CL 144346 for the HttpClient 408 unsolicited-response crash. |
| 12 | 17.3 (17–18) | +5.3 | 0.25 | 2/3 | dart-lang/native#3752 | B | Work on the linked PR dart-lang/native#3763, which fixes this issue; nothing to do on the issue itself. |
| 13 | 9.3 (9–10) | -3.7 | 0.54 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide on a fix approach (librarian automation vs manual), and if not automating, bump google_cloud_rpc and update the storage and pubsub pubspecs and CHANGELOG before release. |
| 14 | 20.7 (20–21) | +6.7 | 0.13 | 2/3 | dart-lang/tools#2719 | B | Optionally review this automated BoringSSL revision bump if the team hasn't picked it up; otherwise leave it for another team member. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 3/3 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of this issue; it fixes this and will close it when merged. |
| 16 | 22.3 (22–23) | +6.3 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping again if no response after about a week (around 2026-10-30). |
| 17 | 7.3 (7–8) | -9.7 ⚠️ | 0.55 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the ServiceClient retry and RequestOptions changes, including the FormatException fix in ServiceException.fromHttpResponse, or unassign myself if I won't get to it. |
| 18 | 27.3 (27–28) | +9.3 ⚠️ | 0.08 | 0/3 | dart-lang/http#2031 | A | Nothing yet: review the lower stacked PR #2014 (my review is requested there) before this release-prep PR. |
| 19 | 18.3 (18–19) | -0.7 | 0.23 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft (resolve the 5 bot review threads, rebase to fix conflicts, mark ready) or close it. |
| 20 | 6.0 (6) | -14.0 ⚠️ | 0.65 | 3/3 | dart-lang/core#1007 | B | Review this first-time contributor's small isWithin fix in pkgs/path, noting the CLA check has failed and must be signed before merging. |
| 21 | 32.3 (31–33) | +11.3 ⚠️ | 0.03 | 0/3 | dart-lang/tools#2544 | B | Nothing to do; jonasfj needs to address lrhn's review feedback, and lrhn is the named reviewer. |
| 22 | 26.0 (25–27) | +4.0 | 0.09 | 0/3 | dart-lang/tools#2710 | B | Nothing yet: review the base PR dart-lang/tools#2563 first; this PR is stacked on it and waits until that is reviewed. |
| 23 | 23.3 (23–24) | +0.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping again if no response after about a week (around 2026-10-30). |
| 24 | 18.3 (15–21) | -5.7 | 0.21 | 3/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm's reply on the non-PubSub parts; if he doesn't respond, ping natebosch, then merge the branch (currently behind main) once approved. |
| 25 | 25.7 (24–28) | +0.7 | 0.09 | 0/3 | dart-lang/http#579 | B | Nothing to do now; this is blocked on a semver-major release, which I said I don't have bandwidth for. Revisit when planning http 2.0. |
| 26 | 15.7 (15–17) | -10.3 ⚠️ | 0.28 | 0/3 | dart-lang/http#1932 | B | Nothing on the issue itself; drive PR dart-lang/http#2034 (cronet namespace fix) instead. |
| 27 | 29.3 (29–30) | +2.3 | 0.05 | 0/3 | flutter/devtools#8223 | B | Nothing to do; I was only CC'd on a feature request in flutter/devtools, which I don't own. Revisit only if someone asks me directly. |
| 28 | 31.3 (31–32) | +3.3 | 0.04 | 0/3 | dart-lang/http#1837 | A | Nothing to do; waiting for a community contributor to pick this up. |
| 29 | 34.0 (34) | +5.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing to do; I already approved and am waiting on mosuem to merge. |
| 30 | 35.0 (35) | +5.0 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do; this is an http2 package issue, which is outside my stated responsibility. |
| 31 | 24.3 (22–26) | -6.7 | 0.09 | 0/3 | dart-lang/tools#2715 | B | Nothing needed; davidmorgan is the named reviewer, and the team review request is shared with the rest of the team. |
| 32 | 32.3 (32–33) | +0.3 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing for me to do; this is http2 code I'm not responsible for, and the contributor asked mosuem to review. |
| 33 | 29.7 (29–30) | -3.3 | 0.05 | 0/3 | dart-lang/native#3653 | A | Nothing needed now; the issue is assigned to liamappelbe, who is leaning toward wrapping objc_msgSend calls in autorelease pools instead. |
| 34 | 26.0 (24–28) | -8.0 | 0.09 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions about the client and the scenario; the open PR #1974 is the thing to look at in the meantime. |
| 35 | 36.0 (36) | +1.0 | 0.00 | 0/3 | dart-lang/http#1841 | B | Nothing to do on the issue; any review effort belongs on PR #2002. |
| 36 | 11.0 (7–14) | -25.0 ⚠️ | 0.50 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's offer to help by asking for a minimal repro, then investigate the intermittent recursive-delete failure that the Oct 21 commit may have touched. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue I created and am assigned to (CA/TLS trust problem). It has new activity: a question about whether Dart honors Android's blocklist after the eMudhra intermediate CA compromise, plus a pointer to a related fix in #64644. Security issues with new activity must not be left in an unknown state, so I should confirm the status and respond, even though the issue is old and labeled P3.
- **Next action:** Answer the eMudhra question: check whether dart:io on Android honors the platform blocklist/revocation, coordinate with the closed #64644 fix, then reply and close or follow up.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unanswered inline review comment 21h ago. The point is substantive: the new CHANGELOG.md would be deleted on the next generate. The PR also fixes google-cloud-dart#358, which blocks first-release tagging of new packages. Unresolved feedback on my own PR means I'm blocking progress. It isn't a security issue, so it stays in the 0.8-0.9 band.
- **Next action:** Reply to kevmoo's inline question about CHANGELOG.md being deleted by `librarian generate`, and decide whether Bump should append CHANGELOG.md to lib.Keep or Dart clean should auto-preserve it.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in googleapis/google-cloud-dart, where I'm the default reviewer. It's from a close collaborator (sigurdm), and the only review so far is from a bot, so no human has looked at it in 5 days. It looks like pre-release polish for pubsub that may block the 0.1.0 publish. It isn't security-related, so it sits in the middle of the 'reviews waiting on me' band.
- **Next action:** Review sigurdm's pubsub release-polish PR (client attribution header, CHANGELOG, pubspec, .pubignore); it is behind main, so ask for a rebase if needed.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I'm responsible for, so I'm the default reviewer. Only a bot has commented, and bots don't count. The author is a first-time contributor, so it ranks below collaborators' PRs. The change affects error handling and retry behavior across REST clients, and it changes the value of status.code for JSON errors. It also closes issue #381, which is covered by this PR. It's not a security issue.}
- **Next action:** Review this PR from a first-time contributor, then update the branch (it is behind main) and merge or request changes.

### 5. googleapis/google-cloud-dart#252 → predicted 3, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** I filed this bug in a repo I own, and an external contributor is now waiting on my reply to move forward. They posted a concrete design 4 days ago, and my last comment asked for exactly this, so I'm unblocking them. It is not security and it is not a crash, which keeps it below reviews of urgent items, but a contributor waiting on me puts it in the 0.65-0.8 band.
- **Next action:** Reply to Yusufihsangorgel's latest design sketch: approve or adjust the nullable number/string ProtoEnum approach and say whether to proceed with a preliminary PR.

### 6. dart-lang/http#2027 → predicted 11, priority 0.50
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this myself nine days ago in dart-lang/http, a repository I'm responsible for, and nothing is waiting on anyone else. That makes it my own planned work, and the issue is still fairly fresh. It concerns the semantics of a core API, but it is not a security issue and no one is blocked. It has had no activity since filing, so it should sit mid-range and sink as it ages.
- **Next action:** Decide on a direction for Client.close (track active requests vs. async close in a 2.0 release) and post a concrete proposal or start a prototype PR.

### 7. dart-lang/http#1981 → predicted 10, priority 0.52
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is a non-security feature request in dart-lang/http (cupertino_http, not http2), so it's in scope. I assigned myself and said 5h ago that I've started working on it, which makes it a fresh commitment I should follow through on. Nobody else is blocked and there's no PR yet, so it ranks as my own planned work (0.5-0.65) rather than a review or blocker. Although it relates to certificate pinning, it is a feature request for an opt-in hook, not a vulnerability, so the security tier doesn't apply.
- **Next action:** Continue the skeleton implementation of the server trust evaluator hook in CupertinoClient, and post a draft PR for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 8, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator's (kevmoo) issue in a repo I'm responsible for, with a clear next step: I asked a question, he answered, and the next move is mine. Part 2 is a real correctness bug, since mid-stream errors are silently turned into empty messages. It is not security, and kevmoo says it isn't urgent, and it has been quiet for 17 days with no open PR. That puts it in the middle of the 'collaborator issue with a clear next step' range.
- **Next action:** Reply to kevmoo's answer and decide whether to fix the mid-stream SSE error handling (a real bug) or scope the incremental JSON part down or out.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is a security-adjacent issue: the parser accepts NUL and whitespace characters in header names, which can enable request smuggling or proxy confusion. It is assigned to me, so the next step is mine. It has had no new activity in 22 months, which counts against ordinary bugs, but the security angle and my assignment keep it in the 'fix or unassign' range. It is not at the security top tier because there is no new activity and no one is waiting on me.
- **Next action:** Decide whether to fix the dart:io header-name validation (reject non-tchar characters) or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.42
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in my repository, was filed by close collaborator kevmoo, and my last comment was an unanswered design question, so it is a recent question I'm waiting on. It isn't a security matter and it isn't blocking anyone urgently, but it affects the design of generated Compute libraries and the open decision shouldn't stall. It belongs in the 0.35–0.5 band, since I am waiting on a reply rather than being asked to act.
- **Next action:** Check whether kevmoo has replied to my 16-day-old question (discovery vs. convenience extensions for Compute LROs) and, if not, follow up with him to decide the approach.

### 11. dart-lang/sdk#31275 → predicted 19, priority 0.20
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a 9-year-old bug in dart-lang/sdk, a repo I'm not responsible for, where I was only CC'd twice (once by kevmoo, a collaborator). The bug is real since it crashes servers with an uncatchable exception, but it is not a security issue and there has been no activity directed at me for about 20 months. It deserves slightly more than an ordinary old CC because of its impact on dart:io users, but it's still low priority.
- **Next action:** Nothing urgent; optionally triage later whether to take over the abandoned CL 144346 for the HttpClient 408 unsolicited-response crash.

### 12. dart-lang/native#3752 → predicted 17, priority 0.25
- **Ground truth:** 
- **Model:** This is my own issue, but an open PR (#3763, also mine) already covers it, so the PR is the thing to act on and the issue should rank well below it. It is a real bug (blocks the shared NSURLSession thread), but with no new activity in 6 days there is nothing left to do on the issue itself. It belongs in the low range for issues that have a covering PR.
- **Next action:** Work on the linked PR dart-lang/native#3763, which fixes this issue; nothing to do on the issue itself.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.55
- **Ground truth:** 
- **Model:** This is a collaborator's (sigurdm) issue in a repository I'm responsible for, with a clear next step that sits with me: I said I was deciding how to fix it in general and haven't followed up in 17 days. It blocks correct releases of google_cloud_storage 0.6.5 and google_cloud_pubsub, but nothing is actively on fire, and it is not a security matter. No open PR covers it, so it ranks as my own planned work rather than something urgent.
- **Next action:** Decide on a fix approach (librarian automation vs manual), and if not automating, bump google_cloud_rpc and update the storage and pubsub pubspecs and CHANGELOG before release.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.14
- **Ground truth:** 
- **Model:** This is a bot-generated BoringSSL revision bump in dart-lang/tools, a repo I'm not responsible for. The review request went to dart-ecosystem-team, not to me personally, so it's low priority. The change is tiny (+6/-2 across a changelog, pubspec and revision file) and CI checks look healthy. Nothing in it is flagged as a security fix.
- **Next action:** Optionally review this automated BoringSSL revision bump if the team hasn't picked it up; otherwise leave it for another team member.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is an issue in googleapis/google-cloud-dart, a repo I'm responsible for, and it has an open PR (#382) that closes it. Per the duplicate rule, the PR is the thing to act on, so this issue ranks well below it. The bug is real: ABORTED errors are never retried over REST. It is a correctness problem, not a security issue, so it stays in the low range.
- **Next action:** Review PR #382 instead of this issue; it fixes this and will close it when merged.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR, and I asked goderbauer for review 2 days ago with no response yet. The rule is to wait about a week before pinging, so it is low priority for now. It's in cronet_http, which is not http2, so it is in scope. It also fixes issue #1932, which should rank below this PR.
- **Next action:** Wait for goderbauer to review; ping again if no response after about a week (around 2026-10-30).

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is assigned to me, was filed by my collaborator kevmoo in a repo I own, and has a clear next step. It's not a security issue and nobody is waiting on me right now; my last comment was 10 days ago. It's planned work, so it sits in the 0.5-0.65 band. The FormatException bug on gateway errors raises its importance a bit, but it's ordinary reliability work and there is no open PR yet.
- **Next action:** Implement the ServiceClient retry and RequestOptions changes, including the FormatException fix in ServiceException.fromHttpResponse, or unassign myself if I won't get to it.

### 18. dart-lang/http#2031 → predicted 27, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release-prep PR is stacked on #2010, #2014 and #2009. #2014 has not been reviewed yet, so this PR is blocked until the lower PRs are sorted out. My review is requested by name, but it is http2, which I'm not responsible for, and it is only a trivial version and changelog bump. It stays low priority until the stack below it lands.
- **Next action:** Nothing yet: review the lower stacked PR #2014 (my review is requested there) before this release-prep PR.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.22
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft in a repo I'm responsible for, and it has been dormant for 45 days. The only review is from a bot, with 5 unresolved threads, and the merge state is dirty. Nobody else is blocked on it, so it sits in the 'finish or abandon' tier, and the staleness keeps it toward the lower end.
- **Next action:** Decide whether to finish this draft (resolve the 5 bot review threads, rebase to fix conflicts, mark ready) or close it.

### 20. dart-lang/core#1007 → predicted 6, priority 0.68
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core is not on my explicit list, but the repo_interest_filter is None and the request went only to my team. The PR also closes issue #537 filed by my collaborator sigurdm, which makes it more relevant. No one has reviewed it in 15 days, so I'm effectively the default reviewer. The author is a first-time contributor, which lowers the rank below collaborator PRs, and the failed CLA check could block merging. The change is small (+33 lines), so a review is cheap.
- **Next action:** Review this first-time contributor's small isWithin fix in pkgs/path, noting the CLA check has failed and must be signed before merging.

### 21. dart-lang/tools#2544 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** This is a security PR, but it is in dart-lang/tools, which I'm not responsible for. The review request went to the dart-ecosystem-team, not to me personally. lrhn was requested explicitly and is already reviewing, and the ball is with the author on 6 unresolved threads. A team review request with another named reviewer is near 0, and the PR has been quiet for about 2 months.
- **Next action:** Nothing to do; jonasfj needs to address lrhn's review feedback, and lrhn is the named reviewer.

### 22. dart-lang/tools#2710 → predicted 26, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft with no human review, so the lower PR needs review first. The review request went to dart-ecosystem-team rather than to me personally, and dart-lang/tools is not a repository I'm responsible for. It comes from my collaborator mosuem and has security-adjacent content (sigstore provenance), but it is not a security issue or fix awaiting me, so this stays low.
- **Next action:** Nothing yet: review the base PR dart-lang/tools#2563 first; this PR is stacked on it and waits until that is reviewed.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested review from liamappelbe 2 days ago, with no response yet. Nothing to act on until about a week passes, so it stays low. It also closes two open issues (#3750, #3752), but those are covered by this PR, so the PR is the thing to track.
- **Next action:** Wait for liamappelbe to review; ping again if no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 21, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, approved by sigurdm 6d ago (his review covered the PubSub parts). I asked sigurdm 4d ago whether he reviewed the rest, and natebosch is still the requested reviewer. Nothing has come back, and I recently asked for review, so I should wait. Merging needs either sigurdm's answer or natebosch's review. The branch is behind main, so I'll need to update it before merging. Since I'm waiting on a reply to a recent ping, it ranks low.
- **Next action:** Wait for sigurdm's reply on the non-PubSub parts; if he doesn't respond, ping natebosch, then merge the branch (currently behind main) once approved.

### 25. dart-lang/http#579 → predicted 24, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** I'm a requested reviewer in a repo I own, but the PR is labeled next-breaking-release and I already said it has to wait for a major release. Reviewing it now would not move it forward. The latest comment is only a user asking about workarounds, not a question that blocks anyone. It is old and from a first-time contributor, so it belongs in the low backlog range.
- **Next action:** Nothing to do now; this is blocked on a semver-major release, which I said I don't have bandwidth for. Revisit when planning http 2.0.

### 26. dart-lang/http#1932 → predicted 15, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned and a user asked for an update 4 days ago, and this is a build break for cronet_http users. But my own open PR #2034 already targets this issue, so the PR is the thing to act on and the issue should rank below it. Not a security issue, so it stays in the 0.15–0.35 range for issues covered by a PR.
- **Next action:** Nothing on the issue itself; drive PR dart-lang/http#2034 (cronet namespace fix) instead.

### 27. flutter/devtools#8223 → predicted 29, priority 0.06
- **Ground truth:** 
- **Model:** This is a feature request in a repository I'm not responsible for. My only involvement is an informational CC from bkonyi two years ago. The recent activity (a label change and a GSoC question addressed to bkonyi) doesn't ask anything of me. It's an old enhancement request with no security angle, so it belongs near the bottom of the list, just above items with nothing at all for me.
- **Next action:** Nothing to do; I was only CC'd on a feature request in flutter/devtools, which I don't own. Revisit only if someone asks me directly.

### 28. dart-lang/http#1837 → predicted 31, priority 0.04
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old feature request from a stranger in dart-lang/http. I already replied a year ago that the Dart team won't take it on, labeled it contributions-welcome and P3, and nothing has happened since. It's not a security issue, and no new activity is directed at me.
- **Next action:** Nothing to do; waiting for a community contributor to pick this up.

### 29. dart-lang/http#2033 → predicted 34, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2 days ago and there has been no new activity or commits since. The change is small CI infrastructure in a collaborator's PR, and the PR is clean and mergeable, so it is done as far as I am concerned.
- **Next action:** Nothing to do; I already approved and am waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** My note says I'm not responsible for http2, and this issue is labeled package:http2. I was never mentioned or asked to act, and the latest comment from a stranger is a general question 8 months ago. The thread is also old and likely a Dio adapter or socket problem rather than a bug in the http2 package.
- **Next action:** Nothing to do; this is an http2 package issue, which is outside my stated responsibility.

### 31. dart-lang/tools#2715 → predicted 25, priority 0.08
- **Ground truth:** 
- **Model:** dart-lang/tools is not a repository I'm responsible for. My only link is the dart-ecosystem-team review request, and davidmorgan is also named personally as reviewer. By the team-request rule that puts it near 0. It is a collaborator's (kevmoo) small string_scanner follow-up fix, not a security issue, so I'm leaving it slightly above 0 only because kevmoo is a collaborator.
- **Next action:** Nothing needed; davidmorgan is the named reviewer, and the team review request is shared with the rest of the team.

### 32. dart-lang/http#2026 → predicted 32, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR touches pkgs/http2, and my note says I'm not responsible for http2. I wasn't mentioned or asked to review; the author directed the review request to mosuem. Nothing is requested of me, so it is near zero even though it's a first-time contributor PR with no reviews yet.
- **Next action:** Nothing for me to do; this is http2 code I'm not responsible for, and the contributor asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 30, priority 0.06
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is liamappelbe's and he is assigned. The last comment from him, 34d ago, concluded the approach probably isn't worth it, and nothing has been asked of me since. The repo is one I'm responsible for and the topic overlaps with my own #3652, but it has been quiet for a month. The linked PR is already merged, so there is little for me to do here.
- **Next action:** Nothing needed now; the issue is assigned to liamappelbe, who is leaning toward wrapping objc_msgSend calls in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 28, priority 0.08
- **Ground truth:** 
- **Model:** I asked the reporter for information and added needs-info, and they haven't replied in 8 days, so nothing is waiting on me on the issue itself. There is also an open PR (#1974) that claims to fix it, so that PR is the item to act on and this issue should rank well below it. It's a non-security bug in a repository I'm responsible for, so I'm keeping it slightly above zero.
- **Next action:** Wait for Keetz to answer my questions about the client and the scenario; the open PR #1974 is the thing to look at in the meantime.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** I marked this issue as not important on 2026-10-05. Nothing directed at me has happened since: the last activity was agam1092005's commits on 2026-10-02, before the thumbs-down. An open PR (#2002) already covers it, so any attention should go to that PR rather than this issue.
- **Next action:** Nothing to do on the issue; any review effort belongs on PR #2002.

### 36. dart-lang/sdk#38148 → predicted 14, priority 0.40
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm assigned, and filiph reported a local repro and offered to help 24 days ago, which is new information I haven't answered. The thumbs-down from 2026-08-01 predates that comment, so it no longer suppresses the item. A copybara commit referenced it 4 days ago, so it may be fixed already, and that is worth checking. It sits in dart-lang/sdk, which I don't own beyond this assignment, and it's a long-standing P2 non-security bug, so it ranks in the middle.
- **Next action:** Reply to filiph's offer to help by asking for a minimal repro, then investigate the intermittent recursive-delete failure that the Oct 21 commit may have touched.
