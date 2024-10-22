"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FlightSchedule = {
  flightSchedule_id: number;
  date: string;
  origin_airport: string;
  destination_airport: string;
  
};

export default function FlightSchedulePage() {
  const [schedules, setSchedules] = useState<FlightSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/flightSchedule/show");
        const data: FlightSchedule[] = await response.json();
        setSchedules(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to handle booking, it will navigate to /booking
  const handleBooking = (schedule: FlightSchedule) => {
    router.push(`/adminOnly/addFlight/${schedule.flightSchedule_id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {schedules.map((schedule, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Flight</h3>
          
         
          <p>
            <strong>Date:</strong> {schedule.date}
          </p>
          <p>
            <strong>Origin Air Port:</strong>{schedule.origin_airport}
          </p>
          <p>
            <strong>Destnation Air Port:</strong>{schedule.destination_airport}
          </p>
          <button
            onClick={() => handleBooking(schedule)}
            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          >
            Add Flight
          </button>
        </div>
      ))}
    </div>
  );
}
