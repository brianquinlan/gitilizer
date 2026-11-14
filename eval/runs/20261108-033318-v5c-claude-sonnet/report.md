# Gitilizer eval: v5c-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5c.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033318

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.675 ± 0.036 |
| spearman | 0.808 ± 0.033 |
| pairwise_acc | 0.838 ± 0.018 |
| ndcg | 0.982 ± 0.004 |
| ndcg@5 | 0.985 ± 0.015 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.867 ± 0.115 |
| top10_overlap | 0.867 ± 0.058 |
| mean_abs_displacement | 4.185 ± 0.410 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.850 ± 0.029 | 0.997 ± 0.001 | 1.000 ± 0.000 | 0.958 ± 0.144 |
| B | 20 | 0.526 ± 0.056 | 0.949 ± 0.019 | 0.733 ± 0.115 | 3.667 ± 0.321 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 3/3 | dart-lang/sdk#48056 | A | Check whether dart-lang/sdk#64644 (closed 2d ago) covers the eMudhra distrust for Android, reply to the 3d-old question, and close or update this issue. |
| 2 | 2.3 (2–3) | +0.3 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo's inline question on bump.go about CHANGELOG.md being deleted by the next `librarian generate`, then push a fix (add it to lib.Keep or auto-preserve it in clean). |
| 3 | 3.3 (3–4) | +0.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub release-polish PR (client attribution header, changelog, pubspec, .pubignore), noting it is behind main and the bot-flagged missing license headers. |
| 4 | 4.3 (4–5) | +0.3 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR from a first-time contributor, checking the behavior change to Status.code for JSON errors, and ask them to rebase since the branch is behind main. |
| 5 | 6.0 (5–7) | +1.0 | 0.67 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's design sketch (4d ago): approve or adjust the nullable number/string approach and tell them to open a preliminary PR. |
| 6 | 9.0 (8–10) | +3.0 | 0.53 | 3/3 | dart-lang/http#2027 | B | Decide on the Client.close design (tracked requests vs. async close in a 2.0 breaking release) and write up a plan or prototype. |
| 7 | 6.7 (6–8) | -0.3 | 0.61 | 3/3 | dart-lang/http#1981 | B | Keep working on the server trust evaluator for CupertinoClient and post a skeleton PR for discussion. |
| 8 | 10.3 (10–11) | +2.3 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether to fix the mid-stream SSE error handling now (the clear bug) and whether the incremental JSON framing is worth doing, then reply to kevmoo or take the issue. |
| 9 | 5.0 (2–8) | -4.0 | 0.74 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header-name validation (reject non-tchar characters per RFC 9110) or unassign myself, and comment on the issue either way. |
| 10 | 12.7 (12–13) | +2.7 | 0.40 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to reply to my 16d-old question on whether to switch Compute to discovery or add convenience extensions on the proto-based service operations. |
| 11 | 14.3 (14–15) | +3.3 | 0.40 | 3/3 | dart-lang/sdk#31275 | A | Decide whether to take over the abandoned CL 144346 for the unsolicited-response crash in dart:io HttpClient, or explicitly unassign and leave it for others. |
| 12 | 18.7 (18–19) | +6.7 | 0.21 | 0/3 | dart-lang/native#3752 | B | Work on PR dart-lang/native#3763, which closes this issue; nothing to do on the issue itself. |
| 13 | 14.7 (14–15) | +1.7 | 0.33 | 0/3 | googleapis/google-cloud-dart#366 | B | Nothing now; I'm deciding on a general fix (e.g. librarian automation), and the pubspec bumps wait on the google_cloud_rpc version bump. |
| 14 | 22.0 (20–25) | +8.0 | 0.09 | 0/3 | dart-lang/tools#2719 | B | Nothing for me personally; leave the automated BoringSSL bump to the dart-ecosystem-team unless I'm asked directly. |
| 15 | 16.7 (16–17) | +1.7 | 0.22 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which fixes this issue; nothing to do on the issue itself. |
| 16 | 21.3 (21–22) | +5.3 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping again if there is no response after about a week (around 2026-10-30). |
| 17 | 8.3 (7–9) | -8.7 | 0.57 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the ServiceClient retry/RequestOptions wiring and harden ServiceException.fromHttpResponse against non-JSON bodies, since the retry dependency #352 has merged. |
| 18 | 29.7 (26–33) | +11.7 ⚠️ | 0.05 | 0/3 | dart-lang/http#2031 | A | Nothing yet: review the lower stacked PRs first (#2014 is awaiting my review), then come back to this release-prep PR. |
| 19 | 17.7 (16–19) | -1.3 | 0.23 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft DNS package (fix the bot's review comments, resolve merge conflicts, mark ready) or close it. |
| 20 | 24.3 (23–26) | +4.3 | 0.09 | 0/3 | dart-lang/core#1007 | B | Nothing to do now; the author needs to sign the CLA, and the review request went to the team, not me personally. |
| 21 | 12.3 (12–13) | -8.7 | 0.47 | 3/3 | dart-lang/tools#2544 | B | Check whether this security PR is still waiting on jonasfj's response to lrhn's feedback, then review it or ping jonasfj to address the 6 unresolved threads and land the fix. |
| 22 | 24.3 (23–26) | +2.3 | 0.09 | 0/3 | dart-lang/tools#2710 | B | Nothing yet: this PR is stacked on #2563, which hasn't been reviewed, so review that first. Only a team review was requested here, and dart-lang/tools isn't a repo I own. |
| 23 | 22.3 (22–23) | -0.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping again if no response after about a week (around 2026-10-30). |
| 24 | 21.7 (20–25) | -2.3 | 0.11 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether he reviewed the non-PubSub parts, or for natebosch to review; ping again after about a week if nothing happens. |
| 25 | 27.7 (27–28) | +2.7 | 0.08 | 0/3 | dart-lang/http#579 | B | Nothing now; this is blocked on a future semver-major release, so leave it until a breaking http 2.0 is planned. |
| 26 | 17.0 (16–18) | -9.0 ⚠️ | 0.23 | 0/3 | dart-lang/http#1932 | B | Wait for my open PR #2034 (avoid cronet namespace duplication) to be reviewed and merged; then close this issue. |
| 27 | 29.3 (28–31) | +2.3 | 0.05 | 0/3 | flutter/devtools#8223 | B | Nothing to do; I was only CC'd for informational purposes on a feature request in a repo I'm not responsible for, and the question is directed at bkonyi. |
| 28 | 30.7 (30–32) | +2.7 | 0.05 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a contributions-welcome feature request and I already replied that the Dart team won't take it on. |
| 29 | 34.0 (34) | +5.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing to do: I already approved and the PR is waiting on mosuem or CI to merge it. |
| 30 | 35.0 (35) | +5.0 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do: this is the http2 package area, which I'm not responsible for, and nothing is asked of me. |
| 31 | 30.3 (29–33) | -0.7 | 0.04 | 0/3 | dart-lang/tools#2715 | B | Nothing to do; davidmorgan is the named reviewer and the team request is shared. |
| 32 | 32.3 (32–33) | +0.3 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing for me to do; this is http2, which I'm not responsible for, and the contributor asked mosuem to review. |
| 33 | 29.7 (27–31) | -3.3 | 0.06 | 0/3 | dart-lang/native#3653 | A | Nothing to do; liamappelbe owns this issue and is leaning toward wrapping objc_msgSend calls in autorelease pools instead. |
| 34 | 25.3 (24–27) | -8.7 | 0.09 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions; the open PR #1974 is where any code work will happen. |
| 35 | 36.0 (36) | +1.0 | 0.00 | 0/3 | dart-lang/http#1841 | B | Nothing on the issue itself; the fix is tracked in PR #2002, so review there when it's ready. |
| 36 | 9.7 (7–11) | -26.3 ⚠️ | 0.53 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's repro on dart-lang/sdk#38148, ask for a minimal repro, and check whether commit 2752d56 is related to this bug. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue (CA trust/disabled certificates on Android) that I filed and am assigned to, and it has new activity in the last 3 days. A user asked whether Dart honors Android revocation/blocklists after the eMudhra intermediate CA compromise, and a related fix (#64644) was just closed. Confirming what is fixed and what is not, and answering, is my job; age and P3 don't lower it.
- **Next action:** Check whether dart-lang/sdk#64644 (closed 2d ago) covers the eMudhra distrust for Android, reply to the 3d-old question, and close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unresolved inline review comment 21h ago that I haven't answered. The review is blocking the merge, and the fix addresses an issue I filed (google-cloud-dart#358) where first releases of new packages are skipped. The review is fresh and the question points at a real bug, so I should address it promptly.
- **Next action:** Answer kevmoo's inline question on bump.go about CHANGELOG.md being deleted by the next `librarian generate`, then push a fix (add it to lib.Keep or auto-preserve it in clean).

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in googleapis/google-cloud-dart, a repo I'm responsible for, from a close collaborator (sigurdm), and no human has reviewed it yet (the Gemini bot doesn't count), so I'm the default reviewer. It's 5 days old and a pre-release polish PR that likely gates the pubsub 0.1.0 publish, so it is fairly fresh and worth prioritizing. It is not a security issue and nobody is blocked on me urgently, so it sits in the middle of the review range.
- **Next action:** Review sigurdm's pubsub release-polish PR (client attribution header, changelog, pubspec, .pubignore), noting it is behind main and the bot-flagged missing license headers.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a non-security PR in googleapis/google-cloud-dart, a repository I'm responsible for. Only a bot has reviewed it, so I'm the default reviewer. It was opened 3 days ago by a first-time contributor, so it ranks below collaborator PRs. The change alters the Status.code semantics for REST errors, which is worth a careful look, and it fixes a real retry bug (ABORTED never retried). The linked issue #381 is covered by this PR, so I should work on the PR rather than the issue.
- **Next action:** Review this PR from a first-time contributor, checking the behavior change to Status.code for JSON errors, and ask them to rebase since the branch is behind main.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** I filed this issue in a repo I own, and a contributor posted a concrete design proposal 4d ago that is waiting on my feedback. Their last comment directly follows my request to show a design before writing code, so replying unblocks them. It's not a security issue and no PR exists yet, so it sits in the contributor-waiting-on-my-reply range rather than higher.
- **Next action:** Reply to Yusufihsangorgel's design sketch (4d ago): approve or adjust the nullable number/string approach and tell them to open a preliminary PR.

