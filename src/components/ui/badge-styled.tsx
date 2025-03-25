
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Define our custom variant types
export type BadgeStyledVariant = "default" | "destructive" | "outline" | "secondary" | "success" | "warning";

// Create a new interface without extending BadgeProps
interface BadgeStyledProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "variant"> {
  variant?: BadgeStyledVariant;
  className?: string;
}

export function BadgeStyled({
  variant = "default",
  className,
  ...props
}: BadgeStyledProps) {
  // Map our custom variants to standard variants + custom classes
  let variantClass = "";
  let baseVariant: "default" | "destructive" | "outline" | "secondary" = "default";
  
  switch (variant) {
    case "success":
      baseVariant = "secondary";
      variantClass = "bg-green-500 text-white hover:bg-green-600";
      break;
    case "warning":
      baseVariant = "outline";
      variantClass = "bg-amber-500 text-white hover:bg-amber-600";
      break;
    default:
      // Only pass through the variants that Badge accepts
      if (variant === "default" || variant === "destructive" || variant === "outline" || variant === "secondary") {
        baseVariant = variant;
      }
  }

  return (
    <Badge
      variant={baseVariant}
      className={cn(variantClass, className)}
      {...props}
    />
  );
}
