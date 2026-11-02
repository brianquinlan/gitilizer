# Deploying Gitilizer

Gitilizer runs in two places: a development environment at `dev.gitilizer.com` and production at `gitilizer.com`. This page explains how they differ, how a change reaches each of them, how to release to production, and who can sign in to development.

[DESIGN.md](DESIGN.md#deployment) explains why it works this way. The pipeline described here is designed but not built yet; [DESIGN.md](DESIGN.md#prototype-status) tracks what's done.

## Development and production

| | Development | Production |
|---|---|---|
| Address | `https://dev.gitilizer.com` | `https://gitilizer.com` |
| What runs there | Whatever is on `main`, minutes after it merges | The last release |
| How it gets there | Automatically, after every merge to `main` whose checks pass | A `release-*` tag, approved by the owner |
| Cloud Run | `gitilizer-dev`: one service running everything, scaling to zero when no one is using it | `gitilizer-api` (the API and web app) and `gitilizer-worker` (scheduler, scanner and ranking worker) |
| Database | `gitilizer_dev` | `gitilizer` (same Cloud SQL instance, separate databases) |
| Credential key and sign-in apps | Its own | Its own |
| Who can sign in | Only accounts on the [allowlist](#who-can-sign-in-to-development) | Everyone |
| GitHub and Gemini | Real, with each person's own GitHub token and Gemini key | The same |

Both environments are in the `gitilizer` Google Cloud project ([D-8](DESIGN.md#d-8)), but neither can reach the other's database or credential key.

Things to know about development:

- **It runs untested code with your real credentials.** Anything merged to `main` runs there before anyone has tried it. It reads GitHub with your token and ranks with your Gemini key, so a bug can use up your Gemini quota. If that worries you, give development a separate free-tier key.
- **Its data is separate.** An account on development is a different account from your production one. You enter your credentials again, and your list starts empty.
- **It scans only while someone has it open.** The service scales to zero when idle, so background scans pause and the list catches up when you return.

## How a change reaches development

1. **Open a pull request.** GitHub Actions runs `npm run typecheck`, `npm test` and the browser checks in fixture mode. Merging needs them to pass.
2. **Merge it to `main`.** Cloud Build builds one container image, tags it with the commit's SHA, stores it in Artifact Registry and deploys it to `gitilizer-dev`.
3. **Try it on `dev.gitilizer.com`.** The build's status is on the commit in GitHub. To see which commit development is running:

   ```sh
   gcloud run services describe gitilizer-dev --region us-east4 \
     --format='value(spec.template.spec.containers[0].image)'
   ```

   The part after the last `:` is the commit's SHA.

## Releasing to production

A release deploys an image that development has already run. Nothing is rebuilt, so what you tried is exactly what ships.

1. **Choose the commit.** It must be on `main`, and its development deployment must have succeeded. Usually it's the commit development is running now.
2. **Tag it and push the tag.** Name the tag `release-` followed by the date. For a second release on the same day, add `.2`, then `.3`, and so on.

   ```sh
   git fetch origin
   git tag -a release-2026-11-15 <commit-sha> -m "Sign-in allowlist for development"
   git push origin release-2026-11-15
   ```

   The tag message is the release note, so say what changed.
3. **Approve the deployment.** Pushing the tag starts the **Release** workflow in GitHub Actions. It waits for approval on the `production` environment: open the run and choose **Review deployments**, then **Approve and deploy**.
4. **Let it deploy.** The workflow checks that Artifact Registry has an image for the tagged commit. It stops if there isn't one, for example because the commit never reached development. Otherwise it deploys that image to `gitilizer-worker` and then `gitilizer-api`, and sends all traffic to the new revisions.
5. **Check it.** Open `gitilizer.com`, sign in and check that the list loads. The Cloud Monitoring dashboard should show no new errors.

Tags are the record of what was released, so never move, reuse or delete one. To list past releases:

```sh
git tag --list 'release-*' -n1
```

### Database changes

The server upgrades the database schema when it starts. During a release the old and new revisions run side by side for a short time, so every schema change must work with both. Add a column in one release, and stop using an old one in a later release. Never rename or drop a column in a single release.

### Rolling back

Cloud Run keeps earlier revisions, so rolling back takes seconds and doesn't rebuild anything. Roll back both production services:

```sh
gcloud run revisions list --service gitilizer-api --region us-east4
gcloud run services update-traffic gitilizer-api --region us-east4 --to-revisions <previous-revision>=100
```

Then do the same for `gitilizer-worker`. A rollback doesn't undo schema changes, which is why changes must work with the previous release. The next release's workflow sends traffic to its new revisions again. Fix the problem on `main`, check it on development and release again.

## Who can sign in to development

Development lets in only the accounts on its allowlist. It runs code that no one has tried yet with the credentials of whoever signs in, so it shouldn't be open to everyone ([PRD Q-80](PRD.md#q-80)). Production has no allowlist.

### The setting

The allowlist is the `SIGN_IN_ALLOWLIST` setting (an environment variable) on the `gitilizer-dev` service. It isn't in the repository, so the testers' email addresses stay out of Git. Entries are separated by spaces:

| Entry | Lets in | Example |
|---|---|---|
| `google:<email>` | A Google account, by email address. Matching ignores upper and lower case, and Google must have verified the address. | `google:maya@gmail.com` |
| `github:<username>` | A GitHub account, by username. Matching ignores upper and lower case. | `github:octocat` |
| `github-id:<number>` | A GitHub account, by its numeric ID. | `github-id:583231` |

Prefer `github-id:` for GitHub accounts. After someone renames their GitHub account, anyone can claim the old username and would then match a `github:` entry. The ID never changes. To find someone's ID:

```sh
gh api users/octocat --jq .id
```

The setting also accepts commas or new lines between entries, but use spaces with `gcloud`, which treats commas as separators of its own.

### Adding or removing someone

See the current list:

```sh
gcloud run services describe gitilizer-dev --region us-east4 | grep -A1 SIGN_IN_ALLOWLIST
```

Set the new list. This replaces the whole value, so include everyone who should keep access:

```sh
gcloud run services update gitilizer-dev --region us-east4 \
  --update-env-vars "SIGN_IN_ALLOWLIST=google:you@gmail.com github-id:583231 google:maya@gmail.com"
```

This starts a new revision of `gitilizer-dev` within seconds. Deployments from `main` keep the setting, because deploying a new image doesn't change it.

What happens next:

- **Someone added** can sign in straight away.
- **Someone removed** is signed out on their next request. They see "This is Gitilizer's development site, and only invited accounts can sign in. Ask the owner for access."
  - Their account and data stay, so adding them back restores everything.
  - To remove their data too, they can delete their account before you remove them. You can also delete the account's row in `users` in `gitilizer_dev`.
- **Someone not on the list** sees the same message when they try to sign in. No account is created.
  - The log records `sign-in refused: not on the allowlist` with the provider, but not their email or username.
  - Ask them for their Google address or their GitHub username to add them.

### Safety checks

- **Missing allowlist:** development sets `GITILIZER_ENV=development`, and in that environment the server refuses to start without an allowlist. A lost setting therefore can't open the development site to everyone.
- **Malformed entry:** an entry the server can't read, such as `maya@gmail.com` without `google:`, also stops it from starting. The log names the entry.
- **What a failed start means:** in both cases the new revision fails to start, and Cloud Run keeps sending traffic to the previous one. Correct the setting and run the command again.
- **Local mode** (`npm run local`) ignores the allowlist, because only you can sign in.

The server tests (`app/server/test/server.test.ts`, "sign-in allowlist") cover these cases:

- reading the setting;
- refusing to start without it in development;
- matching each kind of entry;
- refusing a sign-in without creating an account;
- signing out an account that was removed.
