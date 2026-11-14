# Gitilizer eval: v5h-gemini-low

strategy `pointwise` · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5h.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031838

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.707 ± 0.007 |
| spearman | 0.821 ± 0.011 |
| pairwise_acc | 0.853 ± 0.003 |
| ndcg | 0.984 ± 0.004 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.767 ± 0.058 |
| mean_abs_displacement | 3.889 ± 0.147 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.894 ± 0.019 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.708 ± 0.072 |
| B | 20 | 0.558 ± 0.011 | 0.954 ± 0.027 | 0.600 ± 0.000 | 3.300 ± 0.100 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Evaluate the security concern regarding Android certificate revocation/blocklists and eMudhra intermediate CA compromise on Dart's HttpClient, and reply to the issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review comment on CHANGELOG.md handling in bump.go and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.76 | 3/3 | googleapis/google-cloud-dart#376 | A | Review this PR from collaborator Sigurd on Pub/Sub release polish. |
| 4 | 5.0 (5) | +1.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR for handling google.rpc.Code in ServiceException |
| 5 | 4.0 (4) | -1.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#252 | B | Review and reply to Yusufihsangorgel's proposed enum representation design. |
| 6 | 7.3 (7–8) | +1.3 | 0.58 | 3/3 | dart-lang/http#2027 | B | Design and implement the tightened Client.close semantics or solicit team feedback for the 2.0 release plan. |
| 7 | 6.3 (6–7) | -0.7 | 0.61 | 3/3 | dart-lang/http#1981 | B | Work on implementing the server trust evaluation hook in cupertino_http. |
| 8 | 10.3 (10–11) | +2.3 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Follow up with kevmoo on whether to implement mid-stream error handling or prioritize incremental JSON decoding |
| 9 | 12.0 (12) | +3.0 | 0.51 | 3/3 | dart-lang/sdk#59846 | B | Fix the HTTP header parser validation in dart:io or reassign the issue. |
| 10 | 13.7 (13–14) | +3.7 | 0.40 | 0/3 | googleapis/google-cloud-dart#361 | A | Waiting on reply from kevmoo regarding API surface tradeoffs between proto and discovery. |
| 11 | 15.0 (15) | +4.0 | 0.35 | 0/3 | dart-lang/sdk#31275 | A | None; awaiting prioritization or investigation into the abandoned dart:io patch. |
| 12 | 17.7 (17–18) | +5.7 | 0.25 | 0/3 | dart-lang/native#3752 | B | Work on the fix via open PR #3763 instead of this issue. |
| 13 | 9.7 (9–11) | -3.3 | 0.54 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to address the version constraint via tooling or manually update the pubspecs. |
| 14 | 18.7 (18–19) | +4.7 | 0.20 | 0/3 | dart-lang/tools#2719 | B | Waiting for a repo maintainer or member of dart-ecosystem-team to review this automated update. |
| 15 | 16.0 (16) | +1.0 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review open PR #382 which addresses this issue. |
| 16 | 22.0 (22) | +6.0 | 0.10 | 0/3 | dart-lang/http#2034 | B | Waiting for goderbauer to review the pull request. |
| 17 | 8.3 (8–9) | -8.7 | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient as outlined. |
| 18 | 25.3 (25–26) | +7.3 | 0.08 | 0/3 | dart-lang/http#2031 | A | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 19 | 20.0 (20) | +1.0 | 0.19 | 3/3 | googleapis/google-cloud-dart#345 | A | Resume work to finish or abandon this draft PR. |
| 20 | 21.0 (21) | +1.0 | 0.15 | 0/3 | dart-lang/core#1007 | B | Waiting on the author to sign the CLA and for a primary repository maintainer to review. |
| 21 | 29.7 (29–30) | +8.7 | 0.05 | 0/3 | dart-lang/tools#2544 | B | Waiting on jonasfj to address lrhn's review feedback. |
| 22 | 24.0 (24) | +2.0 | 0.10 | 0/3 | dart-lang/tools#2710 | B | Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR. |
| 23 | 23.0 (23) | +0.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for review from liamappelbe. |
| 24 | 13.3 (13–14) | -10.7 ⚠️ | 0.40 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to reply on whether this PR can be merged without natebosch's review. |
| 25 | 26.3 (26–27) | +1.3 | 0.08 | 0/3 | dart-lang/http#579 | B | None; this PR is labeled 'next-breaking-release' and deferred until a future major version. |
| 26 | 17.7 (17–19) | -8.3 | 0.23 | 0/3 | dart-lang/http#1932 | B | Work on and drive open PR #2034 instead of acting directly on this issue. |
| 27 | 28.0 (28) | +1.0 | 0.05 | 0/3 | flutter/devtools#8223 | B | None; this is an informational CC in a repository I do not own. |
| 28 | 31.3 (31–32) | +3.3 | 0.05 | 0/3 | dart-lang/http#1837 | A | Wait for community contributions or further updates. |
| 29 | 32.7 (32–33) | +3.7 | 0.01 | 0/3 | dart-lang/http#2033 | A | Waiting on mosuem to merge after my approval. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/3 | dart-lang/http#1365 | A | None; this issue concerns package:http2 which is explicitly outside my scope. |
| 31 | 26.3 (25–27) | -4.7 | 0.06 | 0/3 | dart-lang/tools#2715 | B | Waiting on davidmorgan to review kevmoo's PR. |
| 32 | 33.3 (32–34) | +1.3 | 0.00 | 0/3 | dart-lang/http#2026 | A | Waiting on mosuem to review this http2 PR. |
| 33 | 31.0 (29–35) | -2.0 | 0.03 | 0/3 | dart-lang/native#3653 | A | Waiting on liamappelbe and VM team to decide whether to pursue low-level trampoline changes or close the issue. |
| 34 | 31.3 (30–33) | -2.7 | 0.04 | 0/3 | dart-lang/http#1972 | B | Waiting for information from the reporter. |
| 35 | 34.7 (34–35) | -0.3 | 0.00 | 0/3 | dart-lang/http#1841 | B | None on this issue; track progress or review the linked PR #2002 instead. |
| 36 | 9.0 (6–11) | -27.0 ⚠️ | 0.57 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's offer to help reproduce this intermittent Directory.deleteSync failure or unassign myself. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** Security issues take absolute precedence. As the author and assignee of this issue regarding TLS/CA trust handling on Android, a new comment 3 days ago flagged critical security implications regarding compromised intermediate CA keys (eMudhra) and whether Dart on Android honors OS certificate revocation and blocklists. Per the security instructions, security issues assigned to or created by me with fresh activity require immediate verification and response.
- **Next action:** Evaluate the security concern regarding Android certificate revocation/blocklists and eMudhra intermediate CA compromise on Dart's HttpClient, and reply to the issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and collaborator kevmoo left substantive review feedback 21 hours ago with an unresolved thread. The PR is waiting on me to address his question to move forward and unblock fixing an issue in google-cloud-dart.
- **Next action:** Reply to kevmoo's review comment on CHANGELOG.md handling in bump.go and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from a close collaborator (sigurdm) in googleapis/google-cloud-dart, a repository I am responsible for. I am the default reviewer for this repository, and bot reviews do not count as human reviews. Since it was opened 5 days ago and is waiting on me to review, it falls squarely in the 0.65-0.8 collaborator review range.
- **Next action:** Review this PR from collaborator Sigurd on Pub/Sub release polish.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** As a maintainer of googleapis/google-cloud-dart, I am the default reviewer for PRs in this repository. This PR fixes an issue where retryable gRPC error codes over REST are not properly handled. It has received no human review yet and is fresh (3 days old).
- **Next action:** Review this PR for handling google.rpc.Code in ServiceException

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is an issue I authored in my repository googleapis/google-cloud-dart. A contributor has posted a proposed design 4 days ago based on my previous feedback asking for a sketch before writing code. They are waiting on my sign-off to proceed with implementation.
- **Next action:** Review and reply to Yusufihsangorgel's proposed enum representation design.

