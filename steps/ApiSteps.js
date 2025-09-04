const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookingService = require('../api/services/BookingService');
const { validBooking, generateBooking } = require('../api/data/bookingData');

const bookingService = new BookingService();

let createdBooking = {};
let apiResponse = {};
let bookingId = null;

Given('I have access to the booking API', async function () {
  try {
    // Verify API is reachable by making a health check request
    const response = await bookingService.getBooking(1); // Try to get any booking to test connectivity
    
    // We expect either 200 (booking found) or 404 (booking not found) - both indicate API is accessible
    if (response.status === 200 || response.status === 404) {
      this.attach(`API access confirmed - received status ${response.status}`);
    } else {
      throw new Error(`Unexpected API response: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Cannot access booking API: ${error.message}`);
  }
});

Given('I have created a booking', async function () {
  const response = await bookingService.createBooking(validBooking);
  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty('bookingid');
  
  bookingId = response.data.bookingid;
  createdBooking = response.data.booking;
  
  this.attach(`Created booking with ID: ${bookingId}`);
});

When('I create a booking with valid data', async function () {
  apiResponse = await bookingService.createBooking(validBooking);
  this.attach(`API Response Status: ${apiResponse.status}`);
});

When('I retrieve the booking by ID', async function () {
  apiResponse = await bookingService.getBooking(bookingId);
  this.attach(`Retrieved booking ID: ${bookingId}`);
});

When('I update the booking with new data', async function () {
  const updatedData = { ...validBooking, firstname: 'Jane', lastname: 'Smith' };
  apiResponse = await bookingService.updateBooking(bookingId, updatedData);
  this.attach(`Updated booking ID: ${bookingId} with new name: Jane Smith`);
});

When('I delete the booking', async function () {
  apiResponse = await bookingService.deleteBooking(bookingId);
  this.attach(`Deleted booking ID: ${bookingId}`);
});

When('I try to create a booking with invalid data', async function () {
  const invalidBooking = { firstname: '', lastname: '' }; // Invalid data
  apiResponse = await bookingService.createBooking(invalidBooking);
  this.attach(`Attempted to create booking with invalid data`);
});

Then('the booking should be created successfully', async function () {
  expect(apiResponse.status).toBe(200);
  this.attach('Booking created successfully');
});

Then('I should receive a booking ID', async function () {
  expect(apiResponse.data).toHaveProperty('bookingid');
  expect(typeof apiResponse.data.bookingid).toBe('number');
  bookingId = apiResponse.data.bookingid;
  this.attach(`Received booking ID: ${bookingId}`);
});

Then('I should get the booking details', async function () {
  expect(apiResponse.status).toBe(200);
  expect(apiResponse.data).toHaveProperty('firstname');
  expect(apiResponse.data).toHaveProperty('lastname');
  this.attach('Successfully retrieved booking details');
});

Then('the details should match what I created', async function () {
  expect(apiResponse.data.firstname).toBe(validBooking.firstname);
  expect(apiResponse.data.lastname).toBe(validBooking.lastname);
  expect(apiResponse.data.totalprice).toBe(validBooking.totalprice);
  this.attach('Booking details match the created data');
});

Then('the booking should be updated successfully', async function () {
  expect(apiResponse.status).toBe(200);
  this.attach('Booking updated successfully');
});

Then('the new data should be reflected', async function () {
  expect(apiResponse.data.firstname).toBe('Jane');
  expect(apiResponse.data.lastname).toBe('Smith');
  this.attach('Updated data is correctly reflected');
});

Then('the booking should be deleted successfully', async function () {
  expect(apiResponse.status).toBe(201);
  this.attach('Booking deleted successfully');
});

Then('I should receive an error response', async function () {
  expect(apiResponse.status).toBe(500); // Restful-booker returns 500 for invalid data
  this.attach(`Received expected error response with status: ${apiResponse.status}`);
});
