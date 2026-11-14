# Gitilizer eval: v5b-gemini-low

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5b.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030421

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.713 ± 0.007 |
| spearman | 0.836 ± 0.009 |
| pairwise_acc | 0.857 ± 0.003 |
| ndcg | 0.987 ± 0.001 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.722 ± 0.096 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.894 ± 0.019 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.708 ± 0.072 |
| B | 20 | 0.572 ± 0.016 | 0.969 ± 0.003 | 0.600 ± 0.000 | 3.200 ± 0.100 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 3/3 | dart-lang/sdk#48056 | A | Assess the eMudhra intermediate CA compromise report and verify whether disabled certs / revocation checks leave Android Dart apps vulnerable. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on whether Bump should append CHANGELOG.md to lib.Keep or handle it in LanguageDart clean. |
| 3 | 3.0 (3) | +0.0 | 0.76 | 3/3 | googleapis/google-cloud-dart#376 | A | Review collaborator Sigurd's PR adding client attribution headers and release polish for Pub/Sub. |
| 4 | 5.0 (5) | +1.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR on google_cloud_rpc from an outside contributor. |
| 5 | 4.0 (4) | -1.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's proposed design for enum number/string representation in ProtoEnum. |
| 6 | 7.0 (7) | +1.0 | 0.57 | 3/3 | dart-lang/http#2027 | B | Work on redesigning Client.close semantics or draft a proposal/PR for the next major release. |
| 7 | 6.0 (6) | -1.0 | 0.63 | 3/3 | dart-lang/http#1981 | B | Implement the server trust evaluation hook in CupertinoClient as promised. |
| 8 | 9.3 (9–10) | +1.3 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo regarding handling error frames vs incremental JSON, or start planning a fix. |
| 9 | 12.0 (12) | +3.0 | 0.51 | 3/3 | dart-lang/sdk#59846 | B | Investigate the RFC 9110 character validation bug in dart:io HTTP header parsing or unassign myself. |
| 10 | 13.0 (13) | +3.0 | 0.44 | 0/3 | googleapis/google-cloud-dart#361 | A | Waiting on reply from kevmoo regarding API surface tradeoffs between proto and discovery. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/3 | dart-lang/sdk#31275 | A | None; issue is an unassigned backlog bug in dart-lang/sdk where I was only CC'd. |
| 12 | 18.0 (17–19) | +6.0 | 0.23 | 0/3 | dart-lang/native#3752 | B | Follow up on open PR #3763 instead of this issue. |
| 13 | 10.3 (10–11) | -2.7 | 0.52 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide on the version constraint approach or update pubspec dependencies for google_cloud_storage and google_cloud_pubsub |
| 14 | 18.0 (17–19) | +4.0 | 0.19 | 0/3 | dart-lang/tools#2719 | B | Wait for another dart-ecosystem-team member to review this automated dependency update. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting on this issue directly. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review the pull request. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.57 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient and harden ServiceException.fromHttpResponse |
| 18 | 25.0 (25) | +7.0 | 0.08 | 0/3 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 20.0 (20) | +1.0 | 0.19 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to continue work on this draft PR, fix the merge conflicts, or close it. |
| 20 | 21.0 (21) | +1.0 | 0.16 | 0/3 | dart-lang/core#1007 | B | Waiting for the author to sign the CLA and for a primary maintainer to review. |
| 21 | 29.7 (29–31) | +8.7 | 0.05 | 0/3 | dart-lang/tools#2544 | B | Waiting on jonasfj to address lrhn's review comments. |
| 22 | 24.0 (24) | +2.0 | 0.10 | 0/3 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 14.0 (14) | -10.0 ⚠️ | 0.40 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to reply about whether he reviewed the full PR or if natebosch's review is needed. |
| 25 | 26.7 (26–27) | +1.7 | 0.08 | 0/3 | dart-lang/http#579 | B | Wait for a planned major breaking release of package:http before acting on this PR. |
| 26 | 18.0 (17–19) | -8.0 | 0.22 | 0/3 | dart-lang/http#1932 | B | Work on the fix in PR #2034 instead of this issue. |
| 27 | 29.3 (28–31) | +2.3 | 0.04 | 0/3 | flutter/devtools#8223 | B | None; waiting on the DevTools team or bkonyi to respond to contributor inquiries. |
| 28 | 27.7 (26–31) | -0.3 | 0.07 | 0/3 | dart-lang/http#1837 | A | Waiting for community contribution or external updates. |
| 29 | 33.7 (33–34) | +4.7 | 0.00 | 0/3 | dart-lang/http#2033 | A | Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | None; this issue belongs to package:http2 which is outside my area of responsibility. |
| 31 | 27.7 (27–28) | -3.3 | 0.05 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the PR. |
| 32 | 32.7 (32–33) | +0.7 | 0.00 | 0/3 | dart-lang/http#2026 | A | Waiting for mosuem to review this http2 PR. |
| 33 | 32.3 (30–35) | -0.7 | 0.03 | 0/3 | dart-lang/native#3653 | A | None; liamappelbe and mraleph are handling this issue in dart-lang/native. |
| 34 | 30.7 (30–32) | -3.3 | 0.05 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter to provide reproduction details in response to my questions. |
| 35 | 34.7 (34–35) | -0.3 | 0.00 | 0/3 | dart-lang/http#1841 | B | None on this issue; track progress on open PR #2002 instead. |
| 36 | 10.3 (9–11) | -25.7 ⚠️ | 0.53 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's offer to help reproduce the issue and decide whether to investigate or unassign myself. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an assigned issue I created regarding certificate trust handling in dart:io/Android. A recent comment (3 days ago) raised an active security concern regarding compromised intermediate CAs and certificate revocation/blocklists. Under the 'Security comes first' rule, security issues in code I own with new activity must be addressed at the top of the scale regardless of labels or age.
- **Next action:** Assess the eMudhra intermediate CA compromise report and verify whether disabled certs / revocation checks leave Android Dart apps vulnerable.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own pull request fixing an issue in our tooling (linked to googleapis/google-cloud-dart#358). My collaborator kevmoo left an inline review comment 21 hours ago with a concrete technical question that blocks merging. Since I am stalling my own PR with unanswered review feedback, this falls into the 0.8–0.9 range.
- **Next action:** Reply to kevmoo's review comment on whether Bump should append CHANGELOG.md to lib.Keep or handle it in LanguageDart clean.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.76
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from a close collaborator (sigurdm) in a repository I am responsible for (googleapis/google-cloud-dart). As the default reviewer for this repository, the next step is on me to review it. It is relatively fresh (5 days old) and prepares the pubsub package for release, placing it in the 0.65–0.8 range.
- **Next action:** Review collaborator Sigurd's PR adding client attribution headers and release polish for Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** As an owner of googleapis/google-cloud-dart, I am the default reviewer for incoming PRs. This PR fixes an issue with error handling and retry logic (#381) and has not yet received a human review. Because it comes from an external contributor rather than a close collaborator, it falls toward the lower end of the 0.65–0.8 review range.
- **Next action:** Review this PR on google_cloud_rpc from an outside contributor.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** A contributor is working on an issue I authored in my repository (googleapis/google-cloud-dart) and has posted a concrete design sketch following my recommendation to share an approach first. They are waiting on my feedback to proceed with implementation, so responding will unblock their PR work.
- **Next action:** Reply to Yusufihsangorgel's proposed design for enum number/string representation in ProtoEnum.

### 6. dart-lang/http#2027 → predicted 7, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this issue myself 9 days ago in a repository I maintain (dart-lang/http), representing my own planned work. Because it was created within the last two weeks and nothing is waiting on external input, it counts as fresh planned architectural work. It sits squarely in the 0.5–0.65 range.
- **Next action:** Work on redesigning Client.close semantics or draft a proposal/PR for the next major release.

### 7. dart-lang/http#1981 → predicted 6, priority 0.65
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented 5 hours ago that I have started working on it. This represents fresh, active planned work in a repository I maintain, placing it squarely in the 0.5-0.65 range.
- **Next action:** Implement the server trust evaluation hook in CupertinoClient as promised.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, filed by a close collaborator (kevmoo). Kevmoo answered my question 17 days ago and noted it isn't urgent, but the ball is back in my court to decide whether to implement the error handling and streaming fixes. Because it has had no activity for over two weeks and isn't urgent, it sits at the lower end of the 0.5–0.65 range.
- **Next action:** Reply to kevmoo regarding handling error frames vs incremental JSON, or start planning a fix.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is an issue assigned directly to me in dart-lang/sdk regarding HTTP header parsing in library-io. Since I am assigned, the responsibility is on me to either investigate/fix it or unassign myself (falling in the 0.5–0.65 range). However, it has been completely dormant for almost two years (22 months) without recent activity, sinking it to the bottom of that range.
- **Next action:** Investigate the RFC 9110 character validation bug in dart:io HTTP header parsing or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.45
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in my repository filed by a close collaborator (kevmoo), but the ball is currently in his court after my last comment 16 days ago asking whether switching formats is worthwhile. Because I am waiting on his answer to decide on the architecture, there is no direct action for me today. It stays in the 0.35–0.5 range as a pending question in my own repository.
- **Next action:** Waiting on reply from kevmoo regarding API surface tradeoffs between proto and discovery.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was CC'd on this dart-lang/sdk issue over two years ago as the owner of the library, including by collaborator kevmoo who expressed interest in seeing it fixed. However, I am not assigned, there is no direct actionable request or fresh blocking question for me, and no activity has occurred in over 20 months. Per the guidelines, old important issues where I was only CC'd sit at the bottom of the 0.35–0.5 range.
- **Next action:** None; issue is an unassigned backlog bug in dart-lang/sdk where I was only CC'd.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** I filed this issue and assigned it to myself, but I also already have an open PR (dart-lang/native#3763) that fixes it. Because an open PR covers this issue, all actionable work should happen on the PR rather than here. Per instructions, issues covered by an active PR are kept in the 0.15–0.35 range.
- **Next action:** Follow up on open PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.52
- **Ground truth:** 
- **Model:** This is an issue in a repository I maintain, filed by close collaborator sigurdm. I left the last comment 17 days ago stating I was deciding on a general fix (e.g. librarian automation). As it's planned work waiting on my decision in my own repo, it belongs in the 0.5–0.65 range, but sits near the lower end due to two weeks of inactivity.
- **Next action:** Decide on the version constraint approach or update pubspec dependencies for google_cloud_storage and google_cloud_pubsub

### 14. dart-lang/tools#2719 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** This automated PR is in dart-lang/tools, a repository I am not responsible for. The review request is directed to the dart-ecosystem-team rather than me personally, placing it in the 0.15-0.35 range. Because it is fresh (less than a day old) and routine, it does not require my immediate personal action.
- **Next action:** Wait for another dart-ecosystem-team member to review this automated dependency update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is an issue in googleapis/google-cloud-dart, a repository I am responsible for. However, there is already an open pull request (#382) covering this fix, so the PR is the primary item to review and act upon. Following the guidance to rank issues covered by PRs substantially below their PRs, this stays in the 0.15–0.35 range.
- **Next action:** Review PR #382 instead of acting on this issue directly.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own pull request in dart-lang/http, and I requested a review from goderbauer only 2 days ago. Since it has been less than a week without a response, there is no action for me right now. It falls into the 0.05–0.15 range for PRs waiting on recently requested reviewers.
- **Next action:** Wait for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue in my primary repository filed by a collaborator (kevmoo) that I assigned to myself and actively scoped 10 days ago. It represents my own planned work with a clear next step to implement. As it has been about 10 days since my last update, it sits squarely in the planned work range (0.5–0.65).
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient and harden ServiceException.fromHttpResponse

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release preparation PR is stacked on multiple lower PRs, including #2014 which is still open and unreviewed. Furthermore, my profile notes explicitly state that I am not responsible for http2. Because it is blocked on preceding PRs in the stack and falls outside my primary scope, it does not require review right now.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.18
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR that I marked as draft 45 days ago, and it has since become dirty with merge conflicts. The scale places 'my own drafts I should finish or abandon' in the 0.15–0.35 range. Given that it has sat untouched for a month and a half, it sits near the lower end of that range.
- **Next action:** Decide whether to continue work on this draft PR, fix the merge conflicts, or close it.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This pull request is in dart-lang/core, which is not one of my primary repositories, and I was only requested via the dart-ecosystem-team. Furthermore, the author has not yet signed the Google CLA. Team review requests in repos I don't own fall in the 0.15-0.35 range and should be kept low.
- **Next action:** Waiting for the author to sign the CLA and for a primary maintainer to review.

### 21. dart-lang/tools#2544 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for, and my only connection is via a team review request to dart-ecosystem-team. A dedicated reviewer (lrhn) is already actively reviewing it, and the PR is currently waiting on author jonasfj to resolve outstanding review feedback from 2 months ago. Even though this addresses a security vulnerability (UNC path injection), it is not my repository, I am not assigned or personally requested, and there is no action for me.
- **Next action:** Waiting on jonasfj to address lrhn's review comments.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This pull request is stacked on draft PR #2563, so reviewing it now would be premature until the underlying PR is reviewed and resolved. Additionally, I am not directly assigned or requested individually; the review request was made to the generic team 'dart-ecosystem-team' in dart-lang/tools, a repository I do not directly manage. As per guidelines, stacked PRs waiting on lower PRs and team reviews in non-owned repositories sit at the bottom of the priority scale.
- **Next action:** Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request in dart-lang/native, which I opened 2 days ago and requested a review from liamappelbe. Since fewer than 7 days have passed and there is no unaddressed review feedback or other blocker, it is waiting on the reviewer.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repository I maintain, currently approved by sigurdm with natebosch also requested. Four days ago I asked Sigurd whether he looked at the non-PubSub parts and if we can merge without Nate. Because I am waiting on Sigurd's response to proceed, the next step is not mine today.
- **Next action:** Wait for sigurdm to reply about whether he reviewed the full PR or if natebosch's review is needed.

### 25. dart-lang/http#579 → predicted 27, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking changes to the core client API and is explicitly labeled 'next-breaking-release'. I already established two years ago that this cannot land until a major semver release is coordinated, which is not currently active. Per the instructions, PRs blocked by a future breaking release scale at 0.05–0.15.
- **Next action:** Wait for a planned major breaking release of package:http before acting on this PR.

### 26. dart-lang/http#1932 → predicted 18, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by open PR #2034 ('fix(cronet): avoid cronet namespace duplication'), authored by me and updated recently. Per guidelines, when an open PR covers an issue, the action is on the PR and the issue stays in the 0.15–0.35 range. Recent comments asking for updates do not change the fact that work is being driven in the PR.
- **Next action:** Work on the fix in PR #2034 instead of this issue.

### 27. flutter/devtools#8223 → predicted 31, priority 0.03
- **Ground truth:** 
- **Model:** This is an issue in flutter/devtools, a repository I am not responsible for. I was only mentioned over two years ago as an informational CC by bkonyi regarding potential profiling work. There is no direct request or action required from me.
- **Next action:** None; waiting on the DevTools team or bkonyi to respond to contributor inquiries.

### 28. dart-lang/http#1837 → predicted 26, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded a year ago clarifying that the Dart team won't take this on and marked it as a low-priority enhancement open to community contributions. There has been no subsequent activity or responses. As an old, inactive backlog item with the contributions-welcome label, it requires no action from you.
- **Next action:** Waiting for community contribution or external updates.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this pull request 2 days ago. There has been no subsequent activity or new commits from the author. It is now waiting on the author to merge.
- **Next action:** Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, this is an old issue where I have never been mentioned or involved, and nothing is asked of me.
- **Next action:** None; this issue belongs to package:http2 which is outside my area of responsibility.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This is in dart-lang/tools, a repository I am not directly responsible for. I was only requested via team review (dart-ecosystem-team), and an individual reviewer (davidmorgan) is explicitly assigned to handle it. Per guidelines, team reviews in repositories I don't own where another reviewer is assigned are near 0.
- **Next action:** Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This pull request is in package:http2 within dart-lang/http, which I have explicitly noted I am not responsible for. Additionally, the author specifically directed the review request to mosuem. There is no action needed from me.
- **Next action:** Waiting for mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 35, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and it is assigned to liamappelbe. Although I previously participated in the discussion, the latest technical exchange between mraleph and liamappelbe concluded over a month ago with nothing asked of me or waiting on my input. There is no action for me to take right now.
- **Next action:** None; liamappelbe and mraleph are handling this issue in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** I asked the reporter clarifying questions and added the 'needs-info' label 8 days ago, and there has been no reply since. Additionally, there is an open PR (#1974) addressing this issue, which also has a 'needs-info' label. Until the reporter provides information or action moves to the PR, there is nothing for me to do on this issue.
- **Next action:** Wait for the reporter to provide reproduction details in response to my questions.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** I added a thumbs-down to this item on 2026-10-05, and there has been no new activity directed at me since that date. Furthermore, there is already an open pull request (#2002) addressing this enhancement and the issue carries the 'next-breaking-release' label. Consequently, there is nothing for me to do on this issue right now.
- **Next action:** None on this issue; track progress on open PR #2002 instead.

### 36. dart-lang/sdk#38148 → predicted 9, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You previously gave this issue a thumbs-down on 2026-08-01, but filiph commented recently (24d ago) offering a reproducible case on modern macOS. As you are the sole assignee on this P2 bug in `dart:io`, you should either engage with filiph's offer to debug it or unassign yourself so someone else can pick it up.
- **Next action:** Reply to filiph's offer to help reproduce the issue and decide whether to investigate or unassign myself.
