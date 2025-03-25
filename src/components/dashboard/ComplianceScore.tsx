
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComplianceScoreProps {
  score: number;
  className?: string;
}

const ComplianceScore = ({ score, className }: ComplianceScoreProps) => {
  // Calculate risk level
  const getRiskLevel = (score: number) => {
    if (score >= 90) return "low";
    if (score >= 70) return "moderate";
    return "high";
  };
  
  const getRiskColor = (score: number) => {
    if (score >= 90) return "hsl(var(--risk-low))";
    if (score >= 70) return "hsl(var(--risk-moderate))";
    return "hsl(var(--risk-high))";
  };

  const riskLevel = getRiskLevel(score);
  const riskColor = getRiskColor(score);
  
  // Data for pie chart
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score }
  ];
  
  const riskText = {
    low: "Low Risk",
    moderate: "Moderate Risk",
    high: "High Risk"
  };

  return (
    <Card className={cn("animate-scale-in overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Global Compliance Score</CardTitle>
        <CardDescription>
          Your supply chain compliance rating
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <div className="h-[150px] w-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={0}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    <Cell key="score" fill={riskColor} />
                    <Cell key="remaining" fill="hsl(var(--secondary))" />
                  </Pie>
                  <Tooltip contentStyle={{ 
                    borderRadius: "0.5rem", 
                    background: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{score}%</span>
              <span className={cn(
                "text-xs font-medium mt-1 px-2 py-0.5 rounded-full",
                riskLevel === "low" ? "bg-risk-low/15 text-risk-low" : 
                riskLevel === "moderate" ? "bg-risk-moderate/15 text-risk-moderate" : 
                "bg-risk-high/15 text-risk-high"
              )}>
                {riskText[riskLevel]}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-risk-low"></span>
                <span className="text-sm font-medium">ESG Compliance</span>
              </div>
              <div className="h-2 w-[160px] bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-risk-low rounded-full" 
                  style={{ width: `${92}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">92% - Above Industry Average</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-risk-moderate"></span>
                <span className="text-sm font-medium">Supplier Verification</span>
              </div>
              <div className="h-2 w-[160px] bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-risk-moderate rounded-full" 
                  style={{ width: `${78}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">78% - Needs Improvement</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-sm font-medium">Blockchain Verification</span>
              </div>
              <div className="h-2 w-[160px] bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${95}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">95% - Industry Leading</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceScore;
