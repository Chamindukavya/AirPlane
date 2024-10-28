"use client";
import { useState } from "react";

const AddAirport = () => {
  const [airport_code, setAirport_code] = useState("");
  const [airport_name, setAirport_name] = useState("");
  const [location_id, setLocation_id] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
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
        setIsSuccess(true);
        setAirport_code("");
        setAirport_name("");
        setLocation_id("");
      } else {
        setMessage(`Error: ${result.error}`);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#211f1e] p-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Add New Airport</h2>

        <div className="grid grid-cols-1 items-center max-w-4xl w-full mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 border border-opacity-30 border-gray-400">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 gap-6">
              <div className="mb-4">
                <label className="block text-blue-300 font-medium mb-2">Airport Code:</label>
                <input
                  type="text"
                  value={airport_code}
                  onChange={(e) => setAirport_code(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-300 font-medium mb-2">Airport Name:</label>
                <input
                  type="text"
                  value={airport_name}
                  onChange={(e) => setAirport_name(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-300 font-medium mb-2">Location ID:</label>
                <input
                  type="text"
                  value={location_id}
                  onChange={(e) => setLocation_id(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add
              </button>
            </div>
            </div>
            
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAirport;
