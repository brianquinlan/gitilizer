// Warm Welcome (PRD "Warm Welcome", WEL-1..6). Figma: "Warm Welcome", "Warm Welcome · Connected" and
// "Warm Welcome · Connected · Key entered".
// Setup takes two steps. Step 1 connects GitHub: "Connect GitHub" saves the connection on its own
// (SET-43), and "Advanced setup" opens Settings for everything else. Step 2 offers a Gemini API key and one
// button: with a key it is checked and saved, and Gemini ranks; without one, basic ranking does
// (RANK-21). POST /api/setup does either (design D-12).
import { useRef, useState } from "react";
import { AGENT_INFO, BASIC_INFO, type SetupRequest, type SetupResponse } from "@gitilizer/shared";
import { api, ApiError } from "../api.ts";
import { DOCS_URL } from "../components/Chrome.tsx";
import { CredentialField, passed, type Check } from "../components/CredentialField.tsx";
import { AccessNote, Avatar, ConnectLink, ConnectResult, useConnectResult } from "../components/GitHubConnection.tsx";
import { CheckCircleIcon, ExternalIcon, InboxIcon } from "../icons.tsx";
import { Link, navigate } from "../router.tsx";
import { useStore } from "../store.tsx";

const GEMINI = AGENT_INFO.gemini;

export function WelcomePage() {
  const { me, refreshMe } = useStore();
  const [key, setKey] = useState("");
  const [check, setCheck] = useState<Check>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const latest = useRef(key);
  latest.current = key;
  const connectResult = useConnectResult();
  if (!me) return null;
  // WEL-2: step 2 once GitHub is connected, with the Gitilizer app or with a token saved in Settings.
  const connected = me.github.method !== null;
  const saved = me.credentials.gemini_key.set;
  // WEL-4: the button's label follows the key field; a saved key counts as a value.
  const hasKey = key.trim() !== "" || saved;

  const finish = async () => {
    const typed = key.trim();
    const sent = key;
    setSaving(true);
    setSaveError(null);
    if (typed && !passed(check)) setCheck("checking");
    try {
      const body: SetupRequest = { credentials: typed ? { gemini_key: typed } : {} };
      const r = await api.post<SetupResponse>("/api/setup", body);
      if (r.ok) {
        await refreshMe();
        navigate("/"); // the first-sync state of the Prioritized list
        return;
      }
      // A result for a value that has since changed in the field is dropped.
      if (latest.current === sent) setCheck(r.results.gemini_key ?? null);
    } catch (e) {
      setCheck((c) => (c === "checking" ? null : c));
      if (e instanceof ApiError && e.status === 409) { // setup was completed in another tab (NAV-2)
        await refreshMe();
        navigate("/");
        return;
      }
      setSaveError("Couldn't finish setup. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="panel welcome">
      <div className="welcome-body">
        <div className="symbol"><InboxIcon /></div>
        <div>
          <h1>Welcome to your prioritized inbox</h1>
          <p className="intro">Connect GitHub to get started. Add a free Gemini API key for the best ranking, or skip it for now.</p>
        </div>
        {connected ? (
          <>
            <div className="welcome-fields">
              <div className="credential-field github-connection">
                <div className="field-label"><label>GitHub</label></div>
                <div className="connected-box">
                  <div className="who">
                    <Avatar url={me.github.avatarUrl} login={me.github.login} size={28} />
                    <span className="name">{me.github.login ? <>Connected as <strong>@{me.github.login}</strong></> : "Connected with a personal access token"}</span>
                    <span className="state"><CheckCircleIcon /> Connected</span>
                  </div>
                  <div className="lines">
                    <div><span className="k">Public repositories</span><span>Included</span></div>
                    {/* The Gitilizer app's page: not for a connection made with a token (WEL-6, SET-45). */}
                    {me.github.method === "app" && me.github.installUrl && (
                      <div><span className="k">Private repositories</span>
                        <a className="fine-link" href={me.github.installUrl} target="_blank" rel="noreferrer">Add on GitHub <ExternalIcon /></a></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="credential-field">
                <CredentialField kind={GEMINI.kind} label={`${GEMINI.name} API key`} setup={GEMINI.setup}
                  pills={<><span className="pill recommended">Recommended</span><span className="pill free">Free tier available</span></>}
                  placeholder="Paste your key, or leave blank"
                  guidance={BASIC_INFO.welcomeGuidance} learnMore={`${DOCS_URL}#${BASIC_INFO.docs}`} learnMoreText={BASIC_INFO.compareWelcome}
                  saved={saved} value={key} onChange={setKey} check={check} onCheck={setCheck} />
              </div>
            </div>
            <div className="welcome-save">
              <div className="welcome-finish">
                <button className="btn primary" onClick={finish} disabled={saving || check === "checking"} aria-describedby={hasKey ? undefined : "finish-note"}>
                  {hasKey ? "Save and start" : "Continue with basic ranking"}
                </button>
                {!hasKey && <span className="save-note" id="finish-note">You can add a key anytime in Settings.</span>}
              </div>
              {saveError && <p className="field-error" role="alert">{saveError}</p>}
            </div>
          </>
        ) : (
          <div className="welcome-fields">
            <div className="credential-field github-connection">
              <div className="field-label">
                <label>GitHub</label>
                <a href={`${DOCS_URL}#connecting-github`} target="_blank" rel="noreferrer">What Gitilizer can read <ExternalIcon /></a>
              </div>
              {me.github.app ? (
                <>
                  <ConnectLink next="/" kind="dark">Connect GitHub</ConnectLink>
                  <ConnectResult result={connectResult} />
                  <AccessNote />
                </>
              ) : (
                // A server without the Gitilizer app, such as a developer's own: only a token can connect it.
                <p className="fine">This server has no Gitilizer GitHub app to connect with. Add a personal access token in Advanced setup.</p>
              )}
            </div>
            <div className="welcome-advanced">
              <span>Using Claude, OpenAI or a personal access token?</span>
              <Link to="/settings/connections">Advanced setup</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
