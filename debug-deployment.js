#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('=== Deployment Debug Tool ===\n');

// Check 1: Files with problematic characters
console.log('1. Checking for files with spaces or special characters...');
function findProblematicFiles(dir, results = []) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      // Check for spaces, special chars
      if (/[\s()]/.test(file) && !file.startsWith('.')) {
        results.push(fullPath);
      }

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        findProblematicFiles(fullPath, results);
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  return results;
}

const publicProblems = findProblematicFiles('./public');
if (publicProblems.length > 0) {
  console.log('❌ Found problematic files:');
  publicProblems.forEach(f => console.log(`   - ${f}`));
} else {
  console.log('✅ No problematic files found in public/');
}

// Check 2: Binary files that are too small (placeholder files)
console.log('\n2. Checking for placeholder/dummy binary files...');
function checkBinaryFiles(dir, results = []) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isFile() && /\.(png|jpg|jpeg|gif|ico)$/i.test(file)) {
        if (stat.size < 100) { // Suspiciously small
          results.push({ path: fullPath, size: stat.size });
        }
      }

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        checkBinaryFiles(fullPath, results);
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  return results;
}

const smallBinaries = checkBinaryFiles('./public');
if (smallBinaries.length > 0) {
  console.log('⚠️  Found suspiciously small binary files (possible placeholders):');
  smallBinaries.forEach(f => console.log(`   - ${f.path} (${f.size} bytes)`));
} else {
  console.log('✅ All binary files appear to have proper size');
}

// Check 3: Missing files referenced in code
console.log('\n3. Checking for missing file references...');
const imageRefs = new Set();

function scanForImageRefs(dir) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isFile() && /\.(tsx?|jsx?)$/.test(file)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        // Find image references
        const matches = content.matchAll(/['"](\/[^'"]*\.(png|jpg|jpeg|gif|ico))['"]/gi);
        for (const match of matches) {
          imageRefs.add(match[1]);
        }
      }

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
        scanForImageRefs(fullPath);
      }
    });
  } catch (err) {
    console.error(`Error scanning ${dir}:`, err.message);
  }
}

scanForImageRefs('./app');
scanForImageRefs('./components');

const missingFiles = [];
imageRefs.forEach(ref => {
  const filePath = path.join('./public', ref);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(ref);
  }
});

if (missingFiles.length > 0) {
  console.log('❌ Missing files referenced in code:');
  missingFiles.forEach(f => console.log(`   - ${f}`));
} else {
  console.log('✅ All referenced image files exist');
}

// Check 4: Environment variables
console.log('\n4. Checking environment variables...');
const envFile = '.env';
if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, 'utf8');
  const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL');
  const hasSupabaseKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  if (hasSupabaseUrl && hasSupabaseKey) {
    console.log('✅ Supabase environment variables configured');
  } else {
    console.log('⚠️  Missing Supabase environment variables');
  }
} else {
  console.log('⚠️  No .env file found');
}

// Check 5: Next.js config
console.log('\n5. Checking Next.js configuration...');
const nextConfigPath = './next.config.js';
if (fs.existsSync(nextConfigPath)) {
  console.log('✅ next.config.js exists');
  const configContent = fs.readFileSync(nextConfigPath, 'utf8');
  if (configContent.includes('unoptimized: true')) {
    console.log('✅ Images are set to unoptimized (good for static export)');
  }
} else {
  console.log('❌ next.config.js not found');
}

// Check 6: Package.json
console.log('\n6. Checking package.json...');
const pkgPath = './package.json';
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  console.log(`✅ Package: ${pkg.name}@${pkg.version}`);
  console.log(`   Next.js version: ${pkg.dependencies.next}`);
  console.log(`   React version: ${pkg.dependencies.react}`);
} else {
  console.log('❌ package.json not found');
}

console.log('\n=== Debug Complete ===');
console.log('\nIf you see any ❌ or ⚠️  above, those issues need to be fixed before deployment.\n');
