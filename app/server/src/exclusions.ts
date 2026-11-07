// Excluded repositories and owners (PRD SET-33 to SET-37; design: Scanner, D-13).
import type { RemovalReason } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import type { Db } from "./db.ts";
import { GitHubProblem, type GitHubApi } from "./github/types.ts";
import { updateUnranked } from "./jobs.ts";
import { publish } from "./list.ts";

export type ExclusionRow = {
  name: string; kind: "repo" | "owner"; github_id: string | number | null; owner_type: string | null;
  status: "checking" | "ok" | "not_found"; avatar_url: string | null;
};

/** What a developer's exclusions mean for the scanner, with names in lowercase. */
export type Exclusions = {
  /** Excluded repositories, "owner/name". */
  repos: string[];
  /** Excluded owners. */
  owners: string[];
  /** Additional repositories that an excluded owner owns: they still appear (SET-35). */
  excepted: string[];
};

export const NO_EXCLUSIONS: Exclusions = { repos: [], owners: [], excepted: [] };

export async function exclusionRows(db: Db, userId: string): Promise<ExclusionRow[]> {
  return db.query(
    `select name, kind, github_id, owner_type, status, avatar_url from excluded_repos where user_id = $1 order by position, name`, [userId],
  );
}

/**
 * The exclusions that apply. One GitHub couldn't find is left out (SET-36): it
 * hides nothing, because the token can't read it anyway. `additionalRepos` are
 * the additional repositories, which win over an excluded owner.
 */
export function exclusionsFrom(rows: ExclusionRow[], additionalRepos: string[]): Exclusions {
  const live = rows.filter((r) => r.status !== "not_found");
  const owners = live.filter((r) => r.kind === "owner").map((r) => r.name.toLowerCase());
  const additional = new Set(additionalRepos.map((r) => r.toLowerCase()));
  return {
    // An additional repository wins over an exclusion of the same repository too, which only a rename can cause (SET-35).
    repos: live.filter((r) => r.kind === "repo").map((r) => r.name.toLowerCase()).filter((r) => !additional.has(r)),
    owners,
    excepted: additionalRepos.map((r) => r.toLowerCase()).filter((r) => owners.includes(r.split("/")[0])),
  };
}

/** Whether items in `repo` ("owner/name") are hidden (SET-34, SET-35). */
export function isExcluded(repo: string, ex: Exclusions): boolean {
  const r = repo.toLowerCase();
  if (ex.excepted.includes(r)) return false;
  return ex.repos.includes(r) || ex.owners.includes(r.split("/")[0]);
}

/** The negated qualifiers for the personal searches (design: Scanner, step 2). */
export function exclusionQualifiers(ex: Exclusions): string {
  return [...ex.repos.map((r) => ` -repo:${r}`), ...ex.owners.map((o) => ` -user:${o}`)].join("");
}

/** What GitHub says about one exclusion (SET-36). Throws GitHubProblem if GitHub can't be reached. */
export async function lookUpExclusion(
  gh: GitHubApi, kind: "repo" | "owner", ref: { name: string; id?: number | null },
): Promise<{ status: "ok" | "not_found"; name: string; id: number | null; ownerType: "Organization" | "User" | null; avatarUrl: string | null }> {
  if (kind === "repo") {
    // By ID once known: GitHub's ID survives a rename, and its answer has the current name.
    const info = ref.id ? await gh.repoById(ref.id) : await gh.repo(ref.name);
    // A repository shows its owner's avatar, as on GitHub (SET-36).
    if (info.access === "ok" || info.access === "archived") return { status: "ok", name: info.fullName, id: info.id, ownerType: info.ownerType, avatarUrl: info.ownerAvatarUrl };
    return { status: "not_found", name: ref.name, id: ref.id ?? null, ownerType: null, avatarUrl: null };
  }
  const a = await gh.account(ref.id ? { id: ref.id } : { login: ref.name });
  if (!a.exists) return { status: "not_found", name: ref.name, id: ref.id ?? null, ownerType: null, avatarUrl: null };
  return { status: "ok", name: a.login, id: a.id, ownerType: a.type, avatarUrl: a.avatarUrl };
}

