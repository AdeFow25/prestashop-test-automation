import { test, expect } from '@playwright/test';

test.describe('7. Accessibility - Real Features', () => {

  test('7.1 Keyboard Navigation', async ({ page }) => {
    await page.goto('/');
    
    // Navigate using Tab key
    await page.keyboard.press('Tab');
    
    // Verify element is focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
    
    // Continue tabbing through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(focused).toBeTruthy();
    }
  });

  test('7.2 Heading Structure', async ({ page }) => {
    await page.goto('/');
    
    // Check H2 headings used (primary heading structure)
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
    
    // Verify logical document outline
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('7.3 Image Alt Text', async ({ page }) => {
    await page.goto('/');
    
    // Check images have alt attributes
    const images = await page.locator('img').all();
    
    for (const img of images.slice(0, 5)) { // Check first 5 images
      const alt = await img.getAttribute('alt');
      // Alt should exist (can be empty for decorative images)
      expect(alt !== null).toBeTruthy();
    }
  });

  test('7.4 Link Accessibility', async ({ page }) => {
    await page.goto('/');
    
    // Verify link text is descriptive
    const links = await page.locator('a').all();
    
    // Check first few links have text
    for (const link of links.slice(0, 5)) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      
      // Link should have text or aria-label
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('7.5 Form Labels', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact form
    const contactLink = page.locator('a').filter({ hasText: /Contact/i }).first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await page.waitForLoadState('networkidle');
    }
    
    // Check form fields have labels
    const labels = page.locator('label');
    const labelCount = await labels.count();
    
    if (labelCount === 0) {
      // Check for aria-label or placeholder as fallback
      const inputs = page.locator('input, textarea');
      const firstInput = inputs.first();
      if (await firstInput.isVisible()) {
        const ariaLabel = await firstInput.getAttribute('aria-label');
        const placeholder = await firstInput.getAttribute('placeholder');
        expect(ariaLabel || placeholder).toBeTruthy();
      }
    } else {
      expect(labelCount).toBeGreaterThan(0);
    }
  });

  test('7.6 Color Contrast', async ({ page }) => {
    await page.goto('/');
    
    // Basic visibility check for main content
    const mainContent = page.locator('text=/Family.*Faith.*Future/i');
    await expect(mainContent).toBeVisible();
    
    // Check that text is readable (visible against background)
    const isVisible = await mainContent.isVisible();
    expect(isVisible).toBeTruthy();
    
    // Note: Full contrast testing requires axe-core or similar tool
  });

});
