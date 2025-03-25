
import { useState } from "react";
import { Shield, BarChart3, Globe, PieChart, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/ui/StatCard";
import ComplianceScore from "@/components/dashboard/ComplianceScore";
import RiskAlerts from "@/components/dashboard/RiskAlerts";
import SupplierMap from "@/components/dashboard/SupplierMap";
import TopSuppliers from "@/components/dashboard/TopSuppliers";
import BlockchainVerification from "@/components/dashboard/BlockchainVerification";
import DataVisualizer from "@/components/ui/DataVisualizer";
import InteractiveFilter from "@/components/ui/InteractiveFilter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("month");
  const [filteredMetrics, setFilteredMetrics] = useState<Record<string, string[]>>({});
  
  // Sample data
  const alerts = [
    {
      id: "1",
      title: "High-risk supplier detected in Southeast Asia",
      description: "AI detected potential labor violations at Supplier XYZ",
      timestamp: "2 hours ago",
      severity: "high" as const,
    },
    {
      id: "2",
      title: "ESG Report deadline approaching",
      description: "Q2 ESG report must be filed within 5 days",
      timestamp: "1 day ago",
      severity: "moderate" as const,
    },
    {
      id: "3",
      title: "Verification needed for new supplier",
      description: "Complete blockchain verification for EcoSupply Inc.",
      timestamp: "3 days ago",
      severity: "low" as const,
    },
  ];
  
  const suppliers = [
    {
      id: "1",
      name: "EcoGreen Materials",
      trustScore: 92,
      category: "Raw Materials",
      risk: "low" as const,
      verified: true,
    },
    {
      id: "2",
      name: "Alps Electronics",
      trustScore: 87,
      category: "Components",
      risk: "low" as const,
      verified: true,
    },
    {
      id: "3",
      name: "Southland Manufacturing",
      trustScore: 76,
      category: "Assembly",
      risk: "moderate" as const,
      verified: true,
    },
    {
      id: "4",
      name: "Eastern Textiles Ltd.",
      trustScore: 68,
      category: "Textiles",
      risk: "moderate" as const,
      verified: false,
    },
    {
      id: "5",
      name: "Global Freight Partners",
      trustScore: 62,
      category: "Logistics",
      risk: "high" as const,
      verified: false,
    },
  ];
  
  const complianceData = [
    { name: "Jan", value: 65 },
    { name: "Feb", value: 70 },
    { name: "Mar", value: 75 },
    { name: "Apr", value: 80 },
    { name: "May", value: 72 },
    { name: "Jun", value: 78 },
    { name: "Jul", value: 82 },
    { name: "Aug", value: 87 },
  ];
  
  const filterOptions = [
    {
      id: "category",
      name: "Category",
      options: ["Raw Materials", "Components", "Assembly", "Logistics", "Services"],
    },
    {
      id: "region",
      name: "Region",
      options: ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East & Africa"],
    },
    {
      id: "riskLevel",
      name: "Risk Level",
      options: ["Low", "Moderate", "High"],
    },
  ];
  
  const handleFilterChange = (filters: Record<string, string[]>) => {
    setFilteredMetrics(filters);
    
    const filterCount = Object.values(filters).flat().length;
    if (filterCount > 0) {
      toast({
        title: "Filters applied",
        description: `Applied ${filterCount} filter${filterCount > 1 ? 's' : ''}`,
      });
    }
  };
  
  const handleExportReport = () => {
    toast({
      title: "Report Export Started",
      description: "Your dashboard report is being prepared for download.",
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-6 md:pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight animate-fade-in">Dashboard</h2>
          <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "50ms" }}>
            Your supply chain at a glance
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <InteractiveFilter 
            filterOptions={filterOptions} 
            onFilterChange={handleFilterChange}
          />
          
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportReport}>
            <Download size={16} />
            Export Report
          </Button>
          
          <div className="bg-accent/30 rounded-md p-1 flex">
            {["week", "month", "quarter", "year"].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "secondary" : "ghost"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setTimeframe(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {Object.keys(filteredMetrics).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-secondary/50">
            Filtered View
          </Badge>
          {Object.entries(filteredMetrics).map(([key, values]) => 
            values.map(value => (
              <Badge key={`${key}-${value}`} variant="outline" className="bg-background">
                {key}: {value}
              </Badge>
            ))
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Global Suppliers"
          value="122"
          icon={<Globe className="h-4 w-4" />}
          trend={{ value: 8, label: "vs last month", positive: true }}
          animation={true}
          className="animate-fade-in"
          style={{ animationDelay: "100ms" }}
        />
        <StatCard
          title="Compliance Rate"
          value="87%"
          icon={<Shield className="h-4 w-4" />}
          trend={{ value: 4, label: "vs industry avg.", positive: true }}
          animation={true}
          className="animate-fade-in"
          style={{ animationDelay: "150ms" }}
        />
        <StatCard
          title="Risk Alerts"
          value="3"
          icon={<BarChart3 className="h-4 w-4" />}
          trend={{ value: 2, label: "fewer than last week", positive: true }}
          animation={true}
          className="animate-fade-in"
          style={{ animationDelay: "200ms" }}
        />
        <StatCard
          title="Trust Tokens"
          value="584"
          icon={<PieChart className="h-4 w-4" />}
          trend={{ value: 12, label: "increase this month", positive: true }}
          animation={true}
          className="animate-fade-in"
          style={{ animationDelay: "250ms" }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <ComplianceScore score={87} className="lg:col-span-2" />
        <RiskAlerts alerts={alerts} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <DataVisualizer 
          title="Compliance Trends" 
          description="Monthly compliance score trajectory"
          data={complianceData} 
          className="lg:col-span-2 animate-fade-in"
        />
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Q{index} ESG Report</p>
                    <p className="text-xs text-muted-foreground">Updated {index} day{index > 1 ? 's' : ''} ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8">View</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <SupplierMap className="lg:col-span-2" />
        <BlockchainVerification />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <TopSuppliers suppliers={suppliers} />
      </div>
    </div>
  );
};

export default Dashboard;
