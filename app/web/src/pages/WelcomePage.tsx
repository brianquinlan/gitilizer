// Warm Welcome (PRD "Warm Welcome", WEL-1..5). Figma: "Warm Welcome".
// Setup happens here: the GitHub token, the ranking agent and its key, checked and saved together by
// POST /api/setup (design D-12).
import { useRef, useState } from "react";
import { AGENT_INFO, RankingAgent, type CredentialKind, type SetupRequest, type SetupResponse } from "@gitilizer/shared";
import { api, ApiError } from "../api.ts";
import { DOCS_URL } from "../components/Chrome.tsx";
import { CredentialField, passed, type Check } from "../components/CredentialField.tsx";
import { InboxIcon } from "../icons.tsx";
import { navigate } from "../router.tsx";
import { useStore } from "../store.tsx";

const EMPTY = { github_pat: "", gemini_key: "", anthropic_key: "", openai_key: "" };

export function WelcomePage() {
  const { me, refreshMe } = useStore();
  // WEL-5: Gemini is chosen at first.
  const [agent, setAgent] = useState<RankingAgent>("gemini");
  const [values, setValues] = useState<Record<CredentialKind, string>>(EMPTY);
  const [checks, setChecks] = useState<Record<CredentialKind, Check>>({ github_pat: null, gemini_key: null, anthropic_key: null, openai_key: null });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const latest = useRef(values);
  latest.current = values;
  if (!me) return null;

  const info = AGENT_INFO[agent];
  const KINDS: CredentialKind[] = ["github_pat", info.kind];
  // Choosing another agent clears what was typed for the previous one, with its Validate result (WEL-5).
  const pick = (next: RankingAgent) => {
    if (next === agent) return;
    setValues((v) => ({ ...v, [info.kind]: "" }));
    setChecks((c) => ({ ...c, [info.kind]: null }));
    setAgent(next);
  };
  const onKey = (e: React.KeyboardEvent) => {
    const all = RankingAgent.options;
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = all[(all.indexOf(agent) + step + all.length) % all.length];
    pick(next);
    setTimeout(() => document.getElementById(`tile-${next}`)?.focus(), 0);
  };

  const present = (k: CredentialKind) => values[k].trim() !== "" || me.credentials[k].set;
  const checking = KINDS.some((k) => checks[k] === "checking");
  const canSave = KINDS.every(present) && !checking && !saving;

  // WEL-4: every typed value is checked (the server checks again, D-12); nothing is saved unless all pass.
  const save = async () => {
    const typed = KINDS.filter((k) => values[k].trim());
    const pending = typed.filter((k) => !passed(checks[k]));
    const sent = { ...values };
    setSaving(true);
    setSaveError(null);
    setChecks((c) => ({ ...c, ...Object.fromEntries(pending.map((k) => [k, "checking"])) }));
    try {
      const body: SetupRequest = { credentials: Object.fromEntries(typed.map((k) => [k, values[k]])), rankingAgent: agent };
      const r = await api.post<SetupResponse>("/api/setup", body);
      if (r.ok) {
        await refreshMe();
        navigate("/"); // the first-sync state of the Prioritized list
        return;
      }
      // Results for values that have since changed in the field are dropped.
      const same = typed.filter((k) => latest.current[k] === sent[k]);
      setChecks((c) => ({ ...c, ...Object.fromEntries(same.map((k) => [k, r.results[k] ?? null])) }));
    } catch (e) {
      setChecks((c) => ({ ...c, ...Object.fromEntries(pending.map((k) => [k, null])) }));
      if (e instanceof ApiError && e.status === 409) { // setup was completed in another tab (NAV-2)
        await refreshMe();
        navigate("/");
        return;
      }
      setSaveError("Couldn't save your credentials. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const field = (kind: CredentialKind) => ({
    kind,
    saved: me.credentials[kind].set,
    value: values[kind],
    onChange: (v: string) => setValues((s) => ({ ...s, [kind]: v })),
    check: checks[kind],
    onCheck: (c: Check) => setChecks((s) => ({ ...s, [kind]: c })),
  });

  return (
    <div className="panel welcome">
      <div className="welcome-body">
        <div className="symbol"><InboxIcon /></div>
        <div>
          <h1>Welcome to your prioritized inbox</h1>
          <p className="intro">Add your GitHub personal access token, then choose the AI that ranks your issues and PRs and add its API key.</p>
        </div>
        <div className="welcome-fields">
          <div className="credential-field">
            <CredentialField {...field("github_pat")} label="GitHub personal access token"
              setup={{ text: "Create a token", href: "https://github.com/settings/personal-access-tokens/new" }}
              guidance="Gitilizer only needs read access to issues, PRs and metadata for the repositories you want to scan."
              learnMore={`${DOCS_URL}#github-personal-access-tokens`} />
          </div>
          <fieldset className="agent-choice">
            <legend>Ranking agent</legend>
            <div className="agent-tiles" role="radiogroup" aria-label="Ranking agent" onKeyDown={onKey}>
              {RankingAgent.options.map((a) => (
                <button key={a} id={`tile-${a}`} type="button" role="radio" aria-checked={a === agent} tabIndex={a === agent ? 0 : -1}
                        className={`agent-tile ${a === agent ? "on" : ""}`} onClick={() => pick(a)}>
                  <span className="agent-name">{AGENT_INFO[a].name}</span>
                  <span className="agent-vendor">{AGENT_INFO[a].vendor}</span>
                  <span className={`pill ${AGENT_INFO[a].free ? "free" : "paid"}`}>{AGENT_INFO[a].free ? "Free tier available" : "Pay as you go"}</span>
                </button>
              ))}
            </div>
            <p className="fine">Not sure? Gemini’s free tier is the easiest way to try Gitilizer.</p>
          </fieldset>
          <div className="credential-field">
            <CredentialField key={agent} {...field(info.kind)} label={`${info.name} API key`} setup={info.setup}
              guidance={`Used by ${info.name} to score and prioritize your issues and PRs.`}
              learnMore={`${DOCS_URL}#${info.docs}`} />
          </div>
        </div>
        <div className="welcome-save">
          <button className="btn primary" onClick={save} disabled={!canSave}>Save</button>
          {saveError && <p className="field-error" role="alert">{saveError}</p>}
          <p className="save-note">You can change these later in Settings.</p>
        </div>
      </div>
    </div>
  );
}
