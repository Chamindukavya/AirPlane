// File: /app/api/seats/route.ts
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
        
        // Call the stored procedure to fetch seat classes
        const [rows]: any[] = await connection.execute(
            'CALL GetSeatClassesByFlight(?);',
            [scheduleid]
        );

        await connection.end();

        // Check if any rows were returned
        if (rows.length === 0) {
            return NextResponse.json({ error: 'No classes found for the given flight' }, { status: 404 });
        }

        // Format data as an array 
        const seatclasses = rows[0].map(row => row.class);

        // Print the formatted data to the console
        console.log('Fetched Data:', seatclasses);

        // Send the formatted data in the response
        return NextResponse.json(seatclasses);
        
    } catch (err) {
        console.error('ERROR: API - ', (err as Error).message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
