// Guided build (v0.2.0): building the strategy from scratch with no Intake Pack, and the Dashboard flow.
// Requirement IDs refer to SPEC.md.
const { test, expect, firstRun, goOrg, addPerson, settled, stubState } = require('./helpers');

const flowNode = (page, id) => page.locator(`#flow [data-flow="${id}"]`);
async function openTool(page, id) { await page.getByRole('tab', { name: 'Dashboard' }).click(); await flowNode(page, id).click(); }

async function addAces(page, quadrant, what, why, weight, confirm = true) {
  const card = page.locator(`[data-quadrant="${quadrant}"]`);
  const det = card.locator('details');
  if (!(await det.getAttribute('open') !== null)) await det.locator('summary').click();
  await det.getByLabel('What', { exact: true }).fill(what);
  await det.getByLabel('Why it matters').fill(why);
  await det.getByLabel('How much it matters').selectOption(String(weight));
  await det.getByRole('button', { name: confirm ? 'Confirm' : 'Save as draft' }).click();
  await expect(card.locator('[data-aces]', { hasText: what })).toBeVisible();
}
async function writeStrategy(page) {
  await openTool(page, 'strategy');
  await page.getByLabel('Who you serve').fill('Homeowners in the county');
  await page.getByLabel('The problem you solve').fill('Slow quotes and jobs that go quiet');
  await page.getByLabel('What sets you apart').fill('We answer fast and follow up every job');
  await page.getByLabel('The trade-offs you accept').fill('Simple tools over advanced ones');
  await page.getByRole('button', { name: 'Build a draft sentence from the four parts' }).click();
  await expect(page.getByLabel('Strategy Statement', { exact: true })).toHaveValue(/We serve homeowners in the county\./);
}

test.describe('Build your strategy flow on the Dashboard', () => {
  test('the flow shows the recommended order, marks the next step, and every step opens at any time', async ({ open, page }) => {
    await open(); await firstRun(page);
    await page.getByRole('tab', { name: 'Dashboard' }).click();
    await expect(page.locator('#flow .fnode b')).toHaveText(['ACES Analysis', 'Strategy Statement', 'Mission, Vision and Values', 'WIGs and Objectives', 'Roadmap', 'Reviews']);
    await expect(flowNode(page, 'aces')).toHaveClass(/next/);
    await expect(flowNode(page, 'aces')).toContainText('Recommended next');
    // No gating: open the last step first.
    await flowNode(page, 'goals').click();
    await expect(page.locator('#view-goals')).toBeVisible();
    await expect(page.locator('#view-goals .flowbar')).toContainText('Step 4 of 4');
    await page.locator('#view-goals').getByText('Add a WIG').click();
    await page.locator('#wig-new').getByLabel('Goal', { exact: true }).fill('Repeat clients');
    await page.locator('#wig-new').getByRole('button', { name: 'Save as draft' }).click();
    await expect(page.locator('[data-goal="WIG-01"]')).toContainText('Repeat clients');
    // The flow bar walks the order both ways.
    await page.locator('#view-goals .flowbar').getByRole('button', { name: /Mission, Vision and Values/ }).click();
    await expect(page.locator('#view-mvv')).toBeVisible();
    // Later steps open their tools too.
    await openTool(page, 'timeline');
    await expect(page.locator('#view-timeline')).toContainText('Arrives in P5');
    // The Guide panel carries the recommended next step as a SUGGESTION you can park.
    await openTool(page, 'strategy');
    await expect(page.locator('#guide')).toContainText('Recommended next: ACES Analysis');
  });

  test('the Intake Pack is no longer needed: set-up steps 4 and 10 are done in the app', async ({ open, page }) => {
    await open(); await firstRun(page);
    await expect(page.locator('#step-intake')).toHaveAttribute('data-status', 'Not started');
    await expect(page.locator('#step-mvv')).toHaveAttribute('data-status', 'Not started');
    await page.locator('#step-intake').getByRole('button', { name: 'Set it now' }).click();
    await page.locator('#step-intake').getByRole('button', { name: 'Open ACES Analysis' }).click();
    await addAces(page, 'Achieve', 'Same-day quotes', 'Quotes are lost while customers wait', 3);
    await writeStrategy(page);
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.locator('#view-strategy')).toContainText('Confirmed');
    await page.getByRole('tab', { name: 'Set-up' }).click();
    await page.locator('.subnav').getByRole('button', { name: 'Set-up', exact: true }).click();
    await expect(page.locator('#step-intake')).toHaveAttribute('data-status', 'Set');
  });
});

