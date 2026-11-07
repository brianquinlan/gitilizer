// Excluded repositories and owners (PRD SET-33 to SET-37; design: Scanner, D-13).
import { beforeAll, describe, expect, it } from "vitest";
import { conflictFields, exclusionErrors, exclusionNote, parseExclusion, type ItemRow } from "@gitilizer/shared";
import { buildApp } from "../src/app.ts";
import type { Ctx } from "../src/context.ts";
import { exclusionQualifiers, exclusionsFrom, isExcluded, removeExcluded, type Exclusions } from "../src/exclusions.ts";
import { fixtureId } from "../src/github/fixtures.ts";
import { listRows } from "../src/list.ts";
import { discoveryQueries, scan } from "../src/scanner.ts";
import { Scheduler } from "../src/scheduler.ts";
import { addUser, makeCtx, type RecordingHub } from "./helpers.ts";

describe("parsing and checking exclusions (SET-33, SET-35)", () => {
  it("takes owner/name, an owner, an @, or a GitHub URL for either", () => {
    expect(parseExclusion("northstar/web")).toEqual({ kind: "repo", name: "northstar/web" });
    expect(parseExclusion(" @oldcorp ")).toEqual({ kind: "owner", name: "oldcorp" });
    expect(parseExclusion("@oldcorp/monolith")).toEqual({ kind: "repo", name: "oldcorp/monolith" });
    expect(parseExclusion("https://github.com/oldcorp")).toEqual({ kind: "owner", name: "oldcorp" });
    expect(parseExclusion("https://github.com/oldcorp/")).toEqual({ kind: "owner", name: "oldcorp" });
    expect(parseExclusion("https://github.com/orgs/oldcorp/repositories")).toEqual({ kind: "owner", name: "oldcorp" });
    expect(parseExclusion("github.com/oldcorp/monolith/issues/3")).toEqual({ kind: "repo", name: "oldcorp/monolith" });
    expect(parseExclusion("not an owner")).toBeNull();
    expect(parseExclusion("https://gitlab.com/a/b")).toBeNull();
  });

  it("refuses duplicates, the limit, and a repository that is also an additional repository", () => {
    expect(exclusionErrors(["northstar", "NorthStar", "northstar/web", "bad name"], ["northstar/web"])).toEqual([
      { field: "exclusion-NorthStar", message: "NorthStar is already excluded." },
      { field: "exclusion-northstar-web", message: "northstar/web is one of your additional repositories. Remove it there first to exclude it." },
      { field: "add-exclusion", message: "Enter a repository as owner/name, an owner's name, or paste a GitHub URL." },
    ]);
    // A repository whose owner is also excluded is allowed (SET-33).
    expect(exclusionErrors(["northstar", "northstar/api"], [])).toEqual([]);
    expect(exclusionErrors(Array.from({ length: 26 }, (_, i) => `o${i}`), [])[0].field).toBe("add-exclusion");
  });

  it("finds the conflict errors that removing a repository from either list resolves (SET-35)", () => {
    const errors = {
      "add-exclusion": "Northstar/Web is one of your additional repositories. Remove it there first to exclude it.",
      "exclusion-northstar-web": "northstar/web is one of your additional repositories. Remove it there first to exclude it.",
      "add-repository": "northstar/web is excluded. Remove it from Excluded repositories first to follow it.",
      "repo-northstar-web": "A prioritization prompt can be at most 500 characters. This one has 501.",
      "add-collaborator": "jordanlee is already a collaborator.",
    };
    expect(conflictFields(errors, "northstar/web")).toEqual(["add-exclusion", "exclusion-northstar-web", "add-repository"]);
    expect(conflictFields(errors, "northstar/api")).toEqual([]);
  });

  it("names the additional repositories an excluded owner owns, alphabetically (SET-35, SET-36)", () => {
    const text = (parts: ReturnType<typeof exclusionNote>["parts"]) => parts.map((p) => (typeof p === "string" ? p : `[${p.repo}]`)).join("");
    expect(text(exclusionNote("oldcorp", "Organization", ["northstar/web"]).parts)).toBe("Every repository oldcorp owns.");
    expect(text(exclusionNote("northstar", "Organization", ["northstar/web"]).parts))
      .toBe("Every repository northstar owns, except [northstar/web], which is an additional repository.");
    expect(text(exclusionNote("northstar", "Organization", ["northstar/web", "NorthStar/api", "northstar/cli"]).parts))
      .toBe("Every repository northstar owns, except [NorthStar/api], [northstar/cli] and [northstar/web], which are additional repositories.");
    expect(text(exclusionNote("samkim", "User", []).parts))
      .toBe("Every repository samkim owns. Issues and PRs samkim opens elsewhere still appear.");
  });
});

