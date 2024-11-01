import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
  try {
    const { airport_code, airport_name, location_id } = await request.json();
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure
    const procedure_call = `CALL AddAirport(?, ?, ?);`;
    const [results] = await connection.execute(procedure_call, [airport_code, airport_name, location_id]);

    connection.end();

    return NextResponse.json({ message: 'Data added successfully', results });

  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
