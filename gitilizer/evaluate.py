"""Evaluate a prioritization strategy against the hand-ranked ground truth.

    python -m gitilizer.evaluate                       # gemini pointwise, 3 trials
    python -m gitilizer.evaluate --strategy recency    # no-LLM baseline
    python -m gitilizer.evaluate --prompt prompts/v2.md --label v2 --trials 5
    python -m gitilizer.evaluate --thinking high --model gemini-3.8-flash

Each run writes eval/runs/<timestamp>-<label>/ containing:
    report.md        human-readable report (metrics, per-item table, worst inversions)
    results.json     everything, machine-readable
    contexts/        the exact text the model saw for each item
and appends a one-line summary to eval/runs/index.tsv so runs can be compared.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import statistics
import sys
import time
from pathlib import Path

from .context import UserSettings
from .env import load_dotenv
from .github import IssueRef
from .metrics import all_metrics, discordant_pairs
from .prioritizer import DEFAULT_MODEL, DEFAULT_PROMPT, GeminiLLM, Item, prioritize, scored_to_dict
from .snapshot import load_ground_truth

ROOT = Path(__file__).resolve().parent.parent


SUBSET: dict[str, str] = {}  # item id -> provenance set ("A", "B", ...), when the truth file says


def subset_metrics(truth: list[str], trials: list[list[dict]]) -> dict[str, dict[str, tuple[float, float]]]:
    """Mean/sd of each metric restricted to each provenance subset (order within the subset)."""
    out = {}
    for name in sorted(set(SUBSET.values())):
        ids = [x for x in truth if SUBSET.get(x) == name]
        if len(ids) < 3:
            continue
        per = [all_metrics(ids, [s["id"] for s in t if SUBSET.get(s["id"]) == name]) for t in trials]
        out[name] = {k: _mean_sd([m[k] for m in per]) for k in per[0]} | {"n": (len(ids), 0.0)}
    return out


def load_items(truth: dict, fixtures: Path) -> tuple[list[str], list[Item], dict[str, str]]:
    order, items, why, missing = [], [], {}, []
    for entry in truth["items"]:
        ref = IssueRef.parse(entry["url"])
        path = fixtures / f"{ref.key}.json"
        if not path.exists():
            missing.append(str(ref))
            continue
        snap = json.loads(path.read_text(encoding="utf-8"))
        rid = str(ref)
        order.append(rid)
        why[rid] = (entry.get("why") or "").strip()
        if entry.get("set"):
            SUBSET[rid] = str(entry["set"])
        items.append(Item(rid, snap, entry.get("thumbs_down_at"), entry.get("as_of")))
    if missing:
        sys.exit(
            f"Missing snapshots for: {', '.join(missing)}\n"
            f"Run: python -m gitilizer.snapshot eval/ground_truth.yaml --out {fixtures}"
        )
    return order, items, why


def _mean_sd(xs: list[float]) -> tuple[float, float]:
    return (statistics.fmean(xs), statistics.stdev(xs) if len(xs) > 1 else 0.0)


def write_report(run_dir: Path, cfg: dict, truth: list[str], why: dict[str, str], trials: list[list[dict]],
                 trial_metrics: list[dict]) -> str:
    n = len(truth)
    lines = [f"# Gitilizer eval: {cfg['label']}", ""]
    lines.append(
        f"strategy `{cfg['strategy']}` · model `{cfg.get('model') or '-'}` · thinking `{cfg.get('thinking') or 'default'}` · "
        f"prompt `{cfg.get('prompt') or '-'}` · signals `{cfg['signals']}` · {len(trials)} trial(s) · "
        f"{n} items · {cfg['started_at']}"
    )
    lines += ["", "## Metrics (mean ± sd across trials)", "", "| metric | value |", "|---|---|"]
    for k in trial_metrics[0]:
        m, sd = _mean_sd([t[k] for t in trial_metrics])
        lines.append(f"| {k} | {m:.3f} ± {sd:.3f} |")
    errors = sum(1 for t in trials for s in t if s.get("error"))
    if errors:
        lines.append(f"\n**{errors} item scoring(s) failed** — see results.json.")

    # per item
    ranks: dict[str, list[int]] = {x: [] for x in truth}
    prios: dict[str, list[float]] = {x: [] for x in truth}
    act: dict[str, list[bool]] = {x: [] for x in truth}
    for t in trials:
        for pos, s in enumerate(t):
            ranks[s["id"]].append(pos + 1)
            prios[s["id"]].append(s["priority"])
            if s.get("actionable") is not None:
                act[s["id"]].append(bool(s["actionable"]))
    last = {s["id"]: s for s in trials[-1]}
    subs = subset_metrics(truth, trials)
    if subs:
        keys = ["kendall_tau", "ndcg", "top5_overlap", "mean_abs_displacement"]
        lines += ["", "## By set (order within each set only)", "",
                  "| set | n | " + " | ".join(keys) + " |", "|---|---:|" + "---:|" * len(keys)]
        for name, m in subs.items():
            lines.append(f"| {name} | {int(m['n'][0])} | " + " | ".join(f"{m[k][0]:.3f} ± {m[k][1]:.3f}" for k in keys) + " |")
    lines += ["", "## Per item", "",
              "| truth | predicted (mean, range) | Δ | priority | actionable | item | set | next action (last trial) |",
              "|---:|---|---:|---:|---|---|---|---|"]
    for i, x in enumerate(truth):
        r = ranks[x]
        mr = statistics.fmean(r)
        delta = mr - (i + 1)
        rng = f"{min(r)}–{max(r)}" if min(r) != max(r) else f"{r[0]}"
        a = act[x]
        a_s = f"{sum(a)}/{len(a)}" if a else "-"
        flag = " ⚠️" if abs(delta) >= max(3, n / 4) else ""
        na = (last[x].get("next_action") or last[x].get("error") or "").replace("|", "\\|")
        lines.append(
            f"| {i + 1} | {mr:.1f} ({rng}) | {delta:+.1f}{flag} | {statistics.fmean(prios[x]):.2f} | {a_s} | {x} | {SUBSET.get(x, '')} | {na} |"
        )

    # worst inversions
    inv_counts: dict[tuple[str, str], int] = {}
    for t in trials:
        pred = [s["id"] for s in t]
        for a, b in discordant_pairs(truth, pred):
            inv_counts[(a, b)] = inv_counts.get((a, b), 0) + 1
    tr = {x: i for i, x in enumerate(truth)}
    worst = sorted(inv_counts.items(), key=lambda kv: (-(tr[kv[0][1]] - tr[kv[0][0]]), -kv[1]))[:10]
    if worst:
        lines += ["", "## Largest inversions", "",
                  "Pairs the model ordered the wrong way round, biggest ground-truth gap first.", ""]
        for (a, b), c in worst:
            lines.append(f"- **{a}** (truth #{tr[a] + 1}) placed below **{b}** (truth #{tr[b] + 1}) in {c}/{len(trials)} trial(s)")

    lines += ["", "## Reasoning (last trial) vs. ground truth", ""]
    for i, x in enumerate(truth):
        s = last[x]
        lines.append(f"### {i + 1}. {x} → predicted {ranks[x][-1]}, priority {s['priority']:.2f}")
        lines.append(f"- **Ground truth:** {why[x]}")
        if s.get("error"):
            lines.append(f"- **Error:** {s['error']}")
        else:
            if s.get("reasoning"):
                lines.append(f"- **Model:** {s['reasoning']}")
            if s.get("next_action"):
                lines.append(f"- **Next action:** {s['next_action']}")
        lines.append("")
    text = "\n".join(lines)
    (run_dir / "report.md").write_text(text, encoding="utf-8")
    return text


def main(argv: list[str] | None = None) -> int:
    load_dotenv()
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--truth", default=str(ROOT / "eval" / "ground_truth.yaml"))
    ap.add_argument("--fixtures", default=str(ROOT / "eval" / "fixtures"))
    ap.add_argument("--strategy", choices=["pointwise", "listwise", "recency"], default="pointwise")
    ap.add_argument("--model", default=None, help=f"default: $GITILIZER_MODEL or {DEFAULT_MODEL}")
    ap.add_argument("--thinking", choices=["minimal", "low", "medium", "high"], default=None)
    ap.add_argument("--prompt", default=str(DEFAULT_PROMPT), help="guidance prompt file")
    ap.add_argument("--no-signals", action="store_true", help="don't include derived signals in the context")
    ap.add_argument("--trials", type=int, default=3, help="repeat runs to measure stability")
    ap.add_argument("--now", default=None, help="override current_time (ISO 8601); default = latest snapshot time")
    ap.add_argument("--label", default=None)
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--out", default=str(ROOT / "eval" / "runs"))
    args = ap.parse_args(argv)

    import os
    model = args.model or os.environ.get("GITILIZER_MODEL") or DEFAULT_MODEL
    truth_doc = load_ground_truth(args.truth)
    if truth_doc.get("ranked") is False:
        sys.exit(f"{args.truth} is not ranked yet (ranked: false): its order is not a ground truth.")
    user = UserSettings.from_dict(truth_doc["user"])
    truth, items, why = load_items(truth_doc, Path(args.fixtures))

    llm = None
    if args.strategy != "recency":
        if not os.environ.get("GEMINI_API_KEY"):
            sys.exit("GEMINI_API_KEY is not set (put it in .env)")
        llm = GeminiLLM(model=model, thinking_level=args.thinking)
    trials_n = 1 if args.strategy == "recency" else args.trials

    prompt_path = Path(args.prompt)
    label = args.label or (args.strategy if args.strategy == "recency" else f"{args.strategy}-{prompt_path.stem}")
    started = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    run_dir = Path(args.out) / f"{started}-{label}"
    (run_dir / "contexts").mkdir(parents=True, exist_ok=True)

    cfg = {
        "label": label,
        "strategy": args.strategy,
        "model": None if args.strategy == "recency" else model,
        "thinking": args.thinking,
        "prompt": None if args.strategy == "recency" else str(prompt_path),
        "signals": not args.no_signals,
        "trials": trials_n,
        "now": args.now,
        "started_at": started,
        "snapshots_fetched_at": sorted({i.snap["fetched_at"] for i in items}),
    }
    guidance = prompt_path.read_text(encoding="utf-8") if args.strategy != "recency" else None

    def save_ctx(key: str, text: str) -> None:
        name = "_system" if key == "__system__" else key.replace("/", "__").replace("#", "__")
        (run_dir / "contexts" / f"{name}.txt").write_text(text, encoding="utf-8")

    trials, trial_metrics = [], []
    t0 = time.time()
    for k in range(trials_n):
        print(f"trial {k + 1}/{trials_n} ...", file=sys.stderr, flush=True)
        scored = prioritize(
            items, user, strategy=args.strategy, llm=llm, guidance=guidance,
            include_signals=not args.no_signals, now=args.now, workers=args.workers,
            on_context=save_ctx if k == 0 else None,
        )
        result = [scored_to_dict(s) for s in scored]
        pred = [s["id"] for s in result]
        m = all_metrics(truth, pred)
        trials.append(result)
        trial_metrics.append(m)
        print(f"  kendall_tau={m['kendall_tau']:+.3f} ndcg={m['ndcg']:.3f} top3={m['top3_overlap']:.2f}",
              file=sys.stderr)
    elapsed = round(time.time() - t0, 1)

    usage = {"prompt_tokens": 0, "output_tokens": 0, "thinking_tokens": 0}
    for t in trials:
        for s in t:
            for key in usage:
                usage[key] += (s.get("usage") or {}).get(key) or 0
    cfg["elapsed_s"] = elapsed
    cfg["usage"] = usage

    (run_dir / "results.json").write_text(
        json.dumps({"config": cfg, "truth": truth, "why": why, "trials": trials, "metrics": trial_metrics,
                    "subsets": {k: {m: v[0] for m, v in d.items()} for k, d in subset_metrics(truth, trials).items()},
                    "item_sets": SUBSET},
                   indent=1, ensure_ascii=False),
        encoding="utf-8",
    )
    write_report(run_dir, cfg, truth, why, trials, trial_metrics)

    index = Path(args.out) / "index.tsv"
    agg = {k: _mean_sd([t[k] for t in trial_metrics]) for k in trial_metrics[0]}
    if not index.exists():
        index.write_text("run\tstrategy\tmodel\tthinking\tprompt\tsignals\ttrials\ttau\ttau_sd\tndcg\ttop3\tmad\n",
                         encoding="utf-8")
    with index.open("a", encoding="utf-8") as f:
        f.write("\t".join(str(v) for v in [
            run_dir.name, args.strategy, cfg["model"] or "-", args.thinking or "-", prompt_path.stem if guidance else "-",
            cfg["signals"], trials_n, f"{agg['kendall_tau'][0]:.3f}", f"{agg['kendall_tau'][1]:.3f}",
            f"{agg['ndcg'][0]:.3f}", f"{agg['top3_overlap'][0]:.2f}", f"{agg['mean_abs_displacement'][0]:.2f}",
        ]) + "\n")

    print(f"\nKendall tau {agg['kendall_tau'][0]:+.3f} ± {agg['kendall_tau'][1]:.3f} | "
          f"NDCG {agg['ndcg'][0]:.3f} | top-3 overlap {agg['top3_overlap'][0]:.2f} | "
          f"mean |Δrank| {agg['mean_abs_displacement'][0]:.2f} | {elapsed}s")
    print(f"Report: {run_dir / 'report.md'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
