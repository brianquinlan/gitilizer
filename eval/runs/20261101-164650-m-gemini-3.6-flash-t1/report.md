# Gitilizer eval: m-gemini-3.6-flash-t1

strategy `pointwise` · model `gemini-3.6-flash` · thinking `default` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-164650

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.663 ± 0.000 |
| spearman | 0.795 ± 0.000 |
| pairwise_acc | 0.832 ± 0.000 |
| ndcg | 0.973 ± 0.000 |
| ndcg@5 | 0.966 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.167 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.900 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.750 ± 0.000 |
| B | 20 | 0.474 ± 0.000 | 0.927 ± 0.000 | 0.600 ± 0.000 | 3.600 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.92 | 1/1 | dart-lang/sdk#48056 | A | Verify how disabled and revoked CA certificates are handled on Android in light of recent security reports and respond on the issue. |
| 2 | 3.0 (3) | +1.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review question regarding CHANGELOG.md handling. |
| 3 | 4.0 (4) | +1.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review PR #376 from collaborator sigurdm. |
| 4 | 6.0 (6) | +2.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR from a first-time contributor in googleapis/google-cloud-dart. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's proposed design for enum integer handling and provide feedback. |
| 6 | 11.0 (11) | +5.0 | 0.52 | 1/1 | dart-lang/http#2027 | B | Decide whether to make Client.close async for the http 2.0 release and prepare a proposal or PR. |
| 7 | 8.0 (8) | +1.0 | 0.58 | 1/1 | dart-lang/http#1981 | B | Implement the requested server trust evaluation hook in CupertinoClient. |
| 8 | 12.0 (12) | +4.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#360 | A | Review kevmoo's response and plan the fix for mid-stream SSE error handling and JSON stream parsing. |
| 9 | 2.0 (2) | -7.0 | 0.92 | 1/1 | dart-lang/sdk#59846 | B | Investigate and fix the HTTP header parser in `dart:io` to reject invalid header name characters, or reassign the issue. |
| 10 | 13.0 (13) | +3.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting for kevmoo to respond to my question about whether to switch to discovery or add convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | None required unless I decide to pick up the abandoned CL to fix the uncatchable exception. |
| 12 | 21.0 (21) | +9.0 ⚠️ | 0.20 | 0/1 | dart-lang/native#3752 | B | Focus on PR #3763, which addresses this issue. |
| 13 | 10.0 (10) | -3.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Update the google_cloud_rpc dependency constraint in google_cloud_storage and google_cloud_pubsub pubspec files. |
| 14 | 19.0 (19) | +5.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Waiting on a maintainer of dart-lang/tools to review this team PR. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382 which addresses this issue. |
| 16 | 23.0 (23) | +7.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Waiting for goderbauer to review the PR. |
| 17 | 9.0 (9) | -8.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in google_cloud_rpc as planned. |
| 18 | 25.0 (25) | +7.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | Waiting for lower PRs in the stack (like #2014) to be reviewed and merged first. |
| 19 | 18.0 (18) | -1.0 | 0.25 | 1/1 | googleapis/google-cloud-dart#345 | A | Finish working on this draft PR or close it. |
| 20 | 20.0 (20) | +0.0 | 0.20 | 0/1 | dart-lang/core#1007 | B | Waiting for a maintainer of dart-lang/core or a dart-ecosystem-team member to review this PR. |
| 21 | 30.0 (30) | +9.0 ⚠️ | 0.05 | 0/1 | dart-lang/tools#2544 | B | Waiting on jonasfj to address lrhn's review feedback. |
| 22 | 22.0 (22) | +0.0 | 0.15 | 0/1 | dart-lang/tools#2710 | B | Waiting on lower PR #2563 to be reviewed and merged first. |
| 23 | 24.0 (24) | +1.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Waiting for liamappelbe to review this PR. |
| 24 | 14.0 (14) | -10.0 ⚠️ | 0.35 | 0/1 | googleapis/google-cloud-dart#373 | B | Waiting for @sigurdm or @natebosch to respond to my ping about reviewing and merging. |
| 25 | 27.0 (27) | +2.0 | 0.10 | 0/1 | dart-lang/http#579 | B | Waiting for a future major release of package:http to include breaking API changes. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | Waiting for PR #2034 to be reviewed and merged. |
| 27 | 29.0 (29) | +2.0 | 0.05 | 0/1 | flutter/devtools#8223 | B | No action required from me; waiting on the DevTools team and VM team to prioritize and design WebSocket profiling support. |
| 28 | 26.0 (26) | -2.0 | 0.10 | 0/1 | dart-lang/http#1837 | A | Waiting for a community contribution or further user interest. |
| 29 | 34.0 (34) | +5.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None for me; this issue concerns package:http2, which is outside my area of responsibility. |
| 31 | 28.0 (28) | -3.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review. |
| 32 | 32.0 (32) | +0.0 | 0.03 | 0/1 | dart-lang/http#2026 | A | Waiting on @mosuem to review this http2 PR. |
| 33 | 33.0 (33) | +0.0 | 0.03 | 0/1 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide whether to close the issue or pursue the feature. |
| 34 | 31.0 (31) | -3.0 | 0.05 | 0/1 | dart-lang/http#1972 | B | Waiting on the issue author to respond to my request for information. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | No action needed on this issue as PR #2002 is open to address it. |
| 36 | 7.0 (7) | -29.0 ⚠️ | 0.60 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph with instructions on how to provide a reproduction or help debug the issue. |

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

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue regarding TLS trust and disabled CA certificates on Android that I created and am assigned to. There is recent activity raising security questions regarding CA key compromises and revocation handling. Security issues assigned to me with new activity take top priority (0.9+) until investigated and addressed.
- **Next action:** Verify how disabled and revoked CA certificates are handled on Android in light of recent security reports and respond on the issue.

### 2. googleapis/librarian#7808 → predicted 3, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my PR and collaborator kevmoo left a question in an inline review comment 21 hours ago. Addressing reviewer feedback on my own PRs is high priority to prevent my work from stalling.
- **Next action:** Reply to kevmoo's review question regarding CHANGELOG.md handling.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** As the primary maintainer of googleapis/google-cloud-dart, I am responsible for reviewing unreviewed PRs in this repository. This PR was created by my close collaborator sigurdm and currently has no human reviews.
- **Next action:** Review PR #376 from collaborator sigurdm.

### 4. googleapis/google-cloud-dart#382 → predicted 6, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in a repository I am responsible for (googleapis/google-cloud-dart). Automated bots do not count as human reviewers, so as the default reviewer for this repository, it is on me to review this bug fix from a first-time contributor.
- **Next action:** Review this PR from a first-time contributor in googleapis/google-cloud-dart.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This issue is in a repository I am responsible for (google-cloud-dart). A contributor has provided a design sketch for `ProtoEnum` changes following my request for one, and is waiting on my feedback before proceeding with implementation.
- **Next action:** Review Yusufihsangorgel's proposed design for enum integer handling and provide feedback.

### 6. dart-lang/http#2027 → predicted 11, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is an issue you recently opened in a repository you are responsible for regarding Client.close API semantics. Because it represents your own planned work and no one else is currently blocked or involved, it is an actionable task on your list.
- **Next action:** Decide whether to make Client.close async for the http 2.0 release and prepare a proposal or PR.

### 7. dart-lang/http#1981 → predicted 8, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue to yourself and commented that you have started working on it. As a repository owner actively taking on this planned work, it is on you to follow through with the implementation.
- **Next action:** Implement the requested server trust evaluation hook in CupertinoClient.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I am responsible for (google-cloud-dart), filed by a close collaborator (kevmoo). Kevmoo responded to my question about server behavior, so the ball is back in my court to decide how to implement or prioritize the fix. Although kevmoo mentioned it is not urgent, collaborator issues in my repository with a clear next step for me fall in the planned work range.
- **Next action:** Review kevmoo's response and plan the fix for mid-stream SSE error handling and JSON stream parsing.

### 9. dart-lang/sdk#59846 → predicted 2, priority 0.92
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned to me and concerns a security vulnerability in HTTP header parsing, where NUL and other control characters are accepted, potentially causing HTTP request smuggling or desynchronization issues with upstream proxies. Security issues assigned to me or in code I maintain take top priority (0.9–1.0) regardless of age.
- **Next action:** Investigate and fix the HTTP header parser in `dart:io` to reject invalid header name characters, or reassign the issue.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked my collaborator kevmoo a question 16 days ago regarding whether switching to discovery is better than adding convenience extensions. Because this issue is in a repository I maintain and is waiting on feedback from a close collaborator, it remains visible so I can follow up if needed, but no immediate action is required on my part right now.
- **Next action:** Waiting for kevmoo to respond to my question about whether to switch to discovery or add convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old bug in `dart-lang/sdk` (a repository I am not directly responsible for) regarding uncatchable `HttpException`s in `dart:io`. A collaborator (kevmoo) CC'd me over two years ago asking if I could take it up, but there has been no recent activity directed at me since.
- **Next action:** None required unless I decide to pick up the abandoned CL to fix the uncatchable exception.

### 12. dart-lang/native#3752 → predicted 21, priority 0.20
- **Ground truth:** 
- **Model:** This issue has an open PR (#3763) authored by me that fixes it. Because the work is actively being addressed in the PR, there is nothing left to act on directly within this issue. Priority is lowered accordingly to favor the PR.
- **Next action:** Focus on PR #3763, which addresses this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.55
- **Ground truth:** 
- **Model:** This issue was filed by close collaborator sigurdm in a repository I am responsible for. It identifies specific dependency constraint updates that need to be completed prior to the next releases.
- **Next action:** Update the google_cloud_rpc dependency constraint in google_cloud_storage and google_cloud_pubsub pubspec files.

### 14. dart-lang/tools#2719 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated pull request updating BoringSSL in dart-lang/tools. The review request is addressed to the dart-ecosystem-team rather than you personally, and you are not the primary maintainer of this repository. Therefore, it is low priority for you to act on.
- **Next action:** Waiting on a maintainer of dart-lang/tools to review this team PR.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in googleapis/google-cloud-dart has an open PR (#382) that fixes it. Per the guidelines, issues with active PRs fixing them are not the direct item to act on and should be kept in the 0.1–0.35 priority range while attention is given to the PR.
- **Next action:** Review PR #382 which addresses this issue.

### 16. dart-lang/http#2034 → predicted 23, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http where I requested a review from goderbauer 2 days ago. Because less than a week has passed since requesting review, there is no action needed from me right now while waiting for feedback.
- **Next action:** Waiting for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I am responsible for, filed by collaborator kevmoo. I recently trimmed and defined the scope of work on this issue. Since nobody is directly blocked waiting on a reply right now, this represents active planned work on my queue.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in google_cloud_rpc as planned.

### 18. dart-lang/http#2031 → predicted 25, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR prepares the release of `package:http2` (an area of the repository you are explicitly not responsible for). Additionally, it is stacked on lower PRs such as #2014 that have not yet been merged or reviewed, so this release PR cannot be acted on until those lower PRs land.
- **Next action:** Waiting for lower PRs in the stack (like #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I am responsible for (google-cloud-dart). It has been dormant for 45 days with unaddressed bot review comments. As my own draft, I should either finish the implementation and mark it ready for review or abandon/close it.
- **Next action:** Finish working on this draft PR or close it.

### 20. dart-lang/core#1007 → predicted 20, priority 0.20
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request to dart-ecosystem-team in dart-lang/core, a repository I am not directly responsible for. Because the review was requested from the team rather than from me personally, it is low priority for me.
- **Next action:** Waiting for a maintainer of dart-lang/core or a dart-ecosystem-team member to review this PR.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** This security PR is in dart-lang/tools, a repository I am not responsible for. I was requested only via team review (dart-ecosystem-team), and lrhn is already actively reviewing it and waiting on the author (jonasfj) to address feedback.
- **Next action:** Waiting on jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.15
- **Ground truth:** 
- **Model:** This PR is stacked on draft PR #2563, so the base PR needs to be reviewed and merged first. Additionally, the review request is to the dart-ecosystem-team in a repository I am not directly responsible for (dart-lang/tools).
- **Next action:** Waiting on lower PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 24, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my PR in dart-lang/native that I submitted 2 days ago and requested a review from liamappelbe. Since less than a week has passed and there has been no feedback yet, there is no action required from me right now.
- **Next action:** Waiting for liamappelbe to review this PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.35
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in googleapis/google-cloud-dart. I pinged collaborator @sigurdm 4 days ago asking if he reviewed the non-PubSub parts so we can merge without waiting for @natebosch. Because less than a week has passed since my question, there is nothing for me to do right now.
- **Next action:** Waiting for @sigurdm or @natebosch to respond to my ping about reviewing and merging.

### 25. dart-lang/http#579 → predicted 27, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes to package:http to support upload progress callbacks and is labeled 'next-breaking-release'. In your last comment, you noted that landing this requires coordinating a major version bump, which is not currently active. As a PR explicitly deferred to a future breaking release, it requires no immediate action.
- **Next action:** Waiting for a future major release of package:http to include breaking API changes.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is an open PR (#2034) authored by me that addresses this issue. Per the guidance, issues that have an open PR fixing them are lower priority than the PR itself. Attention should be directed to PR #2034 instead.
- **Next action:** Waiting for PR #2034 to be reviewed and merged.

### 27. flutter/devtools#8223 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This is a feature request in `flutter/devtools`, a repository I am not responsible for. I was only CC'd over two years ago for context regarding HTTP profiling, and no direct action or response has been requested from me.
- **Next action:** No action required from me; waiting on the DevTools team and VM team to prioritize and design WebSocket profiling support.

### 28. dart-lang/http#1837 → predicted 26, priority 0.10
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** I responded to this feature request a year ago explaining that the Dart team is unlikely to implement it and welcomed community contributions. There has been no activity since, so there is nothing left for me to do right now.
- **Next action:** Waiting for a community contribution or further user interest.

### 29. dart-lang/http#2033 → predicted 34, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this PR, and no changes or comments have been made since. It is complete from my side and waiting on the author to merge.
- **Next action:** Waiting on mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is explicitly tagged as 'package:http2', an area of the repository I am not responsible for. Since I have not been directly mentioned or asked to act, it requires no attention from me.
- **Next action:** None for me; this issue concerns package:http2, which is outside my area of responsibility.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This PR in dart-lang/tools is assigned to dart-ecosystem-team, but davidmorgan was specifically requested as a reviewer. Because I am not responsible for this repository and another reviewer is explicitly assigned, it is near 0 priority for me.
- **Next action:** Waiting on davidmorgan to review.

### 32. dart-lang/http#2026 → predicted 32, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I am specifically not responsible for the http2 package within dart-lang/http per my explicit scope. The PR author has requested a review directly from @mosuem, and there is no action needed from me.
- **Next action:** Waiting on @mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 33, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to liamappelbe and is in a repository I am not responsible for. There are no pending questions or action items for me, as liamappelbe is driving the discussion.
- **Next action:** Waiting on liamappelbe to decide whether to close the issue or pursue the feature.

### 34. dart-lang/http#1972 → predicted 31, priority 0.05
- **Ground truth:** 
- **Model:** I asked the issue author for clarification and added the `needs-info` label 8 days ago, so I am waiting for their response. Additionally, PR #1974 has been opened to fix this issue, making the PR the primary place for any required follow-up.
- **Next action:** Waiting on the issue author to respond to my request for information.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** This issue is covered by open PR #2002. Additionally, it was marked with thumbs-down and no new activity directed at me has occurred on the issue since.
- **Next action:** No action needed on this issue as PR #2002 is open to address it.

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.60
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** This issue is assigned to you, and filiph recently commented asking how they can assist in debugging after reproducing the failure on a recent Dart SDK build. Since this comment occurred after your previous thumbs-down mark, it requires your attention to either reply with guidance, investigate, or unassign yourself.
- **Next action:** Reply to filiph with instructions on how to provide a reproduction or help debug the issue.
