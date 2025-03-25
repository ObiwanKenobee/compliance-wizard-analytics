
import { 
  Globe, Download, FileText, Filter, Calendar, Clock, CheckCircle2, 
  FileBarChart, BookOpen, BarChart3, PieChart, ArrowUpDown 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Report = {
  id: string;
  title: string;
  date: string;
  type: "quarterly" | "annual" | "audit" | "disclosure";
  status: "published" | "draft" | "pending";
  scope: "global" | "regional";
  downloadLink: string;
  blockhainVerified: boolean;
};

const ESGReports = () => {
  const reports: Report[] = [
    {
      id: "ESG-2023-Q3",
      title: "Q3 2023 ESG Performance Report",
      date: "2023-10-15",
      type: "quarterly",
      status: "published",
      scope: "global",
      downloadLink: "#",
      blockhainVerified: true
    },
    {
      id: "ESG-AUDIT-2023",
      title: "Annual Sustainability Audit Report",
      date: "2023-09-30",
      type: "audit",
      status: "published",
      scope: "global",
      downloadLink: "#",
      blockhainVerified: true
    },
    {
      id: "ESG-2023-Q2",
      title: "Q2 2023 ESG Performance Report",
      date: "2023-07-15",
      type: "quarterly",
      status: "published",
      scope: "global",
      downloadLink: "#", 
      blockhainVerified: true
    },
    {
      id: "APAC-DISCLOSURE-2023",
      title: "APAC Region Environmental Disclosure",
      date: "2023-08-22",
      type: "disclosure",
      status: "published",
      scope: "regional",
      downloadLink: "#",
      blockhainVerified: true
    },
    {
      id: "ESG-2023-Q4",
      title: "Q4 2023 ESG Performance Report",
      date: "2023-12-31",
      type: "quarterly",
      status: "draft",
      scope: "global",
      downloadLink: "#",
      blockhainVerified: false
    },
    {
      id: "CARBON-AUDIT-2023",
      title: "Carbon Footprint Audit",
      date: "2023-11-05",
      type: "audit",
      status: "pending",
      scope: "global",
      downloadLink: "#",
      blockhainVerified: false
    }
  ];

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
            Schedule Report
          </Button>
          <Button className="gap-2">
            <FileText size={16} />
            Create Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <p className="text-2xl font-bold text-green-500">4</p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-amber-500">1</p>
                <p className="text-sm text-muted-foreground">Draft</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-blue-500">1</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-500 mb-1" />
                <p className="text-sm text-muted-foreground">All Compliant</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium">Q4 Report Due</p>
                  <p className="text-sm text-muted-foreground">Dec 31, 2023</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Annual Disclosure</p>
                  <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
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
        <TabsList className="mb-6">
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" /> All Reports
          </TabsTrigger>
          <TabsTrigger value="insights">
            <BarChart3 className="mr-2 h-4 w-4" /> ESG Insights
          </TabsTrigger>
          <TabsTrigger value="standards">
            <BookOpen className="mr-2 h-4 w-4" /> Reporting Standards
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
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter size={16} />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left font-medium">Report ID</th>
                      <th className="h-10 px-4 text-left font-medium">Report Title</th>
                      <th className="h-10 px-4 text-left font-medium">Type</th>
                      <th className="h-10 px-4 text-left font-medium">Date</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                      <th className="h-10 px-4 text-left font-medium">Scope</th>
                      <th className="h-10 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-mono text-xs">{report.id}</td>
                        <td className="p-4 font-medium">
                          <div className="flex items-center gap-2">
                            {report.blockhainVerified && (
                              <Badge variant="outline" className="gap-1 text-xs px-1.5 py-0 border-green-200 text-green-700 dark:border-green-800 dark:text-green-400">
                                <CheckCircle2 className="h-3 w-3" /> Verified
                              </Badge>
                            )}
                            {report.title}
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {typeLabels[report.type as keyof typeof typeLabels]}
                        </td>
                        <td className="p-4 text-muted-foreground">{formatDate(report.date)}</td>
                        <td className="p-4">{getStatusBadge(report.status)}</td>
                        <td className="p-4 capitalize text-muted-foreground">{report.scope}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" disabled={report.status !== "published"}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {reports.length} reports
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
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Global Reporting Initiative (GRI)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        The GRI Standards create a common language for organizations to report on their sustainability impacts.
                        They provide a globally recognized framework for sustainability reporting.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-blue-500 border-blue-200 dark:border-blue-950">Supported</Badge>
                        <Badge variant="outline" className="text-green-500 border-green-200 dark:border-green-950">Compliant</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Sustainability Accounting Standards Board (SASB)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        SASB Standards identify the subset of ESG issues most relevant to financial performance for 77 industries.
                        They help businesses and investors develop a common language about the financial impacts of sustainability.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-blue-500 border-blue-200 dark:border-blue-950">Supported</Badge>
                        <Badge variant="outline" className="text-green-500 border-green-200 dark:border-green-950">Compliant</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Task Force on Climate-related Financial Disclosures (TCFD)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        The TCFD recommendations help companies provide better information to support informed capital allocation.
                        They focus on effective climate-related disclosures that promote more informed investment decisions.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-blue-500 border-blue-200 dark:border-blue-950">Supported</Badge>
                        <Badge variant="outline" className="text-amber-500 border-amber-200 dark:border-amber-950">Partial</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">EU Corporate Sustainability Reporting Directive (CSRD)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        The CSRD aims to bring sustainability reporting on par with financial reporting. 
                        It extends the scope and requirements for sustainability reporting for EU companies.
                      </p>
                      <div className="flex items-center gap-2">
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
    </div>
  );
};

export default ESGReports;
