// pages/CartPage.js
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    // Java: private final String ... = "..."
    // JS: instance fields (no private/final keywords in plain JS)
    this.checkoutButton = "button[data-test='checkout']";
    this.ROW   = "[data-test='inventory-item']";
    this.QTY   = "[data-test='item-quantity']";
    this.NAME  = "[data-test='inventory-item-name']";
    this.PRICE = "[data-test='inventory-item-price']";
  }

  // Java: public void shouldBeOnCartsPage(String path) { shouldBeOnPath(path); }
  async shouldBeOnCartsPage(path) {
    await this.shouldBeOnPath(path); // uses BasePage.shouldBeOnPath
  }

  // Java: public void goToStepOneOfCheckOut() { click(checkoutButton); }
  async goToStepOneOfCheckOut() {
    await this.click(this.checkoutButton); // BasePage.click helper
  }

  /**
   * Java: assertLineItems(expectedQty, expectedDescription, expectedPrice)
   * Same logic: loop rows, find by name, compare qty & price strings.
   */
  async assertLineItems(expectedQty, expectedDescription, expectedPrice) {
    const rows = this.page.locator(this.ROW);
    const count = await rows.count();
    let found = false;

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i); // Playwright strict-mode friendly: choose a specific nth()
      const nameText = (await row.locator(this.NAME).innerText()).trim();

      if (nameText !== expectedDescription) {
        continue; // keep searching
      }

      found = true;

      const qtyText   = (await row.locator(this.QTY).innerText()).trim();
      const priceText = (await row.locator(this.PRICE).innerText()).trim();

      if (qtyText !== String(expectedQty)) {
        throw new Error(
          `Qty mismatch for '${expectedDescription}'. Expected=${expectedQty} actual=${qtyText}`
        );
      }

      if (priceText !== String(expectedPrice)) {
        throw new Error(
          `Price mismatch for '${expectedDescription}'. Expected=${expectedPrice} actual=${priceText}`
        );
      }

      // matched fully; stop
      break;
    }

    if (!found) {
      throw new Error(`Item not found in cart: '${expectedDescription}'`);
    }
  }

  // Java: private static BigDecimal toMoney(String s)
  _toMoney(s) {
    return parseFloat(String(s).replace(/[^0-9.-]/g, '')); // "$29.99" -> 29.99
  }

  /** Java: BigDecimal subtotalfromCart() */
  async subtotalfromCart() {
    const rows = this.page.locator(this.ROW);
    const count = await rows.count();
    let sum = 0;

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const qtyText   = (await row.locator(this.QTY).innerText()).trim();
      const priceText = (await row.locator(this.PRICE).innerText()).trim();

      const qty  = parseFloat(qtyText);       // Java BigDecimal -> JS number
      const unit = this._toMoney(priceText);  // "$29.99" -> 29.99

      sum += qty * unit;
    }
    // Keep 2dp like money
    return Number(sum.toFixed(2));
  }
}

module.exports = { CartPage };