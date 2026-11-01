// Sign-in and Warm Welcome (PRD "Sign-in", "Warm Welcome").
import { useState } from "react";
import { api, ApiError } from "../api.ts";
import { InboxIcon, IssueIcon, PrIcon, SettingsIcon } from "../icons.tsx";
import { Link } from "../router.tsx";
import { BrandSymbol } from "../icons.tsx";

const PREVIEW: [string, "issue" | "pr", string, string][] = [
  ["01", "issue", "Connection pool exhausted after database failover", "Issue #1842 · Assigned to you"],
  ["02", "pr", "Retry failed webhooks with exponential backoff", "PR #731 · Assigned to you"],
  ["03", "issue", "Token refresh fails in headless environments", "Issue #416 · Created by you"],
  ["04", "pr", "Prevent duplicate events on reconnect", "PR #729 · @maya"],
  ["05", "issue", "Session cookie expires during active use", "Issue #962 · Interested repository"],
];

export function SignInPage() {
  const [dev, setDev] = useState(false);
  const [name, setName] = useState("Brian Quinlan");
  const [email, setEmail] = useState("brian@sweetapp.com");
  const [error, setError] = useState<string | null>(null);
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
        <div className="table" style={{ marginTop: 32 }} aria-hidden="true">
          {PREVIEW.map(([n, kind, title, meta]) => (
            <div className="tr" key={n} style={{ gridTemplateColumns: "72px 1fr" }}>
              <span className={`rank ${n === "01" ? "first" : ""}`}>{n}</span>
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
          <button className="btn provider" onClick={() => setDev(true)}><span style={{ color: "#4285F4", fontWeight: 700 }}>G</span> Continue with Google</button>
          <button className="btn provider dark" onClick={() => setDev(true)}>Continue with GitHub</button>
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
