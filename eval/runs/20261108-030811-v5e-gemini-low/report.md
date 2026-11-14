# Gitilizer eval: v5e-gemini-low

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5e.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030811

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.716 ± 0.013 |
| spearman | 0.831 ± 0.011 |
| pairwise_acc | 0.858 ± 0.006 |
| ndcg | 0.985 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.629 ± 0.263 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.867 ± 0.000 | 0.998 ± 0.000 | 1.000 ± 0.000 | 0.875 ± 0.000 |
| B | 20 | 0.582 ± 0.026 | 0.965 ± 0.001 | 0.600 ± 0.000 | 3.000 ± 0.265 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 3/3 | dart-lang/sdk#48056 | A | Assess the security concern regarding Android certificate revocation/blocklists and respond to confirm whether action or an issue split is required. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG.md handling and update the PR as needed. |
| 3 | 3.0 (3) | +0.0 | 0.77 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR adding client attribution headers and release polish for Pub/Sub. |
| 4 | 4.7 (4–5) | +0.7 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR fixing RPC error code handling in google_cloud_rpc. |
| 5 | 4.3 (4–5) | -0.7 | 0.73 | 3/3 | googleapis/google-cloud-dart#252 | B | Review and reply to Yusufihsangorgel's proposed enum design snippet. |
| 6 | 7.0 (7) | +1.0 | 0.58 | 3/3 | dart-lang/http#2027 | B | Work on the proposed Client.close semantics refactor or discuss it with collaborators for the 2.0 release plan. |
| 7 | 6.0 (6) | -1.0 | 0.63 | 3/3 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in cupertino_http as promised. |
| 8 | 10.0 (10) | +2.0 | 0.53 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide on an implementation plan or draft a fix for the error handling and streaming issues in google_cloud_rpc. |
| 9 | 12.0 (12) | +3.0 | 0.50 | 3/3 | dart-lang/sdk#59846 | B | Investigate and fix RFC 9110 character validation in dart:io HTTP header parsing, or unassign if not working on it. |
| 10 | 14.0 (14) | +4.0 | 0.39 | 0/3 | googleapis/google-cloud-dart#361 | A | Waiting for kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions. |
| 11 | 14.3 (13–15) | +3.3 | 0.37 | 1/3 | dart-lang/sdk#31275 | A | None; issue is an old informational CC in dart-lang/sdk with no recent activity directed at me. |
| 12 | 17.3 (16–19) | +5.3 | 0.23 | 0/3 | dart-lang/native#3752 | B | Work on open PR #3763 instead of this issue. |
| 13 | 11.0 (11) | -2.0 | 0.52 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to address dependency version bumps manually or wait for automation, then bump pubspec versions. |
| 14 | 17.3 (17–18) | +3.3 | 0.21 | 0/3 | dart-lang/tools#2719 | B | Waiting for a member of dart-ecosystem-team responsible for dart-lang/tools to review this automated PR. |
| 15 | 15.7 (15–16) | +0.7 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting on this issue directly. |
| 16 | 21.7 (21–22) | +5.7 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review the pull request. |
| 17 | 8.3 (8–9) | -8.7 | 0.56 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in google_cloud_rpc ServiceClient |
| 18 | 25.0 (25) | +7.0 | 0.08 | 0/3 | dart-lang/http#2031 | A | Wait for unreviewed PRs lower in the stack (#2014) to be reviewed and merged first. |
| 19 | 20.0 (20) | +1.0 | 0.19 | 3/3 | googleapis/google-cloud-dart#345 | A | Resume work to finish or abandon this draft PR. |
| 20 | 20.3 (19–21) | +0.3 | 0.17 | 0/3 | dart-lang/core#1007 | B | Waiting for the author to sign the CLA and for someone on the team to pick up review. |
| 21 | 29.0 (28–30) | +8.0 | 0.05 | 0/3 | dart-lang/tools#2544 | B | Waiting on jonasfj to address review comments from lrhn. |
| 22 | 24.0 (24) | +2.0 | 0.09 | 0/3 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR. |
| 23 | 22.7 (22–23) | -0.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the pull request. |
| 24 | 16.3 (13–23) | -7.7 | 0.29 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to respond regarding whether the full PR is good to merge without natebosch. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/3 | dart-lang/http#579 | B | Wait for planning of a future breaking major release before proceeding with breaking API changes. |
| 26 | 18.3 (18–19) | -7.7 | 0.20 | 0/3 | dart-lang/http#1932 | B | Focus on open PR #2034 instead of this issue. |
| 27 | 30.0 (28–31) | +3.0 | 0.04 | 0/3 | flutter/devtools#8223 | B | None; wait for devtools and runtime teams to prioritize or design websocket profiling. |
| 28 | 30.0 (29–31) | +2.0 | 0.05 | 0/3 | dart-lang/http#1837 | A | Waiting for community contribution or external initiative. |
| 29 | 33.7 (33–34) | +4.7 | 0.00 | 0/3 | dart-lang/http#2033 | A | Waiting on mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | None; this issue belongs to package:http2 which is outside my scope of responsibility. |
| 31 | 27.0 (27) | -4.0 | 0.05 | 0/3 | dart-lang/tools#2715 | B | Waiting for davidmorgan to review the PR. |
| 32 | 32.7 (32–33) | +0.7 | 0.00 | 0/3 | dart-lang/http#2026 | A | Waiting on mosuem to review the PR. |
| 33 | 29.0 (28–30) | -4.0 | 0.05 | 0/3 | dart-lang/native#3653 | A | Waiting on liamappelbe to decide next steps or close this issue in dart-lang/native. |
| 34 | 33.0 (32–35) | -1.0 | 0.01 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to provide reproduction details or respond to questions. |
| 35 | 34.7 (34–35) | -0.3 | 0.00 | 0/3 | dart-lang/http#1841 | B | Follow up on open PR #2002 instead of this issue. |
| 36 | 8.7 (8–9) | -27.3 ⚠️ | 0.56 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph regarding reproduction steps or unassign myself if I am not working on dart:io issues. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#359** (truth #17) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue assigned to me involving certificate trust, compromised intermediate CA keys, and TLS validation on Android. A user raised an urgent security incident inquiry 3 days ago regarding the eMudhra intermediate CA compromise. Under the security policy, any active security issue assigned to me outranks other tasks and belongs at 0.9 or above regardless of its age or P3 label.
- **Next action:** Assess the security concern regarding Android certificate revocation/blocklists and respond to confirm whether action or an issue split is required.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own open pull request where a close collaborator (kevmoo) left feedback 21 hours ago with an unresolved review question. I am blocking progress on this PR until I address the review comment. Since it directly affects my own active work and has very fresh feedback, it belongs in the high 0.8–0.9 range.
- **Next action:** Reply to kevmoo's review comment on CHANGELOG.md handling and update the PR as needed.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.78
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from a close collaborator (sigurdm) in a repository I am responsible for (google-cloud-dart). As the default reviewer for this repository, it is on me to review it. Because it was created 5 days ago (within the last 7 days), it sits in the upper part of the 0.65–0.80 range.
- **Next action:** Review sigurdm's PR adding client attribution headers and release polish for Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for where I serve as the default reviewer. It fixes a functional bug affecting retries over REST and was submitted 3 days ago. Because the author is an external contributor rather than a close collaborator, it falls in the 0.65-0.75 range.
- **Next action:** Review this PR fixing RPC error code handling in google_cloud_rpc.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I filed in a repository I maintain (google-cloud-dart). A contributor specifically followed my guidance to pitch a design sketch before implementing code, and posted their proposal 4 days ago. Replying to unblock their design and implementation work falls squarely on me in the 0.65–0.8 range.
- **Next action:** Review and reply to Yusufihsangorgel's proposed enum design snippet.

