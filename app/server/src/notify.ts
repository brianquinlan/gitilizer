// Notification service (design: Notifications; PRD NOTIF-11..16).
import { CATALOGUE, compareNotifications, type Notification, type NotificationCode } from "@gitilizer/shared";
import type { Ctx } from "./context.ts";

export async function shownNotifications(ctx: Ctx, userId: string): Promise<Notification[]> {
  const rows = await ctx.db.query(
    `select code, subject, params, first_detected_at from notifications where user_id = $1 and shown`,
    [userId],
  );
  return rows
    .map((r) => ({ code: r.code, subject: r.subject, params: r.params ?? {}, firstDetectedAt: new Date(r.first_detected_at).toISOString() }))
    .sort(compareNotifications);
}

async function push(ctx: Ctx, userId: string) {
  ctx.hub.notifications(userId, await shownNotifications(ctx, userId));
}

/** Records that a condition is present. Short-lived ones are shown only after the threshold. */
export async function raise(ctx: Ctx, userId: string, code: NotificationCode, params: Record<string, string> = {}, subject = "") {
  const entry = CATALOGUE[code];
  const before = await ctx.db.one(`select shown from notifications where user_id = $1 and code = $2 and subject = $3`, [userId, code, subject]);
  await ctx.db.query(
    `insert into notifications (user_id, code, subject, params, shown) values ($1, $2, $3, $4, $5)
     on conflict (user_id, code, subject) do update set params = excluded.params`,
    [userId, code, subject, JSON.stringify(params), !entry.shortLived],
  );
  const changed = await promote(ctx, userId);
  if (!before || changed || before.shown) await push(ctx, userId);
}

/** Records that a condition is gone. */
export async function clear(ctx: Ctx, userId: string, codes: NotificationCode[], subject?: string) {
  const rows = subject === undefined
    ? await ctx.db.query(`delete from notifications where user_id = $1 and code = any($2) returning shown`, [userId, codes])
    : await ctx.db.query(`delete from notifications where user_id = $1 and code = any($2) and subject = $3 returning shown`, [userId, codes, subject]);
  if (rows.some((r) => r.shown)) await push(ctx, userId);
}

/** Saving a credential clears its notifications at once (NOTIF-13). */
export async function clearForCredential(ctx: Ctx, userId: string, kind: "github_pat" | "gemini_key") {
  const codes = (Object.keys(CATALOGUE) as NotificationCode[]).filter((c) => CATALOGUE[c].clearedBy === kind);
  await clear(ctx, userId, codes);
}

/** Shows short-lived notifications that have lasted past the threshold. Returns true if any changed. */
export async function promote(ctx: Ctx, userId?: string): Promise<boolean> {
  const shortCodes = (Object.keys(CATALOGUE) as NotificationCode[]).filter((c) => CATALOGUE[c].shortLived);
  const rows = await ctx.db.query(
    `update notifications set shown = true
     where not shown and code = any($1) and condition_since <= now() - make_interval(secs => $2)
       ${userId ? "and user_id = $3" : ""}
     returning user_id`,
    userId ? [shortCodes, ctx.config.shortLivedSeconds, userId] : [shortCodes, ctx.config.shortLivedSeconds],
  );
  if (!userId) for (const u of new Set(rows.map((r) => r.user_id as string))) await push(ctx, u);
  return rows.length > 0;
}
