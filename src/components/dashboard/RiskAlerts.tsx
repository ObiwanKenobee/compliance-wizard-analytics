
import { AlertTriangle, ArrowRight, ShieldAlert } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: "high" | "moderate" | "low";
}

interface RiskAlertsProps {
  alerts: Alert[];
  className?: string;
}

const RiskAlerts = ({ alerts, className }: RiskAlertsProps) => {
  // Sort alerts by severity (high first)
  const sortedAlerts = [...alerts].sort((a, b) => {
    const severityOrder = { high: 0, moderate: 1, low: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  return (
    <Card className={cn("overflow-hidden animate-scale-in", className)}>
      <CardHeader className="flex flex-row items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-destructive animate-pulse-subtle" />
        <div>
          <CardTitle>Risk Alerts</CardTitle>
          <CardDescription>Immediate action required</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {sortedAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "flex items-start py-3 px-6 border-l-2 hover:bg-muted/50 transition-colors",
                alert.severity === "high" ? "border-l-destructive" :
                alert.severity === "moderate" ? "border-l-warning" :
                "border-l-success"
              )}
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  {alert.severity === "high" && (
                    <span className="bg-destructive/10 text-destructive text-xs px-2 py-0.5 rounded-full font-medium">
                      High Risk
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground/70">{alert.timestamp}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 p-3">
        <Button variant="ghost" size="sm" className="w-full justify-center text-xs">
          View All Alerts
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RiskAlerts;
