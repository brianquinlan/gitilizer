// Logging (design: Logging). One line per event, with a component, a message
// and fields. In production (LOG_FORMAT=json) each line is a JSON object that
// Cloud Logging reads as a structured entry, with `severity` set; locally it is
// plain text. LOG_LEVEL (debug, info, warn, error; default info) hides the
// noisier levels, so the logs stay readable. Credentials never reach the log:
// fields whose names look like secrets are replaced (PRIV-1).
type Level = "debug" | "info" | "warn" | "error";
const ORDER: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };
const SECRET = /key|token|secret|password|authorization|cookie|ciphertext|nonce/i;

function minLevel(): number {
  return ORDER[(process.env.LOG_LEVEL ?? "info") as Level] ?? ORDER.info;
}
const asJson = () => process.env.LOG_FORMAT === "json";

function clean(fields: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, SECRET.test(k) ? "[redacted]" : v]));
}

function write(level: Level, component: string, message: string, fields: Record<string, unknown> = {}) {
  if (ORDER[level] < minLevel()) return;
  const f = clean(fields);
  const out = level === "error" || level === "warn" ? process.stderr : process.stdout;
  if (asJson()) {
    out.write(`${JSON.stringify({ severity: level.toUpperCase(), component, message, ...f, time: new Date().toISOString() })}\n`);
  } else {
    const extra = Object.entries(f).map(([k, v]) => `${k}=${typeof v === "string" ? v : JSON.stringify(v)}`).join(" ");
    out.write(`${level === "info" || level === "debug" ? "" : `${level.toUpperCase()} `}[${component}] ${message}${extra ? ` ${extra}` : ""}\n`);
  }
}

export const log = {
  debug: (component: string, message: string, fields?: Record<string, unknown>) => write("debug", component, message, fields),
  info: (component: string, message: string, fields?: Record<string, unknown>) => write("info", component, message, fields),
  warn: (component: string, message: string, fields?: Record<string, unknown>) => write("warn", component, message, fields),
  error: (component: string, message: string, fields?: Record<string, unknown>) => write("error", component, message, fields),
};
