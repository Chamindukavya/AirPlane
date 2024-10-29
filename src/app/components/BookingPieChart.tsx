"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import { useEffect, useState } from "react";

export const description = "A donut chart with text";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export default function Component({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [nextFlight, setNextFlight] = useState<string>("");
  const [activeMonth, setActiveMonth] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (chartData.length > 0 && !activeMonth) {
      setActiveMonth(chartData[0].month); // Set active month once data is available
    }
  }, [chartData, activeMonth]); // Run this effect when passengerCount or activeMonth changes

  useEffect(() => {
    console.log("inside the pirchart");
    fetchData();
  }, [fromDate, toDate]); // Dependencies array

  // Function to fetch graph data based on the selected route
  async function fetchData() {
    try {
      const res = await fetch("/api/getBookingCounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromDate: fromDate, toDate: toDate }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      if (!data || data.length === 0) {
        throw new Error("No data available");
      }
      const chartData = [
        {
          browser: "frequent passengers ",
          visitors:
            Number(
              data.PassengerCounts[0] && data.PassengerCounts[0].frequent_count
            ) || 0,
          fill: "var(--color-chrome)",
        },
        {
          browser: "gold passengers ",
          visitors:
            Number(
              data.PassengerCounts[0] && data.PassengerCounts[0].gold_count
            ) || 0,
          fill: "var(--color-safari)",
        },
      ];
      // console.log("pasenge count", chartData);
      setChartData(chartData);
      // setNextFlight(data.nextFlight.flight_id);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
  const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Bookings - Passenger type</CardTitle>
        <CardDescription>Bookings' Passenger type Composition</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Passengers
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
