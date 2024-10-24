"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link"; // Import Link for navigation
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import AirportSearch from "./components/AirportSearch"; // Importing AirportSearch component
import { TextGenerateEffectDemo } from "./components/text_generation"; // Adjust the import path

const places = [
  {
    category: "Indonesia",
    title: "",
    src: "/indonesia.png",
    content: <p className="text-center text-gray-600">Explore Indonesia's beautiful beaches.</p>,
  },
  {
    category: "India",
    title: "",
    src: "/india.jpeg",
    content: <p className="text-center text-gray-600">Visit India's historic landmarks.</p>,
  },
  {
    category: "Singapore",
    title: "",
    src: "/singapore.png",
    content: <p className="text-center text-gray-600">Experience Singapore's stunning cityscapes.</p>,
  },
  {
    category: "Sri Lanka",
    title: "",
    src: "/sri lanka.jpeg",
    content: <p className="text-center text-gray-600">Discover the charm of Sri Lanka's nature.</p>,
  },
  {
    category: "India",
    title: "",
    src: "/india.jpeg",
    content: <p className="text-center text-gray-600">Visit India's historic landmarks.</p>,
  },
];

export function PlacesCarousel() {
  const cards = places.map((place, index) => (
    <Card key={index} card={place} index={index} />
  ));

  return (
    <div className="w-full h-full py-10">
      <h2 className="max-w-7xl mx-auto text-2xl md:text-4xl font-bold text-blue-500 dark:text-neutral-200 text-center mb-8">
        We provide you Top Destinations
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

// Responsive Carousel Component
export default function HomePage() {
  return (
    <div className="bg-#031320">
      <div className="relative h-screen">
        <div className="h-2/3">
          <video autoPlay loop muted className="absolute inset-0 object-cover w-full h-full">
            <source src="dew.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Container for text and buttons */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <div className="mt-20 md:mt-32 lg:mt-48"> {/* Moves content down on the video */}
              <TextGenerateEffectDemo /> {/* Using TextGenerateEffectDemo here */}
              <p className="mt-4 text-lg md:text-xl lg:text-2xl">Travel to Any Corner of the World</p>

              {/* Buttons */}
              <div className="mt-8 flex space-x-4 justify-center">
                {/* Link to the sign-up page */}
                <Link href="/Signup">
                  <button className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-500 rounded-md transition duration-300">
                    Get Started
                  </button>
                </Link>
                
                {/* Link to the "Learn More" page */}
                <Link href="/flights">
                  <button className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-500 rounded-md transition duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AirportSearch Component moved here */}
      <div className="mt-8">
        <AirportSearch />
      </div>

      {/* Carousel Section */}
      <PlacesCarousel />
    </div>
  );
}
