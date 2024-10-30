import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
  let connection;
  try {
    const { flightSchedule_id, start_time, end_time, aircraft_id, country } = await request.json();
    connection = await mysql.createConnection(connectionParams);

    // Check if the aircraft is available
    const [rows] = await connection.execute(
      `SELECT is_availabl FROM aircrafts WHERE aircraft_id = ?`,
      [aircraft_id]
    );

    if (rows.length === 0 || rows[0].is_availabl === 0) {
      // Aircraft is not available or does not exist
      console.log(`Aircraft is not available`);
      return NextResponse.json({ message: 'Aircraft is not available or does not exist' }, { status: 400 });
    }

    // If available, insert the new flight using stored procedure
    const insert_query = `CALL AddFlight(?, ?, ?, ?)`;
    const [results] = await connection.execute(insert_query, [
      flightSchedule_id,
      start_time,
      end_time,
      aircraft_id,
    ]);

    return NextResponse.json({ message: 'Data added successfully', results });
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
