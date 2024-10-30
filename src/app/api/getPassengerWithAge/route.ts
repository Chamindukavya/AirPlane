import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
    try {
        const { flightSchedule_id } = await request.json();
        const connection = await mysql.createConnection(connectionParams);

        // Call the stored procedure
        const [results] = await connection.execute(
            'CALL GetFlightAndPassengersWithAge(?)',
            [flightSchedule_id]
        );
        console.log("results:", results);
        // Check if results are returned
        const passengerDetails = results[0] ;
     
        if (passengerDetails.length === 0) {
            return NextResponse.json({ message: 'No future flights found for this flight schedule ID' });
        }

        // Assuming we want the first row in the result
        const flightInfo = passengerDetails[0];

        return NextResponse.json({
            passengerDetails: passengerDetails
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