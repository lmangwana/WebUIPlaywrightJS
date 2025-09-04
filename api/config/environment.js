/**
 * Environment configuration and validation
 */

// Validate required API environment variables
if (!process.env.API_BASE_URL) {
  throw new Error("API_BASE_URL not set. Please create .env or configure GitHub Secrets.");
}

if (!process.env.API_USERNAME) {
  throw new Error("API_USERNAME not set. Please create .env or configure GitHub Secrets.");
}

if (!process.env.API_PASSWORD) {
  throw new Error("API_PASSWORD not set. Please create .env or configure GitHub Secrets.");
}

const environment = {
  baseURL: process.env.API_BASE_URL,
  username: process.env.API_USERNAME,
  password: process.env.API_PASSWORD
};

module.exports = environment;
