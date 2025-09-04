// pages/ProductsPage.js
const { BasePage } = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.shoppingCartLink = "a[data-test='shopping-cart-link']";
  }

  async shouldBeOnProductsPage(path) {
    await this.shouldBeOnPath(path); // uses BasePage method
  }

  async addItemByName(name) {
    await this.page
      .locator(`.inventory_item:has-text("${name}") button:has-text("Add to cart")`)
      .first()
      .click();
  }

  async goToCart() {
    await this.click(this.shoppingCartLink); // BasePage helper
  }
}

module.exports = { ProductsPage };