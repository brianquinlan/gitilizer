"""Ranking metrics for comparing a predicted ordering to the ground truth.

All functions take two lists of the same ids, each in priority order (index 0 =
rank 1). Both orderings must be total (no ties) and contain the same ids.
"""

from __future__ import annotations

import math
from itertools import combinations


def _ranks(order: list[str]) -> dict[str, int]:
    return {x: i for i, x in enumerate(order)}


def _check(truth: list[str], pred: list[str]) -> None:
    if set(truth) != set(pred) or len(truth) != len(pred):
        raise ValueError("truth and prediction must contain the same ids")


def kendall_tau(truth: list[str], pred: list[str]) -> float:
    """+1 = identical order, -1 = reversed, ~0 = random."""
    _check(truth, pred)
    t, p = _ranks(truth), _ranks(pred)
    conc = disc = 0
    for a, b in combinations(truth, 2):
        s = (t[a] - t[b]) * (p[a] - p[b])
        conc += s > 0
        disc += s < 0
    n = conc + disc
    return (conc - disc) / n if n else 1.0


def pairwise_accuracy(truth: list[str], pred: list[str]) -> float:
    """Fraction of item pairs ordered the same way as the ground truth."""
    return (kendall_tau(truth, pred) + 1) / 2


def discordant_pairs(truth: list[str], pred: list[str]) -> list[tuple[str, str]]:
    """Pairs (a, b) where truth says a > b but prediction says b > a."""
    t, p = _ranks(truth), _ranks(pred)
    return [(a, b) for a, b in combinations(truth, 2) if (t[a] - t[b]) * (p[a] - p[b]) < 0]


def spearman_rho(truth: list[str], pred: list[str]) -> float:
    _check(truth, pred)
    n = len(truth)
    if n < 2:
        return 1.0
    t, p = _ranks(truth), _ranks(pred)
    d2 = sum((t[x] - p[x]) ** 2 for x in truth)
    return 1 - 6 * d2 / (n * (n * n - 1))


def ndcg(truth: list[str], pred: list[str], k: int | None = None) -> float:
    """NDCG@k with linear graded relevance n-rank (rank 1 is most relevant).

    Rewards getting the *top* of the list right more than the bottom, which is
    what matters in the app: the user mostly looks at the first page. Linear
    (not exponential) gains keep a single item from dominating the score.
    """
    _check(truth, pred)
    n = len(truth)
    k = min(k or n, n)
    rel = {x: n - i for i, x in enumerate(truth)}
    dcg = sum(rel[x] / math.log2(i + 2) for i, x in enumerate(pred[:k]))
    idcg = sum(rel[x] / math.log2(i + 2) for i, x in enumerate(truth[:k]))
    return dcg / idcg if idcg else 1.0


def top_k_overlap(truth: list[str], pred: list[str], k: int) -> float:
    """|top-k(truth) ∩ top-k(pred)| / k."""
    k = min(k, len(truth))
    return len(set(truth[:k]) & set(pred[:k])) / k if k else 1.0


def mean_abs_displacement(truth: list[str], pred: list[str]) -> float:
    t, p = _ranks(truth), _ranks(pred)
    return sum(abs(t[x] - p[x]) for x in truth) / len(truth) if truth else 0.0


def all_metrics(truth: list[str], pred: list[str]) -> dict[str, float]:
    return {
        "kendall_tau": round(kendall_tau(truth, pred), 4),
        "spearman": round(spearman_rho(truth, pred), 4),
        "pairwise_acc": round(pairwise_accuracy(truth, pred), 4),
        "ndcg": round(ndcg(truth, pred), 4),
        "ndcg@5": round(ndcg(truth, pred, 5), 4),
        "top3_overlap": round(top_k_overlap(truth, pred, 3), 4),
        "top5_overlap": round(top_k_overlap(truth, pred, 5), 4),
        "top10_overlap": round(top_k_overlap(truth, pred, 10), 4),
        "mean_abs_displacement": round(mean_abs_displacement(truth, pred), 3),
    }
