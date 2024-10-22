"use client"
import { useState } from "react";

interface PassengerData {
  nextFlight: { flight_id: number };
  under18: number;
  over18: number;
}

const PassengerInfoPage = () => {
  const [flightScheduleId, setFlightScheduleId] = useState<string>("");
  const [passengerData, setPassengerData] = useState<PassengerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPassengerData = async () => {
    setLoading(true);
    setError(null);
    setPassengerData(null);
    
    try {
      const response = await fetch("/api/getPassengersData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flightSchedule_id: flightScheduleId }),
      });
      const data = await response.json();

      if (response.ok) {
        setPassengerData(data);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Flight and Passenger Information</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Flight Schedule ID
        </label>
        <input
          type="text"
          value={flightScheduleId}
          onChange={(e) => setFlightScheduleId(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={fetchPassengerData}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Passenger Info"}
      </button>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {passengerData && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Next Flight ID: {passengerData.nextFlight.flight_id}</h2>
          <div className="mt-4">
            <p className="text-lg">Passengers under 18: {passengerData.under18}</p>
            <p className="text-lg">Passengers over 18: {passengerData.over18}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerInfoPage;
