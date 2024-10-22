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

import { Sidebar, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import MobileNav from "@/components/ui/mobile-nav";

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

  const cardPrefernce = [
    {
      img: "/images/boeing.png",
      gradient: "bg-gradient-to-r from-purple-600 to-indigo-500",
    },
    {
      img: "/images/airbus380.png",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      img: "/images/boeing737.png",
      gradient: "bg-gradient-to-br from-pink-500 to-orange-400",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getAircraftRevenue");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRevenue(data.aircraftRevenue);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Calculate the total revenue
  const totalRevenue = revenue.reduce((sum, item) => sum + item.desktop, 0);

  if (!loading) {
    return (
      <div>
        <MobileNav />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
          {revenue.map((record, index) => (
            <CardComponent
              key={index}
              title={record.month}
              value={`$ ${record.desktop}`}
              gradient={cardPrefernce[index].gradient}
              textColor="text-white"
              imageSrc={cardPrefernce[index].img}
            />
          ))}
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
                  <TableCell className="text-right">
                    ${record.desktop}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell className="text-right">${totalRevenue}</TableCell>
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

  return <div>Loading...</div>;
}

export default RevenuePage;
