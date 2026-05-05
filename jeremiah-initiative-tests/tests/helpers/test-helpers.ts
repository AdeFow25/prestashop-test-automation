import { Page, expect } from '@playwright/test';

/**
 * Test Helper Functions for Jeremiah Initiative Website Tests
 */

export class TestHelpers {
  
  /**
   * Wait for page to be fully loaded with network idle
   */
  static async waitForPageLoad(page: Page, timeout: number = 30000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Check for console errors (excluding known third-party warnings)
   */
  static setupConsoleErrorTracking(page: Page): string[] {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    return consoleErrors;
  }

  /**
   * Clear browser data before test
   */
  static async clearBrowserData(page: Page) {
    await page.context().clearCookies();
    await page.context().clearPermissions();
  }

  /**
   * Verify element is visible in viewport
   */
  static async isInViewport(page: Page, selector: string): Promise<boolean> {
    return await page.locator(selector).isVisible();
  }

  /**
   * Take a full page screenshot
   */
  static async takeFullPageScreenshot(page: Page, name: string) {
    await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Check if external link has proper attributes
   */
  static async verifyExternalLinkSecurity(page: Page, linkSelector: string) {
    const link = page.locator(linkSelector);
    const rel = await link.getAttribute('rel');
    const target = await link.getAttribute('target');
    
    if (target === '_blank') {
      expect(rel).toContain('noopener');
    }
  }

  /**
   * Measure page load time
   */
  static async measurePageLoadTime(page: Page): Promise<number> {
    const performanceData = await page.evaluate(() => {
      const perfData = window.performance.timing;
      return perfData.loadEventEnd - perfData.navigationStart;
    });
    return performanceData;
  }

  /**
   * Get all network requests during navigation
   */
  static async captureNetworkRequests(page: Page): Promise<string[]> {
    const requests: string[] = [];
    page.on('request', request => requests.push(request.url()));
    return requests;
  }

  /**
   * Verify HTTPS is enforced
   */
  static async verifyHTTPS(page: Page) {
    const url = page.url();
    expect(url).toMatch(/^https:\/\//);
  }

  /**
   * Check for meta tags
   */
  static async getMetaTag(page: Page, name: string): Promise<string | null> {
    return await page.locator(`meta[name="${name}"], meta[property="${name}"]`).getAttribute('content');
  }
}
