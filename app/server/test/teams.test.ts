// Review requests to the developer's teams (PRD SET-51 to SET-56, LIST-1, LIST-3, LIST-21, SCAN-1; design: Teams).
import type { FastifyInstance } from "fastify";
import { beforeAll, describe, expect, it } from "vitest";
import { MESSAGES, nextStepLabel, parseTeam, reasonLabel, teamControlId, teamOnly, type SettingsUpdate } from "@gitilizer/shared";
import { buildApp, settingsErrors } from "../src/app.ts";
import type { Ctx } from "../src/context.ts";
import { FixtureGitHub, type FixtureStore } from "../src/github/fixtures.ts";
import { classify } from "../src/github/octokit.ts";
import { GitHubProblem } from "../src/github/types.ts";
import { listRows } from "../src/list.ts";
import { scan } from "../src/scanner.ts";
import { Scheduler } from "../src/scheduler.ts";
import { findTeams, teamHandle } from "../src/teams.ts";
import { addUser, makeCtx } from "./helpers.ts";

const ECOSYSTEM = "dart-lang/dart-ecosystem-team";

describe("team names (SET-51)", () => {
  it("accepts org/team, @org/team and a team's URL", () => {
    expect(parseTeam(ECOSYSTEM)).toBe(ECOSYSTEM);
    expect(parseTeam(" @dart-lang/dart-ecosystem-team ")).toBe(ECOSYSTEM);
    expect(parseTeam("https://github.com/orgs/dart-lang/teams/dart-ecosystem-team/members")).toBe(ECOSYSTEM);
    expect(parseTeam("dart-lang")).toBeNull();
    expect(parseTeam("https://github.com/dart-lang/http")).toBeNull(); // a repository's URL, not a team's
    expect(parseTeam("a b/c")).toBeNull();
  });
  it("reports problems next to their fields (SET-27, SET-56)", () => {
    const s: SettingsUpdate = {
      additionalRepos: [], excludedRepos: [], collaborators: [], customPrompt: null, removeCredentials: [], rerank: false,
      teams: [{ name: ECOSYSTEM, prioritizationPrompt: "" }, { name: "Dart-Lang/Dart-Ecosystem-Team", prioritizationPrompt: "x".repeat(501) }, { name: "nope", prioritizationPrompt: "" }],
    };
    expect(settingsErrors(s)).toEqual([
      { field: teamControlId("Dart-Lang/Dart-Ecosystem-Team"), message: MESSAGES.teamDuplicate("Dart-Lang/Dart-Ecosystem-Team") },
      { field: teamControlId("Dart-Lang/Dart-Ecosystem-Team"), message: MESSAGES.repoPromptLength(501) },
      { field: "add-team", message: MESSAGES.teamFormat },
    ]);
  });
});

describe("the reason and the chip (LIST-3, LIST-21, LIST-42)", () => {
  const row = { repo: "dart-lang/tools", mentionHandle: null, teamHandle: "@dart-lang/dart-ecosystem-team" };
  it("names the team, after every personal reason", () => {
    expect(reasonLabel({ ...row, reasons: ["team_review_requested", "additional_repo"] })).toBe("Review requested from @dart-lang/dart-ecosystem-team");
    expect(reasonLabel({ ...row, reasons: ["commented", "team_review_requested"] })).toBe("Commented on by you");
    expect(reasonLabel({ ...row, teamHandle: null, reasons: ["team_review_requested"] })).toBe("Review requested from your team");
  });
  it("puts \"Team\" before a next step on the developer only through a team; anything personal wins", () => {
    expect(teamOnly({ reasons: ["team_review_requested", "additional_repo"] })).toBe(true);
    expect(teamOnly({ reasons: ["team_review_requested", "mentioned"] })).toBe(false);
    expect(teamOnly({ reasons: ["team_review_requested", "commented"] })).toBe(false);
    expect(teamOnly({ reasons: ["additional_repo"] })).toBe(false);
    expect(["review", "respond", "todo", "backlog", "waiting", "elsewhere", "not_yours"].map((s) => nextStepLabel(s as any, true)))
      .toEqual(["Team review", "Team respond", "Team to do", "Team backlog", "Waiting", "Elsewhere", "Not yours"]);
    expect(nextStepLabel("review")).toBe("Review");
  });
  it("names the developer's team the PR asks, first in alphabetical order", () => {
    const asked = [{ slug: "z-team" }, { slug: "dart-ecosystem-team" }, { slug: "someone-elses" }];
    expect(teamHandle("dart-lang", asked, ["dart-lang/z-team", "Dart-Lang/Dart-Ecosystem-Team"])).toBe("@Dart-Lang/Dart-Ecosystem-Team");
    expect(teamHandle("dart-lang", asked, ["googleapis/z-team"])).toBeNull();
    expect(teamHandle("dart-lang", null, [ECOSYSTEM])).toBeNull();
  });
});

