import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import AirportSearch from "./components/AirportSearch";
import Link from "next/link"; // Import Link for navigation

const places = [
  { src: "indonesia.png", text: "Beautiful Beach" },
  { src: "singapore.png", text: "Majestic Mountains" },
  { src: "sri lanka.jpeg", text: "Historic City" },
  { src: "thailand.jpg", text: "Serene Lake" },
  { src: "india.jpeg", text: "Vibrant Market" },
];

const HomePage = () => {
  return (
    <div>
      {/* First Part: Background Video occupying 2/3 of the page */}
      <div className="relative h-screen">
        {" "}
        {/* Use full height for better control */}
        <div className="h-2/3">
          {" "}
          {/* Set the video to occupy 2/3 of its container */}
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 object-cover w-full h-full"
          >
            <source src="web.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Button placed in the center of the video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Link href="/flights">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300">
                Available Flights
              </button>
            </Link>
          </div>
        </div>
        {/* Overlay for Airport Search positioned at the bottom of the video */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center bg-black bg-opacity-50 py-4">
          <AirportSearch />
        </div>
      </div>

      {/* Second Part: Places to Visit */}
      <div className="py-10">
        <h2 className="text-center text-3xl font-bold">Places You Can Visit</h2>
        <div className="grid grid-cols-3 gap-4 p-4">
          {places.map((place, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={place.src}
                alt={place.text}
                className="w-full h-48 object-cover mb-2"
              />
              <p className="text-center">{place.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
