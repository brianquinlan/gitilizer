// Types and schemas shared by the server and the web app.
// See contributor/DESIGN.md#http-api and contributor/DESIGN.md#live-updates.
import { z } from "zod";

export * from "./notifications.ts";

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

/** Why an item is on the developer's list (PRD LIST-1). */
export const Reason = z.enum(["review_requested", "assigned", "mentioned", "created", "commented", "additional_repo"]);
export type Reason = z.infer<typeof Reason>;

/** Precedence when several reasons apply (PRD LIST-21). */
export const REASON_PRECEDENCE: Reason[] = ["review_requested", "assigned", "mentioned", "created", "commented", "additional_repo"];

export const ItemStatus = z.enum(["active", "iceboxed"]);
export type ItemStatus = z.infer<typeof ItemStatus>;

/** Why a row left a view (PRD LIVE-25, LIVE-26, ICE-9). */
export const RemovalReason = z.enum(["closed", "merged", "iceboxed", "restored", "no_longer_matches", "over_limit"]);
export type RemovalReason = z.infer<typeof RemovalReason>;

export const ItemRow = z.object({
  key: z.string(), // "owner/repo#123"
  repo: z.string(), // "owner/repo"
  number: z.number().int(),
  kind: z.enum(["issue", "pr"]),
  title: z.string(),
  htmlUrl: z.string(),
  updatedAt: z.string(), // GitHub updated_at (ISO)
  reasons: z.array(Reason),
  /** For `mentioned`: the handle used, e.g. "@maya"; null when unknown. */
  mentionHandle: z.string().nullable(),
  status: ItemStatus,
  iceboxedAt: z.string().nullable(),
  /** Agent score 0..1. null = not ranked yet. */
  score: z.number().nullable(),
  /** Model's explanation of the score (POC: shown on rank hover). */
  reasoning: z.string().nullable().optional(),
  /** True when ranking failed after retries (shown with "–", LIST-30). */
  rankFailed: z.boolean(),
  /** True when the item is waiting because every model's daily quota is used up (shown with "–", LIST-30, RANK-15). */
  waitingForQuota: z.boolean(),
});
export type ItemRow = z.infer<typeof ItemRow>;

/** Label for the inclusion-reason slot under the title (PRD LIST-3, LIST-21). */
export function reasonLabel(item: Pick<ItemRow, "reasons" | "mentionHandle" | "repo">): string {
  const top = REASON_PRECEDENCE.find((r) => item.reasons.includes(r));
  switch (top) {
    case "review_requested": return "Review requested";
    case "assigned": return "Assigned to you";
    case "mentioned": return item.mentionHandle ?? "@-mentioned";
    case "created": return "Created by you";
    case "commented": return "Commented on by you";
    case "additional_repo": return item.repo;
    default: return "";
  }
}

/** True for an item shown with "–" at the end of the list (LIST-30). */
export const isUnranked = (i: Pick<ItemRow, "score" | "rankFailed" | "waitingForQuota">) =>
  i.rankFailed || (i.score === null && i.waitingForQuota);

/**
 * Order of the Prioritized list (PRD RANK-3, RANK-4): score desc, then most
 * recent activity, then key. Unranked items (failed, or waiting for quota)
 * come after every ranked item, newest first (LIST-30).
 */
export function compareByPriority(a: ItemRow, b: ItemRow): number {
  const sa = a.rankFailed || a.score === null ? -1 : a.score;
  const sb = b.rankFailed || b.score === null ? -1 : b.score;
  if (sa !== sb) return sb - sa;
  if (a.updatedAt !== b.updatedAt) return a.updatedAt < b.updatedAt ? 1 : -1;
  return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
}

/** The Prioritized list holds at most this many items (LIST-19). */
export const MAX_LIST_ITEMS = 1000;

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

export const SortColumn = z.enum(["priority", "type", "repo", "modified"]);
export type SortColumn = z.infer<typeof SortColumn>;
export const Sort = z.object({ column: SortColumn, dir: z.enum(["asc", "desc"]) });
export type Sort = z.infer<typeof Sort>;

export const DEFAULT_SORT_PRIORITIZED: Sort = { column: "priority", dir: "asc" };
export const DEFAULT_SORT_ICEBOX: Sort = { column: "type", dir: "asc" };
/** First direction when a column is chosen (LIST-25). */
export const FIRST_DIRECTION: Record<SortColumn, "asc" | "desc"> = {
  priority: "asc", type: "asc", repo: "asc", modified: "desc",
};

// ---------------------------------------------------------------------------
// Account, settings, credentials
// ---------------------------------------------------------------------------

export const CredentialKind = z.enum(["github_pat", "gemini_key"]);
export type CredentialKind = z.infer<typeof CredentialKind>;

