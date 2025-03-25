
import { ReactNode } from "react";
import {
  AlertDialog as BaseAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  cancelText?: string;
  confirmText?: string;
  isLoading?: boolean;
  variant?: "default" | "destructive" | "warning" | "success";
}

export function AlertDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  icon,
  cancelText = "Cancel",
  confirmText = "Continue",
  isLoading = false,
  variant = "default",
}: AlertDialogProps) {
  const getButtonClass = () => {
    switch (variant) {
      case "destructive":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "warning":
        return "bg-amber-500 text-white hover:bg-amber-600";
      case "success":
        return "bg-green-500 text-white hover:bg-green-600";
      default:
        return "";
    }
  };

  return (
    <BaseAlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {icon && icon}
            {title}
          </AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            disabled={isLoading}
            className={getButtonClass()}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </BaseAlertDialog>
  );
}