describe("discovery with exclusions (SCAN-1, SET-34, SET-35)", () => {
  const ex: Exclusions = { repos: ["oldcorp/monolith"], owners: ["northstar", "samkim"], excepted: ["northstar/web"] };

  it("puts the exclusions on the personal searches only", () => {
    const qs = discoveryQueries("maya", ["northstar/web", "acme/api"], null, { ...ex, excepted: [] });
    for (const q of qs.slice(0, 5)) expect(q.q.endsWith(" -repo:oldcorp/monolith -user:northstar -user:samkim")).toBe(true);
    expect(qs.slice(5).map((q) => q.q)).toEqual(["is:open archived:false repo:northstar/web", "is:open archived:false repo:acme/api"]);
  });

  it("searches an additional repository inside an excluded owner for every reason as well", () => {
    const qs = discoveryQueries("maya", ["northstar/web", "acme/api"], null, ex);
    expect(qs.map((q) => q.reason)).toEqual([
      "review_requested", "assigned", "mentioned", "created", "commented",
      "review_requested", "assigned", "mentioned", "created", "commented",
      "additional_repo", "additional_repo",
    ]);
    expect(qs[6].q).toBe("is:open archived:false assignee:maya repo:northstar/web");
    expect(qs[7].handle).toBe("@maya");
    expect(qs.slice(5, 10).some((q) => q.q.includes(" -"))).toBe(false); // never mixed with exclusions (D-13)
  });

  it("lets an additional repository win over an exclusion of the same repository, which only a rename can cause (SET-35)", () => {
    const row = (name: string, kind: "repo" | "owner") => ({ name, kind, github_id: 1, owner_type: null, status: "ok" as const, avatar_url: null });
    expect(exclusionsFrom([row("Northstar/Web", "repo"), row("oldcorp/monolith", "repo"), row("northstar", "owner")], ["northstar/web"]))
      .toEqual({ repos: ["oldcorp/monolith"], owners: ["northstar"], excepted: ["northstar/web"] });
  });

  it("decides which repositories are hidden", () => {
    expect(isExcluded("OldCorp/Monolith", ex)).toBe(true);
    expect(isExcluded("northstar/api", ex)).toBe(true);
    expect(isExcluded("NorthStar/Web", ex)).toBe(false);
    expect(isExcluded("oldcorp/other", ex)).toBe(false);
    expect(exclusionQualifiers({ repos: [], owners: [], excepted: [] })).toBe("");
  });
});

