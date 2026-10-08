# Changelog

Compass Lite shows its version in the footer of every page and on **Set-up**,
where **What's new** lists these notes. Backups record which version made them.

## v0.2.0 — 2026-10-08
- **Build your strategy from scratch, no Intake Pack needed.** New tools: **ACES Analysis** (Achieve, Conserve, Eliminate and Start rows with weights), **Strategy Statement** (the four parts, the statement, themes and the evidence it rests on), **Mission, Vision and Values** (with the MVV Alignment Score and conflicts), and **WIGs and Objectives** (up to four WIGs, ACES Alignment Score, SMART check, objectives with an Accountable owner, completing a WIG only when its objectives are closed).
- **Build your strategy flow on the Dashboard:** the recommended order, ACES → Strategy Statement → Mission, Vision and Values → WIGs and Objectives, leading on to the Roadmap and Reviews. Click any step to open it. The order is a recommendation only; every step opens at any time.
- Every entry can be saved as a draft or confirmed. Removals and cancellations use a decision box on the page.
- Set-up steps 4 (starting evidence) and 10 (Mission, Vision and Values) are now done in the app and set themselves when the work is confirmed.
- ACES moves to Stage 3, as the first step; Stage 4 opens on WIGs and Objectives.
- The Policy and SOP describes all of it; set-up steps now record the release they last changed in, so a moved step is flagged until its SOP description is reviewed.

## v0.1.2 — 2026-10-08
- **SOP alignment, as in Rhythm:** the Policy and SOP header reads "Current as of v… · matches this build", and every capability of the page is held in a register with the release in which it last changed. The page compares the register with the SOP. A capability the SOP does not describe, a description older than the capability's last change, or a step still marked "Arrives in Pn" once Phase n is running is flagged as an **SOP gap** on the Policy and SOP, Set-up, the Dashboard, the footer and in the Guide panel.
- New **Versions and coverage** page in the Policy and SOP: alignment, any gaps, where each capability is described, and the release history.
- `tools/release_check.py` reads the same register and refuses a release with any SOP gap.
- **Fixes:** a change saved moments after another no longer briefly shows the older value; a file chosen, or text typed, while the page refreshes after a save is no longer lost.

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
