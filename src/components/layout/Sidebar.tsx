
import {
  BarChart2,
  AlertCircle,
  FileText,
  Settings,
  Users,
  Activity,
  LayoutDashboard,
  GitBranch,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

interface SidebarNavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarNavGroup {
  title: string;
  items: SidebarNavItem[];
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const isMobile = useIsMobile();
  
  const navigation: SidebarNavGroup[] = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/",
          icon: <BarChart2 className="h-4 w-4" />,
        },
        {
          title: "Risk Analysis",
          href: "/risk-analysis",
          icon: <Activity className="h-4 w-4" />,
        },
        {
          title: "Suppliers",
          href: "/suppliers",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "ESG Reports",
          href: "/esg-reports",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "Alerts",
          href: "/alerts",
          icon: <AlertCircle className="h-4 w-4" />,
        },
        {
          title: "System Flow",
          href: "/system-flow",
          icon: <GitBranch className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",
          href: "/settings",
          icon: <Settings className="h-4 w-4" />,
        },
      ],
    },
  ];

  // Close sidebar when clicking on a link on mobile
  const handleLinkClick = () => {
    if (isMobile && setOpen) {
      setOpen(false);
    }
  };

  return (
    <div className={`flex flex-col h-full space-y-4 py-4 ${open === false ? "hidden" : ""} md:block bg-sidebar`}>
      <div className="px-3 py-2">
        <h2 className="text-lg font-semibold tracking-tight text-sidebar-foreground">Guardian-IO</h2>
      </div>
      <ScrollArea className="flex-1 space-y-4">
        <div className="space-y-4">
          {navigation.map((group, index) => (
            <Accordion
              type="single"
              collapsible
              key={index}
              className="w-full"
              defaultValue={group.title}
            >
              <AccordionItem value={group.title} className="border-none">
                <AccordionTrigger className="px-3 font-medium text-sidebar-foreground">{group.title}</AccordionTrigger>
                <AccordionContent className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={handleLinkClick}
                      className="sidebar-link"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </ScrollArea>
      <div className="space-y-2 border-t border-sidebar-border px-3 py-2">
        <Separator className="bg-sidebar-border" />
        <ModeToggle />
      </div>
    </div>
  );
};
