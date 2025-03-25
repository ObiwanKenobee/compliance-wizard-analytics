
import { supabase } from "@/integrations/supabase/client";
import { EsgReportItem, Report, mapEsgReportItemToReport, mapReportToEsgReportItem } from "@/types/api";

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
export const createEsgReport = async (reportData: Omit<Report, "id">): Promise<Report> => {
  const esgReportItem = mapReportToEsgReportItem(reportData as Report);
  
  // Remove undefined values and ensure required fields
  const dataToInsert = {
    title: esgReportItem.title,
    type: esgReportItem.type,
    date: esgReportItem.date,
    status: esgReportItem.status,
    scope: esgReportItem.scope || 'global', // Default to global if not provided
    download_link: esgReportItem.download_link || '',
    blockchain_verified: esgReportItem.blockchain_verified || false
  };

  const { data, error } = await supabase
    .from("esg_report_items")
    .insert(dataToInsert)
    .select("*")
    .single();

  if (error) {
    console.error("Error creating ESG report:", error);
    throw new Error(`Failed to create ESG report: ${error.message}`);
  }

  return mapEsgReportItemToReport(data);
};

// Update an existing ESG report
export const updateEsgReport = async (reportData: Report): Promise<Report> => {
  const esgReportItem = mapReportToEsgReportItem(reportData);
  
  // Ensure we have all required fields for the update
  const dataToUpdate = {
    title: esgReportItem.title,
    type: esgReportItem.type,
    date: esgReportItem.date,
    status: esgReportItem.status,
    scope: esgReportItem.scope || 'global', // Default to global if not provided
    download_link: esgReportItem.download_link || '',
    blockchain_verified: esgReportItem.blockchain_verified || false
  };

  const { data, error } = await supabase
    .from("esg_report_items")
    .update(dataToUpdate)
    .eq("id", reportData.id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating ESG report:", error);
    throw new Error(`Failed to update ESG report: ${error.message}`);
  }

  return mapEsgReportItemToReport(data);
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

// Verify an ESG report on blockchain
export const verifyEsgReport = async (id: string): Promise<Report> => {
  const { data, error } = await supabase
    .from("esg_report_items")
    .update({ blockchain_verified: true })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Error verifying ESG report:", error);
    throw new Error(`Failed to verify ESG report: ${error.message}`);
  }

  return mapEsgReportItemToReport(data);
};
