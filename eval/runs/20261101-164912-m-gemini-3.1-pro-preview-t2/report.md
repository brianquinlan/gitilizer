# Gitilizer eval: m-gemini-3.1-pro-preview-t2

strategy `pointwise` · model `gemini-3.1-pro-preview` · thinking `default` · prompt `/sessions/rcw-01fmhwk99lde7plpzk7d66ae/mnt/gitilizer2/prompts/v4.md` · signals `True` · 1 trial(s) · 36 items · 20261101-164912

## Metrics (mean ± sd across trials)

| metric | value |
|---|---|
| kendall_tau | 0.708 ± 0.000 |
| spearman | 0.818 ± 0.000 |
| pairwise_acc | 0.854 ± 0.000 |
| ndcg | 0.973 ± 0.000 |
| ndcg@5 | 0.966 ± 0.000 |
| top3_overlap | 0.667 ± 0.000 |
| top5_overlap | 0.800 ± 0.000 |
| top10_overlap | 0.800 ± 0.000 |
| mean_abs_displacement | 3.722 ± 0.000 |

## By set (order within each set only)

| set | n | kendall_tau | ndcg | top5_overlap | mean_abs_displacement |
|---|---:|---:|---:|---:|---:|
| A | 16 | 0.917 ± 0.000 | 0.999 ± 0.000 | 1.000 ± 0.000 | 0.625 ± 0.000 |
| B | 20 | 0.547 ± 0.000 | 0.935 ± 0.000 | 0.800 ± 0.000 | 3.100 ± 0.000 |

## Per item

| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |
|---:|---|---:|---:|---|---|---|---|
| 1 | 1.0 (1) | +0.0 | 0.95 | 1/1 | dart-lang/sdk#48056 | A | Investigate the security concern raised about the compromised CA and clarify if Dart's recent mitigations (like #64644) fully address this or if further work is required. |
| 2 | 3.0 (3) | +1.0 | 0.85 | 1/1 | googleapis/librarian#7808 | A | Answer kevmoo's question about how to handle the CHANGELOG.md file and update the code accordingly. |
| 3 | 4.0 (4) | +1.0 | 0.75 | 1/1 | googleapis/google-cloud-dart#376 | A | Review the PR from sigurdm. |
| 4 | 7.0 (7) | +3.0 | 0.68 | 1/1 | googleapis/google-cloud-dart#382 | A | Review the pull request. |
| 5 | 5.0 (5) | +0.0 | 0.70 | 1/1 | googleapis/google-cloud-dart#252 | B | Review Yusufihsangorgel's proposed design for the ProtoEnum changes and provide feedback. |
| 6 | 9.0 (9) | +3.0 | 0.55 | 1/1 | dart-lang/http#2027 | B | Decide on the approach for making Client.close async and begin planning the implementation for a 2.0 release. |
| 7 | 8.0 (8) | +1.0 | 0.55 | 1/1 | dart-lang/http#1981 | B | Work on the implementation for the server trust evaluation hook and open a PR. |
| 8 | 11.0 (11) | +3.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#360 | A | Acknowledge kevmoo's reply and decide whether to schedule the implementation for incremental JSON streaming and error handling. |
| 9 | 2.0 (2) | -7.0 | 0.92 | 1/1 | dart-lang/sdk#59846 | B | Evaluate the security impact of parsing invalid header characters (like NUL and vertical tab) and implement a fix. |
| 10 | 13.0 (13) | +3.0 | 0.40 | 0/1 | googleapis/google-cloud-dart#361 | A | Wait for kevmoo to reply to my question about switching to discovery vs adding extensions, or ping him since it has been over two weeks. |
| 11 | 14.0 (14) | +3.0 | 0.40 | 1/1 | dart-lang/sdk#31275 | A | Reply to kevmoo and parlough, and determine whether the abandoned CL should be revived. |
| 12 | 17.0 (17) | +5.0 | 0.20 | 0/1 | dart-lang/native#3752 | B | Focus on the linked PR (#3763) that fixes this issue. |
| 13 | 12.0 (12) | -1.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#366 | B | Decide how to handle the dependency requirement updates (manually or via automation) and follow up. |
| 14 | 15.0 (15) | +1.0 | 0.20 | 1/1 | dart-lang/tools#2719 | B | Review the automated dependency update if you have spare time, or leave it for another team member. |
| 15 | 16.0 (16) | +1.0 | 0.20 | 0/1 | googleapis/google-cloud-dart#381 | A | Review the associated PR (#382) that fixes this issue. |
| 16 | 20.0 (20) | +4.0 | 0.10 | 0/1 | dart-lang/http#2034 | B | Wait for @goderbauer to review the PR. |
| 17 | 10.0 (10) | -7.0 | 0.55 | 1/1 | googleapis/google-cloud-dart#359 | B | Implement the RetryRunner and RequestOptions wiring in ServiceClient and harden ServiceException.fromHttpResponse. |
| 18 | 23.0 (23) | +5.0 | 0.10 | 0/1 | dart-lang/http#2031 | A | Review the lower PR in the stack (#2014) first. |
| 19 | 18.0 (18) | -1.0 | 0.20 | 1/1 | googleapis/google-cloud-dart#345 | A | Decide whether to address the bot's feedback and finish this draft, or close it if it's no longer needed. |
| 20 | 27.0 (27) | +7.0 | 0.05 | 0/1 | dart-lang/core#1007 | B | Wait for the author to sign the Contributor License Agreement (CLA). |
| 21 | 30.0 (30) | +9.0 ⚠️ | 0.02 | 0/1 | dart-lang/tools#2544 | B | Wait for the author to address lrhn's review feedback. |
| 22 | 22.0 (22) | +0.0 | 0.10 | 0/1 | dart-lang/tools#2710 | B | Wait for the base PR (#2563) to be reviewed and merged before reviewing this one. |
| 23 | 21.0 (21) | -2.0 | 0.10 | 0/1 | dart-lang/native#3763 | A | Wait for liamappelbe to review the PR. |
| 24 | 24.0 (24) | +0.0 | 0.10 | 0/1 | googleapis/google-cloud-dart#373 | B | Wait for Sigurd to reply to my question about merging the PR. |
| 25 | 28.0 (28) | +3.0 | 0.05 | 0/1 | dart-lang/http#579 | B | None right now; the PR is parked for a future major version release. |
| 26 | 19.0 (19) | -7.0 | 0.15 | 0/1 | dart-lang/http#1932 | B | Focus on your open PR (#2034) which fixes this issue. |
| 27 | 29.0 (29) | +2.0 | 0.02 | 0/1 | flutter/devtools#8223 | B | Wait for the issue owner or other contributors to drive this forward. |
| 28 | 25.0 (25) | -3.0 | 0.10 | 0/1 | dart-lang/http#1837 | A | Wait for a community member to contribute a WinHTTP implementation. |
| 29 | 33.0 (33) | +4.0 | 0.00 | 0/1 | dart-lang/http#2033 | A | Wait for mosuem to merge the approved PR. |
| 30 | 36.0 (36) | +6.0 | 0.00 | 0/1 | dart-lang/http#1365 | A | None; this issue is in an area (http2) outside your stated scope. |
| 31 | 26.0 (26) | -5.0 | 0.05 | 0/1 | dart-lang/tools#2715 | B | Wait for davidmorgan to review the PR. |
| 32 | 32.0 (32) | +0.0 | 0.00 | 0/1 | dart-lang/http#2026 | A | Nothing to do; wait for mosuem to review this PR. |
| 33 | 35.0 (35) | +2.0 | 0.00 | 0/1 | dart-lang/native#3653 | A | Nothing to do; wait for liamappelbe to either implement a fix or close the issue. |
| 34 | 31.0 (31) | -3.0 | 0.02 | 0/1 | dart-lang/http#1972 | B | Wait for the reporter to provide the requested information. |
| 35 | 34.0 (34) | -1.0 | 0.00 | 0/1 | dart-lang/http#1841 | B | Wait for the linked PR (#2002) to be reviewed and merged. |
| 36 | 6.0 (6) | -30.0 ⚠️ | 0.70 | 1/1 | dart-lang/sdk#38148 | B | Reply to filiph and ask them to share their reproduction steps or guide them on how to help debug the issue. |

