
import { useState } from "react";
import { 
  Bell, Filter, CheckCircle2, Clock, AlertCircle, AlertTriangle, Shield, CheckSquare,
  AlarmCheck, Eye, ArrowUpDown, Check, X, SlidersHorizontal, CalendarDays, BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Alert = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  source: "system" | "ai" | "blockchain" | "manual";
  type: "compliance" | "risk" | "security" | "supplier";
  status: "new" | "acknowledged" | "resolved";
};

const Alerts = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const alerts: Alert[] = [
    {
      id: "ALT-2023-001",
      title: "Critical Supplier Compliance Issue",
      description: "Supplier XYZ has missed quarterly environmental compliance reporting deadline.",
      timestamp: "2023-10-20T09:30:00Z",
      severity: "high",
      source: "system",
      type: "compliance",
      status: "new"
    },
    {
      id: "ALT-2023-002",
      title: "Potential Labor Violation Detected",
      description: "AI analysis detected potential labor standards violation at manufacturing plant in Vietnam.",
      timestamp: "2023-10-19T14:15:00Z",
      severity: "critical",
      source: "ai",
      type: "risk",
      status: "new"
    },
    {
      id: "ALT-2023-003",
      title: "Blockchain Verification Failed",
      description: "Unable to verify document authenticity for supplier certification from EcoMaterials Inc.",
      timestamp: "2023-10-18T11:20:00Z",
      severity: "medium",
      source: "blockchain",
      type: "security",
      status: "acknowledged"
    },
    {
      id: "ALT-2023-004",
      title: "Supplier Risk Score Decreased",
      description: "Highland Logistics risk score decreased by 15% due to recent transportation incidents.",
      timestamp: "2023-10-17T16:45:00Z",
      severity: "medium",
      source: "system",
      type: "supplier",
      status: "acknowledged"
    },
    {
      id: "ALT-2023-005",
      title: "Regulatory Deadline Approaching",
      description: "EU CSRD compliance documents due in 14 days. 3 suppliers have not submitted required information.",
      timestamp: "2023-10-16T08:30:00Z",
      severity: "low",
      source: "system",
      type: "compliance",
      status: "new"
    },
    {
      id: "ALT-2023-006",
      title: "AI-Predicted Supply Chain Disruption",
      description: "AI model predicts 65% probability of supply chain disruption in Southeast Asia region within 60 days.",
      timestamp: "2023-10-15T13:10:00Z",
      severity: "high",
      source: "ai",
      type: "risk",
      status: "resolved"
    },
    {
      id: "ALT-2023-007",
      title: "Unauthorized Access Attempt",
      description: "Multiple failed login attempts to supplier portal from unrecognized IP address.",
      timestamp: "2023-10-14T22:05:00Z",
      severity: "critical",
      source: "system",
      type: "security",
      status: "resolved"
    }
  ];

  const filteredAlerts = filterStatus === "all" 
    ? alerts 
    : alerts.filter(alert => alert.status === filterStatus);

  const getAlertIcon = (type: string) => {
    switch(type) {
      case "compliance":
        return <Shield className="h-5 w-5" />;
      case "risk":
        return <AlertCircle className="h-5 w-5" />;
      case "security":
        return <AlertTriangle className="h-5 w-5" />;
      case "supplier":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "low":
        return "bg-blue-500";
      case "medium":
        return "bg-amber-500";
      case "high":
        return "bg-orange-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSourceBadge = (source: string) => {
    switch(source) {
      case "system":
        return <Badge variant="outline" className="capitalize">System</Badge>;
      case "ai":
        return <Badge variant="outline" className="capitalize bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800 dark:text-purple-400">AI Prediction</Badge>;
      case "blockchain":
        return <Badge variant="outline" className="capitalize bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-400">Blockchain</Badge>;
      case "manual":
        return <Badge variant="outline" className="capitalize">Manual</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "new":
        return (
          <Badge variant="outline" className="gap-1 bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400">
            <Bell className="h-3 w-3" /> New
          </Badge>
        );
      case "acknowledged":
        return (
          <Badge variant="outline" className="gap-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-400">
            <Eye className="h-3 w-3" /> Acknowledged
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="outline" className="gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400">
            <CheckCircle2 className="h-3 w-3" /> Resolved
          </Badge>
        );
      default:
        return <Badge variant="outline" className="capitalize">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const countAlertsByStatus = (status: string) => {
    return alerts.filter(alert => alert.status === status).length;
  };

  return (
    <div className="container pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage compliance and risk alerts
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal size={16} />
            Configure Alerts
          </Button>
          <Button className="gap-2">
            <CheckSquare size={16} />
            Mark All as Read
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{alerts.length}</p>
              <BarChart3 className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Active alerts in your system
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-red-500">{countAlertsByStatus("new")}</p>
              <Bell className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Unread alerts requiring attention
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Acknowledged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-blue-500">{countAlertsByStatus("acknowledged")}</p>
              <Eye className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Alerts in progress
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-green-500">{countAlertsByStatus("resolved")}</p>
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Alerts marked as resolved
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setFilterStatus} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            <Bell className="mr-2 h-4 w-4" /> All Alerts
          </TabsTrigger>
          <TabsTrigger value="new">
            <AlertCircle className="mr-2 h-4 w-4" /> New
          </TabsTrigger>
          <TabsTrigger value="acknowledged">
            <Eye className="mr-2 h-4 w-4" /> Acknowledged
          </TabsTrigger>
          <TabsTrigger value="resolved">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Resolved
          </TabsTrigger>
        </TabsList>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>Alert Center</CardTitle>
              
              <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Input
                    type="search"
                    placeholder="Search alerts..."
                    className="w-full md:w-[250px]"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left font-medium">
                      <div className="flex items-center gap-1">
                        <Checkbox id="selectAll" aria-label="Select all alerts" />
                        <label htmlFor="selectAll" className="text-xs sr-only">Select All</label>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left font-medium">
                      <div className="flex items-center gap-1">
                        Severity
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ArrowUpDown className="h-3 w-3" />
                              <span className="sr-only">Sort by severity</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" /> Highest First
                            </DropdownMenuItem>
                            <DropdownMenuItem>Lowest First</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left font-medium">Alert Details</th>
                    <th className="h-10 px-4 text-left font-medium">Source</th>
                    <th className="h-10 px-4 text-left font-medium">
                      <div className="flex items-center gap-1">
                        Date & Time
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ArrowUpDown className="h-3 w-3" />
                              <span className="sr-only">Sort by date</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" /> Newest First
                            </DropdownMenuItem>
                            <DropdownMenuItem>Oldest First</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left font-medium">Status</th>
                    <th className="h-10 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlerts.map((alert) => (
                    <tr 
                      key={alert.id} 
                      className={`border-b hover:bg-muted/50 transition-colors ${
                        alert.status === "new" ? "bg-red-50/50 dark:bg-red-950/10" : ""
                      }`}
                    >
                      <td className="p-4">
                        <Checkbox aria-label={`Select ${alert.title}`} />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`h-3 w-3 rounded-full ${getSeverityColor(alert.severity)}`}></span>
                          <span className="capitalize">{alert.severity}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {getAlertIcon(alert.type)}
                            {alert.title}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.description}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">{getSourceBadge(alert.source)}</td>
                      <td className="p-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>{formatDate(alert.timestamp)}</span>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(alert.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {alert.status === "new" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <AlarmCheck className="h-4 w-4" />
                            </Button>
                          )}
                          {alert.status !== "resolved" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500">
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default Alerts;
