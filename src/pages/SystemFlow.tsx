
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, Server, Shield, FileCheck, BarChart3, Building, UserCheck, BadgeCheck, Database, Lock, FileText, Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SystemFlow = () => {
  return (
    <div className="container mx-auto py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Guardian-IO System Flow</h1>
        <p className="text-muted-foreground mt-2">
          End-to-end compliance verification and risk management platform
        </p>
      </div>

      {/* Platform Overview */}
      <Card className="overflow-hidden border-primary/20">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle>Platform Architecture</CardTitle>
          <CardDescription>
            Comprehensive system flow integrating AI risk analysis, blockchain verification, 
            decentralized reputation systems, and capital market integration
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
            {/* Main Flow Diagram */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* AI Risk Analysis */}
              <Card className="border-blue-200 dark:border-blue-900 overflow-hidden h-full flex flex-col">
                <CardHeader className="bg-blue-50 dark:bg-blue-950/50 border-b border-blue-100 dark:border-blue-900 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-1.5">
                      <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">AI-Powered Risk Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mt-0.5">
                        <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Data Collection</p>
                        <p className="text-xs text-muted-foreground">
                          Supplier data, contracts, regulatory filings, and ESG performance are collected
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mt-0.5">
                        <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">AI Analysis</p>
                        <p className="text-xs text-muted-foreground">
                          Machine learning models analyze data to identify compliance risks and patterns
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mt-0.5">
                        <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Risk Flagging</p>
                        <p className="text-xs text-muted-foreground">
                          Potential risks like forced labor, fraud, and non-compliance are identified
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mt-0.5">
                        <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Trust Score Assignment</p>
                        <p className="text-xs text-muted-foreground">
                          Compliance Trust Score calculated based on AI findings
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Stage 1</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Hedera Compliance Ledger */}
              <Card className="border-purple-200 dark:border-purple-900 overflow-hidden h-full flex flex-col">
                <CardHeader className="bg-purple-50 dark:bg-purple-950/50 border-b border-purple-100 dark:border-purple-900 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-1.5">
                      <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-lg">Hedera Compliance Ledger</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-1 mt-0.5">
                        <FileCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Verification</p>
                        <p className="text-xs text-muted-foreground">
                          Compliance reports verified with digital signatures
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-1 mt-0.5">
                        <Server className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Ledger Storage</p>
                        <p className="text-xs text-muted-foreground">
                          Reports stored on Hedera's decentralized ledger with tamper-proof hashing
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-1 mt-0.5">
                        <Database className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Immutable Records</p>
                        <p className="text-xs text-muted-foreground">
                          Permanent, tamper-proof record of supplier compliance
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-1 mt-0.5">
                        <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Audit Trails</p>
                        <p className="text-xs text-muted-foreground">
                          Immutable audit trails for regulatory & investor due diligence
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Badge className="bg-purple-100 hover:bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Stage 2</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Decentralized Supplier Reputation */}
              <Card className="border-green-200 dark:border-green-900 overflow-hidden h-full flex flex-col">
                <CardHeader className="bg-green-50 dark:bg-green-950/50 border-b border-green-100 dark:border-green-900 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-1.5">
                      <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-lg">Decentralized Reputation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mt-0.5">
                        <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Trust Tokens</p>
                        <p className="text-xs text-muted-foreground">
                          Suppliers earn Trust Tokens based on verified compliance records
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mt-0.5">
                        <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Smart Contracts</p>
                        <p className="text-xs text-muted-foreground">
                          Automated contract execution based on supplier Trust Scores
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mt-0.5">
                        <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Ecosystem Flagging</p>
                        <p className="text-xs text-muted-foreground">
                          Non-compliant suppliers automatically flagged across ecosystem
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mt-0.5">
                        <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Network Effect</p>
                        <p className="text-xs text-muted-foreground">
                          Value increases as more participants join the ecosystem
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Badge className="bg-green-100 hover:bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Stage 3</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Capital Market Integration */}
              <Card className="border-amber-200 dark:border-amber-900 overflow-hidden h-full flex flex-col">
                <CardHeader className="bg-amber-50 dark:bg-amber-950/50 border-b border-amber-100 dark:border-amber-900 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-1.5">
                      <Building className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <CardTitle className="text-lg">Capital Market Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-1 mt-0.5">
                        <BarChart3 className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Real-time Verification</p>
                        <p className="text-xs text-muted-foreground">
                          Investors verify ESG compliance in real-time before funding
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-1 mt-0.5">
                        <FileCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Automated Reporting</p>
                        <p className="text-xs text-muted-foreground">
                          Smart contracts automate regulatory ESG reporting
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-1 mt-0.5">
                        <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Penalty Enforcement</p>
                        <p className="text-xs text-muted-foreground">
                          Automated enforcement of penalties for non-compliance
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-1 mt-0.5">
                        <Globe className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Impact Investment</p>
                        <p className="text-xs text-muted-foreground">
                          Verified transparency for ESG & impact investing
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Badge className="bg-amber-100 hover:bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">Stage 4</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Connecting Lines (visible on desktop) */}
            <div className="hidden lg:block">
              <div className="absolute left-[24.5%] top-[50%] w-[2%] h-[1px] bg-muted-foreground/30"></div>
              <div className="absolute left-[49.5%] top-[50%] w-[2%] h-[1px] bg-muted-foreground/30"></div>
              <div className="absolute left-[74.5%] top-[50%] w-[2%] h-[1px] bg-muted-foreground/30"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Flow Section */}
      <Card>
        <CardHeader>
          <CardTitle>End-to-End Data Flow</CardTitle>
          <CardDescription>
            How information moves through the Guardian-IO platform
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border rounded-lg bg-muted/30">
              <div className="bg-primary/10 p-3 rounded-full">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Data Ingestion</h3>
                <p className="text-sm text-muted-foreground">
                  Supplier data, contracts, regulatory filings, news feeds, and ESG performance metrics are 
                  collected from multiple sources and normalized into a standardized format.
                </p>
              </div>
              <Badge>Step 1</Badge>
            </div>
            
            <div className="flex justify-center">
              <div className="h-8 w-px bg-border"></div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border rounded-lg bg-muted/30">
              <div className="bg-primary/10 p-3 rounded-full">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">AI Risk Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Guardian-IO AI analyzes the data to detect patterns, anomalies, and potential risks using natural 
                  language processing, computer vision, and predictive modeling techniques.
                </p>
              </div>
              <Badge>Step 2</Badge>
            </div>
            
            <div className="flex justify-center">
              <div className="h-8 w-px bg-border"></div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border rounded-lg bg-muted/30">
              <div className="bg-primary/10 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Risk Scoring & Report Generation</h3>
                <p className="text-sm text-muted-foreground">
                  The system generates a Compliance Trust Score and detailed risk assessment reports based on AI findings, 
                  with key risk indicators and compliance recommendations.
                </p>
              </div>
              <Badge>Step 3</Badge>
            </div>
            
            <div className="flex justify-center">
              <div className="h-8 w-px bg-border"></div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border rounded-lg bg-muted/30">
              <div className="bg-primary/10 p-3 rounded-full">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Blockchain Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Compliance reports are hashed and recorded on Hedera's distributed ledger, creating an immutable, 
                  timestamped record that cannot be altered, with cryptographic proof of authenticity.
                </p>
              </div>
              <Badge>Step 4</Badge>
            </div>
            
            <div className="flex justify-center">
              <div className="h-8 w-px bg-border"></div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border rounded-lg bg-muted/30">
              <div className="bg-primary/10 p-3 rounded-full">
                <BadgeCheck className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Reputation & Trust Network</h3>
                <p className="text-sm text-muted-foreground">
                  Based on verified compliance records, suppliers earn Trust Tokens in the network, creating a 
                  decentralized reputation system accessible to all participants in the ecosystem.
                </p>
              </div>
              <Badge>Step 5</Badge>
            </div>
            
            <div className="flex justify-center">
              <div className="h-8 w-px bg-border"></div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border rounded-lg bg-muted/30">
              <div className="bg-primary/10 p-3 rounded-full">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Market & Regulatory Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Verified compliance data flows to capital markets, regulators, and investors, enabling real-time 
                  ESG verification, automated reporting, and transparent impact investing decisions.
                </p>
              </div>
              <Badge>Step 6</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>System Integrations</CardTitle>
          <CardDescription>
            Key technical components and integrations of the Guardian-IO platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">AI & Machine Learning</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Natural Language Processing for document analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Computer Vision for image and video verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Predictive Analytics for risk forecasting</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Hedera DLT</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Hedera Consensus Service (HCS) for secure timestamps</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Hedera Token Service (HTS) for Trust Tokens</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Smart Contracts for automated compliance</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileCheck className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">ESG Standards Integration</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Global Reporting Initiative (GRI) standards</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Sustainability Accounting Standards Board (SASB)</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Task Force on Climate-related Financial Disclosures</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Security Framework</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Zero-knowledge proofs for private data verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Multi-layered access control systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Cryptographic verification of document authenticity</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Data Management</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Hybrid on-chain/off-chain data architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>IPFS for distributed storage of large files</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Real-time data processing pipeline</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">API Ecosystem</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>RESTful APIs for platform integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>GraphQL for flexible data queries</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span>Webhook system for real-time notifications</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 border rounded-lg bg-muted/30">
        <div>
          <h2 className="text-2xl font-bold mb-2">Ready to Implement Guardian-IO?</h2>
          <p className="text-muted-foreground">
            Transform your compliance and risk management with blockchain-verified transparency
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="default">Request Demo</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default SystemFlow;
