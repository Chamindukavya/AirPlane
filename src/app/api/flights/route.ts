import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    // Validate input parameters
    if (!origin || !destination) {
        return NextResponse.json({ error: 'Origin and destination are required' }, { status: 400 });
    }

    try {
        const connection = await mysql.createConnection(connectionParams);
    
        // Call the stored procedure
        const [rows] = await connection.execute(
            `CALL GetFlightsByOriginDestination(?, ?)`,
            [origin, destination]
        );
    
        await connection.end();

        // The result from a stored procedure call contains metadata, so access `rows[0]` for data
        const resultRows = rows[0];

        // Check if any flights were found
        if (resultRows.length === 0) {
            return NextResponse.json({ message: 'No flights found for the given route' }, { status: 404 });
        }

        return NextResponse.json(resultRows);
    } catch (err) {
        console.error('ERROR: API - ', (err as Error).message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
