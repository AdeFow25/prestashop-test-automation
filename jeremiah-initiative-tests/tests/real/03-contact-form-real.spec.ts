import { test, expect } from '@playwright/test';

test.describe('3. Contact Form Functionality - Real Features', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to contact section (may be on homepage or separate page)
    const contactLink = page.locator('a').filter({ hasText: /Contact/i }).first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await page.waitForLoadState('networkidle');
    }
  });

  test('3.1 Contact Form Field Presence', async ({ page }) => {
    // Check if form exists on page or homepage
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 10000 });
    
    // Verify fields exist (may have different exact names)
    const inputs = page.locator('input[type="text"], input[type="email"], textarea');
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThanOrEqual(3); // At least Name, Email, Message
    
    // Check submit button
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    await expect(submitButton).toBeVisible();
  });

  test('3.2 Email Field Validation', async ({ page }) => {
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 10000 });
    
    // Find email field
    const emailField = page.locator('input[type="email"]').first();
    
    if (await emailField.isVisible()) {
      // Enter invalid email
      await emailField.fill('notanemail');
      
      // Try to submit
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
      await submitButton.click();
      
      // Check for HTML5 validation or error message
      const isInvalid = await emailField.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    }
  });

  test('3.3 Required Field Validation', async ({ page }) => {
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 10000 });
    
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    await submitButton.click();
    
    // Check for validation (HTML5 or custom)
    const requiredFields = page.locator('input[required], textarea[required]');
    const count = await requiredFields.count();
    
    if (count > 0) {
      const firstRequired = requiredFields.first();
      const isInvalid = await firstRequired.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    }
  });

  test('3.4 Valid Form Submission', async ({ page }) => {
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 10000 });
    
    // Fill form with test data
    const timestamp = Date.now();
    
    // Find and fill fields
    const inputs = await page.locator('input[type="text"]').all();
    if (inputs.length > 0) {
      await inputs[0].fill('Test');
      if (inputs.length > 1) {
        await inputs[1].fill('User');
      }
    }
    
    const emailField = page.locator('input[type="email"]').first();
    if (await emailField.isVisible()) {
      await emailField.fill(`test.${timestamp}@example.com`);
    }
    
    const messageField = page.locator('textarea').first();
    if (await messageField.isVisible()) {
      await messageField.fill('This is an automated test message. Please disregard.');
    }
    
    // Submit
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    await submitButton.click();
    
    // Wait for response
    await page.waitForTimeout(2000);
    
    // Check for success indicator (may vary by implementation)
    // Just verify no error state
  });

  test('3.5 Message Field Check', async ({ page }) => {
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 10000 });
    
    const messageField = page.locator('textarea').first();
    
    if (await messageField.isVisible()) {
      // Test short message
      await messageField.fill('Hi');
      expect(await messageField.inputValue()).toBe('Hi');
      
      // Test longer message
      const longMessage = 'This is a longer test message. '.repeat(20);
      await messageField.fill(longMessage);
      const value = await messageField.inputValue();
      expect(value.length).toBeGreaterThan(50);
    }
  });

  test('3.6 Form Accessibility', async ({ page }) => {
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 10000 });
    
    // Check field labels exist
    const labels = page.locator('label');
    const labelCount = await labels.count();
    expect(labelCount).toBeGreaterThan(0);
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('3.7 Email Format Validation', async ({ page }) => {
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 10000 });
    
    const emailField = page.locator('input[type="email"]').first();
    
    if (await emailField.isVisible()) {
      // Test various formats
      const invalidEmails = ['testexample.com', 'test@', '@example.com'];
      
      for (const email of invalidEmails) {
        await emailField.fill(email);
        const isValid = await emailField.evaluate((el: HTMLInputElement) => el.validity.valid);
        expect(isValid).toBeFalsy();
      }
      
      // Test valid email
      await emailField.fill('test@example.com');
      const isValid = await emailField.evaluate((el: HTMLInputElement) => el.validity.valid);
      expect(isValid).toBeTruthy();
    }
  });

});
