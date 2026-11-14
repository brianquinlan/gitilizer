# Gitilizer eval: v4-gemini-low

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261108-024745

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.713 ± 0.016 |
| spearman | 0.836 ± 0.021 |
| pairwise_acc | 0.857 ± 0.008 |
| ndcg | 0.986 ± 0.004 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.833 ± 0.058 |
| mean_abs_displacement | 3.685 ± 0.179 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.883 ± 0.029 | 0.998 ± 0.001 | 1.000 ± 0.000 | 0.792 ± 0.144 |
| B | 20 | 0.565 ± 0.024 | 0.965 ± 0.016 | 0.667 ± 0.115 | 3.167 ± 0.153 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 3/3 | dart-lang/sdk#48056 | A | Verify if the recent eMudhra distrust fix (#64644) resolves this concern on Android or if action is needed to handle disabled/revoked CA certificates. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG preservation and update the PR as needed. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's PR adding client attribution and pre-release polish to google_cloud_pubsub. |
| 4 | 4.7 (4–5) | +0.7 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR on google_cloud_rpc error handling. |
| 5 | 4.3 (4–5) | -0.7 | 0.71 | 3/3 | googleapis/google-cloud-dart#252 | B | Review and reply to Yusufihsangorgel's proposed design sketch for enum integer parsing. |
| 6 | 7.3 (7–8) | +1.3 | 0.55 | 3/3 | dart-lang/http#2027 | B | Decide on the API design for Client.close and draft a proposal or PR for package:http 2.0. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 3/3 | dart-lang/http#1981 | B | Implement the server trust evaluation hook in cupertino_http as committed. |
| 8 | 10.0 (9–11) | +2.0 | 0.54 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether to implement incremental JSON streaming and mid-stream error handling or file PRs in google-cloud-dart. |
| 9 | 10.7 (10–12) | +1.7 | 0.55 | 3/3 | dart-lang/sdk#59846 | B | Investigate the header parser in dart:io and fix it or unassign myself. |
| 10 | 13.0 (13) | +3.0 | 0.40 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to respond to my question regarding switching to discovery vs adding convenience extensions. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/3 | dart-lang/sdk#31275 | A | None; issue is an old backlog bug in dart-lang/sdk with no recent activity or assigned work for me. |
| 12 | 19.0 (19) | +7.0 | 0.20 | 0/3 | dart-lang/native#3752 | B | Follow up on PR #3763 instead of this issue. |
| 13 | 10.3 (9–11) | -2.7 | 0.54 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide on the release/automation approach and update the dependency constraints in the pubspecs. |
| 14 | 17.3 (17–18) | +3.3 | 0.20 | 0/3 | dart-lang/tools#2719 | B | Wait for another dart-ecosystem-team member to review this automated dependency update. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382 instead of acting on this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review the PR. |
| 17 | 8.3 (8–9) | -8.7 | 0.55 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner integration and RequestOptions wiring in ServiceClient. |
| 18 | 25.7 (25–26) | +7.7 | 0.08 | 0/3 | dart-lang/http#2031 | A | Wait for underlying stacked PRs (including #2014) to be reviewed and merged first. |
| 19 | 20.0 (20) | +1.0 | 0.19 | 3/3 | googleapis/google-cloud-dart#345 | A | Resume work to resolve merge conflicts and bot comments, or close/abandon this draft PR. |
| 20 | 21.0 (21) | +1.0 | 0.15 | 0/3 | dart-lang/core#1007 | B | Waiting on author to sign the Google CLA before review. |
| 21 | 26.3 (24–30) | +5.3 | 0.08 | 0/3 | dart-lang/tools#2544 | B | Waiting on jonasfj to address lrhn's review comments. |
| 22 | 24.3 (24–25) | +2.3 | 0.09 | 0/3 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 14.0 (14) | -10.0 ⚠️ | 0.36 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to reply about whether the non-PubSub parts are good to merge without natebosch. |
| 25 | 29.3 (26–32) | +4.3 | 0.06 | 0/3 | dart-lang/http#579 | B | None; PR is deferred until a future major breaking release. |
| 26 | 17.7 (17–18) | -8.3 | 0.22 | 0/3 | dart-lang/http#1932 | B | Focus on driving the linked PR #2034 to resolution instead of acting directly on this issue. |
| 27 | 28.0 (28) | +1.0 | 0.05 | 0/3 | flutter/devtools#8223 | B | None; this is an informational CC in a repository I do not own. |
| 28 | 30.3 (29–31) | +2.3 | 0.05 | 0/3 | dart-lang/http#1837 | A | None; waiting for community contributions if anyone wants to implement this. |
| 29 | 33.0 (32–34) | +4.0 | 0.00 | 0/3 | dart-lang/http#2033 | A | Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | None; this issue is outside my scope of responsibility. |
| 31 | 27.0 (27) | -4.0 | 0.05 | 0/3 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review the PR. |
| 32 | 32.0 (31–33) | +0.0 | 0.00 | 0/3 | dart-lang/http#2026 | A | Waiting on mosuem to review the PR. |
| 33 | 30.7 (29–34) | -2.3 | 0.03 | 0/3 | dart-lang/native#3653 | A | None; liamappelbe is driving this issue in dart-lang/native. |
| 34 | 33.3 (30–35) | -0.7 | 0.02 | 0/3 | dart-lang/http#1972 | B | Waiting for reporter (@Keetz) to respond to questions and provide reproduction details. |
| 35 | 34.0 (33–35) | -1.0 | 0.00 | 0/3 | dart-lang/http#1841 | B | Follow up on PR #2002 instead of this issue. |
| 36 | 10.3 (7–12) | -25.7 ⚠️ | 0.54 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's offer to provide reproduction details or unassign myself if I am not actively investigating. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue assigned to me regarding certificate trust and revocation verification in Dart's SecurityContext on Android. A user raised a direct security incident concern 3 days ago regarding compromised intermediate CA keys, which directly ties into our handling of platform blocklists and disabled certificates. Security issues that are mine with fresh activity take top priority, regardless of past labels or age.
- **Next action:** Verify if the recent eMudhra distrust fix (#64644) resolves this concern on Android or if action is needed to handle disabled/revoked CA certificates.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR fixing an issue in your Google Cloud Dart release workflow. Your collaborator kevmoo reviewed it and raised an architectural question/potential bug regarding CHANGELOG deletion, which is currently blocking progress. Replying to unblock your own PR is top priority.
- **Next action:** Reply to kevmoo's review comment on CHANGELOG preservation and update the PR as needed.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.76
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open pull request in googleapis/google-cloud-dart, a repository I am responsible for. It was authored by sigurdm (a close collaborator) 5 days ago and has not received any human reviews yet (bots do not count). As the default reviewer for this repository, reviewing collaborator PRs is on me.
- **Next action:** Review sigurdm's PR adding client attribution and pre-release polish to google_cloud_pubsub.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for where I serve as the default reviewer. It fixes a bug where ABORTED errors are not retried over REST. Although the author is a first-time contributor rather than a close collaborator, PR reviews waiting on me in my repositories belong in the 0.65-0.8 range.
- **Next action:** Review this PR on google_cloud_rpc error handling.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I opened in my own repository (google-cloud-dart) where an outside contributor has proposed an API design sketch at my request. The contributor is waiting on my confirmation before implementing the template changes and submitting code, making me the blocker to their forward progress.
- **Next action:** Review and reply to Yusufihsangorgel's proposed design sketch for enum integer parsing.

### 6. dart-lang/http#2027 → predicted 7, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in dart-lang/http, a repository you are responsible for, detailing planned architecture work around `Client.close`. It represents your own planned work and thinking rather than an urgent bug or blocker. It sits in the 0.5–0.65 range for recently planned tasks that are still reasonably fresh.
- **Next action:** Decide on the API design for Client.close and draft a proposal or PR for package:http 2.0.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue in dart-lang/http to yourself and explicitly commented five hours ago that you have started working on it. This represents your active planned work in a repository you maintain. Since you committed to working on it today, it should stay prominent on your active task list.
- **Next action:** Implement the server trust evaluation hook in cupertino_http as committed.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue was filed by my close collaborator kevmoo in google-cloud-dart, a repository I am responsible for. He replied to my question clarifying his thoughts and noted it is not urgent, but there is a clear next step for me as a maintainer to address the bug/gap in generated RPC streaming error handling. It falls in the moderate priority range for planned/collaborator backlog work in my repo.
- **Next action:** Decide whether to implement incremental JSON streaming and mid-stream error handling or file PRs in google-cloud-dart.

### 9. dart-lang/sdk#59846 → predicted 10, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This issue is assigned to me in dart-lang/sdk regarding HTTP parsing in dart:io, where accepting invalid characters (like NUL) can lead to request smuggling or proxy desync vulnerabilities. Although it has been inactive for nearly two years without recent updates, assigned issues in core areas should be investigated and fixed or unassigned. It sits in the planned/assigned work range.
- **Next action:** Investigate the header parser in dart:io and fix it or unassign myself.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in a repository I maintain, filed by a close collaborator (kevmoo). I left the last comment 16 days ago asking whether switching or adding convenience extensions is preferable, so it is currently waiting on his response. Because it's an open architectural discussion with a collaborator in my repo, it stays moderately visible but not immediately actionable.
- **Next action:** Wait for kevmoo to respond to my question regarding switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was CC'd on this issue in `dart-lang/sdk` by parlough and my collaborator kevmoo over two years ago regarding `dart:io` ownership. While it touches code relevant to HTTP and was brought up by a close collaborator, there is no direct action requested or ongoing conversation, and the issue has been dormant for over a year and a half. As an old but notable issue where I was only CC'd, it sits in the lower-middle priority range.
- **Next action:** None; issue is an old backlog bug in dart-lang/sdk with no recent activity or assigned work for me.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** You authored and are assigned to this issue, but you have already opened PR #3763 to fix it. Per the guidelines, when an open PR covers an issue, the PR is the primary item to act on and the issue should be scored well below it (in the 0.15–0.35 range). There is nothing left to do on this issue thread directly.
- **Next action:** Follow up on PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.55
- **Ground truth:** 
- **Model:** This is an open maintenance task filed by a close collaborator in a repository I am responsible for. I was the last to comment, noting that I need to decide how to handle this requirement (manually or via automation). Because it represents planned release-coordination work sitting on my plate, it belongs in the moderate priority range.
- **Next action:** Decide on the release/automation approach and update the dependency constraints in the pubspecs.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated dependency update in dart-lang/tools, which is not one of my primary assigned repositories. The review request is directed broadly to the dart-ecosystem-team rather than me personally. As per the guidance, team review requests in repos I do not directly manage are low priority (0.15-0.25).
- **Next action:** Wait for another dart-ecosystem-team member to review this automated dependency update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in googleapis/google-cloud-dart describes a bug in error code mapping, but the author has already submitted PR #382 to fix it. Per guidance, when an issue has an open PR addressing it, the PR is the actual item to act on. The issue itself is not directly actionable and should be ranked well below the PR in the 0.15–0.35 range.
- **Next action:** Review PR #382 instead of acting on this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR fixing a bug in dart-lang/http (package:cronet_http). I requested a review from goderbauer only two days ago, so there is nothing for me to do until they reply or roughly a week passes without feedback.
- **Next action:** Wait for goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a primary repository (google-cloud-dart) filed by a close collaborator (kevmoo). I recently scoped the work, researched retry implementations across other SDKs, and actively committed to working on it. It represents planned work currently waiting on my implementation.
- **Next action:** Implement the RetryRunner integration and RequestOptions wiring in ServiceClient.

### 18. dart-lang/http#2031 → predicted 26, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although I am specifically requested for review by collaborator mosuem, this PR is part of package:http2 (which I explicitly noted I am not responsible for) and is stacked on several other PRs including #2014 which is still unreviewed. Stacked release prep PRs should wait until the underlying changes are reviewed and landed.
- **Next action:** Wait for underlying stacked PRs (including #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.18
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR introducing the DNS package in a repository I manage, but it has been stale for 45 days and has merge conflicts. As an abandoned or backlogged draft of my own, it falls in the 0.15–0.35 range until I decide to resume it or close it out.
- **Next action:** Resume work to resolve merge conflicts and bot comments, or close/abandon this draft PR.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my primary responsible repositories, and the review request is to the team rather than me personally. Additionally, the author has not signed the CLA, making it blocked on contributor action before anyone should review it.
- **Next action:** Waiting on author to sign the Google CLA before review.

### 21. dart-lang/tools#2544 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** Although this addresses a security vulnerability (UNC path injection), it is in dart-lang/tools, a repository I am not responsible for. I was only requested via the generic dart-ecosystem-team, and another reviewer (lrhn) is already actively reviewing it and left detailed comments that the author (jonasfj) needs to address. According to the guidelines, a security PR in a repo I do not own where someone else is actively reviewing scores like an ordinary team review request waiting on the author.
- **Next action:** Waiting on jonasfj to address lrhn's review comments.

### 22. dart-lang/tools#2710 → predicted 25, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on draft PR #2563, which must be reviewed and resolved before this one can move forward. Additionally, it is in dart-lang/tools where you are not specifically requested (only requested via dart-ecosystem-team). Once the base PR lands or is ready, this may warrant a team review.
- **Next action:** Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** I recently opened this PR and requested a review from liamappelbe 2 days ago. It has only been a couple of days, so there is nothing for me to do until about a week passes without a response.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.35
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repository I maintain, approved by sigurdm for the PubSub changes. 4 days ago I asked sigurdm if he reviewed the non-PubSub parts so we can merge without waiting on natebosch. I am currently waiting on his answer before merging or pursuing natebosch's review.
- **Next action:** Wait for sigurdm to reply about whether the non-PubSub parts are good to merge without natebosch.

### 25. dart-lang/http#579 → predicted 30, priority 0.05
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This pull request introduces breaking API changes and carries the 'next-breaking-release' label. I already commented that landing this must be coordinated with a semver-major release and that I don't have the bandwidth to pursue it right now. Per the guidelines, PRs explicitly waiting for a future breaking release are low priority (around 0.05).
- **Next action:** None; PR is deferred until a future major breaking release.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is tracked by an active open PR (#2034) authored by me to fix the namespace duplication problem. Per the instructions, when an issue has an open PR addressing it, action should be taken on the PR rather than the issue, keeping the issue in the low range (0.15–0.35).
- **Next action:** Focus on driving the linked PR #2034 to resolution instead of acting directly on this issue.

### 27. flutter/devtools#8223 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** I was only mentioned as an informational CC over two years ago regarding how HTTP profiling might relate to WebSockets. The issue is in flutter/devtools, which is not one of my maintained repositories, and no action or response has been requested of me.
- **Next action:** None; this is an informational CC in a repository I do not own.

### 28. dart-lang/http#1837 → predicted 29, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old enhancement request marked as 'contributions-welcome' and 'P3' in dart-lang/http. You already responded a year ago clarifying that the team will not be implementing this directly. There is no pending question or action required from you.
- **Next action:** None; waiting for community contributions if anyone wants to implement this.

### 29. dart-lang/http#2033 → predicted 32, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this PR two days ago, and there have been no new commits or comments since. As stated in the guidelines, once I have approved a PR and nothing has happened since, it is waiting on someone else and done as far as I am concerned.
- **Next action:** Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is explicitly labeled 'package:http2', which I noted I am not responsible for in dart-lang/http. Additionally, I am not assigned, mentioned, or asked to do anything here. It can be safely ignored.
- **Next action:** None; this issue is outside my scope of responsibility.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not directly responsible for. While filed by my collaborator kevmoo, davidmorgan was explicitly requested as an individual reviewer alongside the dart-ecosystem-team. A team review request in a repository I don't own where another reviewer is explicitly named is near zero priority for me.
- **Next action:** Waiting on davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 31, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR touches package:http2, which is explicitly outside my area of responsibility in dart-lang/http. Furthermore, the author has directly asked mosuem for a review, so there is nothing for me to do.
- **Next action:** Waiting on mosuem to review the PR.

### 33. dart-lang/native#3653 → predicted 34, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, which is not a repository I am responsible for. It is assigned to and actively being discussed/handled by liamappelbe and mraleph. Nothing is requested of me, and there is no action needed on my part.
- **Next action:** None; liamappelbe is driving this issue in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You asked clarifying questions 8 days ago and labeled the issue 'needs-info', with no response yet from the author. Furthermore, there is an open PR (#1974) attempting to fix this issue, meaning any review action would belong on the PR rather than this issue. Per guidelines, issues waiting on information with no reply rate at or near 0.0.
- **Next action:** Waiting for reporter (@Keetz) to respond to questions and provide reproduction details.

### 35. dart-lang/http#1841 → predicted 33, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05, and no new activity directed at you has occurred on this thread since. Furthermore, an open pull request (PR #2002) is actively addressing this issue, so any necessary action belongs on that PR. Per guidance, issues marked with thumbs-down with no new direct follow-up receive a 0.0 priority.
- **Next action:** Follow up on PR #2002 instead of this issue.

### 36. dart-lang/sdk#38148 → predicted 12, priority 0.52
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am assigned to this P2 issue in the Dart SDK. Although I marked it thumbs down previously, a new comment from filiph arrived since then offering a local reproduction, requiring a decision or response on whether to investigate or unassign.
- **Next action:** Reply to filiph's offer to provide reproduction details or unassign myself if I am not actively investigating.
