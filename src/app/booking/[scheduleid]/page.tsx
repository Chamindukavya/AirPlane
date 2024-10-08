"use client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function SeatSelection({ onSelectSeat, selectedSeats, aircraftCapacity, bookedSeats, seatClasses }) {
  const seats = Array.from({ length: aircraftCapacity }, (_, i) => ({
    seatId: i + 1,
    class: seatClasses[i] || 'unknown', // Fallback to 'unknown' if seat class is undefined
  }));

  return (
    <div>
      <div className="mb-4">
        <p>Select your seat</p> 
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {seats.map(({ seatId, class: seatClass }) => {
          const isBooked = bookedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);

          // Define a color or style based on seat class (business, economy, unknown)
          const seatStyle = seatClass === 'Business'
            ? 'bg-yellow-500'
            : seatClass === 'Economy'
            ? 'bg-blue-500'
            : 'bg-gray-500'; // Default style for unknown or other seat classes

          return (
            <button
              key={seatId}
              onClick={() => onSelectSeat(seatId)}
              disabled={isBooked || isSelected}
              className={`seat-${seatId} p-2 border rounded ${
                isBooked ? 'bg-gray-400' : isSelected ? 'bg-green-500' : seatStyle
              } text-white`}
            >
              {/* Ensure seatClass is defined before calling charAt() */}
              {seatClass !== 'unknown'
                ? `${seatClass.charAt(0).toUpperCase() + seatClass.slice(1)} ${seatId}`
                : `Seat ${seatId}`} {/* Fallback for unknown seat class */}
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

  const [noTicket, setNoTicket] = useState(1); // Default to 1 ticket
  const [passengers, setPassengers] = useState([
    { dob: "", age: "", name: "", seatId: "", passportNum: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Store selected seat IDs as integers
  const [aircraftCapacity, setAircraftCapacity] = useState(0); // Store aircraft capacity
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [seatClasses, setseatClasses] = useState<string[]>([]);



  useEffect(() => {
    const fetchAircraftCapacityAndBookedSeats = async () => {
      try {
        const [capacityResponse, bookedSeatsResponse,seatClassresponce] = await Promise.all([
          fetch(`/api/capacity?scheduleid=${scheduleid}`),
          fetch(`/api/bookedseats?scheduleid=${scheduleid}`),
          fetch(`/api/seatclasses?scheduleid=${scheduleid}`)
        ]);
  
        if (capacityResponse.ok && bookedSeatsResponse.ok && seatClassresponce.ok) {
          const capacityData = await capacityResponse.json();
          const bookedSeatsData = await bookedSeatsResponse.json();
          const seatClassdata = await seatClassresponce.json();
          console.log('Fetched Capacity:', capacityData);
          console.log('Fetched Booked Seats:', bookedSeatsData);
          setAircraftCapacity(capacityData.capacity);
          setBookedSeats(bookedSeatsData); 
          setseatClasses(seatClassdata);
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
  useEffect(() => {
    console.log('Booked Seats State:', bookedSeats);
  }, [bookedSeats]);
    

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNoTicket(value);

    const updatedPassengers = Array(value)
      .fill({})
      .map((_, i) => passengers[i] || { dob: "", age: "", name: "", seatId: "", passportNum: "" });
    setPassengers(updatedPassengers);
  };

  const handlePassengerChange = (index: number, field: string, value: string) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const handleSeatSelection = (seatId: number) => {
    if (selectedSeats.includes(seatId) || selectedSeats.length >= noTicket) return; // Prevent selecting more seats than tickets or re-selecting seats

    const updatedSeats = [...selectedSeats, seatId]; // Add the selected seat ID
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
    console.log("scheduleid",scheduleid,session?.user?.id,noTicket,passengers);

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
      console.error("Error:", error);
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
        <p className="text-lg mb-4 text-gray-700">
          Flight ID: <span className="font-semibold">{scheduleid}</span>
        </p>
        <p className="text-lg mb-4 text-gray-700">
          Your name: <span className="font-semibold">{session?.user?.name || "Guest"}</span> <br />
          Your ID: <span className="font-semibold">{session?.user?.id || "N/A"}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="no_tickets" className="block text-sm font-medium text-gray-700">
              Number of Tickets
            </label>
            <input
              type="number"
              id="no_tickets"
              min="1"
              value={noTicket}
              onChange={handleTicketChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Seat Selection Grid */}
          <SeatSelection
  onSelectSeat={handleSeatSelection}
  selectedSeats={selectedSeats}
  aircraftCapacity={aircraftCapacity}
  bookedSeats={bookedSeats}
  seatClasses={seatClasses} // Example seat classes
/>

          {passengers.map((passenger, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Passenger {index + 1}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  value={passenger.dob}
                  onChange={(e) => handlePassengerChange(index, "dob", e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Seat ID</label>
                <input
                  type="text"
                  value={passenger.seatId}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Passport Number</label>
                <input
                  type="text"
                  value={passenger.passportNum}
                  onChange={(e) => handlePassengerChange(index, "passportNum", e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
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