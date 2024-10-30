import React, { useState, useEffect } from 'react';

function SeatSelection({
  noTicket,
  passengers,
  setPassengers,
  bookedSeats = [],
  seatClasses = [],
  selectedSeatClass = 'All'
}) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Define seats with class
  const seats = Array.from({ length: 150 }, (_, i) => ({
    seatId: i + 1,
    class: seatClasses[i],
  }));

  // Filter seats based on selectedSeatClass
  const filteredSeats = selectedSeatClass === 'All'
    ? seats
    : seats.filter(seat => seat.class === selectedSeatClass);
    console.log("Filtered Seats:", filteredSeats);

  const handleSelectSeat = (seat) => {
    if (selectedSeats.length < noTicket && !selectedSeats.includes(seat.seatId)) {
      setSelectedSeats([...selectedSeats, seat.seatId]);
    } else if (selectedSeats.includes(seat.seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat.seatId));
    }
  };

  // Automatically assign seats to passengers when the correct number of seats is selected
  useEffect(() => {
    if (selectedSeats.length === noTicket) {
      const updatedPassengers = passengers.map((passenger, index) => ({
        ...passenger,
        seatId: selectedSeats[index] || ''
      }));
      setPassengers(updatedPassengers);
    }
  }, [selectedSeats, noTicket, passengers, setPassengers]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Select Seats</h2>
      <div className="grid grid-cols-5 gap-1 mb-4"> {/* Set gap to 0 for no spacing */}
        {filteredSeats.map(seat => (
          <button
            key={seat.seatId}
            onClick={() => handleSelectSeat(seat)}
            disabled={bookedSeats.includes(seat.seatId)}
            className={`w-16 p-2 text-xs border rounded ${ // Set fixed width here
              bookedSeats.includes(seat.seatId)
                ? 'bg-red-500 text-white cursor-not-allowed'
                : selectedSeats.includes(seat.seatId)
                ? 'bg-blue-500 text-white'
                : 'bg-green-500 hover:bg-gray-200'
            }`}
            aria-label={`Seat ${seat.seatId} ${seat.class}`}
          >
            {seat.class !== 'unknown'
              ? `${seat.class.charAt(0).toUpperCase() + seat.class.slice(1)} ${seat.seatId}`
              : `Seat ${seat.seatId}`}
          </button>
        ))}
      </div>
      <p className="text-gray-700">Selected Seats: {selectedSeats.join(', ')}</p>
    </div>
  );
}

export default SeatSelection;
