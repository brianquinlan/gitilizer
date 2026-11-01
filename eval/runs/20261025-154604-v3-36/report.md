# Gitilizer eval: v3-36

strategy `pointwise` · model `gemini-3.8-flash` · thinking `default` · prompt `prompts/v3.md` · signals `True` · 3 trial(s) · 36 items · 20261025-154604

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.602 ± 0.016 |
| spearman | 0.760 ± 0.018 |
| pairwise_acc | 0.801 ± 0.008 |
| ndcg | 0.967 ± 0.002 |
| ndcg@5 | 0.940 ± 0.044 |
| top3_overlap | 0.778 ± 0.192 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.667 ± 0.058 |
| mean_abs_displacement | 5.074 ± 0.116 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.828 ± 0.010 | 0.997 ± 0.001 | 0.933 ± 0.115 | 1.042 ± 0.072 |
| B | 20 | 0.463 ± 0.042 | 0.902 ± 0.050 | 0.533 ± 0.115 | 3.867 ± 0.289 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.92 | 3/3 | dart-lang/sdk#48056 | A | Assess the security inquiry regarding Android certificate revocation and determine next steps. |
| 2 | 2.7 (2–3) | +0.7 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Respond to kevmoo's review comment regarding CHANGELOG.md preservation and update the PR. |
| 3 | 4.0 (3–5) | +1.0 | 0.77 | 3/3 | googleapis/google-cloud-dart#376 | A | Review the PR for sigurdm. |
| 4 | 6.3 (5–7) | +2.3 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this pull request. |
| 5 | 5.3 (4–7) | +0.3 | 0.70 | 3/3 | googleapis/google-cloud-dart#252 | B | Review Yusuf's proposed enum design sketch and let them know if they should proceed with implementation. |
| 6 | 16.7 (12–19) | +10.7 ⚠️ | 0.40 | 1/3 | dart-lang/http#2027 | B | Wait for feedback from collaborators on the proposal to make `Client.close` async. |
| 7 | 8.7 (8–9) | +1.7 | 0.55 | 3/3 | dart-lang/http#1981 | B | Implement the server trust evaluation hook in cupertino_http and open a PR. |
| 8 | 14.3 (13–15) | +6.3 | 0.44 | 3/3 | googleapis/google-cloud-dart#360 | A | Follow up on kevmoo's response and decide whether to prioritize a fix for mid-stream SSE error handling. |
| 9 | 5.3 (2–12) | -3.7 | 0.77 | 3/3 | dart-lang/sdk#59846 | B | Investigate the dart:io HTTP header parser and implement RFC 9110 character validation, or reassign the issue. |
| 10 | 15.0 (14–16) | +5.0 | 0.41 | 0/3 | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to respond to my question regarding switching to discovery vs. adding convenience extensions. |
| 11 | 22.3 (22–23) | +11.3 ⚠️ | 0.29 | 3/3 | dart-lang/sdk#31275 | A | Evaluate reviving the abandoned Gerrit CL 144346 to fix uncatchable exceptions in dart:io HttpClient. |
| 12 | 21.3 (21–22) | +9.3 ⚠️ | 0.30 | 0/3 | dart-lang/native#3752 | B | Wait for PR #3763 to be reviewed and merged to resolve this issue. |
| 13 | 12.3 (11–13) | -0.7 | 0.50 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to address this via release automation or open a PR to update the pubspec dependencies directly. |
| 14 | 8.0 (6–10) | -6.0 | 0.59 | 3/3 | dart-lang/tools#2719 | B | Review and merge this automated BoringSSL revision bump. |
| 15 | 18.0 (18) | +3.0 | 0.35 | 0/3 | googleapis/google-cloud-dart#381 | A | Review linked PR #382, which fixes this issue. |
| 16 | 16.3 (16–17) | +0.3 | 0.35 | 0/3 | dart-lang/http#2034 | B | Waiting for review from @goderbauer. |
| 17 | 10.7 (9–12) | -6.3 | 0.55 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner wiring, RequestOptions, and exception hardening in google_cloud_rpc. |
| 18 | 26.7 (26–28) | +8.7 | 0.13 | 0/3 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 26.0 (24–27) | +7.0 | 0.17 | 3/3 | googleapis/google-cloud-dart#345 | A | Resume work by resolving merge conflicts and addressing bot feedback, or close the draft PR. |
| 20 | 18.3 (8–24) | -1.7 | 0.37 | 1/3 | dart-lang/core#1007 | B | Waiting on the author to sign the Google CLA before the PR can be reviewed. |
| 21 | 16.0 (14–20) | -5.0 | 0.42 | 0/3 | dart-lang/tools#2544 | B | Wait for @jonasfj to address @lrhn's review feedback. |
| 22 | 25.3 (25–26) | +3.3 | 0.16 | 0/3 | dart-lang/tools#2710 | B | Wait for lower PR #2563 to be reviewed and merged first. |
| 23 | 17.7 (17–19) | -5.3 | 0.33 | 0/3 | dart-lang/native#3763 | A | Waiting on liamappelbe to review the PR. |
| 24 | 10.3 (10–11) | -13.7 ⚠️ | 0.54 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for @sigurdm to confirm if the PR is safe to merge without Nate's review, or follow up if needed. |
| 25 | 27.7 (27–28) | +2.7 | 0.15 | 0/3 | dart-lang/http#579 | B | Wait for planning and coordination around the next major breaking release of package:http. |
| 26 | 20.3 (20–21) | -5.7 | 0.30 | 0/3 | dart-lang/http#1932 | B | Wait for PR #2034 to be reviewed and merged to resolve this issue. |
| 27 | 29.7 (29–30) | +2.7 | 0.06 | 0/3 | flutter/devtools#8223 | B | None for me; waiting on the DevTools team and bkonyi to determine WebSocket profiling design. |
| 28 | 29.3 (29–30) | +1.3 | 0.08 | 0/3 | dart-lang/http#1837 | A | Waiting on a community contribution or external pull request. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/3 | dart-lang/http#2033 | A | Waiting on mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | None; waiting on package:http2 maintainers to triage. |
| 31 | 5.3 (4–6) | -25.7 ⚠️ | 0.71 | 3/3 | dart-lang/tools#2715 | B | Review the PR for kevmoo. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/3 | dart-lang/http#2026 | A | Waiting on mosuem to review this http2 PR. |
| 33 | 31.0 (31) | -2.0 | 0.03 | 0/3 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide whether to close or pursue this issue. |
| 34 | 24.0 (23–25) | -10.0 ⚠️ | 0.23 | 0/3 | dart-lang/http#1972 | B | Waiting for Keetz to respond to reproduction questions, or handle via PR #1974. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/3 | dart-lang/http#1841 | B | None on this issue; track PR #2002 instead. |
| 36 | 34.0 (34) | -2.0 | 0.00 | 0/3 | dart-lang/sdk#38148 | B | None; issue was marked as not important and no action was directed at me since. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/tools#2715** (truth #31) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/tools#2715** (truth #31) in 1/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/tools#2715** (truth #31) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **googleapis/google-cloud-dart#373** (truth #24) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.92
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue assigned to and authored by me regarding TLS trust on Android, and it has recent activity raising critical concerns about compromised CA certificates (eMudhra). Per the instructions, any security issue owned by me with new activity must be prioritized at the very top of the scale (0.9+) regardless of the P3 label or age.
- **Next action:** Assess the security inquiry regarding Android certificate revocation and determine next steps.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR, and your collaborator kevmoo has left review feedback and an architectural question about handling CHANGELOG.md that you haven't answered yet. Your own work is currently stalled waiting on your response and fix.
- **Next action:** Respond to kevmoo's review comment regarding CHANGELOG.md preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.76
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from a close collaborator (sigurdm) in googleapis/google-cloud-dart, a repository you are responsible for. As the default reviewer, it is on you to review it before release.
- **Next action:** Review the PR for sigurdm.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a new pull request in googleapis/google-cloud-dart, a repository I am responsible for, and it has not yet received a human review. Because bots do not count as reviewers, I am the default reviewer. Since the author is a first-time contributor rather than a close collaborator, it falls into the 0.65–0.8 range.
- **Next action:** Review this pull request.

