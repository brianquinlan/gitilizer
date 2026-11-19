# Gitilizer eval: next-step-last-gemini-low-t1

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-144456

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.667 ± 0.000 |
| spearman | 0.797 ± 0.000 |
| pairwise_acc | 0.833 ± 0.000 |
| ndcg | 0.983 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.944 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.867 ± 0.000 | 0.997 ± 0.000 | 1.000 ± 0.000 | 0.875 ± 0.000 |
| B | 20 | 0.505 ± 0.000 | 0.950 ± 0.000 | 0.600 ± 0.000 | 3.400 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | [todo] Assess the security impact of compromised intermediate CAs on Android and clarify Dart's handling of revoked/disabled certs. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | [respond] Reply to kevmoo's review comment on bump.go regarding CHANGELOG.md handling. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | [review] Review sigurdm's PR adding client attribution headers and release polish for Pub/Sub. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#382 | A | [review] Review this PR fixing RPC error code handling in google_cloud_rpc. |
| 5 | 5.0 (5) | +0.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#252 | B | [respond] Review and reply to Yusufihsangorgel's proposed enum design sketch. |
| 6 | 11.0 (11) | +5.0 | 0.52 | 1/1 | dart-lang/http#2027 | B | [todo] Decide on the design for async `Client.close` and prepare a proposal or implementation plan. |
| 7 | 6.0 (6) | -1.0 | 0.60 | 1/1 | dart-lang/http#1981 | B | [todo] Implement the server trust evaluation hook in cupertino_http as planned |
| 8 | 8.0 (8) | +0.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | [todo] Plan or implement the fix for mid-stream error handling and investigate incremental streaming in google_cloud_rpc |
| 9 | 10.0 (10) | +1.0 | 0.55 | 1/1 | dart-lang/sdk#59846 | B | [todo] Investigate and implement stricter RFC 9110 character validation for HTTP header names in dart:io, or reassign the issue. |
| 10 | 13.0 (13) | +3.0 | 0.38 | 0/1 | googleapis/google-cloud-dart#361 | A | [waiting] Waiting for kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions. |
| 11 | 14.0 (14) | +3.0 | 0.38 | 0/1 | dart-lang/sdk#31275 | A | [backlog] None; triage or pick up when grooming dart:io backlog in sdk. |
| 12 | 17.0 (17) | +5.0 | 0.25 | 0/1 | dart-lang/native#3752 | B | [elsewhere] Follow PR dart-lang/native#3763 which fixes this issue. |
| 13 | 12.0 (12) | -1.0 | 0.50 | 1/1 | googleapis/google-cloud-dart#366 | B | [todo] Decide on the automation approach or update the dependency versions in pubspec.yaml for storage and pubsub. |
| 14 | 25.0 (25) | +11.0 ⚠️ | 0.05 | 0/1 | dart-lang/tools#2719 | B | [not_yours] Wait for another dart-ecosystem-team member to review this automated dependency update. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/1 | googleapis/google-cloud-dart#381 | A | [elsewhere] Act on PR #382 instead of this issue. |
| 16 | 21.0 (21) | +5.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | [waiting] Wait for goderbauer to review the pull request. |
| 17 | 7.0 (7) | -10.0 ⚠️ | 0.58 | 1/1 | googleapis/google-cloud-dart#359 | B | [todo] Implement RetryRunner and RequestOptions wiring in ServiceClient and handle FormatException in ServiceException |
| 18 | 33.0 (33) | +15.0 ⚠️ | 0.00 | 0/1 | dart-lang/http#2031 | A | [not_yours] None, as package:http2 is outside my stated scope and this is stacked on PR #2014. |
| 19 | 19.0 (19) | +0.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | [todo] Resume work to resolve merge conflicts and bot comments, or close the draft. |
| 20 | 20.0 (20) | +0.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | [not_yours] Wait for other team members to review or the author to sign the CLA. |
| 21 | 27.0 (27) | +6.0 | 0.05 | 0/1 | dart-lang/tools#2544 | B | [not_yours] None; lrhn is already reviewing this PR in dart-lang/tools and jonasfj needs to respond. |
| 22 | 23.0 (23) | +1.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | [elsewhere] Wait for base PR #2563 to be reviewed and merged first. |
| 23 | 22.0 (22) | -1.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | [waiting] Wait for liamappelbe to review the PR. |
| 24 | 15.0 (15) | -9.0 ⚠️ | 0.35 | 0/1 | googleapis/google-cloud-dart#373 | B | [waiting] Wait for sigurdm to reply whether this PR is good to merge without natebosch's review |
| 25 | 24.0 (24) | -1.0 | 0.08 | 0/1 | dart-lang/http#579 | B | [backlog] Leave PR on hold until a major semver breaking release is planned for package:http. |
| 26 | 18.0 (18) | -8.0 | 0.20 | 0/1 | dart-lang/http#1932 | B | [elsewhere] Focus on PR #2034 which addresses this issue. |
| 27 | 30.0 (30) | +3.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | [not_yours] None; this issue is in flutter/devtools where I was only CC'd years ago and no action is asked of me. |
| 28 | 29.0 (29) | +1.0 | 0.05 | 0/1 | dart-lang/http#1837 | A | [backlog] None; issue is marked contributions-welcome and waiting for community implementation. |
| 29 | 32.0 (32) | +3.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | [not_yours] Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | [not_yours] None, as I am not responsible for the http2 package. |
| 31 | 26.0 (26) | -5.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | [not_yours] Waiting on davidmorgan to review the PR. |
| 32 | 31.0 (31) | -1.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | [not_yours] None; waiting on mosuem to review this http2 PR. |
| 33 | 35.0 (35) | +2.0 | 0.00 | 0/1 | dart-lang/native#3653 | A | [not_yours] None; liamappelbe is driving this issue in dart-lang/native. |
| 34 | 28.0 (28) | -6.0 | 0.05 | 0/1 | dart-lang/http#1972 | B | [elsewhere] Wait for reporter to provide reproduction details, or review linked PR #1974. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | [not_yours] Act on open PR dart-lang/http#2002 instead of this issue. |
| 36 | 9.0 (9) | -27.0 ⚠️ | 0.55 | 1/1 | dart-lang/sdk#38148 | B | [respond] Reply to filiph's offer to help reproduce the issue and decide how to investigate or unassign myself. |

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
- **Model:** This is an open security issue filed by me and assigned to me regarding TLS certificate trust on Android. A user recently commented raising an active security vulnerability regarding compromised eMudhra intermediate CA keys and Dart's potential failure to honor revoked or disabled certificates. According to instructions, security issues in code I own with any new activity outrank all other work and must be scored at 0.9 or above.
- **Next action:** [todo] Assess the security impact of compromised intermediate CAs on Android and clarify Dart's handling of revoked/disabled certs.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own pull request fixing an issue in Dart package release tooling. My close collaborator kevmoo left an inline review comment with an architectural question that is blocking the PR from moving forward. I should answer his question and push any necessary updates to prevent my PR from stalling.
- **Next action:** [respond] Reply to kevmoo's review comment on bump.go regarding CHANGELOG.md handling.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I am directly responsible for. It was opened by my close collaborator Sigurd, making me the default reviewer. Since only bots have commented so far, the concrete next step is for me to review it.
- **Next action:** [review] Review sigurdm's PR adding client attribution headers and release polish for Pub/Sub.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I am responsible for. As the default reviewer, it is on me to review it. The PR fixes an issue where error codes are dropped over REST, affecting retry logic, and has been open for 3 days.
- **Next action:** [review] Review this PR fixing RPC error code handling in google_cloud_rpc.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.68
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I created in a repository I own (googleapis/google-cloud-dart). A contributor responded to my request for a preliminary design sketch 4 days ago and is waiting for feedback before proceeding with code changes. Responding promptly avoids blocking an outside contributor working on our backlog.
- **Next action:** [respond] Review and reply to Yusufihsangorgel's proposed enum design sketch.

