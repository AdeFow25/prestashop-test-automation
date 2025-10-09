import { test, expect } from '@playwright/test';

/**
 * Test to explore PrestaShop content inside iframes
 * The demo appears to use iframes to embed the actual shop
 */

test.describe('PrestaShop Iframe Content Exploration', () => {
  
  test('should find and explore iframe with PrestaShop content', async ({ page }) => {
    console.log('Navigating to PrestaShop demo front office...');
    await page.goto('https://demo.prestashop.com/#/en/front');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Check all iframes
    const iframes = await page.locator('iframe').all();
    console.log(`Found ${iframes.length} iframes`);
    
    for (let i = 0; i < iframes.length; i++) {
      console.log(`\n--- Exploring iframe ${i} ---`);
      
      try {
        const iframe = iframes[i];
        const src = await iframe.getAttribute('src');
        console.log(`Iframe ${i} src: ${src}`);
        
        // Get the frame locator for this iframe
        const frame = page.frameLocator(`iframe:nth-of-type(${i + 1})`);
        
        // Wait a bit for frame content to load
        await page.waitForTimeout(2000);
        
        // Try to get frame title or basic content
        try {
          const frameBody = frame.locator('body');
          const isVisible = await frameBody.isVisible();
          console.log(`Iframe ${i} body visible: ${isVisible}`);
          
          if (isVisible) {
            // Check for PrestaShop elements in this frame
            const prestashopElements = [
              '.product',
              '.product-miniature',
              'article.product-miniature',
              '.js-product-miniature',
              '.featured-products',
              '.header',
              '.menu',
              '.cart',
              'text=CLOTHES',
              'text=Add to cart'
            ];
            
            for (const selector of prestashopElements) {
              try {
                const count = await frame.locator(selector).count();
                if (count > 0) {
                  console.log(`Iframe ${i} - Found ${count} elements for "${selector}"`);
                }
              } catch (error) {
                // Ignore errors for individual selectors
              }
            }
            
            // Try to get some text content from the frame
            try {
              const frameText = await frameBody.textContent();
              const textPreview = frameText?.substring(0, 200) || '';
              console.log(`Iframe ${i} text preview: ${textPreview}...`);
              
              // Check for key e-commerce indicators
              const indicators = ['PrestaShop', 'CLOTHES', 'Cart', 'Add to cart', 'Price', '$'];
              for (const indicator of indicators) {
                if (frameText?.includes(indicator)) {
                  console.log(`Iframe ${i} contains "${indicator}"`);
                }
              }
            } catch (error) {
              console.log(`Error reading text from iframe ${i}:`, error.message);
            }
          }
        } catch (error) {
          console.log(`Error accessing iframe ${i} content:`, error.message);
        }
        
      } catch (error) {
        console.log(`Error with iframe ${i}:`, error.message);
      }
    }
    
    // Take screenshot for manual inspection
    await page.screenshot({ path: 'iframe-exploration.png', fullPage: true });
  });

  test('should test direct PrestaShop store URL if found', async ({ page }) => {
    console.log('Testing potential direct PrestaShop URLs...');
    
    // Common PrestaShop demo URLs to try
    const testUrls = [
      'https://demo.prestashop.com/front/index.php',
      'https://demo.prestashop.com/demo/index.php',
      'https://demo.prestashop.com/shop/index.php',
      'https://demo.prestashop.com/store/index.php'
    ];
    
    for (const url of testUrls) {
      try {
        console.log(`\nTesting URL: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
        
        const title = await page.title();
        console.log(`Title: ${title}`);
        
        // Quick check for products
        const productCount = await page.locator('.product-miniature, article.product-miniature, .product').count();
        console.log(`Products found: ${productCount}`);
        
        if (productCount > 0) {
          console.log(`SUCCESS: Found working PrestaShop store at ${url}`);
          
          // Take screenshot of working store
          await page.screenshot({ path: `working-store-${Date.now()}.png`, fullPage: true });
          
          // Test basic interactions
          const firstProduct = page.locator('.product-miniature, article.product-miniature, .product').first();
          await firstProduct.click();
          await page.waitForLoadState('networkidle');
          
          console.log('Successfully clicked on first product');
          console.log('Current URL after product click:', page.url());
          
          break; // Stop testing once we find a working URL
        }
        
      } catch (error) {
        console.log(`Error with ${url}: ${error.message}`);
      }
    }
  });
});