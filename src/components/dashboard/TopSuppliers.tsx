
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import RiskBadge from "../ui/RiskBadge";

interface Supplier {
  id: string;
  name: string;
  trustScore: number;
  category: string;
  risk: "low" | "moderate" | "high";
  verified: boolean;
}

interface TopSuppliersProps {
  suppliers: Supplier[];
  className?: string;
}

const TopSuppliers = ({ suppliers, className }: TopSuppliersProps) => {
  return (
    <Card className={cn("overflow-hidden animate-scale-in", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Top Suppliers</CardTitle>
        <CardDescription>Trust scores and risk assessment</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="flex items-center p-4 hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium text-sm">{supplier.name}</h3>
                  {supplier.verified && (
                    <div className="ml-2 bg-primary/10 rounded-full p-0.5 text-primary">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="w-3 h-3"
                      >
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{supplier.category}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {supplier.trustScore}%
                  </span>
                  <RiskBadge level={supplier.risk} />
                </div>
                <div className="w-[100px] h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      supplier.risk === "low" ? "bg-risk-low" : 
                      supplier.risk === "moderate" ? "bg-risk-moderate" : 
                      "bg-risk-high"
                    )}
                    style={{ width: `${supplier.trustScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSuppliers;
