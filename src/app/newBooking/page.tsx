// app/newBooking/page.tsx
'use client';
import React from 'react';
import AirportSearch from '../components/AirportSearch'; // Adjust the import path as necessary

const NewBookingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">New Booking</h1>
        {/* Render the AirportSearch component here */}
        <AirportSearch />
      </div>
    </div>
  );
};

export default NewBookingPage;
