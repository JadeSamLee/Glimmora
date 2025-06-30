'use client';

import React from 'react';
import { Bar, BarChart, Pie, PieChart, Cell, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { deliveriesData } from '@/lib/data';
import { Users, Truck } from 'lucide-react';

const deliveryStatusConfig = {
  Delivered: { label: 'Delivered', color: 'hsl(var(--chart-1))' },
  'In-Transit': { label: 'In-Transit', color: 'hsl(var(--chart-2))' },
  Delayed: { label: 'Delayed', color: 'hsl(var(--chart-3))' },
  Queued: { label: 'Queued', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig;

const populationConfig = {
  population: {
    label: 'Population',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const populationData = [
  { name: 'Puzhal Lake', population: 9500 },
  { name: 'Naravarikuppam', population: 7200 },
  { name: 'Manjampakkam', population: 3500 },
  { name: 'Retteri', population: 4800 },
];

const DashboardGraphs = () => {
  const deliveryStatusData = React.useMemo(() => {
    const statuses = deliveriesData.reduce((acc, delivery) => {
      acc[delivery.status] = (acc[delivery.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statuses).map(([status, count]) => ({
      status,
      count,
      fill: deliveryStatusConfig[status as keyof typeof deliveryStatusConfig]?.color,
    }));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5 text-primary" />
            Affected Population by Camp
          </CardTitle>
          <CardDescription>Estimated population in major refugee camps and settlements.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={populationConfig} className="h-64 w-full">
            <BarChart data={populationData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                width={100}
                stroke="hsl(var(--muted-foreground))"
              />
              <ChartTooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
              <Bar dataKey="population" fill="var(--color-population)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Truck className="h-5 w-5 text-primary" />
            Aid Delivery Status
          </CardTitle>
          <CardDescription>A summary of all current and past aid deliveries.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer config={deliveryStatusConfig} className="h-64 w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="status" hideLabel />} />
              <Pie
                data={deliveryStatusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
              >
                {deliveryStatusData.map((entry) => (
                  <Cell key={`cell-${entry.status}`} fill={entry.fill} className="stroke-background" />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-mt-4"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardGraphs;
