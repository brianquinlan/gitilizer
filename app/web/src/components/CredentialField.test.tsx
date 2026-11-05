import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EyeToggle } from "./CredentialField.tsx";

const render = (show: boolean) => renderToStaticMarkup(<EyeToggle show={show} onToggle={() => {}} />);
// EyeOffIcon is the only eye with a slash, drawn as a <line>.
const slashed = (html: string) => html.includes("<line");

describe("EyeToggle", () => {
  it("offers to show a masked value, with an open eye", () => {
    const html = render(false);
    expect(html).toContain('aria-label="Show"');
    expect(slashed(html)).toBe(false);
  });

  it("offers to hide a shown value, with a slashed eye", () => {
    const html = render(true);
    expect(html).toContain('aria-label="Hide"');
    expect(slashed(html)).toBe(true);
  });

  it("isn't a toggle button, so its state can't contradict its label", () => {
    expect(render(false)).not.toContain("aria-pressed");
    expect(render(true)).not.toContain("aria-pressed");
  });
});