describe("GitHub's answers about teams (design D-27, D-28)", () => {
  it("tells a team GitHub doesn't know from other failures", () => {
    const e = classify({ status: 422, message: "Validation Failed", response: { headers: {}, data: { message: "Validation Failed", errors: [{ message: "\"dart-lang/dart-ecosystem-teem\" is not a valid team name." }] } } });
    expect(e.code).toBe("invalid_team");
    expect(e.details.team).toBe("dart-lang/dart-ecosystem-teem");
    expect(classify({ status: 422, response: { headers: {}, data: { message: "Query must include 'is:issue' or 'is:pull-request'" } } }).code).toBe("unexpected");
  });
});

describe("teams in a scan, in Settings and in \"Find my teams\"", () => {
  let ctx: Ctx;
  let store: FixtureStore;
  const userId = "u1";

  beforeAll(async () => {
    ({ ctx, store } = await makeCtx());
    await addUser(ctx, userId);
  });

  it("searches teams with OR under advanced search, and refuses a team it doesn't know (fixture GitHub)", async () => {
    const gh = new FixtureGitHub(store);
    const one = await gh.search(`is:pull-request is:open team-review-requested:${ECOSYSTEM}`, 1000);
    const both = await gh.search(`is:pull-request is:open (team-review-requested:${ECOSYSTEM} OR team-review-requested:googleapis/cloud-sdk-librarian-team)`, 1000, { advanced: true });
    expect(one.total).toBeGreaterThan(0);
    expect(both.total).toBe(one.total + 1);
    await expect(gh.search("is:pull-request team-review-requested:dart-lang/nope", 1)).rejects.toMatchObject({ code: "invalid_team" });
    // Under advanced search, two repo: filters mean both (design D-27).
    expect((await gh.search("is:pull-request repo:dart-lang/tools repo:dart-lang/core", 1000, { advanced: true })).total).toBe(0);
    expect((await gh.search("is:pull-request (repo:dart-lang/tools OR repo:dart-lang/core)", 1000, { advanced: true })).total).toBeGreaterThan(0);
  });

  it("checks new teams, then finds the PRs that ask them, with the team's name (SET-52, LIST-1, LIST-3)", async () => {
    await ctx.db.query(
      `insert into teams (user_id, name, prioritization_prompt, position) values ($1, $2, 'small', 0), ($1, 'dart-lang/nope', '', 1)`,
      [userId, ECOSYSTEM],
    );
    expect(await scan(ctx, userId, "test")).toMatchObject({ outcome: "ok" });
    const teams = await ctx.db.query(`select name, status, avatar_url from teams where user_id = $1 order by position`, [userId]);
    expect(teams.map((t) => [t.name, t.status])).toEqual([[ECOSYSTEM, "ok"], ["dart-lang/nope", "not_found"]]);
    expect(teams[0].avatar_url).toContain("dart-lang");
    const rows = await listRows(ctx.db, userId);
    const team = rows.filter((r) => r.reasons.includes("team_review_requested"));
    expect(team.length).toBeGreaterThan(0);
    expect(team.every((r) => r.teamHandle === `@${ECOSYSTEM}`)).toBe(true);
    expect(rows.find((r) => r.key === "dart-lang/tools#2899")!.reasons).toContain("team_review_requested");
  });

  it("drops a removed team's PRs at the next full scan (SET-55)", async () => {
    const before = (await listRows(ctx.db, userId)).filter((r) => r.reasons.includes("team_review_requested")).length;
    await ctx.db.query(`delete from teams where user_id = $1`, [userId]);
    await scan(ctx, userId, "manual");
    const after = (await listRows(ctx.db, userId)).filter((r) => r.reasons.includes("team_review_requested")).length;
    expect(before).toBeGreaterThan(0);
    expect(after).toBe(0);
  });

  it("finds the developer's teams from the PRs that ask them only through a team (SET-54)", async () => {
    const r = await findTeams(new FixtureGitHub(store), store.login);
    expect(r.status).toBe("ok");
    if (r.status !== "ok") return;
    const eco = r.teams.find((t) => t.name === ECOSYSTEM)!;
    expect(eco).toMatchObject({ maybe: false });
    expect(eco.prs).toBeGreaterThan(0);
    expect(eco.avatarUrl).toContain("dart-lang");
    // The fixture account isn't in the librarian team, so its PR doesn't ask the developer at all.
    expect(r.teams.some((t) => t.name === "googleapis/cloud-sdk-librarian-team")).toBe(false);
  });

  it("says GitHub is busy when the searches are nearly used up", async () => {
    const gh = new FixtureGitHub(store);
    gh.searchesLeft = async () => 3;
    expect(await findTeams(gh, store.login)).toEqual({ status: "busy" });
    gh.searchesLeft = async () => { throw new GitHubProblem("unavailable", "down"); };
    expect(await findTeams(gh, store.login)).toEqual({ status: "unreachable" });
  });
});

