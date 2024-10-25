'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AirportSearch: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [airports, setAirports] = useState<Airport[]>([]);
  const [origin, setOrigin] = useState<string>(''); 
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState<string>(''); 
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFlightViewOpen, setIsFlightViewOpen] = useState<boolean>(false);

 

  // Fetching the list of airports
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch('/api/airports');
        if (!response.ok) throw new Error('Failed to fetch airports');
        const data: Airport[] = await response.json();
        setAirports(data);
      } catch (error) {
        console.error('Error fetching airports:', error);
      }
    };
    fetchAirports();
  }, []);

  // Search for flights between selected origin, destination, and date
  const handleSearch = async () => {
    if (!origin || !destination || !date) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/flights?origin=${origin}&destination=${destination}&date=${date}`);
      if (!response.ok) throw new Error('Failed to fetch flights');
      const data: Flight[] = await response.json();
      
      setFlights(data);
      setIsFlightViewOpen(true); 
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Booking function that navigates to the booking page for the selected flight
  const book = (flight_id: string) => {
    if (status === 'unauthenticated') {
          router.push('/api/auth/signin'); // Redirect to NextAuth sign-in page
       }
    router.push(`/booking/${flight_id}`);
  };

  // Render the search form and flight results
  return (
    <div className="p-10 bg-gray-50 rounded-xl shadow-2xl max-w-5xl mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Search a Flight</h1>

      {/* Search form */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <select
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full sm:w-1/3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Origin Airport</option>
          {airports.map((airport) => (
            <option key={airport.airport_code} value={airport.airport_code}>
              {airport.airport_name}
            </option>
          ))}
        </select>

        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full sm:w-1/3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Destination Airport</option>
          {airports.map((airport) => (
            <option key={airport.airport_code} value={airport.airport_code}>
              {airport.airport_name}
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
          disabled={!origin || !destination || !date || isLoading}
          className={`w-full sm:w-1/6 p-3 text-lg text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${
            (!origin || !destination || !date || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Display flights */}
      {isFlightViewOpen && flights.length > 0 && (
        <div className="mt-10 relative">
          <button onClick={() => setIsFlightViewOpen(false)} className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700 font-bold">
            Close
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Flights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flights.map((schedule, index) => (
              <div key={index} className="p-6 border rounded-xl shadow-lg bg-white">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Flight Information</h3>
                <p><strong>Flight ID:</strong> {schedule.flight_id}</p>
                <p><strong>Start Time:</strong> {schedule.start_time}</p>
                <p><strong>End Time:</strong> {schedule.end_time}</p>
                <p><strong>Price Economy:</strong> {schedule.price_economy}</p>
                <p><strong>Price Business:</strong> {schedule.price_business}</p>

                <p><strong>Price Platinum:</strong> {schedule.price_platinum}</p>
                <button
                  onClick={() => book(schedule.flight_id)} // Pass flight_id to the book function
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Book Flight
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AirportSearch;
