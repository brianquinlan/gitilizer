// The two pages that work without signing in (PRD "Home page", PRIV-6; design: Public pages): the home page at `/`
// and the privacy policy at `/docs/privacy`. Google's checker reads them without running JavaScript (HOME-4), so
// they are finished HTML, built once when the server starts. They load only gitilizer.com's own files (HOME-7):
// /site.css, /fonts/fonts.css and /favicon.svg, all from app/web/public.
import { marked } from "marked";
import { NEXT_STEP_LABEL, SIGN_IN_PREVIEW } from "@gitilizer/shared";

/** Where each sign-in button goes: a link, or null for a provider Gitilizer isn't set up for (a disabled button). */
export type SignInLinks = { google: string | null; github: string | null };

const USER_GUIDE = "https://github.com/brianquinlan/gitilizer/blob/main/docs/user-guide.md";
const REPOSITORY = "https://github.com/brianquinlan/gitilizer";

const HOME_TITLE = "Gitilizer: your GitHub issues and PRs, prioritized";
const DESCRIPTION =
  "Gitilizer puts all of your open GitHub issues and pull requests in one list, ranked by how much each one needs you right now.";

/** HOME-2: "How it works". */
export const HOW_IT_WORKS: [string, string][] = [
  ["One list", "Review requests, assignments, mentions, and the issues and PRs you opened or commented on, from every repository, in one place."],
  ["Ranked for you", "An AI model ranks every item and says whose move it is: review, respond, to do, or waiting on someone else. Tell it what matters to you, and it takes that into account."],
  ["Always current", "The list changes as things happen on GitHub, without reloading the page."],
];

/** HOME-2: "What Gitilizer uses, and why". */
export const WHAT_IT_USES: [string, string][] = [
  ["Your Google or GitHub sign-in", "Your name, email address and profile picture, to create your account and show who's signed in. Gitilizer sees nothing else in your Google account."],
  ["Read-only access to GitHub", "Your issues and pull requests, through the Gitilizer app or a personal access token you create, so that Gitilizer can find and rank them. Gitilizer only reads from GitHub and never changes anything there."],
  ["An AI model to rank with", "Each item's content goes to the AI model that ranks it: Gemini, Claude or OpenAI with your own API key, or Gemini with Gitilizer's key if you don't add one. Your Google account data is never sent."],
];

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

// Icons, as in app/web/src/icons.tsx.
const svg = (size: number, body: string) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const ISSUE_ICON = svg(18, `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1" fill="currentColor"/>`);
const PR_ICON = svg(18, `<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M6 9v12"/>`);
const GITHUB_ICON = svg(18, `<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>`);

function page(title: string, bodyClass: string, main: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(DESCRIPTION)}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/fonts/fonts.css">
<link rel="stylesheet" href="/site.css">
</head>
<body class="${bodyClass}">
<header class="site-header"><a class="brand" href="/"><img src="/favicon.svg" width="30" height="30" alt=""> gitilizer</a></header>
${main}
<footer class="site-footer">
<span class="tagline">Less triage. More shipping.</span>
<nav aria-label="Footer"><a href="/docs/privacy">Privacy</a><a href="${USER_GUIDE}">Documentation</a><a href="${REPOSITORY}">GitHub</a></nav>
</footer>
</body>
</html>
`;
}

function providerButton(href: string | null, label: string, icon: string, dark: boolean): string {
  const cls = `btn provider${dark ? " dark" : ""}`;
  return href
    ? `<a class="${cls}" href="${escapeHtml(href)}">${icon}${label}</a>`
    : `<span class="${cls}" aria-disabled="true">${icon}${label}</span>`;
}

/** "Issue #1842 · Assigned to you": the type and number in the monospace face, a dot, then the reason (LIST-42). */
function metaHtml(meta: string): string {
  const [num, reason] = meta.split(" · ");
  return `<span class="num">${escapeHtml(num)}</span><span class="dot"></span><span class="reason">${escapeHtml(reason ?? "")}</span>`;
}

const blocks = (items: [string, string][]) =>
  `<div class="blocks">${items.map(([h, p]) => `<div class="block"><h3>${escapeHtml(h)}</h3><p>${escapeHtml(p)}</p></div>`).join("")}</div>`;

/** The home page (HOME-1 to HOME-7). */
export function homePage(links: SignInLinks): string {
  const rows = SIGN_IN_PREVIEW.map(({ kind, title, step, meta }, i) => `<div class="tr">
<span class="rank">${i + 1}</span>
<span class="issue"><span class="kind ${kind}">${kind === "pr" ? PR_ICON : ISSUE_ICON}</span><span class="issue-text"><span class="issue-title">${escapeHtml(title)}</span><span class="issue-meta"><span class="next-step ${step.replace("_", "-")}">${NEXT_STEP_LABEL[step]}</span>${metaHtml(meta)}</span></span></span>
</div>`).join("\n");
  return page(HOME_TITLE, "site home", `<main>
<section class="hero">
<div class="promise">
<h1>Less triage.<br>More shipping.</h1>
<p class="lede">${escapeHtml(DESCRIPTION)}</p>
<div class="providers">
${providerButton(links.google, "Continue with Google", `<span class="g" aria-hidden="true">G</span>`, false)}
${providerButton(links.github, "Continue with GitHub", GITHUB_ICON, true)}
</div>
</div>
<div class="preview" aria-hidden="true">
<div class="tr thead"><span class="th active">Priority ↑</span><span class="th">Issue</span></div>
${rows}
</div>
</section>
<section class="band subtle"><div class="band-inner">
<h2>How it works</h2>
${blocks(HOW_IT_WORKS)}
</div></section>
<section class="band"><div class="band-inner">
<h2>What Gitilizer uses, and why</h2>
${blocks(WHAT_IT_USES)}
<p class="more"><a href="/docs/privacy">Read the privacy policy →</a></p>
</div></section>
</main>`);
}

/** The privacy policy page (PRIV-6), from docs/privacy-policy.md, which is Gitilizer's own text. */
export function privacyPage(markdown: string): string {
  const html = marked.parse(markdown, { async: false, gfm: true }) as string;
  return page("Privacy policy · Gitilizer", "site policy-page", `<main class="policy">
${html}</main>`);
}

/**
 * Where the home page's buttons go (HOME-3): straight to the provider, coming back to `/`. A provider without its
 * sign-in app is disabled, except where the development sign-in stands in for it: then the sign-in page, which offers
 * its form.
 */
export function signInLinks(configured: { google: boolean; github: boolean }, devSignIn: boolean): SignInLinks {
  const link = (p: "google" | "github") => (configured[p] ? `/api/auth/${p}/start?next=%2F` : devSignIn ? "/sign-in" : null);
  return { google: link("google"), github: link("github") };
}
