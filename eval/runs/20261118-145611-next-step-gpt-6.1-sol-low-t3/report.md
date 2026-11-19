# Gitilizer eval: next-step-gpt-6.1-sol-low-t3

strategy `pointwise` · model `gpt-6.1-sol` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/mnt/gitilizer/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261118-145611

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.638 ± 0.000 |
| spearman | 0.786 ± 0.000 |
| pairwise_acc | 0.819 ± 0.000 |
| ndcg | 0.973 ± 0.000 |
| ndcg@5 | 0.948 ± 0.000 |
| top3_overlap | 0.333 ± 0.000 |
| top5_overlap | 0.600 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 4.611 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.800 ± 0.000 | 0.996 ± 0.000 | 1.000 ± 0.000 | 1.250 ± 0.000 |
| B | 20 | 0.526 ± 0.000 | 0.944 ± 0.000 | 0.600 ± 0.000 | 3.300 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.97 | 1/1 | dart-lang/sdk#48056 | A | [todo] Verify Android’s disabled-CA handling and whether #64644 addresses the reported compromise exposure, then document remaining security gaps. |
| 2 | 4.0 (4) | +2.0 | 0.86 | 1/1 | googleapis/librarian#7808 | A | [respond] Answer kevmoo’s CHANGELOG.md preservation question and update the PR with the chosen fix and regression coverage. |
| 3 | 6.0 (6) | +3.0 | 0.76 | 1/1 | googleapis/google-cloud-dart#376 | A | [review] Review #376's attribution header, version tests, and release-packaging changes. |
| 4 | 7.0 (7) | +3.0 | 0.72 | 1/1 | googleapis/google-cloud-dart#382 | A | [review] Review #382's RPC error-code mapping, compatibility impact, and retry tests. |
| 5 | 5.0 (5) | +0.0 | 0.81 | 1/1 | googleapis/google-cloud-dart#252 | B | [respond] Review Yusufihsangorgel’s proposed enum representation and confirm the approach or request changes before implementation. |
| 6 | 11.0 (11) | +5.0 | 0.56 | 1/1 | dart-lang/http#2027 | B | [todo] Evaluate async Client.close semantics and verify current ffigen/jnigen callback behavior before proposing a concrete API change. |
| 7 | 2.0 (2) | -5.0 | 0.92 | 1/1 | dart-lang/http#1981 | B | [todo] Implement the CupertinoClient server-trust evaluation hook you said you have started working on. |
| 8 | 12.0 (12) | +4.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | [todo] Decide how to address mid-stream error propagation and whether incremental JSON decoding needs endpoint validation first. |
| 9 | 3.0 (3) | -6.0 | 0.92 | 1/1 | dart-lang/sdk#59846 | B | [todo] Verify whether invalid header names are still accepted and address the potential proxy parsing security risk. |
| 10 | 13.0 (13) | +3.0 | 0.39 | 0/1 | googleapis/google-cloud-dart#361 | A | [waiting] Wait for kevmoo to weigh switching to Discovery against adding convenience extensions to the existing operations. |
| 11 | 26.0 (26) | +15.0 ⚠️ | 0.04 | 0/1 | dart-lang/sdk#31275 | A | [not_yours] No action required; leave investigation and ownership with the SDK dart:io maintainers. |
| 12 | 17.0 (17) | +5.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | [elsewhere] Track and advance the fix in PR dart-lang/native#3763 rather than acting separately on this issue. |
| 13 | 10.0 (10) | -3.0 | 0.60 | 1/1 | googleapis/google-cloud-dart#366 | B | [todo] Check the RPC release status, then raise both packages’ minimum RPC dependency and changelogs before publishing. |
| 14 | 18.0 (18) | +4.0 | 0.16 | 0/1 | dart-lang/tools#2719 | B | [not_yours] Leave review to the dart-ecosystem-team; no personal action is required. |
| 15 | 14.0 (14) | -1.0 | 0.30 | 0/1 | googleapis/google-cloud-dart#381 | A | [elsewhere] Review PR #382, which fixes this issue. |
| 16 | 21.0 (21) | +5.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | [waiting] Wait for goderbauer’s review; follow up if there is no response after about a week. |
| 17 | 9.0 (9) | -8.0 | 0.61 | 1/1 | googleapis/google-cloud-dart#359 | B | [todo] Implement the ServiceClient retry and RequestOptions integration, including robust handling of non-JSON HTTP errors. |
| 18 | 23.0 (23) | +5.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | [elsewhere] Review prerequisite PR #2014 before reviewing this release PR. |
| 19 | 15.0 (15) | -4.0 | 0.23 | 1/1 | googleapis/google-cloud-dart#345 | A | [todo] Decide whether to finish or close the DNS draft; if continuing, resolve conflicts and validate the bot-reported example and test issues. |
| 20 | 19.0 (19) | -1.0 | 0.15 | 0/1 | dart-lang/core#1007 | B | [not_yours] Leave review to the dart-ecosystem-team; no personal action is required. |
| 21 | 31.0 (31) | +10.0 ⚠️ | 0.02 | 0/1 | dart-lang/tools#2544 | B | [not_yours] Leave the review to lrhn and the requested revisions to jonasfj. |
| 22 | 27.0 (27) | +5.0 | 0.03 | 0/1 | dart-lang/tools#2710 | B | [not_yours] Leave review to the requested team; prerequisite dart-lang/tools#2563 needs review first. |
| 23 | 22.0 (22) | -1.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | [waiting] Wait for liamappelbe’s review; follow up if there is no response after about a week. |
| 24 | 20.0 (20) | -4.0 | 0.12 | 0/1 | googleapis/google-cloud-dart#373 | B | [waiting] Wait for sigurdm to confirm whether his review covered the non-PubSub changes and the PR is ready to merge. |
| 25 | 24.0 (24) | -1.0 | 0.10 | 0/1 | dart-lang/http#579 | B | [waiting] Wait for coordinated major-release planning before revisiting the upload-progress API. |
| 26 | 16.0 (16) | -10.0 ⚠️ | 0.20 | 0/1 | dart-lang/http#1932 | B | [elsewhere] Track and advance the fix in PR dart-lang/http#2034 rather than work this issue separately. |
| 27 | 29.0 (29) | +2.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | [not_yours] No action needed; the DevTools team and bkonyi are handling the feature discussion. |
| 28 | 25.0 (25) | -3.0 | 0.06 | 1/1 | dart-lang/http#1837 | A | [backlog] Leave this for community contributions; revisit only during backlog grooming or if a contributor volunteers. |
| 29 | 34.0 (34) | +5.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | [not_yours] No action needed; your approval is complete, and the author can proceed with merging. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | [not_yours] Leave triage and any closure decision to the http2 maintainers. |
| 31 | 28.0 (28) | -3.0 | 0.02 | 0/1 | dart-lang/tools#2715 | B | [not_yours] Leave the review to davidmorgan, the explicitly requested reviewer. |
| 32 | 33.0 (33) | +1.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | [not_yours] Leave this review to mosuem; no action is needed from you. |
| 33 | 30.0 (30) | -3.0 | 0.02 | 0/1 | dart-lang/native#3653 | A | [not_yours] Leave the implementation decision to liamappelbe, who owns this issue. |
| 34 | 32.0 (32) | -2.0 | 0.02 | 0/1 | dart-lang/http#1972 | B | [elsewhere] Track PR #1974; wait for the reporter to provide the client details and reproduction requested on this issue. |
| 35 | 35.0 (35) | +0.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | [not_yours] No action on this issue; implementation is tracked in PR #2002. |
| 36 | 8.0 (8) | -28.0 ⚠️ | 0.72 | 1/1 | dart-lang/sdk#38148 | B | [respond] Ask filiph for the reproducible directory setup and steps to investigate the deletion failure. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2034** (truth #16) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#359** (truth #17) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.97
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** You created and are assigned this security issue, and recent comments raise potential HTTPS impersonation exposure involving compromised CA keys. The related issue #64644 is completed, but that does not establish that Android’s disabled-certificate handling or broader blocklist behavior is fixed. Confirming the remaining exposure is urgent despite this issue’s age and P3 label.
- **Next action:** [todo] Verify Android’s disabled-CA handling and whether #64644 addresses the reported compromise exposure, then document remaining security gaps.

