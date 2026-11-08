// Settings (PRD "Settings", SET-1..37). Figma: "Settings" and "Settings · Errors".
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AGENT_INFO, MAX_COLLABORATORS, MAX_EXCLUSIONS, MAX_PROMPT_LENGTH, MAX_REPO_PROMPT_LENGTH, MAX_REPOS, MESSAGES, PROMPT_COUNT_FROM, RankingAgent,
  conflictFields, credentialControlId, exclusionControlId, exclusionNote, parseExclusion, parseLogin, parseRepo, repoControlId,
  type AdditionalRepo, type AgentKeyKind, type Collaborator, type CredentialKind, type CredentialStatus, type ExcludedRepo, type FieldError,
  type Me, type SettingsResponse,
} from "@gitilizer/shared";
import { api, ApiError } from "../api.ts";
import { DOCS_URL } from "../components/Chrome.tsx";
import { CredentialField, type Check } from "../components/CredentialField.tsx";
import {
  AlertIcon, EyeOffIcon, FolderGitIcon, GitHubIcon, ListIcon, PlugIcon, PlusIcon, SparklesIcon, TrashIcon, UserIcon, UsersIcon, XCircleIcon, XIcon,
} from "../icons.tsx";
import { focusTarget, navigate, setNavigationGuard } from "../router.tsx";
import { useStore } from "../store.tsx";

type Draft = { repos: AdditionalRepo[]; exclusions: ExcludedRepo[]; collaborators: Collaborator[]; prompt: string };
type Errors = Record<string, string>;

const LEAVE_PROMPT = "Leave Settings? Your changes haven't been saved.";

