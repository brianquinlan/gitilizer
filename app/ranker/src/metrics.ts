// Ranking metrics for comparing a predicted ordering to the ground truth.
//
// All functions take two lists of the same ids, each in priority order (index
// 0 = rank 1). Both orderings must be total (no ties) and contain the same ids.
import { pyRound } from "./py.ts";

const ranks = (order: string[]) => new Map(order.map((x, i) => [x, i]));

function check(truth: string[], pred: string[]) {
  const a = new Set(truth);
  if (truth.length !== pred.length || pred.some((x) => !a.has(x)) || new Set(pred).size !== a.size) {
    throw new Error("truth and prediction must contain the same ids");
  }
}

function* pairs<T>(xs: T[]): Generator<[T, T]> {
  for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) yield [xs[i], xs[j]];
}

/** +1 = identical order, -1 = reversed, ~0 = random. */
export function kendallTau(truth: string[], pred: string[]): number {
  check(truth, pred);
  const t = ranks(truth), p = ranks(pred);
  let conc = 0, disc = 0;
  for (const [a, b] of pairs(truth)) {
    const s = (t.get(a)! - t.get(b)!) * (p.get(a)! - p.get(b)!);
    if (s > 0) conc++;
    if (s < 0) disc++;
  }
  const n = conc + disc;
  return n ? (conc - disc) / n : 1.0;
}

/** Fraction of item pairs ordered the same way as the ground truth. */
export const pairwiseAccuracy = (truth: string[], pred: string[]) => (kendallTau(truth, pred) + 1) / 2;

/** Pairs (a, b) where truth says a > b but prediction says b > a. */
export function discordantPairs(truth: string[], pred: string[]): [string, string][] {
  const t = ranks(truth), p = ranks(pred);
  return [...pairs(truth)].filter(([a, b]) => (t.get(a)! - t.get(b)!) * (p.get(a)! - p.get(b)!) < 0);
}

export function spearmanRho(truth: string[], pred: string[]): number {
  check(truth, pred);
  const n = truth.length;
  if (n < 2) return 1.0;
  const t = ranks(truth), p = ranks(pred);
  const d2 = truth.reduce((s, x) => s + (t.get(x)! - p.get(x)!) ** 2, 0);
  return 1 - (6 * d2) / (n * (n * n - 1));
}

/**
 * NDCG@k with linear graded relevance n-rank (rank 1 is most relevant).
 * Rewards getting the *top* of the list right more than the bottom, which is
 * what matters in the app: the developer mostly looks at the first page.
 */
export function ndcg(truth: string[], pred: string[], k?: number): number {
  check(truth, pred);
  const n = truth.length;
  const kk = Math.min(k || n, n);
  const rel = new Map(truth.map((x, i) => [x, n - i]));
  const gain = (xs: string[]) => xs.slice(0, kk).reduce((s, x, i) => s + rel.get(x)! / Math.log2(i + 2), 0);
  const idcg = gain(truth);
  return idcg ? gain(pred) / idcg : 1.0;
}

/** |top-k(truth) ∩ top-k(pred)| / k. */
export function topKOverlap(truth: string[], pred: string[], k: number): number {
  const kk = Math.min(k, truth.length);
  if (!kk) return 1.0;
  const top = new Set(pred.slice(0, kk));
  return truth.slice(0, kk).filter((x) => top.has(x)).length / kk;
}

export function meanAbsDisplacement(truth: string[], pred: string[]): number {
  const t = ranks(truth), p = ranks(pred);
  return truth.length ? truth.reduce((s, x) => s + Math.abs(t.get(x)! - p.get(x)!), 0) / truth.length : 0.0;
}

export type Metrics = Record<string, number>;

export function allMetrics(truth: string[], pred: string[]): Metrics {
  return {
    kendall_tau: pyRound(kendallTau(truth, pred), 4),
    spearman: pyRound(spearmanRho(truth, pred), 4),
    pairwise_acc: pyRound(pairwiseAccuracy(truth, pred), 4),
    ndcg: pyRound(ndcg(truth, pred), 4),
    "ndcg@5": pyRound(ndcg(truth, pred, 5), 4),
    top3_overlap: pyRound(topKOverlap(truth, pred, 3), 4),
    top5_overlap: pyRound(topKOverlap(truth, pred, 5), 4),
    top10_overlap: pyRound(topKOverlap(truth, pred, 10), 4),
    mean_abs_displacement: pyRound(meanAbsDisplacement(truth, pred), 3),
  };
}
