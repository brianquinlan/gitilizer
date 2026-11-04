// Settings (PRD "Settings", SET-1..31). Figma: "Settings" and "Settings · Errors".
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  MAX_COLLABORATORS, MAX_PROMPT_LENGTH, MAX_REPO_PROMPT_LENGTH, MAX_REPOS, MESSAGES, PROMPT_COUNT_FROM,
  parseLogin, parseRepo, repoControlId,
  type AdditionalRepo, type Collaborator, type CredentialKind, type CredentialStatus, type FieldError, type SettingsResponse,
} from "@gitilizer/shared";
import { api, ApiError } from "../api.ts";
import { DOCS_URL } from "../components/Chrome.tsx";
import { CredentialField, type Check } from "../components/CredentialField.tsx";
import {
  AlertIcon, FolderGitIcon, GitHubIcon, ListIcon, PlugIcon, PlusIcon, SparklesIcon, TrashIcon, UserIcon, UsersIcon, XCircleIcon, XIcon,
} from "../icons.tsx";
import { focusTarget, navigate, setNavigationGuard } from "../router.tsx";
import { useStore } from "../store.tsx";

type Draft = { repos: AdditionalRepo[]; collaborators: Collaborator[]; prompt: string };
type Errors = Record<string, string>;

const LEAVE_PROMPT = "Leave Settings? Your changes haven't been saved.";

