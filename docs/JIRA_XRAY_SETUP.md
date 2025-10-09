# Jira/Xray Test Management Setup Guide

This guide provides complete setup instructions for integrating GitHub Actions with Jira and Xray for comprehensive test management and execution tracking.

## Overview

The integration provides:
- **Jira Issue Management**: Automatic creation of test execution issues
- **Xray Test Management**: Structured test execution tracking and reporting
- **Traceability**: Complete linking between code, tests, and requirements
- **Automated Reporting**: Real-time test results in Jira/Xray dashboards

## Prerequisites

### Required Tools
1. **Jira Cloud/Server** with admin access
2. **Xray for Jira** (Test Management add-on)
3. **GitHub Repository** with Actions enabled
4. **API Access** to both Jira and Xray

### Xray License
- Xray is a premium Atlassian add-on
- Free trial available: https://marketplace.atlassian.com/apps/1211769/xray-test-management-for-jira
- Choose appropriate license based on team size

## Jira Setup

### 1. Configure Jira Project
1. Create or use existing project (e.g., `PRESTA`)
2. Enable issue types: `Task`, `Test`, `Test Execution`, `Test Plan`
3. Configure custom fields if needed

### 2. Create API Token
1. Go to: https://id.atlassian.com/manage-profile/security/api-tokens
2. Click **Create API token**
3. Copy token for GitHub secrets

## Xray Integration with Existing Jira Structure

### Using Your Existing User Stories
The current integration uses your **existing Jira user stories** as test cases, eliminating the need to create separate Xray test cases. This provides:

- **Seamless Integration**: Direct connection between requirements and test execution
- **No Duplication**: User stories serve as both requirements and test cases
- **Immediate Value**: Works with your existing Jira structure
- **Full Traceability**: From epic → user story → test execution

### Test Execution Mapping
Your existing user stories will be tracked in Xray as follows:

| Epic | User Story | Test Area | Jira Key |
|------|------------|-----------|----------|
| Homepage and Navigation Testing | Homepage Load and Header Elements | Homepage validation | PRESTA-2 |
| Homepage and Navigation Testing | Category Navigation | Navigation testing | PRESTA-3 |
| Product Search Testing | Basic Product Search | Search functionality | PRESTA-5 |
| Product Search Testing | Empty Search Results | Edge case testing | PRESTA-6 |
| Shopping Cart Management | Add Products to Cart | Cart functionality | PRESTA-11 |
| Shopping Cart Management | Cart Operations | Cart management | PRESTA-12 |
| Checkout Process | Guest Checkout Flow | Guest checkout | PRESTA-17 |
| Checkout Process | Registered User Checkout | User checkout | PRESTA-18 |
| User Registration and Authentication | New User Registration | Registration testing | PRESTA-14 |
| User Registration and Authentication | User Login Process | Authentication testing | PRESTA-15 |
| Error Handling and Edge Cases | Form Validation | Validation testing | PRESTA-23 |
| Error Handling and Edge Cases | Browser Compatibility | Cross-browser testing | PRESTA-24 |

### Simplified Xray Setup

## GitHub Secrets Configuration

### Required Secrets (Simplified)
Go to: `https://github.com/YOUR_USERNAME/prestashop-test-automation/settings/secrets/actions`

#### Jira Secrets (4 secrets)
```
JIRA_BASE_URL=https://adefowokan.atlassian.net
JIRA_USER_EMAIL=adeolufowokan@gmail.com
JIRA_API_TOKEN=your-jira-api-token
JIRA_PROJECT_KEY=PRESTA
```

#### Xray Secrets (3 secrets - Optional for Enhanced Reporting)
```
XRAY_BASE_URL=https://xray.cloud.getxray.app
XRAY_CLIENT_ID=your-xray-client-id (if you want enhanced Xray features)
XRAY_CLIENT_SECRET=your-xray-client-secret (if you want enhanced Xray features)
```

### Immediate Benefits with Minimal Setup
With just the **4 Jira secrets**, you get:
- ✅ Automatic Jira issue creation for test executions
- ✅ Test results linked to your existing user stories
- ✅ Complete traceability from epics to test results
- ✅ Status updates and comprehensive reporting

### Optional Xray Enhancement
Adding the **3 Xray secrets** provides:
- 📊 Advanced test execution dashboards
- 📈 Test trend analysis and reporting
- 🔗 Enhanced evidence attachment
- 📋 Structured test management features

## Workflow Integration Features

### Automatic Test Execution Tracking
- Creates Xray Test Execution for each GitHub Actions run
- Links test results to specific commits and branches
- Tracks pass/fail status for each test area
- Provides detailed execution logs and evidence

### Jira Issue Integration
- Creates Jira issue for each test run
- Updates issue status based on test results
- Links Jira issue to Xray test execution
- Provides complete traceability

### Test Results Matrix
The workflow automatically creates a test coverage matrix:

