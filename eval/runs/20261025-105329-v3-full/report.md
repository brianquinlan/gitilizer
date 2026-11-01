# Gitilizer eval: v3-full

strategy `pointwise` · model `gemini-3.8-flash` · thinking `default` · prompt `prompts/v3.md` · signals `True` · 3 trial(s) · 13 items · 20261025-105329

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.855 ± 0.015 |
| spearman | 0.952 ± 0.003 |
| pairwise_acc | 0.927 ± 0.007 |
| ndcg | 0.998 ± 0.000 |
| ndcg@5 | 1.000 ± 0.000 |
| top3_overlap | 1.000 ± 0.000 |
| top5_overlap | 1.000 ± 0.000 |
| mean_abs_displacement | 0.718 ± 0.089 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | next action (last trial) |
|---:|---|---:|---:|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.94 | 3/3 | dart-lang/sdk#48056 | Evaluate the reported certificate revocation/compromise security impact and reply or update the status of disabled CA handling. |
| 2 | 2.0 (2) | +0.0 | 0.84 | 3/3 | googleapis/librarian#7808 | Respond to kevmoo's review comment regarding CHANGELOG.md handling and update the PR. |
| 3 | 3.0 (3) | +0.0 | 0.75 | 3/3 | googleapis/google-cloud-dart#376 | Review the PR for Sigurd. |
| 4 | 4.0 (4) | +0.0 | 0.69 | 3/3 | googleapis/google-cloud-dart#382 | Review this pull request. |
| 5 | 5.0 (5) | +0.0 | 0.45 | 0/3 | googleapis/google-cloud-dart#361 | Waiting on kevmoo to reply regarding whether to switch to discovery or add convenience extensions. |
| 6 | 7.0 (7) | +1.0 | 0.32 | 2/3 | dart-lang/sdk#31275 | Decide whether to adopt and land abandoned CL 144346 to resolve uncatchable HttpExceptions. |
| 7 | 6.0 (6) | -1.0 | 0.35 | 0/3 | googleapis/google-cloud-dart#381 | Review linked PR #382 instead of acting directly on this issue. |
| 8 | 8.7 (8–9) | +0.7 | 0.10 | 0/3 | dart-lang/http#1837 | Waiting on a community contribution if anyone decides to implement WinHTTP support. |
| 9 | 8.3 (8–9) | -0.7 | 0.08 | 0/3 | dart-lang/http#2031 | Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first. |
| 10 | 13.0 (13) | +3.0 | 0.00 | 0/3 | dart-lang/http#1365 | None; this is outside my scope as I am not responsible for http2. |
| 11 | 11.0 (11) | +0.0 | 0.00 | 0/3 | dart-lang/http#2026 | Waiting for mosuem to review. |
| 12 | 10.0 (10) | -2.0 | 0.03 | 0/3 | dart-lang/native#3653 | None; waiting on liamappelbe to decide how to handle this in dart-lang/native. |
| 13 | 12.0 (12) | -1.0 | 0.00 | 0/3 | dart-lang/http#2033 | Waiting on mosuem to merge. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **dart-lang/http#1365** (truth #10) placed below **dart-lang/http#2033** (truth #13) in 3/3 trial(s)
- **dart-lang/http#1365** (truth #10) placed below **dart-lang/native#3653** (truth #12) in 3/3 trial(s)
- **dart-lang/sdk#31275** (truth #6) placed below **googleapis/google-cloud-dart#381** (truth #7) in 3/3 trial(s)
- **dart-lang/http#1365** (truth #10) placed below **dart-lang/http#2026** (truth #11) in 3/3 trial(s)
- **dart-lang/http#2026** (truth #11) placed below **dart-lang/native#3653** (truth #12) in 3/3 trial(s)
- **dart-lang/http#1837** (truth #8) placed below **dart-lang/http#2031** (truth #9) in 2/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security issue assigned to and created by you regarding TLS trust and root certificate handling on Android. A user recently raised concerns regarding a critical CA key compromise and platform revocation enforcement, referencing related fix dart-lang/sdk#64644. Per your instructions, any security issue you own with new activity belongs at the top of your list (0.9+) until verified and resolved.
- **Next action:** Evaluate the reported certificate revocation/compromise security impact and reply or update the status of disabled CA handling.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.83
- **Ground truth:** My PR, review feedback needs addressed.
- **Model:** This is my PR, which fixes a publishing bug affecting googleapis/google-cloud-dart. My collaborator kevmoo left review feedback with a specific question on CHANGELOG.md preservation 19 hours ago, so the PR is stalled waiting for my response.
- **Next action:** Respond to kevmoo's review comment regarding CHANGELOG.md handling and update the PR.

