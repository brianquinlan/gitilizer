# Gitilizer eval: v5a-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5a.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033129

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.680 ± 0.046 |
| spearman | 0.826 ± 0.057 |
| pairwise_acc | 0.840 ± 0.023 |
| ndcg | 0.981 ± 0.000 |
| ndcg@5 | 0.971 ± 0.029 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.867 ± 0.115 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 4.315 ± 0.517 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.850 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 1.000 ± 0.000 |
| B | 20 | 0.523 ± 0.094 | 0.932 ± 0.019 | 0.600 ± 0.000 | 3.700 ± 0.700 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 3/3 | dart-lang/sdk#48056 | A | Read the eMudhra comment, check whether the fix in #64644 covers Android, answer the questions about revocation and blocklists, and close or update this issue. |
| 2 | 2.3 (2–3) | +0.3 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo's inline question about CHANGELOG.md being deleted by generate (add it to lib.Keep in Bump or auto-preserve it in clean), push the fix, and resolve the thread. |
| 3 | 3.3 (3–4) | +0.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub release-polish PR (client attribution header, CHANGELOG, pubspec, .pubignore), since nobody human has reviewed it yet. |
| 4 | 4.3 (4–5) | +0.3 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 (first-time contributor, no human review yet) and check whether changing Status.code for JSON errors is a breaking behavior change before approving. |
| 5 | 6.0 (5–7) | +1.0 | 0.66 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's design sketch (nullable number/string ProtoEnum): approve the approach or request changes, and clarify unknown-name handling. |
| 6 | 9.7 (9–10) | +3.7 | 0.51 | 3/3 | dart-lang/http#2027 | B | Decide whether to make Client.close async (breaking 2.0) and write up a concrete plan or prototype in package:http. |
| 7 | 7.7 (7–8) | +0.7 | 0.55 | 3/3 | dart-lang/http#1981 | B | Continue the prototype for the server trust evaluation hook in CupertinoClient, and post a draft PR or design notes for discussion. |
| 8 | 10.0 (9–11) | +2.0 | 0.53 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether the SSE mid-stream error fix (item 2) is worth doing now and reply to kevmoo or take it on; the incremental JSON part (item 1) can wait until we know whether servers actually stream it. |
| 9 | 8.3 (2–12) | -0.7 | 0.64 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header-name validation (reject non-tchar characters, especially NUL and \x0b) or unassign myself. |
| 10 | 12.3 (12–13) | +2.3 | 0.40 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my 16d-old question on discovery vs. convenience extensions for Compute LROs. |
| 11 | 13.7 (13–14) | +2.7 | 0.36 | 3/3 | dart-lang/sdk#31275 | A | Decide whether to take over the abandoned CL (https://dart-review.googlesource.com/c/sdk/+/144346) for the unsolicited-response crash in dart:io, or route it to the right owner. |
| 12 | 18.7 (17–20) | +6.7 | 0.23 | 0/3 | dart-lang/native#3752 | B | Nothing on the issue itself; drive PR dart-lang/native#3763, which closes this issue, to review and merge. |
| 13 | 15.3 (14–16) | +2.3 | 0.30 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump; nothing to do until then (I last commented on how to fix this generally via librarian automation). |
| 14 | 22.0 (21–23) | +8.0 | 0.10 | 0/3 | dart-lang/tools#2719 | B | Nothing to do personally; leave this for the dart-ecosystem-team to review and merge the bot's BoringSSL bump. |
| 15 | 16.3 (15–17) | +1.3 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which fixes this issue, instead of acting on the issue itself. |
| 16 | 23.0 (22–24) | +7.0 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping again if there is no response after about a week (around 2026-10-30). |
| 17 | 8.0 (7–9) | -9.0 ⚠️ | 0.56 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the ServiceException.fromHttpResponse FormatException fix and add RetryRunner/RequestOptions to ServiceClient, or unassign myself if I won't do it. |
| 18 | 26.0 (25–27) | +8.0 | 0.09 | 0/3 | dart-lang/http#2031 | A | Nothing to do yet; review stacked base PR #2014 (requested from me) first, then come back to this release prep PR. |
| 19 | 19.7 (18–21) | +0.7 | 0.22 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft: address the bot's review comments and resolve the merge conflicts, or close the PR if abandoning it. |
| 20 | 5.7 (5–6) | -14.3 ⚠️ | 0.63 | 3/3 | dart-lang/core#1007 | B | Review this PR in dart-lang/core (pkgs/path), but note the CLA check failed, so ask the author to sign the CLA if it's still unsigned. |
| 21 | 19.7 (19–21) | -1.3 | 0.22 | 0/3 | dart-lang/tools#2544 | B | Nothing to do; the PR author (jonasfj) needs to address lrhn's 6 unresolved review threads, and lrhn is already reviewing. |
| 22 | 25.0 (24–26) | +3.0 | 0.09 | 0/3 | dart-lang/tools#2710 | B | Wait for the base PR #2563 to be reviewed; this stacked PR (team review request only, in a repo I'm not responsible for) isn't mine to review yet. |
| 23 | 24.0 (23–25) | +1.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping again if no response after about a week (around 2026-10-30). |
| 24 | 16.7 (15–20) | -7.3 | 0.24 | 2/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm's answer on whether he reviewed the non-PubSub parts, or for natebosch's review; ping again after about a week of silence. |
| 25 | 28.0 (27–29) | +3.0 | 0.08 | 0/3 | dart-lang/http#579 | B | Nothing to do now; blocked on a future semver-major release of package:http, so wait until that is planned. |
| 26 | 17.3 (16–18) | -8.7 | 0.25 | 0/3 | dart-lang/http#1932 | B | Nothing to do on the issue itself; the fix is in my open PR dart-lang/http#2034, so push that forward instead. |
| 27 | 31.0 (30–32) | +4.0 | 0.03 | 0/3 | flutter/devtools#8223 | B | Nothing to do; this is a CC in flutter/devtools, which I'm not responsible for, and the recent activity is just a label change. |
| 28 | 33.7 (33–34) | +5.7 | 0.03 | 0/3 | dart-lang/http#1837 | A | Nothing to do; I already replied that this is a contributions-welcome item for the community. |
| 29 | 34.7 (34–35) | +5.7 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing to do; I already approved and the author (mosuem) can merge. |
| 30 | 35.7 (35–36) | +5.7 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do; http2 is outside my responsibility and no one has asked me anything. |
| 31 | 29.3 (29–30) | -1.7 | 0.04 | 0/3 | dart-lang/tools#2715 | B | Nothing to do; davidmorgan is the named reviewer and this was only a team request to dart-ecosystem-team. |
| 32 | 31.0 (30–32) | -1.0 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing to do; this is http2, which I'm not responsible for, and the contributor asked mosuem to review. |
| 33 | 29.0 (28–31) | -4.0 | 0.06 | 0/3 | dart-lang/native#3653 | A | Nothing to do; liamappelbe (assignee) is driving this and leaning toward the autorelease-pool approach instead, so wait for his decision. |
| 34 | 25.0 (22–27) | -9.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to reply with the client details and repro; an open PR (#1974) also covers the issue, so review that PR instead. |
| 35 | 34.0 (33–36) | -1.0 | 0.02 | 0/3 | dart-lang/http#1841 | B | Nothing to do on the issue; the open PR dart-lang/http#2002 is where any review should happen. |
| 36 | 18.7 (11–32) | -17.3 ⚠️ | 0.31 | 2/3 | dart-lang/sdk#38148 | B | Nothing new directed at me since my thumbs-down; revisit only if someone asks me directly or a fix needs verifying. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1972** (truth #34) in 1/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue (CA trust) that I filed and am assigned to, and it has new activity in the last 3 days. A report ties it to the eMudhra intermediate CA compromise and asks whether Dart honors Android blocklists. Even though #64644 is closed and may cover part of this, confirming the state and replying is my job, and security items outrank everything else.
- **Next action:** Read the eMudhra comment, check whether the fix in #64644 covers Android, answer the questions about revocation and blocklists, and close or update this issue.

### 2. googleapis/librarian#7808 → predicted 3, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unanswered review comment 21h ago with a substantive question, so I'm blocking the merge. The PR also fixes google-cloud-dart#358, which affects first releases of new packages. Unanswered review feedback on my own PR falls in the 0.8–0.9 range, and the feedback is fresh.
- **Next action:** Answer kevmoo's inline question about CHANGELOG.md being deleted by generate (add it to lib.Keep in Bump or auto-preserve it in clean), push the fix, and resolve the thread.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR from a close collaborator (sigurdm) in google-cloud-dart, a repo I'm responsible for. No human has reviewed it yet (only the Gemini bot), so I'm the default reviewer. It's 5 days old and the branch is behind main. It's a pre-release polish change rather than a security fix, so it sits in the middle of the review range.
- **Next action:** Review sigurdm's pubsub release-polish PR (client attribution header, CHANGELOG, pubspec, .pubignore), since nobody human has reviewed it yet.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a PR in googleapis/google-cloud-dart, a repository I'm responsible for, and no human has reviewed it yet (the Gemini bot doesn't count), so I'm the default reviewer. The author is a first-time contributor rather than a collaborator, which places it in the middle of the review range. It's 3 days old and fixes a real retry bug (ABORTED never retried over REST) while changing status.code behavior, so it merits a careful review. It's not security-related, and the linked issue #381 is covered by this PR, so I should act on the PR rather than the issue.
- **Next action:** Review PR #382 (first-time contributor, no human review yet) and check whether changing Status.code for JSON errors is a breaking behavior change before approving.

### 5. googleapis/google-cloud-dart#252 → predicted 7, priority 0.60
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug in a repo I work in, and a contributor posted a concrete design proposal 4 days ago after I asked for a design before code. The next step (reviewing the design and replying) is mine and unblocks them. It is not a security issue or a PR, and it's a p2 bug with no one blocked on a review, so it sits in the planned-work range rather than higher.
- **Next action:** Reply to Yusufihsangorgel's design sketch (nullable number/string ProtoEnum): approve the approach or request changes, and clarify unknown-name handling.

### 6. dart-lang/http#2027 → predicted 10, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this 9 days ago in dart-lang/http, a repo I'm responsible for, and the issue is general Client API design rather than http2, so it's fresh planned work. Nobody has replied and nothing is blocking it; the next step is mine, but it is a design discussion without urgency. It sits at the low end of the 0.5–0.65 range because it's slightly aging and has no external pressure.
- **Next action:** Decide whether to make Client.close async (breaking 2.0) and write up a concrete plan or prototype in package:http.

### 7. dart-lang/http#1981 → predicted 8, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself 5h ago and said "I've started working on this", so this is a commitment and my own planned work in dart-lang/http. It is a cupertino_http feature, not http2, so it is in scope. No PR exists yet and nothing is waiting on the reporter, so the next step is mine. It is a feature request from a non-collaborator, which keeps it in the lower part of the 0.5–0.65 range.
- **Next action:** Continue the prototype for the server trust evaluation hook in CupertinoClient, and post a draft PR or design notes for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator's (kevmoo) issue in a repo I'm responsible for, and kevmoo replied to my question 17d ago, so the next step is mine with no one else blocking it. kevmoo says it's not urgent, and it has no assignee, no covering PR, and no new activity since, so it sits at the low end of the collaborator-issue range. The mid-stream error handling bug, where errors are silently turned into empty messages, is a real correctness issue and gives it some weight, but it is not a security issue.
- **Next action:** Decide whether the SSE mid-stream error fix (item 2) is worth doing now and reply to kevmoo or take it on; the incremental JSON part (item 1) can wait until we know whether servers actually stream it.

### 9. dart-lang/sdk#59846 → predicted 2, priority 0.93
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is a security-relevant bug: dart:io accepts NUL and whitespace characters in header names, which can cause request-smuggling-style problems with upstream proxies. It is assigned to me and I have never acted on it, so it falls under security issues that outrank everything else. It is old with no activity for about 22 months, but the guidance says age and the P3-style signals must not pull a security issue down. Its state is unresolved and I should either fix it or hand it off.
- **Next action:** Decide whether to fix the dart:io header-name validation (reject non-tchar characters, especially NUL and \x0b) or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked kevmoo, a close collaborator, in a repo I own whether to switch to discovery or add convenience extensions, and he hasn't replied in 16 days. The next step is his, so there's nothing for me to do now, though a follow-up may be needed later. It's a recent-ish unanswered question in my own repo and the design decision affects Compute users, so it sits in the 0.35-0.5 band. Its age places it toward the lower end.
- **Next action:** Wait for kevmoo to answer my 16d-old question on discovery vs. convenience extensions for Compute LROs.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old, important bug: an uncatchable exception in dart:io HttpClient that crashes servers, with a working but abandoned patch. I was only CC'd, informationally, by parlough and by kevmoo (a collaborator), and nobody has asked me a direct question. The last activity was 20 months ago, and dart-lang/sdk is not a repository I'm responsible for. It sits at the bottom of the 'old but important CC'd issue' range.
- **Next action:** Decide whether to take over the abandoned CL (https://dart-review.googlesource.com/c/sdk/+/144346) for the unsolicited-response crash in dart:io, or route it to the right owner.

### 12. dart-lang/native#3752 → predicted 17, priority 0.25
- **Ground truth:** 
- **Model:** Open PR #3763 (mine, updated 2d ago) is linked as closing this issue, so the PR is the thing to act on and the issue is a duplicate of that work. I filed and am assigned the issue and it is fresh, but there has been no new activity since I assigned myself. It ranks below its PR and stays in the 'issue covered by a PR' range.
- **Next action:** Nothing on the issue itself; drive PR dart-lang/native#3763, which closes this issue, to review and merge.

### 13. googleapis/google-cloud-dart#366 → predicted 14, priority 0.30
- **Ground truth:** 
- **Model:** The checklist is blocked on the generated google_cloud_rpc being bumped and released, and I was the last to comment 17d ago, so there is nothing new for me to act on. It's a collaborator's (sigurdm) issue in a repo I'm responsible for and has real release consequences, which keeps it from sinking to the bottom. It is not a security issue and has been quiet for over two weeks, so it sits in the low-middle range.
- **Next action:** Wait for the generated google_cloud_rpc version bump; nothing to do until then (I last commented on how to fix this generally via librarian automation).

### 14. dart-lang/tools#2719 → predicted 21, priority 0.10
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision bump in dart-lang/tools, a repository I'm not responsible for. The only review request went to the dart-ecosystem-team, not to me personally. It's a routine dependency update with no stated security angle, no human activity, and nothing asked of me.
- **Next action:** Nothing to do personally; leave this for the dart-ecosystem-team to review and merge the bot's BoringSSL bump.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** An open PR (#382) already covers this issue, so the PR is the thing to act on and the issue is a duplicate of that work. It is in google-cloud-dart, which I'm responsible for, and it is fresh (3d), with a real retry bug for ABORTED over REST. This is a correctness issue rather than a security one. The issue ranks below the PR in the 0.15-0.35 range reserved for issues with covering PRs.
- **Next action:** Review PR #382, which fixes this issue, instead of acting on the issue itself.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http, and I requested a review from goderbauer 2d ago with no response yet. Nothing is actionable until roughly a week has passed. The PR covers issue #1932, which is therefore a duplicate that ranks lower. cronet_http is not the http2 area I'm excluded from.
- **Next action:** Wait for goderbauer to review; ping again if there is no response after about a week (around 2026-10-30).

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned to this issue in a repository I'm responsible for, and it was filed by a close collaborator (kevmoo) with a clear next step for me. No open PR covers it yet, since #352 and #353 are merged and are only prerequisites. My last comment was 10 days ago, so nothing new is waiting on me. It is planned work with a real bug (HTML 502/503/504 bypassing retries) and I haven't started it, so it sits mid-range for assigned work to fix or unassign. It isn't a security issue.
- **Next action:** Implement the ServiceException.fromHttpResponse FormatException fix and add RetryRunner/RequestOptions to ServiceClient, or unassign myself if I won't do it.

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This is a release-prep PR for http2, where my note says I'm not responsible. It is stacked on PRs, and #2014 hasn't been reviewed yet, so the lower PR needs review first. My personal review request counts, but the stacking blocks it, so it sits in the low stacked-PR range.
- **Next action:** Nothing to do yet; review stacked base PR #2014 (requested from me) first, then come back to this release prep PR.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft in a repository I work in. It has been quiet for 45 days, has merge conflicts, and has 5 unresolved bot review threads (nullable-field handling and incomplete request examples). Nothing is waiting on anyone else, so I should either finish it or abandon it, but there is no new activity and the age pushes it to the lower part of the 0.15-0.35 range for drafts.
- **Next action:** Decide whether to finish this draft: address the bot's review comments and resolve the merge conflicts, or close the PR if abandoning it.

### 20. dart-lang/core#1007 → predicted 6, priority 0.62
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core isn't in my listed repos, and the only review request went to dart-ecosystem-team, which is shared and not addressed to me personally. That would normally put this at 0.1-0.25. The fix is small (+33/-0) and closes sigurdm's open bug #537 in package:path, a collaborator's issue. Nobody has reviewed it, and the author is a first-time contributor with a failed CLA check, so the PR may not be mergeable until the CLA is signed. That lowers urgency, so it sits in the low range of team review requests, a bit higher than usual because of the linked collaborator issue.
- **Next action:** Review this PR in dart-lang/core (pkgs/path), but note the CLA check failed, so ask the author to sign the CLA if it's still unsigned.

### 21. dart-lang/tools#2544 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This is a security PR in dart-lang/tools, which I'm not responsible for. Only my team (dart-ecosystem-team) was asked to review it, and a specific reviewer, lrhn, is actively reviewing it. Under the security rules that makes it a team review request in a repo I don't own, so it ranks low. The PR has been quiet for two months, so it sits at the bottom of that range.
- **Next action:** Nothing to do; the PR author (jonasfj) needs to address lrhn's 6 unresolved review threads, and lrhn is already reviewing.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.08
- **Ground truth:** 
- **Model:** The PR is stacked on #2563, which is still a draft and unreviewed by humans, so the lower PR needs review first. The review request went only to dart-ecosystem-team, a team I belong to, in dart-lang/tools, which isn't a repo I'm responsible for. It's from a collaborator (mosuem) and fresh, but the stacking keeps it in the low range.
- **Next action:** Wait for the base PR #2563 to be reviewed; this stacked PR (team review request only, in a repo I'm not responsible for) isn't mine to review yet.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested review from liamappelbe 2d ago, with no response yet, so the next step belongs to the reviewer. There are no review comments or failing items needing my attention. It also covers issues #3750 and #3752, so those issues should be ranked below it and not treated as separate work.
- **Next action:** Wait for liamappelbe to review; ping again if no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 20, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR. It already has sigurdm's approval, and I asked him 4d ago whether he covered the non-PubSub parts, so I'm waiting on a reviewer I recently asked. natebosch is assigned and requested but busy. Nothing is blocked on me, though the branch is behind main and the 2 unresolved threads may need a look before merge, so it stays at the top of the waiting-on-reviewer range.
- **Next action:** Wait for sigurdm's answer on whether he reviewed the non-PubSub parts, or for natebosch's review; ping again after about a week of silence.

### 25. dart-lang/http#579 → predicted 27, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR carries the 'next-breaking-release' label and I said in 2024 that it has to be coordinated with a major release I don't have bandwidth for, so it's blocked by plan. The latest activity is a 14-month-old user question about a workaround, which doesn't change what I should do. The review request is old and the item is stale, so it sits at the bottom of the blocked range.
- **Next action:** Nothing to do now; blocked on a future semver-major release of package:http, so wait until that is planned.

### 26. dart-lang/http#1932 → predicted 16, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** An open PR of mine (#2034, updated 2d ago) is linked to this issue and covers it, so the PR is the thing to act on. The latest 'any updates?' comment doesn't change that, since the real work is happening in the PR. This is a widely hit build break in cronet_http, which keeps it at the top of the low range, but it ranks below its PR.
- **Next action:** Nothing to do on the issue itself; the fix is in my open PR dart-lang/http#2034, so push that forward instead.

### 27. flutter/devtools#8223 → predicted 31, priority 0.03
- **Ground truth:** 
- **Model:** I'm only mentioned via an informational CC from bkonyi in 2024, in a repository outside my responsibility (flutter/devtools). The only recent activity is srawlins removing a label, which isn't directed at me and doesn't change what I should do. The GSoC question from Victowolf was addressed to bkonyi, not me, and it's 8 months old. It is also a feature request, not a security matter.
- **Next action:** Nothing to do; this is a CC in flutter/devtools, which I'm not responsible for, and the recent activity is just a label change.

### 28. dart-lang/http#1837 → predicted 33, priority 0.03
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old P3 feature request labeled contributions-welcome, and my own comment was the last activity. Nothing new has happened since, and no one has asked me anything. It is old low-priority backlog, so it sits at the bottom of the scale.
- **Next action:** Nothing to do; I already replied that this is a contributions-welcome item for the community.

### 29. dart-lang/http#2033 → predicted 34, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2d ago and there has been no activity or new commits since. The review decision is APPROVED and the merge state is clean, so it is done as far as I am concerned. The remaining step (merging) belongs to the author.
- **Next action:** Nothing to do; I already approved and the author (mosuem) can merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is labeled package:http2, and I've noted I'm not responsible for http2. I only watch the repo, I have no mentions, and I've never been active on it. The latest comment is 8 months old and isn't addressed to me, so it's out of scope and near 0.
- **Next action:** Nothing to do; http2 is outside my responsibility and no one has asked me anything.

### 31. dart-lang/tools#2715 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** dart-lang/tools is not a repository I'm responsible for, and I was only reached through the dart-ecosystem-team review request. davidmorgan was also requested personally, so he is the one driving the review. It is a fresh PR from kevmoo, but it is not directed at me, so it sits near the bottom.
- **Next action:** Nothing to do; davidmorgan is the named reviewer and this was only a team request to dart-ecosystem-team.

### 32. dart-lang/http#2026 → predicted 30, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR touches pkgs/http2, and my note says I'm not responsible for http2. I'm only watching the repo, I wasn't mentioned or asked to review, and the contributor asked mosuem. Recent activity is not directed at me, so it stays near zero.
- **Next action:** Nothing to do; this is http2, which I'm not responsible for, and the contributor asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 28, priority 0.06
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is driving it, and his last comment concludes the idea is probably not worth pursuing. The linked PR #3664 has merged, and the related autorelease pool issue #3652 is closed. I'm only a commenter and was thanked for a tip, so no one has asked me to do anything. The thread has been quiet for 34 days.
- **Next action:** Nothing to do; liamappelbe (assignee) is driving this and leaning toward the autorelease-pool approach instead, so wait for his decision.

### 34. dart-lang/http#1972 → predicted 26, priority 0.08
- **Ground truth:** 
- **Model:** I asked the reporter for information and added the needs-info label 8d ago, and they haven't replied, so the issue is blocked on them. An open PR (#1974) also claims to fix it, so the PR is the item to act on rather than this issue. Nothing new has happened on the issue itself since my comment.
- **Next action:** Wait for Keetz to reply with the client details and repro; an open PR (#1974) also covers the issue, so review that PR instead.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** I thumbs-downed this on 2026-10-05, and since then the only related activity is PR #2002 by agam1092005, which the issue already links. The issue also carries the next-breaking-release label and has an open PR covering it, so the PR is the thing to act on, not the issue. Nothing directed at me has happened since the thumbs-down, so it scores 0.0.
- **Next action:** Nothing to do on the issue; the open PR dart-lang/http#2002 is where any review should happen.

### 36. dart-lang/sdk#38148 → predicted 32, priority 0.03
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I marked this as not important on 2026-08-01. The only later events are filiph's general comment (offering help, not addressed to me) and a bot commit reference, which don't change what I should do. It's an intermittent bug in sdk where I'm just the assignee, and the thumbs-down means it stays near the bottom unless something is asked of me.
- **Next action:** Nothing new directed at me since my thumbs-down; revisit only if someone asks me directly or a fix needs verifying.