### 5. googleapis/google-cloud-dart#252 → predicted 7, priority 0.60
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** You asked the contributor to share a design before writing lots of code, and they posted a concrete design sketch 4 days ago. Because this is your repository and your issue, they are waiting on your feedback to start implementing the changes in librarian.
- **Next action:** Review Yusuf's proposed enum design sketch and let them know if they should proceed with implementation.

### 6. dart-lang/http#2027 → predicted 19, priority 0.35
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You opened this design issue in your repository proposing breaking changes to `Client.close` for an eventual 2.0 release. There has been no activity or discussion from other maintainers yet, and nobody is currently blocked. It remains on your radar until collaborators weigh in or you decide to drive the 2.0 planning forward.
- **Next action:** Wait for feedback from collaborators on the proposal to make `Client.close` async.

### 7. dart-lang/http#1981 → predicted 8, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue to yourself and noted that you have started working on it. Nobody is urgently blocked on GitHub right now, but there is clear work for you to do in a repository you maintain.
- **Next action:** Implement the server trust evaluation hook in cupertino_http and open a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 13, priority 0.45
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** kevmoo identified bugs in `_makeStreamingRequest` regarding EOF buffering and silent mid-stream error swallowing. In response to my clarifying question, he noted that the issue is not urgent. Because this is an open issue in a repository I maintain and from a close collaborator, it deserves attention, but no one is currently blocked.
- **Next action:** Follow up on kevmoo's response and decide whether to prioritize a fix for mid-stream SSE error handling.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue in dart:io regarding invalid characters allowed in HTTP header names, which has potential security implications such as request smuggling or proxy issues. However, the issue has been dormant for nearly two years without any recent activity or escalation, so nobody is actively blocked.
- **Next action:** Investigate the dart:io HTTP header parser and implement RFC 9110 character validation, or reassign the issue.

