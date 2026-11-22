// Review requests to the developer's teams (PRD SET-51 to SET-56, design: Teams).
// The Gitilizer app can't read a team, or list a developer's teams, in an
// organization where it isn't installed, so everything here uses searches,
// which work everywhere (design D-28).
import type { FindTeamsResponse, FoundTeam } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import { log } from "./log.ts";
import { GitHubProblem, type GitHubApi } from "./github/types.ts";

/** Teams in one search (design D-27): 8 joined with OR were tested against GitHub on 2026-11-22. */
export const TEAMS_PER_SEARCH = 8;

/**
 * The search for a batch of teams: `base` as in the other searches, `scope` the exclusions or a group of
 * repositories. OR needs GitHub's advanced search (design D-27).
 */
export function teamQuery(base: string, teams: string[], scope = ""): string {
  return `is:pull-request ${base} (${teams.map((t) => `team-review-requested:${t}`).join(" OR ")})${scope}`;
}

/** The developer's teams in batches for the search. */
export function teamBatches(teams: string[]): string[][] {
  const out: string[][] = [];
  for (let i = 0; i < teams.length; i += TEAMS_PER_SEARCH) out.push(teams.slice(i, i + TEAMS_PER_SEARCH));
  return out;
}

/**
 * Checks one team (SET-52): GitHub refuses a search naming a team it doesn't know, or one the connection can't
 * see, and answers a real team even when no PR asks it. The organization's avatar comes from its account.
 * Throws GitHubProblem when GitHub can't answer.
 */
export async function lookUpTeam(gh: GitHubApi, name: string): Promise<{ status: "ok" | "not_found"; avatarUrl: string | null }> {
  try {
    await gh.search(`is:pull-request team-review-requested:${name}`, 1);
  } catch (e) {
    if (e instanceof GitHubProblem && e.code === "invalid_team") return { status: "not_found", avatarUrl: null };
    throw e;
  }
  let avatarUrl: string | null = null;
  try {
    const org = await gh.user(name.split("/")[0]);
    if (org.exists) avatarUrl = org.avatarUrl;
  } catch {
    // The avatar is only decoration: a team icon stands in for it.
  }
  return { status: "ok", avatarUrl };
}

async function record(ctx: Ctx, userId: string, name: string, r: { status: string; avatarUrl: string | null }) {
  await ctx.db.query(
    `update teams set status = $3, avatar_url = coalesce($4, avatar_url), checked_at = now() where user_id = $1 and name = $2`,
    [userId, name, r.status, r.avatarUrl],
  );
}

/**
 * Checks the developer's teams that are still `checking`, such as one saved before its check answered, and
 * returns the teams to search: those GitHub knows. A team that is `ok` isn't checked again, to save searches.
 */
export async function checkTeams(ctx: Ctx, gh: GitHubApi, userId: string): Promise<string[]> {
  const rows = await ctx.db.query(`select name, status from teams where user_id = $1 order by position, name`, [userId]);
  const ok: string[] = [];
  for (const r of rows) {
    let status = r.status as string;
    if (status === "checking") {
      try {
        const found = await lookUpTeam(gh, r.name);
        await record(ctx, userId, r.name, found);
        status = found.status;
      } catch (e) {
        // GitHub couldn't answer: the team keeps its state and is checked at the next scan (SET-52).
        if (e instanceof GitHubProblem && (e.code === "unavailable" || e.code === "unexpected")) continue;
        throw e;
      }
    }
    if (status === "ok") ok.push(r.name);
  }
  return ok;
}

/**
 * GitHub refused a search for several teams: one of them is no longer one it knows. Checks each one, records
 * those it refuses as `not_found`, and returns the rest.
 */
export async function recheckTeams(ctx: Ctx, gh: GitHubApi, userId: string, teams: string[]): Promise<string[]> {
  const ok: string[] = [];
  for (const name of teams) {
    const found = await lookUpTeam(gh, name);
    if (found.status === "not_found") {
      await record(ctx, userId, name, found);
      log.info("scan", "a team GitHub no longer knows", { user: userId });
    } else ok.push(name);
  }
  return ok;
}

/**
 * The developer's team to name on an item (LIST-3, LIST-21): of the teams the PR asks for review, the first of
 * the developer's in alphabetical order, as "@org/slug". Null when the snapshot names none of them.
 */
