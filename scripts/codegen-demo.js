#!/usr/bin/env node

/**
 * Playwright Code Generation Demo Script
 * 
 * This script demonstrates how to use Playwright codegen for different scenarios
 * with the PrestaShop demo site.
 */

const { spawn } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const scenarios = {
  '1': {
    name: 'Basic Desktop Recording',
    command: 'npx playwright codegen https://demo.prestashop.com/#/en/front'
  },
  '2': {
    name: 'Chrome-specific Recording',
    command: 'npx playwright codegen --browser=chromium https://demo.prestashop.com/#/en/front'
  },
  '3': {
    name: 'Edge-specific Recording',
  command: 'npx playwright codegen --browser="Microsoft Edge" https://demo.prestashop.com/#/en/front'
  },
  '4': {
    name: 'Mobile Recording (iPhone 12)',
    command: 'npx playwright codegen --device="iPhone 12" https://demo.prestashop.com/#/en/front'
  },
  '5': {
    name: 'Tablet Recording (iPad Pro)',
    command: 'npx playwright codegen --device="iPad Pro" https://demo.prestashop.com/#/en/front'
  },
  '6': {
    name: 'Generate Checkout Test',
    command: 'npx playwright codegen https://demo.prestashop.com/#/en/front --save-as=tests/generated-checkout.spec.ts'
  },
  '7': {
    name: 'Generate Search Test',
    command: 'npx playwright codegen https://demo.prestashop.com/#/en/front --save-as=tests/generated-search.spec.ts'
  },
  '8': {
    name: 'Custom Viewport Recording',
    command: 'npx playwright codegen --viewport-size=1920,1080 https://demo.prestashop.com/#/en/front'
  }
};

function showMenu() {
  console.log('\n🎭 Playwright Code Generation for PrestaShop Demo');
  console.log('====================================================');
  console.log('Choose a recording scenario:');
  console.log('');
  
  Object.entries(scenarios).forEach(([key, scenario]) => {
    console.log(`${key}. ${scenario.name}`);
  });
  
  console.log('q. Quit');
  console.log('');
}

function runCommand(command) {
  console.log(`\n🚀 Running: ${command}`);
  console.log('📝 Playwright Inspector will open. Record your actions and close when done.\n');
  
  const child = spawn(command, { shell: true, stdio: 'inherit' });
  
  child.on('close', (code) => {
    if (code === 0) {
      console.log('\n✅ Recording completed successfully!');
      console.log('💡 Don\'t forget to enhance the generated code with:');
      console.log('   - Iframe helper utilities');
      console.log('   - Proper assertions');
      console.log('   - Error handling');
      console.log('   - Jira story references');
    } else {
      console.log(`\n❌ Recording ended with code ${code}`);
    }
    
    setTimeout(() => {
      askForInput();
    }, 1000);
  });
}

function askForInput() {
  rl.question('\nEnter your choice (1-8 or q): ', (answer) => {
    if (answer.toLowerCase() === 'q') {
      console.log('\n👋 Happy testing!');
      rl.close();
      return;
    }
    
    const scenario = scenarios[answer];
    if (scenario) {
      runCommand(scenario.command);
    } else {
      console.log('❌ Invalid choice. Please try again.');
      askForInput();
    }
  });
}

// Main execution
console.log('🎯 PrestaShop Test Code Generation Tool');
console.log('=======================================');
console.log('');
console.log('This tool helps you record user interactions and generate Playwright test code.');
console.log('');
console.log('📋 Recording Tips:');
console.log('   • Navigate slowly to capture all actions');
console.log('   • Focus on the iframe content area');
console.log('   • Test one user flow per recording session');
console.log('   • Add assertions by using the "Assert" button in the inspector');

showMenu();
askForInput();