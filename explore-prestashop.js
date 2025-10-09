const { chromium } = require('playwright');

async function explorePrestaShop() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🔍 Starting systematic exploration of PrestaShop demo...');
  
  // Navigate to homepage
  await page.goto('https://demo.prestashop.com/#/en/front');
  await page.waitForLoadState('networkidle');
  
  console.log('\n📍 HOMEPAGE EXPLORATION:');
  
  // Document header elements
  const headerElements = await page.locator('header').textContent();
  console.log('Header content:', headerElements);
  
  // Check for main navigation
  const navItems = await page.locator('nav a, .nav a, .navigation a').allTextContents();
  console.log('Navigation items:', navItems);
  
  // Look for search functionality
  const searchExists = await page.locator('input[type="search"], .search input, [placeholder*="search" i]').count();
  console.log('Search functionality:', searchExists > 0 ? 'EXISTS' : 'NOT FOUND');
  
  // Check for cart icon
  const cartExists = await page.locator('[class*="cart" i], [id*="cart" i]').count();
  console.log('Cart functionality:', cartExists > 0 ? 'EXISTS' : 'NOT FOUND');
  
  // Look for login/account links
  const loginExists = await page.locator('a:has-text("Sign in"), a:has-text("Login"), a:has-text("Account")').count();
  console.log('Login/Account links:', loginExists > 0 ? 'EXISTS' : 'NOT FOUND');
  
  // Check for language/currency switcher
  const langExists = await page.locator('[class*="lang" i], [class*="currency" i]').count();
  console.log('Language/Currency switcher:', langExists > 0 ? 'EXISTS' : 'NOT FOUND');
  
  // Look for featured products
  const productsExists = await page.locator('.product, [class*="product"]').count();
  console.log('Products on homepage:', productsExists);
  
  // Check for footer content
  const footerExists = await page.locator('footer').count();
  console.log('Footer:', footerExists > 0 ? 'EXISTS' : 'NOT FOUND');
  
  console.log('\n📍 EXPLORING PRODUCT CATEGORIES:');
  
  // Try to find and click on a category
  const categoryLinks = await page.locator('nav a, .nav a, .category a').first();
  if (await categoryLinks.count() > 0) {
    await categoryLinks.click();
    await page.waitForLoadState('networkidle');
    
    const categoryProducts = await page.locator('.product, [class*="product"]').count();
    console.log('Products in category page:', categoryProducts);
    
    // Check for filters/sorting
    const filtersExist = await page.locator('[class*="filter" i], [class*="sort" i]').count();
    console.log('Filters/Sorting:', filtersExist > 0 ? 'EXISTS' : 'NOT FOUND');
  }
  
  console.log('\n📍 EXPLORING PRODUCT DETAILS:');
  
  // Try to click on a product
  const productLink = await page.locator('.product a, [class*="product"] a').first();
  if (await productLink.count() > 0) {
    await productLink.click();
    await page.waitForLoadState('networkidle');
    
    // Check product page features
    const addToCartExists = await page.locator('button:has-text("Add to cart"), [class*="add-to-cart" i]').count();
    console.log('Add to Cart button:', addToCartExists > 0 ? 'EXISTS' : 'NOT FOUND');
    
    const wishlistExists = await page.locator('[class*="wishlist" i], [class*="favorite" i]').count();
    console.log('Wishlist functionality:', wishlistExists > 0 ? 'EXISTS' : 'NOT FOUND');
    
    const reviewsExist = await page.locator('[class*="review" i], [class*="rating" i]').count();
    console.log('Reviews/Ratings:', reviewsExist > 0 ? 'EXISTS' : 'NOT FOUND');
    
    const socialShareExists = await page.locator('[class*="share" i], [class*="social" i]').count();
    console.log('Social sharing:', socialShareExists > 0 ? 'EXISTS' : 'NOT FOUND');
  }
  
  console.log('\n✅ Exploration complete!');
  
  await browser.close();
}

explorePrestaShop().catch(console.error);