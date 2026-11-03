# Running Gitilizer on your own computer

This page explains how to run the whole application (the web app, the API and the ranking worker) on your own computer with one command. It's meant for trying Gitilizer out and testing changes; production runs on Google Cloud as described in the [design doc](DESIGN.md).

In local mode:

- there is one account, "Local developer", and you are signed in automatically;
- your GitHub token and Gemini API key are read from `.env` the first time, so you don't have to type them in;
- nothing scans on a schedule: you choose **Sync now** or **Save and re-rank** when you want fresh data;
- everything is kept in a folder (`.local\`), so your settings, credentials and list are still there next time.

There are two ways to run it:

| Command | GitHub | Gemini | Use it to |
|---|---|---|---|
| `npm run local:fixtures` | The 36 saved items in `eval\fixtures\`, as @brianquinlan | A fake model that scores instantly | Work on the interface, offline, with no quota used |
| `npm run local` | Real GitHub, with your token | Real Gemini, with your key | See your own issues and PRs ranked for real |

The commands on this page are for Windows PowerShell. On macOS or Linux they're the same, except where noted.

## 1. Install the tools (once)

You need:

- [Node.js](https://nodejs.org) 22 or later. Check with `node --version`.
- [Git](https://git-scm.com).

Everything, including the ranking agent, is TypeScript, so you don't need Python.

You don't need Docker or a database server: Gitilizer stores its data in PGlite, a copy of Postgres that runs inside the application.

## 2. Set up the repository (once)

```powershell
git clone https://github.com/brianquinlan/gitilizer.git
cd gitilizer
npm install
```

If you set the repository up before the ranking agent moved to TypeScript, run `npm install` again; the old `.venv` folder is no longer used and can be deleted.

## 3. Add your credentials (for real mode only)

Skip this step if you only want `npm run local:fixtures`.

Copy `.env.example` to `.env` and fill in the two values:

```
GITHUB_TOKEN=github_pat_...
GEMINI_API_KEY=...
```

- **GitHub token:** create one at [github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens/new). A fine-grained token needs read access to Issues, Pull requests and Metadata. Gitilizer only reads; it never writes to GitHub.
- **Gemini API key:** create one at [aistudio.google.com/apikey](https://aistudio.google.com/apikey). A free-tier key works, but it allows only a limited number of rankings a day.

`.env` is ignored by Git, so your credentials stay on your computer. The evaluation tools ([README.md](README.md)) use the same file.

To check both credentials before starting the app:

```powershell
npm run check
```

## 4. Start Gitilizer

```powershell
npm run local:fixtures     # saved test data, no network
# or
npm run local              # your real issues and PRs
```

Wait for this line:

```
Ready: open http://localhost:5173  (Ctrl+C stops everything)
```

Then open [http://localhost:5173](http://localhost:5173). The output from the two parts is mixed in one window, each line labeled `[api]` (the server, including the ranking worker's `[worker]` lines) or `[web]`.

**Ctrl+C** stops both.

## 5. Use it

**The first time** you start each mode, Gitilizer saves the credentials and runs the first sync by itself. In fixture mode the list fills in within a few seconds. In real mode it takes longer: Gitilizer finds your items on GitHub, downloads each one and asks Gemini to score it. Items appear in the list as they are scored, while the rest are still downloading.

After that:

- **Sync now** (above the list) looks for new and changed issues and PRs and ranks them. In local mode this is the only way the list is refreshed, unless you turn on scheduled scans (below).
- **Settings → Save and re-rank** saves your settings and ranks every item again, for example after you change the ranking prompt. In real mode this uses one Gemini request per item.
- **Settings → Save changes** saves without re-ranking.
- **Sign out** takes you to the sign-in page. Choose either sign-in button and then **Sign in**: you're back in as the same local account, whatever name you type.

Fixture mode has a few extra tricks for testing live updates: see the `/api/dev/...` routes in the [design doc](DESIGN.md#http-api).

## Where your data lives

| Folder | What's in it |
|---|---|
| `.local\real\` | The database for `npm run local`, and the key that encrypts your saved credentials |
| `.local\fixtures\` | The same for `npm run local:fixtures` |

The two modes never share data. Both folders are ignored by Git.

Credentials from `.env` are copied into the database **only when the database doesn't have them yet**. After the first run, change them in Settings, or start again with `--reset` (below).

## Options

Options go after `--`, for example `npm run local -- --reset`. They work with both modes: `npm run local:fixtures -- --reset`.

| Option | What it does |
|---|---|
| `--reset` | Deletes that mode's data folder first, so you start with an empty database and `.env` is read again. |
| `--scheduler` | Also scans on a schedule, as production does: every 5 minutes while the app is open, and a daily re-rank. Uses your GitHub and Gemini quota without asking. |
| `--fixtures` | The same as `npm run local:fixtures`. |

You can also set these in the PowerShell window before starting (`$env:NAME = "value"`):

| Variable | What it does |
|---|---|
| `GITILIZER_MODEL` | The primary Gemini model to rank with; the backup models stay the same (also read from `.env`). |
| `GITILIZER_MODELS` | The whole fallback list, comma-separated, primary first (default `gemini-3.8-flash,gemini-3.5-flash-lite,gemini-3.1-flash-lite`). |
| `LOG_LEVEL` | How much the server logs: `debug` (the default in local mode: every ranked item), `info`, `warn` or `error`. |
| `CREDENTIAL_KEY` | Overrides the saved encryption key. If you change it, credentials saved with the old key can no longer be read; use `--reset`. |
| `DATABASE_URL` | Uses a real Postgres server instead of PGlite, for example `postgres://localhost/gitilizer`. |
| `SIGN_IN_ALLOWLIST`, `GITILIZER_ENV` | For the hosted environments ([DEPLOYMENT.md](DEPLOYMENT.md#settings)). Local mode ignores the allowlist. Don't set `GITILIZER_ENV` on your computer: it turns on the deployed environments' startup checks, which refuse local mode. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `PUBLIC_URL` | Real Google and GitHub sign-in, if you have OAuth apps whose redirect URLs point at your computer (for example `http://localhost:8787/api/auth/github/callback`, with `PUBLIC_URL=http://localhost:8787`). Without them the sign-in buttons open the development form. |

## Troubleshooting

| Problem | What to do |
|---|---|
| "Gitilizer's Node packages aren't installed", "Cannot find module 'tsx/cli'" or "Cannot find package '@gitilizer/ranker'" | Run `npm install` in the repository folder. Installed packages (`node_modules`) belong to one folder: after cloning, copying, moving or updating the repository, do step 2 again. |
| "Scanning your issues and PRs…" for a long time | The first sync of a busy account fetches hundreds of items, a few seconds each, and ranks them as they arrive. The `[api]` lines in the terminal show its progress: `discovery finished`, then `fetching items fetched=25 of=…` every 25 items, with a `ranking summary` each minute once items are being ranked, then `scan finished`. If items are being fetched but none appear, check the bell for a Gemini problem. If the terminal shows none of these lines, stop Gitilizer and start it again: a sync cut off by Ctrl+C or a crash starts over. A busy account's first sync can also reach GitHub's limit of 5,000 requests an hour; the bell then says so. Automatic scans are off in local mode, so after the reset press **Sync now**; the sync carries on where it stopped. |
| "Port 8787 is already in use" (or 8788, 5173) | Gitilizer is probably already running in another window. Stop it with Ctrl+C there. |
| Your list looks wrong after updating Gitilizer | The database in `.local` is upgraded automatically when the server starts. If something still looks wrong, start again with `--reset`. |
| The bell shows "Gitilizer is using a backup Gemini model" | Your free-tier key's daily quota for the main model is used up, so ranking uses a smaller model until midnight Pacific time. This is expected on the free tier, especially after a first sync or **Save and re-rank**. |
| The app opens on "Welcome to your prioritized inbox" | A credential is missing: `.env` didn't have it on the first run. Go to Settings and enter it, or fill in `.env` and restart with `--reset`. |
| The bell shows "Your GitHub token isn't valid" or a Gemini error | Fix the credential in Settings. Changing `.env` alone doesn't replace a credential that is already saved. |
| "Your Gemini daily quota is used up" | Every model's daily quota is used up. Ranking resumes at midnight Pacific time; until then new items wait at the end of the list with "–". |
| You want a completely fresh start | `npm run local -- --reset` (or `npm run local:fixtures -- --reset`). |

## Running the tests

```powershell
npm test                     # ranking agent, server and web tests
npm run typecheck
```

The tests of several server processes sharing one database (`app/server/test/postgres.test.ts`) need a real Postgres, so they are skipped unless `TEST_DATABASE_URL` names one whose user can create databases (CI always runs them):

```powershell
$env:TEST_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/postgres"; npm test -w app/server
```

## Running the parts by hand

`npm run local` replaces running the parts in two terminals, which still works if you need to restart one part on its own:

```powershell
npm run dev:fixtures     # terminal 1: the server (:8787, metrics on :8788), with the ranking worker
npm run dev:web          # terminal 2: http://localhost:5173
```

Started this way, the server isn't in local mode: you sign in with the development form, enter credentials in Settings, and the scheduler runs. For real GitHub and Gemini, use `npm run dev:server` instead of `npm run dev:fixtures` (it passes `--dev-sign-in`, which turns the form on).

## Running the production image

The container image that development and production run (`Dockerfile`) serves the built web app itself, on one port. To try it with Docker and a Postgres of your own, in fixture mode so it needs no credentials:

```powershell
docker build -t gitilizer .
docker run --rm -p 8080:8080 -e NODE_ENV=development -e DATABASE_URL=postgres://host.docker.internal/gitilizer gitilizer node --import tsx app/server/src/main.ts --fixtures
```

Then open http://localhost:8080. With `GITILIZER_ENV` set, the image checks its settings and refuses to start without the ones the deployed environments need ([DEPLOYMENT.md](DEPLOYMENT.md#settings)).
