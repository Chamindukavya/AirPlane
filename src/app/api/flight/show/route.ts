// File: /app/api/flightschedule/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(connectionParams);

    const select_query = `
      SELECT flight_id, flight_shedule_id, start_time, end_time, aircraft_id FROM flight
    `;

    const [rows] = await connection.execute(select_query);

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
