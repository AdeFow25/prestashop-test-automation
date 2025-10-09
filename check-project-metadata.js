require('dotenv').config();
const axios = require('axios');

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
const headers = {
  'Authorization': `Basic ${auth}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

async function checkProjectMetadata() {
  try {
    console.log('🔍 Getting project create metadata...');
    
    const response = await axios.get(
      `${JIRA_BASE_URL}/rest/api/3/issue/createmeta?projectKeys=${PROJECT_KEY}&expand=projects.issuetypes.fields`,
      { headers }
    );
    
    const project = response.data.projects[0];
    console.log(`📋 Project: ${project.name} (${project.key})`);
    console.log(`📝 Available issue types for this project:`);
    
    project.issuetypes.forEach((issueType, index) => {
      console.log(`${index + 1}. ${issueType.name} (ID: ${issueType.id})`);
      console.log(`   Description: ${issueType.description}`);
      console.log(`   Subtask: ${issueType.subtask}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

checkProjectMetadata();