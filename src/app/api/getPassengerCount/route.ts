import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
    try {
        const { fromDate, toDate } = await request.json();
        const connection = await mysql.createConnection(connectionParams);

        // Call the stored procedure to get the passenger count
        const [passengerCount]: any[] = await connection.execute(
            'CALL GetPassengerCountByDateRange(?, ?)', 
            [fromDate, toDate]
        );

        return NextResponse.json({
            passengerCount: passengerCount
        });
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message);

        const response = {
            error: (err as Error).message,
            returnedStatus: 500,
        };

        return NextResponse.json(response, { status: 500 });
    }
}
