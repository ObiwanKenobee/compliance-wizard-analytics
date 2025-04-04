
import { useState } from "react";
import {
  Network,
  Plus,
  Edit,
  Trash,
  GitBranch,
  Workflow,
  Unlink,
  Link,
  Database,
  ServerCrash,
  AlertCircle,
  Cpu,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useSystemFlow } from "@/hooks/useSystemFlow";
import { NodeDialog } from "@/components/system-flow/NodeDialog";
import { ConnectionDialog } from "@/components/system-flow/ConnectionDialog";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { SystemNode, SystemConnection } from "@/api/system-flow";

const SystemFlow = () => {
  const { 
    nodesQuery,
    connectionsQuery,
    createNodeMutation,
    createConnectionMutation,
    updateNodeMutation,
    deleteNodeMutation,
    deleteConnectionMutation
  } = useSystemFlow();
  
  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<SystemConnection | null>(null);
  const [isCreateNodeDialogOpen, setIsCreateNodeDialogOpen] = useState(false);
  const [isEditNodeDialogOpen, setIsEditNodeDialogOpen] = useState(false);
  const [isDeleteNodeDialogOpen, setIsDeleteNodeDialogOpen] = useState(false);
  const [isCreateConnectionDialogOpen, setIsCreateConnectionDialogOpen] = useState(false);
  const [isDeleteConnectionDialogOpen, setIsDeleteConnectionDialogOpen] = useState(false);
  
  const { data: nodes = [], isLoading: isNodesLoading } = nodesQuery;
  const { data: connections = [], isLoading: isConnectionsLoading } = connectionsQuery;
  
  const handleCreateNode = (data: any) => {
    createNodeMutation.mutate(data);
  };
  
  const handleUpdateNode = (data: any) => {
    if (selectedNode) {
      updateNodeMutation.mutate({
        id: selectedNode.id,
        node: data
      });
    }
  };
  
  const handleDeleteNode = () => {
    if (selectedNode) {
      deleteNodeMutation.mutate(selectedNode.id);
      setIsDeleteNodeDialogOpen(false);
    }
  };
  
  const handleCreateConnection = (data: any) => {
    createConnectionMutation.mutate(data);
  };
  
  const handleDeleteConnection = () => {
    if (selectedConnection) {
      deleteConnectionMutation.mutate(selectedConnection.id);
      setIsDeleteConnectionDialogOpen(false);
    }
  };
  
  const openEditNodeDialog = (node: SystemNode) => {
    setSelectedNode(node);
    setIsEditNodeDialogOpen(true);
  };
  
  const openDeleteNodeDialog = (node: SystemNode) => {
    setSelectedNode(node);
    setIsDeleteNodeDialogOpen(true);
  };
  
  const openDeleteConnectionDialog = (connection: SystemConnection) => {
    setSelectedConnection(connection);
    setIsDeleteConnectionDialogOpen(true);
  };
  
  const getNodeIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'warehouse':
        return <Database className="h-5 w-5 text-blue-500" />;
      case 'factory':
        return <Workflow className="h-5 w-5 text-orange-500" />;
      case 'supplier':
        return <Cpu className="h-5 w-5 text-gray-500" />;
      case 'distribution':
        return <GitBranch className="h-5 w-5 text-purple-500" />;
      case 'ai':
        return <Network className="h-5 w-5 text-amber-500" />;
      case 'blockchain':
        return <Link className="h-5 w-5 text-green-500" />;
      default:
        return <Database className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getNodeStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Maintenance</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getConnectionTypeIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'data_flow':
        return <Database className="h-5 w-5 text-blue-500" />;
      case 'supply_chain':
        return <Workflow className="h-5 w-5 text-orange-500" />;
      case 'blockchain':
        return <Link className="h-5 w-5 text-green-500" />;
      case 'api':
        return <Cpu className="h-5 w-5 text-purple-500" />;
      case 'dependency':
        return <GitBranch className="h-5 w-5 text-gray-500" />;
      default:
        return <Link className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getConnectionDescription = (description: string) => {
    switch(description.toLowerCase()) {
      case 'sea':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Sea</Badge>;
      case 'air':
        return <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">Air</Badge>;
      case 'road':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Road</Badge>;
      case 'rail':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Rail</Badge>;
      case 'http':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">HTTP</Badge>;
      case 'websocket':
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">WebSocket</Badge>;
      case 'p2p':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">P2P</Badge>;
      case 'message_queue':
        return <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">Message Queue</Badge>;
      default:
        return <Badge variant="outline">{description}</Badge>;
    }
  };
  
  const renderNodes = () => {
    if (isNodesLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }
    
    if (nodes.length === 0) {
      return (
        <div className="text-center py-10">
          <h3 className="text-lg font-semibold">No system nodes found</h3>
          <p className="text-sm text-muted-foreground mt-1">Add system components to visualize your flow</p>
          <Button className="mt-4" onClick={() => setIsCreateNodeDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add System Node
          </Button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes.map((node) => (
          <Card key={node.id} className="relative group">
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => openEditNodeDialog(node)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => openDeleteNodeDialog(node)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <CardHeader className="pb-2 pt-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-2 items-center">
                  {getNodeIcon(node.type)}
                  <CardTitle className="text-lg">{node.name}</CardTitle>
                </div>
                {getNodeStatusBadge(node.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <span className="text-sm font-medium">{node.type}</span>
                </div>
                {node.description && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Description:</span>
                    <span className="text-sm">{node.description}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Connections:</span>
                  <span className="text-sm font-medium">
                    {connections.filter(c => c.source_id === node.id || c.target_id === node.id).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  const renderConnections = () => {
    if (isConnectionsLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }
    
    if (connections.length === 0) {
      return (
        <div className="text-center py-10">
          <h3 className="text-lg font-semibold">No connections found</h3>
          <p className="text-sm text-muted-foreground mt-1">Connect system nodes to visualize the flow</p>
          <Button className="mt-4" onClick={() => setIsCreateConnectionDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Connection
          </Button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-4">
        {connections.map((connection) => {
          const sourceNode = nodes.find(n => n.id === connection.source_id);
          const targetNode = nodes.find(n => n.id === connection.target_id);
          
          return (
            <Card key={connection.id} className="relative group">
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => openDeleteConnectionDialog(connection)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader className="pb-2 pt-6">
                <div className="flex items-center gap-2">
                  {getConnectionTypeIcon(connection.type)}
                  <CardTitle className="text-lg">{connection.type} Connection</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getNodeIcon(sourceNode?.type || 'default')}
                    <span className="font-medium">{sourceNode?.name || 'Unknown'}</span>
                  </div>
                  <GitBranch className="h-4 w-4 mx-2" />
                  <div className="flex items-center gap-2">
                    {getNodeIcon(targetNode?.type || 'default')}
                    <span className="font-medium">{targetNode?.name || 'Unknown'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Mode:</span>
                  {getConnectionDescription(connection.description)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="container pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Flow</h1>
          <p className="text-muted-foreground mt-1">
            Visualize and manage your Guardian-IO components and their connections
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setIsCreateConnectionDialogOpen(true)}>
            <GitBranch size={16} />
            Add Connection
          </Button>
          <Button className="gap-2" onClick={() => setIsCreateNodeDialogOpen(true)}>
            <Plus size={16} />
            Add Node
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">System Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{nodes.length}</p>
              <Database className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-blue-500">{connections.length}</p>
              <GitBranch className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-green-500">
                {nodes.filter(n => n.status.toLowerCase() === 'active').length}
              </p>
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-red-500">
                {nodes.filter(n => n.status.toLowerCase() === 'error').length}
              </p>
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="diagram" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="diagram">System Diagram</TabsTrigger>
          <TabsTrigger value="nodes">System Nodes</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="diagram" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Guardian-IO System Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-md bg-muted/50 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Network className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">System Diagram Visualization</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                    This is where the interactive system diagram would be displayed, 
                    showing nodes and connections in a visual graph format.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nodes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>System Components</CardTitle>
            </CardHeader>
            <CardContent>
              {renderNodes()}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="connections" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>System Connections</CardTitle>
            </CardHeader>
            <CardContent>
              {renderConnections()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Create Node Dialog */}
      <NodeDialog
        open={isCreateNodeDialogOpen}
        onOpenChange={setIsCreateNodeDialogOpen}
        onSubmit={handleCreateNode}
        title="Add System Node"
        description="Add a new component to your system architecture."
        isLoading={createNodeMutation.isPending}
      />
      
      {/* Edit Node Dialog */}
      <NodeDialog
        open={isEditNodeDialogOpen}
        onOpenChange={setIsEditNodeDialogOpen}
        onSubmit={handleUpdateNode}
        initialData={selectedNode || undefined}
        title="Edit System Node"
        description="Update system component details."
        isLoading={updateNodeMutation.isPending}
      />
      
      {/* Delete Node Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={isDeleteNodeDialogOpen}
        onOpenChange={setIsDeleteNodeDialogOpen}
        onConfirm={handleDeleteNode}
        title="Delete System Node"
        description="Are you sure you want to delete this system component? This will also remove all its connections."
        isLoading={deleteNodeMutation.isPending}
      />
      
      {/* Create Connection Dialog */}
      <ConnectionDialog
        open={isCreateConnectionDialogOpen}
        onOpenChange={setIsCreateConnectionDialogOpen}
        onSubmit={handleCreateConnection}
        title="Add Connection"
        description="Connect two system components."
        isLoading={createConnectionMutation.isPending}
        nodes={nodes}
      />
      
      {/* Delete Connection Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={isDeleteConnectionDialogOpen}
        onOpenChange={setIsDeleteConnectionDialogOpen}
        onConfirm={handleDeleteConnection}
        title="Delete Connection"
        description="Are you sure you want to delete this connection?"
        isLoading={deleteConnectionMutation.isPending}
      />
    </div>
  );
};

export default SystemFlow;
