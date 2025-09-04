const BaseApiClient = require('../client/BaseApiClient');
const AuthClient = require('../client/AuthClient');
const endpoints = require('../config/endpoints');

/**
 * Booking service for handling all booking-related CRUD operations
 */
class BookingService extends BaseApiClient {
  constructor() {
    super(endpoints.baseURL);
    this.authClient = new AuthClient();
  }

  /**
   * Creates a new booking
   * @param {Object} bookingData - Booking data object
   * @returns {Promise<Object>} Response object with booking details
   */
  async createBooking(bookingData) {
    return await this.post(endpoints.booking, bookingData);
  }

  /**
   * Retrieves a booking by ID
   * @param {number} bookingId - Booking ID
   * @returns {Promise<Object>} Response object with booking details
   */
  async getBooking(bookingId) {
    return await this.get(`${endpoints.booking}/${bookingId}`);
  }

  /**
   * Updates an existing booking
   * @param {number} bookingId - Booking ID
   * @param {Object} bookingData - Updated booking data
   * @returns {Promise<Object>} Response object with updated booking details
   */
  async updateBooking(bookingId, bookingData) {
    // Ensure we have a valid authentication token
    if (!this.authClient.isAuthenticated()) {
      await this.authClient.authenticate();
    }

    return await this.put(`${endpoints.booking}/${bookingId}`, bookingData, {
      headers: {
        'Cookie': `token=${this.authClient.getToken()}`
      }
    });
  }

  /**
   * Deletes a booking by ID
   * @param {number} bookingId - Booking ID
   * @returns {Promise<Object>} Response object
   */
  async deleteBooking(bookingId) {
    // Ensure we have a valid authentication token
    if (!this.authClient.isAuthenticated()) {
      await this.authClient.authenticate();
    }

    return await this.delete(`${endpoints.booking}/${bookingId}`, {
      headers: {
        'Cookie': `token=${this.authClient.getToken()}`
      }
    });
  }

  /**
   * Gets all bookings (if supported by API)
   * @returns {Promise<Object>} Response object with all bookings
   */
  async getAllBookings() {
    return await this.get(endpoints.booking);
  }
}

module.exports = BookingService;
