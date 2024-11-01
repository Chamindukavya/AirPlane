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
import PassengerTable from "./PassengerTable";

export const description = "A donut chart with text";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Under 18",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Above 18",
    color: "hsl(var(--chart-2))",
  },
  other: {
    label: "Available",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export default function PieChartComponent(props: { routeId: number }) {
  const [model, setModel] = useState<string>("");
  const [departureTime, setDepartureTime] = useState<string>("");
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);
  const [under18, setUnder18] = useState<number>(0);
  const [above18, setAbove18] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch graph data based on the selected route
  async function fetchData() {
    try {
      const res = await fetch("/api/getPassengersData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flightSchedule_id: props.routeId }),
      });

      if (!res.ok) {
        console.error(`Error ${res.status}: ${res.statusText}`);
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      if (!data || Object.keys(data).length === 0) {
        throw new Error("No data available");
      }

      const chartData = [
        {
          browser: "Under 18",
          visitors: Number(data.under18),
          fill: "var(--color-chrome)",
        },
        {
          browser: "Above 18",
          visitors: Number(data.above18),
          fill: "var(--color-safari)",
        },
        {
          browser: "Available",
          visitors:
            Number(data.capacity) - Number(data.above18) - Number(data.under18),
          fill: "var(--color-other)",
        },
      ];

      setChartData(chartData);
      setTotalVisitors(data.above18 + data.under18);
    } catch (error) {
      console.error("Fetch error:", (error as Error).message);
      alert("There was a problem fetching data. Please try again later.");
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Upcoming Flight Details</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
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
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <PassengerTable routeId={props.routeId} />
      </CardContent>
    </Card>
  );
}
