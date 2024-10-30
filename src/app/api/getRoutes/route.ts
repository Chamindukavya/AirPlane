import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const airportCode = searchParams.get('airport_code'); // Get airport_code from query parameters

    if (!airportCode) {
        return NextResponse.json({ error: "Missing airport_code parameter" }, { status: 400 });
    }

    try {
      const connection = await mysql.createConnection(connectionParams);
 
      // Fetch the next immediate flight for the given flight_id
      const [routes] :any[] = await connection.execute( 
     'CALL GetFlightSchedules()'
      );
      console.log('routes' ,routes);
      return NextResponse.json({
        routes: routes[0]
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
