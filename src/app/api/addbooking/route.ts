import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
  let connection: mysql.Connection | null = null;

  try {
    const { flight_id, user_id, no_tickets, passengerDetails } = await request.json();

    // Establish a new connection using connection parameters
    connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure and pass the parameters
    const [result]: any = await connection.execute(
      'CALL AddBooking(?, ?, ?, ?)',
      [flight_id, user_id, no_tickets, JSON.stringify(passengerDetails)]
    );

    // Assuming the first row of the first result set contains the booking_id
    const booking_id = result[0][0].booking_id;

    return NextResponse.json({ message: 'Data added successfully', booking_id });
  } catch (err) {
    console.error('ERROR: API - ', (err as Error).message);

    return NextResponse.json(
      {
        error: (err as Error).message,
        returnedStatus: 500,
      },
      { status: 500 }
    );
  } finally {
    // Ensure the connection is closed
    if (connection) {
      await connection.end();
    }
  }
}
