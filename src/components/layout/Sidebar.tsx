
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Shield, 
  Users, 
  Globe, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronLeft 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../ui/Logo";

interface SidebarProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { icon: BarChart3, label: "Dashboard", path: "/" },
    { icon: Shield, label: "Risk Analysis", path: "/risk-analysis" },
    { icon: Users, label: "Suppliers", path: "/suppliers" },
    { icon: Globe, label: "ESG Reports", path: "/esg-reports" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  // If open prop is provided, use it; otherwise use internal state
  const isOpen = open !== undefined ? open : !collapsed;
  
  const toggleSidebar = () => {
    if (setOpen) {
      setOpen(!isOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar transition-all duration-300 z-10 fixed lg:relative",
        isOpen ? "w-[250px]" : "w-[70px]"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          <div className={cn("flex items-center", !isOpen && "justify-center w-full")}>
            <Logo className={cn(!isOpen ? "w-8 h-8" : "w-8 h-8 mr-2")} />
            {isOpen && <span className="text-sidebar-foreground font-semibold">TrustChain</span>}
          </div>
          <button 
            onClick={toggleSidebar}
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground p-1 rounded-full hover:bg-sidebar-accent transition-colors"
          >
            {!isOpen ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "sidebar-link",
                    location.pathname === item.path && "active",
                    !isOpen && "justify-center px-0"
                  )}
                >
                  <item.icon size={20} />
                  {isOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border mt-auto">
          <button 
            className={cn(
              "sidebar-link",
              !isOpen && "justify-center px-0"
            )}
          >
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
