# Gitilizer eval: v5-claude-haiku-r2-r2-r2-r2

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031430

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.576 ± 0.009 |
| spearman | 0.714 ± 0.004 |
| pairwise_acc | 0.788 ± 0.005 |
| ndcg | 0.973 ± 0.000 |
| ndcg@5 | 0.999 ± 0.001 |
| top3_overlap | 0.778 ± 0.192 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.222 ± 0.192 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.800 ± 0.029 | 0.996 ± 0.001 | 1.000 ± 0.000 | 1.250 ± 0.125 |
| B | 20 | 0.340 ± 0.012 | 0.909 ± 0.003 | 0.467 ± 0.115 | 4.400 ± 0.100 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 3/3 | dart-lang/sdk#48056 | A | Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist mitigations (see #64644, closed and assigned to mraleph) and reply to acn-masatadakurihara's security questions, then close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's question on bump.go about whether Bump should add CHANGELOG.md to lib.Keep or LanguageDart clean should preserve an existing CHANGELOG.md, then push the chosen fix. |
| 3 | 4.0 (3–5) | +1.0 | 0.71 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (my default review duty in google-cloud-dart), starting with the gemini-flagged StateError/hang concern in subscription.dart if it applies to this diff. |
| 4 | 3.3 (3–4) | -0.7 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 from first-time contributor quaaantumdev, since it fixes issue #381 in google_cloud_rpc, a repo I am responsible for, and no human has reviewed it yet. |
| 5 | 4.7 (4–5) | -0.3 | 0.70 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's design proposal (nullable number and string, unknown-integer handling, query encoding) and agree on the approach before any code is written. |
| 6 | 21.3 (19–25) | +15.3 ⚠️ | 0.17 | 0/3 | dart-lang/http#2027 | B | Wait for a maintainer to weigh in on the breaking-change direction for Client.close before doing anything further. |
| 7 | 7.3 (7–8) | +0.3 | 0.60 | 3/3 | dart-lang/http#1981 | B | Work on the CupertinoClient server trust evaluator skeleton I said I'd start, and check whether the reporter has opened a PR yet. |
| 8 | 8.7 (8–9) | +0.7 | 0.57 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo's question about whether servers send incremental JSON, or decide whether to pursue the SSE error-frame fix first since it is independent of that question. |
| 9 | 11.3 (10–13) | +2.3 | 0.45 | 3/3 | dart-lang/sdk#59846 | B | Triage this dart:io HTTP header-name validation bug: check whether the parser can be tightened to RFC 9110 tchar rules without breaking compatibility, or unassign if it isn't planned. |
| 10 | 13.7 (12–15) | +3.7 | 0.32 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my question on whether to switch Compute to discovery or add convenience extensions to the protobuf service operations. |
| 11 | 15.0 (12–17) | +4.0 | 0.32 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed from me right now; this is an old, unowned SDK bug where the abandoned fix is waiting on someone to pick it up. |
| 12 | 14.0 (13–15) | +2.0 | 0.30 | 3/3 | dart-lang/native#3752 | B | Review and merge the linked fix PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue. |
| 13 | 14.0 (9–17) | +1.0 | 0.38 | 1/3 | googleapis/google-cloud-dart#366 | B | Decide on the general fix approach (e.g., librarian automation) for requiring new google_cloud_rpc versions, then apply the pubspec and CHANGELOG updates for google_cloud_storage 0.6.5 and google_cloud_pubsub. |
| 14 | 18.0 (18) | +4.0 | 0.20 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since the team review request is shared with dart-ecosystem-team and no one has reviewed it yet. |
| 15 | 15.0 (12–19) | +0.0 | 0.27 | 2/3 | googleapis/google-cloud-dart#381 | A | Review PR #382 (linked fix by quaaantumdev) since it resolves this issue, then close the issue once merged. |
| 16 | 26.3 (25–28) | +10.3 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; ping them again if there is no response by about 2026-10-30. |
| 17 | 8.0 (6–10) | -9.0 ⚠️ | 0.58 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the FormatException fallback in ServiceException.fromHttpResponse so gateway HTML 502/503/504 responses reach RetryRunner, then wire RetryRunner and RequestOptions into ServiceClient._makeRequest. |
| 18 | 17.3 (11–22) | -0.7 | 0.26 | 3/3 | dart-lang/http#2031 | A | Review PR #2031 (http2 3.2.0 release prep), though it is stacked on unreviewed PRs #2014 and #2010 chain so the lower PRs need review first. |
| 19 | 16.0 (15–17) | -3.0 | 0.28 | 2/3 | googleapis/google-cloud-dart#345 | A | Nothing needed now; this is my own draft PR from 45 days ago, so either finish the bot-flagged fixes and mark it ready, or close it if abandoned. |
| 20 | 26.0 (22–33) | +6.0 | 0.11 | 0/3 | dart-lang/core#1007 | B | Wait for the author to sign the CLA, which blocks review; no action from me yet. |
| 21 | 20.3 (20–21) | -0.7 | 0.20 | 3/3 | dart-lang/tools#2544 | B | Review jonasfj's updated UNC-path PR for dart-lang/tools#2544 (requested via dart-ecosystem-team, outside my personal review scope) only if I choose to; otherwise nothing is mine since lrhn is already the active reviewer and the author is addressing feedback. |
| 22 | 28.7 (22–34) | +6.7 | 0.08 | 0/3 | dart-lang/tools#2710 | B | Wait for a dart-ecosystem-team member to review PR #2710; it is stacked on draft PR #2563, which must land first. |
| 23 | 27.3 (26–29) | +4.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR dart-lang/native#3763; ping them if there's no response by around 2026-10-30. |
| 24 | 27.0 (24–30) | +3.0 | 0.11 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for natebosch's review (or sigurdm's answer on the non-PubSub parts); nothing for me to do until one of them responds. |
| 25 | 28.7 (24–31) | +3.7 | 0.11 | 0/3 | dart-lang/http#579 | B | Nothing for me to do now; this is blocked on a future semver-major release, so it stays parked until a 2.0 plan exists. |
| 26 | 11.3 (10–13) | -14.7 ⚠️ | 0.42 | 3/3 | dart-lang/http#1932 | B | Review and merge the linked PR dart-lang/http#2034 (fix for cronet namespace duplication), then reply to igordanilovski's 4-day-old status request on the issue. |
| 27 | 31.7 (25–36) | +4.7 | 0.06 | 0/3 | flutter/devtools#8223 | B | Nothing for me to do; this is a cc'd feature request in flutter/devtools (not my repository) with the work blocked on dart:io and HTTP profiling changes. |
| 28 | 32.0 (31–33) | +4.0 | 0.07 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a contributions-welcome P3 enhancement that I already declined to take on, and it is open to community contributors. |
| 29 | 35.3 (35–36) | +6.3 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing needed from me; PR is approved and clean, waiting on mosuem to merge. |
| 30 | 35.0 (34–36) | +5.0 | 0.03 | 0/3 | dart-lang/http#1365 | A | No action needed from me; this is a stale performance enhancement in http2, which I'm not responsible for, and it is waiting on the SDK socket work (dart-lang/sdk#48210) rather than on me. |
| 31 | 22.0 (21–24) | -9.0 ⚠️ | 0.12 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan (requested directly) or dart-ecosystem-team to review kevmoo's PR #2715; nothing for me to do yet. |
| 32 | 32.3 (32–33) | +0.3 | 0.05 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem (who has been editing stream_handler and was asked directly) to review PR #2026; I am not responsible for http2 and no review is requested of me. |
| 33 | 27.0 (23–29) | -6.0 | 0.12 | 0/3 | dart-lang/native#3653 | A | Nothing for me to do now; the work is parked on the team's decision about whether to pursue the larger FFI change or wrap calls in autorelease pools instead. |
| 34 | 26.7 (23–30) | -7.3 | 0.11 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions about the client and server scenario, or review the open PR #1974 once it is ready. |
| 35 | 27.3 (26–28) | -7.7 | 0.11 | 0/3 | dart-lang/http#1841 | B | Wait for agam1092005's PR #2002 to be reviewed; the issue itself is covered by that PR and is tagged for the next breaking release. |
| 36 | 6.3 (6–7) | -29.7 ⚠️ | 0.67 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's 24d-old comment offering a concrete repro and pointing him at the recent commit 2752d56, then start investigating the intermittent deleteSync failure. |

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

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.94
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is my issue, assigned to me, and it has new security-relevant activity from 3 days ago about a compromised CA with possible impersonation risk, which is the top tier under the security rules. The new report directly asks whether Dart trusts the blocked certificates, so confirming the state is my job. The linked #64644 was closed 2 days ago, which suggests the fix may have landed, but that still needs verifying and a reply. The original Android user-CA issue is old, but the new security activity outweighs its age.
- **Next action:** Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist mitigations (see #64644, closed and assigned to mraleph) and reply to acn-masatadakurihara's security questions, then close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR and kevmoo, a close collaborator, left an unresolved question about a real bug: the next librarian generate would delete the CHANGELOG.md that bump creates for new packages. Feedback I haven't answered is blocking the PR, which falls in the 0.8–0.9 band. I'm not a listed owner of googleapis/librarian, so I stay just below the top of that band, but the work is still mine to do now.
- **Next action:** Reply to kevmoo's question on bump.go about whether Bump should add CHANGELOG.md to lib.Keep or LanguageDart clean should preserve an existing CHANGELOG.md, then push the chosen fix.

### 3. googleapis/google-cloud-dart#376 → predicted 5, priority 0.70
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This PR is in a repository I am responsible for and nobody human has reviewed it, so I am the default reviewer. Author sigurdm is a close collaborator, which places it in the 0.65–0.8 review band. The only review so far is an automated bot comment, which does not count as a human review. The PR is small in scope but touches the client attribution header and release metadata that need checking before release.
- **Next action:** Review PR #376 (my default review duty in google-cloud-dart), starting with the gemini-flagged StateError/hang concern in subscription.dart if it applies to this diff.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a PR in google-cloud-dart, a repository I am responsible for, and no human reviewer has picked it up; as the default reviewer I should review it. It is fresh (3 days old) and fixes a real retry bug affecting ABORTED over REST, which is worth attention. It is from a first-time contributor rather than a close collaborator, so it sits below collaborator PRs but still in the review range. The only other activity is a bot comment that doesn't count as review.
- **Next action:** Review PR #382 from first-time contributor quaaantumdev, since it fixes issue #381 in google_cloud_rpc, a repo I am responsible for, and no human has reviewed it yet.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my issue in a repo I maintain, and a contributor is waiting on my reply to a concrete design sketch posted 4 days ago. Per the scale, a contributor waiting on my reply to move forward is in the 0.65-0.8 range. I asked for design-first and haven't responded to the latest proposal, so it isn't blocked on anyone else. It sits at the lower end because it's a p2 bug with no PR yet and the work is still at the design stage.
- **Next action:** Reply to Yusufihsangorgel's design proposal (nullable number and string, unknown-integer handling, query encoding) and agree on the approach before any code is written.

### 6. dart-lang/http#2027 → predicted 19, priority 0.20
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue filed 9 days ago in dart-lang/http, a repo I watch and partly own, so it is planned design work and fresh enough to matter. However, the next step is a design decision (possibly a 2.0 breaking change) with no one else engaged yet, so there is no concrete action I can take today. It sits at the lower end of my own-planned-work range, placing it below items I can act on now.
- **Next action:** Wait for a maintainer to weigh in on the breaking-change direction for Client.close before doing anything further.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself and publicly said I started working on this 5 hours ago, so it is my committed work and falls in the planned-work range. It is not a security issue and I am not the only owner of the repo's http2 area, but this is an http feature I am the lead on. Nothing else is blocking me, so it sits mid-range rather than at the top.
- **Next action:** Work on the CupertinoClient server trust evaluator skeleton I said I'd start, and check whether the reporter has opened a PR yet.

### 8. googleapis/google-cloud-dart#360 → predicted 8, priority 0.60
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator's issue in a repository I am responsible for, with a clear next step for me: kevmoo asked whether servers send incremental JSON and I have not answered since 17 days ago. The mid-stream SSE error-frame bug is a real correctness issue that can be tackled independently. kevmoo says it is not urgent, and the issue is not fresh, so it sits in the planned-work range rather than the higher blocking tiers.
- **Next action:** Reply to kevmoo's question about whether servers send incremental JSON, or decide whether to pursue the SSE error-frame fix first since it is independent of that question.

### 9. dart-lang/sdk#59846 → predicted 13, priority 0.35
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm the assignee, so this is work I should either fix or unassign, which would normally put it in the 0.5-0.65 band. However it's 22 months old, nothing has happened since the January 2025 triage, and it's in dart:io in a repo I'm not explicitly responsible for, so it sinks toward the bottom of the range. It is not a security issue as labeled, though the proxy-interop concern is real.
- **Next action:** Triage this dart:io HTTP header-name validation bug: check whether the parser can be tightened to RFC 9110 tchar rules without breaking compatibility, or unassign if it isn't planned.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.35
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** The last human activity is my own question, asked 16 days ago, and kevmoo has not replied. The design decision depends on his answer, so I have no concrete step to take yet. It sits in the 0.35-0.5 band for an unanswered question to a close collaborator in my own repository, and it is near the bottom of that band because the thread has gone quiet for over two weeks.
- **Next action:** Wait for kevmoo to answer my question on whether to switch Compute to discovery or add convenience extensions to the protobuf service operations.

### 11. dart-lang/sdk#31275 → predicted 17, priority 0.25
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** I'm only mentioned as an informational CC on a 9-year-old issue in a repository I don't own, with no direct request for me to act. kevmoo's CC expresses that it matters to him, which gives it some weight, and the crash in production makes it more than trivial. Since nothing is blocked on me and the work has no owner, it belongs in the lower-middle range and is not a commitment.
- **Next action:** Nothing needed from me right now; this is an old, unowned SDK bug where the abandoned fix is waiting on someone to pick it up.

### 12. dart-lang/native#3752 → predicted 15, priority 0.30
- **Ground truth:** 
- **Model:** This is my own issue, filed 6 days ago in a repository I maintain, but the fix is already in open PR #3763 which I authored and updated 2 days ago, so the issue is covered by a PR and ranks below it. The remaining work is on that PR, whose state is not shown as waiting on anyone else, so the concrete next step is landing it. The issue has no new activity beyond my own triage actions, so it does not need separate attention.
- **Next action:** Review and merge the linked fix PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 9, priority 0.60
- **Ground truth:** 
- **Model:** This is my own open thread in a repository I maintain, and I'm the one who has to decide the approach, so the next step is mine. The underlying work is a real release blocker for google_cloud_storage 0.6.5 and pubsub, but it is not yet urgent since the bump depends on a generated rpc version not yet published. The last activity was my own comment 17 days ago, and the issue is from a close collaborator, which keeps it in the planned-work range.
- **Next action:** Decide on the general fix approach (e.g., librarian automation) for requiring new google_cloud_rpc versions, then apply the pubspec and CHANGELOG updates for google_cloud_storage 0.6.5 and google_cloud_pubsub.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is a bot-authored BoringSSL revision bump in dart-lang/tools, a repository I'm not specifically responsible for, and the only review request is to dart-ecosystem-team, which I belong to. Per the rules, a team review request in a repo I don't own is low priority (0.1–0.25), and there's no human activity or mention of me. It was opened under 24 hours ago, so it isn't stale, but nothing is directed at me personally.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since the team review request is shared with dart-ecosystem-team and no one has reviewed it yet.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is covered by open PR #382, which is the actionable item, so the issue itself sits in the 0.15-0.35 band. The PR is from an outside contributor in a repository I'm responsible for, and I'm the default reviewer, so reviewing it is the real work. The issue was filed 3 days ago with no replies from maintainers, and only bot activity has followed. I'm only watching the repo, so the issue ranks below the PR and is not urgent.
- **Next action:** Review PR #382 (linked fix by quaaantumdev) since it resolves this issue, then close the issue once merged.

### 16. dart-lang/http#2034 → predicted 25, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR and I requested review from goderbauer only 2 days ago, so nothing is due from me until roughly a week passes. It fixes issue #1932, which is assigned to me, so it's worth tracking, but it is covered by the open PR and blocked on the reviewer. The review request is to a specific person, not a team, and the repo is one I'm responsible for.
- **Next action:** Wait for goderbauer to review PR #2034; ping them again if there is no response by about 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 10, priority 0.58
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is assigned to me in a repository I am responsible for, and kevmoo, a close collaborator, filed it with clear next steps. The work is my own planned work rather than something blocked on anyone else. Its last activity was my own comment 10 days ago, so it has aged within the planned-work range. The AIP-4222 and AIP-155 parts were split off to issue #80, so the remaining work is the retry wiring and the FormatException bug.
- **Next action:** Implement the FormatException fallback in ServiceException.fromHttpResponse so gateway HTML 502/503/504 responses reach RetryRunner, then wire RetryRunner and RequestOptions into ServiceClient._makeRequest.

### 18. dart-lang/http#2031 → predicted 22, priority 0.12
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I am a requested reviewer and this is a PR in dart-lang/http, a repo I'm interested in but where I'm not responsible for http2, so the review request is personal and counts. However, the PR is stacked on #2014, which has no reviews yet and is requesting my review, and on #2010 and #2009 chain, so it is blocked until the lower PRs land. The change itself is a trivial version and changelog bump, so there is little urgency.
- **Next action:** Review PR #2031 (http2 3.2.0 release prep), though it is stacked on unreviewed PRs #2014 and #2010 chain so the lower PRs need review first.

### 19. googleapis/google-cloud-dart#345 → predicted 16, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I am responsible for, so it falls in the 'my own drafts I should finish or abandon' range of 0.15–0.35. It has been dormant for 45 days with no human activity since I converted it to draft, so it sits at the lower end. The gemini review flagged real compile and runtime issues, which would need fixing before it can merge, but nothing is waiting on anyone else.
- **Next action:** Nothing needed now; this is my own draft PR from 45 days ago, so either finish the bot-flagged fixes and mark it ready, or close it if abandoned.

### 20. dart-lang/core#1007 → predicted 33, priority 0.05
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR is in dart-lang/core, a repository I'm not responsible for, and the review request went to dart-ecosystem-team, which I belong to but which is shared rather than addressed to me personally. The CLA check is failing and mergeable_state is blocked, so the next step belongs to the first-time contributor. It fixes a bug in path isWithin, which is a modest issue that already has a linked tracking issue.
- **Next action:** Wait for the author to sign the CLA, which blocks review; no action from me yet.

### 21. dart-lang/tools#2544 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** This is a security-relevant PR, but I was only requested via a team I belong to in a repository I'm not responsible for, so it falls under the team review request band of 0.1-0.25. The main reviewer lrhn has left detailed feedback and jonasfj has pushed fixes since, so the ball is in lrhn's court for the next review pass rather than mine. Activity is from 2026-08-26, about two months old, so freshness is low.
- **Next action:** Review jonasfj's updated UNC-path PR for dart-lang/tools#2544 (requested via dart-ecosystem-team, outside my personal review scope) only if I choose to; otherwise nothing is mine since lrhn is already the active reviewer and the author is addressing feedback.

### 22. dart-lang/tools#2710 → predicted 30, priority 0.08
- **Ground truth:** 
- **Model:** The review request went to dart-ecosystem-team, a team I belong to, in dart-lang/tools, a repository I'm not responsible for, and no specific reviewer is named, so this sits in the team-review range for unowned repositories. The PR is also stacked on draft #2563, which blocks review progress, and the author has already answered the bot feedback. Nothing is waiting on me and the activity is only two days old.
- **Next action:** Wait for a dart-ecosystem-team member to review PR #2710; it is stacked on draft PR #2563, which must land first.

### 23. dart-lang/native#3763 → predicted 26, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR with a review requested from liamappelbe two days ago, and nothing has happened since. Per my rules, I should wait until roughly a week of silence before pinging, so it sits in the low waiting range. It fixes two open issues, so it's the main thing to act on for those, but the next step is blocked on the reviewer. Repo is one I own, so it's still worth tracking.
- **Next action:** Wait for liamappelbe to review PR dart-lang/native#3763; ping them if there's no response by around 2026-10-30.

### 24. googleapis/google-cloud-dart#373 → predicted 27, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, approved by sigurdm, with a branch update already merged. The only remaining blocker is the requested reviewer natebosch, whom I pinged about 4 days ago and who is busy. My last ping is recent, so nothing is due for a week; the open question is for sigurdm, and I have already asked. The 2 unresolved review threads are noted but aren't clearly blocking, so I'm scoring this low.
- **Next action:** Wait for natebosch's review (or sigurdm's answer on the non-PubSub parts); nothing for me to do until one of them responds.

