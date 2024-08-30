"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FlightSchedule = {
  flight_id: number;
  flightSchedule_id: number;
  start_time: string;
  end_time: string;
  aircraft_id: number;
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

  // Function to handle booking, it will navigate to /booking
  const handleBooking = (schedule: FlightSchedule) => {
    console.log("Booking for schedule", schedule);
    router.push(`/booking/${schedule.flight_id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {schedules.map((schedule, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Flight</h3>
          <p>
            <strong>Flight ID:</strong> {schedule.flight_id}
          </p>
          <p>
            <strong>Flight Schedule ID:</strong> {schedule.flightSchedule_id}
          </p>
          <p>
            <strong>Start Time:</strong> {schedule.start_time}
          </p>
          <p>
            <strong>End Time:</strong>{schedule.end_time}
          </p>
          <p>
            <strong>Air Craft:</strong>{schedule.aircraft_id}
          </p>
          <button
            onClick={() => handleBooking(schedule)}
            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          >
            Book
          </button>
        </div>
      ))}
    </div>
  );
}