test.describe('Step 1: ACES Analysis', () => {
  test('rows are saved as draft or confirmed, need a reason to confirm, and move the flow on (CL-409, CL-617)', async ({ open, page }) => {
    await open(); await firstRun(page);
    await openTool(page, 'aces');
    await expect(page.locator('[data-quadrant]')).toHaveCount(4);
    const det = page.locator('[data-quadrant="Eliminate"] details');
    await det.locator('summary').click();
    await det.getByLabel('What', { exact: true }).fill('Typing job notes twice');
    await det.getByRole('button', { name: 'Confirm' }).click();
    await expect(det).toContainText('Add why it matters to confirm the row');
    await det.getByRole('button', { name: 'Save as draft' }).click();
    const row = page.locator('[data-aces="A-01"]');
    await expect(row).toContainText('Draft');
    await expect(page.locator('#guide')).toContainText('1 draft in ACES Analysis waiting for your confirmation');
    await row.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.locator('[data-quadrant="Eliminate"]')).toContainText('Add why it matters to confirm');
    const editForm = page.locator('[data-quadrant="Eliminate"] .card', { has: page.locator('[data-draft="f:aces-A-01:why"]') });
    await editForm.getByLabel('Why it matters').fill('Two hours a week lost');
    await editForm.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.locator('[data-aces="A-01"]')).toContainText('Confirmed');
    await page.getByRole('tab', { name: 'Dashboard' }).click();
    await expect(flowNode(page, 'aces')).toHaveClass(/done/);
    await expect(flowNode(page, 'strategy')).toHaveClass(/next/);
    await settled(page);
    const st = await stubState(page);
    expect(st.docs['aces_rows/A-01']).toMatchObject({ quadrant: 'Eliminate', weight: 2, confirmation: 'Confirmed', source: 'Entered' });
  });

  test('removing a row uses a decision box on the page and is logged', async ({ open, page }) => {
    await open(); await firstRun(page);
    await openTool(page, 'aces');
    await addAces(page, 'Start', 'Weekly scoreboard', 'So drift shows in days', 2);
    await page.getByRole('button', { name: 'Remove A-01' }).click();
    await expect(page.locator('#ask-box')).toContainText('Remove ACES row A-01');
    await page.locator('#ask-box').getByRole('button', { name: 'No, keep it' }).click();
    await expect(page.locator('[data-aces="A-01"]')).toBeVisible();
    await page.getByRole('button', { name: 'Remove A-01' }).click();
    await page.locator('#ask-box').getByRole('button', { name: 'Yes, remove it' }).click();
    await expect(page.locator('[data-aces="A-01"]')).toHaveCount(0);
    await page.getByRole('tab', { name: 'Reviews' }).click();
    await expect(page.locator('#change-log')).toContainText('ACES row A-01 removed');
  });
});

test.describe('Step 2: Strategy Statement', () => {
  test('the four parts, a suggested sentence, evidence, and confirm rules (CL-302, CL-602)', async ({ open, page }) => {
    await open(); await firstRun(page);
    await openTool(page, 'aces');
    await addAces(page, 'Achieve', 'Same-day quotes', 'Quotes are lost while customers wait', 3);
    await openTool(page, 'strategy');
    await page.getByLabel('Who you serve').fill('Homeowners');
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.locator('#view-strategy')).toContainText('To confirm, write The problem you solve');
    await writeStrategy(page);
    await expect(page.locator('#view-strategy')).toContainText('SUGGESTION');
    await page.getByLabel('Same-day quotes').check();
    await page.getByLabel('Growth').fill('More repeat work');
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.locator('#view-strategy .statement')).toContainText('We serve homeowners in the county.');
    await settled(page);
    const s = (await stubState(page)).docs['strategy/S-1'];
    expect(s).toMatchObject({ confirmation: 'Confirmed', who: 'Homeowners in the county', evidence: ['A-01'], themes: { Growth: 'More repeat work' }, version: 1 });
  });
});

