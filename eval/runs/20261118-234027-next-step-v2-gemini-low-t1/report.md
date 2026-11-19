# Gitilizer eval: next-step-v2-gemini-low-t1

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/work/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-234027

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.705 ± 0.000 |
| spearman | 0.810 ± 0.000 |
| pairwise_acc | 0.852 ± 0.000 |
| ndcg | 0.979 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.667 ± 0.000 |

## Next steps (mean ± sd across trials)

Against the next step the eval set records for 36 items (PRD RANK-24). "Same side" counts a next step on the other side of "on me" as wrong, and any other as right.

| metric | value |
|---|---|
| exact | 0.833 ± 0.000 |
| same side | 0.917 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.526 ± 0.000 | 0.918 ± 0.000 | 0.600 ± 0.000 | 3.400 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | next step (expected) | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | todo | dart-lang/sdk#48056 | A | Check the security implications of Android revocation and blocklists following the eMudhra intermediate CA compromise, verify if related issue #64644 addresses it, and reply. |
| 2 | 2.0 (2) | +0.0 | 0.85 | respond | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG preservation and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.75 | review | googleapis/google-cloud-dart#376 | A | Review Sigurd's PR adding client attribution headers and pre-release polish to Pub/Sub. |
| 4 | 4.0 (4) | +0.0 | 0.68 | review | googleapis/google-cloud-dart#382 | A | Review this pull request fixing RPC status code handling for REST errors. |
| 5 | 5.0 (5) | +0.0 | 0.68 | respond | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel with feedback on their proposed design sketch for enum handling. |
| 6 | 9.0 (9) | +3.0 | 0.55 | todo | dart-lang/http#2027 | B | Decide on API design changes for `Client.close` and prepare a proposal or PR for package:http 2.0. |
| 7 | 7.0 (7) | +0.0 | 0.60 | todo | dart-lang/http#1981 | B | Implement the server trust evaluation hook in cupertino_http as promised. |
| 8 | 11.0 (11) | +3.0 | 0.52 | todo | googleapis/google-cloud-dart#360 | A | Decide whether to implement mid-stream error detection and incremental JSON decoding for google_cloud_rpc streaming requests. |
| 9 | 10.0 (10) | +1.0 | 0.55 | todo | dart-lang/sdk#59846 | B | Investigate HTTP header parsing in dart:io and either implement RFC 9110 character validation or reassign. |
| 10 | 13.0 (13) | +3.0 | 0.45 | waiting | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to respond regarding switching to discovery vs adding convenience extensions. |
| 11 | 14.0 (14) | +3.0 | 0.45 | backlog (not_yours) ⚠️ | dart-lang/sdk#31275 | A | Investigate taking over the abandoned fix for uncatchable HttpException in dart:io HttpClient. |
| 12 | 19.0 (19) | +7.0 | 0.20 | elsewhere | dart-lang/native#3752 | B | Focus on open PR dart-lang/native#3763 which implements the fix for this issue. |
| 13 | 12.0 (12) | -1.0 | 0.52 | todo | googleapis/google-cloud-dart#366 | B | Decide on a fix for dependency constraints across packages or update the pubspec versions directly. |
| 14 | 17.0 (17) | +3.0 | 0.20 | not_yours | dart-lang/tools#2719 | B | None; this is a team review request in a repository I do not maintain. |
| 15 | 16.0 (16) | +1.0 | 0.25 | elsewhere | googleapis/google-cloud-dart#381 | A | Review PR #382, which provides the fix for this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | waiting | dart-lang/http#2034 | B | Waiting on goderbauer to review the PR. |
| 17 | 8.0 (8) | -9.0 ⚠️ | 0.58 | todo (elsewhere) ⚠️ | googleapis/google-cloud-dart#359 | B | Implement RetryRunner wiring and RequestOptions in ServiceClient for google_cloud_rpc |
| 18 | 25.0 (25) | +7.0 | 0.10 | elsewhere | dart-lang/http#2031 | A | Review unreviewed PR in the stack first (#2014). |
| 19 | 20.0 (20) | +1.0 | 0.20 | todo | googleapis/google-cloud-dart#345 | A | Resume work on this draft PR to finish adding DNS support or close it. |
| 20 | 21.0 (21) | +1.0 | 0.15 | not_yours | dart-lang/core#1007 | B | None; this is a team review request in a repository I do not manage and the CLA is not yet signed. |
| 21 | 29.0 (29) | +8.0 | 0.05 | not_yours | dart-lang/tools#2544 | B | Wait for jonasfj to address lrhn's review feedback. |
| 22 | 24.0 (24) | +2.0 | 0.10 | elsewhere (not_yours) ⚠️ | dart-lang/tools#2710 | B | Wait for base PR dart-lang/tools#2563 to be reviewed and merged first. |
| 23 | 23.0 (23) | +0.0 | 0.10 | waiting | dart-lang/native#3763 | A | Waiting on review from liamappelbe. |
| 24 | 15.0 (15) | -9.0 ⚠️ | 0.40 | waiting | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to respond to my question about whether the non-PubSub parts look good to merge. |
| 25 | 26.0 (26) | +1.0 | 0.08 | backlog | dart-lang/http#579 | B | Keep in the backlog for consideration during the next major breaking release of package:http. |
| 26 | 18.0 (18) | -8.0 | 0.20 | elsewhere | dart-lang/http#1932 | B | Focus on PR #2034 which implements the fix for this issue. |
| 27 | 28.0 (28) | +1.0 | 0.05 | not_yours | flutter/devtools#8223 | B | None, as this is an issue in flutter/devtools where I was only CC'd over two years ago. |
| 28 | 31.0 (31) | +3.0 | 0.05 | backlog | dart-lang/http#1837 | A | Leave in backlog for community contributions or triage during grooming. |
| 29 | 33.0 (33) | +4.0 | 0.00 | not_yours | dart-lang/http#2033 | A | Waiting on @mosuem to merge the PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | not_yours | dart-lang/http#1365 | A | None, as this issue concerns package:http2 which is outside my scope of responsibility. |
| 31 | 27.0 (27) | -4.0 | 0.05 | not_yours | dart-lang/tools#2715 | B | None; davidmorgan is directly assigned to review this PR in dart-lang/tools. |
| 32 | 32.0 (32) | +0.0 | 0.00 | not_yours | dart-lang/http#2026 | A | None; this is in http2, which is outside my scope, and the author specifically asked mosuem to review. |
| 33 | 35.0 (35) | +2.0 | 0.00 | not_yours | dart-lang/native#3653 | A | None; this issue in dart-lang/native is assigned to and being handled by liamappelbe and mraleph. |
| 34 | 30.0 (30) | -4.0 | 0.05 | elsewhere (waiting) ⚠️ | dart-lang/http#1972 | B | Wait for response or track PR #1974 instead of this issue. |
| 35 | 34.0 (34) | -1.0 | 0.00 | elsewhere (not_yours) ⚠️ | dart-lang/http#1841 | B | Act on PR #2002 instead, which addresses this issue. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.68 | respond (not_yours) ⚠️ | dart-lang/sdk#38148 | B | Reply to filiph offering guidance on how to provide a reproduction or debug the Directory.deleteSync failure. |

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
- **Model:** This is an issue I authored and am assigned to regarding certificate trust and verification on Android. A commenter just raised a severe security concern regarding compromised intermediate CAs and Dart's failure to respect Android revocation blocklists. Under the security policy, security issues assigned to me with fresh activity outrank everything else.
- **Next action:** Check the security implications of Android revocation and blocklists following the eMudhra intermediate CA compromise, verify if related issue #64644 addresses it, and reply.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and close collaborator kevmoo left a substantive review question/feedback 21 hours ago that I have not answered. Answering review feedback on my own PRs to prevent my work from stalling is high leverage (0.8-0.9 range).
- **Next action:** Reply to kevmoo's review comment on CHANGELOG preservation and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open pull request in googleapis/google-cloud-dart, a repository I am responsible for. It was created 5 days ago by my close collaborator Sigurd and is awaiting human review (bots do not count). As the default reviewer for this repository, reviewing collaborator PRs is high leverage.
- **Next action:** Review Sigurd's PR adding client attribution headers and pre-release polish to Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in googleapis/google-cloud-dart, a repository I am responsible for. As the default reviewer, it is on me to review external contributions that fix legitimate bugs like broken retries. Because it is from a first-time contributor rather than a close collaborator, it lands in the normal unreviewed PR band (0.65-0.75).
- **Next action:** Review this pull request fixing RPC status code handling for REST errors.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue in a repository I own (google-cloud-dart) which I originally filed. A contributor has done research and posted a proposed design sketch for review 4 days ago as requested. They are waiting on my response before implementing the solution.
- **Next action:** Reply to Yusufihsangorgel with feedback on their proposed design sketch for enum handling.

