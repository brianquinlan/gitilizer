# Gitilizer eval: v4-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033129

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.653 ± 0.052 |
| spearman | 0.803 ± 0.052 |
| pairwise_acc | 0.826 ± 0.026 |
| ndcg | 0.980 ± 0.004 |
| ndcg@5 | 0.981 ± 0.033 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 0.933 ± 0.115 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.518 ± 0.498 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.844 ± 0.019 | 0.997 ± 0.001 | 1.000 ± 0.000 | 1.042 ± 0.144 |
| B | 20 | 0.484 ± 0.074 | 0.927 ± 0.010 | 0.400 ± 0.000 | 3.800 ± 0.346 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 3/3 | dart-lang/sdk#48056 | A | Check whether dart:io on Android honors the platform blocklist/revocation for the compromised eMudhra intermediates (see #64644), reply to the question, and close or track the issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's inline question about CHANGELOG.md being deleted by the next `librarian generate`, then either add it to `lib.Keep` in Bump or make Dart clean preserve it, and push the fix. |
| 3 | 3.0 (3) | +0.0 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub release-polish PR (client attribution header, changelog, pubspec, .pubignore) in google-cloud-dart and address the license header warnings. |
| 4 | 4.3 (4–5) | +0.3 | 0.68 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR from a first-time contributor, which changes Status.code for JSON errors in google_cloud_rpc, and check the behavior change. |
| 5 | 5.0 (4–6) | +0.0 | 0.67 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's design sketch: confirm or adjust the nullable number/string ProtoEnum approach and say whether to proceed with a preliminary PR. |
| 6 | 13.7 (13–14) | +7.7 | 0.40 | 3/3 | dart-lang/http#2027 | B | Decide on the Client.close design (tracked outstanding requests vs. async close in a 2.0 release) and write up a plan or prototype. |
| 7 | 9.0 (7–11) | +2.0 | 0.52 | 3/3 | dart-lang/http#1981 | B | Continue the skeleton implementation of the server trust evaluator hook for CupertinoClient and post a draft PR for discussion. |
| 8 | 8.3 (8–9) | +0.3 | 0.55 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo and decide on scope: fix the mid-stream SSE error handling (a real correctness bug) and defer or drop incremental JSON framing until it's confirmed servers send it. |
| 9 | 11.0 (10–12) | +2.0 | 0.52 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header-name validation (reject non-tchar characters, especially NUL and \x0b) or unassign myself. |
| 10 | 13.0 (12–14) | +3.0 | 0.42 | 3/3 | googleapis/google-cloud-dart#361 | A | Check whether kevmoo has replied to my 16-day-old question (discovery vs. convenience extensions on the proto version), and follow up or decide so the design can move forward. |
| 11 | 19.0 (15–21) | +8.0 | 0.23 | 0/3 | dart-lang/sdk#31275 | A | Nothing urgent; optionally triage or take over the abandoned CL for dart:io HttpClient unsolicited-response crash when time allows. |
| 12 | 18.7 (18–19) | +6.7 | 0.23 | 2/3 | dart-lang/native#3752 | B | Nothing on the issue itself; drive PR dart-lang/native#3763, which fixes this, and let it close the issue when merged. |
| 13 | 10.7 (10–12) | -2.3 | 0.50 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide on the fix (librarian automation vs. manual), then bump google_cloud_rpc and require it in google_cloud_storage and google_cloud_pubsub before release. |
| 14 | 22.0 (21–23) | +8.0 | 0.11 | 0/3 | dart-lang/tools#2719 | B | Nothing required from me; the dart-ecosystem-team can review this routine automated BoringSSL bump. |
| 15 | 16.3 (16–17) | +1.3 | 0.26 | 2/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which fixes this; no separate action is needed on the issue itself. |
| 16 | 23.3 (23–24) | +7.3 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping again if no response by about 2026-10-30. |
| 17 | 7.3 (7–8) | -9.7 ⚠️ | 0.55 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the ServiceClient retry/RequestOptions wiring and the fromHttpResponse FormatException fix, or unassign myself if I won't get to it. |
| 18 | 27.3 (26–29) | +9.3 ⚠️ | 0.08 | 0/3 | dart-lang/http#2031 | A | Nothing yet: review the lower stacked PR #2014 (review requested from me) first, then this release-prep PR. |
| 19 | 19.3 (18–20) | +0.3 | 0.22 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft: fix the bot's review comments, resolve the merge conflicts, and mark it ready, or close it. |
| 20 | 5.7 (5–6) | -14.3 ⚠️ | 0.65 | 3/3 | dart-lang/core#1007 | B | Review this PR from a first-time contributor, after checking that the CLA is signed and tests pass, since it fixes sigurdm's issue #537. |
| 21 | 17.0 (15–20) | -4.0 | 0.30 | 3/3 | dart-lang/tools#2544 | B | Check whether dart-lang/tools is a repo I own; if not, leave it to lrhn, who is already reviewing, and confirm the UNC fix lands. |
| 22 | 24.0 (22–25) | +2.0 | 0.11 | 3/3 | dart-lang/tools#2710 | B | Review the lower stacked PR #2563 first; this provenance PR can wait until that base is reviewed. |
| 23 | 24.3 (24–25) | +1.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping again if no response by about 2026-10-30. |
| 24 | 15.7 (13–19) | -8.3 | 0.30 | 3/3 | googleapis/google-cloud-dart#373 | B | Merge main into the branch (it is behind) and fix the mistyped '/gbcrun' CI trigger; the 4-day-old question to sigurdm about merging without natebosch is still unanswered, so follow up if there's no reply. |
| 25 | 28.0 (27–29) | +3.0 | 0.08 | 0/3 | dart-lang/http#579 | B | Nothing to do until a semver-major release is planned; this breaking-change PR is parked for the next breaking release. |
| 26 | 17.3 (17–18) | -8.7 | 0.25 | 0/3 | dart-lang/http#1932 | B | Nothing on the issue itself; drive PR #2034 (cronet namespace fix) forward and reply there or on the issue once it lands. |
| 27 | 30.7 (30–32) | +3.7 | 0.04 | 0/3 | flutter/devtools#8223 | B | Nothing to do; I was only CC'd on a feature request in flutter/devtools, which I'm not responsible for. |
| 28 | 31.3 (31–32) | +3.3 | 0.04 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a contributions-welcome request and I already replied that the Dart team won't take it on. |
| 29 | 33.7 (33–34) | +4.7 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing to do; I already approved and the PR is waiting on mosuem to merge. |
| 30 | 34.7 (34–35) | +4.7 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do; this is in the http2 package, which I'm not responsible for, and nobody has asked me to act. |
| 31 | 26.0 (22–28) | -5.0 | 0.08 | 0/3 | dart-lang/tools#2715 | B | Nothing needed from me; davidmorgan is the named reviewer, and the team request is shared with the rest of dart-ecosystem-team. |
| 32 | 32.7 (32–33) | +0.7 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing for me; the PR is in http2, which I'm not responsible for, and the author asked mosuem to review. |
| 33 | 30.0 (29–31) | -3.0 | 0.05 | 0/3 | dart-lang/native#3653 | A | Nothing needed from me; liamappelbe owns this and is leaning toward wrapping objc_msgSend calls in autorelease pools instead. |
| 34 | 26.3 (26–27) | -7.7 | 0.09 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions about the client and scenario; the linked PR #1974 is the thing to look at. |
| 35 | 36.0 (36) | +1.0 | 0.00 | 0/3 | dart-lang/http#1841 | B | Nothing on the issue itself; the open PR dart-lang/http#2002 is the thing to act on if anything. |
| 36 | 18.3 (9–35) | -17.7 ⚠️ | 0.35 | 2/3 | dart-lang/sdk#38148 | B | Nothing right now; I marked this not important, and nothing since has been directed at me. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue (CA trust on Android) that I created and am assigned to, and it has fresh activity: a new question about the eMudhra intermediate CA compromise and whether Dart honors Android's blocklist. Related issue #64644 about distrusting the compromised keys was just closed, so I need to confirm the state and answer. Security issues with new activity go at the top regardless of the P3 label or the issue's age.
- **Next action:** Check whether dart:io on Android honors the platform blocklist/revocation for the compromised eMudhra intermediates (see #64644), reply to the question, and close or track the issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unresolved inline review question 21h ago that I haven't answered, so I am blocking the review. The concern looks like a real bug: new packages would lose their CHANGELOG.md on the next generate. The PR also fixes google-cloud-dart#358, which keeps new package releases from being tagged. It is not a security issue, so it sits at the top of the 'I'm blocking someone' band rather than above it.
- **Next action:** Reply to kevmoo's inline question about CHANGELOG.md being deleted by the next `librarian generate`, then either add it to `lib.Keep` in Bump or make Dart clean preserve it, and push the fix.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.74
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This PR is in google-cloud-dart, which I'm responsible for, and it's from a close collaborator (sigurdm). Nobody human has reviewed it in 5 days; only a bot has commented, and bots don't count, so I'm the default reviewer. It's pre-release polish and not security-related, so it falls in the 0.65-0.8 band for collaborator reviews waiting on me.
- **Next action:** Review sigurdm's pubsub release-polish PR (client attribution header, changelog, pubspec, .pubignore) in google-cloud-dart and address the license header warnings.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, where I'm the default reviewer; the bot review doesn't count. The author is a first-time contributor, so it ranks below collaborators' PRs. It's a real behavior change (retries for ABORTED over REST) in widely used RPC code, and it also closes issue #381. It isn't a security issue, so it sits in the review-waiting-on-me band.
- **Next action:** Review this PR from a first-time contributor, which changes Status.code for JSON errors in google_cloud_rpc, and check the behavior change.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.62
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug in googleapis/google-cloud-dart, and a contributor posted a concrete design proposal 4 days ago that is waiting on my feedback, so I'm the one blocking progress. It isn't a security issue and no PR exists yet, so it sits in the planned-work and contributor-waiting range rather than higher. It affects enum parsing broadly, but a contributor is driving the work and it's a p2 with no immediate breakage.
- **Next action:** Reply to Yusufihsangorgel's design sketch: confirm or adjust the nullable number/string ProtoEnum approach and say whether to proceed with a preliminary PR.

### 6. dart-lang/http#2027 → predicted 14, priority 0.40
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this 9 days ago in dart-lang/http, an area I'm responsible for (not http2), and nothing is waiting on anyone else, so it's my own planned work. It has aged past the fresh window and has no activity or discussion, so it sits at the lower end of the planned-work band. It's a design question touching a breaking change, not a bug or security issue, so it isn't urgent.
- **Next action:** Decide on the Client.close design (tracked outstanding requests vs. async close in a 2.0 release) and write up a plan or prototype.

### 7. dart-lang/http#1981 → predicted 7, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is a feature request in a repo I'm responsible for (cupertino_http, not http2), and I assigned myself and said 5h ago that I've started working on it. That is a fresh commitment, so it counts as my own planned work. It is a feature rather than a bug, and the security angle (certificate pinning) is only a use case, not a vulnerability report, so it doesn't get security-level urgency. No one is blocked on me right now, and the requester isn't a close collaborator.
- **Next action:** Continue the skeleton implementation of the server trust evaluator hook for CupertinoClient and post a draft PR for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repo I'm responsible for, filed by a close collaborator (kevmoo), and he answered my question 17d ago, so the next step is mine. It carries a real correctness bug (mid-stream errors silently decoded as empty messages) that affects generated streaming clients. Kevmoo says it isn't urgent, and no open PR covers it, so it ranks in the collaborator-issue-with-clear-next-step band rather than higher.
- **Next action:** Reply to kevmoo and decide on scope: fix the mid-stream SSE error handling (a real correctness bug) and defer or drop incremental JSON framing until it's confirmed servers send it.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is a security-adjacent issue: dart:io accepts NUL and whitespace in header names, which can cause request smuggling or proxy desync problems. I am assigned, so it is mine to either fix or unassign, but there has been no new activity in about 22 months, so the security rule requiring 0.9+ for any new activity does not apply. It is a stale assigned issue in a repository I don't own and it is not tied to my responsible repositories, so it lands at the low end of the assigned-issue band rather than higher.
- **Next action:** Decide whether to fix the dart:io header-name validation (reject non-tchar characters, especially NUL and \x0b) or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.45
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a recent-ish design question I put to kevmoo, a close collaborator, in a repo I own, and he hasn't answered. That puts it in the 'recent unanswered question to a collaborator' band, so it should stay visible, but nothing is blocking anyone and it isn't a security issue. Its related issue #28 is a general feature request, and a PR doesn't cover this item, so it ranks below reviews and my own planned work.
- **Next action:** Check whether kevmoo has replied to my 16-day-old question (discovery vs. convenience extensions on the proto version), and follow up or decide so the design can move forward.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old (9-year) P2 bug in dart:io, in dart-lang/sdk, which is not a repo I'm listed as responsible for. I was only CC'd twice (informational, one by collaborator kevmoo), with nothing new in 20 months and no direct ask. It is a real crash in widely used code with a known candidate fix, so it rates above a plain CC, but it is not a security issue and nothing is waiting on me right now.
- **Next action:** Nothing urgent; optionally triage or take over the abandoned CL for dart:io HttpClient unsolicited-response crash when time allows.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** An open PR (#3763), authored by me, closes this issue, so the PR is the thing to act on and the issue should rank well below it. The issue is a real bug, since a blocked NSURLConnectionLoader thread stalls all NSURLSession requests in the process. It is not a security issue, though, and there has been no new activity in 6 days.
- **Next action:** Nothing on the issue itself; drive PR dart-lang/native#3763, which fixes this, and let it close the issue when merged.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.50
- **Ground truth:** 
- **Model:** This is a collaborator's (sigurdm) issue in a repo I'm responsible for, with a clear next step for me: I said I'm deciding how to fix it in general and haven't followed through, so it's a commitment I could drop. It could break published packages if released without the dependency bump, but it isn't a security issue and has no new activity in 17 days, and no open PR covers it, so it sits in the planned-work range rather than higher.
- **Next action:** Decide on the fix (librarian automation vs. manual), then bump google_cloud_rpc and require it in google_cloud_storage and google_cloud_pubsub before release.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.12
- **Ground truth:** 
- **Model:** This is a bot-generated BoringSSL revision bump in dart-lang/tools, which isn't a repository I'm responsible for. The review request went to the dart-ecosystem-team, not to me personally, so it is low priority. Nothing in it describes a security fix, and CI checks are passing, so there is no urgency.
- **Next action:** Nothing required from me; the dart-ecosystem-team can review this routine automated BoringSSL bump.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a real bug in google_cloud_rpc, a repo I'm responsible for. Over REST, ABORTED errors are never retried because the HTTP status ends up in Status.code instead of the google.rpc.Code. An open PR (#382) already covers it, so the PR is the thing to act on and the issue ranks well below it. It is not a security issue and the author is an outside contributor, so it stays in the low range.
- **Next action:** Review PR #382, which fixes this; no separate action is needed on the issue itself.

### 16. dart-lang/http#2034 → predicted 23, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http (cronet_http, not http2). I requested a review from goderbauer 2d ago and there has been no response, so there is nothing to do until about a week has passed. It fixes issue #1932, which is covered by this PR and so ranks below it. It is not a security issue.
- **Next action:** Wait for goderbauer to review; ping again if no response by about 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned to a collaborator's (kevmoo) issue in a repository I own, and the next step is clear: the dependent retry PRs (#352, #353) have merged. I was the last to act 10d ago and nothing is waiting on anyone else. It's planned work without new activity or a blocker, and it isn't security, so it lands in the middle of the 'own planned work' band.
- **Next action:** Implement the ServiceClient retry/RequestOptions wiring and the fromHttpResponse FormatException fix, or unassign myself if I won't get to it.

### 18. dart-lang/http#2031 → predicted 27, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release-prep PR is stacked on #2010, #2014 and #2009. #2014 is still unreviewed, and I have reviewed neither this PR nor #2014. I'm named as reviewer, but the PR is blocked until the lower PRs land. http2 is also an area I'm not responsible for, so it stays low priority.
- **Next action:** Nothing yet: review the lower stacked PR #2014 (review requested from me) first, then this release-prep PR.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I'm responsible for. It has been dormant for 45 days, has merge conflicts (dirty), and has 5 unresolved bot review threads. The only reviewer was a bot, and no human is blocked on it. Per the guidance, my own drafts I should finish or abandon sit in the 0.15-0.35 range. The age and lack of activity keep it toward the lower-middle of that band.
- **Next action:** Decide whether to finish this draft: fix the bot's review comments, resolve the merge conflicts, and mark it ready, or close it.

### 20. dart-lang/core#1007 → predicted 5, priority 0.68
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core is a repo I'm responsible for (the package:path fix), and nobody has reviewed this PR yet; bots don't count. That makes me the default reviewer, even though the request went to the team. The author is a first-time contributor, so it ranks below collaborators' PRs, and the CLA check failed and the PR is 15 days old, which also keeps it from ranking higher. It does fix a bug filed by my collaborator sigurdm, which keeps it in the range for reviews waiting on me. It is not security-related.
- **Next action:** Review this PR from a first-time contributor, after checking that the CLA is signed and tests pass, since it fixes sigurdm's issue #537.

### 21. dart-lang/tools#2544 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** This is a security PR (UNC path injection leaking NTLM hashes), but it's in dart-lang/tools, which isn't on my list of responsible repos. The review request went to my team (dart-ecosystem-team), not to me personally. lrhn is actively reviewing, and the author, jonasfj, has 6 unresolved threads to address. So I'm not the blocker, and by the security rules this scores like a team review request, slightly raised for the security relevance and awareness.
- **Next action:** Check whether dart-lang/tools is a repo I own; if not, leave it to lrhn, who is already reviewing, and confirm the UNC fix lands.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.10
- **Ground truth:** 
- **Model:** This is a collaborator's (mosuem) PR in dart-lang/tools, a repo I'm not listed as responsible for. The only request is to dart-ecosystem-team, which is a team request rather than one naming me. It's also stacked on #2563, a draft that nobody has reviewed yet, so the lower PR needs review before this one. The security-like subject matter (sigstore provenance) is supply-chain tooling, not a reported vulnerability, so it doesn't trigger the security tier.
- **Next action:** Review the lower stacked PR #2563 first; this provenance PR can wait until that base is reviewed.

### 23. dart-lang/native#3763 → predicted 24, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested review from liamappelbe 2 days ago, with no response yet. Nothing is left for me to do until roughly a week has passed, then a ping would be the next step. It fixes two open issues that matter for cupertino_http upload performance, which keeps it slightly visible, but it is not a security matter.
- **Next action:** Wait for liamappelbe to review; ping again if no response by about 2026-10-30.

### 24. googleapis/google-cloud-dart#373 → predicted 13, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I own. It is approved by sigurdm, and the only pending item is my 4-day-old question to a close collaborator about whether he reviewed the non-PubSub parts, so it is mostly waiting on others. There is still real work for me: the branch is behind main, the last CI trigger was a typo ('/gbcrun'), and 2 review threads are unresolved. It isn't blocking anyone or security-related, so it ranks in the recent-question-awaiting-answer range rather than higher.
- **Next action:** Merge main into the branch (it is behind) and fix the mistyped '/gbcrun' CI trigger; the 4-day-old question to sigurdm about merging without natebosch is still unanswered, so follow up if there's no reply.

### 25. dart-lang/http#579 → predicted 28, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** I'm a requested reviewer in a repo I own, but the PR has the 'next-breaking-release' label and I said in 2024 that it must be coordinated with a major release I have no bandwidth for. It has been dormant for over a year; the latest comment is just a user asking about workarounds. It's also from a first-time contributor and needs a rebase, so it sits in the low-priority range for PRs waiting on a future breaking release.
- **Next action:** Nothing to do until a semver-major release is planned; this breaking-change PR is parked for the next breaking release.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is my assigned bug in dart-lang/http (cronet_http), and users keep asking for updates. However, I already have an open PR (#2034) that fixes it, so the PR is the thing to act on and the issue should rank well below it. It is a build-breaking bug for some users, which keeps it at the upper end of the low range, but it is not a security issue.
- **Next action:** Nothing on the issue itself; drive PR #2034 (cronet namespace fix) forward and reply there or on the issue once it lands.

### 27. flutter/devtools#8223 → predicted 30, priority 0.04
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, a repository I'm not responsible for. My only involvement is an informational CC from bkonyi more than two years ago, and nothing has been asked of me since. Recent activity is just label housekeeping, and it's not a security issue.
- **Next action:** Nothing to do; I was only CC'd on a feature request in flutter/devtools, which I'm not responsible for.

### 28. dart-lang/http#1837 → predicted 31, priority 0.04
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old P3 enhancement request marked contributions-welcome, and I already responded a year ago that the community would need to build it. There has been no activity since, it is not security related, and nobody is waiting on me. It is old low-priority backlog.
- **Next action:** Nothing to do; this is a contributions-welcome request and I already replied that the Dart team won't take it on.

### 29. dart-lang/http#2033 → predicted 33, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2 days ago and nothing has happened since: no new commits, no replies from the author. It is a small CI infra change in the package:http area I am responsible for, and it is not a security matter. As far as I am concerned it is done.
- **Next action:** Nothing to do; I already approved and the PR is waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 34, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is labeled package:http2, and my note says I'm not responsible for http2, so it falls outside my scope. I'm not mentioned and haven't been asked anything. It is an old enhancement with sporadic activity, and the comments suggest the root cause lies elsewhere (socket or the Dio adapter).
- **Next action:** Nothing to do; this is in the http2 package, which I'm not responsible for, and nobody has asked me to act.

### 31. dart-lang/tools#2715 → predicted 22, priority 0.10
- **Ground truth:** 
- **Model:** The PR is in dart-lang/tools, which isn't a repository I'm responsible for. The review request comes through dart-ecosystem-team, not to me personally, and davidmorgan is also named as a specific reviewer. It's a small string_scanner follow-up from kevmoo, a collaborator, so I'm keeping it slightly above zero, but it's not mine to review.
- **Next action:** Nothing needed from me; davidmorgan is the named reviewer, and the team request is shared with the rest of dart-ecosystem-team.

### 32. dart-lang/http#2026 → predicted 32, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR only touches pkgs/http2, and my note says I'm not responsible for http2. I'm not requested as a reviewer or mentioned, and the author directed the review request to mosuem. Nothing is asked of me, so it sits near the bottom.
- **Next action:** Nothing for me; the PR is in http2, which I'm not responsible for, and the author asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 29, priority 0.06
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, and I was only thanked in the description. My last comment was 37 days ago, and the latest activity (34 days ago) is his own analysis, with no question or request aimed at me. The linked PR was merged but turned out to do nothing, and the approach is likely to be dropped, so this is low-priority backlog in a repository I don't own.
- **Next action:** Nothing needed from me; liamappelbe owns this and is leaning toward wrapping objc_msgSend calls in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 26, priority 0.10
- **Ground truth:** 
- **Model:** I asked the reporter for details and added needs-info, and they haven't replied, so the issue is waiting on them. There is also an open PR (#1974) that claims to fix it, so the PR is the item to act on and the issue should rank well below it. It is a non-security bug in a repo I own, so it stays slightly above nothing.
- **Next action:** Wait for Keetz to answer my questions about the client and scenario; the linked PR #1974 is the thing to look at.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** I marked this as not important on 2026-10-05, and nothing directed at me has happened since; the only later activity is a PR update that I wasn't asked to act on. The issue is also covered by open PR #2002, which is the place to act, so the issue should rank well below it.
- **Next action:** Nothing on the issue itself; the open PR dart-lang/http#2002 is the thing to act on if anything.

### 36. dart-lang/sdk#38148 → predicted 35, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I gave this a thumbs-down on 2026-08-01. Since then filiph reported a local repro and asked how to help, and a bot referenced a commit. Neither mentions me, requests a review, or asks me to act. It sits in dart-lang/sdk, which is outside my repositories, so the thumbs-down stands.
- **Next action:** Nothing right now; I marked this not important, and nothing since has been directed at me.
