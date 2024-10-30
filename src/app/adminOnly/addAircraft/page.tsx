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
      const res = await fetch("/api/aircraft/add", {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#211f1e] text-white p-6 relative overflow-hidden">
      <h2 className="text-4xl font-bold text-blue-400 mb-8 z-10">Add New Aircraft</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-4xl w-full mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 border border-opacity-30 border-gray-400 ">
        
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-blue-400 font-medium mb-2">Model:</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-blue-400 font-medium mb-2">Capacity:</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add
            </button>
          </form>
          {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
        </div>

        <div className="md:block">
          <img
            src="/addairplane.jpeg"
            alt="Aircraft"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAirport;
