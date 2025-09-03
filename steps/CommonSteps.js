const { Given, When, Then, And, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Page Objects (JS versions mirroring your Java class names)
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutYourInfoPage } = require('../pages/CheckoutYourInfoPage');
const { CheckoutOverviewPage } = require('../pages/CheckoutOverviewPage');

setDefaultTimeout(60_000);

// Create per-step helpers that grab the same Playwright page from the Cucumber World
function makePages(world) {
  const page = world.page;
  return {
    login:    new LoginPage(page),
    products: new ProductsPage(page),
    cart:     new CartPage(page),
    info:     new CheckoutYourInfoPage(page),
    overview: new CheckoutOverviewPage(page),
  };
}

// ================== STEPS ==================

// Given the user logs in as "standard_user"
Given('the user logs in as {string}', async function (userType) {
  const { login } = makePages(this);

  // Map user types to env vars (no hardcoding; fail if missing)
  let username;
  switch (userType) {
    case 'standard_user':
      username = process.env.USER_STANDARD;
      break;
    case 'locked_out_user':
      username = process.env.USER_LOCKED;
      break;
    default:
      throw new Error(`Unknown user type: ${userType}`);
  }
  const password = process.env.PASSWORD;

  if (!username || !password) {
    throw new Error('Missing USER_* or PASSWORD env vars. Copy .env.example to .env and set values.');
  }

  await login.login(username, password);
});

Then('the locked out error page is displayed', async function () {
  const { login } = makePages(this);
  await login.isLockedOutErrorVisible();
});

// When the user adds "Sauce Labs Backpack" to the cart
When('the user adds {string} to the cart', async function (name) {
  const { products } = makePages(this);
  await products.addItemByName(name);
});

// And navigates to the cart  (still supported if you use this step)
When('navigates to the cart', async function () {
  const { products } = makePages(this);
  await products.goToCart();
});

// Then the user is on the "inventory"/"cart" page
Then('the user is on the {string} page', async function (pageName) {
  const { products, cart } = makePages(this);
  switch (pageName.toLowerCase()) {
    case 'inventory':
      await products.shouldBeOnProductsPage(pageName); // asserts **/inventory.html
      break;
    case 'cart':
      await cart.shouldBeOnCartsPage(pageName);        // asserts **/cart.html
      break;
    default:
      throw new Error(`Unknown page: ${pageName}`);
  }
});

// And the user clicks on "the Cart" / "Checkout" / "Continue" / "Finish"
Then('the user clicks on {string}', async function (element) {
  const { products, cart, info, overview } = makePages(this);

  switch (element.toLowerCase()) {
    case 'the cart':
      await products.goToCart();
      break;

    case 'checkout':
      await cart.goToStepOneOfCheckOut();
      break;

    case 'continue':
      await info.goToStepTwoOfCheckOut();
      break;

    case 'finish':
      await overview.placeOrder();
      break;

    default:
      throw new Error(`Unknown element to click: ${element}`);
  }
});

// Given/Then the user is on "step-one"/"step-two" of the check out flow
Then('the user is on {string} of the check out flow', async function (step) {
  const { info, overview } = makePages(this);

  switch (step.toLowerCase()) {
    case 'step-one':
      await info.shouldBeOnStepOneOfCheckOut(step);      // asserts **/checkout-step-one.html
      break;

    case 'step-two':
      await overview.shouldBeOnStepTwoOfCheckOut(step);  // asserts **/checkout-step-two.html
      break;

    default:
      throw new Error(`Unknown checkout step: ${step}`);
  }
});

// And they enter their details:
Then('they enter their details:', async function (dataTable) {
  const { info } = makePages(this);

  const rows = dataTable.hashes();
  const r = rows[0]; // expecting one row
  const firstName = (r['Name'] || '').trim();
  const lastName  = (r['Last Name'] || '').trim();
  const zip       = (r['Zip or Postal Code'] || '').trim();

  if (!firstName || !lastName || !zip) {
    throw new Error('Missing Name / Last Name / Zip or Postal Code in data table.');
  }

  await info.fillInYourInformation(firstName, lastName, zip);
});

// Then the cart should show the following items:
Then('the cart should show the following items:', async function (dataTable) {
  const { cart } = makePages(this);
  const items = dataTable.asMaps(String, String);

  for (const item of items) {
    const qty  = item['Qty'];
    const desc = item['Description'];
    const price = item['Price'];
    await cart.assertLineItems(qty, desc, price);
  }
});

// And the Price total is correct
Then('the Price total is correct', async function () {
  const { cart, overview } = makePages(this);
  const subtotal = await cart.subtotalfromCart(); // number or formatted string, your choice in page object
  await overview.assertSubtotal(subtotal);
});

// Then they see an order confirmation with the message "Thank you for your order!"
Then('they see an order confirmation with the message {string}', async function (message) {
  const { overview } = makePages(this);
  await overview.assertOrderPlaced(message);
});