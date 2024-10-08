import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const scheduleid = searchParams.get('scheduleid'); // Retrieve scheduleid from query parameters

    if (!scheduleid) {
        return NextResponse.json({ error: 'scheduleid is required' }, { status: 400 });
    }

    try {
        const connection = await mysql.createConnection(connectionParams);
        
        const [rows] = await connection.execute(
            'SELECT seat_id FROM seat WHERE flight_id = ? AND is_available = 0',
            [scheduleid]
        );

        await connection.end();

        // Format data as an array of integers
        const seatIds = rows.map((row: { seat_id: any; }) => row.seat_id);

        // Print the formatted data to the console
        console.log('Fetched Data:', seatIds);

        // Send the formatted data in the response
        return NextResponse.json(seatIds);
        
    } catch (err) {
        console.error('ERROR: API - ', (err as Error).message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}