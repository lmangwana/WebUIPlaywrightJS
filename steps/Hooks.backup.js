const { Before, After } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');

const browserType = process.env.BROWSER || 'chromium';

Before(async function () {
  const headed = process.env.HEADED === 'true';
  const pw = { chromium, firefox, webkit }[browserType];
  this.browser = await pw.launch({ headless: !headed });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  await this.page.goto(process.env.BASE_URL || 'https://www.saucedemo.com/');
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    const png = await this.page.screenshot({ fullPage: true });
    await this.attach(png, 'image/png');
  }
  await this.context.close();
  await this.browser.close();
});