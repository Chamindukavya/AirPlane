import React from "react";
import { FaPlane, FaTicketAlt, FaHeadset, FaGlobe } from "react-icons/fa"; // Icons

const LearnMore: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen py-12 px-6">
      <div className="container mx-auto">
        {/* Heading Section */}
        <h1 className="text-5xl font-bold text-center mb-12 text-cyan-800">
          Learn More About B Airlines
        </h1>

        {/* Section 1: About B Airlines */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-6 flex items-center">
            <FaPlane className="text-blue-400 mr-3" /> About B Airlines
          </h2>
          <p className="text-lg leading-relaxed">
            At B Airlines, we’re committed to providing a seamless and enjoyable
            travel experience. Whether you're traveling for business or leisure,
            we offer flexible booking options, competitive prices, and top-notch
            customer service. With a wide range of destinations, we ensure you
            reach your dream location comfortably and safely.
          </p>
        </section>

        {/* Section 2: Booking Process */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-6 flex items-center">
            <FaTicketAlt className="text-blue-400 mr-3" /> Easy Booking Process
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Booking a flight with B Airlines is quick and easy. Follow these
            simple steps to secure your ticket:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">1. Select Flight</h3>
              <p>
                Choose your departure and destination cities, along with
                preferred dates.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">2. Choose Flight</h3>
              <p>
                Pick the flight that best suits your schedule from our available
                options.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">3. Enter Details</h3>
              <p>
                Provide traveler details and any necessary preferences or
                requests.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">4. Confirm Booking</h3>
              <p>Finalize your booking and receive your e-ticket instantly.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-6 flex items-center">
            <FaGlobe className="text-blue-400 mr-3" /> Why Choose B Airlines?
          </h2>
          <div className="space-y-6">
            <p className="text-lg flex items-center">
              <FaTicketAlt className="text-blue-400 mr-4" />{" "}
              <strong>Affordable Flights:</strong> We offer competitive pricing
              and discounts to help you save.
            </p>
            <p className="text-lg flex items-center">
              <FaPlane className="text-blue-400 mr-4" />{" "}
              <strong>Global Destinations:</strong> We fly to major cities
              around the world, connecting you to your favorite destinations.
            </p>
            <p className="text-lg flex items-center">
              <FaHeadset className="text-blue-400 mr-4" />{" "}
              <strong>24/7 Support:</strong> Our customer support team is
              available around the clock to assist you with any inquiries or
              issues.
            </p>
            <p className="text-lg flex items-center">
              <FaPlane className="text-blue-400 mr-4" />{" "}
              <strong>Modern Fleet:</strong> Travel in comfort and safety aboard
              our state-of-the-art aircraft.
            </p>
          </div>
        </section>

        {/* Section 4: Contact Us */}
        <section className="text-center">
          <h2 className="text-4xl font-semibold mb-6">Contact Us</h2>
          <p className="text-lg mb-8">
            Have questions or need assistance? Reach out to our team at any time
            by visiting our{" "}
            <a href="/contact" className="text-blue-400 hover:underline">
              Contact Page
            </a>
            .
          </p>
          <a
            href="/airportsearch"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
          >
            Start Booking
          </a>
        </section>
      </div>
    </div>
  );
};

export default LearnMore;
