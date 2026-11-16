import { describe, expect, it } from "vitest";
import { countText, isFiltering, listUrl, matches, NO_FILTER, parseFilter, type Filter } from "./filter.ts";

const item = { title: "Retry failed webhooks with exponential backoff", repo: "northstar/api", number: 731, kind: "pr" as const };
const f = (q: string, type: Filter["type"] = "all"): Filter => ({ q, type });
const parse = (search: string) => parseFilter(new URLSearchParams(search));

describe("search and the type filter", () => {
  it("matches every word typed, ignoring case, in the title, the repository or the number (LIST-35)", () => {
    expect(matches(item, f("webhooks"))).toBe(true);
    expect(matches(item, f("WEBHOOKS Retry"))).toBe(true);
    expect(matches(item, f("northstar/api"))).toBe(true);
    expect(matches(item, f("api backoff"))).toBe(true); // words can come from different fields
    expect(matches(item, f("731"))).toBe(true);
    expect(matches(item, f("#731"))).toBe(true);
    expect(matches(item, f("#73"))).toBe(true);
    expect(matches(item, f("webhooks kubernetes"))).toBe(false); // every word, not any
    expect(matches(item, f("#732"))).toBe(false);
  });

  it("doesn't search the inclusion reason or the agent's reasoning (LIST-35)", () => {
    const withMore = { ...item, reasons: ["review_requested"], mentionHandle: "@maya", reasoning: "Blocks the payments release" };
    expect(matches(withMore, f("maya"))).toBe(false);
    expect(matches(withMore, f("review"))).toBe(false);
    expect(matches(withMore, f("payments"))).toBe(false);
  });

  it("filters by type, together with the search (LIST-36)", () => {
    expect(matches(item, f("", "pr"))).toBe(true);
    expect(matches(item, f("", "issue"))).toBe(false);
    expect(matches(item, f("webhooks", "pr"))).toBe(true);
    expect(matches(item, f("webhooks", "issue"))).toBe(false);
    expect(matches({ ...item, kind: "issue" }, f("webhooks", "issue"))).toBe(true);
  });

  it("treats a field that holds only spaces as empty (LIST-35)", () => {
    expect(isFiltering(f("   "))).toBe(false);
    expect(matches(item, f("   "))).toBe(true);
    expect(isFiltering(NO_FILTER)).toBe(false);
    expect(isFiltering(f("api"))).toBe(true);
    expect(isFiltering(f("", "issue"))).toBe(true);
  });

  it("reads the filter from the URL (LIST-40)", () => {
    expect(parse("")).toEqual(NO_FILTER);
    expect(parse("type=pr&q=api")).toEqual({ q: "api", type: "pr" });
    expect(parse("q=%20api%20docs%20&type=issue&page=3")).toEqual({ q: "api docs", type: "issue" });
    expect(parse("type=epic")).toEqual(NO_FILTER); // anything else means "All"
  });

  it("writes the filter and the page to the URL, leaving out what isn't in use (LIST-40, NAV-3)", () => {
    expect(listUrl("/", NO_FILTER)).toBe("/");
    expect(listUrl("/", NO_FILTER, 2)).toBe("/?page=2");
    expect(listUrl("/", f("api", "pr"))).toBe("/?type=pr&q=api");
    expect(listUrl("/", f("api", "pr"), 2)).toBe("/?type=pr&q=api&page=2");
    expect(listUrl("/icebox", f(" api docs "))).toBe("/icebox?q=api+docs"); // without the spaces at its ends
    expect(listUrl("/", f("   ", "issue"))).toBe("/?type=issue"); // only spaces: no q
    expect(listUrl("/", f("#731"))).toBe("/?q=%23731");
    // What listUrl writes, parseFilter reads back.
    expect(parse(listUrl("/", f("a&b=c #7", "issue"), 4).split("?")[1]!)).toEqual({ q: "a&b=c #7", type: "issue" });
  });

  it("counts the matching items against the whole list (LIST-27, LIST-38)", () => {
    expect(countText(62, 62, false)).toBe("62 issues and PRs");
    expect(countText(1, 1, false)).toBe("1 issue or PR");
    expect(countText(0, 0, false)).toBe("0 issues and PRs");
    expect(countText(3, 62, true)).toBe("3 of 62 issues and PRs");
    expect(countText(0, 62, true)).toBe("0 of 62 issues and PRs");
    expect(countText(12, 1000, true)).toBe("12 of 1,000 issues and PRs");
  });
});
