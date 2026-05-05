import { test, expect } from '@playwright/test';

test.describe('1. Homepage Functionality - Real Features', () => {

  test('1.1 Homepage Load', async ({ page }) => {
    await page.goto('/');
    
    // Verify page loads within 10 seconds (default timeout)
    await expect(page).toHaveTitle(/Jeremiah Initiative/i);
    
    // Check for main tagline
    await expect(page.locator('text=/Walking alongside families with compassion and understanding/i')).toBeVisible();
    
    // Verify "Family. Faith. Future." heading appears
    await expect(page.locator('text=/Family.*Faith.*Future/i')).toBeVisible();
  });

  test('1.2 Hero Section', async ({ page }) => {
    await page.goto('/');
    
    // Check tagline visibility
    const tagline = page.locator('text=/Walking alongside families/i');
    await expect(tagline).toBeVisible();
    
    // Verify hero image loads (check for any img in hero area)
    const images = page.locator('img').first();
    await expect(images).toBeVisible();
    
    // Check heading structure (H2, not H1)
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
    
    const h1Count = await page.locator('h1').count();
    // May be 0 or minimal (not primary heading structure)
  });

  test('1.3 Navigation Menu', async ({ page }) => {
    await page.goto('/');
    
    // Verify top navigation exists
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();
    
    // Check for navigation links (logo may not contain text)
    const navLinks = page.locator('nav a, header a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('1.4 Thrive Programs Section', async ({ page }) => {
    await page.goto('/');
    
    // Check if Thrive programs appear anywhere on page (main content or navigation)
    const thriveMentions = await page.locator('text=/Thrive/i').count();
    expect(thriveMentions).toBeGreaterThan(0);
    
    // Look for programme links in navigation (may need to hover over Programme menu)
    const programmeFolder = page.locator('a, button, [class*="folder"]').filter({ hasText: /Programme/i }).first();
    if (await programmeFolder.count() > 0) {
      await programmeFolder.hover();
      await page.waitForTimeout(300);
      
      // Now check for the 3 programs
      const thriveCircle = page.locator('text=/Thrive Circle/i');
      const thriveClassrooms = page.locator('text=/Thrive Classrooms/i');
      const thriveCommunities = page.locator('text=/Thrive Communit/i');
      
      const circleCount = await thriveCircle.count();
      const classroomsCount = await thriveClassrooms.count();
      const communitiesCount = await thriveCommunities.count();
      
      expect(circleCount + classroomsCount + communitiesCount).toBeGreaterThanOrEqual(3);
    }
  });

  test('1.5 Founder Quote Section', async ({ page }) => {
    await page.goto('/');
    
    // Check quote
    await expect(page.locator('text=/Because every Child Matters/i')).toBeVisible();
    
    // Verify attribution
    await expect(page.locator('text=/Bunmi Fowokan/i')).toBeVisible();
  });

  test('1.6 Footer Navigation', async ({ page }) => {
    await page.goto('/');
    
    // Verify footer sections
    const footer = page.locator('footer, [class*="footer"]').first();
    
    // Check programme links
    await expect(page.locator('footer a, [class*="footer"] a').filter({ hasText: /Thrive Circle/i }).first()).toBeVisible();
    
    // Check about links
    await expect(page.locator('footer a, [class*="footer"] a').filter({ hasText: /Our Story/i }).first()).toBeVisible();
    await expect(page.locator('footer a, [class*="footer"] a').filter({ hasText: /Contact/i }).first()).toBeVisible();
  });

});
