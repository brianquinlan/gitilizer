// The notification catalogue (PRD "Catalogue"), shared so the server and the
// web app agree on codes, severities and wording.
import { z } from "zod";

export const NotificationCode = z.enum([
  // GitHub connection
  "github_missing",
  "github_expired",
  "github_invalid",
  "github_org_blocks_token",
  "github_permission_missing",
  "github_sso_required",
  "github_unexpected",
  "github_rate_limited", // warning, short-lived
  "github_unavailable", // warning, short-lived
  "github_expiring", // warning
  // Additional repositories
  "repo_inaccessible",
  // Gemini connection
  "gemini_missing",
  "gemini_invalid",
  "gemini_leaked",
  "gemini_permission_denied",
  "gemini_credits",
  "gemini_billing",
  "gemini_backup_model", // warning
  "gemini_daily_quota",
  "gemini_rate_limited", // warning, short-lived
  "gemini_unavailable", // warning, short-lived
  "gemini_model_unavailable",
  "gemini_unexpected",
  // Ranking
  "prompt_failing",
  "items_unranked", // warning
  // Gitilizer
  "cannot_connect", // raised by the web app only
  "scan_failed",
  "stale",
]);
export type NotificationCode = z.infer<typeof NotificationCode>;

export const Notification = z.object({
  code: NotificationCode,
  /** Org, repo or permission the notification is about, or "" (PRD NOTIF-11). */
  subject: z.string(),
  params: z.record(z.string(), z.string()),
  firstDetectedAt: z.string(),
  /** The developer has opened the popover since this was shown (NOTIF-17). */
  seen: z.boolean(),
});
export type Notification = z.infer<typeof Notification>;

/**
 * A piece of notification body text. `settings` is the id of the Settings
 * control that fixes the problem (NOTIF-9); `href` opens a new tab.
 */
export type Segment = { text: string; settings?: string; href?: string };

type Params = Record<string, string>;
type Entry = {
  severity: "error" | "warning";
  summary: string;
  /** Short-lived problems are retried silently for SHORT_LIVED_MINUTES, then shown as warnings (NOTIF-21). */
  shortLived?: boolean;
  /** Credential whose replacement clears this notification at once (NOTIF-13). */
  clearedBy?: "github_pat" | "gemini_key";
  heading: (p: Params) => string;
  body: (p: Params, now?: number) => Segment[];
};

const T = (text: string): Segment => ({ text });
const PAT = "github-pat";
const KEY = "gemini-key";
const S = (text: string, control: string): Segment => ({ text, settings: control });
const REPORT = "If this continues, report it using the GitHub link at the bottom of the page.";
const NOT_RANKED = "New and changed issues and PRs aren't being ranked.";

export const SHORT_LIVED_MINUTES = 15; // NOTIF-21
export const STALE_AFTER_HOURS = 3;
export const EXPIRY_WARNING_DAYS = 7; // NOTIF-22

/** A time in the browser's time zone, with the date when it isn't today (PLAT-7). */
export function formatTime(iso: string | undefined, now = Date.now()): string {
  if (!iso) return "";
  const d = new Date(iso);
  const sameDay = new Date(now).toDateString() === d.toDateString();
  const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  return sameDay ? time : `${d.toLocaleDateString(undefined, { month: "short", day: "numeric" })}, ${time}`;
}

/** "about 3 hours", "about 25 minutes" until or since `iso`. */
export function formatDuration(iso: string | undefined, now = Date.now()): string {
  if (!iso) return "";
  const m = Math.max(1, Math.round(Math.abs(Date.parse(iso) - now) / 60000));
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"}`;
  const h = Math.round(m / 60);
  return `${h} hour${h === 1 ? "" : "s"}`;
}

/** The control id for an additional repository's row, as repoControlId() in index.ts. */
const repoControl = (repo: string) => `repo-${repo.replace("/", "-")}`;

