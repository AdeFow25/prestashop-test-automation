# Jira Integration Setup Guide

This guide explains how to configure GitHub Actions to automatically update Jira when test automation triggers occur.

## Overview

The GitHub Actions workflow is configured to automatically:
- Create Jira issues for each test execution
- Update issue status based on test results
- Add detailed comments with test results
- Link to related user stories
- Set appropriate priority and labels

## Required GitHub Secrets

You need to configure the following secrets in your GitHub repository:

### 1. Navigate to Repository Secrets
1. Go to your GitHub repository: `https://github.com/AdeFow25/prestashop-test-automation`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### 2. Add Jira Secrets

#### JIRA_BASE_URL
- **Name:** `JIRA_BASE_URL`
- **Value:** Your Jira instance URL (e.g., `https://yourcompany.atlassian.net`)

#### JIRA_USER_EMAIL
- **Name:** `JIRA_USER_EMAIL`
- **Value:** Your Jira account email address

#### JIRA_API_TOKEN
- **Name:** `JIRA_API_TOKEN`
- **Value:** Your Jira API token
- **How to get:** 
  1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
  2. Click **Create API token**
  3. Copy the generated token

#### JIRA_PROJECT_KEY
- **Name:** `JIRA_PROJECT_KEY`
- **Value:** Your Jira project key (e.g., `TEST`, `AUTO`, `PS`)

## Jira Project Setup

### Required Issue Types
Ensure your Jira project has these issue types:
- **Task** (for test execution issues)

### Recommended Workflow Transitions
Configure transitions for:
- **To Do** (for failed tests)
- **In Progress** (for cancelled/running tests)
- **Done** (for successful tests)

## What Happens Automatically

### On Every Trigger (Push, PR, Schedule, Manual)

1. **Issue Creation:**
   - Creates a new Jira issue with test execution details
   - Sets priority based on test results (High for failures, Medium for success)
   - Adds relevant labels: `automation`, `prestashop`, `testing`, trigger type, status

2. **Status Updates:**
   - Automatically transitions issue based on test results
   - Failed tests → "To Do" status
   - Successful tests → "Done" status
   - Cancelled tests → "In Progress" status

3. **Detailed Comments:**
   - Adds execution summary with browser results
   - Lists all test categories executed
   - Provides links to GitHub Actions run
   - References related user stories

### Example Jira Issue Content

**Title:** `PrestaShop Test Automation - Code Push - PASSED`

**Description:**
```
## Test Automation Execution Report

**Trigger:** Code Push
**Status:** ✅ PASSED
**Date:** 2025-10-09 14:30:00 UTC
**Branch:** master
**Commit:** fa99b9f
**Repository:** AdeFow25/prestashop-test-automation
**Run ID:** 12345

### Test Details
- **Test Suite:** all
- **Browsers Tested:** Chrome, Firefox, Safari
- **Test Environment:** PrestaShop Demo (https://demo.prestashop.com)

### Results Summary
- **Overall Status:** PASSED
- **Test Framework:** Enhanced iframe-aware Playwright tests
- **Coverage Areas:** Homepage, Product Search, Shopping Cart, Checkout, Authentication, Error Handling

### GitHub Actions
- **Workflow Run:** [View Details](https://github.com/AdeFow25/prestashop-test-automation/actions/runs/12345)
- **Commit Details:** [View Commit](https://github.com/AdeFow25/prestashop-test-automation/commit/fa99b9f)

### Next Actions
- Tests completed successfully
- No immediate action required
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify JIRA_BASE_URL is correct (no trailing slash)
   - Check JIRA_API_TOKEN is valid and not expired
   - Ensure JIRA_USER_EMAIL matches the token owner

2. **Project Access Issues**
   - Verify JIRA_PROJECT_KEY exists
   - Ensure the user has permission to create issues in the project
   - Check if the project allows the "Task" issue type

3. **Workflow Transition Errors**
   - Verify workflow transitions exist in your Jira project
   - Check if custom workflows require specific field values
   - Ensure user has permission to transition issues

### Testing the Integration

1. **Manual Test:**
   - Go to Actions tab in GitHub
   - Click "Run workflow" manually
   - Check if Jira issue is created

2. **Code Push Test:**
   - Make a small change and push to master
   - Verify automatic issue creation

## Benefits

✅ **Automatic Documentation:** Every test run is documented in Jira  
✅ **Traceability:** Direct links between code changes and test results  
✅ **Priority Management:** Failed tests get high priority automatically  
✅ **Historical Tracking:** Complete history of test executions  
✅ **Team Visibility:** QA and development teams stay informed  
✅ **Compliance:** Automated audit trail for testing activities  

## Customization

You can customize the integration by modifying `.github/workflows/playwright.yml`:

- **Issue Content:** Update description templates
- **Labels:** Add custom labels for your workflow
- **Priority Logic:** Modify priority assignment rules
- **Status Transitions:** Adjust based on your Jira workflow
- **Comments:** Add additional test result details

---

**Next Steps:** Once secrets are configured, the integration will be active on the next workflow trigger.