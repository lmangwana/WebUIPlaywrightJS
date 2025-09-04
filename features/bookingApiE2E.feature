Feature: Booking API CRUD Operations
  As a user
  I want to create, retrieve, update, and delete bookings

  Background:
    Given I have access to the booking API

  Scenario: Create a new booking
    When I create a booking with valid data
    Then the booking should be created successfully
    And I should receive a booking ID

  Scenario: Retrieve an existing booking
    Given I have created a booking
    When I retrieve the booking by ID
    Then I should get the booking details
    And the details should match what I created

  Scenario: Update an existing booking
    Given I have created a booking
    When I update the booking with new data
    Then the booking should be updated successfully
    And the new data should be reflected

  Scenario: Delete an existing booking
    Given I have created a booking
    When I delete the booking
    Then the booking should be deleted successfully

  Scenario: Handle invalid booking creation
    When I try to create a booking with invalid data
    Then I should receive an error response
