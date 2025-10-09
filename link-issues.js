require('dotenv').config();
const axios = require('axios');

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
const headers = {
  'Authorization': `Basic ${auth}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

async function getAvailableLinkTypes() {
  try {
    console.log('🔍 Getting available issue link types...');
    
    const response = await axios.get(`${JIRA_BASE_URL}/rest/api/3/issueLinkType`, { headers });
    
    console.log('\n📋 Available link types:');
    response.data.issueLinkTypes.forEach((linkType, index) => {
      console.log(`${index + 1}. ${linkType.name} (ID: ${linkType.id})`);
      console.log(`   Inward: ${linkType.inward} | Outward: ${linkType.outward}`);
      console.log('');
    });
    
    // Look for a suitable link type (relates to, blocks, etc.)
    const suitableLinkType = response.data.issueLinkTypes.find(linkType => 
      linkType.name.toLowerCase().includes('relates') ||
      linkType.name.toLowerCase().includes('epic') ||
      linkType.inward.toLowerCase().includes('part') ||
      linkType.outward.toLowerCase().includes('contains')
    );
    
    return suitableLinkType || response.data.issueLinkTypes[0]; // Use first available if no suitable one found
    
  } catch (error) {
    console.error('❌ Error getting link types:', error.response?.data || error.message);
    return null;
  }
}

async function linkStoriesToEpicsUsingIssueLinks() {
  console.log('🚀 Starting Epic-Story Linking Using Issue Links\n');
  
  // Get available link types
  const linkType = await getAvailableLinkTypes();
  
  if (!linkType) {
    console.log('❌ Could not find suitable link types');
    return;
  }
  
  console.log(`✅ Using link type: ${linkType.name} (${linkType.id})`);
  console.log(`   Direction: Stories "${linkType.inward}" Epic\n`);
  
  // Define the story-to-epic mappings
  const storyMappings = [
    // Homepage and Navigation Testing (PRESTA-1)
    { storyKey: 'PRESTA-2', epicKey: 'PRESTA-1', storyName: 'Homepage Load and Header Elements', epicName: 'Homepage and Navigation Testing' },
    { storyKey: 'PRESTA-3', epicKey: 'PRESTA-1', storyName: 'Category Navigation', epicName: 'Homepage and Navigation Testing' },
    
    // Product Search Testing (PRESTA-4)
    { storyKey: 'PRESTA-5', epicKey: 'PRESTA-4', storyName: 'Basic Product Search', epicName: 'Product Search Testing' },
    { storyKey: 'PRESTA-6', epicKey: 'PRESTA-4', storyName: 'Empty Search Results', epicName: 'Product Search Testing' },
    
    // Product Detail Pages (PRESTA-7)
    { storyKey: 'PRESTA-8', epicKey: 'PRESTA-7', storyName: 'Product Information Display', epicName: 'Product Detail Pages' },
    { storyKey: 'PRESTA-9', epicKey: 'PRESTA-7', storyName: 'Product Variants and Options', epicName: 'Product Detail Pages' },
    
    // Shopping Cart Management (PRESTA-10)
    { storyKey: 'PRESTA-11', epicKey: 'PRESTA-10', storyName: 'Add Products to Cart', epicName: 'Shopping Cart Management' },
    { storyKey: 'PRESTA-12', epicKey: 'PRESTA-10', storyName: 'Cart Operations', epicName: 'Shopping Cart Management' },
    
    // User Registration and Authentication (PRESTA-13)
    { storyKey: 'PRESTA-14', epicKey: 'PRESTA-13', storyName: 'New User Registration', epicName: 'User Registration and Authentication' },
    { storyKey: 'PRESTA-15', epicKey: 'PRESTA-13', storyName: 'User Login Process', epicName: 'User Registration and Authentication' },
    
    // 🎯 Checkout Process (PRESTA-16) - Your highlighted epic!
    { storyKey: 'PRESTA-17', epicKey: 'PRESTA-16', storyName: 'Guest Checkout Flow', epicName: 'Checkout Process' },
    { storyKey: 'PRESTA-18', epicKey: 'PRESTA-16', storyName: 'Registered User Checkout', epicName: 'Checkout Process' },
    
    // Newsletter and Footer (PRESTA-19)
    { storyKey: 'PRESTA-20', epicKey: 'PRESTA-19', storyName: 'Newsletter Subscription', epicName: 'Newsletter and Footer' },
    { storyKey: 'PRESTA-21', epicKey: 'PRESTA-19', storyName: 'Footer Navigation', epicName: 'Newsletter and Footer' },
    
    // Error Handling and Edge Cases (PRESTA-22)
    { storyKey: 'PRESTA-23', epicKey: 'PRESTA-22', storyName: 'Form Validation', epicName: 'Error Handling and Edge Cases' },
    { storyKey: 'PRESTA-24', epicKey: 'PRESTA-22', storyName: 'Browser Compatibility', epicName: 'Error Handling and Edge Cases' }
  ];
  
  console.log('🔗 Creating issue links between stories and epics...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const mapping of storyMappings) {
    try {
      console.log(`📖 Linking ${mapping.storyKey} (${mapping.storyName})`);
      console.log(`   → to Epic ${mapping.epicKey} (${mapping.epicName})`);
      
      const linkData = {
        type: {
          id: linkType.id
        },
        inwardIssue: {
          key: mapping.storyKey
        },
        outwardIssue: {
          key: mapping.epicKey
        },
        comment: {
          body: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: `Linking story to its parent epic for test organization`
                  }
                ]
              }
            ]
          }
        }
      };
      
      await axios.post(
        `${JIRA_BASE_URL}/rest/api/3/issueLink`,
        linkData,
        { headers }
      );
      
      console.log(`✅ Successfully linked ${mapping.storyKey} to ${mapping.epicKey}`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed to link ${mapping.storyKey}:`, error.response?.data || error.message);
      failCount++;
    }
    
    console.log(''); // Add spacing between each link attempt
  }
  
  console.log(`🎉 Issue linking complete!`);
  console.log(`✅ Successfully linked: ${successCount} stories to their epics`);
  console.log(`❌ Failed to link: ${failCount} stories`);
  
  if (successCount > 0) {
    console.log(`\n🔗 View your organized project: ${JIRA_BASE_URL}/jira/software/projects/PRESTA`);
    console.log(`\n📋 Your Checkout Process Epic (${mapping.epicKey}) now has linked stories:`);
    console.log(`   • PRESTA-17: Guest Checkout Flow`);
    console.log(`   • PRESTA-18: Registered User Checkout`);
  }
}

linkStoriesToEpicsUsingIssueLinks().catch(console.error);