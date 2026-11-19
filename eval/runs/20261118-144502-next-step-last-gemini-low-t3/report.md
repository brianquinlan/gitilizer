# Gitilizer eval: next-step-last-gemini-low-t3

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-144502

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.682 ± 0.000 |
| spearman | 0.820 ± 0.000 |
| pairwise_acc | 0.841 ± 0.000 |
| ndcg | 0.985 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.111 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.537 ± 0.000 | 0.963 ± 0.000 | 0.600 ± 0.000 | 3.400 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | [respond] Check whether recent SDK changes resolved the eMudhra distrust issue on Android and respond to the security question. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | [respond] Reply to kevmoo's question on internal/librarian/dart/bump.go and address the CHANGELOG.md preservation issue. |
| 3 | 3.0 (3) | +0.0 | 0.76 | 1/1 | googleapis/google-cloud-dart#376 | A | [review] Review sigurdm's PR adding client attribution and pre-release polish to Pub/Sub. |
| 4 | 5.0 (5) | +1.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | [review] Review this PR fixing RPC error code handling in google_cloud_rpc |
| 5 | 4.0 (4) | -1.0 | 0.72 | 1/1 | googleapis/google-cloud-dart#252 | B | [respond] Review and reply to Yusufihsangorgel's proposed design sketch for enum number/string support. |
| 6 | 8.0 (8) | +2.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | [todo] Decide on the design for `Client.close` semantics or implement the proposed change |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | [todo] Work on implementing the server trust evaluation hook in cupertino_http |
| 8 | 12.0 (12) | +4.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#360 | A | [todo] Decide whether to implement mid-stream error handling and incremental JSON parsing for streaming requests. |
| 9 | 11.0 (11) | +2.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | [todo] Investigate and fix the invalid character validation in dart:io's HTTP header parser, or unassign myself. |
| 10 | 13.0 (13) | +3.0 | 0.45 | 0/1 | googleapis/google-cloud-dart#361 | A | [waiting] Waiting for kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | [backlog] None; keep in backlog as an unassigned SDK bug unless prioritized for work. |
| 12 | 19.0 (19) | +7.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | [elsewhere] Act on PR #3763 instead of this issue. |
| 13 | 9.0 (9) | -4.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | [todo] Decide on the automation approach or update the dependency constraints in pubspec.yaml directly. |
| 14 | 21.0 (21) | +7.0 | 0.15 | 0/1 | dart-lang/tools#2719 | B | [not_yours] Wait for a package owner or team member to review this automated PR. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | [elsewhere] Review PR #382 which addresses this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | [waiting] Wait for goderbauer to review the PR. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.58 | 1/1 | googleapis/google-cloud-dart#359 | B | [todo] Implement RetryRunner and RequestOptions wiring in ServiceClient and handle FormatException in ServiceException |
| 18 | 25.0 (25) | +7.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | [elsewhere] Review lower PRs in the stack first, such as #2014. |
| 19 | 20.0 (20) | +1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | [todo] Decide whether to finish this draft PR or close it. |
| 20 | 18.0 (18) | -2.0 | 0.20 | 0/1 | dart-lang/core#1007 | B | [not_yours] Wait for another team member to review or author to resolve CLA check. |
| 21 | 28.0 (28) | +7.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | [not_yours] None; lrhn is already reviewing this security PR and jonasfj needs to address his feedback. |
| 22 | 24.0 (24) | +2.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | [elsewhere] Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | [waiting] Waiting for liamappelbe to review the PR. |
| 24 | 14.0 (14) | -10.0 ⚠️ | 0.38 | 0/1 | googleapis/google-cloud-dart#373 | B | [waiting] Wait for sigurdm to reply on whether this PR can be merged without natebosch's review. |
| 25 | 26.0 (26) | +1.0 | 0.08 | 0/1 | dart-lang/http#579 | B | [waiting] Wait for future planning around the next breaking major release of package:http. |
| 26 | 17.0 (17) | -9.0 ⚠️ | 0.25 | 0/1 | dart-lang/http#1932 | B | [elsewhere] Work on open fix PR #2034 instead. |
| 27 | 33.0 (33) | +6.0 | 0.00 | 0/1 | flutter/devtools#8223 | B | [not_yours] None; this is an issue in flutter/devtools where I was only informational CC'd over two years ago. |
| 28 | 30.0 (30) | +2.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | [backlog] None; awaiting community contributions or leave in backlog. |
| 29 | 32.0 (32) | +3.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | [not_yours] Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | [not_yours] None, as I am not responsible for the http2 package. |
| 31 | 27.0 (27) | -4.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | [not_yours] Wait for davidmorgan to review the PR. |
| 32 | 31.0 (31) | -1.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | [not_yours] None; this is in http2, which is outside my scope, and the author specifically asked mosuem to review. |
| 33 | 35.0 (35) | +2.0 | 0.00 | 0/1 | dart-lang/native#3653 | A | [not_yours] None; dart-lang/native is owned and driven by liamappelbe and mraleph. |
| 34 | 29.0 (29) | -5.0 | 0.05 | 0/1 | dart-lang/http#1972 | B | [elsewhere] Wait for reporter response to questions or act on PR #1974 instead. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | [not_yours] None; this issue was marked not important and is also addressed by PR #2002. |
| 36 | 10.0 (10) | -26.0 ⚠️ | 0.55 | 1/1 | dart-lang/sdk#38148 | B | [respond] Reply to filiph's offer to provide a reproduction or debug info, or unassign this issue if no longer working on it. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#345** (truth #19) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue assigned to me regarding TLS certificate trust and revocation on Android. A commenter recently raised concerns regarding a major intermediate CA key compromise (eMudhra), asking if Dart bypasses Android's certificate revocation and blocklist mechanisms. Because security issues I own with new activity outrank everything else, verifying the status and replying is top priority.
- **Next action:** [respond] Check whether recent SDK changes resolved the eMudhra distrust issue on Android and respond to the security question.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own open PR and a close collaborator (kevmoo) reviewed it 21 hours ago, pointing out a potential bug where CHANGELOG.md gets deleted by subsequent generation. I need to answer his question and resolve the review feedback so my work isn't stalled.
- **Next action:** [respond] Reply to kevmoo's question on internal/librarian/dart/bump.go and address the CHANGELOG.md preservation issue.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.76
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from close collaborator sigurdm in googleapis/google-cloud-dart, a repository I am responsible for. As the default reviewer for this repo, reviewing PRs from collaborators takes high precedence. It has been open for 5 days without human review.
- **Next action:** [review] Review sigurdm's PR adding client attribution and pre-release polish to Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** I am responsible for googleapis/google-cloud-dart, making me the default reviewer for incoming PRs. This PR fixes a bug where retry logic fails over REST because google.rpc.Code was dropped. As it is an unreviewed PR from an external contributor in my repository, it falls in the 0.65-0.8 review range.
- **Next action:** [review] Review this PR fixing RPC error code handling in google_cloud_rpc

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue in googleapis/google-cloud-dart, a repository I am responsible for. A contributor who volunteered to tackle this bug followed my explicit advice to share a preliminary design sketch before implementing it. They are currently waiting for my feedback to proceed with writing the code.
- **Next action:** [respond] Review and reply to Yusufihsangorgel's proposed design sketch for enum number/string support.

