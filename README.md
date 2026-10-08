# Compass Lite

Compass Lite is Level 1 of Compass (SpecNav). It's a strategy tool a small or
mid-sized business owner runs for themselves, as one page in Claude. It takes
the owner through BSIP Stage 3 (Strategic Direction), Stage 4 (Goals and
Objectives) and Stage 5 (Strategic Roadmap), then keeps the strategy alive
through reviews. Lite proposes. The owner decides.

**Install it as your own copy:** see [INSTALL.md](INSTALL.md).

## What's in this repository

| File | What it is |
|---|---|
| `compass-lite.html` | The whole app in one file. It holds no one's data, so every install starts empty. |
| `capabilities.json` | The permissions the page needs: its own database, who is viewing, file storage, downloads, and Ask Lite (Claude from inside the page). |
| `INSTALL.md` | Install, restore, update and troubleshooting steps for the owner. |
| `CLAUDE.md` | Instructions Claude follows when installing or updating a copy. |
| `CHANGELOG.md` | What changed in each release. |
| `RELEASING.md`, `tools/release_check.py` | For the maintainer: the release checklist and the version and SOP alignment check. |
| `tests/` | Playwright release tests, one file per phase, and `claude-stub.js`, a stand-in for the page capabilities so the tests run outside Claude. |
| `SPEC.md` | The build specification (v0.6). |
| `reference/demo.html` | The Compass Lite Dashboard Demo (v12), the UI reference. It holds made-up sample data in memory only and is not part of the app. |

## How your data is kept

- Each install saves to its own database under the claude.ai account that
  installed it. Nobody else can see it unless the owner invites them.
- Moving between accounts, or keeping a safety copy, uses **Set-up → Backup and
  restore**. A backup is one JSON file the owner keeps in their own cloud storage.
- Backups never belong in this repository. `.gitignore` excludes every `.json`
  file other than `capabilities.json` and the test tooling's `package.json` files.

## Running the release tests

```
npm install
npx playwright test
python3 tools/release_check.py
```

The tests open `compass-lite.html` with `tests/claude-stub.js` standing in for
the database, viewer, file storage, downloads and Ask Lite. They run at desktop
and 390 pixels wide, with Ask Lite available and switched off.

## Version

Current: **v0.1.2** (2026-10-08), Phase 1 Foundation. See [CHANGELOG.md](CHANGELOG.md) for what changed in each release. Your copy shows its version in the footer and on Set-up.

Powered by SpecNav.
