"use client";
import { useEffect, useState } from 'react';

type Ticket = {
  ticket_id: number;
  name: string;
  seat_id: string;
  class: string;
  age: number;
  booking_flight_id: number;
  start_time: string;
  end_time: string;
  aircraft_id: string;
  date: string;
  origin_airport: string;
  destination_airport: string;
};

const FlightSchedule = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/getTicket');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTickets(data.rows); // assuming your API returns { rows: [] }
        console.log("*********",tickets);
      } catch (err) {
        setError('Failed to fetch flight schedule.');
        console.error(err);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Tickets</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Ticket ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Seat ID</th>
            <th className="py-2 px-4 border-b">Class</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Flight ID</th>
            <th className="py-2 px-4 border-b">Start Time</th>
            <th className="py-2 px-4 border-b">End Time</th>
            <th className="py-2 px-4 border-b">Aircraft ID</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Origin Airport</th>
            <th className="py-2 px-4 border-b">Destination Airport</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.ticket_id}>
              <td className="py-2 px-4 border-b">{ticket.ticket_id}</td>
              <td className="py-2 px-4 border-b">{ticket.name}</td>
              <td className="py-2 px-4 border-b">{ticket.seat_id}</td>
              <td className="py-2 px-4 border-b">{ticket.class}</td>
              <td className="py-2 px-4 border-b">{ticket.age}</td>
              <td className="py-2 px-4 border-b">{ticket.booking_flight_id}</td>
              <td className="py-2 px-4 border-b">{ticket.start_time}</td>
              <td className="py-2 px-4 border-b">{ticket.end_time}</td>
              <td className="py-2 px-4 border-b">{ticket.aircraft_id}</td>
              <td className="py-2 px-4 border-b">{ticket.date}</td>
              <td className="py-2 px-4 border-b">{ticket.origin_airport}</td>
              <td className="py-2 px-4 border-b">{ticket.destination_airport}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightSchedule;
