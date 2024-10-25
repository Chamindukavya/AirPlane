// File: /app/api/flightschedule/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(connectionParams);

    const select_query = `
      SELECT date, origin_airport, destination_airport, price_economy, price_business , flightSchedule_id
      FROM admin_flightschedule_view
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