### 6. dart-lang/http#2027 → predicted 11, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this architectural issue in a repository you are responsible for (dart-lang/http). It represents your own planned work and thinking on core semantics for Client.close. As it is relatively fresh with no external blocker, it falls squarely into the planned work range.
- **Next action:** [todo] Decide on the design for async `Client.close` and prepare a proposal or implementation plan.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented just a few hours ago that I have started working on it. This represents fresh planned work in a repository I own. It is mine to drive forward, placing it comfortably in the active planned work tier.
- **Next action:** [todo] Implement the server trust evaluation hook in cupertino_http as planned

### 8. googleapis/google-cloud-dart#360 → predicted 8, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This issue is in a repository I am responsible for (googleapis/google-cloud-dart) and was filed by a close collaborator (kevmoo). Although kevmoo noted it is not urgent, there is a clear next step and technical path laid out for our client runtime, especially around catching mid-stream errors. As an issue in my repository waiting on my action/planning, it sits squarely in my planned backlog.
- **Next action:** [todo] Plan or implement the fix for mid-stream error handling and investigate incremental streaming in google_cloud_rpc

### 9. dart-lang/sdk#59846 → predicted 10, priority 0.55
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this bug regarding invalid character handling in `dart:io` HTTP header parsing. Improper header parsing (especially accepting NUL and whitespace characters) can pose HTTP request smuggling or header injection risks in proxy architectures. It has been dormant for a long time, but as an assigned issue in an area you work on, you need to either fix it or reassign it.
- **Next action:** [todo] Investigate and implement stricter RFC 9110 character validation for HTTP header names in dart:io, or reassign the issue.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.38
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is an issue in googleapis/google-cloud-dart, a repository I am responsible for, filed by my close collaborator kevmoo. In the last comment, I asked an architectural question weighing discovery format vs convenience extensions, and kevmoo has not yet replied. Since the ball is in his court, priority is in the moderate waiting range.
- **Next action:** [waiting] Waiting for kevmoo to reply to my question regarding switching to discovery vs adding convenience extensions.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.38
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an unhandled exception bug in dart:io HttpClient where parlough and collaborator kevmoo CC'd me as the library owner. However, it is in dart-lang/sdk rather than one of my primary maintained repositories, and no direct question or immediate blocker is pending right now. It represents an old, known issue in widely used code that I could take up as backlog work.
- **Next action:** [backlog] None; triage or pick up when grooming dart:io backlog in sdk.

