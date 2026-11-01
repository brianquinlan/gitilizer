# Gitilizer eval: m-gemini-3.8-flash-low-t1

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-165019

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.679 ± 0.000 |
| spearman | 0.793 ± 0.000 |
| pairwise_acc | 0.840 ± 0.000 |
| ndcg | 0.977 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.000 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.867 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 0.875 ± 0.000 |
| B | 20 | 0.474 ± 0.000 | 0.915 ± 0.000 | 0.400 ± 0.000 | 3.700 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Assess the security concern regarding Android certificate revocation and blocklist enforcement in light of the eMudhra CA compromise, and respond to the issue. |
| 2 | 2.0 (2) | +0.0 | 0.82 | 1/1 | googleapis/librarian#7808 | A | Reply to kevmoo's question on CHANGELOG.md retention and update the PR if needed. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR for client attribution headers and pre-release polish. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | Review this PR for google_cloud_rpc error code mapping. |
| 5 | 5.0 (5) | +0.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's proposed enum representation design. |
| 6 | 12.0 (12) | +6.0 | 0.52 | 1/1 | dart-lang/http#2027 | B | Decide on the API design for Client.close and draft a proposal or PR for package:http 2.0. |
| 7 | 7.0 (7) | +0.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | Implement the server trust evaluation hook in CupertinoClient as promised. |
| 8 | 9.0 (9) | +1.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | Decide on an implementation plan or put up a PR to address mid-stream error handling and streaming JSON in _makeStreamingRequest. |
| 9 | 11.0 (11) | +2.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | Investigate the RFC 9110 header validation issue in dart:io and fix it or unassign myself. |
| 10 | 13.0 (13) | +3.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to reply regarding whether to switch Compute Engine to discovery format or use convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | None; keep in mind as backlog if revisiting dart:io HttpClient uncatchable error handling. |
| 12 | 18.0 (18) | +6.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Follow up on PR #3763 instead of this issue. |
| 13 | 10.0 (10) | -3.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide whether to bump the dependency versions directly or automate it, and implement the fix. |
| 14 | 20.0 (20) | +6.0 | 0.15 | 0/1 | dart-lang/tools#2719 | B | Wait for a package:boring maintainer to review this automated dependency update. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting on this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Waiting on goderbauer to review the pull request. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient and exception parsing. |
| 18 | 25.0 (25) | +7.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 19.0 (19) | +0.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Resume work to finish or abandon this draft PR. |
| 20 | 21.0 (21) | +1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | Waiting on author to sign the Google CLA before review. |
| 21 | 29.0 (29) | +8.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn's review feedback. |
| 22 | 24.0 (24) | +2.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 14.0 (14) | -10.0 ⚠️ | 0.35 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm (or natebosch) to reply regarding whether the non-PubSub parts are good to merge. |
| 25 | 31.0 (31) | +6.0 | 0.05 | 0/1 | dart-lang/http#579 | B | None; PR is deferred until a major breaking release is planned. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1932 | B | Focus on open PR #2034 which addresses this issue. |
| 27 | 27.0 (27) | +0.0 | 0.05 | 0/1 | flutter/devtools#8223 | B | None; this is an informational CC in a repository I do not own. |
| 28 | 30.0 (30) | +2.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | None; waiting for community contributions if anyone wants to implement this. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue is outside my area of responsibility. |
| 31 | 26.0 (26) | -5.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the PR. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Waiting on mosuem to review this http2 PR. |
| 33 | 28.0 (28) | -5.0 | 0.05 | 0/1 | dart-lang/native#3653 | A | None; waiting on assignee liamappelbe and the native team to decide if further optimization is worth pursuing. |
| 34 | 35.0 (35) | +1.0 | 0.00 | 0/1 | dart-lang/http#1972 | B | Waiting on reporter Keetz to provide requested reproduction information. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | Review the linked PR #2002 rather than acting on this issue. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.65 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph's offer to provide a reproducible case or unassign myself from the issue. |

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
- **Model:** This is an issue I created and am assigned to regarding certificate trust and verification on Android. A critical security incident involving compromised intermediate CAs was raised 3 days ago specifically questioning whether Dart fails to enforce platform revocation/blocklists. Per the security instructions, any security issue assigned to me with new activity regarding an incident or vulnerability demands top priority (0.9+).
- **Next action:** Assess the security concern regarding Android certificate revocation and blocklist enforcement in light of the eMudhra CA compromise, and respond to the issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.82
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your own PR fixing an issue in your Google Cloud Dart release workflow. Your collaborator kevmoo reviewed it and raised an architectural question about handling CHANGELOG.md retention during generation/cleaning. You need to answer his feedback to unblock your PR.
- **Next action:** Reply to kevmoo's question on CHANGELOG.md retention and update the PR if needed.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for, authored by my close collaborator sigurdm. As the default reviewer, it is on me to review it, especially since it prepares the Pub/Sub package for release.
- **Next action:** Review sigurdm's PR for client attribution headers and pre-release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for where I serve as the default reviewer. The author is a first-time contributor fixing an RPC error handling bug affecting retry behavior. Because bots do not count as human reviewers, the initial review is on me.
- **Next action:** Review this PR for google_cloud_rpc error code mapping.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This issue is in a repository I maintain (google-cloud-dart) and was filed by me. A contributor has followed up on my request for a preliminary design before writing code, and is waiting for my feedback to proceed with implementation. Unblocking active contributors on my owned repositories is high leverage.
- **Next action:** Reply to Yusufihsangorgel's proposed enum representation design.