### 2. googleapis/librarian#7808 → predicted 4, priority 0.86
- **Ground truth:** Review feedback needs addressed.
- **Model:** Your own PR has fresh, unanswered review feedback from kevmoo, so moving it forward is on you. The feedback identifies a concrete risk of a subsequent generate deleting the new changelog, and resolving it also advances the fix for initial Dart package release tagging.
- **Next action:** [respond] Answer kevmoo’s CHANGELOG.md preservation question and update the PR with the chosen fix and regression coverage.

### 3. googleapis/google-cloud-dart#376 → predicted 6, priority 0.76
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR from sigurdm, a usual collaborator, in a repository you own, so you are the default human reviewer. It has waited five days and supports the initial Pub/Sub release. The base is main and the related prerequisite PRs are merged, so there is no apparent dependency blocking your review; bot comments do not count as a human review.
- **Next action:** [review] Review #376's attribution header, version tests, and release-packaging changes.

### 4. googleapis/google-cloud-dart#382 → predicted 7, priority 0.72
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This PR is in a repository you own and has no human review, so you are the default reviewer despite no explicit request. It fixes incorrect REST error classification that prevents ABORTED errors from being retried, making it meaningful correctness work. The contributor has supplied focused tests; it deserves timely review, below comparable collaborator PRs.
- **Next action:** [review] Review #382's RPC error-code mapping, compatibility impact, and retry tests.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.81
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** The contributor supplied the design sketch you requested and is waiting for agreement before writing substantial code. This is your issue in a repository you own, so timely feedback directly unblocks their contribution. It is a non-security compatibility bug, but the actionable design decision puts it above ordinary issue triage.
- **Next action:** [respond] Review Yusufihsangorgel’s proposed enum representation and confirm the approach or request changes before implementation.

