# Gitilizer eval: v4-gpt-6-luna

strategy `pointwise` · model `gpt-6-luna` · thinking `default` · prompt `/sessions/rcw-01fmhwk8caiuvkg25rzkziot/work/gz/prompts/v4.md` · signals `True` · 3 trial(s) · 36 items · 20261108-024225

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.479 ± 0.081 |
| spearman | 0.576 ± 0.091 |
| pairwise_acc | 0.740 ± 0.040 |
| ndcg | 0.951 ± 0.009 |
| ndcg@5 | 0.891 ± 0.025 |
| top3_overlap | 0.889 ± 0.192 |
| top5_overlap | 0.733 ± 0.115 |
| top10_overlap | 0.567 ± 0.058 |
| mean_abs_displacement | 6.704 ± 1.124 |

**1 item scoring(s) failed** — see results.json.

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.778 ± 0.084 | 0.995 ± 0.002 | 0.933 ± 0.115 | 1.375 ± 0.331 |
| B | 20 | 0.179 ± 0.180 | 0.786 ± 0.062 | 0.133 ± 0.115 | 6.133 ± 1.365 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.96 | 3/3 | dart-lang/sdk#48056 | A | Investigate whether Android's eMudhra mitigations apply to Dart HttpClient and reply with the findings; close or link this issue to the security follow-up as appropriate. |
| 2 | 2.0 (2) | +0.0 | 0.84 | 3/3 | googleapis/librarian#7808 | A | Answer kevmoo’s question and update the PR so the generated CHANGELOG.md is preserved. |
| 3 | 3.3 (3–4) | +0.3 | 0.74 | 3/3 | googleapis/google-cloud-dart#376 | A | Review sigurdm’s Pub/Sub release-polish PR, including the bot’s reported cancellation and error-handling concerns, and leave feedback or approve. |
| 4 | 4.3 (3–6) | +0.3 | 0.72 | 3/3 | googleapis/google-cloud-dart#382 | A | Review this first-time contributor’s PR in google-cloud-dart and provide feedback or approve it. |
| 5 | 9.7 (7–14) | +4.7 | 0.62 | 3/3 | googleapis/google-cloud-dart#252 | B | Reply to Yusufihsangorgel’s proposed ProtoEnum representation with a decision or focused questions, then help agree the design before implementation proceeds. |
| 6 | 15.7 (14–17) | +9.7 ⚠️ | 0.55 | 3/3 | dart-lang/http#2027 | B | Decide whether to pursue an async `Client.close` as a breaking change and, if so, outline the desired semantics for a 2.0 proposal. |
| 7 | 11.0 (10–12) | +4.0 | 0.58 | 3/3 | dart-lang/http#1981 | B | Continue the implementation you started, then open or update a PR showing how the trust-evaluation hook would fit. |
| 8 | 11.0 (9–13) | +3.0 | 0.61 | 3/3 | googleapis/google-cloud-dart#360 | A | Reply to kevmoo with your decision on whether incremental JSON framing is in scope, and clarify the next step for the SSE error handling. |
| 9 | 15.0 (12–18) | +6.0 | 0.57 | 3/3 | dart-lang/sdk#59846 | B | Investigate the parser behavior and implement or coordinate a fix for invalid HTTP header-name characters in dart:io. |
| 10 | 12.0 (10–13) | +2.0 | 0.60 | 3/3 | googleapis/google-cloud-dart#361 | A | Follow up with kevmoo on the tradeoff between discovery’s larger API surface and adding polling helpers to the protobuf-based API, then choose a direction for the issue. |
| 11 | 24.0 (17–34) | +13.0 ⚠️ | 0.27 | 1/3 | dart-lang/sdk#31275 | A | Follow up with the dart:io owners and take ownership of landing or adapting the abandoned fix for this still-reproducing bug. |
| 12 | 20.0 (19–22) | +8.0 | 0.22 | 1/3 | dart-lang/native#3752 | B | Review your open PR #3763; this issue is covered by that PR. |
| 13 | 17.0 (15–19) | +4.0 | 0.53 | 3/3 | googleapis/google-cloud-dart#366 | B | Decide whether to handle dependency-version bumps manually or through librarian automation, then reply to Sigurdm with the plan. |
| 14 | 21.7 (21–23) | +7.7 | 0.16 | 0/3 | dart-lang/tools#2719 | B | Wait for the dart-ecosystem-team to review; this is a shared team request, not a personal request. |
| 15 | 20.0 (20) | +5.0 | 0.22 | 0/3 | googleapis/google-cloud-dart#381 | A | Wait for PR #382 to be reviewed and merged; assess the issue once the fix lands. |
| 16 | 25.3 (23–28) | +9.3 ⚠️ | 0.10 | 0/3 | dart-lang/http#2034 | B | Wait for goderbauer to review; follow up if there is no response after about a week. |
| 17 | 10.7 (9–12) | -6.3 | 0.60 | 3/3 | googleapis/google-cloud-dart#359 | B | Define the scoped implementation plan for retry support and HTML error handling, then start or delegate the ServiceClient changes. |
| 18 | 28.7 (27–31) | +10.7 ⚠️ | 0.08 | 0/3 | dart-lang/http#2031 | A | Wait for the lower stacked PRs to be reviewed and merged before reviewing this release PR. |
| 19 | 15.7 (14–18) | -3.3 | 0.54 | 3/3 | googleapis/google-cloud-dart#345 | A | Fix the outstanding review comments and merge conflict, then update the PR and move it out of draft when ready. |
| 20 | 12.0 (5–24) | -8.0 | 0.51 | 2/3 | dart-lang/core#1007 | B | Wait for the contributor to complete the CLA requirement; the ecosystem team review can proceed afterward. |
| 21 | 16.7 (4–24) | -4.3 | 0.34 | 1/3 | dart-lang/tools#2544 | B | Wait for the PR author to address lrhn’s review feedback; this is only a team review request, not a personal request. |
| 22 | 25.0 (22–27) | +3.0 | 0.11 | 0/3 | dart-lang/tools#2710 | B | Wait for the unstacked sigstore base PR #2563 to be reviewed; this PR is a team review request, not a personal request. |
| 23 | 26.3 (24–29) | +3.3 | 0.10 | 0/3 | dart-lang/native#3763 | A | Wait for liamappelbe to review; follow up if there is no response after about a week. |
| 24 | 29.3 (25–36) | +5.3 | -0.26 | 2/2 | googleapis/google-cloud-dart#373 | B | Classified: OpenAI 400: {
  "error": {
    "message": "Invalid prompt: your prompt was flagged as potentially violating our usage policy. Please try again with a different prompt: https://platform.openai.com/docs/guides/reasoning#advice-on-prompting",
    "type": "invalid_request_error",
    "param": null,
    "code": "inv |
| 25 | 13.3 (6–18) | -11.7 ⚠️ | 0.58 | 3/3 | dart-lang/http#579 | B | Reply to retendo with the current workaround or guidance, and clarify whether this PR should remain open for a future breaking release. |
| 26 | 7.0 (5–8) | -19.0 ⚠️ | 0.69 | 3/3 | dart-lang/http#1932 | B | Review your open fix PR #2034 and reply to the recent update requests, then close this issue once the fix is confirmed. |
| 27 | 30.3 (28–34) | +3.3 | 0.07 | 0/3 | flutter/devtools#8223 | B | Wait for the DevTools maintainers or the contributor to drive the feature; no action is currently requested from you. |
| 28 | 32.0 (30–33) | +4.0 | 0.06 | 0/3 | dart-lang/http#1837 | A | Wait for a community contributor to take up the contributions-welcome issue. |
| 29 | 35.0 (33–36) | +6.0 | 0.01 | 0/3 | dart-lang/http#2033 | A | Wait for the PR to be merged; you have already approved it and nothing new has happened. |
| 30 | 35.0 (35) | +5.0 | 0.03 | 0/3 | dart-lang/http#1365 | A | Wait for the reporter or another maintainer to confirm whether the root cause is in http2; this area is outside your stated scope. |
| 31 | 24.7 (23–26) | -6.3 | 0.11 | 0/3 | dart-lang/tools#2715 | B | Wait for the specifically requested reviewer, davidmorgan, to review; the team request is shared and not directed to you personally. |
| 32 | 30.7 (30–31) | -1.3 | 0.05 | 0/3 | dart-lang/http#2026 | A | Wait for the requested reviewer, mosuem, to review this PR; you are not responsible for the http2 area. |
| 33 | 31.0 (29–32) | -2.0 | 0.06 | 0/3 | dart-lang/native#3653 | A | Wait for the assignee or maintainers to decide whether to pursue this; no action is currently requested from you. |
| 34 | 25.0 (9–34) | -9.0 ⚠️ | 0.24 | 1/3 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested details; the linked PR is also marked needs-info. |
| 35 | 17.7 (7–30) | -17.3 ⚠️ | 0.42 | 3/3 | dart-lang/http#1841 | B | Review PR #2002, which covers this issue, and check whether its retry-delay callback addresses the proposal. |
| 36 | 7.0 (5–10) | -29.0 ⚠️ | 0.70 | 3/3 | dart-lang/sdk#38148 | B | Reply to filiph with a concrete debugging or reproduction request, and investigate why recursive deletion leaves the directory non-empty. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/http#1841** (truth #35) in 2/3 trial(s)
- **googleapis/google-cloud-dart#252** (truth #5) placed below **dart-lang/http#1972** (truth #34) in 1/3 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 2/3 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/http#1972** (truth #34) in 1/3 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/http#1841** (truth #35) in 1/3 trial(s)
- **dart-lang/sdk#59846** (truth #9) placed below **dart-lang/sdk#38148** (truth #36) in 3/3 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** This is a security-related issue in the Dart SDK area you own, and it is assigned to you. The recent report raises a fresh concern about a compromised CA and whether Android blocklists are honored; the latest comment also points to the related issue about distrust of compromised intermediates. Confirming the exposure and ensuring the security issue is tracked is urgent despite the old P3 label and age.
- **Next action:** Investigate whether Android's eMudhra mitigations apply to Dart HttpClient and reply with the findings; close or link this issue to the security follow-up as appropriate.

### 2. googleapis/librarian#7808 → predicted 2, priority 0.84
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your PR, and a collaborator has left an unresolved review question that needs your response before review can progress. The PR is still marked review-required, so addressing this now can unblock it. The linked issue is covered by the PR, so the PR is the item to act on.
- **Next action:** Answer kevmoo’s question and update the PR so the generated CHANGELOG.md is preserved.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.73
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is an unreviewed PR in google-cloud-dart, a repository you are responsible for, so you are the default reviewer; the author is also a usual collaborator. The bot review describes potentially serious stream reliability problems, increasing the value of timely human review, though the PR is not identified as security-sensitive. It is not stacked and has been waiting five days.
- **Next action:** Review sigurdm’s Pub/Sub release-polish PR, including the bot’s reported cancellation and error-handling concerns, and leave feedback or approve.

### 4. googleapis/google-cloud-dart#382 → predicted 3, priority 0.74
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is an open, non-draft PR in a repository you are responsible for, and no human has reviewed it; the bot review does not count. The change addresses a concrete retry behavior bug and includes tests, so a timely review can unblock the contributor. It is not identified as a security issue, and the author is not a usual collaborator, so it ranks below urgent security work and collaborator PRs.
- **Next action:** Review this first-time contributor’s PR in google-cloud-dart and provide feedback or approve it.

### 5. googleapis/google-cloud-dart#252 → predicted 8, priority 0.62
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** This is your recently filed issue in a repository you own, and the contributor has returned with a concrete design proposal that needs your input to move forward. The issue is six months old, so it is less like fresh planned work, but the active design discussion makes it actionable now. It is not security-related, and the contributor—not you—is otherwise driving the work, so it falls below urgent reviews or work directly blocking a user.
- **Next action:** Reply to Yusufihsangorgel’s proposed ProtoEnum representation with a decision or focused questions, then help agree the design before implementation proceeds.

### 6. dart-lang/http#2027 → predicted 14, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You opened this issue in a repository you’re responsible for, and it is a recent proposal with no outside dependency or reply; it is your planned work to shape or advance. It is not in the `http2` area you excluded, and there is no security or blocking urgency. Its age and lack of activity keep it below urgent review work.
- **Next action:** Decide whether to pursue an async `Client.close` as a breaking change and, if so, outline the desired semantics for a 2.0 proposal.

### 7. dart-lang/http#1981 → predicted 10, priority 0.58
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** This issue is in a repository you follow, is assigned to you, and your recent comment says you have started working on it, making it an active commitment. The request concerns certificate trust and pinning, but it is a non-security feature request rather than a reported vulnerability. The reporter offered to contribute, but your latest activity indicates you are currently driving the next step.
- **Next action:** Continue the implementation you started, then open or update a PR showing how the trust-evaluation hook would fit.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.58
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is in google-cloud-dart, a repository you own, and kevmoo is a close collaborator who answered your question, so the discussion now needs your response. The issue is explicitly not urgent, and there is no security or immediate production-impact signal; treat it as planned follow-up rather than a blocking priority.
- **Next action:** Reply to kevmoo with your decision on whether incremental JSON framing is in scope, and clarify the next step for the SSE error handling.

### 9. dart-lang/sdk#59846 → predicted 12, priority 0.58
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** You are assigned this issue in a high-impact SDK repository, so it is a concrete item for you to address. The reported acceptance of invalid characters, including NUL and whitespace, could cause interoperability problems, but there is no explicit security report or recent activity. Its age lowers urgency compared with fresh, blocking work.
- **Next action:** Investigate the parser behavior and implement or coordinate a fix for invalid HTTP header-name characters in dart:io.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.57
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** This is in a repository you own, and kevmoo is a close collaborator. Your question about the design choice has not yet received a reply, so the issue is waiting on them rather than ready for implementation; a follow-up can unblock the decision. The thread is 16 days old and not a security or urgent production issue, so it merits moderate priority rather than the higher range for work you can proceed with immediately.
- **Next action:** Follow up with kevmoo on the tradeoff between discovery’s larger API surface and adding polling helpers to the protobuf-based API, then choose a direction for the issue.

### 11. dart-lang/sdk#31275 → predicted 17, priority 0.54
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** This is in an area you have been directly asked about by a collaborator, and kevmoo reports the problem still affects them. The proposed patch was tested successfully but never landed, so there is a concrete next step; however, the issue is stale and you are not responsible for dart-lang/sdk, which keeps it below work in your owned repositories.
- **Next action:** Follow up with the dart:io owners and take ownership of landing or adapting the abandoned fix for this still-reproducing bug.

### 12. dart-lang/native#3752 → predicted 19, priority 0.22
- **Ground truth:** 
- **Model:** You filed and assigned yourself this issue recently, which would normally make it planned work. However, the linked open PR by you addresses it, so the PR is the item to act on and this issue is a duplicate for prioritization. There has been no new issue activity since filing.
- **Next action:** Review your open PR #3763; this issue is covered by that PR.

### 13. googleapis/google-cloud-dart#366 → predicted 15, priority 0.55
- **Ground truth:** 
- **Model:** This is in a repository you own and was filed by a close collaborator, with a clear dependency-update follow-up. Your recent comment raised an unresolved design question, and nothing indicates the issue is waiting on someone else. The thread has been quiet for 17 days, so it is a moderate rather than urgent commitment.
- **Next action:** Decide whether to handle dependency-version bumps manually or through librarian automation, then reply to Sigurdm with the plan.

### 14. dart-lang/tools#2719 → predicted 21, priority 0.18
- **Ground truth:** 
- **Model:** This PR requests review from a team you belong to, but it does not name you personally, and dart-lang/tools is not one of your stated repositories of responsibility. It is recent and has no human review activity, but the shared request does not make it your task to review now.
- **Next action:** Wait for the dart-ecosystem-team to review; this is a shared team request, not a personal request.

### 15. googleapis/google-cloud-dart#381 → predicted 20, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** The linked open PR directly addresses this issue, so the PR—not the issue—is the item to act on. You have no direct assignment, mention, or requested action here, and this is not identified as a security issue. Keep the issue low on the list while the fix is handled through the PR.
- **Next action:** Wait for PR #382 to be reviewed and merged; assess the issue once the fix lands.

### 16. dart-lang/http#2034 → predicted 25, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your PR, but you requested a review from goderbauer only two days ago and there is no review feedback to address. It is currently waiting on someone else, so there is nothing useful to do yet. The PR fixes an issue assigned to you, but the linked issue is covered by this PR and does not make the review request actionable sooner.
- **Next action:** Wait for goderbauer to review; follow up if there is no response after about a week.

### 17. googleapis/google-cloud-dart#359 → predicted 9, priority 0.62
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You are assigned to this issue in a repository you own, and the latest activity was your own scope clarification rather than a handoff or request for outside input. The remaining work—retry integration and robust non-JSON error parsing—is a concrete engineering task, though it is not a security issue or an immediate blocker. A related fix for routing headers and auto-population is tracked separately in issue #80.
- **Next action:** Define the scoped implementation plan for retry support and HTML error handling, then start or delegate the ServiceClient changes.

### 18. dart-lang/http#2031 → predicted 28, priority 0.08
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although you are personally requested to review this PR and the author is a close collaborator, the PR is stacked on other unmerged PRs, so those need to be handled first. The repository note says you are not responsible for the http2 area, and this PR only prepares a release; there is no immediate action for you now.
- **Next action:** Wait for the lower stacked PRs to be reviewed and merged before reviewing this release PR.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.48
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own PR, and the bot’s review identified concrete problems that remain unanswered; the PR is also marked draft and has a dirty merge state. It has been inactive for 45 days, so it is less pressing than fresh work or a collaborator’s review request, but the unresolved feedback means it is still yours to advance.
- **Next action:** Fix the outstanding review comments and merge conflict, then update the PR and move it out of draft when ready.

### 20. dart-lang/core#1007 → predicted 24, priority 0.12
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This PR requests review from dart-ecosystem-team, which is a shared team request rather than a personal request, and this repository is not one you own. It is also blocked by the contributor's unresolved CLA requirement, so there is no useful review action for you right now.
- **Next action:** Wait for the contributor to complete the CLA requirement; the ecosystem team review can proceed afterward.

### 21. dart-lang/tools#2544 → predicted 22, priority 0.15
- **Ground truth:** 
- **Model:** This PR is in a repository you are not responsible for, and the review request is to dart-ecosystem-team rather than to you personally. A reviewer has left substantial unanswered feedback, so the author is currently the one who needs to act; you have not reviewed or been directly asked to do anything. The security subject matter does not make this your urgent task when you are only a team-level reviewer in an unrelated repository.
- **Next action:** Wait for the PR author to address lrhn’s review feedback; this is only a team review request, not a personal request.

### 22. dart-lang/tools#2710 → predicted 27, priority 0.10
- **Ground truth:** 
- **Model:** This is in dart-lang/tools, which you are not listed as responsible for, and the review request is to the shared dart-ecosystem-team rather than to you personally. More importantly, it is stacked on draft PR #2563, so the base PR needs attention first. The author has addressed the bot comments, but there is no new work for you to do now.
- **Next action:** Wait for the unstacked sigstore base PR #2563 to be reviewed; this PR is a team review request, not a personal request.

### 23. dart-lang/native#3763 → predicted 26, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your PR, and you requested a review from liamappelbe only two days ago, so the next step is currently with the reviewer. There is no review feedback or other new activity for you to address yet. Keep it low for now and consider pinging after roughly a week of silence.
- **Next action:** Wait for liamappelbe to review; follow up if there is no response after about a week.

### 24. googleapis/google-cloud-dart#373 → predicted 36, priority -1.00
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Error:** Classified: OpenAI 400: {
  "error": {
    "message": "Invalid prompt: your prompt was flagged as potentially violating our usage policy. Please try again with a different prompt: https://platform.openai.com/docs/guides/reasoning#advice-on-prompting",
    "type": "invalid_request_error",
    "param": null,
    "code": "inv

### 25. dart-lang/http#579 → predicted 16, priority 0.55
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** A commenter asked a direct question about a workaround, and answering it can unblock users. The PR is in dart-lang/http, but you are not responsible for that repository generally; this is also a very stale PR explicitly deferred until a major release, so it is not a pressing review. The request for your review dates from 2024 and your last response said you lacked bandwidth, so focus on the fresh question rather than treating the PR as an urgent review.
- **Next action:** Reply to retendo with the current workaround or guidance, and clarify whether this PR should remain open for a future breaking release.

### 26. dart-lang/http#1932 → predicted 5, priority 0.72
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** You are assigned to this issue in a repository you own, and a recent commenter is asking for an update. Your open PR #2034 appears to address the issue, so the PR is the primary work item; this issue still needs a response and verification rather than being left without an update. The bug affects Android builds, but it is not described as a security issue.
- **Next action:** Review your open fix PR #2034 and reply to the recent update requests, then close this issue once the fix is confirmed.

### 27. flutter/devtools#8223 → predicted 29, priority 0.08
- **Ground truth:** 
- **Model:** This is an old feature request in a repository you do not list as one you own, and you were only CC'd in an informational comment from 2024. The recent update was just a label change, and the contributor's question was addressed to another person rather than you.
- **Next action:** Wait for the DevTools maintainers or the contributor to drive the feature; no action is currently requested from you.

### 28. dart-lang/http#1837 → predicted 30, priority 0.08
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is a low-priority enhancement in dart-lang/http, a repository where you are not responsible for the http2 area, and it is explicitly marked contributions-welcome. You already replied with a suggested implementation path; there has been no activity since, and no new question or request is waiting on you.
- **Next action:** Wait for a community contributor to take up the contributions-welcome issue.

### 29. dart-lang/http#2033 → predicted 33, priority 0.02
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** This is in a repository you follow, and the author is a usual collaborator, but your review is approved with no unresolved threads or subsequent activity. There is nothing for you to do unless the author or maintainers follow up.
- **Next action:** Wait for the PR to be merged; you have already approved it and nothing new has happened.

### 30. dart-lang/http#1365 → predicted 35, priority 0.02
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** This is an old performance enhancement issue in the http2 package, which you explicitly said you are not responsible for. The latest comment asks for confirmation, but does not direct a question or request to you, and there has been no activity from you. The issue is therefore waiting on someone else and has little reason to take your attention now.
- **Next action:** Wait for the reporter or another maintainer to confirm whether the root cause is in http2; this area is outside your stated scope.

### 31. dart-lang/tools#2715 → predicted 23, priority 0.12
- **Ground truth:** 
- **Model:** This is a collaborator’s PR in a repository you are not responsible for, and the team review request does not count as a personal request. A specific other reviewer is named, and the PR was opened only two days ago, so there is no useful action for you now.
- **Next action:** Wait for the specifically requested reviewer, davidmorgan, to review; the team request is shared and not directed to you personally.

### 32. dart-lang/http#2026 → predicted 31, priority 0.03
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** This PR is in the http2 area of dart-lang/http, which you explicitly noted is outside your responsibility. The author requested review from mosuem, and there is no direct request to you; recent activity does not change that. The linked issue is covered by this PR, so the PR is the item to track.
- **Next action:** Wait for the requested reviewer, mosuem, to review this PR; you are not responsible for the http2 area.

### 33. dart-lang/native#3653 → predicted 32, priority 0.03
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is in dart-lang/native, outside the repositories you identified as responsible, and it is assigned to liamappelbe. You contributed earlier, but the recent discussion is a design assessment by the assignee and does not ask you a new question or action. The linked PR has already merged, and the issue has been quiet for over a month.
- **Next action:** Wait for the assignee or maintainers to decide whether to pursue this; no action is currently requested from you.

### 34. dart-lang/http#1972 → predicted 34, priority 0.02
- **Ground truth:** 
- **Model:** You asked the reporter for information and labeled the issue needs-info, with no reply since, so there is nothing useful to do on the issue now. The linked PR is likewise waiting for information, making it the item to revisit if the reporter responds. Although you are assigned, this is in the http2 area you said you are not responsible for.
- **Next action:** Wait for the reporter to provide the requested details; the linked PR is also marked needs-info.

### 35. dart-lang/http#1841 → predicted 7, priority 0.66
- **Ground truth:** 
- **Model:** A PR is now open for this issue, and the author recently asked to work on it and referenced you in the discussion. As a reviewer in an area you follow, your useful next step is to review the PR rather than work the issue separately. The thumbs-down predates this new activity, so it does not suppress the priority.
- **Next action:** Review PR #2002, which covers this issue, and check whether its retry-delay callback addresses the proposal.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.72
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** This issue is assigned to you and has fresh confirmation on the current SDK, along with an offer to help. You should respond and verify the failure rather than let it sit. It is a long-standing core I/O bug, but not an immediate security or blocking issue; the recent activity merits revisiting it despite your earlier thumbs-down.
- **Next action:** Reply to filiph with a concrete debugging or reproduction request, and investigate why recursive deletion leaves the directory non-empty.