### 6. dart-lang/http#2027 → predicted 7, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You filed this issue 9 days ago in dart-lang/http, a repository you maintain, outlining architectural changes to Client.close. As fresh planned work created by you within the last two weeks with no blockers or external dependencies, it sits in the 0.5-0.65 range. Because it is 9 days old (middle of the 2-week freshness window), a score of 0.58 reflects active planned work.
- **Next action:** Work on the proposed Client.close semantics refactor or discuss it with collaborators for the 2.0 release plan.

### 7. dart-lang/http#1981 → predicted 6, priority 0.63
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself this issue and explicitly announced 5 hours ago that I have started working on it. This represents fresh planned work that I committed to in a repository I maintain, placing it near the top of the 0.5–0.65 range.
- **Next action:** Work on implementing the server trust evaluation hook in cupertino_http as promised.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, and was filed by a close collaborator (kevmoo). kevmoo replied to my question clarifying that it is not urgent, leaving the ball back in my court to decide whether and how to implement the changes. Because it represents valid planned work in my repo with no blockers, but is explicitly non-urgent and hasn't had activity in 17 days, it sits in the middle of the 0.5–0.65 range.
- **Next action:** Decide on an implementation plan or draft a fix for the error handling and streaming issues in google_cloud_rpc.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is a bug assigned directly to me in `dart:io` regarding HTTP header parsing accepting invalid characters like NUL and control characters. While it involves HTTP parsing quirks and potential proxy issues, it has been inactive for nearly two years without any recent activity or security escalation. As an assigned issue in an area I work on that needs either fixing or unassigning, it sits at the bottom of the assigned/planned work range due to age.
- **Next action:** Investigate and fix RFC 9110 character validation in dart:io HTTP header parsing, or unassign if not working on it.