### 6. dart-lang/http#2027 → predicted 7, priority 0.58
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is an issue I recently filed (9 days ago) in dart-lang/http, a repository I am responsible for. Because it was filed within the last two weeks as my own planned work and is not blocked by external dependencies, it represents a fresh personal commitment. It falls squarely in the 0.5–0.65 range for planned work.
- **Next action:** Design and implement the tightened Client.close semantics or solicit team feedback for the 2.0 release plan.

### 7. dart-lang/http#1981 → predicted 6, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this issue to myself and explicitly commented 5 hours ago that I have started working on it. This represents fresh planned work in a repository I own. It falls directly into the 0.5–0.65 range as active work committed by me.
- **Next action:** Work on implementing the server trust evaluation hook in cupertino_http.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.52
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I maintain, filed by my close collaborator kevmoo. I asked a clarifying question 17 days ago, and kevmoo replied stating it's not urgent but remains an open gap. Because it's not urgent and has been quiet for over two weeks, it sits in the lower portion of the planned work / collaborator issue range.
- **Next action:** Follow up with kevmoo on whether to implement mid-stream error handling or prioritize incremental JSON decoding

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned to this issue in dart-lang/sdk regarding HTTP header parsing accepting invalid characters (like NUL), which is an assigned bug you should fix or unassign. However, there has been no activity on it for 22 months, and dart-lang/sdk is not one of your primarily owned repositories. Because it represents dormant assigned work that you can act on, it sits at the bottom of the assigned/planned work range (0.5).
- **Next action:** Fix the HTTP header parser validation in dart:io or reassign the issue.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.45
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** In a repo I am responsible for, collaborator kevmoo opened this proposal and I replied with a concrete question 16 days ago questioning whether switching to discovery is worthwhile versus adding convenience extensions. Because the last action was mine and I am waiting for an answer to decide the technical direction, the next step is not on me. It sits in the 0.35–0.5 range as an open question to a collaborator in my own repository.
- **Next action:** Waiting on reply from kevmoo regarding API surface tradeoffs between proto and discovery.

