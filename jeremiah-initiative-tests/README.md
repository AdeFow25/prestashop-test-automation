# Jeremiah Initiative Website - Automated Test Suite

Comprehensive Playwright test automation for the Jeremiah Initiative website (https://www.jeremiahinitiative.org).

## Overview

This test suite implements **80 test scenarios** across **14 major test categories** covering:

- ✅ Homepage Functionality (6 tests)
- ✅ Navigation and Page Routing (7 tests)
- ✅ Donation Functionality (7 tests)
- ✅ Contact Form Functionality (7 tests)
- ✅ News/Blog Functionality (7 tests)
- ✅ Programs Information (5 tests)
- ✅ Responsive Design and Mobile Experience (6 tests)
- ✅ Accessibility Testing (6 tests)
- ✅ Performance and Load Testing (5 tests)
- ✅ Social Media Integration (4 tests)
- ✅ Search Functionality (5 tests)
- ✅ Security and Privacy (5 tests)
- ✅ Error Handling and Edge Cases (5 tests)
- ✅ Content Integrity and Quality (5 tests)

## Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

```bash
cd jeremiah-initiative-tests
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

### Optional: Install Accessibility Testing Tools

```bash
npm install --save-dev axe-playwright
```

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test Suite

```bash
# Homepage tests
npx playwright test tests/01-homepage.spec.ts

# Navigation tests
npx playwright test tests/02-navigation.spec.ts

# Donation tests
npx playwright test tests/03-donation.spec.ts

# Contact form tests
npx playwright test tests/04-contact-form.spec.ts

# News/Blog tests
npx playwright test tests/05-news-blog.spec.ts

# Programs tests
npx playwright test tests/06-programs.spec.ts

# Responsive design tests
npx playwright test tests/07-responsive-design.spec.ts

# Accessibility tests
npx playwright test tests/08-accessibility.spec.ts

# Performance tests
npx playwright test tests/09-performance.spec.ts

# Social media tests
npx playwright test tests/10-social-media.spec.ts

# Search and security tests
npx playwright test tests/11-search-security.spec.ts

# Error handling and content tests
npx playwright test tests/13-error-handling-content.spec.ts
```

### Run Tests by Priority

```bash
# Critical (P0) tests only
npx playwright test --grep "@P0"

# High priority (P1) tests
npx playwright test --grep "@P1"
```

### Run Tests on Specific Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit

# Mobile Chrome
npx playwright test --project="Mobile Chrome"

# Mobile Safari
npx playwright test --project="Mobile Safari"
```

### Run Tests in Headed Mode (See Browser)

```bash
npx playwright test --headed
```

### Run Tests with UI Mode

```bash
npx playwright test --ui
```

### Debug a Specific Test

```bash
npx playwright test --debug tests/01-homepage.spec.ts
```

## Test Reports

### HTML Report

After running tests, view the HTML report:

```bash
npx playwright show-report
```

### JSON Report

Test results are saved to `test-results/test-results.json`

### JUnit Report

Test results are also saved to `test-results/junit.xml` for CI/CD integration

## Test Structure

```
jeremiah-initiative-tests/
├── playwright.config.ts       # Playwright configuration
├── package.json               # Dependencies and scripts
├── README.md                  # This file
└── tests/
    ├── helpers/
    │   └── test-helpers.ts    # Shared test utilities
    ├── 01-homepage.spec.ts    # Homepage tests
    ├── 02-navigation.spec.ts  # Navigation tests
    ├── 03-donation.spec.ts    # Donation tests
    ├── 04-contact-form.spec.ts # Contact form tests
    ├── 05-news-blog.spec.ts   # News/blog tests
    ├── 06-programs.spec.ts    # Programs tests
    ├── 07-responsive-design.spec.ts # Responsive tests
    ├── 08-accessibility.spec.ts # Accessibility tests
    ├── 09-performance.spec.ts  # Performance tests
    ├── 10-social-media.spec.ts # Social media tests
    ├── 11-search-security.spec.ts # Search & security tests
    └── 13-error-handling-content.spec.ts # Error & content tests
```

## Key Features

### Test Helper Functions
Located in `tests/helpers/test-helpers.ts`:
- `waitForPageLoad()` - Wait for complete page load
- `setupConsoleErrorTracking()` - Track JavaScript errors
- `clearBrowserData()` - Clear cookies and cache
- `verifyHTTPS()` - Ensure secure connections
- `getMetaTag()` - Extract meta tag values
- `measurePageLoadTime()` - Performance metrics

### Accessibility Testing
Tests include WCAG 2.1 compliance checks:
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Semantic HTML
- ARIA attributes
- Form accessibility

### Performance Testing
Measures and validates:
- Page load times
- Image optimization
- Resource sizes
- Concurrent user handling
- Mobile performance

### Security Testing
Validates:
- HTTPS enforcement
- External link security
- Form data handling
- XSS prevention
- Privacy policy accessibility

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd jeremiah-initiative-tests && npm ci
      - run: cd jeremiah-initiative-tests && npx playwright install --with-deps
      - run: cd jeremiah-initiative-tests && npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: jeremiah-initiative-tests/playwright-report/
```

## Test Coverage

| Category | Tests | Status |
|----------|-------|--------|
| Homepage Functionality | 6 | ✅ Complete |
| Navigation and Routing | 7 | ✅ Complete |
| Donation Interface | 7 | ✅ Complete |
| Contact Forms | 7 | ✅ Complete |
| News/Blog | 7 | ✅ Complete |
| Programs Info | 5 | ✅ Complete |
| Responsive Design | 6 | ✅ Complete |
| Accessibility | 6 | ✅ Complete |
| Performance | 5 | ✅ Complete |
| Social Media | 4 | ✅ Complete |
| Search & Security | 10 | ✅ Complete |
| Error Handling & Content | 10 | ✅ Complete |
| **TOTAL** | **80** | **✅ 100%** |

## Important Notes

### Donation Tests
- **DO NOT** submit real payments
- Tests verify form presence and validation only
- No actual transaction data is submitted

### Contact Form Tests
- Uses test email addresses
- Submissions are for testing purposes only
- May create test entries in the organization's database

### Performance Tests
- Baseline thresholds may need adjustment
- Network conditions affect results
- Run on consistent infrastructure for comparison

## Troubleshooting

### Tests Failing Due to Timeouts
Increase timeout in `playwright.config.ts`:
```typescript
timeout: 180000, // 3 minutes
```

### Element Selectors Not Found
The website structure may have changed. Update selectors in affected test files.

### Accessibility Tests Require axe-playwright
Install the dependency:
```bash
npm install --save-dev axe-playwright
```

## Maintenance

### Updating Tests
- Review test results regularly
- Update selectors when website changes
- Adjust performance thresholds as needed
- Add new tests for new features

### Best Practices
- Keep tests independent and isolated
- Use descriptive test names
- Add comments for complex logic
- Update test documentation

## Support

For issues or questions about the test suite:
1. Check test output and screenshots
2. Review Playwright documentation
3. Check website for structural changes
4. Update selectors and retry

## License

This test suite is proprietary to the Jeremiah Initiative testing project.

---

**Last Updated:** May 5, 2026  
**Test Count:** 80 automated test scenarios  
**Coverage:** 14 major test categories  
**Target Website:** https://www.jeremiahinitiative.org
