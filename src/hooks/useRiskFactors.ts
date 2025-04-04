
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { 
  fetchRiskFactors, 
  fetchRiskFactor, 
  createRiskFactor, 
  updateRiskFactor, 
  deleteRiskFactor 
} from "@/api/risk-factors";
import type { RiskFactor } from "@/types/api";

export function useRiskFactors() {
  const queryClient = useQueryClient();

  const riskFactorsQuery = useQuery({
    queryKey: ["riskFactors"],
    queryFn: fetchRiskFactors,
  });

  const riskFactorQuery = (id: string) => useQuery({
    queryKey: ["riskFactor", id],
    queryFn: () => fetchRiskFactor(id),
    enabled: !!id,
  });

  const createRiskFactorMutation = useMutation({
    mutationFn: (newRiskFactor: Omit<RiskFactor, "id" | "created_at" | "updated_at">) => createRiskFactor(newRiskFactor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["riskFactors"] });
      toast({
        title: "Success",
        description: "Risk factor created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create risk factor: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateRiskFactorMutation = useMutation({
    mutationFn: ({ id, riskFactor }: { id: string; riskFactor: Partial<RiskFactor> }) => updateRiskFactor(id, riskFactor),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["riskFactors"] });
      queryClient.invalidateQueries({ queryKey: ["riskFactor", data.id] });
      toast({
        title: "Success",
        description: "Risk factor updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update risk factor: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteRiskFactorMutation = useMutation({
    mutationFn: (id: string) => deleteRiskFactor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["riskFactors"] });
      toast({
        title: "Success",
        description: "Risk factor deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete risk factor: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    riskFactorsQuery,
    riskFactorQuery,
    createRiskFactorMutation,
    updateRiskFactorMutation,
    deleteRiskFactorMutation,
  };
}
