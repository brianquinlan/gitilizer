# Gitilizer product requirements

| | |
|---|---|
| **Status** | Draft for review |
| **Owner** | brian@sweetapp.com |
| **Last updated** | 2026-11-04 (rank reasoning popup; sync progress text; "Save and re-rank" counts as a sync; Gemini timeouts count as "isn't responding") |
| **Address** | [gitilizer.com](https://gitilizer.com) |
| **Design** | [Gitilizer Figma file](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=0-1) |
| **Next document** | [Design doc](DESIGN.md), then implementation |

## How to read this document

- Each requirement has an ID, such as `LIST-4`, so the design doc, code reviews and tests can refer to it.
- **Must** means required for launch. **Should** means expected unless the design doc gives a reason not to. **May** means optional.
- Figma links open the exact frame or component. Where this document and Figma disagree, this document wins, and the disagreement is listed in [Open questions](#open-questions).
- **TODO:** marks something the product owner needs to answer or confirm: missing information, or a suggested answer that the design doc relies on. Each one links to a row in [Open questions](#open-questions). Search for "TODO:" to find them all.
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
19. [Appendix: revision history](#appendix-revision-history)

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
- Showing the agent's next action for an item ([Q-31](#q-31)).
- Mentions of a GitHub team the developer belongs to (`@org/team`). Only mentions of the developer by name count ([Q-65](#q-65)).
- More than one GitHub token per developer, for example one per organization ([Q-40](#q-40)). Revisit if developers ask for it.
- Layouts for screens narrower than 1024 px, including phones, and touch input ([Q-54](#q-54)).
- Languages other than English, and a dark theme. Either may come later ([Q-56](#q-56)).

### Metrics

Gitilizer is a hobby project, so there are no success targets. The owner must still be able to see how it is used.

- **METRIC-1** The owner must be able to see, without writing queries, at least:
  - the total number of users (everyone who has ever signed in);
  - the number of users who have completed setup (entered both credentials, see [Which screen is shown](#which-screen-is-shown));
  - the number of active users per day, per week and per month, including for past days;
  - the number of accounts that have been deleted (`SET-17`), in total and per month.
- **METRIC-2** Metrics should use what Google Cloud already provides (for example Cloud Monitoring dashboards) rather than a custom admin screen.
- **METRIC-3** The owner must also be able to see the health of the system, without writing queries and including for past days: the latency of API calls (by endpoint, median and 95th percentile), how long the app takes to load and show a usable list in developers' browsers, the HTTP status codes returned for page loads and API calls, and the error rates in `NFR-6`.
- **METRIC-4** The owner must be alerted by email, without having to look at the dashboard, when gitilizer.com stops responding, when more than 5% of API calls fail for 10 minutes, or when no scan has finished for any developer in 30 minutes. Alerts should use Cloud Monitoring.

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
| Full re-rank | Ranking every item again, started by "Save and re-rank" in Settings, and once a day (`RANK-9`). |
| Icebox check | A short question to the agent, with its own prompt, asking whether a change to an item in the Icebox should bring it back (`ICE-6`). |
| Notification | An error or warning shown in the bell's popover. |
| PAT | A GitHub personal access token. |

---

## Reference material

### Figma frames

All links point to the [Gitilizer Figma file](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=0-1). The "Application UX" page holds the screens. The "Animations" page holds the animated flows for [Live updates](#live-updates) and the animated components (Sync now and the skeleton rows).

| Screen or element | Figma | Section |
|---|---|---|
| Sign-in page | [Sign in](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2978) | [Sign-in](#sign-in) |
| Sign-in page after a failed sign-in | [Sign in · Cancelled](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=304-1734), [Sign in · Error](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=306-1355) | [Failed sign-in](#failed-sign-in) |
| Footer | [Shared / Footer](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-346) | [Footer](#footer) |
| App bar | [Shared / App bar](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-323) | [App bar](#app-bar) |
| Account menu | [Account menu · Open](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=286-1722) | [Account menu](#account-menu) |
| Notification bell | [Shared / Notification bell](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=215-1375) (Idle, Error, Warning and the swing steps) | [Bell](#bell) |
| Bell with an active error | [Notifications · Active error condition](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=200-2604) | [Bell](#bell) |
| Popover with one error | [Notifications · Error being shown](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=200-2665) | [Popover](#popover) |
| Popover with several errors | [Notifications · Multiple active errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=223-1808) | [Popover](#popover) |
| Popover with a warning | [Notifications · Warning being shown](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=227-1824) | [Popover](#popover) |
| Popover with no notifications | [Notifications · Resolved and empty](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=200-2743) | [Popover](#popover) |
| Warm Welcome | [Warm Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=70-475) | [Warm Welcome](#warm-welcome) |
| Prioritized list | [Issue inbox - Populated issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2562) | [Prioritized list](#prioritized-list) |
| Prioritized list, empty | [Issue inbox · No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-897) | [Empty, loading and first-sync states](#empty-loading-and-first-sync-states) |
| Prioritized list, first sync | [Issue inbox · Loading](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=289-3689), using [Shared / Skeleton rows](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=301-1433) on the Animations page (present it to see the pulse) | [Empty, loading and first-sync states](#empty-loading-and-first-sync-states) |
| List layout component | [Shared / Inbox layout](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-1000) | [Prioritized list](#prioritized-list) |
| Rank reasoning popup | [Issue inbox · Rank reasoning](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=337-7443) | [Columns](#columns) |
| Sync now button | [Shared / Sync now](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=279-8369) on the Animations page (Idle and Syncing; present it to see the icon turn) | [Sync now](#sync-now) |
| Icebox | [Icebox · Populated issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=178-5947) | [Icebox](#icebox) |
| Icebox, empty | [Icebox - No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=190-2593) | [Icebox](#icebox) |
| Icebox row | [Icebox / Issue row · Restore](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=180-1403) | [Icebox](#icebox) |
| Settings | [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802), including Additional repositories, Collaborators, Delete account, and the save and cancel buttons | [Settings](#settings) |
| Settings with errors | [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237): a failed Validate, a duplicate repository, a prompt that's too long, a duplicate collaborator, and the save buttons disabled | [Saving](#saving) |

### Live reorder prototype

The [Animations](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=139-491) page shows how the Prioritized list changes when ranks change. Open it in Present mode and pick a flow; each flow plays on its own and loops. Flow 7 waits for you to move the pointer onto the table and off it again. The frames show 10 rows per page to keep them small; the behavior is the same at 25. The [How to play these flows](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=151-8151) note on that page has the details.

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

The source code and documentation are hosted on GitHub at [github.com/brianquinlan/gitilizer](https://github.com/brianquinlan/gitilizer). The repository already contains the ranking agent and its evaluation harness. How the application is built, including how it reuses them, is in the [design doc](DESIGN.md).

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
- **NAV-8** After a successful "Save changes" or "Save and re-rank", the developer must be taken to the Prioritized list. If something can't be saved (for example a prompt that's too long), they stay on Settings with the problems shown next to the fields (`SET-27`). Saving doesn't validate credentials (`SET-29`). The save that completes setup also goes to the list, which then shows the [first-sync state](#empty-loading-and-first-sync-states).
- **NAV-9** "Cancel" in Settings must discard unsaved changes and take the developer back to the Prioritized list. Under the rules in [Which screen is shown](#which-screen-is-shown), a developer who hasn't yet entered both credentials sees Warm Welcome instead, and the same applies after saving (`NAV-8`).

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
- **AUTH-9** Signing out must end only the current browser's session. Other browsers and devices where the developer is signed in stay signed in. Deleting the account (`SET-17`) ends every session.

Google and GitHub don't limit the session. They only confirm who the developer is at sign-in, and Gitilizer doesn't keep their tokens, so removing Gitilizer's access in Google or GitHub doesn't sign the developer out of Gitilizer.

### Failed sign-in

Figma: [Sign in · Cancelled](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=304-1734), [Sign in · Error](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=306-1355)

Signing in uses full-page redirects, not a pop-up. "Continue with Google" or "Continue with GitHub" takes the browser to the provider's own pages, and the provider sends it back to Gitilizer with either a one-time code or an error. Gitilizer's server then finishes the sign-in. A failure is therefore found either by the provider, which sends back an error code (for example `access_denied` when the developer cancels), or by Gitilizer's server while it finishes the sign-in.

- **AUTH-10** When a sign-in fails, Gitilizer must return the developer to the sign-in page with a message in a notice above the sign-in buttons, as in Figma. The message depends on what went wrong:

  | Category | When | Message |
  |---|---|---|
  | Cancelled | The developer cancelled or denied access on the provider's page (`access_denied`) | "Sign-in was cancelled. Choose an option below to try again." |
  | Provider unavailable | The provider reported a problem (`server_error`, `temporarily_unavailable`), or didn't respond when Gitilizer finished the sign-in | "Google isn't responding right now. Try again in a few minutes." ("GitHub" for GitHub) |
  | Expired | Gitilizer's security check failed: the sign-in took too long, was finished in another tab, or the browser blocked cookies | "Sign-in didn't finish. Try again, and make sure your browser allows cookies for gitilizer.com." |
  | Not allowed | Only in the development environment: the account isn't on its allowlist (`NFR-12`) | "This is Gitilizer's development site, and only invited accounts can sign in. Ask the owner for access." |
  | Gitilizer error | Anything else, including problems on Gitilizer's side and unexpected provider errors | "Something went wrong on our side. Try again. If it keeps happening, report it using the GitHub link below." |

- **AUTH-15** The "Cancelled" notice must be neutral (grey), because cancelling isn't an error. The other categories must use the same notice in red: the error color (#B74439) for the border and the text, on a light red background, as in [Sign in · Error](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=306-1355).
- **AUTH-11** The message must not include the provider's own error description, which is written for programmers and often missing. The server must log the provider's error code and description, and any error of its own, for the owner (`NFR-6`).
- **AUTH-12** The messages must not suggest signing in with the other provider, because that creates a separate, empty account (`AUTH-7`).
- **AUTH-13** The notice must disappear when the developer reloads the page or starts another sign-in.
- **AUTH-14** Some failures never come back to Gitilizer: the developer closes the tab or goes back, or the provider shows its own error page (for example, when Gitilizer's provider settings are wrong). Gitilizer shows nothing in these cases.

---

## Footer

Figma: [Shared / Footer](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-346)

- **FOOT-1** Every page, including the sign-in page, must show the footer.
- **FOOT-2** The footer must show the tagline "Less triage. More shipping." and two links, both opening in a new tab:
  - "Documentation": the user documentation, hosted in the GitHub repository (`https://github.com/brianquinlan/gitilizer/blob/main/docs/user-guide.md`);
  - "GitHub": the project's GitHub page, [github.com/brianquinlan/gitilizer](https://github.com/brianquinlan/gitilizer), which is also the project's landing page.
- **FOOT-3** The user documentation must exist at launch. At least, it must explain the two kinds of GitHub token and how to create one with the right permissions (the page that "Learn more" in Settings opens, `SET-20`), how to create a Gemini API key, and what each [notification](#catalogue) means. It must also explain the limits of a free-tier Gemini API key: the small daily quota, how Gitilizer then falls back to smaller models and finally pauses ranking (`RANK-13` to `RANK-15`), and how to get a key with billing turned on, with a link to Google's instructions.
- **FOOT-4** The user documentation must have a privacy section that explains, in plain language:
  - what Gitilizer stores about a developer ([Data and privacy](#data-and-privacy)), and that credentials are encrypted and never shown again (`PRIV-1`);
  - when it is deleted: an item's data 30 days after no developer has it (`PRIV-5`), everything about a developer immediately when they delete their account (`SET-17`), and copies in backups within 6 months (`PRIV-4`);
  - what Gitilizer sends to Gemini, with the developer's own key: the content of the developer's own issues and PRs, including comments and reviews, and the developer's settings, never their credentials (`PRIV-1`, `PRIV-2`);
  - that Google's terms let it use content sent with a free-tier Gemini key to improve its products, and that this content can come from private repositories, with a link to Google's terms.

---

## App bar

Figma: [Shared / App bar](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-323)

- **BAR-1** Every page after sign-in must show the app bar.
- **BAR-2** The app bar must show, from left to right: the Gitilizer symbol and wordmark (a link to the Prioritized list, `NAV-7`), the [notification bell](#bell) and the [account menu](#account-menu) avatar.
- **BAR-3** The browser tab must show the Gitilizer symbol (the blue square from the app bar) as the page's icon (favicon), on every page including the sign-in page.

---

## Account menu

Figma: [Account menu · Open](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=286-1722). The menu is also the "Profile dropdown" layer inside [Shared / App bar](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-323), which matches it.

- **ACCT-1** The avatar must be the image from the sign-in provider. If the provider has no image, show the developer's initials on a colored circle, as in Figma ("MC").
- **ACCT-2** Clicking the avatar must open a menu showing the developer's full name and email, a "Settings" item and a "Sign out" item, each with its icon as in Figma. "Sign out" is shown in red.
- **ACCT-3** "Settings" must open the [Settings](#settings) page. "Sign out" must end the session (`AUTH-9`) and show the sign-in page.
- **ACCT-4** The menu must close on a click outside it, on Esc and when an item is chosen, like the notification popover (`NOTIF-20`).
- **ACCT-5** The action is called "Sign out" everywhere, in this menu and in Settings (`SET-16`), with no external-link arrow.

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
  - when the problem was **first detected**, as a relative time (`LIST-22`), for example "2m ago";
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
| Warning | Gemini connection | Gitilizer is using a backup Gemini model | Your daily quota for {primary model} is used up, so new and changed issues are being ranked with {backup model} until it resets at {time}, in about {duration}. Rankings may be less accurate until then. To avoid this, turn on billing in Google AI Studio. | 429 for a per-day quota on any model except the last one in `RANK-13`. Only one is active at a time; it names the model now in use. | The primary model's quota resets. |
| Error | Gemini connection | Your Gemini daily quota is used up | Your daily quota is used up for every Gemini model Gitilizer can use, so new and changed issues aren't being ranked. Ranking resumes automatically when the quota resets at {time}, in about {duration}. To avoid this, use an API key with billing turned on. | 429 for a per-day quota on every model in `RANK-13`. Google resets daily quotas at midnight Pacific time. | A Gemini request succeeds. |
| Warning (short-lived) | Gemini connection | Gemini is limiting requests from your key | Ranking is slower than usual and catches up automatically. Other apps that use this key count toward the same limit. | 429 for a per-minute limit, for more than 15 minutes (`NOTIF-21`). | Gemini requests succeed without 429s for 15 minutes. |
| Warning (short-lived) | Gemini connection | Gemini isn't responding | New and changed issues aren't being ranked. Gitilizer keeps retrying automatically. If this continues, check the [Google AI Studio status page](https://aistudio.google.com/status). | 500, 503 or 504 responses, no answer within 90 seconds, or connection failures that continue after retries for more than 15 minutes (`NOTIF-21`). | A Gemini request succeeds. |
| Error | Gemini connection | The Gemini model Gitilizer uses isn't available | New and changed issues aren't being ranked. This is a problem with Gitilizer, not with your key. Report it using the GitHub link at the bottom of the page. | 404 `model_not_found`. | A Gemini request succeeds. |
| Error | Gemini connection | Gemini sent an unexpected response | New and changed issues may not be ranked. Gitilizer keeps retrying automatically. If this continues, report it using the GitHub link at the bottom of the page. | Any other Gemini error, after retries. | A Gemini request succeeds. |
| Error | Issue ranking | Your ranking prompt isn't working | Most new and changed issues couldn't be ranked with your custom prompt. Edit the prompt, or restore the default prompt in Settings. | A custom prompt is set and more than half of the items in a ranking run fail to produce valid output. | The prompt is changed, or a ranking run succeeds. |
| Warning | Issue ranking | Gitilizer couldn't rank {n} issues | These issues are shown without a rank. Gitilizer tries again when they change. | Individual items fail after retries (blocked response, output cut off, invalid output). See `LIST-30`. | Every one of them is ranked or leaves the list. |
| Error | Gitilizer | Can't connect to Gitilizer | Your list won't update until the connection comes back. Check your internet connection. | The web app's requests to the Gitilizer API fail. Detected in the browser. | A request succeeds. |
| Error | Gitilizer | Gitilizer couldn't finish scanning | Your list may be missing recent changes. Gitilizer tries again at the next scan. If this continues, report it using the GitHub link at the bottom of the page. | The backend's own scan job fails for a reason other than GitHub. | A scan succeeds. |
| Error | Gitilizer | Your issues haven't updated since {time} | No scan has finished in 3 hours, so your list may be missing recent changes. Try Sync now. If this continues, report it using the GitHub link at the bottom of the page. | No scan has succeeded for 3 hours. This catches failures the other rows miss. | A scan succeeds. |
| Warning | GitHub connection | Your GitHub token will expire soon | Your GitHub personal access token will expire in {n} days. Create a new one and add it to Settings. | The stored expiry date is 7 days away or less (`NOTIF-22`). | A PAT with a later expiry date is saved. |

Not in the catalogue, by decision:

- "Some of your issues couldn't be loaded" (a search with more than 1,000 results). The list keeps only the 1,000 most recently updated items (`LIST-19`), so no search ever needs more than its first 1,000 results (`SCAN-1`).
- "There's no GitHub user named @{name}". Settings shows this next to the collaborator instead (`SET-19`).
- "Your GitHub token belongs to @{login}". The Validate result names the token's account instead (`SET-28`).

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
  - the developer is @-mentioned by name in its description or in a comment (a mention of a team doesn't count; see [Non-goals](#non-goals));
  - the developer created it;
  - the developer commented on it;
  - the item is in one of the developer's [additional repositories](#additional-repositories).
- **LIST-2** An item must not appear if the developer has moved it to the [Icebox](#icebox).
- **LIST-19** The Prioritized list must hold at most 1,000 items: the 1,000 matching items that were most recently updated on GitHub. When an item outside the 1,000 is updated, it joins the list and the least recently updated item leaves it (`LIVE-26`). The limit doesn't apply to the Icebox, and Icebox items don't count toward it. The developer isn't told when matching items are left out.
- **LIST-20** Draft PRs must be included. (The ranking agent should score them lower, `RANK-8`.)
- **LIST-29** Items opened by bots (Dependabot, Renovate and the like) must be included like any other item. The ranking prompt, or a repository's prioritization prompt, can score them down.

### Columns

| Column | Content |
|---|---|
| Priority | The item's rank, 1 to N, never zero-padded ("1", "25", "1000"). The column fits four digits. |
| Issue | An icon for the type (the issue icon or the PR icon), the title as a link to the item on GitHub, and below it the type and number ("Issue #1842", "PR #731"), a dot and the inclusion reason. |
| Repository | `owner/name`, in the monospace style from Figma. |
| Modified | When the item last changed on GitHub (its `updated_at`, which includes new and edited comments), as a short relative time: "just now", "12m ago", "3h ago", "2d ago". |
| Actions | A "Move to icebox" button. |

- **LIST-3** The inclusion reason must be one of "Review requested", "Assigned to you", "@{handle}" for a mention (for example "@maya"; "@-mentioned" when the handle can't be determined), "Created by you", "Commented on by you", or, for an item in an additional repository, the repository's name (for example "northstar/web"). "CCed", "@mention" and "Interested repository" are not used.
- **LIST-21** An item can match several reasons; only one is shown. The order of precedence is: Review requested, Assigned to you, @{handle}, Created by you, Commented on by you, repository name. (The repository name repeats the Repository column on the same row, which is intended.)
- **LIST-4** The title link must open the item on GitHub, in a new tab, so the list keeps its place.
- **LIST-5** Relative times must update while the page is open, at least once a minute.
- **LIST-22** Relative times must follow these thresholds: under 1 minute "just now"; then minutes ("12m ago"), hours ("3h ago") and days ("2d ago"). After 30 days: the month and day ("Mar 4") for a date in the current calendar year; "last year" for a date in the previous calendar year, until a full year (365.25 days) has passed; after that, the whole years passed ("1y ago", "2y ago"). For example, on November 3, 2026, November 25, 2025 is "last year" and November 1, 2025 is "1y ago". Hovering over any relative time (the Modified column, the Icebox line in `ICE-3`, and notifications in `NOTIF-8`) must show the full date and time.
- **LIST-23** Titles and repository names must stay on one line. A title that doesn't fit is cut off at the end with "…". A repository name that doesn't fit is cut off at the **start** ("…le-cloud-dart"), because the owner, at the start, is usually the least useful part. Hovering must show the full text.
- **LIST-24** Clicking a rank must open a popup that explains it, as in
  [Issue inbox · Rank reasoning](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=337-7443):
  an info icon and "Why rank #{n}?", a close button, the agent's reasoning
  (`RANK-2`) as text that can be selected and copied, and below it the
  repository and the type and number ("northstar/api · Issue #1842"). The
  popup points at the rank. It opens below the rank, or above it near the end
  of the list so it isn't cut off. It closes with the close button, Esc or a
  click elsewhere. Only ranked items with stored reasoning have a clickable
  rank. The agent's next action must not be shown.

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
- **LIST-15** While the first sync is running and nothing has been ranked yet, the table must show the column headings, three skeleton rows and "Scanning your issues and PRs…", as in [Issue inbox · Loading](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=289-3689). The skeleton placeholders pulse, fading to about a third of their strength and back, 0.8 s each way ([Shared / Skeleton rows](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=301-1433)); with reduced motion they don't pulse. As soon as the first item has been ranked, the list replaces the skeleton rows, and further items appear as they are ranked.
- **LIST-30** An item must not be shown in the Prioritized list until it has been ranked. Two kinds of unranked item are shown after all ranked items, newest first, with "–" in the Priority column: an item waiting because the daily quota is used up for every model (`RANK-15`), and an item whose ranking failed. For a failed item (`RANK-6`), the "Gitilizer couldn't rank {n} issues" warning is shown (see the [catalogue](#catalogue)).

### Sync now

Figma: [Shared / Sync now](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=279-8369)

- **LIST-16** A "Sync now" button must start a sync: a scan for new, changed and removed items, followed by ranking of only the new and changed items. "Save and re-rank" (`SET-15`) also starts a sync, one that ranks every item again. The daily re-rank (`RANK-9`) isn't a sync: it doesn't turn the icon, disable the button or show progress (`LIST-33`), and only its result is shown (`LIVE-24`).
- **LIST-17** While any sync is in progress, whether the developer started it or it started automatically (`SCAN-5`), the button must show the **Syncing** state: its icon, in the accent color, turns clockwise once per second. With reduced motion, the icon is still and in the accent color.
- **LIST-28** The button must be disabled while a sync is in progress, whether the developer started it or it started automatically (`SCAN-5`), and enabled again as soon as the sync finishes (`LIST-32`). There is no other minimum interval between manual syncs.
- **LIST-32** A sync counts as finished, and the icon stops turning, when the scan has finished and every new and changed item (after "Save and re-rank", every item) has been ranked, has failed, or is waiting because the daily quota is used up for every model (`RANK-15`). Waiting items are shown with "–" (`LIST-30`), and the "Your Gemini daily quota is used up" error explains the wait, so the icon doesn't turn until midnight Pacific time.
- **LIST-33** While a sync is in progress, text next to the button must show how far it has got (GitHub issue #5), as in [Inbox controls · Sync Progress](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=325-6832).
  - While a full scan is finding items: "Finding issues and PRs… {n} so far", where {n} is the number of distinct open items found so far that aren't in the Icebox, at most 1,000 (`LIST-19`). It goes up as each search finishes. Until the first search finishes, the text is "Finding issues and PRs…".
  - Once every search has finished, and for the whole of an incremental scan: "{n} left to rank", where {n} counts the items the sync will rank that haven't been ranked yet, including any still being downloaded, plus the Icebox checks it hasn't made yet (`ICE-6`). An item whose ranking failed (`LIST-30`) is done. {n} may go up during a sync as linked items are found (`RANK-10`).
  - While ranking is held up by Gemini's per-minute limits or a retry: "{n} left to rank · waiting for Gemini".
  - No text when {n} is 0, or when every remaining item is waiting because every model's daily quota is used up (`RANK-15`, `LIST-32`).
  - The text changes at most once every 2 seconds, so it doesn't flicker, except that it disappears as soon as the sync finishes. "· waiting for Gemini" appears only after 5 seconds without progress, and goes as soon as {n} changes.

### Moving an item to the Icebox

- **LIST-18** "Move to icebox" must move the item to the [Icebox](#icebox) immediately. The row leaves the list as described in `LIVE-15`, and the next item moves up so the page still has 25 rows.

- **LIST-31** There is no undo for "Move to icebox". "Restore" in the Icebox does the same job.

---

## Live updates

Items change on GitHub all the time, so ranks change while the developer is looking at the list. These rules make changes easy to follow without being distracting. The [Live reorder prototype](#live-reorder-prototype) shows each case.

- **LIVE-1** When ranks change, the Prioritized list must update without a page reload. No notice, banner or status message is shown; the only feedback is the animations and the indicators in the affected rows.
- **LIVE-23** A ranked change must reach the screen within 5 seconds of ranking finishing, unless the rules in [When updates wait](#when-updates-wait) hold it.
- **LIVE-24** Bulk re-ranks, which change the rank of nearly every item at once, must not play as per-item animations. These are a full re-rank after "Save and re-rank" (`SET-15`) and the daily re-rank (`RANK-9`). The new order must be applied once, when the whole re-rank has finished, without row indicators. Items ranked during the first sync also appear without row indicators, but one at a time as they are ranked (`LIST-15`), not all at once at the end. Changes caused by activity on GitHub keep the per-item animations below.

### Pages during updates

- **LIVE-2** A change in ranks must never change the page the developer is on, with one exception: if the current page no longer exists (for example, every item on the last page was closed), the developer is taken to the last page that still exists, without a notice. If there are no items at all, the [empty state](#empty-loading-and-first-sync-states) is shown.
- **LIVE-3** Every page except the last must always show 25 items. When an item leaves a page, the next item in order enters it, so items leave and arrive in pairs.

### When updates wait

- **LIVE-4** While the pointer is over the table, updates must be held until the pointer has been outside the table for 1 second.
- **LIVE-5** Updates must also be held while keyboard focus is inside the table.
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
- **LIVE-15** An item that leaves the list (closed, no longer relevant or moved to the Icebox) must briefly show a label such as "Closed" in its row, then collapse, and the rows below must slide up. The labels are in `LIVE-25`.
- **LIVE-16** A new item must expand into its position.
- **LIVE-17** The rank numbers of all visible items must update to their new values.
- **LIVE-25** The label a leaving row shows depends on why it left:

  | Why the item left | Label |
  |---|---|
  | The issue was closed | Closed |
  | The PR was merged | Merged |
  | The PR was closed without merging | Closed |
  | The developer chose "Move to icebox" | Moved to Icebox |
  | It no longer matches `LIST-1` (the developer was unassigned, a review request was withdrawn, its repository was archived or removed from additional repositories) | No longer yours |
  | The Icebox check brought it back to the Prioritized list (`ICE-6`, `ICE-9`; shown in the Icebox) | Back in your list |

- **LIVE-26** An item that leaves because of the 1,000-item limit (`LIST-19`) shows no label. It moves off the bottom of the page as an item moving to a later page does (`LIVE-13`).

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
- **ICE-3** The line under each title must show the type and number, then "Moved to Icebox by you · {relative time}" (`LIST-22`).
- **ICE-4** The default sort must be Issue ascending: PRs first, then issues, each by number ascending.
- **ICE-5** The Actions column must have a "Restore" button that returns the item to the Prioritized list.
- **ICE-6** When an item in the Icebox changes on GitHub, Gitilizer must run the **Icebox check**: a short question to the agent, with its own prompt, about whether the change should bring the item back. If the answer is yes, the item returns to the Prioritized list automatically and is ranked again.
- **ICE-7** If the Icebox is empty, the table body must be replaced by "No issues in the Icebox".
- **ICE-8** Pages, sorting, the item count and "Sync now" must work as in the Prioritized list.
- **ICE-9** While the Icebox is shown, an item that leaves it (it returns to the list under `ICE-6`, or leaves under `ICE-11`) must use the leave animation in `LIVE-15`, without the holding rules in [When updates wait](#when-updates-wait).
- **ICE-10** A restored item must keep its last score. (An item that changed while in the Icebox will usually have returned to the list already, under `ICE-6`, and been ranked again.)
- **ICE-11** An item that would no longer be eligible for the Prioritized list must leave the Icebox automatically. That includes items that are closed or merged, items that no longer match `LIST-1`, items in a repository that has been archived, and items that were there only because of an additional repository the developer has removed.
- **ICE-12** The Icebox check's prompt must lean toward bringing items back. It keeps an item in the Icebox only when the change is clearly unimportant, such as a bot's comment, a label or milestone edit, or a CI result. Changes made by the developer count like anyone else's: for example, the developer commenting "This is a critical security issue, I'll work on it right away" brings the item back. If the check can't be made (for example, Gemini still fails after retries), the item comes back.
- **ICE-13** Changes to the Icebox check's prompt should be measured against labelled examples before they ship, as `RANK-7` requires for the ranking prompt.
- **ICE-14** The Icebox check's prompt belongs to Gitilizer. Developers can't see or change it.

---

## Settings

Figma: [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802), [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509)

Settings is one page. The left column has links to its sections (Connections, Additional repositories, Ranking prompt, Collaborators), the developer's account details ("Signed in with GitHub", "Sign out") and a Delete account panel. The main column has the numbered sections (01 Connections, 02 Additional repositories, 03 Ranking prompt, 04 Collaborators) and, at the bottom, three buttons: "Save changes", "Save and re-rank" and "Cancel".

### Connections

Both credentials are required.

- **SET-1** The developer must be able to enter a Gemini API key and a GitHub personal access token. Each field is masked.
- **SET-2** Each credential must have a "Validate" button that checks the value typed in the field, without saving it, and shows the result under the field (`SET-28`).
- **SET-21** "Validate" must be disabled while its field is empty. That includes when the field shows a saved credential: a saved credential appears as dots, can't be shown or edited, and can't be validated again until it is replaced. The eye icon shows only a value typed during this visit. (Figma shows both Validate buttons disabled, because both credentials are saved.)
- **SET-3** Each credential card must show a status chip (`SET-30`).
- **SET-4** "Get an API key (it's free!) ↗" must open Google AI Studio's API key page, and "Create a token (it's free!) ↗" must open GitHub's new-token page, both in a new tab.
- **SET-5** Saving a credential must clear the related notifications (`NOTIF-13`) and start a sync.
- **SET-6** For a PAT, the backend must record the expiry date from GitHub's `GitHub-Authentication-Token-Expiration` header, if it sends one, for the expiry warning.
- **SET-20** "Learn more ↗" in the GitHub token card must open, in a new tab, the documentation page about GitHub tokens (`FOOT-3`). That page explains:
  - that Gitilizer accepts both kinds of personal access token and recommends a fine-grained one;
  - that a **fine-grained token** can be read-only (Issues, Pull requests and Metadata: read) but reads the private repositories of only one owner, the developer or one organization, and that an organization may have to approve it;
  - that a **classic token** with the `repo` scope reads every repository the developer can access, in every organization, but also allows writing, so it is needed only when the developer's private repositories belong to more than one owner; and that Gitilizer only ever reads;
  - that Gitilizer takes one token per developer ([Non-goals](#non-goals)).
- **SET-22** Settings must not show which Gemini model is used. Gitilizer chooses it.
- **SET-28** Validate must show its progress and result under the field. A success has a green check mark; a failure has a red ✗ and red text, as in [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237).

  | State | Shown under the field |
  |---|---|
  | Checking | A spinner and "Checking…". The button is disabled until the check finishes. |
  | GitHub token works | ✓ "Validated just now · Reading GitHub as @{login}". Naming the account makes a token from the wrong account easy to spot; Gitilizer doesn't otherwise check it. |
  | Gemini key works | ✓ "Validated just now · Gemini accepted this key" |
  | GitHub token not accepted | ✗ "GitHub didn't accept this token. Check that you copied it correctly." |
  | GitHub token expired | ✗ "This token expired on {date}. Create a new one." |
  | GitHub token missing a permission | ✗ "This token can't read {permission}. Give it read access to Issues, Pull requests and Metadata." |
  | Gemini key not accepted | ✗ "Google didn't accept this API key. Check that you copied all of it." |
  | Gemini key disabled | ✗ "Google has disabled this key because it was reported as leaked. Create a new one." |
  | Gemini key can't use Gemini | ✗ "This key can't use the Gemini API. Create a key in Google AI Studio." |
  | Provider can't be reached | ✗ "Couldn't reach GitHub. Check your connection and try again." ("Google" for the Gemini key) |
  | Anything else | ✗ "Something went wrong on our side. Try again." |

GitHub answers an expired token the same way as a mistyped one, and sends the expiry date only with successful responses, so Validate can tell an expired typed token apart only if GitHub's answer changes. Until then it shows "GitHub didn't accept this token…" ([Q-78](#q-78)). The "Your GitHub token has expired" notification is unaffected, because by then Gitilizer has seen the expiry date.

- **SET-29** Saving doesn't validate credentials. A saved credential that doesn't work shows up as a [notification](#catalogue) when Gitilizer first uses it.
- **SET-30** The status chip on each credential card must show one of: "Not set" (grey) when no credential is saved; "Connected" (green) when one is saved and no error notification about it is active; "Not working" (red) while an error notification about it is active; "Expires soon" (amber) while the GitHub token's expiry warning is active.

### Additional repositories

- **SET-7** The developer must be able to add a repository by typing `owner/name`, or pasting its GitHub URL (`https://github.com/owner/name`, with anything after the name ignored), and choosing "Add repository", and remove one with "Remove". Any other format, or a repository already in the list, is an error (`SET-27`). There can be at most 25 repositories.
- **SET-8** Each repository must show one of four access states: "Checking…" in grey while Gitilizer checks it; "Access confirmed", as in Figma; "Archived" in grey, where hovering shows "{repo} is archived, so its issues and PRs aren't shown." (`LIST-1` excludes archived repositories); or "Can't access" with a red ✗. Hovering over "Can't access" must say why, as precisely as GitHub's answer allows:

  | What GitHub answered | Hover text |
  |---|---|
  | Not found. The repository doesn't exist, its name is misspelled, or it is private and the token can't read it. GitHub gives the same answer in all three cases, so as not to reveal that a private repository exists. | "GitHub says {repo} doesn't exist, or your token can't read it. Check the name, and that your token includes this repository." |
  | The organization uses single sign-on and the token isn't authorized for it | "{org} uses single sign-on. Authorize your token for {org} in your GitHub token settings." |
  | The organization blocks this kind of token | "{org} doesn't allow {classic / fine-grained} tokens. Create the other kind of token, or ask an owner of {org} to allow this one." |

  If GitHub can't be reached, the repository keeps its last known state. A renamed repository keeps working: GitHub forwards the old name, and Gitilizer shows the new one.
- **SET-9** Each repository may have a prioritization prompt: free text that tells the ranking agent what the developer cares about in it, for example "Security issues only". It is entered in the "Prioritization prompt" field when adding the repository, and shown under the repository's name. The agent receives it as a note on that repository. It can be at most 500 characters. It can't be edited after the repository is added: to change it, the developer removes the repository and adds it again.
- **SET-31** Additional repositories are repositories the developer follows, not ones they're responsible for. The agent's "About me" text and the default prompt must describe them that way, measured as in `RANK-7`. A developer who is responsible for a repository can say so in its prioritization prompt.

### Ranking prompt

- **SET-11** The page must show the current ranking prompt in an editor. With no custom prompt, it shows the default prompt.
- **SET-12** The developer can edit the prompt. When the prompt differs from the default, a "Restore default" control must be shown; it replaces the text with the default.
- **SET-13** The custom prompt replaces only the instructions part of what the agent receives. Gitilizer always adds the "About me" block (login, additional repositories with their prioritization prompts, and collaborators) and the output format, as in `systemInstruction()` in `app/ranker/src/prioritizer.ts`. These additions are not shown in or editable from Settings.
- **SET-23** The section description must read "The agent reads each issue's title, description, labels, comments and reviews and gives it a score."
- **SET-24** The default prompt is `prompts/v4.md`. A developer who has never changed the prompt always gets the current default, so they pick up improvements automatically. A custom prompt can be at most 20,000 characters (`SET-27`).

### Collaborators

- **SET-10** The developer must be able to keep a list of GitHub usernames whose items and comments should get a higher score. The agent receives them as "my usual collaborators".
- **SET-18** The developer adds a collaborator by typing a username in "Add collaborator" and choosing "Add collaborator", and removes one with "Remove". Adding doesn't check that the user exists.
- **SET-19** Each collaborator must show their GitHub avatar and username. If GitHub says the user doesn't exist, an error icon is shown in place of the avatar (as for "priyapatel" in Figma), and hovering over it shows "There's no GitHub user named priyapatel". If GitHub can't be reached, a generic avatar is shown, without an error (as for "samkim").
- **SET-25** A leading "@" typed with a username must be removed. A username already in the list must be rejected with an error (`SET-27`). There can be at most 50 collaborators.

### Saving

- **SET-14** Changes must take effect only when the developer chooses "Save changes" or "Save and re-rank". Both save everything on the page, credentials included. "Cancel" discards unsaved changes (`NAV-9`).
- **SET-15** "Save changes" must save without re-ranking: items already ranked keep their scores until they change on GitHub. New items, such as those from a newly added repository, are ranked as usual. "Save and re-rank" must save and then re-rank every item (a full re-rank, shown as in `LIVE-24`). It counts as a sync: Sync now turns and is disabled until every item has been ranked, and the progress text shows how many are left (`LIST-16`, `LIST-33`). Each button has the explanatory note shown in Figma next to it, without an estimate of how many items will be re-ranked.
- **SET-26** Leaving Settings with unsaved changes (through a link, the browser's Back button or closing the tab) must ask the developer to confirm.

- **SET-27** Settings must show problems next to the field they belong to, as in [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237):
  - The field gets a red border, and a one-line message in red appears under it, for example "northstar/web is already in your list.", "Enter a repository as owner/name or paste its GitHub URL.", "jordanlee is already a collaborator." or "A prompt can be at most 20,000 characters. This one has 21,345."
  - Repository and collaborator errors appear when the developer chooses "Add repository" or "Add collaborator", and nothing is added. A prompt's error appears as soon as it goes over its limit, and a character count appears once a ranking prompt passes 18,000 characters.
  - While any error is showing, "Save changes" and "Save and re-rank" are disabled.
  - If the server finds a problem when saving, it is shown the same way, and the page scrolls to the first one.

### Account

- **SET-16** The account panel must show the developer's name, email, sign-in provider and a "Sign out" link (`ACCT-5`).
- **SET-17** The developer must be able to delete their Gitilizer account from the Delete account panel in the left column, which explains that deleting is permanent. Choosing "Delete account" must ask for confirmation with a simple dialog: "Delete your Gitilizer account? This can't be undone.", with "Cancel" and "Delete account". Deletion is immediate: it deletes all data about the developer from the live database (see [Data and privacy](#data-and-privacy)), ends all their sessions and shows the sign-in page. Copies remain in database backups for up to 6 months (`PRIV-4`).

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
  - every 2 hours otherwise, for developers who have opened Gitilizer in the last 7 days. Developers who haven't aren't scanned in the background; their items are scanned when they next open Gitilizer (`SCAN-6`).
- **SCAN-6** When the app becomes visible and the last scan finished more than 5 minutes ago, a scan must start immediately.

### Ranking

- **RANK-1** Ranking must use the existing ranking agent, with the developer's ranking prompt (or the default), their settings and the item's context, and the developer's Gemini API key. Each item is scored on its own, so a change to one item re-scores only that item. (The design doc has the details.)
- **RANK-2** For each item the agent returns a score (named `priority` in its
  output, 0.0 to 1.0), whether the item is actionable, a one-line next action
  and its reasoning. All four must be stored. The interface uses the score and
  the reasoning, not the next action or whether the item is actionable
  (`LIST-24`).
- **RANK-3** Ranks must come from sorting items by score, highest first. Two items must never share a rank.
- **RANK-4** The agent should try to give items distinct scores, but because each item is scored on its own, ties can't always be avoided. Ties must be broken by most recent activity, then by repository and number, so the order is always the same for the same data.
- **RANK-5** An item must be ranked again when it is new or has changed on GitHub (its `updated_at` is later than when it was last ranked), and all items must be ranked again when the developer chooses "Save and re-rank" (`SET-15`).
- **RANK-6** Short-lived Gemini failures must be retried automatically. An item that still can't be ranked is shown as in `LIST-30`.
- **RANK-7** Changes to the default prompt or model should be measured with the evaluation harness before they ship.
- **RANK-8** The default prompt should score a draft PR lower than the same PR ready for review. (`prompts/v4.md` already scores the developer's own drafts low; extend that to other people's drafts, and measure it as in `RANK-7`.)
- **RANK-9** Every item must be ranked again at least once every 24 hours, so scores that depend on age stay current. This is a bulk re-rank (`LIVE-24`). It happens out of sight: it isn't a sync, so Sync now doesn't turn and stays enabled while it runs (`LIST-16`).
- **RANK-10** When a scan sees a change to an item, Gitilizer must also rank again the items in the developer's list that it links to. For example, an issue drops when a PR that fixes it is opened, although the issue itself hasn't changed.
- **RANK-11** At most 4 Gemini requests may run at once for one developer. Ranking uses `gemini-3.8-flash` with thinking turned down as far as the model allows, to keep cost down. (The [model comparison](../eval/model-comparison-2026-11-01.md) measured this, "low" thinking, at Kendall tau 0.69, against 0.77 at the default level. The decision can be revisited.)
- **RANK-12** Gitilizer must work with a Gemini API key on Google's free tier.
- **RANK-13** Gitilizer must rank with `gemini-3.8-flash` (the primary model). When Google reports that the developer's daily quota for the model in use is used up, Gitilizer must switch to the next model in this order: `gemini-3.8-flash`, then `gemini-3.5-flash-lite`, then `gemini-3.1-flash-lite`. It returns to the primary model when that model's quota resets, at midnight Pacific time. For as long as a backup model is in use, the developer sees the "Gitilizer is using a backup Gemini model" warning, even if that is most of every day on the free tier. This works because Google sets quotas separately for each model: running out on one doesn't block the others.
- **RANK-14** Per-minute limits must not cause a switch: Gitilizer waits and retries, as for "Gemini is limiting requests from your key".
- **RANK-15** When the daily quota is used up for all three models, ranking must pause until the quotas reset, and the developer sees the "Your Gemini daily quota is used up" error.
- **RANK-16** Each item's score must record which model produced it.
- **RANK-17** Scores from different models share one list. The primary model's quota goes to new and changed items first, because they are most likely to be near the top; the daily re-rank (`RANK-9`) uses whichever model is available, so over time items are scored again by the primary model as its quota allows.
- **RANK-18** Each Gemini call scores exactly one item.

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
- **PRIV-5** An item's GitHub data, and each developer's record of it (its score and the agent's output), must be deleted 30 days after no developer has the item in their Prioritized list or Icebox any more, whatever the reason: closed or merged, no longer matching `LIST-1`, past the 1,000-item limit, or every developer who had it deleted their account.
- **PRIV-4** Database backups must be kept for 6 months, so a deleted account's data stays in backups for up to 6 months; credentials stay encrypted there (`PRIV-1`). If a backup is ever restored, every account deleted after that backup was taken must be deleted again.

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
  - "Using the application at the same time" means having it visible in a browser tab. The system is sized for 10,000 such developers, out of up to 100,000 accounts, with up to 1,000 items each (`LIST-19`).
  - At one scan every 5 minutes, that is about 33 scans per second. Each developer's scan uses their own GitHub and Gemini limits, so Gitilizer's own load is mainly scan jobs, database writes and live-update connections.
  - The design doc must show that this fits the US$200 monthly budget (`PLAT-4`). If it doesn't, the scale target or the scan intervals in `SCAN-5` will have to change.

### Performance and availability

- **NFR-7** The list must be ready to use within 2 seconds of opening the app, for 95% of page loads.
- **NFR-8** Sorting and changing pages must take less than 100 ms.
- **NFR-9** The API must be available 99.5% of each month.

### Browsers and screen sizes

- **PLAT-6** Gitilizer must support the latest two versions of Chrome, Edge, Firefox and Safari on desktop, at window widths of 1024 px and more. Narrower layouts, phones and touch input are out of scope ([Non-goals](#non-goals)).

### Accessibility

- **NFR-2** Everything must be usable with a keyboard alone, with a visible focus indicator.
- **NFR-3** Motion must respect the operating system's reduced-motion setting (`NOTIF-4`, `LIST-17`, `LIVE-22`), and movement that repeats must stop once the developer has acknowledged it (`NOTIF-17`).
- **NFR-4** Updates must be announced to screen readers as in `LIVE-21`.
- **NFR-10** Gitilizer must meet WCAG 2.2 level AA.

### Language, time and appearance

- **PLAT-7** Gitilizer is in English only, shows times in the browser's time zone and has a light theme only. Other languages and a dark theme may come later.

### Security and operations

- **NFR-5** All traffic must use HTTPS.
- **NFR-6** The backend must record metrics for scan duration, ranking duration, GitHub and Gemini error rates by type, and notification counts by type, so operators can see problems before developers report them.
- **NFR-11** The backend must log enough to find the cause of a production problem without reproducing it, and no more. Each line records one event (a scan finishing, a job failing, an unexpected GitHub or Gemini response, an unhandled error) with what it was about (developer, item, error code). Routine success is not logged one line per item, logs can be searched by severity, and credentials never appear in them (`PRIV-1`).
- **NFR-12** A change must run in a separate development environment, with its own database, before it reaches gitilizer.com. Deploying to the development environment is automatic; deploying to gitilizer.com is a deliberate step, of a build that has already run in the development environment. The design doc describes the environments.
  - The development environment is at `dev.gitilizer.com` and uses real GitHub and Gemini, with each developer's own credentials, like production.
  - Because it runs untested code with those credentials, only accounts on an allowlist can sign in there ([Q-80](#q-80)). The owner lists Google accounts by email address and GitHub accounts by username or numeric ID, and can change the list without a release. Someone removed from the list is signed out at their next request; their account stays. Anyone else sees the "Not allowed" message (`AUTH-10`). Production has no allowlist.

---

## Open questions

There are no open questions at the moment. New ones are marked **TODO:** where they come up and listed here.

Q-58 to Q-63 were found by building the prototype described in the [design doc](DESIGN.md); Q-64 to Q-76 came from the product owner's 2026-11-01 answers and the new Figma designs; Q-77 to Q-79 came from bringing the prototype in line with this document; Q-80 came from the decision to have a development environment.

### Answered questions

| ID | Question | Decision | Where |
|---|---|---|---|
| <a id="q-1"></a>Q-1 | Hosting, repository and budget | "Costed" meant "hosted". Code and documentation are on GitHub at github.com/brianquinlan/gitilizer. The app runs on Google Cloud, performs best in North America and Western Europe, and costs at most US$200 a month. It is served at gitilizer.com. | `PLAT-1` to `PLAT-5` |
| <a id="q-2"></a>Q-2 | Scale | 10,000 developers with the app visible, up to 100,000 accounts, up to 1,000 items each. | `NFR-1` |
| <a id="q-3"></a>Q-3 | Success metrics | None: this is a hobby project. The owner needs total users, users who completed setup, and daily, weekly and monthly actives. | `METRIC-1`, `METRIC-2` |
| <a id="q-4"></a>Q-4 | Non-goals | Confirmed, plus models other than Gemini (the design should still allow them later). | [Non-goals](#non-goals) |
| <a id="q-5"></a>Q-5 | Footer URLs | "Documentation" opens the user documentation in the GitHub repository; "GitHub" opens the repository, which is the project's landing page. | `FOOT-2`, `FOOT-3` |
| <a id="q-6"></a>Q-6 | Routes | As suggested; moving between screens doesn't reload the page. | `NAV-3`, `NAV-4` |
| <a id="q-7"></a>Q-7 | Getting back to the list | The Gitilizer logo links to the Prioritized list. (Whether saving Settings also goes back is [Q-64](#q-64).) | `NAV-7` |
| <a id="q-8"></a>Q-8 | When Warm Welcome is shown | Until the developer has entered both credentials. After that, problems appear as error notifications on the Prioritized list. | `NAV-2` |
| <a id="q-9"></a>Q-9 | Google and GitHub sign-in for one person | Two separate accounts. | `AUTH-7` |
| <a id="q-10"></a>Q-10 | Failed sign-in | A notice above the buttons with four messages; "Cancelled" is grey, the errors are red. | `AUTH-10` to `AUTH-15` |
| <a id="q-11"></a>Q-11 | Sessions | 30 days, extended while used. Signing out ends only the current browser's session. | `AUTH-8`, `AUTH-9` |
| <a id="q-12"></a>Q-12 | Account menu | Drawn in Figma ("Account menu · Open"). "Sign out" everywhere, without the arrow. Closes like the notification popover. | `ACCT-2` to `ACCT-5` |
| <a id="q-13"></a>Q-13 | Hidden app bar layers | Leftovers. Deleted from Figma. | `BAR-2` |
| <a id="q-14"></a>Q-14 | Bell with only warnings | Amber, doesn't swing; errors take precedence. Figma's bell now has a "Warning" state. | `NOTIF-5` |
| <a id="q-15"></a>Q-15 | Bell's accessible name; popover closing, focus and height | As suggested. | `NOTIF-18`, `NOTIF-20` |
| <a id="q-16"></a>Q-16 | Order of notifications | Errors before warnings, oldest first. Figma already matches. | `NOTIF-19` |
| <a id="q-17"></a>Q-17 | Thresholds | Short-lived problems are retried for 15 minutes and then shown as warnings, not errors. Stale list after 3 hours. The PAT expiry warning first appears 7 days ahead. | `NOTIF-21`, `NOTIF-22`, [Catalogue](#catalogue) |
| <a id="q-18"></a>Q-18 | A missing credential after setup | Follows from Q-8: an error notification. | `NOTIF-16` |
| <a id="q-19"></a>Q-19 | Errors missing from the catalogue | Added, except "Some of your issues couldn't be loaded" (not needed) and "Your token belongs to @{login}" (the Validate result names the account instead). | [Catalogue](#catalogue), `SET-2` |
| <a id="q-20"></a>Q-20 | Where a "Settings" link goes | Settings is one page; the link scrolls to the control that fixes the problem and focuses it. | `NOTIF-9`, `LIST-14` |
| <a id="q-21"></a>Q-21 | Which items appear | Personal review requests, assigned, mentioned, created, commented on, additional repositories; drafts and bot items included; archived repositories excluded; no team reviews. | `LIST-1`, `LIST-20`, `LIST-29` |
| <a id="q-22"></a>Q-22 | Which inclusion reason is shown | Review requested, @handle, Created by you, Commented on by you, repository name. "Interested repository" is now "additional repository", and its label is the repository's name. ("Assigned to you" is [Q-67](#q-67).) | `LIST-3`, `LIST-21` |
| <a id="q-23"></a>Q-23 | Title link; ranks of 100 or more | New tab. Ranks are never zero-padded; Figma updated. The Priority column already fits four digits. | `LIST-4`, [Columns](#columns) |
| <a id="q-24"></a>Q-24 | Relative times | Short, as suggested, with the full date and time on hover. After 30 days: the month and day in the current year, "last year" for the previous year until a full year has passed, then "{n}y ago" (GitHub issue #7). | `LIST-22` |
| <a id="q-25"></a>Q-25 | Sorting | Click toggles; first directions as suggested; stored on the account per view; sorting returns to page 1. | `LIST-9`, `LIST-25`, `LIST-26` |
| <a id="q-26"></a>Q-26 | Many pages; item count | First, last, current ±1 with "…"; the count is always shown. Figma updated. | `LIST-12`, `LIST-27` |
| <a id="q-27"></a>Q-27 | Maximum list size | The 1,000 most recently updated items, kept up to date as items are updated. (Details in [Q-66](#q-66).) | `LIST-19`, `SCAN-1` |
| <a id="q-28"></a>Q-28 | First sync; unranked and failed items | Skeleton rows that pulse (drawn in Figma); items hidden until ranked; failed items at the end with "–" and a warning. | `LIST-15`, `LIST-30` |
| <a id="q-29"></a>Q-29 | Sync now | Spins for any sync, and is disabled while it does (corrected on 2026-11-02: the earlier record said "never disabled"); no other throttle; finished when the scan is done and every item is ranked, has failed or is waiting for quota. Spinning state drawn in Figma. | `LIST-17`, `LIST-28`, `LIST-32` |
| <a id="q-30"></a>Q-30 | Labels on leaving rows; undo | As suggested; no undo. | `LIVE-25`, `LIST-31` |
| <a id="q-31"></a>Q-31 | Showing the agent's next action and reasoning | Not shown (changed on 2026-11-04: the reasoning is shown in a popup when the rank is clicked; the next action is still not shown). | `LIST-24` |
| <a id="q-32"></a>Q-32 | Update latency | Within 5 seconds of ranking finishing. | `LIVE-23` |
| <a id="q-33"></a>Q-33 | How the Icebox updates | The leave animation, without holding rules. | `ICE-9` |
| <a id="q-34"></a>Q-34 | Where a restored item goes | It keeps its last score. | `ICE-10` |
| <a id="q-35"></a>Q-35 | Which changes bring an item back from the Icebox | A separate Icebox check prompt decides, leaning toward bringing items back. | `ICE-6`, `ICE-12`, `ICE-13` |
| <a id="q-36"></a>Q-36 | Ineligible items in the Icebox | Removed automatically. | `ICE-11` |
| <a id="q-37"></a>Q-37 | The eye icon | Shows only a value typed in this visit; a saved credential can only be replaced. | `SET-21` |
| <a id="q-38"></a>Q-38 | Validate states | Red ✗ and red text for a failure; messages as proposed; saving doesn't validate. | `SET-28` to `SET-30` |
| <a id="q-39"></a>Q-39 | Model | Gitilizer chooses; Settings doesn't show it. | `SET-22` |
| <a id="q-40"></a>Q-40 | Token kinds | Accept both, recommend fine-grained, explain in the documentation behind "Learn more". One token per developer. | `SET-20`, [Non-goals](#non-goals) |
| <a id="q-41"></a>Q-41 | Additional repositories | `owner/name` or a URL; duplicates and bad formats are errors; at most 25; prompts up to 500 characters and not editable; states "Checking…", "Access confirmed" and "Can't access", with the reason on hover. | `SET-7` to `SET-9` |
| <a id="q-42"></a>Q-42 | Collaborators | As suggested: tooltip on the error icon, "@" removed, duplicates rejected, at most 50. Generic avatar drawn in Figma. | `SET-19`, `SET-25` |
| <a id="q-43"></a>Q-43 | Review teams | Out of scope for now; listed in non-goals to revisit. | [Non-goals](#non-goals) |
| <a id="q-44"></a>Q-44 | Ranking prompt | New section description (in Figma); default `prompts/v4.md`; 20,000 characters; defaults update automatically. | `SET-23`, `SET-24` |
| <a id="q-45"></a>Q-45 | Saving | Cancel is back; the save buttons save everything; confirm before leaving with unsaved changes; no item count. | `SET-14`, `SET-15`, `SET-26` |
| <a id="q-46"></a>Q-46 | Deletion and backups | Deleted immediately from the live database; backups kept for 6 months. | `SET-17`, `PRIV-4` |
| <a id="q-47"></a>Q-47 | Inactive accounts | Background scans every 2 hours only for developers seen in the last 7 days; others are scanned on their next visit. | `SCAN-5` |
| <a id="q-48"></a>Q-48 | Ageing scores | Every item re-ranked at least every 24 hours. | `RANK-9` |
| <a id="q-49"></a>Q-49 | Related items | A change re-ranks the items it links to. | `RANK-10` |
| <a id="q-50"></a>Q-50 | Ties | The agent tries to avoid ties; they're broken by recent activity, then repository and number. | `RANK-4` |
| <a id="q-51"></a>Q-51 | Concurrency and thinking | 4 requests at once; the model's default thinking level (see [Q-74](#q-74)). | `RANK-11` |
| <a id="q-52"></a>Q-52 | Keeping item data; telling developers about Gemini | Item data deleted 30 days after no developer has it. The documentation has a privacy section covering what is stored, when it is deleted and what is sent to Gemini, including Google's free-tier terms. | `PRIV-5`, `FOOT-4` |
| <a id="q-53"></a>Q-53 | Performance | As suggested. | `NFR-7` to `NFR-9` |
| <a id="q-54"></a>Q-54 | Browsers and screens | Latest two versions of Chrome, Edge, Firefox and Safari; 1024 px and wider; no phones or touch. | `PLAT-6`, `LIVE-5` |
| <a id="q-55"></a>Q-55 | Accessibility | WCAG 2.2 AA. | `NFR-10` |
| <a id="q-56"></a>Q-56 | Languages and themes | English, browser time zone, light theme, for now. | `PLAT-7` |
| <a id="q-57"></a>Q-57 | Meaning of additional repositories | "Keep an eye on"; the agent's wording changes to match. | `SET-31` |
| <a id="q-58"></a>Q-58 | What Validate checks | The typed value; disabled when the field is empty. | `SET-2`, `SET-21` |
| <a id="q-59"></a>Q-59 | Long titles and repository names | One line with "…": at the end for titles, at the start for repository names. | `LIST-23` |
| <a id="q-60"></a>Q-60 | Bulk re-ranks | Applied once when finished, without row indicators. The first sync is the exception: its items appear as they are ranked, still without indicators. | `LIVE-24`, `LIST-15` |
| <a id="q-61"></a>Q-61 | A bell that swings for days | Stops once the popover has been opened; a new error starts it again. | `NOTIF-17` |
| <a id="q-62"></a>Q-62 | "N issues" includes PRs | "{N} issues and PRs". Figma updated. | `LIST-27` |
| <a id="q-63"></a>Q-63 | The free tier | Gitilizer must work on it. It falls back from `gemini-3.8-flash` to `gemini-3.5-flash-lite` to `gemini-3.1-flash-lite` as each daily quota runs out, with a warning, and an error when all are used up. Items waiting for quota are shown at the end with "–". One item per call. | `RANK-12` to `RANK-18`, `LIST-30` |
| <a id="q-64"></a>Q-64 | After saving | Back to the Prioritized list when the save succeeds. | `NAV-8` |
| <a id="q-65"></a>Q-65 | Team mentions | Left out. | `LIST-1`, [Non-goals](#non-goals) |
| <a id="q-66"></a>Q-66 | The 1,000-item limit | Prioritized list only; no notice; a dropped item slides off the bottom like an item moving to a later page. | `LIST-19`, `LIVE-26` |
| <a id="q-67"></a>Q-67 | "Assigned to you" | Second, after "Review requested". Repeating the repository name is intended. | `LIST-21` |
| <a id="q-68"></a>Q-68 | The Settings privacy note | Removed on purpose. | `PRIV-2` |
| <a id="q-69"></a>Q-69 | Settings copy and icons | All fixed in Figma. | [Settings](#settings) |
| <a id="q-70"></a>Q-70 | Alerts for the owner | Yes, by email, through Cloud Monitoring. | `METRIC-4` |
| <a id="q-71"></a>Q-71 | What "Cancel" does | Discards changes and returns to the Prioritized list (or Warm Welcome before setup is complete). | `NAV-9` |
| <a id="q-72"></a>Q-72 | Icebox check prompt | Owned by Gitilizer; not shown in Settings. | `ICE-14` |
| <a id="q-73"></a>Q-73 | Errors in Settings | As suggested, drawn in Figma ("Settings · Errors"). | `SET-27` |
| <a id="q-74"></a>Q-74 | Thinking level | `gemini-3.8-flash` with thinking turned down as far as it goes, for cost; may be revisited. | `RANK-11` |
| <a id="q-75"></a>Q-75 | Scores from different models; how often the backup-model warning shows | Accept the mix; it resolves as items are re-ranked with the primary model. The warning shows for as long as a backup model is in use. | `RANK-13`, `RANK-17` |
| <a id="q-76"></a>Q-76 | Archived additional repositories | Their own "Archived" state, in grey. | `SET-8` |
| <a id="q-77"></a>Q-77 | Leave label when the Icebox check brings an item back | "Back in your list". | `LIVE-25` |
| <a id="q-78"></a>Q-78 | What Validate shows for an expired typed token | GitHub answers it like a mistyped one, so: "GitHub didn't accept this token. Check that you copied it correctly." | `SET-28` |
| <a id="q-79"></a>Q-79 | Sync now while items wait for quota | The sync counts as finished; the quota error explains the wait. | `LIST-32` |
| <a id="q-80"></a>Q-80 | Who can sign in to the development environment | `dev.gitilizer.com`, with real GitHub and Gemini and each developer's own credentials. Only accounts on an allowlist can sign in: Google accounts by email, GitHub accounts by username or ID, kept in a setting the owner can change without a release. | `NFR-12`, `AUTH-10` |
| <a id="q-81"></a>Q-81 | Progress during a sync, and whether bulk re-ranks are syncs | Show progress next to Sync now: the items found so far while searching, then the items left to rank. "Save and re-rank" is a sync, because the developer asked for it and otherwise sees nothing happen for minutes; the daily re-rank isn't, so it never disables Sync now. GitHub issue #5. | `LIST-16`, `LIST-32`, `LIST-33`, `SET-15`, `RANK-9` |

---

## Appendix: revision history

### First revision

- Restructured into numbered requirements with IDs, a glossary, Figma links for every screen and an open-questions table.
- Used one name for each screen: "Prompt for Settings" is now **Warm Welcome**, and "Issue index" / "The Prioritized Issue List" is now **Prioritized list** (the Figma frame is "Issue inbox").
- Followed Figma where the original draft differed, and listed each difference: the issue number is part of the Issue column instead of its own column; relative times are short ("2m ago"); "Issue" sorts by type, with PRs first.
- Added from Figma: the account menu contents, the notification anatomy and empty state, the bell's states and swing timing, the Settings layout, the Icebox subtitle and the "full re-ranking" rule.
- Added from the earlier review: @-mention labels show the handle, or "@-mentioned" when it is unknown.
- Added "Detected when" and "Clears when" columns to the notification catalogue, a warning row for PAT expiry and a list of detectable errors that aren't yet in it.
- Added scanning and ranking requirements based on the existing code in `gitilizer/`.
- Fixed the duplicated sentence in the notification example ("Issue scanning is paused. Issue scanning is paused.") and the typos "Gilitizer", "certaining", "addiction" (indication), "@-mentioed", "chose" and "next" (text).

### Second revision (2026-10-31)

- Folded in the product owner's answers to Q-1, Q-3, Q-4, Q-6 and Q-8 (and Q-18, which follows from Q-8), and moved them to [Answered questions](#answered-questions).
- Used "rank" for the position, "score" for the agent's number, and "Priority" only for the column and its sort order.
- Moved technical detail (the system diagram, the existing code and how scanning works) to the [design doc](DESIGN.md), leaving the product requirements here.
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

### Fourth revision (2026-11-01, second round)

- Folded in the product owner's answers to 24 more questions (Q-11, Q-12, Q-19, Q-21, Q-28 to Q-30, Q-35, Q-37, Q-39, Q-40, Q-42, Q-44, Q-45, Q-47 to Q-49, Q-51, Q-58, Q-64 to Q-67, Q-69) and parts of Q-46 and Q-63. New requirements: `METRIC-3`, `NAV-8`, `AUTH-9`, `ACCT-4`, `ACCT-5`, `LIST-29` to `LIST-32`, `LIVE-25`, `LIVE-26`, `ICE-12`, `ICE-13`, `SET-20` to `SET-26` and `RANK-9` to `RANK-13`.
- The action is "Sign out" everywhere. An Icebox check prompt decides whether a change brings an item back. The daily-quota notification is now a warning, and Gitilizer must work on the free tier.
- Added Q-70 to Q-74. Q-63 now asks what "works on the free tier" means, because one call per item may not fit.
- Changed Figma: "Sign out" and the new menu icons in the app bar's account menu, and no arrow on "Sign out" in Settings; the six Settings fixes from Q-69 and the new Ranking prompt description; a "samkim" collaborator showing the generic avatar; both Validate buttons shown disabled; a pulsing [Shared / Skeleton rows](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=301-1433) component on the Animations page, used in Issue inbox · Loading.

### Fifth revision (2026-11-01, third round)

- Added [Failed sign-in](#failed-sign-in) (`AUTH-10` to `AUTH-14`) from the new [Sign in · Cancelled](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=304-1734) frame and the suggested message categories. Errors are red and "Cancelled" is grey (`AUTH-15`), shown in the new [Sign in · Error](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=306-1355) frame; Q-10 is answered.
- Folded in the answers to Q-70 (`METRIC-4`) and Q-71 (`NAV-9`).
- Changed Figma: removed zero-padding from the ranks, and replaced "Interested repository" with repository names, in the list previews on both sign-in frames.

### Sixth revision (2026-11-01, fourth round)

- Folded in the product owner's answers to Q-2, Q-38, Q-46, Q-50, Q-53 to Q-57 and Q-72 to Q-74, and parts of Q-41 and Q-63. New requirements: `ICE-14`, `SET-27` to `SET-31`, `PRIV-4`, `NFR-7` to `NFR-10`, `PLAT-6` and `PLAT-7`. `LIVE-5` no longer mentions touch.
- Q-63 now explains how Gitilizer can tell a free-tier key from a paid one. Q-41 is down to the repository access states.
- Changed Figma: added [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237). Nothing in Figma suggested touch support, so nothing was removed.

### Seventh revision (2026-11-01, fifth round)

- Folded in the product owner's model fallback for running out of Gemini quota: `gemini-3.8-flash`, then `gemini-3.5-flash-lite`, then `gemini-3.1-flash-lite` (`RANK-13` to `RANK-16`), with a warning while a backup model is in use and an error when all three are used up. This replaces detecting a key's tier.
- Q-63 is down to two smaller points. Added Q-75 about mixing scores from different models.

### Eighth revision (2026-11-01, sixth round)

- Folded in the answers to Q-63 and Q-75: items waiting for quota are shown at the end with "–" (`LIST-30`), scores from different models share the list (`RANK-17`), each call scores one item (`RANK-18`), and the backup-model warning shows for as long as a backup model is in use.

### Ninth revision (2026-11-01, seventh round)

- Folded in the answers to Q-41 (`SET-8`, with the reasons a repository can't be accessed) and Q-68 (the privacy note was removed on purpose).
- Explained Q-52 in more detail, and added the documentation question that Q-68 leaves. Added Q-76 about archived repositories.

### Tenth revision (2026-11-01, eighth round)

- Folded in the answers to Q-76 (an "Archived" state, `SET-8`) and the retention part of Q-52 (30 days, `PRIV-5`). Q-52 is down to whether the documentation mentions Gemini's free-tier data use.

### Eleventh revision (2026-11-01, ninth round)

- Folded in the rest of Q-52: the user documentation gets a privacy section (`FOOT-4`). No questions are open.

### Twelfth revision (2026-11-01, tenth round)

- Added Q-77 to Q-79 (each a CONFIRM with the answer the prototype follows), found while bringing the prototype in line with this document and the design doc.

### Thirteenth revision (2026-11-01, eleventh round)

- Folded in the answers to Q-77 (a "Back in your list" row in `LIVE-25`) and Q-79 (`LIST-32` counts items waiting for quota as finished). Q-78 is still open.

### Fourteenth revision (2026-11-02)

- Moved to `contributor/PRD.md`, next to the design doc; the user documentation stays in `docs/`. Questions and confirmations are now both marked "TODO:".
- Sync now is disabled while a sync is in progress (`LIST-28`). The Q-29 record had said "never disabled", which wasn't what the product owner meant.
- Added logging (`NFR-11`), a development environment (`NFR-12`, with Q-80), the favicon (`BAR-3`), the count of deleted accounts (`METRIC-1`), and the free-tier quota in the user documentation (`FOOT-3`).
- Folded in the answer to Q-78 ("Check that you copied it correctly").

### Fifteenth revision (2026-11-02, second round)

- Folded in the answer to Q-80: only accounts on an allowlist can sign in to the development environment (`NFR-12`), and a refused sign-in gets a fifth message, "Not allowed" (`AUTH-10`). [DEPLOYMENT.md](DEPLOYMENT.md) explains how the owner changes the list.

### Sixteenth revision (2026-11-02, third round)

- `LIVE-24` no longer lists the first sync as a bulk re-rank applied at the end: its items appear as they are ranked, as `LIST-15` already said, still without row indicators. The two requirements had contradicted each other. Q-60's answer notes the exception.

### Seventeenth revision (2026-11-03)

- `LIST-22`: dates older than 30 days that aren't in the current year now read "last year" or "{n}y ago" instead of a bare month and day, and every relative time (including the Icebox line and notifications) shows the full date and time on hover. From GitHub issue #7; Q-24's answer is updated to match.

### Eighteenth revision (2026-11-04)

- Added `LIST-33`: text next to Sync now shows how far a sync has got, first the items found so far, then the items left to rank, changing at most once every 2 seconds (GitHub issue #5, Q-81), drawn in [Inbox controls · Sync Progress](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=325-6832).
- "Save and re-rank" now counts as a sync, so Sync now turns and is disabled until it finishes (`LIST-16`, `LIST-32`, `SET-15`). The daily re-rank still doesn't (`RANK-9`): no decision had been recorded either way; it had followed from `LIST-32` mentioning only new and changed items.

### Nineteenth revision (2026-11-04, second round)

- A Gemini request that hasn't answered within 90 seconds now counts as "Gemini
  isn't responding": a short-lived failure that is retried (`RANK-6`), instead
  of letting the item fail. Slow answers from Gemini had left items unranked
  (GitHub issue #3). The catalogue row's condition now also names timeouts and
  connection failures, which were already treated this way.

### Twentieth revision (2026-11-04, third round)

- `LIST-24`: clicking a rank now opens a popup with the agent's reasoning,
  drawn in [Issue inbox · Rank reasoning](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=337-7443).
  The next action is still not shown. Q-31's answer, `RANK-2` and the
  Non-goals are updated to match.
