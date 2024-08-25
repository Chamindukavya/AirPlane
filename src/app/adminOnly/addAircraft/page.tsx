"use client";
import { useState } from "react";

const AddAirport = () => {
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const airportData = { model, capacity };

    try {
      const res = await fetch("/api/aircraft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airportData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Aircraft added successfully");
        setModel("");
        setCapacity("");
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
        <h2 className="text-2xl font-bold mb-4 text-center">Add Aircraft</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Model:</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Capacity:</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
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
