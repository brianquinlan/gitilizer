# Gitilizer product requirements

| | |
|---|---|
| **Status** | Draft for review |
| **Owner** | brian@sweetapp.com |
| **Last updated** | 2026-11-15 (search and a type filter above the list's column headings, `LIST-34` to `LIST-41`, `LIST-12`, `LIST-15`, `LIST-27`, `NAV-3`, `ICE-7`, `ICE-8`; the first keyboard shortcut, "/" for search, and a "Keyboard shortcuts" switch in Settings that turns every shortcut off, `KEY-1` to `KEY-3`, `SET-50`, `SET-14`); 2026-11-15 (details settled while building basic ranking: `LIST-33`, `PRIV-2`, `RANK-21`, `RANK-22`, `METRIC-4`, `METRIC-5`); 2026-11-15 (setup without an API key: Warm Welcome is two steps, "Connect GitHub" and then an optional Gemini API key, and a developer without a key gets basic ranking, which Gitilizer runs at its own cost, `WEL-2` to `WEL-6`, `NAV-5`, `RANK-21`, `PRIV-0`, `PRIV-2`, `PLAT-4` and [Which screen is shown](#which-screen-is-shown); in Settings, basic ranking is a fourth choice in the Ranking agent card, `SET-38`; basic ranking never ranks everything again, so it has no daily re-rank and no "Save and re-rank", `RANK-9`, `SET-15`; when a Gemini key's quota is used up, Gitilizer ranks with one backup model and then basic ranking, `RANK-13`; the owner can see how much each way of ranking does, `METRIC-5`; basic ranking pauses, with a warning, when Google refuses Gitilizer's own key for a quota or spending limit, `RANK-22`); 2026-11-14 (GitHub connection: the developer connects GitHub in one click with the Gitilizer app, or uses a personal access token, `AUTH-5`, `WEL-2` to `WEL-4`, `WEL-6`, `SET-1`, `SET-30`, `SET-42` to `SET-49`, `PRIV-0`, and the catalogue's GitHub rows; Gemini is the recommended ranking agent, and Claude and OpenAI are offered for API accounts the developer already has, `WEL-5`, `SET-38`; the billing and cost notes are gone, `SET-41`; Claude and OpenAI rank with `claude-sonnet-5-5` and `gpt-6.1-sol`, `RANK-19`); 2026-11-07 (ranking agents: the developer chooses Gemini, Claude or OpenAI to rank their list, `SET-38` to `SET-41`, `WEL-5`, `RANK-19`, `RANK-20`; repositories show their owner's avatar, `SET-8` and `SET-36`; edge cases found while building excluded repositories: what goes into the searches, inclusion reasons in an additional repository inside an excluded owner, redundant exclusions); 2026-11-06 (excluded repositories: a Settings section of repositories and owners whose items never appear, whatever the inclusion reason) |
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
14. [Keyboard shortcuts](#keyboard-shortcuts)
15. [Settings](#settings)
16. [Scanning and ranking](#scanning-and-ranking)
17. [Data and privacy](#data-and-privacy)
18. [Non-functional requirements](#non-functional-requirements)
19. [Open questions](#open-questions)
20. [Appendix: revision history](#appendix-revision-history)

---

## Overview

### Problem

Developers who work across many GitHub repositories get a steady stream of assignments, review requests, @-mentions and activity in repositories they care about. GitHub's own lists show these items by type or by date, not by how much they need the developer's attention right now. Working out what to do next takes time and is easy to get wrong.

### Product

Gitilizer is a web application, at [gitilizer.com](https://gitilizer.com), that shows a developer one ordered list of the open GitHub items that involve them. An AI agent ranks every item, so the item that most deserves the developer's attention is at the top. The list keeps itself up to date as items change on GitHub, without the developer reloading the page.

The developer gives Gitilizer its access. They connect their GitHub account,
which Gitilizer uses to read their items. Connecting takes one click with the
Gitilizer app; a GitHub personal access token (PAT) works too ([Connecting
GitHub](#connecting-github)). That is enough to start: Gitilizer then ranks
their items itself, with basic ranking (`RANK-21`). A developer who wants the
best ranking also supplies an API key for a ranking agent, and Gitilizer ranks
with that instead: Gemini, which Gitilizer recommends and which has a free
tier, or Claude or OpenAI.

### Goals

1. A developer can see their most important item at a glance, and can trust that the order reflects the current state of GitHub.
2. The list stays current without a page reload, and changes in order are easy to follow.
3. A developer can tune the ranking with their own instructions, the repositories they care about and the people they work with.
4. When something stops Gitilizer from working (an expired token, a ranking
   agent's quota or credits running out), the developer finds out and knows how
   to fix it.

### Non-goals

These are out of scope for the first release.

- Acting on items from Gitilizer, such as commenting, closing or reviewing. Item titles link to GitHub.
- GitHub Enterprise Server, GitLab and other code hosts.
- Shared or team views of a list.
- Email, push or other notifications outside the app.
- Native mobile apps.
- Gitilizer-provided GitHub credentials, and Gitilizer paying for any ranking
  other than basic ranking (`RANK-21`, [Q-91](#q-91)).
- Ranking with more than one agent at a time, such as a backup agent that takes
  over when the first can't rank, and ranking agents other than Gemini, Claude
  and OpenAI, including any OpenAI-compatible endpoint ([Q-84](#q-84)). The one
  exception is basic ranking, which takes over when a Gemini key's daily quota
  is used up (`RANK-13`). The design should still allow other providers to be
  added later.
- Choosing the model. Gitilizer chooses one for each ranking agent (`SET-22`).
- Review requests made to a GitHub team the developer belongs to, and the ranking agent's "review teams" setting. Only review requests made to the developer personally count. **Revisit after the first release** (see [Q-43](#q-43)).
- Showing the agent's next action for an item ([Q-31](#q-31)).
- Mentions of a GitHub team the developer belongs to (`@org/team`). Only mentions of the developer by name count ([Q-65](#q-65)).
- More than one GitHub connection per developer, for example a token for each
  organization, or the Gitilizer app and a token together ([Q-40](#q-40),
  [Q-87](#q-87)). Revisit if developers ask for it.
- Organizations that use single sign-on, with the Gitilizer app. Gitilizer
  doesn't yet detect or explain it when such an organization keeps the app's
  connection out, so its private items may be missing without a message. The
  documentation tells developers to use a personal access token for these
  organizations, which Gitilizer does handle ([Q-90](#q-90)). Revisit once the
  app has been tried with one.
- Layouts for screens narrower than 1024 px, including phones, and touch input ([Q-54](#q-54)).
- Languages other than English, and a dark theme. Either may come later ([Q-56](#q-56)).

### Metrics

Gitilizer is a hobby project, so there are no success targets. The owner must still be able to see how it is used.

- **METRIC-1** The owner must be able to see, without writing queries, at least:
  - the total number of users (everyone who has ever signed in);
  - the number of users who have completed setup (see [Which screen is
    shown](#which-screen-is-shown));
  - the number of active users per day, per week and per month, including for past days;
  - the number of accounts that have been deleted (`SET-17`), in total and per month.
- **METRIC-2** Metrics should use what Google Cloud already provides (for example Cloud Monitoring dashboards) rather than a custom admin screen.
- **METRIC-3** The owner must also be able to see the health of the system, without writing queries and including for past days: the latency of API calls (by endpoint, median and 95th percentile), how long the app takes to load and show a usable list in developers' browsers, the HTTP status codes returned for page loads and API calls, and the error rates in `NFR-6`.
- **METRIC-4** The owner must be alerted by email, without having to look at the dashboard, when gitilizer.com stops responding, when more than 5% of API calls fail for 10 minutes, when no scan has finished for any developer in 30 minutes, or when Google stops accepting the key basic ranking uses (`RANK-22`). Alerts should use Cloud Monitoring.
- **METRIC-5** The owner must be able to see, without writing queries and
  including for past days, how much ranking each way of ranking does. One chart
  shows the number of items ranked each day for developers with a Gemini key,
  with a Claude key, with an OpenAI key, and on basic ranking. A second chart
  shows, for developers with a Gemini key, the number ranked each day at each
  step of `RANK-13`: by `gemini-3.8-flash`, by the backup model and by basic
  ranking. Every ranking of an item counts, re-rankings included (`RANK-16`).
  The first chart counts by the developer's choice, so basic ranking done for a
  Gemini key's developer counts there under the Gemini key. The charts cover at
  least the last six weeks, and the counts behind them are kept for 13 months.

---

## Glossary

| Term | Meaning |
|---|---|
| Item | A GitHub issue or PR. |
| Prioritized list | The ranked list of the developer's items. In Figma the screen is called "Issue inbox", and its tab is labeled "Prioritized". |
| Icebox | Items the developer has deliberately moved out of the Prioritized list. They have no rank. |
| Rank | An item's position in the Prioritized list: 1 is the most important. This document always says "rank" for the position. |
| Score | The number from 0.0 to 1.0 that the ranking agent gives each item. Ranks come from sorting by score. This document always says "score" for the number. |
| Priority | Used only as the name of the column that shows the rank, and of the sort order that puts rank 1 first. |
| Inclusion reason | Why an item is on the developer's list, for example "Assigned to you". See [Which items appear](#which-items-appear). |
| Additional repository | A repository the developer added in Settings. Its open items appear in the list even if the developer isn't otherwise involved. Earlier versions of this document called it an "interested repository". |
| Prioritization prompt | Optional free text that the developer gives one additional repository, telling the ranking agent what matters in it, for example "Security issues only". |
| Excluded repository | A repository, or an owner (an organization or a personal account), that the developer added under Excluded repositories in Settings. None of its items appear, whatever their inclusion reason. |
| Ranking agent | The AI that scores items with the developer's own API key: Gemini (Google), Claude (Anthropic) or OpenAI. The developer chooses one and gives Gitilizer its API key, on Warm Welcome (Gemini only) or in Settings. Until they do, basic ranking scores their items. This document also calls it "the agent". |
| Basic ranking | How Gitilizer scores the items of a developer who hasn't given it a ranking agent's API key: with a small model, using Gitilizer's own key and at its cost (`RANK-21`). It orders the top of the list well and the rest less precisely, and gives no reasoning. A developer can also choose it in Settings (`SET-38`). The interface calls it "basic ranking". |
| Ranking prompt | The instructions the ranking agent follows for every item. The developer can replace the default in Settings. |
| Collaborator | A GitHub user whose items and comments the developer wants scored higher. |
| Scan | A backend job that reads the developer's items from GitHub and finds new, changed and removed items. |
| Ranking | A backend job that asks the ranking agent to score items. |
| Sync | A scan, followed by ranking of any new and changed items. "Sync now" starts one. |
| Full re-rank | Ranking every item again, started by "Save and re-rank" in Settings, and once a day (`RANK-9`). Basic ranking never does one (`RANK-21`). |
| Icebox check | A short question to the agent, with its own prompt, asking whether a change to an item in the Icebox should bring it back (`ICE-6`). |
| Notification | An error or warning shown in the bell's popover. |
| PAT | A GitHub personal access token. The interface calls it a "GitHub personal access token", as GitHub does, or a "personal access token" where GitHub is already clear, and never a "GitHub token" or "scanning token". Where the interface mentions both credentials, the GitHub one comes first. |
| GitHub connection | How Gitilizer reads the developer's items on GitHub: the Gitilizer app or a PAT. A developer has one at a time. |
| Gitilizer app | Gitilizer's GitHub App, which has read-only access. The developer connects it to their GitHub account in one click, and installs it on the accounts and organizations whose private repositories Gitilizer should read. The interface calls it "the Gitilizer app". |

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
| Warm Welcome | [Warm Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=342-2832) (step 1, before GitHub is connected), [Warm Welcome · Connected](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=395-2871) (step 2, with the key field empty), [Warm Welcome · Connected · Key entered](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=401-2927) (step 2, with a key) | [Warm Welcome](#warm-welcome) |
| Prioritized list | [Issue inbox - Populated issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2562) | [Prioritized list](#prioritized-list) |
| Prioritized list, empty | [Issue inbox · No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-897) | [Empty, loading and first-sync states](#empty-loading-and-first-sync-states) |
| Prioritized list, first sync | [Issue inbox · Loading](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=289-3689), using [Shared / Skeleton rows](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=301-1433) on the Animations page (present it to see the pulse) | [Empty, loading and first-sync states](#empty-loading-and-first-sync-states) |
| List layout component | [Shared / Inbox layout](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-1000) | [Prioritized list](#prioritized-list) |
| Rank reasoning popup | [Issue inbox · Rank reasoning](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=337-7443) | [Columns](#columns) |
| Search and type filter | [Shared / Search and type filter](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2738), shown above the column headings in the list and Icebox frames; with a search and a filter in use: [Issue inbox · Filtered](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-2904); with nothing matching: [Issue inbox · No matches](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-3161) | [Search and type filter](#search-and-type-filter) |
| Sync now button | [Shared / Sync now](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=279-8369) on the Animations page (Idle and Syncing; present it to see the icon turn) | [Sync now](#sync-now) |
| Icebox | [Icebox · Populated issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=178-5947) | [Icebox](#icebox) |
| Icebox, empty | [Icebox - No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=190-2593) | [Icebox](#icebox) |
| Icebox row | [Icebox / Issue row · Restore](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=180-1403) | [Icebox](#icebox) |
| Settings | [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802), including the Ranking agent card, Additional repositories, Excluded repositories, Collaborators, Preferences, Delete account, and the save and cancel buttons | [Settings](#settings) |
| Settings with errors | [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237): a failed Validate, a ranking agent chosen without its API key, a duplicate repository, an excluded repository that can't be found, an exclusion that is already an additional repository, a prompt that's too long, a duplicate collaborator, and the save buttons disabled | [Saving](#saving) |
| Switching ranking agent | [Settings · Switch ranking agent](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=384-2631) | [Connections](#connections) |
| GitHub card | Connected with the Gitilizer app: in [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802). Its other states: [Settings · GitHub card · Reconnect needed](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=396-2937), [Settings · GitHub card · Missing permission](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=396-2955), [Settings · GitHub card · Token in use](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=396-3015), [Settings · GitHub card · Not set](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=397-2761) | [Connecting GitHub](#connecting-github) |
| Ranking agent choices | [Settings / Ranking agent option](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=383-2497), whose "No key" variant is basic ranking | [Connections](#connections) |
| Ranking agent card on basic ranking | [Settings · Ranking agent card · Basic ranking](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=406-2736) | [Connections](#connections) |
| Keyboard shortcuts | [Shared / Key cap](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2736), the "/" hint in the search field; [Settings / Preferences](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2761) and [Settings / Switch](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2760), in the left column of [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802); with shortcuts turned off: [Keyboard shortcuts · Turned off](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-3274) | [Keyboard shortcuts](#keyboard-shortcuts), [Preferences](#preferences) |

### Live reorder prototype

The [Animations](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=139-491) page shows how the Prioritized list changes when ranks change. Open it in Present mode and pick a flow; each flow plays on its own and loops. Flow 7 waits for you to move the pointer onto the table and off it again. The frames show 10 rows per page to keep them small; the behavior is the same at 25. They leave out the search and type filter strip (`LIST-34`), which doesn't change the animations. The [How to play these flows](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=151-8151) note on that page has the details.

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
| 2 | Signed in, and the developer hasn't yet completed setup. Setup is complete once GitHub is connected (with the Gitilizer app or a PAT) and the developer has chosen how their items are ranked: with "Continue with basic ranking" or "Save and start" on Warm Welcome (`WEL-4`), or by saving Settings with "Basic ranking", or a ranking agent that has a key, chosen (`SET-38`) | [Warm Welcome](#warm-welcome) |
| 3 | Signed in, anything else | The screen the developer navigated to. The default is the [Prioritized list](#prioritized-list). |

- **NAV-1** The rules above must be evaluated on every page load and whenever
  the condition changes, for example when the developer completes setup on Warm
  Welcome.
- **NAV-2** Once setup is complete, Warm Welcome is never shown again. If ranking or scanning can't work later (for example because a key is invalid or has expired), the developer sees the Prioritized list with an error notification.

### Routes

- **NAV-3** The screens must have these URLs on `https://gitilizer.com`: `/` for the Prioritized list and `/icebox` for the Icebox (each with `?page=N` for pages after the first, and with `?q=` and `?type=` while a search or type filter is in use, `LIST-40`), `/settings` (with `#connections`, `#additional-repositories`, `#excluded-repositories`, `#ranking-prompt`, `#collaborators` and `#account` for its sections) and `/sign-in`. Sort order is a stored preference, not part of the URL.
- **NAV-4** Moving between these screens must not reload the page.

### Moving between screens

- **NAV-5** The developer reaches Settings from the [account
  menu](#account-menu), from links in notifications and from the "settings" link
  in the empty Prioritized list. Before setup is complete, "Advanced setup" on
  Warm Welcome opens Settings at Connections (`WEL-2`).
- **NAV-6** The developer switches between the Prioritized list and the Icebox with the "Prioritized" / "Icebox" toggle above the table.
- **NAV-7** The Gitilizer symbol and wordmark in the app bar must link to the Prioritized list.
- **NAV-8** After a successful "Save changes" or "Save and re-rank", the developer must be taken to the Prioritized list. If something can't be saved (for example a prompt that's too long), they stay on Settings with the problems shown next to the fields (`SET-27`). Saving in Settings doesn't validate credentials (`SET-29`); saving on Warm Welcome does (`WEL-4`). The save that completes setup also goes to the list, which then shows the [first-sync state](#empty-loading-and-first-sync-states).
- **NAV-9** "Cancel" in Settings must discard unsaved changes and take the
  developer back to the Prioritized list. Under the rules in [Which screen is
  shown](#which-screen-is-shown), a developer who hasn't yet completed setup
  sees Warm Welcome instead, and the same applies after saving (`NAV-8`).

---

## Sign-in

Figma: [Sign in](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2978)

- **AUTH-1** Every Gitilizer feature must require sign-in.
- **AUTH-2** The developer must be able to sign in with Google or with GitHub ("Continue with Google", "Continue with GitHub"). The design must allow more providers to be added later.
- **AUTH-3** The first successful sign-in must create a Gitilizer account.
- **AUTH-4** The sign-in page must show the product introduction (headline, description and a static preview of the list), the sign-in buttons, the "Sign in first. Connect your tools next." explanation and the [footer](#footer). It has no app bar.
- **AUTH-5** Signing in with GitHub must not give Gitilizer access to the
  developer's items. Scanning always uses the developer's GitHub connection: the
  Gitilizer app, which the developer connects as a separate step on Warm Welcome
  or in Settings, or the PAT they enter there (`SET-42`). So a developer who
  signs in with Google connects GitHub in the same way, and the GitHub account
  that is connected need not be the one that signed in.
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
- **FOOT-3** The user documentation must exist at launch. At least, it must
  explain how connecting GitHub works: what the Gitilizer app can read, how to
  add private repositories and why an organization's owner may have to approve
  that, how to remove Gitilizer's access on GitHub, and when a personal access
  token is the better choice, which includes an organization that uses single
  sign-on, [Q-90](#q-90) (the page that "What Gitilizer can read" opens,
  `SET-48`); the two kinds of GitHub token and how to create one with the right
  permissions (the page that the GitHub token's "Learn more" opens, `SET-20`);
  how to create an API key for each ranking agent and what each costs (the pages
  that the ranking agent's "Learn more" opens, `SET-32`); how basic ranking
  differs from ranking with the developer's own key (the page that "Compare"
  opens, `WEL-3`); and what each [notification](#catalogue) means. It must also
  explain the limits of a
  free-tier Gemini API key: the small daily quota, how Gitilizer then falls back
  to a smaller model and finally to basic ranking (`RANK-13`), and how
  to get a key with billing turned on, with a link to Google's instructions.
- **FOOT-4** The user documentation must have a privacy section that explains, in plain language:
  - what Gitilizer stores about a developer ([Data and privacy](#data-and-privacy)), and that credentials are encrypted and never shown again (`PRIV-1`);
  - what the Gitilizer app can read on GitHub, and that it can't change anything
    there (`SET-44`, `SET-45`);
  - when it is deleted: an item's data 30 days after no developer has it (`PRIV-5`), everything about a developer immediately when they delete their account (`SET-17`), and copies in backups within 6 months (`PRIV-4`);
  - what Gitilizer sends to the developer's ranking agent, with the developer's
    own key: the content of the developer's own issues and PRs, including
    comments and reviews, and the developer's settings, never their credentials
    (`PRIV-1`, `PRIV-2`);
  - that for a developer on basic ranking, Gitilizer sends the same content to
    Google itself, with its own key on a paid tier, where Google doesn't use the
    content to improve its products (`RANK-21`, `PRIV-2`);
  - for each ranking agent, what its provider's terms say about using content
    sent through its API, with a link to them. For example, Google's terms let
    it use content sent with a free-tier Gemini key to improve its products.
    This content can come from private repositories.

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
  - the **heading**, which names the problem, for example "Your GitHub personal access token has expired";
  - the **body**, which describes the consequence and how to fix it.
- **NOTIF-9** A mention of the Settings page in a body must be a link that opens
  Settings in the same tab, scrolled to the control that fixes the problem, with
  keyboard focus on it. For example, a GitHub token error focuses the personal
  access token field, "Your GitHub connection has ended" focuses "Reconnect
  GitHub", and "Gitilizer can't access {repo}" focuses that repository's row. A
  mention of an external resource (for example githubstatus.com or the Google AI
  Studio status page) must be a link that opens in a new tab.
- **NOTIF-10** The developer can't dismiss notifications. A notification stays until its condition is resolved.
- **NOTIF-19** Notifications must be listed errors first, then warnings, and oldest first within each severity.
- **NOTIF-20** The popover must close on a click outside it, on Esc and when the developer follows a link in it. Keyboard focus must move into the popover when it opens, and return to the bell when it closes. The popover is at most 480 px tall and scrolls beyond that.

### Lifecycle

- **NOTIF-11** The backend must create a notification when it detects one of the conditions in the [catalogue](#catalogue), and store it for the developer with its first-detected time. Only one notification of each type (and, where the heading has one, each `{org}` or `{repo}`) can be active at a time.
- **NOTIF-12** "Can't connect to Gitilizer" is the exception. The web app must detect it and show it itself, because the backend can't be reached.
- **NOTIF-13** A notification must be removed as soon as the developer has
  plausibly fixed the problem. For example, saving a new PAT, or connecting
  GitHub again (`SET-43`), must clear every notification about the GitHub
  connection at once. If the problem comes back, the notification is shown again
  with a new first-detected time.
- **NOTIF-14** A notification whose condition clears without the developer doing anything (a rate limit resets, GitHub recovers) must be removed when the backend next observes that the condition is gone.
- **NOTIF-15** The web app must update the bell and the popover without a page reload when notifications are added or removed.
- **NOTIF-16** Before setup is complete, no notification is shown for a missing
  GitHub connection or ranking agent API key, because Warm Welcome covers that
  case. After setup, a missing one is an error ("GitHub isn't connected" or "No
  {agent} API key is set"). Settings can replace the GitHub connection but not
  remove it (`SET-42`), and can remove only the key of an agent that isn't in
  use (`SET-39`), so this can happen only through a fault. A developer on basic
  ranking (`RANK-21`) has no agent in use, so for them no key is missing.
- **NOTIF-21** Short-lived problems (rows marked "short-lived" in the catalogue: rate limits, "isn't responding", "limiting requests") often fix themselves after a retry. Gitilizer must retry them without telling the developer for 15 minutes, and then show them as **warnings**. The first-detected time is when the problem started, not when the warning appeared. If one lasts long enough to stop the list updating, "Your issues haven't updated since {time}" (an error, after 3 hours) covers it.
- **NOTIF-22** The PAT expiry warning must first appear 7 days before the PAT
  expires. Its body counts down the days ("will expire in 3 days", as in Figma's
  example). A connection made with the Gitilizer app renews itself, so it has no
  expiry warning (`SET-46`).
- **NOTIF-23** Notifications about a ranking agent appear only for the agent in
  use. Switching agents (`SET-40`) clears every notification about the previous
  one, as saving a new key does (`NOTIF-13`).

### Catalogue

`{braces}` are placeholders. Times are shown in the developer's local time zone.

| Severity | Summary | Heading | Consequence and fix | Detected when | Clears when |
|---|---|---|---|---|---|
| Error | GitHub connection | Your GitHub personal access token has expired | Scanning is paused. Replace your personal access token in Settings. | GitHub returns 401 after the expiry date that GitHub sent in the `GitHub-Authentication-Token-Expiration` header of earlier responses. | A new PAT is saved, or GitHub is connected with the Gitilizer app. |
| Error | GitHub connection | Your GitHub personal access token isn't valid | Scanning is paused. The token may have been revoked, deleted or mistyped. Replace your personal access token in Settings. | Any other 401, or GitHub's temporary 403 after repeated failed authentication. | A new PAT is saved, or GitHub is connected with the Gitilizer app. |
| Error | GitHub connection | {org} doesn't allow this type of token | Issues and PRs from {org} are missing from your list. {org} blocks {classic / fine-grained} personal access tokens. Create the other type of token, or ask an owner of {org} to allow this one. | 403 whose message says the organization "forbids access via a personal access token (classic)" or "…with fine-grained permissions". | A new PAT is saved, GitHub is connected with the Gitilizer app, or a request to {org} succeeds. |
| Error | GitHub connection | Your GitHub personal access token can't read {permission} | Some of your issues and PRs can't be read, so your list may be incomplete. Give the token read access to {permission}, or create a new token and add it in Settings. The documentation lists the permissions Gitilizer needs. | 403 "Resource not accessible by personal access token"; the `X-Accepted-GitHub-Permissions` header names the permission. | A new PAT is saved, GitHub is connected with the Gitilizer app, or a request that needs {permission} succeeds. |
| Error | GitHub connection | Your token isn't authorized for {org} | Issues and PRs from {org} are missing from your list. {org} uses single sign-on, so the token must be authorized for it. Authorize it in your GitHub personal access token settings, then choose Sync now. | 403 with an `X-GitHub-SSO` header, or `X-GitHub-SSO: partial-results` on a search. | A new PAT is saved, GitHub is connected with the Gitilizer app, or a request to {org} succeeds. |
| Error | GitHub connection | Your GitHub connection has ended | Scanning is paused. Access was removed on GitHub, or Gitilizer hasn't been opened for six months. Reconnect GitHub in Settings. | With the Gitilizer app connected: GitHub refuses to renew the connection, or answers 401 after renewing it (`SET-46`). | GitHub is connected again, or a PAT is saved. |
| Warning | GitHub connection | Gitilizer can't read {permission} in {account} | Private issues and PRs from {account} may be missing from your list. {account} hasn't approved the Gitilizer app's access to {permission}. Review it on GitHub. | With the Gitilizer app connected: the app's installation on {account} lacks one of the permissions in `SET-44`, or GitHub answers 403 "Resource not accessible by integration" for a repository of {account}. | The installation has the permission, the app is removed from {account}, or a PAT is saved. |
| Error | GitHub connection | GitHub sent an unexpected response | Your list may be missing recent changes. Gitilizer keeps retrying automatically. If this continues, report it using the GitHub link at the bottom of the page. | Any other 4xx, a GraphQL `errors` array, or a response that can't be parsed, after retries. | A scan succeeds. |
| Warning (short-lived) | GitHub connection | GitHub's rate limit has been reached | Scanning is paused until {time}, when GitHub resets the limit, and then resumes automatically. Other tools that read GitHub as you count toward the same limit. | 403 or 429 with `x-ratelimit-remaining: 0`, or a secondary rate limit message, for more than 15 minutes (`NOTIF-21`). | A GitHub request succeeds. |
| Warning (short-lived) | GitHub connection | GitHub isn't responding | Scanning is paused. Gitilizer keeps retrying automatically. If this continues, check [githubstatus.com](https://www.githubstatus.com). | 5xx responses, timeouts or connection failures that continue after retries for more than 15 minutes (`NOTIF-21`). | A scan succeeds. |
| Error | Additional repositories | Gitilizer can't access {repo} | Issues and PRs from {repo} are missing from your list. Check the name in Settings, or make sure your GitHub connection can read {repo}. | 404 on `GET /repos/{repo}`, or 422 on a search that uses `repo:`. | The repository is removed in Settings, a new PAT is saved, GitHub is connected again, or a request to {repo} succeeds. |
| Error | Gemini connection | Your Gemini API key isn't valid | New and changed issues and PRs aren't being ranked. Create a new key in Google AI Studio and add it in Settings. | 400 `API_KEY_INVALID`, or 401. | A new key is saved. |
| Error | Gemini connection | Google has disabled your Gemini API key | Google reported the key as leaked, so it no longer works. New and changed issues and PRs aren't being ranked. Create a new key in Google AI Studio and add it in Settings. | 403 "Your API key was reported as leaked". | A new key is saved. |
| Error | Gemini connection | Your Gemini API key can't use the Gemini API | New and changed issues and PRs aren't being ranked. The key may be restricted to other Google APIs, or its project may not allow the Gemini API. Create a new key in Google AI Studio and add it in Settings. | Any other 403 `PERMISSION_DENIED`. | A new key is saved, or a Gemini request succeeds. |
| Error | Gemini connection | Your Gemini credits have run out | New and changed issues and PRs aren't being ranked. Add credits or turn on auto-reload in Google AI Studio. | 402. | A Gemini request succeeds, or a new key is saved. |
| Error | Gemini connection | Your Gemini project needs billing | New and changed issues and PRs aren't being ranked. The key's Google Cloud project needs a working billing account, or has a past-due balance. Fix billing in the Google Cloud console. | 400 `FAILED_PRECONDITION` about billing, or 403 for an unpaid balance. | A Gemini request succeeds, or a new key is saved. |
| Warning | Gemini connection | Gitilizer is using a backup Gemini model | Your daily quota for {primary model} is used up, so new and changed issues and PRs are being ranked with {backup model} until it resets at {time}, in about {duration}. Rankings may be less accurate until then. To avoid this, turn on billing in Google AI Studio. When the step in use is basic ranking, the heading is "Gitilizer is using basic ranking" and the text begins "Your Gemini daily quota is used up, so new and changed issues and PRs are being ranked with basic ranking until it resets at {time}". | 429 for a per-day quota on either of the developer's models in `RANK-13`. Only one is active at a time; it names what is now in use: the backup model, or "basic ranking" once the backup model's quota is used up too. | The primary model's quota resets. |
| Warning | Ranking | Basic ranking is paused | Gitilizer's own ranking quota is used up, so new and changed issues and PRs aren't being ranked. Ranking resumes automatically when the quota resets at {time}, in about {duration}. To rank without waiting, add your own API key in Settings. When the limit isn't a daily quota, so Gitilizer doesn't know when it ends, the second sentence is "Ranking resumes automatically when more quota is available." For a developer with a Gemini key, it begins "Your Gemini daily quota is used up, and so is Gitilizer's own ranking quota," and ends "To avoid this, use an API key with billing turned on."; it then replaces the backup-model warning. | Google refuses Gitilizer's own key because a quota or spending limit is used up (`RANK-22`), for a developer who has an item waiting for basic ranking. Google resets daily quotas at midnight Pacific time. | The developer has no item waiting for basic ranking any more: basic ranking ranks them, their own Gemini key ranks them once its quota resets (`RANK-13`), or the developer switches to a ranking agent (`SET-40`). |
| Warning (short-lived) | Gemini connection | Gemini is limiting requests from your key | Ranking is slower than usual and catches up automatically. Other apps that use this key count toward the same limit. | 429 for a per-minute limit, for more than 15 minutes (`NOTIF-21`). | Gemini requests succeed without 429s for 15 minutes. |
| Warning (short-lived) | Gemini connection | Gemini isn't responding | New and changed issues and PRs aren't being ranked. Gitilizer keeps retrying automatically. If this continues, check the [Google AI Studio status page](https://aistudio.google.com/status). | 500, 503 or 504 responses, no answer within 90 seconds, or connection failures that continue after retries for more than 15 minutes (`NOTIF-21`). | A Gemini request succeeds. |
| Error | Gemini connection | The Gemini model Gitilizer uses isn't available | New and changed issues and PRs aren't being ranked. This is a problem with Gitilizer, not with your key. Report it using the GitHub link at the bottom of the page. | 404 `model_not_found`. | A Gemini request succeeds. |
| Error | Gemini connection | Gemini sent an unexpected response | New and changed issues and PRs may not be ranked. Gitilizer keeps retrying automatically. If this continues, report it using the GitHub link at the bottom of the page. | Any other Gemini error, after retries. | A Gemini request succeeds. |
| Error | Claude connection | Your Claude API key isn't valid | New and changed issues and PRs aren't being ranked. Create a new key in the Claude Console and add it in Settings. | 401 `authentication_error`. | A new key is saved. |
| Error | Claude connection | Your Claude API key can't use the model Gitilizer uses | New and changed issues and PRs aren't being ranked. The key's workspace may not allow the model. Create a key without that restriction in the Claude Console and add it in Settings. | 403 `permission_error`. | A new key is saved, or a Claude request succeeds. |
| Error | Claude connection | Your Anthropic credits have run out | New and changed issues and PRs aren't being ranked. Add credits, or raise your spend limit, in the Claude Console. | 402 `billing_error`; 400 saying the credit balance is too low or a spend limit was reached; or 429 for a monthly spend cap, which has no `retry-after` header. | A Claude request succeeds, or a new key is saved. |
| Warning (short-lived) | Claude connection | Claude is limiting requests from your key | Ranking is slower than usual and catches up automatically. Other apps that use this key count toward the same limit, and keys on a higher usage tier get higher limits. | Any other 429 `rate_limit_error`, for more than 15 minutes (`NOTIF-21`). | Claude requests succeed without 429s for 15 minutes. |
| Warning (short-lived) | Claude connection | Claude isn't responding | New and changed issues and PRs aren't being ranked. Gitilizer keeps retrying automatically. If this continues, check [status.claude.com](https://status.claude.com). | 500, 504 or 529 (`overloaded_error`) responses, no answer within 90 seconds, or connection failures that continue after retries for more than 15 minutes (`NOTIF-21`). | A Claude request succeeds. |
| Error | Claude connection | The Claude model Gitilizer uses isn't available | New and changed issues and PRs aren't being ranked. This is a problem with Gitilizer, not with your key. Report it using the GitHub link at the bottom of the page. | 404 `not_found_error` for the model. | A Claude request succeeds. |
| Error | Claude connection | Claude sent an unexpected response | New and changed issues and PRs may not be ranked. Gitilizer keeps retrying automatically. If this continues, report it using the GitHub link at the bottom of the page. | Any other Claude error, after retries. | A Claude request succeeds. |
| Error | OpenAI connection | Your OpenAI API key isn't valid | New and changed issues and PRs aren't being ranked. Create a new key in the OpenAI dashboard and add it in Settings. | 401 "Incorrect API key provided" or "Invalid Authentication". | A new key is saved. |
| Error | OpenAI connection | Your OpenAI API key can't use the model Gitilizer uses | New and changed issues and PRs aren't being ranked. The key may be restricted, its project may not allow the model, or OpenAI may not serve your region. Check the key in the OpenAI dashboard, or create a new one and add it in Settings. | 403, including "Country, region, or territory not supported". | A new key is saved, or an OpenAI request succeeds. |
| Error | OpenAI connection | Your OpenAI credits have run out | New and changed issues and PRs aren't being ranked. Add credits, or raise your spend or usage limit, in the OpenAI dashboard. | 429 `insufficient_quota`, `credit_balance_exhausted`, or a spend or usage limit code such as `project_spend_limit_exceeded`. | An OpenAI request succeeds, or a new key is saved. |
| Warning (short-lived) | OpenAI connection | OpenAI is limiting requests from your key | Ranking is slower than usual and catches up automatically. Other apps that use this key count toward the same limit, and higher usage tiers get higher limits. | Any other 429, for more than 15 minutes (`NOTIF-21`). | OpenAI requests succeed without 429s for 15 minutes. |
| Warning (short-lived) | OpenAI connection | OpenAI isn't responding | New and changed issues and PRs aren't being ranked. Gitilizer keeps retrying automatically. If this continues, check [status.openai.com](https://status.openai.com). | 500 or 503 responses, no answer within 90 seconds, or connection failures that continue after retries for more than 15 minutes (`NOTIF-21`). | An OpenAI request succeeds. |
| Error | OpenAI connection | The OpenAI model Gitilizer uses isn't available | New and changed issues and PRs aren't being ranked. This is a problem with Gitilizer, not with your key. Report it using the GitHub link at the bottom of the page. | 404 `model_not_found`. | An OpenAI request succeeds. |
| Error | OpenAI connection | OpenAI sent an unexpected response | New and changed issues and PRs may not be ranked. Gitilizer keeps retrying automatically. If this continues, report it using the GitHub link at the bottom of the page. | Any other OpenAI error, after retries. | An OpenAI request succeeds. |
| Error | Ranking | Your ranking prompt isn't working | Most new and changed issues and PRs couldn't be ranked with your custom prompt. Edit the prompt, or restore the default prompt in Settings. | A custom prompt is set and more than half of the items in a ranking run fail to produce valid output. | The prompt is changed, or a ranking run succeeds. |
| Warning | Ranking | Gitilizer couldn't rank {n} issues and PRs | These issues and PRs are shown without a rank. Gitilizer tries again when they change. | Individual items fail after retries (blocked response, output cut off, invalid output). See `LIST-30`. | Every one of them is ranked or leaves the list. |
| Error | Gitilizer | Can't connect to Gitilizer | Your list won't update until the connection comes back. Check your internet connection. | The web app's requests to the Gitilizer API fail. Detected in the browser. | A request succeeds. |
| Error | Gitilizer | Gitilizer couldn't finish scanning | Your list may be missing recent changes. Gitilizer tries again at the next scan. If this continues, report it using the GitHub link at the bottom of the page. | The backend's own scan job fails for a reason other than GitHub. | A scan succeeds. |
| Error | Gitilizer | Your issues and PRs haven't updated since {time} | No scan has finished in 3 hours, so your list may be missing recent changes. Try Sync now. If this continues, report it using the GitHub link at the bottom of the page. | No scan has succeeded for 3 hours. This catches failures the other rows miss. | A scan succeeds. |
| Warning | GitHub connection | Your GitHub personal access token will expire soon | Your GitHub personal access token will expire in {n} days. Create a new one and add it to Settings. | The stored expiry date is 7 days away or less (`NOTIF-22`). | A PAT with a later expiry date is saved, or GitHub is connected with the Gitilizer app. |

Not in the catalogue, by decision:

- "Some of your issues couldn't be loaded" (a search with more than 1,000 results). The list keeps only the 1,000 most recently updated items (`LIST-19`), so no search ever needs more than its first 1,000 results (`SCAN-1`).
- "There's no GitHub user named @{name}". Settings shows this next to the collaborator instead (`SET-19`).
- "Your GitHub personal access token belongs to @{login}". The Validate result names the token's account instead (`SET-28`).

---

## Warm Welcome

Figma: [Warm Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=342-2832), [Warm Welcome · Connected](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=395-2871), [Warm Welcome · Connected · Key entered](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=401-2927)

Setup happens on Warm Welcome itself, in two steps, so a new developer can start
with one button: they connect GitHub, and then add a Gemini API key or continue
without one ([Q-92](#q-92)). A developer who wants a personal access token, or
Claude or OpenAI, sets up in Settings instead.

- **WEL-1** Warm Welcome must be shown under the conditions in [Which screen is shown](#which-screen-is-shown). It is therefore always the first screen after a developer's first sign-in.
- **WEL-2** It must show the app bar, the footer and a panel with the title
  "Welcome to your prioritized inbox" and the text "Connect GitHub to get
  started. Add a free Gemini API key for the best ranking, or skip it for now.",
  which are the same in both steps. In step 1, before GitHub is connected, the
  panel has the GitHub connection (`WEL-6`) and, under a rule, the line "Using
  Claude, OpenAI or a personal access token?" with the link "Advanced setup" at
  its right, which opens Settings at Connections (`NAV-5`). In step 2, once
  GitHub is connected, it has the GitHub connection (`WEL-6`), the Gemini API
  key (`WEL-3`) and the button that finishes setup (`WEL-4`), and no "Advanced
  setup" line. A developer who leaves after connecting comes back to step 2. A
  developer who chose how their items are ranked in Settings before connecting,
  for example by saving a Claude key there, never sees step 2: connecting GitHub
  completes their setup ([Which screen is shown](#which-screen-is-shown)), and
  they go to the first-sync state of the Prioritized list.
- **WEL-3** The field "Gemini API key" must work as in Settings: masked, with
  the eye icon, a "Validate" button and its results (`SET-1`, `SET-2`,
  `SET-21`, `SET-28`), and the link "Get an API key ↗" (`SET-4`) at the right
  of its label's row. Beside the label are the pills "Recommended" and "Free
  tier available", as on the Gemini choice in Settings (`SET-38`). The empty
  field shows "Paste your key, or leave blank". Under the field is the guidance
  text "Gemini ranked best in our tests, and Google's free tier costs nothing.
  Without a key you get basic ranking: good for your top items, less precise
  below them, with no explanation for each rank.", with "Compare ↗" inline at
  its end, which opens, in a new tab, the documentation about basic ranking
  (`FOOT-3`). A Gemini key already saved from Settings appears as dots, as it
  does there. The link, guidance text and Validate results use the same
  typeface, style and size as in Settings, and so does the note beside the
  button (`WEL-4`); only the field labels are bolder, because the fields have
  no card titles above them.
- **WEL-4** Step 2 must have one button, whose label depends on the key field.
  While the field is empty, it is "Continue with basic ranking", with the note
  "You can add a key anytime in Settings." beside it. Choosing it completes
  setup with basic ranking (`RANK-21`). Once the field has a value, typed or
  already saved, the button is "Save and start" and the note is gone. Choosing
  it validates a typed value that hasn't passed Validate as typed, showing
  progress and the result under the field as Validate does (`SET-28`). If the
  value passes, it is saved, Gemini becomes the developer's ranking agent and
  setup is complete. If it fails, nothing is saved and the developer stays on
  Warm Welcome with the failure under the field ([Q-82](#q-82)). The button is
  disabled while a check is running. When setup completes, the developer goes
  to the [first-sync state](#empty-loading-and-first-sync-states) of the
  Prioritized list (`SET-5`). A connection made with "Connect GitHub" is saved
  as soon as GitHub returns (`SET-43`), not by the button.
- **WEL-5** Removed on 2026-11-15. Warm Welcome no longer offers the three
  ranking agents as tiles: it offers Gemini's key only, and Claude and OpenAI
  are chosen in Settings (`SET-38`, [Q-92](#q-92)).
- **WEL-6** The GitHub connection comes first, under the label "GitHub". It has
  two states, as in Figma:
  - **Before connecting**, in step 1. The link "What Gitilizer can read ↗"
    (`SET-48`) at the right of the label; a dark, full-width "Connect GitHub"
    button with the GitHub icon, which starts the connection (`SET-43`); and
    the note "Read-only access to your issues and pull requests. Gitilizer
    can't change anything on GitHub."
  - **Connected**, in step 2, when the developer returns from GitHub. A box
    with the account's avatar, "Connected as @{login}" and a green check mark
    with "Connected"; under a rule, "Public repositories" with "Included", and
    "Private repositories" with the link "Add on GitHub ↗" (`SET-45`). The
    link and the note of the first state aren't shown.

  Warm Welcome has no personal access token field: a developer who wants one
  chooses "Advanced setup" (`WEL-2`). Connecting a different account is done in
  Settings ("Reconnect", `SET-47`).

  Adding private repositories isn't part of setup. The list starts with the
  developer's public items, and private ones join it once the Gitilizer app is
  installed on their accounts (`SET-45`). Nothing after setup reminds the
  developer of this, or that ranking is basic ([Q-95](#q-95)).

---

## Prioritized list

Figma: [Issue inbox - Populated issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2562), [Issue inbox · No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-897), [Shared / Inbox layout](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-1000)

The Prioritized list is a table of the developer's open items in rank order, 25 per page, with controls above it for switching to the Icebox and starting a sync. A strip at the top of the table searches the list and filters it by type.

### Which items appear

- **LIST-1** An item must appear in the list if it is open, is not in an archived repository, is not excluded (`SET-34`, `SET-35`), and at least one of these is true:
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
  rank, so an item scored by basic ranking doesn't (`RANK-21`). The agent's
  next action must not be shown. When the popup closes with the close button
  or Esc, keyboard focus returns to the rank; a click elsewhere leaves focus
  where the click puts it. The popup closes if its item leaves the page.

### Sorting the list

- **LIST-6** The table must be sortable by Priority (the default), Issue, Repository and Modified. The active column is shown in the accent color with an arrow.
- **LIST-7** Sorting by Issue sorts by **type**, not by title. Ascending order puts PRs before issues.
- **LIST-8** When sorting by Issue, Repository or Modified, ties must be broken by issue number, ascending.
- **LIST-9** The sort order must be stored on the account, separately for the Prioritized list and the Icebox, so it is kept between visits and follows the developer to other devices.
- **LIST-10** Sorting applies immediately and is never held back by the rules in [Live updates](#live-updates).
- **LIST-25** Clicking a column that isn't active must sort by it in its first direction: Priority with rank 1 first, Issue with PRs first, Repository A–Z, Modified newest first. Clicking the active column must reverse the direction.
- **LIST-26** Changing the sort must return to page 1.

### Search and type filter

Figma: [Shared / Search and type filter](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2738), [Issue inbox · Filtered](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-2904), [Issue inbox · No matches](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-3161)

- **LIST-34** The table must have a strip above its column headings with a
  search field and, to its right, a type filter. The strip is shown in every
  state of the table, as the column headings are, including the empty and
  first-sync states (`LIST-14`, `LIST-15`).
- **LIST-35** The search field's placeholder is "Search title, repo or #number".
  The list must narrow as the developer types, without Enter. An item matches
  when every word typed is found, ignoring case, in its title, its repository
  (`owner/name`) or its number, written with or without "#" ("842" or "#842").
  The inclusion reason and the agent's reasoning aren't searched. A field that
  holds only spaces counts as empty, and no search is in use. Once the field
  isn't empty, a clear button (×, named "Clear search") at its right end
  empties it and leaves focus in the field. With focus in the field, Esc
  empties it. Esc in an empty field moves focus out of it: back to the control
  that had focus before "/" moved it to the field (`KEY-1`), when that is how
  the developer got there and the control is still on the page, and otherwise
  to no control.
- **LIST-36** The type filter has three choices, "All", "PRs" and "Issues", of
  which one is always chosen. "All" is the default, "PRs" shows only PRs and
  "Issues" shows only issues. The search and the type filter apply together.
- **LIST-37** Searching and filtering must not change an item's rank. The
  Priority column keeps showing the item's rank in the whole list, so a
  filtered list can read 2, 4, 16, as in
  [Issue inbox · Filtered](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-2904).
  The sort order (`LIST-6`) applies to the items that match.
- **LIST-38** Changing the search text or the type filter must return to page
  1, as changing the sort does (`LIST-26`). Pages are made of the matching
  items only (`LIST-11`, `LIST-12`). While a search or type filter is in use,
  the item count (`LIST-27`) reads "{n} of {N} issues and PRs", where {n} is
  the number of matching items and {N} is the number there would be without
  the search and filter, for example "3 of 62 issues and PRs".
- **LIST-39** If the developer has items but none of them match, the table
  body must be replaced by "No matching issues or PRs" and a "Clear filters"
  button, as in
  [Issue inbox · No matches](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-3161).
  "Clear filters" empties the search field and chooses "All". The count reads
  "0 of {N} issues and PRs". Two states come first, whatever the search and
  filter are. While the first sync is running and there is no row to show,
  because nothing is ranked yet or nothing ranked so far matches, the table
  stays in the first-sync state (`LIST-15`). And a developer with no items at
  all sees the empty state in `LIST-14`.
- **LIST-40** The search text and the type filter must be in the URL, as `q`
  and `type` (`type=pr` or `type=issue`; no `type` means "All"), for example
  `/?type=pr&q=api`, so that reloading the page and the browser's Back and
  Forward buttons keep them, and a filtered list can be bookmarked (`NAV-3`).
  `q` holds the search text without the spaces at its ends, and is left out
  when the field is empty (`LIST-35`). Changing pages keeps both
  (`/?type=pr&q=api&page=2`), and so does changing the sort. Typing in the
  search field, and its clear button, replace the current history entry
  instead of adding one for each character. Choosing a type and "Clear
  filters" add an entry, as changing pages does, so Back undoes them. Unlike
  the sort order (`LIST-9`), the search and filter aren't stored on the
  account, and the "Prioritized" / "Icebox" toggle (`NAV-6`) opens the other
  view without them.
- **LIST-41** [Live updates](#live-updates) keep working while a search or
  type filter is in use, and their rules apply to the rows that are shown. Row
  indicators still show the change in the item's rank in the whole list
  (`LIVE-18`). An item that starts or stops matching because it changed on
  GitHub, such as an edited title, appears or goes without a leaving label
  (`LIVE-25`). Searching and filtering are the developer's own actions, so
  they apply immediately (`LIVE-7`). For `LIVE-4` and `LIVE-5`, the strip
  isn't part of the table: the pointer over it, or keyboard focus in it,
  doesn't hold updates.

### Pages

- **LIST-11** Each page must show 25 items.
- **LIST-12** Below the table there must be a "Previous" button (disabled on the first page), numbered page buttons, with the current page highlighted, and a "Next" button (disabled on the last page). When there isn't room for a button per page, show the first page, the last page, the current page and one page on each side of it, with "…" for each gap. When the table has no rows to show (`LIST-14`, `LIST-15`, `LIST-39`, `ICE-7`), the row is still there, with "Previous", one page button, "1", and "Next", and both "Previous" and "Next" disabled.
- **LIST-27** The left end of the pagination row must show the number of items, "{N} issues and PRs", in every state, including "0 issues and PRs" when the list is empty. While a search or type filter is in use it reads "{n} of {N} issues and PRs" (`LIST-38`).
- **LIST-13** Changing pages applies immediately and is never held back by the rules in [Live updates](#live-updates).

### Empty, loading and first-sync states

- **LIST-14** If the developer has no items and at least one sync has finished, the table body must be replaced by "No issues or PRs to show 🎉" and "You can choose more repositories in the settings.", where "settings" opens Settings at Additional repositories, with focus on the "Add repository" field.
- **LIST-15** While the first sync is running and nothing has been ranked yet, the table must show the column headings, three skeleton rows and "Scanning your issues and PRs…", as in [Issue inbox · Loading](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=289-3689). The skeleton placeholders pulse, fading to about a third of their strength and back, 0.8 s each way ([Shared / Skeleton rows](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=301-1433)); with reduced motion they don't pulse. As soon as the first item has been ranked, the list replaces the skeleton rows, and further items appear as they are ranked. With a search or type filter in use, that is the first item that matches (`LIST-39`).
- **LIST-30** An item must not be shown in the Prioritized list until it has
  been ranked. Two kinds of unranked item are shown after all ranked items,
  newest first, with "–" in the Priority column: an item waiting because ranking
  is paused (`RANK-20`), and an item whose ranking failed. For a failed item
  (`RANK-6`), the "Gitilizer couldn't rank {n} issues" warning is shown (see the
  [catalogue](#catalogue)).

### Sync now

Figma: [Shared / Sync now](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=279-8369)

- **LIST-16** A "Sync now" button must start a sync: a scan for new, changed and removed items, followed by ranking of only the new and changed items. "Save and re-rank" (`SET-15`) also starts a sync, one that ranks every item again. The daily re-rank (`RANK-9`) isn't a sync: it doesn't turn the icon, disable the button or show progress (`LIST-33`), and only its result is shown (`LIVE-24`).
- **LIST-17** While any sync is in progress, whether the developer started it or it started automatically (`SCAN-5`), the button must show the **Syncing** state: its icon, in the accent color, turns clockwise once per second. With reduced motion, the icon is still and in the accent color.
- **LIST-28** The button must be disabled while a sync is in progress, whether the developer started it or it started automatically (`SCAN-5`), and enabled again as soon as the sync finishes (`LIST-32`). There is no other minimum interval between manual syncs.
- **LIST-32** A sync counts as finished, and the icon stops turning, when the
  scan has finished and every new and changed item (after "Save and re-rank",
  every item it can reach, `RANK-13`) has been ranked, has failed, or is waiting
  because ranking is paused (`RANK-20`). Waiting items are shown with "–"
  (`LIST-30`), and the error that paused ranking explains the wait, so the icon
  doesn't keep turning until, for example, the developer adds credits.
- **LIST-33** While a sync is in progress, text next to the button must show how far it has got (GitHub issue #5), as in [Inbox controls · Sync Progress](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=325-6832).
  - While a full scan is finding items: "Finding issues and PRs… {n} so far", where {n} is the number of distinct open items found so far that aren't in the Icebox, at most 1,000 (`LIST-19`). It goes up as each search finishes. Until the first search finishes, the text is "Finding issues and PRs…".
  - Once every search has finished, and for the whole of an incremental scan: "{n} left to rank", where {n} counts the items the sync will rank that haven't been ranked yet, including any still being downloaded, plus the Icebox checks it hasn't made yet (`ICE-6`). An item whose ranking failed (`LIST-30`) is done. {n} may go up during a sync as linked items are found (`RANK-10`).
  - While ranking is held up by the ranking agent's per-minute limits or a
    retry: "{n} left to rank · waiting for {agent}" ("waiting for basic
    ranking" for a developer on basic ranking).
  - No text when {n} is 0, or when every remaining item is waiting because
    ranking is paused (`RANK-20`, `LIST-32`).
  - The text changes at most once every 2 seconds, so it doesn't flicker, except
    that it disappears as soon as the sync finishes. "· waiting for {agent}"
    appears only after 5 seconds without progress, and goes as soon as {n}
    changes.

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
- **LIVE-27** Updates must also be held while a rank reasoning popup
  (`LIST-24`) is open, wherever the pointer and focus are, until it has been
  closed for 1 second, so rows don't move while the developer reads it.
- **LIVE-6** Updates must be held while the browser tab is hidden or the Icebox is shown. They play when the developer returns to the list.
- **LIVE-7** The developer's own actions (Move to icebox, sorting, changing pages, searching and filtering) must apply immediately and are never held.

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
  | It was excluded (`SET-34`) | Excluded |
  | The Icebox check brought it back to the Prioritized list (`ICE-6`, `ICE-9`; shown in the Icebox) | Back in your list |

- **LIVE-26** An item that leaves because of the 1,000-item limit (`LIST-19`) shows no label. It moves off the bottom of the page as an item moving to a later page does (`LIVE-13`).

### Row indicators

- **LIVE-18** An item whose rank changed must show how far it moved next to its rank ("↑5", "↓3", or "New" for a new item) and a light highlight, both for 3 seconds.

### Other sort orders

- **LIVE-19** When the table is sorted by Issue, Repository or Modified, a change that affects only the rank must update the rank number in place, with the row indicators, and the row must not move.
- **LIVE-20** A change that affects the sorted column (for example new activity while sorted by Modified) must follow the animation rules above.

### Accessibility of updates

- **LIVE-21** Screen readers must hear one announcement per group of updates (for example "3 issues and PRs changed rank"), not one per item.
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
- **ICE-7** If the Icebox is empty, the table body must be replaced by "No issues or PRs in the Icebox". If it has items but none match the search and type filter, it shows "No matching issues or PRs" and "Clear filters", as the Prioritized list does (`LIST-39`).
- **ICE-8** Pages, sorting, the search and type filter (`LIST-34` to `LIST-41`), the item count and "Sync now" must work as in the Prioritized list. `LIST-37` doesn't apply, because the Icebox has no ranks (`ICE-2`).
- **ICE-9** While the Icebox is shown, an item that leaves it (it returns to the list under `ICE-6`, or leaves under `ICE-11`) must use the leave animation in `LIVE-15`, without the holding rules in [When updates wait](#when-updates-wait).
- **ICE-10** A restored item must keep its last score. (An item that changed while in the Icebox will usually have returned to the list already, under `ICE-6`, and been ranked again.)
- **ICE-11** An item that would no longer be eligible for the Prioritized list must leave the Icebox automatically. That includes items that are closed or merged, items that no longer match `LIST-1`, items in a repository that has been archived, items that were there only because of an additional repository the developer has removed, and items in an excluded repository (`SET-34`).
- **ICE-12** The Icebox check's prompt must lean toward bringing items back. It
  keeps an item in the Icebox only when the change is clearly unimportant, such
  as a bot's comment, a label or milestone edit, or a CI result. Changes made by
  the developer count like anyone else's: for example, the developer commenting
  "This is a critical security issue, I'll work on it right away" brings the
  item back. If the check can't be made (for example, the ranking agent still
  fails after retries), the item comes back.
- **ICE-13** Changes to the Icebox check's prompt should be measured against labelled examples before they ship, as `RANK-7` requires for the ranking prompt.
- **ICE-14** The Icebox check's prompt belongs to Gitilizer. Developers can't see or change it.

---

## Keyboard shortcuts

Figma: [Shared / Key cap](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2736), [Keyboard shortcuts · Turned off](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-3274)

A keyboard shortcut is a key that does something wherever the developer is on
a screen, without first moving focus to a control. Shortcuts are a faster way
to reach what the controls already do, so nothing depends on them (`NFR-2`).

- **KEY-1** These are the shortcuts. One added later must be added to this
  table, and `KEY-2` and `KEY-3` apply to it.

  | Key | Where | What it does |
  |---|---|---|
  | / | Prioritized list, Icebox | Moves focus to the search field (`LIST-35`) and selects any text in it. |

  While the search field is empty, a key cap showing "/" sits at its right end
  as a hint. The clear button takes its place once the field isn't empty.
- **KEY-2** A shortcut must not act while focus is in a text field or another
  control that takes typing, while a dialog, popup or menu is open (the rank
  reasoning popup, the notification popover, the account menu), or while Ctrl,
  Alt or Command is held, so that it never takes a key the developer meant for
  something else.
- **KEY-3** The developer must be able to turn every shortcut off with the
  "Keyboard shortcuts" switch in Settings (`SET-50`). WCAG's success criterion
  2.1.4, Character Key Shortcuts, requires this for shortcuts made of a single
  character, which speech input can set off by accident (`NFR-10`). The one
  switch covers every shortcut in `KEY-1`, including any added later. While it
  is off, the hints shown on controls are hidden too, such as the "/" key cap
  in the search field, as in
  [Keyboard shortcuts · Turned off](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-3274).
  The hint under the switch itself stays (`SET-50`).
  The switch turns off shortcuts only. Ordinary keyboard operation doesn't
  change: Tab and Shift+Tab, Enter and Space on a control, the arrow keys
  inside one, and Esc to close a popup or to empty the search field
  (`LIST-35`) work whether it is on or off (`NFR-2`).

---

## Settings

Figma: [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802), [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509)

Settings is one page. The left column has links to its sections (Connections, Additional repositories, Excluded repositories, Ranking prompt, Collaborators), the developer's account details ("Signed in with GitHub", "Sign out"), a Preferences block with the "Keyboard shortcuts" switch (`SET-50`) and a Delete account panel. The main column has the numbered sections (01 Connections, 02 Additional repositories, 03 Excluded repositories, 04 Ranking prompt, 05 Collaborators) and, at the bottom, three buttons: "Save changes", "Save and re-rank" and "Cancel".

### Connections

A GitHub connection is required. An API key for a ranking agent is optional:
without one, Gitilizer ranks with basic ranking (`RANK-21`), which the developer
can also choose here (`SET-38`, [Q-94](#q-94)). The section's description says
so: "Gitilizer needs a GitHub connection to scan your inbox. An API key for
ranking is optional." The section's heading has no "Required" badge.

- **SET-1** Connections has two cards, in this order: "GitHub", where the
  developer connects GitHub with the Gitilizer app or enters a personal access
  token (`SET-42`, `SET-47`), and "Ranking agent", where they choose a ranking
  agent and enter its API key, or choose basic ranking (`SET-38`). The token
  field is labeled "Personal access token"
  and the key field "{agent} API key" (for example "Gemini API key"). Each field
  is masked. Each card has its title and status chip, then its content, with a
  field's guidance text under the field and no description between the title and
  the content: the guidance text already says what the credential is for. The
  Ranking agent card also has the agent picker above its field (`SET-38`).
- **SET-2** Each credential field must have a "Validate" button that checks the
  value typed in the field, without saving it, and shows the result under the
  field (`SET-28`).
- **SET-21** "Validate" must be disabled while its field is empty. That includes
  when the field shows a saved credential: a saved credential appears as dots,
  can't be shown or edited, and can't be validated again until it is replaced.
  The eye icon shows only a value typed during this visit. (Figma shows Validate
  disabled, because the credential is saved.)
- **SET-3** Each credential card must show a status chip (`SET-30`).
- **SET-4** "Get an API key ↗" must open the chosen agent's API key page
  (Google AI Studio for Gemini, the Claude Console for Claude, the OpenAI
  dashboard for OpenAI), and "Create a token ↗" must open GitHub's new-token
  page, both in a new tab. The labels don't say the credentials are free: a
  Gemini key's cost depends on whether its project has billing turned on, and
  Claude and OpenAI have no free tier, as the documentation behind "Learn
  more" explains (`SET-32`).
- **SET-5** Saving a credential, or connecting GitHub (`SET-43`), must clear the
  related notifications (`NOTIF-13`) and start a sync.
- **SET-6** For a PAT, the backend must record the expiry date from GitHub's `GitHub-Authentication-Token-Expiration` header, if it sends one, for the expiry warning.
- **SET-20** "Learn more ↗" at the end of the GitHub token's guidance text, inline with it, must open, in a new tab, the documentation page about GitHub tokens (`FOOT-3`). That page explains:
  - that Gitilizer accepts both kinds of personal access token and recommends a fine-grained one;
  - that a **fine-grained token** can be read-only (issues, PRs and metadata: read) but reads the private repositories of only one owner, the developer or one organization, and that an organization may have to approve it;
  - that a **classic token** with the `repo` scope reads every repository the developer can access, in every organization, but also allows writing, so it is needed only when the developer's private repositories belong to more than one owner; and that Gitilizer only ever reads;
  - that Gitilizer takes one token per developer ([Non-goals](#non-goals)).
- **SET-32** The ranking agent's guidance text, "Used by {agent} to score and
  prioritize your issues and PRs.", must end, inline with it, with "Learn more
  ↗", which opens, in a new tab, the documentation about that agent's API keys
  (`FOOT-3`): how to create one, what it costs, and for Gemini the free tier's
  limits and how to turn billing on.
- **SET-22** Settings must not show which model is used. Gitilizer chooses it
  for each ranking agent (`RANK-11`, `RANK-19`).
- **SET-28** Validate must show its progress and result under the field. A success has a green check mark; a failure has a red ✗ and red text, as in [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237).

  | State | Shown under the field |
  |---|---|
  | Checking | A spinner and "Checking…". The button is disabled until the check finishes. |
  | GitHub token works | ✓ "Validated just now · Reading GitHub as @{login}". Naming the account makes a token from the wrong account easy to spot; Gitilizer doesn't otherwise check it. |
  | Gemini key works | ✓ "Validated just now · Gemini accepted this key" |
  | Claude or OpenAI key works | ✓ "Validated just now · Claude accepted this key" ("OpenAI" for an OpenAI key), naming the agent as the Gemini row does |
  | GitHub token not accepted | ✗ "GitHub didn't accept this token. Check that you copied it correctly." |
  | GitHub token expired | ✗ "This token expired on {date}. Create a new one." |
  | GitHub token missing a permission | ✗ "This token can't read {permission}. Give it read access to issues, PRs and metadata." |
  | Gemini key not accepted | ✗ "Google didn't accept this API key. Check that you copied all of it." |
  | Gemini key disabled | ✗ "Google has disabled this key because it was reported as leaked. Create a new one." |
  | Gemini key can't use Gemini | ✗ "This key can't use the Gemini API. Create a key in Google AI Studio." |
  | Claude or OpenAI key not accepted | ✗ "Anthropic didn't accept this API key. Check that you copied all of it." ("OpenAI" for an OpenAI key) |
  | Claude or OpenAI key can't use the model | ✗ "This key can't use the model Gitilizer uses. Check its restrictions in the Claude Console." ("OpenAI dashboard" for an OpenAI key) |
  | Claude or OpenAI account has no credits, if the check can tell | ✗ "This key works, but its account has no credits left. Add credits in the Claude Console." ("OpenAI dashboard" for an OpenAI key) |
  | Provider can't be reached | ✗ "Couldn't reach GitHub. Check your connection and try again." ("Google", "Anthropic" or "OpenAI" for a ranking agent's key) |
  | Anything else | ✗ "Something went wrong on our side. Try again." |

GitHub answers an expired token the same way as a mistyped one, and sends the expiry date only with successful responses, so Validate can tell an expired typed token apart only if GitHub's answer changes. Until then it shows "GitHub didn't accept this token…" ([Q-78](#q-78)). The "Your GitHub personal access token has expired" notification is unaffected, because by then Gitilizer has seen the expiry date.

- **SET-29** Saving in Settings doesn't validate credentials (Warm Welcome does, `WEL-4`). A saved credential that doesn't work shows up as a [notification](#catalogue) when Gitilizer first uses it.
- **SET-30** The status chip on each card must show one of: "Not set" (grey)
  when nothing is saved or connected; "Connected" (green) when a credential is
  saved, or GitHub is connected, and no error notification about it is active;
  "Not working" (red) while an error notification about it is active; "Expires
  soon" (amber) while the GitHub token's expiry warning is active; "Needs
  attention" (amber) while a "Gitilizer can't read {permission} in {account}"
  warning is active (`SET-47`). On the Ranking agent card, the chip is about the
  key of the agent chosen in the picker. With "Basic ranking" chosen, it shows
  "Basic" (grey).
- **SET-38** The Ranking agent card must have a picker with four choices, laid
  out as in Figma. "Gemini" ("Google") comes first, across the full width, with
  the pills "Recommended" and "Free tier available" and the line "Ranked best
  in our tests, at the lowest cost." Under the label "Or use an API account you
  already have" are "Claude" ("Anthropic") and "OpenAI" ("OpenAI"), side by
  side, each with the pill "Pay as you go". Under the label "Or rank without a
  key" is "Basic ranking" ("Built in"), across the full width, with the pill
  "No key needed" and the line "Good for your top items, less precise below
  them, with no explanation for each rank." ([Q-94](#q-94)). The card says
  nothing else about what a choice costs or how well it ranks, because such
  details go out of date ([Q-86](#q-86)). The picker starts on the choice in
  use: the developer's ranking agent, or "Basic ranking" for a developer on
  basic ranking (`RANK-21`). For a developer who hasn't completed setup, it
  starts on Gemini. Choosing an agent shows that agent's field, setup link,
  guidance text and status chip in the card, and clears a value typed for the
  previous agent, with its Validate result or field error. Choosing "Basic
  ranking" shows no field: in its place is the text "Gitilizer ranks your list
  itself, so there is nothing to set up.", with "Compare with your own key ↗"
  inline at its end, which opens, in a new tab, the documentation about basic
  ranking (`FOOT-3`), as in [Settings · Ranking agent card · Basic
  ranking](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=406-2736).
  The new choice takes effect only when Settings is saved (`SET-14`, `SET-40`).
- **SET-39** Gitilizer must keep a saved key for each agent, so the developer
  can switch back without pasting it again. Under the guidance text, for each
  agent other than the chosen one that has a saved key, the card shows "Your
  {agent} key stays saved, so you can switch back without pasting it again."
  For an agent other than the one in use, the line ends with a "Remove {agent}
  key" link. Choosing it removes the line at once, and choosing that agent
  before saving then shows "Not set" and an empty field; the key is deleted
  when Settings is saved, and "Cancel" keeps it. The key of the agent in use
  can't be removed, only replaced. A developer on basic ranking has no agent in
  use, so every saved key has the link.
- **SET-40** Choosing "Save changes" after choosing a different agent must first
  ask the developer to confirm, in a dialog as in Figma, when the chosen agent
  has a saved or typed key (otherwise `SET-27`'s error shows instead) and at
  least one item in the Prioritized list was scored by the agent in use
  (`RANK-16`); {n} is the number of those items. With no such item, "Save
  changes" saves without asking. The dialog has the title "Switch ranking to
  {agent}?", two paragraphs and three buttons:
  - "Your {n} issues and PRs were ranked by {previous agent}. Scores from
    different agents don't line up exactly, so the order can be a little off
    until every item has been ranked again."
  - "“Switch and re-rank” ranks all of them with {agent} now. “Switch” ranks new
    and changed items with {agent} now, and the rest at the daily re-rank,
    within 24 hours."
  - "Switch" saves as "Save changes" does, and "Switch and re-rank" as "Save and
    re-rank" does (`SET-15`). "Cancel" closes the dialog without saving.

  "Save and re-rank" doesn't ask, because it re-ranks everything anyway.
  Switching, with or without the dialog, starts a sync (`SET-5`), even when the
  new agent's key was saved before; ends any pause caused by the previous agent
  (`RANK-20`), so waiting items are ranked with the new one; and clears the
  notifications about the previous agent (`NOTIF-23`).

  Choosing an agent while on basic ranking is a switch too: the dialog names
  "basic ranking" as the previous agent. Choosing "Basic ranking" saves without
  the dialog, because basic ranking never ranks everything again (`RANK-21`):
  new and changed items are ranked with it, and the rest keep their scores
  until they change on GitHub.
- **SET-41** Removed on 2026-11-14. The Ranking agent card no longer shows
  "Billing" and "Typical cost" notes ([Q-86](#q-86)).

### Connecting GitHub

Figma: the GitHub card in [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802), [Settings · GitHub card · Reconnect needed](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=396-2937), [Settings · GitHub card · Missing permission](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=396-2955), [Settings · GitHub card · Token in use](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=396-3015)

The developer gives Gitilizer read access to GitHub in one of two ways. The
Gitilizer app is the default: one click, nothing to create or renew, and
read-only. A personal access token remains for developers whose private
repositories are in an organization that won't install the app ([Q-87](#q-87)).

- **SET-42** A developer has one GitHub connection at a time: the Gitilizer app
  or a PAT. Connecting the app, or saving a token, replaces the connection in
  use, and Gitilizer deletes the one it replaces ([Q-88](#q-88)): the app's
  connection replaces a saved token as soon as GitHub returns (`SET-43`), and a
  token replaces the app's connection when it is saved. So after connecting the
  app, the token field is empty. Nothing in Settings removes a connection
  without replacing it.
- **SET-43** "Connect GitHub", on Warm Welcome (`WEL-6`) and in the GitHub card,
  and "Reconnect" and "Reconnect GitHub" in the card (`SET-46`, `SET-47`), must
  open GitHub's authorization page for the Gitilizer app in the same tab. When
  the developer approves, GitHub returns them to the screen they started from
  with the connection saved: it needs no "Save" or "Save changes". The
  connection is to the GitHub account that approved, whichever account the
  developer signed in with (`AUTH-5`). Saving it clears the notifications about
  the GitHub connection (`NOTIF-13`) and, once setup is complete, starts a sync
  (`SET-5`). Leaving Settings this way with unsaved changes asks the developer
  to confirm, as any other way of leaving does (`SET-26`). If the developer
  cancels on GitHub, or the connection fails, they return to the same screen
  with nothing changed and a message under the button: "GitHub wasn't
  connected." in grey after a cancel, "Couldn't connect GitHub. Try again." in
  red otherwise. (Figma doesn't draw these two messages.)
- **SET-44** The Gitilizer app must ask GitHub for read access to issues, pull
  requests and repository metadata, and nothing else. It can't change anything
  on GitHub, and it can't read a repository's code, except the changes in a pull
  request, which are part of the pull request. Wherever the interface offers the
  connection it says so: "Read-only access to your issues and pull requests.
  Gitilizer can't change anything on GitHub."
- **SET-45** With the app connected, Gitilizer reads the developer's items in
  every public repository, in any account, with nothing installed. It reads
  private repositories only in the accounts (the developer's own, or
  organizations) where the app is installed, and there only the repositories the
  installation covers. "Add or change private repositories ↗" in the card, and
  "Add on GitHub ↗" on Warm Welcome, open GitHub's page for installing the app,
  in a new tab. An organization the developer doesn't own needs an owner's
  approval, which GitHub asks for on the developer's behalf. Gitilizer reads
  what is installed again at each scan, and also when Settings opens or its tab
  becomes visible again, so the card is up to date when the developer comes back
  from GitHub. Items that have become readable join the list at the next scan.
- **SET-46** A connection made with the app renews itself, so the developer
  never sees an expiry warning (`NOTIF-22`). It ends only when the developer
  removes Gitilizer's access on GitHub, or when Gitilizer hasn't scanned for
  them for about six months, which happens only to a developer who stays away
  that long (`SCAN-5`). Scanning then pauses, the "Your GitHub connection has
  ended" error shows ([catalogue](#catalogue)), and in place of the account the
  card shows "Your GitHub connection has ended", "Access was removed on GitHub,
  or Gitilizer hasn't been opened for six months. Your list and settings are
  kept, and scanning starts again when you reconnect." and a "Reconnect GitHub"
  button, as in Figma.
- **SET-47** With the app connected, the GitHub card must show, as in Figma: its
  status chip (`SET-30`); the account's avatar, "@{login}" and "Connected with
  the Gitilizer app · Read-only"; a "Reconnect" button, which runs the
  connection again (`SET-43`), for example to connect a different account; a
  list titled "What Gitilizer can read"; the link "Add or change private
  repositories ↗" (`SET-45`); and the link "Use a personal access token
  instead", which shows the token field (`SET-1`) in the card. The list has a
  row "Public repositories" with "Every public repository, in any account", and
  a row for each account where the app is installed, with the account's name and
  "Private repositories: all" or "Private repositories: {n} selected". A row has
  a green check mark, or an amber warning mark when something needs the
  developer:
  - the account hasn't approved one of the app's permissions (`SET-44`): "Pull
    requests aren't shared, so its private PRs are missing" (or "Issues aren't
    shared, so its private issues are missing"), with the link "Review on
    GitHub ↗". The "Gitilizer can't read {permission} in {account}" warning
    shows too ([catalogue](#catalogue));
  - the developer has asked for the app to be installed on an organization, and
    an owner hasn't approved it yet: "Private repositories: waiting for an owner
    to approve" ([Q-89](#q-89)). GitHub reports these requests only to the
    Gitilizer app itself, so the row shows where Gitilizer holds the app's
    private key ([design D-19](DESIGN.md#d-19)); elsewhere it is left out, and
    the documentation explains the wait.

  With a token in use, the card has the token field as before and, under a rule,
  "No token to create or renew: connect with one click instead." and a "Connect
  GitHub" button, as in Figma.

  With nothing connected (the "Not set" chip, which after setup only a fault can
  cause, `NOTIF-16`), the card has the "Connect GitHub" button and the note
  that Warm Welcome has before connecting (`WEL-6`), and the link "Or use a
  personal access token", as in Figma.

  While the token field shows in place of a connection, a link under its
  guidance text puts the card back as it was and discards a typed token, without
  leaving Settings: "Keep @{login} connected", or "Use Connect GitHub instead"
  when nothing is connected. When the connection has ended (`SET-46`), its
  message stays above the token field. (Figma doesn't draw the token field in
  these cases.)
- **SET-48** "What Gitilizer can read ↗", on Warm Welcome (`WEL-6`), must open,
  in a new tab, the documentation about connecting GitHub (`FOOT-3`).
- **SET-49** Text that tells the developer about their token must fit the
  connection in use. With the Gitilizer app connected, the hover texts in
  `SET-8` and `SET-36` say "or Gitilizer can't read it" where they say "or your
  token can't read it", and `SET-8`'s ends "Check the name, and that the
  Gitilizer app is installed on its owner's account and includes this
  repository." The catalogue's rows about a personal access token, and `SET-8`'s
  states for a blocked token and for single sign-on, apply only to a token. With
  the app, an organization that uses single sign-on has no message of its own
  for now ([Non-goals](#non-goals), [Q-90](#q-90)).

### Additional repositories

- **SET-7** The developer must be able to add a repository by typing `owner/name`, or pasting its GitHub URL (`https://github.com/owner/name`, with anything after the name ignored), and choosing "Add repository", and remove one with "Remove". Any other format, or a repository already in the list, is an error (`SET-27`). There can be at most 25 repositories.
- **SET-8** Each repository must show one of four access states: "Checking…" in grey while Gitilizer checks it; "Access confirmed", as in Figma; "Archived" in grey, where hovering shows "{repo} is archived, so its issues and PRs aren't shown." (`LIST-1` excludes archived repositories); or "Can't access" with a red ✗. Hovering over "Can't access" must say why, as precisely as GitHub's answer allows:

  | What GitHub answered | Hover text |
  |---|---|
  | Not found. The repository doesn't exist, its name is misspelled, or it is private and the token can't read it. GitHub gives the same answer in all three cases, so as not to reveal that a private repository exists. | "GitHub says {repo} doesn't exist, or your token can't read it. Check the name, and that your token includes this repository." |
  | The organization uses single sign-on and the token isn't authorized for it | "{org} uses single sign-on. Authorize your token for {org} in your GitHub personal access token settings." |
  | The organization blocks this kind of token | "{org} doesn't allow {classic / fine-grained} tokens. Create the other kind of token, or ask an owner of {org} to allow this one." |

  If GitHub can't be reached, the repository keeps its last known state. A renamed repository keeps working: GitHub forwards the old name, and Gitilizer shows the new one.

  Each repository starts with its owner's GitHub avatar, as GitHub shows a repository: with rounded corners for an organization and round for a personal account, in a 24 px space so the names line up with Collaborators. Until GitHub has found the repository, and while it can't be accessed, the repository icon takes the avatar's place.
- **SET-9** Each repository may have a prioritization prompt: free text that tells the ranking agent what the developer cares about in it, for example "Security issues only". It is entered in the "Prioritization prompt" field when adding the repository, and shown under the repository's name. The agent receives it as a note on that repository. It can be at most 500 characters. It can't be edited after the repository is added: to change it, the developer removes the repository and adds it again.
- **SET-31** Additional repositories are repositories the developer follows, not ones they're responsible for. The agent's "About me" text and the default prompt must describe them that way, measured as in `RANK-7`. A developer who is responsible for a repository can say so in its prioritization prompt.

### Excluded repositories

- **SET-33** The developer must be able to exclude a repository by typing
  `owner/name`, or an owner (an organization or a personal account) by typing
  its name, or by pasting either's GitHub URL, and choosing "Exclude"; and
  remove an exclusion with "Remove". A leading "@" typed with an owner's name is
  removed, as in `SET-25`. The field is labeled "Exclude an organization or
  repository", with the placeholder "owner/repository or org" and the help text
  under it shown in Figma. Any other format is an error ("Enter a repository as
  owner/name, an owner's name, or paste a GitHub URL."), and so is one already
  in the list ("{name} is already excluded.") (`SET-27`). There can be at most
  25 exclusions. Excluding a repository whose owner is also excluded is allowed
  and changes nothing. The section description must read "Issues and PRs from
  these never appear in your list, even when you're assigned, asked to review or
  @-mentioned. Gitilizer doesn't scan or rank them."
- **SET-34** No item in an excluded repository, or in any repository an
  excluded owner owns, may appear in the Prioritized list or the Icebox,
  whatever its inclusion reason (`LIST-1`), except as in `SET-35`. Excluding a
  personal account hides the repositories it owns, not the items that person
  opens or comments on elsewhere. Gitilizer doesn't scan or rank excluded
  items, and the ranking agent isn't told about exclusions.
- **SET-35** An additional repository wins over an excluded owner that owns it:
  its items appear as in `LIST-1`, with the inclusion reasons they would have if
  the owner weren't excluded (`LIST-21`), not only the repository's name. The
  owner's row must say so under its name: "Every repository {owner} owns, except
  {repo}, which is an additional repository." With more than one, it names them
  all, in alphabetical order: "…except {repo}, {repo} and {repo}, which are
  additional repositories." Each repository name is a link that scrolls to that
  repository's row in Additional repositories. The text wraps onto more lines if
  it doesn't fit; it is never cut off. The same repository can't be both
  excluded and an additional repository: adding it to either list while it is in
  the other is an error (`SET-27`): "{repo} is one of your additional
  repositories. Remove it there first to exclude it." or "{repo} is excluded.
  Remove it from Excluded repositories first to follow it." Removing the
  repository from either list clears that error. If a rename on GitHub makes an
  excluded repository the same as an additional repository, the exclusion is
  removed.
- **SET-36** Each exclusion must show what it is: "Checking…" while Gitilizer
  looks it up, then "Repository", "Organization" or "Personal account", all in
  grey, or "Not found" with a red ✗ when GitHub says it doesn't exist or the
  token can't read it. Hovering over "Not found" shows "GitHub says {name}
  doesn't exist, or your token can't read it. If the name is misspelled, remove
  it and add it again." Each row starts with the owner's GitHub avatar, the
  excluded owner's or the repository's owner's, shown as in `SET-8`. While
  Gitilizer is checking, if GitHub can't be reached, or if it isn't found, a
  repository shows the repository icon and an owner a generic avatar: unlike in
  Collaborators, the red ✗ next to "Not found" is the row's only error marker.
  Once GitHub has found it, an owner's row says "Every repository {owner} owns."
  under its name, and a personal account's adds "Issues and PRs {owner} opens
  elsewhere still appear." A "Not found" exclusion is kept; it hides nothing,
  because Gitilizer can't read that repository anyway. If GitHub can't be
  reached, an exclusion keeps its last known state, and a renamed repository or
  owner stays excluded under its new name. An account that later takes an
  excluded owner's old name isn't excluded.
- **SET-37** Exclusions take effect when settings are saved (`SET-14`). Items
  they cover leave the Prioritized list as in `LIVE-15` and the Icebox as in
  `ICE-11` straight away, without waiting for a scan. Removing an exclusion
  brings its items back at the scan that saving starts (`SCAN-5`), and they are
  ranked like new items.

### Ranking prompt

- **SET-11** The page must show the current ranking prompt in an editor. With no custom prompt, it shows the default prompt.
- **SET-12** The developer can edit the prompt. When the prompt differs from the default, a "Restore default" control must be shown; it replaces the text with the default.
- **SET-13** The custom prompt replaces only the instructions part of what the agent receives. Gitilizer always adds the "About me" block (login, additional repositories with their prioritization prompts, and collaborators) and the output format, as in `systemInstruction()` in `app/ranker/src/prioritizer.ts`. These additions are not shown in or editable from Settings.
- **SET-23** The section description must read "The agent reads the title, description, labels, comments and reviews of each issue and PR and gives it a score."
- **SET-24** The default prompt is `prompts/v4.md`. A developer who has never changed the prompt always gets the current default, so they pick up improvements automatically. A custom prompt can be at most 20,000 characters (`SET-27`).

### Collaborators

- **SET-10** The developer must be able to keep a list of GitHub usernames whose items and comments should get a higher score. The agent receives them as "my usual collaborators".
- **SET-18** The developer adds a collaborator by typing a username in "Add collaborator" and choosing "Add collaborator", and removes one with "Remove". Adding doesn't check that the user exists.
- **SET-19** Each collaborator must show their GitHub avatar and username. If GitHub says the user doesn't exist, an error icon is shown in place of the avatar (as for "priyapatel" in Figma), and hovering over it shows "There's no GitHub user named priyapatel". If GitHub can't be reached, a generic avatar is shown, without an error (as for "samkim").
- **SET-25** A leading "@" typed with a username must be removed. A username already in the list must be rejected with an error (`SET-27`). There can be at most 50 collaborators.

### Saving

- **SET-14** Changes must take effect only when the developer chooses "Save changes" or "Save and re-rank". Both save everything on the page, credentials included. The one exception is the "Keyboard shortcuts" switch, which applies as soon as it is changed (`SET-50`). "Cancel" discards unsaved changes (`NAV-9`).
- **SET-15** "Save changes" must save without re-ranking: items already ranked
  keep their scores until they change on GitHub. New items, such as those from a
  newly added repository, are ranked as usual. "Save and re-rank" must save and
  then re-rank every item (a full re-rank, shown as in `LIVE-24`). It counts as
  a sync: Sync now turns and is disabled until every item has been ranked, and
  the progress text shows how many are left (`LIST-16`, `LIST-33`). Each button
  has the explanatory note shown in Figma next to it, without an estimate of how
  many items will be re-ranked. While "Basic ranking" is the choice in the
  picker (`SET-38`), "Save and re-rank" is disabled, and the note beside it
  reads "Re-ranking everything needs your own API key." in place of its usual
  text ([Q-93](#q-93)). The reason is a note, not a hover text, so that it shows
  without a pointer and is read out as the button's description (`NFR-2`,
  `NFR-10`), as in [Settings · Save buttons · Basic
  ranking](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=408-2736).
- **SET-26** Leaving Settings with unsaved changes (through a link, the browser's Back button or closing the tab) must ask the developer to confirm.

- **SET-27** Settings must show problems next to the field they belong to, as in [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237):
  - The field gets a red border, and a one-line message in red appears under it, for example "northstar/web is already in your list.", "Enter a repository as owner/name or paste its GitHub URL.", "northstar/web is one of your additional repositories. Remove it there first to exclude it.", "jordanlee is already a collaborator." or "A prompt can be at most 20,000 characters. This one has 21,345."
  - A ranking agent chosen without a saved or typed key is an error under its
    field when the developer saves: "Add a {agent} API key, or choose basic
    ranking." ("an OpenAI API key" for OpenAI). Nothing is saved. Basic ranking
    needs no key.
  - Repository, exclusion and collaborator errors appear when the developer chooses "Add repository", "Exclude" or "Add collaborator", and nothing is added. A prompt's error appears as soon as it goes over its limit, and a character count appears once a ranking prompt passes 18,000 characters.
  - While any error is showing, "Save changes" and "Save and re-rank" are disabled.
  - If the server finds a problem when saving, it is shown the same way, and the page scrolls to the first one.

### Account

- **SET-16** The account panel must show the developer's name, email, sign-in provider and a "Sign out" link (`ACCT-5`).
- **SET-17** The developer must be able to delete their Gitilizer account from the Delete account panel in the left column, which says: "Deleting your account is permanent and cannot be reversed." Choosing "Delete account" must ask for confirmation with a simple dialog: "Delete your Gitilizer account? This can't be undone.", with "Cancel" and "Delete account". Deletion is immediate: it deletes all data about the developer from the live database (see [Data and privacy](#data-and-privacy)), ends all their sessions and shows the sign-in page. Copies remain in database backups for up to 6 months (`PRIV-4`).

### Preferences

Figma: [Settings / Preferences](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2761), [Settings / Switch](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2760)

- **SET-50** The left column must have a "Preferences" block between the
  account details and the Delete account panel. It has one switch, "Keyboard
  shortcuts", and under it the hint "Such as / to search.", with the "/" shown
  as a key cap. The switch is on for a new account. Turning it off turns off
  every keyboard shortcut and hides the hints for them on other controls, and
  turning it on brings them back (`KEY-3`). The block's own hint is shown
  either way. It applies as soon as it is changed, without "Save changes",
  and isn't one of the unsaved changes that `SET-26` asks about. It is stored
  on the account, like the sort order (`LIST-9`), so it is kept between visits
  and follows the developer to other devices. It is announced as a switch
  named "Keyboard shortcuts", with its state and with the hint as its
  description (`NFR-10`).

---

## Scanning and ranking

### Finding items

- **SCAN-0** Scanning and ranking must continue while no browser is open, so the list is up to date when the developer comes back.
- **SCAN-1** A scan must find every open item that matches `LIST-1`, reading
  GitHub with the developer's GitHub connection (`SET-42`), and keep the 1,000
  most recently updated (`LIST-19`). Each GitHub search must be sorted by most
  recently updated and needs only its first 1,000 results: any item among the
  developer's 1,000 most recently updated is also among the first 1,000 results
  of every search it matches. So searches never need to be split, even when
  GitHub reports more than 1,000 results. That holds only if excluded items
  (`SET-34`) are left out by the searches themselves, not removed from their
  results, so they never take up any of a search's first 1,000 results. The
  search for an additional repository carries no exclusions (`SET-35`), and
  exclusions GitHub couldn't find (`SET-36`) aren't added to any search.
- **SCAN-2** A scan must find items that have changed since the last scan, and items that no longer match (closed, merged, unassigned, a repository archived, removed or excluded). Items that no longer match leave the list as in `LIVE-15`, and leave the Icebox as in `ICE-11`.
- **SCAN-3** A scan must collect what the ranking agent needs to judge each new or changed item: the item, its comments, timeline and reviews, and the issues and PRs it links to.
- **SCAN-4** Two scans for the same developer must never run at the same time. A sync requested while one is running joins it.

### When scans run

- **SCAN-5** The backend must scan a developer's items:
  - when the web app asks for it (Sync now, and when settings are saved);
  - every 5 minutes while the app is visible in at least one of the developer's browser tabs;
  - every 30 minutes while the app is open in at least one tab but hidden in all of them;
  - every 2 hours otherwise, for developers who have opened Gitilizer in the last 7 days. Developers who haven't aren't scanned in the background; their items are scanned when they next open Gitilizer (`SCAN-6`).
- **SCAN-6** When the app becomes visible and the last scan finished more than 5 minutes ago, a scan must start immediately.

### Ranking

- **RANK-1** Ranking must use the existing ranking agent, with the developer's
  ranking prompt (or the default), their settings and the item's context, and
  the API key of the developer's ranking agent (`SET-38`) or, for a developer
  without one, basic ranking with Gitilizer's own key (`RANK-21`). Each item is
  scored on its own, so a change to one item re-scores only that item. (The
  design doc has the details.)
- **RANK-2** For each item the agent returns a score (named `priority` in its
  output, 0.0 to 1.0), whether the item is actionable, a one-line next action
  and its reasoning. All four must be stored. Basic ranking returns only the
  first two (`RANK-21`). The interface uses the score and the reasoning, not the
  next action or whether the item is actionable (`LIST-24`).
- **RANK-3** Ranks must come from sorting items by score, highest first. Two items must never share a rank.
- **RANK-4** The agent should try to give items distinct scores, but because each item is scored on its own, ties can't always be avoided. Ties must be broken by most recent activity, then by repository and number, so the order is always the same for the same data.
- **RANK-5** An item must be ranked again when it is new or has changed on GitHub (its `updated_at` is later than when it was last ranked), and all items must be ranked again when the developer chooses "Save and re-rank" (`SET-15`).
- **RANK-6** Short-lived failures of the ranking agent must be retried
  automatically. An item that still can't be ranked is shown as in `LIST-30`.
- **RANK-7** Changes to the default prompt or model should be measured with the evaluation harness before they ship.
- **RANK-8** The default prompt should score a draft PR lower than the same PR ready for review. (`prompts/v4.md` already scores the developer's own drafts low; extend that to other people's drafts, and measure it as in `RANK-7`.)
- **RANK-9** Every item of a developer who has a ranking agent must be ranked
  again at least once every 24 hours, so scores that depend on age stay
  current. This is a bulk re-rank (`LIVE-24`). It happens out of sight: it
  isn't a sync, so Sync now doesn't turn and stays enabled while it runs
  (`LIST-16`). A developer on basic ranking has no daily re-rank
  ([Q-93](#q-93)): their items keep their scores until they change on GitHub.
- **RANK-10** When a scan sees a change to an item, Gitilizer must also rank again the items in the developer's list that it links to. For example, an issue drops when a PR that fixes it is opened, although the issue itself hasn't changed.
- **RANK-11** At most 4 requests to the ranking agent may run at once for one
  developer. With Gemini, ranking uses `gemini-3.8-flash` with thinking turned
  down as far as the model allows, to keep cost down. (The [model
  comparison](../eval/model-comparison-2026-11-01.md) measured this, "low"
  thinking, at Kendall tau 0.69, against 0.77 at the default level. The decision
  can be revisited.)
- **RANK-12** Gitilizer must work with a Gemini API key on Google's free tier.
- **RANK-13** With Gemini, Gitilizer must rank with `gemini-3.8-flash` (the
  primary model). When Google reports that the developer's daily quota for the
  model in use is used up, Gitilizer must switch to the next step in this order:
  `gemini-3.8-flash`, then `gemini-3.5-flash-lite` (the backup model), then
  basic ranking, which Gitilizer runs with its own key (`RANK-21`,
  [Q-96](#q-96)). It returns to the primary model when that model's quota
  resets, at midnight Pacific time. For as long as the backup model or basic
  ranking is in use, the developer sees the "Gitilizer is using a backup Gemini
  model" warning (headed "Gitilizer is using basic ranking" when that is the
  step in use), even if that is most of every day on the free tier. This works
  because Google sets quotas separately for each model: running out on one
  doesn't block the other. Evaluation chose the order. The backup model ranks
  about as well as basic ranking (Kendall tau 0.58, against 0.55 to 0.58), on
  the developer's own quota, and writes its reasoning. `gemini-3.1-flash-lite`,
  which was a second backup model until 2026-11-15, ranked worse than basic
  ranking (0.40). Basic ranking steps in only for new and changed items: a full
  re-rank (`RANK-9`, `SET-15`) uses the developer's own models, and the items it
  can't reach before their quota is used up keep their scores until a later
  daily re-rank.
- **RANK-14** Per-minute limits must not cause a switch: Gitilizer waits and retries, as for "Gemini is limiting requests from your key".
- **RANK-15** Removed on 2026-11-15. Ranking no longer pauses when a Gemini
  key's daily quota is used up, because basic ranking takes over (`RANK-13`),
  so the "Your Gemini daily quota is used up" error is gone ([Q-96](#q-96)).
- **RANK-16** Each item's score must record which agent and model produced it.
- **RANK-17** Scores from different models, and after a switch (`SET-40`) from
  different agents, share one list. The primary model's quota goes to new and
  changed items first, because they are most likely to be near the top; the
  daily re-rank (`RANK-9`) uses whichever of the developer's own models is
  available, never basic ranking, so over time items are scored again by the
  primary model as its quota allows.
- **RANK-18** Each call to the ranking agent scores exactly one item.
- **RANK-19** With Claude, Gitilizer must rank with `claude-sonnet-5-5`,
  without thinking, and with OpenAI with `gpt-6.1-sol`, at its lowest reasoning
  effort, "low". Evaluation (`RANK-7`) chose them: they rank about as well as
  Gemini, where each provider's cheapest model ranks clearly worse
  ([Q-85](#q-85)). Neither has a free tier or a daily quota per model, so there
  are no backup models: when credits run out, ranking pauses (`RANK-20`) with
  the "Your {provider} credits have run out" error. The same model makes the
  Icebox check (`ICE-6`), measured against its labelled examples (`ICE-13`).
- **RANK-20** Ranking is paused while an error notification says that the
  agent's key, credits, billing or model doesn't work (the "isn't valid",
  "disabled", "can't
  use", "credits have run out", "needs billing" and "isn't available" rows of
  the [catalogue](#catalogue)). Items to rank wait (`LIST-30`) and are ranked
  when the condition clears, as the catalogue's last column says, or when the
  developer switches agents (`SET-40`). Short-lived problems, such as rate
  limits, don't pause ranking: Gitilizer waits and retries (`RANK-6`). Basic
  ranking has a pause of its own (`RANK-22`).
- **RANK-21** A developer who has completed setup without saving a ranking
  agent's API key, or who chooses "Basic ranking" in Settings (`SET-38`), gets
  **basic ranking** ([Q-91](#q-91)): Gitilizer scores their items itself, with
  Google's `gemini-decision-1` through the Gemini Decisions API, using
  Gitilizer's own API key and at Gitilizer's cost. The key must be on a paid
  tier, so that Google doesn't use what it is sent to improve its products
  (`PRIV-2`). Basic ranking follows the rules above as a ranking agent does: the
  same prompt, settings and context, one item for each request (`RANK-18`), and
  the model recorded with each score (`RANK-16`). The model answers fixed
  questions and writes no text, so basic ranking stores a score and whether the
  item is actionable, and no next action or reasoning: ranks aren't clickable
  (`LIST-24`). The Icebox check (`ICE-6`) is a yes-or-no question to the same
  model, not yet measured against its labelled examples (`ICE-13`). Evaluation
  (`RANK-7`) measured basic ranking at Kendall tau 0.55 with the default prompt,
  against 0.71 for `gemini-3.8-flash` at low thinking, at about an eighth of the
  cost for each item. Its first five items were the ground truth's first five,
  and the loss is in the order of the rest of the list
  ([evaluation](../eval/decision-model-2026-11-15.md)). Basic ranking also takes
  over when a Gemini key's daily quota is used up (`RANK-13`). It isn't a backup
  for anything else: a developer whose own key stops working sees the error for
  it (`RANK-20`), and Gitilizer doesn't rank for them meanwhile, unless they
  choose basic ranking in Settings. Moving between basic ranking and a ranking
  agent is a switch, as `SET-40` describes. Switching to basic ranking ends a
  full re-rank that is still running: the items it hasn't reached keep their
  scores. To keep its cost within the budget (`PLAT-4`), basic ranking never
  ranks everything again ([Q-93](#q-93)): a developer on basic ranking has no
  daily re-rank (`RANK-9`) and can't use "Save and re-rank" (`SET-15`), and for
  a Gemini key it ranks only new and changed items (`RANK-13`). It pauses when
  Gitilizer's own quota is used up (`RANK-22`).
- **RANK-22** When Google refuses Gitilizer's own key because a quota or a
  spending limit is used up, basic ranking must pause until Google accepts its
  requests again. The limit can be Google's daily quota for the key, which
  resets at midnight Pacific time, or one the owner sets with Google to keep
  within the budget (`PLAT-4`). Whether and when basic ranking stops for the
  budget is the owner's configuration, not a rule of the application
  ([Q-97](#q-97)). Every developer with an item waiting for basic ranking sees
  the "Basic ranking is paused" warning ([catalogue](#catalogue)): developers on
  basic ranking, and developers with a Gemini key whose own quota is used up too
  (`RANK-13`), for whom it replaces the backup-model warning. Their items wait
  as in `RANK-20`: shown with "–" (`LIST-30`), and ranked when basic ranking
  resumes, when a Gemini key's own quota resets (`RANK-13`), or when the
  developer switches to a ranking agent (`SET-40`). The warning clears as soon
  as the developer has no item waiting for basic ranking, whichever of these
  ranks them. While it is paused, Gitilizer tries basic ranking again every 15
  minutes, so it resumes soon after the limit ends. Per-minute limits on
  Gitilizer's key don't pause basic ranking: Gitilizer waits and retries
  (`RANK-6`). If Google stops accepting the key itself, or the key is missing,
  basic ranking pauses in the same way, and the owner is alerted (`METRIC-4`),
  because only the owner can fix it.

---

## Data and privacy

Gitilizer keeps:

| Data | Notes |
|---|---|
| Account | Sign-in provider and provider user ID, name, email, avatar URL. |
| Credentials | The GitHub connection: a PAT (with its expiry date, if known), or what GitHub issues for the Gitilizer app's connection, with the connected account's login. An API key for each ranking agent the developer has saved one for, and which agent is in use, or that basic ranking is. |
| Settings | Additional repositories with their prioritization prompts, excluded repositories, collaborators, custom ranking prompt, sort preferences, whether keyboard shortcuts are on. |
| Item data | The GitHub data needed to rank and show each item. |
| Item state | For each developer and item: inclusion reasons, score, rank, the agent's output, when it was last ranked, and whether and when it was moved to the Icebox. |
| Notifications | Active notifications with their first-detected time. |

- **PRIV-0** Gitilizer must read GitHub only as the developer: with the
  developer's PAT, or with the access the developer gave the Gitilizer app,
  which is limited to what both the developer and the app may read (`SET-44`,
  `SET-45`). It must call a ranking agent only with the developer's API key.
  Gitilizer's own credentials are used only for sign-in, to make and renew the
  app's connection, and for basic ranking (`RANK-21`), never to read a
  developer's items.
- **PRIV-1** Credentials must be encrypted at rest, must never be sent back to the browser after they are saved, must never be written to logs and must never be included in a ranking prompt.
- **PRIV-2** Only the context of the developer's own items may be sent to the
  ranking agent in use, using the developer's own key. For a developer on basic
  ranking, the same context is sent to Google with Gitilizer's key, which must
  be on a paid tier (`RANK-21`). So is the context of the new and changed items
  that basic ranking ranks for a Gemini key whose daily quota is used up
  (`RANK-13`).
- **PRIV-3** Deleting an account (`SET-17`) must delete all of the data above
  for that developer. Cached item data shared with other developers may be kept
  only while another developer still needs it. For a connection made with the
  Gitilizer app, Gitilizer should also ask GitHub to revoke the developer's
  authorization of the app. It must not remove the app's installations, which
  belong to their accounts and may serve other developers.
- **PRIV-5** An item's GitHub data, and each developer's record of it (its score and the agent's output), must be deleted 30 days after no developer has the item in their Prioritized list or Icebox any more, whatever the reason: closed or merged, no longer matching `LIST-1`, past the 1,000-item limit, or every developer who had it deleted their account.
- **PRIV-4** Database backups must be kept for 6 months, so a deleted account's data stays in backups for up to 6 months; credentials stay encrypted there (`PRIV-1`). If a backup is ever restored, every account deleted after that backup was taken must be deleted again.

---

## Non-functional requirements

### Platform and budget

- **PLAT-1** The source code and documentation must be hosted on GitHub ([github.com/brianquinlan/gitilizer](https://github.com/brianquinlan/gitilizer)).
- **PLAT-2** The application must run on Google Cloud.
- **PLAT-3** It must perform best for developers in North America and Western Europe.
- **PLAT-4** Running costs must fit within US$200 a month. This doesn't include
  developers' own GitHub and ranking agent usage, which uses their own
  credentials. It does include what Gitilizer pays Google for basic ranking
  (`RANK-21`, [Q-93](#q-93)).
- **PLAT-5** The application must be served at `https://gitilizer.com`.

### Scale

- **NFR-1** The system must support at least 10,000 developers using the application at the same time without scaling or performance problems.
  - "Using the application at the same time" means having it visible in a browser tab. The system is sized for 10,000 such developers, out of up to 100,000 accounts, with up to 1,000 items each (`LIST-19`).
  - At one scan every 5 minutes, that is about 33 scans per second. Each
    developer's scan uses their own GitHub and ranking agent limits, so
    Gitilizer's own load is mainly scan jobs, database writes and live-update
    connections. Basic ranking is the exception: it uses Gitilizer's own limits
    with Google (`RANK-22`). Its cost isn't sized for this scale. Within the
    budget it covers at most a few hundred first syncs a month (about US$0.23
    for a 390-item list, `PLAT-4`), and past its limit it pauses, so at this
    scale most developers rank with their own keys.
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
- **NFR-6** The backend must record metrics for scan duration, ranking duration,
  GitHub and ranking agent error rates by agent and type, and notification
  counts by type, so operators can see problems before developers report them.
- **NFR-11** The backend must log enough to find the cause of a production
  problem without reproducing it, and no more. Each line records one event (a
  scan finishing, a job failing, an unexpected GitHub or ranking agent response,
  an unhandled error) with what it was about (developer, item, error code).
  Routine success is not logged one line per item, logs can be searched by
  severity, and credentials never appear in them (`PRIV-1`).
- **NFR-12** A change must run in a separate development environment, with its own database, before it reaches gitilizer.com. Deploying to the development environment is automatic; deploying to gitilizer.com is a deliberate step, of a build that has already run in the development environment. The design doc describes the environments.
  - The development environment is at `dev.gitilizer.com` and uses real GitHub
    and ranking agents, with each developer's own credentials, like production.
  - Because it runs untested code with those credentials, only accounts on an allowlist can sign in there ([Q-80](#q-80)). The owner lists Google accounts by email address and GitHub accounts by username or numeric ID, and can change the list without a release. Someone removed from the list is signed out at their next request; their account stays. Anyone else sees the "Not allowed" message (`AUTH-10`). Production has no allowlist.

---

## Open questions

New questions are marked **TODO:** where they come up and listed here.

There are none at the moment.

Q-58 to Q-63 were found by building the prototype described in the [design
doc](DESIGN.md); Q-64 to Q-76 came from the product owner's 2026-11-01 answers
and the new Figma designs; Q-77 to Q-79 came from bringing the prototype in line
with this document; Q-80 came from the decision to have a development
environment; Q-84 to Q-86 came from adding Claude and OpenAI; Q-87 to Q-90 came
from connecting GitHub with the Gitilizer app; Q-91 to Q-97 came from making
the ranking agent's API key optional; Q-98 and Q-99 came from adding search,
the type filter and the first keyboard shortcut.

### Answered questions

| ID | Question | Decision | Where |
|---|---|---|---|
| <a id="q-1"></a>Q-1 | Hosting, repository and budget | "Costed" meant "hosted". Code and documentation are on GitHub at github.com/brianquinlan/gitilizer. The app runs on Google Cloud, performs best in North America and Western Europe, and costs at most US$200 a month. It is served at gitilizer.com. | `PLAT-1` to `PLAT-5` |
| <a id="q-2"></a>Q-2 | Scale | 10,000 developers with the app visible, up to 100,000 accounts, up to 1,000 items each. | `NFR-1` |
| <a id="q-3"></a>Q-3 | Success metrics | None: this is a hobby project. The owner needs total users, users who completed setup, and daily, weekly and monthly actives. | `METRIC-1`, `METRIC-2` |
| <a id="q-4"></a>Q-4 | Non-goals | Confirmed, plus models other than Gemini (the design should still allow them later). Changed on 2026-11-07: Claude and OpenAI rank too ([Q-84](#q-84)). | [Non-goals](#non-goals) |
| <a id="q-5"></a>Q-5 | Footer URLs | "Documentation" opens the user documentation in the GitHub repository; "GitHub" opens the repository, which is the project's landing page. | `FOOT-2`, `FOOT-3` |
| <a id="q-6"></a>Q-6 | Routes | As suggested; moving between screens doesn't reload the page. | `NAV-3`, `NAV-4` |
| <a id="q-7"></a>Q-7 | Getting back to the list | The Gitilizer logo links to the Prioritized list. (Whether saving Settings also goes back is [Q-64](#q-64).) | `NAV-7` |
| <a id="q-8"></a>Q-8 | When Warm Welcome is shown | Until the developer has connected GitHub and saved the ranking agent's API key (until 2026-11-14, "saved both credentials"; [Q-87](#q-87)), usually on Warm Welcome itself. After that, problems appear as error notifications on the Prioritized list. Changed on 2026-11-15: until the developer has connected GitHub and chosen how their items are ranked; a key is optional ([Q-91](#q-91)). | `NAV-2`, `WEL-4` |
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
| <a id="q-26"></a>Q-26 | Many pages; item count | First, last, current ±1 with "…"; the count is always shown. Figma updated. Settled on 2026-11-15: with no rows to show, the row keeps "Previous", "1" and "Next", with "Previous" and "Next" disabled, as the application already did. Figma updated. | `LIST-12`, `LIST-27` |
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
| <a id="q-40"></a>Q-40 | Token kinds | Accept both, recommend fine-grained, explain in the documentation behind "Learn more". One token per developer. Changed on 2026-11-14: a token is now the alternative to the Gitilizer app, and a developer has one or the other ([Q-87](#q-87)). | `SET-20`, [Non-goals](#non-goals) |
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
| <a id="q-63"></a>Q-63 | The free tier | Gitilizer must work on it. It falls back from `gemini-3.8-flash` to `gemini-3.5-flash-lite` to `gemini-3.1-flash-lite` as each daily quota runs out, with a warning, and an error when all are used up. Items waiting for quota are shown at the end with "–". One item per call. Changed on 2026-11-15: `gemini-3.5-flash-lite` is the only backup model, and basic ranking takes over after it in place of pausing ([Q-96](#q-96)). | `RANK-12` to `RANK-18`, `LIST-30` |
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
| <a id="q-82"></a>Q-82 | Entering credentials on Warm Welcome, and what Save does when one fails | Warm Welcome has both fields itself, instead of a "Go to Settings" button, so setup is less overwhelming. Save validates any value not yet validated and saves nothing unless both pass. Saving in Settings still doesn't validate. Changed on 2026-11-14: in place of the GitHub field is the "Connect GitHub" button, with the token field behind a link ([Q-87](#q-87)). Changed on 2026-11-15: Warm Welcome has only the optional Gemini key field, and its button validates a typed key; the token field and the other agents are in Settings, behind "Advanced setup" ([Q-92](#q-92)). | `WEL-2` to `WEL-4`, `WEL-6`, `SET-29` |
| <a id="q-83"></a>Q-83 | Hiding whole repositories | Settings has an Excluded repositories list of repositories and owners (organizations or personal accounts). Nothing from them appears, even when the developer is assigned, asked to review or mentioned. Exclusions are part of the GitHub searches, so they don't use up the 1,000-result window. An additional repository inside an excluded owner still appears; the same repository can't be in both lists. Excluding by author, per-repository rules for each inclusion reason, and a filter language were considered and not chosen for now. | `SET-33` to `SET-37`, `LIST-1`, `SCAN-1`, `ICE-11` |
| <a id="q-84"></a>Q-84 | Ranking agents other than Gemini | The developer chooses one ranking agent, Gemini, Claude or OpenAI, and gives Gitilizer its API key. Gitilizer keeps the keys of the others, so switching back is easy, and switching asks whether to re-rank now. A primary agent with backups, and any OpenAI-compatible endpoint, were considered and not chosen for now. Changed on 2026-11-15: choosing an agent is optional, and Claude and OpenAI are offered only in Settings ([Q-91](#q-91), [Q-92](#q-92)). | `SET-38` to `SET-41`, `WEL-5`, `RANK-19`, `RANK-20`, `NOTIF-23` |
| <a id="q-85"></a>Q-85 | Which Claude and OpenAI models rank | `claude-sonnet-5-5` and `gpt-6.1-sol`. Changed on 2026-11-14 from `claude-haiku-5-5` and `gpt-6-luna`, each provider's cheapest model, after evaluation: over ten prompts the cheapest models' mean Kendall tau was 0.52 and 0.57, against 0.69 for each of the chosen models and 0.72 for `gemini-3.8-flash` at low thinking, which also costs less than either (`eval/prompt-variants-2026-11-07.md`). That is why Gemini is the recommended agent (`WEL-5`, `SET-38`). The Icebox check (`ICE-13`) hasn't been measured with them yet. | `RANK-19` |
| <a id="q-86"></a>Q-86 | The "Typical cost" figures | Not shown. Settings no longer has billing and cost notes (`SET-41`): figures and billing details go out of date as prices and models change. Gitilizer says only that Gemini ranked best in its tests at the lowest cost and has a free tier, and that Claude and OpenAI are pay as you go. The documentation behind "Learn more" still covers what each agent costs (`SET-32`). | `SET-38`, `WEL-5` |
| <a id="q-87"></a>Q-87 | Connecting GitHub without creating a token | The developer connects GitHub with the Gitilizer app, a GitHub App with read-only access to issues, pull requests and metadata: one click, nothing to create or renew. Public repositories need nothing installed; private ones need the app installed on their account. Signing in still gives Gitilizer no access, so developers who sign in with Google or with GitHub connect in the same way. A personal access token stays as the alternative, for private repositories in an organization that won't install the app. A trial on 2026-11-14 found that the app reads the same public and private items as a token, with only those three permissions, and that it shares the developer's GitHub rate limit with their tokens. | `AUTH-5`, `WEL-2` to `WEL-4`, `WEL-6`, `SET-1`, `SET-30`, `SET-42` to `SET-49`, `PRIV-0`, [Catalogue](#catalogue) |
| <a id="q-88"></a>Q-88 | What happens to the connection that is replaced, when the developer switches between the Gitilizer app and a token | It is deleted. Gitilizer keeps one GitHub credential per developer, and Settings never has a second, unused connection to explain. Connecting the app again is one click; a token can be pasted again. | `SET-42` |
| <a id="q-89"></a>Q-89 | Showing an organization that is waiting for an owner to approve the app | Shown in the GitHub card where GitHub reports the request. The design doc found that it reports them only to the Gitilizer app itself, which needs the app's private key ([design D-19](DESIGN.md#d-19)); an environment without the key leaves the row out, and the documentation explains the wait. | `SET-47` |
| <a id="q-90"></a>Q-90 | Organizations that use single sign-on, with the Gitilizer app | Out of scope for now: the trial of the app didn't reach such an organization. Gitilizer shows no message of its own for it, and the documentation tells developers to use a personal access token there. Revisit once it has been tried. | `SET-49`, `FOOT-3`, [Non-goals](#non-goals) |
| <a id="q-91"></a>Q-91 | Trying Gitilizer without an API key | A ranking agent's API key is optional. A developer who connects GitHub and gives no key gets basic ranking: Gitilizer scores their items with Google's `gemini-decision-1`, with its own key and at its own cost, because having to create a key before seeing anything was thought likely to turn new developers away. Evaluation found that basic ranking orders the top of the list about as well as `gemini-3.8-flash` and the rest less precisely (Kendall tau 0.55 against 0.71), at about an eighth of the cost for each item, and that it gives no reasoning (`eval/decision-model-2026-11-15.md`). | `RANK-21`, `RANK-1`, `RANK-2`, `LIST-24`, `PRIV-0`, `PRIV-2`, `PLAT-4`, [Which screen is shown](#which-screen-is-shown), [Non-goals](#non-goals) |
| <a id="q-92"></a>Q-92 | Warm Welcome for a setup without a key | Two steps. First "Connect GitHub", with "Advanced setup" leading to Settings for a personal access token, Claude or OpenAI. Then, with GitHub connected, an optional Gemini API key marked "Recommended" and "Free tier available", and one button: "Continue with basic ranking" while the field is empty, "Save and start" once it has a key. The link for adding private repositories stays in the second step. The text calls a Gemini key free, which earlier wording avoided (`SET-4`), because a developer who thinks a key costs money is unlikely to add one; the link is still "Get an API key ↗". Showing the choice as two tiles or as a comparison table, and leaving the key out of setup altogether, were considered and not chosen. | `WEL-2` to `WEL-6`, `NAV-5` |
| <a id="q-93"></a>Q-93 | What basic ranking leaves out to keep its cost down | It never ranks everything again. A developer on basic ranking has no daily re-rank, so their scores change only when items change on GitHub, and "Save and re-rank" is disabled while "Basic ranking" is chosen, and the note beside it says "Re-ranking everything needs your own API key." That leaves the first sync (about US$0.23 for a 390-item list) and new and changed items (about US$0.0006 each); the daily re-rank alone would have cost about US$7 a month for such a list. A custom ranking prompt stays available, though it hasn't been tried with this model, and there is no limit on items beyond `LIST-19`. What the developer sees when Gitilizer's own limits hold basic ranking up is now [Q-97](#q-97). | `RANK-9`, `RANK-21`, `SET-15`, `SET-40`, `PLAT-4` |
| <a id="q-94"></a>Q-94 | Settings for a developer without a key | "Basic ranking" is a fourth choice in the Ranking agent card's picker, last, under "Or rank without a key". It needs no key, so a developer who connects with a PAT can use it, and going back to basic ranking is choosing it and saving, which is a switch like any other. The card's chip then reads "Basic". Two alternatives were considered and not chosen: showing only the optional Gemini key, as on Warm Welcome, with Claude and OpenAI behind a link, which hides the agents that "Advanced setup" promises; and a status row above the three agents. The Warm Welcome / Ranking agent tile component is gone. | [Connections](#connections), `SET-1`, `SET-27`, `SET-30`, `SET-38` to `SET-40`, `RANK-21` |
| <a id="q-95"></a>Q-95 | Telling a developer on basic ranking what they are missing, after setup | Nothing does. Warm Welcome says once that ranking is basic without a key (`WEL-3`), and shows that private repositories haven't been added (`WEL-6`), which is clear enough. The Prioritized list has no chip or note about either. | `WEL-3`, `WEL-6` |
| <a id="q-96"></a>Q-96 | A free-tier Gemini key whose quota for the primary model is used up | Gitilizer ranks with `gemini-3.5-flash-lite` next, on the developer's own quota, and then with basic ranking, at its own cost. Basic ranking takes the place of `gemini-3.1-flash-lite` and of pausing. In evaluation `gemini-3.5-flash-lite` scored Kendall tau 0.58 and basic ranking 0.55 to 0.58, against 0.40 for `gemini-3.1-flash-lite`, so a list with a key is never ranked worse than basic ranking would rank it. Basic ranking steps in for new and changed items only; a full re-rank waits for the developer's quota. The "Your Gemini daily quota is used up" error is gone. | `RANK-13`, `RANK-15`, `RANK-17`, `RANK-20`, [Catalogue](#catalogue), `METRIC-5` |
| <a id="q-97"></a>Q-97 | What the developer sees when basic ranking is held up by Gitilizer's own limits, and whether it stops when the budget is spent | Basic ranking pauses whenever Google refuses Gitilizer's own key for a quota or spending limit, and developers with items waiting see the "Basic ranking is paused" warning, worded like the earlier "Your Gemini daily quota is used up" error. Whether basic ranking stops when a month's budget is spent isn't a rule of the application: the owner decides it in their budget configuration with Google, and the same pause and warning cover it. | `RANK-22`, [Catalogue](#catalogue), `PLAT-4` |
| <a id="q-98"></a>Q-98 | Finding an item in a long list | A strip above the column headings, inside the table, with a search field and an "All" / "PRs" / "Issues" filter. Search covers the title, the repository and the number. It leaves out the inclusion reason and the agent's reasoning; the reasoning isn't shown on the row, so a match on it couldn't be seen. A filtered list keeps each item's rank in the whole list, and the search and filter are in the URL. Putting the two controls in the row of controls above the table, and putting the type filter in the Issue column heading, were considered and not chosen: the first wraps onto a second line at 1024 px (`PLAT-6`), and the second is easy to miss. Filters by repository and by inclusion reason, unread markers and shortcuts for working through the list were proposed with it and left for later. | `LIST-34` to `LIST-41`, `LIST-27`, `NAV-3`, `ICE-7`, `ICE-8`, `LIVE-7` |
| <a id="q-99"></a>Q-99 | A keyboard shortcut for search, and turning shortcuts off | "/" moves focus to the search field, with a key cap in the field as a hint. A "Keyboard shortcuts" switch in Settings turns off every shortcut, this one and any added later, which WCAG 2.2 level AA requires for single-character shortcuts. The switch turns off shortcuts only, never ordinary keyboard operation such as Tab, Enter and Esc. A switch for "/" alone, letting the developer change the key, and Ctrl+K or Command+K in its place, which would need no switch, were considered and not chosen. | `KEY-1` to `KEY-3`, `SET-50`, `SET-14`, `LIST-35`, `NFR-10` |

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

### Twenty-first revision (2026-11-04, fourth round)

- Warm Welcome now has the two credential fields and a "Save" button instead
  of "Go to Settings", drawn in
  [Warm Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=342-2832),
  so a new developer doesn't face the whole Settings page first (`WEL-2` to
  `WEL-4`). Save validates each value not yet validated and saves nothing
  unless both pass ([Q-82](#q-82)); saving in Settings still doesn't validate
  (`SET-29`). `NAV-1`, `NAV-5`, `NAV-8` and Q-8's answer are updated to match.
- The GitHub token's guidance text in Settings no longer says "App sign-in does
  not replace this token.", so `AUTH-5` no longer quotes it. The Gemini key's
  guidance now reads "Used by Gemini to score and prioritize your issues and
  PRs.", as on Warm Welcome.

### Twenty-second revision (2026-11-04, fifth round)

- The credential links read "Create a token ↗" and "Get an API key ↗" in both
  Settings and Warm Welcome, without "(it's free!)": a Gemini key is free only
  on Google's free tier (`SET-4`).
- The Gemini key now has a "Learn more ↗" too, which opens the documentation
  about Gemini keys and the free tier (`SET-32`). Both "Learn more" links sit
  inline at the end of the guidance text, in Settings as on Warm Welcome
  (`SET-20`, `WEL-3`, `FOOT-3`).

### Twenty-third revision (2026-11-04, sixth round)

- Updates are held while the rank reasoning popup is open, and until it has
  been closed for 1 second, even when the pointer and focus are outside the
  table, so rows don't move under it (`LIVE-27`).
- Closing the popup with its close button or Esc returns keyboard focus to the
  rank, as closing the notification popover returns it to the bell (`LIST-24`,
  `NFR-2`, `NOTIF-20`). The popup closes if its item leaves the page.

### Twenty-fourth revision (2026-11-04, seventh round)

- The GitHub credential is called a "GitHub personal access token" everywhere,
  as GitHub calls it, or a "personal access token" where GitHub is already
  clear, never a "GitHub scanning token" or a "GitHub token"
  ([Glossary](#glossary)). This changes the Warm Welcome text and field
  (`WEL-2`, `WEL-3`), the Settings card title (`SET-1`), the notification
  headings that named a "GitHub token" (`NOTIF-8`, `NOTIF-16`,
  [Catalogue](#catalogue)) and the single sign-on hover text in Additional
  repositories (`SET-8`).
- Where both credentials are mentioned, the GitHub one comes first, including
  the sign-in page's "Sign in first. Connect your tools next." explanation
  (`AUTH-4`), as drawn in
  [Sign in](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2978).

### Twenty-fifth revision (2026-11-04, eighth round)

- The credential cards in Settings no longer have a description under their
  titles ("A personal access token to read your issues, pull requests and
  comment activity." and "Gemini scores each issue and PR to decide its
  rank."), because the guidance text under each field says the same. Each card
  now has its title and status chip, the field and the guidance text (`SET-1`).
- The credential cards are titled "GitHub" and "Gemini" instead of "GitHub
  personal access token" and "Gemini API key", which repeated the field labels
  under them (`SET-1`).
- Changed Figma: retitled the cards and removed the descriptions in
  [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802),
  [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509)
  and
  [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237).

### Twenty-sixth revision (2026-11-04, ninth round)

- Pull requests are called "PRs" everywhere the developer reads about them, and
  text about both issues and PRs says "issues and PRs" ("issue or PR" for one,
  "no issues or PRs" for none) instead of just "issues". "Issues" is capitalized
  only at the start of a sentence. "Item" in this document is unchanged, and so
  are labels that name the type, like the Issue column and "Issue #1842".
- The GitHub token's guidance text on Warm Welcome and in Settings, the
  fine-grained token's permissions (`SET-20`) and the Validate result for a
  missing permission (`SET-28`) ask for read access to "issues, PRs and
  metadata". The `{permission}` in that result and in its notification
  ([Catalogue](#catalogue)) is lowercase, and "PRs" for pull requests.
- In the [Catalogue](#catalogue): "Issue scanning is paused" is now "Scanning
  is paused"; "New and changed issues", "Gitilizer couldn't rank {n} issues"
  and "Your issues haven't updated since {time}" name issues and PRs; and the
  "Issue ranking" summary is now "Ranking".
- "No issues or PRs to show 🎉" (`LIST-14`), "No issues or PRs in the Icebox"
  (`ICE-7`), "3 issues and PRs changed rank" (`LIVE-21`), the Ranking prompt
  description (`SET-23`) and the PR icon's accessible label, "PR".
- Changed Figma: "All issues and PRs" (was "All issues & PRs") in
  [Shared / Inbox layout](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-1000),
  the Icebox frames and
  [Inbox controls · Sync Progress](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=325-6832);
  "Issues and PRs you placed in the Icebox." and the empty state in
  [Icebox · Populated issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=178-5947)
  and
  [Icebox - No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=190-2593);
  the empty state in
  [Issue inbox · No issues](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-897);
  the token guidance in
  [Warm Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=342-2832);
  the token guidance and the Additional repositories, Ranking prompt,
  Collaborators and save option texts in
  [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802),
  [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509)
  and
  [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237);
  and the notification bodies in
  [Notifications · Multiple active errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=223-1808)
  and
  [Notifications · Error being shown](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=200-2665).

### Twenty-seventh revision (2026-11-04, tenth round)

- Warm Welcome's credential links, guidance text and Validate results, and its
  note under "Save", use the same type as Settings instead of a smaller size
  (`WEL-3`).
- Changed Figma: the field labels (13 px), "Create a token ↗" and "Get an API
  key ↗" (12.5 px), Validate results (12.5 px), guidance text (12 px, 160%) and
  save notes (12.5 px, 150%), all Inter Regular, in
  [Warm Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=342-2832),
  [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802),
  [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509)
  and
  [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237).
  Warm Welcome's field labels stay Inter Semi Bold. In the same frames, the
  masked credential values are 14 px IBM Plex Mono, and "Validate", "Save
  changes", "Save and re-rank" and "Cancel" are 14 px Inter Medium (Warm
  Welcome's "Save" is 14 px Inter Semi Bold), as the application shows them.
  The [Shared / Footer](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-346)
  text is 12 px.
- The **Last updated** line no longer says the GitHub credential is called a
  "GitHub personal access token" everywhere: as the [Glossary](#glossary) and
  `SET-1` say, the Settings field under the "GitHub" card title is labeled
  "Personal access token".

### Twenty-eighth revision (2026-11-04, eleventh round)

- The Delete account panel says only "Deleting your account is permanent and
  cannot be reversed.", without the advice to save a complex prompt first, and
  `SET-17` now quotes the text.
- Changed Figma: the Delete account panel text in
  [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802),
  [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509)
  and
  [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237).

### Twenty-ninth revision (2026-11-06)

- Added Excluded repositories to Settings (`SET-33` to `SET-37`, Q-83): the
  developer lists repositories and owners whose items never appear, whatever
  the inclusion reason. `LIST-1`, `SCAN-1`, `SCAN-2`, `ICE-11`, `SET-27`,
  `NAV-3`, the Settings layout, the glossary and the stored settings change to
  match, and Ranking prompt and Collaborators are now sections 04 and 05.
  `LIVE-25` gains an "Excluded" leave label.
- Changed Figma: a new section 03, Excluded repositories, and an "Excluded
  repositories" link in the left column, in
  [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=364-2491),
  [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=377-2491)
  and
  [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=369-2491),
  with Ranking prompt and Collaborators renumbered. Settings / Page content
  also gets the "Cancel" row that Settings already had.
- Changed Figma: in the same three frames, sections 02 Additional
  repositories, 03 Excluded repositories and 05 Collaborators use the type the
  application shows, as the Connections cards have since the twenty-seventh
  revision: field labels 13 px Inter Medium; repository names, usernames and
  inputs 13 px IBM Plex Mono; status labels 12 px and "Remove" 12.5 px; field
  errors 12.5 px; help text and the notes under owners 12 px at 160%;
  prioritization prompts 13 px IBM Plex Mono with 12 px captions; and the
  "Add repository", "Exclude" and "Add collaborator" buttons 14 px Inter
  Medium.

### Thirtieth revision (2026-11-07)

Found while building excluded repositories, by testing GitHub's issue search, and in review:

- GitHub ignores, rather than refuses, an excluded repository or owner it
  can't find, so `SCAN-1` no longer says what to do when a search is refused
  because of one. The search for an additional repository carries no
  exclusions at all: GitHub combines a repository with an excluded owner
  unpredictably.
- `SET-35`: items in an additional repository inside an excluded owner keep
  their inclusion reasons, such as "Review requested", not only the
  repository's name.
- `SET-33`: excluding a repository whose owner is also excluded is allowed.
- `SET-36`: the note under an owner appears only once GitHub has found it, so
  a misspelled owner isn't described as owning repositories.
- `SET-35`: removing a repository from either list clears the error about it
  being in both, and a rename on GitHub that puts the same repository in both
  lists removes the exclusion.
- `SET-8`, `SET-36`: a repository, additional or excluded, starts with its
  owner's GitHub avatar, as GitHub shows a repository, instead of the
  repository icon, which now appears only until GitHub has found it.
- Changed Figma: repositories GitHub has found show their owner's avatar in
  sections 02 and 03 of
  [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802),
  [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509)
  and
  [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237),
  and prioritization prompts and owner notes start under the names.

### Thirty-first revision (2026-11-07, second round)

- Added ranking agents (Q-84): the developer chooses Gemini, Claude or OpenAI
  to rank their list and gives Gitilizer that agent's API key. The Gemini card
  in Settings becomes a Ranking agent card with a picker, billing and cost
  notes, and the saved keys of other agents (`SET-38`, `SET-39`, `SET-41`).
  Choosing another agent and saving asks whether to re-rank now (`SET-40`).
  Warm Welcome offers the three agents as tiles (`WEL-5`). Claude and OpenAI
  rank with one model each (`RANK-19`) and have their own rows in the
  notification catalogue, and only the agent in use has notifications
  (`NOTIF-23`). Ranking pauses for a key, credits or billing error, not only
  for Gemini's daily quota, and waiting items are shown and end a sync as they
  do for the quota (`RANK-20`). `SET-1`, `SET-4`, `SET-22`, `SET-27`, `SET-28`, `SET-30`,
  `SET-32`, `WEL-2`, `WEL-3`, `NOTIF-16`, `LIST-30`, `LIST-32`, `LIST-33`,
  `ICE-12`, `RANK-1`, `RANK-6`,
  `RANK-11`, `RANK-13`, `RANK-16` to `RANK-18`, `FOOT-3`, `FOOT-4`, `PRIV-0`,
  `PRIV-2`, `PLAT-4`, `NFR-1`, `NFR-6`, `NFR-11`, `NFR-12`, the non-goals, the
  glossary, the stored credentials and Q-4 change to match. Q-85 picks
  `claude-haiku-5-5` and `gpt-6-luna` until evaluation says otherwise; Q-86
  (the cost figures) is open.
- Changed Figma: the Ranking agent card, with Gemini chosen, in
  [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802) and
  [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509), and with Claude chosen and no key in
  [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237); the
  Connections description and the note beside "Save and re-rank"; the agent
  tiles in [Warm Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=342-2832); a new
  [Settings · Switch ranking agent](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=384-2631)
  frame; and two new components,
  [Settings / Ranking agent option](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=383-2497)
  and
  [Warm Welcome / Ranking agent tile](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=383-2522).
- Changed Figma: the "Sign in first. Connect your tools next." text on
  [Sign in](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2978),
  [Sign in · Cancelled](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=304-1734)
  and
  [Sign in · Error](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=306-1355)
  says "an API key for Gemini, Claude or OpenAI" instead of "a Gemini API key"
  (`AUTH-4`). Masked credentials in the Settings frames fit on one line, and
  Warm Welcome's Validate results use the words in `SET-28`.

### Thirty-second revision (2026-11-14)

- Gemini is now the recommended ranking agent. On Warm Welcome and in the
  Settings picker it comes first, across the full width, with "Recommended",
  "Free tier available" and "Ranked best in our tests, at the lowest cost."
  Claude and OpenAI follow under "Or use an API account you already have", each
  with "Pay as you go" (`WEL-5`, `SET-38`). Warm Welcome's "Not sure?" hint is
  replaced by a note about who Claude and OpenAI are for.
- Removed the "Billing" and "Typical cost" notes from the Ranking agent card
  (`SET-41`, `SET-1`), because they go out of date. Q-86 is answered: the
  figures aren't shown.
- Claude and OpenAI rank with `claude-sonnet-5-5` and `gpt-6.1-sol` instead of
  `claude-haiku-5-5` and `gpt-6-luna`, which ranked clearly worse in evaluation
  (`RANK-19`, Q-85).
- Changed Figma: the Ranking agent card in
  [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802),
  [Settings / Page content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509),
  [Settings · Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237)
  and
  [Settings · Switch ranking agent](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=384-2631);
  the agent tiles in
  [Warm Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=342-2832);
  and the
  [Settings / Ranking agent option](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=383-2497)
  and
  [Warm Welcome / Ranking agent tile](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=383-2522)
  components.

### Thirty-third revision (2026-11-14, second round)

- GitHub connection ([Q-87](#q-87)). The developer connects GitHub in one click
  with the Gitilizer app, a GitHub App with read-only access to issues, pull
  requests and metadata, in place of creating a personal access token; the token
  stays as the alternative. New section [Connecting GitHub](#connecting-github),
  `SET-42` to `SET-49`: one connection at a time, how connecting runs, what the
  app may read, public repositories with nothing installed and private ones
  where the app is installed, a connection that renews itself and how it ends,
  the GitHub card's states, and wording that fits the connection in use.
- Signing in still gives Gitilizer no access (`AUTH-5`), so the connection is a
  separate step, the same for Google and GitHub sign-ins. Setup is complete when
  GitHub is connected and the agent's key is saved ([Which screen is
  shown](#which-screen-is-shown), `WEL-4`, `METRIC-1`).
- Warm Welcome starts with a "Connect GitHub" button; the token field is behind
  "Or use a personal access token" (`WEL-2` to `WEL-4`, new `WEL-6`; `WEL-5`'s
  wording).
- Settings: the GitHub card and its chips (`SET-1`, `SET-2`, `SET-5`, `SET-21`,
  `SET-30`); the section's description says "a GitHub connection".
- Notifications: two new rows, "Your GitHub connection has ended" and "Gitilizer
  can't read {permission} in {account}"; the rate limit and "can't access
  {repo}" rows no longer assume a token; what clears the token rows (`NOTIF-9`,
  `NOTIF-13`, `NOTIF-16`, `NOTIF-22`).
- Privacy and documentation: Gitilizer reads GitHub only as the developer
  (`PRIV-0`); what is stored for the connection; deleting an account should also
  remove Gitilizer's access on GitHub (`PRIV-3`); the documentation explains
  connecting GitHub (`FOOT-3`, `FOOT-4`). Also the overview, non-goals, glossary
  and `SCAN-1`.
- Three more questions, answered the same day: the connection that is replaced
  is deleted ([Q-88](#q-88)); an organization that is waiting for approval is
  shown ([Q-89](#q-89)); and organizations that use single sign-on are out of
  scope with the app for now ([Q-90](#q-90), [Non-goals](#non-goals)). Q-8, Q-40
  and Q-82 note what changed.
- Changed Figma: [Warm
  Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=342-2832)
  now has the "Connect GitHub" button, with the new frames [Warm Welcome ·
  Connected](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=395-2871)
  and [Warm Welcome · Personal access
  token](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=395-2929);
  the GitHub card in
  [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802)
  and [Settings / Page
  content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509)
  is connected with the Gitilizer app, with the new frames [Settings · GitHub
  card · Reconnect
  needed](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=396-2937),
  [Settings · GitHub card · Missing
  permission](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=396-2955)
  and [Settings · GitHub card · Token in
  use](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=396-3015);
  the Connections description in those and in [Settings ·
  Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237)
  and [Settings · Switch ranking
  agent](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=384-2631),
  whose GitHub cards still show a token in use, which is one of the card's
  states.
- After review, the same day: Warm Welcome no longer hides a saved connection
  (the Connected state's link is "Use a personal access token instead", and the
  token field's link goes back, `WEL-4`, `WEL-6`); the GitHub card with nothing
  connected, and going back from its token field (`SET-47`); the card is read
  again when Settings regains focus (`SET-45`); every token row of the catalogue
  also clears when the Gitilizer app is connected; deleting an account revokes
  the authorization, not installations (`PRIV-3`); `SET-49`'s wording; `NAV-1`
  and `NAV-9`. Figma: "Save" is disabled in Warm Welcome before connecting, the
  new frame [Settings · GitHub card · Not
  set](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=397-2761),
  and the "Connect GitHub" offer on the token cards in Settings · Errors and
  Settings · Switch ranking agent.
- While building it, the same day: GitHub reports a request that is waiting for
  an owner only to the Gitilizer app itself, so that row shows where Gitilizer
  holds the app's private key and is left out elsewhere (`SET-47`,
  [Q-89](#q-89), [design D-19](DESIGN.md#d-19)).

### Thirty-fourth revision (2026-11-15)

- Trying Gitilizer without an API key ([Q-91](#q-91)). A ranking agent's API key
  is now optional. A developer without one gets basic ranking, which Gitilizer
  runs with `gemini-decision-1` at its own cost (new `RANK-21`; `RANK-1`,
  `RANK-2`, `LIST-24`). Setup is complete once GitHub is connected and the
  developer has chosen how their items are ranked ([Which screen is
  shown](#which-screen-is-shown), `METRIC-1`).
- Warm Welcome is two steps ([Q-92](#q-92)): "Connect GitHub", then an optional
  Gemini API key with "Continue with basic ranking" or "Save and start"
  (`WEL-2` to `WEL-4`, `WEL-6`). The ranking agent tiles and the personal
  access token field are gone from it (`WEL-5` removed): "Advanced setup" opens
  Settings for those (`NAV-5`).
- Privacy, budget and documentation: Gitilizer's own key is used for basic
  ranking, on a paid tier (`PRIV-0`, `PRIV-2`); its cost counts toward the
  budget (`PLAT-4`, `NFR-1`); the documentation compares basic ranking with a
  developer's own key and covers it in the privacy section (`FOOT-3`,
  `FOOT-4`). Also the overview, non-goals, glossary, `NOTIF-16`, `SET-38` and
  `SET-47`.
- Four questions are open: what basic ranking leaves out to keep its cost down
  ([Q-93](#q-93)); Settings for a developer without a key ([Q-94](#q-94));
  telling a developer on basic ranking what they are missing after setup
  ([Q-95](#q-95)); and a free-tier Gemini key whose quota is used up
  ([Q-96](#q-96)). Q-8, Q-82 and Q-84 note what changed.
- Changed Figma: [Warm
  Welcome](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=342-2832)
  is step 1, with the "Advanced setup" line, and without the tiles, the key
  field, "Save" and the token link; [Warm Welcome ·
  Connected](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=395-2871)
  is step 2 with the key field empty; the new frame [Warm Welcome · Connected ·
  Key
  entered](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=401-2927)
  shows "Save and start". The frame "Warm Welcome · Personal access token" is
  removed.

### Thirty-fifth revision (2026-11-15, second round)

- Settings for a developer without a key ([Q-94](#q-94), now answered). The
  Ranking agent card's picker has a fourth choice, "Basic ranking", which needs
  no key (`SET-38`). Its chip reads "Basic" (`SET-30`), and moving to or from it
  is a switch like any other (`SET-39`, `SET-40`, `RANK-21`). So a developer
  who connects with a PAT can use basic ranking, and saving Settings with it
  chosen completes setup ([Which screen is shown](#which-screen-is-shown)).
- The Connections description is "Gitilizer needs a GitHub connection to scan
  your inbox. An API key for ranking is optional.", and the heading's
  "Required" badge is gone ([Connections](#connections), `SET-1`). The error
  for an agent chosen without a key now ends "or choose basic ranking."
  (`SET-27`).
- Changed Figma: [Settings / Ranking agent
  option](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=383-2497)
  has a "No key" variant; the pickers in
  [Settings](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=3-2802),
  [Settings / Page
  content](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=56-509),
  [Settings ·
  Errors](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=313-8237)
  and [Settings · Switch ranking
  agent](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=384-2631)
  have the "Basic ranking" choice, the new description and no "Required"
  badge; the new frame [Settings · Ranking agent card · Basic
  ranking](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=406-2736)
  shows it chosen. The component "Warm Welcome / Ranking agent tile" is
  removed.

### Thirty-sixth revision (2026-11-15, third round)

- What basic ranking leaves out ([Q-93](#q-93), answered): it never ranks
  everything again. A developer on basic ranking has no daily re-rank
  (`RANK-9`), and "Save and re-rank" is disabled while "Basic ranking" is
  chosen, with a hover text (`SET-15`). Choosing "Basic ranking" saves without
  the switch dialog (`SET-40`).
- Nothing after setup reminds a developer that ranking is basic or that private
  repositories are missing ([Q-95](#q-95), answered; `WEL-6`).
- A Gemini key whose quota is used up ([Q-96](#q-96), answered): Gitilizer
  ranks with `gemini-3.5-flash-lite` and then with basic ranking, in place of
  `gemini-3.1-flash-lite` and of pausing (`RANK-13`, `RANK-17`, `RANK-20`,
  `RANK-21`; `RANK-15` removed). The "Your Gemini daily quota is used up" error
  is gone from the [catalogue](#catalogue), and the backup-model warning also
  covers basic ranking. Also `FOOT-3`, `LIST-32`, the non-goals and the
  glossary.
- New `METRIC-5`: the owner can see how much ranking is done with Gemini,
  Claude and OpenAI keys and by basic ranking, and, for Gemini keys, at each
  step from `gemini-3.8-flash` down to basic ranking.
- One question is open: what the developer sees when Gitilizer's own limits
  hold basic ranking up ([Q-97](#q-97)).
- Changed Figma: the new frame [Settings · Save buttons · Basic
  ranking](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=408-2736)
  shows "Save and re-rank" disabled, with its hover text.

### Thirty-seventh revision (2026-11-15, fourth round)

- When Gitilizer's own daily quota with Google is used up, basic ranking pauses
  until it resets, and developers with items waiting for it see a new warning,
  "Basic ranking is paused" (new `RANK-22`; `RANK-20`, `RANK-21`,
  [catalogue](#catalogue), `NFR-1`). It is worded like the "Your Gemini daily
  quota is used up" error that the third round removed.
- [Q-97](#q-97) stays open, narrowed to whether basic ranking also stops when
  Gitilizer's budget for a month is spent.

### Thirty-eighth revision (2026-11-15, fifth round)

- [Q-97](#q-97) is answered, so no question is open. Whether basic ranking
  stops when a month's budget is spent is the owner's configuration with
  Google, not a rule of the application. `RANK-22` now pauses basic ranking
  whenever Google refuses Gitilizer's own key for a quota or spending limit,
  whatever set the limit, and tries again every 15 minutes; the warning leaves
  out the time when Gitilizer doesn't know when the limit ends
  ([catalogue](#catalogue)).

### Thirty-ninth revision (2026-11-15, sixth round)

After review:

- "Basic ranking is paused" also clears when a Gemini key's own quota resets
  and ranks the waiting items, so it can't stay on while basic ranking itself
  is still held up (`RANK-22`, [catalogue](#catalogue)).
- The reason "Save and re-rank" is disabled is the note beside the button, not
  a hover text, so it shows without a pointer (`SET-15`, `NFR-2`). Changed
  Figma: [Settings · Save buttons · Basic
  ranking](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=408-2736)
  has the note and no hover text.
- A developer who chose how their items are ranked in Settings before
  connecting GitHub never sees step 2 of Warm Welcome (`WEL-2`).
- The backup-model warning has its own heading and opening when the step in
  use is basic ranking (`RANK-13`, [catalogue](#catalogue)).
- Basic ranking's cost isn't sized for the scale target (`NFR-1`).

### Fortieth revision (2026-11-15, with the implementation)

Details settled while building the simplified setup and basic ranking
([design](DESIGN.md#the-ranking-agent)):

- The sync progress text reads "waiting for basic ranking" for a developer on
  basic ranking (`LIST-33`).
- What basic ranking sends for a Gemini key whose quota is used up also goes
  with Gitilizer's key (`PRIV-2`).
- Switching to basic ranking ends a full re-rank that is still running
  (`RANK-21`).
- A key that Google no longer accepts, or a missing one, pauses basic ranking
  like a limit does, and alerts the owner (`RANK-22`, `METRIC-4`).
- How long the ranking-volume charts and counts go back (`METRIC-5`).

### Forty-first revision (2026-11-15, search and the type filter)

Search, a type filter and the first keyboard shortcut ([Q-98](#q-98),
[Q-99](#q-99)):

- The Prioritized list and the Icebox have a strip above the column headings
  with a search field and an "All" / "PRs" / "Issues" filter. A filtered list
  keeps each item's rank in the whole list, counts as "{n} of {N} issues and
  PRs" and has its own "No matching issues or PRs" state. The search and
  filter are in the URL (`LIST-34` to `LIST-41`, `LIST-27`, `NAV-3`, `ICE-7`,
  `ICE-8`, `LIVE-7`).
- While the first sync is running, a table with no row to show stays in the
  first-sync state, whatever the search and filter are (`LIST-15`,
  `LIST-39`).
- With no rows to show, the pagination row keeps "Previous", "1" and "Next",
  with "Previous" and "Next" disabled, as the application already did
  ([Q-26](#q-26), `LIST-12`). Changed Figma: the empty, first-sync, Icebox
  empty and no-matches frames now show them.
- A new section, [Keyboard shortcuts](#keyboard-shortcuts): "/" moves focus to
  the search field, and one switch turns every shortcut off without changing
  ordinary keyboard operation (`KEY-1` to `KEY-3`).
- Settings has a Preferences block in its left column with the "Keyboard
  shortcuts" switch, which applies as soon as it is changed and is stored on
  the account (`SET-50`, `SET-14`, [Data and privacy](#data-and-privacy)).
- Changed Figma. New components:
  [Shared / Search and type filter](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2738),
  [Shared / Key cap](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2736),
  [Settings / Preferences](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2761)
  and [Settings / Switch](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=414-2760).
  The strip is in
  [Shared / Inbox layout](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=169-1000)
  and both Icebox frames, and the Preferences block is in every Settings
  frame. New frames:
  [Issue inbox · Filtered](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-2904),
  [Issue inbox · No matches](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-3161)
  and [Keyboard shortcuts · Turned off](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=415-3274).
  The rank reasoning popup moved down with the rows.
