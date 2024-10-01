"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const AddFlight = () => {
  const { scheduleid } = useParams(); // Get the scheduleid from the URL
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [aircraft_id, setAircraft_id] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const airportData = { flightSchedule_id: scheduleid, start_time, end_time, aircraft_id };


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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Add Flight</h2>
        <h3>Schedule ID: {scheduleid}</h3> {/* Display the scheduleid */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Start time:</label>
            <input
              type="time"
              value={start_time}
              onChange={(e) => setStart_time(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">End time</label>
            <input
              type="time"
              value={end_time}
              onChange={(e) => setEnd_time(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Aircraft ID:</label>
            <input
              type="number"
              value={aircraft_id}
              onChange={(e) => setAircraft_id(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
          
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default AddFlight;
