
import { supabase } from "@/integrations/supabase/client";
import { RiskFactor } from "@/types/api";

// Fetch all risk factors
export const fetchRiskFactors = async (): Promise<RiskFactor[]> => {
  const { data, error } = await supabase
    .from("risk_factors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching risk factors:", error);
    throw new Error(`Failed to fetch risk factors: ${error.message}`);
  }

  return data || [];
};

// Fetch a single risk factor by ID
export const fetchRiskFactor = async (id: string): Promise<RiskFactor> => {
  const { data, error } = await supabase
    .from("risk_factors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching risk factor with ID ${id}:`, error);
    throw new Error(`Failed to fetch risk factor: ${error.message}`);
  }

  return data;
};

// Create a new risk factor
export const createRiskFactor = async (riskFactor: Omit<RiskFactor, "id" | "created_at" | "updated_at">): Promise<RiskFactor> => {
  const { data, error } = await supabase
    .from("risk_factors")
    .insert(riskFactor)
    .select()
    .single();

  if (error) {
    console.error("Error creating risk factor:", error);
    throw new Error(`Failed to create risk factor: ${error.message}`);
  }

  return data;
};

// Update an existing risk factor
export const updateRiskFactor = async (id: string, riskFactor: Partial<RiskFactor>): Promise<RiskFactor> => {
  const { data, error } = await supabase
    .from("risk_factors")
    .update(riskFactor)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating risk factor with ID ${id}:`, error);
    throw new Error(`Failed to update risk factor: ${error.message}`);
  }

  return data;
};

// Delete a risk factor
export const deleteRiskFactor = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("risk_factors")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting risk factor with ID ${id}:`, error);
    throw new Error(`Failed to delete risk factor: ${error.message}`);
  }
};
