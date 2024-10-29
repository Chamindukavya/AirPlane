"use client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function SeatSelection({ onSelectSeat, selectedSeats, aircraftCapacity, bookedSeats, seatClasses }) {
  const seats = Array.from({ length: aircraftCapacity }, (_, i) => ({
    seatId: i + 1,
    class: seatClasses[i] || 'unknown',
  }));

  return (
    <div>
      <div className="mb-4">
        <p className="text-white">Select your seat</p> 
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {seats.map(({ seatId, class: seatClass }) => {
          const isBooked = bookedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);

          const seatStyle = seatClass === 'Business'
            ? 'bg-yellow-500'
            : seatClass === 'Economy'
            ? 'bg-blue-500'
            : 'bg-gray-500';

          return (
            <button
              key={seatId}
              onClick={() => onSelectSeat(seatId)}
              disabled={isBooked || isSelected}
              className={`seat-${seatId} p-2 border rounded ${
                isBooked ? 'bg-gray-400' : isSelected ? 'bg-green-500' : seatStyle
              } text-white`}
            >
              {seatClass !== 'unknown'
                ? `${seatClass.charAt(0).toUpperCase() + seatClass.slice(1)} ${seatId}`
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
  const [passengers, setPassengers] = useState([{ dob: "", age: "", name: "", seatId: "", passportNum: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [aircraftCapacity, setAircraftCapacity] = useState(0);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [seatClasses, setseatClasses] = useState<string[]>([]);
  
  // New state for seat visibility
  const [showSeats, setShowSeats] = useState(false);

  useEffect(() => {
    const fetchAircraftCapacityAndBookedSeats = async () => {
      try {
        const [capacityResponse, bookedSeatsResponse, seatClassResponse] = await Promise.all([
          fetch(`/api/capacity?scheduleid=${scheduleid}`),
          fetch(`/api/bookedseats?scheduleid=${scheduleid}`),
          fetch(`/api/seatclasses?scheduleid=${scheduleid}`)
        ]);

        if (capacityResponse.ok && bookedSeatsResponse.ok && seatClassResponse.ok) {
          const capacityData = await capacityResponse.json();
          const bookedSeatsData = await bookedSeatsResponse.json();
          const seatClassData = await seatClassResponse.json();
          setAircraftCapacity(capacityData.capacity);
          setBookedSeats(bookedSeatsData); 
          setseatClasses(seatClassData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
      .map((_, i) => passengers[i] || { dob: "", age: "", name: "", seatId: "", passportNum: "" });
      setPassengers(updatedPassengers);
      setSelectedSeats(updatedPassengers.map((_, i) => passengers[i]?.seatId).filter(Boolean));
    };
  
    const handlePassengerChange = (index: number, field: string, value: string) => {
      const updatedPassengers = passengers.map((passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger
      );
      setPassengers(updatedPassengers);
    };
  
    const handleSeatSelection = (seatId: number) => {
      if (selectedSeats.includes(seatId) || selectedSeats.length >= noTicket) return;
  
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
          setResponseMessage("");
          
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
      return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    }
  
    if (!scheduleid) {
      return <div className="flex justify-center items-center h-screen text-white">No Schedule ID provided.</div>;
    }
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black">
        <div className="w-full max-w-lg bg-gray-800 bg-opacity-75 shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4 text-white">Booking Page</h1>
          <p className="text-lg mb-4 text-gray-300">
            Flight ID: <span className="font-semibold">{scheduleid}</span>
          </p>
          <p className="text-lg mb-4 text-gray-300">
            Your name: <span className="font-semibold">{session?.user?.name || "Guest"}</span> <br />
            Your ID: <span className="font-semibold">{session?.user?.id || "N/A"}</span>
          </p>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="no_tickets" className="block text-sm font-medium text-gray-300">
                Number of Tickets
              </label>
              <input
                type="number"
                id="no_tickets"
                min="1"
                value={noTicket}
                onChange={handleTicketChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
              />
            </div>
  
            {/* Button to toggle seat selection visibility */}
            <button
              type="button"
              onClick={() => setShowSeats(!showSeats)}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {showSeats ? "Hide Seats" : "Show Seats"}
            </button>
  
            {/* Conditional rendering of SeatSelection */}
            {showSeats && (
              <SeatSelection
                onSelectSeat={handleSeatSelection}
                selectedSeats={selectedSeats}
                aircraftCapacity={aircraftCapacity}
                bookedSeats={bookedSeats}
                seatClasses={seatClasses}
              />
            )}
  
              {passengers.map((passenger, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-300">Passenger {index + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Date of Birth</label>
                    <input
                      type="date"
                      value={passenger.dob}
                      onChange={(e) => handlePassengerChange(index, "dob", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Age</label>
                    <input
                      type="number"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Passport Number</label>
                    <input
                      type="text"
                      value={passenger.passportNum}
                      onChange={(e) => handlePassengerChange(index, "passportNum", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-300">Seat ID</label>
                    <input
                      type="text"
                      value={passenger.seatId}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
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
        {responseMessage && (
          <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">{responseMessage}</div>
        )}
      </div>
    </div>
  );
}