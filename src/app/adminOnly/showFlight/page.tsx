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
  price_platinum: string;
  state: string;
};

export default function FlightSchedulePage() {
  const [schedules, setSchedules] = useState<FlightSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<{ [key: number]: string }>({});
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

  const handleStatusChange = (flightId: number, value: string) => {
    setStatus((prev) => ({ ...prev, [flightId]: value }));
  };

  const submitStatus = async (flightId: number) => {
    try {
      const response = await fetch("/api/flight/updateFlightState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flight_id: flightId, status: status[flightId] }),
      });
      const data = await response.json();
      console.log("Status updated:", data);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

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
      setSchedules(
        schedules.filter((item) => item.flight_id !== schedule.flight_id)
      );
      console.log(data);
    } catch (err) {
      console.error("Failed to delete flight", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#211f1e] py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-10">
        Flight Schedules
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {schedules.map((schedule) => (
          <div
            key={schedule.flight_id}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 border border-opacity-30 border-gray-400"
          >
            <h3 className="text-xl font-semibold text-center text-blue-300 mb-4">
              Flight Information
            </h3>
            <div className="space-y-2 text-gray-200">
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">Flight ID:</span>{" "}
                <span>{schedule.flight_id}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">Origin:</span>{" "}
                <span>{schedule.origin_airport}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">Destination:</span>{" "}
                <span>{schedule.destination_airport}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">Date:</span>{" "}
                <span>{schedule.date}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">
                  Economy Price:
                </span>{" "}
                <span>${schedule.price_economy}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">
                  Business Price:
                </span>{" "}
                <span>${schedule.price_business}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">
                  Platinum Price:
                </span>{" "}
                <span>${schedule.price_platinum}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">Start Time:</span>{" "}
                <span>{schedule.start_time}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">End Time:</span>{" "}
                <span>{schedule.end_time}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">Aircraft ID:</span>{" "}
                <span>{schedule.aircraft_id}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">State:</span>{" "}
                <span>{schedule.state}</span>
              </p>
            </div>
            {/* <button
              onClick={() => deleteFlight(schedule)}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Delete
            </button> */}
            <div className="mt-4">
              <select
                value={status[schedule.flight_id] || ""}
                onChange={(e) =>
                  handleStatusChange(schedule.flight_id, e.target.value)
                }
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
              >
                <option value="">Select Status</option>
                <option value="ontime">Ontime</option>
                <option value="delay">Delay</option>
              </select>
              <button
                onClick={() => submitStatus(schedule.flight_id)}
                className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