## Largest inversions

Pairs the model ordered the wrong way round, biggest ground-truth gap first.

- **googleapis/google-cloud-dart#382** (truth #4) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#2027** (truth #6) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/http#1981** (truth #7) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#360** (truth #8) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#361** (truth #10) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/sdk#31275** (truth #11) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/native#3752** (truth #12) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#366** (truth #13) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **dart-lang/tools#2719** (truth #14) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)
- **googleapis/google-cloud-dart#381** (truth #15) placed below **dart-lang/sdk#38148** (truth #36) in 1/1 trial(s)

## Reasoning (last trial) vs. ground truth

### 1. dart-lang/sdk#48056 → predicted 1, priority 0.95
- **Ground truth:** Issue created by me, recent security concerns that have probably been addressed by #64644 but need to verify that they have been addressed and possibly close the issue.
- **Model:** You are the author and assignee of this issue. A user recently highlighted a severe security implication (a compromised CA key) stemming from Dart ignoring Android's disabled certificates. Security issues assigned to you with new activity demand immediate attention to verify the state and address the risk, regardless of other factors.
- **Next action:** Investigate the security concern raised about the compromised CA and clarify if Dart's recent mitigations (like #64644) fully address this or if further work is required.

### 2. googleapis/librarian#7808 → predicted 3, priority 0.85
- **Ground truth:** Review feedback needs addressed.
- **Model:** This is your own PR, and kevmoo recently left review feedback with a question that you have not yet answered. You need to address this feedback to unblock your own work, which makes it a high priority.
- **Next action:** Answer kevmoo's question about how to handle the CHANGELOG.md file and update the code accordingly.

### 3. googleapis/google-cloud-dart#376 → predicted 4, priority 0.75
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for.
- **Model:** This is a PR by a close collaborator in a repository I am responsible for. It has been open for 5 days with no human reviews, so as the default reviewer, it is waiting on me to unblock them.
- **Next action:** Review the PR from sigurdm.

### 4. googleapis/google-cloud-dart#382 → predicted 7, priority 0.68
- **Ground truth:** Recent PR from an unknown 3rd party in a repo that I am responsible for.
- **Model:** This is a pull request in a repository you are responsible for (`googleapis/google-cloud-dart`) and it has not been reviewed by a human yet. As the owner, you are the default reviewer. Even though it is from a first-time contributor, providing an initial review is important to unblock them and land a potentially useful bug fix. This falls into the 0.65–0.8 range for reviews waiting on you.
- **Next action:** Review the pull request.

### 5. googleapis/google-cloud-dart#252 → predicted 5, priority 0.70
- **Ground truth:** Conversation waiting for a reply to make progress.
- **Model:** A contributor provided a design sketch at your request for an issue in a repository you own. They are waiting on your feedback to ensure you agree on the approach before they invest time in writing a large PR, meaning you are currently blocking their progress.
- **Next action:** Review Yusufihsangorgel's proposed design for the ProtoEnum changes and provide feedback.

### 6. dart-lang/http#2027 → predicted 9, priority 0.55
- **Ground truth:** Recent bug filed by file in an area in which I work.
- **Model:** You recently filed this issue in a repository you own to track tightening the semantics of `Client.close`. Since nothing is waiting on anyone else, this is your own planned work and is ready for you to pick up. It's still relatively fresh at 9 days old, placing it in the mid-range for planned tasks.
- **Next action:** Decide on the approach for making Client.close async and begin planning the implementation for a 2.0 release.

### 7. dart-lang/http#1981 → predicted 8, priority 0.55
- **Ground truth:** Not actionable but recent comment indicates that work is in progress.
- **Model:** You recently assigned this issue to yourself and explicitly stated you are working on it. Since it is in a repository you are responsible for, it qualifies as your own planned work and needs to be driven forward.
- **Next action:** Work on the implementation for the server trust evaluation hook and open a PR.

