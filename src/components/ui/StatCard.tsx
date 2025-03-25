
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  className?: string;
  animation?: boolean;
  style?: React.CSSProperties;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  className,
  animation = true,
  style
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className, animation && "animate-scale-in")} style={style}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={cn(
            "mt-1 text-xs flex items-center",
            trend.positive ? "text-success" : "text-destructive"
          )}>
            <span className={cn(
              "flex items-center mr-1",
              trend.positive ? "inline-block" : "inline-block rotate-180"
            )}>
              ▲
            </span>
            {trend.value}% {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
