"use client";
import React, { useState } from "react";
import { FiAirplay, FiCalendar, FiMapPin, FiMap } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";

interface MenubarProps {
  onSelect: (report: number | null) => void;
}

const TopNavBar = ({ onSelect }: MenubarProps) => {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  function handleReportChange(report: number) {
    setSelectedReport(report); // Update the selected report
    onSelect(report); // Pass the selected report to the parent component
  }

  return (
    <nav className="bg-orange-600 rounded-lg shadow-lg text-xs font-semibold text-gray-100 p-3.5 r">
      <div className="flex h-5 items-center space-x-4 text-sm">
        <button
          onClick={() => handleReportChange(1)}
          className={`whitespace-nowrap flex items-center p-4 w-full text-xs ${
            selectedReport === 1
              ? "bg-white text-black"
              : "text-gray-950 hover:text-white"
          }`}
        >
          <FiAirplay className="mr-2" />
          Next Flight
        </button>
        <Separator orientation="vertical" />
        <button
          onClick={() => handleReportChange(2)}
          className={`whitespace-nowrap flex items-center p-4 w-full text-xs ${
            selectedReport === 2
              ? "bg-white text-black"
              : "text-gray-950 hover:text-white"
          }`}
        >
          <FiMapPin className="mr-2" /> Destination
        </button>
        <Separator orientation="vertical" />
        <button
          onClick={() => handleReportChange(3)}
          className={`whitespace-nowrap flex items-center p-4 w-full text-xs ${
            selectedReport === 3
              ? "bg-white text-black"
              : "text-gray-950 hover:text-white"
          }`}
        >
          <FiCalendar className="mr-2" /> Bookings
        </button>
        <Separator orientation="vertical" />
        <button
          onClick={() => handleReportChange(4)}
          className={`whitespace-nowrap flex items-center p-4 w-full text-xs ${
            selectedReport === 4
              ? "bg-white text-black"
              : "text-gray-950 hover:text-white"
          }`}
        >
          <FiMap className="mr-2" /> Route
        </button>
      </div>
    </nav>
  );
};

export default TopNavBar;
