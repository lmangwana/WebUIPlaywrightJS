const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('the login button is visible', async function () {
  await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
});