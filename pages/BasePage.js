// pages/BasePage.js
const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL not set. Please create .env or configure GitHub Secrets.");
    }
    this.baseUrl = process.env.BASE_URL;  }

  async shouldSee(selector) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async shouldBeOnPath(expectedPath) {
    const fullUrl = `${this.baseUrl}${expectedPath}.html`;
    await expect(this.page).toHaveURL(fullUrl);
  }

  async shouldBeOnCheckout(expectedPath) {
    const fullUrl = `${this.baseUrl}checkout-${expectedPath}.html`;
    await expect(this.page).toHaveURL(fullUrl);
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async type(selector, text) {
    await this.page.locator(selector).fill(text);
  }
}

module.exports = { BasePage };