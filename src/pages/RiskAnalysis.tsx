
import { useState } from "react";
import { 
  AlertCircle, 
  BarChart2, 
  Filter, 
  Plus,
  Trash, 
  SlidersHorizontal, 
  Edit,
  MessageSquareWarning,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRiskFactors } from "@/hooks/useRiskFactors";
import { RiskFactorDialog } from "@/components/risk-analysis/RiskFactorDialog";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import type { RiskFactor } from "@/types/api";

const RiskAnalysis = () => {
  const { 
    riskFactorsQuery, 
    createRiskFactorMutation, 
    updateRiskFactorMutation, 
    deleteRiskFactorMutation 
  } = useRiskFactors();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRiskFactor, setSelectedRiskFactor] = useState<RiskFactor | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { data: riskFactors = [], isLoading, isError } = riskFactorsQuery;
  
  const filteredRiskFactors = riskFactors.filter((factor) => 
    factor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    factor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    factor.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCreateRiskFactor = (data: any) => {
    createRiskFactorMutation.mutate(data);
  };
  
  const handleUpdateRiskFactor = (data: any) => {
    if (selectedRiskFactor) {
      updateRiskFactorMutation.mutate({
        id: selectedRiskFactor.id,
        riskFactor: data
      });
    }
  };
  
  const handleDeleteRiskFactor = () => {
    if (selectedRiskFactor) {
      deleteRiskFactorMutation.mutate(selectedRiskFactor.id);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const openEditDialog = (riskFactor: RiskFactor) => {
    setSelectedRiskFactor(riskFactor);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (riskFactor: RiskFactor) => {
    setSelectedRiskFactor(riskFactor);
    setIsDeleteDialogOpen(true);
  };
  
  const getSeverityColor = (severity: string) => {
    switch(severity.toLowerCase()) {
      case 'low':
        return 'bg-blue-500/10 text-blue-500 border-blue-200';
      case 'medium':
        return 'bg-amber-500/10 text-amber-500 border-amber-200';
      case 'high':
        return 'bg-orange-500/10 text-orange-500 border-orange-200';
      case 'critical':
        return 'bg-red-500/10 text-red-500 border-red-200';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-200';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
        return 'bg-red-500/10 text-red-500 border-red-200';
      case 'mitigated':
        return 'bg-green-500/10 text-green-500 border-green-200';
      case 'monitoring':
        return 'bg-blue-500/10 text-blue-500 border-blue-200';
      case 'closed':
        return 'bg-gray-500/10 text-gray-500 border-gray-200';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-200';
    }
  };
  
  const getRiskScore = (impact: number, probability: number) => {
    return impact * probability;
  };
  
  const getRiskScoreColor = (score: number) => {
    if (score <= 25) return 'text-blue-500';
    if (score <= 50) return 'text-amber-500';
    if (score <= 75) return 'text-orange-500';
    return 'text-red-500';
  };
  
  return (
    <div className="container pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Analyze and manage risk factors across your supply chain
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus size={16} />
            Add Risk Factor
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Risk Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{riskFactors.length}</p>
              <BarChart2 className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Critical Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-red-500">
                {riskFactors.filter(f => f.severity.toLowerCase() === 'critical').length}
              </p>
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-amber-500">
                {riskFactors.length > 0 
                  ? Math.round(riskFactors.reduce((acc, factor) => 
                      acc + getRiskScore(factor.impact, factor.probability), 0) / riskFactors.length)
                  : 0}
              </p>
              <MessageSquareWarning className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mitigated Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-green-500">
                {riskFactors.filter(f => f.status.toLowerCase() === 'mitigated').length}
              </p>
              <SlidersHorizontal className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Risks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="mitigated">Mitigated</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>Risk Factors</CardTitle>
              
              <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Input
                    type="search"
                    placeholder="Search risk factors..."
                    className="w-full md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : isError ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-red-500">Error loading risk factors</p>
              </div>
            ) : filteredRiskFactors.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-semibold">No risk factors found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or add a new risk factor</p>
                <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Risk Factor
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRiskFactors.map((riskFactor) => {
                    const riskScore = getRiskScore(riskFactor.impact, riskFactor.probability);
                    const riskScoreClass = getRiskScoreColor(riskScore);
                    
                    return (
                      <TableRow key={riskFactor.id}>
                        <TableCell className="font-medium">{riskFactor.name}</TableCell>
                        <TableCell>{riskFactor.category}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={getSeverityColor(riskFactor.severity)}
                          >
                            {riskFactor.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(riskFactor.status)}
                          >
                            {riskFactor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className={`font-semibold ${riskScoreClass}`}>{riskScore}</span>
                            <span className="text-xs text-muted-foreground">
                              ({riskFactor.impact} × {riskFactor.probability})
                            </span>
                          </div>
                          <div className="flex items-center text-xs mt-1">
                            <span className="text-amber-500 flex items-center gap-0.5">
                              <ArrowUp className="h-3 w-3" /> {riskFactor.impact}
                            </span>
                            <span className="mx-1">|</span>
                            <span className="text-blue-500 flex items-center gap-0.5">
                              <ArrowDown className="h-3 w-3" /> {riskFactor.probability}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(riskFactor)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => openDeleteDialog(riskFactor)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredRiskFactors.length} of {riskFactors.length} risk factors
            </p>
          </CardFooter>
        </Card>
      </Tabs>
      
      {/* Create Risk Factor Dialog */}
      <RiskFactorDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateRiskFactor}
        title="Add Risk Factor"
        description="Add a new risk factor to the system."
        isLoading={createRiskFactorMutation.isPending}
      />
      
      {/* Edit Risk Factor Dialog */}
      <RiskFactorDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdateRiskFactor}
        initialData={selectedRiskFactor || undefined}
        title="Edit Risk Factor"
        description="Update the risk factor details."
        isLoading={updateRiskFactorMutation.isPending}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteRiskFactor}
        title="Delete Risk Factor"
        description="Are you sure you want to delete this risk factor? This action cannot be undone."
        isLoading={deleteRiskFactorMutation.isPending}
      />
    </div>
  );
};

export default RiskAnalysis;
