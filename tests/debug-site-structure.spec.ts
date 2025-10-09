import { test, expect } from '@playwright/test';

/**
 * Debug Test to understand PrestaShop demo site structure
 * This will help us identify the correct selectors for products
 */

test.describe('Debug Site Structure', () => {
  
  test('should explore homepage structure', async ({ page }) => {
    console.log('Navigating to PrestaShop demo...');
    await page.goto('https://demo.prestashop.com/#/en/front');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot to see the page
    await page.screenshot({ path: 'debug-homepage.png', fullPage: true });
    
    // Check if the page loads correctly
    await expect(page).toHaveTitle(/PrestaShop/);
    
    // Look for various possible product selectors
    const productSelectors = [
      '.product',
      '.product-item',
      '.product-miniature',
      '[data-id-product]',
      '.js-product',
      '.thumbnail-container',
      'article.product-miniature',
      '.product-container'
    ];
    
    console.log('Checking for product elements...');
    for (const selector of productSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Selector "${selector}": ${count} elements found`);
    }
    
    // Check for common navigation elements
    const navElements = [
      'nav',
      '.header',
      '.menu',
      '.navigation',
      '.navbar',
      '#header'
    ];
    
    console.log('Checking navigation elements...');
    for (const selector of navElements) {
      const count = await page.locator(selector).count();
      console.log(`Navigation selector "${selector}": ${count} elements found`);
    }
    
    // Get page content to understand structure
    const bodyContent = await page.locator('body').innerHTML();
    console.log('Page loaded successfully. Body content length:', bodyContent.length);
    
    // Look for cart-related elements
    const cartSelectors = [
      '.cart',
      '.shopping-cart',
      '.cart-icon',
      '[data-cart]',
      '.blockcart'
    ];
    
    console.log('Checking cart elements...');
    for (const selector of cartSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Cart selector "${selector}": ${count} elements found`);
    }
  });

  test('should find products on categories page', async ({ page }) => {
    console.log('Navigating to clothes category...');
    await page.goto('https://demo.prestashop.com/#/en/front');
    await page.waitForLoadState('networkidle');
    
    // Try to find and click on categories/clothes
    const categorySelectors = [
      'text=CLOTHES',
      'text=Clothes', 
      '.category',
      '.menu-item',
      'a:has-text("Clothes")'
    ];
    
    for (const selector of categorySelectors) {
      const count = await page.locator(selector).count();
      console.log(`Category selector "${selector}": ${count} elements found`);
      
      if (count > 0) {
        try {
          await page.locator(selector).first().click();
          await page.waitForLoadState('networkidle');
          console.log(`Successfully clicked on ${selector}`);
          break;
        } catch (error) {
          console.log(`Failed to click on ${selector}:`, error.message);
        }
      }
    }
    
    // Now check for products on category page
    const productSelectors = [
      '.product',
      '.product-item',
      '.product-miniature',
      '[data-id-product]',
      '.js-product',
      '.thumbnail-container',
      'article.product-miniature'
    ];
    
    console.log('Checking for products on category page...');
    for (const selector of productSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Product selector "${selector}": ${count} elements found`);
    }
  });
});