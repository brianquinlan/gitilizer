# Gitilizer eval: v5h-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5h.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033515

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.748 ± 0.018 |
| spearman | 0.899 ± 0.015 |
| pairwise_acc | 0.874 ± 0.009 |
| ndcg | 0.986 ± 0.001 |
| ndcg@5 | 0.968 ± 0.003 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.867 ± 0.058 |
| mean_abs_displacement | 3.426 ± 0.179 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.844 ± 0.010 | 0.997 ± 0.001 | 1.000 ± 0.000 | 1.042 ± 0.072 |
| B | 20 | 0.688 ± 0.026 | 0.968 ± 0.002 | 0.800 ± 0.000 | 2.400 ± 0.265 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 3/3 | dart-lang/sdk#48056 | A | Read the eMudhra compromise report, check whether Android disabled/blocklisted certs reach Dart's trust store, and confirm whether the fix in #64644 covers this issue before replying and closing or updating it. |
| 2 | 3.0 (3) | +1.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's inline question about CHANGELOG.md being deleted by the next `librarian generate`, then push a fix (append to lib.Keep or auto-preserve in clean). |
| 3 | 4.3 (4–5) | +1.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub release-polish PR (client attribution header, changelog, pubspec, .pubignore), since I'm the default reviewer and nobody has reviewed it yet apart from the bot. |
| 4 | 5.3 (5–6) | +1.3 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR from a first-time contributor, checking the JSON error status-to-google.rpc.Code mapping and the behavior change for Status.code, then approve or request changes. |
| 5 | 5.3 (4–6) | +0.3 | 0.71 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 4d-old design proposal (nullable number/string ProtoEnum): approve the approach or give feedback so they can start a preliminary PR. |
| 6 | 9.0 (8–10) | +3.0 | 0.52 | 3/3 | dart-lang/http#2027 | B | Decide on the Client.close design (track outstanding requests vs. async close in a 2.0 release) and write up a concrete plan or proposal on the issue. |
| 7 | 7.0 (7) | +0.0 | 0.57 | 3/3 | dart-lang/http#1981 | B | Continue the skeleton implementation of the server trust evaluator hook in CupertinoClient that I started and said I'm working on. |
| 8 | 10.0 (9–11) | +2.0 | 0.51 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether to fix the mid-stream SSE error handling (item 1 of the proposal, which silently yields empty messages) and reply to kevmoo, or defer the incremental JSON part until it is clear servers stream it. |
| 9 | 2.0 (2) | -7.0 | 0.93 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header-name validation (reject non-tchar characters, especially NUL and \x0b) or unassign myself. |
| 10 | 12.0 (12) | +2.0 | 0.42 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my question about switching to discovery versus adding convenience extensions on the service operations. |
| 11 | 13.3 (13–14) | +2.3 | 0.30 | 3/3 | dart-lang/sdk#31275 | A | Decide whether to take over the abandoned CL for the 408 unsolicited-response crash in dart:io HttpClient, or leave it in the backlog. |
| 12 | 16.0 (16) | +4.0 | 0.22 | 0/3 | dart-lang/native#3752 | B | Nothing on the issue itself; drive PR dart-lang/native#3763, which closes it. |
| 13 | 10.7 (10–11) | -2.3 | 0.51 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide how to handle the rpc version bump (manually or via librarian automation), then bump google_cloud_rpc in the storage and pubsub pubspecs before releasing. |
| 14 | 19.3 (18–20) | +5.3 | 0.11 | 0/3 | dart-lang/tools#2719 | B | Nothing to do now; the review request went to the dart-ecosystem-team, so leave it for the team unless someone asks me directly. |
| 15 | 14.0 (13–15) | -1.0 | 0.27 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which fixes this issue, instead of acting on the issue itself. |
| 16 | 20.7 (19–22) | +4.7 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping again if there is no response after about a week (around 2026-10-30). |
| 17 | 8.3 (8–9) | -8.7 | 0.55 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the ServiceException.fromHttpResponse hardening and add RetryRunner/RequestOptions to ServiceClient, or unassign myself if I'm not going to do it. |
| 18 | 26.0 (24–28) | +8.0 | 0.07 | 0/3 | dart-lang/http#2031 | A | Nothing yet: wait for lower stacked PRs (#2014 still unreviewed) to be reviewed and merged; http2 is outside my responsibility. |
| 19 | 17.0 (17) | -2.0 | 0.22 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft: fix the bot's review comments, resolve the merge conflict with main, and mark it ready, or close it. |
| 20 | 23.3 (22–24) | +3.3 | 0.10 | 0/3 | dart-lang/core#1007 | B | Nothing to do now; the author must sign the CLA first, and other ecosystem team members can review the package:path change. |
| 21 | 22.0 (18–30) | +1.0 | 0.14 | 0/3 | dart-lang/tools#2544 | B | Nothing to do: the review request went to dart-ecosystem-team in a repo I don't own, and lrhn is already reviewing while jonasfj addresses his feedback. |
| 22 | 21.7 (21–23) | -0.3 | 0.11 | 0/3 | dart-lang/tools#2710 | B | Nothing now; review #2563 (the base PR) first, then return to this stacked PR. |
| 23 | 21.7 (20–23) | -1.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping again if no response after about a week. |
| 24 | 24.3 (23–25) | +0.3 | 0.10 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether he reviewed the non-PubSub parts, or for natebosch to review; ping again if still silent after about a week. |
| 25 | 26.3 (25–27) | +1.3 | 0.08 | 0/3 | dart-lang/http#579 | B | Nothing to do now; this is blocked until a semver-major release of package:http is planned. |
| 26 | 14.7 (14–15) | -11.3 ⚠️ | 0.26 | 0/3 | dart-lang/http#1932 | B | Nothing to do on the issue itself; review and land my open PR dart-lang/http#2034, then reply to the status question. |
| 27 | 30.0 (28–31) | +3.0 | 0.03 | 0/3 | flutter/devtools#8223 | B | Nothing to do; I was only CC'd by bkonyi in 2024 in a repo I'm not responsible for, and the recent activity is just a label change. |
| 28 | 32.3 (32–33) | +4.3 | 0.03 | 0/3 | dart-lang/http#1837 | A | Nothing to do; I already replied that this is a community contribution opportunity, so wait for a contributor to pick it up. |
| 29 | 33.7 (33–34) | +4.7 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing to do; I already approved and the PR is waiting on mosuem to merge. |
| 30 | 35.0 (35) | +5.0 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do: this is in the http2 package area, which I'm not responsible for. |
| 31 | 29.0 (27–30) | -2.0 | 0.03 | 0/3 | dart-lang/tools#2715 | B | Nothing to do: davidmorgan is the named reviewer and the team request is shared; dart-lang/tools is not a repo I'm responsible for. |
| 32 | 30.3 (29–33) | -1.7 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing for me to do: this is http2, which I'm not responsible for, and the contributor asked mosuem to review. |
| 33 | 26.7 (26–28) | -6.3 | 0.07 | 0/3 | dart-lang/native#3653 | A | Nothing to do now; liamappelbe owns this and is leaning toward wrapping objc_msgSend calls in autorelease pools instead. |
| 34 | 23.0 (19–31) | -11.0 ⚠️ | 0.13 | 0/3 | dart-lang/http#1972 | B | Nothing to do on the issue itself; the open PR #1974 covers it, and the reporter hasn't answered my needs-info questions. |
| 35 | 31.7 (29–34) | -3.3 | 0.03 | 0/3 | dart-lang/http#1841 | B | Nothing on the issue; the open PR #2002 covers it, so review the PR instead. |
| 36 | 36.0 (36) | +0.0 | 0.00 | 0/3 | dart-lang/sdk#38148 | B | Nothing now; I marked this not important in August and nothing directed at me has happened since. Revisit only if someone asks me something directly. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1972** (truth #34) in 2/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1972** (truth #34) in 2/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1972** (truth #34) in 2/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/native#3653** (truth #33) in 1/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 3/3 trial(s)
- **dart-lang/core#1007** (truth #20) placed below **dart-lang/http#1972** (truth #34) in 2/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1932** (truth #26) in 3/3 trial(s)
- **dart-lang/tools#2710** (truth #22) placed below **dart-lang/http#1972** (truth #34) in 2/3 trial(s)
- **dart-lang/tools#2544** (truth #21) placed below **dart-lang/native#3653** (truth #33) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue (CA trust problem) that I filed and am assigned to, and it has new activity in the last 3 days: a report tying it to the eMudhra intermediate CA compromise. Security issues that are mine with new activity belong at the top of the scale, and age or the P3 label shouldn't lower it. Another issue (#64644) already covers distrusting the eight keys and is closed, but I still need to verify and confirm the state here, since leaving a security issue unknown isn't acceptable.
- **Next action:** Read the eMudhra compromise report, check whether Android disabled/blocklisted certs reach Dart's trust store, and confirm whether the fix in #64644 covers this issue before replying and closing or updating it.

