
import { supabase } from "@/integrations/supabase/client";

export interface SystemNode {
  id: string;
  name: string;
  type: string;
  description: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface SystemConnection {
  id: string;
  source_id: string;
  target_id: string;
  type: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

// Fetch all system nodes
export const fetchSystemNodes = async (): Promise<SystemNode[]> => {
  const { data, error } = await supabase
    .from("supply_chain_nodes")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching system nodes:", error);
    throw new Error(`Failed to fetch system nodes: ${error.message}`);
  }

  return data.map(node => ({
    id: node.id,
    name: node.name,
    type: node.facility_type,
    description: node.location_type || '',
    status: node.status,
    created_at: node.created_at,
    updated_at: node.updated_at
  })) || [];
};

// Fetch all system connections
export const fetchSystemConnections = async (): Promise<SystemConnection[]> => {
  const { data, error } = await supabase
    .from("supply_chain_routes")
    .select("*");

  if (error) {
    console.error("Error fetching system connections:", error);
    throw new Error(`Failed to fetch system connections: ${error.message}`);
  }

  return data.map(route => ({
    id: route.id,
    source_id: route.origin_id,
    target_id: route.destination_id,
    type: route.route_type,
    description: route.transportation_mode,
    created_at: route.created_at,
    updated_at: route.updated_at
  })) || [];
};

// Create a new system node
export const createSystemNode = async (node: Omit<SystemNode, "id" | "created_at" | "updated_at">): Promise<SystemNode> => {
  const nodeData = {
    name: node.name,
    facility_type: node.type,
    location_type: node.description,
    status: node.status
  };

  const { data, error } = await supabase
    .from("supply_chain_nodes")
    .insert(nodeData)
    .select()
    .single();

  if (error) {
    console.error("Error creating system node:", error);
    throw new Error(`Failed to create system node: ${error.message}`);
  }

  return {
    id: data.id,
    name: data.name,
    type: data.facility_type,
    description: data.location_type || '',
    status: data.status,
    created_at: data.created_at,
    updated_at: data.updated_at
  };
};

// Create a new system connection
export const createSystemConnection = async (connection: Omit<SystemConnection, "id" | "created_at" | "updated_at">): Promise<SystemConnection> => {
  const connectionData = {
    origin_id: connection.source_id,
    destination_id: connection.target_id,
    route_type: connection.type,
    transportation_mode: connection.description
  };

  const { data, error } = await supabase
    .from("supply_chain_routes")
    .insert(connectionData)
    .select()
    .single();

  if (error) {
    console.error("Error creating system connection:", error);
    throw new Error(`Failed to create system connection: ${error.message}`);
  }

  return {
    id: data.id,
    source_id: data.origin_id,
    target_id: data.destination_id,
    type: data.route_type,
    description: data.transportation_mode,
    created_at: data.created_at,
    updated_at: data.updated_at
  };
};

// Update an existing system node
export const updateSystemNode = async (id: string, node: Partial<SystemNode>): Promise<SystemNode> => {
  const nodeData: any = {};
  if (node.name) nodeData.name = node.name;
  if (node.type) nodeData.facility_type = node.type;
  if (node.description) nodeData.location_type = node.description;
  if (node.status) nodeData.status = node.status;

  const { data, error } = await supabase
    .from("supply_chain_nodes")
    .update(nodeData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating system node with ID ${id}:`, error);
    throw new Error(`Failed to update system node: ${error.message}`);
  }

  return {
    id: data.id,
    name: data.name,
    type: data.facility_type,
    description: data.location_type || '',
    status: data.status,
    created_at: data.created_at,
    updated_at: data.updated_at
  };
};

// Delete a system node
export const deleteSystemNode = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("supply_chain_nodes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting system node with ID ${id}:`, error);
    throw new Error(`Failed to delete system node: ${error.message}`);
  }
};

// Delete a system connection
export const deleteSystemConnection = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("supply_chain_routes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting system connection with ID ${id}:`, error);
    throw new Error(`Failed to delete system connection: ${error.message}`);
  }
};