### 25. dart-lang/http#579 → predicted 24, priority 0.12
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** I'm a requested reviewer, but the PR is labeled next-breaking-release and I already said I lack bandwidth to coordinate it, so it is blocked by a plan rather than by my review. Retendo's recent question asks for a workaround, which is a real but low-stakes ping from a first-time contributor in a repo I'm not personally driving. Stacked PRs and an unresolved thread also keep it from being mine to act on today.
- **Next action:** Nothing for me to do now; this is blocked on a future semver-major release, so it stays parked until a 2.0 plan exists.

### 26. dart-lang/http#1932 → predicted 11, priority 0.42
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** The real work is in PR #2034, which I authored and which is open and updated 2 days ago; it is the thing to act on and it is not clearly waiting on anyone else, so the issue itself sits in the duplicate-of-PR band. The issue is assigned to me and has a fresh status ping from a non-collaborator, which only justifies a modest bump. Upstream Chromium/Google dependency is the blocker, so the fix path is partly outside my control, keeping this out of the higher bands.
- **Next action:** Review and merge the linked PR dart-lang/http#2034 (fix for cronet namespace duplication), then reply to igordanilovski's 4-day-old status request on the issue.

### 27. flutter/devtools#8223 → predicted 34, priority 0.05
- **Ground truth:** 
- **Model:** I was only informationally CC'd by bkonyi in 2024 on a feature request in a repository I am not responsible for. The work is large and has no owner or clear next step for me, and the only recent activity is a label change by srawlins. Nothing is directed at me, so it belongs at the bottom of the range.
- **Next action:** Nothing for me to do; this is a cc'd feature request in flutter/devtools (not my repository) with the work blocked on dart:io and HTTP profiling changes.

