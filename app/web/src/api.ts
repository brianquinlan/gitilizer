// Thin fetch wrapper. State-changing requests send the CSRF header (design: Security).
import { CSRF_HEADER } from "@gitilizer/shared";

export class ApiError extends Error {
  constructor(public status: number, message: string, public body?: any) { super(message); }
}

async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(path, {
    method,
    credentials: "same-origin",
    headers: { ...(body !== undefined ? { "content-type": "application/json" } : {}), ...(method !== "GET" ? { [CSRF_HEADER]: "1" } : {}) },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let msg = res.statusText;
    let data: any;
    try { data = await res.json(); msg = data.error ?? msg; } catch { /* not JSON */ }
    throw new ApiError(res.status, msg, data);
  }
  return res.status === 204 ? (undefined as T) : res.json();
}

export const api = {
  get: <T,>(p: string) => call<T>("GET", p),
  post: <T,>(p: string, b: unknown = {}) => call<T>("POST", p, b),
  put: <T,>(p: string, b: unknown) => call<T>("PUT", p, b),
  del: <T,>(p: string, b: unknown) => call<T>("DELETE", p, b),
};
