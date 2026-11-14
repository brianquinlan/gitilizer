# Gitilizer eval: v5b-claude-sonnet

strategy `pointwise` · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v5b.md` · signals `True` · 3 trial(s) · 36 items · 20261108-033225

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.675 ± 0.027 |
| spearman | 0.787 ± 0.020 |
| pairwise_acc | 0.838 ± 0.013 |
| ndcg | 0.981 ± 0.005 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 4.074 ± 0.325 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.856 ± 0.042 | 0.998 ± 0.001 | 1.000 ± 0.000 | 1.000 ± 0.250 |
| B | 20 | 0.488 ± 0.063 | 0.933 ± 0.028 | 0.600 ± 0.000 | 3.767 ± 0.306 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | A | Check whether Dart on Android honors the eMudhra intermediate CA blocklist (see #64644, now closed), reply to the new questions, and confirm this issue's status before closing or following up. |
| 2 | 2.0 (2) | +0.0 | 0.85 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo's inline question about CHANGELOG.md being deleted on the next generate, and push a fix (add it to lib.Keep or have clean preserve it). |
| 3 | 3.0 (3) | +0.0 | 0.72 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm's pubsub release-polish PR (attribution header, changelog, pubspec, .pubignore) and ask him to fix the missing license headers and rebase onto main. |
| 4 | 4.0 (4) | +0.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this PR from a first-time contributor in google-cloud-dart (I'm the default reviewer), checking the Status.code change and its compatibility impact. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel's 4d-old design sketch (nullable number and string on ProtoEnum): confirm the approach or request changes, and tell him to open a preliminary PR. |
| 6 | 8.7 (7–11) | +2.7 | 0.54 | 3/3 | dart-lang/http#2027 | B | Decide on the Client.close design (track outstanding requests vs. async close in a 2.0 release) and write up a concrete proposal or plan on the issue. |
| 7 | 7.3 (6–9) | +0.3 | 0.56 | 3/3 | dart-lang/http#1981 | B | Continue the skeleton implementation of the server trust evaluator hook in CupertinoClient, since I just said I've started on it. |
| 8 | 9.7 (9–10) | +1.7 | 0.53 | 3/3 | googleapis/google-cloud-dart#360 | A | Decide whether to fix the SSE mid-stream error handling (part 2) now, and defer or drop the incremental JSON array part until we know if servers stream it. |
| 9 | 9.7 (7–11) | +0.7 | 0.53 | 3/3 | dart-lang/sdk#59846 | B | Fix the dart:io header-name validation to enforce RFC 9110 tchar rules, or unassign myself if I can't take it on. |
| 10 | 12.0 (12) | +2.0 | 0.40 | 0/3 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to answer my 16d-old question on whether to switch to discovery or add convenience extensions to the proto-based service operations. |
| 11 | 14.0 (14) | +3.0 | 0.30 | 3/3 | dart-lang/sdk#31275 | A | Decide whether to triage this dart:io bug (possibly take over the abandoned CL 144346) or leave it in the backlog. |
| 12 | 16.3 (16–17) | +4.3 | 0.24 | 0/3 | dart-lang/native#3752 | B | Nothing on the issue itself; drive PR dart-lang/native#3763, which closes it. |
| 13 | 13.0 (13) | +0.0 | 0.37 | 0/3 | googleapis/google-cloud-dart#366 | B | Wait for the generated google_cloud_rpc version bump; then update the pubspecs and CHANGELOG in storage and pubsub. |
| 14 | 21.0 (20–22) | +7.0 | 0.11 | 0/3 | dart-lang/tools#2719 | B | Nothing required from me personally; the team review request is shared and another team member can review the automated BoringSSL bump. |
| 15 | 15.0 (15) | +0.0 | 0.25 | 0/3 | googleapis/google-cloud-dart#381 | A | Review PR #382, which fixes this issue, instead of acting on the issue itself. |
| 16 | 22.0 (21–23) | +6.0 | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; ping again if there is no response after about a week. |
| 17 | 8.3 (8–9) | -8.7 | 0.56 | 3/3 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner/RequestOptions wiring in ServiceClient and harden ServiceException.fromHttpResponse against non-JSON gateway error bodies. |
| 18 | 29.0 (27–31) | +11.0 ⚠️ | 0.04 | 0/3 | dart-lang/http#2031 | A | Wait for the lower stacked PRs (#2014 needs my review; #2010 and #2009 are already approved) to land before reviewing this release PR. |
| 19 | 17.7 (17–18) | -1.3 | 0.22 | 3/3 | googleapis/google-cloud-dart#345 | A | Decide whether to finish this draft DNS package (rebase onto main to fix conflicts, address the 5 bot review threads) or close it. |
| 20 | 25.3 (23–27) | +5.3 | 0.09 | 0/3 | dart-lang/core#1007 | B | Nothing for me now; the author needs to sign the CLA and the dart-ecosystem-team review is shared with the rest of the team. |
| 21 | 22.3 (19–29) | +1.3 | 0.15 | 0/3 | dart-lang/tools#2544 | B | Nothing for me personally; the author (jonasfj) needs to address lrhn's review feedback, and lrhn is already reviewing. |
| 22 | 25.0 (24–26) | +3.0 | 0.09 | 0/3 | dart-lang/tools#2710 | B | Nothing yet: review the lower stacked PR dart-lang/tools#2563 first; this PR only has a team review request. |
| 23 | 23.0 (22–24) | +0.0 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; ping him if there is still no response after about a week (around Oct 30). |
| 24 | 23.3 (21–25) | -0.7 | 0.11 | 0/3 | googleapis/google-cloud-dart#373 | B | Wait for sigurdm to answer whether he reviewed the non-pubsub parts, or for natebosch to review; ping again after about a week of silence. |
| 25 | 27.0 (26–28) | +2.0 | 0.07 | 0/3 | dart-lang/http#579 | B | Nothing to do now; the PR is blocked on a future semver-major release, so wait for that plan to move forward. |
| 26 | 17.0 (16–18) | -9.0 ⚠️ | 0.22 | 0/3 | dart-lang/http#1932 | B | Nothing on the issue itself; my open PR #2034 is the thing to act on, so wait for its review and merge. |
| 27 | 31.3 (30–32) | +4.3 | 0.03 | 0/3 | flutter/devtools#8223 | B | Nothing to do; I was only CC'd on this old feature request in flutter/devtools, which isn't my repo, and the question is directed at bkonyi. |
| 28 | 32.3 (30–34) | +4.3 | 0.03 | 0/3 | dart-lang/http#1837 | A | Nothing to do; I already replied that this is a contributions-welcome item for the community, so wait for a contributor. |
| 29 | 34.3 (34–35) | +5.3 | 0.02 | 0/3 | dart-lang/http#2033 | A | Nothing to do; I already approved and it is waiting on mosuem to merge. |
| 30 | 35.3 (35–36) | +5.3 | 0.02 | 0/3 | dart-lang/http#1365 | A | Nothing to do: http2 is outside my responsibility in dart-lang/http, and nothing is asked of me. |
| 31 | 27.7 (25–30) | -3.3 | 0.05 | 0/3 | dart-lang/tools#2715 | B | Nothing to do; wait for davidmorgan, the named reviewer, to review this PR in dart-lang/tools, which I'm not responsible for. |
| 32 | 30.7 (29–32) | -1.3 | 0.03 | 0/3 | dart-lang/http#2026 | A | Nothing to do; http2 is outside my responsibility and the author asked mosuem to review. |
| 33 | 30.7 (28–33) | -2.3 | 0.04 | 0/3 | dart-lang/native#3653 | A | Nothing to do; the work is liamappelbe's, and he is leaning toward dropping this approach in favor of autorelease pools. |
| 34 | 19.7 (19–20) | -14.3 ⚠️ | 0.17 | 0/3 | dart-lang/http#1972 | B | Nothing to do on the issue itself; wait for the reporter's answer, and review PR #1974 if it needs attention. |
| 35 | 35.0 (33–36) | +0.0 | 0.01 | 0/3 | dart-lang/http#1841 | B | Nothing to do on the issue; review PR #2002 instead, which covers it. |
| 36 | 7.3 (6–10) | -28.7 ⚠️ | 0.57 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph, who offered to help and can reproduce locally, and ask for repro steps. Then check whether the 2026-10-21 commit referenced on the issue touches this. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.93
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue (CA trust problems) that I created and am assigned to, and it has new activity 3 days ago: a report tying it to the eMudhra intermediate CA compromise, with direct questions about Dart's handling of blocklists. Security issues that are mine with any new activity score at the top of the scale, regardless of age or P3 label. The related #64644 was just closed, so I need to verify whether it covers Android's disabled-cert and blocklist handling and leave this issue in a known state.
- **Next action:** Check whether Dart on Android honors the eMudhra intermediate CA blocklist (see #64644, now closed), reply to the new questions, and confirm this issue's status before closing or following up.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is my own PR with unanswered review feedback from kevmoo, a close collaborator, 21h ago, and one unresolved thread. The PR is blocked on my reply, and the change fixes a real release-tagging bug (google-cloud-dart#358). Because I'm blocking someone, it sits in the 0.8–0.9 range.
- **Next action:** Answer kevmoo's inline question about CHANGELOG.md being deleted on the next generate, and push a fix (add it to lib.Keep or have clean preserve it).

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.72
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR from a close collaborator (sigurdm) in googleapis/google-cloud-dart, a repo I'm responsible for, so I'm the default reviewer. Only bots have commented so far, and no human review exists. It was opened 5 days ago, targets main (not stacked), and is a small pre-release change that likely gates the pubsub release. It isn't security-related, so it sits mid-range among reviews waiting on me.
- **Next action:** Review sigurdm's pubsub release-polish PR (attribution header, changelog, pubspec, .pubignore) and ask him to fix the missing license headers and rebase onto main.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.70
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** It's a PR in a repository I'm responsible for, opened 3d ago by a first-time contributor, and no human has reviewed it yet (the Gemini bot doesn't count), so I'm the default reviewer. It fixes a real REST retry bug (ABORTED never retried) but changes the behavior of status.code for JSON errors, so it needs careful review. It isn't a security issue and the author isn't a usual collaborator, so it sits in the middle of the review range.
- **Next action:** Review this PR from a first-time contributor in google-cloud-dart (I'm the default reviewer), checking the Status.code change and its compatibility impact.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is my own bug in a repo I'm responsible for. A contributor posted a concrete design proposal 4 days ago that I haven't answered, and he is waiting on my reply to move forward, which puts it in the 0.65-0.8 range. It isn't a security issue, and it is a larger design project with no PR yet, so it sits mid-range rather than near the top.
- **Next action:** Reply to Yusufihsangorgel's 4d-old design sketch (nullable number and string on ProtoEnum): confirm the approach or request changes, and tell him to open a preliminary PR.

### 6. dart-lang/http#2027 → predicted 11, priority 0.52
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** I filed this 9 days ago in dart-lang/http, a repo I'm responsible for, and it's about the core Client API rather than http2, so it's fresh planned work with nobody else to wait on. It's a design decision that I own, which puts it in the 0.5-0.65 range. It isn't security-related and nothing new has happened since I opened it, so it sits near the bottom of the range.
- **Next action:** Decide on the Client.close design (track outstanding requests vs. async close in a 2.0 release) and write up a concrete proposal or plan on the issue.

### 7. dart-lang/http#1981 → predicted 9, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** I assigned myself and said 5h ago that I've started working on this in dart-lang/http, so it's a fresh commitment I shouldn't drop. The next step is mine, with no one else to wait on and no PR covering it yet. It's a feature request from an outside user rather than a security fix, and it's not in http2 code, so it sits in the middle of my planned-work range.
- **Next action:** Continue the skeleton implementation of the server trust evaluator hook in CupertinoClient, since I just said I've started on it.

### 8. googleapis/google-cloud-dart#360 → predicted 10, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is a collaborator's (kevmoo) issue in a repo I'm responsible for, and kevmoo answered my question 17d ago, so the next step is mine. Part 2 is a real correctness bug: mid-stream errors are silently decoded as empty messages. He said it isn't urgent, and nothing is blocking it, so it sits mid-range in 0.5–0.65 and lower in it because the last activity was 17 days ago. It is not a security issue and no open PR covers it.
- **Next action:** Decide whether to fix the SSE mid-stream error handling (part 2) now, and defer or drop the incremental JSON array part until we know if servers stream it.

### 9. dart-lang/sdk#59846 → predicted 7, priority 0.60
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** I'm assigned and triaged, and nobody else is working on it, so the next step is mine. It's a parser-leniency bug that could enable proxy desync or request smuggling, which makes it security-adjacent, but it isn't labeled security and has had no activity for 22 months. That puts it in the upper part of 'assigned issues to fix or unassign' rather than the security range.
- **Next action:** Fix the dart:io header-name validation to enforce RFC 9110 tchar rules, or unassign myself if I can't take it on.

### 10. googleapis/google-cloud-dart#361 → predicted 12, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is a recent question I'm waiting on from a close collaborator in my own repository, so it falls in the 0.35-0.5 range. The last activity was my own question 16 days ago, so there is nothing for me to do until kevmoo responds. The issue is not security-related and has no covering PR, but it sits slightly above stale items because it is a design decision that affects the Compute API surface.
- **Next action:** Wait for kevmoo to answer my 16d-old question on whether to switch to discovery or add convenience extensions to the proto-based service operations.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is an old but real crash bug in widely used dart:io code where I was only CC'd (by parlough and kevmoo, as the library owner). It is not in a repository I am responsible for (dart-lang/sdk), nothing is directed at me, and there has been no human activity in 20 months apart from label changes. Not a security issue. It stays at the low end of the old-CC range, slightly lifted because kevmoo, a collaborator, hit it himself.
- **Next action:** Decide whether to triage this dart:io bug (possibly take over the abandoned CL 144346) or leave it in the backlog.

### 12. dart-lang/native#3752 → predicted 16, priority 0.25
- **Ground truth:** 
- **Model:** An open PR (dart-lang/native#3763) that I authored links to and closes this issue, so the PR is the thing to act on and the issue is a duplicate of that work. The issue is fresh (6d) and in an area I own, but with a covering PR it ranks well below the PR. It is not a security issue.
- **Next action:** Nothing on the issue itself; drive PR dart-lang/native#3763, which closes it.

### 13. googleapis/google-cloud-dart#366 → predicted 13, priority 0.40
- **Ground truth:** 
- **Model:** Sigurd (a collaborator) filed this in a repo I own, but the checklist is blocked on the generated google_cloud_rpc version being bumped, and I last commented 17d ago saying I'm deciding on a general librarian automation fix. Nothing new has happened since, so there is no immediate step for me. It stays in the 'waiting' range, near the middle because it blocks the storage and pubsub releases and is a collaborator's issue in my repo.
- **Next action:** Wait for the generated google_cloud_rpc version bump; then update the pubspecs and CHANGELOG in storage and pubsub.

### 14. dart-lang/tools#2719 → predicted 22, priority 0.10
- **Ground truth:** 
- **Model:** This is an automated BoringSSL revision bump in dart-lang/tools, which isn't a repository I'm responsible for. The only review request goes to dart-ecosystem-team, not to me personally, so it sits in the low team-review range. It's fresh (19h) and small (+6/-2), but nothing has been asked of me and there's no sign of a security issue.
- **Next action:** Nothing required from me personally; the team review request is shared and another team member can review the automated BoringSSL bump.

### 15. googleapis/google-cloud-dart#381 → predicted 15, priority 0.25
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This is a real bug in google_cloud_rpc, a repo I'm responsible for. The reporter already opened PR #382 that closes it, so the PR is the thing to act on and the issue is a duplicate of that work. Because it is fresh (3d) and affects retry behavior in widely used code, it sits at the top of the low range for issues with a covering PR. The issue is not security-related.
- **Next action:** Review PR #382, which fixes this issue, instead of acting on the issue itself.

### 16. dart-lang/http#2034 → predicted 23, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is my own PR, and I requested a review from goderbauer 2d ago. He hasn't responded yet, and there is no unanswered feedback for me to address. It fixes an open bug (#1932) I'm assigned to, which keeps it slightly above the floor, but the next step belongs to the reviewer.
- **Next action:** Wait for goderbauer to review; ping again if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 8, priority 0.57
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** I'm assigned this issue from collaborator kevmoo in a repo I own. The prerequisite PR #352 has merged, so nothing blocks the work and no open PR covers it. It is planned work that I've already started (example research, narrowed scope), but nothing new has happened in 10 days, so it sits mid-range. The FormatException bug on HTML 502/503/504 is a concrete correctness fix. It is a reliability issue, not a security one.
- **Next action:** Implement the RetryRunner/RequestOptions wiring in ServiceClient and harden ServiceException.fromHttpResponse against non-JSON gateway error bodies.

### 18. dart-lang/http#2031 → predicted 29, priority 0.05
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** This PR is stacked on other PRs, and #2014 is still unreviewed, so the lower PRs need attention first. It is also in http2, which I'm not responsible for. It is a trivial version/changelog bump, and although I'm named as a reviewer, it is blocked by the stack, so it sits near the bottom of the range.
- **Next action:** Wait for the lower stacked PRs (#2014 needs my review; #2010 and #2009 are already approved) to land before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.22
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is my own draft PR in a repo I own, untouched for 45 days. It has merge conflicts and 5 unresolved bot review threads, and nobody else is waiting on it. Drafts I should finish or abandon sit in the 0.15-0.35 range, and the age puts it in the lower part of that range.
- **Next action:** Decide whether to finish this draft DNS package (rebase onto main to fix conflicts, address the 5 bot review threads) or close it.

### 20. dart-lang/core#1007 → predicted 27, priority 0.08
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** dart-lang/core isn't a repository I'm responsible for, and the review was requested from dart-ecosystem-team rather than from me personally, so it's a low-priority team request. The CLA check failed and the author hasn't responded, which blocks review further. It fixes an issue filed by sigurdm, but that doesn't make it mine to act on.
- **Next action:** Nothing for me now; the author needs to sign the CLA and the dart-ecosystem-team review is shared with the rest of the team.

### 21. dart-lang/tools#2544 → predicted 19, priority 0.20
- **Ground truth:** 
- **Model:** This is a security PR (UNC path injection), but it is in dart-lang/tools, a repository I'm not responsible for. The review request went only to dart-ecosystem-team, a team I belong to, and lrhn is already reviewing and requested by name. That makes it a team review request that belongs to someone else, and it has been stalled for about two months with 6 unresolved threads, so it sits at the top of the low team-review range because of its security nature.
- **Next action:** Nothing for me personally; the author (jonasfj) needs to address lrhn's review feedback, and lrhn is already reviewing.

### 22. dart-lang/tools#2710 → predicted 26, priority 0.08
- **Ground truth:** 
- **Model:** This PR is stacked on #2563, which is still a draft and has only a bot review, so the lower PR must be reviewed first. The review request went to dart-ecosystem-team rather than to me personally. dart-lang/tools is not a repository I'm responsible for. It is fresh and comes from my collaborator mosuem, but the stacking keeps it in the low range.
- **Next action:** Nothing yet: review the lower stacked PR dart-lang/tools#2563 first; this PR only has a team review request.

### 23. dart-lang/native#3763 → predicted 24, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is my own PR and I requested review from liamappelbe 2d ago, so the next step is theirs and there is no feedback for me to address. It is fresh and fixes two of my issues, but the issues are covered by this PR so they add nothing to act on. The score stays in the low waiting-on-reviewer range until about a week has passed.
- **Next action:** Wait for liamappelbe to review; ping him if there is still no response after about a week (around Oct 30).

### 24. googleapis/google-cloud-dart#373 → predicted 21, priority 0.12
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my own PR and it is approved by sigurdm. I asked sigurdm 4d ago whether he reviewed the non-PubSub parts and I'm waiting on natebosch, so nothing is waiting on me. The PR is behind main, but it's better to rebase once a reviewer responds. This is a recent wait on reviewers, so it belongs in the low range.
- **Next action:** Wait for sigurdm to answer whether he reviewed the non-pubsub parts, or for natebosch to review; ping again after about a week of silence.

### 25. dart-lang/http#579 → predicted 28, priority 0.07
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** The PR carries the 'next-breaking-release' label, and I said in 2024 that it must be coordinated with a major release I don't have bandwidth for. The latest comment, 14 months ago from a drive-by user asking for a workaround, doesn't change the plan or require action from me. The PR is old and stale, and I'm only the default reviewer, so it sits at the bottom of the blocked range.
- **Next action:** Nothing to do now; the PR is blocked on a future semver-major release, so wait for that plan to move forward.

### 26. dart-lang/http#1932 → predicted 17, priority 0.22
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** An open PR of mine (#2034, updated 2d ago) closes this issue, so the PR is the work item. The newest comment is just a status request, and the real work is waiting on PR review. The issue is a widely hit build break with fresh activity, so it sits near the top of the 0.1–0.35 duplicate-covered range.
- **Next action:** Nothing on the issue itself; my open PR #2034 is the thing to act on, so wait for its review and merge.

### 27. flutter/devtools#8223 → predicted 30, priority 0.04
- **Ground truth:** 
- **Model:** I was only informationally CC'd by bkonyi in 2024 on a feature request in flutter/devtools, a repository I'm not responsible for. The only recent activity is a label change by srawlins, and the GSoC question is addressed to bkonyi, not me. It's not security-related and nothing is asked of me.
- **Next action:** Nothing to do; I was only CC'd on this old feature request in flutter/devtools, which isn't my repo, and the question is directed at bkonyi.

### 28. dart-lang/http#1837 → predicted 34, priority 0.03
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a year-old feature request labeled contributions-welcome and P3, and I already declined it on the Dart team's behalf and explained how a community member could implement it. There has been no activity since, and nothing is directed at me. It is old, low-priority backlog with no action for me.
- **Next action:** Nothing to do; I already replied that this is a contributions-welcome item for the community, so wait for a contributor.

### 29. dart-lang/http#2033 → predicted 35, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** This is a PR from a collaborator in a repo I'm responsible for, but I already approved it 2d ago and there have been no commits or author activity since. CI health is clean and it is mergeable, so it is done as far as I'm concerned.
- **Next action:** Nothing to do; I already approved and it is waiting on mosuem to merge.

### 30. dart-lang/http#1365 → predicted 36, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** The issue is labeled package:http2, and my note says I'm not responsible for http2. I'm only watching the repo and have never been mentioned or asked to act. It is also old, with the last comment 8 months ago, which was a general status question rather than anything directed at me.
- **Next action:** Nothing to do: http2 is outside my responsibility in dart-lang/http, and nothing is asked of me.

### 31. dart-lang/tools#2715 → predicted 25, priority 0.08
- **Ground truth:** 
- **Model:** The review request to dart-ecosystem-team is a team request in dart-lang/tools, which isn't one of my repositories, so it isn't addressed to me personally. davidmorgan is also named as a specific reviewer, which pushes this toward the bottom of the team-request range. Kevmoo is a collaborator and the PR is fresh, but nothing is asked of me.
- **Next action:** Nothing to do; wait for davidmorgan, the named reviewer, to review this PR in dart-lang/tools, which I'm not responsible for.

### 32. dart-lang/http#2026 → predicted 32, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR touches only pkgs/http2, and my note says I'm not responsible for http2. The author asked mosuem for review rather than me, and I wasn't requested or mentioned. Freshness doesn't override scope, so it stays near the bottom.
- **Next action:** Nothing to do; http2 is outside my responsibility and the author asked mosuem to review.

### 33. dart-lang/native#3653 → predicted 31, priority 0.04
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** The issue is assigned to liamappelbe, who is driving it, and the next step is his. The earlier PR merged but did nothing, and he now doubts the approach is worth the effort. I have only commented and was thanked, with nothing asked of me. The last activity was 34d ago, and the related autorelease issues are closed.
- **Next action:** Nothing to do; the work is liamappelbe's, and he is leaning toward dropping this approach in favor of autorelease pools.

### 34. dart-lang/http#1972 → predicted 20, priority 0.20
- **Ground truth:** 
- **Model:** I asked the reporter for information 8 days ago and added needs-info, and there has been no reply, so the issue is waiting on them. PR #1974 is open and claims to fix it, so that PR is the thing to act on, and the issue ranks well below it. The issue stays low in the 0.15-0.35 range because the PR covers it.
- **Next action:** Nothing to do on the issue itself; wait for the reporter's answer, and review PR #1974 if it needs attention.

### 35. dart-lang/http#1841 → predicted 33, priority 0.03
- **Ground truth:** 
- **Model:** I thumbs-downed this on 2026-10-05, and the only later activity is PR #2002 being updated, which is not directed at me on this issue. An open PR (#2002) already covers it, so the PR is the thing to act on. The issue is also labeled next-breaking-release, which blocks it further.
- **Next action:** Nothing to do on the issue; review PR #2002 instead, which covers it.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.62
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** I'm assigned, and filiph reported a local repro 24d ago and asked how to help. That is after my 2026-08-01 thumbs-down, so it counts as new. A commit referenced the issue 4d ago, so I should check whether it fixes it. It's a long-standing, intermittent bug in widely used dart:io, and I own the next step. Nobody else has a PR open for it. I score it in the 'assigned issue to fix or unassign' range, a bit above the middle because of the fresh repro and the recent commit.
- **Next action:** Reply to filiph, who offered to help and can reproduce locally, and ask for repro steps. Then check whether the 2026-10-21 commit referenced on the issue touches this.
