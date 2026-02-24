/**
 * Production Deployment Script for Websanity
 *
 * This script prepares the project for production deployment by:
 * 1. Building the project
 * 2. Verifying the build output
 * 3. Providing deployment commands
 *
 * Usage: npx tsx scripts/deploy-production-fix.ts
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = process.cwd();
const DIST_DIR = join(PROJECT_ROOT, 'dist');

interface DeploymentCheck {
  name: string;
  check: () => boolean;
  fix?: () => void;
}

console.log('🚀 Websanity Production Deployment Script\n');

// Check 1: Environment variables
const checkEnv: DeploymentCheck = {
  name: 'Environment Variables',
  check: () => {
    const envPath = join(PROJECT_ROOT, '.env');
    if (!existsSync(envPath)) {
      console.log('❌ .env file not found');
      return false;
    }
    console.log('✅ .env file exists');
    return true;
  }
};

// Check 2: Dependencies installed
const checkDependencies: DeploymentCheck = {
  name: 'Dependencies',
  check: () => {
    const pkgPath = join(PROJECT_ROOT, 'node_modules');
    if (!existsSync(pkgPath)) {
      console.log('❌ node_modules not found');
      return false;
    }
    console.log('✅ Dependencies installed');
    return true;
  },
  fix: () => {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { cwd: PROJECT_ROOT, stdio: 'inherit' });
  }
};

// Check 3: Sanity content exists
const checkSanityContent: DeploymentCheck = {
  name: 'Sanity Content',
  check: () => {
    // We'll verify by checking if we can read the Sanity client config
    const sanityPath = join(PROJECT_ROOT, 'lib', 'sanity.ts');
    if (!existsSync(sanityPath)) {
      console.log('❌ Sanity client not found');
      return false;
    }
    console.log('✅ Sanity client configured');
    return true;
  }
};

// Check 4: Portuguese integrations content
const checkPortugueseContent: DeploymentCheck = {
  name: 'Portuguese Integrations Content',
  check: () => {
    try {
      // Verify the Portuguese update script exists
      const scriptPath = join(PROJECT_ROOT, 'scripts', 'update-pt-integrations-from-url.ts');
      if (!existsSync(scriptPath)) {
        console.log('❌ Portuguese content update script not found');
        return false;
      }
      console.log('✅ Portuguese content script exists');
      return true;
    } catch (e) {
      console.log('❌ Could not verify Portuguese content');
      return false;
    }
  }
};

// Run all checks
function runChecks(checks: DeploymentCheck[]): boolean {
  let allPassed = true;

  for (const check of checks) {
    console.log(`\n🔍 Checking: ${check.name}`);
    const passed = check.check();

    if (!passed && check.fix) {
      console.log(`🔧 Attempting to fix: ${check.name}`);
      check.fix();
    }

    if (!passed) {
      allPassed = false;
    }
  }

  return allPassed;
}

// Build the project
function buildProject(): boolean {
  console.log('\n\n🔨 Building project...\n');
  try {
    execSync('npm run build', { cwd: PROJECT_ROOT, stdio: 'inherit' });
    console.log('\n✅ Build successful');
    return true;
  } catch (error) {
    console.log('\n❌ Build failed');
    return false;
  }
}

// Verify build output
function verifyBuild(): boolean {
  console.log('\n🔍 Verifying build output...\n');

  const indexPath = join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    console.log('❌ index.html not found in dist/');
    return false;
  }
  console.log('✅ index.html found');

  // Check for React app assets
  const assetsPath = join(DIST_DIR, 'assets');
  if (!existsSync(assetsPath)) {
    console.log('❌ assets/ directory not found in dist/');
    return false;
  }
  console.log('✅ assets/ directory found');

  // Check for key route files
  const indexHtml = readFileSync(indexPath, 'utf-8');
  const hasReactApp = indexHtml.includes('root') || indexHtml.includes('react');
  if (!hasReactApp) {
    console.log('❌ index.html does not appear to be React app');
    return false;
  }
  console.log('✅ React app detected in index.html');

  return true;
}

// Generate deployment instructions
function generateDeploymentInstructions(): void {
  console.log('\n\n📋 Deployment Instructions\n');
  console.log('=' .repeat(50));

  console.log('\n1️⃣  Build is ready! The dist/ folder contains the production build.');
  console.log('\n2️⃣  Deploy to your production server using one of these methods:\n');

  console.log('   Option A - Docker Deployment:');
  console.log('   ```bash');
  console.log('   docker-compose down');
  console.log('   docker-compose up -d --build');
  console.log('   ```\n');

  console.log('   Option B - Manual Deployment:');
  console.log('   1. Upload dist/ contents to your web server');
  console.log('   2. Ensure nginx points to the correct directory');
  console.log('   3. Reload nginx: sudo nginx -s reload\n');

  console.log('   Option C - Cloudflare/Pages Deployment:');
  console.log('   1. Connect your Git repository');
  console.log('   2. Set build command: npm run build');
  console.log('   3. Set output directory: dist');
  console.log('   4. Deploy\n');

  console.log('\n3️⃣  After deployment, verify these URLs:\n');
  console.log('   ✅ https://eazybe.com/integrations');
  console.log('   ✅ https://eazybe.com/br/integrations');
  console.log('   ✅ https://eazybe.com/es/integrations');
  console.log('   ✅ https://eazybe.com/tr/integrations');
  console.log('   ✅ https://eazybe.com/features');
  console.log('   ✅ https://eazybe.com/br/features\n');

  console.log('\n4️⃣  If /br/integrations still shows old content:\n');
  console.log('   1. Clear Cloudflare cache (if using CF)');
  console.log('   2. Clear browser cache (Ctrl+Shift+R)');
  console.log('   3. Check nginx config for Webflow routes');
  console.log('   4. Ensure React app routes have priority\n');

  console.log('=' .repeat(50));
}

// Main execution
async function main() {
  const checks = [
    checkEnv,
    checkDependencies,
    checkSanityContent,
    checkPortugueseContent
  ];

  const checksPassed = runChecks(checks);

  if (!checksPassed) {
    console.log('\n❌ Some checks failed. Please fix the issues above.');
    process.exit(1);
  }

  const buildSuccess = buildProject();
  if (!buildSuccess) {
    console.log('\n❌ Build failed. Please check the errors above.');
    process.exit(1);
  }

  const buildVerified = verifyBuild();
  if (!buildVerified) {
    console.log('\n❌ Build verification failed.');
    process.exit(1);
  }

  generateDeploymentInstructions();

  console.log('\n✅ All checks passed! Ready for deployment.\n');
}

main().catch(console.error);
