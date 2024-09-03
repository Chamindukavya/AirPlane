"use client"
import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { useSession, signIn, signOut } from 'next-auth/react';
import "./globals.css";

export default function Home() {
  const { data: session, status } = useSession();  // Using the React hook to manage session state

  if (status === 'loading') {
    return <p>Loading...</p>;  // Optionally handle loading state
  }

  return (
    <div>
      <main>
        <section style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Find your next destination</h2>
          <input type="text" placeholder="Search destinations" style={{ padding: '10px', marginRight: '10px', width: '300px' }} />
          <button style={{ padding: '10px 15px', backgroundColor: '#0073e6', color: 'white', border: 'none', borderRadius: '5px' }}>Search</button>
        </section>
        <section style={{ padding: '20px' }}>
          <h2>Exclusive Deals</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '30%' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg" alt="Paris" style={{ width: '100%', height: '300px' }} />
              <h3>Paris Getaway</h3>
              <p>Explore the romantic streets of Paris!</p>
            </div>
            <div style={{ width: '30%' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Bathala_%28Maldives%29_8.JPG" alt="Maldives" style={{ width: '100%', height: 'auto' }} />
              <h3>Maldives Adventure</h3>
              <p>Relax in the stunning Maldives.</p>
            </div>
            <div style={{ width: '30%' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg" alt="New York" style={{ width: '100%', height: '300px' }} />
              <h3>New York</h3>
              <p>The city that never sleeps awaits you.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
