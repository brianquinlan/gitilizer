// Warm Welcome (PRD "Warm Welcome", WEL-1..4). Figma: "Warm Welcome".
// Setup happens here: both credentials, checked and saved together by POST /api/setup (design D-12).
import { useRef, useState } from "react";
import { type CredentialKind, type SetupRequest, type SetupResponse } from "@gitilizer/shared";
import { api, ApiError } from "../api.ts";
import { DOCS_URL } from "../components/Chrome.tsx";
import { CredentialField, passed, type Check } from "../components/CredentialField.tsx";
import { ExternalIcon, InboxIcon } from "../icons.tsx";
import { navigate } from "../router.tsx";
import { useStore } from "../store.tsx";

const KINDS: CredentialKind[] = ["github_pat", "gemini_key"];

export function WelcomePage() {
  const { me, refreshMe } = useStore();
  const [values, setValues] = useState<Record<CredentialKind, string>>({ github_pat: "", gemini_key: "" });
  const [checks, setChecks] = useState<Record<CredentialKind, Check>>({ github_pat: null, gemini_key: null });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const latest = useRef(values);
  latest.current = values;
  if (!me) return null;

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
      const body: SetupRequest = { credentials: Object.fromEntries(typed.map((k) => [k, values[k]])) };
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
          <p className="intro">Add your GitHub scanning token and Gemini API key so Gitilizer can scan and rank your issues and PRs.</p>
        </div>
        <div className="welcome-fields">
          <div className="credential-field">
            <CredentialField {...field("github_pat")} label="GitHub scanning token"
              setup={{ text: "Create a token", href: "https://github.com/settings/personal-access-tokens/new" }}
              guidance={<>Gitilizer only needs read access to Issues, Pull Requests and Metadata for the repositories you want to
                scan. <a href={`${DOCS_URL}#github-tokens`} target="_blank" rel="noreferrer">Learn more <ExternalIcon /></a></>} />
          </div>
          <div className="credential-field">
            <CredentialField {...field("gemini_key")} label="Gemini API key"
              setup={{ text: "Get an API key", href: "https://aistudio.google.com/apikey" }}
              guidance={<>Used by Gemini to score and prioritize your issues and PRs.</>} />
          </div>
        </div>
        <div className="welcome-save">
          <button className="btn primary" onClick={save} disabled={!canSave}>Save</button>
          {saveError && <p className="field-error" role="alert">{saveError}</p>}
          <p className="save-note">You can update both credentials later in Settings.</p>
        </div>
      </div>
    </div>
  );
}
