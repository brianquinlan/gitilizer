# Notes for agents

Process knowledge for AI coding agents (and people) working on this repository. When you learn something about how work should be done here, add it to this file rather than anywhere else.

## Keep the PRD and design doc in step with the code

When a change alters behavior that the documents describe, update them in the same change:

- [contributor/PRD.md](contributor/PRD.md): the requirement's text (by ID, such as `LIST-22`), the matching row in Answered questions if its answer changes, the **Last updated** line, and a new revision entry at the end of the appendix.
- [contributor/DESIGN.md](contributor/DESIGN.md): the section that explains how it's built (for example [Web app](contributor/DESIGN.md#web-app)), and its **Last updated** line.

If neither document covers the behavior, no update is needed. `contributor/PRD.md` replaces the original Google Doc PRD, so change the Markdown file, not the Google Doc.