describe("teams through the HTTP API (SET-51 to SET-55)", () => {
  let ctx: Ctx;
  let app: FastifyInstance;
  let cookie = "";
  const call = (method: string, url: string, payload?: unknown) =>
    app.inject({ method: method as any, url, headers: { "x-gitilizer": "1", cookie }, payload: payload as any });
  const page = { additionalRepos: [], excludedRepos: [], collaborators: [], customPrompt: null, rerank: false, rankingAgent: "basic" };

  beforeAll(async () => {
    ({ ctx } = await makeCtx());
    app = buildApp(ctx, new Scheduler(ctx), null);
    const r = await app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload: { name: "Ana", email: "ana@example.com" } });
    cookie = String(r.headers["set-cookie"]).split(";")[0];
    expect((await call("PUT", "/api/settings", { ...page, credentials: { github_pat: "ghp_x" } })).statusCode).toBe(200);
  });

  it("checks a team as soon as it is added", async () => {
    expect((await call("POST", "/api/teams/check", { name: `@${ECOSYSTEM}` })).json()).toMatchObject({ name: ECOSYSTEM, status: "ok" });
    expect((await call("POST", "/api/teams/check", { name: "dart-lang/nope" })).json()).toMatchObject({ status: "not_found", avatarUrl: null });
  });

  it("saves teams with their prompts, keeping the state of those that stay", async () => {
    const teams = [{ name: ECOSYSTEM, prioritizationPrompt: " small " }, { name: "googleapis/cloud-sdk-dart-team", prioritizationPrompt: "" }];
    expect((await call("PUT", "/api/settings", { ...page, teams })).statusCode).toBe(200);
    const saved = (await call("GET", "/api/settings")).json().teams;
    expect(saved.map((t: any) => [t.name, t.prioritizationPrompt])).toEqual([[ECOSYSTEM, "small"], ["googleapis/cloud-sdk-dart-team", ""]]);
    await ctx.db.query(`update teams set status = 'ok' where name = $1`, [ECOSYSTEM]);
    expect((await call("PUT", "/api/settings", { ...page, teams: teams.slice(0, 1) })).statusCode).toBe(200);
    const kept = (await call("GET", "/api/settings")).json().teams;
    expect(kept).toHaveLength(1);
    expect(kept[0]).toMatchObject({ name: ECOSYSTEM, prioritizationPrompt: "small", status: "ok" });
    expect((await call("PUT", "/api/settings", { ...page, teams: [{ name: "nope", prioritizationPrompt: "" }] })).statusCode).toBe(422);
  });

  it("finds teams", async () => {
    const r = (await call("POST", "/api/teams/find")).json();
    expect(r.status).toBe("ok");
    expect(r.teams.map((t: any) => t.name)).toContain(ECOSYSTEM);
  });
});