export function teamHandle(owner: string, requested: { slug?: string }[] | null | undefined, mine: string[]): string | null {
  const own = new Set(mine.map((t) => t.toLowerCase()));
  const asked = (requested ?? []).map((t) => `${owner}/${t.slug}`).filter((t) => own.has(t.toLowerCase()));
  if (!asked.length) return null;
  asked.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const original = mine.find((t) => t.toLowerCase() === asked[0].toLowerCase()) ?? asked[0];
  return `@${original}`;
}

/** Searches "Find my teams" needs before it starts: the two searches and one team's two counts. */
const MIN_SEARCHES = 6;
/** At most this many teams get the two counts (SET-54). */
const MAX_CHECKED = 10;
/** Team-only PRs read for their teams. */
const MAX_PRS = 100;

async function inParallel<T, R>(items: T[], n: number, f: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await f(items[i]);
    }
  }));
  return out;
}

/**
 * "Find my teams" (SET-54, design: Teams). Finds the open PRs that ask the developer for review only through a
 * team, the teams they name, and which of those are the developer's: a team that is the only one on such a PR,
 * or one every open PR of which also asks the developer. Nothing is stored.
 */
export async function findTeams(gh: GitHubApi, login: string): Promise<FindTeamsResponse> {
  try {
    if ((await gh.searchesLeft()) < MIN_SEARCHES) return { status: "busy" };
    const base = "is:pull-request is:open archived:false";
    const all = await gh.search(`${base} review-requested:${login}`, MAX_PRS * 3);
    const personal = new Set((await gh.search(`${base} user-review-requested:${login}`, MAX_PRS * 3)).hits.map((h) => h.key));
    const teamOnly = all.hits.filter((h) => !personal.has(h.key)).slice(0, MAX_PRS);

    const counts = new Map<string, { prs: number; alone: boolean }>();
    const asked = await inParallel(teamOnly, 10, async (h) => {
      try {
        return { owner: h.repo.split("/")[0], teams: (await gh.reviewRequests(h.repo, h.number)).teams };
      } catch (e) {
        if (e instanceof GitHubProblem && e.code === "not_found") return { owner: "", teams: [] as string[] };
        throw e;
      }
    });
    for (const a of asked) {
      for (const slug of a.teams) {
        const name = `${a.owner}/${slug}`;
        const c = counts.get(name) ?? { prs: 0, alone: false };
        c.prs++;
        if (a.teams.length === 1) c.alone = true;
        counts.set(name, c);
      }
    }
    const byPrs = [...counts.entries()].sort((a, b) => b[1].prs - a[1].prs || a[0].localeCompare(b[0]));
    const budget = Math.min(MAX_CHECKED, Math.floor((await gh.searchesLeft()) / 2));
    const uncertain = byPrs.filter(([, c]) => !c.alone).slice(0, budget).map(([name]) => name);
    // The checks run a few at a time, each team's two counts together, so a long list doesn't take long. They
    // count closed PRs too: a team with few open PRs may have only ones that also ask the developer.
    const notMine = new Set((await inParallel(uncertain, 3, async (name) => {
      try {
        const [a, b] = await Promise.all([
          gh.search(`is:pull-request team-review-requested:${name}`, 1),
          gh.search(`is:pull-request team-review-requested:${name} review-requested:${login}`, 1),
        ]);
        return a.total > b.total ? name : null; // a PR asks this team and not the developer: not theirs
      } catch (e) {
        if (e instanceof GitHubProblem && e.code === "invalid_team") return name;
        throw e;
      }
    })).filter((n): n is string => n !== null));
    // Teams the searches left couldn't check are shown: the developer knows their own teams.
    const found: FoundTeam[] = byPrs.filter(([name]) => !notMine.has(name)).map(([name, c]) => ({ name, prs: c.prs, avatarUrl: null }));
    const orgs = [...new Set(found.map((t) => t.name.split("/")[0]))];
    const avatars = new Map(await inParallel(orgs, 5, async (org) => {
      try {
        const u = await gh.user(org);
        return [org, u.exists ? u.avatarUrl : null] as const;
      } catch {
        return [org, null] as const;
      }
    }));
    for (const t of found) t.avatarUrl = avatars.get(t.name.split("/")[0]) ?? null;
    return { status: "ok", teams: found };
  } catch (e) {
    if (e instanceof GitHubProblem && e.code === "rate_limited") return { status: "busy" };
    if (e instanceof GitHubProblem && (e.code === "unavailable" || e.code === "unexpected")) return { status: "unreachable" };
    throw e;
  }
}