describe("scanning with exclusions (SET-34 to SET-37)", () => {
  let ctx: Ctx;
  let hub: RecordingHub;
  const userId = "u1";
  let before: ItemRow[];
  const exclude = async (name: string, kind: "repo" | "owner", position: number) =>
    ctx.db.query(`insert into excluded_repos (user_id, name, kind, position) values ($1, $2, $3, $4)`, [userId, name, kind, position]);

  beforeAll(async () => {
    ({ ctx, hub } = await makeCtx());
    await addUser(ctx, userId);
    await ctx.db.query(`insert into additional_repos (user_id, full_name) values ($1, 'dart-lang/http')`, [userId]);
    await scan(ctx, userId, "test");
    before = await listRows(ctx.db, userId);
  });

  it("takes excluded items out of the list and the Icebox as soon as they are saved (SET-37, LIVE-25, ICE-11)", async () => {
    const iceboxed = before.find((r) => r.repo === "googleapis/google-cloud-dart")!;
    await ctx.db.query(`update user_items set status = 'iceboxed', iceboxed_at = now() where item_key = $1`, [iceboxed.key]);
    await exclude("dart-lang", "owner", 0);
    await exclude("googleapis/google-cloud-dart", "repo", 1);
    hub.lists.length = 0;
    const n = await removeExcluded(ctx, userId);
    const gone = before.filter((r) => r.repo === "googleapis/google-cloud-dart" || (r.repo.startsWith("dart-lang/") && r.repo !== "dart-lang/http"));
    expect(gone.length).toBeGreaterThan(0);
    expect(n).toBe(gone.length);
    expect(hub.lists.flatMap((e) => e.removals)).toEqual(expect.arrayContaining(gone.map((r) => ({ key: r.key, reason: "excluded" }))));
    expect((await ctx.db.one(`select status, gone_reason from user_items where item_key = $1`, [iceboxed.key])))
      .toEqual({ status: "gone", gone_reason: "excluded" });
  });

  it("doesn't find them again, and keeps the reasons of an additional repository inside an excluded owner (SET-35)", async () => {
    await scan(ctx, userId, "manual");
    const after = await listRows(ctx.db, userId);
    expect(after.some((r) => r.repo === "googleapis/google-cloud-dart")).toBe(false);
    expect(after.filter((r) => r.repo.startsWith("dart-lang/")).every((r) => r.repo === "dart-lang/http")).toBe(true);
    const http = before.filter((r) => r.repo === "dart-lang/http");
    expect(http.some((r) => r.reasons.some((x) => x !== "additional_repo"))).toBe(true);
    for (const r of http) expect(after.find((x) => x.key === r.key)?.reasons).toEqual(r.reasons);
  });

  it("records what GitHub says about each exclusion, by ID (SET-36)", async () => {
    const rows = await ctx.db.query(`select name, kind, github_id::text as github_id, owner_type, status, avatar_url from excluded_repos order by position`);
    expect(rows).toEqual([
      { name: "dart-lang", kind: "owner", github_id: String(fixtureId("dart-lang")), owner_type: "Organization", status: "ok", avatar_url: "https://github.com/dart-lang.png?size=64" },
      // A repository records its owner's avatar, as GitHub shows a repository.
      { name: "googleapis/google-cloud-dart", kind: "repo", github_id: String(fixtureId("googleapis/google-cloud-dart")), owner_type: "Organization", status: "ok", avatar_url: "https://github.com/googleapis.png?size=64" },
    ]);
  });

  it("follows a rename by ID, and keeps one GitHub can't find without letting it break the scan (SET-36)", async () => {
    await ctx.db.query(`update excluded_repos set name = 'dart-lang-old' where name = 'dart-lang'`);
    await exclude("no-such-owner-zq9x", "owner", 2);
    const r = await scan(ctx, userId, "manual");
    expect(r.outcome).toBe("ok");
    const rows = await ctx.db.query(`select name, status from excluded_repos order by position`);
    expect(rows).toEqual([
      { name: "dart-lang", status: "ok" },
      { name: "googleapis/google-cloud-dart", status: "ok" },
      { name: "no-such-owner-zq9x", status: "not_found" },
    ]);
  });

  it("brings the items back once the exclusion is removed (SET-37)", async () => {
    await ctx.db.query(`delete from excluded_repos where user_id = $1`, [userId]);
    await scan(ctx, userId, "manual");
    const keys = new Set((await listRows(ctx.db, userId)).filter((r) => r.status === "active").map((r) => r.key));
    for (const r of before.filter((x) => x.repo === "googleapis/google-cloud-dart" && x.status === "active")) expect(keys.has(r.key)).toBe(true);
  });
});

