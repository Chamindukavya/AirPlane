import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
  try {
    const { flight_id, status } = await request.json();
    const connection = await mysql.createConnection(connectionParams);

    // Update the flight status
    const updateQuery = `
      UPDATE flight 
      SET state = ? 
      WHERE flight_id = ?
    `;
    const [results] = await connection.execute(updateQuery, [status, flight_id]);

    await connection.end();
    
    return NextResponse.json({ message: 'Data updated successfully', results });
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
