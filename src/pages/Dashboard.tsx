
import { Shield, BarChart3, Globe, PieChart } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import ComplianceScore from "@/components/dashboard/ComplianceScore";
import RiskAlerts from "@/components/dashboard/RiskAlerts";
import SupplierMap from "@/components/dashboard/SupplierMap";
import TopSuppliers from "@/components/dashboard/TopSuppliers";
import BlockchainVerification from "@/components/dashboard/BlockchainVerification";

const Dashboard = () => {
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

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight animate-fade-in">Dashboard</h2>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "50ms" }}>
            Your supply chain at a glance
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ComplianceScore score={87} className="lg:col-span-2" />
        <RiskAlerts alerts={alerts} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SupplierMap className="lg:col-span-2" />
        <BlockchainVerification />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        <TopSuppliers suppliers={suppliers} />
      </div>
    </div>
  );
};

export default Dashboard;
