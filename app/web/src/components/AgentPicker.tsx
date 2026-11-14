// The ranking agent choices on Warm Welcome (WEL-5) and in Settings (SET-38):
// Gemini first, as the one Gitilizer recommends, then Claude and OpenAI for
// developers who already have an API account with Anthropic or OpenAI.
import { AGENT_INFO, RankingAgent } from "@gitilizer/shared";

const AGENTS = RankingAgent.options;

export function AgentPicker(props: {
  agent: RankingAgent; onPick: (a: RankingAgent) => void;
  /** Prefix of each choice's id, so the page can focus one. */
  idPrefix: string;
  /** Warm Welcome's larger tiles. */
  tiles?: boolean;
}) {
  // Arrow keys move between the choices, as in any radio group.
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = AGENTS[(AGENTS.indexOf(props.agent) + step + AGENTS.length) % AGENTS.length];
    props.onPick(next);
    setTimeout(() => document.getElementById(`${props.idPrefix}-${next}`)?.focus(), 0);
  };
  const choice = (a: RankingAgent) => {
    const info = AGENT_INFO[a];
    const on = a === props.agent;
    return (
      <button key={a} id={`${props.idPrefix}-${a}`} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1}
              className={`agent-option ${on ? "on" : ""}`} onClick={() => props.onPick(a)}>
        <span className="agent-head">
          <span className="agent-name">{info.name}</span>
          <span className="agent-vendor">{info.vendor}</span>
          <span className="agent-pills">
            {info.recommended && <span className="pill recommended">Recommended</span>}
            <span className={`pill ${info.free ? "free" : "paid"}`}>{info.free ? "Free tier available" : "Pay as you go"}</span>
          </span>
        </span>
        {info.recommended && <span className="agent-note">Ranked best in our tests, at the lowest cost.</span>}
      </button>
    );
  };
  return (
    <div className={`agent-picker ${props.tiles ? "tiles" : ""}`} role="radiogroup" aria-label="Ranking agent" onKeyDown={onKey}>
      {AGENTS.filter((a) => AGENT_INFO[a].recommended).map(choice)}
      <p className="agent-existing">Or use an API account you already have</p>
      <div className="agent-others">{AGENTS.filter((a) => !AGENT_INFO[a].recommended).map(choice)}</div>
    </div>
  );
}
