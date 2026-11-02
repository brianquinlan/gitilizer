// Reading the developer's list and publishing changes to it.
import type { ItemRow, RemovalReason } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import type { Db } from "./db.ts";

// waiting_for_quota: a ranking job is queued while every model's daily quota is used up (LIST-30, RANK-15).
const ROW_SQL = `
  select ui.item_key, ui.reasons, ui.mention_handle, ui.status, ui.iceboxed_at, ui.score, ui.rank_failed,
         i.kind, i.title, i.html_url, i.updated_at,
         (u.ranking_paused_code = 'daily_quota' and u.ranking_paused_until > now()
          and exists (select 1 from rank_jobs j where j.user_id = ui.user_id and j.item_key = ui.item_key
                      and j.kind = 'rank' and j.state = 'queued')) as waiting_for_quota
  from user_items ui join items i on i.key = ui.item_key join users u on u.id = ui.user_id
  where ui.user_id = $1 and ui.status in ('active', 'iceboxed')`;

function toRow(r: any): ItemRow {
  const [repo, num] = String(r.item_key).split("#");
  return {
    key: r.item_key,
    repo,
    number: Number(num),
    kind: r.kind,
    title: r.title,
    htmlUrl: r.html_url,
    updatedAt: new Date(r.updated_at).toISOString(),
    reasons: r.reasons,
    mentionHandle: r.mention_handle,
    status: r.status,
    iceboxedAt: r.iceboxed_at ? new Date(r.iceboxed_at).toISOString() : null,
    score: r.score === null || r.score === undefined ? null : Number(r.score),
    rankFailed: Boolean(r.rank_failed),
    waitingForQuota: Boolean(r.waiting_for_quota),
  };
}

export async function listRows(db: Db, userId: string, keys?: string[]): Promise<ItemRow[]> {
  if (keys && !keys.length) return [];
  const rows = keys
    ? await db.query(`${ROW_SQL} and ui.item_key = any($2)`, [userId, keys])
    : await db.query(ROW_SQL, [userId]);
  return rows.map(toRow);
}

export async function currentVersion(db: Db, userId: string): Promise<number> {
  const r = await db.one(`select version from list_versions where user_id = $1`, [userId]);
  return r ? Number(r.version) : 0;
}

/**
 * Bumps the list version and pushes the changed rows to the developer's open
 * tabs. `bulk` marks a bulk re-rank, which the browser applies in one step
 * without row indicators (LIVE-24).
 */
export async function publish(
  ctx: Ctx,
  userId: string,
  upsertKeys: string[],
  removals: { key: string; reason: RemovalReason }[] = [],
  bulk = false,
): Promise<number> {
  if (!upsertKeys.length && !removals.length) return currentVersion(ctx.db, userId);
  const v = await ctx.db.one(
    `insert into list_versions (user_id, version) values ($1, 1)
     on conflict (user_id) do update set version = list_versions.version + 1 returning version`,
    [userId],
  );
  const version = Number(v.version);
  const upserts = await listRows(ctx.db, userId, [...new Set(upsertKeys)]);
  ctx.hub.list(userId, { version, bulk, upserts, removals });
  return version;
}
