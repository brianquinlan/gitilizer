# Gitilizer eval: v5e-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5e.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033412

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.754 ± 0.010 |
| spearman | 0.901 ± 0.007 |
| pairwise_acc | 0.877 ± 0.005 |
| ndcg | 0.992 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.900 ± 0.000 |
| mean_abs_displacement | 3.222 ± 0.200 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.844 ± 0.010 | 0.997 ± 0.001 | 1.000 ± 0.000 | 1.042 ± 0.072 |
| B | 20 | 0.677 ± 0.016 | 0.976 ± 0.001 | 0.600 ± 0.000 | 2.400 ± 0.100 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Check whether the fix in dart-lang/sdk#64644 (distrust eight compromised eMudhra intermediate CAs) covers Android and this issue's disabled-cert handling, answer acn-masatadakurihara's questions, and close or link the issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo's inline question about CHANGELOG.md being deleted by the next `librarian generate`, then update the PR (e.g., add it to lib.Keep or auto-preserve it in clean). |
| 3 | 3.0 (3) | +0.0 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub release-polish PR (client attribution header, pubspec, .pubignore, changelog) and check the license-header warnings from the bot. |
| 4 | 4.3 (4–5) | +0.3 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the PR: check the status-to-google.rpc.Code mapping in exceptions.dart and its tests, then approve or request changes. |
| 5 | 4.7 (4–5) | -0.3 | 0.67 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's design proposal (nullable number/string ProtoEnum) with feedback or approval, and tell them to open a preliminary PR. |
| 6 | 8.0 (8) | +2.0 | 0.51 | 3/3 | dart-lang/http#2027 | B | Decide on the Client.close design (tracked outstanding requests vs. async close in a 2.0 release) and write up a concrete proposal or plan on the issue. |
| 7 | 6.0 (6) | -1.0 | 0.55 | 3/3 | dart-lang/http#1981 | B | Finish the skeleton implementation of the server trust evaluator hook in CupertinoClient and post a draft PR for discussion. |
| 8 | 9.0 (9) | +1.0 | 0.51 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether to fix the mid-stream SSE error handling (clear bug) now and whether incremental JSON framing is worth doing, then reply to kevmoo or start a PR. |
| 9 | 17.3 (17–18) | +8.3 | 0.20 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header name validation (reject non-tchar characters) or unassign myself. |
| 10 | 10.0 (10) | +0.0 | 0.41 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my question about switching to discovery versus adding convenience extensions on the service operations. |
| 11 | 12.0 (12) | +1.0 | 0.31 | 3/3 | dart-lang/sdk#31275 | A | Decide whether to take over the abandoned CL (zichangg's patch) to fix the uncatchable unsolicited-response HttpException in dart:io, or leave it as backlog. |
| 12 | 15.0 (15) | +3.0 | 0.22 | 0/3 | dart-lang/native#3752 | B | Nothing to do on the issue itself; work happens on PR dart-lang/native#3763, which closes it. |
| 13 | 11.0 (11) | -2.0 | 0.40 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide how to handle this (librarian automation vs. a manual pubspec bump) and reply to sigurdm, or do the pubspec/CHANGELOG bump once google_cloud_rpc is released. |
| 14 | 18.3 (18–19) | +4.3 | 0.16 | 0/3 | dart-lang/tools#2719 | B | Nothing needed from me; another dart-ecosystem-team member can review this automated BoringSSL bump. |
| 15 | 13.0 (13) | -2.0 | 0.27 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which fixes this issue; nothing else to do on the issue itself. |
| 16 | 19.7 (19–21) | +3.7 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping again if no response after about a week. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.55 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner/RequestOptions wiring in ServiceClient and harden ServiceException.fromHttpResponse against non-JSON bodies, or unassign myself. |
| 18 | 26.3 (24–28) | +8.3 | 0.06 | 0/3 | dart-lang/http#2031 | A | Nothing yet: review the lower stacked PR #2014 (review requested from me) first, then come back to this release PR. |
| 19 | 16.0 (16) | -3.0 | 0.20 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft DNS PR (address the 5 bot review comments, resolve merge conflicts) or close it. |
| 20 | 20.7 (20–21) | +0.7 | 0.11 | 0/3 | dart-lang/core#1007 | B | Nothing for now; wait for the author to sign the CLA and for another ecosystem-team member to review. |
| 21 | 26.0 (17–32) | +5.0 | 0.09 | 0/3 | dart-lang/tools#2544 | B | Nothing for me to do: the review request went only to dart-ecosystem-team, lrhn is already reviewing, and the next step is jonasfj addressing his comments. |
| 22 | 24.7 (23–26) | +2.7 | 0.07 | 0/3 | dart-lang/tools#2710 | B | Wait for the lower stacked PR #2563 (draft, unreviewed) to be reviewed first; this PR is only a team review request in a repo I'm not responsible for. |
| 23 | 20.7 (20–22) | -2.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping again if no response after about a week. |
| 24 | 22.3 (22–23) | -1.7 | 0.10 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm's answer on whether he reviewed the non-PubSub parts; ping him or natebosch again if there's no reply after about a week. |
| 25 | 25.3 (25–26) | +0.3 | 0.08 | 0/3 | dart-lang/http#579 | B | Nothing to do now; PR is blocked on a future semver-major release (next-breaking-release label), and I've already said I lack bandwidth to coordinate it. |
| 26 | 14.0 (14) | -12.0 ⚠️ | 0.23 | 0/3 | dart-lang/http#1932 | B | Nothing on the issue itself; my fix PR dart-lang/http#2034 is open, so wait for its review and merge. |
| 27 | 28.0 (26–31) | +1.0 | 0.05 | 0/3 | flutter/devtools#8223 | B | Nothing to do; this is a flutter/devtools feature request where I was only CC'd, and no one has asked me anything. |
| 28 | 32.7 (32–33) | +4.7 | 0.03 | 0/3 | dart-lang/http#1837 | A | Nothing to do; I already replied that this is a contributions-welcome item for the community to take on. |
| 29 | 33.7 (33–34) | +4.7 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing to do; I already approved and it is waiting on mosuem to merge. |
| 30 | 34.7 (34–35) | +4.7 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do: http2 is outside my responsibility and nobody has asked me for anything. |
| 31 | 30.3 (30–31) | -0.7 | 0.03 | 0/3 | dart-lang/tools#2715 | B | Nothing to do; davidmorgan is the named reviewer and the team request is shared, so wait unless I'm pinged personally. |
| 32 | 29.3 (29–30) | -2.7 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing to do: this is in http2, which I'm not responsible for, and the contributor asked mosuem to review, not me. |
| 33 | 27.7 (27–28) | -5.3 | 0.05 | 0/3 | dart-lang/native#3653 | A | Nothing to do; liamappelbe owns this and is leaning toward wrapping objc_msgSend calls in autorelease pools instead. |
| 34 | 23.7 (23–24) | -10.3 ⚠️ | 0.09 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions; PR #1974 is the thing to review if it needs attention. |
| 35 | 34.3 (31–36) | -0.7 | 0.01 | 0/3 | dart-lang/http#1841 | B | Nothing to do on the issue; the open PR #2002 covers it, so review it there when ready. |
| 36 | 34.3 (32–36) | -1.7 | 0.01 | 0/3 | dart-lang/sdk#38148 | B | Nothing right now; I thumbs-downed this in August and the only later activity (filiph's comment, 24d ago) was before no ask of me, plus a bot commit reference. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/http#1932** (truth #26) in 3/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1972** (truth #34) in 3/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/native#3653** (truth #33) in 1/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 3/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/http#1972** (truth #34) in 2/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1932** (truth #26) in 3/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/native#3653** (truth #33) in 2/3 trial(s)
- **dart-lang/tools#2710** (truth #22) placed below **dart-lang/http#1972** (truth #34) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/tools#2544** (truth #21) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a certificate trust security issue that I created and am assigned, and it has new activity within the last 3 days: a question about the compromised eMudhra intermediate CAs and a related issue, #64644, that was just closed. Security issues I own with any new activity go at the top, regardless of the P3 label or the issue's age. Confirming whether the fix covers Android and responding is my job, and leaving it in an unknown state isn't acceptable.
- **Next action:** Check whether the fix in dart-lang/sdk#64644 (distrust eight compromised eMudhra intermediate CAs) covers Android and this issue's disabled-cert handling, answer acn-masatadakurihara's questions, and close or link the issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unanswered review comment 21h ago with a substantive question about a real bug. The PR is blocked on review and my response, and it fixes a release-tagging problem (google-cloud-dart#358). Because I'm blocking the PR, it sits at the top of the 0.8–0.9 range given the fresh feedback.
- **Next action:** Answer kevmoo's inline question about CHANGELOG.md being deleted by the next `librarian generate`, then update the PR (e.g., add it to lib.Keep or auto-preserve it in clean).

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in googleapis/google-cloud-dart, a repository I'm responsible for, from a close collaborator (sigurdm). No human has reviewed it yet (the gemini bot doesn't count) and I'm the default reviewer. It is 5 days old, so it sits in the top third of the 0.65-0.8 review range, though it is not security-related and nobody is blocked on a direct question to me.
- **Next action:** Review sigurdm's pubsub release-polish PR (client attribution header, pubspec, .pubignore, changelog) and check the license-header warnings from the bot.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, where I am the default reviewer; the bot review doesn't count. The author is a first-time contributor, so it ranks below collaborators' PRs. It opened 3d ago, so it sits in the top third of the 0.65-0.8 range. It changes Status.code behavior for REST errors, which affects retry logic and makes careful review worthwhile. It is not a security issue.
- **Next action:** Review the PR: check the status-to-google.rpc.Code mapping in exceptions.dart and its tests, then approve or request changes.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug in google-cloud-dart, a repo I'm responsible for. A contributor posted a concrete design proposal 4 days ago in response to my questions, and is waiting on my reply to move forward. That fits the contributor-waiting-on-me range (0.65–0.8). It's not security and no PR exists yet, so it sits in the lower-middle of that range rather than at the top.
- **Next action:** Reply to Yusufihsangorgel's design proposal (nullable number/string ProtoEnum) with feedback or approval, and tell them to open a preliminary PR.

