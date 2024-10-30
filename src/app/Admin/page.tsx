import React from "react";

export default function Page() {
  const buttons = [
    {
      label: "Add Aircraft",
      href: "/adminOnly/addAircraft",
      imgSrc: "/addairplane.jpeg",
    },
    {
      label: "Add Airport",
      href: "/adminOnly/addairport",
      imgSrc: "/addairport.jpg",
    },
    {
      label: "Add Flight",
      href: "/adminOnly/showFlightSchedules",
      imgSrc: "/addflight.jpg",
    },
    {
      label: "Add Flight Schedule",
      href: "/adminOnly/addFlightSchedule",
      imgSrc: "/flightshedule.jpeg",
    },
    {
      label: "Show Flights",
      href: "/adminOnly/showFlight",
      imgSrc: "/showshedule.png",
    },
    {
      label: "Show Airplanes",
      href: "/adminOnly/showAirPlanes",
      imgSrc: "/showairplane.jpeg",
    },
    {
      label: "Show Passenger Details",
      href: "/adminOnly/getPassengers",
      imgSrc: "/revenue.webp",
    },
    {
      label: "Show Aircaft Revenues",
      href: "/adminOnly/getRevenue",
      imgSrc: "/passengerDetails.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {buttons.map((button, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 border border-opacity-30 border-gray-400"
          >
            {/* Title above the image */}
            <h2 className="text-xl font-semibold text-gray-200 text-center mb-4">
              {button.label}
            </h2>

            {/* Image */}
            <img
              src={button.imgSrc}
              alt={button.label}
              className="w-full h-48 object-cover rounded-md mb-4 opacity-90"
            />

            {/* Button */}
            <a href={button.href} className="block">
              <button className="w-full bg-[#3b82f6] text-white py-3 rounded-lg hover:bg-[#60a5fa] transition-colors duration-300">
                {button.label}
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
