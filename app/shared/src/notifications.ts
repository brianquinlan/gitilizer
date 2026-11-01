// The notification catalogue (PRD "Catalogue"), shared so the server and the
// web app agree on codes, severities and wording.
import { z } from "zod";

export const NotificationCode = z.enum([
  // GitHub connection
  "github_missing",
  "github_expired",
  "github_invalid",
  "github_org_blocks_token",
  "github_rate_limited",
  "github_unavailable",
  "github_expiring", // warning
  // Gemini connection
  "gemini_missing",
  "gemini_invalid",
  "gemini_leaked",
  "gemini_credits",
  "gemini_billing",
  "gemini_daily_quota",
  "gemini_rate_limited",
  "gemini_unavailable",
  // Issue ranking
  "prompt_failing",
  // Gitilizer
  "cannot_connect", // raised by the web app only
  "stale",
]);
export type NotificationCode = z.infer<typeof NotificationCode>;

export const Notification = z.object({
  code: NotificationCode,
  /** Org or repo the notification is about, or "" (PRD NOTIF-11). */
  subject: z.string(),
  params: z.record(z.string(), z.string()),
  firstDetectedAt: z.string(),
});
export type Notification = z.infer<typeof Notification>;

/** A piece of notification body text; `settings` links stay in the app, `href` opens a new tab (NOTIF-9). */
export type Segment = { text: string; settings?: string; href?: string };

type Entry = {
  severity: "error" | "warning";
  summary: string;
  /** Short-lived problems are shown only after they have lasted SHORT_LIVED_MINUTES (Q-17). */
  shortLived?: boolean;
  /** Credential whose replacement clears this notification at once (NOTIF-13). */
  clearedBy?: "github_pat" | "gemini_key";
  heading: (p: Record<string, string>) => string;
  body: (p: Record<string, string>) => Segment[];
};

const S = (text: string, section = "connections"): Segment => ({ text, settings: section });
const T = (text: string): Segment => ({ text });

export const SHORT_LIVED_MINUTES = 15; // Q-17, assumed
export const STALE_AFTER_HOURS = 3; // Q-17, assumed
export const EXPIRY_WARNING_DAYS = 7; // Q-17, assumed