### 2. googleapis/librarian#7808 → predicted 3, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unanswered inline review comment 21h ago with an unresolved thread. I'm blocking the merge until I answer it. The PR also fixes google-cloud-dart#358, so the review feedback is the most direct way to unblock it.
- **Next action:** Reply to kevmoo's inline question about CHANGELOG.md being deleted by the next `librarian generate`, then push a fix (append to lib.Keep or auto-preserve in clean).

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in googleapis/google-cloud-dart, a repo I'm responsible for, from a close collaborator (sigurdm), and only a bot has reviewed it. I'm the default reviewer, and it's 5 days old with no human review. It's pre-release polish, not security, so it sits in the middle of the review range rather than the top. The branch is behind main and may need an update, but that doesn't block my review.
- **Next action:** Review sigurdm's pubsub release-polish PR (client attribution header, changelog, pubspec, .pubignore), since I'm the default reviewer and nobody has reviewed it yet apart from the bot.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, where I'm the default reviewer; the only review so far is from a bot, which doesn't count. The author is a first-time contributor, so it ranks below collaborators' PRs, but it is fresh (3 days old) and fixes retry behavior for ABORTED errors over REST. It changes Status.code for JSON errors, which is a behavior change that deserves a careful look. It isn't security-related, and it needs a rebase since the branch is behind main.
- **Next action:** Review this PR from a first-time contributor, checking the JSON error status-to-google.rpc.Code mapping and the behavior change for Status.code, then approve or request changes.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** A contributor is waiting on my reply to move forward: their design sketch is 4 days old and I asked for a design before code. The issue is my own, in a repository I'm responsible for, and it is a p2 bug about spec compliance. No PR covers it yet, so the next step is mine. It is not a security issue, so it stays in the 0.65–0.8 range.
- **Next action:** Reply to Yusufihsangorgel's 4d-old design proposal (nullable number/string ProtoEnum): approve the approach or give feedback so they can start a preliminary PR.

