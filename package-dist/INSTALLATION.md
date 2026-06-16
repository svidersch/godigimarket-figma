# Installation & Testing Guide

## Option 1: Local Testing with npm link

This allows you to test the package in another project before publishing.

### Step 1: Link the package

```bash
cd /workspaces/default/code/package-dist
npm link
```

### Step 2: Use in your project

```bash
cd /path/to/your/project
npm link @godigimarket/ui
```

### Step 3: Import and use

```tsx
import '@godigimarket/ui/styles';
import { Button, Card } from '@godigimarket/ui';

function App() {
  return (
    <Card>
      <Button>Hello from GoDigiMarket UI!</Button>
    </Card>
  );
}
```

### Step 4: Unlink when done

```bash
# In your project
npm unlink @godigimarket/ui

# In package-dist
npm unlink
```

---

## Option 2: Install from Local File

You can install directly from the file system:

```bash
cd /path/to/your/project
npm install /workspaces/default/code/package-dist
```

Or with pnpm:

```bash
pnpm add /workspaces/default/code/package-dist
```

---

## Option 3: Publish to npm Registry

### Prerequisites

1. Create an npm account at https://www.npmjs.com/signup
2. Login to npm:

```bash
npm login
```

### Publish

```bash
cd /workspaces/default/code/package-dist
npm publish
```

If the package name is taken, update the `name` field in `package.json`:

```json
{
  "name": "@your-username/ui",
  "version": "1.0.0",
  ...
}
```

For scoped packages (e.g., `@your-username/ui`), use:

```bash
npm publish --access public
```

### Install from npm

After publishing, anyone can install it:

```bash
npm install @godigimarket/ui
# or your custom scope
npm install @your-username/ui
```

---

## Option 4: Private npm Registry

If you want to keep the package private:

1. **GitHub Packages**: Publish to GitHub's npm registry
2. **Verdaccio**: Self-hosted private npm registry
3. **npm Enterprise**: Paid private registry

Example for GitHub Packages:

```bash
# Add .npmrc
echo "@your-username:registry=https://npm.pkg.github.com" >> .npmrc

# Publish
npm publish
```

---

## Updating the Package

After making changes to components:

1. Update version in `package.json`:
```json
{
  "version": "1.0.1"  // increment version
}
```

2. Rebuild:
```bash
cd /workspaces/default/code/package-dist
node build.mjs
```

3. If using npm link, the changes are automatically reflected
4. If published, publish the new version:
```bash
npm publish
```

---

## Troubleshooting

### Components not styling correctly

Make sure you've imported the styles:

```tsx
import '@godigimarket/ui/styles';
```

And configured Tailwind to scan the package:

```js
// tailwind.config.js
content: [
  './src/**/*.{js,jsx,ts,tsx}',
  './node_modules/@godigimarket/ui/dist/**/*.{js,jsx,ts,tsx}',
]
```

### TypeScript errors

Make sure you have peer dependencies installed:

```bash
npm install react react-dom @types/react @types/react-dom
```

### Module not found

If you get "Module not found" errors, check that:
1. The package is installed: `npm list @godigimarket/ui`
2. Your bundler (Vite, webpack) is configured to resolve node_modules
3. Try clearing cache: `rm -rf node_modules package-lock.json && npm install`

---

## Version Management

Follow semantic versioning (semver):

- **1.0.0** → Initial release
- **1.0.1** → Bug fixes
- **1.1.0** → New features (backward compatible)
- **2.0.0** → Breaking changes

```bash
# Patch (1.0.0 → 1.0.1)
npm version patch

# Minor (1.0.0 → 1.1.0)
npm version minor

# Major (1.0.0 → 2.0.0)
npm version major
```

These commands automatically update `package.json` and create a git tag.
