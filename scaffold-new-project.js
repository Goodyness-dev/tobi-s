#!/usr/bin/env node
/**
 * Service Business Project Generator
 * Usage:
 *   node scaffold-new-project.js "Business Name" "project-slug"
 * Example:
 *   node scaffold-new-project.js "Apex Elite Plumbing" "apex-plumbing"
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const businessName = args[0] || 'New Service Business';
const projectSlug = args[1] || businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const targetDir = path.resolve(__dirname, '..', projectSlug);

console.log(`\n======================================================`);
console.log(`🚀 Scaffolding New Service Business Project`);
console.log(`   Business Name: "${businessName}"`);
console.log(`   Project Slug:  "${projectSlug}"`);
console.log(`   Target Path:   ${targetDir}`);
console.log(`======================================================\n`);

if (fs.existsSync(targetDir)) {
  console.error(`❌ Error: Target directory already exists: ${targetDir}`);
  process.exit(1);
}

// 1. Recursive copy helper
function copyDirSync(src, dest, ignoreList = []) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (ignoreList.includes(entry.name)) continue;

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath, ignoreList);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log(`📦 Copying Master Template files...`);
copyDirSync(__dirname, targetDir, [
  'node_modules',
  '.git',
  'dist',
  'scaffold-new-project.js',
  'create-project.ps1'
]);

// Ensure clean database directory exists without previous data
const dbDir = path.join(targetDir, 'server', 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// 2. Customize package.json
const pkgPath = path.join(targetDir, 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.name = projectSlug;
  pkg.version = '1.0.0';
  pkg.description = `${businessName} Web Application & Management Portal`;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
  console.log(`✅ Updated package.json`);
}

// 3. Setup fresh .env from .env.example
const envExamplePath = path.join(targetDir, '.env.example');
const envPath = path.join(targetDir, '.env');
if (fs.existsSync(envExamplePath)) {
  let envContent = fs.readFileSync(envExamplePath, 'utf-8');
  envContent = envContent.replace(/VITE_ADMIN_PASSWORD=.*/g, `VITE_ADMIN_PASSWORD=${projectSlug.slice(0, 4)}2025`);
  fs.writeFileSync(envPath, envContent, 'utf-8');
  console.log(`✅ Initialized .env`);
}

// 3b. Pre-populate businessData.js with new business info
const businessDataPath = path.join(targetDir, 'src', 'data', 'businessData.js');
if (fs.existsSync(businessDataPath)) {
  let bizContent = fs.readFileSync(businessDataPath, 'utf-8');
  bizContent = bizContent.replace(/name:\s*["'][^"']+["']/, `name: "${businessName}"`);
  bizContent = bizContent.replace(/legalName:\s*["'][^"']+["']/, `legalName: "${businessName} LLC"`);
  bizContent = bizContent.replace(/website:\s*["'][^"']+["']/, `website: "${projectSlug}.com"`);
  fs.writeFileSync(businessDataPath, bizContent, 'utf-8');
  console.log(`✅ Pre-populated businessData.js with "${businessName}"`);
}

// 3c. Update index.html title
const indexPath = path.join(targetDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  indexContent = indexContent.replace(/<title>.*?<\/title>/, `<title>${businessName} | Fast Quotes & Professional Service</title>`);
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log(`✅ Updated index.html title`);
}

// 4. Create intake directory with templates for easy onboarding
const intakeDir = path.join(targetDir, 'intake');
const assetsDir = path.join(intakeDir, 'assets');
fs.mkdirSync(assetsDir, { recursive: true });

const briefTemplate = `# ${businessName} — Website Brief

## 1. Business Overview
- **Business Name:** ${businessName}
- **Legal Entity:** ${businessName} LLC
- **Tagline:** [e.g. Dallas's Trusted Master Plumbers Since 2012]
- **Address:** [123 Main St, City, State ZIP]
- **Phone:** [(555) 000-0000]
- **Email:** [contact@yourdomain.com]
- **Website Domain:** [yourdomain.com]
- **Google Maps Link:** [https://maps.google.com/...]

## 2. Operating Hours
| Day | Hours | Note |
|---|---|---|
| Monday - Friday | 8:00 AM - 5:00 PM | |
| Saturday | 8:00 AM - 2:00 PM | By Appointment |
| Sunday | Closed | Emergency dispatch available |

## 3. About the Business & Founder
- **Founder / Owner:** [Founder Name & Credentials]
- **Story & History:** [Year founded, journey, mission, local reputation]
- **Specialties:** [Key high-margin specialties]

## 4. Services List (10 - 20 items)
Categorized into:
- Category A: [e.g. Emergency Repairs]
- Category B: [e.g. Maintenance & Inspections]
- Category C: [e.g. System Installations & Upgrades]

## 5. Amenities & Payment Options
- Free Wi-Fi, Lounge, Shuttle, Online Booking, Financing, Veteran Discount, etc.
- Accepted Payments: Cash, Credit Cards, Zelle, Cash App, Crypto.

## 6. Verified Customer Reviews (3 - 5 real quotes)
1. "Review text here..." — Name, City (5 stars)
2. "Review text here..." — Name, City (5 stars)
`;

const promptTemplate = `# Guiding Prompts & Design Directives

1. Brand Colors:
   - Primary Accent: [e.g. Deep Blue #1e40af / Racing Red #c62828 / Forest Green #15803d]
   - Theme: Midnight Dark & Clean Light mode toggle enabled

2. Wizard Step Adaptations:
   - What trade-specific qualification step is needed?
   - (e.g., Auto -> Vehicle Make; Plumbing -> Property Type; Roofing -> Roof Material)

3. Hero Motion:
   - Video or High-Impact photography with dark gradient contrast overlay.
`;

const assetsReadme = `# Assets Intake Folder

Drop client media assets here:
- logo.png (Brand logo with transparent background)
- hero.mp4 OR hero.jpg (Hero background video or image)
- card-1.jpg to card-4.jpg (Featured service card images)
- storefront.jpg (Physical building or shop front)
- owner.jpg (Founder / team photo)
- facility.jpg (Customer waiting room, work bay, or truck fleet)
`;

fs.writeFileSync(path.join(intakeDir, 'brief.md'), briefTemplate, 'utf-8');
fs.writeFileSync(path.join(intakeDir, 'prompt.txt'), promptTemplate, 'utf-8');
fs.writeFileSync(path.join(assetsDir, 'README.md'), assetsReadme, 'utf-8');
console.log(`✅ Created intake/ template folder`);

// 5. Initialize clean Git repository
try {
  execSync('git init', { cwd: targetDir, stdio: 'ignore' });
  console.log(`✅ Initialized clean Git repository`);
} catch (e) {
  console.warn(`⚠️ Note on git init:`, e.message);
}

console.log(`\n======================================================`);
console.log(`🎉 Project Scaffolding Complete!`);
console.log(`======================================================`);
console.log(`\nNext Steps:`);
console.log(`  1. cd "C:\\Users\\DELL\\Documents\\${projectSlug}"`);
console.log(`  2. Fill in: intake/brief.md & drop images into intake/assets/`);
console.log(`  3. Run: npm install`);
console.log(`  4. Run: npm run dev (or ask Antigravity to configure everything from the brief)`);
console.log(`  5. Deploy: npx vercel --prod`);
console.log(`\n======================================================\n`);
