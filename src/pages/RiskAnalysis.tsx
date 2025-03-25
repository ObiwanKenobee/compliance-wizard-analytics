
import { 
  Shield, AlertTriangle, AlertOctagon, ArrowRight, BarChart3, Download,
  Gauge, ChevronRight, Clock, DollarSign, FileText 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import RiskBadge from "@/components/ui/RiskBadge";

const RiskAnalysis = () => {
  const riskCategories = [
    {
      name: "Environmental",
      score: 78,
      level: "moderate",
      alerts: 4,
      trend: "+1.2%",
      positive: false
    },
    {
      name: "Social",
      score: 92,
      level: "low",
      alerts: 1,
      trend: "+3.8%",
      positive: true
    },
    {
      name: "Governance",
      score: 65,
      level: "high",
      alerts: 7,
      trend: "-2.3%",
      positive: false
    },
    {
      name: "Financial",
      score: 82,
      level: "moderate",
      alerts: 3,
      trend: "+0.5%",
      positive: true
    }
  ];

  const regulationIssues = [
    {
      id: 1,
      title: "Carbon Emission Reporting",
      description: "Three suppliers missing required carbon emission data",
      risk: "high",
      dueDate: "2023-10-15",
      impact: "Regulatory non-compliance penalties"
    },
    {
      id: 2,
      title: "Labor Practices Audit",
      description: "Supplier in Southeast Asia requires verification of labor standards",
      risk: "moderate",
      dueDate: "2023-11-02",
      impact: "Potential media exposure risk"
    },
    {
      id: 3,
      title: "Anti-Corruption Policy",
      description: "New supplier requires anti-corruption policy verification",
      risk: "low",
      dueDate: "2023-12-10",
      impact: "Minor documentation gap"
    },
  ];

  return (
    <div className="container pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered risk assessment and prediction for your supply chain
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export Report
          </Button>
          <Button className="gap-2">
            <Shield size={16} />
            Run New Analysis
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {riskCategories.map((category, index) => (
          <Card key={category.name} className="hover-scale">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <RiskBadge level={category.level as "low" | "moderate" | "high"} className="py-0.5 px-2 text-xs" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">{category.score}</p>
                  <p className="text-sm text-muted-foreground">Risk Score</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${category.positive ? "text-green-500" : "text-red-500"}`}>
                    {category.trend}
                  </p>
                  <p className="text-sm text-muted-foreground">vs Last Month</p>
                </div>
              </div>
              
              <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    category.level === "low" ? "bg-green-500" : 
                    category.level === "moderate" ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${category.score}%` }}
                ></div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="w-full flex justify-between items-center text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <AlertTriangle size={14} />
                  {category.alerts} {category.alerts === 1 ? 'Alert' : 'Alerts'}
                </span>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  Details <ChevronRight size={14} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="issues">
            <AlertOctagon className="mr-2 h-4 w-4" /> Compliance Issues
          </TabsTrigger>
          <TabsTrigger value="predictions">
            <BarChart3 className="mr-2 h-4 w-4" /> AI Predictions
          </TabsTrigger>
          <TabsTrigger value="blockchain">
            <Gauge className="mr-2 h-4 w-4" /> Blockchain Verification
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Active Compliance Issues</CardTitle>
                  <CardDescription>Issues requiring attention or mitigation</CardDescription>
                </div>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulationIssues.map((issue) => (
                  <div 
                    key={issue.id} 
                    className="p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <RiskBadge 
                          level={issue.risk as "low" | "moderate" | "high"} 
                          className="py-0.5 px-2 text-xs"
                        />
                        <h3 className="font-medium">{issue.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={14} />
                        <span>Due {new Date(issue.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign size={14} />
                        <span>Impact: {issue.impact}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Resolve <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">Showing 3 of 12 issues</p>
              <Button variant="outline" size="sm">View All Issues</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>AI Risk Predictions</CardTitle>
              <CardDescription>Machine learning predictions for future compliance risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Predicted 15% Increase in ESG Violations in Southeast Asia</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        AI analysis indicates increased environmental compliance risks with suppliers in Malaysia and Vietnam 
                        over the next quarter.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="secondary">View Affected Suppliers</Button>
                        <Button size="sm">Mitigation Plan</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full">
                      <AlertOctagon className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Supplier XYZ's Trust Score Predicted to Drop by 20%</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on recent audit patterns and regional compliance issues, AI predicts a significant 
                        trust score reduction for this key supplier.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="secondary">Request Immediate Audit</Button>
                        <Button size="sm">Review Alternative Suppliers</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">ESG Score Projected to Drop 12% Without Intervention</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        AI projects a decline in overall ESG rating unless sustainable sourcing targets are met this quarter.
                        Recommended actions provided in report.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="secondary">View Detailed Report</Button>
                        <Button size="sm">Sustainability Action Plan</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Trust Verification</CardTitle>
              <CardDescription>Hedera ledger verification of compliance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Immutable Audit Trail</h3>
                    <Button variant="outline" size="sm">Verify on Hedera</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 mb-3">
                    All compliance data is permanently recorded on Hedera's distributed ledger, 
                    providing tamper-proof verification of supplier compliance history.
                  </p>
                  <div className="text-xs font-mono bg-muted p-2 rounded overflow-x-auto">
                    0.0.1234567 • VERIFIED • Last update: 23 min ago • 128 records • 42 suppliers
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <h3 className="font-medium mb-2">Documentation Verified</h3>
                    <p className="text-3xl font-bold mb-1">98%</p>
                    <p className="text-sm text-muted-foreground">
                      of supplier documents verified on blockchain
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <h3 className="font-medium mb-2">Smart Contracts</h3>
                    <p className="text-3xl font-bold mb-1">47</p>
                    <p className="text-sm text-muted-foreground">
                      automated compliance smart contracts
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <h3 className="font-medium mb-2">Trust Tokens</h3>
                    <p className="text-3xl font-bold mb-1">12,450</p>
                    <p className="text-sm text-muted-foreground">
                      tokens earned by compliant suppliers
                    </p>
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

export default RiskAnalysis;
