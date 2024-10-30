import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

const PassengerTable = ({ routeId }: { routeId: number }) => {
  const [model, setModel] = useState<string>("");
  const [departureTime, setDepartureTime] = useState<string>("");
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);
  const [under18, setUnder18] = useState<number>(0);
  const [above18, setAbove18] = useState<number>(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/getPassengersData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ flightSchedule_id: routeId }),
        });
        const data = await res.json();
        console.log("data:", data);
        setModel(data.aircraft || "");
        setDepartureTime(data.start_time || "");
        setArrivalTime(data.end_time || "");
        setCapacity(data.capacity || 0);
        setUnder18(data.under18 || 0);
        setAbove18(data.above18 || 0);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
    console.log(routeId);
  }, [routeId]);

  return (
    <div>
      <Table className="columns-2">
        {/* <TableHeader>
          <TableRow>
            <TableHead className="w-min">Upcoming Flight</TableHead>
          </TableRow>
        </TableHeader> */}
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Aircraft model</TableCell>
            <TableCell className="text-right">{model}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Departure time</TableCell>
            <TableCell className="text-right">{departureTime}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Arrival time</TableCell>
            <TableCell className="text-right">{arrivalTime}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Capacity</TableCell>
            <TableCell className="text-right">{capacity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              No. of under 18 passengers
            </TableCell>
            <TableCell className="text-right">{under18 || 0}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              No. of above 18 passengers
            </TableCell>
            <TableCell className="text-right">{above18 || 0}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PassengerTable;
