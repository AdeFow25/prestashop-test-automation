# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 07-accessibility-real.spec.ts >> 7. Accessibility - Real Features >> 7.5 Form Labels
- Location: tests\real\07-accessibility-real.spec.ts:64:7

# Error details

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://www.jeremiahinitiative.org/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner:
    - generic [ref=e3]:
      - link "Skip to Content" [ref=e4] [cursor=pointer]:
        - /url: "#page"
      - generic [ref=e8]:
        - link "Jeremiah Initiative" [ref=e11] [cursor=pointer]:
          - /url: /
          - img "Jeremiah Initiative" [ref=e12]
        - navigation [ref=e15]:
          - button "Programmes" [ref=e17] [cursor=pointer]:
            - generic [ref=e18]: Programmes
          - link "Our Story" [ref=e20] [cursor=pointer]:
            - /url: /our-vision
          - link "Resources" [ref=e22] [cursor=pointer]:
            - /url: /resources
          - link "FAQ" [ref=e24] [cursor=pointer]:
            - /url: /faq
  - main [ref=e25]:
    - article [ref=e26]:
      - heading "Walking alongside families with compassion and understanding." [level=3] [ref=e38]:
        - strong [ref=e39]: Walking alongside families with compassion and understanding
        - text: .
      - generic [ref=e45]:
        - heading "Family. Faith. Future." [level=2] [ref=e51]
        - link "Our Story" [ref=e56] [cursor=pointer]:
          - /url: /our-vision
        - generic [ref=e61]:
          - paragraph [ref=e62]:
            - text: The Jeremiah Initiative exists to
            - strong [ref=e63]: bridge understanding, faith, and practical support
            - text: for families raising autistic children.
          - paragraph [ref=e64]: We come alongside parents so they can feel confident and equipped. We support educators so they can create classrooms where every child belongs. And we help faith communities become places of genuine welcome—where families don't just attend, but truly belong.
          - paragraph [ref=e65]: Our work flows from lived experience, current research, and deep compassion. We've walked this road ourselves, and we know you don't have to walk it alone.
      - generic [ref=e71]:
        - img "Group of women studying" [ref=e80]
        - heading "Thrive Circle" [level=3] [ref=e87]
        - paragraph [ref=e93]: Supportive workshops where parents connect, share experiences, and learn practical strategies for raising neurodivergent children
        - link "Learn More" [ref=e98] [cursor=pointer]:
          - /url: /thrive-circle
        - img "young boy learning with excitment" [ref=e107]
        - heading "Thrive Classrooms" [level=3] [ref=e114]
        - paragraph [ref=e120]: We partner with schools and educators who want to go beyond compliance to genuine inclusion
        - link "Learn More" [ref=e125] [cursor=pointer]:
          - /url: /thrive-classrooms
        - heading "Thrive Communities" [level=3] [ref=e140]
        - paragraph [ref=e146]: We work with faith leaders to create environments where neurodivergent children and their families can worship, serve, and belong
        - link "Learn More" [ref=e151] [cursor=pointer]:
          - /url: /thrive-community
      - generic [ref=e157]:
        - generic [ref=e162]:
          - heading "“Because every Child Matters - To God and To us”" [level=2] [ref=e163]
          - paragraph [ref=e164]: — Bunmi Fowokan (Founder, Jeremiah Initiative)
        - separator [ref=e168]
      - generic [ref=e174]:
        - generic [ref=e179]:
          - heading "Contact" [level=2] [ref=e180]
          - paragraph [ref=e181]:
            - text: Feel free to contact us with any questions.
            - strong [ref=e182]: Email
            - text: info@jeremiahiniatiative.org
        - generic [ref=e188]:
          - generic [ref=e189]:
            - group "Name" [ref=e190]:
              - generic [ref=e194]: Name
              - generic [ref=e195]:
                - generic [ref=e198]:
                  - text: First Name
                  - generic [ref=e199]: (required)
                - textbox "First Name (required)" [ref=e200]
              - generic [ref=e201]:
                - generic [ref=e204]:
                  - text: Last Name
                  - generic [ref=e205]: (required)
                - textbox "Last Name (required)" [ref=e206]
            - generic [ref=e207]:
              - generic [ref=e210] [cursor=pointer]:
                - generic [ref=e211]: Email
                - generic [ref=e212]: (required)
              - textbox "Email (required)" [ref=e213]:
                - /placeholder: ""
            - generic [ref=e214]:
              - generic [ref=e217]:
                - generic [ref=e218]: Message
                - generic [ref=e219]: (required)
              - textbox "Message (required)" [ref=e220]:
                - /placeholder: ""
            - generic:
              - textbox
          - button "Submit" [ref=e222] [cursor=pointer]:
            - generic "Submit":
              - generic: Submit
  - contentinfo [ref=e223]:
    - generic [ref=e229]:
      - generic [ref=e234]:
        - heading "Jeremiah Initiative" [level=4] [ref=e235]
        - paragraph [ref=e236]
      - generic [ref=e241]:
        - paragraph [ref=e242]: Our Programmes
        - paragraph [ref=e243]:
          - link "Thrive Circle" [ref=e244] [cursor=pointer]:
            - /url: /thrive-circle-1
          - link "Thrive Community" [ref=e245] [cursor=pointer]:
            - /url: /thrive-community
          - link "Thrive Classrooms" [ref=e246] [cursor=pointer]:
            - /url: /thrive-classrooms
      - generic [ref=e251]:
        - paragraph [ref=e252]: About
        - paragraph [ref=e253]:
          - link "Our Story" [ref=e254] [cursor=pointer]:
            - /url: /our-vision
        - paragraph [ref=e255]:
          - link "Contact Us" [ref=e256] [cursor=pointer]:
            - /url: /contact
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('7. Accessibility - Real Features', () => {
  4   | 
  5   |   test('7.1 Keyboard Navigation', async ({ page }) => {
  6   |     await page.goto('/');
  7   |     
  8   |     // Navigate using Tab key
  9   |     await page.keyboard.press('Tab');
  10  |     
  11  |     // Verify element is focused
  12  |     const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
  13  |     expect(focusedElement).toBeTruthy();
  14  |     
  15  |     // Continue tabbing through several elements
  16  |     for (let i = 0; i < 5; i++) {
  17  |       await page.keyboard.press('Tab');
  18  |       const focused = await page.evaluate(() => document.activeElement?.tagName);
  19  |       expect(focused).toBeTruthy();
  20  |     }
  21  |   });
  22  | 
  23  |   test('7.2 Heading Structure', async ({ page }) => {
  24  |     await page.goto('/');
  25  |     
  26  |     // Check H2 headings used (primary heading structure)
  27  |     const h2Count = await page.locator('h2').count();
  28  |     expect(h2Count).toBeGreaterThan(0);
  29  |     
  30  |     // Verify logical document outline
  31  |     const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
  32  |     expect(headings.length).toBeGreaterThan(0);
  33  |   });
  34  | 
  35  |   test('7.3 Image Alt Text', async ({ page }) => {
  36  |     await page.goto('/');
  37  |     
  38  |     // Check images have alt attributes
  39  |     const images = await page.locator('img').all();
  40  |     
  41  |     for (const img of images.slice(0, 5)) { // Check first 5 images
  42  |       const alt = await img.getAttribute('alt');
  43  |       // Alt should exist (can be empty for decorative images)
  44  |       expect(alt !== null).toBeTruthy();
  45  |     }
  46  |   });
  47  | 
  48  |   test('7.4 Link Accessibility', async ({ page }) => {
  49  |     await page.goto('/');
  50  |     
  51  |     // Verify link text is descriptive
  52  |     const links = await page.locator('a').all();
  53  |     
  54  |     // Check first few links have text
  55  |     for (const link of links.slice(0, 5)) {
  56  |       const text = await link.textContent();
  57  |       const ariaLabel = await link.getAttribute('aria-label');
  58  |       
  59  |       // Link should have text or aria-label
  60  |       expect(text || ariaLabel).toBeTruthy();
  61  |     }
  62  |   });
  63  | 
  64  |   test('7.5 Form Labels', async ({ page }) => {
> 65  |     await page.goto('/');
      |                ^ TimeoutError: page.goto: Timeout 60000ms exceeded.
  66  |     
  67  |     // Navigate to contact form
  68  |     const contactLink = page.locator('a').filter({ hasText: /Contact/i }).first();
  69  |     if (await contactLink.isVisible()) {
  70  |       await contactLink.click();
  71  |       await page.waitForLoadState('networkidle');
  72  |     }
  73  |     
  74  |     // Check form fields have labels
  75  |     const labels = page.locator('label');
  76  |     const labelCount = await labels.count();
  77  |     
  78  |     if (labelCount === 0) {
  79  |       // Check for aria-label or placeholder as fallback
  80  |       const inputs = page.locator('input, textarea');
  81  |       const firstInput = inputs.first();
  82  |       if (await firstInput.isVisible()) {
  83  |         const ariaLabel = await firstInput.getAttribute('aria-label');
  84  |         const placeholder = await firstInput.getAttribute('placeholder');
  85  |         expect(ariaLabel || placeholder).toBeTruthy();
  86  |       }
  87  |     } else {
  88  |       expect(labelCount).toBeGreaterThan(0);
  89  |     }
  90  |   });
  91  | 
  92  |   test('7.6 Color Contrast', async ({ page }) => {
  93  |     await page.goto('/');
  94  |     
  95  |     // Basic visibility check for main content
  96  |     const mainContent = page.locator('text=/Family.*Faith.*Future/i');
  97  |     await expect(mainContent).toBeVisible();
  98  |     
  99  |     // Check that text is readable (visible against background)
  100 |     const isVisible = await mainContent.isVisible();
  101 |     expect(isVisible).toBeTruthy();
  102 |     
  103 |     // Note: Full contrast testing requires axe-core or similar tool
  104 |   });
  105 | 
  106 | });
  107 | 
```