export function SettingsPage() {
  const { me, refreshMe } = useStore();
  const [server, setServer] = useState<SettingsResponse | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [secrets, setSecrets] = useState<Record<CredentialKind, string>>({ github_pat: "", gemini_key: "", anthropic_key: "", openai_key: "" });
  // The agent chosen in the picker, and saved keys the developer removed (SET-38, SET-39). Both take effect on save.
  const [agent, setAgent] = useState<RankingAgent>("gemini");
  const [removals, setRemovals] = useState<AgentKeyKind[]>([]);
  const [switching, setSwitching] = useState(false); // the switch dialog (SET-40)
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    api.get<SettingsResponse>("/api/settings").then((s) => {
      setServer(s);
      setAgent(s.rankingAgent);
      setDraft({ repos: s.additionalRepos, exclusions: s.excludedRepos, collaborators: s.collaborators, prompt: s.customPrompt ?? s.defaultPrompt });
    });
  }, []);
  // Links from notifications and the empty list go to a control and focus it (NOTIF-9, LIST-14).
  useEffect(() => {
    if (server && location.hash) setTimeout(() => focusTarget(location.hash.slice(1)), 0);
  }, [server]);

  const dirty = useMemo(() => {
    if (!server || !draft) return false;
    return Object.values(secrets).some(Boolean) || agent !== server.rankingAgent || removals.length > 0
      || JSON.stringify(draft.repos.map((r) => [r.fullName, r.prioritizationPrompt])) !== JSON.stringify(server.additionalRepos.map((r) => [r.fullName, r.prioritizationPrompt]))
      || JSON.stringify(draft.exclusions.map((e) => e.name)) !== JSON.stringify(server.excludedRepos.map((e) => e.name))
      || JSON.stringify(draft.collaborators.map((c) => c.login)) !== JSON.stringify(server.collaborators.map((c) => c.login))
      || draft.prompt !== (server.customPrompt ?? server.defaultPrompt);
  }, [server, draft, secrets, agent, removals]);

  // SET-26: leaving with unsaved changes asks first, through links, Back and closing the tab.
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;
  useEffect(() => {
    setNavigationGuard(() => !dirtyRef.current || window.confirm(LEAVE_PROMPT));
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

  const setError = (field: string, message: string | null) =>
    setErrors((e) => { const n = { ...e }; if (message) n[field] = message; else delete n[field]; return n; });

  const save = async (rerank: boolean) => {
    setSaving(true);
    setSaveError(null);
    try {
      const credentials = Object.fromEntries(Object.entries(secrets).filter(([, v]) => v.trim()));
      await api.put("/api/settings", {
        additionalRepos: draft.repos.map(({ fullName, prioritizationPrompt }) => ({ fullName, prioritizationPrompt })),
        excludedRepos: draft.exclusions.map((e) => e.name),
        collaborators: draft.collaborators.map((c) => c.login),
        customPrompt: draft.prompt === server.defaultPrompt ? null : draft.prompt,
        credentials: Object.keys(credentials).length ? credentials : undefined,
        rankingAgent: agent,
        removeCredentials: removals,
        rerank,
      });
      await refreshMe();
      dirtyRef.current = false;
      navigate("/"); // NAV-8
    } catch (e) {
      if (e instanceof ApiError && e.status === 422 && e.body?.errors) {
        // Shown next to their fields; the page scrolls to the first one (SET-27).
        const errs = e.body.errors as FieldError[];
        setErrors(Object.fromEntries(errs.map((x) => [x.field, x.message])));
        setTimeout(() => focusTarget(errs[0].field), 0);
      } else {
        setSaveError(e instanceof ApiError ? e.message : "Couldn't save your changes. Try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => { dirtyRef.current = false; navigate("/"); }; // NAV-9

  const agentKind = AGENT_INFO[agent].kind;
  const agentField = credentialControlId(agentKind);
  // SET-38: choosing another agent clears what was typed for the previous one, with its result or error.
  const pick = (next: RankingAgent) => {
    if (next === agent) return;
    setSecrets((s) => ({ ...s, [agentKind]: "" }));
    setError(agentField, null);
    setAgent(next);
  };
  // SET-27: an agent needs a key, saved or typed. SET-40: "Save changes" with a different agent asks first,
  // when the agent in use has scored items in the list.
  const requestSave = (rerank: boolean) => {
    const hasKey = secrets[agentKind].trim() !== "" || (me.credentials[agentKind].set && !removals.includes(agentKind));
    if (!hasKey) {
      setError(agentField, MESSAGES.agentKeyMissing(agent));
      setTimeout(() => focusTarget(agentField), 0);
      return;
    }
    if (!rerank && agent !== server.rankingAgent && (server.rankedBy[server.rankingAgent] ?? 0) > 0) {
      setSwitching(true);
      return;
    }
    void save(rerank);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <p className="lede">Connect your tools. Give your inbox the right context.</p>
      <div className="settings">
        <aside className="side">
          <div className="label">WORKSPACE</div>
          <nav className="side-nav" aria-label="Settings sections">
            <a href="#connections" onClick={jump("connections")}><PlugIcon /> Connections</a>
            <a href="#additional-repositories" onClick={jump("additional-repositories")}><FolderGitIcon /> Additional repositories</a>
            <a href="#excluded-repositories" onClick={jump("excluded-repositories")}><EyeOffIcon /> Excluded repositories</a>
            <a href="#ranking-prompt" onClick={jump("ranking-prompt-section")}><ListIcon /> Ranking prompt</a>
            <a href="#collaborators" onClick={jump("collaborators")}><UsersIcon /> Collaborators</a>
          </nav>
          <hr />
          <div className="account" id="account">
            <div className="label">YOUR ACCOUNT</div>
            <strong>{me.user.name}</strong>
            <span className="small">{me.user.email}</span>
            <span className="small">{me.user.provider === "github" ? <GitHubIcon size={12} /> : null} Signed in with {providerName(me.user.provider)}</span>
            {/* SET-16, ACCT-5: "Sign out", with no arrow. */}
            <button className="link-btn plain" onClick={async () => { await api.post("/api/auth/logout"); location.href = "/sign-in"; }}>Sign out</button>
          </div>
          <DeleteAccount />
        </aside>

        <div className="settings-main">
          <section className="section" id="connections">
            <SectionHead n="01" title="Connections" badge="Required" />
            <p>Gitilizer needs a GitHub token, and an API key for the ranking agent you choose, before it can scan and rank your inbox.</p>
            <div className="stack">
              <CredentialCard kind="github_pat" icon={<GitHubIcon />} title="GitHub" label="Personal access token"
                setup={{ text: "Create a token", href: "https://github.com/settings/personal-access-tokens/new" }}
                guidance={<>Grant read access to issues, PRs and metadata for the repositories you want to scan.</>}
                learnMore={`${DOCS_URL}#github-personal-access-tokens`}
                status={me.credentials.github_pat} value={secrets.github_pat} onChange={(v) => setSecrets({ ...secrets, github_pat: v })} />
              <AgentCard agent={agent} inUse={server.rankingAgent} credentials={me.credentials} removals={removals}
                value={secrets[agentKind]} error={allErrors[agentField]} onPick={pick}
                onChange={(v) => { setSecrets({ ...secrets, [agentKind]: v }); setError(agentField, null); }}
                onRemove={(kind) => setRemovals((r) => [...r, kind])} />
            </div>
          </section>

          <section className="section" id="additional-repositories">
            <SectionHead n="02" title="Additional repositories" badge="Optional" />
            <p>Follow repositories beyond your assigned, created and @mention issues and PRs. Their open issues and PRs join the same list.</p>
            <RepoList repos={draft.repos} excluded={draft.exclusions} errors={allErrors} setError={setError}
                      onChange={(repos) => setDraft((d) => d && { ...d, repos: typeof repos === "function" ? repos(d.repos) : repos })} />
          </section>

          <section className="section" id="excluded-repositories">
            <SectionHead n="03" title="Excluded repositories" badge="Optional" />
            <p>Issues and PRs from these never appear in your list, even when you're assigned, asked to review or @-mentioned. Gitilizer doesn't scan or rank them.</p>
            <ExclusionList items={draft.exclusions} additional={draft.repos.map((r) => r.fullName)} errors={allErrors} setError={setError}
                           onChange={(x) => setDraft((d) => d && { ...d, exclusions: typeof x === "function" ? x(d.exclusions) : x })} />
          </section>

          <section className="section" id="ranking-prompt-section">
            <SectionHead n="04" title="Ranking prompt" badge="Optional" />
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

          <section className="section" id="collaborators">
            <SectionHead n="05" title="Collaborators" badge="Optional" />
            <p>By default, issues, PRs and comments made by your collaborators have higher priority.</p>
            <CollaboratorList people={draft.collaborators} errors={allErrors} setError={setError}
                              onChange={(c) => setDraft((d) => d && { ...d, collaborators: typeof c === "function" ? c(d.collaborators) : c })} />
          </section>

          {/* SET-14, SET-15: both save everything, credentials included; the notes are as in Figma. */}
          <div className="save-actions">
            {saveError && <div className="error-text" role="alert">{saveError}</div>}
            <div className="save-row">
              <button className="btn primary" disabled={blocked || saving} onClick={() => requestSave(false)}>Save changes</button>
              <span>Save changes without re-ranking. Existing issues and PRs that are already ranked will not be re-ranked.</span>
            </div>
            <div className="save-row">
              <button className="btn" disabled={blocked || saving} onClick={() => requestSave(true)}>Save and re-rank</button>
              <span>Save changes and re-rank every issue and PR. This can use a lot of your ranking agent’s quota or credits.</span>
            </div>
            <div className="save-row">
              <button className="btn" onClick={cancel}>Cancel</button>
              <span>Discard unsaved changes and return to your list.</span>
            </div>
          </div>
          {switching && (
            <SwitchDialog from={server.rankingAgent} to={agent} n={server.rankedBy[server.rankingAgent] ?? 0}
              onCancel={() => setSwitching(false)} onSwitch={(rerank) => { setSwitching(false); void save(rerank); }} />
          )}
        </div>
      </div>
    </div>
  );
}

/** Section links scroll within the page and keep the URL fragment (NAV-3). */
const jump = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  history.replaceState(null, "", `#${e.currentTarget.getAttribute("href")!.slice(1)}`);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function providerName(p: string) {
  return ({ google: "Google", github: "GitHub", dev: "a development account", local: "local mode" } as Record<string, string>)[p] ?? p;
}

function SectionHead({ n, title, badge }: { n: string; title: string; badge: string }) {
  return (
    <div className="section-head"><span className="n">{n}</span><h2>{title}</h2><span className={`badge ${badge === "Required" ? "req" : ""}`}>{badge}</span></div>
  );
}

function FieldMessage({ id, message }: { id?: string; message?: string }) {
  return message ? <div className="field-error" id={id} role="alert">{message}</div> : null;
}

// ---------------------------------------------------------------------------
// Credentials (SET-1..6, SET-20, SET-21, SET-28, SET-30)
// ---------------------------------------------------------------------------

const CHIPS: Record<CredentialStatus["chip"], [string, string]> = {
  not_set: ["", "Not set"], connected: ["ok", "Connected"], not_working: ["bad", "Not working"], expires_soon: ["warn", "Expires soon"],
};

function CredentialCard(props: {
  kind: CredentialKind; icon: ReactNode; title: string; label: string; guidance: ReactNode; learnMore: string;
  setup: { text: string; href: string }; status: CredentialStatus; value: string; onChange: (v: string) => void;
}) {
  const [check, setCheck] = useState<Check>(null);
  useEffect(() => setCheck(null), [props.value]);
  const [chipClass, chipText] = CHIPS[props.status.chip];

  return (
    <div className="panel card">
      <div className="card-head">{props.icon}<h3>{props.title}</h3><span className={`badge ${chipClass}`}>{chipText}</span></div>
      <CredentialField kind={props.kind} label={props.label} setup={props.setup} guidance={props.guidance} learnMore={props.learnMore}
        saved={props.status.set} value={props.value} onChange={props.onChange} check={check} onCheck={setCheck} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ranking agent (SET-1, SET-4, SET-32, SET-38 to SET-41)
// ---------------------------------------------------------------------------

const AGENTS = RankingAgent.options;

function AgentCard(props: {
  agent: RankingAgent; inUse: RankingAgent; credentials: Me["credentials"]; removals: AgentKeyKind[];
  value: string; error?: string; onPick: (a: RankingAgent) => void; onChange: (v: string) => void; onRemove: (k: AgentKeyKind) => void;
}) {
  const info = AGENT_INFO[props.agent];
  const removed = props.removals.includes(info.kind);
  const status: CredentialStatus = removed ? { set: false, chip: "not_set", expiresAt: null } : props.credentials[info.kind];
  const [check, setCheck] = useState<Check>(null);
  useEffect(() => setCheck(null), [props.value, props.agent]);
  const [chipClass, chipText] = CHIPS[status.chip];
  // SET-39: other agents with a saved key; the one in use can't be removed.
  const others = AGENTS.filter((a) => a !== props.agent && props.credentials[AGENT_INFO[a].kind].set && !props.removals.includes(AGENT_INFO[a].kind));
  // Arrow keys move between the choices, as in any radio group.
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = AGENTS[(AGENTS.indexOf(props.agent) + step + AGENTS.length) % AGENTS.length];
    props.onPick(next);
    setTimeout(() => document.getElementById(`agent-${next}`)?.focus(), 0);
  };

  return (
    <div className="panel card">
      <div className="card-head"><SparklesIcon /><h3>Ranking agent</h3><span className={`badge ${chipClass}`}>{chipText}</span></div>
      <div className="agent-picker" role="radiogroup" aria-label="Ranking agent" onKeyDown={onKey}>
        {AGENTS.map((a) => (
          <button key={a} id={`agent-${a}`} type="button" role="radio" aria-checked={a === props.agent} tabIndex={a === props.agent ? 0 : -1}
                  className={a === props.agent ? "on" : ""} onClick={() => props.onPick(a)}>
            <span className="agent-name">{AGENT_INFO[a].name}</span>
            <span className="agent-tag">{AGENT_INFO[a].tag}</span>
          </button>
        ))}
      </div>
      <CredentialField key={props.agent} kind={info.kind} label={`${info.name} API key`} setup={info.setup}
        guidance={<>Used by {info.name} to score and prioritize your issues and PRs.</>} learnMore={`${DOCS_URL}#${info.docs}`}
        saved={status.set} value={props.value} onChange={props.onChange} check={check} onCheck={setCheck} error={props.error}
        notes={
          <div className="agent-notes">
            <div><span className="label">Billing</span>{info.billing}</div>
            <div><span className="label">Typical cost</span>{info.cost}</div>
          </div>
        } />
      {others.map((a) => (
        <p className="fine other-key" key={a}>
          Your {AGENT_INFO[a].name} key stays saved, so you can switch back without pasting it again.
          {a !== props.inUse && <> <button type="button" className="link-btn plain inline" onClick={() => props.onRemove(AGENT_INFO[a].kind)}>Remove {AGENT_INFO[a].name} key</button></>}
        </p>
      ))}
    </div>
  );
}

/** Asked before "Save changes" switches agents (SET-40). */
function SwitchDialog(props: { from: RankingAgent; to: RankingAgent; n: number; onCancel: () => void; onSwitch: (rerank: boolean) => void }) {
  const from = AGENT_INFO[props.from].name;
  const to = AGENT_INFO[props.to].name;
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

function accessView(r: AdditionalRepo): { className: string; text: string; title?: string } {
  const org = r.fullName.split("/")[0];
  switch (r.access) {
    case "ok": return { className: "ok", text: "Access confirmed" };
    case "checking": return { className: "", text: "Checking…" };
    case "archived": return { className: "", text: "Archived", title: `${r.fullName} is archived, so its issues and PRs aren't shown.` };
    case "not_found": return { className: "bad", text: "Can't access", title: `GitHub says ${r.fullName} doesn't exist, or your token can't read it. Check the name, and that your token includes this repository.` };
    case "sso_required": return { className: "bad", text: "Can't access", title: `${org} uses single sign-on. Authorize your token for ${org} in your GitHub personal access token settings.` };
    case "token_type_blocked": return {
      className: "bad", text: "Can't access",
      title: `${org} doesn't allow ${r.tokenType ?? "this kind of"} tokens. Create the other kind of token, or ask an owner of ${org} to allow this one.`,
    };
  }
}

function RepoList({ repos, excluded, onChange, errors, setError }: {
  repos: AdditionalRepo[]; excluded: ExcludedRepo[]; onChange: Setter<AdditionalRepo[]>; errors: Errors; setError: (f: string, m: string | null) => void;
}) {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const add = () => {
    const full = parseRepo(name);
    const err = !full ? MESSAGES.repoFormat
      : repos.some((r) => r.fullName.toLowerCase() === full.toLowerCase()) ? MESSAGES.repoDuplicate(full)
      : excluded.some((e) => e.kind === "repo" && e.name.toLowerCase() === full.toLowerCase()) ? MESSAGES.repoIsExcluded(full) // SET-35
      : repos.length >= MAX_REPOS ? MESSAGES.repoLimit : null;
    setError("add-repository", err);
    if (err || !full) return;
    if (prompt.length > MAX_REPO_PROMPT_LENGTH) return;
    onChange([...repos, { fullName: full, prioritizationPrompt: prompt.trim(), access: "checking", tokenType: null, ownerAvatarUrl: null, ownerType: null }]);
    setName(""); setPrompt("");
    // Check access at once (SET-8). GitHub follows renames, so the row shows the current name.
    api.post<Omit<AdditionalRepo, "prioritizationPrompt">>("/api/repos/check", { fullName: full })
      .then((r) => onChange((cur) => cur.map((x) => (x.fullName === full ? {
        ...x, access: r.access, tokenType: r.tokenType, ownerAvatarUrl: r.ownerAvatarUrl, ownerType: r.ownerType,
        fullName: cur.some((y) => y !== x && y.fullName === r.fullName) ? x.fullName : r.fullName,
      } : x))))
      .catch(() => {});
  };
  const promptError = prompt.length > MAX_REPO_PROMPT_LENGTH ? MESSAGES.repoPromptLength(prompt.length) : undefined;
  useEffect(() => setError("add-repository-prompt", promptError ?? null), [promptError]);
  return (
    <div className="panel list-rows">
      {repos.map((r) => {
        const a = accessView(r);
        const rowId = repoControlId(r.fullName);
        return (
          <div className="lr repo-row" key={r.fullName} id={rowId}>
            <div className="lr-main">
              <OwnerAvatar url={r.access === "ok" || r.access === "archived" ? r.ownerAvatarUrl : null} type={r.ownerType} />
              <span className="mono">{r.fullName}</span>
              <span className="spacer" />
              <span className={`access ${a.className}`} title={a.title} tabIndex={a.title ? 0 : undefined}>
                {a.className === "bad" && <XCircleIcon size={12} />} {a.text}
              </span>
              <button className="link-btn" aria-label={`Remove ${r.fullName}`}
                      onClick={() => { onChange(repos.filter((x) => x !== r)); setError(rowId, null); clearConflict(errors, setError, r.fullName); }}><XIcon size={12} /> Remove</button>
            </div>
            {r.prioritizationPrompt && (
              <div className="lr-prompt"><span className="caption">Prioritization prompt</span><span className="mono">{r.prioritizationPrompt}</span></div>
            )}
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
        <label htmlFor="add-repository-prompt">Prioritization prompt</label>
        <textarea id="add-repository-prompt" className={promptError ? "invalid" : ""} rows={3} value={prompt} aria-invalid={Boolean(promptError)}
                  placeholder="Prioritize security reviews, production failures and blocked teammates. Include recent comments and reviews in the ranking context."
                  onChange={(e) => setPrompt(e.target.value)} />
        <FieldMessage message={promptError} />
        <div><button className="btn" onClick={add} disabled={Boolean(promptError)}><PlusIcon /> Add repository</button></div>
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

function exclusionStatus(e: ExcludedRepo): { className: string; text: string; title?: string } {
  if (e.status === "checking") return { className: "", text: "Checking…" };
  if (e.status === "not_found") {
    return { className: "bad", text: "Not found", title: `GitHub says ${e.name} doesn't exist, or your token can't read it. If the name is misspelled, remove it and add it again.` };
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

function ExclusionList({ items, additional, onChange, errors, setError }: {
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
        const st = exclusionStatus(e);
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
    location.href = "/sign-in";
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
