
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="w-full h-full rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
        <div className="absolute inset-0.5 rounded-[3px] bg-sidebar/95 flex items-center justify-center">
          <div className="w-3/5 h-3/5 grid grid-cols-3 grid-rows-3 gap-0.5">
            <div className="bg-blue-500 rounded-sm animate-pulse-subtle"></div>
            <div className="bg-blue-600 rounded-sm animate-pulse-subtle" style={{ animationDelay: "150ms" }}></div>
            <div className="bg-blue-400 rounded-sm animate-pulse-subtle" style={{ animationDelay: "300ms" }}></div>
            <div className="bg-blue-400 rounded-sm animate-pulse-subtle" style={{ animationDelay: "450ms" }}></div>
            <div className="bg-blue-300 rounded-sm animate-pulse-subtle" style={{ animationDelay: "600ms" }}></div>
            <div className="bg-blue-500 rounded-sm animate-pulse-subtle" style={{ animationDelay: "750ms" }}></div>
            <div className="bg-blue-600 rounded-sm animate-pulse-subtle" style={{ animationDelay: "900ms" }}></div>
            <div className="bg-blue-500 rounded-sm animate-pulse-subtle" style={{ animationDelay: "1050ms" }}></div>
            <div className="bg-blue-400 rounded-sm animate-pulse-subtle" style={{ animationDelay: "1200ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
