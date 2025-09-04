const { request } = require('@playwright/test');

/**
 * Base API client for handling HTTP requests and common functionality
 */
class BaseApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  /**
   * Creates a new request context with common configuration
   * @returns {Promise<APIRequestContext>}
   */
  async createRequestContext() {
    return await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Handles response parsing with error handling
   * @param {APIResponse} response - Playwright API response
   * @returns {Promise<Object>} Parsed response object
   */
  async parseResponse(response) {
    let responseData;
    try {
      responseData = await response.json();
    } catch (error) {
      // Handle non-JSON responses (like error messages)
      responseData = await response.text();
    }
    
    return {
      status: response.status(),
      data: responseData
    };
  }

  /**
   * Makes a GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response object
   */
  async get(endpoint, options = {}) {
    const context = await this.createRequestContext();
    const response = await context.get(endpoint, options);
    const result = await this.parseResponse(response);
    await context.dispose();
    return result;
  }

  /**
   * Makes a POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response object
   */
  async post(endpoint, data, options = {}) {
    const context = await this.createRequestContext();
    const response = await context.post(endpoint, {
      data,
      ...options
    });
    const result = await this.parseResponse(response);
    await context.dispose();
    return result;
  }

  /**
   * Makes a PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response object
   */
  async put(endpoint, data, options = {}) {
    const context = await this.createRequestContext();
    const response = await context.put(endpoint, {
      data,
      ...options
    });
    const result = await this.parseResponse(response);
    await context.dispose();
    return result;
  }

  /**
   * Makes a DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response object
   */
  async delete(endpoint, options = {}) {
    const context = await this.createRequestContext();
    const response = await context.delete(endpoint, options);
    const result = {
      status: response.status()
    };
    await context.dispose();
    return result;
  }
}

module.exports = BaseApiClient;
