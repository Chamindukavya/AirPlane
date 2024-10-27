import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure for aircraft revenue
    const [aircraftRevenue]: any[] = await connection.execute(`CALL GetAircraftRevenue()`);

    await connection.end();

    // Log the results (optional)
    console.log(aircraftRevenue);

    // Return the response as JSON
    return NextResponse.json({
      aircraftRevenue: aircraftRevenue[0],  // Use the first index as the result is wrapped in an array
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
