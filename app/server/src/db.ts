// Database access. Uses Postgres when DATABASE_URL is set, otherwise PGlite
// (Postgres compiled to WebAssembly) so the prototype runs with no install.
import type { PGlite } from "@electric-sql/pglite";
import pg from "pg";

export interface Db {
  query<T = any>(sql: string, params?: unknown[]): Promise<T[]>;
  one<T = any>(sql: string, params?: unknown[]): Promise<T | undefined>;
  exec(sql: string): Promise<void>;
  tx<T>(fn: (db: Db) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}

const SCHEMA = `
create table if not exists users (
  id text primary key,
  provider text not null,
  provider_user_id text not null,
  name text not null,
  email text not null,
  avatar_url text,
  github_login text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  next_scan_at timestamptz,
  ever_ranked boolean not null default false,
  first_sync_done boolean not null default false,
  ranking_paused_until timestamptz,
  ranking_paused_code text,
  last_manual_sync_at timestamptz,
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
  validated_at timestamptz,
  validation_ok boolean,
  validation_detail text,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind)
);
create table if not exists settings (
  user_id text primary key references users(id) on delete cascade,
  custom_prompt text,
  sort_prioritized jsonb not null default '{"column":"priority","dir":"asc"}',
  sort_icebox jsonb not null default '{"column":"type","dir":"asc"}',
  review_teams text[] not null default '{}',
  review_teams_fetched_at timestamptz
);
create table if not exists interested_repos (
  user_id text not null references users(id) on delete cascade,
  full_name text not null,
  filter text not null default '',
  access text not null default 'unknown',
  position int not null default 0,
  primary key (user_id, full_name)
);
create table if not exists collaborators (
  user_id text not null references users(id) on delete cascade,
  login text not null,
  exists_on_github boolean,
  primary key (user_id, login)
);
create table if not exists items (
  key text primary key,
  kind text not null,
  title text not null,
  html_url text not null,
  state text not null,
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
  rank_failed boolean not null default false,
  gone_reason text,
  primary key (user_id, item_key)
);
create table if not exists scans (
  id bigserial primary key,
  user_id text not null references users(id) on delete cascade,
  trigger text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  outcome text,
  error_code text
);
create unique index if not exists scans_one_running on scans(user_id) where finished_at is null;
create table if not exists rank_jobs (
  id bigserial primary key,
  user_id text not null references users(id) on delete cascade,
  item_key text not null,
  reason text not null,
  state text not null default 'queued',
  attempts int not null default 0,
  lease_expires_at timestamptz,
  not_before timestamptz not null default now(),
  error_code text,
  created_at timestamptz not null default now(),
  finished_at timestamptz
);
create unique index if not exists rank_jobs_one_queued on rank_jobs(user_id, item_key) where state in ('queued', 'leased');
create table if not exists notifications (
  user_id text not null references users(id) on delete cascade,
  code text not null,
  subject text not null default '',
  params jsonb not null default '{}',
  first_detected_at timestamptz not null default now(),
  condition_since timestamptz not null default now(),
  shown boolean not null default false,
  primary key (user_id, code, subject)
);
create table if not exists list_versions (
  user_id text primary key references users(id) on delete cascade,
  version bigint not null default 0
);
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

export async function openDb(url: string | undefined, dataDir: string | undefined): Promise<Db> {
  let db: Db;
  if (url) {
    db = wrapPg(new pg.Pool({ connectionString: url, max: 20 }));
  } else {
    const { PGlite } = await import("@electric-sql/pglite");
    db = wrapPglite(new PGlite(dataDir));
  }
  await db.exec(SCHEMA);
  return db;
}
