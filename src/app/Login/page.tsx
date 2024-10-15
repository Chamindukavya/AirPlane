'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        window.location.href = '/'; // Redirect to home or a protected page
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side with Image and Airline Text */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('login.jpg')` }}>
        <div className="flex flex-col justify-center h-full text-white bg-black bg-opacity-50 p-8">
          <h1 className="text-4xl font-bold">Welcome to Airline Services</h1>
          <p className="mt-4 text-lg">Manage your reservations, access exclusive offers, and enjoy personalized service.</p>

          {/* Join Our... Sentence */}
          <p className="mt-6 text-lg font-semibold">Join our community!</p>

          {/* Sign Up Prompt */}
          <div className="mt-2">
            <p className="text-base">Don't have an account? <span className="font-semibold">Sign up first!</span></p>
            <button
              onClick={() => router.push('/Signup')} // Navigate to the signup page
              className="mt-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-black rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Right Side with Ash/Black/White Gradient */}
      <div className="w-1/2 flex justify-center items-center bg-cyan-800">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md" role="alert">
                {error}
              </div>
            )}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