### 3. googleapis/google-cloud-dart#376 → predicted 3, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in a repository I maintain, authored by my frequent collaborator sigurdm. Since no human reviewer has looked at it yet and bots do not count, I am the default reviewer. Collaborator PRs waiting for review rank near the top of the standard review bracket.
- **Next action:** Review the PR for Sigurd.

### 4. googleapis/google-cloud-dart#382 → predicted 4, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an unreviewed pull request in googleapis/google-cloud-dart, a repository I am responsible for where I serve as default reviewer. The PR fixes an issue where REST error status codes were incorrectly mapped, preventing proper retries. Because it is from a first-time contributor rather than a close collaborator, it falls toward the lower end of the review queue range.
- **Next action:** Review this pull request.

### 5. googleapis/google-cloud-dart#361 → predicted 5, priority 0.45
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This issue is in a repository I maintain and involves a close collaborator (kevmoo). I left the last comment asking whether we should switch to discovery or use convenience extensions, so the ball is currently in kevmoo's court to respond before further design work can proceed.
- **Next action:** Waiting on kevmoo to reply regarding whether to switch to discovery or add convenience extensions.

### 6. dart-lang/sdk#31275 → predicted 7, priority 0.30
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** You were CC'd by your collaborator kevmoo and parlough as the owner of the library, regarding an abandoned patch for uncatchable exceptions in HttpClient. However, the last mention was over two years ago and no one is actively blocked on you right now. It remains an important bug in widely used code, making it worth keeping on your radar.
- **Next action:** Decide whether to adopt and land abandoned CL 144346 to resolve uncatchable HttpExceptions.

### 7. googleapis/google-cloud-dart#381 → predicted 6, priority 0.35
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue reports a legitimate bug in googleapis/google-cloud-dart where RPC status codes are improperly mapped from HTTP responses. However, the author has already submitted PR #382 to fix it, which is the concrete item that needs review. Per guidelines, issues covered by an open PR are deprioritized by roughly 0.2–0.3 relative to the PR itself.
- **Next action:** Review linked PR #382 instead of acting directly on this issue.

### 8. dart-lang/http#1837 → predicted 9, priority 0.10
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** You responded a year ago clarifying that the Dart team will not take this on and welcomed community contributions, marking it P3. There has been no activity since, so there is nothing for you to do.
- **Next action:** Waiting on a community contribution if anyone decides to implement WinHTTP support.

### 9. dart-lang/http#2031 → predicted 8, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you were requested for review by collaborator mosuem, this release PR is stacked on top of unmerged PRs (including #2014, which still needs review). Furthermore, this is in package:http2, which is outside your primary area of responsibility in dart-lang/http.
- **Next action:** Wait for lower PRs in the stack (such as #2014) to be reviewed and merged first.

### 10. dart-lang/http#1365 → predicted 13, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. Indicated that I am not responsible for package:http2.
- **Model:** This issue is explicitly tagged with 'package:http2', which is an area in dart-lang/http that I am specifically not responsible for. Additionally, I am not mentioned or assigned, so no action is required from me.
- **Next action:** None; this is outside my scope as I am not responsible for http2.

### 11. dart-lang/http#2026 → predicted 11, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** You have noted that you are not responsible for http2 in dart-lang/http. Additionally, the author specifically pinged @mosuem to review this PR, so no action is required from you.
- **Next action:** Waiting for mosuem to review.

### 12. dart-lang/native#3653 → predicted 10, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, which is not one of your primary repositories. It is assigned to and driven by liamappelbe, with no pending questions or actions requested of you. The discussion has been dormant for over a month.
- **Next action:** None; waiting on liamappelbe to decide how to handle this in dart-lang/native.

### 13. dart-lang/http#2033 → predicted 12, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I already reviewed and approved this PR two days ago, and there have been no new commits or comments since. As far as I am concerned, my work here is done and it is waiting on the author to land it.
- **Next action:** Waiting on mosuem to merge.
