
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { 
  fetchSystemNodes, 
  fetchSystemConnections, 
  createSystemNode, 
  createSystemConnection,
  updateSystemNode,
  deleteSystemNode,
  deleteSystemConnection,
  SystemNode,
  SystemConnection
} from "@/api/system-flow";

export function useSystemFlow() {
  const queryClient = useQueryClient();

  const nodesQuery = useQuery({
    queryKey: ["systemNodes"],
    queryFn: fetchSystemNodes,
  });

  const connectionsQuery = useQuery({
    queryKey: ["systemConnections"],
    queryFn: fetchSystemConnections,
  });

  const createNodeMutation = useMutation({
    mutationFn: (newNode: Omit<SystemNode, "id" | "created_at" | "updated_at">) => createSystemNode(newNode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemNodes"] });
      toast({
        title: "Success",
        description: "System node created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create system node: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const createConnectionMutation = useMutation({
    mutationFn: (newConnection: Omit<SystemConnection, "id" | "created_at" | "updated_at">) => createSystemConnection(newConnection),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemConnections"] });
      toast({
        title: "Success",
        description: "System connection created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create system connection: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateNodeMutation = useMutation({
    mutationFn: ({ id, node }: { id: string; node: Partial<SystemNode> }) => updateSystemNode(id, node),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemNodes"] });
      toast({
        title: "Success",
        description: "System node updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update system node: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteNodeMutation = useMutation({
    mutationFn: (id: string) => deleteSystemNode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemNodes"] });
      toast({
        title: "Success",
        description: "System node deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete system node: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteConnectionMutation = useMutation({
    mutationFn: (id: string) => deleteSystemConnection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemConnections"] });
      toast({
        title: "Success",
        description: "System connection deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete system connection: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    nodesQuery,
    connectionsQuery,
    createNodeMutation,
    createConnectionMutation,
    updateNodeMutation,
    deleteNodeMutation,
    deleteConnectionMutation,
  };
}