### 6. dart-lang/http#2027 → predicted 10, priority 0.50
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this 9 days ago in dart-lang/http, a repo I'm responsible for. It's design work for me with no one else to wait on, so it counts as fresh planned work. The 'not responsible for http2' note doesn't apply, since this concerns the core Client API. There has been no reply and no urgency, and part of the fix may wait on a breaking 2.0 release, so it sits at the bottom of the planned-work range.
- **Next action:** Decide on the Client.close design (track outstanding requests vs. async close in a 2.0 release) and write up a concrete plan or proposal on the issue.

### 7. dart-lang/http#1981 → predicted 7, priority 0.57
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is in dart-lang/http, which I'm responsible for (cupertino_http isn't the http2 area). I assigned myself 5h ago and said I've started working on it, so it's a fresh commitment that is my own planned work (0.5-0.65). The security angle (certificate pinning) is a feature request, not a vulnerability, so it doesn't get the security boost, and nobody is waiting on me urgently, so it sits mid-range.
- **Next action:** Continue the skeleton implementation of the server trust evaluator hook in CupertinoClient that I started and said I'm working on.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator's (kevmoo) issue in a repository I own, with a clear next step for me: I asked a question and he answered 17d ago, so the ball is back with me. He says it isn't urgent, and the incremental JSON part is speculative, but the mid-stream error handling bug silently swallows errors. It has no PR yet and is not assigned, so it stays in the low-to-middle part of the planned-work range.
- **Next action:** Decide whether to fix the mid-stream SSE error handling (item 1 of the proposal, which silently yields empty messages) and reply to kevmoo, or defer the incremental JSON part until it is clear servers stream it.

