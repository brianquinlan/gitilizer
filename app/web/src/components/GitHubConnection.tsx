// Connecting GitHub with the Gitilizer app (PRD "Connecting GitHub", SET-42 to SET-47; WEL-6): the pieces
// Warm Welcome and the Settings GitHub card share, and the card's states.
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  APP_PERMISSION_LABEL, CONNECT_MESSAGES, ConnectFailure, GITHUB_ACCESS_NOTE, GITHUB_CONNECT_ID,
  type CredentialStatus, type GitHubConnection, type GitHubInstallation, type Me,
} from "@gitilizer/shared";
import { api } from "../api.ts";
import { CredentialField, type Check } from "./CredentialField.tsx";
import { AlertIcon, CheckCircleIcon, ExternalIcon, GitHubIcon, GlobeIcon, LockIcon } from "../icons.tsx";

/** GitHub's page for what an account has installed, where a missing permission is approved. */
const INSTALLATIONS_URL = "https://github.com/settings/installations";

const startUrl = (next: string) => `/api/connect/github/start?next=${encodeURIComponent(next)}`;

/**
 * "Connect GitHub" and its relatives: a link, because it leaves for GitHub's authorization page in the
 * same tab (SET-43). `next` is where GitHub sends the developer back to.
 */
export function ConnectLink(props: { next: string; kind: "dark" | "primary" | "plain"; children: ReactNode }) {
  const cls = props.kind === "dark" ? "btn connect-github" : props.kind === "primary" ? "btn primary" : "btn";
  return <a id={GITHUB_CONNECT_ID} className={cls} href={startUrl(props.next)}><GitHubIcon size={props.kind === "dark" ? 18 : 16} /> {props.children}</a>;
}

/**
 * What happened when GitHub sent the developer back without a connection: read once from ?connect= and
 * removed from the address, so a reload shows the plain page (SET-43).
 */
export function useConnectResult(): ConnectFailure | null {
  const [result] = useState<ConnectFailure | null>(() => {
    const q = new URLSearchParams(location.search);
    const parsed = ConnectFailure.safeParse(q.get("connect"));
    if (!q.has("connect")) return null;
    q.delete("connect");
    history.replaceState(null, "", `${location.pathname}${q.size ? `?${q}` : ""}${location.hash}`);
    return parsed.success ? parsed.data : "failed";
  });
  return result;
}

export function ConnectResult({ result }: { result: ConnectFailure | null }) {
  if (!result) return null;
  return <span className={`result ${result === "cancelled" ? "muted" : "bad"}`} role="status">{CONNECT_MESSAGES[result]}</span>;
}

export const AccessNote = ({ more }: { more?: string }) => <p className="fine">{GITHUB_ACCESS_NOTE}{more ? ` ${more}` : ""}</p>;

export function Avatar({ url, login, size }: { url: string | null; login: string | null; size: number }) {
  const style = { width: size, height: size };
  return url
    ? <img className="avatar" style={style} src={url} alt="" />
    : <span className="avatar initials" style={style} aria-hidden="true">{(login ?? "?").slice(0, 2).toUpperCase()}</span>;
}

/**
 * The card's details, read from GitHub when Settings opens and again whenever its tab becomes visible, so
 * the card is current when the developer comes back from GitHub (SET-45).
 */
export function useGitHubConnection(enabled: boolean, onChange: () => void) {
  const [details, setDetails] = useState<GitHubConnection | null>(null);
  const changed = useRef(onChange);
  changed.current = onChange;
  const load = useCallback(() => {
    if (!enabled) return;
    api.get<GitHubConnection>("/api/github/connection").then((d) => { setDetails(d); changed.current(); }).catch(() => {});
  }, [enabled]);
  useEffect(() => {
    load();
    const visible = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", visible);
    window.addEventListener("focus", load);
    return () => { document.removeEventListener("visibilitychange", visible); window.removeEventListener("focus", load); };
  }, [load]);
  return details;
}

function Row(props: { icon: ReactNode; name: ReactNode; warn?: boolean; children: ReactNode; link?: ReactNode }) {
  return (
    <div className="read-row">
      <span className="read-name">{props.icon}{props.name}</span>
      <span className={`read-status ${props.warn ? "warn" : "ok"}`}>{props.warn ? <AlertIcon size={14} /> : <CheckCircleIcon />} {props.children}</span>
      {props.link}
    </div>
  );
}

function installationText(i: GitHubInstallation): string {
  if (i.missing.length) {
    // One line per account: the first permission it hasn't approved (SET-47).
    const p = APP_PERMISSION_LABEL[i.missing[0]];
    return `${p.name[0].toUpperCase()}${p.name.slice(1)} aren't shared, so its private ${p.short} are missing`;
  }
  if (i.selection === "all") return "Private repositories: all";
  return i.repoCount === null ? "Private repositories: selected" : `Private repositories: ${i.repoCount} selected`;
}

