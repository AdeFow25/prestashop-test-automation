import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Jeremiah Initiative Website Testing
 * 
 * Website: https://www.jeremiahinitiative.org
 * Purpose: Non-profit organization website - Donor engagement, Volunteer recruitment, Program information
 */

export default defineConfig({
  testDir: './tests/real',
  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  
  timeout: 120000, // 2 minutes per test
  
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/test-results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],
  
  use: {
    baseURL: 'https://www.jeremiahinitiative.org',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },

  projects: [
    {
      name: 'edge',
      use: { 
        ...devices['Desktop Edge'],
        channel: 'msedge'
      },
    },
  ],
});
