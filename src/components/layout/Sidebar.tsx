import {
  BarChart2,
  AlertCircle,
  FileText,
  Settings,
  Users,
  Activity,
  FlowChart,
  LayoutDashboard,
  HelpCircle,
} from "lucide-react";
import { MainNav } from "@/components/layout/MainNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UserAccountNav } from "@/components/layout/UserAccountNav";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

interface SidebarNavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarNavGroup {
  title: string;
  items: SidebarNavItem[];
}

export function Sidebar() {
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
          icon: <FlowChart className="h-4 w-4" />,
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

  return (
    <div className="flex flex-col space-y-4 py-4">
      <div className="px-3 py-2">
        <MainNav className="mx-auto" />
      </div>
      <ScrollArea className="flex-1 space-y-4">
        <div className="space-y-4">
          {navigation.map((group, index) => (
            <Accordion
              type="single"
              collapsible
              key={index}
              className="w-full"
            >
              <AccordionItem value={group.title}>
                <AccordionTrigger className="px-3 font-medium">{group.title}</AccordionTrigger>
                <AccordionContent className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary hover:text-foreground"
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
      <div className="space-y-2 border-t border-muted px-3 py-2">
        <Separator />
        <ThemeToggle />
      </div>
    </div>
  );
}