### 6. dart-lang/http#2027 → predicted 9, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in dart-lang/http, a repository you are responsible for, outlining planned architectural improvements for `Client.close`. Nobody else is waiting to act, so it represents your own planned work. As it is relatively fresh (filed 9 days ago), it sits squarely in the planned work priority tier (0.5–0.65).
- **Next action:** Decide on API design changes for `Client.close` and prepare a proposal or PR for package:http 2.0.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented 5 hours ago that I have started working on it. This represents active, planned work in a repository I own. It does not block anyone or involve an urgent security vulnerability, placing it in the 0.5-0.65 range.
- **Next action:** Implement the server trust evaluation hook in cupertino_http as promised.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in a repository I am responsible for (googleapis/google-cloud-dart) and was filed by a close collaborator (kevmoo). Kevmoo answered my question over two weeks ago, noting that it's a hole rather than an urgent fire, leaving the next step on me to investigate or plan a fix. It fits squarely in the planned work / backlog grooming range for collaborator issues in my repository.
- **Next action:** Decide whether to implement mid-stream error detection and incremental JSON decoding for google_cloud_rpc streaming requests.

### 9. dart-lang/sdk#59846 → predicted 10, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** This is an assigned issue in dart:io regarding HTTP header parsing allowing invalid characters like NUL and control codes, which has potential security and proxy smuggling implications. However, there has been no new activity in nearly two years (22 months), and it is not explicitly marked as a critical vulnerability. As an assigned issue that I should either fix or reassign/unassign, it sits squarely in my planned work/todo range.
- **Next action:** Investigate HTTP header parsing in dart:io and either implement RFC 9110 character validation or reassign.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.45
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in a repository I own (googleapis/google-cloud-dart) filed by a close collaborator (kevmoo). I replied with a concrete trade-off question regarding API surface size and alternate approaches, and the ball is currently in kevmoo's court to respond. Because this is a recent discussion with a close collaborator in my own repository, it stays visible but below actionable work.
- **Next action:** Wait for kevmoo to respond regarding switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.45
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was CC'd by collaborator kevmoo and noted as the library owner for this persistent crash bug in dart:io HttpClient. However, the mention is years old and there is no direct recent question or urgent blocker assigned to me. It represents an important but dormant backlog issue in an area I own.
- **Next action:** Investigate taking over the abandoned fix for uncatchable HttpException in dart:io HttpClient.

