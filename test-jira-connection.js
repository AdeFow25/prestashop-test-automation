require('dotenv').config();
const axios = require('axios');

class JiraConnectionTest {
  constructor() {
    this.baseURL = process.env.JIRA_BASE_URL;
    this.email = process.env.JIRA_EMAIL;
    this.apiToken = process.env.JIRA_API_TOKEN;
    this.projectKey = process.env.JIRA_PROJECT_KEY;
    
    // Create auth header
    this.auth = Buffer.from(`${this.email}:${this.apiToken}`).toString('base64');
    
    this.headers = {
      'Authorization': `Basic ${this.auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  async testConnection() {
    try {
      console.log('🔍 Testing Jira connection...');
      console.log(`📍 Base URL: ${this.baseURL}`);
      console.log(`📧 Email: ${this.email}`);
      console.log(`🔑 API Token: ${'*'.repeat(20)}...`);
      
      const response = await axios.get(`${this.baseURL}/rest/api/3/myself`, {
        headers: this.headers
      });
      
      console.log('\n✅ Successfully connected to Jira!');
      console.log(`👤 User: ${response.data.displayName}`);
      console.log(`📧 Email: ${response.data.emailAddress}`);
      console.log(`🏢 Account ID: ${response.data.accountId}`);
      console.log(`🌐 Timezone: ${response.data.timeZone || 'Not specified'}`);
      
      return response.data;
    } catch (error) {
      console.error('\n❌ Failed to connect to Jira:');
      if (error.response) {
        console.error(`📊 Status: ${error.response.status} ${error.response.statusText}`);
        console.error(`📝 Error: ${JSON.stringify(error.response.data, null, 2)}`);
      } else {
        console.error(`🔌 Network Error: ${error.message}`);
      }
      return null;
    }
  }

  async checkProject() {
    try {
      console.log(`\n🔍 Checking project: ${this.projectKey}...`);
      const response = await axios.get(`${this.baseURL}/rest/api/3/project/${this.projectKey}`, {
        headers: this.headers
      });
      
      console.log('✅ Project found!');
      console.log(`📋 Name: ${response.data.name}`);
      console.log(`🔑 Key: ${response.data.key}`);
      console.log(`📂 Project Type: ${response.data.projectTypeKey}`);
      console.log(`🔗 URL: ${response.data.self}`);
      console.log(`👤 Lead: ${response.data.lead?.displayName || 'Not specified'}`);
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        console.log(`⚠️ Project "${this.projectKey}" not found`);
        console.log('💡 You may need to create the project first or check the project key');
        return null;
      } else {
        console.error('❌ Error checking project:');
        console.error(`📊 Status: ${error.response?.status}`);
        console.error(`📝 Error: ${JSON.stringify(error.response?.data, null, 2)}`);
        throw error;
      }
    }
  }

  async getAvailableProjects() {
    try {
      console.log('\n🔍 Getting available projects...');
      const response = await axios.get(`${this.baseURL}/rest/api/3/project`, {
        headers: this.headers
      });
      
      console.log(`✅ Found ${response.data.length} accessible projects:`);
      response.data.forEach((project, index) => {
        console.log(`${index + 1}. ${project.name} (${project.key}) - ${project.projectTypeKey}`);
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error getting projects:', error.response?.data || error.message);
      throw error;
    }
  }

  async getIssueTypes() {
    try {
      console.log('\n🔍 Getting available issue types...');
      const response = await axios.get(`${this.baseURL}/rest/api/3/issuetype`, {
        headers: this.headers
      });
      
      console.log(`✅ Found ${response.data.length} issue types:`);
      response.data.forEach((issueType, index) => {
        console.log(`${index + 1}. ${issueType.name} (ID: ${issueType.id}) - ${issueType.description || 'No description'}`);
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error getting issue types:', error.response?.data || error.message);
      throw error;
    }
  }
}

// Main execution
async function testJiraConnection() {
  console.log('🚀 Testing Jira Connection for PrestaShop Test Automation\n');
  console.log('=' * 60);
  
  const jira = new JiraConnectionTest();
  
  // Test basic connection
  const userInfo = await jira.testConnection();
  if (!userInfo) {
    console.log('\n❌ Connection test failed. Please check your credentials in .env file');
    return;
  }
  
  // Check specific project
  const project = await jira.checkProject();
  
  // Get available projects
  await jira.getAvailableProjects();
  
  // Get issue types
  await jira.getIssueTypes();
  
  console.log('\n' + '=' * 60);
  console.log('🎉 Connection test completed successfully!');
  
  if (project) {
    console.log('✅ Your project is ready for test scenario import');
    console.log(`🔗 Project URL: ${jira.baseURL}/jira/software/projects/${jira.projectKey}`);
  } else {
    console.log('⚠️ Project not found - you may need to create it first');
  }
  
  console.log('\n💡 To import test scenarios, run the full jira-integration.js script');
}

// Run the test
testJiraConnection().catch(console.error);