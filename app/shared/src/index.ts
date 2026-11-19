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
export const RemovalReason = z.enum(["closed", "merged", "iceboxed", "restored", "no_longer_matches", "excluded", "over_limit"]);
export type RemovalReason = z.infer<typeof RemovalReason>;

/**
 * Whose move it is on an item, one of seven that ranking gives it (PRD RANK-23).
 * The ranker defines what each means, in the words the agent is told.
 */
export const NextStep = z.enum(["review", "respond", "todo", "backlog", "waiting", "elsewhere", "not_yours"]);
export type NextStep = z.infer<typeof NextStep>;

/** The chip's text (PRD LIST-42). */
export const NEXT_STEP_LABEL: Record<NextStep, string> = {
  review: "Review", respond: "Respond", todo: "To do", backlog: "Backlog", waiting: "Waiting", elsewhere: "Elsewhere", not_yours: "Not yours",
};

/**
 * The chip's look (PRD LIST-42): `now` is on the developer (filled blue), `later`
 * is on them but not pressing (outlined blue), `off` isn't on them (grey).
 */
export const NEXT_STEP_TONE: Record<NextStep, "now" | "later" | "off"> = {
  review: "now", respond: "now", todo: "now", backlog: "later", waiting: "off", elsewhere: "off", not_yours: "off",
};

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
  /** The agent's explanation of the score, shown in the rank reasoning popup (LIST-24); null for basic ranking. */
  reasoning: z.string().nullable().optional(),
  /** Whose move it is (RANK-23); null until the item is ranked with next steps (LIST-42). */
  nextStep: NextStep.nullable().optional(),
  /** The agent's one-sentence next action, shown in the rank reasoning popup (LIST-24); null for basic ranking. */
  nextAction: z.string().nullable().optional(),
  /** True when ranking failed after retries (shown with "–", LIST-30). */
  rankFailed: z.boolean(),
  /**
   * True when the item is waiting because ranking is paused: every Gemini
   * model's daily quota is used up, or the agent's key, credits or billing
   * doesn't work (shown with "–", LIST-30, RANK-20).
   */
  waiting: z.boolean(),
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
export const isUnranked = (i: Pick<ItemRow, "score" | "rankFailed" | "waiting">) =>
  i.rankFailed || (i.score === null && i.waiting);

/**
 * Order of the Prioritized list (PRD RANK-3, RANK-4): score desc, then most
 * recent activity, then key. Unranked items (failed, or waiting while ranking is paused)
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

export const CredentialKind = z.enum(["github_pat", "gemini_key", "anthropic_key", "openai_key"]);
export type CredentialKind = z.infer<typeof CredentialKind>;

/** The ranking agents a developer can choose (PRD SET-38). */
export const RankingAgent = z.enum(["gemini", "claude", "openai"]);
export type RankingAgent = z.infer<typeof RankingAgent>;

/** How a developer's items are ranked: by one of the agents, with their key, or by basic ranking, with Gitilizer's (PRD RANK-21, SET-38). */
export const RankingChoice = z.enum(["gemini", "claude", "openai", "basic"]);
export type RankingChoice = z.infer<typeof RankingChoice>;

/** What the interface says about basic ranking (SET-38, WEL-3, WEL-4). */
export const BASIC_INFO = {
  name: "Basic ranking",
  vendor: "Built in",
  pill: "No key needed",
  line: "Good for your top items, less precise below them, with no explanation for each rank.",
  /** In place of a key field in Settings (SET-38). */
  nothingToSetUp: "Gitilizer ranks your list itself, so there is nothing to set up.",
  compareSettings: "Compare with your own key",
  /** Under the key field on Warm Welcome (WEL-3). */
  welcomeGuidance: "Gemini ranked best in our tests, and Google's free tier costs nothing. Without a key you get basic ranking: good for your top items, less precise below them, with no explanation for each rank.",
  compareWelcome: "Compare",
  /** Beside "Save and re-rank" while basic ranking is chosen (SET-15). */
  noRerank: "Re-ranking everything needs your own API key.",
  /** Anchor of its section in the user guide (FOOT-3). */
  docs: "basic-ranking",
} as const;

