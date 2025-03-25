
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

const Sidebar = () => {
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

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar transition-all duration-300 z-10 fixed lg:relative",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
            <Logo className={cn(collapsed ? "w-8 h-8" : "w-8 h-8 mr-2")} />
            {!collapsed && <span className="text-sidebar-foreground font-semibold">TrustChain</span>}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground p-1 rounded-full hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
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
                    collapsed && "justify-center px-0"
                  )}
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border mt-auto">
          <button 
            className={cn(
              "sidebar-link",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
