import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen py-12 px-6">
      <div className="container mx-auto">
        {/* Contact Us Section */}
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-8">Contact Us</h1>
          <p className="text-lg mb-8">
            Have questions or need help with your booking? Our team is here to assist you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Email Us</h2>
              <p>For general inquiries and support:</p>
              <a href="mailto:support@bairlines.com" className="text-blue-400 hover:underline">support@bairlines.com</a>
            </div>
            {/* Phone */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Call Us</h2>
              <p>For immediate assistance:</p>
              <p className="text-blue-400">+1 (800) 123-4567</p>
            </div>
            {/* Address */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Visit Us</h2>
              <p>Our headquarters:</p>
              <p className="text-blue-400">123 Airline Avenue, Suite 500, Cityville, USA</p>
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section>
          <h1 className="text-5xl font-bold text-center mb-12">Meet Our Team</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Team Member 1 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src="/images/team1.jpg" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Chamindu Kavya</h2>
              <p className="text-gray-400">CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src="/images/team2.jpg" alt="Team Member 2" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Kasun Chamara</h2>
              <p className="text-gray-400">Head of Customer Service</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src="/images/team3.jpg" alt="Team Member 3" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Pawani Gamage</h2>
              <p className="text-gray-400">Chief Operating Officer</p>
            </div>
            {/* Team Member 4 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src="/images/team4.jpg" alt="Team Member 4" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Methmi Rathnayake</h2>
              <p className="text-gray-400">Marketing Director</p>
            </div>
            {/* Team Member 5 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src="/images/team5.jpg" alt="Team Member 5" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Janith Piumal</h2>
              <p className="text-gray-400">Chief Financial Officer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
