
Feature: Login

  Scenario: Login as standard user
    Given the user logs in as "standard_user"
    Then the user is on the "inventory" page

  Scenario: Login as a locked user
    Given the user logs in as "locked_out_user"
    Then the locked out error page is displayed