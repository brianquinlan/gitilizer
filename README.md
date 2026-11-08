# Gitilizer

Gitilizer collects a developer's open GitHub issues and PRs into one list and uses the AI the developer chooses, Google's Gemini, Anthropic's Claude or OpenAI, to put them in priority order, so the most important thing is always at the top.

- **Using Gitilizer:** [gitilizer.com](https://gitilizer.com), and the [user guide](docs/user-guide.md).
- **Working on Gitilizer:** [contributor/README.md](contributor/README.md), with the requirements ([PRD](contributor/PRD.md)), the [design](contributor/DESIGN.md) and how to [run it on your own computer](contributor/LOCAL_DEVELOPMENT.md).

```powershell
npm install
npm run local:fixtures     # the whole app on your computer, with saved test data: no network, no quota
npm run local              # your real issues and PRs, with the credentials in .env
```

Then open http://localhost:5173.
