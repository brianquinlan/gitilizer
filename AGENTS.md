# Notes for agents

Process knowledge for AI coding agents (and people) working on this
repository. When you learn something about how work should be done here, add
it to this file rather than anywhere else.

## Making changes

- Make changes in a branch with a name that describes them, not on `main`.
- Don't merge a pull request without the repository owner's permission.
- Follow the feature flow in
  [contributor/README.md](contributor/README.md#how-features-are-developed):
  PRD.md and Figma, then DESIGN.md if needed, then code.
- Get the user's confirmation before making changes at each stage, unless they
  asked for that change explicitly. For example, "add this to PRD.md" is
  permission to change PRD.md, but not to go on to DESIGN.md or the code.

## Formatting

- Wrap Markdown files at 80 columns. Lines that can't be broken, such as table
  rows, long links and code, may run over.

## Keep the PRD, Figma and design doc in step with the code

Together, [contributor/PRD.md](contributor/PRD.md), the
[Figma file](https://www.figma.com/design/J94JKJLNCcFUovvwfaFaqb/Gitilizer?node-id=0-1)
and [contributor/DESIGN.md](contributor/DESIGN.md) should be enough for someone
to rebuild the application with reasonable accuracy, without the documents
becoming large or pedantic. So any change that adds to or alters how the
application behaves is recorded in the same change, in the right place,
including behavior that no document covers yet:

- PRD.md, for what the application does: a new requirement, or the existing
  requirement's text (by ID, such as `LIST-22`); the matching row in Answered
  questions if its answer changes; the **Last updated** line; and a new
  revision entry at the end of the appendix.
- Figma, for how it looks: the affected frames and components.
- DESIGN.md, for how it's built: the section that explains it (for example
  [Web app](contributor/DESIGN.md#web-app)), or a new one, and its **Last
  updated** line.

Record what someone rebuilding the application would need, at the level of
detail the document already uses, not every detail of the code.
