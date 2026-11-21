// @vitest-environment jsdom
// The clock row indicators run on stops while the tab is hidden (PRD LIVE-18).
import { afterEach, expect, it, vi } from "vitest";
import { visibleNow } from "./visibleClock.ts";

const setHidden = (hidden: boolean) => {
  Object.defineProperty(document, "hidden", { value: hidden, configurable: true });
  document.dispatchEvent(new Event("visibilitychange"));
};
afterEach(() => { vi.restoreAllMocks(); delete (document as { hidden?: boolean }).hidden; });

it("doesn't count time while the tab is hidden", () => {
  const now = vi.spyOn(Date, "now").mockReturnValue(1_000_000);
  const start = visibleNow();
  now.mockReturnValue(1_002_000);
  expect(visibleNow() - start).toBe(2000);
  setHidden(true);
  now.mockReturnValue(1_062_000);
  expect(visibleNow() - start).toBe(2000);
  setHidden(false);
  now.mockReturnValue(1_063_000);
  expect(visibleNow() - start).toBe(3000);
});
