# Gitilizer eval: v5f-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5f.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033412

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.681 ± 0.007 |
| spearman | 0.810 ± 0.015 |
| pairwise_acc | 0.841 ± 0.003 |
| ndcg | 0.984 ± 0.006 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.833 ± 0.058 |
| mean_abs_displacement | 4.093 ± 0.085 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.844 ± 0.010 | 0.997 ± 0.001 | 1.000 ± 0.000 | 1.042 ± 0.072 |
| B | 20 | 0.526 ± 0.032 | 0.949 ± 0.031 | 0.667 ± 0.115 | 3.533 ± 0.231 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Check whether dart-lang/sdk#64644 (eight eMudhra CAs distrusted, closed 2d ago) covers Android's disabled-cert/blocklist handling, answer acn-masatadakurihara's questions, and close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's inline review comment about CHANGELOG.md being deleted by the next generate, then push a fix (append to lib.Keep or auto-preserve in clean). |
| 3 | 3.0 (3) | +0.0 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub pre-release polish PR (attribution header, CHANGELOG, pubspec, .pubignore) and resolve the license header warnings with him. |
| 4 | 4.7 (4–5) | +0.7 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review the PR (check the status-to-code mapping and the behavior change for JSON errors) and ask the author to rebase since the branch is behind main. |
| 5 | 4.3 (4–5) | -0.7 | 0.70 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 4d-old design proposal: approve or adjust the nullable number/string ProtoEnum approach (including the unknown-name handling) so they can start a preliminary PR. |
| 6 | 8.3 (7–10) | +2.3 | 0.55 | 3/3 | dart-lang/http#2027 | B | Decide on the Client.close design (track outstanding requests vs. make close async for a 2.0 release) and write up a concrete plan or prototype. |
| 7 | 7.3 (6–9) | +0.3 | 0.56 | 3/3 | dart-lang/http#1981 | B | Continue the skeleton implementation of the server trust evaluator hook in CupertinoClient and push a draft PR for discussion. |
| 8 | 9.7 (9–11) | +1.7 | 0.53 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo and decide scope: implement the mid-stream SSE error check (item 2) now, and defer or drop incremental JSON framing (item 1) until servers are confirmed to stream it. |
| 9 | 8.0 (6–11) | -1.0 | 0.58 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header-name validation (reject non-tchar characters per RFC 9110) or unassign myself. |
| 10 | 12.0 (12) | +2.0 | 0.40 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my question on whether to switch Compute to discovery or add convenience extensions to the proto-generated service operations. |
| 11 | 13.0 (13) | +2.0 | 0.40 | 3/3 | dart-lang/sdk#31275 | A | Decide whether to take over the abandoned dart:io CL (or write a fresh fix) for the unsolicited-response crash, or explicitly assign or deprioritize it. |
| 12 | 17.3 (17–18) | +5.3 | 0.20 | 0/3 | dart-lang/native#3752 | B | Work on PR dart-lang/native#3763, which already closes this issue; nothing to do on the issue itself. |
| 13 | 16.7 (14–18) | +3.7 | 0.23 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump; then update the pubspecs in storage and pubsub. |
| 14 | 20.0 (19–21) | +6.0 | 0.11 | 0/3 | dart-lang/tools#2719 | B | Nothing to do unless a teammate asks me personally; another dart-ecosystem-team member can review this automated BoringSSL bump. |
| 15 | 14.7 (14–15) | -0.3 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which fixes this issue, instead of acting on the issue itself. |
| 16 | 21.3 (20–22) | +5.3 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping again if there's no response after about a week (around Oct 30). |
| 17 | 8.7 (8–10) | -8.3 | 0.54 | 3/3 | googleapis/google-cloud-dart#359 | B | Start on the assigned work: harden ServiceException.fromHttpResponse against non-JSON bodies, then add RetryRunner and RequestOptions to ServiceClient. |
| 18 | 26.7 (25–29) | +8.7 | 0.08 | 0/3 | dart-lang/http#2031 | A | Nothing to do yet; review lower stacked PRs (#2014 first) before this release-prep PR. |
| 19 | 16.0 (16) | -3.0 | 0.25 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft: fix the generator/example issues Gemini flagged, resolve the merge conflicts, and mark it ready for review, or close it. |
| 20 | 26.7 (26–27) | +6.7 | 0.08 | 0/3 | dart-lang/core#1007 | B | Nothing for me now; waiting on the contributor to sign the CLA, and the review request went only to the dart-ecosystem-team. |
| 21 | 23.7 (19–33) | +2.7 | 0.14 | 0/3 | dart-lang/tools#2544 | B | Nothing for me to do: jonasfj needs to address lrhn's review feedback; the review request went only to dart-ecosystem-team, and dart-lang/tools is not a repository I'm responsible for. |
| 22 | 23.7 (22–25) | +1.7 | 0.09 | 0/3 | dart-lang/tools#2710 | B | Wait for the lower PR #2563 (draft, unreviewed) to be reviewed first; this stacked PR only has a team review request. |
| 23 | 22.3 (21–23) | -0.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping again if no response after about a week (around 2026-10-30). |
| 24 | 21.7 (20–24) | -2.3 | 0.11 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to reply about merging (or natebosch to review); ping again if still silent after about a week. |
| 25 | 28.0 (28) | +3.0 | 0.08 | 0/3 | dart-lang/http#579 | B | Nothing to do now; blocked on a future breaking/major release, so leave it until a semver-major release is planned. |
| 26 | 15.3 (14–17) | -10.7 ⚠️ | 0.24 | 0/3 | dart-lang/http#1932 | B | Nothing to do on this issue; move the work forward on my open PR dart-lang/http#2034 and optionally reply with a pointer to it. |
| 27 | 27.0 (23–29) | +0.0 | 0.07 | 0/3 | flutter/devtools#8223 | B | Nothing to do; this is a feature request in flutter/devtools (not my repo) where I was only CC'd, and the GSoC question is addressed to bkonyi. |
| 28 | 33.7 (33–34) | +5.7 | 0.03 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a contributions-welcome feature request that I already answered, so wait for a community contributor. |
| 29 | 34.7 (34–35) | +5.7 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing to do; I already approved and mosuem can merge it. |
| 30 | 35.7 (35–36) | +5.7 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do; this is in the http2 area, which I'm not responsible for, and no one has asked me to act. |
| 31 | 31.7 (31–32) | +0.7 | 0.03 | 0/3 | dart-lang/tools#2715 | B | Nothing to do; davidmorgan is the named reviewer and my only link is the dart-ecosystem-team request. |
| 32 | 30.7 (30–31) | -1.3 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing for me; http2 is outside my responsibility and the contributor asked mosuem to review. |
| 33 | 29.0 (27–30) | -4.0 | 0.06 | 0/3 | dart-lang/native#3653 | A | Nothing to do now; Liam (assignee) is driving this and is leaning toward wrapping objc_msgSend calls in autorelease pools instead. |
| 34 | 25.0 (24–26) | -9.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions; the linked PR #1974 is the thing to review if it needs attention. |
| 35 | 33.7 (32–36) | -1.3 | 0.02 | 0/3 | dart-lang/http#1841 | B | Nothing on the issue itself; the open PR dart-lang/http#2002 is the thing to review when ready. |
| 36 | 9.0 (6–11) | -27.0 ⚠️ | 0.55 | 3/3 | dart-lang/sdk#38148 | B | Check commit 2752d56 to see whether it fixes this, then reply to filiph with a status or ask for his repro, or unassign if I'm not going to work on it. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue (CA trust and disabled certificates) that I created and am assigned to, and it has new activity from the last 3 days: a report tying it to the eMudhra intermediate CA compromise, plus a pointer to the related fix in #64644. Security issues with new activity score at the top of the scale whatever their age or P3 label. Confirming whether the related fix covers the Android blocklist concern and replying is my job, and leaving the issue in an unknown state isn't acceptable.
- **Next action:** Check whether dart-lang/sdk#64644 (eight eMudhra CAs distrusted, closed 2d ago) covers Android's disabled-cert/blocklist handling, answer acn-masatadakurihara's questions, and close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR, and kevmoo (a close collaborator) left an unanswered review question 21h ago, so it is blocked on me. The point is substantive: the next `librarian generate` would delete the newly created CHANGELOG.md. The PR also fixes the issue where new packages are untagged on first release, so unblocking it matters. It is not security, so it stays in the 0.8–0.9 band.
- **Next action:** Reply to kevmoo's inline review comment about CHANGELOG.md being deleted by the next generate, then push a fix (append to lib.Keep or auto-preserve in clean).

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in google-cloud-dart, which I'm responsible for, from a close collaborator, and no human has reviewed it yet (only the Gemini bot). I'm the default reviewer. It was opened 5d ago, is based on main, and the earlier stacked PRs are merged, so nothing blocks it. It is a small pre-release change and not security-related, so it sits mid-range among reviews waiting on me.
- **Next action:** Review sigurdm's pubsub pre-release polish PR (attribution header, CHANGELOG, pubspec, .pubignore) and resolve the license header warnings with him.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repo I'm responsible for, so I'm the default reviewer. Only a bot has commented, which doesn't count. The author is a first-time contributor rather than a collaborator, so it ranks in the lower part of the review range. It's 3 days old and fixes a real behavior bug (ABORTED never retried over REST), and it changes the status.code semantics for JSON errors, so a careful review is warranted. It is not a security issue.
- **Next action:** Review the PR (check the status-to-code mapping and the behavior change for JSON errors) and ask the author to rebase since the branch is behind main.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** A contributor posted a concrete design proposal 4 days ago and is waiting on my reply to move forward, in a repository I'm responsible for. It's my own issue, but no PR exists yet, so the issue is the thing to act on. Not a security issue, and the response is a design sign-off rather than blocking review, so it sits in the middle of the contributor-waiting range.
- **Next action:** Reply to Yusufihsangorgel's 4d-old design proposal: approve or adjust the nullable number/string ProtoEnum approach (including the unknown-name handling) so they can start a preliminary PR.