### 28. dart-lang/http#1837 → predicted 31, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** The issue is over a year old with no activity since my last comment, which declined the work and pointed to the community. It is labeled contributions-welcome and P3, and I am only a commenter on dart-lang/http, so there is no action or deadline for me. The only related item is an external Flutter issue, which does not require anything from me. It sits in the low backlog range.
- **Next action:** Nothing to do; this is a contributions-welcome P3 enhancement that I already declined to take on, and it is open to community contributors.

### 29. dart-lang/http#2033 → predicted 35, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already approved this PR 2 days ago, the author has pushed no new commits since, and mergeable state is clean. Nothing is waiting on me, so it sits at the bottom of the scale. The only remaining step is for mosuem, the author and a collaborator, to merge it.
- **Next action:** Nothing needed from me; PR is approved and clean, waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is an old enhancement request about http2 performance, and I'm only watching the repo while explicitly not responsible for http2. The only recent question (lubritto, 8mo ago) asks whether it should be closed, which is a triage question rather than something directed at me. The commenter's own follow-up suggests the root cause is in the Dart socket layer and dio's adapter, so the real work sits elsewhere and nothing is waiting on me.
- **Next action:** No action needed from me; this is a stale performance enhancement in http2, which I'm not responsible for, and it is waiting on the SDK socket work (dart-lang/sdk#48210) rather than on me.

