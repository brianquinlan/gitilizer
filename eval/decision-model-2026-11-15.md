# `gemini-decision-1` as a ranker (2026-11-15)

`gemini-decision-1` (released 2026-11-11) is Google's model for the Decisions
API. It scores fixed-choice questions in one pass and writes no text, at
US$0.10 per million input tokens and nothing for output. It was measured as a
candidate for a free tier that Gitilizer pays for.

## How it was measured

The model can't be called through `generateContent`, which is what the ranker
uses: every request returns 404, and `ModelService.GetModel` lists
`createDecision` as its only method. `@google/genai` 2.32 has no Decisions API
(3.2 or later does), so the runs used a small adapter that posts to
`https://generativelanguage.googleapis.com/v1beta/decisions`. The adapter is
not in the repository; it is in the appendix.

For each item the adapter sends the prompt and the item's context as the
input, with two questions:

- `priority`, a `score` question whose eight levels are the eight ranges of the
  prompt's Scale section, lowest first. The item's priority is the midpoint of
  each range weighted by the probability the model gives it.
- `actionable`, a `noul` (yes or no) question: is the next action on me right
  now? True at 0.5 or above.

`next_action` and `reasoning` are empty, so an item ranked this way has no
"Why rank #n?" text.

## Results

Pointwise strategy, all 36 items in `eval/ground_truth.yaml`. The model
returned the same answers on every trial, so the standard deviation is 0 and
the v5 run has one trial. The other rows are from
[prompt-v5-2026-11-07.md](prompt-v5-2026-11-07.md).

| Model | Prompt | Kendall tau | Tau, set A | Tau, set B | Top-3 overlap | Top-5 overlap | Top-10 overlap | Mean rank error | Input tokens / item | Cost / item | Run |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `gemini-3.8-flash` (low) | v4 | 0.713 ± 0.016 | 0.883 | 0.565 | 1.00 | – | – | 3.69 | 4,860 | $0.0041 | `20261108-024745-v4-gemini-low` |
| `gemini-3.8-flash` (low) | v5 | 0.716 ± 0.015 | 0.867 | 0.586 | 1.00 | – | – | 3.72 | 5,454 | $0.0046 | `20261108-024929-v5-gemini-low` |
| `gpt-6-luna` | v5 | 0.596 ± 0.055 | 0.739 | 0.414 | 0.78 | – | – | 5.18 | 4,991 | $0.0006 | `20261108-025117-v5-gpt-6-luna` |
| `claude-haiku-5-5` | v5 | 0.583 ± 0.043 | 0.778 | 0.389 | 0.89 | – | – | 5.32 | 7,476 | $0.0009 | `20261108-025042-v5-claude-haiku` |
| `gemini-decision-1` | v5 | 0.575 | 0.817 | 0.379 | 0.67 | 1.00 | 0.80 | 5.72 | 5,898 | $0.0006 | `20261115-173920-decisions-api-v5` |
| `gemini-decision-1` | v4 | 0.546 | 0.783 | 0.305 | 0.67 | 1.00 | 0.80 | 6.06 | 5,304 | $0.0005 | `20261115-173640-decisions-api-v4` |

- Overall it ranks about as well as the small Claude and OpenAI models, and
  below `gemini-3.8-flash` at low thinking, at about an eighth of the cost.
- The top of the list is close to production's. With v5 its first ten items
  are the truth's 1, 2, 5, 3, 4, 10, 7, 17, 13 and 8. The first trial of
  `gemini-3.8-flash` (low, v4) gives 1, 2, 3, 4, 5, 7, 36, 6, 17 and 8. Both
  have the right five items first and eight of the true top ten in their top
  ten.
- The loss is in the order of the middle and the bottom of the list, and
  mostly in set B, the held-out set.

## Limits

Google's rate limits for the model, as reported on 2026-11-15: the free tier
allows 200 requests and 50,000 tokens a minute and 10,000 requests a day, and
Google may use its data to improve its products. Tier 1 allows 1,500 requests
and 1,000,000 tokens a minute and 50,000 requests a day. Tier 2 (US$100 paid on
the billing account, 3 days after the first payment) allows 5,000 requests and
4,000,000 tokens a minute, with no daily limit. The adapter makes one request
per item.

## Caveats

One ranker, 36 items, and the questions were written once and not tuned. A
different question design (for example, separate questions for actionability
and age), or several items in one request, was not tried.

## Follow-up: the production client, and a prompt with no scale

