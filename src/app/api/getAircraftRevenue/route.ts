import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
    try {
      const connection = await mysql.createConnection(connectionParams);
 
      // Fetch the next immediate flight for the given flight_id
      const [aircraftRevenue] :any[] = await connection.execute(
        `select model AS month, revenue AS desktop from aircrafts join
            (SELECT aircraft_id ,
            (sum(price_economy)+sum(price_business)+sum(price_platinum)) AS revenue 
            FROM flight_details 
            group by aircraft_id) AS revenue using(aircraft_id);`
      );
      console.log(aircraftRevenue);
      return NextResponse.json({
        aircraftRevenue: aircraftRevenue
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
  