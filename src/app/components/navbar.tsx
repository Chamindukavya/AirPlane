import Link from "next/link";
import { authOptions } from "../lib/auth";
import Logout from "./Logout"; // Assuming you have a Logout component
import React from "react";
import { getServerSession } from "next-auth";

const Navbar: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-black p-4 shadow-lg">
      <React.Fragment>
        <div className="container mx-auto flex justify-between items-center">
          {/* Brand/Logo Section */}
          <div className="text-white font-bold text-2xl tracking-wide flex items-center space-x-2">
            <img src="/logo1.jpg" alt="Logo" className="h-8 w-8" /> {/* Add logo image here */}
            <span>B Airlines</span>
          </div>

          {/* Links Section */}
          <div className="space-x-6 flex items-center">
            {/* Home Link */}
            <Link
              href="/"
              className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out"
            >
              Home
            </Link>

            {/* Tickets Link */}
            <Link
              href="/booking"
              className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out"
            >
              Book
            </Link>

            {/* Profile Link */}
            <Link
              href="/profile"
              className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out"
            >
              Profile
            </Link>

            {/* Admin Link - Conditional based on user's role */}
            {session?.user?.role_name === "admin" ? (
              <Link
                href="/Admin"
                className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out"
              >
                Admin
              </Link>
            ) : null}

            {/* Login / Signup Links - Conditionally Rendered */}
            {session?.user ? (
              <span className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out">
                <Logout /> {/* Logout styled in white */}
              </span>
            ) : (
              <>
                <Link
                  href="/Login"
                  className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  href="/Signup"
                  className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    </nav>
  );
};

export default Navbar;
