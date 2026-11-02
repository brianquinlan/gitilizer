// statistics.fmean and statistics.stdev, as the Python harness used them.
export const fmean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
export function stdev(xs: number[]): number {
  const m = fmean(xs);
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - 1));
}
export const meanSd = (xs: number[]): [number, number] => [fmean(xs), xs.length > 1 ? stdev(xs) : 0.0];