/** The name of a ranking choice as the interface writes it mid-sentence (SET-40). */
export const choiceName = (c: RankingChoice): string => (c === "basic" ? "basic ranking" : AGENT_INFO[c].name);

/** The credentials that are a ranking agent's API key. */
export const AgentKeyKind = z.enum(["gemini_key", "anthropic_key", "openai_key"]);
export type AgentKeyKind = z.infer<typeof AgentKeyKind>;

/** What the interface says about each agent (SET-1, SET-4, SET-32, SET-38, WEL-5). */
export const AGENT_INFO: Record<RankingAgent, {
  name: string;
  vendor: string;
  kind: AgentKeyKind;
  /** The agent Gitilizer recommends: it ranked best in evaluation at the lowest cost (PRD Q-85). */
  recommended: boolean;
  /** Has a free tier ("Free tier available"); the others are "Pay as you go". */
  free: boolean;
  setup: { text: string; href: string };
  /** Where the developer manages the key, in notification and Validate text. */
  console: string;
  /** Anchor of the agent's section in the user guide (SET-32). */
  docs: string;
}> = {
  gemini: {
    name: "Gemini", vendor: "Google", kind: "gemini_key", recommended: true, free: true,
    setup: { text: "Get an API key", href: "https://aistudio.google.com/apikey" },
    console: "Google AI Studio", docs: "gemini-api-keys",
  },
  claude: {
    name: "Claude", vendor: "Anthropic", kind: "anthropic_key", recommended: false, free: false,
    setup: { text: "Get an API key", href: "https://platform.claude.com/settings/keys" },
    console: "the Claude Console", docs: "claude-api-keys",
  },
  openai: {
    name: "OpenAI", vendor: "OpenAI", kind: "openai_key", recommended: false, free: false,
    setup: { text: "Get an API key", href: "https://platform.openai.com/api-keys" },
    console: "the OpenAI dashboard", docs: "openai-api-keys",
  },
};

/** The agent whose key a credential is, or null for the GitHub token. */
export function agentForKind(kind: CredentialKind): RankingAgent | null {
  return RankingAgent.options.find((a) => AGENT_INFO[a].kind === kind) ?? null;
}

/** The id of a credential's field, which Settings links focus (NOTIF-9). */
export function credentialControlId(kind: CredentialKind): string {
  return { github_pat: "github-pat", gemini_key: "gemini-key", anthropic_key: "claude-key", openai_key: "openai-key" }[kind];
}

/** The status chip on a credential card (PRD SET-30). */
export const CredentialChip = z.enum(["not_set", "connected", "not_working", "expires_soon", "needs_attention"]);
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
 * everything left is waiting out the agent's per-minute limit or a retry.
 */
export const SyncProgress = z.discriminatedUnion("phase", [
  z.object({ phase: z.literal("finding"), found: z.number().int().nullable() }),
  z.object({ phase: z.literal("ranking"), left: z.number().int(), waiting: z.boolean() }),
]);
export type SyncProgress = z.infer<typeof SyncProgress>;

/** `progress` is null when no sync is running. */
export const SyncEvent = z.object({ running: z.boolean(), lastFinishedAt: z.string().nullable(), progress: SyncProgress.nullable() });
export type SyncEvent = z.infer<typeof SyncEvent>;

/** How Gitilizer reads GitHub for a developer: the Gitilizer app or a personal access token (PRD SET-42). */
export const GitHubMethod = z.enum(["app", "pat"]);
export type GitHubMethod = z.infer<typeof GitHubMethod>;

/** The id of the control that connects GitHub, which Settings links focus (NOTIF-9). */
export const GITHUB_CONNECT_ID = "github-connect";

/** Why the browser came back from GitHub without a connection (SET-43). */
export const ConnectFailure = z.enum(["cancelled", "failed"]);
export type ConnectFailure = z.infer<typeof ConnectFailure>;
export const CONNECT_MESSAGES: Record<ConnectFailure, string> = {
  cancelled: "GitHub wasn't connected.",
  failed: "Couldn't connect GitHub. Try again.",
};

