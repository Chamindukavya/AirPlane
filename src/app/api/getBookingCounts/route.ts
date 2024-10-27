import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
  try {
    const { fromDate, toDate } = await request.json();
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure for passenger counts
    const [passengerCounts]: any[] = await connection.execute(
      `CALL GetPassengerCountsByDateRange(?, ?)`,
      [fromDate, toDate]
    );

    await connection.end();

    // Log the result (optional)
    console.log(passengerCounts);

    // Return the passenger counts
    return NextResponse.json({
      PassengerCounts: passengerCounts[0],  // Access the first element since the result is wrapped in an array
    });
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    return NextResponse.json({
      error: (err as Error).message,
      returnedStatus: 500,
    }, { status: 500 });
  }
}
