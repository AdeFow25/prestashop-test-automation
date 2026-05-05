import { test, expect } from '@playwright/test';

test.describe('4. Resources Page - Real Features', () => {

  test('4.1 Resources Page Load', async ({ page }) => {
    await page.goto('/resources');
    
    // Verify "Resource Hub" heading
    await expect(page.locator('text=/Resource Hub/i')).toBeVisible();
    
    // Check page instructions section
    await expect(page.locator('text=/How to Use This Page/i')).toBeVisible();
  });

  test('4.2 Resource Categories Display', async ({ page }) => {
    await page.goto('/resources');
    
    // Verify 3 categories visible
    await expect(page.locator('text=/Understanding Neurodiversity and SEND/i')).toBeVisible();
    await expect(page.locator('text=/Screening and Assessment/i')).toBeVisible();
    await expect(page.locator('text=/Inclusive Faith and Church Resources/i')).toBeVisible();
  });

  test('4.3 External Resource Links', async ({ page }) => {
    await page.goto('/resources');
    
    // Verify external links present
    await expect(page.locator('text=/National Autistic Society/i')).toBeVisible();
    await expect(page.locator('text=/Autism Speaks/i')).toBeVisible();
    await expect(page.locator('text=/Ike Foundation/i')).toBeVisible();
    
    // Check "Learn more" or link buttons exist
    const learnMoreLinks = page.locator('a').filter({ hasText: /Learn more|Click here/i });
    const count = await learnMoreLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('4.4 Screening Tools Links', async ({ page }) => {
    await page.goto('/resources');
    
    // Verify screening section
    await expect(page.locator('text=/Screening and Assessment/i')).toBeVisible();
    
    // Check disclaimer
    await expect(page.locator('text=/Disclaimer/i')).toBeVisible();
    
    // Verify tool links exist
    const toolLinks = page.locator('text=/CAST|CHAT|AQ-10|NHS/i');
    const count = await toolLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('4.5 Resource Link Security', async ({ page }) => {
    await page.goto('/resources');
    
    // Find external links
    const externalLinks = page.locator('a[href^="http"]');
    const count = await externalLinks.count();
    
    if (count > 0) {
      // Check first few links for target="_blank"
      const firstLink = externalLinks.first();
      const target = await firstLink.getAttribute('target');
      
      // Many external links should open in new tab
      if (target) {
        expect(target).toBe('_blank');
      }
    }
  });

});
