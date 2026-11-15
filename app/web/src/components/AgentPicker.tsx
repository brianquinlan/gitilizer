// The ranking choices in Settings (SET-38): Gemini first, as the one Gitilizer
// recommends, then Claude and OpenAI for developers who already have an API
// account with Anthropic or OpenAI, then basic ranking, which needs no key.
import { AGENT_INFO, BASIC_INFO, RankingAgent, RankingChoice } from "@gitilizer/shared";

const CHOICES = RankingChoice.options;
const AGENTS = RankingAgent.options;

export function AgentPicker(props: {
  agent: RankingChoice; onPick: (a: RankingChoice) => void;
  /** Prefix of each choice's id, so the page can focus one. */
  idPrefix: string;
}) {
  // Arrow keys move between the choices, as in any radio group.
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = CHOICES[(CHOICES.indexOf(props.agent) + step + CHOICES.length) % CHOICES.length];
    props.onPick(next);
    setTimeout(() => document.getElementById(`${props.idPrefix}-${next}`)?.focus(), 0);
  };
  const option = (c: RankingChoice, name: string, vendor: string, pills: React.ReactNode, note?: string) => {
    const on = c === props.agent;
    return (
      <button key={c} id={`${props.idPrefix}-${c}`} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1}
              className={`agent-option ${on ? "on" : ""}`} onClick={() => props.onPick(c)}>
        <span className="agent-head">
          <span className="agent-name">{name}</span>
          <span className="agent-vendor">{vendor}</span>
          <span className="agent-pills">{pills}</span>
        </span>
        {note && <span className="agent-note">{note}</span>}
      </button>
    );
  };
  const agent = (a: RankingAgent) => {
    const info = AGENT_INFO[a];
    return option(a, info.name, info.vendor, <>
      {info.recommended && <span className="pill recommended">Recommended</span>}
      <span className={`pill ${info.free ? "free" : "paid"}`}>{info.free ? "Free tier available" : "Pay as you go"}</span>
    </>, info.recommended ? "Ranked best in our tests, at the lowest cost." : undefined);
  };
  return (
    <div className="agent-picker" role="radiogroup" aria-label="Ranking agent" onKeyDown={onKey}>
      {AGENTS.filter((a) => AGENT_INFO[a].recommended).map(agent)}
      <p className="agent-existing">Or use an API account you already have</p>
      <div className="agent-others">{AGENTS.filter((a) => !AGENT_INFO[a].recommended).map(agent)}</div>
      <p className="agent-existing">Or rank without a key</p>
      {option("basic", BASIC_INFO.name, BASIC_INFO.vendor, <span className="pill paid">{BASIC_INFO.pill}</span>, BASIC_INFO.line)}
    </div>
  );
}
