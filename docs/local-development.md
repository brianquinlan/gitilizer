# Running Gitilizer on your own computer

This page explains how to run the whole application (the web app, the API and the ranking worker) on your own computer with one command. It's meant for trying Gitilizer out and testing changes; production runs on Google Cloud as described in the [design doc](design.md).

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
- [Python](https://www.python.org/downloads/) 3.11 or later. Check with `py --version` (macOS and Linux: `python3 --version`).
- [Git](https://git-scm.com).

You don't need Docker or a database server: Gitilizer stores its data in PGlite, a copy of Postgres that runs inside the application.

## 2. Set up the repository (once)

```powershell
git clone https://github.com/brianquinlan/gitilizer.git
cd gitilizer
npm install
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

On macOS and Linux, use `python3 -m venv .venv` and `source .venv/bin/activate`.

You don't need to activate the virtual environment again later: `npm run local` finds `.venv` by itself.

## 3. Add your credentials (for real mode only)

Skip this step if you only want `npm run local:fixtures`.

Copy `.env.example` to `.env` and fill in the two values:

```
GITHUB_TOKEN=github_pat_...
GEMINI_API_KEY=...
```

- **GitHub token:** create one at [github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens/new). A fine-grained token needs read access to Issues, Pull requests and Metadata. Gitilizer only reads; it never writes to GitHub.
- **Gemini API key:** create one at [aistudio.google.com/apikey](https://aistudio.google.com/apikey). A free-tier key works, but it allows only a limited number of rankings a day.

`.env` is ignored by Git, so your credentials stay on your computer. The evaluation tools (`python -m gitilizer.check` and the others in the README) use the same file.

To check both credentials before starting the app:

```powershell
.venv\Scripts\Activate.ps1
python -m gitilizer.check
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

Then open [http://localhost:5173](http://localhost:5173). The output from the three parts is mixed in one window, each line labeled `[api]`, `[worker]` or `[web]`.

**Ctrl+C** stops all three.

## 5. Use it

**The first time** you start each mode, Gitilizer saves the credentials and runs the first sync by itself. In fixture mode the list fills in within a few seconds. In real mode it takes longer: Gitilizer finds your items on GitHub and then asks Gemini to score each one.

After that:

- **Sync now** (above the list) looks for new and changed issues and PRs and ranks them. In local mode this is the only way the list is refreshed, unless you turn on scheduled scans (below).
- **Settings → Save and re-rank** saves your settings and ranks every item again, for example after you change the ranking prompt. In real mode this uses one Gemini request per item.
- **Settings → Save changes** saves without re-ranking.
- **Sign out** takes you to the sign-in page. Choose either sign-in button and then **Sign in**: you're back in as the same local account, whatever name you type.

Fixture mode has a few extra tricks for testing live updates: see the `/api/dev/...` routes in the [design doc](design.md#http-api).

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
| `PYTHON` | The Python to run the worker with, if it isn't `.venv`. |
| `CREDENTIAL_KEY` | Overrides the saved encryption key. If you change it, credentials saved with the old key can no longer be read; use `--reset`. |
| `DATABASE_URL` | Uses a real Postgres server instead of PGlite, for example `postgres://localhost/gitilizer`. |

## Troubleshooting

| Problem | What to do |
|---|---|
| "Gitilizer's Node packages aren't installed" or "Cannot find module 'tsx/cli'" | Run `npm install` in the repository folder. Installed packages (`node_modules`) and the Python environment (`.venv`) belong to one folder: after cloning, copying or moving the repository, do step 2 again. |
| "The ranking worker needs Python with Gitilizer's packages" | Do the Python part of step 2: create `.venv` and run `pip install -r requirements.txt` in it. |
| "Port 8787 is already in use" (or 8788, 5173) | Gitilizer is probably already running in another window. Stop it with Ctrl+C there. |
| Your list looks wrong after updating Gitilizer | The database in `.local` is upgraded automatically when the server starts. If something still looks wrong, start again with `--reset`. |
| The bell shows "Gitilizer is using a backup Gemini model" | Your free-tier key's daily quota for the main model is used up, so ranking uses a smaller model until midnight Pacific time. This is expected on the free tier, especially after a first sync or **Save and re-rank**. |
| The app opens on "Welcome to your prioritized inbox" | A credential is missing: `.env` didn't have it on the first run. Go to Settings and enter it, or fill in `.env` and restart with `--reset`. |
| The bell shows "Your GitHub token isn't valid" or a Gemini error | Fix the credential in Settings. Changing `.env` alone doesn't replace a credential that is already saved. |
| "Gitilizer is using a backup Gemini model" or "Your Gemini daily quota is used up" | Your key's daily quota for that model is used up. It resets at midnight Pacific time. |
| You want a completely fresh start | `npm run local -- --reset` (or `npm run local:fixtures -- --reset`). |

## Running the tests

```powershell
npm test                     # server and web tests
npm run typecheck
.venv\Scripts\Activate.ps1
python -m pytest             # Python tests (agent, worker)
```

## The old way: three terminals

`npm run local` replaces running the parts by hand, which still works if you need to restart one part on its own:

```powershell
npm run dev:fixtures                     # terminal 1: API (:8787) and worker API (:8788)
python -m gitilizer.worker --fake-llm    # terminal 2: ranking worker
npm run dev:web                          # terminal 3: http://localhost:5173
```

Started this way, the server isn't in local mode: you sign in with the development form, enter credentials in Settings, and the scheduler runs. For real GitHub and Gemini, use `npm run dev:server` and `python -m gitilizer.worker`.
