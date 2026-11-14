# Gitilizer eval: v5-claude-haiku

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5.md` · signals `True` · 3 trial(s) · 36 items · 20261108-025042

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.583 ± 0.043 |
| spearman | 0.714 ± 0.035 |
| pairwise_acc | 0.792 ± 0.022 |
| ndcg | 0.971 ± 0.004 |
| ndcg@5 | 0.981 ± 0.032 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.933 ± 0.115 |
| top10_overlap | 0.700 ± 0.100 |
| mean_abs_displacement | 5.315 ± 0.644 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.778 ± 0.058 | 0.993 ± 0.004 | 0.933 ± 0.115 | 1.375 ± 0.375 |
| B | 20 | 0.389 ± 0.056 | 0.909 ± 0.002 | 0.533 ± 0.115 | 4.133 ± 0.493 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 3/3 | dart-lang/sdk#48056 | A | Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist mitigations (related issue #64644 is already closed as completed), then reply to the security concern and close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review question on bump.go about CHANGELOG.md being deleted by generate, choosing whether Bump appends it to lib.Keep or clean auto-preserves it, then push a fix. |
| 3 | 3.3 (3–4) | +0.3 | 0.73 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (sigurdm's pubsub release polish) since no human has reviewed it yet and it is in a repo I'm responsible for. |
| 4 | 4.3 (3–5) | +0.3 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 from first-time contributor quaaantumdev, which fixes issue #381 in google_cloud_rpc, since no human has reviewed it yet. |
| 5 | 5.0 (4–6) | +0.0 | 0.71 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string in ProtoEnum, toJson/toQueryValue sketch) to confirm the approach or request changes before a PR is written. |
| 6 | 16.7 (9–22) | +10.7 ⚠️ | 0.32 | 1/3 | dart-lang/http#2027 | B | Wait for a breaking-release decision (2.0) and then implement the async close change; nothing is blocking on anyone else right now. |
| 7 | 7.7 (7–9) | +0.7 | 0.60 | 3/3 | dart-lang/http#1981 | B | Continue the in-progress implementation of the serverTrustEvaluator hook in CupertinoClient and check whether umair9430 has opened a skeleton PR yet. |
| 8 | 10.3 (9–11) | +2.3 | 0.58 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo's open question by checking whether Google APIs actually send incremental JSON arrays, then decide whether to fix the mid-stream SSE error handling, which is a real bug. |
| 9 | 11.7 (10–13) | +2.7 | 0.47 | 3/3 | dart-lang/sdk#59846 | B | Triage this issue: decide whether to fix the dart:io HTTP header-name validation (restrict to RFC 9110 tchar) or close it as out of scope, since I am the assignee. |
| 10 | 12.7 (12–13) | +2.7 | 0.40 | 2/3 | googleapis/google-cloud-dart#361 | A | Decide between switching Compute to discovery and adding convenience extensions to the protobuf service operations, then reply on the issue, since my question from 16 days ago is still unanswered. |
| 11 | 15.7 (14–17) | +4.7 | 0.28 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed from me now; the fix was abandoned with its original owner, so this only waits on someone taking over the dart:io library ownership. |
| 12 | 14.7 (12–18) | +2.7 | 0.28 | 3/3 | dart-lang/native#3752 | B | Review and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, which is the real work that resolves this issue. |
| 13 | 17.7 (14–23) | +4.7 | 0.25 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump and librarian automation decision before adding the pubspec constraints. |
| 14 | 18.3 (18–19) | +4.3 | 0.20 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools (requested via dart-ecosystem-team, which I belong to). |
| 15 | 16.0 (15–17) | +1.0 | 0.25 | 3/3 | googleapis/google-cloud-dart#381 | A | Review the linked PR #382 that fixes this issue, since the fix is already submitted and waiting on a reviewer. |
| 16 | 27.0 (24–29) | +11.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; ping them again if there is no response by about 2026-10-30. |
| 17 | 8.3 (7–10) | -8.7 | 0.59 | 3/3 | googleapis/google-cloud-dart#359 | B | Wrap the JSON decode in ServiceException.fromHttpResponse with a FormatException fallback, then wire RetryRunner into ServiceClient._makeRequest. |
| 18 | 17.7 (4–27) | -0.3 | 0.31 | 2/3 | dart-lang/http#2031 | A | Review this release-prep PR, noting it is stacked on #2010, #2014 and #2009 and that #2014 is still awaiting my review first. |
| 19 | 15.7 (15–17) | -3.3 | 0.28 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish or abandon this draft DNS PR, starting with the five unresolved Gemini review threads on compile and runtime errors. |
| 20 | 23.0 (20–28) | +3.0 | 0.15 | 0/3 | dart-lang/core#1007 | B | Wait for the dart-ecosystem-team to review; the contributor still needs to sign the CLA before it can be reviewed. |
| 21 | 24.0 (21–26) | +3.0 | 0.17 | 3/3 | dart-lang/tools#2544 | B | Review the PR's current state from jonasfj's latest push, since lrhn's last review (Aug 26) left several inline requests; I'm only a team-level reviewer here, so check whether lrhn's feedback is fully addressed before I weigh in. |
| 22 | 24.0 (20–26) | +2.0 | 0.14 | 0/3 | dart-lang/tools#2710 | B | Wait for the dart-ecosystem-team review; the PR is stacked on draft #2563 and that team review request is outside a repository I'm responsible for. |
| 23 | 28.0 (25–30) | +5.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR dart-lang/native#3763; ping them if there is no response by about 2026-10-30. |
| 24 | 22.7 (21–24) | -1.3 | 0.15 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for natebosch's review (or sigurdm's confirmation on the non-PubSub parts) before merging; I could check the two unresolved review threads and the mergeable 'behind' state meanwhile. |
| 25 | 31.7 (31–32) | +6.7 | 0.09 | 0/3 | dart-lang/http#579 | B | Wait for a future semver-major release of package:http; nothing to do now except optionally reply to retendo's workaround question. |
| 26 | 9.7 (8–11) | -16.3 ⚠️ | 0.53 | 3/3 | dart-lang/http#1932 | B | Review and merge PR #2034 (fix(cronet): avoid cronet namespace duplication), which I authored, and reply to igordanilovski with the status. |
| 27 | 31.0 (23–36) | +4.0 | 0.06 | 0/3 | flutter/devtools#8223 | B | Nothing for me to do; waiting on the DevTools team to decide on the high-cost WebSocket profiling design. |
| 28 | 33.0 (32–34) | +5.0 | 0.06 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a contributions-welcome P3 enhancement I already declined to take on, with no activity in a year. |
| 29 | 35.3 (35–36) | +6.3 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing for me; I already approved and the PR is clean and waiting on mosuem to merge. |
| 30 | 35.0 (34–36) | +5.0 | 0.03 | 0/3 | dart-lang/http#1365 | A | Nothing for me to do; this is a stale, unassigned performance enhancement in http2, which I'm not responsible for, with an open question from lubritto about closing it that belongs to the http2 owners. |
| 31 | 23.0 (19–28) | -8.0 | 0.14 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan (requested directly) or dart-ecosystem-team to review PR #2715; nothing for me to do yet. |
| 32 | 32.3 (31–33) | +0.3 | 0.07 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem (or another http2 maintainer) to review PR #2026; I am not responsible for http2 and no review is requested of me. |
| 33 | 23.0 (20–25) | -10.0 ⚠️ | 0.17 | 0/3 | dart-lang/native#3653 | A | Nothing for me to do now; liamappelbe is weighing whether to pursue a larger change or wrap objc_msgSend calls in autorelease pools instead. |
| 34 | 28.0 (27–30) | -6.0 | 0.11 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions (which client, and whether the server sends Content-Length without a body), while tracking PR #1974 which fixes this. |
| 35 | 30.0 (29–31) | -5.0 | 0.10 | 0/3 | dart-lang/http#1841 | B | Wait for agam1092005's PR #2002 to be reviewed; the issue itself is covered by that open PR and labeled next-breaking-release. |
| 36 | 6.7 (6–8) | -29.3 ⚠️ | 0.65 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's 24d-old comment offering a concrete repro and pointers, then start investigating the intermittent Directory.deleteSync recursive failure, since I'm the assignee. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/tools#2715** (truth #31) in 1/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an issue I created and am assigned to, and it has fresh security activity (a report of compromised intermediate CAs and a direct question to the team) raised 3 days ago. Per the security rules, any new activity on my security-related issue scores at the top of the scale, and confirming the state of trust and closing the issue is my job. Related issue #64644 was closed recently, which suggests a fix may already exist but must be verified rather than assumed.
- **Next action:** Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist mitigations (related issue #64644 is already closed as completed), then reply to the security concern and close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR in a repository I am responsible for, and a collaborator (kevmoo) left an unanswered question with a concrete bug (the next generate deletes the new CHANGELOG.md). Per the rules, my own PR with unanswered review feedback sits in the 0.8–0.9 blocking range. It is not security-related, and it is fresh (kevmoo commented 21h ago), so it lands near the top of that range.
- **Next action:** Reply to kevmoo's review question on bump.go about CHANGELOG.md being deleted by generate, choosing whether Bump appends it to lib.Keep or clean auto-preserves it, then push a fix.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in googleapis/google-cloud-dart, a repository I am responsible for, and nobody has reviewed it yet apart from a bot, so I am the default reviewer. The author is a close collaborator, which puts it near the top of the review tier. It is mergeable-behind and not blocked by a label, so it is actionable now. It is not at the top of the range because it is 5 days old and the gemini bot's feedback concerns a different PR's code in the streaming work, and the diff itself is mostly packaging and polish.
- **Next action:** Review PR #376 (sigurdm's pubsub release polish) since no human has reviewed it yet and it is in a repo I'm responsible for.

### 4. googleapis/google-cloud-dart#382 → predicted 5, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** I watch this repository and am its default reviewer, and no human has reviewed this PR, so the review is on me. It is a fix for a retry bug that stops ABORTED errors being retried over REST, which matters, but it is not a security issue. It is from a first-time contributor, and the change alters status.code for JSON errors, so it needs careful review. The PR is only three days old, so it sits in the upper part of the review range rather than the top.
- **Next action:** Review PR #382 from first-time contributor quaaantumdev, which fixes issue #381 in google_cloud_rpc, since no human has reviewed it yet.

### 5. googleapis/google-cloud-dart#252 → predicted 6, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own issue in a repository I am responsible for, and the contributor has posted a concrete design that asks for agreement, so the next step is mine. The latest comment came 4 days ago and is directed at the design I asked for, and I explicitly wanted approach agreement before code was written. It is a p2 bug rather than a security issue, so it sits in the 0.65–0.8 range for a contributor waiting on my reply, placed near the lower end because the design is not yet blocking anyone's work.
- **Next action:** Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string in ProtoEnum, toJson/toQueryValue sketch) to confirm the approach or request changes before a PR is written.

### 6. dart-lang/http#2027 → predicted 22, priority 0.20
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue filed 9 days ago in dart-lang/http, a repository I work in, so it is planned work, but it describes a design question that depends on a future 2.0 breaking release rather than a concrete step I can take today. Nobody else has responded and there is no new activity directed at me. Its priority sits in the low range because it is blocked by a release plan, not because it is unimportant.
- **Next action:** Wait for a breaking-release decision (2.0) and then implement the async close change; nothing is blocking on anyone else right now.

### 7. dart-lang/http#1981 → predicted 9, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself and said I started working on it five hours ago, so this is my own committed work that is fresh and in a repository I maintain. It is not security-related and no one is blocking me, so it sits in the planned-work range rather than the top. Since the author was asked for a skeleton PR and has not responded, there is no outside dependency holding it up.
- **Next action:** Continue the in-progress implementation of the serverTrustEvaluator hook in CupertinoClient and check whether umair9430 has opened a skeleton PR yet.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.60
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a non-security issue in a repository I'm responsible for, filed by a close collaborator, with a clear next step for me: answer kevmoo's question about server behavior. kevmoo says it isn't urgent, and the SSE error-frame problem is a real correctness bug that deserves attention. Since my last comment was 17 days ago and kevmoo replied after it, the question is waiting on me, so it sits in the 0.5-0.65 planned-work range but not near the top.
- **Next action:** Reply to kevmoo's open question by checking whether Google APIs actually send incremental JSON arrays, then decide whether to fix the mid-stream SSE error handling, which is a real bug.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.45
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm the assignee, so the issue is technically mine, but it has been untouched for about 22 months with no activity directed at me since assignment. It is a real bug in widely used dart:io code with interoperability and proxy-smuggling implications, so it is not trivial. It is not in my listed repositories and has no recent activity, so it sits in the middle of the range rather than high.
- **Next action:** Triage this issue: decide whether to fix the dart:io HTTP header-name validation (restrict to RFC 9110 tchar) or close it as out of scope, since I am the assignee.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a repository I'm responsible for, filed by a close collaborator (kevmoo), and the open question is one I raised myself. kevmoo hasn't answered my 2026-10-09 question, so the thread is waiting partly on them, but the design decision and reply are mine to make. It has been quiet for 16 days and the work it describes is not blocking anything else, so it sits in the middle of the 0.35–0.5 range rather than higher.
- **Next action:** Decide between switching Compute to discovery and adding convenience extensions to the protobuf service operations, then reply on the issue, since my question from 16 days ago is still unanswered.

### 11. dart-lang/sdk#31275 → predicted 17, priority 0.25
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a crash-level bug in dart:io HttpClient affecting production, and kevmoo (a usual collaborator) asked for it to be picked up, so it has real importance. However, I'm only CC'd on a stale thread from 2024 with no new activity in the last 20 months, and there is no open PR or owner to act on. The next step is an ownership decision in the SDK repo, which is not something I can do today, so it sits in the 0.35-0.5 CC range but drops toward the bottom because it is old and not in a repo I'm responsible for.
- **Next action:** Nothing needed from me now; the fix was abandoned with its original owner, so this only waits on someone taking over the dart:io library ownership.

### 12. dart-lang/native#3752 → predicted 14, priority 0.30
- **Ground truth:** 
- **Model:** This is my own issue, filed 6 days ago in a package I work on, and I'm assigned to it, so it's fresh planned work. However, an open PR (#3763, by me, updated 2 days ago) already covers the fix, so the issue itself has nothing further to do and per the duplicate rule it ranks well below its PR. The issue sits in the 0.15-0.35 range for items covered by a PR, and I should act on the PR rather than the issue.
- **Next action:** Review and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, which is the real work that resolves this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 23, priority 0.20
- **Ground truth:** 
- **Model:** This is a blocked checklist item in a repository I own, where I'm the one who last commented and am deciding on a general fix. The concrete pubspec changes depend on the google_cloud_rpc release that hasn't happened yet, so there's no immediate step for me. Nothing new has arrived in 17 days, but the release risk to google_cloud_storage and pubsub is real, so it stays visible in the low range.
- **Next action:** Wait for the generated google_cloud_rpc version bump and librarian automation decision before adding the pubspec constraints.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is a bot-authored PR in dart-lang/tools, a repository I'm not listed as responsible for, and the review request went to a team I belong to rather than to me personally. Per the team review rule for repositories I don't own, it sits in the 0.1–0.25 range. It is fresh (19h) and has no human activity yet, so it sits near the top of that range rather than the bottom.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools (requested via dart-ecosystem-team, which I belong to).

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is covered by open PR #382, so the PR is the item to act on and the issue itself ranks well below it. The issue is in a repository I watch but do not own as a maintainer, and the author is a first-time contributor with no collaborator association. The issue was filed three days ago with only bot activity since, so it sits in the 0.15–0.35 range for issues with a covering PR.
- **Next action:** Review the linked PR #382 that fixes this issue, since the fix is already submitted and waiting on a reviewer.

### 16. dart-lang/http#2034 → predicted 28, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR and I requested a review from goderbauer only 2 days ago, so nothing is due from me until roughly a week passes. It is in a repository I work on and fixes issue #1932, which is assigned to me, so it is worth keeping visible. The PR is still in a sensible range, but it is blocked on a reviewer I recently asked.
- **Next action:** Wait for goderbauer to review PR #2034; ping them again if there is no response by about 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 7, priority 0.62
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is assigned to me in a repository I own and was filed by a close collaborator (kevmoo) with a clear next step, so it sits in the planned-work range. I already engaged on it 10 days ago and trimmed its scope, so the work is mine to do now. The FormatException bug means HTML 502/503/504 responses bypass retries entirely, which makes the first step a worthwhile fix near the top of this range. Nothing outside my control is blocking it.
- **Next action:** Wrap the JSON decode in ServiceException.fromHttpResponse with a FormatException fallback, then wire RetryRunner into ServiceClient._makeRequest.

### 18. dart-lang/http#2031 → predicted 4, priority 0.70
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR explicitly requests my review and sits in dart-lang/http, where I am a watcher but not responsible for http2, and the stacking means it cannot merge until #2014 (which also requests my review) and its lower PRs are handled. The author is a close collaborator and the change is a small version bump, so it is quick to review, but it is blocked by the stack and not something I should prioritize above my own repositories' items. Freshness is moderate (3 days old, force-pushed base) and the review is directly requested of me personally, which keeps it above the low range.
- **Next action:** Review this release-prep PR, noting it is stacked on #2010, #2014 and #2009 and that #2014 is still awaiting my review first.

### 19. googleapis/google-cloud-dart#345 → predicted 15, priority 0.30
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft in a repository I own, untouched for 45 days, with a dirty merge state and five unresolved review threads. Per the rules it is my own draft to finish or abandon, which sits in the 0.15-0.35 range. Nothing is waiting on anyone else, so it is actionable, but it is stale and not blocking anyone, so it stays near the lower end of its range.
- **Next action:** Decide whether to finish or abandon this draft DNS PR, starting with the five unresolved Gemini review threads on compile and runtime errors.

### 20. dart-lang/core#1007 → predicted 20, priority 0.20
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, which I don't own, and the review request went to a team I belong to, so it is shared rather than addressed to me personally; that puts it in the 0.1–0.25 team-review band. The PR is also blocked by the unsigned CLA and mergeable_state is blocked, so there is nothing I can usefully do now. It fixes issue #537, which is open, so it's a reasonable item to track but low on my list.
- **Next action:** Wait for the dart-ecosystem-team to review; the contributor still needs to sign the CLA before it can be reviewed.

### 21. dart-lang/tools#2544 → predicted 25, priority 0.20
- **Ground truth:** 
- **Model:** This is a security-relevant PR, but it is in dart-lang/tools, a repository I don't own, and the review request only went to dart-ecosystem-team, which I belong to, so it is shared rather than addressed to me personally. Under the rules, a team review request in a repository I don't own sits in 0.1–0.25, and the PR is already being actively reviewed by lrhn with a pending round of changes from the author, so my role is minor. Security does not get the top-tier boost because it is not mine and someone else is driving it.
- **Next action:** Review the PR's current state from jonasfj's latest push, since lrhn's last review (Aug 26) left several inline requests; I'm only a team-level reviewer here, so check whether lrhn's feedback is fully addressed before I weigh in.

### 22. dart-lang/tools#2710 → predicted 26, priority 0.12
- **Ground truth:** 
- **Model:** This PR is in dart-lang/tools, which is not one of my responsible repositories, and the only review request is to dart-ecosystem-team, a team I belong to, so it is not addressed to me personally. It is also stacked on draft PR #2563, which has no reviewers yet, so the lower PR must move first. The author is a close collaborator, but nothing is waiting on me. The activity is only two days old, so the signal is fresh but not actionable.
- **Next action:** Wait for the dart-ecosystem-team review; the PR is stacked on draft #2563 and that team review request is outside a repository I'm responsible for.

### 23. dart-lang/native#3763 → predicted 29, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, and I requested review from liamappelbe only 2 days ago, so nothing is due from me until roughly a week of silence has passed. The PR is in a repository I am responsible for and fixes two open issues, so it is worth tracking, but the review is blocking on the reviewer. Mergeable state is blocked and review is required, which confirms the next step belongs to the reviewer.
- **Next action:** Wait for liamappelbe to review PR dart-lang/native#3763; ping them if there is no response by about 2026-10-30.

### 24. googleapis/google-cloud-dart#373 → predicted 21, priority 0.20
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, approved by sigurdm, but the remaining review requested is from natebosch, whom I recently asked and who has a heavy load; I already pinged sigurdm 4 days ago, so the next step is waiting. There are 2 unresolved threads and the branch is behind main, so a small housekeeping step (update branch, resolve threads) is possible but not blocking anyone. Since it is my PR waiting on a reviewer I recently asked, it sits in the low range rather than the mid range.
- **Next action:** Wait for natebosch's review (or sigurdm's confirmation on the non-PubSub parts) before merging; I could check the two unresolved review threads and the mergeable 'behind' state meanwhile.

### 25. dart-lang/http#579 → predicted 32, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** I'm a requested reviewer, but the PR is explicitly labeled next-breaking-release and I previously said I lack bandwidth to coordinate the breaking change, so it is blocked on a future major version. The only recent activity is a 14-month-old question from retendo, which doesn't make it actionable. I'm not responsible for http2, but this is in the http package, which I do own, so it stays visible in the low range rather than near zero.
- **Next action:** Wait for a future semver-major release of package:http; nothing to do now except optionally reply to retendo's workaround question.

### 26. dart-lang/http#1932 → predicted 10, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned, and a linked PR (#2034) that I wrote is open and was updated 2 days ago, so the real work is there and my next step is to move it forward. Community members are asking for updates, and igordanilovski's 4-day-old question is the latest human activity. The issue is in dart-lang/http, which I'm only partly responsible for (not http2), and it is a non-security bug affecting a fair number of users. Since the fix PR exists and is mine, this is my own planned work rather than something blocked on a reviewer, so it sits in the 0.5-0.65 band.
- **Next action:** Review and merge PR #2034 (fix(cronet): avoid cronet namespace duplication), which I authored, and reply to igordanilovski with the status.

### 27. flutter/devtools#8223 → predicted 36, priority 0.03
- **Ground truth:** 
- **Model:** I was only cc'd by bkonyi in a 2024 informational comment, and this is a feature request in flutter/devtools, a repository I am not responsible for. Nobody has asked me to act, and the work is blocked by a 'cost: high' label that srawlins just removed without a clear plan. Activity is recent but not directed at me, so it stays near the bottom of the scale.
- **Next action:** Nothing for me to do; waiting on the DevTools team to decide on the high-cost WebSocket profiling design.

### 28. dart-lang/http#1837 → predicted 33, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** The issue is in dart-lang/http, a repository I am responsible for, but the next step belongs to a community contributor since it is labeled contributions-welcome and I already responded that the Dart team is unlikely to take it on. There has been no activity for about 12 months and no mention of me, so it sits at the bottom of the contributions-welcome backlog range. The related flutter issue is in another repository and does not change what I need to do.
- **Next action:** Nothing to do; this is a contributions-welcome P3 enhancement I already declined to take on, with no activity in a year.

### 29. dart-lang/http#2033 → predicted 35, priority 0.03
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2 days ago with no author activity since, and it is mergeable with no unresolved threads. The remaining step is the author or a maintainer merging it, which is not mine to do. It is a CI infrastructure change from a close collaborator, so it stays near zero rather than rising to the review tier.
- **Next action:** Nothing for me; I already approved and the PR is clean and waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 34, priority 0.04
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is an old enhancement request about http2 performance, and the repository note says I am not responsible for http2. The only recent activity is lubritto's question from 8 months ago asking whether the issue should be closed, and nothing has been directed at me. The root cause appears to lie in the socket layer (linked sdk#48210), which belongs to other owners. It sits at the bottom of the scale because nothing is expected from me.
- **Next action:** Nothing for me to do; this is a stale, unassigned performance enhancement in http2, which I'm not responsible for, with an open question from lubritto about closing it that belongs to the http2 owners.

### 31. dart-lang/tools#2715 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This is a collaborator's PR in dart-lang/tools, which I am not responsible for, and I was only requested via the dart-ecosystem-team team, which is a shared team review request in a repo I don't own, so it sits in the 0.1–0.25 band. davidmorgan was also requested personally, so someone else is clearly the primary reviewer. The PR is fresh (2 days old) with a recent follow-up commit, but no action is on me now.
- **Next action:** Wait for davidmorgan (requested directly) or dart-ecosystem-team to review PR #2715; nothing for me to do yet.

### 32. dart-lang/http#2026 → predicted 31, priority 0.08
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is a first-time contributor's PR in dart-lang/http, a repo I only watch, and the http2 package is explicitly outside my responsibility. The author asked mosuem, a close collaborator, for a review one day ago, so the ball is in their court and nothing is due from me for roughly a week. The fix is related to issue #2021, which is covered by this PR, so the issue itself is not separate work for me.
- **Next action:** Wait for mosuem (or another http2 maintainer) to review PR #2026; I am not responsible for http2 and no review is requested of me.

### 33. dart-lang/native#3653 → predicted 24, priority 0.20
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is actively driving it, and the last comment is from liamappelbe with no request directed at me. The related PR #3664 was merged but reportedly does nothing, so the issue is open with no clear next step for me. Since I'm only a commenter here and have no pending question, it sits in the low range, but I did raise the original related issue #3652 and may need to verify the final approach later.
- **Next action:** Nothing for me to do now; liamappelbe is weighing whether to pursue a larger change or wrap objc_msgSend calls in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 27, priority 0.12
- **Ground truth:** 
- **Model:** I asked the reporter for information and labeled it needs-info 8 days ago, and they haven't replied, so nothing is on me until they do. A linked open PR (#1974) already attempts the fix, so the issue itself is covered and ranks below that PR. The reporter is a non-collaborator with no mentions of me, and the issue is in http package code I'm responsible for, but the blocking state puts it in the low range.
- **Next action:** Wait for Keetz to answer my questions (which client, and whether the server sends Content-Length without a body), while tracking PR #1974 which fixes this.

### 35. dart-lang/http#1841 → predicted 30, priority 0.10
- **Ground truth:** 
- **Model:** An open PR (#2002) by agam1092005 already addresses this issue, so the issue is covered and the work is not mine to do now. The issue carries the next-breaking-release label, and I previously thumbs-downed it on 2026-10-05; the only later activity is agam's comment and commit references, which are not directed at me as a required action. I'm mentioned, but the work is in a repo where I'm only an interested watcher, and the http2 scope note doesn't apply here.
- **Next action:** Wait for agam1092005's PR #2002 to be reviewed; the issue itself is covered by that open PR and labeled next-breaking-release.

### 36. dart-lang/sdk#38148 → predicted 8, priority 0.62
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm the assignee on this P2 issue in dart-lang/sdk, a repo I'm not the owner of but where I have an assignment, so it's a commitment I should either fix or unassign. filiph asked how to help and reproduced it on a recent SDK, and a copybara commit referencing it landed 4 days ago, which may be relevant to verifying the state. Activity is recent-ish but filiph's comment is 24 days old and nothing directed at me has happened since my thumbs-down-independent assignment, and my thumbs_down_at from August means only newer events count, which here is the filiph comment and the commit reference, so it stays in the assigned-issue band rather than rising higher.
- **Next action:** Reply to filiph's 24d-old comment offering a concrete repro and pointers, then start investigating the intermittent Directory.deleteSync recursive failure, since I'm the assignee.
