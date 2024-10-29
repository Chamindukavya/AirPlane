import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
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
  

  // `SELECT flightschedule_id, origin, airport_name AS destination from 
	// (SELECT flightschedule_id, airport_name as origin, destination_airport from airports join 
	// 	(SELECT flightschedule_id ,origin_airport, destination_airport FROM flightSchedule) AS a 
  //       where origin_airport = airport_code) as b 
  //       join airports where destination_airport = airport_code ;`