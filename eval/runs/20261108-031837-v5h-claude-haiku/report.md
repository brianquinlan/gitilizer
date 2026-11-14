# Gitilizer eval: v5h-claude-haiku

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5h.md` · signals `True` · 3 trial(s) · 36 items · 20261108-031837

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.569 ± 0.043 |
| spearman | 0.713 ± 0.039 |
| pairwise_acc | 0.785 ± 0.021 |
| ndcg | 0.976 ± 0.004 |
| ndcg@5 | 0.993 ± 0.011 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.933 ± 0.115 |
| top10_overlap | 0.733 ± 0.058 |
| mean_abs_displacement | 5.685 ± 0.525 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.772 ± 0.039 | 0.994 ± 0.001 | 0.800 ± 0.000 | 1.458 ± 0.191 |
| B | 20 | 0.358 ± 0.064 | 0.904 ± 0.060 | 0.533 ± 0.115 | 4.533 ± 0.586 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.93 | 3/3 | dart-lang/sdk#48056 | A | Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist/revocation mitigations (cross-check with closed issue #64644, which is already completed), then reply to acn-masatadakurihara and close or update this issue. |
| 2 | 2.0 (2) | +0.0 | 0.86 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo's inline question on bump.go about whether Bump should append CHANGELOG.md to lib.Keep or whether clean should auto-preserve it, then push a fix and re-request review. |
| 3 | 3.3 (3–4) | +0.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (sigurdm's pre-release polish, a collaborator's PR in my repo) since no one has reviewed it yet, starting with the gemini-flagged issues that touch the streaming code it depends on. |
| 4 | 3.7 (3–4) | -0.3 | 0.71 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382 (fix for JSON error status code mapping) since no human reviewer has been assigned yet in my repository. |
| 5 | 5.7 (5–7) | +0.7 | 0.67 | 3/3 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string in ProtoEnum) and reply with approval or changes so they can open a preliminary design PR. |
| 6 | 11.3 (10–12) | +5.3 | 0.55 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue the close-semantics redesign (tracking outstanding requests or an async close for a 2.0 release) and add it to the 2.0 breaking-change plan. |
| 7 | 7.7 (7–8) | +0.7 | 0.60 | 3/3 | dart-lang/http#1981 | B | Carry on with the implementation I just announced, starting from a skeleton PR for the serverTrustEvaluator hook in CupertinoClient. |
| 8 | 13.0 (12–14) | +5.0 | 0.52 | 3/3 | googleapis/google-cloud-dart#360 | A | Check whether Google APIs actually send incremental JSON arrays for non-SSE streaming, then reply to kevmoo on the issue with what you find. |
| 9 | 14.3 (13–15) | +5.3 | 0.42 | 3/3 | dart-lang/sdk#59846 | B | Triage this bug: decide whether to fix the dart:io HTTP header-name parser to enforce RFC 9110 tchar rules, or close it with a rationale; no fix work has started. |
| 10 | 5.7 (5–6) | -4.3 | 0.70 | 3/3 | googleapis/google-cloud-dart#361 | A | Reply to kevmoo's question on whether to switch compute_v1 to discovery or add convenience extensions to the protobuf version, since he is waiting on that decision. |
| 11 | 18.0 (16–20) | +7.0 | 0.28 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed from me now; this is an old dart:io bug with no open PR, and I was only CC'd on it. |
| 12 | 14.3 (11–17) | +2.3 | 0.38 | 3/3 | dart-lang/native#3752 | B | Finish and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue. |
| 13 | 11.3 (10–13) | -1.7 | 0.57 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to fix the version constraint via librarian automation or manually, then bump google_cloud_storage and google_cloud_pubsub pubspecs once the new google_cloud_rpc version is published. |
| 14 | 19.0 (17–21) | +5.0 | 0.22 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since the dart-ecosystem-team review request is shared and nobody has reviewed it yet. |
| 15 | 14.7 (7–19) | -0.3 | 0.37 | 3/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which already fixes this issue, and then decide whether to merge it, since the issue itself has no work left beyond the PR. |
| 16 | 27.0 (25–29) | +11.0 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; ping them again if still no response by around 2026-10-30. |
| 17 | 9.0 (9) | -8.0 | 0.60 | 3/3 | googleapis/google-cloud-dart#359 | B | Start implementing the ServiceException JSON-decode hardening and the ServiceClient RetryRunner/RequestOptions wiring (or split the work into a PR), since I'm the assignee and this is my planned work. |
| 18 | 25.7 (21–29) | +7.7 | 0.12 | 0/3 | dart-lang/http#2031 | A | Wait for the stacked PRs #2010, #2014 and #2009 to be reviewed and merged before reviewing this release-prep PR. |
| 19 | 18.0 (17–19) | -1.0 | 0.28 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish the DNS PR (address the five unresolved Gemini review threads and fix the merge conflict) or close it, since it is a stale draft I own. |
| 20 | 24.0 (22–28) | +4.0 | 0.13 | 0/3 | dart-lang/core#1007 | B | Wait for the author to sign the CLA, then a dart-ecosystem-team member reviews; nothing for me to do now. |
| 21 | 29.3 (21–34) | +8.3 | 0.11 | 1/3 | dart-lang/tools#2544 | B | Review the requested reviewer status: lrhn has pushed back on the latest changes, and jonasfj has re-requested lrhn, so the next step is for me to check the team review request and whether I should weigh in on the UNC check. |
| 22 | 22.3 (20–24) | +0.3 | 0.13 | 0/3 | dart-lang/tools#2710 | B | Wait for a dart-ecosystem-team member to review PR #2710 (team request in a repo I don't own); it is stacked on draft #2563 anyway. |
| 23 | 28.0 (26–30) | +5.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them only if there is still no response after about a week. |
| 24 | 25.3 (16–31) | +1.3 | 0.17 | 1/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether the non-Pub/Sub parts look good, or for natebosch to review; nothing is mine to do yet. |
| 25 | 29.3 (26–32) | +4.3 | 0.11 | 0/3 | dart-lang/http#579 | B | Nothing for me now; this is blocked on a future semver-major release, and I could reply to retendo's workaround question when I have bandwidth. |
| 26 | 14.7 (14–16) | -11.3 ⚠️ | 0.37 | 3/3 | dart-lang/http#1932 | B | Reply to igordanilovski with a status update and push PR #2034 (my open fix, which closes this issue) toward merge. |
| 27 | 34.0 (33–35) | +7.0 | 0.03 | 0/3 | flutter/devtools#8223 | B | Nothing for me; this is a flutter/devtools feature request outside my repositories, where I was only CC'd by bkonyi in 2024 and the work is high-cost and unplanned. |
| 28 | 32.0 (31–33) | +4.0 | 0.08 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a contributions-welcome P3 enhancement I already declined to take on, waiting on a community contributor if anyone. |
| 29 | 35.0 (34–36) | +6.0 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing needed from me; I already approved and the PR is clean, so it's waiting on mosuem to merge. |
| 30 | 35.7 (35–36) | +5.7 | 0.02 | 0/3 | dart-lang/http#1365 | A | No action needed from me; the issue is a stale performance enhancement with no clear step for me, and the http2 package is outside my stated scope. |
| 31 | 19.3 (8–28) | -11.7 ⚠️ | 0.27 | 1/3 | dart-lang/tools#2715 | B | Wait for davidmorgan or dart-ecosystem-team to review kevmoo's PR; no action needed from me yet. |
| 32 | 27.7 (24–32) | -4.3 | 0.08 | 0/3 | dart-lang/http#2026 | A | Wait for mosuem (or another http2 maintainer) to review PR #2026; I'm not the reviewer here since I'm not responsible for http2. |
| 33 | 26.3 (24–30) | -6.7 | 0.11 | 0/3 | dart-lang/native#3653 | A | Nothing for me to do; the fix was reverted in practice and the team is deciding on a different approach, so wait for liamappelbe to decide. |
| 34 | 27.3 (25–31) | -6.7 | 0.11 | 0/3 | dart-lang/http#1972 | B | Wait for the reporter (Keetz) to answer my questions about the client and server scenario; the open PR #1974 is already addressing the fix. |
| 35 | 22.0 (20–23) | -13.0 ⚠️ | 0.16 | 0/3 | dart-lang/http#1841 | B | Wait for agam1092005's PR #2002 (adding retryDelay callback) to be reviewed; no action needed from me yet. |
| 36 | 9.0 (6–11) | -27.0 ⚠️ | 0.63 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph with a pointer on how to reproduce and debug the recursive delete race, since he asked how to help and I'm the assignee. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/tools#2715** (truth #31) in 1/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/tools#2715** (truth #31) in 1/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue assigned to me, in code I own (dart:io Android trust), with fresh activity 3 days ago: a new report of a compromised intermediate CA chain and a direct question about revocation handling. Per the security rules it must score at the top of the scale, and leaving it in an unknown state is not acceptable. The related issue #64644 suggests a fix may already have landed, but confirming that and answering the reporter is still my job.
- **Next action:** Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist/revocation mitigations (cross-check with closed issue #64644, which is already completed), then reply to acn-masatadakurihara and close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR with an unanswered review question from a close collaborator (kevmoo) that identifies a real bug: the next generate would delete the CHANGELOG.md the bump creates. The PR is in googleapis/librarian, which is not one of my listed repositories, but I am the author and the question is directed at my work and blocks it, so it sits in the 0.8–0.9 range. Reviewer feedback arrived 21h ago, so it is fresh.
- **Next action:** Answer kevmoo's inline question on bump.go about whether Bump should append CHANGELOG.md to lib.Keep or whether clean should auto-preserve it, then push a fix and re-request review.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR in google-cloud-dart, a repo I'm responsible for, from a close collaborator, with no human review yet, so the default is that it's on me to review. It's 5 days old and freshly updated, and the work is mostly small polish, but it sits on top of the unmerged streaming work in #292 and gemini flagged potential unhandled StateErrors and hangs there. It is not mergeable yet (behind main), so the review should focus on that and the attribution header, keeping it in the reviews-waiting-on-me range below security or my own blocked PRs.
- **Next action:** Review PR #376 (sigurdm's pre-release polish, a collaborator's PR in my repo) since no one has reviewed it yet, starting with the gemini-flagged issues that touch the streaming code it depends on.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a non-security PR in google-cloud-dart, a repository I'm responsible for, with no human review yet, so I'm the default reviewer and it's on me. The author is a first-time contributor, which puts it below collaborator PRs but still in the review-waiting range. It fixes a real retry bug tied to issue #381 and is fresh at 3 days old.
- **Next action:** Review PR #382 (fix for JSON error status code mapping) since no human reviewer has been assigned yet in my repository.

### 5. googleapis/google-cloud-dart#252 → predicted 7, priority 0.62
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug issue in a repo I own, and the contributor has posted a concrete design sketch that needs my decision before any code is written. The contributor is not a collaborator, and I explicitly asked for a design-first approach, so the next step is mine. It was updated 4 days ago, which keeps it reasonably fresh, but it is a p2 bug with no urgency and the design needs more work before implementation.
- **Next action:** Review Yusufihsangorgel's 2026-10-21 design proposal (nullable number and string in ProtoEnum) and reply with approval or changes so they can open a preliminary design PR.

### 6. dart-lang/http#2027 → predicted 10, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue, filed 9 days ago in dart-lang/http, a repository I work in, so it counts as fresh planned work in the 0.5-0.65 range. Nothing is waiting on anyone else and nobody has replied, so the next step is mine: pick a design direction. It sits at the lower end of the range because there is no new external activity and no deadline.
- **Next action:** Decide whether to pursue the close-semantics redesign (tracking outstanding requests or an async close for a 2.0 release) and add it to the 2.0 breaking-change plan.

### 7. dart-lang/http#1981 → predicted 8, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself and said I've started work 5h ago, so this is my own planned work in a repository I maintain, which places it in the 0.5–0.65 band. The issue is not urgent or security-related, and the author has not yet submitted a PR, so nothing is blocked on anyone else. Freshness is high because I acted today, but the item sits mid-range since it's a feature request with no deadline.
- **Next action:** Carry on with the implementation I just announced, starting from a skeleton PR for the serverTrustEvaluator hook in CupertinoClient.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.50
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a non-security issue in google-cloud-dart, a repo I maintain, filed by collaborator kevmoo with a concrete next step that is mine: my unanswered question about server behavior, which kevmoo answered with "I don't know". Kevmoo says it isn't urgent and nothing has happened in 17 days, so it sits at the lower-middle of the 0.5–0.65 band. The mid-stream SSE error handling part is a real correctness gap, but it doesn't change the ranking here.
- **Next action:** Check whether Google APIs actually send incremental JSON arrays for non-SSE streaming, then reply to kevmoo on the issue with what you find.

### 9. dart-lang/sdk#59846 → predicted 13, priority 0.50
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I am the assignee, so this is assigned work I should either fix or unassign, which places it in the 0.5-0.65 range. It is about 22 months old with no activity since triage, so it sinks to the lower part of that range. It is in dart-lang/sdk, a repository I am not listed as responsible for, and it is not security-related, which argues against ranking it higher.
- **Next action:** Triage this bug: decide whether to fix the dart:io HTTP header-name parser to enforce RFC 9110 tchar rules, or close it with a rationale; no fix work has started.

### 10. googleapis/google-cloud-dart#361 → predicted 5, priority 0.70
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a non-security issue in my own repository (google-cloud-dart) from a close collaborator, and kevmoo's last comment is a substantive design question directed at me that I haven't answered. I was the last human to speak, though, and my own question was answered with a suggestion that may be a rhetorical opening rather than a blocking ask. The work itself is not yet approved or scheduled, so it sits in the low end of the 0.65-0.8 band for collaborator-directed items waiting on my reply, rather than higher.
- **Next action:** Reply to kevmoo's question on whether to switch compute_v1 to discovery or add convenience extensions to the protobuf version, since he is waiting on that decision.

### 11. dart-lang/sdk#31275 → predicted 16, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a real crash-causing bug in dart:io, but I'm only CC'd (kevmoo and parlough both pinged me informationally) and no one is asking me to act. The item is 1.7 years quiet, its fix was an abandoned CL from another engineer, and I am not the owner of the library in any stated sense. It is an important old issue where I was CC'd, so it sits in the 0.35-ish band lower end, slightly lowered because there is no concrete step for me.
- **Next action:** Nothing needed from me now; this is an old dart:io bug with no open PR, and I was only CC'd on it.

### 12. dart-lang/native#3752 → predicted 15, priority 0.30
- **Ground truth:** 
- **Model:** This is my own issue, assigned to me and filed six days ago in a repository I own, so it's planned work. However, PR #3763 already covers it and is open, so per the duplicate rule the issue itself should rank well below the PR and sit in the low range. The PR was updated two days ago, so it is active work and the remaining step is mine to finish and merge.
- **Next action:** Finish and merge the linked PR #3763 that adds scheduleInRunLoop:forMode: support, then close this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 11, priority 0.55
- **Ground truth:** 
- **Model:** This is my own tracked work in a repository I am responsible for, filed by a collaborator with a clear next step. I left a comment 17 days ago deciding on an approach, and the actual fix is blocked on a generated google_cloud_rpc release that may not exist yet. The pending decision is mine, so it sits in the planned-work range, but it is not urgent since nothing external is waiting on it.
- **Next action:** Decide whether to fix the version constraint via librarian automation or manually, then bump google_cloud_storage and google_cloud_pubsub pubspecs once the new google_cloud_rpc version is published.

### 14. dart-lang/tools#2719 → predicted 17, priority 0.25
- **Ground truth:** 
- **Model:** This is a bot-authored PR in dart-lang/tools, a repository I'm not responsible for, and the only review request is to a team I belong to, which is explicitly low priority (0.1–0.25) in such repositories. It is fresh (19h) and no human has touched it, and the mergeable state is blocked, so it's not urgent. It sits at the top of its range because it is a routine dependency bump that the ecosystem team may want someone to pick up.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools, since the dart-ecosystem-team review request is shared and nobody has reviewed it yet.

### 15. googleapis/google-cloud-dart#381 → predicted 18, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue has an open PR (#382) that covers it, so the PR is the thing to act on and the issue ranks well below it. The reporter is an external contributor, the repository is one I'm responsible for, and the bug is a real correctness problem for retries, but nothing is directed at me yet and the issue itself was filed only 3 days ago with no human replies. The issue sits in the 0.15–0.35 range for items covered by a PR.
- **Next action:** Review PR #382, which already fixes this issue, and then decide whether to merge it, since the issue itself has no work left beyond the PR.

### 16. dart-lang/http#2034 → predicted 25, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR and I requested review from goderbauer only 2 days ago, so nothing is due from me yet. The PR is blocked on a reviewer who has not responded, and the linked bug #1932 is covered by this PR, so it should not be ranked above it. It sits in the low range for PRs waiting on a recently asked reviewer, and I should ping if a week passes without a response.
- **Next action:** Wait for goderbauer to review PR #2034; ping them again if still no response by around 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue I'm assigned in a repository I'm responsible for, filed by a close collaborator with a clear next step for me, so it sits in the 0.5–0.65 planned-work range. I already did the research and scoped out the AIP-4222/155 part to issue #80, so the remaining work is concrete and it is not blocked. It was last touched 10 days ago, so freshness is moderate and it doesn't need to rise higher.
- **Next action:** Start implementing the ServiceException JSON-decode hardening and the ServiceClient RetryRunner/RequestOptions wiring (or split the work into a PR), since I'm the assignee and this is my planned work.

### 18. dart-lang/http#2031 → predicted 27, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This is a release-prep PR from a close collaborator that I was requested to review, but it is stacked on three open PRs, one of which (#2014) has not been reviewed yet, so it cannot land first. The PR is in a repository I'm responsible for, but it is blocked by its base chain and mergeable_state is blocked. Freshness is moderate (updated 2.6 days ago), but the lower PRs need review first, so it sits in the stacked-PR range.
- **Next action:** Wait for the stacked PRs #2010, #2014 and #2009 to be reviewed and merged before reviewing this release-prep PR.

### 19. googleapis/google-cloud-dart#345 → predicted 19, priority 0.25
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR, so per the scale it belongs in the 0.15–0.35 range for drafts I should finish or abandon. It has been untouched for 45 days, so it sinks to the bottom of that range. It is not blocking anyone, and the gemini review issues and dirty merge state mean it needs a real decision rather than a quick nudge.
- **Next action:** Decide whether to finish the DNS PR (address the five unresolved Gemini review threads and fix the merge conflict) or close it, since it is a stale draft I own.

### 20. dart-lang/core#1007 → predicted 28, priority 0.10
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in dart-lang/core, a repository I don't own, so it sits in the 0.1–0.25 team-request band. The PR is blocked by an unsigned CLA (mergeable_state blocked, CLA check failed), so no reviewer can act yet. It is recent and fixes a bug in a package I don't clearly own, so it stays low.
- **Next action:** Wait for the author to sign the CLA, then a dart-ecosystem-team member reviews; nothing for me to do now.

### 21. dart-lang/tools#2544 → predicted 21, priority 0.20
- **Ground truth:** 
- **Model:** This is a security-related PR, but it is not in a repository I own, and the review request came via the dart-ecosystem-team, which is a team I belong to in a repository I'm not responsible for. The active reviewer lrhn is already engaged and the author is actively iterating, so my involvement is not required. Team review requests in repos I don't own sit in the 0.1-0.25 band, and since the security nature gives a slight bump but no direct request to me, I place it at the upper part of that band.
- **Next action:** Review the requested reviewer status: lrhn has pushed back on the latest changes, and jonasfj has re-requested lrhn, so the next step is for me to check the team review request and whether I should weigh in on the UNC check.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.12
- **Ground truth:** 
- **Model:** The only review request is to dart-ecosystem-team, a team I belong to, which is shared rather than addressed to me personally, and dart-lang/tools is a repository I'm not responsible for. The PR is also stacked on draft PR #2563, so it cannot land until that merges, and mergeable_state is blocked. Author mosuem is a close collaborator and the activity is recent, but nothing needs me right now.
- **Next action:** Wait for a dart-ecosystem-team member to review PR #2710 (team request in a repo I don't own); it is stacked on draft #2563 anyway.

### 23. dart-lang/native#3763 → predicted 26, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested review from liamappelbe two days ago, so the next step belongs to the reviewer, not me. The PR is not stale yet, so it should sit in the low range for PRs waiting on a recently asked reviewer. It covers two linked issues, so it is worth tracking, but there is nothing for me to do until about a week of silence has passed.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them only if there is still no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 29, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, and I last acted 4 days ago by asking sigurdm to check the non-Pub/Sub parts, so the ball is in his court. The approval from sigurdm covers only the Pub/Sub bits, and natebosch, the assigned reviewer, hasn't reviewed yet. The PR is behind main with 2 unresolved review threads, which I should eventually clear up, but the next step is waiting on reviewers, so it sits in the low range. I'd ping again in about a week if there's still no response.
- **Next action:** Wait for sigurdm to answer whether the non-Pub/Sub parts look good, or for natebosch to review; nothing is mine to do yet.

### 25. dart-lang/http#579 → predicted 32, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR is a breaking API change explicitly labeled next-breaking-release, and I already said I lack the bandwidth to coordinate a major release. The only recent activity is retendo's question about a workaround, which is a question but does not unblock the work. Its last human activity is 14 months old, so it is stale and blocked by plan, which places it in the 0.05 to 0.15 range.
- **Next action:** Nothing for me now; this is blocked on a future semver-major release, and I could reply to retendo's workaround question when I have bandwidth.

### 26. dart-lang/http#1932 → predicted 14, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** The issue is covered by my own open PR #2034, which was updated 2 days ago, so the PR is the real work item and this issue ranks below it. The latest comment is a status request from a non-collaborator, and the underlying blocker is an upstream Chromium/Play Services dependency issue I've already reopened. A short status reply and continued work on the PR are the only useful steps, so this sits in the low-to-mid range.
- **Next action:** Reply to igordanilovski with a status update and push PR #2034 (my open fix, which closes this issue) toward merge.

### 27. flutter/devtools#8223 → predicted 35, priority 0.02
- **Ground truth:** 
- **Model:** I am only mentioned as an informational CC on a feature request in flutter/devtools, which is not a repository I am responsible for. The original CC was almost two years ago and the only recent activity is a label change by srawlins, which does not ask me anything. The item is blocked on substantial dart:io and HTTP profiling work, so there is nothing I can usefully do right now.
- **Next action:** Nothing for me; this is a flutter/devtools feature request outside my repositories, where I was only CC'd by bkonyi in 2024 and the work is high-cost and unplanned.

### 28. dart-lang/http#1837 → predicted 33, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** Last activity was my own comment and P3 label 12 months ago, with no new human activity since. The item is labeled contributions-welcome and I told the author the Dart team is unlikely to take it on, so it sits in the old low-priority backlog range. The related flutter issue is a separate, unrelated item that doesn't change my next step. Freshness is very low, so it sinks to the bottom of its range.
- **Next action:** Nothing to do; this is a contributions-welcome P3 enhancement I already declined to take on, waiting on a community contributor if anyone.

### 29. dart-lang/http#2033 → predicted 34, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR two days ago, there are no unresolved threads, no requested reviewers, and the author has not pushed anything since my review. The PR is mergeable and only the author or a maintainer merging it remains. This is a collaborator's infra change in a repository I'm responsible for, but my part is done, so it sits near the bottom of the list.
- **Next action:** Nothing needed from me; I already approved and the PR is clean, so it's waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I only watch dart-lang/http and have explicitly noted I am not responsible for http2, so this item is outside my scope. The last activity is a question from lubritto about whether to close it, which is not directed at me and doesn't change what I should do. The issue has no PR, is labeled as an enhancement, and has been dormant for about eight months with only a bystander relationship to me.
- **Next action:** No action needed from me; the issue is a stale performance enhancement with no clear step for me, and the http2 package is outside my stated scope.

### 31. dart-lang/tools#2715 → predicted 22, priority 0.12
- **Ground truth:** 
- **Model:** This is a PR by a close collaborator, and I was only requested via the dart-ecosystem-team team, which is a shared team review request in a repository I'm not responsible for (dart-lang/tools). Davidmorgan is also named directly, so the team request is near zero for me. The PR is blocked on review by others, and the author pushed commits only two days ago, so it isn't stale.
- **Next action:** Wait for davidmorgan or dart-ecosystem-team to review kevmoo's PR; no action needed from me yet.

### 32. dart-lang/http#2026 → predicted 24, priority 0.10
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This is a first-time contributor's PR in the http2 package, which the user explicitly said they are not responsible for. The author has asked mosuem, not me, for a review, and no review request names me. The CLA is now signed and the author pushed fresh work yesterday, so it is moving, but nothing is waiting on me. I have no prior involvement beyond watching the repo, so it stays low.
- **Next action:** Wait for mosuem (or another http2 maintainer) to review PR #2026; I'm not the reviewer here since I'm not responsible for http2.

### 33. dart-lang/native#3653 → predicted 30, priority 0.10
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to liamappelbe, who is driving the work, and the planned change was found not to function, so the next step belongs to him. My own involvement was an experiment and a comment, and the last human activity was his comment 34 days ago, which he framed as likely not worth the effort. It is in a repository I'm interested in and relates to my own autorelease pool bug, so it stays slightly above zero.
- **Next action:** Nothing for me to do; the fix was reverted in practice and the team is deciding on a different approach, so wait for liamappelbe to decide.

### 34. dart-lang/http#1972 → predicted 31, priority 0.10
- **Ground truth:** 
- **Model:** I asked the reporter for information 8 days ago and labeled it needs-info, so the next step is theirs. PR #1974 already claims to fix this issue, so the issue itself has nothing left for me to do beyond reviewing that PR, which ranks it lower. The reporter is an outside contributor, not a collaborator, and this is a non-security bug in a package I'm responsible for.
- **Next action:** Wait for the reporter (Keetz) to answer my questions about the client and server scenario; the open PR #1974 is already addressing the fix.

### 35. dart-lang/http#1841 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** This is in dart-lang/http, which I maintain, but the issue is covered by open PR #2002 from agam1092005, so the PR is the thing to act on and the issue ranks below it. The issue is labeled next-breaking-release, but the proposed approach is non-breaking, so the label is stale-ish and not a hard block. Agam's comment asking to work on it was 25 days ago and nothing from me has been asked of me directly beyond an earlier question I already answered; the thumbs-down on 2026-10-05 also means only newer significant activity counts, and the new comment and PR since then are minor and peripheral. Keeping it visible near the low-middle of the range.
- **Next action:** Wait for agam1092005's PR #2002 (adding retryDelay callback) to be reviewed; no action needed from me yet.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.70
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm the assignee, and filiph (a collaborator-level contributor) asked a direct question 24 days ago that I haven't answered, so the next step is mine. Thumbs-down was marked before the new reproduction comment, which counts as new activity directed at me. The issue is a P2 crash-style bug in widely used core IO, but a commit referenced it 4 days ago, so it may already be partly addressed. Placed in the non-security range where reviews and collaborator replies sit.
- **Next action:** Reply to filiph with a pointer on how to reproduce and debug the recursive delete race, since he asked how to help and I'm the assignee.