### 12. dart-lang/native#3752 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** You opened this issue and assigned it to yourself, but you have already created PR #3763 to resolve it. Per instructions, when an issue has an open PR addressing it, the concrete action is on the PR instead. This issue stays in the lower range (0.15-0.35) while the PR is in flight.
- **Next action:** Focus on open PR dart-lang/native#3763 which implements the fix for this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 12, priority 0.52
- **Ground truth:** 
- **Model:** This is an issue in a repository I maintain, filed by a close collaborator (sigurdm). I was the last to comment, stating I am considering how to address this systematically. Since nobody is waiting on a reply from me but the planned work remains mine to resolve, it falls in my planned todo work.
- **Next action:** Decide on a fix for dependency constraints across packages or update the pubspec versions directly.

### 14. dart-lang/tools#2719 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not one of the repositories I am responsible for. The review request is directed to the broad dart-ecosystem-team rather than to me personally. As an automated dependency bump not specifically assigned to me, it does not require my personal attention.
- **Next action:** None; this is a team review request in a repository I do not maintain.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue describes a bug in `google_cloud_rpc`, which is under a repository I maintain. However, the author opened PR #382 to fix it at the same time. The concrete next action is to review the PR rather than act directly on this issue, so this issue is kept in the lower priority range.
- **Next action:** Review PR #382, which provides the fix for this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http, and I requested a review from goderbauer only two days ago. Since it hasn't reached the ~one week mark of silence, there is no action required from me yet. Consequently, it remains at a low priority while waiting on the reviewer.
- **Next action:** Waiting on goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue in a repository I own, filed by a close collaborator (kevmoo), which I explicitly assigned to myself and scoped out research on. Nobody is waiting on a reply from me, so it represents assigned planned work for me to implement.
- **Next action:** Implement RetryRunner wiring and RequestOptions in ServiceClient for google_cloud_rpc

