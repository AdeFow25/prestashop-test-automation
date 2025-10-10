require('dotenv').config();
const axios = require('axios');

class JiraIntegration {
  async linkTestToStory(testKey, storyKey) {
    // Xray Test Coverage API endpoint
    const url = `${this.baseURL}/rest/raven/1.0/api/test/${testKey}/cover`;
    try {
      // Link test to story
      await axios.post(url, { issues: [storyKey] }, { headers: this.headers });
      console.log(`🔗 Linked Xray Test ${testKey} to User Story ${storyKey}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to link Xray Test ${testKey} to User Story ${storyKey}:`, error.response?.data || error.message);
      return false;
    }
  }
  constructor() {
    this.baseURL = process.env.JIRA_BASE_URL;
    this.email = process.env.JIRA_EMAIL;
    this.apiToken = process.env.JIRA_API_TOKEN;
    this.projectKey = process.env.JIRA_PROJECT_KEY;
    
    const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString('base64');
    this.headers = {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  async testConnection() {
    try {
      console.log('🔍 Testing Jira connection...');
      const response = await axios.get(`${this.baseURL}/rest/api/3/myself`, {
        headers: this.headers
      });
      
      console.log('✅ Successfully connected to Jira!');
      console.log(`👤 User: ${response.data.displayName} (${response.data.emailAddress})`);
      return true;
    } catch (error) {
      console.error('❌ Connection failed:', error.response?.data || error.message);
      return false;
    }
  }

  async getProject() {
    try {
      console.log(`🔍 Checking project: ${this.projectKey}...`);
      const response = await axios.get(`${this.baseURL}/rest/api/3/project/${this.projectKey}`, {
        headers: this.headers
      });
      
      console.log(`✅ Project found: ${response.data.name}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        console.error(`❌ Project '${this.projectKey}' not found`);
        return null;
      }
      console.error('❌ Error checking project:', error.response?.data || error.message);
      throw error;
    }
  }

  async createIssue(issueData) {
    try {
      const response = await axios.post(`${this.baseURL}/rest/api/3/issue`, issueData, {
        headers: this.headers
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Failed to create issue:', error.response?.data || error.message);
      throw error;
    }
  }

  async importTestScenarios() {
    console.log('📋 Starting import of PrestaShop test scenarios...');
    
  // Test scenarios data based on validated PrestaShop test plan
  const userStories = [
      {
        name: 'Homepage and Navigation Testing',
        description: 'Test homepage functionality, header elements, and category navigation features',
        stories: [
          {
            summary: 'Homepage Load and Header Elements',
            description: 'Verify PrestaShop homepage loads correctly with logo, search bar, sign-in link, and cart icon',
            storyPoints: 3
          },
          {
            summary: 'Category Navigation',
            description: 'Test category navigation dropdowns, subcategories, and breadcrumb navigation',
            storyPoints: 5
          }
        ]
      },
      {
        name: 'Product Search Testing',
        description: 'Validate search functionality, results display, and edge cases',
        stories: [
          {
            summary: 'Basic Product Search',
            description: 'Test basic product search functionality with valid search terms',
            storyPoints: 3
          },
          {
            summary: 'Empty Search Results',
            description: 'Test handling of search queries with no results and error messaging',
            storyPoints: 2
          }
        ]
      },
      {
        name: 'Product Detail Pages',
        description: 'Test product information display, variants, and options functionality',
        stories: [
          {
            summary: 'Product Information Display',
            description: 'Verify product images, descriptions, pricing, and add to cart button display',
            storyPoints: 3
          },
          {
            summary: 'Product Variants and Options',
            description: 'Test size/color selection, price updates, and quantity selector functionality',
            storyPoints: 5
          }
        ]
      },
      {
        name: 'Shopping Cart Management',
        description: 'Test cart functionality, operations, and cart state management',
        stories: [
          {
            summary: 'Add Products to Cart',
            description: 'Test adding products to shopping cart with options and quantity selection',
            storyPoints: 3
          },
          {
            summary: 'Cart Operations',
            description: 'Test cart viewing, quantity updates, item removal, and total calculations',
            storyPoints: 5
          }
        ]
      },
      {
        name: 'User Registration and Authentication',
        description: 'Test user account creation, login, and authentication workflows',
        stories: [
          {
            summary: 'New User Registration',
            description: 'Test user registration form, validation, and account creation process',
            storyPoints: 5
          },
          {
            summary: 'User Login Process',
            description: 'Test user login functionality, authentication, and session management',
            storyPoints: 3
          }
        ]
      },
      {
        name: 'Checkout Process',
        description: 'Test guest and registered user checkout workflows and payment processing',
        stories: [
          {
            summary: 'Guest Checkout Flow',
            description: 'Test guest checkout process including address entry, shipping, and payment',
            storyPoints: 8
          },
          {
            summary: 'Registered User Checkout',
            description: 'Test streamlined checkout process for logged-in users',
            storyPoints: 5
          }
        ]
      },
      {
        name: 'Newsletter and Footer',
        description: 'Test newsletter subscription and footer navigation functionality',
        stories: [
          {
            summary: 'Newsletter Subscription',
            description: 'Test newsletter signup form, email validation, and confirmation messaging',
            storyPoints: 3
          },
          {
            summary: 'Footer Navigation',
            description: 'Test footer links, social media icons, and footer information accuracy',
            storyPoints: 2
          }
        ]
      },
      {
        name: 'Error Handling and Edge Cases',
        description: 'Test form validation, browser compatibility, and error scenarios',
        stories: [
          {
            summary: 'Form Validation',
            description: 'Test form validation, error messages, and required field handling',
            storyPoints: 5
          },
          {
            summary: 'Browser Compatibility',
            description: 'Test functionality across different browsers and responsive design',
            storyPoints: 3
          }
        ]
      }
    ];

    try {
      // Use project-specific issue type IDs (update these to match your Jira/Xray instance)
      const storyTypeId = '10001'; // Story for PRESTA project
      const testTypeId = '10007'; // Xray Test for PRESTA project

      console.log(`📝 Using Story type: ${storyTypeId}, Test type: ${testTypeId}`);

      let createdCount = 0;

      // Create user stories and Xray test cases
      for (const userStory of userStories) {
        console.log(`\n🎯 Creating User Story: ${userStory.name}`);

        // Create User Story (was Epic)
        const storyData = {
          fields: {
            project: { key: this.projectKey },
            summary: userStory.name,
            description: {
              type: "doc",
              version: 1,
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: userStory.description
                    }
                  ]
                }
              ]
            },
            issuetype: { id: storyTypeId },
            labels: ['testing', 'automation', 'prestashop']
          }
        };

        const createdStory = await this.createIssue(storyData);
        console.log(`✅ User Story created: ${createdStory.key}`);
        createdCount++;

        // Create Xray Test cases (was Stories)
        for (const testCase of userStory.stories) {
          console.log(`📖 Creating Xray Test Case: ${testCase.summary}`);

          const testData = {
            fields: {
              project: { key: this.projectKey },
              summary: testCase.summary,
              description: {
                type: "doc",
                version: 1,
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: testCase.description
                      }
                    ]
                  }
                ]
              },
              issuetype: { id: testTypeId },
              labels: ['testing', 'automation']
            }
          };

          const createdTest = await this.createIssue(testData);
          console.log(`✅ Xray Test Case created: ${createdTest.key}`);
          createdCount++;

          // Link Xray Test to User Story
          await this.linkTestToStory(createdTest.key, createdStory.key);
        }
      }

      console.log(`\n🎉 Successfully imported ${createdCount} issues to Jira!`);
      console.log(`🔗 View project: ${this.baseURL}/jira/software/projects/${this.projectKey}`);

    } catch (error) {
      console.error('❌ Import failed:', error.message);
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting Jira Integration for PrestaShop Test Automation\n');
  
  const jira = new JiraIntegration();
  
  // Test connection
  const connected = await jira.testConnection();
  if (!connected) {
    console.log('❌ Cannot proceed without valid Jira connection');
    return;
  }
  
  // Check project
  const project = await jira.getProject();
  if (!project) {
    console.log('❌ Project not found. Please create the project first or check the project key.');
    return;
  }
  
  // Import test scenarios
  await jira.importTestScenarios();
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = JiraIntegration;