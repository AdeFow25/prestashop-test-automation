# Jeremiah Initiative - Actual Website Test Plan
## Based on Real Website Exploration (May 5, 2026)

**Website:** https://www.jeremiahinitiative.org  
**Purpose:** Non-profit supporting families with autistic children (Nigeria-focused)  
**Tech Stack:** Squarespace-hosted website

---

## Real Website Structure Discovered

### Pages That Exist:
✅ Homepage (/)  
✅ Our Story (/our-vision)  
✅ Resources (/resources)  
✅ FAQ (/faq)  
✅ Contact (/contact)  
✅ Thrive Circle (/thrive-circle-1)  
✅ Thrive Classrooms (/thrive-classrooms)  
✅ Thrive Communities (/thrive-community)  

### Features That DON'T Exist:
❌ Donation functionality  
❌ News/Blog section  
❌ Social media links  
❌ Privacy policy page  
❌ H1 headings (uses H2 instead)  
❌ Copyright footer text  

---

## Test Scenarios (Based on Actual Features)

### 1. Homepage Functionality (6 tests)

**1.1 Homepage Load**
- Navigate to homepage
- Verify page loads within 10 seconds
- Check for main tagline: "Walking alongside families with compassion and understanding"
- Verify "Family. Faith. Future." heading appears

**1.2 Hero Section**
- Check tagline visibility
- Verify hero image loads
- Check heading structure (H2, not H1)

**1.3 Navigation Menu**
- Verify top navigation exists
- Check "Jeremiah Initiative" logo/link
- Verify simple navigation (no hamburger menu)

**1.4 Thrive Programs Section**
- Verify 3 program cards displayed:
  - Thrive Circle
  - Thrive Classrooms  
  - Thrive Communities
- Check "Learn More" links for each program
- Verify program descriptions visible

**1.5 Founder Quote Section**
- Check quote: "Because every Child Matters - To God and To us"
- Verify attribution: "Bunmi Fowokan (Founder, Jeremiah Initiative)"

**1.6 Footer Navigation**
- Verify footer sections:
  - Our Programmes links
  - About links (Our Story, Contact Us)
- Check "Additional Links" section

---

### 2. Navigation & Page Routing (7 tests)

**2.1 Navigate to Our Story**
- Click "Our Story" link
- Verify URL: /our-vision
- Check "Our Story" heading
- Verify founder story content loads

**2.2 Navigate to Resources**
- Click "Resources" link  
- Verify URL: /resources
- Check "Resource Hub" heading
- Verify 3 resource categories visible

**2.3 Navigate to FAQ**
- Click "FAQ" link
- Verify URL: /faq
- Check "Frequently Asked Questions" heading
- Verify expandable questions exist

**2.4 Navigate to Contact**
- Click "Contact" or "Contact Us" link
- Verify contact form loads
- Check form fields present

**2.5 Navigate to Thrive Circle**
- Click "Thrive Circle" link from homepage
- Verify page loads (check for 404 or actual content)
- Check program details if available

**2.6 Navigate to Thrive Classrooms**
- Click "Thrive Classrooms" link
- Verify page loads
- Check program information

**2.7 Navigate to Thrive Communities**
- Click "Thrive Communities" link  
- Verify page loads
- Check program details

---

### 3. Contact Form Functionality (7 tests)

**3.1 Contact Form Field Presence**
- Navigate to contact form
- Verify fields exist:
  - First Name (required)
  - Last Name (required)
  - Email (required)
  - Message (required)
- Check submit button

**3.2 Email Field Validation**
- Enter invalid email format
- Attempt to submit
- Verify validation error appears

**3.3 Required Field Validation**
- Leave required fields empty
- Attempt to submit  
- Verify validation messages

**3.4 Valid Form Submission**
- Fill all required fields with test data
- Submit form
- Check for success message or confirmation

**3.5 Message Length Check**
- Enter very short message
- Enter very long message (>5000 chars)
- Verify handling

