"use client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  const { scheduleid } = useParams();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/api/auth/signin?callbackUrl=/ClientMember";
    }
  });

  const [noTicket, setNoTicket] = useState(1); // Default to 1 ticket
  const [passengers, setPassengers] = useState([{ dob: '', age: '', name: '', seatId: '', passportNum: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNoTicket(value);

    const updatedPassengers = Array(value).fill({}).map((_, i) => (
      passengers[i] || { dob: '', age: '', name: '', seatId: '', passportNum: '' }
    ));
    setPassengers(updatedPassengers);
  };

  const handlePassengerChange = (index: number, field: string, value: string) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api/addbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flight_id: scheduleid,
          user_id: session?.user?.id,
          no_tickets: noTicket,
          passengerDetails: passengers,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message || "Booking successful!");
        //router.push('/showTicket');
      } else {
        const error = await response.json();
        setResponseMessage(error.error || "Something went wrong.");
      }
      
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!scheduleid) {
    return <div className="flex justify-center items-center h-screen">No Schedule ID provided.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Booking Page</h1>
        <p className="text-lg mb-4 text-gray-700">flight ID: <span className="font-semibold">{scheduleid}</span></p>
        <p className="text-lg mb-4 text-gray-700">
          Your name: <span className="font-semibold">{session?.user?.name || "Guest"}</span> <br />
          Your id: <span className="font-semibold">{session?.user?.id || "N/A"}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="no_tickets" className="block text-sm font-medium text-gray-700">Number of Tickets</label>
            <input
              type="number"
              id="no_tickets"
              min="1"
              value={noTicket}
              onChange={handleTicketChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {passengers.map((passenger, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Passenger {index + 1}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  value={passenger.dob}
                  onChange={(e) => handlePassengerChange(index, 'dob', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Seat ID</label>
                <input
                  type="text"
                  value={passenger.seatId}
                  onChange={(e) => handlePassengerChange(index, 'seatId', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Passport Number</label>
                <input
                  type="text"
                  value={passenger.passportNum}
                  onChange={(e) => handlePassengerChange(index, 'passportNum', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Submitting..." : "Book Tickets"}
          </button>
        </form>

        {responseMessage && <p className="mt-4 text-center text-lg text-gray-900">{responseMessage}</p>}
      </div>
    </div>
  );
}
