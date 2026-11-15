// The ranking picker in Settings (PRD SET-38), as static markup.
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AgentPicker } from "./AgentPicker.tsx";

const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

describe("the ranking picker", () => {
  it("has four choices in order, with their pills, labels and lines", () => {
    const html = renderToStaticMarkup(<AgentPicker agent="gemini" onPick={() => {}} idPrefix="agent" />);
    expect(text(html).trim()).toBe(
      "Gemini Google Recommended Free tier available Ranked best in our tests, at the lowest cost. "
      + "Or use an API account you already have Claude Anthropic Pay as you go OpenAI OpenAI Pay as you go "
      + "Or rank without a key Basic ranking Built in No key needed "
      + "Good for your top items, less precise below them, with no explanation for each rank.",
    );
    expect(html.match(/role="radio"/g)).toHaveLength(4);
    expect(html).toContain('id="agent-gemini" type="button" role="radio" aria-checked="true" tabindex="0"');
  });

  it("checks basic ranking when it is the choice", () => {
    const html = renderToStaticMarkup(<AgentPicker agent="basic" onPick={() => {}} idPrefix="agent" />);
    expect(html).toContain('id="agent-basic" type="button" role="radio" aria-checked="true" tabindex="0"');
    expect(html).toContain('id="agent-gemini" type="button" role="radio" aria-checked="false" tabindex="-1"');
  });
});