### 12. dart-lang/native#3752 → predicted 17, priority 0.25
- **Ground truth:** 
- **Model:** You opened this issue and assigned it to yourself, but you have already authored PR #3763 to address it. Under our duplicate avoidance rules, the open PR is the active item to focus on rather than this issue. Consequently, the priority is lowered to the 0.15-0.35 range and points to the PR.
- **Next action:** [elsewhere] Follow PR dart-lang/native#3763 which fixes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 12, priority 0.50
- **Ground truth:** 
- **Model:** This is an issue in a repository I maintain, filed by my close collaborator sigurdm. I previously commented that I am looking into how to solve this generally, so moving this forward or deciding on the fix is on my plate. It is not an urgent blocker or security issue, placing it in my standard planned work.
- **Next action:** [todo] Decide on the automation approach or update the dependency versions in pubspec.yaml for storage and pubsub.

### 14. dart-lang/tools#2719 → predicted 25, priority 0.05
- **Ground truth:** 
- **Model:** This is an automated bot PR in dart-lang/tools, a repository I am not personally responsible for. The review request is directed to the broad dart-ecosystem-team rather than me directly, and does not require my personal attention. Consequently, it belongs under not_yours with very low priority.
- **Next action:** [not_yours] Wait for another dart-ecosystem-team member to review this automated dependency update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue in a repository I own describes a bug in error code mapping, but an open pull request (#382) already fixes it. Under the duplicate-handling guidance, the PR is the primary item to review and act upon. Therefore, priority on this issue is kept in the lower range (0.15-0.35).
- **Next action:** [elsewhere] Act on PR #382 instead of this issue.

### 16. dart-lang/http#2034 → predicted 21, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your pull request in dart-lang/http, and you requested a review from goderbauer only two days ago. Since roughly a week has not passed, no follow-up ping is required yet. There is nothing for you to do right now except wait for feedback.
- **Next action:** [waiting] Wait for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue filed by collaborator kevmoo in googleapis/google-cloud-dart, a repository I am responsible for. I assigned it to myself and have been driving design research and scoping work on it. It represents my own planned work with a clear path forward.
- **Next action:** [todo] Implement RetryRunner and RequestOptions wiring in ServiceClient and handle FormatException in ServiceException

### 18. dart-lang/http#2031 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I have explicitly noted that I am not responsible for http2 in dart-lang/http. Additionally, this PR is stacked on lower PRs (such as #2014) which have not yet been approved or merged. Because it is outside my scope, there is nothing for me to do.
- **Next action:** [not_yours] None, as package:http2 is outside my stated scope and this is stacked on PR #2014.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR that has been untouched for 45 days and has merge conflicts. As an old draft PR with no human reviewer waiting, it falls in the lower priority range (0.15–0.35) of drafts I should eventually finish or abandon.
- **Next action:** [todo] Resume work to resolve merge conflicts and bot comments, or close the draft.

### 20. dart-lang/core#1007 → predicted 20, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a PR in dart-lang/core, a repository I am not responsible for, and the review request is to the dart-ecosystem-team rather than to me personally. Furthermore, the PR is blocked by a failing CLA check from a first-time contributor. It is low priority for me and not directly mine to handle.
- **Next action:** [not_yours] Wait for other team members to review or the author to sign the CLA.

### 21. dart-lang/tools#2544 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This is a PR in dart-lang/tools, which is not one of my responsible repositories. Although it addresses a security mitigation (UNC path injection), I am not assigned or personally requested, only included via a team mention (dart-ecosystem-team). Furthermore, lrhn is actively driving the review and left extensive comments that author jonasfj has yet to address.
- **Next action:** [not_yours] None; lrhn is already reviewing this PR in dart-lang/tools and jonasfj needs to respond.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on draft PR #2563, which must be reviewed and merged before this one can proceed. Furthermore, this is in dart-lang/tools where I am not a primary maintainer, and review was only requested from the team rather than me directly.
- **Next action:** [elsewhere] Wait for base PR #2563 to be reviewed and merged first.

### 23. dart-lang/native#3763 → predicted 22, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own pull request in dart-lang/native, which I authored and requested a review on from liamappelbe 2 days ago. Since it has only been a couple of days, it is waiting on the reviewer and there is no action needed from me yet.
- **Next action:** [waiting] Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 15, priority 0.35
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR in googleapis/google-cloud-dart, which has already received an approval from collaborator sigurdm. 4 days ago I asked sigurdm if he felt comfortable with merging without waiting for natebosch, so we are currently waiting on his answer.
- **Next action:** [waiting] Wait for sigurdm to reply whether this PR is good to merge without natebosch's review

### 25. dart-lang/http#579 → predicted 24, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces a breaking API change and is tagged 'next-breaking-release'. I explicitly commented that landing this requires coordinating with a semver major release for which bandwidth is currently lacking, placing it squarely in the PRs waiting for a future breaking release bucket.
- **Next action:** [backlog] Leave PR on hold until a major semver breaking release is planned for package:http.

### 26. dart-lang/http#1932 → predicted 18, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by an open pull request (PR #2034) that I authored to fix the namespace duplication problem. Per the instructions, when an issue has an open PR addressing it, the concrete action belongs on the PR rather than the issue. Consequently, the issue itself is kept in the low priority range (0.15–0.35).
- **Next action:** [elsewhere] Focus on PR #2034 which addresses this issue.

### 27. flutter/devtools#8223 → predicted 30, priority 0.02
- **Ground truth:** 
- **Model:** This issue is in flutter/devtools, a repository I am not responsible for. I was only mentioned as an informational CC over two years ago regarding HTTP profiling, and subsequent questions were directed specifically to bkonyi. There is nothing for me to do here.
- **Next action:** [not_yours] None; this issue is in flutter/devtools where I was only CC'd years ago and no action is asked of me.

### 28. dart-lang/http#1837 → predicted 29, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old enhancement request where I already answered a year ago stating the team won't take it on, labeled it P3 and contributions-welcome. There is no new activity or request requiring my input. It remains a low-priority backlog/community item.
- **Next action:** [backlog] None; issue is marked contributions-welcome and waiting for community implementation.

### 29. dart-lang/http#2033 → predicted 32, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already reviewed and approved this PR, and nothing has happened since. It is completely done as far as I am concerned and is waiting on the author to merge.
- **Next action:** [not_yours] Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is explicitly labeled 'package:http2', which is an area in dart-lang/http that I have explicitly noted I am not responsible for. Furthermore, nobody has directly mentioned or asked anything of me. Therefore, this item requires no action from me.
- **Next action:** [not_yours] None, as I am not responsible for the http2 package.

### 31. dart-lang/tools#2715 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, a repository I am not responsible for. While kevmoo is a collaborator and requested dart-ecosystem-team, he specifically requested davidmorgan by name to review it. As a general team review request where another individual reviewer is explicitly assigned in an unowned repo, this is not mine to act on.
- **Next action:** [not_yours] Waiting on davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 31, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** I have explicitly noted that I am not responsible for the http2 package within dart-lang/http. Additionally, the author has specifically directed the review request to mosuem. Because this is outside my stated scope and being handled by someone else, there is nothing for me to do.
- **Next action:** [not_yours] None; waiting on mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 35, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, a repository I am not responsible for, and is assigned to and driven by liamappelbe. I previously shared context in the comments, but there are no outstanding questions or actions requested of me.
- **Next action:** [not_yours] None; liamappelbe is driving this issue in dart-lang/native.

### 34. dart-lang/http#1972 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** This issue is labeled 'needs-info' and awaits answers from the reporter following my comment 8 days ago. Furthermore, an open pull request (#1974) has been created to address it, making that PR the active item to inspect rather than this issue. Per guidelines, issues waiting on information or superseded by a PR receive very low priority.
- **Next action:** [elsewhere] Wait for reporter to provide reproduction details, or review linked PR #1974.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You marked this item with a thumbs-down on 2026-10-05, and no new direct activity has occurred on the issue since then. Additionally, an open PR (dart-lang/http#2002) has been filed to resolve this issue, so any action belongs on that PR.
- **Next action:** [not_yours] Act on open PR dart-lang/http#2002 instead of this issue.

### 36. dart-lang/sdk#38148 → predicted 9, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** Although I gave this a thumbs down in August 2026, a collaborator (filiph) commented afterwards stating they can reliably reproduce this intermittent bug and asked how to help. Since I am assigned to this P2 issue in the SDK, I should respond to their offer and follow up or unassign myself if I cannot take it on.
- **Next action:** [respond] Reply to filiph's offer to help reproduce the issue and decide how to investigate or unassign myself.
