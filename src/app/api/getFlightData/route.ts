import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
    try {
        const { origin, destination } = await request.json();
        const connection = await mysql.createConnection(connectionParams);

        // Call the stored procedure to get flight details
        const [flightDetails]: any[] = await connection.execute(
            'CALL GetFlightDetailsByOriginDestination(?, ?)', 
            [origin, destination]
        );

        console.log(flightDetails);
        
        return NextResponse.json({
            flightDetails: flightDetails
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
