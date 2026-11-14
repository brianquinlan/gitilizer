# Gitilizer eval: v5e-claude-haiku

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5e.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030811

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.549 ± 0.020 |
| spearman | 0.685 ± 0.026 |
| pairwise_acc | 0.775 ± 0.010 |
| ndcg | 0.970 ± 0.004 |
| ndcg@5 | 0.918 ± 0.070 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.867 ± 0.115 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.667 ± 0.096 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.794 ± 0.010 | 0.995 ± 0.000 | 1.000 ± 0.000 | 1.250 ± 0.000 |
| B | 20 | 0.298 ± 0.043 | 0.882 ± 0.049 | 0.467 ± 0.115 | 4.767 ± 0.252 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Check the new security comment against issue #64644 (closed, eight compromised intermediate CA keys) and confirm whether dart:io on Android honors the Android blocklist; then reply to acn-masatadakurihara and close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.84 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's review question on bump.go about CHANGELOG.md being deleted by generate, deciding whether Bump appends it to lib.Keep or clean auto-preserves it, then push the fix. |
| 3 | 5.0 (4–6) | +2.0 | 0.71 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (sigurdm's pre-release polish, which is stacked on the unmerged #292 streaming-pull work and has no reviewer yet), starting with the gemini-flagged StateError and hang risks in the ack/streaming code. |
| 4 | 3.0 (3) | -1.0 | 0.73 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 (fix for JSON error Status.code, fixes #381) in google-cloud-dart, since no human has reviewed it yet and I'm the default reviewer for this repo. |
| 5 | 4.7 (4–6) | -0.3 | 0.71 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number/string ProtoEnum, unknown-integer handling, toQueryValue) so they can write a preliminary PR. |
| 6 | 15.3 (11–23) | +9.3 ⚠️ | 0.31 | 0/3 | dart-lang/http#2027 | B | Nothing needed now; wait for maintainer discussion on whether to make Client.close async in a future 2.0 release. |
| 7 | 7.3 (7–8) | +0.3 | 0.60 | 3/3 | dart-lang/http#1981 | B | Continue the CupertinoClient server-trust hook implementation I just started, and check whether umair9430 has opened the skeleton PR I asked for. |
| 8 | 9.3 (9–10) | +1.3 | 0.50 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo's open question by checking whether Google APIs actually send incremental JSON arrays for non-SSE streams, then decide whether to pursue the fix. |
| 9 | 13.3 (11–15) | +4.3 | 0.37 | 3/3 | dart-lang/sdk#59846 | B | Triage this 22-month-old bug: decide whether to fix the dart:io header-name validation (a small, well-scoped change in the VM HTTP parser) or unassign it, and close it if it's no longer relevant. |
| 10 | 11.7 (10–13) | +1.7 | 0.38 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my question on whether to switch Compute to discovery or add convenience extensions to the protobuf service operations. |
| 11 | 11.7 (10–14) | +0.7 | 0.41 | 3/3 | dart-lang/sdk#31275 | A | Assign an owner for dart:io HttpClient and decide whether to revive the abandoned CL 144346 fix, since kevmoo and parlough explicitly asked you to take it up. |
| 12 | 15.7 (14–17) | +3.7 | 0.27 | 3/3 | dart-lang/native#3752 | B | Finish and merge the linked fix PR dart-lang/native#3763, then close this issue once it lands. |
| 13 | 15.3 (9–21) | +2.3 | 0.35 | 1/3 | googleapis/google-cloud-dart#366 | B | Wait for the librarian automation decision and the generated google_cloud_rpc version bump, then add the version constraint to storage and pubsub pubspecs. |
| 14 | 17.7 (17–18) | +3.7 | 0.20 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since it was requested from dart-ecosystem-team which I belong to and nobody has reviewed it yet. |
| 15 | 14.3 (12–16) | -0.7 | 0.27 | 3/3 | googleapis/google-cloud-dart#381 | A | Review PR #382 (the linked fix from an external contributor) since it is the thing to act on; the issue itself has no separate action. |
| 16 | 26.7 (26–27) | +10.7 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; ping them if there's no response by about 2026-10-30. |
| 17 | 7.3 (6–8) | -9.7 ⚠️ | 0.63 | 3/3 | googleapis/google-cloud-dart#359 | B | Start implementing the ServiceException JSON/HTML fallback fix and the ServiceClient RetryRunner/RequestOptions wiring for google_cloud_rpc, since this issue is assigned to me and has no external blocker. |
| 18 | 29.0 (29) | +11.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#2031 | A | Wait for stacked PRs #2010, #2014 and #2009 to be reviewed and merged, then review this release-prep PR (#2031). |
| 19 | 19.7 (17–22) | +0.7 | 0.22 | 0/3 | googleapis/google-cloud-dart#345 | A | Nothing needed now; when ready, resolve the 5 open gemini review threads and fix the merge conflicts before marking it ready for review. |
| 20 | 21.7 (20–24) | +1.7 | 0.17 | 0/3 | dart-lang/core#1007 | B | Wait for the dart-ecosystem-team to review; the author still needs to sign the CLA before it can be reviewed. |
| 21 | 34.3 (34–35) | +13.3 ⚠️ | 0.04 | 0/3 | dart-lang/tools#2544 | B | Nothing for me now; waiting on lrhn to re-review jonasfj's latest changes, which address his last round of comments. |
| 22 | 24.0 (20–28) | +2.0 | 0.14 | 0/3 | dart-lang/tools#2710 | B | Nothing needed from me yet; the PR is stacked on draft #2563 and mergeable is blocked, so wait for mosuem to finish the stack before reviewing. |
| 23 | 27.7 (27–28) | +4.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them if there is still no response after about a week (around 2026-10-30). |
| 24 | 22.7 (21–25) | -1.3 | 0.15 | 1/3 | googleapis/google-cloud-dart#373 | B | Wait for natebosch (assigned reviewer) or sigurdm to respond; the PR is already approved by sigurdm and I just asked whether it can merge without natebosch's review. |
| 25 | 29.0 (24–32) | +4.0 | 0.11 | 0/3 | dart-lang/http#579 | B | Wait for a planned semver-major release of package:http where this breaking change can land; reply to retendo's workaround question only if there is a stated workaround to offer. |
| 26 | 13.7 (13–15) | -12.3 ⚠️ | 0.30 | 3/3 | dart-lang/http#1932 | B | Review and merge the open fix PR dart-lang/http#2034, which covers this issue, then reply to igordanilovski with the status. |
| 27 | 31.0 (30–33) | +4.0 | 0.08 | 0/3 | flutter/devtools#8223 | B | Nothing for me to do; this is a flutter/devtools feature request owned by the DevTools team and I was only CC'd on it, and it is blocked by high cost and an unresolved design. |
| 28 | 32.3 (32–33) | +4.3 | 0.08 | 0/3 | dart-lang/http#1837 | A | Nothing to do; the issue is a contributions-welcome P3 feature request that the Dart team has declined to take on, and it is 12 months stale. |
| 29 | 36.0 (36) | +7.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing for me; I already approved and the PR is clean and waiting on mosuem to merge. |
| 30 | 34.7 (34–35) | +4.7 | 0.04 | 0/3 | dart-lang/http#1365 | A | Nothing for me; the issue is waiting on the http2 maintainers to triage the root cause (possibly in the SDK socket issue dart-lang/sdk#48210) and decide whether to close it. |
| 31 | 18.7 (18–19) | -12.3 ⚠️ | 0.20 | 3/3 | dart-lang/tools#2715 | B | Review PR dart-lang/tools#2715 from kevmoo (a close collaborator) since it was requested from dart-ecosystem-team, which I belong to, and I am the default reviewer in this repo only if I maintain it; otherwise leave it to davidmorgan who was requested personally. |
| 32 | 28.0 (25–33) | -4.0 | 0.08 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem (or another dart-lang/http reviewer) to review PR #2026; nothing is required from me yet. |
| 33 | 29.0 (26–31) | -4.0 | 0.11 | 0/3 | dart-lang/native#3653 | A | Nothing needed from me now; liamappelbe is deciding whether the larger trampoline change is worth doing, and the related issue #3652 is already closed. |
| 34 | 25.3 (22–31) | -8.7 | 0.17 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter (Keetz) to answer my questions about the client and server response; PR #1974 is open and covers the fix, so review that PR once it is ready. |
| 35 | 22.3 (19–25) | -12.7 ⚠️ | 0.17 | 0/3 | dart-lang/http#1841 | B | Nothing needed from me now; wait for contributor agam1092005's PR #2002 to be reviewed, which is the work that actually moves this forward. |
| 36 | 5.7 (5–7) | -30.3 ⚠️ | 0.71 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph with a pointer on how to reproduce and investigate the recursive delete race, since I'm assigned and they offered help. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#376** (truth #3) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/tools#2715** (truth #31) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue I created and am assigned, and it has fresh activity (a 3-day-old security report about compromised eMudhra intermediate CAs asking whether Dart on Android honors revocation and blocklists). Per the security rules it sits at the top of the scale, and I need to confirm the state rather than leave it unknown. The reply from julemand101 points to #64644, which is closed and was fixed 2 days ago, so verification is likely quick but still my job.
- **Next action:** Check the new security comment against issue #64644 (closed, eight compromised intermediate CA keys) and confirm whether dart:io on Android honors the Android blocklist; then reply to acn-masatadakurihara and close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR with an unanswered review question from a close collaborator (kevmoo) that identifies a real bug where the generated CHANGELOG.md gets deleted on the next generate. The PR also has an unresolved review thread and is blocked on review, so my reply and fix are the blocking step. It is not security-related, so it sits just below the top band, but it is clearly mine to act on now.
- **Next action:** Reply to kevmoo's review question on bump.go about CHANGELOG.md being deleted by generate, deciding whether Bump appends it to lib.Keep or clean auto-preserves it, then push the fix.

### 3. googleapis/google-cloud-dart#376 → predicted 6, priority 0.70
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in google-cloud-dart, a repository I'm responsible for, authored by a close collaborator, so it is on me as the default reviewer. It is only 5 days old, which keeps it in the fresh range. It is not a security item and is not fully independent, since the diff reflects the large #292 streaming-pull work that is still in flight, so I'm placing it in the upper part of the review band rather than the top.
- **Next action:** Review PR #376 (sigurdm's pre-release polish, which is stacked on the unmerged #292 streaming-pull work and has no reviewer yet), starting with the gemini-flagged StateError and hang risks in the ack/streaming code.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a PR in a repository I am responsible for, and no human reviewer has looked at it, so the default-reviewer rule puts it on me. It is from a first-time contributor, which ranks it below collaborator PRs but it is still a clear next step. The fix is well scoped and fixes a real retry bug for ABORTED errors over REST, and the PR is only 3 days old, so it is fresh. The only bot review had no substantive feedback, so it does not count as a human review.
- **Next action:** Review PR #382 (fix for JSON error Status.code, fixes #381) in google-cloud-dart, since no human has reviewed it yet and I'm the default reviewer for this repo.

### 5. googleapis/google-cloud-dart#252 → predicted 4, priority 0.72
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug issue in a repository I'm responsible for, and a contributor is waiting on my response to a concrete design sketch, so the next step is mine. Yusufihsangorgel's comment from 4 days ago is fresh and directed at the design I asked for. The issue is p2 and touches the core ProtoEnum API, so it matters but is not blocking anyone urgently.
- **Next action:** Reply to Yusufihsangorgel's 2026-10-21 design proposal (nullable number/string ProtoEnum, unknown-integer handling, toQueryValue) so they can write a preliminary PR.

### 6. dart-lang/http#2027 → predicted 23, priority 0.12
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue filed 9 days ago in dart-lang/http, a repo I work in, but it is a design discussion about a breaking change that is tied to a future 2.0 release, so it is effectively blocked on a plan rather than a next step for me today. No one else has replied yet and there is no concrete task I can complete now. It sits in the low range because it is a planned breaking-change discussion, not current work.
- **Next action:** Nothing needed now; wait for maintainer discussion on whether to make Client.close async in a future 2.0 release.

### 7. dart-lang/http#1981 → predicted 7, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This is an issue I assigned to myself and said I'm working on, so it is my planned work with a clear next step, which places it in the 0.5–0.65 range. It is not a security issue or a blocking question, and the reporter has not yet produced the skeleton PR I requested. Its freshness is high because I acted on it five hours ago.
- **Next action:** Continue the CupertinoClient server-trust hook implementation I just started, and check whether umair9430 has opened the skeleton PR I asked for.

### 8. googleapis/google-cloud-dart#360 → predicted 9, priority 0.50
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository I'm responsible for, filed by a close collaborator, and I asked a question that kevmoo answered with uncertainty, so the next step is mine but not urgent. The mid-stream error-frame half is a real correctness bug (errors silently yielded as empty messages), which keeps it above the bottom of the planned-work range. Being a non-security issue with no PR yet, it sits in the 0.5-0.65 planned-work band, placed at the low end because kevmoo explicitly said it is not urgent and the last activity is 17 days old.
- **Next action:** Reply to kevmoo's open question by checking whether Google APIs actually send incremental JSON arrays for non-SSE streams, then decide whether to pursue the fix.

### 9. dart-lang/sdk#59846 → predicted 15, priority 0.30
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm the assignee, so this is nominally mine, but it has been untouched for 22 months and nothing new has been directed at me since assignment. The bug is real and has interoperability and request-smuggling relevance, but it isn't a security issue as labeled and it is in a repository I'm only a commenter in, not one I'm responsible for. It sits in the low-to-middle range: it should be decided on rather than ignored, but it doesn't compete with fresh work.
- **Next action:** Triage this 22-month-old bug: decide whether to fix the dart:io header-name validation (a small, well-scoped change in the VM HTTP parser) or unassign it, and close it if it's no longer relevant.

### 10. googleapis/google-cloud-dart#361 → predicted 10, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a collaborator's issue in a repository I am responsible for, and my last comment asked kevmoo a direct design question that they haven't answered in 16 days. The next step therefore belongs to kevmoo, so this sits in the recent-question range rather than the actionable range. It is in the middle of the freshness band, and the linked #28 and draft #345 don't change that since nothing there is waiting on me.
- **Next action:** Wait for kevmoo to answer my question on whether to switch Compute to discovery or add convenience extensions to the protobuf service operations.

### 11. dart-lang/sdk#31275 → predicted 11, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a crash bug in widely used dart:io code, not a security issue, and I was only CC'd twice, once by kevmoo asking me to take it up. It has no open PR, and the original fix was abandoned, so the next step is a triage decision that is mine but not urgent. The most recent human activity is about 20 months old, so it sits in the bottom of the CC range rather than the top.
- **Next action:** Assign an owner for dart:io HttpClient and decide whether to revive the abandoned CL 144346 fix, since kevmoo and parlough explicitly asked you to take it up.

### 12. dart-lang/native#3752 → predicted 14, priority 0.30
- **Ground truth:** 
- **Model:** This is my own issue, filed 6 days ago, and it is already covered by an open PR (#3763) that I authored, so the issue itself has no separate next step. Per the duplicate rule, the issue ranks below its PR and sits in the 0.15–0.35 band. Being in a repo I work in and recently filed keeps it above dormant backlog, but nothing new has come in, so it stays near the middle-low of that band.
- **Next action:** Finish and merge the linked fix PR dart-lang/native#3763, then close this issue once it lands.

### 13. googleapis/google-cloud-dart#366 → predicted 16, priority 0.25
- **Ground truth:** 
- **Model:** This is a real release-blocking follow-up in a repository I own, but my last activity is a comment saying I'm still deciding on an approach, and the required version bump hasn't happened yet, so the next step isn't mine today. The checklist items are gated on the generated rpc version, so the work is blocked rather than waiting on me. Its importance is moderate since publishing with the wrong constraint would break users, and the PR that introduced the code is already merged, which keeps it visible but not urgent.
- **Next action:** Wait for the librarian automation decision and the generated google_cloud_rpc version bump, then add the version constraint to storage and pubsub pubspecs.

### 14. dart-lang/tools#2719 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, a repository I'm not responsible for, so the guidance puts it in the 0.1–0.25 band. It is an automated, low-risk dependency bump and the review request is shared across my team rather than addressed to me personally. It is fresh (19h old) and has no human activity yet, which places it at the upper part of that band.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since it was requested from dart-ecosystem-team which I belong to and nobody has reviewed it yet.

### 15. googleapis/google-cloud-dart#381 → predicted 12, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue is covered by open PR #382, so per the duplicate rule it sits in the low range and the PR is the item to act on. I watch this repo but I am not the assigned owner, and the reporter is a first-time contributor with no activity from me yet. The bug is real and affects retry behavior in a repo I'm responsible for, which keeps it above the floor, but it is fresh-ish (3 days) and not blocking anyone.
- **Next action:** Review PR #382 (the linked fix from an external contributor) since it is the thing to act on; the issue itself has no separate action.

### 16. dart-lang/http#2034 → predicted 26, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR and I requested review from goderbauer only 2 days ago, so the next step is theirs. Nothing is blocking me yet, and the linked issue #1932 is covered by this PR, so it should not be ranked separately. Repo is one I work in, but the item is simply waiting on a reviewer.
- **Next action:** Wait for goderbauer to review PR #2034; ping them if there's no response by about 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is assigned to me in my own repository, filed by a close collaborator (kevmoo) with a clear next step, and I already engaged with it 10 days ago. Its prerequisite PRs #352 and #353 are merged, so nothing is blocking me. It is my planned work rather than urgent, and the AIP-4222/155 scope was removed, so it sits in the middle of the planned-work range.
- **Next action:** Start implementing the ServiceException JSON/HTML fallback fix and the ServiceClient RetryRunner/RequestOptions wiring for google_cloud_rpc, since this issue is assigned to me and has no external blocker.

### 18. dart-lang/http#2031 → predicted 29, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I was requested as reviewer, but this PR is stacked on three open PRs, and #2014 has no review yet, so the lower PRs need review first. The PR is blocked (mergeable_state blocked) and it is a release-prep change that only makes sense after those fixes land. It is in http2, which the repo note says I am not responsible for. Priority is low until the stack clears.
- **Next action:** Wait for stacked PRs #2010, #2014 and #2009 to be reviewed and merged, then review this release-prep PR (#2031).

### 19. googleapis/google-cloud-dart#345 → predicted 20, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I work in, and I converted it to draft myself 45 days ago with no activity since. Its only reviewer is an automated bot, and it has merge conflicts and unresolved threads, so it is not blocking anyone. It is a draft I should finish or abandon, which places it in the 0.15–0.35 range, toward the lower end because it is stale.
- **Next action:** Nothing needed now; when ready, resolve the 5 open gemini review threads and fix the merge conflicts before marking it ready for review.

### 20. dart-lang/core#1007 → predicted 21, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in dart-lang/core, a repository I don't own, so per the rules it sits in the 0.1–0.25 band. The CLA check failed, so the PR is blocked on the first-time contributor signing the CLA rather than on me. Its fix relates to issue #537, which is also an open bug in path, but the PR is the thing to track. Nothing is directed at me personally.
- **Next action:** Wait for the dart-ecosystem-team to review; the author still needs to sign the CLA before it can be reviewed.

### 21. dart-lang/tools#2544 → predicted 34, priority 0.05
- **Ground truth:** 
- **Model:** This is a security PR, but it sits in dart-lang/tools, which I don't own, and it was requested from dart-ecosystem-team rather than from me personally. lrhn is already reviewing it and was re-requested on 2026-08-26, so the team request is effectively with a specific named reviewer. The author has pushed fixes in response to lrhn's feedback, so the next step belongs to lrhn. I'm only shown as a team member, so I score it near zero.
- **Next action:** Nothing for me now; waiting on lrhn to re-review jonasfj's latest changes, which address his last round of comments.

### 22. dart-lang/tools#2710 → predicted 28, priority 0.10
- **Ground truth:** 
- **Model:** This is a team review request to dart-ecosystem-team in dart-lang/tools, which I am not personally responsible for, and it is shared with the team rather than addressed to me. It is also stacked on draft PR #2563 that has not been reviewed, so the lower PR must be reviewed first. The author is a close collaborator and the PR is fairly fresh (2 days), but none of that makes the next step mine right now.
- **Next action:** Nothing needed from me yet; the PR is stacked on draft #2563 and mergeable is blocked, so wait for mosuem to finish the stack before reviewing.

### 23. dart-lang/native#3763 → predicted 27, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR, and I asked liamappelbe for review only 2 days ago, so there is nothing to do yet. Review is not required from me, and the PR fixes two open issues (#3750, #3752) that are covered by it, so those issues should not be worked separately. The PR is in dart-lang/native, a repository I'm not responsible for, and the author is me, so the next step is squarely with the reviewer.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them if there is still no response after about a week (around 2026-10-30).

### 24. googleapis/google-cloud-dart#373 → predicted 22, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, and sigurdm has approved it, so the main review blocker is cleared. The open question is whether natebosch must review the non-Pub/Sub parts, and I already pinged sigurdm about that 4 days ago, so the next step is waiting rather than acting. Because the approval is in and the last thread was my own ping, nothing is blocking me right now, and the remaining merge decision sits with natebosch or sigurdm. I'd rate this as a low waiting item, slightly above a plain reviewer wait because the PR is approved and close to merge.
- **Next action:** Wait for natebosch (assigned reviewer) or sigurdm to respond; the PR is already approved by sigurdm and I just asked whether it can merge without natebosch's review.

### 25. dart-lang/http#579 → predicted 24, priority 0.12
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** I am the requested reviewer, but the PR is explicitly labeled next-breaking-release and I previously said I lack bandwidth to coordinate a major version, so nothing can be done now. The only new activity is retendo's 14-month-old question, which is not directed to me as a blocker and does not change the blocked status. This is a PR waiting for a future breaking release, so it belongs in the low 0.05–0.15 range, and the staleness places it at the bottom of that range.
- **Next action:** Wait for a planned semver-major release of package:http where this breaking change can land; reply to retendo's workaround question only if there is a stated workaround to offer.

### 26. dart-lang/http#1932 → predicted 13, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by open PR #2034 by me, so the issue itself is a duplicate and the PR is the thing to act on. The PR is my own work and was updated 2d ago, so it is the real next step. Since the issue is mostly waiting on the PR and upstream Google fixes, I rank it in the low range, with a small bump for the recent request for an update from igordanilovski.
- **Next action:** Review and merge the open fix PR dart-lang/http#2034, which covers this issue, then reply to igordanilovski with the status.

### 27. flutter/devtools#8223 → predicted 33, priority 0.05
- **Ground truth:** 
- **Model:** I was only mentioned informationally by bkonyi in a 2024 comment, and the repository is not one I'm responsible for. The work would require network profiling in dart:io and an HTTP profiling redesign owned by other teams. The most recent activity is srawlins removing the 'cost: high' label, which doesn't ask me for anything. The item is an enhancement request with no action required from me.
- **Next action:** Nothing for me to do; this is a flutter/devtools feature request owned by the DevTools team and I was only CC'd on it, and it is blocked by high cost and an unresolved design.

### 28. dart-lang/http#1837 → predicted 32, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** I already replied and labeled it P3, so the next step belongs to a community contributor, not me. It is in dart-lang/http, which I own, but the enhancement is explicitly out of the team's plans and sits in the contributions-welcome backlog. Nothing has happened since my last comment, so it is old low-priority backlog with no freshness boost.
- **Next action:** Nothing to do; the issue is a contributions-welcome P3 feature request that the Dart team has declined to take on, and it is 12 months stale.

### 29. dart-lang/http#2033 → predicted 36, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2 days ago, no new commits or comments have appeared since, and the mergeable state is clean. The remaining step is merging, which belongs to the author or a maintainer, not to me. It is in a repository I am interested in rather than solely responsible for, so it stays near zero.
- **Next action:** Nothing for me; I already approved and the PR is clean and waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 35, priority 0.05
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is a 6-year-old performance enhancement issue in http2, a sub-package I explicitly said I'm not responsible for, with no assignee and no mention of me. The only recent question (lubritto, 8mo ago) asks whether it should be closed, which is a triage question for maintainers rather than something I must answer. The evidence points to a root cause in the SDK socket layer, so the real work is blocked elsewhere.
- **Next action:** Nothing for me; the issue is waiting on the http2 maintainers to triage the root cause (possibly in the SDK socket issue dart-lang/sdk#48210) and decide whether to close it.

### 31. dart-lang/tools#2715 → predicted 18, priority 0.20
- **Ground truth:** 
- **Model:** This is a team review request in dart-lang/tools, a repository I am not listed as responsible for, and davidmorgan is also named personally as a reviewer, so per the rules it sits near 0 to 0.25. The author is a close collaborator and the PR is only two days old, which nudges it toward the upper part of the team-request range. Nothing is blocking me personally, so I should not treat it as urgent.
- **Next action:** Review PR dart-lang/tools#2715 from kevmoo (a close collaborator) since it was requested from dart-ecosystem-team, which I belong to, and I am the default reviewer in this repo only if I maintain it; otherwise leave it to davidmorgan who was requested personally.

### 32. dart-lang/http#2026 → predicted 25, priority 0.10
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is a first-time contributor's PR in dart-lang/http, a repository where I'm only a watcher and I'm explicitly not responsible for http2. Review is requested of mosuem by a comment rather than by me, and no review request names me, so the next step is not mine. It touches the same code as the merged PR #2013 that mosuem drove, so a light glance could be worthwhile later, but there is nothing for me to act on now.
- **Next action:** Wait for mosuem (or another dart-lang/http reviewer) to review PR #2026; nothing is required from me yet.

### 33. dart-lang/native#3653 → predicted 30, priority 0.10
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to liamappelbe, and the last substantive activity was liamappelbe deciding the fix is probably not worth the effort, so the next step is theirs. I'm only a commenter here, in a repository I'm not directly responsible for, and was mentioned only in a thank-you line. The related autorelease-pool issue #3652 is closed, and the landed PR was found not to work, so there is no clear action for me.
- **Next action:** Nothing needed from me now; liamappelbe is deciding whether the larger trampoline change is worth doing, and the related issue #3652 is already closed.

### 34. dart-lang/http#1972 → predicted 31, priority 0.10
- **Ground truth:** 
- **Model:** I asked the reporter for information (client type and whether the server sends Content-Length without a body) and labeled it needs-info, so it is blocked on them. The open PR #1974 already attempts to fix this issue, so the issue itself is covered and should rank well below that PR. The reporter is a stranger, not a collaborator, and the issue is in http, which I am responsible for, but there is no next step for me until they reply.
- **Next action:** Wait for the reporter (Keetz) to answer my questions about the client and server response; PR #1974 is open and covers the fix, so review that PR once it is ready.

### 35. dart-lang/http#1841 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This issue is labeled next-breaking-release, which blocks it for a future major version, and an open PR #2002 already covers it, so the PR is the item to act on rather than this issue. I'm not responsible for the http2 area, but this is dart-lang/http, a repo I'm interested in. The user's thumbs-down was on 2026-10-05, and agam1092005's proposal and commits came after that and mention me directly, so it's worth a low score rather than zero. Given the duplicate and label block, it sits in the 0.15–0.35 range for issues covered by a PR.
- **Next action:** Nothing needed from me now; wait for contributor agam1092005's PR #2002 to be reviewed, which is the work that actually moves this forward.

### 36. dart-lang/sdk#38148 → predicted 5, priority 0.72
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm the assignee on this P2 issue in the Dart SDK, which is a repository I work in, and filiph's comment 24d ago asks how to help, which is a direct request I haven't answered. The thumbs-down at 2026-08-01 predates that comment, so it doesn't suppress this. A commit referencing the issue landed 4 days ago, so there may be a fix to verify, which adds some urgency. It is not a security issue and the core bug is intermittent, so it sits in the 0.65-0.8 band rather than higher.
- **Next action:** Reply to filiph with a pointer on how to reproduce and investigate the recursive delete race, since I'm assigned and they offered help.
