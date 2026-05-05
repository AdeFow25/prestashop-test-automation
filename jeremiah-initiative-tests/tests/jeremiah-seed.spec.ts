import { test, expect } from '@playwright/test';

test.describe('Jeremiah Initiative Website Tests', () => {
  test('seed - navigate to homepage', async ({ page }) => {
    await page.goto('https://www.jeremiahinitiative.org');
    await expect(page).toHaveTitle(/Jeremiah Initiative/);
  });
});
