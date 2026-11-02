// Types and schemas shared by the server and the web app.
// See docs/design.md#http-api and docs/design.md#live-updates.
import { z } from "zod";

export * from "./notifications.ts";

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

/** Why an item is on the developer's list (PRD LIST-1, Q-21). */
export const Reason = z.enum(["assigned", "review_requested", "mentioned", "created", "interested_repo"]);
export type Reason = z.infer<typeof Reason>;

/** Precedence when several reasons apply (PRD Q-22, assumed). */
export const REASON_PRECEDENCE: Reason[] = ["assigned", "review_requested", "mentioned", "created", "interested_repo"];

export const ItemStatus = z.enum(["active", "iceboxed"]);
export type ItemStatus = z.infer<typeof ItemStatus>;

export const RemovalReason = z.enum(["closed", "merged", "iceboxed", "restored", "no_longer_matches"]);
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
  /** For `mentioned`: the handle used, e.g. "@maya" or "@org/team"; null when unknown. */
  mentionHandle: z.string().nullable(),
  status: ItemStatus,
  iceboxedAt: z.string().nullable(),
  /** Agent score 0..1. null = not ranked yet. */
  score: z.number().nullable(),
  /** True when ranking failed after retries (shown with "–"). */
  rankFailed: z.boolean(),
});
export type ItemRow = z.infer<typeof ItemRow>;

/** Label for the inclusion-reason slot under the title (PRD LIST-3, Q-22). */
export function reasonLabel(item: Pick<ItemRow, "reasons" | "mentionHandle">): string {
  const top = REASON_PRECEDENCE.find((r) => item.reasons.includes(r));
  switch (top) {
    case "assigned": return "Assigned to you";
    case "review_requested": return "Review requested";
    case "mentioned": return item.mentionHandle ?? "@-mentioned";
    case "created": return "Created by you";
    case "interested_repo": return "Interested repository";
    default: return "";
  }
}

/**
 * Order of the Prioritized list (PRD RANK-3, RANK-4): score desc, then most
 * recent activity, then key. Unranked items are hidden by the caller; failed
 * items sort last, newest first (Q-28, assumed).
 */
export function compareByPriority(a: ItemRow, b: ItemRow): number {
  const sa = a.rankFailed ? -1 : (a.score ?? -1);
  const sb = b.rankFailed ? -1 : (b.score ?? -1);
  if (sa !== sb) return sb - sa;
  if (a.updatedAt !== b.updatedAt) return a.updatedAt < b.updatedAt ? 1 : -1;
  return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

export const SortColumn = z.enum(["priority", "type", "repo", "modified"]);
export type SortColumn = z.infer<typeof SortColumn>;
export const Sort = z.object({ column: SortColumn, dir: z.enum(["asc", "desc"]) });
export type Sort = z.infer<typeof Sort>;

export const DEFAULT_SORT_PRIORITIZED: Sort = { column: "priority", dir: "asc" };
export const DEFAULT_SORT_ICEBOX: Sort = { column: "type", dir: "asc" };
/** First direction when a column is chosen (Q-25, assumed). */
export const FIRST_DIRECTION: Record<SortColumn, "asc" | "desc"> = {
  priority: "asc", type: "asc", repo: "asc", modified: "desc",
};

// ---------------------------------------------------------------------------
// Account, settings, credentials
// ---------------------------------------------------------------------------

export const CredentialKind = z.enum(["github_pat", "gemini_key"]);
export type CredentialKind = z.infer<typeof CredentialKind>;

export const CredentialStatus = z.object({
  set: z.boolean(),
  status: z.enum(["missing", "connected", "invalid", "unchecked"]),
  validatedAt: z.string().nullable(),
  detail: z.string().nullable(),
  expiresAt: z.string().nullable(),
});
export type CredentialStatus = z.infer<typeof CredentialStatus>;

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
  sync: z.object({ running: z.boolean(), lastFinishedAt: z.string().nullable() }),
});
export type Me = z.infer<typeof Me>;

export const InterestedRepo = z.object({
  fullName: z.string().regex(/^[\w.-]+\/[\w.-]+$/),
  filter: z.string().max(500).default(""),
  access: z.enum(["ok", "not_found", "no_access", "unknown"]).default("unknown"),
});
export type InterestedRepo = z.infer<typeof InterestedRepo>;

export const Collaborator = z.object({
  login: z.string().regex(/^[A-Za-z0-9-]{1,39}$/),
  exists: z.boolean().nullable().default(null),
});
export type Collaborator = z.infer<typeof Collaborator>;

export const MAX_PROMPT_LENGTH = 20_000; // Q-44, assumed
export const MAX_REPOS = 25; // Q-41, assumed
export const MAX_COLLABORATORS = 50; // Q-42, assumed

export const Settings = z.object({
  repos: z.array(InterestedRepo).max(MAX_REPOS),
  collaborators: z.array(Collaborator).max(MAX_COLLABORATORS),
  /** null = use the default prompt. */
  customPrompt: z.string().max(MAX_PROMPT_LENGTH).nullable(),
  sortPrioritized: Sort,
  sortIcebox: Sort,
});
export type Settings = z.infer<typeof Settings>;

export const SettingsResponse = Settings.extend({ defaultPrompt: z.string(), activeItemCount: z.number() });
export type SettingsResponse = z.infer<typeof SettingsResponse>;

// ---------------------------------------------------------------------------
// Live updates (server-sent events)
// ---------------------------------------------------------------------------

export const ListResponse = z.object({ version: z.number(), items: z.array(ItemRow) });
export type ListResponse = z.infer<typeof ListResponse>;

export const ListEvent = z.object({
  version: z.number(),
  upserts: z.array(ItemRow),
  removals: z.array(z.object({ key: z.string(), reason: RemovalReason })),
  /** True when the server can't replay from Last-Event-ID; the client refetches /api/list. */
  resync: z.boolean().optional(),
});
export type ListEvent = z.infer<typeof ListEvent>;

export const SyncEvent = z.object({ running: z.boolean(), lastFinishedAt: z.string().nullable() });
export type SyncEvent = z.infer<typeof SyncEvent>;

/** Header every state-changing browser request must send (design: Security). */
export const CSRF_HEADER = "x-gitilizer";