test.describe('Step 3: Mission, Vision and Values', () => {
  test('items are typed by the owner, scored against the four parts, and the score follows the rule (CL-1001, CL-1003)', async ({ open, page }) => {
    await open(); await firstRun(page);
    await writeStrategy(page);
    await page.getByRole('button', { name: 'Confirm' }).click();
    await openTool(page, 'mvv');
    await page.locator('[data-kind="Mission"]').getByLabel('Mission').fill('Keep local homes dry, warm and safe');
    await page.locator('[data-kind="Mission"]').getByRole('button', { name: 'Confirm' }).click();
    await page.locator('[data-kind="Vision"]').getByLabel('Vision').fill('The firm every family calls first');
    await page.locator('[data-kind="Vision"]').getByRole('button', { name: 'Confirm' }).click();
    const vals = page.locator('[data-kind="Value"]');
    await vals.locator('summary').click();
    await vals.getByLabel('Value', { exact: true }).fill('Craftsmanship');
    await vals.getByLabel('What it means, in one line').fill('We take the time to do the job right');
    await vals.getByRole('button', { name: 'Confirm' }).click();
    await expect(vals).toContainText('Value: Craftsmanship');
    await expect(page.locator('#step-mvv')).toHaveCount(0);
    // Score: Mission best 3, Vision best 2, Value best 1 with a Conflict → (3+2+1)/(3×3) = 67, Partial.
    const score = async (id, s, reasons) => {
      const d = page.locator(`[data-mvv-score="${id}"]`);
      if ((await d.getAttribute('open')) === null) await d.locator('summary').click();
      for (let j = 0; j < 4; j++) {
        await d.getByLabel(['Score against Who you serve', 'Score against The problem you solve', 'Score against What sets you apart', 'Score against The trade-offs you accept'][j]).selectOption(String(s[j]));
        if (reasons[j]) await d.getByLabel('Reason').nth(j).fill(reasons[j]);
      }
      await d.getByRole('button', { name: 'Confirm scores' }).click();
    };
    await score('M-01', [3, 1, 0, 0], ['Names the homes we serve', 'Safe homes ease the problem']);
    await score('M-02', [2, 0, 0, 0], ['Families are the customers']);
    await score('M-03', [1, 0, -1, 0], ['Care helps every customer', '', 'Taking time can slow the fast answer we promise']);
    await expect(page.locator('#mvv-total')).toHaveText('67');
    await expect(page.locator('#mvv-score')).toContainText('Partial');
    await expect(page.locator('#guide')).toContainText('CONFLICT');
    await expect(page.locator('#guide')).toContainText('conflicts with "What sets you apart"');
    await page.getByRole('tab', { name: 'Set-up' }).click();
    await page.locator('.subnav').getByRole('button', { name: 'Set-up', exact: true }).click();
    await expect(page.locator('#step-mvv')).toHaveAttribute('data-status', 'Set');
  });
});

