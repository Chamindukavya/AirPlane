import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

const connectionParams = GetDBSettings();
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    try {
        const connection = await mysql.createConnection(connectionParams);
    
        const [rows] = await connection.execute(
            `SELECT 
                f.Flight_ID,
                f.aircraft_id,
                fs.origin_airport,
                fs.destination_airport,
                f.start_time,
                f.end_time
            FROM 
                Flight f
            JOIN 
                FlightSchedule fs ON f.flight_id = fs.flight_id
            WHERE 
                fs.origin = ? AND fs.destination = ?`,
            [origin, destination]
        );
    
        await connection.end();
    
        return NextResponse.json(rows);
      } catch (err) {
        console.error('ERROR: API - ', (err as Error).message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
      }
    
}
