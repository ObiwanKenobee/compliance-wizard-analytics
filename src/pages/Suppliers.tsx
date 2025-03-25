
import { useState } from "react";
import { 
  Users, Search, PlusCircle, Filter, Download, ArrowUpDown, Check, 
  CheckCircle2, AlertTriangle, Hexagon 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RiskBadge from "@/components/ui/RiskBadge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Supplier = {
  id: number;
  name: string;
  category: string;
  riskLevel: "low" | "moderate" | "high";
  complianceScore: number;
  status: "verified" | "pending" | "issue";
  location: string;
  contactPerson: string;
  blockhainVerified: boolean;
};

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const suppliers: Supplier[] = [
    {
      id: 1,
      name: "EcoMaterials, Inc.",
      category: "Raw Materials",
      riskLevel: "low",
      complianceScore: 92,
      status: "verified",
      location: "United States",
      contactPerson: "Sarah Johnson",
      blockhainVerified: true
    },
    {
      id: 2,
      name: "Pacific Manufacturing",
      category: "Components",
      riskLevel: "moderate",
      complianceScore: 78,
      status: "pending",
      location: "Singapore",
      contactPerson: "Michael Wong",
      blockhainVerified: true
    },
    {
      id: 3,
      name: "GlobalTech Industries",
      category: "Electronics",
      riskLevel: "high",
      complianceScore: 61,
      status: "issue",
      location: "Malaysia",
      contactPerson: "David Chen",
      blockhainVerified: false
    },
    {
      id: 4,
      name: "Highland Logistics",
      category: "Logistics",
      riskLevel: "low",
      complianceScore: 95,
      status: "verified",
      location: "Canada",
      contactPerson: "Emma Williams",
      blockhainVerified: true
    },
    {
      id: 5,
      name: "Euro Quality Products",
      category: "Components",
      riskLevel: "moderate",
      complianceScore: 75,
      status: "pending",
      location: "Germany",
      contactPerson: "Hans Mueller",
      blockhainVerified: true
    },
    {
      id: 6,
      name: "AsiaSource Partners",
      category: "Raw Materials",
      riskLevel: "high",
      complianceScore: 58,
      status: "issue",
      location: "Vietnam",
      contactPerson: "Li Nguyen",
      blockhainVerified: false
    },
  ];

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "verified":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "issue":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
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
            <Download size={16} />
            Export
          </Button>
          <Button className="gap-2">
            <PlusCircle size={16} />
            Add Supplier
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Supplier Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <p className="text-3xl font-bold mb-1">{suppliers.length}</p>
              <p className="text-sm text-muted-foreground">Total Suppliers</p>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <p className="text-3xl font-bold mb-1 text-green-500">
                {suppliers.filter(s => s.status === "verified").length}
              </p>
              <p className="text-sm text-muted-foreground">Verified Suppliers</p>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <p className="text-3xl font-bold mb-1 text-amber-500">
                {suppliers.filter(s => s.riskLevel === "moderate").length}
              </p>
              <p className="text-sm text-muted-foreground">Moderate Risk</p>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <p className="text-3xl font-bold mb-1 text-red-500">
                {suppliers.filter(s => s.riskLevel === "high").length}
              </p>
              <p className="text-sm text-muted-foreground">High Risk</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Supplier Directory</CardTitle>
            
            <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search suppliers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left font-medium">
                      <div className="flex items-center gap-1">
                        <Checkbox id="selectAll" aria-label="Select all suppliers" />
                        <label htmlFor="selectAll" className="text-xs sr-only">Select All</label>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left font-medium">
                      <div className="flex items-center gap-1">
                        Supplier
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ArrowUpDown className="h-3 w-3" />
                              <span className="sr-only">Sort by name</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" /> A-Z
                            </DropdownMenuItem>
                            <DropdownMenuItem>Z-A</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left font-medium">Category</th>
                    <th className="h-10 px-4 text-left font-medium">Risk Level</th>
                    <th className="h-10 px-4 text-left font-medium">
                      <div className="flex items-center gap-1">
                        Compliance Score
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ArrowUpDown className="h-3 w-3" />
                              <span className="sr-only">Sort by score</span>
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
                    <th className="h-10 px-4 text-left font-medium">Status</th>
                    <th className="h-10 px-4 text-left font-medium">Location</th>
                    <th className="h-10 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <Checkbox aria-label={`Select ${supplier.name}`} />
                      </td>
                      <td className="p-4 font-medium">
                        <div className="flex items-center gap-2">
                          {supplier.name}
                          {supplier.blockhainVerified && (
                            <Hexagon className="h-4 w-4 text-blue-500 fill-blue-500/10" />
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{supplier.category}</td>
                      <td className="p-4">
                        <RiskBadge level={supplier.riskLevel} className="py-0.5 px-2 text-xs" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-[80px] h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                supplier.complianceScore >= 80 ? "bg-green-500" : 
                                supplier.complianceScore >= 70 ? "bg-amber-500" : "bg-red-500"
                              }`}
                              style={{ width: `${supplier.complianceScore}%` }}
                            ></div>
                          </div>
                          <span>{supplier.complianceScore}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(supplier.status)}
                          <span className="capitalize">{supplier.status}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{supplier.location}</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSuppliers.length} of {suppliers.length} suppliers
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Suppliers;
