import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

export default async function Page() {
  const session = await getServerSession(authOptions);



  return (
    <div>
      <p>
        Hello {session?.user?.name} 
      </p>
      <p>
        email:  {session?.user?.email} 
      </p>
      <p>
        Admin Status:  {session?.user?.role_name=="user" ? "Admin" : "Not Admin"} 
      </p>
      <p>
        no of bookings:  {session?.user?.no_bookings} 
      </p>
      <p>
        date of birth:  {session?.user?.dob} 
      </p>
      <p>
        passenger state:  {session?.user?.passenger_state} 
      </p>
    </div>
  );
}
