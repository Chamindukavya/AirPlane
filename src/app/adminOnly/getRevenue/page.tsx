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
import { useState, useEffect } from "react";
import CardComponent from "@/app/components/RevenueCard";
import MobileNav from "@/components/ui/mobile-nav";

interface AircraftRevenue {
  month: string;
  desktop: number;
}

const chartConfig = {
  desktop: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
};

export function RevenuePage() {
  const [revenue, setRevenue] = useState<AircraftRevenue[]>([]);
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
        // Check if any value type is string instead of number

        console.log(data.aircraftRevenue);
        setRevenue(data.aircraftRevenue);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalRevenue = revenue
    .reduce((sum, item) => sum + Number(item.desktop), 0)
    .toFixed(2);

  if (!loading) {
    return (
      <div className="flex flex-col p-6 space-y-8">
        <h1 className="text-white font-sans font-black text-4xl text-left mt-[-20px]">
          Aircarfts Revenue
        </h1>
        <Card className="flex flex-col  items-center md:flex-row w-full max-w-6xl space-y-6 md:space-y-0 md:space-x-6 p-4">
          <MobileNav />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full  max-w-6xl">
            {revenue.slice(0, cardPrefernce.length).map((record, index) => (
              <CardComponent
                key={index}
                title={record.month}
                value={`$ ${record.desktop}`}
                gradient={cardPrefernce[index]?.gradient || "bg-gray-500"}
                textColor="text-white"
                imageSrc={cardPrefernce[index]?.img || "/images/default.png"}
              />
            ))}
          </div>
        </Card>
        <Card className="flex flex-col md:flex-row w-full max-w-6xl space-y-6 md:space-y-0 md:space-x-6 p-4">
          <div className="flex-1">
            <Table>
              <TableCaption>A list of each aircraft revenue</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Aircraft Model</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenue.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {record.month}
                    </TableCell>
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
          </div>

          <div className="flex-1 flex flex-col items-center">
            <CardHeader className="text-center">
              <CardTitle>Aircraft Model - Revenue</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <BarChart
                width={400}
                height={300}
                data={revenue}
                margin={{ top: 20 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">Loading...</div>
  );
}

export default RevenuePage;
