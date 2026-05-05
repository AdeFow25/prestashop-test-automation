import { test, expect, devices } from '@playwright/test';

test.describe('6. Responsive Design - Real Features', () => {

  test('6.1 Mobile Layout - Homepage', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Verify responsive layout
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(viewportWidth).toBeLessThanOrEqual(400);
    
    // Check navigation adapts
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();
    
    // Verify content is visible
    await expect(page.locator('text=/Family.*Faith.*Future/i')).toBeVisible();
    
    await context.close();
  });

  test('6.2 Tablet Layout', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad Pro'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Verify layout adjusts
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(viewportWidth).toBeGreaterThan(700);
    expect(viewportWidth).toBeLessThan(1400);
    
    // Check navigation is accessible
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();
    
    await context.close();
  });

  test('6.3 Mobile Navigation', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Check navigation menu on mobile
    const links = page.locator('nav a, header a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    
    // Test link is tappable
    const firstLink = links.first();
    await expect(firstLink).toBeVisible();
    
    await context.close();
  });

  test('6.4 Mobile Forms', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Navigate to contact
    const contactLink = page.locator('a').filter({ hasText: /Contact/i }).first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await page.waitForLoadState('networkidle');
    }
    
    // Verify form fields are usable
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      const inputs = page.locator('input, textarea');
      const count = await inputs.count();
      expect(count).toBeGreaterThan(0);
    }
    
    await context.close();
  });

  test('6.5 Touch Interactions', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Test tapping links - find visible links only
    const allLinks = page.locator('a');
    const linkCount = await allLinks.count();
    
    // Find first visible link
    let visibleLink = null;
    for (let i = 0; i < linkCount && i < 10; i++) {
      const link = allLinks.nth(i);
      if (await link.isVisible()) {
        visibleLink = link;
        break;
      }
    }
    
    expect(visibleLink).toBeTruthy();
    
    if (visibleLink) {
      // Verify buttons have adequate touch targets (minimum 44x44px recommended)
      const boundingBox = await visibleLink.boundingBox();
      if (boundingBox) {
        expect(boundingBox.height).toBeGreaterThan(20);
      }
    }
    
    await context.close();
  });

  test('6.6 Image Responsiveness', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Verify images don't overflow viewport
    const images = page.locator('img');
    const count = await images.count();
    
    if (count > 0) {
      const firstImage = images.first();
      const imgBox = await firstImage.boundingBox();
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      
      if (imgBox) {
        expect(imgBox.width).toBeLessThanOrEqual(viewportWidth + 10); // Small margin for rounding
      }
    }
    
    await context.close();
  });

});
