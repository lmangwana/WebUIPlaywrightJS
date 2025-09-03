// pages/LoginPage.js
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.userInput = '#user-name';
    this.passInput = '#password';
    this.loginBtn  = '#login-button';
    this.errorBanner = "h3[data-test='error']"; // generic error container
  }

  /**
   * Logs in with given username + password
   */
  async login(username, password) {
    if (!username || !password) {
      throw new Error("Username and password must be provided via environment variables or step definition.");
    }
    await this.type(this.userInput, username);
    await this.type(this.passInput, password);
    await this.click(this.loginBtn);
  }

  /**
   * Validates that the locked-out error message is visible
   */
  async isLockedOutErrorVisible() {
    await this.shouldSee(this.errorBanner);
  }
}

module.exports = { LoginPage };