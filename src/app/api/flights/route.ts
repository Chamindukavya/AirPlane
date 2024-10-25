import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
import { stringify } from 'postcss';

const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date'); // Get the date from query params
    const date1 = String(date);

    try {
        const connection = await mysql.createConnection(connectionParams);
    
        const [rows] = await connection.execute(
            `SELECT 
                f.flight_id,  
                f.flightSchedule_id,
                f.aircraft_id,
                
                f.start_time,
                f.end_time,
                fs.price_economy,
                fs.price_business,
                fs.price_platinum
            FROM 
                flight f
            JOIN 
                flightSchedule fs ON f.flightSchedule_id = fs.flightSchedule_id
            WHERE 
                fs.origin_airport = ? AND fs.destination_airport = ? AND fs.date = ?`,
            [origin, destination, date] // Use the date parameter in the query
        );
    
        await connection.end();
    
        return NextResponse.json(rows);
    } catch (err) {
        console.error('ERROR: API - ', (err as Error).message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
