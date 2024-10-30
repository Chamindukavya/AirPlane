// File: /app/api/users/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  let connection;

  try {
    connection = await mysql.createConnection(connectionParams);
    
    // Call the stored procedure to get all users
    const [results]: any[] = await connection.execute('CALL GetAllUsers();');

    return NextResponse.json(results);
  } catch (err) {
    console.error('ERROR: API - ', (err as Error).message);

    return NextResponse.json({
      error: (err as Error).message,
      returnedStatus: 500,
    }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
