const environment = require('../config/environment');

/**
 * Authentication credentials and related test data
 */
const authCredentials = {
  username: environment.username,
  password: environment.password
};

module.exports = {
  authCredentials
};
