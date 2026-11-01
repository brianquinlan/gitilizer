# Gitilizer eval: m-gemini-3.8-flash-high-t3

strategy `pointwise` · model `gemini-3.8-flash` · thinking `high` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-165607

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.806 ± 0.000 |
| spearman | 0.939 ± 0.000 |
| pairwise_acc | 0.903 ± 0.000 |
| ndcg | 0.994 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 2.556 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.867 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 0.875 ± 0.000 |
| B | 20 | 0.726 ± 0.000 | 0.979 ± 0.000 | 0.600 ± 0.000 | 1.900 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.92 | 1/1 | dart-lang/sdk#48056 | A | Review the security concern regarding Android certificate revocation and the eMudhra compromise, check related fix #64644, and respond. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment regarding CHANGELOG.md preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.78 | 1/1 | googleapis/google-cloud-dart#376 | A | Review Sigurd's PR adding client attribution headers and pre-release polish for google_cloud_pubsub. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this pull request on google_cloud_rpc error code mapping. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review and reply with feedback on the proposed enum representation design. |
| 6 | 11.0 (11) | +5.0 | 0.50 | 1/1 | dart-lang/http#2027 | B | Draft a design proposal or PR to make `Client.close` async for the next breaking release. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Implement the server trust evaluation hook in CupertinoClient as planned. |
| 8 | 9.0 (9) | +1.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | Implement a fix for mid-stream SSE error handling in service_client.dart. |
| 9 | 8.0 (8) | -1.0 | 0.60 | 1/1 | dart-lang/sdk#59846 | B | Investigate the header parser in dart:io to enforce RFC 9110 valid characters, or unassign myself. |
| 10 | 13.0 (13) | +3.0 | 0.38 | 0/1 | googleapis/google-cloud-dart#361 | A | Wait for @kevmoo to reply to my question about whether to switch to discovery or add convenience extensions, or follow up with him. |
| 11 | 12.0 (12) | +1.0 | 0.40 | 0/1 | dart-lang/sdk#31275 | A | Waiting on an SDK maintainer or contributor to adopt the abandoned Gerrit CL to fix uncatchable HttpExceptions. |
| 12 | 17.0 (17) | +5.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Wait on review and landing of PR #3763, which implements the fix for this issue. |
| 13 | 10.0 (10) | -3.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on an automation approach or bump the google_cloud_rpc dependency in google_cloud_storage and google_cloud_pubsub. |
| 14 | 16.0 (16) | +2.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Wait for a package:boring maintainer or another team member to review this automated PR. |
| 15 | 14.0 (14) | -1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting directly on this issue. |
| 16 | 20.0 (20) | +4.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for goderbauer to review the pull request. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.60 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement RetryRunner support and RequestOptions in ServiceClient for google_cloud_rpc. |
| 18 | 22.0 (22) | +4.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 18.0 (18) | -1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Decide whether to resolve conflicts and finish this draft PR or close it. |
| 20 | 19.0 (19) | -1.0 | 0.18 | 0/1 | dart-lang/core#1007 | B | Waiting on the author to sign the CLA before team review. |
| 21 | 27.0 (27) | +6.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | Waiting on @jonasfj to address @lrhn's review comments. |
| 22 | 24.0 (24) | +2.0 | 0.08 | 0/1 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 21.0 (21) | -2.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the pull request. |
| 24 | 23.0 (23) | -1.0 | 0.10 | 0/1 | googleapis/google-cloud-dart#373 | B | Waiting for Sigurd to reply on whether the PR can be merged without Nate's review. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/1 | dart-lang/http#579 | B | Wait for planning and coordination of the next major breaking release of package:http. |
| 26 | 15.0 (15) | -11.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | Follow up on PR #2034 which addresses this issue. |
| 27 | 29.0 (29) | +2.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | None; this is an informational CC in a repository I am not responsible for. |
| 28 | 25.0 (25) | -3.0 | 0.08 | 0/1 | dart-lang/http#1837 | A | Waiting on community contributions. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge the approved pull request. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue concerns package:http2, which is outside my area of responsibility. |
| 31 | 28.0 (28) | -3.0 | 0.04 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on @mosuem to review the PR. |
| 33 | 30.0 (30) | -3.0 | 0.02 | 0/1 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide whether to close the issue or pursue VM changes. |
| 34 | 31.0 (31) | -3.0 | 0.02 | 0/1 | dart-lang/http#1972 | B | Waiting on reporter (@Keetz) to respond to questions and provide reproduction details. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | No action needed on this issue; track progress on PR #2002 instead. |
| 36 | 34.0 (34) | -2.0 | 0.00 | 0/1 | dart-lang/sdk#38148 | B | None, as this issue was thumbs-downed and no new activity has been directed at me. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/native#3752** (truth #12) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#366** (truth #13) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **googleapis/google-cloud-dart#359** (truth #17) in 1/1 trial(s)
- **googleapis/google-cloud-dart#345** (truth #19) placed below **dart-lang/http#1932** (truth #26) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an assigned security issue I authored regarding TLS certificate trust and revocation on Android. A user recently raised concerns regarding a major intermediate CA compromise and whether Dart bypasses Android's certificate blocklists, while another pointed to a related fix that just landed. Security issues I own with new activity require top-level attention to assess potential exposure and verify whether further action is needed.
- **Next action:** Review the security concern regarding Android certificate revocation and the eMudhra compromise, check related fix #64644, and respond.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR, fixing an issue in google-cloud-dart, and collaborator kevmoo left substantive review feedback with an open design question 21 hours ago. Answering reviewer feedback on your own PR is top priority to avoid stalling your own work. The ball is squarely in your court to respond and adjust the implementation.
- **Next action:** Reply to kevmoo's review comment regarding CHANGELOG.md preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.78
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This PR is in googleapis/google-cloud-dart, a repository I am responsible for, and was opened 5 days ago by my close collaborator Sigurd. No human review has taken place yet, making me the default reviewer. Reviewing collaborator PRs in my own repositories is a high priority.
- **Next action:** Review Sigurd's PR adding client attribution headers and pre-release polish for google_cloud_pubsub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I am responsible for. Bots do not count, making me the default reviewer. Because the PR is from an external contributor rather than a close collaborator, it sits toward the lower end of the review priority tier.
- **Next action:** Review this pull request on google_cloud_rpc error code mapping.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** You asked the contributor to share a design before writing code, and they responded with a concrete API sketch 4 days ago. They are now waiting on your approval to move forward with the implementation in a repository you maintain.
- **Next action:** Review and reply with feedback on the proposed enum representation design.

