// File: /app/api/flightschedule/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/lib/auth';


let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    const connection = await mysql.createConnection(connectionParams);

    // Use the view instead of the original query
    const select_query = `
      SELECT 
        origin_airport,
        destination_airport,
        date,
        start_time,
        end_time,
        price_economy,
        price_business,
        price_platinum,
        flight_id,
        aircraft_id
      FROM flight_schedule_view;
    `;

    const [rows] = await connection.execute<any[]>(select_query);
  

    if (session?.user?.passenger_state === 'frequent') {
      rows.forEach((row: any) => {
        row.price_economy = row.price_economy - row.price_economy * 0.09;
      });
    }
    if (session?.user?.passenger_state === 'golden') {
      rows.forEach((row: any) => {
        row.price_economy = row.price_economy - row.price_economy * 0.12;
      });
    }

    connection.end();
    return NextResponse.json(rows);
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }


}
