
import React from "react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeStyledProps extends BadgeProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "success" | "warning";
}

export function BadgeStyled({
  variant = "default",
  className,
  ...props
}: BadgeStyledProps) {
  // Map our custom variants to standard variants + custom classes
  let variantClass = "";
  let baseVariant: BadgeProps["variant"] = "default";
  
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
      baseVariant = variant as BadgeProps["variant"];
  }

  return (
    <Badge
      variant={baseVariant}
      className={cn(variantClass, className)}
      {...props}
    />
  );
}