/** The status chip on a credential card (PRD SET-30). */
export const CredentialChip = z.enum(["not_set", "connected", "not_working", "expires_soon"]);
export type CredentialChip = z.infer<typeof CredentialChip>;

export const CredentialStatus = z.object({
  set: z.boolean(),
  chip: CredentialChip,
  expiresAt: z.string().nullable(),
});
export type CredentialStatus = z.infer<typeof CredentialStatus>;

/**
 * How far a running sync has got, for the text next to Sync now (PRD LIST-33):
 * the items found so far while a full scan searches (null until the first
 * search returns), then the items left to rank. `waiting` is true when
 * everything left is waiting out a Gemini per-minute limit or a retry.
 */
export const SyncProgress = z.discriminatedUnion("phase", [
  z.object({ phase: z.literal("finding"), found: z.number().int().nullable() }),
  z.object({ phase: z.literal("ranking"), left: z.number().int(), waiting: z.boolean() }),
]);
export type SyncProgress = z.infer<typeof SyncProgress>;

/** `progress` is null when no sync is running. */
export const SyncEvent = z.object({ running: z.boolean(), lastFinishedAt: z.string().nullable(), progress: SyncProgress.nullable() });
export type SyncEvent = z.infer<typeof SyncEvent>;

export const Me = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatarUrl: z.string().nullable(),
    provider: z.enum(["google", "github", "dev", "local"]),
    githubLogin: z.string().nullable(),
  }),
  /** Which top-level screen to show (PRD NAV-1). */
  screen: z.enum(["welcome", "app"]),
  credentials: z.object({ github_pat: CredentialStatus, gemini_key: CredentialStatus }),
  firstSyncDone: z.boolean(),
  sync: SyncEvent,
});
export type Me = z.infer<typeof Me>;

/** Access states of an additional repository (PRD SET-8). */
export const RepoAccess = z.enum(["checking", "ok", "not_found", "sso_required", "token_type_blocked", "archived"]);
export type RepoAccess = z.infer<typeof RepoAccess>;

export const MAX_REPOS = 25; // SET-7
export const MAX_REPO_PROMPT_LENGTH = 500; // SET-9
export const MAX_PROMPT_LENGTH = 20_000; // SET-24
export const PROMPT_COUNT_FROM = 18_000; // SET-27: the character count appears from here
export const MAX_COLLABORATORS = 50; // SET-25

export const AdditionalRepo = z.object({
  fullName: z.string(),
  prioritizationPrompt: z.string(),
  access: RepoAccess,
  /** For token_type_blocked: the kind of token the organization blocks. */
  tokenType: z.enum(["classic", "fine-grained"]).nullable(),
});
export type AdditionalRepo = z.infer<typeof AdditionalRepo>;

export const Collaborator = z.object({
  login: z.string(),
  /** From GET /users/{login}: ok, not_found, or unknown when GitHub couldn't be reached (SET-19). */
  status: z.enum(["ok", "not_found", "unknown"]),
  avatarUrl: z.string().nullable(),
});
export type Collaborator = z.infer<typeof Collaborator>;

export const Settings = z.object({
  additionalRepos: z.array(AdditionalRepo),
  collaborators: z.array(Collaborator),
  /** null = use the default prompt. */
  customPrompt: z.string().nullable(),
  sortPrioritized: Sort,
  sortIcebox: Sort,
});
export type Settings = z.infer<typeof Settings>;

export const SettingsResponse = Settings.extend({ defaultPrompt: z.string() });
export type SettingsResponse = z.infer<typeof SettingsResponse>;

/** PUT /api/settings: everything on the page (SET-14). */
export const SettingsUpdate = z.object({
  additionalRepos: z.array(z.object({ fullName: z.string(), prioritizationPrompt: z.string() })),
  collaborators: z.array(z.string()),
  customPrompt: z.string().nullable(),
  credentials: z.object({ github_pat: z.string().optional(), gemini_key: z.string().optional() }).optional(),
  /** "Save and re-rank" (SET-15). */
  rerank: z.boolean(),
});
export type SettingsUpdate = z.infer<typeof SettingsUpdate>;

/** A problem next to a field (SET-27). `field` is the id of the control. */
export const FieldError = z.object({ field: z.string(), message: z.string() });
export type FieldError = z.infer<typeof FieldError>;

/** Control ids used by Settings links (NOTIF-9, LIST-14). */
export const repoControlId = (fullName: string) => `repo-${fullName.replace("/", "-")}`;

/**
 * Parses "owner/name" or a GitHub URL ("https://github.com/owner/name/…") into
 * "owner/name" (SET-7). Returns null for anything else.
 */
