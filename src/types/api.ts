
import type { Database } from "@/integrations/supabase/types";

// Re-export database types for convenience
export type Tables = Database["public"]["Tables"];

// Define more specific types for our CRUD operations
export interface Supplier extends Omit<Tables["suppliers"]["Row"], "created_at" | "updated_at"> {
  created_at?: string;
  updated_at?: string;
}

export interface RiskFactor extends Omit<Tables["risk_factors"]["Row"], "created_at" | "updated_at"> {
  created_at?: string;
  updated_at?: string;
}

export interface EsgReportItem extends Omit<Tables["esg_report_items"]["Row"], "created_at" | "updated_at"> {
  created_at?: string;
  updated_at?: string;
  date: string;
}

// Convert to frontend-friendly format
export type Report = {
  id: string;
  title: string;
  date: string;
  type: "quarterly" | "annual" | "audit" | "disclosure";
  status: "published" | "draft" | "pending";
  scope: "global" | "regional";
  downloadLink: string;
  blockhainVerified: boolean;
};

// Mapping function from database to frontend format
export const mapEsgReportItemToReport = (item: EsgReportItem): Report => ({
  id: item.id,
  title: item.title,
  date: new Date(item.date).toISOString().split('T')[0],
  type: item.type as "quarterly" | "annual" | "audit" | "disclosure",
  status: item.status as "published" | "draft" | "pending",
  scope: item.scope as "global" | "regional",
  downloadLink: item.download_link || "#",
  blockhainVerified: item.blockchain_verified,
});

// Mapping function from frontend to database format
export const mapReportToEsgReportItem = (report: Report): Partial<EsgReportItem> => ({
  id: report.id,
  title: report.title,
  type: report.type,
  date: new Date(report.date).toISOString(),
  status: report.status,
  scope: report.scope,
  download_link: report.downloadLink,
  blockchain_verified: report.blockhainVerified,
});
