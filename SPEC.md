# Compass Lite: Build Specification

## Document control

| Item | Detail |
| --- | --- |
| Version | 0.6, build-ready draft |
| Product | Compass Lite, Level 1 of Compass (SpecNav) |
| Owner and approver | Mark Heward |
| What changed from 0.5 | Lite is now built as one page in Claude, like Rhythm, with its own database, Ask Lite help and a Claude Code research session in a later phase. Requirements written for the old agent-in-a-folder model are rewritten or retired (Appendix B). Added: architecture, screen map, data model, build phases, release tests and the first build prompt. Requirement IDs are kept so earlier decisions still trace |
| UI reference | Compass Lite Dashboard Demo, version 12 (https://claude.ai/artifact/VESHGXNaGeTyDF3mMGoxwL). The demo holds sample data in memory only. Its tabs, labels and flows are the target; its code is not production code |
| Build pattern | Rhythm Planner (github.com/markheward/RHYTHM-PLANNER): one HTML file, capabilities.json, INSTALL.md, CLAUDE.md, CHANGELOG.md, RELEASING.md and a release check script |
| Basis | BSIP Process Guide V1.0 and the Execution Framework (SOPs 3.1 to 5.4); Strategic Direction paper; Pilot v2.0 and Chart v2.0; ACES Analysis workbook V2.0; Passage Plan Client Intake; Logbook v1.0; AI Governance Policy (P1, Annexes E and F); AEGIS Master Categories and Scoring V1.0; AI Leadership and Strategy course (LB-002) |

## 1. Purpose and summary

**Purpose.** Define what Compass Lite must do, how it is built, and how we will know it works, in enough detail for Claude Code to build it in phases.

**Summary.** Compass Lite is a strategy tool a small or mid-sized business owner runs for themselves. It takes them through BSIP Stage 3 (Strategic Direction), Stage 4 (Goals and Objectives) and Stage 5 (Strategic Roadmap), then keeps the strategy alive through weekly, monthly and quarterly reviews. It starts from an Intake Pack (ACES Analysis, Client Intake and Strategy Statement) produced in Chart's facilitated discussion. It tests the strategy against the business's Mission, Vision, Values and AI ethics, ranks goals by how well they serve the ACES issues, links every goal and AI use case to the failure modes that could stop it, and scores risk on the AEGIS scale so records move to AEGIS Essentials without conversion. Lite is one page the owner installs in their own Claude account. It saves to its own database, guides the owner to the next step, and lets them ask Claude for an explanation, a coaching question or a draft. Lite proposes. The owner decides.

**Output and value.** An owner moves from evidence to a confirmed strategy, up to four goals with owners and measures, a roadmap, a list of AI use cases ready for AEGIS Essentials, and a weekly rhythm their team can follow, with every step logged and every conflict in front of them.

## 2. Scope

**Purpose.** Set the edges of the build so nothing outside them is started by accident.

**Summary.** Lite covers Stages 3 to 5 and ongoing management. Stage 1 and 2 analysis, communications campaigns and running other tools stay out.

**Output and value.** A clear in and out list, and the phase each in-scope area is built in (section 9).

| In scope | Out of scope for Lite |
| --- | --- |
| Set-up, organization and ownership, install, update, saving and backup | Stage 1 and 2 analysis (Lite starts from the Intake Pack). Only a short data readiness self-check is included (CL-814) |
| Stage 3: Strategy Statement, themes, Mission, Vision and Values, AI ethics, exceptions | Deciding Mission, Vision, Values or ethical principles for the owner |
| Stage 4: ACES alignment, WIGs, objectives, backlog, archive, AI use cases with indicative data | Formal AI use case scoring, IDs, risk bands or gates, which belong to Logbook |
| Stage 5: phases, milestones, RASCI, KPI and KRI thresholds, gate pack | Stage 6 communication campaigns and a PMO-run programme |
| Risk Register on the AEGIS scale, Failure Mode Register and goal-to-failure-mode plans | Writing the client's risk policy, accepting risks, or any gate decision |
| Running the strategy: reviews, team pack, Commitment Register, forecasts, Strategy on a page, assurance pack | Sending anything on the owner's behalf, or reminders between visits |
| Ask Lite (explain, coach, draft) and the Guide panel; SpecNav facilitator access | Any automatic link to SpecNav |
| Exports to AEGIS Essentials and the facilitator (Excel, Word, PDF) | Building or running AEGIS Essentials itself |
| Later phase: web research and website reading through a Claude Code session, read-only data connectors, opt-in benchmarks | Presenting researched items as facts before the owner confirms them |

**Relationship to Chart and Pilot.** Lite is a new product built on what Chart and Pilot do well, and it does not replace them. It takes its inputs from Chart's facilitated discussion. From Chart it takes drafting and validating WIGs, objectives and use cases with draft and final status, labelled flags and a review digest. From Pilot it takes the review rhythms, WIG turnover, depth probing and progress updates, and the Dashboard views. **Dependency on Chart:** the Strategy Statement becomes a required Chart output, and Chart gets a version bump to align the failure pattern names, catalogue IDs and the four failure categories.

## 3. Users and use cases

**Purpose.** Name who uses Lite and what each comes to do.

**Summary.** The owner runs Lite. A SpecNav facilitator can be invited to the same page. The team sees the outputs.

**Output and value.** The use cases that the build phases and release tests are written against.

| User | What they do with Compass Lite | Access |
| --- | --- | --- |
| Business owner (primary user) | Installs Lite, completes set-up, confirms every draft and decision, runs the reviews | Owner of the page |
| SpecNav facilitator (optional) | Invited by the owner to help with the ACES workshop, the Strategy Statement and reviews, and to give a second opinion | Guest, read-only by default; edit only when the owner grants it (CL-1409) |
| Owner's leadership team and staff | Take part in workshops, own goals, objectives and commitments, and receive the Strategy on a page and the weekly pack | Named in the People Register; may be invited to view |

| Use case | Trigger | Result |
| --- | --- | --- |
| UC-1 Install and set up | Owner receives the repository invitation | Lite installed, set-up steps done or flagged, first backup downloaded |
| UC-2 Set strategic direction | Intake Pack uploaded | Strategy Statement confirmed, MVV scored, ethics set, exceptions decided |
| UC-3 Set goals | Stage 3 gate passed | ACES-ranked goals, objectives with owners, backlog, linked failure modes |
| UC-4 Build the roadmap | Stage 4 gate passed | Milestones with owners, KPIs, KRIs and thresholds |
| UC-5 Return to Lite | Owner opens the page | Records as saved, open items and next step shown |
| UC-6 Propose AI use cases | Goals confirmed | Use cases with owners, indicative data and failure mode plans, exported to AEGIS Essentials |
| UC-7 Manage the strategy | Weekly, monthly or quarterly review due | Progress readout, commitments, re-scores and decisions logged |
| UC-8 Get help | Owner is unsure or a facilitator is invited | Guide panel, Ask Lite answer, or a facilitated session on the same page |

## 4. Product principles

**Purpose.** Fix the rules every screen and every Claude call must follow.

**Summary.** Evidence first, people decide, one thread from identity to goal to use case, conflicts shown, and AI that follows operational maturity.

**Output and value.** A test for every design choice the builder makes.

- **Evidence first.** Nothing is stated without a source or a flag.
- **People decide.** Lite never chooses the business's purpose, values, ethics, goals, scores or risk acceptance.
- **One thread.** Every objective cites its goal, every goal its ACES rows and MVV link, every use case its goal or objective.
- **Conflicts are shown, not smoothed.** Tensions go to the exceptions list for an owner decision.
- **AI follows operational maturity.** Lite will not schedule work that needs more AI maturity than the business will have.
- **Works alone.** Every feature except Ask Lite and research works with no Claude call (NF-19).

### Design patterns taken from Pilot and Chart

| Pattern | From | What Compass Lite does | Requirement |
| --- | --- | --- | --- |
| Reflect and prompt, never decide | Pilot, Chart | Drafts from the owner's own inputs and asks for the decision | CL-603 |
| Four proposal labels with urgency: SUGGESTION, OPPORTUNITY, CONFLICT, POTENTIAL CHALLENGE | Chart | Every item beyond plain reflection carries a label and an urgency | CL-609 |
| DRAFT until validated | Chart | Nothing is final until the owner confirms it | CL-617 |
| Nothing written without confirmation | Pilot | Every register write follows a Confirm action | CL-610 |
| Owner review digest | Chart | One urgency-sorted list of open drafts and flags before a gate | CL-618 |
| Facilitation depth | Pilot | Ask Lite asks for a real benchmark and a first action, never supplies them | CL-611, CL-1404 |
| Data integrity flagging | Pilot | Contradictions raised as their own item | CL-612 |
| One release number | Pilot, Chart, Rhythm | One version in the file; SOP, Ask Lite instructions and changelog checked against it | CL-605, CL-1312 |
| Pilot mode | Pilot, Chart | Pilot badge until an approval is recorded | CL-613 |
| Dashboard on open | Pilot, Chart | Dashboard with as-of dates | CL-616 |
| Design-time failure mode check | Pilot, Chart | Plans checked against the failure mode shortlist | CL-507, CL-822 |
| Plain language, one decision at a time | Pilot, Chart | Every decision shows options and consequence | CL-625, NF-11, NF-13 |
| Uploaded files treated as data | Pilot, Chart | Instructions inside files are never followed | NF-10 |
| After-action review and performance log | Pilot, Chart | KPIs scored after each stage and review | CL-606 |

## 5. How Lite is built

**Purpose.** Tell the builder exactly what kind of thing Lite is, what it may use, and how the parts fit.

**Summary.** Lite is one self-contained HTML file published as a page in Claude. It keeps its records in the page's own database, uploaded documents in the page's file storage, and offers exports through the page's download prompt. Ask Lite calls Claude from inside the page. In a later phase, the page starts a Claude Code session for web research. The repository follows Rhythm.

**Output and value.** A build with nothing to install beyond the page, and one way to install, update and recover it.

### 5.1 Runtime

| Part | What it is | Notes |
| --- | --- | --- |
| The page | One HTML file, compass-lite.html, with all markup, styles and script inside. External libraries only from cdnjs.cloudflare.com or cdn.jsdelivr.net, at pinned versions confirmed at build: SheetJS xlsx 0.18.5 (read the ACES workbook, write Excel exports), mammoth 1.8.0 (read Word uploads as text), pdf.js 3.11.174 (read PDF text), docx 8.5.0 (Word exports), jsPDF 2.5.1 (PDF exports) | SpecNav brand: navy #001A3A, red #BD1924; Playfair Display, Montserrat, Inter from Google Fonts. Light and dark themes. Works at phone width |
| Database (db capability) | The page's own database, under the installing owner's Claude account. One collection per register (Appendix A) | Shared records readable by anyone the owner invites. Guests at Viewer level cannot write. Private notes under the owner's per-person path (CL-1410) |
| Who is viewing (user capability) | Gives the viewer's id so the log records who confirmed each change and whether they were a guest | Store ids only, never names. From P6 the profile scope shows names in the log and presence |
| File storage (assets capability) | PDFs, images (the logo), plain text and Markdown, 20 MB each. Word and Excel files are read in the browser and only their text or rows are kept (CL-1305) | A database record is limited to 256 KB, so long extracted text is saved as a text file in storage and the record holds its file id and a short summary |
| Downloads (downloads capability) | Backup JSON and every export | The viewer always sees a save prompt; nothing is saved silently |
| Ask Lite (sample capability) | Claude called from the page on a click: explain, coach, draft | No memory between calls: each call sends the instruction block, the relevant records and the answer format. Read-only page tools only (CL-1407) |
| Live presence (room capability, P6, optional) | Who has the page open and which tab, for CL-1412 | Nothing persists; presence is never used as a permission |
| Research session (Phase 8) | The page writes a request to a research_requests collection and starts a Claude Code session through the Claude Code Remote connector (fire_trigger), as Trawler does. The session reads the request, researches, and writes results back as SUGGESTION | Needs a scheduled task set up per install; the page shows Waiting, Done or Not connected (CL-1408) |

capabilities.json for Phase 1 to 7:

```
{
  "db": {},
  "user": {},
  "assets": {},
  "downloads": true,
  "sample": {}
}
```

P6 adds `"room": {}` (only if CL-1412 is wanted) and changes `user` to `{"scopes": ["profile"]}`. Phase 8 adds `"mcp": {"servers": [{"server": "Claude Code Remote", "tools": ["fire_trigger"]}]}` and any read-only data connectors the owner chooses (CL-1121). A page that uses file storage and connectors cannot be shared by public link, so facilitators are invited by email (CL-1409).

### 5.2 Repository

Private repository owned by SpecNav (name to confirm, for example COMPASS-LITE), shared by invitation for each install.

```
compass-lite/
  compass-lite.html     the whole app; holds no one's data
  capabilities.json     permissions the page needs (5.1)
  INSTALL.md            owner's install, restore, update and troubleshooting steps
  CLAUDE.md             how Claude installs or updates a copy: publish the file unchanged, pass capabilities verbatim
  README.md             what the repository holds, and the current version line
  CHANGELOG.md          what changed in each release
  RELEASING.md          maintainer checklist
  tools/release_check.py  version and SOP alignment check (CL-1312)
  tests/                Playwright release tests, one file per phase (section 9), and claude-stub.js, a stand-in for the page capabilities so the tests run outside Claude
  .gitignore            excludes every .json except capabilities.json, and every backup
```

### 5.3 Inside the file

| Block | What it holds |
| --- | --- |
| Release record | Version, date and release notes: the only place the version lives (CL-605) |
| SOP template | The in-page explanation of every feature, with the release it was written for (CL-1312) |
| Ask Lite instruction block | The fixed guardrails and answer formats for every Claude call, with its release (CL-1406) |
| Reference data, labelled Template | AEGIS Master Categories and Scoring V1.0, BATHERS defaults, Chart's eight failure patterns and the stuck-in-pilot mode with their four categories, plan templates, starter libraries (CL-1102, CL-1306) |
| Schema and migrations | Collection names, field defaults and the saved-data version; older records gain defaults on load and are never deleted (CL-1308) |
| App code | Tab renderers, scoring functions (section 6.3), save queue, backup and restore, self-test, Guide panel, Ask Lite |

### 5.4 Saving rules

- Every register write follows a Confirm action (CL-610) and adds a log entry with who, when and what (CL-1411).
- Writes are queued and saved shortly after a change; the status chip shows Saved, Saving, Not connected or Save failed (CL-1304).
- One write at a time per record. Lists listen for changes, so an owner and a facilitator see each other's confirmed changes.
- A fresh install holds templates only; there are no sample names, goals or figures (CL-1306).
- Restore replaces everything after showing counts and the release that made the backup (CL-1309).

## 6. Screens and scoring

**Purpose.** Fix the tab structure and the calculations so the build matches the demo and the scores can be reproduced.

**Summary.** Six top buttons: Dashboard, Set-up, Stage 3, Stage 4, Stage 5 and Reviews. Each stage opens a row of tool cards. Every tab except the Dashboard has the Guide panel at the top.

**Output and value.** One map from screen to requirement, and every formula in one place.

### 6.1 Screen map

| Top button | Tool | What it does | Requirements |
| --- | --- | --- | --- |
| Dashboard | (single view) | Goals and status, scoreboard, risks to watch, open decisions, set-up gaps, next review | CL-616, CL-825 |
| Set-up | Set-up | First-run steps, uploads, database self-test, data health, backup and restore, version and SOP | CL-901 to CL-903, CL-1301 to CL-1313 |
| Set-up | Organization | People Register, roles, ownership drop-downs, who owns what, facilitator access | CL-1201 to CL-1208, CL-1409 |
| Stage 3 | Strategy Statement | Intake Pack, four-part statement, themes, exceptions | CL-301 to CL-309 |
| Stage 3 | Mission, Vision and Values | Items, MVV Alignment Score, exceptions | CL-1001 to CL-1005, CL-1009 |
| Stage 3 | AI ethics | BATHERS default or the owner's own set with mappings | CL-1006 to CL-1008 |
| Stage 3 | Strategy on a page | Confirmed content only, print or download | CL-1111 |
| Stage 4 | ACES | Rows, weights, re-score with before and after | CL-409, CL-411 |
| Stage 4 | Goals (WIGs) | Up to four active goals, objectives, owners, failure mode chips, complete and cancel | CL-401 to CL-405, CL-709 |
| Stage 4 | Backlog | Ranked candidates and next-goal choice | CL-410, CL-711 |
| Stage 4 | Archive | Completed goals, read-only | CL-710 |
| Stage 4 | AI use cases | Use cases with owner, indicative data, pilot review date, failure mode chips, export | CL-803 to CL-805, CL-810 to CL-812, CL-817, CL-827 |
| Stage 4 | Starter library | Examples by sector, labelled Example | CL-1102 |
| Stage 5 | Timeline | Phases, milestones, RASCI, thresholds, gate pack | CL-501 to CL-507 |
| Stage 5 | Risk Register | AEGIS scoring, heat map, treatment | CL-903 to CL-909 |
| Stage 5 | Failure patterns | Readiness check, register by four categories, goal-to-mode links, detect and mitigate plans, gaps | CL-813, CL-814, CL-818 to CL-828 |
| Stage 5 | Team pack | Weekly pack and Commitment Register | CL-1112, CL-1113 |
| Stage 5 | Connected data | Measures, provenance, readings to map | CL-1121, CL-1122 |
| Stage 5 | Assurance | Assurance pack, supplier questionnaire helper | CL-1141, CL-1142 |
| Reviews | (single view) | Weekly, monthly and quarterly reviews, KRIs, forecasts and calibration, KPI table, decision log | CL-701 to CL-707, CL-1103, CL-1131 to CL-1133 |

### 6.2 Labels and statuses

| Thing | Values |
| --- | --- |
| Proposal labels | SUGGESTION, OPPORTUNITY, CONFLICT, POTENTIAL CHALLENGE; urgency Resolve now or Can park |
| Confirmation (every record) | Draft or Confirmed |
| Lifecycle | Goals: Active, Completed, Cancelled, Archived. Objectives: Open, Completed, Cancelled. Backlog: Backlog, Active, Completed, Dropped. Use cases: Proposed, In pilot, Scaling, Stopped. Risks: Open, Treated, Closed |
| Failure mode status | Clear, Watching, Triggered |
| Source | Entered, Uploaded, From website, Connected, Template, Example, Ask Lite suggestion; plus Stale and Not recorded markers |
| Evidence reference | The record or upload ID, with a section or row where useful, for example U-003 row 4. Every statement in an output carries one or a flag (CL-602) |
| Data levels | L1 to L5 from the AEGIS Master Categories. The owner states the level of each data set and use case. Anything above L3 is flagged and left out of exports (CL-811); L5 cannot be entered |
| Save status | Saved, Saving, Not connected, Save failed |

### 6.3 Scoring rules

| Score | Rule | Requirement |
| --- | --- | --- |
| ACES Alignment Score | Each ACES row has a weight High 3, Medium 2 or Low 1. Each goal scores each row 0 to 3 with a reason. Score = sum of (row score × row weight) ÷ (3 × sum of the three largest row weights) × 100, capped at 100. Floor default 40 | CL-409, CL-411 |
| MVV Alignment Score | Each MVV item scores 0 to 3 against each of the four Strategy Statement parts. Score = sum of each item's best score ÷ (3 × number of items) × 100. Strong 75 and over, Partial 50 to 74, Weak under 50. A Conflict is never averaged away | CL-1003 |
| AEGIS risk score | Likelihood 1 to 5 × impact 1 to 5. Low 1 to 5, Medium 6 to 10, High 11 to 15, Critical 16 to 25 | CL-904 |
| Indicative quadrant | Business Value, Technical Feasibility and Organizational Maturity 1 to 5, risk L × I, using Logbook's published rule order. Always labelled Indicative | CL-817 |
| Forecast outcome | Hit, Near miss or Miss against the target change, tolerance default 10 percent | CL-1132 |
| Goal % complete | Progress of the lag measure from its start value to its target. Objectives completed show separately as a count | CL-701 |
| Candidate ranking | ACES Alignment Score first, then impact, effort (reversed) and urgency, each 1 to 5 with owner weights recorded | CL-403, CL-410 |
| Overload flag | A person Accountable for more than three objectives, or more than half | CL-1205 |
| Stuck in pilot | Triggered if a use case has no owner; Watching if past its review date (default 8 weeks) with no scale, fix or stop decision | CL-821, CL-827 |

## 7. Functional requirements

**Purpose.** List what Lite must do, with a test for each and the build phase it lands in.

**Summary.** Requirements keep their earlier IDs. Rows written for the old agent model are rewritten for the page. Priority is Must, Should or Could. Phase refers to section 9. Until Ask Lite ships in P6, wherever a row says Lite proposes, drafts or splits text, the owner enters it and Lite checks it (CL-626).

**Output and value.** One table per area that Claude Code builds and tests against.

### 7.1 Install, update, saving and backup

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-1301 | Deliver Lite as one file. It is held in its own private GitHub repository, which stays owned by SpecNav and is shared with an owner by invitation only when they need to set up their copy, with only these other files: an install guide (INSTALL.md), instructions for Claude (CLAUDE.md), a changelog, a list of the permissions Lite needs (capabilities.json), and a maintainer release checklist and check. The repository holds the app only. It never holds business data, sample data or backups, and its ignore rules exclude every backup file. | Must | The repository holds one Lite file. A search of it finds no business data, and a backup file cannot be committed. | P1 |
| CL-1302 | Install with one message. The owner accepts the GitHub invitation, connects GitHub in Claude, opens the repository in Claude Code and sends: Install Compass Lite as my own artifact, following CLAUDE.md. Claude publishes the file exactly as it is, with the permissions in capabilities.json passed unchanged, and gives the owner a link. Claude never rewrites, reformats or shortens the file. The install takes about 10 minutes and gives one copy per business. | Must | A new owner installs from the install guide alone. The published file is identical to the file in the repository. | P1 |
| CL-1303 | Save to the page's own database. Lite uses the database that comes with the published page, tied to the Claude account that installed it. Each install starts empty. Nobody else can see it unless the owner invites them (CL-1409); SpecNav and whoever shared the repository cannot. Lite needs no database software, no folder setup and no scripts. | Must | After install the page saves and reloads with the same records. A second owner's install shows none of the first owner's records. | P1 |
| CL-1304 | Save automatically and show the state. Every change is saved shortly after it is made. A status chip always shows Saved, Saving, Not connected, or Save failed. If the page has no database connection (for example a copy opened outside Claude), Lite still opens but says plainly that changes will not be saved. | Must | A change survives a reload. With the connection removed, the chip reads Not connected and the page says so. | P1 |
| CL-1305 | Keep structured records in the database and uploaded documents in the page's file storage. File storage keeps PDFs, images, plain text and Markdown. A Word (.docx) or Excel (.xlsx) upload is read in the browser, its text or rows are saved (as a text file plus the records drawn from it), and the original file is not kept, which the page says at upload. Each upload record holds the file id, name, size, date and what was read. Each record carries its source, who confirmed it, and the date. | Must | A PDF upload reopens from storage; a Word or Excel upload shows its extracted text and the note that the original is not kept; any record can be traced to its source and confirmation | P1 |
| CL-1306 | Keep standard templates (the default failure mode shortlist, plan templates, starter libraries, BATHERS wording) as reference data in the file, labelled Template. They are separate from the owner's own records, and a fresh install holds no other seed or sample data. | Must | Template rows are marked Template. A new install has no tasks, goals, names or figures other than templates. | P1 |
| CL-1307 | Update in one step. The owner downloads a backup, then sends: Update my Compass Lite artifact at (their link) to the latest version, following CLAUDE.md. Claude reads the existing page, then publishes the new file to the same link. The link stays the same and the records are kept. The permissions are carried forward unless capabilities.json has changed. | Must | After an update the link is unchanged, the records are all present, and the version matches the newest changelog entry. | P1 |
| CL-1308 | Keep saved data compatible. A newer version reads records saved by an older one and gives any new field a default. It never deletes a record to make room for a change. Putting an earlier version of the file back (roll back) opens the same records. A backup made by an older version restores into a newer one. | Must | An older backup restores into the current version with all counts equal. Rolling back one version loses nothing. | P1 |
| CL-1309 | Back up and restore with one file, from the Setup tab in the page. Download backup writes every record and the contents of every stored file into one JSON file, named after the business and the date, recording the version that made it. The owner keeps it in their own cloud storage. A backup-due date shows on Setup and in the Guide panel and turns overdue after 7 days without a backup. Restore uploads each file again and updates the records to the new file ids. Restore shows what is inside (counts and version), asks the owner to confirm, and then replaces everything. This is also the way to move to another Claude account. Restoring the same file again is always safe. | Must | A backup restores into a new install with the same counts. The restore step always shows contents before replacing. A missing backup after 7 days shows as overdue. | P1 |
| CL-1310 | Run a database self-test at set-up and on request. It writes a small timestamped record, reads it back, and removes it, so a save that only looks fine is caught. Add a data health check for records that have drifted: duplicate IDs, a goal whose owner was removed, links to items that no longer exist, and left-over test data. Each fix can be undone. | Must | A failed write shows Not saved straight away. The health check lists each problem with a fix and an undo. | P1 |
| CL-1311 | Open, inside the page, on a first-run screen that offers Restore my backup or Start fresh, then Business and brand details (business name, owner name, optional logo and brand colour), then Check saving. Set-up shows a count of what is still missing, and each skipped step stays flagged until done. These are the front of the CL-902 steps. | Must | A new install shows the screen. Skipping a step leaves it flagged with a count. | P1 |
| CL-1312 | Include an explanation page (SOP) inside the app that covers every feature, shows the version it was written for, and turns red if that is not the version running. Keep one version number in one place in the file. The maintainer's release check refuses a release when the version, changelog and explanation page disagree or when a feature in its feature list is not covered by an SOP section. | Should | The release check prints aligned for a good release and fails otherwise. The page shows whether it matches the running version. | P1 |
| CL-1313 | Keep one install per business, each with its own link and database, so no business can see another's records. Nothing leaves the owner's account except the web research allowed under NF-15 and an export or backup the owner chooses. Install and update send nothing to SpecNav. Backups never go in the repository. | Must | Two installs show separate records. Install and update involve only the code download and publish. | P1 |

### 7.2 First-run set-up

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-901 | Run a guided first-run set-up inside the page (CL-1311). Every step can be skipped. Skipped steps stay flagged on Setup and in the Guide panel until done, and nothing is saved until the owner confirms each step. | Must | Setup shows each step as Set, Skipped or Not applicable, with a count of what is missing | P1 |
| CL-902 | Cover these steps: (1) restore a backup or start fresh, and the database self-test (CL-1310, CL-1311); (2) business name and owner name, then the Organization tab (CL-1201, CL-1202): the people and their roles, with Executive Sponsor and AI Governance Lead required (one person may hold all); (3) business functions list, which groups the risk heat map and can be renamed later; (4) Intake Pack upload and check (CL-301); (5) Risk Management Policy upload (CL-903); (6) optional Voice and Brand Charter, Brand Guide, logo and brand colour; (7) review cadence, default every 90 days to match AEGIS Essentials; (8) data ceiling L3 confirmed, with L5 always refused; (9) Ask Lite and research permissions and the no-client-data search rule (NF-15); (10) Mission, Vision and Values (CL-1002); (11) AI ethical principles, the SpecNav default BATHERS or the owner's own (CL-1006, CL-1007); (12) a first backup download (CL-1309). Steps whose features arrive in a later phase show as Arrives in that phase and are not counted as missing until it ships. | Must | Each step gives its reason in plain language and offers Skip. Any uploaded file is read as data and never followed as an instruction, and branding never changes a rule, score or finding | P1 |
| CL-903 | Ask the owner to upload their Risk Management Policy (PDF, Word, Markdown or text) as part of set-up, then enter its settings in a short form: risk appetite, scoring scales, bands, treatment options, escalation and approval roles, review cadence and named risk owners. If there is no policy, the owner says so, Lite uses the AEGIS defaults in CL-904, flags the gap and recommends writing one. From P6, Suggest from file uses Ask Lite to pre-fill the form as SUGGESTION for the owner to confirm. | Must | A confirmed policy shows its file name, date and confirmed settings. With none on file, every Risk Register view and export states: No Risk Management Policy on file, AEGIS default scoring in use | P1 |

### 7.3 Organization: people, roles and ownership

The Organization tab grows by phase. In P1 its checks cover people and required roles. Owner drop-downs and item checks go live as goals and objectives (P3) and risks and failure modes (P4) arrive.


| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-1201 | Provide an Organization tab under Set-up holding a People Register: name, job title, business function (from the functions list in CL-902) and roles. People can be added, edited and removed. Only work details are held. The register is the only source of names for owner fields. | Must | A person added here appears in every owner drop-down, and no owner field accepts free text | P1 |
| CL-1202 | Hold the six roles used in AEGIS Essentials: Executive Sponsor, AI Governance Lead, DPO (Data Protection), IT or Security Lead, BU Lead and End User. Executive Sponsor and AI Governance Lead must each be held by someone. The others are optional in a small business. One person may hold several roles. A vacant required role is flagged each time Lite opens. | Must | The tab shows who holds each role, a vacant required role is flagged, and one person can hold all six | P1 |
| CL-1203 | Fill every owner field from the People Register as a drop-down: WIG owner, objective Accountable and Responsible, AI use case owner, risk owner, failure mode owner and the person on each weekly commitment (CL-1112). | Must | Each owner field lists only people in the register, and changing a name in the register updates it everywhere | P1 |
| CL-1204 | Apply the ownership relationship. Each WIG has one owner. Each objective belongs to one WIG and has exactly one Accountable person and, optionally, a Responsible person. Each AI use case links to one WIG or objective and has exactly one owner. Lite proposes the use case owner as the Accountable of the linked objective, or the owner of the linked WIG, as a SUGGESTION. The owner of the business confirms or changes it. Show the chain person, goal or objective, AI use case on one screen. | Must | An objective with no Accountable, a use case with no owner and a use case with no linked goal or objective are each flagged, and no ownership is recorded without the owner's confirmation | P3 |
| CL-1205 | Check ownership and raise it for the owner to decide: an item with no owner; a person Accountable for more than half of the objectives or more than three (the default, which the owner can change), which also feeds the capacity overload failure mode and its indicator; a use case whose linked goal is archived or cancelled; and a person who holds no role and owns nothing. | Should | Each flag names the person or item and offers the options of reassigning or accepting with a reason | P1 |
| CL-1206 | Do not allow a person to be removed, or to leave a required role, while they still own an item. Lite lists what they own and asks for a new owner for each first. Every change of owner is logged with the date, the old and the new person and who confirmed it, and earlier owners stay in the history. | Must | Removal is blocked until every owned item is reassigned, and the log shows each change | P1 |
| CL-1207 | Show a Who owns what view by person: their roles, goals, objectives, use cases, risks and failure modes. | Should | Each item appears under exactly one owner and the counts match the registers | P1 |
| CL-1208 | Exchange ownership with AEGIS Essentials on request: export the use case owner and the objective Accountable as proposed entries in the AEGIS Essentials field order, and read roles from an AEGIS Essentials export, applying nothing until the owner confirms. | Could | An export needs no conversion, and an import shows a preview with counts first | P7 |

### 7.4 Across all tabs

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-626 | Until Ask Lite ships (P6), the owner enters every draft, theme, score and reason, and Lite applies only rule-based checks (completeness, SMART fields, ownership, scoring arithmetic, gaps). From P6, Ask Lite can pre-fill any of these as SUGGESTION for the owner to confirm. Wherever a requirement says Lite proposes, drafts or splits text, this rule sets how it works before P6. | Must | Every Stage 3 to 5 flow can be completed with Ask Lite switched off | P1 |
| CL-601 | Keep every register current and consistent: the collections in Appendix A. A register changes in the same confirmed step as any record that affects it. | Must | After any confirmed change, every collection that depends on it shows the new value | P1 |
| CL-602 | Cite evidence for every statement, and flag what is unsupported | Must | No unflagged statement without a citation | P1 |
| CL-603 | Stop at every decision point and ask the user | Must | Lite never records a decision without a user instruction | P1 |
| CL-604 | Log each assumption, constraint and challenge with an owner and review date | Must | Every entry has an owner and a date | P1 |
| CL-605 | Keep one version number in one place in the file (the release record). The in-page SOP, the Ask Lite instruction block, CHANGELOG.md and the README version line each state the release they were written for. Setup and the footer show whether they agree. The release check (CL-1312) refuses a release when they do not. | Must | A mismatch shows on Setup and in the footer, and the release check fails on it | P1 |
| CL-606 | After each completed stage and each review, offer a short after-action review in the page: the owner rates the rated KPIs (section 10), Lite computes the counted ones from the logs, and a row is added to the performance log. | Should | The performance log gains one row per review, with each KPI scored or marked Not recorded | P5 |
| CL-607 | Export outputs from the page as Excel, Word or PDF in SpecNav styling, built in the browser and offered through the page's download prompt. Every export shows its date, the release and the source records. | Should | Each export opens without repair and carries the release, the date and Not recorded for gaps | P7 |
| CL-608 | Save every confirmed change automatically (CL-1304) and, when Lite opens, show what is open: skipped set-up steps, drafts, flags, due reviews and the next step (CL-1401). | Must | After a reload the records are unchanged and the open items are listed without being asked | P1 |
| CL-609 | Label every item that is not plain reflection as a SUGGESTION, OPPORTUNITY, CONFLICT or POTENTIAL CHALLENGE, with an urgency tag | Must | No proposal is worded as if it were the client's own, and every flag has an urgency | P1 |
| CL-610 | Write nothing to any register without the owner's confirmation on screen. A draft or suggestion stays visibly separate until confirmed. | Must | Every write to a register follows a Confirm action, and the log records who confirmed it | P1 |
| CL-611 | Probe a vague goal, objective or MVV entry for a real benchmark metric and a tangible first action; stop after about two follow-ups and flag the gap | Must | Any benchmark or action Lite offers is labelled SUGGESTION with its source, and the owner decides | P6 |
| CL-612 | Raise contradictions in inputs or registers as their own item before continuing | Must | A status and a flag that disagree are reported, and neither is silently trusted | P1 |
| CL-613 | Until an approval is recorded on Setup, show a Pilot badge in the header and on every export. Recording the approval removes the badge but not the KPI scoring. | Should | The badge shows until an approval with a name and date is recorded | P1 |
| CL-616 | Provide a Dashboard tab built on the Pilot Dashboard: goals and objectives with status, the scoreboard, risks to watch, open decisions, set-up gaps, gate status and the next review, each with the date its data was last changed. | Must | Every panel traces to a register and shows its as-of date | P1 |
| CL-617 | Hold every drafted item as DRAFT until the owner confirms it | Must | No item is FINAL on Lite's own judgment | P1 |
| CL-618 | Before each gate, produce one urgency-sorted digest of every open draft and flag | Should | The Stage exit gate cannot be checked until the digest has been reviewed | P2 |
| CL-619 | Support workshops (SOP-3.2 and SOP-4.1) with short prompt blocks: what is happening, what to reflect back, the next question, what to listen for | Could | An owner or facilitator can use a block during a workshop without reading further | P6 |
| CL-620 | Give each export a contents sheet or page listing every item it holds, its source record and the release, so a facilitator or AEGIS Essentials can check it is complete. | Should | Every item in an export appears in its contents list | P7 |
| CL-621 | Offer an Excel export of the strategy built from Pilot's structure: WIGS Summary, WIG 1 to 4, WIG Road Map, WIG Backlog, ACES, WIG Alignment (with the ACES Alignment Scores and their reasons) and Success Metrics. The Implementation Tracker and AI Governance Dashboard sheets stay parked. | Should | Every WIG, milestone, measure and governance item lands in a named sheet | P7 |
| CL-622 | Keep a template version ledger and state whether a template change is structural or changes Lite's behaviour | Could | Each change is recorded as one or the other | P8 |
| CL-623 | Accept an optional Chart or Pilot workbook as an upload and read its WIGs, objectives, ACES and backlog, applying nothing until the owner confirms. | Could | A preview with counts is shown first, and nothing is applied before confirmation | P7 |
| CL-624 | Provide a light Success Metrics view that shows the measures and a simple return per WIG, fed from Stage 4 and 5 outputs | Should | Each WIG shows its lead and lag measures and a return estimate with its assumptions | P5 |
| CL-625 | Explain every draft and decision in plain language, stating what is being decided and what follows from each choice | Must | Each decision point shows the decision, the options and the consequence | P1 |

### 7.5 Stage 3: Strategic Direction, Mission, Vision, Values and AI ethics

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-301 | Accept the Intake Pack as uploads in the page: the ACES Analysis workbook (.xlsx, read in the page), the Client Intake (.docx, .pdf or text) and the Strategy Statement (typed or uploaded). Show what was read from each and check the pack is complete before Stage 3 starts (SOP 3.1). | Must | Each missing item is listed, what was read is shown for confirmation, and drafting does not start until the owner accepts the gaps | P2 |
| CL-302 | Take the Strategy Statement from the Intake Pack and test it with the owner against where to play, how to win, what not to do and the role of AI. Draft alternative options only if the owner asks (SOP 3.1). | Must | Every claim in every option carries an evidence ID | P2 |
| CL-303 | Group findings into four themes: Growth, Efficiency, Innovation, Risk mitigation (SOP 3.1). | Must | Each theme lists the findings behind it | P2 |
| CL-304 | Test each option against Mission, Vision, Values and AI ethical principles, and log conflicts (SOP 3.1, 3.4). | Must | Every conflict appears in the Alignment Exceptions Register | P2 |
| CL-305 | Propose MVV changes with evidence, without adopting them (SOP 3.2). | Must | Every change is marked proposed until the user records a decision | P2 |
| CL-306 | Where the owner or retained facilitator supplies competitor evidence, build the MVV competitive matrix with fact or inference marked, and no ranking (SOP 3.3). | Could | No cell lacks a source and date; no score or rank appears | P8 |
| CL-307 | Build the MVV-AI Ethical Alignment Matrix and map each AI initiative to a problem, objective, owner, control and risk appetite (SOP 3.4). | Must | No AI initiative is missing one of the five links without a flag | P2 |
| CL-308 | Keep the Alignment Exceptions Register and the Decision Log (SOP 3.4). | Must | Every decision records who, when and on what evidence | P2 |
| CL-309 | Produce the Strategic Direction document and check the Stage 3 exit gate (SOP 3.5). | Must | Gate checklist shows each item passed, failed or waived | P2 |
| CL-310 | Draft MVV validation materials: survey and workshop agenda (SOP 3.5). | Could | Both are generated from the current MVV | P8 |
| CL-1001 | Provide an MVV tab holding the Mission (one statement), the Vision (one statement) and the Values (each a name and a one-line meaning). Each item shows its source (Entered, From website or Uploaded), the date confirmed and its status (Draft or Confirmed). Lite never writes or rewrites an MVV item on its own. | Must | Every item shows source, date and status, and no item is Confirmed without the owner's confirmation | P2 |
| CL-1002 | Add MVV to set-up as a skippable step. Route 1 (P2): the owner types or pastes the Mission, Vision and Values. Route 2 (P8, CL-1408): the owner gives the business website address, a research session reads the public pages it can reach and returns the statements as SUGGESTION with the page address and date, and the owner edits, confirms or rejects each. If nothing is found, Lite says so and offers Route 1. | Must | A website result shows each statement with its source address and date as unverified until confirmed, a failed read falls back to typing, and nothing is saved before confirmation | P2 |
| CL-1003 | Score how well the MVV connects to the Strategy Statement. Lite splits the Strategy Statement into its four parts: who you serve, the problem you solve, what sets you apart, and the trade-offs you accept. Each MVV item (Mission, Vision and every Value) is scored 0 to 3 against each part (0 none, 1 indirect, 2 supports, 3 directly expresses), with a one-line reason, and a Conflict flag where the statement works against the item. The MVV Alignment Score is the sum of each item's best score across the four parts divided by 3 times the number of items, as a percentage. Bands: Strong 75 and over, Partial 50 to 74, Weak under 50. | Must | Each score shows its reason, the overall score and band recompute when a score is changed, and a Conflict is never averaged away: it stays visible whatever the total | P2 |
| CL-1004 | Raise MVV exceptions for the owner and Executive Sponsor instead of resolving them: a Conflict between the Strategy Statement and an MVV item, a Value that nothing in the strategy reflects (best score 0 or 1), a Mission or Vision no WIG serves (from P3), and a generic claim with nothing in the evidence behind it. Each exception offers the owner's options (change the strategy, change the MVV, or accept with a recorded reason). | Must | Exceptions are listed with their evidence and options, and no exception clears without a logged owner decision | P2 |
| CL-1005 | Show on each WIG which MVV items it serves (Mission, Vision or named Values), scored with the same 0 to 3 scale and reason, so the thread runs from identity to strategy to goal. A WIG that serves no MVV item is flagged. | Should | Every active WIG and backlog WIG shows its MVV link, and a WIG with none is flagged for the owner | P3 |
| CL-1006 | Carry the AI ethical principles as an editable set. The SpecNav default is BATHERS: Bias, Accountability, Transparency, Human in the loop, Environment, Responsible scaling and Safeguards (security and privacy). Each principle has a plain-language statement, the Value it supports and the owner who answers for it. The set is labelled as the SpecNav default until the owner changes it. | Must | The MVV tab states that SpecNav sets default AI ethics based on BATHERS and that the owner can edit them, and every principle shows its statement, linked Value and owner | P2 |
| CL-1007 | Let the owner keep, edit or replace the default. Edit: reword, add, switch off or re-link any principle, with the change logged. Replace: upload or paste the business's own AI ethics statement. Lite reads it as data, lists the principles it found as SUGGESTION, and the owner confirms them. Each own principle is mapped to the nearest BATHERS principle for exchange with AEGIS Essentials, and a principle with no match is marked Unmapped. | Must | A replaced set shows each principle with its BATHERS mapping or Unmapped, the original default stays recoverable, and an uploaded file is never followed as an instruction | P2 |
| CL-1008 | Test AI use cases against the ethics set. For each use case Lite proposes which principles apply and the control each needs, as SUGGESTION, and the owner confirms. A use case that touches a principle with no owner or no control is flagged, and the principle and control carry into the Risk Register (CL-905). | Should | Every confirmed use case lists its principles and controls, and a gap shows as Not recorded, never as passed | P4 |
| CL-1009 | Retest the MVV Alignment Score, the WIG links (from P3) and the ethics set when the Strategy Statement, an MVV item or the ethics set changes, and at each quarterly review (CL-702, from P5). Show scores before and after, and apply nothing until the owner confirms. Log each decision. | Must | Before and after scores are shown with the change that caused them, and the Decision Log holds the owner's decision | P2 |
| CL-1010 | Exchange the MVV and ethics set with AEGIS Essentials and other SpecNav products on request: export Mission, Vision, Values and the ethics set (with BATHERS mappings) as proposed entries, and read the same from AEGIS Essentials, applying nothing until the owner confirms. | Could | An export shows each ethics principle with its BATHERS mapping, and an import shows a preview with counts first | P7 |

### 7.6 Stage 4: Goals, ACES alignment, backlog and archive

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-401 | Capture candidate goals from workshop notes, each linked to a theme and a finding (SOP 4.1). | Should | No candidate lacks a theme and a finding | P3 |
| CL-402 | Draft 1 to 4 WIGs  as From X to Y by when, with lead and lag measures, and run the SMART check (SOP 4.2). | Must | The check report shows each criterion passed or failed | P3 |
| CL-403 | Rank candidates with a weighted score in which the ACES Alignment Score (CL-409) is the first criterion, and record the weights and the goals left out (SOP 4.2). | Must | The ranking can be reproduced from the recorded weights | P3 |
| CL-404 | Assess each WIG for risk and AI relationship, recording the business problem, principle and control (SOP 4.3). | Must | Every AI-related WIG names a problem, an owner and a control | P3 |
| CL-405 | Break each WIG into objectives with owner, date, lead, lag and AI measures, and a resource estimate (SOP 4.4). | Must | No objective lacks an owner, a date or a measure | P3 |
| CL-406 | Draft tactic documents from a parent WIG using the document map and COMPASS templates (SOP 4.5). | Should | Each draft cites a WIG ID on its first page | P8 |
| CL-407 | Build the Traceability Matrix and report orphans, gaps and conflicts (SOP 4.5). | Must | The report lists every orphan and unresolved link | P3 |
| CL-408 | Generate the scoreboard definition: measures, sources, owners and cadence (SOP 4.5). | Could | The definition loads into the client's chosen tool | P8 |
| CL-409 | Score every candidate WIG, active or in the backlog, against the ACES rows. For each row (Achieve, Conserve, Eliminate or Start) the WIG is given 0 (no link), 1 (indirect), 2 (supports it) or 3 (directly moves it), with a one-line reason. The owner gives each ACES row a weight of High (3), Medium (2) or Low (1), starting from the row's Why. The ACES Alignment Score is the weighted total as a percentage of 3 times the sum of the three largest row weights, which is what a WIG scores if it moves the owner's three most important rows directly, capped at 100 (0 to 100). Lite also shows ACES coverage: any High-weight row that no WIG scores 2 or more against is flagged as an uncovered ACES issue (SOP 4.1, 4.2). | Must | Every WIG shows its row scores, reasons and total, and the score can be reproduced from the recorded weights. Lite proposes the scores as SUGGESTION and the owner confirms them | P3 |
| CL-410 | Keep a WIG Backlog: a ranked list of potential WIGs taken from workshop candidates, goals left out of the four slots, and researched suggestions (CL-802). Each entry has a title, the From X to Y by when draft, its ACES Alignment Score with the rows it serves, its rank, its source and a status (Backlog, Active, Completed or Dropped). Rank follows the ACES Alignment Score first, then the other weighted criteria (CL-403). The owner may move an entry with a reason that is recorded (SOP 4.2). | Must | No backlog entry becomes active without the owner's decision, an entry that Lite or a search proposed is labelled SUGGESTION, and the order can be reproduced from the scores and any recorded moves | P3 |
| CL-411 | When the owner adds, edits, re-weights or removes an ACES row, re-score every active WIG and every backlog entry, and show a before and after table of score and rank. Flag any active WIG whose score falls below the owner's floor (default 40), any backlog entry that now outranks an active WIG, and any uncovered High-weight row. Propose, and never apply, a re-rank or a new candidate WIG for each gap. Lite never changes an ACES row on its own: where a review shows a row is out of date it raises a SUGGESTION and the owner decides (SOP 4.2). | Must | After any ACES change every WIG and backlog score is current, the change is logged with the ACES version, and nothing in the WIG register or backlog order changes until the owner confirms | P3 |
| CL-709 | Complete a WIG only when every objective under it is Completed or Cancelled. If any objective is still open, block the completion, name the open objectives, and let the owner complete or cancel each one first. On completion, record the final result against the lag measure, the lessons learned and the date | Must | A WIG with an open objective cannot be marked Completed and the open objectives are listed. A WIG whose objectives are all Completed or Cancelled can be completed, with its result, lessons and date recorded | P3 |
| CL-710 | Keep every completed WIG in an Archive. An archived WIG is read-only and keeps its objectives, final result, lessons learned, linked use cases and change log. It leaves the active WIG Register and frees its place, but stays readable at reviews and can be included in the facilitator snapshot (CL-708). Use cases linked to the WIG are flagged for the owner to close out or move to the next WIG, and Lite changes nothing in Logbook | Should | The Archive lists each completed WIG with its date and result. An archived WIG cannot be edited and nothing in it is deleted. Flagged use cases are shown to the owner, and an exported archived WIG is marked Archived | P3 |
| CL-711 | When a WIG is completed (CL-709) or a WIG slot is free, first re-score the backlog against the current ACES rows (CL-411), then show the top backlog entries with their score, the rows they serve, the reason, and what choosing each would change. The owner picks the next WIG, or leaves the slot free. A pick that is not the top-ranked entry needs a recorded reason. The owner then writes the WIG; from P6 Ask Lite can draft it with depth probing (CL-611). | Must | The candidates shown are ordered by a score computed after the latest ACES change, the owner's choice is logged with any reason, and no WIG is activated by Lite | P3 |
| CL-1101 | Offer a quick start path at the first run (CL-901): Mission (CL-1002), ACES, one goal chosen from the backlog or drafted by Lite, and a weekly check. Every other set-up step is deferred and listed as an open set-up item. The owner can switch to the full set-up at any time. | Must | A new install reaches a confirmed first goal and a first scoreboard without completing the full set-up, and the deferred steps show each time Lite opens | P3 |
| CL-1102 | Carry sector starter libraries as read-only, versioned data: example ACES rows, goals with typical start and end ranges, lead and lag measures, risks (on the AEGIS scale) and AI use cases. Every item is labelled Example, shows the library name and version, and is never applied without the owner's choice. A chosen goal enters the backlog and is scored against the owner's ACES (CL-409). | Must | An applied item shows its library and version, ranks in the backlog with an ACES score, and no library item reaches the registers without confirmation | P3 |
| CL-1103 | Record time to first value: the time from first opening Lite to the first confirmed goal and the first scoreboard reading. Show it in the Reviews KPI table. | Should | The figure appears with its two dates, and Not recorded if either is missing | P5 |

### 7.7 AI use cases and the AEGIS Essentials export

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-803 | Propose a list of AI use cases, each tied to a WIG, using the 12 fields of the P1 Use Case Proposal: title, proposer and function, problem today, proposed AI use, AI type, WIG or objective supported, expected value, highest data level as the owner states it, who is affected, human check, Enabler yes or no, and a proposed Business Process Owner | Must | No use case lacks a linked WIG, a problem and a proposed owner, and every value estimate has a one-line basis (an estimate without a basis counts as zero under Annex F) | P3 |
| CL-804 | Let the owner put the candidate use cases in their own order of priority. Lite gives only indicative quadrant data (CL-817) and never a formal score, because P1 does that in its AG1 assessment | Should | The order is the owner's, and the export carries no formal score, only the indicative data of CL-817 labelled as such | P3 |
| CL-805 | Export the approved use case list as an Excel workbook for Logbook (SN-LOGBOOK-01), the AEGIS Essentials register agent: one sheet of P1 Use Case Proposals (one row per use case) and one sheet of WIGs and objectives (CL-812), as proposed entries only | Should | Every Proposal field is present or marked Not recorded. Indicative quadrant data (CL-817) sits in separate columns labelled Indicative. The sheet layout is to be confirmed against Logbook's /intake | P7 |
| CL-810 | Never give a use case an ID (UC-YYYY-NNN), pre-screen result, formal score, risk band, outcome or gate result in the governance fields. The AI Governance Lead assigns the ID and Logbook applies the rules, so the export leaves those fields empty. Indicative data under CL-817 is kept apart and labelled Indicative. The data level is only the owner's own statement, to be confirmed by the Data Owner | Must | No exported entry carries a value in any of those governance fields, the data level is labelled as the owner's statement, and indicative data appears only in the Indicative columns | P7 |
| CL-811 | Keep the export free of restricted data: no credentials, keys or secrets, and nothing above Logbook's L3 data ceiling. Tell the owner the file is handed over by hand, with no connection to SpecNav | Must | A check of the export finds no credential-like text and no restricted data | P7 |
| CL-812 | Export Lite's WIGs and objectives in the format of the policy's WIG and Objectives List (Annex E.2): an ID such as WIG-01 or OBJ-01.1, the WIG or objective, the lag measure written From X to Y by when, the lead measures and the owner | Must | Every exported use case cites an ID that appears in the exported list. The policy says no link, no approval | P7 |
| CL-817 | For each proposed use case, capture basic indicative data for the four quadrants of the Value × Readiness view: Business Value (1 to 5, from the Annex F value bands), Technical Feasibility (1 to 5), Organizational Maturity (1 to 5), and risk as likelihood (1 to 5) times impact (1 to 5) with the indicative band, both taken from the Risk Register scoring (CL-904), plus the Enabler flag. Show an indicative quadrant (Quick Win, Big Bet, Foundation or No-Go) using the rule order published in Logbook's policy. Every input is the owner's estimate with a one-line basis, and the result is labelled Indicative, not a decision. This is basic data only: no weighting, no sequence score and no gate | Should | Each use case shows its inputs with a basis, or Not recorded, and a missing input shows the quadrant as Not assessed. The label reads Indicative, owner estimate, and Logbook's AG1 assessment prevails. The export holds these in separate Indicative columns | P3 |

### 7.8 Stage 5: Strategic Roadmap

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-501 | Map each WIG to Float, Move or Sustain and check against AI maturity (SOP 5.1). | Must | Any item needing a maturity level the client will not yet have is flagged | P5 |
| CL-502 | Build the Milestone Plan with dates, dependencies, resources and legal restraints (SOP 5.2). | Must | Every milestone has a date, a dependency check and a resource | P5 |
| CL-503 | Assign RASCI with exactly one Accountable owner per milestone (SOP 5.3). | Must | A milestone with no owner, or more than one, is rejected | P5 |
| CL-504 | Set a KPI, a KRI, a threshold and a trigger action for each milestone (SOP 5.3). | Must | No milestone lacks any of the four | P5 |
| CL-505 | Produce the phase gate checklist and review pack (SOP 5.4). | Should | The pack cites the measures each gate decision rests on | P5 |
| CL-506 | Produce a structured package of commitments, ethical principles, AI use cases, risks, owners and controls for AEGIS and later Compass levels (SOP 5.4). | Should | AEGIS and later levels receive the package without rework | P7 |
| CL-507 | When a milestone is about to start, check it against the failure mode shortlist (CL-806 and CL-807) and Chart's eight failure patterns, and raise any match as a POTENTIAL CHALLENGE with its design-time mitigation (SOP 5.4). | Should | Each mitigation is a build or sequencing change, never a monitoring task | P5 |

### 7.9 Risk Register on the AEGIS scale

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-904 | Score every risk on the AEGIS Master Categories and Scoring (V1.0): likelihood 1 to 5 (Rare to Almost Certain), impact 1 to 5 (Insignificant to Severe), score equals likelihood times impact, with bands Low 1 to 5 (accept and monitor), Medium 6 to 10 (mitigate with controls), High 11 to 15 (escalate and actively manage) and Critical 16 to 25 (immediate action and executive oversight). If the owner's policy uses another scale, Lite shows the differences and the owner confirms a mapping. The register then holds the AEGIS score, marked Converted, beside the policy's own rating | Must | Score and band recompute from likelihood and impact. A Converted score shows the policy rating and the mapping used. No threshold is applied that neither AEGIS nor the owner's policy states | P4 |
| CL-905 | Keep one Risk Register. Each risk has: ID, title, what could go wrong and what it affects, AEGIS risk category (one of ten, with an optional second), ISO/IEC 42001 Annex A area (A.1 to A.10, chosen from the master list), AEGIS function (Govern, Identify, Protect, Detect, Respond, Recover and improve), the linked WIG, objective, use case or failure mode, business function, residual likelihood, impact, score and band, treatment (Treat, Tolerate, Transfer or Terminate), controls each typed Preventative, Detective, Corrective or User Governance, a detect indicator (which becomes a KRI under CL-808), risk owner, status, next review date and source. Failure Mode Register entries (CL-813) appear as risks with the source Failure mode, once each | Must | Every field is present or marked Not recorded, each risk has one primary category, and the score is the residual score after planned controls | P4 |
| CL-906 | Propose a likelihood, impact, category or control only as a SUGGESTION with a one-line basis and source. The owner sets and confirms them. Lite never records a risk as accepted. For a High or Critical risk it shows the response that band calls for and the owner's options, and Tolerate on a High or Critical risk needs the owner's recorded reason and a flag for the Executive Sponsor | Must | No score, treatment or acceptance is recorded without the owner's confirmation, and no Critical risk shows as accepted without a reason and a flag | P4 |
| CL-907 | Show the Risk Register as a heat map of business function by band, with counts of High or Critical, not scored, and no description, and a click-through to the list. From P5, re-score due risks at each review (CL-701 to CL-703) on the cadence the policy sets, Critical first | Should | Counts match the register. A risk review that is overdue is reported when Lite opens (CL-706) | P4 |
| CL-908 | Exchange risk data with AEGIS Essentials and other SpecNav products on the one AEGIS scale. On request, export the Risk Register as an Excel workbook in the field order of CL-905, as proposed entries only, showing the policy name and version on file and the version of the AEGIS Master Categories and Scoring. Read a risk register exported from AEGIS Essentials, applying nothing until the owner confirms (as in CL-623) | Should | An exported row needs no conversion in AEGIS Essentials, gaps show as Not recorded, and an import shows a preview with counts first. The sheet layout is confirmed against Logbook's /intake | P7 |
| CL-909 | Carry the AEGIS Master Categories and Scoring (V1.0) as read-only reference data inside the file, labelled Template (CL-1306): scales, bands, categories, treatment and control types, data levels L1 to L5 and tool tiers. Never edit it in the page. State its version in the Risk Register and every export. A newer version arrives only with a new release. | Must | The version appears on the register and on every export | P4 |

The ten AEGIS risk categories (consolidated list in the workbook's AI RMF Categories sheet) are: governance, accountability and oversight; legal, regulatory and compliance; data governance and privacy; fairness, ethics and human rights; safety, security and resilience; model performance and reliability; transparency, explainability and disclosure; operational and lifecycle management; third-party and supply chain; and strategic, financial and reputational impact. The workbook lists the ISO/IEC 42001 Annex A areas (A.1 to A.10) beside them but does not pair them one to one, so Lite records both and leaves the pairing to the owner until SpecNav publishes one (see the open points).

### 7.10 Failure modes and goal-to-failure-mode plans

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-806 | Start the Failure Mode Register with a default set of Chart's eight failure patterns, each mapped to catalogue entries and to one of the four failure categories (CL-818), drawn from the AI Failure Mode Catalogue, and show the relevant ones for each use case with their detect indicator and response | Must | Every use case lists its matching failure modes with a detect indicator and a response | P4 |
| CL-808 | Turn the detect indicators of confirmed failure modes into KRIs in the KPI and KRI Register | Should | Each confirmed failure mode has a KRI with a threshold | P4 |
| CL-813 | Own and manage a Failure Mode Register: the business's default shortlist plus confirmed additions, each with a primary category and an optional secondary category from the four failure categories (CL-818), a detect indicator, a response, an owner, a status and a source. Review it at each review (CL-701 to CL-703) | Must | Every entry has all eight fields, and every change is logged with the owner's confirmation | P4 |
| CL-814 | Before any use case exists, on the Failure patterns tab, run a readiness check across the four failure categories to show where the business is most exposed, plus a short data readiness self-check based on CRISP-DM Business Understanding and Data Understanding. The owner says which data the goals will need, who owns it, how clean and reachable it is, and its data level (L1 to L5), and Lite rates each data set Ready, Ready with fixes or Not ready for the owner to confirm. From Stage 4 the check repeats for each use case, and any data preparation work goes on the roadmap | Should | The result covers each category and names no tool or use case, and each data set has a rating the owner confirmed | P4 |
| CL-815 | On request, export the AI Failure Mode Catalogue workbook (Read Me, Dashboard, Use Case Search, Catalogue, Lists) filled from the Failure Mode Register. | Could | The workbook opens without repair and its counts match the register | P7 |
| CL-816 | On request, export the failure modes the owner has confirmed as additions, with their source, detect indicator and response, as a feedback file the owner may choose to send to SpecNav. Lite never sends it, the file holds no client data, and the master catalogue works without it | Could | The file lists only confirmed additions, contains no client names or figures, and nothing leaves Lite unless the owner sends it | P7 |
| CL-818 | Group every failure mode under four fixed categories, the same four taught in SpecNav's AI Leadership and Strategy course (LB-002): Strategic Pitfalls (no defined business problem or measurable goal), Operational and Execution Failure (a pilot that works small but does not survive scale), Data and Infrastructure Deficiencies (launched before the data is ready) and Human and Culture Roadblocks (adoption stalls on fear or lost trust, not skills). Each mode has one primary category and may name one secondary category. The four are SpecNav's own grouping, supported by BCG's 10-20-70 research and McKinsey's State of AI 2025, and Lite says so rather than presenting them as an outside standard. Chart's eight patterns map as follows, for the owner to confirm: Strategic Pitfalls holds scope creep past the quick win, tool and platform mismatch and measurement vacuum; Operational and Execution Failure holds owner and accountability gap and capacity overload on a small team; Data and Infrastructure Deficiencies holds data readiness mismatch; Human and Culture Roadblocks holds trust and adoption erosion and voice or brand drift. A mode found by research is placed in one of the four as a SUGGESTION and the owner confirms it. Lite does not add a fifth category. | Must | Every mode in the register shows one primary category from the four, a researched mode cannot join the register without a confirmed category, and the register offers no fifth category | P4 |
| CL-819 | Show the Failure Mode Register by category: for each of the four, the number of modes and how many are Triggered, Watching or Clear, with the modes listed beneath. Run a design-time check across all four categories for each goal and AI use case, and say which category has no mode considered. Do not show a separate "Pilot purgatory" check. A pilot that stalls is the failure mode "AI use case stuck in pilot" (CL-821), held under Strategic Pitfalls like any other mode. | Should | Category counts match the register, a category with nothing considered is named, and no separate Pilot purgatory check appears anywhere in Lite | P4 |
| CL-820 | Carry the failure category into the other registers. A failure mode that appears in the Risk Register (CL-905) keeps its failure category beside its AEGIS risk category. A Failure Mode Catalogue workbook export (CL-815, from P7) fills a Failure category column from the register. Where the catalogue uses its own categories, Lite shows the mapping to the four and the owner confirms it. | Should | A failure-mode risk shows both categories, and an export has the failure category on every row or marks it Not recorded | P4 |
| CL-821 | Include "AI use case stuck in pilot" as a standard failure mode, primary category Strategic Pitfalls, secondary Operational and Execution Failure. It means an AI use case that stays in pilot and cannot scale because it has poor ownership or management. It is on the default shortlist (CL-806). Its detect indicator is: a pilot has no named owner (CL-1204), or has run past its planned review date with no scale, fix or stop decision. No catalogue ID is claimed until one exists; it shows as Not in catalogue. It replaces the earlier Pilot purgatory check. | Must | The mode appears under Strategic Pitfalls. It shows Triggered when any use case has no owner, Watching when a use case is past its review date with no decision, and Clear otherwise. Pilot purgatory appears nowhere else. | P4 |
| CL-822 | Let every goal (WIG), objective and AI use case be linked to the failure modes that could stop it. A link records what it is on, the mode, its category, a named owner chosen from the People Register (CL-1201), a detect plan (CL-823), a mitigation plan (CL-824) and the current status of the mode. Lite proposes links as a SUGGESTION: the stuck-in-pilot mode for every AI use case, and, for each goal, a standard mode in any of the four categories not yet considered. The owner confirms each link, or confirms all. Nothing is added until confirmed. A proposed link starts from a standard plan template and from the owner of the goal or use case. | Must | Suggested links are marked SUGGESTION and are not saved until confirmed. A confirmed link shows owner, detect plan and mitigation plan. Each goal and use case shows which of the four categories it covers. | P4 |
| CL-823 | Every link has a detect plan: the indicator (the early sign), the trigger point, the source of the figure, how often it is checked (weekly or monthly) and the person who checks it. The indicator is also created as a key risk indicator (CL-808) and appears on the Risk Register. Where the figure comes from connected data (from P8) it is read; otherwise the owner enters it. A missing figure is shown as Not recorded and is never estimated. | Must | The plan shows all five parts. The indicator appears on the Risk Register. A missing reading shows Not recorded. | P4 |
| CL-824 | Every link has a mitigation plan in two parts: what to do now to prevent the mode (before it appears), and what to do if it triggers (the response). It has an owner and a due date. Due dates appear in the weekly team pack and Commitment Register so they are done, not just written. | Must | Both parts, an owner and a due date are recorded. From P5 a due date appears in the weekly pack. | P4 |
| CL-825 | Highlight linked modes where the goal or use case is shown. Each goal card and AI use case card lists its linked modes with their status, and names any category not yet considered. A goal or use case shows At risk when any linked mode is Triggered. Triggered and Watching modes also appear under Risks to watch on the Dashboard. | Must | Triggering a linked mode changes the goal or use case to At risk without any other step. The Dashboard lists it. | P4 |
| CL-826 | Show a Gaps list for the links: no owner, no detect indicator, no mitigation plan, a Triggered mode with no response by its due date, and any goal or use case with a category not yet considered. The owner can mark a category Considered, not relevant with a reason. Each gap says what to do. | Must | Each gap is listed with a next step and clears when fixed. A Considered, not relevant mark keeps its reason. | P4 |
| CL-827 | For the stuck-in-pilot mode, set a scale, fix or stop review date when the pilot is created (default 8 weeks, the owner can change it). The owner records the decision (scale, fix or stop), the date and the reason. A pilot past its review date with no decision turns the mode to Watching. A pilot with no owner turns it to Triggered, and the Executive Sponsor is shown as the person to decide. | Must | Review date, decision, date and reason are recorded. Recording a decision clears Watching. Removing an owner turns the mode to Triggered. | P4 |
| CL-828 | Log every link confirmed, changed or removed, and every plan added, with the date and who confirmed. Each link is shown on the Risk Register entry for its failure mode (CL-905) with its linked goal, objective or use case, its category and the failure mode, and, from P7, is carried in the AEGIS export (CL-820). | Must | Log entries exist for each change. The Risk Register and export show the link fields. | P4 |

Chart holds the authoritative Failure Mode Reference Set of eight patterns, each with a design-time mitigation: owner and accountability gap, data readiness mismatch, trust and adoption erosion, scope creep past the quick win, tool and platform mismatch, capacity overload on a small team, measurement vacuum, and voice or brand drift. Lite carries these eight plus AI use case stuck in pilot as its default set, mapped to catalogue IDs in the Failure Modes tab of the BSIP doc. Voice or brand drift and the stuck-in-pilot mode have no catalogue entry yet.

### 7.11 Running the strategy after launch

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-701 | Run a light weekly progress check that reflects each WIG's status and % complete | Should | The readout uses only data the user has entered and flags anything stale | P5 |
| CL-702 | Run a quarterly strategy review that retests the Strategy Statement, MVV and WIGs against results, rechecks the ACES rows, and re-scores the WIGs and the backlog against them (CL-411), and revisits failed assumptions | Should | Every failed assumption is retested and a decision logged | P5 |
| CL-703 | Run a monthly review and produce a short progress update the owner can share | Should | The update contains confirmed content only | P5 |
| CL-704 | Support WIG turnover: complete an achieved WIG and move it to the Archive with its outcome (CL-709, CL-710), present the backlog ranked by ACES alignment (CL-410, CL-711), and draft the next WIG with depth probing | Should | Any WIG Lite proposes is labelled SUGGESTION with its source, and the owner chooses the next WIG | P5 |
| CL-705 | Keep the WIG Register, KPI and KRI Register and Milestone Plan as the single record every review reads | Must | No review uses a figure that is not in a register | P5 |
| CL-706 | Report stale entries and overdue reviews when Lite opens | Should | Lite does not promise reminders it cannot send | P5 |
| CL-707 | Read the ten KRIs from the registers when Lite opens and at each review. For each, show the current reading, the threshold, the trend, whether the figure is owner-entered or missing, and what would bring it back in range | Should | A KRI with no data is shown as Not recorded, never estimated, and a crossed threshold goes to the owner with the options | P5 |
| CL-708 | On request, produce a status snapshot as an Excel workbook for the retained facilitator: WIG and objective status, milestone status, KRI readings, open decisions and exceptions, review dates and agent KPI scores. The owner chooses what to include. Lite never sends it. Inviting the facilitator to the page (CL-1409) is the alternative. | Should | The snapshot carries an as-of date and release, lists what was included and left out, and shows gaps as Not recorded | P7 |
| CL-1111 | Produce a Strategy on a page for the whole team: Strategy Statement, Mission, Vision, Values, AI ethical principles, strategic themes, and each goal with its lead measure and scoreboard. It contains confirmed content only, is dated, and can be saved as a file or printed. | Must | The page matches the registers, shows its date, and any unconfirmed item is left out or labelled Not confirmed | P5 |
| CL-1112 | Produce a weekly team meeting pack for a 15-minute meeting: last week's commitments and whether each was kept, the lead-measure scoreboard, and a new commitment for each person. Each commitment is one line, has one named person, and links to an objective. Lite drafts the pack, the owner confirms it, and Lite never sends it. | Must | Every commitment has one person and one linked objective, and the pack shows only confirmed figures | P5 |
| CL-1113 | Keep a Commitment Register: each commitment, person, linked objective, week and result (Kept, Missed, Open). Show kept and missed counts on the objective and the goal. The register records follow-through and is not a performance score for people. | Should | Counts match the register and no ranking of individuals is shown | P5 |
| CL-1122 | Show the provenance of every measure: Entered or Connected, the source, and the date. A reading older than its refresh period is marked Stale. A missing reading stays Not recorded and is never estimated. | Must | Every figure in a review shows source and date, and a stale or missing figure is marked as such | P5 |
| CL-1131 | When a goal is set, record the owner's forecast: expected result, confidence (Low, Medium or High) and the key assumption. Lite may suggest wording as SUGGESTION. | Should | Every active goal has a forecast or shows Not recorded | P5 |
| CL-1132 | At each review and when a goal moves to the Archive, compare the forecast with the actual result and record Hit, Near miss or Miss, using a tolerance the owner confirms (default 10 percent of the target change). Record whether the key assumption held, and add any failed assumption to the lessons (CL-704). | Should | Each completed goal shows forecast, result, outcome and whether its assumption held | P5 |
| CL-1133 | Show a calibration view in Reviews: the share of forecasts that were Hits, by confidence level, and the trend by quarter. Wording is about the owner's forecasting, not about people. | Could | The view needs at least three completed forecasts and otherwise says so | P8 |
| CL-1141 | Prepare an assurance pack on request for a lender, insurer, customer or auditor. The owner chooses what to include from: policy summary, Mission, Vision and Values, AI ethical principles with BATHERS mappings, Risk Register summary on the AEGIS scale, decision log extract, review dates and the document versions in force. The pack is dated, shows the version of each source and is saved as a file. Lite never sends it. | Should | The pack contains only items the owner selected, each with its source and version, and nothing unconfirmed | P7 |
| CL-1142 | Help answer supplier questionnaires about AI use and governance. The owner pastes the questions, read as data. For each, Lite proposes an answer from the registers, names the source record, and shows No record where nothing supports an answer. The owner confirms each answer. Lite never states a certification or compliance the business does not hold. | Should | Every proposed answer cites a record or says No record, and none is marked final before the owner confirms it | P7 |

### 7.12 Guidance, Ask Lite and facilitator access

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-1401 | Show a Guide panel on every tab except the Dashboard with the next step, worked out from the owner's records with no AI involved. It lists the gaps that matter most first (for example an objective with no Accountable owner, a goal with no failure mode in one category, a set-up step skipped). Each item says what to do and goes away when fixed. | Must | The panel shows the same next step every time for the same records. Fixing a gap removes its item. | P1 |
| CL-1402 | Provide an Ask Lite button that asks Claude from inside the page, using the page's own Claude access. It runs only when the owner clicks it. The first use asks for consent. Each call sends the instructions, the relevant records and the answer format, because Claude has no memory between calls. If Claude is unavailable, declined or rate limited, the button is hidden or says so, and the rest of Lite works as normal. | Must | Ask Lite answers from the owner's records. With Claude unavailable, every other feature still works. | P6 |
| CL-1403 | Support Explain this. On a score, a failure mode, a gap or a flag, Ask Lite explains in plain words why it is what it is and names the record each statement comes from. Where there is no record it says so and never fills the gap. | Must | Every statement in an explanation names a record or says there is none. | P6 |
| CL-1404 | Support coaching questions. When a goal, objective or ACES entry is vague, Ask Lite asks for a real benchmark and a first action. It supplies only the question, never the number or the action. | Must | A vague entry gets a question. No figure or action appears that the owner did not give. | P6 |
| CL-1405 | Support drafts. Ask Lite can propose wording for a Strategy Statement, a goal, an objective, or a detect and mitigate plan. Every draft is marked SUGGESTION, shown beside the owner's current text, and not saved until the owner confirms. | Must | A draft never overwrites the owner's text without a confirm. The original can be restored. | P6 |
| CL-1406 | Apply fixed guardrails to every Ask Lite call: Lite reflects and prompts and never decides; each call sends only the records the answer needs, never the whole database; every proposal is recorded in the AI proposal log, shown with the decision log, with what the owner did with it (accepted, changed, rejected). The no-client-data search rule applies to research (CL-809, CL-1408). | Must | The log shows each proposal and the owner's response; a test call carries only the records named for that answer | P6 |
| CL-1407 | Give Claude read-only tools inside the page: it can list the registers, scores and gaps to answer from the owner's real records. It has no tool that writes. Records change only when the owner confirms. | Must | A test that asks Claude to change a record leaves it unchanged. | P6 |
| CL-1409 | Let the owner invite a SpecNav facilitator by email from Claude's Share menu for the page, at Viewer level by default. The owner changes the guest's role (Viewer, Contributor or Editor) or removes them in the same menu. The page lists who the owner has recorded as having access, at what level and since when, and logs each change the owner records. | Must | A Viewer guest can read and cannot change records; the access list and its log match what the owner recorded | P6 |
| CL-1410 | Keep the owner's private notes and drafts private to the owner. Everything else in Lite is a shared record and is visible to anyone with access. | Should | A guest cannot see the owner's private notes. | P6 |
| CL-1411 | Log every change made by a guest with who, when and what, and mark it as made by a guest. The data ceiling (L3 confirmed, L5 always refused) applies equally to what a guest can see and enter. | Must | Each guest edit appears in the log marked as a guest edit. | P6 |
| CL-1412 | Optionally show live presence while the owner and facilitator both have the page open: who is there and which tab each is on, with no content shown. Needs the room capability and the user profile scope, added in P6. | Could | Both people see the other's name and tab. Closing the page removes the person | P6 |

### 7.13 Later phase: research, connectors and benchmarks

| ID | Requirement | Priority | Acceptance test | Phase |
| --- | --- | --- | --- | --- |
| CL-1408 | In Phase 8, hand heavier work to a Claude Code session started from the page: reading the owner's website for Mission, Vision and Values, web research for failure modes and benchmarks, and reading a long uploaded policy. The page shows each request as Waiting, Done or Not connected. Results arrive marked SUGGESTION and wait in a queue for the owner's confirmation. | Should | A request shows its state. A result is not applied until confirmed. With no connection, the page says so and the manual route still works. | P8 |
| CL-801 | Research best practice for the business's sector, size and direction through a Claude Code research session started from the page (CL-1408), and record each source with its date. | Should | Every researched item has a source, a date and an unverified mark | P8 |
| CL-802 | Propose candidate WIGs and objectives from best practice and the Strategic Direction, labelled SUGGESTION. From P6 this comes from Ask Lite drafting (CL-1405); from P8 it can also draw on research (CL-1408). | Should | No proposal enters the WIG register without the owner's decision | P6 |
| CL-807 | Research and propose extra failure modes for the business's needs and direction through a research session (CL-1408), marked new and unverified. | Should | An extra failure mode joins the register only after the owner confirms it, with its source | P8 |
| CL-809 | Keep a research log of topics searched, sources used and dates, and never put the client's confidential data in a search | Must | The log lists every search, and no query contains client names or figures | P8 |
| CL-1121 | Read measure values from the tools the business already uses (accounting, CRM and spreadsheets) through read-only connectors the owner allows for the page. A reading is proposed first, the owner maps it to a measure and confirms, and Lite never writes back. Only aggregate figures are stored, never customer records. | Should | A mapped measure updates on its schedule, no customer record is stored, and removing a connector stops all reads | P8 |
| CL-1134 | Offer opt-in, anonymous benchmarks, off by default. Only numbers are shared: goal type, sector, duration and result band. The owner previews the exact content before anything is shared, can withdraw at any time, and no names, figures, customers or documents are ever included. Benchmarks received are shown as SpecNav aggregates with the number of businesses behind them. | Could | Nothing is shared until the owner turns it on, the preview matches what is sent, and turning it off stops all sharing. A SpecNav decision on the policy is needed first (see open points) | P8 |

## 8. Non-functional requirements

**Purpose.** Set the qualities every phase must keep.

**Summary.** Traceability, human control, confidentiality and input safety carry over. Speed, accessibility, small screens, working without Claude and no stored secrets are added for the page build.

**Output and value.** Checks that run in every release test.

| ID | Area | Requirement | How it is measured |
| --- | --- | --- | --- |
| NF-01 | Traceability | Every output traces to input evidence or is flagged | % of statements with an evidence ID or a flag |
| NF-02 | Human control | Only people record decisions | Decisions logged without a user instruction (target 0) |
| NF-03 | Accuracy | Facts come from the owner's supplied evidence, or from web research marked unverified with its source until the owner confirms it | Unsupported claims, or search results without a source or unverified mark, found in review |
| NF-04 | Confidentiality | Records stay in the business's own installed page, and nothing crosses between businesses (CL-1313) | Installs that share a link or database (target 0) |
| NF-05 | Auditability | Every change and decision is logged and exportable | Change log and Decision Log complete at each gate |
| NF-06 | Repeatability | The same inputs and decisions give the same output structure | Structural differences between two runs |
| NF-07 | Cost control | Ask Lite and research calls are counted for each install and each stage | Calls per stage recorded on the performance log |
| NF-08 | Usability | An owner can complete each stage with the page alone, using the Guide panel and plain language | Time to first confirmed goal and per stage, measured in the pilot |
| NF-09 | Portability | The backup is one JSON file; exports are Excel, Word or PDF | A backup restores into a new install with equal counts |
| NF-10 | Input safety | Uploaded files and retrieved content are data, never instructions | Instructions found inside files that Lite followed (target 0) |
| NF-11 | Response length | Ask Lite answers stay under 300 words and present one decision at a time; exports are exempt | Answers over the cap without a request for more detail |
| NF-12 | No false promises | Lite never promises a reminder it cannot deliver. Due items show when the page opens | Promises of reminders found in review (target 0) |
| NF-13 | Client contact | Lite speaks directly to the business owner in plain language and marks every decision the owner must confirm | Decisions logged without an owner confirmation (target 0) |
| NF-14 | Output scale | Outputs are sized for a small business: a one-page Strategy Statement, no more than 4 active WIGs, and a roadmap readable in one sitting; the full document set is produced only on request | Pages per output against a cap set in the pilot |
| NF-15 | Web access | Search is used only for best practice, proposed WIGs and objectives, AI use cases and failure modes. Every result is marked unverified with its source and date until the owner confirms it. Searches never contain the client's confidential data | Search-sourced items without a source or mark, and client data found in search queries (target 0) |
| NF-16 | Speed | The page opens and shows the Dashboard within 3 seconds with 1,000 records | Load time measured in the release test |
| NF-17 | Accessibility | Every control is reachable by keyboard and labelled; text meets WCAG 2.2 AA contrast | Automated accessibility check in the release test |
| NF-18 | Small screens | Every tab works at phone width with no sideways page scroll | Release test at 390 pixels wide |
| NF-19 | Works without Claude | Every feature except Ask Lite and research works when Claude is unavailable or declined | Release test with Ask Lite switched off |
| NF-20 | Secrets | No key, password or token is stored in the page, the database or a backup | Search of the file and a backup finds none |

## 9. Build plan

**Purpose.** Give Claude Code an order to build in, with a gate for each phase, so every phase ships something the owner can use.

**Summary.** Eight phases. Each phase is a release of the one file, with a Playwright test file that must pass and a release check that must print aligned. The demo is the UI reference throughout.

**Output and value.** A working Lite after Phase 1, a full Stage 3 to 5 run after Phase 5, and the pilot (Mark Heward, one month) from Phase 6.

| Phase | Builds | Main requirements | Gate to release |
| --- | --- | --- | --- |
| P1 Foundation | The file, repository files, saving, status chip, self-test, data health, backup and restore, first-run screen, Set-up and Organization tabs, Dashboard shell, Guide panel rules, decision log, labels, release check | CL-1301 to CL-1313, CL-901 to CL-903, CL-1201 to CL-1203, CL-1205 to CL-1207, CL-601 to CL-605, CL-608 to CL-610, CL-612, CL-613, CL-616, CL-617, CL-625, CL-626, CL-1401 | With the test stand-in: a change survives reload; a backup restores into a fresh install with equal counts; self-test passes; removing the only Executive Sponsor is blocked. Manual check: install from the repository by the INSTALL.md message and repeat the reload and backup tests in Claude |
| P2 Stage 3 | Intake Pack uploads and reading, Strategy Statement, themes, MVV tab and score, ethics, exceptions, Stage 3 gate | CL-301 to CL-305, CL-307 to CL-309, CL-1001 to CL-1004, CL-1006, CL-1007, CL-1009, CL-618 | MVV score reproduces from the recorded scores; no item is Confirmed without a Confirm action; Stage 3 gate lists each item passed, failed or waived |
| P3 Stage 4 | ACES weights and scores, goals and objectives, backlog, archive, next-goal choice, AI use cases with indicative data, quick start, starter library | CL-401 to CL-405, CL-407, CL-409 to CL-411, CL-709 to CL-711, CL-803, CL-804, CL-817, CL-1005, CL-1101, CL-1102, CL-1204 | ACES scores reproduce; a goal with an open objective cannot complete; an ACES change shows before and after and changes nothing until confirmed |
| P4 Risk and failure modes | Risk Register and heat map using the confirmed policy settings, failure mode register by category, goal-to-mode links, detect and mitigate plans, stuck-in-pilot rule, data readiness check | CL-806, CL-808, CL-813, CL-814, CL-818 to CL-828, CL-904 to CL-907, CL-909, CL-1008 | Removing a use case owner turns stuck-in-pilot Triggered and the use case At risk; scores and bands recompute; no risk is accepted by Lite |
| P5 Stage 5 and reviews | Timeline, milestones, RASCI, thresholds, gate pack, weekly, monthly and quarterly reviews, KRIs, team pack, commitments, forecasts, Strategy on a page, after-action review | CL-501 to CL-505, CL-507, CL-606, CL-624, CL-701 to CL-707, CL-1103, CL-1111 to CL-1113, CL-1122, CL-1131, CL-1132 | A full Stage 3 to 5 run on a test business; a missing reading shows Not recorded; a milestone with two Accountable owners is rejected |
| P6 Ask Lite and facilitator | Ask Lite explain, coach and draft with read-only page tools and guardrails; facilitator access, guest logging, private notes, optional presence | CL-1402 to CL-1407, CL-1409 to CL-1412, CL-611, CL-619, CL-802 | A draft never overwrites the owner's text without Confirm; a guest at Viewer level cannot write; every feature still works with Ask Lite off. Pilot starts |
| P7 Exports and exchange | Excel, Word and PDF exports, AEGIS Essentials workbooks, facilitator snapshot, assurance pack, supplier questionnaire, imports from Chart, Pilot and AEGIS | CL-506, CL-607, CL-620, CL-621, CL-623, CL-708, CL-805, CL-810 to CL-812, CL-815, CL-816, CL-908, CL-1010, CL-1141, CL-1142, CL-1208 | Exports open without repair; no governance field is filled; an import shows a preview with counts first |
| P8 Research and connectors | Claude Code research session, website reading for MVV, research log, read-only data connectors, calibration view, opt-in benchmarks, competitive matrix, tactic documents | CL-1408, CL-801, CL-802 research extension, CL-807, CL-809, CL-1002 Route 2, CL-1121, CL-1133, CL-1134, CL-306, CL-310, CL-406, CL-408, CL-622 | A result is not applied until confirmed; with no connection the page says so and the manual route works; no search contains client data |

**Release test for every phase.** Playwright opens the file with tests/claude-stub.js standing in for the database, user, file storage, downloads and Ask Lite (a fixed-answer stub), runs the phase's tests and the tests of all earlier phases, at desktop and 390 pixels wide, with Ask Lite available and switched off. The release check prints aligned. CHANGELOG.md and the README version line are updated. Each phase then gets one manual check in Claude itself, because the stand-in cannot prove real saving, consent prompts or sharing.

## 10. Product success measures

**Purpose.** Say how we will know Lite works for the owner and for SpecNav.

**Summary.** Product measures, the agent KPIs scored after each stage and review, and the KRIs that warn when the strategy is slipping. Targets are set in the pilot.

**Output and value.** The measures the pilot is judged on.

| Measure | Definition |
| --- | --- |
| Time to first value | Time from install to the first confirmed goal and first scoreboard reading (CL-1103) |
| Evidence coverage | % of statements in outputs that carry a source |
| Exceptions caught | Exceptions Lite raised that the owner confirmed as real, as a % of those raised |
| Traceability | % of objectives, milestones and use cases that cite a goal |
| Decision integrity | Decisions recorded without an owner Confirm (target 0) |
| Acceptance | % of drafts accepted with minor edits at the first review |
| Rework | Drafts rejected or substantially rewritten, as a % of drafts |
| Save integrity | Save failures and self-test failures per month (target 0) |

| Agent KPI | Source | What it measures | Scored by | Target |
| --- | --- | --- | --- | --- |
| Reflection Accuracy | Chart | The draft says what the owner told Lite, with nothing added | Owner rating, 1 to 5 | At least 4.5 |
| Owner Decision Adherence | Chart (HITL Adherence) | Decisions recorded only after the owner confirmed them | Lite count against the log | 100% |
| Flagging Completeness | Chart | Gaps, conflicts and risks raised and labelled with urgency | Owner rating, 1 to 5 | At least 4.0 |
| Deliverable Readiness | Chart | The owner could use the output with minor edits | Owner rating, 1 to 5 | At least 4.0 |
| Owner Clarity | New, replaces Facilitation Support Quality | Each decision was explained in plain language with its consequence (CL-625) | Owner rating, 1 to 5 | At least 4.0 |
| Efficiency | Chart | Rounds of correction before an item is final | Lite count | No more than 2 |
| Research Integrity | New | Every search result has a source, a date and an unverified mark, and no client data appears in a search (NF-15, CL-809) | Lite count against the research log | 100% |
| Review Currency | Pilot (Cadence Currency) | Weekly, monthly and quarterly reviews run within their due window | Lite check when Lite opens | At least 90% |
| Version Pairing Integrity | Pilot | Release, in-page SOP, Ask Lite instructions and changelog agree (CL-605) | Lite check when Lite opens | 100% |

### Key risk indicators (KRIs)

KPIs describe how well Lite performs. KRIs describe whether the business's strategy is working. Lite reads them from the registers when it opens and at each review, using only data the owner has entered or connected, and flags anything stale. Thresholds are provisional until set in the pilot.

| KRI | Question it answers | Indicator | Provisional threshold | Source | If it crosses |
| --- | --- | --- | --- | --- | --- |
| **Strategy** |  |  |  |  |  |
| WIG trajectory gap | Is the goal on course? | Lag measure behind its planned path at a checkpoint | More than 20% behind at two checks in a row | WIG Register | Retest the WIG and its assumptions at the next review |
| Lead measure stall | Are the actions driving the goal actually happening? | Lead measures with no update or no movement | Two weekly checks in a row | KPI and KRI Register | Ask the owner why, and review the objective |
| Failed or untested assumptions | Is the strategy resting on things that turned out false? | Assumptions marked failed, or past their review date untested | More than 25% of the register | Assumptions Register | Retest and log a decision at the quarterly review |
| Orphan work | Is activity drifting away from the strategy? | Documents, initiatives or use cases with no WIG ID | Any in a review, or more than 10% | Traceability Matrix | Link, drop or move to the backlog |
| **Execution** |  |  |  |  |  |
| Milestone slippage | Is delivery on time? | Milestones past their date | More than 14 days late, or 20% of milestones late | Milestone Plan | Re-plan, re-sequence or cut scope |
| Ownership gaps | Does someone own each piece? | Objectives or milestones with no accountable owner, or an owner changed twice | Any | RASCI and Milestone Plan | Name the owner before work continues |
| Missed reviews | Is the rhythm holding? | Weekly, monthly or quarterly reviews not held | Two weekly checks missed, or one quarterly | Review log | Reset the cadence or reduce its load |
| Capacity strain | Can the team carry the plan? | Actual hours against the objective estimates | More than 130% of estimate | Objectives, Success Metrics | Cut or defer an objective |
| **Risk** |  |  |  |  |  |
| Triggered failure modes | Are known failure signs showing up? | Detect indicators from the Failure Mode Register that have fired | Any rated risk 16 or above, or three of any rating | Failure Mode Register | Apply its response and log the decision |
| Stale decisions | Are open questions piling up? | Alignment exceptions or draft items unresolved | More than 30 days | Exceptions Register, Decision Log | Put the decision in front of the owner |

## 11. Risks to the product

**Purpose.** Name what could make Lite fail and how the build guards against it.

**Summary.** The main risks are drafts treated as decisions, a thin Intake Pack, lost data, and Claude being unavailable.

**Output and value.** Each risk with its early sign and the requirement that guards it.

| Risk | Early indicator | Mitigation |
| --- | --- | --- |
| A thin Intake Pack leads to a thin strategy | Blank ACES rows, no Strategy Statement, rows with no Why | Intake check CL-301; Ask Lite coaching CL-1404 |
| Drafts are treated as decisions | Many items confirmed in one go with no edits | CL-603, CL-610, one decision at a time NF-11, digest CL-618 |
| Records are lost | Save failed chip, no backup for 7 days | CL-1304, CL-1309, CL-1310 |
| The owner edits the file or a copy is opened outside Claude | Not connected chip | CLAUDE.md publishes the file unchanged; CL-1304 warns that changes will not be saved |
| Claude is unavailable or declined | Ask Lite hidden or rate limited | NF-19: every other feature works |
| A guest changes records | Guest edits in the log | Viewer default, owner-granted edit, guest-marked log CL-1409, CL-1411 |
| Lite pre-fills governance decisions that belong to Logbook | Exported rows with an ID, band or gate | CL-810, CL-817 Indicative columns |
| Risks or scores set by Lite, not the owner | Scores with no basis or Confirm | CL-906 |
| The release, SOP and Ask Lite instructions drift apart | Mismatch on Setup | CL-605, CL-1312 |
| Web research brings in wrong information or carries client data | Results with no source; client terms in queries | NF-15, CL-809, CL-1408 |
| ACES scores are treated as the decision | Top-ranked goal picked with no reading of reasons | Reasons beside every score; a non-top pick needs a reason CL-711 |

## 12. Decisions and open questions

**Purpose.** Record what is settled and what still needs Mark's decision, so the build does not stall or guess.

**Summary.** The architecture is decided. The open items are mostly content (templates, libraries, wording) and exchange formats with Logbook and AEGIS, which affect Phase 4 and later, not Phase 1.

**Output and value.** A short list to clear before each phase.

**Decided**

1. Lite builds the strategy, then manages it. It is a new product on Chart and Pilot capabilities, not a handoff to Pilot.
2. The owner runs Lite directly; a SpecNav facilitator supports by invitation (CL-1409).
3. Lite is one page per business, built and installed like Rhythm; set-up and backup live in the page (section 5).
4. The repository stays private, owned by SpecNav, and is shared by invitation for each install.
5. The Dashboard and views build on the Pilot Dashboard; Success Metrics is a light view; the Implementation Tracker and AI Governance Dashboard stay parked.
6. Inputs are the Intake Pack from Chart's discussion; the Strategy Statement is a required Chart output.
7. The default failure mode set is Chart's eight patterns plus AI use case stuck in pilot, under four categories.
8. Risk uses the AEGIS Master Categories and Scoring V1.0; ethics default to BATHERS.
9. SN- naming and SpecNav styling apply to exports.
10. The pilot user is Mark Heward for one month, from Phase 6.

**Open before Phase 1**

- Repository name.
- Whether the Keel four-way rule becomes the in-file check of release, SOP, Ask Lite instructions and changelog (CL-605), or Keel's Master Prompt Document and client SOP are also kept as separate files checked against it.

**Open before Phase 2 to 5**

- Intake Pack: confirm the ACES Analysis and Client Intake templates (the Client Intake file is named V2.4 but its cover says Version 2.3) and the Strategy Statement format Chart will produce.
- ACES scoring: confirm the 0 to 3 scale, weights, floor of 40, and whether Chart and Pilot carry the same ACES columns.
- MVV scoring: confirm the scale, best-score method, bands, and whether a Conflict caps the band; who may confirm an MVV change.
- BATHERS: the plain-language statement for each principle and its mapping to the ten AEGIS risk categories.
- Plan templates for the nine failure modes, the 8 week pilot review default, and whether links sit on objectives too.
- Placement of Chart's eight patterns in the four categories (voice or brand drift least certain) and their mapping to the AEGIS categories and the catalogue.
- Risk Management Policy settings Lite reads, and the questions for owners with no policy.
- The data readiness self-check questions (about ten).
- Starter libraries: first sectors, author and review cycle.
- Quick start minimum and the time-to-first-value target.
- KPI and KRI targets (set in the pilot); graduation criteria for the one-month pilot.
- Stakeholder list for the Stage 5 RASCI: whether the Intake Pack carries it or the People Register is enough.

**Open before Phase 7 and 8**

- Logbook's /intake sheet layout and the Indicative columns (CL-805, CL-817).
- Whether Lite drafts the Annex F value estimate or leaves it to Logbook (recommended: leave it).
- Gate names (AEGIS Master workbook AG1 Strategic Fit to AG7, or Logbook AG1 Use Case Approval to AG7) and tool risk dimensions (five or six) in the master file.
- How Lite words a proposer who is also the approver in a small business.
- Assurance pack wording that avoids implying certification, and whether it may be shared outside the business.
- Benchmarks: a SpecNav decision on anonymous numbers-only sharing and who governs the aggregate.
- Connectors: which accounting, CRM and spreadsheet tools come first.
- Research sessions: the scheduled task set-up per install, website reading limits, and how searches stay free of client data.
- Facilitator access levels offered by the owner's plan, and whether live presence is wanted.

## Appendix A. Data model

Each register is a collection; each record is a document keyed by its ID. Every record carries: id, confirmation (Draft or Confirmed), lifecycle where it has one (section 6.2), source, created_at, created_by, updated_at, updated_by, confirmed_by and confirmed_at. People are stored by their People Register ID and viewers by their user id, never by name. A record is limited to 256 KB.

| Collection | Key fields | IDs |
| --- | --- | --- |
| meta | settings (business name, owner name, functions list, review cadence, data ceiling, permissions, brand), set-up steps with Set, Skipped, Not applicable or Arrives in phase, schema version, release that last wrote, last backup date and backup-due date, pilot approval | fixed ids: settings, setup, schema |
| people | name, job title, function, roles | PER-01 |
| access | guest email or user id, level the owner recorded, from, to | ACC-01 |
| uploads | kind (ACES, Client Intake, Strategy Statement, Risk Policy, Brand Charter, Brand Guide, Logo), file id, file name, size, date, text file id, summary, original kept (yes or no) | U-001 |
| strategy | four parts (who you serve, problem you solve, what sets you apart, trade-offs you accept), themes, version | S-1 |
| mvv | kind (Mission, Vision, Value), text, meaning, score per part with reason, conflict flag | M-01 |
| ethics | principle, statement, linked value, owner, BATHERS mapping, on or off, default or own | E-01 |
| aces_rows | quadrant (Achieve, Conserve, Eliminate, Start), what, why, how, weight, ACES version | A-01 |
| goals | title, from, to, by, unit, lead and lag measures, owner, ACES scores with reasons, MVV links, ranking criteria, forecast, result, lessons | WIG-01 |
| objectives | goal id, title, Accountable, Responsible, date, measures, hours estimated and actual | OBJ-01.1 |
| backlog | title, draft from-to-by, ACES score, rank, source, move reason | B-001 |
| use_cases | the 12 P1 Use Case Proposal fields, goal or objective id, owner, data level, indicative inputs with basis, pilot review date, scale decision with date and reason | UC-01 (local; AEGIS assigns UC-YYYY-NNN) |
| milestones | goal or objective, phase (Float, Move, Sustain), date, dependencies, resource, RASCI, KPI, KRI, threshold, trigger action | MS-01 |
| gates | stage, checklist items with Passed, Failed or Waived, digest reviewed, decided by, date | G-3 |
| risks | the CL-905 fields | R-01 |
| failure_modes | name, catalogue ids, primary and secondary category, detect indicator, response, owner, status, source | local FM ids |
| fm_links | target type and id, mode, owner, detect plan (indicator, trigger, source, frequency, checker), mitigation (prevent now, if triggered, due) | FL-001 |
| kpis_kris | measure, kind (KPI or KRI), threshold, source record, frequency | K-01 |
| measures | measure, unit, refresh period, provenance | MX-01 |
| readings | measure id, value, date, source | RD-0001 |
| commitments | person, objective, week, text, result | C-0001 |
| reviews | type, date, findings | RV-001 |
| perf_log | review id, KPI scores, Ask Lite call count | PL-001 |
| exceptions | text, evidence, options, owner, decision | X-01 |
| assumptions | text, owner, review date, held or failed | AS-01 |
| decisions | what, options, choice, reason, who, when, guest flag, linked records | D-0001 |
| changelog | record changed, field, old and new value, who, when, guest flag | CH-00001 |
| ai_proposals | kind (explain, coach, draft), target, text, owner response | AI-0001 |
| research_requests and research_log (P8) | topic, query terms, sources with dates, status, results as suggestions | RQ-001 |
| data/users/{id}/notes | private notes and drafts | per person |

## Appendix B. Retired or changed from 0.5

| Item | Was | Now |
| --- | --- | --- |
| CL-614 | Workbook and register version pairing | There is one database, so there is nothing to pair. Saved-data compatibility is CL-1308. |
| CL-615 | Hand back the updated workbook and registers | Records live in the page. Files are produced only as exports (CL-607). |
| Section 7 folder layout and sub-agents | compass-lite/ folder tree, seven sub-agents and /compass-* commands | Replaced by the single-page build (section 5). Drafting is Ask Lite (section 7.12); research is a Claude Code session (CL-1408). |
| Open question 6, deployment | One Claude Code project folder per business | Replaced: one installed page per business (CL-1313). |
| Open question 7, storage | Lite folder in the owner's own cloud storage | Replaced: records in the page's own database; the owner keeps the backup file in their own cloud storage (CL-1309). |

Rewritten for the page, with the same ID: CL-301, CL-605, CL-606, CL-607, CL-608, CL-610, CL-613, CL-616, CL-620, CL-621, CL-623, CL-708, CL-801, CL-802, CL-807, CL-815, CL-901, CL-902, CL-909, CL-1002, CL-1121, CL-1305, CL-1406, CL-1409, CL-1412, CL-601, CL-711, CL-903, and NF-04, NF-07, NF-08, NF-09, NF-11, NF-12. Added: CL-626 (how drafting works before Ask Lite), NF-14 tightened, NF-16 to NF-20.

## Appendix C. Starting the build in Claude Code

1. Create the private repository (name to confirm) and add this specification as SPEC.md, plus the demo HTML as reference/demo.html.
2. Open the repository in Claude Code and send:

> Build Compass Lite Phase 1 (P1 Foundation) from SPEC.md. Follow the Rhythm Planner pattern: one self-contained file, compass-lite.html, plus capabilities.json, INSTALL.md, CLAUDE.md, CHANGELOG.md, RELEASING.md, tools/release_check.py and tests/p1.spec.js. Use reference/demo.html for the tab layout, labels and styling only; do not copy its sample data, and ship no seed data other than labelled templates. Build only the requirements marked P1, test each with Playwright, run the release check, and tell me what passed and what is not done.

3. After each phase passes its gate, install or update the page by the INSTALL.md message, check it on a test business, then ask for the next phase.
