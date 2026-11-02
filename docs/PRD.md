# Gitilizer product requirements

| | |
|---|---|
| **Status** | Draft for review |
| **Owner** | brian@sweetapp.com |
| **Last updated** | 2026-11-01 (product owner's answers to 25 questions and parts of 10 more; the new Settings design; new questions Q-64 to Q-69) |
| **Address** | [gitilizer.com](https://gitilizer.com) |
| **Design** | [Gitilizer Figma file](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=0-1) |
| **Replaces** | [Gitilizer PRD (Google Doc)](https://docs.google.com/document/d/1iN4HGqn5_Nz4g8oweqg0PK-iLlKQ8dza7ruqxADpu6U/edit) |
| **Next document** | [Design doc](design.md), then implementation |

## How to read this document

- Each requirement has an ID, such as `LIST-4`, so the design doc, code reviews and tests can refer to it.
- **Must** means required for launch. **Should** means expected unless the design doc gives a reason not to. **May** means optional.
- Figma links open the exact frame or component. Where this document and Figma disagree, this document wins, and the disagreement is listed in [Open questions](#open-questions).
- **TODO** marks missing information. **TODO(double check)** marks a suggested answer that the product owner must confirm before the design doc relies on it. Every TODO links to a row in [Open questions](#open-questions).
- "Item" means a GitHub issue or a pull request (PR). "Developer" means the person using Gitilizer.

## Contents

1. [Overview](#overview)
2. [Glossary](#glossary)
3. [Reference material](#reference-material)
4. [Screens and navigation](#screens-and-navigation)
5. [Sign-in](#sign-in)
6. [Footer](#footer)
7. [App bar](#app-bar)
8. [Account menu](#account-menu)
9. [Notifications](#notifications)
10. [Warm Welcome](#warm-welcome)
11. [Prioritized list](#prioritized-list)
12. [Live updates](#live-updates)
13. [Icebox](#icebox)
14. [Settings](#settings)
15. [Scanning and ranking](#scanning-and-ranking)
16. [Data and privacy](#data-and-privacy)
17. [Non-functional requirements](#non-functional-requirements)
18. [Open questions](#open-questions)
19. [Appendix: changes from the Google Doc version](#appendix-changes-from-the-google-doc-version)

---

## Overview

### Problem

Developers who work across many GitHub repositories get a steady stream of assignments, review requests, @-mentions and activity in repositories they care about. GitHub's own lists show these items by type or by date, not by how much they need the developer's attention right now. Working out what to do next takes time and is easy to get wrong.

### Product

Gitilizer is a web application, at [gitilizer.com](https://gitilizer.com), that shows a developer one ordered list of the open GitHub items that involve them. An AI agent ranks every item, so the item that most deserves the developer's attention is at the top. The list keeps itself up to date as items change on GitHub, without the developer reloading the page.

The developer supplies their own credentials: a GitHub personal access token (PAT), which Gitilizer uses to read their items, and a Gemini API key, which Gitilizer uses to rank them.

### Goals

1. A developer can see their most important item at a glance, and can trust that the order reflects the current state of GitHub.
2. The list stays current without a page reload, and changes in order are easy to follow.
3. A developer can tune the ranking with their own instructions, the repositories they care about and the people they work with.
4. When something stops Gitilizer from working (an expired token, a Gemini quota problem), the developer finds out and knows how to fix it.

### Non-goals

These are out of scope for the first release.

- Acting on items from Gitilizer, such as commenting, closing or reviewing. Item titles link to GitHub.
- GitHub Enterprise Server, GitLab and other code hosts.
- Shared or team views of a list.
- Email, push or other notifications outside the app.
- Native mobile apps.
- Gitilizer-provided GitHub or Gemini credentials.
- Ranking with models other than Gemini. The design should still allow other model providers to be added later.
- Review requests made to a GitHub team the developer belongs to, and the ranking agent's "review teams" setting. Only review requests made to the developer personally count. **Revisit after the first release** (see [Q-43](#q-43)).
- Showing the agent's next action or reasoning for an item ([Q-31](#q-31)).

### Metrics

Gitilizer is a hobby project, so there are no success targets. The owner must still be able to see how it is used.

- **METRIC-1** The owner must be able to see, without writing queries, at least:
  - the total number of users (everyone who has ever signed in);
  - the number of users who have completed setup (entered both credentials, see [Which screen is shown](#which-screen-is-shown));
  - the number of active users per day, per week and per month, including for past days.
- **METRIC-2** Metrics should use what Google Cloud already provides (for example Cloud Monitoring dashboards) rather than a custom admin screen.

NEW: There should also be monitoring for system health reasons. For example, latency for API calls, latency for time to load. HTTP status codes returned for page load, etc.
---

## Glossary

| Term | Meaning |
|---|---|
| Item | A GitHub issue or pull request. |
| Prioritized list | The ranked list of the developer's items. In Figma the screen is called "Issue inbox", and its tab is labeled "Prioritized". |
| Icebox | Items the developer has deliberately moved out of the Prioritized list. They have no rank. |
| Rank | An item's position in the Prioritized list: 1 is the most important. This document always says "rank" for the position. |
| Score | The number from 0.0 to 1.0 that the ranking agent gives each item. Ranks come from sorting by score. This document always says "score" for the number. |
| Priority | Used only as the name of the column that shows the rank, and of the sort order that puts rank 1 first. |
| Inclusion reason | Why an item is on the developer's list, for example "Assigned to you". See [Which items appear](#which-items-appear). |
| Additional repository | A repository the developer added in Settings. Its open items appear in the list even if the developer isn't otherwise involved. Earlier versions of this document called it an "interested repository". |
| Prioritization prompt | Optional free text that the developer gives one additional repository, telling the ranking agent what matters in it, for example "Security issues only". |
| Ranking prompt | The instructions the ranking agent follows for every item. The developer can replace the default in Settings. |
| Collaborator | A GitHub user whose items and comments the developer wants scored higher. |
| Scan | A backend job that reads the developer's items from GitHub and finds new, changed and removed items. |
| Ranking | A backend job that asks the ranking agent to score items. |
| Sync | A scan, followed by ranking of any new and changed items. "Sync now" starts one. |
| Full re-rank | Ranking every item again, started by "Save and re-rank" in Settings. |
| Notification | An error or warning shown in the bell's popover. |
| PAT | A GitHub personal access token. |

---

## Reference material

### Figma frames

All links point to the [Gitilizer Figma file](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=0-1). The "Application UX" page holds the screens. The "Live reorder prototype" page holds the animated flows for [Live updates](#live-updates).

| Screen or element | Figma | Section |
|---|---|---|
| Sign-in page | [Sign in](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2978) | [Sign-in](#sign-in) |
| Footer | [Shared / Footer](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-346) | [Footer](#footer) |
| App bar | [Shared / App bar](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-323) | [App bar](#app-bar) |
| Account menu | [Profile dropdown](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-327) (a layer inside the app bar) | [Account menu](#account-menu) |
| Notification bell | [Shared / Notification bell](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=215-1375) (Idle, Error, Warning and the swing steps) | [Bell](#bell) |
| Bell with an active error | [Notifications · Active error condition](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=200-2604) | [Bell](#bell) |
| Popover with one error | [Notifications · Error being shown](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=200-2665) | [Popover](#popover) |
| Popover with several errors | [Notifications · Multiple active errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=223-1808) | [Popover](#popover) |
| Popover with a warning | [Notifications · Warning being shown](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=227-1824) | [Popover](#popover) |
| Popover with no notifications | [Notifications · Resolved and empty](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=200-2743) | [Popover](#popover) |
| Warm Welcome | [Warm Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=70-475) | [Warm Welcome](#warm-welcome) |
| Prioritized list | [Issue inbox - Populated issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2562) | [Prioritized list](#prioritized-list) |
| Prioritized list, empty | [Issue inbox · No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-897) | [Empty, loading and first-sync states](#empty-loading-and-first-sync-states) |
| List layout component | [Shared / Inbox layout](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-1000) | [Prioritized list](#prioritized-list) |
| Sync now button | [Shared / Sync now](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=279-8369) (Idle and Syncing; present it to see the icon turn) | [Sync now](#sync-now) |
| Icebox | [Icebox · Populated issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=178-5947) | [Icebox](#icebox) |
| Icebox, empty | [Icebox - No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=190-2593) | [Icebox](#icebox) |
| Icebox row | [Icebox / Issue row · Restore](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=180-1403) | [Icebox](#icebox) |
| Settings | [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802) and its content component [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509), including Additional repositories, Collaborators, Delete account and the two save buttons | [Settings](#settings) |

### Live reorder prototype

The [Live reorder prototype](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=139-491) page shows how the Prioritized list changes when ranks change. Open it in Present mode and pick a flow; each flow plays on its own and loops. Flow 7 waits for you to move the pointer onto the table and off it again. The frames show 10 rows per page to keep them small; the behavior is the same at 25. The [How to play these flows](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=151-8151) note on that page has the details.

| Flow | Starts at | Requirement |
|---|---|---|
| 1 · Moves within this page | [145:491](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=145-491) | `LIVE-11` |
| 2 · Moves to an earlier page | [145:1349](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=145-1349) | `LIVE-12` |
| 3 · Moves to a later page | [145:2278](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=145-2278) | `LIVE-13` |
| 4 · Arrives from another page | [145:3207](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=145-3207) | `LIVE-14` |
| 5 · Issue is closed | [150:3071](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=150-3071) | `LIVE-15` |
| 6 · New issue appears | [150:3998](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=150-3998) | `LIVE-16` |
| 7 · Held while the pointer is on the list | [150:4925](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=150-4925) | `LIVE-4` |
| 8 · Many changes at once | [150:5783](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=150-5783) | `LIVE-9` |
| 9 · This page stops existing | [151:5707](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=151-5707) | `LIVE-2` |
| 10 · Sorted by repository | [151:6435](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=151-6435) | `LIVE-19` |
| 11 · Reduced motion | [151:7293](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=151-7293) | `LIVE-22` |

### Source code

The source code and documentation are hosted on GitHub at [github.com/brianquinlan/gitilizer](https://github.com/brianquinlan/gitilizer). The repository already contains the ranking agent and its evaluation harness. How the application is built, including how it reuses them, is in the [design doc](design.md).

---

## Screens and navigation

### Which screen is shown

| # | Condition | Screen |
|---|---|---|
| 1 | Not signed in | [Sign-in](#sign-in), for every URL. After signing in, the developer returns to the URL they asked for. |
| 2 | Signed in, and the developer hasn't yet completed setup, meaning they haven't yet entered both a GitHub PAT and a Gemini API key | [Warm Welcome](#warm-welcome) |
| 3 | Signed in, anything else | The screen the developer navigated to. The default is the [Prioritized list](#prioritized-list). |

- **NAV-1** The rules above must be evaluated on every page load and whenever the condition changes, for example when the developer saves both credentials on the Settings page.
- **NAV-2** Once setup is complete, Warm Welcome is never shown again. If ranking or scanning can't work later (for example because a key is invalid or has expired), the developer sees the Prioritized list with an error notification.

### Routes

- **NAV-3** The screens must have these URLs on `https://gitilizer.com`: `/` for the Prioritized list and `/icebox` for the Icebox (each with `?page=N` for pages after the first), `/settings` (with `#connections`, `#additional-repositories`, `#ranking-prompt`, `#collaborators` and `#account` for its sections) and `/sign-in`. Sort order is a stored preference, not part of the URL.
- **NAV-4** Moving between these screens must not reload the page.

### Moving between screens

- **NAV-5** The developer reaches Settings from the [account menu](#account-menu), from links in notifications, from the "Go to Settings" button on Warm Welcome and from the "settings" link in the empty Prioritized list.
- **NAV-6** The developer switches between the Prioritized list and the Icebox with the "Prioritized" / "Icebox" toggle above the table.
- **NAV-7** The Gitilizer symbol and wordmark in the app bar must link to the Prioritized list.

> **TODO(double check) · [Q-64](#q-64):** You asked whether "Save changes" and "Save and re-rank" should also take the developer back to the Prioritized list. Suggestion: yes, when the save succeeds, because the developer usually wants to see the effect. Stay on Settings, with the problems shown inline, when something can't be saved (for example a repository name in the wrong format) or a credential fails validation. The save that completes setup also goes to the list, which then shows the [first-sync state](#empty-loading-and-first-sync-states).

NEW: approved

---

## Sign-in

Figma: [Sign in](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2978)

- **AUTH-1** Every Gitilizer feature must require sign-in.
- **AUTH-2** The developer must be able to sign in with Google or with GitHub ("Continue with Google", "Continue with GitHub"). The design must allow more providers to be added later.
- **AUTH-3** The first successful sign-in must create a Gitilizer account.
- **AUTH-4** The sign-in page must show the product introduction (headline, description and a static preview of the list), the sign-in buttons, the "Sign in first. Connect your tools next." explanation and the [footer](#footer). It has no app bar.
- **AUTH-5** Signing in with GitHub must not give Gitilizer access to the developer's items. Scanning always uses the PAT from Settings. (Settings says: "App sign-in does not replace this token.")
- **AUTH-6** The account's display name, email and avatar must come from the sign-in provider.
- **AUTH-7** Each sign-in provider account is a separate Gitilizer account. A person who signs in with Google one day and GitHub the next has two accounts, each with its own credentials, settings and list, even if both providers report the same email address.
- **AUTH-8** A session must last 30 days and be extended each time it is used, so a developer who visits at least once every 30 days stays signed in.

> **TODO(double check) · [Q-11](#q-11):** Session length is decided (`AUTH-8`). To your question: Google and GitHub don't limit it. They only confirm who the developer is at sign-in; after that, Gitilizer's own session cookie decides how long the developer stays signed in, and Gitilizer doesn't keep the provider's tokens. (So removing Gitilizer's access in Google or GitHub doesn't sign the developer out of Gitilizer.)
>
> Still open is what "Log out" ends. A developer may be signed in on several browsers or devices at once, for example a work laptop and a home desktop. "Log out ends only the current browser's session" means logging out on the laptop leaves the desktop signed in. The alternative is that "Log out" signs the developer out everywhere. Suggestion: the current browser only, which is what most sites do; deleting the account (`SET-17`) still ends every session.

NEW: yes, should only log out of the current browser session.

> **TODO · [Q-10](#q-10):** No design for failed sign-in (the developer cancels, the provider returns an error, the browser blocks the pop-up).

---

## Footer

Figma: [Shared / Footer](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-346)

- **FOOT-1** Every page, including the sign-in page, must show the footer.
- **FOOT-2** The footer must show the tagline "Less triage. More shipping." and two links, both opening in a new tab:
  - "Documentation": the user documentation, hosted in the GitHub repository (for example `https://github.com/brianquinlan/gitilizer/blob/main/docs/user-guide.md`; the exact path is set when the documentation is written);
  - "GitHub": the project's GitHub page, [github.com/brianquinlan/gitilizer](https://github.com/brianquinlan/gitilizer), which is also the project's landing page.
- **FOOT-3** The user documentation must exist at launch. At least, it must explain how to create a PAT with the right permissions ([Q-40](#q-40)) and a Gemini API key, and what each [notification](#catalogue) means.

---

## App bar

Figma: [Shared / App bar](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-323)

- **BAR-1** Every page after sign-in must show the app bar.
- **BAR-2** The app bar must show, from left to right: the Gitilizer symbol and wordmark (a link to the Prioritized list, `NAV-7`), the [notification bell](#bell) and the [account menu](#account-menu) avatar.

---

## Account menu

Figma: [Profile dropdown](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-327), a layer inside [Shared / App bar](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-323)

- **ACCT-1** The avatar must be the image from the sign-in provider. If the provider has no image, show the developer's initials on a colored circle, as in Figma ("MC").
- **ACCT-2** Clicking the avatar must open a menu showing the developer's full name and email, a "Settings" item and a "Log out" item.
- **ACCT-3** "Settings" must open the [Settings](#settings) page. "Log out" must end the session and show the sign-in page.

> **TODO · [Q-12](#q-12):** The menu exists in Figma only as a layer that the app bar clips, so its open state is not visible in any frame. It also needs closing behavior (click outside, Esc). Settings also has a "Sign out ↗" link with an external-link arrow; the menu says "Log out". Suggestion: use "Log out" everywhere, without the arrow.

NEW: I added "Account menu open" in Figma with the correct naming and icons for the menu labels. Use "Sign out" everywhere. Change figma if needed.


---

## Notifications

Notifications tell the developer about problems that stop Gitilizer from working fully, and how to fix them. There are two severities:

- an **error** is a problem the developer needs to fix, or one that has stopped Gitilizer from working for a long time;
- a **warning** is a problem that will probably fix itself, or one that is coming but hasn't happened yet (a PAT about to expire).

### Bell

Figma: [Shared / Notification bell](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=215-1375). Present [Notifications · Active error condition](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=200-2604) to see the bell swing.

- **NOTIF-1** The bell must always be visible in the app bar.
- **NOTIF-2** With no active notifications, the bell must use the **Idle** state: a grey outline.
- **NOTIF-3** With one or more active errors, the bell must use the **Error (animated)** state: a filled red bell (#B74439) that swings. The swing is 14° → −11° → 7° → −4° → 1.5° → 0°, clockwise first, 0.15 s per step with ease in and out (0.9 s of motion). It pivots on the point x 9, y 1.5 in the 18 × 18 icon frame (the top of the bell glyph). The first swing starts 0.3 s after the error state appears, and then repeats every 5 s.
- **NOTIF-4** The bell must use the **Error (no motion)** state (red, still) while the popover is open and whenever the operating system asks for reduced motion.
- **NOTIF-5** With warnings but no errors, the bell must use the **Warning** state: a filled amber bell (#D4A017) that doesn't swing. Errors take precedence over warnings.
- **NOTIF-17** Once the developer has opened the popover, the bell must stop swinging and stay in the **Error (no motion)** state while the same errors last. A new error starts the swing again. (This lets the developer stop the movement, as WCAG 2.2 success criterion 2.2.2, Pause, Stop, Hide, requires.)
- **NOTIF-18** The bell's accessible name must say what is active, for example "Notifications, 2 errors, 1 warning", or "Notifications, none".

### Popover

Figma: [Error being shown](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=200-2665), [Multiple active errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=223-1808), [Warning being shown](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=227-1824), [Resolved and empty](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=200-2743)

- **NOTIF-6** Clicking the bell must open a popover titled "Notifications" that lists every active notification. Clicking the bell again must close it.
- **NOTIF-7** With no active notifications, the popover must show "No notifications" and "No active errors need your attention."
- **NOTIF-8** Each notification must show:
  - the **summary**, which names the source, for example "GitHub connection";
  - when the problem was **first detected**, as a relative time, for example "2 min ago";
  - the **severity** label, "ERROR" or "WARNING";
  - the **heading**, which names the problem, for example "Your GitHub token has expired";
  - the **body**, which describes the consequence and how to fix it.
- **NOTIF-9** A mention of the Settings page in a body must be a link that opens Settings in the same tab, scrolled to the control that fixes the problem, with keyboard focus on it. For example, a GitHub token error focuses the personal access token field, and "Gitilizer can't access {repo}" focuses that repository's row. A mention of an external resource (for example githubstatus.com or the Google AI Studio status page) must be a link that opens in a new tab.
- **NOTIF-10** The developer can't dismiss notifications. A notification stays until its condition is resolved.
- **NOTIF-19** Notifications must be listed errors first, then warnings, and oldest first within each severity.
- **NOTIF-20** The popover must close on a click outside it, on Esc and when the developer follows a link in it. Keyboard focus must move into the popover when it opens, and return to the bell when it closes. The popover is at most 480 px tall and scrolls beyond that.

### Lifecycle

- **NOTIF-11** The backend must create a notification when it detects one of the conditions in the [catalogue](#catalogue), and store it for the developer with its first-detected time. Only one notification of each type (and, where the heading has one, each `{org}` or `{repo}`) can be active at a time.
- **NOTIF-12** "Can't connect to Gitilizer" is the exception. The web app must detect it and show it itself, because the backend can't be reached.
- **NOTIF-13** A notification must be removed as soon as the developer has plausibly fixed the problem. For example, saving a new PAT must clear every PAT-related notification at once. If the problem comes back with the new PAT, the notification is shown again with a new first-detected time.
- **NOTIF-14** A notification whose condition clears without the developer doing anything (a rate limit resets, GitHub recovers) must be removed when the backend next observes that the condition is gone.
- **NOTIF-15** The web app must update the bell and the popover without a page reload when notifications are added or removed.
- **NOTIF-16** Before setup is complete, no notification is shown for a missing PAT or Gemini API key, because Warm Welcome covers that case. After setup, a missing credential is an error ("No GitHub token is set" or "No Gemini API key is set"). Settings has no way to remove a saved credential, only to replace it, so today this can happen only through a fault.
- **NOTIF-21** Short-lived problems (rows marked "short-lived" in the catalogue: rate limits, "isn't responding", "limiting requests") often fix themselves after a retry. Gitilizer must retry them without telling the developer for 15 minutes, and then show them as **warnings**. The first-detected time is when the problem started, not when the warning appeared. If one lasts long enough to stop the list updating, "Your issues haven't updated since {time}" (an error, after 3 hours) covers it.
- **NOTIF-22** The PAT expiry warning must first appear 7 days before the PAT expires. Its body counts down the days ("will expire in 3 days", as in Figma's example).

### Catalogue

`{braces}` are placeholders. Times are shown in the developer's local time zone.

| Severity | Summary | Heading | Consequence and fix | Detected when | Clears when |
|---|---|---|---|---|---|
| Error | GitHub connection | Your GitHub token has expired | Issue scanning is paused. Replace your personal access token in Settings. | GitHub returns 401 after the expiry date that GitHub sent in the `GitHub-Authentication-Token-Expiration` header of earlier responses. | A new PAT is saved. |
| Error | GitHub connection | Your GitHub token isn't valid | Issue scanning is paused. The token may have been revoked, deleted or mistyped. Replace your personal access token in Settings. | Any other 401, or GitHub's temporary 403 after repeated failed authentication. | A new PAT is saved. |
| Error | GitHub connection | {org} doesn't allow this type of token | Issues and PRs from {org} are missing from your list. {org} blocks {classic / fine-grained} personal access tokens. Create the other type of token, or ask an owner of {org} to allow this one. | 403 whose message says the organization "forbids access via a personal access token (classic)" or "…with fine-grained permissions". | A new PAT is saved, or a request to {org} succeeds. |
| Error | GitHub connection | Your GitHub token can't read {permission} | Some of your issues and PRs can't be read, so your list may be incomplete. Give the token read access to {permission}, or create a new token and add it in Settings. The documentation lists the permissions Gitilizer needs. | 403 "Resource not accessible by personal access token"; the `X-Accepted-GitHub-Permissions` header names the permission. | A new PAT is saved, or a request that needs {permission} succeeds. |
| Error | GitHub connection | Your token isn't authorized for {org} | Issues and PRs from {org} are missing from your list. {org} uses single sign-on, so the token must be authorized for it. Authorize it in your GitHub token settings, then choose Sync now. | 403 with an `X-GitHub-SSO` header, or `X-GitHub-SSO: partial-results` on a search. | A new PAT is saved, or a request to {org} succeeds. |
| Error | GitHub connection | GitHub sent an unexpected response | Your list may be missing recent changes. Gitilizer keeps retrying automatically. If this continues, report it using the GitHub link at the bottom of the page. | Any other 4xx, a GraphQL `errors` array, or a response that can't be parsed, after retries. | A scan succeeds. |
| Warning (short-lived) | GitHub connection | GitHub's rate limit has been reached | Issue scanning is paused until {time}, when GitHub resets the limit, and then resumes automatically. Other tools that use the same token count toward the same limit. | 403 or 429 with `x-ratelimit-remaining: 0`, or a secondary rate limit message, for more than 15 minutes (`NOTIF-21`). | A GitHub request succeeds. |
| Warning (short-lived) | GitHub connection | GitHub isn't responding | Issue scanning is paused. Gitilizer keeps retrying automatically. If this continues, check [githubstatus.com](https://www.githubstatus.com). | 5xx responses, timeouts or connection failures that continue after retries for more than 15 minutes (`NOTIF-21`). | A scan succeeds. |
| Error | Additional repositories | Gitilizer can't access {repo} | Issues and PRs from {repo} are missing from your list. Check the name in Settings, or give your token access to {repo}. | 404 on `GET /repos/{repo}`, or 422 on a search that uses `repo:`. | The repository is removed in Settings, a new PAT is saved, or a request to {repo} succeeds. |
| Error | Gemini connection | Your Gemini API key isn't valid | New and changed issues aren't being ranked. Create a new key in Google AI Studio and add it in Settings. | 400 `API_KEY_INVALID`, or 401. | A new key is saved. |
| Error | Gemini connection | Google has disabled your Gemini API key | Google reported the key as leaked, so it no longer works. New and changed issues aren't being ranked. Create a new key in Google AI Studio and add it in Settings. | 403 "Your API key was reported as leaked". | A new key is saved. |
| Error | Gemini connection | Your Gemini API key can't use the Gemini API | New and changed issues aren't being ranked. The key may be restricted to other Google APIs, or its project may not allow the Gemini API. Create a new key in Google AI Studio and add it in Settings. | Any other 403 `PERMISSION_DENIED`. | A new key is saved, or a Gemini request succeeds. |
| Error | Gemini connection | Your Gemini credits have run out | New and changed issues aren't being ranked. Add credits or turn on auto-reload in Google AI Studio. | 402. | A Gemini request succeeds, or a new key is saved. |
| Error | Gemini connection | Your Gemini project needs billing | New and changed issues aren't being ranked. The key's Google Cloud project needs a working billing account, or has a past-due balance. Fix billing in the Google Cloud console. | 400 `FAILED_PRECONDITION` about billing, or 403 for an unpaid balance. | A Gemini request succeeds, or a new key is saved. |
| Error | Gemini connection | Your Gemini daily quota is used up | New and changed issues won't be ranked until the quota resets at {time}, and then ranking resumes automatically. To avoid this, turn on billing or ask Google for a higher quota. | 429 for a per-day quota. | A Gemini request succeeds. |
| Warning (short-lived) | Gemini connection | Gemini is limiting requests from your key | Ranking is slower than usual and catches up automatically. Other apps that use this key count toward the same limit. | 429 for a per-minute limit, for more than 15 minutes (`NOTIF-21`). | Gemini requests succeed without 429s for 15 minutes. |
| Warning (short-lived) | Gemini connection | Gemini isn't responding | New and changed issues aren't being ranked. Gitilizer keeps retrying automatically. If this continues, check the [Google AI Studio status page](https://aistudio.google.com/status). | 500, 503 or 504 that continue after retries for more than 15 minutes (`NOTIF-21`). | A Gemini request succeeds. |
| Error | Gemini connection | The Gemini model Gitilizer uses isn't available | New and changed issues aren't being ranked. This is a problem with Gitilizer, not with your key. Report it using the GitHub link at the bottom of the page. | 404 `model_not_found`. | A Gemini request succeeds. |
| Error | Gemini connection | Gemini sent an unexpected response | New and changed issues may not be ranked. Gitilizer keeps retrying automatically. If this continues, report it using the GitHub link at the bottom of the page. | Any other Gemini error, after retries. | A Gemini request succeeds. |
| Error | Issue ranking | Your ranking prompt isn't working | Most new and changed issues couldn't be ranked with your custom prompt. Edit the prompt, or restore the default prompt in Settings. | A custom prompt is set and more than half of the items in a ranking run fail to produce valid output. | The prompt is changed, or a ranking run succeeds. |
| Warning | Issue ranking | Gitilizer couldn't rank {n} issues | These issues are shown without a rank. Gitilizer tries again when they change. | Individual items fail after retries (blocked response, output cut off, invalid output). See [Q-28](#q-28). | Every one of them is ranked or leaves the list. |
| Error | Gitilizer | Can't connect to Gitilizer | Your list won't update until the connection comes back. Check your internet connection. | The web app's requests to the Gitilizer API fail. Detected in the browser. | A request succeeds. |
| Error | Gitilizer | Gitilizer couldn't finish scanning | Your list may be missing recent changes. Gitilizer tries again at the next scan. If this continues, report it using the GitHub link at the bottom of the page. | The backend's own scan job fails for a reason other than GitHub. | A scan succeeds. |
| Error | Gitilizer | Your issues haven't updated since {time} | No scan has finished in 3 hours, so your list may be missing recent changes. Try Sync now. If this continues, report it using the GitHub link at the bottom of the page. | No scan has succeeded for 3 hours. This catches failures the other rows miss. | A scan succeeds. |
| Warning | GitHub connection | Your GitHub token will expire soon | Your GitHub personal access token will expire in {n} days. Create a new one and add it to Settings. | The stored expiry date is 7 days away or less (`NOTIF-22`). | A PAT with a later expiry date is saved. |

Not in the catalogue, by decision:

- "Some of your issues couldn't be loaded" (a search with more than 1,000 results). The list keeps only the 1,000 most recently updated items (`LIST-19`), so no search ever needs more than its first 1,000 results (`SCAN-1`).
- "There's no GitHub user named @{name}". Settings shows this next to the collaborator instead (`SET-19`).

> **TODO(double check) · [Q-19](#q-19):** You asked why "Your GitHub token belongs to @{login}" matters. It applies only to developers who sign in with GitHub. Gitilizer builds the list for the account that owns the PAT: "Assigned to you", "Created by you" and @-mentions all mean that account. If a developer signs in as @maya but pastes a token made by another account (a work account such as @maya-corp, or a bot), their list shows the other account's items, which looks like a bug. But it may also be exactly what they want. Suggestion: don't make it a notification. Instead, show the token's account in the Validate result, for example "Validated 2m ago · Reading GitHub as @maya-corp", so a mistake is visible where the token is entered.

NEW: Yes, do it that way.

---

## Warm Welcome

Figma: [Warm Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=70-475)

- **WEL-1** Warm Welcome must be shown under the conditions in [Which screen is shown](#which-screen-is-shown). It is therefore always the first screen after a developer's first sign-in.
- **WEL-2** It must show the app bar, the footer and a panel with the title "Welcome to your prioritized inbox", a short explanation that a Gemini API key and a GitHub personal access token are needed, and a "Go to Settings" button.
- **WEL-3** "Go to Settings" must open the Connections section of [Settings](#settings).
- **WEL-4** As soon as both credentials are saved, the developer must see the [first-sync state](#empty-loading-and-first-sync-states) of the Prioritized list the next time they open it.

---

## Prioritized list

Figma: [Issue inbox - Populated issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2562), [Issue inbox · No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-897), [Shared / Inbox layout](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-1000)

The Prioritized list is a table of the developer's open items in rank order, 25 per page, with controls above it for switching to the Icebox and starting a sync.

### Which items appear

- **LIST-1** An item must appear in the list if it is open, is not in an archived repository, and at least one of these is true:
  - the developer's review is requested on it personally (a request to a team the developer belongs to doesn't count; see [Non-goals](#non-goals));
  - the developer is assigned to it;
  - the developer is @-mentioned in its description or in a comment;
  - the developer created it;
  - the developer commented on it;
  - the item is in one of the developer's [additional repositories](#additional-repositories).
- **LIST-2** An item must not appear if the developer has moved it to the [Icebox](#icebox).
- **LIST-19** The list must hold at most 1,000 items: the 1,000 matching items that were most recently updated on GitHub. When an item outside the 1,000 is updated, it joins the list and the least recently updated item leaves it.
- **LIST-20** Draft PRs must be included. (The ranking agent should score them lower, `RANK-8`.)

> **TODO(double check) · [Q-65](#q-65):** You chose to include mentions of a team the developer belongs to (`@org/team`). Finding them needs the list of the developer's teams, and reading that list needs an extra token permission (organization "Members: read" for a fine-grained token, `read:org` for a classic one). That is the same cost that made team review requests worth leaving out. Suggestion: leave team mentions out too, with team reviews, so the token needs only read access to issues, pull requests and metadata. Mentions of the developer by name still count.

NEW: Yes, remove team mentions.

> **TODO(double check) · [Q-21](#q-21):** Not yet decided: items opened by bots (Dependabot, Renovate and the like). They can appear only through the rules above, mostly through additional repositories, where there can be many. Suggestion: include them, and let the ranking prompt, or a repository's prioritization prompt, score them down.

NEW: Yes.

> **TODO(double check) · [Q-66](#q-66):** The 1,000-item limit (`LIST-19`) raises three smaller questions. Do Icebox items count toward the 1,000 (suggestion: no; the limit applies to the Prioritized list)? Is the developer told when matching items are left out (suggestion: no notification; the count reads "1000 issues and PRs")? What does a row show when it leaves because of the limit (see [Q-30](#q-30); suggestion: no label, since the least recently updated item is almost never on the page being viewed)?

NEW: the limit only applies to the Prioritized list. No notification. I would suggest that the issue falls off the bottom of the page just like if it were moving to the next page.

### Columns

| Column | Content |
|---|---|
| Priority | The item's rank, 1 to N, never zero-padded ("1", "25", "1000"). The column fits four digits. |
| Issue | An icon for the type (the issue icon or the PR icon), the title as a link to the item on GitHub, and below it the type and number ("Issue #1842", "PR #731"), a dot and the inclusion reason. |
| Repository | `owner/name`, in the monospace style from Figma. |
| Modified | When the item last changed on GitHub (its `updated_at`, which includes new and edited comments), as a short relative time: "just now", "12m ago", "3h ago", "2d ago". |
| Actions | A "Move to icebox" button. |

- **LIST-3** The inclusion reason must be one of "Review requested", "Assigned to you", "@{handle}" for a mention (for example "@maya"; "@-mentioned" when the handle can't be determined), "Created by you", "Commented on by you", or, for an item in an additional repository, the repository's name (for example "northstar/web"). "CCed", "@mention" and "Interested repository" are not used.
- **LIST-21** An item can match several reasons; only one is shown. The order of precedence is: Review requested, @{handle}, Created by you, Commented on by you, repository name. "Assigned to you" is placed by [Q-67](#q-67).
- **LIST-4** The title link must open the item on GitHub, in a new tab, so the list keeps its place.
- **LIST-5** Relative times must update while the page is open, at least once a minute.
- **LIST-22** Relative times must follow these thresholds: under 1 minute "just now"; then minutes ("12m ago"), hours ("3h ago") and days ("2d ago"); after 30 days, the date ("Mar 4"). Hovering over a time must show the full date and time.
- **LIST-23** Titles and repository names must stay on one line. A title that doesn't fit is cut off at the end with "…". A repository name that doesn't fit is cut off at the **start** ("…le-cloud-dart"), because the owner, at the start, is usually the least useful part. Hovering must show the full text.
- **LIST-24** The agent's next action and reasoning (`RANK-2`) must not be shown.

> **TODO(double check) · [Q-67](#q-67):** Your order of precedence for inclusion reasons leaves out "Assigned to you", which `LIST-1` still includes and which Figma shows on many rows. Where does it go? Suggestion: second, after "Review requested". Also note that the repository-name label repeats the Repository column on the same row ("Issue #962 · northstar/web" next to "northstar/web"); Figma now shows this. Confirm that's intended.

NEW: Yes, make "Assigned to you" second. This is intended.

### Sorting the list

- **LIST-6** The table must be sortable by Priority (the default), Issue, Repository and Modified. The active column is shown in the accent color with an arrow.
- **LIST-7** Sorting by Issue sorts by **type**, not by title. Ascending order puts PRs before issues.
- **LIST-8** When sorting by Issue, Repository or Modified, ties must be broken by issue number, ascending.
- **LIST-9** The sort order must be stored on the account, separately for the Prioritized list and the Icebox, so it is kept between visits and follows the developer to other devices.
- **LIST-10** Sorting applies immediately and is never held back by the rules in [Live updates](#live-updates).
- **LIST-25** Clicking a column that isn't active must sort by it in its first direction: Priority with rank 1 first, Issue with PRs first, Repository A–Z, Modified newest first. Clicking the active column must reverse the direction.
- **LIST-26** Changing the sort must return to page 1.

### Pages

- **LIST-11** Each page must show 25 items.
- **LIST-12** Below the table there must be a "Previous" button (disabled on the first page), numbered page buttons, with the current page highlighted, and a "Next" button (disabled on the last page). When there isn't room for a button per page, show the first page, the last page, the current page and one page on each side of it, with "…" for each gap.
- **LIST-27** The left end of the pagination row must show the number of items, "{N} issues and PRs", in every state, including "0 issues and PRs" when the list is empty.
- **LIST-13** Changing pages applies immediately and is never held back by the rules in [Live updates](#live-updates).

### Empty, loading and first-sync states

- **LIST-14** If the developer has no items and at least one sync has finished, the table body must be replaced by "No issues to show 🎉" and "You can choose more repositories in the settings.", where "settings" opens Settings at Additional repositories, with focus on the "Add repository" field.
- **LIST-15** While the first sync is running, the table must be shown so that items can appear in it as they are ranked.

> **TODO · [Q-28](#q-28):** The first-sync state has no design, and an empty table with no message looks broken. Suggestion: show the column headings with three skeleton rows and the text "Scanning your issues and PRs…". Also undefined: where an item appears after it has been found but before it has been ranked (suggestion: it is not shown until ranked), and where an item that couldn't be ranked appears (suggestion: after all ranked items, newest first, with "–" in the Priority column).

NEW: "Issue index - Loading" in Figma has some UX. Can you animate the blur (either on that UX or on the "Animations" page). Items are not shown in the priority list until ranked. Fine to put items at the end if they can't be ranked for some reason (ranking failed). In that case there should be a warning in the notification area though, right?

### Sync now

Figma: [Shared / Sync now](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=279-8369)

- **LIST-16** A "Sync now" button must start a sync: a scan for new, changed and removed items, followed by ranking of only the new and changed items.
- **LIST-17** While any sync is in progress, whether the developer started it or it started automatically (`SCAN-5`), the button must show the **Syncing** state: its icon, in the accent color, turns clockwise once per second. With reduced motion, the icon is still and in the accent color.
- **LIST-28** The button must never be disabled. Choosing it while a sync is running joins that sync (`SCAN-4`). There is no minimum interval between manual syncs.

> **TODO(double check) · [Q-29](#q-29):** When does a sync count as finished, so the icon stops? Suggestion: when the scan has finished and every new and changed item has been ranked or has failed.

NEW: yes, go with the suggestion

### Moving an item to the Icebox

- **LIST-18** "Move to icebox" must move the item to the [Icebox](#icebox) immediately. The row leaves the list as described in `LIVE-15`, and the next item moves up so the page still has 25 rows.

> **TODO(double check) · [Q-30](#q-30):** You asked for more detail. When an item leaves the Prioritized list while the developer is looking at it, `LIVE-15` says its row first shows a short label for about a second and then collapses, so the developer sees *why* it went instead of a row silently vanishing. Figma's flow 5 shows this with the label "Closed". But items leave for several reasons, and the document only gives the label for one of them. The question is which words to show for each reason:
>
> | Why the item left | Suggested label |
> |---|---|
> | The issue was closed on GitHub | Closed |
> | The PR was merged | Merged |
> | The PR was closed without merging | Closed |
> | The developer chose "Move to icebox" | Moved to Icebox |
> | It no longer matches `LIST-1`: the developer was unassigned, a review request was withdrawn, its repository was archived or removed from additional repositories | No longer yours |
>
> The second question is about undo. Clicking "Move to icebox" by mistake takes the item away at once. Some apps show "Moved to Icebox · Undo" for a few seconds afterwards. Suggestion: no undo, because "Restore" in the Icebox does the same job.

NEW: yes, no restore. The suggested labels are fine.

---

## Live updates

Items change on GitHub all the time, so ranks change while the developer is looking at the list. These rules make changes easy to follow without being distracting. The [Live reorder prototype](#live-reorder-prototype) shows each case.

- **LIVE-1** When ranks change, the Prioritized list must update without a page reload. No notice, banner or status message is shown; the only feedback is the animations and the indicators in the affected rows.
- **LIVE-23** A ranked change must reach the screen within 5 seconds of ranking finishing, unless the rules in [When updates wait](#when-updates-wait) hold it.
- **LIVE-24** Bulk re-ranks, which change the rank of nearly every item at once, must not play as per-item animations. These are the first sync, a full re-rank after "Save and re-rank" (`SET-15`) and any scheduled re-rank of every item ([Q-48](#q-48)). The new order must be applied once, when the whole re-rank has finished, without row indicators. Changes caused by activity on GitHub keep the per-item animations below.

### Pages during updates

- **LIVE-2** A change in ranks must never change the page the developer is on, with one exception: if the current page no longer exists (for example, every item on the last page was closed), the developer is taken to the last page that still exists, without a notice. If there are no items at all, the [empty state](#empty-loading-and-first-sync-states) is shown.
- **LIVE-3** Every page except the last must always show 25 items. When an item leaves a page, the next item in order enters it, so items leave and arrive in pairs.

### When updates wait

- **LIVE-4** While the pointer is over the table, updates must be held until the pointer has been outside the table for 1 second.
- **LIVE-5** Updates must also be held while keyboard focus is inside the table, and for 1 second after the table is tapped on a touch device.
- **LIVE-6** Updates must be held while the browser tab is hidden or the Icebox is shown. They play when the developer returns to the list.
- **LIVE-7** The developer's own actions (Move to icebox, sorting, changing pages) must apply immediately and are never held.

### Order of updates

- **LIVE-8** Held updates must play one at a time, each finishing its animation before the next starts.
- **LIVE-9** If more than 5 updates are waiting, they must be applied together in a single animation.
- **LIVE-10** If the pointer returns to the table while updates are playing, the current update must finish and the rest must be held again.

### Animations when sorted by Priority

Each animation takes about 0.4 seconds.

- **LIVE-11** An item that is visible before and after the change must move quickly to its new position, and the rows it passes must slide up or down to make room.
- **LIVE-12** A visible item that moves to an earlier page must fade out as it moves quickly toward the top of the table.
- **LIVE-13** A visible item that moves to a later page must fade out as it moves quickly toward the bottom of the table.
- **LIVE-14** An item that becomes visible because of the change must expand into its new position.
- **LIVE-15** An item that leaves the list (closed, no longer relevant or moved to the Icebox) must briefly show a label such as "Closed" in its row, then collapse, and the rows below must slide up. See [Q-30](#q-30) for the labels.
- **LIVE-16** A new item must expand into its position.
- **LIVE-17** The rank numbers of all visible items must update to their new values.

### Row indicators

- **LIVE-18** An item whose rank changed must show how far it moved next to its rank ("↑5", "↓3", or "New" for a new item) and a light highlight, both for 3 seconds.

### Other sort orders

- **LIVE-19** When the table is sorted by Issue, Repository or Modified, a change that affects only the rank must update the rank number in place, with the row indicators, and the row must not move.
- **LIVE-20** A change that affects the sorted column (for example new activity while sorted by Modified) must follow the animation rules above.

### Accessibility of updates

- **LIVE-21** Screen readers must hear one announcement per group of updates (for example "3 issues changed rank"), not one per item.
- **LIVE-22** If the operating system asks for reduced motion, items must change in place with a quick cross-fade and no movement. The row indicators still appear.

---

## Icebox

Figma: [Icebox · Populated issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=178-5947), [Icebox - No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=190-2593), [Icebox / Issue row · Restore](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=180-1403)

The Icebox holds items the developer has decided to set aside. It works like the Prioritized list, with these differences.

- **ICE-1** The Icebox must show only items the developer moved there.
- **ICE-2** It must not have a Priority column.
- **ICE-3** The line under each title must show the type and number, then "Moved to Icebox by you · {relative time}".
- **ICE-4** The default sort must be Issue ascending: PRs first, then issues, each by number ascending.
- **ICE-5** The Actions column must have a "Restore" button that returns the item to the Prioritized list.
- **ICE-6** When an item in the Icebox changes on GitHub, it must be ranked again and returned to the Prioritized list automatically. [Q-35](#q-35) asks which changes count.
- **ICE-7** If the Icebox is empty, the table body must be replaced by "No issues in the Icebox".
- **ICE-8** Pages, sorting, the item count and "Sync now" must work as in the Prioritized list.
- **ICE-9** While the Icebox is shown, an item that leaves it (it returns to the list under `ICE-6`, or leaves under `ICE-11`) must use the leave animation in `LIVE-15`, without the holding rules in [When updates wait](#when-updates-wait).
- **ICE-10** A restored item must keep its last score. (An item that changed while in the Icebox will usually have returned to the list already, under `ICE-6`, and been ranked again.)
- **ICE-11** An item that would no longer be eligible for the Prioritized list must leave the Icebox automatically. That includes items that are closed or merged, items that no longer match `LIST-1`, items in a repository that has been archived, and items that were there only because of an additional repository the developer has removed.

> **TODO(double check) · [Q-35](#q-35):** You'd like to default to returning items from the Icebox, without letting bot comments bring them back. Your question was whether the agent should decide which changes matter, perhaps with a separate prompt. The options:
>
> 1. **A fixed rule, no agent.** Any change returns the item, except changes made only by the developer themselves or by bots (accounts of type `Bot`, or logins ending in `[bot]`). Cheap and predictable, with no Gemini call. A human's trivial change, such as a label edit, still brings the item back.
> 2. **The ranking agent decides, through its score.** This was the earlier suggestion. The agent already understands "I marked this not important at that time" (`thumbs_down_at`) and scores such an item 0 unless something important happened since. The item returns only if its new score is above a threshold, such as 0.1. No new prompt, but the decision is hidden inside a score, and it defaults to keeping items out rather than bringing them back.
> 3. **A separate significance prompt.** A short Gemini call asks only "is this change important enough to bring the item back?". The rule is clear, but it's a second prompt to write, evaluate and keep up to date, with its own set of labelled examples, and it adds a Gemini call per change.
>
> Suggestion: option 1, because it matches "default to moving things out" and costs nothing. Option 3 can be added later if trivial human changes turn out to bring too many items back.

NEW: Option 1 isn't great because it means that a developer comment like "This is a critical security issue, I'll work on it right away" doesn't move the item out of the icebox. I want to go with option 3. The prompt should default to moving the item out of the icebox.

---

## Settings

Figma: [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802), [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509)

Settings is one page. The left column has links to its sections (Connections, Additional repositories, Ranking prompt, Collaborators), the developer's account details ("Signed in with GitHub", "Sign out") and a Delete account panel. The main column has the numbered sections (01 Connections, 02 Additional repositories, 03 Ranking prompt, 04 Collaborators) and, at the bottom, two buttons: "Save changes" and "Save and re-rank".

> **TODO(double check) · [Q-69](#q-69):** Small differences in the new Settings design that need a decision or a Figma fix:
>
> - The note under "Save and re-rank" says "Agent quota". Everywhere else the developer's quota is called "Gemini quota". Suggestion: "Gemini quota".

NEW: fix it in Figma

> - The "Collaborators" heading has an empty grey badge where the other sections say "Required" or "Optional". Suggestion: "Optional".

NEW: fix it in Figma

> - The Collaborators link in the left column uses the same icon as Ranking prompt. Suggestion: a people icon.

NEW: fix it in Figma

> - The Delete account panel uses the "eye off" icon. Suggestion: a trash or warning icon.

NEW: fix it in Figma

> - The repository rows label the prioritization prompt "PRIORITIZE", and the field to add one is labeled "Prioritization Prompt". Suggestion: "Prioritization prompt" in both places, in sentence case like the other labels.

NEW: fix it in Figma

> - The second credential is titled "Model API key" and says "Gemini compares relevant issue context to determine the order of your full inbox", which describes ranking the whole list at once (see [Q-44](#q-44)). Suggestion: "Gemini API key", and "Gemini scores each issue and PR to decide its rank."

NEW: yes, fix it in Figma

>
> Already fixed in Figma: the left column's "Interested repositories" link (now "Additional repositories") and the typo "its complex" in the Delete account panel.

### Connections

Both credentials are required.

- **SET-1** The developer must be able to enter a Gemini API key and a GitHub personal access token. Each field is masked.
- **SET-2** Each credential must have a "Validate" button that checks it immediately. On success it shows when it was validated and a detail, for example "Validated 2m ago · Repository access confirmed".
- **SET-3** Each credential card must show a status: "Connected" when the saved credential works.
- **SET-4** "Get an API key (it's free!) ↗" must open Google AI Studio's API key page, and "Create a token (it's free!) ↗" must open GitHub's new-token page, both in a new tab.
- **SET-5** Saving a credential must clear the related notifications (`NOTIF-13`) and start a sync.
- **SET-6** For a PAT, the backend must record the expiry date from GitHub's `GitHub-Authentication-Token-Expiration` header, if it sends one, for the expiry warning.

> **TODO · [Q-38](#q-38):** Only the success state of Validate is designed. Missing: validating in progress, each failure (invalid, expired, missing permission, network error), the status chip for each state, and whether Save also validates (suggestion: yes; a credential that fails validation can still be saved, with an inline error).

> **TODO(double check) · [Q-58](#q-58):** `SET-2` doesn't say whether Validate checks the value just typed or the saved one. In Figma the button sits next to the field, which suggests checking a value before saving it. Suggestion: Validate checks the typed value without saving it, and re-checks the saved value when the field is empty. (Found while building the prototype.)

NEW: It should check the current value. The "Validate" button should be be disabled (for both Gemini and GitHub) when the field is empty.

> **TODO(double check) · [Q-37](#q-37):** Figma has an eye icon to show the masked value, but `PRIV-1` says saved credentials are never sent back to the browser. Suggestion: the eye shows only a value typed in this visit. A saved credential appears as dots and must be replaced, not edited.

NEW: Agreed. You also can't validate a saved credential (the button should be disabled) until it is replaced.

> **TODO · [Q-39](#q-39):** Which Gemini model is used, and can the developer choose it? Figma no longer names a model (it used to say "Gemini 2.5 Flash available"); the code uses `gemini-3.8-flash`. Suggestion: Gitilizer chooses the model, and Settings doesn't show it.

NEW: Yes, the UI should not show the model.

> **TODO · [Q-40](#q-40):** Which kinds of PAT are accepted, and with which permissions? You asked for the options. GitHub has two kinds of personal access token ([GitHub's comparison](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)):
>
> - **Fine-grained token.** Can be read-only: Gitilizer needs "Issues: read", "Pull requests: read" and "Metadata: read" (the last is always included). It always includes read access to every public repository. Its big limit is that each token belongs to **one** owner, either the developer's own account or one organization, so it reads private repositories of that owner only. A developer who works in private repositories of two organizations can't cover both with one token. Organizations can also require an owner to approve the token; until then it reads public repositories only. GitHub recommends this kind.
> - **Classic token.** With the `repo` scope it reads every repository the developer can access, in every organization, with one token. But `repo` also allows **writing** to all of them, and there is no read-only scope for private repositories. Organizations that use single sign-on require the token to be authorized for them. With no scopes, it reads public repositories only.
>
> Either kind can be blocked by an organization (the "{org} doesn't allow this type of token" error). Since team reviews and team mentions are out of scope ([Q-43](#q-43), [Q-65](#q-65)), neither kind needs organization permissions.
>
> Options:
>
> 1. **Accept both; recommend fine-grained.** The documentation explains when a classic `repo` token is needed (private repositories in more than one owner) and that Gitilizer only ever reads. Simple for developers in one organization; possible for everyone else.
> 2. **Fine-grained only.** Gitilizer never holds a token that can write. Developers who span several organizations see only one organization's private items.
> 3. **Several tokens per developer**, for example one fine-grained token per organization. Covers everyone read-only, but Settings, validation and notifications all have to handle a list of tokens.


I added a "Learn more" link to that section in Figma. It can be a link to documentation explaning what you just explained. Capture that idea in this PRD.

> Suggestion: option 1 for the first release, with option 3 as a later improvement if developers ask for it. Figma's guidance, "Grant read access to Issues, Pull requests and Metadata", describes only a fine-grained token, so it should also link to the documentation (`FOOT-3`).

NEW: yes, let's say that multiple tokens are out-of-scope initially. 

### Additional repositories

- **SET-7** The developer must be able to add a repository by typing `owner/name` and choosing "Add repository", and remove one with "Remove".
- **SET-8** Each repository must show whether the PAT can access it ("Access confirmed").
- **SET-9** Each repository may have a prioritization prompt: free text that tells the ranking agent what the developer cares about in it, for example "Security issues only". It is entered in the "Prioritization Prompt" field when adding the repository, and shown under the repository's name. The agent receives it as a note on that repository.

> **TODO · [Q-41](#q-41):** Figma now shows the prioritization prompt. Still undefined: how a saved repository's prioritization prompt is edited or added later (there is no control for it; suggestion: click the text, or "Add a prioritization prompt" on a row without one, to edit it in place); the other access states ("Checking…", "Not found", "No access"); input validation (format, duplicates); whether pasting a GitHub URL works (suggestion: yes); the maximum number of repositories (suggestion: 25) and the maximum length of a prioritization prompt (suggestion: 500 characters).

> **TODO(double check) · [Q-57](#q-57):** The new name, "Additional repositories", and its description ("Follow repositories beyond your assigned, created and @mention issues") say "keep an eye on these". The default ranking prompt (`prompts/v4.md`) still treats them as repositories the developer is "responsible for", in which they are "the default reviewer" for unreviewed PRs, and scores their items higher. A developer who adds a busy repository just to follow it will see many review items ranked highly. Suggestion: "keep an eye on". Change the agent's "About me" wording and the default prompt to match, and measure the change with the evaluation harness (`RANK-7`). A developer who is responsible for a repository can say so in its prioritization prompt.

### Ranking prompt

- **SET-11** The page must show the current ranking prompt in an editor. With no custom prompt, it shows the default prompt.
- **SET-12** The developer can edit the prompt. When the prompt differs from the default, a "Restore default" control must be shown; it replaces the text with the default.
- **SET-13** The custom prompt replaces only the instructions part of what the agent receives. Gitilizer always adds the "About me" block (login, additional repositories with their prioritization prompts, and collaborators) and the output format, as in `system_instruction()` in `gitilizer/prioritizer.py`. These additions are not shown in or editable from Settings.

> **TODO(double check) · [Q-44](#q-44):** The prompt text in Figma is now a placeholder ("The highest priority issues are related to cat memes."). Still undefined: the section description still says "The agent compares titles, descriptions, labels, comments and reviews across the full list—not isolated scores", but the agent scores each item on its own. Suggestion: "The agent reads each issue's title, description, labels, comments and reviews and gives it a score." Also undefined: whether the default prompt is `prompts/v4.md` (suggestion: yes), the maximum prompt length (suggestion: 20,000 characters), and whether a developer who never edited the prompt gets new defaults automatically (suggestion: yes).

NEW: Update figma to your proposed text. Yes on v4.md for now. Yes on the max length and automatically getting new prompts. Do we need some UX for showing errors (e.g. for >20K chars). Also errors for duplicate repo names in the "Additional repositories" UX.

### Collaborators

- **SET-10** The developer must be able to keep a list of GitHub usernames whose items and comments should get a higher score. The agent receives them as "my usual collaborators".
- **SET-18** The developer adds a collaborator by typing a username in "Add collaborator" and choosing "Add collaborator", and removes one with "Remove". Adding doesn't check that the user exists.
- **SET-19** Each collaborator must show their GitHub avatar and username. If GitHub says the user doesn't exist, an error icon is shown in place of the avatar (as for "priyapatel" in Figma). If GitHub can't be reached, a generic avatar is shown, without an error.

> **TODO · [Q-42](#q-42):** Still undefined: the generic avatar for a temporary GitHub failure isn't drawn; how the developer learns what the error icon means (suggestion: hovering shows "There's no GitHub user named priyapatel"); input validation (an "@" is removed, duplicates are rejected); and the maximum number of collaborators (suggestion: 50).

NEW: yes to all.

### Saving

- **SET-14** Changes must take effect only when the developer chooses "Save changes" or "Save and re-rank". There is no "Cancel".
- **SET-15** "Save changes" must save without re-ranking: items already ranked keep their scores until they change on GitHub. New items, such as those from a newly added repository, are ranked as usual. "Save and re-rank" must save and then re-rank every item (a full re-rank, shown as in `LIVE-24`). Each button has the explanatory note shown in Figma next to it.

> **TODO · [Q-45](#q-45):** The two save buttons replace "Cancel" and the item-count estimate. Still undefined: whether the buttons also save credentials typed in Connections (suggestion: yes); what happens when the developer leaves the page with unsaved changes, now that there is no Cancel (suggestion: ask whether to leave); and whether to show how much a full re-rank costs (suggestion: add the count to the note, for example "Re-ranks 340 issues"). Note also that after "Save changes" with a new ranking prompt, items scored under the old and new prompts sit side by side in one list until they change. That is the trade-off the developer chose; a daily re-rank ([Q-48](#q-48)) would remove it within a day, at a cost in quota.

NEW: I added the cancel button back. The save buttons save everything in the settings page. Yes for the prompt when navigating away with unsaved changes. Don't add the issue count for re-rank.

### Account

- **SET-16** The account panel must show the developer's name, email, sign-in provider and a "Sign out" link (see [Q-12](#q-12) for naming).
- **SET-17** The developer must be able to delete their Gitilizer account from the Delete account panel in the left column, which explains that deleting is permanent. Choosing "Delete account" must open a confirmation dialog in which the developer types "delete" before anything is deleted. Deleting the account must delete all data about the developer (see [Data and privacy](#data-and-privacy)), end all their sessions and show the sign-in page.

> **TODO · [Q-46](#q-46):** The confirmation dialog is approved but not drawn in Figma. Also undefined: whether deletion is immediate, and how long backups keep the data (suggestion: immediate, and removed from backups within 30 days).

NEW: Deletion is immediate. Instead of the dialog that forces the user to enter "DELETE", a simple alert should be enough (since accounts have very little state).

---

## Scanning and ranking

### Finding items

- **SCAN-0** Scanning and ranking must continue while no browser is open, so the list is up to date when the developer comes back.
- **SCAN-1** A scan must find every open item that matches `LIST-1`, reading GitHub with the developer's PAT, and keep the 1,000 most recently updated (`LIST-19`). Each GitHub search must be sorted by most recently updated and needs only its first 1,000 results: any item among the developer's 1,000 most recently updated is also among the first 1,000 results of every search it matches. So searches never need to be split, even when GitHub reports more than 1,000 results.
- **SCAN-2** A scan must find items that have changed since the last scan, and items that no longer match (closed, merged, unassigned, a repository archived or removed). Items that no longer match leave the list as in `LIVE-15`, and leave the Icebox as in `ICE-11`.
- **SCAN-3** A scan must collect what the ranking agent needs to judge each new or changed item: the item, its comments, timeline and reviews, and the PRs and issues it links to.
- **SCAN-4** Two scans for the same developer must never run at the same time. A sync requested while one is running joins it.

### When scans run

- **SCAN-5** The backend must scan a developer's items:
  - when the web app asks for it (Sync now, and when settings are saved);
  - every 5 minutes while the app is visible in at least one of the developer's browser tabs;
  - every 30 minutes while the app is open in at least one tab but hidden in all of them;
  - every 2 hours otherwise.
- **SCAN-6** When the app becomes visible and the last scan finished more than 5 minutes ago, a scan must start immediately.

> **TODO(double check) · [Q-47](#q-47):** "Every 2 hours otherwise" applies to every account forever, which at scale means scanning for developers who stopped using Gitilizer long ago. Suggestion: stop background scans after 14 days without a visit, and scan on the next visit.

NEW How about every 2 hours for accounts accessed in the last week, otherwise scan on next visit.

### Ranking

- **RANK-1** Ranking must use the existing ranking agent, with the developer's ranking prompt (or the default), their settings and the item's context, and the developer's Gemini API key. Each item is scored on its own, so a change to one item re-scores only that item. (The design doc has the details.)
- **RANK-2** For each item the agent returns a score (named `priority` in its output, 0.0 to 1.0), whether the item is actionable, a one-line next action and its reasoning. All four must be stored, although only the score is used in the interface (`LIST-24`).
- **RANK-3** Ranks must come from sorting items by score, highest first. Two items must never share a rank.
- **RANK-4** The agent should give items distinct scores. Ties must be broken by most recent activity, then by repository and number, so the order is always the same for the same data.
- **RANK-5** An item must be ranked again when it is new or has changed on GitHub (its `updated_at` is later than when it was last ranked), and all items must be ranked again when the developer chooses "Save and re-rank" (`SET-15`).
- **RANK-6** Short-lived Gemini failures must be retried automatically. An item that still can't be ranked is handled as in [Q-28](#q-28).
- **RANK-7** Changes to the default prompt or model should be measured with the evaluation harness before they ship.
- **RANK-8** The default prompt should score a draft PR lower than the same PR ready for review. (`prompts/v4.md` already scores the developer's own drafts low; extend that to other people's drafts, and measure it as in `RANK-7`.)

> **TODO · [Q-48](#q-48):** The default prompt makes scores depend on time ("let it sink as it ages", "after a week of silence…"), but `RANK-5` only re-ranks items that change. An item nobody touches keeps the score it had on the day it was last ranked. Now that "Save changes" saves a new prompt without re-ranking, old scores can also come from an old prompt. Suggestion: also re-rank every item at least once every 24 hours.

NEW: rerank at least every 24 hours


> **TODO(double check) · [Q-49](#q-49):** An item's score depends on related items (for example, an issue drops when a PR that fixes it is opened), but a change to the related item doesn't change the issue's `updated_at`. Suggestion: when a scan sees a change to an item, also re-rank the items in the developer's list that it links to.

NEW: yes

> **TODO(double check) · [Q-51](#q-51):** Undefined: how many Gemini calls run at once for one developer (suggestion: 4, to stay under free-tier per-minute limits) and which thinking level is used (suggestion: the model's default, until the evaluation harness shows a better one).

NEW: use the default linking limit. 4 simultaneous requests.

> **TODO · [Q-63](#q-63):** Ranking makes one Gemini call per item, so a first sync, or a full re-rank, can make up to 1,000 calls (`LIST-19`) on the developer's key within minutes. Google sets free-tier limits per Google Cloud project, varies them by model, shows them only in AI Studio and resets daily limits at midnight Pacific time. A free-tier developer may therefore use up their daily quota on their first day and see "Your Gemini daily quota is used up". (Full re-ranks after a settings change are now the developer's choice, through "Save and re-rank", which helps.) Undefined: whether Gitilizer must work on the free tier; the order items are ranked in when quota runs short (suggestion: most recently updated first, so the top of the list fills in first); and whether to score several items per call to save requests (this needs measuring with the evaluation harness).

NEW: Gitilizer must work on the free tier. Maybe, if the user is out of quota, we should display a warning indicating issues will not be ranked until they have more quota - we can show how long that will be if we know.

> **TODO(double check) · [Q-50](#q-50):** `RANK-4` follows the code (recency, then number). The Google Doc doesn't define the tie-break for the Priority sort. Confirm.

---

## Data and privacy

Gitilizer keeps:

| Data | Notes |
|---|---|
| Account | Sign-in provider and provider user ID, name, email, avatar URL. |
| Credentials | GitHub PAT (with its expiry date, if known) and Gemini API key. |
| Settings | Additional repositories with their prioritization prompts, collaborators, custom ranking prompt, sort preferences. |
| Item data | The GitHub data needed to rank and show each item. |
| Item state | For each developer and item: inclusion reasons, score, rank, the agent's output, when it was last ranked, and whether and when it was moved to the Icebox. |
| Notifications | Active notifications with their first-detected time. |

- **PRIV-0** Gitilizer must read GitHub only with the developer's PAT and call Gemini only with the developer's API key. Gitilizer's own credentials are used only for sign-in.
- **PRIV-1** Credentials must be encrypted at rest, must never be sent back to the browser after they are saved, must never be written to logs and must never be included in a ranking prompt.
- **PRIV-2** Only the context of the developer's own items may be sent to Gemini, using the developer's own key.
- **PRIV-3** Deleting an account (`SET-17`) must delete all of the data above for that developer. Cached item data shared with other developers may be kept only while another developer still needs it.

> **TODO(double check) · [Q-68](#q-68):** The new Settings design no longer has the privacy note ("Only relevant issue context is sent to your chosen model for ranking.") that this section used to quote. Was that on purpose? [Q-52](#q-52) also suggests telling developers about Google's free-tier data use. Suggestion: one short note under the Gemini API key covering both: "Gitilizer sends Gemini only the issues and PRs it ranks for you. On Gemini's free tier, Google may use what it receives to improve its products (link to Google's terms)."

> **TODO · [Q-52](#q-52):** How long is item data kept after an item leaves a developer's list? Suggestion: 30 days. Also, Google's terms allow it to use content sent through free-tier Gemini keys to improve its products. Developers with private repositories may need to be told. Suggestion: a sentence in the Connections section with a link to Google's terms (see [Q-68](#q-68)).

---

## Non-functional requirements

### Platform and budget

- **PLAT-1** The source code and documentation must be hosted on GitHub ([github.com/brianquinlan/gitilizer](https://github.com/brianquinlan/gitilizer)).
- **PLAT-2** The application must run on Google Cloud.
- **PLAT-3** It must perform best for developers in North America and Western Europe.
- **PLAT-4** Running costs must fit within US$200 a month. This doesn't include developers' own GitHub and Gemini usage, which uses their own credentials.
- **PLAT-5** The application must be served at `https://gitilizer.com`.

### Scale

- **NFR-1** The system must support at least 10,000 developers using the application at the same time without scaling or performance problems.

> **TODO · [Q-2](#q-2):** "Using the application at the same time" needs a definition, plus sizing assumptions for the design doc. Suggestion: 10,000 developers with the app visible at once, out of up to 100,000 accounts, with up to 1,000 items each (`LIST-19`). At one scan every 5 minutes, that is about 33 scans per second. Each developer's scan uses their own GitHub and Gemini limits, so the load that Gitilizer itself must handle is mainly scan jobs, database writes and live-update connections. The design doc must show that this fits the US$200 monthly budget (`PLAT-4`). If it doesn't, the scale target or the scan intervals in `SCAN-5` will have to change.

### Performance and availability

> **TODO · [Q-53](#q-53):** No targets are defined. Suggestion: the list is ready to use within 2 seconds of opening the app (p95); sorting and changing pages take under 100 ms; the API's availability target is 99.5% per month.

### Browsers and screen sizes

> **TODO · [Q-54](#q-54):** Figma has only 1440 px wide desktop frames, but the live-update rules mention touch devices. Undefined: supported browsers (suggestion: the latest two versions of Chrome, Edge, Firefox and Safari), the minimum supported width, and layouts for tablets and phones (suggestion: desktop and tablet widths down to 1024 px for the first release; narrower layouts need designs).

### Accessibility

- **NFR-2** Everything must be usable with a keyboard alone, with a visible focus indicator.
- **NFR-3** Motion must respect the operating system's reduced-motion setting (`NOTIF-4`, `LIST-17`, `LIVE-22`), and movement that repeats must stop once the developer has acknowledged it (`NOTIF-17`).
- **NFR-4** Updates must be announced to screen readers as in `LIVE-21`.

> **TODO(double check) · [Q-55](#q-55):** No accessibility standard is named. Suggestion: WCAG 2.2 level AA. (The answer to Q-61, `NOTIF-17`, already follows it.)

### Language, time and appearance

> **TODO(double check) · [Q-56](#q-56):** Suggestion: English only; times in the browser's time zone; light theme only (Figma has no dark designs).

### Security and operations

- **NFR-5** All traffic must use HTTPS.
- **NFR-6** The backend must record metrics for scan duration, ranking duration, GitHub and Gemini error rates by type, and notification counts by type, so operators can see problems before developers report them.

---

## Open questions

Each row matches a TODO in the document. Q-58 to Q-63 were found by building the prototype described in the [design doc](design.md); Q-64 to Q-69 came from the product owner's 2026-11-01 answers and the new Settings design. **Needed by** says which step can't finish until it's answered: **Figma** (a design is missing), **Design doc** (the architecture depends on it) or **Implementation** (it can be decided while building).

| ID | Area | Question | Suggested answer | Needed by |
|---|---|---|---|---|
| <a id="q-2"></a>Q-2 | Platform | What does "10,000 developers using the application at once" mean, and what are the sizing assumptions? | 10,000 with the app visible, up to 100,000 accounts, up to 1,000 items each. | Design doc |
| <a id="q-10"></a>Q-10 | Sign-in | What does failed sign-in look like? | An inline message above the buttons. | Figma |
| <a id="q-11"></a>Q-11 | Sign-in | Session length is decided (30 days). Does "Log out" end only this browser's session, or every session? | This browser only. | Design doc |
| <a id="q-12"></a>Q-12 | Account menu | The open menu isn't visible in any frame; how does it close; "Log out" or "Sign out"? | Draw the open state; close on outside click or Esc; "Log out" everywhere. | Figma |
| <a id="q-19"></a>Q-19 | Notifications | Should a PAT that belongs to a different GitHub account from the one used to sign in be flagged? | No notification; show the token's account in the Validate result. | Implementation |
| <a id="q-21"></a>Q-21 | List | Do items opened by bots appear? | Yes; let prompts score them down. | Design doc |
| <a id="q-28"></a>Q-28 | List | What does the first sync look like? Where do found-but-unranked items and items that failed to rank appear? | Skeleton rows with "Scanning your issues and PRs…"; unranked items hidden; failed items at the end with "–". | Figma |
| <a id="q-29"></a>Q-29 | List | When does a sync count as finished, so the Sync now icon stops? | When the scan has finished and every new and changed item has been ranked or has failed. | Implementation |
| <a id="q-30"></a>Q-30 | List | What label does a leaving row show for each reason, and is there an undo? | Closed, Merged, Moved to Icebox, No longer yours; no undo. | Implementation |
| <a id="q-35"></a>Q-35 | Icebox | Which changes bring an item back from the Icebox, and who decides? | Any change not made only by the developer or by bots; no agent involved. | Design doc |
| <a id="q-37"></a>Q-37 | Settings | What does the eye icon show if saved credentials never return to the browser? | Only a value typed in this visit. | Figma |
| <a id="q-38"></a>Q-38 | Settings | What do validation in progress, validation failures and the status chips look like, and does Save validate? | Design each state; Save validates and shows an inline error. | Figma |
| <a id="q-39"></a>Q-39 | Settings | Which Gemini model is used, and can the developer choose it? | Gitilizer chooses; Settings doesn't show it. | Design doc |
| <a id="q-40"></a>Q-40 | Settings | Which PAT types and permissions are supported? | Accept both kinds; recommend fine-grained read-only; document when a classic `repo` token is needed. | Design doc |
| <a id="q-41"></a>Q-41 | Settings | How is a saved repository's prioritization prompt edited, what are the other access states, how is input validated, and what are the limits? | Edit in place; design the states; accept URLs; 25 repositories, 500 characters. | Figma |
| <a id="q-42"></a>Q-42 | Settings | Generic avatar for GitHub failures, explaining the error icon, input validation and the maximum number of collaborators. | Draw the generic avatar; tooltip; strip "@", reject duplicates; 50. | Figma |
| <a id="q-44"></a>Q-44 | Settings | Should the section description match the pointwise agent? Is the default `prompts/v4.md`? What is the length limit, and do defaults update? | New description; yes; 20,000 characters; yes. | Figma |
| <a id="q-45"></a>Q-45 | Settings | Do the save buttons save credentials, what happens with unsaved changes, and is the re-rank cost shown? | Yes; confirm before leaving; add the item count to the note. | Figma |
| <a id="q-46"></a>Q-46 | Settings | Draw the approved confirmation dialog. How quickly is data removed? | Immediate, and gone from backups within 30 days. | Figma |
| <a id="q-47"></a>Q-47 | Scanning | Should background scans stop for inactive developers? | After 14 days without a visit. | Design doc |
| <a id="q-48"></a>Q-48 | Ranking | How do time-dependent scores stay current for items that don't change? | Re-rank every item at least daily. | Design doc |
| <a id="q-49"></a>Q-49 | Ranking | Should a change to a related item re-rank the items that link to it? | Yes. | Design doc |
| <a id="q-50"></a>Q-50 | Ranking | Is the tie-break for equal scores right? | Most recent activity, then repository and number. | Implementation |
| <a id="q-51"></a>Q-51 | Ranking | How many Gemini calls run at once per developer, and with which thinking level? | 4; the model's default. | Design doc |
| <a id="q-52"></a>Q-52 | Privacy | How long is item data kept, and should developers be told about Gemini free-tier data use? | 30 days; yes, in Connections. | Design doc |
| <a id="q-53"></a>Q-53 | Performance | What are the performance and availability targets? | 2 s to a usable list (p95); 100 ms sort and page; 99.5% monthly availability. | Design doc |
| <a id="q-54"></a>Q-54 | Platform | Which browsers and screen sizes are supported? | Latest two versions of Chrome, Edge, Firefox and Safari; 1024 px and wider. | Figma |
| <a id="q-55"></a>Q-55 | Accessibility | Which accessibility standard applies? | WCAG 2.2 AA. | Implementation |
| <a id="q-56"></a>Q-56 | Platform | Languages, time zones and themes? | English; browser time zone; light only. | Implementation |
| <a id="q-57"></a>Q-57 | Settings | Do additional repositories mean "keep an eye on" or "I'm responsible for"? The default prompt says the latter. | "Keep an eye on"; change the agent's wording and measure it. | Design doc |
| <a id="q-58"></a>Q-58 | Settings | Does Validate check the typed value without saving it? | Yes; with an empty field it re-checks the saved value. | Implementation |
| <a id="q-63"></a>Q-63 | Ranking | One Gemini call per item can exhaust a free-tier daily quota in one re-rank. Must the free tier work, and in what order are items ranked when quota runs short? | Rank the most recently updated first; measure several-items-per-call with the eval harness. | Design doc |
| <a id="q-64"></a>Q-64 | Navigation | Should "Save changes" and "Save and re-rank" return to the Prioritized list? | Yes when the save succeeds; stay on Settings when something fails. | Implementation |
| <a id="q-65"></a>Q-65 | List | Team mentions need an extra token permission to read the developer's teams. Include them? | No; leave them out with team reviews. | Design doc |
| <a id="q-66"></a>Q-66 | List | Do Icebox items count toward the 1,000-item limit, is the developer told about items left out, and what does a row show when it leaves because of the limit? | No; no; no label. | Implementation |
| <a id="q-67"></a>Q-67 | List | Where does "Assigned to you" go in the order of inclusion reasons? Is repeating the repository name intended? | Second, after "Review requested"; yes. | Implementation |
| <a id="q-68"></a>Q-68 | Privacy | Was the Settings privacy note removed on purpose? | Bring back one note under the Gemini key that also covers free-tier data use. | Figma |
| <a id="q-69"></a>Q-69 | Settings | Small copy and icon differences in the new Settings design. | As listed in the TODO. | Figma |

### Answered questions

| ID | Question | Decision | Where |
|---|---|---|---|
| <a id="q-1"></a>Q-1 | Hosting, repository and budget | "Costed" meant "hosted". Code and documentation are on GitHub at github.com/brianquinlan/gitilizer. The app runs on Google Cloud, performs best in North America and Western Europe, and costs at most US$200 a month. It is served at gitilizer.com. | `PLAT-1` to `PLAT-5` |
| <a id="q-3"></a>Q-3 | Success metrics | None: this is a hobby project. The owner needs total users, users who completed setup, and daily, weekly and monthly actives. | `METRIC-1`, `METRIC-2` |
| <a id="q-4"></a>Q-4 | Non-goals | Confirmed, plus models other than Gemini (the design should still allow them later). | [Non-goals](#non-goals) |
| <a id="q-5"></a>Q-5 | Footer URLs | "Documentation" opens the user documentation in the GitHub repository; "GitHub" opens the repository, which is the project's landing page. | `FOOT-2`, `FOOT-3` |
| <a id="q-6"></a>Q-6 | Routes | As suggested; moving between screens doesn't reload the page. | `NAV-3`, `NAV-4` |
| <a id="q-7"></a>Q-7 | Getting back to the list | The Gitilizer logo links to the Prioritized list. (Whether saving Settings also goes back is [Q-64](#q-64).) | `NAV-7` |
| <a id="q-8"></a>Q-8 | When Warm Welcome is shown | Until the developer has entered both credentials. After that, problems appear as error notifications on the Prioritized list. | `NAV-2` |
| <a id="q-9"></a>Q-9 | Google and GitHub sign-in for one person | Two separate accounts. | `AUTH-7` |
| <a id="q-13"></a>Q-13 | Hidden app bar layers | Leftovers. Deleted from Figma. | `BAR-2` |
| <a id="q-14"></a>Q-14 | Bell with only warnings | Amber, doesn't swing; errors take precedence. Figma's bell now has a "Warning" state. | `NOTIF-5` |
| <a id="q-15"></a>Q-15 | Bell's accessible name; popover closing, focus and height | As suggested. | `NOTIF-18`, `NOTIF-20` |
| <a id="q-16"></a>Q-16 | Order of notifications | Errors before warnings, oldest first. Figma already matches. | `NOTIF-19` |
| <a id="q-17"></a>Q-17 | Thresholds | Short-lived problems are retried for 15 minutes and then shown as warnings, not errors. Stale list after 3 hours. The PAT expiry warning first appears 7 days ahead. | `NOTIF-21`, `NOTIF-22`, [Catalogue](#catalogue) |
| <a id="q-18"></a>Q-18 | A missing credential after setup | Follows from Q-8: an error notification. | `NOTIF-16` |
| <a id="q-20"></a>Q-20 | Where a "Settings" link goes | Settings is one page; the link scrolls to the control that fixes the problem and focuses it. | `NOTIF-9`, `LIST-14` |
| <a id="q-22"></a>Q-22 | Which inclusion reason is shown | Review requested, @handle, Created by you, Commented on by you, repository name. "Interested repository" is now "additional repository", and its label is the repository's name. ("Assigned to you" is [Q-67](#q-67).) | `LIST-3`, `LIST-21` |
| <a id="q-23"></a>Q-23 | Title link; ranks of 100 or more | New tab. Ranks are never zero-padded; Figma updated. The Priority column already fits four digits. | `LIST-4`, [Columns](#columns) |
| <a id="q-24"></a>Q-24 | Relative times | Short, as suggested, with the full date and time on hover. | `LIST-22` |
| <a id="q-25"></a>Q-25 | Sorting | Click toggles; first directions as suggested; stored on the account per view; sorting returns to page 1. | `LIST-9`, `LIST-25`, `LIST-26` |
| <a id="q-26"></a>Q-26 | Many pages; item count | First, last, current ±1 with "…"; the count is always shown. Figma updated. | `LIST-12`, `LIST-27` |
| <a id="q-27"></a>Q-27 | Maximum list size | The 1,000 most recently updated items, kept up to date as items are updated. (Details in [Q-66](#q-66).) | `LIST-19`, `SCAN-1` |
| <a id="q-31"></a>Q-31 | Showing the agent's next action and reasoning | Not shown. | `LIST-24` |
| <a id="q-32"></a>Q-32 | Update latency | Within 5 seconds of ranking finishing. | `LIVE-23` |
| <a id="q-33"></a>Q-33 | How the Icebox updates | The leave animation, without holding rules. | `ICE-9` |
| <a id="q-34"></a>Q-34 | Where a restored item goes | It keeps its last score. | `ICE-10` |
| <a id="q-36"></a>Q-36 | Ineligible items in the Icebox | Removed automatically. | `ICE-11` |
| <a id="q-43"></a>Q-43 | Review teams | Out of scope for now; listed in non-goals to revisit. | [Non-goals](#non-goals) |
| <a id="q-59"></a>Q-59 | Long titles and repository names | One line with "…": at the end for titles, at the start for repository names. | `LIST-23` |
| <a id="q-60"></a>Q-60 | Bulk re-ranks | Applied once when finished, without row indicators. | `LIVE-24` |
| <a id="q-61"></a>Q-61 | A bell that swings for days | Stops once the popover has been opened; a new error starts it again. | `NOTIF-17` |
| <a id="q-62"></a>Q-62 | "N issues" includes PRs | "{N} issues and PRs". Figma updated. | `LIST-27` |

---

## Appendix: changes from the Google Doc version

- Restructured into numbered requirements with IDs, a glossary, Figma links for every screen and an open-questions table.
- Used one name for each screen: "Prompt for Settings" is now **Warm Welcome**, and "Issue index" / "The Prioritized Issue List" is now **Prioritized list** (the Figma frame is "Issue inbox").
- Followed Figma where the Google Doc differs, and listed each difference: the issue number is part of the Issue column instead of its own column; relative times are short ("2m ago"); "Issue" sorts by type, with PRs first.
- Added from Figma: the account menu contents, the notification anatomy and empty state, the bell's states and swing timing, the Settings layout, the Icebox subtitle and the "full re-ranking" rule.
- Added from the earlier review: @-mention labels show the handle, or "@-mentioned" when it is unknown.
- Added "Detected when" and "Clears when" columns to the notification catalogue, a warning row for PAT expiry and a list of detectable errors that aren't yet in it.
- Added scanning and ranking requirements based on the existing code in `gitilizer/`.
- Fixed the duplicated sentence in the notification example ("Issue scanning is paused. Issue scanning is paused.") and the typos "Gilitizer", "certaining", "addiction" (indication), "@-mentioed", "chose" and "next" (text).

### Second revision (2026-10-31)

- Folded in the product owner's answers to Q-1, Q-3, Q-4, Q-6 and Q-8 (and Q-18, which follows from Q-8), and moved them to [Answered questions](#answered-questions).
- Used "rank" for the position, "score" for the agent's number, and "Priority" only for the column and its sort order.
- Moved technical detail (the system diagram, the existing code and how scanning works) to the [design doc](design.md), leaving the product requirements here.
- Added Q-58 to Q-63, found by building an end-to-end prototype.

### Third revision (2026-11-01)

- Folded in the product owner's answers to 25 questions (Q-5, Q-7, Q-9, Q-13 to Q-17, Q-20, Q-22 to Q-27, Q-31 to Q-34, Q-36, Q-43, Q-59 to Q-62), and parts of 10 more (Q-11, Q-19, Q-21, Q-29, Q-41, Q-42, Q-44, Q-45, Q-46, Q-57), which stay open for what's left. New requirements: `PLAT-5`, `NAV-7`, `AUTH-7`, `AUTH-8`, `FOOT-3`, `NOTIF-17` to `NOTIF-22`, `LIST-19` to `LIST-28`, `LIVE-23`, `LIVE-24`, `ICE-9` to `ICE-11`, `SET-18`, `SET-19` and `RANK-8`.
- Gitilizer is served at gitilizer.com.
- Renamed "interested repositories" to **additional repositories**, and their filter to **prioritization prompt**, following the Figma design.
- Short-lived problems are now warnings shown after 15 minutes, and the warning bell doesn't swing.
- The list includes personal review requests and items the developer commented on, holds at most 1,000 items, and excludes archived repositories. Team review requests are a non-goal.
- Described the new Settings design: Additional repositories with prioritization prompts, Collaborators with avatars, Delete account, and "Save changes" / "Save and re-rank" in place of "Cancel" / "Save changes".
- Explained Q-11, Q-30, Q-35 and Q-40 in more detail, as asked, with options for Q-35 and Q-40.
- Added Q-64 to Q-69.
- Changed Figma: deleted the hidden "Destinations", "Connection status" and "User account" layers from the app bar; added a "Warning" state to the bell and used it in the warning frame; removed zero-padding from every rank, including on the Live reorder prototype page; replaced "Interested repository" labels with the repository's name; added "{N} issues and PRs" to the list and Icebox pagination rows; fixed "chose" and removed "to monitor" in the empty list; added the [Shared / Sync now](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=279-8369) component with a spinning Syncing state; renamed the Settings link to "Additional repositories"; fixed "its complex" in the Delete account panel.
