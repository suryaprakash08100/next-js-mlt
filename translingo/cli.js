#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const appName = process.argv[2] || 'my-nextjs-app'; // Default app name if none provided
const targetPath = path.join(process.cwd(), appName); // Where the app will be created
const templatePath = path.join(__dirname, 'next-js-mlt'); // Path to your template folder

(async () => {
    try {
        console.log(`Creating a new Next.js app in "${targetPath}"...`);

        // Step 1: Copy the template files to the target location
        await fs.copy(templatePath, targetPath);

        // Step 2: Navigate to the new project directory and install dependencies
        console.log('Installing dependencies...');
        execSync('npm install', { cwd: targetPath, stdio: 'inherit' });

        console.log('Success! Your Next.js app is ready.');
        console.log(`\nTo get started:\n`);
        console.log(`cd ${appName}`);
        console.log(`npm run dev`);
    } catch (error) {
        console.error('Error creating the app:', error.message);
    }
})();
