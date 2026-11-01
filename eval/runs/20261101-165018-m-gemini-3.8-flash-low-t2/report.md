# Gitilizer eval: m-gemini-3.8-flash-low-t2

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-165018

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.698 ± 0.000 |
| spearman | 0.807 ± 0.000 |
| pairwise_acc | 0.849 ± 0.000 |
| ndcg | 0.979 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 3.778 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.526 ± 0.000 | 0.921 ± 0.000 | 0.600 ± 0.000 | 3.300 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Review the security implications of Android CA certificate revocation and verify whether recent intermediate CA fixes address this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.78 | 1/1 | googleapis/google-cloud-dart#376 | A | Review collaborator Sigurd's PR adding client attribution headers and release polish for Pub/Sub. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR for google_cloud_rpc error handling. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's proposed enum representation design and give feedback so they can proceed with an implementation. |
| 6 | 8.0 (8) | +2.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | Decide on the design for async Client.close and draft a proposal or PR for http 2.0 |
| 7 | 7.0 (7) | +0.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in CupertinoClient. |
| 8 | 12.0 (12) | +4.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#360 | A | Decide on an implementation plan or prepare a PR to address mid-stream SSE error handling and incremental JSON streaming. |
| 9 | 11.0 (11) | +2.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | Investigate the RFC 9110 header validation issue in dart:io and either plan a fix or unassign myself. |
| 10 | 13.0 (13) | +3.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to reply to my question regarding discovery vs convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | None; issue is dormant and I was only CC'd over two years ago. |
| 12 | 19.0 (19) | +7.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Follow up on PR #3763 which fixes this issue. |
| 13 | 10.0 (10) | -3.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide on the resolution approach (manual pubspec updates vs librarian automation) and update the package dependencies. |
| 14 | 17.0 (17) | +3.0 | 0.20 | 0/1 | dart-lang/tools#2719 | B | Wait for a package owner on dart-ecosystem-team to review this automated bump. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting on this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Waiting for goderbauer to review the PR. |
| 17 | 9.0 (9) | -8.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement RetryRunner and RequestOptions wiring in google_cloud_rpc's ServiceClient as planned. |
| 18 | 25.0 (25) | +7.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | Wait for unreviewed PRs lower in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 20.0 (20) | +1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Decide whether to continue work on this DNS package PR, address merge conflicts, or close the draft. |
| 20 | 21.0 (21) | +1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Wait for author to sign the Google CLA before reviewing. |
| 21 | 29.0 (29) | +8.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn's review feedback. |
| 22 | 24.0 (24) | +2.0 | 0.08 | 0/1 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 14.0 (14) | -10.0 ⚠️ | 0.35 | 0/1 | googleapis/google-cloud-dart#373 | B | Waiting on sigurdm to reply about whether he reviewed the full PR or if natebosch is still needed. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/1 | dart-lang/http#579 | B | None; PR is deferred until a major breaking release is planned. |
| 26 | 18.0 (18) | -8.0 | 0.20 | 0/1 | dart-lang/http#1932 | B | Focus on open PR dart-lang/http#2034 instead of this issue. |
| 27 | 28.0 (28) | +1.0 | 0.05 | 0/1 | flutter/devtools#8223 | B | None; this is an informational CC in a repository I do not own. |
| 28 | 31.0 (31) | +3.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | None; waiting for community contributions if anyone chooses to take this on. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge or follow up on the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue belongs to package:http2 which is outside my scope. |
| 31 | 27.0 (27) | -4.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review the PR. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on mosuem to review the PR. |
| 33 | 35.0 (35) | +2.0 | 0.00 | 0/1 | dart-lang/native#3653 | A | None; liamappelbe is driving this issue in dart-lang/native. |
| 34 | 30.0 (30) | -4.0 | 0.05 | 0/1 | dart-lang/http#1972 | B | Waiting on author Keetz to respond to questions regarding reproduction and client type. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | Track progress on PR #2002 instead of this issue. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.65 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph's offer to provide a reproduction case or unassign myself if not actively working on this. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security-related issue assigned to me regarding Dart trusting disabled/revoked CA certificates on Android. Recent comments highlight an active security compromise (eMudhra intermediate CA compromise) and ask whether Dart properly honors Android revocation/blocklists, pointing to a related patch (issue #64644). Per instructions, security issues assigned to me with recent activity demand top priority (0.9+) to verify and address.
- **Next action:** Review the security implications of Android CA certificate revocation and verify whether recent intermediate CA fixes address this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR fixing an issue in our release tooling, and my close collaborator kevmoo left an inline question/review feedback 21 hours ago that I have not responded to yet. Don't let my own work stall when reviewers are waiting on me.
- **Next action:** Reply to kevmoo's review comment on CHANGELOG preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.78
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in googleapis/google-cloud-dart, a repository I am responsible for, authored by my close collaborator Sigurd. No human review has been conducted yet, making me the default reviewer. As it readies Pub/Sub for initial release and has been waiting for review for 5 days, reviewing it is a high-leverage task.
- **Next action:** Review collaborator Sigurd's PR adding client attribution headers and release polish for Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for where I serve as the default reviewer (bots do not count). The PR fixes a real bug regarding RPC status code mapping and retryability over REST. Since it is from an outside contributor rather than a close collaborator, it sits appropriately in the 0.65-0.75 review range.
- **Next action:** Review this PR for google_cloud_rpc error handling.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue in a repository I am responsible for (googleapis/google-cloud-dart). I explicitly asked the contributor to share a design before writing code, and they posted a concrete design sketch 4 days ago. A contributor is blocked waiting on my reply to move forward with the implementation.
- **Next action:** Review Yusufihsangorgel's proposed enum representation design and give feedback so they can proceed with an implementation.