**3.6 Email Format Validation**
- Test various email formats:
  - test@example.com (valid)
  - testexample.com (invalid)
  - test@com (invalid)

**3.7 Form Accessibility**
- Check field labels exist
- Verify keyboard navigation works
- Check ARIA attributes

---

### 4. Resources Page (5 tests)

**4.1 Resources Page Load**
- Navigate to /resources
- Verify "Resource Hub" heading
- Check page instructions section

**4.2 Resource Categories Display**
- Verify 3 categories visible:
  - Understanding Neurodiversity and SEND
  - Screening and Assessment
  - Inclusive Faith and Church Resources
- Check category descriptions

**4.3 External Resource Links**
- Verify external links present:
  - National Autistic Society
  - Autism Speaks
  - Ike Foundation for Autism
  - Through the Roof
  - Count Everyone In
  - NHS resources
- Check links open in new tab (target="_blank")

**4.4 Screening Tools Links**
- Verify screening tool links:
  - CAST/CHAT-10
  - AQ-10
  - NHS resources
- Check disclaimer text visible

**4.5 Resource Link Security**
- Verify external links have rel="noopener noreferrer"
- Check HTTPS protocol for external sites

---

### 5. FAQ Page (5 tests)

**5.1 FAQ Page Load**
- Navigate to /faq
- Verify "Frequently Asked Questions" heading
- Check FAQ items display

**5.2 FAQ Expandable Questions**
- Verify questions are expandable/collapsible
- Test clicking on questions
- Check content reveals/hides

**5.3 FAQ Content Verification**
- Verify key questions exist:
  - "What is the Jeremiah Initiative"
  - "Who is this for?"
  - "How much does Thrive Circle cost?"
  - "Is this only for families in Nigeria?"
  - "Is this a Christian programme?"

**5.4 Listening Survey Link**
- Find "Take our listening survey" link
- Verify it's a Google Form link
- Check opens in new tab

**5.5 FAQ Contact CTA**
- Verify "Still have questions?" section
- Check "GET IN TOUCH" button
- Verify links to contact page

---

### 6. Our Story Page (4 tests)

**6.1 Our Story Page Load**
- Navigate to /our-vision
- Verify "Our Story" heading
- Check founder story content

**6.2 Mission Statement**
- Verify "Our Mission" section
- Check 3-point mission display:
  - Empowering parents
  - Equipping educators
  - Transforming faith communities

**6.3 Biblical Reference**
- Check Jeremiah 1:5 quote present
- Verify proper formatting

**6.4 Founder Information**
- Verify "Bunmi Fowokan - Founder" attribution
- Check personal story section

---

### 7. Responsive Design (6 tests)

**7.1 Mobile Layout - Homepage**
- Load homepage on iPhone 12 viewport
- Verify responsive layout
- Check navigation adapts
- Verify program cards stack vertically

**7.2 Tablet Layout**
- Load on iPad Pro viewport  
- Verify layout adjusts appropriately
- Check navigation remains accessible

**7.3 Mobile Navigation**
- Check navigation menu on mobile
- Verify links are tappable
- Test menu functionality

**7.4 Mobile Forms**
- Load contact form on mobile
- Verify form fields are usable
- Check input field sizes

**7.5 Touch Interactions**
- Test tapping links on mobile
- Verify buttons have adequate touch targets
- Check no hover-dependent features

**7.6 Image Responsiveness**
- Verify images resize on smaller screens
- Check for srcset attributes
- Ensure images don't overflow viewport

---

### 8. Accessibility (6 tests)

**8.1 Keyboard Navigation**
- Navigate entire site using Tab key
- Verify all interactive elements reachable
- Check focus indicators visible

**8.2 Heading Structure**
- Verify proper heading hierarchy
- Check H2 headings used (not H1)
- Verify logical document outline

**8.3 Image Alt Text**
- Check all images have alt attributes
- Verify alt text is descriptive
- Test screen reader compatibility