/** The note wherever the interface offers the connection (SET-44). */
export const GITHUB_ACCESS_NOTE = "Read-only access to your issues and pull requests. Gitilizer can't change anything on GitHub.";

/** The permissions the Gitilizer app needs on an account, besides metadata (SET-44). */
export const AppPermission = z.enum(["issues", "pull_requests"]);
export type AppPermission = z.infer<typeof AppPermission>;
export const APP_PERMISSION_LABEL: Record<AppPermission, { name: string; short: string }> = {
  issues: { name: "issues", short: "issues" },
  pull_requests: { name: "pull requests", short: "PRs" },
};

/** An account the Gitilizer app is installed on (SET-45, SET-47). */
export const GitHubInstallation = z.object({
  account: z.string(),
  accountType: z.enum(["Organization", "User"]),
  avatarUrl: z.string().nullable(),
  /** Every repository of the account, or the ones its owner selected. */
  selection: z.enum(["all", "selected"]),
  /** How many repositories are selected; null for "all" or when GitHub didn't say. */
  repoCount: z.number().int().nullable(),
  /** Permissions the account hasn't approved. */
  missing: z.array(AppPermission),
});
export type GitHubInstallation = z.infer<typeof GitHubInstallation>;

/** GET /api/github/connection: what the GitHub card shows (SET-46, SET-47). */
export const GitHubConnection = z.object({
  method: GitHubMethod.nullable(),
  login: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  /** Whether this environment offers the Gitilizer app; without it only a token can be used. */
  app: z.boolean(),
  /** The app's connection has ended and needs "Reconnect GitHub" (SET-46). */
  ended: z.boolean(),
  /** GitHub's page for installing the app on an account (SET-45). */
  installUrl: z.string().nullable(),
  installations: z.array(GitHubInstallation),
  /** Organizations where the developer asked for the app and an owner hasn't approved it yet (Q-89). */
  pending: z.array(z.object({ account: z.string(), avatarUrl: z.string().nullable() })),
});
export type GitHubConnection = z.infer<typeof GitHubConnection>;

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
  credentials: z.object({ github_pat: CredentialStatus, gemini_key: CredentialStatus, anthropic_key: CredentialStatus, openai_key: CredentialStatus }),
  /** The GitHub connection in use, and the chip on the GitHub card (SET-30, SET-42). */
  github: z.object({
    method: GitHubMethod.nullable(), login: z.string().nullable(), avatarUrl: z.string().nullable(), chip: CredentialChip,
    /** Whether this environment offers the Gitilizer app, and GitHub's page for installing it on an account (SET-45). */
    app: z.boolean(), installUrl: z.string().nullable(),
  }),
  /** The agent that ranks the developer's list, or basic ranking (SET-38, RANK-21). */
  rankingAgent: RankingChoice,
  /** Whether the developer has chosen how their items are ranked, on Warm Welcome or in Settings ("Which screen is shown"). */
  rankingChosen: z.boolean(),
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
export const MAX_EXCLUSIONS = 25; // SET-33

export const AdditionalRepo = z.object({
  fullName: z.string(),
  prioritizationPrompt: z.string(),
  access: RepoAccess,
  /** For token_type_blocked: the kind of token the organization blocks. */
  tokenType: z.enum(["classic", "fine-grained"]).nullable(),
  /** The owner's avatar and kind of account, shown as GitHub does (SET-8); null until GitHub has found the repository. */
  ownerAvatarUrl: z.string().nullable(),
  ownerType: z.enum(["Organization", "User"]).nullable(),
});
export type AdditionalRepo = z.infer<typeof AdditionalRepo>;

