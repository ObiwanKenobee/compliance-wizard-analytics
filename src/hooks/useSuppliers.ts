
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { 
  fetchSuppliers, 
  fetchSupplier, 
  createSupplier, 
  updateSupplier, 
  deleteSupplier 
} from "@/api/suppliers";
import type { Supplier } from "@/types/api";

export function useSuppliers() {
  const queryClient = useQueryClient();

  const suppliersQuery = useQuery({
    queryKey: ["suppliers"],
    queryFn: fetchSuppliers,
  });

  const supplierQuery = (id: string) => useQuery({
    queryKey: ["supplier", id],
    queryFn: () => fetchSupplier(id),
    enabled: !!id,
  });

  const createSupplierMutation = useMutation({
    mutationFn: (newSupplier: Omit<Supplier, "id" | "created_at" | "updated_at">) => createSupplier(newSupplier),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast({
        title: "Success",
        description: "Supplier created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create supplier: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateSupplierMutation = useMutation({
    mutationFn: ({ id, supplier }: { id: string; supplier: Partial<Supplier> }) => updateSupplier(id, supplier),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: ["supplier", data.id] });
      toast({
        title: "Success",
        description: "Supplier updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update supplier: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteSupplierMutation = useMutation({
    mutationFn: (id: string) => deleteSupplier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast({
        title: "Success",
        description: "Supplier deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete supplier: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    suppliersQuery,
    supplierQuery,
    createSupplierMutation,
    updateSupplierMutation,
    deleteSupplierMutation,
  };
}