/** The connected card's body: the account, what Gitilizer can read, and the links (SET-47). */
export function ConnectedBody(props: { me: Me; details: GitHubConnection | null; next: string; onUseToken: () => void }) {
  const { me, details } = props;
  const external = (text: string, href: string) => <a className="fine-link" href={href} target="_blank" rel="noreferrer">{text} <ExternalIcon /></a>;
  return (
    <>
      <div className="connected-account">
        <Avatar url={me.github.avatarUrl} login={me.github.login} size={32} />
        <div className="connected-who"><strong>@{me.github.login}</strong><span>Connected with the Gitilizer app · Read-only</span></div>
        <ConnectLink next={props.next} kind="plain">Reconnect</ConnectLink>
      </div>
      <div className="read-box">
        <div className="read-head">What Gitilizer can read</div>
        <Row icon={<GlobeIcon />} name="Public repositories">Every public repository, in any account</Row>
        {(details?.installations ?? []).map((i) => (
          <Row key={i.account} icon={<LockIcon />} name={<span className="mono">{i.account}</span>} warn={i.missing.length > 0}
               link={i.missing.length > 0 ? external("Review on GitHub", INSTALLATIONS_URL) : undefined}>
            {installationText(i)}
          </Row>
        ))}
        {(details?.pending ?? []).map((p) => (
          <Row key={`pending-${p.account}`} icon={<LockIcon />} name={<span className="mono">{p.account}</span>} warn>
            Private repositories: waiting for an owner to approve
          </Row>
        ))}
      </div>
      <div className="card-actions">
        {me.github.installUrl ? external("Add or change private repositories", me.github.installUrl) : <span />}
        <button type="button" className="link-btn underlined" onClick={props.onUseToken}>Use a personal access token instead</button>
      </div>
    </>
  );
}

/** The message that replaces the account when the connection has ended (SET-46). */
export function ConnectionEnded() {
  return (
    <div className="connection-ended" role="alert">
      <AlertIcon size={16} />
      <div>
        <strong>Your GitHub connection has ended</strong>
        <span>Access was removed on GitHub, or Gitilizer hasn't been opened for six months. Your list and settings are kept, and scanning starts again when you reconnect.</span>
      </div>
    </div>
  );
}

/** The status chips of the Connections cards (SET-30). */
export const CHIPS: Record<CredentialStatus["chip"], [string, string]> = {
  not_set: ["", "Not set"], connected: ["ok", "Connected"], not_working: ["bad", "Not working"], expires_soon: ["warn", "Expires soon"],
  needs_attention: ["warn", "Needs attention"],
};

/**
 * The GitHub card (SET-42 to SET-47): the Gitilizer app's connection, or the token field, which also shows in
 * place of a connection when the developer asks for it. Connecting needs no "Save changes"; a token does.
 */
export function GitHubCard(props: {
  me: Me; details: GitHubConnection | null; result: ConnectFailure | null; value: string; onChange: (v: string) => void;
  /** The documentation about tokens, behind the field's "Learn more". */
  docs: string;
}) {
  const { me } = props;
  const { method, app } = me.github;
  const [check, setCheck] = useState<Check>(null);
  useEffect(() => setCheck(null), [props.value]);
  const [asked, setAsked] = useState(false); // "Use a personal access token instead"
  const tokenShowing = method === "pat" || !app || asked;
  const ended = method === "app" && me.github.chip === "not_working"; // SET-46
  const [chipClass, chipText] = CHIPS[me.github.chip];
  const next = "/settings#connections";
  const useToken = <button type="button" className="link-btn underlined" onClick={() => setAsked(true)}>
    {method === "app" ? "Use a personal access token instead" : "Or use a personal access token"}</button>;

  return (
    <div className="panel card">
      <div className="card-head"><GitHubIcon /><h3>GitHub</h3><span className={`badge ${chipClass}`}>{chipText}</span></div>
      {ended && <ConnectionEnded />}
      {tokenShowing ? (
        <>
          <CredentialField kind="github_pat" label="Personal access token"
            setup={{ text: "Create a token", href: "https://github.com/settings/personal-access-tokens/new" }}
            guidance={<>Grant read access to issues, PRs and metadata for the repositories you want to scan.</>}
            learnMore={props.docs}
            saved={me.credentials.github_pat.set} value={props.value} onChange={props.onChange} check={check} onCheck={setCheck} />
          {asked && method !== "pat" && (
            // Puts the card back as it was and discards a typed token (SET-47).
            <button type="button" className="link-btn underlined" onClick={() => { props.onChange(""); setAsked(false); }}>
              {method === "app" ? `Keep @${me.github.login} connected` : "Use Connect GitHub instead"}
            </button>
          )}
          {method === "pat" && app && (
            <div className="card-actions ruled">
              <span>No token to create or renew: connect with one click instead.</span>
              <ConnectLink next={next} kind="plain">Connect GitHub</ConnectLink>
            </div>
          )}
        </>
      ) : ended ? (
        <>
          <div><ConnectLink next={next} kind="primary">Reconnect GitHub</ConnectLink></div>
          {useToken}
        </>
      ) : method === "app" ? (
        <ConnectedBody me={me} details={props.details} next={next} onUseToken={() => setAsked(true)} />
      ) : (
        <>
          <ConnectLink next={next} kind="dark">Connect GitHub</ConnectLink>
          <AccessNote />
          {useToken}
        </>
      )}
      {!tokenShowing || method === "pat" ? <ConnectResult result={props.result} /> : null}
    </div>
  );
}
