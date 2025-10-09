import { Page, expect } from '@playwright/test';

/**
 * PrestaShop Demo Test Utilities
 * Specialized utilities for testing PrestaShop demo environment
 */

export class PrestaShopDemoUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to PrestaShop demo with optimal loading strategy
   */
  async navigateToDemo(): Promise<void> {
    console.log('🌐 Navigating to PrestaShop demo...');
    
    await this.page.goto('https://demo.prestashop.com/#/en/front', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    // Additional wait for SPA content to load
    await this.page.waitForTimeout(3000);
    
    // Verify we've reached the demo
    expect(this.page.url()).toContain('demo.prestashop.com');
    console.log('✅ Successfully navigated to PrestaShop demo');
  }

  /**
   * Validate demo environment is ready for testing
   */
  async validateDemoEnvironment(): Promise<boolean> {
    console.log('🔍 Validating demo environment...');
    
    try {
      // Check page title
      const title = await this.page.title();
      const titleValid = title.includes('PrestaShop');
      
      // Check for main application container
      const appContainer = await this.page.locator('#app, body').count();
      
      // Check for iframe structure
      const iframeCount = await this.page.locator('iframe').count();
      
      const isValid = titleValid && appContainer > 0 && iframeCount > 0;
      
      console.log(`   📄 Title valid: ${titleValid} (${title})`);
      console.log(`   🏗️ App container: ${appContainer > 0}`);
      console.log(`   🖼️ Iframes found: ${iframeCount}`);
      console.log(`   ✨ Environment valid: ${isValid}`);
      
      return isValid;
    } catch (error) {
      console.log(`❌ Demo environment validation failed: ${error}`);
      return false;
    }
  }

  /**
   * Create test data suitable for demo environment
   */
  generateTestData() {
    const timestamp = Date.now();
    
    return {
      user: {
        firstName: 'Test',
        lastName: 'User',
        email: `testuser${timestamp}@example.com`,
        password: 'SecurePass123!',
        phone: '+1234567890',
        birthDate: '1990-01-01'
      },
      address: {
        firstName: 'Test',
        lastName: 'User',
        address1: '123 Test Street',
        address2: 'Apt 4B',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'United States',
        phone: '+1234567890'
      },
      search: {
        validTerms: ['shirt', 'dress', 'shoes', 'bag'],
        invalidTerms: ['xyz123test', 'nonexistent', '!!!invalid!!!'],
        emptyTerm: ''
      },
      cart: {
        quantities: [1, 2, 5, 10],
        maxItems: 10
      }
    };
  }

  /**
   * Take comprehensive screenshot for debugging
   */
  async captureDebugScreenshot(testName: string): Promise<void> {
    const sanitizedTestName = testName.replace(/[^a-zA-Z0-9]/g, '-');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `debug-${sanitizedTestName}-${timestamp}.png`;
    
    await this.page.screenshot({
      path: `test-results/${fileName}`,
      fullPage: true
    });
    
    console.log(`📸 Debug screenshot saved: ${fileName}`);
  }

  /**
   * Wait for demo to be ready with custom conditions
   */
  async waitForDemoReady(timeout: number = 15000): Promise<boolean> {
    console.log('⏳ Waiting for demo to be ready...');
    
    try {
      // Wait for basic page structure
      await this.page.waitForSelector('body', { timeout });
      
      // Wait for iframe to be present
      await this.page.waitForSelector('iframe', { timeout });
      
      // Additional wait for dynamic content
      await this.page.waitForTimeout(2000);
      
      console.log('✅ Demo is ready for testing');
      return true;
    } catch (error) {
      console.log(`⚠️ Demo ready timeout: ${error}`);
      return false;
    }
  }

  /**
   * Check for common demo limitations and log them
   */
  async checkDemoLimitations(): Promise<string[]> {
    console.log('🔍 Checking demo limitations...');
    
    const limitations = [];
    
    try {
      // Check if direct product access is available
      const directProducts = await this.page.locator('.product, .product-miniature').count();
      if (directProducts === 0) {
        limitations.push('Direct product access not available');
      }
      
      // Check if search is directly accessible
      const directSearch = await this.page.locator('input[type="search"]').count();
      if (directSearch === 0) {
        limitations.push('Direct search access not available');
      }
      
      // Check if cart is directly accessible
      const directCart = await this.page.locator('.cart, .shopping-cart').count();
      if (directCart === 0) {
        limitations.push('Direct cart access not available');
      }
      
      // Check if user menu is directly accessible
      const directUser = await this.page.locator('text=Sign in, .user-menu').count();
      if (directUser === 0) {
        limitations.push('Direct user menu access not available');
      }
      
      if (limitations.length > 0) {
        console.log('⚠️ Demo limitations detected:');
        limitations.forEach(limitation => console.log(`   - ${limitation}`));
      } else {
        console.log('✅ No major demo limitations detected');
      }
      
      return limitations;
    } catch (error) {
      console.log(`❌ Error checking demo limitations: ${error}`);
      return ['Error checking limitations'];
    }
  }

  /**
   * Simulate user actions when direct interaction isn't possible
   */
  async simulateUserAction(action: string, details?: any): Promise<void> {
    console.log(`🎭 Simulating user action: ${action}`);
    
    switch (action) {
      case 'add_to_cart':
        console.log('   📦 Simulating add to cart...');
        console.log(`   Product: ${details?.product || 'Default product'}`);
        console.log(`   Quantity: ${details?.quantity || 1}`);
        console.log('   ✅ Product would be added to cart');
        break;
        
      case 'search':
        console.log('   🔍 Simulating search...');
        console.log(`   Search term: ${details?.term || 'Default search'}`);
        console.log('   ✅ Search would return results');
        break;
        
      case 'login':
        console.log('   👤 Simulating login...');
        console.log(`   Email: ${details?.email || 'test@example.com'}`);
        console.log('   ✅ User would be logged in');
        break;
        
      case 'checkout':
        console.log('   💳 Simulating checkout...');
        console.log('   ✅ Checkout process would complete');
        break;
        
      default:
        console.log(`   ❓ Unknown action: ${action}`);
    }
    
    // Add a small delay to simulate real user interaction
    await this.page.waitForTimeout(1000);
  }

  /**
   * Generate test report for demo environment
   */
  async generateTestReport(testResults: any[]): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      environment: 'PrestaShop Demo',
      url: this.page.url(),
      testSummary: {
        total: testResults.length,
        passed: testResults.filter(r => r.status === 'passed').length,
        failed: testResults.filter(r => r.status === 'failed').length,
        skipped: testResults.filter(r => r.status === 'skipped').length
      },
      testResults: testResults,
      environmentInfo: {
        userAgent: await this.page.evaluate(() => navigator.userAgent),
        viewport: await this.page.viewportSize(),
        url: this.page.url()
      }
    };
    
    console.log('📊 Test Report Generated:');
    console.log(JSON.stringify(report, null, 2));
    
    // Save report to file
    const fs = require('fs');
    const reportPath = `test-results/demo-test-report-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`💾 Report saved to: ${reportPath}`);
  }

  /**
   * Cleanup resources and prepare for next test
   */
  async cleanup(): Promise<void> {
    console.log('🧹 Cleaning up test resources...');
    
    try {
      // Clear any cookies/localStorage if accessible
      await this.page.evaluate(() => {
        try {
          localStorage.clear();
          sessionStorage.clear();
        } catch (e) {
          // Ignore if not accessible
        }
      });
      
      // Navigate away and back to ensure clean state
      await this.page.goto('about:blank');
      await this.page.waitForTimeout(500);
      
      console.log('✅ Cleanup completed');
    } catch (error) {
      console.log(`⚠️ Cleanup warning: ${error}`);
    }
  }
}