### 10. googleapis/google-cloud-dart#361 → predicted 15, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an architectural discussion in my repository with my collaborator kevmoo. I asked a clarifying question 16 days ago about API surface tradeoffs and am waiting for his reply before proceeding. If he does not follow up soon, I may need to ping the thread.
- **Next action:** Waiting on kevmoo to respond to my question regarding switching to discovery vs. adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 22, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old, significant bug in dart:io HttpClient causing uncatchable crashes, where you were CC'd as library owner and your collaborator kevmoo requested a fix. However, there has been no activity for over 20 months, you are not assigned, and no one is actively blocked on you right now.
- **Next action:** Evaluate reviving the abandoned Gerrit CL 144346 to fix uncatchable exceptions in dart:io HttpClient.

### 12. dart-lang/native#3752 → predicted 21, priority 0.30
- **Ground truth:** 
- **Model:** You authored both this issue and the companion PR #3763 that fixes it. Because active work is covered by the PR, this issue does not need direct action on its own right now.
- **Next action:** Wait for PR #3763 to be reviewed and merged to resolve this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.50
- **Ground truth:** 
- **Model:** This is a tracking issue in a repository you are responsible for, filed by your collaborator sigurdm. You were the last to comment asking about a general automation fix, but no one is blocked while waiting on the next releases. It is a good task to resolve soon before either package is published.
- **Next action:** Decide whether to address this via release automation or open a PR to update the pubspec dependencies directly.

### 14. dart-lang/tools#2719 → predicted 6, priority 0.62
- **Ground truth:** 
- **Model:** A review was requested from the dart-ecosystem-team, which means this review is on my plate. This is a small automated update to BoringSSL in dart-lang/tools that needs a human review and approval. Because it is an automated routine dependency bump rather than a critical vulnerability fix or a blocked collaborator, it sits moderately on my review list.
- **Next action:** Review and merge this automated BoringSSL revision bump.

