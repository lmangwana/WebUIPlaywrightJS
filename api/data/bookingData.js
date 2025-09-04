const { faker } = require('@faker-js/faker');

/**
 * Booking test data - both static and dynamic
 */

// Static test data for predictable tests
const validBooking = {
  firstname: "Lutho",
  lastname: "Tester",
  totalprice: 500,
  depositpaid: true,
  bookingdates: {
    checkin: "2025-10-01",
    checkout: "2025-10-05"
  },
  additionalneeds: "Breakfast"
};

// Dynamic data generator for varied test scenarios
const generateBooking = () => ({
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  totalprice: faker.number.int({ min: 100, max: 1000 }),
  depositpaid: faker.datatype.boolean(),
  bookingdates: {
    checkin: faker.date.future().toISOString().split('T')[0],
    checkout: faker.date.future().toISOString().split('T')[0]
  },
  additionalneeds: faker.lorem.word()
});

module.exports = {
  validBooking,
  generateBooking
};
