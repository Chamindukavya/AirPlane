import React from "react";
import Link from "next/link";
import ImageCarousel from "./components/ImageCarousel"; // Adjust path if necessary
import DestinationCarousel from "./components/FlyingPlaces";
import { TextGenerateEffectDemo } from "./components/text_generation";
//import { GlobeDemo } from "./components/globe";

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Main Video Section with reduced height */}
      <div className="relative h-[90vh] overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/ve4.mp4" // Adjust path to your video file
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Container for text and buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <TextGenerateEffectDemo />

          {/* Buttons */}
          <div className="mt-8 flex space-x-4 justify-center">
            <Link href="/airportsearch" passHref>
              <button className="px-7 py-4 border-5 border-black bg-blue-300 text-black hover:bg-gray-500 rounded-lg transition duration-300">
                Get Started
              </button>
            </Link>
            <Link href="/LearnMore" passHref>
              <button className="px-7 py-4 border-5 border-black bg-blue-300 text-black hover:bg-gray-500 rounded-lg transition duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Other Content Sections */}
      <div className="bg-blue-700">
        
      </div>
      <div className="mt-8  text-center">
        <h2 className="text-5xl text-white font-bold">
          Experience Excellence with Our Services!
        </h2>
      </div>
      <div className="mt-8 ">
        <ImageCarousel />
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-5xl text-blue-500 font-bold">
          Enjoy With Our Top Destinations
        </h2>
      </div>

      <div className="mt-8">
        <DestinationCarousel />
      </div>
    </div>
  );
}
