import React from "react";
import Link from "next/link";
import ImageCarousel from "./components/ImageCarousel"; // Adjust path if necessary
import DestinationCarousel from "./components/FlyingPlaces";
//import backgroundImage from "public/home43.jpg"; // Adjust path to the downloaded image
import { TextGenerateEffectDemo } from "./components/text_generation";

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Main Image Section with reduced height */}
      <div className="relative h-[80vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/home3.jpg)`,
          }}
        />

        {/* Container for text and buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black">
          <TextGenerateEffectDemo />

          {/* Buttons */}
          {/* Buttons */}
          <div className="mt-8 flex space-x-4 justify-center">
            <Link href="/Signup" passHref>
              <button className="px-6 py-3 border-2 border-gray-300 bg-gray-400 text-black hover:bg-gray-500 rounded-md transition duration-300">
                Get Started
              </button>
            </Link>
            <Link href="/LearnMore" passHref>
              <button className="px-6 py-3 border-2 border-gray-300 bg-gray-400 text-black hover:bg-gray-500 rounded-md transition duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Other Content Sections */}
      <div className="mt-8 text-center">
        <h2 className="text-5xl text-white font-bold">
          Experience Excellence with Our Services!
        </h2>
      </div>
      <div className="mt-8">
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