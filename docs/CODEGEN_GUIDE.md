# Playwright Code Generation Guide

This guide shows how to use Playwright Generator (codegen) to quickly create new test scenarios for the PrestaShop demo site.

## Quick Start

### 1. Basic Code Generation
```bash
# Generate tests for PrestaShop demo
npx playwright codegen https://demo.prestashop.com/#/en/front

# Generate with specific browser
npx playwright codegen --browser=chromium https://demo.prestashop.com/#/en/front
npx playwright codegen --browser=msedge https://demo.prestashop.com/#/en/front
```

### 2. Advanced Code Generation
```bash
# Generate with custom viewport
npx playwright codegen --viewport-size=1280,720 https://demo.prestashop.com/#/en/front

# Generate with device emulation
npx playwright codegen --device="iPhone 12" https://demo.prestashop.com/#/en/front

# Generate with custom user agent
npx playwright codegen --user-agent="Custom Test Agent" https://demo.prestashop.com/#/en/front
```

### 3. Target Specific Test Scenarios
```bash
# Generate checkout flow tests
npx playwright codegen https://demo.prestashop.com/#/en/front --save-as=tests/generated-checkout.spec.ts

# Generate product search tests  
npx playwright codegen https://demo.prestashop.com/#/en/front --save-as=tests/generated-search.spec.ts

# Generate mobile tests
npx playwright codegen --device="Pixel 5" https://demo.prestashop.com/#/en/front --save-as=tests/generated-mobile.spec.ts
```

## Integration with Existing Framework

### Generated Test Enhancement Process

1. **Generate Base Test**:
   ```bash
   npx playwright codegen https://demo.prestashop.com/#/en/front --save-as=tests/generated-new-feature.spec.ts
   ```

2. **Enhance Generated Code**:
   - Replace basic selectors with iframe-aware utilities
   - Add error handling and assertions
   - Integrate with PrestaShop helper functions

3. **Example Enhancement**:
   ```typescript
   // Generated code (basic)
   await page.click('text=Add to cart');
   
   // Enhanced code (production-ready)
   await this.iframeHelper.addProductToCart(page, productName);
   ```

## Quick Test Scenarios to Record

### E-commerce Flows
1. **Product Discovery**:
   - Browse categories
   - Use search functionality
   - Filter products
   - View product details

2. **Shopping Cart**:
   - Add products to cart
   - Update quantities
   - Remove items
   - Apply discounts

3. **Checkout Process**:
   - Guest checkout
   - User registration
   - Address entry
   - Payment selection

4. **User Account**:
   - User login/logout
   - Account creation
   - Profile updates
   - Order history

### Mobile-Specific Tests
```bash
# Generate mobile checkout
npx playwright codegen --device="iPhone 12" https://demo.prestashop.com/#/en/front

# Generate tablet experience
npx playwright codegen --device="iPad Pro" https://demo.prestashop.com/#/en/front
```

## Best Practices

### 1. Use Descriptive Naming
```bash
# Good naming convention
npx playwright codegen https://demo.prestashop.com/#/en/front --save-as=tests/generated-guest-checkout-flow.spec.ts
npx playwright codegen https://demo.prestashop.com/#/en/front --save-as=tests/generated-product-search-filters.spec.ts
```

### 2. Iframe Handling
Since PrestaShop demo uses iframes, you may need to:
- Record interactions within the iframe
- Use iframe-specific selectors
- Enhance with iframe helper utilities post-generation

### 3. Generated Code Cleanup
After generation, enhance the code with:
- Proper test structure
- Error handling
- Assertions
- Helper function integration
- Jira story references

## Integration Commands

### Add to Package.json Scripts
```json
{
  "scripts": {
    "codegen": "playwright codegen https://demo.prestashop.com/#/en/front",
    "codegen:chrome": "playwright codegen --browser=chromium https://demo.prestashop.com/#/en/front",
    "codegen:edge": "playwright codegen --browser=msedge https://demo.prestashop.com/#/en/front",
    "codegen:mobile": "playwright codegen --device='iPhone 12' https://demo.prestashop.com/#/en/front",
    "codegen:tablet": "playwright codegen --device='iPad Pro' https://demo.prestashop.com/#/en/front"
  }
}
```

### Usage Examples
```bash
# Quick test generation
npm run codegen

# Browser-specific generation
npm run codegen:chrome
npm run codegen:edge

# Device-specific generation
npm run codegen:mobile
npm run codegen:tablet
```

## Workflow Integration

### 1. Rapid Prototyping
- Use codegen for quick exploration
- Record complex user journeys
- Generate baseline test structure

### 2. Production Enhancement
- Take generated code as starting point
- Integrate with iframe helpers
- Add comprehensive assertions
- Include error handling

### 3. Continuous Improvement
- Record new user scenarios
- Update existing tests with new interactions
- Validate against real user behavior

## Advanced Features

### Record with Authentication
```bash
# Generate tests with pre-login state
npx playwright codegen --save-storage=auth.json https://demo.prestashop.com/#/en/front
```

### Generate with Custom Headers
```bash
# Generate with specific headers
npx playwright codegen --extra-http-headers='{"Authorization":"Bearer token"}' https://demo.prestashop.com/#/en/front
```

### Record Network Interactions
```bash
# Generate with network recording
npx playwright codegen --record-har=test-recording.har https://demo.prestashop.com/#/en/front
```

## Tips for PrestaShop Demo

### Iframe Considerations
1. The demo runs in an iframe, so recorded selectors may need adjustment
2. Use `page.frameLocator()` for iframe interactions
3. Enhance generated code with iframe helper utilities

### Common Scenarios to Record
- Product catalog browsing
- Search functionality
- Cart operations
- Checkout flows
- User authentication
- Mobile responsiveness

### Generated Code Example
```typescript
// Basic generated test
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.prestashop.com/#/en/front');
  await page.click('text=Hummingbird printed t-shirt');
  await page.click('text=Add to cart');
});

// Enhanced production version
import { test, expect } from '@playwright/test';
import { PrestaShopIframeHelper } from '../utils/prestashop-iframe-helper';

test('Enhanced product purchase flow', async ({ page }) => {
  const iframeHelper = new PrestaShopIframeHelper();
  
  await page.goto('https://demo.prestashop.com/#/en/front');
  await iframeHelper.initializeStoreFrame(page);
  
  const products = await iframeHelper.findProducts(page, 'clothes');
  await iframeHelper.addProductToCart(page, 'Hummingbird printed t-shirt');
  
  expect(await iframeHelper.getCartItemCount(page)).toBeGreaterThan(0);
});
```

This hybrid approach gives you the best of both worlds: rapid test creation with codegen and production-ready enhanced tests with your custom framework.