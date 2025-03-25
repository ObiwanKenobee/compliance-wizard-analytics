
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RiskBadge from "../ui/RiskBadge";

interface Region {
  id: string;
  name: string;
  suppliers: number;
  risk: "low" | "moderate" | "high";
  coordinates: { x: number; y: number };
}

interface SupplierMapProps {
  className?: string;
}

const SupplierMap = ({ className }: SupplierMapProps) => {
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  
  const regions: Region[] = [
    { 
      id: "na", 
      name: "North America", 
      suppliers: 27, 
      risk: "low",
      coordinates: { x: 22, y: 35 } 
    },
    { 
      id: "eu", 
      name: "Europe", 
      suppliers: 18, 
      risk: "low",
      coordinates: { x: 48, y: 28 } 
    },
    { 
      id: "asia", 
      name: "Asia", 
      suppliers: 42, 
      risk: "moderate",
      coordinates: { x: 70, y: 38 } 
    },
    { 
      id: "sa", 
      name: "South America", 
      suppliers: 12, 
      risk: "moderate",
      coordinates: { x: 30, y: 65 } 
    },
    { 
      id: "seasia", 
      name: "Southeast Asia", 
      suppliers: 23, 
      risk: "high",
      coordinates: { x: 78, y: 50 } 
    },
  ];

  return (
    <Card className={cn("overflow-hidden animate-scale-in", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Global Supplier Risk Map</CardTitle>
      </CardHeader>
      <CardContent className="relative p-0">
        <div className="aspect-[16/9] bg-muted/50 relative overflow-hidden">
          {/* World map outline - simplified for demo */}
          <div className="absolute inset-0 p-4">
            <div className="w-full h-full rounded-lg bg-muted/50 overflow-hidden">
              <div className="w-full h-full opacity-20 bg-blue-gradient"></div>
            </div>
          </div>
          
          {/* Risk points */}
          {regions.map((region) => (
            <div 
              key={region.id}
              className={cn(
                "absolute w-3 h-3 rounded-full cursor-pointer animate-pulse-subtle transition-all duration-300",
                region.risk === "low" ? "bg-risk-low" : 
                region.risk === "moderate" ? "bg-risk-moderate" : 
                "bg-risk-high",
                activeRegion?.id === region.id && "w-4 h-4 animate-glow"
              )}
              style={{ 
                left: `${region.coordinates.x}%`, 
                top: `${region.coordinates.y}%`,
                transform: "translate(-50%, -50%)",
                boxShadow: activeRegion?.id === region.id ? 
                  `0 0 8px ${region.risk === "low" ? "rgba(21, 128, 61, 0.5)" : 
                  region.risk === "moderate" ? "rgba(234, 179, 8, 0.5)" : 
                  "rgba(239, 68, 68, 0.5)"}` : "none"
              }}
              onClick={() => setActiveRegion(region)}
            ></div>
          ))}
          
          {/* Info tooltip */}
          {activeRegion && (
            <div 
              className="absolute glass-card p-3 w-[200px] text-xs animate-fade-in z-10"
              style={{ 
                left: `${activeRegion.coordinates.x}%`, 
                top: `${activeRegion.coordinates.y - 12}%`,
                transform: "translate(-50%, -100%)"
              }}
            >
              <div className="flex items-start justify-between">
                <h4 className="font-medium">{activeRegion.name}</h4>
                <RiskBadge level={activeRegion.risk} />
              </div>
              <p className="mt-1 text-muted-foreground">
                {activeRegion.suppliers} suppliers in region
              </p>
              <p className="mt-1">
                {activeRegion.risk === "high" ? 
                  "AI predicts 15% increase in ESG violations" : 
                  activeRegion.risk === "moderate" ? 
                  "Supplier verification needed" : 
                  "All suppliers verified"}
              </p>
              <div className="absolute left-1/2 bottom-0 transform translate-y-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-card dark:bg-card/80"></div>
            </div>
          )}
        </div>
        
        <div className="p-3 flex justify-between items-center border-t">
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-risk-low mr-1.5"></div>
              <span>Low Risk</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-risk-moderate mr-1.5"></div>
              <span>Moderate</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-risk-high mr-1.5"></div>
              <span>High Risk</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-7">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierMap;
