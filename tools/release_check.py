"""Release check (CL-605, CL-1312). Run before every release:

    python3 tools/release_check.py [path/to/compass-lite.html]

It refuses a release (exit code 1) when:
  - the release record in compass-lite.html, the in-page SOP, the Ask Lite
    instruction block, the release notes, the newest CHANGELOG.md entry and the
    README version line do not all state the same version; or
  - the SOP has a gap. The capability register (const CAPABILITIES in
    compass-lite.html, plus the Set-up steps and tools that are live in this
    phase) is the list of what the page can do. A gap is a capability the SOP
    does not describe (no element with data-cap="<id>"), a description whose
    data-sop-reviewed is older than the capability's `changed` release, or a
    step still marked data-arrives="<n>" when Phase n is running.

The page runs the same comparison and shows any gap on the Policy and SOP,
Set-up, the Dashboard, the footer and the Guide panel.
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, 'compass-lite.html')


def read(name):
    with open(os.path.join(ROOT, name), encoding='utf-8') as f:
        return f.read()


def semver(v):
    parts = [int(x) for x in (v or '0').split('.')[:3]]
    return tuple(parts + [0] * (3 - len(parts)))


def block(s, start, end):
    i = s.index(start)
    return s[i:s.index(end, i)]


def capabilities(s, phase):
    """The register, plus live Set-up steps and tools, exactly as requiredCapabilities() builds it in the page."""
    caps = []
    reg = block(s, 'const CAPABILITIES = [', '];')
    for m in re.finditer(r"\{ id: '([^']+)', name: '([^']+)', changed: '([^']+)', marker: (?:'([^']*)'|\"([^\"]*)\") \}", reg):
        caps.append(dict(id=m.group(1), name=m.group(2), changed=m.group(3), marker=m.group(4) if m.group(4) is not None else m.group(5)))
    for m in re.finditer(r"\{ key: '([^']+)', title: '([^']+)',.*?phase: (\d)", block(s, 'const STEPS = [', '];')):
        if int(m.group(3)) <= phase:
            caps.append(dict(id='step-' + m.group(1), name='Set-up step: ' + m.group(2), changed='0.1.0', marker=None))
    for m in re.finditer(r"\['([a-z0-9]+)', '([^']+)'(?:, (\d))?", block(s, 'const TOOLS = {', '};')):
        if not m.group(3) or int(m.group(3)) <= phase:
            caps.append(dict(id='tool-' + m.group(1), name='Tool: ' + m.group(2), changed='0.1.0', marker=None))
    return caps


def main():
    app = sys.argv[1] if len(sys.argv) > 1 else APP
    with open(app, encoding='utf-8') as f:
        s = f.read()
    problems = []

    m = re.search(r"const APP_RELEASE = \{\s*version: '([^']+)',\s*date: '[^']+',\s*phase: (\d)", s)
    release, phase = (m.group(1), int(m.group(2))) if m else (None, 0)
    if not release:
        problems.append('no APP_RELEASE version and phase found')
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
    m = re.search(r"notes: \[\s*\{ version: '([^']+)'", s)
    notes_v = m.group(1) if m else None

    for k, v in {'SOP': sop_v, 'Ask Lite instructions': ask_v, 'release notes': notes_v, 'CHANGELOG.md': log_v, 'README.md': readme_v}.items():
        if v != release:
            problems.append('%s states v%s but the release is v%s' % (k, v, release))

    # Where the SOP describes each capability, and for which release.
    where = {}
    for m in re.finditer(r'<[a-z0-9]+\b[^>]*\bdata-cap="([^"]+)"[^>]*>', sop):
        rv = re.search(r'data-sop-reviewed="([^"]+)"', m.group(0))
        for cid in m.group(1).split():
            where.setdefault(cid, []).append(rv.group(1) if rv else '0')

    caps = capabilities(s, phase)
    gaps = []
    for c in caps:
        if c['marker'] and c['marker'] not in s.replace(block(s, 'const CAPABILITIES = [', '];'), ''):
            problems.append('capability %s: marker %r is not in the code (update CAPABILITIES)' % (c['id'], c['marker']))
        if c['id'] not in where:
            gaps.append('%s (%s) is not described' % (c['name'], c['id']))
        elif max(semver(r) for r in where[c['id']]) < semver(c['changed']):
            gaps.append('%s (%s) changed in v%s, but the SOP was last reviewed for v%s'
                        % (c['name'], c['id'], c['changed'], max(where[c['id']], key=semver)))
    stale = [int(n) for n in re.findall(r'data-arrives="(\d)"', sop) if int(n) <= phase]
    for n in stale:
        gaps.append('the SOP still marks something "Arrives in P%d", but this release is Phase %d' % (n, phase))
    known = {c['id'] for c in caps} | {'step-' + k for k in re.findall(r"\{ key: '([^']+)'", block(s, 'const STEPS = [', '];'))}
    unknown = sorted(set(where) - known)
    if unknown:
        problems.append('SOP data-cap ids not in the register: ' + ', '.join(unknown))
    problems += ['SOP gap: ' + g for g in gaps]

    described = len(caps) - (len(gaps) - len(stale))
    print('compass-lite.html  release v%s (P%d) | SOP v%s | Ask Lite v%s | CHANGELOG v%s | README v%s | capabilities %d/%d described'
          % (release, phase, sop_v, ask_v, log_v, readme_v, described, len(caps)))
    if problems:
        print('NOT ALIGNED')
        for p in problems:
            print('  - ' + p)
        return 1
    print('ALIGNED')
    return 0


if __name__ == '__main__':
    sys.exit(main())
