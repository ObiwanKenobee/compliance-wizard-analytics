
import { FileStack, Lock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlockchainVerificationProps {
  className?: string;
}

const BlockchainVerification = ({ className }: BlockchainVerificationProps) => {
  const verificationStats = [
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      value: 258,
      label: "verified transactions",
    },
    {
      icon: <FileStack className="h-4 w-4" />,
      value: 42,
      label: "compliance reports",
    },
    {
      icon: <Lock className="h-4 w-4" />,
      value: "0.2s",
      label: "avg. verification time",
    },
  ];

  return (
    <Card className={cn("overflow-hidden animate-scale-in", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Blockchain Verification</CardTitle>
        <CardDescription>Hedera ledger trust verification</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            {verificationStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div>
                  <div className="font-semibold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative w-[120px] h-[120px] flex items-center justify-center">
            <div className="absolute inset-0 animate-pulse-subtle">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--primary)/0.1)" strokeWidth="12" />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="12" 
                  strokeDasharray="339.29"
                  strokeDashoffset="33.93" 
                  transform="rotate(-90 60 60)" 
                />
              </svg>
            </div>
            <div className="z-10 glass-card p-4 w-14 h-14 rounded-full flex flex-col items-center justify-center">
              <div className="font-mono text-xs font-bold text-primary">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <line x1="3" x2="21" y1="9" y2="9"/>
                  <path d="m9 16 3-3 3 3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 p-3">
        <Button variant="outline" size="sm" className="w-full justify-center text-xs">
          View Audit Logs
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlockchainVerification;