### 6. dart-lang/http#2027 → predicted 11, priority 0.50
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in dart-lang/http to explore tightening Client.close semantics and possibly making it asynchronous in a 2.0 release. Because this is your own planned architectural work in a repository you own, it represents an active commitment on your plate. As it has been open for 9 days with no external input, it sits in the planned-work band ready for you to drive forward.
- **Next action:** Draft a design proposal or PR to make `Client.close` async for the next breaking release.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You assigned this issue in dart-lang/http to yourself and commented a few hours ago that you have started working on it. As an active commitment on your planned work list, it is actionable and on your plate.
- **Next action:** Implement the server trust evaluation hook in CupertinoClient as planned.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, filed by my close collaborator kevmoo. Kevmoo responded to my question about JSON buffering, noting it is not urgent, but mid-stream error payloads silently yielding empty messages remains an active bug. Even though it is not urgent, issues from close collaborators in my repositories with a clear next step for me warrant priority in the 0.5–0.65 range.
- **Next action:** Implement a fix for mid-stream SSE error handling in service_client.dart.

### 9. dart-lang/sdk#59846 → predicted 8, priority 0.60
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am assigned to this issue regarding dart:io accepting invalid characters such as NUL in HTTP header names, which can cause upstream proxy and security issues. Although there has been no new activity in nearly two years, it is an assigned bug in widely used core networking code. Because this is an assigned issue that I need to either fix or unassign, it belongs in the 0.5–0.65 priority range.
- **Next action:** Investigate the header parser in dart:io to enforce RFC 9110 valid characters, or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in a repository I maintain and was filed by a close collaborator, but ball is currently in kevmoo's court. I asked a substantive design question 16 days ago comparing the Discovery API surface to convenience extensions and have not received a reply yet. Because it is in my repository, I may want to follow up eventually, but there is nothing I need to do right now.
- **Next action:** Wait for @kevmoo to reply to my question about whether to switch to discovery or add convenience extensions, or follow up with him.

