import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
    try {
      const { origin, destination } = await request.json();
      const connection = await mysql.createConnection(connectionParams);

      // Fetch the next immediate flight for the given flight_id
      const [flightDetails] :any[] = await connection.execute(
        `SELECT flight_id,model, date, state ,passenger_count FROM 
flightschedule JOIN flight using(flightSchedule_id) 
join aircrafts using(aircraft_id) join flight_passenger_count using(flight_id)
where origin_airport= ? AND destination_airport=?;`,
        [origin, destination]
      );
      console.log(flightDetails);
      return NextResponse.json({
        flightDetails : flightDetails
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
  