### 6. dart-lang/http#2027 → predicted 11, priority 0.56
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in an area you own, with concrete investigation and API design work to move forward and nobody else blocking it. Client lifecycle semantics affect timeout cleanup and implementation correctness across package:http, but there is no unanswered request or confirmed security vulnerability making it urgent.
- **Next action:** [todo] Evaluate async Client.close semantics and verify current ffigen/jnigen callback behavior before proposing a concrete API change.

### 7. dart-lang/http#1981 → predicted 2, priority 0.92
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This concerns TLS trust evaluation and certificate pinning in code you own, and you assigned it to yourself and explicitly took it on five hours ago. Your latest commitment supersedes the earlier request for a contributor skeleton PR, so it is yours to move forward rather than waiting on the reporter. Under the security-first guidance, this active, assigned trust-related work belongs at the top of the scale.
- **Next action:** [todo] Implement the CupertinoClient server-trust evaluation hook you said you have started working on.

### 8. googleapis/google-cloud-dart#360 → predicted 12, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** Kevmoo answered your question, so this is no longer waiting on reporter information; there is a concrete implementation decision in a repository you own. Silently swallowing streaming errors is a real correctness gap, but the collaborator explicitly says it is not urgent and incremental JSON behavior remains unverified. The related PRs are merged and do not establish that this issue's acceptance criteria are satisfied.
- **Next action:** [todo] Decide how to address mid-stream error propagation and whether incremental JSON decoding needs endpoint validation first.

### 9. dart-lang/sdk#59846 → predicted 3, priority 0.92
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned this unresolved HTTP parser issue, and accepting NUL and whitespace in header names can create security-relevant parsing differences with upstream proxies. There is no linked fix or other person clearly driving it. Its age does not diminish the need to verify the current behavior and resolve the security uncertainty.
- **Next action:** [todo] Verify whether invalid header names are still accepted and address the potential proxy parsing security risk.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.39
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** You asked kevmoo a concrete design question, and they have not replied, so there is no immediate implementation or response needed from you. This is a collaborator's issue in a repository you own, making it worth keeping visible for follow-up, but it concerns polling ergonomics rather than broken functionality and has been quiet for 16 days.
- **Next action:** [waiting] Wait for kevmoo to weigh switching to Discovery against adding convenience extensions to the existing operations.

### 11. dart-lang/sdk#31275 → predicted 26, priority 0.04
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is a production-crash bug, but it is in dart-lang/sdk, outside your listed repositories, and neither CC explicitly asks you to act. Kevmoo's report adds relevance, but it is over two years old, with no subsequent question or commitment requiring your attention.
- **Next action:** [not_yours] No action required; leave investigation and ownership with the SDK dart:io maintainers.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** This bug can stall all NSURLSession requests in a process, and you authored and are assigned the issue. However, your open PR #3763 already covers the fix, so that PR is the actionable item and this issue should remain low priority to avoid duplicating work.
- **Next action:** [elsewhere] Track and advance the fix in PR dart-lang/native#3763 rather than acting separately on this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 10, priority 0.60
- **Ground truth:** 
- **Model:** This is a collaborator-filed issue in your repository with a concrete release-correctness fix, and your last comment indicates you are considering how to address it. Published packages could otherwise accept an RPC version missing required imports, despite passing workspace CI. Nobody else is clearly driving the work; the broader automation decision should not stall the immediate dependency fixes.
- **Next action:** [todo] Check the RPC release status, then raise both packages’ minimum RPC dependency and changelogs before publishing.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.16
- **Ground truth:** 
- **Model:** This is a shared team review request in a repository you do not own, with no personal request or prior involvement. The automated BoringSSL update does not identify a specific vulnerability or security incident requiring your attention, so it remains a low-priority optional team review.
- **Next action:** [not_yours] Leave review to the dart-ecosystem-team; no personal action is required.

