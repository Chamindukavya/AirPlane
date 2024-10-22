import Link from "next/link";
import { authOptions } from "../lib/auth";
import Logout from "./Logout"; // Assuming you have a Logout component
import React from "react";
import { getServerSession } from "next-auth";

const Navbar: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-white p-4 shadow-lg">
      <React.Fragment>
        <div className="container mx-auto flex justify-between items-center">
          {/* Brand/Logo Section */}
          <div className="text-blue-600 font-bold text-2xl tracking-wide">
            B Airlines
          </div>

          {/* Links Section */}
          <div className="space-x-6 flex items-center">
            {/* Home Link */}
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
            >
              Home
            </Link>

            {/* Tickets Link */}
            <Link
              href="/showTicket"
              className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
            >
              Tickets
            </Link>

            {/* Profile Link */}
            <Link
              href="/profile"
              className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
            >
              Profile
            </Link>

            {/* Admin Link - Conditional based on user's role */}
            {session?.user?.role_name === "admin" ? (
              <Link
                href="/Admin"
                className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
              >
                Admin
              </Link>
            ) : null}

            {/* Login / Signup Links - Conditionally Rendered */}
            {session?.user ? (
              <span className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                <Logout /> {/* Logout styled in blue */}
              </span>
            ) : (
              <>
                <Link
                  href="/Login"
                  className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  href="/Signup"
                  className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
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