describe("looking up exclusions between full scans, and renames (SET-35, SET-36)", () => {
  let ctx: Ctx;
  const userId = "u1";

  beforeAll(async () => {
    ({ ctx } = await makeCtx());
    await addUser(ctx, userId);
    await ctx.db.query(`insert into additional_repos (user_id, full_name) values ($1, 'dart-lang/http')`, [userId]);
    await scan(ctx, userId, "test");
  });

  it("looks up a new exclusion on an incremental scan, such as one saved while a scan ran", async () => {
    await ctx.db.query(`insert into excluded_repos (user_id, name, kind) values ($1, 'googleapis', 'owner')`, [userId]);
    expect((await scan(ctx, userId, "test", { full: false })).kind).toBe("incremental");
    expect(await ctx.db.one(`select status, github_id::text as id, owner_type from excluded_repos where name = 'googleapis'`))
      .toEqual({ status: "ok", id: String(fixtureId("googleapis")), owner_type: "Organization" });
  });

  it("removes an excluded repository that a rename makes the same as an additional repository", async () => {
    // Excluded under an old name that GitHub now gives to dart-lang/http.
    await ctx.db.query(
      `insert into excluded_repos (user_id, name, kind, github_id, status, checked_at) values ($1, 'dart-lang/http-old', 'repo', $2, 'ok', now())`,
      [userId, fixtureId("dart-lang/http")],
    );
    await scan(ctx, userId, "manual");
    expect(await ctx.db.query(`select name from excluded_repos order by name`)).toEqual([{ name: "googleapis" }]);
    expect((await listRows(ctx.db, userId)).some((r) => r.repo === "dart-lang/http" && r.status === "active")).toBe(true);
  });
});

describe("exclusions over HTTP (SET-33 to SET-37)", () => {
  let ctx: Ctx;
  let app: ReturnType<typeof buildApp>;
  let cookie = "";
  const call = (method: string, url: string, payload?: unknown) =>
    app.inject({ method: method as any, url, headers: { "x-gitilizer": "1", cookie }, payload: payload as any });

  beforeAll(async () => {
    ({ ctx } = await makeCtx());
    app = buildApp(ctx, new Scheduler(ctx), null);
    const r = await app.inject({ method: "POST", url: "/api/auth/dev", headers: { "x-gitilizer": "1" }, payload: { name: "Maya", email: "maya@example.com" } });
    cookie = String(r.headers["set-cookie"]).split(";")[0];
  });

  it("looks up an exclusion as soon as it is added, before saving (SET-36)", async () => {
    // Without a saved token it can't look yet: "Checking…" until the scan after saving.
    expect((await call("POST", "/api/exclusions/check", { name: "@dart-lang" })).json())
      .toEqual({ name: "dart-lang", kind: "owner", status: "checking", ownerType: null, avatarUrl: null });
    await call("PUT", "/api/settings", {
      additionalRepos: [], excludedRepos: [], collaborators: [], customPrompt: null, rerank: false,
      credentials: { github_pat: "ghp_whatever-123", gemini_key: "AIza-whatever" },
    });
    expect((await call("POST", "/api/exclusions/check", { name: "https://github.com/dart-lang" })).json())
      .toEqual({ name: "dart-lang", kind: "owner", status: "ok", ownerType: "Organization", avatarUrl: "https://github.com/dart-lang.png?size=64" });
    expect((await call("POST", "/api/exclusions/check", { name: "DART-LANG/HTTP" })).json())
      .toEqual({ name: "dart-lang/http", kind: "repo", status: "ok", ownerType: "Organization", avatarUrl: "https://github.com/dart-lang.png?size=64" });
    expect((await call("POST", "/api/exclusions/check", { name: "no-such-owner-zq9x" })).json())
      .toMatchObject({ status: "not_found" });
  });

  it("saves exclusions and returns them, and refuses a conflict with an additional repository (SET-27, SET-35)", async () => {
    const ok = await call("PUT", "/api/settings", {
      additionalRepos: [{ fullName: "dart-lang/http", prioritizationPrompt: "" }],
      excludedRepos: ["@dart-lang", "googleapis/google-cloud-dart"], collaborators: [], customPrompt: null, rerank: false,
    });
    expect(ok.statusCode).toBe(200);
    expect((await call("GET", "/api/settings")).json().excludedRepos.map((e: any) => [e.name, e.kind])).toEqual([
      ["dart-lang", "owner"], ["googleapis/google-cloud-dart", "repo"],
    ]);
    const bad = await call("PUT", "/api/settings", {
      additionalRepos: [{ fullName: "dart-lang/http", prioritizationPrompt: "" }],
      excludedRepos: ["dart-lang/HTTP"], collaborators: [], customPrompt: null, rerank: false,
    });
    expect(bad.statusCode).toBe(422);
    expect(bad.json().errors).toEqual([
      { field: "exclusion-dart-lang-HTTP", message: "dart-lang/HTTP is one of your additional repositories. Remove it there first to exclude it." },
    ]);
  });
});