### 6. dart-lang/http#2027 → predicted 8, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is an issue you recently filed yourself in a repository you own (dart-lang/http) regarding core architecture/semantics. It represents your own planned work and thinking on breaking API changes for 2.0. Because it is relatively fresh (9 days ago) and not blocked on anyone else, it sits squarely in your planned work band (0.5–0.65).
- **Next action:** Decide on the design for async Client.close and draft a proposal or PR for http 2.0

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I recently assigned this issue to myself and explicitly commented 5 hours ago that I started working on it. This represents active planned work in a repository I own. It falls right into the 0.5–0.65 range for my own planned commitments.
- **Next action:** Work on implementing the server trust evaluation hook in CupertinoClient.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, filed by my close collaborator kevmoo. He replied to my question, clarifying that while it isn't urgent, mid-stream error handling and EOF buffering represent real bugs in our streaming client. Because it is a collaborator's issue in my repo with no other owner, it represents planned work for me.
- **Next action:** Decide on an implementation plan or prepare a PR to address mid-stream SSE error handling and incremental JSON streaming.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned to me in dart-lang/sdk regarding HTTP header parsing in dart:io. While not flagged as an active critical security exploit, accepting characters like NUL in HTTP headers can cause request smuggling or proxy desync issues. Because I am assigned and haven't touched it, I should either investigate/fix it or reassign it.
- **Next action:** Investigate the RFC 9110 header validation issue in dart:io and either plan a fix or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in my repository (googleapis/google-cloud-dart) and filed by a close collaborator (kevmoo). I left the last comment asking a direct design question about trade-offs between discovery and proto convenience extensions. Since I am waiting on kevmoo's response, there is no immediate action for me right now.
- **Next action:** Waiting on kevmoo to reply to my question regarding discovery vs convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a long-standing bug in `dart:io` causing uncatchable exceptions on unexpected HTTP responses, where collaborator kevmoo and parlough CC'd me in early 2024. However, it is in `dart-lang/sdk` (not my core repository), I am not assigned, there is no recent activity, and no concrete direct request was made of me recently.
- **Next action:** None; issue is dormant and I was only CC'd over two years ago.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** You filed and are assigned to this issue, but you have already opened PR #3763 to address it. Under our duplicate and issue-linking guidelines, action should be focused on the PR rather than the issue. Consequently, the priority is lowered into the 0.15-0.35 range.
- **Next action:** Follow up on PR #3763 which fixes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.55
- **Ground truth:** 
- **Model:** This issue was filed by your close collaborator sigurdm in a repository you maintain (google-cloud-dart). You last commented noting you were deciding how to handle this dependency bump systematically, leaving the ball in your court. While there is no immediate crisis, it represents planned maintenance work you need to drive forward before the next package releases.
- **Next action:** Decide on the resolution approach (manual pubspec updates vs librarian automation) and update the package dependencies.

### 14. dart-lang/tools#2719 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision bump in dart-lang/tools, a repository I am not directly responsible for. It was requested via the dart-ecosystem-team rather than to me personally, so it does not require my immediate attention. Team review requests in repos I do not own fall into the low priority range (0.15-0.35).
- **Next action:** Wait for a package owner on dart-ecosystem-team to review this automated bump.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue describes a bug in google_cloud_rpc in a repository I maintain, but the author has already submitted PR #382 to fix it. Per policy, when an issue is covered by an open PR, work should happen on the PR instead, so the issue itself is ranked low (0.15-0.35). Reviewing PR #382 will be the primary action.
- **Next action:** Review PR #382 instead of acting on this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR in dart-lang/http, which you opened and requested a review from goderbauer on 2 days ago. Since it has only been a few days, there is nothing for you to do yet until review feedback is provided or roughly a week passes without a response.
- **Next action:** Waiting for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue in a repository I own that was filed by a close collaborator (kevmoo), which I assigned to myself and actively scoped out with implementation notes. It represents my own committed planned work, sitting squarely in the 0.5–0.65 range. While actionable, there is no immediate blocker or urgent external ping waiting on me today.
- **Next action:** Implement RetryRunner and RequestOptions wiring in google_cloud_rpc's ServiceClient as planned.

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem directly requested my review, this PR is part of `http2` (which I noted I am not responsible for) and is stacked on lower PRs including #2014 which has not been reviewed yet. Stacked release PRs waiting on earlier PRs to land are low priority until the underlying changes are merged.
- **Next action:** Wait for unreviewed PRs lower in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR that I marked as draft 45 days ago and has since become dirty/conflicted. As a stale draft PR of my own, it falls in the 0.15-0.35 range for unfinished drafts to complete or abandon. It is not currently blocking anyone else.
- **Next action:** Decide whether to continue work on this DNS package PR, address merge conflicts, or close the draft.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my directly managed repositories, and the review request is to the dart-ecosystem-team rather than me personally. Furthermore, the PR is blocked because the contributor has not yet signed the CLA. It requires no immediate action from me.
- **Next action:** Wait for author to sign the Google CLA before reviewing.