Basic ranking's client (`app/ranker/src/decision.ts`) doesn't have the ranges
written into it, as the adapter below does: it reads them from the ranking
prompt in use, and offers five generic levels, from "nothing for me to do" to
"urgent", when the prompt has fewer than two
([design](../contributor/DESIGN.md#the-ranking-agent)). Two runs on 2026-11-15,
each of 3 identical trials:

| Client | Prompt | Ranges offered | Kendall tau | Tau, set A | Tau, set B | Top-3 overlap | Top-5 overlap | Top-10 overlap | Mean rank error | Run |
|---|---|---|---|---|---|---|---|---|---|---|
| Production | v4 | The eight in the prompt | 0.546 | 0.783 | 0.305 | 0.67 | 1.00 | 0.80 | 6.06 | Not kept: every figure equals `20261115-173640-decisions-api-v4` |
| Production | v4 without its Scale section | Five generic levels | 0.559 | 0.850 | 0.305 | 0.67 | 0.80 | 0.70 | 5.78 | `20261115-221550-decision-no-scale` |

- With the default prompt the production client sends the request the adapter
sent, and gets the same answers.
- A prompt with no score ranges ranks about as well overall with the generic
  levels, and a little worse at the very top: four of the true first five in its
  first five, and seven of the first ten. So a custom ranking prompt (`SET-24`)
  works with basic ranking whether or not it defines a scale. The scores are
  closer together (0.33 to 0.82 here), which doesn't matter to the order.
- The second prompt was `prompts/v4.md` with the "Scale" section removed, and
  isn't kept in `prompts/`; the run's `contexts/_system.txt` has its text.

## Appendix: the adapter

`createLLM` returned this for models whose name starts with `gemini-decision`.

```ts
import { classifyGemini, InvalidOutput } from "./gemini.ts";
import type { LLM, OutputSchema, Usage } from "./prioritizer.ts";

// [low, high, description]: the ranges of the prompt's Scale section, lowest
// first, with the descriptions copied from prompts/v4.md.
const BANDS: [number, number, string][] = [
  [0.0, 0.05, "Nothing for me to do: ..."],
  [0.05, 0.15, "My PRs waiting on a reviewer I recently asked; ..."],
  [0.15, 0.35, "Issues that have a PR covering them; ..."],
  [0.35, 0.5, "Recent questions I'm waiting on in my own repositories; ..."],
  [0.5, 0.65, "My own planned work: ..."],
  [0.65, 0.8, "Reviews waiting on me in my repositories ..."],
  [0.8, 0.9, "I'm blocking someone right now: ..."],
  [0.9, 1.0, "Security issues or security PRs that need me."],
];

export class DecisionLLM implements LLM {
  constructor(public model: string, private apiKey = process.env.GEMINI_API_KEY!, private maxRetries = 6) {}

  async generate<T>(system: string, user: string, schema: OutputSchema<T>): Promise<{ result: T; usage: Usage }> {
    if (schema.name !== "ItemAssessment") throw new InvalidOutput(`pointwise only, not ${schema.name}`);
    const body = {
      model: this.model,
      input: [{ type: "text", text: system + "\n\n" }, { type: "text", text: user }],
      questions: {
        priority: {
          type: "score",
          instructions: "Following the instructions above, how much does this GitHub item deserve my attention right now? Pick the band from the Scale section.",
          criteria: BANDS.map((b) => b[2]),
        },
        actionable: {
          type: "noul",
          instructions: "Following the instructions above, is the next action on this item on me right now (not waiting on someone else)?",
        },
      },
    };
    let delay = 2000;
    for (let attempt = 0; ; attempt++) {
      try {
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/decisions", {
          method: "POST",
          headers: { "x-goog-api-key": this.apiKey, "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        const text = await res.text();
        if (!res.ok) throw Object.assign(new Error(`${res.status} ${text.slice(0, 500)}`), { status: res.status });
        const d = JSON.parse(text);
        let priority = 0;
        for (const [k, p] of Object.entries(d.answers.priority.probabilities as Record<string, number>)) {
          const [lo, hi] = BANDS[Number(k)];
          priority += p * (lo + hi) / 2;
        }
        const pAct: number = d.answers.actionable.noul;
        const result = { actionable: pAct >= 0.5, next_action: "", priority, reasoning: "" };
        return { result: schema.zod.parse(result), usage: { prompt_tokens: d.usage?.total_input_tokens ?? null, output_tokens: 0, thinking_tokens: 0 } };
      } catch (e) {
        const c = classifyGemini(e);
        if (!["rate_limited", "unavailable"].includes(c.code) || attempt >= this.maxRetries) throw c;
        await new Promise((r) => setTimeout(r, Math.max(delay, (c.retryAfter ?? 0) * 1000)));
        delay *= 2;
      }
    }
  }
}
```