### 6. dart-lang/http#2027 → predicted 8, priority 0.50
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue in dart-lang/http, filed 9 days ago in an area I work in, and nobody else has replied, so it counts as fresh planned work. The next step is mine, since it's a design decision I need to make. It is not about http2, so the scope exclusion doesn't apply. It's a design question with a possible breaking change rather than a bug or a blocker for someone else, so it sits in the lower-middle of the planned-work range. Age is 1 to 4 weeks, which puts it mid-range.
- **Next action:** Decide on the Client.close design (tracked outstanding requests vs. async close in a 2.0 release) and write up a concrete proposal or plan on the issue.

### 7. dart-lang/http#1981 → predicted 6, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself 5h ago and said "I've started working on this", so it's a commitment I haven't delivered on yet, in a repo I'm responsible for (cupertino_http isn't the http2 area). It's my own planned work, fresh within the last week, so it sits in the 0.5–0.65 range. No PR exists yet and nobody is blocking me. It's a feature request from an outsider, not security-breaking, so it doesn't rise higher. Once a draft PR exists, the PR becomes the thing to act on.
- **Next action:** Finish the skeleton implementation of the server trust evaluator hook in CupertinoClient and post a draft PR for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.50
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is kevmoo's (a close collaborator) issue in google-cloud-dart, a repo I'm responsible for. He answered my question 17d ago, so the next step is mine. He says it isn't urgent, but per my rules a collaborator's issue with a clear next step still outranks items waiting on others. It's 17 days old (middle of the range), and the silent-empty-message error bug is a real correctness hole, so it sits mid-range rather than at the top.
- **Next action:** Decide whether to fix the mid-stream SSE error handling (clear bug) now and whether incremental JSON framing is worth doing, then reply to kevmoo or start a PR.

