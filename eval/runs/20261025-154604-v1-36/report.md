# Gitilizer eval: v1-36

strategy `pointwise` · model `gemini-3.8-flash` · thinking `default` · prompt `prompts/v1.md` · signals `True` · 3 trial(s) · 36 items · 20261025-154604

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.350 ± 0.045 |
| spearman | 0.487 ± 0.066 |
| pairwise_acc | 0.675 ± 0.022 |
| ndcg | 0.898 ± 0.006 |
| ndcg@5 | 0.712 ± 0.007 |
| top3_overlap | 0.333 ± 0.000 |
| top5_overlap | 0.400 ± 0.000 |
| top10_overlap | 0.400 ± 0.000 |
| mean_abs_displacement | 7.926 ± 0.528 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.428 ± 0.010 | 0.927 ± 0.002 | 0.400 ± 0.000 | 3.292 ± 0.144 |
| B | 20 | 0.340 ± 0.074 | 0.834 ± 0.012 | 0.400 ± 0.000 | 4.733 ± 0.586 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 23.3 (20–25) | +22.3 ⚠️ | 0.20 | 0/3 | dart-lang/sdk#48056 | A | None; julemand101 already addressed the community question regarding the CA compromise. |
| 2 | 1.0 (1) | -1.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Respond to kevmoo's review question regarding CHANGELOG preservation and update the PR accordingly. |
| 3 | 19.0 (18–21) | +16.0 ⚠️ | 0.25 | 0/3 | googleapis/google-cloud-dart#376 | A | Wait for @sigurdm to resolve automated feedback, update the branch, and request review. |
| 4 | 19.7 (17–25) | +15.7 ⚠️ | 0.23 | 0/3 | googleapis/google-cloud-dart#382 | A | Wait for a review request to you or your team, or for the PR to be assigned. |
| 5 | 5.0 (5) | +0.0 | 0.67 | 3/3 | googleapis/google-cloud-dart#252 | B | Review and provide feedback on Yusufihsangorgel's proposed enum design sketch. |
| 6 | 14.3 (14–15) | +8.3 | 0.29 | 0/3 | dart-lang/http#2027 | B | Wait for team feedback on the proposed breaking changes to Client.close. |
| 7 | 4.0 (4) | -3.0 | 0.70 | 3/3 | dart-lang/http#1981 | B | Complete the implementation of the server trust evaluation hook in cupertino_http and submit a PR. |
| 8 | 17.0 (15–21) | +9.0 ⚠️ | 0.27 | 1/3 | googleapis/google-cloud-dart#360 | A | Follow up on the issue and decide whether to implement a fix for mid-stream error handling. |
| 9 | 9.3 (8–10) | +0.3 | 0.47 | 3/3 | dart-lang/sdk#59846 | B | Investigate the RFC 9110 compliance bug in dart:io HTTP header parsing and determine a fix or reassign. |
| 10 | 21.0 (20–23) | +11.0 ⚠️ | 0.25 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to respond to the question about switching to discovery vs. adding convenience extensions. |
| 11 | 21.3 (16–24) | +10.3 ⚠️ | 0.24 | 0/3 | dart-lang/sdk#31275 | A | None required unless deciding to adopt the abandoned dart:io fix. |
| 12 | 20.0 (19–22) | +8.0 | 0.25 | 0/3 | dart-lang/native#3752 | B | Follow up on PR #3763 to resolve this issue. |
| 13 | 22.3 (21–24) | +9.3 ⚠️ | 0.25 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for collaborator feedback on automating dependency updates, or prepare a PR to update the pubspec constraints manually. |
| 14 | 6.7 (6–8) | -7.3 | 0.60 | 3/3 | dart-lang/tools#2719 | B | Review and approve the automated BoringSSL revision update. |
| 15 | 10.3 (9–12) | -4.7 | 0.38 | 1/3 | googleapis/google-cloud-dart#381 | A | Review the linked PR #382 which provides the fix for this issue. |
| 16 | 15.0 (12–17) | -1.0 | 0.27 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review the pull request. |
| 17 | 6.7 (6–7) | -10.3 ⚠️ | 0.62 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions support in package:google_cloud_rpc and open a PR. |
| 18 | 9.7 (9–11) | -8.3 | 0.42 | 3/3 | dart-lang/http#2031 | A | Review the release PR, or review the preceding PRs in the stack (#2014) first. |
| 19 | 28.0 (27–29) | +9.0 ⚠️ | 0.13 | 0/3 | googleapis/google-cloud-dart#345 | A | Decide whether to resume work, resolve conflicts, and address bot feedback, or close this draft PR. |
| 20 | 16.0 (7–22) | -4.0 | 0.34 | 1/3 | dart-lang/core#1007 | B | Wait for the author to sign the Google CLA. |
| 21 | 24.0 (23–26) | +3.0 | 0.22 | 0/3 | dart-lang/tools#2544 | B | Wait for author jonasfj to address lrhn's review comments. |
| 22 | 2.3 (2–3) | -19.7 ⚠️ | 0.77 | 3/3 | dart-lang/tools#2710 | B | Review the pull request for package:sigstore provenance parsing and policy. |
| 23 | 15.7 (13–18) | -7.3 | 0.27 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 11.3 (11–12) | -12.7 ⚠️ | 0.37 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to confirm if the non-PubSub changes are good to merge without Nate's review. |
| 25 | 30.3 (29–31) | +5.3 | 0.12 | 0/3 | dart-lang/http#579 | B | Wait for planning and coordination of the next major breaking release (package:http 2.0). |
| 26 | 13.3 (13–14) | -12.7 ⚠️ | 0.30 | 0/3 | dart-lang/http#1932 | B | Land PR #2034 to resolve the Cronet namespace duplication issue. |
| 27 | 28.7 (26–33) | +1.7 | 0.10 | 0/3 | flutter/devtools#8223 | B | None; no action required unless the DevTools team requests specific input on HTTP/WebSocket profiling. |
| 28 | 33.3 (33–34) | +5.3 | 0.05 | 0/3 | dart-lang/http#1837 | A | None; awaiting community interest or contributions. |
| 29 | 27.7 (26–30) | -1.3 | 0.12 | 0/3 | dart-lang/http#2033 | A | Waiting on @mosuem to merge the PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | No action needed; this is an unassigned http2 issue which falls outside my area of responsibility. |
| 31 | 2.7 (2–3) | -28.3 ⚠️ | 0.75 | 3/3 | dart-lang/tools#2715 | B | Review the PR for kevmoo on behalf of dart-ecosystem-team. |
| 32 | 32.0 (32) | +0.0 | 0.05 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem to review the PR. |
| 33 | 29.3 (28–31) | -3.7 | 0.11 | 0/3 | dart-lang/native#3653 | A | Wait for liamappelbe or the native team to decide whether to pursue changes to the VM trampoline or close the issue. |
| 34 | 29.3 (28–30) | -4.7 | 0.12 | 0/3 | dart-lang/http#1972 | B | Wait for author response regarding reproduction details. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/3 | dart-lang/http#1841 | B | None; track progress on linked PR #2002 instead. |
| 36 | 25.3 (8–34) | -10.7 ⚠️ | 0.17 | 1/3 | dart-lang/sdk#38148 | B | No action needed; wait to see if filiph or another contributor mentions you for reproduction guidance. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#48056** (truth #1) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 25, priority 0.15
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** A community member raised security questions on this long-standing P3 issue regarding a recent CA compromise, but julemand101 already linked to the resolved issue (sdk#64644). You were not mentioned or asked for a response, and the underlying Android certificate handling improvement remains an untargeted backlog item.
- **Next action:** None; julemand101 already addressed the community question regarding the CA compromise.

### 2. googleapis/librarian#7808 → predicted 1, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your own pull request addressing a release tagging bug in googleapis/google-cloud-dart. Your collaborator kevmoo left a substantive review question 21 hours ago that requires your response and potential code updates before the PR can be approved and merged.
- **Next action:** Respond to kevmoo's review question regarding CHANGELOG preservation and update the PR accordingly.

### 3. googleapis/google-cloud-dart#376 → predicted 18, priority 0.25
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** Although this PR is in a repository you maintain and is authored by your usual collaborator sigurdm, you are neither assigned nor requested for review. Additionally, the PR is currently behind main and has pending high-priority automated review feedback that has not yet been addressed. Until review is requested from you or your team, no action is needed on your part.
- **Next action:** Wait for @sigurdm to resolve automated feedback, update the branch, and request review.

### 4. googleapis/google-cloud-dart#382 → predicted 17, priority 0.25
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** Although this PR addresses a valid bug in googleapis/google-cloud-dart (a repository you maintain), you are neither assigned nor requested for review directly or via the cloud-sdk-dart-team. Under the specified criteria, a PR is only actionable when you are assigned or have pending addressed feedback. It remains low priority until review is formally requested.
- **Next action:** Wait for a review request to you or your team, or for the PR to be assigned.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** You asked the contributor to share a design before writing code, and they have posted a proposed representation sketch for your feedback. Responding will keep contributor momentum going on this P2 bug in your repository.
- **Next action:** Review and provide feedback on Yusufihsangorgel's proposed enum design sketch.

### 6. dart-lang/http#2027 → predicted 14, priority 0.30
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You opened this design proposal for tightening Client.close semantics 9 days ago, and you were the last actor. While it concerns core architecture in dart-lang/http, there is no immediate action required from you until other collaborators review and discuss the proposal.
- **Next action:** Wait for team feedback on the proposed breaking changes to Client.close.

### 7. dart-lang/http#1981 → predicted 4, priority 0.70
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue to yourself and explicitly stated that you have started working on it. Because you indicated you will take action and the implementation is in progress on a repository you maintain, this is a high-priority task so you don't drop the ball.
- **Next action:** Complete the implementation of the server trust evaluation hook in cupertino_http and submit a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 15, priority 0.28
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** Kevmoo answered your question about JSON streaming, noting that it is not urgent, though mid-stream SSE error handling remains a known bug in google_cloud_rpc. Because Kevmoo responded to your question, the ball is technically in your court, but neither collaborator views it as pressing. Given that 17 days have passed without further urgency, this is low priority.
- **Next action:** Follow up on the issue and decide whether to implement a fix for mid-stream error handling.

### 9. dart-lang/sdk#59846 → predicted 8, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are directly assigned to this dart:io bug regarding invalid characters in HTTP header names, which can have security implications like request smuggling with upstream proxies. However, there has been no activity on this issue in nearly two years, making it lower urgency than active review requests and recent tasks.
- **Next action:** Investigate the RFC 9110 compliance bug in dart:io HTTP header parsing and determine a fix or reassign.

### 10. googleapis/google-cloud-dart#361 → predicted 20, priority 0.25
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** You were the last person to comment, raising concerns about the API surface size and asking kevmoo for input on the best architectural direction. The issue is currently blocked waiting for his reply. Although it involves a key collaborator on a primary repository, no action is needed from you right now.
- **Next action:** Wait for kevmoo to respond to the question about switching to discovery vs. adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 24, priority 0.20
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** The issue involves an uncatchable exception in dart:io HttpClient and has an abandoned Gerrit CL. Although collaborator kevmoo CC'd you expressing strong interest, the mentions were informational CCs from over two years ago with no recent discussion or direct question requiring a response.
- **Next action:** None required unless deciding to adopt the abandoned dart:io fix.

### 12. dart-lang/native#3752 → predicted 19, priority 0.25
- **Ground truth:** 
- **Model:** You authored and are assigned to this issue regarding NSInputStream run loop scheduling affecting package:cupertino_http. However, you have already created a linked pull request (#3763) to address the bug, so no direct action is needed on this issue itself.
- **Next action:** Follow up on PR #3763 to resolve this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 21, priority 0.25
- **Ground truth:** 
- **Model:** You were the last person to act on this issue 17 days ago with a question about automating the dependency bump. While this affects release integrity in a repository you maintain, there is no direct call to action or review requested from you at this time.
- **Next action:** Wait for collaborator feedback on automating dependency updates, or prepare a PR to update the pubspec constraints manually.

### 14. dart-lang/tools#2719 → predicted 6, priority 0.65
- **Ground truth:** 
- **Model:** A review has been requested from dart-ecosystem-team, of which you are a member, making this PR actionable. It is a routine, automated bump of the BoringSSL revision in package:boring with clean checks. While not on your primary repositories, it is an open PR awaiting team review.
- **Next action:** Review and approve the automated BoringSSL revision update.

### 15. googleapis/google-cloud-dart#381 → predicted 10, priority 0.40
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a well-documented bug report with a clear reproduction in a repository you maintain (googleapis/google-cloud-dart). You are not directly mentioned or assigned on the issue, but the author has submitted companion PR #382 which addresses the problem and requires review.
- **Next action:** Review the linked PR #382 which provides the fix for this issue.

### 16. dart-lang/http#2034 → predicted 12, priority 0.30
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** You authored this PR to fix a build issue in cronet_http and requested a review from goderbauer two days ago. Because you were the last actor and are waiting for reviewer feedback, there is nothing actionable for you right now.
- **Next action:** Wait for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue was opened by your collaborator kevmoo in your primary repository, and you assigned it to yourself. You have scoped the problem and researched reference implementations across other languages, but have not yet implemented the fix. As an open development task rather than an urgent PR review or production outage, it holds a solid medium-high priority.
- **Next action:** Implement the RetryRunner and RequestOptions support in package:google_cloud_rpc and open a PR.

### 18. dart-lang/http#2031 → predicted 9, priority 0.40
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Your collaborator mosuem requested your review on this release chore PR. However, you are generally not responsible for package:http2, and this PR is at the top of a stack with earlier PRs (such as #2014) that are still awaiting review and merge before this can land.
- **Next action:** Review the release PR, or review the preceding PRs in the stack (#2014) first.

### 19. googleapis/google-cloud-dart#345 → predicted 27, priority 0.15
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft PR adding DNS support to google-cloud-dart, which you converted to draft 45 days ago. There has been no activity since, the branch now has merge conflicts, and no other contributors are waiting on it. It is currently on hold unless you decide to pick up DNS implementation again.
- **Next action:** Decide whether to resume work, resolve conflicts, and address bot feedback, or close this draft PR.

### 20. dart-lang/core#1007 → predicted 22, priority 0.20
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** A review was requested from dart-ecosystem-team to fix an issue reported by collaborator sigurdm. However, the pull request cannot be reviewed or merged until the author signs the Google Contributor License Agreement, which has been pending for over two weeks.
- **Next action:** Wait for the author to sign the Google CLA.

### 21. dart-lang/tools#2544 → predicted 23, priority 0.20
- **Ground truth:** 
- **Model:** Although this PR addresses a security issue (UNC path injection) and requested a review from dart-ecosystem-team, lrhn is actively conducting the code review. The author has not yet responded to or addressed lrhn's latest review comments from two months ago, so no action is required from me at this time.
- **Next action:** Wait for author jonasfj to address lrhn's review comments.

### 22. dart-lang/tools#2710 → predicted 2, priority 0.80
- **Ground truth:** 
- **Model:** This PR was authored by my usual collaborator mosuem and review was requested from my team (dart-ecosystem-team). It introduces core provenance parsing and policy checking for package verification across pub and pub.dev, making it high priority.
- **Next action:** Review the pull request for package:sigstore provenance parsing and policy.

### 23. dart-lang/native#3763 → predicted 16, priority 0.25
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** You authored this PR to fix NSInputStream run loop scheduling and requested review from liamappelbe. Since you were the last actor and the review has not yet been provided, there is no action required from you right now.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 11, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** You are the author of this PR and were the last to comment, asking Sigurd whether his approval covers the non-PubSub parts so Nate can be relieved of reviewing. Since you are waiting on Sigurd's response or Nate's review, no immediate action is required on your part.
- **Next action:** Wait for sigurdm to confirm if the non-PubSub changes are good to merge without Nate's review.

### 25. dart-lang/http#579 → predicted 29, priority 0.15
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking changes to add upload progress callbacks, which you noted cannot land without coordinating a major semver release that is not currently planned. It has been dormant for over a year with no new action items or team requests directed at you.
- **Next action:** Wait for planning and coordination of the next major breaking release (package:http 2.0).

### 26. dart-lang/http#1932 → predicted 13, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You already authored and opened PR #2034 to address this build issue, which is currently in progress. No direct action is required on this issue itself other than completing that PR and letting it close the issue automatically.
- **Next action:** Land PR #2034 to resolve the Cronet namespace duplication issue.

### 27. flutter/devtools#8223 → predicted 26, priority 0.15
- **Ground truth:** 
- **Model:** You were CC'd over two years ago by Ben Konyi purely for informational context regarding HTTP profiling support. You are not assigned, no direct questions or review requests have been directed to you, and the issue is managed by the Flutter DevTools team.
- **Next action:** None; no action required unless the DevTools team requests specific input on HTTP/WebSocket profiling.

### 28. dart-lang/http#1837 → predicted 33, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You were the last person to comment on this issue a year ago, clarifying that the Dart team does not plan to implement this and marking it for community contribution. There has been no subsequent activity or request for your involvement.
- **Next action:** None; awaiting community interest or contributions.

### 29. dart-lang/http#2033 → predicted 30, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this pull request from my collaborator @mosuem. There are no outstanding action items or unaddressed comments for me, so the ball is in the author's court to merge it.
- **Next action:** Waiting on @mosuem to merge the PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I am explicitly not responsible for the http2 package within dart-lang/http. Additionally, I am not assigned or mentioned on this issue, and the last activity was months ago. Therefore, this item requires no action from me.
- **Next action:** No action needed; this is an unassigned http2 issue which falls outside my area of responsibility.

### 31. dart-lang/tools#2715 → predicted 3, priority 0.74
- **Ground truth:** 
- **Model:** This PR was authored by a primary collaborator (kevmoo) and review was requested from dart-ecosystem-team. Although davidmorgan is also explicitly requested, PR reviews for collaborators are high priority. The PR is concise and ready for review.
- **Next action:** Review the PR for kevmoo on behalf of dart-ecosystem-team.

### 32. dart-lang/http#2026 → predicted 32, priority 0.05
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR touches the http2 package, which you have explicitly noted you are not responsible for. Additionally, the author specifically requested review from mosuem, so no action is required from you.
- **Next action:** Wait for mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 31, priority 0.10
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to liamappelbe in dart-lang/native, and you already provided your experimental findings earlier in the thread. The discussion has been dormant for over a month with no questions or actions requested of you.
- **Next action:** Wait for liamappelbe or the native team to decide whether to pursue changes to the VM trampoline or close the issue.

### 34. dart-lang/http#1972 → predicted 28, priority 0.15
- **Ground truth:** 
- **Model:** You were the last person to comment and explicitly requested reproduction details from the author. The issue carries the 'needs-info' label and is blocked waiting for user input.
- **Next action:** Wait for author response regarding reproduction details.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs down on 2026-10-05, and no new comments or mentions have occurred on this issue since. Work has moved to linked PR #2002, making this tracking issue lower priority and non-actionable.
- **Next action:** None; track progress on linked PR #2002 instead.

### 36. dart-lang/sdk#38148 → predicted 34, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You marked this issue with a thumbs-down on 2026-08-01 to indicate it was not high priority for you. While filiph recently commented noting they can reproduce the issue and offered to help, you were not mentioned and no action item was directed at you. Per instructions, without significant activity directed at you after the thumbs-down, this remains at priority 0.0.
- **Next action:** No action needed; wait to see if filiph or another contributor mentions you for reproduction guidance.
