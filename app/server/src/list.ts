// Reading the developer's list and publishing changes to it.
import type { ItemRow, RemovalReason } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";
import type { Db } from "./db.ts";

const ROW_SQL = `
  select ui.item_key, ui.reasons, ui.mention_handle, ui.status, ui.iceboxed_at, ui.score, ui.rank_failed,
         i.kind, i.title, i.html_url, i.updated_at
  from user_items ui join items i on i.key = ui.item_key
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

/** Bumps the list version and pushes the changed rows to the developer's open tabs. */
export async function publish(
  ctx: Ctx,
  userId: string,
  upsertKeys: string[],
  removals: { key: string; reason: RemovalReason }[] = [],
): Promise<number> {
  if (!upsertKeys.length && !removals.length) return currentVersion(ctx.db, userId);
  const v = await ctx.db.one(
    `insert into list_versions (user_id, version) values ($1, 1)
     on conflict (user_id) do update set version = list_versions.version + 1 returning version`,
    [userId],
  );
  const version = Number(v.version);
  const upserts = await listRows(ctx.db, userId, [...new Set(upsertKeys)]);
  ctx.hub.list(userId, { version, upserts, removals });
  return version;
}
