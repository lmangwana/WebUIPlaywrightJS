Feature: Place order
  Scenario: Complete checkout
    Given the user logs in as "standard_user"
    When the user adds "Sauce Labs Backpack" to the cart
    And the user adds "Sauce Labs Bike Light" to the cart
    And the user clicks on "the Cart"
    Then the cart should show the following items:
      | Qty | Description           | Price  |
      | 1   | Sauce Labs Bike Light | $9.99  |
      | 1   | Sauce Labs Backpack   | $29.99 |
    And the user clicks on "Checkout"
    And they enter their details:
      | Name | Last Name | Zip or Postal Code |
      | Test | User      | 2031               |
    And the user clicks on "Continue"
    And the Price total is correct
    When the user clicks on "Finish"
    Then they see an order confirmation with the message "Thank you for your order!"