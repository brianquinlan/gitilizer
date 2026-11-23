// Settings (PRD "Settings", SET-1..60). Figma: "Settings" and the other "Settings · …" frames, one for each section,
// "Settings · Errors" and its section variants, and "Settings · Ranking agent card · Basic ranking".
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AGENT_INFO, BASIC_INFO, GITHUB_CONNECT_ID, MAX_COLLABORATORS, MAX_EXCLUSIONS, MAX_PROMPT_LENGTH, MAX_REPO_PROMPT_LENGTH, MAX_REPOS, MAX_TEAMS, MESSAGES, PROMPT_COUNT_FROM, RankingAgent,
  choiceName, conflictFields, credentialControlId, exclusionControlId, exclusionNote, parseExclusion, parseLogin, parseRepo, parseTeam, repoControlId, teamControlId,
  type AdditionalRepo, type AgentKeyKind, type Collaborator, type CredentialKind, type CredentialStatus, type ExcludedRepo,
  type FieldError, type FindTeamsResponse, type FoundTeam, type Me, type RankingChoice, type SettingsResponse, type Team,
} from "@gitilizer/shared";
import { api, ApiError } from "../api.ts";
import { AgentPicker } from "../components/AgentPicker.tsx";
import { DOCS_URL } from "../components/Chrome.tsx";
import { CredentialField, type Check } from "../components/CredentialField.tsx";
import { CHIPS, GitHubCard, useConnectResult, useGitHubConnection } from "../components/GitHubConnection.tsx";
import { Preferences } from "../components/Preferences.tsx";
import {
  AlertIcon, CheckIcon, ChevronLeft, ExternalIcon, FolderGitIcon, GitHubIcon, ListIcon, PencilIcon, PlugIcon, PlusIcon, RefreshIcon, SparklesIcon, TrashIcon, UserIcon, UsersIcon, XCircleIcon, XIcon,
} from "../icons.tsx";
import { Link, focusTarget, navigate, setNavigationGuard, useRoute } from "../router.tsx";
import { useStore } from "../store.tsx";

type Draft = { repos: AdditionalRepo[]; teams: Team[]; exclusions: ExcludedRepo[]; collaborators: Collaborator[]; prompt: string };
type Errors = Record<string, string>;

const LEAVE_PROMPT = "Leave Settings? Your changes haven't been saved.";

/**
 * Settings is split into sections, each its own screen at /settings/{section}, chosen in the left column (SET-57).
 * Every section is kept mounted, and the ones not chosen are hidden, so the draft, open prompt fields and "Find my
 * teams" results survive moving between them (SET-59). Saving is for the whole of Settings: a bar at the bottom of
 * every section lists the sections with unsaved changes (SET-60, Q-107).
 */
type SectionId = "connections" | "repositories" | "teams-and-collaborators" | "ranking-prompt" | "account";
const SECTIONS: { id: SectionId; title: string; icon: ReactNode }[] = [
  { id: "connections", title: "Connections", icon: <PlugIcon /> },
  { id: "repositories", title: "Repositories", icon: <FolderGitIcon /> },
  { id: "teams-and-collaborators", title: "Teams and collaborators", icon: <UsersIcon /> },
  { id: "ranking-prompt", title: "Ranking prompt", icon: <ListIcon /> },
  { id: "account", title: "Account", icon: <UserIcon /> },
];
/** The old one-page anchors (/settings#teams and so on), which other pages and old bookmarks still use. */
const OLD_ANCHORS: Record<string, SectionId> = {
  connections: "connections", "additional-repositories": "repositories", "excluded-repositories": "repositories",
  teams: "teams-and-collaborators", collaborators: "teams-and-collaborators", "ranking-prompt-section": "ranking-prompt",
  account: "account", preferences: "account",
};
/**
 * The section a control is in: found from the page itself, since every section is mounted, or, for a control that
 * isn't showing (such as the token field while the GitHub app is connected), from the shape of its id.
 */
function sectionOf(id: string): SectionId | null {
  const found = document.getElementById(id)?.closest("[data-section]")?.getAttribute("data-section") as SectionId | null;
  if (found) return found;
  if (OLD_ANCHORS[id]) return OLD_ANCHORS[id];
  if (id.startsWith("github-") || id.endsWith("-key") || id.startsWith("ranking-agent")) return "connections";
  if (id.startsWith("repo-") || id.startsWith("exclusion-") || id === "add-repository" || id === "add-exclusion") return "repositories";
  if (id.startsWith("team-") || id === "add-team" || id === "find-teams" || id.startsWith("collaborator") || id === "add-collaborator") return "teams-and-collaborators";
  if (id.startsWith("ranking-prompt")) return "ranking-prompt";
  return null;
}
const sectionPath = (id: SectionId) => `/settings/${id}`;