/** An excluded repository or owner (PRD SET-33 to SET-37). */
export const ExcludedRepo = z.object({
  /** "owner/name" for a repository, "owner" for an owner; GitHub's current spelling once found. */
  name: z.string(),
  kind: z.enum(["repo", "owner"]),
  /** checking until GitHub has answered; not_found when it doesn't exist or the token can't read it (SET-36). */
  status: z.enum(["checking", "ok", "not_found"]),
  /**
   * The owner's kind of account and avatar: the excluded owner's, or the
   * repository owner's, as GitHub shows a repository. The kind picks the
   * avatar's shape (SET-36). Null until GitHub has found it.
   */
  ownerType: z.enum(["Organization", "User"]).nullable(),
  avatarUrl: z.string().nullable(),
});
export type ExcludedRepo = z.infer<typeof ExcludedRepo>;

export const Collaborator = z.object({
  login: z.string(),
  /** From GET /users/{login}: ok, not_found, or unknown when GitHub couldn't be reached (SET-19). */
  status: z.enum(["ok", "not_found", "unknown"]),
  avatarUrl: z.string().nullable(),
});
export type Collaborator = z.infer<typeof Collaborator>;

export const Settings = z.object({
  additionalRepos: z.array(AdditionalRepo),
  excludedRepos: z.array(ExcludedRepo),
  collaborators: z.array(Collaborator),
  /** null = use the default prompt. */
  customPrompt: z.string().nullable(),
  sortPrioritized: Sort,
  sortIcebox: Sort,
  /** The "Keyboard shortcuts" switch (SET-50, KEY-3). */
  keyboardShortcuts: z.boolean(),
});
export type Settings = z.infer<typeof Settings>;

/** PUT /api/preferences: what the Preferences block saves as soon as it changes (SET-50). */
export const Preferences = z.object({ keyboardShortcuts: z.boolean() });
export type Preferences = z.infer<typeof Preferences>;

export const SettingsResponse = Settings.extend({
  defaultPrompt: z.string(),
  rankingAgent: RankingChoice,
  /** Whether the developer has chosen how their items are ranked; until then the picker starts on Gemini (SET-38). */
  rankingChosen: z.boolean(),
  /** Items in the Prioritized list scored by each agent and by basic ranking, for the switch dialog's {n} (SET-40). */
  rankedBy: z.record(RankingChoice, z.number().int()),
});
export type SettingsResponse = z.infer<typeof SettingsResponse>;

/** PUT /api/settings: everything on the page (SET-14). */
export const SettingsUpdate = z.object({
  additionalRepos: z.array(z.object({ fullName: z.string(), prioritizationPrompt: z.string() })),
  /** Names as typed or as GitHub spells them: "owner/name" or "owner" (SET-33). */
  excludedRepos: z.array(z.string()).default([]),
  collaborators: z.array(z.string()),
  customPrompt: z.string().nullable(),
  credentials: z.object({
    github_pat: z.string().optional(), gemini_key: z.string().optional(), anthropic_key: z.string().optional(), openai_key: z.string().optional(),
  }).optional(),
  /** The choice in the picker (SET-38); unchanged when absent. */
  rankingAgent: RankingChoice.optional(),
  /** Saved keys of agents not in use that the developer removed (SET-39). */
  removeCredentials: z.array(AgentKeyKind).default([]),
  /** "Save and re-rank" (SET-15). Ignored while basic ranking is the choice, which never ranks everything again (RANK-21). */
  rerank: z.boolean(),
});
export type SettingsUpdate = z.infer<typeof SettingsUpdate>;

/** A problem next to a field (SET-27). `field` is the id of the control. */
export const FieldError = z.object({ field: z.string(), message: z.string() });
export type FieldError = z.infer<typeof FieldError>;

/** Control ids used by Settings links (NOTIF-9, LIST-14). */
export const repoControlId = (fullName: string) => `repo-${fullName.replace("/", "-")}`;
export const exclusionControlId = (name: string) => `exclusion-${name.replace("/", "-")}`;

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

/**
 * Parses an exclusion (SET-33): "owner/name", "owner", or a GitHub URL for
 * either ("https://github.com/owner", "https://github.com/orgs/owner/…",
 * "https://github.com/owner/name/…"). A leading "@" is removed. Returns null
 * for anything else.
 */
