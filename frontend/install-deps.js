#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('📦 Installing required dependencies for the dashboard...\n');

const dependencies = [
  'framer-motion',
  'qrcode.react',
  'react-hot-toast'
];

try {
  dependencies.forEach(dep => {
    console.log(`Installing ${dep}...`);
    execSync(`npm install ${dep}`, { stdio: 'inherit' });
  });
  
  console.log('\n✅ All dependencies installed successfully!');
  console.log('\n🚀 You can now run your development server:');
  console.log('npm run dev');
} catch (error) {
  console.error('\n❌ Error installing dependencies:', error.message);
  console.log('\n📝 Please install the dependencies manually:');
  console.log('npm install framer-motion qrcode.react react-hot-toast');
}
