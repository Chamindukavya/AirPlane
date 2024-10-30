"use client";

import { useEffect, useState } from "react";

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

const TicketComponent = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("/api/getTicket");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTickets(data.rows); // Assuming the API returns { rows: [] }
        console.log("*********", data.rows);
      } catch (err) {
        setError("Failed to fetch tickets.");
        console.error(err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Tickets</h1>
      {tickets.length === 0 ? (
        <div>No tickets available.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.ticket_id}
              className="border border-gray-200 shadow-lg p-6 rounded-lg bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">
                Ticket #{ticket.ticket_id}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Name:</p>
                  <p>{ticket.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Seat ID:</p>
                  <p>{ticket.seat_id}</p>
                </div>
                <div>
                  <p className="font-semibold">Class:</p>
                  <p>{ticket.class}</p>
                </div>
                <div>
                  <p className="font-semibold">Age:</p>
                  <p>{ticket.age}</p>
                </div>
                <div>
                  <p className="font-semibold">Flight ID:</p>
                  <p>{ticket.booking_flight_id}</p>
                </div>
                <div>
                  <p className="font-semibold">Start Time:</p>
                  <p>{ticket.start_time}</p>
                </div>
                <div>
                  <p className="font-semibold">End Time:</p>
                  <p>{ticket.end_time}</p>
                </div>
                <div>
                  <p className="font-semibold">Aircraft ID:</p>
                  <p>{ticket.aircraft_id}</p>
                </div>
                <div>
                  <p className="font-semibold">Date:</p>
                  <p>{ticket.date}</p>
                </div>
                <div>
                  <p className="font-semibold">Origin Airport:</p>
                  <p>{ticket.origin_airport}</p>
                </div>
                <div>
                  <p className="font-semibold">Destination Airport:</p>
                  <p>{ticket.destination_airport}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketComponent;
