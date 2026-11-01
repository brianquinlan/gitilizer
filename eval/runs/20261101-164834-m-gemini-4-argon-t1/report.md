# Gitilizer eval: m-gemini-4-argon-t1

strategy `pointwise` · model `gemini-4-argon` · thinking `default` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-164834

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.721 ± 0.000 |
| spearman | 0.825 ± 0.000 |
| pairwise_acc | 0.860 ± 0.000 |
| ndcg | 0.981 ± 0.000 |
| ndcg@5 | 0.981 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.556 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.900 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.750 ± 0.000 |
| B | 20 | 0.547 ± 0.000 | 0.943 ± 0.000 | 0.600 ± 0.000 | 3.200 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Respond to the security questions regarding the compromised eMudhra intermediate CA keys and Android certificate revocation/blocklist enforcement, verifying how dart-lang/sdk#64644 applies here. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's inline review comment on internal/librarian/dart/bump.go and update the PR if needed. |
| 3 | 3.0 (3) | +0.0 | 0.78 | 1/1 | googleapis/google-cloud-dart#376 | A | Review this pull request from sigurdm. |
| 4 | 6.0 (6) | +2.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this pull request from a first-time contributor. |
| 5 | 4.0 (4) | -1.0 | 0.72 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's proposed `ProtoEnum` design sketch and reply so they can proceed with implementation. |
| 6 | 10.0 (10) | +4.0 | 0.58 | 1/1 | dart-lang/http#2027 | B | Decide on the design for `Client.close` (tracking requests vs. making it async in a 2.0 release) and implement the changes. |
| 7 | 8.0 (8) | +1.0 | 0.62 | 1/1 | dart-lang/http#1981 | B | Implement the server trust evaluation hook in CupertinoClient and open a PR. |
| 8 | 11.0 (11) | +3.0 | 0.58 | 1/1 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo's answer or implement the fix for mid-stream SSE error handling (and decide whether to scope out incremental JSON array decoding). |
| 9 | 5.0 (5) | -4.0 | 0.72 | 1/1 | dart-lang/sdk#59846 | B | Investigate and fix the HTTP header name validation in `dart:io`, or unassign if it is no longer on my plate. |
| 10 | 13.0 (13) | +3.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to reply to my question about switching to discovery vs. adding convenience extensions, or follow up if needed. |
| 11 | 14.0 (14) | +3.0 | 0.35 | 1/1 | dart-lang/sdk#31275 | A | Consider reviving the abandoned Gerrit CL to fix the uncatchable HttpClient exception. |
| 12 | 17.0 (17) | +5.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Follow up on the linked PR dart-lang/native#3763 rather than this issue. |
| 13 | 12.0 (12) | -1.0 | 0.58 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on the general approach (e.g., librarian automation) or manually update the `google_cloud_rpc` version constraints in `google_cloud_storage` and `google_cloud_pubsub`. |
| 14 | 19.0 (19) | +5.0 | 0.18 | 1/1 | dart-lang/tools#2719 | B | Optionally review this automated BoringSSL update if no one else on the team picks it up. |
| 15 | 15.0 (15) | +0.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review the linked PR #382 instead of acting on this issue directly. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for goderbauer to review the PR. |
| 17 | 9.0 (9) | -8.0 | 0.60 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner, RequestOptions, and ServiceException changes in google_cloud_rpc and the generator templates. |
| 18 | 24.0 (24) | +6.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | Review the unreviewed lower PR in the stack (#2014) before reviewing this release preparation PR. |
| 19 | 18.0 (18) | -1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Finish this draft PR (rebase/resolve conflicts and address bot comments) or close it if no longer needed. |
| 20 | 20.0 (20) | +0.0 | 0.16 | 1/1 | dart-lang/core#1007 | B | Optionally review this PR as a member of dart-ecosystem-team, though it is not in a repository I own and may still be awaiting a CLA signature. |
| 21 | 30.0 (30) | +9.0 ⚠️ | 0.03 | 0/1 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn's review feedback. |
| 22 | 25.0 (25) | +3.0 | 0.08 | 0/1 | dart-lang/tools#2710 | B | Wait for the base PR (#2563) to leave draft status and be reviewed first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Waiting on liamappelbe to review the PR. |
| 24 | 21.0 (21) | -3.0 | 0.15 | 0/1 | googleapis/google-cloud-dart#373 | B | Waiting on sigurdm (or natebosch) to respond to the review/merge question. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Wait until a future breaking major release of `package:http` is planned. |
| 26 | 16.0 (16) | -10.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | Follow through on PR #2034 to close this issue. |
| 27 | 29.0 (29) | +2.0 | 0.03 | 0/1 | flutter/devtools#8223 | B | Nothing for me to do; this is a feature request for the DevTools team. |
| 28 | 27.0 (27) | -1.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | None; waiting for an external contributor if someone decides to build this outside the repo. |
| 29 | 34.0 (34) | +5.0 | 0.01 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge the PR. |
| 30 | 35.0 (35) | +5.0 | 0.01 | 0/1 | dart-lang/http#1365 | A | None; this issue is for package:http2, which is outside your area of responsibility. |
| 31 | 28.0 (28) | -3.0 | 0.04 | 0/1 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the PR. |
| 32 | 31.0 (31) | -1.0 | 0.02 | 0/1 | dart-lang/http#2026 | A | No action needed; this PR is for package:http2 (outside your scope) and the author specifically asked @mosuem to review it. |
| 33 | 32.0 (32) | -1.0 | 0.02 | 0/1 | dart-lang/native#3653 | A | None; this issue is owned by liamappelbe in a repository I am not responsible for. |
| 34 | 33.0 (33) | -1.0 | 0.02 | 0/1 | dart-lang/http#1972 | B | Waiting on the reporter to reply to my questions, and any action is tracked on linked PR #1974. |
| 35 | 36.0 (36) | +1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | Nothing to do on this issue; any action should be taken on PR #2002. |
| 36 | 7.0 (7) | -29.0 ⚠️ | 0.65 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph about the reproducer and check if the recent commit fixed the issue, or unassign myself if I am no longer working on dart:io. |

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
- **Model:** This is a security issue regarding certificate trust on Android that I both authored and am assigned to. A user recently raised urgent questions about how a live CA compromise (eMudhra intermediate keys) interacts with this vulnerability, and another commenter linked a recently closed mitigation issue (#64644). Because security issues that I own with new activity take top priority regardless of age or P3 label, I need to verify the status and answer the reporter's questions immediately.
- **Next action:** Respond to the security questions regarding the compromised eMudhra intermediate CA keys and Android certificate revocation/blocklist enforcement, verifying how dart-lang/sdk#64644 applies here.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own open PR fixing an issue in googleapis/google-cloud-dart, and my close collaborator kevmoo left an unanswered review comment 21 hours ago pointing out a potential bug with CHANGELOG.md deletion. Addressing review feedback on my own PR is high priority so my work doesn't stall and kevmoo can complete the review.
- **Next action:** Reply to kevmoo's inline review comment on internal/librarian/dart/bump.go and update the PR if needed.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.78
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open PR in `googleapis/google-cloud-dart`, a repository I am responsible for, authored by a close collaborator (`sigurdm`). It has only been reviewed by a bot and is targeting `main` (the earlier stacked PRs #292 and #339 have already been merged). As the default reviewer for this repository, reviewing a collaborator's unreviewed PR is a high-priority action item on me.
- **Next action:** Review this pull request from sigurdm.

### 4. googleapis/google-cloud-dart#382 → predicted 6, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open PR in `googleapis/google-cloud-dart`, a repository I am responsible for, and it has not been reviewed by a human yet. As the default reviewer for this repository, it is on me to review it. It sits in the 0.65–0.8 range for unreviewed PRs in my repositories, slightly below collaborator PRs since it is from a first-time contributor.
- **Next action:** Review this pull request from a first-time contributor.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I filed in a repository I am responsible for (`googleapis/google-cloud-dart`). I explicitly asked the contributor to share a preliminary design before writing a lot of code, and they replied 4 days ago with a concrete proposal. The contributor is blocked waiting on my feedback to move forward.
- **Next action:** Review Yusufihsangorgel's proposed `ProtoEnum` design sketch and reply so they can proceed with implementation.

### 6. dart-lang/http#2027 → predicted 10, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this issue recently (9 days ago) in `dart-lang/http`, a repository I am responsible for, and it is not related to `http2`. Since there has been no activity and it is not waiting on anyone else, it represents my own planned work and design exploration. It sits in the 0.5-0.65 range for my own recently filed issues, below active reviews or blocking questions.
- **Next action:** Decide on the design for `Client.close` (tracking requests vs. making it async in a 2.0 release) and implement the changes.

### 7. dart-lang/http#1981 → predicted 8, priority 0.62
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is an issue in a repository I am responsible for (`dart-lang/http`) that I assigned to myself and explicitly stated I started working on 5 hours ago. This represents an active commitment and my own planned work, which places it in the 0.5–0.65 range below unblocking others or reviewing waiting PRs.
- **Next action:** Implement the server trust evaluation hook in CupertinoClient and open a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.58
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I am responsible for (`googleapis/google-cloud-dart`), filed by a close collaborator (`kevmoo`). I asked a question 17 days ago and he promptly answered, leaving the ball in my court with a clear next step (at minimum, fixing the mid-stream SSE error handling and deciding on the non-SSE buffering). Even though he noted it isn't urgent, an actionable collaborator issue in my own repo where the collaborator answered my question rates in the 0.5–0.65 band.
- **Next action:** Reply to kevmoo's answer or implement the fix for mid-stream SSE error handling (and decide whether to scope out incremental JSON array decoding).

### 9. dart-lang/sdk#59846 → predicted 5, priority 0.72
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned to me and involves HTTP header parsing accepting NUL and whitespace characters (`\x00`, `\x0b`), which carries HTTP request smuggling / security risks with upstream proxies (kenballus is a known HTTP smuggling researcher). Although it has been dormant for 22 months with no recent activity, it is an assigned security-adjacent bug in core `dart:io` HTTP handling that should not be left ignored.
- **Next action:** Investigate and fix the HTTP header name validation in `dart:io`, or unassign if it is no longer on my plate.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in my repository (googleapis/google-cloud-dart) filed by a close collaborator (kevmoo). However, the last activity is my comment from 16 days ago asking him a design question ('Do you think that we'd be better switching to discovery or adding some convenience extensions to the service operations?'). Since it is waiting on his answer, it sits below items I can act on directly right now, but stays visible as an unanswered question to a close collaborator in my own repository.
- **Next action:** Wait for kevmoo to reply to my question about switching to discovery vs. adding convenience extensions, or follow up if needed.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a P2 crash/uncatchable exception bug in widely used `dart:io` `HttpClient` code where I was CC'd as library owner and by collaborator `kevmoo`, and there is an existing verified CL ready to be revived. However, the issue is in `dart-lang/sdk` (not one of my primary repositories) and has been completely dormant for over two years.
- **Next action:** Consider reviving the abandoned Gerrit CL to fix the uncatchable HttpClient exception.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** I filed and assigned this issue to myself, and I already have an open PR (dart-lang/native#3763) that fixes it. Because the PR is the active item to drive to completion, there is nothing left to do directly on this issue until the PR lands.
- **Next action:** Follow up on the linked PR dart-lang/native#3763 rather than this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 12, priority 0.58
- **Ground truth:** 
- **Model:** This is an issue in my repository (`googleapis/google-cloud-dart`) filed by a close collaborator (`sigurdm`) with a clear release requirement. I left the last comment 17 days ago indicating that I was deciding how to resolve this (manual vs. automation), which puts the ball in my court as my own planned work. It fits squarely in the 0.5–0.65 range for collaborator issues in my repositories and things I indicated I am handling.
- **Next action:** Decide on the general approach (e.g., librarian automation) or manually update the `google_cloud_rpc` version constraints in `google_cloud_storage` and `google_cloud_pubsub`.

### 14. dart-lang/tools#2719 → predicted 19, priority 0.18
- **Ground truth:** 
- **Model:** This is an automated PR in `dart-lang/tools`, a repository I am not responsible for. The review request is for the shared `dart-ecosystem-team` rather than me personally, so it falls into the low-priority team review request bucket (0.15-0.35).
- **Next action:** Optionally review this automated BoringSSL update if no one else on the team picks it up.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a well-documented bug report in `googleapis/google-cloud-dart`, a repository I am responsible for. However, the author has already opened PR #382 to fix this issue. To avoid duplicate entries on my priority list, the PR is the item to act on, so this issue is ranked in the low range.
- **Next action:** Review the linked PR #382 instead of acting on this issue directly.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR where I requested a review from goderbauer 2 days ago and there has been no response yet. Since less than a week has passed, there is nothing for me to do right now except wait for the reviewer.
- **Next action:** Wait for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue in my repository (googleapis/google-cloud-dart) filed by a close collaborator (kevmoo), and I assigned it to myself and recently scoped/researched it. Nothing is waiting on anyone else, making this my own active planned work with a clear next step.
- **Next action:** Implement the RetryRunner, RequestOptions, and ServiceException changes in google_cloud_rpc and the generator templates.

### 18. dart-lang/http#2031 → predicted 24, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although collaborator mosuem requested my review personally, this PR is at the top of a stack and depends on #2014, which has not been reviewed yet. Per the guidelines, stacked PRs waiting on lower unreviewed PRs are low priority because the lower PRs need review first.
- **Next action:** Review the unreviewed lower PR in the stack (#2014) before reviewing this release preparation PR.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I am responsible for, which has been sitting untouched for 45 days and now has merge conflicts. Only a bot has reviewed it, and I am not blocking anyone. According to the priority scale, my own stale drafts that I should either finish or abandon belong in the 0.15–0.35 range.
- **Next action:** Finish this draft PR (rebase/resolve conflicts and address bot comments) or close it if no longer needed.

### 20. dart-lang/core#1007 → predicted 20, priority 0.16
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a pull request from a first-time contributor in `dart-lang/core`, which is not one of the repositories I am responsible for. My only connection is a shared team review request (`dart-ecosystem-team`), and the `google-cla` bot noted that a CLA signature was needed before review. Team review requests in repositories I don't own are low priority.
- **Next action:** Optionally review this PR as a member of dart-ecosystem-team, though it is not in a repository I own and may still be awaiting a CLA signature.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.03
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not a repository I am responsible for, and I was only requested for review via the dart-ecosystem-team. Furthermore, lrhn was explicitly requested and is actively reviewing the PR, leaving feedback that the author has not yet addressed.
- **Next action:** Wait for jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.08
- **Ground truth:** 
- **Model:** This PR is in a repository I am not responsible for (`dart-lang/tools`) with only a team review request (`dart-ecosystem-team`), not a personal request. Furthermore, it is stacked on top of PR #2563, which is currently still in draft and unreviewed. Because the base PR must be completed and reviewed first, this PR is blocked and low priority right now.
- **Next action:** Wait for the base PR (#2563) to leave draft status and be reviewed first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request where I requested a review from liamappelbe 2 days ago. Since it has been less than a week and there has been no response yet, it is waiting on the reviewer and there is nothing for me to do right now.
- **Next action:** Waiting on liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 21, priority 0.15
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR where I asked collaborator sigurdm 4 days ago if he also reviewed the non-PubSub parts so we can merge without waiting on natebosch. Since less than a week has passed since my ping, it is currently waiting on him to reply, though I should keep an eye on it to follow up if he doesn't answer soon.
- **Next action:** Waiting on sigurdm (or natebosch) to respond to the review/merge question.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** Although I am listed as a requested reviewer in a repository I own, this PR has the `next-breaking-release` label and I already explicitly noted that it is deferred until we plan a major version bump. The guidelines specifically state that a review request does not count when a PR is explicitly waiting for a future breaking release, and place such PRs in the 0.05–0.15 range. Furthermore, the thread has been dormant for 14 months.
- **Next action:** Wait until a future breaking major release of `package:http` is planned.

### 26. dart-lang/http#1932 → predicted 16, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I am assigned to this bug in a repository I am responsible for, and users have recently asked for status updates. However, I already have an open PR (dart-lang/http#2034) that fixes this issue. Because the PR is the actionable item, this issue is ranked in the low range to avoid duplicate work.
- **Next action:** Follow through on PR #2034 to close this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.03
- **Ground truth:** 
- **Model:** This is a feature request in `flutter/devtools`, a repository I am not responsible for. I was only CC'd for awareness over two years ago regarding potential HTTP profiling impacts, and the recent activity is just label housekeeping by another team.
- **Next action:** Nothing for me to do; this is a feature request for the DevTools team.

### 28. dart-lang/http#1837 → predicted 27, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old P3 enhancement request in dart-lang/http with a 'contributions-welcome' label. I already responded 12 months ago stating that the Dart team will not take this on and suggested how the community could implement it, and there has been no activity since.
- **Next action:** None; waiting for an external contributor if someone decides to build this outside the repo.

### 29. dart-lang/http#2033 → predicted 34, priority 0.01
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already approved this PR 2 days ago and there has been no new activity or commits pushed since then. It is now waiting on the author (mosuem) to merge it, so there is nothing left for me to do.
- **Next action:** Waiting on mosuem to merge the PR.

### 30. dart-lang/http#1365 → predicted 35, priority 0.01
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is labeled 'package:http2' in dart-lang/http, and your notes explicitly state that you are not responsible for http2. You have never interacted with this issue and have not been personally mentioned or asked to act.
- **Next action:** None; this issue is for package:http2, which is outside your area of responsibility.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.04
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. I was only requested via a team (dart-ecosystem-team), and another specific reviewer (davidmorgan) is already explicitly requested to review it.
- **Next action:** Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 31, priority 0.02
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** Although this PR is in dart-lang/http, it solely modifies pkgs/http2 and is labeled 'package:http2', which your notes state you are not responsible for. Additionally, you have not been personally requested or mentioned, and the contributor explicitly asked @mosuem for a review.
- **Next action:** No action needed; this PR is for package:http2 (outside your scope) and the author specifically asked @mosuem to review it.

### 33. dart-lang/native#3653 → predicted 32, priority 0.02
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, which is not one of the repositories I am responsible for, and it is assigned to liamappelbe. Although I was thanked in the description and commented on it over a month ago, there is no question or action directed at me.
- **Next action:** None; this issue is owned by liamappelbe in a repository I am not responsible for.

### 34. dart-lang/http#1972 → predicted 33, priority 0.02
- **Ground truth:** 
- **Model:** I asked the reporter for clarification and added the 'needs-info' label 8 days ago, and they have not replied since. Furthermore, there is an open PR (#1974) linked to fix this issue, so any further action belongs on that PR rather than on this issue.
- **Next action:** Waiting on the reporter to reply to my questions, and any action is tracked on linked PR #1974.

### 35. dart-lang/http#1841 → predicted 36, priority 0.00
- **Ground truth:** 
- **Model:** I marked this issue with a thumbs-down on 2026-10-05, after all the comments and commit references on this thread occurred. Nothing has happened on this issue since then, and there is also an open PR (#2002) covering it. Therefore, its priority is 0.0.
- **Next action:** Nothing to do on this issue; any action should be taken on PR #2002.

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.65
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although I gave this issue a thumbs-down in August 2026, significant new activity has occurred since then: a contributor (filiph) offered a local reproducer and asked how to help 24 days ago, and a commit referenced the issue 4 days ago. Because I am the assignee on this issue, it is on me to respond to the contributor, verify whether the commit resolved it, or unassign myself.
- **Next action:** Reply to filiph about the reproducer and check if the recent commit fixed the issue, or unassign myself if I am no longer working on dart:io.
