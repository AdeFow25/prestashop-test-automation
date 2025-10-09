import { test, expect } from '@playwright/test';

/**
 * Test to explore the actual PrestaShop front office
 * Based on the finding that we need to click "Explore front office" link
 */

test.describe('PrestaShop Front Office Exploration', () => {
  
  test('should navigate to front office and find products', async ({ page }) => {
    console.log('Navigating to PrestaShop demo landing page...');
    await page.goto('https://demo.prestashop.com/');
    await page.waitForLoadState('networkidle');
    
    // Click on "Explore front office" link
    console.log('Clicking "Explore front office" link...');
    await page.locator('text=Explore front office').click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Wait for SPA to load content
    
    console.log('Current URL:', page.url());
    
    // Now check for products and standard e-commerce elements
    const productSelectors = [
      '.product',
      '.product-miniature', 
      'article.product-miniature',
      '.js-product-miniature',
      '.product-item',
      '.featured-products .product',
      '.product-container'
    ];
    
    console.log('Checking for products on front office...');
    for (const selector of productSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Product selector "${selector}": ${count} elements found`);
      
      if (count > 0) {
        // Get the first product details
        const firstProduct = page.locator(selector).first();
        const productText = await firstProduct.textContent();
        console.log(`First product text: ${productText?.substring(0, 100)}...`);
      }
    }
    
    // Check for navigation elements
    const navSelectors = [
      '.main-menu',
      '.menu',
      'nav',
      '.header-nav',
      '.navbar',
      '.top-menu'
    ];
    
    console.log('Checking for navigation elements...');
    for (const selector of navSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Navigation selector "${selector}": ${count} elements found`);
    }
    
    // Check for category links like CLOTHES
    const categorySelectors = [
      'text=CLOTHES',
      'text=Clothes',
      '.category',
      '.category-link',
      '.menu-item'
    ];
    
    console.log('Checking for category navigation...');
    for (const selector of categorySelectors) {
      const count = await page.locator(selector).count();
      console.log(`Category selector "${selector}": ${count} elements found`);
    }
    
    // Check for cart elements
    const cartSelectors = [
      '.cart',
      '.shopping-cart',
      '.blockcart',
      '.cart-icon',
      '#blockcart-modal'
    ];
    
    console.log('Checking for cart elements...');
    for (const selector of cartSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Cart selector "${selector}": ${count} elements found`);
    }
    
    // Get page text to see what's available
    const bodyText = await page.locator('body').textContent();
    console.log('Page text includes "CLOTHES":', bodyText?.includes('CLOTHES'));
    console.log('Page text includes "Add to cart":', bodyText?.includes('Add to cart'));
    console.log('Page text includes "Cart":', bodyText?.includes('Cart'));
    
    // Take a screenshot for manual inspection
    await page.screenshot({ path: 'front-office.png', fullPage: true });
  });

  test('should explore direct front office URL', async ({ page }) => {
    console.log('Testing direct navigation to front office URL...');
    
    // Try the direct hash URL we found
    await page.goto('https://demo.prestashop.com/#/en/front');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000); // Extended wait for SPA
    
    console.log('Current URL:', page.url());
    
    // Check page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Look for any iframes that might contain the actual shop
    const iframes = await page.locator('iframe').count();
    console.log('Number of iframes found:', iframes);
    
    if (iframes > 0) {
      console.log('Checking iframe content...');
      const frame = page.frameLocator('iframe').first();
      
      // Check for products inside iframe
      const productSelectors = [
        '.product',
        '.product-miniature',
        'article.product-miniature'
      ];
      
      for (const selector of productSelectors) {
        try {
          const count = await frame.locator(selector).count();
          console.log(`Iframe product selector "${selector}": ${count} elements found`);
        } catch (error) {
          console.log(`Error checking iframe selector "${selector}":`, error);
        }
      }
    }
    
    // Look for any elements that indicate loading
    const loadingSelectors = [
      '.loading',
      '.loader',
      '.spinner',
      'text=Loading',
      '.preloader'
    ];
    
    console.log('Checking for loading indicators...');
    for (const selector of loadingSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Loading selector "${selector}": ${count} elements found`);
    }
  });
});