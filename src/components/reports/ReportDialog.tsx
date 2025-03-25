
import { z } from "zod";
import { CrudForm, FormField } from "@/components/common/CrudForm";

export interface Report {
  id: string;
  title: string;
  date: string;
  type: "quarterly" | "annual" | "audit" | "disclosure";
  status: "published" | "draft" | "pending";
  scope: "global" | "regional";
  downloadLink: string;
  blockhainVerified: boolean;
}

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  defaultValues?: Report;
  isLoading?: boolean;
}

export function ReportDialog({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  isLoading = false,
}: ReportDialogProps) {
  const reportFields: FormField[] = [
    {
      name: "title",
      label: "Report Title",
      type: "text",
      placeholder: "Enter report title",
      validation: z.string().min(5, "Title must be at least 5 characters"),
    },
    {
      name: "type",
      label: "Report Type",
      type: "select",
      placeholder: "Select report type",
      options: [
        { label: "Quarterly Report", value: "quarterly" },
        { label: "Annual Report", value: "annual" },
        { label: "Audit Report", value: "audit" },
        { label: "Disclosure Document", value: "disclosure" },
      ],
      validation: z.string().min(1, "Report type is required"),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status",
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
        { label: "Pending", value: "pending" },
      ],
      validation: z.string().min(1, "Status is required"),
    },
    {
      name: "scope",
      label: "Scope",
      type: "select",
      placeholder: "Select scope",
      options: [
        { label: "Global", value: "global" },
        { label: "Regional", value: "regional" },
      ],
      validation: z.string().min(1, "Scope is required"),
    },
    {
      name: "blockhainVerified",
      label: "Blockchain Verification",
      type: "select",
      placeholder: "Select verification status",
      options: [
        { label: "Verified", value: "true" },
        { label: "Not Verified", value: "false" },
      ],
      validation: z.string(),
    },
  ];

  return (
    <CrudForm
      fields={reportFields}
      title={defaultValues ? "Edit Report" : "Create Report"}
      description={
        defaultValues
          ? "Update the report information below."
          : "Enter the new report details below."
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      defaultValues={
        defaultValues
          ? { 
              ...defaultValues, 
              blockhainVerified: String(defaultValues.blockhainVerified) 
            }
          : undefined
      }
      isLoading={isLoading}
    />
  );
}
