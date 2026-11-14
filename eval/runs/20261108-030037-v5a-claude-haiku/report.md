# Gitilizer eval: v5a-claude-haiku

strategy `pointwise` · model `claude-haiku-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5a.md` · signals `True` · 3 trial(s) · 36 items · 20261108-030037

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.529 ± 0.024 |
| spearman | 0.651 ± 0.021 |
| pairwise_acc | 0.765 ± 0.012 |
| ndcg | 0.957 ± 0.009 |
| ndcg@5 | 0.897 ± 0.030 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.700 ± 0.000 |
| mean_abs_displacement | 5.926 ± 0.370 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.750 ± 0.044 | 0.991 ± 0.002 | 0.933 ± 0.115 | 1.583 ± 0.191 |
| B | 20 | 0.323 ± 0.032 | 0.854 ± 0.022 | 0.467 ± 0.115 | 4.467 ± 0.208 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist mitigations (see dart-lang/sdk#64644 which is already closed as completed) and reply to acn-masatadakurihara, then close or update this issue. |
| 2 | 2.3 (2–3) | +0.3 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Reply to kevmoo's inline question on bump.go about whether Bump should append CHANGELOG.md to lib.Keep or clean should auto-preserve it, then push the fix and resolve the thread. |
| 3 | 3.3 (3–4) | +0.3 | 0.74 | 3/3 | googleapis/google-cloud-dart#376 | A | Review PR #376 (sigurdm's pubsub attribution header and release polish), since nobody has reviewed it and I'm the default reviewer for this repo. |
| 4 | 5.3 (5–6) | +1.3 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | A | Review PR #382, which fixes the JSON error code mapping in google_cloud_rpc, since no human has reviewed it yet. |
| 5 | 6.0 (5–7) | +1.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 4-day-old design sketch: approve or adjust the nullable number/string ProtoEnum representation and say how unknown names should be handled. |
| 6 | 24.7 (23–26) | +18.7 ⚠️ | 0.11 | 0/3 | dart-lang/http#2027 | B | Nothing to do yet; this is a design discussion awaiting a decision on a possible 2.0 breaking change, so wait for maintainer input or revisit when planning a major release. |
| 7 | 8.0 (8) | +1.0 | 0.60 | 3/3 | dart-lang/http#1981 | B | Work on the CupertinoClient server trust hook I already said I'm starting, and review umair9430's skeleton PR if one appears. |
| 8 | 10.7 (10–11) | +2.7 | 0.54 | 3/3 | googleapis/google-cloud-dart#360 | A | Split the mid-stream SSE error-frame fix (throw ServiceException instead of yielding an empty message) into its own change, and check whether Google APIs actually stream JSON arrays incrementally to decide the buffering fix. |
| 9 | 11.0 (10–12) | +2.0 | 0.50 | 3/3 | dart-lang/sdk#59846 | B | Triage the RFC 9110 header-name validation bug in dart:io: decide whether to tighten the parser to tchar-only and schedule a fix, since I'm the assignee and nothing else has happened. |
| 10 | 12.3 (6–19) | +2.3 | 0.43 | 1/3 | googleapis/google-cloud-dart#361 | A | Waiting on kevmoo to answer my 16-day-old question on whether to switch Compute to the discovery spec or add convenience extensions to the protobuf version. |
| 11 | 15.0 (12–19) | +4.0 | 0.30 | 0/3 | dart-lang/sdk#31275 | A | Nothing needed from me now; this is a 9-year-old dart:io HttpClient bug with no open PR, and the only real ask is an informational CC from kevmoo asking for an owner. |
| 12 | 13.3 (10–16) | +1.3 | 0.37 | 3/3 | dart-lang/native#3752 | B | Review and merge the linked PR dart-lang/native#3763 that adds scheduleInRunLoop:forMode: support, since it closes this issue. |
| 13 | 20.7 (17–24) | +7.7 | 0.18 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the google_cloud_rpc version bump and librarian automation decision, then add the pubspec constraints and CHANGELOG entry before releasing storage 0.6.5 and pubsub. |
| 14 | 16.7 (15–18) | +2.7 | 0.22 | 3/3 | dart-lang/tools#2719 | B | Review the automated BoringSSL bump PR #2719 in dart-lang/tools, which is waiting on the dart-ecosystem-team review request. |
| 15 | 17.7 (16–20) | +2.7 | 0.22 | 1/3 | googleapis/google-cloud-dart#381 | A | Wait for the linked PR #382 to be reviewed; the issue is covered by that PR, so nothing to do on the issue itself yet. |
| 16 | 25.7 (22–28) | +9.7 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review PR #2034; ping them again if there is no response by about 2026-10-30. |
| 17 | 9.0 (9) | -8.0 | 0.60 | 3/3 | googleapis/google-cloud-dart#359 | B | Start on the ServiceClient/ServiceException work: harden fromHttpResponse against non-JSON bodies and wire RetryRunner plus RequestOptions into _makeRequest, since this issue is assigned to me. |
| 18 | 22.7 (14–30) | +4.7 | 0.17 | 1/3 | dart-lang/http#2031 | A | Review this release-prep PR from mosuem, but first check whether the stacked PRs #2010, #2014 and #2009 need review, since this PR is stacked on them. |
| 19 | 19.0 (18–21) | +0.0 | 0.20 | 0/3 | googleapis/google-cloud-dart#345 | A | Nothing needed now; this is my own draft with 5 unresolved bot review threads, so I should finish it or abandon it when I next plan DNS work. |
| 20 | 22.7 (21–25) | +2.7 | 0.13 | 0/3 | dart-lang/core#1007 | B | Waiting on the author to sign the CLA before the PR can be reviewed; the dart-ecosystem-team review request is shared and not addressed to me personally. |
| 21 | 12.7 (2–32) | -8.3 | 0.56 | 2/3 | dart-lang/tools#2544 | B | Review jonasfj's PR #2544 (security UNC-path fix) as the dart-ecosystem-team reviewer, since lrhn's review feedback is addressed and jonasfj is waiting on the next review round. |
| 22 | 20.7 (19–23) | -1.3 | 0.13 | 0/3 | dart-lang/tools#2710 | B | Nothing for me now; the PR is stacked on unreviewed draft PR #2563, and the team review request is shared with dart-ecosystem-team and sits in a repo I don't own. |
| 23 | 26.7 (23–29) | +3.7 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review PR #3763; ping them if there is still no response by around 2026-10-30. |
| 24 | 22.0 (20–24) | -2.0 | 0.12 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether the non-Pub/Sub parts look good, or for natebosch to review; nothing mine to do right now beyond possibly resolving the 2 open threads and the merge conflict. |
| 25 | 31.0 (29–32) | +6.0 | 0.09 | 0/3 | dart-lang/http#579 | B | Wait for a future semver-major release of dart-lang/http where this breaking API change can land; no action needed from me now. |
| 26 | 13.7 (13–15) | -12.3 ⚠️ | 0.30 | 3/3 | dart-lang/http#1932 | B | Review and merge the linked fix PR dart-lang/http#2034 (avoid cronet namespace duplication), which closes this issue, and answer igordanilovski's ping with a status update. |
| 27 | 33.3 (33–34) | +6.3 | 0.05 | 0/3 | flutter/devtools#8223 | B | No action for me; this is a feature request in flutter/devtools that I'm only mentioned on for an informational CC, and the work sits with the DevTools team. |
| 28 | 33.7 (33–34) | +5.7 | 0.05 | 0/3 | dart-lang/http#1837 | A | Nothing to do; this is a community-contributions-welcome enhancement I already triaged as P3 and declined for the Dart team, and it's been quiet for about a year. |
| 29 | 35.3 (35–36) | +6.3 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing for me; I already approved and the PR is clean, so it is waiting on mosuem to merge. |
| 30 | 35.7 (35–36) | +5.7 | 0.02 | 0/3 | dart-lang/http#1365 | A | No action needed from me; this is an old, unassigned enhancement in http2 (a package I'm not responsible for), and I could optionally reply to lubritto's question if I want to close it out. |
| 31 | 27.7 (26–30) | -3.3 | 0.09 | 0/3 | dart-lang/tools#2715 | B | Wait for davidmorgan or dart-ecosystem-team to review kevmoo's PR #2715; nothing for me to do yet. |
| 32 | 14.7 (13–16) | -17.3 ⚠️ | 0.25 | 3/3 | dart-lang/http#2026 | A | Review PR #2026 (or ask mosuem to review it, since he was pinged and http2 is not my area), noting the CLA is now signed and the CI status should be checked. |
| 33 | 29.0 (26–31) | -4.0 | 0.10 | 0/3 | dart-lang/native#3653 | A | Nothing needed from me; liamappelbe is assigned and has decided the larger change isn't worth it, so I'd only revisit if the autorelease-pool approach is chosen. |
| 34 | 30.0 (28–31) | -4.0 | 0.10 | 0/3 | dart-lang/http#1972 | B | Wait for Keetz to answer my questions about the client and server behavior; the open PR #1974 is the work item now. |
| 35 | 27.0 (25–29) | -8.0 | 0.11 | 0/3 | dart-lang/http#1841 | B | Nothing for me now; agam1092005 has an open PR (#2002) covering this, so wait for it to be reviewed and tracked under the next-breaking-release label. |
| 36 | 6.0 (4–7) | -30.0 ⚠️ | 0.67 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph's 24-day-old offer to help, pointing to the reproduction steps and suggesting a concrete debugging starting point in dart:io's recursive delete. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 1/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/http#2026** (truth #32) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is an issue I authored and am assigned, and it has new security-related activity three days ago: a report that compromised eMudhra intermediate CAs may still be trusted by Dart on Android. Per the security rules, any new activity on a security issue I own goes at the top of the scale. Julemand101 points to #64644, which was closed as completed two days ago, so the fix may already have landed, but confirming that and answering the questions is my job rather than something to leave in an unknown state.
- **Next action:** Verify whether dart:io on Android honors the eMudhra intermediate CA blocklist mitigations (see dart-lang/sdk#64644 which is already closed as completed) and reply to acn-masatadakurihara, then close or update this issue.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR with an unanswered direct question from a close collaborator (kevmoo) describing a real bug where the next generate deletes the newly created CHANGELOG.md. The review is blocking merge (1 unresolved thread, review required), so I'm blocking progress and should respond. It is not security-related, and the author's own recent activity is the latest human event that is waiting on me.
- **Next action:** Reply to kevmoo's inline question on bump.go about whether Bump should append CHANGELOG.md to lib.Keep or clean should auto-preserve it, then push the fix and resolve the thread.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an open, non-draft PR in google-cloud-dart, a repository I'm responsible for, and it has no human review yet, so the next step is mine. The author is a close collaborator and the PR is 5 days old, which is still fresh. The only review so far is an automated Gemini comment, which doesn't count as a human review, and its high-priority findings concern streaming code this PR doesn't touch. It isn't stacked or blocked, so it sits in the 0.65–0.8 band for reviews waiting on me, near the upper-middle of that range.
- **Next action:** Review PR #376 (sigurdm's pubsub attribution header and release polish), since nobody has reviewed it and I'm the default reviewer for this repo.

### 4. googleapis/google-cloud-dart#382 → predicted 6, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a PR in google-cloud-dart, a repository I'm responsible for, and no human reviewer has picked it up, so I'm the default reviewer. It was opened 3 days ago by a first-time contributor, which places it below collaborator PRs in the same range. The fix corrects retry behaviour for ABORTED over REST, so it matters, and it covers issue #381, so reviewing the PR is the right action rather than the issue. The gemini bot comment doesn't count as a human review.
- **Next action:** Review PR #382, which fixes the JSON error code mapping in google_cloud_rpc, since no human has reviewed it yet.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my repository and my issue, and I asked for a design before code was written. Yusufihsangorgel has now posted a concrete proposal and is waiting for my decision before implementing. Nothing else is blocking them, and the design is a breaking change, so my reply decides whether the work proceeds. That places it in the 0.65–0.8 band for a contributor waiting on my reply, below security or direct blocking items.
- **Next action:** Reply to Yusufihsangorgel's 4-day-old design sketch: approve or adjust the nullable number/string ProtoEnum representation and say how unknown names should be handled.

### 6. dart-lang/http#2027 → predicted 25, priority 0.12
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** This is my own issue filed 9 days ago in dart-lang/http, a repo I watch but where the design question is a breaking-change decision rather than planned work with a clear next step. No one has replied, and the item is blocked on deciding whether to pursue a 2.0 release with an async close. Because it is a self-filed design note with no pending request on me and it is not a security or blocking item, it belongs in the low range.
- **Next action:** Nothing to do yet; this is a design discussion awaiting a decision on a possible 2.0 breaking change, so wait for maintainer input or revisit when planning a major release.

### 7. dart-lang/http#1981 → predicted 8, priority 0.60
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned this to myself and said I've started, so it is my planned work and was touched 5 hours ago. The item is in dart-lang/http, which I'm responsible for except http2, and this is a feature request, so it sits in the planned-work range rather than the urgent one. No one else is blocking it and there is no pending question directed at me.
- **Next action:** Work on the CupertinoClient server trust hook I already said I'm starting, and review umair9430's skeleton PR if one appears.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.58
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a repository I'm responsible for, filed by a close collaborator (kevmoo), with a concrete next step that is mine: kevmoo answered my question 17 days ago and I haven't followed up. The SSE error-swallowing bug is a real correctness problem with a clear fix, but kevmoo explicitly says the buffering part is not urgent and the server behaviour is unknown. Nothing is blocking anyone and it isn't security, so it sits in the planned-work range rather than the higher review or security tiers.
- **Next action:** Split the mid-stream SSE error-frame fix (throw ServiceException instead of yielding an empty message) into its own change, and check whether Google APIs actually stream JSON arrays incrementally to decide the buffering fix.

### 9. dart-lang/sdk#59846 → predicted 11, priority 0.45
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm the assignee, so the next step (triage/fix or unassign) is mine, but the issue is almost two years old with no activity since it was triaged and no reporter follow-up. It is a real standards-compliance and proxy-interoperability bug in a widely used library, not security-classified, so it sits in the planned-work/stale-assigned band rather than the top. Freshness is very low, pulling it toward the bottom of its range.
- **Next action:** Triage the RFC 9110 header-name validation bug in dart:io: decide whether to tighten the parser to tchar-only and schedule a fix, since I'm the assignee and nothing else has happened.

### 10. googleapis/google-cloud-dart#361 → predicted 19, priority 0.25
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked the design question last and kevmoo has not replied, so the next step belongs to them. kevmoo is a close collaborator in a repo I own, which keeps this above peripheral items. The question is 16 days old and the work is a feature request (#28) with no deadline, so it sits in the lower part of the 0.35-0.5 range for unanswered questions.
- **Next action:** Waiting on kevmoo to answer my 16-day-old question on whether to switch Compute to the discovery spec or add convenience extensions to the protobuf version.

### 11. dart-lang/sdk#31275 → predicted 12, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old issue in dart-lang/sdk, a repo I'm only loosely tied to, where I was only CC'd twice, so it sits in the CC range of 0.35–0.5 and isn't something I can act on directly. There is a known root cause and a candidate patch from zichangg (abandoned CL), which makes it a real bug affecting a kevmoo collaborator, so it's worth more than a stale backlog item. It isn't my ownership area though, so I should only consider taking it on if I choose to find an owner for dart:io.
- **Next action:** Nothing needed from me now; this is a 9-year-old dart:io HttpClient bug with no open PR, and the only real ask is an informational CC from kevmoo asking for an owner.

### 12. dart-lang/native#3752 → predicted 16, priority 0.30
- **Ground truth:** 
- **Model:** I authored this issue six days ago and assigned it to myself, so it is my planned work, but an open PR (#3763, updated two days ago) already covers it, so the issue itself has nothing left to do. Per the duplicate rule, the issue ranks below its PR and sits in the 0.15-0.35 range. Acting on the PR is the real next step, so the issue is actionable only through that PR.
- **Next action:** Review and merge the linked PR dart-lang/native#3763 that adds scheduleInRunLoop:forMode: support, since it closes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 17, priority 0.30
- **Ground truth:** 
- **Model:** This is a release-blocking checklist item, but the next step depends on a generated version bump that hasn't happened yet and on my own pending decision about librarian automation. I last commented 17 days ago and nobody has asked me anything since, so nothing is directly waiting on me right now. It sits in the lower-middle range because the release risk is real, but I can't act on the pubspec changes until the version exists.
- **Next action:** Wait for the google_cloud_rpc version bump and librarian automation decision, then add the pubspec constraints and CHANGELOG entry before releasing storage 0.6.5 and pubsub.

### 14. dart-lang/tools#2719 → predicted 18, priority 0.25
- **Ground truth:** 
- **Model:** This is a bot-authored PR where the review request went to a team I belong to in a repository I don't own, so it is a team review request in a non-owned repo, placed in the 0.1–0.25 band. It was opened only 19 hours ago and nothing human has happened since, so it isn't stale. Nobody else is named as reviewer, so the team request is not near zero, but the PR is mergeable-blocked and low-stakes as an automated dependency bump.
- **Next action:** Review the automated BoringSSL bump PR #2719 in dart-lang/tools, which is waiting on the dart-ecosystem-team review request.

### 15. googleapis/google-cloud-dart#381 → predicted 20, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The issue is covered by open PR #382 by an external contributor, so the next step is that PR's review, not this issue. The user only watches this repo and has no role, mention, or request here. The issue is fresh (3 days) but was filed by a non-collaborator with no request directed at me. It sits in the 0.15–0.35 band for issues covered by a PR, lower end because I'm only a watcher.
- **Next action:** Wait for the linked PR #382 to be reviewed; the issue is covered by that PR, so nothing to do on the issue itself yet.

### 16. dart-lang/http#2034 → predicted 27, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR and I requested review from goderbauer only two days ago, so the next step is theirs. The linked issue #1932 is covered by this PR, so it should not be separately prioritized. Since the review request is recent, the item sits in the 0.05–0.15 range, and freshness and importance do not move it higher yet.
- **Next action:** Wait for goderbauer to review PR #2034; ping them again if there is no response by about 2026-10-30.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.60
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue assigned to me in a repository I own, filed by a close collaborator (kevmoo) with a clear next step that is mine, and I have already engaged on it 10 days ago. Nothing is waiting on anyone else, so it sits in the planned-work range. The related PRs #352 and #353 are merged, so the dependencies are unblocked. It is not higher because nothing new has arrived since my last comment and the work is not yet started.
- **Next action:** Start on the ServiceClient/ServiceException work: harden fromHttpResponse against non-JSON bodies and wire RetryRunner plus RequestOptions into _makeRequest, since this issue is assigned to me.

### 18. dart-lang/http#2031 → predicted 14, priority 0.30
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** I'm the requested reviewer and the author is a close collaborator, but the PR is stacked on #2014, which still has no review and was also requested of me, and the stack is blocked (mergeable_state blocked). The PR's own changes are trivial version and changelog bumps, so the real work sits in the lower PRs. Freshness is moderate (last update 2.6 days ago), and I'm only a peripheral repo watcher for http2, which I'm not responsible for.
- **Next action:** Review this release-prep PR from mosuem, but first check whether the stacked PRs #2010, #2014 and #2009 need review, since this PR is stacked on them.

### 19. googleapis/google-cloud-dart#345 → predicted 21, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repository I work in, untouched for 45 days after I converted it to draft, and it is dirty with unresolved threads (mostly from the gemini bot, which doesn't count as a human reviewer). Per the scale, my own drafts I should finish or abandon sit in the 0.15–0.35 range, and staleness pushes it toward the lower end. It is not blocking anyone, and no human has asked anything of me.
- **Next action:** Nothing needed now; this is my own draft with 5 unresolved bot review threads, so I should finish it or abandon it when I next plan DNS work.

### 20. dart-lang/core#1007 → predicted 22, priority 0.15
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in dart-lang/core, a repository I am not listed as responsible for, so it falls in the 0.1–0.25 band for team requests. The CLA check is failing and mergeable_state is blocked, so the PR cannot move until the first-time contributor signs the CLA. The linked issue #537 is covered by this PR, so it should not be worked separately. Activity is three days old, which keeps it at the lower end of the band.
- **Next action:** Waiting on the author to sign the CLA before the PR can be reviewed; the dart-ecosystem-team review request is shared and not addressed to me personally.

### 21. dart-lang/tools#2544 → predicted 4, priority 0.72
- **Ground truth:** 
- **Model:** This is a security fix (UNC path injection leaking SMB credentials), which normally ranks at the top, but the review request reached me only through a team I belong to in a repository I'm not responsible for, and lrhn is already reviewing with the author waiting on him. The author has responded to the last round of review comments (new commits on 2026-08-26 after lrhn's feedback), so an unresolved review on the PR is my item to pick up only if the team needs a second reviewer. Given the security nature and that the team request is shared, I place it in the upper review band but below items directly on me.
- **Next action:** Review jonasfj's PR #2544 (security UNC-path fix) as the dart-ecosystem-team reviewer, since lrhn's review feedback is addressed and jonasfj is waiting on the next review round.

### 22. dart-lang/tools#2710 → predicted 23, priority 0.12
- **Ground truth:** 
- **Model:** This is a team review request to dart-ecosystem-team, which I belong to, in dart-lang/tools, a repository I'm not responsible for, so it is low priority. It is also stacked on draft PR #2563, which has not been reviewed, so the lower PR needs review first. The author is a close collaborator and there has been no activity from me, so the score sits in the 0.05–0.15 band rather than near zero.
- **Next action:** Nothing for me now; the PR is stacked on unreviewed draft PR #2563, and the team review request is shared with dart-ecosystem-team and sits in a repo I don't own.

### 23. dart-lang/native#3763 → predicted 28, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested review from liamappelbe two days ago, so the next step belongs to the reviewer. The PR is not yet reviewed and has no unanswered feedback for me. It fixes two open issues I filed, which is relevant, but there is nothing for me to do until a week passes without a response.
- **Next action:** Wait for liamappelbe to review PR #3763; ping them if there is still no response by around 2026-10-30.

### 24. googleapis/google-cloud-dart#373 → predicted 24, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR, approved by sigurdm 6 days ago, and I last acted 4 days ago by asking sigurdm a direct question about the non-Pub/Sub parts. The reviewer I'm waiting on is a close collaborator who just approved, so the ball is in his court, and natebosch was asked to review but is busy. The PR is behind main with 2 unresolved threads, which would need my attention if I want to merge, but that is a minor housekeeping step rather than a blocker. Since I recently asked for a review and nothing has come back yet, this sits in the low range.
- **Next action:** Wait for sigurdm to answer whether the non-Pub/Sub parts look good, or for natebosch to review; nothing mine to do right now beyond possibly resolving the 2 open threads and the merge conflict.

### 25. dart-lang/http#579 → predicted 32, priority 0.08
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR is blocked by the next-breaking-release label and my own earlier comment that it can only land with a major version bump I don't have bandwidth for. The only recent activity is a 14-month-old question from retendo, which doesn't change what I need to do. It's also a first-time contributor's PR in a repo I'm responsible for, so it's not entirely irrelevant, but nothing can move it forward now.
- **Next action:** Wait for a future semver-major release of dart-lang/http where this breaking API change can land; no action needed from me now.

### 26. dart-lang/http#1932 → predicted 15, priority 0.30
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I am assignee and the fix PR #2034 is authored by me, so the real work is there, and the issue itself is covered by that PR. Per the duplicate rule, an issue with an open covering PR ranks well below the PR, so it sits in the 0.15-0.35 range. A fresh ping from igordanilovski (4d ago) is the only new activity, and it's a status request rather than a blocking question, so it lifts the item toward the upper part of the range without moving it higher.
- **Next action:** Review and merge the linked fix PR dart-lang/http#2034 (avoid cronet namespace duplication), which closes this issue, and answer igordanilovski's ping with a status update.

### 27. flutter/devtools#8223 → predicted 34, priority 0.03
- **Ground truth:** 
- **Model:** I'm only CC'd by bkonyi, which is informational, and I was never asked to do anything. The repository is not one I'm responsible for, and the feature is high cost, blocked on dart:io profiling work, with no PR or assignment for me. Recent activity was just srawlins removing a cost label, which doesn't change what I need to do.
- **Next action:** No action for me; this is a feature request in flutter/devtools that I'm only mentioned on for an informational CC, and the work sits with the DevTools team.

### 28. dart-lang/http#1837 → predicted 33, priority 0.05
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** The issue is a feature request in dart-lang/http, a repo I'm only interested in, and I already responded and labeled it P3 a year ago. Its only linked item is an unrelated flutter issue with no action needed from me. Nothing is waiting on me, and the item is dormant with no new directed activity, so it sits at the bottom of the range.
- **Next action:** Nothing to do; this is a community-contributions-welcome enhancement I already triaged as P3 and declined for the Dart team, and it's been quiet for about a year.

### 29. dart-lang/http#2033 → predicted 35, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I approved this PR 2 days ago with no new commits or comments since, and mergeable_state is clean. The remaining step is a merge by the author, which isn't mine to do. It's CI infrastructure in a package I'm a reviewer on, so it deserves nothing more than a near-zero score.
- **Next action:** Nothing for me; I already approved and the PR is clean, so it is waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** I only watch dart-lang/http and have explicitly noted I'm not responsible for http2, so this sits outside my scope. The latest comment from lubritto asks whether the root cause is confirmed and whether to close, which is a light question rather than a request directed at me. The thread suggests the bottleneck is likely in the raw socket (sdk#48210) rather than the package, but nobody has asked me to act and nothing is blocked on me.
- **Next action:** No action needed from me; this is an old, unassigned enhancement in http2 (a package I'm not responsible for), and I could optionally reply to lubritto's question if I want to close it out.

### 31. dart-lang/tools#2715 → predicted 26, priority 0.10
- **Ground truth:** 
- **Model:** This PR is authored by collaborator kevmoo in dart-lang/tools, a repository I don't list as my responsibility. I was only requested through the dart-ecosystem-team review request, which is a shared team request in a repo I'm not responsible for, so it sits in the 0.1-0.25 band and near the low end. davidmorgan is also named personally as a reviewer, which pushes the score toward zero. The PR is 2 days old and has no human activity beyond kevmoo's own push.
- **Next action:** Wait for davidmorgan or dart-ecosystem-team to review kevmoo's PR #2715; nothing for me to do yet.

### 32. dart-lang/http#2026 → predicted 13, priority 0.30
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in dart-lang/http, a repo I watch but am not responsible for in the http2 package, and my notes say I'm not responsible for http2. The author is a first-time contributor who pinged mosuem directly, so the review is his to take, not mine. The PR is only one day old and the ping is fresh, so nothing is due from me, and no review request names me. I'd put it in the low range, slightly above zero only because a first-time contributor's fix for a real crash is sitting waiting.
- **Next action:** Review PR #2026 (or ask mosuem to review it, since he was pinged and http2 is not my area), noting the CLA is now signed and the CI status should be checked.

### 33. dart-lang/native#3653 → predicted 30, priority 0.10
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, and the last human move was theirs (34d ago), concluding the trampoline approach is probably not worth the effort in favour of wrapping calls in autorelease pools. The related PR #3664 was merged but was found to do nothing, so the issue is effectively open with no concrete next step for me. I'm only a commenter and was mentioned in passing (a thanks), with no request directed at me. Activity is stale, so it sits low in the range.
- **Next action:** Nothing needed from me; liamappelbe is assigned and has decided the larger change isn't worth it, so I'd only revisit if the autorelease-pool approach is chosen.

### 34. dart-lang/http#1972 → predicted 31, priority 0.10
- **Ground truth:** 
- **Model:** I asked the reporter for information 8 days ago and added needs-info, and they haven't replied, so the next step belongs to them. An open PR #1974 already claims to fix this, and that PR was updated 0h ago, so the issue itself is covered by it and sits in the low range. I am the assignee and the issue is in a repo I'm involved with, but there is no new information directed at me to act on.
- **Next action:** Wait for Keetz to answer my questions about the client and server behavior; the open PR #1974 is the work item now.

### 35. dart-lang/http#1841 → predicted 29, priority 0.10
- **Ground truth:** 
- **Model:** There is a linked open PR #2002 that covers this issue, so the issue itself has no independent next step and should rank well below its PR. The issue is also labeled next-breaking-release, which blocks action until a future release, and my last activity was an old label change. The recent activity is a contributor offer and a PR reference, neither of which requires me to act. My thumbs-down is from 2026-10-05, and nothing directed at me has happened since, so it stays near the bottom.
- **Next action:** Nothing for me now; agam1092005 has an open PR (#2002) covering this, so wait for it to be reviewed and tracked under the next-breaking-release label.

### 36. dart-lang/sdk#38148 → predicted 7, priority 0.62
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I am the assignee and this is a non-security P2 bug in the SDK that a collaborator-level contributor (filiph) has newly reproduced and asked how to help with. Since I'm assigned, the reply is mine to give, which places it in the planned-work band. The item is not a security issue and I'm not a direct owner of the sdk repo, and the last human activity was 24 days ago, so it sits at the lower end of the band rather than the higher end. The thumbs-down from August is superseded by the new October comment directed at the issue.
- **Next action:** Reply to filiph's 24-day-old offer to help, pointing to the reproduction steps and suggesting a concrete debugging starting point in dart:io's recursive delete.