### 6. dart-lang/http#2027 → predicted 8, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this architectural issue in a repository you are responsible for (`dart-lang/http`). It represents your own planned work regarding API semantics and a potential 2.0 breaking change. Since it is fresh and not waiting on anyone else, it sits squarely in your own planned work range.
- **Next action:** [todo] Decide on the design for `Client.close` semantics or implement the proposed change

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented just a few hours ago that I have started working on it. As a planned work item in a repository I own that I committed to implementing, it sits squarely in my active todo list. Since it is a newly started feature rather than an urgent bug or security fix, it belongs in the moderate priority range.
- **Next action:** [todo] Work on implementing the server trust evaluation hook in cupertino_http

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue was filed by a close collaborator in a repository I maintain, pointing out concrete bugs and improvements in RPC streaming. kevmoo replied to my question clarifying his perspective while noting it isn't urgent, leaving the next design/implementation decision to me.
- **Next action:** [todo] Decide whether to implement mid-stream error handling and incremental JSON parsing for streaming requests.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned directly to me in `dart:io` regarding HTTP header parsing accepting control characters (like NUL), which touches HTTP security and interoperability. However, there has been no recent activity for nearly two years and no new reports. As an assigned issue with no immediate blocker or recent activity, it represents standard planned work to triage, fix, or reassign.
- **Next action:** [todo] Investigate and fix the invalid character validation in dart:io's HTTP header parser, or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.45
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in googleapis/google-cloud-dart, a repository I am responsible for, filed by a close collaborator (kevmoo). I asked a direct question 16 days ago weighing the tradeoffs between switching to discovery format and adding convenience extensions, and have not yet received a reply. Because the ball is currently in kevmoo's court, no immediate action is needed from me right now.
- **Next action:** [waiting] Waiting for kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a long-standing SDK bug in `dart:io` HttpClient where you were CC'd by collaborator kevmoo and parlough noting you own the library. However, dart-lang/sdk is not one of your directly maintained repositories, you are not assigned, and there has been no direct question or activity in over 20 months. It represents an important crash issue in widely used code, but without pressing new activity it remains backlog work.
- **Next action:** [backlog] None; keep in backlog as an unassigned SDK bug unless prioritized for work.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** I filed this issue and subsequently opened PR #3763 to fix it. Because there is an open PR addressing this problem, the work should happen on the PR rather than the issue itself. This issue is kept in the lower priority range to avoid duplicate effort.
- **Next action:** [elsewhere] Act on PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.55
- **Ground truth:** 
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, filed by my close collaborator sigurdm. I left the last comment 17 days ago noting that I'm considering how to address this systematically, so moving this forward or implementing the checklist is on my plate. As planned work in my repo that has sat idle for a couple of weeks, it sits comfortably in the mid-range.
- **Next action:** [todo] Decide on the automation approach or update the dependency constraints in pubspec.yaml directly.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.15
- **Ground truth:** 
- **Model:** This is an automated dependency update in `dart-lang/tools`, a repository I am not directly responsible for. My only connection is through the `dart-ecosystem-team` review request, which is shared among the team and not directed to me personally. As such, it is low priority and not something I need to actively pick up.
- **Next action:** [not_yours] Wait for a package owner or team member to review this automated PR.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository I maintain, but it is already addressed by an open pull request (#382). Rather than working on the issue itself, I should review the associated PR. As per instructions, issues covered by an active PR are ranked lower in priority.
- **Next action:** [elsewhere] Review PR #382 which addresses this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http, and I requested a review from goderbauer 2 days ago. Since it has only been a couple of days, it is too early to ping them. There is nothing for me to do until feedback is received.
- **Next action:** [waiting] Wait for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue in a repository I am responsible for (googleapis/google-cloud-dart) filed by a close collaborator (kevmoo). I assigned it to myself and scoped out the implementation details with examples. It represents my own planned work to implement.
- **Next action:** [todo] Implement RetryRunner and RequestOptions wiring in ServiceClient and handle FormatException in ServiceException

### 18. dart-lang/http#2031 → predicted 25, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is stacked on top of unmerged PRs (#2014 still requires review), so it cannot be reviewed or merged yet. Additionally, my profile notes that I am not responsible for http2 in dart-lang/http, although mosuem is a collaborator and requested my review personally. Because lower PRs must land first, this remains low priority.
- **Next action:** [elsewhere] Review lower PRs in the stack first, such as #2014.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR adding DNS support in a repository I maintain, converted to draft 45 days ago and inactive since. Nobody is waiting on it, but as an abandoned draft in my own repo, I should eventually either finish it or close it. Under the rubric, stale drafts fall in the 0.15–0.35 range.
- **Next action:** [todo] Decide whether to finish this draft PR or close it.

### 20. dart-lang/core#1007 → predicted 18, priority 0.20
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a PR in dart-lang/core, a repository I am not directly responsible for, requested only via the dart-ecosystem-team. It is not addressed to me personally and there is also an unresolved CLA check. Therefore, it is low priority for me.
- **Next action:** [not_yours] Wait for another team member to review or author to resolve CLA check.

### 21. dart-lang/tools#2544 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This is a security-related PR in dart-lang/tools, which is not a repository I am responsible for. I was not personally requested for review; only my team (dart-ecosystem-team) was requested, and lrhn was explicitly asked and actively conducted the review. Jonasfj needs to address lrhn's comments from two months ago, so no action is needed from me.
- **Next action:** [not_yours] None; lrhn is already reviewing this security PR and jonasfj needs to address his feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not a repository I am responsible for, and was requested via a team review (dart-ecosystem-team). Furthermore, it is stacked on PR #2563 which is still an unreviewed draft, meaning lower PRs need to be addressed first.
- **Next action:** [elsewhere] Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request in dart-lang/native, which I recently opened and requested review from liamappelbe only 2 days ago. Since it is waiting on a reviewer and it has been less than a week, there is nothing for me to do right now.
- **Next action:** [waiting] Waiting for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.38
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in googleapis/google-cloud-dart, which has already received an approval from collaborator sigurdm. I asked sigurdm 4 days ago whether his approval covers the entire PR so we can merge without waiting on natebosch. I am waiting for his response before merging.
- **Next action:** [waiting] Wait for sigurdm to reply on whether this PR can be merged without natebosch's review.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is explicitly marked with the 'next-breaking-release' label. In my last comment, I noted that landing this requires coordinating a semver major release which is currently deferred. Per instructions, PRs waiting for a future breaking release are low priority (around 0.05-0.15).
- **Next action:** [waiting] Wait for future planning around the next breaking major release of package:http.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by open PR #2034 ('fix(cronet): avoid cronet namespace duplication'), which I created 2 days ago. Per guidelines, when an issue has an open PR fixing it, the PR is the primary item to act on, keeping the issue in the 0.15–0.35 range.
- **Next action:** [elsewhere] Work on open fix PR #2034 instead.

### 27. flutter/devtools#8223 → predicted 33, priority 0.00
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, which is not a repository I am responsible for. I was only mentioned as an informational CC over two years ago regarding HTTP profiling, and no action or response was requested from me. Recent comments and triage are being handled by the DevTools team and contributors.
- **Next action:** [not_yours] None; this is an issue in flutter/devtools where I was only informational CC'd over two years ago.

### 28. dart-lang/http#1837 → predicted 30, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old feature request marked as 'contributions-welcome' and P3 where I already clarified that the team will not build it. There has been no new activity or response since my comment, so there is nothing for me to do.
- **Next action:** [backlog] None; awaiting community contributions or leave in backlog.

### 29. dart-lang/http#2033 → predicted 32, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this PR two days ago. There have been no new commits, comments, or changes since my review, so my work here is completely done.
- **Next action:** [not_yours] Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I explicitly note that I am not responsible for http2 in dart-lang/http. This issue is labeled 'package:http2' and has not requested my involvement. Consequently, this falls entirely outside of my scope.
- **Next action:** [not_yours] None, as I am not responsible for the http2 package.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. While filed by my collaborator kevmoo, davidmorgan is explicitly assigned as the individual reviewer alongside a team review request to dart-ecosystem-team. Team review requests in repositories I do not own where a specific reviewer is already named are near 0.
- **Next action:** [not_yours] Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 31, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, the author has directly addressed mosuem for review, so there is nothing for me to do.
- **Next action:** [not_yours] None; this is in http2, which is outside my scope, and the author specifically asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 35, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and actively driven by liamappelbe and mraleph. Although I participated in earlier discussions, no questions or requests have been directed to me, and liamappelbe is currently deciding next steps.
- **Next action:** [not_yours] None; dart-lang/native is owned and driven by liamappelbe and mraleph.

### 34. dart-lang/http#1972 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This issue currently has a 'needs-info' label and is waiting on the reporter to answer clarifying questions from 8 days ago. Additionally, there is an open PR (PR #1974) attempting to fix this issue, meaning any actual work should happen on the PR rather than the issue. Per the instructions, items with needs-info or covered by an open PR are rated near 0.
- **Next action:** [elsewhere] Wait for reporter response to questions or act on PR #1974 instead.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05 and no new activity directed at you has occurred since. Furthermore, an open pull request (PR #2002) is addressing this change.
- **Next action:** [not_yours] None; this issue was marked not important and is also addressed by PR #2002.

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You previously assigned this issue to yourself in dart-lang/sdk and marked it not important in August 2026. However, new activity occurred after the thumbs-down: a contributor (filiph) reported a reliable local reproduction on macOS arm64 and offered to help hunt down the bug. Because you are assigned and there is actionable new input to either follow up on or unassign, it warrants planned attention.
- **Next action:** [respond] Reply to filiph's offer to provide a reproduction or debug info, or unassign this issue if no longer working on it.
