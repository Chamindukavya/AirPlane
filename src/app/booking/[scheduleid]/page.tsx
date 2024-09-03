"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function BookingPage() {
  const { scheduleid } = useParams();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/api/auth/signin?callbackUrl=/ClientMember";
    }
  });

  const [seatNumber, setSeatNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

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
          seat_number: seatNumber,
          scheduleid,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message || "Booking successful!");
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
        <p className="text-lg mb-4 text-gray-700">Booking for Schedule ID: <span className="font-semibold">{scheduleid}</span></p>
        <p className="text-lg mb-4 text-gray-700">
          Your name: <span className="font-semibold">{session?.user?.name || "Guest"}</span> <br />
          Your id: <span className="font-semibold">{session?.user?.id || "N/A"}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="seatNumber" className="block text-sm font-medium text-gray-600">Seat Number:</label>
            <input
              id="seatNumber"
              type="text"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Submitting..." : "Submit Booking"}
          </button>
        </form>

        {responseMessage && <p className="mt-4 text-center text-lg text-gray-900">{responseMessage}</p>}
      </div>
    </div>
  );
}
