#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcRoot = join(__dirname, '..', 'src');
const distDir = join(__dirname, 'dist');

console.log('📦 Building @godigimarket/ui package...\n');

// 1. Create dist directory
mkdirSync(distDir, { recursive: true });
console.log('✓ Created dist directory');

// 2. Copy UI components
const uiSrcDir = join(srcRoot, 'app', 'components', 'ui');
const uiDistDir = join(distDir, 'components');
mkdirSync(uiDistDir, { recursive: true });

cpSync(uiSrcDir, uiDistDir, { recursive: true });
console.log('✓ Copied UI components');

// 3. Copy Figma components (ImageWithFallback)
const figmaSrcDir = join(srcRoot, 'app', 'components', 'figma');
const figmaDistDir = join(distDir, 'components', 'figma');
mkdirSync(figmaDistDir, { recursive: true });
cpSync(figmaSrcDir, figmaDistDir, { recursive: true });
console.log('✓ Copied Figma components');

// 4. Bundle styles into single CSS file
const themeCSS = readFileSync(join(srcRoot, 'styles', 'theme.css'), 'utf8');
const fontsCSS = readFileSync(join(srcRoot, 'styles', 'fonts.css'), 'utf8');

const bundledCSS = `/* GoDigiMarket UI Styles */\n\n${fontsCSS}\n\n${themeCSS}`;
writeFileSync(join(distDir, 'styles.css'), bundledCSS);
console.log('✓ Bundled styles');

// 5. Generate index.ts with all component exports
const components = readdirSync(uiDistDir)
  .filter(file => file.endsWith('.tsx') && !file.startsWith('use-') && !file.includes('utils'))
  .map(file => file.replace('.tsx', ''));

const utilFiles = readdirSync(uiDistDir)
  .filter(file => file.startsWith('use-') || file.includes('utils'))
  .map(file => file.replace(/\.(tsx?|ts)$/, ''));

let indexContent = `/* Auto-generated index file for @godigimarket/ui */\n\n`;

// Export all components
indexContent += `// UI Components\n`;
components.forEach(comp => {
  indexContent += `export * from './components/${comp}';\n`;
});

indexContent += `\n// Utilities and Hooks\n`;
utilFiles.forEach(util => {
  indexContent += `export * from './components/${util}';\n`;
});

// Export Figma components
indexContent += `\n// Figma Components\n`;
indexContent += `export * from './components/figma/ImageWithFallback';\n`;

writeFileSync(join(distDir, 'index.ts'), indexContent);
console.log('✓ Generated index.ts with ' + (components.length + utilFiles.length + 1) + ' exports');

// 6. Create TypeScript declaration file
const dtsContent = `/* Type definitions for @godigimarket/ui */
export * from './index';
`;
writeFileSync(join(distDir, 'index.d.ts'), dtsContent);
console.log('✓ Created type definitions');

console.log('\n✅ Build complete!\n');
console.log('📁 Package contents:');
console.log('   - ' + components.length + ' UI components');
console.log('   - ' + utilFiles.length + ' utilities/hooks');
console.log('   - 1 CSS bundle (styles.css)');
console.log('   - TypeScript definitions');
console.log('\n📝 Next steps:');
console.log('   1. cd package-dist');
console.log('   2. npm link (for local testing)');
console.log('   3. npm publish (to publish to npm registry)');