### 6. dart-lang/http#2027 → predicted 12, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is an issue I filed myself 9 days ago outlining planned architectural improvements for `package:http`, a repository I am responsible for. Because it is my own recently planned work in an area I own with nobody else blocking it, it represents a valid commitment to drive forward. It falls into the 0.5–0.65 range for own planned work as it begins to age past a week.
- **Next action:** Decide on the API design for Client.close and draft a proposal or PR for package:http 2.0.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself this issue and explicitly commented 5 hours ago that I've started working on it. This is fresh, active planned work in a repository I maintain (dart-lang/http). It falls squarely into my planned commitments range (0.5–0.65).
- **Next action:** Implement the server trust evaluation hook in CupertinoClient as promised.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, filed by a close collaborator (kevmoo). kevmoo replied to my question clarifying his thoughts and confirming this is a known gap, leaving the ball back in my court to decide whether and how to implement it. Although kevmoo mentions it is not urgent, issues from close collaborators in my repo with an open next step represent planned backlog work that rates moderately high.
- **Next action:** Decide on an implementation plan or put up a PR to address mid-stream error handling and streaming JSON in _makeStreamingRequest.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue in dart-lang/sdk regarding HTTP header parsing in dart:io. While HTTP header injection and proxy desync issues can have security implications, this has been sitting dormant for nearly two years without new activity or escalation. Since it remains assigned to you, it falls under your planned/assigned work to either triage/fix or unassign yourself.
- **Next action:** Investigate the RFC 9110 header validation issue in dart:io and fix it or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in a repository I maintain, filed by my close collaborator kevmoo. I asked a clarifying architectural question 16 days ago weighing proto vs. discovery formats, and we are currently waiting on his response before proceeding.
- **Next action:** Waiting on kevmoo to reply regarding whether to switch Compute Engine to discovery format or use convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old issue in dart-lang/sdk where collaborator @kevmoo CC'd me over two years ago asking for it to be taken up. While it affects dart:io HttpClient and was brought to my attention, I was only informational CC'd without a direct assignment or recent activity in the last 20 months. It sits in the low-to-medium backlog for old important issues where I was merely CC'd.
- **Next action:** None; keep in mind as backlog if revisiting dart:io HttpClient uncatchable error handling.

### 12. dart-lang/native#3752 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** You opened this issue and already created a linked pull request (#3763) to fix it. Per the guidelines, when an issue has an open PR that addresses it, action should be taken on the PR rather than the issue itself. This issue is kept in the lower priority range to avoid duplicate effort.
- **Next action:** Follow up on PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.55
- **Ground truth:** 
- **Model:** This is an issue filed by my close collaborator sigurdm in a repository I maintain (google-cloud-dart). I last commented over two weeks ago noting I was considering how to address this problem, leaving the ball in my court. It represents ongoing maintenance/planned work for releases in my repo.
- **Next action:** Decide whether to bump the dependency versions directly or automate it, and implement the fix.

