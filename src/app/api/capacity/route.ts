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

        // Call the stored procedure to get aircraft capacity
        const [rows] = await connection.execute('CALL GetAircraftCapacity(?)', [scheduleid]);

        await connection.end();

        // Ensure you are returning a single capacity value
        if (rows[0].length > 0) {
            const capacity = rows[0][0].capacity; // Access the capacity from the first row
            return NextResponse.json({ capacity });
        } else {
            return NextResponse.json({ error: 'No capacity found for the given scheduleid' }, { status: 404 });
        }

    } catch (err) {
        console.error('ERROR: API - ', (err as Error).message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

