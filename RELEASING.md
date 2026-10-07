# Releasing a new version

This checklist is for the maintainer. Installing doesn't need it.

1. **Bump the release.** Set `version`, `date`, `phase` and `name` in `APP_RELEASE`
   in `compass-lite.html`, and add a note at the top of `APP_RELEASE.notes`.
   That is the only place the version number lives.
2. **Update the SOP.** Edit the `<template id="sop-template">` sections for
   anything that changed, then set its `data-sop-version` to the new version.
3. **Update the Ask Lite instruction block.** Review
   `<script id="ask-lite-instructions">` and set its `data-release` to the new version.
4. **Saved data.** If a collection or field changed, add defaults in
   `META_DEFAULTS` or `REC_DEFAULTS` and, for a breaking change, raise
   `SCHEMA_VERSION`. Never delete a record to make room for a change (CL-1308).
5. **Update `CHANGELOG.md` and the README's version line.**
6. **Run the tests and the release check:**

   ```
   npx playwright test
   python3 tools/release_check.py
   ```

   The tests must all pass, at desktop and 390 pixels wide, with Ask Lite on
   and off. The release check must print `ALIGNED`. It fails if the release,
   SOP, Ask Lite instructions, changelog and README disagree, or if a feature in
   its `FEATURES` list is in the code but not in the SOP. When you add a
   feature, add a line for it to `FEATURES`.
7. **Check it in Claude.** The test stand-in cannot prove real saving, consent
   prompts or sharing. Install or update a test copy with the INSTALL.md
   message, then repeat the phase gate checks by hand (for P1: a change survives
   a reload, a backup restores into a fresh install with equal counts, the
   self-test passes, removing the only Executive Sponsor is blocked).
8. **Commit, push, and tell owners** to run the update message in `INSTALL.md`.
