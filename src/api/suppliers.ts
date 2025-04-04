
import { supabase } from "@/integrations/supabase/client";
import { Supplier } from "@/types/api";

// Fetch all suppliers
export const fetchSuppliers = async (): Promise<Supplier[]> => {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching suppliers:", error);
    throw new Error(`Failed to fetch suppliers: ${error.message}`);
  }

  return data || [];
};

// Fetch a single supplier by ID
export const fetchSupplier = async (id: string): Promise<Supplier> => {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching supplier with ID ${id}:`, error);
    throw new Error(`Failed to fetch supplier: ${error.message}`);
  }

  return data;
};

// Create a new supplier
export const createSupplier = async (supplier: Omit<Supplier, "id" | "created_at" | "updated_at">): Promise<Supplier> => {
  const { data, error } = await supabase
    .from("suppliers")
    .insert(supplier)
    .select()
    .single();

  if (error) {
    console.error("Error creating supplier:", error);
    throw new Error(`Failed to create supplier: ${error.message}`);
  }

  return data;
};

// Update an existing supplier
export const updateSupplier = async (id: string, supplier: Partial<Supplier>): Promise<Supplier> => {
  const { data, error } = await supabase
    .from("suppliers")
    .update(supplier)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating supplier with ID ${id}:`, error);
    throw new Error(`Failed to update supplier: ${error.message}`);
  }

  return data;
};

// Delete a supplier
export const deleteSupplier = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("suppliers")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting supplier with ID ${id}:`, error);
    throw new Error(`Failed to delete supplier: ${error.message}`);
  }
};
