"use client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlaneDeparture } from "react-icons/fa";


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
      <h2 className="text-lg font-semibold text-gray-100 mb-4">
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
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
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
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        background:"black",
      }}
    >
      <div className="w-full max-w-4xl p-6 sm:p-10 bg-gray bg-opacity-70 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center space-x-3">
            <FaPlaneDeparture className="text-blue-500" />
            <span>Flight Booking</span>
          </h1>
          <p className="text-lg text-gray-200 mt-2">
            Flight ID: <span className="font-semibold">{scheduleid}</span>
          </p>
          <p className="text-lg text-gray-200">
            Welcome,{" "}
            <span className="font-semibold">
              {session?.user?.name || "Guest"}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-white">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label
                htmlFor="no_tickets"
                className="block text-sm font-medium"
              >
                Number of Tickets
              </label>
              <input
                type="number"
                id="no_tickets"
                min="1"
                value={noTicket}
                onChange={handleTicketChange}
                className="mt-2 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1 flex items-end">
              <button
                type="button"
                onClick={() => setShowSeatSelection((prev) => !prev)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out mt-4 sm:mt-0"
              >
                {showSeatSelection ? "Hide Seat Selection" : "Select Seats"}
              </button>
            </div>
          </div>

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
              className="p-4 bg-gray-800 rounded-lg shadow-md space-y-4"
            >
              <h3 className="text-xl font-semibold">
                Passenger {index + 1}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`name-${index}`}
                    className="block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id={`name-${index}`}
                    value={passenger.name}
                    onChange={(e) =>
                      handlePassengerChange(index, "name", e.target.value)
                    }
                    className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor={`dob-${index}`}
                    className="block text-sm font-medium"
                  >
                    Date of Birth
                  </label>
                  <input
                  type="date"
                  value={passenger.dob}
                  onChange={(e) => handlePassengerChange(index, "dob", e.target.value)}
                  className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
                <div>
                  <label
                    htmlFor={`passport-${index}`}
                    className="block text-sm font-medium"
                  >
                    Passport Number
                  </label>
                  <input
                    type="text"
                    id={`passport-${index}`}
                    value={passenger.passportNum}
                    onChange={(e) =>
                      handlePassengerChange(
                        index,
                        "passportNum",
                        e.target.value
                      )
                    }
                    className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="number"
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                  className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
                <div>
                  <label
                    htmlFor={`seat-${index}`}
                    className="block text-sm font-medium"
                  >
                    Seat ID
                  </label>
                  <input
                    type="text"
                    id={`seat-${index}`}
                    value={passenger.seatId}
                    readOnly
                    className="mt-2 block w-full p-3 bg-gray-600 border border-gray-500 rounded-md shadow-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:opacity-90 transition duration-300 ease-in-out"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Booking"}
          </button>
        </form>

        {responseMessage && (
          <p className="text-center text-green-400 mt-4">
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}