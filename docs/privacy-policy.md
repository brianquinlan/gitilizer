# Gitilizer privacy policy

Last updated: November 20, 2026

Gitilizer ([gitilizer.com](https://gitilizer.com)) shows developers one list of
their open GitHub issues and pull requests, ranked by how much each one needs
their attention. It is run by Brian Quinlan, an individual, as a hobby project.
This policy says what Gitilizer collects, what it does with it, who else sees
it, and how to have it deleted. Questions go to Brian Quinlan at
[brian@sweetapp.com](mailto:brian@sweetapp.com).

## What Gitilizer collects

**When you sign in with Google:** your Google account ID, name, email address
and profile picture. Gitilizer asks Google for nothing else (only the `openid`,
`email` and `profile` scopes). It can't see your Gmail, Drive, contacts or
anything else in your Google account, and it doesn't keep Google's sign-in
tokens.

**When you sign in with GitHub:** your GitHub user ID, username, name, email
address and profile picture. Signing in gives Gitilizer no access to your
repositories.

**What you give Gitilizer in the app:**

- Your GitHub connection: the access the Gitilizer GitHub App is given, or a
  personal access token. Gitilizer only reads from GitHub and never changes
  anything there, even if a token you give it would allow that.
- The API key of each AI provider you add (Google Gemini, Anthropic Claude or
  OpenAI), and which one you use.
- Your settings: additional and excluded repositories, prioritization and
  ranking prompts, collaborators, sort order and whether keyboard shortcuts are
  on.

**What Gitilizer reads from GitHub:** the open issues and pull requests that
involve you, and those in any repositories you add in Settings, which can come
from private repositories you can read. Gitilizer stores the content it needs
to rank and show each one (its title, description, labels, comments, reviews
and linked items) and, for each one, its score, its next step, the AI model's
next action and explanation, and whether you moved it to the Icebox.

**What is recorded when you use it:**

- Google Cloud, which hosts Gitilizer, records each request to the site,
  including your IP address and browser, and Gitilizer's own logs.
- Gitilizer records which days you used it and when you last did, with your
  account, so that the owner can count how many people use it. These records
  are kept for 13 months, or until you delete your account.
- Gitilizer records how long its pages take to load, and counts how many items
  are ranked each day, without anything that identifies you.
- When you delete your account, Gitilizer keeps only the account's internal ID
  (a random code) and the date, so that it can count deleted accounts and
  delete the account again if a backup is ever restored.

**Cookies:** one cookie keeps you signed in, and a short-lived one protects
sign-in while it is in progress. Gitilizer has no advertising or analytics
cookies, and no third-party trackers.

## How Gitilizer uses it

Only to provide Gitilizer to you: to sign you in and show who is signed in, to
find and rank your issues and pull requests, to keep your list up to date, to
tell you when something needs fixing (such as an expired token), and to keep
the service running and secure.

Gitilizer does not sell your data, use it for advertising, or use it to build
profiles of you, and it never will.

## Google user data

Gitilizer's use and transfer to any other app of information received from
Google APIs will adhere to the
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the Limited Use requirements.

The data Gitilizer receives from Google sign-in (your account ID, name, email
address and profile picture) is used only to create your Gitilizer account,
sign you in and show who is signed in. It is never shared with anyone, never
sent to an AI model, and never used to develop, improve or train AI or machine
learning models.

## Who else sees your data

- **The AI provider that ranks your list.** To rank an item, Gitilizer sends its
  content (title, description, labels, comments, reviews and linked items) and
  your ranking settings, including your GitHub username, to the provider you
  chose, using your own API key: Google (Gemini), Anthropic (Claude) or OpenAI.
  If you use basic ranking (because you haven't added a key, or you chose it in
  Settings), or your Gemini key's daily quota runs out, Gitilizer sends the same
  content to Google's Gemini API with Gitilizer's own paid key, under which
  Google says it doesn't use the content to improve its products. Your
  credentials and your Google account data are never sent. What each provider
  may do with what it receives depends on its terms; the
  [user guide](https://github.com/brianquinlan/gitilizer/blob/main/docs/user-guide.md#what-gitilizer-sends-to-your-ranking-agent)
  summarizes them. Gitilizer itself doesn't train AI models on your data.
- **Google Cloud,** which hosts Gitilizer and stores its data in the United
  States, as a service provider.
- **GitHub,** which Gitilizer reads your items from, using the access you gave
  it.
- **Google's and GitHub's image servers,** which your browser contacts in the
  app to load people's profile pictures. Everything else, fonts included, comes
  from gitilizer.com.
- **Anyone the law requires,** if Gitilizer is legally required to disclose
  data.

## How it's protected

- Every connection to gitilizer.com uses HTTPS.
- Your GitHub connection and API keys are encrypted before they are stored,
  with a key kept in Google Cloud Secret Manager. They are never shown again
  after you save them, never written to logs and never sent to an AI provider.
- The database is encrypted at rest by Google Cloud, and only the owner can
  reach it.

## How long it's kept, and deleting it

- **Issues and pull requests** are deleted 30 days after they leave your list
  and Icebox (for example, when they are closed), unless another Gitilizer user
  still has them.
- **Everything about you** is deleted at once when you choose
  **Delete account** in Gitilizer's Settings, apart from the internal ID and
  date described above. If you can't sign in, email
  [brian@sweetapp.com](mailto:brian@sweetapp.com) from the address on your
  account and it will be deleted for you.
- **Backups** keep copies for up to 6 months, with credentials still encrypted.
  If a backup is ever restored, deleted accounts are deleted again.
- **Request records and logs** kept by Google Cloud are deleted after 30
  days.

You can also remove Gitilizer's access at any time: in your
[Google account](https://myaccount.google.com/connections), and on GitHub under
Settings → Applications.

## Children

Gitilizer is not intended for children under 13, and doesn't knowingly collect
their data.

## Changes to this policy

Changes are posted on this page with a new date at the top. Before any change
to how Gitilizer uses Google user data takes effect, you'll be told by email.

## Contact

Brian Quinlan, [brian@sweetapp.com](mailto:brian@sweetapp.com).
