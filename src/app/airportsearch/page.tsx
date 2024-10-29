"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Airport = {
  airport_code: string;
  airport_name: string;
};

type Flight = {
  flight_id: number;
  flight_schedule_id: number;
  aircraft_id: number;
  start_time: string;
  end_time: string;
};

const AirportSearch: React.FC = () => {
  const [date, setDate] = useState<string>(''); 
  const [airports, setAirports] = useState<Airport[]>([]);
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFlightViewOpen, setIsFlightViewOpen] = useState<boolean>(false);
  const router = useRouter();

  // Fetching the list of airports
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch("/api/airports");
        if (!response.ok) throw new Error("Failed to fetch airports");
        const data: Airport[] = await response.json();
        setAirports(data);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };

    fetchAirports();
  }, []);

  // Search for flights between selected origin and destination
  const handleSearch = async () => {
    if (!origin || !destination) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/flights?origin=${origin}&destination=${destination}&date=${date}`
      );
      if (!response.ok) throw new Error("Failed to fetch flights");
      const data: Flight[] = await response.json();
      setFlights(data);
      setIsFlightViewOpen(true);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to booking page for a specific flight
  const handleBooking = (schedule: Flight) => {
    router.push(`/booking/${schedule.flight_id}`);
  };

  // Close the flight view
  const handleCloseFlightView = () => {
    setIsFlightViewOpen(false);
    setFlights([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black flex items-center justify-center">
      <div className="p-10 bg-gray-800 bg-opacity-70 rounded-xl shadow-2xl max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Search a Flight
        </h1>

        {/* Search form */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full sm:w-1/3 p-3 text-lg border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Origin Airport</option>
            {airports.map((airport) => (
              <option key={airport.airport_code} value={airport.airport_code}>
                {airport.airport_name} ({airport.airport_code})
              </option>
            ))}
          </select>

          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full sm:w-1/3 p-3 text-lg border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Destination Airport</option>
            {airports.map((airport) => (
              <option key={airport.airport_code} value={airport.airport_code}>
                {airport.airport_name} ({airport.airport_code})
              </option>
            ))}
          </select>

          <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full sm:w-1/3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

          <button
            onClick={handleSearch}
            disabled={!origin || !destination || isLoading}
            className={`w-full sm:w-1/6 p-3 text-lg text-white bg-[#008CFF] rounded-lg hover:bg-[#007ACC] focus:outline-none focus:ring-2 focus:ring-[#007ACC] ${
              !origin || !destination || isLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Display flights */}
        {isFlightViewOpen && (
          <div className="mt-10 relative">
            <button
              onClick={handleCloseFlightView}
              className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700 font-bold"
            >
              Close
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">
              Available Flights
            </h2>

            {flights.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {flights.map((schedule) => (
                  <div
                    key={schedule.flight_id}
                    className="p-6 border border-gray-700 rounded-xl shadow-lg bg-gray-900 bg-opacity-80 transition-transform transform hover:scale-105"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Flight Information
                    </h3>
                    <p className="text-gray-300">
                      <strong>Flight ID:</strong> {schedule.flight_id}
                    </p>
                    <p className="text-gray-300">
                      <strong>Schedule ID:</strong> {schedule.flight_schedule_id}
                    </p>
                    <p className="text-gray-300">
                      <strong>Start Time:</strong> {schedule.start_time}
                    </p>
                    <p className="text-gray-300">
                      <strong>End Time:</strong> {schedule.end_time}
                    </p>
                    <p className="text-gray-300">
                      <strong>Aircraft:</strong> {schedule.aircraft_id}
                    </p>
                    <button
                      onClick={() => handleBooking(schedule)}
                      className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book Flight
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              !isLoading &&
              origin &&
              destination && (
                <p className="text-red-400 mt-6 text-center">
                  No flights found for the selected route.
                </p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AirportSearch;