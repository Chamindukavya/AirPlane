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
import DestinationTable from "@/app/components/DestiantionTable";
import { toDate } from "date-fns";
import RouteTable from "@/app/components/RouteTable";
import { set } from "react-hook-form";
import PassengerTable from "@/app/components/PassengerTable";
import BookingTable from "@/app/components/BookingTable";
import BookingPieChart from "@/app/components/BookingPieChart";
import { Card } from "@/components/ui/card";
import PassengerAgeTable from "@/app/components/PassengerAgeTable";
interface Passenger {
  month: string;
  desktop: number;
  mobile: number;
}

export function PassengersPage() {
  const [result, setResult] = useState<Passenger[]>([]);
  const [year, setYear] = useState(2024);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null); // Added state for form input
  const [report, setReport] = useState<number | null>(0);
  const [graph, setGraph] = useState<number>(0);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [originAirport, setOriginAirport] = useState<string>("");
  const [destinationAirport, setDestinationAirport] = useState<string>("");
  useEffect(() => {
    // Fetch initial data on mount
    fetchData();
  }, []);

  // Function to fetch graph data based on the selected route
  async function fetchData(route?: string) {
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
      console.log("route id", routeId);
      setGraph(5);
      setSelectedRoute(routeId);

      // Fetch the graph data based on selectedRoute here
    } else {
      console.log("No route selected.");
    }
  };

  const handleSelect = (selectId: number | null) => {
    setReport(selectId);
    console.log("Selected selectId:", selectId);
    // Fetch the graph data based on selectedRoute here
  };

  const handleDateSelect = (from: string, to: string, graph: number) => {
    setGraph(graph);
    setFromDate(from);
    setToDate(to);
    console.log("Selected date range:", from, to);
    // Fetch the graph data based on the selected date range here
  };

  const handleOriginAirportSelect = (airport: string) => {
    setOriginAirport(airport);
    console.log("Selected origin airport:", airport);
  };
  const handleDestinationAirportSelect = (airport: string) => {
    setDestinationAirport(airport);
    console.log("Selected destination airport:", airport);
  };
  return (
    <div>
      {/* <ResizablePanelGroup
        direction="vertical"
        className="rounded-lg border md:min-w-[450px] w-fit h-full"
      > */}
      {/* <ResizablePanel minSize={100} defaultSize={100}> */}
      <Card className=" items-center space-x-3 p-1 mt-3 ml-3 mr-3 mb-0 ">
        <div className="flex h-full items-center justify-center p-6">
          <div className="w-full h-full">
            <TopNavBar onSelect={handleSelect} />
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">
                {report === 0 && (
                  <p className="text-gray-600 text-sm text-center mt-1 mb-[-9px]">
                    - select a report -
                  </p>
                )}
                {report === 1 && <Form onSubmit={handleFormSubmit} />}
                {report === 2 && (
                  <DateRangePicker onDateSelect={handleDateSelect} />
                )}
                {report === 3 && (
                  <BookingInputs onDateSelect={handleDateSelect} />
                )}
                {report === 4 && (
                  <div>
                    <div>
                      <div className="grid grid-cols-3  mt-1 mb-[-25px]">
                        <div>
                          <span className="mr-4 text-xs">Origin</span>
                          <PlacePicker
                            onAirportSelect={handleOriginAirportSelect}
                          />
                        </div>
                        <div className="">
                          <span className="mr-4 text-xs">Destination</span>
                          <PlacePicker
                            onAirportSelect={handleDestinationAirportSelect}
                          />
                        </div>
                        <Button
                          onClick={() => setGraph(8)}
                          className="w-[100px] ml-6 justify-start text-center font-normal text-xs"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </Card>
      {/* </ResizablePanel> */}
      {/* <ResizableHandle /> */}
      {/* <ResizablePanel minSize={75} defaultSize={75}> */}
      {/* <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={60}> */}
      <div className="grid grid-cols-10 gap-4 p-4">
        <Card className="col-span-6 items-center space-x-3 p-4">
          {graph === 0 && (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-gray-600 text-sm text-center">
                - No graph to display -
              </p>
            </div>
          )}
          {graph === 5 && selectedRoute !== null && (
            <PassengerAgeTable routeId={selectedRoute} />
          )}
          {graph === 6 && (
            <DestinationTable fromDate={fromDate} toDate={toDate} />
          )}
          {graph === 7 && <BookingTable fromDate={fromDate} toDate={toDate} />}
          {graph === 8 && (
            <RouteTable
              originAirport={originAirport}
              destinationAirport={destinationAirport}
            />
          )}
        </Card>

        <Card className="col-span-4 items-center space-x-3 pt-6">
          <div className="h-[400px] items-center justify-center ">
            <span className="font-semibold">
              <div className="text-right mb-[-20px] "></div>
              {(graph === 0 || graph === 6 || graph === 8) && (
                <AreaGraph result={result} year={year} />
              )}
              {graph === 5 && selectedRoute !== null && (
                <PieChart routeId={selectedRoute} />
              )}
              {graph === 7 && (
                <BookingPieChart fromDate={fromDate} toDate={toDate} />
              )}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PassengersPage;
