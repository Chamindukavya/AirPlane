import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';

const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    
    const user_id = session?.user?.id;
    const connection = await mysql.createConnection(connectionParams);
    await connection.beginTransaction();

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Call the stored procedure
    const [rows]: any[] = await connection.execute(`select passenger_state,no_bookings from user where user_id =?`, [user_id]);

    await connection.commit();
    await connection.end();

    // Return filtered rows
    return NextResponse.json({ rows: rows[0] });
  } catch (err) {
    console.error('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
