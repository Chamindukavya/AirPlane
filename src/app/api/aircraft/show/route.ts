import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure
    const [rows] = await connection.execute('CALL GetAllAircrafts()');
    connection.end();

    return NextResponse.json(rows[0]); // rows[0] will contain the result set
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
