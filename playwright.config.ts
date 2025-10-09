import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for PrestaShop Test Automation
 * 
 * Project: prestashop-test-automation
 * Target: https://demo.prestashop.com/#/en/front
 * 
 * Jira Integration:
 * - Epic PRESTA-16: Checkout Process
 * - Story PRESTA-17: Guest Checkout Flow
 * - Story PRESTA-18: Registered User Checkout
 */

export default defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  
  /* Test patterns */
  testMatch: [
    '**/tests/**/*.spec.ts',
    '**/tests/**/*.test.ts'
  ],
  
  /* Test ignore patterns */
  testIgnore: [
    '**/tests/debug-*.spec.ts',
    '**/tests/old-*.spec.ts'
  ],
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/test-results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['line']
  ],
  
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL for PrestaShop demo */
    baseURL: 'https://demo.prestashop.com',
    
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
    
    /* Timeout for each action */
    actionTimeout: 30000,
    
    /* Timeout for navigation */
    navigationTimeout: 60000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  
  /* Global test timeout */
  timeout: 120000,
  
  /* Global setup and teardown */
  // globalSetup: require.resolve('./tests/global-setup.ts'),
  // globalTeardown: require.resolve('./tests/global-teardown.ts'),
  
  /* Test output directory */
  outputDir: 'test-results/',
  
  /* Expect configuration */
  expect: {
    /* Timeout for expect() assertions */
    timeout: 10000,
  },
});