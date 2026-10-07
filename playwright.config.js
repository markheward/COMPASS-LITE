// Release tests (spec section 9): every phase's tests run at desktop and 390 px wide,
// with Ask Lite available and switched off.
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: true,
  reporter: [['list']],
  use: { browserName: 'chromium' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 }, askLite: true } },
    { name: 'desktop-ask-off', use: { viewport: { width: 1280, height: 900 }, askLite: false } },
    { name: 'phone', use: { viewport: { width: 390, height: 844 }, askLite: true } },
    { name: 'phone-ask-off', use: { viewport: { width: 390, height: 844 }, askLite: false } }
  ]
});
