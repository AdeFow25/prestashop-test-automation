import { test, expect } from '@playwright/test';

/**
 * PRESTA-17: Guest Checkout Flow
 * Test guest checkout process including address entry, shipping, and payment
 * 
 * Epic: PRESTA-16 - Checkout Process
 * Based on validated test plan section 6.1
 */

test.describe('Guest Checkout Flow (PRESTA-17)', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to PrestaShop demo landing page first
    await page.goto('https://demo.prestashop.com/');
    await page.waitForLoadState('networkidle');
    
    // Try to navigate to the front office through iframe
    try {
      // Check if we can find the iframe with the actual store
      const iframe = page.frameLocator('iframe[name="framelive"]');
      const frameBody = iframe.locator('body');
      
      // If iframe is available, use it
      if (await frameBody.isVisible()) {
        console.log('Using iframe approach for PrestaShop demo');
        return;
      }
    } catch (error) {
      console.log('Iframe not available, using direct approach');
    }
    
    // Fallback: Navigate to the hash URL
    await page.goto('https://demo.prestashop.com/#/en/front');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000); // Allow SPA to load
    
    // Wait for page to load completely
    await expect(page.locator('body')).toBeVisible();
  });

  test('should complete guest checkout successfully', async ({ page }) => {
    // Step 1: Add items to cart
    console.log('Step 1: Adding product to cart...');
    
    // Navigate to a product (click on first product on homepage)
    await page.locator('.product').first().click();
    await page.waitForLoadState('networkidle');
    
    // Add product to cart
    await page.locator('button:has-text("Add to cart")').click();
    
    // Verify cart icon updates
    await expect(page.locator('.cart-products-count')).toContainText('1');
    
    // Step 2: Proceed to checkout
    console.log('Step 2: Proceeding to checkout...');
    
    // Click on cart icon/proceed to checkout
    await page.locator('.cart-icon, .shopping-cart').click();
    await page.locator('text=Proceed to checkout').click();
    
    // Step 3: Choose guest checkout option
    console.log('Step 3: Selecting guest checkout...');
    
    // Wait for checkout page to load
    await page.waitForLoadState('networkidle');
    
    // Look for guest checkout option and select it
    const guestCheckoutOption = page.locator('text=Order as a guest, text=Guest, input[value="guest"]').first();
    if (await guestCheckoutOption.isVisible()) {
      await guestCheckoutOption.click();
    }
    
    // Step 4: Fill in shipping address information
    console.log('Step 4: Filling shipping address...');
    
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: `test.${Date.now()}@example.com`,
      address: '123 Test Street',
      postalCode: '12345',
      city: 'Test City'
    };
    
    // Fill address form fields (selectors may vary)
    await page.fill('input[name="firstname"], #field-firstname', testData.firstName);
    await page.fill('input[name="lastname"], #field-lastname', testData.lastName);
    await page.fill('input[name="email"], #field-email', testData.email);
    await page.fill('input[name="address1"], #field-address1', testData.address);
    await page.fill('input[name="postcode"], #field-postcode', testData.postalCode);
    await page.fill('input[name="city"], #field-city', testData.city);
    
    // Select country if dropdown exists
    const countryDropdown = page.locator('select[name="id_country"], #field-id_country');
    if (await countryDropdown.isVisible()) {
      await countryDropdown.selectOption('United States');
    }
    
    // Continue to next step
    await page.locator('button:has-text("Continue"), button:has-text("Next")').click();
    
    // Step 5: Select shipping method
    console.log('Step 5: Selecting shipping method...');
    
    await page.waitForLoadState('networkidle');
    
    // Select first available shipping method
    const shippingOption = page.locator('input[name="delivery_option"], .delivery-option').first();
    if (await shippingOption.isVisible()) {
      await shippingOption.click();
    }
    
    // Continue to payment
    await page.locator('button:has-text("Continue"), button:has-text("Next")').click();
    
    // Step 6: Choose payment method (demo)
    console.log('Step 6: Selecting payment method...');
    
    await page.waitForLoadState('networkidle');
    
    // Select payment method (usually bank wire or similar in demo)
    const paymentOption = page.locator('input[name="payment-option"], .payment-option').first();
    if (await paymentOption.isVisible()) {
      await paymentOption.click();
    }
    
    // Accept terms and conditions if present
    const termsCheckbox = page.locator('input[name="conditions_to_approve"], #conditions_to_approve\\[terms-and-conditions\\]');
    if (await termsCheckbox.isVisible()) {
      await termsCheckbox.check();
    }
    
    // Step 7: Review order summary
    console.log('Step 7: Reviewing order summary...');
    
    // Verify order summary contains product
    await expect(page.locator('.cart-summary, .order-summary')).toBeVisible();
    
    // Step 8: Complete checkout process
    console.log('Step 8: Completing checkout...');
    
    // Click place order/confirm order
    await page.locator('button:has-text("Place order"), button:has-text("Confirm"), button:has-text("Order with an obligation to pay")').click();
    
    // Wait for order confirmation
    await page.waitForLoadState('networkidle');
    
    // Verify order confirmation appears
    await expect(page.locator('text=Your order is confirmed, text=Order confirmation, .order-confirmation')).toBeVisible();
    
    console.log('✅ Guest checkout completed successfully!');
  });

  test('should validate required fields in guest checkout', async ({ page }) => {
    // Add product to cart first
    await page.locator('.product').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('button:has-text("Add to cart")').click();
    
    // Proceed to checkout
    await page.locator('.cart-icon, .shopping-cart').click();
    await page.locator('text=Proceed to checkout').click();
    await page.waitForLoadState('networkidle');
    
    // Try to continue without filling required fields
    await page.locator('button:has-text("Continue"), button:has-text("Next")').click();
    
    // Verify validation errors appear
    await expect(page.locator('.alert-danger, .error, .field-error')).toBeVisible();
    
    console.log('✅ Form validation working correctly');
  });

  test('should handle invalid email format in guest checkout', async ({ page }) => {
    // Add product to cart first
    await page.locator('.product').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('button:has-text("Add to cart")').click();
    
    // Proceed to checkout
    await page.locator('.cart-icon, .shopping-cart').click();
    await page.locator('text=Proceed to checkout').click();
    await page.waitForLoadState('networkidle');
    
    // Fill form with invalid email
    await page.fill('input[name="email"], #field-email', 'invalid-email');
    await page.fill('input[name="firstname"], #field-firstname', 'John');
    await page.fill('input[name="lastname"], #field-lastname', 'Doe');
    
    // Try to continue
    await page.locator('button:has-text("Continue"), button:has-text("Next")').click();
    
    // Verify email validation error
    await expect(page.locator('text=Invalid email, .email-error, .field-error')).toBeVisible();
    
    console.log('✅ Email validation working correctly');
  });

});