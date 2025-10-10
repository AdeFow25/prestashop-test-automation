import os
import requests
from dotenv import load_dotenv
import os
import requests
from dotenv import load_dotenv

load_dotenv()
JIRA_BASE_URL = os.getenv("JIRA_BASE_URL")
JIRA_EMAIL = os.getenv("JIRA_EMAIL")
JIRA_API_TOKEN = os.getenv("JIRA_API_TOKEN")
JIRA_PROJECT_KEY = os.getenv("JIRA_PROJECT_KEY")

def get_test_execution_issues():
    # Search for all Test Execution issues in the project
    jql = f'project = {JIRA_PROJECT_KEY} AND issuetype = "Test Execution"'
    url = f"{JIRA_BASE_URL}/rest/api/2/search"
    headers = {"Content-Type": "application/json"}
    auth = (JIRA_EMAIL, JIRA_API_TOKEN)
    params = {"jql": jql, "fields": ["key", "status"]}
    response = requests.post(url, json=params, headers=headers, auth=auth)
    response.raise_for_status()
    return response.json()["issues"]

def summarize_executions(issues):
    total = len(issues)
    status_count = {}
    for issue in issues:
        status = issue["fields"]["status"]["name"]
        status_count[status] = status_count.get(status, 0) + 1
    print(f"Total Test Executions: {total}")
    for status, count in status_count.items():
        print(f"{status}: {count}")

if __name__ == "__main__":
    issues = get_test_execution_issues()
    summarize_executions(issues)
