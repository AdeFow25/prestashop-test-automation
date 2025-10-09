import { Page, FrameLocator } from '@playwright/test';

/**
 * PrestaShop Demo Iframe Helper
 * Utility class for handling iframe-based interactions in PrestaShop demo
 */

export class PrestaShopIframeHelper {
  private page: Page;
  private storeFrame: FrameLocator | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Initialize connection to the PrestaShop store iframe
   */
  async initializeStoreFrame(): Promise<boolean> {
    try {
      // Wait for the main iframe to be available
      await this.page.waitForSelector('iframe[name="framelive"]', { timeout: 10000 });
      
      this.storeFrame = this.page.frameLocator('iframe[name="framelive"]');
      
      // Verify the frame is accessible
      const frameBody = this.storeFrame.locator('body');
      await frameBody.waitFor({ state: 'visible', timeout: 10000 });
      
      console.log('✅ Store iframe initialized successfully');
      return true;
    } catch (error) {
      console.log('⚠️ Store iframe not available, using fallback approach');
      return false;
    }
  }

  /**
   * Get the store frame locator
   */
  getStoreFrame(): FrameLocator | null {
    return this.storeFrame;
  }

  /**
   * Navigate to a specific section within the store
   */
  async navigateToSection(section: 'home' | 'clothes' | 'accessories' | 'art'): Promise<void> {
    if (!this.storeFrame) {
      throw new Error('Store frame not initialized. Call initializeStoreFrame() first.');
    }

    const sectionSelectors = {
      home: 'a[href*="home"], .logo',
      clothes: 'a:has-text("CLOTHES"), a:has-text("Clothes")',
      accessories: 'a:has-text("ACCESSORIES"), a:has-text("Accessories")',
      art: 'a:has-text("ART"), a:has-text("Art")'
    };

    const selector = sectionSelectors[section];
    try {
      await this.storeFrame.locator(selector).first().click();
      await this.page.waitForTimeout(2000); // Allow navigation to complete
      console.log(`✅ Navigated to ${section} section`);
    } catch (error) {
      console.log(`⚠️ Could not navigate to ${section}: ${error}`);
    }
  }

  /**
   * Find and interact with products in the store
   */
  async findProducts(): Promise<{ count: number; selector: string }> {
    if (!this.storeFrame) {
      throw new Error('Store frame not initialized. Call initializeStoreFrame() first.');
    }

    const productSelectors = [
      'article.product-miniature',
      '.product-miniature',
      '.product',
      '.js-product-miniature',
      '.product-item'
    ];

    for (const selector of productSelectors) {
      try {
        const count = await this.storeFrame.locator(selector).count();
        if (count > 0) {
          console.log(`✅ Found ${count} products using selector: ${selector}`);
          return { count, selector };
        }
      } catch (error) {
        continue;
      }
    }

    console.log('⚠️ No products found with any selector');
    return { count: 0, selector: '' };
  }

  /**
   * Perform search within the store
   */
  async performSearch(searchTerm: string): Promise<boolean> {
    if (!this.storeFrame) {
      throw new Error('Store frame not initialized. Call initializeStoreFrame() first.');
    }

    const searchSelectors = [
      'input[type="search"]',
      '.search-input',
      '#search_query_top',
      'input[name="search_query"]',
      '.search-box input'
    ];

    for (const selector of searchSelectors) {
      try {
        const searchInput = this.storeFrame.locator(selector);
        const count = await searchInput.count();
        
        if (count > 0) {
          await searchInput.first().fill(searchTerm);
          
          // Try to submit the search
          const submitSelectors = [
            'button[type="submit"]',
            '.search-button',
            'button:has-text("Search")'
          ];
          
          for (const submitSelector of submitSelectors) {
            try {
              await this.storeFrame.locator(submitSelector).first().click();
              await this.page.waitForTimeout(2000);
              console.log(`✅ Search performed for: ${searchTerm}`);
              return true;
            } catch (error) {
              continue;
            }
          }
          
          // Fallback: press Enter
          await searchInput.first().press('Enter');
          await this.page.waitForTimeout(2000);
          console.log(`✅ Search performed for: ${searchTerm} (Enter key)`);
          return true;
        }
      } catch (error) {
        continue;
      }
    }

    console.log(`⚠️ Could not perform search for: ${searchTerm}`);
    return false;
  }

