# Jira Connection Setup

## Required Information

Please provide the following Jira credentials:

### 1. Jira Base URL
Example: `https://yourcompany.atlassian.net`
Your Jira instance URL (without trailing slash)

### 2. Email Address
Your Jira account email address
Example: `your.email@company.com`

### 3. API Token
Create an API token at: https://id.atlassian.com/manage-profile/security/api-tokens
- Go to your Atlassian account settings
- Navigate to Security > API tokens
- Create a new token
- Copy the generated token

### 4. Project Key (Optional)
If you already created the Jira project, provide the project key
Example: `PSTA` or `PTA`

## Security Notes
- The `.env` file is already added to `.gitignore` to prevent credentials from being committed
- API tokens are safer than passwords and can be revoked anytime
- Never share your API token publicly

## Once you provide the credentials, I can:
1. Test the connection to your Jira instance
2. Create the project automatically (if it doesn't exist)
3. Import all the test scenarios as Jira issues
4. Set up the Epic/Story structure