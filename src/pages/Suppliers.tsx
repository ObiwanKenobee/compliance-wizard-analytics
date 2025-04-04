
import { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Filter,
  ShieldCheck, 
  ShieldAlert,
  Factory,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSuppliers } from "@/hooks/useSuppliers";
import { SupplierDialog } from "@/components/suppliers/SupplierDialog";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import type { Supplier } from "@/types/api";

const Suppliers = () => {
  const { 
    suppliersQuery, 
    createSupplierMutation, 
    updateSupplierMutation, 
    deleteSupplierMutation 
  } = useSuppliers();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: suppliers = [], isLoading, isError } = suppliersQuery;
  
  const filteredSuppliers = suppliers
    .filter((supplier) => 
      (activeTab === "all" || supplier.status.toLowerCase() === activeTab) &&
      (supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
       supplier.location.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  
  const handleCreateSupplier = (data: any) => {
    createSupplierMutation.mutate(data);
  };
  
  const handleUpdateSupplier = (data: any) => {
    if (selectedSupplier) {
      updateSupplierMutation.mutate({
        id: selectedSupplier.id,
        supplier: data
      });
    }
  };
  
  const handleDeleteSupplier = () => {
    if (selectedSupplier) {
      deleteSupplierMutation.mutate(selectedSupplier.id);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const openEditDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteDialogOpen(true);
  };
  
  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-500';
    if (score < 60) return 'text-amber-500';
    if (score < 80) return 'text-orange-500';
    return 'text-red-500';
  };
  
  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pending</Badge>;
      case 'suspended':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="container pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your supply chain partners
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus size={16} />
            Add Supplier
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{suppliers.length}</p>
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Verified Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-green-500">
                {suppliers.filter(s => s.verified).length}
              </p>
              <ShieldCheck className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">High Risk Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-red-500">
                {suppliers.filter(s => s.risk_score >= 75).length}
              </p>
              <ShieldAlert className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">
                {new Set(suppliers.map(s => s.category)).size}
              </p>
              <Factory className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Suppliers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>Supplier Directory</CardTitle>
              
              <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Input
                    type="search"
                    placeholder="Search suppliers..."
                    className="w-full md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
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
                <p className="text-red-500">Error loading suppliers</p>
              </div>
            ) : filteredSuppliers.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-semibold">No suppliers found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or add a new supplier</p>
                <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Supplier
                </Button>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            <span>{supplier.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                        <TableCell>
                          <span className={`font-semibold ${getRiskColor(supplier.risk_score)}`}>
                            {supplier.risk_score}/100
                          </span>
                        </TableCell>
                        <TableCell>
                          {supplier.verified ? (
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                          ) : (
                            <ShieldAlert className="h-5 w-5 text-amber-500" />
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(supplier)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => openDeleteDialog(supplier)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </Tabs>
      
      {/* Create Supplier Dialog */}
      <SupplierDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateSupplier}
        title="Add Supplier"
        description="Add a new supplier to your supply chain."
        isLoading={createSupplierMutation.isPending}
      />
      
      {/* Edit Supplier Dialog */}
      <SupplierDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdateSupplier}
        initialData={selectedSupplier || undefined}
        title="Edit Supplier"
        description="Update supplier details."
        isLoading={updateSupplierMutation.isPending}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteSupplier}
        title="Delete Supplier"
        description="Are you sure you want to delete this supplier? This action cannot be undone."
        isLoading={deleteSupplierMutation.isPending}
      />
    </div>
  );
};

export default Suppliers;
