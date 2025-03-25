
import { useState } from "react";
import { z } from "zod";
import { CrudTable } from "@/components/common/CrudTable";
import { CrudForm, FormField } from "@/components/common/CrudForm";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Users, 
  Key, 
  Lock, 
  Mail,
  UserPlus,
  Ban
} from "lucide-react";

// User type
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  lastActive?: string;
}

// Integration type
interface Integration {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "pending";
  apiKey?: string;
  lastSync?: string;
}

// Notification type
interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  type: "email" | "in-app" | "sms";
  enabled: boolean;
}

const Settings = () => {
  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "USR-001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      createdAt: "2023-01-15T00:00:00Z",
      lastActive: "2023-10-20T09:30:00Z"
    },
    {
      id: "USR-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Manager",
      status: "active",
      createdAt: "2023-02-20T00:00:00Z",
      lastActive: "2023-10-19T14:15:00Z"
    },
    {
      id: "USR-003",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "Analyst",
      status: "active",
      createdAt: "2023-03-10T00:00:00Z",
      lastActive: "2023-10-18T11:20:00Z"
    },
    {
      id: "USR-004",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "Analyst",
      status: "inactive",
      createdAt: "2023-04-05T00:00:00Z",
      lastActive: "2023-09-30T16:45:00Z"
    },
    {
      id: "USR-005",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Viewer",
      status: "pending",
      createdAt: "2023-10-15T00:00:00Z"
    }
  ]);

  // Integrations state
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "INT-001",
      name: "Salesforce",
      type: "CRM",
      status: "connected",
      apiKey: "sf_api_********",
      lastSync: "2023-10-18T11:20:00Z"
    },
    {
      id: "INT-002",
      name: "SAP",
      type: "ERP",
      status: "connected",
      apiKey: "sap_api_********",
      lastSync: "2023-10-19T14:15:00Z"
    },
    {
      id: "INT-003",
      name: "Microsoft Power BI",
      type: "Analytics",
      status: "disconnected",
      apiKey: "pb_api_********",
      lastSync: "2023-09-30T16:45:00Z"
    },
    {
      id: "INT-004",
      name: "Stripe",
      type: "Payment",
      status: "pending",
      apiKey: "stripe_api_********"
    }
  ]);

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: "NOTIF-001",
      name: "Risk Alerts",
      description: "Receive notifications for new risk alerts",
      type: "email",
      enabled: true
    },
    {
      id: "NOTIF-002",
      name: "Supplier Updates",
      description: "Get notified when supplier information changes",
      type: "in-app",
      enabled: true
    },
    {
      id: "NOTIF-003",
      name: "Compliance Issues",
      description: "Critical compliance violations alerts",
      type: "email",
      enabled: true
    },
    {
      id: "NOTIF-004",
      name: "Report Generation",
      description: "Notification when new reports are generated",
      type: "in-app",
      enabled: false
    },
    {
      id: "NOTIF-005",
      name: "Security Alerts",
      description: "Critical security alerts for your account",
      type: "sms",
      enabled: true
    }
  ]);

  // State for current tab
  const [activeTab, setActiveTab] = useState("teamMembers");

  // State for CRUD operations
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Team Member form fields
  const teamMemberFields: FormField[] = [
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
      placeholder: "Enter email address",
      validation: z.string().email("Invalid email address"),
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      placeholder: "Select role",
      options: [
        { label: "Admin", value: "Admin" },
        { label: "Manager", value: "Manager" },
        { label: "Analyst", value: "Analyst" },
        { label: "Viewer", value: "Viewer" },
      ],
      validation: z.string().min(1, "Role is required"),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Pending", value: "pending" },
      ],
      validation: z.string().min(1, "Status is required"),
    }
  ];

  // Integration form fields
  const integrationFields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter integration name",
      validation: z.string().min(2, "Name must be at least 2 characters"),
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      placeholder: "Select type",
      options: [
        { label: "CRM", value: "CRM" },
        { label: "ERP", value: "ERP" },
        { label: "Analytics", value: "Analytics" },
        { label: "Payment", value: "Payment" },
        { label: "Other", value: "Other" },
      ],
      validation: z.string().min(1, "Type is required"),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status",
      options: [
        { label: "Connected", value: "connected" },
        { label: "Disconnected", value: "disconnected" },
        { label: "Pending", value: "pending" },
      ],
      validation: z.string().min(1, "Status is required"),
    },
    {
      name: "apiKey",
      label: "API Key",
      type: "text",
      placeholder: "Enter API key",
      validation: z.string().optional(),
    }
  ];

  // Notification form fields
  const notificationFields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter notification name",
      validation: z.string().min(2, "Name must be at least 2 characters"),
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
      validation: z.string().min(10, "Description must be at least 10 characters"),
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      placeholder: "Select notification type",
      options: [
        { label: "Email", value: "email" },
        { label: "In-App", value: "in-app" },
        { label: "SMS", value: "sms" },
      ],
      validation: z.string().min(1, "Type is required"),
    },
    {
      name: "enabled",
      label: "Enabled",
      type: "select",
      placeholder: "Select status",
      options: [
        { label: "Enabled", value: "true" },
        { label: "Disabled", value: "false" },
      ],
      validation: z.string().min(1, "Status is required"),
    }
  ];

  // Team Member columns
  const teamMemberColumns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (user: TeamMember) => (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <span>{user.name}</span>
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: (user: TeamMember) => (
        <Badge variant="outline">{user.role}</Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (user: TeamMember) => (
        <Badge variant={getStatusVariant(user.status)}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (user: TeamMember) => {
        const date = new Date(user.createdAt);
        return date.toLocaleDateString();
      },
    },
    {
      header: "Last Active",
      accessorKey: "lastActive",
      cell: (user: TeamMember) => {
        if (!user.lastActive) return "Never";
        const date = new Date(user.lastActive);
        return date.toLocaleDateString();
      },
    },
  ];

  // Integration columns
  const integrationColumns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Type",
      accessorKey: "type",
      cell: (integration: Integration) => (
        <Badge variant="outline">{integration.type}</Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (integration: Integration) => (
        <Badge variant={getIntegrationStatusVariant(integration.status)}>
          {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
        </Badge>
      ),
    },
    {
      header: "API Key",
      accessorKey: "apiKey",
      cell: (integration: Integration) => integration.apiKey || "N/A",
    },
    {
      header: "Last Sync",
      accessorKey: "lastSync",
      cell: (integration: Integration) => {
        if (!integration.lastSync) return "Never";
        const date = new Date(integration.lastSync);
        return date.toLocaleDateString();
      },
    },
  ];

  // Notification columns
  const notificationColumns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Type",
      accessorKey: "type",
      cell: (notification: NotificationSetting) => (
        <Badge variant="outline">
          {notification.type === "email" ? <Mail className="h-3 w-3 mr-1" /> : null}
          {notification.type === "in-app" ? <Bell className="h-3 w-3 mr-1" /> : null}
          {notification.type === "sms" ? <Mail className="h-3 w-3 mr-1" /> : null}
          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "enabled",
      cell: (notification: NotificationSetting) => (
        <Badge variant={notification.enabled ? "success" : "secondary"}>
          {notification.enabled ? "Enabled" : "Disabled"}
        </Badge>
      ),
    },
  ];

  // Helper functions
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "secondary";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getIntegrationStatusVariant = (status: string) => {
    switch (status) {
      case "connected":
        return "success";
      case "disconnected":
        return "secondary";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  // CRUD operations based on active tab
  const handleAdd = () => {
    setCurrentItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: any) => {
    setCurrentItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: any) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (values: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (activeTab === "teamMembers") {
        handleTeamMemberSubmit(values);
      } else if (activeTab === "integrations") {
        handleIntegrationSubmit(values);
      } else if (activeTab === "notifications") {
        handleNotificationSubmit(values);
      }
      
      setIsLoading(false);
      setIsFormOpen(false);
      setCurrentItem(null);
    }, 1000);
  };

  const handleTeamMemberSubmit = (values: any) => {
    if (currentItem) {
      // Edit existing team member
      setTeamMembers((prev) =>
        prev.map((member) =>
          member.id === currentItem.id
            ? { ...member, ...values }
            : member
        )
      );
      toast({
        title: "Team member updated",
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      // Add new team member
      const newMember: TeamMember = {
        id: `USR-${String(teamMembers.length + 1).padStart(3, "0")}`,
        ...values,
        createdAt: new Date().toISOString(),
      };
      setTeamMembers((prev) => [...prev, newMember]);
      toast({
        title: "Team member added",
        description: `${values.name} has been added successfully.`,
      });
    }
  };

  const handleIntegrationSubmit = (values: any) => {
    if (currentItem) {
      // Edit existing integration
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === currentItem.id
            ? { ...integration, ...values }
            : integration
        )
      );
      toast({
        title: "Integration updated",
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      // Add new integration
      const newIntegration: Integration = {
        id: `INT-${String(integrations.length + 1).padStart(3, "0")}`,
        ...values,
      };
      setIntegrations((prev) => [...prev, newIntegration]);
      toast({
        title: "Integration added",
        description: `${values.name} has been added successfully.`,
      });
    }
  };

  const handleNotificationSubmit = (values: any) => {
    if (currentItem) {
      // Edit existing notification
      setNotificationSettings((prev) =>
        prev.map((notification) =>
          notification.id === currentItem.id
            ? { ...notification, ...values, enabled: values.enabled === "true" }
            : notification
        )
      );
      toast({
        title: "Notification setting updated",
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      // Add new notification
      const newNotification: NotificationSetting = {
        id: `NOTIF-${String(notificationSettings.length + 1).padStart(3, "0")}`,
        ...values,
        enabled: values.enabled === "true",
      };
      setNotificationSettings((prev) => [...prev, newNotification]);
      toast({
        title: "Notification setting added",
        description: `${values.name} has been added successfully.`,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!currentItem) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (activeTab === "teamMembers") {
        setTeamMembers((prev) =>
          prev.filter((member) => member.id !== currentItem.id)
        );
        toast({
          title: "Team member deleted",
          description: `${currentItem.name} has been deleted successfully.`,
          variant: "destructive",
        });
      } else if (activeTab === "integrations") {
        setIntegrations((prev) =>
          prev.filter((integration) => integration.id !== currentItem.id)
        );
        toast({
          title: "Integration deleted",
          description: `${currentItem.name} has been deleted successfully.`,
          variant: "destructive",
        });
      } else if (activeTab === "notifications") {
        setNotificationSettings((prev) =>
          prev.filter((notification) => notification.id !== currentItem.id)
        );
        toast({
          title: "Notification setting deleted",
          description: `${currentItem.name} has been deleted successfully.`,
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setCurrentItem(null);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    // Implement search functionality here
    console.log("Searching for:", query);
  };

  // Get active tab data and columns
  const getActiveTabData = () => {
    switch (activeTab) {
      case "teamMembers":
        return teamMembers;
      case "integrations":
        return integrations;
      case "notifications":
        return notificationSettings;
      default:
        return [];
    }
  };

  const getActiveTabColumns = () => {
    switch (activeTab) {
      case "teamMembers":
        return teamMemberColumns;
      case "integrations":
        return integrationColumns;
      case "notifications":
        return notificationColumns;
      default:
        return [];
    }
  };

  const getActiveTabTitle = () => {
    switch (activeTab) {
      case "teamMembers":
        return "Team Members";
      case "integrations":
        return "Integrations";
      case "notifications":
        return "Notification Settings";
      default:
        return "";
    }
  };

  const getActiveTabFormFields = () => {
    switch (activeTab) {
      case "teamMembers":
        return teamMemberFields;
      case "integrations":
        return integrationFields;
      case "notifications":
        return notificationFields;
      default:
        return [];
    }
  };

  const getFormTitle = () => {
    const base = currentItem ? "Edit" : "Add";
    switch (activeTab) {
      case "teamMembers":
        return `${base} Team Member`;
      case "integrations":
        return `${base} Integration`;
      case "notifications":
        return `${base} Notification Setting`;
      default:
        return "";
    }
  };

  const getDeleteTitle = () => {
    switch (activeTab) {
      case "teamMembers":
        return "Delete Team Member";
      case "integrations":
        return "Delete Integration";
      case "notifications":
        return "Delete Notification Setting";
      default:
        return "Delete Item";
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "teamMembers":
        return <Users className="h-4 w-4 mr-2" />;
      case "integrations":
        return <Shield className="h-4 w-4 mr-2" />;
      case "notifications":
        return <Bell className="h-4 w-4 mr-2" />;
      case "security":
        return <Key className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  const getActionIcon = () => {
    switch (activeTab) {
      case "teamMembers":
        return currentItem ? <User className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />;
      case "integrations":
        return <Shield className="h-4 w-4 mr-2" />;
      case "notifications":
        return <Bell className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="container pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and application settings
          </p>
        </div>
      </div>

      <Tabs defaultValue="teamMembers" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="teamMembers">
            {getTabIcon("teamMembers")} Team Members
          </TabsTrigger>
          <TabsTrigger value="integrations">
            {getTabIcon("integrations")} Integrations
          </TabsTrigger>
          <TabsTrigger value="notifications">
            {getTabIcon("notifications")} Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            {getTabIcon("security")} Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teamMembers">
          <Card>
            <CardContent className="pt-6">
              <CrudTable
                title="Team Members Management"
                data={teamMembers}
                columns={teamMemberColumns}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSearch={handleSearch}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardContent className="pt-6">
              <CrudTable
                title="Integrations Management"
                data={integrations}
                columns={integrationColumns}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSearch={handleSearch}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-6">
              <CrudTable
                title="Notification Settings"
                data={notificationSettings}
                columns={notificationColumns}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSearch={handleSearch}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Card className="flex-1">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      <CardTitle className="text-lg">Password Security</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Your password was last changed 45 days ago. It's recommended to update your password every 90 days.
                    </p>
                    <Button className="w-full">Change Password</Button>
                  </CardContent>
                </Card>
                
                <Card className="flex-1">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Enhance your account security with two-factor authentication.
                    </p>
                    <Button className="w-full">Enable 2FA</Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Ban className="h-4 w-4 text-destructive" />
                    <CardTitle className="text-lg">Sessions & Devices</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on MacOS - Started 2 hours ago</p>
                      </div>
                      <Badge className="sm:self-center mt-2 sm:mt-0 w-fit">Active</Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">iPhone 13</p>
                        <p className="text-sm text-muted-foreground">iOS App - Last active 2 days ago</p>
                      </div>
                      <Button variant="outline" size="sm" className="sm:self-center mt-2 sm:mt-0 w-fit">
                        Revoke
                      </Button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Office Workstation</p>
                        <p className="text-sm text-muted-foreground">Firefox on Windows - Last active 1 week ago</p>
                      </div>
                      <Button variant="outline" size="sm" className="sm:self-center mt-2 sm:mt-0 w-fit">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Form */}
      <CrudForm
        fields={getActiveTabFormFields()}
        title={getFormTitle()}
        description={
          currentItem
            ? `Update the ${activeTab} information below.`
            : `Enter the new ${activeTab} details below.`
        }
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={
          activeTab === "notifications" && currentItem
            ? { ...currentItem, enabled: String(currentItem.enabled) }
            : currentItem
        }
        isLoading={isLoading}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title={getDeleteTitle()}
        description={
          currentItem
            ? `Are you sure you want to delete "${currentItem.name}"? This action cannot be undone.`
            : `Are you sure you want to delete this ${activeTab.slice(0, -1)}? This action cannot be undone.`
        }
        isLoading={isLoading}
      />
    </div>
  );
};

export default Settings;
