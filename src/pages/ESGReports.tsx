
import { useState } from "react";
import { 
  Globe, Download, FileText, Filter, Calendar, Clock, CheckCircle2, 
  FileBarChart, BookOpen, BarChart3, PieChart, ArrowUpDown, Plus, Trash, Edit
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ReportDialog, Report } from "@/components/reports/ReportDialog";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { AlertDialog } from "@/components/common/AlertDialog";
import { useEsgReports } from "@/hooks/useEsgReports";
import { CrudTable } from "@/components/common/CrudTable";
import { useIsMobile } from "@/hooks/use-mobile";

const ESGReports = () => {
  const isMobile = useIsMobile();
  const {
    reports,
    isLoading,
    createReport,
    isCreating,
    updateReport,
    isUpdating,
    deleteReport,
    isDeleting,
    verifyReport,
    isVerifying,
  } = useEsgReports();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const statusColors = {
    published: "bg-green-500",
    draft: "bg-amber-500",
    pending: "bg-blue-500"
  };

  const typeLabels = {
    quarterly: "Quarterly Report",
    annual: "Annual Report",
    audit: "Audit Report",
    disclosure: "Disclosure Document"
  };

  const getStatusBadge = (status: string) => {
    const colorClass = statusColors[status as keyof typeof statusColors] || "bg-gray-500";
    return (
      <Badge variant="outline" className="capitalize">
        <span className={`mr-1.5 h-2 w-2 rounded-full ${colorClass}`}></span>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleAddReport = () => {
    setCurrentReport(null);
    setIsFormOpen(true);
  };

  const handleEditReport = (report: Report) => {
    setCurrentReport(report);
    setIsFormOpen(true);
  };

  const handleDeleteReport = (report: Report) => {
    setCurrentReport(report);
    setIsDeleteDialogOpen(true);
  };

  const handleVerifyReport = (report: Report) => {
    setCurrentReport(report);
    setIsVerifyDialogOpen(true);
  };

  const handleSubmit = (values: any) => {
    if (currentReport) {
      updateReport({
        ...currentReport,
        ...values,
        blockhainVerified: values.blockhainVerified === "true",
      });
    } else {
      createReport({
        title: values.title,
        type: values.type as "quarterly" | "annual" | "audit" | "disclosure",
        status: values.status as "published" | "draft" | "pending",
        scope: values.scope as "global" | "regional",
        date: new Date().toISOString().split('T')[0],
        downloadLink: "#",
        blockhainVerified: values.blockhainVerified === "true",
      });
    }
    
    setIsFormOpen(false);
    setCurrentReport(null);
  };

  const handleConfirmDelete = () => {
    if (!currentReport) return;
    deleteReport(currentReport.id);
    setIsDeleteDialogOpen(false);
    setCurrentReport(null);
  };

  const handleConfirmVerify = () => {
    if (!currentReport) return;
    verifyReport(currentReport.id);
    setIsVerifyDialogOpen(false);
    setCurrentReport(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    typeLabels[report.type as keyof typeof typeLabels].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: "Report ID",
      accessorKey: "id",
      cell: (row: Report) => <span className="font-mono text-xs">{row.id}</span>,
    },
    {
      header: "Report Title",
      accessorKey: "title",
      cell: (row: Report) => (
        <div className="flex items-center gap-2 font-medium">
          {row.blockhainVerified && (
            <Badge variant="outline" className="gap-1 text-xs px-1.5 py-0 border-green-200 text-green-700 dark:border-green-800 dark:text-green-400">
              <CheckCircle2 className="h-3 w-3" /> Verified
            </Badge>
          )}
          {row.title}
        </div>
      ),
    },
    {
      header: "Type",
      accessorKey: "type",
      cell: (row: Report) => (
        <span className="text-muted-foreground">
          {typeLabels[row.type as keyof typeof typeLabels]}
        </span>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (row: Report) => (
        <span className="text-muted-foreground">{formatDate(row.date)}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: Report) => getStatusBadge(row.status),
    },
    {
      header: "Scope",
      accessorKey: "scope",
      cell: (row: Report) => (
        <span className="capitalize text-muted-foreground">{row.scope}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (row: Report) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            disabled={row.status !== "published"}
            title="Download Report"
          >
            <Download className="h-4 w-4" />
          </Button>
          {!row.blockhainVerified && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-green-500"
              onClick={() => handleVerifyReport(row)}
              title="Verify on Blockchain"
            >
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ESG Reports</h1>
          <p className="text-muted-foreground mt-1">
            Environmental, Social, and Governance reporting and disclosures
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar size={16} />
            {!isMobile && <span>Schedule Report</span>}
          </Button>
          <Button className="gap-2" onClick={handleAddReport}>
            <Plus size={16} />
            {!isMobile && <span>Create Report</span>}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">ESG Score</CardTitle>
              <Badge variant="outline" className="font-normal">Global</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <p className="text-4xl font-bold">87</p>
              <Badge variant="secondary" className="gap-1">
                <ArrowUpDown size={12} /> +3.2%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Overall ESG performance score based on verified blockchain data
            </p>
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-semibold">91</p>
                <p className="text-xs text-muted-foreground">Environmental</p>
              </div>
              <div>
                <p className="text-lg font-semibold">84</p>
                <p className="text-xs text-muted-foreground">Social</p>
              </div>
              <div>
                <p className="text-lg font-semibold">86</p>
                <p className="text-xs text-muted-foreground">Governance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Reporting Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-green-500">
                  {reports.filter(r => r.status === "published").length}
                </p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-amber-500">
                  {reports.filter(r => r.status === "draft").length}
                </p>
                <p className="text-sm text-muted-foreground">Draft</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-blue-500">
                  {reports.filter(r => r.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-green-500">
                  {reports.filter(r => r.blockhainVerified).length}
                </p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Q4 Report Due</p>
                  <p className="text-sm text-muted-foreground">Dec 31, 2023</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Annual Disclosure</p>
                  <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">EU CSRD Deadline</p>
                  <p className="text-sm text-muted-foreground">Feb 28, 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="mb-6 flex flex-wrap w-full sm:w-auto">
          <TabsTrigger value="reports" className="flex-1 sm:flex-none">
            <FileText className="mr-2 h-4 w-4" /> {!isMobile && "All Reports"}
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex-1 sm:flex-none">
            <BarChart3 className="mr-2 h-4 w-4" /> {!isMobile && "ESG Insights"}
          </TabsTrigger>
          <TabsTrigger value="standards" className="flex-1 sm:flex-none">
            <BookOpen className="mr-2 h-4 w-4" /> {!isMobile && "Reporting Standards"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>ESG Reports & Disclosures</CardTitle>
                  <CardDescription>View and manage all your ESG documentation</CardDescription>
                </div>
                
                <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Input
                      type="search"
                      placeholder="Search reports..."
                      className="w-full md:w-[250px]"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter size={16} />
                    {!isMobile && "Filter"}
                  </Button>
                  <Button className="gap-2" onClick={handleAddReport}>
                    <Plus size={16} />
                    {!isMobile && "Add Report"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <CrudTable 
                data={filteredReports}
                columns={columns}
                title=""
                onAdd={handleAddReport}
                onEdit={handleEditReport}
                onDelete={handleDeleteReport}
                isLoading={isLoading || isCreating || isUpdating || isDeleting || isVerifying}
              />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredReports.length} reports
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>ESG Performance Insights</CardTitle>
              <CardDescription>Data-driven analysis of your ESG performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg text-center">
                  <div className="flex justify-center mb-4">
                    <BarChart3 className="h-16 w-16 text-primary opacity-80" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">ESG Performance Trends</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track your progress over time across all ESG categories, 
                    with benchmarking against industry standards.
                  </p>
                  <Button>View Trends</Button>
                </div>
                
                <div className="p-6 border rounded-lg text-center">
                  <div className="flex justify-center mb-4">
                    <PieChart className="h-16 w-16 text-primary opacity-80" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">ESG Category Breakdown</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed analysis of your performance across Environmental, 
                    Social, and Governance categories.
                  </p>
                  <Button>View Breakdown</Button>
                </div>
                
                <div className="p-6 border rounded-lg text-center">
                  <div className="flex justify-center mb-4">
                    <Globe className="h-16 w-16 text-primary opacity-80" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Global Sustainability Map</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Geographic visualization of your global sustainability 
                    initiatives and impact areas.
                  </p>
                  <Button>View Map</Button>
                </div>
                
                <div className="p-6 border rounded-lg text-center">
                  <div className="flex justify-center mb-4">
                    <FileBarChart className="h-16 w-16 text-primary opacity-80" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Regulatory Compliance</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive overview of your compliance status with 
                    regional and global ESG reporting standards.
                  </p>
                  <Button>View Compliance</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="standards">
          <Card>
            <CardHeader>
              <CardTitle>ESG Reporting Standards</CardTitle>
              <CardDescription>Overview of standards and frameworks</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Global Reporting Initiative (GRI)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        The GRI Standards create a common language for organizations to report on their sustainability impacts.
                        They provide a globally recognized framework for sustainability reporting.
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-blue-500 border-blue-200 dark:border-blue-950">Supported</Badge>
                        <Badge variant="outline" className="text-green-500 border-green-200 dark:border-green-950">Compliant</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Sustainability Accounting Standards Board (SASB)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        SASB Standards identify the subset of ESG issues most relevant to financial performance for 77 industries.
                        They help businesses and investors develop a common language about the financial impacts of sustainability.
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-blue-500 border-blue-200 dark:border-blue-950">Supported</Badge>
                        <Badge variant="outline" className="text-green-500 border-green-200 dark:border-green-950">Compliant</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Task Force on Climate-related Financial Disclosures (TCFD)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        The TCFD recommendations help companies provide better information to support informed capital allocation.
                        They focus on effective climate-related disclosures that promote more informed investment decisions.
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-blue-500 border-blue-200 dark:border-blue-950">Supported</Badge>
                        <Badge variant="outline" className="text-amber-500 border-amber-200 dark:border-amber-950">Partial</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">EU Corporate Sustainability Reporting Directive (CSRD)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        The CSRD aims to bring sustainability reporting on par with financial reporting. 
                        It extends the scope and requirements for sustainability reporting for EU companies.
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-blue-500 border-blue-200 dark:border-blue-950">Supported</Badge>
                        <Badge variant="outline" className="text-amber-500 border-amber-200 dark:border-amber-950">In Progress</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ReportDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={currentReport || undefined}
        isLoading={isCreating || isUpdating}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Report"
        description="Are you sure you want to delete this report? This action cannot be undone."
        isLoading={isDeleting}
      />

      <AlertDialog
        isOpen={isVerifyDialogOpen}
        onClose={() => setIsVerifyDialogOpen(false)}
        onConfirm={handleConfirmVerify}
        title="Verify on Blockchain"
        description="Are you sure you want to verify this report on the blockchain? This will create an immutable record of the report's existence and contents."
        confirmText="Verify"
        isLoading={isVerifying}
      />
    </div>
  );
};

export default ESGReports;