### 6. dart-lang/http#2027 → predicted 10, priority 0.50
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this 9 days ago in dart-lang/http, a repo I'm responsible for, and it isn't in the http2 area I excluded. Nothing is waiting on anyone else, so it's my own planned work, still fresh within two weeks. No one has replied and it's a design discussion rather than a blocker for anyone, so it sits in the middle-to-low part of the 0.5–0.65 range.
- **Next action:** Decide on the Client.close design (tracked requests vs. async close in a 2.0 breaking release) and write up a plan or prototype.

### 7. dart-lang/http#1981 → predicted 8, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself 5h ago and commented that I've started working on it, so it is a commitment I need to follow through on. It is in dart-lang/http (cupertino_http, not http2), a repo I'm responsible for. It is a non-security feature request from an outsider, so it sits in the planned-work range rather than higher. Security-adjacent TLS trust relates to pinning, but this is a feature request, not a vulnerability.
- **Next action:** Keep working on the server trust evaluator for CupertinoClient and post a skeleton PR for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.50
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I'm responsible for, filed by kevmoo, a close collaborator, and the next step is mine: I asked a question and he answered 17d ago. He says it isn't urgent, but that still ranks above items waiting on others. Part 2 (silently swallowed mid-stream errors) is a real correctness bug. Nobody is assigned and no PR covers it, so the issue is a candidate to take. The thread has been quiet for 17 days, which keeps it in the lower part of the 0.5–0.65 range.
- **Next action:** Decide whether to fix the mid-stream SSE error handling now (the clear bug) and whether the incremental JSON framing is worth doing, then reply to kevmoo or take the issue.

