// Database access. Uses Postgres when DATABASE_URL is set, otherwise PGlite
// (Postgres compiled to WebAssembly) so the prototype runs with no install.
import type { PGlite } from "@electric-sql/pglite";
import pg from "pg";
import { log } from "./log.ts";

export interface Db {
  query<T = any>(sql: string, params?: unknown[]): Promise<T[]>;
  one<T = any>(sql: string, params?: unknown[]): Promise<T | undefined>;
  exec(sql: string): Promise<void>;
  tx<T>(fn: (db: Db) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}

// Upgrades a database made by an earlier version of the prototype (for example
// a local-mode database in .local/). Runs before SCHEMA, and every statement is
// safe to run again.
const BEFORE_SCHEMA = `
do $$ begin
  if exists (select 1 from information_schema.tables where table_name = 'interested_repos')
     and not exists (select 1 from information_schema.tables where table_name = 'additional_repos') then
    alter table interested_repos rename to additional_repos;
    alter table additional_repos rename column filter to prioritization_prompt;
    update additional_repos set access = 'checking' where access not in ('ok', 'not_found', 'sso_required', 'token_type_blocked', 'archived');
  end if;
  if exists (select 1 from information_schema.columns where table_name = 'collaborators' and column_name = 'exists_on_github') then
    alter table collaborators add column if not exists status text not null default 'unknown';
    update collaborators set status = case exists_on_github when true then 'ok' when false then 'not_found' else 'unknown' end;
    alter table collaborators drop column exists_on_github;
  end if;
end $$;
`;

const SCHEMA = `
create table if not exists users (
  id text primary key,
  provider text not null,
  provider_user_id text not null,
  name text not null,
  email text not null,
  avatar_url text,
  github_login text,
  sign_in_login text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  next_scan_at timestamptz,
  ever_ranked boolean not null default false,
  first_sync_done boolean not null default false,
  ranking_paused_until timestamptz,
  ranking_paused_code text,
  last_full_scan_at timestamptz,
  setup_completed_at timestamptz,
  unique (provider, provider_user_id)
);
create table if not exists user_activity (
  user_id text not null references users(id) on delete cascade,
  day date not null,
  primary key (user_id, day)
);
create table if not exists sessions (
  id text primary key,
  user_id text not null references users(id) on delete cascade,
  expires_at timestamptz not null
);
create table if not exists credentials (
  user_id text not null references users(id) on delete cascade,
  kind text not null,
  ciphertext text not null,
  nonce text not null,
  expires_at timestamptz,
  token_login text,
  token_type text,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind)
);
create table if not exists settings (
  user_id text primary key references users(id) on delete cascade,
  custom_prompt text,
  sort_prioritized jsonb not null default '{"column":"priority","dir":"asc"}',
  sort_icebox jsonb not null default '{"column":"type","dir":"asc"}'
);
create table if not exists additional_repos (
  user_id text not null references users(id) on delete cascade,
  full_name text not null,
  prioritization_prompt text not null default '',
  access text not null default 'checking',
  token_type text,
  checked_at timestamptz,
  position int not null default 0,
  primary key (user_id, full_name)
);
create table if not exists collaborators (
  user_id text not null references users(id) on delete cascade,
  login text not null,
  status text not null default 'unknown',
  avatar_url text,
  checked_at timestamptz,
  position int not null default 0,
  primary key (user_id, login)
);
create table if not exists items (
  key text primary key,
  kind text not null,
  title text not null,
  html_url text not null,
  state text not null,
  draft boolean not null default false,
  updated_at timestamptz not null,
  snapshot jsonb,
  snapshot_updated_at timestamptz
);
create table if not exists user_items (
  user_id text not null references users(id) on delete cascade,
  item_key text not null references items(key),
  reasons text[] not null,
  mention_handle text,
  status text not null default 'active',
  iceboxed_at timestamptz,
  score double precision,
  actionable boolean,
  next_action text,
  reasoning text,
  ranked_at timestamptz,
  ranked_updated_at timestamptz,
  ranked_model text,
  rank_failed boolean not null default false,
  rank_error text,
  gone_reason text,
  gone_at timestamptz,
  primary key (user_id, item_key)
);
create table if not exists scans (
  id bigserial primary key,
  user_id text not null references users(id) on delete cascade,
  kind text not null default 'full',
  trigger text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  outcome text,
  error_code text,
  heartbeat_at timestamptz
);
create unique index if not exists scans_one_running on scans(user_id) where finished_at is null;
create table if not exists rank_batches (
  id text primary key,
  user_id text not null references users(id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default now(),
  finished_at timestamptz
);
create table if not exists rank_jobs (
  id bigserial primary key,
  user_id text not null references users(id) on delete cascade,
  item_key text not null,
  kind text not null default 'rank',
  reason text not null,
  priority int not null default 0,
  batch_id text,
  state text not null default 'queued',
  attempts int not null default 0,
  lease_expires_at timestamptz,
  not_before timestamptz not null default now(),
  model text,
  error_code text,
  item_updated_at timestamptz,
  created_at timestamptz not null default now(),
  finished_at timestamptz
);
create table if not exists notifications (
  user_id text not null references users(id) on delete cascade,
  code text not null,
  subject text not null default '',
  params jsonb not null default '{}',
  first_detected_at timestamptz not null default now(),
  condition_since timestamptz not null default now(),
  shown boolean not null default false,
  seen_at timestamptz,
  primary key (user_id, code, subject)
);
create table if not exists list_versions (
  user_id text primary key references users(id) on delete cascade,
  version bigint not null default 0
);
create table if not exists gemini_quota (
  user_id text not null references users(id) on delete cascade,
  model text not null,
  exhausted_until timestamptz not null,
  primary key (user_id, model)
);
create table if not exists deleted_users (
  id text primary key,
  deleted_at timestamptz not null default now()
);
-- Open tabs, reported by the web app every minute (design: Scheduler). In the database, so every
-- process sees them: the API process that receives a report isn't necessarily the one that scans.
create table if not exists presence (
  user_id text not null references users(id) on delete cascade,
  tab_id text not null,
  visible boolean not null,
  at timestamptz not null default now(),
  primary key (user_id, tab_id)
);
-- Scans asked for and not yet started: one row per developer. Any scanner process claims them.
create table if not exists scan_requests (
  user_id text primary key references users(id) on delete cascade,
  trigger text not null,
  requested_at timestamptz not null default now(),
  not_before timestamptz not null default now()
);
-- Work that only one process does at a time (the scheduler's periodic pass), held by renewing.
create table if not exists leases (
  name text primary key,
  holder text not null,
  expires_at timestamptz not null
);
-- Live-update events too large for a NOTIFY payload; kept a few minutes (design: Live updates).
create table if not exists relay_events (
  id bigserial primary key,
  payload text not null,
  created_at timestamptz not null default now()
);
-- Sign-ins in progress: the OAuth state, PKCE verifier and nonce, for 10 minutes (design: Sign-in and sessions).
create table if not exists oauth_states (
  state text primary key,
  provider text not null,
  verifier text not null,
  nonce text not null,
  next text not null default '/',
  created_at timestamptz not null default now()
);
`;

// Columns added after the first prototype, for databases made before them.
const AFTER_SCHEMA = `
alter table users add column if not exists last_full_scan_at timestamptz;
alter table users add column if not exists sign_in_login text;
alter table scans add column if not exists heartbeat_at timestamptz;
alter table credentials add column if not exists token_login text;
alter table credentials add column if not exists token_type text;
alter table credentials drop column if exists validated_at;
alter table credentials drop column if exists validation_ok;
alter table credentials drop column if exists validation_detail;
alter table settings drop column if exists review_teams;
alter table settings drop column if exists review_teams_fetched_at;
alter table additional_repos add column if not exists token_type text;
alter table additional_repos add column if not exists checked_at timestamptz;
alter table collaborators add column if not exists avatar_url text;
alter table collaborators add column if not exists checked_at timestamptz;
alter table collaborators add column if not exists position int not null default 0;
alter table items add column if not exists draft boolean not null default false;
alter table user_items add column if not exists ranked_model text;
alter table user_items add column if not exists rank_error text;
alter table user_items add column if not exists gone_at timestamptz;
update user_items set reasons = array_replace(reasons, 'interested_repo', 'additional_repo') where 'interested_repo' = any(reasons);
alter table scans add column if not exists kind text not null default 'full';
alter table rank_jobs add column if not exists kind text not null default 'rank';
alter table rank_jobs add column if not exists priority int not null default 0;
alter table rank_jobs add column if not exists batch_id text;
alter table rank_jobs add column if not exists model text;
alter table rank_jobs add column if not exists item_updated_at timestamptz;
drop index if exists rank_jobs_one_queued;
create unique index if not exists rank_jobs_one_open on rank_jobs(user_id, item_key, kind) where state in ('queued', 'leased');
create index if not exists rank_jobs_claim on rank_jobs(state, not_before, priority);
alter table notifications add column if not exists seen_at timestamptz;
`;

function wrapPg(pool: pg.Pool | pg.PoolClient, isClient = false): Db {
  return {
    async query(sql, params) { return (await pool.query(sql, params as any[])).rows; },
    async one(sql, params) { return (await pool.query(sql, params as any[])).rows[0]; },
    async exec(sql) { await pool.query(sql); },
    async tx(fn) {
      if (isClient) return fn(this);
      const client = await (pool as pg.Pool).connect();
      try {
        await client.query("begin");
        const r = await fn(wrapPg(client, true));
        await client.query("commit");
        return r;
      } catch (e) {
        await client.query("rollback");
        throw e;
      } finally {
        client.release();
      }
    },
    async close() { if (!isClient) await (pool as pg.Pool).end(); },
  };
}

function wrapPglite(db: PGlite): Db {
  // PGlite is single-connection; serialise transactions with a promise chain.
  let chain: Promise<unknown> = Promise.resolve();
  const self: Db = {
    async query(sql, params) { return (await db.query(sql, params as any[])).rows as any[]; },
    async one(sql, params) { return (await db.query(sql, params as any[])).rows[0] as any; },
    async exec(sql) { await db.exec(sql); },
    tx(fn) {
      const run = chain.then(() => db.transaction(async (t) => fn({
        async query(sql, params) { return (await t.query(sql, params as any[])).rows as any[]; },
        async one(sql, params) { return (await t.query(sql, params as any[])).rows[0] as any; },
        async exec(sql) { await t.exec(sql); },
        tx: (inner) => inner(self),
        close: async () => {},
      })));
      chain = run.catch(() => undefined);
      return run as any;
    },
    async close() { await db.close(); },
  };
  return self;
}

/**
 * Characters Postgres text and jsonb can't hold: U+0000, and a UTF-16 surrogate
 * without its other half. GitHub content (a comment, a commit message, a diff)
 * occasionally has them, and one would fail the whole write.
 */
const UNSTORABLE = /\u0000|[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/g;

/** `s` with every character Postgres can't store replaced by U+FFFD. */
export function pgText(s: string): string {
  return s.replace(UNSTORABLE, "\uFFFD");
}

/** `value` as JSON for a jsonb column, with its strings made storable by `pgText`. */
export function pgJson(value: unknown): string {
  return JSON.stringify(value, (_key, v) => (typeof v === "string" ? pgText(v) : v));
}

/** Any number, the same in every process: serialises schema upgrades between processes that start together. */
const SCHEMA_LOCK = 4_242_001;

/**
 * Opens the database and brings its schema up to date. With Postgres, `poolMax` is the most connections this
 * process opens (DATABASE_POOL_MAX); Cloud SQL's limit is shared by every process and both environments.
 */
export async function openDb(url: string | undefined, dataDir: string | undefined, poolMax = 20): Promise<Db> {
  if (url) {
    const pool = new pg.Pool({ connectionString: url, max: poolMax });
    // An idle client that loses its connection (a Cloud SQL restart) mustn't crash the process.
    pool.on("error", (e) => log.warn("db", "an idle database connection failed", { error: String(e) }));
    const db = wrapPg(pool);
    // During a deployment the old and new revisions start side by side; upgrading in a transaction that holds
    // a lock means one finishes before the other begins (contributor/DEPLOYMENT.md, "Database changes").
    await db.tx(async (t) => {
      await t.query(`select pg_advisory_xact_lock($1)`, [SCHEMA_LOCK]);
      await t.exec(BEFORE_SCHEMA);
      await t.exec(SCHEMA);
      await t.exec(AFTER_SCHEMA);
    });
    return db;
  }
  const { PGlite } = await import("@electric-sql/pglite");
  const db = wrapPglite(new PGlite(dataDir));
  await db.exec(BEFORE_SCHEMA);
  await db.exec(SCHEMA);
  await db.exec(AFTER_SCHEMA);
  return db;
}
