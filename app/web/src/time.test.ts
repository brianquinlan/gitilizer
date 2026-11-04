import { describe, expect, it } from "vitest";
import { relativeTime } from "./time.ts";

describe("relativeTime", () => {
  const now = Date.parse("2026-11-03T12:00:00Z");

  it("shows short relative times for the last 30 days", () => {
    expect(relativeTime("2026-11-03T11:59:30Z", now)).toBe("just now");
    expect(relativeTime("2026-11-03T11:55:00Z", now)).toBe("5m ago");
    expect(relativeTime("2026-11-03T09:00:00Z", now)).toBe("3h ago");
    expect(relativeTime("2026-10-31T12:00:00Z", now)).toBe("3d ago");
  });

  it("shows month and day for older dates in the current year", () => {
    const text = relativeTime(new Date(2026, 5, 15, 12).toISOString(), now);
    expect(text).toContain("15");
    expect(text).not.toContain("2026");
  });

  it("says last year for the previous calendar year when under a year has passed", () => {
    expect(relativeTime("2025-11-25T12:00:00Z", now)).toBe("last year");
    expect(relativeTime("2025-11-20T12:00:00Z", Date.parse("2026-01-05T12:00:00Z"))).toBe("last year");
  });

  it("counts whole years elapsed once a year has passed", () => {
    expect(relativeTime("2025-11-01T12:00:00Z", now)).toBe("1y ago");
    expect(relativeTime("2025-01-15T12:00:00Z", now)).toBe("1y ago");
    expect(relativeTime("2024-06-15T12:00:00Z", now)).toBe("2y ago");
    expect(relativeTime("2019-06-15T12:00:00Z", now)).toBe("7y ago");
  });

  it("keeps days for recent dates across a year boundary", () => {
    expect(relativeTime("2025-12-20T12:00:00Z", Date.parse("2026-01-05T12:00:00Z"))).toBe("16d ago");
  });
});