/**
 * Looks up exclusions, by ID where GitHub has found them before (design:
 * Scanner, step 1): every one on a full scan (`all`), and otherwise only those
 * never looked up, such as one saved while a scan ran. Records the current
 * name, so a rename is followed and a new account that takes an old name isn't
 * excluded (SET-36). If GitHub can't be reached, an exclusion keeps its last
 * known state. An excluded repository that a rename makes the same as an
 * additional repository is removed: the additional repository wins (SET-35).
 */
export async function checkExclusions(ctx: Ctx, gh: GitHubApi, userId: string, all = true): Promise<void> {
  const rows = await ctx.db.query<ExclusionRow & { checked_at: string | null }>(
    `select name, kind, github_id, owner_type, status, avatar_url, checked_at from excluded_repos where user_id = $1 order by position, name`, [userId],
  );
  for (const r of rows.filter((x) => all || x.checked_at === null)) {
    let found;
    try {
      found = await lookUpExclusion(gh, r.kind, { name: r.name, id: r.github_id === null ? null : Number(r.github_id) });
    } catch (e) {
      if (e instanceof GitHubProblem && (e.code === "unavailable" || e.code === "unexpected" || e.code === "sso" || e.code === "org_blocks_token")) continue;
      throw e;
    }
    const name = found.name;
    if (r.kind === "repo" && await ctx.db.one(`select 1 from additional_repos where user_id = $1 and lower(full_name) = lower($2)`, [userId, name])) {
      await ctx.db.query(`delete from excluded_repos where user_id = $1 and name = $2`, [userId, r.name]);
      continue;
    }
    if (name !== r.name) {
      const clash = await ctx.db.one(`select 1 from excluded_repos where user_id = $1 and lower(name) = lower($2) and name <> $3`, [userId, name, r.name]);
      if (clash) { await ctx.db.query(`delete from excluded_repos where user_id = $1 and name = $2`, [userId, r.name]); continue; }
    }
    await ctx.db.query(
      `update excluded_repos set name = $3, status = $4, github_id = coalesce($5, github_id), owner_type = coalesce($6, owner_type),
         avatar_url = coalesce($7, avatar_url), checked_at = now() where user_id = $1 and name = $2`,
      [userId, r.name, name, found.status, found.id, found.ownerType, found.avatarUrl],
    );
  }
}

/**
 * Takes items in excluded repositories and owners out of the list and the
 * Icebox at once (SET-37, LIVE-25, ICE-11), and publishes the removals.
 */
export async function removeExcluded(ctx: Ctx, userId: string): Promise<number> {
  const db = ctx.db;
  const additional = (await db.query(`select full_name from additional_repos where user_id = $1`, [userId])).map((r) => r.full_name as string);
  const ex = exclusionsFrom(await exclusionRows(db, userId), additional);
  if (!ex.repos.length && !ex.owners.length) return 0;
  const rows = await db.query(`select item_key from user_items where user_id = $1 and status in ('active', 'iceboxed')`, [userId]);
  const removals: { key: string; reason: RemovalReason }[] = [];
  for (const r of rows) {
    const key = r.item_key as string;
    if (!isExcluded(key.split("#")[0], ex)) continue;
    await db.query(
      `update user_items set status = 'gone', gone_reason = 'excluded', gone_at = now(), iceboxed_at = null where user_id = $1 and item_key = $2`,
      [userId, key],
    );
    await db.query(
      `update rank_jobs set state = 'failed', error_code = 'gone', finished_at = now() where user_id = $1 and item_key = $2 and state = 'queued'`,
      [userId, key],
    );
    removals.push({ key, reason: "excluded" });
  }
  if (removals.length) {
    await publish(ctx, userId, [], removals);
    await updateUnranked(ctx, userId);
  }
  return removals.length;
}