export function SettingsPage() {
  const { me, refreshMe } = useStore();
  const [server, setServer] = useState<SettingsResponse | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [secrets, setSecrets] = useState<Record<CredentialKind, string>>({ github_pat: "", gemini_key: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    api.get<SettingsResponse>("/api/settings").then((s) => {
      setServer(s);
      setDraft({ repos: s.additionalRepos, collaborators: s.collaborators, prompt: s.customPrompt ?? s.defaultPrompt });
    });
  }, []);
  // Links from notifications and the empty list go to a control and focus it (NOTIF-9, LIST-14).
  useEffect(() => {
    if (server && location.hash) setTimeout(() => focusTarget(location.hash.slice(1)), 0);
  }, [server]);

  const dirty = useMemo(() => {
    if (!server || !draft) return false;
    return Boolean(secrets.github_pat || secrets.gemini_key)
      || JSON.stringify(draft.repos.map((r) => [r.fullName, r.prioritizationPrompt])) !== JSON.stringify(server.additionalRepos.map((r) => [r.fullName, r.prioritizationPrompt]))
      || JSON.stringify(draft.collaborators.map((c) => c.login)) !== JSON.stringify(server.collaborators.map((c) => c.login))
      || draft.prompt !== (server.customPrompt ?? server.defaultPrompt);
  }, [server, draft, secrets]);

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
        collaborators: draft.collaborators.map((c) => c.login),
        customPrompt: draft.prompt === server.defaultPrompt ? null : draft.prompt,
        credentials: Object.keys(credentials).length ? credentials : undefined,
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
            <p>Both credentials are required before Gitilizer can scan and rank your inbox.</p>
            <div className="stack">
              <CredentialCard kind="github_pat" icon={<GitHubIcon />} title="GitHub scanning token" label="Personal access token"
                purpose="A personal access token to read your issues, pull requests and comment activity."
                setup={{ text: "Create a token (it's free!)", href: "https://github.com/settings/personal-access-tokens/new" }}
                guidance={<>Grant read access to Issues, Pull Requests and Metadata for the repositories you want to scan.</>}
                learnMore={`${DOCS_URL}#github-tokens`}
                status={me.credentials.github_pat} value={secrets.github_pat} onChange={(v) => setSecrets({ ...secrets, github_pat: v })} />
              <CredentialCard kind="gemini_key" icon={<SparklesIcon />} title="Gemini API key" label="Gemini API key"
                purpose="Gemini scores each issue and PR to decide its rank."
                setup={{ text: "Get an API key (it's free!)", href: "https://aistudio.google.com/apikey" }}
                guidance={<>Used by Gemini to score and prioritize your issues and PRs.</>}
                status={me.credentials.gemini_key} value={secrets.gemini_key} onChange={(v) => setSecrets({ ...secrets, gemini_key: v })} />
            </div>
          </section>

          <section className="section" id="additional-repositories">
            <SectionHead n="02" title="Additional repositories" badge="Optional" />
            <p>Follow repositories beyond your assigned, created and @mention issues. Their open issues and PRs join the same list.</p>
            <RepoList repos={draft.repos} errors={allErrors} setError={setError}
                      onChange={(repos) => setDraft((d) => d && { ...d, repos: typeof repos === "function" ? repos(d.repos) : repos })} />
          </section>

          <section className="section" id="ranking-prompt-section">
            <SectionHead n="03" title="Ranking prompt" badge="Optional" />
            <p>The agent reads each issue's title, description, labels, comments and reviews and gives it a score.</p>
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
            <SectionHead n="04" title="Collaborators" badge="Optional" />
            <p>By default, issues, pull requests and comments made by your collaborators have higher priority.</p>
            <CollaboratorList people={draft.collaborators} errors={allErrors} setError={setError}
                              onChange={(c) => setDraft((d) => d && { ...d, collaborators: typeof c === "function" ? c(d.collaborators) : c })} />
          </section>

          {/* SET-14, SET-15: both save everything, credentials included; the notes are as in Figma. */}
          <div className="save-actions">
            {saveError && <div className="error-text" role="alert">{saveError}</div>}
            <div className="save-row">
              <button className="btn primary" disabled={blocked || saving} onClick={() => save(false)}>Save changes</button>
              <span>Save changes without re-ranking. Existing issues that are already ranked will not be re-ranked.</span>
            </div>
            <div className="save-row">
              <button className="btn" disabled={blocked || saving} onClick={() => save(true)}>Save and re-rank</button>
              <span>Save changes and re-rank every issue. This can use a lot of Gemini quota.</span>
            </div>
            <div className="save-row">
              <button className="btn" onClick={cancel}>Cancel</button>
              <span>Discard unsaved changes and return to the previous settings.</span>
            </div>
          </div>
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
  kind: CredentialKind; icon: ReactNode; title: string; label: string; purpose: string; guidance: ReactNode; learnMore?: string;
  setup: { text: string; href: string }; status: CredentialStatus; value: string; onChange: (v: string) => void;
}) {
  const [check, setCheck] = useState<Check>(null);
  useEffect(() => setCheck(null), [props.value]);
  const [chipClass, chipText] = CHIPS[props.status.chip];

  return (
    <div className="panel card">
      <div className="card-head">{props.icon}<h3>{props.title}</h3><span className={`badge ${chipClass}`}>{chipText}</span></div>
      <p className="purpose">{props.purpose}</p>
      <CredentialField kind={props.kind} label={props.label} setup={props.setup} guidance={props.guidance} learnMore={props.learnMore}
        saved={props.status.set} value={props.value} onChange={props.onChange} check={check} onCheck={setCheck} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Additional repositories (SET-7..9)
// ---------------------------------------------------------------------------

type Setter<T> = (v: T | ((prev: T) => T)) => void;

function accessView(r: AdditionalRepo): { className: string; text: string; title?: string } {
  const org = r.fullName.split("/")[0];
  switch (r.access) {
    case "ok": return { className: "ok", text: "Access confirmed" };
    case "checking": return { className: "", text: "Checking…" };
    case "archived": return { className: "", text: "Archived", title: `${r.fullName} is archived, so its issues and PRs aren't shown.` };
    case "not_found": return { className: "bad", text: "Can't access", title: `GitHub says ${r.fullName} doesn't exist, or your token can't read it. Check the name, and that your token includes this repository.` };
    case "sso_required": return { className: "bad", text: "Can't access", title: `${org} uses single sign-on. Authorize your token for ${org} in your GitHub token settings.` };
    case "token_type_blocked": return {
      className: "bad", text: "Can't access",
      title: `${org} doesn't allow ${r.tokenType ?? "this kind of"} tokens. Create the other kind of token, or ask an owner of ${org} to allow this one.`,
    };
  }
}

function RepoList({ repos, onChange, errors, setError }: {
  repos: AdditionalRepo[]; onChange: Setter<AdditionalRepo[]>; errors: Errors; setError: (f: string, m: string | null) => void;
}) {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const add = () => {
    const full = parseRepo(name);
    const err = !full ? MESSAGES.repoFormat
      : repos.some((r) => r.fullName.toLowerCase() === full.toLowerCase()) ? MESSAGES.repoDuplicate(full)
      : repos.length >= MAX_REPOS ? MESSAGES.repoLimit : null;
    setError("add-repository", err);
    if (err || !full) return;
    if (prompt.length > MAX_REPO_PROMPT_LENGTH) return;
    onChange([...repos, { fullName: full, prioritizationPrompt: prompt.trim(), access: "checking", tokenType: null }]);
    setName(""); setPrompt("");
    // Check access at once (SET-8). GitHub follows renames, so the row shows the current name.
    api.post<{ access: AdditionalRepo["access"]; fullName: string; tokenType: AdditionalRepo["tokenType"] }>("/api/repos/check", { fullName: full })
      .then((r) => onChange((cur) => cur.map((x) => (x.fullName === full ? { ...x, access: r.access, tokenType: r.tokenType, fullName: cur.some((y) => y !== x && y.fullName === r.fullName) ? x.fullName : r.fullName } : x))))
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
              <FolderGitIcon size={14} />
              <span className="mono">{r.fullName}</span>
              <span className="spacer" />
              <span className={`access ${a.className}`} title={a.title} tabIndex={a.title ? 0 : undefined}>
                {a.className === "bad" && <XCircleIcon size={12} />} {a.text}
              </span>
              <button className="link-btn" aria-label={`Remove ${r.fullName}`}
                      onClick={() => { onChange(repos.filter((x) => x !== r)); setError(rowId, null); }}><XIcon size={12} /> Remove</button>
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
      <p>Deleting your account is permanent and cannot be reversed. But don't worry about it too much, just save your prompt if it's complex.</p>
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