### 18. dart-lang/http#2031 → predicted 25, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Even though mosuem directly requested my review, this PR is stacked on other PRs including #2014, which still needs review. Furthermore, I have noted that I am not responsible for http2. Therefore, this release PR should wait until the underlying PRs are reviewed and merged.
- **Next action:** Review unreviewed PR in the stack first (#2014).

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR introducing the DNS package in googleapis/google-cloud-dart. It has been idle for 45 days with merge conflicts and only bot comments. As a stale personal draft that I should either finish or abandon, it falls in the 0.15–0.35 priority range.
- **Next action:** Resume work on this draft PR to finish adding DNS support or close it.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my primary repositories. The review request is directed broadly to the dart-ecosystem-team rather than to me personally, and the PR is currently blocked by an unsigned CLA. Consequently, there is no direct action required from me.
- **Next action:** None; this is a team review request in a repository I do not manage and the CLA is not yet signed.

### 21. dart-lang/tools#2544 → predicted 29, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for, and was only requested of a team I belong to (dart-ecosystem-team). Furthermore, a specific reviewer (lrhn) has already taken ownership and conducted thorough reviews, with jonasfj needing to respond to those comments. Even though it is a security-related mitigation, because it is outside my scope and actively reviewed by others, there is nothing for me to do.
- **Next action:** Wait for jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on PR #2563, which is still an unreviewed draft PR. Stacked PRs are low priority until their base branches are reviewed and landed. Furthermore, dart-lang/tools is not a repository I am responsible for, and the review request is to the shared team.
- **Next action:** Wait for base PR dart-lang/tools#2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR where you requested a review from liamappelbe only 2 days ago. Since it hasn't been roughly a week yet, there is no action needed until they respond or enough time passes to warrant a ping.
- **Next action:** Waiting on review from liamappelbe.

### 24. googleapis/google-cloud-dart#373 → predicted 15, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in a repository I maintain. sigurdm approved the PubSub portion, and I asked him 4 days ago whether he reviewed the rest so we can bypass Nate's review backlog. It is waiting on his response before merging, ranking it in the waiting range for collaborator questions.
- **Next action:** Wait for sigurdm to respond to my question about whether the non-PubSub parts look good to merge.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR has a 'next-breaking-release' label and introduces breaking API changes that we explicitly agreed to defer until an semver major release. In my last comment 2 years ago, I stated that landing this must be coordinated with a major release and that there was no immediate bandwidth for it. PRs explicitly waiting for a future breaking release or stale backlog items sit in the 0.05–0.15 priority range.
- **Next action:** Keep in the backlog for consideration during the next major breaking release of package:http.

### 26. dart-lang/http#1932 → predicted 18, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** There is an open PR (#2034) authored by me that addresses this exact issue. Per the guidelines, when an issue has an open PR covering it, the PR is the primary item to act on, and the issue itself should be ranked low (roughly 0.15–0.35).
- **Next action:** Focus on PR #2034 which implements the fix for this issue.

### 27. flutter/devtools#8223 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, a repository I am not responsible for. I was only mentioned as an informational CC by bkonyi over two years ago, and no action or response was requested of me. The DevTools team and outside contributors are managing the discussion, so there is nothing for me to do.
- **Next action:** None, as this is an issue in flutter/devtools where I was only CC'd over two years ago.

### 28. dart-lang/http#1837 → predicted 31, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old enhancement request marked as 'contributions-welcome' and 'P3' where you explicitly told the author the team is not planning to implement it. There has been no activity for a full year and no one is waiting on you. It remains in the low-priority backlog.
- **Next action:** Leave in backlog for community contributions or triage during grooming.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this PR two days ago, and there have been no new commits or comments since. As far as I am concerned, my part is complete and it is up to the author to merge.
- **Next action:** Waiting on @mosuem to merge the PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** You specifically noted for dart-lang/http that you are 'not responsible for http2'. This issue is labeled 'package:http2' and does not mention or request anything from you directly.
- **Next action:** None, as this issue concerns package:http2 which is outside my scope of responsibility.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not one of my primary repositories. While my team dart-ecosystem-team was requested, kevmoo specifically requested a review from davidmorgan. Therefore, there is nothing for me to do personally.
- **Next action:** None; davidmorgan is directly assigned to review this PR in dart-lang/tools.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR touches pkgs/http2, which I explicitly noted I am not responsible for in dart-lang/http. Additionally, the author has directly pinged mosuem for review, so it is in another collaborator's hands. There is no action for me to take.
- **Next action:** None; this is in http2, which is outside my scope, and the author specifically asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 35, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to liamappelbe. I previously participated as a commenter to share notes from an experiment, but there are no direct questions or action items directed at me. Liam and Slava are driving the technical discussion and next steps.
- **Next action:** None; this issue in dart-lang/native is assigned to and being handled by liamappelbe and mraleph.

### 34. dart-lang/http#1972 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** This issue currently has a 'needs-info' label and is waiting on the reporter to answer clarification questions. Furthermore, there is an open PR (dart-lang/http#1974) addressing this issue, meaning any actual work belongs on the PR rather than here. As it is waiting on info with no reply and has an open PR, priority is near zero.
- **Next action:** Wait for response or track PR #1974 instead of this issue.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** There is an open pull request (PR #2002) implementing this feature, so any action should take place there rather than on this issue. Furthermore, you marked this item with a thumbs-down on 2026-10-05 and nothing new directed at you has occurred on this issue since.
- **Next action:** Act on PR #2002 instead, which addresses this issue.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.68
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am assigned to this P2 issue in the SDK, and filiph recently reported being able to reproduce the bug locally and offered to help hunt it down. Although I previously marked this item with a thumbs-down, this new substantive activity occurred after that mark, reopening my need to act. Helping a contributor reproduce and resolve an elusive intermittent file deletion bug is high-leverage engineering work.
- **Next action:** Reply to filiph offering guidance on how to provide a reproduction or debug the Directory.deleteSync failure.