### 9. dart-lang/sdk#59846 → predicted 2, priority 0.93
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is a security-relevant bug in widely used dart:io code. Accepting NUL and whitespace in header names can cause request smuggling or proxy issues, and I'm assigned to it. Security items stay at the top regardless of age or lack of recent activity, so I should fix it or hand it off rather than leave it untouched.
- **Next action:** Decide whether to fix the dart:io header-name validation (reject non-tchar characters, especially NUL and \x0b) or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.42
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I last commented 16d ago with a design question to kevmoo, a close collaborator, in my own repo, and he hasn't replied. That makes it a recent question I'm waiting on (0.35–0.5), and it's not something I can act on now. It's an important design decision touching Compute Engine LROs, but the thread has been quiet for over two weeks, so it sits in the lower-middle of the range.
- **Next action:** Wait for kevmoo to answer my question about switching to discovery versus adding convenience extensions on the service operations.

### 11. dart-lang/sdk#31275 → predicted 13, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old but important bug: an uncatchable exception crashes servers, and kevmoo hit it too. I was only CC'd (informational), twice, and the repo is dart-lang/sdk, which is not one I'm responsible for. Nothing has happened in 20 months apart from relabeling. It is not a security issue and nothing is directed at me now, so it stays in the CC-only range, at the lower end because it is old.
- **Next action:** Decide whether to take over the abandoned CL for the 408 unsolicited-response crash in dart:io HttpClient, or leave it in the backlog.

