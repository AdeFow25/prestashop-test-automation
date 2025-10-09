import { test, expect } from '@playwright/test';

/**
 * Extended Debug Test to examine PrestaShop demo site content
 * This will help us understand if it's an SPA or has different structure
 */

test.describe('Extended Debug Site Analysis', () => {
  
  test('should analyze page content and wait for dynamic loading', async ({ page }) => {
    console.log('Navigating to PrestaShop demo...');
    await page.goto('https://demo.prestashop.com/#/en/front');
    
    // Wait for different types of content to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Additional wait for SPA content
    
    // Check for PrestaShop-specific classes and elements
    const prestashopSelectors = [
      '.prestashop',
      '.ps-',
      '#wrapper',
      '#main',
      '.container',
      '.row',
      '.col-',
      '.header-top',
      '.header-nav'
    ];
    
    console.log('Checking PrestaShop-specific elements...');
    for (const selector of prestashopSelectors) {
      const count = await page.locator(selector).count();
      console.log(`PrestaShop selector "${selector}": ${count} elements found`);
    }
    
    // Get all visible text on the page
    const bodyText = await page.locator('body').textContent();
    console.log('Page text includes "PrestaShop":', bodyText?.includes('PrestaShop'));
    console.log('Page text includes "CLOTHES":', bodyText?.includes('CLOTHES'));
    console.log('Page text includes "Clothes":', bodyText?.includes('Clothes'));
    console.log('Page text length:', bodyText?.length);
    
    // Check for Angular/React/Vue SPA indicators
    const spaSelectors = [
      '[ng-app]',
      '[data-reactroot]',
      '[data-v-]',
      '#app',
      '.app',
      '.vue-app',
      '.react-app',
      '.angular-app'
    ];
    
    console.log('Checking SPA framework indicators...');
    for (const selector of spaSelectors) {
      const count = await page.locator(selector).count();
      console.log(`SPA selector "${selector}": ${count} elements found`);
    }
    
    // Check for any links or buttons that might navigate to products
    const linkSelectors = [
      'a',
      'button',
      '.btn',
      '.link'
    ];
    
    console.log('Checking interactive elements...');
    for (const selector of linkSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Interactive selector "${selector}": ${count} elements found`);
    }
    
    // Get all link hrefs to understand navigation structure
    const links = await page.locator('a').all();
    console.log('Found links:');
    for (let i = 0; i < Math.min(links.length, 10); i++) {
      try {
        const href = await links[i].getAttribute('href');
        const text = await links[i].textContent();
        console.log(`Link ${i}: "${text}" -> ${href}`);
      } catch (error) {
        console.log(`Link ${i}: Error reading link`);
      }
    }
    
    // Try to wait for specific PrestaShop content
    try {
      await page.waitForSelector('text=PrestaShop', { timeout: 5000 });
      console.log('Found PrestaShop text on page');
    } catch (error) {
      console.log('PrestaShop text not found within timeout');
    }
    
    // Check if we need to navigate through a different URL structure
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);
    
    // Take screenshot for manual inspection
    await page.screenshot({ path: 'debug-extended.png', fullPage: true });
  });

  test('should try alternative navigation approaches', async ({ page }) => {
    console.log('Testing alternative navigation...');
    
    // Try direct URL access to product categories
    const testUrls = [
      'https://demo.prestashop.com/',
      'https://demo.prestashop.com/en/',
      'https://demo.prestashop.com/en/3-clothes',
      'https://demo.prestashop.com/en/2-home'
    ];
    
    for (const url of testUrls) {
      try {
        console.log(`Testing URL: ${url}`);
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        
        const title = await page.title();
        console.log(`Title for ${url}: ${title}`);
        
        // Check for products on this page
        const productSelectors = [
          '.product',
          '.product-miniature',
          'article.product-miniature',
          '.js-product-miniature'
        ];
        
        for (const selector of productSelectors) {
          const count = await page.locator(selector).count();
          if (count > 0) {
            console.log(`SUCCESS: Found ${count} products with selector "${selector}" on ${url}`);
          }
        }
        
      } catch (error) {
        console.log(`Error testing ${url}: ${error}`);
      }
    }
  });
});