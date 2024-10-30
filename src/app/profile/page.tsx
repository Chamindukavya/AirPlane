"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import FlightSchedule1 from "../components/Booking";
import TicketModal from "../components/TicketModel";
import AirportSearch from "../airportsearch/page";
import Link from "next/link";
import { FaHome, FaChartBar, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";

const ProfileCard = ({ name, email, role, dob }) => (
  <div className="p-6 bg-[#1A1D24] text-[#F4F6F8] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
    <h2 className="text-2xl font-bold text-[#ffffff] mb-6">Profile</h2>

    {/* Profile Image and Name */}
    <div className="flex items-center mb-6">
      <img
        src="profile.jpeg"
        alt="Profile Picture"
        className="h-12 w-12 rounded-full mr-4 object-cover"
      />
      <h2 className="text-xl font-semibold text-[#ffffff]">{name}</h2>
    </div>

    {/* Profile Information with line separators */}
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-[#333]">
        <span className="text-[#9EA5B1]">Email:</span>
        <span className="text-[#F4F6F8] ml-2">{email}</span>
      </div>

      <div className="flex justify-between items-center pb-2 border-b border-[#333]">
        <span className="text-[#9EA5B1]">Role:</span>
        <span className="text-[#F4F6F8] ml-2">{role}</span>
      </div>

      <div className="flex justify-between items-center pb-2 border-b border-[#333]">
        <span className="text-[#9EA5B1]">Date of Birth:</span>
        <span className="text-[#F4F6F8] ml-2">{dob}</span>
      </div>
    </div>
  </div>
);

// Sidebar component for navigation
const Sidebar = ({ name, email, role, dob }) => (
  <div className="w-full md:w-80 bg-[#0B0E12] text-white min-h-screen p-4 flex flex-col space-y-6">
    {/* Profile Card */}
    <ProfileCard name={name} email={email} role={role} dob={dob} />

    {/* Navigation Links with spacing between items */}
    <nav className="mt-11 space-y-7">
      <ul className="space-y-5">
        <li>
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-3 hover:text-[#1D90F4]">
              <FaHome />
              <span>Home</span>
            </a>
          </Link>
        </li>
        <hr className="border-[#1A1D24]" /> {/* Separator Line */}
        <li>
          <Link href="/profile" legacyBehavior>
            <a className="flex items-center space-x-3 hover:text-[#1D90F4]">
              <FaChartBar />
              <span>Dashboard</span>
            </a>
          </Link>
        </li>
        <hr className="border-[#1A1D24]" /> {/* Separator Line */}
        <Link href="/airportsearch" legacyBehavior>
          <a className="flex items-center space-x-3 hover:text-[#1D90F4]">
            <FaChartBar />
            <span>New Booking</span>
          </a>
        </Link>
        <hr className="border-[#1A1D24]" /> {/* Separator Line */}
        <li>
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-3 hover:text-[#1D90F4]"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
);

const StatsCard = ({ title, value, image }) => (
  <div className="flex flex-col items-center justify-center w-48 h-48 bg-[#1A1D24] text-[#F4F6F8] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
    <h3 className="text-blue-500 mb-5">{title}</h3>{" "}
    {/* Updated heading color */}
    <p className="text-3xl font-bold text-[#ffffff]">{value}</p>
    {image && (
      <img
        src={image}
        alt={title}
        className="h-12 w-12 mt-2 object-cover rounded-full"
      />
    )}
  </div>
);

const TicketCard = ({ name, date, startTime, aircraftId, onView }) => (
  <div className="p-4 bg-[#1A1D24] text-[#F4F6F8] rounded-lg shadow-md flex justify-between items-start transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
    <div className="flex-grow">
      <h3 className="font-semibold text-[#ffffff]">Name: {name}</h3>
      <p className="text-[#9EA5B1]">Date: {date}</p>
      <p className="text-[#9EA5B1]">Start Time: {startTime}</p>
      <p className="text-[#9EA5B1]">Aircraft ID: {aircraftId}</p>
    </div>
    <button
      onClick={onView}
      className="ml-4 bg-[#1D90F4] hover:bg-[#1481D4] text-white font-bold py-2 px-4 rounded-lg"
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

  const [no_bookings, setNoBookings] = useState(0);

  //fetch user details from session
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`/api/getUserDetails`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        if (data.rows) {
          setNoBookings(data.rows.no_bookings); // Adjust according to your data structure
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUserDetails();
  }, []); // Added empty dependency array

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
    <div className="flex min-h-screen bg-[#0B0E12]">
      <div></div>
      {/* Sidebar */}

      <Sidebar
        name={session?.user?.name || "N/A"}
        email={session?.user?.email || "N/A"}
        role={session?.user?.role_name === "admin" ? "Admin" : "User"}
        dob={session?.user?.dob}
      />

      {/* Main Content */}
      <div className="flex-grow p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#F4F6F8]">Dashboard</h1>
        </div>
        {/* Profile Info & Stats Section */}
        {/* Left Side - Profile Info */}
        {/* <ProfileCard
              name={session?.user?.name || "N/A"}
              email={session?.user?.email || "N/A"}
              role={session?.user?.role_name === "admin" ? "Admin" : "User"}
              dob={session?.user?.dob}
            /> */}
        {/* Right Side - Stats */}
        <div className="flex-grow space-y-5 flex">
          {/* Right Side - Square Stats Boxes */}
          <div className="flex space-x-4">
            <StatsCard
              title="Total Bookings"
              value={no_bookings || 0}
              image="/book3.webp" // Replace with the path to your image
            />
            <StatsCard
              title="Passenger State"
              value={session?.user?.passenger_state}
              image="/OIP.jpeg" // Replace with the path to your image
            />
          </div>
        </div>
        {/* Flight Schedule Section */}
        <FlightSchedule1 setTicketDetails={setTicketDetails} />
        {/* Ticket Details Section */}
        <div className="bg-[#1A1D24] bg-opacity-70 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-[#F4F6F8] mb-4">
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
                  onView={() => handleViewTicket(ticket)}
                />
              ))
            ) : (
              <div className="text-[#9EA5B1]">No ticket details available.</div>
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
        /*{" "}
        {isBookingModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-[#1A1D24] p-6 rounded-lg shadow-lg w-full max-w-3xl">
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="bg-[#1D90F4] hover:bg-[#1481D4] text-white font-bold py-2 px-4 rounded-lg float-right"
              >
                Close
              </button>
              <AirportSearch />
            </div>
          </div>
        )}
        */
      </div>
    </div>
  );
}
