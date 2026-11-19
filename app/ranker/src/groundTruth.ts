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
  /** The item's next step (PRD RANK-23), to measure the agent's against (RANK-24). */
  next_step?: string;
};
export type GroundTruth = {
  ranked?: boolean;
  /**
   * The items have a next step and no rank (eval/next_steps.yaml): the harness
   * measures next steps only (RANK-24), and the order of the items means nothing.
   */
  labels_only?: boolean;
  user: Record<string, unknown>;
  items: TruthEntry[];
};

export function loadGroundTruth(path: string): GroundTruth {
  return parse(readFileSync(path, "utf8"));
}
