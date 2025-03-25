
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEsgReports, createEsgReport, updateEsgReport, deleteEsgReport, verifyEsgReport } from "@/api/esgReports";
import { Report } from "@/types/api";
import { toast } from "@/hooks/use-toast";

export const useEsgReports = () => {
  const queryClient = useQueryClient();

  // Query to fetch all ESG reports
  const query = useQuery({
    queryKey: ["esgReports"],
    queryFn: fetchEsgReports,
  });

  // Mutation to create a new ESG report
  const createMutation = useMutation({
    mutationFn: (newReport: Omit<Report, "id">) => createEsgReport(newReport),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["esgReports"] });
      toast({
        title: "Report created",
        description: "The report has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create report",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation to update an existing ESG report
  const updateMutation = useMutation({
    mutationFn: (updatedReport: Report) => updateEsgReport(updatedReport),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["esgReports"] });
      toast({
        title: "Report updated",
        description: "The report has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update report",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation to delete an ESG report
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEsgReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["esgReports"] });
      toast({
        title: "Report deleted",
        description: "The report has been deleted successfully.",
        variant: "destructive",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete report",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation to verify an ESG report on blockchain
  const verifyMutation = useMutation({
    mutationFn: (id: string) => verifyEsgReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["esgReports"] });
      toast({
        title: "Report verified",
        description: "The report has been blockchain verified successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to verify report",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    reports: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createReport: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateReport: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteReport: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    verifyReport: verifyMutation.mutate,
    isVerifying: verifyMutation.isPending,
  };
};
