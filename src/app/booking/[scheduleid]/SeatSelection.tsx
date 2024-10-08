import React, { useState } from 'react';

function SeatSelection({ noTicket, passengers, setPassengers, bookedSeats = [] }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seats = Array.from({ length: 16 }, (_, i) => i + 1);

  const handleSelectSeat = (seat) => {
    if (selectedSeats.length < noTicket && !selectedSeats.includes(seat)) {
      setSelectedSeats([...selectedSeats, seat]);
    } else if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    }
  };

  // Automatically assign seats to passengers when the correct number of seats is selected
  React.useEffect(() => {
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
      <div className="grid grid-cols-4 gap-2 mb-4">
        {seats.map(seat => (
          <button
            key={seat}
            onClick={() => handleSelectSeat(seat)}
            disabled={bookedSeats.includes(seat)}
            className={`p-2 border rounded ${
              bookedSeats.includes(seat) ? 'bg-red-500 text-white cursor-not-allowed' :
              selectedSeats.includes(seat) ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            {seat}
          </button>
        ))}
      </div>
      <p className="text-gray-700">Selected Seats: {selectedSeats.join(', ')}</p>
    </div>
  );
}

export default SeatSelection;