### 21. dart-lang/tools#2544 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This is a PR in dart-lang/tools, a repository I am not responsible for, where I am only included via a team review request (dart-ecosystem-team). Even though it addresses a security vulnerability (UNC path injection), it is not in my code, and another reviewer (lrhn) has already actively reviewed it with detailed feedback that the author (jonasfj) needs to address. There is nothing for me to do.
- **Next action:** Wait for jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on draft PR #2563 which has not been reviewed yet. Furthermore, this repository (dart-lang/tools) is not one I am directly responsible for, and the review was requested only to the team dart-ecosystem-team rather than me directly.
- **Next action:** Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, opened and requested review on only 2 days ago. Since it was requested recently and less than a week has passed, there is no action needed from me yet.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.35
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I am responsible for. I asked sigurdm 4 days ago whether his approval covered the full PR so natebosch doesn't need to review it. Since I am waiting on his response, there is no immediate action for me right now.
- **Next action:** Waiting on sigurdm to reply about whether he reviewed the full PR or if natebosch is still needed.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking changes to the core client interface and is explicitly tagged 'next-breaking-release'. I previously confirmed that this work needs to wait for a semver major release that I lack bandwidth for right now. Per the guidelines, PRs waiting for a future breaking release are low priority (around 0.05-0.15).
- **Next action:** None; PR is deferred until a major breaking release is planned.

### 26. dart-lang/http#1932 → predicted 18, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is an open PR (#2034) authored by me that fixes this issue. When an issue has an open PR covering it, action should be directed at the PR rather than the issue. Keeping this ranked in the low range (0.15–0.35) avoids duplicate effort.
- **Next action:** Focus on open PR dart-lang/http#2034 instead of this issue.

### 27. flutter/devtools#8223 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** I was only mentioned as an informational CC over two years ago regarding potential architectural work across HTTP profiling and WebSockets. flutter/devtools is not a repository I am responsible for, and no questions or tasks are directed at me. There is nothing for me to do here.
- **Next action:** None; this is an informational CC in a repository I do not own.

### 28. dart-lang/http#1837 → predicted 31, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old enhancement request marked as 'contributions-welcome' and 'P3'. You explicitly replied a year ago that the team is not planning to take it on, suggesting community members implement it instead. There has been no new activity since, so nothing is required from you.
- **Next action:** None; waiting for community contributions if anyone chooses to take this on.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already approved this PR and no new commits or comments have been made since. It is waiting entirely on the author (mosuem) to merge. As defined by the guidelines, approved and quiet PRs score at or near 0.
- **Next action:** Waiting on mosuem to merge or follow up on the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, this is an old enhancement issue with no mentions or requests directed at me. Therefore, it requires no attention from me.
- **Next action:** None; this issue belongs to package:http2 which is outside my scope.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not directly responsible for. While my team (dart-ecosystem-team) was requested, a specific individual reviewer (davidmorgan) was explicitly requested, meaning it is not on me to review. Consequently, this ranks near zero.
- **Next action:** Waiting on davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, the author specifically directed this review request to mosuem, so there is nothing for me to do.
- **Next action:** Waiting on mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 35, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and actively driven by liamappelbe. I chimed in with context earlier, but there are no direct questions or actions required from me.
- **Next action:** None; liamappelbe is driving this issue in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** You asked clarifying questions 8 days ago and labeled the issue 'needs-info', with no reply from the author yet. Furthermore, there is an open PR (#1974) attempting to address this issue, which makes the issue itself non-actionable.
- **Next action:** Waiting on author Keetz to respond to questions regarding reproduction and client type.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You previously marked this issue with a thumbs-down on 2026-10-05, and no significant activity directed at you has occurred on the issue since then. Additionally, an open PR (PR #2002) has already been created to address this enhancement, making the PR the appropriate place for action. Consequently, this issue requires no attention right now.
- **Next action:** Track progress on PR #2002 instead of this issue.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.65
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although you previously gave this a thumbs down in August 2026, filiph commented recently on this assigned P2 issue with a local reproduction on modern Dart versions offering to help hunt it down. Since you are assigned to this issue and a collaborator/contributor is offering a reproducible case, you should follow up or unassign yourself.
- **Next action:** Reply to filiph's offer to provide a reproduction case or unassign myself if not actively working on this.
