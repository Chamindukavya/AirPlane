"use client";
import { useState } from "react";

const AddFlightSchedule = () => {
  const [date, setDate] = useState("");
  const [origin_airport, setOrigin_airport] = useState("");
  const [destination_airport, setDestination_airport] = useState("");
  const [price_economy, setPrice_economy] = useState("");
  const [price_business, setPrice_business] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const airportData = { date, origin_airport, destination_airport, price_economy, price_business };

    try {
      const res = await fetch("/api/flightSchedule/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airportData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Schedule added successfully");
        setDate("");
        setOrigin_airport("");
        setDestination_airport("");
        setPrice_economy("");
        setPrice_business("");
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#211f1e] p-4">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Add Flight Schedule</h2>
        <div className="bg-white bg-opacity-70 p-8 rounded-xl shadow-xl backdrop-blur-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-medium mb-2">Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Origin Airport Code:</label>
              <input
                type="text"
                value={origin_airport}
                onChange={(e) => setOrigin_airport(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Destination Airport Code:</label>
              <input
                type="text"
                value={destination_airport}
                onChange={(e) => setDestination_airport(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Economy Price:</label>
              <input
                type="number"
                value={price_economy}
                onChange={(e) => setPrice_economy(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Business Price:</label>
              <input
                type="number"
                value={price_business}
                onChange={(e) => setPrice_business(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Schedule
              </button>
            </div>
          </form>
          {message && <p className="mt-6 text-center text-gray-800">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddFlightSchedule;
