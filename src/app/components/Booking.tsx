"use client"; // This is a client-side component

import { useEffect, useState } from "react";

type Ticket = {
  name: string;
  date: string;
  start_time: string;
  aircraft_id: string;
};

type FlightSchedule1Props = {
  setTicketDetails: (tickets: Ticket[]) => void; // Prop type for setTicketDetails function
};

const FlightSchedule1 = ({ setTicketDetails }: FlightSchedule1Props) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/getTicket");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("test  booking   ", data);
        // Extract necessary ticket details
        const simplifiedTickets = data.rows.map((ticket: any) => ({
          name: ticket.name,
          date: ticket.date,
          start_time: ticket.start_time,
          aircraft_id: ticket.aircraft_id,
          origin_airport:ticket.origin_airport,
          destination_airport:ticket.destination_airport,
          ticket_id:ticket.ticket_id,


        }));
        setTickets(simplifiedTickets);
        setTicketDetails(simplifiedTickets); // Pass the data up to the parent component
      } catch (err) {
        setError("Failed to fetch flight schedule.");
        console.error(err);
      }
    };

    fetchTickets();
  }, [setTicketDetails]);
};

export default FlightSchedule1;
