// App bar, notification bell and popover, account menu, footer.
import { useEffect, useRef, useState } from "react";
import { CATALOGUE, type Notification, type Segment } from "@gitilizer/shared";
import { api } from "../api.ts";
import { AlertIcon, BellGlyph, BrandSymbol, CheckIcon, ExternalIcon, SettingsIcon, SignOutIcon } from "../icons.tsx";
import { Link, navigate } from "../router.tsx";
import { useStore } from "../store.tsx";
import { fullDate, relativeTime } from "../time.ts";

/** Closes a popup on a click outside or on Esc (NOTIF-20, ACCT-4). */
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
      {/* NAV-7: the wordmark returns to the Prioritized list. */}
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
  const button = useRef<HTMLButtonElement>(null);
  const close = () => { setOpen(false); button.current?.focus(); }; // NOTIF-20: focus returns to the bell
  const ref = useDismiss(open, close);
  const errors = notifications.filter((n) => CATALOGUE[n.code].severity === "error");
  const warnings = notifications.length - errors.length;
  // NOTIF-2..5: red for errors, amber for warnings. Only an error the developer hasn't seen swings (NOTIF-5, NOTIF-17).
  const state = errors.length ? "error" : warnings ? "warning" : "";
  const swing = errors.some((n) => !n.seen);
  const label = errors || warnings
    ? `Notifications, ${[errors.length && `${errors.length} ${errors.length === 1 ? "error" : "errors"}`, warnings && `${warnings} ${warnings === 1 ? "warning" : "warnings"}`].filter(Boolean).join(", ")}`
    : "Notifications, none";
  return (
    <div className="bell-wrap" ref={ref}>
      <button ref={button} className={`bell-btn ${state} ${swing ? "swing" : ""}`} aria-label={label} aria-expanded={open} aria-haspopup="dialog"
              onClick={() => {
                if (open) return close();
                setOpen(true);
                // Opening the popover stops the swing on every device (NOTIF-17).
                if (swing) api.post("/api/notifications/seen").catch(() => {});
              }}>
        <BellGlyph />
      </button>
      {open && <Popover notifications={notifications} close={close} />}
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
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.focus(); }, []); // NOTIF-20: focus moves into the popover
  return (
    <div className="popover" role="dialog" aria-label="Notifications" tabIndex={-1} ref={ref}>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <div className="note-empty"><strong>No notifications</strong>No active errors need your attention.</div>
      ) : notifications.map((n) => {
        const c = CATALOGUE[n.code];
        return (
          <div className={`note ${c.severity}`} key={`${n.code}:${n.subject}`}>
            <div className="note-head">
              <span className="note-symbol"><AlertIcon /></span>
              <span>
                <div className="note-source">{c.summary}</div>
                <div className="note-time" title={fullDate(n.firstDetectedAt)}>{relativeTime(n.firstDetectedAt)}</div>
              </span>
              <span className="note-sev">{c.severity.toUpperCase()}</span>
            </div>
            <h3>{c.heading(n.params)}</h3>
            <Body segments={c.body(n.params)} close={close} />
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
  const signOut = async () => { await api.post("/api/auth/logout"); location.href = "/sign-in"; };
  return (
    <div className="bell-wrap" ref={ref}>
      <button className="avatar-btn" aria-label="Account" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen(!open)}>
        {me.user.avatarUrl ? <img src={me.user.avatarUrl} alt="" /> : initials(me.user.name)}
      </button>
      {open && (
        <div className="menu" role="menu">
          <div className="menu-head"><strong>{me.user.name}</strong><span>{me.user.email}</span></div>
          <button role="menuitem" onClick={() => { setOpen(false); navigate("/settings"); }}><SettingsIcon /> Settings</button>
          {/* ACCT-2, ACCT-5: "Sign out", in red. */}
          <button role="menuitem" className="danger" onClick={signOut}><SignOutIcon /> Sign out</button>
        </div>
      )}
    </div>
  );
}

/** The user documentation and the project page (FOOT-2). */
export const DOCS_URL = "https://github.com/brianquinlan/gitilizer/blob/main/docs/user-guide.md";
export const GITHUB_URL = "https://github.com/brianquinlan/gitilizer";

export function Footer() {
  return (
    <footer className="footer">
      <span>Less triage. More shipping.</span>
      <span className="spacer" />
      <a href={DOCS_URL} target="_blank" rel="noreferrer">Documentation <ExternalIcon /></a>
      <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a>
    </footer>
  );
}

export function CheckLine({ text, ok }: { text: string; ok: boolean }) {
  return <span className={`result ${ok ? "" : "bad"}`}>{ok ? <CheckIcon size={14} /> : <AlertIcon size={14} />} {text}</span>;
}
