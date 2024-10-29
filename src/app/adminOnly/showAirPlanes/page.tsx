"use client";
import { useEffect, useState } from "react";

type FlightSchedule = {
  is_availabl: number;
  model: string;
  capacity: number;
};

export default function FlightSchedulePage() {
  const [craftData, setCraftData] = useState<FlightSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Step 1: Define an array of image URLs corresponding to each aircraft
  const imageArray = [
    "/home3.jpg", 
    "/home.jpg", 
    "/air1.jpg",
    "/abcdg.jpeg",
    "/air2.jpeg",   // Image for the first aircraft
      // Image for the second aircraft
    
     "/air1.webp",
     

        // Image for the third aircraft (and so on)
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/aircraft/show");
        const data: FlightSchedule[] = await response.json();
        setCraftData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-10">Available Airplanes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8">
        {craftData.map((schedule, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 border border-opacity-30 border-gray-400"
          >
            {/* Step 2: Use the image from the image array based on the index */}
            <img
              src={imageArray[index]} // Use the image corresponding to the aircraft
              alt="Aircraft"
              className="w-full h-52 object-cover mb-6 rounded-lg"
            />
            <h3 className="text-xl font-semibold text-center text-blue-300 mb-4">Aircraft Information</h3>
            <div className="space-y-4 text-gray-200">
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">Model:</span> <span>{schedule.model}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">Capacity:</span> <span>{schedule.capacity}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium text-blue-300">Availability:</span> 
                <span>{schedule.is_availabl ? "Available" : "Not Available"}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
