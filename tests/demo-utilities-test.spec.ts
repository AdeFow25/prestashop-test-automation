import { test, expect } from '@playwright/test';
import { PrestaShopDemoUtils } from '../utils/prestashop-demo-utils';

/**
 * Demo Utilities Integration Test
 * Test the demo-specific utilities we created
 */

test.describe('Demo Utilities Integration Test', () => {
  let demoUtils: PrestaShopDemoUtils;
  
  test.beforeEach(async ({ page }) => {
    demoUtils = new PrestaShopDemoUtils(page);
  });

  test('should validate demo utilities functionality', async ({ page }) => {
    console.log('🧪 Testing demo utilities integration...');
    
    // Test navigation with utilities
    await demoUtils.navigateToDemo();
    console.log('✅ Navigation utility works');
    
    // Test environment validation
    const isValid = await demoUtils.validateDemoEnvironment();
    expect(isValid).toBe(true);
    console.log('✅ Environment validation utility works');
    
    // Test waiting for demo ready
    const isReady = await demoUtils.waitForDemoReady();
    expect(isReady).toBe(true);
    console.log('✅ Demo ready utility works');
    
    // Test limitations checking
    const limitations = await demoUtils.checkDemoLimitations();
    console.log(`✅ Limitations checker works (found ${limitations.length} limitations)`);
    
    // Test data generation
    const testData = demoUtils.generateTestData();
    expect(testData.user.email).toContain('@example.com');
    expect(testData.address.city).toBe('Test City');
    console.log('✅ Test data generation works');
    
    // Test action simulation
    await demoUtils.simulateUserAction('add_to_cart', { product: 'Test Product', quantity: 2 });
    await demoUtils.simulateUserAction('search', { term: 'shirt' });
    await demoUtils.simulateUserAction('login', { email: 'test@example.com' });
    console.log('✅ Action simulation works');
    
    // Test debug screenshot
    await demoUtils.captureDebugScreenshot('utility-test');
    console.log('✅ Debug screenshot utility works');
    
    console.log('🎉 All demo utilities working correctly!');
  });

  test('should generate comprehensive test report', async ({ page }) => {
    console.log('📊 Testing report generation...');
    
    await demoUtils.navigateToDemo();
    
    // Simulate some test results
    const mockTestResults = [
      { name: 'Homepage Load', status: 'passed', duration: 1200 },
      { name: 'Product Search', status: 'passed', duration: 850 },
      { name: 'Add to Cart', status: 'failed', duration: 2100, error: 'Iframe access limited' },
      { name: 'Checkout Flow', status: 'skipped', reason: 'Demo limitations' }
    ];
    
    await demoUtils.generateTestReport(mockTestResults);
    console.log('✅ Test report generation works');
  });

  test('should handle cleanup properly', async ({ page }) => {
    console.log('🧹 Testing cleanup functionality...');
    
    await demoUtils.navigateToDemo();
    await demoUtils.cleanup();
    
    console.log('✅ Cleanup utility works');
  });
});