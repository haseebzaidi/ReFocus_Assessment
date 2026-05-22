# ReFocus Assessment - Playwright Automation Framework

A robust, professional-grade E2E automation framework built with Playwright and TypeScript for the SauceDemo application.

## 🚀 Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/haseebzaidi/ReFocus_Assessment-.git
   cd ReFocus_Assessment-
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps
   ```

### Environment Configuration
Create a `.env` file in the root directory and add the following:
```env
BASE_URL=https://www.saucedemo.com/
USER_NAME=standard_user
PASSWORD=secret_sauce
```

---

## 🛠 Execution Instructions

### Run All Tests
```bash
npx playwright test
```

### Run Tests in Headed Mode (See the browser)
```bash
npx playwright test --headed
```

### Run Specific Project (e.g., Chromium)
```bash
npx playwright test --project=chromium
```

### View Test Report
```bash
npx playwright show-report
```

---

## 🏗 Architectural Overview

The framework follows a multi-layered architecture designed for scalability and maintainability:

1.  **Page Object Model (POM):** Encapsulates page-specific logic and selectors (e.g., `LoginPage`, `InventoryPage`, `CartPage`).
2.  **Service Layer (Workflow Abstraction):** The `PurchaseWorkflow` class abstracts complex end-to-end sequences, keeping test scripts concise and readable.
3.  **Base Layer:** `BasePage` provides reusable interaction helpers (`clickElement`, `typeText`) and resilience utilities (`retryAction`).
4.  **Utilities:** `testData` for centralized data management and `@faker-js/faker` for dynamic data generation.

---

## 📐 Design Decisions

-   **Dynamic XPaths:** Used advanced XPaths to target products by name dynamically, ensuring the framework remains functional even if the product list changes.
-   **Service Abstraction:** Moved business logic out of the test files and into a `PurchaseWorkflow` to simplify test maintenance.
-   **Resilience (Retries):** Implemented a custom `retryAction` and configured Playwright retries on CI to handle flakiness.
-   **Observability:** Integrated `test.step` for detailed execution logs and configured Playwright to capture traces, videos, and screenshots on failure.
-   **CI/CD:** Configured GitHub Actions with a matrix strategy for parallel execution across Chromium, Firefox, and WebKit.

---

## 📝 Assumptions & Known Limitations

### Assumptions
-   The application is stable enough to wait for `networkidle` during navigation.
-   The `data-test` attributes are unique and present for critical elements as requested.
-   The environment variables (`BASE_URL`, etc.) are correctly set in the local `.env` or GitHub Secrets.

### Known Limitations
-   **Static Inventory:** While product selection is dynamic, the test currently assumes the products requested in `testData` are actually available in the inventory.
-   **Headless by Default:** Local execution is headless unless the `--headed` flag is used.

---

## 🌟 Future Improvements
-   **API Integration:** Combine UI tests with API calls to set up test state faster (e.g., bypassing the login UI).
-   **Cross-Browser Visual Testing:** Integrate tools like Applitools or Playwright's built-in visual comparison for UI consistency.
-   **Data-Driven Testing:** Expand the `testData` to support multiple user roles (e.g., `problem_user`, `performance_glitch_user`).
-   **Enhanced Error Handling:** Implement global hooks to clean up test data or capture application state in external databases.

---

## 📦 Dependencies
-   **@playwright/test:** Core automation engine.
-   **typescript:** For type-safe code.
-   **dotenv:** For environment variable management.
-   **@faker-js/faker:** For generating randomized test data.
