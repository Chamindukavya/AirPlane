"use client";
import { useState } from "react";

const AddAirport = () => {
  const [airport_code, setAirport_code] = useState("");
  const [airport_name, setAirport_name] = useState("");
  const [location_id, setLocation_id] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const airportData = { airport_code, airport_name, location_id };

    try {
      const res = await fetch("/api/addairport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airportData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Airport added successfully");
        setAirport_code("");
        setAirport_name("");
        setLocation_id("");
        
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
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Add Airport</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Airport Code:</label>
            <input
              type="text"
              value={airport_code}
              onChange={(e) => setAirport_code(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Airport Name:</label>
            <input
              type="text"
              value={airport_name}
              onChange={(e) => setAirport_name(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">State:</label>
            <input
              type="text"
              value={location_id}
              onChange={(e) => setLocation_id(e.target.value)}
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

export default AddAirport;

