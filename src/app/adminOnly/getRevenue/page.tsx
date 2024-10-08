"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";
import CardComponent from "@/app/components/RevenueCard";

export const description = "A bar chart with a label";

interface aircraftRevenue {
  month: string;
  desktop: number;
}

const chartConfig = {
  desktop: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RevenuePage() {
  const [revenue, setRevenue] = useState<aircraftRevenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getAircraftRevenue");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRevenue(data.aircraftRevenue || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (revenue.length === 0) {
    return <div>No revenue data available.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
        {/* Card with purple gradient */}
        {revenue[0] && (
          <CardComponent
            title={revenue[0].month}
            value={`$ ${revenue[0].desktop}`}
            gradient="bg-gradient-to-r from-purple-600 to-indigo-500"
            textColor="text-white"
            imageSrc="/images/boeing.png"
          />
        )}

        {/* Card with blue gradient */}
        {revenue[1] && (
          <CardComponent
            title={revenue[1].month}
            value={`$ ${revenue[1].desktop}`}
            gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
            textColor="text-white"
            imageSrc="/images/airbus380.png"
          />
        )}

        {/* New card with vibrant colors (Pink to Orange) */}
        {revenue[2] && (
          <CardComponent
            title={revenue[2].month}
            value={`$ ${revenue[2].desktop}`}
            gradient="bg-gradient-to-br from-pink-500 to-orange-400"
            textColor="text-white"
            imageSrc="/images/boeing737.png"
          />
        )}
      </div>

      <Card className="grid grid-cols-2">
        <Table>
          <TableCaption>A list of each aircraft revenue</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-auto">Aircraft Model</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenue.map((record) => (
              <TableRow key={record.month}>
                <TableCell className="font-medium">{record.month}</TableCell>
                <TableCell className="text-right">{record.desktop}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}>Total</TableCell>
              <TableCell className="text-right">
                ${" "}
                {revenue.reduce((total, record) => total + record.desktop, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div>
          <CardHeader className="mx-10">
            <CardTitle>Aircraft model - Revenue</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] max-h-40 w-50 mx-10"
            >
              <BarChart
                accessibilityLayer
                data={revenue}
                margin={{ top: 20 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 10)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={11}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default RevenuePage;
