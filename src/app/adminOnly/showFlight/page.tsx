"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FlightSchedule = {
  flight_id: number;
  
  date: string;
  origin_airport: string;
  destination_airport: string;
  price_economy: number;
  price_business: number;
  start_time: string;
  end_time: string;
  aircraft_id: number;
  price_platinum: string
};

export default function FlightSchedulePage() {
  const [schedules, setSchedules] = useState<FlightSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/flight/show");
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

  const deleteFlight = async (schedule: FlightSchedule) => {

    try {
      const response = await fetch("/api/flight/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flight_id: schedule.flight_id }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error("Failed to delete flight", err);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {schedules.map((schedule, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Flight</h3>
          
          <p>
            <strong>Origin Airport:</strong> {schedule.origin_airport}
          </p>
          <p>
            <strong>Destination Airport:</strong> {schedule.destination_airport}
          </p>
          <p>
            <strong>Date:</strong> {schedule.date}
          </p>
          
          <p>
            <strong>Price (Economy):</strong> ${schedule.price_economy}
          </p>
          <p>
            <strong>Price (Business):</strong> ${schedule.price_business}
          </p>
          <p>
            <strong>Price (Platinum):</strong> ${schedule.price_platinum}
          </p>
          <p>
            <strong>Start Time:</strong> {schedule.start_time}
          </p>
          <p>
            <strong>End Time:</strong> {schedule.end_time}
          </p>
          <p>
            <strong>Aircraft ID:</strong> {schedule.aircraft_id}
          </p>
       
          <button
            onClick={() => deleteFlight(schedule)}
            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          >
            delete
          </button>
          
        </div>
      ))}
    </div>
  );
}
