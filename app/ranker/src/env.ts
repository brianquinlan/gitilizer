// Minimal .env loader: KEY=VALUE lines, without overriding variables already set.
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { ROOT } from "./prioritizer.ts";

export function loadDotenv(path?: string): void {
  const candidates = path ? [path] : [join(process.cwd(), ".env"), join(ROOT, ".env")];
  for (const p of candidates) {
    if (!existsSync(p)) continue;
    for (let line of readFileSync(p, "utf8").replace(/^﻿/, "").split(/\r?\n/)) {
      line = line.trim();
      if (!line || line.startsWith("#") || !line.includes("=")) continue;
      const i = line.indexOf("=");
      const key = line.slice(0, i).trim();
      const value = line.slice(i + 1).trim().replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");
      if (key && value && !(key in process.env)) process.env[key] = value;
    }
    return;
  }
}

/**
 * Resolves a path the way the person typed it. `npm run … -w app/ranker` runs
 * in app/ranker, so relative paths are taken from where npm was started (INIT_CWD).
 */
export function fromCwd(p: string): string {
  return resolve(process.env.INIT_CWD ?? process.cwd(), p);
}
