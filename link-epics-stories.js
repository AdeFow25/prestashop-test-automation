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

async function findEpicLinkField() {
  try {
    console.log('🔍 Finding Epic Link field...');
    
    // Get fields for Story issue type
    const response = await axios.get(
      `${JIRA_BASE_URL}/rest/api/3/issue/createmeta?projectKeys=${PROJECT_KEY}&issuetypeIds=10069&expand=projects.issuetypes.fields`,
      { headers }
    );
    
    const storyIssueType = response.data.projects[0].issuetypes[0];
    const fields = storyIssueType.fields;
    
    console.log('\n📋 Available fields for Story issue type:');
    
    // Look for Epic Link field
    let epicLinkField = null;
    
    for (const [fieldId, field] of Object.entries(fields)) {
      if (field.name && (
        field.name.toLowerCase().includes('epic') ||
        field.name.toLowerCase().includes('parent') ||
        fieldId.includes('epic')
      )) {
        console.log(`🎯 Found potential Epic field: ${fieldId} - ${field.name}`);
        if (field.name.toLowerCase().includes('epic link') || field.name.toLowerCase() === 'epic link') {
          epicLinkField = fieldId;
        }
      }
    }
    
    if (!epicLinkField) {
      // Look for any field that might be Epic Link
      for (const [fieldId, field] of Object.entries(fields)) {
        if (fieldId.startsWith('customfield_') && field.name) {
          console.log(`📝 Custom field: ${fieldId} - ${field.name}`);
        }
      }
    }
    
    return epicLinkField;
    
  } catch (error) {
    console.error('❌ Error finding Epic Link field:', error.response?.data || error.message);
    return null;
  }
}

async function linkStoriesToEpics() {
  console.log('🚀 Starting Epic-Story Linking Process\n');
  
  // Find the correct Epic Link field
  const epicLinkField = await findEpicLinkField();
  
  if (!epicLinkField) {
    console.log('\n⚠️  Could not automatically find Epic Link field.');
    console.log('💡 You may need to link stories to epics manually in Jira UI.');
    return;
  }
  
  console.log(`\n✅ Using Epic Link field: ${epicLinkField}`);
  
  // Define the story-to-epic mappings
  const storyMappings = [
    // Homepage and Navigation Testing (PRESTA-1)
    { storyKey: 'PRESTA-2', epicKey: 'PRESTA-1', storyName: 'Homepage Load and Header Elements' },
    { storyKey: 'PRESTA-3', epicKey: 'PRESTA-1', storyName: 'Category Navigation' },
    
    // Product Search Testing (PRESTA-4)
    { storyKey: 'PRESTA-5', epicKey: 'PRESTA-4', storyName: 'Basic Product Search' },
    { storyKey: 'PRESTA-6', epicKey: 'PRESTA-4', storyName: 'Empty Search Results' },
    
    // Product Detail Pages (PRESTA-7)
    { storyKey: 'PRESTA-8', epicKey: 'PRESTA-7', storyName: 'Product Information Display' },
    { storyKey: 'PRESTA-9', epicKey: 'PRESTA-7', storyName: 'Product Variants and Options' },
    
    // Shopping Cart Management (PRESTA-10)
    { storyKey: 'PRESTA-11', epicKey: 'PRESTA-10', storyName: 'Add Products to Cart' },
    { storyKey: 'PRESTA-12', epicKey: 'PRESTA-10', storyName: 'Cart Operations' },
    
    // User Registration and Authentication (PRESTA-13)
    { storyKey: 'PRESTA-14', epicKey: 'PRESTA-13', storyName: 'New User Registration' },
    { storyKey: 'PRESTA-15', epicKey: 'PRESTA-13', storyName: 'User Login Process' },
    
    // Checkout Process (PRESTA-16) - Your highlighted epic!
    { storyKey: 'PRESTA-17', epicKey: 'PRESTA-16', storyName: 'Guest Checkout Flow' },
    { storyKey: 'PRESTA-18', epicKey: 'PRESTA-16', storyName: 'Registered User Checkout' },
    
    // Newsletter and Footer (PRESTA-19)
    { storyKey: 'PRESTA-20', epicKey: 'PRESTA-19', storyName: 'Newsletter Subscription' },
    { storyKey: 'PRESTA-21', epicKey: 'PRESTA-19', storyName: 'Footer Navigation' },
    
    // Error Handling and Edge Cases (PRESTA-22)
    { storyKey: 'PRESTA-23', epicKey: 'PRESTA-22', storyName: 'Form Validation' },
    { storyKey: 'PRESTA-24', epicKey: 'PRESTA-22', storyName: 'Browser Compatibility' }
  ];
  
  console.log('\n🔗 Linking stories to epics...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const mapping of storyMappings) {
    try {
      console.log(`📖 Linking ${mapping.storyKey} (${mapping.storyName}) to Epic ${mapping.epicKey}...`);
      
      const updateData = {
        fields: {
          [epicLinkField]: mapping.epicKey
        }
      };
      
      await axios.put(
        `${JIRA_BASE_URL}/rest/api/3/issue/${mapping.storyKey}`,
        updateData,
        { headers }
      );
      
      console.log(`✅ Successfully linked ${mapping.storyKey} to ${mapping.epicKey}`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed to link ${mapping.storyKey}:`, error.response?.data || error.message);
      failCount++;
    }
  }
  
  console.log(`\n🎉 Linking complete!`);
  console.log(`✅ Successfully linked: ${successCount} stories`);
  console.log(`❌ Failed to link: ${failCount} stories`);
  
  if (successCount > 0) {
    console.log(`\n🔗 View your organized project: ${JIRA_BASE_URL}/jira/software/projects/${PROJECT_KEY}`);
  }
}

linkStoriesToEpics().catch(console.error);