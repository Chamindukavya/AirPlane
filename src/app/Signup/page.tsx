"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, dob }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        router.push("/Login");
      } else {
        const result = await response.json();
        setError(result.message || "An error occurred");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side: Image and Text */}
      <div
        className="w-1/2  bg-cover bg-center  md:flex flex-col"
        style={{
          backgroundImage: `url('login.jpg')`, // Corrected image path
          backgroundSize: "fill", // Ensures the image covers the div
          backgroundPosition: "center", // Centers the image in the div
        }}
      >
        
        <div className="flex flex-col items-start p-10 bg-black bg-opacity-40">
          {/* Move the text to the top of the left-hand side box */}
          <div className="text-white">
            <h1 className="text-4xl font-bold">
              Join Our Airline Reservation System
            </h1>
            <p className="mt-4 text-lg">
              Experience seamless travel booking and management at your
              fingertips. Sign up today and take the first step towards
              hassle-free travel.
            </p>
          </div>
          <div className="flex-grow"></div>
        </div>
      </div>

      {/* Right Side: Sign-Up Form with Grey-Blue Background */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-r from-gray-400 via-blue-400 to-gray-500">
        <div className="w-full max-w-md bg-white bg-opacity-90 shadow-lg rounded-lg p-8 space-y-6">
          {error && (
            <div
              className="p-4 mb-4 text-red-700 bg-red-100 rounded-md"
              role="alert"
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="p-4 mb-4 text-green-700 bg-green-100 rounded-md"
              role="alert"
            >
              {success}
            </div>
          )}

          {/* Sign-Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-gradient-to-r from-blue-500 to-black rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </form>

          {/* Log In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/Login" className="text-blue-500 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