export function parseRepo(input: string): string | null {
  let s = input.trim();
  const url = s.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/\s]+)\/([^/\s?#]+)(?:[/?#].*)?$/i);
  if (url) s = `${url[1]}/${url[2].replace(/\.git$/i, "")}`;
  return /^[A-Za-z0-9-]{1,39}\/[\w.-]{1,100}$/.test(s) && !s.endsWith("/.") && !s.endsWith("/..") ? s : null;
}

/** Strips a leading "@" (SET-25). Returns null if what's left isn't a possible GitHub username. */
export function parseLogin(input: string): string | null {
  const s = input.trim().replace(/^@/, "");
  return /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/.test(s) ? s : null;
}

/** Same checks as the server (SET-7, SET-9, SET-24, SET-25, SET-27). */
export const MESSAGES = {
  repoFormat: "Enter a repository as owner/name or paste its GitHub URL.",
  repoDuplicate: (r: string) => `${r} is already in your list.`,
  repoLimit: `You can add at most ${MAX_REPOS} repositories.`,
  repoPromptLength: (n: number) => `A prioritization prompt can be at most ${MAX_REPO_PROMPT_LENGTH} characters. This one has ${n.toLocaleString("en-US")}.`,
  loginFormat: "Enter a GitHub username, for example octocat.",
  loginDuplicate: (l: string) => `${l} is already a collaborator.`,
  loginLimit: `You can add at most ${MAX_COLLABORATORS} collaborators.`,
  promptLength: (n: number) => `A prompt can be at most ${MAX_PROMPT_LENGTH.toLocaleString("en-US")} characters. This one has ${n.toLocaleString("en-US")}.`,
  promptEmpty: "Enter a prompt, or choose Restore default.",
};

/** Result of POST /api/credentials/:kind/check (SET-2, SET-28). */
export const CheckResult = z.object({
  ok: z.boolean(),
  code: z.enum(["ok", "not_accepted", "expired", "permission", "leaked", "permission_denied", "unreachable", "error"]),
  login: z.string().optional(),
  expiresAt: z.string().optional(),
  permission: z.string().optional(),
});
export type CheckResult = z.infer<typeof CheckResult>;

/** POST /api/setup: Warm Welcome's Save, with the values typed there (WEL-4). */
export const SetupRequest = z.object({
  credentials: z.object({ github_pat: z.string().max(500).optional(), gemini_key: z.string().max(500).optional() }),
});
export type SetupRequest = z.infer<typeof SetupRequest>;

/** A check result for each typed value; with ok: false nothing was saved (WEL-4). */
export const SetupResponse = z.object({
  ok: z.boolean(),
  results: z.object({ github_pat: CheckResult.optional(), gemini_key: CheckResult.optional() }),
});
export type SetupResponse = z.infer<typeof SetupResponse>;

/** The text shown under a credential field after Validate (SET-28). */
export function checkMessage(kind: CredentialKind, r: CheckResult): string {
  const gh = kind === "github_pat";
  switch (r.code) {
    case "ok": return gh ? `Validated just now · Reading GitHub as @${r.login}` : "Validated just now · Gemini accepted this key";
    case "not_accepted": return gh ? "GitHub didn't accept this token. Check that you copied it correctly." : "Google didn't accept this API key. Check that you copied all of it.";
    case "expired": return `This token expired on ${r.expiresAt ? new Date(r.expiresAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "an earlier date"}. Create a new one.`;
    case "permission": return `This token can't read ${r.permission ?? "issues"}. Give it read access to Issues, Pull requests and Metadata.`;
    case "leaked": return "Google has disabled this key because it was reported as leaked. Create a new one.";
    case "permission_denied": return "This key can't use the Gemini API. Create a key in Google AI Studio.";
    case "unreachable": return `Couldn't reach ${gh ? "GitHub" : "Google"}. Check your connection and try again.`;
    default: return "Something went wrong on our side. Try again.";
  }
}

// ---------------------------------------------------------------------------
// Live updates (server-sent events)
// ---------------------------------------------------------------------------

export const ListResponse = z.object({ version: z.number(), items: z.array(ItemRow) });
export type ListResponse = z.infer<typeof ListResponse>;

export const ListEvent = z.object({
  version: z.number(),
  /** A bulk re-rank: applied in one step without row indicators (LIVE-24). */
  bulk: z.boolean(),
  upserts: z.array(ItemRow),
  removals: z.array(z.object({ key: z.string(), reason: RemovalReason })),
  /** True when the server can't replay from Last-Event-ID; the client refetches /api/list. */
  resync: z.boolean().optional(),
});
export type ListEvent = z.infer<typeof ListEvent>;


/** Sign-in failure categories in /sign-in?error= (AUTH-10). `not_allowed` happens only in the development environment (NFR-12). */
export const SignInError = z.enum(["cancelled", "provider_unavailable", "expired", "not_allowed", "gitilizer_error"]);
export type SignInError = z.infer<typeof SignInError>;

/** Header every state-changing browser request must send (design: Security). */
export const CSRF_HEADER = "x-gitilizer";