### 14. dart-lang/tools#2719 → predicted 20, priority 0.15
- **Ground truth:** 
- **Model:** This is an automated PR in dart-lang/tools, a repository I am not directly responsible for. The review request is directed to the dart-ecosystem-team rather than me personally. As a team review request in a repository outside my core areas, it is low priority and someone closer to package:boring can handle it.
- **Next action:** Wait for a package:boring maintainer to review this automated dependency update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository I maintain, but the author has submitted an open pull request (#382) to fix it. Per the guidelines, when an issue has an open PR covering it, the PR is the primary item to act on. The issue priority is depressed to the 0.15-0.35 range while PR #382 is pending review.
- **Next action:** Review PR #382 instead of acting on this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your own pull request in dart-lang/http, and you requested a review from goderbauer only two days ago. Since roughly a week has not yet passed without a response, there is no action needed from you right now.
- **Next action:** Waiting on goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is assigned to me in a repo I maintain, filed by a close collaborator (kevmoo). I scoped and assigned it to myself recently, making it part of my planned active work. While there are no external blockers or urgent security risks, I need to implement the design or unassign it.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient and exception parsing.

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This release preparation PR is in package:http2 (which I noted I am not responsible for) and is stacked on several other PRs, including #2014 which still requires review. Stacked PRs waiting on lower changes have low priority until their predecessors land.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding DNS support in googleapis/google-cloud-dart, which has been untouched for 45 days and has merge conflicts. As a stale draft of my own that needs either finishing or closing, it sits in the low priority range (0.15–0.35).
- **Next action:** Resume work to finish or abandon this draft PR.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my primary repositories, and I am only involved via a team review request to dart-ecosystem-team. Furthermore, the PR is blocked because the contributor has not yet signed the CLA. It requires no immediate action from me.
- **Next action:** Waiting on author to sign the Google CLA before review.

### 21. dart-lang/tools#2544 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This is a PR in dart-lang/tools where I am only involved via a team review request (`dart-ecosystem-team`). The author specifically requested a review from lrhn, who is actively driving the review and left several comments awaiting response from jonasfj. Even though this relates to a security mitigation (UNC path injection), it is not my repository, I am not assigned or personally requested, and another reviewer is actively handling it.
- **Next action:** Wait for jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR in dart-lang/tools is stacked on #2563, which is still a draft and unreviewed. Furthermore, I was not directly requested for review (only via the team dart-ecosystem-team) and dart-lang/tools is not one of my primary repositories. Per policy, stacked PRs waiting on lower unreviewed PRs are low priority.
- **Next action:** Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, which I opened and requested a review on 2 days ago. Since I recently requested review from liamappelbe and there has been no response yet, there is nothing for me to do until about a week has passed.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.35
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repo I am responsible for. I recently asked collaborator @sigurdm whether his approval covered the whole PR so we could spare Nate a review. It is currently waiting on his answer, but it's only been 4 days since I asked.
- **Next action:** Wait for sigurdm (or natebosch) to reply regarding whether the non-PubSub parts are good to merge.

### 25. dart-lang/http#579 → predicted 31, priority 0.05
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking changes to the core client interface and is explicitly marked with `next-breaking-release`. I previously commented stating that landing this requires coordinating an semver major release and that I don't have the bandwidth for it. Per instructions, PRs waiting for a future breaking release receive low priority (around 0.05-0.15).
- **Next action:** None; PR is deferred until a major breaking release is planned.

### 26. dart-lang/http#1932 → predicted 17, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I have an open PR (#2034) addressing this issue, so any concrete work should take place on the PR rather than this issue. Following the guideline to avoid duplicate attention and keep issues with active PRs in the 0.15-0.35 range, this issue itself requires no immediate action.
- **Next action:** Focus on open PR #2034 which addresses this issue.

### 27. flutter/devtools#8223 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, which is outside my direct scope of responsibility. I was merely CC'd over two years ago by bkonyi regarding HTTP profiling considerations, with nothing directly asked of me. The recent activity is unrelated community/label triage, so there is no action for me to take.
- **Next action:** None; this is an informational CC in a repository I do not own.

### 28. dart-lang/http#1837 → predicted 30, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already responded to this feature request a year ago explaining that the Dart team won't take this on, marked it P3, and it has the 'contributions-welcome' label. There has been no activity since your response. As an old, low-priority backlog enhancement waiting on community action, it requires no attention right now.
- **Next action:** None; waiting for community contributions if anyone wants to implement this.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this PR, and no new commits or comments have been added since. It is completely done as far as I am concerned and waiting on the author to merge.
- **Next action:** Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is labeled 'package:http2', which I explicitly noted I am not responsible for in dart-lang/http. Additionally, I am not assigned, mentioned, or asked to do anything here. It can be safely ignored.
- **Next action:** None; this issue is outside my area of responsibility.

### 31. dart-lang/tools#2715 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. Although authored by my collaborator kevmoo and requested from my team dart-ecosystem-team, a specific reviewer (davidmorgan) was individually requested to review it. Therefore, there is no action needed from me.
- **Next action:** Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** You have noted specifically that you are not responsible for http2 in dart-lang/http. Additionally, the author has explicitly tagged mosuem for review, so there is nothing for you to do here.
- **Next action:** Waiting on mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 28, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native (outside my core repositories) and is assigned to liamappelbe. Although I previously chimed in with experimental context, the discussion is between the VM and native interop maintainers, with no questions directed to me or actions required on my part.
- **Next action:** None; waiting on assignee liamappelbe and the native team to decide if further optimization is worth pursuing.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You asked clarifying questions and added the 'needs-info' label 8 days ago, and the reporter has not responded yet. Furthermore, an open PR (#1974) is already linked to this issue. Items with 'needs-info' waiting on reporter response are scored at or near 0.0.
- **Next action:** Waiting on reporter Keetz to provide requested reproduction information.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05, and nothing directed at you has occurred on it since. Additionally, there is an open PR (#2002) addressing this enhancement, meaning any review action belongs on the PR rather than this issue.
- **Next action:** Review the linked PR #2002 rather than acting on this issue.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.65
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although you marked this issue with a thumbs-down previously, filiph commented recently confirming reproducible behavior on modern macOS ARM and offering to help debug. As you are assigned to this issue in the SDK, this new development provides actionable traction to verify or reassign.
- **Next action:** Reply to filiph's offer to provide a reproducible case or unassign myself from the issue.
