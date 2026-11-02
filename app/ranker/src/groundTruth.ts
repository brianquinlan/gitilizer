// The hand-ranked eval set (eval/ground_truth.yaml).
import { readFileSync } from "node:fs";
import { parse } from "yaml";

export type TruthEntry = {
  url: string;
  why?: string;
  prd_why?: string;
  set?: string;
  as_of?: string | Date;
  thumbs_down_at?: string | Date;
};
export type GroundTruth = { ranked?: boolean; user: Record<string, unknown>; items: TruthEntry[] };

export function loadGroundTruth(path: string): GroundTruth {
  return parse(readFileSync(path, "utf8"));
}
