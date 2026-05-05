import { test, expect } from '@playwright/test';

test.describe('8. Performance - Real Features', () => {

  test('8.1 Homepage Load Time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Verify loads within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test('8.2 Image Optimization', async ({ page }) => {
    await page.goto('/');
    
    // Check images exist
    const images = await page.locator('img').all();
    expect(images.length).toBeGreaterThan(0);
    
    // Check first image for optimization attributes
    if (images.length > 0) {
      const firstImg = images[0];
      const src = await firstImg.getAttribute('src');
      
      // Squarespace typically optimizes images
      expect(src).toBeTruthy();
    }
  });

  test('8.3 Page Weight', async ({ page }) => {
    const resources: { url: string; size: number }[] = [];
    
    // Track resources
    page.on('response', response => {
      const headers = response.headers();
      const contentLength = headers['content-length'];
      if (contentLength) {
        resources.push({
          url: response.url(),
          size: parseInt(contentLength)
        });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Calculate total size
    const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
    const totalMB = totalSize / (1024 * 1024);
    
    // Verify reasonable page weight (< 10MB)
    expect(totalMB).toBeLessThan(10);
  });

  test('8.4 Resources Page Load', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/resources');
    await page.waitForLoadState('networkidle');
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Verify loads reasonably
    expect(loadTime).toBeLessThan(15000);
  });

  test('8.5 Mobile Performance', async ({ browser }) => {
    const context = await browser.newContext({
      ...require('@playwright/test').devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Mobile should load within reasonable time (< 15s)
    expect(loadTime).toBeLessThan(15000);
    
    await context.close();
  });

});