### 31. dart-lang/tools#2715 → predicted 21, priority 0.12
- **Ground truth:** 
- **Model:** This is a collaborator's PR in dart-lang/tools, a repository I'm not listed as responsible for. I was only asked through the dart-ecosystem-team team, which is a shared request, and davidmorgan is also named directly, so it is not mine to act on. The PR is two days old and the last commit is recent, so it's fresh, but the review belongs to others and the PR is blocked on review.
- **Next action:** Wait for davidmorgan (requested directly) or dart-ecosystem-team to review kevmoo's PR #2715; nothing for me to do yet.

### 32. dart-lang/http#2026 → predicted 32, priority 0.05
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is a first-time contributor's PR in dart-lang/http/http2, a package the user explicitly said they are not responsible for, and I am only a watcher with no review request or mention. The author pinged mosuem, a close collaborator, not me, so the next step belongs to mosuem. The PR is blocked on review and was updated only a day ago, so it stays visible but near the bottom of the list.
- **Next action:** Wait for mosuem (who has been editing stream_handler and was asked directly) to review PR #2026; I am not responsible for http2 and no review is requested of me.

### 33. dart-lang/native#3653 → predicted 29, priority 0.10
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to liamappelbe and his last comment says the fix is probably not worth the effort, so the next step is his call, not mine. The merged PR is a no-op according to mraleph, but the follow-up is a design discussion rather than a task for me. I was only mentioned in thanks and my own experiment is already recorded, so this sits low in the list.
- **Next action:** Nothing for me to do now; the work is parked on the team's decision about whether to pursue the larger FFI change or wrap calls in autorelease pools instead.