**8.4 Link Accessibility**
- Verify link text is descriptive
- Check links have proper contrast
- Ensure no "click here" anti-patterns

**8.5 Form Labels**
- Verify all form fields have labels
- Check label associations (for attribute)
- Test with screen reader

**8.6 Color Contrast**
- Test text/background contrast ratios
- Verify WCAG AA compliance
- Check contrast on all interactive elements

---

### 9. Performance (5 tests)

**9.1 Homepage Load Time**
- Measure time to interactive
- Verify loads within 5 seconds
- Check DOM content loaded time

**9.2 Image Optimization**
- Check images use WebP or optimized formats
- Verify lazy loading implemented
- Check image sizes appropriate

**9.3 Page Weight**
- Measure total page size
- Verify < 5MB total
- Check for unoptimized resources

**9.4 Resource Page Load**
- Test Resources page load time
- Verify external links don't slow page
- Check for performance bottlenecks

**9.5 Mobile Performance**
- Test load time on mobile device
- Verify < 8 seconds on 3G
- Check mobile-specific optimizations

---

### 10. Content Integrity (5 tests)

**10.1 Internal Links Validation**
- Test all internal navigation links
- Verify no broken links
- Check all pages load successfully

**10.2 External Links Check**
- Verify external resource links work
- Check links open in new tabs
- Ensure no broken external references

**10.3 Program Links Verification**
- Test Thrive Circle link
- Test Thrive Classrooms link
- Test Thrive Communities link
- Document which return 404

**10.4 Email Link Check**
- Verify mailto: link for info@jeremiahinitiative.org
- Check proper email format
- Test clicking opens email client

**10.5 Consistent Navigation**
- Verify header consistent across pages
- Check footer consistent across pages
- Verify logo always links to homepage

---

### 11. Security & HTTPS (3 tests)

**11.1 HTTPS Enforcement**
- Access via http://
- Verify redirects to https://
- Check all resources load over HTTPS

**11.2 External Link Security**
- Verify rel="noopener noreferrer" on external links
- Check target="_blank" implementation
- Test for clickjacking vulnerabilities

**11.3 Form Security**
- Check contact form uses HTTPS
- Verify no sensitive data exposure
- Test for basic XSS prevention

---

### 12. Squarespace-Specific Features (3 tests)

**12.1 Squarespace Meta Tags**
- Check for Squarespace-specific meta tags
- Verify social sharing tags
- Check OG tags if present

**12.2 Squarespace Navigation**
- Test Squarespace folder navigation
- Verify page hierarchy
- Check collection pages

**12.3 Squarespace Forms**
- Verify form submissions use Squarespace backend
- Check form storage handling
- Test form confirmation messages

---

## Priority Levels

**P0 - Critical:**
- Homepage load
- Navigation functionality
- Contact form submission
- Core program pages load

**P1 - High:**
- Resources page
- FAQ functionality
- Responsive design
- Accessibility basics

**P2 - Medium:**
- Performance optimization
- Content integrity
- Security headers

**P3 - Low:**
- Squarespace-specific features
- Advanced accessibility

---

## Total Test Count: 62 Tests

**By Category:**
- Homepage: 6
- Navigation: 7
- Contact Form: 7
- Resources: 5
- FAQ: 5
- Our Story: 4
- Responsive: 6
- Accessibility: 6
- Performance: 5
- Content: 5
- Security: 3
- Squarespace: 3

**Removed from original plan:**
- 7 donation tests (feature doesn't exist)
- 7 news/blog tests (no blog)
- 4 social media tests (no social links)
- Privacy policy test (no page)
- Copyright tests (no copyright text)

---

## Notes

1. Website uses Squarespace CMS
2. Focus on supporting families with autistic children in Nigeria
3. No e-commerce/donation functionality
4. Simple, content-focused design
5. External resources heavily featured
6. Some program pages may return 404 (needs verification)
7. No H1 headings - uses H2 for main headings
8. Email: info@jeremiahinitiative.org (note potential typo: "initiatiative")