### 11. dart-lang/sdk#31275 → predicted 12, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an important bug in dart:io's HttpClient that causes crashes in production and directly affected collaborator kevmoo, who CC'd me on it. However, it is in dart-lang/sdk rather than a repository I am directly responsible for, and I was only CC'd rather than assigned or asked a direct question. As an old but important issue where I was only CC'd and which has been dormant for many months, it stays on my radar at moderate-low priority.
- **Next action:** Waiting on an SDK maintainer or contributor to adopt the abandoned Gerrit CL to fix uncatchable HttpExceptions.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** You filed this issue and created a corresponding PR (#3763) to fix it. Because there is an open PR addressing the problem, any remaining work is on the PR rather than this issue. Following guideline rules for issues with an active PR, this issue is kept at a low priority.
- **Next action:** Wait on review and landing of PR #3763, which implements the fix for this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.55
- **Ground truth:** 
- **Model:** Sigurdm filed this issue in a repository I maintain to ensure the new google_cloud_rpc version is required before releasing storage and pubsub packages. I noted over two weeks ago that I was deciding how to handle this, so the next step is on me to either make that decision or manually update the dependencies.
- **Next action:** Decide on an automation approach or bump the google_cloud_rpc dependency in google_cloud_storage and google_cloud_pubsub.

### 14. dart-lang/tools#2719 → predicted 16, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated BoringSSL update in dart-lang/tools, a repository I am not responsible for. The review request is directed to the dart-ecosystem-team as a whole rather than to me personally, so it does not require my immediate intervention.
- **Next action:** Wait for a package:boring maintainer or another team member to review this automated PR.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in a repository I maintain reports a bug in google_cloud_rpc's error code mapping, but author quaaantumdev has already submitted PR #382 to fix it. Because an open PR exists, the PR is the item to act on rather than this issue. Following the guideline for issues with covering PRs, this is deprioritized to the low range.
- **Next action:** Review PR #382 instead of acting directly on this issue.

### 16. dart-lang/http#2034 → predicted 20, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR in dart-lang/http addressing a Cronet namespace bug. You requested a review from goderbauer two days ago and there are no responses or blockers on your end yet. Because less than a week has passed, no follow-up is needed right now.
- **Next action:** Wait for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue in google-cloud-dart was opened by my collaborator kevmoo and is assigned to me. Having researched the design and trimmed the scope, the ball is in my court to implement the retry and request option wiring in ServiceClient. Since this is active planned work on my plate rather than an urgent security issue or review blocker, it sits firmly in the planned work range.
- **Next action:** Implement RetryRunner support and RequestOptions in ServiceClient for google_cloud_rpc.

### 18. dart-lang/http#2031 → predicted 22, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem personally requested my review, this PR is stacked on top of unreviewed lower PRs (including #2014). The underlying PRs must be reviewed and landed before this release preparation PR can be acted upon. Furthermore, this is in package:http2, an area of dart-lang/http I am not normally responsible for.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding initial DNS support in google-cloud-dart, but it has been inactive for 45 days and now has merge conflicts. It falls into the category of personal drafts to either finish or abandon. Since no collaborators are waiting on it, it sits at a low priority.
- **Next action:** Decide whether to resolve conflicts and finish this draft PR or close it.

### 20. dart-lang/core#1007 → predicted 19, priority 0.18
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not a repository you are responsible for. The review request is directed broadly to dart-ecosystem-team rather than to you personally. Additionally, the PR is blocked waiting on the author to sign the Contributor License Agreement (CLA).
- **Next action:** Waiting on the author to sign the CLA before team review.

### 21. dart-lang/tools#2544 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This security PR is in `dart-lang/tools`, which is not a repository you own or maintain. Although your team was requested, @lrhn was individually requested and is actively driving the review. The PR is currently waiting on the author to respond to @lrhn's extensive review feedback from two months ago, so no action is required from you.
- **Next action:** Waiting on @jonasfj to address @lrhn's review comments.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.08
- **Ground truth:** 
- **Model:** This pull request is in dart-lang/tools (a repository I am not directly responsible for) and was requested via the dart-ecosystem-team rather than directly to me. Additionally, it is stacked on PR #2563, which is currently an unreviewed draft PR. The base PR needs review and resolution before this stacked PR can be reviewed.
- **Next action:** Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 21, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** I opened this PR in dart-lang/native and requested a review from liamappelbe two days ago. Because only a few days have passed, it is waiting on their review and there is nothing for me to do yet. If a week passes without response, I can ping them, but for now it sits at low priority.
- **Next action:** Wait for liamappelbe to review the pull request.

### 24. googleapis/google-cloud-dart#373 → predicted 23, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR in googleapis/google-cloud-dart. Sigurd approved the Pub/Sub portions, and 4 days ago you pinged him to ask if the full PR is good to merge to relieve Nate Bosch. Because less than a week has passed since your ping, there is nothing for you to do right now.
- **Next action:** Waiting for Sigurd to reply on whether the PR can be merged without Nate's review.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes to the Client interface and is explicitly tagged 'next-breaking-release'. I previously confirmed that landing this depends on coordinating a semver major release, which is not currently underway. Because it is blocked waiting on a future breaking release and has been dormant for over a year, it requires no immediate action.
- **Next action:** Wait for planning and coordination of the next major breaking release of package:http.

### 26. dart-lang/http#1932 → predicted 15, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You have already opened PR #2034 to fix this namespace conflict issue in cronet_http. Per guidelines, when an issue has an open PR that addresses it, the PR is the place to act and the issue itself ranks in the 0.15–0.35 range.
- **Next action:** Follow up on PR #2034 which addresses this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.02
- **Ground truth:** 
- **Model:** This is a feature request in flutter/devtools, a repository I do not maintain. I was only mentioned in an informational CC over two years ago by bkonyi regarding potential profiling changes, with no specific action requested of me. The recent label adjustments by other maintainers require no input from me.
- **Next action:** None; this is an informational CC in a repository I am not responsible for.

### 28. dart-lang/http#1837 → predicted 25, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded a year ago clarifying that the team will not build this and marked it as a low-priority enhancement welcoming community contributions. With no new activity or proposals since then, this is dormant backlog. There is no action required from you.
- **Next action:** Waiting on community contributions.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR two days ago and there has been no new activity or commits since. It is completely off my plate and waiting on the author to merge.
- **Next action:** Waiting on mosuem to merge the approved pull request.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. No one has asked for my input or mentioned me, so this item requires no attention from me.
- **Next action:** None; this issue concerns package:http2, which is outside my area of responsibility.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.04
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. Although it was sent to dart-ecosystem-team, davidmorgan was explicitly requested as an individual reviewer, so this is not waiting on me.
- **Next action:** Waiting on davidmorgan to review.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** You have noted that you are not responsible for `http2` in `dart-lang/http`. The PR author has explicitly directed the review request to @mosuem, so no action is required from you.
- **Next action:** Waiting on @mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 30, priority 0.02
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to liamappelbe. Following discussion with mraleph regarding the calling convention complexity, liamappelbe questioned whether it was worth implementing. There has been no activity for over a month, and nothing is requested or waiting on me.
- **Next action:** Waiting on liamappelbe to decide whether to close the issue or pursue VM changes.

### 34. dart-lang/http#1972 → predicted 31, priority 0.02
- **Ground truth:** 
- **Model:** I asked for clarification on reproduction details and labeled this issue 'needs-info' 8 days ago, with no response yet from the reporter. Additionally, a linked PR (#1974) has been opened to address this issue, which is where action should take place once details are clarified. This issue requires no attention until the requested information is provided.
- **Next action:** Waiting on reporter (@Keetz) to respond to questions and provide reproduction details.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05, and no new activity directed at you has occurred on it since. Additionally, open PR #2002 directly addresses this enhancement, so any necessary review belongs on the pull request rather than this issue. As such, there is nothing for you to do here.
- **Next action:** No action needed on this issue; track progress on PR #2002 instead.

### 36. dart-lang/sdk#38148 → predicted 34, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I marked this issue with a thumbs-down on 2026-08-01, indicating it is not important to me. Although filiph commented offering help and a commit bot referenced the issue, neither comment was directed at me, nor was I mentioned or asked to act. In accordance with the thumbs-down instructions, this item scores 0.0.
- **Next action:** None, as this issue was thumbs-downed and no new activity has been directed at me.
