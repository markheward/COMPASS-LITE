# Changelog

Compass Lite shows its version in the footer of every page and on **Set-up**,
where **What's new** lists these notes. Backups record which version made them.

## v0.1.1 — 2026-10-08
- **Policy and SOP:** the in-page SOP now mirrors *Compass Lite: Policy, Process and Procedure*. It has Your Strategy Explained, the Strategy Management Policy with Annexes A to C (Cadence Calendar, Records and AEGIS Handoff, Escalation Signals), Procedures P1 to P3 (Review Cadence, WIG Turnover, Set-up and Snapshot), and a page guide to every feature. Steps that arrive in a later phase are marked. Open it from **Set-up → Policy and SOP**.
- Data levels in the reference data now read L1 Public and L5 Critical.

## v0.1.0 — 2026-10-07
Phase 1, Foundation. The first installable release. It starts empty, with no sample data.
- **Saving:** every confirmed change saves to the page's own database. The status chip shows Saved, Saving, Not connected or Save failed. A copy with no database connection still opens and says plainly that changes will not be saved.
- **First-run screen:** Restore my backup or Start fresh, then business and brand details, then Check saving.
- **Set-up:** the twelve set-up steps, each with its reason, status and Skip. The Risk Management Policy step, or the AEGIS defaults when there is no policy. Data ceiling L3. Review cadence. Uploads read in the browser (PDF, Word, Excel, Markdown, text, images); Word and Excel keep their text only.
- **Organization:** People Register, the six AEGIS Essentials roles with Executive Sponsor and AI Governance Lead required, owner drop-downs, removal blocked while a person owns something, ownership checks and Who owns what.
- **Backup and restore:** one JSON file holding every record and stored file. Backup due after 7 days. Restore shows the contents first and is safe to repeat.
- **Database self-test** and **data health check** with fixes you can undo.
- **Dashboard** with as-of dates, **Guide panel** on every other tab, **Decision Log**, **Change log**, and the log of assumptions, constraints and challenges.
- **Pilot badge** until an approval is recorded.
- **Versions:** the in-page SOP and the Ask Lite instruction block are checked against the release, on Set-up and in the footer, and by `tools/release_check.py`.
