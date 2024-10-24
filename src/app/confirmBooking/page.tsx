'use client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ConfirmBooking() {
  const router = useRouter();
  const { scheduleid, passengers } = router.query;
  const [passengerData, setPassengerData] = useState([]);

  useEffect(() => {
    if (passengers) {
      setPassengerData(JSON.parse(passengers as string)); // Parse the passenger data from the query
    }
  }, [passengers]);

  const handleCancel = () => {
    router.push(`/booking?scheduleid=${scheduleid}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Booking Confirmation</h1>
        
        {passengerData.map((passenger, index) => (
          <div key={index} className="space-y-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Passenger {index + 1}</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={passenger.name}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="text"
                value={passenger.dob}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="text"
                value={passenger.age}
                readOnly
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
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleCancel}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
