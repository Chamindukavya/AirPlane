"use client"
import Link from 'next/link';
import { authOptions } from '../lib/auth';

import Logout from './Logout';

import React, { useState,ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import './navbar.css';

const NavBar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
    }
    setDropdownOpen(true);
    setIsHovering(true);
  };

const handleMouseLeave = () => {
    const id = setTimeout(() => {
        setDropdownOpen(false);
        setIsHovering(false);
    }, 100);
    setTimeoutId(id);
  };
const accountStyle = {
    cursor: 'pointer',
    color: isHovering ? 'gray' : 'white',  
    };

  return (
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'black', color: 'gray' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>B Airline</div>
            </div>
          <ul style={{ listStyleType: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0,paddingRight:20 }}>
              <li><a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/about" style={{ color: 'white', textDecoration: 'none'}}>About</a></li>
              <li><a href="/Admin" style={{ color: 'white', textDecoration: 'none'}}>Admin</a></li>
              <li>
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={accountStyle}>
                      Join
                      <div style={{ display: isDropdownOpen ? 'block' : 'none', position: 'absolute', backgroundColor: 'black', marginTop: '5px', padding: '5px', borderRadius: '10px',paddingRight:20,right:0 }}>
                          <a href="/Signup" style={{ display: 'block', color: 'white', textDecoration: 'none', margin: '5px 0' }}>Sign Up</a>
                          <a href="/Login" style={{ display: 'block', color: 'white', textDecoration: 'none', margin: '5px 0' }}>Login</a>
                      </div>
                  </div>
              </li>
          </ul>
      </nav>
  );
};

export default NavBar;