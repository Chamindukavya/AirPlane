'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        window.location.href = "/"; // Redirect to home or a protected page
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side: Image and Text */}
      <div className="w-1/2 bg-cover bg-center md:flex flex-col" style={{ backgroundImage: "url('login.jpg')" }}>
        <div className="flex flex-col items-start p-10 bg-black bg-opacity-40">
          <div className="text-white">
            <h1 className="text-4xl font-bold">Welcome to Airline Services</h1>
            <p className="mt-4 text-lg">Manage your reservations, access exclusive offers, and enjoy personalized service.</p>
          </div>
          <div className="flex-grow"></div>
        </div>
      </div>
    
      {/* Right Side with Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-r from-gray-400 via-blue-400 to-gray-500">
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

            {/* Centering the Login Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-2 text-white bg-gradient-to-r from-blue-500 to-black rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          {/* Sign Up Prompt with Link */}
          <div className="mt-6 text-center">
            <p className="text-base text-gray-700">
              Don't have an account?{" "}
              <span
                onClick={() => router.push('/Signup')}
                className="font-semibold text-blue-500 cursor-pointer hover:underline"
              >
                Sign up first!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
