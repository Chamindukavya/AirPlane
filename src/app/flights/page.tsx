"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../components/ui/card"; // Import from ShadCN UI
import { Button } from "../../components/ui/button"; // Import from ShadCN UI

type FlightSchedule = {
  flight_id: number;
  flightSchedule_id: number;
  date: string;
  origin_airport: string;
  destination_airport: string;
  price_economy: number;
  price_business: number;
  start_time: string;
  end_time: string;
  aircraft_id: number;
};

export default function FlightSchedulePage() {
  const [schedules, setSchedules] = useState<FlightSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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
    return (
      <div className="flex items-center justify-center h-screen">Loading...</div>
    );
  }

  // Function to handle booking
  const handleBooking = (schedule: FlightSchedule) => {
    console.log("Booking for schedule", schedule);
    router.push(`/booking/${schedule.flight_id}`);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white via-blue-200 to-blue-400"
    >
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* Header section */}
        <div className="text-center text-white mb-8">
          <h1 className="text-5xl font-bold text-cyan-950">
            Available Flight Schedules
          </h1>
          <p className="text-xl mt-2">
            Choose your preferred flight and book now!
          </p>
        </div>

        {/* Cards section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {schedules.map((schedule, index) => (
            <Card
              key={index}
              className="p-6 rounded-lg shadow-lg bg-white" // Solid white background for the card
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Flight Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Flight ID:</span>
                    <span className="text-gray-800">{schedule.flight_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Schedule ID:
                    </span>
                    <span className="text-gray-800">
                      {schedule.flightSchedule_id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Date:</span>
                    <span className="text-gray-800">{schedule.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Origin:</span>
                    <span className="text-gray-800">
                      {schedule.origin_airport}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Destination:
                    </span>
                    <span className="text-gray-800">
                      {schedule.destination_airport}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Economy Price:
                    </span>
                    <span className="text-gray-800">
                      ${schedule.price_economy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Business Price:
                    </span>
                    <span className="text-gray-800">
                      ${schedule.price_business}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Start Time:
                    </span>
                    <span className="text-gray-800">{schedule.start_time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">End Time:</span>
                    <span className="text-gray-800">{schedule.end_time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Aircraft ID:
                    </span>
                    <span className="text-gray-800">
                      {schedule.aircraft_id}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleBooking(schedule)}
                className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-400"
              >
                Book Now
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
