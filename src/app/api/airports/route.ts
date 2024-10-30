// app/api/airports/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

const connectionParams = GetDBSettings();

export async function GET() {
  try {
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure
    const [rows] = await connection.execute('CALL GetAllAirports()');

    await connection.end();

    return NextResponse.json(rows[0]);  // rows[0] will contain the actual data
  } catch (err) {
    console.error('ERROR: API - ', (err as Error).message);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
