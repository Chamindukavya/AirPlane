"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useEffect, useState } from "react";
import Form from "@/app/components/Form";
import AreaGraph from "@/app/components/AreaGraph";
import PieChart from "@/app/components/PieChart";
import TopNavBar from "@/app/components/Menubar";
import DateRangePicker from "@/app/components/DateRangePicker";
import PlacePicker from "@/app/components/PlacePicker";
import BookingInputs from "@/app/components/BookingInputs";
import { Button } from "@/components/ui/button";
import DataTable from "@/app/components/DataTable";
interface Passenger {
  month: string;
  desktop: number;
  mobile: number;
}

export default function Component() {
  const [result, setResult] = useState<Passenger[]>([]);
  const [year, setYear] = useState(2024);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null); // Added state for form input
  const [report, setReport] = useState<number | null>(0);
  useEffect(() => {
    // Fetch initial data on mount
    fetchDataA();
  }, []);

  // Function to fetch graph data based on the selected route
  async function fetchDataA(route?: string) {
    try {
      const response = await fetch(
        `/api/getMonthPassenger${route ? `?route=${route}` : ""}`
      );
      const data = await response.json();

      console.log("response:", response);
      console.log("data:", data);
      setResult(data.passenger);
      setYear(data.year);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  // Callback function when form is submitted
  const handleFormSubmit = (routeId: number | null) => {
    if (routeId) {
      setSelectedRoute(routeId);
      console.log("Selected route ID:", routeId);
      // Fetch the graph data based on selectedRoute here
    } else {
      console.log("No route selected.");
    }
    // setSelectedRoute(routeId); // Store selected route from the form
    // fetchDataA(route); // Fetch new data based on the route
  };

  const handleSelect = (selectId: number | null) => {
    setReport(selectId);
    console.log("Selected selectId:", selectId);
    // Fetch the graph data based on selectedRoute here
  };
  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border md:min-w-[450px] w-fit h-full"
      >
        <ResizablePanel defaultSize={500}>
          <div className="flex h-full items-center justify-center p-6">
            <div className="w-full h-full">
              <DataTable />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={400}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <TopNavBar onSelect={handleSelect} />
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">
                  {report === 1 && <Form onSubmit={handleFormSubmit} />}
                  {report === 2 && <DateRangePicker />}
                  {report === 3 && <BookingInputs />}
                  {report === 4 && (
                    <div>
                      <div>
                        <div className="grid grid-cols-2  mt-[-110px]">
                          <div>
                            <span className="mr-4 text-xs">Origin</span>
                            <PlacePicker />
                          </div>
                          <div className="">
                            <span className="mr-4 text-xs">Destination</span>
                            <PlacePicker />
                          </div>
                        </div>
                      </div>
                      <div className="items-center ">
                        <Button className="w-[100px] mt-3 justify-start text-center font-normal text-xs">
                          Submit
                        </Button>
                      </div>
                    </div>
                  )}
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={85}>
              <div className="h-[900px] items-center justify-center p-3 pr-7">
                <span className="font-semibold">
                  <div className="text-right mb-[-20px]"></div>
                  {selectedRoute === null ? (
                    <AreaGraph result={result} year={year} />
                  ) : (
                    <PieChart routeId={selectedRoute} />
                  )}
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
