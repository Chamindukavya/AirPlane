'use client';
// pages/SignUp.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Passenger: React.FC = () => {
  const [name, setName] = useState('');
  const [passport, setPassport] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {

      const response = await fetch('/api/passenger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, dob }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        router.push('/passenger');
      } else {
        const result = await response.json();
        setError(result.message || 'An error occurred');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Passenger Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-md" role="alert">
              {success}
            </div>
          )}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
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
            <label htmlFor="passport" className="block text-sm font-medium text-gray-700">Passport Number</label>
            <input
              type="number"
              id="passport"
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">DoB</label>
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
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Another Passenger
          </button>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Finish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Passenger;
