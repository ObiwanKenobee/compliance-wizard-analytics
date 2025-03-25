
import { supabase } from "@/integrations/supabase/client";
import { mapEsgReportItemToReport, mapReportToEsgReportItem, Report, EsgReportItem } from "@/types/api";
import { toast } from "@/hooks/use-toast";

// Fetch all ESG reports
export const fetchEsgReports = async (): Promise<Report[]> => {
  const { data, error } = await supabase
    .from("esg_report_items")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching ESG reports:", error);
    throw new Error(`Failed to fetch ESG reports: ${error.message}`);
  }

  return data.map(mapEsgReportItemToReport);
};

// Create a new ESG report
export const createEsgReport = async (report: Omit<Report, "id">): Promise<Report> => {
  const newItem = mapReportToEsgReportItem(report as Report);
  delete newItem.id; // Remove id for insert

  const { data, error } = await supabase
    .from("esg_report_items")
    .insert(newItem)
    .select()
    .single();

  if (error) {
    console.error("Error creating ESG report:", error);
    throw new Error(`Failed to create ESG report: ${error.message}`);
  }

  return mapEsgReportItemToReport(data as EsgReportItem);
};

// Update an existing ESG report
export const updateEsgReport = async (report: Report): Promise<Report> => {
  const updatedItem = mapReportToEsgReportItem(report);

  const { data, error } = await supabase
    .from("esg_report_items")
    .update(updatedItem)
    .eq("id", report.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating ESG report:", error);
    throw new Error(`Failed to update ESG report: ${error.message}`);
  }

  return mapEsgReportItemToReport(data as EsgReportItem);
};

// Delete an ESG report
export const deleteEsgReport = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("esg_report_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting ESG report:", error);
    throw new Error(`Failed to delete ESG report: ${error.message}`);
  }
};

// Verify an ESG report on blockchain (simulated)
export const verifyEsgReport = async (id: string): Promise<Report> => {
  // In a real implementation, this would interact with a blockchain service
  const { data, error } = await supabase
    .from("esg_report_items")
    .update({ blockchain_verified: true })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error verifying ESG report:", error);
    throw new Error(`Failed to verify ESG report: ${error.message}`);
  }

  return mapEsgReportItemToReport(data as EsgReportItem);
};