export function parseExclusion(input: string): { kind: "repo" | "owner"; name: string } | null {
  let s = input.trim().replace(/^@/, "");
  const url = s.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/(?:orgs\/([^/\s?#]+)(?:[/?#].*)?|([^/\s?#]+)\/?(?:[?#].*)?)$/i);
  if (url) s = url[1] ?? url[2];
  if (s.includes("/") || /github\.com\//i.test(s)) {
    const repo = parseRepo(s.replace(/^@/, ""));
    return repo ? { kind: "repo", name: repo } : null;
  }
  const owner = parseLogin(s);
  return owner ? { kind: "owner", name: owner } : null;
}

/** The additional repositories an excluded owner owns, which still appear (SET-35). Alphabetical. */
export function exceptedRepos(owner: string, additionalRepos: string[]): string[] {
  const o = owner.toLowerCase();
  return additionalRepos.filter((r) => r.split("/")[0].toLowerCase() === o).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

/**
 * The note under an excluded owner (SET-35, SET-36), as text parts and the
 * repository names it links to, in reading order.
 */
export function exclusionNote(owner: string, ownerType: "Organization" | "User" | null, additionalRepos: string[]): { parts: (string | { repo: string })[] } {
  const except = exceptedRepos(owner, additionalRepos);
  const parts: (string | { repo: string })[] = [`Every repository ${owner} owns`];
  if (except.length) {
    parts.push(", except ");
    except.forEach((repo, i) => {
      if (i > 0) parts.push(i === except.length - 1 ? " and " : ", ");
      parts.push({ repo });
    });
    parts.push(except.length === 1 ? ", which is an additional repository." : ", which are additional repositories.");
  } else {
    parts.push(".");
  }
  if (ownerType === "User") parts.push(` Issues and PRs ${owner} opens elsewhere still appear.`);
  return { parts };
}

/** Same checks as the server (SET-7, SET-9, SET-24, SET-25, SET-27). */
export const MESSAGES = {
  repoFormat: "Enter a repository as owner/name or paste its GitHub URL.",
  repoDuplicate: (r: string) => `${r} is already in your list.`,
  repoLimit: `You can add at most ${MAX_REPOS} repositories.`,
  repoPromptLength: (n: number) => `A prioritization prompt can be at most ${MAX_REPO_PROMPT_LENGTH} characters. This one has ${n.toLocaleString("en-US")}.`,
  exclusionFormat: "Enter a repository as owner/name, an owner's name, or paste a GitHub URL.",
  exclusionDuplicate: (n: string) => `${n} is already excluded.`,
  exclusionLimit: `You can exclude at most ${MAX_EXCLUSIONS} repositories and owners.`,
  exclusionIsAdditional: (r: string) => `${r} is one of your additional repositories. Remove it there first to exclude it.`,
  repoIsExcluded: (r: string) => `${r} is excluded. Remove it from Excluded repositories first to follow it.`,
  loginFormat: "Enter a GitHub username, for example octocat.",
  loginDuplicate: (l: string) => `${l} is already a collaborator.`,
  loginLimit: `You can add at most ${MAX_COLLABORATORS} collaborators.`,
  promptLength: (n: number) => `A prompt can be at most ${MAX_PROMPT_LENGTH.toLocaleString("en-US")} characters. This one has ${n.toLocaleString("en-US")}.`,
  promptEmpty: "Enter a prompt, or choose Restore default.",
  agentKeyMissing: (agent: RankingAgent) => {
    const name = AGENT_INFO[agent].name;
    return `Add ${/^[AEIOU]/.test(name) ? "an" : "a"} ${name} API key, or choose basic ranking.`;
  },
};

/**
 * Problems with the exclusions on the page (SET-27, SET-33, SET-35), checked in
 * the browser and again on the server. `additionalRepos` are the page's
 * additional repositories.
 */
export function exclusionErrors(exclusions: string[], additionalRepos: string[]): FieldError[] {
  const errors: FieldError[] = [];
  const seen = new Set<string>();
  const additional = new Set(additionalRepos.map((r) => r.toLowerCase()));
  if (exclusions.length > MAX_EXCLUSIONS) errors.push({ field: "add-exclusion", message: MESSAGES.exclusionLimit });
  for (const raw of exclusions) {
    const e = parseExclusion(raw);
    if (!e) { errors.push({ field: "add-exclusion", message: MESSAGES.exclusionFormat }); continue; }
    const key = e.name.toLowerCase();
    if (seen.has(key)) errors.push({ field: exclusionControlId(e.name), message: MESSAGES.exclusionDuplicate(e.name) });
    seen.add(key);
    if (e.kind === "repo" && additional.has(key)) errors.push({ field: exclusionControlId(e.name), message: MESSAGES.exclusionIsAdditional(e.name) });
  }
  return errors;
}

/**
 * The fields whose error is a conflict over `repo` between Additional and
 * Excluded repositories (SET-35), which removing `repo` from either list
 * resolves. Names are compared without regard to case.
 */
export function conflictFields(errors: Record<string, string>, repo: string): string[] {
  const r = repo.toLowerCase();
  const conflict = (m: string | undefined) =>
    m !== undefined && (m.toLowerCase() === MESSAGES.exclusionIsAdditional(r).toLowerCase() || m.toLowerCase() === MESSAGES.repoIsExcluded(r).toLowerCase());
  return Object.keys(errors).filter((f) => conflict(errors[f]));
}

/** Result of POST /api/credentials/:kind/check (SET-2, SET-28). */
export const CheckResult = z.object({
  ok: z.boolean(),
  code: z.enum(["ok", "not_accepted", "expired", "permission", "leaked", "permission_denied", "no_credits", "unreachable", "error"]),
  login: z.string().optional(),
  expiresAt: z.string().optional(),
  permission: z.string().optional(),
});
export type CheckResult = z.infer<typeof CheckResult>;

/**
 * POST /api/setup: Warm Welcome's button (WEL-4). With a Gemini key, typed here
 * or already saved, setup finishes with Gemini; with none, with basic ranking.
 */
export const SetupRequest = z.object({
  credentials: z.object({ gemini_key: z.string().max(500).optional() }).default({}),
});
export type SetupRequest = z.infer<typeof SetupRequest>;

/** The check result for a typed key; with ok: false nothing was saved (WEL-4). */
export const SetupResponse = z.object({
  ok: z.boolean(),
  results: z.object({ gemini_key: CheckResult.optional() }),
  /** How the developer's items are now ranked, when ok. */
  rankingAgent: RankingChoice.optional(),
});
export type SetupResponse = z.infer<typeof SetupResponse>;

/**
 * The text shown under a credential field after Validate (SET-28). A success
 * names the agent, a failure the company, as the Gemini rows always have.
 */
export function checkMessage(kind: CredentialKind, r: CheckResult): string {
  const agent = agentForKind(kind);
  if (!agent) {
    switch (r.code) {
      case "ok": return `Validated just now · Reading GitHub as @${r.login}`;
      case "not_accepted": return "GitHub didn't accept this token. Check that you copied it correctly.";
      case "expired": return `This token expired on ${r.expiresAt ? new Date(r.expiresAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "an earlier date"}. Create a new one.`;
      case "permission": return `This token can't read ${r.permission ?? "issues"}. Give it read access to issues, PRs and metadata.`;
      case "unreachable": return "Couldn't reach GitHub. Check your connection and try again.";
      default: return "Something went wrong on our side. Try again.";
    }
  }
  const { name, vendor, console: where } = AGENT_INFO[agent];
  switch (r.code) {
    case "ok": return `Validated just now · ${name} accepted this key`;
    case "not_accepted": return `${vendor} didn't accept this API key. Check that you copied all of it.`;
    case "leaked": return `${vendor} has disabled this key because it was reported as leaked. Create a new one.`;
    case "permission_denied": return agent === "gemini"
      ? "This key can't use the Gemini API. Create a key in Google AI Studio."
      : `This key can't use the model Gitilizer uses. Check its restrictions in ${where}.`;
    case "no_credits": return `This key works, but its account has no credits left. Add credits in ${where}.`;
    case "unreachable": return `Couldn't reach ${vendor}. Check your connection and try again.`;
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
