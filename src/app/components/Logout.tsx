///server componenet ekaka client componenets pawichchi karanna bari nisa thami log out eka methana implement krnne
'use client'
import { signOut } from "next-auth/react";

import React from 'react'

const Logout = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default Logout;