### 8. googleapis/google-cloud-dart#360 → predicted 11, priority 0.55
- **Ground truth:** An issue in a repo that I'm responsible for. The filer is a collaborator. The filer indicated the issue isn't urgent.
- **Model:** This is an issue in a repository you are responsible for, filed by a close collaborator. You asked a clarifying question and the collaborator replied, so the ball is in your court to decide how to proceed. Even though they noted it isn't urgent, collaborator issues in your own repositories with a clear next step for you rate as solid planned work.
- **Next action:** Acknowledge kevmoo's reply and decide whether to schedule the implementation for incremental JSON streaming and error handling.

### 9. dart-lang/sdk#59846 → predicted 2, priority 0.92
- **Ground truth:** Assigned to me my a collaborator but inactive. I should probably address this or unassign it.
- **Model:** Accepting invalid characters in HTTP headers is a known vector for HTTP request smuggling and response splitting, making this a security issue. Security issues outrank all other work and are not penalized for their age. Since I am assigned, I need to address this vulnerability.
- **Next action:** Evaluate the security impact of parsing invalid header characters (like NUL and vertical tab) and implement a fix.

### 10. googleapis/google-cloud-dart#361 → predicted 13, priority 0.40
- **Ground truth:** Issue created by a close collaborator in a repo that I am responsible for. In the last comment I asked a question that hasn't been answered yet.
- **Model:** I asked a question to a close collaborator (kevmoo) in my own repository 16 days ago and am waiting for his reply. While there is nothing I strictly need to do right now, unanswered questions to collaborators in my repositories stay somewhat visible so I can follow up if needed.
- **Next action:** Wait for kevmoo to reply to my question about switching to discovery vs adding extensions, or ping him since it has been over two weeks.

### 11. dart-lang/sdk#31275 → predicted 14, priority 0.40
- **Ground truth:** Seemingly important issue where I was explicitly CCed as the last comment. But the last comment is very old and I am not assigned.
- **Model:** Although this issue has been dormant for over two years, a close collaborator (kevmoo) explicitly CC'd you because they were hitting it, and you were asked directly who owns the library. Because the pings are quite old, the priority is lowered, but you still need to address the abandoned patch or provide a status update.
- **Next action:** Reply to kevmoo and parlough, and determine whether the abandoned CL should be revived.

