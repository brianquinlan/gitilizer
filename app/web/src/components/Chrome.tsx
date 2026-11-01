// App bar, notification bell and popover, account menu, footer.
import { useEffect, useRef, useState } from "react";
import { CATALOGUE, type Notification, type Segment } from "@gitilizer/shared";
import { api } from "../api.ts";
import { AlertIcon, BellGlyph, BrandSymbol, CheckIcon } from "../icons.tsx";
import { Link, navigate } from "../router.tsx";
import { useStore } from "../store.tsx";
import { relativeTime } from "../time.ts";

/** Closes a popup on a click outside or on Esc (PRD Q-12, Q-15, assumed). */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) close(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open, close]);
  return ref;
}

export function AppBar() {
  return (
    <header className="appbar">
      {/* PRD Q-7 (assumed): the wordmark returns to the Prioritized list. */}
      <Link to="/" className="brand" aria-label="Gitilizer, go to your list"><BrandSymbol /> gitilizer</Link>
      <span className="spacer" />
      <Bell />
      <AccountMenu />
    </header>
  );
}

function Bell() {
  const { notifications } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const errors = notifications.filter((n) => CATALOGUE[n.code].severity === "error").length;
  const warnings = notifications.length - errors;
  // NOTIF-2..5; warning state per PRD Q-14 (assumed): amber, swings like an error.
  const state = errors ? "error" : warnings ? "warning" : "";
  const label = errors || warnings
    ? `Notifications, ${[errors && `${errors} ${errors === 1 ? "error" : "errors"}`, warnings && `${warnings} ${warnings === 1 ? "warning" : "warnings"}`].filter(Boolean).join(", ")}`
    : "Notifications, none";
  return (
    <div className="bell-wrap" ref={ref}>
      <button className={`bell-btn ${state} ${state ? "swing" : ""}`} aria-label={label} aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(!open)}>
        <BellGlyph />
      </button>
      {open && <Popover notifications={notifications} close={() => setOpen(false)} />}
    </div>
  );
}

function Body({ segments, close }: { segments: Segment[]; close: () => void }) {
  return (
    <p>
      {segments.map((s, i) => s.settings
        ? <Link key={i} to={`/settings#${s.settings}`} onClick={close}>{s.text}</Link>
        : s.href ? <a key={i} href={s.href} target="_blank" rel="noreferrer">{s.text}</a>
        : <span key={i}>{s.text}</span>)}
    </p>
  );
}

function Popover({ notifications, close }: { notifications: Notification[]; close: () => void }) {
  return (
    <div className="popover" role="dialog" aria-label="Notifications">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <div className="note-empty"><strong>No notifications</strong>No active errors need your attention.</div>
      ) : notifications.map((n) => {
        const c = CATALOGUE[n.code];
        const params = { ...n.params, time: n.params.time ? new Date(n.params.time).toLocaleString() : "" };
        return (
          <div className={`note ${c.severity}`} key={`${n.code}:${n.subject}`}>
            <div className="note-head">
              <span className="note-symbol"><AlertIcon /></span>
              <span>
                <div className="note-source">{c.summary}</div>
                <div className="note-time">{relativeTime(n.firstDetectedAt)}</div>
              </span>
              <span className="note-sev">{c.severity.toUpperCase()}</span>
            </div>
            <h3>{c.heading(params)}</h3>
            <Body segments={c.body(params)} close={close} />
          </div>
        );
      })}
    </div>
  );
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
}

function AccountMenu() {
  const { me } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  if (!me) return null;
  const logout = async () => { await api.post("/api/auth/logout"); location.href = "/sign-in"; };
  return (
    <div className="bell-wrap" ref={ref}>
      <button className="avatar-btn" aria-label="Account" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen(!open)}>
        {me.user.avatarUrl ? <img src={me.user.avatarUrl} alt="" /> : initials(me.user.name)}
      </button>
      {open && (
        <div className="menu" role="menu">
          <div className="menu-head"><strong>{me.user.name}</strong><span>{me.user.email}</span></div>
          <button role="menuitem" onClick={() => { setOpen(false); navigate("/settings"); }}>Settings</button>
          <button role="menuitem" onClick={logout}>Log out</button>
        </div>
      )}
    </div>
  );
}

export function Footer() {
  // PRD Q-5: the real URLs are not defined yet.
  return (
    <footer className="footer">
      <span>Less triage. More shipping.</span>
      <span className="spacer" />
      <a href="https://github.com/" target="_blank" rel="noreferrer">Documentation ↗</a>
      <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
    </footer>
  );
}

export function CheckLine({ text, ok }: { text: string; ok: boolean }) {
  return <span className={`result ${ok ? "" : "bad"}`}>{ok ? <CheckIcon size={14} /> : <AlertIcon size={14} />} {text}</span>;
}
