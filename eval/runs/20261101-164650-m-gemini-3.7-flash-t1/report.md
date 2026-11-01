# Gitilizer eval: m-gemini-3.7-flash-t1

strategy `pointwise` · model `gemini-3.7-flash` · thinking `default` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-164650

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.787 ± 0.000 |
| spearman | 0.920 ± 0.000 |
| pairwise_acc | 0.894 ± 0.000 |
| ndcg | 0.992 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.900 ± 0.000 |
| mean_abs_displacement | 2.778 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.750 ± 0.000 |
| B | 20 | 0.684 ± 0.000 | 0.977 ± 0.000 | 0.800 ± 0.000 | 2.300 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.92 | 1/1 | dart-lang/sdk#48056 | A | Investigate whether Dart on Android honors certificate revocation/blocklists and reply to the security inquiry. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG.md preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.76 | 1/1 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR adding client attribution headers and pre-release polish. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR for handling google.rpc.Code in JSON errors. |
| 5 | 5.0 (5) | +0.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's proposed enum design sketch and confirm whether to proceed with this approach. |
| 6 | 10.0 (10) | +4.0 | 0.52 | 1/1 | dart-lang/http#2027 | B | Propose the breaking change for `Client.close` to the team or start drafting the PR. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook for CupertinoClient. |
| 8 | 9.0 (9) | +1.0 | 0.53 | 1/1 | googleapis/google-cloud-dart#360 | A | Plan or implement the fix for mid-stream error handling and JSON streaming in _makeStreamingRequest. |
| 9 | 8.0 (8) | -1.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | Investigate whether dart:io HTTP header parsing still accepts invalid characters and fix the issue or unassign myself. |
| 10 | 13.0 (13) | +3.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Wait for @kevmoo to reply to my question regarding switching to discovery vs. convenience extensions, or ping him for a follow-up. |
| 11 | 14.0 (14) | +3.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | Revive and land the abandoned CL for dart:io HttpClient if prioritizing this fix. |
| 12 | 18.0 (18) | +6.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Follow progress on PR #3763 which implements the fix for this issue. |
| 13 | 11.0 (11) | -2.0 | 0.50 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide whether to bump the pubspec dependency constraints manually or handle this through tooling automation. |
| 14 | 16.0 (16) | +2.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Waiting on a member of dart-ecosystem-team to review this automated update. |
| 15 | 17.0 (17) | +2.0 | 0.20 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting directly on this issue. |
| 16 | 21.0 (21) | +5.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for goderbauer to review the PR. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in google_cloud_rpc |
| 18 | 24.0 (24) | +6.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (specifically #2014) to be reviewed and landed before reviewing this release prep. |
| 19 | 19.0 (19) | +0.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Resume work to resolve merge conflicts and bot comments, or close the draft PR. |
| 20 | 20.0 (20) | +0.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Waiting on the author to sign the CLA and a repository maintainer to review. |
| 21 | 26.0 (26) | +5.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | Waiting on @jonasfj to address @lrhn's review feedback. |
| 22 | 23.0 (23) | +1.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | Wait for the base PR #2563 to be reviewed and landed. |
| 23 | 22.0 (22) | -1.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Waiting on a review from liamappelbe. |
| 24 | 12.0 (12) | -12.0 ⚠️ | 0.40 | 0/1 | googleapis/google-cloud-dart#373 | B | Waiting for @sigurdm to confirm if his approval covers the non-PubSub changes, or for @natebosch to review. |
| 25 | 25.0 (25) | +0.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Wait for planning and coordination of the next major breaking release for package:http. |
| 26 | 15.0 (15) | -11.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | Follow up on PR #2034 which fixes this issue. |
| 27 | 29.0 (29) | +2.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | Waiting on the DevTools team / bkonyi to drive websocket profiling support. |
| 28 | 27.0 (27) | -1.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | Waiting for a community contribution or further interest from the community. |
| 29 | 32.0 (32) | +3.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on @mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None, as this relates to http2 which is outside my area of responsibility. |
| 31 | 28.0 (28) | -3.0 | 0.04 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review. |
| 32 | 31.0 (31) | -1.0 | 0.01 | 0/1 | dart-lang/http#2026 | A | None; waiting for @mosuem to review as http2 is outside my scope. |
| 33 | 30.0 (30) | -3.0 | 0.02 | 0/1 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide whether to pursue or close the issue. |
| 34 | 35.0 (35) | +1.0 | 0.00 | 0/1 | dart-lang/http#1972 | B | Waiting on reporter to provide reproduction details requested in the needs-info comment. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | None; focus on PR #2002 if review is needed. |
| 36 | 33.0 (33) | -3.0 | 0.00 | 0/1 | dart-lang/sdk#38148 | B | None; no action required as I previously marked this issue as not important. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#361** (truth #10) placed below **googleapis/google-cloud-dart#373** (truth #24) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **googleapis/google-cloud-dart#373** (truth #24) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **googleapis/google-cloud-dart#373** (truth #24) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **googleapis/google-cloud-dart#373** (truth #24) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an assigned security issue concerning TLS certificate trust on Android that I created. A commenter recently raised serious security questions regarding intermediate CA compromises and how Dart validates revoked or disabled certificates on Android. Per the security guidelines, any security issue that is mine and receives new activity requires immediate attention and ranks at the top of the scale.
- **Next action:** Investigate whether Dart on Android honors certificate revocation/blocklists and reply to the security inquiry.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR addressing an issue with Dart package releases. My collaborator kevmoo reviewed it and asked an architectural question regarding CHANGELOG.md preservation during generation/clean, which blocks merging. I need to answer his feedback and adjust the PR to keep my work moving forward.
- **Next action:** Reply to kevmoo's review comment on CHANGELOG.md preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.76
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request from a close collaborator in a repository I am responsible for. Because I am the default reviewer here and only bots have commented so far, this PR is waiting directly on my review.
- **Next action:** Review sigurdm's PR adding client attribution headers and pre-release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a new pull request in googleapis/google-cloud-dart, a repository I am responsible for. Since no human has reviewed it yet, I am the default reviewer. Because the contributor is not one of my usual collaborators, it sits in the regular review band.
- **Next action:** Review this PR for handling google.rpc.Code in JSON errors.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** In a repository I maintain, a contributor has followed up on my request to propose a design sketch before implementing changes across code generation. They are currently blocked on my feedback to move forward with the implementation.
- **Next action:** Review Yusufihsangorgel's proposed enum design sketch and confirm whether to proceed with this approach.

### 6. dart-lang/http#2027 → predicted 10, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this architectural issue in a repository you maintain to address problems with `Client.close` semantics. Because this represents your own planned work and is relatively fresh without anyone else waiting, it serves as an active task on your backlog. A priority around ~0.5 fits planned design work in your primary repo before it ages.
- **Next action:** Propose the breaking change for `Client.close` to the team or start drafting the PR.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned yourself to this issue and announced five hours ago that you started working on it. As active planned work you committed to in your own repository, it should stay prominent on your list.
- **Next action:** Work on implementing the server trust evaluation hook for CupertinoClient.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.53
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in a repository you are responsible for and was filed by a close collaborator (kevmoo). kevmoo responded to your question 17 days ago, leaving the next step on you to decide how to handle non-SSE streaming and implement mid-stream error decoding. Even though kevmoo noted it is not urgent, it is real work waiting on you in your own repo.
- **Next action:** Plan or implement the fix for mid-stream error handling and JSON streaming in _makeStreamingRequest.

### 9. dart-lang/sdk#59846 → predicted 8, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am assigned to this issue regarding invalid character parsing in dart:io HTTP headers, which carries potential security and proxy desync implications. Although it has been inactive for almost two years, it remains an assigned bug on my plate that I need to either address or unassign myself from.
- **Next action:** Investigate whether dart:io HTTP header parsing still accepts invalid characters and fix the issue or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in a repository I maintain and involves a close collaborator (kevmoo). I asked a direct architectural question 16 days ago about API surface trade-offs that has not yet been answered, so the ball is currently in his court before we decide how to proceed.
- **Next action:** Wait for @kevmoo to reply to my question regarding switching to discovery vs. convenience extensions, or ping him for a follow-up.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** You were CC'd as the owner of dart:io by parlough and your collaborator kevmoo expressed a strong desire to see this resolved. However, this issue has been dormant for nearly two years with no recent activity or blocking questions, keeping it in the lower-priority backlog of older items where you were CC'd.
- **Next action:** Revive and land the abandoned CL for dart:io HttpClient if prioritizing this fix.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** You opened this issue and assigned it to yourself, but you have already authored PR #3763 to address it. Per guidelines, when an open PR covers an issue, action shifts entirely to the PR and the issue stays low priority until resolution.
- **Next action:** Follow progress on PR #3763 which implements the fix for this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.50
- **Ground truth:** 
- **Model:** This issue in a repository you maintain was filed by a close collaborator, tracking required dependency updates before new package releases. You commented that you are evaluating an automated fix, so the ball is effectively in your court to either automate or manually update the constraints. It has been quiet for over two weeks, so it should be addressed before the next releases are cut.
- **Next action:** Decide whether to bump the pubspec dependency constraints manually or handle this through tooling automation.

### 14. dart-lang/tools#2719 → predicted 16, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated revision bump in dart-lang/tools, a repository I am not responsible for. Review was requested from the dart-ecosystem-team rather than me personally, making it low priority for my personal queue.
- **Next action:** Waiting on a member of dart-ecosystem-team to review this automated update.

### 15. googleapis/google-cloud-dart#381 → predicted 17, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in a repository you maintain reports a valid bug, but the author has already submitted PR #382 to fix it. Per the guidelines, issues with active PRs should not be acted on directly and are scored well below the PR itself in the 0.15–0.35 range.
- **Next action:** Review PR #382 instead of acting directly on this issue.

### 16. dart-lang/http#2034 → predicted 21, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** I opened this PR and requested review from goderbauer two days ago. Since it has only been a couple of days, there is nothing for me to do right now until they provide feedback or roughly a week passes without a response.
- **Next action:** Wait for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I own, originally filed by a close collaborator. I recently scoped it down and it represents my own planned work to implement retry support and error handling in google_cloud_rpc.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in google_cloud_rpc

### 18. dart-lang/http#2031 → predicted 24, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although I was directly requested for review by collaborator mosuem on this http2 PR, it is at the top of a stack of PRs where lower PRs (like #2014) are still unreviewed. Furthermore, I am not responsible for the http2 package in this repository, so release preparation here is low priority until the underlying changes are settled.
- **Next action:** Wait for lower PRs in the stack (specifically #2014) to be reviewed and landed before reviewing this release prep.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft PR in googleapis/google-cloud-dart that was converted to draft and left inactive for 45 days. It currently has merge conflicts and bot review comments. It falls under the category of your own drafts to finish or abandon.
- **Next action:** Resume work to resolve merge conflicts and bot comments, or close the draft PR.

### 20. dart-lang/core#1007 → predicted 20, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my primary repositories. The review request is directed broadly to dart-ecosystem-team rather than me personally, and the PR is currently blocked on the CLA check.
- **Next action:** Waiting on the author to sign the CLA and a repository maintainer to review.

### 21. dart-lang/tools#2544 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** Although this addresses a security issue, it is in a repository I do not maintain, and my only connection is via a team review request. Another reviewer (@lrhn) is actively driving the review and left extensive comments that the author has yet to address, so there is nothing for me to do.
- **Next action:** Waiting on @jonasfj to address @lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still an unreviewed draft, meaning the lower PR must be addressed first. Furthermore, the review request was sent to the dart-ecosystem team rather than to me personally, in a repository I do not directly manage.
- **Next action:** Wait for the base PR #2563 to be reviewed and landed.

### 23. dart-lang/native#3763 → predicted 22, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my PR, and I requested a review from liamappelbe two days ago. Since it has only been a couple of days, there is nothing for me to do until they provide feedback or roughly a week passes without a response.
- **Next action:** Waiting on a review from liamappelbe.

### 24. googleapis/google-cloud-dart#373 → predicted 12, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR in a repository you own. You recently asked your collaborator Sigurd if his approval covered the whole PR to relieve Nate Bosch from reviewing. It has been 4 days, so you are currently waiting on his response before merging or following up.
- **Next action:** Waiting for @sigurdm to confirm if his approval covers the non-PubSub changes, or for @natebosch to review.

### 25. dart-lang/http#579 → predicted 25, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is labeled 'next-breaking-release'. I previously confirmed that it must wait for a major version bump, which is not currently planned, and there has been no actionable activity since.
- **Next action:** Wait for planning and coordination of the next major breaking release for package:http.

### 26. dart-lang/http#1932 → predicted 15, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I have already opened PR #2034 to fix this namespace duplication issue. Per policy, when an open PR exists for an issue, the PR is the primary item to act on, keeping the issue itself ranked low.
- **Next action:** Follow up on PR #2034 which fixes this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.02
- **Ground truth:** 
- **Model:** You were only CC'd for informational purposes over two years ago on an issue in a repository you do not own. There are no direct requests for you and nothing requires your attention.
- **Next action:** Waiting on the DevTools team / bkonyi to drive websocket profiling support.

### 28. dart-lang/http#1837 → predicted 27, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old low-priority feature request where you already set expectations that the team will not build it directly. It is marked 'contributions-welcome' with no new activity for a year, so there is nothing for you to do right now.
- **Next action:** Waiting for a community contribution or further interest from the community.

### 29. dart-lang/http#2033 → predicted 32, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I reviewed and approved this pull request two days ago, and there has been no activity since. As far as I am concerned, my work here is done and it is waiting on the author to merge.
- **Next action:** Waiting on @mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is labeled 'package:http2' in dart-lang/http, which is an area I have explicitly noted I am not responsible for. I have not been mentioned or asked to get involved, so there is no action for me to take.
- **Next action:** None, as this relates to http2 which is outside my area of responsibility.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.04
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. Although it was filed by my collaborator kevmoo and requested against the dart-ecosystem-team, davidmorgan is explicitly requested as an individual reviewer. There is nothing for me to do here.
- **Next action:** Waiting on davidmorgan to review.

### 32. dart-lang/http#2026 → predicted 31, priority 0.01
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I am not responsible for the `http2` package in `dart-lang/http`. The contributor has explicitly pinged @mosuem for review, and there is no direct request for my involvement.
- **Next action:** None; waiting for @mosuem to review as http2 is outside my scope.

### 33. dart-lang/native#3653 → predicted 30, priority 0.02
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and it is assigned to and driven by liamappelbe. I previously shared context in the discussion, but there has been no new activity in over a month and nothing is requested of me.
- **Next action:** Waiting on liamappelbe to decide whether to pursue or close the issue.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** I asked the reporter for reproduction details and applied the needs-info label 8 days ago, with no response yet. Additionally, there is a linked open PR addressing this issue, so any action would belong on the PR rather than this issue.
- **Next action:** Waiting on reporter to provide reproduction details requested in the needs-info comment.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05 and no new activity has occurred on it since. Additionally, there is an open PR (#2002) addressing this issue, so any action belongs on the PR rather than the issue itself.
- **Next action:** None; focus on PR #2002 if review is needed.

### 36. dart-lang/sdk#38148 → predicted 33, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I marked this issue with a thumbs-down in August 2026, indicating it is not important to me. Although another contributor commented recently offering reproduction steps, no one has @-mentioned me or directed a specific request to me since.
- **Next action:** None; no action required as I previously marked this issue as not important.
