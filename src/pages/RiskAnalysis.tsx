
import { useState } from "react";
import { z } from "zod";
import { CrudTable } from "@/components/common/CrudTable";
import { CrudForm, FormField } from "@/components/common/CrudForm";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Shield, AlertCircle, AlertTriangle, Gauge } from "lucide-react";

// Risk factor type
interface RiskFactor {
  id: string;
  name: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical";
  impact: number;
  probability: number;
  status: "active" | "monitored" | "mitigated" | "archived";
  description: string;
  createdAt: string;
}

const RiskAnalysis = () => {
  // State for risk factors
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([
    {
      id: "RISK-001",
      name: "Supply Chain Disruption",
      category: "Operational",
      severity: "high",
      impact: 8,
      probability: 6,
      status: "active",
      description: "Potential disruption due to geopolitical tensions in Southeast Asia",
      createdAt: "2023-06-15T00:00:00Z"
    },
    {
      id: "RISK-002",
      name: "Regulatory Non-Compliance",
      category: "Compliance",
      severity: "medium",
      impact: 7,
      probability: 5,
      status: "monitored",
      description: "Changes to EU environmental regulations affecting product certifications",
      createdAt: "2023-07-20T00:00:00Z"
    },
    {
      id: "RISK-003",
      name: "Labor Violations",
      category: "Social",
      severity: "critical",
      impact: 9,
      probability: 4,
      status: "active",
      description: "Potential labor violations in manufacturing facilities in South Asia",
      createdAt: "2023-08-05T00:00:00Z"
    },
    {
      id: "RISK-004",
      name: "Supplier Bankruptcy",
      category: "Financial",
      severity: "high",
      impact: 8,
      probability: 3,
      status: "monitored",
      description: "Financial instability of key component supplier",
      createdAt: "2023-09-12T00:00:00Z"
    },
    {
      id: "RISK-005",
      name: "Data Breach",
      category: "Security",
      severity: "high",
      impact: 9,
      probability: 5,
      status: "mitigated",
      description: "Potential exposure of supplier data through insecure systems",
      createdAt: "2023-10-03T00:00:00Z"
    },
    {
      id: "RISK-006",
      name: "Carbon Emissions",
      category: "Environmental",
      severity: "medium",
      impact: 6,
      probability: 7,
      status: "active",
      description: "Increasing carbon footprint from logistics operations",
      createdAt: "2023-11-18T00:00:00Z"
    }
  ]);

  // State for CRUD operations
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRiskFactor, setCurrentRiskFactor] = useState<RiskFactor | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form fields
  const riskFormFields: FormField[] = [
    {
      name: "name",
      label: "Risk Name",
      type: "text",
      placeholder: "Enter risk name",
      validation: z.string().min(2, "Name must be at least 2 characters"),
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      placeholder: "Select category",
      options: [
        { label: "Operational", value: "Operational" },
        { label: "Compliance", value: "Compliance" },
        { label: "Financial", value: "Financial" },
        { label: "Environmental", value: "Environmental" },
        { label: "Social", value: "Social" },
        { label: "Security", value: "Security" },
        { label: "Reputational", value: "Reputational" },
      ],
      validation: z.string().min(1, "Category is required"),
    },
    {
      name: "severity",
      label: "Severity",
      type: "select",
      placeholder: "Select severity",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
        { label: "Critical", value: "critical" },
      ],
      validation: z.string().min(1, "Severity is required"),
    },
    {
      name: "impact",
      label: "Impact (1-10)",
      type: "number",
      placeholder: "Enter impact score",
      validation: z.number().min(1).max(10),
    },
    {
      name: "probability",
      label: "Probability (1-10)",
      type: "number",
      placeholder: "Enter probability score",
      validation: z.number().min(1).max(10),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status",
      options: [
        { label: "Active", value: "active" },
        { label: "Monitored", value: "monitored" },
        { label: "Mitigated", value: "mitigated" },
        { label: "Archived", value: "archived" },
      ],
      validation: z.string().min(1, "Status is required"),
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter risk description",
      validation: z.string().min(10, "Description must be at least 10 characters"),
    }
  ];

  // Table columns
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Risk Factor",
      accessorKey: "name",
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (risk: RiskFactor) => (
        <Badge variant="outline">{risk.category}</Badge>
      ),
    },
    {
      header: "Severity",
      accessorKey: "severity",
      cell: (risk: RiskFactor) => (
        <Badge className={getSeverityClass(risk.severity)}>
          {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Risk Score",
      accessorKey: "score",
      cell: (risk: RiskFactor) => {
        const score = Math.round((risk.impact * risk.probability) / 2);
        return (
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{score}</span>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (risk: RiskFactor) => (
        <Badge variant={getStatusVariant(risk.status)}>
          {risk.status.charAt(0).toUpperCase() + risk.status.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (risk: RiskFactor) => {
        const date = new Date(risk.createdAt);
        return date.toLocaleDateString();
      },
    },
  ];

  // Helper functions
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-500 text-white";
      case "medium":
        return "bg-amber-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "critical":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "destructive";
      case "monitored":
        return "warning";
      case "mitigated":
        return "success";
      case "archived":
        return "secondary";
      default:
        return "default";
    }
  };

  // CRUD operations
  const handleAddRiskFactor = () => {
    setCurrentRiskFactor(null);
    setIsFormOpen(true);
  };

  const handleEditRiskFactor = (risk: RiskFactor) => {
    setCurrentRiskFactor(risk);
    setIsFormOpen(true);
  };

  const handleDeleteRiskFactor = (risk: RiskFactor) => {
    setCurrentRiskFactor(risk);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (values: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (currentRiskFactor) {
        // Edit existing risk factor
        setRiskFactors((prev) =>
          prev.map((risk) =>
            risk.id === currentRiskFactor.id
              ? {
                  ...risk,
                  ...values,
                  impact: Number(values.impact),
                  probability: Number(values.probability),
                }
              : risk
          )
        );
        toast({
          title: "Risk factor updated",
          description: `${values.name} has been updated successfully.`,
        });
      } else {
        // Add new risk factor
        const newRiskFactor: RiskFactor = {
          id: `RISK-${String(riskFactors.length + 1).padStart(3, "0")}`,
          ...values,
          impact: Number(values.impact),
          probability: Number(values.probability),
          createdAt: new Date().toISOString(),
        };
        setRiskFactors((prev) => [...prev, newRiskFactor]);
        toast({
          title: "Risk factor added",
          description: `${values.name} has been added successfully.`,
        });
      }
      
      setIsLoading(false);
      setIsFormOpen(false);
      setCurrentRiskFactor(null);
    }, 1000);
  };

  const handleConfirmDelete = () => {
    if (!currentRiskFactor) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRiskFactors((prev) =>
        prev.filter((risk) => risk.id !== currentRiskFactor.id)
      );
      
      toast({
        title: "Risk factor deleted",
        description: `${currentRiskFactor.name} has been deleted successfully.`,
        variant: "destructive",
      });
      
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setCurrentRiskFactor(null);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    // Implement search functionality here
    console.log("Searching for:", query);
  };

  // Calculate statistics
  const activeRisks = riskFactors.filter(risk => risk.status === "active").length;
  const highSeverityRisks = riskFactors.filter(risk => 
    risk.severity === "high" || risk.severity === "critical"
  ).length;
  const averageRiskScore = Math.round(
    riskFactors.reduce((acc, risk) => acc + (risk.impact * risk.probability) / 2, 0) / 
    riskFactors.length
  );

  return (
    <div className="container pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage supply chain risks
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Risk Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{riskFactors.length}</div>
              <Shield className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Identified risk factors
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold text-red-500">{activeRisks}</div>
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Currently active risks
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">High Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold text-orange-500">{highSeverityRisks}</div>
              <AlertTriangle className="h-6 w-6 text-orange-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              High and critical severity risks
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{averageRiskScore}</div>
              <Gauge className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Average risk score (1-50)
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <CrudTable
            title="Risk Factor Management"
            data={riskFactors}
            columns={columns}
            onAdd={handleAddRiskFactor}
            onEdit={handleEditRiskFactor}
            onDelete={handleDeleteRiskFactor}
            onSearch={handleSearch}
          />
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      <CrudForm
        fields={riskFormFields}
        title={currentRiskFactor ? "Edit Risk Factor" : "Add Risk Factor"}
        description={
          currentRiskFactor
            ? "Update the risk factor information below."
            : "Enter the new risk factor details below."
        }
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={currentRiskFactor || undefined}
        isLoading={isLoading}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Risk Factor"
        description={
          currentRiskFactor
            ? `Are you sure you want to delete "${currentRiskFactor.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this risk factor? This action cannot be undone."
        }
        isLoading={isLoading}
      />
    </div>
  );
};

export default RiskAnalysis;
