import React, { useState } from 'react';

function SeatSelection({ noTicket, passengers, setPassengers, bookedSeats = [] }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentClass, setCurrentClass] = useState('Economy'); // Track seat class
  const seats = Array.from({ length: 40 }, (_, i) => i + 1);

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
    <div
      style={{
        background: 'linear-gradient(to bottom right, #7f5eff, #ff6699)',
        padding: '20px',
        borderRadius: '20px',
        color: '#fff',
        maxWidth: '400px',
        margin: 'auto',
      }}
    >
      <h2 className="text-lg font-semibold mb-4">Select Seat</h2>
      
      {/* Tabs for class selection */}
      <div className="tabs">
        {['Economy', 'Business', 'First'].map(cls => (
          <button
            key={cls}
            onClick={() => setCurrentClass(cls)}
            className={`p-2 m-1 rounded ${
              currentClass === cls ? 'bg-red-500 text-white' : 'bg-gray-100 text-black'
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {seats.map(seat => (
          <button
            key={seat}
            onClick={() => handleSelectSeat(seat)}
            disabled={bookedSeats.includes(seat)}
            className={`p-2 border rounded-lg font-semibold w-12 h-12 flex justify-center items-center ${
              bookedSeats.includes(seat) ? 'bg-red-500 text-white cursor-not-allowed' :
              selectedSeats.includes(seat) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
            }`}
          >
            {seat}
          </button>
        ))}
      </div>
      
      {/* Selected Seats */}
      <p className="text-white mt-4">Selected Seats: {selectedSeats.join(', ')}</p>
      
      {/* Purchase Button */}
      <button
        className="w-full p-2 mt-4 bg-blue-500 text-white rounded-lg font-bold"
        onClick={() => alert(`Seats selected: ${selectedSeats.join(', ')}`)}
      >
        Purchase
      </button>
    </div>
  );
}

export default SeatSelection;