### 15. googleapis/google-cloud-dart#381 → predicted 14, priority 0.30
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a concrete correctness bug in a repository you own: REST errors lose their RPC codes, preventing retries for aborted transactions. However, open PR #382 already addresses it, so your attention belongs on that PR rather than on duplicate issue work.
- **Next action:** [elsewhere] Review PR #382, which fixes this issue.

### 16. dart-lang/http#2034 → predicted 21, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** You requested goderbauer’s review two days ago, and there is no review feedback or unanswered question for you to address. This fixes a Cronet build failure, but the PR is currently waiting on the reviewer rather than on you.
- **Next action:** [waiting] Wait for goderbauer’s review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.61
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is assigned to you in a repository you own, and your recent investigation makes it active planned work rather than dormant backlog. It affects transport reliability across more than 20 generated clients, and the shared retry prerequisites have merged. Nobody is waiting on an unanswered reply, and no open PR covers the remaining work; routing and auto-populated fields are tracked separately in #80.
- **Next action:** [todo] Implement the ServiceClient retry and RequestOptions integration, including robust handling of non-JSON HTTP errors.

### 18. dart-lang/http#2031 → predicted 23, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although mosuem requested your review personally, this release PR is stacked on lower PRs, including #2014, which has not been reviewed. The other listed prerequisites already have your approval, so #2014 is the actionable item and this release review should wait.
- **Next action:** [elsewhere] Review prerequisite PR #2014 before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 15, priority 0.23
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your unfinished draft in a repository you own, with no human reviewer or contributor waiting on you. It has been idle for 45 days and has merge conflicts, so it deserves a finish-or-abandon decision rather than urgent attention. The unresolved feedback is automated and should be checked before requesting human review.
- **Next action:** [todo] Decide whether to finish or close the DNS draft; if continuing, resolve conflicts and validate the bot-reported example and test issues.

### 20. dart-lang/core#1007 → predicted 19, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in dart-lang/core, which is not one of your responsible repositories, and nobody has asked you personally to act. The fix addresses a concrete path-handling bug, but there is no reported security impact or other reason to elevate it. The outstanding CLA notice also indicates a contributor-side prerequisite may remain.
- **Next action:** [not_yours] Leave review to the dart-ecosystem-team; no personal action is required.

### 21. dart-lang/tools#2544 → predicted 31, priority 0.02
- **Ground truth:** 
- **Model:** This security fix is in dart-lang/tools, which you do not own, and your review request is only through the team. lrhn is already actively reviewing the change, with unanswered feedback for the author; nothing is addressed to you personally. The security topic does not make this shared review request your responsibility.
- **Next action:** [not_yours] Leave the review to lrhn and the requested revisions to jonasfj.

### 22. dart-lang/tools#2710 → predicted 27, priority 0.03
- **Ground truth:** 
- **Model:** You are requested only through a team in a repository you do not own, with no personal request or prior involvement. Although this is security-related work from a usual collaborator, it is also stacked on an unreviewed draft, #2563, so there is no immediate action for you.
- **Next action:** [not_yours] Leave review to the requested team; prerequisite dart-lang/tools#2563 needs review first.

### 23. dart-lang/native#3763 → predicted 22, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** You requested review only two days ago, and there is no unanswered feedback or other action for you. The PR fixes deadlock and concurrent-upload performance problems, but it is currently waiting on the reviewer rather than your attention.
- **Next action:** [waiting] Wait for liamappelbe’s review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 20, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** You explicitly asked sigurdm four days ago whether his approval covered the broader changes, and he has not replied. The outstanding bot feedback has already been answered, so there is no unanswered review feedback for you to address. Although natebosch's original review request is older, your recent follow-up seeks an alternative path to merging; give that roughly a week before pinging again.
- **Next action:** [waiting] Wait for sigurdm to confirm whether his review covered the non-PubSub changes and the PR is ready to merge.

