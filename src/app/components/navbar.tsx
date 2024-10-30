"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Logout from "./Logout";
import React from "react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-black p-4 shadow-lg">
      <React.Fragment>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-2xl tracking-wide flex items-center space-x-2">
            <img src="/logo1.jpg" alt="Logo" className="h-8 w-8" />
            <span>B Airlines</span>
          </div>

          <div className="space-x-6 flex items-center">
            <Link href="/" className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out">Home</Link>
            <Link href="/airportsearch" className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out">Book</Link>
            

            {session?.user?.role_name === "admin" && (
              <Link href="/Admin" className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out">Admin</Link>
            )}

            {session?.user ? (
              <>
              <Link href="/profile" className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out">Profile</Link>
              <span className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out">
                <Logout />
              </span>
            </>
              
            ) : (
              <>
                <Link href="/Login" className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out">Login</Link>
                <Link href="/Signup" className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition duration-300 ease-in-out">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    </nav>
  );
};

export default Navbar;
