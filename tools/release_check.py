"""Release check (CL-605, CL-1312). Run before every release:

    python3 tools/release_check.py

It refuses a release (exit code 1) when the release record in compass-lite.html,
the in-page SOP, the Ask Lite instruction block, the newest CHANGELOG.md entry
and the README version line do not all state the same version, or when a feature
in FEATURES is present in the code but not covered by the SOP.
When you add a feature, add a line for it to FEATURES."""
import html
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, 'compass-lite.html')

FEATURES = [  # (name, marker in code, phrase the SOP must contain)
    ('Status chip', 'function setChip', 'status chip'),
    ('Not connected', "connState = 'none'", 'Not connected'),
    ('First-run screen', 'id="first-run"', 'Welcome to Compass Lite'),
    ('Set-up steps', 'const STEPS', 'Set-up steps'),
    ('Risk Management Policy', "key: 'policy'", 'Risk Management Policy'),
    ('Uploads', 'async function ingestFile', 'Uploads'),
    ('People Register', 'id="people-register"', 'People Register'),
    ('Required roles', 'required_roles', 'Executive Sponsor'),
    ('Removal blocked', 'function removalBlockers', 'cannot be removed'),
    ('Who owns what', 'function whoOwnsWhat', 'Who owns what'),
    ('Ownership checks', 'function ownershipFlags', 'ownership checks'),
    ('Backup', 'async function makeBackup', 'Download backup'),
    ('Backup due', 'function backupDue', 'overdue'),
    ('Restore', 'async function restoreBackup', 'Restore'),
    ('Database self-test', 'async function runSelfTest', 'database self-test'),
    ('Data health check', 'async function collectHealthIssues', 'data health check'),
    ('Guide panel', 'function guidePanel', 'Guide panel'),
    ('Proposal labels', 'const PROPOSAL_LABELS', 'POTENTIAL CHALLENGE'),
    ('Contradictions', "label: 'CONFLICT'", 'Contradictions'),
    ('Decision Log', 'function logDecision', 'Decision Log'),
    ('Change log', 'id="change-log"', 'Change log'),
    ('Assumptions log', 'id="assumptions"', 'assumptions, constraints and challenges'),
    ('Dashboard', 'function viewDashboard', 'Dashboard'),
    ('Pilot badge', 'pilot_approval', 'Pilot badge'),
    ('Templates', 'const TEMPLATES', 'Template'),
    ('Versions', 'function versionStatus', 'Versions and this SOP'),
    ('Saved-data compatibility', 'const SCHEMA_VERSION', 'schema version'),
]


def read(name):
    with open(os.path.join(ROOT, name), encoding='utf-8') as f:
        return f.read()


def main():
    s = read('compass-lite.html')
    problems = []

    m = re.search(r"const APP_RELEASE = \{\s*version: '([^']+)'", s)
    release = m.group(1) if m else None
    if not release:
        problems.append('no APP_RELEASE version found in compass-lite.html')
    if len(re.findall(r"version: '\d", s.split('notes:')[0])) != 1:
        problems.append('the version must live in one place (APP_RELEASE.version)')

    m = re.search(r'<template id="sop-template" data-sop-version="([^"]+)">(.*?)</template>', s, re.S)
    sop_v, sop = (m.group(1), m.group(2)) if m else (None, '')
    m = re.search(r'id="ask-lite-instructions" data-release="([^"]+)"', s)
    ask_v = m.group(1) if m else None
    m = re.search(r'^## v(\S+)', read('CHANGELOG.md'), re.M)
    log_v = m.group(1) if m else None
    m = re.search(r'Current: \*\*v([^*]+)\*\*', read('README.md'))
    readme_v = m.group(1) if m else None
    notes_v = re.search(r"notes: \[\s*\{ version: '([^']+)'", s)
    notes_v = notes_v.group(1) if notes_v else None

    versions = {'release': release, 'SOP': sop_v, 'Ask Lite instructions': ask_v, 'CHANGELOG.md': log_v, 'README.md': readme_v, 'release notes': notes_v}
    for k, v in versions.items():
        if v != release:
            problems.append('%s states v%s but the release is v%s' % (k, v, release))

    text = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', sop))).lower()
    present = [f for f in FEATURES if f[1] in s]
    missing = [f[0] for f in present if f[2].lower() not in text]
    absent = [f[0] for f in FEATURES if f[1] not in s]
    if missing:
        problems.append('features not covered by the SOP: ' + ', '.join(missing))
    if absent:
        problems.append('FEATURES markers not found in the code (update the list): ' + ', '.join(absent))

    print('compass-lite.html  release v%s | SOP v%s | Ask Lite v%s | CHANGELOG v%s | README v%s | features %d/%d described'
          % (release, sop_v, ask_v, log_v, readme_v, len(present) - len(missing), len(present)))
    if problems:
        print('NOT ALIGNED')
        for p in problems:
            print('  - ' + p)
        return 1
    print('ALIGNED')
    return 0


if __name__ == '__main__':
    sys.exit(main())