### 6. dart-lang/http#2027 → predicted 8, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this 9 days ago in dart-lang/http, which I am responsible for (the issue isn't about http2). It is fresh planned work and nothing is waiting on anyone else. It has no replies yet and is a design question that may lead to a breaking change, so it sits mid-range, below reviews and unanswered feedback.
- **Next action:** Decide on the Client.close design (track outstanding requests vs. make close async for a 2.0 release) and write up a concrete plan or prototype.

### 7. dart-lang/http#1981 → predicted 7, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is a non-security feature request in dart-lang/http (cupertino_http, not http2, so within my scope). I assigned myself 5h ago and said I've started working on it, so it is a fresh commitment with nothing waiting on anyone else. That puts it in the planned-work range, but it is a feature request from an outsider rather than something blocking anyone, so it sits mid-range. Note that the TLS pinning topic is a feature, not a vulnerability report.
- **Next action:** Continue the skeleton implementation of the server trust evaluator hook in CupertinoClient and push a draft PR for discussion.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** Kevmoo, a close collaborator, filed this in google-cloud-dart, a repo I'm responsible for, and answered my question 17d ago. The next step is mine and nothing is waiting on anyone else. He said it isn't urgent, and the mid-stream error handling is a real correctness hole. The activity is over two weeks old, so it sits in the middle-to-lower part of the 0.5–0.65 range. It is not a security issue.
- **Next action:** Reply to kevmoo and decide scope: implement the mid-stream SSE error check (item 2) now, and defer or drop incremental JSON framing (item 1) until servers are confirmed to stream it.

