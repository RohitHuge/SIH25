#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Appwrite environment variables...\n');

const envPath = path.join(__dirname, '.env');
const envExample = `# Appwrite Configuration
# Replace these values with your actual Appwrite project details

# Your Appwrite Project Endpoint
VITE_APPWRITE_PROJECT_ENDPOINT=https://cloud.appwrite.io/v1

# Your Appwrite Project ID (get this from your Appwrite console)
VITE_APPWRITE_PROJECT_ID=your-actual-project-id-here

# Instructions:
# 1. Replace 'your-actual-project-id-here' with your actual project ID
# 2. Make sure the endpoint URL is correct for your Appwrite setup
# 3. Restart your development server after making changes
`;

if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  console.log('📝 Please check if your Appwrite credentials are correctly set\n');
} else {
  try {
    fs.writeFileSync(envPath, envExample);
    console.log('✅ Created .env file with template');
    console.log('📝 Please edit .env file and add your actual Appwrite credentials\n');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    console.log('\n📝 Please manually create a .env file with the following content:');
    console.log(envExample);
  }
}

console.log('🚀 Next steps:');
console.log('1. Get your Appwrite Project ID from https://cloud.appwrite.io');
console.log('2. Edit the .env file and replace "your-actual-project-id-here"');
console.log('3. Run "npm run dev" to start the development server');
console.log('\n📚 For more help, check APPWRITE_SETUP.md');