### 9. dart-lang/sdk#59846 → predicted 17, priority 0.20
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm assigned, but there has been no activity for about 22 months and no one has asked me anything. This is a dart:io HTTP parser bug in dart-lang/sdk, which isn't one of my listed repositories. It could have a security angle (NUL and \x0b in header names cause proxy issues, a request-smuggling-style concern), so it deserves a decision rather than being ignored. The extreme age puts it at the bottom of the range, and with no new activity the security top-of-scale rule doesn't apply.
- **Next action:** Decide whether to fix the dart:io header name validation (reject non-tchar characters) or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 10, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked kevmoo a design question 16 days ago in a repo I'm responsible for and he hasn't replied, so there's nothing for me to do until he does. Because it's a recent unanswered question to a close collaborator in my own repository, it belongs in the 0.35–0.5 range. It's 16 days old, so it sits in the middle of that range. It isn't security-related, and no open PR covers it.
- **Next action:** Wait for kevmoo to answer my question about switching to discovery versus adding convenience extensions on the service operations.

### 11. dart-lang/sdk#31275 → predicted 12, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a real crash bug in dart:io (a server can crash from an uncatchable exception), but it is not a security issue. It's in dart-lang/sdk, which is not a repo I'm responsible for, and I was only CC'd (informational) by parlough and kevmoo, the latter a usual collaborator who said he'd love it taken up. The last CC was 18 months ago and the last activity is a label change 20mo ago, so freshness is at the bottom of the old-CC range (0.35-0.5); I place it slightly below that range since the issue is old, in a repo I don't own, and has no open PR or direct ask.
- **Next action:** Decide whether to take over the abandoned CL (zichangg's patch) to fix the uncatchable unsolicited-response HttpException in dart:io, or leave it as backlog.

### 12. dart-lang/native#3752 → predicted 15, priority 0.20
- **Ground truth:** 
- **Model:** Open PR #3763, which I authored, closes this issue, so the PR is the item to act on and the issue is a duplicate of that work. Since the PR is waiting on a reviewer, nothing is left to do on the issue. It is my own recent issue, so it sits at the top of the duplicate range (0.1-0.35) but well below the PR.
- **Next action:** Nothing to do on the issue itself; work happens on PR dart-lang/native#3763, which closes it.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.40
- **Ground truth:** 
- **Model:** Issue from collaborator sigurdm in a repo I'm responsible for, and I said 17d ago that I'm deciding how to fix it, so the next step is still mine. It has no linked open PR and no new activity since my comment. A release-blocking dependency constraint is moderately important, but it is not urgent and not security, so it sits in the 0.35-0.5 range, with the 17-day age placing it mid-range.
- **Next action:** Decide how to handle this (librarian automation vs. a manual pubspec bump) and reply to sigurdm, or do the pubspec/CHANGELOG bump once google_cloud_rpc is released.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.15
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision bump in dart-lang/tools, which isn't a repo I'm responsible for. The review request went to dart-ecosystem-team, not to me personally, so it's a team request in someone else's repo. It was opened 19h ago and is small, with no human activity or mention of me. I'm not treating it as a security issue since it's a routine bot update with no vulnerability described.
- **Next action:** Nothing needed from me; another dart-ecosystem-team member can review this automated BoringSSL bump.

### 15. googleapis/google-cloud-dart#381 → predicted 13, priority 0.27
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a real bug in google_cloud_rpc, a repo I'm responsible for. It affects retry behavior over REST, but it isn't a security issue. An open PR (#382) already covers it and no one has reviewed it, so the PR is the thing to act on and I'm the default reviewer there. The issue sits below its PR in the 0.15-0.35 range, near the top because it's only 3 days old.
- **Next action:** Review PR #382, which fixes this issue; nothing else to do on the issue itself.

### 16. dart-lang/http#2034 → predicted 19, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http (cronet_http, not http2), and I requested a review from goderbauer 2d ago with no response yet. Nothing for me to do until about a week has passed. The linked issue #1932 is covered by this PR, so it is a duplicate and ranks below it.
- **Next action:** Wait for goderbauer to review; ping again if no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned an issue filed by a close collaborator (kevmoo) in a repo I'm responsible for. It has a clear next step and no open PR covers it, since the shared RetryRunner PRs are merged. I commented 10d ago and nobody else is blocking, so it's my own planned work. It sits in the 0.5–0.65 range, a bit lower since nothing new has come in and the last activity is from 1–2 weeks ago.
- **Next action:** Implement the RetryRunner/RequestOptions wiring in ServiceClient and harden ServiceException.fromHttpResponse against non-JSON bodies, or unassign myself.

### 18. dart-lang/http#2031 → predicted 24, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release-prep PR is stacked on #2010, #2014 and #2009. #2014 is still unreviewed, with a review requested from me, so the lower PRs need review first. The PR is also in http2, which I'm not responsible for, although I was personally named as reviewer. It's fresh and from a collaborator, but that only places it at the top of the low stacked-PR range.
- **Next action:** Nothing yet: review the lower stacked PR #2014 (review requested from me) first, then come back to this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 16, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I work in, and nothing is waiting on anyone else. It has been dormant for 45 days with unresolved bot review comments and a dirty merge state, so it sits in the bottom of the 'drafts I should finish or abandon' range. It is not a security item and no human has asked anything of me.
- **Next action:** Decide whether to finish this draft DNS PR (address the 5 bot review comments, resolve merge conflicts) or close it.

### 20. dart-lang/core#1007 → predicted 21, priority 0.10
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** The review request went to dart-ecosystem-team, not to me personally, and dart-lang/core isn't a repository I'm responsible for, so this sits in the low team-request range. The author is a first-time contributor and the CLA check has failed, so the PR can't be merged yet and a review now would be premature. The linked issue #537 is from sigurdm, but that doesn't make the PR mine to review, and the request is 15 days old.
- **Next action:** Nothing for now; wait for the author to sign the CLA and for another ecosystem-team member to review.

### 21. dart-lang/tools#2544 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** This is a security PR in dart-lang/tools, a repository I'm not responsible for, and it was requested only from my team (dart-ecosystem-team). Another specific reviewer, lrhn, is actively reviewing it and has left six unresolved threads, so I'm not the one who needs to act. The last activity was 2 months ago, which puts it at the bottom of the range for a team review request that is not mine.
- **Next action:** Nothing for me to do: the review request went only to dart-ecosystem-team, lrhn is already reviewing, and the next step is jonasfj addressing his comments.

### 22. dart-lang/tools#2710 → predicted 26, priority 0.06
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft and hasn't had a human review, so the lower PR has to be reviewed before this one. The review request went to dart-ecosystem-team, not to me personally, and dart-lang/tools isn't a repo I'm responsible for. Mosuem is a collaborator and the activity is recent, so it sits at the top of the low stacked-PR range but stays low.
- **Next action:** Wait for the lower stacked PR #2563 (draft, unreviewed) to be reviewed first; this PR is only a team review request in a repo I'm not responsible for.

### 23. dart-lang/native#3763 → predicted 20, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, and I requested review from liamappelbe 2 days ago, with no response or feedback yet. Nothing is blocking on me, so I should wait about a week before pinging. The PR is a real fix for a deadlock and for performance, and it supersedes issues #3750 and #3752, so I act on the PR rather than the issues.
- **Next action:** Wait for liamappelbe to review; ping again if no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 22, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I work in. It is approved by sigurdm, but only for the PubSub parts, and natebosch is still the requested reviewer. I asked sigurdm a direct question 4 days ago, and nobody has replied. Nothing is left for me to do until they respond, though the branch is behind main and will need a merge before it can land. That puts it in the 'waiting on a recently asked reviewer' range, toward the upper end because the question is fresh.
- **Next action:** Wait for sigurdm's answer on whether he reviewed the non-PubSub parts; ping him or natebosch again if there's no reply after about a week.

### 25. dart-lang/http#579 → predicted 25, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR is in a repo I'm responsible for and I'm a requested reviewer, but it carries the 'next-breaking-release' label and I said in 2024 that it must wait for a major release. The latest activity is a 14-month-old question from a bystander (retendo) that doesn't change what I should do, so it falls in the blocked range (0.05-0.15) and sits near the bottom because it's old.
- **Next action:** Nothing to do now; PR is blocked on a future semver-major release (next-breaking-release label), and I've already said I lack bandwidth to coordinate it.

### 26. dart-lang/http#1932 → predicted 14, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** The issue is assigned to me and has a recent status-update request, but my open PR #2034 (updated 2d ago) already covers it and is waiting on a reviewer. Per the duplicate rule, the PR is the thing to act on and the issue ranks well below it. The recent ping is just a status request and changes nothing, so this stays in the low range, nudged up slightly because it's recent, in a repo I own, and widely felt.
- **Next action:** Nothing on the issue itself; my fix PR dart-lang/http#2034 is open, so wait for its review and merge.

### 27. flutter/devtools#8223 → predicted 27, priority 0.06
- **Ground truth:** 
- **Model:** I was only informationally CC'd by bkonyi in 2024, in a repository I'm not responsible for. The recent activity (a label removal 4d ago, a GSoC question addressed to bkonyi) isn't directed at me. It's a large feature request with no ask for me, so it sits at the low end of the range.
- **Next action:** Nothing to do; this is a flutter/devtools feature request where I was only CC'd, and no one has asked me anything.

### 28. dart-lang/http#1837 → predicted 33, priority 0.03
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old feature request with the contributions-welcome and P3 labels, and I already replied that the Dart team is unlikely to take it on. Nothing new has happened since my last activity, and it is not a security issue. It is old low-priority backlog with nothing for me to act on.
- **Next action:** Nothing to do; I already replied that this is a contributions-welcome item for the community to take on.

### 29. dart-lang/http#2033 → predicted 34, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2d ago and there have been no new commits or author activity since. It is done as far as I am concerned and review_decision is APPROVED with a clean mergeable state, so it only needs the author to merge.
- **Next action:** Nothing to do; I already approved and it is waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is labeled package:http2, and I noted that I'm not responsible for http2. I only watch the repo, I wasn't mentioned, and the last activity was a generic question from a stranger 8 months ago. The thread has been dormant for years and likely isn't a bug in the http2 library, so it falls in the near-zero range.
- **Next action:** Nothing to do: http2 is outside my responsibility and nobody has asked me for anything.

### 31. dart-lang/tools#2715 → predicted 30, priority 0.03
- **Ground truth:** 
- **Model:** dart-lang/tools isn't a repository I'm responsible for. The review request went to dart-ecosystem-team, not to me personally, and davidmorgan is also named as a specific reviewer, which puts this near 0. The change is a bounds-validation fix and test follow-up, not a security issue, and kevmoo hasn't asked anything of me directly.
- **Next action:** Nothing to do; davidmorgan is the named reviewer and the team request is shared, so wait unless I'm pinged personally.

### 32. dart-lang/http#2026 → predicted 29, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR changes pkgs/http2, and my note says I'm not responsible for http2, so I'm not the default reviewer. The author's only request, made 1d ago, is addressed to mosuem, and no review has been requested from me. Without a personal ask, an item in that area stays near 0.
- **Next action:** Nothing to do: this is in http2, which I'm not responsible for, and the contributor asked mosuem to review, not me.

### 33. dart-lang/native#3653 → predicted 28, priority 0.04
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is driving it, and the work needs VM-level changes. The related PR #3664 already merged, and issue #3652 is closed. My last comment was 37d ago and was answered. I'm a commenter in a repo I'm not responsible for, and nothing has been asked of me since.
- **Next action:** Nothing to do; liamappelbe owns this and is leaning toward wrapping objc_msgSend calls in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 23, priority 0.10
- **Ground truth:** 
- **Model:** I asked the reporter for information and applied 'needs-info', and there has been no reply in 8 days. An open PR (#1974) is linked to this issue, so the PR is the place to act, not the issue. The issue itself therefore sits low, though the repository is one I work in.
- **Next action:** Wait for Keetz to answer my questions; PR #1974 is the thing to review if it needs attention.

### 35. dart-lang/http#1841 → predicted 31, priority 0.03
- **Ground truth:** 
- **Model:** I marked this as not important on 2026-10-05, and nothing directed at me has happened since; the only later activity is the PR's own updates. The issue also has the 'next-breaking-release' label and an open PR (#2002) that covers it, so the PR is the thing to act on, not the issue. Low priority, near zero.
- **Next action:** Nothing to do on the issue; the open PR #2002 covers it, so review it there when ready.

### 36. dart-lang/sdk#38148 → predicted 36, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I marked this not important on 2026-08-01. Since then filiph offered help on 2026-10-01 and a bot referenced a commit 4d ago, but nobody mentioned me, asked me to act, or requested a review. It is in dart-lang/sdk, which isn't one of my responsible repos, so under the thumbs-down rule it scores 0.0.
- **Next action:** Nothing right now; I thumbs-downed this in August and the only later activity (filiph's comment, 24d ago) was before no ask of me, plus a bot commit reference.
