# Deploying Gitilizer

Gitilizer runs in two places: a development environment at `dev.gitilizer.com` and production at `gitilizer.com`. This page explains how they differ, how a change reaches each of them, how to release to production and roll back, how to change a setting or a secret, who can sign in to development, and what watches production.

[DESIGN.md](DESIGN.md#deployment) explains why it works this way. Setting it all up the first time is [LAUNCH_PLAN.md](LAUNCH_PLAN.md), with the scripts in [`infra/`](#the-infra-scripts). To run your own copy in your own Google Cloud project, see [Setting up your own copy](#setting-up-your-own-copy).

## Development and production

| | Development | Production |
|---|---|---|
| Address | `https://dev.gitilizer.com` | `https://gitilizer.com` (`www.gitilizer.com` redirects to it) |
| What runs there | Whatever is on `main`, minutes after it merges | The last release |
| How it gets there | Automatically, after every merge to `main` | A `release-*` tag, approved by the owner |
| Cloud Run | `gitilizer-dev`: one service running everything, scaling to zero when no one is using it | `gitilizer-api`: one service running everything, exactly one instance, always on ([Splitting production](#splitting-production) explains the next step) |
| Database | `gitilizer_dev` | `gitilizer` (same Cloud SQL instance, `gitilizer-pg`, separate databases and users) |
| Runs as | `run-dev` | `run-prod` |
| Secrets | `dev-*` in Secret Manager | `prod-*` in Secret Manager |
| Sign-in apps | Their own Google client and GitHub OAuth app | Their own |
| Who can sign in | Only accounts on the [allowlist](#who-can-sign-in-to-development) | Everyone |
| GitHub and Gemini | Real, with each person's own GitHub token and Gemini key | The same |

Both environments are in the `gitilizer` Google Cloud project ([D-8](DESIGN.md#d-8)), in `us-east4`. Neither can read the other's secrets, so neither can reach the other's database or decrypt the other's credentials.

Things to know about development:

- **It runs untested code with your real credentials.** Anything merged to `main` runs there before anyone has tried it. It reads GitHub with your token and ranks with your Gemini key, so a bug can use up your Gemini quota. If that worries you, give development a separate free-tier key.
- **Its data is separate.** An account on development is a different account from your production one. You enter your credentials again, and your list starts empty.
- **It scans only while someone has it open.** The service scales to zero when idle, so background scans pause and the list catches up when you return.

## How requests reach Gitilizer

```
browser ──https──▶ load balancer (static IPv4 + IPv6, certificate for gitilizer.com and *.gitilizer.com)
                     ├─ gitilizer.com      ──▶ Cloud Run gitilizer-api ──▶ Cloud SQL gitilizer-pg / gitilizer
                     ├─ dev.gitilizer.com  ──▶ Cloud Run gitilizer-dev ──▶ Cloud SQL gitilizer-pg / gitilizer_dev
                     ├─ www.gitilizer.com  ──▶ redirect to https://gitilizer.com
                     └─ anything else      ──▶ redirect to https://gitilizer.com
         ──http───▶ redirect to https
```

- **DNS is at GoDaddy.** `@` and `dev` have A and AAAA records pointing at the load balancer's addresses (`gitilizer-ipv4`, `gitilizer-ipv6`), `www` is a CNAME to `@`, and the CNAME `_acme-challenge` lets Google renew the certificate. Never delete that one.
- **The certificate** is Google-managed (Certificate Manager), renews itself, and covers every subdomain, so a new environment needs no new certificate.
- **The Cloud Run services accept only the load balancer** (`--ingress=internal-and-cloud-load-balancing`). Their `*.run.app` addresses refuse requests.
- **Each service serves the web app and the API** from one container image: the built web app at `/`, the API under `/api/`, and the health check at `/api/health`.
- **Security headers.** The deployed server sends `Strict-Transport-Security`, a Content Security Policy that allows only Gitilizer's own scripts, Google Fonts, and avatars from GitHub and Google, and `X-Frame-Options: DENY`. A new external resource in the web app needs adding to the policy in `app/server/src/app.ts`.

## Settings

A service's settings are environment variables on its Cloud Run service. Secrets come from Secret Manager, so they never appear in the service's description or in Git. `infra/services.sh` sets them all; see [Changing a setting or a secret](#changing-a-setting-or-a-secret).

| Setting | Development | Production | Notes |
|---|---|---|---|
| `GITILIZER_ENV` | `development` | `production` | Turns on the checks below. |
| `NODE_ENV` | `production` | `production` | Both: it makes the session cookie `Secure`. |
| `PUBLIC_URL` | `https://dev.gitilizer.com` | `https://gitilizer.com` | The sign-in redirect URLs are built from it. |
| `GOOGLE_CLIENT_ID`, `GITHUB_CLIENT_ID` | Development's | Production's | Not secret. |
| `SIGN_IN_ALLOWLIST` | The testers | Not set | [Who can sign in to development](#who-can-sign-in-to-development) |
| `DATABASE_POOL_MAX` | `5` | `10` | Connections per instance. Cloud SQL's limit (about 50 on `db-g1-small`) is shared by everything. |
| `HOST`, `LOG_FORMAT`, `LOG_LEVEL` | `0.0.0.0`, `json`, `info` | The same | Also the image's defaults. |
| `DATABASE_URL` | Secret `dev-database-url` | Secret `prod-database-url` | Through the Cloud SQL connector's socket. |
| `CREDENTIAL_KEY` | Secret `dev-credential-key` | Secret `prod-credential-key` | Encrypts stored GitHub tokens and Gemini keys. **Never destroy a version**: without it every stored credential is unreadable. |
| `WORKER_TOKEN` | Secret `dev-worker-token` | Secret `prod-worker-token` | Protects `/internal/metrics`, which listens only inside the container. |
| `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_SECRET` | Secrets `dev-*-client-secret` | Secrets `prod-*-client-secret` | |
| `SCHEDULER`, `WORKER` | Not set (on) | Not set (on) | `off` leaves that part to another service ([Splitting production](#splitting-production)). |

**A deployed server refuses to start rather than run unsafely.** With `GITILIZER_ENV` set, a missing `DATABASE_URL`, `CREDENTIAL_KEY`, `WORKER_TOKEN`, `PUBLIC_URL` (or one that isn't `https://`), a missing Google or GitHub client, `NODE_ENV` other than `production`, or local mode, fixtures or the development sign-in form stops it, and the log names every problem. On a computer, the same gaps fall back to PGlite, a built-in key and the development sign-in form; deployed, they never do. A revision that fails to start never gets traffic: Cloud Run keeps serving the previous one.

## How a change reaches development

1. **Open a pull request.** GitHub Actions (`.github/workflows/ci.yml`) runs `npm run typecheck`, `npm test` (including the tests that need a real Postgres), builds the web app and builds the container image. Merging to `main` needs it to pass.
2. **Merge it to `main`.** The Cloud Build trigger `deploy-dev` (`cloudbuild.yaml`) builds one container image, tags it with the commit's SHA, stores it in Artifact Registry and deploys it to `gitilizer-dev`. It runs as `deploy-dev`, which can deploy `gitilizer-dev` and nothing else.
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
3. **Approve the deployment.** Pushing the tag starts the **Release** workflow (`.github/workflows/release.yml`). It waits for approval on the `production` environment: open the run and choose **Review deployments**, then **Approve and deploy**.
4. **Let it deploy.** The workflow stops unless the tagged commit is on `main` and Artifact Registry has its image (so development built it). Otherwise it deploys that image to `gitilizer-worker`, if that service exists, and then to `gitilizer-api`, sends all traffic to the new revision, and waits for `https://gitilizer.com/api/health` to answer. It reaches Google Cloud through Workload Identity Federation as `deploy-prod`; no key is stored in GitHub, and only jobs in the `production` environment can get a token.
5. **Check it.** Open `gitilizer.com`, sign in and check that the list loads. The [dashboard](#monitoring-and-alerts) should show no new errors.

Tags are the record of what was released, so never move, reuse or delete one (a tag ruleset on `release-*` blocks it). To list past releases:

```sh
git tag --list 'release-*' -n1
```

### Database changes

The server upgrades the database schema when it starts. Processes that start together (two revisions during a release) take turns, holding a Postgres advisory lock. After a release, Cloud Run can keep the previous revision's instance running for a quarter of an hour or more. It gets no traffic, and it stops claiming scans and ranking jobs as soon as the new release starts ([DESIGN.md D-14](DESIGN.md#d-14)), but it is still connected to the database, so every schema change must work with both. Add a column in one release, and stop using an old one in a later release. Never rename or drop a column in a single release.

### Rolling back

Cloud Run keeps earlier revisions, so rolling back takes seconds and doesn't rebuild anything:

```sh
gcloud run revisions list --service gitilizer-api --region us-east4
gcloud run services update-traffic gitilizer-api --region us-east4 --to-revisions <previous-revision>=100
```

If `gitilizer-worker` exists, do the same for it.

Only the release that started most recently claims scans and ranking jobs ([DESIGN.md D-14](DESIGN.md#d-14)), so after a rollback the newer release keeps doing that background work until Cloud Run stops its instance. To hand it back at once, delete the newer revision once no traffic goes to it:

```sh
gcloud run revisions delete <newer-revision> --region us-east4
```

A rollback doesn't undo schema changes, which is why changes must work with the previous release. The next release's workflow sends traffic to its new revisions again. Fix the problem on `main`, check it on development and release again.

## Changing a setting or a secret

**A setting.** `infra/services.sh` sets every setting a service needs, keeping its current image and allowlist unless you give new ones:

```sh
GOOGLE_CLIENT_ID=... GITHUB_CLIENT_ID=... bash infra/services.sh prod
```

For a single value, `gcloud run services update gitilizer-api --region us-east4 --update-env-vars NAME=value` works too. Either way, it starts a new revision within seconds.

**A secret.** Add a new version, then deploy, because a service reads `latest` only when a revision starts:

```sh
read -rs S && printf %s "$S" | gcloud secrets versions add prod-github-client-secret --data-file=- ; unset S
gcloud run services update gitilizer-api --region us-east4 \
  --update-secrets=GITHUB_CLIENT_SECRET=prod-github-client-secret:latest
```

Keep the old version until the new revision is serving, then disable it (`gcloud secrets versions disable`). `infra/oauth-secrets.sh` asks for all four OAuth client secrets at once. Never rotate `*-credential-key` this way: stored credentials are encrypted with it, so a new key makes them unreadable.

## Who can sign in to development

Development lets in only the accounts on its allowlist. It runs code that no one has tried yet with the credentials of whoever signs in, so it shouldn't be open to everyone ([PRD Q-80](PRD.md#q-80)). Production has no allowlist.

### The setting

The allowlist is the `SIGN_IN_ALLOWLIST` setting on the `gitilizer-dev` service. It isn't in the repository, so the testers' email addresses stay out of Git. Entries are separated by spaces:

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

- **Missing allowlist:** with `GITILIZER_ENV=development` the server refuses to start without an allowlist. A lost setting therefore can't open the development site to everyone.
- **Malformed entry:** an entry the server can't read, such as `maya@gmail.com` without `google:`, also stops it from starting. The log names the entry.
- **What a failed start means:** in both cases the new revision fails to start, and Cloud Run keeps sending traffic to the previous one. Correct the setting and run the command again.
- **No way around it:** the development sign-in form, which signs anyone in as anyone, doesn't exist on a deployed server, so Google or GitHub always vouches for who is signing in.
- **Local mode** (`npm run local`) ignores the allowlist, because only you can sign in.

The server tests (`app/server/test/server.test.ts`, "sign-in allowlist", and `production.test.ts`) cover reading the setting, refusing to start without it, matching each kind of entry, refusing a sign-in without creating an account, and signing out an account that was removed.

## Sign-in apps

Each environment has its own Google client and GitHub OAuth app, because each redirects to its own address. Gitilizer asks Google for `openid email profile` and GitHub for `user:email` only, uses the provider's token once to read the profile, and keeps no Google or GitHub token ([Sign-in and sessions](DESIGN.md#sign-in-and-sessions)).

| | Google (Cloud console → Google Auth Platform → Clients) | GitHub (Settings → Developer settings → OAuth Apps) |
|---|---|---|
| Production | "Gitilizer production", redirect URI `https://gitilizer.com/api/auth/google/callback` | "Gitilizer", callback `https://gitilizer.com/api/auth/github/callback` |
| Development | "Gitilizer development", redirect URI `https://dev.gitilizer.com/api/auth/google/callback` | "Gitilizer (development)", callback `https://dev.gitilizer.com/api/auth/github/callback` |

The Google consent screen (Google Auth Platform → Branding) names the home page `https://gitilizer.com` and the privacy policy `https://gitilizer.com/docs/privacy`, which the server redirects to the user guide's Privacy section on GitHub. Its logo is `app/web/public/brand/gitilizer-logo-120.png`; changing the logo makes Google review the branding again.

When sign-in fails, the log line `sign-in failed` (component `auth`) has the provider, the category the page showed (`cancelled`, `provider_unavailable`, `expired`, `not_allowed` or `gitilizer_error`) and the provider's own error. A `redirect_uri_mismatch` from Google, or "The redirect_uri is not associated with this application" from GitHub, means the app's callback URL doesn't match `PUBLIC_URL`.

## Monitoring and alerts

`infra/monitoring.sh` sets these up and can be run again after changing them (the definitions are in `infra/monitoring/`).

- **Dashboard** "Gitilizer" in Cloud Monitoring: requests by status, latency, open requests (about one per open tab), CPU, scans by outcome and duration, ranking time and failures, the browser's time to a usable list, errors logged, and Cloud SQL CPU and connections.
- **Alerts, by email to the owner** (`METRIC-4`):

  | Alert | When |
  |---|---|
  | gitilizer.com is down | The uptime check on `/api/health` fails from several regions. |
  | More than 5% of requests failing | 5xx above 5% of `gitilizer-api`'s requests for 10 minutes. |
  | No scans finishing | No scan finished for 3 hours. Background scans run every 2 hours, so at today's scale a shorter window would raise false alarms; tighten it to the design's 30 minutes once someone always has the app open. |
  | gitilizer-api is busy | CPU above 60% for an hour: [time to split production](#splitting-production). |

- **Logs.** Each line is JSON with `severity`, `component` and `message` ([Logging](DESIGN.md#logging)). In Logs Explorer, `resource.labels.service_name="gitilizer-api" AND severity>=WARNING` is the place to start; `jsonPayload.user="<account ID>"` follows one developer.
- **Budget.** A US$200 monthly budget on the project emails the owner at 50%, 90% and 100% (Billing → Budgets & alerts).

## Splitting production

Production starts as one instance that does everything, which is the cheapest arrangement and enough for the first users ([LAUNCH_PLAN.md](LAUNCH_PLAN.md), L-1). It has two limits: one instance holds at most 1,000 open event streams (about 1,000 open tabs), and one CPU does all the scanning and ranking. The "busy" alert and the dashboard's open-requests chart say when it's time to split.

Nothing in the code needs to change. Several processes can already share the work: live updates reach a tab through Postgres `LISTEN/NOTIFY` whichever instance it's connected to, presence and scan requests are in the database, scanners claim scans with `SKIP LOCKED`, and one process at a time runs the scheduler's periodic pass, holding a lease that another takes over within 30 seconds if it stops ([Hosting on Google Cloud](DESIGN.md#hosting-on-google-cloud)). To split:

1. **Create `gitilizer-worker`** from the image production runs, with production's settings and secrets, plus `--min-instances=1 --no-cpu-throttling --ingress=internal --no-allow-unauthenticated`. It runs the scheduler, scanner and ranking worker, and gets no traffic from the load balancer.
2. **Let `gitilizer-api` scale and stop scanning:** `--update-env-vars SCHEDULER=off,WORKER=off --max-instances=4`. Keep `--min-instances=1` so the first visitor doesn't wait for a cold start.
3. **Grant `deploy-prod`** `roles/run.developer` on `gitilizer-worker`. The Release workflow already deploys it first when it exists.
4. **Raise Cloud SQL's connections** if needed: each instance opens up to `DATABASE_POOL_MAX` connections plus one for `LISTEN`.

## The infra scripts

Everything in Google Cloud is created by the scripts in `infra/`, run from the repository root in Cloud Shell. Each creates only what is missing, so running one again is safe (including after it stops part-way), and each prints what it did. The project, region, domain and GitHub repository come from `infra/config.sh`, Gitilizer's own unless you change them ([Setting up your own copy](#setting-up-your-own-copy)).

| Script | What it does |
|---|---|
| `inventory.sh` | Lists everything in the project into `gcp-inventory.txt`. Changes nothing. |
| `foundation.sh` | APIs, Artifact Registry, service accounts and their permissions, Cloud SQL and its databases, the generated secrets and who can read them. Removes Editor from the default service accounts. It sets up the database users itself, with SQL sent over HTTPS (`gcloud sql instances execute-sql`) as `postgres`, whose generated password is kept in the regional secret `sql-admin-password`: each user owns its own database, can't connect to the other's, and isn't a member of `cloudsqlsuperuser`. |
| `oauth-secrets.sh` | Asks for the four OAuth client secrets and stores them, without showing them. |
| `certificate.sh` | The load balancer's addresses and certificate; prints the GoDaddy records and the certificate's state. |
| `services.sh dev\|prod [sha\|placeholder]` | Creates or reconfigures `gitilizer-dev` or `gitilizer-api` with all its settings, and lets its deployer deploy it. |
| `load-balancer.sh` | Backends, routing (`url-map.yaml`, `url-map-http.yaml`), proxies and forwarding rules, for whichever services exist. |
| `pipeline.sh` | The Cloud Build trigger, and Workload Identity Federation for the Release workflow. |
| `monitoring.sh` | Log-based metrics, the uptime check, alert policies and the dashboard. |

To run SQL on the instance yourself, for example to look at a table:

```sh
gcloud sql instances execute-sql gitilizer-pg --database=gitilizer --user=postgres \
  --password-secret-version=projects/gitilizer/locations/us-east4/secrets/sql-admin-password/versions/latest \
  --sql="select count(*) from users"
```

The `postgres` user can read everything, so use it only for looking and for fixing; the server never uses it.

## Setting up your own copy

Everything above can be reproduced in another Google Cloud project, with another domain and a fork of the repository: for a second Gitilizer, a staging copy, or after losing the project. It takes about an hour of your time, plus waiting for Cloud SQL and the certificate. [LAUNCH_PLAN.md](LAUNCH_PLAN.md) is the same procedure as it was done for `gitilizer.com`, with every console step spelled out.

**You need:**

- a Google Cloud project with billing turned on, where you are Owner (a new, empty one is simplest);
- a domain whose DNS you can change;
- the repository on GitHub (a fork works), where you can change settings;
- Cloud Shell, or a computer with `gcloud`, `jq` and `openssl`, signed in as the project's Owner.

**1. Say where it goes.** In your clone, create `infra/settings.local.sh` (Git ignores it):

```sh
export PROJECT=my-gitilizer      # the Google Cloud project ID
export REGION=us-east4           # where everything runs
export DOMAIN=example.com        # production; development is dev.example.com
export REPO=me/gitilizer         # the GitHub repository
```

Every `infra/` script reads it. The names of the services, the database, the secrets and so on stay as in [The infra scripts](#the-infra-scripts); they only have to be unique within the project.

**2. Foundation.** `bash infra/foundation.sh`. It enables the APIs and creates Artifact Registry, the service accounts, Cloud SQL (5 to 10 minutes; if the script stops while it waits, run it again) and the secrets.

**3. Certificate.** `bash infra/certificate.sh`. Add the `_acme-challenge` CNAME it prints at your DNS provider, and run it again until the certificate is `ACTIVE`.

**4. Sign-in apps.** Create a Google OAuth client and a GitHub OAuth app for each environment, as in [Sign-in apps](#sign-in-apps), with your domain in the callback URLs (`https://example.com/api/auth/google/callback` and so on). For Google, set up the consent screen first (Google Auth Platform: branding, audience published, the `openid`, `email` and `profile` scopes), and verify your domain in Search Console. Then run `bash infra/oauth-secrets.sh` to store the four client secrets, and `bash infra/foundation.sh` again so each environment can read its own.

**5. Development.**

1. In the Cloud console, connect Cloud Build to GitHub: Cloud Build → Repositories → 2nd gen → Create host connection, GitHub, your region, name `github`; then Link repository, name `gitilizer`.
2. `GOOGLE_CLIENT_ID=<dev client> GITHUB_CLIENT_ID=<dev app> SIGN_IN_ALLOWLIST="google:you@example.com" bash infra/services.sh dev placeholder` creates the service with all its settings, running a sample container for now.
3. `bash infra/pipeline.sh` creates the build trigger and the GitHub Actions identity, and prints five variables for step 6.
4. `gcloud builds triggers run deploy-dev --region=$REGION --branch=main` builds `main` and deploys it.
5. `bash infra/load-balancer.sh`, then add A and AAAA records for `dev` pointing at the two addresses `certificate.sh` printed.

Sign in at `https://dev.example.com`.

**6. Production.**

1. `GOOGLE_CLIENT_ID=<prod client> GITHUB_CLIENT_ID=<prod app> bash infra/services.sh prod <sha>`, with the commit development runs.
2. `bash infra/load-balancer.sh` again.
3. In GitHub, create the `production` environment (yourself as required reviewer, tags `release-*`) with the five variables `pipeline.sh` printed: `WIF_PROVIDER`, `DEPLOY_SA`, `GCP_PROJECT`, `GCP_REGION`, `PUBLIC_URL`. Add the rulesets for `main` and `release-*` tags (LAUNCH_PLAN.md, 6.5).
4. Point your domain's A and AAAA records (`@`) at the two addresses, and `www` at `@`.

From then on, [releases](#releasing-to-production) work as described above.

**7. Monitoring.** `ALERT_EMAIL=you@example.com bash infra/monitoring.sh`, and a budget under Billing → Budgets & alerts.

What doesn't change between copies: the code, the container image, `cloudbuild.yaml` (the trigger passes your region) and the workflows (they read the GitHub variables, defaulting to Gitilizer's own values). To take a copy down, delete what the scripts made, roughly in reverse order; [LAUNCH_PLAN.md](LAUNCH_PLAN.md), Phase 1, has the order that works.

