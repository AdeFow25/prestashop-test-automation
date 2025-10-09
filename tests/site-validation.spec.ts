import { test, expect } from '@playwright/test';

/**
 * Basic validation test for PrestaShop demo site
 * Validates the test setup and site accessibility
 */

test.describe('PrestaShop Demo Validation', () => {

  test('should load homepage successfully', async ({ page }) => {
    console.log('🚀 Testing basic site access...');
    
    // Navigate to PrestaShop demo homepage
    await page.goto('https://demo.prestashop.com/#/en/front');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Verify page title contains PrestaShop
    await expect(page).toHaveTitle(/PrestaShop/);
    
    // Verify key elements are visible
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Homepage loaded successfully');
    
    // Take a screenshot for verification
    await page.screenshot({ path: 'test-results/homepage-validation.png' });
  });

  test('should verify header elements', async ({ page }) => {
    console.log('🔍 Testing header elements...');
    
    await page.goto('https://demo.prestashop.com/#/en/front');
    await page.waitForLoadState('networkidle');
    
    // Check for search box
    const searchBox = page.locator('input[type="search"], .search, #search_widget');
    await expect(searchBox.first()).toBeVisible();
    
    // Check for cart icon
    const cartIcon = page.locator('.cart, .shopping-cart, [data-cart]');
    await expect(cartIcon.first()).toBeVisible();
    
    // Check for sign in link
    const signInLink = page.locator('text=Sign in, .user-account, .account');
    await expect(signInLink.first()).toBeVisible();
    
    console.log('✅ Header elements verified');
  });

  test('should verify products are displayed', async ({ page }) => {
    console.log('🛍️ Testing product display...');
    
    await page.goto('https://demo.prestashop.com/#/en/front');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit more for dynamic content
    await page.waitForTimeout(3000);
    
    // Check for product elements
    const products = page.locator('.product, .product-item, [data-product]');
    await expect(products.first()).toBeVisible();
    
    // Count products
    const productCount = await products.count();
    console.log(`Found ${productCount} products on homepage`);
    
    // Verify at least one product has an image
    const productImage = page.locator('.product img, .product-image img');
    await expect(productImage.first()).toBeVisible();
    
    console.log('✅ Products displayed correctly');
  });

});