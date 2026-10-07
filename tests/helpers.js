// Shared fixtures for the release tests.
const path = require('path');
const fs = require('fs');
const base = require('@playwright/test');

const ROOT = path.join(__dirname, '..');
const STUB = path.join(__dirname, 'claude-stub.js');

// The page loads its readers from the CDN at pinned versions. The tests serve the same
// pinned versions from node_modules, so they run offline.
const CDN = {
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js': 'node_modules/xlsx/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js': 'node_modules/mammoth/mammoth.browser.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js': 'node_modules/pdfjs-dist/build/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js': 'node_modules/pdfjs-dist/build/pdf.worker.min.js'
};

// The app is served from a fake http origin so the stub's localStorage persists across reloads
// (Chromium does not keep localStorage for file:// pages).
const ORIGIN = 'http://compass-lite.test';
const APP_URL = ORIGIN + '/compass-lite.html';

// Prepare a page: routing, stub options and the stub. opts.html serves that text as the app instead of the file.
async function preparePage(page, opts = {}) {
  const o = Object.assign({}, opts);
  const seed = o.seed; delete o.seed;
  const html = o.html; delete o.html;
  await page.route('**/*', route => {
    const u = route.request().url();
    if (CDN[u]) return route.fulfill({ path: path.join(ROOT, CDN[u]), contentType: 'application/javascript' });
    if (u.split('?')[0] === APP_URL) return html ? route.fulfill({ body: html, contentType: 'text/html' }) : route.fulfill({ path: path.join(ROOT, 'compass-lite.html'), contentType: 'text/html' });
    if (u.startsWith('data:') || u.startsWith('blob:')) return route.continue();
    return route.abort();
  });
  await page.addInitScript(([o2, s2]) => { window.__CL_STUB_OPTS = o2; if (s2) window.__CL_STUB_SEED = s2; }, [o, seed || null]);
  if (o.noClaude !== true) await page.addInitScript({ path: STUB });
}
async function gotoApp(page) {
  await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !document.querySelector('#view').textContent.includes('Loading your records'));
  return page;
}
// A second, separate install: a new browser context has its own (empty) database.
async function newInstall(browser, opts = {}) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await preparePage(page, opts);
  await gotoApp(page);
  return { ctx, page };
}

const test = base.test.extend({
  askLite: [true, { option: true }],
  // open(opts): open Lite with the stub. opts go to window.__CL_STUB_OPTS; opts.seed to window.__CL_STUB_SEED.
  open: async ({ page, askLite }, use) => {
    let prepared = false;
    await use(async (opts = {}) => {
      if (!prepared) { await preparePage(page, Object.assign({ sample: askLite }, opts)); prepared = true; }
      return gotoApp(page);
    });
  }
});

// Go through the first-run screen with Start fresh, business details and the saving check.
async function firstRun(page, { business = 'Test Business Ltd', owner = 'Olive Owner' } = {}) {
  await page.getByRole('button', { name: 'Start fresh' }).click();
  await page.getByLabel('Business name').fill(business);
  await page.getByLabel('Owner name').fill(owner);
  await page.getByRole('button', { name: 'Confirm details' }).click();
  await page.getByRole('button', { name: 'Check saving' }).click();
  await base.expect(page.locator('#selftest-msg')).toContainText('Working.');
  await page.getByRole('button', { name: 'Finish and open Set-up' }).click();
  await base.expect(page.locator('#view-setup')).toBeVisible();
  await settled(page);
}
async function goOrg(page) {
  await page.getByRole('tab', { name: 'Set-up' }).click();
  await page.locator('.subnav').getByRole('button', { name: 'Organization' }).click();
  await base.expect(page.locator('#view-org')).toBeVisible();
}
async function addPerson(page, name, title = '') {
  await page.locator('#people-register').getByLabel('Name', { exact: true }).fill(name);
  if (title) await page.locator('#people-register').getByLabel('Job title', { exact: true }).fill(title);
  await page.getByRole('button', { name: 'Confirm and add person' }).click();
  await base.expect(page.locator('#people-register tr', { hasText: name })).toBeVisible();
}
async function giveRole(page, name, role) {
  await page.getByLabel('Add a role to ' + name).selectOption(role);
  await base.expect(page.locator('#people-register tr', { hasText: name }).locator('.rolechip', { hasText: role })).toBeVisible();
}
async function settled(page) {
  await base.expect(page.locator('#chip')).toHaveAttribute('data-state', 'Saved');
}
async function stubState(page) { return page.evaluate(() => window.__clStub.state()); }

// Minimal one-page PDF carrying the given text.
function makePdf(text) {
  const content = `BT /F1 12 Tf 72 720 Td (${text.replace(/[()\\]/g, '\\$&')}) Tj ET`;
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
  ];
  let out = '%PDF-1.4\n'; const offs = [];
  objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const x = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offs.map(o => String(o).padStart(10, '0') + ' 00000 n \n').join('');
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${x}\n%%EOF\n`;
  return Buffer.from(out, 'latin1');
}
async function makeDocx(paragraphs) {
  const { Document, Packer, Paragraph } = require('docx');
  const doc = new Document({ sections: [{ children: paragraphs.map(t => new Paragraph(t)) }] });
  return Packer.toBuffer(doc);
}
function makeXlsx(rows) {
  const XLSX = require('xlsx');
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), 'ACES');
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

module.exports = { test, newInstall, gotoApp, APP_URL, expect: base.expect, firstRun, goOrg, addPerson, giveRole, settled, stubState, makePdf, makeDocx, makeXlsx, ROOT };
