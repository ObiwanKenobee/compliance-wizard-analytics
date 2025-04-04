
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { UserNav } from "./UserNav";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center gap-2 sm:gap-4 border-b bg-background px-3 sm:px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="md:hidden"
        aria-label="Toggle sidebar menu"
      >
        <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="flex-1" />
      <UserNav />
    </header>
  );
};

export default Header;
