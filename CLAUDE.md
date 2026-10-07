# Compass Lite — instructions for Claude

This repository holds one app: `compass-lite.html`, a single-file claude.ai
Artifact. The person working with you usually wants to **install it as their
own Artifact** or **update the copy they already have**. The file is code only
and carries no one's data.

## Install (a new copy)

1. Publish `compass-lite.html` **exactly as it is** with the Artifact tool.
   Do not rewrite, reformat, "fix", shorten or re-author any part of it. The
   file is tested as-is.
2. Pass the contents of `capabilities.json` **verbatim** as the `capabilities`
   input, with `icon: "compass"` and the title `Compass Lite`.
3. Give them the Artifact link and point them to INSTALL.md step 4
   (the first-run screen).

## Update (they already have a copy)

1. Ask for the link to their existing Compass Lite Artifact if you don't have it.
2. Read it first (Artifact `action: "read"`), then publish the current
   `compass-lite.html` from this repository to that same `url`, unchanged.
3. Omit `capabilities` so the stored declaration carries forward, unless
   `capabilities.json` has changed since their version. In that case pass it verbatim.
4. Their records live in the Artifact's database, which republishing keeps.
   Still remind them to download a backup from Set-up first.
5. Tell them which version they're now on: the newest entry in `CHANGELOG.md`,
   which also shows in their footer and on Set-up.

## Never

- Never commit or upload a backup `.json` file to this repository. Backups are
  business data. `.gitignore` already excludes them.
- Never add sample names, goals, figures or other seed data to the HTML. Only
  reference data labelled Template belongs in it.

## Developing Compass Lite

- `SPEC.md` is the build specification. Build one phase at a time (section 9)
  and only the requirements marked for that phase.
- `reference/demo.html` is the UI reference for tabs, labels and styling. Do not
  copy its sample data.
- Keep everything in `compass-lite.html`. External libraries only from
  cdnjs.cloudflare.com or cdn.jsdelivr.net at the pinned versions in SPEC.md 5.1.
- Each phase adds `tests/pN.spec.js`. Run `npx playwright test` and
  `python3 tools/release_check.py` and follow `RELEASING.md` before a release.