### 11. dart-lang/sdk#31275 → predicted 15, priority 0.35
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I was informational-CC'd by parlough and collaborator kevmoo as the owner of dart:io over two years ago, but dart-lang/sdk is not one of my primary repos and no direct question or task was assigned to me. The issue has been dormant for 20 months with only relabeling activity. Because an important collaborator specifically highlighted this and I was CC'd as code owner, it remains visible in the 0.35–0.5 CC range, but sinks to the lower end (0.35) due to staleness and lack of immediate actionable steps.
- **Next action:** None; awaiting prioritization or investigation into the abandoned dart:io patch.

### 12. dart-lang/native#3752 → predicted 18, priority 0.25
- **Ground truth:** 
- **Model:** I filed and assigned this issue to myself, but I already have an open PR (#3763) addressing it. Per guidelines, when an issue has an open PR covering it, action shifts to the PR and the issue is ranked lower (0.15–0.35). There is no independent action needed directly on the issue.
- **Next action:** Work on the fix via open PR #3763 instead of this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.55
- **Ground truth:** 
- **Model:** This is an issue filed by my collaborator sigurdm in a repository I maintain (googleapis/google-cloud-dart). I last commented stating I was looking into how to fix this, so the ball is in my court to make a decision or implement the fix. However, it has been inactive for over two weeks, placing it in the middle of my planned work range.
- **Next action:** Decide whether to address the version constraint via tooling or manually update the pubspecs.

### 14. dart-lang/tools#2719 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated pull request in dart-lang/tools, a repository I am not directly responsible for. The review request is directed to the broad dart-ecosystem-team rather than me personally. Because it is in another team's repository and not assigned to me, it sits in the low-priority team review range (0.15–0.35).
- **Next action:** Waiting for a repo maintainer or member of dart-ecosystem-team to review this automated update.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository I maintain, but it already has an open PR (#382) submitted by the author to fix it. Per instructions, when an issue has an open PR covering it, the PR is the primary item to act on, and the issue itself falls to 0.15–0.35. Because the issue was reported recently (3 days ago), it sits in the middle of that lower range.
- **Next action:** Review open PR #382 which addresses this issue.

### 16. dart-lang/http#2034 → predicted 22, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR in dart-lang/http fixing an issue with cronet. I requested a review from goderbauer only two days ago, so it is waiting on their review and not yet due for a ping. Per guidelines, my PRs waiting on a recently asked reviewer belong in the 0.05-0.15 range.
- **Next action:** Waiting for goderbauer to review the pull request.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I own (googleapis/google-cloud-dart) filed by a close collaborator (kevmoo). I have actively scoped down the task and researched design examples in other languages, making this planned work currently on my plate. While actionable now, it is not blocking anyone else immediately.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient as outlined.

### 18. dart-lang/http#2031 → predicted 25, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem requested my review directly, this is a release preparation PR stacked on top of unmerged PRs (including #2014 which still needs review). Furthermore, my profile notes that I am not responsible for http2. Because it is blocked on the rest of the stack, there is nothing to review here yet.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.18
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in googleapis/google-cloud-dart, which I converted to draft 45 days ago. Per the guidelines, my own drafts that I should finish or abandon belong in the 0.15–0.35 range. Because it has had no activity for over six weeks, it sits toward the lower end of that range.
- **Next action:** Resume work to finish or abandon this draft PR.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which is not one of my primary repositories, and I was only requested via a team mention (dart-ecosystem-team). Furthermore, the author has not signed the Google CLA and the PR's mergeable state is blocked. Per instructions, team review requests in repositories I do not own are low priority (0.15–0.35).
- **Next action:** Waiting on the author to sign the CLA and for a primary repository maintainer to review.

### 21. dart-lang/tools#2544 → predicted 30, priority 0.05
- **Ground truth:** 
- **Model:** This is a PR in dart-lang/tools, a repository I am not responsible for, where I am only included via a team review request (dart-ecosystem-team). Furthermore, lrhn is actively handling the review and the PR has been waiting on the author (jonasfj) to address feedback for two months. Although it touches on security mitigation, a security PR in a repository I do not own that is already being reviewed by someone else is not mine to act on.
- **Next action:** Waiting on jonasfj to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 24, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still an open draft PR that hasn't been reviewed or landed yet. Additionally, dart-lang/tools is not one of my primary assigned repos, and review was only requested via the generic dart-ecosystem-team rather than to me personally. Lower PRs in the stack need review first.
- **Next action:** Wait for base PR #2563 to be reviewed and merged before reviewing this stacked PR.

### 23. dart-lang/native#3763 → predicted 23, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native that I opened and requested a review from liamappelbe just 2 days ago. Since there has been no reviewer feedback yet and it has only been a couple of days, the ball is entirely in the reviewer's court. My PRs waiting on a recently requested reviewer fall in the 0.05-0.15 range.
- **Next action:** Wait for review from liamappelbe.

### 24. googleapis/google-cloud-dart#373 → predicted 14, priority 0.40
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own open PR in a repository I maintain, currently approved by sigurdm. 4 days ago I asked sigurdm if he felt comfortable merging without waiting on natebosch. The ball is in his court, so I am waiting for his reply before taking further action.
- **Next action:** Wait for sigurdm to reply on whether this PR can be merged without natebosch's review.

### 25. dart-lang/http#579 → predicted 26, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking API changes and is explicitly marked with the 'next-breaking-release' label. I noted two years ago that landing this requires coordination with a major version bump that isn't currently planned or resourced. Per policy, PRs blocked by labels or waiting for a future breaking release belong in the 0.05–0.15 range, and there has been no actionable activity in well over a year.
- **Next action:** None; this PR is labeled 'next-breaking-release' and deferred until a future major version.

### 26. dart-lang/http#1932 → predicted 17, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by an active pull request (PR #2034) authored by me and updated recently. Per the guidelines, issues with an open PR covering them belong in the 0.15–0.35 range because work should happen on the PR, not the issue thread.
- **Next action:** Work on and drive open PR #2034 instead of acting directly on this issue.

### 27. flutter/devtools#8223 → predicted 28, priority 0.05
- **Ground truth:** 
- **Model:** I was only mentioned as an informational CC over two years ago regarding potential impact on HTTP profiling in a repository I am not responsible for (flutter/devtools). No action has been requested of me, and the discussion is being handled by the DevTools team and outside contributors. It requires no attention from me.
- **Next action:** None; this is an informational CC in a repository I do not own.

### 28. dart-lang/http#1837 → predicted 31, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old feature request marked 'contributions-welcome' and triaged as P3. I previously commented that the Dart team is not taking this on and invited community implementation. There has been no subsequent activity and there is nothing for me to do.
- **Next action:** Wait for community contributions or further updates.

### 29. dart-lang/http#2033 → predicted 32, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this PR two days ago, and there has been no new activity or commit since. The PR is approved, clean, and entirely waiting on the author or automated merge queues. Under the guidelines, approved and quiet PRs require no action from me and belong at 0.0-0.05.
- **Next action:** Waiting on mosuem to merge after my approval.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is labeled 'package:http2', which I have explicitly noted I am not responsible for in dart-lang/http. Additionally, I am not assigned, not mentioned, and have never participated in this old issue. There is nothing for me to do.
- **Next action:** None; this issue concerns package:http2 which is explicitly outside my scope.

### 31. dart-lang/tools#2715 → predicted 27, priority 0.05
- **Ground truth:** 
- **Model:** This PR is in `dart-lang/tools`, which is not a repository I am responsible for. I was only requested via a team review (`dart-ecosystem-team`), and a specific reviewer (`davidmorgan`) was also directly requested. Under the review guidelines, this is near 0 priority for me.
- **Next action:** Waiting on davidmorgan to review kevmoo's PR.

### 32. dart-lang/http#2026 → predicted 34, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR touches the http2 package under dart-lang/http, which is explicitly noted as outside my area of responsibility. Furthermore, the author directly pinged mosuem for review, so there is no action needed from me.
- **Next action:** Waiting on mosuem to review this http2 PR.

### 33. dart-lang/native#3653 → predicted 29, priority 0.05
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in `dart-lang/native`, a repository I do not own or maintain, and is assigned to and actively driven by liamappelbe. I previously shared context in the discussion over a month ago, and no one has requested anything from me since. There is no action for me to take.
- **Next action:** Waiting on liamappelbe and VM team to decide whether to pursue low-level trampoline changes or close the issue.

### 34. dart-lang/http#1972 → predicted 33, priority 0.02
- **Ground truth:** 
- **Model:** I asked clarifying questions and added the 'needs-info' label 8 days ago, with no response yet from the author. Furthermore, there is an open PR (#1974) addressing the bug, so the issue itself requires no action from me right now.
- **Next action:** Waiting for information from the reporter.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue with a thumbs-down on 2026-10-05, and no new direct activity requiring your attention has occurred on the issue itself since then. Furthermore, there is an open PR (#2002) addressing this request, and the issue carries the 'next-breaking-release' label. Any required review or action belongs on the PR rather than this issue.
- **Next action:** None on this issue; track progress or review the linked PR #2002 instead.

### 36. dart-lang/sdk#38148 → predicted 10, priority 0.55
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am assigned to this issue in dart-lang/sdk. Although I placed a thumbs-down in August 2026, filiph commented recently (24 days ago) reporting a local reproduction on modern Dart and asking how to help hunt it down. Since there is new information on an assigned issue that requires either engagement or unassigning, it falls in my planned/assigned work range.
- **Next action:** Reply to filiph's offer to help reproduce this intermittent Directory.deleteSync failure or unassign myself.
