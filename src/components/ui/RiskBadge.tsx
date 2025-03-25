
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: "low" | "moderate" | "high";
  className?: string;
}

const RiskBadge = ({ level, className }: RiskBadgeProps) => {
  const baseClass = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  
  const levelClasses = {
    low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    moderate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
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
