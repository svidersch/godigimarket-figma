# Usage Examples

## Complete Dashboard Layout

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Badge,
  Separator,
} from '@godigimarket/ui';
import { Download, RefreshCw, Filter } from 'lucide-react';

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your platform metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$45,231', change: '+12.5%' },
          { label: 'Active Users', value: '2,845', change: '+8.2%' },
          { label: 'Transactions', value: '1,234', change: '-2.4%' },
          { label: 'Avg. Order', value: '$36.70', change: '+5.1%' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-2xl font-semibold mt-1">{stat.value}</div>
              <div className={`text-xs mt-2 ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest 10 transactions in your system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 'TXN-001', user: 'John Doe', amount: '$124.50', status: 'completed' },
                { id: 'TXN-002', user: 'Jane Smith', amount: '$89.99', status: 'pending' },
                { id: 'TXN-003', user: 'Bob Johnson', amount: '$234.00', status: 'completed' },
              ].map(tx => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                  <TableCell>{tx.user}</TableCell>
                  <TableCell className="font-semibold">{tx.amount}</TableCell>
                  <TableCell>
                    <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    2 hours ago
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Settings Page with Tabs

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  Input,
  Switch,
  Button,
  Separator,
} from '@godigimarket/ui';

function Settings() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              <div>
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" />
              </div>
              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Manage your email notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'marketing', label: 'Marketing emails', description: 'Receive emails about new features and updates' },
                { id: 'security', label: 'Security alerts', description: 'Get notified about account security' },
                { id: 'updates', label: 'Product updates', description: 'Weekly digest of platform changes' },
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={item.id}>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Switch id={item.id} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## Modal Dialog with Form

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Label,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@godigimarket/ui';
import { Plus } from 'lucide-react';

function CreateUserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Add a new user to your platform. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="reporter">Reporter</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Brief description about the user..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Command Palette (Search)

```tsx
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@godigimarket/ui';
import { Search, Users, FileText, Settings } from 'lucide-react';

function CommandPalette() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Search className="mr-2 h-4 w-4" />
            <span>Search users...</span>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>View reports</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Manage users</span>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Platform settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## Data Table with Filtering

```tsx
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Badge,
  Button,
} from '@godigimarket/ui';
import { Filter, Download } from 'lucide-react';

function DataTable() {
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by name or email..."
          className="max-w-xs"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="ml-auto">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-mono text-xs">{user.id}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === 'active' ? 'default' :
                      user.status === 'suspended' ? 'destructive' :
                      'secondary'
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.joined}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
```

These examples demonstrate the Swiss Operational design principles in action: dense layouts, clear hierarchy, functional use of color, and professional typography.
