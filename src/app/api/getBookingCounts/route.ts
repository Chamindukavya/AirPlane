import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
    try {
      const { fromDate, toDate } = await request.json();
      const connection = await mysql.createConnection(connectionParams);

      // Fetch the next immediate flight for the given flight_id
      const [passengerCounts]: any[] = await connection.execute(
        `SELECT 
            COUNT(CASE WHEN passenger_state = 'frequent' THEN user_id END) AS frequent_count,
            COUNT(CASE WHEN passenger_state = 'golden' THEN user_id END) AS gold_count
         FROM bookings
         JOIN user USING(user_id)
         JOIN flight_details USING(flight_id)
         WHERE date BETWEEN ? AND ?;`,
        [fromDate, toDate]
      );
      
      return NextResponse.json({
       PassengerCounts: passengerCounts
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
  