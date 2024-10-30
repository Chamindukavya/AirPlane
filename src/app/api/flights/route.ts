import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
import { stringify } from 'postcss';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/lib/auth';

const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date'); // Get the date from query params
    const date1 = String(date);

    try {
        const connection = await mysql.createConnection(connectionParams);
    
        const [rows] = await connection.execute(
            `CALL get_flight_schedule_with_dynamic_discounts(?,?,?,?)`,
            [userId, origin, destination, date] // Use the date parameter in the query
        );
    
        await connection.end();
    
        return NextResponse.json(rows[0]);
    } catch (err) {
        console.error('ERROR: API - ', (err as Error).message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}