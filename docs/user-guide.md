# Gitilizer user guide

Gitilizer collects your open GitHub issues and PRs into one list and uses the AI you choose, Google's Gemini, Anthropic's Claude or OpenAI, to put them in priority order. If you don't add an API key, Gitilizer ranks them itself ([Basic ranking](#basic-ranking)). This guide explains how to set it up, what the notifications mean, and what Gitilizer does with your data.

- [Getting started](#getting-started)
- [Connecting GitHub](#connecting-github)
- [GitHub personal access tokens](#github-personal-access-tokens)
- [Ranking agents](#ranking-agents)
- [Basic ranking](#basic-ranking)
- [Gemini API keys](#gemini-api-keys)
- [Claude API keys](#claude-api-keys)
- [OpenAI API keys](#openai-api-keys)
- [Your list](#your-list)
- [Notifications](#notifications)
- [Privacy](#privacy)

## Getting started

1. Sign in with Google or GitHub. Each is a separate Gitilizer account, even if both use the same email address, so always sign in the same way.
2. On the welcome page, choose **Connect GitHub** ([Connecting
   GitHub](#connecting-github)). Signing in with GitHub doesn't give Gitilizer
   access to your issues: it reads GitHub only through the connection you make
   here.
3. Back on the welcome page, paste a **Gemini API key** if you have one, or
   create one: it is free, and works on Google's free tier within a small daily
   quota ([Free-tier limits](#free-tier-limits)). Then choose **Save and
   start**. Gitilizer checks the key first and saves it only if it works;
   otherwise it says what's wrong under the field.
4. Or leave the key blank and choose **Continue with basic ranking**. Gitilizer
   then ranks your list itself: good for your top items, less precise below
   them, with no explanation for each rank ([Basic ranking](#basic-ranking)).
   You can add a key at any time in Settings.

Gitilizer then scans your issues and PRs and ranks each one. The list fills in
as items are ranked.

To use Claude or OpenAI, or a personal access token in place of Connect GitHub,
choose **Advanced setup** on the welcome page before connecting. It opens
Settings, where you can set up everything; saving there finishes setup too. You
can change the GitHub connection, the key and how your list is ranked later in
Settings.

Optionally, in Settings:

- **Additional repositories** adds every open issue and PR in a repository you follow. A prioritization prompt (for example "Security issues only") tells the ranking agent what you care about there.
- **Teams** adds the PRs that ask one of your GitHub teams for a review, for example through a repository's CODEOWNERS file. Type a team as `org/team`, or choose **Find my teams** to see the teams that are asking you for reviews. Without a prioritization prompt, a team's PRs are ranked like any request to a team, usually low; a prompt such as "I review most of this team's PRs" tells the ranking agent how much of the team's reviewing is yours. A team GitHub doesn't know, or your connection can't see, shows **Not found**.
- **Ranking prompt** changes the instructions the agent follows when it scores an item. **Restore default** puts back Gitilizer's own prompt, which improves over time.
- **Collaborators** are people whose issues, PRs and comments should rank higher.

**Save changes** keeps the existing ranks until items change. **Save and re-rank** ranks every item again, which uses more of your ranking agent's quota or credits; it needs an API key of your own, so it is greyed out on basic ranking.

## Connecting GitHub

Gitilizer needs to read your issues and PRs on GitHub. **Connect GitHub** does
that in one click: GitHub asks you to authorize the Gitilizer app, and sends
you back. There is nothing to create, copy or renew.

### What Gitilizer can read

- **Issues, pull requests and repository metadata, read-only.** The Gitilizer
  app can't change anything on GitHub, and it can't read your code, except the
  changes in a pull request, which are part of the pull request.
- **Every public repository**, in any account, as soon as you connect. Nothing
  needs to be installed for these.
- **Private repositories only where the app is installed.** In Settings, "Add
  or change private repositories" opens GitHub, where you choose an account
  (yours, or an organization) and either all its repositories or the ones you
  pick. Their issues and PRs join your list at the next scan.

Settings shows what Gitilizer can read under the GitHub card: public
repositories, and each account where the app is installed.

### Private repositories in an organization

Only an owner of an organization can install the app on it. If you aren't an
owner, GitHub sends your request to the owners, and the organization's private
items appear once one of them approves. Where Gitilizer can tell, Settings
shows the organization as "waiting for an owner to approve" until then.

If the organization won't install the app, use a
[personal access token](#github-personal-access-tokens) instead. That is the
one case where a token reaches more than the app. Organizations that require
single sign-on aren't supported with the app yet; a token works there too.

### Things that can need you

- **"Gitilizer can't read {permission} in {account}".** The account installed
  the app before it asked for that permission, or declined it. An owner
  approves it under the account's installed GitHub Apps; "Review on GitHub" in
  Settings opens that page.
- **"Your GitHub connection has ended".** You removed Gitilizer's access on
  GitHub, or Gitilizer hasn't been opened for about six months. Your list and
  settings are kept. Choose **Reconnect GitHub** in Settings.
- **A different GitHub account.** "Reconnect" in Settings runs the connection
  again; sign in to the other account on GitHub first.

To remove Gitilizer's access, revoke the Gitilizer app under
[Applications](https://github.com/settings/applications) in your GitHub
settings, or uninstall it from an account. Deleting your Gitilizer account
also asks GitHub to revoke the authorization.

### One connection at a time

Gitilizer uses the app or a token, never both. Connecting the app deletes a
saved token, and saving a token ends the app's connection.

## GitHub personal access tokens

A personal access token is the alternative to [Connect
GitHub](#connecting-github), for private repositories in an organization that
won't install the Gitilizer app. Choose "Or use a personal access token" on the
welcome page, or "Use a personal access token instead" in Settings. Gitilizer
only ever reads with it; it never writes to GitHub. GitHub has two kinds of
token, and Gitilizer accepts both.

### Fine-grained token (recommended)

A fine-grained token can be read-only. Create one at [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new):

1. **Resource owner:** you, or the organization whose private repositories you need. A fine-grained token reads the private repositories of **one owner** only.
2. **Repository access:** "All repositories", or the ones you want scanned.
3. **Permissions → Repository permissions:** Issues: **Read-only**, Pull requests: **Read-only**. Metadata: Read-only is added automatically.
4. Choose an expiry date. Gitilizer warns you 7 days before it expires.

Some organizations must approve fine-grained tokens before they work; GitHub shows the request as pending until an owner approves it.

Public repositories, and the issues and PRs where you're mentioned or assigned in them, are readable whichever owner you choose.

### Classic token

A classic token with the `repo` scope reads every repository you can access, in every organization. It also allows writing, so use one only if your private repositories belong to more than one owner. Gitilizer still only reads with it. Create one at [github.com/settings/tokens/new](https://github.com/settings/tokens/new) and tick **repo**.

### One token per account

Gitilizer takes one token per account. If an organization blocks one kind of token, create the other kind, or ask an owner of the organization to allow yours. If an organization uses single sign-on, authorize the token for it in your [GitHub personal access token settings](https://github.com/settings/tokens) ("Configure SSO").

Validate, next to the token field, checks a token before you save it and shows which GitHub account it belongs to.

## Ranking agents

The ranking agent is the AI that reads each issue and PR and gives it a score. You can choose one of three, each with your own API key, or none of them ([Basic ranking](#basic-ranking)):

| Agent | Company | Cost |
|---|---|---|
| Gemini | Google | Free tier available, with a small daily quota. A key with billing turned on avoids pauses. |
| Claude | Anthropic | No free tier: Anthropic bills your account for each item ranked. |
| OpenAI | OpenAI | No free tier: OpenAI bills your account for each item ranked. |

Gitilizer chooses the model for each agent. Whichever you choose, it sends one request for each new or changed item, and one for every item once a day so that scores that depend on age stay current. Gitilizer recommends Gemini: it ranked best in our tests, at the lowest cost. Claude and OpenAI rank about as well and cost more for each item, so they suit you best if you or your company already has an API account with Anthropic or OpenAI.

**Switching agents.** In Settings, choose another agent in **Ranking agent**, add its key if you haven't before, and save. Gitilizer keeps the keys of the agents you aren't using, so you can switch back without pasting a key again, until you choose **Remove**. Scores from different agents don't line up exactly, so when you switch with **Save changes**, Gitilizer asks whether to rank everything again now (**Switch and re-rank**), or rank new and changed items now and the rest at the daily re-rank, within 24 hours (**Switch**).

**When ranking pauses.** If your agent's key stops working, or its credits or quota run out, Gitilizer pauses ranking and shows a notification saying what to fix. New and changed items wait at the end of your list with "–". Ranking resumes by itself when the problem is fixed, and at once when you add a new key or switch agents.

## Basic ranking

With no API key of your own, Gitilizer ranks your list itself. It is what you
get when you choose **Continue with basic ranking** on the welcome page, or
**Basic ranking** under **Ranking agent** in Settings. It costs you nothing and
needs no setup. Gitilizer pays for it, so it does less than a ranking agent with
your own key:

| | Your own API key | Basic ranking |
|---|---|---|
| Who ranks | The agent you choose: Gemini, Claude or OpenAI | Google's `gemini-decision-1`, with Gitilizer's own key |
| Cost to you | Gemini's free tier, or what the company bills you | Nothing |
| Accuracy | The best Gitilizer has | Good for your top items: in our tests its first five were the same five as in a list ranked by hand. Below them the order is less precise. |
| Next step on each item | Yes | Yes |
| Why an item has its rank | Click a rank to read what to do next and the agent's reasoning | No explanation, so ranks can't be clicked |
| New and changed items | Ranked at each sync | Ranked at each sync |
| Daily re-rank | Every item is scored again once a day, so scores that depend on age stay current | None: an item keeps its score until it changes on GitHub |
| **Save and re-rank** | Ranks everything again | Not available |
| When it runs out | Your key's quota or credits ([When ranking pauses](#ranking-agents)) | Gitilizer's own quota: the warning **"Basic ranking is paused"** |

**Basic ranking is paused.** Every developer on basic ranking shares Gitilizer's
own quota with Google. When it is used up, new and changed items wait at the end
of your list with "–", and the warning says when ranking resumes, if Gitilizer
knows. It tries again every 15 minutes. Adding your own key in Settings ranks
them without waiting.

**Changing your mind.** To move to a ranking agent, choose it under **Ranking
agent** in Settings, add its key and save; Gitilizer asks whether to rank
everything again with it now. To move to basic ranking, choose **Basic ranking**
there and save. Your items keep the scores they have, and a key you saved stays
saved until you remove it.

What basic ranking sends to Google is in [Privacy](#privacy).

## Gemini API keys

Create a key in [Google AI Studio](https://aistudio.google.com/apikey). A key on Google's free tier works. Gitilizer makes one Gemini request for each new or changed item, and for every item once a day so that scores that depend on age stay current.

### Free-tier limits

A free-tier key has a small **daily quota** for each Gemini model: a limit on how many requests it can make per day. You can see your key's limits in [AI Studio](https://aistudio.google.com/rate-limit). Quotas belong to the key's Google Cloud project, not to Gitilizer, so other apps that use a key from the same project share them. They reset at **midnight Pacific time**.

A first sync, or **Save and re-rank**, sends one request for every item on your list, which can use up a free-tier quota quickly. When that happens, Gitilizer doesn't stop:

1. It ranks with its main model, `gemini-3.8-flash`, while that model's quota lasts.
2. When it's used up, Gitilizer switches to a smaller backup model,
   `gemini-3.5-flash-lite`, which has its own quota, and shows the warning
   **"Gitilizer is using a backup Gemini model"**. Its rankings are less
   accurate.
3. When that is used up too, Gitilizer ranks new and changed items with [basic
   ranking](#basic-ranking), using its own key, and the warning's heading
   becomes **"Gitilizer is using basic ranking"**. Those items get a rank with
   no explanation. A **Save and re-rank** or daily re-rank that was under way
   stops there: the items it didn't reach keep their scores.
4. At midnight Pacific time Gitilizer goes back to the main model, and the daily
   re-rank gradually improves the scores.

If Gitilizer's own quota for basic ranking is used up as well, the warning
**"Basic ranking is paused"** takes its place, and new and changed items wait at
the end of your list with "–" until your quota resets or basic ranking resumes.

Gitilizer also slows down by itself when Gemini limits how many requests your key can make per minute; that is a separate, short limit.

### Getting a paid key

A key with billing turned on has much higher limits, so it rarely runs out, and Google doesn't use what it's sent to improve its products (see [Privacy](#privacy)). To turn billing on for your key's project, follow Google's [billing instructions](https://ai.google.dev/gemini-api/docs/billing): in AI Studio, set up billing for the project, attach a Cloud billing account and add prepaid credit. Your existing key keeps working, so you don't need to change anything in Gitilizer. Google's [rate limits page](https://ai.google.dev/gemini-api/docs/rate-limits) explains the limits of each tier.

## Claude API keys

Create a key in the [Claude Console](https://platform.claude.com/settings/keys) and add credits to your account there. A Claude Pro subscription doesn't cover this: Anthropic bills API usage separately, to a Console account. Gitilizer ranks with `claude-sonnet-5-5`. If your key belongs to a workspace that limits which models it can use, allow that one.

When your credits run out, or you reach a spend limit you set, Gitilizer pauses ranking and shows **"Your Anthropic credits have run out"**. It tries again every 15 minutes, so ranking resumes soon after you add credits. A new account's usage tier also limits how many requests a minute it can make; Gitilizer slows down by itself when it reaches that limit.

## OpenAI API keys

Create a key in the [OpenAI dashboard](https://platform.openai.com/api-keys) and add credits to your account there. A ChatGPT Plus subscription doesn't cover this: OpenAI bills API usage separately, to an API account. Gitilizer ranks with `gpt-6.1-sol`. If your key or its project limits which models it can use, allow that one.

When your credits run out, or you reach a spend or usage limit, Gitilizer pauses ranking and shows **"Your OpenAI credits have run out"**. It tries again every 15 minutes, so ranking resumes soon after you add credits.

## Your list

- An item is on your list if it's open, its repository isn't archived, and your review is requested, you're assigned, you're @-mentioned by name, you created it, you commented on it, it's in one of your additional repositories, or it asks one of the teams in your Settings for a review. Other teams' review requests and team mentions don't count.
- The list holds the 1,000 most recently updated items.
- Ranks come from the agent's scores. Items that couldn't be ranked are shown at the end with "–".
- The line under each title starts with the item's next step, which says whose move it is. **Review**, **Respond** and **To do** are on you; **Backlog** is yours but nothing is pressing. **Waiting** means someone else has the next move, **Elsewhere** that you'd act on a linked or lower PR instead, and **Not yours** that there's nothing for you to do. **Team review** and the like mean it's on you only through one of your teams; anything personal, such as an @-mention or a comment of yours, makes it plain **Review**. Items ranked before next steps existed get one when they're next ranked.
- Click a rank to see what to do next on the item, in a sentence, and why it has its rank.
- The strip above the list searches it by title, repository or number, and **All**, **PRs** and **Issues** show one type. A filtered list keeps each item's rank in the whole list. The search and filter are in the page's address, so you can bookmark them.
- Press **/** to jump to the search field. If single-key shortcuts get in your way, for example with speech input, turn off **Keyboard shortcuts** under Preferences in Settings; Tab, Enter and Esc work either way.
- **Move to icebox** sets an item aside. If it changes later in a way that matters (for example, someone comments), Gitilizer brings it back. Bot comments and label changes don't. **Restore** brings it back yourself.
- Gitilizer scans every 5 minutes while the list is open in a visible tab, every 30 minutes while it's in a background tab, and every 2 hours otherwise, if you've used Gitilizer in the last 7 days. **Sync now** scans at once; it is greyed out, with its icon turning, while a sync is already running. It is also greyed out while Gitilizer can't read GitHub at all, for example after your GitHub connection has ended; the link next to it, such as **Reconnect GitHub**, opens the setting that fixes it.

## Notifications

The bell shows problems that stop Gitilizer from working fully. Red means an error that needs you; amber means a warning that will probably fix itself. Each notification goes away by itself once the problem is fixed.

| Notification | What it means and what to do |
|---|---|
| GitHub isn't connected | Choose Connect GitHub in Settings, or add a personal access token. |
| Your GitHub connection has ended | Access was removed on GitHub, or Gitilizer wasn't opened for six months. Choose Reconnect GitHub in Settings ([Connecting GitHub](#connecting-github)). |
| Gitilizer can't read {permission} in {account} | The account hasn't approved that permission for the Gitilizer app, so its private issues or PRs may be missing. An owner approves it on GitHub. |
| Your GitHub personal access token has expired | Create a new token and add it in Settings. |
| Your GitHub personal access token isn't valid | The token was revoked, deleted or mistyped. Add a new one. |
| {org} doesn't allow this type of token | The organization blocks classic or fine-grained tokens. Use the other kind, or ask an owner to allow yours. |
| Your GitHub personal access token can't read {permission} | Give the token read access to issues, PRs and metadata. |
| Your token isn't authorized for {org} | The organization uses single sign-on. Authorize the token for it, then choose Sync now. |
| GitHub sent an unexpected response | Gitilizer keeps retrying. Report it on GitHub if it continues. |
| GitHub's rate limit has been reached | GitHub limits each account's requests. Other tools you use on GitHub may share the limit. Scanning resumes when it resets. |
| GitHub isn't responding | Check [githubstatus.com](https://www.githubstatus.com). Gitilizer keeps retrying. |
| Your GitHub personal access token will expire soon | Create a new token before the date and add it in Settings. |
| Gitilizer can't access {repo} | The repository doesn't exist, was misspelled, or Gitilizer can't read it: the Gitilizer app isn't installed for it, or your token doesn't include it. |
| Your Gemini API key isn't valid / Google has disabled your Gemini API key | Create a new key in Google AI Studio and add it in Settings. Google disables keys that were published, for example in a public repository. |
| Your Gemini API key can't use the Gemini API | The key is restricted to other Google APIs. Create a new key in Google AI Studio. |
| Your Gemini credits have run out / Your Gemini project needs billing | Fix billing for the key's project in Google AI Studio or the Google Cloud console. |
| Gitilizer is using a backup Gemini model / Gitilizer is using basic ranking | Your main model's daily quota is used up, or the backup model's too; see [Free-tier limits](#free-tier-limits). A [paid key](#getting-a-paid-key) avoids this. |
| Basic ranking is paused | Gitilizer's own ranking quota is used up, so new and changed items wait with "–". Ranking resumes by itself; adding your own API key in Settings ranks them without waiting ([Basic ranking](#basic-ranking)). |
| Gemini is limiting requests from your key | Too many requests a minute. Ranking slows down and catches up by itself. |
| Gemini isn't responding | Check the [Google AI Studio status page](https://aistudio.google.com/status). |
| The Gemini model Gitilizer uses isn't available | A problem with Gitilizer. Please report it. |
| Gemini sent an unexpected response | Gitilizer keeps retrying. Report it if it continues. |
| Your Claude API key isn't valid / Your OpenAI API key isn't valid | Create a new key in the Claude Console or the OpenAI dashboard and add it in Settings. |
| Your Claude API key can't use the model Gitilizer uses / Your OpenAI API key can't use the model Gitilizer uses | The key is restricted to other models, or OpenAI doesn't serve your region. Allow the model, or create a new key. |
| Your Anthropic credits have run out / Your OpenAI credits have run out | Add credits, or raise your spend limit. Ranking resumes within 15 minutes. |
| Claude is limiting requests from your key / OpenAI is limiting requests from your key | Too many requests a minute for your usage tier. Ranking slows down and catches up by itself. |
| Claude isn't responding / OpenAI isn't responding | Check [status.claude.com](https://status.claude.com) or [status.openai.com](https://status.openai.com). Gitilizer keeps retrying. |
| The Claude model Gitilizer uses isn't available / The OpenAI model Gitilizer uses isn't available | A problem with Gitilizer. Please report it. |
| Claude sent an unexpected response / OpenAI sent an unexpected response | Gitilizer keeps retrying. Report it if it continues. |
| Your ranking prompt isn't working | Most items couldn't be ranked with your custom prompt. Edit it or restore the default. |
| Gitilizer couldn't rank {n} issues and PRs | Those items are shown with "–". Gitilizer tries again when they change. |
| Can't connect to Gitilizer | Your browser can't reach Gitilizer. Check your connection. |
| Gitilizer couldn't finish scanning | A problem on Gitilizer's side. Please report it if it continues. |
| Your issues and PRs haven't updated since {time} | No scan has finished for 3 hours. Try Sync now. Not shown while a GitHub connection or token error that pauses scanning is. |

Report problems at [github.com/brianquinlan/gitilizer/issues](https://github.com/brianquinlan/gitilizer/issues).

## Privacy

Gitilizer's [privacy policy](https://gitilizer.com/docs/privacy) says what
Gitilizer collects and stores, how it uses it, who else sees it, how long it
keeps it, and how to have it deleted. This section adds what each AI provider's
terms say about what Gitilizer sends it, which can help you choose a ranking
agent.

### What Gitilizer sends to your ranking agent

Gitilizer calls the ranking agent you chose, and only that one, with **your own API key**, one item at a time. Basic ranking is the one exception, described below. Each request contains the content of one of your issues or PRs (title, description, labels, comments, reviews and the items it links to) and your settings (your GitHub username, additional repositories with their prioritization prompts, collaborators and ranking prompt, and, with a PR that asks one of your teams for a review, that team's prioritization prompt). It never contains your credentials.

What each company may do with that content depends on its terms. It can come from private repositories you can read.

- **Gemini:** Google's [Gemini API terms](https://ai.google.dev/gemini-api/terms) let Google use content sent with a **free-tier** (unpaid) key to improve its products, and say that human reviewers may read it. If that matters to you, use a key with billing turned on: Google says it doesn't use prompts or responses sent with paid quota to improve its products.
- **Claude:** Anthropic's [commercial terms](https://www.anthropic.com/legal/commercial-terms) say it may not train models on what you send through the API. Anthropic keeps API requests for a limited time; its [privacy center](https://privacy.claude.com) says for how long.
- **OpenAI:** OpenAI's [data controls](https://developers.openai.com/api/docs/guides/your-data) say that data sent to its API isn't used to train its models unless you opt in, and that it keeps abuse-monitoring logs for up to 30 days. Gitilizer asks OpenAI not to store its requests for later retrieval.

**Basic ranking.** If you use basic ranking, Gitilizer sends the same content,
one item at a time, to Google's Gemini API with **Gitilizer's own key**. That
key is on Google's paid tier, where Google says it doesn't use prompts or
responses to improve its products. The same happens for new and changed items
when your own Gemini key's daily quota is used up ([Free-tier
limits](#free-tier-limits)). Gitilizer's key is never used with Claude or
OpenAI, and never to read GitHub.
