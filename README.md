# WebUIPlaywrightJS

A comprehensive Playwright test automation framework using Cucumber BDD for the [SauceDemo](https://www.saucedemo.com/) application.

##  Features

- **Cross-browser testing** (Chromium, Firefox, WebKit)
- **BDD with Cucumber.js** for readable test scenarios
- **Page Object Model** architecture
- **Comprehensive reporting** with HTML reports, screenshots, and videos
- **CI/CD ready** with GitHub Actions
- **Environment configuration** support

##  Prerequisites

- Node.js 18+ 
- npm

##  Quick Start

1. **Clone and install**
   ```bash
   git clone https://github.com/lmangwana/WebUIPlaywrightJS.git
   cd WebUIPlaywrightJS
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your test credentials
   ```

3. **Run tests**
   ```bash
   npm run test:e2e          # Headless with reports
   npm run test:e2e:headed   # Headed mode
   npm run test:login        # Login tests only
   ```

##  Test Reports

After test execution, find reports in:
- **HTML Report**: `artifacts/cucumber-report.html`
- **Videos**: `artifacts/videos/`
- **Screenshots**: Embedded in HTML report on failures

##  Project Structure

```
├── features/           # Cucumber feature files
├── pages/             # Page Object Model classes
├── steps/             # Step definitions and hooks
├── support/           # Test configuration and reporting
└── .github/workflows/ # CI/CD pipeline
```

##  Available Scripts

- `npm run test:e2e` - Run all tests headless
- `npm run test:e2e:headed` - Run tests in headed mode
- `npm run test:login` - Run login-specific tests
- `npm run test` - Default test command (used in CI)

##  CI/CD

GitHub Actions automatically runs tests on push/PR with:
- Multi-browser matrix testing
- Artifact uploads (reports, videos, screenshots)
- Environment variable injection from secrets

##  Writing Tests

Tests follow BDD format in `features/` directory:
```gherkin
Feature: Login functionality
  Scenario: Successful login
    Given I am on the login page
    When I login with valid credentials
    Then I should see the products page
```
