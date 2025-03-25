
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, Line } from "recharts";
import { BarChart3, LineChart as LineChartIcon, PieChart } from "lucide-react";

interface DataVisualizerProps {
  title: string;
  description?: string;
  data: any[];
  className?: string;
}

const DataVisualizer = ({ title, description, data, className }: DataVisualizerProps) => {
  const [chartType, setChartType] = useState<"bar" | "line" | "area">("bar");
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <Tabs defaultValue="bar" onValueChange={(value) => setChartType(value as "bar" | "line" | "area")}>
          <TabsList className="grid w-full grid-cols-3 h-8">
            <TabsTrigger value="bar" className="text-xs flex items-center gap-1">
              <BarChart3 className="h-3 w-3" /> Bar
            </TabsTrigger>
            <TabsTrigger value="line" className="text-xs flex items-center gap-1">
              <LineChartIcon className="h-3 w-3" /> Line
            </TabsTrigger>
            <TabsTrigger value="area" className="text-xs flex items-center gap-1">
              <PieChart className="h-3 w-3" /> Area
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : chartType === "line" ? (
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            ) : (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Area type="monotone" dataKey="value" fill="var(--primary)" fillOpacity={0.2} stroke="var(--primary)" strokeWidth={2} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataVisualizer;