export const CATALOGUE: Record<NotificationCode, Entry> = {
  github_missing: {
    severity: "error", summary: "GitHub connection", clearedBy: "github_pat",
    heading: () => "No GitHub personal access token is set",
    body: () => [T("Gitilizer can't scan your issues and PRs. Add a personal access token in "), S("Settings", PAT), T(".")],
  },
  github_expired: {
    severity: "error", summary: "GitHub connection", clearedBy: "github_pat",
    heading: () => "Your GitHub personal access token has expired",
    body: () => [T("Scanning is paused. Replace your personal access token in "), S("Settings", PAT), T(".")],
  },
  github_invalid: {
    severity: "error", summary: "GitHub connection", clearedBy: "github_pat",
    heading: () => "Your GitHub personal access token isn't valid",
    body: () => [
      T("Scanning is paused. The token may have been revoked, deleted or mistyped. Replace your personal access token in "),
      S("Settings", PAT), T("."),
    ],
  },
  github_org_blocks_token: {
    severity: "error", summary: "GitHub connection", clearedBy: "github_pat",
    heading: (p) => `${p.org} doesn't allow this type of token`,
    body: (p) => [
      T(`Issues and PRs from ${p.org} are missing from your list. ${p.org} blocks ${p.tokenType} personal access tokens. ` +
        `Create the other type of token, or ask an owner of ${p.org} to allow this one. Add the new token in `),
      S("Settings", PAT), T("."),
    ],
  },
  github_permission_missing: {
    severity: "error", summary: "GitHub connection", clearedBy: "github_pat",
    heading: (p) => `Your GitHub personal access token can't read ${p.permission}`,
    body: (p) => [
      T(`Some of your issues and PRs can't be read, so your list may be incomplete. Give the token read access to ${p.permission}, or create a new token and add it in `),
      S("Settings", PAT), T(". The documentation lists the permissions Gitilizer needs."),
    ],
  },
  github_sso_required: {
    severity: "error", summary: "GitHub connection", clearedBy: "github_pat",
    heading: (p) => `Your token isn't authorized for ${p.org}`,
    body: (p) => [
      T(`Issues and PRs from ${p.org} are missing from your list. ${p.org} uses single sign-on, so the token must be authorized for it. Authorize it in your `),
      { text: "GitHub personal access token settings", href: "https://github.com/settings/tokens" }, T(", then choose Sync now."),
    ],
  },
  github_unexpected: {
    severity: "error", summary: "GitHub connection",
    heading: () => "GitHub sent an unexpected response",
    body: () => [T(`Your list may be missing recent changes. Gitilizer keeps retrying automatically. ${REPORT}`)],
  },
  github_rate_limited: {
    severity: "warning", summary: "GitHub connection", shortLived: true,
    heading: () => "GitHub's rate limit has been reached",
    body: (p, now) => [T(
      `Scanning is paused until ${p.resetAt ? `${formatTime(p.resetAt, now)}, when GitHub resets the limit,` : "GitHub resets the limit"} and then resumes automatically. ` +
      "Other tools that use the same token count toward the same limit.",
    )],
  },
  github_unavailable: {
    severity: "warning", summary: "GitHub connection", shortLived: true,
    heading: () => "GitHub isn't responding",
    body: () => [
      T("Scanning is paused. Gitilizer keeps retrying automatically. If this continues, check "),
      { text: "githubstatus.com", href: "https://www.githubstatus.com" }, T("."),
    ],
  },
  github_expiring: {
    severity: "warning", summary: "GitHub connection", clearedBy: "github_pat",
    heading: () => "Your GitHub personal access token will expire soon",
    body: (p) => [
      T(`Your GitHub personal access token will expire in ${p.days} day${p.days === "1" ? "" : "s"}. Create a new one and add it to `),
      S("Settings", PAT), T("."),
    ],
  },
  repo_inaccessible: {
    severity: "error", summary: "Additional repositories", clearedBy: "github_pat",
    heading: (p) => `Gitilizer can't access ${p.repo}`,
    body: (p) => [
      T(`Issues and PRs from ${p.repo} are missing from your list. Check the name in `),
      S("Settings", repoControl(p.repo)), T(`, or give your token access to ${p.repo}.`),
    ],
  },
  gemini_missing: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "No Gemini API key is set",
    body: () => [T(`${NOT_RANKED} Add a Gemini API key in `), S("Settings", KEY), T(".")],
  },
  gemini_invalid: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Your Gemini API key isn't valid",
    body: () => [T(`${NOT_RANKED} Create a new key in Google AI Studio and add it in `), S("Settings", KEY), T(".")],
  },
  gemini_leaked: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Google has disabled your Gemini API key",
    body: () => [
      T(`Google reported the key as leaked, so it no longer works. ${NOT_RANKED} Create a new key in Google AI Studio and add it in `),
      S("Settings", KEY), T("."),
    ],
  },
  gemini_permission_denied: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Your Gemini API key can't use the Gemini API",
    body: () => [
      T(`${NOT_RANKED} The key may be restricted to other Google APIs, or its project may not allow the Gemini API. Create a new key in Google AI Studio and add it in `),
      S("Settings", KEY), T("."),
    ],
  },
  gemini_credits: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Your Gemini credits have run out",
    body: () => [T(`${NOT_RANKED} Add credits or turn on auto-reload in Google AI Studio.`)],
  },
  gemini_billing: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Your Gemini project needs billing",
    body: () => [T(
      `${NOT_RANKED} The key's Google Cloud project needs a working billing account, ` +
      "or has a past-due balance. Fix billing in the Google Cloud console.",
    )],
  },
  gemini_backup_model: {
    severity: "warning", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Gitilizer is using a backup Gemini model",
    body: (p, now) => [T(
      `Your daily quota for ${p.primaryModel} is used up, so new and changed issues and PRs are being ranked with ${p.model} ` +
      `until it resets at ${formatTime(p.resetAt, now)}, in about ${formatDuration(p.resetAt, now)}. ` +
      "Rankings may be less accurate until then. To avoid this, turn on billing in Google AI Studio.",
    )],
  },
  gemini_daily_quota: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Your Gemini daily quota is used up",
    body: (p, now) => [T(
      "Your daily quota is used up for every Gemini model Gitilizer can use, so new and changed issues and PRs aren't being ranked. " +
      `Ranking resumes automatically when the quota resets at ${formatTime(p.resetAt, now)}, in about ${formatDuration(p.resetAt, now)}. ` +
      "To avoid this, use an API key with billing turned on.",
    )],
  },
  gemini_rate_limited: {
    severity: "warning", summary: "Gemini connection", shortLived: true,
    heading: () => "Gemini is limiting requests from your key",
    body: () => [T("Ranking is slower than usual and catches up automatically. Other apps that use this key count toward the same limit.")],
  },
  gemini_unavailable: {
    severity: "warning", summary: "Gemini connection", shortLived: true,
    heading: () => "Gemini isn't responding",
    body: () => [
      T(`${NOT_RANKED} Gitilizer keeps retrying automatically. If this continues, check the `),
      { text: "Google AI Studio status page", href: "https://aistudio.google.com/status" }, T("."),
    ],
  },
  gemini_model_unavailable: {
    severity: "error", summary: "Gemini connection",
    heading: () => "The Gemini model Gitilizer uses isn't available",
    body: () => [T(`${NOT_RANKED} This is a problem with Gitilizer, not with your key. Report it using the GitHub link at the bottom of the page.`)],
  },
  gemini_unexpected: {
    severity: "error", summary: "Gemini connection",
    heading: () => "Gemini sent an unexpected response",
    body: () => [T(`New and changed issues and PRs may not be ranked. Gitilizer keeps retrying automatically. ${REPORT}`)],
  },
  prompt_failing: {
    severity: "error", summary: "Ranking",
    heading: () => "Your ranking prompt isn't working",
    body: () => [
      T("Most new and changed issues and PRs couldn't be ranked with your custom prompt. Edit the prompt, or restore the default prompt in "),
      S("Settings", "ranking-prompt"), T("."),
    ],
  },
  items_unranked: {
    severity: "warning", summary: "Ranking",
    heading: (p) => `Gitilizer couldn't rank ${p.n} ${p.n === "1" ? "issue or PR" : "issues and PRs"}`,
    body: (p) => [T(`${p.n === "1" ? "This issue or PR is" : "These issues and PRs are"} shown without a rank. Gitilizer tries again when ${p.n === "1" ? "it changes" : "they change"}.`)],
  },
  cannot_connect: {
    severity: "error", summary: "Gitilizer",
    heading: () => "Can't connect to Gitilizer",
    body: () => [T("Your list won't update until the connection comes back. Check your internet connection.")],
  },
  scan_failed: {
    severity: "error", summary: "Gitilizer",
    heading: () => "Gitilizer couldn't finish scanning",
    body: () => [T(`Your list may be missing recent changes. Gitilizer tries again at the next scan. ${REPORT}`)],
  },
  stale: {
    severity: "error", summary: "Gitilizer",
    heading: (p) => `Your issues and PRs haven't updated since ${formatTime(p.since)}`,
    body: () => [T(
      `No scan has finished in ${STALE_AFTER_HOURS} hours, so your list may be missing recent changes. Try Sync now. ${REPORT}`,
    )],
  },
};

/** Errors that make a credential's chip show "Not working" (SET-30). */
export function credentialErrorCodes(kind: "github_pat" | "gemini_key"): NotificationCode[] {
  return (Object.keys(CATALOGUE) as NotificationCode[])
    .filter((c) => CATALOGUE[c].clearedBy === kind && CATALOGUE[c].severity === "error" && c !== "repo_inaccessible");
}

/** Errors before warnings, then oldest first (NOTIF-19). */
export function compareNotifications(a: Notification, b: Notification): number {
  const sa = CATALOGUE[a.code].severity === "error" ? 0 : 1;
  const sb = CATALOGUE[b.code].severity === "error" ? 0 : 1;
  if (sa !== sb) return sa - sb;
  return a.firstDetectedAt < b.firstDetectedAt ? -1 : a.firstDetectedAt > b.firstDetectedAt ? 1 : 0;
}
