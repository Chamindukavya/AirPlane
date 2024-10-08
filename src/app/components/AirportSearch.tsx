'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  const [airports, setAirports] = useState<Airport[]>([]);
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch('/api/airports');
        const data: Airport[] = await response.json();
        console.log('Fetched airports:', data); // Debug: Log fetched airports
        setAirports(data);
      } catch (error) {
        console.error('Error fetching airports:', error);
      }
    };

    fetchAirports();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/flights?origin=${origin}&destination=${destination}`);
      const data: Flight[] = await response.json();
      console.log('Fetched flights:', data); // Debug: Log fetched flights
      if (data.length === 0) {
        console.log('No flights found for the selected route.');
      }
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = (schedule: Flight) => {
    console.log('Booking for schedule', schedule); // Debug: Log booking schedule
    router.push(`/booking/${schedule.flight_id}`);
  };
  
  
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
          <option value="">Select Origin Airport</option>
          {airports.map((airport) => (
            <option key={airport.airport_code} value={airport.airport_code}>
              {airport.airport_name} ({airport.airport_code})
            </option>
          ))}
        </select>

        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">Select Destination Airport</option>
          {airports.map((airport) => (
            <option key={airport.airport_code} value={airport.airport_code}>
              {airport.airport_name} ({airport.airport_code})
            </option>
          ))}
        </select>

        <button onClick={handleSearch} disabled={!origin || !destination || isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {flights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flights.map((schedule, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Flight</h3>
                <p>
                  <strong>Flight ID:</strong> {schedule.flight_id}
                </p>
                <p>
                  <strong>Flight Schedule ID:</strong> {schedule.flight_schedule_id}
                </p>
                <p>
                  <strong>Start Time:</strong> {schedule.start_time}
                </p>
                <p>
                  <strong>End Time:</strong> {schedule.end_time}
                </p>
                <p>
                  <strong>Air Craft:</strong> {schedule.aircraft_id}
                </p>
                <button
                  onClick={() => handleBooking(schedule)}
                  className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && origin && destination && <p>No flights found for the selected route.</p>
        )}
      </div>
    </div>
  );
};

export default AirportSearch;