  /**
   * Add product to cart
   */
  async addProductToCart(productIndex: number = 0): Promise<boolean> {
    if (!this.storeFrame) {
      throw new Error('Store frame not initialized. Call initializeStoreFrame() first.');
    }

    try {
      // First find products
      const productInfo = await this.findProducts();
      if (productInfo.count === 0) {
        console.log('⚠️ No products available to add to cart');
        return false;
      }

      // Click on product to view details
      await this.storeFrame.locator(productInfo.selector).nth(productIndex).click();
      await this.page.waitForTimeout(2000);

      // Look for add to cart button
      const addToCartSelectors = [
        'button:has-text("Add to cart")',
        '.add-to-cart',
        '.btn-add-to-cart',
        'button.btn-primary',
        'input[type="submit"][value*="cart"]'
      ];

      for (const selector of addToCartSelectors) {
        try {
          const addButton = this.storeFrame.locator(selector);
          const count = await addButton.count();
          
          if (count > 0) {
            await addButton.first().click();
            await this.page.waitForTimeout(2000);
            console.log('✅ Product added to cart successfully');
            return true;
          }
        } catch (error) {
          continue;
        }
      }

      console.log('⚠️ Could not find add to cart button');
      return false;
    } catch (error) {
      console.log(`⚠️ Error adding product to cart: ${error}`);
      return false;
    }
  }

  /**
   * Access user authentication
   */
  async accessAuthentication(): Promise<boolean> {
    if (!this.storeFrame) {
      throw new Error('Store frame not initialized. Call initializeStoreFrame() first.');
    }

    const authSelectors = [
      'text=Sign in',
      '.user-info',
      '.header-user',
      '.account',
      '.login-link'
    ];

    for (const selector of authSelectors) {
      try {
        const authElement = this.storeFrame.locator(selector);
        const count = await authElement.count();
        
        if (count > 0) {
          await authElement.first().click();
          await this.page.waitForTimeout(2000);
          console.log('✅ Accessed authentication area');
          return true;
        }
      } catch (error) {
        continue;
      }
    }

    console.log('⚠️ Could not access authentication');
    return false;
  }

  /**
   * Access shopping cart
   */
  async accessCart(): Promise<boolean> {
    if (!this.storeFrame) {
      throw new Error('Store frame not initialized. Call initializeStoreFrame() first.');
    }

    const cartSelectors = [
      '.cart',
      '.shopping-cart',
      '.blockcart',
      '.cart-icon',
      '.header .cart'
    ];

    for (const selector of cartSelectors) {
      try {
        const cartElement = this.storeFrame.locator(selector);
        const count = await cartElement.count();
        
        if (count > 0) {
          await cartElement.first().click();
          await this.page.waitForTimeout(2000);
          console.log('✅ Accessed shopping cart');
          return true;
        }
      } catch (error) {
        continue;
      }
    }

    console.log('⚠️ Could not access shopping cart');
    return false;
  }

  /**
   * Check if we're in the store iframe context
   */
  async isStoreAccessible(): Promise<boolean> {
    try {
      if (!this.storeFrame) {
        return false;
      }
      
      const frameBody = this.storeFrame.locator('body');
      return await frameBody.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Get current URL within the iframe (if accessible)
   */
  async getCurrentStoreUrl(): Promise<string> {
    try {
      // This might not be accessible due to cross-origin restrictions
      // But we can try to get some indication of the current page
      if (this.storeFrame) {
        const title = await this.storeFrame.locator('title').textContent();
        return title || 'Store page';
      }
      return 'Iframe not accessible';
    } catch (error) {
      return 'URL not accessible';
    }
  }
}