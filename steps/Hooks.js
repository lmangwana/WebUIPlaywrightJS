// steps/Hooks.js
const { Before, After } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

let browser, context;

Before(async function () {
  const browserName = (process.env.BROWSER || 'chromium').toLowerCase();
  const headed = (process.env.HEADED || 'false').toLowerCase() === 'true';
  const type = browserName === 'firefox' ? firefox : browserName === 'webkit' ? webkit : chromium;

  browser = await type.launch({ headless: !headed });

  const videosDir = path.join('artifacts', 'videos');
  fs.mkdirSync(videosDir, { recursive: true });

  context = await browser.newContext({
    recordVideo: { dir: videosDir }
  });

  this.page = await context.newPage();
  await this.page.goto(process.env.BASE_URL);
});

After(async function (scenario) {
  try {
    if (scenario.result && scenario.result.status === 'FAILED') {
      const png = await this.page.screenshot({ fullPage: true });
      await this.attach(png, 'image/png');
    }
  } finally {
    // Closing context flushes the video files to disk
    if (context) await context.close();
    if (browser) await browser.close();
  }
});