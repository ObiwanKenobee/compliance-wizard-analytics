
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: "low" | "moderate" | "high";
  className?: string;
}

const RiskBadge = ({ level, className }: RiskBadgeProps) => {
  const baseClass = "risk-badge";
  
  const levelClasses = {
    low: "risk-low",
    moderate: "risk-moderate",
    high: "risk-high"
  };

  const levelText = {
    low: "Low Risk",
    moderate: "Moderate Risk",
    high: "High Risk"
  };

  return (
    <span className={cn(baseClass, levelClasses[level], className)}>
      {levelText[level]}
    </span>
  );
};

export default RiskBadge;
