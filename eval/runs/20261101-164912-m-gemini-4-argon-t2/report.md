# Gitilizer eval: m-gemini-4-argon-t2

strategy `pointwise` · model `gemini-4-argon` · thinking `default` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-164912

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.705 ± 0.000 |
| spearman | 0.820 ± 0.000 |
| pairwise_acc | 0.852 ± 0.000 |
| ndcg | 0.980 ± 0.000 |
| ndcg@5 | 0.979 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 3.667 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.900 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.537 ± 0.000 | 0.931 ± 0.000 | 0.600 ± 0.000 | 3.200 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Respond to the security questions regarding certificate revocation/blocklists on Android and evaluate the impact of the eMudhra CA compromise on this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Respond to kevmoo's inline review comment on internal/librarian/dart/bump.go and update the PR if needed. |
| 3 | 3.0 (3) | +0.0 | 0.78 | 1/1 | googleapis/google-cloud-dart#376 | A | Review this PR from collaborator sigurdm. |
| 4 | 6.0 (6) | +2.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR from an external contributor in googleapis/google-cloud-dart. |
| 5 | 5.0 (5) | +0.0 | 0.72 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's proposed design sketch for ProtoEnum and reply so they can proceed with implementation. |
| 6 | 12.0 (12) | +6.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | Investigate and implement the proposed changes to `Client.close` semantics, or decide whether to defer it to a 2.0 release. |
| 7 | 8.0 (8) | +1.0 | 0.62 | 1/1 | dart-lang/http#1981 | B | Implement the server trust evaluation hook in CupertinoClient and open a PR. |
| 8 | 11.0 (11) | +3.0 | 0.56 | 1/1 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo and implement the mid-stream SSE error handling (and/or incremental JSON streaming) in `_makeStreamingRequest()`. |
| 9 | 4.0 (4) | -5.0 | 0.75 | 1/1 | dart-lang/sdk#59846 | B | Investigate and fix the HTTP header parser in dart:io to reject invalid characters in header names, or unassign if not responsible. |
| 10 | 13.0 (13) | +3.0 | 0.42 | 0/1 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to reply to my question about switching to discovery vs. adding convenience extensions (or follow up if needed). |
| 11 | 14.0 (14) | +3.0 | 0.40 | 1/1 | dart-lang/sdk#31275 | A | Investigate and revive the abandoned CL to fix the uncatchable HttpClient exception. |
| 12 | 19.0 (19) | +7.0 | 0.18 | 0/1 | dart-lang/native#3752 | B | Follow up on the linked PR dart-lang/native#3763 instead of this issue. |
| 13 | 10.0 (10) | -3.0 | 0.58 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on a general approach (or manually update the `google_cloud_rpc` dependency constraints) and implement it. |
| 14 | 16.0 (16) | +2.0 | 0.20 | 1/1 | dart-lang/tools#2719 | B | Optionally review and approve this automated BoringSSL revision bump as part of the dart-ecosystem-team. |
| 15 | 15.0 (15) | +0.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Act on the linked PR #382 rather than this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Waiting on goderbauer to review this PR (requested 2 days ago). |
| 17 | 9.0 (9) | -8.0 | 0.62 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the remaining retry and RequestOptions changes in ServiceClient and the code generator, as I self-assigned this issue. |
| 18 | 24.0 (24) | +6.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | Review the lower PRs in the stack (#2014) before reviewing and merging this release PR. |
| 19 | 18.0 (18) | -1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Finish the draft PR (resolve merge conflicts and bot feedback) or close it if no longer needed. |
| 20 | 20.0 (20) | +0.0 | 0.15 | 1/1 | dart-lang/core#1007 | B | Optionally review this PR if CLA is signed, though it is a shared team request in a repository I don't own. |
| 21 | 30.0 (30) | +9.0 ⚠️ | 0.03 | 0/1 | dart-lang/tools#2544 | B | Waiting on jonasfj to address review feedback from lrhn. |
| 22 | 25.0 (25) | +3.0 | 0.08 | 0/1 | dart-lang/tools#2710 | B | Wait for the base PR (#2563) to leave draft status and be reviewed first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 21.0 (21) | -3.0 | 0.12 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm or natebosch to respond about reviewing/merging the PR. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Wait until a future breaking major release of `package:http` is planned, as this PR introduces a breaking API change. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1932 | B | Follow through on PR dart-lang/http#2034, which already addresses and closes this issue. |
| 27 | 32.0 (32) | +5.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | Nothing for me to do; this is a feature request in the flutter/devtools repository. |
| 28 | 27.0 (27) | -1.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | None; waiting for an external contributor to take this on if interested. |
| 29 | 31.0 (31) | +2.0 | 0.02 | 0/1 | dart-lang/http#2033 | A | Wait for the author (@mosuem) to merge the PR. |
| 30 | 35.0 (35) | +5.0 | 0.01 | 0/1 | dart-lang/http#1365 | A | None; this issue is for package:http2, which is outside my stated responsibility. |
| 31 | 28.0 (28) | -3.0 | 0.04 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review the PR. |
| 32 | 33.0 (33) | +1.0 | 0.01 | 0/1 | dart-lang/http#2026 | A | None; this PR is for package:http2 (outside my scope) and the author directly asked @mosuem to review it. |
| 33 | 29.0 (29) | -4.0 | 0.03 | 0/1 | dart-lang/native#3653 | A | None; this issue is owned by liamappelbe in a repository I do not own. |
| 34 | 34.0 (34) | +0.0 | 0.01 | 0/1 | dart-lang/http#1972 | B | Waiting on the reporter to reply to my questions, and any action should happen on the linked PR #1974. |
| 35 | 36.0 (36) | +1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | Nothing to do on this issue; any action belongs on the linked PR #2002 (and this issue was marked thumbs-down after the last activity). |
| 36 | 7.0 (7) | -29.0 ⚠️ | 0.65 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph to ask for their local reproduction steps, and check if commit 2752d56 resolved the issue. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue regarding certificate trust on Android that I both authored and am assigned to. Three days ago, a user raised urgent security questions on this thread regarding the recent eMudhra intermediate CA compromise and whether `dart:io` honors Android certificate blocklists, alongside a link to a recently closed related issue (#64644). Because this is my security issue with new activity and questions, it takes top priority regardless of its age or P3 label.
- **Next action:** Respond to the security questions regarding certificate revocation/blocklists on Android and evaluate the impact of the eMudhra CA compromise on this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR fixing a P2 issue in googleapis/google-cloud-dart, and a close collaborator (kevmoo) left an unanswered inline review question 21 hours ago. Addressing review feedback on my own PR to prevent my work from stalling and unblocking the reviewer is a high-priority task.
- **Next action:** Respond to kevmoo's inline review comment on internal/librarian/dart/bump.go and update the PR if needed.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.78
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in `googleapis/google-cloud-dart`, a repository I am responsible for, authored by close collaborator `sigurdm`. Its base branch is `main` (the earlier stacked PRs #292 and #339 have already been merged), and no human has reviewed it yet, making me the default reviewer blocking it from moving forward.
- **Next action:** Review this PR from collaborator sigurdm.

### 4. googleapis/google-cloud-dart#382 → predicted 6, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in a repository I am responsible for (googleapis/google-cloud-dart), making me the default reviewer. Only a bot has reviewed it so far since it was opened 3 days ago. Since the author is a first-time contributor rather than a close collaborator, it sits in the middle of the 0.65–0.8 range for reviews waiting on me.
- **Next action:** Review this PR from an external contributor in googleapis/google-cloud-dart.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I opened in a repository I am responsible for (`googleapis/google-cloud-dart`). I explicitly asked the contributor to share a design before writing code, and they replied 4 days ago with a concrete proposal. They are now blocked waiting on my feedback to move forward.
- **Next action:** Review Yusufihsangorgel's proposed design sketch for ProtoEnum and reply so they can proceed with implementation.

### 6. dart-lang/http#2027 → predicted 12, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this issue myself 9 days ago in a core part of `dart-lang/http`, which I am responsible for, and it is not waiting on anyone else. As my own recently planned work, it should stay visible on my list below active reviews and blocking items.
- **Next action:** Investigate and implement the proposed changes to `Client.close` semantics, or decide whether to defer it to a 2.0 release.

### 7. dart-lang/http#1981 → predicted 8, priority 0.62
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is an issue in a repository I am responsible for (`dart-lang/http`) that I assigned to myself and explicitly stated I have started working on 5 hours ago. Because it is an active commitment and my own planned work currently in progress, it sits firmly in the 0.5-0.65 range below unblocking others or reviewing waiting PRs.
- **Next action:** Implement the server trust evaluation hook in CupertinoClient and open a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.56
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I am responsible for (`googleapis/google-cloud-dart`), filed by a close collaborator (`kevmoo`), where he has already answered my clarifying question. The guidelines state that an issue in my repository filed by a close collaborator with a clear next step for me rates in the 0.5–0.65 range, above anything waiting on someone else, even when the collaborator says it isn't urgent.
- **Next action:** Reply to kevmoo and implement the mid-stream SSE error handling (and/or incremental JSON streaming) in `_makeStreamingRequest()`.

### 9. dart-lang/sdk#59846 → predicted 4, priority 0.75
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned to me in `dart:io` and involves lax HTTP header parsing accepting NUL and control characters (`\x0b`), which can cause HTTP request smuggling or header injection vulnerabilities with upstream proxies. Although there has been no recent activity (22 months old), security-adjacent issues assigned to me in core HTTP parsing should be addressed rather than left open indefinitely. It ranks high as an assigned bug with security implications, just below active security incidents or items with new activity.
- **Next action:** Investigate and fix the HTTP header parser in dart:io to reject invalid characters in header names, or unassign if not responsible.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.42
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in `googleapis/google-cloud-dart`, a repository I am responsible for, and was filed by my close collaborator `kevmoo`. However, I asked a design question 16 days ago about whether to switch to the discovery spec or add convenience extensions, and `kevmoo` has not replied yet. Since it is waiting on his response in my own repo, it sits in the 0.35–0.5 range below items I can immediately act on.
- **Next action:** Wait for kevmoo to reply to my question about switching to discovery vs. adding convenience extensions (or follow up if needed).

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old but important P2 crash bug in `dart:io` (`HttpClient`) where I was CC'd as the library owner, including a ping from my collaborator `kevmoo`. Although the thread has been dormant for over 20 months, there is a previously verified patch waiting to be revived and landed.
- **Next action:** Investigate and revive the abandoned CL to fix the uncatchable HttpClient exception.

### 12. dart-lang/native#3752 → predicted 19, priority 0.18
- **Ground truth:** 
- **Model:** I filed and assigned this issue to myself 6 days ago, and I already have an open PR (dart-lang/native#3763) that fixes it. Because an open PR covers this issue, any work or follow-up should happen on the PR rather than the issue itself, placing this in the low priority range.
- **Next action:** Follow up on the linked PR dart-lang/native#3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.58
- **Ground truth:** 
- **Model:** This issue is in a repository I am responsible for (`googleapis/google-cloud-dart`), was filed by a close collaborator (`sigurdm`), and the prerequisites (#352 and #353) have been merged. In my last comment 17 days ago, I indicated I was deciding how to fix this, which puts the ball in my court as my own planned work. It fits squarely in the 0.5-0.65 range for collaborator issues in my repositories and things I said I'm working on.
- **Next action:** Decide on a general approach (or manually update the `google_cloud_rpc` dependency constraints) and implement it.

### 14. dart-lang/tools#2719 → predicted 16, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated PR in `dart-lang/tools`, which is not a repository I am primarily responsible for. The review request is to the shared `dart-ecosystem-team` rather than to me personally, and no specific reviewer is assigned yet. Therefore, it falls into the low-priority range for team review requests in non-owned repositories.
- **Next action:** Optionally review and approve this automated BoringSSL revision bump as part of the dart-ecosystem-team.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a legitimate bug report in `googleapis/google-cloud-dart`, a repository I am responsible for. However, the author has already opened a pull request (#382) that fixes this issue. Following the rule to avoid duplicates, the PR is the item to act on, so this issue is ranked in the low range (0.15–0.35) well below the PR.
- **Next action:** Act on the linked PR #382 rather than this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http where I requested a review from goderbauer 2 days ago. Since there has been no response yet and less than a week has passed, there is nothing for me to do right now except wait for the reviewer.
- **Next action:** Waiting on goderbauer to review this PR (requested 2 days ago).

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.62
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue in a repository I am responsible for (`googleapis/google-cloud-dart`), filed by a close collaborator (`kevmoo`), which I assigned to myself and recently refined 10 days ago. It represents my own active planned work with a clear next step for me and nothing blocking on anyone else. It sits in the 0.5–0.65 range below urgent reviews or blocking questions.
- **Next action:** Implement the remaining retry and RequestOptions changes in ServiceClient and the code generator, as I self-assigned this issue.

### 18. dart-lang/http#2031 → predicted 24, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although collaborator mosuem personally requested my review on this PR, it is stacked on top of open PRs, including #2014 which has not been reviewed yet. Following the guidelines, stacked PRs waiting on lower PRs to be reviewed and landed first should be scored in the 0.05–0.15 range.
- **Next action:** Review the lower PRs in the stack (#2014) before reviewing and merging this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I maintain (`googleapis/google-cloud-dart`), which I converted to draft 45 days ago. There is no human reviewer waiting on me, and it currently has merge conflicts. My own stale drafts that I should eventually finish or abandon fall into the low-priority range (0.15–0.35).
- **Next action:** Finish the draft PR (resolve merge conflicts and bot feedback) or close it if no longer needed.

### 20. dart-lang/core#1007 → predicted 20, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in `dart-lang/core`, which is not one of the repositories I am personally responsible for. The review request is for the `dart-ecosystem-team` rather than me personally, and the author is a first-time contributor who may not have signed the CLA yet. Therefore, this is a low-priority team review request.
- **Next action:** Optionally review this PR if CLA is signed, though it is a shared team request in a repository I don't own.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.03
- **Ground truth:** 
- **Model:** Although this is a security-related PR, it is in a repository I am not responsible for (`dart-lang/tools`) and my involvement is only via a team review request (`dart-ecosystem-team`). Furthermore, another reviewer (`lrhn`) was specifically requested, has already conducted two rounds of review, and left unresolved feedback that the author (`jonasfj`) has not yet addressed.
- **Next action:** Waiting on jonasfj to address review feedback from lrhn.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.08
- **Ground truth:** 
- **Model:** This PR is in `dart-lang/tools` (a repository I am not responsible for) with only a team review request to `dart-ecosystem-team`. Furthermore, it is stacked on PR #2563, which is still an unreviewed draft, meaning the base PR needs to be finalized and reviewed before this one.
- **Next action:** Wait for the base PR (#2563) to leave draft status and be reviewed first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR where I requested a review from liamappelbe 2 days ago (including a weekend). There has been no response yet, and not enough time has passed to warrant a follow-up ping, so it is waiting on the reviewer.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 21, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR and I asked my collaborator sigurdm 4 days ago whether he reviewed the non-PubSub parts so we can merge without waiting on natebosch. Since I am waiting on a response to a recent review/merge ping (less than a week old), there is nothing for me to do right now.
- **Next action:** Wait for sigurdm or natebosch to respond about reviewing/merging the PR.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** Although I am listed as a requested reviewer in a repository I am responsible for, this PR is labeled `next-breaking-release` and I already explicitly noted that it must wait for a future major version bump. The guidelines specify that a personal review request does not make an item urgent when the PR is explicitly waiting for a future breaking release, placing it in the 0.05–0.15 range. There has been no meaningful activity on the PR itself for over two years.
- **Next action:** Wait until a future breaking major release of `package:http` is planned, as this PR introduces a breaking API change.

### 26. dart-lang/http#1932 → predicted 17, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This bug in my repository is assigned to me and has recent user pings, but I already have an open PR (dart-lang/http#2034) that fixes it. Per the duplicate rule, the PR is the item to act on, so the issue itself should be ranked low in the 0.15–0.35 range.
- **Next action:** Follow through on PR dart-lang/http#2034, which already addresses and closes this issue.

### 27. flutter/devtools#8223 → predicted 32, priority 0.02
- **Ground truth:** 
- **Model:** This is a two-year-old feature request in a repository I am not responsible for (`flutter/devtools`). I was only CC'd for informational purposes over two years ago, and the recent activity is just a label change with nothing requested of me.
- **Next action:** Nothing for me to do; this is a feature request in the flutter/devtools repository.

### 28. dart-lang/http#1837 → predicted 27, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old P3 enhancement request in dart-lang/http where I already responded that the Dart team is unlikely to take it on and marked it as contributions-welcome. There has been no activity since my comment 12 months ago, so nothing is needed from me.
- **Next action:** None; waiting for an external contributor to take this on if interested.

### 29. dart-lang/http#2033 → predicted 31, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already approved this PR 2 days ago and there has been no activity or new commits since then. As far as I am concerned, my review is done and it is waiting on the author to merge.
- **Next action:** Wait for the author (@mosuem) to merge the PR.

### 30. dart-lang/http#1365 → predicted 35, priority 0.01
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is labeled 'package:http2' in dart-lang/http, and my repository notes explicitly state that I am not responsible for http2. Furthermore, I have never participated in or been mentioned on this thread, and the last activity was 8 months ago.
- **Next action:** None; this issue is for package:http2, which is outside my stated responsibility.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.04
- **Ground truth:** 
- **Model:** This PR is in `dart-lang/tools`, a repository I am not responsible for. Although my team (`dart-ecosystem-team`) was requested for review, `davidmorgan` was specifically named as a reviewer, so this is on him rather than me.
- **Next action:** Waiting on davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 33, priority 0.01
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** Although this PR is in `dart-lang/http`, all changes are within `pkgs/http2` and it has the `package:http2` label, which is explicitly outside my area of responsibility per my repository notes. Furthermore, I have not been mentioned or asked to review, and the author has explicitly requested a review from `@mosuem`.
- **Next action:** None; this PR is for package:http2 (outside my scope) and the author directly asked @mosuem to review it.

### 33. dart-lang/native#3653 → predicted 29, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, which is not one of the repositories I am responsible for, and it is assigned to liamappelbe. Although I was mentioned in the description and commented earlier in the thread, no one is asking me for input or action, and the underlying problem I cared about (#3652) is already closed.
- **Next action:** None; this issue is owned by liamappelbe in a repository I do not own.

### 34. dart-lang/http#1972 → predicted 34, priority 0.01
- **Ground truth:** 
- **Model:** I asked the reporter for clarifying information 8 days ago and added the 'needs-info' label, and there has been no response on this issue since. Furthermore, there is an open PR (#1974) linked to this issue, so any current activity should be handled on the PR rather than here.
- **Next action:** Waiting on the reporter to reply to my questions, and any action should happen on the linked PR #1974.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** This issue was given a thumbs-down on 2026-10-05, and no activity has occurred on it since 2026-10-02. Additionally, there is already an open PR (dart-lang/http#2002) addressing this issue, so any review or follow-up should happen on the PR rather than here.
- **Next action:** Nothing to do on this issue; any action belongs on the linked PR #2002 (and this issue was marked thumbs-down after the last activity).

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.65
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although I previously marked this issue with a thumbs-down in August 2026, I am the assignee and there has been significant new activity since then. A contributor (filiph) recently commented that they have a local reproduction of this previously intermittent bug and asked how they can help, and a commit also referenced this issue 4 days ago. I should follow up with filiph or verify the recent commit.
- **Next action:** Reply to filiph to ask for their local reproduction steps, and check if commit 2752d56 resolved the issue.
