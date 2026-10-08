# Releasing a new version

This checklist is for the maintainer. Installing doesn't need it.

1. **Bump the release.** Set `version`, `date`, `phase` and `name` in `APP_RELEASE`
   in `compass-lite.html`, and add a note at the top of `APP_RELEASE.notes`.
   That is the only place the version number lives.
2. **Register the capability change.** Every capability is listed in
   `const CAPABILITIES` in `compass-lite.html`, with the release in which it
   last changed. Add a new capability there, or raise `changed` to the new
   version for one you changed. Set-up steps and tools that become live in
   this phase are added automatically.
3. **Update the SOP.** Edit the `<template id="sop-template">` for anything
   that changed. The element that describes a capability carries
   `data-cap="<id>"` and `data-sop-reviewed="<version>"`: raise
   `data-sop-reviewed` when you review it. When a phase goes live, replace its
   `data-arrives="<n>"` markers with the real description. Then set the
   template's `data-sop-version` to the new version.
4. **Update the Ask Lite instruction block.** Review
   `<script id="ask-lite-instructions">` and set its `data-release` to the new version.
5. **Saved data.** If a collection or field changed, add defaults in
   `META_DEFAULTS` or `REC_DEFAULTS` and, for a breaking change, raise
   `SCHEMA_VERSION`. Never delete a record to make room for a change (CL-1308).
6. **Update `CHANGELOG.md` and the README's version line.**
7. **Run the tests and the release check:**

   ```
   npx playwright test
   python3 tools/release_check.py
   ```

   The tests must all pass, at desktop and 390 pixels wide, with Ask Lite on
   and off. The release check must print `ALIGNED`. It fails if the release,
   SOP, Ask Lite instructions, release notes, changelog and README disagree, or
   if the SOP has a gap: a registered capability it does not describe, a
   description reviewed for an older release than the capability's last
   change, or an "Arrives in Pn" marker once Phase n is live.
8. **Check it in Claude.** The test stand-in cannot prove real saving, consent
   prompts or sharing. Install or update a test copy with the INSTALL.md
   message, then repeat the phase gate checks by hand (for P1: a change survives
   a reload, a backup restores into a fresh install with equal counts, the
   self-test passes, removing the only Executive Sponsor is blocked).
9. **Commit, push, and tell owners** to run the update message in `INSTALL.md`.

The page runs the same comparison. Any SOP gap or version mismatch shows on the
Policy and SOP (its header and the Versions and coverage page), on Set-up, on
the Dashboard, in the footer and in the Guide panel, so a release that skipped
the release check is still visible to its owner.
