import Link from 'next/link';
import { authOptions } from '../lib/auth';

import Logout from './Logout'; // Assuming you have a Logout component

import React, { ReactNode } from 'react';
import { getServerSession } from 'next-auth';

const Navbar: React.FC = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className="bg-blue-600 p-4">
      <React.Fragment>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            MyApp
          </div>
          <div className="space-x-4">
            <Link href="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            {session?.user? (<></>
              
            ):(<Link href="/Login" className="text-white hover:text-gray-200">
                Login
              </Link>)}
            {session?.user ? (
              <Logout />
            ) : (
              <Link href="/Signup" className="text-white hover:text-gray-200">
                Sign up
              </Link>
            )}
          </div>
        </div>
      </React.Fragment>
    </nav>
  );
};

export default Navbar;