### 34. dart-lang/http#1972 → predicted 23, priority 0.12
- **Ground truth:** 
- **Model:** I asked the reporter for information (client type and server behaviour) and labeled it needs-info 8 days ago, so the next step is theirs. There is an open PR #1974 that fixes this issue, so the PR is the thing to act on, and the issue itself sits in the low range. The PR was updated only just now and is not yet reviewed by me, so it is a separate item to score.
- **Next action:** Wait for Keetz to answer my questions about the client and server scenario, or review the open PR #1974 once it is ready.

### 35. dart-lang/http#1841 → predicted 28, priority 0.10
- **Ground truth:** 
- **Model:** The issue is covered by open PR #2002, which is the thing to act on, so this issue ranks well below it. It is also labeled next-breaking-release, which blocks the default-behaviour change. I was mentioned but the only new activity is a contributor's proposal that I have not yet been asked to answer, and the repo area (http2 scope aside, this is the core http package) is one I'm interested in rather than solely responsible for. The thumbs-down on 2026-10-05 applies, and the only later activity is a contributor's PR and commit references, which do not require me to act now.
- **Next action:** Wait for agam1092005's PR #2002 to be reviewed; the issue itself is covered by that PR and is tagged for the next breaking release.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.70
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am the assignee of this non-security issue, and filiph (a non-collaborator) reports it reproduces locally on a current SDK and asks how to help. Commit 2752d56 referenced it 4 days ago, so there is possibly new related change to verify. It is in the SDK, a repo I'm responsible for and assigned, but it is not the top tier because the bug is intermittent and there is no direct request with a deadline, and my last activity was 3.8 years ago.
- **Next action:** Reply to filiph's 24d-old comment offering a concrete repro and pointing him at the recent commit 2752d56, then start investigating the intermittent deleteSync failure.
