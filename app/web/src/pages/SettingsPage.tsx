// Settings (PRD "Settings", SET-1..17). Figma: "Settings" frame; sections the
// Figma file lacks (repository filter, Collaborators, Delete account) follow the
// PRD's suggested answers (Q-41, Q-42, Q-46).
import { useEffect, useMemo, useState } from "react";
import {
  MAX_COLLABORATORS, MAX_REPOS, type Collaborator, type CredentialKind, type CredentialStatus, type InterestedRepo, type SettingsResponse,
} from "@gitilizer/shared";
import { api, ApiError } from "../api.ts";
import { CheckLine } from "../components/Chrome.tsx";
import { ExternalIcon } from "../icons.tsx";

import { useStore } from "../store.tsx";
import { relativeTime } from "../time.ts";

type Draft = { repos: InterestedRepo[]; collaborators: Collaborator[]; prompt: string };

function parseRepo(input: string): string | null {
  const s = input.trim().replace(/^https?:\/\/github\.com\//, "").replace(/\.git$/, "").replace(/\/$/, "");
  return /^[\w.-]+\/[\w.-]+$/.test(s) ? s : null;
}

export function SettingsPage() {
  const { me, refreshMe, sorts } = useStore();
  const [server, setServer] = useState<SettingsResponse | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [secrets, setSecrets] = useState<Record<CredentialKind, string>>({ github_pat: "", gemini_key: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const load = async () => {
    const s = await api.get<SettingsResponse>("/api/settings");
    setServer(s);
    setDraft({ repos: s.repos, collaborators: s.collaborators, prompt: s.customPrompt ?? s.defaultPrompt });
  };
  useEffect(() => { void load(); }, []);
  useEffect(() => { // scroll to the section in the URL (NOTIF-9 links)
    if (location.hash) setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView(), 100);
  }, [server]);

  const rankingDirty = useMemo(() => {
    if (!server || !draft) return false;
    const prompt = draft.prompt.trim() === server.defaultPrompt.trim() ? null : draft.prompt;
    return JSON.stringify(draft.repos.map((r) => [r.fullName, r.filter])) !== JSON.stringify(server.repos.map((r) => [r.fullName, r.filter]))
      || JSON.stringify(draft.collaborators.map((c) => c.login)) !== JSON.stringify(server.collaborators.map((c) => c.login))
      || (prompt ?? null) !== (server.customPrompt ?? null);
  }, [server, draft]);
  const dirty = rankingDirty || Boolean(secrets.github_pat || secrets.gemini_key);

  // Q-45 (assumed): ask before leaving with unsaved changes.
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  if (!me || !server || !draft) return null;

  const save = async () => {
    setSaving(true); setError(null); setSaved(null);
    try {
      for (const kind of ["github_pat", "gemini_key"] as const) {
        if (secrets[kind]) await api.put(`/api/credentials/${kind}`, { value: secrets[kind] });
      }
      let rerank = 0;
      if (rankingDirty) {
        const r = await api.put<{ rerankQueued: number }>("/api/settings", {
          repos: draft.repos.map(({ fullName, filter }) => ({ fullName, filter })),
          collaborators: draft.collaborators.map(({ login }) => ({ login })),
          customPrompt: draft.prompt.trim() === server.defaultPrompt.trim() ? null : draft.prompt,
          sortPrioritized: sorts?.prioritized ?? server.sortPrioritized,
          sortIcebox: sorts?.icebox ?? server.sortIcebox,
        });
        rerank = r.rerankQueued;
      }
      setSecrets({ github_pat: "", gemini_key: "" });
      await Promise.all([load(), refreshMe()]);
      setSaved(rerank ? `Saved. Re-ranking ${rerank} items.` : "Saved.");
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Couldn't save your changes");
    } finally {
      setSaving(false);
    }
  };

  const providerName = { google: "Google", github: "GitHub", dev: "development sign-in", local: "local mode" }[me.user.provider];

  return (
    <div>
      <h1 style={{ fontSize: 32, margin: "8px 0 6px" }}>Settings</h1>
      <p style={{ color: "var(--muted)", margin: "0 0 32px" }}>Connect your tools. Give your inbox the right context.</p>
      <div className="settings">
        <aside className="side">
          <div className="label">WORKSPACE</div>
          <a href="#connections">Connections</a>
          <a href="#repositories">Interested repositories</a>
          <a href="#collaborators">Collaborators</a>
          <a href="#ranking-prompt">Ranking prompt</a>
          <a href="#account">Account</a>
        </aside>
        <div>
          <section className="section" id="connections">
            <div className="section-head"><span className="n">01</span><h2>Connections</h2><span className="badge req">Required</span></div>
            <p>Both credentials are required before Gitilizer can scan and rank your inbox.</p>
            <div className="cards">
              <CredentialCard kind="gemini_key" title="Model API key" label="Gemini API key"
                purpose="Gemini reads each issue's context and gives it a score."
                setup={{ text: "Get an API key", href: "https://aistudio.google.com/apikey" }}
                guidance="Used only for ranking. Credentials are encrypted, never shown again after saving and never included in your ranking prompt."
                status={me.credentials.gemini_key} value={secrets.gemini_key} onChange={(v) => setSecrets({ ...secrets, gemini_key: v })} />
              <CredentialCard kind="github_pat" title="GitHub scanning token" label="Personal access token"
                purpose="A personal access token to read your issues, pull requests and comment activity."
                setup={{ text: "Create a token", href: "https://github.com/settings/personal-access-tokens/new" }}
                guidance="Grant read access to Issues, Pull requests and Metadata for the repositories you want to scan. App sign-in does not replace this token."
                status={me.credentials.github_pat} value={secrets.github_pat} onChange={(v) => setSecrets({ ...secrets, github_pat: v })} />
            </div>
          </section>

          <section className="section" id="repositories">
            <div className="section-head"><span className="n">02</span><h2>Interested repositories</h2><span className="badge">Optional</span></div>
            <p>Follow repositories beyond your assigned, created and @-mentioned issues. Their open issues and PRs join the same list.</p>
            <RepoList repos={draft.repos} onChange={(repos) => setDraft({ ...draft, repos })} />
          </section>

          <section className="section" id="collaborators">
            <div className="section-head"><span className="n">03</span><h2>Collaborators</h2><span className="badge">Optional</span></div>
            <p>Issues and PRs from these people get a higher priority.</p>
            <CollaboratorList people={draft.collaborators} onChange={(collaborators) => setDraft({ ...draft, collaborators })} />
          </section>

          <section className="section" id="ranking-prompt">
            <div className="section-head"><span className="n">04</span><h2>Ranking prompt</h2><span className="badge">Optional</span></div>
            <p>The agent reads each issue's title, description, labels, comments and reviews and gives it a score using these instructions.</p>
            <div className="panel editor">
              <div className="editor-head">
                <span>ranking-instructions.md</span>
                {draft.prompt.trim() !== server.defaultPrompt.trim() && (
                  <button className="link-btn" style={{ color: "var(--accent)" }} onClick={() => setDraft({ ...draft, prompt: server.defaultPrompt })}>Restore default</button>
                )}
              </div>
              <textarea id="prompt" aria-label="Ranking prompt" value={draft.prompt} onChange={(e) => setDraft({ ...draft, prompt: e.target.value })} />
            </div>
          </section>

          <section className="section" id="account">
            <div className="section-head"><span className="n">05</span><h2>Account</h2></div>
            <div className="panel card" style={{ marginTop: 16 }}>
              <div><strong>{me.user.name}</strong> · <span style={{ color: "var(--muted)" }}>{me.user.email}</span></div>
              <div style={{ color: "var(--muted)" }}>Signed in with {providerName}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={async () => { await api.post("/api/auth/logout"); location.href = "/sign-in"; }}>Log out</button>
                <DeleteAccount />
              </div>
            </div>
          </section>

          <div className="savebar">
            <div className="msg">
              {error ? <span className="error-text">{error}</span> : saved ? <strong>{saved}</strong> : <strong>Changes apply to your next ranking.</strong>}
              {/* Q-45 (assumed): say what a full re-rank costs before saving. */}
              {rankingDirty && <span>Saving re-ranks all {server.activeItemCount} items using your Gemini key.</span>}
            </div>
            <button className="btn" disabled={!dirty || saving} onClick={() => { setSecrets({ github_pat: "", gemini_key: "" }); void load(); }}>Cancel</button>
            <button className="btn primary" disabled={!dirty || saving} onClick={save}>{saving ? "Saving…" : "Save changes"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CredentialCard(props: {
  kind: CredentialKind; title: string; label: string; purpose: string; guidance: string;
  setup: { text: string; href: string }; status: CredentialStatus; value: string; onChange: (v: string) => void;
}) {
  const { status } = props;
  const [show, setShow] = useState(false);
  const [checking, setChecking] = useState(false);
  const [check, setCheck] = useState<{ ok: boolean; detail: string } | null>(null);
  useEffect(() => setCheck(null), [props.value]);
  const chip = { connected: ["ok", "Connected"], invalid: ["bad", "Not working"], unchecked: ["", "Not checked"], missing: ["", "Not set"] }[status.status];

  // Validate checks the typed value without saving it, or re-checks the saved one (SET-2).
  const validate = async () => {
    setChecking(true);
    try {
      if (props.value) setCheck(await api.post(`/api/credentials/${props.kind}/check`, { value: props.value }));
      else { const s = await api.post<CredentialStatus>(`/api/credentials/${props.kind}/validate`); setCheck({ ok: s.status === "connected", detail: s.detail ?? "" }); }
    } catch (e) {
      setCheck({ ok: false, detail: e instanceof ApiError ? e.message : "Couldn't check this value" });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="panel card">
      <div className="card-head"><h3>{props.title}</h3><span className={`badge ${chip[0]}`}>{chip[1]}</span></div>
      <p className="purpose">{props.purpose}</p>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <label htmlFor={`cred-${props.kind}`}>{props.label}</label>
        <a href={props.setup.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{props.setup.text} <ExternalIcon /></a>
      </div>
      <div className="field-row">
        {/* PRIV-1 + Q-37 (assumed): a saved value is never sent back, so it shows as dots and can only be replaced. */}
        <input id={`cred-${props.kind}`} type={show ? "text" : "password"} autoComplete="off" spellCheck={false}
               placeholder={status.set ? "•••• •••• •••• •••• (saved; type to replace)" : "Paste it here"}
               value={props.value} onChange={(e) => props.onChange(e.target.value)} />
        {props.value && <button className="btn" onClick={() => setShow(!show)} aria-pressed={show}>{show ? "Hide" : "Show"}</button>}
        <button className="btn" onClick={validate} disabled={checking || (!props.value && !status.set)}>{checking ? "Checking…" : "Validate"}</button>
      </div>
      {check ? <CheckLine ok={check.ok} text={check.ok ? `Valid${props.value ? " (not saved yet)" : ""} · ${check.detail}` : check.detail} />
        : status.validatedAt && <CheckLine ok={status.status === "connected"} text={`Validated ${relativeTime(status.validatedAt)} · ${status.detail}`} />}
      <p className="fine">{props.guidance}</p>
    </div>
  );
}

function RepoList({ repos, onChange }: { repos: InterestedRepo[]; onChange: (r: InterestedRepo[]) => void }) {
  const [input, setInput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const add = () => {
    const name = parseRepo(input);
    if (!name) return setErr("Enter a repository as owner/name, or paste its GitHub URL.");
    if (repos.some((r) => r.fullName.toLowerCase() === name.toLowerCase())) return setErr(`${name} is already in the list.`);
    if (repos.length >= MAX_REPOS) return setErr(`You can follow up to ${MAX_REPOS} repositories.`);
    onChange([...repos, { fullName: name, filter: "", access: "unknown" }]);
    setInput(""); setErr(null);
  };
  const accessText = { ok: "Access confirmed", not_found: "Not found or no access", no_access: "No access", unknown: "Not checked yet" };
  return (
    <div className="panel list-rows">
      {repos.map((r, i) => (
        <div className="lr" key={r.fullName}>
          <span className="mono">{r.fullName}</span>
          {/* SET-9: per-repository filter; Figma has no design for it (Q-41). */}
          <input type="text" aria-label={`What you care about in ${r.fullName}`} placeholder="Optional: what you care about here, e.g. “not responsible for http2”"
                 value={r.filter} onChange={(e) => onChange(repos.map((x, j) => (j === i ? { ...x, filter: e.target.value } : x)))} />
          <span className={`access ${r.access === "not_found" ? "bad" : ""}`}>{accessText[r.access]}</span>
          <button className="link-btn" onClick={() => onChange(repos.filter((_, j) => j !== i))}>✕ Remove</button>
        </div>
      ))}
      <div className="add">
        <input type="text" aria-label="Repository to add" placeholder="owner/repository" value={input}
               onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
        <button className="btn" onClick={add}>+ Add repository</button>
      </div>
      {err && <div className="error-text" style={{ padding: "0 16px 12px" }}>{err}</div>}
    </div>
  );
}

function CollaboratorList({ people, onChange }: { people: Collaborator[]; onChange: (p: Collaborator[]) => void }) {
  const [input, setInput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const add = () => {
    const login = input.trim().replace(/^@/, "");
    if (!/^[A-Za-z0-9-]{1,39}$/.test(login)) return setErr("Enter a GitHub username.");
    if (people.some((p) => p.login.toLowerCase() === login.toLowerCase())) return setErr(`@${login} is already in the list.`);
    if (people.length >= MAX_COLLABORATORS) return setErr(`You can add up to ${MAX_COLLABORATORS} collaborators.`);
    onChange([...people, { login, exists: null }]);
    setInput(""); setErr(null);
  };
  return (
    <div className="panel list-rows collab">
      {people.map((p, i) => (
        <div className="lr" key={p.login}>
          <span className="mono">@{p.login}</span>
          <span className={`access ${p.exists === false ? "bad" : ""}`}>{p.exists === null ? "Not checked yet" : p.exists ? "GitHub user found" : "No such GitHub user"}</span>
          <button className="link-btn" onClick={() => onChange(people.filter((_, j) => j !== i))}>✕ Remove</button>
        </div>
      ))}
      <div className="add">
        <input type="text" aria-label="Collaborator to add" placeholder="GitHub username" value={input}
               onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
        <button className="btn" onClick={add}>+ Add collaborator</button>
      </div>
      {err && <div className="error-text" style={{ padding: "0 16px 12px" }}>{err}</div>}
    </div>
  );
}

/** SET-17 with Q-46 (assumed): a dialog where the developer types "delete". */
function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const remove = async () => { await api.del("/api/account", { confirm: "delete" }); location.href = "/sign-in"; };
  return (
    <>
      <button className="btn danger" onClick={() => setOpen(true)}>Delete account</button>
      {open && (
        <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-labelledby="del-title">
          <div className="panel dialog">
            <h2 id="del-title">Delete your Gitilizer account?</h2>
            <p>This deletes your settings, saved credentials, Icebox and rankings. It can't be undone. Your GitHub data isn't affected.</p>
            <label htmlFor="del-confirm">Type <strong>delete</strong> to confirm</label>
            <input id="del-confirm" type="text" value={text} onChange={(e) => setText(e.target.value)} autoFocus />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn" onClick={() => { setOpen(false); setText(""); }}>Cancel</button>
              <button className="btn primary" style={{ background: "var(--error)", borderColor: "var(--error)" }} disabled={text !== "delete"} onClick={remove}>Delete account</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