### 25. dart-lang/http#579 → predicted 24, priority 0.10
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** Although you are personally requested to review, this PR is explicitly deferred to a breaking release, and your last comment confirmed that dependency. The latest comment asks generally for a workaround rather than directly requesting action from you. With no release plan or substantive implementation activity since, this remains low priority.
- **Next action:** [waiting] Wait for coordinated major-release planning before revisiting the upload-progress API.

### 26. dart-lang/http#1932 → predicted 16, priority 0.20
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an assigned build-breaking bug in your repository, with recent requests for updates. However, your open PR #2034 already covers the fix, so that PR is the actionable item and this issue should remain below it to avoid duplicating attention.
- **Next action:** [elsewhere] Track and advance the fix in PR dart-lang/http#2034 rather than work this issue separately.

### 27. flutter/devtools#8223 → predicted 29, priority 0.02
- **Ground truth:** 
- **Model:** This is outside your responsible repositories, and your only mention was an informational CC more than two years ago. The subsequent design question is directed to bkonyi, not you, and the recent label change creates no new obligation.
- **Next action:** [not_yours] No action needed; the DevTools team and bkonyi are handling the feature discussion.

### 28. dart-lang/http#1837 → predicted 25, priority 0.06
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You already explained that the Dart team is unlikely to implement this and outlined a community contribution path. This P3 enhancement has been inactive for a year, with no unanswered question or commitment from you. The references to certificate management describe potential platform benefits, not a reported security vulnerability.
- **Next action:** [backlog] Leave this for community contributions; revisit only during backlog grooming or if a contributor volunteers.

### 29. dart-lang/http#2033 → predicted 34, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** You approved this PR, and there have been no new commits, replies, or review requests since. Despite being a collaborator's PR in your repository, it is done as far as your review is concerned.
- **Next action:** [not_yours] No action needed; your approval is complete, and the author can proceed with merging.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This issue is explicitly in package:http2, which is outside your stated responsibility. The latest question is not addressed to you, and you have no prior involvement or commitment requiring follow-up.
- **Next action:** [not_yours] Leave triage and any closure decision to the http2 maintainers.

### 31. dart-lang/tools#2715 → predicted 28, priority 0.02
- **Ground truth:** 
- **Model:** This is outside your responsible repositories, and your review request is only through the shared ecosystem team. David Morgan is explicitly requested, so there is no action for you despite the author being a usual collaborator. The span-bounds fix does not establish a security vulnerability requiring your attention.
- **Next action:** [not_yours] Leave the review to davidmorgan, the explicitly requested reviewer.

### 32. dart-lang/http#2026 → predicted 33, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR only changes http2, which you explicitly exclude from your responsibilities. The author requested review from mosuem, not you, and you have no prior involvement or outstanding commitment.
- **Next action:** [not_yours] Leave this review to mosuem; no action is needed from you.

### 33. dart-lang/native#3653 → predicted 30, priority 0.02
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This is assigned to liamappelbe in a repository you do not own, and nobody has asked you a question or requested further action. Your experimental findings have already informed the discussion; the latest activity concerns implementation trade-offs for the assignee, not a commitment from you.
- **Next action:** [not_yours] Leave the implementation decision to liamappelbe, who owns this issue.

### 34. dart-lang/http#1972 → predicted 32, priority 0.02
- **Ground truth:** 
- **Model:** PR #1974 covers this issue, so any implementation work belongs there rather than on this duplicate tracking item. Your reproduction questions remain unanswered and the issue is labeled needs-info, leaving nothing actionable here despite your assignment.
- **Next action:** [elsewhere] Track PR #1974; wait for the reporter to provide the client details and reproduction requested on this issue.

### 35. dart-lang/http#1841 → predicted 35, priority 0.00
- **Ground truth:** 
- **Model:** You marked this unimportant after the contributor's proposal and mention, and no subsequent activity here asks you to act. The open PR #2002 also covers the issue, so any implementation review belongs there rather than on this thread.
- **Next action:** [not_yours] No action on this issue; implementation is tracked in PR #2002.

### 36. dart-lang/sdk#38148 → predicted 8, priority 0.72
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** The post-dismissal report provides a current SDK reproduction and an offer to help, making this assigned issue actionable again. A contributor is waiting for guidance, and obtaining their reproduction could unlock diagnosis of a longstanding filesystem bug. This merits attention despite the issue's age and the repository being outside your usual ownership.
- **Next action:** [respond] Ask filiph for the reproducible directory setup and steps to investigate the deletion failure.
