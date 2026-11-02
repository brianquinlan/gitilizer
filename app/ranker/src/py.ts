// Small helpers that reproduce Python's formatting exactly, so the ranker's
// prompts are byte-for-byte what the Python version produced. Evaluation results
// measured with the Python ranker therefore still apply (PRD RANK-7).

/** A timestamp with the UTC offset it was written in (Python's aware datetime). */
export type Time = { ms: number; offsetMin: number };

/** datetime.fromisoformat(s.replace("Z", "+00:00")), or null for an empty value. */
export function parseTime(s: string | null | undefined): Time | null {
  if (!s) return null;
  const m = /([+-])(\d\d):?(\d\d)$/.exec(s);
  const offsetMin = s.endsWith("Z") || !m ? 0 : (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3]));
  const ms = Date.parse(m || s.endsWith("Z") ? s : `${s}Z`);
  if (Number.isNaN(ms)) throw new Error(`Invalid isoformat string: '${s}'`);
  return { ms, offsetMin };
}

/** t.strftime('%Y-%m-%d %H:%M') in the time's own offset. */
export function strftimeMinutes(t: Time): string {
  const d = new Date(t.ms + t.offsetMin * 60_000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`;
}

/** ISO 8601 in UTC without fractions, ending in "Z" (rewind.py's _iso). */
export function isoZ(ms: number): string {
  return new Date(Math.floor(ms / 1000) * 1000).toISOString().replace(".000Z", "Z");
}

// ---------------------------------------------------------------------------
// Rounding and numbers
// ---------------------------------------------------------------------------

/** The exact decimal expansion of a double, as sign, integer digits and fraction digits. */
function exactDecimal(x: number): { neg: boolean; int: string; frac: string } {
  const neg = x < 0 || Object.is(x, -0);
  const s = Math.abs(x).toFixed(100).replace(/0+$/, "");
  const [int, frac = ""] = s.split(".");
  return { neg, int, frac };
}

/** Python round(x, n): round half to even on the exact binary value. Returns a decimal string. */
function roundDigits(x: number, n: number): string {
  const { neg, int, frac } = exactDecimal(x);
  const keep = frac.slice(0, n).padEnd(n, "0");
  const rest = frac.slice(n);
  let digits = int + keep;
  const first = rest[0] ?? "0";
  const tail = rest.slice(1).replace(/0/g, "");
  const lastDigit = Number(digits[digits.length - 1]);
  const up = first > "5" || (first === "5" && (tail.length > 0 || lastDigit % 2 === 1));
  if (up) digits = (BigInt(digits) + 1n).toString().padStart(digits.length, "0");
  const i = digits.length - n;
  const intPart = digits.slice(0, i) || "0";
  const out = n ? `${intPart}.${digits.slice(i)}` : intPart;
  return (neg && /[1-9]/.test(out) ? "-" : "") + out.replace(/^0+(?=\d)/, "");
}

/** Python round(x) (to an int). */
export function pyRoundInt(x: number): number {
  return Number(roundDigits(x, 0));
}

/** Python round(x, n) for n > 0, as a float. */
export function pyRound(x: number, n: number): number {
  return Number(roundDigits(x, n));
}

/** f"{x:.{n}f}". */
export function fixed(x: number, n: number): string {
  return roundDigits(x, n);
}

/** A float as Python prints it (repr / str): shortest round-trip, with ".0" for whole numbers. */
export function pyFloat(x: number): string {
  if (Number.isNaN(x)) return "nan";
  if (!Number.isFinite(x)) return x > 0 ? "inf" : "-inf";
  const s = String(x);
  if (/e/.test(s)) {
    const [m, e] = s.split("e");
    const exp = Number(e);
    if (exp >= -4 && exp < 16) return String(Number(s)).includes(".") ? String(Number(s)) : `${Number(s)}.0`;
    return `${m}e${exp < 0 ? "-" : "+"}${String(Math.abs(exp)).padStart(2, "0")}`;
  }
  if (Math.abs(x) >= 1e16) {
    const [m, e] = x.toExponential().split("e");
    return `${m}e+${e.replace("+", "").padStart(2, "0")}`;
  }
  return Number.isInteger(x) ? `${s}.0` : s;
}

/** Marks a number as a Python float so repr() prints "3.0" rather than "3". */
export class Float { constructor(public value: number) {} }
export const float = (x: number) => new Float(x);

// ---------------------------------------------------------------------------
// repr() and str()
// ---------------------------------------------------------------------------

const NON_PRINTABLE = /[\p{Cc}\p{Cf}\p{Cs}\p{Co}\p{Cn}\p{Zl}\p{Zp}]|(?! )\p{Zs}/u;

/** Python's repr() of a str. */
export function reprStr(s: string): string {
  const quote = s.includes("'") && !s.includes('"') ? '"' : "'";
  let out = quote;
  for (const ch of s) {
    const cp = ch.codePointAt(0)!;
    if (ch === quote || ch === "\\") out += `\\${ch}`;
    else if (ch === "\n") out += "\\n";
    else if (ch === "\r") out += "\\r";
    else if (ch === "\t") out += "\\t";
    else if (NON_PRINTABLE.test(ch)) {
      out += cp < 0x100 ? `\\x${cp.toString(16).padStart(2, "0")}`
        : cp < 0x10000 ? `\\u${cp.toString(16).padStart(4, "0")}`
        : `\\U${cp.toString(16).padStart(8, "0")}`;
    } else out += ch;
  }
  return out + quote;
}

/** Python's repr() of JSON-like values. Use float() for values Python holds as floats. */
export function repr(v: unknown): string {
  if (v === null || v === undefined) return "None";
  if (v === true) return "True";
  if (v === false) return "False";
  if (v instanceof Float) return pyFloat(v.value);
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : pyFloat(v);
  if (typeof v === "string") return reprStr(v);
  if (Array.isArray(v)) return `[${v.map(repr).join(", ")}]`;
  if (typeof v === "object") return `{${Object.entries(v).map(([k, x]) => `${reprStr(k)}: ${repr(x)}`).join(", ")}}`;
  return String(v);
}

/** Python's str(): strings as they are, everything else as repr(). */
export function str(v: unknown): string {
  return typeof v === "string" ? v : repr(v);
}

// ---------------------------------------------------------------------------
// Strings, by code point as Python counts them
// ---------------------------------------------------------------------------

const PY_SPACE = "\\t\\n\\x0b\\x0c\\r\\x1c-\\x1f \\x85\\xa0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000";
const STRIP = new RegExp(`^[${PY_SPACE}]+|[${PY_SPACE}]+$`, "gu");
const RSTRIP = new RegExp(`[${PY_SPACE}]+$`, "u");

/** str.strip() with no arguments. */
export const strip = (s: string) => s.replace(STRIP, "");
/** str.rstrip() with no arguments. */
export const rstrip = (s: string) => s.replace(RSTRIP, "");

/** len(s). */
export const cpLen = (s: string) => {
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c >= 0xd800 && c <= 0xdbff && i + 1 < s.length) {
      const d = s.charCodeAt(i + 1);
      if (d >= 0xdc00 && d <= 0xdfff) i++;
    }
    n++;
  }
  return n;
};

/** s[start:end] with code-point indices (negative indices count from the end). */
export function cpSlice(s: string, start: number, end?: number): string {
  if (!/[\ud800-\udfff]/.test(s)) return s.slice(start, end);
  return Array.from(s).slice(start, end).join("");
}

/** str.splitlines(). */
export function splitlines(s: string): string[] {
  const parts = s.split(/\r\n|[\n\r\x0b\x0c\x1c\x1d\x1e\x85\u2028\u2029]/);
  if (parts.length && parts[parts.length - 1] === "") parts.pop();
  return parts;
}

/** A Python \b, which treats every Unicode letter and digit as a word character. */
const W = "[\\p{L}\\p{N}_]";
export const WORD_BOUNDARY = `(?:(?<=${W})(?!${W})|(?<!${W})(?=${W}))`;

/** re.escape() for building a pattern from a login. */
export const reEscape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