test.describe('Step 4: WIGs and Objectives', () => {
  test('ACES Alignment Score follows the rule, the SMART check reports each criterion, and confirm needs an owner (CL-402, CL-409)', async ({ open, page }) => {
    await open(); await firstRun(page);
    await openTool(page, 'aces');
    await addAces(page, 'Achieve', 'Same-day quotes', 'Lost work', 3);
    await addAces(page, 'Achieve', 'More contracts', 'Steady income', 3);
    await addAces(page, 'Eliminate', 'Forgotten follow-ups', 'Repeat work lost', 2);
    await addAces(page, 'Start', 'Weekly scoreboard', 'Drift shows early', 1);
    await openTool(page, 'goals');
    const f = page.locator('#wig-new');
    await f.locator('summary').click();
    await f.getByLabel('Goal', { exact: true }).fill('Quote turnaround');
    await f.getByLabel('From (now)').fill('4');
    await f.getByLabel('To (target)').fill('2');
    await f.getByLabel('Unit').fill('days');
    await f.getByLabel('By when').fill('2027-03-31');
    await f.getByLabel('Theme').selectOption('Efficiency');
    await f.getByLabel('Score against A-01').selectOption('3');
    await f.getByLabel('Reason for A-01').fill('Moves the same-day quote rate');
    await f.getByLabel('Score against A-03').selectOption('1');
    await f.getByLabel('Reason for A-03').fill('Faster quotes leave time for follow-ups');
    await f.getByRole('button', { name: 'Confirm' }).click();
    await expect(f).toContainText('To confirm, add an owner');
    await f.getByLabel('WIG owner').selectOption({ label: 'Olive Owner' });
    await f.getByRole('button', { name: 'Confirm' }).click();
    const card = page.locator('[data-goal="WIG-01"]');
    // (3×3 + 1×2) ÷ (3 × (3+3+2)) × 100 = 11/24 = 46.
    await expect(card).toContainText('ACES 46');
    await expect(card).toContainText('From 4 days to 2 days');
    for (const k of ['Specific passed', 'Measurable passed', 'Achievable passed', 'Relevant passed', 'Time-bound passed']) await expect(card.locator('.smart')).toContainText(k);
    // A High-weight row with no WIG at 2 or more is raised.
    await expect(page.locator('#guide')).toContainText('High-weight ACES row A-02 "More contracts" is not served by any WIG');
    // The WIG owner appears in Who owns what.
    await goOrg(page);
    await expect(page.locator('#who-owns-what tr', { hasText: 'Olive Owner' })).toContainText('WIG-01');
  });

  test('objectives need one Accountable owner, a date and a measure; a WIG completes only when they are closed (CL-405, CL-709)', async ({ open, page }) => {
    await open(); await firstRun(page);
    await goOrg(page); await addPerson(page, 'Priya Planner');
    await openTool(page, 'goals');
    const f = page.locator('#wig-new');
    await f.locator('summary').click();
    await f.getByLabel('Goal', { exact: true }).fill('Repeat clients');
    for (const [l, v] of [['From (now)', '12'], ['To (target)', '20'], ['By when', '2027-12-31']]) await f.getByLabel(l).fill(v);
    await f.getByLabel('WIG owner').selectOption({ label: 'Olive Owner' });
    await f.getByRole('button', { name: 'Confirm' }).click();
    const card = page.locator('[data-goal="WIG-01"]');
    await expect(page.locator('#guide')).toContainText('WIG-01 has no objectives yet');
    const od = card.locator('details');
    await od.locator('summary').click();
    await od.getByLabel('Objective', { exact: true }).fill('Follow-up call after every job');
    await od.getByRole('button', { name: 'Confirm' }).click();
    await expect(od).toContainText('To confirm, add one Accountable person, a due date, a lead or lag measure');
    await od.getByLabel('Accountable (one person)').selectOption({ label: 'Priya Planner' });
    await od.getByLabel('Due date').fill('2026-12-15');
    await od.getByLabel('Lead measure').fill('Calls logged within 2 days');
    await od.getByRole('button', { name: 'Confirm' }).click();
    const ob = card.locator('[data-objective="OBJ-01.1"]');
    await expect(ob).toContainText('Accountable: Priya Planner');
    await card.getByRole('button', { name: 'Complete WIG' }).click();
    await expect(card).toContainText('Cannot complete yet. 1 objective is still open: OBJ-01.1');
    await ob.getByRole('button', { name: 'Complete' }).click();
    await expect(ob).toContainText('Completed');
    await card.getByRole('button', { name: 'Complete WIG' }).click();
    await page.locator('#complete-panel').getByRole('button', { name: 'Complete the WIG' }).click();
    await expect(page.locator('#complete-panel')).toContainText('Record the final result and the lessons learned');
    await page.locator('#complete-panel').getByLabel(/Final result/).fill('21');
    await page.locator('#complete-panel').getByLabel('Lessons learned').fill('The follow-up call did most of the work');
    await page.locator('#complete-panel').getByRole('button', { name: 'Complete the WIG' }).click();
    await expect(page.locator('[data-goal="WIG-01"]')).toHaveCount(0);
    await expect(page.locator('#view-goals')).toContainText('Result 21');
    await expect(page.locator('#view-goals')).toContainText('0 of 4 slots used');
    // Priya cannot be removed while she owns the objective (CL-1206 reaches the new registers).
    await goOrg(page);
    await page.locator('tr', { hasText: 'Priya Planner' }).getByRole('button', { name: 'Remove', exact: true }).click();
    await expect(page.locator('#remove-panel')).toContainText('OBJ-01.1');
  });

  test('at most four active WIGs; cancelling one needs a reason and frees the slot', async ({ open, page }) => {
    const t = new Date().toISOString();
    const seed = { 'meta/settings': { id: 'settings', business_name: 'B', owner_name: 'O', installed_at: t }, 'meta/setup': { id: 'setup', first_run_done: true, steps: {} }, 'people/PER-01': { id: 'PER-01', name: 'Olive Owner', roles: ['Executive Sponsor', 'AI Governance Lead'] } };
    for (let i = 1; i <= 4; i++) seed['goals/WIG-0' + i] = { id: 'WIG-0' + i, title: 'Goal ' + i, from: '1', to: '2', by: '2027-01-01', owner: 'PER-01', lifecycle: 'Active', confirmation: 'Confirmed', aces: {} };
    await open({ seed });
    await openTool(page, 'goals');
    await expect(page.locator('#view-goals')).toContainText('4 of 4 slots used');
    await expect(page.locator('#wig-new')).toHaveCount(0);
    await expect(page.locator('#view-goals')).toContainText('All four WIG slots are in use');
    await page.locator('[data-goal="WIG-02"]').getByRole('button', { name: 'Cancel WIG' }).click();
    await page.locator('#ask-box').getByRole('button', { name: 'Yes, cancel the WIG' }).click();
    await expect(page.locator('#ask-box')).toContainText('Give a short reason first');
    await page.locator('#ask-box').getByLabel('Reason').fill('Merged into WIG-01');
    await page.locator('#ask-box').getByRole('button', { name: 'Yes, cancel the WIG' }).click();
    await expect(page.locator('#view-goals')).toContainText('3 of 4 slots used');
    await expect(page.locator('#wig-new')).toBeVisible();
    await page.getByRole('tab', { name: 'Reviews' }).click();
    await expect(page.locator('#decision-log')).toContainText('Merged into WIG-01');
  });

  test('when every step is done the flow shows them all Done and nothing is recommended', async ({ open, page }) => {
    const t = new Date().toISOString();
    const C = { confirmation: 'Confirmed', confirmed_at: t };
    const seed = { 'meta/settings': { id: 'settings', business_name: 'B', owner_name: 'O', installed_at: t }, 'meta/setup': { id: 'setup', first_run_done: true, steps: {} }, 'people/PER-01': { id: 'PER-01', name: 'Olive Owner', roles: [] },
      'aces_rows/A-01': { id: 'A-01', quadrant: 'Achieve', what: 'X', why: 'Y', weight: 3, ...C },
      'strategy/S-1': { id: 'S-1', who: 'a', problem: 'b', apart: 'c', tradeoffs: 'd', statement: 'e', ...C },
      'mvv/M-01': { id: 'M-01', kind: 'Mission', text: 'm', ...C }, 'mvv/M-02': { id: 'M-02', kind: 'Vision', text: 'v', ...C }, 'mvv/M-03': { id: 'M-03', kind: 'Value', text: 'Honest', meaning: 'h', ...C },
      'goals/WIG-01': { id: 'WIG-01', title: 'Goal', from: '1', to: '2', by: '2027-01-01', owner: 'PER-01', lifecycle: 'Active', aces: { 'A-01': { score: 3, reason: 'r' } }, ...C },
      'objectives/OBJ-01.1': { id: 'OBJ-01.1', goal_id: 'WIG-01', title: 'o', accountable: 'PER-01', date: '2026-12-01', lead: 'l', lifecycle: 'Open', ...C } };
    await open({ seed });
    for (const id of ['aces', 'strategy', 'mvv', 'goals']) await expect(flowNode(page, id)).toHaveClass(/done/);
    await expect(page.locator('#flow')).not.toContainText('Recommended next');
    await expect(page.locator('#dash-goals')).toContainText('WIG-01 Goal');
    await expect(page.locator('#dash-goals')).toContainText('ACES 100');
  });
});

test.describe('Guided build: accessibility and small screens (NF-17, NF-18)', () => {
  test('the flow and the four tools pass WCAG 2.2 AA and do not scroll sideways', async ({ open, page }) => {
    const { AxeBuilder } = require('@axe-core/playwright');
    await open(); await firstRun(page);
    await openTool(page, 'aces');
    await addAces(page, 'Achieve', 'Same-day quotes', 'Lost work', 3, false);
    for (const id of ['dashboard', 'aces', 'strategy', 'mvv', 'goals']) {
      if (id === 'dashboard') await page.getByRole('tab', { name: 'Dashboard' }).click(); else await openTool(page, id);
      const closed = page.locator('#view details:not([open]) > summary');
      for (let i = 0; i < 30 && await closed.count(); i++) await closed.first().click();
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(r.violations.map(v => id + ' ' + v.id + ': ' + v.nodes.map(n => n.target).join(' '))).toEqual([]);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(over, id).toBeLessThanOrEqual(0);
    }
  });
});
