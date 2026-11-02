# Gitilizer user guide

Gitilizer collects your open GitHub issues and pull requests into one list and uses Google's Gemini to put them in priority order. This guide explains how to set it up, what the notifications mean, and what Gitilizer does with your data.

- [Getting started](#getting-started)
- [GitHub tokens](#github-tokens)
- [Gemini API keys](#gemini-api-keys)
- [Your list](#your-list)
- [Notifications](#notifications)
- [Privacy](#privacy)

## Getting started

1. Sign in with Google or GitHub. Each is a separate Gitilizer account, even if both use the same email address, so always sign in the same way.
2. On the Settings page, add a [GitHub personal access token](#github-tokens) and a [Gemini API key](#gemini-api-keys). Both are free. Signing in with GitHub doesn't give Gitilizer access to your issues: it reads GitHub only with the token you add.
3. Choose **Save changes**. Gitilizer scans your issues and PRs and ranks each one. The list fills in as items are ranked.

Optionally, in Settings:

- **Additional repositories** adds every open issue and PR in a repository you follow. A prioritization prompt (for example "Security issues only") tells the ranking agent what you care about there.
- **Ranking prompt** changes the instructions the agent follows when it scores an item. **Restore default** puts back Gitilizer's own prompt, which improves over time.
- **Collaborators** are people whose issues, PRs and comments should rank higher.

**Save changes** keeps the existing ranks until items change. **Save and re-rank** ranks every item again, which uses more of your Gemini quota.

## GitHub tokens

Gitilizer reads your issues and PRs with a personal access token that you create. It only ever reads; it never writes to GitHub. GitHub has two kinds of token, and Gitilizer accepts both.

### Fine-grained token (recommended)

A fine-grained token can be read-only. Create one at [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new):

1. **Resource owner:** you, or the organization whose private repositories you need. A fine-grained token reads the private repositories of **one owner** only.
2. **Repository access:** "All repositories", or the ones you want scanned.
3. **Permissions → Repository permissions:** Issues: **Read-only**, Pull requests: **Read-only**. Metadata: Read-only is added automatically.
4. Choose an expiry date. Gitilizer warns you 7 days before it expires.

Some organizations must approve fine-grained tokens before they work; GitHub shows the request as pending until an owner approves it.

Public repositories, and the issues where you're mentioned or assigned in them, are readable whichever owner you choose.

### Classic token

A classic token with the `repo` scope reads every repository you can access, in every organization. It also allows writing, so use one only if your private repositories belong to more than one owner. Gitilizer still only reads with it. Create one at [github.com/settings/tokens/new](https://github.com/settings/tokens/new) and tick **repo**.

### One token per account

Gitilizer takes one token per account. If an organization blocks one kind of token, create the other kind, or ask an owner of the organization to allow yours. If an organization uses single sign-on, authorize the token for it in your [GitHub token settings](https://github.com/settings/tokens) ("Configure SSO").

Validate, next to the token field, checks a token before you save it and shows which GitHub account it belongs to.

## Gemini API keys

Create a key in [Google AI Studio](https://aistudio.google.com/apikey). A key on Google's free tier works. Gitilizer makes one Gemini request for each new or changed item, and for every item once a day so that scores that depend on age stay current.

Free-tier keys have a small daily quota. When the quota for Gitilizer's main model runs out, Gitilizer switches to smaller backup models until the quota resets at midnight Pacific time, and tells you with a warning. If every model's quota runs out, ranking pauses until the reset, and new items wait at the end of the list with "–". A key with billing turned on avoids this.

## Your list

- An item is on your list if it's open, its repository isn't archived, and your review is requested, you're assigned, you're @-mentioned by name, you created it, you commented on it, or it's in one of your additional repositories. Team review requests and team mentions don't count.
- The list holds the 1,000 most recently updated items.
- Ranks come from the agent's scores. Items that couldn't be ranked are shown at the end with "–".
- **Move to icebox** sets an item aside. If it changes later in a way that matters (for example, someone comments), Gitilizer brings it back. Bot comments and label changes don't. **Restore** brings it back yourself.
- Gitilizer scans every 5 minutes while the list is open in a visible tab, every 30 minutes while it's in a background tab, and every 2 hours otherwise, if you've used Gitilizer in the last 7 days. **Sync now** scans at once.

## Notifications

The bell shows problems that stop Gitilizer from working fully. Red means an error that needs you; amber means a warning that will probably fix itself. Each notification goes away by itself once the problem is fixed.

| Notification | What it means and what to do |
|---|---|
| Your GitHub token has expired | Create a new token and add it in Settings. |
| Your GitHub token isn't valid | The token was revoked, deleted or mistyped. Add a new one. |
| {org} doesn't allow this type of token | The organization blocks classic or fine-grained tokens. Use the other kind, or ask an owner to allow yours. |
| Your GitHub token can't read {permission} | Give the token read access to Issues, Pull requests and Metadata. |
| Your token isn't authorized for {org} | The organization uses single sign-on. Authorize the token for it, then choose Sync now. |
| GitHub sent an unexpected response | Gitilizer keeps retrying. Report it on GitHub if it continues. |
| GitHub's rate limit has been reached | GitHub limits each token's requests. Other tools using the same token share the limit. Scanning resumes when it resets. |
| GitHub isn't responding | Check [githubstatus.com](https://www.githubstatus.com). Gitilizer keeps retrying. |
| Your GitHub token will expire soon | Create a new token before the date and add it in Settings. |
| Gitilizer can't access {repo} | The repository doesn't exist, was misspelled, or your token can't read it. |
| Your Gemini API key isn't valid / Google has disabled your Gemini API key | Create a new key in Google AI Studio and add it in Settings. Google disables keys that were published, for example in a public repository. |
| Your Gemini API key can't use the Gemini API | The key is restricted to other Google APIs. Create a new key in Google AI Studio. |
| Your Gemini credits have run out / Your Gemini project needs billing | Fix billing for the key's project in Google AI Studio or the Google Cloud console. |
| Gitilizer is using a backup Gemini model | Your main model's daily quota is used up; see [Gemini API keys](#gemini-api-keys). |
| Your Gemini daily quota is used up | Every model's quota is used up. Ranking resumes at midnight Pacific time. |
| Gemini is limiting requests from your key | Too many requests a minute. Ranking slows down and catches up by itself. |
| Gemini isn't responding | Check the [Google AI Studio status page](https://aistudio.google.com/status). |
| The Gemini model Gitilizer uses isn't available | A problem with Gitilizer. Please report it. |
| Gemini sent an unexpected response | Gitilizer keeps retrying. Report it if it continues. |
| Your ranking prompt isn't working | Most items couldn't be ranked with your custom prompt. Edit it or restore the default. |
| Gitilizer couldn't rank {n} issues | Those items are shown with "–". Gitilizer tries again when they change. |
| Can't connect to Gitilizer | Your browser can't reach Gitilizer. Check your connection. |
| Gitilizer couldn't finish scanning | A problem on Gitilizer's side. Please report it if it continues. |
| Your issues haven't updated since {time} | No scan has finished for 3 hours. Try Sync now. |

Report problems at [github.com/brianquinlan/gitilizer/issues](https://github.com/brianquinlan/gitilizer/issues).

## Privacy

### What Gitilizer stores

- **Your account:** your name, email address and picture from Google or GitHub, and which one you signed in with.
- **Your credentials:** your GitHub token (with its expiry date) and your Gemini API key. They're encrypted, never shown again after you save them, never written to logs and never sent to Gemini.
- **Your settings:** additional repositories and their prioritization prompts, collaborators, your ranking prompt and your sort order.
- **Your items:** the GitHub data needed to rank and show each item (its text, comments, reviews and linked items), and for each item its score, the agent's reasoning, and whether you moved it to the Icebox.
- **Notifications** that are currently active.

### When it's deleted

- **Item data** is deleted 30 days after it leaves your list and Icebox (because it was closed, stopped matching, or fell outside the 1,000 most recent), unless another Gitilizer user still has the item.
- **Everything about you** is deleted at once when you choose **Delete account** in Settings.
- **Backups** keep copies for up to 6 months. Credentials stay encrypted in them, and if a backup is ever restored, deleted accounts are deleted again.

### What Gitilizer sends to Gemini

Gitilizer calls Gemini with **your own API key**, one item at a time. Each request contains the content of one of your issues or PRs (title, description, labels, comments, reviews and the items it links to) and your settings (your GitHub username, additional repositories with their prioritization prompts, collaborators and ranking prompt). It never contains your credentials.

Google's [Gemini API terms](https://ai.google.dev/gemini-api/terms) let Google use content sent with a **free-tier** (unpaid) key to improve its products, and say that human reviewers may read it. That content can come from private repositories you can read. If that matters to you, use a key with billing turned on: Google says it doesn't use prompts or responses sent with paid quota to improve its products.