### 15. googleapis/google-cloud-dart#381 → predicted 18, priority 0.35
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a valid bug in a repository you maintain where error codes prevent retryable REST calls from retrying. However, an open PR (#382) already addresses it, so the PR is the primary item to review and act on. Per policy, the issue is de-prioritized in favor of its PR.
- **Next action:** Review linked PR #382, which fixes this issue.

### 16. dart-lang/http#2034 → predicted 16, priority 0.35
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** You authored this PR in your repository to fix an open bug (#1932) and requested a review from goderbauer two days ago. No reviewer feedback has been submitted yet, so it is waiting on them.
- **Next action:** Waiting for review from @goderbauer.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to you in a repository you maintain, authored by your collaborator kevmoo. You scoped the issue 10 days ago and the next step is to implement the proposed changes. While nobody is actively blocked on an immediate reply, it represents substantive pending work on your plate.
- **Next action:** Implement the RetryRunner wiring, RequestOptions, and exception hardening in google_cloud_rpc.

### 18. dart-lang/http#2031 → predicted 26, priority 0.15
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem requested your review, this PR prepares the release and is stacked on several other PRs, including #2014 which has not been reviewed yet. Furthermore, this is in `package:http2`, an area of the repository you are not normally responsible for. Review the underlying PRs before looking at this release bump.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 27, priority 0.15
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft PR adding initial DNS support in google-cloud-dart, but it has been dormant for 45 days and currently has merge conflicts. No human reviewers are waiting on it or blocking on you. It is low priority backlog work unless you decide to pick it back up.
- **Next action:** Resume work by resolving merge conflicts and addressing bot feedback, or close the draft PR.

### 20. dart-lang/core#1007 → predicted 24, priority 0.20
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** A review was requested from dart-ecosystem-team, which I am on, but the author has not yet signed the Contributor License Agreement. Google open-source policy requires the CLA to be signed before review can proceed. Until the author completes the CLA, there is nothing for me to do.
- **Next action:** Waiting on the author to sign the Google CLA before the PR can be reviewed.

### 21. dart-lang/tools#2544 → predicted 14, priority 0.40
- **Ground truth:** 
- **Model:** This PR addresses a Windows UNC path injection security issue in package_config. Although I am on the requested dart-ecosystem-team, @lrhn is already actively driving the review and left extensive comments that author @jonasfj has yet to address, so it is currently waiting on the author.
- **Next action:** Wait for @jonasfj to address @lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.18
- **Ground truth:** 
- **Model:** This PR from collaborator mosuem adds provenance policy parsing to package:sigstore and requests review from dart-ecosystem-team. However, it is stacked on draft PR #2563, which has not yet been reviewed or merged. Stacked PRs remain low priority until their base PRs are reviewed and resolved.
- **Next action:** Wait for lower PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 17, priority 0.35
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR fixing deadlock and performance issues with NSInputStream in package:objective_c. You requested review from liamappelbe two days ago and there are no reviewer responses or actions required from you yet. It should stay visible on your radar while waiting for review.
- **Next action:** Waiting on liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 10, priority 0.52
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is your PR in a repository you own. You asked your collaborator Sigurd 4 days ago whether his approval covered the non-PubSub portions so you can merge without waiting on Nate Bosch, and he hasn't responded yet. It is waiting on his response before landing, though you may want to follow up soon.
- **Next action:** Wait for @sigurdm to confirm if the PR is safe to merge without Nate's review, or follow up if needed.

### 25. dart-lang/http#579 → predicted 28, priority 0.15
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR proposes a breaking API change that has been explicitly deferred until a 2.0 major version bump. You already reviewed the approach and noted two years ago that you do not have the bandwidth to coordinate a major release right now, so it remains parked under the `next-breaking-release` label.
- **Next action:** Wait for planning and coordination around the next major breaking release of package:http.

### 26. dart-lang/http#1932 → predicted 20, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You are assigned to this issue and already authored PR #2034 to address the Cronet namespace duplication. Because an open PR directly covers this issue, action should be focused on the PR rather than this thread.
- **Next action:** Wait for PR #2034 to be reviewed and merged to resolve this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.08
- **Ground truth:** 
- **Model:** This is an enhancement request in flutter/devtools, a repository outside my primary focus. I was only mentioned as an informational CC over two years ago regarding generic HTTP profiling, with no direct questions or action items directed to me. There is nothing for me to do here.
- **Next action:** None for me; waiting on the DevTools team and bkonyi to determine WebSocket profiling design.

### 28. dart-lang/http#1837 → predicted 30, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old, low-priority feature request where I already clarified a year ago that the team will not be implementing this directly. It is marked contributions-welcome with no recent activity or questions for me to address.
- **Next action:** Waiting on a community contribution or external pull request.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this pull request two days ago. There has been no subsequent activity or commits pushed since my approval. It is entirely waiting on mosuem to merge.
- **Next action:** Waiting on mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** You have explicitly noted that you are not responsible for http2 within dart-lang/http. Additionally, no one has directly requested your involvement or mentioned you here.
- **Next action:** None; waiting on package:http2 maintainers to triage.

### 31. dart-lang/tools#2715 → predicted 4, priority 0.72
- **Ground truth:** 
- **Model:** Kevmoo requested a review from dart-ecosystem-team, which I am on, making this a review request for me. No human reviewer has looked at it yet after two days. Because it comes from a close collaborator and needs review to move forward, it deserves prompt attention.
- **Next action:** Review the PR for kevmoo.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** You have noted that you are not responsible for http2 in dart-lang/http. Furthermore, the PR author specifically tagged mosuem for review, meaning there is nothing for you to do here.
- **Next action:** Waiting on mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 31, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to liamappelbe in a repository I am not responsible for. Although I participated in earlier discussions, the last discussion was between mraleph and liamappelbe over a month ago, with no requests or pending actions for me.
- **Next action:** Waiting on liamappelbe to decide whether to close or pursue this issue.

### 34. dart-lang/http#1972 → predicted 23, priority 0.25
- **Ground truth:** 
- **Model:** I asked the author for reproduction details and labeled this 'needs-info' 8 days ago, so it is waiting on their response. Furthermore, there is an open PR (#1974) attempting to fix this issue, meaning any review action belongs on the PR rather than this issue.
- **Next action:** Waiting for Keetz to respond to reproduction questions, or handle via PR #1974.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05 and no new activity has occurred on it since. Furthermore, an open PR (#2002) exists to implement this feature, making the PR the actionable item rather than this issue.
- **Next action:** None on this issue; track PR #2002 instead.

### 36. dart-lang/sdk#38148 → predicted 34, priority 0.00
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You marked this issue with a thumbs down in August 2026, indicating it is not important to you. Since then, no significant activity has been directed at you; filiph's comment offering reproduction details did not mention or request action from you. Additionally, dart-lang/sdk is outside your primary repositories of responsibility.
- **Next action:** None; issue was marked as not important and no action was directed at me since.
