import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CrudTable } from "@/components/common/CrudTable";
import { CrudForm, FormField } from "@/components/common/CrudForm";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@example.com", role: "admin", status: "active" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "editor", status: "active" },
    { id: 3, name: "Jane Smith", email: "jane@example.com", role: "viewer", status: "inactive" },
  ]);

  const userColumns = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    {
      header: "Role",
      accessorKey: "role",
      cell: (info: any) => (
        <Badge variant="outline" className="capitalize">
          {info.role}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => (
        <Badge
          className={
            info.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }
        >
          {info.status}
        </Badge>
      ),
    },
  ];

  const userFields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name",
      validation: z.string().min(2, "Name must be at least 2 characters"),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
      validation: z.string().email("Invalid email address"),
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
      validation: z.string(),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
      validation: z.string(),
    },
  ];

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: any) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter((u) => u.id !== user.id));
      toast({
        title: "User Deleted",
        description: `${user.name} has been deleted successfully.`,
      });
    }
  };

  const handleSubmitUser = (values: any) => {
    if (currentUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? { ...user, ...values } : user
        )
      );
      toast({
        title: "User Updated",
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        ...values,
      };
      setUsers([...users, newUser]);
      toast({
        title: "User Added",
        description: `${values.name} has been added successfully.`,
      });
    }
    setIsFormOpen(false);
  };

  const saveNotificationSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const saveAccountSettings = () => {
    toast({
      title: "Account Updated",
      description: "Your account information has been updated successfully.",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application settings</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue={user?.email?.split('@')[0] || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" defaultValue={user?.email || ''} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us about yourself"
                />
              </div>

              <Button onClick={saveAccountSettings}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button>Change Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-alerts">Risk Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for high-risk events
                    </p>
                  </div>
                  <Switch id="email-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-updates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about system updates and maintenance
                    </p>
                  </div>
                  <Switch id="email-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly summary reports via email
                    </p>
                  </div>
                  <Switch id="email-reports" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-alerts">Real-time Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Show real-time notifications in the dashboard
                    </p>
                  </div>
                  <Switch id="app-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-sounds">Notification Sounds</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for important notifications
                    </p>
                  </div>
                  <Switch id="app-sounds" />
                </div>
              </div>

              <Button onClick={saveNotificationSettings}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users and their access permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CrudTable
                title="Users"
                data={users}
                columns={userColumns}
                onAdd={handleAddUser}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CrudForm
        title={currentUser ? "Edit User" : "Add User"}
        description={
          currentUser
            ? "Update user information and permissions"
            : "Create a new user account"
        }
        fields={userFields}
        onSubmit={handleSubmitUser}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultValues={currentUser}
      />
    </div>
  );
};

export default Settings;
