"use client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "../../components/Modal"; // Adjust the path as necessary
import SeatSelection from "./SeatSelection"; // Adjust the path as necessary

export default function BookingPage() {
  const router = useRouter();
  const { scheduleid } = useParams();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/api/auth/signin?callbackUrl=/ClientMember";
    },
  });

  const [noTicket, setNoTicket] = useState(1);
  const [passengers, setPassengers] = useState([
    { dob: "", age: "", name: "", seatId: "", passportNum: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [aircraftCapacity, setAircraftCapacity] = useState(0);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [seatClasses, setSeatClasses] = useState<string[]>([]);

  // New state for seat class selection and modal visibility
  const [selectedSeatClass, setSelectedSeatClass] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAircraftCapacityAndBookedSeats = async () => {
      try {
        const [capacityResponse, bookedSeatsResponse, seatClassResponse] =
          await Promise.all([
            fetch(`/api/capacity?scheduleid=${scheduleid}`),
            fetch(`/api/bookedseats?scheduleid=${scheduleid}`),
            fetch(`/api/seatclasses?scheduleid=${scheduleid}`),
          ]);

        if (
          capacityResponse.ok &&
          bookedSeatsResponse.ok &&
          seatClassResponse.ok
        ) {
          const capacityData = await capacityResponse.json();
          const bookedSeatsData = await bookedSeatsResponse.json();
          const seatClassData = await seatClassResponse.json();
          setAircraftCapacity(capacityData.capacity);
          setBookedSeats(bookedSeatsData);
          setSeatClasses(seatClassData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (scheduleid) {
      fetchAircraftCapacityAndBookedSeats();
    }
  }, [scheduleid]);

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNoTicket(value);

    const updatedPassengers = Array(value)
      .fill({})
      .map((_, i) =>
        passengers[i] || { dob: "", age: "", name: "", seatId: "", passportNum: "" }
      );
    setPassengers(updatedPassengers);
  };

  const handlePassengerChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const handleSeatSelection = (seatId: number) => {
    // SeatSelection component manages seat selection and updates passengers
    // No action needed here unless additional logic is required
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
      } else {
        const errorResult = await response.json();
        setResponseMessage(errorResult.message || "Failed to book flight.");
      }
      router.push("/profile");

      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!scheduleid) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        No Schedule ID provided.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-900 to-gray-900">
      <div className="w-full max-w-lg bg-gray-800 bg-opacity-75 shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-white">Booking Page</h1>
        <p className="text-lg mb-4 text-gray-300">
          Flight ID: <span className="font-semibold">{scheduleid}</span>
        </p>
        <p className="text-lg mb-4 text-gray-300">
          Your name:{" "}
          <span className="font-semibold">{session?.user?.name || "Guest"}</span>{" "}
          <br />
          Your ID:{" "}
          <span className="font-semibold">{session?.user?.id || "N/A"}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Number of Tickets */}
          <div>
            <label
              htmlFor="no_tickets"
              className="block text-sm font-medium text-gray-300"
            >
              Number of Tickets
            </label>
            <input
              type="number"
              id="no_tickets"
              min="1"
              value={noTicket}
              onChange={handleTicketChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
              required
            />
          </div>

          {/* Seat Class Selector */}
          <div>
            <label
              htmlFor="seatClass"
              className="block text-sm font-medium text-gray-300"
            >
              Seat Class
            </label>
            <select
              id="seatClass"
              value={selectedSeatClass}
              onChange={(e) => {
                setSelectedSeatClass(e.target.value);
                // Reset seat selections when seat class changes
                setPassengers(
                  passengers.map((p) => ({ ...p, seatId: "" }))
                );
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
              required
            >
              <option value="">Select Seat Class</option>
              {Array.from(new Set(seatClasses)).map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* Show Seats Button - Visible only when a seat class is selected */}
          {selectedSeatClass && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Show Seats
            </button>
          )}

          {/* Modal for Seat Selection */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <SeatSelection
              noTicket={noTicket}
              passengers={passengers}
              setPassengers={setPassengers}
              bookedSeats={bookedSeats}
              seatClasses={seatClasses}
              selectedSeatClass={selectedSeatClass}
            />
            {/* Close Button Inside Modal */}
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </Modal>

          {/* Passenger Details */}
          {passengers.map((passenger, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-300">
                Passenger {index + 1}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    value={passenger.name}
                    onChange={(e) =>
                      handlePassengerChange(index, "name", e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={passenger.dob}
                    onChange={(e) =>
                      handlePassengerChange(index, "dob", e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Age
                  </label>
                  <input
                    type="number"
                    value={passenger.age}
                    onChange={(e) =>
                      handlePassengerChange(index, "age", e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    value={passenger.passportNum}
                    onChange={(e) =>
                      handlePassengerChange(index, "passportNum", e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Seat ID
                  </label>
                  <input
                    type="text"
                    value={passenger.seatId}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Book Flight"}
            </button>
          </div>
        </form>

        {/* Response Message */}
        {responseMessage && (
          <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
}
