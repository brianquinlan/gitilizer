// Sign-in and Warm Welcome (PRD "Sign-in", "Warm Welcome").
import { useState } from "react";
import { api, ApiError } from "../api.ts";
import { InboxIcon, IssueIcon, PrIcon, SettingsIcon } from "../icons.tsx";
import { Link } from "../router.tsx";
import { BrandSymbol } from "../icons.tsx";

// The static preview on the sign-in page, as in Figma: unpadded ranks, repository names as reasons (LIST-3).
const PREVIEW: ["issue" | "pr", string, string][] = [
  ["issue", "Connection pool exhausted after database failover", "Issue #1842 · Assigned to you"],
  ["pr", "Retry failed webhooks with exponential backoff", "PR #731 · Assigned to you"],
  ["issue", "Token refresh fails in headless environments", "Issue #416 · Created by you"],
  ["pr", "Prevent duplicate events on reconnect", "PR #729 · @maya"],
  ["issue", "Session cookie expires during active use", "Issue #962 · northstar/web"],
  ["issue", "Document environment variable precedence", "Issue #408 · @maya"],
  ["pr", "Add keyboard navigation to command menu", "PR #955 · Assigned to you"],
  ["issue", "Missing trace context in background jobs", "Issue #1821 · northstar/api"],
  ["issue", "Support Node.js 24 in the release pipeline", "Issue #397 · Created by you"],
  ["issue", "Clarify workspace setup in onboarding", "Issue #918 · northstar/web"],
];

/** Failed sign-in messages (AUTH-10). Only "cancelled" is neutral; the rest are errors (AUTH-15). */
function signInMessage(error: string, provider: string | null): string {
  switch (error) {
    case "cancelled": return "Sign-in was cancelled. Choose an option below to try again.";
    case "provider_unavailable": return `${provider === "github" ? "GitHub" : "Google"} isn't responding right now. Try again in a few minutes.`;
    case "expired": return "Sign-in didn't finish. Try again, and make sure your browser allows cookies for gitilizer.com.";
    default: return "Something went wrong on our side. Try again. If it keeps happening, report it using the GitHub link below.";
  }
}

let signInError: { error: string; message: string } | null | undefined;

/** Reads ?error= once per page load and removes it, so a reload shows the plain page (AUTH-13). */
function useSignInError(): { error: string; message: string } | null {
  if (signInError === undefined) {
    const q = new URLSearchParams(location.search);
    const error = q.get("error");
    signInError = error ? { error, message: signInMessage(error, q.get("provider")) } : null;
    if (error) {
      q.delete("error");
      q.delete("provider");
      history.replaceState(null, "", `${location.pathname}${q.size ? `?${q}` : ""}`);
    }
  }
  return signInError;
}

export function SignInPage() {
  const [dev, setDev] = useState(false);
  const [name, setName] = useState("Brian Quinlan");
  const [email, setEmail] = useState("brian@sweetapp.com");
  const [error, setError] = useState<string | null>(null);
  const failed = useSignInError();
  const [notice, setNotice] = useState(failed);
  const start = () => { setNotice(null); setDev(true); }; // AUTH-13: starting another sign-in clears the notice
  const signIn = async () => {
    try {
      await api.post("/api/auth/dev", { name, email });
      const back = new URLSearchParams(location.search).get("next");
      location.href = back && back.startsWith("/") ? back : "/";
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Couldn't sign in");
    }
  };
  return (
    <main className="signin">
      <section className="signin-left">
        <div className="brand"><BrandSymbol /> gitilizer</div>
        <h1>Less triage.<br />More shipping.</h1>
        <p>View all of your GitHub issues and PRs, prioritized, in one place.</p>
        <div className="table preview" style={{ marginTop: 32 }} aria-hidden="true">
          <div className="tr thead" style={{ gridTemplateColumns: "72px 1fr" }}><span className="th active">Priority ↑</span><span className="th">Issue</span></div>
          {PREVIEW.map(([kind, title, meta], i) => (
            <div className={`tr ${i === 0 ? "top" : ""}`} key={title} style={{ gridTemplateColumns: "72px 1fr" }}>
              <span className={`rank ${i === 0 ? "first" : ""}`}>{i + 1}</span>
              <span className="issue">
                <span className={`kind ${kind}`}>{kind === "pr" ? <PrIcon /> : <IssueIcon />}</span>
                <span className="issue-text"><span className="issue-title">{title}</span><span className="issue-meta">{meta}</span></span>
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="signin-right">
        <div className="signin-box">
          <h2>Welcome to Gitilizer</h2>
          {/* Prototype: OAuth isn't configured, so both buttons open a development sign-in (design: HTTP API). */}
          {notice && <div className={`signin-notice ${notice.error === "cancelled" ? "" : "error"}`} role="alert">{notice.message}</div>}
          <button className="btn provider" onClick={start}><span style={{ color: "#4285F4", fontWeight: 700 }}>G</span> Continue with Google</button>
          <button className="btn provider dark" onClick={start}>Continue with GitHub</button>
          {dev && (
            <form className="panel card" onSubmit={(e) => { e.preventDefault(); void signIn(); }}>
              <strong>Development sign-in</strong>
              <label>Name<input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label>
              <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
              {error && <span className="error-text">{error}</span>}
              <button className="btn primary" type="submit">Sign in</button>
            </form>
          )}
          <div className="callout">
            <strong>Sign in first. Connect your tools next.</strong>
            You'll add a Gemini API key and a GitHub personal access token (don't worry, Gitilizer only needs read access) so that Gitilizer can scan and rank your issues and PRs.
          </div>
        </div>
      </section>
    </main>
  );
}

export function WelcomePage() {
  return (
    <div className="panel welcome">
      <div>
        <div className="symbol"><InboxIcon /></div>
        <h1>Welcome to your prioritized inbox</h1>
        <p>No prioritized issues yet. Add a Gemini API key and a GitHub personal access token (don't worry, Gitilizer only needs read access) in Settings so Gitilizer can scan and rank your issues and PRs.</p>
        <Link to="/settings#connections" className="btn primary" style={{ textDecoration: "none" }}><SettingsIcon /> Go to Settings →</Link>
      </div>
    </div>
  );
}
