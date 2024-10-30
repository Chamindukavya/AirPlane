"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

const AddFlight = () => {
  const { scheduleid } = useParams();
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [aircraft_id, setAircraft_id] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const airportData = {
      flightSchedule_id: scheduleid,
      start_time,
      end_time,
      aircraft_id,
    };

    try {
      const res = await fetch("/api/flight/addFlight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airportData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Flight added successfully");
        setStart_time("");
        setEnd_time("");
        setAircraft_id("");
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#211f1e] p-4">
      <div className=" text-black w-full max-w-2xl bg-white bg-opacity-70 p-8 rounded-xl shadow-xl backdrop-blur-lg transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
          Add New Flight
        </h2>
        <h3 className="text-center text-lg text-gray-800 mb-6">
          Schedule ID:{" "}
          <span className="text-blue-600 font-semibold">{scheduleid}</span>
        </h3>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Start Time:
            </label>
            <input
              type="time"
              value={start_time}
              onChange={(e) => setStart_time(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              End Time:
            </label>
            <input
              type="time"
              value={end_time}
              onChange={(e) => setEnd_time(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Aircraft ID:
            </label>
            <input
              type="number"
              value={aircraft_id}
              onChange={(e) => setAircraft_id(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add Flight
            </button>
          </div>
        </form>
        {message && <p className="mt-6 text-center text-gray-800">{message}</p>}
      </div>
    </div>
  );
};

export default AddFlight;
