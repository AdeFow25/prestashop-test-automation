import { test, expect } from '@playwright/test';

/**
 * Test the actual PrestaShop store URL found in iframe
 * URL: https://wanted-wealth.demo.prestashop.com/en/
 */

test.describe('Actual PrestaShop Store Testing', () => {
  
  test('should find products on the real PrestaShop store', async ({ page }) => {
    console.log('Testing the actual PrestaShop store URL...');
    await page.goto('https://wanted-wealth.demo.prestashop.com/en/');
    await page.waitForLoadState('networkidle');
    
    // Check page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check for products using various selectors
    const productSelectors = [
      '.product',
      '.product-miniature',
      'article.product-miniature',
      '.js-product-miniature',
      '.featured-products .product',
      '.product-item'
    ];
    
    console.log('Checking for products...');
    let workingSelector = '';
    for (const selector of productSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Selector "${selector}": ${count} elements found`);
      
      if (count > 0 && !workingSelector) {
        workingSelector = selector;
        console.log(`Using "${selector}" as working product selector`);
      }
    }
    
    if (workingSelector) {
      // Test clicking on first product
      console.log('Testing product click...');
      const firstProduct = page.locator(workingSelector).first();
      const productText = await firstProduct.textContent();
      console.log('First product text:', productText?.substring(0, 100));
      
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      
      console.log('Product page URL:', page.url());
      
      // Check for "Add to cart" button
      const addToCartSelectors = [
        'button:has-text("Add to cart")',
        '.add-to-cart',
        '.btn-add-to-cart',
        'input[type="submit"][value*="cart"]'
      ];
      
      for (const selector of addToCartSelectors) {
        const count = await page.locator(selector).count();
        console.log(`Add to cart selector "${selector}": ${count} elements found`);
      }
    }
    
    // Go back to homepage and check navigation
    await page.goto('https://wanted-wealth.demo.prestashop.com/en/');
    await page.waitForLoadState('networkidle');
    
    // Check for category navigation
    const categorySelectors = [
      'text=CLOTHES',
      'text=Clothes',
      '.category',
      '.main-menu a',
      '.menu a'
    ];
    
    console.log('Checking for category navigation...');
    for (const selector of categorySelectors) {
      const count = await page.locator(selector).count();
      console.log(`Category selector "${selector}": ${count} elements found`);
    }
    
    // Check for cart
    const cartSelectors = [
      '.cart',
      '.shopping-cart',
      '.blockcart',
      '.cart-icon',
      '#blockcart-modal',
      '.header .cart'
    ];
    
    console.log('Checking for cart elements...');
    for (const selector of cartSelectors) {
      const count = await page.locator(selector).count();
      console.log(`Cart selector "${selector}": ${count} elements found`);
    }
    
    // Take screenshot of working store
    await page.screenshot({ path: 'working-prestashop-store.png', fullPage: true });
  });

  test('should test a complete product-to-cart flow', async ({ page }) => {
    console.log('Testing complete product to cart flow...');
    await page.goto('https://wanted-wealth.demo.prestashop.com/en/');
    await page.waitForLoadState('networkidle');
    
    // Find products and select the working selector
    const productSelectors = [
      'article.product-miniature',
      '.product-miniature',
      '.product'
    ];
    
    let workingSelector = '';
    for (const selector of productSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        workingSelector = selector;
        console.log(`Using "${selector}" (${count} products found)`);
        break;
      }
    }
    
    if (workingSelector) {
      // Click on first product
      await page.locator(workingSelector).first().click();
      await page.waitForLoadState('networkidle');
      
      // Look for Add to cart button
      const addToCartSelectors = [
        'button:has-text("Add to cart")',
        '.add-to-cart',
        '.btn-add-to-cart',
        'button.btn-primary'
      ];
      
      for (const selector of addToCartSelectors) {
        const count = await page.locator(selector).count();
        if (count > 0) {
          console.log(`Found Add to Cart button with selector: ${selector}`);
          try {
            await page.locator(selector).first().click();
            await page.waitForTimeout(2000);
            
            // Check if cart was updated
            const cartCountSelectors = [
              '.cart-products-count',
              '.cart-count',
              '.cart .count'
            ];
            
            for (const cartSelector of cartCountSelectors) {
              const cartCount = await page.locator(cartSelector).count();
              if (cartCount > 0) {
                const cartText = await page.locator(cartSelector).textContent();
                console.log(`Cart text: ${cartText}`);
              }
            }
            
            console.log('Successfully tested add to cart flow');
            break;
          } catch (error) {
            console.log(`Failed to click ${selector}:`, error);
          }
        }
      }
    }
  });
});