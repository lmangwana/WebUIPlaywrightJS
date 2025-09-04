const BaseApiClient = require('./BaseApiClient');
const endpoints = require('../config/endpoints');
const { authCredentials } = require('../data/authData');

/**
 * Authentication client for handling login and token management
 */
class AuthClient extends BaseApiClient {
  constructor() {
    super(endpoints.baseURL);
    this.token = null;
  }

  /**
   * Authenticates with the API and stores the token
   * @returns {Promise<string>} Authentication token
   */
  async authenticate() {
    const response = await this.post(endpoints.auth, authCredentials);
    this.token = response.data.token;
    return this.token;
  }

  /**
   * Gets the current authentication token
   * @returns {string|null} Current token or null if not authenticated
   */
  getToken() {
    return this.token;
  }

  /**
   * Checks if the client is currently authenticated
   * @returns {boolean} True if authenticated, false otherwise
   */
  isAuthenticated() {
    return this.token !== null;
  }

  /**
   * Clears the current authentication token
   */
  clearToken() {
    this.token = null;
  }
}

module.exports = AuthClient;
