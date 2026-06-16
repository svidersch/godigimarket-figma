# @godigimarket/ui

**Professional UI component library based on Swiss Operational design principles.**

A comprehensive React component library for building enterprise SaaS platforms with a strict, professional, and operational design aesthetic. Perfect for dashboards, admin panels, data-heavy interfaces, and complex forms.

## Features

- ✅ **46 Production-ready components** built on Radix UI primitives
- 🎨 **Swiss Operational design** - clean, dense, professional
- 🎯 **TypeScript support** - full type definitions included
- 🌓 **Dark mode ready** - built-in theme system
- 📦 **Tree-shakeable** - import only what you need
- ♿ **Accessible** - WCAG compliant, keyboard navigation
- 🎭 **Customizable** - Tailwind CSS v4 + CSS variables

## Installation

```bash
npm install @godigimarket/ui
# or
pnpm add @godigimarket/ui
# or
yarn add @godigimarket/ui
```

### Peer Dependencies

Make sure you have these installed:

```bash
npm install react react-dom
```

## Setup

### 1. Import Styles

Add the component styles to your main CSS/app entry point:

```css
@import '@godigimarket/ui/styles';
```

Or in your JavaScript/TypeScript:

```tsx
import '@godigimarket/ui/styles';
```

### 2. Configure Tailwind CSS

Add to your `tailwind.config.js` or `tailwind.config.ts`:

```js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@godigimarket/ui/dist/**/*.{js,jsx,ts,tsx}',
  ],
  // ... rest of your config
}
```

### 3. Font Setup

The library uses **Inter** for UI and **JetBrains Mono** for code. Fonts are automatically imported via the stylesheet.

## Usage

### Basic Example

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@godigimarket/ui';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to GoDigiMarket UI</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

### Form Components

```tsx
import { Input, Label, Button } from '@godigimarket/ui';

function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button type="submit" className="w-full">Sign In</Button>
    </form>
  );
}
```

### Data Display

```tsx
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Badge,
} from '@godigimarket/ui';

function UserTable({ users }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant={user.active ? 'default' : 'secondary'}>
                {user.active ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Navigation

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@godigimarket/ui';

function Dashboard() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p>Overview content here</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p>Analytics content here</p>
      </TabsContent>
      <TabsContent value="reports">
        <p>Reports content here</p>
      </TabsContent>
    </Tabs>
  );
}
```

## Available Components

### Layout
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Separator`
- `AspectRatio`
- `ScrollArea`
- `ResizablePanel`, `ResizablePanelGroup`, `ResizableHandle`
- `Sidebar` (with collapsible sections)

### Forms & Input
- `Button`
- `Input`
- `Label`
- `Textarea`
- `Checkbox`
- `RadioGroup`, `RadioGroupItem`
- `Switch`
- `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`
- `Slider`
- `Calendar`
- `InputOTP`

### Navigation
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `NavigationMenu`
- `Menubar`
- `Breadcrumb`
- `Pagination`

### Overlays
- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`
- `AlertDialog`
- `Sheet`
- `Drawer`
- `Popover`
- `HoverCard`
- `Tooltip`
- `ContextMenu`
- `DropdownMenu`
- `Command` (Command palette)

### Feedback
- `Alert`, `AlertTitle`, `AlertDescription`
- `Badge`
- `Progress`
- `Skeleton`
- `Toast` (via Sonner)

### Data Display
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- `Avatar`, `AvatarImage`, `AvatarFallback`
- `Chart` (Recharts integration)
- `Carousel`
- `Accordion`
- `Collapsible`
- `Toggle`, `ToggleGroup`

## Customization

### Color Tokens

The library uses CSS custom properties. Override them in your global CSS:

```css
:root {
  --primary: #1B4FDD;
  --primary-foreground: #FFFFFF;
  --secondary: #E6EAF5;
  --muted: #DCE2EE;
  --border: #DDE3EF;
  /* ... see styles.css for full list */
}
```

### Component Variants

Most components support multiple variants:

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Subtle</Button>

<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Error</Badge>
```

## Local Development

To use this package locally in another project:

```bash
# In package-dist directory
npm link

# In your project
npm link @godigimarket/ui
```

## Publishing

```bash
cd package-dist
npm publish
```

## Design Philosophy

This library follows **Swiss Operational** design principles:

- **Clarity over decoration** - No unnecessary visual elements
- **Dense information** - Compact layouts for data-heavy interfaces
- **Systematic spacing** - Consistent 4px grid system
- **Professional typography** - Inter for UI, JetBrains Mono for code
- **Functional color** - Colors convey meaning, not just aesthetics
- **Accessible by default** - WCAG AA compliance minimum

Perfect for:
- Admin panels and dashboards
- SaaS platforms
- Data management tools
- Enterprise applications
- B2B software

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
