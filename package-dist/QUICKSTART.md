# Quick Start Guide

## 🚀 5-Minute Setup

### 1. Install the package (choose one method)

**Local testing:**
```bash
cd /workspaces/default/code/package-dist
npm link

cd /your/project
npm link @godigimarket/ui
```

**Direct install from file:**
```bash
cd /your/project
npm install /workspaces/default/code/package-dist
```

**From npm (after publishing):**
```bash
npm install @godigimarket/ui
```

### 2. Import styles in your main file

```tsx
// src/main.tsx or src/App.tsx
import '@godigimarket/ui/styles';
```

### 3. Configure Tailwind CSS

Add to `tailwind.config.js`:

```js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@godigimarket/ui/dist/**/*.{js,jsx,ts,tsx}',
  ],
  // ... rest of config
}
```

### 4. Use components!

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@godigimarket/ui';

function App() {
  return (
    <div className="p-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            GoDigiMarket UI is ready to use.
          </p>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 📦 What's Included

- **46 UI Components** - All production-ready
- **CSS Theme System** - Customizable color tokens
- **TypeScript Support** - Full type definitions
- **Radix UI Primitives** - Accessible by default
- **Lucide Icons** - Import from `lucide-react`

---

## 🎨 Component Categories

### Layout & Structure
```tsx
import { Card, Separator, ScrollArea, Sidebar } from '@godigimarket/ui';
```

### Forms
```tsx
import { Input, Label, Button, Select, Switch, Checkbox } from '@godigimarket/ui';
```

### Data Display
```tsx
import { Table, Badge, Avatar, Skeleton } from '@godigimarket/ui';
```

### Navigation
```tsx
import { Tabs, Breadcrumb, Pagination } from '@godigimarket/ui';
```

### Overlays
```tsx
import { Dialog, Sheet, Popover, Tooltip, AlertDialog } from '@godigimarket/ui';
```

---

## 🎯 Common Patterns

### Form with Validation

```tsx
import { Label, Input, Button, Card } from '@godigimarket/ui';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  
  return (
    <Card className="p-6 max-w-sm">
      <form className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Card>
  );
}
```

### Data Table

```tsx
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@godigimarket/ui';

function UserList({ users }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Modal Dialog

```tsx
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  Button 
} from '@godigimarket/ui';

function DeleteConfirmation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 🎨 Theming

### Using CSS Variables

Override default colors in your CSS:

```css
:root {
  --primary: #1B4FDD;
  --primary-foreground: #FFFFFF;
  --background: #EFF1F9;
  --foreground: #0D1421;
}
```

### Dark Mode

The package includes dark mode support:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}
```

Toggle with:

```tsx
<html className="dark">
```

---

## 📚 Next Steps

- See **EXAMPLES.md** for complete code examples
- Read **README.md** for full component list
- Check **INSTALLATION.md** for publishing guide

---

## 💡 Pro Tips

1. **Import only what you need** - Tree-shaking works automatically
2. **Use the `cn()` utility** - Available from `@godigimarket/ui` for className merging
3. **Combine with Lucide icons** - `npm install lucide-react`
4. **Customize with Tailwind** - All components accept `className` prop

---

## ❓ Troubleshooting

**Styles not working?**
- Make sure you imported `@godigimarket/ui/styles`
- Check Tailwind config includes package path

**TypeScript errors?**
- Install peer deps: `npm install react react-dom`
- Check tsconfig includes `node_modules`

**Components not found?**
- Verify package is installed: `npm list @godigimarket/ui`
- Clear cache: `rm -rf node_modules && npm install`

---

Happy building! 🎉