### 12. dart-lang/native#3752 → predicted 16, priority 0.22
- **Ground truth:** 
- **Model:** An open PR (#3763), authored by me, is linked as closing this issue, so the PR is the thing to act on and this issue is a duplicate of that work. The issue is fresh (6d) and I own it, but it has no new activity since I filed it. It ranks well below its PR, in the 0.15–0.35 range for issues covered by a PR.
- **Next action:** Nothing on the issue itself; drive PR dart-lang/native#3763, which closes it.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.50
- **Ground truth:** 
- **Model:** The issue is in a repo I own, filed by a close collaborator (sigurdm), with a clear next step that is mine: decide on the fix and bump the dependency before the release. I commented 17d ago saying I'm deciding on an approach, so I haven't finished it. No new activity since and no PR covers the fix, so it sits at the bottom of the planned-work range. It is a release-blocking correctness issue, but not urgent until a release is cut.
- **Next action:** Decide how to handle the rpc version bump (manually or via librarian automation), then bump google_cloud_rpc in the storage and pubsub pubspecs before releasing.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.12
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision bump in dart-lang/tools, a repository I'm not responsible for. The review request went to dart-ecosystem-team, not to me personally. It is a routine dependency update with no stated security problem, nobody has asked me anything, and it is a small change of 6 added and 2 removed lines. It is fresh (19h), so it sits in the upper part of the low team-review range.
- **Next action:** Nothing to do now; the review request went to the dart-ecosystem-team, so leave it for the team unless someone asks me directly.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue is a real bug in google_cloud_rpc in a repo I own, and it's fresh (3d). But an open PR (#382) already covers it, so the PR is the thing to act on and the issue ranks well below it. It isn't a security issue; it's a retry-correctness bug, so the duplicate rule keeps it in the low range.
- **Next action:** Review PR #382, which fixes this issue, instead of acting on the issue itself.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR, and I requested a review from goderbauer 2 days ago, so the next step belongs to the reviewer and there is nothing for me to do yet. There is no review feedback to answer and no unresolved threads. It fixes issue #1932, which should rank below this PR. The priority stays low until about a week of silence has passed.
- **Next action:** Wait for goderbauer to review; ping again if there is no response after about a week (around 2026-10-30).

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned this issue from collaborator kevmoo in a repo I'm responsible for. The dependent retry PRs (#352, #353) have merged, so nothing blocks me and no open PR covers it. My last comment was 10 days ago narrowing the scope, and nothing new has come in since. That makes it planned work with a clear next step, but not urgent, so it sits mid-range of 'my own planned work'.
- **Next action:** Implement the ServiceException.fromHttpResponse hardening and add RetryRunner/RequestOptions to ServiceClient, or unassign myself if I'm not going to do it.

### 18. dart-lang/http#2031 → predicted 26, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release-prep PR is stacked on other PRs, and #2014 has no review yet, so the lower PRs have to land first. My note says I'm not responsible for http2, although I am personally requested as reviewer. The change is tiny and can wait until the stack is resolved.
- **Next action:** Nothing yet: wait for lower stacked PRs (#2014 still unreviewed) to be reviewed and merged; http2 is outside my responsibility.

### 19. googleapis/google-cloud-dart#345 → predicted 17, priority 0.22
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I'm responsible for. It has been dormant for 45 days, with 5 unresolved bot review threads and a dirty merge state. The draft is mine to finish or abandon, which puts it in the 0.15-0.35 range, and its age puts it at the low end of that range.
- **Next action:** Decide whether to finish this draft: fix the bot's review comments, resolve the merge conflict with main, and mark it ready, or close it.

### 20. dart-lang/core#1007 → predicted 24, priority 0.10
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** The only request is to dart-ecosystem-team, which I belong to, in dart-lang/core, a repository I'm not responsible for, so it isn't addressed to me personally. The CLA check failed and the first-time contributor hasn't fixed it, which blocks review. It fixes an issue filed by sigurdm, which is a small plus, but the PR has been quiet for days.
- **Next action:** Nothing to do now; the author must sign the CLA first, and other ecosystem team members can review the package:path change.

### 21. dart-lang/tools#2544 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is a security PR (UNC path injection), but it is in dart-lang/tools, which I'm not responsible for, and the only request is to my team. lrhn was personally requested and is actively reviewing, with 6 unresolved threads waiting on the author, so the PR is not mine to review or unblock. The last activity was 2 months ago, so it sits at the low end of the team-review-request range.
- **Next action:** Nothing to do: the review request went to dart-ecosystem-team in a repo I don't own, and lrhn is already reviewing while jonasfj addresses his feedback.

### 22. dart-lang/tools#2710 → predicted 21, priority 0.12
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft with no human review, so the lower PR has to be reviewed first. The review request went to dart-ecosystem-team rather than to me personally, but dart-lang/tools is a repository I follow and mosuem is a close collaborator. It is fresh (2d old) but blocked by the stack, so it sits low in the 0.05-0.15 range.
- **Next action:** Nothing now; review #2563 (the base PR) first, then return to this stacked PR.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, and I requested review from liamappelbe 2 days ago. There is no feedback yet and no unresolved threads, so nothing is blocked on me. It is worth a little because it fixes two of my own issues, but until the reviewer responds there is nothing to do.
- **Next action:** Wait for liamappelbe to review; ping again if no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 25, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR and it is approved by sigurdm, but I asked him 4 days ago whether it can merge without natebosch's review, and natebosch is still the requested reviewer. Nothing is blocking on me, so I'm waiting on a recently asked reviewer. The branch is behind main and CI was triggered with a typo'd '/gbcrun', so that is a minor cleanup. Score it low until about a week has passed.
- **Next action:** Wait for sigurdm to answer whether he reviewed the non-PubSub parts, or for natebosch to review; ping again if still silent after about a week.

### 25. dart-lang/http#579 → predicted 27, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR carries the 'next-breaking-release' label, and I said in 2024 that it has to be coordinated with a major release I don't have bandwidth for. The latest activity is a 14-month-old question from a drive-by commenter, not a request aimed at me. The review request on me is stale and the work is blocked by the release plan, so it belongs in the 0.05-0.15 band at the low end.
- **Next action:** Nothing to do now; this is blocked until a semver-major release of package:http is planned.

### 26. dart-lang/http#1932 → predicted 15, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** An open PR of mine (#2034, updated 2d ago) already covers this issue, so the PR is the thing to act on and the issue sits well below it. The latest comment is only a status request, which doesn't change that the real work is on the PR. The bug affects users of cronet_http and I'm assigned, so it stays in the upper part of the low range.
- **Next action:** Nothing to do on the issue itself; review and land my open PR dart-lang/http#2034, then reply to the status question.

### 27. flutter/devtools#8223 → predicted 31, priority 0.03
- **Ground truth:** 
- **Model:** I was only informationally CC'd in 2024 on a DevTools feature request, and devtools isn't one of my repositories. The only recent activity is a label removal by srawlins, and the GSoC question was addressed to bkonyi. Nothing is asked of me, so it sits near the bottom.
- **Next action:** Nothing to do; I was only CC'd by bkonyi in 2024 in a repo I'm not responsible for, and the recent activity is just a label change.

### 28. dart-lang/http#1837 → predicted 33, priority 0.03
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old feature request labeled contributions-welcome and P3. I replied last, saying the Dart team is unlikely to take it on, and nothing has happened since. It is old, low-priority backlog with no action for me, so it sits at the bottom of the scale.
- **Next action:** Nothing to do; I already replied that this is a community contribution opportunity, so wait for a contributor to pick it up.

### 29. dart-lang/http#2033 → predicted 34, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2d ago and there has been no activity since, with no new commits or author replies. It is mergeable with a clean state and no unresolved threads. The remaining step belongs to the author, so there is nothing for me to do.
- **Next action:** Nothing to do; I already approved and the PR is waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is labeled package:http2, and my note says I'm not responsible for http2. I'm only watching the repo, never mentioned, and the last comment from 8 months ago asks nothing of me. It's an old enhancement report, so it sits near the bottom.
- **Next action:** Nothing to do: this is in the http2 package area, which I'm not responsible for.

### 31. dart-lang/tools#2715 → predicted 30, priority 0.03
- **Ground truth:** 
- **Model:** The review request is addressed to dart-ecosystem-team, a team I belong to, in dart-lang/tools, which is not a repository I'm responsible for. davidmorgan is also named personally as a reviewer, so this is near the bottom of the team-request range. Kevmoo is a collaborator and the PR is fresh, but nothing is directed at me personally.
- **Next action:** Nothing to do: davidmorgan is the named reviewer and the team request is shared; dart-lang/tools is not a repo I'm responsible for.

### 32. dart-lang/http#2026 → predicted 29, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** The PR changes pkgs/http2, and my note says I'm not responsible for http2. I'm only watching the repo, I'm not requested as a reviewer, and nobody asked me anything. The contributor addressed mosuem directly, so the next step is theirs. The PR is recent, but that doesn't make it mine.
- **Next action:** Nothing for me to do: this is http2, which I'm not responsible for, and the contributor asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 28, priority 0.06
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is driving it, in dart-lang/native, which is not a repo I'm responsible for. The linked PR already merged, and later discussion from mraleph and liamappelbe concluded the approach likely isn't worth pursuing. The 'Thanks for the tip' mention is an acknowledgement, not a request, and the last activity was 34 days ago.
- **Next action:** Nothing to do now; liamappelbe owns this and is leaning toward wrapping objc_msgSend calls in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 19, priority 0.15
- **Ground truth:** 
- **Model:** An open PR (#1974) is linked to this issue, so the PR is the thing to act on and the issue ranks well below it. I also asked the reporter for information 8d ago, added needs-info, and got no reply, so the issue itself is waiting on them. The PR was just updated and carries a needs-info label, so reviewing it may be worthwhile, but that is tracked on the PR rather than here.
- **Next action:** Nothing to do on the issue itself; the open PR #1974 covers it, and the reporter hasn't answered my needs-info questions.

### 35. dart-lang/http#1841 → predicted 32, priority 0.03
- **Ground truth:** 
- **Model:** I thumbs-downed this on 2026-10-05, and the only activity after that is a PR (#2002) that closes it. The PR is the thing to act on, and the issue is also labeled next-breaking-release. Nothing new is directed at me since the thumbs-down, so it stays near zero.
- **Next action:** Nothing on the issue; the open PR #2002 covers it, so review the PR instead.

### 36. dart-lang/sdk#38148 → predicted 36, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I thumbs-downed this on 2026-08-01. filiph's comment (24d ago) and the copybara commit reference (4d ago) both came after that, but neither asks me anything or changes what I should do. The comment is a general repro report plus an offer to help, and the commit reference is bot activity. I'm assigned in dart-lang/sdk, which isn't a repo I'm responsible for, so nothing here is significant enough to override the thumbs-down.
- **Next action:** Nothing now; I marked this not important in August and nothing directed at me has happened since. Revisit only if someone asks me something directly.
