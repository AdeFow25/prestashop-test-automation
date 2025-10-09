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

async function analyzeExistingStory() {
  try {
    console.log('🔍 Analyzing existing story to find Epic Link field...');
    
    // Get details of PRESTA-2 (first story)
    const response = await axios.get(
      `${JIRA_BASE_URL}/rest/api/3/issue/PRESTA-2?expand=editmeta`,
      { headers }
    );
    
    const story = response.data;
    console.log(`📖 Story: ${story.key} - ${story.fields.summary}`);
    
    console.log('\n📋 Available fields in edit meta:');
    const editMeta = story.editmeta;
    
    if (editMeta && editMeta.fields) {
      for (const [fieldId, field] of Object.entries(editMeta.fields)) {
        if (field.name && (
          field.name.toLowerCase().includes('epic') ||
          field.name.toLowerCase().includes('parent') ||
          fieldId.includes('epic') ||
          fieldId.includes('parent')
        )) {
          console.log(`🎯 Found potential Epic field: ${fieldId} - ${field.name}`);
          console.log(`   Schema: ${field.schema?.type || 'unknown'}`);
          console.log(`   Operations: ${field.operations?.join(', ') || 'none'}`);
          console.log('');
        }
      }
    }
    
    // Also check current field values
    console.log('\n📋 Current field values:');
    for (const [fieldId, value] of Object.entries(story.fields)) {
      if (fieldId.includes('epic') || fieldId.includes('parent') || 
          (typeof value === 'string' && value.includes('PRESTA'))) {
        console.log(`🔍 ${fieldId}: ${JSON.stringify(value)}`);
      }
    }
    
    // Let's try using the parent field approach for Epic linkage
    console.log('\n💡 Attempting to link using parent field approach...');
    
    try {
      const updateData = {
        fields: {
          parent: { key: 'PRESTA-1' }
        }
      };
      
      await axios.put(
        `${JIRA_BASE_URL}/rest/api/3/issue/PRESTA-2`,
        updateData,
        { headers }
      );
      
      console.log('✅ Successfully linked PRESTA-2 to PRESTA-1 using parent field!');
      return 'parent';
      
    } catch (error) {
      console.log('❌ Parent field approach failed:', error.response?.data?.errors || error.message);
    }
    
    // Try common Epic Link field IDs
    const commonEpicFields = ['customfield_10014', 'customfield_10008', 'customfield_10002'];
    
    for (const fieldId of commonEpicFields) {
      try {
        console.log(`💡 Trying Epic Link field: ${fieldId}...`);
        
        const updateData = {
          fields: {
            [fieldId]: 'PRESTA-1'
          }
        };
        
        await axios.put(
          `${JIRA_BASE_URL}/rest/api/3/issue/PRESTA-3`,
          updateData,
          { headers }
        );
        
        console.log(`✅ Successfully linked PRESTA-3 to PRESTA-1 using ${fieldId}!`);
        return fieldId;
        
      } catch (error) {
        console.log(`❌ ${fieldId} failed:`, error.response?.data?.errors || error.message);
      }
    }
    
    return null;
    
  } catch (error) {
    console.error('❌ Error analyzing story:', error.response?.data || error.message);
    return null;
  }
}

analyzeExistingStory().catch(console.error);