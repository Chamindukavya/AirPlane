"use client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function SeatSelection({
  onSelectSeat,
  selectedSeats,
  aircraftCapacity,
  bookedSeats,
  seatClasses,
}) {
  const seats = Array.from({ length: aircraftCapacity }, (_, i) => ({
    seatId: i + 1,
    class: seatClasses[i] || "unknown",
  }));

  return (
    <div className="seat-selection mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Select Your Seat
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {seats.map(({ seatId, class: seatClass }) => {
          const isBooked = bookedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);

          const seatStyle =
            seatClass === "Business"
              ? "bg-yellow-300 hover:bg-yellow-400"
              : seatClass === "Economy"
              ? "bg-blue-300 hover:bg-blue-400"
              : "bg-gray-400 hover:bg-gray-500";

          return (
            <button
              key={seatId}
              onClick={() => onSelectSeat(seatId)}
              disabled={isBooked || isSelected}
              className={`p-2 rounded-lg font-medium shadow-md transition-all 
                ${
                  isBooked
                    ? "bg-gray-400 cursor-not-allowed"
                    : isSelected
                    ? "bg-green-400"
                    : seatStyle
                }
              `}
              title={seatClass !== "unknown" ? seatClass : "Unknown Seat Class"}
            >
              {seatClass !== "unknown"
                ? `${seatClass.charAt(0).toUpperCase()}${seatClass.slice(
                    1
                  )} ${seatId}`
                : `Seat ${seatId}`}
            </button>
          );
        })}
      </div>
    </div>
  );
}

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
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [aircraftCapacity, setAircraftCapacity] = useState(0);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [seatClasses, setSeatClasses] = useState<string[]>([]);

  // New state to manage seat selection visibility
  const [showSeatSelection, setShowSeatSelection] = useState(false);

  useEffect(() => {
    const fetchAircraftData = async () => {
      try {
        const [capacityRes, bookedSeatsRes, seatClassesRes] = await Promise.all(
          [
            fetch(`/api/capacity?scheduleid=${scheduleid}`),
            fetch(`/api/bookedseats?scheduleid=${scheduleid}`),
            fetch(`/api/seatclasses?scheduleid=${scheduleid}`),
          ]
        );

        if (capacityRes.ok && bookedSeatsRes.ok && seatClassesRes.ok) {
          const capacityData = await capacityRes.json();
          const bookedSeatsData = await bookedSeatsRes.json();
          const seatClassesData = await seatClassesRes.json();
          console.log("Fetched Capacity:", capacityData);
          console.log("Fetched Booked Seats:", bookedSeatsData);
          setAircraftCapacity(capacityData.capacity);
          setBookedSeats(bookedSeatsData);
          setSeatClasses(seatClassesData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (scheduleid) fetchAircraftData();
  }, [scheduleid]);
  useEffect(() => {
    console.log("Booked Seats State:", bookedSeats);
  }, [bookedSeats]);

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNoTicket(value);

    const updatedPassengers = Array(value)
      .fill({})
      .map(
        (_, i) =>
          passengers[i] || {
            dob: "",
            age: "",
            name: "",
            seatId: "",
            passportNum: "",
          }
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
    if (selectedSeats.includes(seatId) || selectedSeats.length >= noTicket)
      return;

    const updatedSeats = [...selectedSeats, seatId];
    setSelectedSeats(updatedSeats);

    const updatedPassengers = passengers.map((passenger, i) =>
      updatedSeats[i] ? { ...passenger, seatId: updatedSeats[i] } : passenger
    );

    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");
    console.log(
      "scheduleid",
      scheduleid,
      session?.user?.id,
      noTicket,
      passengers
    );

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
        const error = await response.json();
        setResponseMessage(error.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!scheduleid) {
    return (
      <div className="flex justify-center items-center h-screen">
        No Schedule ID provided.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: "url('/ss.png')", // Specify your image path here
        backgroundSize: "cover", // Ensures the image covers the entire page
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        minHeight: "100vh", // Ensures the div covers the full viewport height
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "100px",
          borderRadius: "70px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "40px",
            color: "white",
          }}
        >
          Flight Booking
        </h1>

        <p className="text-lg mb-4 text-white">
          Flight ID: <span className="font-semibold">{scheduleid}</span>
        </p>
        <p className="text-lg mb-4 text-white">
          Your name:{" "}
          <span className="font-semibold">
            {session?.user?.name || "Guest"}
          </span>{" "}
          <br />
          Your ID:{" "}
          <span className="font-semibold">{session?.user?.id || "N/A"}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="no_tickets"
              className="block text-sm font-medium text-white"
            >
              Number of Tickets
            </label>
            <input
              type="number"
              id="no_tickets"
              min="1"
              value={noTicket}
              onChange={handleTicketChange}
              className="block w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Button to toggle seat selection */}
          <button
            type="button"
            onClick={() => setShowSeatSelection((prev) => !prev)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out"
          >
            {showSeatSelection ? "Hide Seat Selection" : "Select Seats"}
          </button>

          {/* Conditional rendering of SeatSelection based on showSeatSelection */}
          {showSeatSelection && (
            <SeatSelection
              onSelectSeat={handleSeatSelection}
              selectedSeats={selectedSeats}
              aircraftCapacity={aircraftCapacity}
              bookedSeats={bookedSeats}
              seatClasses={seatClasses}
            />
          )}

          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="space-y-4 border border-gray-300 p-4 rounded-lg shadow-md"
              style={{
                backgroundColor: "#1e394f", // Optional: add a semi-transparent background color
              }}
            >
              <h3 className="text-lg font-semibold white text-white">
                Passenger {index + 1}
              </h3>
              <div>
                <label className="block text-sm font-medium text-white"></label>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) =>
                    handlePassengerChange(index, "name", e.target.value)
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={passenger.dob}
                  onChange={(e) =>
                    handlePassengerChange(index, "dob", e.target.value)
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Age
                </label>
                <input
                  type="number"
                  value={passenger.age}
                  onChange={(e) =>
                    handlePassengerChange(index, "age", e.target.value)
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Seat ID
                </label>
                <input
                  type="text"
                  value={passenger.seatId}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Passport Number
                </label>
                <input
                  type="text"
                  value={passenger.passportNum}
                  onChange={(e) =>
                    handlePassengerChange(index, "passportNum", e.target.value)
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out`}
          >
            {isSubmitting ? "Submitting..." : "Confirm Booking"}
          </button>

          {responseMessage && (
            <p className="text-center text-red-600">{responseMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
