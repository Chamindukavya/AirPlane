"use client";
import { useEffect, useState } from "react";


type FlightSchedule = {
  is_availabl: number;
  model: string;
  capacity: number;
};

export default function FlightSchedulePage() {
  const [craftData, setCraftData] = useState<FlightSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/aircraft/show");
        const data: FlightSchedule[] = await response.json();
        setCraftData(data);
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {craftData.map((schedule, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Air Craft</h3>
          <p>
            <strong>Model:</strong> {schedule.model}
          </p>
          <p>
            <strong>Capacity:</strong> {schedule.capacity}
          </p>
          
      
          
        </div>
      ))}
    </div>
  );
}
