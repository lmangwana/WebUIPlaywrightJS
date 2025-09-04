// pages/CheckoutYourInfoPage.js
const { BasePage } = require('./BasePage');

class CheckoutYourInfoPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);

    // Java: private final String ... = "..."
    this.continueButtonSelector = "input[data-test='continue']";
    this.firstNameInput = "input[data-test='firstName']";
    this.lastNameInput  = "input[data-test='lastName']";
    this.zipCodeInput   = "input[data-test='postalCode']";
  }

  // Java: public void goToStepTwoOfCheckOut()
  async goToStepTwoOfCheckOut() {
    await this.click(this.continueButtonSelector); // BasePage.click
  }

  // Java: public void shouldBeOnStepOneOfCheckOut(String path)
  async shouldBeOnStepOneOfCheckOut(path) {
    await this.shouldBeOnCheckout(path); // BasePage helper
  }

  // Java: public void fillInYourInformation(String name, String lastname, String zip)
  async fillInYourInformation(name, lastname, zip) {
    await this.type(this.firstNameInput, name);
    await this.type(this.lastNameInput, lastname);
    await this.type(this.zipCodeInput, zip);
  }
}

module.exports = { CheckoutYourInfoPage };