export const CATALOGUE: Record<NotificationCode, Entry> = {
  github_missing: {
    severity: "error", summary: "GitHub connection", clearedBy: "github_pat",
    heading: () => "No GitHub token is set",
    body: () => [T("Gitilizer can't scan your issues. Add a personal access token in "), S("Settings"), T(".")],
  },
  github_expired: {
    severity: "error", summary: "GitHub connection", clearedBy: "github_pat",
    heading: () => "Your GitHub token has expired",
    body: () => [T("Issue scanning is paused. Replace your personal access token in "), S("Settings"), T(".")],
  },
  github_invalid: {
    severity: "error", summary: "GitHub connection", clearedBy: "github_pat",
    heading: () => "Your GitHub token isn't valid",
    body: () => [
      T("Issue scanning is paused. The token may have been revoked, deleted or mistyped. Replace your personal access token in "),
      S("Settings"), T("."),
    ],
  },
  github_org_blocks_token: {
    severity: "error", summary: "GitHub connection", clearedBy: "github_pat",
    heading: (p) => `${p.org} doesn't allow this type of token`,
    body: (p) => [T(
      `Issues and PRs from ${p.org} are missing from your list. ${p.org} blocks ${p.tokenType} personal access tokens. ` +
      `Create the other type of token, or ask an owner of ${p.org} to allow this one.`,
    )],
  },
  github_rate_limited: {
    severity: "error", summary: "GitHub connection", shortLived: true,
    heading: () => "GitHub's rate limit has been reached",
    body: (p) => [T(
      `Issue scanning is paused until ${p.time}, when GitHub resets the limit, and then resumes automatically. ` +
      "Other tools that use the same token count toward the same limit.",
    )],
  },
  github_unavailable: {
    severity: "error", summary: "GitHub connection", shortLived: true,
    heading: () => "GitHub isn't responding",
    body: () => [
      T("Issue scanning is paused. Gitilizer keeps retrying automatically. If this continues, check "),
      { text: "githubstatus.com", href: "https://www.githubstatus.com" }, T("."),
    ],
  },
  github_expiring: {
    severity: "warning", summary: "GitHub connection", clearedBy: "github_pat",
    heading: () => "Your GitHub token will expire soon",
    body: (p) => [T(`Your GitHub personal access token will expire in ${p.days} days. Create a new one and add it to `), S("Settings"), T(".")],
  },
  gemini_missing: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "No Gemini API key is set",
    body: () => [T("New and changed issues aren't being ranked. Add a Gemini API key in "), S("Settings"), T(".")],
  },
  gemini_invalid: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Your Gemini API key isn't valid",
    body: () => [T("New and changed issues aren't being ranked. Create a new key in Google AI Studio and add it in "), S("Settings"), T(".")],
  },
  gemini_leaked: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Google has disabled your Gemini API key",
    body: () => [
      T("Google reported the key as leaked, so it no longer works. New and changed issues aren't being ranked. Create a new key in Google AI Studio and add it in "),
      S("Settings"), T("."),
    ],
  },
  gemini_credits: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Your Gemini credits have run out",
    body: () => [T("New and changed issues aren't being ranked. Add credits or turn on auto-reload in Google AI Studio.")],
  },
  gemini_billing: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Your Gemini project needs billing",
    body: () => [T(
      "New and changed issues aren't being ranked. The key's Google Cloud project needs a working billing account, " +
      "or has a past-due balance. Fix billing in the Google Cloud console.",
    )],
  },
  gemini_daily_quota: {
    severity: "error", summary: "Gemini connection", clearedBy: "gemini_key",
    heading: () => "Your Gemini daily quota is used up",
    body: (p) => [T(
      `New and changed issues won't be ranked until the quota resets at ${p.time}, and then ranking resumes automatically. ` +
      "To avoid this, turn on billing or ask Google for a higher quota.",
    )],
  },
  gemini_rate_limited: {
    severity: "error", summary: "Gemini connection", shortLived: true,
    heading: () => "Gemini is limiting requests from your key",
    body: () => [T("Ranking is slower than usual and catches up automatically. Other apps that use this key count toward the same limit.")],
  },
  gemini_unavailable: {
    severity: "error", summary: "Gemini connection", shortLived: true,
    heading: () => "Gemini isn't responding",
    body: () => [
      T("New and changed issues aren't being ranked. Gitilizer keeps retrying automatically. If this continues, check the "),
      { text: "Google AI Studio status page", href: "https://aistudio.google.com/status" }, T("."),
    ],
  },
  prompt_failing: {
    severity: "error", summary: "Issue ranking",
    heading: () => "Your ranking prompt isn't working",
    body: () => [T("Most new and changed issues couldn't be ranked with your custom prompt. Edit the prompt, or restore the default prompt in "), S("Settings", "ranking-prompt"), T(".")],
  },
  cannot_connect: {
    severity: "error", summary: "Gitilizer",
    heading: () => "Can't connect to Gitilizer",
    body: () => [T("Your list won't update until the connection comes back. Check your internet connection.")],
  },
  stale: {
    severity: "error", summary: "Gitilizer",
    heading: (p) => `Your issues haven't updated since ${p.time}`,
    body: (p) => [T(
      `No scan has finished in ${p.duration}, so your list may be missing recent changes. Try Sync now. ` +
      "If this continues, report it using the GitHub link at the bottom of the page.",
    )],
  },
};

/** Errors before warnings, then oldest first (Q-16, assumed). */
export function compareNotifications(a: Notification, b: Notification): number {
  const sa = CATALOGUE[a.code].severity === "error" ? 0 : 1;
  const sb = CATALOGUE[b.code].severity === "error" ? 0 : 1;
  if (sa !== sb) return sa - sb;
  return a.firstDetectedAt < b.firstDetectedAt ? -1 : a.firstDetectedAt > b.firstDetectedAt ? 1 : 0;
}