export function SettingsPage() {
  const { me, refreshMe, shortcuts, setShortcuts } = useStore();
  const [server, setServer] = useState<SettingsResponse | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [secrets, setSecrets] = useState<Record<CredentialKind, string>>({ github_pat: "", gemini_key: "", anthropic_key: "", openai_key: "" });
  // The choice in the picker, and saved keys the developer removed (SET-38, SET-39). Both take effect on save.
  const [agent, setAgent] = useState<RankingChoice>("gemini");
  const [removals, setRemovals] = useState<AgentKeyKind[]>([]);
  const [switching, setSwitching] = useState(false); // the switch dialog (SET-40)
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false); // "Changes saved", after a save that stays on Settings
  const [resets, setResets] = useState(0); // counts "Discard changes", which draws the sections again
  const { path, hash } = useRoute();
  const section: SectionId = SECTIONS.find((x) => path === sectionPath(x.id))?.id ?? "connections";

  /** Reads the saved settings and starts the draft from them, with nothing typed, picked or removed. */
  const load = async () => {
    const s = await api.get<SettingsResponse>("/api/settings");
    setServer(s);
    setAgent(s.rankingAgent);
    setDraft({ repos: s.additionalRepos, teams: s.teams, exclusions: s.excludedRepos, collaborators: s.collaborators, prompt: s.customPrompt ?? s.defaultPrompt });
    setSecrets({ github_pat: "", gemini_key: "", anthropic_key: "", openai_key: "" });
    setRemovals([]);
    setErrors({});
    setSaveError(null);
  };
  useEffect(() => { void load(); }, []);
  // Links from notifications and the empty list go to a control and focus it (NOTIF-9, LIST-14): open its section
  // first. Old section anchors, such as /settings#teams, open the section, and /settings on its own is the first one.
  // This runs whenever the address changes, so a link followed while Settings is already open works too.
  const arrived = useRef(false); // whether the address has been handled once, after loading
  useEffect(() => {
    if (!server || !(path === "/settings" || path.startsWith("/settings/"))) return; // leaving Settings
    let id = decodeURIComponent(hash.slice(1));
    // Where only a token can be used there is no "Connect GitHub" to go to, so its links go to the token field.
    if (id === GITHUB_CONNECT_ID && !document.getElementById(id)) id = credentialControlId("github_pat");
    const target = id ? sectionOf(id) : null;
    if (!target) {
      // /settings, and an address that isn't a section, such as /settings/prompt, become the first section.
      if (!SECTIONS.some((x) => path === sectionPath(x.id))) navigate(sectionPath("connections"), true);
      return;
    }
    // navigate() goes to the control, or the part of the section, and focuses it.
    const to = sectionPath(target) + (document.getElementById(id) ? `#${id}` : "");
    if (to !== location.pathname + location.hash) navigate(to, true);
    else if (!arrived.current) setTimeout(() => focusTarget(id), 0); // opened at the control's own address
  }, [server, path, hash]);
  useEffect(() => { if (server) arrived.current = true; }, [server]);
  // Each section opens at its top, unless the address names a place in it.
  useEffect(() => { if (!location.hash) window.scrollTo({ top: 0 }); }, [section]);
  // The GitHub card's details, read again whenever the tab comes back (SET-45); the chip follows.
  const connection = useGitHubConnection(me?.github.method === "app", () => { void refreshMe().catch(() => {}); });
  const connectResult = useConnectResult();

  // Which sections have unsaved changes; the bar lists them and the left column marks them.
  const changed = useMemo((): Record<SectionId, boolean> => {
    const none = { connections: false, repositories: false, "teams-and-collaborators": false, "ranking-prompt": false, account: false };
    if (!server || !draft) return none;
    return {
      ...none,
      connections: Object.values(secrets).some(Boolean) || agent !== server.rankingAgent || removals.length > 0,
      // Prompts as they will be saved: an open prompt field's text counts, without its outer spaces (SET-9, SET-26).
      repositories: JSON.stringify(draft.repos.map((r) => [r.fullName, r.prioritizationPrompt.trim()])) !== JSON.stringify(server.additionalRepos.map((r) => [r.fullName, r.prioritizationPrompt]))
        || JSON.stringify(draft.exclusions.map((e) => e.name)) !== JSON.stringify(server.excludedRepos.map((e) => e.name)),
      "teams-and-collaborators": JSON.stringify(draft.teams.map((t) => [t.name, t.prioritizationPrompt.trim()])) !== JSON.stringify(server.teams.map((t) => [t.name, t.prioritizationPrompt]))
        || JSON.stringify(draft.collaborators.map((c) => c.login)) !== JSON.stringify(server.collaborators.map((c) => c.login)),
      "ranking-prompt": draft.prompt !== (server.customPrompt ?? server.defaultPrompt),
    };
  }, [server, draft, secrets, agent, removals]);
  const dirty = Object.values(changed).some(Boolean);
  useEffect(() => { if (dirty) setSaved(false); }, [dirty]);
  useEffect(() => { if (!saved) return; const t = setTimeout(() => setSaved(false), 4000); return () => clearTimeout(t); }, [saved]);

  // SET-26: leaving with unsaved changes asks first, through links, Back and closing the tab.
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;
  useEffect(() => {
    // Moving between sections keeps the draft, so only leaving Settings asks.
    setNavigationGuard((to) => !dirtyRef.current || to === "/settings" || to.startsWith("/settings/") || window.confirm(LEAVE_PROMPT));
    const h = (e: BeforeUnloadEvent) => { if (dirtyRef.current) e.preventDefault(); };
    window.addEventListener("beforeunload", h);
    return () => { setNavigationGuard(null); window.removeEventListener("beforeunload", h); };
  }, []);

  if (!me || !server || !draft) return null;

  const promptLength = draft.prompt.length;
  const promptError = promptLength > MAX_PROMPT_LENGTH ? MESSAGES.promptLength(promptLength)
    : !draft.prompt.trim() ? MESSAGES.promptEmpty : null;
  const allErrors: Errors = { ...errors, ...(promptError ? { "ranking-prompt": promptError } : {}) };
  const blocked = Object.keys(allErrors).length > 0; // SET-27: no saving while an error shows
  // Sections with a problem showing, marked in the left column so a problem on a hidden section can be found.
  const troubled = new Set(Object.keys(allErrors).map(sectionOf).filter((x): x is SectionId => x !== null));

  const setError = (field: string, message: string | null) =>
    setErrors((e) => { const n = { ...e }; if (message) n[field] = message; else delete n[field]; return n; });

  const save = async (rerank: boolean) => {
    setSaving(true);
    setSaveError(null);
    try {
      const credentials = Object.fromEntries(Object.entries(secrets).filter(([, v]) => v.trim()));
      await api.put("/api/settings", {
        additionalRepos: draft.repos.map(({ fullName, prioritizationPrompt }) => ({ fullName, prioritizationPrompt })),
        teams: draft.teams.map(({ name, prioritizationPrompt, status, avatarUrl }) => ({ name, prioritizationPrompt, status, avatarUrl })),
        excludedRepos: draft.exclusions.map((e) => e.name),
        collaborators: draft.collaborators.map((c) => c.login),
        customPrompt: draft.prompt === server.defaultPrompt ? null : draft.prompt,
        credentials: Object.keys(credentials).length ? credentials : undefined,
        rankingAgent: agent,
        removeCredentials: removals,
        rerank,
      });
      // Whether this save completed setup: Warm Welcome was showing, and now the list is (NAV-8). A save without a
      // GitHub connection doesn't, and stays on Settings.
      const before = me.screen;
      const after = await refreshMe();
      const completedSetup = before === "welcome" && after?.screen === "app";
      if (rerank || completedSetup) {
        // A full re-rank is watched on the list (LIST-16), and the save that completes setup goes to the list's
        // first sync (NAV-8).
        dirtyRef.current = false;
        navigate("/");
      } else {
        // "Save changes" stays on the section, with "Changes saved" in the footer (NAV-8).
        await load();
        setResets((n) => n + 1); // open prompt fields close on what was saved, so Escape can't bring back older text
        setSaved(true);
      }
    } catch (e) {
      if (e instanceof ApiError && e.status === 422 && e.body?.errors) {
        // Shown next to their fields; Settings opens the section of the first one and goes to it (SET-27).
        const errs = e.body.errors as FieldError[];
        setErrors(Object.fromEntries(errs.map((x) => [x.field, x.message])));
        const first = sectionOf(errs[0].field);
        setTimeout(() => { if (first) navigate(`${sectionPath(first)}#${errs[0].field}`); else focusTarget(errs[0].field); }, 0);
      } else {
        setSaveError(e instanceof ApiError ? e.message : "Couldn't save your changes. Try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  // "Discard changes" drops every unsaved change and stays here (NAV-9, SET-14).
  // The sections are drawn again from scratch, so open prompt fields and text typed into "Add …" fields go too.
  const discard = () => { setSaved(false); setResets((n) => n + 1); void load(); };

  // Basic ranking has no key, and so no field (SET-38).
  const basic = agent === "basic";
  const agentKind = basic ? null : AGENT_INFO[agent].kind;
  const agentField = agentKind ? credentialControlId(agentKind) : "";
  // SET-38: choosing another agent clears what was typed for the previous one, with its result or error.
  const pick = (next: RankingChoice) => {
    if (next === agent) return;
    if (agentKind) {
      setSecrets((s) => ({ ...s, [agentKind]: "" }));
      setError(agentField, null);
    }
    setAgent(next);
  };
  // SET-27: an agent needs a key, saved or typed. SET-40: "Save changes" with a different agent asks first,
  // when what is in use has scored items in the list. Choosing basic ranking never asks: it can't re-rank them.
  const requestSave = (rerank: boolean) => {
    if (agent !== "basic" && agentKind) {
      const hasKey = secrets[agentKind].trim() !== "" || (me.credentials[agentKind].set && !removals.includes(agentKind));
      if (!hasKey) {
        setError(agentField, MESSAGES.agentKeyMissing(agent));
        navigate(`${sectionPath("connections")}#${agentField}`, true); // the bar can be used from any section
        return;
      }
      if (!rerank && agent !== server.rankingAgent && (server.rankedBy[server.rankingAgent] ?? 0) > 0) {
        setSwitching(true);
        return;
      }
    }
    void save(rerank && !basic);
  };

  const names = SECTIONS.filter((x) => changed[x.id]);
  const rerankNote = basic ? BASIC_INFO.noRerank
    : "“Save changes” keeps your current ranks and stays here. “Save and re-rank” ranks every issue and PR again and takes you to your list to watch; it can use a lot of your ranking agent’s quota or credits.";

  return (
    <div className="settings-page">
      {/* NAV-9: the way back to the list. Leaving with unsaved changes asks (SET-26). */}
      {/* Before setup is finished, "/" is Warm Welcome, reached from its "Advanced setup" link. */}
      <Link to="/" className="back-link"><ChevronLeft /> {me.screen === "welcome" ? "Back to setup" : "Back to list"}</Link>
      <h1>Settings</h1>
      <p className="lede">Connect your tools. Give your inbox the right context.</p>
      <div className="settings">
        <aside className="side">
          <nav className="side-nav" aria-label="Settings sections">
            {SECTIONS.map((x) => (
              <Link key={x.id} to={sectionPath(x.id)} className={section === x.id ? "current" : undefined} aria-current={section === x.id ? "page" : undefined}>
                {x.icon} {x.title}
                {troubled.has(x.id) ? <span className="nav-mark bad" title="Has a problem"><span className="sr-only"> (has a problem)</span></span>
                  : changed[x.id] ? <span className="nav-mark" title="Unsaved changes"><span className="sr-only"> (unsaved changes)</span></span> : null}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="settings-main">
          <section key={`connections-${resets}`} className="section" data-section="connections" id="settings-connections" hidden={section !== "connections"}>
            <h2 className="section-title">Connections</h2>
            <p>Gitilizer needs a GitHub connection to scan your inbox. An API key for ranking is optional.</p>
            <div className="stack">
              <GitHubCard me={me} details={connection} result={connectResult} docs={`${DOCS_URL}#github-personal-access-tokens`}
                value={secrets.github_pat} onChange={(v) => setSecrets((s) => ({ ...s, github_pat: v }))} />
              <AgentCard agent={agent} inUse={server.rankingAgent} credentials={me.credentials} removals={removals}
                value={agentKind ? secrets[agentKind] : ""} error={allErrors[agentField]} onPick={pick}
                onChange={(v) => { if (!agentKind) return; setSecrets({ ...secrets, [agentKind]: v }); setError(agentField, null); }}
                onRemove={(kind) => setRemovals((r) => [...r, kind])} />
            </div>
          </section>

          <section key={`repositories-${resets}`} className="section" data-section="repositories" id="settings-repositories" hidden={section !== "repositories"}>
            <h2 className="section-title">Repositories</h2>
            <div className="subsection" id="additional-repositories">
              <SubHead title="Additional repositories" />
              <p>Follow repositories beyond your assigned, created and @mention issues and PRs. Their open issues and PRs join the same list.</p>
              <RepoList repos={draft.repos} saved={server.additionalRepos} excluded={draft.exclusions} errors={allErrors} setError={setError} app={me.github.method === "app"}
                        onChange={(repos) => setDraft((d) => d && { ...d, repos: typeof repos === "function" ? repos(d.repos) : repos })} />
            </div>
            <div className="subsection" id="excluded-repositories">
              <SubHead title="Excluded repositories" />
              <p>Issues and PRs from these never appear in your list, even when you're assigned, asked to review or @-mentioned. Gitilizer doesn't scan or rank them.</p>
              <ExclusionList items={draft.exclusions} additional={draft.repos.map((r) => r.fullName)} errors={allErrors} setError={setError} app={me.github.method === "app"}
                             onChange={(x) => setDraft((d) => d && { ...d, exclusions: typeof x === "function" ? x(d.exclusions) : x })} />
            </div>
          </section>

          <section key={`teams-and-collaborators-${resets}`} className="section" data-section="teams-and-collaborators" id="settings-teams-and-collaborators" hidden={section !== "teams-and-collaborators"}>
            <h2 className="section-title">Teams and collaborators</h2>
            <div className="subsection" id="teams">
              <SubHead title="Teams" />
              <p>PRs that ask these teams for a review appear in your list. Add a prioritization prompt to say how much of the team's reviewing is yours.</p>
              <TeamList teams={draft.teams} saved={server.teams} errors={allErrors} setError={setError}
                        onChange={(t) => setDraft((d) => d && { ...d, teams: typeof t === "function" ? t(d.teams) : t })} />
            </div>
            <div className="subsection" id="collaborators">
              <SubHead title="Collaborators" />
              <p>By default, issues, PRs and comments made by your collaborators have higher priority.</p>
              <CollaboratorList people={draft.collaborators} errors={allErrors} setError={setError}
                                onChange={(c) => setDraft((d) => d && { ...d, collaborators: typeof c === "function" ? c(d.collaborators) : c })} />
            </div>
          </section>

          <section key={`ranking-prompt-${resets}`} className="section" data-section="ranking-prompt" id="settings-ranking-prompt" hidden={section !== "ranking-prompt"}>
            <h2 className="section-title">Ranking prompt</h2>
            <p>The agent reads the title, description, labels, comments and reviews of each issue and PR and gives it a score.</p>
            <div className={`panel editor ${allErrors["ranking-prompt"] ? "invalid" : ""}`}>
              <div className="editor-head">
                {draft.prompt !== server.defaultPrompt
                  ? <button className="link-btn accent" onClick={() => setDraft({ ...draft, prompt: server.defaultPrompt })}>Restore default</button>
                  : <span>Default prompt</span>}
                {promptLength > PROMPT_COUNT_FROM && (
                  <span className={promptLength > MAX_PROMPT_LENGTH ? "error-text" : ""}>
                    {promptLength.toLocaleString("en-US")} / {MAX_PROMPT_LENGTH.toLocaleString("en-US")} characters
                  </span>
                )}
              </div>
              <textarea id="ranking-prompt" aria-label="Ranking prompt" spellCheck={false} value={draft.prompt}
                        aria-invalid={Boolean(allErrors["ranking-prompt"])} aria-describedby="ranking-prompt-error"
                        onChange={(e) => setDraft({ ...draft, prompt: e.target.value })} />
            </div>
            <FieldMessage id="ranking-prompt-error" message={allErrors["ranking-prompt"]} />
          </section>

          <section className="section" data-section="account" id="settings-account" hidden={section !== "account"}>
            <h2 className="section-title">Account</h2>
            <p>Changes here apply straight away; they aren't part of “Save changes”.</p>
            <div className="panel account-panel" id="account">
              <div className="label">YOUR ACCOUNT</div>
              <strong>{me.user.name}</strong>
              <span className="small">{me.user.email}</span>
              <span className="small">{me.user.provider === "github" ? <GitHubIcon size={12} /> : null} Signed in with {providerName(me.user.provider)}</span>
              {/* SET-16, ACCT-5: "Sign out", with no arrow. */}
              <button className="link-btn plain" onClick={async () => { await api.post("/api/auth/logout"); location.href = "/"; }}>Sign out</button>
            </div>
            <div className="panel account-panel">
              {/* SET-50: the store has the switch's current state; until it has loaded, what this page read. */}
              <Preferences shortcuts={shortcuts ?? server.keyboardShortcuts} onShortcuts={setShortcuts} />
            </div>
            <DeleteAccount />
          </section>

          {/* SET-60: one bar for all of Settings, at the bottom of every section, shown while anything is unsaved. Both
              saves save every section, credentials included (SET-14, SET-15). */}
          {dirty ? (
            <div className="save-bar" role="region" aria-label="Save changes">
              <div className="save-bar-status" aria-live="polite">
                <strong>Unsaved changes</strong> in{" "}
                {names.map((x, i) => <span key={x.id}>{i > 0 && (i === names.length - 1 ? " and " : ", ")}<Link to={sectionPath(x.id)}>{x.title}</Link></span>)}
                {saveError && <div className="error-text" role="alert">{saveError}</div>}
              </div>
              <div className="save-bar-actions">
                <button className="btn plain" disabled={saving} onClick={discard}>Discard changes</button>
                {/* SET-15: basic ranking never ranks everything again; the reason is a note, read out with the button. */}
                <button className="btn" disabled={blocked || saving || basic} aria-describedby="rerank-note" onClick={() => requestSave(true)}>Save and re-rank</button>
                <button className="btn primary" disabled={blocked || saving} aria-describedby="rerank-note" onClick={() => requestSave(false)}>Save changes</button>
              </div>
              <p className="save-bar-note" id="rerank-note">{blocked ? "Fix the problems marked in red before saving." : rerankNote}</p>
            </div>
          ) : section !== "account" && (
            // With nothing to save, a quiet footer: "Changes saved" for a moment, and a re-rank of everything, which
            // could be done before without changing anything (SET-15).
            <div className="save-footer">
              <span aria-live="polite">{saved ? <span className="saved"><CheckIcon /> Changes saved</span> : saveError ? <span className="error-text" role="alert">{saveError}</span> : "No unsaved changes."}</span>
              <button className="btn small" disabled={blocked || saving || basic} aria-describedby="rerank-clean-note" onClick={() => requestSave(true)}>Re-rank everything</button>
              <span className="fine" id="rerank-clean-note">{basic ? BASIC_INFO.noRerank : blocked ? "Fix the problems marked in red first." : "Ranks every issue and PR again. This can use a lot of your ranking agent’s quota or credits."}</span>
            </div>
          )}
          {switching && (
            <SwitchDialog from={server.rankingAgent} to={agent} n={server.rankedBy[server.rankingAgent] ?? 0}
              onCancel={() => setSwitching(false)} onSwitch={(rerank) => { setSwitching(false); void save(rerank); }} />
          )}
        </div>
      </div>
    </div>
  );
}

function providerName(p: string) {
  return ({ google: "Google", github: "GitHub", dev: "a development account", local: "local mode" } as Record<string, string>)[p] ?? p;
}

function SubHead({ title }: { title: string }) {
  return <div className="section-head"><h3>{title}</h3></div>;
}

function FieldMessage({ id, message }: { id?: string; message?: string }) {
  return message ? <div className="field-error" id={id} role="alert">{message}</div> : null;
}

// ---------------------------------------------------------------------------
// Credentials (SET-1..6, SET-20, SET-21, SET-28, SET-30)
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// Ranking agent (SET-1, SET-4, SET-32, SET-38 to SET-40)
// ---------------------------------------------------------------------------

const AGENTS = RankingAgent.options;

function AgentCard(props: {
  agent: RankingChoice; inUse: RankingChoice; credentials: Me["credentials"]; removals: AgentKeyKind[];
  value: string; error?: string; onPick: (a: RankingChoice) => void; onChange: (v: string) => void; onRemove: (k: AgentKeyKind) => void;
}) {
  const info = props.agent === "basic" ? null : AGENT_INFO[props.agent];
  const removed = info ? props.removals.includes(info.kind) : false;
  const status: CredentialStatus = !info || removed ? { set: false, chip: "not_set", expiresAt: null } : props.credentials[info.kind];
  const [check, setCheck] = useState<Check>(null);
  useEffect(() => setCheck(null), [props.value, props.agent]);
  // SET-30: the chip is about the chosen agent's key; basic ranking has none, and says so.
  const [chipClass, chipText] = info ? CHIPS[status.chip] : ["", "Basic"];
  // SET-39: other agents with a saved key; the one in use can't be removed. With basic ranking none is in use.
  const others = AGENTS.filter((a) => a !== props.agent && props.credentials[AGENT_INFO[a].kind].set && !props.removals.includes(AGENT_INFO[a].kind));
  return (
    <div className="panel card" id="ranking-agent">
      <div className="card-head"><SparklesIcon /><h3>Ranking agent</h3><span className={`badge ${chipClass}`}>{chipText}</span></div>
      <AgentPicker agent={props.agent} onPick={props.onPick} idPrefix="agent" />
      {info ? (
        <CredentialField key={props.agent} kind={info.kind} label={`${info.name} API key`} setup={info.setup}
          guidance={<>Used by {info.name} to score and prioritize your issues and PRs.</>} learnMore={`${DOCS_URL}#${info.docs}`}
          saved={status.set} value={props.value} onChange={props.onChange} check={check} onCheck={setCheck} error={props.error} />
      ) : (
        <p className="fine basic-note">
          {BASIC_INFO.nothingToSetUp}{" "}
          <a className="fine-link" href={`${DOCS_URL}#${BASIC_INFO.docs}`} target="_blank" rel="noreferrer">{BASIC_INFO.compareSettings} <ExternalIcon /></a>
        </p>
      )}
      {others.map((a) => (
        <p className="fine other-key" key={a}>
          Your {AGENT_INFO[a].name} key stays saved, so you can switch back without pasting it again.
          {a !== props.inUse && <> <button type="button" className="link-btn plain inline" onClick={() => props.onRemove(AGENT_INFO[a].kind)}>Remove {AGENT_INFO[a].name} key</button></>}
        </p>
      ))}
    </div>
  );
}

/** Asked before "Save changes" switches to a ranking agent, from another or from basic ranking (SET-40). */
function SwitchDialog(props: { from: RankingChoice; to: RankingChoice; n: number; onCancel: () => void; onSwitch: (rerank: boolean) => void }) {
  const from = choiceName(props.from);
  const to = choiceName(props.to);
  const one = props.n === 1;
  return (
    <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-labelledby="switch-title"
         onKeyDown={(e) => e.key === "Escape" && props.onCancel()}>
      <div className="panel dialog switch-dialog">
        <h2 id="switch-title">Switch ranking to {to}?</h2>
        <p>
          Your {props.n.toLocaleString("en-US")} {one ? "issue or PR was" : "issues and PRs were"} ranked by {from}. Scores from different
          agents don’t line up exactly, so the order can be a little off until every item has been ranked again.
        </p>
        <p>
          “Switch and re-rank” ranks {one ? "it" : "all of them"} with {to} now. “Switch” ranks new and changed items with {to} now,
          and the rest at the daily re-rank, within 24 hours.
        </p>
        <div className="dialog-actions">
          <button className="btn" onClick={props.onCancel} autoFocus>Cancel</button>
          <button className="btn" onClick={() => props.onSwitch(false)}>Switch</button>
          <button className="btn primary" onClick={() => props.onSwitch(true)}>Switch and re-rank</button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Additional repositories (SET-7..9)
// ---------------------------------------------------------------------------

type Setter<T> = (v: T | ((prev: T) => T)) => void;

/**
 * A repository's icon (SET-8, SET-36): its owner's avatar, as GitHub shows a
 * repository, square with rounded corners for an organization and round for a
 * personal account; the repository icon until GitHub has found it.
 */
function OwnerAvatar({ url, type }: { url: string | null; type: "Organization" | "User" | null }) {
  if (url) return <img className={`avatar ${type === "User" ? "" : "org"}`} src={url} alt="" />;
  return <span className="icon-slot" aria-hidden="true"><FolderGitIcon size={14} /></span>;
}

/** `app`: GitHub is connected with the Gitilizer app, so the texts don't speak of a token (SET-49). */
function accessView(r: AdditionalRepo, app: boolean): { className: string; text: string; title?: string } {
  const org = r.fullName.split("/")[0];
  switch (r.access) {
    case "ok": return { className: "ok", text: "Access confirmed" };
    case "checking": return { className: "", text: "Checking…" };
    case "archived": return { className: "", text: "Archived", title: `${r.fullName} is archived, so its issues and PRs aren't shown.` };
    case "not_found": return { className: "bad", text: "Can't access", title: app
      ? `GitHub says ${r.fullName} doesn't exist, or Gitilizer can't read it. Check the name, and that the Gitilizer app is installed on its owner's account and includes this repository.`
      : `GitHub says ${r.fullName} doesn't exist, or your token can't read it. Check the name, and that your token includes this repository.` };
    case "sso_required": return { className: "bad", text: "Can't access", title: `${org} uses single sign-on. Authorize your token for ${org} in your GitHub personal access token settings.` };
    case "token_type_blocked": return {
      className: "bad", text: "Can't access",
      title: `${org} doesn't allow ${r.tokenType ?? "this kind of"} tokens. Create the other kind of token, or ask an owner of ${org} to allow this one.`,
    };
  }
}

export function RepoList({ repos, saved, excluded, onChange, errors, setError, app }: {
  app: boolean; saved: AdditionalRepo[];
  repos: AdditionalRepo[]; excluded: ExcludedRepo[]; onChange: Setter<AdditionalRepo[]>; errors: Errors; setError: (f: string, m: string | null) => void;
}) {
  const [name, setName] = useState("");
  const add = () => {
    const full = parseRepo(name);
    const err = !full ? MESSAGES.repoFormat
      : repos.some((r) => r.fullName.toLowerCase() === full.toLowerCase()) ? MESSAGES.repoDuplicate(full)
      : excluded.some((e) => e.kind === "repo" && e.name.toLowerCase() === full.toLowerCase()) ? MESSAGES.repoIsExcluded(full) // SET-35
      : repos.length >= MAX_REPOS ? MESSAGES.repoLimit : null;
    setError("add-repository", err);
    if (err || !full) return;
    // A new repository has no prompt: the developer adds one on its row (SET-7, SET-9).
    onChange([...repos, { fullName: full, prioritizationPrompt: "", access: "checking", tokenType: null, ownerAvatarUrl: null, ownerType: null }]);
    setName("");
    // Check access at once (SET-8). GitHub follows renames, so the row shows the current name.
    api.post<Omit<AdditionalRepo, "prioritizationPrompt">>("/api/repos/check", { fullName: full })
      .then((r) => onChange((cur) => cur.map((x) => (x.fullName === full ? {
        ...x, access: r.access, tokenType: r.tokenType, ownerAvatarUrl: r.ownerAvatarUrl, ownerType: r.ownerType,
        fullName: cur.some((y) => y !== x && y.fullName === r.fullName) ? x.fullName : r.fullName,
      } : x))))
      .catch(() => {});
  };
  return (
    <div className="panel list-rows">
      {repos.map((r) => {
        const a = accessView(r, app);
        const rowId = repoControlId(r.fullName);
        // "Edited" compares with the saved prompt; a repository added since the last save has none to compare with (SET-9).
        const savedPrompt = saved.find((x) => x.fullName.toLowerCase() === r.fullName.toLowerCase())?.prioritizationPrompt;
        const edited = savedPrompt !== undefined && r.prioritizationPrompt.trim() !== savedPrompt;
        const setPrompt = (p: string) => onChange((cur) => cur.map((x) => (x.fullName === r.fullName ? { ...x, prioritizationPrompt: p } : x)));
        return (
          <div className="lr repo-row" key={r.fullName} id={rowId}>
            <div className="lr-main">
              <OwnerAvatar url={r.access === "ok" || r.access === "archived" ? r.ownerAvatarUrl : null} type={r.ownerType} />
              <span className="mono">{r.fullName}</span>
              {edited && <span className="edited">Edited</span>}
              <span className="spacer" />
              <span className={`access ${a.className}`} title={a.title} tabIndex={a.title ? 0 : undefined}>
                {a.className === "bad" && <XCircleIcon size={12} />} {a.text}
              </span>
              <button className="link-btn" aria-label={`Remove ${r.fullName}`}
                      onClick={() => { onChange(repos.filter((x) => x !== r)); setError(rowId, null); clearConflict(errors, setError, r.fullName); }}><XIcon size={12} /> Remove</button>
            </div>
            <RepoPrompt repo={r.fullName} prompt={r.prioritizationPrompt} onChange={setPrompt}
                        error={errors[promptControlId(r.fullName)]} setError={(m) => setError(promptControlId(r.fullName), m)} />
            <FieldMessage message={errors[rowId]} />
          </div>
        );
      })}
      <div className="add">
        <label htmlFor="add-repository">Add repository</label>
        <input id="add-repository" type="text" className={`mono-input ${errors["add-repository"] ? "invalid" : ""}`} placeholder="owner/repository"
               value={name} aria-invalid={Boolean(errors["add-repository"])}
               onChange={(e) => { setName(e.target.value); setError("add-repository", null); }} onKeyDown={(e) => e.key === "Enter" && add()} />
        <FieldMessage message={errors["add-repository"]} />
        <div><button className="btn" onClick={add}><PlusIcon /> Add repository</button></div>
      </div>
    </div>
  );
}

const promptControlId = (repo: string) => `${repoControlId(repo)}-prompt`;

/**
 * A repository's prioritization prompt, edited in place on its row (SET-9), as in Figma "Settings / Repository
 * prompt". The text is a button that opens a multi-line field; a repository without a prompt shows "Add
 * prioritization prompt" instead. While the field is open, every keystroke goes into the draft, so "Edited", the
 * save buttons and the question on leaving (SET-26) all see what is typed. Leaving the field keeps the text without
 * its outer spaces; Escape puts back what it held when it opened. Over 500 characters it stays open, with an error
 * that blocks saving (SET-27).
 */
export function RepoPrompt({ repo, prompt, onChange, error, setError, controlId }: {
  repo: string; prompt: string; onChange: (prompt: string) => void; error?: string; setError: (message: string | null) => void;
  /** The field's id; a repository's by default. A team's prompt works the same way (SET-53). */
  controlId?: string;
}) {
  const [open, setOpen] = useState(false);
  const before = useRef(""); // the text when the field opened, for Escape
  const closing = useRef(false); // Escape closes the field: the blur that follows must not keep the text
  const field = useRef<HTMLTextAreaElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const refocus = useRef(false);
  const id = controlId ?? promptControlId(repo);
  const tooLong = prompt.length > MAX_REPO_PROMPT_LENGTH;
  const message = tooLong ? MESSAGES.repoPromptLength(prompt.length) : null;
  useEffect(() => setError(message), [message]);
  useEffect(() => () => setError(null), []); // a removed repository takes its error with it

  // The field opens with the cursor at the end, and grows with its text.
  useEffect(() => {
    const el = field.current;
    if (!open || !el) return;
    if (document.activeElement !== el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [open, prompt]);
  // After Escape, focus goes back to what opened the field.
  useEffect(() => { if (!open && refocus.current) { refocus.current = false; opener.current?.focus(); } }, [open]);

  const start = () => { before.current = prompt; closing.current = false; setOpen(true); };
  const keep = () => {
    if (closing.current) return;
    if (prompt.length > MAX_REPO_PROMPT_LENGTH) return; // stays open until it fits, or Escape
    onChange(prompt.trim());
    setOpen(false);
  };
  const cancel = () => { closing.current = true; refocus.current = true; onChange(before.current); setOpen(false); };

  if (open) {
    return (
      <div className="lr-prompt">
        <label className="caption" htmlFor={id}>Prioritization prompt</label>
        <div className="prompt-editor">
          <textarea id={id} ref={field} rows={2} value={prompt} className={tooLong ? "invalid" : ""} spellCheck={false}
                    aria-invalid={tooLong} aria-describedby={`${id}-count${tooLong ? ` ${id}-error` : ""}`}
                    placeholder="Security issues only"
                    onChange={(e) => onChange(e.target.value)} onBlur={keep}
                    onKeyDown={(e) => { if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); cancel(); } }} />
          <div className="below">
            {error && <span className="field-error" id={`${id}-error`} role="alert">{error}</span>}
            <span className={`count ${tooLong ? "error-text" : ""}`} id={`${id}-count`}>
              {prompt.length.toLocaleString("en-US")} / {MAX_REPO_PROMPT_LENGTH} characters
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (!prompt) {
    return (
      <div className="lr-prompt">
        <button ref={opener} type="button" className="link-btn accent add-prompt" onClick={start}>
          <PlusIcon size={12} /> Add prioritization prompt<span className="sr-only"> for {repo}</span>
        </button>
      </div>
    );
  }
  return (
    <div className="lr-prompt">
      <span className="caption" aria-hidden="true">Prioritization prompt</span>
      <button ref={opener} type="button" className="prompt-text" onClick={start}>
        <span className="sr-only">Edit the prioritization prompt for {repo}: </span>
        <span>{prompt}</span><PencilIcon size={14} />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Teams (SET-51..56)
// ---------------------------------------------------------------------------

const teamPromptId = (name: string) => `${teamControlId(name)}-prompt`;

/** The organization's avatar once GitHub has found the team, a team icon until then (SET-52). */
function TeamIcon({ url }: { url: string | null }) {
  if (url) return <img className="avatar org" src={url} alt="" />;
  return <span className="icon-slot" aria-hidden="true"><UsersIcon size={14} /></span>;
}

const TEAM_NOT_FOUND = (name: string) =>
  `GitHub says there's no team ${name}, or your GitHub connection can't see it. If the name is misspelled, remove it and add it again.`;

const FIND_MESSAGES: Record<"none" | "busy" | "unreachable", string> = {
  none: "No teams found. A team shows up here when it's asked to review an open PR.",
  busy: "GitHub is busy with your scan. Try again in a minute.",
  unreachable: "Couldn't reach GitHub. Try again.",
};

export function TeamList({ teams, saved, onChange, errors, setError }: {
  teams: Team[]; saved: Team[]; onChange: Setter<Team[]>; errors: Errors; setError: (f: string, m: string | null) => void;
}) {
  const [input, setInput] = useState("");
  const [finding, setFinding] = useState(false);
  const [found, setFound] = useState<FoundTeam[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // A saved team still "Checking…" (its scan couldn't check it, or hasn't run yet) is checked when the page opens.
  useEffect(() => {
    for (const t of teams) if (t.status === "checking") check(t.name);
  }, []);
  const check = (name: string) => {
    api.post<Team>("/api/teams/check", { name })
      .then((r) => onChange((cur) => cur.map((x) => (x.name === name ? { ...x, status: r.status, avatarUrl: r.avatarUrl } : x))))
      .catch(() => {});
  };
  const addTeam = (name: string, checked?: Pick<Team, "status" | "avatarUrl">) => {
    setError("add-team", null); // an error from typing goes with the next team added (SET-27)
    onChange((cur) => [...cur, { name, prioritizationPrompt: "", status: checked?.status ?? "checking", avatarUrl: checked?.avatarUrl ?? null }]);
    setFound((f) => f && f.filter((x) => x.name.toLowerCase() !== name.toLowerCase())); // its suggestion goes (SET-54)
    if (checked) return;
    // Checked at once with a search (SET-52); the scan that saving starts checks it again if this doesn't answer.
    check(name);
  };
  const add = () => {
    const name = parseTeam(input);
    const err = !name ? MESSAGES.teamFormat
      : teams.some((t) => t.name.toLowerCase() === name.toLowerCase()) ? MESSAGES.teamDuplicate(name)
      : teams.length >= MAX_TEAMS ? MESSAGES.teamLimit : null;
    setError("add-team", err);
    if (err || !name) return;
    addTeam(name);
    setInput("");
  };
  const find = async () => {
    setFinding(true);
    setMessage(null);
    try {
      const r = await api.post<FindTeamsResponse>("/api/teams/find");
      if (r.status !== "ok") { setFound(null); setMessage(FIND_MESSAGES[r.status]); return; }
      setFound(r.teams);
      // "No teams found" when none of them is new to the page (SET-54); not after adding the last suggestion.
      if (!r.teams.some((f) => !teams.some((t) => t.name.toLowerCase() === f.name.toLowerCase()))) setMessage(FIND_MESSAGES.none);
    } catch {
      setFound(null);
      setMessage(FIND_MESSAGES.unreachable);
    } finally {
      setFinding(false);
    }
  };
  // Teams already on the page aren't suggested, saved or not (SET-54).
  const suggestions = (found ?? []).filter((f) => !teams.some((t) => t.name.toLowerCase() === f.name.toLowerCase()));

  return (
    <div className="panel list-rows">
      {teams.map((t) => {
        const rowId = teamControlId(t.name);
        const savedPrompt = saved.find((x) => x.name.toLowerCase() === t.name.toLowerCase())?.prioritizationPrompt;
        const edited = savedPrompt !== undefined && t.prioritizationPrompt.trim() !== savedPrompt;
        const setPrompt = (p: string) => onChange((cur) => cur.map((x) => (x.name === t.name ? { ...x, prioritizationPrompt: p } : x)));
        return (
          <div className="lr repo-row" key={t.name} id={rowId}>
            <div className="lr-main">
              <TeamIcon url={t.status === "ok" ? t.avatarUrl : null} />
              <span className="mono">{t.name}</span>
              {edited && <span className="edited">Edited</span>}
              <span className="spacer" />
              {t.status === "checking" && <span className="access">Checking…</span>}
              {t.status === "not_found" && (
                <span className="access bad" title={TEAM_NOT_FOUND(t.name)} tabIndex={0}><XCircleIcon size={12} /> Not found</span>
              )}
              <button className="link-btn" aria-label={`Remove ${t.name}`}
                      onClick={() => { onChange(teams.filter((x) => x !== t)); setError(rowId, null); }}><XIcon size={12} /> Remove</button>
            </div>
            <RepoPrompt repo={t.name} prompt={t.prioritizationPrompt} onChange={setPrompt} controlId={teamPromptId(t.name)}
                        error={errors[teamPromptId(t.name)]} setError={(m) => setError(teamPromptId(t.name), m)} />
            <FieldMessage message={errors[rowId]} />
          </div>
        );
      })}
      <div className="add">
        <label htmlFor="add-team">Add a team</label>
        <input id="add-team" type="text" className={`mono-input ${errors["add-team"] ? "invalid" : ""}`} placeholder="org/team"
               value={input} aria-invalid={Boolean(errors["add-team"])}
               onChange={(e) => { setInput(e.target.value); setError("add-team", null); }} onKeyDown={(e) => e.key === "Enter" && add()} />
        <FieldMessage message={errors["add-team"]} />
        <div><button className="btn" onClick={add}><PlusIcon /> Add team</button></div>
      </div>
      <div className="find-teams">
        <div className="find-row">
          <button className="btn" onClick={() => void find()} disabled={finding} aria-describedby="find-teams-hint">
            {finding ? <><RefreshIcon className="spin" /> Finding your teams…</> : <><UsersIcon /> Find my teams</>}
          </button>
          <span className="fine" id="find-teams-hint">Not sure which teams you're in? Gitilizer can find the teams that are asking you for reviews.</span>
        </div>
        <div aria-live="polite">
          {message && <p className="fine find-message">{message}</p>}
          {found && suggestions.length > 0 && (
            <div className="team-suggestions">
              <p className="fine">Your teams, from the PRs asking you for a review</p>
              {suggestions.map((f) => (
                <div className="suggestion" key={f.name}>
                  <TeamIcon url={f.avatarUrl} />
                  <span className="mono">{f.name}</span>
                  <span className="fine count">{f.prs === 1 ? "1 open PR" : `${f.prs} open PRs`}</span>
                  <button className="btn small" aria-label={`Add ${f.name}`} disabled={teams.length >= MAX_TEAMS}
                          onClick={() => addTeam(f.name, { status: "ok", avatarUrl: f.avatarUrl })}><PlusIcon /> Add</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Excluded repositories (SET-33..37)
// ---------------------------------------------------------------------------

/**
 * Removing a repository from either list resolves a conflict with the other
 * (SET-35), so the error that named it goes too: on the other list's add field,
 * or on an exclusion's row after a refused save. Other errors stay.
 */
function clearConflict(errors: Errors, setError: (f: string, m: string | null) => void, repo: string) {
  for (const field of conflictFields(errors, repo)) setError(field, null);
}

function exclusionStatus(e: ExcludedRepo, app: boolean): { className: string; text: string; title?: string } {
  if (e.status === "checking") return { className: "", text: "Checking…" };
  if (e.status === "not_found") {
    return { className: "bad", text: "Not found", title: `GitHub says ${e.name} doesn't exist, or ${app ? "Gitilizer" : "your token"} can't read it. If the name is misspelled, remove it and add it again.` };
  }
  if (e.kind === "repo") return { className: "", text: "Repository" };
  return { className: "", text: e.ownerType === "User" ? "Personal account" : "Organization" };
}

/**
 * The row's icon (SET-36): the owner's avatar, for an owner or for a
 * repository's owner, square with rounded corners for an organization and round
 * for a personal account. Until GitHub has found it, the repository icon or a
 * generic avatar: the red ✗ by "Not found" is the row's only error marker.
 */
function ExclusionIcon({ e }: { e: ExcludedRepo }) {
  if (e.kind === "repo") return <OwnerAvatar url={e.status === "ok" ? e.avatarUrl : null} type={e.ownerType} />;
  if (e.status === "ok" && e.avatarUrl) return <img className={`avatar ${e.ownerType === "Organization" ? "org" : ""}`} src={e.avatarUrl} alt="" />;
  return <span className="avatar generic" aria-hidden="true"><UserIcon /></span>;
}

/** Scrolls to an additional repository's row and focuses it (SET-35). */
const showRepo = (repo: string) => (ev: React.MouseEvent<HTMLAnchorElement>) => {
  ev.preventDefault();
  const row = document.getElementById(repoControlId(repo));
  if (!row) return;
  row.scrollIntoView({ behavior: "smooth", block: "center" });
  row.setAttribute("tabindex", "-1");
  row.focus({ preventScroll: true });
};

function ExclusionList({ items, additional, onChange, errors, setError, app }: {
  app: boolean;
  items: ExcludedRepo[]; additional: string[]; onChange: Setter<ExcludedRepo[]>; errors: Errors; setError: (f: string, m: string | null) => void;
}) {
  const [input, setInput] = useState("");
  const add = () => {
    const e = parseExclusion(input);
    const err = !e ? MESSAGES.exclusionFormat
      : items.some((x) => x.name.toLowerCase() === e.name.toLowerCase()) ? MESSAGES.exclusionDuplicate(e.name)
      : e.kind === "repo" && additional.some((r) => r.toLowerCase() === e.name.toLowerCase()) ? MESSAGES.exclusionIsAdditional(e.name)
      : items.length >= MAX_EXCLUSIONS ? MESSAGES.exclusionLimit : null;
    setError("add-exclusion", err);
    if (err || !e) return;
    onChange([...items, { name: e.name, kind: e.kind, status: "checking", ownerType: null, avatarUrl: null }]);
    setInput("");
    // Looked up at once (SET-36); the row takes GitHub's spelling of the name.
    api.post<ExcludedRepo>("/api/exclusions/check", { name: e.name })
      .then((r) => onChange((cur) => cur.map((x) => (x.name === e.name
        ? { ...x, status: r.status, ownerType: r.ownerType, avatarUrl: r.avatarUrl, name: cur.some((y) => y !== x && y.name.toLowerCase() === r.name.toLowerCase()) ? x.name : r.name }
        : x))))
      .catch(() => {});
  };
  return (
    <div className="panel list-rows">
      {items.map((e) => {
        const st = exclusionStatus(e, app);
        const rowId = exclusionControlId(e.name);
        return (
          <div className="lr repo-row" key={e.name} id={rowId}>
            <div className="lr-main">
              <ExclusionIcon e={e} />
              <span className="mono">{e.name}</span>
              <span className="spacer" />
              <span className={`access ${st.className}`} title={st.title} tabIndex={st.title ? 0 : undefined}>
                {st.className === "bad" && <XCircleIcon size={12} />} {st.text}
              </span>
              <button className="link-btn" aria-label={`Remove ${e.name}`}
                      onClick={() => { onChange(items.filter((x) => x !== e)); setError(rowId, null); if (e.kind === "repo") clearConflict(errors, setError, e.name); }}><XIcon size={12} /> Remove</button>
            </div>
            {e.kind === "owner" && e.status === "ok" && (
              <div className="lr-note">
                {exclusionNote(e.name, e.ownerType, additional).parts.map((p, i) => (typeof p === "string"
                  ? <span key={i}>{p}</span>
                  : <a key={i} href={`#${repoControlId(p.repo)}`} onClick={showRepo(p.repo)}>{p.repo}</a>))}
              </div>
            )}
            <FieldMessage message={errors[rowId]} />
          </div>
        );
      })}
      <div className="add">
        <label htmlFor="add-exclusion">Exclude an organization or repository</label>
        <input id="add-exclusion" type="text" className={`mono-input ${errors["add-exclusion"] ? "invalid" : ""}`} placeholder="owner/repository or org"
               value={input} aria-invalid={Boolean(errors["add-exclusion"])} aria-describedby="add-exclusion-help"
               onChange={(ev) => { setInput(ev.target.value); setError("add-exclusion", null); }} onKeyDown={(ev) => ev.key === "Enter" && add()} />
        <FieldMessage message={errors["add-exclusion"]} />
        <p className="fine" id="add-exclusion-help">Enter owner/repository to hide one repository, or an organization or username to hide every repository it owns. You can also paste a GitHub URL.</p>
        <div><button className="btn" onClick={add}><PlusIcon /> Exclude</button></div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Collaborators (SET-10, SET-18, SET-19, SET-25)
// ---------------------------------------------------------------------------

function CollaboratorList({ people, onChange, errors, setError }: {
  people: Collaborator[]; onChange: Setter<Collaborator[]>; errors: Errors; setError: (f: string, m: string | null) => void;
}) {
  const [input, setInput] = useState("");
  const add = () => {
    const login = parseLogin(input);
    const err = !login ? MESSAGES.loginFormat
      : people.some((p) => p.login.toLowerCase() === login.toLowerCase()) ? MESSAGES.loginDuplicate(login)
      : people.length >= MAX_COLLABORATORS ? MESSAGES.loginLimit : null;
    setError("add-collaborator", err);
    if (err || !login) return;
    // Added without a check (SET-18); the avatar or the not-found icon follows.
    onChange([...people, { login, status: "unknown", avatarUrl: null }]);
    setInput("");
    api.post<Collaborator>("/api/collaborators/check", { login })
      .then((c) => onChange((cur) => cur.map((x) => (x.login === login ? { ...x, status: c.status, avatarUrl: c.avatarUrl } : x))))
      .catch(() => {});
  };
  return (
    <div className="panel list-rows">
      {people.map((p) => (
        <div className="lr collab-row" key={p.login}>
          <Avatar person={p} />
          <span className="mono">{p.login}</span>
          <span className="spacer" />
          <button className="link-btn" aria-label={`Remove ${p.login}`} onClick={() => onChange(people.filter((x) => x !== p))}><XIcon size={12} /> Remove</button>
        </div>
      ))}
      <div className="add">
        <label htmlFor="add-collaborator">Add collaborator</label>
        <input id="add-collaborator" type="text" className={`mono-input ${errors["add-collaborator"] ? "invalid" : ""}`} placeholder="GitHub username"
               value={input} aria-invalid={Boolean(errors["add-collaborator"])}
               onChange={(e) => { setInput(e.target.value); setError("add-collaborator", null); }} onKeyDown={(e) => e.key === "Enter" && add()} />
        <FieldMessage message={errors["add-collaborator"]} />
        <div><button className="btn" onClick={add}><PlusIcon /> Add collaborator</button></div>
      </div>
    </div>
  );
}

function Avatar({ person }: { person: Collaborator }) {
  if (person.status === "not_found") {
    const text = `There's no GitHub user named ${person.login}`;
    return <span className="avatar missing" title={text} aria-label={text} role="img" tabIndex={0}><AlertIcon size={18} /></span>;
  }
  if (person.status === "ok" && person.avatarUrl) return <img className="avatar" src={person.avatarUrl} alt="" />;
  return <span className="avatar generic" aria-hidden="true"><UserIcon /></span>;
}

// ---------------------------------------------------------------------------
// Delete account (SET-17)
// ---------------------------------------------------------------------------

function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const remove = async () => {
    setBusy(true);
    await api.del("/api/account", { confirm: true });
    location.href = "/"; // SET-17: the home page
  };
  return (
    <div className="delete-panel">
      <div className="delete-head"><TrashIcon /> Delete account</div>
      <p>Deleting your account is permanent and cannot be reversed.</p>
      <button className="btn danger-solid" onClick={() => setOpen(true)}>Delete account</button>
      {open && (
        <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-labelledby="del-title"
             onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
          <div className="panel dialog">
            <h2 id="del-title">Delete your Gitilizer account? This can't be undone.</h2>
            <div className="dialog-actions">
              <button className="btn" onClick={() => setOpen(false)} autoFocus>Cancel</button>
              <button className="btn danger-solid" disabled={busy} onClick={remove}>Delete account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
