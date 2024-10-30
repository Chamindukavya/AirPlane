import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/lib/auth';

const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;


  try {
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure with the user ID to get discounted prices
    const [rows] = await connection.execute<any[]>(`SELECT * 
FROM flight 
JOIN flightschedule as fs ON flight.flightschedule_id = fs.flightschedule_id`);

    connection.end();
    return NextResponse.json(rows);  // Access the first result set
  } catch (err) {
    console.error('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