### 10. googleapis/google-cloud-dart#361 → predicted 14, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked kevmoo a direct question 16 days ago questioning whether switching to discovery is worthwhile given API bloat. The next step is on kevmoo to respond. Because this is an active discussion with a close collaborator in my repository, it stays in the 0.35–0.5 range.
- **Next action:** Waiting for kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was CC'd by collaborator kevmoo and parlough noting my ownership of the library, but that was over 2.5 years ago and there has been no recent activity requiring my immediate attention. The issue is in dart-lang/sdk (not my primary repositories) and is an unassigned bug rather than an urgent security vulnerability. While it affects a core component and involves a collaborator, its age and lack of fresh action place it at the lower boundary of the CC range.
- **Next action:** None; issue is an old informational CC in dart-lang/sdk with no recent activity directed at me.

### 12. dart-lang/native#3752 → predicted 17, priority 0.25
- **Ground truth:** 
- **Model:** You filed this issue 6 days ago and already have an open PR (PR #3763) actively addressing it. Under the duplicate/covering PR rule, the PR is the primary item to act on rather than the issue itself. This issue is kept in the lower range (0.15–0.35) while the PR is in flight.
- **Next action:** Work on open PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.52
- **Ground truth:** 
- **Model:** This is an issue in googleapis/google-cloud-dart filed by a close collaborator (sigurdm) tracking necessary dependency bumps before releases. You commented 17 days ago pondering how to address it, making the next step yours to resolve or execute. Because it falls under your planned work in your repository and has been sitting for over two weeks, it belongs in the middle of the 0.5-0.65 range.
- **Next action:** Decide whether to address dependency version bumps manually or wait for automation, then bump pubspec versions.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated dependency update in dart-lang/tools, which is not a repository I am responsible for. Review was requested only from the dart-ecosystem-team, not from me personally. Consequently, this falls into the low priority range for team review requests in unowned repositories.
- **Next action:** Waiting for a member of dart-ecosystem-team responsible for dart-lang/tools to review this automated PR.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in googleapis/google-cloud-dart reports a legitimate error-handling bug, but an open pull request (#382) already addresses it. Because the PR is the active place to take action, this issue should be ranked significantly below the PR in the low range (0.15–0.35). As it was filed 3 days ago, it sits in the upper part of that range.
- **Next action:** Review PR #382 instead of acting on this issue directly.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your pull request in dart-lang/http, and you requested a review from goderbauer only 2 days ago. Since less than a week has passed and there has been no feedback or blocking issue for you to address yet, there is nothing for you to do right now. Following the guidelines, an author's PR waiting on a recently requested reviewer falls in the 0.05–0.15 range.
- **Next action:** Wait for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I maintain (googleapis/google-cloud-dart), filed by close collaborator kevmoo. I actively scoped and planned the work 10-17 days ago, so it represents ongoing planned work directly on my plate without external blockers. It falls into the 0.5–0.65 range for assigned/planned work, situated in the middle given the last activity was 10 days ago.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in google_cloud_rpc ServiceClient

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is stacked on multiple earlier PRs, including #2014 which has not yet been reviewed. Furthermore, I have specifically noted that I am not responsible for http2 in dart-lang/http. Because lower stack PRs need attention first and this is outside my primary area, it stays very low priority for now.
- **Next action:** Wait for unreviewed PRs lower in the stack (#2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I maintain, converted to draft 45 days ago with no subsequent activity. Per the guidelines, own drafts that should either be finished or abandoned fall into the 0.15–0.35 range. Because it is over a month old and currently marked dirty, it sits toward the lower end of that bracket.
- **Next action:** Resume work to finish or abandon this draft PR.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my primary responsible repositories, and the review request is to the dart-ecosystem-team rather than me personally. Furthermore, the contributor hasn't signed the CLA yet, blocking review progress. This belongs in the low priority range for team review requests.
- **Next action:** Waiting for the author to sign the CLA and for someone on the team to pick up review.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** Although this addresses a security vulnerability (UNC path injection), it is in dart-lang/tools, a repository I am not responsible for. Furthermore, it is already actively being reviewed by lrhn, and the review request was only to the dart-ecosystem-team rather than me personally. The author jonasfj needs to address lrhn's comments before any further action can occur.
- **Next action:** Waiting on jonasfj to address review comments from lrhn.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft and unreviewed, meaning this PR is blocked on lower PRs. Furthermore, it is in dart-lang/tools (which is outside your direct ownership) and was requested via a team review rather than directly to you. Consequently, it belongs in the low 0.05–0.15 priority range until the base PR lands.
- **Next action:** Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your pull request in dart-lang/native, which you opened and requested review on from liamappelbe just 2 days ago. Since you only recently requested a review and a week has not passed, there is no action needed from you right now. It falls into the low priority waiting range (0.05–0.15).
- **Next action:** Wait for liamappelbe to review the pull request.

### 24. googleapis/google-cloud-dart#373 → predicted 13, priority 0.38
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repository I maintain, but the next step is currently waiting on sigurdm's reply to my question from 4 days ago about whether he reviewed the non-PubSub parts. Nate Bosch is also assigned as a reviewer, so I am waiting on reviewer input before merging. Because it is an active thread with a close collaborator in my own repository, it rates moderately within the waiting range.
- **Next action:** Wait for sigurdm to respond regarding whether the full PR is good to merge without natebosch.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This pull request introduces breaking API changes and is explicitly blocked under the 'next-breaking-release' label. I previously noted that I don't have the bandwidth to coordinate a major release, and no substantial actionable events have occurred since other than an external question 14 months ago.
- **Next action:** Wait for planning of a future breaking major release before proceeding with breaking API changes.

### 26. dart-lang/http#1932 → predicted 19, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is already an open pull request (dart-lang/http#2034) authored by me that fixes this issue. Under the guidelines, issues with active PRs covering them should not be acted on directly and should be ranked low (0.15–0.35). Recent comments are merely asking for status updates, which do not make the issue actionable.
- **Next action:** Focus on open PR #2034 instead of this issue.

### 27. flutter/devtools#8223 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This is an issue in flutter/devtools, a repository I am not responsible for, where I was merely CC'd over two years ago for informational context regarding HTTP profiling. Recent activity consists only of triage/labeling and a question directed to @bkonyi by an outside contributor. There is no action requested of me.
- **Next action:** None; wait for devtools and runtime teams to prioritize or design websocket profiling.

### 28. dart-lang/http#1837 → predicted 31, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old P3 feature request that you already answered a year ago, stating the team will not take it on and labeling it 'contributions-welcome'. There has been no subsequent activity or community PR. It belongs at the bottom of the scale as stale backlog waiting on external contributors.
- **Next action:** Waiting for community contribution or external initiative.

### 29. dart-lang/http#2033 → predicted 34, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this PR 2 days ago, and there has been no new activity or commits since. The next step belongs to the author (mosuem) to land it. As far as I am concerned, my work here is done.
- **Next action:** Waiting on mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, this is an old issue where I have never been mentioned or assigned, and the last comment was 8 months ago. Because it falls outside my stated scope, it requires zero attention from me.
- **Next action:** None; this issue belongs to package:http2 which is outside my scope of responsibility.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not directly responsible for. While my team (dart-ecosystem-team) was requested, a specific individual reviewer (davidmorgan) was explicitly requested, meaning the review is not on me. Therefore, this belongs near zero priority.
- **Next action:** Waiting for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 33, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, the author has directly reached out to mosuem for review, so there is nothing for me to do.
- **Next action:** Waiting on mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 29, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and driven by liamappelbe. I previously commented with findings over a month ago, and the discussion is now between liamappelbe and mraleph regarding compiler/runtime internals with no action requested of me.
- **Next action:** Waiting on liamappelbe to decide next steps or close this issue in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 32, priority 0.02
- **Ground truth:** 
- **Model:** I asked the reporter clarifying questions and added the 'needs-info' label 8 days ago, and there has been no reply yet. Furthermore, there is an open PR (#1974) linked to this issue. Because the issue is waiting on information from the reporter, it is not actionable for me right now.
- **Next action:** Wait for Keetz to provide reproduction details or respond to questions.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** I marked this issue with a thumbs-down on 2026-10-05, and no new activity directed at me has occurred since then. Additionally, an open PR (#2002) already addresses this issue, so any relevant review work should happen there. As nothing is needed on this issue itself, it receives a minimum priority.
- **Next action:** Follow up on open PR #2002 instead of this issue.

### 36. dart-lang/sdk#38148 → predicted 9, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although I gave this issue a thumbs-down in August 2026, filiph commented 24 days ago noting a reliable local reproduction on modern Dart and offering to help debug. Because I am assigned to this P2 issue in dart-lang/sdk and new actionable information was provided after my thumbs-down, it warrants follow-up or reassignment. As this is an assigned issue in the 1-4 week activity window (middle of the 0.5-0.65 range), it sits at 0.55.
- **Next action:** Reply to filiph regarding reproduction steps or unassign myself if I am not working on dart:io issues.
