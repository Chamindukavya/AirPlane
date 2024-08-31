'use client';
import React, { useState, useEffect } from 'react';

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

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const response = await fetch('/api/airports');
                const data: Airport[] = await response.json();
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
            console.log('data received');
            const data: Flight[] = await response.json();
            setFlights(data);
        } catch (error) {
            console.error('Error fetching flights:', error);
        } finally {
            setIsLoading(false);
        }
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
                    <table>
                        <thead>
                            <tr>
                                <th>Airline</th>
                                <th>Departure Time</th>
                                <th>Arrival Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight) => (
                                <tr key={flight.flight_id}>
                                    <td>{flight.aircraft_id}</td>
                                    <td>{flight.start_time}</td>
                                    <td>{flight.end_time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !isLoading && origin && destination && <p>No flights found for the selected route.</p>
                )}
            </div>
        </div>
    );
};

export default AirportSearch;