| Test Area | Framework Test File | Xray Test Key | Status Tracking |
|-----------|-------------------|---------------|-----------------|
| Homepage Navigation | `homepage-navigation.spec.ts` | PRESTA-T-001 | ✅ Automated |
| Product Search | `product-search.spec.ts` | PRESTA-T-002 | ✅ Automated |
| Shopping Cart | `shopping-cart.spec.ts` | PRESTA-T-003 | ✅ Automated |
| Checkout Flow | `enhanced-checkout-flow.spec.ts` | PRESTA-T-004 | ✅ Automated |
| Authentication | `user-authentication.spec.ts` | PRESTA-T-005 | ✅ Automated |
| Error Handling | `error-handling.spec.ts` | PRESTA-T-006 | ✅ Automated |
| Integration | `demo-utilities-test.spec.ts` | PRESTA-T-007 | ✅ Automated |
| Responsive Design | Cross-browser tests | PRESTA-T-008 | ✅ Automated |

## Expected Workflow Output

### Jira Issue Creation
```
Title: PrestaShop Test Automation - Code Push - PASSED
Project: PRESTA
Priority: Medium
Labels: automation, prestashop, testing, Code Push, PASSED

Description: Comprehensive test execution report with links to:
- GitHub Actions run
- Xray test execution
- Test coverage matrix
- Browser compatibility results
```

### Xray Test Execution
```
Summary: PrestaShop Automated Test Execution - master
Environment: PrestaShop Demo
Test Plan: PRESTA-TP-001
Status: All tests tracked with individual pass/fail status
Evidence: HTML reports and screenshots attached
```

## Validation Steps

### 1. Test Jira Integration
```bash
# Trigger workflow manually
git commit --allow-empty -m "Test Jira integration"
git push origin master
```

Check:
- [ ] Jira issue created in PRESTA project
- [ ] Issue contains test execution details
- [ ] Status updated based on test results

### 2. Test Xray Integration
After Jira integration works:
- [ ] Xray test execution created
- [ ] All 8 test areas tracked
- [ ] Test results properly recorded
- [ ] Evidence files attached

### 3. Test Complete Integration
- [ ] Jira issue links to Xray execution
- [ ] Test coverage matrix populated
- [ ] Traceability complete from code to test results

## Troubleshooting

### Common Issues

#### Jira Authentication Errors
```
Error: 401 Unauthorized
Solution: Verify JIRA_API_TOKEN is valid and JIRA_USER_EMAIL matches token owner
```

#### Xray Authentication Errors
```
Error: Failed to authenticate with Xray
Solution: Check XRAY_CLIENT_ID and XRAY_CLIENT_SECRET are correct
```

#### Test Key Not Found
```
Error: Test key PRESTA-T-001 not found
Solution: Ensure all test cases are created in Xray with correct keys
```

#### Missing Test Plan
```
Error: Test plan PRESTA-TP-001 not found
Solution: Create test plan in Xray and update XRAY_TEST_PLAN_KEY secret
```

### Debug Commands
```bash
# Test Jira connection
curl -u "email@domain.com:api-token" \
  -X GET "https://domain.atlassian.net/rest/api/3/myself"

# Test Xray connection
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"client_id":"your-id","client_secret":"your-secret"}' \
  "https://xray.cloud.getxray.app/api/v1/authenticate"
```

## Benefits

### For QA Teams
✅ **Centralized Test Management**: All test executions tracked in Xray  
✅ **Real-time Results**: Immediate visibility into test status  
✅ **Test Coverage Tracking**: Complete mapping of tests to requirements  
✅ **Historical Reporting**: Trend analysis and test history  

### For Development Teams
✅ **Automated Documentation**: Every commit tracked with test results  
✅ **Quality Gates**: Failed tests automatically flagged  
✅ **Traceability**: Direct links between code changes and test impact  
✅ **Compliance**: Automated audit trail for testing activities  

### For Management
✅ **Dashboard Visibility**: Real-time test status in Jira  
✅ **Quality Metrics**: Automated test coverage and success rates  
✅ **Risk Assessment**: Immediate visibility into failing tests  
✅ **Compliance Reporting**: Complete testing documentation  

## Advanced Configuration

### Custom Test Environments
Add environment-specific tracking:
```json
"testEnvironments": ["PrestaShop Demo", "Staging", "Production"]
```

### Additional Evidence Types
Attach more artifacts to Xray:
- Performance test results
- Security scan reports
- Accessibility audit results
- API test results

### Integration with Other Tools
- **Slack**: Test result notifications
- **Email**: Daily/weekly test summaries
- **Confluence**: Automated test documentation
- **Bitbucket/GitLab**: Multi-platform support

---

**Next Steps:**
1. Set up Jira project and Xray installation
2. Create test cases and test plan in Xray
3. Configure all GitHub secrets
4. Test integration with a manual workflow trigger
5. Validate complete workflow functionality