### 9. dart-lang/sdk#59846 → predicted 6, priority 0.60
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** a-siva assigned this to me 22 months ago and nothing has happened since, so I still own a fix-or-unassign decision. The parser accepting NUL and other invalid characters can cause proxy desync problems, so it has a security flavor and its age shouldn't pull it down much. It is not a clear vulnerability report, and there is no new activity or direct question, so it stays in the assigned-work range rather than the top security range.
- **Next action:** Decide whether to fix the dart:io header-name validation (reject non-tchar characters per RFC 9110) or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked kevmoo a design question 16d ago in a repo I'm responsible for, and he hasn't replied. That makes it a waiting-on-collaborator item, not one I can act on now. Because it's a recent question to a close collaborator in my own repo, it stays visible in the 0.35-0.5 range. The 16 days of silence put it toward the lower end, and nothing on it is blocking anyone.
- **Next action:** Wait for kevmoo to answer my question on whether to switch Compute to discovery or add convenience extensions to the proto-generated service operations.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was CC'd twice, including by collaborator kevmoo, as owner of dart:io, and the bug is a real crash in widely used code that is uncatchable and has a known fix sketch. Nothing has happened for about 20 months and the repo (dart-lang/sdk) is not one I'm formally responsible for, so it stays in the old-but-important CC range at 0.35-0.5. It is not a security issue, so it doesn't rise further.
- **Next action:** Decide whether to take over the abandoned dart:io CL (or write a fresh fix) for the unsolicited-response crash, or explicitly assign or deprioritize it.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** I filed and am assigned to this issue, but an open PR of mine (#3763, updated 2d ago) already covers it, so the PR is the thing to act on. Per the duplicate rule, the issue ranks well below its PR in the low range. It is fresh and the bug is meaningful (it blocks the shared NSURLSession thread), which keeps it toward the upper end of that range, but there are no new events needing action on the issue.
- **Next action:** Work on PR dart-lang/native#3763, which already closes this issue; nothing to do on the issue itself.

### 13. googleapis/google-cloud-dart#366 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** The issue is from a close collaborator (sigurdm) in my own repo, and I was the last to comment 17d ago, saying I'm deciding how to fix this in general (e.g. via librarian automation). The checklist items are blocked on the generated google_cloud_rpc version bump and a later release, so there is nothing concrete for me to do right now. It stays visible above dead items because it will need doing before the next releases, but nobody has raised anything new in 17 days.
- **Next action:** Wait for the generated google_cloud_rpc version bump; then update the pubspecs in storage and pubsub.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.12
- **Ground truth:** 
- **Model:** The review request went only to dart-ecosystem-team, which I belong to, in dart-lang/tools, which I'm not responsible for. The author is a bot, no one named me, and no human has reviewed or commented. It's an automated revision bump with no stated security angle, so it sits in the low team-review range.
- **Next action:** Nothing to do unless a teammate asks me personally; another dart-ecosystem-team member can review this automated BoringSSL bump.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue is in google-cloud-dart, a repo I own, and it has an open PR (#382) that closes it, so the PR is the thing to act on and the issue is a duplicate of that work. The report is detailed and affects retry behavior for ABORTED errors, and it is fresh (3d), so it sits at the top of the covered-by-PR range. It is a correctness bug in error handling, not a security issue. Nothing remains to do on the issue itself.
- **Next action:** Review PR #382, which fixes this issue, instead of acting on the issue itself.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR, and I requested a review from goderbauer 2d ago. Nothing has happened since, and no feedback is waiting on me. The linked issue #1932 is covered by this PR, so there is nothing to do there either. It is a real build fix, but the next step belongs to the reviewer, so it stays in the low range for PRs waiting on a recently asked reviewer.
- **Next action:** Wait for goderbauer to review; ping again if there's no response after about a week (around Oct 30).

### 17. googleapis/google-cloud-dart#359 → predicted 10, priority 0.50
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned this issue in a repo I own, and it was filed by collaborator kevmoo. It has a clear next step for me and no open PR covers it. The prerequisite retry PRs (#352, #353) have merged, so nothing blocks it. I last commented 10d ago and nobody has replied since. That puts it at the low end of planned work (0.5–0.65), but the non-security bug and wide impact keep it from sinking further.
- **Next action:** Start on the assigned work: harden ServiceException.fromHttpResponse against non-JSON bodies, then add RetryRunner and RequestOptions to ServiceClient.

### 18. dart-lang/http#2031 → predicted 26, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This is a http2 release-prep PR stacked on #2010, #2014 and #2009, and #2014 still has no review, so the lower PRs must be reviewed first. I'm named personally as reviewer, but the PR is blocked by the stack, and I've noted I'm not responsible for http2. It's a tiny version/changelog change that can wait until the stack is reviewed.
- **Next action:** Nothing to do yet; review lower stacked PRs (#2014 first) before this release-prep PR.

### 19. googleapis/google-cloud-dart#345 → predicted 16, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I'm responsible for, and nobody else is waiting on it. I converted it to draft 45 days ago and nothing has happened since, so it is stale. It also has merge conflicts and 5 unresolved bot review threads. Drafts I should finish or abandon sit in the 0.15-0.35 range, and the age puts it near the bottom of that range.
- **Next action:** Decide whether to finish this draft: fix the generator/example issues Gemini flagged, resolve the merge conflicts, and mark it ready for review, or close it.

### 20. dart-lang/core#1007 → predicted 27, priority 0.08
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core is not a repository I'm responsible for, and the review request went to the dart-ecosystem-team rather than to me personally. The author is a first-time contributor whose CLA check failed, and nothing has happened in 15 days that is directed at me. It fixes an issue filed by sigurdm, which keeps it slightly above zero, but the next step isn't mine.
- **Next action:** Nothing for me now; waiting on the contributor to sign the CLA, and the review request went only to the dart-ecosystem-team.

### 21. dart-lang/tools#2544 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This is a security PR (UNC path injection), but it's in dart-lang/tools, which isn't in my list of responsible repositories. Review was requested only from my team (dart-ecosystem-team), and lrhn is already reviewing with 6 unresolved threads, so the ball is with the author. The PR has been quiet for about 2 months, so it ranks as a low-priority team review request rather than something urgent for me.
- **Next action:** Nothing for me to do: jonasfj needs to address lrhn's review feedback; the review request went only to dart-ecosystem-team, and dart-lang/tools is not a repository I'm responsible for.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft with only bot review, so the lower PR needs attention first. The review request went to dart-ecosystem-team rather than to me personally, and the dart-lang/tools repo is not one I own. Mosuem's recent activity is only commits and replies to the bot, so nothing is directed at me.
- **Next action:** Wait for the lower PR #2563 (draft, unreviewed) to be reviewed first; this stacked PR only has a team review request.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested review from liamappelbe 2d ago, with no response yet. Nothing is left for me to do until a reviewer replies or about a week passes. The linked issues #3750 and #3752 are covered by this PR, so they are not separate work.
- **Next action:** Wait for liamappelbe to review; ping again if no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 21, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR and sigurdm already approved it. I asked him 4d ago whether he looked at the non-PubSub parts and can merge without natebosch, and natebosch is still the requested reviewer. Both are asked and unanswered, so nothing is on me yet. The branch is behind main with 2 unresolved threads, but those aren't new feedback awaiting my reply, and the ping isn't due until about a week has passed.
- **Next action:** Wait for sigurdm to reply about merging (or natebosch to review); ping again if still silent after about a week.

### 25. dart-lang/http#579 → predicted 28, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR carries the 'next-breaking-release' label and I said in 2024 that it needs to be coordinated with a major release I don't have bandwidth for. I'm a requested reviewer, but the PR is blocked by that plan, so a review request doesn't make it actionable. The latest activity is a 14-month-old question from a bystander, not directed at me, so the item sits at the bottom of the blocked range.
- **Next action:** Nothing to do now; blocked on a future breaking/major release, so leave it until a semver-major release is planned.

### 26. dart-lang/http#1932 → predicted 14, priority 0.28
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** An open PR of mine (#2034, updated 2d ago) is linked as closing this issue, so the PR is the thing to act on and the issue is a duplicate of that work. The latest comment is only a status request from igordanilovski 4d ago, which doesn't change what I need to do. Although I'm assigned and the bug affects cronet_http users, the real work happens in the PR, so this stays in the low range, well below the PR.
- **Next action:** Nothing to do on this issue; move the work forward on my open PR dart-lang/http#2034 and optionally reply with a pointer to it.

### 27. flutter/devtools#8223 → predicted 29, priority 0.06
- **Ground truth:** 
- **Model:** I was only informationally CC'd by bkonyi two years ago, in a repository I'm not responsible for. The recent activity (a label removal by srawlins and a GSoC question aimed at bkonyi) isn't directed at me. It's a large feature request with no ask of me, so it sits near the bottom, slightly above zero because the CC touches dart:io/HTTP profiling that I know.
- **Next action:** Nothing to do; this is a feature request in flutter/devtools (not my repo) where I was only CC'd, and the GSoC question is addressed to bkonyi.

### 28. dart-lang/http#1837 → predicted 34, priority 0.03
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** I replied a year ago saying the team won't take this on and labeled it P3 and contributions-welcome. Nothing has happened since, and no one is waiting on me. It is an old, low-priority backlog item from an outside author with no PR, so it sits at the bottom.
- **Next action:** Nothing to do; this is a contributions-welcome feature request that I already answered, so wait for a community contributor.

### 29. dart-lang/http#2033 → predicted 35, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2d ago and nothing has happened since: no new commits, no author activity, no unresolved threads. It is a clean, approved infra change from a collaborator, so the next step is the author's to merge. Nothing is left for me to do.
- **Next action:** Nothing to do; I already approved and mosuem can merge it.

### 30. dart-lang/http#1365 → predicted 36, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is labeled package:http2, and my note says I'm not responsible for http2, so it's out of scope. I'm not mentioned, never participated, and the last comment was a generic question 8 months ago. It's an old enhancement with no ask directed at me.
- **Next action:** Nothing to do; this is in the http2 area, which I'm not responsible for, and no one has asked me to act.

### 31. dart-lang/tools#2715 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** dart-lang/tools is not a repository I'm responsible for, and I was only asked through the dart-ecosystem-team review request. davidmorgan is also named personally as the reviewer, which pushes this near zero even though kevmoo is a close collaborator. Nothing is directed at me, and it has been quiet for 2 days.
- **Next action:** Nothing to do; davidmorgan is the named reviewer and my only link is the dart-ecosystem-team request.

### 32. dart-lang/http#2026 → predicted 31, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR touches pkgs/http2, and my note says I'm not responsible for http2. No review has been requested from me and I'm not mentioned. The contributor asked mosuem, who is actively working on this code, to review it, so the next step belongs to him.
- **Next action:** Nothing for me; http2 is outside my responsibility and the contributor asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 30, priority 0.06
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who last commented 34d ago and is the one deciding the direction after the landed PR turned out to be a no-op. I'm only a commenter and was thanked in the description, and my last comment was 37d ago with nothing directed at me since. The related autorelease issue (#3652) is closed, and this is old, speculative, low-value work in a repo where I'm not responsible for the area.
- **Next action:** Nothing to do now; Liam (assignee) is driving this and is leaning toward wrapping objc_msgSend calls in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** I asked the reporter for information 8d ago and added needs-info, so the next step is theirs. An open PR (#1974) already covers the issue, so any real work happens there rather than on the issue. Nothing new has been directed at me since my comment, so this stays in the low range.
- **Next action:** Wait for Keetz to answer my questions; the linked PR #1974 is the thing to review if it needs attention.

### 35. dart-lang/http#1841 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** I thumbs-downed this on 2026-10-05, and the only activity since is the PR link, with nothing asked of me directly; the mention and commits predate the thumbs-down. The issue is also labeled next-breaking-release and has an open PR (#2002) that covers it, so any action belongs on the PR rather than here.
- **Next action:** Nothing on the issue itself; the open PR dart-lang/http#2002 is the thing to review when ready.

### 36. dart-lang/sdk#38148 → predicted 11, priority 0.50
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I marked this not important in August, but two things have happened since. filiph reported a local repro on the current SDK and offered to help (24d ago), and a commit referenced the issue 4d ago, which may be a fix. I'm the assignee, so confirming the fix or replying to filiph is my job. It's an old, intermittent, non-security bug in a repo I'm not formally responsible for, and neither event addresses me directly, so it stays at the low end of the assigned-work range.
- **Next action:** Check commit 2752d56 to see whether it fixes this, then reply to filiph with a status or ask for his repro, or unassign if I'm not going to work on it.
