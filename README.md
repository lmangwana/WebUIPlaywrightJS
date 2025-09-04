# WebUIPlaywrightJS

A comprehensive Playwright test automation framework using Cucumber BDD for both UI testing ([SauceDemo](https://www.saucedemo.com/)) and API testing ([Restful-Booker](https://restful-booker.herokuapp.com/)).

##  Features

- **Cross-browser testing** (Chromium, Firefox, WebKit)
- **BDD with Cucumber.js** for readable test scenarios
- **Page Object Model** architecture for UI tests
- **Service-oriented API testing** with modular structure
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
   # Edit .env with your test credentials and API settings
   ```

3. **Run tests**
   ```bash
   # UI Tests
   npm run test:e2e          # All UI tests headless with reports
   npm run test:e2e:headed   # UI tests in headed mode
   npm run test:login        # Login tests only
   
   # API Tests
   npm run test:api          # API CRUD tests
   ```

##  Test Reports

After test execution, find reports in:
- **HTML Report**: `artifacts/cucumber-report.html`
- **Videos**: `artifacts/videos/`
- **Screenshots**: Embedded in HTML report on failures

##  Project Structure

```
├── api/                      # API testing framework
│   ├── client/              # HTTP clients and authentication
│   │   ├── BaseApiClient.js # Base HTTP client with common functionality
│   │   └── AuthClient.js    # Authentication and token management
│   ├── services/            # Business logic services
│   │   └── BookingService.js # Booking CRUD operations
│   ├── config/              # Configuration files
│   │   ├── endpoints.js     # API endpoint definitions
│   │   └── environment.js   # Environment validation
│   └── data/                # Test data
│       ├── authData.js      # Authentication credentials
│       └── bookingData.js   # Static and dynamic booking data
├── features/                # Cucumber feature files
│   ├── bookingApiE2E.feature # API CRUD test scenarios
│   ├── login.feature        # UI login tests
│   └── placeOrderE2E.feature # UI e2e order flow
├── pages/                   # Page Object Model classes (UI)
├── steps/                   # Step definitions and hooks
│   ├── ApiSteps.js         # API test step definitions
│   └── CommonSteps.js      # UI test step definitions
├── support/                 # Test configuration and reporting
└── .github/workflows/       # CI/CD pipeline
```

##  Available Scripts

### UI Testing
- `npm run test:e2e` - Run all UI tests headless
- `npm run test:e2e:headed` - Run UI tests in headed mode
- `npm run test:login` - Run login-specific tests
- `npm run test` - Default test command (used in CI)

### API Testing
- `npm run test:api` - Run API CRUD tests
- `npm test` - Run all tests (UI + API)

##  CI/CD

GitHub Actions automatically runs tests on push/PR with:
- Multi-browser matrix testing
- Artifact uploads (reports, videos, screenshots)
- Environment variable injection from secrets

##  Writing Tests

### UI Tests
Tests follow BDD format in `features/` directory:
```gherkin
Feature: Login functionality
  Scenario: Successful login
    Given I am on the login page
    When I login with valid credentials
    Then I should see the products page
```

### API Tests
API tests use service-oriented architecture:
```gherkin
Feature: Booking API CRUD Operations
  As a user
  I want to create, retrieve, update, and delete bookings

  Background:
    Given I have access to the booking API

  Scenario: Create a new booking
    When I create a booking with valid data
    Then the booking should be created successfully
    And I should receive a booking ID
```

##  Environment Variables

Configure your `.env` file with the required variables. See `.env.example` for the complete template with default values.

**Note**: Never commit sensitive credentials to version control. Use placeholder values in documentation.

##  API Architecture

The API testing framework follows a service-oriented architecture with clear separation of concerns:

- **BaseApiClient**: Handles HTTP requests, response parsing, and common functionality
- **AuthClient**: Manages authentication and token lifecycle
- **BookingService**: Implements business logic for booking operations
- **Configuration**: Centralized endpoint and environment management
- **Test Data**: Static and dynamic data generation for test scenarios

This modular approach ensures maintainability, testability, and scalability of the API test suite.
