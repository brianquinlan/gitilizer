// The Preferences block (PRD SET-50), as static markup.
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Preferences } from "./Preferences.tsx";

const render = (shortcuts: boolean) => renderToStaticMarkup(<Preferences shortcuts={shortcuts} onShortcuts={() => {}} />);
const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

describe("Preferences", () => {
  it("has one switch, named and described for screen readers (SET-50)", () => {
    const html = render(true);
    expect(text(html)).toBe("PREFERENCES Keyboard shortcuts Such as / to search.");
    expect(html).toContain('role="switch"');
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain('aria-labelledby="keyboard-shortcuts-label"');
    expect(html).toContain('aria-describedby="keyboard-shortcuts-hint"');
    expect(html).toContain('<kbd class="keycap">/</kbd>');
  });

  it("keeps its own hint when shortcuts are off (KEY-3)", () => {
    const html = render(false);
    expect(html).toContain('aria-checked="false"');
    expect(text(html)).toContain("Such as / to search.");
  });
});
