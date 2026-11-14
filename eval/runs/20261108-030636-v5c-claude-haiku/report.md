# Gitilizer eval: v5c-claude-haiku

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5c.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030636

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.502 ± 0.039 |
| spearman | 0.640 ± 0.040 |
| pairwise_acc | 0.751 ± 0.019 |
| ndcg | 0.965 ± 0.007 |
| ndcg@5 | 0.973 ± 0.044 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.933 ± 0.115 |
| top10_overlap | 0.767 ± 0.058 |
| mean_abs_displacement | 6.167 ± 0.475 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.722 ± 0.051 | 0.988 ± 0.009 | 0.933 ± 0.115 | 1.583 ± 0.260 |
| B | 20 | 0.256 ± 0.080 | 0.901 ± 0.009 | 0.600 ± 0.000 | 5.000 ± 0.436 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Check whether dart:io on Android honors the eMudhra intermediate CA blocklist mitigations (see sdk#64644, which is already closed as completed), then reply to the security question and close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.83 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's inline question on bump.go about whether Bump should append CHANGELOG.md to lib.Keep or whether clean should auto-preserve it, then push the fix and re-request review. |
| 3 | 5.3 (5–6) | +2.3 | 0.70 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (sigurdm's pre-release polish, no reviewer yet) in google-cloud-dart, or at least skim the gemini critical findings on the streaming pull code it builds on. |
| 4 | 3.7 (3–4) | -0.3 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review googleapis/google-cloud-dart#382, checking the status.code behavior change for JSON errors and the google_cloud_storage test note. |
| 5 | 4.0 (3–5) | -1.0 | 0.71 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string in ProtoEnum, toJson/toQueryValue sketch) with approval or changes so they can write the preliminary PR. |
| 6 | 18.3 (12–25) | +12.3 ⚠️ | 0.26 | 0/3 | dart-lang/http#2027 | B | No action needed now; this is a design discussion I opened that is waiting on maintainer input and a possible 2.0 breaking-release decision. |
| 7 | 7.7 (7–8) | +0.7 | 0.58 | 3/3 | dart-lang/http#1981 | B | Proceed with the implementation I announced 5 hours ago, since the feature is now my planned work and the contributor is awaiting a skeleton PR or my own changes. |
| 8 | 9.3 (9–10) | +1.3 | 0.55 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo's question about whether servers send incremental JSON, or check the Google API behavior, then decide whether to implement the SSE error-frame fix. |
| 9 | 10.3 (10–11) | +1.3 | 0.50 | 3/3 | dart-lang/sdk#59846 | B | Decide whether to fix the dart:io header-name validation (tighten the parser to RFC 9110 tchar) or unassign myself, since I'm assigned and nothing has happened in 22 months. |
| 10 | 12.7 (11–15) | +2.7 | 0.35 | 1/3 | googleapis/google-cloud-dart#361 | A | Decide whether to switch google_cloud_compute_v1 to discovery or add convenience extensions to the protobuf service operations, then reply to kevmoo's unanswered question from 16 days ago. |
| 11 | 27.3 (27–28) | +16.3 ⚠️ | 0.11 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed from me now; this is an old, unowned dart:io bug where I was only CC'd, and I could optionally assign someone to revive the abandoned CL. |
| 12 | 12.3 (11–14) | +0.3 | 0.33 | 3/3 | dart-lang/native#3752 | B | Finish and merge the in-progress fix in PR #3763 (scheduleInRunLoop support) and then close this issue. |
| 13 | 21.3 (19–25) | +8.3 | 0.17 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the librarian automation decision and the google_cloud_rpc version bump before updating the pubspec constraints in storage and pubsub. |
| 14 | 15.7 (15–16) | +1.7 | 0.22 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since the dart-ecosystem-team review request covers it and I'm a member of that team. |
| 15 | 17.7 (17–19) | +2.7 | 0.20 | 1/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which already fixes this issue, and then close the issue once the fix is merged. |
| 16 | 27.0 (24–29) | +11.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; nothing to do until about a week passes with no response, then ping again. |
| 17 | 8.0 (7–9) | -9.0 ⚠️ | 0.60 | 3/3 | googleapis/google-cloud-dart#359 | B | Start implementing the ServiceClient retry/RequestOptions work and the ServiceException FormatException hardening in google_cloud_rpc, since I'm assigned and it's my planned work. |
| 18 | 22.7 (22–23) | +4.7 | 0.12 | 0/3 | dart-lang/http#2031 | A | Wait for the stacked PRs #2010, #2014 and #2009 to be reviewed and merged, then review #2031 (I'm a requested reviewer). |
| 19 | 9.7 (3–13) | -9.3 ⚠️ | 0.51 | 3/3 | googleapis/google-cloud-dart#345 | A | Address the five unresolved Gemini review threads (nullable managedZones handling, test assertion, and Policies_UpdateRequest examples), fix the merge conflicts, and either finish or abandon this draft. |
| 20 | 24.3 (23–26) | +4.3 | 0.11 | 0/3 | dart-lang/core#1007 | B | Nothing for me yet: the PR is blocked on the author signing the CLA, and it is only a team review request in a repository I don't own. |
| 21 | 28.7 (21–33) | +7.7 | 0.09 | 1/3 | dart-lang/tools#2544 | B | Review jonasfj's UNC-path security PR in dart-lang/tools (dart-ecosystem-team request) or confirm lrhn is reviewing it, since the team review is shared and lrhn already has the item in progress. |
| 22 | 20.0 (16–22) | -2.0 | 0.15 | 0/3 | dart-lang/tools#2710 | B | Nothing for me now; wait for the team review of this stacked PR, and it sits behind the draft #2563 it is stacked on. |
| 23 | 28.0 (25–30) | +5.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them if there is still no response after about a week (around 2026-10-30). |
| 24 | 19.7 (17–24) | -4.3 | 0.19 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to confirm the non-PubSub parts are fine, or for natebosch to review; nothing blocking on me right now. |
| 25 | 29.3 (27–31) | +4.3 | 0.10 | 0/3 | dart-lang/http#579 | B | Wait for a semver-major release window to land the breaking API change; no immediate step for me beyond a possible reply to retendo's workaround question. |
| 26 | 14.0 (13–15) | -12.0 ⚠️ | 0.27 | 3/3 | dart-lang/http#1932 | B | Get PR #2034 reviewed and merged, then reply to igordanilovski's 'any updates?' with its status and a link to it. |
| 27 | 33.3 (32–34) | +6.3 | 0.04 | 0/3 | flutter/devtools#8223 | B | Nothing for me to do; the feature is blocked on dart:io network profiling work owned by the DevTools team, and I was only CC'd by bkonyi. |
| 28 | 33.7 (33–35) | +5.7 | 0.04 | 0/3 | dart-lang/http#1837 | A | Nothing to do; the issue is a contributions-welcome enhancement that I already declined to take on, and it is waiting on a community contributor. |
| 29 | 36.0 (36) | +7.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing for me; PR is approved and mergeable, waiting on mosuem or a maintainer to merge. |
| 30 | 34.7 (34–35) | +4.7 | 0.03 | 0/3 | dart-lang/http#1365 | A | Nothing for me to do; the only open question (is the root cause in http2?) is for the maintainers of dart-lang/http, and the issue is outside my stated scope for http2. |
| 31 | 17.7 (14–21) | -13.3 ⚠️ | 0.19 | 2/3 | dart-lang/tools#2715 | B | Review PR #2715 (kevmoo's string_scanner follow-up), since it was requested of dart-ecosystem-team and I'm a member; I'm the only team member acting on it so far. |
| 32 | 29.3 (28–31) | -2.7 | 0.08 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem (a usual collaborator) to review PR #2026, which they were asked to do in a comment yesterday; I'm not responsible for http2 and no review is requested of me. |
| 33 | 29.3 (26–32) | -3.7 | 0.09 | 0/3 | dart-lang/native#3653 | A | Nothing to do now; the issue is assigned to liamappelbe, who has said the larger change may not be worth it, and the related work is closed or merged. |
| 34 | 25.7 (20–31) | -8.3 | 0.11 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter (Keetz) to answer my questions about the client and server behavior; PR #1974 is already open and is being reviewed separately. |
| 35 | 20.0 (19–21) | -15.0 ⚠️ | 0.20 | 0/3 | dart-lang/http#1841 | B | Wait for agam1092005's PR #2002 to be reviewed; no action needed from me on this issue itself. |
| 36 | 6.3 (6–7) | -29.7 ⚠️ | 0.65 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's 24-day-old question offering a path to reproduce and investigate the intermittent Directory.deleteSync recursive failure, then start debugging it since I'm the assignee. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/tools#2715** (truth #31) in 1/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/http#1841** (truth #35) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an issue I created and am assigned to, and it has new security activity from 3 days ago: a report that possibly compromised eMudhra intermediate CAs remain trusted by Dart on Android. Security issues in my area outrank everything else, so it belongs at the top of the scale. Related issue #64644 was closed as completed two days ago, so the likely job is to verify the fix covers Android and answer the questions. Leaving this security issue in an unknown state is not acceptable.
- **Next action:** Check whether dart:io on Android honors the eMudhra intermediate CA blocklist mitigations (see sdk#64644, which is already closed as completed), then reply to the security question and close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR with an unanswered review question from a close collaborator (kevmoo) that identifies a real bug: the next generate would delete the newly created CHANGELOG.md. Since I'm blocking the PR on my reply, it sits in the 0.8-0.9 range. Freshness is high (kevmoo commented 21h ago), and the PR is in a repository I'm responsible for, with only one unresolved thread.
- **Next action:** Reply to kevmoo's inline question on bump.go about whether Bump should append CHANGELOG.md to lib.Keep or whether clean should auto-preserve it, then push the fix and re-request review.

### 3. googleapis/google-cloud-dart#376 → predicted 5, priority 0.70
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in a repository I am responsible for with no human reviewer yet, so I am the default reviewer and the next step is mine. The author is a close collaborator, which places it in the 0.65-0.8 reviewer range, and it was opened only 5 days ago. It is not higher because it is a pre-release polish PR stacked on a large unmerged streaming pull branch, and the bot review flagged potential hangs in the code it depends on.
- **Next action:** Review PR #376 (sigurdm's pre-release polish, no reviewer yet) in google-cloud-dart, or at least skim the gemini critical findings on the streaming pull code it builds on.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in google-cloud-dart, a repository on my responsibility list, so I am the default reviewer even though no one requested me. It fixes a real bug where ABORTED over REST was never retried, but it changes status.code for every JSON error that names a code, so it deserves a careful review. The author is a first-time contributor and the bot review does not count as a human review. It was opened 3 days ago, which keeps it fresh but not urgent, so it sits in the reviews-waiting-on-me band rather than the top.
- **Next action:** Review googleapis/google-cloud-dart#382, checking the status.code behavior change for JSON errors and the google_cloud_storage test note.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug in a repo I'm responsible for, and a contributor is waiting on my decision on the design sketch they posted 4 days ago. I had explicitly asked for a design before code, so the next step is mine and a contributor is blocked on it. Not a security issue, and the work is planned rather than urgent, so it sits in the 0.65–0.8 band near its lower end.
- **Next action:** Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string in ProtoEnum, toJson/toQueryValue sketch) with approval or changes so they can write the preliminary PR.

### 6. dart-lang/http#2027 → predicted 25, priority 0.12
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue in a repository I work in, filed 9 days ago with no replies since, so it is only a loose design note rather than committed planned work. The real next step (deciding whether to make close async for a 2.0 release) is blocked on a breaking-release plan and on collaborator input, so I can't act on it today. Freshness is modest and there is no new activity directed at me, so it sits in the low range.
- **Next action:** No action needed now; this is a design discussion I opened that is waiting on maintainer input and a possible 2.0 breaking-release decision.

### 7. dart-lang/http#1981 → predicted 8, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself and said I started working on this 5 hours ago, so it is my own committed work and the next step is mine. It is a feature request in dart-lang/http, a repo I work in, but I explicitly said I can't promise to accept the PR, so it isn't urgent. The issue is fresh (last activity today), placing it in the planned-work band rather than the top.
- **Next action:** Proceed with the implementation I announced 5 hours ago, since the feature is now my planned work and the contributor is awaiting a skeleton PR or my own changes.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I'm responsible for, filed by a close collaborator, with a clear next step for me: answer kevmoo's open question, which I've been asked and haven't yet followed up on. The mid-stream error handling part is a real correctness bug, but it isn't marked security and kevmoo says it isn't urgent. Freshness is moderate since my last comment was 17 days ago and kevmoo replied after it, so it sits in the planned-work range rather than the top.
- **Next action:** Reply to kevmoo's question about whether servers send incremental JSON, or check the Google API behavior, then decide whether to implement the SSE error-frame fix.

### 9. dart-lang/sdk#59846 → predicted 10, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am the assignee, so this is mine to fix or unassign, which places it in the assigned-issue band. It is a real interoperability and security-adjacent parser bug in widely used core library code, so it is not trivial. However, nothing has happened in roughly 22 months, no one is waiting on me, and there is no linked PR, so it sits at the stale end of the range. I'm not responsible for the wider dart-lang/sdk repository beyond my assignment, so I'll keep it mid-low.
- **Next action:** Decide whether to fix the dart:io header-name validation (tighten the parser to RFC 9110 tchar) or unassign myself, since I'm assigned and nothing has happened in 22 months.

### 10. googleapis/google-cloud-dart#361 → predicted 11, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is my own repository and a collaborator's issue, and the open question is mine: I asked kevmoo for a view on discovery versus convenience extensions and haven't received an answer. The next step is a design decision I can make and communicate, so it is actionable, but nothing has moved in 16 days and nobody is blocked on a deadline. That places it in the 0.35–0.5 range for recent questions in my own repositories, toward the lower end because it is aging.
- **Next action:** Decide whether to switch google_cloud_compute_v1 to discovery or add convenience extensions to the protobuf service operations, then reply to kevmoo's unanswered question from 16 days ago.

### 11. dart-lang/sdk#31275 → predicted 27, priority 0.12
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a 9-year-old bug in dart:io where I'm only mentioned via informational CCs, and no one is waiting on me for a response. The real work (reviving the abandoned CL 144346) is not blocked on me personally and is not in a repository I own. Because it crashes production servers, it sits above the bottom of the range, but it's not actionable right now.
- **Next action:** Nothing needed from me now; this is an old, unowned dart:io bug where I was only CC'd, and I could optionally assign someone to revive the abandoned CL.

### 12. dart-lang/native#3752 → predicted 12, priority 0.30
- **Ground truth:** 
- **Model:** This is my own issue filed 6 days ago in a repo I maintain, but an open PR (#3763, updated 2 days ago) already covers it, so the real work lives on the PR and the issue sits well below it. Nothing from anyone else is waiting on this issue itself. The remaining step is mine but is tracked through the PR, so it belongs in the 0.15-0.35 range.
- **Next action:** Finish and merge the in-progress fix in PR #3763 (scheduleInRunLoop support) and then close this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This is a checklist tracking issue for my own repository, and I am the one deciding the approach, so the next step is blocked on my own design call rather than anyone's reply. The actual work (bumping the google_cloud_rpc constraint) can't happen until the generated rpc version is bumped, which is not yet done. Activity is 17 days old and my last comment was a non-actionable musing, so it sits low in the range. The issue is in a repo I own and a collaborator filed it, so it stays above pure backlog.
- **Next action:** Wait for the librarian automation decision and the google_cloud_rpc version bump before updating the pubspec constraints in storage and pubsub.

### 14. dart-lang/tools#2719 → predicted 16, priority 0.20
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, a repository I'm not responsible for, and no specific other reviewer is named, so it falls in the 0.1–0.25 range for team requests in repos I don't own. It is an automated, low-risk routine bump with a health check that passed, so it's not urgent. It's only 19 hours old, so it gets no freshness penalty, but it stays low because the review is shared with the whole team.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since the dart-ecosystem-team review request covers it and I'm a member of that team.

### 15. googleapis/google-cloud-dart#381 → predicted 17, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue is covered by open PR #382 from the reporter, so the work sits on the PR rather than the issue. I only watch this repository, and nothing has been asked of me directly. Filed 3 days ago by a non-collaborator, with no new human activity, so it is low-priority but the fix does touch retry behaviour that could matter to the Firestore users affected.
- **Next action:** Review PR #382, which already fixes this issue, and then close the issue once the fix is merged.

### 16. dart-lang/http#2034 → predicted 29, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR and I requested a review from goderbauer only 2 days ago, so the next step belongs to the reviewer. The PR also covers issue #1932, which is assigned to me, so the work on that issue lives here. The PR is in a repository I watch, and the mergeable state is blocked only pending review. It stays low until about a week of silence, when a ping becomes worth a little more.
- **Next action:** Wait for goderbauer to review PR #2034; nothing to do until about a week passes with no response, then ping again.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue I'm assigned to in a repository I'm responsible for, filed by a close collaborator (kevmoo) with a clear scope. I already commented with retry research 10 days ago and narrowed scope, so the next step is mine. It's my planned work rather than blocking someone, and nothing new from others has arrived since my last comment, so it sits in the mid-range of planned work.
- **Next action:** Start implementing the ServiceClient retry/RequestOptions work and the ServiceException FormatException hardening in google_cloud_rpc, since I'm assigned and it's my planned work.

### 18. dart-lang/http#2031 → predicted 23, priority 0.12
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I'm a personally requested reviewer on this PR in dart-lang/http, but it is stacked on three open PRs, and #2014 has no review yet, so the lower PRs need attention first. The release prep is not blocked on me alone, and the base branch was force-pushed, so the stack is still in flux. It is a low-priority item for now, though it will need my review once the stack below it clears.
- **Next action:** Wait for the stacked PRs #2010, #2014 and #2009 to be reviewed and merged, then review #2031 (I'm a requested reviewer).

### 19. googleapis/google-cloud-dart#345 → predicted 13, priority 0.30
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I am responsible for, and the next step is mine since nobody else is blocked on it. It is 45 days stale with no activity since I converted it to draft, and its description is empty, so it falls in the own-draft range of 0.15-0.35. The unresolved review threads and merge conflicts are real work, but the draft status means nobody is waiting on it, so it stays near the lower-middle of the range.
- **Next action:** Address the five unresolved Gemini review threads (nullable managedZones handling, test assertion, and Policies_UpdateRequest examples), fix the merge conflicts, and either finish or abandon this draft.

### 20. dart-lang/core#1007 → predicted 24, priority 0.12
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** The review request went to dart-ecosystem-team, which I belong to, but dart-lang/core is a repository I'm not responsible for, so it counts as a shared team request rather than one addressed to me. The google-cla bot reports the author has not signed the CLA and the merge state is blocked, so the work is waiting on the contributor. It is also 15 days old with no human activity since the review request. It stays visible at the low end of the range in case the CLA clears and the team picks it up.
- **Next action:** Nothing for me yet: the PR is blocked on the author signing the CLA, and it is only a team review request in a repository I don't own.

### 21. dart-lang/tools#2544 → predicted 21, priority 0.20
- **Ground truth:** 
- **Model:** This is a security-relevant PR, but the review request went to dart-ecosystem-team rather than me personally, and I'm not responsible for dart-lang/tools as a repository. Lrhn is already driving the review with substantive feedback and the author has been responding, so my personal next step is minimal. Stale for two months with no activity since 2026-08-26 suggests it is waiting on the author to address lrhn's latest comments; I should monitor rather than act.
- **Next action:** Review jonasfj's UNC-path security PR in dart-lang/tools (dart-ecosystem-team request) or confirm lrhn is reviewing it, since the team review is shared and lrhn already has the item in progress.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.12
- **Ground truth:** 
- **Model:** This is a PR in dart-lang/tools, a repository I am not responsible for, where I was only asked via the dart-ecosystem-team review request. Team requests in repositories I don't own rate low, and the PR is also stacked on a draft PR (#2563) that has not been reviewed. Its only other activity is an author's commit and a bot review, so nothing is waiting on me.
- **Next action:** Nothing for me now; wait for the team review of this stacked PR, and it sits behind the draft #2563 it is stacked on.

### 23. dart-lang/native#3763 → predicted 30, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR in dart-lang/native, a repository I work in, and I explicitly requested a review from liamappelbe only 2 days ago. Nothing is blocked on me until the reviewer responds, and the PR is mergeable_state blocked only pending review. Because it is still inside the one-week window for a reviewer I recently asked, it belongs in the 0.05–0.15 range.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them if there is still no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 18, priority 0.20
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR and it is already APPROVED by sigurdm, so the review decision is in good shape. I last asked sigurdm a direct question 4 days ago, and he has not replied on the non-PubSub parts yet, so I am waiting on him. Natebosch is assigned and requested but has not reviewed, and I explicitly agreed with him on the export question, so there is no open review feedback for me to answer. Two inline threads are unresolved but I already replied to them, so a light check on those threads is the only small thing I could do.
- **Next action:** Wait for sigurdm to confirm the non-PubSub parts are fine, or for natebosch to review; nothing blocking on me right now.

### 25. dart-lang/http#579 → predicted 31, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR is blocked by the next-breaking-release label and my own prior comment that landing it needs a major version bump I don't have bandwidth for. The most recent activity is a question from retendo about a workaround, which doesn't change the blocked state. The PR is in a repo I'm responsible for, but since it is blocked by a future breaking release, it sits in the low range.
- **Next action:** Wait for a semver-major release window to land the breaking API change; no immediate step for me beyond a possible reply to retendo's workaround question.

### 26. dart-lang/http#1932 → predicted 15, priority 0.25
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by my open PR #2034, which is where the work is, so the issue itself ranks well below the PR. Someone asked for an update four days ago, but that is a status question and the real work is in the PR. The issue is assigned to me, so I should keep it moving through the PR and reply to the reporter. It is not urgent, since the upstream Play Services dependency issue is blocking a full fix.
- **Next action:** Get PR #2034 reviewed and merged, then reply to igordanilovski's 'any updates?' with its status and a link to it.

### 27. flutter/devtools#8223 → predicted 34, priority 0.04
- **Ground truth:** 
- **Model:** I'm only an informational CC from bkonyi in a flutter/devtools issue outside my repositories, and the next step belongs to the DevTools team. The issue is a 2-year-old, high-cost feature request with no question directed at me. Srawlins' recent label change is housekeeping, not a request for me. Priority stays at the bottom of the scale.
- **Next action:** Nothing for me to do; the feature is blocked on dart:io network profiling work owned by the DevTools team, and I was only CC'd by bkonyi.

### 28. dart-lang/http#1837 → predicted 33, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a feature request in dart-lang/http, a repository I'm responsible for, but it is labelled contributions-welcome and P3 and I already replied that the Dart team is unlikely to take it on. Nothing has happened in a year and no one has asked me anything, so it is old low-priority backlog. The author is a stranger and has no mention of me, so it sits at the bottom of its range.
- **Next action:** Nothing to do; the issue is a contributions-welcome enhancement that I already declined to take on, and it is waiting on a community contributor.

### 29. dart-lang/http#2033 → predicted 36, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already approved this PR 2 days ago, no author activity has followed, and the review decision is APPROVED with clean mergeability. Per my rules an approved and quiet PR is effectively done on my side, so it sits near zero. The only remaining step is a merge by the author, which is not mine to do.
- **Next action:** Nothing for me; PR is approved and mergeable, waiting on mosuem or a maintainer to merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.03
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I am only watching dart-lang/http and have explicitly noted I am not responsible for http2, which is the package this issue concerns. The last human activity was a question from lubritto 8 months ago about closing the issue, and the work it needs lies in the SDK socket layer (dart-lang/sdk#48210) rather than with me. Nothing has been directed at me and the thread is stale, so it sits at the bottom of the scale.
- **Next action:** Nothing for me to do; the only open question (is the root cause in http2?) is for the maintainers of dart-lang/http, and the issue is outside my stated scope for http2.

### 31. dart-lang/tools#2715 → predicted 14, priority 0.25
- **Ground truth:** 
- **Model:** The PR is in dart-lang/tools, a repository I'm not listed as responsible for, and the review was requested from a team I belong to rather than from me personally, which by the rules caps it in the 0.1–0.25 team-review band. The author is a close collaborator and the change is a bounds-validation fix in a widely used package, so it sits at the top of that band. Review requests to davidmorgan are also named, which pushes it toward near zero, but the review is not yet done by him and the activity is only two days old. I'll keep it at the upper end of the team band.
- **Next action:** Review PR #2715 (kevmoo's string_scanner follow-up), since it was requested of dart-ecosystem-team and I'm a member; I'm the only team member acting on it so far.

### 32. dart-lang/http#2026 → predicted 28, priority 0.10
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is a first-time contributor's PR in http2, a subpackage I explicitly said I'm not responsible for, and nobody has asked me personally to act. The author pinged mosuem about 1 day ago, so the next step belongs to mosuem and it's too early to chase. It fixes issue #2021, which is not mine, and the CLA is now signed, so nothing is blocking on my side.
- **Next action:** Wait for mosuem (a usual collaborator) to review PR #2026, which they were asked to do in a comment yesterday; I'm not responsible for http2 and no review is requested of me.

### 33. dart-lang/native#3653 → predicted 32, priority 0.08
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is in dart-lang/native, a repo I'm only a commenter in, and its assignee has already reached a conclusion that the approach is likely not worth pursuing. My last comment was over a month ago and nothing is directed at me or waiting on me. The linked autorelease-pool issue is closed and the PR is merged, so the work has moved on, leaving this as a low-value open item.
- **Next action:** Nothing to do now; the issue is assigned to liamappelbe, who has said the larger change may not be worth it, and the related work is closed or merged.

### 34. dart-lang/http#1972 → predicted 26, priority 0.12
- **Ground truth:** 
- **Model:** I asked the reporter two questions 8 days ago and labeled the issue needs-info, so the next step belongs to Keetz. An open PR #1974 claims to fix this, so the issue itself is covered by that PR, which pulls it lower. The issue is in dart-lang/http, where I'm only a commenter and I'm not responsible for http2, and the reporter is not a collaborator, so it sits near the bottom of the range.
- **Next action:** Wait for the reporter (Keetz) to answer my questions about the client and server behavior; PR #1974 is already open and is being reviewed separately.

### 35. dart-lang/http#1841 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** An open PR (#2002) already covers this issue, so the work lives there and the issue should rank below it. The issue is labelled next-breaking-release, which blocks it, and I asked an earlier question that agam1092005 has since answered with a non-breaking design. I'm only a commenter in dart-lang/http, which I'm not responsible for in the http2 area, and the thumbs-down sets a low floor unless something directed at me happens.
- **Next action:** Wait for agam1092005's PR #2002 to be reviewed; no action needed from me on this issue itself.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.62
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am the assignee on an issue in the dart-lang/sdk repo, which I work in, and filiph has asked whether he can help hunt the bug, a direct question that needs a reply. The reproduction is now available, and a related commit landed 4 days ago, so verifying whether it fixed the problem is also mine. It is a non-security bug with no open PR, but it is old and I have an assignment with stale ownership, so it sits in the middle of the planned-work range rather than the top.
- **Next action:** Reply to filiph's 24-day-old question offering a path to reproduce and investigate the intermittent Directory.deleteSync recursive failure, then start debugging it since I'm the assignee.
