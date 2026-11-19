# Gitilizer eval: next-step-last-gemini-low-t2

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-144501

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.682 ± 0.000 |
| spearman | 0.810 ± 0.000 |
| pairwise_acc | 0.841 ± 0.000 |
| ndcg | 0.983 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.944 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.495 ± 0.000 | 0.949 ± 0.000 | 0.600 ± 0.000 | 3.500 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | [respond] Verify if the eMudhra intermediate CA compromise impacts Dart on Android and reply to the security inquiry. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | [respond] Respond to kevmoo's review comment regarding CHANGELOG handling in librarian generate. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | [review] Review sigurdm's PR adding client attribution headers and release polish for PubSub |
| 4 | 4.0 (4) | +0.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#382 | A | [review] Review this PR for handling google.rpc.Code in ServiceException. |
| 5 | 5.0 (5) | +0.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#252 | B | [respond] Review and reply to Yusufihsangorgel's proposed enum design sketch. |
| 6 | 10.0 (10) | +4.0 | 0.52 | 1/1 | dart-lang/http#2027 | B | [todo] Decide on the design for `Client.close` semantics and implement or propose the change |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | [todo] Work on implementing the server trust evaluation hook in cupertino_http as promised. |
| 8 | 8.0 (8) | +0.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | [todo] Plan or implement the fix for mid-stream error handling and investigate incremental JSON streaming in google_cloud_rpc. |
| 9 | 12.0 (12) | +3.0 | 0.50 | 1/1 | dart-lang/sdk#59846 | B | [todo] Investigate the RFC 9110 character validation bug in dart:io HTTP header parsing and decide whether to fix or reassign. |
| 10 | 13.0 (13) | +3.0 | 0.45 | 0/1 | googleapis/google-cloud-dart#361 | A | [waiting] Waiting for kevmoo to reply on whether to switch to discovery or add convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/1 | dart-lang/sdk#31275 | A | [backlog] None; keep in backlog as an unassigned dart:io issue unless prioritizing a fix for HttpClient unsolicited responses. |
| 12 | 19.0 (19) | +7.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | [elsewhere] Follow PR dart-lang/native#3763 which fixes this issue. |
| 13 | 11.0 (11) | -2.0 | 0.52 | 1/1 | googleapis/google-cloud-dart#366 | B | [todo] Decide on the automation approach or update the dependency constraints in pubspec.yaml for google_cloud_storage and google_cloud_pubsub. |
| 14 | 26.0 (26) | +12.0 ⚠️ | 0.05 | 0/1 | dart-lang/tools#2719 | B | [not_yours] None; this is a team review request in a repository I do not manage. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | [elsewhere] Review PR #382 instead of acting on this issue. |
| 16 | 21.0 (21) | +5.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | [waiting] Wait for goderbauer to review the pull request. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.58 | 1/1 | googleapis/google-cloud-dart#359 | B | [todo] Implement the RetryRunner and RequestOptions wiring in ServiceClient and handle HTML error responses in ServiceException. |
| 18 | 24.0 (24) | +6.0 | 0.08 | 0/1 | dart-lang/http#2031 | A | [elsewhere] Review lower stacked PRs like #2014 first. |
| 19 | 20.0 (20) | +1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | [todo] Resume work on this draft PR to add initial DNS support or close it if no longer needed. |
| 20 | 17.0 (17) | -3.0 | 0.20 | 0/1 | dart-lang/core#1007 | B | [not_yours] Wait for dart-ecosystem-team or repository maintainers to review, or author to sign CLA |
| 21 | 29.0 (29) | +8.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | [not_yours] Waiting on jonasfj to address review feedback from lrhn. |
| 22 | 23.0 (23) | +1.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | [elsewhere] Wait for base PR dart-lang/tools#2563 to be reviewed and merged first. |
| 23 | 22.0 (22) | -1.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | [waiting] Wait for liamappelbe to review the PR. |
| 24 | 14.0 (14) | -10.0 ⚠️ | 0.40 | 0/1 | googleapis/google-cloud-dart#373 | B | [waiting] Wait for sigurdm to reply on whether this PR can be merged without natebosch's review. |
| 25 | 25.0 (25) | +0.0 | 0.08 | 0/1 | dart-lang/http#579 | B | [waiting] Leave PR on hold until a major semver breaking release cycle is planned for package:http. |
| 26 | 18.0 (18) | -8.0 | 0.20 | 0/1 | dart-lang/http#1932 | B | [elsewhere] Act on PR #2034 instead of this issue. |
| 27 | 28.0 (28) | +1.0 | 0.05 | 0/1 | flutter/devtools#8223 | B | [not_yours] None; this is an issue in flutter/devtools where I was only informational CC'd over two years ago. |
| 28 | 31.0 (31) | +3.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | [backlog] None; waiting for community contribution if anyone picks it up. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | [not_yours] None; PR is already approved by me and waiting on mosuem to merge. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | [not_yours] None, as I am explicitly not responsible for package:http2. |
| 31 | 27.0 (27) | -4.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | [not_yours] Waiting on davidmorgan to review the PR. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | [not_yours] None; waiting for @mosuem to review this http2 PR. |
| 33 | 35.0 (35) | +2.0 | 0.00 | 0/1 | dart-lang/native#3653 | A | [not_yours] None; liamappelbe is driving this issue in dart-lang/native. |
| 34 | 30.0 (30) | -4.0 | 0.05 | 0/1 | dart-lang/http#1972 | B | [elsewhere] Wait for Keetz to provide reproduction details or track PR #1974 instead. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | [not_yours] Check PR #2002 instead, which implements this feature. |
| 36 | 9.0 (9) | -27.0 ⚠️ | 0.55 | 1/1 | dart-lang/sdk#38148 | B | [respond] Reply to filiph's offer to help reproduce the intermittent Directory.deleteSync failure or investigate the issue. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2031** (truth #18) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an issue I opened and am assigned to regarding certificate trust on Android. A user raised an urgent security question 3 days ago tied to a real-world compromised intermediate CA incident (eMudhra keys), directly questioning whether Dart on Android is vulnerable to trusting revoked or blocked CAs. Security issues and inquiries on security behavior I own take absolute top priority.
- **Next action:** [respond] Verify if the eMudhra intermediate CA compromise impacts Dart on Android and reply to the security inquiry.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR fixing an issue in our tooling (linked to googleapis/google-cloud-dart#358). My close collaborator kevmoo reviewed it and left an inline question pointing out a potential edge case with CHANGELOG deletion, which I need to answer to keep my own work moving forward. Addressing unanswered review feedback on my own PRs is high leverage and keeps the PR from stalling.
- **Next action:** [respond] Respond to kevmoo's review comment regarding CHANGELOG handling in librarian generate.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR opened 5 days ago by a close collaborator (sigurdm) in googleapis/google-cloud-dart, a repository I am responsible for. Because I am the default reviewer in my repositories and bot reviews do not count, reviewing this PR is on me. PR reviews for collaborators in owned repos sit squarely in the 0.65–0.8 range.
- **Next action:** [review] Review sigurdm's PR adding client attribution headers and release polish for PubSub

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from a contributor in googleapis/google-cloud-dart, a repository I am responsible for. As the default reviewer, it is on me to review incoming community PRs. Since it is not from a close collaborator and is not a security issue, it lands in the normal PR review range.
- **Next action:** [review] Review this PR for handling google.rpc.Code in ServiceException.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I authored in a repository I own (google-cloud-dart). A contributor asked for feedback on their design proposal for enum representation 4 days ago after I explicitly asked them to share a design before coding. Moving them forward is on me.
- **Next action:** [respond] Review and reply to Yusufihsangorgel's proposed enum design sketch.

### 6. dart-lang/http#2027 → predicted 10, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this design issue yourself in a repository you are responsible for (dart-lang/http). It represents planned work and architectural thinking around breaking changes for package:http. Because it is roughly 9 days old and nobody else is waiting on a reply, it sits firmly in the planned work / todo range.
- **Next action:** [todo] Decide on the design for `Client.close` semantics and implement or propose the change

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I recently assigned this issue to myself and explicitly commented 5 hours ago that I've started working on it. This represents my own active, planned work in a repository I maintain. While it is not an active security vulnerability or blocking anyone waiting on an immediate reply, it is a fresh commitment on my plate.
- **Next action:** [todo] Work on implementing the server trust evaluation hook in cupertino_http as promised.

### 8. googleapis/google-cloud-dart#360 → predicted 8, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in googleapis/google-cloud-dart, a repository I am responsible for, filed by a close collaborator (kevmoo). Kevmoo answered my question over two weeks ago, noting it is not urgent but pointing out real bugs (notably mid-stream SSE error payloads being silently swallowed). Since the next step is on me to triage or address in code I own, it sits in the moderate priority band.
- **Next action:** [todo] Plan or implement the fix for mid-stream error handling and investigate incremental JSON streaming in google_cloud_rpc.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue in dart-lang/sdk regarding HTTP header parsing in dart:io. While HTTP request smuggling or parsing quirks can border on security vulnerabilities, this issue has been dormant for nearly two years without reports of an active exploit. As an assigned issue in your domain, you should plan to fix it or unassign yourself.
- **Next action:** [todo] Investigate the RFC 9110 character validation bug in dart:io HTTP header parsing and decide whether to fix or reassign.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.45
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in a repository I maintain, opened by a close collaborator (kevmoo). I replied with a question regarding the API trade-offs of switching Compute to discovery vs adding convenience extensions, and have not yet received an answer. It remains visible and moderately prioritized since it is in my repo and involves an active collaborator, but it is currently waiting on kevmoo.
- **Next action:** [waiting] Waiting for kevmoo to reply on whether to switch to discovery or add convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an issue in `dart-lang/sdk` regarding `dart:io`'s `HttpClient`, where I was CC'd over two years ago by parlough and collaborator kevmoo. Although I own `dart:io` networking libraries and this causes uncatchable crashes, it is not an active security issue, no one is directly waiting on me right now, and the thread has been dormant for over a year.
- **Next action:** [backlog] None; keep in backlog as an unassigned dart:io issue unless prioritizing a fix for HttpClient unsolicited responses.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** You authored and are assigned to this issue, but you have already opened PR #3763 to resolve it. Per instructions, when an open PR covers an issue, the action should be taken on the PR rather than the issue itself, ranking the issue low (0.15-0.35).
- **Next action:** [elsewhere] Follow PR dart-lang/native#3763 which fixes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.52
- **Ground truth:** 
- **Model:** This issue was filed by my collaborator sigurdm in a repository I am responsible for, outlining a concrete follow-up task. I last commented that I was thinking through a broader fix, making it part of my planned work to resolve or implement. Because it has sat for over two weeks without immediate blocking pressure, it sits in the moderate planned work range.
- **Next action:** [todo] Decide on the automation approach or update the dependency constraints in pubspec.yaml for google_cloud_storage and google_cloud_pubsub.

### 14. dart-lang/tools#2719 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** This is an automated dependency update in dart-lang/tools, which is not one of my primary repositories. The review request is directed to the broad dart-ecosystem-team rather than me personally. Because it is outside my core scope and not personally assigned, it requires no action from me.
- **Next action:** [not_yours] None; this is a team review request in a repository I do not manage.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository I maintain, but it has an open PR (#382) submitted by the author that fixes it. Per the instructions, when an issue has an open PR, work happens on the PR rather than the issue itself, so the issue ranks in the low range.
- **Next action:** [elsewhere] Review PR #382 instead of acting on this issue.

### 16. dart-lang/http#2034 → predicted 21, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http fixing a build bug in cronet_http. I requested a review from goderbauer only 2 days ago, so it is waiting on them and has not been silent long enough to warrant a ping.
- **Next action:** [waiting] Wait for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is in a repository I own (googleapis/google-cloud-dart) and was filed by a close collaborator (kevmoo). I self-assigned it and have done initial design research, so moving the implementation forward is my planned work. Nobody is currently waiting on a reply from me, placing it comfortably in the planned work / todo range.
- **Next action:** [todo] Implement the RetryRunner and RequestOptions wiring in ServiceClient and handle HTML error responses in ServiceException.

### 18. dart-lang/http#2031 → predicted 24, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Even though I was explicitly requested for review by collaborator mosuem, this PR is part of a stack where lower PRs (such as #2014) are still unreviewed. Furthermore, this is in package:http2 which is noted as outside my area of responsibility in dart-lang/http.
- **Next action:** [elsewhere] Review lower stacked PRs like #2014 first.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR introducing the google_cloud_dns_v1 package in a repository I maintain. It has been dormant for 45 days with merge conflicts and only automated bot review comments. It falls into the category of my own drafts to finish or abandon.
- **Next action:** [todo] Resume work on this draft PR to add initial DNS support or close it if no longer needed.

### 20. dart-lang/core#1007 → predicted 17, priority 0.20
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a PR in dart-lang/core, which is not one of my primary repositories of responsibility. Review was requested only via a team handle (dart-ecosystem-team) rather than to me personally, and the author also needs to sign the CLA. Thus, it does not require my personal attention right now.
- **Next action:** [not_yours] Wait for dart-ecosystem-team or repository maintainers to review, or author to sign CLA

### 21. dart-lang/tools#2544 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This PR in dart-lang/tools is not in a repository I maintain, and I am only included via a team review request (dart-ecosystem-team). Furthermore, lrhn is actively reviewing it and left detailed comments that author jonasfj has not yet addressed. There is no action required from me.
- **Next action:** [not_yours] Waiting on jonasfj to address review feedback from lrhn.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on draft PR #2563, which needs review and landing first. Furthermore, it is in dart-lang/tools (not one of my primary repos) with only a team review request to dart-ecosystem-team. It should remain at low priority until the lower PR in the stack is addressed.
- **Next action:** [elsewhere] Wait for base PR dart-lang/tools#2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 22, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request in dart-lang/native, which I opened 2 days ago and requested a review from liamappelbe. Since only two days have passed, there is no need to ping yet; it is waiting on the reviewer.
- **Next action:** [waiting] Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR in googleapis/google-cloud-dart, which has already received approval from collaborator sigurdm. I asked sigurdm 4 days ago whether he vetted the non-PubSub parts so we can merge without waiting on natebosch. Since I am waiting on his answer before merging, it is currently in waiting state.
- **Next action:** [waiting] Wait for sigurdm to reply on whether this PR can be merged without natebosch's review.

### 25. dart-lang/http#579 → predicted 25, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces a breaking API change and is explicitly labeled 'next-breaking-release', which I noted over two years ago is not something I have the bandwidth to coordinate outside a major semver release. The PR has been dormant for over a year with only an outside user asking for a workaround. According to the guidelines, PRs waiting for a future breaking release are low priority (around 0.05-0.15) with nothing immediate to act on.
- **Next action:** [waiting] Leave PR on hold until a major semver breaking release cycle is planned for package:http.

### 26. dart-lang/http#1932 → predicted 18, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by open PR #2034 ('fix(cronet): avoid cronet namespace duplication') which was authored by me and updated recently. Per the guidelines, issues with an open fixing PR should be ranked well below the PR and kept in the 0.15-0.35 range. The concrete next action lies on the PR itself rather than this issue.
- **Next action:** [elsewhere] Act on PR #2034 instead of this issue.

### 27. flutter/devtools#8223 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, a repository I am not responsible for. I was only mentioned as an informational CC over two years ago regarding HTTP profiling, and nothing has been asked of me since. The feature request is being tracked and handled by the DevTools team.
- **Next action:** [not_yours] None; this is an issue in flutter/devtools where I was only informational CC'd over two years ago.

### 28. dart-lang/http#1837 → predicted 31, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old P3 feature request labeled 'contributions-welcome' that you already responded to a year ago, stating the team will not take it on. There has been no activity since and nothing is waiting on you.
- **Next action:** [backlog] None; waiting for community contribution if anyone picks it up.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I reviewed and approved this pull request two days ago. No new commits or comments have been added since my approval. There is nothing further for me to do.
- **Next action:** [not_yours] None; PR is already approved by me and waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is filed against `package:http2` in `dart-lang/http`. My notes specifically state that I am not responsible for http2. Because it falls outside my scope and nobody has asked me to do anything, it requires zero attention from me.
- **Next action:** [not_yours] None, as I am explicitly not responsible for package:http2.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not directly responsible for. It was requested of my team, but an individual reviewer (davidmorgan) was specifically requested as well. Therefore, it is not on my plate to review.
- **Next action:** [not_yours] Waiting on davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This pull request is in the package:http2 area of dart-lang/http, which I explicitly noted I am not responsible for. Additionally, the author has explicitly pinged mosuem for review, so it is being handled by another maintainer.
- **Next action:** [not_yours] None; waiting for @mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 35, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, which is not a repository I am responsible for. It is assigned to and actively driven by liamappelbe, who concluded the investigation over a month ago. I was only involved as an informational commenter and have no pending questions or action items.
- **Next action:** [not_yours] None; liamappelbe is driving this issue in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** This issue is labeled 'needs-info' after I asked the reporter for clarification and received no response. Furthermore, there is an open PR (#1974) addressing this issue, which makes that PR the primary item to act on rather than this issue. As such, priority is near zero until the requested info is provided.
- **Next action:** [elsewhere] Wait for Keetz to provide reproduction details or track PR #1974 instead.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** I marked this item with a thumbs-down on 2026-10-05, and no new direct activity or questions have been directed at me on this issue since then. Furthermore, an open pull request (#2002) has already been created to address this issue, making the PR the appropriate place to act. Consequently, this issue has no pending action and receives zero priority.
- **Next action:** [not_yours] Check PR #2002 instead, which implements this feature.

### 36. dart-lang/sdk#38148 → predicted 9, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although I previously marked this issue with a thumbs-down, a community member recently commented with a reliable local reproduction on macOS ARM64 and offered to help hunt down the bug. Since I am assigned to this P2 issue in dart:io, I should respond to their offer and follow up to investigate or unassign myself.
- **Next action:** [respond] Reply to filiph's offer to help reproduce the intermittent Directory.deleteSync failure or investigate the issue.