### 9. dart-lang/sdk#59846 → predicted 5, priority 0.70
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm assigned this issue, so the next step is mine. Accepting NUL and whitespace in header names can enable request smuggling or desync behind proxies, so it has a security flavor and its age shouldn't pull it down. There has been no new activity in 22 months, so it doesn't reach the top security tier. It's also in a repository I'm not responsible for, which keeps it below items where someone is waiting on me.
- **Next action:** Decide whether to fix the dart:io header-name validation (reject non-tchar characters per RFC 9110) or unassign myself, and comment on the issue either way.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a design discussion in a repository I'm responsible for, with a collaborator, and I asked the last question (16d ago) about discovery versus convenience extensions. The next step belongs to kevmoo, so nothing is actionable for me right now. A recent unanswered question to a close collaborator in my own repo belongs in the 0.35-0.5 range, and the 16d silence puts it in the lower half. A follow-up may eventually be needed.
- **Next action:** Wait for kevmoo to reply to my 16d-old question on whether to switch Compute to discovery or add convenience extensions on the proto-based service operations.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a long-standing crash bug in widely used dart:io code, and I was CC'd twice (including by collaborator kevmoo, who is hitting it himself), but dart-lang/sdk is not one of my listed repositories. Nothing has happened for about 20 months apart from a label change, so it sits in the old-but-important CC range. It is not a security issue, and a working patch exists but is abandoned, so there is a clear action if I choose to take it.
- **Next action:** Decide whether to take over the abandoned CL 144346 for the unsolicited-response crash in dart:io HttpClient, or explicitly unassign and leave it for others.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** An open PR (#3763, mine, updated 2d ago) already covers this issue, so the PR is where the work happens and the issue is a duplicate for attention purposes. I filed and am assigned the issue, but no new activity needs action on it. It stays in the low range, below its PR.
- **Next action:** Work on PR dart-lang/native#3763, which closes this issue; nothing to do on the issue itself.

### 13. googleapis/google-cloud-dart#366 → predicted 15, priority 0.30
- **Ground truth:** 
- **Model:** The issue is from a close collaborator in a repo I'm responsible for, but the work is blocked: the checklist only applies once the generated google_cloud_rpc version is bumped, and I last commented 17 days ago about picking a general approach. Nothing new has happened since, so there is nothing for me to do right now. It is not a security issue, and it stays in the lower-middle range because I may need to follow up on my own decision.
- **Next action:** Nothing now; I'm deciding on a general fix (e.g. librarian automation), and the pubspec bumps wait on the google_cloud_rpc version bump.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.10
- **Ground truth:** 
- **Model:** This is a bot-authored PR in dart-lang/tools, a repository I'm not responsible for, and the review request went to dart-ecosystem-team rather than to me personally. It is a routine automated revision bump with no stated vulnerability, so the security rule doesn't apply. Nobody has asked me anything and no human has been involved, so it sits at the low end of the team-review range.
- **Next action:** Nothing for me personally; leave the automated BoringSSL bump to the dart-ecosystem-team unless I'm asked directly.

### 15. googleapis/google-cloud-dart#381 → predicted 17, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** Issue #381 has an open PR (#382) that fixes it, so the PR is the thing to act on and the issue ranks below it. It is not a security issue: it is a retry-correctness bug in error mapping. It is in a repo I'm responsible for and is fresh (3d), but the author is an outside contributor, so this stays in the low duplicate range.
- **Next action:** Review PR #382, which fixes this issue; nothing to do on the issue itself.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http (cronet_http, not http2), and I requested a review from goderbauer 2d ago with no response yet. Nothing is actionable until roughly a week has passed. It fixes issue #1932, which is why that issue ranks below this PR. Fixing the namespace build break is moderately important, but the next step belongs to the reviewer.
- **Next action:** Wait for goderbauer to review; ping again if there is no response after about a week (around 2026-10-30).

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned this issue, which was filed by collaborator kevmoo in a repo I'm responsible for. Its prerequisite PR #352 has merged and no open PR covers the work, so the next step is mine. My last comment was 10d ago and nothing has been added since, so it counts as assigned planned work that is moderately fresh rather than urgent. The HTML 502/503/504 FormatException bug is a real reliability gap in widely used generated clients, but it isn't a security issue.
- **Next action:** Implement the ServiceClient retry/RequestOptions wiring and harden ServiceException.fromHttpResponse against non-JSON bodies, since the retry dependency #352 has merged.

### 18. dart-lang/http#2031 → predicted 33, priority 0.03
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** The PR is in dart-lang/http's http2 area, which I'm explicitly not responsible for, though I am named as a requested reviewer. It's also stacked on #2014, which hasn't been reviewed and is waiting on me, so this release-prep PR is blocked until the lower PRs land. It's a trivial version/changelog bump with no urgency.
- **Next action:** Nothing yet: review the lower stacked PRs first (#2014 is awaiting my review), then come back to this release-prep PR.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I'm responsible for, so the next step is mine and nobody else is blocking it. It has sat untouched for 45 days, with a dirty merge state and 5 unresolved bot comments. Since it's a stale draft I should either finish or abandon, it lands in the 0.15-0.35 range, near the lower end because of its age.
- **Next action:** Decide whether to finish this draft DNS package (fix the bot's review comments, resolve merge conflicts, mark ready) or close it.

### 20. dart-lang/core#1007 → predicted 26, priority 0.08
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core is not a repository I am responsible for, and the review was requested from dart-ecosystem-team, not from me personally. The CLA check failed and the author hasn't addressed it, which blocks the PR. It also fixes a bug that sigurdm filed, but that does not make it mine to act on. It has been quiet for 3 days and I have no history on it.
- **Next action:** Nothing to do now; the author needs to sign the CLA, and the review request went to the team, not me personally.

### 21. dart-lang/tools#2544 → predicted 12, priority 0.50
- **Ground truth:** 
- **Model:** This is a security PR (UNC path injection leaking NTLM hashes), but it is in dart-lang/tools, which I am not responsible for. The review request went only to dart-ecosystem-team, which I belong to, and lrhn is already actively reviewing, so it isn't addressed to me personally. The last activity was 2 months ago and 6 threads are unresolved, so the next step sits with the author. Security items don't get pulled down by this, so I score it above an ordinary team review request, but below items that need me directly.
- **Next action:** Check whether this security PR is still waiting on jonasfj's response to lrhn's feedback, then review it or ping jonasfj to address the 6 unresolved threads and land the fix.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on draft PR #2563, which has had no human review, so the lower PR needs review first. The review request went to dart-ecosystem-team, not to me personally, and dart-lang/tools isn't a repo I'm responsible for. It is fresh and comes from a collaborator (mosuem), which keeps it at the top of the low range.
- **Next action:** Nothing yet: this PR is stacked on #2563, which hasn't been reviewed, so review that first. Only a team review was requested here, and dart-lang/tools isn't a repo I own.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, and I requested a review from liamappelbe 2 days ago with no response yet. There is no unanswered feedback and no unresolved threads, so nothing is blocking on me. It fixes two open issues, so it is worth keeping visible, but it sits in the low range until a week of silence passes.
- **Next action:** Wait for liamappelbe to review; ping again if no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 20, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I'm responsible for. sigurdm approved it 6d ago, and 4d ago I asked him whether it's ready to merge without natebosch reviewing, so I'm waiting on a reviewer I recently asked. The branch is behind main, but my last merge was only 5d ago and nothing else is pending for me. There is no security angle.
- **Next action:** Wait for sigurdm to answer whether he reviewed the non-PubSub parts, or for natebosch to review; ping again after about a week if nothing happens.

### 25. dart-lang/http#579 → predicted 28, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR is labeled next-breaking-release, and I said in 2024 that it has to wait for a major release and I lack the bandwidth, so it is blocked by plan even though I'm a requested reviewer. The only recent activity is a 14-month-old user question about workarounds, which doesn't change what I should do. It's old and from a first-time contributor, so it sits at the bottom of the blocked range.
- **Next action:** Nothing now; this is blocked on a future semver-major release, so leave it until a breaking http 2.0 is planned.

### 26. dart-lang/http#1932 → predicted 16, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** An open PR of mine (#2034, updated 2d ago) closes this issue, so the PR is where the work is and the 'any updates?' comment doesn't change that. The issue is assigned to me and fairly widely hit (build break with several users affected), which keeps it near the top of the low range, but it should rank well below the PR.
- **Next action:** Wait for my open PR #2034 (avoid cronet namespace duplication) to be reviewed and merged; then close this issue.

### 27. flutter/devtools#8223 → predicted 31, priority 0.04
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, which is outside my responsible repositories, and I was only informationally CC'd over two years ago. The recent activity (a label removal 4d ago and a GSoC question addressed to bkonyi) isn't directed at me and asks nothing of me. It is not a security issue, so it stays at the bottom of the scale.
- **Next action:** Nothing to do; I was only CC'd for informational purposes on a feature request in a repo I'm not responsible for, and the question is directed at bkonyi.

### 28. dart-lang/http#1837 → predicted 30, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a stale feature request (about a year old) from an outside author, labeled contributions-welcome and P3. My own comment was the last activity and nothing has happened since. It is not a security matter and nobody is waiting on me, so it belongs in the low backlog range.
- **Next action:** Nothing to do; this is a contributions-welcome feature request and I already replied that the Dart team won't take it on.

### 29. dart-lang/http#2033 → predicted 34, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2d ago and nothing has happened since: no new commits, no author replies, and no other reviewers. It's mergeable and clean, so it's done as far as I'm concerned. Although it's in a repository I'm responsible for, nothing is left for me to act on.
- **Next action:** Nothing to do: I already approved and the PR is waiting on mosuem or CI to merge it.

### 30. dart-lang/http#1365 → predicted 35, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is labeled package:http2, and my note says I'm not responsible for http2. I'm not mentioned or assigned, and the last comment (8 months ago) is a general question to the thread. The item is stale and sits in out-of-scope territory, so it stays near 0.
- **Next action:** Nothing to do: this is the http2 package area, which I'm not responsible for, and nothing is asked of me.

### 31. dart-lang/tools#2715 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** The review request came only through dart-ecosystem-team, and kevmoo also named davidmorgan personally. dart-lang/tools isn't a repository I'm responsible for, so the team request isn't addressed to me. It is fresh, and kevmoo is a collaborator, but with a specific reviewer already named this stays near the bottom.
- **Next action:** Nothing to do; davidmorgan is the named reviewer and the team request is shared.

### 32. dart-lang/http#2026 → predicted 32, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR only touches pkgs/http2, and my note says I'm not responsible for http2. Nobody has asked me personally to review it, and the contributor directed the review request to mosuem. It is a recent PR but it is outside my scope, so it stays near 0.
- **Next action:** Nothing for me to do; this is http2, which I'm not responsible for, and the contributor asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 27, priority 0.08
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is driving it, and he has concluded the approach probably isn't worth the effort. I commented 37d ago and nothing directed at me has happened since; the last activity was 34d ago. Related issue #3652 is closed and the linked PR is merged, so this is stale and not mine to act on, and it belongs in the low backlog range.
- **Next action:** Nothing to do; liamappelbe owns this issue and is leaning toward wrapping objc_msgSend calls in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 25, priority 0.10
- **Ground truth:** 
- **Model:** I asked the reporter for information 8d ago and added 'needs-info', and there has been no reply, so the next step is theirs. An open PR (#1974) also links to this issue, so the PR is the thing to act on, not the issue. The issue sits in the low range, with no security angle.
- **Next action:** Wait for Keetz to answer my questions; the open PR #1974 is where any code work will happen.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** I thumbs-downed this on 2026-10-05, and nothing directed at me has happened since; the mention and commits all predate it. It also has an open PR (#2002) that covers it, and it's labeled next-breaking-release, so there is nothing to do on the issue itself.
- **Next action:** Nothing on the issue itself; the fix is tracked in PR #2002, so review there when it's ready.

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.60
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm assigned this issue, and after my thumbs-down in August there was new, relevant activity. filiph reported a local repro on current stable 3.13.5 and asked how to help, and a commit referenced the issue 4d ago, which may be a related change or fix. It's an intermittent bug in widely used dart:io, but it's old and not security-related, so it stays in the assigned-work range rather than higher.
- **Next action:** Reply to filiph's repro on dart-lang/sdk#38148, ask for a minimal repro, and check whether commit 2752d56 is related to this bug.
