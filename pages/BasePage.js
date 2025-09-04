// pages/BasePage.js
const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;

    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL not set. Please create .env or configure GitHub Secrets.");
    }
  }

  async shouldSee(selector) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async shouldBeOnPath(expectedPath) {
    await expect(this.page).toHaveURL(new RegExp(`.*/${expectedPath}\\.html$`));
  }

  async shouldBeOnCheckout(expectedPath) {
    await expect(this.page).toHaveURL(new RegExp(`.*checkout-${expectedPath}\\.html$`));
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async type(selector, text) {
    await this.page.locator(selector).fill(text);
  }
}

module.exports = { BasePage };
