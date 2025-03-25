import { useState } from "react";
import { z } from "zod";
import { CrudTable } from "@/components/common/CrudTable";
import { CrudForm, FormField } from "@/components/common/CrudForm";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

// Supplier type
interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  status: string;
  riskScore: number;
  verified: boolean;
  contactEmail: string;
  contactPhone: string;
}

const Suppliers = () => {
  // State for the suppliers
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "SUP-001",
      name: "EcoGreen Materials",
      category: "Raw Materials",
      location: "Chicago, USA",
      status: "active",
      riskScore: 92,
      verified: true,
      contactEmail: "contact@ecogreen.com",
      contactPhone: "+1 555-123-4567"
    },
    {
      id: "SUP-002",
      name: "Alps Electronics",
      category: "Components",
      location: "Tokyo, Japan",
      status: "active",
      riskScore: 87,
      verified: true,
      contactEmail: "info@alpselectronics.jp",
      contactPhone: "+81 3-1234-5678"
    },
    {
      id: "SUP-003",
      name: "Southland Manufacturing",
      category: "Assembly",
      location: "Atlanta, USA",
      status: "active",
      riskScore: 76,
      verified: true,
      contactEmail: "operations@southland.com",
      contactPhone: "+1 555-987-6543"
    },
    {
      id: "SUP-004",
      name: "Eastern Textiles Ltd.",
      category: "Textiles",
      location: "Dhaka, Bangladesh",
      status: "review",
      riskScore: 68,
      verified: false,
      contactEmail: "info@easterntextiles.com",
      contactPhone: "+880 2-9876543"
    },
    {
      id: "SUP-005",
      name: "Global Freight Partners",
      category: "Logistics",
      location: "Rotterdam, Netherlands",
      status: "active",
      riskScore: 62,
      verified: false,
      contactEmail: "support@gfp.com",
      contactPhone: "+31 10-987-6543"
    }
  ]);

  // State for CRUD operations
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form fields
  const supplierFormFields: FormField[] = [
    {
      name: "name",
      label: "Supplier Name",
      type: "text",
      placeholder: "Enter supplier name",
      validation: z.string().min(2, "Name must be at least 2 characters"),
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      placeholder: "Select category",
      options: [
        { label: "Raw Materials", value: "Raw Materials" },
        { label: "Components", value: "Components" },
        { label: "Assembly", value: "Assembly" },
        { label: "Textiles", value: "Textiles" },
        { label: "Logistics", value: "Logistics" },
        { label: "Services", value: "Services" },
      ],
      validation: z.string().min(1, "Category is required"),
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "City, Country",
      validation: z.string().min(2, "Location is required"),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Under Review", value: "review" },
        { label: "Suspended", value: "suspended" },
      ],
      validation: z.string().min(1, "Status is required"),
    },
    {
      name: "riskScore",
      label: "Risk Score (0-100)",
      type: "number",
      placeholder: "Enter risk score",
      validation: z.number().min(0).max(100),
    },
    {
      name: "verified",
      label: "Verified",
      type: "select",
      placeholder: "Select verification status",
      options: [
        { label: "Verified", value: "true" },
        { label: "Not Verified", value: "false" },
      ],
      validation: z.string(),
    },
    {
      name: "contactEmail",
      label: "Contact Email",
      type: "email",
      placeholder: "Enter contact email",
      validation: z.string().email("Invalid email address"),
    },
    {
      name: "contactPhone",
      label: "Contact Phone",
      type: "text",
      placeholder: "Enter contact phone",
      validation: z.string().min(5, "Phone number is required"),
    },
  ];

  // Table columns
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (supplier: Supplier) => (
        <Badge variant={getStatusVariant(supplier.status)}>
          {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Risk Score",
      accessorKey: "riskScore",
      cell: (supplier: Supplier) => (
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${getRiskColor(supplier.riskScore)}`}></span>
          <span>{supplier.riskScore}</span>
        </div>
      ),
    },
    {
      header: "Verified",
      accessorKey: "verified",
      cell: (supplier: Supplier) => (
        supplier.verified ? 
          <Badge variant="outline" className="text-green-500 gap-1">
            <Check className="h-3 w-3" /> Verified
          </Badge> : 
          <Badge variant="outline" className="text-amber-500 gap-1">
            <X className="h-3 w-3" /> Not Verified
          </Badge>
      ),
    },
  ];

  // Helper functions
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "secondary";
      case "inactive":
        return "secondary";
      case "review":
        return "outline";
      case "suspended":
        return "destructive";
      default:
        return "default";
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  // CRUD operations
  const handleAddSupplier = () => {
    setCurrentSupplier(null);
    setIsFormOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsFormOpen(true);
  };

  const handleDeleteSupplier = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (values: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (currentSupplier) {
        // Edit existing supplier
        setSuppliers((prev) =>
          prev.map((supplier) =>
            supplier.id === currentSupplier.id
              ? {
                  ...supplier,
                  ...values,
                  verified: values.verified === "true",
                  riskScore: Number(values.riskScore),
                }
              : supplier
          )
        );
        toast({
          title: "Supplier updated",
          description: `${values.name} has been updated successfully.`,
        });
      } else {
        // Add new supplier
        const newSupplier: Supplier = {
          id: `SUP-${String(suppliers.length + 1).padStart(3, "0")}`,
          ...values,
          verified: values.verified === "true",
          riskScore: Number(values.riskScore),
        };
        setSuppliers((prev) => [...prev, newSupplier]);
        toast({
          title: "Supplier added",
          description: `${values.name} has been added successfully.`,
        });
      }
      
      setIsLoading(false);
      setIsFormOpen(false);
      setCurrentSupplier(null);
    }, 1000);
  };

  const handleConfirmDelete = () => {
    if (!currentSupplier) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuppliers((prev) =>
        prev.filter((supplier) => supplier.id !== currentSupplier.id)
      );
      
      toast({
        title: "Supplier deleted",
        description: `${currentSupplier.name} has been deleted successfully.`,
        variant: "destructive",
      });
      
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setCurrentSupplier(null);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    // Implement search functionality here
    console.log("Searching for:", query);
  };

  return (
    <div className="container pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground mt-1">
            Manage your supply chain partners
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{suppliers.length}</div>
            <p className="text-sm text-muted-foreground">
              Active suppliers in your network
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {suppliers.filter((s) => s.verified).length}
            </div>
            <p className="text-sm text-muted-foreground">
              Blockchain verified suppliers
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">
              {suppliers.filter((s) => s.status === "review").length}
            </div>
            <p className="text-sm text-muted-foreground">
              Suppliers currently under review
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(
                suppliers.reduce((acc, s) => acc + s.riskScore, 0) / suppliers.length
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Average risk across all suppliers
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <CrudTable
            title="Supplier Management"
            data={suppliers}
            columns={columns}
            onAdd={handleAddSupplier}
            onEdit={handleEditSupplier}
            onDelete={handleDeleteSupplier}
            onSearch={handleSearch}
          />
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      <CrudForm
        fields={supplierFormFields}
        title={currentSupplier ? "Edit Supplier" : "Add Supplier"}
        description={
          currentSupplier
            ? "Update the supplier information below."
            : "Enter the new supplier details below."
        }
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={
          currentSupplier
            ? { ...currentSupplier, verified: String(currentSupplier.verified) }
            : undefined
        }
        isLoading={isLoading}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Supplier"
        description={
          currentSupplier
            ? `Are you sure you want to delete ${currentSupplier.name}? This action cannot be undone.`
            : "Are you sure you want to delete this supplier? This action cannot be undone."
        }
        isLoading={isLoading}
      />
    </div>
  );
};

export default Suppliers;
