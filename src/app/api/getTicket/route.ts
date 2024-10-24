// File: /app/api/flightschedule/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';

const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user_id = session.user.id;
    const connection = await mysql.createConnection(connectionParams);
    await connection.beginTransaction();

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const select_query = `
      SELECT 
        t.ticket_id,
        p.name,
        p.seat_id,
        p.class,
        p.age,
        b.flight_id AS booking_flight_id,
        f.start_time,
        f.end_time,
        f.aircraft_id,
        fs.date,
        fs.origin_airport,
        fs.destination_airport
      FROM 
        bookings AS b
        INNER JOIN passenger AS p ON b.booking_id = p.booking_id
        RIGHT OUTER JOIN ticket AS t ON p.passenger_id = t.passenger_id
        INNER JOIN flight AS f ON b.flight_id = f.flight_id
        INNER JOIN flightschedule AS fs ON f.flightSchedule_id = fs.flightSchedule_id
      WHERE 
        b.user_id = ?
        AND fs.date >= ?
        AND t.status = 1;  -- Filtering for today or future dates
    `;

    const [rows]: any[] = await connection.execute(select_query, [user_id, today]);

    await connection.commit();
    await connection.end();

    // Return filtered rows
    return NextResponse.json({ rows });
  } catch (err) {
    console.error('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
