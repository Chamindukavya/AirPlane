"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import FlightSchedule1 from "../components/Booking";
import TicketModal from "../components/TicketModel";
import AirportSearch from "../components/AirportSearch"; // Import the AirportSearch component

// ProfileCard component for displaying user information
const ProfileCard = ({ name, email, role, dob }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
    <div className="flex items-center mb-4">
      <img
        src="profile.jpeg"
        alt="Profile Picture"
        className="h-12 w-12 rounded-full mr-2 object-cover"
      />
      <h2 className="text-xl font-semibold">{name}</h2>
    </div>
    <div className="mb-2">
      <p className="text-gray-600">Email: {email}</p>
      <p className="text-gray-600">Role: {role}</p>
      <p className="text-gray-600">Date of Birth: {dob}</p>
    </div>
  </div>
);

// StatsCard component for displaying statistics
const StatsCard = ({ title, value }) => (
  <div className="p-4 bg-gray-50 rounded-lg shadow-md">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

// TicketCard component for displaying individual ticket details
const TicketCard = ({ name, date, startTime, aircraftId, onView}) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-start">
    <div className="flex-grow">
      <h3 className="font-semibold">Name: {name}</h3>
      <p className="text-gray-500">Date: {date}</p>
      <p className="text-gray-500">Start Time: {startTime}</p>
      <p className="text-gray-500">Aircraft ID: {aircraftId}</p>
      
    </div>
    <button
      onClick={onView}
      className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
    >
      View Ticket
    </button>
  </div>
);

export default function DashboardPage() {
  const { data: session, status } = useSession(); // Use next-auth's useSession for client-side fetching
  const [ticketDetails, setTicketDetails] = useState([]); // State to hold ticket details
  const [selectedTicket, setSelectedTicket] = useState(null); // State for selected ticket
  const [isModalOpen, setIsModalOpen] = useState(false); // State for ticket modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false); // State for new booking modal

  // Handle modal open
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // Handle new booking modal open
  const handleNewBooking = () => {
    setIsBookingModalOpen(true);
  };

  // If session is not ready, display a loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 via-blue-100 to-gray-300 p-8">
      {" "}
      {/* Added grey-blue gradient background */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          {/* When "New Booking" is clicked, open the booking modal */}
          <button
            onClick={handleNewBooking}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            New Booking
          </button>
        </div>
        {/* Profile Info & Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="col-span-2">
            <ProfileCard
              name={session?.user?.name || "N/A"}
              email={session?.user?.email || "N/A"}
              role={session?.user?.role_name === "admin" ? "Admin" : "User"}
              dob={session?.user?.dob}
            />
          </div>

          {/* Right Side Stats Cards */}
          <div className="space-y-4">
            <StatsCard
              title="Total Bookings"
              value={session?.user?.no_bookings || 0}
            />
            <StatsCard
              title="Passenger State"
              value={session?.user?.passenger_state}
            />
          </div>
        </div>
        {/* Flight Schedule Section */}
        <FlightSchedule1 setTicketDetails={setTicketDetails} />{" "}
        {/* Pass function to receive ticket data */}
        {/* Ticket Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Bookings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {ticketDetails.length > 0 ? (
              ticketDetails.map((ticket, index) => (
                <TicketCard
                  key={index}
                  name={ticket.name}
                  date={ticket.date}
                  startTime={ticket.start_time}
                  aircraftId={ticket.aircraft_id}
                 
                  onView={() => handleViewTicket(ticket)} // Pass ticket to view
                />
              ))
            ) : (
              <div className="text-gray-600">No ticket details available.</div>
            )}
          </div>
        </div>
        {/* Modal for Viewing Selected Ticket */}
        <TicketModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          ticket={selectedTicket}
        />
        {/* Modal for New Booking (Airport Search) */}
        {isBookingModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
              {" "}
              {/* Increased max width for the modal */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">New Booking</h2>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Close
                </button>
              </div>
              <AirportSearch />{" "}
              {/* Show the AirportSearch component inside modal */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
