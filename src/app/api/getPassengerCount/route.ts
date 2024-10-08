import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
    try {
      const { fromDate, toDate, destinationAirport } = await request.json();
      const connection = await mysql.createConnection(connectionParams);

      // Fetch the next immediate flight for the given flight_id
      const [passengerCount] :any[] = await connection.execute(
        `SELECT count(passenger_id) AS num_of_passengers
            FROM passenger_details 
            join flight_details using(flight_id) 
            where date between ? AND ? AND destination_airport = ?;`,
        [fromDate, toDate, destinationAirport]
      );
      console.log(passengerCount);
      return NextResponse.json({
        passengerCount: passengerCount
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
  