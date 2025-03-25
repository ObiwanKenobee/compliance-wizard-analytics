
import { Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("py-3 px-6 border-b bg-background/50 backdrop-blur-md sticky top-0 z-10", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-semibold tracking-tight animate-fade-in">Hedera TrustChain</h1>
          <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "50ms" }}>
            Supply Chain Compliance Dashboard
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative max-w-sm hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-background w-[250px] focus-visible:ring-primary"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              3
            </span>
          </Button>
          
          <Avatar className="h-9 w-9 cursor-pointer border-2 border-primary/10 transition-all hover:border-primary/30">
            <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
