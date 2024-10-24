"use client";
import React, { useState } from "react";
import { FiAirplay, FiCalendar, FiMapPin, FiMap } from "react-icons/fi"; // Import icons from react-icons

import { Separator } from "@/components/ui/separator";

interface MenubarProps {
  onSelect: (report: number | null) => void; // Pass selected route to parent
}
const TopNavBar = ({ onSelect }: MenubarProps) => {
  function handleReportChange(report: number) {
    onSelect(report); // Pass the selected route to the parent component
  }
  return (
    <nav className="bg-slate-900 shadow-lg text-xs  font-semibold text-gray-100 p-3.5">
      <div>
        <div className="space-y-1 ">
          <div className="text-white text-right leading-none font-semibold mr-5 mb-[-10px]">
            Input Panel
            <p className="text-left text-sm">Reports</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <button
            onClick={() => handleReportChange(1)}
            className="whitespace-nowrap flex items-center text-gray-300 hover:text-white p-4  focus:bg-white focus:text-black w-full text-xs"
          >
            <FiAirplay className="mr-2" />
            Next Flight
          </button>
          <Separator orientation="vertical" />
          <button
            onClick={() => handleReportChange(2)}
            className="whitespace-nowrap flex items-center text-gray-300 hover:text-white p-4  focus:bg-white focus:text-black w-full text-xs"
          >
            <FiMapPin className="mr-2" /> Destination
          </button>
          <Separator orientation="vertical" />
          <button
            onClick={() => handleReportChange(3)}
            className="whitespace-nowrap flex items-center text-gray-300 hover:text-white p-4  focus:bg-white focus:text-black w-full text-xs"
          >
            <FiCalendar className="mr-2" /> Bookings
          </button>
          <Separator orientation="vertical" />
          <button
            onClick={() => handleReportChange(4)}
            className="whitespace-nowrap flex items-center text-gray-300 hover:text-white p-4  focus:bg-white focus:text-black w-full text-xs"
          >
            <FiMap className="mr-2" /> Route
          </button>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center"></div>
    </nav>
  );
};

export default TopNavBar;
