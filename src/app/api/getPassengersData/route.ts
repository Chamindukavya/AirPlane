import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
let connectionParams = GetDBSettings();
interface passengers {
  passenger_count: number,
  age_group : string
}

export async function POST(request: NextRequest) {
    try {
      const { flightSchedule_id } = await request.json();
      console.log(flightSchedule_id)
      const connection = await mysql.createConnection(connectionParams);

      // Fetch the next immediate flight for the given flight_id
      const [flight] :any[] = await connection.execute(
        `SELECT get_next_flight(?) as flight_id;`,
        [flightSchedule_id]
      );
      console.log(flight);
      if (flight.length === 0) {
        return NextResponse.json({ message: 'No future flights found for this flight ID' });
      }
  
      const nextFlightId = flight[0].flight_id;

      // Fetch passengers under and over 18 years old
      const [passengers] : any[] = await connection.execute(
        `SELECT 
        SUM(CASE WHEN p.age < 18 THEN 1 ELSE 0 END) AS under18,
        SUM(CASE WHEN p.age >= 18 THEN 1 ELSE 0 END) AS over18
        FROM passenger_details p
        WHERE p.flight_id = ?;`,
        [nextFlightId]
      );
    
      console.log(passengers)
    
    
      return NextResponse.json({
        nextFlight: flight[0],
        under18: passengers[0].under18,
        over18: passengers[0].over18
      });
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message);
    
        const response = {
          error: (err as Error).message,
          returnedStatus: 500,
        };
    
        return NextResponse.json(response, { status: 500 });
      }
  }
  