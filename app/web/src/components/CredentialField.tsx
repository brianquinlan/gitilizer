// One credential field: label and setup link, masked input with the eye icon, Validate and its result, and the
// guidance below. Used by Warm Welcome and by Settings' credential cards, so the two behave alike
// (PRD SET-1, SET-2, SET-21, SET-28, WEL-3; design: Web app).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { checkMessage, type CheckResult, type CredentialKind } from "@gitilizer/shared";
import { api } from "../api.ts";
import { CheckCircleIcon, ExternalIcon, EyeIcon, EyeOffIcon, RefreshIcon, XCircleIcon } from "../icons.tsx";

/** Nothing checked yet, a check running, or the result for the value now in the field. */
export type Check = "checking" | CheckResult | null;

export const passed = (c: Check) => c !== null && c !== "checking" && c.ok;

export function credentialFieldId(kind: CredentialKind) {
  return kind === "github_pat" ? "github-pat" : "gemini-key";
}

export function CredentialField(props: {
  kind: CredentialKind; label: string; setup: { text: string; href: string };
  /** The guidance text; "Learn more ↗" follows it inline (SET-20, SET-32). */
  guidance: ReactNode; learnMore: string;
  /** A credential is saved: it shows as dots and can only be replaced (SET-21). */
  saved: boolean;
  value: string; onChange: (v: string) => void;
  check: Check; onCheck: (c: Check) => void;
}) {
  const { kind, value, check, onCheck } = props;
  const id = credentialFieldId(kind);
  const [show, setShow] = useState(false);
  useEffect(() => { if (!value) setShow(false); }, [value]);
  // A result belongs to the value it checked; one that arrives after the field has changed is dropped.
  const current = useRef(value);
  current.current = value;

  // Validate checks the typed value without saving it; a saved credential can't be checked again (SET-2, SET-21).
  const validate = async () => {
    const checked = value;
    onCheck("checking");
    let r: CheckResult;
    try {
      r = await api.post<CheckResult>(`/api/credentials/${kind}/check`, { value: checked });
    } catch {
      r = { ok: false, code: "error" };
    }
    if (current.current === checked) onCheck(r);
  };

  return (
    <>
      <div className="field-label">
        <label htmlFor={id}>{props.label}</label>
        <a href={props.setup.href} target="_blank" rel="noreferrer">{props.setup.text} <ExternalIcon /></a>
      </div>
      <div className="field-row">
        <div className={`secret ${check && check !== "checking" && !check.ok ? "invalid" : ""}`}>
          {/* PRIV-1: a saved value is never sent back, so it shows as dots and can only be replaced. */}
          <input id={id} type={show ? "text" : "password"} autoComplete="off" spellCheck={false}
                 placeholder={props.saved ? "•••• •••• •••• •••• ••••" : "Paste it here"}
                 value={value} onChange={(e) => { props.onChange(e.target.value); onCheck(null); }} />
          {value && (
            <button className="eye" onClick={() => setShow(!show)} aria-pressed={show} aria-label={show ? "Hide" : "Show"}>
              {show ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
        </div>
        <button className="btn" onClick={validate} disabled={!value.trim() || check === "checking"}>Validate</button>
      </div>
      {check === "checking" ? <span className="result muted"><RefreshIcon className="spin" size={14} /> Checking…</span>
        : check && <span className={`result ${check.ok ? "" : "bad"}`} role="status">
            {check.ok ? <CheckCircleIcon /> : <XCircleIcon />} {checkMessage(kind, check)}
          </span>}
      <p className="fine">
        {props.guidance} <a className="fine-link" href={props.learnMore} target="_blank" rel="noreferrer">Learn more <ExternalIcon /></a>
      </p>
    </>
  );
}
