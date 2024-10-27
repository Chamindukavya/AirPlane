// File: /app/api/flightschedule/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/lib/auth';

let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const scheduleId = searchParams.get('flightSchedule_id'); // Retrieve flightSchedule_id from query parameters

  if (!scheduleId) {
    return NextResponse.json({ error: 'flightSchedule_id is required' }, { status: 400 });
  }

  try {
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure to get flight schedules by ID
    const [rows] = await connection.execute('CALL GetFlightSchedulesById(?)', [scheduleId]);

    connection.end();

    return NextResponse.json(rows);
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
