// pages/CheckoutOverviewPage.js
const { BasePage } = require('./BasePage');

class CheckoutOverviewPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    // Java: private final String ... = "..."
    this.finishButtonSelector   = "button[data-test='finish']";
    this.SUBTOTAL               = "[data-test='subtotal-label']";     // e.g. "Item total: $39.98"
    this.completeHeaderSelector = "h2[data-test='complete-header']";
  }

  // Java: public void placeOrder() { click(finishButtonSelector); }
  async placeOrder() {
    await this.click(this.finishButtonSelector);
  }

  // Java: public void shouldBeOnStepTwoOfCheckOut(String path) { shouldBeOnCheckout(path); }
  async shouldBeOnStepTwoOfCheckOut(path) {
    await this.shouldBeOnCheckout(path);
  }

  // Java: private static BigDecimal toMoney(String s)
  _toMoney(s) {
    // "$39.98" -> 39.98 (number)
    return parseFloat(String(s).replace(/[^0-9.-]/g, ''));
  }

  // Java: public void assertSubtotal(BigDecimal expected)
  async assertSubtotal(expected) {
    // Read UI label text, extract number, compare to expected
    const label = await this.page.locator(this.SUBTOTAL).innerText();
    const uiSubtotal = this._toMoney(label);

    // Ensure expected is a number (in case caller passes a string)
    const exp = typeof expected === 'number'
      ? expected
      : parseFloat(String(expected).replace(/[^0-9.-]/g, ''));

    // Compare to 2 decimal places (money)
    const uiRounded  = Number(uiSubtotal.toFixed(2));
    const expRounded = Number(exp.toFixed(2));

    if (uiRounded !== expRounded) {
      throw new Error(`Subtotal mismatch. Expected=${expRounded} but UI shows=${uiRounded}`);
    }
  }

  // Java: public void assertOrderPlaced(String expectedMessage)
  async assertOrderPlaced(expectedMessage) {
    const actualText = (await this.page.locator(this.completeHeaderSelector).innerText()).trim();
    if (actualText !== expectedMessage) {
      throw new Error(
        `Order confirmation message mismatch. Expected='${expectedMessage}' but found='${actualText}'`
      );
    }
  }
}

module.exports = { CheckoutOverviewPage };