### 12. dart-lang/native#3752 → predicted 17, priority 0.20
- **Ground truth:** 
- **Model:** You recently filed this issue and are assigned to it, but you also opened a PR to fix it. The actionable work is now on the PR, so this issue is low priority until the PR lands.
- **Next action:** Focus on the linked PR (#3763) that fixes this issue.

### 13. googleapis/google-cloud-dart#366 → predicted 12, priority 0.55
- **Ground truth:** 
- **Model:** This is an issue in a repository you are responsible for, opened by a close collaborator. You previously stated that you were trying to decide how to solve this generally, which leaves the next step on you. It is scored as your own planned work that you need to follow through on.
- **Next action:** Decide how to handle the dependency requirement updates (manually or via automation) and follow up.

### 14. dart-lang/tools#2719 → predicted 15, priority 0.20
- **Ground truth:** 
- **Model:** This is an automated dependency update in a repository you are not responsible for (`dart-lang/tools`). The review request was routed to your team (`dart-ecosystem-team`) rather than you personally, so it is a low priority item that anyone on the team can handle.
- **Next action:** Review the automated dependency update if you have spare time, or leave it for another team member.

### 15. googleapis/google-cloud-dart#381 → predicted 16, priority 0.20
- **Ground truth:** Issue associated with googleapis/google-cloud-dart#382 - PRs are more important than issues and surfacing an issue associated with a PR is redundant.
- **Model:** This issue is in a repository you are responsible for, but it already has an open PR (#382) that fixes it. As a result, the PR is the actionable item, and this issue is ranked low until the PR is resolved.
- **Next action:** Review the associated PR (#382) that fixes this issue.

### 16. dart-lang/http#2034 → predicted 20, priority 0.10
- **Ground truth:** Wait for a review. Review request was recent so that reviewer does not need to be pinged.
- **Model:** This is your own PR and you recently (2 days ago) requested a review from @goderbauer. Since it has been less than a week, there is nothing for you to do right now but wait for their response.
- **Next action:** Wait for @goderbauer to review the PR.

### 17. googleapis/google-cloud-dart#359 → predicted 10, priority 0.55
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This is an issue from a close collaborator in a repository I own, and I am assigned to it. The next steps are clearly defined, making it planned work that I need to either implement or explicitly reschedule.
- **Next action:** Implement the RetryRunner and RequestOptions wiring in ServiceClient and harden ServiceException.fromHttpResponse.

### 18. dart-lang/http#2031 → predicted 23, priority 0.10
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because it is part of a PR stack that has lower stacked items that have not been reviewed.
- **Model:** Although a close collaborator explicitly requested my review, this PR is stacked on another PR (#2014) that I have not yet reviewed. The lower PRs need to be reviewed and merged first, so this one is a low priority for now.
- **Next action:** Review the lower PR in the stack (#2014) first.

### 19. googleapis/google-cloud-dart#345 → predicted 18, priority 0.20
- **Ground truth:** I created the PR but it is still a draft. At some point I should complete the work or abandon it.
- **Model:** This is your own draft PR that has been sitting untouched for 45 days. It has pending review comments from a bot, but since it's an old draft, it falls into the backlog category of things to finish or abandon.
- **Next action:** Decide whether to address the bot's feedback and finish this draft, or close it if it's no longer needed.

### 20. dart-lang/core#1007 → predicted 27, priority 0.05
- **Ground truth:** Team review requested for a repository that I don't monitor
- **Model:** This is a team review request in a repository you are not responsible for (dart-lang/core). Furthermore, the PR is currently blocked by a failing CLA check, so there is nothing for you to review until the author signs it.
- **Next action:** Wait for the author to sign the Contributor License Agreement (CLA).

### 21. dart-lang/tools#2544 → predicted 30, priority 0.02
- **Ground truth:** 
- **Model:** Although this is a security mitigation PR, it is in a repository I am not responsible for (dart-lang/tools) and another reviewer (lrhn) is already driving it. Because a specific other person is handling the review and waiting on the author, this team review request is near zero priority for me.
- **Next action:** Wait for the author to address lrhn's review feedback.

### 22. dart-lang/tools#2710 → predicted 22, priority 0.10
- **Ground truth:** 
- **Model:** This PR is stacked on an unreviewed draft PR (#2563), which needs to be addressed first. Additionally, it is in a repository I am not responsible for and is only a team review request, so it does not require my immediate personal attention.
- **Next action:** Wait for the base PR (#2563) to be reviewed and merged before reviewing this one.

### 23. dart-lang/native#3763 → predicted 21, priority 0.10
- **Ground truth:** A PR that I created. Not actionable because it was recently assigned a reviewer who hasn't reviewed it yet. If the reviewer hadn't responded for a week then maybe it would be actionable in that I should ping the reviewer.
- **Model:** This is your own PR and you requested a review from liamappelbe 2 days ago. There is nothing to do until they respond or a week has passed.
- **Next action:** Wait for liamappelbe to review the PR.

### 24. googleapis/google-cloud-dart#373 → predicted 24, priority 0.10
- **Ground truth:** Recently pinged a collaborator to get a review. Should ping again after a week.
- **Model:** This is my PR and I recently (4 days ago) asked a collaborator if we can merge it based on his approval alone to save Nate's time. Since it hasn't been a full week, there is nothing to do right now but wait for his response.
- **Next action:** Wait for Sigurd to reply to my question about merging the PR.

### 25. dart-lang/http#579 → predicted 28, priority 0.05
- **Ground truth:** Labelled "next-breaking-release" so can't be addressed at this time.
- **Model:** This PR introduces breaking changes and has been labeled for the next breaking release. The thread has been dormant for over a year, and you previously noted that you do not have the bandwidth to drive a major release at this time. It sits in the backlog.
- **Next action:** None right now; the PR is parked for a future major version release.

### 26. dart-lang/http#1932 → predicted 19, priority 0.15
- **Ground truth:** There is a PR open to address this issue so there is nothing else actionable to do.
- **Model:** This issue is covered by your open PR (#2034) that addresses the namespace duplication. As long as the PR is open and being worked on, there is nothing to do on the issue itself, so it ranks low.
- **Next action:** Focus on your open PR (#2034) which fixes this issue.

### 27. flutter/devtools#8223 → predicted 29, priority 0.02
- **Ground truth:** 
- **Model:** I was CC'd on this feature request over two years ago in a repository I am not responsible for. There has been no direct request for my input, and there is no action required from me.
- **Next action:** Wait for the issue owner or other contributors to drive this forward.

### 28. dart-lang/http#1837 → predicted 25, priority 0.10
- **Ground truth:** Old low priority issue where I explicitly asked for 3rd party contributions.
- **Model:** This is an old, low-priority feature request marked as 'contributions-welcome'. You previously clarified that the Dart team is not planning to build this, and there has been no activity since. It belongs in the backlog.
- **Next action:** Wait for a community member to contribute a WinHTTP implementation.

### 29. dart-lang/http#2033 → predicted 33, priority 0.00
- **Ground truth:** The PR of a close collaborator in a repo that I am responsible for. Not actionable because I've already approved it.
- **Model:** I have already approved this PR, and there are no new commits or questions from the author. It is entirely waiting on them to merge it, so there is nothing for me to do.
- **Next action:** Wait for mosuem to merge the approved PR.

### 30. dart-lang/http#1365 → predicted 36, priority 0.00
- **Ground truth:** Issue in a repo that I'm interested in. The issue is stale. I indicated that I am not responsible for package:http2.
- **Model:** You explicitly noted that you are not responsible for the http2 package in the dart-lang/http repository. The issue has also been inactive for 8 months and no one has requested your attention, so there is nothing for you to do here.
- **Next action:** None; this issue is in an area (http2) outside your stated scope.

### 31. dart-lang/tools#2715 → predicted 26, priority 0.05
- **Ground truth:** 
- **Model:** This is a team review request in a repository I am not responsible for. Since a specific individual (davidmorgan) is also requested to review it, this is not addressed to me personally and requires no immediate action on my part.
- **Next action:** Wait for davidmorgan to review the PR.

### 32. dart-lang/http#2026 → predicted 32, priority 0.00
- **Ground truth:** PR in a repo that I am interested in. Assigned to another collaborator. Indicated that I am not responsible for package:http2.
- **Model:** You have explicitly noted that you are not responsible for the http2 portion of the dart-lang/http repository. The author has also directly asked mosuem to review the PR, so there is no need for your involvement.
- **Next action:** Nothing to do; wait for mosuem to review this PR.

### 33. dart-lang/native#3653 → predicted 35, priority 0.00
- **Ground truth:** Issue that I created comments in. Assigned to someone else and not actionable by me.
- **Model:** This issue is assigned to and being driven by someone else in a repository I am not responsible for. The latest comments do not ask anything of me, and it has been dormant for over a month.
- **Next action:** Nothing to do; wait for liamappelbe to either implement a fix or close the issue.

### 34. dart-lang/http#1972 → predicted 31, priority 0.02
- **Ground truth:** 
- **Model:** You asked the reporter a question 8 days ago and applied the 'needs-info' label, but they have not replied yet. Additionally, there is an open PR that is meant to address this issue, making the issue itself a low priority.
- **Next action:** Wait for the reporter to provide the requested information.

### 35. dart-lang/http#1841 → predicted 34, priority 0.00
- **Ground truth:** 
- **Model:** You marked this issue as not important (thumbs-down) on October 5th, and there has been no new activity on the issue itself since then. Additionally, an open PR (#2002) is currently addressing this feature, so any further action belongs on the PR rather than the issue.
- **Next action:** Wait for the linked PR (#2002) to be reviewed and merged.

### 36. dart-lang/sdk#38148 → predicted 6, priority 0.70
- **Ground truth:** Thumbs down with no reply afterwards.
- **Model:** You previously deprioritized this issue, but a user recently provided new information indicating they can reproduce it locally on a modern SDK and asked how they can help. Since you are assigned to this issue, you should follow up to capture the reproduction steps or guide them on debugging before the context is lost.
- **Next action:** Reply to filiph and ask them to share their reproduction steps or guide them on how to help debug the issue.
