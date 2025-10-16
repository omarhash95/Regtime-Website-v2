#!/usr/bin/env node

/**
 * Error Capture Script
 *
 * This script will help capture and log any errors that occur
 * during the build or deployment process.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== Error Capture Tool ===\n');
console.log('This will run a build and capture any errors...\n');

const logFile = path.join(__dirname, 'error-log.txt');
const timestamp = new Date().toISOString();

let output = `Build Attempt: ${timestamp}\n`;
output += '='.repeat(80) + '\n\n';

try {
  console.log('1. Checking Node version...');
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  output += `Node version: ${nodeVersion}\n`;
  console.log(`   Node: ${nodeVersion.trim()}`);

  console.log('2. Checking npm version...');
  const npmVersion = execSync('npm --version', { encoding: 'utf8' });
  output += `npm version: ${npmVersion}\n`;
  console.log(`   npm: ${npmVersion.trim()}`);

  console.log('3. Checking package.json...');
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  output += `\nPackage: ${pkg.name}@${pkg.version}\n`;
  output += `Next.js: ${pkg.dependencies.next}\n`;
  output += `React: ${pkg.dependencies.react}\n\n`;

  console.log('4. Running build...');
  output += 'Build Output:\n' + '-'.repeat(80) + '\n';

  const buildOutput = execSync('npm run build', {
    encoding: 'utf8',
    stdio: 'pipe'
  });

  output += buildOutput + '\n';
  output += '-'.repeat(80) + '\n\n';

  console.log('✅ Build succeeded!\n');
  output += 'BUILD STATUS: SUCCESS\n';

} catch (error) {
  console.error('❌ Build failed!\n');
  output += 'BUILD STATUS: FAILED\n\n';
  output += 'Error Details:\n' + '-'.repeat(80) + '\n';

  if (error.stdout) {
    output += 'STDOUT:\n' + error.stdout + '\n\n';
  }

  if (error.stderr) {
    output += 'STDERR:\n' + error.stderr + '\n\n';
  }

  output += 'Error Message:\n' + error.message + '\n';
  output += '-'.repeat(80) + '\n';

  console.error('Error captured. Details:');
  console.error('Message:', error.message);
  if (error.stdout) console.error('\nStdout:', error.stdout.slice(0, 500));
  if (error.stderr) console.error('\nStderr:', error.stderr.slice(0, 500));
}

// Write to log file
fs.writeFileSync(logFile, output);
console.log(`\nLog saved to: ${logFile}`);
console.log('You can share this file for debugging.\n');

// Also run the diagnostic tool
console.log('Running diagnostic tool...\n');
try {
  const diagnosticOutput = execSync('node debug-deployment.js', {
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log(diagnosticOutput);

  fs.appendFileSync(logFile, '\n\n' + '='.repeat(80) + '\n');
  fs.appendFileSync(logFile, 'Diagnostic Output:\n');
  fs.appendFileSync(logFile, '='.repeat(80) + '\n');
  fs.appendFileSync(logFile, diagnosticOutput);
} catch (err) {
  console.error('Could not run diagnostic tool:', err.message);
}

console.log('=== Complete ===');
